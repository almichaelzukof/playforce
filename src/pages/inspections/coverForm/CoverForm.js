import React, { Component } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import StayCurrentLandscapeIcon from '@material-ui/icons/StayCurrentLandscape'
import AddBoxIcon from '@material-ui/icons/AddBox'
import DateRangeIcon from '@material-ui/icons/DateRange'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import { DatePicker } from 'material-ui-pickers'
import { AddSiteDialogContainer } from '../../../components/addSiteDialog/AddSiteDialogContainer'
import { ClientsDialogContainer } from '../../../components/clientsDialog/ClientsDialogContainer'
import { AutoComplete } from '../../../components/autoComplete/AutoComplete'
import {
  showContentWhenLoaded,
  onEventInputChange,
  onValueInputChange,
} from '../../../functions/'
import {
  contextTypesUnsubscriber,
  defaultInspectionTypes,
} from '../../../constants/'
import {
  onComponentDidMount,
  onComponentWillReceiveProps,
  getLocationSuggestions,
  getClientSuggestions,
  submit,
} from './functions/'
import { StyledCoverForm } from './StyledCoverForm'

export class CoverForm extends Component {
  state = {
    location: '',
    client: '',
    inspectionDate: new Date(),
    appliedStandards: [],
    inspectionType: '',
  }

  componentDidMount() {
    onComponentDidMount(this)
  }

  componentWillReceiveProps(nextProps) {
    onComponentWillReceiveProps(this, nextProps)
  }

  onEventInputChange = onEventInputChange
  onValueInputChange = onValueInputChange

  render() {
    const {
      location,
      client,
      inspectionDate,
      appliedStandards,
      inspectionType,
    } = this.state
    const {
      image,
      captureImage,
      displayName,
      sitesLoaded,
      standardsLoaded,
      standards,
      clientsLoaded,
      inspectionTypesLoaded,
      inspectionTypes,
      openDialog,
      error,
      loading,
      buttonText,
    } = this.props

    const isLoaded =
      sitesLoaded && standardsLoaded && clientsLoaded && inspectionTypesLoaded

    return showContentWhenLoaded(
      isLoaded,
      <StyledCoverForm className="StyledCoverForm">
        <Card className="card">
          {image && <img src={image} alt="cover" />}

          <CardContent>
            <Button
              fullWidth
              variant="raised"
              color="primary"
              className="submit-button"
              onClick={() =>
                captureImage({ width: 1024, height: (1024 * 432) / 764 })
              }
            >
              Capture Image
              <StayCurrentLandscapeIcon className="button-icon" />
            </Button>
            <form noValidate>
              <div className="with-button with-autocomplete">
                <AutoComplete
                  label="Location"
                  value={location}
                  onChange={this.onValueInputChange('location')}
                  getSuggestions={getLocationSuggestions(this)}
                />
                <IconButton onClick={() => openDialog(AddSiteDialogContainer)}>
                  <AddBoxIcon />
                </IconButton>
              </div>

              <div className="with-button with-autocomplete">
                <AutoComplete
                  label="Client"
                  value={client}
                  onChange={this.onValueInputChange('client')}
                  getSuggestions={getClientSuggestions(this)}
                />
                <IconButton onClick={() => openDialog(ClientsDialogContainer)}>
                  <AddBoxIcon />
                </IconButton>
              </div>

              <DatePicker
                fullWidth
                keyboard
                clearable
                className="date-picker"
                label="Inspection Date"
                format="DD MMMM YYYY"
                value={inspectionDate}
                keyboardIcon={<DateRangeIcon />}
                leftArrowIcon={<ArrowBackIcon />}
                rightArrowIcon={<ArrowForwardIcon />}
                onChange={this.onValueInputChange('inspectionDate')}
                animateYearScrolling={false}
              />

              <TextField
                fullWidth
                label="Inspected By"
                value={displayName}
                margin="normal"
              />

              <TextField
                fullWidth
                select
                SelectProps={{
                  multiple: true,
                }}
                label="Applied Standard"
                value={appliedStandards}
                onChange={this.onEventInputChange('appliedStandards')}
                margin="normal"
              >
                {standards.length > 0 ? (
                  standards.map(({ title, code, publishDate, id }, index) => {
                    return (
                      <MenuItem key={index} value={id}>
                        {`${title} ${code}`}
                      </MenuItem>
                    )
                  })
                ) : (
                  <MenuItem value="">No standards addded</MenuItem>
                )}
              </TextField>

              <TextField
                fullWidth
                select
                label="Inspection Type"
                value={inspectionType}
                onChange={this.onEventInputChange('inspectionType')}
                margin="normal"
              >
                {inspectionTypes.length > 0
                  ? inspectionTypes.map(({ name, id }) => {
                      return (
                        <MenuItem key={id} value={name}>
                          {name}
                        </MenuItem>
                      )
                    })
                  : defaultInspectionTypes.map((type, index) => {
                      return (
                        <MenuItem key={index} value={type}>
                          {type}
                        </MenuItem>
                      )
                    })}
              </TextField>
            </form>

            {error && <p className="error">{error}</p>}

            {!error &&
              loading && (
                <div className="loading">
                  <CircularProgress />
                </div>
              )}

            {!loading && (
              <Button
                fullWidth
                variant="raised"
                color="primary"
                className="submit-button"
                onClick={submit(this)}
              >
                {buttonText ? buttonText : 'Publish'}
              </Button>
            )}
          </CardContent>
        </Card>
      </StyledCoverForm>
    )
  }
}

CoverForm.contextTypes = contextTypesUnsubscriber
