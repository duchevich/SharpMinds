function init(){
    var textarea = document.createElement('textarea');
    textarea.setAttribute('id', 'textarea');
    
    var submit = document.createElement('input');
    submit.setAttribute('type', 'submit');
    submit.setAttribute('value', 'Send');
    submit.setAttribute('id', 'submit');
    
    
    
    var form = document.createElement('form');
    form.setAttribute('id', 'form');
    form.appendChild(textarea);
    form.appendChild(submit);
    
    
    var screen = document.createElement('div');
    screen.setAttribute('id', 'screen');
    
    var chat = document.createElement('div');
    chat.setAttribute('id', 'chat');
    chat.appendChild(screen);
    chat.appendChild(form);
    
    var app = document.getElementById('app');
    app.appendChild(chat);
}
function createMessageBlock(msg){
    var messageBlock = document.createElement('div');
    messageBlock.innerHTML = msg;
    var screen = document.getElementById('screen');
    screen.appendChild(messageBlock);
}
function bot(msg){
    if(msg == ''){
        createMessageBlock('Empty field');
    }
    else{
        createMessageBlock('Hello!');
    }
}
init();

submit.addEventListener('click', function(e){
    e.preventDefault();
    var message = textarea.value;
    createMessageBlock(message);
    bot(message);
    textarea.value = '';
})


var module = (function () {
    //private
    return {
    //public
    }
}());