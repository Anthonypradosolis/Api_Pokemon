const input = document.getElementById("search-input");
const btn = document.getElementById("buscarBtn");
const ruido = document.getElementById("ruido");

const limpiar = () => {
    const statsList = document.getElementById('stats-list');
    const listItems = statsList.getElementsByTagName('li');
    for (let i = 0; i < listItems.length; i++) {
        listItems[i].textContent = "";
    }
}

btn.addEventListener("click", () => {
    const pokemon = input.value.trim().toLowerCase();
    if (!pokemon) {
        alert("Por favor, ingresa el nombre de un Pokémon");
        return;
    }
    
    limpiar();
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then((datosJson) => {
            return datosJson.json()
        }).catch((error) => {
            console.error("Hubo un problema recuperando los datos del pokemon:", error);
            alert("No se pudo encontrar el Pokémon. Verifica el nombre.");
        })
        .then((data) => {
            if (!data) return;
            
            let stats = data.stats;
            const cries = data.cries?.latest;
            const statsList = document.getElementById('stats-list');
            const listItems = statsList.getElementsByTagName('li');

            stats.forEach((stat, index) => {
                let valor = stat.base_stat;
                let nombre = stat.stat.name;

                // Actualizar el contenido de cada elemento li
                if (listItems[index]) {
                    listItems[index].textContent = `${nombre}: ${valor}`;
                }

                console.log(`${nombre.toUpperCase()}: ${valor}`);
            });
            ruido.src = cries;
            
        })
})








