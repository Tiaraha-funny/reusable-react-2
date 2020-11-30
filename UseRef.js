import React, { useRef, useState, forwardRef, useEffect } from "react";

//It is an object that can change
// It doesn't trigger a rerender
//most of the time used to create a reference to a dom node
//to access the dom,you stick the ref variable inside the ref prop

let z = 10;

const add = (x, y) => {
  z = z + x; // this is a side effect
  return x + y;
};

function UseRef() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const initialFocusRef = useRef(null);
  const focusRef = useRef(null);

  useEffect(() => {
    initialFocusRef.current.focus();
  }, []); //dependency array which only called oninitial renderand no array meanscalled onintial render and states change

  return (
    <div>
      <h2>Email Signup</h2>
      <p>
        <input
          type="text"
          value={name}
          placeholder="Name"
          ref={initialFocusRef}
          onChange={(e) => {
            setName(e.target.value);
            if (name.lenght >= 10) {
              return focusRef.current.focus();
            }
          }}
        />
      </p>
      <p>
        <input
          type="text"
          value={email}
          ref={focusRef}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </p>
      <SubmitButton ref={focusRef}>Submit</SubmitButton>
    </div>
  );
}

const SubmitButton = forwardRef((props, ref) => {
  return <button ref={ref}>{props.children}</button>;
});

export default UseRef;
