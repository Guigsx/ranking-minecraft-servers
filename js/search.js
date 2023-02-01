document.querySelector('.resposta').classList.add('esconder')

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
        document.querySelector('.ranking').classList.add('esconder')
        document.querySelector('.resposta').classList.remove('esconder')
        let input = document.querySelector('.input-1')
        fetch(`https://api.mcstatus.io/v2/status/java/${input.value}`)
            .then(res => res.json())
            .then(data => {
                let jogadores = `${data.players.online} / ${data.players.max}`
                let icon = data.icon
                let name = data.host
                document.querySelector('.resposta').innerHTML = `
                <p>Icon</p><span><img src="${icon}" style="width: 48px; heigth: 48px;"></span>
                <p>Nome</p><span>${name}</span>
                <p>Jogadores</p><span>${jogadores}</span>
                `
            }).catch(e => {
                document.querySelector('.resposta').innerHTML = "Não encontrado"
            })

    } else {
        alert('Nada para procurar.')
    }
}
document.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        document.getElementById("procurar").click();
    }
})

document.querySelector(".ranking").addEventListener("click", function (event) {
    if (event.target.tagName === "P", "nome", "n", "icons") {
        document.querySelector('.ranking').classList.add('esconder')
        document.querySelector('.resposta').classList.remove('esconder')
        let info = document.querySelector('.ranking').querySelector('nome')
        fetch(`https://api.mcstatus.io/v2/status/java/${info.innerHTML}`)
            .then(res => res.json())
            .then(data => {
                let jogadores = `${data.players.online} / ${data.players.max}`
                let icon = data.icon
                let name = data.host
                document.querySelector('.resposta').innerHTML = `
        <p>Icon</p><span><img src="${icon}" style="width: 48px; heigth: 48px;"></span>
        <p>Nome</p><span>${name}</span>
        <p>Jogadores</p><span>${jogadores}</span>
        `
            })
    }
});