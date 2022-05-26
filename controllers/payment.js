const midtransClient = require('midtrans-client');
// Create Snap API instance
let snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: 'SB-Mid-server-wbLcGSE8HpMB_os5vYzbrJgT',
  clientKey: 'SB-Mid-client-PWi2oSB5f0ZMGyhH',
});
class ControllerPayment {
  static async transaction(req, res, next) {
    try {
      const { id, email } = req.loginfo;

      const transactionCode = `TRX${Math.floor(Math.random() * 1000000)}`;

      let parameter = {
        transaction_details: {
          order_id: `${Date.now()}-${transactionCode}`,
          gross_amount: '1000000',
        },
      };

      const transaction = await snap.createTransaction(parameter);
      if (!transaction) {
        throw { name: 'TRANSACTION_FAILED' };
      }

      let transactionToken = transaction.token;
      console.log('transactionToken:', transactionToken);

      let transactionRedirectUrl = transaction.redirect_url;
      console.log('transactionRedirectUrl:', transactionRedirectUrl);

      res.status(200).json({
        token: transactionToken,
        redirect_url: transactionRedirectUrl,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = ControllerPayment;
