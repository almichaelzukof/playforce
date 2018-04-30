import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { LinearProgress } from 'material-ui/Progress'
import IconButton from 'material-ui/IconButton'
import ArrowBackIcon from 'material-ui-icons/ArrowBack'
import Card from 'material-ui/Card'
import NavBar from '../../../components/navBar/'
import { StyledMainContent } from '../../../components/shell/StyledMainContent'
import { ManufacturerList } from '../../settings/manufacturers/ManufacturerList'
import { FormContainer } from '../../settings/manufacturers/FormContainer'
import { StyledManufacturers } from '../../settings/manufacturers/StyledManufacturers'

export class Manufacturers extends Component {
  componentDidMount() {
    const {
      manufacturersLoaded,
      fetchManufacturersRealTime,
      userId,
    } = this.props

    !manufacturersLoaded && fetchManufacturersRealTime(userId)
  }

  delete = async id => {
    const { openDialog, deleteManufacturer, userId } = this.props
    openDialog(() => deleteManufacturer(userId, id))
  }

  render() {
    const { manufacturersLoaded, manufacturers, closeDialog } = this.props

    return manufacturersLoaded ? (
      <div>
        <NavBar
          title="Manufacturers"
          leftComponent={
            <IconButton
              color="inherit"
              aria-label="close"
              onClick={closeDialog}
            >
              <ArrowBackIcon />
            </IconButton>
          }
        />
        <StyledMainContent className="StyledMainContent">
          <StyledManufacturers className="StyledManufacturers">
            <Card className="card">
              <ManufacturerList
                manufacturers={manufacturers}
                deletePrompt={this.delete}
              />

              <FormContainer />
            </Card>
          </StyledManufacturers>
        </StyledMainContent>
      </div>
    ) : (
      <LinearProgress />
    )
  }
}

Manufacturers.contextTypes = {
  setNavTitle: PropTypes.func,
  removeNavTitle: PropTypes.func,
  setLeftNavComponent: PropTypes.func,
  removeLefNavComponent: PropTypes.func,
}