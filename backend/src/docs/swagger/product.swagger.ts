/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Products management
 */

/**
 * @swagger
 * /api/v1/products:
 *   get:
 *     summary: Retrieve a list of products
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *       - in: query
 *         name: skip
 *         schema:
 *           type: integer
 *           example: 0
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *           example: espresso
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductListResponse'
 */

/**
 * @swagger
 * /api/v1/products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid ID supplied
 *       404:
 *         description: Product not found
 *       401:
 *         description: Unauthorized – missing or invalid token
 */

/**
 * @swagger
 * /api/v1/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/ProductRequest'
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ProductRequest:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - description
 *         - categoryId
 *         - stock
 *         - material
 *         - sku
 *         - images
 *       properties:
 *         name:
 *           type: string
 *           example: "Cappuccino"
 *         price:
 *           type: number
 *           example: 5.25
 *         description:
 *           type: string
 *           example: "Rich espresso topped with frothy milk foam"
 *         categoryId:
 *           type: string
 *           example: "683488102a826ae82a1d5691"
 *         stock:
 *           type: integer
 *           example: 10
 *         material:
 *           type: string
 *           example: "Coffee, Milk, Foam, Cup"
 *         sku:
 *           type: string
 *           example: "COFFEE-001"
 *         images:
 *           type: array
 *           items:
 *             type: string
 *             format: binary
 *           description: "Array of image files to upload"
 *         deletedImages:
 *           type: array
 *           items:
 *             type: string
 *           description: "Optional list of image URLs or filenames to delete"
 *
 *     ProductListResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         data:
 *           type: object
 *           properties:
 *             data:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *             total:
 *               type: number
 *               example: 24
 *
 *     Product:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         price:
 *           type: number
 *         description:
 *           type: string
 *         category:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *             name:
 *               type: string
 *             description:
 *               type: string
 *         sku:
 *           type: string
 *         material:
 *           type: string
 *         stock:
 *           type: number
 *         images:
 *           type: array
 *           items:
 *             type: string
 *         active:
 *           type: number
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         __v:
 *           type: number
 */
