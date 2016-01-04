const ghutils = require('ghutils')
const assert = require('assert')

module.exports = awsCredentialScraper

// Naive AWS credential scraper for git
// (str, obj) -> null
function awsCredentialScraper (org, auth, cb) {
  assert.equal(typeof org, 'string', new TypeError('org must be a string'))
  assert.equal(typeof auth, 'object', new TypeError('auth must be an object'))
  assert.equal(typeof cb, 'function', new TypeError('cb must be a function'))

  const opts = ghutils.makeOptions(auth)
  const uri = 'https://api.github.com/search/code?q=AWS_KEY+user:TabDigital'
  ghutils.ghget(auth, uri, opts, function (err, res) {
    if (err) return cb(err)
    if (res.total_count === 0) return cb(null, [ 'no results found' ])

    const urls = res.items.reduce(function (arr, item) {
      arr.push(item.html_url)
      return arr
    }, [])

    cb(null, urls)
  })
}
