const routeMap = {
  "/": [ "GET", "POST" ],
  "/user": [ "GET", "POST" ],
  "/refresh": [ "GET", "POST" ],
  "/filter": [ "GET", "POST" ],
  "/video-igre.json": [ "GET", "POST" ],
  "/vide-igre.get": [ "GET", "POST" ],
  "/login": [ "GET", "POST" ],
  "/logout": [ "GET", "POST" ],
  "/session-login": [ "GET", "POST" ],
  "/session-logout": [ "GET", "POST" ],
  "/callback": [ "GET", "POST" ],
  "api/v1/openapi" : [ "GET" ],
  "api/v1/resource": [ "GET", "POST" ] ,
  "api/v1/resource/": [ "GET", "PUT", "DELETE" ],
  "api/v1/genre": [ "GET" ],
  "api/v1/ids": [ "GET" ],
  "api/v1/dlc": [ "GET" ]
}

module.exports = routeMap