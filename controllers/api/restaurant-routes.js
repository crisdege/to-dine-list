const router = require("express").Router();
const { Restaurant, Cuisine, User } = require("../../models");
// middleware import
const withAuth = require("../../utils/auth");

// GET restaurants
// not currently in use
router.get("/", (req, res) => {
  Restaurant.findAll({
    attributes: ["id", "name", "cuisine_id", "location", "rating", "notes"],
    include: [
      {
        model: Cuisine,
        attributes: ["id", "name"],
      },
    ],
  })
    .then((dbRestaurantData) => res.json(dbRestaurantData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET one restaurant for view restauant page
router.get("/:id", withAuth, async (req, res) => {
  try {
    const dbRestaurantData = await Restaurant.findOne({
      where: { id: req.params.id },
      attributes: ["name", "cuisine_id", "rating", "location", "notes"],
      include: [
        {
          model: Cuisine,
          attributes: ["id", "name", "cuisine-image"],
        },
      ],
    });

    const restaurant = dbRestaurantData.get({ plain: true });

    // add boolean values for displaying ratings
    restaurant.rating1 = false;
    restaurant.rating2 = false;
    restaurant.rating3 = false;

    if (restaurant.rating === 0) {
      restaurant.ratingCheck = false;
    } else {
      restaurant.ratingCheck = true;

      if (restaurant.rating === 1) {
        restaurant.rating1 = true;
      } else if (restaurant.rating === 2) {
        restaurant.rating2 = true;
      } else {
        restaurant.rating3 = true;
      }
    }

    // add code for selecting correct image

    res.render("view-restaurant", {
      restaurant,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one restaurant for edit restaurant page
router.get("/edit/:id", withAuth, async (req, res) => {
  const dbRestaurantData = await Restaurant.findOne({
    where: { id: req.params.id },
    attributes: ["name", "cuisine_id", "rating", "location", "notes"],
    include: [
      {
        model: Cuisine,
        attributes: ["id", "name", "cuisine_image"],
      },
      // {
      //   model: User,
      //   attributes: ["username"],
      // }
    ],
  })
    .then((dbRestaurantData) => {
      if (!dbRestaurantData) {
        res.status(404).json({ message: "No restaurant found with this id" });
        return;
      } else {
        let restaurant = dbRestaurantData;

        // add boolean values for displaying ratings
        restaurant.rating1 = false;
        restaurant.rating2 = false;
        restaurant.rating3 = false;

        if (restaurant.rating === 0) {
          restaurant.ratingCheck = false;
        } else {
          restaurant.ratingCheck = true;

          if (restaurant.rating === 1) {
            restaurant.rating1 = true;
          } else if (restaurant.rating === 2) {
            restaurant.rating2 = true;
          } else {
            restaurant.rating3 = true;
          }
        }

        // add boolean values for displaying cuisine
        if (restaurant.cuisine_id === 1) {
          restaurant.cuisine1 = true;
        } else {
          restaurant.cuisine1 = false;
        }

        if (restaurant.cuisine_id === 2) {
          restaurant.cuisine2 = true;
        } else {
          restaurant.cuisine2 = false;
        }

        if (restaurant.cuisine_id === 3) {
          restaurant.cuisine3 = true;
        } else {
          restaurant.cuisine3 = false;
        }

        if (restaurant.cuisine_id === 4) {
          restaurant.cuisine4 = true;
        } else {
          restaurant.cuisine4 = false;
        }

        if (restaurant.cuisine_id === 5) {
          restaurant.cuisine5 = true;
        } else {
          restaurant.cuisine5 = false;
        }

        if (restaurant.cuisine_id === 6) {
          restaurant.cuisine6 = true;
        } else {
          restaurant.cuisine6 = false;
        }

        res.render("edit-restaurant", {
          restaurant,
          loggedIn: req.session.loggedIn,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/images", (req, res) => {
  try {
    const dbImageData = Restaurant.findByPk(req.params.id, {
      include: [
        {
          model: Cuisine,
          attributes: ["id", "name", "cuisine_image"],
        },
      ],
    });

    const image = dbImageData.get({ plain: true });
    res.render("cuisine", { image, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// POST or create new restaurant card
router.post("/", withAuth, async (req, res) => {
  console.log("creating restaurant");

  Restaurant.create({
    name: req.body.name,
    cuisine: req.body.cuisine_id,
    location: req.body.location,
    rating: req.body.rating,
    notes: req.body.notes,
    user_id: req.session.user_id,
  })
    .then((dbRestaurantData) => {
      res.json(dbRestaurantData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// PUT or edit a restaurant card
router.put("/:id", withAuth, (req, res) => {
  Restaurant.update(
    {
      name: req.body.name,
      cuisine: req.body.cuisine_id,
      location: req.body.location,
      rating: req.body.rating,
      notes: req.body.notes,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbRestaurantData) => {
      if (!dbRestaurantData) {
        res.status(404).json({ message: "No restaurant found with this id" });
        return;
      }
      res.json(dbRestaurantData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
