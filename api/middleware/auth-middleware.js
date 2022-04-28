const User = require('../users/users-model')

async function checkPayload(req, res, next) {
    try {
        const { username, password } = req.body
        if (!username || !password) {
            res.status(404).json({ message: 'username and password required' })
        } else {
            req.username = username
            req.password = password
            next()
        }
    } catch (err) {
        next(err)
    }
}

async function checkUsername(req, res, next) {
    try {
        const users = await User.findByUsername(req.body.username)
        if(!users.length) {
            next()
        } else {
            res.status(422).json({ message: 'username taken' })
        }
    } catch (err) {
        next(err)
    }
}

module.exports = {
    checkPayload,
    checkUsername
}