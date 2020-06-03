const scrapper = require('./scrapper.js');
const AWS = require('aws-sdk');

const ddb = new AWS.DynamoDB.DocumentClient({params: {TableName: process.env.DYNAMODB_TABLE}});
let params = {Key:{ "parameter": 1 }};

async function findNewMap() {

    const data = await ddb.get(params).promise();

    const mapStat = await scrapper.getMapStat(data.Item.lastMapStatId);

    if (mapStat.hasResult) {
        data.Item.lastMapStatId = mapStat.mapStatId;
        await ddb.put(data).promise();
    }

    return mapStat;
}

async function findNewMatch() {

    const data = await ddb.get(params).promise();

    const matchStat = await scrapper.getMatchStat(data.Item.lastMatchStatId);

    let match = { ... matchStat };

    if (match.hasResult) {
        
        if (match.MIBRScore > match.opposingTeamScore) {

            data.Item.consecutiveWins += 1;
            data.Item.consecutiveLosses = 0;
    
        } else if (match.MIBRScore < match.opposingTeamScore) {
    
            data.Item.consecutiveWins = 0;
            data.Item.consecutiveLosses += 1;
        } else {
            
            data.Item.consecutiveWins += 1;
            data.Item.consecutiveLosses += 1;
        }

        data.Item.lastMatchStatId = match.matchStatId;

        await ddb.put(data).promise();

        match.consecutiveWins = data.Item.consecutiveWins;
        match.consecutiveLosses = data.Item.consecutiveLosses;
    }

    return match;
}

module.exports = {
    findNewMap: findNewMap,
    findNewMatch: findNewMatch
}