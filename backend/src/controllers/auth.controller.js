import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import  prisma  from "../config/prisma.js";

export const signup = async (req, res) => {
  try {
    const {
      role,
      name,
      email,
      phone,
      address,
      password,
      vehicleType,
      vehicleNumber,
      organisationType,
      capacity
    } = req.body;

    if (!role || !name || !email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email:email.toLowerCase(),
        phone,
        address,
        password: hashed,
        role
      }
    });

    if (role === "DONOR") {
      await prisma.donor.create({ data: { userId: user.id } });
    }

    if (role === "RIDER") {
      await prisma.rider.create({
        data: {
          userId: user.id,
          vehicleType,
          vehicleNumber
        }
      });
    }

    if (role === "ORGANISATION") {
      await prisma.organisation.create({
        data: {
          userId: user.id,
          organisationType,
          capacity: Number(capacity)
        }
      });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(201).json({
      message: "Account created successfully",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    console.error("SIGNUP ERROR:", err);
    return res.status(500).json({ error: "Server error" });
  }
};



export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const user = await prisma.user.findUnique({ where: { email :email.toLowerCase()} });

    if (!user) return res.status(400).json({ error: "Invalid email" });
    if (user.role !== role) return res.status(400).json({ error: "Role mismatch" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: "Wrong password" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });


  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server error" });
  }
};

