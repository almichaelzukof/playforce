import {
  OPEN_SEARCH_BAR,
  CLOSE_SEARCH_BAR,
  TOGGLE_SEARCH_BAR,
  SET_SEARCH_QUERY,
  SET_SEARCH_RESULTS,
} from '../actionTypes'

export const openSearchBar = () => ({
  type: OPEN_SEARCH_BAR,
})

export const closeSearchBar = () => ({
  type: CLOSE_SEARCH_BAR,
})

export const toggleSearchBar = () => ({
  type: TOGGLE_SEARCH_BAR,
})

export const setSearchQuery = payload => ({
  type: SET_SEARCH_QUERY,
  payload,
})

export const setSearchResults = payload => ({
  type: SET_SEARCH_RESULTS,
  payload,
})
