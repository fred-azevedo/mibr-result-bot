function postMapStat(mapStat) {
    console.log('Postando resultado de Mapa no Twitter...');
    console.log(mapStat);

    // A @mibr ganhou da Furia de 16-9 na Dust 2! :)
    // Já são 5 jogos seguidos sem perder na Dust2

    // A @mibr perdeu da Furia de 16-9 na Dust 2. :(
    // Não ganhamos na Dust 2 há 3 jogos seguidos.
}

function postMatchStat(matchStat) {
    console.log('Postando resultado de Partida no Twitter...');
    console.log(matchStat);

    //A @mibr venceu a partida contra a Furia por 2-0 pela Flashpoint 1. Estamos há X partidas seguidas sem perder.
    //A @mibr perdeu a partida contra a Furia por 2-0 pela Flashpoint 1. Estamos há X partidas seguidas sem vencer. Mas não vamos desistir!
}

module.exports = {
    postMapStat: postMapStat,
    postMatchStat: postMatchStat
}

