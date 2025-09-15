// routes/employer.js
const { Router } = require('express');
const employerController = require('../controllers/employerController');
const catchAsync = require('../utils/catchAsync');
const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Employer:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Ish beruvchining avtomatik generatsiya qilingan IDsi
 *         name:
 *           type: string
 *           description: Ish beruvchining ismi
 *         degree:
 *           type: string
 *           description: Ish beruvchining darajasi
 *         salary:
 *           type: number
 *           format: float
 *           description: Ish beruvchining maoshi
 *         job_id:
 *           type: integer
 *           description: Kasb IDsi (foreign key)
 *       example:
 *         id: 1
 *         name: John Doe
 *         degree: Senior
 *         salary: 5000
 *         job_id: 1
 *     EmployerInput:
 *       type: object
 *       required:
 *         - name
 *         - salary
 *         - degree
 *         - job_id
 *       properties:
 *         name:
 *           type: string
 *         degree:
 *           type: string
 *         salary:
 *           type: number
 *           format: float
 *         job_id:
 *           type: integer
 *       example:
 *         name: Jane Doe
 *         degree: Middle
 *         salary: 3000
 *         job_id: 2
 */

/**
 * @swagger
 * tags:
 *   name: Employers
 *   description: Ish beruvchilarni boshqarish API
 */

/**
 * @swagger
 * /employers:
 *   get:
 *     summary: Barcha ish beruvchilar ro'yxatini qaytaradi
 *     tags: [Employers]
 *     responses:
 *       200:
 *         description: Ish beruvchilar ro'yxati
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employer'
 */
router.get('/', catchAsync(employerController.getAllEmployers));

/**
 * @swagger
 * /employers/add:
 *   post:
 *     summary: Yangi ish beruvchi qo'shish
 *     tags: [Employers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EmployerInput'
 *     responses:
 *       201:
 *         description: Yangi qo'shilgan ish beruvchi
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employer'
 */
router.post('/add', catchAsync(employerController.createEmployer));

/**
 * @swagger
 * /employers/{id}:
 *   put:
 *     summary: Mavjud ish beruvchini ID bo'yicha yangilash
 *     tags: [Employers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Ish beruvchi IDsi
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EmployerInput'
 *     responses:
 *       200:
 *         description: Yangilangan ish beruvchi ma'lumotlari
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employer'
 *       404:
 *         description: Ish beruvchi topilmadi
 */
router.put('/:id', catchAsync(employerController.updateEmployer));

/**
 * @swagger
 * /employers/{id}:
 *   delete:
 *     summary: Ish beruvchini ID bo'yicha o'chirish
 *     tags: [Employers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Ish beruvchi IDsi
 *     responses:
 *       200:
 *         description: Ish beruvchi muvaffaqiyatli o'chirildi
 *       404:
 *         description: Ish beruvchi topilmadi
 */
router.delete('/:id', catchAsync(employerController.deleteEmployer));


module.exports = router;