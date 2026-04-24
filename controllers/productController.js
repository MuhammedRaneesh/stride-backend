import Product from "../models/products.js";


export const getAllProducts = async (req, res) => {
    try {
        const filter = {}

        if (req.query.brand) {
            filter.brand = req.query.brand;
        }

        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 12
        const skip = (page - 1) * limit

        const totalProducts = await Product.countDocuments(filter)
        const products = await Product.find(filter).skip(skip).limit(limit)

        res.status(200).json({
            success: true,
            count: products.length,
            pagination: {
                totalProducts,
                totalPages: Math.ceil(totalProducts / limit),
                currentPage: page,
                limit
            },
            products
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "server error"
        })
    }
}

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "product not found"
            })
        }

        res.status(200).json({
            success: true,
            product
        })

    } catch (error) {

        if (error.name === "CastError") {
            return res.status(400).json({
                success: false,
                message: "Invalid product ID",
            });
        }

        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
}

export const searchProducts = async (req, res) => {
    try {
        const { keyword, page, limit } = req.query;

        if (!keyword) {
            return res.status(200).json(
                {
                    success: true,
                    product: [],
                    message: "no matches found"
                })
        }

        const Page = parseInt(page) || 1;
        const Limit = parseInt(limit) || 12;
        const Skip = (Page - 1) * Limit;

        const filter = {
            $or: [
                { name: { $regex: keyword, $options: "i" } },
                { brand: { $regex: keyword, $options: "i" } },
                { category: { $regex: keyword, $options: "i" } }
            ]
        };

        const totalProducts = await Product.countDocuments(filter)
        const products = await Product.find(filter).skip(Skip).limit(Limit)

        res.status(200).json({
            success: true,
            count: products.length,
            pagination: {
                totalProducts,
                totalPages: Math.ceil(totalProducts / Limit),
                currentPage: Page
            },
            products
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "server error"
        })
    }
}