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
    trustServerCertificate: true,
    trustedConnection: false,
    enableArithAbort: true,
    useUTC: true

  },
  port: 2151,
  requestTimeout: 20000,
}


function formatDateTime(dateTime) {
  const year = dateTime.getFullYear();
  const month = ('0' + (dateTime.getMonth() + 1)).slice(-2);
  const day = ('0' + dateTime.getDate()).slice(-2);
  const hours = ('0' + dateTime.getHours()).slice(-2);
  const minutes = ('0' + dateTime.getMinutes()).slice(-2);
  const seconds = ('0' + dateTime.getSeconds()).slice(-2);
  const formattedDateTime = `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
  return formattedDateTime;
}

app.use(bodyParser.json());

// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/TestCount.html');
});

// Handle data submission
app.post('/submit', async (req, res) => {

  const { inputElement, filter, fromDate1, toDate1 } = req.body; // Access the data sent from the client
  console.log('Received data from total count:', inputElement, filter, fromDate1, toDate1);
  try {
    await sql.connect(config, function (err) {

      var reqest = new sql.Request()
      reqest.query(`select [${filter}], Count([${filter}]) from [XFBLogs].[dbo].[SBTransfers]
                   WHERE [timestamp] BETWEEN '${fromDate1}' AND '${toDate1}'
                   GROUP BY [${filter}] ORDER BY COUNT(${filter}) desc`, function (err, records) {
        if (err) console.log(err);
        else res.json(records.recordset);
        console.log(records.recordset)

      })
    })



  } catch (error) {
    res.status(500).json({ error: error.message });
  }

}
)
app.post('/hour', async (req, res) => {

  const { inputElement, filter, fromDate1, toDate1 } = req.body; // Access the data sent from the client
  console.log('Received data from hour count:', inputElement, filter, fromDate1, toDate1);
  try {
    await sql.connect(config, function (err) {
      var reqest = new sql.Request()
      reqest.query(`  SELECT CAST(timestamp as date) AS ForDate,
                   DATEPART(hour,timestamp) AS OnHour,
                   COUNT(*) AS Totals
                   FROM SBTransfers
                   WHERE ${filter}='${inputElement}' and [timestamp] >=  '${fromDate1}' and [timestamp] <= '${toDate1}'
                   GROUP BY CAST(timestamp as date),
                   DATEPART(hour,timestamp) order by ForDate, OnHour`, function (err, records) {
        if (err) console.log(err);
        else res.json(records.recordset);
        console.log(records.recordset)
        console.log(records.recordset[0].ForDate)
        var dateR = formatDateTime(records.recordset[0].ForDate)
        console.log(dateR)


      })
    })
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

}
)

app.post('/min', async (req, res) => {

  const { inputElement, filter, fromDate1, toDate1 } = req.body; // Access the data sent from the client
  console.log('Received data from min count:', inputElement, filter, fromDate1, toDate1);
  try {
    await sql.connect(config, function (err) {
      var reqest = new sql.Request()
      reqest.query(` 
          SELECT CAST(timestamp as date) AS ForDate,
          DATEPART(minute,timestamp) AS EveryMin,
          COUNT(*) AS Totals
          FROM SBTransfers
          WHERE [timestamp] >= '${fromDate1}' and [timestamp] <= '${toDate1}'
          GROUP BY CAST(timestamp as date),
          DATEPART(minute,timestamp) order by ForDate, EveryMin
          `, function (err, records) {
        if (err) console.log(err);
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
