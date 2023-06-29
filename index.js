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
        let players = data.players ? data.players.online : 0;
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
    serverData.sort((a, b) => b.players - a.players);
    serverData.splice(10); // Manter apenas os 10 primeiros servidores
    return serverData;
}

function showRanking(serverData) {
    const rankingDiv = document.querySelector('.ranking');
    rankingDiv.innerHTML = '';

    for (let i = 0; i < 10; i++) { // Iterar apenas pelos 10 primeiros servidores
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
        "redestone.com",
        "hylex.net",
        "mush.com.br",
        "jogar.pixelmonbrasil.com.br",
        "redefantasy.com",
        "redevaison.tk",
        "redeaqua.com",
        "redevonix.com",
        "redegarnix.com",
        "jogar.heavenlymc.com.br",
        "rede-feather.net",
        "redescreen.com",
        "rededark.com",
        "jogar.rederevo.com",
        "armamc.com",
        "pokebrasil.net",
        "redwins.com.br",
        "jogar.mc-mastercraft.net",
        "fallzpixelmon.com",
        "stardix.com",
        "jogar.rede-way.com",
        "jogar.futurium.com.br",
        "jogar.gg",
        "pixelmonline.com",
        "jogar.craftit.com.br",
        "mc.sparklypower.net",
        "gsgserver.com.br",
        "jogar.absolutgg.com.br",
        "jogar.austv.net",
        "jogar.celestialpixelmon.com",
        "jogar.redesgp.com",
        "mc.instamc.com.br",
        "elgae.net",
        "chronos.craftlandia.com.br",
        "potpvp.com.br",
        "drazyh.com",
        "redeforce.net",
        "flamemc.com.br",
        "bravemc.com.br",
        "redesnow.com.br",
        "arcanth.net",
        "veanty.com",
        "jogarhappy.com",
        "redestory.com",
        "spectremc.com.br",
        "redehawk.com"
    ];
    const serverData = await fetchAllServerData(servers);
    showRanking(serverData);
}

updateRanking();