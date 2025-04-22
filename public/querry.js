window.onload = function(){
    fetchNovidades();
}

async function fetchNovidades() {
    try {
        const response = await fetch('/promocao');
        const data = await response.json();
        if(response.ok){
            fetchOfertas(data.ofertasSemanaisDiarias);
            fetchPromocoes(data.promocoesEspeciais);
            fetchLancamentos(data.lancamentos);
            fetchJogosLancar(data.jogosalancar);
        }else{
            console.log('sem resposta.');
        }
    } catch (error) {
        alert('Há seções sem promoções ou não foi possível carregar todas as promoções ;(');
    }
}

//Json como prefixo para lembrar que tem que passar o response.json (ou nesse caso o data) como argumento.
 function fetchOfertas(ofertasJson){
     const ofertas = document.getElementById('secOferta');

     ofertasJson.forEach(oferta => {
         const offerItem = document.createElement('div');
         offerItem.className = 'promoEspecial';
         offerItem.innerHTML = `
            <a href="${oferta.url}"> 
                <img src="${oferta.imagem}">
            </a>
         `;
         ofertas.appendChild(offerItem);
     });
 }

function fetchPromocoes(promocoesJson){
    const promocoes = document.getElementById('secPromo')
    promocoesJson.forEach(promo=>{
        const promoItem = document.createElement('div');
        promoItem.className = 'promoEspecial'
        promoItem.innerHTML = `
            <a href="https://store.steampowered.com/app/${promo.id}/" target="_blank">
                <img src="${promo.imagem}">
            </a>
            <h2>${promo.nome}</h2>
            <p id="precoOriginal">PREÇO: ${promo.preco}</p>
            <p>PREÇO: ${promo.preco_final}</p>
        `;
        promocoes.appendChild(promoItem)
    });
}

function fetchLancamentos(lancamentosJson){
    const lancamentos = document.getElementById('secLancamentos');
    lancamentosJson.forEach(lancamento=>{
        const lancamentoItem = document.createElement('div');
        lancamentoItem.className = 'promoEspecial'
        lancamentoItem.innerHTML = `
            <a href="https://store.steampowered.com/app/${lancamento.id}/" target="_blank">
                <img src="${lancamento.imagem}">
            </a>
            <h2>${lancamento.nome}</h2>
            <p id="precoOriginal">PREÇO: ${lancamento.Preco_original}</p>
            <p>PREÇO: ${lancamento.Preco_atual}</p>
        `;
        lancamentos.appendChild(lancamentoItem)
    })
}

function fetchJogosLancar(jogosFuturosJson){
    const jogosLancar = document.getElementById('secAlancar');
    jogosFuturosJson.forEach(alancar=>{
        const lancarItem = document.createElement('div')
        lancarItem.className = 'promoEspecial'
        lancarItem.innerHTML = `
            <a href="https://store.steampowered.com/app/${alancar.id}/" target="_blank">
                <img src="${alancar.imagem}">
            </a>
            <h2>${alancar.nome}</h2>
        `;
        jogosLancar.appendChild(lancarItem)
    });
}

