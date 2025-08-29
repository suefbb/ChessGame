type IBoardWrapperProps = React.PropsWithChildren;

export default function BoardWrapper({ children }: IBoardWrapperProps) {
  return <div className="board-wrapper">{children}</div>;
}
