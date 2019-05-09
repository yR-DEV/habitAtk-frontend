document.addEventListener('DOMContentLoaded', () => {
    // alert('LOADED BREH');
    const endPoint = 'https://calm-anchorage-88997.herokuapp.com/api/v1/habits';
    const habitDivRow = document.getElementById("habit-row");

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
        let newTestDiv = document.createElement("div");
        habitDivRow.appendChild(newTestDiv);
        newTestDiv.innerHTML = largeHabitDiv;  
    };

    const createHabitDiv = (habit) => {
        let habitDiv = `
            <div class="col-xl-3 mb-4"> 
                <div id="card-span" class="card shadow h-100 py-2">
                    <div class="card-body">
                        <div class="row no-gutters align-items-center">
                            <div class="col mr-2">
                                <div class="titanic titanic-checkbox"></div>
                                <div class="text-xs font-weight-bold text-success text-uppercase mb-1"> 
                                    ${habit.name}
                                </div>
                                <div class="h5 mb-0 font-weight-bold text-gray-800">NEVER YOURE NOT MY REAL DAD</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        appendHabitDiv(habitDiv);
    };
    // <!--Clicking turns this icon on-->
    // <button onclick="titanic.on(getElementById('checkbox').value)">On</button>
});


/* <div class="row">
    <div class="col-xl-3 mb-4">
        <div id="card-span" class="card shadow h-100 py-2">
            <div class="card-body">
                <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                        <div class='titanic titanic-checkbox'></div>
                        <div class="text-xs font-weight-bold text-success text-uppercase mb-1">MAKE YOUR DAMN BED</div>
                        <div class="h5 mb-0 font-weight-bold text-gray-800">NEVER YOURE NOT MY REAL DAD</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div> */