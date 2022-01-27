# Mongo commands
| SQL         | NoSQL                                                     |
| ----------- | --------------------------------------------------------- |
| Table       | Collection                                                |
| Tuple/Row   | Document                                                  |
| Column      | Field                                                     |
| Table Join  | Embedded Documents                                        |
| Primary Key | Primary Key (Default key \_id provided by MongoDB itself) |

## Types of data
- **String** − This is the most commonly used datatype to store the data. String in MongoDB must be UTF-8 valid.
- **Integer** − This type is used to store a numerical value. Integer can be 32 bit or 64 bit depending upon your server.
- **Boolean** − This type is used to store a boolean (true/ false) value.
- **Double** − This type is used to store floating point values.
- **Min/ Max keys** − This type is used to compare a value against the lowest and highest BSON elements.
- **Arrays** − This type is used to store arrays or list or multiple values into one key.
- **Timestamp** − ctimestamp. This can be handy for recording when a document has been modified or added.
- **Object** − This datatype is used for embedded documents.
- **Null** − This type is used to store a Null value.
- **Date** − This datatype is used to store the current date or time in UNIX time format. You can specify your own date time by creating object of Date and passing day, month, year into it.
- **Object ID** − This datatype is used to store the document’s ID.
- **Binary data** − This datatype is used to store binary data.
- **Code** − This datatype is used to store JavaScript code into the document.
- **Regular expression** − This datatype is used to store regular expression.

## Entry
```bash
    mongosh
```

## Show list of databases
```bash
    show dbs
```

## Use a db
```bash
    use db_name
```
If the db doesn't exist this command will create the a temporary db

## Show collections from a db
```bash
    show collections
```

## To insert a new document into the collection
```bash
    db.coleccion_name.insertOne(  {name: 'Afghanistan', code: 'AF'}   );
```

Return:
```bash
{
    acknowledged: true,
    insertedId: ObjectId("61f04527748031d02506cbef")
}
```

## Insert a list of elements
```bash
    db.coleccion_name.insertMany([
        { name: "Mexico", code: "MX" },
        { name: "Colombia", code: "CO" }
    ]);
```

Return:
```bash
{
    acknowledged: true,
    insertedIds: {
        '0': ObjectId("61f0486b748031d02506cbf0"),
        '1': ObjectId("61f0486b748031d02506cbf1")
    }
}
```

## List all data of the collection
```bash
    db.coleccion_name.find()
    db.coleccion_name.find().pretty()
```

## Performance. Return an JSON with metadata of the query
```bash
    db.coleccion_name.find().pretty().explain('executionStats')
```

## List with specific criteria
```bash
    db.coleccion_name.find({ code: 'CO' })
    db.coleccion_name.find({ code: { $eq: 'CO' } })
```
Return a **list** with all the coincidences or an **empty list** in the other case.

## List with excluded specific criteria
```bash
    db.coleccion_name.find({ code: { $ne: 'CO' } })
```

## Return the first coincidence of
```bash
    db.coleccion_name.findOne({name: 'Afghanistan'})
```

## AND
```bash
    db.coleccion_name.find({ code: 'CO', name: 'Colombia' })
```

## Projection. Return only necesary data (SELECT in SQL)
```bash
    db.coleccion_name.find({}, {name: 1, _id: 0, code: 1})
```
Return all the document without the field *_id*.

```bash
    db.coleccion_name.find({}, {name: 1})
```
Return only *_id* and *name*.

```bash
    db.coleccion_name.find({ note: { $exists: true } })
```
Return only the documents that contains the field *note*.


Visit [MongoDB operators](https://docs.mongodb.com/manual/reference/operator/) or [MongoDB developer](https://docs.mongodb.com/developer/) for more.
