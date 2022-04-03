exports.handleError = (req, res, err) => {
    console.log(err);

    return res.status(500).json({
        status: 500,
        message: 'Internal Server Error'
    })
}