const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(bodyParser.json())

function calculate_Sum_Of_n_Numbers(n){
  let result = 0;
  for(let i=0;i<n;i++){
    result+=i;
  }
  return result;
}

// this diplays the Hi on browser. '/'this is the address of the function we are providing the user
// req is request from the user and res is tog respond the user
app.get('/', function(req, res){
  console.log("We are now showing")
  res.send("Hi")
})

// this is a post request which gets the system wathever we want from the user
app.post('/req', function(req, res){
  console.log(req.headers)
  console.log(req.body)
  res.send("Hemlo")
})

// This is displaying html file
app.get('/display', function(req, res){
  console.log("We are now sending")
  res.sendFile("/Users/dev/Codes/100x_dev/week_2/http_sv/index.html")
})

// this shows how to use query parameter
app.get('/sum', function(req, res){
  console.log("We are now calculating sum")
  const n = req.query.n;
  const ans = calculate_Sum_Of_n_Numbers(n)
  res.send("The answer is " + ans.toString());
})

app.listen(port, function() {
  console.log(`Example app listening on port ${port}`)
})