import {addMedia, findMediaById, listAllMedia} from "../models/media-model.js";

const getMedia = async (req, res) => {
  res.json(await listAllMedia());
};

const getMediaById = (req, res) => {
  const media = findMediaById(req.params.id);
  if (media) {
    res.json(media);
  } else {
    res.sendStatus(404);
  }
};

const postMedia = (req, res) => {
  const {title, user_id} = req.body;
  console.log('req file by multer', req.file);
  const {filename} = req.file;
  if (filename && title && user_id) {
    addMedia({title, user_id, filename});
    res.status(201);
    res.json({message: 'New media item added.'})
  } else {
    res.sendStatus(400);  
  }
};

const putMedia = (req, res) => {
  // not implemented in this example, this was homework
  res.sendStatus(200);
};

const deleteMedia = (req, res) => {
  // not implemented in this example, this was homework
  res.sendStatus(200);
};

export {getMedia, getMediaById, postMedia, putMedia, deleteMedia};
