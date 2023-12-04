export default function Block(props) {
  return (
    <div className="block" {...props}>
      {props.x ? "x" : props.o ? "o" : ""}
    </div>
  );
}
