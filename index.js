const express = require('express'); 
const app = express();
const path = require('path'); //Segundo a documentação do node e express, podemos usar esse módulo para entrar no caminho de uma pasta
//com base no nome do arquivo ou da pasta, o que é ótimo para criar apps cross-plataform, já que o diretório funciona diferente do linux/macos para o windows
const { default: axios } = require('axios'); //usa para fazer requisições
const port = 3000;
// const steamAPIkey = ('CHAVE');
// const tokenAcesso = ('TOKEN_ACESSO');
app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/promocao', async(req,res)=>{
    try {
        const promocoesUrl = `
            https://store.steampowered.com/api/featuredcategories?cc=br&l=pt    
        `;
            const { data } = await axios.get(promocoesUrl);

            const promocoes = data.specials.items.map(jogo => ({
                id: jogo.id,
                nome: jogo.name,
                desconto: jogo.discount_percent + '%',
                preco: 'R$'+(jogo.original_price/100).toFixed(2),
                preco_final: 'R$' + (jogo.final_price/100).toFixed(2),
                imagem: jogo.header_image
            }));

            const jogosFuturos = data.coming_soon.items.map(
                jogoFuturo => ({
                    id: jogoFuturo.id,
                    nome: jogoFuturo.name,  
                    imagem: jogoFuturo.header_image     
                }));

            const lancamentos = data.new_releases.items.map(lancamentos=>({
                id: lancamentos.id,
                nome: lancamentos.name,
                imagem: lancamentos.header_image,
                Preco_atual: 'R$' + (lancamentos.final_price/100).toFixed(2),
                Preco_original: 'R$' + (lancamentos.original_price/100).toFixed(2)
            }));

            const ofertas = [];
            for(i = 0; i<6; i++){
                ofertas.push(...data[i].items.map(ofertas=>({
                    duracao_da_oferta: ofertas.body,
                    url: ofertas.url,
                    imagem: ofertas.header_image
                })));
            }

            res.json({
                ofertasSemanaisDiarias: ofertas, //Aqui inclue as ofertas semanais e diárias, geralmente vem bundle ou só jogo aleatório
                promocoesEspeciais: promocoes, //Inclue ofertas especiais, geralmente vem jogos AAA caro.
                lancamentos: lancamentos, //Jogos lançados recentemente e com oferta bacana
                jogosalancar: jogosFuturos //Jogos que ainda vão lançar
            });
    } catch (error) {
        res.status(500).json({error: 'não foi possível buscar as promoções'})
    }
})


app.listen(port);
console.log(`App sendo executado na porta: ${port}`);