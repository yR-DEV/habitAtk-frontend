document.addEventListener('DOMContentLoaded', () => {
    // alert('LOADED BREH');
    const endPoint = 'https://calm-anchorage-88997.herokuapp.com/api/v1/habits';

    fetch(endPoint)
        .then(response => response.json())
        .then(res => splitHabits(res))

    function splitHabits(habitArray) {
        habitArray.forEach(function(habit) {
            createHabitDiv(habit)
        });
    };

    function createHabitDiv(habit) {
        console.log(habit);
    };
    // <!--Clicking turns this icon on-->
    // <button onclick="titanic.on(getElementById('checkbox').value)">On</button>
});