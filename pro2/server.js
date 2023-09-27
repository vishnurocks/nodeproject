const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const sql = require('mssql');

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
app.use(bodyParser.json());

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Handle data submission
app.post('/submit', async(req, res) => {
    
    const {inputElement,filter,fromDate,toDate} = req.body; // Access the data sent from the client
    console.log('Received data:',inputElement,filter,fromDate,toDate );
    try {
        await sql.connect(config,function(err){

                var reqest = new sql.Request()
                reqest.query(`select [${inputElement}], Count([${inputElement}]) from [XFBLogs].[dbo].[SBTransfers]
                   WHERE [timestamp] BETWEEN ${fromDate} AND ${toDate}
                   GROUP BY [${inputElement}] ORDER BY COUNT(${inputElement}) desc`,function(err,records){
                  if(err)console.log(err);
                  else res.json(records.recordset);
                  console.log(records.recordset)
                
                })
                })
    
        
      } catch (error) {
        res.status(500).json({ error: error.message });
      }

    }
    )

const port = 3001;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});