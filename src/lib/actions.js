import db from "./db";

export async function getUserByEmail(email) {
    const [users] = await db.execute(
        "select * from users where email = ?",
        [email]
    )

    if (!users.length) return null 

    return users[0]
}