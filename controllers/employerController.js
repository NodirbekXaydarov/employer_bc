// controllers/employerController.js
const pool = require('../config/db');

exports.getAllEmployers = async (req, res) => {
    const employers = await pool.query("SELECT * FROM employer ORDER BY id");
    res.status(200).json(employers.rows);
};

exports.createEmployer = async (req, res) => {
    const { name, degree, salary, job_id } = req.body;
    const newEmployer = await pool.query(
        'INSERT INTO employer (name, degree, salary, job_id) VALUES ($1, $2, $3, $4) RETURNING *',
        [name, degree, salary, job_id]
    );
    res.status(201).json(newEmployer.rows[0]);
};

exports.updateEmployer = async (req, res) => {
    const { id } = req.params;
    const { name, degree, salary, job_id } = req.body;

    const updatedEmployer = await pool.query(`
        UPDATE employer 
        SET 
            name = COALESCE($1, name), 
            degree = COALESCE($2, degree), 
            salary = COALESCE($3, salary), 
            job_id = COALESCE($4, job_id) 
        WHERE id = $5 
        RETURNING *
        `, [name, degree, salary, job_id, id]
    );

    if (updatedEmployer.rowCount === 0) {
        return res.status(404).json({ message: "Bu ID ga ega employer topilmadi" });
    }
    res.status(200).json(updatedEmployer.rows[0]);
};

exports.deleteEmployer = async (req, res) => {
    const { id } = req.params;
    const deletedEmployer = await pool.query('DELETE FROM employer WHERE id = $1 RETURNING *', [id]);

    if (deletedEmployer.rowCount === 0) {
        return res.status(404).json({ message: "Bu ID ga ega employer topilmadi" });
    }
    res.status(200).json({ message: "Employer muvaffaqiyatli o'chirildi", deletedEmployer: deletedEmployer.rows[0] });
};