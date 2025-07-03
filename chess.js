var childclass=[]
var fast = 1
var pawns = []; var rooks,bishops,knights,cros,zebra,snake= []
let alpha = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n']
let i_al = 0
let z = 14
let p = document.getElementById("pp")
let cirs =[]
var gf = 0; var gf2= 0; var gf3= 0; var gf4 = 0; var gf5= 0; var gf6= 0;
let ppn = ''
let cc = ''
var a =0
let b5= false
let imgn_sqr = document.getElementById("is")
for(sqr=1;sqr<199;sqr++){
    if (sqr > 2){
        p.innerHTML+='<div class="f" style="display:flex;justify-content:center;align-items:center;" onClick="hello()"><div class="cir" id="3" onClick="movepiece(ppn,this.id,childclass[197])"></div></div>'
        imgn_sqr.innerHTML+='<div class="imsqp" onContextmenu=""><div class="imsq"></div></div>'
        imgn_sqr.children[sqr-1].setAttribute('onContextmenu','show_imgnsqr(this.id)')
        cirs=document.getElementsByClassName("cir")
        cirs[sqr-3].id=String(sqr)
        imgn_sqr.children[sqr-1].id=String(sqr-1)
    }
    if (sqr==1){
        is.innerHTML+='<div class="itt1"></div>'        
        p.innerHTML+='<div class="f"><p>14</p><p>13</p><p>12</p><p>11</p><p>10</p><p>9</p><p>8</p><p>7</p><p>6</p><p>5</p><p>4</p><p>3</p><p>2</p><p>1</p></div>'        
    }
    if (sqr==2){
        is.innerHTML+='<div class="itt2"></div>' 
        p.innerHTML+='<div class="f"><p>a</p><p>b</p><p>c</p><p>d</p><p>e</p><p>f</p><p>g</p><p>h</p><p>i</p><p>j</p><p>k</p><p>l</p><p>m</p><p>n</p></div>'        
    }    
    childclass=document.getElementsByClassName("f")
    childclass[sqr-1].classList.add("it"+sqr)
    if(sqr>2 && sqr<17 && sqr%2==1){
        childclass[sqr-1].style.backgroundColor= "wheat"
    }
    if(sqr>2 && sqr<17 && sqr%2==0){
        childclass[sqr-1].style.backgroundColor= "brown"
    }
    if(sqr>16 && sqr<31 && sqr%2==1){
        childclass[sqr-1].style.backgroundColor= "brown"
    }
    if(sqr>16 && sqr<31 && sqr%2==0){
        childclass[sqr-1].style.backgroundColor= "wheat"
    }
    if(sqr>30 && sqr<45 && sqr%2==1){
        childclass[sqr-1].style.backgroundColor= "wheat"
    }
    if(sqr>30 && sqr<45 && sqr%2==0){
        childclass[sqr-1].style.backgroundColor= "brown"
    }    
    if(sqr>44 && sqr<59 && sqr%2==1){
        childclass[sqr-1].style.backgroundColor= "brown"
    }
    if(sqr>44 && sqr<59 && sqr%2==0){
        childclass[sqr-1].style.backgroundColor= "wheat"
    }
    if(sqr>58 && sqr<73 && sqr%2==1){
        childclass[sqr-1].style.backgroundColor= "wheat"
    }
    if(sqr>58 && sqr<73 && sqr%2==0){
        childclass[sqr-1].style.backgroundColor= "brown"
    }
    if(sqr>72 && sqr<87 && sqr%2==1){
        childclass[sqr-1].style.backgroundColor= "brown"
    }
    if(sqr>72 && sqr<87 && sqr%2==0){
        childclass[sqr-1].style.backgroundColor= "wheat"
    }
    if(sqr>86 && sqr<101 && sqr%2==1){
        childclass[sqr-1].style.backgroundColor= "wheat"
    }
    if(sqr>86 && sqr<101 && sqr%2==0){
        childclass[sqr-1].style.backgroundColor= "brown"
    }
    if(sqr>100 && sqr<115 && sqr%2==1){
        childclass[sqr-1].style.backgroundColor= "brown"
    }
    if(sqr>100 && sqr<115 && sqr%2==0){
        childclass[sqr-1].style.backgroundColor= "wheat"
    }
    if(sqr>114 && sqr<129 && sqr%2==1){
        childclass[sqr-1].style.backgroundColor= "wheat"
    }
    if(sqr>114 && sqr<129 && sqr%2==0){
        childclass[sqr-1].style.backgroundColor= "brown"
    }    
    if(sqr>128 && sqr<143 && sqr%2==1){
        childclass[sqr-1].style.backgroundColor= "brown"
    }
    if(sqr>128 && sqr<143 && sqr%2==0){
        childclass[sqr-1].style.backgroundColor= "wheat"
    }
    if(sqr>142 && sqr<157 && sqr%2==1){
        childclass[sqr-1].style.backgroundColor= "wheat"
    }
    if(sqr>142 && sqr<157 && sqr%2==0){
        childclass[sqr-1].style.backgroundColor= "brown"
    }
    if(sqr>156 && sqr<171 && sqr%2==1){
        childclass[sqr-1].style.backgroundColor= "brown"
    }
    if(sqr>156 && sqr<171 && sqr%2==0){
        childclass[sqr-1].style.backgroundColor= "wheat"
    }
    if(sqr>170 && sqr<185 && sqr%2==1){
        childclass[sqr-1].style.backgroundColor= "wheat"
    }
    if(sqr>170 && sqr<185 && sqr%2==0){
        childclass[sqr-1].style.backgroundColor= "brown"
    }
    if(sqr>184 && sqr<199 && sqr%2==1){
        childclass[sqr-1].style.backgroundColor= "brown"
    }
    if(sqr>184 && sqr<199 && sqr%2==0){
        childclass[sqr-1].style.backgroundColor= "wheat"
    }
    if (sqr > 2){
       childclass[sqr-1].id=alpha[i_al%14]+z
       i_al++
       if(i_al%14==0){z--}
       if(childclass[sqr-1].id[1]==2){
           childclass[sqr-1].innerHTML+='<div class="pawn" style="width:100%;" onClick=""><div class="ph"></div><div class="pb"></div><div class="pd"></div></div>'
           pawns=document.getElementsByClassName("pawn")
           gf = alpha.indexOf(childclass[sqr-1].id[0])
           pawns[gf].classList.add("pawn"+(gf+1).toString())
           pawns[gf].setAttribute('onClick','movepawn(Number(this.classList[1].slice(4,classList[1].lenght)),gf)')
           gf++
       }
       if(childclass[sqr-1].id.slice(1,childclass[sqr-1].id.length)==1){if(childclass[sqr-1].id[0]=='a'||childclass[sqr-1].id[0]=='n'){
           childclass[sqr-1].innerHTML+='<div class="rook" style="width:100%;" onClick=""><div class="rw"><div class="rw1"></div><div class="rw2"></div><div class="rw3"></div></div><div class="rh"></div><div class="rb"></div><div class="rd"></div></div>' 
           gf2++; rooks=document.getElementsByClassName("rook")
           rooks[gf2-1].classList.add("rook"+gf2.toString())
           rooks[gf2-1].setAttribute('onClick','moverook(Number(this.classList[1][4]),gf2)')
        }}
        if(childclass[sqr-1].id.slice(1,childclass[sqr-1].id.length)==1){if(childclass[sqr-1].id[0]=='c'||childclass[sqr-1].id[0]=='l'){
            childclass[sqr-1].innerHTML+='<div class="bishop" style="width:100%;" onClick=""><div class="bc"></div><div class="bm"></div><div class="bh"></div><div class="bb"></div><div class="bd"></div></div>' 
            gf3++; bishops=document.getElementsByClassName("bishop")
            bishops[gf3-1].children[1].style.backgroundColor=childclass[sqr-1].style.backgroundColor
            bishops[gf3-1].classList.add("bishop"+gf3.toString())
            bishops[gf3-1].setAttribute('onClick','movebishop(Number(this.classList[1][6]),gf3)')
        }}
        if(childclass[sqr-1].id.slice(1,childclass[sqr-1].id.length)==3){if(childclass[sqr-1].id[0]=='c'||childclass[sqr-1].id[0]=='l'){
            childclass[sqr-1].innerHTML+='<div class="knight" style="width:100%;" onClick=""><div class="ne"></div><div class="nh"><div class="nI"></div></div><div class="nb"></div><div class="nd"></div></div>' 
            gf4++; knights=document.getElementsByClassName("knight")
            knights[gf4-1].children[1].children[0].style.backgroundColor=childclass[sqr-1].style.backgroundColor
            knights[gf4-1].classList.add("knight"+gf4.toString())
            knights[gf4-1].setAttribute('onClick','moveknight(Number(this.classList[1][6]),gf4)')
        }}
        if(childclass[sqr-1].id.slice(1,childclass[sqr-1].id.length)==1){if(childclass[sqr-1].id[0]=='d'){
            childclass[sqr-1].innerHTML+='<div class="crocodile" style="width:100%;" onClick=""><div class="cIs"><div class="ce1"><div class="ce3"><div></div></div></div><div class="ce2"><div class="ce4"><div></div></div></div></div><div class="cf"><div class="cn1"><div></div></div><div class="cn2"><div></div></div></div><div class="cb"></div><div class="cd"></div></div>' 
            cros=document.getElementsByClassName("crocodile")
            cros[0].classList.add("crodile1")
            cros[0].setAttribute('onClick','movecro(1,gf2)')
        }}
        if(childclass[sqr-1].id.slice(1,childclass[sqr-1].id.length)==1){if(childclass[sqr-1].id[0]=='k'){
            childclass[sqr-1].innerHTML+='<div class="zebra" style="width:100%;" onClick=""><div class="zDs"><div class="zd1"></div><div class="zd2"></div></div><div class="zs"></div><div class="zb"></div><div class="zd"></div></div>' 
            zebra=document.getElementsByClassName("zebra")
            zebra[0].classList.add("zebra1")
            zebra[0].setAttribute('onClick','movezebra(1,gf2)')
        }}
        if(childclass[sqr-1].id.slice(1,childclass[sqr-1].id.length)==1){if(childclass[sqr-1].id[0]=='f'){
            childclass[sqr-1].innerHTML+='<img src="تصميم_بدون_عنوان__2_-removebg-preview.png" class="snake" height="100%" width="100%"/>' 
            snake=document.getElementsByClassName("snake")
            snake[0].classList.add("snake1")
            snake[0].setAttribute('onClick','movesnake(1,gf2)')
        }}
    }   
}
var pieces = [pawns[0],pawns[1],pawns[2],pawns[3],pawns[4],pawns[5],pawns[6],pawns[7],pawns[8],pawns[9],pawns[10],pawns[11],pawns[12],pawns[13],rooks[0],rooks[1],bishops[0],bishops[1],knights[0],knights[1],cros[0],zebra[0],snake[0]]
let oo = 0
function movepawn(mm,...gf){
    for (let pi = 0; pi < pieces.length; pi++) {
        if(pieces[pi].style.backgroundColor == "rgb(195, 220, 85)"){
            pieces[pi].style.backgroundColor= ""
        }
    }
    pieces[mm-1].style.backgroundColor= "rgb(195, 220, 85)"
    ppn = pieces[mm-1].parentElement.classList[1].slice(2,pieces[mm-1].parentElement.classList[1].length)
    for(t=2;t<198;t++){
        childclass[t].children[0].style.display='none';
    }
    for(s=2;s<198;s++){
        if(Number(childclass[s].id.slice(1,childclass[s].id.length))==Number(pieces[mm-1].parentElement.id.slice(1,pieces[mm-1].parentElement.id.length))+2 && childclass[s].id[0]==pieces[mm-1].parentElement.id[0] && childclass[s+14].children.length==1 && childclass[s].children.length==1){
            childclass[s].children[0].style.display='block'
        }
        else if(Number(childclass[s].id.slice(1,childclass[s].id.length))==Number(pieces[mm-1].parentElement.id.slice(1,pieces[mm-1].parentElement.id.length))+1 && childclass[s].id[0]==pieces[mm-1].parentElement.id[0] && childclass[s].children.length==1){
            childclass[s].children[0].style.display='block'
        }
        else if(Number(childclass[s].id.slice(1,childclass[s].id.length))==Number(pieces[mm-1].parentElement.id.slice(1,pieces[mm-1].parentElement.id.length))+1){
            if(alpha.indexOf(childclass[s].id[0])==alpha.indexOf(pieces[mm-1].parentElement.id[0])-1 ||alpha.indexOf(childclass[s].id[0])==alpha.indexOf(pieces[mm-1].parentElement.id[0])+1){
                childclass[s].children[0].style.display='block'
                //if if if if if if if if if
            }
        }
        else{
            childclass[s].children[0].style.display='none'
        }
     }
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
function movesnake(){
    for (let pi2 = 0; pi2< pieces.length; pi2++) {
        if(pieces[pi2].style.backgroundColor == "rgb(195, 220, 85)"){
            pieces[pi2].style.backgroundColor= ""
        }
    }
    pieces[22].style.backgroundColor= "rgb(195, 220, 85)"
    ppn = pieces[22].parentElement.classList[1].slice(2,pieces[22].parentElement.classList[1].length)
    for(s3=2;s3<198;s3++){
    if(Number(childclass[s3].id.slice(1,childclass[s3].id.length))-Number(pieces[22].parentElement.id.slice(1,pieces[22].parentElement.id.length))==1){
        if ((alpha.indexOf(childclass[s3].id[0])-alpha.indexOf(pieces[22].parentElement.id[0]))%4==2 || (alpha.indexOf(pieces[22].parentElement.id[0])-alpha.indexOf(childclass[s3].id[0]))%4==2) {
            childclass[s3].children[0].style.display='block'  
        }}
    else if(Number(childclass[s3].id.slice(1,childclass[s3].id.length))-Number(pieces[22].parentElement.id.slice(1,pieces[22].parentElement.id.length))==-1){
        if ((alpha.indexOf(childclass[s3].id[0])-alpha.indexOf(pieces[22].parentElement.id[0]))%4==2 || (alpha.indexOf(pieces[22].parentElement.id[0])-alpha.indexOf(childclass[s3].id[0]))%4==2) {
            childclass[s3].children[0].style.display='block'  
        }}
    else if(Number(childclass[s3].id.slice(1,childclass[s3].id.length))-Number(pieces[22].parentElement.id.slice(1,pieces[22].parentElement.id.length))==0 && childclass[s3].id[0]==pieces[22].parentElement.id[0]){
            childclass[s3].children[0].style.display='block'  
        }
    else if(Number(childclass[s3].id.slice(1,childclass[s3].id.length))-Number(pieces[22].parentElement.id.slice(1,pieces[22].parentElement.id.length))==0){
        if ((alpha.indexOf(childclass[s3].id[0])-alpha.indexOf(pieces[22].parentElement.id[0]))%4==0) {
            childclass[s3].children[0].style.display='block'  
        }}
    //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
    else if(alpha.indexOf(childclass[s3].id[0])-alpha.indexOf(pieces[22].parentElement.id[0])==1){
        if ((Number(childclass[s3].id.slice(1,childclass[s3].id.length))-Number(pieces[22].parentElement.id.slice(1,pieces[22].parentElement.id.length)))%4==2 || (alpha.indexOf(pieces[22].parentElement.id[0])-alpha.indexOf(childclass[s3].id[0]))%4==2) {
            childclass[s3].children[0].style.display='block'  
        }}
    else if(alpha.indexOf(childclass[s3].id[0])-alpha.indexOf(pieces[22].parentElement.id[0])==-1){
        if ((Number(childclass[s3].id.slice(1,childclass[s3].id.length))-Number(pieces[22].parentElement.id.slice(1,pieces[22].parentElement.id.length)))%4==2 || (alpha.indexOf(pieces[22].parentElement.id[0])-alpha.indexOf(childclass[s3].id[0]))%4==2) {
            childclass[s3].children[0].style.display='block'  
        }}
    else if(Number(childclass[s3].id.slice(1,childclass[s3].id.length))-Number(pieces[22].parentElement.id.slice(1,pieces[22].parentElement.id.length))==0 && childclass[s3].id[0]==pieces[22].parentElement.id[0]){
            childclass[s3].children[0].style.display='block'  
        }
    else if((alpha.indexOf(childclass[s3].id[0])-alpha.indexOf(pieces[22].parentElement.id[0]))==0){
        if (Number(childclass[s3].id.slice(1,childclass[s3].id.length))-Number(pieces[22].parentElement.id.slice(1,pieces[22].parentElement.id.length))%4==0) {
            childclass[s3].children[0].style.display='block'  
        }
    }}
    a=Array.prototype.indexOf.call(childclass,pieces[22].parentElement)
    b5 = false
    if(a>15){
        for (let rci = 0; rci < 6; rci++) {
            if(rci%2==0){a=a-12;}
            else{a=a+16}
            if(childclass[a].children.length>1 || b5==true){
                childclass[a].children[0].style.display='none'
                b5=true
            }
            if(childclass[a].id[0]=='n' || childclass[a].id[1]+childclass[a].id[2]=='14'){break}
        }}
}
function movepiece(cn,gg,last){//cn هو ايتم المربع gg هو اي دي المربع المضغوط عليه
    for (let pi2 = 0; pi2 < pieces.length; pi2++) {
        if(pieces[pi2].style.backgroundColor=='rgb(195, 220, 85)'){
            if(pi2>13){//P A W N
                for (let f = 1; f < childclass.length; f++) {
                    if(Number(childclass[f].children[0].id)==Number(gg)){
                        cc=childclass[f]
                    }
                }                         //198 
                for (let ff = -2; ff < childclass.length-2; ff++) {
                    if(ff==197){childclass[ff+2]=last}
                    if(Number(childclass[ff+2].classList[1].slice(2,childclass[ff+2].classList[1].length))==Number(cn)){
                        cc.appendChild(childclass[ff+2].children[1])
                    }
                    if(ff>=0){cirs[ff].style.display='none'}
                }}
            else if(pi2<14){//R O O K
                for (let f = 1; f < childclass.length; f++) {
                    if(Number(childclass[f].children[0].id)==Number(gg)){
                        cc=childclass[f]
                    }
                }
                for (let ff = 1; ff < childclass.length; ff++) {
                    if(Number(childclass[ff].classList[1].slice(2,childclass[ff].classList[1].length))==Number(cn)){
                        cc.appendChild(childclass[ff].children[1])   
                        cc.children[1].classList[1]='it'+String(Number(cc.children[1].classList[1].slice(2,cc.children[1].classList[1].length))-28)
                    }
                    if(ff>1){cirs[ff-2].style.display='none'}
                }
            }
        }
    }
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