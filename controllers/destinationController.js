'use strict'

const { Destination } = require('../models')

class DestinationController {
    static async ShowAllDestinations(req, res, next) {
        try {
            const destinationList = await Destination.findAll()

            res.status(200).json({
                statusCode: 200,
                data: destinationList,
            })
        } catch (err) {
            next(err)
        }
    }

    static async DestinationDetail(req, res, next) {
        try {
            const id = +req.params.id
            const destinationDetail = await Destination.findByPk(id)

            if (destinationDetail === null) {
                throw new Error(`Destination not found`)
            }

            res.status(200).json({
                statusCode: 200,
                data: destinationDetail
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = DestinationController