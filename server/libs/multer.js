import multer from "multer";
import { v4 as uuid } from "uuid";
import boom from "@hapi/boom";

//const upload = multer({ dest: DIR })
const MIME_TYPE = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './upload');
    },
    filename:(req, file, cb)=> {
        const extension = MIME_TYPE[file.mimetype];
        const baseName = uuid();
        const newName = `img-${baseName}.${extension}`;
        cb(null, newName);
    }
});


const fileFilter = (req, file, cb) => {
    if (Boolean(MIME_TYPE[file.mimetype])) {
        cb(null, true);
    } else {
        return cb(boom.unsupportedMediaType('that media is not supported'));
    }
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
});

export default upload;