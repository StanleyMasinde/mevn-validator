//@ts-check
class Validator {
    /**
     * The fields under validation
     */
    fields: {}

    /**
     * The validation rules
     */
    rules: {}

    /**
     * The message bag
     */
    messages: {}

    /**
     * Validate the input
     * @param fields 
     * @param rules 
     */
    constructor(fields: {}, rules: {}) {
        this.fields = fields
        this.rules = rules
    }

    /**
     * Run the validator
     */
    validate() {
        return new Promise((resolve, reject) => {
            Object.entries(this.rules).forEach(rule => {
                // Create a message bag
                this.messages[rule[0]] = [] // eg. {email: required|email} will create {email: []}
                this.getFieldRules(rule[1], rule[0])
            })
            let errorLengths = Object.values(this.messages).map((el: []) => el.length)
            errorLengths.reduce((pre: any, cur: any) => {
                return pre + cur
            }) === 0 ? resolve('valid') : reject({ errors: this.messages })
        })
    }

    /**
     * Get an array of rules from the supplied string
     * @param rules 
     * @param field 
     */
    private getFieldRules(rules: any, field: string) {
        const rulesArray = rules.split('|') // required|email will be ['required', email]
        this.validateField(rulesArray, field)
    }

    /**
     * Validate a given field
     * @param rules 
     * @param fields 
     */
    private validateField(rules: string[], field: string) {
        rules.forEach(r => {
            const rule = r.split(':') // If the rule has a second param eg min:0
            const ruleParam = parseInt(rule[1])

            switch (rule[0]) {
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
                    this.min(field, ruleParam)
                    break
                case 'max':
                    this.max(field, ruleParam)
                    break
                    break;
                default:
                    break;
            }
        })
    }

    /**
     * 
     * @param {string} field 
     */
    friendlyName(field: string) {
        return `The ${field.split('_').join(' ')}`
    }
    /**
     * The filed under validation mus not be null
     * @param {String} field 
     */
    required(field: string) {
        return this.fields[field] == '' || this.fields[field] == null ? this.messages[field].push(`${this.friendlyName(field)} is required`) : true
    }
    /**
     * Validate an email address
     * @param {String} field 
     */
    email(field: string) {
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
    string(field: string) {
        let rgx = new RegExp(/[A-Za-z]/)
        return rgx.test(this.fields[field]) ? true : this.messages[field].push(`${this.friendlyName(field)} should be a string`)
    }

    /**
     * Validate minimum
     * @param {String} field 
     * @param {Number} limit 
     */
    min(field: string, limit: number) {
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
    max(field: string, limit: number) {
        if (this.fields[field] == undefined) {
            return
        }
        return this.fields[field].length > limit ? this.messages[field].push(`${this.friendlyName(field)} should be shorter than ${limit}`) : true
    }
}

export default Validator
