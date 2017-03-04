LayoutView  = require './views/layout'

# # # # #

class DashboardRoute extends require 'hn_routing/lib/route'

  title: 'NYS Health Inspections - Dashboard'

  breadcrumbs: [{ text: 'Dashboard' }]

  fetch: ->
    @params = Backbone.Radio.channel('params').request('model')

    Backbone.Radio.channel('data').request('collection')
    .then (collection) => @collection = collection

  render: ->
    @container.show new LayoutView({ collection: @collection, params: @params })

# # # # #

module.exports = DashboardRoute
