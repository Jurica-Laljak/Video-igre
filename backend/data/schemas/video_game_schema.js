const videoGameSchema = `{
  "Video_game": {
    "type": "object",
    "required": [
      "name",
      "release_date",
      "developer",
      "publisher",
      "platforms",
      "genre",
      "price",
      "metascore",
      "has_singleplayer",
      "has_multiplayer",
      "dlc"
    ],
    "properties": {
      "name": {
        "type": "string"
      },
      "release_date": {
        "type": "string"
      },
      "developer": {
        "type": "string"
      },
      "publisher": {
        "type": "string"
      },
      "platforms": {
        "type": "string"
      },
      "genre": {
        "type": "string"
      },
      "price": {
        "type": "number"
      },
      "metascore": {
        "type": "integer"
      },
      "has_singleplayer": {
        "type": "boolean"
      },
      "has_multiplayer": {
        "type": "boolean"
      },
      "dlc": {
        "type": "array",
        "items": {
          "type": "object",
          "items": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "price": {
                "type": "number"
              },
              "release_date": {
                "type": "string"
              }
            }
          }
        }
      }
    }
  }
}`

module.export = videoGameSchema