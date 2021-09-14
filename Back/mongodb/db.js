const MongoClient = require('mongodb').MongoClient;

const url = "mongodb://127.0.0.1:27017/";

/* Create new database via mongodb */
const createDb = async(dbName) => {
    const dbUrl = url + dbName;
    const client = await MongoClient.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true }).catch(err => { console.log(err); });
    client.close();
} 

/* connect to database */
const dbConnect = async() => {
    return await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).catch(err => { console.log(err); });
}

/* Add new collection to db */
const createCollection = async(dbName, collectionName) =>{
    const client = await dbConnect();
    const res = await client.db(dbName).createCollection(collectionName);
    client.close();
}
/* delete collection */
const deleteCollection = async(dbName, collectionName) => {
    const client = await dbConnect();
    const col = client.db(dbName).collection(collectionName);
    const res = await col.drop();
    
    if(res) {
        console.log("Collection deleted");
    }
    client.close();
}

/* join collections */
// MongoDB is not a relational database, but you can perform a left outer join by using the $lookup stage.
// The $lookup stage lets you specify which collection you want to join with the current collection, and which fields that should match.
const join = async(dbName, collectionName, fromCollection, toField, fromField, asName) => {
    const client = await dbConnect();
    const col = client.db(dbName).collection(collectionName);
    const res = await col.aggregate([
        { $lookup:
           {
             from: fromCollection,
             localField: toField,
             foreignField: fromField,
             as: asName
           }
         }
        ]).toArray();
    client.close();
    return res;
}

/* insert document to collection */
// If you do not specify an _id field, then MongoDB will add one for you and assign a unique id for each document.
// In the example bellow no _id field was specified, and as you can see from the result object, MongoDB assigned a unique _id for each document.
// If you do specify the _id field, the value must be unique for each document
const insert = async(dbName, collectionName, data)=> {
    if(isEmpty(data)) {
        return;
    }
    const client = await dbConnect();
    const col = client.db(dbName).collection(collectionName);
    const res =  await col.insertOne(data);
    client.close();
    return res;
}

/* insert multiple documents to collection */
const insertMulti = async(dbName, collectionName, dataList)=> {
    if(!dataList.length) {
        return;
    }
    const client = await dbConnect();
    const col = client.db(dbName).collection(collectionName);
    const res =  await col.insertMany(dataList);
    client.close();
    return res;
}

/* select data from collection */ 
// The findOne() method returns the first occurrence in the selection.
// The first parameter of the findOne() method is a query object. 
// In this example we use an empty query object, which selects all documents in a collection (but returns only the first document).

const findOne = async(dbName, collectionName, query, projection={})=> {
    if(isEmpty(query)) {
        return;
    }
    const client = await dbConnect();
    const col = client.db(dbName).collection(collectionName);
    const res = await col.findOne(query, projection);
    client.close();
    return res;
}

/*
 To select data from a table in MongoDB, we can also use the find() method.
 The find() method returns all occurrences in the selection.
 The first parameter of the find() method is a query object, and is used to limit the search.
 The second parameter of the find() method is the projection object that describes which fields to include in the result.
 This parameter is optional, and if omitted, all fields will be included in the result.
 0 - exclude
 1 - included
 You are not allowed to specify both 0 and 1 values in the same object, only _id field can get 0 or 1 no metter the other values
 Use the sort() method to sort the result in ascending or descending order.

 The sort() method takes one parameter, an object defining the sorting order.
 { name: 1 } // ascending
 { name: -1 } // descending
*/
const find = async(dbName, collectionName, query, projection={}, sort={}, limit=0)=> {
    if(isEmpty(query)) {
        return;
    }
    const client = await dbConnect();
    const col = client.db(dbName).collection(collectionName);
    if(!limit) {
        if(!isEmpty(sort)) {
            const res = await col.find(query, projection).sort(sort).toArray();
            client.close();
            return res;
        } else {
            const res = await col.find(query, projection).toArray();
            client.close();
            return res;
        }
    }
    else {
        if(!isEmpty(sort)) {
            const res = await col.find(query, projection).limit(limit).sort(sort).toArray();
            client.close();
            return res;
        } else {
            const res = await col.find(query, projection).limit(limit).toArray();
            client.close();
            return res;
        }
    }
}

/* Update document in collection */
const updateOne = async(dbName, collectionName, query, newvalues) => {
    if(isEmpty(query) || isEmpty(newvalues) ) {
        return;
    }
    const client = await dbConnect();
    const col = client.db(dbName).collection(collectionName);
    const res = await col.updateOne(query, newvalues);
    client.close();
    return res;
}

/* Update multiple documents in collection */
const update = async(dbName, collectionName, query, newvalues) => {
    if(isEmpty(query) || isEmpty(newvalues) ) {
        return;
    }
    const client = await dbConnect();
    const col = client.db(dbName).collection(collectionName);
    const res = await col.updateMany(query, newvalues);
    client.close();
    return res;
}

/* Delete document from collection */
const deleteOne = async(dbName, collectionName, query) => {
    if(isEmpty(query)) {
        return;
    }
    const client = await dbConnect();
    const col = client.db(dbName).collection(collectionName);
    const res = await col.deleteOne(query);
    console.log("1 document deleted");
    client.close();
    return res;
}

/* Delete multiple documents from collection */
const deleteMulti = async(dbName, collectionName, query) => {
    if(isEmpty(query)) {
        return;
    }
    const client = await dbConnect();
    const col = client.db(dbName).collection(collectionName);
    const res = await col.deleteMany(query);
    console.log(res.result.n + " document(s) deleted");
    client.close();
    return res;
}

/* check if object is empty */
const isEmpty = (obj) => {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

module.exports = {
    insert,
    insertMulti,
    find,
    findOne,
    updateOne,
    update,
    deleteOne,
    deleteMulti,
    join,
}