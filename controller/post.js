const { Post, Type, User ,History,Favourite} = require("../models");
const { Op } = require("sequelize");
class PostController {
    static async list(req, res, next) {
        
        console.log(req.query);
        console.log(req.body);
        let name=req.query.name;
        let location=req.query.loc;
        let offset=req.query.page;
        let limit=3;
        if(!offset){
            offset=0;
        }else{
            offset=offset*limit
        }
        console.log(offset+" is OFFSET");
        
        let where = {
            statusArchieve: "active"
        }
        if(name){
            name= "%"+name+"%"
            where.name={[Op.iLike]: name}
        }
        if(location){
            location="%"+location+"%"
            where.location={[Op.iLike]: location}
        }
        let option ={
            limit: limit,
            offset: offset,
            where:where,
            include: [
                {
                    model: Type,
                    attributes: ["name"]
                }, {
                    model: User,
                    attributes: ["email"]
                }

            ]
        }
        
        try {
            const {count,rows} = await Post.findAndCountAll(option);

            let totalPages=Math.ceil(count/limit) 
            res.status(200).json({
                message: "Posts",
                data: rows,
                totalPages:totalPages
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async listOwn(req, res, next) {
        
        console.log(req.query);
        console.log(req.body);
        let name=req.query.name;
        let location=req.query.loc;
        let offset=req.query.page;
        let limit=3;
        if(!offset){
            offset=0;
        }else{
            offset=offset*limit
        }
        console.log(offset+" is OFFSET");
        
        let where = {
            [Op.not]: [
                { statusArchieve: "archieved" }
            ]
        }
        if(name){
            name= "%"+name+"%"
            where.name={[Op.iLike]: name}
        }
        if(location){
            location="%"+location+"%"
            where.location={[Op.iLike]: location}
        }
        let option ={
            limit: limit,
            offset: offset,
            where:where,
            include: [
                {
                    model: Type,
                    attributes: ["name"]
                }, {
                    model: User,
                    attributes: ["email"]
                }

            ]
        }
        
        try {
            const {count,rows} = await Post.findAndCountAll(option);

            let totalPages=Math.ceil(count/limit) 
            res.status(200).json({
                message: "Posts",
                data: rows,
                totalPages:totalPages
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async add(req, res, next) {
        try {
            const authorId = req.user.id;
            const { name, description, imgUrl, location, tag, typeId } = req.body;
            console.log(`${name}, ${description}, ${imgUrl}, ${location}, ${tag}, ${typeId}`)
            const post = Post.create({
                name,
                description,
                imgUrl,
                location,
                tag,
                typeId,
                AuthorId: authorId
            }).then((response)=>{
                if(response){
                    let history = History.create({
                        action: 'created',
                        TargetId: response.id,
                        UserId: authorId
                    });
                }
            }).catch((err)=>{
                throw(err);
            });
            if (post) {
                res.status(201).json({
                    message: "Post " + name + " has been created",
                });
            } else {
                throw { statusCode: 404 };
            }

        } catch (error) {
            next(error);
        }
    }

    static async detail(req, res, next) {
        try {
            let id = req.params.id;
            //const authorId = req.user.id;
            const post = await Post.findByPk(id, {
                include: [
                    {
                        model: Type,
                        attributes: ["name"],
                    }, {
                        model: User,
                        attributes: ["email"]
                    }
                ],
            });

            if (!post) {
                throw { statusCode: 404 };
            }
            res.status(200).json({
                message: "Detail of post",
                data: post,
            });

        } catch (error) {
            next(error);
        }
    }

    static async update(req, res, next) {
        try {
            const path = req.route.path;
            
            const id = req.params.id;
            const authorId = req.user.id;
            let { name, description, imgUrl, location, tag, typeId,statusArchieve } = req.body;
            if(path=="/hide"||path=="/follower"){
                if(path=="/hide"){
                    statusArchieve="hidden"
                }else{
                    statusArchieve="follower-only"
                }
            }
            let post = await Post.findByPk(id);

            if (!post) {
                throw { statusCode: 404 };
            } else {
                if (!name) {
                    name = post.name;
                }
                if (!description) {
                    description = post.facility;
                }
                if (!imgUrl) {
                    imgUrl = post.imgUrl;
                }
                if (!location) {
                    location = post.location;
                }
                if (!tag) {
                    tag = post.price;
                }
                if (!typeId) {
                    typeId = post.typeId;
                }
                if(!statusArchieve){
                    statusArchieve=post.statusArchieve;
                }

                post = post.update({ name, description, imgUrl, location, tag, typeId }).then((response)=>{
                    if(response){
                        let history = History.create({
                            action: 'updated',
                            TargetId: response.id,
                            UserId: authorId
                        });
                    }
                });
                res.status(200).json({
                    message: "Post " + name + " updated",
                });
            }
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async delete(req, res, next) {
        try {
            const id = req.params.id;
            const authorId = req.user.id;
            let post = await Post.findByPk(id);


            if (!post) {
                throw { statusCode: 404 };
            } else {
                let statusArchieve = "archieved";
                post = post.update({
                    statusArchieve
                }).then((response)=>{
                    if(response){
                        let history = History.create({
                            action: 'archieved',
                            TargetId: response.id,
                            UserId: authorId
                        });
                    }
                });
                res.status(200).json({
                    message: "Post archieved",
                });

            }

        } catch (error) {
            next(error);
        }
    }

    static async unarchieve(req, res, next) {
        try {
            const id = req.params.id;
            const authorId = req.user.id;
            let post = await Post.findByPk(id);


            if (!post) {
                throw { statusCode: 404 };
            } else {
                let statusArchieve = "active";
                post = post.update({
                    statusArchieve
                }).then((response)=>{
                    if(response){
                        let history = History.create({
                            action: 'activated',
                            TargetId: response.id,
                            UserId: authorId
                        });
                    }
                });
                res.status(200).json({
                    message: "Post activated",
                });

            }

        } catch (error) {
            next(error);
        }
    }
    static async addFavourite(req, res, next) {
        try {
            const id = req.params.id;
            const userId = req.user.id;
            const favourite = await Favourite.findOrCreate({
                where:{
                PostId: id,
                UserId: userId
                }
            });
            if (!favourite) {
                throw { statusCode: 404 };
            }
            res.status(201).json({
                message: "favourite has been added",
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
    static async removeFavourite(req, res, next) {
        try {
            const id = req.params.id;
            const userId = req.user.id;
            const favourite = await Favourite.destroy({
                where:{
                    UserId: userId,
                    PostId:id
                }
            });
            if (!favourite) {
                throw { statusCode: 404 };
            }
            res.status(201).json({
                message: "favourite has been removed",
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
    static async addType(req, res, next) {
        try {
            //console.log(req.body);
            const name = req.body.name;

            const type = await Type.create({
                name
            });
            if (!type) {
                throw { statusCode: 404 };
            }
            res.status(201).json({
                message: "Type " + name + "has been created",
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
    static async listHistory(req, res, next) {
        try {
            const histories = await History.findAll({
                include: [
                    {
                        model: Post,
                        attributes: ["name"],
                    }, {
                        model: User,
                        attributes: ["email"]
                    }
                ],
            });
            console.log(histories);
            res.status(200).json({
                message: "Histories",
                data: histories,
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
    static async listFavourite(req, res, next) {
        try {
            const userId = req.user.id;
            const favourites = await Favourite.findAll({
                where:{
                    UserId: userId
                },
                include: [
                    {
                        model: Post,
                        include: [
                            {
                                model: Type
                            }
                        ]
                    }
                ],
                attributes: {
                     exclude: ['id','createdAt','updatedAt','UserId','PostId'] 
                    }
            });
            console.log(favourites[0]);
            res.status(200).json({
                message: "Favourites",
                data: favourites,
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
    static async listType(req, res, next) {
        try {
            const types = await Type.findAll();
            console.log(types);
            res.status(200).json({
                message: "Types",
                data: types,
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }


    static async deleteType(req, res, next) {
        try {
            console.log("Entered")
            const id = req.params.id;

            const type = Type.destroy({
                where: {
                    id: id
                }
            });
            if (!type) {
                throw { statusCode: 404 };
            }
            res.status(200).json({
                message: "Type deleted",
            });

        } catch (error) {
            next(error);
        }
    }
    
}

module.exports = PostController