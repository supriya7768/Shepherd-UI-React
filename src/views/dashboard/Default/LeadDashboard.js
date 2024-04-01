import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

function LeadDashboard() {
  const [leads, setLeads] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    fetchLeadsByDate(selectedDate);
  }, [selectedDate]);

  function fetchLeadsByDate(date) {
    // Fetch leads based on selected date
    fetch(`http://localhost:8081/get-lead-data-dashboard?date=${date}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setLeads(data))
      .catch((error) => console.error('Error fetching leads:', error));
  }

  function handleDateChange(event) {
    setSelectedDate(event.target.value);
  }

  return (
    <div className="lead-dashboard">
      <main className="main-wrapper">
        <section className="section">
          <div className="container-fluid">
            {/* Title */}
            <div className="title-wrapper pt-30">
              <h5>Hello, Testing Shastra</h5>
            </div>
            {/* Calendar */}
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              headerToolbar={{
                end: 'today prev,next'
              }}
              events={leads.map((lead) => ({
                title: lead.name,
                date: lead.follow
              }))}
            />
            {/* Lead Table */}
            <div className="table-responsive">
              <table className="table top-selling-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Mobile No</th>
                    <th>Recent Comment</th>
                    <th>Follow On</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead.id}>
                      <td>
                        <a href={`leadInfo.html?leadId=${lead.id}`}>{lead.name}</a>
                      </td>
                      <td>{lead.mobile}</td>
                      <td>{lead.comment}</td>
                      <td>{lead.follow}</td>
                      <td>{lead.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Date Input */}
            <div className="select-style-1">
              <input type="date" value={selectedDate} onChange={handleDateChange} />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default LeadDashboard;
