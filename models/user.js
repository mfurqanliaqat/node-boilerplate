const config = require('config')
const jwt = require('jsonwebtoken')
const joi = require('joi')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    dob: {
      type: Date
    },
    username: {
      type: String,
      maxlength: 50,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      maxlength: 1024
    },
    email: {
      type: String,
      maxlength: 255,
      required: true,
      unique: true
    },
    firstName: {
      type: String,
      required: true,
      maxlength: 50
    },
    lastName: {
      type: String,
      maxlength: 50
    },
    address: {
      type: String,
      maxlength: 255
    },
    city: {
      type: String,
      maxlength: 30
    },
    country: {
      type: String,
      maxlength: 30
    },
    zip: {
      type: String,
      maxlength: 10
    },
    phone: {
      type: String,
      maxlength: 30
    },
    description: {
      type: String,
      maxlength: 2000
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true
    }
  }
)

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      username: this.username,
      isAdmin: this.isAdmin,
      isActive: this.isActive
    },
    config.get('jwtPrivateKey')
    // { expiresIn: 15 * 60 }
  ) // expires in 15 minutes
  return token
}

const User = mongoose.model('User', userSchema)

// eslint-disable-next-line func-style
function validateUser(user) {
  const schema = joi
    .object({
      firstName: joi.string().min(2).max(50).trim().required(),
      lastName: joi.string().min(2).max(50).trim().required(),
      username: joi.string().alphanum().min(4).max(50).trim().required(),
      password: joi.string().min(8).max(50).required(),
      email: joi.string().email().trim().required(),
      city: joi.string().max(30).trim().allow(''),
      country: joi.string().max(30).trim().allow(''),
      zip: joi.number(),
      address: joi.string().max(50).trim().allow(''),
      phone: joi.string().max(30).trim().allow(''),
      description: joi.string().max(2000).trim().allow(''),
      isActive: joi.boolean().default(true)
    })
    .unknown(true)
  // .options({ stripUnknown: true })
  return schema.validate(user)
}

exports.User = User
exports.validate = validateUser
