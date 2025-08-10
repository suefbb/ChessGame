interface IMovesControls extends React.PropsWithChildren {
  onForwardClick(): void;
  onBackwardClick(): void;
}

export default function MovesControls({
  onBackwardClick,
  onForwardClick,
}: IMovesControls) {
  return (
    <div>
      <button onClick={onBackwardClick}>&lt;</button>
      <button onClick={onForwardClick}>&gt;</button>
    </div>
  );
}
