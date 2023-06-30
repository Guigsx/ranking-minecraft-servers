
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