import React, { useState } from 'react';

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
    <div>
      <h2>Add Fields</h2>
      <div>
        <label>
          Field Name:
          <input type="text" value={fieldName} onChange={(e) => setFieldName(e.target.value)} />
        </label>
        <label>
          Field Type:
          <select value={inputType} onChange={(e) => setInputType(e.target.value)}>
            <option value="">Select Type</option>
            <option value="text">Text</option>
            <option value="number">Numeric</option>
            <option value="radio">Radio Buttons</option>
            <option value="checkbox">Checkbox</option>
          </select>
        </label>
        <button onClick={handleAddField}>Add Field</button>
      </div>

      <h3>Form Preview</h3>
      <form>
        {fields.map((field, index) => (
          <div key={index}>
            <label>
              {field.name}:
              {field.type === 'text' || field.type === 'number' ? (
                <input type={field.type} />
              ) : field.type === 'radio' ? (
                <div>
                  <input type="radio" id={`${field.name}_1`} name={field.name} value="option1" />
                  <label htmlFor={`${field.name}_1`}>Option 1</label>
                  <input type="radio" id={`${field.name}_2`} name={field.name} value="option2" />
                  <label htmlFor={`${field.name}_2`}>Option 2</label>
                </div>
              ) : (
                field.type === 'checkbox' && <input type="checkbox" />
              )}
            </label>
            <button type="button" onClick={() => handleRemoveField(index)}>
              Remove
            </button>
          </div>
        ))}
      </form>
    </div>
  );
};

export default AddFields;
