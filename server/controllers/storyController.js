import { getDB } from "../config/db.js";
import { ObjectId } from "mongodb";

// ===== Get All Stories =====
export const getStories = async (req, res) => {
  const db = getDB();
  const stories = await db
    .collection("stories")
    .aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $project: {
          userId: { $toString: "$userId" },
          title: 1,
          excerpt: 1,
          image: 1,
          location: 1,
          createdAt: 1,
          "user.name": 1,
          "user.avatar": 1,
          likes: 1,
          likesCount: { $size: { $ifNull: ["$likes", []] } },
        },
      },
    ])
    .toArray();

  res.json(stories);
};

// ===== Create Story =====
export const createStory = async (req, res) => {
  const db = getDB();
  const { title, excerpt, image, location } = req.body;

  const story = {
    userId: new ObjectId(req.user._id),
    title,
    excerpt,
    image,
    location,
    likes: [],
    createdAt: new Date(),
  };

  const result = await db.collection("stories").insertOne(story);
  res.status(201).json(result);
};

// ===== Toggle Like =====
export const toggleLike = async (req, res) => {
  const db = getDB();
  const storyId = req.params.id;
  const userId = new ObjectId(req.user._id);
  const storyObjectId = new ObjectId(storyId);

  const existing = await db.collection('stories').findOne({ _id: storyObjectId, likes: userId });
  let update;
  if (existing) {
    update = { $pull: { likes: userId } };
  } else {
    update = { $addToSet: { likes: userId } };
  }
  await db.collection('stories').updateOne({ _id: storyObjectId }, update);
  const updated = await db.collection('stories').findOne({ _id: storyObjectId });
  res.json({ likesCount: (updated.likes || []).length, liked: (updated.likes || []).some((id) => id.equals(userId)) });
};
