class Alarm extends Time{
	
	constructor(){
		super();
		this.alarms = [];
		this.windowAlarm = document.getElementById('app');
	}
	
	// редактирование будильника
	editAlarm(index){
		let form = document.getElementById('alarmForm');
		
		// если форма пустая
		if(form.innerHTML == ''){
			let alarmStr =`
						<input type="text" placeholder="Название будильника" id="nameInput" value="${this.alarms[index].name}" required />
						<input type="time" placeholder="Время" id="timeInput" value="${this.alarms[index].hour}:${this.alarms[index].min}" required />
						<input type="text" placeholder="Примечание" id="commentInput" value="${this.alarms[index].comment}" required />
						<input type="submit" id="alarmSubmit" value="Добавить" />	
						`;
			form.innerHTML = alarmStr;
			this.addNewAlarmTimeEvent(this.setNewAlarm.bind(this));
		}
		else{
			document.getElementById('nameInput').value = this.alarms[index].name;
			document.getElementById('timeInput').value = `${this.alarms[index].hour}:${this.alarms[index].min}`;
			document.getElementById('commentInput').value = this.alarms[index].comment;
		}
		this.alarms.splice(index, 1);
	}


	// событие на кнопке редактирования будильника
	editAlarmEvent(editAlarm){
		let editRowArr = document.querySelectorAll('.editRow');
		let len = editRowArr.length;
		for (let i = 0; i < len; i++) {
		    editRowArr[i].addEventListener('click', function(){
                editAlarm(i);
		    }, false);
		}
	}
	
	// удаление будильника
	removeAlarm(rem){
		this.alarms.splice(rem, 1);
		this.printNewAlarmStr();
		this.editAlarmEvent(this.editAlarm.bind(this));
		this.deleteAlarmEvent(this.removeAlarm.bind(this));
	}

	// событие на кнопке удаления будильника
	deleteAlarmEvent(removeAlarm){
		let delRowArr = document.querySelectorAll('.delRow');
		let len = delRowArr.length;
		for (let i = 0; i < len; i++) {
		    delRowArr[i].addEventListener('click', function(){
                removeAlarm(i);
		    }, false);
		}
	}

	// вывод таблицы будильников
	printNewAlarmStr(){
		let tableAlarm = '';
		this.alarms.forEach((item) =>{
			tableAlarm += `
						<tr data-id="${item.id}">
						<td class="col-md-2">${item.name}</td>	
						<td class="col-md-2">${item.hour} : ${item.min}</td>
						<td class="col-md-6">${item.comment}</td>
						<td class="col-md-1">
						<span class="editRow icon-pencil"></span>
						</td>
						<td class="col-md-1">
						<span class="delRow icon-cross"></span>
						</td>
						</tr>
				`;
		})
		let alarmList = document.getElementById('alarmList');
		alarmList.innerHTML = tableAlarm;
	}
	
	// добавление будильника в массив будильников
	setAlarm(alarmObj){
		this.alarms.push(alarmObj);
    }
	
	
	setNewAlarm(alarmObj){
        this.setAlarm(alarmObj);
        this.printNewAlarmStr();
        this.editAlarmEvent(this.editAlarm.bind(this));
        this.deleteAlarmEvent(this.removeAlarm.bind(this));
    }

	addNewAlarmTimeEvent(){
		
		let alarmSubmit = document.getElementById('alarmSubmit');
		let nameInput = document.getElementById('nameInput');
		let timeInput = document.getElementById('timeInput');
		let commentInput = document.getElementById('commentInput');
		
		
		alarmSubmit.addEventListener('click', function(e){
			e.preventDefault();
			let timeValue = timeInput.value.trim();
			if(timeValue != ''){
          
                this.setNewAlarm({
                  id: Date.now(),
				  		hour : timeValue.substr(0, 2),
				  		min : timeValue.substr(3, 2),
				  		name : nameInput.value.trim(),
				  		comment : commentInput.value.trim()
                });
                
                nameInput.value = '';
                timeInput.value = '';
                commentInput.value = '';
			}
		}.bind(this))
	}
	
	// вывод формы для ввода нового будильника
	printAlarmWindow(){
		let alarmStr =`<form id="alarmForm" action="" method="get">
						<input type="text" placeholder="Название будильника" id="nameInput" required />
						<input type="time" placeholder="Время" id="timeInput" required />
						<input type="text" placeholder="Примечание" id="commentInput" required />
						<input type="submit" id="alarmSubmit" value="Добавить" />
						</form>
						<table id="alarmList"></table>	
						`;
		this.windowAlarm.innerHTML = alarmStr;
	}
	
	
	// вывод пустой формы(для дальнейшего редактирования) и таблицы будильников (кнопка просмотра списка будильников)
	printAlarmTable(){
		let alarmStr =`<form id="alarmForm" action="" method="get"></form>
						<table id="alarmList"></table>`;
		this.windowAlarm.innerHTML = alarmStr;
		
	}
	
	
	initAlarm(){
		// вывод формы и контейнера для будильников
		this.printAlarmWindow();
		
		// событие на кнопке добавления нового будильника
		this.addNewAlarmTimeEvent(this.setNewAlarm.bind(this));
		
		// добавление строки нового будильника в таблицу будильников
		this.printNewAlarmStr();
		
		// событие на кнопке редактирования будильника
		this.editAlarmEvent(this.editAlarm.bind(this));
		
		// событие на кнопке удаления будильника
		this.deleteAlarmEvent(this.removeAlarm.bind(this));
    }

	// проверка будильников
    checkAlarm(){
		if(this.alarms.length > 0){
			this.alarms.forEach((item) => {
				if(this.hours == item.hour && this.mins == item.min && this.seconds == '00'){
					alert('Awake');
				}
			});
		}
    }
    
    
	// метод инициализации будильника
    init(){
    	
    		// инициализация часов
        super.init();
        
        // инициализация будильника
        setInterval(() =>this.checkAlarm(), 1000);
    }
}
       
