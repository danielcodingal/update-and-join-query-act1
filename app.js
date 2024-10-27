// Import the sqlite3 module
var sqlite3 = require('sqlite3').verbose();

// Open a connection to the database (or create it if it doesn't exist)
var db = new sqlite3.Database('example.db', function (err) {
    if (err) {
        return console.error("Error connecting to the database: ", err.message);
    }
    console.log("Connected to the SQLite database.");
});

// SQL query to create a table
var createTableQuery = `
  CREATE TABLE IF NOT EXISTS employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    position TEXT NOT NULL
  );
`;

// Run the create table query
db.run(createTableQuery, function (err) {
    if (err) {
        return console.error("Error creating table: ", err.message);
    }
    console.log("Employees table created successfully.");

    // Insert multiple records into the employees table
    var insertValuesQuery = `
    INSERT INTO employees (name, position)
    VALUES 
    ('Alice', 'Manager'),
    ('Bob', 'Developer'),
    ('Charlie', 'Designer');
  `;

    db.run(insertValuesQuery, function (err) {
        if (err) {
            return console.error("Error inserting values: ", err.message);
        }
        console.log("Records inserted into the 'employees' table.");

        // SQL query to update a record
        var updateQuery = `UPDATE employees SET position = 'Senior Developer' WHERE name = 'Bob';`;

        // Run the update query
        db.run(updateQuery, function (err) {
            if (err) {
                return console.error("Error updating record: ", err.message);
            }
            console.log("Record updated successfully.");

            // Retrieve and display the updated records
            var selectQuery = `SELECT * FROM employees;`;
            db.all(selectQuery, function (err, rows) {
                if (err) {
                    return console.error("Error retrieving data: ", err.message);
                }
                console.log("Updated records:");
                rows.forEach(function (row) {
                    console.log(row);
                });

                // Close the database connection
                db.close(function (err) {
                    if (err) {
                        return console.error("Error closing the database: ", err.message);
                    }
                    console.log("Database connection closed.");
                });
            });
        });
    });
});
