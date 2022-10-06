const mysql:any      = require('mysql2/promise');
const connection = async () => {
  const connection = await mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'rootroot',
    database : 'nextjs-store'
  });
  
  await connection.connect();
  return connection;  
}

export default connection;
