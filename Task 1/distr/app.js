(function () {
	let message = '';
    let count = 0;
    let branch = 0;
	let user = false;
	let questionsArray = [
				'Здравствуйте! Рады Вас видеть в нашем цветочном магазине',
				'Вы хотите купить у нас цветы?',
				'Вы хотите купить букет или растение в горшке?',
				'Букет из каких цветов Вы хотите купить?', 
				'Какое комнатное растение Вы хотите купить?', 
				'Как Вам удобно оплатить товар?',
				'Упаковать товар в подарочную упаковку?',
				'Спасибо за покупку!',
				'К сожалению у нас нет таких цветов',
				'К сожалению у нас нет таких растений',
				'К сожалению у нас нет таких товаров',
				'Возможно Вас интересует уход за растениями?',
				'Не могу разобрать Ваш ответ',
				'Номер нашей карты: 1234 5678 9012 3456',
				'Номер нашей карты: 1234 5678 9012 3456 также Вы можете оплатить товар курьеру',
				'Укажите название растения и ваш е-mail, мы вышлем Вам рекомендации по уходу за Вашим растением на почту',
				'Вы всегда можете получить консультацию по уходу за растениями. Для этого достаточно написать нам на e-mail test@mail.ru'
			];
    
    var timeSet = function(){
        let date = new Date();
        let min = date.getMinutes();
        let hour = date.getHours();
        return hour + ':' + min;
    }

	var createMessageBlock = function(msg, user){

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
		    messageBlock.innerHTML = `<div class="msj-rta macro">
		                        <div class="text text-r">
		                            <p>${msg}</p>
		                            <p><small>${time}</small></p>
		                        </div>
		                    <div class="avatar">User</div>`;
		}
		screen.appendChild(messageBlock);
	}

	mytext.addEventListener('keyup', function(e, message){
		if (e.keyCode == 13){        
		    message = mytext.value;
		    user = true;
		    createMessageBlock(message, user);
		    count++;
		    bot(message);
		    mytext.value = '';
		}
	   
	});
	function scroll(){
        // console.log('scrool');
        // document.getElementById('screen').scrollTop = 999999;

        var block = document.getElementById("screen");
        block.scrollTop = block.scrollHeight;
    }
    var bot =  function(message){
        if(count == 0){
            setTimeout( function(){createMessageBlock(questionsArray[0], false)}, 500)
        }
        if(count == 1){
        	
            createMessageBlock(questionsArray[1], false);
        }
        if(count == 2){
            if(message.toLowerCase() == 'да') {
            	
                createMessageBlock(questionsArray[2], false);
            }
            else{
                createMessageBlock(questionsArray[11], false);
                count = 6;
            }
        }
        if(count == 3){
            if(message.toLowerCase() == 'букет') {
                createMessageBlock(questionsArray[3], false);
            }
            else if(message.toLowerCase() == 'растение в горшке') {
                createMessageBlock(questionsArray[4], false);
                branch = 1;
            }
            else{
                createMessageBlock(questionsArray[12], false);
            }
        }
        if(count == 4 && branch == 0){
            if(message.search(/(роз|гербер|гвоздик)/) != -1) {
                createMessageBlock(questionsArray[5], false);
            }
            else{
                createMessageBlock(questionsArray[8], false);
            }
        }
        if(count == 4 && branch == 1){
            if(message.search(/(орхиде|кактус|драцен)/) != -1) {
                createMessageBlock(questionsArray[5], false);
            }
            else{
                createMessageBlock(questionsArray[9], false);
            }
        }
        if(count == 5){
            if(message.search(/(безналичн|карт|перевод)/) != -1) {
                createMessageBlock(questionsArray[13], false);
                createMessageBlock(questionsArray[7], false);
            }
            else{
                createMessageBlock(questionsArray[14], false);
                createMessageBlock(questionsArray[7], false);                
            }
        }
        if(count == 7){
            if(message.toLowerCase() == 'да') {
                createMessageBlock(questionsArray[15], false);
            }
            else{
                createMessageBlock(questionsArray[16], false);
            }
        }
        scroll();
        
    };
   bot();
}());

