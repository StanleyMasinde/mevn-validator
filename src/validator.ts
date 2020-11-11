class Validator {
    /**
     * Rules for the current validation
     */
    rules = {}
    /**
     * Fileds under validation
     */
    fields
    /**
     * Error Messages if any
     */
    messages = {}


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
            }) == 0 ? resolve('valid') : reject({ errors: this.messages })

        })
    }

    /**
     * 
     * @param {String} rules 
     */
    getFieldRules(rules, field) {
        let rulesArr = rules.split('|')
        rulesArr.forEach(rule => {
            let nRule = rule.split(':')
            let secParam = nRule[1]
            switch (nRule[0]) {
                case 'required':
                    this.required(field)
                    break;
                case 'email':
                    this.email(field)
                    break
                case 'string':
                    this.string(field)
                    break
                case 'min':
                    this.min(field, secParam)
                    break
                case 'max':
                    this.max(field, secParam)
                    break
                default:
                    break;
            }
        });
    }

    /**
     * 
     * @param {string} field 
     */
    friendlyName(field) {
        return `The ${field.split('_').join(' ')}`
    }
    /**
     * The filed under validation mus not be null
     * @param {String} field 
     */
    required(field) {
        return this.fields[field] == '' | this.fields[field] == null ? this.messages[field].push(`${this.friendlyName(field)} is required`) : true
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
            this.messages[field].push(`${this.friendlyName(field)} should be a valid E-mail`)
        }
    }

    /**
     * Validate a string
     * @param {String} field 
     */
    string(field) {
        let rgx = new RegExp(/[A-Za-z]/)
        return rgx.test(this.fields[field]) ? true : this.messages[field].push(`${this.friendlyName(field)} should be a string`)
    }

    /**
     * Validate minimum
     * @param {String} field 
     * @param {Number} limit 
     */
    min(field, limit) {
        if (this.fields[field] == undefined) {
            return
        }
        return this.fields[field].length < limit ? this.messages[field].push(`${this.friendlyName(field)}  should be longer than ${limit}`) : true
    }

    /**
     * Validate maximum
     * @param {Sring} field 
     * @param {Number} limit 
     */
    max(field, limit) {
        if (this.fields[field] == undefined) {
            return
        }
        return this.fields[field].length > limit ? this.messages[field].push(`${this.friendlyName(field)} should be shorter than ${limit}`) : true
    }
}

export default Validator
