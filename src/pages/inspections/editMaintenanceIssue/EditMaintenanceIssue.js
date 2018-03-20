import React, { Component } from 'react'
import PropTypes from 'prop-types'
import IconButton from 'material-ui/IconButton'
import ArrowBackIcon from 'material-ui-icons/ArrowBack'
import Card, { CardContent, CardMedia } from 'material-ui/Card'
import Button from 'material-ui/Button'
import { StyledEditMaintenanceIssue } from './StyledEditMaintenanceIssue'
import { defaultEquipments } from '../../../globals/scales'
import { MaintenanceIssueForm } from '../MaintenanceIssueForm'

export class EditMaintenanceIssue extends Component {
  state = {
    finding: '',
    equipment: '',
    recommendations: '',
    defaultEquipmentIndex: '',
  }

  componentDidMount() {
    const { setNavTitle, setLeftNavComponent } = this.context
    const { history, maintenanceIssue } = this.props

    setNavTitle('Edit Maintenance Issue')

    setLeftNavComponent(
      <IconButton color="inherit" aria-label="go back" onClick={history.goBack}>
        <ArrowBackIcon />
      </IconButton>,
    )

    this.loadInitialData(maintenanceIssue)
  }

  componentWillUnmount() {
    const { removeNavTitle, removeLefNavComponent } = this.context

    removeNavTitle()
    removeLefNavComponent()
  }

  onEquipmentChange = event => {
    const defaultEquipmentIndex = event.target.value

    this.setState({
      defaultEquipmentIndex,
      equipment: defaultEquipments[defaultEquipmentIndex],
    })
  }

  onInputChange = name => event => {
    this.setState({
      [name]: event.target.value,
    })
  }

  loadInitialData = maintenanceIssue => {
    const { setCapturedImage } = this.props
    const { image } = maintenanceIssue

    setCapturedImage(image)
    this.setState({ ...maintenanceIssue })
  }

  editMaintenanceIssue = () => {
    const {
      editMaintenanceIssue,
      history,
      setErrorLoadingState,
      maintenanceIssueIndex,
      image,
    } = this.props
    const { finding, equipment, recommendations } = this.state

    if (image && finding && equipment && recommendations) {
      setErrorLoadingState({ error: '' })
      editMaintenanceIssue({
        issueIndex: maintenanceIssueIndex,
        updatedValue: {
          image,
          finding,
          equipment,
          recommendations,
        },
      })
      history.goBack()
    } else {
      setErrorLoadingState({
        error: 'Please fill up the form correctly!',
      })
    }
  }

  delete = () => {
    const {
      deleteMaintenanceIssue,
      maintenanceIssueIndex,
      history,
    } = this.props

    deleteMaintenanceIssue(maintenanceIssueIndex)
    history.goBack()
  }

  render() {
    const { image, captureImage, error, openModal } = this.props

    return (
      <StyledEditMaintenanceIssue className="StyledEditMaintenanceIssue">
        <Card>
          {image && <CardMedia className="card-media" image={image} />}
          <CardContent>
            <Button
              fullWidth
              variant="raised"
              color="primary"
              className="submit-button"
              onClick={captureImage}
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
              color="inherit"
              className="submit-button discard-button"
              onClick={() => openModal(this.delete)}
            >
              delete
            </Button>

            <Button
              fullWidth
              variant="raised"
              color="primary"
              className="submit-button"
              onClick={this.editMaintenanceIssue}
            >
              save
            </Button>
          </CardContent>
        </Card>
      </StyledEditMaintenanceIssue>
    )
  }
}

EditMaintenanceIssue.contextTypes = {
  setNavTitle: PropTypes.func,
  removeNavTitle: PropTypes.func,
  setLeftNavComponent: PropTypes.func,
  removeLefNavComponent: PropTypes.func,
}
