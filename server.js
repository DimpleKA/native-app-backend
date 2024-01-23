const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Update the connection string with your MongoDB connection string
const mongoUri = 'mongodb+srv://Dimpleusern:Dimple9#@cluster0.fhranxl.mongodb.net/?retryWrites=true&w=majority&ssl=false';



mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(bodyParser.json());

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
});

const UserModel = mongoose.model('User', userSchema);

app.post('/api/addUser', async (req, res) => {
    try {
        const newUser = new UserModel(req.body);
        await newUser.save();
        res.json({ success: true, message: 'User added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
