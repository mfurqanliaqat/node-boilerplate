const router = require('express').Router()
const { Test, validate } = require('../models/test')

router.get('/', async (req, res) => {
  const tests = await Test.find()//.populate('users', 'username')
  res.send(tests)
})

router.post('/', async (req, res) => {
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  let test = await Test.findOne({ name: req.body.name })
  if (test) return res.status(400).send('Test already exist.')

  test = new Test(req.body)
  await test.save()

  res.send(test)
})

router.put('/:id', async (req, res) => {
  const test = await Test.findById(req.params.id)
  if (!test) res.status(404).send('Test does not exist!')

  await test.save()

  res.send(test)
})

router.delete('/:id', async (req, res) => {
  await Test.findByIdAndDelete(req.params.id)
  res.send('Test deleted successfully')
})
module.exports = router
