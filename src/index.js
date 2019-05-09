document.addEventListener('DOMContentLoaded', () => {
    // alert('LOADED BREH');
    const endPoint = 'https://calm-anchorage-88997.herokuapp.com/api/v1/habits';
    const habitDivRow = document.getElementById("habit-row");
    const newHabitForm = document.querySelector(".form-new-habit");
    newHabitForm.style.display = "none";

    const newHabitBtn = document.querySelector(".btn-new-habit");  
    const newHabitBtnPost = document.querySelector(".btn-post-new-habit")
    
    var titanic = new Titanic({
        hover: false, // auto animated on hover (default true)
        click: true  // auto animated on click/tap (default false)
      });

    fetch(endPoint)
        .then(response => response.json())
        .then(res => splitHabits(res))

    const splitHabits = (habitArray) => {
        habitArray.forEach(habit => {
            createHabitDiv(habit);
        });
    };

    const appendHabitDiv = (largeHabitDiv) => {
        console.log(largeHabitDiv);
        let newHabitDiv = document.createElement("div");
        newHabitDiv.classList.add("col-xl-3");
        newHabitDiv.classList.add("mb-4");
        habitDivRow.appendChild(newHabitDiv);
        newHabitDiv.innerHTML = largeHabitDiv;  
    };

    const createHabitDiv = (habit) => {
        let habitDiv = `
                <div id="card-span" class="card shadow h-100 py-2">
                    <div class="card-body">
                        <div class="row no-gutters align-items-center">
                            <div class="col mr-2">
                                <div class="titanic titanic-checkbox"></div>
                                <div class="text-xs font-weight-bold text-success text-uppercase mb-1"> 
                                    NEVER YOU'RE NOT MY REAL DAD
                                </div>
                                <div class="h5 mb-0 font-weight-bold text-gray-800">${habit.name}</div>
                            </div>
                        </div>
                    </div>
                </div>
        `;
        appendHabitDiv(habitDiv);
    };
    // <!--Clicking turns this icon on-->
    // <button onclick="titanic.on(getElementById('checkbox').value)">On</button>

    newHabitBtn.addEventListener('click', (event) => {
        newHabitForm.style.display = (content.dataset.toggled ^= 1) ? "block" : "none";
        // newHabitForm.style.visibility = (content.dataset.toggled ^= 1) ? "visible" : "hidden";
        // newHabitForm.classList.toggle("show");
        // content.style.display = (content.dataset.toggled ^= 1) ? "block" : "none";
    });

    newHabitBtnPost.addEventListener('click', (event) => {
        // console.log('we in here');
        newHabitForm.style.display = (content.dataset.toggled ^= 1) ? "block" : "none";
                
    })
});