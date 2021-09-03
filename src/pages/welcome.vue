<template>
	<div>
		<div class="top-right links">
			<template v-if="authenticated">
				<router-link :to="{ name: 'home' }"> Home </router-link>
			</template>
			<template v-else>
				<router-link :to="{ name: 'login' }"> Login </router-link>
				<router-link :to="{ name: 'register' }"> Register </router-link>
			</template>
		</div>

		<div class="text-center">
			<div class="title mb-4">
				{{ title }}
				<div>
					<img v-lazy="'https://via.placeholder.com/250'" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	layout: 'basic',

	metaInfo() {
		return { title: 'home' }
	},

	data: () => ({
		title: process.env.VUE_APP_NAME
	}),

	computed: {
		imgUrl() {
			return require('~/assets/images/test.jpg')
		},
		...mapGetters({
			authenticated: 'auth/check'
		})
	}
}
</script>

<style scoped>
.top-right {
	position: absolute;
	right: 10px;
	top: 18px;
}

.title {
	font-size: 85px;
}
</style>
