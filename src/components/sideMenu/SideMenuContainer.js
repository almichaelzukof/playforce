import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRouter } from 'react-router'
import { withFirebase } from 'react-redux-firebase'
import { closeSideMenu } from '../../store/actions/actionCreators/sideMenuActions'
import { signOut } from '../../store/actions/actionCreators/authActions/'
import SideMenu from './SideMenu'

const mapStateToProps = ({
  firebase: {
    auth,
    profile: { role },
  },
  sideMenu: { open },
}) => ({
  auth,
  role,
  open,
})

const mapDispatchToProps = { closeSideMenu, signOut }

export const SideMenuContainer = compose(
  withRouter,
  withFirebase,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(SideMenu)
