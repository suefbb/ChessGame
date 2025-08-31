import { type results } from "../core/types"
type res = {
    result : results,
    clearLocal: void
}
import { Link } from "react-router-dom"
function ResultDiv({result,clearLocal}:res) {
  return(
    <>
    <div style={{display:'flex',justifyContent:'center'}}>
      <div style={{display: result !== '*' ? 'flex' : 'none',flexDirection:'column',justifyContent:'space-between',alignItems:'center',width:'700px',height:'700px',backgroundColor:'green',transform:'translate(0px , -888px)'}}>
        <div style={{width:'100%',fontSize:'50px',textAlign:'center',marginTop:'40px'}}>{result}</div>
        <Link onClick={()=>{clearLocal()}} style={{textDecorationLine:'none'}} to='/onBoardTime'><button style={{height:'60px',width:'300px',fontSize:'25px',marginBottom:'50px'}}>back</button></Link>
      </div>
    </div>
    </>
  )    
}
export default ResultDiv;
