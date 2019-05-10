import mongoose, {Schema} from 'mongoose';

const userSchema = new Schema({
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      
    },
    password: {
      type: String,
      required: true,
      minlength: 7,
      maxlength: 42,
    },
    role: {
      type: String,
    },
  });

  userSchema.statics.findByLogin = async function(login) {
    let user = await this.findOne({
      username: login,
    });
  
    if (!user) {
      user = await this.findOne({ email: login });
    }
  
    return user;
  };

const User = mongoose.model('User', userSchema);
export default User;