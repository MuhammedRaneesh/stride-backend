
import Order from "../../models/order.js";
import Product from "../../models/products.js";
import User from "../../models/User.js";

export const getAdminDashboard = async (req, res) => {
    try {

        const revenueResult = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: "$totalPrice" },
                },
            },
        ]);


        const activeUsers = await User.countDocuments({
            role: "user",
            isDeleted: false,
            isBlocked: false,
        });

        const totalProducts = await Product.countDocuments({
            isDeleted: false,
        });

        const orders = await Order.countDocuments();

        res.status(200).json({
            success: true,
            dashboard: {
                totalRevenue,
                activeUsers,
                totalProducts,
                orders,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};
