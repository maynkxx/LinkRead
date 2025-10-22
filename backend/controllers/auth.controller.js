// auth.controller.js
const signup = async (req, res) => {
  console.log(req.body);  // logs incoming data
  res.json({ message: 'Signup route hit', data: req.body });
};

module.exports = { signup };
