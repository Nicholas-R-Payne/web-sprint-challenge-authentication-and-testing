const db = require('../../data/dbConfig')

function find() {
    return db('users').select('id', 'username')
}

function findById(id) {
    return db('users')
    .select('id', 'username')
    .where('id', id).first()
}

function findByUsername(username) {
    return db('users')
    .select('id', 'username')
    .where('username', username)
}

async function add(user) {
    const [id] = await db('users').insert(user)
    return findById(id)
}

module.exports = {
    find,
    findById,
    findByUsername,
    add
}