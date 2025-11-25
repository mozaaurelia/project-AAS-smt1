import { getUserByEmail } from "@/lib/actions"
import { compareSync } from "bcryptjs"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const authOptions = {
    pages: {
        signIn: "/login"
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials, req) {
                const email = credentials.email
                const password = credentials.password

                const user = await getUserByEmail(email)

                if (!user) return null

                const isValid = compareSync(password, user.password)

                if (!isValid) return null

                return {
                    name: user.nama,
                    email: user.email,
                    role: user.role,
                    id: user.id,
                    kelas: user.kelas,
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.name = user.name
                token.role = user.role
                token.kelas = user.kelas
                token.email = user.email
            }

            return token
        },
        async session({ session, token, user }) {
            session.user.id = token.id
            session.user.name = token.name
            session.user.email = token.email
            session.user.kelas = token.kelas
            session.user.role = token.role

            return session
        }
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }