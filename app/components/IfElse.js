export const IfElse = ({children, condition}) => {
  let displayChild = null;
  
  if(children)
    if(children.length) {
      for(const child of children) {
        if(child.type.displayName === 'Then' && condition) displayChild = child;
        if(child.type.displayName === 'Else' && !condition) displayChild = child;
      }
    } else {
      if(children.type.displayName === 'Then' && condition) displayChild = children;
      if(children.type.displayName === 'Else' && !condition) displayChild = children;
    }

  return displayChild;
}

export const Then = ({children}) => children;
Then.displayName = 'Then';

export const Else = ({children}) => children;
Else.displayName = 'Else';