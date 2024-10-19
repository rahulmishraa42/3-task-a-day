const input = document.querySelectorAll(".input");
const checkbox = document.querySelectorAll(".checkbox");
const errorTask = document.querySelector(".errorTask");
const errorTaskRemoveBtn = document.querySelector(".removeBtn");
const sunImg = document.querySelector(".sunImg");
const totalGoals = document.querySelector(".totalTask");
const goalComplete = document.querySelector(".taskComplete");
let progressbar = document.querySelector(".progressbar");
const progressTitle = document.querySelector(".progressMessage");

const progressMessage = [
    'Raise the bar by completing your goals',
    'Well begun is half done!',
    'Just a step away, keep going!',
    'Whoa! You just completed all the goals, time for chill :D'
]

// const allGoals = JSON.parse(localStorage.getItem("Goals")) || {
//     first:{
//         Value:"",
//     },
//     second:{
//         Value:"",
//     },
//     third:{
//         Value:"",
//     }
// };
const allGoals = JSON.parse(localStorage.getItem("Goals")) || {};
let completeTask = Object.values(allGoals).filter((el) => el.Complete).length;

console.log(completeTask)

const totalGoalsValue = input.length;

totalGoals.innerText = totalGoalsValue;
goalComplete.innerText = completeTask;
progressTitle.innerText = progressMessage[completeTask]
console.log(progressMessage[completeTask])

progressbar.style.width = `${completeTask / totalGoalsValue * 100}%`
checkbox.forEach((el) => {
    el.addEventListener("click",(e) => {
        const task = [...input].every((el) => {
            return el.value
        })
        if(task) {
            el.parentElement.classList.toggle("complete")
            const taskId = el.nextElementSibling.id;
            allGoals[taskId].Complete = !allGoals[taskId].Complete;
            const totalGoalsValue = Object.keys(allGoals).length;
            let completeTask = Object.values(allGoals).filter((el) => el.Complete).length;
            totalGoals.innerText = totalGoalsValue;
            goalComplete.innerText = completeTask;
            progressbar.style.width = `${completeTask / totalGoalsValue * 100}%`;
            progressTitle.innerText = progressMessage[completeTask]
            localStorage.setItem("Goals",JSON.stringify(allGoals))
           
        }else{
            errorTask.classList.add("show")
            input.forEach((el) => {
                el.setAttribute("readonly","readonly")
            })
        }
    })
})

input.forEach((el) => {
    if(allGoals[el.id]){
        el.value = allGoals[el.id].Value;

        if(allGoals[el.id].Complete){
            el.parentElement.classList.add("complete")
        }
    }
    

    el.addEventListener("input",(e) => {
        if(allGoals[el.id] && allGoals[el.id].Complete){
            e.target.value = allGoals[el.id].Value
            return
        }

        allGoals[el.id] = {
            Value:e.target.value,
            Complete:false
        }
        localStorage.setItem("Goals",JSON.stringify(allGoals))
        let rotationAngle = e.target.value.length * 10;
        sunImg.style.transform = `rotate(${rotationAngle}deg)`;
    })
})

errorTaskRemoveBtn.addEventListener("click",() => {
    errorTaskRemoveBtn.parentElement.classList.remove("show");
    input.forEach((el) => {
        el.removeAttribute("readonly")
    })
})




