const errorHandler = async (err, req, res, next) => {
    res.status(500).json({
        message: err.message,
        stack: err.stack
    });
}

export default errorHandler;