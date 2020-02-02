const router = require("express").Router();
const MovieStream = require("../helpers/MovieStream");

const movieStream = new MovieStream({
  clientSupportedFormat: ["mp4", "mkv"],
  convert: true, // To webm
  verbose: true
});

router.get("/", (req, res, next) => {
  const { magnet } = req.query;
  const range = req.headers.range;
  let sent = false;

  movieStream
    .fromMagnet(magnet, { range })
    .then(({ head, stream }) => {
      console.log("[STREAM]", "New stream");
      if (!sent) {
        res.writeHead(206, head);
        sent = true;
      }
      stream.pipe(res);
    })
    .catch(err => {
      return res.status(400).send({
        message: err.message
      });
    });
});

module.exports = router;
