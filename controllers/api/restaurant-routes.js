const router = require("express").Router();
const { Restaurant, Cuisine, User } = require("../../models");
// middleware import
const withAuth = require("../../utils/auth");

// GET restaurants
// not currently in use
router.get("/", (req, res) => {
  Restaurant.findAll({
    attributes: ["id", "name", "cuisine", "location", "rating", "notes"],
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
      attributes: ["id", "name", "cuisine", "rating", "location", "notes"],
      // include: [
      //   {
      //     model: Cuisine,
      //     attributes: ["id", "name", "cuisine-image"],
      //   },
      // ],
    });

    const restaurant = dbRestaurantData.get({ plain: true });

    // add boolean values for displaying ratings
    if (restaurant.rating === 0) {
      restaurant.ratingCheck = false;
    } else {
      restaurant.ratingCheck = true;
    }

    if (restaurant.rating === 1) {
      restaurant.rating1 = true;
    } else {
      restaurant.rating1 = false;
    }

    if (restaurant.rating === 2) {
      restaurant.rating2 = true;
    } else {
      restaurant.rating2 = false;
    }

    if (restaurant.rating === 3) {
      restaurant.rating3 = true;
    } else {
      restaurant.rating3 = false;
    }

    if (restaurant.cuisine === 1) {
      restaurant.cuisine_name = "Asian";
    } else if (restaurant.cuisine === 2) {
      restaurant.cuisine_name = "American";
    } else if (restaurant.cuisine === 3) {
      restaurant.cuisine_name = "Indian";
    } else if (restaurant.cuisine === 4) {
      restaurant.cuisine_name = "Mexican";
    } else if (restaurant.cuisine === 5) {
      restaurant.cuisine_name = "Italian";
    } else {
      restaurant.cuisine_name = "Other";
    }

    res.render("view-restaurant", {
      restaurant,
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
    attributes: ["name", "cuisine", "rating", "location", "notes", "user_id"],
    // include: [
    // {
    //   model: Cuisine,
    //   attributes: ["id", "name", "cuisine_image"],
    // },
    // {
    //   model: User,
    //   attributes: ["username"],
    // }
    // ],
  })
    .then((dbRestaurantData) => {
      if (!dbRestaurantData) {
        res.status(404).json({ message: "No restaurant found with this id" });
        return;
      } else {
        // serialize data
        let restaurant = dbRestaurantData.get({ plain: true });

        // add boolean values for displaying ratings
        // restaurant.rating1 = false;
        // restaurant.rating2 = false;
        // restaurant.rating3 = false;

        if (restaurant.rating === 0) {
          restaurant.ratingCheck = false;
        } else {
          restaurant.ratingCheck = true;
        }

        if (restaurant.rating === 1) {
          restaurant.rating1 = true;
        } else {
          restaurant.rating1 = false;
        }

        if (restaurant.rating === 2) {
          restaurant.rating2 = true;
        } else {
          restaurant.rating2 = false;
        }

        if (restaurant.rating === 3) {
          restaurant.rating3 = true;
        } else {
          restaurant.rating3 = false;
        }

        // add boolean values for displaying cuisine
        if (restaurant.cuisine === 1) {
          restaurant.cuisine1 = true;
        } else {
          restaurant.cuisine1 = false;
        }

        if (restaurant.cuisine === 2) {
          restaurant.cuisine2 = true;
        } else {
          restaurant.cuisine2 = false;
        }

        if (restaurant.cuisine === 3) {
          restaurant.cuisine3 = true;
        } else {
          restaurant.cuisine3 = false;
        }

        if (restaurant.cuisine === 4) {
          restaurant.cuisine4 = true;
        } else {
          restaurant.cuisine4 = false;
        }

        if (restaurant.cuisine === 5) {
          restaurant.cuisine5 = true;
        } else {
          restaurant.cuisine5 = false;
        }

        if (restaurant.cuisine === 6) {
          restaurant.cuisine6 = true;
        } else {
          restaurant.cuisine6 = false;
        }

        // pass on restaurant object
        return restaurant;
      }
    })
    .then((restaurant) => {
      res.render("edit-restaurant", { restaurant });
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
    cuisine: req.body.cuisine,
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
      cuisine: req.body.cuisine,
      location: req.body.location,
      rating: req.body.rating,
      notes: req.body.notes,
      user_id: req.session.user_id,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedRestaurant) => {
      res.json(updatedRestaurant);
    })
    .then(
      res.render("homepage", {
        restaurants,
        loggedIn: req.session.loggedIn,
        user_id: req.session.user_id,
      })
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
