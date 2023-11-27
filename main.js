let words = ["perro", "gato", "casa", "sol", "luna", "agua", "cielo", "flor", "fuego", "tierra",
"mesa", "silla", "puerta", "ventana", "raton", "rio", "nieve", "piedra", "papel", "tijeras",
"hoja", "puente", "planta", "viento", "rayo", "nube", "fruta", "manzana", "banana", "naranja",
"limon", "uva", "pino", "palmera", "coche", "avion", "tren", "barco", "bici", "camino", "calle",
"pueblo", "ciudad", "montana", "playa", "desierto", "bosque", "isla", "laguna", "lago",
"pan", "leche", "queso", "huevo", "pollo", "carne", "pescado", "arroz", "frijoles", "maiz",
"tomate", "cebolla", "zanahoria", "calabaza", "nuez", "almendra", "avellana", "chocolate",
"helado", "pastel", "galleta", "pizza", "pasta", "ensalada", "sandwich", "sopa", "cafe", "te",
"jugo", "agua", "cerveza", "vino", "whisky", "tequila", "ron", "coca", "sprite", "fanta",
"pelota", "cometa", "muñeca", "rompecabezas", "burbuja", "globos", "bicicleta", "patineta",
"computadora", "telefono", "television", "radio", "libro", "cuaderno", "lapiz", "pintura"]


const elemento = document.getElementById("palabra")
const errorLetrasElement = document.getElementById("error-letras")
const reset = document.getElementById("reset")
const notificationEmergente = document.getElementById("mensaje")
const notification = document.getElementById("notification-container")
const mensaje = document.getElementById("final-mensaje")
const palabraFinal = document.getElementById("palabra-final")
const partes = document.querySelectorAll(".part")

let wordAle = words[Math.floor(Math.random() * words.length)]

let juego = true

const letrasCorrectas = []
const errorLetras = []

function inicio() {
  elemento.innerHTML = `${wordAle.split("").map((letter) =>`
    <span class="letter">
    ${letrasCorrectas.includes(letter) ? letter : ""}
    </span>
    `).join("")} `
  const palabraCorrecta = elemento.innerText.replace(/\n/g, "")
  if (palabraCorrecta === wordAle) {
    mensaje.innerText = "Felicidades, haz adivinado la palabra correcta"
    palabraFinal.innerText = ""
    notificationEmergente.style.display = "flex"
    juego = false
  }
}

function errorDeLetras() {errorLetrasElement.innerHTML = `${errorLetras.length > 0 ? "<p>Letras utilizadas</p>" : ""}${errorLetras.map((letter) => `<span>${letter}</span>`)}`
  partes.forEach((part, index) => {
    const error = errorLetras.length
    index < error? (part.style.display = "block"): (part.style.display = "none")
  })
    if (errorLetras.length === partes.length) {
    mensaje.innerText = "Perdiste... Vuelve a intentarlo"
    palabraFinal.innerText = `La palabra era: ${wordAle}`
    notificationEmergente.style.display = "flex"
    juego = false
  }
}

function muestraNotificacion() {
  notification.classList.add("show")
  setTimeout(() => {
    notification.classList.remove("show")
  }, 2000)
}

window.addEventListener("keypress", (e) => {
  if (juego) {
    const letra = e.key.toLowerCase()
    if (letra >= "a" && letra <= "z") {
      if (wordAle.includes(letra)) {
        if (!letrasCorrectas.includes(letra)) {
          letrasCorrectas.push(letra)
          inicio()
        } else {
          muestraNotificacion()
        }
      } else {
        if (!errorLetras.includes(letra)) {
          errorLetras.push(letra)
          errorDeLetras()
        } else {
          muestraNotificacion()
        }
      }
    }
  }
})

reset.addEventListener("click", () => {
  juego = true
  letrasCorrectas.splice(0)
  errorLetras.splice(0)
  wordAle = words[Math.floor(Math.random() * words.length)];
  inicio();
  errorDeLetras();
  notificationEmergente.style.display = "none";
})

inicio()
