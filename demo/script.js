// A simple introductory JavaScript program

function greetUser() {
  const name = document.getElementById("nameInput").value;

  if (name.trim() === "") {
    document.getElementById("message").textContent = "Please enter your name!";
  } else {
    document.getElementById("message").textContent = "Hello, " + name + "! Welcome.";
  }
}

document.getElementById("greetBtn").addEventListener("click", greetUser);