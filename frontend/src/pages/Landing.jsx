import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const scrollToFeatures = (e) => {
    e.preventDefault();
    const element = document.getElementById('features');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="landing-wrapper">
      {/* Navigation */}
      <nav className="nav-glass">
        <div className="container nav-container">
          <div className="nav-brand">
            <div className="logo-icon">
              <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div className="brand-text">
              <h1 className="brand-title">Nagar Yukt</h1>
              <p className="brand-subtitle">Human Resource Management</p>
            </div>
          </div>
          <div className="nav-actions">
            <button onClick={toggleDropdown} className="login-btn">
              <span>Login</span>
              <svg className="icon-small" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <Link to="/login?role=admin" className="dropdown-item" onClick={toggleDropdown}>
                  Admin Login
                </Link>
                <Link to="/login?role=hr" className="dropdown-item" onClick={toggleDropdown}>
                  HR Login
                </Link>
                <Link to="/login?role=candidate" className="dropdown-item" onClick={toggleDropdown}>
                  Candidate Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-dot"></span>
              <span className="badge-text">Enterprise HR Solution</span>
            </div>
            <h1 className="hero-title">
              Human Resource{' '}
              <span className="hero-title-accent">Management System</span>
            </h1>
            <p className="hero-description">
              A centralized digital HR platform designed for transparency, efficiency, and governance across all organizational departments. Streamlining recruitment, payroll, attendance, and performance management.
            </p>
            <div className="hero-buttons">
              <Link to="/login?role=admin" className="btn btn-outline">
                <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Admin Login</span>
              </Link>
              <Link to="/login?role=hr" className="btn btn-outline">
                <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span>HR Login</span>
              </Link>
              <Link to="/login?role=candidate" className="btn btn-primary">
                <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Candidate Login</span>
              </Link>
            </div>
            <div className="hero-explore">
              <a href="#features" onClick={scrollToFeatures} className="btn btn-text">
                <span>Explore Features</span>
                <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </div>
          </div>

          <div className="hero-illustration">
            <svg viewBox="0 0 500 400" className="illustration-svg">
              <circle cx="250" cy="200" r="150" fill="rgba(249, 115, 22, 0.1)" />
              <rect x="175" y="120" width="150" height="180" rx="8" fill="#ffffff" stroke="#f97316" strokeWidth="2" />
              <rect x="190" y="135" width="30" height="35" rx="4" fill="#f8fafc" stroke="#f97316" strokeWidth="1" />
              <rect x="235" y="135" width="30" height="35" rx="4" fill="#f8fafc" stroke="#f97316" strokeWidth="1" />
              <rect x="280" y="135" width="30" height="35" rx="4" fill="#f8fafc" stroke="#f97316" strokeWidth="1" />
              <rect x="190" y="185" width="30" height="35" rx="4" fill="#f8fafc" stroke="#f97316" strokeWidth="1" />
              <rect x="235" y="185" width="30" height="35" rx="4" fill="#f8fafc" stroke="#f97316" strokeWidth="1" />
              <rect x="280" y="185" width="30" height="35" rx="4" fill="#f8fafc" stroke="#f97316" strokeWidth="1" />
              <rect x="220" y="250" width="60" height="50" rx="4" fill="#f97316" />
              <circle cx="100" cy="180" r="25" fill="#ffffff" stroke="#f97316" strokeWidth="2" />
              <rect x="80" y="210" width="40" height="60" rx="8" fill="#ffffff" stroke="#f97316" strokeWidth="2" />
              <circle cx="400" cy="180" r="25" fill="#ffffff" stroke="#f97316" strokeWidth="2" />
              <rect x="380" y="210" width="40" height="60" rx="8" fill="#ffffff" stroke="#f97316" strokeWidth="2" />
              <line x1="125" y1="200" x2="175" y2="200" stroke="#f97316" strokeWidth="2" strokeDasharray="5,5" />
              <line x1="325" y1="200" x2="375" y2="200" stroke="#f97316" strokeWidth="2" strokeDasharray="5,5" />
            </svg>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Core Capabilities</span>
            <h2 className="section-title">Unified HR Operations</h2>
            <p className="section-description">
              Comprehensive modules designed to streamline every aspect of human resource management for government bodies.
            </p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon" dangerouslySetInnerHTML={{ __html: feature.icon }} />
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Measurable Results</span>
            <h2 className="section-title">Impact at Scale</h2>
          </div>
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-title">{stat.title}</div>
                <div className="stat-description">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section className="modules-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">System Modules</span>
            <h2 className="section-title">Role-Based Dashboards</h2>
            <p className="section-description">
              Customized interfaces for different user roles ensuring relevant access and functionality.
            </p>
          </div>
          <div className="modules-grid">
            {modules.map((module, index) => (
              <div key={index} className="module-card">
                <div className="module-icon" dangerouslySetInnerHTML={{ __html: module.icon }} />
                <h3 className="module-title">{module.title}</h3>
                <p className="module-description">{module.description}</p>
                <ul className="module-features">
                  {module.features.map((feature, fIndex) => (
                    <li key={fIndex} className="module-feature-item">
                      <svg className="check-icon" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// Data
const features = [
  {
    icon: '<svg class="icon-feature" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>',
    title: 'Centralized Employee Records',
    description: 'Single verified system for employee profiles, service history, postings, and official documents across all departments.'
  },
  {
    icon: '<svg class="icon-feature" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',
    title: 'Smart Attendance System',
    description: 'Biometric and GPS-enabled attendance tracking with real-time monitoring and automated leave management.'
  },
  {
    icon: '<svg class="icon-feature" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>',
    title: 'Automated Payroll',
    description: 'Streamlined salary processing with automatic tax calculations, deductions, and compliance management.'
  },
  {
    icon: '<svg class="icon-feature" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>',
    title: 'Performance Analytics',
    description: 'Data-driven performance tracking with KPIs, 360° feedback, and automated appraisal workflows.'
  },
  {
    icon: '<svg class="icon-feature" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>',
    title: 'Grievance Redressal',
    description: 'Transparent complaint management with automated routing, tracking, and resolution timelines.'
  },
  {
    icon: '<svg class="icon-feature" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>',
    title: 'Recruitment Portal',
    description: 'End-to-end hiring management from job posting to onboarding with applicant tracking system.'
  }
];

const stats = [
  { value: '60%', title: 'Faster Processing', description: 'Reduced administrative time' },
  { value: '95%', title: 'Data Accuracy', description: 'Eliminated manual errors' },
  { value: '40%', title: 'Cost Savings', description: 'Reduced operational costs' },
  { value: '24/7', title: 'Availability', description: 'Always accessible platform' }
];

const modules = [
  {
    icon: '<svg class="icon-module" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>',
    title: 'Employee Portal',
    description: 'Self-service portal for attendance, leave applications, payslips, and profile management.',
    features: ['Personal Dashboard', 'Leave Management', 'Document Access']
  },
  {
    icon: '<svg class="icon-module" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>',
    title: 'Department Manager',
    description: 'Comprehensive tools for team management, approvals, and performance oversight.',
    features: ['Team Analytics', 'Approval Workflows', 'Performance Reviews']
  },
  {
    icon: '<svg class="icon-module" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>',
    title: 'Admin Console',
    description: 'Complete system administration with user management and configuration controls.',
    features: ['System Configuration', 'Access Control', 'Audit Trails']
  }
];

export default Landing;