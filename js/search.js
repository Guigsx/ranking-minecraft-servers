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
    let input = document.querySelector('.input-1')
    fetch(`https://api.mcstatus.io/v2/status/java/${input.value}`)
    .then(res => res.json())
    .then(data => {
        let jogadores = data.players.online.toLocaleString()
        document.querySelector('.resposta').innerHTML = jogadores
    }).catch(e => {
        document.querySelector('.resposta').innerHTML = "Não encontrado"
    })

    } else {
        alert('Nada para procurar.')
    }
}
document.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      document.getElementById("procurar").click();
    }
})