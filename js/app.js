let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

const contenedorCatalogo = document.getElementById("catalogo");
const contenedorCarrito = document.getElementById("carrito");

function mostrarProductos() {
  contenedorCatalogo.innerHTML = "";

  Vinilos.forEach(vinilo => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
      <h3>${vinilo.album}</h3>
      <p>Precio: $${vinilo.precio}</p>
      <button class="agregar-btn" data-id="${vinilo.id}">Agregar al carrito</button>
    `;
    contenedorCatalogo.appendChild(div);
  });

  const botonesAgregar = document.querySelectorAll(".agregar-btn");
  botonesAgregar.forEach(boton => {
    boton.addEventListener("click", () => {
      const idProducto = parseInt(boton.getAttribute("data-id"));
      agregarAlCarrito(idProducto);
    });
  });
}

function agregarAlCarrito(id) {
  const producto = Vinilos.find(p => p.id === id);
  if (producto) {
    carrito.push(producto);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
  }
}

function mostrarCarrito() {
  contenedorCarrito.innerHTML = "";

  let total = 0;

  carrito.forEach((item, index) => {
    const div = document.createElement("div");
    div.textContent = `${item.album} - $${item.precio}`;

    const botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";
    botonEliminar.onclick = () => eliminarDelCarrito(index);

    div.appendChild(botonEliminar);
    contenedorCarrito.appendChild(div);

    total += item.precio;
  });

  const totalDiv = document.createElement("div");
  totalDiv.textContent = `Total: $${total}`;
  contenedorCarrito.appendChild(totalDiv);
}

function eliminarDelCarrito(index) {
  if (typeof index !== "number" || index < 0 || index >= carrito.length) return;
  carrito.splice(index, 1);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  mostrarCarrito();
}

mostrarProductos();
mostrarCarrito();

const btnVaciarCarrito = document.createElement('button');
btnVaciarCarrito.textContent = "Vaciar carrito";
btnVaciarCarrito.addEventListener('click', () => {
  carrito.length = 0;  
  localStorage.setItem('carrito', JSON.stringify(carrito));
  mostrarCarrito();
});

contenedorCarrito.parentNode.insertBefore(btnVaciarCarrito, contenedorCarrito.nextSibling);
