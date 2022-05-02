import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;

const handleOpen = () => {
    console.log('✅ Connected to DB');
};

const handleError = (error) => {
    console.log('❌ DB Error', error);
};

db.on('error', handleError);
db.once('open', handleOpen);
