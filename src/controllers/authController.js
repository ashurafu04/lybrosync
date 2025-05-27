const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');   
const validator = require('../utils/utils');
const adminModel = require('../models/adminModel');

const authController = {
    //register a new user
    async register(req, res) {
        const { full_name, age, email, password } = req.body;
        //validate the input
        if(!validator.validateUserRegistration(full_name, age, email, password))
            return res.status(400).json({ message: "All fields are required" });
        try {
            //check if the user already exists
            const existingUser = await userModel.getUserByEmail(email);
            if(existingUser) {
                return res.status(400).json({ message : "User already exists" });
            }

            //hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            //create user
            const insertId = await userModel.addUser(full_name, age, email, hashedPassword);

            //generate a jwt token
            const token = jwt.sign({ id_user: insertId, email }, process.env.JWT_SECRET, {expiresIn: '1h'});

            //respond with the token
            return res.status(201).json({ message: "User registered successfully", token});

        } catch (err) {
            console.error(`Error while registering: ${err}`);
            return res.status(500).json({ message: "Internal server error" });
        }
    },
    //user login
    async login(req, res) {
        const { email, password } = req.body;
        if(!validator.validateUserLogin(email, password))
            return res.status(400).json({ message: "All fields are required"});
        try {
            //check if the user exists
            const user = await userModel.getUserByEmail(email);
            if(!user)
                return res.status(401).json({ message: "Invalid email or password" });
            //compare the password
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if(!isPasswordValid)
                return res.status(401).json({ message: "Invalid email or password" });
            //generate a jwt token
            const token = jwt.sign({ id_user: user.id_user, email }, process.env.JWT_SECRET, { expiresIn: '1h' });
            //respond with the token
            return res.status(200).json({ message: "Login successful",  token });
        } catch (err) {
            console.error(`Error while logging in: ${err}`);
            return res.status(500).json({ message: "Internal server error" });
        }
    },
    //admin login
    async adminLogin(req, res) {
        const { id_admin, admin_pass } = req.body;
        if(!validator.validateAdminLogin(id_admin, admin_pass))
            return res.status(400).json({ message: "All fields are required"});
        try {
            //check if the user exists
            const admin = await adminModel.getAdminById(id_admin);
            if(!admin)
                return res.status(401).json({ message: "Invalid admin id or password" });
            //compare the password
            if(admin_pass !== admin.admin_pass)
                return res.status(401).json({ message: "Invalid  admin id or password" });
            //generate a jwt token
            const token = jwt.sign({ id_admin: admin.id_admin }, process.env.JWT_SECRET, { expiresIn: '1h' });
            //respond with the token
            return res.status(200).json({ message: "Login successful",  token });
        } catch (err) {
            console.error(`Error while logging admin in: ${err}`);
            return res.status(500).json({ message: "Internal server error" });
        }
    },
    // to do: logout
}

module.exports = authController;