LayoutView  = require './views/layout'

# # # # #

class DashboardRoute extends require 'hn_routing/lib/route'

  title: 'NYS Health - Dashboard'

  breadcrumbs: [{ text: 'Dashboard' }]

  fetch: ->
    @query  = Backbone.Radio.channel('query').request('model')
    @params = Backbone.Radio.channel('params').request('model')

    Backbone.Radio.channel('data').request('collection')
    .then (collection) => @collection = collection

  render: ->
    @container.show new LayoutView({ collection: @collection, query: @query, params: @params })

# # # # #

module.exports = DashboardRoute
