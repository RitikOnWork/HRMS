CREATE TABLE transfers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    employee_id INTEGER NOT NULL,
    from_department TEXT,
    to_department TEXT NOT NULL,
    from_location TEXT,
    to_location TEXT,
    effective_date DATE NOT NULL,
    order_number TEXT,
    reason TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employees(id)
);
