const user = document.getElementById("user")
const refresh = document.getElementById("refresh")

/*
async function fetchUserData() {
  try {
    let res = await fetch("http://localhost/user", {
      "method": "GET"
    })
    let resJson = await res.json()

  } catch (err) {
    alert("Error: ", err)
  }
} */

async function refreshImage() {

}

/*
user.addEventListener("click", (event) => {
  event.preventDefault()
  fetchUserData()
}) */

refresh.addEventListener("click", (event) => {
  event.preventDefault()
  refreshImage()
})