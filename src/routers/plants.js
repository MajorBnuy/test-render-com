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

router.put("/:id", validateID, validateInformations, (req, res) => {
  const { id } = req.params;
  const numID = Number(id)
  const { name, origin, water, light, toxic } = req.body;
  const plantIndex = plantList.findIndex(p => p.id === numID)

  const updatedPlant = {
    id: numID,
    name,
    origin,
    water,
    light,
    toxic,
  };

  plantList[plantIndex] = updatedPlant;
  res.json(updatedPlant);
});

router.patch("/:id", validateID, (req, res) => {
  const { id } = req.params;
  const numID = Number(id)
  const plantIndex = plantList.findIndex(p => p.id === numID)

  const existingPlant = plantList[plantIndex];
  const updatedData = req.body;

  const updatedPlant = {
    ...existingPlant,
    ...updatedData,
    id: numID,
  };

  plantList[plantIndex] = updatedPlant;
  res.json(updatedPlant);
});

router.delete("/:id", validateID, (req, res) => {
  const { id } = req.params;
  const numID = Number(id)
  plantList = plantList.filter(p => p.id !== numID)
  res.status(204).send();
});

export default router;
