const mongoose = require("mongoose");
const AssetSchema = new mongoose.Schema({
    assetName: String,
    site: String,
    assetId: String,
    serialNumber: Number,
    modal:String,
    tagNumber: String,
    date: Date,
    rfid:String,
    purchasePrice: String,
    purchaseDate: Date,
    purchaseInvoice: String,
    expectedLife: String,
    supplier: String,
    manufacturer: String,
    assetStatus:String,
    costCenter: String,
    parentAsset: String,
    dateRemoved: Date,
})

const AssetModel = mongoose.model("asset",AssetSchema)
module.exports = AssetModel