/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const Validator = require('../dist/validator')


test('Validate required (empty string)', () => {
	const prom = new Validator({ 'username': '' }, { username: 'required' }).validate()
	return expect(prom).rejects.toEqual({ 'errors': { 'username': ['The username is required'] } })
})

test('Validate required (null value)', () => {
	const prom = new Validator({ 'username': null }, { username: 'required' }).validate()
	return expect(prom).rejects.toEqual({ 'errors': { 'username': ['The username is required'] } })
})

test('Validate Email (Invalid email)', () => {
	const prom = new Validator({ 'email': 'email.com' }, { email: 'email' }).validate()
	return expect(prom).rejects.toEqual({ 'errors': { 'email': ['The email should be a valid E-mail'] } })
})

test('Validate Email (Valid email)', () => {
	const prom = new Validator({ 'email': 'john@mail.com' }, { email: 'email' }).validate()
	return expect(prom).resolves.toEqual('valid')
})

test('Validate string (Valid string)', () => {
	const prom = new Validator({ 'username': 'username string' }, { username: 'string' }).validate()
	return expect(prom).resolves.toEqual('valid')
})

test('Validate string (Invalid string)', () => {
	const prom = new Validator({ 'username': 678 }, { username: 'string' }).validate()
	return expect(prom).rejects.toEqual({ 'errors': { 'username': ['The username should be a string'] } })
})

test('Validate min rule (Valid)', () => {
	const prom = new Validator({ 'username': 'fourdigit' }, { username: 'min:4' }).validate()
	return expect(prom).resolves.toEqual('valid')
})

test('Validate min rule (Invalid)', () => {
	const prom = new Validator({ 'username': 'jo' }, { username: 'min:4' }).validate()
	return expect(prom).rejects.toEqual({ 'errors': { 'username': ['The username  should be longer than 4'] } })
})

test('Validate max rule (Valid)', () => {
	const prom = new Validator({ 'username': 'four' }, { username: 'max:4' }).validate()
	return expect(prom).resolves.toEqual('valid')
})

test('Validate max rule (Invalid)', () => {
	const prom = new Validator({ 'username': 'longerthan4' }, { username: 'max:4' }).validate()
	return expect(prom).rejects.toEqual({ 'errors': { 'username': ['The username should be shorter than 4'] } })
})

test('Chaining rules (Valid)', () => {
	const prom = new Validator({ 'email': 'john@mail.com' }, { email: 'required|email|max:13|min:5' }).validate()
	return expect(prom).resolves.toEqual('valid')
})

test('Chaining rules (Invalid)', () => {
	const prom = new Validator({ 'email': '' }, { email: 'required|email|max:13|min:5' }).validate()
	return expect(prom).rejects.toEqual({ 'errors': { 'email': ['The email is required', 'The email should be a valid E-mail', 'The email  should be longer than 5'] } })
})
