declare class Validator {
    /**
     * The fields under validation
     */
    fields: Object;
    /**
     * The validation rules
     */
    rules: Object;
    /**
     * The message bag
     */
    messages: Object;
    /**
     * Validate the input
     * @param fields
     * @param rules
     */
    constructor(fields: {}, rules: {});
    /**
     * Run the validator
     */
    validate(): Promise<unknown>;
    /**
     * Get an array of rules from the supplied string
     * @param rules
     * @param field
     */
    private getFieldRules;
    /**
     * Validate a given field
     * @param rules
     * @param fields
     */
    private validateField;
    /**
     *
     * @param {string} field
     */
    private friendlyName;
    /**
     * The filed under validation mus not be null
     * @param {String} field
     */
    private required;
    /**
     * Validate an email address
     * @param {String} field
     */
    private email;
    /**
     * Validate a string
     * @param {String} field
     */
    private string;
    /**
     * Validate minimum
     * @param {String} field
     * @param {Number} limit
     */
    private min;
    /**
     * Validate maximum
     * @param {Sring} field
     * @param {Number} limit
     */
    private max;
}
export = Validator;
