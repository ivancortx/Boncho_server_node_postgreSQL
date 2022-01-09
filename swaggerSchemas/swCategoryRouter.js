/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - name
 *
 *       properties:
 *         id:
 *            type: number
 *            description: The auto-generated id
 *         name:
 *            type: string
 *            description: The name of category
 *
 *       example:
 *        id: 3
 *        name: Notebooks
 */

/**
 * @swagger
 * tags:
 *   name: Category
 *   description: The Categories in API
 */

/**
 * @swagger
 * /api/category:
 *   get:
 *     summary: Returns the list of all categories
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: The list of the categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */

/**
 * @swagger
 * /api/category:
 *   post:
 *     summary: Create a new category
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              schema:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                      description: Category name
 *
 *              example:
 *                  name: Smartphones
 *     responses:
 *       200:
 *         description: The category was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       500:
 *         description: Some server error
 */

