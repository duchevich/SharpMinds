var bot = (function () {
    this.message = 'aaa';
    var systemAnswer = '';
    var questType = '';
    
    // var constructor = function(msgObj){
    //     msgObj.message == '' ? this.message = 'Hello' : this.message = msgObj.message;
    //     msgObj.systemAnswer == '' ? this.systemAnswer = 'Hello' : this.systemAnswer = msgObj.systemAnswer;
    //     msgObj.questType == '' ? this.questType = 'Hello' : this.questType = msgObj.questType;
    // }
    return function(obj){
        this.message += obj;
        console.log(this.message);
    };
   
}());


mytext.addEventListener('keyup', function(e){
    if (e.keyCode == 13){
        var message = mytext.value;
        bot(message)
        mytext.value = '';
    }
   
})