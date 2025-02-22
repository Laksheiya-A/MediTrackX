const pool = require('../config/db');

const createMedicineTable = async () => {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS medicines (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255),
            manufacturer VARCHAR(255),
            batch_number VARCHAR(100),
            expiry_date DATE
        )
    `);
};

createMedicineTable();
