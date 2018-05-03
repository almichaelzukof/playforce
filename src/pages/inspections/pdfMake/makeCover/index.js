import { makeHeader } from './makeHeader'
import { makeTitle } from './makeTitle'
import { makeCoverImage } from './makeCoverImage'
import { makeMiddleSection } from './makeMiddleSection'

export const makeCover = ({
  image,
  location,
  client,
  inspectionDate,
  displayName,
  appliedStandards,
}) => {
  const { name } = location

  return [
    makeHeader(),
    makeTitle(name),
    makeCoverImage(image),
    makeMiddleSection({
      location,
      client,
      inspectionDate,
      displayName,
      appliedStandards,
    }),
  ]
}
