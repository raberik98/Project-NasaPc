// model
const User = require('../models/user');

// nodemailer to send emails
const nodemailer = require('nodemailer');
const nodemailerSendgrid = require('nodemailer-sendgrid');

// password hash
const bcrypt = require('bcrypt');

// custom id maker for activatorToken
const makeid = require('../util/makeid.js');

// sendgrid API key
require("dotenv").config();

const transport = nodemailer.createTransport(nodemailerSendgrid({ apiKey: process.env.SENDGRID_API_KEY }));

exports.register = (req, res) => {
    try {
        if (req.body.email && req.body.password) {

            let email = req.body.email;

            User.findOne({ email })
                .then(async (response) => {

                    if (!response) {

                        let password = await bcrypt.hash(req.body.password, 5);
                        const activatorToken = makeid(32);

                        var user = new User();
                        user.email = email;
                        user.password = password;
                        user.activatorToken = activatorToken;

                        user.save()
                            .then((response2) => {

                                transport.sendMail({
                                    from: 'tamas.robert1@students.jedlik.eu',
                                    to: email,
                                    subject: 'NasaPC - Account activation',
                                    html: '<h3>Account activation</h3><br><p>Click on this link to activate your account: http://localhost:8080/activate/' + activatorToken + ' </p>'
                                });
                                return res.send(response2);
                            })
                            .catch((error) => {
                                return res.send(error);
                            })
                    } else {
                        return res.status(400).json({ "error": "Email is already in use!" });
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        } else {
            return res.status(400).json({ "error": "Bad input!" });
        }
    } catch (e) {
        res.statusCode(500);
    }
}

exports.verifyRegistration = (req, res) => {
    try {
        if (req.params.token) {

            let token = req.params.token;

            User.findOne({ 'activatorToken': token })
                .then(async (response) => {

                    if (response) {

                        User.updateOne({ 'activatorToken': token }, { $unset: { 'activatorToken': "" } })
                            .then((result) => {
                                return res.status(200).json({ "message": "Account activated!" });
                            })
                            .catch((error) => { return res.send(error) })

                    } else {
                        return res.status(400).json({ "error": "User already activated or bad token!" });
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        } else {
            return res.status(400).json({ "error": "Bad token!" });
        }
    } catch (e) {
        res.statusCode(500);
    }
}

exports.getSession = (req, res) => {
    const session = req.cookies['LOCAL_KEY'];
    if (!session) {
        return res.status(401).send(false);
    }
    User.findOne({ session })
        .then((response) => {
            if (!response) {
                return res.status(401).send(false);
            }
            var data = {
                email: response.email
            }
            if (response.admin) {
                data = [{ ...data, admin: true }];
            }
            else if (response.courier && !response.admin) {
                data = [{ ...data, admin: false, courier: true }];
            }
            else {
                data = [{ ...data, admin: false, courier: false }];
            }
            return res.json(data)
        })
        .catch((err) => {
            console.log(err)
        })
}

exports.login = (req, res) => {
    try {
        if (req.body.email && req.body.password) {
            let email = req.body.email;

            User.findOne({ email })
                .then(async (response) => {

                    if (response) {

                        if (response.activatorToken) {
                            return res.status(400).json({ "error": "Account is not activated!" });
                        }

                        const user = await bcrypt.compare(req.body.password, response.password);
                        if (user) {
                            const session = makeid(32);
                            res.cookie('LOCAL_KEY', session)
                            User.updateOne({ email }, { $set: { session } })
                                .then(() => { })
                                .catch((error) => {
                                    console.log(error);
                                })
                            var data = {
                                email: response.email,
                                session,
                                userId: response._id
                            }
                            if (response.admin) {
                                data = { ...data, admin: true };
                            }
                            else if (response.courier && !response.admin) {
                                data = { ...data, admin: false, courier: true };
                            }
                            else {
                                data = { ...data, admin: false, courier: false };
                            }
                            return res.send(data)
                        } else {
                            return res.status(400).json({ "error": "Password incorrect!" });
                        }
                    }
                    else {
                        return res.status(400).json({ "error": "Email does not exist!" });
                    }
                })
                .catch(() => {
                    return res.status(400).json({ "error": "Email does not exist!" });
                })

        } else {
            return res.status(400).json({ "error": "Bad input!" });
        }
    } catch (e) {
        res.statusCode(500);
    }
}

exports.logout = (req, res) => {

    const session = req.cookies['LOCAL_KEY'];

    if (session) {

        User.findOne({ session })
            .then((response) => {

                if (response) {

                    User.updateOne({ session }, { $unset: { session } })
                        .then(() => {

                            res.clearCookie('LOCAL_KEY');
                            return res.status(200).json({ "message": "Successful logout." });

                        })
                        .catch((error) => { return res.send(error) })
                }
            })
            .catch((error) => { res.send(error) })
    } else {
        res.status(401).json({ "error": "No session key found!" });
    }
}