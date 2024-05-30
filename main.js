function mostrarProductos(){
    fetch('https://api.yumserver.com/15319/products')
    .then(response => response.json())
    .then(imprimirProductos)
    .catch(error => console.log('Error: ', error))
}

function imprimirProductos(productos){
    let html = ` `;
    for (let index = 0; index < productos.length; index++) {
        console.log(productos[index].idcod)
        html += `
            <tr>
                <td>${productos[index].fecha}</td>
                <td>${productos[index].titulo}</td>
                <td>${productos[index].precioPeso}</td>
                <td>${productos[index].precioDolar}</td>
                <td><button class='editar' onclick= editarProducto(${productos[index].idcod})>Editar</button></td>
                <td><button class='eliminar' onclick= eliminarProducto(${productos[index].idcod})>Eliminar</button></td>
            </tr>
        `
    }
    document.getElementById('todosLosProductos').innerHTML = html;
}

