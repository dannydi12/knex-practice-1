-- create type called grocery
-- create table called shopping_list
-- The grocery TYPE should be an ENUM that can be one of the following possible values:

-- Main
-- Snack
-- Lunch
-- Breakfast
-- The shopping_list table should have the following 6 columns. None of the columns should allow null values.

-- A primary key column id
-- A name column
-- A price column that should not be a string and support 2 decimal places.
-- A date_added column that should default to now().
-- A checked column that should be a BOOLEAN with a default of false.
-- A category column. Use the grocery type you created for this column.
-- Once you've written the create.shopping-list.sql file you should be able to create the type and table using the following command:

-- psql -U dunder_mifflin -d knex-practice -f ./sql-scripts/create.shopping-list.sql