## Validator For Express

 * Install the package `npm i mevn-validator`
 * Can be used to validate express requests see th example below
 ```javascript
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
* The Validator must be instatiated with the `new KeyWord`
```javascript
   const Validator = require('mevn-validator')

   // Create a validator instance
   let validate = new Validator(fields: Object, rules: Object)
   validate.validate()
   .then(valid => {
       // do something when the validation passes
   })
   .catch(messages => {
       // You would probably need to send this to the user
       // the messages contains the error messages
   })

   // OR like a cool kid 😎
   new Validator(fields: Object, rules: Object).then(....).catch(...).finally(...)
```
* Rules are separted by **|** e.g `field: required|email`. The field under validation must be available and be a valid E-mail Address

### Available rules
1. #### Required
  * Ensures that the field under validation is available `field: required`
2. #### String
  * The field under validation must be a valid String `field: string`
3. #### Email
  * The field under validation must be a valid String `field: email`
4. #### Min:length
  * The field under validation must be more than the given length `field: min:10`
2. #### Max:length
  * The field under validation must be less than the given length `field: max:20`

  __More rules and Docs coming soon. Contributions are welcome__