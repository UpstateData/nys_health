require './factory'
DashboardRoute = require './dashboard/route'
AboutRoute = require './about/route'
# # # # #

# HomeRouter class definition
class HomeRouter extends require 'hn_routing/lib/router'

  routes:
    '(/)': 'dashboard'
    'about(/)': 'about'

  dashboard: ->
    new DashboardRoute({ container: @container })

  about: ->
    new AboutRoute({ container: @container })

# # # # #

module.exports = HomeRouter
