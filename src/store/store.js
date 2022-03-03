
import { createStore } from 'vuex'

function selectedOrganisation(state) {
  return state.organisations.find(function(o) {
    return o.id == state.organisationId
  })
}

function selectedTeam(state) {
  let team
  const organisation = state.organisations.find(function(o) {
    return o.id == state.organisationId
  })
  if (organisation) {
    team = organisation.teams.find(function(t) {
      return t.id == state.teamId
    })
  }
  return team
}

export const store = createStore({
  state: {
    host: false,
    currentTab: 'game',
    thisGame: 'Interdependenet Teams',
    modals: {
      'feedback': false
    },
    organisations: [],
    organisationId: null,
    teamId: null,
    myName: {},
    editingOrganisationId: '',
    editingTeamId: ''
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
    getModals: (state) => {
      return state.modals
    },
    getOrganisations: (state) => {
      return state.organisations
    },
    getOrganisationId: (state) => {
      return state.organisationId
    },
    getOrganisation: (state) => {
      return selectedOrganisation(state)
    },
    getTeamId: (state) => {
      return state.teamId
    },
    getTeam: (state) => {
      return selectedTeam(state)
    },
    getPolicies: (state) => {
      const team = selectedTeam(state)
      return team ? team.policies : []
    },
    getPolicy: (state) => {
      const team = selectedTeam(state)
      return team ? team.policy : ''
    },
    getColumns: (state) => {
      const team = selectedTeam(state)
      return team ? team.columns : []
    },
    getMyName: (state) => {
      return state.myName
    },
    getEditingOrganisationId: (state) => {
      return state.editingOrganisationId
    },
    getEditingTeams: (state) => {
      const organisation = state.organisations.find(function(o) {
        return o.id == state.editingOrganisationId
      })
      return organisation ? organisation.teams : []
    },
    getEditingTeamId: (state) => {
      return state.editingTeamId
    },
    getEditingPlayers: (state) => {
      let players = []
      const organisation = state.organisations.find(function(o) {
        return o.id == state.editingOrganisationId
      })
      if (organisation) {
        const team = organisation.teams.find(function(t) {
          return t.id == state.editingTeamId
        })
        if (team) {
          players = team.players
        }
      }
      return players
    }
  },
  mutations: {
    updateHost: (state, payload) => {
      state.host = payload
    },
    updateCurrentTab: (state, payload) => {
      state.currentTab = payload
    },
    showModal: (state, payload) => {
      const modals = Object.keys(state.modals)
      for (let i = 0; i < modals.length; i++) {
        state.modals[modals[i]] = false
      }
      state.modals[payload] = true
    },
    hideModal: (state, payload) => {
      state.modals[payload] = false
    },
    loadOrganisations: (state, payload) => {
      state.organisations = payload
      let organisation
      if (payload.organisationFromUrl) {
        organisation = state.organisations.find(function(o) {
          return o.name == payload.organisationFromUrl
        })
        if (organisation) {
          state.organisationId = organisation.id
        }
      }
      if (organisation && payload.teamFromUrl) {
        const team = organisation.teams.find(function(t) {
          return t.name == payload.teamFromUrl
        })
        if (team) {
          state.teamId = team.id
        }
      }
    },
    setOrganisationId: (state, payload) => {
      state.organisationId = payload
    },
    setTeamId: (state, payload) => {
      state.teamId = payload
    },
    setMyName: (state, payload) => {
      state.myName = payload
    },
    setEditingOrganisationId: (state, payload) => {
      state.editingOrganisationId = payload
    },
    setEditingTeamId: (state, payload) => {
      state.editingTeamId = payload
      console.log(state)
    }
  },
  actions: {
    updateHost: ({ commit }, payload) => {
      commit('updateHost', payload)
    },
    updateCurrentTab: ({ commit }, payload) => {
      commit('updateCurrentTab', payload)
    },
    showModal: ({ commit }, payload) => {
      commit('showModal', payload)
    },
    hideModal: ({ commit }, payload) => {
      commit('hideModal', payload)
    },
    loadOrganisations: ({ commit }, payload) => {
      commit('loadOrganisations', payload)
    },
    setOrganisationId: ({ commit }, payload) => {
      commit('setOrganisationId', payload)
    },
    setTeamId: ({ commit }, payload) => {
      commit('setTeamId', payload)
    },
    setMyName: ({ commit }, payload) => {
      commit('setMyName', payload)
    },
    setEditingOrganisationId: ({ commit }, payload) => {
      commit('setEditingOrganisationId', payload)
    },
    setEditingTeamId: ({ commit }, payload) => {
      commit('setEditingTeamId', payload)
    }
  }
})
