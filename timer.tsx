import {useEffect, useState } from "react"

type blackPra = {
    blackMin : number
    blackTenSec : number
    blackSec : number
    blackMlSec : number
}
export function BLtimer(timer:blackPra) {
    const [BT , setBT] = useState<number>(JSON.parse(localStorage.Btm))
    useEffect(()=>{
        const Btime = setTimeout(() => {
          if(localStorage.currentTurn == 'b'){
          if (BT[3] !== 0) {
            setBT([BT[0] , BT[1] , BT[2] , BT[3] -1])
          }else if (BT[3] == 0 && BT[2] !== 0) {
            setBT([BT[0] , BT[1] , BT[2] -1 , 9])
          } else if (
            BT[3] == 0 &&
            BT[2] == 0 &&
            BT[1] !== 0
          ) {
            setBT([BT[0] , BT[1] -1 , 9 , 9])
          } else if (
            BT[3] == 0 &&
            BT[2] == 0 &&
            BT[1] == 0 &&
            BT[0] !== 0
          ) {
            setBT([BT[0] -1 , 5 , 9 , 9])
          } else if (
            BT[3] == 0 &&
            BT[2] == 0 &&
            BT[1] == 0 &&
            BT[0] == 0
          ) {
            clearTimeout(Btime);
          }}
        }, 100);
        localStorage.setItem('Btm' , JSON.stringify(BT))
    } , )
    return(
        <>
            <div style={{backgroundColor:'black',color:'white',height:'40px',width:'80px',borderRadius:'8px',display:'flex',justifyContent:'center',alignItems:'center',border:'1.5px solid black',fontSize:'x-large'}}>
                {BT[0]}:{BT[1]}{BT[2]}.{BT[3]}</div>
        </>
    )
}
type whitePra = {
    whiteMin : number
    whiteTenSec : number
    whiteSec : number
    whiteMlSec : number
}
export function WLtimer(timer:whitePra) {
  const [WT , setWT] = useState<number>(JSON.parse(localStorage.Wtm))
  useEffect(()=>{
      const Wtime = setTimeout(() => {
        if(localStorage.currentTurn == 'w'){
        if (WT[3] !== 0) {
          setWT([WT[0] , WT[1] , WT[2] , WT[3] -1])
        }else if (WT[3] == 0 && WT[2] !== 0) {
          setWT([WT[0] , WT[1] , WT[2] -1 , 9])
        } else if (
          WT[3] == 0 &&
          WT[2] == 0 &&
          WT[1] !== 0
        ) {
          setWT([WT[0] , WT[1] -1 , 9 , 9])
        } else if (
          WT[3] == 0 &&
          WT[2] == 0 &&
          WT[1] == 0 &&
          WT[0] !== 0
        ) {
          setWT([WT[0] -1 , 5 , 9 , 9])
        } else if (
          WT[3] == 0 &&
          WT[2] == 0 &&
          WT[1] == 0 &&
          WT[0] == 0
        ) {
          clearTimeout(Wtime);
        }}
      }, 100);
      localStorage.setItem('Wtm' , JSON.stringify(WT))
  } , )
    return(
        <>
            <div style={{backgroundColor:'white',color:'black',height:'40px',width:'80px',borderRadius:'8px',display:'flex',justifyContent:'center',alignItems:'center',border:'1.5px solid black',fontSize:'x-large'}}>
                {WT[0]}:{WT[1]}{WT[2]}.{WT[3]}</div>
        </>
    )
}
