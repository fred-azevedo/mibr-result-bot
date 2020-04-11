'use strict';

const parser = require('./src/parser.js');

module.exports.start = async event => {

  console.log('started');

  var mapStat = await parser.getMapStat();

  var matchStat = await parser.getMatchStat();

  return {statusCode: 200};

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
