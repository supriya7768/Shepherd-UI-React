import React, { useRef, useState } from 'react';
import { Grid } from '@mui/material';
// import MuiTypography from '@mui/material/Typography';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
// import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { gridSpacing } from 'store/constant';

// import { Link } from 'react-router-dom';
import '../style/invoice.css'; // Import your project's CSS file

const Create = () => {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const mobileRef = useRef(null);
  const addressRef = useRef(null);
  const courseNameRef = useRef(null);
  const paymentDateRef = useRef(null);
  const statusRef = useRef(null);
  const dueDateRef = useRef(null);
  const subAmountRef = useRef(null);
  const paidAmountRef = useRef(null);
  const dueAmountRef = useRef(null);
  const taxesRef = useRef(null);
  const totalAmountRef = useRef(null);

  const [responseMsg, setResponseMsg] = useState('');
  const [showDueField, setShowDueField] = useState(false);

  const calculateTaxes = () => {
    const subAmountValue = subAmountRef.current.value;
    const taxRate = 0.18;
    const taxes = subAmountValue * taxRate;
    taxesRef.current.value = taxes.toFixed(2);
    calculateDue();
    calculateTotalAmount();
  };

  const calculateDue = () => {
    const subAmountValue = subAmountRef.current.value;
    const paidAmountValue = paidAmountRef.current.value;
    const taxesValue = taxesRef.current.value;

    // Parse the values to numbers (assuming they are strings)
    const subAmount = parseFloat(subAmountValue);
    const paidAmount = parseFloat(paidAmountValue);
    const taxes = parseFloat(taxesValue);

    // Calculate due amount as the difference between (sub amount + taxes) and paid amount
    const dueAmount = subAmount + taxes - paidAmount;

    // Update the "Due Amount" input field with the calculated value
    dueAmountRef.current.value = dueAmount.toFixed(2);
    calculateTotalAmount();
  };

  const calculateTotalAmount = () => {
    const subAmountValue = subAmountRef.current.value;
    const taxesValue = taxesRef.current.value;

    // Parse the values to numbers (assuming they are strings)
    const subAmount = parseFloat(subAmountValue);
    const taxes = parseFloat(taxesValue);

    // Calculate the total amount as the sum of sub amount and taxes
    const totalAmount = subAmount + taxes;

    // Update the "Total Amount" input field with the calculated value
    totalAmountRef.current.value = totalAmount.toFixed(2); // Assuming you want to display the total amount with 2 decimal places
  };

  // Regular expressions for email and mobile number validation
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const mobilePattern = /^[789]\d{9}$/;

  // Function to validate email and mobile number
  const validateInputs = () => {
    const email = emailRef.current.value;
    const mobile = mobileRef.current.value;

    if (!emailPattern.test(email)) {
      setResponseMsg('Please enter a valid email address.');
      setTimeout(() => {
        setResponseMsg('');
      }, 5000); // 5 seconds in milliseconds
      return false;
    }

    if (!mobilePattern.test(mobile)) {
      setResponseMsg('Please enter a valid mobile number');
      setTimeout(() => {
        setResponseMsg('');
      }, 5000); // 5 seconds in milliseconds
      return false;
    }

    return true;
  };

  const handleCreateInvoice = () => {
    // Get the values from the input elements using refs

    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const mobile = mobileRef.current.value;
    const address = addressRef.current.value;
    const courseName = courseNameRef.current.value;
    const paymentDate = paymentDateRef.current.value;
    const status = statusRef.current.value;
    // const dueDate = dueDateRef.current.value;
    const subAmount = subAmountRef.current.value;
    const paidAmount = paidAmountRef.current.value;
    const dueAmount = dueAmountRef.current.value;
    const taxes = taxesRef.current.value;
    const totalAmount = totalAmountRef.current.value;

    // Check if any of the required fields are empty
    if (!name || !email || !mobile || !address || !courseName || !paymentDate || !status || !subAmount || !paidAmount) {
      setResponseMsg('Please fill in all required fields.');
      setTimeout(() => {
        setResponseMsg('');
      }, 10000); // 10 seconds in milliseconds
      return; // Exit the function if any field is empty
    }

    // Validate email and mobile number inputs
    if (!validateInputs()) {
      return;
    }

    // Check if the Due Date field is visible (based on the showDueField state)
    const dueDate = showDueField ? dueDateRef.current.value : '';

    // Create a new XMLHttpRequest object
    const xhr = new XMLHttpRequest();

    // Configure the request to check if the email already exists
    xhr.open('GET', 'http://localhost:8080/getInvoiceByEmail?email=' + email, true);

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          const response = xhr.responseText;
          if (response === 'Email id is already present') {
            setResponseMsg('Email is already registered.');
            setTimeout(() => {
              setResponseMsg('');
            }, 5000); // 5 seconds in milliseconds
          } else {
            // If the email is not found, proceed to create a new invoice
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('mobile', mobile);
            formData.append('address', address);
            formData.append('courseName', courseName);
            formData.append('paymentDate', paymentDate);
            formData.append('status', status);
            formData.append('dueDate', dueDate);
            formData.append('subAmount', subAmount);
            formData.append('paidAmount', paidAmount);
            formData.append('dueAmount', dueAmount);
            formData.append('taxes', taxes);
            formData.append('totalAmount', totalAmount);

            // Create a new XMLHttpRequest object for creating the invoice
            const createInvoiceXhr = new XMLHttpRequest();

            // Configure the request to create a new invoice
            createInvoiceXhr.open('POST', 'http://localhost:8080/createInvoice', true);

            createInvoiceXhr.onreadystatechange = () => {
              if (createInvoiceXhr.readyState === 4) {
                if (createInvoiceXhr.status === 200) {
                  setResponseMsg('Invoice Generated');
                  setTimeout(() => {
                    setResponseMsg('');
                    window.location.reload();
                  }, 5000);
                } else {
                  setResponseMsg('An error occurred while creating the invoice.');
                  setTimeout(() => {
                    setResponseMsg('');
                  }, 10000); // 10 seconds in milliseconds
                }
              }
            };

            // Send the FormData object as the request body to create the invoice
            createInvoiceXhr.send(formData);
          }
        } else {
          setResponseMsg('An error occurred while generating invoice');
          setTimeout(() => {
            setResponseMsg('');
          }, 10000); // 10 seconds in milliseconds
        }
      }
    };

    // Send the request to check if the email exists
    xhr.send();
  };

  const handleStatusChange = () => {
    const selectedStatus = statusRef.current.value;
    // console.log('Selected Status:', selectedStatus); // Debugging line
    setShowDueField(selectedStatus === 'Pending'); // Show "Due Date" if status is "Pending"
  };

  return (
    <MainCard title="Create Invoice">
      {/* =====================lead details=================== */}

      <Grid container spacing={gridSpacing}>
        <Grid item xs={12} md={6}>
          <SubCard title="Lead Details">
            <Grid container direction="column" spacing={1}>
              <div className="form-group">
                <label htmlFor="leadName" className="mar">
                  Lead Name
                </label>
                <input type="text" id="nameRef" className="form-control" ref={nameRef} name="name" />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="mar">
                  Email ID
                </label>
                <input type="text" id="emailRef" className="form-control" ref={emailRef} />
              </div>

              <div className="form-group">
                <label htmlFor="mobileNo" className="marr">
                  Mobile No
                </label>
                <input type="number" id="mobileRef" className="form-control" ref={mobileRef} />
              </div>

              <div className="form-group">
                <label htmlFor="address" className="mar">
                  Address
                </label>
                <input type="text" id="addressRef" className="form-control" ref={addressRef} />
              </div>
            </Grid>
          </SubCard>
        </Grid>

        {/* ==================payment status================= */}

        <Grid item xs={12} md={6}>
          <SubCard title="Payment Status">
            <Grid container direction="column" spacing={1}>
              <div className="form-group">
                <label htmlFor="leadName" className="mar">
                  Course Name
                </label>
                <select className="form-control" ref={courseNameRef}>
                  <option>Select Course</option>
                  <option>Software Testing(Java Selenium)</option>
                  <option>Automation Testing(Python Selenium)</option>
                  <option>Rest API Testing</option>
                  <option>Java Full Stack Development</option>
                  <option>MERN Java Full Stack Development</option>
                  <option>.NET Full Stack Development</option>
                  <option>Diploma in UI/UX Design</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="field" className="mar">
                  Payment Date
                </label>
                <input className="form-control" type="date" ref={paymentDateRef}></input>
              </div>

              <div className="form-group">
                <label htmlFor="passingYear" className="mar">
                  Status
                </label>
                <select className="form-control" ref={statusRef} onChange={handleStatusChange}>
                  <option>Paid</option>
                  <option>Pending</option>
                  <option>Refund</option>
                </select>
              </div>

              <div className="form-group">
                {showDueField && (
                  <>
                    <label htmlFor="dueDate" className="marr">
                      Due date
                    </label>
                    <input className="form-control" type="date" ref={dueDateRef} />
                  </>
                )}
              </div>
            </Grid>
          </SubCard>
        </Grid>

        {/* ================transaction details===================== */}

        <Grid item xs={12} md={6}>
          <SubCard title="Transactions">
            <div className="form-group">
              <label htmlFor="courseName" className="mar">
                Sub Amount
              </label>
              <input className="form-control" type="number" placeholder="₹ 000" ref={subAmountRef} onChange={calculateTaxes}></input>
            </div>
            <div className="form-group">
              <label htmlFor="mode" className="mar">
                Paid Amount
              </label>
              <input className="form-control" type="number" placeholder="₹ 000" ref={paidAmountRef} onChange={calculateDue}></input>
            </div>
            <div className="form-group">
              <label htmlFor="experience" className="mar">
                Due Amount
              </label>
              <input className="form-control" type="number" placeholder="₹ 000" ref={dueAmountRef}></input>
            </div>
            <div className="form-group">
              <label htmlFor="courseDoneFromOtherInstitute" className="mar">
                Taxes
              </label>
              <input className="form-control" type="number" placeholder="₹ 000" ref={taxesRef}></input>
            </div>
            <div className="form-group">
              <label htmlFor="interest" className="marr">
                Total
              </label>
              <input className="form-control" type="number" placeholder="₹ 000" ref={totalAmountRef}></input>
            </div>
            <button className="btn" onClick={handleCreateInvoice}>
              Create Invoice
            </button>{' '}
            <h4 className="h4tag" id="reg-response">
              {responseMsg}
            </h4>
          </SubCard>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default Create;
