import React from 'react'
import { withRouter } from 'react-router'
import { Route, Switch } from 'react-router-dom'
import EquipmentList from '../equipmentList/'

const EquipmentsTabWithoutRouter = ({ match }) => {
  return (
    <Switch>
      <Route
        path={match.url}
        render={() => <EquipmentList siteId={match.params.id} />}
      />
    </Switch>
  )
}

export const EquipmentsTab = withRouter(EquipmentsTabWithoutRouter)
