// controllers/jobController.js
const pool = require('../config/db');

exports.getAllJobs = async (req, res) => {
    const jobs = await pool.query("SELECT * FROM job ORDER BY id");
    res.status(200).json(jobs.rows);
};

exports.createJob = async (req, res) => {
    const { title } = req.body;
    const newJob = await pool.query(
        'INSERT INTO job (title) VALUES ($1) RETURNING *',
        [title]
    );
    res.status(201).json(newJob.rows[0]);
};

exports.updateJob = async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({ message: "Yangilash uchun 'title' kiritilishi kerak" });
    }

    const updatedJob = await pool.query(
        'UPDATE job SET title = $1 WHERE id = $2 RETURNING *',
        [title, id]
    );

    if (updatedJob.rowCount === 0) {
        return res.status(404).json({ message: "Bu ID ga ega kasb topilmadi" });
    }
    res.status(200).json(updatedJob.rows[0]);
};

exports.deleteJob = async (req, res) => {
    const { id } = req.params;
    const deletedJob = await pool.query('DELETE FROM job WHERE id = $1 RETURNING *', [id]);

    if (deletedJob.rowCount === 0) {
        return res.status(404).json({ message: "Bu ID ga ega kasb topilmadi" });
    }
    res.status(200).json({ message: "Kasb muvaffaqiyatli o'chirildi", deletedJob: deletedJob.rows[0] });
};