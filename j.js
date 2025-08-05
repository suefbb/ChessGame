let times = document.getElementsByClassName("time")
console.log(times);
for (let i = 0; i < times.length; i++) {
    times[i].addEventListener('click' , ()=>{})
}
export function timeandincerment(time , incerment) {
    return [Number(time) , Number(incerment)] 
}