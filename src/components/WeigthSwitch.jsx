import { useState } from "react";
import Form from "react-bootstrap/Form";

function WeigthSwitch({ weightUnit, valuesOnChangeHandler }) {
  const [unitToggler, setUnitToggler] = useState(weightUnit);

  const onChangeHandler = (name, val) => {
    setUnitToggler((prev) => (prev === "kg" ? "lbs" : "kg"));
    valuesOnChangeHandler(name, val === "kg" ? "lbs" : "kg");
  };

  return (
    <>
      <Form.Label>Switch thw Weight Unit</Form.Label>

      <Form.Check
        type="switch"
        id="custom-switch"
        label={`Unit --> ${unitToggler}`}
        name="weightUnit"
        value={unitToggler === "kg" ? "kg" : "lbs"}
        onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
        // id="disabled-custom-switch"
      />
    </>
  );
}

export default WeigthSwitch;
