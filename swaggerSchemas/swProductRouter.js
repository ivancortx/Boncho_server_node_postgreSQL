/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - startDate
 *         - endDate
 *         - priceStep
 *         - img
 *         - percentTimeStep
 *         - seePrice
 *         - startPrice
 *         - stepTime
 *         - authorEmail
 *         - categoryId
 *
 *       properties:
 *         id:
 *            type: number
 *            description: The auto-generated id
 *         name:
 *            type: string
 *            description: The name of product
 *         description:
 *            type: string
 *            description: The description of product
 *         isInStock:
 *            type: boolean
 *            description: Is in stock product
 *         startDate:
 *            type: string
 *            description: The date of the auction must be started
 *         endDate:
 *            type: string
 *            description: The date of the auction must be finished
 *         priceStep:
 *            type: number
 *            description: Step price
 *         img:
 *            type: string
 *            description: Link to image
 *         percentTimeStep:
 *            type: number
 *            description: Percent of time step
 *         seePrice:
 *            type: number
 *            description: The price of product
 *         startPrice:
 *            type: number
 *            description: Start price
 *         stepTime:
 *            type: number
 *            description: Step of time
 *         authorEmail:
 *            type: string
 *            description: Author Email
 *         categoryId:
 *            type: number
 *            description: category id
 *
 *       example:
 *        id: 2
 *        name: Lenovo Legion 5i
 *        description: Top notebook
 *        isInStock: true
 *        startDate: 11.03.2022
 *        endDate: 11.09.2022
 *        priceStep: 30
 *        img: http://example.com.ua/imgurl
 *        percentTimeStep: 20
 *        seePrice: 1200
 *        startPrice: 1200
 *        stepTime: 20
 *        categoryId: 2
 *        authorEmail: testemail@gmail.com
 */

/**
 * @swagger
 * tags:
 *   name: Product
 *   description: The Products in API
 */

/**
 * @swagger
 * /api/product:
 *   get:
 *     summary: Returns the list of all the products
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: The list of the products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */

/**
 * @swagger
 * /api/product:
 *   post:
 *     summary: Create a new product
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: The product was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/product/product:
 *   post:
 *     summary: Get one product by Id
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: Product id
 *
 *              example:
 *                  id: 2
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       500:
 *         description: Some server error
 */