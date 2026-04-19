import Product from "../models/products.js";


export const getAllProducts = async (req, res) => {
    try {
        const filter = {}

        if (req.query.brand) {
            filter.brand = req.query.brand;
        }

        const products = await Product.find(filter)

        res.status(200).json({
            success: true,
            count: products.length,
            products,
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