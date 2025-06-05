const toggleButton = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

toggleButton.addEventListener('click', () => {
menu.classList.toggle('active');
});




const form = document.getElementById('product-form');
const output = document.getElementById('output');
const imageInput = document.getElementById('image');
const preview = document.getElementById('preview');
const contenedorVista = document.getElementById('contenedor-principal');
const btnVistaPrevia = document.getElementById('btn-vista-previa');
const btnEnviar = document.getElementById('btn-enviar');

let imagePath = "";
let imageFile = null;

imageInput.addEventListener('change', handleImagePreview);
btnVistaPrevia.addEventListener('click', handleVistaPrevia);
btnEnviar.addEventListener('click', handleFormSubmit);

function handleImagePreview() {
  const file = imageInput.files[0];
  if (file) {
    imagePath = file.name;
    imageFile = file;
    preview.src = URL.createObjectURL(file);
    preview.style.display = "block";
  }
}
function handleVistaPrevia(e) {
  e.preventDefault();
  const producto = getProductoFromForm(imagePath);
  output.textContent = JSON.stringify(producto, null, 2);
  mostrarVistaPrevia(producto);
}

async function handleFormSubmit(e) {
  e.preventDefault();
  
  const rawDescripcion = document.getElementById('descripcion').value;
  const partes = rawDescripcion.split("-").map(p => p.trim()).filter(Boolean);
  const descripcionFormateada = partes.map(p => `<br> • ${p}`).join("");

  const nombre = document.getElementById('nombre').value;
  const nombre2 = document.getElementById('nombre2').value;
  const precio = document.getElementById('precio').value;
  const cantidad = document.getElementById('cantidad').value;
  const categoria = document.getElementById('categoria').value;
  const Descripcion = descripcionFormateada;
  const detalles = document.getElementById('detalles').value;

  if (imageFile) {
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("nombre", nombre);
    formData.append("nombre2", nombre2);
    formData.append("precio", precio);
    formData.append("cantidad", cantidad);
    formData.append("categoria", categoria);
    formData.append("descripcion", Descripcion);
    formData.append("detalles", detalles);

    const res = await fetch('https://api.puntodigitalpy.online/upload-image', {
      method: 'POST',
      body: formData
    });
    alert('Código de estado:'+ res.status);
    let data;
    try {
      data = await res.json();
      alert("Respuesta del servidor: " + JSON.stringify(data));
    } catch (err) {
      alert("Error al procesar la respuesta del servidor.");
      return;
    }

    if (res.ok && data.filename) {
      alert("Imagen subida correctamente: " + data.filename);
      imageName = data.url || data.filename;
    } else if (res.ok && data.detail) {
      alert("Error al subir imagen: " + data.detail);
      return;
    } else {
      alert("Error al subir imagen.");
      return;
    }
    
  }
  
}

function getProductoFromForm() {
  const rawDescripcion = document.getElementById('descripcion').value;
  const partes = rawDescripcion.split("-").map(p => p.trim()).filter(Boolean);
  const descripcionFormateada = partes.map(p => `<br> • ${p}`).join("");

  return {
    nombre: document.getElementById('nombre').value,
    nombre2: document.getElementById('nombre2').value,
    precio: document.getElementById('precio').value,
    cantidad: document.getElementById('cantidad').value,
    categoria: document.getElementById('categoria').value,
    image: document.getElementById('image').value,
    descripcion: descripcionFormateada,
    detalles: document.getElementById('detalles').value
  };
}

function mostrarVistaPrevia(producto) {
  contenedorVista.innerHTML = ''; // Limpiar anterior vista previa

  const div = document.createElement('div');
  div.classList.add("contenedor-productos");
  div.innerHTML = `
    <div class="contenedor-img-producto">
      <img class="img-producto" src="${preview.src}" alt="${producto.nombre}">
    </div>
    <div class="info-producto-destalles">
      <hr style="height: 3px; background-color: #f5cbc9; border: none; width: 350px; margin: 5px 0;">
      <h1>${producto.nombre}</h1>
      <h2>${producto.nombre2}</h2>
      <hr style="height: 3px; background-color: #f5cbc9; border: none; width: 350px; margin: 5px 0;">
      <h3 class="cantidad">${producto.cantidad}</h3>
      <p class="descripcion">INCLUYE:${producto.descripcion}</p>
      <hr style="height: 3px; background-color: #f5cbc9; border: none; width: 350px; margin: 5px 0;">
      <p class="precio-detalles">Precio: ${producto.precio} Gs</p>
      <a href="https://wa.me/595994791449?text=Hola quiero hacer un pedido de: ${producto.nombre}, el ${producto.nombre2}. Precio: ${producto.precio} gs" target="_blank" class="boton-whatsapp">
        <img src="https://img.icons8.com/color/48/000000/whatsapp--v1.png" alt="WhatsApp" class="icono-whatsapp">
        Hacer el pedido
      </a>
    </div>
    <hr style="height: 1px; background-color: #ffeeee; border: none; width: 100%;">
    <div class="descripcion-producto">
      <h1>Detalles:</h1>
      <p>${producto.detalles}</p>
    </div>
    <footer>
      <p>© 2025 Thamary Creaciones. Todos los derechos reservados.</p>
    </footer>
  `;
  contenedorVista.appendChild(div);
}