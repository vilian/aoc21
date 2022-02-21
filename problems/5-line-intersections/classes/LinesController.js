class LinesController {
  input;
  horizontalOrVerticalList;
  allLinesList;

  moreThanTwoPointOccurrenceCount;

  constructor(input) {
    if (!input) {
      throw new Error('input is required')
    }
    this.input = input
    this.allLinesList = this.#setEndpointsList()
    this.horizontalOrVerticalList = this.#setHorizontalOrVerticalList()
    this.moreThanTwoPointOccurrenceCount =
      this.#moreThanTwoPointOccurrenceCount()
    this.moreThanTwoPointOccurrenceCountHVOnly =
      this.#moreThanTwoPointOccurrenceCount(true)
  }

  #setEndpointsList() {
    return this.input.trim()
      .split(/\n/).map(el => new Line(el.trim()))
  }

  #setHorizontalOrVerticalList() {
    return this.allLinesList.filter(this.#isHorizontalOrVertical)
  }

  #isHorizontalOrVertical(line) {
    return line.isHorizontal || line.isVertical
  }

  #moreThanTwoPointOccurrenceCount(hvOnly = false) {
    let overlapCount = 0
    const moreThanTwoPoints = []
    const linesList = hvOnly ? this.horizontalOrVerticalList : this.allLinesList

    linesList.forEach(line => {
      line.pointsList.forEach(point => {
        const occurrence = this.#checkOccurrencesOfPointInLineList(point, linesList)
        if (
          occurrence > 1 &&
          !moreThanTwoPoints.find(el => el.x === point.x && el.y === point.y)
        ) {
          overlapCount++;
          moreThanTwoPoints.push(point)
        }
      })
    })

    return overlapCount
  }

  // all points will return at least one occurrence
  #checkOccurrencesOfPointInLineList(point, linesList) {
    let occurrence = 0
    linesList.forEach(line => {
      const found = line.pointsList.find(el => el.x === point.x && el.y === point.y)
      if (found) occurrence++;
    })
    return occurrence
  }
}
