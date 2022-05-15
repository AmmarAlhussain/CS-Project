flagplaintext = false
flaga = false
flagb = false
function encrypt(plaintext, a, b) {
    for (i = 0; i < plaintext.length; i++) {
        plaintext[i] = ((a * (plaintext[i].charCodeAt(0) - 65)) + b) % 26
        while (plaintext[i] < 0) {
            plaintext[i] = 26 + plaintext[i]
        }

        plaintext[i] = String.fromCharCode(plaintext[i] + 65)
    }
    return plaintext.join("")
}

function decrypt(ciphertext, inv, b) {
    for (i = 0; i < ciphertext.length; i++) {
        ciphertext[i] = (inv * ((ciphertext[i].charCodeAt(0) - 65) - b)) % 26
        while (ciphertext[i] < 0) {
            ciphertext[i] = 26 + ciphertext[i]
        }
        ciphertext[i] = String.fromCharCode(ciphertext[i] + 65)
    }
    return ciphertext.join("")
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
textarea.addEventListener("blur", () => {
    h2 = document.querySelector("h2").textContent
    span = document.querySelector("Form Textarea").nextElementSibling
    message = textarea.value.replaceAll(" ", "").replaceAll("\n", "")
    if (message == "") {
        flagplaintext = false
        textarea.style = "border:3px solid red"
        if (h2 == "Encrypt") {
            span.textContent = "Plaintext is empty"
        }
        else {
            span.textContent = "Ciphertext is empty"
        }
    }
    else {
        for (i = 0; i < message.length; i++) {
            if ((message[i] >= 'A' && message[i] <= 'Z') || message[i] === ' ') {
                flagplaintext = true
                textarea.style = "border:3px solid green"
                span.textContent = ""
            }
            else {
                textarea.style = "border:3px solid red"
                if (h2 == "Encrypt") {
                    span.textContent = "Plaintext should contain Capital letters and space only"
                }
                else {
                    span.textContent = "Plaintext should contain Capital letters and space only"
                }
                flagplaintext = false
                break
            }
        }
    }
})

a = document.querySelector("input")
b = document.querySelectorAll("input")[1]
a.addEventListener("blur", () => {
    span = document.querySelectorAll("input")[0].nextElementSibling
    if (inv(a.value) != -1) {
        a.style = "border:3px solid green"
        flaga = true
        span.textContent = ""
    }
    else {
        a.style = "border:3px solid red"
        flaga = false
        if (a.value == "") {
            span.textContent = "Choose number"
        }
        else {
            span.textContent = "There no inverse for that number"
        }
    }
})

a.addEventListener("keypress", e => { if (e.key === '.') e.preventDefault(); })
a.addEventListener("paste", e => { e.preventDefault(); })

b.addEventListener("blur", () => {
    span = document.querySelectorAll("input")[1].nextElementSibling
    if (b.value != "") {
        b.style = "border:3px solid green"
        flagb = true
        span.textContent = ""
    }
    else {
        b.style = "border:3px solid red"
        span.textContent = "Choose Number"
        flagb = false
    }
})

b.addEventListener("keypress", e => { if (e.key === '.') e.preventDefault(); })
b.addEventListener("paste", e => { e.preventDefault(); })

change = document.querySelector("form > p ")
change.addEventListener("click", () => {
    h2 = document.querySelector("h2")
    label = document.querySelector("label")
    p = document.querySelector("form > p ")
    textarea = document.querySelector("form textarea")

    if (p.textContent == "Go to Decrypt") {
        p.textContent = "Go to Encrypt"
        label.textContent = "ciphertext"
        textarea.placeholder = "Enter the ciphertext"
        textarea.value = ""
        a.value = ""
        b.value = ""
        textarea.nextElementSibling.textContent = ""
        a.nextElementSibling.textContent = ""
        b.nextElementSibling.textContent = ""
        textarea.style.border = "none"
        a.style.border = "none"
        b.style.border = "none"
        h2.textContent = "Decrypt"
    }
    else {
        p.textContent = "Go to Decrypt"
        label.textContent = "plaintext"
        textarea.placeholder = "Enter the plaintext"
        textarea.value = ""
        a.value = ""
        b.value = ""
        textarea.nextElementSibling.textContent = ""
        a.nextElementSibling.textContent = ""
        b.nextElementSibling.textContent = ""
        textarea.style.border = "none"
        a.style.border = "none"
        b.style.border = "none"
        h2.textContent = "Encrypt"
    }
})

button = document.querySelector("button")
button.addEventListener("click", e => {
    textarea = document.querySelector("form  textarea")
    e.preventDefault()
    h2 = document.querySelector("h2").textContent
    msg = textarea.value.replaceAll(" ", "").replaceAll("\n", "").split("")
    textarea.focus()
    textarea.blur()
    a.focus()
    a.blur()
    b.focus()
    b.blur()
    if (h2 == "Encrypt" && flagplaintext && flaga && flagb) {
        display("ciphertext", encrypt(msg, parseInt(a.value), parseInt(b.value)))
    }
    else if (h2 == "Decrypt" && flagplaintext && flaga && flagb) {
        display("plaintext", decrypt(msg, inv(parseInt(a.value)), parseInt(b.value)))
    }
})
