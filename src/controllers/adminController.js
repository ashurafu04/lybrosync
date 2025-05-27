const adminModel = require('../models/adminModel');

const adminController = {
    async getAdminById(req, res) {
        const { id_admin } = req.admin; 
        try {
            const admin = adminModel.getAdminById(id_admin);
            if(!admin)
                return res.status(404).json({ message: "No admin data found" });
            return res.status(200).json(admin);
        } catch (err) {
            console.error(`Error getAdminById: ${err}`);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
};

module.exports = adminController;