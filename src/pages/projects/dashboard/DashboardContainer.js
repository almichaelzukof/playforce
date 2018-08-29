import { connect } from 'react-redux'
import { compose } from 'redux'
import { withFeedback } from '../../../hocs/withFeedback/withFeedback'
import { addProject } from '../../../store/actions/actionCreators/projectActions/'
import { Dashboard } from './Dashboard'

const mapStateToProps = ({ firebase }) => ({
  userId: firebase.auth.uid,
})

const mapDispatchToProps = { addProject }

const enhance = compose(
  withFeedback,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)

export const DashboardContainer = enhance(Dashboard)
