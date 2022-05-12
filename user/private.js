const { sendResponse } = require('../utilFunctions')

module.exports.handler = async (event) => {
    return sendResponse(200, { message: `${event.requestContext.authorizer.claims.email} is an authorized email` })
}