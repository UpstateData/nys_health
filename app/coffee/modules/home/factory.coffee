
Entities = require './entities'

# # # # #

class DataFactory extends Marionette.Service

  # Defines radioRequests
  radioRequests:
    'data collection':  'getCollection'

  initialize: ->
    @cached = new Entities.Collection()

  # TODO - accept parameters?
  getCollection: ->
    new Promise (resolve, reject) =>

      @cached.fetch
        data:
          "$limit": 10 # TODO - abstract into collection
          "$$app_token" : "Avs1fDCIaC9lLqwDz5IQaftgU" # TODO - abstract into collection

        success: () => return resolve(@cached)
        error: () => return reject(@cached)

# # # # #

module.exports = new DataFactory()
