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
  //acessamos o body da requisição
  const newItem = req.body

  //checar se o nome esta presento no body
  if (!newItem || !newItem.nome) {
    return res.status(400).send('Corpo da requisição deve conter a propriedade ´nome´.')
  }

  //adicionar no banco através do Service
  await service.create(newItem)

  //exibir uma msg de sucesso
  res.status(201).send(newItem)

}

async function updateById(req, res) {
  //acessamos o ID dos parametros da rota
  const id = req.params.id

  //acessamos o body da requisição
  const newItem = req.body


  //checar se o `nome´ esta presente no body
  if (!newItem || !newItem.nome) {
    return res.status(400).send('Corpo da requisição deve conter a propriedade ´nome´.')
  }

  //atualizamos na DB o newItem pelo ID, usando o Service
  await service.updateById(id, newItem)

  //enviamos uma resposta de sucesso
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