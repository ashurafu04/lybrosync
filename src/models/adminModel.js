const pool = require('../config/db');

const adminModel = {
    async getAdminById(id_admin) {
        try {
            const [admin] = await pool.query("SELECT * FROM admin WHERE id_admin = ?",[id_admin]);
            return admin[0] || null;
        } catch (err) {
            console.error('Error fetching admin by id');
            throw err;
        }
    }
};

module.exports = adminModel;