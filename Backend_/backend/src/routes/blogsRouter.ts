import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { jwt,decode, sign, verify } from 'hono/jwt';
export const blogs_Router = new Hono<{Bindings:{
  DATABASE_URL: string
  JWT_SECRET : string
},Variables : {
    userId : string
}
}>()
blogs_Router.use('*',async(c,next)=>{
    const token = c.req.header("Authorization") || ""
    if (!token) {
        return c.json({ error: 'No token provided' }, 401);
      }
    try{
        const payload =await verify(token,c.env.JWT_SECRET);
    const UserId = String(payload.sub);
    if (!UserId) {
        return c.json({ error: 'Invalid token: No user ID found' }, 401);
      }
      c.set('userId', UserId)
      await next();
    }catch(error){
          return c.json({ error: 'Internal server error' }, 500);
    }
}) 
blogs_Router.post('/add_blog',async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())
      const body =await c.req.json<{title:string,content:string}>();
      const id_ = c.get('userId');
      console.log(id_);
      try{
        const blog = await prisma.post.create({
        data :{
            title : body.title,
            content : body.content,
            authorid : id_
        }
      })
      return c.json(blog);
    }
    catch(error){
        return c.json({error});
    }
  })


blogs_Router.put('/update_blog',async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())
      const body =await c.req.json<{id:string,title:string,content:string}>();
      try{
        const blog = await prisma.post.update({
            where : {
                id : body.id
            },data:{
                title : body.title,
                content : body.content
            }
            
      })
      return c.json({message:'updated blog'});
    }
    catch(error){
        return c.json({error});
    }
  })
blogs_Router.get('/blog/:id',async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())
      const id = c.req.param("id")
      console.log(id);
      const blog = await prisma.post.findFirst({
        where :{
            id:id
        }
      })
      console.log(blog);
      return c.json({blog})
  })


blogs_Router.get('/bulk',async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())
      const blog = await prisma.post.findMany();
    return c.json({blog});
  })