const vinilos = [
  { id: 1, album: "Hybrid Theory Bonus Edition", precio: 60 },
  { id: 2, album: "Minutes To Midnight", precio: 35 },
  { id: 3, album: "One More Light", precio: 15 },
  { id: 4, album: "Meteora", precio: 60 },
  { id: 5, album: "A Thousand Suns", precio: 11 }
];

function mostrarCatalogo() {
  let mensaje = "Vinilos disponibles:\n";
  for (let i = 0; i < vinilos.length; i++) {
    mensaje = mensaje + (i + 1) + " . " + vinilos[i].album + " - $" + vinilos[i].precio + "\n";
  }
  alert(mensaje);
}

let carrito = [];

function agregarAlCarrito() {
  let seleccion = prompt('Ingresa el número del vinilo que querés comprar (del 1 al 5)');
  let index = parseInt(seleccion) - 1;
  if (index >= 0 && index < vinilos.length) {
    carrito.push(vinilos[index]);
    alert(`Agregaste "${vinilos[index].album}" al carrito.`);
  } else {
    alert('Selección inválida, intentá de nuevo');
  }
}

function comprarVinilos() {
  let seguirComprando = true;
  while (seguirComprando) {
    mostrarCatalogo();
    agregarAlCarrito();
    seguirComprando = confirm('¿Querés seguir comprando?');
  }
  mostrarResumen();
}

function mostrarResumen() {
  if (carrito.length === 0) {
    alert('No compraste ningún vinilo.');
    return;
  }

  let resumen = 'Vinilos en el carrito:\n';
  let total = 0;

  for (let i = 0; i < carrito.length; i++) {
    resumen = resumen + "- " + carrito[i].album + " ($" + carrito[i].precio + ")\n";
    total = total + carrito[i].precio;
  }

  resumen = resumen + "\nTotal: $" + total;
  alert(resumen);
}

//hora de la verdad
comprarVinilos();

     