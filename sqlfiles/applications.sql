CREATE TABLE applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    candidate_id INTEGER,
    job_id INTEGER,
    status TEXT DEFAULT 'applied',
    eligibility_reason TEXT,
    applied_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (candidate_id) REFERENCES candidate_profiles(id),
    FOREIGN KEY (job_id) REFERENCES jobs(id)
);
