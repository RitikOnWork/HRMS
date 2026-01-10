import React, { useState } from 'react';
import './style.css';

const HRDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [showEmployeeDetail, setShowEmployeeDetail] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock Data
  const currentUser = {
    name: 'Sarah Mitchell',
    role: 'HR Manager',
    avatar: null
  };

  const [employees, setEmployees] = useState([
    { id: 'EMP001', name: 'John Anderson', department: 'Public Works', status: 'Active', position: 'Engineer', email: 'j.anderson@municipal.gov', phone: '555-0101' },
    { id: 'EMP002', name: 'Maria Garcia', department: 'Finance', status: 'Active', position: 'Accountant', email: 'm.garcia@municipal.gov', phone: '555-0102' },
    { id: 'EMP003', name: 'David Chen', department: 'Administration', status: 'On Leave', position: 'Clerk', email: 'd.chen@municipal.gov', phone: '555-0103' },
    { id: 'EMP004', name: 'Emily Brown', department: 'Health Services', status: 'Active', position: 'Nurse', email: 'e.brown@municipal.gov', phone: '555-0104' },
    { id: 'EMP005', name: 'Michael Wilson', department: 'Parks & Recreation', status: 'Active', position: 'Supervisor', email: 'm.wilson@municipal.gov', phone: '555-0105' },
  ]);

  const [leaveRequests, setLeaveRequests] = useState([
    { id: 1, employeeName: 'David Chen', leaveType: 'Sick Leave', startDate: '2026-01-15', endDate: '2026-01-17', days: 3, status: 'pending' },
    { id: 2, employeeName: 'Lisa Martinez', leaveType: 'Annual Leave', startDate: '2026-01-20', endDate: '2026-01-24', days: 5, status: 'pending' },
    { id: 3, employeeName: 'Robert Taylor', leaveType: 'Personal Leave', startDate: '2026-01-18', endDate: '2026-01-19', days: 2, status: 'pending' },
  ]);

  const notifications = [
    { id: 1, message: 'New leave request from David Chen', time: '10 minutes ago', read: false },
    { id: 2, message: 'Payroll processing completed for December', time: '2 hours ago', read: false },
    { id: 3, message: 'Performance review cycle starting next week', time: '1 day ago', read: true },
    { id: 4, message: '5 new job applications received', time: '2 days ago', read: true },
  ];

  const stats = {
    totalEmployees: { value: 247, trend: 5, label: 'Total Employees' },
    presentToday: { value: 231, trend: 2, label: 'Present Today' },
    onLeave: { value: 12, trend: -3, label: 'On Leave' },
    departments: { value: 8, trend: 0, label: 'Departments' }
  };

  const handleLeaveAction = (id, action) => {
    setLeaveRequests(leaveRequests.map(req => 
      req.id === id ? { ...req, status: action } : req
    ));
  };

  const handleViewEmployee = (employee) => {
    setSelectedEmployee(employee);
    setShowEmployeeDetail(true);
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // SVG Icons
  const icons = {
    dashboard: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
    employees: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    departments: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    attendance: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
    leave: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    payroll: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
    recruitment: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>,
    performance: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
    reports: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
    settings: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v6m5.2-13.8l-4.3 4.3m-4.3 4.3l-4.3 4.3m0-12.6l4.3 4.3m4.3 4.3l4.3 4.3"/></svg>,
    search: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>,
    bell: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
    plus: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    check: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>,
    x: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    trendUp: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
    trendDown: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg>
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: icons.dashboard },
    { id: 'employees', label: 'Employees', icon: icons.employees },
    { id: 'departments', label: 'Departments', icon: icons.departments },
    { id: 'attendance', label: 'Attendance', icon: icons.attendance },
    { id: 'leave', label: 'Leave Requests', icon: icons.leave },
    { id: 'payroll', label: 'Payroll', icon: icons.payroll },
    { id: 'recruitment', label: 'Recruitment', icon: icons.recruitment },
    { id: 'performance', label: 'Performance', icon: icons.performance },
    { id: 'reports', label: 'Reports', icon: icons.reports },
    { id: 'settings', label: 'Settings', icon: icons.settings }
  ];

  return (
    <div className="hr-dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo-container">
            <div className="logo">
              <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
                <rect width="40" height="40" rx="8" fill="#2563eb"/>
                <path d="M20 10 L30 20 L20 30 L10 20 Z" fill="white"/>
              </svg>
            </div>
            <div className="org-info">
              <h1>Municipal HR</h1>
              <p>Government Services</p>
            </div>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map(item => (
            <button
              key={item.id}
              className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => setActiveSection(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-profile">
          <div className="profile-avatar">{getInitials(currentUser.name)}</div>
          <div className="profile-info">
            <div className="profile-name">{currentUser.name}</div>
            <div className="profile-role">{currentUser.role}</div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Top Navigation */}
        <header className="topbar">
          <div className="search-container">
            <span className="search-icon">{icons.search}</span>
            <input
              type="text"
              placeholder="Search employees, IDs, departments..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="topbar-actions">
            <button className="icon-btn" onClick={() => setShowNotifications(!showNotifications)}>
              {icons.bell}
              {notifications.filter(n => !n.read).length > 0 && (
                <span className="notification-badge">{notifications.filter(n => !n.read).length}</span>
              )}
            </button>

            <button className="quick-add-btn" onClick={() => setShowAddEmployee(true)}>
              {icons.plus}
              <span>Quick Add</span>
            </button>

            <div className="profile-menu">
              <button className="profile-btn" onClick={() => setShowProfileDropdown(!showProfileDropdown)}>
                <div className="profile-avatar small">{getInitials(currentUser.name)}</div>
              </button>

              {showProfileDropdown && (
                <div className="dropdown-menu">
                  <div className="dropdown-header">
                    <div className="dropdown-user-info">
                      <strong>{currentUser.name}</strong>
                      <span>{currentUser.role}</span>
                    </div>
                  </div>
                  <button className="dropdown-item">View Profile</button>
                  <button className="dropdown-item">Upload Photo</button>
                  <button className="dropdown-item">Account Settings</button>
                  <div className="dropdown-divider"></div>
                  <button className="dropdown-item danger" onClick={() => { setShowProfileDropdown(false); setShowLogoutConfirm(true); }}>Logout</button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="content-area">
          {activeSection === 'dashboard' && (
            <>
              <div className="welcome-header">
                <div>
                  <h2>Welcome back, {currentUser.name.split(' ')[0]}</h2>
                  <p>Here's your HR overview for today, Sunday, January 11, 2026</p>
                </div>
              </div>

              <div className="stats-grid">
                {Object.entries(stats).map(([key, stat]) => (
                  <div key={key} className="stat-card">
                    <div className="stat-header">
                      <span className="stat-label">{stat.label}</span>
                      {stat.trend !== 0 && (
                        <span className={`trend ${stat.trend > 0 ? 'positive' : 'negative'}`}>
                          {stat.trend > 0 ? icons.trendUp : icons.trendDown}
                          {Math.abs(stat.trend)}%
                        </span>
                      )}
                    </div>
                    <div className="stat-value">{stat.value}</div>
                  </div>
                ))}
              </div>

              <div className="dashboard-grid">
                <div className="employees-section">
                  <div className="section-header">
                    <h3>Recent Employees</h3>
                    <button className="link-btn" onClick={() => setActiveSection('employees')}>View All</button>
                  </div>
                  <div className="employee-cards">
                    {employees.slice(0, 4).map(emp => (
                      <div key={emp.id} className="employee-card" onClick={() => handleViewEmployee(emp)}>
                        <div className="employee-avatar">{getInitials(emp.name)}</div>
                        <div className="employee-info">
                          <div className="employee-name">{emp.name}</div>
                          <div className="employee-meta">{emp.department} • {emp.id}</div>
                        </div>
                        <span className={`status-badge ${emp.status.toLowerCase().replace(' ', '-')}`}>
                          {emp.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="leave-section">
                  <div className="section-header">
                    <h3>Pending Leave Requests</h3>
                    <span className="badge">{leaveRequests.filter(r => r.status === 'pending').length}</span>
                  </div>
                  <div className="leave-requests">
                    {leaveRequests.filter(r => r.status === 'pending').map(req => (
                      <div key={req.id} className="leave-request">
                        <div className="leave-info">
                          <div className="leave-employee">{req.employeeName}</div>
                          <div className="leave-details">
                            <span className="leave-type">{req.leaveType}</span>
                            <span className="leave-dates">{req.startDate} to {req.endDate}</span>
                            <span className="leave-days">{req.days} days</span>
                          </div>
                        </div>
                        <div className="leave-actions">
                          <button className="action-btn approve" onClick={() => handleLeaveAction(req.id, 'approved')}>
                            {icons.check}
                          </button>
                          <button className="action-btn reject" onClick={() => handleLeaveAction(req.id, 'rejected')}>
                            {icons.x}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {activeSection === 'employees' && (
            <div className="section-content">
              <div className="section-header">
                <h2>Employee Management</h2>
                <button className="primary-btn" onClick={() => setShowAddEmployee(true)}>
                  {icons.plus} Add Employee
                </button>
              </div>
              <div className="employee-list">
                {filteredEmployees.map(emp => (
                  <div key={emp.id} className="employee-card" onClick={() => handleViewEmployee(emp)}>
                    <div className="employee-avatar">{getInitials(emp.name)}</div>
                    <div className="employee-info">
                      <div className="employee-name">{emp.name}</div>
                      <div className="employee-meta">{emp.department} • {emp.id}</div>
                    </div>
                    <span className={`status-badge ${emp.status.toLowerCase().replace(' ', '-')}`}>
                      {emp.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {['departments', 'attendance', 'leave', 'payroll', 'recruitment', 'performance', 'reports', 'settings'].includes(activeSection) && (
            <div className="section-content">
              <h2>{navItems.find(n => n.id === activeSection)?.label}</h2>
              <p className="section-description">This section is under development. Full functionality will be available soon.</p>
            </div>
          )}
        </div>
      </main>

      {/* Notifications Panel */}
      {showNotifications && (
        <>
          <div className="modal-overlay" onClick={() => setShowNotifications(false)}></div>
          <div className="notifications-panel">
            <div className="panel-header">
              <h3>Notifications</h3>
              <button className="close-btn" onClick={() => setShowNotifications(false)}>{icons.x}</button>
            </div>
            <div className="notifications-list">
              {notifications.map(notif => (
                <div key={notif.id} className={`notification-item ${notif.read ? 'read' : ''}`}>
                  <div className="notification-message">{notif.message}</div>
                  <div className="notification-time">{notif.time}</div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Add Employee Modal */}
      {showAddEmployee && (
        <>
          <div className="modal-overlay" onClick={() => setShowAddEmployee(false)}></div>
          <div className="modal">
            <div className="modal-header">
              <h3>Add New Employee</h3>
              <button className="close-btn" onClick={() => setShowAddEmployee(false)}>{icons.x}</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" placeholder="Enter employee name" />
              </div>
              <div className="form-group">
                <label>Employee ID</label>
                <input type="text" placeholder="EMP###" />
              </div>
              <div className="form-group">
                <label>Department</label>
                <select>
                  <option>Select Department</option>
                  <option>Public Works</option>
                  <option>Finance</option>
                  <option>Administration</option>
                  <option>Health Services</option>
                </select>
              </div>
              <div className="form-group">
                <label>Position</label>
                <input type="text" placeholder="Job title" />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="email@municipal.gov" />
              </div>
            </div>
            <div className="modal-footer">
              <button className="secondary-btn" onClick={() => setShowAddEmployee(false)}>Cancel</button>
              <button className="primary-btn">Add Employee</button>
            </div>
          </div>
        </>
      )}

      {/* Employee Detail Modal */}
      {showEmployeeDetail && selectedEmployee && (
        <>
          <div className="modal-overlay" onClick={() => setShowEmployeeDetail(false)}></div>
          <div className="modal">
            <div className="modal-header">
              <h3>Employee Details</h3>
              <button className="close-btn" onClick={() => setShowEmployeeDetail(false)}>{icons.x}</button>
            </div>
            <div className="modal-body">
              <div className="employee-detail">
                <div className="employee-avatar large">{getInitials(selectedEmployee.name)}</div>
                <h4>{selectedEmployee.name}</h4>
                <span className={`status-badge ${selectedEmployee.status.toLowerCase().replace(' ', '-')}`}>
                  {selectedEmployee.status}
                </span>
                <div className="detail-grid">
                  <div className="detail-item">
                    <label>Employee ID</label>
                    <div>{selectedEmployee.id}</div>
                  </div>
                  <div className="detail-item">
                    <label>Department</label>
                    <div>{selectedEmployee.department}</div>
                  </div>
                  <div className="detail-item">
                    <label>Position</label>
                    <div>{selectedEmployee.position}</div>
                  </div>
                  <div className="detail-item">
                    <label>Email</label>
                    <div>{selectedEmployee.email}</div>
                  </div>
                  <div className="detail-item">
                    <label>Phone</label>
                    <div>{selectedEmployee.phone}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="secondary-btn" onClick={() => setShowEmployeeDetail(false)}>Close</button>
              <button className="primary-btn">Edit Employee</button>
            </div>
          </div>
        </>
      )}

      {/* Logout Confirmation */}
      {showLogoutConfirm && (
        <>
          <div className="modal-overlay" onClick={() => setShowLogoutConfirm(false)}></div>
          <div className="modal small">
            <div className="modal-header">
              <h3>Confirm Logout</h3>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to logout from the HR Management System?</p>
            </div>
            <div className="modal-footer">
              <button className="secondary-btn" onClick={() => setShowLogoutConfirm(false)}>Cancel</button>
              <button className="danger-btn" onClick={() => alert('Logged out successfully')}>Logout</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HRDashboard;