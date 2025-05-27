const userModel = require('../models/userModel');

const userController = {
    async getAllUsers(req, res) {
        try {
            const users = await userModel.getAllUsers();
            if(users.length === 0)
                return res.status(404).json({ message: "No users were found"});
            return res.status(200).json(users);
        } catch (err) {
            console.error(`Error getAllUsers: ${err}`);
            return res.status(500).json({ message: "Internal server error" });
        }
    },

    async getUserById(req, res) {
        const { id_user } = req.params;
        try {
            const user = await userModel.getUserById(id_user);
            if(!user)
                return res.status(404).json({ message: "No user was found" });
            return res.status(200).json(user);
        } catch (err) {
            console.error(`Error getUserById: ${err}`);
            return res.status(500).json({ message: "Internal server error" });
        }
    },

    async addUser(req, res) {
        const { full_name, age, email, password } = req.body;
        if(!full_name || !age || !email || !password)
            return res.status(400).json({ message: "full_name, age, email, password are required" });
        try {
            const insertId = await userModel.addUser(full_name, age, email, password);
            return res.status(201).json({ message: "user added successfully", userId: insertId});
        } catch (err) {
            console.error(`Error addUser: ${err}`);
            return res.status(500).json({ message: "Internal server error" });
        }
    },

    async deleteUserById(req, res) {
        const { id_user } = req.params;
        try {
            const result = await userModel.deleteUserById(id_user);
            if(!result)
                return res.status(200).json({ message: "No user was found" });
            return res.status(200).json({ message: `User(${id_user}) deleted successfully` })
        } catch (err) {
            console.error(`Error deleteUserById: ${err}`);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
};

module.exports = userController;

