document.addEventListener('DOMContentLoaded', () => {
    // alert('LOADED BREH');
    // const endPoint = 'https://calm-anchorage-88997.herokuapp.com/api/v1/habits';
    const endPoint = 'http://localhost:3000/api/v1/habits';
    const habitDivRow = document.getElementById("habit-row");
    const newHabitForm = document.querySelector(".form-new-habit");

    newHabitForm.style.display = "none";
    const habitRowsContainerDiv = document.querySelector(".habits-container");

    const newHabitBtn = document.querySelector(".btn-new-habit");  
    const newHabitBtnPost = document.querySelector(".btn-post-new-habit");
    const habitBtnEvent = document.querySelector('#habit-row');
    // console.log(habitBtnEvent);
    
    const destroyHabitBtn = document.querySelector(".btn-destroy-habit");

    const main = () => {
        clearHabitDivs();
        fetch(endPoint)
        .then(response => response.json())
        .then(res => splitHabits(res))

        const splitHabits = (habitArray) => {
            habitArray.forEach(habit => {
                createHabitDiv(habit);
            });
        };
    };

    const clearHabitDivs = () => {
        while (habitDivRow.firstChild) {
            habitDivRow.removeChild(habitDivRow.firstChild);
        };
    };
        
    main();

    const appendHabitDiv = (largeHabitDiv) => {
        // console.log(largeHabitDiv);
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
                                    <input id="${habit.id}" type="button" class="btn btn-warning btn-edit-habit" value="EDIT" />
                                    <br>
                                    <br>
                                    <input id="${habit.id} type="button" class="btn btn-danger btn-destroy-habit" value="DUH-STROY" />
                                </div>    
                            </div>
                        </div>
                    </div>
                </div>
        `;
            appendHabitDiv(habitDiv);
            const editHabitBtn = document.querySelector(".btn-edit-habit");
            // createEditEventListeners(editHabitBtn, habit)
    };


    newHabitBtn.addEventListener('click', (event) => {
        newHabitForm.style.display = (content.dataset.toggled ^= 1) ? "block" : "none";
    });

    newHabitBtnPost.addEventListener('click', (event) => {
        newHabitForm.style.display = (content.dataset.toggled ^= 1) ? "block" : "none";
        let newHabitName = document.querySelector("#input-habit-name").value;
        console.log(newHabitName);
        let postBody = {
            name: newHabitName,
            user_id: 1
        }
        fetch(endPoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(postBody)
        }).then(response => {
            console.log(response);
            main();
        });
    });

    const destroyHabit = (habitId) => {
        console.log(habitId);
        fetch(`${endPoint}/${habitId}`, { method: "DELETE" })
            .then(response => console.log(response))
            .then(res => main());
    };

    habitBtnEvent.addEventListener('click', (event) => {
        // console.log(event.target);
        if (event.target.value === "EDIT") {
            // console.log(event.target.id);
            //function to go to edit and grab the id from the event here
        } else if (event.target.value === "DUH-STROY") {
            destroyHabit((event.target.id).split(' ')[0]);
        }
    })
});