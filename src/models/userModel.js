const pool = require('../config/db');

const userModel = {
    async getAllUsers() {
        try {
            const [users] = await pool.query("SELECT * FROM users");
            return users;
        }
        catch(err) {
            console.error(`Error fetching all users: ${err}`);
            throw err;
        }
    },
    async getUserById(id) {
        try {
            const [user] = await pool.query("SELECT * FROM users WHERE id_user = ?",[id]);
            return user[0] || null;
        }
        catch(err) {
            console.error(`Error fetching the user with the id(${id}): ${err}`);
            throw err;
        }
    },

    async getUserByEmail(email) {
        try {
            const [user] = await pool.query("SELECT * FROM users WHERE email = ?",[email]);
            return user[0] || null;
        }
        catch(err) {
            console.error(`Error fetching the user with the email(${email}): ${err}`);
            throw err;
        }
    },

    async addUser(full_name, age, email, password) {
        try {
            //to do: verification with middleware or controller
            const [result] = await pool.query("INSERT INTO users (full_name, age, email, password) VALUES(?, ?, ?, ?)",[full_name, age, email, password]);
            return result.insertId;
        }
        catch(err) {
            console.error(`Error adding a user: ${err}`);
            throw err;
        }
    },

    async deleteUserById(id) {
        try {
            const [result] = await pool.query("DELETE FROM users WHERE id_user = ?",[id]);
            if(result.affectedRows === 0) {
                return false;
            }
            return true;
        }
        catch(err) {
            console.error(`Error deleting a user: ${err}`);
            throw err;
        }
    }
}

module.exports = userModel;