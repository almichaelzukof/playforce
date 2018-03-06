import React, { Component } from 'react'
import PropTypes from 'prop-types'
import IconButton from 'material-ui/IconButton'
import ArrowBackIcon from 'material-ui-icons/ArrowBack'
import DeleteIcon from 'material-ui-icons/Delete'
import EditIcon from 'material-ui-icons/Edit'
import DirectionsIcon from 'material-ui-icons/Directions'
import Card, { CardContent } from 'material-ui/Card'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Chip from 'material-ui/Chip'
import Button from 'material-ui/Button'
import { StyledSiteDetail } from './StyledSiteDetail'
import { StyledNavLink } from '../../../../components/styledNavLink/StyledNavLink'
import Modal from '../../../../components/modal/Modal'
import Loadable from '../../../../components/loadable/LoadableCircular'
import { ModalContent } from './modalContent/ModalContent'
import { data } from '../../data'

const Map = Loadable({
  loader: () => import('./Map'),
})

export class SiteDetail extends Component {
  state = {
    modalOpen: false,
  }

  componentDidMount() {
    const { history, site } = this.props

    const {
      setLeftNavComponent,
      setRightNavComponent,
      setNavTitle,
    } = this.context
    const { name, street, suburb, state, postcode, country } = site
    const address = `${street}+${suburb}+${state}+${postcode}+${country}`
    const encodedAddress = encodeURI(address)

    setLeftNavComponent(
      <IconButton color="inherit" aria-label="Search" onClick={history.goBack}>
        <ArrowBackIcon />
      </IconButton>,
    )

    setNavTitle(name)

    setRightNavComponent(
      <div>
        <a
          target="_blank"
          href={`https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`}
          style={{
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          <IconButton color="inherit" aria-label="Directions">
            <DirectionsIcon />
          </IconButton>
        </a>
        <IconButton
          color="inherit"
          aria-label="Search"
          onClick={this.openModal}
        >
          <DeleteIcon />
        </IconButton>
      </div>,
    )
  }

  componentWillUnmount() {
    const {
      removeLefNavComponent,
      removeNavTitle,
      removeRightNavComponent,
    } = this.context

    removeLefNavComponent()
    removeNavTitle()
    removeRightNavComponent()
  }

  openModal = () => {
    this.setState({ modalOpen: true })
  }

  closeModal = () => {
    this.setState({ modalOpen: false })
  }

  render() {
    const { match, site } = this.props

    const {
      latitidue,
      longitude,
      street,
      suburb,
      state,
      postcode,
      country,
      operator,
      division,
      inspections,
    } = site
    const address = `${street} , ${suburb} ${state} ${postcode}, ${country}`
    const operatorName = data.operators[operator - 1].name
    const chips = inspections.map(({ type }) => (
      <Chip
        style={{ marginTop: 8, marginRight: 8 }}
        component="span"
        label={type}
        key={type}
      />
    ))

    return (
      <StyledSiteDetail>
        <Card className="card">
          <StyledNavLink to={match.url + '/edit/general'} className="edit-icon">
            <Button variant="fab" color="primary" aria-label="edit inspection">
              <EditIcon />
            </Button>
          </StyledNavLink>
          <Map lat={latitidue} lng={longitude} />
          <CardContent>
            <List>
              <ListItem divider>
                <ListItemText primary="Address" secondary={address} />
              </ListItem>
              <ListItem divider>
                <ListItemText primary="Operator" secondary={operatorName} />
              </ListItem>
              <ListItem divider>
                <ListItemText primary="Division" secondary={division} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Inspection Types" secondary={chips} />
              </ListItem>
            </List>
          </CardContent>
        </Card>
        <Modal
          open={this.state.modalOpen}
          handleClose={this.closeModal}
          hideCloseIcon
        >
          <ModalContent closeModal={this.closeModal} />
        </Modal>
      </StyledSiteDetail>
    )
  }
}

SiteDetail.contextTypes = {
  setLeftNavComponent: PropTypes.func,
  removeLefNavComponent: PropTypes.func,
  setRightNavComponent: PropTypes.func,
  removeRightNavComponent: PropTypes.func,
  setNavTitle: PropTypes.func,
  removeNavTitle: PropTypes.func,
}
