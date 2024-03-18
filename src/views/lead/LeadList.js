import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';

import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import '../style/lead.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const LeadList = () => {
  const [lead, setLead] = useState([]);
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [expandedLeadId, setExpandedLeadId] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState({});
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [searchResults, setSearchResults] = useState([]); // State to store search results
  const [searchMode, setSearchMode] = useState(false); // State to track search mode

  useEffect(() => {
    // Fetch data from your API when the component mounts
    fetch('http://localhost:8080/getAllLeads')
      .then((response) => response.json())
      .then((data) => {
        setLead(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleSearch = () => {
    // Make an API request to search with the query
    fetch(`http://localhost:8080/search?data=${searchQuery}`)
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data); // Update search results state with the data
        setSearchMode(true); // Enter search mode
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const handleSort = (field) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleShowAllLead = () => {
    setSelectedStatus('All');
    setSearchMode(false); // Exit search mode
  };

  const filterLeadByStatus = () => {
    if (selectedStatus === 'All') {
      return lead; // Return all lead
    } else {
      return lead.filter((lead) => lead.status === selectedStatus);
    }
  };

  const sortedLead = [...filterLeadByStatus()].sort((a, b) => {
    if (sortField) {
      if (a[sortField] < b[sortField]) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (a[sortField] > b[sortField]) {
        return sortDirection === 'asc' ? 1 : -1;
      }
    }
    return 0;
  });

  const toggleLeadDetails = (leadId) => {
    setDropdownOpen((prevState) => ({
      ...prevState,
      [leadId]: !prevState[leadId]
    }));

    if (expandedLeadId === leadId) {
      setExpandedLeadId(null);
    } else {
      setExpandedLeadId(leadId);
    }
  };

  return (
    <MainCard title="Lead List">
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <div>
            <div className="search">
              <input
                className="inp1"
                type="text"
                placeholder="Enter Lead Name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="searchbtn" onClick={handleSearch}>
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
            <div className="navbar">
              <div>
                <a href="#" onClick={handleShowAllLead}>
                  All Leads
                </a>
                <a href="#" onClick={() => setSelectedStatus('Open')}>
                  Open
                </a>
                <a href="#" onClick={() => setSelectedStatus('Deal Done')}>
                  Deal Done
                </a>
                <a href="#" onClick={() => setSelectedStatus('PostPone')}>
                  Postpone
                </a>
                <a href="#" onClick={() => setSelectedStatus('Cancel')}>
                  Cancel
                </a>
              </div>
            </div>
            <table>
              <thead>
                <tr>
                  <th className="centered-cell"></th>
                  <th className="centered-cell">Lead Name</th>
                  <th className="centered-cell">Course Name</th>
                  <th className="centered-cell">Mobile Number</th>
                  <th className="centered-cell">Email Id</th>
                  <th className="centered-cell">Address</th>
                  <th onClick={() => handleSort('status')} className="centered-cell">
                    <span>Status</span>
                    <div className="dropdown">
                      <button className={`dropdown-button ${sortDirection}`} onClick={() => handleSort('status')}>
                        {sortDirection === 'asc' ? '' : ''}
                      </button>
                    </div>
                  </th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {searchMode
                  ? searchResults.map((lead) => (
                      <React.Fragment key={lead.userId}>
                        <tr>
                          <td className="centered-cell">
                            <button className="details-button" onClick={() => toggleLeadDetails(lead.userId)}>
                              {expandedLeadId === lead.userId ? '▼' : '►'}
                            </button>
                          </td>
                          <td className="centered-cell">{lead.leadName}</td>
                          <td className="centered-cell">{lead.courseName}</td>
                          <td className="centered-cell">{lead.mobileNo}</td>
                          <td className="centered-cell">{lead.email}</td>
                          <td className="centered-cell">{lead.address}</td>
                          <td className="centered-cell">{lead.status}</td>
                          <td className="centered-cell">
                            <div className="dropdown">
                              <button className="dropdown-button">&#10247;</button>
                              <div className="dropdown-content">
                                <a href="#" className="dropdown-link">
                                  Edit
                                </a>
                                <a href="#" className="dropdown-link">
                                  Delete
                                </a>
                                {lead.status === 'Deal Done' && <button className="dropdown-link">Create Invoice</button>}
                              </div>
                            </div>
                          </td>
                        </tr>
                        {expandedLeadId === lead.userId && dropdownOpen[lead.userId] && (
                          <tr>
                            <td colSpan="8">
                              <table>
                                <thead>
                                  <tr>
                                    <th className="centered-cell">Degree</th>
                                    <th className="centered-cell">Field</th>
                                    <th className="centered-cell">College Name</th>
                                    <th className="centered-cell">Passing Year</th>
                                    <th className="centered-cell">Experience</th>
                                    <th className="centered-cell">Years of Experience</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td className="centered-cell">{lead.degree}</td>
                                    <td className="centered-cell">{lead.field}</td>
                                    <td className="centered-cell">{lead.collegeName}</td>
                                    <td className="centered-cell">{lead.passingYear}</td>
                                    <td className="centered-cell">{lead.experience}</td>
                                    <td className="centered-cell">{lead.yearsOfExperience}</td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))
                  : sortedLead.map((lead) => (
                      <React.Fragment key={lead.userId}>
                        <tr>
                          <td className="centered-cell">
                            <button className="details-button" onClick={() => toggleLeadDetails(lead.userId)}>
                              {expandedLeadId === lead.userId ? '▼' : '►'}
                            </button>
                          </td>
                          <td className="centered-cell">{lead.leadName}</td>
                          <td className="centered-cell">{lead.courseName}</td>
                          <td className="centered-cell">{lead.mobileNo}</td>
                          <td className="centered-cell">{lead.email}</td>
                          <td className="centered-cell">{lead.address}</td>
                          <td className="centered-cell">{lead.status}</td>
                          <td className="centered-cell">
                            <div className="dropdown">
                              <button className="dropdown-button">&#10247;</button>
                              <div className="dropdown-content">
                                <a href="#" className="dropdown-link">
                                  Edit
                                </a>
                                <a href="#" className="dropdown-link">
                                  Delete
                                </a>
                                {lead.status === 'Deal Done' && <button className="dropdown-link">Create Invoice</button>}
                              </div>
                            </div>
                          </td>
                        </tr>
                        {expandedLeadId === lead.userId && dropdownOpen[lead.userId] && (
                          <tr>
                            <td colSpan="8">
                              <table>
                                <thead>
                                  <tr>
                                    <th className="centered-cell">Degree</th>
                                    <th className="centered-cell">Field</th>
                                    <th className="centered-cell">College Name</th>
                                    <th className="centered-cell">Passing Year</th>
                                    <th className="centered-cell">Experience</th>
                                    <th className="centered-cell">Years of Experience</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td className="centered-cell">{lead.degree}</td>
                                    <td className="centered-cell">{lead.field}</td>
                                    <td className="centered-cell">{lead.collegeName}</td>
                                    <td className="centered-cell">{lead.passingYear}</td>
                                    <td className="centered-cell">{lead.experience}</td>
                                    <td className="centered-cell">{lead.yearsOfExperience}</td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
              </tbody>
            </table>
          </div>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default LeadList;
