import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Loadable from '../../../components/loadable/LoadableLinear'
import EditInspection from '../editInspection/'

const EditCover = Loadable({
  loader: () => import('../editCover'),
})
// const AuditSummary = Loadable({
//   loader: () => import('../auditSummary'),
// })
// const ConditionRating = Loadable({
//   loader: () => import('../conditionRating'),
// })
// const ComplianceIssues = Loadable({
//   loader: () => import('../complianceIssues'),
// })
const MaintenanceIssues = Loadable({
  loader: () => import('../maintenanceIssues'),
})

// Cover.preload()
// AuditSummary.preload()
// ConditionRating.preload()
// ComplianceIssues.preload()
MaintenanceIssues.preload()

export const EditInspectionRoutes = ({ match }) => {
  return (
    <Switch>
      <Route path={`${match.url}/:id/cover`} component={EditCover} />
      {/* <Route path={`${match.url}/:id/auditSummary`} component={AuditSummary} />
      <Route
        path={`${match.url}/:id/conditionRating`}
        component={ConditionRating}
      />
      <Route
        path={`${match.url}/:id/complianceIssues`}
        component={ComplianceIssues}
      /> */}
      <Route
        path={`${match.url}/:id/maintenanceIssues`}
        component={MaintenanceIssues}
      />
      <Route path={`${match.url}/:id`} component={EditInspection} />
    </Switch>
  )
}
