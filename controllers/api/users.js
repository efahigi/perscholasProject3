// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// const User = require('../../models/user');

// module.exports = {
//   create,
//   login,
//   checkToken
// };

// function checkToken(req, res) {
//   console.log('req.user', req.user);
//   res.json(req.exp);
// }

// async function create(req, res) {
//   try {
//     // Add the user to the db
//     const user = await User.create(req.body);
//     const token = createJWT(user);
//     res.json(token);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// }

// async function login(req, res) {
//   try {
//     const user = await User.findOne({email: req.body.email});
//     if (!user) throw new Error();
//     const match = await bcrypt.compare(req.body.password, user.password);
//     if (!match) throw new Error();
//     const token = createJWT(user);
//     res.json(token);
//   } catch (err) {
//     res.status(400).json('Bad Credentials');
//   }
// }

// /*--- Helper Functions --*/

// function createJWT(user) {
//   return jwt.sign(
//     // data payload
//     { user },
//     process.env.SECRET,
//     { expiresIn: '24h' }
//   );
// }

const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const create = async (req, res) => {
  try {
    // Add user to database
    const user = await User.create(req.body);

    // Helper funtion to create JWT
    const token = createJWT(user);

    // Responding with our jwt
    res.json(token);
  } catch (err) {
    // Client will check for non-2xx status code
    // 400 = Bad Request
    res.status(400).json(err);
  }
};

const login = async (req, res) => {
  try {
    // Find the user by their email
    const user = await User.findOne({ email: req.body.email });

    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) throw new Error();

    res.status(200).json(createJWT(user));
  } catch (err) {
    res.status(400).json({ msg: err.message, reason: 'Bad Credentials' });
  }
};

function createJWT(user) {
  return jwt.sign(
    // data payload
    { user },
    process.env.SECRET,
    { expiresIn: '24h' }
  );
}

function checkToken(req, res) {
  console.log('req.user', req.user);
  res.json(req.exp);
}

module.exports = {
  create,
  login,
  checkToken,
};
