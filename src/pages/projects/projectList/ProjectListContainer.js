import { connect } from 'react-redux'
import { compose } from 'redux'
import { withDeleteDialog } from '../../../hocs/withDeleteDialog/withDeleteDialog'
import { withFeedback } from '../../../hocs/withFeedback/withFeedback'
import { fetchProjectsRealTime } from '../../../store/actions/actionCreators/projectActions/'
import { ProjectList } from './ProjectList'

const mapStateToProps = ({ firebase, project }) => {
  const { projectsLoaded, projects } = project

  return {
    userId: firebase.auth.uid,
    projectsLoaded,
    projects,
  }
}

const mapDispatchToProps = { fetchProjectsRealTime }

const enhance = compose(
  withFeedback,
  withDeleteDialog,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)

export const ProjectListContainer = enhance(ProjectList)
