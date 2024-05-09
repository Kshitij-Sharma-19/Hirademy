import express from "express"
import bodyParser from "body-parser";
import pg from "pg";
import path from 'path';
import env from "dotenv";

const app =express();
const port =3000;
const __dirname = path.resolve()
env.config();

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
  });
db.connect();

app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// POST /assistant
app.post("/assistant", async (req, res) => {
    try {
        const { name, email, mobile, salary, city, country, department, role} = req.body;

        // Basic input validation
        if (!name || !email || !mobile || !salary || !city || !country ||!department || !role) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const result = await db.query(
            "INSERT INTO assistants (name, email, mobile,salary, city, country, department, role) VALUES ($1, $2, $3,$4,$5,$6,$7,$8) RETURNING id", 
            [name, email, mobile,salary, city, country, department, role]);
        res.status(201).json({ message: "Assistant added with id number: " + result.rows[0].id });
    } catch (error) {
        console.error('Error executing POST /assistant:', error);
        res.status(500).send('Internal Server Error');
    }
});

// GET /assistant/:assistant_id
app.get("/assistant/:assistant_id", async (req, res) => {
    try{
        const {assistant_id} = req.params;
        const result = await db.query(
            "SELECT * FROM assistants WHERE id =$1",
            [assistant_id]
        );
        if (result.rows.length === 0) {
            res.status(404).send("Assistant not found");
        } else {
            res.json(result.rows[0]);
        }
    } catch (error) {
        console.error("Error executing GET /assistant/:assistant_id:", error);
        res.status(500).send("Internal Server Error");
    }
});

// PUT /assistant/:assistant_id
app.put("/assistant/:assistant_id", async (req, res) => {
    try {
        const { assistant_id } = req.params;
        const { name, email, mobile, salary, city, country, department, role} = req.body;

        // To Check if assistant_id is a valid integer
        if (isNaN(parseInt(assistant_id))) {
            return res.status(400).json({ error: "Invalid assistant id" });
        }

        // Fetch current assistant details from the database
        const currentAssistant = await db.query(
            "SELECT * FROM assistants WHERE id = $1", 
            [assistant_id]
        );

        // Check if assistant exists
        if (currentAssistant.rows.length === 0) {
            return res.status(404).send("Assistant not found");
        }

        // Merge current values with the provided values
        const updatedAssistant = {
            name: name || currentAssistant.rows[0].name,
            email: email || currentAssistant.rows[0].email,
            mobile: mobile || currentAssistant.rows[0].mobile,
            salary: salary || currentAssistant.rows[0].salary,
            city: city || currentAssistant.rows[0].city,
            country: country || currentAssistant.rows[0].country,
            department: department || currentAssistant.rows[0].department,
            role: role || currentAssistant.rows[0].role
        };

        const result = await db.query(
            "UPDATE assistants SET name = $1, email = $2, mobile = $3, salary = $4, city = $5, country = $6, department = $7, role = $8 WHERE id = $9", 
            [updatedAssistant.name, updatedAssistant.email, updatedAssistant.mobile, updatedAssistant.salary, updatedAssistant.city, updatedAssistant.country, updatedAssistant.department, updatedAssistant.role, assistant_id]
        );

        // Check if any row was updated
        if (result.rowCount === 0) {
            return res.status(404).send("Assistant not found");
        }

        res.status(200).send("Assistant updated successfully");
    } catch (error) {
        console.error("Error executing PUT /assistant/:assistant_id:", error);
        res.status(500).send("Internal Server Error");
    }
});



// DELETE /assistant/:assistant_id
app.delete("/assistant/:assistant_id", async (req, res) => {
    try {
        const { assistant_id } = req.params;

        // Check if assistant_id is a valid integer
        if (isNaN(parseInt(assistant_id))) {
            return res.status(400).json({ error: "Invalid assistant id"});
        }

        const result = await db.query(
            "DELETE FROM assistants WHERE id = $1",
            [assistant_id]);
        // Check if any row was deleted
        if (result.rowCount === 0) {
            return res.status(404).send("Assistant not found");
        }

        res.status(200).send("Assistant deleted successfully");
    } catch (error) {
        console.error("Error executing DELETE /assistant/:assistant_id:", error);
        res.status(500).send("Internal Server Error");
    }
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
})