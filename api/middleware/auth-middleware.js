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
        const users = await User.findBy({ username: req.body.username })
        if(!users.length) {
            next()
        } else {
            next({ status: 422, message: 'username taken' })
        }
    } catch (err) {
        next(err)
    }
}

module.exports = {
    checkPayload,
    checkUsername
}