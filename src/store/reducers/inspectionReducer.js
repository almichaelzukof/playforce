import {
  FETCH_INSPECTION,
  FETCH_INSPECTION_COMPLETED,
  LOAD_INSPECTION,
  DISCARD_INSPECTION,
  ADD_INSPECTION_COVER,
  ADD_INSPECTION_SUMMARY,
  ADD_CONDITION_RATING,
  EDIT_CONDITION_RATING,
  DELETE_CONDITION_RATING,
  ADD_COMPLIANCE_ISSUE,
  EDIT_COMPLIANCE_ISSUE,
  DELETE_COMPLIANCE_ISSUE,
  ADD_MAINTENANCE_ISSUE,
  EDIT_MAINTENANCE_ISSUE,
  DELETE_MAINTENANCE_ISSUE,
  FETCH_EQUIPMENTS_COMPLETED,
} from '../actions/actionTypes'

export const initialState = {
  inspectionLoaded: false,
  equipments: [],
  cover: {},
  coverAdded: false,
  auditSummary: {},
  auditSummaryAdded: false,
  conditionRatings: [],
  conditionRatingsAdded: false,
  complianceIssues: [],
  complianceIssuesAdded: false,
  maintenanceIssues: [],
  maintenanceIssuesAdded: false,
}

export const inspectionReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_INSPECTION:
      return { ...state, inspectionLoaded: false }

    case FETCH_INSPECTION_COMPLETED:
      return { ...state, inspectionLoaded: true, ...payload }

    case LOAD_INSPECTION:
      return {
        ...state,
        ...payload,
        inspectionLoaded: true,
        draftInspectionLoaded: false,
      }

    case DISCARD_INSPECTION:
      return { ...initialState }

    case ADD_INSPECTION_COVER:
      return { ...state, cover: payload, coverAdded: true }

    case FETCH_EQUIPMENTS_COMPLETED:
      return { ...state, equipments: payload.items }

    case ADD_INSPECTION_SUMMARY:
      return { ...state, auditSummary: payload, auditSummaryAdded: true }

    case ADD_CONDITION_RATING: {
      const { equipments } = state
      const { equipment, assetId, manufacturer, image } = payload
      const equipmentObj = {
        equipment,
        assetId,
        manufacturer,
        image,
      }

      return {
        ...state,
        equipments: !!equipments.find(item => item.assetId === assetId)
          ? equipments.map(
              item => (item.assetId === assetId ? equipmentObj : item)
            )
          : [...equipments, equipmentObj],
        conditionRatings: [...state.conditionRatings, payload],
        conditionRatingsAdded: true,
      }
    }

    case EDIT_CONDITION_RATING: {
      const { conditionRatings, equipments } = state
      const { issueIndex, updatedValue } = payload
      const { equipment, assetId, manufacturer, image } = updatedValue
      const equipmentObj = {
        equipment,
        assetId,
        manufacturer,
        image,
      }

      const updatedConditionRatings = conditionRatings.map(
        (conditionRating, index) => {
          if (index === Number(issueIndex)) {
            conditionRating = updatedValue
          }

          return conditionRating
        }
      )
      return {
        ...state,
        equipments: !!equipments.find(item => item.assetId === assetId)
          ? equipments.map(
              item => (item.assetId === assetId ? equipmentObj : item)
            )
          : [...equipments, equipmentObj],
        conditionRatings: [...updatedConditionRatings],
      }
    }

    case DELETE_CONDITION_RATING: {
      const { conditionRatings } = state

      const updatedConditionRatings = conditionRatings.filter(
        (conditionRating, index) => index !== Number(payload)
      )

      const deletedConditionRating = conditionRatings[Number(payload)]

      return {
        ...state,
        deletedConditionRatings: [
          ...state.deletedConditionRatings,
          deletedConditionRating,
        ],
        conditionRatings: [...updatedConditionRatings],
        conditionRatingsAdded: conditionRatings.length > 1,
      }
    }

    case ADD_COMPLIANCE_ISSUE:
      return {
        ...state,
        complianceIssues: [...state.complianceIssues, payload],
        complianceIssuesAdded: true,
      }

    case EDIT_COMPLIANCE_ISSUE: {
      const { issueIndex, updatedValue } = payload
      const { complianceIssues } = state

      const updatedComplianceIssues = complianceIssues.map(
        (complianceIssue, index) => {
          if (index === Number(issueIndex)) {
            complianceIssue = updatedValue
          }

          return complianceIssue
        }
      )
      return {
        ...state,
        complianceIssues: [...updatedComplianceIssues],
      }
    }

    case DELETE_COMPLIANCE_ISSUE: {
      const { complianceIssues } = state

      const updatedComplianceIssues = complianceIssues.filter(
        (complianceIssue, index) => index !== Number(payload)
      )

      const deletedComplianceIssue = complianceIssues[Number(payload)]

      return {
        ...state,
        deletedComplianceIssues: [
          ...state.deletedComplianceIssues,
          deletedComplianceIssue,
        ],
        complianceIssues: [...updatedComplianceIssues],
        complianceIssuesAdded: complianceIssues.length > 1,
      }
    }

    case ADD_MAINTENANCE_ISSUE:
      return {
        ...state,
        maintenanceIssues: [...state.maintenanceIssues, payload],
        maintenanceIssuesAdded: true,
      }

    case EDIT_MAINTENANCE_ISSUE: {
      const { issueIndex, updatedValue } = payload
      const { maintenanceIssues } = state

      const updatedMaintenanceIssues = maintenanceIssues.map(
        (maintenanceIssue, index) => {
          if (index === Number(issueIndex)) {
            maintenanceIssue = updatedValue
          }

          return maintenanceIssue
        }
      )

      return {
        ...state,
        maintenanceIssues: [...updatedMaintenanceIssues],
      }
    }

    case DELETE_MAINTENANCE_ISSUE: {
      const { maintenanceIssues } = state

      const updatedMaintenanceIssues = maintenanceIssues.filter(
        (maintenanceIssue, index) => index !== Number(payload)
      )

      const deletedMaintenanceIssue = maintenanceIssues[Number(payload)]

      return {
        ...state,
        deletedMaintenanceIssues: [
          ...state.deletedMaintenanceIssues,
          deletedMaintenanceIssue,
        ],
        maintenanceIssues: [...updatedMaintenanceIssues],
        maintenanceIssuesAdded: maintenanceIssues.length > 1,
      }
    }

    default:
      return state
  }
}
