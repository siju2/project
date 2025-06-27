window.onload = function () {
    const savedToDoList = JSON.parse(localStorage.getItem('todolist'));
    if (savedToDoList) {
        for (let todo of savedToDoList) {
            createToDo(todo);
        }
    }

    const startBtn = document.querySelector("#addBtn");
    startBtn.addEventListener("click", function () {
        const inputBox = document.querySelector('#inputBox');
        createToDo({ contents: inputBox.value, check: false });
        inputBox.value = ""; // 추가됨: 입력하면 값이 초기화됨
    });

    const inputBox = document.querySelector('#inputBox');
    inputBox.addEventListener("keydown", function (event) {
        if (event.key === 'Enter') {
            createToDo({ contents: inputBox.value, check: false });
            inputBox.value = "";
        }
    });

    // 추가됨: 전체 삭제 기능
    if (!document.querySelector("#clearAllBtn")) {
        const clearAllBtn = document.createElement("button");
        clearAllBtn.id = "clearAllBtn";
        clearAllBtn.innerText = "전체 삭제";
        clearAllBtn.style.marginTop = "10px";
        clearAllBtn.onclick = function () {
            if (confirm("모든 할 일을 삭제하시겠습니까?")) {
                localStorage.removeItem('todolist');
                document.querySelector('#todolist').innerHTML = '';
                document.querySelector('#todolist').style.display = 'none';
            }
        };
        document.querySelector(".subcontainer").appendChild(clearAllBtn);
    }
}

function createToDo(todo) {
    if (!todo || !todo.contents.trim()) return;

    const liNode = document.createElement('li');

    const checkBtn = document.createElement('button');
    checkBtn.classList.add("checkBtn");

    const todoText = document.createElement('span');
    todoText.innerText = todo.contents;
    if (todo.check) {
        todoText.classList.add('check');
        checkBtn.innerText = "V";
    }

    checkBtn.addEventListener("click", function () {
        todoText.classList.toggle('check');
        checkBtn.innerText = todoText.classList.contains('check') ? 'V' : '';
        saveToDoList();
    });

    // 추가됨: 편집 기능버튼 //
    const editBtn = document.createElement('button');
    editBtn.innerText = "편집";
    editBtn.classList.add("editBtn");
    editBtn.style.marginLeft = "7px";
    editBtn.onclick = function () {
    // 추가됨 :편집기능 버튼 //

        // 추가됨: 편집 입력창 UI //
        const editInput = document.createElement('input');
        editInput.type = "text";
        editInput.value = todoText.innerText;
        editInput.style.fontSize = "1em";
        editInput.style.marginRight = "5px";

        const saveBtn = document.createElement('button');
        saveBtn.innerText = "저장";
        saveBtn.style.marginRight = "5px";
        saveBtn.onclick = function () {
            todoText.innerText = editInput.value;
            liNode.replaceChild(todoText, editInput);
            liNode.replaceChild(editBtn, saveBtn);
            liNode.replaceChild(delBtn, cancelBtn);
            saveToDoList();
        };

        const cancelBtn = document.createElement('button');
        cancelBtn.innerText = "취소";
        cancelBtn.onclick = function () {
            liNode.replaceChild(todoText, editInput);
            liNode.replaceChild(editBtn, saveBtn);
            liNode.replaceChild(delBtn, cancelBtn);
        };

        liNode.replaceChild(editInput, todoText);
        liNode.replaceChild(saveBtn, editBtn);
        liNode.replaceChild(cancelBtn, delBtn);

        editInput.focus();
    };
    //추가됨: 편집입력창 UI 

    const delBtn = document.createElement('button');
    delBtn.innerText = 'x';
    delBtn.classList.add("delBtn");
    delBtn.addEventListener("click", function () {
        liNode.remove();
        saveToDoList();
    });

    liNode.appendChild(checkBtn);  
    liNode.appendChild(todoText);  
    liNode.appendChild(editBtn);   // 추가됨: 편집 버튼
    liNode.appendChild(delBtn);

    const ulNode = document.querySelector('ul');
    ulNode.appendChild(liNode);

    document.querySelector('#todolist').style.display = 'block';

    saveToDoList();
}

function saveToDoList() {
    const todoList = document.querySelectorAll('li');
    const saveItems = [];

    for (let node of todoList) {
        // 추가됨 : 편집중일때 입력 한거 저장하는 기능
        let text = '';
        if(node.querySelector('input')) {
            text = node.querySelector('input').value;
        } else {
            text = node.querySelector('span').innerText;
        }
        const todoObj = {
            contents: text,
            check: node.querySelector('span') ? node.querySelector('span').classList.contains('check') : false
        };
        saveItems.push(todoObj);
    }

    localStorage.setItem('todolist', JSON.stringify(saveItems));
}
