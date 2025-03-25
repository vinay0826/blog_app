import { Hono } from 'hono'
import { user_Router } from './routes/userRouter';
import { blogs_Router } from './routes/blogsRouter';
import { cors } from "hono/cors";
const app = new Hono<{Bindings:{
  DATABASE_URL: string
  JWT_SECRET : string
}}>()
app.use(
  cors({
    origin: "*", // Allow all origins
  })
);
app.route('/api/v1/user',user_Router);
app.route('/api/v1/blogs',blogs_Router);
export default app
