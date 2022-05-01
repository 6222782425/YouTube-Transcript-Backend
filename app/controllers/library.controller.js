const Library = require("../models/library.model");

exports.create = async (req, res) => {
  const { userId, transcriptId } = req.body;

  try {
    const library = await Library.create({
      userId,
      transcriptId,
    });

    res.status(201).json(library);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.findOne = (req, res) => {
  const userId = req.user.user_id;
  // console.log({ _id: userId });
  // function findLibrary() {
  //   const librartId = data._id;
  //   Library.findById(librartId)
  //     .then((data) => {
  //       if (!data)
  //         res
  //           .status(404)
  //           .send({ message: "Not found Library with id " + librartId });
  //       else res.send(data);
  //     })
  //     .catch((err) => {
  //       res.status(500).send({
  //         message: "Error retrieving Library with id=" + librartId,
  //       });
  //     });
  // }
  Library.find({ userId: userId })
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found User with id " + userId });
      else {
        res.send(data);
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving User with id=" + userId });
    });
};
