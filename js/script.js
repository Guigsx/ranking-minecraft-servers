let api = 'https://api.mcstatus.io/v2/status/java/';
const urls = [
    `${api}aspectmania.com.br`,
    `${api}redestone.com`,
    `${api}hylex.net`,
    `${api}mush.com.br`,
    `${api}jogar.pixelmonbrasil.com.br`,
    `${api}redefantasy.com`,
    `${api}redevaison.tk`,
    `${api}redeaqua.com`,
    `${api}redevonix.com`,
    `${api}redescrold.com`,
    `${api}redehell.com`,
    `${api}redegarnix.com`,
    `${api}jogar.heavenlymc.com.br`,
];
const ranking = document.querySelector('.ranking');

async function getServerData(urls) {
    try {
        const responses = await Promise.all(urls.map(url => fetch(url)));
        const data = await Promise.all(responses.map(res => res.json()));
        return data.map((item, i) => {
            let players = item.players ? item.players.online : 0;
            let icon = item.icon ? item.icon : './imgs/png.png';
            return {
                id: i,
                name: item.host,
                players: players,
                icon: icon,
                online: item.online,
            }
        });
    } catch (error) {
        console.log(`Erro ao obter informações da API: ${error}`);
    }
}

function updateRanking(serverData) {
    serverData.sort((a, b) => (b.players) - (a.players));
    let content = serverData.map((item, i) =>
        `<p><img alt="Imagem do servidor" src="${item.icon}"> ${i + 1}. ${item.name} (${item.players.toLocaleString()} jogadores. online: ${item.online}) </p>`).join('');
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