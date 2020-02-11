## Validator For Express

* `npm i mevn-validator`
* ```javascript
     var validator = require('mevn-validator')

     router.post('/register', function (req, res, next) {
      let rules = {
        'email': 'required|email',
        'name': 'required',
        'password': 'required|min:8',
    }
    new Validator(req.body, rules)
    .validate()
    .then(() => {
       // data is valid
    }).catch(messages => {
        // invalid data send response to use
        res.status(422).json(messages)
    })

   });
  ```

  __Docs coming soon__