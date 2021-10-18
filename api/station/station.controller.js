const logger = require('../../services/logger.service')
const userService = require('../user/user.service')
const socketService = require('../../services/socket.service')
const stationService = require('./station.service')

async function getStations(req, res) {
    try {
        var queryParams = req.query;
        const stations = await stationService.query(queryParams)
        res.send(stations)

    } catch (err) {
        logger.error('Cannot get stations', err)
        res.status(500).send({ err: 'Failed to get stations' })
    }
}

async function getGoodDayStations(req, res) {
    try {
        const stations = await stationService.getGoodDay()
        res.send(stations)

    } catch (err) {
        logger.error('Cannot get stations', err)
        res.status(500).send({ err: 'Failed to get stations' })
    }
}

async function getHotStations(req, res) {
    try {
        const stations = await stationService.getHotStations()
        res.send(stations)

    } catch (err) {
        logger.error('Cannot get stations', err)
        res.status(500).send({ err: 'Failed to get stations' })
    }
}

async function getStationById(req, res) {
    try {
        const { stationId } = req.params
        let station
        if (stationId.length < 24) {
            station = await stationService.getByGenre(stationId)
        } else {
            station = await stationService.getById(req.params.stationId)
        }

        res.send(station)
    } catch (err) {
        logger.error('Failed to get station', err)
        res.status(500).send({ err: 'Failed to get station' })
    }
}

async function getStationByGenre(req, res) {
    try {
        const station = await stationService.getByGenre(req.params.stationId)
        res.send(station)
    } catch (err) {
        logger.error('Failed to get station', err)
        res.status(500).send({ err: 'Failed to get station' })
    }
}

// here!
async function getStationsByUser(req, res) {
    try {
        const userId = req.params.userId
        let stations = await stationService.getByUser(userId)
        // stations = stations.filter((station) => station)
        res.send(stations)
    } catch (err) {
        logger.error('Failed to get station', err)
        res.status(500).send({ err: 'Failed to get station' })
    }
}


async function addStation(req, res) {
    try {
        console.log(req.session);
        const user = req.session.user
        var station = req.body
        station = await stationService.add(station, user)
        res.send(station)

    } catch (err) {
        console.log(err)
        logger.error('Failed to add station', err)
        res.status(500).send({ err: 'Failed to add station' })
    }
}


async function updateStation(req, res) {
    try {
        var station = req.body;
        station = await stationService.update(station)
        res.send(station)
    } catch (err) {
        logger.error('Failed to get station', err)
        res.status(500).send({ err: 'Failed to get station' })
    }
}


async function deleteStation(req, res) {
    try {
        await stationService.remove(req.params.id)
        res.send({ msg: 'Deleted successfully' })
    } catch (err) {
        logger.error('Failed to delete station', err)
        res.status(500).send({ err: 'Failed to delete station' })
    }
}






module.exports = {
    getStations,
    deleteStation,
    addStation,
    getStationById,
    getStationByGenre,
    getStationsByUser,
    updateStation,
    getGoodDayStations,
    getHotStations
}