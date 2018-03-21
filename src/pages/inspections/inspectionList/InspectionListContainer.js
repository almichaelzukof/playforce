import { connect } from 'react-redux'
import { compose } from 'redux'
import { withFirestore } from 'react-redux-firebase'
import { InspectionList } from './InspectionList'
import {
  openSearchBar,
  closeSearchBar,
} from '../../../store/actions/actionCreators/searchBarActions'

const mapStateToProps = ({
  firestore: { data: { users } },
  firebase: { auth: { uid } },
  searchBar: { open, query },
}) => ({
  inspections: users && users[uid].inspections && users[uid].inspections,
  userId: uid,
  open,
  query,
})

const mapDispatchToProps = { openSearchBar, closeSearchBar }

export const InspectionListContainer = compose(
  withFirestore,
  connect(mapStateToProps, mapDispatchToProps),
)(InspectionList)
