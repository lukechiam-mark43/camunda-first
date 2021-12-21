var cors = require("cors")
const express = require('express')
var bodyParser = require('body-parser')
const unirest = require("unirest")
const app = express();
const port = 3001;
const camundaUrl = "http://localhost:8080/engine-rest";

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// List all process definitions
app.get('/process-definition', (req, res) => {
  const request = unirest("GET", camundaUrl + "/process-definition");
  request.end(function (response) {
    if (response.error) throw new Error(response.error);
    res.json(response.body || {});
  });
})

// Start a process
app.post('/process-definition/key/:key/start', (req, res) => {
  console.log(req.params.key);
  const request = unirest.post(camundaUrl + "/process-definition/key/" + req.params.key + "/start")
                         .headers({'Content-Type': 'application/json'})
                         .send({});
  request.end(function (response) {
    if (response.error) {
      throw new Error(response.error);
    }
    res.json(response.body || {});
  });
})

// List all task of given process definition key
app.get('/task', (req, res) => {
  const request = unirest.get(camundaUrl + "/task");
  request.query(req.query);
  request.end(function (response) {
    if (response.error) throw new Error(response.error);
    res.json(response.body || {});
  });
})

// Claim task
app.post('/task/:taskId/:action', (req, res) => {
  console.log(req.body)
  const request = unirest.post(`${camundaUrl}/task/${req.params.taskId}/${req.params.action}`)
                         .header('Content-Type', 'application/json')
                         .send(req.body);
  request.end(function (response) {
    console.log(`response.error: ${response.error}`)
    if (response.error) throw new Error(response.error);
    res.json(response.body || {});
  });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
