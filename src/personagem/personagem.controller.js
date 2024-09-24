const personagem = require('./personagem.entity')
const service = require('./personagem.service')

async function readAll(req, res) {
  //Acessamos a lista de personagens no service
  const items = await service.readAll()

  //Enviamos a lista do personagem como resultado
  res.send(items)
}

async function readById(req, res) {
  //acessamos o parametro de rota id
  const id = req.params.id

  //Acessamos o personagem no service através do ID
  const item = await service.readById(id)
  
  //checamos se o item obtido é existente
  if (!item) {
    return res.status(404).send('Item não encontrado!')
  }

  //Enviamos o item como resposta
  res.send(item)
}

async function create(req, res) {
  //acessamos e validamos o body da requisição
  const {error, value: newItem} = personagem.validate(req.body)

  //checar se tem  erro na validação
  if (error) {
    return res.status(400).send({ error: error.details[0].message })
  }

  //adicionar no banco através do Service
  await service.create(newItem)

  //exibir uma msg de sucesso
  res.status(201).send(newItem)

}

async function updateById(req, res) {
  //acessamos o ID dos parametros da rota
  const id = req.params.id

  //acessamos e validamos o body da requisição
  const {error, value: newItem} = personagem.validate(req.body)

  //checar se tem  erro na validação
  if (error) {
    return res.status(400).send({ error: error.details[0].message })
  }

  // Atualizamos no DB o novoItem pelo ID, usando o Service
  await service.updateById(id, newItem)

  // Enviamos uma mensagem de sucesso
  res.send(newItem)
}

async function deleteById(req, res) {
  //acessamos o parametro de rota
  const id = req.params.id
   
  //remover o item do DB, via Service
  await service.deleteById(id)

  //Enviamos uma msg sucesso
  res.send('Item deletado com sucesso! ' + id)
}

module.exports = {
  readAll, readById, create, updateById, deleteById
}