async function verificarLogin() {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "login.html";
    return;
  }

  const response = await fetch('http://127.0.0.1:8000/verificar-token', {
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