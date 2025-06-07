function abrircarrito() {
    document.getElementById("carrito").classList.add("activo");
    mostrarCarrito();
    document.addEventListener('mousedown', handleOutsideClick);
}

function cerracarrito() {
    document.getElementById("carrito").classList.remove("activo");
    document.removeEventListener('mousedown', handleOutsideClick);
}

// Función para agregar un producto al carrito
// Detecta clics fuera del carrito para cerrarlo
function handleOutsideClick(event) {
    const carrito = document.getElementById("carrito");
    if (carrito && !carrito.contains(event.target)) {
        cerracarrito();
    }
}

// Función para agregar un producto al carrito
function agregarAlCarrito(producto_carrito) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || []; // <-- Agrega esta línea
    const index = carrito.findIndex(item => item.id === producto_carrito.id);
    if (index !== -1) {
        carrito[index].cantidad += 1;
    } else {
        producto_carrito.cantidad = 1;
        carrito.push(producto_carrito);
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
    actualizarCantidadCarrito();
}

// Cambia la cantidad de un producto en el carrito
function cambiarCantidad(idProducto, cambio) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const index = carrito.findIndex(p => p.id === idProducto);
    if (index !== -1) {
        carrito[index].cantidad += cambio;
        if (carrito[index].cantidad <= 0) {
            carrito.splice(index, 1);
        }
        localStorage.setItem("carrito", JSON.stringify(carrito));
        mostrarCarrito();
        actualizarCantidadCarrito();
    }
}

// Muestra el contenido del carrito y el total
function mostrarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const contenedorCarrito = document.getElementById('productos-carrito');
    contenedorCarrito.innerHTML = '';
    if (carrito.length === 0) {
        contenedorCarrito.innerHTML = '<p>El carrito está vacío</p>';
        return;
    }
    let total = 0;
    carrito.forEach(producto => {
        const precioFormateado = producto.precio.toLocaleString('de-DE');
        total += producto.precio * producto.cantidad;
        const divProducto = document.createElement('div');
        divProducto.classList.add('producto-carrito-info');
        divProducto.innerHTML = `
            <img src="${producto.image}" alt="" width="50" height="50">
            <div class="producto-carrito-destalles">
                <h3 class="nombre-producto" >${producto.nombre}</h3> 
                <div class="cantidad-producto">
                    <button class="btn-cantidad" onclick="cambiarCantidad(${producto.id}, -1)">-</button>
                    <span class="cantidad">${producto.cantidad}</span>
                    <button class="btn-cantidad" onclick="cambiarCantidad(${producto.id}, 1)">+</button>
                </div>
            </div>
            <p class="carrito-precio-unitario" id="carrito-precio-unitario">Precio: ${precioFormateado} Gs</p>
        `;
        contenedorCarrito.appendChild(divProducto);
    });
    const hr = document.createElement('hr');
    contenedorCarrito.appendChild(hr);
    const divTotal = document.createElement('div');
    divTotal.classList.add('total-carrito');
    divTotal.innerHTML = `
        <p>Total:</p>
        <p id="total-carrito">Gs. ${total.toLocaleString('de-DE')} </p>
    `;
    contenedorCarrito.appendChild(divTotal);
    const btnVaciar = document.createElement('button');
    btnVaciar.textContent = 'Vaciar Carrito';
    btnVaciar.onclick = vaciarCarrito;
    btnVaciar.style.cssText = 'margin: 10px auto 0 auto; display: block; background-color: #f5cbc9;border: #f5cbc9 2px solid;box-shadow: #fcb1b1 0px 0px 2px; border-radius: 6px; padding: 10px 20px; font-weight: 600; cursor: pointer;';
    contenedorCarrito.appendChild(btnVaciar);
}

// Actualiza el contador del carrito sumando todas las cantidades
function actualizarCantidadCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const total = carrito.reduce((acc, prod) => acc + (prod.cantidad || 1), 0);
    const span = document.getElementById("carrito-cantidad");
    if (span) span.textContent = total;
}

// Actualiza el enlace de WhatsApp con el detalle del carrito
function actualizarEnlaceWhatsApp() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const btn = document.querySelector('.btn-whatsapp-pedido');
    if (!btn) return;

    if (carrito.length === 0) {
        btn.href = "https://wa.me/595994791449?text=Hola%2C%20quiero%20hacer%20un%20pedido%20desde%20la%20tienda%20online.";
        btn.setAttribute('disabled', 'disabled');
        btn.style.opacity = "0.5";
        btn.style.pointerEvents = "none";
        return;
    } else {
        btn.removeAttribute('disabled');
        btn.style.opacity = "1";
        btn.style.pointerEvents = "auto";
    }

    let mensaje = "Hola, quiero hacer un pedido de:%0A";
    let total = 0;
    carrito.forEach(producto => {
        mensaje += `• ${producto.nombre} x ${producto.cantidad}, Precio : ${producto.precio.toLocaleString('de-DE')} Gs - ID : ${producto.id}%0A`;
        total += producto.precio * producto.cantidad;
    });
    mensaje += `%0ATotal: ${total.toLocaleString('de-DE')} Gs`;
    btn.href = `https://wa.me/595994791449?text=${mensaje}`;
}

// Llama a esta función cada vez que cambie el carrito
document.addEventListener("DOMContentLoaded", actualizarEnlaceWhatsApp);

// Modifica tus funciones de carrito para llamar a esto:
const _agregarAlCarrito = agregarAlCarrito;
agregarAlCarrito = function(producto_carrito) {
    _agregarAlCarrito(producto_carrito);
    actualizarEnlaceWhatsApp();
};

const _cambiarCantidad = cambiarCantidad;
cambiarCantidad = function(idProducto, cambio) {
    _cambiarCantidad(idProducto, cambio);
    actualizarEnlaceWhatsApp();
};

// Inicializa el contador al cargar la página
document.addEventListener("DOMContentLoaded", actualizarCantidadCarrito);

// Vacía el carrito completamente
function vaciarCarrito() {
    localStorage.removeItem('carrito');
    mostrarCarrito();
    actualizarCantidadCarrito();
    actualizarEnlaceWhatsApp();
}

// Exporta las funciones globalmente
window.abrircarrito = abrircarrito;
window.cerracarrito = cerracarrito;
window.agregarAlCarrito = agregarAlCarrito;
window.cambiarCantidad = cambiarCantidad;
window.mostrarCarrito = mostrarCarrito;
window.actualizarCantidadCarrito = actualizarCantidadCarrito;
// Exporta la función globalmente
window.vaciarCarrito = vaciarCarrito;






