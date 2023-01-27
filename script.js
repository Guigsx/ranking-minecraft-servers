async function getServerData(urls) {
    try {
        const responses = await Promise.all(urls.map(url => fetch(url)));
        const data = await Promise.all(responses.map(res => res.json()));
        return data.map((item, i) => ({
            id: i,
            name: item.hostname,
            players: item.players.online
        }));
    } catch (error) {
        console.log(`Erro ao obter informações da API: ${error}`);
    }
}
getServerData([
    'https://api.mcsrvstat.us/2/aspectmania.com.br',
    'https://api.mcsrvstat.us/2/hypixel.net',
    'https://api.mcsrvstat.us/2/redestone.com',
    'https://api.mcsrvstat.us/2/hylex.net',
]).then(serverData => {
    serverData.sort((a, b) => b.players - a.players);

    let content = serverData.map((item, i) =>
        `<p>${i + 1}. ${item.name} (${item.players} players) </p>`).join('');

    document.querySelector('.ranking').innerHTML = content;
});

setInterval(() => {
    getServerData([
        'https://api.mcsrvstat.us/2/aspectmania.com.br',
        'https://api.mcsrvstat.us/2/hypixel.net',
        'https://api.mcsrvstat.us/2/redestone.com',
        'https://api.mcsrvstat.us/2/hylex.net',
    ]).then(serverData => {
        serverData.sort((a, b) => b.players - a.players);

        let content = serverData.map((item, i) =>
            `<p>${i + 1}. ${item.name} (${item.players} players) </p>`).join('');
        document.querySelector('.ranking').innerHTML = content;
    });
}, 10000);

let count = 10
setInterval(() => {
    count--;
    document.querySelector('.time').innerHTML = count;
    if (count === 0) {
        count = 10;
    }
}, 1000);