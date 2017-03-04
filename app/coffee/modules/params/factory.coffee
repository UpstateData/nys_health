
class QueryParams extends Backbone.Model

  defaults:
    cities:   require './plucked/cities'
    counties: require './plucked/counties'
    zips:     require './plucked/zips'

# # # # #

class ParamsFactory extends Marionette.Service

  # Defines radioRequests
  radioRequests:
    'params model':  'getModel'

  initialize: ->
    @params = new QueryParams()

  getModel: ->
    return @params

# # # # #

module.exports = new ParamsFactory()
