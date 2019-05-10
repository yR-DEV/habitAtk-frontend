document.addEventListener('DOMContentLoaded', () => {
    const endPoint = 'https://calm-anchorage-88997.herokuapp.com/api/v1/habits';
    // const endPoint = 'http://localhost:3000/api/v1/habits';
    const habitDivRow = document.getElementById("habit-row");
    const newHabitForm = document.querySelector(".form-new-habit");

    newHabitForm.style.display = "none";
    const habitRowsContainerDiv = document.querySelector(".habits-container");
    const newHabitInput = document.querySelector("#input-habit-name");

    const newHabitBtn = document.querySelector(".btn-new-habit");  
    const newHabitBtnPost = document.querySelector(".btn-post-new-habit");
    const habitBtnEvent = document.querySelector('#habit-row');
    const habitBtnUpdate = document.querySelector('.btn-update-new-habit');
    habitBtnUpdate.style.display = "none";
    
    const destroyHabitBtn = document.querySelector(".btn-destroy-habit");

    const main = () => {
        clearHabitDivs();
        let requestBody = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }
        performFetch(endPoint, requestBody, "GET");
    };

    const splitHabits = (habitArray) => {
        habitArray.forEach(habit => {
            createHabitDiv(habit);
        });
    };

    const performFetch = (apiEndPoint, requestObject, requestMethod) => {
        fetch(endPoint, requestObject)
            .then(response => response.json()) 
            .then(res => {
                if (requestMethod === "GET") {
                    splitHabits(res);    
                }
            });    
    };

    const clearHabitDivs = () => {
        while (habitDivRow.firstChild) {
            habitDivRow.removeChild(habitDivRow.firstChild);
        };
    };

    const appendHabitDiv = (largeHabitDiv) => {
        let newHabitDiv = document.createElement("div");
        newHabitDiv.classList.add("col-xl-3");
        newHabitDiv.classList.add("mb-4");
        habitDivRow.appendChild(newHabitDiv);
        newHabitDiv.innerHTML = largeHabitDiv;  
    };

    // need to add 3 columns to this row, left one for button, middle for name, right one for edit/destroy buttons
    const createHabitDiv = (habit) => {
        let habitDiv = `
                <div id="card-span" class="card shadow h-100 py-2">
                    <div class="card-body">
                        <div class="row no-gutters align-items-center">
                            <div class="col-sm mr-2">
                                <div class="titanic titanic-checkbox"></div>
                                <div class="text-xs font-weight-bold text-success text-uppercase mb-1"> 
                                    ${habit.id}  NEVER YOU'RE NOT MY REAL DAD
                                </div>
                                <div class="h5 mb-0 font-weight-bold text-gray-800">${habit.name}</div>
                                <div class="row">
                                    <input id="${habit.id}" name="${habit.name} type="button" class="btn btn-warning btn-edit-habit" value="EDIT" />
                                    <br>
                                    <br>
                                    <input id="${habit.id}" name="${habit.name} type="button" class="btn btn-danger btn-destroy-habit" value="DUH-STROY" />
                                </div>    
                            </div>
                        </div>
                    </div>
                </div>
        `;
        appendHabitDiv(habitDiv);
    };

    newHabitBtn.addEventListener('click', (event) => {
        newHabitForm.style.display = (content.dataset.toggled ^= 1) ? "block" : "none";
        document.querySelector("#input-habit-name").value = "";
    });

    newHabitBtnPost.addEventListener('click', (event) => {
        newHabitForm.style.display = (content.dataset.toggled ^= 1) ? "block" : "none";
        if(document.querySelector("#input-habit-name").value !== "") {
            let postBody = {
                name: document.querySelector("#input-habit-name").value,
                user_id: 1
            }
            let requestObject = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(postBody)
            };
            performFetch(endPoint, requestObject, "POST");
            document.querySelector("#input-habit-name").value = "";
            main();
        }     
    });

    const destroyHabit = (habitId) => {
        fetch(`${endPoint}/${habitId}`, { method: "DELETE" })
            .then(response => main());
    };

    const editHabit = (habitName, habitId) => {
        let editHabitId = habitName.pop();
        let editHabitName = habitName.join(" ");
        newHabitInput.value = editHabitName;
        // let patchBody = {
        //     name: newHabitInput.value,
        //     user_id: 1
        // }
        habitBtnUpdate.style.display = "block";
        habitBtnUpdate.name = habitId
        newHabitBtnPost.style.display = "none";
    }

    habitBtnEvent.addEventListener('click', (event) => {
        if (event.target.value === "EDIT") {
            newHabitForm.style.display = (content.dataset.toggled ^= 1) ? "block" : "none";
            let habitEditName = (event.target.name).split(' ');
            habitEditName.pop();
            habitEditName.push(event.target.id)
            theHabitId = event.target.id;
            editHabit(habitEditName, theHabitId)
        } else if (event.target.value === "DUH-STROY") {
            destroyHabit((event.target.id).split(' ')[0]);
        }
    });

    habitBtnUpdate.addEventListener('click', (event) => {
        newHabitForm.style.display = (content.dataset.toggled ^= 1) ? "block" : "none";
        let habitEditId = habitBtnUpdate.name;
        habitBtnUpdate.style.display = "none";
        newHabitBtnPost.style.display = "block";
        let newHabitName = document.querySelector("#input-habit-name").value;
        let patchBody = {
            name: newHabitName,
            user_id: 1
        }        
        fetch(`${endPoint}/${habitEditId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(patchBody)
        }).then(response => console.log(response))
        .then(res => {
            main();
        })
    })


    main();
});