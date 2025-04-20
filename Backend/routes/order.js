const router = require("express").Router();
const Order = require("../models/order");
const Book = require("../models/book");
const User = require("../models/user");
const { authenticateToken } = require("./userAuth");

router.post("/place-order", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const { order } = req.body;

    for (const orderData of order) {
      const newOrder = new Order({ user: id, book: orderData._id });
      const orderDataFromDb = await newOrder.save();

      await User.findByIdAndUpdate(id, {
        $push: { orders: orderDataFromDb._id },
      });

      //clearing cart
      await User.findByIdAndUpdate(id, {
        $pull: { cart: orderData._id },
      });
    }
    return res.json({
      status: "sucess",
      message: "order placed Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An errir occured" });
  }
});

// get order history of particular user
router.get("/get-order-history", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate({
      path: "orders",
      populate: {
        path: "book",
      },
    });
    const orderData = userData.orders.reverse();
    return res.json({
      status: "success",
      data: orderData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occured" });
  }
});

// get-all-orders --admin
router.get("/get-all-orders", authenticateToken, async (req, res) => {
  try {
    const userData = await Order.find()
      .populate({
        path: "book",
      })
      .populate({ path: "user" })
      .sort({
        createdAt: -1,
      });

    return res.json({
      status: "sucess",
      data: userData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An errir occured" });
  }
});

router.put("/update-status/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // Make sure status is received properly

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    await Order.findByIdAndUpdate(id, { status });

    return res.json({
      status: "success",
      message: "Status updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred" });
  }
});

module.exports = router;
