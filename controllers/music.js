class MusicController{
    static async uploadMusic(req, res, next){
        try {
            console.log(req.files);
            res.status(201).json({
                message: "Music Created Successfully"
            })
        } catch (err) {
            next(err);
        }
    }

    static async getMusic(req, res, next){
        try {
            
        } catch (err) {
            next(err);
        }
    }

    static async getMusicById(req, res, next){
        try {
            
        } catch (err) {
            
        }
    }
}

module.exports = MusicController;