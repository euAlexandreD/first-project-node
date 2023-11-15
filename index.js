const express = require("express")
const port = 3000
const app = express()
const uuid = require("uuid")
app.use(express.json())




const users = []

const checkIdUser = (request, response, next) => {

    const { id } = request.params

    const index = users.findIndex(user => user.id === id)

    if (index < 0) {
        return response.status(404).json({ message: "User not fund" })
    }

    request.userIdex = index
    request.userId = id

    next()
}

app.get('/users', (request, response) => {

    return response.json(users)

})

app.post('/users', (request, response) => {

    const { name, age } = request.body


    const user = { id: uuid.v4(), name, age }

    users.push(user)

    return response.status(201).json(user)
})

app.put('/users/:id', checkIdUser, (request, response) => {
    const { name, age } = request.body
    const index = request.userIdex
    const id = request.userId

    const updateUser = { id, name, age }

    users[index] = updateUser

    return response.json(updateUser)
})

app.delete('/users/:id', checkIdUser,  (request, response) => {

    const index = request.userIdex

    users.splice(index,1)

    return response.status(204).json()
})


















// /users?nome=Alexandre&age=26



app.listen(3000, () => {
    console.log(`server started on port ${port}`)
})






// const { id } = request.params

// console.log(id)

// return response.json({ id })


// const {name, age} = request.query

// return response.json({name, age})

// return response.send('Hello Express')