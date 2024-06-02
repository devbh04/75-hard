const express = require("express")
const app = express();
const port = 3000;

app.use(express.json());

const users = [
{
    name : "John",
    kidneys : [
        {
            healthy : false
        }
    ]
}
]

app.get('/' ,function(req, res){
    console.log("User is now viewing his kidney health")
    const johnKidneys = users[0].kidneys;
    const numberOfKidneys = johnKidneys.length;
    let healthyKidneys = 0;
    for (let i = 0; i < johnKidneys.length; i++) {
        if(johnKidneys[i].healthy == true){
            healthyKidneys+=1;
        }
    }
    const unhealthyKidneys = numberOfKidneys - healthyKidneys;

    res.json({
        users,
        johnKidneys,
        numberOfKidneys,
        healthyKidneys,
        unhealthyKidneys
    })
})

app.post('/', function(req, res){
    console.log("We are now getting the post reqs")
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push(
        {
            healthy : isHealthy
        }
    )
    res.json({
        msg : "Done! post"
    })
})

app.put("/", function(req, res){
    for (let i = 0; i<users[0].kidneys.length; i++){
        users[0].kidneys[i].healthy = true
    }
    res.json({
        msg: "Done! put"
    })
})

app.delete("/", function (req, res) {
  let deletedCount = 0; // Keeps track of deleted kidneys
  for (let i = users[0].kidneys.length - 1; i >= 0; i--) { // Loop backwards
    if (users[0].kidneys[i].healthy === false) {
      users[0].kidneys.splice(i, 1); // Remove only 1 element at index i
      deletedCount++;
    }
  }
  res.json({
    msg: `Done! deleted ${deletedCount} kidneys`,
  });
});

app.listen(port, function(){
    console.log(`Server is now listening to te port ${port}`)
})
 