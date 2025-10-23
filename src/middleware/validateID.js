export default function makeValidateId(plantList) {
  return function validateID(req, res, next) {
    const { id } = req.params;
    const found = plantList.find((plant) => plant.id === parseInt(id));
    if (!id || isNaN(id)) {
      return res.status(400).json({ error: "Invalid plant ID." });
    }
    if (!found) {
      return res.status(404).json({ error: "Plant not found." });
    }
    next();
  };
}
