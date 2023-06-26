async function fetchServerData(server) {
    const url = `https://api.mcstatus.io/v2/status/java/${server}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(`Erro ao buscar dados do servidor ${server}:`, error);
        return null;
    }
}

async function fetchAllServerData(servers) {
    const serverData = [];
    for (const server of servers) {
        const data = await fetchServerData(server);
        let players = data.players ? data.players.online : 0
        let icon = data.icon ? data.icon : './imgs/png.png';
        let online = data.online ? '#00FF21' : '#FF0000';
        if (data) {
            serverData.push({
                name: server,
                players: players,
                online: online,
                icon: icon
            });
        }
    }
    return serverData;
}

function showRanking(serverData) {
    const rankingDiv = document.querySelector('.ranking');
    rankingDiv.innerHTML = '';

    for (let i = 0; i < serverData.length; i++) {
        const server = serverData[i];

        const serverDiv = document.createElement('p');
        serverDiv.innerHTML = `
        <span onclick="search('${server.name}')">
          <n>${i + 1}</n>
          <icons><img width="64" height="64" alt="Imagem do servidor" src="${server.icon}"></icons>
          <nome>${server.name}</nome>
          <on>${server.players.toLocaleString()} online <onoff style="background-color: ${server.online};"></onoff></on>
        </span>
      `;

        rankingDiv.appendChild(serverDiv);
    }
}

async function updateRanking() {
    const servers = [
        "aspectmania.com.br",
        "redestone.com"
    ];

    const serverData = await fetchAllServerData(servers);
    showRanking(serverData);
}
updateRanking();