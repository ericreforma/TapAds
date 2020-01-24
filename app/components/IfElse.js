const IfElse = props => {
  if(props.condition)
    return props.then;
  return props.else ? props.else : null;
}

export default IfElse;