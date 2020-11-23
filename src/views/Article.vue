<template>
	<div class="article">
		<header class="article-header">
			<h1 class="article__title">{{ article.title }}</h1>
			<a @click.prevent="isEdit = true" href="#" class="edit-icon__link" title="Редактировать статью">
				<img src="@/assets/edit-icon.png" alt="Edit" class="edit-icon__img" />
			</a>
		</header>
		<div class="article__content">{{ article.article }}</div>
		<footer class="article-footer">
			<div class="article-footer__topic">Тема: {{ article.topic }}</div>
			<div class="article-footer__date">Дата: {{ date(article.date) }}</div>
		</footer>
		<PopupArticle v-if="isEdit" :close="close" :article="{ ...article }" />
	</div>
</template>

<script>
	import PopupArticle from '@/components/popup-article';
	import checkAccess from '@/services/check-access';
	export default {
		components: {
			PopupArticle,
		},
		data() {
			return {
				isEdit: false,
				id: null,
			};
		},
		computed: {
			article() {
				return this.$store.getters.articles.find((item) => item.id == this.id);
			},
		},
		methods: {
			date(time) {
				let date = new Date(time);
				return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()} `;
			},

			close() {
				this.isEdit = false;
			},
		},
		created() {
			if (!checkAccess(this.$store.getters.user)) {
				this.$router.push('/login');
				return;
			}
			this.id = this.$route.params.id;
			if (this.$store.getters.articles.length == 0) this.$store.dispatch('initArticles');
		},
	};
</script>

<style lang="scss">
	.article {
		padding: 4rem;
		&__title {
			font-size: 3rem;
		}

		&__content {
			font-size: 2rem;
			margin: 2rem;
			color: #757575;
		}
	}
	.article-header {
		display: flex;
		justify-content: space-between;
	}
	.edit-icon {
		&__img {
			width: 4rem;
		}
	}

	.article-footer {
		display: flex;
		justify-content: space-between;
		padding: 2rem;
		font-size: 1.5rem;
		color: #757575;
	}
</style>
