import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Button,
  Container,
  Paper,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Box,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// sections
import VehicleCollectorOptions from "./VehicleCollectorOptions";
import JanitorOptions from "./JanitorOptions";

//-----------------------------------------------------

const initVehicle = {
  ID: "None",
  Payload_Capacity: 0,
  Capacity_of_cargo_space: 0,
  Fuel_consumption: 0,
  Route_ID: "",
};

const initCollector = {
  ID: 0,
  Name: "None",
  Sex: "",
  Date_of_birth: "",
  Phone: "",
  Address: "",
  Salary: 0,
  Avatar: "",
  License: "",
};

//------------------------------------------------------

const steps = ["Phương tiện và tài xế", "Người thu gom"];

//-----------------------------------------------------

export default function AddTaskPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const navBackShift = () => {
    if (collector.ID !== 0 && vehicle.ID !== "None") {
      var new_task = {
        collector: collector,
        vehicle: vehicle,
        leaderList: leaderList,
        memberList: memberList,
      };
      if (localStorage.getItem(`new_task`) !== null)
        localStorage.removeItem(`new_task`);
      // save to localstorage
      localStorage.setItem("new_task", JSON.stringify(new_task));
    }

    navigate(`/app/shift/${location.state.shiftid}`, {
      replace: true,
    });
  };

  //---------------------------------------------------

  const [activeStep, setActiveStep] = useState(0);

  const [errors, setErrors] = useState({
    ve: false,
    co: false,
  });

  const handleNext = (activeStep) => {
    if (activeStep === 0) {
      if (collector.ID !== initCollector.ID && vehicle.ID !== initVehicle.ID) {
        setErrors({ ...errors, co: false, ve: false });
        setActiveStep(activeStep + 1);
      } else if (
        collector.ID === initCollector.ID &&
        vehicle.ID !== initVehicle.ID
      )
        setErrors({ ...errors, co: true, ve: false });
      else if (
        collector.ID !== initCollector.ID &&
        vehicle.ID === initVehicle.ID
      )
        setErrors({ ...errors, ve: true, co: false });
      else {
        setErrors({ ...errors, ve: true, co: true });
      }
    } else {
      // save button
      navBackShift();
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <VehicleCollectorOptions
            collector={collector}
            setCollector={setCollector}
            vehicle={vehicle}
            setVehicle={setVehicle}
            errors={errors}
          />
        );
      case 1:
        return (
          <JanitorOptions
            month_route={vehicle.Route_ID}
            memberList={memberList}
            setmemberList={setmemberList}
            leaderList={leaderList}
            setLeaderList={setLeaderList}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  };

  //---------------------------------------------------

  const [collector, setCollector] = useState(initCollector);

  const [vehicle, setVehicle] = useState(initVehicle);

  const [memberList, setmemberList] = useState([
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
  ]);

  const [leaderList, setLeaderList] = useState([]);

  //---------------------------------------------------

  return (
    <Container component="main">
      <Paper variant="outlined" sx={{ p: 3 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: "18px",
            mb: 3,
          }}
        >
          <IconButton
            sx={{ height: "32px", width: "32px" }}
            onClick={navBackShift}
          >
            <ArrowBackIcon sx={{ fontSize: "32px" }} />
          </IconButton>
          <Typography variant="h4">Quay lại</Typography>
        </Box>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <>
          {getStepContent(activeStep)}
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            {activeStep !== 0 && (
              <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                Quay lại
              </Button>
            )}

            <Button
              variant="contained"
              onClick={() => handleNext(activeStep)}
              sx={{ mt: 3, ml: 1 }}
            >
              {activeStep === steps.length - 1 ? "Lưu lại" : "Tiếp theo"}
            </Button>
          </Box>
        </>
      </Paper>
    </Container>
  );
}
