import express from "express";
import validateInformations from "../middleware/validateInformations.js";
import makeValidateId from "../middleware/validateID.js";
let plantList = [
  {
    id: 1,
    name: "Monstera",
    origin: "Central/South America",
    water: "Moderate",
    light: "Bright indirect",
    toxic: true,
  },
  {
    id: 2,
    name: "Aloe Vera",
    origin: "Arabian Peninsula",
    water: "Low",
    light: "Bright indirect to direct",
    toxic: false,
  },
];

const validateID = makeValidateId(plantList)

const router = express.Router();
router.use(express.json());

router.get("/", (req, res) => {
  res.json(plantList);
});

router.get("/:id", validateID, (req, res) => {
  const { id } = req.params;
  const numID = Number(id)
  const plant = plantList.find(p => p.id === numID)
  res.json(plant)
});

router.post("/", validateInformations, (req, res) => {
  const { name, origin, water, light, toxic } = req.body;
  const newPlant = {
    id: plantList.length + 1,
    name,
    origin,
    water,
    light,
    toxic,
  };
  plantList.push(newPlant);
  res.status(201).json(newPlant);
});

export default router;
