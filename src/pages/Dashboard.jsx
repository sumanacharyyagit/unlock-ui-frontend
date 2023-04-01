import React, { useEffect, useState } from "react";
import { Card, Spinner } from "react-bootstrap";
import { getAllUserData } from "../util-methods/http-calls";
import { colorPicker } from "../util-methods/colorPicker";

const Dashboard = () => {
  const [usersData, setUsersData] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    fetchUsersInformaion();
  }, []);

  const fetchUsersInformaion = async () => {
    const result = await getAllUserData();
    setUsersData(result?.userInformation || []);
    setLoader(false);
  };

  if (loader) {
    return (
      <div className="d-flex justify-content-center align-items-center flex-wrap mt-5">
        <Spinner
          animation="border"
          variant="warning"
          style={{ height: "100px", width: "100px" }}
        />
      </div>
    );
  }
  // const colorPicker = (unit, currentVal, idealVal) => {

  return (
    <div className="d-flex justify-content-center align-items-center flex-wrap">
      {!!usersData.length &&
        usersData.map((user) => {
          let color = colorPicker(
            user?.weightUnit,
            Number(user?.currentWeight),
            Number(user?.idealWeight)
          );
          return (
            <Card
              key={user._id}
              className="m-5 shadow"
              style={{ width: "22rem", ...color }}
            >
              <Card.Body>
                <Card.Title>{user?.userId.fullName}</Card.Title>
                <Card.Subtitle className="mb-2 text-info">
                  Updated: {user?.currentDate}
                </Card.Subtitle>
                <Card.Subtitle className="mb-2 text-info">
                  Email: {user?.userId.email}
                </Card.Subtitle>
                <Card.Text>Current Weight: {user?.currentWeight}</Card.Text>
                <Card.Text>Ideal Weight: {user?.idealWeight}</Card.Text>
                <Card.Text>Weight Unit: {user?.weightUnit}</Card.Text>

                <Card.Link
                  className="btn btn-outline-info"
                  href={`mailto:${user?.userId.email}`}
                >
                  Direct Mail
                </Card.Link>
              </Card.Body>
            </Card>
          );
        })}
    </div>
  );
};

export default Dashboard;
