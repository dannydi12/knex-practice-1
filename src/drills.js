require('dotenv').config();
const knex = require('knex');

const knexInstance = knex({
  client: 'pg',
  connection: 'postgres://dunder_mifflin@localhost/knex-practice'
})

function searchByTerm(searchTerm) {
  knexInstance
    .select('name')
    .from('shopping_list')
    .where('name', 'ILIKE', `%${searchTerm}%`)
    .then(result => {
      console.log(result)
    })
}

// searchByTerm('to');

function getAllItemsPaginated(pageNumber) {
  const itemsPerPage = 6;
  const offset = itemsPerPage * (pageNumber - 1)

  knexInstance
    .select('name', 'price')
    .from('shopping_list')
    .limit(itemsPerPage)
    .offset(offset)
    .then(result => console.log(result))

}

// getAllItemsPaginated(3);

function getItemsAfterDate(daysAgo) {
  knexInstance
    .select('name', 'price', 'date_added')
    .from('shopping_list')
    .where('date_added',
    '>',
    knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo))
    .then(result => {
      console.log(result);
    })
}

// getItemsAfterDate(5);

function getCostByCategory() {

  knexInstance
    .select('category')
    .sum({ "Total Cost": 'price' })
    .from('shopping_list')
    .groupBy('category')
    .then(result => {
      console.log(result);
    })
}

getCostByCategory();