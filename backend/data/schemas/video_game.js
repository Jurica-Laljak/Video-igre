const platforms = require("../platforms")
const Dlc = require("./dlc")

class VideoGame {
  constructor (name, release_date, developer, publisher,
                platforms, genre, price, metascore,
                has_singleplayer, has_multiplayer,
                dlc) {

      //name
      if (!name) {
        throw new SyntaxError("Nedostaje atribut name")
      }
      this.name = name

      //release_date
      if (!release_date) {
        throw new SyntaxError("Nedostaje atribut release_date")
      }
      let dateDefinition = new RegExp("[1-9][0-9][0-9][0-9]-((0[1-9])|(1[1-2]))-(((0|1|2)[1-9])|(3(0|1)))")
      if (dateDefinition.test(release_date)) {
        this.release_date = release_date
      } else {
        throw new TypeError("Datum izlaska nije dobro definiran")
      }

      //developer
      if (!developer) {
        throw new SyntaxError("Nedostaje atribut developer")
      }
      this.developer = developer

      //publisher
      if (!publisher) {
        throw new SyntaxError("Nedostaje atribut publisher")
      }
      this.publisher = publisher

      //platforms
      if (!platforms) {
        throw new SyntaxError("Nedostaje atribut platforms")
      }
      if (Array.isArray(platforms)) {
        platforms.forEach((el) => {
          if (!platforms.includes(el)) {
            throw new SyntaxError(el + " nije platforma")
          }
        })
        this.platforms = platforms
      } else {
        throw new SyntaxError("Platforms nije polje")
      }

      //genre
      if (!genre) {
        throw new SyntaxError("Nedostaje atribut genre")
      }
      this.genre = genre

      //price
      if (!price) {
        throw new SyntaxError("Nedostaje atribut price")
      }
      try {
        price = parseFloat(price)
      } catch(err) {
        throw new TypeError("Cijena nije broj")
      }

      if (price < 0) {
        throw new SyntaxError("Cijena ne može poprimiti negativnu vrijednost")
      } else {
        this.price = price
      }

      //metascore
      if (!metascore) {
        throw new SyntaxError("Nedostaje atribut metascore")
      }
      try {
        metascore = parseFloat(metascore)
      } catch (err) {
        throw new TypeError("Metascore nije broj")
      }

      if ((metascore < 0) || (metascore > 100)) {
        throw new SyntaxError("Cijena ne može poprimiti negativnu vrijednost")
      } else {
        this.metascore = metascore
      }

      //has_singleplayer
      if (!has_singleplayer) {
        throw new SyntaxError("Nedostaje atribut has_singleplayer")
      }
      if ((has_singleplayer === "True") || 
          (has_singleplayer === "true") ||
          (has_singleplayer === "False") || 
          (has_singleplayer === "false")) {
        this.has_singleplayer = has_singleplayer
      } else {
        throw new TypeError("has_singleplayer nije logička vrijednost")
      }

      //has_multiplayer
      if (!has_multiplayer) {
        throw new SyntaxError("Nedostaje atribut has_multiplayer")
      }
      if ((has_multiplayer === "True") || 
          (has_multiplayer === "true") ||
          (has_multiplayer === "False") || 
          (has_multiplayer === "false")) {
        this.has_multiplayer = has_multiplayer
      } else {
        throw new TypeError("has_multiplayer nije logička vrijednost")
      }

      if (Array.isArray(platforms)) {
        platforms.forEach((el) => {
          if (!platforms.includes(el)) {
            throw new SyntaxError(el + " nije platforma")
          }
        })
        this.platforms = platforms
      } else {
        throw new SyntaxError("Platforms nije polje")
      }

      //dlc
      if (!dlc) {
        throw new SyntaxError("Nedostaje atribut dlc")
      }
      let i = 0
      let processedDlc = []
      if (Array.isArray(dlc)) {
        dlc.forEach((el) => {
          let tmp_el = new Dlc(el.name, el.release_date, el.price, i - 1)
          let elStringified = JSON.stringify(tmp_el)
          processedDlc.forEach((processedDlcStringified) => {
            if (processedDlcStringified === elStringified) {  //check if dlc already exists
              throw new SyntaxError("" + i + ". dlc se ne smije navesti više puta")
            }
          })
          processedDlc[i] = elStringified
          i += 1
        })
        this.dlc = dlc
      } else {
        throw new SyntaxError("Dlc nije polje")
      }
  } 
}


module.exports = VideoGame