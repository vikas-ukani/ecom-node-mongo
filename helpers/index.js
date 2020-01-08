const sendSuccessResponse = function (res, data, message, status = 200) {
    return res.status(status).send({
        flag: true,
        status,
        data,
        message
    })
}

const sendBadResponse = function (res, data = null, message, status = 400) {
    return res.status(status).send({
        flag: false,
        status,
        data,
        message
    })
}

const makeError = (data = null, message, status = 400, flag = false) => {
    return {
        status,
        flag,
        data,
        message
    }
}

const makeResponse = (data, message, status = 200, flag = true) => {
    return {
        status,
        flag,
        data,
        message
    }
}


module.exports = {
    sendSuccessResponse,
    sendBadResponse,
    makeResponse,
    makeError
};
