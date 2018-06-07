import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'
import List, { ListItem, ListItemText, ListSubheader } from 'material-ui/List'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'
import IconButton from 'material-ui/IconButton'
import ArrowBackIcon from 'material-ui-icons/ArrowBack'
import DeleteIcon from 'material-ui-icons/Delete'
import { StyledNavLink } from '../../../components/styledNavLink/StyledNavLink'
import { StyledImpactTestDetailItems } from './StyledImpactTestDetailItems'

export class ImpactTestDetailItems extends Component {
  componentDidMount() {
    const {
      setNavTitle,
      setLeftNavComponent,
      setRightNavComponent,
    } = this.context
    const { history, openDialog, impactTest } = this.props

    setNavTitle(`Edit ${impactTest.surface.location}`)

    setLeftNavComponent(
      <IconButton
        color="inherit"
        aria-label="navigate back"
        onClick={() => history.goBack()}
      >
        <ArrowBackIcon />
      </IconButton>
    )

    setRightNavComponent(
      <IconButton
        color="inherit"
        aria-label="delete surface test"
        onClick={() => openDialog(this.delete)}
      >
        <DeleteIcon />
      </IconButton>
    )
  }

  componentWillUnmount() {
    const {
      removeNavTitle,
      removeLefNavComponent,
      removeRightNavComponent,
    } = this.context

    removeNavTitle()
    removeLefNavComponent()
    removeRightNavComponent()
  }

  showActionGoBack = message => {
    const { setFeedback, history } = this.props

    setFeedback({ success: message })
    history.goBack()
  }

  delete = async () => {
    const { inspectionId, userId, impactTest, deleteImpactSurface } = this.props

    await deleteImpactSurface(userId, inspectionId, impactTest)

    this.showActionGoBack(`${impactTest.surface.location} deleted!`)
  }

  render() {
    const { match, impactTest } = this.props

    return (
      <StyledImpactTestDetailItems className="StyledImpactTestDetailItems">
        <StyledNavLink to={`${match.url}/addDrop`} className="add-icon">
          <Button
            variant="fab"
            color="primary"
            aria-label="add drop test"
            className={
              impactTest &&
              impactTest.dropTests &&
              impactTest.dropTests.length > 0
                ? ''
                : 'pulse'
            }
          >
            <AddIcon />
          </Button>
        </StyledNavLink>
        <Paper>
          <List component="nav" disablePadding>
            <StyledNavLink to={`${match.url}/surface`}>
              <ListItem button>
                <ListItemText primary="Surface Details" />
              </ListItem>
            </StyledNavLink>
          </List>

          <List
            component="nav"
            disablePadding
            subheader={<ListSubheader component="div">Drops</ListSubheader>}
          >
            {impactTest &&
              impactTest.dropTests &&
              impactTest.dropTests.map(({ id }) => (
                <StyledNavLink key={id} to={`${match.url}/editDrop/${id}`}>
                  <ListItem button>
                    <ListItemText primary={`Drop ${id}`} />
                  </ListItem>
                </StyledNavLink>
              ))}
          </List>
        </Paper>
      </StyledImpactTestDetailItems>
    )
  }
}

ImpactTestDetailItems.contextTypes = {
  setNavTitle: PropTypes.func,
  removeNavTitle: PropTypes.func,
  setLeftNavComponent: PropTypes.func,
  removeLefNavComponent: PropTypes.func,
  setRightNavComponent: PropTypes.func,
  removeRightNavComponent: PropTypes.func,
}