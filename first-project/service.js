//var fs = require('fs');
let students = require('./student_data.json');
//let students = JSON.parse(fs.readFileSync('student_data.json', 'utf-8'))

var getNameById = (request, response, next) => {
    let id = request.params.id
    students.forEach(element => {
        if(element.id == id) {
            response.status(200).json(element)
        }
    });
    // req.get('/name', (request, response, next) =>{
    //     response.status(200).json("Nayan")
    // });
}

module.exports = {
    getNameById
} 