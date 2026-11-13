fetch("https://api-colombia.com/api/v1/Department")

.then(response => {
        return response.json();
    })
    .then(data => {
    const lista = document.getElementById("lista-departamentos");
    data.forEach(departamento => {
    lista.innerHTML += `
    <h3>${departamento.name}</h3>
    <p>Población: ${departamento.population}</p>
    <p>Superficie: ${departamento.surface}</p>
    <p>Descripción: ${departamento.description}</p>
`;
});
    })
    .catch(error => {
        // Aquí manejamos los errores
    });