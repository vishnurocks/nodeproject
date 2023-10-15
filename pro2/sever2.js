const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const sql = require('mssql');

const config = {
  user: "Ro_XFBLogs",
  password: "s1yLUwpRmpPONknHMuADEQ9xc6Rt9s#zgEAsJZ01",
  server: "TMEIPRD21",
  database: "XFBLogs",
  options: {
      trustServerCertificate:true,
      trustedConnection:false,
      enableArithAbort:true,
      useUTC:true

  },
  port:2151,
  requestTimeout:20000,
}
app.use(bodyParser.json());

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/TestCount.html');
});

// Handle data submission
app.post('/submit', async(req, res) => {
    
    const {inputElement,filter,fromDate1,toDate1} = req.body; // Access the data sent from the client
    console.log('Received data:',inputElement,filter,fromDate1,toDate1 );
    try {
        await sql.connect(config,function(err){
           
                var reqest = new sql.Request()
                reqest.query(`select [${inputElement}], Count([${inputElement}]) from [XFBLogs].[dbo].[SBTransfers]
                   WHERE [timestamp] BETWEEN '${fromDate1}' AND '${toDate1}'
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
    app.post('/hour', async(req, res) => {
    
      const {inputElement,filter,fromDate1,toDate1} = req.body; // Access the data sent from the client
      console.log('Received data:',inputElement,filter,fromDate1,toDate1 );
      try {
          await sql.connect(config,function(err){

            SELECT CAST(timestamp as date) AS ForDate,
            DATEPART(hour,timestamp) AS OnHour,
            COUNT(*) AS Totals
     FROM SBTransfers
     WHERE sender='FTCOCPS' and [timestamp] >= '2023/02/25 00:00:00' and [timestamp] <= '2023/02/26 04:00:00'
     GROUP BY CAST(timestamp as date),
            DATEPART(hour,timestamp) order by ForDate, OnHour

            
                  var reqest = new sql.Request()
                  reqest.query(`select [${inputElement}], Count([${inputElement}]) from [XFBLogs].[dbo].[SBTransfers]
                     WHERE [timestamp] BETWEEN '${fromDate1}' AND '${toDate1}'
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

    app.post('/submit', async(req, res) => {
    
      const {inputElement,filter,fromDate1,toDate1} = req.body; // Access the data sent from the client
      console.log('Received data:',inputElement,filter,fromDate1,toDate1 );
      try {
          await sql.connect(config,function(err){
  
                  var reqest = new sql.Request()
                  // reqest.query(`select [${inputElement}], Count(${inputElement}) from [XFBLogs].[dbo].[SBTransfers]
                  //    WHERE [timestamp] >= '2023/09/26 00:00:00' and [timestamp] <= '2023/09/27 00:00:01'
                  //    GROUP BY [${inputElement}] ORDER BY COUNT(${inputElement}) desc`,(err,records)){
                  //   if(err)console.log(err);
                  //   else res.json(records.recordset);
                  //   console.log(records.recordset)
  
  
                  
                  // })
                  // })
                  var reqest = new sql.Request()
                  reqest.query(`select [${inputElement}], Count([${inputElement}]) from [XFBLogs].[dbo].[SBTransfers]
                     WHERE [timestamp] BETWEEN '${fromDate1}' AND '${toDate1}'
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
