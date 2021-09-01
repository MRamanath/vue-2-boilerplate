<template>
	<div class="row">
		<div class="col-lg-7 m-auto">
			<card :title="'register'">
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
								v-model="form.passwordConfirm"
								class="form-control"
								type="password"
								name="passwordConfirm"
							/>
						</div>
					</div>

					<div class="mb-3 row">
						<div class="col-md-7 offset-md-3 d-flex">
							<!-- Submit Button -->
							<v-button :loading="busy"> register </v-button>
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
			passwordConfirm: ''
		},
		busy: false,
		errorAlert: ''
	}),

	methods: {
		async register() {
			this.busy = true
			try {
				// Register the user.
				await this.$http({
					url: 'users/sign-up',
					method: 'POST',
					data: this.form
				})
				this.busy = false
			} catch (error) {
				this.errorAlert = error.response.data.message
				this.busy = false
			}
		}
	}
}
</script>
