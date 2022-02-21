class Line {
  input;
  startPoint;
  endPoint;
  isHorizontal;
  isVertical;
  isDiagonal;
  pointsList;

  constructor(input) {
    this.input = input
    this.startPoint = this.#setStart()
    this.endPoint = this.#setEnd()
    this.isHorizontal = this.#isHorizontal()
    this.isVertical = this.#isVertical()
    this.isDiagonal = this.#isDiagonal()
    this.pointsList = this.#setPointsList()
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
    if (this.isDiagonal) {
      return this.#setDiagonalLine()
    }
    return []
  }

  #isHorizontal() {
    return this.startPoint.y === this.endPoint.y
  }
  #isVertical() {
    return this.startPoint.x === this.endPoint.x
  }
  #isDiagonal() {
    return Math.abs(this.startPoint.x - this.endPoint.x) ===
      Math.abs(this.startPoint.y - this.endPoint.y)
  }

  #setVerticalLine() {
    const verticalLine = []

    // is increasing
    if (this.startPoint.y < this.endPoint.y) {
      for (let i = this.startPoint.y; i <= this.endPoint.y; i++) {
        verticalLine.push(new Point(this.startPoint.x, i))
      }

      // is decreasing
    } else {
      for (let i = this.startPoint.y; i >= this.endPoint.y; i--) {
        verticalLine.push(new Point(this.startPoint.x, i))
      }
    }

    verticalLine.push(this.endPoint)
    return verticalLine
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

  #setDiagonalLine() {
    const dLine = []

    // is increasing 45
    if (
      this.startPoint.x > this.endPoint.x &&
      this.startPoint.y < this.endPoint.y
    ) {
      let y = this.startPoint.y
      for (let x = this.startPoint.x; x >= this.endPoint.x; x--) {
        dLine.push(new Point(x, y++))
      }
      return dLine
    }

    // is decreasing 45
    if (
      this.startPoint.x < this.endPoint.x &&
      this.startPoint.y > this.endPoint.y
    ) {
      let y = this.startPoint.y
      for (let x = this.startPoint.x; x <= this.endPoint.x; x++) {
        dLine.push(new Point(x, y--))
      }
      return dLine
    }

    // is increasing 135
    if (
      this.startPoint.x > this.endPoint.x &&
      this.startPoint.y > this.endPoint.y
    ) {
      let y = this.startPoint.y
      for (let x = this.startPoint.x; x >= this.endPoint.x; x--) {
        dLine.push(new Point(x, y--))
      }
      return dLine
    }

    // is decreasing 135
    if (
      this.startPoint.x < this.endPoint.x &&
      this.startPoint.y < this.endPoint.y
    ) {
      let y = this.startPoint.y
      for (let x = this.startPoint.x; x <= this.endPoint.x; x++) {
        dLine.push(new Point(x, y++))
      }
      return dLine
    }

  }

}
