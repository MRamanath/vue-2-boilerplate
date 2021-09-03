<template>
	<card title="Your Info">
		<ValidationObserver
			ref="form"
			v-slot="{ handleSubmit, invalid }"
			tag="div"
			class="form-group"
		>
			<form @submit.prevent="handleSubmit(update)">
				<ValidationProvider
					vid="name"
					name="Name"
					rules="required|alpha_spaces|max:25"
					v-slot="{ errors, valid, dirty }"
					tag="div"
					class="col-md-12"
				>
					<label for="name">Name</label>
					<input
						id="name"
						v-model="form.name"
						type="text"
						class="form-control"
						:class="!valid && dirty ? 'is-invalid' : ''"
					/>
					<div v-if="dirty" :class="!valid ? 'invalid-feedback' : ''">
						{{ errors[0] }}
					</div>
				</ValidationProvider>
				<ValidationProvider
					vid="email"
					name="E-mail"
					rules="required|email"
					v-slot="{ errors, valid, dirty }"
					tag="div"
					class="col-md-12 pt-2"
				>
					<label for="email">Email</label>
					<input
						id="email"
						v-model="form.email"
						type="email"
						class="form-control"
						:class="!valid && dirty ? 'is-invalid' : ''"
						disabled
					/>
					<div v-if="dirty" :class="!valid ? 'invalid-feedback' : ''">
						{{ errors[0] }}
					</div>
				</ValidationProvider>

				<div class="col-md-12 pt-3 pb-3 d-flex justify-content-start">
					<v-button :loading="busy" :disabled="invalid"> Update </v-button>
				</div>
			</form>
		</ValidationObserver>
	</card>
</template>

<script>
import { mapGetters } from 'vuex'
import { ValidationObserver, ValidationProvider } from '~/plugins/vee-validate'
export default {
	scrollToTop: false,

	metaInfo() {
		return { title: 'Settings - Your Info' }
	},

	components: {
		ValidationProvider,
		ValidationObserver
	},

	data: () => ({
		form: {
			name: '',
			email: ''
		},
		busy: false
	}),

	computed: mapGetters({
		user: 'auth/user'
	}),

	created() {
		// Fill the form with user data.
		Object.keys(this.form).forEach((key) => (this.form[key] = this.user[key]))
	},

	methods: {
		async update() {
			this.busy = true
			try {
				const { data } = await this.$http({
					url: '/users/update/self',
					method: 'PATCH',
					data: this.form
				})

				this.$store.dispatch('auth/updateUser', { user: data.data.user })
				this.busy = false
			} catch (error) {
				// should receive error format following way
				// this.$refs.form.setErrors({
				// 	email: ['email is required']
				// })
				this.errorAlert = error.response.data.message
				this.busy = false
			}
		}
	}
}
</script>
