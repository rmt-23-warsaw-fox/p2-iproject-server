const {db} = require('../util/admin')

class Music{
    static async uploadMusic(req, res, next){
        try {
            const {imageUrl, musicUrl, title, genreId} = req.body;
            // const {id, email, displayName} = req.userData;
            const currentSong = {
                imageUrl,
                musicUrl,
                title,
                genreId,
                id: 1,
                email: "khalid@mail.com",
                displayName: "Khalid",
            }
            const docref = db.collection('music').doc();
            await docref.set({currentSong});
            res.status(201).json({
                message: "Music Created Successfully"
            })
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    static async getMusic(req, res, next){
        try {
            const collection = db.collection('music').doc('pu5ziPFJR63KL0WwlYtq');
            const data = await collection.get()
            res.status(200).json({
                data
            })
        } catch (err) {
            next(err);
        }
    }

    static async getMusicById(req, res, next){
        try {
            
        } catch (err) {
            next(err);
        }
    }
}

module.exports = Music;