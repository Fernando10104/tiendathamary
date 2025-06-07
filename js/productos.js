const opciones = {
  keys: ['nombre', 'categoria'],
  threshold: 0.37
};
const boton = document.getElementById("btn-cargar");
const toggleButton = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

toggleButton.addEventListener('click', () => {
menu.classList.toggle('active');
});

let resultadoFinal = [];
let productos = [];
let indiceInicio = 0;
const cantidadPorCarga = 8;

// Cargar los productos desde el archivo JSON
function actulizarproductos() {
  const input = document.getElementById("search");
  const categoria = document.getElementById("categoria");
  const price = document.getElementById("price");

  let price2 = price.value.trim();
  let categoria2 = categoria.value.trim();
  let texto = input.value.trim();
  const query = `${texto} ${categoria2}`;
  

  if (texto === "" && categoria2 === "") {
    resultadoFinal = [...productos];
  } else {
    const resultado = fuse.search(query);
    resultadoFinal = resultado.map(r => r.item);
  }

  if (price2 === "MENORAMAYOR") {
    resultadoFinal.sort((a, b) => Number(a.precio) - Number(b.precio));
  } else if (price2 === "MAYORAMENOR") {
    resultadoFinal.sort((a, b) => Number(b.precio) - Number(a.precio));
  }

  contenedorproductos.innerHTML = ""; // Limpiar antes de mostrar filtrados
  indiceInicio = 0; // Reiniciar para evitar errores visuales
  console.log(resultadoFinal)
  cargarproductos(resultadoFinal, true); // ⚠️ nuevo segundo parámetro
}

// Cargar los datos del JSON
fetch("https://api.puntodigitalpy.online/productos")
  .then(response => response.json())
  .then(data => {
    productos = data.productos;

    // Inicializar Fuse una vez obtenidos los productos
    fuse = new Fuse(productos, opciones);

    // Setear filtros y eventos
    const input = document.getElementById("search");
    const categoria = document.getElementById("categoria");
    const price = document.getElementById("price");

    price.value = "MENORAMAYOR";
    actulizarproductos();

    input.addEventListener("input", actulizarproductos);
    categoria.addEventListener("change", actulizarproductos);
    price.addEventListener("change", actulizarproductos);

    // Manejar regreso desde el historial
    window.addEventListener("pageshow", function () {
      const searchInput = document.getElementById("search");
      searchInput.blur();
      cargarproductos(resultadoFinal, true);
    });
  })
  .catch(error => console.error('Error al cargar los productos:', error));



//contenedorproductos.innerHTML = ""; // Limpiar el contenedor antes de agregar nuevos productos

const contenedorproductos = document.querySelector("#contenedor-productos");

function cargarproductos(productosParaCargar, resetIndice = false) {
  if (resetIndice) {
    indiceInicio = 0;
    contenedorproductos.innerHTML = ""; // Limpiar solo si es filtrado
  }

  const nuevosProductos = productosParaCargar.slice(indiceInicio, indiceInicio + cantidadPorCarga);
  console.log(nuevosProductos,"nuevos productos")
  nuevosProductos.map(item => {
    const precioFormateado = item.precio.toLocaleString('de-DE');
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
      <img class="producto-imagen" src="${item.image}" alt="${item.nombre}">
      <div class="producto-info">
        <h3 class="producto-nombre">${item.nombre}</h3>
        <p>Tipo : ${item.nombre2}</p>
        <p>Precio: ${precioFormateado} Gs.</p>
        <button class="btn-agregar">Agregar al carrito</button>
      </div>
    `;
    // Evita que el click en el div navegue si se hace click en el botón
    div.onclick = () => {
      const searchInput = document.getElementById("search");
      searchInput.value = "";
      searchInput.blur();
      window.location.href = `p_detallado.html?id=${item.id}`;
    };
    // Botón agregar al carrito con feedback visual
    const btnAgregar = div.querySelector('.btn-agregar');
    btnAgregar.onclick = function(event) {
      event.stopPropagation();
      agregarAlCarrito(item);
      btnAgregar.textContent = "¡Agregado!";
      setTimeout(() => { btnAgregar.textContent = "Agregar al carrito"; }, 1200);
    };
    contenedorproductos.appendChild(div);
  });

  indiceInicio += cantidadPorCarga;

  if (indiceInicio >= productosParaCargar.length) {
    boton.style.display = "none";
  } else {
    boton.style.display = "block";
  }
}
boton.addEventListener("click", () => {
  cargarproductos(resultadoFinal);
  console.log("boton precionado") // sin reset
})
function handleButtonClick(event) {
  event.stopPropagation(); // 🔴 Esto evita que el clic llegue al div
  
}






