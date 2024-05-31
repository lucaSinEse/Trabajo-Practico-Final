const URL = "https://api.yumserver.com/15319/products";
function mostrarProductos() {
  fetch(URL)
    .then((response) => response.json())
    .then(imprimirProductos)
    .catch((error) => console.log("Error: ", error));
}

function imprimirProductos(productos) {
  let html = ` `;
  let idcod;
  console.log(productos);
  for (let index = 0; index < productos.length; index++) {
    idcod = productos[index].idcod;
    html += `
            <tr>
                <td>${productos[index].fecha}</td>
                <td>${productos[index].titulo}</td>
                <td>${productos[index].precioPeso}</td>
                <td>${productos[index].precioDolar}</td>
                <td><button class='editar' onclick="abrirFormulario('${idcod}')">Editar</button></td>
                <td><button class='eliminar' onclick= abrirDialogEliminar('${idcod}')>Eliminar</button></td>
            </tr>
        `;
  }
  document.getElementById("todosLosProductos").innerHTML = html;
}

function crearProductos() {
  let nuevoProducto = {
    titulo: document.getElementById("tituloProducto").value,
    precioPeso: document.getElementById("precioPeso").value,
    precioDolar: document.getElementById("precioDolar").value,
    fecha: document.getElementById("fecha").value,
  };

  fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(nuevoProducto),
  })
    .then((response) => response.text())
    .then((data) => console.log(data))
    .catch((error) => console.log("Error: ", error));
}

function abrirFormulario(idcod) {
  console.log(idcod);
  let dialog = document.getElementById("formularioEditar");
  dialog.showModal();
  document.getElementById("id").value = idcod;
}

function editarProducto() {
  let productoEditado = {
    idcod: document.getElementById("id").value,
    titulo: document.getElementById("tituloProductoEditado").value,
    precioPeso: document.getElementById("precioPesoEditado").value,
    precioDolar: document.getElementById("precioDolarEditado").value,
    fecha: document.getElementById("fechaEditada").value,
  };
  fetch(URL, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(productoEditado),
  })
    .then((response) => response.text())
    .then((data) => console.log(data))
    .catch((error) => console.log("Error: ", error));

  document.getElementById("formularioEditar").close();
}

function abrirDialogEliminar(idcod) {
  console.log(idcod);
  document.getElementById("dialogEliminar").showModal();
  document.getElementById("idEliminar").textContent = idcod;
}

function eliminarProducto() {
  let idcodEliminar = document.getElementById("idEliminar").textContent;

  fetch(URL, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      idcod: idcodEliminar,
    }),
  })
    .then((response) => response.text())
    .then((data) => console.log(data))
    .catch((error) => console.log("Error: ", error));

  document.getElementById("dialogEliminar").close();
}
