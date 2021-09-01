<template>
	<div class="row">
		<div class="col-lg-7 m-auto">
			<card :title="'login'">
				<form @submit.prevent="login">
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
						<label class="col-md-3 col-form-label text-md-end">password</label>
						<div class="col-md-7">
							<input
								v-model="form.password"
								class="form-control"
								type="password"
								name="password"
							/>
						</div>
					</div>

					<!-- Remember Me -->
					<div class="mb-3 row">
						<div class="col-md-3" />
						<div class="col-md-7 d-flex">
							<checkbox v-model="remember" name="remember">
								remember_me
							</checkbox>

							<router-link
								:to="{ name: 'password.request' }"
								class="small ms-auto my-auto"
							>
								forgot_password
							</router-link>
						</div>
					</div>

					<div class="mb-3 row">
						<div class="col-md-7 offset-md-3 d-flex">
							<!-- Submit Button -->
							<v-button :loading="busy"> login </v-button>
						</div>
					</div>
				</form>
			</card>
		</div>
	</div>
</template>

<script>
import Cookies from 'js-cookie'

export default {
	middleware: 'guest',

	metaInfo() {
		return { title: 'login' }
	},

	data: () => ({
		form: {
			email: '',
			password: ''
		},
		busy: false,
		remember: false,
		errorAlert: ''
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
