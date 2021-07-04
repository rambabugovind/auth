import bcrypt from 'bcrypt';
import { User } from '../models/user.js';

const saltRounds = 10;

export async function signUp(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(422)
      .send({ error: 'User email and password is mandatory!' });
  }

  // See if a user with given email already exists
  const existingUser = await User.findOne({ email: email });
  console.log('existing user: ', existingUser);
  // is a user with given email already exists, return error
  if (existingUser !== null) {
    return res.status(422).send({ error: 'User with email already in use' });
  }

  // hash and salt ya password and store that in DB
  await bcrypt.hash(password, saltRounds, async function (err, hash) {
    if (err) {
      console.log('Error while hashing password: ', err);
    }
    // if not, create a new user with the provided email
    const newUser = new User({
      email: email,
      password: hash,
    });
    // save the newly created user
    const savedResp = await newUser.save();
    console.log('Saved response: ', savedResp);
    return res.status(200).send({ success: true });
  });
}

export async function login(req, res) {
  const { email, password } = req.body;

  // basic validations below. TODO: More validations necessary
  if (!email || !password) {
    return res
      .status(422)
      .send({ error: 'User email and password is mandatory!' });
  }

  // check if user's email exists in DB
  const existingUser = await User.findOne({ email: email });
  // return error if the user is not in our DB; ask them to signup
  if (existingUser == null) {
    return res
      .status(422)
      .send({ error: 'Your account does not exist. Please signup!' });
  }

  // retrieve hash from existingUser
  const { password: hash } = existingUser;

  // compare the hashed passwd from DB with the hash generated by bcrypt
  await bcrypt.compare(password, hash, function (err, result) {
    if (err) {
      console.log('Error while hashing password: ', err);
    }
    // check if plain text password exactly matches hash
    if (result === true) {
      return res.status(200).send({ success: 'Successful login!' });
    } else {
      return res.status(404).send({ error: 'Incorrect email/password!' });
    }
  });
}
