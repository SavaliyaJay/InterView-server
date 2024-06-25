const expressAsyncHandler = require('express-async-handler');
const userSchema = require('../Models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userRegister = expressAsyncHandler(async (req, res, next) => {
    const { username, email, password, role } = req.body;

    if (!email || !password || !username) {
        const error = new Error("All fields are required");
        error.status = 400;
        return next(error);
    }

    const userAvailable = await userSchema.findOne({ where: { email } });

    if (userAvailable) {
        return res.status(400).json({ success: true, message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await userSchema.create({ username, email, password: hashedPassword, role });

    if (user) {
        return res.status(201).json({ success: true, message: "User registered successfully.", user });
    } else {
        return res.status(400).json({ success: true, message: "User not created" });
    }
});

const userLogin = expressAsyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: true, message: "All fields are required" });
    }

    const user = await userSchema.findOne({ where: { email } });

    if (!user) {
        return res.status(400).json({ success: true, message: "User not found." });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    let tokenType;

    if (user.role === "0") {
        tokenType = process.env.ACCESS_TOKEN_SECRET_ADMIN;
    } else {
        tokenType = process.env.ACCESS_TOKEN_SECRET_USER;
    }

    if (isMatch) {
        const accessToken = jwt.sign(
            {
                user: {
                    username: user.username,
                    email: user.email,
                    id: user.u_id,
                },
            },
            tokenType,
            {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRES_TIME,
            }
        );
        // res.cookie('role', user.role, {
        //     // httpOnly: true,
        //     // secure: true,
        //     expires: new Date(Date.now() + 86400000) 
        //   });

        res.cookie('role',  user.role, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production', 
            expires: new Date(Date.now() + 86400000), 
            sameSite: 'Strict',
            domain: 'https://inter-view-client.vercel.app/'
          });

        return res.status(200).json({
            success: true,
            message: "User registered successfully.",
            data: {
                role: user.role,
                accessToken: accessToken,
            },
        });
    } else {
        return res.status(400).json({ success: true, message: "Invalid credentials." });
    }
});

module.exports = {
    userRegister,
    userLogin,
};
