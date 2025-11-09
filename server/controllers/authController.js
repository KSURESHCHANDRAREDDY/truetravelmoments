import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { getDB } from "../config/db.js";

const otpStore = new Map();

export const signupUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const db = getDB();
    const users = db.collection("users");

    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await users.insertOne({
      name,
      email,
      password: hashedPassword,
      verified: true,
      createdAt: new Date(),
    });

    const token = jwt.sign({ id: result.insertedId }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    const isProd = process.env.NODE_ENV === "production";
    const cookieOpts = {
      httpOnly: true,
      sameSite: isProd ? "strict" : "lax",
      secure: isProd,
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    };

    res
      .cookie("token", token, cookieOpts)
      .status(201)
      .json({
        message: "Signup successful",
        user: { id: result.insertedId, name, email },
      });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 5 * 60 * 1000;
    otpStore.set(email, { otp, expiresAt, attempts: 0 });

    const user = process.env.GMAIL_USER;
    const pass = process.env.GMAIL_PASS || process.env.GMAIL_APP_PASS;
    if (!user || !pass) {
      return res.status(500).json({ message: "Email credentials not configured" });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: `DevConnect OTP <${user}>`,
      to: email,
      subject: "Your DevConnect OTP Code",
      text: `Your OTP is ${otp}. It expires in 5 minutes.`,
      html: `<div style="font-family:system-ui,sans-serif;font-size:14px">
        <p>Your OTP is:</p>
        <div style="font-size:24px;font-weight:700;letter-spacing:4px">${otp}</div>
        <p>This code expires in 5 minutes.</p>
      </div>`,
    });

    return res.json({ message: "OTP sent" });
  } catch (error) {
    console.error("SendOtp Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ message: "Email and OTP are required" });

    const entry = otpStore.get(email);
    if (!entry) return res.status(400).json({ message: "No OTP requested for this email" });
    if (Date.now() > entry.expiresAt) {
      otpStore.delete(email);
      return res.status(400).json({ message: "OTP expired" });
    }
    if (entry.otp !== String(otp)) {
      entry.attempts = (entry.attempts || 0) + 1;
      otpStore.set(email, entry);
      return res.status(400).json({ message: "Invalid OTP" });
    }

    otpStore.delete(email);
    return res.json({ message: "OTP verified" });
  } catch (error) {
    console.error("VerifyOtp Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const __getOtpStore = () => otpStore;

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const db = getDB();
    const users = db.collection("users");

    const user = await users.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    const isProd = process.env.NODE_ENV === "production";
    const cookieOpts = {
      httpOnly: true,
      sameSite: isProd ? "strict" : "lax",
      secure: isProd,
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    };

    res
      .cookie("token", token, cookieOpts)
      .json({
        message: "Login successful",
        user: { id: user._id, name: user.name, email: user.email },
      });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logoutUser = async (req, res) => {
  try {
    const isProd = process.env.NODE_ENV === "production";
    const cookieOpts = {
      httpOnly: true,
      sameSite: isProd ? "strict" : "lax",
      secure: isProd,
      path: "/",
    };
    res.clearCookie("token", cookieOpts).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = req.user;
    return res.json({
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("GetMe Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ===== OTP Signup: Step 1 - Send OTP to email =====
export const signupInit = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });

    const db = getDB();
    const users = db.collection('users');

    const existingUser = await users.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000;
    otpStore.set(email, { otp, expiresAt, attempts: 0 });

    const user = process.env.GMAIL_USER;
    const pass = process.env.GMAIL_PASS || process.env.GMAIL_APP_PASS;
    if (!user || !pass) {
      return res.status(500).json({ message: 'Email credentials not configured' });
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: `TrueTravelStories OTP <${user}>`,
      to: email,
      subject: 'Your TrueTravelStories OTP Code',
      text: `Your OTP is ${otp}. It expires in 10 minutes.`,
      html: `<div style="font-family:system-ui,sans-serif;font-size:14px">
        <p>Your OTP is:</p>
        <div style="font-size:24px;font-weight:700;letter-spacing:4px">${otp}</div>
        <p>This code expires in 10 minutes.</p>
      </div>`,
    });

    return res.json({ message: 'OTP sent' });
  } catch (error) {
    console.error('SignupInit Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// ===== OTP Signup: Step 2 - Verify OTP and create user =====
export const signupVerify = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const otp = req.body?.otp ?? req.body?.code;
    if (!name || !email || !password || !otp) return res.status(400).json({ message: 'Missing fields' });

    const db = getDB();
    const users = db.collection('users');

    const existingUser = await users.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const entry = otpStore.get(email);
    if (!entry) return res.status(400).json({ message: 'OTP not found. Please request a new one.' });
    if (Date.now() > entry.expiresAt) {
      otpStore.delete(email);
      return res.status(400).json({ message: 'OTP expired' });
    }
    if (entry.otp !== String(otp)) {
      entry.attempts = (entry.attempts || 0) + 1;
      otpStore.set(email, entry);
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await users.insertOne({
      name,
      email,
      password: hashedPassword,
      verified: true,
      createdAt: new Date(),
    });

    otpStore.delete(email);
    return res.status(201).json({ message: 'Verified and user created. Please login.' });
  } catch (error) {
    console.error('SignupVerify Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
