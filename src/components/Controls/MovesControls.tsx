import type { Color } from "../../core/types";
import { ResignBTN } from "./Controls";
interface IMovesControls extends React.PropsWithChildren {
  onForwardClick(): void,
  onBackwardClick(): void,
  onResignClick(turn:Color): void,
  turn: Color
}

export default function MovesControls({
  onBackwardClick,
  onForwardClick,
  onResignClick,
  turn
}: IMovesControls) {
  return (
    <div>
      <button onClick={onBackwardClick}>&lt;</button>
      <button onClick={onForwardClick}>&gt;</button>
      <ResignBTN onResignClick={onResignClick} turn={turn}/>
    </div>
  );
}
