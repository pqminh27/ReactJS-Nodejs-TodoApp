const express = require("express");
const router = express.Router();
const mysql = require("mysql");
require("dotenv").config();

const db = mysql.createConnection({
    user: process.env.user,
    host: process.env.host,
    password: process.env.password,
    database: process.env.database,
});

const authorizeUsersAccess = (req, res, next) => {
    if (req.query.admin === "true") {
        return next();
    } else res.send("Error: You don't have access to this page!");
};

router.get("/", (req, res) => {
    db.query("SELECT * FROM todos", (err, result) => {
        if (err) console.error(err);
        else res.send(result);
    });
});

router.get("/:id", (req, res) => {
    const todo_id = req.params.id;
    db.query("SELECT * FROM todos WHERE id = ?", todo_id, (err, result) => {
        if (err) console.error(err);
        else res.send(result);
    });
});

router.post("/add", (req, res) => {
    const {name, isDone} = req.body;
    db.query(
        "INSERT INTO todos(name,isDone) VALUES (?,?)",
        [name, isDone],
        (err, result) => {
            if (err) console.error(err);
            else res.send("Values Inserted!");
        }
    );
});

router.put("/update", (req, res) => {
    const {id, isDone} = req.body;
    // console.log(id, isDone);
    db.query(
        "UPDATE todos SET isDone = ? WHERE id = ?",
        [isDone, id],
        (err, result) => {
            if (err) console.error(err);
            else res.send(result);
        }
    );
});

router.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM todos WHERE id = ?", id, (err, result) => {
        if (err) {
            console.log(err);
        } else res.send(result);
    });
});

module.exports = router;
