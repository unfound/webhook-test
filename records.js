const fse = require('fs-extra');

const MAX_NUMS = 20;

function setData (data = {}) {
  let records = fse.readJSONSync('./record-list.json');
  if (records.length >= MAX_NUMS) records.shift();
  records.push({
    time: new Date().toLocaleString(),
    data
  });
  console.log('setData: ', records)
  fse.writeJSON('./record-list.json', records);
}

function getData () {
  return fse.readJSONSync('./record-list.json');
}

module.exports = { setData, getData };
