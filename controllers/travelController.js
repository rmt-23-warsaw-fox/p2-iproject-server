'use strict'

const { Destination, Region, Bookmark } = require("../models/index");

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

    //! GET ALL FAVORITE DESTINATION
    static async getFavoriteDestination(req, res, next) {
        try {
            const UserId = +req.additionalData.id
            const favDestinationData = await Bookmark.findAll({
                where: {
                    UserId
                },
                include: {
                    model: Destination
                }
            })

            res.status(200).json({
                statusCode: 200,
                message: 'success to accesss',
                favDestinationData
            })

        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    //! ADD FAVORITE DESTINATION
    static async addFavoriteDestination(req, res, next) {
        try {
            const DestinationId = +req.params.id
            const UserId = +req.additionalData.id

            const findDestination = await Destination.findOne({
                where: {
                    id: DestinationId,
                }
            })

            if (!findDestination) {
                throw new Error('DESTINATION NOT FOUND')
            }

            const [favDestination, created] = await Bookmark.findOrCreate({
                where: {
                    UserId,
                    DestinationId,
                }
            })

            if (!created) {
                throw new Error(`Destination already in your favorite`)
            }

            res.status(201).json({
                statusCode: 201,
                message: `${findDestination.name} successfully added in your favorite`,
                favDestination
            })
            next()

        } catch (error) {
            next(error)
        }
    }

    //! REMOVE DESTINATION FROM FAVORITES
    static async deleteFavoriteDestination(req, res, next) {
        try {
            const DestinationId = +req.params.id

            const findDestination = await Bookmark.findOne({
                where: {
                    DestinationId
                },
                include: {
                    model: Destination
                }
            })
            
            if (!findDestination) {
                throw new Error('DESTINATION NOT FOUND')
            }
            const destinationName = findDestination.Destination.name

            const removedDestination = await Bookmark.destroy({
                where: {
                    DestinationId
                }
            })


            res.status(200).json({
                statusCode: 200,
                message: `${destinationName} successfully remove in your favorite destination`
            })
            next()

        } catch (error) {
            console.log(error);
            next(error)
        }
    }


}


module.exports = TravelController