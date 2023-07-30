import Post from "../models/post.schema.js";
import boom from "@hapi/boom";
import fs from "fs-extra";
import path from "path";
const __dirname = new URL('../..', import.meta.url).pathname;

export const getPosts = async (req, res, next) => {
    try {
        const posts = await Post.find();
        res.send(posts);
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};

export const getOnePost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) throw boom.notFound('Post not found');
        return res.send(post);
    } catch (err) {
        next(err);
    }
};

export const createPost = async (req, res, next) => {
    try {
        const { title, description } = req.body;
        let filename;
        if(req.file?.filename){
            filename = req.file.filename;
        }
        const post = new Post({ title, description, filename});
        await post.save().catch((err) => {
            throw boom.badRequest(err.message);
        });
        res.json(post);
    } catch (err) {
        next(err);
    }
};

export const updatePost = async (req, res, next) => {
    try {
        const { title, description } = req.body;
        let filename;
        if(req.file?.filename){
            filename = req.file.filename;
            const post = await Post.findById(req.params.id);
            if(post.filename){
                const imagePath = path.join(__dirname,'upload',post.filename);
                await fs.remove(imagePath);
            }
        }
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, { title, description, filename}, {
            new: true,
        }).catch((err) => {
            throw boom.badRequest(err.message);
        });
        if (!updatedPost) throw boom.notFound('Post not found');
        res.send(updatedPost);
    } catch (err) {
        next(err);
    }
};

export const deletePost = async (req, res, next) => {
    try {
        const postRemoved = await Post.findByIdAndDelete(req.params.id);
        if (!postRemoved) throw boom.notFound('Post not found');
        if(postRemoved.filename){
            const imagePath = path.join(__dirname,'upload',postRemoved.filename);
            await fs.remove(imagePath);
        }
        return res.sendStatus(204);
    } catch (err) {
        next(err);
    }
};
