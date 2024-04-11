import pool from '../config/database.js';

const getCountOrders=async()=>{
  const [rows]= await pool.promise().query('SELECT COUNT(*) FROM orders AS count');
  console.log(`in model:${rows[0]}`)
  return rows[0]['COUNT(*)'];
}

const getHighestOrderIndex=async()=>{
  console.log("reached model")
  const [rows]= await pool.promise().query('SELECT MAX(OrderID) FROM Orders AS maxIndex');
  console.log(rows[0])
  return rows[0];
}

const getAll = async () => {
  const [rows] = await pool.promise().query('SELECT * FROM orders');
  return rows;
};

const getById = async (orderId) => {
  const [rows] = await pool.promise().query('SELECT * FROM orders WHERE orderId = ?', [orderId]);
  return rows[0];
};

const create = async (orderData) => {
  const [result] = await pool.promise().query('INSERT INTO orders SET ?', orderData);
  return result.insertId;
};

const createOrderItem=async (orderData)=>{
  const [result] = await pool.promise().query('INSERT INTO OrderItems SET ?', orderData);
  return result.insertId;
};


const update = async (orderId, orderData) => {
  const [result] = await pool.promise().query('UPDATE orders SET ? WHERE orderId = ?', [orderData, orderId]);
  return result.affectedRows > 0;
};

const remove = async (orderId) => {
  const [result] = await pool.promise().query('DELETE FROM orders WHERE orderId = ?', [orderId]);
   return result.affectedRows > 0;}
export{getAll,getById,create,update,remove,getCountOrders,getHighestOrderIndex,createOrderItem};
   