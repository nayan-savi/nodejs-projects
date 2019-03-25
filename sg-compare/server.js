const path = require('path');
const fs = require('fs');
const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser')
const app = express();
const router = express.Router();
var xlsx = require('xlsx')

const DIR = './uploads';

let storage = multer.diskStorage({
     destination: (req, file, cb) => {
        cb(null, DIR);
     },
    filename: (req, file, cb) => {
      cb(null, file.fieldname+ path.extname(file.originalname));
    }
});
// let storage = multer.memoryStorage({
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + '.' + path.extname(file.originalname));
//     }
// });
let upload = multer({ storage: storage });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', false);
    next();
});

app.get('/api', function (req, res) {
    res.end('file catcher example');
});

app.post('/api/upload', upload.single('fileupload'), function (req, res) {
    if (!req.file) {
        console.log("No file received");
        return res.send({
            success: false
        });
    } else {
        console.log('file received');
        let workbook = xlsx.readFile(DIR+"/"+req.file.filename)
        let sheet_name_list = workbook.SheetNames;
        var xlData = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
        console.log(xlData);
        console.log(Object.keys(xlData[0]))
        return res.send(xlData)
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
    console.log('Node.js server is running on port ' + PORT);
});