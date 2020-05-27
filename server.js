const port = process.env.PORT || 9000;
const express = require('express')
const app = express()
const xlsx = require("xlsx");
const fs = require('fs');

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
  res.header("Access-Control-Max-Age", "3600");
  res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
  next();
});

app.get('/api/:fileName?', function (req, res) {
  const { fileName } = req.params;

  if (!fileName)
    return res.status(404).send({ errorMessage: 'file not found' });

  if (!fs.existsSync(`./sheets/${fileName}.xlsx`))
    return res.status(400).send({ errorMessage: 'this file name does not exist' })

  const wb = xlsx.readFile(`./sheets/${fileName}.xlsx`);
  const ws = wb.Sheets['Sheet1'];
  const data = xlsx.utils.sheet_to_json(ws);

  res.send(data);
});

app.listen(port, err => {
  if (err) console.log('erro: ', err)
  else console.log(`server started at port ${port}`);
});



