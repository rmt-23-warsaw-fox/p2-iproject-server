const { Wishlist, Accomodation, Type, Transaction } = require("../models");
const midtransClient = require("midtrans-client");

class WishlistController {
  static async addToWishlist(req, res, next) {
    try {
      const UserId = req.currentUser.id;
      const { AccomodationId, TypeId } = req.body;
      const [accomodation, created] = await Wishlist.findOrCreate({
        where: { AccomodationId, UserId },
        defaults: {
          TypeId: TypeId,
        },
      });

      if (!created) {
        throw { name: "ACCOMODATION_ALREADY_EXIST" };
      }

      res.status(201).json({
        message: `Successfully added to wishlist`,
      });
    } catch (err) {
      next(err);
    }
  }

  static async fetchWishlist(req, res, next) {
    try {
      const userId = req.currentUser.id;
      const wishlist = await Wishlist.findAll({
        where: { UserId: +userId },
        include: [
          {
            model: Type,
            attributes: ["name"],
          },
          {
            model: Accomodation,
          },
        ],
        attributes: { exclude: ["updatedAt", "createdAt"] },
      });

      res.status(200).json(wishlist);
    } catch (err) {
      next(err);
    }
  }

  static async deleteWishlist(req, res, next) {
    try {
      const { id } = req.params;
      const deletedWishlist = await Wishlist.destroy({
        where: { id },
      });

      if (!deletedWishlist) {
        throw { name: "WISHLIST_NOT_FOUND" };
      }

      res.status(200).json({
        message: "Successfully deleted from wishlist",
      });
    } catch (err) {
      next(err);
    }
  }

  static async payment(req, res, next) {
    try {
      const {
        accomodationId,
        accomodationName,
        roomType,
        typeId,
        price,
        totalNight,
        totalPrice,
      } = req.body;
      const { id, email, firstName, lastName, address, phoneNumber } =
        req.currentUser;

      let snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: "SB-Mid-server-okUj6lYx4xPOAL8OMFdRn4sE",
      });

      const lastTransaction = await Transaction.findAll({
        attributes: ["id"],
        limit: 1,
        order: [["createdAt", "DESC"]],
      });

      const transactionId = !lastTransaction.length
        ? 1
        : lastTransaction[0].id + 1;
      const time = new Date().getTime();
      const order_id = `order-${transactionId}-${time}-${id}-${phoneNumber}`;

      const accName =
        accomodationName.length > 20
          ? accomodationName
              .split("")
              .map((e, i) => {
                if (i <= 30) {
                  return e;
                }
              })
              .join("")
          : accomodationName;

      let parameter = {
        transaction_details: {
          order_id: order_id,
          gross_amount: totalPrice,
        },
        item_details: {
          id: accomodationId,
          name: accName,
          category: roomType,
          price: price,
          quantity: totalNight,
          merchant_name: "RENT ROOM",
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          first_name: firstName,
          last_name: lastName,
          email: email,
          phone: phoneNumber,
          billing_address: {
            address: address,
          },
        },
      };

      const transaction = await snap.createTransaction(parameter);
      const token = transaction.token;
      await Transaction.create({
        name: accomodationName,
        price,
        totalNight,
        totalPrice,
        UserId: id,
        AccomodationId: accomodationId,
        TypeId: typeId,
        orderId: order_id,
      });
      res.status(200).json({ token });
    } catch (err) {
      console.log(err.ApiResponse);
      next(err);
    }
  }

  static async fetchTransactions(req, res, next) {
    try {
      const { id } = req.currentUser;
      const transactions = await Transaction.findAll({
        where: { UserId: id },
        include: [
          {
            model: Accomodation,
            attributes: ["location", "imageUrl"],
          },
        ],
      });
      res.status(200).json(transactions);
    } catch (err) {
      next(err);
    }
  }

  static async updatePaymentStatus(req, res, next) {
    try {
      const { orderId, id } = req.body;
      let apiClient = new midtransClient.Snap({
        isProduction: false,
        serverKey: "SB-Mid-server-okUj6lYx4xPOAL8OMFdRn4sE",
        clientKey: "SB-Mid-client-62QhHpa6vM7tXjuL",
      });

      const { transaction_status } = await apiClient.transaction.status(
        orderId
      );
      let statusUpdated, message, status;
      if (transaction_status === "settlement") {
        statusUpdated = await Transaction.update(
          { status: transaction_status },
          {
            where: { id },
          }
        );
          status = "success"
          message = "Your payment has been successfully"
      } else {
          status = 'failed'
          message = "You haven't made a payment yet"
      }
      res.status(200).json({
          status,
          message: message
      });
    } catch (err) {
        console.log(err);
      next(err);
    }
  }
}

module.exports = WishlistController;
