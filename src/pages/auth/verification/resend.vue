<template>
	<div class="row">
		<div class="col-lg-7 m-auto">
			<card :title="'verify_email'">
				<form @submit.prevent="send">
					<!-- Email -->
					<div class="mb-3 row">
						<label class="col-md-3 col-form-label text-md-end">email </label>
						<div class="col-md-7">
							<input
								v-model="form.email"
								class="form-control"
								type="email"
								name="email"
							/>
						</div>
					</div>

					<!-- Submit Button -->
					<div class="mb-3 row">
						<div class="col-md-9 ms-md-auto">
							<v-button :loading="busy"> send_verification_link </v-button>
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
		return { title: 'verify_email' }
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
				const { data } = await this.$http({
					url: '/users/email/resend',
					method: 'PATCH',
					data: this.form.email
				})
				console.log(data)
				this.busy = false
				// this.form.reset()
			} catch (error) {
				this.errorAlert = error.response.data.message
				this.busy = false
			}
		}
	}
}
</script>
