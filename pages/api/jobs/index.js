import pool from "@/lib/db";

export default async function handler(req, res) {
  // GET request handler
  if (req.method === "GET") {
    try {
      console.log('API: Starting GET request');
      
      const result = await pool.query(`
        SELECT 
          id,
          title,
          company, 
          location,
          type,
          salary,
          description,
          posted
        FROM jobs 
        ORDER BY id DESC
      `);
      
      console.log('API: Query successful, rows:', result.rows.length);
      
      // Add CORS headers
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
      
      return res.status(200).json(result.rows);
    } catch (error) {
      console.error("API Error:", error);
      return res.status(500).json({ 
        error: true,
        message: error.message 
      });
    }
  }

  // POST request handler
  else if (req.method === "POST") {
    try {
      console.log('API: Starting POST request');
      const { title, company, location, type, salaryTo, description, deadline } = req.body;

      // Validate required fields
      if (!title || !company || !location || !type) {
        return res.status(400).json({
          error: true,
          message: "Missing required fields"
        });
      }

      const result = await pool.query(
        `INSERT INTO jobs 
        (title, company, location, type, salary, description, posted)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *`,
        [title, company, location, type, salaryTo, description, deadline]
      );

      console.log('API: Job created successfully');
      
      return res.status(201).json({
        message: "Job added successfully",
        job: result.rows[0]
      });
    } catch (error) {
      console.error("API Error:", error);
      return res.status(500).json({
        error: true,
        message: "Failed to create job",
        details: error.message
      });
    }
  }

  // Handle unsupported methods
  else {
    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).json({
      error: true,
      message: `Method ${req.method} Not Allowed`
    });
  }
}