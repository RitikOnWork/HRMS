CREATE TABLE scores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    application_id INTEGER,
    stage TEXT,
    marks INTEGER,
    FOREIGN KEY (application_id) REFERENCES applications(id)
);
