import express from "express";
import pkg from "pg";
import dotenv from "dotenv";
import cors from "cors";
const { Pool } = pkg;

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
})
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//For fetching all the doctors from the database
app.get('/doctors', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM doctors');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }        
});

//For searching the doctor
app.get('/doctors/search', async (req, res) => {
  const searchTerm = req.query.q || '';

  try {
    const query = `
      SELECT * FROM doctors
      WHERE name ILIKE $1
    `;
    const values = [`%${searchTerm}%`];

    const { rows } = await pool.query(query, values);

    res.json(rows);
  } catch (error) {
    console.error('Error fetching data', error);
    res.status(500).json({ error: 'Error fetching data' });
  }
});

//Fetching doctor by id
app.get('/doctors/:doctorid', async (req, res) => {
    const { doctorid } = req.params;
    try {
      const result = await pool.query('SELECT * FROM doctors WHERE id = $1', [doctorid]);
      if (result.rows.length === 0) return res.status(404).json({ error: 'Doctor not found' });
      res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 4) Post patient details to the appointments table
app.post('/appointments', async (req, res) => {
    const { doctor_id, name, age, history, problems } = req.body;
    try {
      const result = await pool.query(
        'INSERT INTO appointments (doctor_id, name, age, history, problems, status, createdAt) VALUES ($1, $2, $3, $4, $5, $6, NOW()) RETURNING *',
        [doctor_id, name, age, history, problems, 'Pending']
      );
      res.status(201).json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // 4.5) Delete an appointments
  app.delete('/appointments/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const result = await pool.query('DELETE FROM appointments WHERE id = $1 RETURNING *', [id]);
      if (result.rows.length === 0) return res.status(404).json({ error: 'Appointment not found' });
      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // 5) Fetch patient details by id
  app.get('/appointments/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const result = await pool.query('SELECT * FROM appointments WHERE id = $1', [id]);
      if (result.rows.length === 0) return res.status(404).json({ error: 'Appointment not found' });
      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // 6) Post doctor to the doctors table
  app.post('/doctors', async (req, res) => {
    const doctors = req.body; // Handle an array of doctors

    try {
      // Prepare the base query
      const query = `
        INSERT INTO doctors (name, specialization, photo, experience, createdAt) 
        VALUES ($1, $2, $3, $4, NOW()) RETURNING *
      `;

      const results = []; // Array to store results of each insert

      // Loop through each doctor and execute the query
      for (const doctor of doctors) {
        const { name, specialization, photo, experience } = doctor;
        const result = await pool.query(query, [name, specialization, photo, experience]);
        results.push(result.rows[0]); // Add the inserted doctor to the results
      }

      res.status(201).json(results); // Send back all inserted doctors
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // 6.5) Delete a doctor
  app.delete('/doctors/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const result = await pool.query('DELETE FROM doctors WHERE id = $1 RETURNING *', [id]);
      if (result.rows.length === 0) return res.status(404).json({ error: 'Doctor not found' });
      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // 7) Fetch all appointment details
  app.get('/appointments', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM appointments');
      res.json(result.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // 8) Patch appointment status and time
  app.patch('/appointments/:id', async (req, res) => {
    const { id } = req.params;
    const { status, time_of_appointment } = req.body;
    try {
      const result = await pool.query(
        'UPDATE appointments SET status = $1, appointment_time = $2 WHERE id = $3 RETURNING *',
        [status, time_of_appointment, id]
      );
      if (result.rows.length === 0) return res.status(404).json({ error: 'Appointment not found' });
      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  //For submiting the changes made to the doctor
  app.put('/doctors/:id', async (req, res) => {
    const { id } = req.params;
    const { name, specialization, photo, experience } = req.body;

    try {
        const result = await pool.query(
            `UPDATE doctors 
             SET name = $1, specialization = $2, photo = $3, experience = $4 
             WHERE id = $5 RETURNING *`,
            [name, specialization, photo, experience, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Doctor not found" });
        }

        res.json({ message: "Doctor updated successfully", doctor: result.rows[0] });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Server error" });
    }
  });
  //To post the password to the doc_auth table
  app.post('/doctors/:id/password', async (req, res) => {
    const { id } = req.params;
    const { password } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO doc_auth (id, password) VALUES ($1, $2)
             ON CONFLICT (id) DO UPDATE SET password = $2 RETURNING *`,
            [id, password]
        );

        res.status(201).json({ message: "Password set successfully", doc_auth: result.rows[0] });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Server error" });
    }
  });
  //To get the password from the doc_auth table
  app.get('/doctors/:id/password', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(`SELECT password FROM doc_auth WHERE id = $1`, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Doctor not found" });
        }

        res.status(200).json({ password: result.rows[0].password });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Server error" });
    }
  });
  //put api to update the password
  app.put('/doctors/:id/password', async (req, res) => {
    const { id } = req.params;
    const { password } = req.body;

    try {
        // Check if the doctor already has a password entry in doc_auth
        const doctorExists = await pool.query(`SELECT * FROM doc_auth WHERE id = $1`, [id]);

        if (doctorExists.rows.length === 0) {
            return res.status(404).json({ error: "Doctor not found or password not set" });
        }

        // Update the password for the doctor in doc_auth
        const result = await pool.query(
            `UPDATE doc_auth SET password = $1 WHERE id = $2 RETURNING *`,
            [password, id]
        );

        res.status(200).json({ message: "Password updated successfully", doc_auth: result.rows[0] });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Server error" });
    }
  });

  // 9) Fetch all appointments under a specific doctor
  app.get('/doctors/:id/appointments', async (req, res) => {
    const { id } = req.params;
    try {
      const result = await pool.query('SELECT * FROM appointments WHERE doctor_id = $1', [id]);
      res.json(result.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });