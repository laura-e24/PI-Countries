const { Country, Activity } = require('../db.js')

const getActivities = async (req, res) => {
  try {
    const activities = await Activity.findAll({
      include: {
        model: Country,
        through: { attributes: [] },
        as: "countries"
      },
      attributes: { exclude: [ "createdAt", "updatedAt" ] },
      paranoid: false
    })
    res.status(200).json({ activities })
  } catch (error) {
    res.status(500).json({ message: error.message})
  }
}

const getOneActivity = async (req, res) => {
  const { activityId } = req.params;

  try {
    const activity = await Activity.findOne({
      where: { id: activityId },
      include: {
        model: Country,
        through: { attributes: [] },
        as: "countries"
      },
      attributes: { exclude: [ "createdAt", "deletedAt", "updatedAt" ] }
    });

    res.status(200).json(activity)
  } catch (error) {
    res.status(500).json({ mesage: error.message })
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
  const { activityId } = req.params
  const { force } = req.query;

  try {
    await Activity.destroy({
      where: { id: activityId },
      force: !!force
    })

    const newData = await Activity.findAll({ paranoid: false });

    res.status(200).json({ 
      msg: !!force 
      ? "Actividad eliminada exitosamente." 
      : "Actividad deshabilitada exitosamente.", 
      data: newData 
    })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: error.message })
  }
}

const restoreActivity = async (req, res) => {
  const { activityId } = req.params

  try {
    await Activity.restore({
      where: { id: activityId }
    });

    const newData = await Activity.findAll({ paranoid: false });

    res.status(200).json({ 
      msg: "Actividad restaurada exitosamente.",
      data: newData
    })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: error.message })
  }
}

const updateActivity = async (req, res) => {
  const { activityId } = req.params
  const { name, difficulty, duration, season, countries } = req.body

  try {
    const ids = countries.map(c => c.id)
    const activity = await Activity.update({
      name,
      difficulty,
      duration,
      season,
      countries
    }, {
      returning: true,
      where: { id: activityId },
      include: {
        model: Country,
        through: { attributes: [] }
      }
    });

// const act = await Activity.findOne({ where: { id: activityId } })
// const countriesAct = await act?.getCountries()
// const findCountry = countriesAct.find(co => ids.includes(co.id))

// if (!!findCountry) await act?.setCountries(countries)
  
    countries.forEach(async (c) => {
      const country = await Country.findByPk(c.id)
      const countryActivities = await country?.getActivities()
      const findActivity = countryActivities.find(act => act.id === activityId)
      
      if (!findActivity) await country?.addActivity(activity[1])
    })
  

    res.status(200).json({ name, difficulty, duration, season, countries })
  } catch (error) {
    console.log(error.message)
    if (!name || !difficulty || !duration || !season)
      res.status(400).json({ message: 'Falta la información necesaria para actualizar la actividad.' })
    
    else 
      res.status(500).json({ message: error.message })
  }
}

module.exports = {
  createActivity,
  getActivities,
  getOneActivity,
  deleteActivity,
  restoreActivity,
  updateActivity
};