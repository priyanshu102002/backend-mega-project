import app from "./app.js";
import connectDB from "./db/index.js";
import dotenv from "dotenv";

dotenv.config({
    path: "./.env",
});

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 4000, () => {
            console.log(`Server is running at port : ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log("MongoDB connection Failed !!!", err);
    });


















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
