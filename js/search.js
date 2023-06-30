const modal = document.querySelector('.modal')
const fade = document.querySelector('.fade')

function search(serverName) {
    modal.classList.remove('esconder')
    fade.classList.remove('esconder')
    fetch(`https://api.mcstatus.io/v2/status/java/${serverName}`)
        .then(res => res.json())
        .then(data => {
            let jogadores = `${data.players.online} / ${data.players.max}`
            let icon = data.icon
            let name = data.host
            resposta.innerHTML = `
        <img src="${icon}">
        <name>${name}</name>
        <players>${jogadores}</players>
        `
        }).catch(e => {
            resposta.innerHTML = "Não encontrado"
        })
}

document.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        document.getElementById("procurar").click();
    }
})

function validateInputs() {
    var inputs = document.querySelectorAll('.input-1');
    var inputsCompleted = true;
    inputs.forEach(function (input) {
        if (!input.value) {
            inputsCompleted = false;
        }
    });
    return inputsCompleted;
}

fade.classList.add('esconder')
modal.classList.add('esconder')

function procurar() {
    if (validateInputs()) {
        modal.classList.remove('esconder')
        fade.classList.remove('esconder')
        let input = document.querySelector('.input-1')
        fetch(`https://api.mcstatus.io/v2/status/java/${input.value}`)
            .then(res => res.json())
            .then(data => {
                let jogadores = `${data.players.online} / ${data.players.max}`
                let icon = data.icon
                let name = data.host
                resposta.innerHTML = `
                <img src="${icon}">
                <name>${name}</name>
                <players>${jogadores}</players>
                `
                modal.querySelector('.loading').classList.add('esconder')
            }).catch(e => {
                resposta.innerHTML = `<img src="./imgs/compass.png"><p>Nada encontrado...</p>`
                modal.querySelector('.loading').classList.add('esconder')
            })

    } else {
        alert('Nada para procurar.')
    }
}


function close_modal() {
    modal.classList.add('esconder')
    fade.classList.add('esconder')
}

fade.addEventListener('click', close_modal)