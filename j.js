let times = document.getElementsByClassName("time");
for (let i = 0; i < times.length; i++) {
  times[i].addEventListener("click", () => {
    timeandincerment(
      times[i].innerHTML.slice(0, times[i].innerHTML.indexOf("+")),
      times[i].innerHTML.slice(
        times[i].innerHTML.indexOf("+") + 1,
        times[i].innerHTML.length
      )
    );
  });
}
function timeandincerment(time, incerment) {
  let timeNum = time + " " + incerment;
  console.log(timeNum);
}
