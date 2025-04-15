const express = require('express'); 
const app = express();
const path = require('path'); //Segundo a documentação do node e express, podemos usar esse módulo para entrar no caminho de uma pasta
//com base no nome do arquivo ou da pasta, o que é ótimo para criar apps cross-plataform, já que o diretório funciona diferente do linux/macos para o windows
const { default: axios } = require('axios'); //usa para fazer requisições
const port = 3000;
const steamAPIkey = (CHAVE);
const tokenAcesso = (TOKEN_ACESSO);
app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, '/index.html'));
    //res.send('outro teste')
});

app.get('/jogos', async (req,res)=>{
    try {
        const steamUrl = `https://api.steampowered.com/IStoreService/GetAppList/v1/?key=${steamAPIkey}&access_token=${tokenAcesso}`;
        const jogosInfo = await axios.get(steamUrl);
        res.json(jogosInfo.data); 
    } catch (error) {
        res.status(404).json({error: 'Nada encontrado'});
        res.status(500).json({error: 'nhecas'});
    }
});

app.get('/promocao', async(req,res)=>{
    try {
        const promocoesUrl = `
            https://store.steampowered.com/api/featuredcategories?cc=br&l=pt    
        `;
            const promocoes = await axios.get(promocoesUrl);
            res.json(promocoes.data)
    } catch (error) {
        res.status(500).json({error: 'não foi possível buscar as promoções'})
    }
})

/*app.listen(port, ()=>{
    console.log(`App sendo executado na porta: ${port}`);
})*/

app.listen(port);
console.log(`App sendo executado na porta: ${port}`);