import { headerFontSize, verticalMargin } from '../constants'
import { makeReportTitle } from '../../../../functions/'

export const makeTitle = inspectionType => {
  return {
    text: makeReportTitle(inspectionType).toUpperCase(),
    font: 'Oswald',
    fontSize: headerFontSize * 1.5,
    marginTop: verticalMargin * 4,
    marginBottom: verticalMargin * 4,
    alignment: 'center',
  }
}
