const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

async function fetchUsers(req, res) {
    const users = await User.find();

    res.json({ users });
}

async function signup(req, res) {
    try {
        const { email, password, name } = req.body;

        const hashedPassword = bcrypt.hashSync(password, 8);

        await User.create({
            email,
            password: hashedPassword,
            name,
        });

        res.sendStatus(200);
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.sendStatus(401);

        const passwordMatch = bcrypt.compareSync(password, user.password);
        if (!passwordMatch) return res.sendStatus(401);

        const exp = Date.now() + 1000 * 60 * 60 * 24 * 30;
        const token = jwt.sign({ sub: user._id, exp }, process.env.SECRET);

        res.cookie("Authorization", token, {
            expires: new Date(exp),
            httpOnly: true,
            sameSite: "lax",
            //    secure: process.env.NODE_ENV === "production",
        });

        res.send(user);
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
}

function logout(req, res) {
    try {
        res.clearCookie("Authorization");
        res.sendStatus(200);
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
}

function checkAuth(req, res) {
    try {
        res.sendStatus(200);
    } catch (err) {
        return res.sendStatus(400);
    }
}

async function updateUser(req, res) {
    const userId = req.params.id;
    const isBlocked = req.body;

    await User.findByIdAndUpdate(userId, isBlocked);
}

async function deleteUser(req, res) {
    const userId = req.params.id;

    await User.findByIdAndDelete(userId);
}

module.exports = {
    fetchUsers,
    signup,
    login,
    logout,
    checkAuth,
    updateUser,
    deleteUser,
};
