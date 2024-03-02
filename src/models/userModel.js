import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({
  name: { type: String, requird: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});


userSchema.pre('save', async function(next){
  if(!this.isModified('password')){
    next()
  }
  // hash
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

// userSchema.methods.greet = function(){
//   // logic
// }

userSchema.methods.checkPassword = async function(givenPassword){
  return await bcrypt.compare(givenPassword, this.password)
}

const User = mongoose.model("User", userSchema);

export default User;
