module.exports = app => {
    const express = require('express')
    const moment = require('moment')
    const mongoose = require('mongoose')
    const Type = require('../../models/Type')
    const Goods = require('../../models/Goods')
    const Kami = require('../../models/Kami')
    const router = express.Router({
      mergeParams: true
    })


    router.post('/get_goods',async (req,res)=>{
      let d={}
      
      if(req.body.type_id){
         d = await Goods.find({type:mongoose.Types.ObjectId(req.body.type_id)}).populate('type').lean()
         for(let i=0; i<d.length; i++) {
           d[i].stock_now = await Kami.countDocuments({goods_id: d[i]._id, status: 1, active: 1})
         }
      }else if(req.body.id){
         d = await Goods.findById(req.body.id).populate('type').lean()
         const s = await Kami.countDocuments({
           goods_id:mongoose.Types.ObjectId(req.body.id),
           status:1,
           active:1
         })
         d.stock_now = s
      }else{
         d = await Goods.find().populate('type').lean()
         for(let i=0; i<d.length; i++) {
           d[i].stock_now = await Kami.countDocuments({goods_id: d[i]._id, status: 1, active: 1})
         }
      }
      res.send({code:1,data:d})
    })

    //const authMiddleware = require('../middleware/auth')
    app.use('/web/goods/api',  router)   //authMiddleware()
  
    // 错误处理函数
    app.use(async (err, req, res, next) => {
       console.log(err)
      res.status(err.statusCode || 500).send({
        message: err.message
      })
    })
  }