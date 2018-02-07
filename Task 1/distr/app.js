var count = 0;
var questType = false;
var user = true;

function createMessageBlock(msg){
    var messageBlock = document.createElement('div');
    // messageBlock.innerHTML = msg;
    var screen = document.getElementById('screen');
    if (user == false){
        
        messageBlock.innerHTML = '<div class="msj macro">' +
                                    '<div class="avatar">Bot</div>' +
                                    '<div class="text text-l">' +
                                        '<p>'+ msg +'</p>' +
                                        '<p><small>'+'date'+'</small></p>' +
                                    '</div>' +
                                '</div>';                 
    }else{
        messageBlock.innerHTML = '<div class="msj-rta macro">' +
                            '<div class="text text-r">' +
                                '<p>'+msg+'</p>' +
                                '<p><small>'+ 'date' +'</small></p>' +
                            '</div>' +
                        '<div class="avatar">User</div>';
    }



    screen.appendChild(messageBlock);
}

var bot = (function () {
    this.message = '';
    var systemAnswer = 0;
    var questType = false;
    
    // var constructor = function(msgObj){
    //     msgObj.message == '' ? this.message = 'Hello' : this.message = msgObj.message;
    //     msgObj.systemAnswer == '' ? this.systemAnswer = 'Hello' : this.systemAnswer = msgObj.systemAnswer;
    //     msgObj.questType == '' ? this.questType = 'Hello' : this.questType = msgObj.questType;
    // }
    return function(obj){
        if(obj == undefined){
            setTimeout( function(){console.log('Hello!')}, 3000)
            createMessageBlock('Hello!')
            
        }
        else{
            this.message = obj.text;
            this.systemAnswer = obj.systemAnswer;
            this.questType = obj.questType;
            console.log(this.message);
            console.log(this.systemAnswer);
        }
    };
   
}());

bot();

mytext.addEventListener('keyup', function(e, message){
    if (e.keyCode == 13){
        var message = {};        
        message.text = mytext.value;
        message.systemAnswer = count;
        message.questType = questType;
        bot(message)
        mytext.value = '';
        count++;
    }
   
});