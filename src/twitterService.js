function postMapStat(mapStat) {
    console.log('Postando resultado de Mapa no Twitter...');
    console.log(mapStat);


    // A @mibr ganhou da Furia de 16-9 na Dust 2! :)
    // Já são 5 jogos seguidos sem perder na Dust2

    // A @mibr perdeu da Furia de 16-9 na Dust 2. :(
    // Não ganhamos na Dust 2 há 3 jogos seguidos.
}

function postMatchStat(match) {
    console.log('Postando resultado de Partida no Twitter...');

    let text = '';

    if (match.MIBRScore > match.opposingTeamScore) {

        text = 'A @mibr venceu a partida contra a ' + match.opposingTeam + ' por ' + match.MIBRScore + '-' + match.opposingTeamScore + '.';

        if (match.opposingTeamScore === 0) {
            text += ' Lindo placar!'
        }

        if (match.consecutiveWins === 1) {
            text += ' Estamos há ' + match.consecutiveWins + ' partida sem perder';
        } else {
            text += ' Estamos há ' + match.consecutiveWins + ' partidas seguidas sem perder';
        }

    } else {
        text = 'A @mibr perdeu a partida contra a ' + match.opposingTeam + ' por ' + match.opposingTeamScore + '-' + match.MIBRScore + '.';

        if (match.consecutiveLosses === 1) {
            text += ' Estamos há ' + match.consecutiveLosses + ' partida sem vencer.';
        } else {
            text += ' Estamos há ' + match.consecutiveLosses + ' partidas seguidas sem vencer. Mas não vamos desistir!';
        }

    }

    text += '\n\n#SomosMIBR';

    console.log(text);

    //A @mibr venceu a partida contra a Furia por 2-0 pela Flashpoint 1. Estamos há X partidas seguidas sem perder.
    //A @mibr perdeu a partida contra a Furia por 2-0 pela Flashpoint 1. Estamos há X partidas seguidas sem vencer. Mas não vamos desistir!
}

module.exports = {
    postMapStat: postMapStat,
    postMatchStat: postMatchStat
}

