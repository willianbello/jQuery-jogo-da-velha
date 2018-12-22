var rodada = 1;
var matriz = Array(3);
matriz['A'] = Array(3);
matriz['B'] = Array(3);
matriz['C'] = Array(3);

for (var j = 0; j < 3; j++) {
    matriz['A'][j] = 0;
}

for (var j = 0; j < 3; j++) {
    matriz['B'][j] = 0;
}

for (var j = 0; j < 3; j++) {
    matriz['C'][j] = 0;
}

$(document).ready(function() {

    $('#btn_iniciar_jogo').click(function() {

        var nome1 = $('#nomeJogador1').val();
        var nome2 = $('#nomeJogador2').val();

        /* Validação do Nome - Inicio */
        if (nome1 == "" || nome1 == null) {
            alert('Digite o nome do jogador 1');
            return false;
        }

        if (nome2 == "" || nome2 == null) {
            alert('Digite o nome do jogador 2');
            return false;
        }
        /* Validação do Nome - Fim */

        /*=============================================*/

        /* Colocando o nome dos jogadores nos respectivos lugares - Inicio */
        $('#jogador1').val(nome1);
        $('#jogador2').val(nome2);

        /* Colocando o nome dos jogadores nos respectivos lugares - Fim */

        /*=============================================*/

        /* Ocultando campo de Inicio e exibindo o jogo - Inicio*/

        $('#pagina_inicial').hide();
        $('#palco_jogo').show();

        /* Ocultando campo de inicio e exibindo o jogo - Fim*/

        /*=============================================*/

        /* Jogadas */
        $('.jogada').click(function() {
            var id_campo = this.id;

            //limpando configuração click para não ser usado novamente na mesma celula
            $('#' + id_campo).off();

            jogadas(id_campo);

        });

    });

    function jogadas(id_campo) {
        var icone = "";
        var ponto = 0;

        if ((rodada % 2) == 1) {
            icone = 'url("_imagens/marcacao_1.png")';
            ponto = 1;
        } else {
            icone = 'url("_imagens/marcacao_2.png")';
            ponto = -1;
        }

        rodada++;

        $('#' + id_campo).css('background-image', icone);

        var linha_coluna = id_campo.split('-');

        matriz[linha_coluna[0]][linha_coluna[1]] = ponto;

        console.log(matriz);

        verificaHorizontal();
        verificaVertical();
        verificaDiagonal1();
        verificaDiagonal2();
    }

    function verificaHorizontal() {
        var pontos = 0;

        for (var i = 0; i < 3; i++) {
            pontos += matriz['A'][i];
        }
        ganhador(pontos);

        pontos = 0;
        for (var i = 0; i < 3; i++) {
            pontos += matriz['B'][i];
        }
        ganhador(pontos);

        pontos = 0;
        for (var i = 0; i < 3; i++) {
            pontos += matriz['C'][i];
        }
        ganhador(pontos);
    }

    function verificaVertical() {

        for (var j = 0; j < 3; j++) {
            var pontos = 0;

            pontos += matriz['A'][j];
            pontos += matriz['B'][j];
            pontos += matriz['C'][j];

            ganhador(pontos);
        }
    }

    function verificaDiagonal1() {

        var pontos = 0;

        pontos += matriz['A'][0];
        pontos += matriz['B'][1];
        pontos += matriz['C'][2];

        ganhador(pontos);
    }

    function verificaDiagonal2() {

        var pontos = 0;

        pontos += matriz['C'][0];
        pontos += matriz['B'][1];
        pontos += matriz['A'][2];

        ganhador(pontos);

    }

    function ganhador(pontos) {

        if (pontos == 3) {
            var nome1 = $('#nomeJogador1').val();
            alert(nome1 + ' Venceu');

            //limpando configuração click para fim do jogo
            $('.jogada').off();

            return 0;
        } else if (pontos == -3) {
            var nome2 = $('#nomeJogador2').val();
            alert(nome2 + ' Venceu');

            //limpando configuração click para fim do jogo
            $('.jogada').off();

            return 0;
        }
    }
});