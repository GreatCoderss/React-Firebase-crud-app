import { TextField, MenuItem, Dialog, DialogContent } from "@material-ui/core";

export const RenderInputText = ({ label, name, data, error, onChange }) => (
  <TextField
    variant='outlined'
    fullWidth={true}
    color='primary'
    size='small'
    label={label}
    name={name}
    value={data[name]}
    error={error[name] ? true : false}
    helperText={error[name] ? error[name] : ""}
    onChange={onChange}
  />
);

export const RenderSelect = ({
  label,
  name,
  data,
  error,
  options,
  onChange,
}) => (
  <TextField
    select
    variant='outlined'
    fullWidth={true}
    color='primary'
    size='small'
    label={label}
    name={name}
    value={data[name]}
    error={error[name] ? true : false}
    helperText={error[name] ? error[name] : ""}
    onChange={onChange}>
    {options.map((item, i) => (
      <MenuItem key={i} value={item.value}>
        {item.key}
      </MenuItem>
    ))}
  </TextField>
);

//Alerts Dialog
export const AlertDialog = ({ open, DialogContent, handleClose }) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'>
        <DialogContent>{DialogContent}</DialogContent>
      </Dialog>
    </div>
  );
};
