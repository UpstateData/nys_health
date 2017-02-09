LayoutView  = require './views/layout'

# # # # #

class DashboardRoute extends require 'hn_routing/lib/route'

  title: 'Henson.js - Dashboard'

  breadcrumbs: [{ text: 'Dashboard'}]

  render: ->
    @container.show new LayoutView({ model: @model })

# # # # #

module.exports = DashboardRoute
