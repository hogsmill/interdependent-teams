import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    host: false,
    currentTab: 'game',
    thisGame: 'Interdependenet Teams',
    organisations: [],
    editingOrganisationId: ''
  },
  getters: {
    getHost: (state) => {
      return state.host
    },
    getCurrentTab: (state) => {
      return state.currentTab
    },
    getThisGame: (state) => {
      return state.thisGame
    },
    getColumns: (state) => {
      return state.columns
    },
    getOrganisations: (state) => {
      return state.organisations
    },
    getEditingOrganisationId: (state) => {
      return state.editingOrganisationId
    },
    getEditingTeams: (state) => {
      const organisation = state.organisations.find(function(o) {
        return o.id == state.editingOrganisationId
      })
      return organisation ? organisation.teams : []
    }
  },
  mutations: {
    updateHost: (state, payload) => {
      state.host = payload
    },
    updateCurrentTab: (state, payload) => {
      state.currentTab = payload
    },
    loadOrganisations: (state, payload) => {
      state.organisations = payload
    },
    setEditingOrganisationId: (state, payload) => {
      state.editingOrganisationId = payload
    }
  },
  actions: {
    updateHost: ({ commit }, payload) => {
      commit('updateHost', payload)
    },
    updateCurrentTab: ({ commit }, payload) => {
      commit('updateCurrentTab', payload)
    },
    loadOrganisations: ({ commit }, payload) => {
      commit('loadOrganisations', payload)
    },
    setEditingOrganisationId: ({ commit }, payload) => {
      commit('setEditingOrganisationId', payload)
    }
  }
})
