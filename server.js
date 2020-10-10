const express = require('express');
const app = express();
const port = 3000;

const pool = require('./db');

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const cors = require('cors');
const bodyParser = require('body-parser');
const { response } = require('express');


const options = {
  swaggerDefinition: {
    info: {
      title: 'Assignment 8',
      version: '1.0.0',
      description: 'Assignment 8 documentation'
    },
    host: '157.245.137.44:3000',
    basePath: '/'
  },
  apis: ['./server.js'],
};
const specs = swaggerJsdoc(options);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use(cors());
app.use(bodyParser.json({type: 'application/json'}));

/**
 * @swagger
 * definitions:
 *   Student:
 *     properties:
 *       name:
 *         type: string
 *       title:
 *         type: string
 *       class:
 *         type: string
 *       section:
 *         type: string
 *       rollid:
 *         type: string
 *   Agent:
 *     properties:
 *       code:
 *         type: string
 *       name:
 *         type: string
 *       area:
 *         type: string
 *       commission:
 *         type: string
 *       phone:
 *         type: string
 *       country:
 *         type: string
 *   Items:
 *     properties:
 *       code:
 *         type: string
 *       name:
 *         type: string
 *       batch:
 *         type: string
 *       company:
 *         type: string
 *       
 */

/**
 * @swagger
 * /agents:
 *     get:
 *       tags:
 *         - Agents
 *       description: Returns all the agents
 *       produces:
 *         - application/json
 *       responses:
 *         200:
 *           description: Object agents containing all the details of the agents
 */
app.get('/agents', async (req, res) => {
	let conn;
	try {
		conn = await pool.getConnection();

		var query = "SELECT * from agents";
		var rows = await conn.query(query);
		res.header("Access-Control-Allow-Origin", "localhost:3000");
		res.header("Access-Control-Allow-Origin", "Origin, X-Requested-with, Content-Type, Accept")
		res.setHeader('Content-Type', 'application/json');
		res.json(rows);
	} catch (err) {
		throw err;
	} finally {
		if (conn) return conn.release();
	}
});

/**
 * @swagger
 * /student:
 *     get:
 *       tags:
 *         - Student
 *       description: Returns all the students
 *       produces:
 *         - application/json
 *       responses:
 *         200:
 *           description: Object agents containing all the details of the students
 */
app.get('/student', async (req, res) => {
	let conn;
	try {
		conn = await pool.getConnection();

		var query = "SELECT * from student";
		var rows = await conn.query(query);

		res.header("Access-Control-Allow-Origin", "localhost:3000");
		res.header("Access-Control-Allow-Origin", "Origin, X-Requested-with, Content-Type, Accept")
		res.setHeader('Content-Type', 'application/json');
		res.json(rows);
	} catch (err) {
		throw err;
	} finally {
		if (conn) return conn.release();
	}
});

/**
 * @swagger
 * /customer:
 *     get:
 *       tags:
 *         - Customer
 *       description: Returns all the customers
 *       produces:
 *         - application/json
 *       responses:
 *         200:
 *           description: Object agents containing all the details of the customers
 */
app.get('/customer', async (req, res) => {
	let conn;
	try {
		conn = await pool.getConnection();

		var query = "SELECT * from customer";
		var rows = await conn.query(query);

		res.header("Access-Control-Allow-Origin", "localhost:3000");
		res.header("Access-Control-Allow-Origin", "Origin, X-Requested-with, Content-Type, Accept")
		res.setHeader('Content-Type', 'application/json');
		res.json(rows);
	} catch (err) {
		throw err;
	} finally {
		if (conn) return conn.release();
	}
});


/**
 * @swagger
 * /items:
 *     get:
 *       tags:
 *         - Items
 *       description: Returns all the items
 *       produces:
 *         - application/json
 *       responses:
 *         200:
 *           description: successful get of items
 */
app.get('/items', async (req, res) => {
	let conn;
	try {
		conn = await pool.getConnection();

		var query = "SELECT * from listofitem";
		var rows = await conn.query(query);

		res.header("Access-Control-Allow-Origin", "localhost:3000");
		res.header("Access-Control-Allow-Origin", "Origin, X-Requested-with, Content-Type, Accept")
		res.setHeader('Content-Type', 'application/json');
		res.json(rows);
	} catch (err) {
		throw err;
	} finally {
		if (conn) return conn.release();
	}
});

