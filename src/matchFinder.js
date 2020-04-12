const scrapper = require('./scrapper.js');

const lastMapStatId = 101270;
const lastMatchStatId = 2340525;

let consecutiveWins = 0;
let consecutiveLosses = 0;

async function findNewMap() {
    const mapStat = await scrapper.getMapStat(lastMapStatId);

    return mapStat;
}

async function findNewMatch() {
    const matchStat = await scrapper.getMatchStat(lastMatchStatId);

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