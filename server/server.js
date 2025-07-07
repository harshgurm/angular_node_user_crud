const express = require('express');
const app = express();
const connection = require('./connection');
// const cors = require('cors');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const verifyUser = require('./auth');

// app.use(cors());
app.use(express.json())

app.get('/customers', async (req, res) => {
    try {
        const [data] = await connection.promise().query(
            `SELECT * FROM ${process.env.DATABASE}.customers`);
            if(data.length > 0) return res.json(data);
            else return res.json({ message: "Customer not found" });
    } catch (error) {
        return res.json(error);
    }

});

app.get('/customers/:id', async (req, res) => {
    let customer_id = req.params.id;
    
    if (!customer_id || isNaN(customer_id)) return res.status(400).json({ message: "Please provide a Customer ID" });
    
    try {
        const [data] = await connection.promise().query(
            `SELECT * 
                FROM ${process.env.DATABASE}.customers
                WHERE customer_id = ?`, customer_id);

        if (data.length > 0) return res.send(data);
        else return  res.json({ message: "Customer not found" });
    } catch (error) {
        return  res.json(error);
    }

});

app.post('/customers/', async (req, res) => {
    let { customer_first_name, customer_last_name, address, city } = req.body;

    if(!customer_first_name) return res.status(400).json({ message: "Customer First Name is mandatory" });

    try {
        const [data] = await connection.promise().query(`
            INSERT INTO  ${process.env.DATABASE}.customers (customer_first_name, customer_last_name, address, city) 
            VALUES (?, ?, ?, ?) `, [customer_first_name, customer_last_name, address, city]);
        if (data && data.affectedRows > 0) return res.status(200).json({message : "Record added successfully!!!"});
        else return res.json({ message: "Unable to add the customer"});
    } catch (error) {
        return res.json(error);
    }
})

app.delete('/delete/:customer_id', async (req, res) => {
    let customer_id = req.params.customer_id;
    
    if (!customer_id || isNaN(customer_id)) return res.status(400).json({ message: "Please provide a Customer ID" });

    try {
        const [data] = await connection.promise().query(`
            DELETE FROM ${process.env.DATABASE}.customers
            WHERE customer_id = ?`, customer_id); 
        if(data.affectedRows > 0 ) return res.json({message : 'Customer deleted successfully'});
        else return res.json({message : 'Unable to find the customer'});
    } catch(error) {
        res.json(error)
    }
    
})

app.put('/update/:customer_id', async (req, res) => {
    
    let customer_id = req.params.customer_id;
    let { customer_first_name, customer_last_name, address, city } = req.body;

    if (!customer_id || isNaN(customer_id)) return res.status(400).json({ message: "Please provide a Customer ID" });

    if(!customer_first_name) return res.status(400).json({ message: "Customer First Name is mandatory" });

    try {
        const [customer] = await connection.promise().query(`SELECT * 
            FROM ${process.env.DATABASE}.customers 
            WHERE customer_id = ?`, customer_id);
            if(customer.length > 0) {
                for(let cus in customer){
                    if(customer_first_name == undefined) customer_first_name = customer[cus].customer_first_name;
                    if(customer_last_name == undefined) customer_last_name = customer[cus].customer_last_name;
                    if(address == undefined) address = customer[cus].address;
                    if(city == undefined) city = customer[cus].city;
                }
                const [data] = await connection.promise().query(`
                    UPDATE ${process.env.DATABASE}.customers
                    SET customer_first_name = ?, customer_last_name = ?, address = ?, city = ?
                    WHERE customer_id = ?`, [customer_first_name, customer_last_name, address, city, customer_id] )
                    if(data && data.affectedRows > 0) return res.json({message : 'Customer updated successfully'});
                    else return res.json({message : 'Unable to update the Customer'});
            } else {
                return res.json({message : 'Customer does not exist'});
            }
    } catch(error) {
        return res.json(error);
    }
})

app.post('/signup', async (req, res) => {
    let { username, password, confirm_password, status } = req.body;

    if(!username || !password || !confirm_password){
        return res.status(401).json({ message: 'Please provide all the values'});
    }

    if(password != confirm_password) return res.status(401).json({ message: "Password doesn't match"});

    if(!status) status = 1;

    const hashedPass = await bcrypt.hash(password, 10);

    try {
        const [data] = await connection.promise().query(`
            INSERT INTO ${process.env.DATABASE}.users (username, password, status) 
            VALUES (?, ?, ?) `, [username, hashedPass, status ]);
        if (data && data.affectedRows > 0) return res.json({ message: "User added successfully"});
        else return res.json({ message: "Unable to add the user"});
    } catch (error) {
        return res.json(error);
    }
})


app.post('/signin', async (req, res) => {
    let { username, password } = req.body;

    if(!username || !password) return res.status(401).json('Please provide all the values');

    try {
        const [data] = await connection.promise().query(`
            SELECT users_id, username, password
            FROM ${process.env.DATABASE}.users 
            WHERE username = ? `, username);
        if (data.length > 0) {
            const passResult = await bcrypt.compare(password, data[0].password);
            if(passResult){
                const token = await jwt.sign({user_id:data[0].user_id}, process.env.KEY,  { expiresIn: '1h' });
                return res.status(200).json({'token': token});    
            } else {
                return res.status(401).json({ message: 'Authentication failed!'});
            }
        } else {
            return res.json({ message: "Customer not found"});
        }

    } catch (error) {
        return res.json(error);
    }
})


app.listen(3000, () => {
    console.log('Listening on port 3000');
})