const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const todoSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true,
    },
    done:{
      type:Boolean,
      default:false,
    },
 
}, 
{
  timestamps:true,
}
);

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const TodoModel = mongoose.model('tasks', todoSchema);
const UserModel = mongoose.model('User', UserSchema);

module.exports = TodoModel, UserSchema;
