<template>
	<div class="row">
		<div class="col-lg-10 m-auto">
			<card :title="'home'"> you_are_logged_in </card>
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
		return { title: 'home' }
	}
}
</script>
