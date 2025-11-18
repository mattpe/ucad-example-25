import { validationResult } from 'express-validator';
import {
  addMedia,
  findMediaById,
  findMediaByUserId,
  listAllMedia,
} from '../models/media-model.js';

const getMedia = async (req, res) => {
  res.json(await listAllMedia());
};

const getMediaById = async (req, res) => {
  const media = await findMediaById(req.params.id);
  if (media) {
    // add full filepath url to media object
    media.filepath = `${req.protocol}://${req.headers.host}/${process.env.UPLOADS_PATH}/${media.filename}`;
    res.json(media);
  } else {
    res.sendStatus(404);
  }
};

/**
 * Get media files for the logged in user based on token
 * @param {*} req
 * @param {*} res
 */
const getMediaByUser = async (req, res) => {
  const media = await findMediaByUserId(req.user.user_id);
  if (media) {
    res.json(media);
  }
};

const postMedia = async (req, res) => {
  // check if file is rejected by multer
  if (!req.file) {
    return res.status(400).json({error: 'Invalid or missing file'});
  }
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }
  let {title, description} = req.body;
  const user_id = req.user.user_id;
  // replace description with empty string if undefined
  description = description ? description : '';
  console.log('req file by multer', req.file);
  const {filename, size, mimetype} = req.file;
  if (filename && title && user_id) {
    const result = await addMedia({
      user_id,
      filename,
      size,
      mimetype,
      title,
      description,
    });
    res.status(201);
    res.json({message: 'New media item added.', ...result});
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

export {
  getMedia,
  getMediaById,
  getMediaByUser,
  postMedia,
  putMedia,
  deleteMedia,
};
