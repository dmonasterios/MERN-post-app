import {Router} from 'express';
import {getPosts, getOnePost, createPost, updatePost, deletePost} from '../controllers/post.controllers.js';
import upload from '../libs/multer.js';
import { verifyID } from '../middlewares/index.js';
const router = Router();

router.get('/posts', getPosts);

router.get('/posts/:id',verifyID,getOnePost);

router.post('/posts/',upload.single('image'), createPost);

router.put('/posts/:id',verifyID,upload.single('image'),updatePost);

router.delete('/posts/:id',verifyID,deletePost);



export default router;