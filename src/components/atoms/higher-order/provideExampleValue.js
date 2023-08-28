import { compose, withState, withHandlers } from "recompose";

export default function provideExampleValue(value) {
  return compose(
    withState("value", "setValue", value),
    withHandlers({
      onChange:
        ({ setValue }) =>
        (ev, newValue) => {
          setValue(newValue);
          // console.log("newValue", newValue);
          //console.log("ev", ev);
        },
      onAdd:
        () =>
        (...args) =>
          console.log("added a new mention", ...args),
    })
  );
}
