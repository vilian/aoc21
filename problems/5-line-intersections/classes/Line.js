class Line {
  input;
  startPoint;
  endPoint;
  isHorizontal;
  isVertical;
  isUsable;
  pointsList;

  constructor(input) {
    this.input = input
    this.startPoint = this.#setStart()
    this.endPoint = this.#setEnd()
    this.isHorizontal = this.#isHorizontal()
    this.isVertical = this.#isVertical()
    this.isUsable = this.#isUsable()
    this.pointsList = this.#setPointsList()
  }
  #isUsable() {
    return this.#isHorizontal() || this.#isVertical()
  }
  #setStart() {
    const [x, y] = this.input.split('->')[0].trim().split(',')
    return new Point(x, y)
  }
  #setEnd() {
    const [x, y] = this.input.split('->')[1].trim().split(',')
    return new Point(x, y)
  }

  #setPointsList() {
    if (this.isHorizontal) {
      return this.#setHorizontalLine()
    }
    if (this.isVertical) {
      return this.#setVerticalLine()
    }
    return []
  }
  #isHorizontal() {
    return this.startPoint.y === this.endPoint.y
  }
  #isVertical() {
    return this.startPoint.x === this.endPoint.x
  }

  #setVerticalLine() {
    const vLine = []
    vLine.push(this.startPoint)

    // is increasing
    if (this.startPoint.y < this.endPoint.y) {
      for (let i = this.startPoint.y; i <= this.endPoint.y; i++) {
        vLine.push(new Point(this.startPoint.x, i))
      }

      // is decreasing
    } else {
      for (let i = this.startPoint.y; i >= this.endPoint.y; i--) {
        vLine.push(new Point(this.startPoint.x, i))
      }
    }

    vLine.push(this.endPoint)
    return vLine
  }
  #setHorizontalLine() {
    const hLine = []

    // is increasing
    if (this.startPoint.x < this.endPoint.x) {
      for (let i = this.startPoint.x; i <= this.endPoint.x; i++) {
        hLine.push(new Point(i, this.startPoint.y))
      }
      // is decreasing
    } else {
      for (let i = this.startPoint.x; i >= this.endPoint.x; i--) {
        hLine.push(new Point(i, this.startPoint.y))
      }
    }
    return hLine
  }
}
