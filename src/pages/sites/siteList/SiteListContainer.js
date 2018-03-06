import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRouter } from 'react-router'
import { withFirestore, firestoreConnect } from 'react-redux-firebase'
import { SiteList } from './SiteList'
import {
  openSearchBar,
  closeSearchBar,
} from '../../../store/actions/actionCreators/searchBarActions'

const mapStateToProps = ({ firestore: { ordered: { sites } } }) => ({
  sites,
})

const mapDispatchToProps = { openSearchBar, closeSearchBar }

export const SiteListContainer = compose(
  withRouter,
  withFirestore,
  firestoreConnect(props => [{ collection: 'sites', orderBy: 'name' }]),
  connect(mapStateToProps, mapDispatchToProps),
)(SiteList)
