import promisePool from '../utils/database.js';

const listAllMedia = async () => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM MediaItems');
    console.log('rows', rows);
    return rows;
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};


// TODO: convert all endpoints to use database!!

const findMediaById = (id) => {
  return mediaItems.find((item) => item.media_id == id);
};

const addMedia = (media) => {
  const {filename, title, description, user_id} = media;
  const newId = mediaItems[0].media_id + 1;
  mediaItems.unshift({media_id: newId, filename, title, description, user_id});
};

export {listAllMedia, findMediaById, addMedia};
