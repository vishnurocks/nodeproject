// const express = require('express');
// const sql = require('mssql');
// const app = express();

//     // config for your database
//     var config = {
//         user: 'sa',
//         password: 'password',
//         server: 'shyam', 
//         database: 'shashi' ,
//         options: {
//             trustedConnection: true,
//             port:1433,
//             trustServerCertificate: true
//              // change to true for local dev / self-signed certs
//           }
//     };
    
//    app.use(express.json());
    
//     app.post('/getCounts', async (req, res) => {
//       try {
//         const { input, fromDate, toDate, filter } = req.body;
    
//         await sql.connect(config);
//         const result = await sql.query`
//           SELECT COUNT(*) AS totalCount
//           FROM YourTableName
//           WHERE ${filter} = ${input}
//             AND dateField BETWEEN ${fromDate} AND ${toDate};
//         `;
    
//         res.json(result.recordset);
//       } catch (error) {
//         res.status(500).json({ error: error.message });
//       } finally {
//         await sql.close();
//       }
//     });
    
//     const PORT = 3000;
//     app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//     });
    


const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/in.html');
  console.log(req.body)
});
    
    app.post('/getCounts', async (req, res) => {
      try {
        const { input, fromDate, toDate, filter } = req.body;
        res.json(input,fromDate,toDate,filter);
        res.send(input,fromDate,toDate,filter)
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });
    
    const PORT = 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });