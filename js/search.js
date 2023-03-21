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

function procurar() {
    if (validateInputs()) {
        ranking.classList.add('esconder')
        voltar.classList.remove('esconder')
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
            }).catch(e => {
                resposta.innerHTML = "Não encontrado"
            })

    } else {
        alert('Nada para procurar.')
    }
}

function back() {
    voltar.classList.add('esconder')
    ranking.classList.remove('esconder')
}

document.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        document.getElementById("procurar").click();
    }
})

voltar.classList.add('esconder')