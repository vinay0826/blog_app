import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import * as bcrypt from 'bcryptjs'
import { decode, sign, verify } from 'hono/jwt';
export const user_Router = new Hono<{Bindings:{
  DATABASE_URL: string
  JWT_SECRET : string
}}>() 
user_Router.post('/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  const body = await c.req.json<{email: string; password: string; name: string}>();
  if (!body.name || !body.email || !body.password) {
    return c.text('Enter all the fields', 400); // Proper status code for bad request
  }
  try{
    //hasing the password for secure storage in the db
    function hasingp(Password:string):Promise<string>{
      const salt_rounds = 10;
      return bcrypt.hash(Password,salt_rounds);
    }
    const Hashed_password = await hasingp(body.password);
    //creating a new user
    const user =await prisma.user.create({
      data:{
        email:body.email,
        password:Hashed_password,
        name:body.name
      },
    })
  
    return c.json(user);
  }catch(error){
    return c.json({error:error})}
  
})
//signing
user_Router.post('/signin',async (c)=>{
  const prisma = new PrismaClient({
    datasourceUrl : c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  const body = await c.req.json<{email:string,password:string}>();
  if(!body.email || !body.password){
    return c.text('enter all the feilds',400);
  }
  console.log(body)
  const user = await prisma.user.findUnique({
    where:{
      email:body.email
    }
  })
  if(!user?.password || !user.email){
    return c.text("no user found")
  }
  const isMatch = await bcrypt.compare(body.password,user.password);
  if(isMatch){
    const payload ={
      sub : user.id.toString(),
      role : "user"
    }
    console.log(payload);
    const jwt_token = await sign(payload,c.env.JWT_SECRET);
    return c.json({jwt_token});
  }else{
    return c.json({failed:'login password icorrect'})
  }

})