fetch("https://api-colombia.com/api/v1/TypicalDish")

 .then(response => {
        return response.json();
    })

    .then(data => {
 const lista =document.getElementById("lista-platos");
 lista.innerHTML="";

  data.forEach(plato => {


let imagen = plato.imageUrl;

if (plato.name.toLowerCase().includes("tamal tolimense")) {
    imagen = "imagenes/tamal.png";
}
else if (plato.name.toLowerCase().includes("arroz de lisa")) {
    imagen = "imagenes/Arrozdelisa.png";
}
else if (plato.name.toLowerCase().includes("dulce de guayaba")) {
    imagen = "imagenes/Dulcedeguayaba.png";
}

console.log(plato.name, imagen);
        lista.innerHTML += `
        <div class="tarjeta-plato">
            <h3>${plato.name}</h3>
            <img src="${imagen}" alt="${plato.name}">

            <p>Descripcion: ${plato.description}</p>

            <p>Ingredientes: ${plato.ingredients}</p>

            <p>Departamento: ${plato.department.name}</p>

        </div>
    `;


    });
})

.catch(error => {
    const listaError = document.getElementById("lista-platos");

    listaError.innerHTML = "No se pudieron cargar los platos típicos.";

    console.error("Error al consultar la API:", error);
});