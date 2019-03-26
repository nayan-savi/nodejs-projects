const xlsx = require('xlsx')

const DIR = './uploads';
let sourceData = [];
let destinationData = [];
const getSrcDestDropdownData = (request) => {
    let type = request.file.filename;
    let workbook = xlsx.readFile(`${DIR}/${type}`);
    let sheet_name_list = workbook.SheetNames;
    var result = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
    if (type == "source.xlsx") {
        sourceData = result;
    } else {
        destinationData = result;
    }
    return result[0];
}

const getComputeReport = (rules) => {
    let output = [];
    rules.forEach(rule => {
        console.log(rule.srcColumn + "==>" + rule.destColumn);
        if (rule.srcColumn != "" && rule.destColumn != "") {
            sourceData.forEach(src => {
                let cmp = src[rule.srcColumn];
                destinationData.forEach(dest => {
                    if ("=" == rule.action && cmp == dest[rule.destColumn]) {
                        let array = [];
                        array.push(src);
                        array.push(dest);
                        output.push(array);
                    }
                });
            });
        }
    });
    //sourceData.slice(0, sourceData.length);
    //destinationData.slice(0, destinationData.length);
    return output;
}

module.exports = {
    getSrcDestDropdownData,
    DIR,
    getComputeReport
}