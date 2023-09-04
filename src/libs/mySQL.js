const mysql = require('mysql2')

const connection = mysql.createConnection({
   host: process.env.MYSQL_HOST,
   user: process.env.MYSQL_USER,
   password: process.env.MYSQL_PASSWORD,
   database: process.env.MYSQL_DATABASE,
})


connection.connect((err) => {
   if (err) {
      console.log(err)
      process.exit()
      return
   }

   console.log('DB Connected!')
})


process.on('SIGINT', () => {
   connection.end()
   console.log('DB Disconnected!')
   process.exit()
})

process.on('exit', (code) => {
   connection.end()
   console.log(`Exit with code: ${code}`)
})

const db = connection.promise()
module.exports = db