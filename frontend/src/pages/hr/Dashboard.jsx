import React, { useState, useEffect } from 'react';
import './style.css';
import * as Data from './views/DashboardData';
import { icons } from './views/Icons';
// Import View Components
import DashboardView from './views/DashboardView';
import EmployeesView from './views/EmployeesView';
import DepartmentsView from './views/DepartmentsView';
import AttendanceView from './views/AttendanceView';
import LeaveView from './views/LeaveView';
import AttendanceDetailModal from './views/AttendanceDetailModal';
import { getCurrentUser } from '../../services/auth';
const HRDashboard = () => {
  // ============================================
  // UI STATE MANAGEMENT
  // ============================================
  const [activeSection, setActiveSection] = useState('dashboard');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [showEmployeeDetail, setShowEmployeeDetail] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // ============================================
  // DATA STATE MANAGEMENT
  // ============================================
  const [employees, setEmployees] = useState(Data.initialEmployees);
  const [leaveRequests, setLeaveRequests] = useState(Data.initialLeaveRequests);

  // ============================================
  // ATTENDANCE MODAL STATE
  // ============================================
  const [selectedAttendanceEmployee, setSelectedAttendanceEmployee] = useState(null);
  const [showAttendanceDetail, setShowAttendanceDetail] = useState(false);

  // ============================================
  // EVENT HANDLERS
  // ============================================
  const handleLeaveAction = (id, action) => {
    setLeaveRequests(leaveRequests.map(req =>
      req.id === id ? { ...req, status: action } : req
    ));
  };

  const handleViewEmployee = (employee) => {
    setSelectedEmployee(employee);
    setShowEmployeeDetail(true);
  };

  const handleViewAttendanceDetail = (employee) => {
    setSelectedAttendanceEmployee(employee);
    setShowAttendanceDetail(true);
  };

  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode');
  };

  // ============================================
  // FILTERED DATA
  // ============================================
  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ============================================
  // NAVIGATION ITEMS
  // ============================================
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
    <div className={`hr-dashboard ${isDarkMode ? 'dark-mode' : ''}`}>
      {/* ============================================ */}
      {/* SIDEBAR */}
      {/* ============================================ */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo-container">
            <div className="logo">
              <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
                <rect width="40" height="40" rx="8" fill="#2563eb" />
                <path d="M20 10 L30 20 L20 30 L10 20 Z" fill="white" />
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
          <div className="profile-avatar">{Data.getInitials(Data.currentUser.name)}</div>
          <div className="profile-info">
            <div className="profile-name">{Data.currentUser.name}</div>
            <div className="profile-role">{Data.currentUser.role}</div>
          </div>
        </div>
      </aside>

      {/* ============================================ */}
      {/* MAIN CONTENT */}
      {/* ============================================ */}
      <main className="main-content">
        {/* TOP NAVIGATION BAR */}
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
            {/* Dark Mode Toggle */}
            <button className="icon-btn" onClick={handleToggleDarkMode} title="Toggle Dark Mode">
              {isDarkMode ? icons.sun : icons.moon}
            </button>

            {/* Notifications */}
            <button className="icon-btn" onClick={() => setShowNotifications(!showNotifications)}>
              {icons.bell}
              {Data.notifications.filter(n => !n.read).length > 0 && (
                <span className="notification-badge">
                  {Data.notifications.filter(n => !n.read).length}
                </span>
              )}
            </button>

            {/* Quick Add Button */}
            <button className="quick-add-btn" onClick={() => setShowAddEmployee(true)}>
              {icons.plus}
              <span>Quick Add</span>
            </button>

            {/* Profile Menu */}
            <div className="profile-menu">
              <button className="profile-btn" onClick={() => setShowProfileDropdown(!showProfileDropdown)}>
                <div className="profile-avatar small">{Data.getInitials(Data.currentUser.name)}</div>
              </button>

              {showProfileDropdown && (
                <div className="dropdown-menu">
                  <div className="dropdown-header">
                    <div className="dropdown-user-info">
                      <strong>{Data.currentUser.name}</strong>
                      <span>{Data.currentUser.role}</span>
                    </div>
                  </div>
                  <button className="dropdown-item">View Profile</button>
                  <button className="dropdown-item">Upload Photo</button>
                  <button className="dropdown-item">Account Settings</button>
                  <div className="dropdown-divider"></div>
                  <button
                    className="dropdown-item danger"
                    onClick={() => {
                      setShowProfileDropdown(false);
                      setShowLogoutConfirm(true);
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* ============================================ */}
        {/* VIEW ROUTER */}
        {/* ============================================ */}
        <div className="content-area">
          {/* Dashboard View */}
          {activeSection === 'dashboard' && (
            <DashboardView
              employees={employees}
              leaveRequests={leaveRequests}
              handleViewEmployee={handleViewEmployee}
              handleLeaveAction={handleLeaveAction}
              setActiveSection={setActiveSection}
            />
          )}

          {/* Employees View */}
          {activeSection === 'employees' && (
            <EmployeesView
              filteredEmployees={filteredEmployees}
              handleViewEmployee={handleViewEmployee}
              setShowAddEmployee={setShowAddEmployee}
            />
          )}

          {/* Departments View */}
          {activeSection === 'departments' && <DepartmentsView />}

          {/* Attendance View */}
          {activeSection === 'attendance' && (
            <AttendanceView
              handleViewAttendanceDetail={handleViewAttendanceDetail}
            />
          )}

          {/* Leave View */}
          {activeSection === 'leave' && (
            <LeaveView
              leaveRequests={leaveRequests}
              handleLeaveAction={handleLeaveAction}
            />
          )}

          {/* Fallback for Under Development Sections */}
          {['payroll', 'recruitment', 'performance', 'reports', 'settings'].includes(activeSection) && (
            <div className="section-content">
              <div className="under-development">
                <div className="construction-icon">🚧</div>
                <h2>{navItems.find(n => n.id === activeSection)?.label}</h2>
                <p className="section-description">
                  This section is currently under development. Check back soon for updates!
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ============================================ */}
      {/* GLOBAL MODALS */}
      {/* ============================================ */}

      {/* Notifications Panel */}
      {showNotifications && (
        <>
          <div className="modal-overlay" onClick={() => setShowNotifications(false)}></div>
          <div className="notifications-panel">
            <div className="panel-header">
              <h3>Notifications</h3>
              <button className="close-btn" onClick={() => setShowNotifications(false)}>
                {icons.x}
              </button>
            </div>
            <div className="notifications-list">
              {Data.notifications.map(notif => (
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
              <button className="close-btn" onClick={() => setShowAddEmployee(false)}>
                {icons.x}
              </button>
            </div>
            <div className="modal-body">
              <p>Employee form will be implemented here...</p>
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
              <h3>{selectedEmployee.name}</h3>
              <button className="close-btn" onClick={() => setShowEmployeeDetail(false)}>
                {icons.x}
              </button>
            </div>
            <div className="modal-body">
              <p>Employee details will be shown here...</p>
            </div>
          </div>
        </>
      )}

      {/* Attendance Detail Modal */}
      {showAttendanceDetail && selectedAttendanceEmployee && (
        <AttendanceDetailModal
          employee={selectedAttendanceEmployee}
          onClose={() => setShowAttendanceDetail(false)}
        />
      )}

      {/* Logout Confirmation Modal */}
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
              <button className="secondary-btn" onClick={() => setShowLogoutConfirm(false)}>
                Cancel
              </button>
              <button className="danger-btn" onClick={() => alert('Logged out successfully')}>
                Logout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HRDashboard;