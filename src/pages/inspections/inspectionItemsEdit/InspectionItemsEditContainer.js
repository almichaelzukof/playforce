import { connect } from 'react-redux'
import { compose } from 'redux'
import { withFirestore, withFirebase } from 'react-redux-firebase'
import { InspectionItemsEdit } from './InspectionItemsEdit'
import {
  fetchInspection,
  saveInspection,
  deleteInspection,
  discardInspection,
} from '../../../store/actions/actionCreators/inspectionActions//'
import { fetchStandards } from '../../../store/actions/actionCreators/standardActions'
import { fetchEquipments } from '../../../store/actions/actionCreators/equipmentActions'
import { withFeedback } from '../../../hocs/withFeedback/withFeedback'
import { withDeleteModal } from '../../../hocs/withDeleteModal/withDeleteModal'

const mapStateToProps = (
  {
    firebase: {
      auth: { uid },
      profile: { displayName, inspectionCount },
    },
    firestore: {
      data: { users },
    },
    inspection,
    standard: { standardsLoaded, standards },
  },
  {
    location: {
      state: { id },
    },
  }
) => ({
  userId: uid,
  inspectionId: id,
  savedInspection:
    users && users[uid].inspections && users[uid].inspections[id],
  inspection,
  inspectionCount,
  displayName,
  standardsLoaded,
  standards,
})

const mapDispatchToProps = {
  fetchInspection,
  fetchStandards,
  saveInspection,
  discardInspection,
  deleteInspection,
  fetchEquipments,
}

export const InspectionItemsEditContainer = compose(
  withDeleteModal,
  withFeedback,
  withFirestore,
  withFirebase,
  connect(mapStateToProps, mapDispatchToProps)
)(InspectionItemsEdit)
