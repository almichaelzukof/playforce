import { connect } from 'react-redux'
import { compose } from 'redux'
import { withFirestore } from 'react-redux-firebase'
import { withDeleteModal } from '../../../hocs/withDeleteModal/withDeleteModal'
import {
  fetchCommonIssue,
  saveCommonIssue,
  deleteCommonIssue,
} from '../../../store/actions/actionCreators/commonIssueActions/'
import { EditCommonIssue } from './EditCommonIssue'

const mapStateToProps = (
  {
    firebase: {
      auth: { uid },
    },
    firestore: {
      ordered: { users },
    },
    commonIssue: { commonIssuesLoaded, commonIssues, commonIssue },
  },
  {
    match: {
      params: { id },
    },
  }
) => ({
  userId: uid,
  commonIssueId: id,
  commonIssues,
  commonIssue:
    (commonIssuesLoaded && commonIssues.find(item => item.id === id)) ||
    commonIssue,
})

const mapDispatchToProps = {
  fetchCommonIssue,
  saveCommonIssue,
  deleteCommonIssue,
}

export const EditCommonIssueContainer = compose(
  withDeleteModal,
  withFirestore,
  connect(mapStateToProps, mapDispatchToProps)
)(EditCommonIssue)
