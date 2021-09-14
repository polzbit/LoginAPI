const db = require('./db');
const config = require('../config');

const insert = async(userData)=> {
    const res = await db.insert(config.mongo.db, config.mongo.users, userData);
    return res;
}

const find = async(query, projection)=> {
    const res = await db.find(config.mongo.db, config.mongo.users, query, projection);
    return res;
}

const updateOne = async(query, newvalues) => {
    const res = await db.updateOne(config.mongo.db, config.mongo.users, query, newvalues);
    return res;
}


module.exports = {
    insert,
    find,
    updateOne
}