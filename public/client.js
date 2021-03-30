let socket = io()
socket.on('connect', () => {
})


$(() => {

    let btnLogin = $('#login')
    let username = $('#username')
    let password = $('#password')
    let btnSend = $('#btnSend')
    let inpMsg = $('#inpMsg')
    let loginDiv = $('#loginDiv')
    let msgDiv = $('#msgDiv')
    let sendTo = $('#sendTo')


    btnLogin.click(() => {
        let user = username.val()
        let pass = password.val()
        socket.emit('login', {
            user: user,
            pass: pass
        })

    })

    socket.on('logged_in', () => {
        msgDiv.show()
        loginDiv.hide()
    })

    socket.on('login_failed', () => {
       window.alert("wrong password or username")
       username.val("")
       password.val("")
    })

    btnSend.click(() => {
        socket.emit('message', {
            to: sendTo.val(),
            msg: inpMsg.val()
        })
        sendTo.val("")
        inpMsg.val("")
    })

    socket.on('msg_recvd', (data) => {
        $('#msgList').append($('<li>' ).text(
            `[${data.from}]:${data.msg}`
        ))
    })




})