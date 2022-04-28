import { Router } from "express";
import { UserModel } from "models";
import mongoose from "mongoose";

const router = Router();

router.get("/", async (req, res) => {
  res.json(await UserModel.find());
});

router.post("/users", async (req, res) => {
  const existingUsers = await UserModel.find({
    $or: [
      {
        username: req.body.username,
      },
      {
        email: req.body.email,
      },
    ],
  });

  if (existingUsers.length !== 0) {
    res.status(409).send("A user already exists with this username or email");
  } else {
    try {
      res.json(await UserModel.create(req.body));
    } catch (err) {
      res.status(400).json(err);
    }
  }
});

router.get("/users/:id", async (req, res) => {
  try {
    if (mongoose.isValidObjectId(req.params.id)) {
      const user = await UserModel.findById(req.params.id);

      if (user) {
        res.json(user);
        return;
      }
    }

    const user = await UserModel.findOne({
      $or: [
        {
          username: req.params.id,
        },
        {
          email: req.params.id,
        },
      ],
    });

    if (user) {
      res.json(user);
    } else {
      res
        .status(404)
        .send("No user where found with this id, username, or email");
    }
  } catch (err) {
    res.status(500).send("An error occured");
  }
});

export default router;
