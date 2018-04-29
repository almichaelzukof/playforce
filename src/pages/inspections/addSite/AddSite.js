import React from 'react'
import IconButton from 'material-ui/IconButton'
import ArrowBackIcon from 'material-ui-icons/ArrowBack'
import NavBar from '../../../components/navBar/'
import { StyledMainContent } from '../../../components/shell/StyledMainContent'
import { SiteFormContainer } from '../../../components/siteForm/SiteFormContainer'

export const AddSite = ({ addSite, userId, closeDialog }) => {
  const submit = async site => {
    const siteId = await addSite(userId, site)

    return siteId
  }

  return (
    <div>
      <NavBar
        title="Add Site"
        leftComponent={
          <IconButton color="inherit" aria-label="close" onClick={closeDialog}>
            <ArrowBackIcon />
          </IconButton>
        }
      />
      <StyledMainContent className="StyledMainContent">
        <SiteFormContainer onSubmit={submit} />
      </StyledMainContent>
    </div>
  )
}
