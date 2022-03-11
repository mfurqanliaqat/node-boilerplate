const mongoose = require('mongoose')
const joi = require('joi')

const testSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      maxlength: 80
    },
    desc: {
      type: String,
      required: false,
      maxlength: 500
    }
    /*
    join on 'User' schema 
    ,
    user: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'User'
    } */
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true
    }
  }
)

const Test = mongoose.model('test', testSchema)

function validateTest(test) {
  const schema = joi
    .object({
      name: joi.string().min(2).max(50).trim().required(),
      desc: joi.string().max(2000).trim().allow('')
    })
    .unknown(true)
  // .options({ stripUnknown: true })
  return schema.validate(test)
}

exports.Test = Test
exports.validate = validateTest
