(function () {
	let message = '';
	let user = false;

    // return time string for chat
    let timeSet = function(){
        let date = new Date();
        let min = date.getMinutes();
        let hour = date.getHours();
        return hour + ':' + min;
    }

    // create html block for message and add it to screen block in chat
	let createMessageBlock = function(msg, user){
        let time = timeSet();
		var messageBlock = document.createElement('div');
		var screen = document.getElementById('screen');
		if (user == false){
		    messageBlock.innerHTML = `<div class="msj macro">
		                                <div class="avatar">Bot</div>
		                                <div class="text text-l">
		                                    <p>${msg}</p>
		                                    <p><small>${time}</small></p>
		                                </div>
		                            </div>`;                 
        }
        else{
		    messageBlock.innerHTML = `<div class="msj-rta msj-rta-right macro">
		                        <div class="text text-r">
		                            <p>${msg}</p>
		                            <p><small>${time}</small></p>
		                        </div>
		                    <div class="avatar">User</div>`;
		}
		screen.appendChild(messageBlock);
    }
    
    // shifts the field of view of the screen down
	let scroll = function (){
        var block = document.getElementById("screen");
        block.scrollTop = block.scrollHeight;
    }

    //analyzes the user message
    let messageAnalize = function(message, data){
        for(let key in data){
            var expr = new RegExp("(" + key + ")", "i");
            if(message.search(expr) != -1){
                 if(data[key] instanceof Object  ){
                    messageAnalize(message, data[key]);
                 }
                 else{
                    createMessageBlock(data[key], false);
                    break;
                 }
            }
        }
    }

    // chat bot
    let bot =  function(message){
        if(message){
            messageAnalize(message, data);
        }
        scroll();
    };

    mytext.addEventListener('keyup', function(e, message){
        if (e.keyCode == 13  && mytext.value != ""){        
            message = mytext.value;
            user = true;
            createMessageBlock(message, user);
            bot(message);
            mytext.value = '';
        }
    });
}());

