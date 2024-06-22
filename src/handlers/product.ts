import { Request, Response } from "express";
import Product from "../models/Product.model";

export const getProducts = async (req: Request, res: Response) => {
    const products = await Product.findAll({
        order: [
            ['id', 'DESC']
        ]
    })
    res.json({ data: products })
};
export const getProductById = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id)

    if (!product) {
        return res.status(404).json({ error: 'Product not found' })
    }

    res.json({ data: product })
};
export const createProduct = async (req: Request, res: Response) => {
    const product = await Product.create(req.body);
    res.status(201).json({ data: product });
};
export const updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params
    // find product and throw if the product not exist
    const product = await Product.findByPk(id)
    if (!product) {
        return res.status(404).json({ error: 'Product not found' })
    }
    //update product
    await product.update(req.body)
    await product.save()
    res.json({ data: product });
}
export const updateAvailability = async (req: Request, res: Response) => {
    // find product and throw if the product not exist
    const { id } = req.params
    const product = await Product.findByPk(id)
    if (!product) {
        return res.status(404).json({ error: 'Product not found' })
    }
    //update availability product
    product.availability = !product.dataValues.availability
    await product.save()
    res.json({ data: product });
};
export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id)
    if (!product) {
        return res.status(404).json({ error: 'Product not found' })
    }
    //delete product
    await product.destroy()
    res.json({ data: 'product deleted successfully' });
}
