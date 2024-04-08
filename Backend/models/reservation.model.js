import pool from '../config/database.js';

const getReservationCount = async () => {
    const [rows] = await pool.promise().query('SELECT COUNT(*) FROM reservations');
    return rows[0];
  };
 
 export{getReservationCount} 
  