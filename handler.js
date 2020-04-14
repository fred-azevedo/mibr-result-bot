'use strict';

const matchFinder = require('./src/matchFinder.js');
const twitterService = require('./src/twitterService');

module.exports.start = async event => {

  const mapStat = await matchFinder.findNewMap();

  if (mapStat.hasResult) {
    await twitterService.postMapStat(mapStat);
  }

  const matchStat = await matchFinder.findNewMatch();

  if (matchStat.hasResult) {
    await twitterService.postMatchStat(matchStat);
  }

  return {statusCode: 200};

};
