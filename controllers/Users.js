const Users = require("../models/UserModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");


const getUsers = async (req, res) => {
  try {
      const users = await Users.findAll({
          attributes: ['id', 'name', 'email']
      });
      res.json(users);
  } catch (error) {
      console.log(error);
  }
}

const Register = async (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
      await Users.create({
          name: name,
          email: email,
          password: hashPassword
      });
      res.json({ msg: "Register berhasil" });
  } catch (error) {
      console.log(error);
  }
}

const Login = async (req, res) => {
  try {
      const user = await Users.findOne({
          where: {
              email: req.body.email
          }
      });

      if (!user) {
          return res.status(404).json({ msg: "Email tidak ditemukan" });
      }

      const match = await bcrypt.compare(req.body.password, user.password);
      if (!match) {
          return res.status(400).json({ msg: "Password salah" });
      }

      const userId = user.id;
      const name = user.name;
      const email = user.email;
      const accessToken = jwt.sign({ userId, name, email }, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: '3600s'
      });

      const refreshToken = jwt.sign({ userId, name, email }, process.env.REFRESH_TOKEN_SECRET, {
          expiresIn: '1d'
      });

      await Users.update({ refresh_token: refreshToken }, {
          where: {
              id: userId
          }
      });

      res.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000
      });

      res.json({
          msg: "Login berhasil. Token telah dibuat",
          accessToken
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
}

const requestResetPassword = async (req, res) => {
  const { email } = req.body;

  try {
      const user = await Users.findOne({ where: { email } });
      if (!user) {
          return res.status(404).json({ msg: "Email tidak ditemukan" });
      }

      const resetToken = jwt.sign(
          { userId: user.id, email: user.email },
          process.env.RESET_PASSWORD_SECRET,
          { expiresIn: "1h" }
      );

      await Users.update(
          {
              reset_password_token: resetToken,
              reset_password_expires: new Date(Date.now() + 60 * 60 * 1000),
          },
          { where: { id: user.id } }
      );

      const transporter = nodemailer.createTransport({
          service: "Gmail",
          auth: {
              user: 'whadi611@gmail.com',
              pass: 'pego obpn folj qynn',
          },
      });

      const resetLink = `http://localhost:3000/reset-password/${resetToken}`;
      const mailOptions = {
          from: 'whadi611@gmail.com',
          to: email,
          subject: "Reset Password",
          text: `Klik link berikut untuk mereset password Anda: ${resetLink}`,
      };

      await transporter.sendMail(mailOptions);

      res.json({ msg: "Email reset password telah dikirim" });
  } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
}

const resetPassword = async (req, res) => {
  const { token, password } = req.body;

  try {
      const decoded = jwt.verify(token, process.env.RESET_PASSWORD_SECRET);

      const user = await Users.findOne({ where: { id: decoded.userId } });
      if (!user) {
          return res.status(404).json({ msg: "User tidak ditemukan" });
      }

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      await Users.update(
          { password: hashedPassword },
          { where: { id: user.id } }
      );

      res.json({ msg: "Password berhasil diubah" });
  } catch (error) {
      if (error.name === "TokenExpiredError") {
          return res.status(400).json({ msg: "Token telah kedaluwarsa" });
      }
      if (error.name === "JsonWebTokenError") {
          return res.status(400).json({ msg: "Token tidak valid" });
      }
      console.error(error);
      res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
}

module.exports = { getUsers, Register, Login, requestResetPassword, resetPassword };
  


  