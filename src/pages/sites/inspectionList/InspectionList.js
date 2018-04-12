import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'
import List, { ListItem, ListItemText, ListItemIcon } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'
import DeleteIcon from 'material-ui-icons/Delete'
import { isEmpty } from 'react-redux-firebase'
import { LinearProgress } from 'material-ui/Progress'
import { StyledInspectionList } from './StyledInspectionList'
import { StyledNavLink } from '../../../components/styledNavLink/StyledNavLink'

export class InspectionList extends Component {
  state = { unsubscribe: undefined }

  async componentDidMount() {
    this.context.setNavTitle('Edit Site')

    const { fetchInspectionsBySiteRealTime, userId, siteId } = this.props

    const unsubscribe = await fetchInspectionsBySiteRealTime(userId, siteId)
    this.setState({ unsubscribe })
  }

  componentWillUnmount() {
    const { unsubscribe } = this.state

    unsubscribe()
  }

  delete = async (index, inspectionId) => {
    const { inspections, deleteInspection, userId } = this.props

    const inspection = inspections[index]

    await deleteInspection({
      inspection,
      userId,
      inspectionId,
    })
  }

  render() {
    const { inspectionsLoaded, inspections, openModal } = this.props

    if (inspectionsLoaded) {
      const { match } = this.props
      return (
        <StyledInspectionList className="StyledInspectionList">
          <StyledNavLink to={match.url + '/addInspection'} className="add-icon">
            <Button variant="fab" color="primary" aria-label="add inspection">
              <AddIcon />
            </Button>
          </StyledNavLink>
          <Paper className="paper">
            <List component="nav" disablePadding>
              {isEmpty(inspections) ? (
                <ListItem>
                  <ListItemText primary="No inspection added" />
                </ListItem>
              ) : (
                inspections.map(
                  ({ type, id, inspectionNumber }, index, list) => {
                    return (
                      <div key={id}>
                        <ListItem button>
                          <ListItemText
                            primary={`Inspection #${inspectionNumber}`}
                          />
                          <ListItemIcon
                            onClick={() =>
                              openModal(() => this.delete(index, id))
                            }
                          >
                            <DeleteIcon />
                          </ListItemIcon>
                        </ListItem>
                        {index !== list.length - 1 && <Divider />}
                      </div>
                    )
                  }
                )
              )}
            </List>
          </Paper>
        </StyledInspectionList>
      )
    } else {
      return <LinearProgress />
    }
  }
}

InspectionList.contextTypes = {
  setNavTitle: PropTypes.func,
  removeNavTitle: PropTypes.func,
}
