import { connect } from 'react-redux'
import { compose } from 'redux'
import { withFirestore, withFirebase } from 'react-redux-firebase'
import { InspectionItemsAdd } from './InspectionItemsAdd'
import {
  discardInspection,
  saveInspection,
} from '../../../store/actions/actionCreators/inspectionActions'
import { withErrorLoadingSubmit } from '../../../hocs/withErrorLoadingSubmit/withErrorLoadingSubmit'
import { withDeleteModal } from '../../../hocs/withDeleteModal/withDeleteModal'

const mapStateToProps = ({ firebase: { auth: { uid } }, inspection }) => ({
  userId: uid,
  inspection,
})

const mapDispatchToProps = { discardInspection, saveInspection }

export const InspectionItemsAddContainer = compose(
  withDeleteModal,
  withErrorLoadingSubmit,
  withFirestore,
  withFirebase,
  connect(mapStateToProps, mapDispatchToProps),
)(InspectionItemsAdd)
