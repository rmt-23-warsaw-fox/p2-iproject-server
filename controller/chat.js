const { tokenToPayload } = require("../helper/jwt");
const { Favourite, Post, Comment, User } = require("../models/index.js")

class Controller {

    static async getChat(req, res, next) {
        let postId = req.params.id
        //let name=req.query.name;
        //let location=req.query.loc;
        let offset = req.query.page;
        let limit = 3;
        if (!offset) {
            offset = 0;
        } else {
            offset = offset * limit
        }
        console.log(offset + " is OFFSET");

        let where = {
            postId,
            archieved:false
        }
        let option = {
            limit: limit,
            offset: offset,
            where: where,
            include: [
                {
                    model: User,
                    attributes: ["email"]
                }

            ]
        }

        try {
            const { count, rows } = await Comment.findAndCountAll(option);

            let totalPages = Math.ceil(count / limit)
            res.status(200).json({
                message: "Comment for the post",
                data: rows,
                totalPages: totalPages
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async addChat(req, res, next) {
        let UserId= req.user.id;
        let postId= req.params.id;
        let {text}= req.body;
        try{
            const comment = Comment.create({text,UserId,postId,archieved:false});
            if(comment){
                res.status(200).json({
                    message: "Comment has been added"
                });
            }
        }catch(error){
            console.log(error);
            next(error);
        }
        
    }  

    static async deleteChat(req, res, next) {
        try{
            const comment = Comment.update({archieved:true});
            if(comment){
                res.status(200).json({
                    message: "Comment has been added"
                });
            }
        }catch(error){
            console.log(error);
            next(error);
        }
        destroy
    }

    static async getFavourite(req, res, next) {
        let PostId = req.params.id
        const { access_token } = req.headers;
        let userId=-1;
        if(access_token){

            let payload = tokenToPayload(access_token);
            let userFound = await User.findByPk(payload.id);
    
            if (!userFound) {
            } else {
                userId=userFound.id;
            }
        }

        let where = {
            PostId
        }
        let option = {
            where: where
        }

        try {
            const { count, rows } = await Comment.findAndCountAll(option);
            let found=false;
            for(let i=0;i<rows.length;i++){
                if(rows[i].UserId==userId){
                    found=true;
                    break;
                }
            }
            let totalPages = Math.ceil(count / limit)
            res.status(200).json({
                message: "Favourite for the post",
                ilike: found,
                totalFavourite: totalPages
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async addFavourite(req, res, next) {
        let UserId= req.user.id;
        let postId= req.params.id;
        let {text}= req.body;
        try{
            const favourite = Favourite.create({text,UserId,postId});
            if(favourite){
                res.status(200).json({
                    message: "Favourite has been added"
                });
            }
        }catch(error){
            console.log(error);
            next(error);
        }
    }  
    static async removeFavourite(req, res, next) {

    }  
}

module.exports = Controller