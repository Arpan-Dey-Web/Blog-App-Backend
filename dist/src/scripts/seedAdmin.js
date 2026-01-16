import { prisma } from "../lib/prisma";
import { UserRole } from "../middleware/auth";
async function seedAdmin() {
    try {
        console.log("admin seeding started");
        const adminData = {
            name: "Admin Shaheb",
            email: "admin10@admin.com",
            role: UserRole.ADMIN,
            password: "admin1234",
            emailVerified: true
        };
        console.log('checking admin exists or not ');
        // Check user already exist ??
        const existingUser = await prisma.user.findUnique({
            where: {
                email: adminData.email
            }
        });
        if (existingUser) {
            throw new Error("User already exists!!");
        }
        console.log("signup admin ");
        const signUpAdmin = await fetch("http://localhost:3000/api/auth/sign-up/email", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                origin: "http://localhost:3000"
            },
            body: JSON.stringify(adminData)
        });
        console.log(signUpAdmin);
        // email verified false
        console.log("admin email verified");
        if (signUpAdmin.ok) {
            await prisma.user.update({
                where: {
                    email: adminData.email
                },
                data: {
                    emailVerified: true
                }
            });
        }
        console.log("email verified true");
    }
    catch (error) {
        console.log(error);
    }
}
seedAdmin();
//# sourceMappingURL=seedAdmin.js.map