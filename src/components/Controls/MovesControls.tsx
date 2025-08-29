interface MovesControls {
  onForwardClick(): void;
  onBackwardClick(): void;
  onResetClick(): void;
}

export default function MovesControls({
  onBackwardClick,
  onForwardClick,
  onResetClick,
}: MovesControls) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "10px",
      }}
    >
      <button onClick={onBackwardClick}>&lt;</button>
      <button onClick={onForwardClick}>&gt;</button>
      <button onClick={onResetClick}>Reset</button>
    </div>
  );
}
