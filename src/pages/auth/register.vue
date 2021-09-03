<template>
	<div class="row">
		<div class="col-md-7 mx-auto">
			<card title="Sign Up">
				<ValidationObserver
					ref="form"
					v-slot="{ handleSubmit, invalid }"
					tag="div"
					class="form-group"
				>
					<form @submit.prevent="handleSubmit(register)">
						<ValidationProvider
							vid="name"
							name="Name"
							rules="required|alpha_spaces|max:25"
							v-slot="{ errors, valid, dirty }"
							tag="div"
							class="col-md-12"
						>
							<label for="name">Name</label>
							<input
								id="name"
								v-model="form.name"
								type="text"
								class="form-control"
								:class="!valid && dirty ? 'is-invalid' : ''"
							/>
							<div v-if="dirty" :class="!valid ? 'invalid-feedback' : ''">
								{{ errors[0] }}
							</div>
						</ValidationProvider>
						<ValidationProvider
							vid="email"
							name="E-mail"
							rules="required|email"
							v-slot="{ errors, valid, dirty }"
							tag="div"
							class="col-md-12 pt-2"
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

						<div class="col-md-12 pt-3 pb-3 d-flex justify-content-between">
							<v-button :loading="busy" :disabled="invalid"> Sign Up </v-button>
							<span class="sign-in-link">
								Already have an account?
								<router-link :to="{ name: 'login' }"> Sign In </router-link>
							</span>
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
		return { title: 'Register' }
	},

	components: {
		ValidationProvider,
		ValidationObserver
	},

	data: () => ({
		form: {
			name: '',
			email: '',
			password: '',
			passwordConfirm: ''
		},
		busy: false,
		errorAlert: ''
	}),

	methods: {
		async register() {
			this.busy = true
			try {
				// Register the user.
				await this.$http({
					url: 'users/sign-up',
					method: 'POST',
					data: this.form
				})
				this.busy = false

				Object.keys(this.form).forEach((key) => (this.form[key] = ''))

				// You should call it on the next frame
				requestAnimationFrame(() => {
					this.$refs.form.reset()
				})
			} catch (error) {
				// should receive error format following way
				// this.$refs.form.setErrors({
				// 	email: ['email is required']
				// })
				this.errorAlert = error.response.data.message
				this.busy = false
			}
		}
	}
}
</script>
<style scoped>
span.sign-in-link {
	display: inline-block;
	vertical-align: middle;
	margin: 10px 0;
}
</style>
