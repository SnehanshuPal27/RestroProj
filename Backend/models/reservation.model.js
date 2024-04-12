import pool from '../config/database.js';

const getReservationCount = async () => {
    const [rows] = await pool.promise().query('SELECT COUNT(*) FROM reservations');
    return rows[0];
  };

  const getAll = async () => {
    const [rows] = await pool.promise().query('SELECT * FROM reservations');
    console.log(rows)
    return rows;
  };  

  const create = async (newReservationData) => {
    const [result] = await pool.promise().query('INSERT INTO Reservations SET ?', newReservationData);
    return result.insertId;
  };
  

 export{getReservationCount,getAll,create} 
  