const Transcript = require("../models/transcript.model");

exports.create = async (req, res) => {
  const { thubnall, url, fullTranscript, summarizedTranscript } = req.body;

  try {
    const transcript = await Transcript.create({
      // title,
      thubnall,
      url,
      fullTranscript,
      summarizedTranscript,
    });

    res.status(201).json(transcript);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.findOne = async (req, res) => {
  const id = req.body.id;
  console.log(id);
  await Transcript.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Transcript with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ message: "Error retrieving Transcript with id=" + id });
    });
};

exports.delete = async (req, res) => {
  const id = req._id;
  await Transcript.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`,
        });
      } else {
        res.send({
          message: "Tutorial was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id,
      });
    });
};
