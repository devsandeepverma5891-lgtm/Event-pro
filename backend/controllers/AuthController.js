import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/Usermodel.js"; 

export const signup = async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const user = await UserModel.findOne({ $or: [{ username }, { email }] });
        if (user) {
            return res.status(400).json({ message: 'Username or Email already exists',success:false });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({
            username,
            password: hashedPassword,
            email,
        });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully',success:true });

    } catch (error) {
        res.status(500).json({ message: 'User registeration failed..!',success:false });
    }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not registered",
        success: false,
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Wrong password",
        success: false,
      });
    }

    // Generate JWT token
    const payload = { userId: user._id, userRole: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "24h",
    });

    // Send response
    return res.status(200).json({
      message: "Login successful",
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      message: "Login failed, please try again",
      success: false,
    });
  }
};

export const logout = async (req, res) => {
    try {
        res.send('Logout Route');
    } catch (error) {
        res.status(500).send({ error: 'Logout failed' });
    }
}
