const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const path = require('path')

let db_path = process.env['DB_PATH'] || '/tmp'
const adapter = new FileSync(path.join(db_path, 'db.json'))
const db = low(adapter)

// Set some defaults
db.defaults({ chats: {} })
  .write()

module.exports = db

//sample chat structure
/*{
    id: 'xxx',
    upperTrigger: [20, 30],
    lowerTrigger: [15],
}*/