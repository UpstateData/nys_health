
class QueryModel extends Backbone.Model

  defaults:
    city:   ''
    zip:    ''
    county: ''

# # # # #

class QueryFactory extends Marionette.Service

  # Defines radioRequests
  radioRequests:
    'query model':  'getModel'

  initialize: ->
    @queryModel = new QueryModel()

  getModel: ->
    return @queryModel

# # # # #

module.exports = new QueryFactory()
