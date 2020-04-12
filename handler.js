'use strict';

const matchFinder = require('./src/matchFinder.js');
const twitterService = require('./src/twitterService');

module.exports.start = async event => {

  const mapStat = await matchFinder.findNewMap();

  if (mapStat.hasResult) {
    twitterService.postMapStat(mapStat);
  }

  const matchStat = await matchFinder.findNewMatch();

  if (matchStat.hasResult) {
    twitterService.postMatchStat(matchStat);
  }

  return {statusCode: 200};

};
