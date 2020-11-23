<template>
	<div @click="goArticle(article.id)" class="card">
		<div class="header">
			<img v-if="!article.user.avatar" src="@/assets/user.png" alt="User" class="header__img" />
			<img v-else :src="article.user.avatar" alt="avatar" class="header__img" />
			<div class="header__user">
				<div class="header__name">{{ article.user.name }}</div>
				<div class="header__email">{{ article.user.email }}</div>
			</div>
		</div>
		<div class="main">
			<h2 class="heading">{{ article.title }}</h2>
			<div class="article">
				{{ article.article }}
			</div>
		</div>
		<footer class="footer">
			<div class="footer__topic">Тема: {{ article.topic }}</div>
			<div class="footer__date">Дата: {{ date(article.date) }}</div>
		</footer>
	</div>
</template>

<script>
	export default {
		props: {
			article: Object,
		},

		methods: {
			goArticle(id) {
				this.$router.push('/article/' + id);
			},

			date(time) {
				let date = new Date(time);
				console.log(date.getDate());
				return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()} `;
			},
		},
	};
</script>

<style scoped lang="scss">
	.card {
		width: 30rem;
		border: 0.1rem solid #eeeeee;
		border-radius: 0.4rem;
		padding: 2rem;
		margin-top: 2rem;
		cursor: pointer;
	}
	.header {
		display: flex;
		justify-content: flex-start;
		padding: 1rem;
		background-color: #48d1cc14;
		&__img {
			width: 8rem;
			height: 8rem;
			border: 0.1rem solid #eeeeee;
			border-radius: 50%;
		}
		&__user {
			display: flex;
			flex-direction: column;
			justify-content: center;
			margin-left: 2rem;
		}
		&__name {
			font-size: 1.5rem;
		}

		&__email {
			font-size: 1rem;
		}
	}

	.main {
		margin: 1.5rem;
	}
	.heading {
		color: mediumturquoise;
	}
	.article {
		width: 17rem;
		padding: 1.5rem 0.5rem;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		font-size: 1.2rem;
	}
	.footer {
		display: flex;
		justify-content: space-between;
		padding: 1rem 0;
		font-size: 1.2rem;
		&__topic {
			color: #757575;
		}

		&__date {
			color: #757575;
		}
	}
</style>
