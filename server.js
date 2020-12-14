const path=require('path')
const express =require('express')
var app = express();
var http = require('http')
var server=http.createServer(app)
var socketio=require('socket.io')
var io=socketio(server)
var formatMessages=require('./utils/messages')
var {userJoin,getCurrentUser}=require("./utils/users")


var port=3001||process.env.PORT;

app.use(express.static(path.join(__dirname,'public')))

var botname='chat bot'

io.on('connection',(socket)=>{
    socket.emit('message',formatMessages(botname,"welcome to chat"));
    socket.on('joinchatroom',({username,room})=>{
        
        const user=userJoin(socket.id, username,room)

        socket.join(user.room)



        //This is for user who are connected

        socket.broadcast
        .to(user.room)
        .emit('message',formatMessages(botname,`${user.username} has joined the chat`));//This for all the client accept the client which is connecting
    })
   
    

   //io.on();//This for all the client in general
  

   //listen for chat messages
   socket.on('chatmessage',(msg)=>{
    
     
       io.emit('message',formatMessages('user',msg))
   })



   //runs when client disconnect
   socket.on('disconnect',()=>{
    io.emit('message',formatMessages(botname,'A user has left the chat'))
})
})

server.listen(port,()=>{
    console.log(`App is listening on ${port}`)
})