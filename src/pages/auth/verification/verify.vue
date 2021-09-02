<template>
	<div class="row">
		<div class="col-lg-7 m-auto">
			<card :title="'verify_email'">
				<template v-if="success">
					<div class="alert alert-success" role="alert">
						{{ success }}
					</div>
				</template>
				<template v-else>
					<div class="alert alert-danger" role="alert">
						{{ error || 'failed_to_verify_email' }}
					</div>

					<router-link
						:to="{
							name: 'verification.resend',
							query: { email: $route.query.email }
						}"
						class="small float-end"
					>
						resend_verification_link
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
		return { title: 'verify_email' }
	},

	data: () => ({
		error: '',
		success: ''
	}),

	methods: {
		async login(data) {
			// Save the token.
			this.$store.dispatch('auth/saveToken', { token: data.token })

			// Log in the user.
			await this.$store.dispatch('auth/updateUser', { user: data.data.user })

			// Redirect home.
			this.$router.push({ name: 'home' })
		}
	}
}
</script>
