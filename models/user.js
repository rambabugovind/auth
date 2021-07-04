import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
});

export const User = mongoose.model('user', userSchema);
