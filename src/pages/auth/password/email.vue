<template>
	<div class="row">
		<div class="col-lg-7 m-auto">
			<card :title="'reset_password'">
				<form @submit.prevent="send">
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

					<!-- Submit Button -->
					<div class="mb-3 row">
						<div class="col-md-9 ms-md-auto">
							<v-button :loading="busy">send_password_reset_link</v-button>
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

				// this.form.reset()
				this.busy = false
			} catch (e) {
				this.errorAlert = e.response.data.message
				this.busy = false
			}
		}
	}
}
</script>
