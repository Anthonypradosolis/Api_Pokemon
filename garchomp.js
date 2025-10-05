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

            loadPokemonCry(criesUrl);
            imagePokemon(data.sprites || {});
        })
})

function loadPokemonCry(criesUrl) {
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

}

function imagePokemon(sprites){
    sprites = sprites || {};
        // Elementos img en el HTML
        const imgMain = document.getElementById('imagen');
        const spriteFrontDefault = document.getElementById('sprite-front-default');
        const spriteBackDefault = document.getElementById('sprite-back-default');
        const spriteFrontShiny = document.getElementById('sprite-front-shiny');
        const spriteBackShiny = document.getElementById('sprite-back-shiny');
        //const spriteFrontFemale = document.getElementById('sprite-front-female');
        //const spriteBackFemale = document.getElementById('sprite-back-female');
        //const spriteFrontShinyFemale = document.getElementById('sprite-front-shiny-female');
        //const spriteBackShinyFemale = document.getElementById('sprite-back-shiny-female');

        // Helper para setear src u ocultar si es null
        // el es el elemento img, url es la url de la imagen
        const setImg = (el, url) => {
            // si el es null o undefined, salimos inmediatamente
            if (!el) return;
            if (url) {
                el.src = url;
                el.style.display = '';
            } else {
                // Si no hay imagen, ocultar para que no muestre un broken image
                el.style.display = 'none';
            }
        }

        setImg(imgMain, sprites.front_default || imgMain.src);
        setImg(spriteFrontDefault, sprites.front_default);
        setImg(spriteBackDefault, sprites.back_default);
        setImg(spriteFrontShiny, sprites.front_shiny);
        setImg(spriteBackShiny, sprites.back_shiny);
        //setImg(spriteFrontFemale, sprites.front_female);
        //setImg(spriteBackFemale, sprites.back_female);
        //setImg(spriteFrontShinyFemale, sprites.front_shiny_female);
        //setImg(spriteBackShinyFemale, sprites.back_shiny_female);
    
}
