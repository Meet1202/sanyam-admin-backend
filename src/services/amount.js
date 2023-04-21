const Amount = require("../models/amounts");

const bulkAddAmount = (req, res, next) => {
      try{
        Amount.bulkCreate(req.body.amount)
        .then((amount) => {
          console.log(amount);
          res.send({status: 200,body:{ message: "Amount added successfully!", data: amount }});
        }) 
        .catch((err) => {
          res.send({status: 500,body:{ message: err }});
        });
      }catch(e){
        res.send({status: 500,body: `Server error ${e}`});
      }
};


const getLogs = (req, res, next) => {
  Amount.findAll()
    .then((logs) => {
      res.status(200).send({ message: "success.", data: logs });
    })
    .catch((error) => {
      res.status(404).send({ message: "No Logs found in data base." });
    });
};

const getAmountByVolunteers = async (req, res, next) => {
  try {
    if(req.body.id === 'ALL'){
      await Amount.findAll().then((logs)=>{
        return res.status(200).send({ message: "success.", data: logs });
      }).catch((error)=>{
        return res
          .status(404)
          .send({ message: "Amounts not found in database." });
      })
    }else{
      await Amount.findAll({
        where: {volunteer_id: req.body.id}
      }).then((logs)=>{
        return res.status(200).send({ message: "success.", data: logs });
      }).catch((error)=>{
        return res
          .status(404)
          .send({ message: "Amounts not found in database." });
      })
    }
  } catch (e) {
    return res
      .status(404)
      .send({ message: "Something went wrong." });
  }
};

module.exports = {
    bulkAddAmount: bulkAddAmount,
    getLogs:getLogs,
    getAmountByVolunteers:getAmountByVolunteers
  };