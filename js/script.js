const api = 'https://api.mcstatus.io/v2/status/java/';
const dominios = [
  'aspectmania.com.br',
  'redestone.com',
  'hylex.net',
  'mush.com.br',
  'jogar.pixelmonbrasil.com.br',
  'redefantasy.com',
  'redevaison.tk',
  'redeaqua.com',
  'redevonix.com',
  'redescrold.com',
  'redehell.com',
  'redegarnix.com',
  'jogar.heavenlymc.com.br',
  'rede-feather.net',
  'redescreen.com',
];
const urls = dominios.map(dominio => `${api}${dominio}`);

const ranking = document.querySelector('.ranking');

async function getServerData(urls) {
    try {
        const responses = await Promise.all(urls.map(url => fetch(url)));
        const data = await Promise.all(responses.map(res => res.json()));
        return data.map((item, i) => {
            let players = item.players ? item.players.online : 0;
            let icon = item.icon ? item.icon : './imgs/png.png';
            let online = item.online ? './imgs/online.png' : '/imgs/offiline.png';
            return {
                id: i,
                name: item.host,
                players: players,
                icon: icon,
                online: online,
            }
        });
    } catch (error) {
        console.log(`Erro ao obter informações da API: ${error}`);
    }
}

function updateRanking(serverData) {
    serverData.sort((a, b) => (b.players) - (a.players));
    let content = serverData.map((item, i) =>
        `<p><n>${i + 1}</n> <img width="64" height="64" alt="Imagem do servidor" src="${item.icon}"> ${item.name}
         (${item.players.toLocaleString()} jogadores. online: <img width="16" height="16" src="${item.online}">) </p>
         `).join('');
    ranking.innerHTML = content;
}

getServerData(urls).then(updateRanking);

setInterval(() => {
    getServerData(urls).then(updateRanking);
}, 60000);

let count = 60;
setInterval(() => {
    count--;
    document.querySelector('.time').innerHTML = count;
    if (count === 0) {
        count = 60;
    }
}, 1000);