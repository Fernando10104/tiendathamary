const opciones = {
  keys: ['nombre'],
  threshold: 0.4
};

const toggleButton = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

toggleButton.addEventListener('click', () => {
menu.classList.toggle('active');
});

// Cargar los productos desde el archivo JSON
fetch("./src/productos_destacados.json")
    .then(response => response.json())
    .then(data => {
        console.log(data)
        const productos = data.productos;
        console.log(productos)
        cargarproductos(productos);
        const fuse = new Fuse(productos, opciones);
        const input = document.getElementById("search");
        input.addEventListener("input", () => {
        let texto = input.value.trim();
        
        if (texto === ""){
            cargarproductos(productos);
            console.log(productos,"lololololololo")
            return;

            
        }

            const resultado = fuse.search(texto);
            const filtrados = resultado.map(r => r.item);
            
            cargarproductos(filtrados);


        });
        window.addEventListener("pageshow", function (event) {
            const searchInput = document.getElementById("search");
            searchInput.blur();
            cargarproductos(productos); // Guardá una copia antes
            console.log("kore")


        });
     
    })
    .catch(error => console.error('Error al cargar los productos:', error));





const contenedorproductos = document.querySelector("#contenedor-productos");

function cargarproductos(productos){
    contenedorproductos.innerHTML = ""; // limpiar lo anterior
    productos.forEach( item  => {
        const precioFormateado = item.precio.toLocaleString('de-DE');
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `

            <img class="producto-imagen" src="${item.image}" alt="${item.nombre}">
            <div class="producto-info">
                <h3 class="producto-nombre">${item.nombre}</h3>
                <p>Tipo : ${item.nombre2}</p>
                <p>Precio: ${precioFormateado} Gs.</p>
                <p>${item.descripcion}</p>
                
            </div>
        `;
        div.onclick = () => {
            const searchInput = document.getElementById("search");
            searchInput.value = "";
            searchInput.blur();
            
        };
        contenedorproductos.appendChild(div);
    })

}




