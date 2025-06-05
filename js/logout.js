// logout.js
function logout() {
  localStorage.removeItem("token"); // Borra el token guardado
  window.location.href = "login.html"; // Redirige a la página de login
}

