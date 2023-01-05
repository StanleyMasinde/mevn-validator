/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-mixed-spaces-and-tabs */
class Validator {
	/**
     * The fields under validation
     */
	fields: Object

	/**
     * The validation rules
     */
	rules: Object

	/**
     * The message bag
     */
	messages: Object

	/**
     * Validate the input
     * @param fields 
     * @param rules 
     */
	constructor(fields: {}, rules: {}) {
		this.fields = fields
		this.rules = rules
		this.messages = {}
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
			const errorLengths = Object.values(this.messages).map((el: []) => el.length)
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
				break
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
			default:
				break
			}
		})
	}

	/**
     * 
     * @param {string} field 
     */
	private friendlyName(field: string) {
		if (field.includes('_')) {
			return `The ${field.split('_').join(' ')}`
		}

		const friendlyName =  field.replace(/([a-z0-9])([A-Z])/g, '$1 $2').toLocaleLowerCase()
		return `The ${friendlyName}`
	}
	/**
     * The filed under validation mus not be null
     * @param {String} field 
     */
	private required(field: string) {
		return this.fields[field] == '' || this.fields[field] == null ? this.messages[field].push(`${this.friendlyName(field)} is required`) : true
	}
	/**
     * Validate an email address
     * @param {String} field 
     */
	private email(field: string) {
		const rgx = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
		if (rgx.test(this.fields[field]) == true) {
			return
		} else {
			this.messages[field].push(`${this.friendlyName(field)} should be a valid E-mail`)
		}
	}

	/**
     * Validate a string
     * @param {String} field 
     */
	private string(field: string) {
		const rgx = new RegExp(/[A-Za-z]/)
		return rgx.test(this.fields[field]) ? true : this.messages[field].push(`${this.friendlyName(field)} should be a string`)
	}

	/**
     * Validate minimum
     * @param {String} field 
     * @param {Number} limit 
     */
	private min(field: string, limit: number) {
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
	private max(field: string, limit: number) {
		if (this.fields[field] == undefined) {
			return
		}
		return this.fields[field].length > limit ? this.messages[field].push(`${this.friendlyName(field)} should be shorter than ${limit}`) : true
	}
}

export = Validator
