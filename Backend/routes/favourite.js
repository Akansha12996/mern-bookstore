const router = require("express").Router();
const User = require("../models/user");
const { authenticateToken } = require("./userAuth");

router.put("/add-book-to-favourite", authenticateToken, async (req, res) => {
  try {
    const { bookid, id } = req.headers;
    const userData = await User.findById(id);
    const isBookFavourite = userData.favourites.includes(bookid);
    if (isBookFavourite) {
      return res.status(200).json({ message: "book is already in favourite" });
    }
    await User.findByIdAndUpdate(id, {
      $push: {
        favourites: bookid,
      },
    });

    return res.status(200).json({ message: "book added favourites" });
  } catch (error) {
    res.status(500).json({ message: "Internal server" });
  }
});

router.put(
  "/remove-book-from-favourite",
  authenticateToken,
  async (req, res) => {
    console.log(req.headers);
    try {
      const { bookid, id } = req.headers;
      const userData = await User.findById(id);
      const isBookFavourite = userData.favourites.includes(bookid);
      if (isBookFavourite) {
        await User.findByIdAndUpdate(id, {
          $pull: {
            favourites: bookid,
          },
        });
      }
      return res.status(200).json({ message: "book removed from favourites" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

//get favourite book for particular user
router.get("/get-favourite-books", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate("favourites");
    const favouritesBooks = userData.favourites;

    return res.json({
      status: "Success",
      data: favouritesBooks,
    });
  } catch (error) {
    res.status(500).json({ message: "An error occured" });
  }
});

module.exports = router;
