import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt'
import { createBlogInput, updateBlogInput } from '@kadm/medium-common'

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string,
    },
    Variables: {
        userId: string,
    }
}>();

blogRouter.use('/*', async (c, next) => {
    const header = c.req.header('Authorization') || "";
    if (!header) {
        return c.json({ err: 'Unauthorised' }, 401);
    }
    const token = header.split(' ')[1];
    const decodedToken = await verify(token, c.env.JWT_SECRET);
    if (decodedToken) {
        //@ts-ignore
        c.set('userId', decodedToken.id);
        await next();
    } else {
        return c.json({ err: 'Incorrect Credentials' }, 401);
    }
})

blogRouter.post('/', async (c) => {
    const body = await c.req.json();
    const { success } = createBlogInput.safeParse(body);
    if (!success) {
        return c.json({ err: 'Inputs are not correct' }, 411);
    }
    //@ts-ignore
    const userId = c.get('userId');
    console.log(userId);
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const blog = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            published: body.published,
            //@ts-ignore
            authorId: userId
        }
    })
    return c.json({ id: blog.id });
})

blogRouter.put('/', async (c) => {
    const body = await c.req.json();
    const { success } = updateBlogInput.safeParse(body);
    if (!success) {
        return c.json({ err: 'Inputs are not correct' }, 411);
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    // @ts-ignore
    const userId = c.get('userId');

    await prisma.post.update({
        where: {
            id: body.id,
            //@ts-ignore
            authorId: userId
        },
        data: {
            content: body.content,
            title: body.title,
        }
    })

    return c.text('update post');
})
blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {

        const blogs = await prisma.post.findMany({
            select: {
                content: true,
                title: true,
                published: true,
                id: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        });
        return c.json({ blogs: blogs });
    } catch (err) {
        return c.json({ err });
    }
})
blogRouter.get('/:id', async (c) => {
    const id = c.req.param('id');
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try {
        const blog = await prisma.post.findUnique({
            where: {
                id: id,
            },
            select: {
                title: true,
                content: true,
                id: true,
                author: {
                    select: {
                        name: true,
                    }
                }
            }
        })
        return c.json({ blog });
    } catch (err) {
        return c.json({ err: 'Error while fetching blogs' }, 411);
    }
})


