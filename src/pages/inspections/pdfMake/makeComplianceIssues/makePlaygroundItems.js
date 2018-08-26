import { makeSubtitle } from '../makeSubtitle'
import { makeIndividualItems } from './makeIndividualItems'

export const makePlaygroundItems = playgrounds =>
  playgrounds.map(({ name, complianceIssues }) => [
    makeSubtitle(name),
    makeIndividualItems(complianceIssues),
  ])
