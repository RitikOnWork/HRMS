CREATE TABLE employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER UNIQUE,
    employee_code TEXT UNIQUE,
    department TEXT,
    designation TEXT,
    pay_grade TEXT,
    date_of_joining DATE,
    status TEXT DEFAULT 'active',
    FOREIGN KEY (user_id) REFERENCES users(id)
);
