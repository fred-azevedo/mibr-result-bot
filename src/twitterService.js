const twitterClient = require('./twitterClient');

async function postMapStat(map) {

    let text = '';

    if (map.MIBRScore > map.opposingTeamScore) {

        text = 'A @mibr ganhou da ' + map.opposingTeam + ' de ' + map.MIBRScore + '-' + map.opposingTeamScore + ' na ' + map.map + '! :)';

    } else if (map.MIBRScore < map.opposingTeamScore) {

        text = 'A @mibr perdeu da ' + map.opposingTeam + ' de ' + map.opposingTeamScore + '-' + map.MIBRScore + ' na ' + map.map + '. :(';

    } else {
        text = 'A @mibr empatou com a ' + map.opposingTeam + '. ' + map.opposingTeamScore + '-' + map.MIBRScore + ' na ' + map.map + '. :|';
    }

    text += '\n\n#SomosMIBR';

    await tweet(text);

    // A @mibr ganhou da Furia de 16-9 na Dust 2! :)
    // Já são 5 jogos seguidos sem perder na Dust2

    // A @mibr perdeu da Furia de 16-9 na Dust 2. :(
    // Não ganhamos na Dust 2 há 3 jogos seguidos.
}

async function postMatchStat(match) {

    let text = '';

    if (match.MIBRScore > match.opposingTeamScore) {

        text = 'A @mibr venceu a partida contra a ' + match.opposingTeam + ' por ' + match.MIBRScore + '-' + match.opposingTeamScore + '.';

        if (match.opposingTeamScore === 0) {
            text += ' Lindo placar!'
        }

        if (match.consecutiveWins === 1) {
            text += ' Estamos há ' + match.consecutiveWins + ' partida sem perder.';
        } else {
            text += ' Estamos há ' + match.consecutiveWins + ' partidas seguidas sem perder!';
        }

    } else if (match.MIBRScore < match.opposingTeamScore) {
        
        text = 'A @mibr perdeu a partida contra a ' + match.opposingTeam + ' por ' + match.opposingTeamScore + '-' + match.MIBRScore + '.';

        if (match.consecutiveLosses === 1) {
            text += ' Estamos há ' + match.consecutiveLosses + ' partida sem vencer.';
        } else {
            text += ' Estamos há ' + match.consecutiveLosses + ' partidas seguidas sem vencer. Mas não vamos desistir!';
        }

    } else {
        text = 'A @mibr empatou a partida contra a ' + match.opposingTeam + '. Ficou ' + match.opposingTeamScore + '-' + match.MIBRScore + '. Ninguém ganhou, ninguém perdeu. Seguimos em frente!';
    }

    text += '\n\n#SomosMIBR';

    await tweet(text);

    //A @mibr venceu a partida contra a Furia por 2-0 pela Flashpoint 1. Estamos há X partidas seguidas sem perder.
    //A @mibr perdeu a partida contra a Furia por 2-0 pela Flashpoint 1. Estamos há X partidas seguidas sem vencer. Mas não vamos desistir!
}

async function tweet(status) {
    if (process.env.DEBUG_ONLY === true) {
        console.log(status);
    } else {
        await twitterClient.tweet(status);
    }
}

module.exports = {
    postMapStat: postMapStat,
    postMatchStat: postMatchStat
}

