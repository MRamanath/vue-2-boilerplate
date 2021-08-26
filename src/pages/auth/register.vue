<template>
	<div class="row">
		<div class="col-lg-7 m-auto">
			<card v-if="mustVerifyEmail" :title="'register'">
				<div class="alert alert-success" role="alert">verify_email_address</div>
			</card>
			<card v-else :title="'register'">
				<form @submit.prevent="register">
					<!-- Name -->
					<div class="mb-3 row">
						<label class="col-md-3 col-form-label text-md-end">name</label>
						<div class="col-md-7">
							<input
								v-model="form.name"
								class="form-control"
								type="text"
								name="name"
							/>
						</div>
					</div>

					<!-- Email -->
					<div class="mb-3 row">
						<label class="col-md-3 col-form-label text-md-end">email</label>
						<div class="col-md-7">
							<input
								v-model="form.email"
								class="form-control"
								type="email"
								name="email"
							/>
						</div>
					</div>

					<!-- Password -->
					<div class="mb-3 row">
						<label class="col-md-3 col-form-label text-md-end">password </label>
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
						<label class="col-md-3 col-form-label text-md-end">
							confirm_password
						</label>
						<div class="col-md-7">
							<input
								v-model="form.password_confirmation"
								class="form-control"
								type="password"
								name="password_confirmation"
							/>
						</div>
					</div>

					<div class="mb-3 row">
						<div class="col-md-7 offset-md-3 d-flex">
							<!-- Submit Button -->
							<v-button :loading="form.busy"> register </v-button>
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
		return { title: 'register' }
	},

	data: () => ({
		form: {
			name: '',
			email: '',
			password: '',
			password_confirmation: '',
			busy: false
		},
		mustVerifyEmail: false
	}),

	methods: {
		async register() {
			// Register the user.
			const { data } = await this.$http.post('/api/register')

			// Must verify email fist.
			if (data.status) {
				this.mustVerifyEmail = true
			} else {
				// Log in the user.
				const {
					data: { token }
				} = await this.$http.post('/api/login')

				// Save the token.
				this.$store.dispatch('auth/saveToken', { token })

				// Update the user.
				await this.$store.dispatch('auth/updateUser', { user: data })

				// Redirect home.
				this.$router.push({ name: 'home' })
			}
		}
	}
}
</script>
