import { Schema, model, Document } from "mongoose";

interface User extends Document {
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
    password: string;
}

const schema = new Schema({
    email: { type: String, unique: true, require: true }, //not null
    first_name: { type: String, require: true },
    last_name: { type: String, require: true },
    avatar: String,
    password: { type: String, require: true },
});

const Users = model<User>('user', schema); //mongoose convert to plural

export {
    Users,
    User
};
 