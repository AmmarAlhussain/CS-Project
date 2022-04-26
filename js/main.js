flaga = false
flagb = false
function encrypt(plaintext, a, b) {
    for (i = 0; i < plaintext.length; i++) {
        plaintext[i] = String.fromCharCode((((a * (plaintext[i].charCodeAt(0) - 65)) + b) % 26) + 65)
    }
    return plaintext.join("").replaceAll(" ", "").toUpperCase()
}

function decrypt(ciphertext, inv, b) {
    for (i = 0; i < ciphertext.length; i++) {
        ciphertext[i] = inv * ((ciphertext[i].charCodeAt(0) - 65) - b) % 26
        while (ciphertext[i] < 0) {
            ciphertext[i] = 26 + ciphertext[i]
        }
        ciphertext[i] = String.fromCharCode(ciphertext[i] + 65)
    }
    return ciphertext.join("").replaceAll(" ", "").toUpperCase()
}

function inv(a) {
    for (i = 1; i <= 26; i++) {
        if (a * i % 26 == 1) {
            return i
        }
    }
    return -1
}

function display(h2, result) {
    container = document.createElement("div")
    box = document.createElement("div")
    header = document.createElement("h2")
    header.textContent = h2
    Line = document.createElement("hr")
    textarea = document.createElement("textarea")
    textarea.style = "resize:none; pointer-events: none; width: 100%; height:130px;"
    textarea.textContent = result
    button = document.createElement("button")
    button.textContent = "Close"
    button.addEventListener("click", () => {
        document.body.removeChild(container);
    })
    container.classList.add("result")
    box.appendChild(header)
    box.appendChild(Line)
    box.appendChild(textarea)
    box.appendChild(button)
    container.appendChild(box)
    document.querySelector("body").appendChild(container)
}

textarea = document.querySelector("form  textarea")
textarea.addEventListener("keypress", e => {
    if (!((e.key >= 'A' && e.key <= 'Z') || e.key === ' ')) {
        e.preventDefault()
    }
})

textarea.addEventListener("blur", () => {
    if (textarea.value.trim() == "") {
        textarea.style = "border:3px solid red"
    }
    else {
        textarea.style = "border:3px solid green"
    }
})

a = document.querySelector("input")
b = document.querySelectorAll("input")[1]
a.addEventListener("blur", () => {
    if (inv(a.value) != -1) {
        a.style = "border:3px solid green"
        flaga = true
    }
    else {
        a.style = "border:3px solid red"
        flaga = false
    }
})

b.addEventListener("blur", () => {
    if (b.value != "") {
        b.style = "border:3px solid green"
        flagb = true
    }
    else {
        b.style = "border:3px solid red"
        flagb = false
    }
})

change = document.querySelector("form > p ")
change.addEventListener("click", () => {
    h2 = document.querySelector("h2")
    label = document.querySelector("label")
    p = document.querySelector("form > p ")
    textarea = document.querySelector("textarea")

    if (p.textContent == "Go to Decrypt") {
        p.textContent = "Go to Encrypt"
        label.textContent = "ciphertext"
        textarea.placeholder = "Enter the ciphertext"
        textarea.value = ""
        h2.textContent = "Decrypt"
        a.value = ""
        b.value = ""
    }
    else {
        p.textContent = "Go to Decrypt"
        label.textContent = "plaintext"
        textarea.placeholder = "Enter the plaintext"
        h2.textContent = "Encrypt"
        textarea.value = ""
        a.value = ""
        b.value = ""
    }
})

button = document.querySelector("button")
button.addEventListener("click", e => {
    textarea = document.querySelector("form  textarea")
    e.preventDefault()
    h2 = document.querySelector("h2").textContent
    if (textarea.value.trim() == "") {
        textarea.style = "border:3px solid red"
    }
    if (!flaga) {
        a.style = "border:3px solid red"
    }
    if (!flagb) {
        b.style = "border:3px solid red"
    }
    if (h2 == "Encrypt" && textarea.value.trim() != "" && flaga && flagb) {
        display("ciphertext", encrypt(textarea.value.trim().split(" ").join("").split(""), parseInt(a.value), parseInt(b.value)))
    }
    else if (h2 == "Decrypt" && textarea.value.trim() != "" && flaga && flagb) {
        display("plaintext", decrypt(textarea.value.trim().split(" ").join("").split(""), inv(parseInt(a.value)), parseInt(b.value)))
    }
})
