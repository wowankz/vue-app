<template>
	<div id="app">
		<Header />
		<router-view />
	</div>
</template>
<script>
	import Header from '@/components/header';
	export default {
		components: {
			Header,
		},
		created() {
			this.$store.dispatch('initUser');
		},
	};
</script>
<style lang="scss">
	@import url('https://fonts.googleapis.com/css2?family=Dosis&family=Roboto:wght@300;500&display=swap');
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
	html {
		font-size: 10px;
		font-family: 'Dosis', sans-serif;
		font-family: 'Roboto', sans-serif;
	}
	#app {
		padding-left: calc((100% - 1140px) / 2);
		padding-right: calc((100% - 1140px) / 2);
	}
</style>
