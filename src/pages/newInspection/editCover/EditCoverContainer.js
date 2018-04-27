import { connect } from 'react-redux'
import { compose } from 'redux'
import { withFeedback } from '../../../hocs/withFeedback/withFeedback'
import {
  fetchInspectionRealTime,
  editCover,
} from '../../../store/actions/actionCreators/newInspectionActions/'
import { EditCover } from './EditCover'

const mapStateToProps = (
  {
    firebase: {
      auth: { uid },
    },
    inspection: { inspectionLoaded, cover },
  },
  {
    match: {
      params: { id },
    },
  }
) => ({
  userId: uid,
  inspectionId: id,
  inspectionLoaded,
  cover,
})

const mapDispatchToProps = {
  fetchInspectionRealTime,
  editCover,
}

export const EditCoverContainer = compose(
  withFeedback,
  connect(mapStateToProps, mapDispatchToProps)
)(EditCover)
