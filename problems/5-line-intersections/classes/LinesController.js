class LinesController {
  input;
  horizontalOrVerticalList;
  segmentsEndpointsList;

  checkedPoints;
  moreThanTwoPointOccurrenceCount;

  constructor(input) {
    if (!input) {
      throw new Error('input is required')
    }
    this.input = input
    this.segmentsEndpointsList = this.#setEndpointsList()
    this.horizontalOrVerticalList = this.#setHorizontalOrVerticalList()
    this.moreThanTwoPointOccurrenceCount =
      this.#moreThanTwoPointOccurrenceCount()
  }

  #setEndpointsList() {
    return this.input.trim()
      .split(/\n/).map(el => new Line(el.trim()))
  }

  #setHorizontalOrVerticalList() {
    return this.segmentsEndpointsList.filter(this.#isHorizontalOrVertical)
  }

  #isHorizontalOrVertical(line) {
    return line.isHorizontal || line.isVertical
  }

  #moreThanTwoPointOccurrenceCount() {
    let overlapCount = 0
    const moreThanTwoPoints = []

    this.horizontalOrVerticalList.forEach(line => {
      line.pointsList.forEach(point => {
        const occurrence = this.#checkOccurrencesOfPointInLineList(point)
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

  // all points will return at least 1
  #checkOccurrencesOfPointInLineList(point) {
    let occurrence = 0
    this.horizontalOrVerticalList.forEach(line => {
      const found = line.pointsList.find(el => el.x === point.x && el.y === point.y)
      if (found) occurrence++;
    })
    return occurrence
  }
}
