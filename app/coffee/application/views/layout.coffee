
# ApplicationLayout class definition
# Defines a Marionette.LayoutView to manage
# top-level application regions
class ApplicationLayout extends Marionette.LayoutView
  el: 'body'

  template: false

  regions:
    header:     '[app-region=header]'
    sidebar:    '[app-region=sidebar]'
    breadcrumb: '[app-region=breadcrumb]'
    overlay:    '[app-region=overlay]'
    flash:      '[app-region=flash]'
    main:       '[app-region=main]'

# # # # #

# Exports instance
module.exports = new ApplicationLayout().render()
