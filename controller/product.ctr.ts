import { Request, Response } from "express";
import { Product } from "../models/product.model";

export const getProducts = async (req: Request, res: Response) => {
    const products = await Product.find();
    res.json(products);
};

export const addProduct = async (req: Request, res: Response) => {
    const newProduct = await Product.create(req.body);
    res.json(newProduct);
};