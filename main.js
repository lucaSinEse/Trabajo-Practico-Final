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
  for (let index = 0; index < productos.length; index++) {
    idcod = productos[index].idcod;
    html += `
            <tr>
                <td>${productos[index].fecha}</td>
                <td>${productos[index].titulo}</td>
                <td> $${productos[index].precioPeso}</td>
                <td>$${productos[index].precioDolar}</td>
                <td><button class='editar' onclick="abrirFormulario('${idcod}')">Editar</button></td>
                <td><button class='eliminar' onclick= abrirDialogEliminar('${idcod}')>Eliminar</button></td>
            </tr>
        `;
  }
  document.getElementById("todosLosProductos").innerHTML = html;
}

function abrirFormulario(idcod) {
  let dialog = document.getElementById("formularioEditar");
  dialog.showModal();
  document.getElementById("id").value = idcod;
}

function editarProducto() {
  let productoEditado = {
    idcod: document.getElementById("id").value,
    titulo: document
      .getElementById("tituloProductoEditado")
      .value.trim()
      .toLowerCase(),
    precioPeso: document.getElementById("precioPesoEditado").value.trim(),
    precioDolar: document.getElementById("precioDolarEditado").value.trim(),
    fecha: document.getElementById("fechaEditada").value.trim(),
  };
  fetch(URL, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(productoEditado),
  })
    .then((response) => response.text())
    .then((data) => {
      if (data === "OK") {
        location.reload();
      } else {
        alert(data);
      }
    })
    .catch((error) => console.log("Error: ", error));
}

function abrirDialogEliminar(idcod) {
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
    .then((data) => {
      if (data === "OK") {
        location.reload();
      }
    })
    .catch((error) => console.log("Error: ", error));
}

function cerrarDialog(id) {
  document.getElementById(id).close();
}

function filtrar() {
  let input = document.getElementById("filtro").value.toLowerCase();

  let contenedor = document.getElementById("todosLosProductos");
  let hijos = contenedor.children;

  for (let i = 0; i < hijos.length; i++) {
    if (hijos[i].children[1].textContent.toLowerCase().includes(input)) {
      hijos[i].style.display = "";
    } else {
      hijos[i].style.display = "none";
    }
  }
}
