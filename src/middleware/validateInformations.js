export default function validateInformations(req, res, next) {
   const {name, origin, water, light, toxic} = req.body
   if(!name || !origin || !water || !light || toxic === undefined){
    return res.status(400).json({error: "Missing required plant information."})
   }
   next()
}