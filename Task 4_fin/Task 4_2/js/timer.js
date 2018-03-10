class Timer extends Time{
    constructor(){
        super();
        this.setIntId;
        this.secTimer = '00';
        this.minTimer = '00';
        this.windowTimer = document.getElementById('app');
    }
    
    setTimer(timerObj){
        this.minTimer = timerObj.minTimer;
        this.secTimer = timerObj.secTimer;
        this.printTimerWindow();
    }

    addTimerEvent(setTimer){
		let timerSubmit = document.getElementById('timerSubmit');
		let timerInput = document.getElementById('timerInput');
		timerSubmit.addEventListener('click', function(e){
			e.preventDefault();
			let timeValue = timerInput.value.trim();
			if(timeValue != ''){
                let timerObj = {};
				timerObj.minTimer = timeValue.substr(0, 2);
				timerObj.secTimer = timeValue.substr(3, 2);
				setTimer(timerObj);
			}
		})
	}

    printTimerForm(){
		let timerStr =`<form id="timerForm" action="" method="get">
						<input type="time" placeholder="Время" id="timerInput" required />
						<input type="submit" id="timerSubmit" value="Добавить" />
						</form>
						`;
		this.windowTimer.innerHTML = timerStr;
	}

    printTimerWindow(){
        let timerStr =`<h1>Осталось:</h1>
                        <h2><span id="minTimerSpan">${this.minTimer}</span> : <span id="secTimerSpan">${this.secTimer}</span></h2>
						`;
		this.windowTimer.innerHTML = timerStr;
	}

    checkTimer(){
        console.log('tik');
        if(this.hours == this.hourTimer && this.mins == this.minTimer && this.seconds == '00'){
            alert('Awake');
        }
    }

    stop(){
        clearInterval(this.setIntId);
    }

    init(){
        super.init();
        this.printTimerForm();
        this.addTimerEvent(this.setTimer.bind(this));
        this.setIntId = setInterval(() =>this.checkTimer(), 1000);
    }
}