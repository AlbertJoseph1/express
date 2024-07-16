import express from 'express';

const app = express();

const PORT = process.env.PORT || 5000;

const mockUsers = [
    {id: 1, username:"albert", displayname:"albert"},
    {id: 2, username:"joseph", displayname:"joseph"},
    {id: 3, username:"mark", displayname:"mark"},
    {id: 4, username:"john", displayname:"john"},
    {id: 5, username:"king", displayname:"king"},
    {id: 6, username:"james", displayname:"james"},
    {id: 7, username:"marion", displayname:"marion"},
    {id: 8, username:"faith", displayname:"faith"}
]

app.get('/', (request, response) => {
    response.status(201).send({ msg: "Hello"})
})

app.get('/api/users', (request, response) => {
    console.log(request.query);
    const { 
        query: { filter, value} 
} = request;

if(filter && value) 
    return response.send(
    mockUsers.filter((user) => user[filter].includes(value))
);
return response.send(mockUsers);
})

app.get('/api/users/:id', (request, response) => {
    console.log(request.params);
    const parsedId = parseInt(request.params.id);
    console.log(parsedId)
    if(isNaN(parsedId))return response.status(400).send({msg:"Bad request. Invalid ID."});

    const findUser = mockUsers.find((user) => user.id === parsedId);
    if (!findUser) return response.sendStatus(404);
    return response.send(findUser);
})

app.get('/api/products', (request, response) => {
    response.send([
        {id:1, productname:"chicken", price:100},
        {id:2, productname:"meat", price:120},
        {id:3, productname:"mango", price:130} 
    ])
})

app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`);
});