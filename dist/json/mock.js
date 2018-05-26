var homeData = require('./home.json');
var list1 = require('./recommend1.json');
var list2 = require('./recommend2.json');
var list3 = require('./recommend3.json');
var seakeyData = require('./searchKey.json');
var seaData = require('./search.json');
var everyData = require('./352876.json');
var read1 = require('./reader/data1.json');
var read2 = require('./reader/data2.json');
var read3 = require('./reader/data3.json');
var read4 = require('./reader/data4.json');
var sectionData = require('./chapter-list.json');
var obj = {
    "/book/home": homeData,
    "/book/list?num=1&limit=10": list1,
    "/book/list?num=2&limit=10": list2,
    "/book/list?num=3&limit=10": list3,
    "/book/searchkey": seakeyData,
    "/book/search": seaData,
    "/book/detail?id=352876": everyData,
    '/book/data_read?id=1': read1,
    '/book/data_read?id=2': read2,
    '/book/data_read?id=3': read3,
    '/book/data_read?id=4': read4,
    '/book/section': sectionData
};
module.exports = function(url) {
    if (/\/book\/search\?/.test(url)) {
        url = "/book/search"
    }
    return obj[url];
};