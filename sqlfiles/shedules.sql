CREATE TABLE schedules (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    application_id INTEGER,
    stage TEXT,
    date DATE,
    time TIME,
    location TEXT,
    FOREIGN KEY (application_id) REFERENCES applications(id)
);
