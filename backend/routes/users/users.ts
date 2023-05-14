// const express = require("express");
// const router = express.Router();
// const bcrypt = require("bcryptjs");

import express, { NextFunction } from "express";
const router = express.Router();
const User = require("../../models/usermodels.js");
const getNewToken = require("../../models/getNewToken.js");
const bcrypt = require("bcryptjs");
module.exports = router;

// Get all
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one
router.get("/:id", getUser, (req, res) => {
  const userId = req.params.id;
  const user = User.findById(userId);
  res.json(user);
});

// Register user
router.post("/register", async (req, res) => {
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
    } else {
      const pwHash = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, pwHash);
      const newUser = await user.save();

      res.status(201).json(newUser);
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Something went wrong" });
  }
});

//Login user
router.post("/login", async (req, res) => {
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
    const user = await loginUser(credentials);
    if (user.error) {
      return res.status(400).json({ error: "Invalid credentials5" });
    }
    if (user.user) {
      const token = await getNewToken(user);
      if (!token) {
        return res.status(400).json({ error: "Sign in failed!" });
      }
      res.json({ token });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

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
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete one
router.delete("/:id", getUser, async (req, res) => {
  try {
    await res.user.deleteOne();
    res.json({ message: "Deleted User" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function loginUser(credentials: { email: string; password: string }) {
  try {
    const user = await User.findOne({ email: credentials.email });
    if (!user) {
      return { error: "Invalid credentials1" };
    }
    if (user.email !== credentials.email) {
      return { error: "Invalid credentials2" };
    }
    if (user.password) {
      const isMatch = await bcrypt.compare(credentials.password, user.password);
      if (!isMatch) {
        return { error: "Invalid credentials3" };
      }
      delete user.password;
      return { user };
    } else {
      return { error: "Invalid credentials4" };
    }
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
}

async function getUser(req: Request, res: Response, next: NextFunction) {
  let user: User | null;
  try {
    user = await User.findById(req.params.id);
    if (user == null || user == undefined) {
      res.status(404).json({ message: "Cannot find user" });
      return;
    }
  } catch {
    res.status(500).json({ message: err.message });
    return;
  }
  res.locals.user = user;
  return next();
}
