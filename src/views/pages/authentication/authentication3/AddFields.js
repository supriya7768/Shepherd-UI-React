import React, { useState } from 'react';
import { Grid, Typography, TextField, Button, Divider, MenuItem, FormControlLabel, Radio, Checkbox } from '@mui/material'; // Import required components

const AddFields = () => {
  const [fields, setFields] = useState([]);
  const [inputType, setInputType] = useState('');
  const [fieldName, setFieldName] = useState('');

  const handleAddField = () => {
    setFields([...fields, { type: inputType, name: fieldName }]);
    setInputType('');
    setFieldName('');
  };

  const handleRemoveField = (index) => {
    const updatedFields = [...fields];
    updatedFields.splice(index, 1);
    setFields(updatedFields);
  };

  return (
    <Grid container justifyContent="center" alignItems="center" spacing={2} sx={{ minHeight: 'calc(100vh - 68px)' }}>
      <Grid item xs={12} sm={8} md={6}>
        <Typography variant="h4" align="center" gutterBottom>
          Add Fields
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField fullWidth label="Field Name" variant="outlined" value={fieldName} onChange={(e) => setFieldName(e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              select
              label="Field Type"
              variant="outlined"
              value={inputType}
              onChange={(e) => setInputType(e.target.value)}
            >
              <MenuItem value="">Select Type</MenuItem>
              <MenuItem value="text">Text</MenuItem>
              <MenuItem value="number">Numeric</MenuItem>
              <MenuItem value="radio">Radio Buttons</MenuItem>
              <MenuItem value="checkbox">Checkbox</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth variant="contained" color="primary" onClick={handleAddField}>
              Add Field
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          {fields.map((field, index) => (
            <Grid container item key={index} xs={12} alignItems="center" spacing={2}>
              <Grid item xs={6}>
                <Typography>{field.name}:</Typography>
              </Grid>
              <Grid item xs={6}>
                {field.type === 'text' || field.type === 'number' ? (
                  <TextField fullWidth variant="outlined" size="small" />
                ) : field.type === 'radio' ? (
                  <div>
                    <FormControlLabel control={<Radio />} label="Option 1" />
                    <FormControlLabel control={<Radio />} label="Option 2" />
                  </div>
                ) : (
                  field.type === 'checkbox' && <FormControlLabel control={<Checkbox />} label="Checkbox" />
                )}
              </Grid>
              <Grid item xs={12}>
                <Button variant="outlined" color="secondary" onClick={() => handleRemoveField(index)}>
                  Remove
                </Button>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AddFields;