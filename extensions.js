let colmns = ['','a','b','c','d','e','f','g','h','i','j','k','l','m','n']
export function changepgnmovestoPGN(moves) { 
  let pgnArr = []
  for (let m = 0; m < moves.length; m++) {
    pgnArr.push([])
    //push move number
    if (m % 2 == 0){
      pgnArr[m].push(((m/2)+1) + '.')
    }
    //push moved piece
    if (moves[m][0][1] !== 'p') {
      pgnArr[m].push(moves[m][0][1])
    }
    //push pawn colmn if pawn takes
    if (moves[m][0][1] == 'p' && moves[m][3] !== null) {
      pgnArr[m].push(colmns[moves[m][2][1]])
    }
    if (moves[m][3] !== null) {
      pgnArr[m].push('x')
    }
    pgnArr[m].push(colmns[moves[m][1][1]] , 15 - (moves[m][1][0]))
    pgnArr[m].push(' ')
  }
  localStorage.setItem('pgnArr' , JSON.stringify(pgnArr))
  return pgnArr
}
//the pgn that shown in the pgn square
///if (childclass[selectedPiece.row][selectedPiece.col][1] !== 'p') {
//  pgnArr.push([childclass[selectedPiece.row][selectedPiece.col][1],childclass[0][col],childclass[row][0]])
//}else{pgnArr.push([childclass[0][col],childclass[row][0]])}
//if (isCapture(row , col , childclass[selectedPiece.row][selectedPiece.col][0]) && childclass[selectedPiece.row][selectedPiece.col][1] !== 'p') {
//  pgnArr[movesPlayed].splice(1,0,'x')
//}else if(isCapture(row , col , childclass[selectedPiece.row][selectedPiece.col][0]) && childclass[selectedPiece.row][selectedPiece.col][1] == 'p'){
//  pgnArr[movesPlayed].splice(0,0,childclass[0][selectedPiece.col])
//  pgnArr[movesPlayed].splice(1,0,'x')}