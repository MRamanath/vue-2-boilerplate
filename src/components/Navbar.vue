<template>
	<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
		<div class="container">
			<button
				class="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#navBarToggler"
				aria-controls="navBarToggler"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span class="navbar-toggler-icon"></span>
			</button>
			<router-link
				:to="{ name: 'welcome' }"
				class="navbar-brand text-uppercase"
				style="letter-spacing: 3px"
			>
				{{ appName }}
			</router-link>

			<div
				class="collapse navbar-collapse d-flex justify-content-end"
				id="navBarToggler"
			>
				<ul class="navbar-nav mt-2 mt-lg-0">
					<!-- Authenticated -->
					<template v-if="user">
						<li class="nav-item dropdown">
							<a
								class="nav-link dropdown-toggle"
								href="#"
								id="navbarDropdownMenuLink"
								role="button"
								data-toggle="dropdown"
								aria-haspopup="true"
								aria-expanded="false"
							>
								<img
									:src="user.photo"
									class="rounded-circle profile-photo me-1"
									alt="photo"
								/>
								{{ user.name }}
							</a>
							<div
								class="dropdown-menu"
								aria-labelledby="navbarDropdownMenuLink"
							>
								<router-link
									:to="{ name: 'settings.profile' }"
									class="dropdown-item ps-3"
								>
									<fa icon="cog" fixed-width />
									Settings
								</router-link>
								<div class="dropdown-divider" />
								<a href="#" class="dropdown-item ps-3" @click.prevent="logout">
									<fa icon="sign-out-alt" fixed-width />
									Logout
								</a>
							</div>
						</li>
					</template>
					<!-- Guest -->
					<template v-else>
						<li class="nav-item">
							<router-link
								:to="{ name: 'login' }"
								class="nav-link"
								active-class="active"
							>
								Sign In
							</router-link>
						</li>
						<li class="nav-item">
							<router-link
								:to="{ name: 'register' }"
								class="nav-link"
								active-class="active"
							>
								Sign Up
							</router-link>
						</li>
					</template>
				</ul>
			</div>
		</div>
	</nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	data: () => ({
		appName: process.env.VUE_APP_NAME
	}),

	computed: mapGetters({
		user: 'auth/user'
	}),

	methods: {
		async logout() {
			// Log out the user.
			await this.$store.dispatch('auth/logout')

			// Redirect to login.
			this.$router.push({ name: 'welcome' })
		}
	}
}
</script>

<style scoped>
.profile-photo {
	width: 2rem;
	height: 2rem;
	margin: -0.375rem 0;
}

.container {
	max-width: 1100px;
}
</style>
