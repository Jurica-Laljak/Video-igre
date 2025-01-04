class Dlc {
  constructor(name, release_date, price, i) {
    //name
    if (!name) {
      throw new SyntaxError("Nedostaje atribut name za " + i + ". dlc")
    }
    this.name = name

    //release_date
    if (!release_date) {
      throw new SyntaxError("Nedostaje atribut relase_date za " + i + ". dlc")
    }
    let dateDefinition = new RegExp("[1-9][0-9][0-9][0-9]-((0[1-9])|(1[1-2]))-(((0|1|2)[1-9])|(3(0|1)))")
    if (dateDefinition.test(release_date)) {
      this.release_date = release_date
    } else {
      throw new TypeError("Datum izlaska " + i + ". dlca nije dobro definiran")
    }

    //price
    if (!price) {
      throw new SyntaxError("Nedostaje atribut priceza " + i + ". dlc")
    }
    try {
      price = parseFloat(price)
    } catch(err) {
      throw new TypeError("Cijena " + i + ". dlc-a nije broj")
    }

    if (price < 0) {
      throw new SyntaxError("Cijena " + i + ". dlc-a ne može poprimiti negativnu vrijednost")
    } else {
      this.price = price
    }
  }
}

module.exports = Dlc