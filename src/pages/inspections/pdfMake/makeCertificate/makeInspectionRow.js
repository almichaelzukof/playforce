export const makeInspectionRow = ({
  pageFontSize,
  firstColumnWidth,
  marginBottom,
  inspectionNumber,
  customInspectionNumber,
}) => ({
  fontSize: pageFontSize,
  marginBottom,
  columns: [
    {
      text: 'Inspection Report',
      bold: true,
      italics: true,
      width: firstColumnWidth,
    },
    { text: ':', width: firstColumnWidth / 2 },
    { text: customInspectionNumber || inspectionNumber, width: '*' },
  ],
})
