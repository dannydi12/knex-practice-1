require('dotenv').config();
const shoppingListService = require('../src/shopping-list-service');
const knex = require('knex');

describe('shoppingListService function works properly', () => {
  let db;
  let testShoppingList = [
    {
      id: 1,
      name: 'Mushroom',
      price: '2.50',
      date_added: new Date(),
      category: 'Main'
    },
    {
      id: 2,
      name: 'Banana',
      price: '4.75',
      date_added: new Date(),
      category: 'Snack'
    },
    {
      id: 3,
      name: 'Steak',
      price: '11.60',
      date_added: new Date(),
      category: 'Lunch'
    }
  ];
  
  before(() => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    })
  })

  before(() => db('shopping_list').truncate())

  afterEach(() => db('shopping_list').truncate())

  after(() => db.destroy())

  context('when the database has entries', () => {
    
    beforeEach(() => {
      return db
        .into('shopping_list')
        .insert(testShoppingList)
    })

    it(`getAllItems() returns all items from shopping_list table`, () => {
      const expectedItems = testShoppingList.map(item => ({
        ...item,
        checked: false,
      }))
      return shoppingListService.getAllItems(db)
        .then(actual => {
          expect(actual).to.eql(expectedItems)
        })
    })

    it(`updateItem() updates item at selected id`, () => {
      const idOfItemToUpdate = 1;
      const newItemData = {
        name: 'Banana',
        price: '200.42',
        date_added: new Date(),
        category: 'Snack',
        checked: true,
      }

      return shoppingListService.updateItem(db, idOfItemToUpdate, newItemData)
        .then(() => shoppingListService.getItemById(db, idOfItemToUpdate))
        .then(item => expect(item).to.eql({
          id: idOfItemToUpdate,
          ...newItemData
        }))
    })

    it(`deleteItem() successfully removes item by given id`, () => {
      const deleteId = 0;
      return shoppingListService.deleteItem(db, deleteId)
        .then(() => shoppingListService.getAllItems(db))
        .then(allItems => {
          const filteredItems = allItems.filter(item => item.id !== deleteId)
          expect(allItems).to.eql(filteredItems)
        })
    })
    
    it(`getItemById() returns the correct item corresponding to the supplied id`, () => {
      const idToGet = 3;
      const thirdItem = testShoppingList[idToGet - 1];
      return shoppingListService.getItemById(db, idToGet)
        .then(actual => {
          expect(actual).to.eql({
            id: idToGet,
            name: thirdItem.name,
            date_added: thirdItem.date_added,
            price: thirdItem.price,
            category: thirdItem.category,
            checked: false,
          })
        })
    })
  })

  context('when the database has no entries', () => {

    it(`getAllItems() returns an empty array`, () => {
      return shoppingListService.getAllItems(db)
        .then(actual => {
          expect(actual).to.eql([]);
        })
    })
    
    it(`insertItem() adds a new item to the shopping_list table`, () => {
      const newItem = {
        name: 'Apple',
        price: '69.69',
        date_added: new Date(),
        category: 'Snack',
        checked: true
      }
      return shoppingListService.insertItem(db, newItem)
        .then(actual => {
          expect(actual).to.eql({
            id: 1,
            ...newItem
          })
        })
    })
  })
})
