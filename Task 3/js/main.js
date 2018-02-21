(function () {

    let currentTime,
        week,
        day,
        mounth,
        hours,
        mins,
        seconds,
        ld;

    let current = () => {
        currentTime = new Date();
    }

    let weekTime = () => {
        week = currentTime.getDay();
        weekSpan.innerText = weekArr[week];
    }

    let dayTime = () => {
        day = currentTime.getDate();
        daySpan.innerText = day;
    }

    let mounthTime = () => {
        mounth = currentTime.getMonth();
        mounthSpan.innerText = mounthArr[mounth];
    }

    let hoursTime = () => {
        hours = currentTime.getHours(); 
        hours = hours < 10 ? '0' + hours : hours;
        hoursDiv.innerText = hours;
    }

    let minsTime = () => {
        mins = currentTime.getMinutes(); 
        mins = mins < 10 ? '0' + mins : mins;
        minsDiv.innerText = mins;
    }

    let secondsTime = () => {
        seconds = currentTime.getSeconds(); 
        seconds = seconds < 10 ? '0' + seconds : seconds;
        secsDiv.innerText = seconds;
    }

    let daysLeft = () =>{
        let startDate = new Date();
        let finishDate = new Date(2019, 0, 1);
        let today = startDate.getTime();
        let finish = finishDate.getTime();
        ld = parseInt((finish - today)/86400000); // 1000 * 60 * 60 * 24
        leftDaysSpan.innerText = ld;
    }

    let words = () => {
        ld > 100 ? ld %= 100 : ld;
		let rem = ld % 10;
		if( ld > 4 && ld < 21){
            leftDaysWordSpan.innerText = daysArr[2];
		}
		else if(rem === 1){
			leftDaysWordSpan.innerText = daysArr[0];
		}
		else if(rem > 1 && rem < 5){
			leftDaysWordSpan.innerText = daysArr[1];
		}
		else{
			leftDaysWordSpan.innerText = daysArr[0];
		}
	}

    let nowtime = () => {
        current();
        weekTime();
        dayTime();
        mounthTime();
        hoursTime();
        minsTime();
        secondsTime();  
        daysLeft();     
        words();
    }
   
    setInterval(nowtime, 1000);

}());

