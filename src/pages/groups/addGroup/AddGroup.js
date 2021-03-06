import React, { Component } from "react"
import CircularProgress from "@material-ui/core/CircularProgress"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import { onEventInputChange } from "../../../functions/onEventInputChange"
import { NavContext } from "components/NavContextProvider/"
import {
  onComponentDidMount,
  onComponentWillUnmount,
  submit,
} from "./functions/"
import { StyledAddGroup } from "./StyledAddGroup"

export class AddGroup extends Component {
  state = { name: "" }

  componentDidMount() {
    onComponentDidMount(this)
  }

  componentWillUnmount() {
    onComponentWillUnmount(this)
  }

  render() {
    const { name } = this.state
    const { error, loading } = this.props

    return (
      <StyledAddGroup className="StyledAddGroup">
        <Card className="card">
          <CardContent>
            <form noValidate>
              <TextField
                fullWidth
                label="Group Name"
                value={name}
                margin="normal"
                onChange={onEventInputChange(this, "name")}
              />
            </form>

            {error && <p className="error">{error}</p>}

            {!error && loading && (
              <div className="loading">
                <CircularProgress />
              </div>
            )}

            {!loading && (
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className="submit-button"
                onClick={submit(this)}
              >
                Publish
              </Button>
            )}
          </CardContent>
        </Card>
      </StyledAddGroup>
    )
  }
}

AddGroup.contextType = NavContext
