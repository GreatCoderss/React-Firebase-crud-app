import React, { useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  makeStyles,
  IconButton,
  Box,
  Paper,
  Button,
} from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import { Styles } from "./style";
import { AlertDialog } from "./common";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { red } from "@material-ui/core/colors";
import { DeleteData, GetFirebaseCollectionDataById } from "../databaseDriver";
import { toast } from "react-toastify";

const useStyles = makeStyles(Styles);

export default function UploadedData({
  UserData,
  setFetched,
  setData,
  setUpdateId,
  setIsUpdateAction,
}) {
  const classes = useStyles();
  const [currentId, setCurrentId] = useState("");

  //for dialog Purpose
  const [open, setOpen] = useState(false);
  const handleDialogOpen = () => setOpen(true);
  const handleDialogClose = () => setOpen(false);

  //dailogContent
  const DialogConetent = () => (
    <Box p={2}>
      <Box textAlign='center'>
        <ErrorOutlineIcon style={{ fontSize: "60px", color: red[500] }} />
      </Box>
      <Box mb={2}>
        <Typography variant='h6' color='textSecondary' align='center'>
          Are You Sure to delete ?
        </Typography>
      </Box>
      <Box textAlign='right'>
        <Button variant='contained' color='default' onClick={handleDialogClose}>
          Cancel{" "}
        </Button>
        <Button
          style={{ marginLeft: "8px" }}
          variant='contained'
          color='secondary'
          onClick={() => {
            DeleteData({ id: currentId });
            handleDialogClose();
            setFetched(false);
            toast.success("Deleted Successfully");
          }}>
          Delete{" "}
        </Button>
      </Box>
    </Box>
  );

  return (
    <div className={classes.uploadDataBox}>
      <AlertDialog
        open={open}
        DialogContent={DialogConetent}
        handleClose={handleDialogClose}
      />

      <Grid container>
        {UserData.length === 0 ? (
          <Grid item xs={12}>
            <Typography align='center'>No Data To Show</Typography>
            <Typography align='center' variant='subtitle2' color='error'>
              Plz Add Data Through Form
            </Typography>
          </Grid>
        ) : (
          UserData.map((item, i) => (
            <Grid item xs={12} key={i}>
              <Card className={classes.cardData}>
                <CardContent className={classes.cardContent}>
                  {/* two buttons  */}
                  <IconButton
                    color='secondary'
                    className={classes.del_Button}
                    onClick={() => {
                      handleDialogOpen();
                      setCurrentId(item.id);
                      console.log("delCilcked");
                    }}>
                    <DeleteForeverIcon />
                  </IconButton>
                  <IconButton
                    color='primary'
                    className={classes.edit_Button}
                    onClick={() => {
                      GetFirebaseCollectionDataById({ id: item.id }).then(
                        (data) => {
                          setData(data.data());
                          setUpdateId(item.id);
                          setIsUpdateAction(true);
                        }
                      );
                    }}>
                    <EditIcon />
                  </IconButton>
                  <Typography
                    variant='body1'
                    color='textPrimary'>{`${item.firstName} ${item.lastName}`}</Typography>
                  <Typography variant='body2' color='textPrimary'>
                    {item.email}
                  </Typography>
                  <Typography variant='body2' color='textPrimary'>
                    {item.gender}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </div>
  );
}
