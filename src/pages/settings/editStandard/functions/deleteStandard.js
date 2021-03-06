import { showActionGoBack } from '../../../../functions/'

export const deleteStandard = component => async () => {
  const { deleteStandard, userId, standardId } = component.props

  await deleteStandard(userId, standardId)

  showActionGoBack(component, 'Standard deleted!')()
}
