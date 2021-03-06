import React, { Component } from "react"
import TextField from "@material-ui/core/TextField"
import MenuItem from "@material-ui/core/MenuItem"
import FormControl from "@material-ui/core/FormControl"
import Typography from "@material-ui/core/Typography"
import { NavContext } from "components/NavContextProvider/"
import { Content } from "../../components/content/Content"
import { individualUserMode } from "../../constants/"
import { showContentWhenLoaded, getUserMode } from "../../functions/"
import { onComponentDidMount } from "./onComponentDidMount"

export class Dashboard extends Component {
  componentDidMount() {
    onComponentDidMount(this)
  }

  render() {
    const {
      userGroupsLoaded,
      userMode,
      setUserMode,
      userGroups,
      inspectionCount,
      inspectionCompleteCount,
    } = this.props

    const isMember = userGroups && userGroups.length > 0

    return showContentWhenLoaded(
      userGroupsLoaded,
      <Content>
        <TextField
          fullWidth
          select
          label="Select app mode"
          margin="normal"
          value={getUserMode(userMode)}
          onChange={event =>
            userMode !== event.target.value && setUserMode(event.target.value)
          }
        >
          <MenuItem value={individualUserMode}>{individualUserMode}</MenuItem>

          {isMember && <MenuItem disabled>Group Member</MenuItem>}

          {isMember &&
            userGroups.map(({ id, name }, index) => (
              <MenuItem key={index} value={id}>
                {name}
              </MenuItem>
            ))}
        </TextField>

        <FormControl margin="normal">
          <Typography variant="subtitle1">
            Open inspections: {inspectionCount - inspectionCompleteCount}
          </Typography>
        </FormControl>
      </Content>
    )
  }
}

Dashboard.contextType = NavContext
