import express from "express"
import cors from "cors"
import mysql from "mysql"

const app = express()
app.use(cors())
app.use(express.json())

const database = mysql.createConnection({
  host: 'localhost',
  user: 'aether',
  password: '12345678',
  database: 'busapp'
})

app.get("/", (req, res) => {
  return res.json("Hello from the backend")
})

app.get("/bus-stops", (req, res) => {
  const query = "SELECT * FROM Stops"
  database.query(query, (err, result) => {
    if (err) {
      return res.json(err)
    }
    return res.json(result)
  })
})

app.post("/bus-stops", (req, res) => {
  const { Name, AverageTime, Passangers, Latitude, Longitude } = req.body;

  const sql = 'INSERT INTO Stops (Name, Latitude, Longitude, AverageTime, Passangers) VALUES (?, ?, ?, ?, ?)';
  database.query(sql, [Name, Latitude, Longitude, AverageTime, Passangers], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'An error occurred while adding the task.' });
    }
    res.json({ message: 'Stop added successfully', insertId: result.insertId });
  });
})

app.get("/drivers-page", (req, res) => {
  const query = "SELECT * FROM Driver"
  database.query(query, (err, result) => {
    if (err) {
      return res.json(err)
    }
    return res.json(result)
  })
})

app.post("/drivers-page", (req, res) => {
  const { FirstName, LastName, Age, Id, Route, Vehicle } = req.body;

  const sql = 'INSERT INTO Driver(FirstName, LastName, Age, Id, Route, Vehicle) VALUES (?, ?, ?, ?, ?, ?)';
  database.query(sql, [FirstName, LastName, Age, Id, Route, Vehicle], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'An error occurred while adding the task.' });
    }
    res.json({ message: 'Stop added successfully', insertId: result.insertId });
  });
})

app.get("/bus-page", (req, res) => {
  const query = "SELECT * FROM Vehicle"
  database.query(query, (err, result) => {
    if (err) {
      return res.json(err)
    }
    return res.json(result)
  })
})

app.post("/bus-page", (req, res) => {
  const { Brand, Model, Id, Color, Year } = req.body;

  const sql = 'INSERT INTO Vehicle(Brand, Model, Id, Color, Year) VALUES (?, ?, ?, ?, ?)';
  database.query(sql, [Brand, Model, Id, Color, Year], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'An error occurred while adding the task.' });
    }
    res.json({ message: 'Stop added successfully', insertId: result.insertId });
  });
})

app.listen(8081, () => {
  console.log("Listening from 8081...")
})
