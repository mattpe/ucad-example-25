import {addMedia, findMediaById, listAllMedia} from "../models/media-model.js";

const getMedia = (req, res) => {
  res.json(listAllMedia());
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
  const {filename, title, description, user_id} = req.body;
  if (filename && title && description && user_id) {
    addMedia(req.body);
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
