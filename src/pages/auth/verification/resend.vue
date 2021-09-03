<template>
	<div class="row">
		<div class="col-md-7 mx-auto">
			<card title="Resend Verification Link">
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
						<div class="col-md-12 pt-3 pb-3 d-flex justify-content-start">
							<v-button :loading="busy" :disabled="invalid">
								Send Verification Link
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
		return { title: 'Resend Verification Link' }
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

	created() {
		if (this.$route.query.email) {
			this.form.email = this.$route.query.email
		}
	},

	methods: {
		async send() {
			this.busy = true
			try {
				await this.$http({
					url: '/users/email/resend',
					method: 'PATCH',
					data: this.form.email
				})

				this.busy = false
				Object.keys(this.form).forEach((key) => (this.form[key] = ''))

				// You should call it on the next frame
				requestAnimationFrame(() => {
					this.$refs.form.reset()
				})
			} catch (error) {
				this.errorAlert = error.response.data.message
				this.busy = false
			}
		}
	}
}
</script>
