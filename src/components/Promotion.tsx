type h = {
    boarda: string | null,
    Pclick(Prow:number , pieceKey:string , board): void,
    showWhitePieces : boolean,
    showBlackPieces : boolean
}
export function WhitePromotion({boarda , Pclick , showWhitePieces }: h) {
    return (
    <>
    <div style={{display:'flex',justifyContent:'center'}}>
    <div style={{display: showWhitePieces ? 'block' :'none' ,height:'700px',width:'700px',position:'relative',bottom:'888px'}}>
      <img onClick={()=>{Pclick(0 , 'Q' , boarda)}} src="../public/w-queen.svg" alt="R"/>
      <img onClick={()=>{Pclick(0 , 'Z' , boarda)}} src="../public/w-zebra.svg" alt="R"/>
      <img onClick={()=>{Pclick(0 , 'C' , boarda)}} src="../public/w-crocodile.svg" alt="R"/>
      <img onClick={()=>{Pclick(0 , 'E' , boarda)}} src="../public/w-elephant.svg" alt="R"/>
      <img onClick={()=>{Pclick(0 , 'P' , boarda)}} src="../public/w-pigeon.svg" alt="R"/>
      <img onClick={()=>{Pclick(0 , 'F' , boarda)}} src="../public/w-frog.svg" alt="R"/>
      <img onClick={()=>{Pclick(0 , 'R' , boarda)}} src="../public/w-rook.svg" alt="R"/>
      <img onClick={()=>{Pclick(0 , 'B' , boarda)}} src="../public/w-bishop.svg" alt="R"/>
      <img onClick={()=>{Pclick(0 , 'O' , boarda)}} src="../public/w-octopus.svg" alt="R"/>
      <img onClick={()=>{Pclick(0 , 'W' , boarda)}} src="../public/w-wall.svg" alt="R"/>
      <img onClick={()=>{Pclick(0 , 'S' , boarda)}} src="../public/w-snake.svg" alt="R"/>
      <img onClick={()=>{Pclick(0 , 'N' , boarda)}} src="../public/w-knight.svg" alt="R"/>
    </div>
    </div>
    </>
    )
}
export function BlackPromotion({boarda , Pclick , showBlackPieces }: h) {
  return(
  <>
  <div style={{display:'flex',justifyContent:'center'}}>
  <div style={{display: showBlackPieces ? 'block' :'none',height:'700px',width:'700px',position:'relative',bottom:'888px'}}>
    <img onClick={()=>{Pclick(13 , 'Q' , boarda)}} src="../public/b-queen.svg" alt="Q"/>
    <img onClick={()=>{Pclick(13 , 'Z' , boarda)}} src="../public/b-zebra.svg" alt="Z"/>
    <img onClick={()=>{Pclick(13 , 'C' , boarda)}} src="../public/b-crocodile.svg" alt="C"/>
    <img onClick={()=>{Pclick(13 , 'E' , boarda)}} src="../public/b-elephant.svg" alt="E"/>
    <img onClick={()=>{Pclick(13 , 'P' , boarda)}} src="../public/b-pigeon.svg" alt="P"/>
    <img onClick={()=>{Pclick(13 , 'F' , boarda)}} src="../public/b-frog.svg" alt="F"/>
    <img onClick={()=>{Pclick(13 , 'R' , boarda)}} src="../public/b-rook.svg" alt="R"/>
    <img onClick={()=>{Pclick(13 , 'B' , boarda)}} src="../public/b-bishop.svg" alt="B"/>
    <img onClick={()=>{Pclick(13 , 'O' , boarda)}} src="../public/b-octopus.svg" alt="O"/>
    <img onClick={()=>{Pclick(13 , 'W' , boarda)}} src="../public/b-wall.svg" alt="W"/>
    <img onClick={()=>{Pclick(13 , 'S' , boarda)}} src="../public/b-snake.svg" alt="S"/>
    <img onClick={()=>{Pclick(13 , 'N' , boarda)}} src="../public/b-knight.svg" alt="N"/>
  </div>
  </div>
  </>)
}
