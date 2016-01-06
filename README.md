# github-credential-scraper [![stability][0]][1]
[![js-standard-style][10]][11]

Naive credential scraper for GitHub. Looks for:
- `AWS_KEY`
- `AWS_ACCESS_KEY`
- `AWS_SECRET_KEY`
- `x-oauth-basic`
- `id_rsa` files
- `.key` files
- `.pem` files

## Installation
```sh
$ npm install github-credential-scraper
```

## Usage
### cli
```txt
Usage: github-credential-scraper [options] <orgname>

Options:
  -h, --help        Output usage information
  -v, --version     Output version number
  -t, --token       GitHub auth token
  -u, --username    GitHub username

Examples:
  $ github-credential-scraper google
  $ github-credential-scraper google -u foobar -t aeff0558afei45

Docs: https://github.com/TabDigital/github-credential-scraper
Bugs: https://github.com/TabDigital/github-credential-scraper/issues
```

### js
```js
const awsCredentialScraper = require('github-credential-scraper')
const auth = {
  user: 'rvagg',
  token: '24d5dee258c64aef38a66c0c5notarealtokenlol'
}

awsCredentialScraper('TabDigital', auth, function (err, matches) {
  if (err) throw err
  console.log(matches)
})
```

## API
### awsCredentialScraper(orgname, auth, cb(err, matches))
Create a new scraper that scrapes GitHub for an `orgname`.

## License
[MIT](https://tldrlegal.com/license/mit-license)

[0]: https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square
[1]: https://nodejs.org/api/documentation.html#documentation_stability_index
[10]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[11]: https://github.com/feross/standard
