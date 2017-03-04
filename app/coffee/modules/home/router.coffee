require './factory'
DashboardRoute = require './dashboard/route'

# # # # #

# HomeRouter class definition
class HomeRouter extends require 'hn_routing/lib/router'

  routes:
    '(/)': 'dashboard'

  dashboard: ->
    new DashboardRoute({ container: @container })

# # # # #

module.exports = HomeRouter
