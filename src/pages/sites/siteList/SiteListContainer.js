import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRouter } from 'react-router'
import { withFirestore } from 'react-redux-firebase'
import { SiteList } from './SiteList'
import {
  openSearchBar,
  closeSearchBar,
} from '../../../store/actions/actionCreators/searchBarActions'
import {
  setView,
  toggleView,
  fetchSitesRealTime,
  searchSites,
} from '../../../store/actions/actionCreators/siteActions/'

const mapStateToProps = ({
  firestore: {
    data: { users },
  },
  firebase: {
    auth: { uid },
  },
  searchBar: { open, query, results },
  site: { view, sitesLoaded, sites },
}) => ({
  userId: uid,
  searchBarOpen: open,
  searchResults: results,
  query,
  view,
  sitesLoaded,
  sites,
})

const mapDispatchToProps = {
  openSearchBar,
  closeSearchBar,
  setView,
  toggleView,
  fetchSitesRealTime,
  searchSites,
}

export const SiteListContainer = compose(
  withRouter,
  withFirestore,
  connect(mapStateToProps, mapDispatchToProps)
)(SiteList)
