import { makeWeatherCondition } from './makeWeatherCondition'
import { makeApparatus } from './makeApparatus'
import { makeStandards } from './makeStandards'
import { makeMethod } from './makeMethod'

const firstColumnWidth = 170

export const makeGeneralInfo = (impactGeneralInfo, appliedStandards) => [
  makeWeatherCondition(firstColumnWidth, impactGeneralInfo),
  makeApparatus(firstColumnWidth, impactGeneralInfo),
  makeStandards(firstColumnWidth, appliedStandards),
  makeMethod(firstColumnWidth),
]
