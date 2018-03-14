import React, { Component } from 'react'
import PropTypes from 'prop-types'
import IconButton from 'material-ui/IconButton'
import ArrowBackIcon from 'material-ui-icons/ArrowBack'
import Paper from 'material-ui/Paper'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Button from 'material-ui/Button'
import { StyledInspectionItems } from './StyledInspectionItems'
import { StyledNavLink } from '../../../components/styledNavLink/StyledNavLink'

export class InspectionItems extends Component {
  state = {}

  componentDidMount() {
    const { setNavTitle, setLeftNavComponent } = this.context
    const { history } = this.props

    setNavTitle('Add Inspection')

    setLeftNavComponent(
      <IconButton color="inherit" aria-label="Search" onClick={history.goBack}>
        <ArrowBackIcon />
      </IconButton>,
    )
  }

  componentWillUnmount() {
    const { removeNavTitle, removeLefNavComponent } = this.context

    removeNavTitle()
    removeLefNavComponent()
  }

  publish = () => {
    console.log('publish')
  }

  render() {
    const { match, discardInspection } = this.props

    return (
      <StyledInspectionItems>
        <Paper>
          <List component="nav" disablePadding>
            <StyledNavLink to={`${match.url}/cover`}>
              <ListItem button>
                <ListItemText primary="Cover" />
              </ListItem>
            </StyledNavLink>

            <StyledNavLink to={`${match.url}/auditSummary`}>
              <ListItem button>
                <ListItemText primary="Audit Summary" />
              </ListItem>
            </StyledNavLink>

            <StyledNavLink to={`${match.url}/conditionRating`}>
              <ListItem button>
                <ListItemText primary="Condition Rating" />
              </ListItem>
            </StyledNavLink>

            <StyledNavLink to={`${match.url}/complianceIssues`}>
              <ListItem button>
                <ListItemText primary="Identified Compliance Issues" />
              </ListItem>
            </StyledNavLink>

            <StyledNavLink to={`${match.url}/maintenanceIssues`}>
              <ListItem button>
                <ListItemText primary="Identified Maintenance Issues" />
              </ListItem>
            </StyledNavLink>

            <ListItem>
              <Button
                fullWidth
                variant="raised"
                color="inherit"
                className="submit-button discard-button"
                onClick={discardInspection}
              >
                Discard
              </Button>
            </ListItem>

            <ListItem>
              <Button
                fullWidth
                variant="raised"
                color="primary"
                className="submit-button"
                onClick={this.publish}
              >
                Publish Inspection
              </Button>
            </ListItem>
          </List>
        </Paper>
      </StyledInspectionItems>
    )
  }
}

InspectionItems.contextTypes = {
  setNavTitle: PropTypes.func,
  removeNavTitle: PropTypes.func,
  setLeftNavComponent: PropTypes.func,
  removeLefNavComponent: PropTypes.func,
}
