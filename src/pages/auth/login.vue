<template>
	<div class="row">
		<div
			class="col-md-7 mx-auto text-center p-3 alert alert-warning"
			role="alert"
			v-if="isVerificationPending"
		>
			Please verify your email to login to your account or
			<router-link
				:to="{
					name: 'verification.resend',
					query: { email: form.email }
				}"
			>
				Resend Verification Link
			</router-link>
		</div>
		<div class="col-md-7 mx-auto">
			<card title="Sign In">
				<ValidationObserver
					ref="form"
					v-slot="{ handleSubmit, invalid }"
					tag="div"
					class="form-group"
				>
					<form @submit.prevent="handleSubmit(login)">
						<ValidationProvider
							vid="email"
							name="E-mail"
							rules="required|email"
							v-slot="{ errors, valid, dirty }"
							tag="div"
							class="col-md-12"
						>
							<label for="email">Email</label>
							<input
								id="email"
								v-model="form.email"
								type="email"
								class="form-control"
								:class="!valid && dirty ? 'is-invalid' : ''"
							/>
							<div v-if="dirty" :class="!valid ? 'invalid-feedback' : ''">
								{{ errors[0] }}
							</div>
						</ValidationProvider>

						<ValidationProvider
							vid="password"
							name="Password"
							rules="required"
							v-slot="{ errors, valid, dirty }"
							tag="div"
							class="col-md-12 pt-2"
						>
							<label for="password">Password</label>
							<input
								id="password"
								v-model="form.password"
								type="password"
								class="form-control"
								autocomplete="on"
								:class="!valid && dirty ? 'is-invalid' : ''"
							/>
							<div v-if="dirty" :class="!valid ? 'invalid-feedback' : ''">
								{{ errors[0] }}
							</div>
						</ValidationProvider>

						<div class="col-md-12 pt-2 pb-2 d-flex justify-content-between">
							<checkbox v-model="remember" name="remember" class="pr-2">
								remember me
							</checkbox>

							<router-link :to="{ name: 'password.request' }">
								Forgot Password?
							</router-link>
						</div>

						<div class="d-flex justify-content-center">
							<v-button :loading="busy" :disabled="invalid"> Sign In </v-button>
						</div>
					</form>
				</ValidationObserver>
			</card>
		</div>
	</div>
</template>

<script>
import Cookies from 'js-cookie'
import { ValidationObserver, ValidationProvider } from '~/plugins/vee-validate'
export default {
	middleware: 'guest',

	metaInfo() {
		return { title: 'Login' }
	},

	components: {
		ValidationProvider,
		ValidationObserver
	},

	data: () => ({
		form: {
			email: '',
			password: ''
		},
		busy: false,
		remember: false,
		errorAlert: '',
		isVerificationPending: false
	}),

	methods: {
		async login() {
			this.busy = true
			try {
				// Submit the form.
				const { data } = await this.$http({
					url: 'users/login',
					method: 'POST',
					data: this.form
				})

				if (data.action && data.action === 'verificationPending') {
					this.isVerificationPending = true
					this.busy = false
					return
				}

				// Save the token.
				this.$store.dispatch('auth/saveToken', {
					token: data.token,
					remember: this.remember
				})

				// Save the user.
				await this.$store.dispatch('auth/updateUser', { user: data.data.user })

				// Redirect home.
				this.redirect()
			} catch (e) {
				// should receive error format following way
				// this.$refs.form.setErrors({
				// 	email: ['email is required']
				// })
				this.errorAlert = e.response.data.message
				this.busy = false
			}
		},

		redirect() {
			const intendedUrl = Cookies.get('intended_url')

			if (intendedUrl) {
				Cookies.remove('intended_url')
				this.$router.push({ path: intendedUrl })
			} else {
				this.$router.push({ name: 'home' })
			}
		}
	}
}
</script>
