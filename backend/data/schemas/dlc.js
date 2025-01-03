const DateChecker = require("./date_schema")

class Dlc {
  constructor(name, release_date, price) {
    this.name = name

    if (DateChecker.test(release_date)) {
      this.release_date = release_date
    } else {
      throw new TypeError("Datum izlaska nije dobro definiran")
    }

    if (typeof price === "number") {
      if (price < 0) {
        throw new SyntaxError("Cijena ne može poprimiti negativnu vrijednost")
      } else {
        this.price = price
      }
    } else {
      throw new TypeError("Cijena nije broj")
    }
  }
}

module.exports = Dlc