const fse = require('fs-extra');

const MAX_NUMS = 20;
const JSON_PATH = './record-list.json';

function setData (data = {}) {
  fse.ensureFileSync(JSON_PATH);
  let records = fse.readJSONSync(JSON_PATH, { throws: false });
  Array.isArray(records) ? true : records = [];
  if (records.length >= MAX_NUMS) records.shift();
  records.push({
    time: new Date().toLocaleString(),
    data
  });
  fse.writeJSON(JSON_PATH, records);
}

function getData () {
  return fse.readJSONSync(JSON_PATH);
}

module.exports = { setData, getData };
