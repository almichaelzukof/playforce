import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Loadable from '../../components/loadable/LoadableLinear'
import SiteList from './siteList'

const Site = Loadable({
  loader: () => import('./site'),
})

const AddSite = Loadable({
  loader: () => import('./addSite'),
})

Site.preload()
AddSite.preload()

export const Sites = ({ email, match }) => {
  return (
    <Switch>
      <Route path={`${match.url}/add`} component={AddSite} />
      <Route path={`${match.url}/:id`} component={Site} />
      <Route path={match.url} render={() => <SiteList email={email} />} />
    </Switch>
  )
}
