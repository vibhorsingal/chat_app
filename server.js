const express=require('express')
const app=express()

const http=require('http')
const server=http.createServer(app)

const socketio=require('socket.io')
const io=socketio(server)

app.use('/',express.static(__dirname+'/public'))

let users={
    vibhor:'singal'
}

let userSocket={

}

io.on('connection',(socket)=>{
    console.log("socket connection id: ",socket.id)

    socket.on('login',(data)=>{
        if(!users[data.user]){
            users[data.user]=data.pass
            socket.join(data.user)
            userSocket[socket.id]=data.user
            socket.emit('logged_in')
        }
        else{
            if(users[data.user]==data.pass){
                socket.join(data.user)
                userSocket[socket.id]=data.user
                socket.emit('logged_in')
            }
            else{
                socket.emit('login_failed')
            }
        }
        
    })

    socket.on('message',(data)=>{
        data.from=userSocket[socket.id]
        if(data.to){
            socket.to(data.to).emit('msg_recvd',data)
        }else{
            socket.broadcast.emit('msg_recvd',data)
        }
        
        console.log(data)
    })
})

server.listen(6789,()=>{
    console.log("server started at http://localhost:6789")
})

