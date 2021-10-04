const env = require("../environment")
const { Headers } = require("@budibase/auth").constants

/**
 * This is a restricted endpoint in the cloud.
 * Ensure that the correct API key has been supplied.
 */
module.exports = async (ctx, next) => {
  if (!env.SELF_HOSTED) {
    const apiKey = ctx.request.headers[Headers.API_KEY]
    if (apiKey !== env.INTERNAL_API_KEY) {
      ctx.throw(403, "Unauthorized")
    }
  }

  return next()
}
