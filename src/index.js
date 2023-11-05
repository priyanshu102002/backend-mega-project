import connectDB from './db/index.js';
import dotenv from "dotenv"

dotenv.config({
    path: './env'
})

connectDB();

































// (async () => {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
//         const app = express();

//         app.on("error",(error)=>{
//             console.log("Some Error",error);
//             throw error;
//         })

//         app.listen(process.env.PORT,()=>{
//             console.log(`app is running on the port ${process.env.PORT}`);
//         })
//     } catch (error) {
//         console.error("ERROR ", error);
//         throw err
//     }
// })();
