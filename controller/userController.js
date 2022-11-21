import User from "../model/User.js";

const register = async (req, res) => {
  const { email } = req.body;
  const existUser = await User.findOne({ email: email });

  if (existUser) {
    const error = new Error("Usuário registrado");
    return res.status(400).json({ msg: error.message });
  }

  try {
    const user = new User(req.body);
    const userDB = await user.save();
    res.json(userDB);
    console.log(user);
  } catch (error) {
    console.log(error.message);
  }
};

export { register };
