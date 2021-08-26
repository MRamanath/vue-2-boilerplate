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
							<v-button :loading="form.busy"> send_verification_link </v-button>
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
		status: '',
		form: {
			email: '',
			busy: false
		}
	}),

	created() {
		if (this.$route.query.email) {
			this.form.email = this.$route.query.email
		}
	},

	methods: {
		async send() {
			const { data } = await this.$http.post('/api/email/resend')

			this.status = data.status

			this.form.reset()
		}
	}
}
</script>
