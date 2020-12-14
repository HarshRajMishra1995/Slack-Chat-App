var chatForm=document.getElementById('chat-form')
const socket=io();

const chatMessages=document.querySelector('.chat-messages');

const{username,room}=Qs.parse(location.search,{
    ignoreQueryPrefix:true
})
// console.log(username,room)

socket.on('joinchatroom',{username,room})

socket.on('message',(message)=>{
    console.log(message)
    outputMessage(message);

    //scroll down
     
    chatMessages.scrollTop=chatMessages.scrollHeight

})

chatForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    var msg=e.target.elements.msg.value;
   // console.log(msg)

   socket.emit('chatmessage',msg);

   //clear the inputs
   e.target.elements.msg.value=''
   e.target.elements.msg.focus()
})

function outputMessage(message){
    const div=document.createElement('div');
    div.classList.add('message');
    div.innerHTML=`	<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}