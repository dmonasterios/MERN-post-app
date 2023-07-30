import mongoose from "mongoose";
import boom from "@hapi/boom";

const verifyID = async (req, res, next) => {
    if(mongoose.isValidObjectId(req.params.id)) next();
    else next(boom.badRequest('Invalid ID'));
}

export default verifyID;