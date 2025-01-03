
class DateChecker {
  constructor () {
    this.dateDefinition = new RegExp("[1-9][0-9][0-9][0-9]-((0[1-9])|(1[1-2]))-(((0|1|2)[1-9])|(3(0|1)))")
  }
  test(date) {
    return dateDefinition.test(date)
  }
}

module.exports = DateChecker