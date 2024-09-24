const { ObjectId } = require('mongodb')
const { getDatabase } = require('../db/database-connection')

function getCollection() {
 return getDatabase().collection('personagem')
}

function readAll() {
  //acessamos a lista de personagem na collection do mongo
  return getCollection().find().toArray()
}

/**
 * 
 * @param {string} id 
 * @returns 
 */
function readById(id) {
  //retornar o item na collection usando o ID
  return getCollection().findOne({ _id: new ObjectId(id)})
}
  
function create(newItem) {
  //adicionar na collection
  return getCollection().insertOne(newItem)
}

/**
 * 
 * @param {string} id 
 * @returns 
 */
function updateById(id, newItem) {
  //atualizamos na collection o newItem pelo ID
  return getCollection().updateOne(
    { _id: new ObjectId(id) },
    { $set: newItem }
  )
}

/**
 * 
 * @param {string} id 
 * @returns 
 */
function deleteById(id) {
  //remover o item da Collection usando o ID
  return getCollection().deleteOne({ _id: new ObjectId(id) })
}
  
module.exports = {
  readAll, readById, create, updateById, deleteById
}