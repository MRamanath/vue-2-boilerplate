<template>
	<div class="row">
		<div class="col-md-7 mx-auto">
			<card title="Verify Email">
				<template v-if="error">
					<div class="alert alert-danger" role="alert">
						{{ error || 'Failed to verify email' }}
					</div>

					<router-link
						:to="{
							name: 'verification.resend',
							query: { email: $route.query.email }
						}"
					>
						Resend Verification Link
					</router-link>
				</template>
			</card>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
export default {
	async beforeRouteEnter(to, from, next) {
		try {
			const { data } = await axios({
				url: `users/email/verify/${to.params.token}`,
				method: 'PATCH'
			})

			next(async (vm) => {
				vm.success = data.status
				await vm.login(data)
			})
		} catch (e) {
			next((vm) => {
				vm.error = e.response.data.status
			})
		}
	},

	middleware: 'guest',

	metaInfo() {
		return { title: 'Verify Email' }
	},

	data: () => ({
		error: ''
	}),

	methods: {
		async login(data) {
			// Save the token.
			this.$store.dispatch('auth/saveToken', { token: data.token })

			// Log in the user.
			await this.$store.dispatch('auth/updateUser', { user: data.data.user })

			// Redirect home.
			this.$router.replace({ name: 'home', query: { verified: true } })
		}
	}
}
</script>
