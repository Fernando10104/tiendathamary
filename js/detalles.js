const toggleButton = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

toggleButton.addEventListener('click', () => {
menu.classList.toggle('active');
});


// Cargar los productos desde el archivo JSON
fetch("https://api.puntodigitalpy.online/productos")
    .then(response => response.json())
    .then(data => {
        const productos = data.productos;
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');  // <-- ID del producto
        
        console.log(typeof id, "id del producto");
        mostrarProducto(productos,id);
    })
    .catch(error => console.error('Error al cargar los productos:', error));

    // Esta línea selecciona el contenedor donde se mostrarán los detalles del producto en el archivo producto-detallado.html
const contenedor_detalles = document.querySelector(".contenedor-principal");


// funcion de mostrar productos detallados
function mostrarProducto(productos,id){
    console.log(Array.isArray(productos), "productos");
    console.log(id);
    const idInt = parseInt(id);  // convierte el string a número entero
    console.log(typeof idInt, "id del producto");
    console.log(productos,"productos del mostrar");
    const producto = productos.find(producto => producto.id === idInt);
    console.log(producto, "producto encontrado");
    const precioFormateado = item.precio.toLocaleString('de-DE');
    const div = document.createElement("div");
    div.classList.add("contenedor-productos");
    div.innerHTML =`
                    <div class="contenedor-img-producto">
                        <img class="img-producto" src="${producto.image}" alt="${producto.nombre}">
                    </div>
                    <div class="info-producto-destalles">
                        <hr style="height: 3px; background-color: #f5cbc9; border: none; width: 350px; margin: 5px 0;">
                        <h1>${producto.nombre}</h1>
                        <h2>${producto.nombre2}</h2>
                        <hr style="height: 3px; background-color: #f5cbc9; border: none; width: 350px; margin: 5px 0;">

                        <h3 class="cantidad">${producto.cantidad}</h3>
                        
                        <p class="descripcion">INCLUYE:
                        ${producto.descripcion}
                        </p>
                        <hr style="height: 3px; background-color: #f5cbc9; border: none; width: 350px; margin: 5px 0;">
                        <p class="precio-detalles">Precio: ${precioFormateado} Gs</p>
                        <!-- Botón de WhatsApp -->
                        <a href="https://wa.me/595994791449?text=Hola quiero hacer un pedido de: ${producto.nombre}, el ${producto.nombre2}. Precio: ${producto.precio} gs  " target="_blank" class="boton-whatsapp">
                        <img src="https://img.icons8.com/color/48/000000/whatsapp--v1.png" alt="WhatsApp" class="icono-whatsapp">
                        Hacer el pedido
                        </a>

                    </div>
                    </div>
                        <hr style="height: 1px; background-color: #ffeeee; border: none; width: 100%;">
                        <div class="descripcion-producto">
                                <h1>Detalles:</h1>
                                <p>${producto.detalles}</p>
                    

                    </div> 
                    
                    <footer>
                        <p>© 2025 Thamary Creaciones. Todos los derechos reservados.</p>
                    </footer>`
                    ;
                    contenedor_detalles.appendChild(div);
 }

