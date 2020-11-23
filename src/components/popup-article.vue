<template>
	<div class="popup">
		<form class="popup-article" @submit="update">
			<label class="popup-article__label">
				<span>Заголовок:</span>
				<input type="text" v-model="article.title" required />
			</label>
			<label class="popup-article__label">
				<span>Тема:</span>
				<input type="text" required v-model="article.topic" />
			</label>
			<label class="popup-article__label">
				<span>Текст статьи:</span>
				<textarea cols="30" rows="10" required v-model="article.article"></textarea>
			</label>
			<div class="popup-article__buttons">
				<button type="submit" class="popup-article__button">Сохранить</button>
				<button @click.prevent="close()" class="popup-article__button">Закрыть</button>
			</div>
		</form>
	</div>
</template>

<script>
	export default {
		props: {
			close: Function,
			article: Object,
		},

		methods: {
			update(e) {
				e.preventDefault();
				this.article.date = Date.now();
				this.$store.commit('updateArticle', this.article);
				this.close();
				return false;
			},
		},
	};
</script>

<style lang="scss">
	.popup-article {
		display: flex;
		flex-direction: column;
		width: 70rem;
		background-color: white;
		border: 0.1rem solid #eeeeee;
		border-radius: 0.4rem;
		padding: 3rem;
		&__label {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin: 2rem;
			font-size: 2.5rem;
			color: #287b78;
			& input {
				width: 70%;
				padding: 1rem 1.5rem;
				font-size: 2rem;
				border: 0.1rem solid #eeeeee;
				border-radius: 0.4rem;
			}
			& textarea {
				width: 70%;
				padding: 1rem 1.5rem;
				font-size: 1.6rem;
				border: 0.1rem solid #eeeeee;
				border-radius: 0.4rem;
			}
		}

		&__buttons {
			display: flex;
			justify-content: flex-end;
			margin: 2rem;
		}

		&__button {
			background-color: white;
			border: 0.1rem solid #eeeeee;
			padding: 1rem 1.5rem;
			border-radius: 0.4rem;
			margin: 0 1rem;
			cursor: pointer;
		}
	}
</style>
