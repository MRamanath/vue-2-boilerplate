<template>
	<div class="row">
		<div class="col-lg-10 m-auto">
			<card :title="'home'">
				<template v-if="$route.query.verified == true">
					<div class="alert alert-success" role="alert">
						Your email has been verified!
					</div>
				</template>
				You are logged in now.
			</card>
		</div>
	</div>
</template>

<script>
export default {
	middleware: 'auth',

	// async asyncData () {
	//   const { data: projects } = await this.$http.get('/api/projects')

	//   return {
	//     projects
	//   }
	// },

	metaInfo() {
		return { title: 'Home' }
	}
}
</script>
