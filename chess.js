let turn = 'W'
var childclass=[
    ['','a','b','c','d','e','f','g','h','i','j','k','l','m','n'],
    [
      14,
      '<img src="Brook.png" class="Br" height="43px" width="43px">',
      '',
      '<img src="Bbishop.png" class="Bb" height="30px" width="31px">',
      '<img src="Bcrocodile.png" class="Br" height="43px" width="43px">',
      '',
      '<img src="تصميم_بدون_عنوان__2_-removebg-preview.png" class="Bs" height="43px" width=""43px>',
      '',
      '',
      '',
      '',
      'imgZ',
      '<img src="Bbishop.png" class="Br" height="30px" width="31px">',
      '',
      '<img src="Brook.png" class="Br" height="43px" width="43px">',
    ],
    [
      13,
      '<img src="Bpawn.png" class="Bp" height="45px" width="42px">',
      '<img src="Bpawn.png" class="Bp" height="45px" width="42px">',
      '<img src="Bpawn.png" class="Bp" height="45px" width="42px">',
      '<img src="Bpawn.png" class="Bp" height="45px" width="42px">',
      '<img src="Bpawn.png" class="Bp" height="45px" width="42px">',
      '<img src="Bpawn.png" class="Bp" height="45px" width="42px">',
      '<img src="Bpawn.png" class="Bp" height="45px" width="42px">',
      '<img src="Bpawn.png" class="Bp" height="45px" width="42px">',
      '<img src="Bpawn.png" class="Bp" height="45px" width="42px">',
      '<img src="Bpawn.png" class="Bp" height="45px" width="42px">',
      '<img src="Bpawn.png" class="Bp" height="45px" width="42px">',
      '<img src="Bpawn.png" class="Bp" height="45px" width="42px">',
      '<img src="Bpawn.png" class="Bp" height="45px" width="42px">',
      '<img src="Bpawn.png" class="Bp" height="45px" width="42px">',
    ],
    [
      12,
      '',
      '',
      '<img src="Bknight.png" class="Bn" height="43px" width="43px">',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '<img src="Bknight.png" class="Bn" height="43px" width="43px">',
      '',
      '',
    ],
    [
      11,
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
    ],
    [
      10,
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
    ],
    [
      9,
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
    ],
    [
      8,
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
    ],
    [
      7,
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
    ],
    [
      6,
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
    ],
    [
      5,
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
    ],
    [
      4,
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
    ],
    [
      3,
      '',
      '',
      '<img src="Wknight.png" class="Wn" height="43px" width="43px">',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '<img src="Wknight.png" class="Wn" height="43px" width="43px">',
      '',
      '',
    ],
    [
      2,
      '<img src="Wpawn.png" class="Wp" onclick="" height="43px" width="40px">',
      '<img src="Wpawn.png" class="Wp" onclick="" height="43px" width="40px">',
      '<img src="Wpawn.png" class="Wp" onclick="" height="43px" width="40px">',
      '<img src="Wpawn.png" class="Wp" onclick="" height="43px" width="40px">',
      '<img src="Wpawn.png" class="Wp" onclick="" height="43px" width="40px">',
      '<img src="Wpawn.png" class="Wp" onclick="" height="43px" width="40px">',
      '<img src="Wpawn.png" class="Wp" onclick="" height="43px" width="40px">',
      '<img src="Wpawn.png" class="Wp" onclick="" height="43px" width="40px">',
      '<img src="Wpawn.png" class="Wp" onclick="" height="43px" width="40px">',
      '<img src="Wpawn.png" class="Wp" onclick="" height="43px" width="40px">',
      '<img src="Wpawn.png" class="Wp" onclick="" height="43px" width="40px">',
      '<img src="Wpawn.png" class="Wp" onclick="" height="43px" width="40px">',
      '<img src="Wpawn.png" class="Wp" onclick="" height="43px" width="40px">',
      '<img src="Wpawn.png" class="Wp" onclick="" height="43px" width="40px">',
    ],
    [
      1,
      '<div><img src="Wrook.png" class="Wr" height="43px" width="43px"></div>',
      '',
      '<div><img src="Wbishop.png" class="Wb" height="42px" width="37px"></div>',
      '<div><img src="Wcrocodile.png" class="Wc" height="43px" width="43px"></div>',
      '',
      '<img src="تصميم_بدون_عنوان__2_-removebg-preview.png" class="Ws" height="43px" width="43px">',
      '',
      '',
      '',
      '',
      'imgZ',
      '<div><img src="Wbishop.png" class="Wb" height="42px" width="37px"></div>',
      '',
      '<div><img src="Wrook.png" class="Wr" height="43px" width="43px"></div>',
    ],
];
let legalMove=[]
let board=document.getElementById('pp')
for (let i = 0; i < childclass.length; i++) {
    for (let j = 0; j < childclass.length; j++) {
        let square=document.createElement("div")
        square.innerHTML=childclass[i][j]
        board.appendChild(square)
        square.dataset.row=i
        square.dataset.colmn=j
        square.classList.add("square")
        if ((i+j)%2==0) {
            square.style.backgroundColor='wheat'
        }
        else{square.style.backgroundColor='brown'}
        //when you click pawn do the function
        if (i==13 && j>0) {
            square.children[0].setAttribute('onClick','movepawn(this.parentElement.getAttribute("data-row"),this.parentElement.getAttribute("data-colmn"))')
        }
        if (i==2 && j>0) {
            square.children[0].setAttribute('onClick','moveBpawn(this.parentElement.getAttribute("data-row"),this.parentElement.getAttribute("data-colmn"))')
        }
    }
}
//end
board.addEventListener('click',(e)=>{
let square=e.target.closest(".square")
for (let legal =legalMove.length-1; legal >=0; legal--) {
    //is legalmove
    if(legalMove[legal][0]==square.getAttribute('data-row')&& legalMove[legal][1]==square.getAttribute('data-colmn')){ 
        //is straight move
        if(square.getAttribute('data-colmn')==board.children[PieceRow*15+PieceColmn].getAttribute('data-clomn')){
            childclass[PieceRow+(legal-2)][PieceColmn]=board.children[PieceRow*15+PieceColmn].children[0]
            childclass[PieceRow][PieceColmn]=''}
        else if(square.getAttribute('data-colmn')!==board.children[PieceRow*15+PieceColmn].getAttribute('data-clomn') && square.getAttribute('data-row')!==board.children[PieceRow*15+PieceColmn].getAttribute('data-row') && square.innerHTML=='' && legalMove.includes([square.getAttribute('data-row'),square.getAttribute('data-colmn')])){
            childclass[PieceRow][Number(square.getAttribute('data-colmn'))]=''
            board.children[PieceRow*15+Number(square.getAttribute('data-colmn'))].removeChild(board.children[PieceRow*15+Number(square.getAttribute('data-colmn'))].children[0])
        }
        //is capture move   capture move row    capture move colmn
        else{if(childclass[legalMove[legal][0]][legalMove[legal][1]]!==''){
            //is captured piece has different color
            if(square.children[0].classList[0][0]!==childclass[PieceRow][PieceColmn].classList[0][0]){
                childclass[PieceRow-1][PieceColmn+(-2*legal)+1]=board.children[PieceRow*15+PieceColmn].children[0]
                childclass[PieceRow][PieceColmn]=''}
            //if it is the same color
            else{continue}}}
        square.appendChild(board.children[PieceRow*15+PieceColmn].children[0])
        board.children[PieceRow*15+PieceColmn].innerHTML=''
        if(square.children.length>1){square.removeChild(square.children[0])}
        if(turn=='B'){turn='W'}
        else{turn='B'}
        break
    }
    }})
