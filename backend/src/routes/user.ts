import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt'
import {signupInput, signinInput} from '@kadm/medium-common'

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string,

    }
}>();


userRouter.post('/signup', async (c) => {
    const body = await c.req.json();
    const {success} = signupInput.safeParse(body);
    
    if(!success){
        return c.json({err: 'Inputs are not correct'}, 411);
    }

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try {
        const user = await prisma.user.create({
            data: {
                email: body.email,
                password: body.password,
                name: body.name
            }
        })
        const token = await sign({ id: user.id }, c.env.JWT_SECRET);
        return c.json({ token, name: user.name});
    } catch (err) {
        return c.json({ err }, 403);
    }
})


userRouter.post('/signin', async (c) => {
    const body = await c.req.json();
    const {success} = signinInput.safeParse(body);
    if(!success){
        return c.json({err: 'Inputs are not correct'}, 411);
    }

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const user = await prisma.user.findUnique({
        where: {
            email: body.email,
            password: body.password
        }
    })
    if (!user) {
        return c.json({ err: 'Incorrect Credentials' }, 403);
    }
    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ token , name: user.name});
})