const express = require("express")
const { Pool } = require("pg")
const bodyParser = require("body-parser")
const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(express.static("public"))

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

app.get("/todos", async (_, res) => {
  const result = await pool.query("SELECT * FROM todos")
  res.json(result.rows)
})

app.post("/todos", async (req, res) => {
  const { title } = req.body
  const result = await pool.query(
    "INSERT INTO todos(title) VALUES($1) RETURNING *",
    [title]
  )
  res.json(result.rows[0])
})

app.listen(port, async () => {
  await pool.query(
    "CREATE TABLE IF NOT EXISTS todos (id SERIAL PRIMARY KEY, title VARCHAR(255) NOT NULL)"
  )
  console.log(`Todo app running on port ${port}`)
})
