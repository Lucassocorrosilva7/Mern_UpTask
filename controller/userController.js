import User from "../model/User.js";

const register = async (req, res) => {
  try {
    const user = new User(req.body);
    const userDB = await user.save();
    res.json(userDB)
    console.log(user)
  } catch (error) {
    console.log(error.message);
  }
};

export { register };
