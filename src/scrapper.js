const cheerio = require('cheerio');
const got = require('got');

async function getMapStat(lastMapStatId) {

    const response = await got('https://www.hltv.org/stats/teams/matches/9215/MIBR');

    const $ = cheerio.load(response.body);

    var mapStatElement = null;

    $('.stats-table > tbody > tr').each(function (index, element) {

        var elem = $(element);
        var statUrl = elem.children('.time').children('a').attr('href');
    
        const regex = /mapstatsid\/(\d+)/gm;
        var match = regex.exec(statUrl);
    
        if (Number(match[1]) != lastMapStatId) {
            mapStatElement = elem;
        } else {
            return false;
        }

    });

    const result = {
        hasResult: false,
        opposingTeam: null,
        map: null,
        MIBRScore: null,
        opposingTeamScore: null
    };

    if (mapStatElement != null) {

        result.hasResult = true;

        result.opposingTeam = mapStatElement.children('td:nth-child(4)').text();

        result.map = mapStatElement.children('.statsMapPlayed').text();

        var totalScore = mapStatElement.find('.statsDetail').text().replace(/\s/g,'');

        var scores = extractScores(totalScore);

        result.MIBRScore =  Number(scores[1]);
        result.opposingTeamScore = Number(scores[2]);
    }

    return result;

}

async function getMatchStat(lastMatchStatId) {

    const result = {
        hasResult: false,
        opposingTeam: null,
        MIBRScore: null,
        opposingTeamScore: null
    };

    return result;
}

function extractScores(totalScore) {
    var regexp = /(\d+)-(\d+)/gm;
    return regexp.exec(totalScore);
}

module.exports = {
    getMapStat: getMapStat,
    getMatchStat: getMatchStat
}