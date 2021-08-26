<template>
	<card :title="$t('your_info')">
		<form @submit.prevent="update">
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
import { mapGetters } from 'vuex'

export default {
	scrollToTop: false,

	metaInfo() {
		return { title: 'settings' }
	},

	data: () => ({
		form: {
			name: '',
			email: '',
			busy: false
		}
	}),

	computed: mapGetters({
		user: 'auth/user'
	}),

	created() {
		// Fill the form with user data.
		// this.form.keys().forEach((key) => {
		// 	this.form[key] = this.user[key]
		// })
	},

	methods: {
		async update() {
			const { data } = await this.$http.patch('/api/settings/profile')

			this.$store.dispatch('auth/updateUser', { user: data })
		}
	}
}
</script>
