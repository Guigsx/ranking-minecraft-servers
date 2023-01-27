let api = 'https://api.mcstatus.io/v2/status/java/';
const urls = [
    `${api}aspectmania.com.br`,
    `${api}redestone.com`,
    `${api}hylex.net`,
    `${api}mush.com.br`,
    `${api}jogar.pixelmonbrasil.com.br`,
    `${api}redefantasy.com`,
]
async function getServerData(urls) {
    try {
        const responses = await Promise.all(urls.map(url => fetch(url)));
        const data = await Promise.all(responses.map(res => res.json()));
        return data.map((item, i) => ({
            id: i,
            name: item.host,
            players: item.players.online,
            icon: item.icon,
        }));
    } catch (error) {
        console.log(`Erro ao obter informações da API: ${error}`);
    }
}
getServerData(urls).then(serverData => {
    serverData.sort((a, b) => b.players - a.players);

    let content = serverData.map((item, i) =>
        `<p><img src="${item.icon}"> ${i + 1}. ${item.name} (${item.players.toLocaleString()} players) </p>`).join('');

    document.querySelector('.ranking').innerHTML = content;
});

setInterval(() => {
    getServerData(urls).then(serverData => {
        serverData.sort((a, b) => b.players - a.players);

        let content = serverData.map((item, i) =>
            `<p><img src="${item.icon}"> ${i + 1}. ${item.name} (${item.players.toLocaleString()} players) </p>`).join('');
        document.querySelector('.ranking').innerHTML = content;
    });
}, 60000);

let count = 60
setInterval(() => {
    count--;
    document.querySelector('.time').innerHTML = count;
    if (count === 0) {
        count = 60;
    }
}, 1000);