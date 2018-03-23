class TableController {
    
// обработчик событий экрана таблицы пользователей
usersHendler(){
    this.mainView.addEventListener('click', (e) => {
        if (e.target.classList.contains('editRow')){
            let id = e.target.closest('tr').dataset.id;
            this.editUser(id);
        }
        if (e.target.classList.contains('delRow')){
            let id = e.target.closest('tr').dataset.id;
            this.removeUser(id);
        }
        if (e.target.classList.contains('checkboxes')){
            this.testCheckboxes();
            this.toggleDeleteButton();
        }
         if (e.target.classList.contains('select-all')){
              this.checkAllBoxes();
            this.testCheckboxes();
            this.toggleDeleteButton();
        }
        if (e.target.id == 'addButton'){
              this.toggleTable();
        }
        if (e.target.id == 'deleteButton'){
            if(this.checkAllFlag == true){
                this.removeAllUsers();
                this.checkall.checked = false;
                this.checkAllFlag = false;
            }
            if(this.checkFlag == true){
                this.removeUsersArray();
                this.checkFlag = false;
                this.toggleDeleteButton();
            }
        }
    });
}

// обработчик событий экрана формы ввода данных пользователя
userFormHendler(){
    this.inputSubmit.addEventListener('click', (e) => {
        e.preventDefault();
        this.saveUser();
        this.toggleTable();
    })
    this.backButton.addEventListener('click', (e) => {
        this.toggleTable();
        document.getElementById('userForm').reset();
        this.editUserFlag = false;
    })
}





}