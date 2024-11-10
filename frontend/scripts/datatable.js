const form = document.getElementById("form")
const table = document.getElementById("table")
const thead = document.getElementById("thead")
const tbody = document.getElementById("tbody")
const empty = document.getElementById("empty")

async function sendForm(){
        let formData = new Map();
        formData.set("query", document.getElementById("query").value)
        formData.set("filterby", document.getElementById("filterby").value)
        try {
                let url = "/filter/" + document.getElementById("filterby").value + "&" +  document.getElementById("query").value
                let resp = await fetch(url)
                respJson = await resp.json()

                if (!init) {
                        const tr = document.createElement("tr")
                        thead.appendChild(tr)
                        //initializing table header on first load
                        for (let attribute in respJson[0]) {    
                                const th = document.createElement("th")
                                th.textContent = attribute
                                tr.appendChild(th)
                        }
                        init = true
                }

                tbody.innerHTML = ""
                //creating table body
                for (let obj of respJson) {
                        tr = document.createElement("tr")
                        tbody.appendChild(tr)

                        for (let i in obj) {
                                let atr_value = obj[i]
                                const td = document.createElement("td")
                                if (atr_value.constructor === Array) {
                                        if (atr_value.length == 0) {    //if array empty
                                                td.textContent = "No DLC available for this item"
                                        } else if (atr_value[0] instanceof Object) {
                                                if (Object.keys(atr_value[0]).length == 0) {  //if object empty
                                                       td.textContent == ""
                                                } else {        //create inner table
                                                        for (let inner_obj of atr_value) {
                                                                const inner_table = document.createElement("table")
                                                                td.appendChild(inner_table)
                                                                let inner_tr = document.createElement("tr")
                                                                for (let inner_obj_key in inner_obj) {   //create table header
                                                                        let inner_th = document.createElement("th")
                                                                        inner_th.textContent = inner_obj_key
                                                                        inner_tr.append(inner_th)
                                                                }
                                                                inner_table.append(inner_tr)
                                                                inner_tr = document.createElement("tr")
                                                                for (let j in inner_obj) {        //create table row
                                                                        inner_obj_value = inner_obj[j]
                                                                        let inner_td = document.createElement("td")
                                                                        inner_td.textContent = inner_obj_value
                                                                        inner_tr.append(inner_td)
                                                                }
                                                                inner_table.append(inner_tr)
                                                        }
                                                }
                                        } else {
                                                td.textContent = atr_value.join(", ")
                                        }
                                } else {        //atribute value is string
                                        td.textContent = atr_value
                                }
                                tr.appendChild(td)
                        }
                }
                if (Object.keys(respJson).length > 0) {
                        thead.style.visibility = "visible"
                        empty.style.visibility = "hidden"
                } else {
                        thead.style.visibility = "hidden"
                        empty.style.visibility = "visible"
                }
        } catch (err) {
                console.error(err)
        }
}


form.addEventListener("submit", (event) => {
        event.preventDefault()
        sendForm()
})

let init = false
sendForm()      //fetch data on load 