var PieceRow =0
var PieceColmn=0
function movepawn(pawnRow,pawncol){
    //if white to move
    if(turn=='W'){
    legalMove=[]
    PieceRow = Number(pawnRow)
    PieceColmn = Number(pawncol)
    if(board.children[(PieceRow-1)*15+PieceColmn].innerHTML==''){
        legalMove.splice(0,0,[PieceRow-1,PieceColmn])
    }
    if(board.children[(PieceRow-2)*15+PieceColmn].innerHTML=='' && board.children[(PieceRow-1)*15+PieceColmn].innerHTML==''){
        legalMove.splice(0,0,[PieceRow-2,PieceColmn])
    }
    if(board.children[(PieceRow-1)*15+PieceColmn+1].innerHTML!==''){
        legalMove.splice(0,0,[PieceRow-1,PieceColmn+1])
    }
    if(board.children[(PieceRow-1)*15+PieceColmn-1].innerHTML!==''){
        legalMove.splice(0,0,[PieceRow-1,PieceColmn-1])
    }
    if(board.children[(PieceRow)*15+PieceColmn-1].innerHTML!=='' && PieceRow==4){
        console.log(childclass[PieceRow][PieceColmn+1].classList)
        legalMove.splice(0,0,[PieceRow-1,PieceColmn-1])
    }
    if(board.children[(PieceRow)*15+PieceColmn+1].innerHTML!=='' && PieceRow==4){
        legalMove.splice(0,0,[PieceRow-1,PieceColmn+1])
    }}
}
function moveBpawn(pawnRow,pawncol){
    if(turn=='B'){
    legalMove=[]
    console.log(pawnRow,pawncol);
    PieceRow = Number(pawnRow)
    PieceColmn = Number(pawncol)
    if(board.children[(PieceRow+1)*15+PieceColmn].innerHTML==''){
        legalMove.splice(0,0,[PieceRow+1,PieceColmn])
    }
    if(board.children[(PieceRow+2)*15+PieceColmn].innerHTML=='' && board.children[(PieceRow+1)*15+PieceColmn].innerHTML==''){
        legalMove.splice(0,0,[PieceRow+2,PieceColmn])
    }
    if(board.children[(PieceRow+1)*15+PieceColmn+1].innerHTML!==''){
        legalMove.splice(0,0,[PieceRow+1,PieceColmn+1])
    }
    if(board.children[(PieceRow+1)*15+PieceColmn-1].innerHTML!==''){
        legalMove.splice(0,0,[PieceRow+1,PieceColmn-1])
    }
    if(board.children[(PieceRow)*15+PieceColmn-1].innerHTML!=='' && PieceRow==11){
        legalMove.splice(0,0,[PieceRow+1,PieceColmn-1])
    }
    if(board.children[(PieceRow)*15+PieceColmn+1].innerHTML!=='' && PieceRow==11){
        legalMove.splice(0,0,[PieceRow+1,PieceColmn+1])
    }
    console.log(legalMove);}
    console.log(board.children[(PieceRow)*15+PieceColmn+1].innerHTML!=='' && PieceRow==4)
}
function moverook(mm,...gf2){
    for (let pi2 = 0; pi2< pieces.length; pi2++) {
        if(pieces[pi2].style.backgroundColor == "rgb(195, 220, 85)"){
            pieces[pi2].style.backgroundColor= ""
        }
    }
    pieces[mm+13].style.backgroundColor= "rgb(195, 220, 85)"
    ppn = pieces[mm+13].parentElement.classList[1].slice(2,pieces[mm+13].parentElement.classList[1].length)
    for(t2=2;t2<198;t2++){
        childclass[t2].children[0].style.display='none';
    }
    for(s2=2;s2<198;s2++){
        if(Number(childclass[s2].id.slice(1,childclass[s2].id.length))==Number(pieces[mm+13].parentElement.id.slice(1,pieces[mm+13].parentElement.id.length)) && childclass[s2].id[0]==pieces[mm+13].parentElement.id[0]){
            childclass[s2].children[0].style.display='none'
        }
        else if(Number(childclass[s2].id.slice(1,childclass[s2].id.length))==Number(pieces[mm+13].parentElement.id.slice(1,pieces[mm+13].parentElement.id.length)) || childclass[s2].id[0]==pieces[mm+13].parentElement.id[0]){
            childclass[s2].children[0].style.display='block'
        }
        else{
            childclass[s2].children[0].style.display='none'
        }
    }
    a=Array.prototype.indexOf.call(childclass,pieces[mm+13].parentElement)
    let b = false
    for (let rci = 0; rci < 13; rci++) {
        if(a==197){break}a++;
        if(childclass[a].children.length>1 || b==true){
            childclass[a].children[0].style.display='none'
            b=true
        }
    }
    a=Array.prototype.indexOf.call(childclass,pieces[mm+13].parentElement)
    let b2 = false
    for (let rci = 0; rci < 13; rci++) {
        a=a-14
        if(a<3){break}
        if(childclass[a].children.length>1 || b2==true){childclass[a].children[0].style.display='none'
            b2=true
        }
    }
    a=Array.prototype.indexOf.call(childclass,pieces[mm+13].parentElement)
    let b3 = false
    for (let rci = 0; rci < 13; rci++) {
        a--;
        if(Number(childclass[a].classList[1].slice(2,childclass[a].classList[1].length))<3){break}
        if(childclass[a].children.length>1 || b3==true){
            childclass[a].children[0].style.display='none'
            b3=true
        }
    }
    a=Array.prototype.indexOf.call(childclass,pieces[mm+13].parentElement)
    let b4 = false
    for (let rci = 0; rci < 13; rci++) {
        a=a+14;
        if(a>198){break}
        if(childclass[a].children.length>1 || b4==true){
            childclass[a].children[0].style.display='none'
            b4=true
        }
    }
}function movebishop(mm,...gf2){
    for (let pi2 = 0; pi2< pieces.length; pi2++) {
        if(pieces[pi2].style.backgroundColor == "rgb(195, 220, 85)"){
            pieces[pi2].style.backgroundColor= ""
        }
    }
    pieces[mm+15].style.backgroundColor= "rgb(195, 220, 85)"
    ppn = pieces[mm+15].parentElement.classList[1].slice(2,pieces[mm+15].parentElement.classList[1].length)
    for(t3=2;t3<198;t3++){
        childclass[t3].children[0].style.display='none';
    }
    for(s3=2;s3<198;s3++){
        if(Number(childclass[s3].id.slice(1,childclass[s3].id.length))==Number(pieces[mm+15].parentElement.id.slice(1,pieces[mm+15].parentElement.id.length)) && childclass[s3].id[0]==pieces[mm+15].parentElement.id[0]){
            childclass[s3].children[0].style.display='none'
        }
        else if(Number(childclass[s3].id.slice(1,childclass[s3].id.length))-Number(pieces[mm+15].parentElement.id.slice(1,pieces[mm+15].parentElement.id.length))== alpha.indexOf(childclass[s3].id[0])-alpha.indexOf(pieces[mm+15].parentElement.id[0])){
            childclass[s3].children[0].style.display='block'
        }
        else if(Number(childclass[s3].id.slice(1,childclass[s3].id.length))-Number(pieces[mm+15].parentElement.id.slice(1,pieces[mm+15].parentElement.id.length))== alpha.indexOf(pieces[mm+15].parentElement.id[0])-alpha.indexOf(childclass[s3].id[0])){
            childclass[s3].children[0].style.display='block'
        }
        else{
            childclass[s3].children[0].style.display='none'
        }
    }
    a=Array.prototype.indexOf.call(childclass,pieces[mm+15].parentElement)
    b5 = false
    if(a>15){
        for (let rci = 0; rci < 13; rci++) {
            if(a<3){break}a=a-13;
            if(childclass[a].children.length>1 || b5==true){
                childclass[a].children[0].style.display='none'
                b5=true
            }
            if(childclass[a].id[0]=='n' || childclass[a].id[1]+childclass[a].id[2]=='14'){break}
        }}
        a=Array.prototype.indexOf.call(childclass,pieces[mm+15].parentElement)
        b5 = false
        if(a>15){
        for (let rci = 0; rci < 13; rci++) {
            a=a-15
            if(a<3){break}
            if(childclass[a].children.length>1 || b5==true){childclass[a].children[0].style.display='none'
                b5=true
            }
            if(childclass[a].id[0]=='a' || childclass[a].id[1]+childclass[a].id[2]=='14'){break}
        }}
    a=Array.prototype.indexOf.call(childclass,pieces[mm+15].parentElement)
    b5 = false
    for (let rci = 0; rci < 13; rci++) {
        a=a+15;
        if(a>198){break}
        if(childclass[a].children.length>1 || b5==true){
            childclass[a].children[0].style.display='none'
            b5=true
        }
        if(childclass[a].id[0]=='n' || childclass[a].id[1]+childclass[a].id[2]=='1'){break}
    }
    a=Array.prototype.indexOf.call(childclass,pieces[mm+15].parentElement)
    b5 = false
    for (let rci = 0; rci < 13; rci++) {
        a=a+13;
        if(a>198){break}
        if(childclass[a].children.length>1 || b5==true){
            childclass[a].children[0].style.display='none'
            b5=true
        }
        if(childclass[a].id[0]=='a' || childclass[a].id[1]+childclass[a].id[2]=='1'){break}
    }
}function moveknight(mm,...gf2){
    for (let pi2 = 0; pi2< pieces.length; pi2++) {
        if(pieces[pi2].style.backgroundColor == "rgb(195, 220, 85)"){
            pieces[pi2].style.backgroundColor= ""
        }
    }
    pieces[mm+17].style.backgroundColor= "rgb(195, 220, 85)"
    ppn = pieces[mm+17].parentElement.classList[1].slice(2,pieces[mm+17].parentElement.classList[1].length)
    for(t4=2;t4<198;t4++){
        childclass[t4].children[0].style.display='none';
    }
    for(s4=2;s4<198;s4++){
        if(Number(childclass[s4].id.slice(1,childclass[s4].id.length))==Number(pieces[mm+17].parentElement.id.slice(1,pieces[mm+17].parentElement.id.length))+2 && alpha.indexOf(childclass[s4].id[0])==alpha.indexOf(pieces[mm+17].parentElement.id[0])+1 && childclass[s4].children.length==1){
            childclass[s4].children[0].style.display='block'
        }
        else if(Number(childclass[s4].id.slice(1,childclass[s4].id.length))==Number(pieces[mm+17].parentElement.id.slice(1,pieces[mm+17].parentElement.id.length))+2 && alpha.indexOf(childclass[s4].id[0])==alpha.indexOf(pieces[mm+17].parentElement.id[0])-1 && childclass[s4].children.length==1){
            childclass[s4].children[0].style.display='block'
        }
        else if(Number(childclass[s4].id.slice(1,childclass[s4].id.length))==Number(pieces[mm+17].parentElement.id.slice(1,pieces[mm+17].parentElement.id.length))-2 && alpha.indexOf(childclass[s4].id[0])==alpha.indexOf(pieces[mm+17].parentElement.id[0])-1 && childclass[s4].children.length==1){
            childclass[s4].children[0].style.display='block'
        }
        else if(Number(childclass[s4].id.slice(1,childclass[s4].id.length))==Number(pieces[mm+17].parentElement.id.slice(1,pieces[mm+17].parentElement.id.length))-2 && alpha.indexOf(childclass[s4].id[0])==alpha.indexOf(pieces[mm+17].parentElement.id[0])+1 && childclass[s4].children.length==1){
            childclass[s4].children[0].style.display='block'
        }
        else if(Number(childclass[s4].id.slice(1,childclass[s4].id.length))==Number(pieces[mm+17].parentElement.id.slice(1,pieces[mm+17].parentElement.id.length))-1 && alpha.indexOf(childclass[s4].id[0])==alpha.indexOf(pieces[mm+17].parentElement.id[0])+2 && childclass[s4].children.length==1){
            childclass[s4].children[0].style.display='block'
        }
        else if(Number(childclass[s4].id.slice(1,childclass[s4].id.length))==Number(pieces[mm+17].parentElement.id.slice(1,pieces[mm+17].parentElement.id.length))+1 && alpha.indexOf(childclass[s4].id[0])==alpha.indexOf(pieces[mm+17].parentElement.id[0])+2 && childclass[s4].children.length==1){
            childclass[s4].children[0].style.display='block'
        }
        else if(Number(childclass[s4].id.slice(1,childclass[s4].id.length))==Number(pieces[mm+17].parentElement.id.slice(1,pieces[mm+17].parentElement.id.length))-1 && alpha.indexOf(childclass[s4].id[0])==alpha.indexOf(pieces[mm+17].parentElement.id[0])-2 && childclass[s4].children.length==1){
            childclass[s4].children[0].style.display='block'
        }
        else if(Number(childclass[s4].id.slice(1,childclass[s4].id.length))==Number(pieces[mm+17].parentElement.id.slice(1,pieces[mm+17].parentElement.id.length))+1 && alpha.indexOf(childclass[s4].id[0])==alpha.indexOf(pieces[mm+17].parentElement.id[0])-2 && childclass[s4].children.length==1){
            childclass[s4].children[0].style.display='block'
        }
        else{
            childclass[s4].children[0].style.display='none'
        }
    }
}
function movecro(mm,...gf2){
    for (let pi2 = 0; pi2< pieces.length; pi2++) {
        if(pieces[pi2].style.backgroundColor == "rgb(195, 220, 85)"){
            pieces[pi2].style.backgroundColor= ""
        }
    }
    pieces[20].style.backgroundColor= "rgb(195, 220, 85)"
    ppn = pieces[20].parentElement.classList[1].slice(2,pieces[20].parentElement.classList[1].length)
    for(t2=2;t2<198;t2++){
        childclass[t2].children[0].style.display='none';
    }
    for(s2=2;s2<198;s2++){
        if(Number(childclass[s2].id.slice(1,childclass[s2].id.length))==Number(pieces[20].parentElement.id.slice(1,pieces[20].parentElement.id.length)) && childclass[s2].id[0]==pieces[20].parentElement.id[0]){
            childclass[s2].children[0].style.display='none'
        }
        else if(Number(childclass[s2].id.slice(1,childclass[s2].id.length))==Number(pieces[20].parentElement.id.slice(1,pieces[20].parentElement.id.length))){
            childclass[s2].children[0].style.display='block'
        }
        else if(alpha.indexOf(childclass[s2].id[0])==alpha.indexOf(pieces[20].parentElement.id[0])+1 ||alpha.indexOf(childclass[s2].id[0])==alpha.indexOf(pieces[20].parentElement.id[0])-1){
            childclass[s2].children[0].style.display='block'
        }
        else{
            childclass[s2].children[0].style.display='none'
        }
    }
    a=Array.prototype.indexOf.call(childclass,pieces[20].parentElement)
    let b = false
    for (let rci = 0; rci < 13; rci++) {
        if(a==197){break}a++;
        if(childclass[a].children.length>1 || b==true){
            childclass[a].children[0].style.display='none'
            b=true
        }
    }
    a=Array.prototype.indexOf.call(childclass,pieces[20].parentElement)
    let b2 = false
    for (let rci = 0; rci < 14; rci++) {
        if(rci==0){a++;}
        else{a=a-14}
        if(a<3){break}
        if(childclass[a].children.length>1 || b2==true){childclass[a].children[0].style.display='none'
            b2=true
        }
        else{childclass[a].children[0].style.display='block'}
        console.log(childclass[a].children.length>1 || b2==true,childclass[a].children[0]);
    }
    a=Array.prototype.indexOf.call(childclass,pieces[20].parentElement)
    let b3 = false
    for (let rci = 0; rci < 14; rci++) {
        if(rci==0){a--}
        else{a=a-14}
        if(a<3){break}
        if(childclass[a].children.length>1 || b3==true){childclass[a].children[0].style.display='none'
            b3=true
        }
    }
    a=Array.prototype.indexOf.call(childclass,pieces[20].parentElement)
    let b4 = false
    for (let rci = 0; rci < 13; rci++) {
        a--;
        if(Number(childclass[a].classList[1].slice(2,childclass[a].classList[1].length))<3){break}
        if(childclass[a].children.length>1 || b4==true){
            childclass[a].children[0].style.display='none'
            b4=true
        }
    }
    a=Array.prototype.indexOf.call(childclass,pieces[20].parentElement)
    let b5 = false
    for (let rci = 0; rci < 13; rci++) {
        if(rci==0){a--}
        else{a=a+14}
        if(a>198){break}
        if(childclass[a].children.length>1 || b5==true){
            childclass[a].children[0].style.display='none'
            b5=true
        }
    }
    a=Array.prototype.indexOf.call(childclass,pieces[20].parentElement)
    let b6 = false
    for (let rci = 0; rci < 13; rci++) {
        if(rci==0){a++}
        else{a=a+14}
        if(a>198){break}
        if(childclass[a].children.length>1 || b6==true){
            childclass[a].children[0].style.display='none'
            b6=true
        }
    }}
