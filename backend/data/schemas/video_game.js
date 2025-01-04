const platformsMap = require("../platformsMap")
const Dlc = require("./dlc")

class VideoGame {
  constructor(name, release_date, developer, publisher,
    platforms, genre, price, metascore,
    has_singleplayer, has_multiplayer,
    dlc, putMode) {

    //name
    if (!putMode && !name) {
      throw new SyntaxError("Nedostaje atribut name")
    } else if ((!putMode && name) || (putMode && name)) {
      this.name = name
    }
    //else if (putMode && !name) => pass

    //release_date
    if (!putMode && !release_date) {
      throw new SyntaxError("Nedostaje atribut release_date")
    } else if ((!putMode && release_date) || (putMode && release_date)) {
      let dateDefinition = new RegExp("[1-9][0-9][0-9][0-9]-((0[1-9])|(1[1-2]))-(((0|1|2)[1-9])|(3(0|1)))")
      if (dateDefinition.test(release_date)) {
        this.release_date = release_date
      } else {
        throw new TypeError("Datum izlaska nije dobro definiran")
      }
    }

    //developer
    if (!putMode && !developer) {
      throw new SyntaxError("Nedostaje atribut developer")
    } else if ((!putMode && developer) || (putMode && developer)) {
      this.developer = developer
    }

    //publisher
    if (!putMode && !publisher) {
      throw new SyntaxError("Nedostaje atribut publisher")
    } else if ((!putMode && publisher) || (putMode && publisher)) {
      this.publisher = publisher
    }

    //platforms
    if (!putMode && !platforms) {
      throw new SyntaxError("Nedostaje atribut platforms")
    } else if ((!putMode && platforms) || (putMode && platforms)) {
      if (Array.isArray(platforms)) {
        if (platforms.length == 0) {
          throw new SyntaxError("Polje platforms ne smije biti prazno")
        }
        platforms.forEach((el) => {
          if (!platformsMap.includes(el)) {
            throw new SyntaxError(el + " nije platforma")
          }
        })
        this.platforms = platforms
      } else {
        throw new SyntaxError("Platforms nije polje")
      }
    }

    //genre
    if (!putMode && !genre) {
      throw new SyntaxError("Nedostaje atribut genre")
    } else if ((!putMode && genre) || (putMode && genre)) {
      this.genre = genre
    }

    //price
    if (!putMode && !price) {
      throw new SyntaxError("Nedostaje atribut price")
    } else if ((!putMode && price) || (putMode && price)) {
      try {
        price = parseFloat(price)
      } catch (err) {
        throw new TypeError("Cijena nije broj")
      }

      if (price < 0) {
        throw new SyntaxError("Cijena ne može poprimiti negativnu vrijednost")
      } else {
        this.price = price
      }
    }

    //metascore
    if (!putMode && !metascore) {
      throw new SyntaxError("Nedostaje atribut metascore")
    } else if ((!putMode && metascore) || (putMode && metascore)) {
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
    }

    //has_singleplayer
    if (!putMode && !has_singleplayer) {
      throw new SyntaxError("Nedostaje atribut has_singleplayer")
    } else if ((!putMode && has_singleplayer) || (putMode && has_singleplayer)) {
      if ((has_singleplayer === "True") ||
        (has_singleplayer === "true") ||
        (has_singleplayer === "False") ||
        (has_singleplayer === "false")) {
        this.has_singleplayer = has_singleplayer
      } else {
        throw new TypeError("has_singleplayer nije logička vrijednost")
      }
    }

    //has_multiplayer
    if (!putMode && !has_multiplayer) {
      throw new SyntaxError("Nedostaje atribut has_multiplayer")
    } else if ((!putMode && has_multiplayer) || (putMode && has_multiplayer)) {
      if ((has_multiplayer === "True") ||
        (has_multiplayer === "true") ||
        (has_multiplayer === "False") ||
        (has_multiplayer === "false")) {
        this.has_multiplayer = has_multiplayer
      } else {
        throw new TypeError("has_multiplayer nije logička vrijednost")
      }
    }

    //dlc
    if (!putMode && !dlc) {
      throw new SyntaxError("Nedostaje atribut dlc")
    } else if ((!putMode && dlc) || (putMode && dlc)) {
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
}


module.exports = VideoGame