class Envelope {
  constructor(status, message, response)  {
    if (Number.isInteger(status)) {
      this.status = status
    } else {
      throw new TypeError("Status nije integer")
    }
    this.message = message
    this.response = response
  }
}

module.exports = Envelope