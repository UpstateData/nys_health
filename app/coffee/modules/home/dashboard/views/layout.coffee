
class DashboardView extends Mn.LayoutView
  template: require './templates/layout'
  className: 'container-fluid'

  onRender: ->
    console.log 'JS Can go here.'

# # # # #

module.exports = DashboardView


