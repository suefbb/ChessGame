import { Board , Move } from "../../core/types";
type hisType = {
  history: Move[]
  boarda: Board[]
  pgnArr: Board[]
}
function PGN({history , boarda , pgnArr}:hisType) {
  return(
    <div style={{height:'100px',width:'100px',backgroundColor:'red'}}>{String(JSON.parse(localStorage.pgnArr))}</div>
  )
}
export default PGN;
