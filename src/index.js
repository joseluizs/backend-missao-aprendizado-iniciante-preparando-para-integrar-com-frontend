require('dotenv').config()
const express = require('express')
const { connectToDatabase } = require('./db/database-connection')

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

  //endpoint helloword 
  app.get('/', function (req, res) {
    res.send('Hello World!')
  })

  //Routers
  app.use('/personagem', personagemRouter)

  app.listen(3000, function () {
    console.log("Servidor rodando em http://localhost:3000")
  })
}
  
  // Executamos a função main()
  main()