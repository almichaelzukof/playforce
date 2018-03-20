import React, { Component } from 'react'
import PropTypes from 'prop-types'
import IconButton from 'material-ui/IconButton'
import ArrowBackIcon from 'material-ui-icons/ArrowBack'
import Card, { CardContent, CardMedia } from 'material-ui/Card'
import Button from 'material-ui/Button'
import { StyledAddMaintenanceIssue } from './StyledAddMaintenanceIssue'
import { defaultEquipments } from '../../../globals/scales'
import { MaintenanceIssueForm } from '../MaintenanceIssueForm'

export class AddMaintenanceIssue extends Component {
  state = {
    image: null,
    finding: '',
    equipment: '',
    recommendations: '',
    defaultEquipmentIndex: '',
  }

  componentDidMount() {
    const { setNavTitle, setLeftNavComponent } = this.context
    const { history } = this.props

    setNavTitle('Add Maintenance Issue')

    setLeftNavComponent(
      <IconButton color="inherit" aria-label="go back" onClick={history.goBack}>
        <ArrowBackIcon />
      </IconButton>,
    )
  }

  componentWillUnmount() {
    const { removeNavTitle, removeLefNavComponent } = this.context

    removeNavTitle()
    removeLefNavComponent()
  }

  onInputChange = name => event => {
    this.setState({
      [name]: event.target.value,
    })
  }

  onEquipmentChange = event => {
    const defaultEquipmentIndex = event.target.value

    this.setState({
      defaultEquipmentIndex,
      equipment: defaultEquipments[defaultEquipmentIndex],
    })
  }

  capture = () => {
    this.fileInput.click()
  }

  getFile = event => {
    const reader = new FileReader()

    reader.readAsDataURL(event.target.files[0])

    reader.addEventListener(
      'load',
      () => {
        this.setState({ image: reader.result })
      },
      false,
    )
  }

  addMaintenanceIssue = () => {
    const { history, addMaintenanceIssue, setErrorLoadingState } = this.props
    const { image, finding, equipment, recommendations } = this.state

    if (image && finding && equipment && recommendations) {
      setErrorLoadingState({ error: '' })
      addMaintenanceIssue({ image, finding, equipment, recommendations })
      history.goBack()
    } else {
      setErrorLoadingState({
        error: 'Please fill up the form correctly!',
      })
    }
  }

  render() {
    const { image } = this.state
    const { error } = this.props

    return (
      <StyledAddMaintenanceIssue className="StyledAddMaintenanceIssue">
        <Card>
          {image && <CardMedia className="card-media" image={image} />}
          <CardContent>
            <Button
              fullWidth
              variant="raised"
              color="primary"
              className="submit-button"
              onClick={this.capture}
            >
              Capture Image
            </Button>

            <MaintenanceIssueForm
              {...this.state}
              onEquipmentChange={this.onEquipmentChange}
              onInputChange={this.onInputChange}
            />

            {error && <p className="error">{error}</p>}

            <Button
              fullWidth
              variant="raised"
              color="primary"
              className="submit-button"
              onClick={this.addMaintenanceIssue}
            >
              save
            </Button>
          </CardContent>
        </Card>
        <input
          type="file"
          accept="image/*"
          // capture="environment"
          style={{ display: 'none' }}
          ref={input => {
            this.fileInput = input
          }}
          onChange={this.getFile}
        />
      </StyledAddMaintenanceIssue>
    )
  }
}

AddMaintenanceIssue.contextTypes = {
  setNavTitle: PropTypes.func,
  removeNavTitle: PropTypes.func,
  setLeftNavComponent: PropTypes.func,
  removeLefNavComponent: PropTypes.func,
}
