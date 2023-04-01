import React, { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { signUserData } from "../util-methods/http-calls";
import { isAuthenticated } from "../auth/helper";
import { useNavigate } from "react-router-dom";

const initialSignForm = {
  fullName: "",
  email: "",
  password: "",
};

const initialFormIsDirty = {
  fullName: false,
  email: false,
  password: false,
};

const Home = ({ getUserState }) => {
  const [signForm, setSignForm] = useState(() => ({ ...initialSignForm }));
  const [isDirty, setIsDirty] = useState(() => ({ ...initialFormIsDirty }));
  const [error, setError] = useState(() => ({}));

  const navigate = useNavigate();

  const firstUpdate = useRef(true);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    formValidation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify({ ...signForm }), JSON.stringify({ ...isDirty })]);

  const onChangeHandler = (name, value) => {
    setSignForm((prev) => ({ ...prev, [name]: value }));
    setIsDirty((prev) => ({ ...prev, [name]: true }));
  };

  const formValidation = () => {
    const updateIsDirty = { ...isDirty };
    const updateError = { ...error };

    Object.keys(signForm).forEach((key) => {
      if (key === "fullName" && isDirty[key]) {
        if (signForm[key] === "") {
          updateError[key] = "Full name field is required!";
        } else if (!new RegExp("^[a-zA-Z ]{3,36}$").test(signForm[key])) {
          updateError[key] = "Full name is not valid!";
        } else {
          delete updateError[key];
          updateIsDirty[key] = false;
        }
      } else if (key === "email" && isDirty[key]) {
        if (signForm[key] === "") {
          console.log("KEY", key);
          updateError[key] = "Email field is required!";
        } else if (
          !new RegExp(/[^\s@]+@[^\s@]+\.[^\s@]+/).test(signForm[key])
        ) {
          updateError[key] = "Email is not valid!";
        } else {
          delete updateError[key];
          updateIsDirty[key] = false;
        }
      } else if (key === "password" && isDirty[key]) {
        if (signForm[key] === "") {
          updateError[key] = "Password field is required!";
        } else if (
          !new RegExp(
            "^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$"
          ).test(signForm[key])
        ) {
          updateError[key] =
            "Please provide atleast one uppercase, number and special character!";
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
    Object.keys(signForm).forEach((v) => {
      if (signForm[v] === "") error = true;
    });

    console.log(error);
    if (!error) {
      console.log("Calling Backend");
      const result = await signUserData(signForm);
      console.log(result);
      getUserState();
      setSignForm({ ...initialSignForm });
      setIsDirty({ ...initialFormIsDirty });
      navigate("/information");
    }
  };

  if (isAuthenticated()) {
    return navigate("/information");
  }

  return (
    <>
      <div className="container col-xl-10 col-xxl-8 px-4 py-5">
        <div className="row align-items-center g-lg-5 py-5">
          <div className="col-lg-7 text-center text-lg-start">
            <h1 className="display-4 fw-bold lh-1 mb-3">
              Welcome to Unlock.Fit!
            </h1>
            <p className="col-lg-10 fs-4">
              Your go-to destination for all things weight measurement! We are a
              team of fitness enthusiasts who understand the importance of
              tracking your weight in achieving your fitness goals. Our mission
              is to empower individuals with the knowledge and tools to make
              informed decisions about their health and wellness.
            </p>
          </div>
          <div className="col-md-10 mx-auto col-lg-5">
            <Form className="p-4 p-md-5 border rounded-3 bg-light">
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter full name"
                  name="fullName"
                  value={signForm.fullName}
                  onChange={(e) =>
                    onChangeHandler(e.target.name, e.target.value)
                  }
                />
                {error?.fullName && (
                  <small className="mb-3 text-danger">
                    <p>{error.fullName}</p>
                  </small>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={signForm.email}
                  onChange={(e) =>
                    onChangeHandler(e.target.name, e.target.value)
                  }
                />
                {error?.email && (
                  <small className="mb-3 text-danger">
                    <p>{error.email}</p>
                  </small>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  name="password"
                  value={signForm.password}
                  onChange={(e) =>
                    onChangeHandler(e.target.name, e.target.value)
                  }
                />
                {error?.password && (
                  <small className="mb-3 text-danger">
                    <p>{error.password}</p>
                  </small>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>
              <Button
                variant="primary"
                type="button"
                className="w-100 btn btn-md btn-primary"
                onClick={onSubmitHandler}
              >
                Sign up or Log in
              </Button>
              <hr className="my-4" />
            </Form>
          </div>
        </div>
      </div>

      <div className="px-4 py-5 my-5">
        <div className="text-center">
          <i className="bi bi-unlock-fill" style={{ fontSize: "5rem" }}></i>
          <h1 className="display-5 fw-bold">About Us</h1>
        </div>

        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4 text-left">
            At Unlock.Fit, we offer a comprehensive range of weight measurement
            products that cater to everyone's needs. Whether you're looking for
            a basic scale or a more advanced body composition analyzer, we have
            got you covered. Our products are carefully curated to provide
            accurate and reliable readings, so you can track your progress with
            confidence. <br />
            We understand that navigating the world of weight measurement can be
            overwhelming, which is why we have created a community of experts to
            support you on your journey. Our team of certified nutritionists,
            personal trainers, and wellness coaches are here to answer your
            questions, provide guidance and offer motivation when you need it
            most.
            <br />
            At Unlock.Fit, we are passionate about helping individuals achieve
            their health and fitness goals. We believe that everyone deserves
            access to quality weight measurement products and support, and we
            are committed to making this a reality. Join us today and unlock
            your potential!
          </p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <button
              type="button"
              className="btn btn-primary btn-lg px-4 gap-3"
              fdprocessedid="57u9s5"
            >
              Explore Products
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary btn-lg px-4"
              fdprocessedid="yql45h"
            >
              ContactUs
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
          <div className="col-md-4 d-flex align-items-center">
            <a
              href="/"
              className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1"
            >
              <svg className="bi" width="30" height="24">
                <use href="#bootstrap"></use>
              </svg>
            </a>
            <span className="mb-3 mb-md-0 text-muted">
              © 2023 Unlock.Fit, Inc
            </span>
          </div>

          <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
            <li className="ms-3">
              <a
                className="text-muted"
                href="https://twitter.com/"
                target="_blank"
                rel="noreferrer"
              >
                <i className="bi bi-twitter" style={{ fontSize: "1.4rem" }}></i>
              </a>
            </li>
            <li className="ms-3">
              <a
                className="text-muted"
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
              >
                <i
                  className="bi bi-instagram"
                  style={{ fontSize: "1.4rem" }}
                ></i>
              </a>
            </li>
            <li className="ms-3">
              <a
                className="text-muted"
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
              >
                <i
                  className="bi bi-facebook"
                  style={{ fontSize: "1.4rem" }}
                ></i>
              </a>
            </li>
          </ul>
        </footer>
      </div>
    </>
  );
};

export default Home;
