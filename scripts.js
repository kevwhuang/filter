let completeTodos = []
let containerOl = document.getElementById("tdl")

let fetchedTodos = [
    {
        "userId": 5,
        "id": 1,
        "title": "delectus",
        "completed": true
    },
    {
        "userId": 10,
        "id": 2,
        "title": "autem",
        "completed": false
    }
]

let filteredTodos
let incompleteTodos = []
let index = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
let indexComplete = []
let indexIncomplete = []

const complete = () => {
    containerOl.innerHTML = null
    temp = fetchedTodos
    fetchedTodos = completeTodos
    populate()
    fetchedTodos = temp
}

const fetchNow = () => {
    fetch("https://jsonplaceholder.typicode.com/todos")
        .then((response) => response.json())
        .then((json) => fetchedTodos = json)
}

const filter = () => {
    containerOl.innerHTML = null
    let elementID = document.getElementById("ID")
    let elementIDValue = parseInt(elementID.value)
    filteredTodos = fetchedTodos.filter(i => { return i.userId == elementIDValue })

    temp = fetchedTodos
    fetchedTodos = filteredTodos
    populate()
    fetchedTodos = temp

    if (indexComplete.includes(elementIDValue) == false) {
        indexComplete = indexComplete.concat(elementIDValue)
    }
    indexIncomplete = index.filter(x => indexComplete.indexOf(x) === -1)

    completeTodos = []
    for (let i = 0; i < indexComplete.length; i++) {
        newTodos = fetchedTodos.filter(x => { return x.userId == indexComplete[i] })
        completeTodos = completeTodos.concat(newTodos)
    }

    incompleteTodos = []
    for (let i = 0; i < indexIncomplete.length; i++) {
        newTodos = fetchedTodos.filter(x => { return x.userId == indexIncomplete[i] })
        incompleteTodos = incompleteTodos.concat(newTodos)
    }
}

const incomplete = () => {
    containerOl.innerHTML = null
    temp = fetchedTodos
    fetchedTodos = incompleteTodos
    populate()
    fetchedTodos = temp
}

const log = () => {
    console.log(fetchedTodos)
}

const populate = () => {
    containerOl.innerHTML = null
    for (let i = 0; i < fetchedTodos.length; i++) {
        let elementLi = document.createElement("li")
        let elementLiText = document.createTextNode(fetchedTodos[i].title)
        elementLi.appendChild(elementLiText)
        containerOl.appendChild(elementLi)
    }
}