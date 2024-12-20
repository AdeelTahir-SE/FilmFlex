import multer from "multer";
import uploadImage from "@/DB/User";
const storage = multer.memoryStorage();
const upload = multer({ storage });

function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
        fn(req, res, (err) => {
            if (err) reject(err);
            resolve();
        });
    });
}

export  async function POST(req, res) {
        try {
            await runMiddleware(req, res, upload.single("profile_picture"));

            const { userId } = req.cookies.get("userId"); 
            const profilePicture = req.file.buffer; 

            await uploadImage(userId, profilePicture);

            return res.status(200).json({ message: "Profile picture uploaded successfully" });
        } catch (error) {
            console.error("Upload error:", error);
            return res.status(500).json({ error: "File upload or database error" });
        }
    } 

    export const config = {
        api: {
            bodyParser: false,
        },
    };
