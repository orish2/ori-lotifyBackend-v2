const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const { getStations, addStation, updateStation, getStationByGenre, getStationById, getStationsByUser, getGoodDayStations,getHotStations } = require('./station.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', log, getStations)
router.get('/station/:userId', log, getStationsByUser)
router.get('/goodDay', log, getGoodDayStations)
router.get('/hot', log, getHotStations)
router.get('/genre/:stationId', log, getStationByGenre)
router.get('/:stationId', log, getStationById)
router.post('/', log, requireAuth, addStation)
router.put('/', log, updateStation)
// router.post('/', log, requireAuth, addStation)
// router.delete('/:id', requireAuth, deleteReview)

module.exports = router