<template>
	<div class="row">
		<div class="col-md-7 mx-auto">
			<card title="Send Password Reset Link">
				<ValidationObserver
					ref="form"
					v-slot="{ handleSubmit, invalid }"
					tag="div"
					class="form-group"
				>
					<form @submit.prevent="handleSubmit(send)">
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
						<div class="col-md-12 pt-3 pb-3 d-flex justify-content-between">
							<v-button :loading="busy" :disabled="invalid">
								Send Password Reset Link
							</v-button>
							<span class="account-links">
								<router-link :to="{ name: 'login' }"> Sign In </router-link>|
								<router-link :to="{ name: 'register' }"> Sign Up </router-link>
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
		return { title: 'Forgot Password' }
	},

	components: {
		ValidationProvider,
		ValidationObserver
	},

	data: () => ({
		form: {
			email: ''
		},
		busy: false,
		errorAlert: ''
	}),

	methods: {
		async send() {
			this.busy = true
			try {
				await this.$http({
					url: '/users/password/forgot',
					method: 'POST',
					data: this.form
				})

				this.busy = false
				Object.keys(this.form).forEach((key) => (this.form[key] = ''))

				// You should call it on the next frame
				requestAnimationFrame(() => {
					this.$refs.form.reset()
				})
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
<style scoped>
span.account-links {
	display: inline-block;
	vertical-align: middle;
	margin: 10px 0;
}
</style>
