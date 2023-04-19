const api = 'https://api.mcstatus.io/v2/status/java/';
const ranking = document.querySelector('.ranking');
const resposta = document.querySelector('.resposta');

async function getServerData(urls) {
    try {
        const responses = await Promise.all(urls.map(url => fetch(url)));
        const data = await Promise.all(responses.map(res => res.json()));
        return data.map((item, i) => {
            let players = item.players ? item.players.online : 0;
            let icon = item.icon ? item.icon : './imgs/png.png';
            let online = item.online ? '#00FF21' : '#FF0000';
            return {
                id: i,
                name: item.host,
                players: players,
                icon: icon,
                online: online,
            };
        });
    } catch (error) {
        console.log(`Erro ao obter informações da API: ${error}`);
    }
}

function updateRanking(serverData) {
    fetch('./js/dominios.json')
        .then(response => response.json())
        .then(dominios => {
            const urls = dominios.map(dominio => `${api}${dominio}`);

            let total = 0;
            serverData.sort((a, b) => (b.players) - (a.players));
            let top10 = serverData.slice(0, 10);
            let servidores = urls.length;
            let content = top10.map((item, i) => {
                total += item.players;
                return `<p onclick="search('${item.name}')"><n>${i + 1}</n> <icons><img width="64" height="64" alt="Imagem do servidor" src="${item.icon}"></icons>
      <nome>${item.name}</nome>
      <on>${item.players.toLocaleString()} online <onoff style="background-color: ${item.online};"></onoff></on></p>
      `;
            }).join('');
            ranking.innerHTML = `<h1>Ranking</h1><h2>Mais de <strong>${servidores}</strong> servidores monitorados.<br>Total de jogadores online: <tot style="color: rgb(0, 255, 13);"><strong>${total.toLocaleString()}</strong></tot></h2>` + content;
            console.log(`Total de jogadores online: ${total.toLocaleString()}`);
        });
}

// Carrega os domínios a partir do arquivo JSON
fetch('./js/dominios.json')
    .then(response => response.json())
    .then(dominios => {
        const urls = dominios.map(dominio => `${api}${dominio}`);
        console.log(urls.length);
        getServerData(urls).then(updateRanking);
        setInterval(() => {
            getServerData(urls).then(updateRanking);
        }, 60000);
    })
    .catch(error => {
        console.log(`Erro ao carregar domínios: ${error}`);
    });