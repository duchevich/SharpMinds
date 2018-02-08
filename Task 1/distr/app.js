var questType = false;
var user = false;
var questionsArray = [
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
]
var bot = (function () {
    this.message = '';
    this.count = 0;
    this.branch = 0;
    var questType = false;
    
    return function(obj){
        if(count == 0){
            setTimeout( function(){createMessageBlock(questionsArray[0], false)}, 500)
        }
        if(count == 1){
            createMessageBlock(questionsArray[1], false);
        }
        if(count == 2){
            if(obj.text.toLowerCase() == 'да') {
                createMessageBlock(questionsArray[2], false);
            }
            else{
                createMessageBlock(questionsArray[11], false);
                count = 6;
            }
        }
        if(count == 3){
            if(obj.text.toLowerCase() == 'букет') {
                createMessageBlock(questionsArray[3], false);
            }
            else if(obj.text.toLowerCase() == 'растение в горшке') {
                createMessageBlock(questionsArray[4], false);
                this.branch = 1;
            }
            else{
                createMessageBlock(questionsArray[12], false);
            }
        }
        if(count == 4 && this.branch == 0){
            if(obj.text.search(/(роз|гербер|гвоздик)/) != -1) {
                createMessageBlock(questionsArray[5], false);
            }
            else{
                createMessageBlock(questionsArray[8], false);
            }
        }
        if(count == 4 && this.branch == 1){
            if(obj.text.search(/(орхиде|кактус|драцен)/) != -1) {
                createMessageBlock(questionsArray[5], false);
            }
            else{
                createMessageBlock(questionsArray[9], false);
            }
        }
        if(count == 5){
            if(obj.text.search(/(безналичн|карт|перевод)/) != -1) {
                createMessageBlock(questionsArray[13], false);
                createMessageBlock(questionsArray[7], false);
            }
            else{
                createMessageBlock(questionsArray[14], false);
                createMessageBlock(questionsArray[7], false);                
            }
        }
        if(count == 7){
            if(obj.text.toLowerCase() == 'да') {
                createMessageBlock(questionsArray[15], false);
            }
            else{
                createMessageBlock(questionsArray[16], false);
            }
        }
        // else{
        //     if(this.count == 0){
        //         createMessageBlock(questionsArray[count], false);

        //     }
        //     this.message = obj.text;
        //     this.systemAnswer = obj.user;
        //     this.questType = obj.questType;
        //     this.count++;
            
        // }
    };
   
}());







function createMessageBlock(msg, user){
    var messageBlock = document.createElement('div');
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

bot();
mytext.addEventListener('keyup', function(e, message){
    if (e.keyCode == 13){
        var message = {};        
        message.text = mytext.value;
        message.user = true;
        message.questType = questType;
        createMessageBlock(message.text, message.user);
        count++;
        bot(message);
        mytext.value = '';
        
        console.log(count);
    }
   
});