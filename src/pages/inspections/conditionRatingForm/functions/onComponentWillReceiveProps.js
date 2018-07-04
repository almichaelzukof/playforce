export const onComponentWillReceiveProps = (component, nextProps) => {
  const {
    initialData,
    imageCaptured,
    image,
    imageNaturalAspectRatio,
  } = nextProps

  if (initialData && initialData !== component.props.initialData) {
    component.loadInitialData(initialData)
  }

  if (imageCaptured && image !== component.props.image) {
    const { setFeedback } = component.props

    imageNaturalAspectRatio <= 1
      ? setFeedback({ error: 'Please upload a landscape image!' })
      : setFeedback({ error: '' })
  }
}
