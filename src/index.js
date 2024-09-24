require('dotenv').config()
require('express-async-console.error')
const express = require('express')
const { connectToDatabase } = require('./db/database-connection')
const cors = require('cors')

//Routers
const personagemRouter = require('./personagem/personagem.router')

//Declaramos a função main
async function main() {

  //conetamos no db
  await connectToDatabase()

  //inicializamos o express
  const app = express()

  //Milddlewares
  //Sinalizar para Express q estou usando JSON no body
  app.use(express.json())
  app.use(cors())

  //endpoint helloword 
  app.get('/', function (req, res) {
    res.send('Hello World!')
  })

  //Routers
  app.use('/personagem', personagemRouter)

  //Error Handling
  app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send({error: 'Algo deu errado!'});
  })

  app.listen(3000, function () {
    console.log("Servidor rodando em http://localhost:3000")
  })
}
  
  // Executamos a função main()
  main()