LayoutView  = require './views/layout'

# # # # #

class DashboardRoute extends require 'hn_routing/lib/route'

  title: 'NYS Health - Dashboard'

  breadcrumbs: [{ text: 'Dashboard' }]

  # TODO - abstract some of this into the collection or factory
  fetch: ->
    Backbone.Radio.channel('data').request('collection')
    .then (collection) => @collection = collection

  render: ->
    @container.show new LayoutView({ collection: @collection })

# # # # #

module.exports = DashboardRoute
