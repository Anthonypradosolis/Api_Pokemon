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
            
            const stats = data.stats || [];
            const criesUrl = data.cries?.latest || null; // URL del sonido del Pokémon, si existe
            const statsList = document.getElementById('stats-list');
            const listItems = statsList.getElementsByTagName('li');

            stats.forEach((stat, index) => {
                const valor = stat.base_stat;
                const nombre = stat.stat.name;

                if (listItems[index]) {
                    listItems[index].textContent = `${nombre}: ${valor}`;
                }

                console.log(`${nombre.toUpperCase()}: ${valor}`);
            });

            const audioEl = document.getElementById('ruido');
            const sourceEl = audioEl.querySelector('source');

            if (criesUrl) {
                if (sourceEl) {
                    sourceEl.src = criesUrl;
                    sourceEl.type = 'audio/ogg';
                    audioEl.load();
                } else {
                    audioEl.src = criesUrl;
                    audioEl.load();
                }
                console.log('Audio cargado:', criesUrl);
            } else {
                if (sourceEl) sourceEl.src = '';
                audioEl.removeAttribute('src');
                audioEl.load();
            }
        })
})








