import request from 'request-promise'

import { determineEarthdataEnvironment } from '../util/determineEarthdataEnvironment'
import { getClientId } from '../../../sharedUtils/getClientId'
import { getEarthdataConfig, getApplicationConfig } from '../../../sharedUtils/config'
import { getEchoToken } from '../util/urs/getEchoToken'
import { getJwtToken } from '../util/getJwtToken'
import { parseError } from '../../../sharedUtils/parseError'

/**
 * Perform an authenticated CMR Concept Metadata search
 * @param {Object} event Details about the HTTP request that it received
 */
const getProviders = async (event) => {
  const { headers } = event

  const { defaultResponseHeaders } = getApplicationConfig()

  const earthdataEnvironment = determineEarthdataEnvironment(headers)

  const jwtToken = getJwtToken(event)

  const accessToken = await getEchoToken(jwtToken, earthdataEnvironment)

  const url = `${getEarthdataConfig(earthdataEnvironment).cmrHost}/legacy-services/rest/providers.json`

  try {
    const response = await request.get({
      uri: url,
      resolveWithFullResponse: true,
      headers: {
        'Client-Id': getClientId().lambda,
        'Echo-Token': accessToken
      },
      json: true
    })

    const { body } = response

    return {
      isBase64Encoded: false,
      statusCode: 200,
      headers: defaultResponseHeaders,
      body: JSON.stringify(body)
    }
  } catch (e) {
    return {
      isBase64Encoded: false,
      headers: defaultResponseHeaders,
      ...parseError(e)
    }
  }
}

export default getProviders
