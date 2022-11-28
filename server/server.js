// if (process.env.NODE_ENV != "production") {
require("dotenv").config();
// }

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectToDb = require("./config/connectToDb");
const usersController = require("./controllers/usersController");
const requireAuth = require("./middleware/requireAuth");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: true,
        credentials: true,
    })
);

connectToDb();

app.get("/users", requireAuth, usersController.fetchUsers);
// app.get("/users/:id", usersController.fetchUser);
app.post("/signup", usersController.signup);
app.post("/login", usersController.login);
app.get("/logout", usersController.logout);
app.put("/users/:id", requireAuth, usersController.updateUser);
app.delete("/users/:id", requireAuth, usersController.deleteUser);
app.get("/check-auth", requireAuth, usersController.checkAuth);

app.listen(process.env.PORT);
