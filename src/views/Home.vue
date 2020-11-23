<template>
	<div class="home">
		<div class="sort-article">
			<div class="sort-buttons">
				<div class="sort-title">Сортировка:</div>
				<label class="sort-label">
					<input @change="sortArticles" v-model="sort" type="radio" name="date" value="title" />
					<div class="sort-button">По дате</div>
				</label>
				<label class="sort-label">
					<input @change="sortArticles" v-model="sort" type="radio" name="date" value="date" checked />
					<div class="sort-button">По имени</div>
				</label>
			</div>
		</div>
		<div class="articles">
			<CardArticle v-for="article of search" :key="article.id" :article="article" />
		</div>
	</div>
</template>

<script>
	import checkAccess from '@/services/check-access';
	import CardArticle from '@/components/card-article';

	export default {
		components: {
			CardArticle,
		},
		data() {
			return {
				sort: '',
			};
		},
		computed: {
			articles() {
				return this.$store.getters.articles;
			},
			search() {
				if (this.$store.getters.search == '') {
					return this.articles;
				}
				return this.articles.filter((item) => item.title.toLowerCase().includes(this.$store.getters.search.toLowerCase()));
			},
		},

		methods: {
			sortArticles() {
				console.log(this.sort);

				this.articles.sort((a, b) => {
					if (a[this.sort] > b[this.sort]) {
						return 1;
					}
					if (a[this.sort] < b[this.sort]) {
						return -1;
					}
					return 0;
				});
			},
		},

		created() {
			if (!checkAccess(this.$store.getters.user)) {
				this.$router.push('/login');
				return;
			}
			this.$store.dispatch('initArticles');
		},
	};
</script>

<style scoped lang="scss">
	.articles {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}

	.sort-article {
		display: flex;
		justify-content: flex-end;
		padding: 2rem;
		border: 0.1rem solid #eeeeee;
		margin-top: 1rem;
	}

	.sort-buttons {
		display: flex;
		width: 40rem;
		justify-content: space-around;
		align-items: center;
	}
	.sort-title {
		font-size: 1.6rem;
	}
	.sort-label {
		& input {
			width: 0;
			height: 0;
			position: absolute;
			opacity: 0;
		}
	}
	.sort-button {
		font-size: 1.5rem;
		border: 0.1rem solid #eeeeee;
		padding: 1rem 1.5rem;
		border-radius: 0.4rem;
		cursor: pointer;
		box-shadow: 1px 1px 1px 1px #15141447;
	}
	input:checked ~ .sort-button {
		box-shadow: inset 1px 1px 1px 1px #15141447;
	}
</style>
