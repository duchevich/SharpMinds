class Table{

    constructor(){
		this.users = [];
		this.editUserFlag = false;
		this.checkAllFlag = false;
		this.checklFlag = false;
		this.tableTitle = document.getElementById('table-title');
		this.userList = document.getElementById('user-list');
		this.inputId = document.getElementById('inputId');
		this.inputName = document.getElementById('inputName');
		this.inputLogin = document.getElementById('inputLogin');
		this.inputEmail = document.getElementById('inputEmail');
		this.inputGender = document.getElementById('inputGender');
		this.inputCountry = document.getElementById('inputCountry');
		this.inputAvatar = document.getElementById('inputAvatar');
		this.detailsView = document.getElementById('details-view');
		this.mainView = document.getElementById('main-view');
		this.backButton = document.getElementById('back-btn');
		this.deleteButton = document.getElementById('deleteButton');
	}

    init(){
        this.users = JSON.parse(localStorage.getItem('data'));
        if(this.users == null){
            this.downloadData();
        }
        else{
            this.renderTable();
            this.usersHendler();
        }
    }

    setData(){
        localStorage.setItem('data', JSON.stringify(this.users));
    }

    downloadData(){
        fetch('https://gist.githubusercontent.com/duchevich/cd0f4e99029751663cc8d34cdd74ace9/raw/2f2a0452c9994f3a64c81e0202cd1b22d9a7a094/data.json')
                .then(response => response.json())
                .then(json => {
                    this.users = json;
                    this.renderTable();
                    this.usersHendler();
                    localStorage.setItem('data', JSON.stringify(json))}
                );
    }

    toggleTable(){
        this.tableTitle.classList.toggle('hide');
        this.mainView.classList.toggle('hide');
        this.detailsView.classList.toggle('hide');
    }


    renderTable(){
        let tableStr = '';
        this.users.forEach((item, i) =>{
            tableStr += `<tr data-id="${item.id}">
                        <td><input class="checkboxes" type="checkbox" name="check" value="${item.id}"></td>
                        <td>${i + 1}</td>
                        <td><img src="${item.avatar}"></td>
                        <td>${item.name}</td>
                        <td>${item.login}</td>
                        <td>${item.email}</td>
                        <td>${item.gender}</td>
                        <td>${item.country}</td>
                        <td>
                            <span class="editRow icon-pencil"></span>
                        </td>
                        <td>
                            <span class="delRow icon-cross"></span>
                        </td>
                        </tr>
                `;
        })
        this.userList.innerHTML = tableStr;
    }   

    usersHendler(){
        this.userList.addEventListener('click', (e) => {
            if (e.target.classList.contains('editRow')){
                let id = e.target.closest('tr').dataset.id;
                this.editUser(id);
            }
            if (e.target.classList.contains('delRow')){
                let id = e.target.closest('tr').dataset.id;
                this.removeUser(id);
            }
            if (e.target.classList.contains('checkboxes')){
                
            }
        });
    }

    // удаление данных пользователя
    removeUser(id){
        this.users.forEach((item, i) => {
            if(item.id == id){
                this.users.splice(i, 1);
                return;
            }
        });
        this.renderTable();
        this.setData();
    }

    // редактирование данных пользователя
    editUser(id){
        this.toggleTable();
        this.users.forEach((item, i) => {
            if(item.id == id){
                this.inputId.value = item.id;
                this.inputName.value = item.name;
                this.inputLogin.value = item.login;
                this.inputEmail.value = item.email;
                this.inputGender.value = item.gender;
                this.inputCountry.value = item.country;
                this.inputAvatar.value = item.avatar;
                return;
            }
        });
        this.editUserFlag = true;
    }

    // сохранение данных пользователя
    saveUser(){
        if(this.editUserFlag == true){
             this.users.forEach((item, i) => {
                if(item.id == this.inputId.value){
                    item.name = this.inputName.value;
                    item.login = this.inputLogin.value;
                    item.email = this.inputEmail.value;
                    item.gender = this.inputGender.value;
                    item.country = this.inputCountry.value;
                    item.avatar = this.inputAvatar.value;
                    return;
                }
            });
            this.renderTable();
            this.setData();
            this.editUserFlag = false;    
        }
        else{
            this.users.push({
                'id' : Date.now(),
                'name' : this.inputName.value,
                'login' : this.inputLogin.value,
                'email' : this.inputEmail.value,
                'gender' : this.inputGender.value,
                'country' : this.inputCountry.value,
                'avatar' : this.inputAvatar.value
            });
            this.renderTable();
            this.setData();
        }
        document.getElementById('userForm').reset();
    }

    // select/unselect all checkboxes
    checkAllBoxes(){
        let checkBoxes = document.querySelectorAll('.checkboxes');
        if (checkall.checked) {
            checkBoxes.forEach(function(item, i, checkBoxes){
                item.checked = true;
            });
            this.checkAllFlag = true;
        }
        else {
            checkBoxes.forEach(function(item, i, checkBoxes){
                item.checked = false;
            });
            this.checkAllFlag = false;
        }
    }

    testCheckboxes(){
        let checkBoxes = document.querySelectorAll('.checkboxes');
        checkBoxes.forEach(function(item, i, checkBoxes){
            if (item.checked == true){
                this.checkFlag = true;
            }
        });
    }


    toggleDeleteButton(){
        if(this.checkFlag == true || this.checkAllFlag == true){
            this.deleteButton.classList.remove('disabled');
        }
        else{
            this.deleteButton.classList.add('disabled');
        }
    }



}

