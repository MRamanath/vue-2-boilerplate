<template>
	<div class="row">
		<div class="col-lg-7 m-auto">
			<card :title="$t('reset_password')">
				<form @submit.prevent="reset">
					<!-- Email -->
					<div class="mb-3 row">
						<label class="col-md-3 col-form-label text-md-end">{{
							$t('email')
						}}</label>
						<div class="col-md-7">
							<input
								v-model="form.email"
								class="form-control"
								type="email"
								name="email"
								readonly
							/>
						</div>
					</div>

					<!-- Password -->
					<div class="mb-3 row">
						<label class="col-md-3 col-form-label text-md-end">{{
							$t('password')
						}}</label>
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
						<label class="col-md-3 col-form-label text-md-end">{{
							$t('confirm_password')
						}}</label>
						<div class="col-md-7">
							<input
								v-model="form.password_confirmation"
								class="form-control"
								type="password"
								name="password_confirmation"
							/>
						</div>
					</div>

					<!-- Submit Button -->
					<div class="mb-3 row">
						<div class="col-md-9 ms-md-auto">
							<v-button :loading="form.busy">
								{{ $t('reset_password') }}
							</v-button>
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
			token: '',
			email: '',
			password: '',
			password_confirmation: '',
			busy: false
		}
	}),

	created() {
		this.form.email = this.$route.query.email
		this.form.token = this.$route.params.token
	},

	methods: {
		async reset() {
			const { data } = await this.$http.post('/api/password/reset')

			this.status = data.status

			// this.form.reset()
		}
	}
}
</script>
