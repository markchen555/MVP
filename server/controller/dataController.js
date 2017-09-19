const model = require('../../db/model/dataModel');

module.exports = {
  getData: (req, res) => {
    model.findAll({})
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(404).send(err);
    })
  },
  addData: (req, res) => {
    model.create({
      videoTitle: req.body.videoTitle,
      videoId: req.body.videoId,
    })
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(404).send(err);
    })
  },
  deleteData: (req, res) => {
    model.findAll({
      where: {
        id: req.params.id
      }
    })
    .then(result => {
      console.log('this is params ', req.params.dataId )
      model.destroy({
        where: {
          id: req.params.dataId
        }
      })
      .then(() => console.log(reslt))
    })
    .then(data => {
      res.status(200).send(data)
    })
    .catch(err => {
      res.status(200).send(err);
    })
  }
}