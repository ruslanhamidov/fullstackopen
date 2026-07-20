const Input = (props) => {
  return (
    <div>
      {props.text}
      <input value={props.value} onChange={props.onChange} ></input>
    </div>
  )
};

export default Input;
