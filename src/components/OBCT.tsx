import { Link } from "react-router-dom";
function OnBoardChooseTime() {
  const  changeTime =(min:number , tensec:number , sec:number)=>{
    localStorage.Wtm = JSON.stringify([min , tensec , sec , 0])
    localStorage.Btm = JSON.stringify([min , tensec , sec , 0])
  }
  return(<>
  <div style={{display:'flex'}}>
        <h2>Type :</h2>
        <div style={{flexGrow:'1',display:'flex',justifyContent:'space-around'}}><h2>Standard</h2>
        <h2>Championship matches</h2></div>
    </div>
    <div>
        <h2>Bullet</h2>
        <div style={{display:'flex',justifyContent:'space-around',alignItems:'center'}}>
            <Link onClick={()=>changeTime(1, 0, 0)} to='/onBoardGame' style={{width:'16.5%',height:'50px',display:'flex',justifyContent:'center',alignItems:'center',fontSize:'20px',borderRadius:'10px',backgroundColor:'rgb(20, 20, 35)',color:'white'}}>1+0</Link>
            <Link onClick={()=>changeTime(2 ,0 ,0)} to='/onBoardGame' style={{width:'16.5%',height:'50px',display:'flex',justifyContent:'center',alignItems:'center',fontSize:'20px',borderRadius:'10px',backgroundColor:'rgb(20, 20, 35)',color:'white'}}>2+1</Link>
            <Link onClick={()=>changeTime(1 ,0 ,0)} to='/onBoardGame' style={{width:'16.5%',height:'50px',display:'flex',justifyContent:'center',alignItems:'center',fontSize:'20px',borderRadius:'10px',backgroundColor:'rgb(20, 20, 35)',color:'white'}}>1+1</Link>
            <Link onClick={()=>changeTime(2 ,0 ,0)} to='/onBoardGame' style={{width:'16.5%',height:'50px',display:'flex',justifyContent:'center',alignItems:'center',fontSize:'20px',borderRadius:'10px',backgroundColor:'rgb(20, 20, 35)',color:'white'}}>2+0</Link>
            <Link onClick={()=>changeTime(0 ,3 ,0)} to='/onBoardGame' style={{width:'16.5%',height:'50px',display:'flex',justifyContent:'center',alignItems:'center',fontSize:'20px',borderRadius:'10px',backgroundColor:'rgb(20, 20, 35)',color:'white'}}>1/2+0</Link>
            <Link onClick={()=>changeTime(0 ,1 ,5)} to='/onBoardGame' style={{width:'16.5%',height:'50px',display:'flex',justifyContent:'center',alignItems:'center',fontSize:'20px',borderRadius:'10px',backgroundColor:'rgb(20, 20, 35)',color:'white'}}>1/4+1</Link>
        </div>
    </div>
    <div>
        <h2>Blitz</h2>
        <div style={{display:'flex',justifyContent:'space-around',alignItems:'center'}}>
            <Link onClick={()=>changeTime(3 ,0 ,0)} to='/onBoardGame' style={{width:'16.5%',height:'50px',display:'flex',justifyContent:'center',alignItems:'center',fontSize:'20px',borderRadius:'10px',backgroundColor:'rgb(20, 20, 35)',color:'white'}}>3+0</Link>
            <Link onClick={()=>changeTime(3 ,0 ,0)} to='/onBoardGame' style={{width:'16.5%',height:'50px',display:'flex',justifyContent:'center',alignItems:'center',fontSize:'20px',borderRadius:'10px',backgroundColor:'rgb(20, 20, 35)',color:'white'}}>3+2</Link>
            <Link onClick={()=>changeTime(5 ,0 ,0)} to='/onBoardGame' style={{width:'16.5%',height:'50px',display:'flex',justifyContent:'center',alignItems:'center',fontSize:'20px',borderRadius:'10px',backgroundColor:'rgb(20, 20, 35)',color:'white'}}>5+0</Link>
            <Link onClick={()=>changeTime(5 ,0 ,0)} to='/onBoardGame' style={{width:'16.5%',height:'50px',display:'flex',justifyContent:'center',alignItems:'center',fontSize:'20px',borderRadius:'10px',backgroundColor:'rgb(20, 20, 35)',color:'white'}}>5+3</Link>
        </div>
    </div>
    <div>
        <h2>Rapid</h2>
        <div style={{display:'flex',justifyContent:'space-around',alignItems:'center'}}>
            <Link onClick={()=>changeTime(10 ,0 ,0)} to='/onBoardGame' style={{width:'16.5%',height:'50px',display:'flex',justifyContent:'center',alignItems:'center',fontSize:'20px',borderRadius:'10px',backgroundColor:'rgb(20, 20, 35)',color:'white'}}>10+0</Link>
            <Link onClick={()=>changeTime(10 ,0 ,0)} to='/onBoardGame' style={{width:'16.5%',height:'50px',display:'flex',justifyContent:'center',alignItems:'center',fontSize:'20px',borderRadius:'10px',backgroundColor:'rgb(20, 20, 35)',color:'white'}}>10+5</Link>
            <Link onClick={()=>changeTime(15 ,0 ,0)} to='/onBoardGame' style={{width:'16.5%',height:'50px',display:'flex',justifyContent:'center',alignItems:'center',fontSize:'20px',borderRadius:'10px',backgroundColor:'rgb(20, 20, 35)',color:'white'}}>15+10</Link>
            <Link onClick={()=>changeTime(8 ,0 ,0)} to='/onBoardGame' style={{width:'16.5%',height:'50px',display:'flex',justifyContent:'center',alignItems:'center',fontSize:'20px',borderRadius:'10px',backgroundColor:'rgb(20, 20, 35)',color:'white'}}>8+2</Link>
            <Link onClick={()=>changeTime(15 ,0 ,0)} to='/onBoardGame' style={{width:'16.5%',height:'50px',display:'flex',justifyContent:'center',alignItems:'center',fontSize:'20px',borderRadius:'10px',backgroundColor:'rgb(20, 20, 35)',color:'white'}}>15+0</Link>
        </div>
    </div>
    <div>
        <h2>classic</h2>
        <div style={{display:'flex',justifyContent:'space-around',alignItems:'center'}}>
            <Link onClick={()=>changeTime(20 ,0 ,0)} to='/onBoardGame' style={{width:'16.5%',height:'50px',display:'flex',justifyContent:'center',alignItems:'center',fontSize:'20px',borderRadius:'10px',backgroundColor:'rgb(20, 20, 35)',color:'white'}}>20+0</Link>
            <Link onClick={()=>changeTime(25 ,0 ,0)} to='/onBoardGame' style={{width:'16.5%',height:'50px',display:'flex',justifyContent:'center',alignItems:'center',fontSize:'20px',borderRadius:'10px',backgroundColor:'rgb(20, 20, 35)',color:'white'}}>25+5</Link>
            <Link onClick={()=>changeTime(30 ,0 ,0)} to='/onBoardGame' style={{width:'16.5%',height:'50px',display:'flex',justifyContent:'center',alignItems:'center',fontSize:'20px',borderRadius:'10px',backgroundColor:'rgb(20, 20, 35)',color:'white'}}>30+10</Link>
            <Link onClick={()=>changeTime(40 ,0 ,0)} to='/onBoardGame' style={{width:'16.5%',height:'50px',display:'flex',justifyContent:'center',alignItems:'center',fontSize:'20px',borderRadius:'10px',backgroundColor:'rgb(20, 20, 35)',color:'white'}}>40+20</Link>
        </div>
    </div>
    </>)  
}
export default OnBoardChooseTime;
