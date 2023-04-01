import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import FormModal from "../components/FormModal";
import { getUserData, getUserInformation } from "../util-methods/http-calls";

const Information = () => {
  const [userData, setUserData] = useState({});
  const [weightInfo, setWeightInfo] = useState({});

  useEffect(() => {
    fetchUserInformaion();
  }, []);

  const fetchUserInformaion = async () => {
    const result = await getUserInformation();
    const result2 = await getUserData();
    setUserData(result2?.user || {});
    setWeightInfo(result?.information || {});
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <Card className="text-center m-3 shadow" style={{ width: "500px" }}>
        <Card.Header>{userData?.fullName}</Card.Header>
        <Card.Body>
          <Card.Title>Current Weight: {weightInfo?.currentWeight}</Card.Title>
          <Card.Title>Ideal Weight: {weightInfo?.idealWeight}</Card.Title>
          <Card.Text>Weight Unit: {weightInfo?.weightUnit}</Card.Text>
          <FormModal fetchUserInformaion={fetchUserInformaion}/>
        </Card.Body>
        <Card.Footer className="text-muted">
          Updated: {weightInfo?.currentDate}
        </Card.Footer>
      </Card>
    </div>
  );
};

export default Information;
