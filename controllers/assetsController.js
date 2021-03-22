const Assets = require('../models/assetModule')

exports.getAssets = async (req, res) => {
    
    try{
        const result = await Assets.find({})
        res.status(200).json({result})
    }catch(e){
        res.status(500).json({message: e.message})
    }
}
exports.addAsset = async (req, res) => {
    try{
        const asset = new Assets({...req.body})
        await asset.save()
        res.status(200).json({asset})
    }catch(e){
        res.status(500).json({message: e.message})
    }
}
exports.deleteAsset = async (req, res) => {
    try{
        const result = await Assets.findByIdAndDelete(req.body.id)
        if(!result){
            res.status(404).json({"message":"item did't find"})
        }
        res.status(200).json({"delleted":result}) 
    }catch(e){
        res.status(500).json({message: e.message})
    }
}
