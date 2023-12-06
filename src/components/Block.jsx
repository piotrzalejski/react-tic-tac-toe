export default function Block(props) {
  const playerClass = props.x ? "x" : props.o ? "o" : "";

  return (
    <div className={`block ${playerClass}`} {...props}>
      {props.x ? "x" : props.o ? "o" : ""}
    </div>
  );
}
