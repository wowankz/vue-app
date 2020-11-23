import Vue from 'vue'
import Vuex from 'vuex'

import { Get } from '@/services/http-service';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    articles: [],
    search: ''
  },
  mutations: {
    search(state, searchString) {
      state.search = searchString;
    },

    initUser(state, user) {
      state.user = { ...user };
    },

    updateUser(state, user) {
      state.user = { ...user };
      window.localStorage.setItem('User', JSON.stringify(user));
    },

    initArticles(state, articles) {
      state.articles = [...articles]
    },

    updateArticle(state, article) {
      let index = state.articles.findIndex((item) => item.id == article.id);
      if (index !== -1) {
        state.articles[index] = article;
        state.articles = [...state.articles];
      } else {
        article.id = Date.now();
        state.articles.push(article);
      }
      window.localStorage.setItem('Articles', JSON.stringify(state.articles));
    }
  },
  getters: {
    search(state) {
      return state.search;
    },
    user(state) {
      return state.user;
    },
    articles(state) {
      return state.articles;
    }
  },
  actions: {
    initUser({ commit }) {
      let user = window.localStorage.getItem('User');
      user = user ? JSON.parse(user) : {};
      commit('initUser', user);
    },

    async initArticles({ commit, state }) {
      let articles = window.localStorage.getItem('Articles');
      if (articles) {
        commit('initArticles', JSON.parse(articles));
        return;
      }

      articles = await Get('https://raw.githubusercontent.com/wowankz/static/master/test/articles.json');
      if (articles) {
        for (let article of articles) {
          article.user.name = state.user.name;
          article.user.email = state.user.email;
          article.user.avatar = state.user.avatar;
          article.date = Date.now()
        }
        window.localStorage.setItem('Articles', JSON.stringify(articles));
        commit('initArticles', articles);
      }

    }

  },
  modules: {
  }
})
