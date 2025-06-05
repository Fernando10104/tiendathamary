async function verificarLogin() {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "login.html";
    return;
  }

  const response = await fetch('https://api.puntodigitalpy.online/verificar-token', {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  const data = await response.json();

  if (!data.ok) {
    localStorage.removeItem("token");
    window.location.href = "login.html";
  }
}

verificarLogin();