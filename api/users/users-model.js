const db = require('../../data/db-config')

function find() {
    return db('users').select('id', 'username')
}

function findBy(filter) {
    return db('users').where(filter)
}

function findById(id) {
    return db('users')
    .select('id', 'username')
    .where('id', id).first()
}

async function add(user) {
    const [id] = await db('users').insert(user)
    return findById(id)
}

module.exports = {
    find,
    findBy,
    findById,
    add
}