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
    'redegarnix.com',
    'jogar.heavenlymc.com.br',
    'rede-feather.net',
    'redescreen.com',
    'rededark.com',
    'jogar.rederevo.com',
    'armamc.com',
    'pokebrasil.net',
    'redwins.com.br',
    'jogar.mc-mastercraft.net',
    'fallzpixelmon.com',
    'stardix.com',
    'jogar.rede-way.com',
    'jogar.futurium.com.br',
    'jogar.gg',
    'pixelmonline.com',
    'jogar.craftit.com.br',
    'mc.sparklypower.net',
    'gsgserver.com.br',
    'jogar.absolutgg.com.br',
    'jogar.austv.net',
    'jogar.celestialpixelmon.com',
    'jogar.redesgp.com',
    'mc.instamc.com.br',
    'elgae.net',
    'chronos.craftlandia.com.br',
    'potpvp.com.br',
    'drazyh.com',
    'redeforce.net',
    'flamemc.com.br',
    'bravemc.com.br',
    'redesnow.com.br',
    'arcanth.net',
    'veanty.com',
];

const api = 'https://api.mcstatus.io/v2/status/java/';

const urls = dominios.map(dominio => `${api}${dominio}`);

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
            }
        });
    } catch (error) {
        console.log(`Erro ao obter informações da API: ${error}`);
    }
}

function updateRanking(serverData) {
    let total = 0;
    serverData.sort((a, b) => (b.players) - (a.players));
    let content = serverData.map((item, i) => {
        total += item.players;
        return `<p><n>${i + 1}</n> <icons><img width="64" height="64" alt="Imagem do servidor" src="${item.icon}"></icons>
           <nome>${item.name}</nome>
           <on>${item.players.toLocaleString()} online <onoff style="background-color: ${item.online};"></onoff></on></p>
           `;
    }).join('');
    ranking.innerHTML = `<h1>Ranking</h1><h2>Total de jogadores online: <tot>${total.toLocaleString()}</tot></h2>` + content;
    console.log(`Total de jogadores online: ${total.toLocaleString()}`);
}


getServerData(urls).then(updateRanking);

setInterval(() => {
    getServerData(urls).then(updateRanking);
}, 60000);
