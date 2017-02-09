
# SidebarView class definition
# The SidebarView renders the app's sidebar with
# the menuItems specified below
class SidebarView extends Marionette.LayoutView
  template: require './template'
  className: 'nav nav-pills nav-stacked'
  tagName: 'nav'

  menuItems: [
    { href: '#', icon: 'fa-home', title: 'Dashboard', divider: true }
  ]

  events:
    'click a': 'onClicked'

  onClicked: ->
    Backbone.Radio.channel('sidebar').trigger('hide')

  serializeData: ->
    return { items: @menuItems }

# # # # #

module.exports = SidebarView
