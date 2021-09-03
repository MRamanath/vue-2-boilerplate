<template>
	<card title="Change Password">
		<ValidationObserver
			ref="form"
			v-slot="{ handleSubmit, invalid }"
			tag="div"
			class="form-group"
		>
			<form @submit.prevent="handleSubmit(update)">
				<ValidationProvider
					vid="passwordCurrent"
					name="Current Password"
					rules="required"
					v-slot="{ errors, valid, dirty }"
					tag="div"
					class="col-md-12 pt-2"
				>
					<label for="passwordCurrent">Current Password</label>
					<input
						id="passwordCurrent"
						v-model="form.passwordCurrent"
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
</template>

<script>
import { ValidationObserver, ValidationProvider } from '~/plugins/vee-validate'
export default {
	scrollToTop: false,

	metaInfo() {
		return { title: 'Settings - Change Password' }
	},

	components: {
		ValidationProvider,
		ValidationObserver
	},

	data: () => ({
		form: {
			passwordCurrent: '',
			password: '',
			passwordConfirm: ''
		},
		busy: false,
		errorAlert: ''
	}),

	methods: {
		async update() {
			this.busy = true
			try {
				await this.$http({
					url: '/users/password/update',
					method: 'PATCH',
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
