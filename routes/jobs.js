const { Router } = require('express');
const jobController = require('../controllers/jobController');
const catchAsync = require('../utils/catchAsync');
const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Job:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Kasbning avtomatik generatsiya qilingan IDsi
 *         title:
 *           type: string
 *           description: Kasb nomi
 *       example:
 *         id: 1
 *         title: Dasturchi
 *     JobInput:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         title:
 *           type: string
 *           description: Kasb nomi
 *       example:
 *         title: Marketolog
 */

/**
 * @swagger
 * tags:
 *   name: Jobs
 *   description: Kasblarni boshqarish API
 */

/**
 * @swagger
 * /jobs:
 *   get:
 *     summary: Barcha kasblar ro'yxatini qaytaradi
 *     tags: [Jobs]
 *     responses:
 *       200:
 *         description: Kasblar ro'yxati
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Job'
 */
router.get('/', catchAsync(jobController.getAllJobs));

/**
 * @swagger
 * /jobs/add:
 *   post:
 *     summary: Yangi kasb qo'shish
 *     tags: [Jobs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/JobInput'
 *     responses:
 *       201:
 *         description: Yangi qo'shilgan kasb
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Job'
 */
router.post('/add', catchAsync(jobController.createJob));

/**
 * @swagger
 * /jobs/{id}:
 *   put:
 *     summary: Mavjud kasbni ID bo'yicha yangilash
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Kasb IDsi
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/JobInput'
 *     responses:
 *       200:
 *         description: Yangilangan kasb ma'lumotlari
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Job'
 *       404:
 *         description: Kasb topilmadi
 */
router.put('/:id', catchAsync(jobController.updateJob));

/**
 * @swagger
 * /jobs/{id}:
 *   delete:
 *     summary: Kasbni ID bo'yicha o'chirish
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Kasb IDsi
 *     responses:
 *       200:
 *         description: Kasb muvaffaqiyatli o'chirildi
 *       404:
 *         description: Kasb topilmadi
 */
router.delete('/:id', catchAsync(jobController.deleteJob));

module.exports = router;