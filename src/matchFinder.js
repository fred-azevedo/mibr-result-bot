const scrapper = require('./scrapper.js');

const lastMapStatId = 101270;
const lastMatchStatId = 2340370;

async function findNewMap() {
    const mapStat = await scrapper.getMapStat(lastMapStatId);

    return mapStat;
}

async function findNewMatch() {
    const matchStat = await scrapper.getMatchStat(lastMatchStatId);

    return matchStat;
}

module.exports = {
    findNewMap: findNewMap,
    findNewMatch: findNewMatch
}