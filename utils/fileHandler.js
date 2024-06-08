const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../data');

exports.readJSONFile = (fileName) => {
  const filePath = path.join(dataDir, fileName);
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
};

exports.writeJSONFile = (fileName, data) => {
  const filePath = path.join(dataDir, fileName);
  const jsonData = JSON.stringify(data, null, 2);
  fs.writeFileSync(filePath, jsonData, 'utf8');
};