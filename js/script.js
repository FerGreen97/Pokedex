const contenidoTarjetasHTML = document.getElementById("tarjetas")

fetch("./database.json")
    .then(response => response.json())
    .then(data =>{
        for(const pokemon of data){
            contenidoTarjetasHTML.innerHTML += `
            <h2>
                hola mundo
                ${pokemon.nombre}
            </h2>
            `
        }
    }

    )