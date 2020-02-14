const shoppingListService = {
  getAllItems(db) {
    return db.select('*').from('shopping_list')
  },
  updateItem(db, id, updatedItem) {
    return db('shopping_list').where({ id }).update(updatedItem)
  },
  insertItem(db, newItem) {
    return db.insert(newItem).into('shopping_list').returning('*').then(rows => rows[0])
  },
  deleteItem(db, id) {
    return db('shopping_list').where({ id }).delete()
  },
  getItemById(db, id) {
    return db('shopping_list').select('*').where({ id }).first()
  }

}




// postgresql://dunder_mifflin@localhost/knex-practice
module.exports = shoppingListService;