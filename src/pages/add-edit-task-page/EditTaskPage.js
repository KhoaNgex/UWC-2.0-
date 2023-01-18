import { useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
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

//------------------------------------------------------

const steps = ["Phương tiện và tài xế", "Người thu gom"];

//-----------------------------------------------------

export default function EditTaskPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { taskid } = useParams();

  const navBackShift = () => {
    if (collector.ID !== 0 && vehicle.ID !== "None") {
      var edited_task = {
        collector: collector,
        vehicle: vehicle,
        leaderList: leaderList,
        memberList: memberList,
      };

      if (localStorage.getItem(`new-edited-task-${taskid}`) !== null)
        localStorage.removeItem(`new-edited-task-${taskid}`);
      // save to localstorage
      localStorage.setItem(
        `new-edited-task-${taskid}`,
        JSON.stringify(edited_task)
      );
    }
    // remove localStorage
    if (localStorage.getItem(`edited-task-${taskid}`) !== null) {
      localStorage.removeItem(`edited-task-${taskid}`);
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
      if (collector.ID !== 0 && vehicle.ID !== "None") {
        setErrors({ ...errors, co: false, ve: false });
        setActiveStep(activeStep + 1);
      } else if (collector.ID === 0 && vehicle.ID !== "None")
        setErrors({ ...errors, co: true, ve: false });
      else if (collector.ID !== 0 && vehicle.ID === "None")
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

  const edit_info = JSON.parse(localStorage.getItem(`edited-task-${taskid}`));

  const [collector, setCollector] = useState(edit_info.collector);

  const [vehicle, setVehicle] = useState(edit_info.vehicle);

  const [memberList, setmemberList] = useState(edit_info.memberList);

  const [leaderList, setLeaderList] = useState(edit_info.leaderList);

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
