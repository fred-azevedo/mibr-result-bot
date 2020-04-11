const cheerio = require('cheerio');
const got = require('got');

const lastStatId = 101270;

async function getMapStat() {
    
    console.log('Gettig map stat');

    const response = await got('https://www.hltv.org/stats/teams/matches/9215/MIBR');

    const $ = cheerio.load(response.body);

    var mapStatElement = null;

    $('.stats-table > tbody > tr').each(function (index, element) {

        var elem = $(element);
        var statUrl = elem.children('.time').children('a').attr('href');
    
        const regex = /mapstatsid\/(\d+)/gm;
        var match = regex.exec(statUrl);
    
        if (Number(match[1]) != lastStatId) {
            mapStatElement = elem;
        } else {
            return false;
        }

    });

    if (mapStatElement != null) {

        var timeAdversario = mapStatElement.children('td:nth-child(4)').text();

        var mapa = mapStatElement.children('.statsMapPlayed').text();

        var placarTotal = mapStatElement.find('.statsDetail').text().replace(/\s/g,'');

        var myRegexp = /(\d+)-(\d+)/gm;
        var match = myRegexp.exec(placarTotal);

        var placarMIBR =  Number(match[1]);
        var placarOutroTime = Number(match[2]);

        if (placarMIBR > placarOutroTime) {

            console.log('A @mibr ganhou da ' + timeAdversario + ' de ' + placarMIBR + '-' + placarOutroTime + ' na ' + mapa + '! :) \n\n#SomosMIBR');
            
        } else {
            console.log('A @mibr perdeu pra ' + timeAdversario + ' de ' + placarMIBR + '-' + placarOutroTime + ' na ' + mapa + ' :( \n\n#SomosMIBR');
            
        } 

        // A @mibr ganhou da Furia de 16-9 na Dust 2! :)
        // Já são 5 jogos seguidos sem perder na Dust2

        // A @mibr perdeu da Furia de 16-9 na Dust 2. :(
        // Não ganhamos na Dust 2 há 3 jogos seguidos.

        console.log(' -----------------------------------------')

    }

}

async function getMatchStat() {
    console.log('Gettig match stat');
}

module.exports = {
    getMapStat: getMapStat,
    getMatchStat: getMatchStat
}