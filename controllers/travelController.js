'use strict'

const { Destination, Region } = require("../models/index");

class TravelController {

    //! GET ALL DESTINATION DATA
    static async getTravel(req, res, next) {
        try {
            const allTravelsData = await Destination.findAll({
                include: {
                    model: Region,
                }
            })

            res.status(200).json({
                statusCode: 200,
                message: 'Successfully Access',
                allTravelsData
            })
            next()
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    //! GET DESTINATION DATA BY ID
    static async getTravelById(req, res, next) {
        try {
            const id = req.params.id
            const detailDestination = await Destination.findOne({
                where: {
                    id
                },
                include: {
                    model: Region,
                }
            })

            if (!detailDestination) {
                throw new Error('DESTINATION NOT FOUND')
            }

            res.status(200).json({
                statusCode: 200,
                message: 'Successfully Access',
                detailDestination
            })
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async getFavoriteDestination(req, res, next) {
        try {

        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async addFavoriteDestination(req, res, next) {
        try {

        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async deleteFavoriteDestination(req, res, next) {
        try {

        } catch (error) {
            console.log(error);
            next(error)
        }
    }


}


module.exports = TravelController