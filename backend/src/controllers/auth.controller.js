import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prism} from "../config/prism.js";

export const signup = async (req, res) => {
  try {
    const { 
      role, 
      name, 
      email, 
      phone, 
      address, 
      password,

      // Rider fields
      vehicleType,
      vehicleNumber,

      // Organisation fields
      organisationType,
      capacity
    } = req.body;

    if (!role) return res.status(400).json({ error: "Role is required" });

    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) return res.status(400).json({ error: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);

    // Create base user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        address,
        password: hashed,
        role
      }
    });

    // Role-specific tables
    if (role === "DONOR") {
      await prisma.donor.create({
        data: { userId: user.id }
      });
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

    return res.status(201).json({ message: "Account created", user });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) return res.status(400).json({ error: "Invalid email" });
    if (user.role !== role) return res.status(400).json({ error: "Role mismatch" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: "Wrong password" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ message: "Login success", token, user });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server error" });
  }
};

