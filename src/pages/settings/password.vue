<template>
	<card :title="$t('your_password')">
		<form @submit.prevent="update">
			<!-- Password -->
			<div class="mb-3 row">
				<label class="col-md-3 col-form-label text-md-end">
					new_password
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

			<!-- Submit Button -->
			<div class="mb-3 row">
				<div class="col-md-9 ms-md-auto">
					<v-button :loading="form.busy" type="success"> update </v-button>
				</div>
			</div>
		</form>
	</card>
</template>

<script>
export default {
	scrollToTop: false,

	metaInfo() {
		return { title: 'settings' }
	},

	data: () => ({
		form: {
			password: '',
			password_confirmation: '',
			busy: false
		}
	}),

	methods: {
		async update() {
			await this.$http.patch('/api/settings/password')

			// this.form.reset()
		}
	}
}
</script>
