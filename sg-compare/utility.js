const xlsx = require('xlsx')

const DIR = './uploads';
const getExcelData = (request) => {
    let workbook = xlsx.readFile(DIR + "/" + request.file.filename)
    let sheet_name_list = workbook.SheetNames;
    var result = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
    return result[0];
}

module.exports = {
    getExcelData,
    DIR
}