import React, { useRef, useState } from 'react';
import { Grid } from '@mui/material';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import '../style/lead.css';

const AddLead = () => {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const mobileRef = useRef(null);
  const addressRef = useRef(null);
  const degreeRef = useRef(null);
  const fieldRef = useRef(null);
  const passingYearRef = useRef(null);
  const collegeNameRef = useRef(null);
  const courseNameRef = useRef(null);
  const modeRef = useRef(null);
  const experienceRef = useRef(null);
  const yearsOfExperienceRef = useRef(null);
  const designationRef = useRef(null);
  const courseDoneFromOtherInstituteRef = useRef(null);
  const instituteNameRef = useRef(null);
  const reasonForChangingRef = useRef(null);
  const interestRef = useRef(null);
  const approachRef = useRef(null);
  const referenceNameRef = useRef(null);
  const batchCodeRef = useRef(null);
  const statusRef = useRef(null);
  const reasonRef = useRef(null);

  const [responseMsg, setResponseMsg] = useState('');
  const [showInstituteFields, setShowInstituteFields] = useState(false); // State to control field visibility
  const [showCourseFields, setShowCourseFields] = useState(false); // State to control field visibility
  const [showReferenceFields, setShowReferenceFields] = useState(false); // State to control reference field visibility
  const [showReasonField, setShowReasonFields] = useState(false); // State to control reason field visibility

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

  const handleExperience = () => {
    const selectedExperience = experienceRef.current.value;
    setShowInstituteFields(selectedExperience === 'IT');
  };

  const handlecdfoi = () => {
    const selectedCourseDoneFromOtherInstitute = courseDoneFromOtherInstituteRef.current.value;
    setShowCourseFields(selectedCourseDoneFromOtherInstitute === 'Yes');
  };

  const handleapproach = () => {
    const selectedApproach = approachRef.current.value;
    setShowReferenceFields(selectedApproach === 'Reference');
  };

  const handleStatus = () => {
    const selectedStatus = statusRef.current.value;
    setShowReasonFields(selectedStatus === 'PostPone' || selectedStatus === 'Cancel');
  };

  const handleAddLead = (e) => {
    e.preventDefault();
    const leadName = nameRef.current.value;
    const email = emailRef.current.value;
    const mobileNo = mobileRef.current.value;
    const address = addressRef.current.value;
    const degree = degreeRef.current.value;
    const field = fieldRef.current.value;
    const passingYear = passingYearRef.current.value;
    const collegeName = collegeNameRef.current.value;
    const courseName = courseNameRef.current.value;
    const mode = modeRef.current.value;
    const experience = experienceRef.current.value;
    const courseDoneFromOtherInstitute = courseDoneFromOtherInstituteRef.current.value;
    const interest = interestRef.current.value;
    const approach = approachRef.current.value;
    const status = statusRef.current.value;

    // // Check if any of the required fields are empty
    if (
      !leadName ||
      !email ||
      !mobileNo ||
      !address ||
      !degree ||
      !field ||
      !passingYear ||
      !collegeName ||
      !courseName ||
      !mode ||
      !experience ||
      !courseDoneFromOtherInstitute ||
      !interest ||
      !approach ||
      !status
    ) {
      setResponseMsg('Please fill in all required fields.');
      setTimeout(() => {
        setResponseMsg('');
      }, 5000); // 5 seconds in milliseconds
      return; // Exit the function if any field is empty
    }

    // Validate email and mobile number inputs
    if (!validateInputs()) {
      return;
    }

    // Check if the hidded input tags are visible (based on the state)
    const yearsOfExperience = showInstituteFields ? parseInt(yearsOfExperienceRef.current.value, 10) : 0;
    const designation = showInstituteFields ? designationRef.current.value || null : null;
    const instituteName = showCourseFields ? instituteNameRef.current.value || null : null;
    const reasonForChanging = showCourseFields ? reasonForChangingRef.current.value || null : null;
    const referenceName = showReferenceFields ? referenceNameRef.current.value || null : null;
    const batchCode = showReferenceFields ? batchCodeRef.current.value || null : null;
    const reasonPostpone = showReasonField ? reasonRef.current.value || null : null;

    // Create a new XMLHttpRequest object
    const xhr = new XMLHttpRequest();

    // Configure the request to check if the email already exists
    xhr.open('GET', 'http://localhost:8080/getLeadByEmail?email=' + email, true);

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
            // If the email is not found, proceed to add a new Lead
            const formData = new FormData();
            formData.append('leadName', leadName);
            formData.append('email', email);
            formData.append('mobileNo', mobileNo);
            formData.append('address', address);
            formData.append('degree', degree);
            formData.append('field', field);
            formData.append('passingYear', passingYear);
            formData.append('collegeName', collegeName);
            formData.append('courseName', courseName);
            formData.append('mode', mode);
            formData.append('experience', experience);
            formData.append('yearsOfExperience', yearsOfExperience);
            formData.append('designation', designation);
            formData.append('courseDoneFromOtherInstitute', courseDoneFromOtherInstitute);
            formData.append('instituteName', instituteName);
            formData.append('reasonForChanging', reasonForChanging);
            formData.append('interest', interest);
            formData.append('approach', approach);
            formData.append('referenceName', referenceName);
            formData.append('batchCode', batchCode);
            formData.append('status', status);
            formData.append('reasonPostpone', reasonPostpone);

            // Create a new XMLHttpRequest object for adding lead
            const addLeadXhr = new XMLHttpRequest();

            // Configure the request to add the lead
            addLeadXhr.open('POST', 'http://localhost:8080/add', true);

            addLeadXhr.onreadystatechange = () => {
              if (addLeadXhr.readyState === 4) {
                if (addLeadXhr.status === 200) {
                  setResponseMsg('Lead Added');
                  setTimeout(() => {
                    setResponseMsg('');
                    window.location.reload();
                  }, 5000);
                } else {
                  setResponseMsg('An error');
                  setTimeout(() => {
                    setResponseMsg('');
                  }, 5000); // 5 seconds in milliseconds
                }
              }
            };

            // Send the FormData object as the request body to add Lead
            addLeadXhr.send(formData);
          }
        } else {
          setResponseMsg('An error occurred while adding Lead');
          setTimeout(() => {
            setResponseMsg('');
          }, 10000); // 10 seconds in milliseconds
        }
      }
    };

    // Send the request to check if the email exists
    xhr.send();
  };

  return (
    <MainCard title="Add Lead">
      {/* =====================lead details=================== */}

      <Grid container spacing={gridSpacing}>
        <Grid item xs={12} md={6}>
          <SubCard title="Personal Information">
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

        {/* ==================qualification================= */}

        <Grid item xs={12} md={6}>
          <SubCard title="Qualification">
            <Grid container direction="column" spacing={1}>
              <div className="form-group">
                <label htmlFor="degree" className="mar">
                  Degree
                </label>
                <input type="text" id="degreeRef" className="form-control" ref={degreeRef} />
              </div>

              <div className="form-group">
                <label htmlFor="field" className="mar">
                  Field
                </label>
                <input type="text" id="fieldRef" className="form-control" ref={fieldRef} />
              </div>

              <div className="form-group">
                <label htmlFor="passingYear" className="marr">
                  Passing Year
                </label>
                <input type="number" id="passingYearRef" className="form-control" ref={passingYearRef} />
              </div>

              <div className="form-group">
                <label htmlFor="collegeName" className="mar">
                  College Name
                </label>
                <input type="text" id="collegeNameRef" className="form-control" ref={collegeNameRef} />
              </div>
            </Grid>
          </SubCard>
        </Grid>

        {/* ================courses===================== */}

        <Grid item xs={12} md={6}>
          <SubCard title="Courses">
            <div className="form-group">
              <label htmlFor="courseName" className="mar">
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
              <label htmlFor="mode" className="mar">
                Mode
              </label>
              <select className="form-control" ref={modeRef}>
                <option></option>
                <option>Online</option>
                <option>Offline</option>
                <option>Hybrid</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="experience" className="mar">
                Experience
              </label>
              <select className="form-control" ref={experienceRef} onChange={handleExperience}>
                <option></option>
                <option>IT</option>
                <option>Non IT</option>
              </select>
            </div>
            <div className="form-group">
              {showInstituteFields && (
                <>
                  <>
                    <label htmlFor="yearsOfExperience" className="mar">
                      Year of Experience
                    </label>
                    <input type="number" className="form-control" ref={yearsOfExperienceRef} />
                  </>
                  <>
                    <label htmlFor="designation" className="mar">
                      Designation
                    </label>
                    <input type="text" className="form-control" ref={designationRef} />
                  </>
                </>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="courseDoneFromOtherInstitute" className="mar">
                Course Done From Other Institute
              </label>
              <select className="form-control" ref={courseDoneFromOtherInstituteRef} onChange={handlecdfoi}>
                <option></option>
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>
            <div className="form-group">
              {showCourseFields && (
                <>
                  <>
                    <label htmlFor="instituteName" className="mar">
                      Institute Name
                    </label>
                    <input type="text" className="form-control" ref={instituteNameRef} />
                  </>
                  <>
                    <label htmlFor="reasonForChanging" className="mar">
                      Reason For Changing
                    </label>
                    <input type="text" className="form-control" ref={reasonForChangingRef} />
                  </>
                </>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="interest" className="marr">
                Interest
              </label>
              <select className="form-control" ref={interestRef}>
                <option></option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
          </SubCard>
        </Grid>

        {/* =======================references==================== */}

        <Grid item xs={12} md={6}>
          <SubCard title="Reference">
            <div className="form-group">
              <label htmlFor="approach" className="marr">
                Approach
              </label>
              <select className="form-control" ref={approachRef} onChange={handleapproach}>
                <option></option>
                <option>Instagram</option>
                <option>Facebook</option>
                <option>Google</option>
                <option>Search near by area</option>
                <option>Reference</option>
                <option>Other</option>
              </select>
            </div>
            <div className="form-group">
              {showReferenceFields && (
                <>
                  <>
                    <label htmlFor="referenceName" className="marr">
                      Reference Name
                    </label>
                    <input type="text" className="form-control" ref={referenceNameRef} />
                  </>
                  <>
                    <label htmlFor="batchCode" className="marr">
                      Batch Code
                    </label>
                    <input type="text" className="form-control" ref={batchCodeRef} />
                  </>
                </>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="status" className="marr">
                Status
              </label>
              <select id="status" className="form-control" ref={statusRef} onChange={handleStatus}>
                <option value=""></option>
                <option value="Open">Open</option>
                <option value="Deal Done">Deal Done</option>
                <option value="PostPone">PostPone</option>
                <option value="Cancel">Cancel</option>
              </select>
            </div>
            <div className="form-group">
              {showReasonField && (
                <>
                  <label htmlFor="reasonPostpone" className="mar">
                    Reason
                  </label>
                  <input type="text" className="form-control" ref={reasonRef} />
                </>
              )}
              <button className="btn" onClick={handleAddLead}>
                Add Lead
              </button>{' '}
              <h4 className="h4tag" id="reg-response">
                {responseMsg}
              </h4>
            </div>
          </SubCard>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default AddLead;
