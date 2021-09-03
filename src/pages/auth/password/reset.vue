<template>
	<div class="row">
		<div class="col-md-7 mx-auto">
			<card title="Reset Password">
				<ValidationObserver
					ref="form"
					v-slot="{ handleSubmit, invalid }"
					tag="div"
					class="form-group"
				>
					<form @submit.prevent="handleSubmit(reset)">
						<ValidationProvider
							vid="password"
							name="Password"
							rules="required|min:8"
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
						<ValidationProvider
							vid="passwordConfirm"
							name="Password Confirmation"
							rules="required|confirmed:password"
							v-slot="{ errors, valid, dirty }"
							tag="div"
							class="col-md-12 pt-2"
						>
							<label for="passwordConfirm">Password Confirmation</label>
							<input
								id="passwordConfirm"
								v-model="form.passwordConfirm"
								type="password"
								class="form-control"
								autocomplete="on"
								:class="!valid && dirty ? 'is-invalid' : ''"
							/>
							<div v-if="dirty" :class="!valid ? 'invalid-feedback' : ''">
								{{ errors[0] }}
							</div>
						</ValidationProvider>

						<div class="col-md-12 pt-3 pb-3 d-flex justify-content-start">
							<v-button :loading="busy" :disabled="invalid">
								Reset Password
							</v-button>
						</div>
					</form>
				</ValidationObserver>
			</card>
		</div>
	</div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from '~/plugins/vee-validate'
export default {
	middleware: 'guest',

	metaInfo() {
		return { title: 'Reset Password' }
	},

	components: {
		ValidationProvider,
		ValidationObserver
	},

	data: () => ({
		status: '',
		form: {
			password: '',
			passwordConfirm: ''
		},
		busy: false,
		errorAlert: ''
	}),

	methods: {
		async reset() {
			this.busy = true
			try {
				const { data } = await this.$http({
					url: `/users/password/reset/${this.$route.params.token}`,
					method: 'PATCH',
					data: this.form
				})

				// Save the token.
				this.$store.dispatch('auth/saveToken', { token: data.token })

				// Log in the user.
				await this.$store.dispatch('auth/updateUser', { user: data.data.user })

				// Redirect home.
				this.$router.push({ name: 'home' })
			} catch (e) {
				// should receive error format following way
				// this.$refs.form.setErrors({
				// 	email: ['email is required']
				// })
				this.errorAlert = e.response.data.message
				this.busy = false
			}
		}
	}
}
</script>
