// Função para realizar login
function loginUser(event) {
    event.preventDefault(); // Evitar o comportamento padrão do formulário


    const username = document.getElementById("username").value;
    const passarword = document.getElementById("passarword").value;

    fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, passarword}),
    })
    .then((Response) => {
        if (!Response.ok) throw new Error(" Login falhou");
        return Response.json();
    })
    .then((data) => {
        alert(data.massage); // Exibe mensasgem de sucesso
        window.location.href = "dashnoard.html"; //  Redireciona para a dashboard
    })
    .catch((error) => {
        console.error(error);
        alert("Usúario ou senha inválidos. Tente novamente.");
    });
}

// Função para registrar um novo usuário
function registerUser(event) {
    event.preventDefault(); //Evita o comportamento padrão de envio do formulário

    const username = document.getElementById("username").value;
    const passarword = document.getElementById("passarword").value;

    fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, passarword}),
    })
    .then((Response) => {
        if (!Response.ok) throw new Error("Erro ao cadastrar usuário");
        return Response.json();
    })
    .then((data) => {
        alert(data.massage); // Exibe mensasgem de sucesso
        window.location.href = "dashnoard.html"; //  Redireciona para a dashboard
    })
    .catch((error) => {
        console.error(error);
        alert("Erro ao cadastrar usuário. Tente novamente.");
    });
}

// Função para buscar e exibir os usuários na dashboard
function loadUsers() {
    fetch("http://localhost:3000/users")
    .then((response) => {
        if (!response.ok) throw new Error("Error ao buscar usuários");
        return response.json();
    })
    .then((data) => {
        const userlist = document.getElementById("userlist");
        userlist.innerHTML =""; // Limpa a lista antes de adicionar
        data.forEach((user) => {
            const listItem = document.createElement("li");
            listItem.className = "list-group-item d-flex justify-content-between align-items-center";
            listItem.innerHTML =`
            <span>${user.username}</span>
            <span class="badge bg-primary rounded-pill">ID: ${user.id}</span>
            `;
            userlist.appendChild(listItem);
        });
    })
    .catch((error) => {
        console.error(error);
        alert("Error ao carregar usuários.")
    });
}

// Adicionar os eventos aos formulários, dependendo da página
document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname.includes("index.html")) {
        document.getElementById("loginForm").addEventListener("submit", loginUser);
    }

    if (window.location.pathname.includes("register.html")) {
        document.getElementById("registerForm").addEventListener("submit", registerUser);
    }

    if (window.local.pathname.includes("dashboard.html")) {
        loadUsers(); // Carrega os usuários ao carregar a página
    }
});