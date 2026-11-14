fetch("https://api-colombia.com/api/v1/TypicalDish")

 .then(response => {
        return response.json();
    })

    .then(data => {
 const lista =document.getElementById("lista-platos");
 lista.innerHTML="";

  data.forEach(plato => {

        lista.innerHTML += `
        <div class="tarjeta-plato">
            <h3>${plato.name}</h3>

            <img src="${plato.imageUrl}" alt="${plato.name}">

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