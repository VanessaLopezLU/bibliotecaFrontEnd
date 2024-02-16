import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null, // Token de autenticación JWT
    user: null, // Datos del usuario autenticado
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      // Puedes guardar el token en el almacenamiento local para persistencia si lo deseas
      localStorage.setItem('token', token);
    },
    setUser(state, user) {
      state.user = user;
    },
    clearAuthData(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem('token'); // Limpia el token del almacenamiento local
    },
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await axios.post('/login', credentials); // Realiza una petición HTTP para iniciar sesión
        const { data } = response;
        commit('setToken', data.access_token);
        commit('setUser', data.user); // Establece los datos del usuario si es necesario
        return data; // Devuelve los datos de respuesta (podrían ser útiles)
      } catch (error) {
        throw error; // Maneja los errores de inicio de sesión
      }
    },
    logout({ commit }) {
      commit('clearAuthData');
      // Realiza una petición HTTP para cerrar sesión en el servidor si es necesario
    },
    tryAutoLogin({ commit }) {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }
      commit('setToken', token);
      // Puedes realizar una petición al servidor para obtener los datos del usuario y establecerlos en el store si es necesario
    },
  },
  getters: {
    isAuthenticated(state) {
      return state.token !== null;
    },
    getUser(state) {
      return state.user;
    },
  },
});

