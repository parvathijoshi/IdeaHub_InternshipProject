import express from 'express';
import { sequelize } from '../config/db.js';

const router = express.Router();

router.get('/categories', async (req, res) => {
  try {
    const categories = await sequelize.query(
      'SELECT * FROM public."Categories"',
      { type: sequelize.QueryTypes.SELECT }
    );
    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: error.message });
  }
});

router.get('/categories/:categoryID', async (req, res) => {
  try {
    const { categoryID } = req.params;
    const ideas = await sequelize.query(
      `
      SELECT 
        "Ideas".id, 
        "Ideas".title, 
        "Ideas".description, 
        "Ideas"."createdAt", 
        "Ideas".likes, 
        "Users".username
      FROM public."Ideas"
      INNER JOIN public."Users" 
        ON "Ideas"."createdBy" = "Users".id
      INNER JOIN public."IdeasWithTags" 
        ON "IdeasWithTags"."ideaId" = "Ideas".id
      WHERE "IdeasWithTags"."categoryId" = :categoryID
      `,
      {
        type: sequelize.QueryTypes.SELECT,
        replacements: { categoryID },
      }
    );

    res.json(ideas);
  } catch (error) {
    console.error("Error fetching ideas:", error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
