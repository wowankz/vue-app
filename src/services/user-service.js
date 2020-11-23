export default {
    upload(e, self) {
        e.preventDefault();
        const files = e.target.files;
        const reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onloadend = () => {
            self.user.avatar = reader.result;
        };
    },

    checkInput(self) {
        const userData = { checked: true };
        const reName = /^[a-zA-Z][a-zA-Z0-9]{2,14}$/;
        const reEmail = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/;
        const rePass = /^[A-Z][a-zA-Z0-9]{7,}$/;
        if (reName.test(self.user.name)) {
            self.errMessage.name = '';
            console.log('name : ', 'true');
            userData.name = self.user.name;
        } else {
            self.errMessage.name = 'Имя: Не менее 3-х и не более 15-ти символов';
            userData.checked = false;
        }

        if (reEmail.test(self.user.email)) {
            self.errMessage.email = '';
            console.log('email : ', 'true');
            userData.email = self.user.email;
        } else {
            self.errMessage.email = 'Email: введенный email должен быть в формате example@host.domen';
            userData.checked = false;
        }

        if (rePass.test(self.user.pass) && /[0-9]+/.test(self.user.pass)) {
            self.errMessage.pass = '';
            console.log('pass : ', 'true');
            userData.pass = self.user.pass;
        } else {
            self.errMessage.pass =
                'Пароль: Не менее 8-ми символов, латиница, должны присутствовать цифры, первый символ в верхнем регистре.';
            userData.checked = false;
            console.log(self.user.pass);
        }

        if (userData.checked) {
            userData.avatar = self.user.avatar;
            self.$store.commit('updateUser', userData);
            if (self.close) {
                self.close();
                return;
            }
            self.$router.push('/');
        }
    },
}