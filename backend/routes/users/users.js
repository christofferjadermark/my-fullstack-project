"use strict";
// const express = require("express");
// const router = express.Router();
// const bcrypt = require("bcryptjs");
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const User = require("../../models/usermodels.js");
const getNewToken = require("../../models/getNewToken.js");
const bcrypt = require("bcryptjs");
module.exports = router;
// Get all
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User.find();
        res.json(users);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
// Get one
router.get("/:id", getUser, (req, res) => {
    const userId = req.params.id;
    const user = User.findById(userId);
    res.json(user);
});
// Register user
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });
    try {
        if (!user.name) {
            return res.status(400).json({ error: "Name is required" });
        }
        if (!user.email) {
            return res.status(400).json({ error: "Email is required" });
        }
        if (!user.password) {
            return res.status(400).json({ error: "Password is required" });
        }
        else {
            const pwHash = yield bcrypt.genSalt(10);
            user.password = yield bcrypt.hash(user.password, pwHash);
            const newUser = yield user.save();
            res.status(201).json(newUser);
        }
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ message: "Something went wrong" });
    }
}));
//Login user
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const credentials = {
            email: req.body.email,
            password: req.body.password,
        };
        if (!credentials.email) {
            return res.status(400).json({ error: "Email is required" });
        }
        if (!credentials.password) {
            return res.status(400).json({ error: "Password is required" });
        }
        const user = yield loginUser(credentials);
        if (user.error) {
            return res.status(400).json({ error: "Invalid credentials5" });
        }
        if (user.user) {
            const token = yield getNewToken(user);
            if (!token) {
                return res.status(400).json({ error: "Sign in failed!" });
            }
            res.json({ token });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong" });
    }
}));
// Update one
router.patch("/:id", getUser, (req, res) => {
    if (req.body.name != null) {
        res.user.name = req.body.name;
    }
    if (req.body.email != null) {
        res.user.email = req.body.email;
    }
    try {
        const updatedUser = res.user.save();
        res.json(updatedUser);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});
// Delete one
router.delete("/:id", getUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield res.user.deleteOne();
        res.json({ message: "Deleted User" });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
function loginUser(credentials) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield User.findOne({ email: credentials.email });
            if (!user) {
                return { error: "Invalid credentials1" };
            }
            if (user.email !== credentials.email) {
                return { error: "Invalid credentials2" };
            }
            if (user.password) {
                const isMatch = yield bcrypt.compare(credentials.password, user.password);
                if (!isMatch) {
                    return { error: "Invalid credentials3" };
                }
                delete user.password;
                return { user };
            }
            else {
                return { error: "Invalid credentials4" };
            }
        }
        catch (error) {
            console.log(error);
            return { error: "Something went wrong" };
        }
    });
}
function getUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let user;
        try {
            user = yield User.findById(req.params.id);
            if (user == null || user == undefined) {
                res.status(404).json({ message: "Cannot find user" });
                return;
            }
        }
        catch (_a) {
            res.status(500).json({ message: err.message });
            return;
        }
        res.locals.user = user;
        return next();
    });
}
