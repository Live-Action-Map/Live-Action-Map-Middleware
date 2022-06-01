const MongoClient = require("mongodb").MongoClient;
require('dotenv').config()

const uri = process.env.MONGO_URI

const client = new MongoClient(uri);
const db = process.env.MONGO_DB

module.exports = {
    insert,
    read
}



async function insert(collection, query, doc) {
    try {
        await client.connect();
        const database = client.db(db);
        const update = { $set: doc };
        const col = database.collection(collection);
        const options = { upsert: true };
        let result = await col.updateOne(query, update, options);
        return result
    } catch (e) {
        console.log(e)
    }
}

async function read(collection, find) {
    await client.connect()
    let database = client.db(db)
    let result = []
    const cursor = database.collection(collection).find(find)
    await cursor.forEach((e) => {
        result.push(e)
    });
    return result
}

