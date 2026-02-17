import 'dotenv/config'

import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { pagination } from 'prisma-extension-pagination'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL || '' })
const prisma = new PrismaClient({
    adapter,
    omit: {
        user: {
            password: true
        }
    }

}).$extends(pagination({
    pages: {
        limit: 10,
    },
    cursor: { limit: 30 }
}))

export { prisma }
