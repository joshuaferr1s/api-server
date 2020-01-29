# Hooroar Donations API

> Powered by [Stripe](https://stripe.com)

> [Hosted here](https://api.jajjferris.com/hdDonations)

* GET /transactions - Lists all donations recieved for the minecraft server
* GET /transactions/month - Lists all donations recieved for the minecraft server this month
* POST /charge - Requires following fields to make a stripe charge: amount, description, currency, source, receipt_email
