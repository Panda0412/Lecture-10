function submitForm() {
    fetch("/", {
            method: "POST",
            body: JSON.stringify({name: nameInput.value, msg: msgInput.value, replyTo: replyToInput.value})
        }
    ).then(response => response.json())
        .then(json => {
            if (json["success"]) {
                msgInput.value = ""
                replyToInput.value = ""
            }
            errorDiv.innerText = json["err"]
        })
    return false;
}

function applyFilter() {
    socket.send(filterInput.value)
    return false
}

var socket = new WebSocket("ws://" + location.host + "/subscribe");
socket.onmessage = function (ev) {
    messageList.innerHTML = ev.data
}