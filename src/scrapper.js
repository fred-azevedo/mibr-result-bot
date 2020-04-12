const cheerio = require('cheerio');
const got = require('got');

async function getMapStat(lastMapStatId) {

    const result = {
        hasResult: false,
        opposingTeam: null,
        map: null,
        MIBRScore: null,
        opposingTeamScore: null
    };

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

    if (mapStatElement != null) {

        result.hasResult = true;

        result.opposingTeam = mapStatElement.children('td:nth-child(4)').text();

        result.map = mapStatElement.children('.statsMapPlayed').text();

        var totalScore = mapStatElement.find('.statsDetail').text().replace(/\s/g,'');

        var scores = extractScores(totalScore);

        result.MIBRScore = Number(scores[1]);
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

    const response = await got('https://www.hltv.org/results?team=9215');
    const $ = cheerio.load(response.body);

    var matchStatElement = null;

    $('.results-holder > .results-all').find('.result-con').each(function (index, element) {

        var elem = $(element);
        var matchUrl = elem.children('a').attr('href');

        var regex = /\Smatches\/(\d+)/gm;
        var match = regex.exec(matchUrl);

        if (Number(match[1]) != lastMatchStatId) {
            matchStatElement = elem;
        } else {
            return false;
        }

    });
    
    if (matchStatElement != null) {

        result.hasResult = true;

        result.opposingTeam = matchStatElement.find('.team2 > div').text();

        var totalScore = matchStatElement.find('.result-score').text().replace(/\s/g,'');

        var scores = extractScores(totalScore);

        result.MIBRScore = Number(scores[1]);
        result.opposingTeamScore = Number(scores[2]);
    }

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