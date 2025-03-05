import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
    unique: true,
    // trim: true, // Automatically removes whitespace
  },

  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
    trim: true,
    lowercase: true, // "Danielp2" => "danielp2"
    unique: true, // Ensures email is unique across all documents in the collection
  },

  isAdmin: {
    type: Boolean,
    default: false,
  },

  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 100,
  },

  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

/* 
A Model is a constructor function created from a Schema. It represents a collection in our MongoDB database and provides an interface to:
    Create new documents
    Query existing documents
    Update documents
    Delete documents
*/
const User = mongoose.model("User", userSchema);

export default User;

/*
Hierarchy
The full hierarchy is:

MongoDB Database - Contains collections
Collections - Contains documents (similar to tables in SQL)
Documents - Individual records (similar to rows)
Fields - Properties of documents (similar to columns)

In Mongoose terms:

Connection - Connection to your MongoDB database
Model - Represents a collection, created from a Schema
Schema - Defines the structure of documents
Document - Instance of a Model (actual data)

*/
