import User from "../model/User.js";
import generateId from "../helpers/generateid.js";

const register = async (req, res) => {
  const { email } = req.body;
  const existUser = await User.findOne({ email: email });

  if (existUser) {
    const error = new Error("Usuário registrado");
    return res.status(400).json({ msg: error.message });
  }

  try {
    const user = new User(req.body);
    user.token = generateId();
    const userDB = await user.save();
    res.json(userDB);
    console.log(user);
  } catch (error) {
    console.log(error.message);
  }
};

const authentication = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("Usuário não existe");
    return res.status(404).json({ msg: error.message });
  }
  if (!user.confirm) {
    const error = new Error("Sua conta não foi confirmada");
    return res.status(403).json({ msg: error.message });
  }
};

export { register, authentication };
