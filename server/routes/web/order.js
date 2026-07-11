module.exports = app => {
    const express = require('express')
    const moment = require('moment')
    const mongoose = require('mongoose')
    const Type = require('../../models/Type')
    const Goods = require('../../models/Goods')
    const Kami = require('../../models/Kami')
    const Order = require('../../models/Order')
    const {getClientIp} = require('../../plugins/tools')
    const currency = require('currency.js')
    const assert = require('http-assert')
    const router = express.Router({
      mergeParams: true
    })
    
    //创建订单
    router.post('/create_order',async (req,res)=>{
      const {goods,order} = req.body
      let ip = getClientIp(req)
      
      let num = parseInt(order.num)
      assert(num > 0 && !isNaN(num), 400, '购买数量不合法')
      assert(order.qq_email, 400, '联系方式不能为空')

      const dbGoods = await Goods.findById(goods._id).populate('type')
      assert(dbGoods, 404, '商品不存在')
      assert(dbGoods.active === 1, 400, '该商品已下架')
      
      const stock_now = await Kami.countDocuments({goods_id: dbGoods._id, status: 1, active: 1})
      assert(num <= stock_now, 400, '库存不足')

      let money = currency(num).multiply(currency(dbGoods.price))
      let order_info={
        type_id: mongoose.Types.ObjectId(dbGoods.type._id),
        type_name: dbGoods.type.name,
        goods_id: mongoose.Types.ObjectId(dbGoods._id),
        goods_name: dbGoods.name,
        num: num,
        price: dbGoods.price,
        money: money,
        qq_email: order.qq_email,
        password: order.password || 'default_password',
        ip: ip,
        status: 1,
      }
      const d = await Order.create(order_info)
      res.send({code:1,data:d})
    })
    //获取订单信息
    router.post('/get_order_info',async(req,res)=>{
      //const d = await (await Order.findById(req.body.id).populate('goods_id').populate('type_id'))
      const d = await Order.findById(req.body.id).populate('type_id').populate('goods_id').populate('kami_id')
      res.send({code:1,data:d})
    })
    //按联系方式查询订单 (免密)
    router.post('/query_pass',async (req,res)=>{
      const {qq_email} = req.body
      const d = await Order.find({qq_email}).populate('goods_id')
      assert(d.length>0, 442, '没有查询到订单信息')
      res.send({code:1,data:d})
    })

    //模拟支付接口
    router.post('/mock_pay',async(req,res)=>{
      const {id} = req.body
      const d = await Order.findById(id)
      assert(d, 442, '无此订单')
      if(d.status === 2 || d.status === 3 || d.status === 4){
        return res.send({code:1, msg:'已支付'})
      }
      
      const k = await Kami.findOneAndUpdate(
        { goods_id: mongoose.Types.ObjectId(d.goods_id), status: 1, active: 1 },
        { status: 3 },
        { new: true }
      )
      
      if(!k){
        await Order.findByIdAndUpdate(d._id,{
          status:4,
          pay_time:moment().format('YYYY-MM-DD HH:mm:ss')
        })
      } else {
        await Order.findByIdAndUpdate(d._id,{
          status:2,
          kami_id:k._id,
          kami:k.kami,
          pay_type:'mock_pay',
          pay_time:moment().format('YYYY-MM-DD HH:mm:ss')
        })
      }
      res.send({code:1,data:d})
    })
    //按订单编号查询
    router.post('/query_orderNo',async(req,res)=>{
      const {order_no} = req.body
      assert(order_no,442,'订单编号格式错误')
      assert(order_no.match(/^[0-9a-z]{24}$/),442,'订单编号格式错误')
      const d =await Order.findById(order_no)
      assert(d, 442, '没有查询到订单信息')
      res.send({code:1,data:[d]})
    })
    //const authMiddleware = require('../middleware/auth')
    app.use('/web/order/api',  router)   //authMiddleware()
  
    // 错误处理函数
    app.use(async (err, req, res, next) => {
       console.log(err)
      res.status(err.statusCode || 500).send({
        message: err.message
      })
    })
  }