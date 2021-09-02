<template>
	<div class="row">
		<div class="col-lg-7 m-auto">
			<card :title="'reset_password'">
				<form @submit.prevent="reset">
					<!-- Password -->
					<div class="mb-3 row">
						<label class="col-md-3 col-form-label text-md-end">
							Password
						</label>
						<div class="col-md-7">
							<input
								v-model="form.password"
								class="form-control"
								type="password"
								name="password"
							/>
						</div>
					</div>

					<!-- Password Confirmation -->
					<div class="mb-3 row">
						<label class="col-md-3 col-form-label text-md-end"
							>Confirm Password</label
						>
						<div class="col-md-7">
							<input
								v-model="form.passwordConfirm"
								class="form-control"
								type="password"
								name="passwordConfirm"
							/>
						</div>
					</div>

					<!-- Submit Button -->
					<div class="mb-3 row">
						<div class="col-md-9 ms-md-auto">
							<v-button :loading="busy"> Reset Password </v-button>
						</div>
					</div>
				</form>
			</card>
		</div>
	</div>
</template>

<script>
export default {
	middleware: 'guest',

	metaInfo() {
		return { title: 'reset_password' }
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
				this.errorAlert = e.response.data.message
				this.busy = false
			}
		}
	}
}
</script>
