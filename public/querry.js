window.onload = function(){
    document.addEventListener('DOMContentLoaded', function(){})
}

async function fetchNovidades() {
    try {
        const response = await fetch('/promocao');
        const data = await response.json();
        fetchOfertas(data.ofertasSemanaisDiarias);
        fetchPromocoes(data.promocoesEspeciais);
        fetchLancamentos(data.lancamentos);
        fetchJogosLancar(data.jogosalancar);
    } catch (error) {
        alert(';( Sem promoções ou não foi possível carregar as promoções');
    }
}

function fetchOfertas(ofertas){

}

function fetchPromocoes(promocoes){

}

function fetchLancamentos(lancamentos){

}

function fetchJogosLancar(jogosFuturos){
    
}