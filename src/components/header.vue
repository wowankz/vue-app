<template>
	<header v-show="show" class="header">
		<router-link to="/"><img src="@/assets/logo.png" alt="logo" class="logo"/></router-link>
		<input type="text" class="search" placeholder="Поиск..." @input="search" />
		<div @click="goProfile" class="user">
			<img v-if="!user.avatar" src="@/assets/user.png" alt="User" class="user__avatar" />
			<img v-else :src="user.avatar" alt="user" class="user__avatar" />
			<div class="user__name">{{ user.name }}</div>
		</div>
	</header>
</template>

<script>
	export default {
		data() {
			return {
				show: true,
			};
		},
		methods: {
			goProfile() {
				this.$router.push('/profile');
			},
			search(e) {
				this.$store.commit('search', e.target.value);
			},
		},
		computed: {
			user() {
				return this.$store.getters.user;
			},
		},
		created() {
			if (this.$route.path == '/login') {
				this.show = false;
			}
		},

		watch: {
			$route(toPath) {
				if (toPath.path == '/login') {
					this.show = false;
				} else {
					this.show = true;
				}
			},
		},
	};
</script>

<style lang="scss">
	.header {
		display: flex;
		justify-content: space-around;
		align-items: center;
		padding: 3rem 1rem;
		background-color: mediumturquoise;
	}

	.logo {
		width: 8rem;
	}
	.search {
		width: 20rem;
		height: 4rem;
		border: none;
		outline: none;
		background-color: transparent;
		border-bottom: 0.1rem solid #eeeeee;
		font-size: 2rem;
		color: white;
	}
	.user {
		width: 10rem;
		cursor: pointer;
		&__avatar {
			width: inherit;
			height: inherit;
			border: 0.1rem solid #eeeeee;
			border-radius: 50%;
		}

		&__name {
			text-align: center;
			font-size: 1.5rem;
			color: white;
		}
	}
</style>
