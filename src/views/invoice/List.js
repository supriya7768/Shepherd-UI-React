import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';

import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import '../style/invoice.css';
// import "~font-awesome/css/font-awesome.css";

const List = () => {
  const [invoices, setInvoices] = useState([]);
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  // const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  // const [dropdownNames, setDropdownNames] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [expandedInvoiceId, setExpandedInvoiceId] = useState(null);
  const [overdueInvoices, setOverdueInvoices] = useState([]); // State to hold overdue invoices

  const currentDate = new Date().toLocaleDateString('en-GB');

  useEffect(() => {
    // Fetch data from your API when the component mounts
    fetch('http://localhost:8080/getAllInvoices')
      .then((response) => response.json())
      .then((data) => {
        setInvoices(data);
        // Extract and set the list of names for the dropdown
        const names = data.map((invoice) => invoice.name);
        setDropdownNames(names);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleSort = (field) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleShowAllInvoices = () => {
    setSelectedStatus('All');
  };

  const handleShowOverdueInvoices = () => {
    const currentDate = new Date();

    // Filter and set overdue invoices with status "Pending"
    const overduePending = invoices.filter((invoice) => {
      const dueDate = new Date(invoice.dueDate);
      return dueDate < currentDate && invoice.status === 'Pending';
    });

    setOverdueInvoices(overduePending);
    setSelectedStatus('Overdue'); // Update selected status to 'Overdue'
  };

  const filterInvoicesByStatus = () => {
    if (selectedStatus === 'All') {
      return invoices; // Return all invoices
    } else if (selectedStatus === 'Overdue') {
      return overdueInvoices; // Return overdue invoices
    } else {
      return invoices.filter((invoice) => invoice.status === selectedStatus);
    }
  };

  const sortedInvoices = [...filterInvoicesByStatus()].sort((a, b) => {
    if (sortField) {
      if (sortField === 'dueDate') {
        const valueA = a[sortField] || '';
        const valueB = b[sortField] || '';

        if (valueA < valueB) {
          return sortDirection === 'asc' ? -1 : 1;
        }
        if (valueA > valueB) {
          return sortDirection === 'asc' ? 1 : -1;
        }
      } else {
        if (a[sortField] < b[sortField]) {
          return sortDirection === 'asc' ? -1 : 1;
        }
        if (a[sortField] > b[sortField]) {
          return sortDirection === 'asc' ? 1 : -1;
        }
      }
    }
    return 0;
  });

  const toggleInvoiceDetails = (invoiceId) => {
    // Toggle the expanded invoice
    if (expandedInvoiceId === invoiceId) {
      setExpandedInvoiceId(null);
    } else {
      setExpandedInvoiceId(invoiceId);
    }
  };

  return (
    <MainCard title="Invoice List">
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <div>
            <div className="search">
              <input className="inp1" type="text" placeholder="Enter Lead Name" />
              <button className="searchbtn">
                <i className="fas fa-search"></i>
              </button>
            </div>
            <div className="navbar">
              <div>
                <a href="#" onClick={handleShowAllInvoices}>
                  All Invoices
                </a>
                <a href="#" onClick={() => setSelectedStatus('Paid')}>
                  Paid
                </a>
                <a href="#" onClick={() => setSelectedStatus('Pending')}>
                  Pending
                </a>
                <a href="#" onClick={handleShowOverdueInvoices}>
                  Overdue
                </a>
              </div>
            </div>
            <table>
              <thead>
                <tr>
                  <th className="centered-cell">Invoice Id</th>
                  <th onClick={() => handleSort('name')} className="centered-cell">
                    <span>Invoice to</span>
                    <div className="dropdown">
                      <button className={`dropdownn-button ${sortDirection}`} onClick={() => handleSort('name')}>
                        {sortDirection === 'asc' ? '' : ''}
                      </button>
                    </div>
                  </th>
                  <th onClick={() => handleSort('courseName')} className="centered-cell">
                    <span>Course Name</span>
                    <div className="dropdown">
                      <button className={`dropdownn-button ${sortDirection}`} onClick={() => handleSort('courseName')}>
                        {sortDirection === 'asc' ? '' : ''}
                      </button>
                    </div>
                  </th>
                  <th onClick={() => handleSort('dueAmount')} className="centered-cell">
                    <span>Due Amount</span>
                    <div className="dropdown">
                      <button className={`dropdownn-button ${sortDirection}`} onClick={() => handleSort('dueAmount')}>
                        {sortDirection === 'asc' ? '' : ''}
                      </button>
                    </div>
                  </th>
                  <th onClick={() => handleSort('dueDate')} className="centered-cell">
                    <span>Due Date</span>
                    <div className="dropdown">
                      <button className={`dropdownn-button ${sortDirection}`} onClick={() => handleSort('dueDate')}>
                        {sortDirection === 'asc' ? '' : ''}
                      </button>
                    </div>
                  </th>
                  <th onClick={() => handleSort('status')} className="centered-cell">
                    <span>Status</span>
                    <div className="dropdown">
                      <button className={`dropdownn-button ${sortDirection}`} onClick={() => handleSort('status')}>
                        {sortDirection === 'asc' ? '' : ''}
                      </button>
                    </div>
                  </th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {sortedInvoices.map((invoice) => (
                  <React.Fragment key={invoice.id}>
                    <tr className={selectedStatus === 'Overdue' && new Date(invoice.dueDate) < currentDate ? 'overdue' : ''}>
                      <td className="centered-cell">
                        <button className="details-button" onClick={() => toggleInvoiceDetails(invoice.invoiceId)}>
                          {expandedInvoiceId === invoice.invoiceId ? invoice.invoiceId : invoice.invoiceId}
                        </button>
                        {/* {invoice.invoiceId} */}
                      </td>
                      <td className="centered-cell">{invoice.name}</td>
                      <td className="centered-cell">{invoice.courseName}</td>
                      <td className="centered-cell">{invoice.dueAmount}</td>
                      <td className="centered-cell">{invoice.dueDate}</td>
                      <td className="centered-cell">{invoice.status}</td>
                      <td className="centered-cell">
                        <div className="dropdown">
                          <button className="dropdownn-button">&#10247;</button>
                          <div className="dropdown-content">
                            <a href="#" className="dropdown-link">
                              Edit
                            </a>
                            <a href="#" className="dropdown-link">
                              Delete
                            </a>
                            <button className="dropdown-link">Download</button>
                            {/* <a href="#" className="dropdown-link">
                              Download
                            </a> */}
                          </div>
                        </div>
                      </td>
                    </tr>
                    {expandedInvoiceId === invoice.invoiceId && (
                      <tr>
                        <td colSpan="7">
                          <table>
                            <thead>
                              <tr>
                                <th className="centered-cell">Invoice Id</th>
                                <th className="centered-cell">Mobile</th>
                                <th className="centered-cell">Date</th>
                                <th className="centered-cell">Total Amount</th>
                                <th className="centered-cell">Paid Amount</th>
                                <th className="centered-cell">Due Amount</th>
                                <th className="centered-cell">Due Date</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="centered-cell">{invoice.invoiceId}</td>
                                <td className="centered-cell">{invoice.mobile}</td>
                                <td className="centered-cell">{invoice.invoiceDate}</td>
                                <td className="centered-cell">{invoice.totalAmount}</td>
                                <td className="centered-cell">{invoice.paidAmount}</td>
                                <td className="centered-cell">{invoice.dueAmount}</td>
                                <td className="centered-cell">{invoice.dueDate}</td>
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

export default List;
