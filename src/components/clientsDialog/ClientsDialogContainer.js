import { connect } from 'react-redux'
import { compose } from 'redux'
import { addClient } from '../../store/actions/actionCreators/clientActions/'
import { withFeedback } from '../../hocs/withFeedback/withFeedback'
import { ClientsDialog } from './ClientsDialog'

const mapStateToProps = ({
  firebase: {
    auth: { uid },
  },
}) => ({
  userId: uid,
})

const mapDispatchToProps = { addClient }

export const ClientsDialogContainer = compose(
  withFeedback,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ClientsDialog)
