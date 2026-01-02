const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function makeAdmin() {
    // Replace with your email
    const email = "ashleyimmanuel31@gmail.com";

    try {
        const user = await prisma.user.update({
            where: { email: email },
            data: { isAdmin: true }
        });
        console.log(`Successfully made ${user.email} an Admin!`);
    } catch (e) {
        console.error("Error updating user:", e);
    } finally {
        await prisma.$disconnect();
    }
}

makeAdmin();
