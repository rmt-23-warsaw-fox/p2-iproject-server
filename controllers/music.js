const { db } = require("../util/admin");
class Music {
  static async uploadMusic(req, res, next) {
    try {
      const { imageUrl, musicUrl, title, genreId } = req.body;
      const { id, email, displayName } = req.userData;
      const currentSong = {
        imageUrl,
        musicUrl,
        title,
        genreId,
        email: email,
        CreatorId: id,
        CreatorName: displayName,
      };
      const docref = db.collection("music").doc();
      await docref.set({ currentSong });
      res.status(201).json({
        message: "Music Created Successfully",
      });
    } catch (err) {
      //   console.log(err);
      next(err);
    }
  }

  static async getMusic(req, res, next) {
    try {
      const search = req.query.search;
      const musicRef = db.collection("music");
      let music = [];
      const snapshot = await musicRef.get();
      snapshot.forEach((doc) => {
        music.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      if (search) {
        music = music.filter((el) => {
          return el.currentSong.title.includes(search);
        });
      }
      res.status(200).json({
        data: music,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async getMusicById(req, res, next) {
    try {
      const musicRef = db.collection("music").doc(req.params.id);
      const doc = await musicRef.get();
      const music = doc.data();
      res.status(200).json({
        data: music,
      });
      // console.log(music);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async getUserSong(req, res, next) {
    try {
      const musicRef = db.collection("music");
      const snapshot = await musicRef
        .where("currentSong.CreatorId", "==", req.userData.id)
        .get();
      const music = [];
      snapshot.forEach((doc) => {
        // console.log(doc.data(), ">>>>>>>>>");
        music.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      res.status(200).json({
        data: music,
      });
    } catch (err) {
      next(err);
    }
  }

  static async publishComment(req, res, next) {
    try {
      const id = req.params.id;
      const { comment } = req.body;
      const docref = db
        .collection("music")
        .doc(id)
        .collection("messages")
        .doc();
      await docref.set({
        message: comment,
        User_Info: {
          displayName: req.userData.displayName,
          Profile_Picture: {
            imageData: req.userData.Profile_Picture.imageData,
            imageType: req.userData.Profile_Picture.imageType,
            imageName: req.userData.Profile_Picture.imageName,
          },
        },
      });
      res.status(201).json({
        message: "upload success",
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async getComments(req, res, next) {
    try {
      const id = req.params.id;
      const commentRef = db.collection("music").doc(id).collection("messages");
      const snapshot = await commentRef.get();
      const comments = []
      snapshot.forEach((doc) => {
        comments.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      res.status(200).json({
        data: comments,
      });
    } catch (err) {
        next(err);
    }
  }
}

module.exports = Music;
