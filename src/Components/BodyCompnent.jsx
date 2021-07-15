import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  makeStyles,
  Paper,
  Typography,
  Card,
  CardContent,
  Button,
} from "@material-ui/core";
import { Styles } from "./style";
import { RenderInputText, RenderSelect } from "./common";
import {
  AddDataToFirebase,
  GetFirebaseData,
  GetUpdatedSnapData,
  UpdateFirebaseCollectionDataById,
} from "../databaseDriver";
import UploadedData from "./UploadedData";
import { toast } from "react-toastify";

const useStyles = makeStyles(Styles);

export default function BodyComponent() {
  const classes = useStyles();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
  });
  const [error, setError] = useState({});
  const [Fetched, setFetched] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  //for firebase database
  const [uploadedData, setUploadedData] = useState([]);

  //for update purpose
  const [isUpdateAction, setIsUpdateAction] = useState(false);
  const [updateId, setUpdateId] = useState(false);

  const handleChange = ({ target }) => {
    const name = target.name;
    const value = target.value;

    //setting up errors
    value.length < 3
      ? (error[name] = setError({
          ...error,
          [name]: `${name} have atleast 3 letter`,
        }))
      : (error[name] = setError({ ...error, [name]: "" }));

    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    isUpdateAction
      ? UpdateFirebaseCollectionDataById({ id: updateId, data: data })
      : AddDataToFirebase(data);

    //resetting form data.
    setData({
      firstName: "",
      lastName: "",
      email: "",
      gender: "",
    });

    GetUpdatedSnapData({ Fx_RunOnUpdate: setFetched(false) });

    isUpdateAction
      ? toast.warning("Updated Successfully")
      : toast.success("Added Successfully");
  };

  useEffect(() => {
    if (!Fetched) {
      GetFirebaseData({ setUploadedData });
      setFetched(true);
    }
  }, [Fetched, uploadedData.length]);

  //form form validation
  // useEffect(() => {
  //   let valid = false;
  //   Object.keys(data).forEach((item) => {
  //     if (data[item] && data[item] !== 0) {
  //       valid = true;
  //     } else {
  //       valid = false;
  //     }
  //   });
  //   setIsFormValid(valid);
  // }, [data]);

  useEffect(() => {
    let valid = false;
    Object.keys(data).forEach((item) => {
      if (data[item] && data[item] !== "") {
        valid = true;
      } else {
        valid = false;
      }
    });
    setIsFormValid(valid);
  }, [data]);

  return (
    <Grid container className={classes.formContainer}>
      <Grid item xs={12} sm={10}>
        {/* form container  */}
        <form onSubmit={handleSubmit}>
          <Paper component={Box} mb={1} p={2}>
            <Box mb={2} mt={1}>
              <Typography variant='h6' color='primary' align='center'>
                Greatcoder? Signup Here !{" "}
              </Typography>
            </Box>
            {/* //row */}
            <Grid container>
              <Grid item xs={12} sm={7}>
                <Card>
                  <CardContent>
                    <Box mb={1}>
                      <Grid container spacing={1}>
                        <Grid item xs={6} sm={6}>
                          <RenderInputText
                            label='First Name'
                            name='firstName'
                            data={data}
                            error={error}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid item xs={6} sm={6}>
                          <RenderInputText
                            label='Last Name'
                            name='lastName'
                            data={data}
                            error={error}
                            onChange={handleChange}
                          />
                        </Grid>
                      </Grid>
                    </Box>
                    <Box mb={1}>
                      <RenderInputText
                        label='Email'
                        name='email'
                        data={data}
                        error={error}
                        onChange={handleChange}
                      />
                    </Box>
                    <Box mb={1}>
                      <RenderSelect
                        label='Gender'
                        name='gender'
                        data={data}
                        error={error}
                        options={[
                          { key: "male", value: "male" },
                          { key: "female", value: "female" },
                          { key: "others", value: "others" },
                        ]}
                        onChange={handleChange}
                      />
                    </Box>
                  </CardContent>
                  <Box mt={1} mb={1} p={2}>
                    <Button
                      type='submit'
                      variant='contained'
                      size='small'
                      color='primary'
                      fullWidth={true}
                      disabled={!isFormValid}>
                      Submit
                    </Button>
                  </Box>
                </Card>
              </Grid>
              <Grid item xs={12} sm={5}>
                <UploadedData
                  UserData={uploadedData}
                  setFetched={setFetched}
                  setData={setData}
                  setIsUpdateAction={setIsUpdateAction}
                  setUpdateId={setUpdateId}
                />
              </Grid>
            </Grid>
          </Paper>
        </form>
        {/* uploaddataDiaplay */}
      </Grid>
    </Grid>
  );
}
