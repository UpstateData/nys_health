MapView = require './map'

# # # # #

class ViolationItem extends Mn.LayoutView
  tagName: 'tr'
  template: require './templates/violation_item'

  behaviors:
    Tooltips: {}

  className: ->
    if @model.isCritical()
      return 'table-danger'

    else if @model.get('violation_item').toLowerCase() == 'none'
      return 'table-success'

    else
      return 'table-warning'

  templateHelpers: ->
    return { date: moment(@model.get('date_of_inspection')).format('MM/DD/YY') }

  serializeData: ->
    d = super
    console.log d
    return d

# # # # #

class ViolationList extends Mn.CompositeView
  className: 'row'
  template: require './templates/violation_list'
  childView: ViolationItem
  childViewContainer: 'tbody'

# # # # #

class ViolationLoader extends Mn.LayoutView
  className: 'card card-block text-center'
  template: require './templates/loading'

# # # # #

class ViewSelector extends require 'hn_views/lib/nav'

  navItems: [
    { icon: 'fa-list-alt',   text: 'Violations', trigger: 'violations', default: true }
    { icon: 'fa-map-o',  text: 'Map', trigger: 'map' }
  ]

  navEvents:
    'violations': 'showViolations'
    'map':        'showMap'

  showViolations: ->
    @contentRegion.show new ViolationLoader()

    @model.ensureViolations().then (violations) =>
      @contentRegion.show new ViolationList({ collection: violations })

  showMap: ->
    @contentRegion.show new MapView({ model: @model })

# # # # #

class ItemDetail extends Mn.LayoutView
  className: 'card card-block'
  template: require './templates/item_detail'

  regions:
    selectorRegion:   '[data-region=selector]'
    mapRegion:        '[data-region=map]'
    violationsRegion: '[data-region=violations]'

  onRender: ->
    @selectorRegion.show new ViewSelector({ model: @model })

# # # # #

module.exports = ItemDetail
