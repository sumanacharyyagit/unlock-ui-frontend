import React, { useEffect, useRef, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import WeigthSwitch from "./WeigthSwitch";
import { submitUserInformations } from "../util-methods/http-calls";

const initialFormData = {
  currentDate: "",
  weightUnit: "kg",
  idealWeight: "",
  currentWeight: "",
};

const initialFormIsDirty = {
  currentDate: false,
  weightUnit: false,
  idealWeight: false,
  currentWeight: false,
};

function FormModal({ fetchUserInformaion }) {
  const [formData, setFormData] = useState(() => ({ ...initialFormData }));
  const [isDirty, setIsDirty] = useState(() => ({ ...initialFormIsDirty }));
  const [error, setError] = useState(() => ({}));

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const firstUpdate = useRef(true);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    formValidation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify({ ...formData }), JSON.stringify({ ...isDirty })]);

  const onChangeHandler = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setIsDirty((prev) => ({ ...prev, [name]: true }));
  };

  const formValidation = () => {
    const updateIsDirty = { ...isDirty };
    const updateError = { ...error };

    Object.keys(formData).forEach((key) => {
      if (key === "currentDate" && isDirty[key]) {
        if (formData[key] === "") {
          updateError[key] = "Date field is required!";
        } else {
          delete updateError[key];
          updateIsDirty[key] = false;
        }
      } else if (key === "idealWeight" && isDirty[key]) {
        if (formData[key] === "") {
          updateError[key] = "Ideal Weight field is required!";
        } else if (!new RegExp("^[0-9]{1,3}d*$").test(formData[key])) {
          updateError[key] = "Current Weight is not valid!";
        } else {
          delete updateError[key];
          updateIsDirty[key] = false;
        }
      } else if (key === "currentWeight" && isDirty[key]) {
        if (formData[key] === "") {
          updateError[key] = "Current Weight field is required!";
        } else if (!new RegExp("^[0-9]{1,3}d*$").test(formData[key])) {
          updateError[key] = "Current Weight is not valid!";
        } else {
          delete updateError[key];
          updateIsDirty[key] = false;
        }
      }
    });
    // setIsDirty(updateIsDirty);
    setError({ ...updateError });
    return Object.keys(updateError).length > 0 ? updateError : null;
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const updateIsDirty = { ...isDirty };
    Object.keys(updateIsDirty).forEach((v) => {
      updateIsDirty[v] = true;
    });
    setIsDirty({
      ...isDirty,
      ...updateIsDirty,
    });

    formValidation();
    let error = false;
    Object.keys(formData).forEach((v) => {
      if (formData[v] === "") error = true;
    });
    if (!error) {
      const result = await submitUserInformations(formData);
      if (result) {
        console.log("Updated");
      }
      setFormData({ ...initialFormData });
      setIsDirty({ ...initialFormIsDirty });
      fetchUserInformaion();
      handleClose();
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Form className="p-4 p-md-5">
          <Modal.Body>
            <Form.Group
              className={error?.currentDate ? "" : "mb-4"}
              controlId="currentDate"
            >
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="currentDate"
                placeholder="Current Date"
                value={formData.currentDate}
                onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
              />
            </Form.Group>
            {error?.currentDate && (
              <small className="mb-3 text-danger">
                <p>{error.currentDate}</p>
              </small>
            )}

            <Form.Group className="mb-3" controlId="currentDate">
              <WeigthSwitch
                weightUnit={formData.weightUnit}
                valuesOnChangeHandler={onChangeHandler}
              />
            </Form.Group>

            <Form.Label>Ideal Weight</Form.Label>
            <InputGroup className={error?.idealWeight ? "" : "mb-4"}>
              <Form.Control
                placeholder="Ideal Weight"
                aria-label="IdealWeight"
                aria-describedby="basic-addon1"
                type="text"
                name="idealWeight"
                value={formData.idealWeight}
                onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
              />
              <InputGroup.Text id="basic-addon1">
                {formData.weightUnit}
              </InputGroup.Text>
            </InputGroup>
            {error?.idealWeight && (
              <small className="text-danger">
                <p>{error.idealWeight}</p>
              </small>
            )}

            <Form.Label>Current Weight</Form.Label>
            <InputGroup className={error?.currentWeight ? "" : "mb-4"}>
              <Form.Control
                placeholder="Current Weight"
                aria-label="CurrentWeight"
                aria-describedby="basic-addon2"
                type="text"
                name="currentWeight"
                value={formData.currentWeight}
                onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
              />
              <InputGroup.Text id="basic-addon1">
                {formData.weightUnit}
              </InputGroup.Text>
            </InputGroup>
            {error?.currentWeight && (
              <small className="text-danger">
                <p>{error.currentWeight}</p>
              </small>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="button" onClick={onSubmitHandler}>
              Save Record
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default FormModal;
