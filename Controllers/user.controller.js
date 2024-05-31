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
        const error = new Error("User already exists");
        error.status = 400;
        return next(error);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await userSchema.create({ username, email, password: hashedPassword, role });

    if (user) {
        res.status(201).json({ user })
    } else {
        const error = new Error("User not vaild.");
        error.status = 400;
        return next(error);
    }
});

const userLogin = expressAsyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        const error = new Error("All fields are required");
        error.status = 400;
        return next(error);
    }

    const user = await userSchema.findOne({ where: { email } });

    console.log(user);
    if (!user) {
        const error = new Error("User not found");
        error.status = 404;
        return next(error);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
        const accesssToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            }
        },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: "10m"
            }
        )
        // console.log(accesssToken);
        res.status(200).json({accesssToken:accesssToken});
    } else {
        const error = new Error("Invalid password.");
        error.status = 400;
        return next(error);
    }
});

const userCurrent = expressAsyncHandler(async (req, res, next) => {
    res.status(200).send("now you can access this route");
});

module.exports = {
    userRegister,
    userLogin,
    userCurrent
};
