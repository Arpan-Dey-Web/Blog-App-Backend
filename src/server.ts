import { prisma } from "../prisma/lib/prisma"
import app from "./app";
const port = process.env.PORT || 3000;

async function main() {
    try {
        await prisma.$connect()
        console.log("connected to database sucessful");
        app.listen(port, () => {
            console.log(`server is running on http://localhost:${port} `);
        })

    } catch (error) {
        console.log(error);
        await prisma.$disconnect()
        process.exit(1)
    }
}

main()