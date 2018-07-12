import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import { deleteMaintenanceIssue } from './deleteMaintenanceIssue'

export const setRightNav = component => () => {
  const { setRightNavComponent } = component.context
  const { openDialog } = component.props

  setRightNavComponent(
    <IconButton
      color="inherit"
      aria-label="delete condition rating"
      onClick={() => openDialog(deleteMaintenanceIssue(component))}
    >
      <DeleteIcon />
    </IconButton>
  )
}
