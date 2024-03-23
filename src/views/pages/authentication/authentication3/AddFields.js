import { useState } from 'react';
import { Grid, Typography, TextField, Button, Divider, MenuItem } from '@mui/material';

const AddFields = () => {
  const [fields, setFields] = useState([]);
  const [inputType, setInputType] = useState('');
  const [fieldName, setFieldName] = useState('');
  const [radioCount, setRadioCount] = useState(0);
  const [radioNames, setRadioNames] = useState([]);
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [dropdownOption, setDropdownOption] = useState('');
  const [multipleChoices, setMultipleChoices] = useState([]);
  const [multipleChoiceName, setMultipleChoiceName] = useState('');

  const handleAddField = () => {
    if (inputType === 'radio') {
      const radios = [];
      for (let i = 0; i < radioCount; i++) {
        radios.push({ name: radioNames[i] || `Option ${i + 1}` });
      }
      setFields([...fields, { type: inputType, radios, name: fieldName }]);
    } else if (inputType === 'select') {
      setFields([...fields, { type: inputType, name: fieldName, options: dropdownOptions }]);
    } else if (inputType === 'multiple-choice') {
      setFields([...fields, { type: inputType, name: fieldName, options: multipleChoices }]);
    } else {
      setFields([...fields, { type: inputType, name: fieldName }]);
    }
    setInputType('');
    setFieldName('');
    setRadioCount(0);
    setRadioNames([]);
    setDropdownOptions([]);
    setDropdownOption('');
    setMultipleChoices([]);
    setMultipleChoiceName('');
  };

  const handleRemoveField = (index) => {
    const updatedFields = [...fields];
    updatedFields.splice(index, 1);
    setFields(updatedFields);
  };

  const handleRadioNameChange = (index, value) => {
    const updatedRadioNames = [...radioNames];
    updatedRadioNames[index] = value;
    setRadioNames(updatedRadioNames);
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
              <MenuItem value="date">Date</MenuItem>
              <MenuItem value="time">Time</MenuItem>
              <MenuItem value="radio">Radio Buttons</MenuItem>
              <MenuItem value="checkbox">Checkbox</MenuItem>
              <MenuItem value="select">Dropdown</MenuItem>
              <MenuItem value="multiple-choice">Multiple Choice</MenuItem>
            </TextField>
          </Grid>
          {inputType === 'radio' && (
            <>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="number"
                  label="Number of Radio Buttons"
                  variant="outlined"
                  value={radioCount}
                  onChange={(e) => setRadioCount(e.target.value)}
                />
              </Grid>
              {[...Array(Number(radioCount))].map((_, index) => (
                <Grid item xs={12} key={index}>
                  <TextField
                    fullWidth
                    label={`Radio Button ${index + 1}`}
                    variant="outlined"
                    value={radioNames[index] || ''}
                    onChange={(e) => handleRadioNameChange(index, e.target.value)}
                  />
                </Grid>
              ))}
            </>
          )}
          {inputType === 'select' && (
            <>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Dropdown Option"
                  variant="outlined"
                  value={dropdownOption}
                  onChange={(e) => setDropdownOption(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setDropdownOptions([...dropdownOptions, dropdownOption]);
                    setDropdownOption('');
                  }}
                >
                  Add Option
                </Button>
              </Grid>
              {/* Render added dropdown options */}
            </>
          )}
          {inputType === 'multiple-choice' && (
            <>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Multiple Choice Option Name"
                  variant="outlined"
                  value={multipleChoiceName}
                  onChange={(e) => setMultipleChoiceName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setMultipleChoices([...multipleChoices, multipleChoiceName]);
                    setMultipleChoiceName('');
                  }}
                >
                  Add Option
                </Button>
              </Grid>
              {/* Render added multiple-choice options */}
            </>
          )}
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
                {/* Render field based on type */}
                {field.type === 'text' || field.type === 'number' || field.type === 'date' || field.type === 'time' ? (
                  <TextField fullWidth variant="outlined" />
                ) : field.type === 'radio' ? (
                  <div>
                    {/* Render radio buttons */}
                    {field.radios.map((radio, radioIndex) => (
                      <div key={radioIndex}>
                        <label>
                          <input type="radio" />
                          {radio.name}
                        </label>
                      </div>
                    ))}
                  </div>
                ) : field.type === 'select' ? (
                  <TextField fullWidth select variant="outlined" value="" onChange={() => {}}>
                    {field.options.map((option) => (
                      <MenuItem key={optionIndex} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                ) : field.type === 'multiple-choice' ? (
                  <div>
                    {/* Render multiple-choice options */}
                    {field.options.map((option, optionIndex) => (
                      <div key={optionIndex}>
                        <label>
                          <input type="checkbox" />
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                ) : null}
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
