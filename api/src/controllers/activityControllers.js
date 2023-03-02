const { Country, Activity } = require('../db.js')

const getActivities = async (req, res) => {
  try {
    const activities = await Activity.findAll()

    res.status(200).json({ activities })
  } catch (error) {
    res.status(500).json({ message: error.message})
  }
}

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

    res.status(201).json({ activity: newActivity })
  } catch (error) {
    console.log(error.message)
    if (!name || !difficulty || !duration || !season)
      res.status(400).json({ message: 'Falta la información necesaria para crear una actividad.' })

    else if (error.message.includes('llave duplicada') || error.message.includes('Validation error'))
      res.status(400).json({ message: `No se puede crear la actividad. Ya existe una con el nombre "${name}"` })
    
    else 
      res.status(500).json({ message: error.message })
  }
}

const deleteActivity = async (req, res) => {
  const { id } = req.params
  const { force } = req.query;

  try {
    await Activity.destroy({
      where: {
        id: id
      },
      force: force
    });

    res.status(200).json({ msg: force ? "Actividad eliminada exitosamente." : "Actividad desactivada exitosamente." })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: error.message })
  }
}

const restoreActivity = async (req, res) => {
  const { id } = req.params

  try {
    await Activity.restore({
      where: { id: id }
    });

    res.status(200).json({ msg: "Actividad restaurada exitosamente." })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  createActivity,
  getActivities,
  deleteActivity,
  restoreActivity
};