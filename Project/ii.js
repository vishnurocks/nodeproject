
const sql = require('mssql');

    // config for your database
    var config = {
        user: 'sa',
        password: 'password',
        server: 'shyam', 
        database: 'shashi' ,
        options: {
            trustedConnection: true,
            port:1433,
            trustServerCertificate: true
             // change to true for local dev / self-signed certs
          }
    };
    
   
    
         sql.connect(config);
        const result =  sql.query`SELECT * FROM YourTableName `;
        console.log(result);
    
