let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

const contenedorCatalogo = document.getElementById("catalogo");
const contenedorCarrito = document.getElementById("carrito");

function mostrarProductos() {
  contenedorCatalogo.innerHTML = "";

  Vinilos.forEach(vinilo => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
      <img src="${vinilo.img}" alt="${vinilo.album}" class="vinilo-img"/>
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
  setTimeout(() => {
    const producto = Vinilos.find(p => p.id === id);
    if (producto) {
      carrito.push(producto);
      localStorage.setItem('carrito', JSON.stringify(carrito));
      mostrarCarrito();

      Swal.fire({
        title: `${producto.album}`,
        text: '¡Se agregó al carrito!',
        icon: 'success',
        background: '#111',           
        color: '#fff',                
        iconColor: '#1db954',         
        showConfirmButton: false,
        timer: 1800,
        customClass: {
          popup: 'swal2-popup-custom',
          title: 'swal2-title-custom',
          content: 'swal2-content-custom'
        }
      });
    }
  }, 1500);
};


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

const btnVaciarCarrito = document.getElementById("vaciar-carrito");
btnVaciarCarrito.addEventListener('click', () => {
  carrito.length = 0;  
  localStorage.setItem('carrito', JSON.stringify(carrito));
  mostrarCarrito();

  Swal.fire({
    title: 'Carrito vacío',
    text: 'Todos los productos han sido eliminados.',
    icon: 'info',
    timer: 1500,
    showConfirmButton: false
  });
});

contenedorCatalogo.addEventListener('click', e => {
  if (e.target.classList.contains('vinilo-img')) {
    e.target.classList.toggle('zoom');
  }
});

const formNuevo = document.getElementById("form-nuevo-producto");

formNuevo.addEventListener("submit", (e) => {
  e.preventDefault();
  const album = document.getElementById("nuevo-album").value;
  const precio = parseInt(document.getElementById("nuevo-precio").value);
  
  const nuevoVinilo = new Vinilo(Vinilos.length + 1, album, precio, "img/placeholder.jpg");
  Vinilos.push(nuevoVinilo);

  mostrarProductos();
  formNuevo.reset();

  Swal.fire({
    title: '¡Sugerencia recibida!',
    text: 'Tendremos en cuenta tu sugerencia!',
    icon: 'success',
    background: '#111',
    color: '#fff',
    confirmButtonColor: '#1db954',
    timer: 2000,
    showConfirmButton: false
  });
});
