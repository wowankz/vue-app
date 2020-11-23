<template>
	<div class="profile">
		<div class="profile__user">
			<div class="profile__user-avatar">
				<img v-if="!user.avatar" src="@/assets/user.png" alt="user" class="user-avatar" />
				<img v-else :src="user.avatar" alt="user" class="user-avatar" />
			</div>
			<div class="profile__user-info">
				<div class="profile__user-name">Имя: {{ user.name }}</div>
				<div class="profile__user-email">Email: {{ user.email }}</div>
			</div>
		</div>
		<div class="profile-controls">
			<button @click="isProfile = true" class="profile-controls__change">Изменить</button>
			<button @click="isEdit = true" class="profile-controls__add-article">Добавить статью</button>
		</div>
		<PopupProfile v-if="isProfile" :close="close" />
		<PopupArticle
			v-if="isEdit"
			:close="close"
			:article="Object.assign({}, this.$store.getters.articles[0], { title: '', topic: '', article: '', date: '', id: '' })"
		/>
	</div>
</template>

<script>
	import checkAccess from '@/services/check-access';
	import PopupProfile from '@/components/popup-profile';
	import PopupArticle from '@/components/popup-article';
	export default {
		components: {
			PopupProfile,
			PopupArticle,
		},
		data() {
			return {
				isProfile: false,
				isEdit: false,
			};
		},
		methods: {
			close() {
				this.isProfile = false;
				this.isEdit = false;
			},
		},
		computed: {
			user() {
				return this.$store.getters.user;
			},
		},
		created() {
			if (!checkAccess(this.$store.getters.user)) {
				this.$router.push('/login');
				return;
			}
		},
	};
</script>

<style scoped lang="scss">
	.profile {
		display: flex;
		flex-direction: column;
		justify-content: center;
		&__user {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 3rem;
		}

		&__user-avatar {
			border: 0.1rem solid #eeeeee;
			border-radius: 50%;
		}

		&__user-info {
			flex-grow: 1;
			padding-left: 10rem;
			font-size: 2.5rem;
			color: #757575;
		}
	}
	.user-avatar {
		width: 26rem;
		height: 26rem;
		border: 0.1rem solid #eeeeee;
		border-radius: 50%;
	}

	.profile-controls {
		display: flex;
		justify-content: center;
		&__change {
			text-decoration: none;
			font-size: 2rem;
			border: 0.1rem solid #eeeeee;
			border-radius: 0.4rem;
			padding: 1rem 1.5rem;
			margin-right: 2rem;
			color: mediumturquoise;
			background-color: white;
			cursor: pointer;
		}

		&__add-article {
			text-decoration: none;
			font-size: 2rem;
			border: 0.1rem solid #eeeeee;
			border-radius: 0.4rem;
			padding: 1rem 1.5rem;
			color: mediumturquoise;
			background-color: white;
			cursor: pointer;
		}
	}
</style>