function movezebra(mm,...gf2){
    for (let pi2 = 0; pi2< pieces.length; pi2++) {
        if(pieces[pi2].style.backgroundColor == "rgb(195, 220, 85)"){
            pieces[pi2].style.backgroundColor= ""
        }
    }
    pieces[21].style.backgroundColor= "rgb(195, 220, 85)"
    ppn = pieces[21].parentElement.classList[1].slice(2,pieces[21].parentElement.classList[1].length)
    for(t3=2;t3<198;t3++){
        childclass[t3].children[0].style.display='none';
    }
    for(s3=2;s3<198;s3++){
        if(Number(childclass[s3].id.slice(1,childclass[s3].id.length))==Number(pieces[21].parentElement.id.slice(1,pieces[21].parentElement.id.length)) && childclass[s3].id[0]==pieces[21].parentElement.id[0]){
            childclass[s3].children[0].style.display='none'
        }
        else if(Number(pieces[21].parentElement.id.slice(1,pieces[21].parentElement.id.length))-Number(childclass[s3].id.slice(1,childclass[s3].id.length))==alpha.indexOf(childclass[s3].id[0])-alpha.indexOf(pieces[21].parentElement.id[0])-1 && Number(pieces[21].parentElement.id.slice(1,pieces[21].parentElement.id.length))<Number(childclass[s3].id.slice(1,childclass[s3].id.length))){
            childclass[s3].children[0].style.display='block'
        }
        else if(Number(childclass[s3].id.slice(1,childclass[s3].id.length))-Number(pieces[21].parentElement.id.slice(1,pieces[21].parentElement.id.length))==alpha.indexOf(childclass[s3].id[0])-alpha.indexOf(pieces[21].parentElement.id[0])-1 && Number(pieces[21].parentElement.id.slice(1,pieces[21].parentElement.id.length))<Number(childclass[s3].id.slice(1,childclass[s3].id.length))){
            childclass[s3].children[0].style.display='block'
        }
        else if(Number(pieces[21].parentElement.id.slice(1,pieces[21].parentElement.id.length))-Number(childclass[s3].id.slice(1,childclass[s3].id.length))==alpha.indexOf(childclass[s3].id[0])-alpha.indexOf(pieces[21].parentElement.id[0])+1 && Number(pieces[21].parentElement.id.slice(1,pieces[21].parentElement.id.length))>Number(childclass[s3].id.slice(1,childclass[s3].id.length))){
            childclass[s3].children[0].style.display='block'
        }
        else if(Number(childclass[s3].id.slice(1,childclass[s3].id.length))-Number(pieces[21].parentElement.id.slice(1,pieces[21].parentElement.id.length))==alpha.indexOf(childclass[s3].id[0])-alpha.indexOf(pieces[21].parentElement.id[0])+1 && Number(pieces[21].parentElement.id.slice(1,pieces[21].parentElement.id.length))>Number(childclass[s3].id.slice(1,childclass[s3].id.length))){
            childclass[s3].children[0].style.display='block'
        }
        else if(Number(childclass[s3].id.slice(1,childclass[s3].id.length))-Number(pieces[21].parentElement.id.slice(1,pieces[21].parentElement.id.length))== alpha.indexOf(childclass[s3].id[0])-alpha.indexOf(pieces[21].parentElement.id[0])){
            childclass[s3].children[0].style.display='block'
        }
        else if(Number(childclass[s3].id.slice(1,childclass[s3].id.length))-Number(pieces[21].parentElement.id.slice(1,pieces[21].parentElement.id.length))== alpha.indexOf(pieces[21].parentElement.id[0])-alpha.indexOf(childclass[s3].id[0])){
            childclass[s3].children[0].style.display='block'
        }
        else{
            childclass[s3].children[0].style.display='none'
        }
        if(childclass[s3].id[0]==pieces[21].parentElement.id[0]){
            childclass[s3].children[0].style.display='none'
        }
    }
    a=Array.prototype.indexOf.call(childclass,pieces[21].parentElement)
    b5 = false
    if(a>15){
        for (let rci = 0; rci < 13; rci++) {
            if(a<3){break}a=a-13;
            if(childclass[a].children.length>1 || b5==true){
                childclass[a].children[0].style.display='none'
                b5=true
            }
            if(childclass[a].id[0]=='n' || childclass[a].id[1]+childclass[a].id[2]=='14'){break}
        }
        a=Array.prototype.indexOf.call(childclass,pieces[21].parentElement)
        b5 = false
        for (let rci = 0; rci < 13; rci++) {
            a=a-15
            if(a<3){break}
            if(childclass[a].children.length>1 || b5==true){childclass[a].children[0].style.display='none'
                b5=true
            }
            if(childclass[a].id[0]=='a' || childclass[a].id[1]+childclass[a].id[2]=='14'){break}
        }}
    a=Array.prototype.indexOf.call(childclass,pieces[21].parentElement)
    b5 = false
    for (let rci = 0; rci < 13; rci++) {
        a=a+15;
        if(a>198){break}
        if(childclass[a].children.length>1 || b5==true){
            childclass[a].children[0].style.display='none'
            b5=true
        }
        if(childclass[a].id[0]=='n' || childclass[a].id[1]+childclass[a].id[2]=='1'){break}
    }
    a=Array.prototype.indexOf.call(childclass,pieces[21].parentElement)
    b5 = false//a=120
    for (let rci = 0; rci < 13; rci++) {
        a=a+13;
        if(a>198){break}
        if(childclass[a].children.length>1 || b5==true){
            childclass[a].children[0].style.display='none'
            b5=true
        }
        if(a>=184 || childclass[a].id[1]+childclass[a].id[2]=='1'){break}
    }
    a=Array.prototype.indexOf.call(childclass,pieces[21].parentElement)
    b5 = false
    if(a>15){
        for (let rci = 0; rci < 14; rci++) {
            if(rci==1){a++}
            else{a=a-13;}
            if(a<2){break}
            if(childclass[a].children.length>1 || b5==true){
                childclass[a].children[0].style.display='none'
                b5=true
            }
            if(childclass[a].id[0]=='n' || childclass[a].id[1]+childclass[a].id[2]=='14'){break}
        }}
    a=Array.prototype.indexOf.call(childclass,pieces[21].parentElement)
    b5 = false
    if(a>15){
        for (let rci = 0; rci < 14; rci++) {
            if(rci==1){a=a-14}
            else{a=a-15}
            if(a<3){break}
            if(childclass[a].children.length>1 || b5==true){childclass[a].children[0].style.display='none'
                b5=true
            }
            if(childclass[a].id[0]=='a' || childclass[a].id[1]+childclass[a].id[2]=='14'){break}
        }}
    a=Array.prototype.indexOf.call(childclass,pieces[21].parentElement)
    b5 = false
    if(a<184){
        for (let rci = 0; rci < 13; rci++) {
            if(a>198){break}
            if(rci==1){a=a+14}
            else{a=a+15}
            if(childclass[a].children.length>1 || b5==true){
                childclass[a].children[0].style.display='none'
                b5=true
            }
            if(a>=184 || childclass[a].id[1]+childclass[a].id[2]=='1'){break}
        }
    }
    a=Array.prototype.indexOf.call(childclass,pieces[21].parentElement)
    b5 = false
    if(a<184){
        for (let rci = 0; rci < 14; rci++){
            if(rci==1){a--}
            else{a=a+13}
            if(a>198){break}
            if(childclass[a].children.length>1 || b5==true){
                childclass[a].children[0].style.display='none'
                b5=true
            }
            if(childclass[a].id[0]=='a' || childclass[a].id[1]+childclass[a].id[2]=='1'){break}
        }}
}
function movepiece(pawnParentIndex,pawnNewSquare){//cn هو ايتم المربع gg هو اي دي المربع المضغوط عليه

}
//بداية كود الدوائر
let back_color= document.getElementById("back_color")
let is_active=document.getElementById("is_active")
let button= document.getElementById("button1")
function show_imgnsqr(i) {
    if(is_active.value=='T'){p.style.setProperty('z-index','1000');imgn_sqr.style.setProperty('display','none');imgn_sqr.style.setProperty('z-index','800');
        console.log(p.style.zIndex);
        console.log(imgn_sqr.style.zIndex);}
    imgn_sqr.children[i].children[0].style.display="block"
    imgn_sqr.children[i].children[0].style.borderColor=back_color.value
}
function rmv() {
    for (let e = 0; e < imgn_sqr.children.length-2; e++) {
        imgn_sqr.children[e+2].children[0].style.display="none"
    }
}
function hello() {
    console.log(is_active.value=="F");
    if(is_active.value=="F"){
        p.style.setProperty('z-index','0.5');imgn_sqr.style.setProperty('display','grid');imgn_sqr.style.setProperty('z-index','800')
        console.log(p.style.zIndex);
        console.log(imgn_sqr.style.zIndex);
        console.log(imgn_sqr.style.display);}    
}
//نهايته
let min=document.getElementById("min")
let tensec=document.getElementById("tensec")
let sec=document.getElementById("sec")
//for (let tm = 0; tm < 1; tm++) {
//    if(sec.innerHTML=='0' && tensec.innerHTML=='0'){
//    setInterval(function setmin() {
//      min.innerHTML=String(Number(min.innerHTML)-1)
//      tensec.innerHTML='5'
//    },1000)}
//    for (let tts = 0; tts < 1; tts++) {
//        if(sec.innerHTML=='0'){
//        setInterval(function settensec() {
//          tensec.innerHTML=String(Number(tensec.innerHTML)-1)
//          sec.innerHTML='9'
//        },1000)}
//        for (let ti = 0; ti < 1; ti++) {
//        setInterval(function setsec() {
//          sec.innerHTML=String(Number(sec.innerHTML)-1)
//          console.log(min.innerHTML,':',tensec.innerHTML,sec.innerHTML)
//        },1000)}}
//}
