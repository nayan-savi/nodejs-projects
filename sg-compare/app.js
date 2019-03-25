var express = require('express');
var bodyParser = require('body-parser')
var service = require('./service')

app = express();
port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use('/name/:id', service.getNameById);
app.listen(port, () => {
    console.log(`App running on port ${port}`)
});
