const platforms = require("../platforms")
const DateChecker = require("./date_schema")
const Dlc = require("./dlc")

class VideoGame {
  constructor (name, release_date, developer, publisher,
                platform, genre, price, metascore,
                has_singleplayer, has_multiplayer,
                dlc) {

      this.name = name

      if (DateChecker.test(release_date)) {
        this.release_date = release_date
      } else {
        throw new TypeError("Datum izlaska nije dobro definiran")
      }

      this.developer = developer
      this.publisher = publisher

      if (Array.isArray(platform)) {
        for (el in platform) {
          if (!platforms.includes(el)) {
            throw new SyntaxError(el + " nije platforma")
          }
        }
      } else {
        if (!platforms.includes(platform)) {
          throw new SyntaxError(el + " nije platforma")
        }
      }

      this.genre = genre

      if (typeof price === "number") {
        if (price < 0) {
          throw new SyntaxError("Cijena ne može poprimiti negativnu vrijednost")
        } else {
          this.price = price
        }
      } else {
        throw new TypeError("Cijena nije broj")
      }

      if (typeof metascore === "number") {
        if ((metascore < 0) || (metascore > 100)) {
          throw new SyntaxError("Metascore ne smije poprimati vrijednosti izvan intervala [0, 100]")
        } else {
          this.metascore = metascore
        }
      } else {
        throw new TypeError("Metascore nije broj")
      }

      if (typeof has_singleplayer === "boolean") {
        this.has_singleplayer = has_singleplayer
      } else {
        throw new TypeError("has_singleplayer nije logička vrijednost")
      }

      if (typeof has_multiplayer === "boolean") {
        this.has_multiplayer = has_multiplayer
      } else {
        throw new TypeError("has_multiplayer nije logička vrijednost")
      }

      if (Array.isArray(dlc)) {
        for (el in dlc) {
          if ((Object.hasOwn(el, "name")) && (Object.hasOwn(el, "release_date"))
            && (Object.hasOwn(el, "price"))) {
              try {
                tmp_dlc = new Dlc(el.name, el.release_date, el.price)
              } catch (e) {
                throw new Error(e)
              }
           } else {
            throw new SyntaxError(JSON.stringify(el) + " nema sve definirane atribute")
           }
        }
      } else {
        if ((Object.hasOwn(dlc, "name")) && (Object.hasOwn(dlc, "release_date"))
           && (Object.hasOwn(dlc, "price"))) {
            try {
              tmp_dlc = new Dlc(dlc.name, dlc.release_date, dlc.price)
            } catch (e) {
              throw new Error(e)
            }
          } else {
            throw new SyntaxError(JSON.stringify(dlc) + " nema sve definirane atribute")
          }
      }
  } 
}


module.exports = VideoGame