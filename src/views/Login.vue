<template>
	<div class="login">
		<label class="user">
			<img v-if="!user.avatar" src="@/assets/user.png" alt="user" class="user-avatar" />
			<img v-else :src="user.avatar" alt="user" class="user-avatar" />
			<input type="file" class="user-load" name="avatar" id="avatar" @change="upload" />
			<div class="user-load__button">Изменить</div>
		</label>
		<form class="login-form" onsubmit="return false">
			<input
				type="text"
				:class="errMessage.name ? 'error' : ''"
				class="login-form__name"
				placeholder="Имя"
				v-model="user.name"
				required
			/>
			<output>{{ errMessage.name }}</output>
			<input
				type="email"
				:class="errMessage.email ? 'error' : ''"
				class="login-form__email"
				placeholder="Email"
				v-model="user.email"
				required
			/>
			<output>{{ errMessage.email }}</output>
			<input
				type="password"
				:class="errMessage.pass ? 'error' : ''"
				class="login-form__pass"
				placeholder="Пароль"
				v-model="user.pass"
				required
			/>
			<output>{{ errMessage.pass }}</output>
			<button @click="checkInput" class="login-form__button">Войти</button>
		</form>
	</div>
</template>

<script>
	import userService from '@/services/user-service';
	export default {
		data() {
			return {
				user: {},
				errMessage: {
					name: '',
					pass: '',
					email: '',
				},
			};
		},
		methods: {
			upload(e) {
				userService.upload(e, this);
			},

			checkInput() {
				userService.checkInput(this);
			},
		},

		created() {
			this.user ={ ...this.$store.getters.user};
		},
	};
</script>

<style scoped lang="scss">
	.login {
		width: 40rem;
		height: 40rem;
		padding: 3rem;
		margin: 10vh auto;
		&__title {
			color: #ffffff;
			font-family: Roboto;
			font-size: 2.4rem;
			font-weight: 500;
			line-height: 2rem;
		}
	}
	.user {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
	}
	.user-avatar {
		width: 15rem;
		height: 15rem;
		border: 0.1rem solid #eeeeee;
		border-radius: 50%;
		cursor: pointer;
	}
	.user-load {
		width: 0;
		height: 0;
		position: absolute;
		opacity: 0;
		&__button {
			font-size: 1.4rem;
			text-transform: uppercase;
			border: 0.1rem solid #eee;
			padding: 1rem;
			border-radius: 0.4rem;
			color: #757575;
			margin: 1rem 0;
			cursor: pointer;
		}
	}

	.login-header {
		width: 33.7rem;
		height: 5.6rem;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 1rem 1rem 0 0;
		background-color: #03a9f4;
	}
	.login-form {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 33.7rem;
		background-color: #fafafa;
		padding: 3.1rem;
		&__name {
			width: 27.4rem;
			height: 4.5rem;
			border-radius: 0.4rem;
			border: 0.2rem solid #e0e0e0;
			background-color: #ffffff;
			padding: 1.6rem 0.8rem;
			outline: none;
			color: #bdbdbd;
			font-family: Roboto;
			font-size: 1.6rem;
			font-weight: 500;
			line-height: 2rem;
		}

		&__email {
			width: 27.4rem;
			height: 4.5rem;
			border-radius: 0.4rem;
			border: 0.2rem solid #e0e0e0;
			background-color: #ffffff;
			padding: 1.6rem 0.8rem;
			outline: none;
			color: #bdbdbd;
			font-family: Roboto;
			font-size: 1.6rem;
			font-weight: 500;
			line-height: 2rem;
		}

		&__pass {
			width: 27.4rem;
			height: 4.5rem;
			border-radius: 0.4rem;
			border: 0.2rem solid #e0e0e0;
			background-color: #ffffff;
			padding: 1.6rem 0.8rem;
			outline: none;
			color: #bdbdbd;
			font-family: Roboto;
			font-size: 1.6rem;
			font-weight: 500;
			line-height: 2rem;
		}

		&__button {
			width: 27.4rem;
			height: 4.5rem;
			border-radius: 0.4rem;
			background-color: #48d1cc;
			outline: none;
			border: none;
			color: #ffffff;
			font-family: 'Roboto - Black';
			font-size: 1.6rem;
			font-weight: 400;
			line-height: 2rem;
			cursor: pointer;
		}
	}
	.login-footer {
		width: 33.7rem;
		height: 5.4rem;
		border-radius: 0 0 1rem 1rem;
		background-color: #eeeeee;
	}
	output {
		color: #f44336;
		margin-bottom: 1rem;
		margin-top: 1rem;
	}
	.error {
		border: 0.1rem solid red;
	}
</style>
