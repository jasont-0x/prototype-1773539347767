const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

function generateReference (prefix) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let ref = prefix + '-'
  for (let i = 0; i < 8; i++) {
    ref += chars[Math.floor(Math.random() * chars.length)]
  }
  return ref
}

router.get('/', function (req, res) {
  res.redirect('/start')
})

router.get('/baby-age', function (req, res) {
  res.render('baby-age')
})

router.post('/baby-age', function (req, res) {
  const answer = req.session.data['baby-age']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'baby-age': 'Select how old your baby is.' }
    return res.render('baby-age')
  }
  if (answer === 'over-12-weeks') {
    return res.redirect('/ineligible-baby-age')
  }
  res.redirect('/neurodivergent-condition')
})

router.get('/ineligible-baby-age', function (req, res) {
  res.render('ineligible-baby-age')
})

router.get('/neurodivergent-condition', function (req, res) {
  res.render('neurodivergent-condition')
})

router.post('/neurodivergent-condition', function (req, res) {
  const answer = req.session.data['neurodivergent-condition']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'neurodivergent-condition': 'Select yes if you have a neurodivergent condition.' }
    return res.render('neurodivergent-condition')
  }
  res.redirect('/main-challenges')
})

router.get('/main-challenges', function (req, res) {
  res.render('main-challenges')
})

router.post('/main-challenges', function (req, res) {
  const answer = req.session.data['main-challenges']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'main-challenges': 'Select your main challenge when your baby cries.' }
    return res.render('main-challenges')
  }
  res.redirect('/support-type')
})

router.get('/support-type', function (req, res) {
  res.render('support-type')
})

router.post('/support-type', function (req, res) {
  const answer = req.session.data['support-type']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'support-type': 'Select the type of support that would help you most.' }
    return res.render('support-type')
  }
  res.redirect('/contact-method')
})

router.get('/contact-method', function (req, res) {
  res.render('contact-method')
})

router.post('/contact-method', function (req, res) {
  const answer = req.session.data['contact-method']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'contact-method': 'Select how you want to receive your support pack.' }
    return res.render('contact-method')
  }
  res.redirect('/check-answers')
})

router.get('/check-answers', function (req, res) {
  res.render('check-answers')
})

router.post('/check-answers', function (req, res) {
  if (!req.session.data['reference']) {
    req.session.data['reference'] = generateReference('CS')
  }
  res.redirect('/confirmation')
})

router.get('/confirmation', function (req, res) {
  res.render('confirmation')
})

module.exports = router
