// require("dotenv").config();

// // const express = require("express");
// // const app = express();
// // const mongoose = require("mongoose");
// // const cors = require("cors");

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
const app = express();
const crypto = require("crypto");
const config = require("./config-dev.json");

mongoose.connect(config.DB_Connection, {});
const db = mongoose.connection;
db.on("error", (error: any) => console.log(error));
db.once("open", () => console.log("Connected to database"));
app.use(cors());
app.use(express.json());

const usersRouter = require("./routes/users/users.js");
app.use("/users", usersRouter);
const secret = crypto.randomBytes(64).toString("hex");
console.log(secret);
app.listen(8080, () => console.log("Server running on port 8080"));
