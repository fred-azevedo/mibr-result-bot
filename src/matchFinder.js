const scrapper = require('./scrapper.js');
const AWS = require('aws-sdk');

let consecutiveWins = 2;
let consecutiveLosses = 0;

const ddb = new AWS.DynamoDB.DocumentClient();
let params = {TableName: 'mibr-bot-parameters', Key:{ "parameter": 1 }};
const data = await ddb.get(params).promise();

async function findNewMap() {
    const mapStat = await scrapper.getMapStat(data.Item.lastMapStatId);

    return mapStat;
}

async function findNewMatch() {
    const matchStat = await scrapper.getMatchStat(data.Item.lastMatchStatId);

    let match = { ... matchStat };

    if (matchStat.MIBRScore > matchStat.opposingTeamScore) {

        consecutiveWins += 1;
        consecutiveLosses = 0;

    } else {

        consecutiveWins = 0;
        consecutiveLosses += 1;
    }

    match.consecutiveWins = consecutiveWins;
    match.consecutiveLosses = consecutiveLosses;

    return match;
}

module.exports = {
    findNewMap: findNewMap,
    findNewMatch: findNewMatch
}