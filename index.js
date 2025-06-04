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
fetch("http://137.131.147.202:8000/productos")
    .then(response => response.json())
    .then(data => {
        const productos = data.productos;
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
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `

            <img class="producto-imagen" src="${item.image}" alt="${item.nombre}">
            <div class="producto-info">
                <h3 class="producto-nombre">${item.nombre}</h3>
                <p>Tipo : ${item.nombre2}</p>
                <p>Precio: ${item.precio} Gs.</p>
                
            </div>
        `;
        div.onclick = () => {
            const searchInput = document.getElementById("search");
            searchInput.value = "";
            searchInput.blur();
            cargarproductos(productos);
            
            window.location.href = `producto-detallado.html?id=${item.id}`;
            
        };
        contenedorproductos.appendChild(div);
    })

}




