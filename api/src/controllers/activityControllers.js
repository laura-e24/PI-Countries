const { Country, Activity } = require('../db.js')

const createActivity = async (req, res) => {

  const { name, difficulty, duration, season, countries } = req.body

  try {
    const newActivity = await Activity.create({
      name,
      difficulty,
      duration,
      season         
    });

    if (countries && countries.length) {
      countries.forEach(async (c) => {
        const country = await Country.findByPk(c.id)
        await country?.addActivity(newActivity);
      })
    } else await Country.addActivity(newActivity);

    res.json(newActivity)
  } catch (error) {
    if (!name || !difficulty || !duration || !season)
      throw new Error(`Error 400, falta la información necesaria para crear una actividad.`)

    if (error.message.includes('llave duplicada'))
      throw new Error(`No se puede crear la actividad. Ya existe una con el nombre "${name}"`)
    
    else 
      throw new Error(error)
  }
}

module.exports = {
  createActivity
};