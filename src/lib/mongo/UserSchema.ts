import mongoose, { Document, Model, Schema, model, models } from "mongoose";
import bcrypt from "bcrypt";
enum Provider {
  credentials = "credentials",
  discord = "discord",
}

interface IUser extends Document {
  username: string;
  email: string;
  password?: string;
  image?: string;
  provider: Provider;
}

const UserSchema: Schema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  provider: {
    type: String,
    required: true,
    default: Provider.credentials,
  },
  image: {
    type: String,
    default: "",
  },
  password: {
    type: String,
    required: false,
  },
});

UserSchema.pre<IUser>("save", async function (next) {
  if (
    this.password &&
    this.provider === "credentials" &&
    this.isModified("password")
  ) {
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (error) {
      throw error;
    }
  } else {
    next();
  }
});
interface Methods {
  comparePassword(candidatePassword: string): Promise<boolean>;
}
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  if (!this.password) {
    throw new Error("Password authentication not available for this user.");
  }
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};

const User: Model<IUser> = models.User || model("User", UserSchema, "Users");

export default User as Model<IUser, {}, Methods>;
