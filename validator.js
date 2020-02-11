class Validator {
    /**
     * Rules for the current validation
     */
    rules = {}
    /**
     * Fileds under validation
     */
    fields = {}
    /**
     * Error Messages if any
     */
    messages = {}
    errorcount = []


    /**
     * Input fields and the rules
     * Both are objects
     * @param {Array} fields
     * @param {Array} rules
     */
    constructor(fields, rules) {
        this.fields = fields
        this.rules = rules
    }

    /**
     * Start the validatior
     * 
     */
    validate() {
        return new Promise((resolve, reject) => {
            Object.entries(this.rules).forEach(el => {
                this.messages[el[0]] = []
                this.getFieldRules(el[1], el[0])
            })

            let errorLengths = Object.values(this.messages).map(el => el.length)
            errorLengths.reduce((pre, cur) => {
                return pre + cur
            }) == 0 ? resolve('valid') : reject(this.messages)

        })
    }

    /**
     * 
     * @param {String} rules 
     */
    getFieldRules(rules, field) {
        let rulesArr = rules.split('|')
        rulesArr.forEach(rule => {
            switch (rule) {
                case 'required':
                    this.required(field)
                    break;
                case 'email':
                    this.email(field)
                    break
                case 'string':
                    this.string(field)
                    break
                default:
                    break;
            }
        });
    }

    /**
     * The filed under validation mus not be null
     * @param {String} field 
     */
    required(field) {
        return this.fields[field] == '' | this.fields[field] == null ? this.messages[field].push(`The ${field} is required`) : true
    }
    /**
     * Validate an email address
     * @param {String} field 
     */
    email(field) {
        let rgx = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
        if (rgx.test(this.fields[field]) == true) {

        }
        else {
            this.messages[field].push(`The ${field} field should be a valid E-mail`)
        }
    }

    /**
     * Validate a string
     * @param {String} field 
     */
    string(field) {
        let rgx = new RegExp('[a-z]+[0-9]', 'gm')
        return rgx.test(field) == true ? true : this.messages[field].push(`The ${field} field should be a string`)
    }

    /**
     * Validate minimum
     * @param {String} field 
     * @param {Number} limit 
     */
    min(field, limit) {

    }

    /**
     * Validate maximum
     * @param {Sring} field 
     * @param {Number} limit 
     */
    max(field, limit) {

    }
}

module.exports = Validator
