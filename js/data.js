function Vinilo(id, album, precio) {
  this.id = id;
  this.album = album;
  this.precio = precio;
}

const Vinilos = [
  new Vinilo(1, "Hybrid Theory Bonus Edition", 60),
  new Vinilo(2, "Minutes To Midnight", 35),
  new Vinilo(3, "One More Light", 15),
  new Vinilo(4, "Meteora", 60),
  new Vinilo(5, "A Thousand Suns", 11),
];

contenedorCatalogo = document.getElementById("catalogo");

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
    console.log("Carrito actualizado:", carrito);
  }
}

mostrarProductos();



