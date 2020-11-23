<template>
	<div class="popup">
		<div class="popup-content">
			<div class="popup__user">
				<label class="popup__user-avatar">
					<img v-if="!user.avatar" src="@/assets/user.png" alt="user" class="popup__user-img" />
					<img v-else :src="user.avatar" alt="user" class="popup__user-img" />
					<input type="file" class="popup__user-load" name="avatar" id="avatar" @change="upload" />
					<div class="popup__user-button">Изменить</div>
				</label>
				<form class="popup__user-info" onsubmit="return false">
					<label class="popup__user-label">
						Имя:
						<input
							type="text"
							:class="errMessage.name ? 'error' : ''"
							class="popup__input-name"
							placeholder="Имя"
							v-model="user.name"
							required
						/>
						<output>{{ errMessage.name }}</output>
					</label>
					<label class="popup__user-label">
						Email:
						<input
							type="email"
							:class="errMessage.email ? 'error' : ''"
							class="popup__input-email"
							placeholder="Email"
							v-model="user.email"
							required
						/>
						<output>{{ errMessage.email }}</output>
					</label>
					<label class="popup__user-label">
						Пороль:
						<input
							type="password"
							:class="errMessage.pass ? 'error' : ''"
							class="popup__input-pass"
							placeholder="Пароль"
							v-model="user.pass"
							required
						/>
						<output>{{ errMessage.pass }}</output>
					</label>
					<div class="popup__user-buttons">
						<button @click="checkInput" class="popup__user-button">Сохранить</button>
						<button @click="close()" class="popup__user-button">Закрыть</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
	import userService from '@/services/user-service';
	export default {
		props: {
			close: Function,
		},
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
			this.user = { ...this.$store.getters.user };
		},
	};
</script>

<style lang="scss">
	.popup {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #000000ab;
		&__user {
			display: flex;
			padding: 3rem;
			border: 0.1rem solid #eeeeee;
			border-radius: 0.4rem;
			background-color: white;
		}

		&__user-avatar {
			display: flex;
			flex-direction: column;
			align-items: center;
		}

		&__user-img {
			width: 25rem;
			height: 25rem;
			border: 0.1rem solid #eeeeee;
			border-radius: 50%;
		}

		&__user-load {
			width: 0;
			height: 0;
			position: absolute;
			opacity: 0;
		}
		&__user-buttons {
			width: 100%;
			display: flex;
			justify-content: space-between;
		}
		&__user-button {
			font-size: 1.4rem;
			text-transform: uppercase;
			border: 0.1rem solid #eee;
			padding: 1rem;
			border-radius: 0.4rem;
			color: #757575;
			margin: 1rem 0;
			cursor: pointer;
		}

		&__user-info {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			font-size: 1.5rem;
			flex-grow: 1;
			padding: 2rem;
		}

		&__user-label {
			display: flex;
			justify-content: space-around;
			flex-direction: column;
			width: 100%;
			& output {
				margin: 1.5rem 0;
				color: red;
				font-size: 1.5rem;
			}
		}

		&__input-name {
			height: 4rem;
			border: 0.1rem solid #eeeeee;
			border-radius: 0.4rem;
			padding: 1rem 1.5rem;
			font-size: 1.6rem;
		}

		&__input-email {
			height: 4rem;
			border: 0.1rem solid #eeeeee;
			border-radius: 0.4rem;
			padding: 1rem 1.5rem;
			font-size: 1.6rem;
		}

		&__input-pass {
			height: 4rem;
			border: 0.1rem solid #eeeeee;
			border-radius: 0.4rem;
			padding: 1rem 1.5rem;
			font-size: 1.6rem;
		}
	}
	.popup-content {
		width: 70rem;
	}
	.error {
		border-color: red;
	}
</style>