/**
 * @swagger
 * /agents/{agent_code}:
 *     put:
 *       tags:
 *         - Agents
 *       description: Updates agent entry
 *       produces: application/json
 *       parameters:
 *         - name: agent_code
 *           in: body
 *           description: agent details
 *           schema:
 *             type: array
 *             $ref: '#/definitions/Agent'
 *       responses:
 *         200:
 *           description: successfully completed
 */

app.put('/agents/:agent_code', async (req, res) => {

	const agent_code = req.body.code;
	const agent_name = req.body.name;
	const agent_area = req.body.area;
	const agent_commission = req.body.commission;
	const agent_phone = req.body.phone;
	const agent_country = req.body.country;

	let conn;
	try {
		conn = await pool.getConnection();
		var rows = await conn.query(`update agents set AGENT_NAME=?, WORKING_AREA=?, COMMISSION=?, PHONE_NO=?, COUNTRY=? where AGENT_CODE=?`, [agent_name, agent_area, agent_commission, agent_phone, agent_country, agent_code]);

		res.setHeader('Content-Type', 'application/json');
		res.json(rows)
	} catch (err) {
		throw err;
	} finally {
		if (conn) return conn.release();
	}
});

/**
 * @swagger
 * /items/{item_code}:
 *     patch:
 *       tags:
 *         - Items
 *       description: Updates specific value in item
 *       produces: application/json
 *       parameters:
 *         - name: item_code
 *           in: path
 *           required: true
 *           type: string
 *         - name: items
 *           in: body
 *           description: Item details
 *           schema:
 *             type: array
 *             $ref: '#/definitions/Items'
 *       responses:
 *         200:
 *           description: successfully completed patch for items
 */
app.patch('/items/:item_code', async (req, res) => {

	const old_item_code = req.params.item_code;
	const old_item_string = old_item_code.toString();
	const new_item_code = req.body.code;

	const item_name = req.body.name;
	const item_batch = req.body.batch;
	const item_company = req.body.company;

	let conn;
	try {
		conn = await pool.getConnection();
		var rows = await conn.query(`update listofitem set ITEMCODE=?, ITEMNAME=?, BATCHCODE=?, CONAME=? WHERE ITEMCODE=?`, [new_item_code, item_name, item_batch, item_company, old_item_code]);

		res.setHeader('Content-Type', 'application/json');
		res.json(rows)
	} catch (err) {
		throw err;
	} finally {
		if (conn) return conn.release();
	}
});

/**
 * @swagger
 * /student:
 *     post:
 *       tags:
 *         - Student
 *       description: creates new student
 *       produces:
 *         - application/json
 *       parameters:
 *         - name: students
 *           in: body
 *           description: Student
 *           required: true
 *           schema:
 *             $ref: '#/definitions/Student'
 *       responses:
 *         200:
 *           description: Returns list of Students
 */

app.post('/student', async (req, res) => {

	const student_name = req.body.name;
	const student_title = req.body.title;
	const student_class = req.body.class;
	const student_section = req.body.section;
	const student_rollid = req.body.rollid;

	let conn;
	try {
		conn = await pool.getConnection();

		var rows = await conn.query(`insert into student values (?, ?, ?, ?, ?)`, [student_name, student_title, student_class, student_section, student_rollid]);

		res.setHeader('Content-Type', 'application/json');
		res.json(rows);
	} catch (err) {
		throw err;
	} finally {
		if (conn) return conn.release();
	}
});

/**
 * @swagger
 * /student/{student_name}:
 *     delete:
 *       tags:
 *         - Student
 *       description: removes student from database
 *       produces:
 *         - application/json
 *       parameters:
 *         - name: student_name
 *           description: student name
 *           in: path
 *           required: true
 *           type: string
 *       responses:
 *         200:
 *           description: Successfully deleted
 */

app.delete('/student/:student_name/', async (req, res) => {

	var student_name = req.params.student_name;

	let conn;
	try {
		conn = await pool.getConnection();
		var rows = await conn.query(`delete from student where NAME=?`, [student_name] );

		res.setHeader('Content-Type', 'application/json');
		res.json(rows);
	} catch (err) {
		throw err;
	} finally {
		if (conn) return conn.release();
	}
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
