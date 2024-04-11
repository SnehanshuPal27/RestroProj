import pool from '../config/database.js';

const getAll = async () => {
  const [rows] = await pool.promise().query('SELECT * FROM MenuItems');
  return rows;
};

const getMenuItemIngridient = async (menuItemID) => {
  console.log(`model ingridient finder${menuItemID}`)
  const [rows] = await pool.promise().query('SELECT * FROM MenuItemIngredients WHERE MenuItemID= ?',[menuItemID]);
  return rows;
};


const getById = async (menuItemId) => {
  console.log("here in model menu")
  const [rows] = await pool.promise().query('SELECT * FROM menu_items WHERE menuItemId = ?', [menuItemId]);
  return rows[0];
};

const create = async (menuItemData) => {
  const [result] = await pool.promise().query('INSERT INTO menu_items SET ?', menuItemData);
  return result.insertId;
};

const update = async (menuItemId, menuItemData) => {
  const [result] = await pool.promise().query('UPDATE menu_items SET ? WHERE menuItemId = ?', [menuItemData, menuItemId]);
  return result.affectedRows > 0;
};

const remove = async (menuItemId) => {
  const [result] = await pool.promise().query('DELETE FROM menu_items WHERE menuItemId = ?', [menuItemId]);
  return result.affectedRows > 0;
};

export { getAll, getById, create, update, remove,getMenuItemIngridient };