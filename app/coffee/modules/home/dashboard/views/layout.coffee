FormView = require './form'

# # # # #

class ItemChild extends Mn.LayoutView
  template: require './templates/item_child'
  className: 'list-group-item'

  behaviors:
    SelectableChild: {}

class ItemList extends Mn.CollectionView
  className: 'list-group'
  childView: ItemChild

# # # # #

# Google Maps API Token:
# AIzaSyAsf2RzfQhI6LjmloxRM993gdLBFnBoxT8

# TODO - abstract into MapView
class ItemDetail extends Mn.LayoutView
  className: 'card card-block'
  template: require './templates/item_detail'

  onRender: ->
    setTimeout(@initMap, 100)

  initMap: =>

    # Item Location
    itemLocation =
      lat: Number(@model.get('latitude'))
      lng: Number(@model.get('longitude'))

    # Map options
    mapOpts =
      zoom: 6
      center: itemLocation

    # Initializes map
    map = new google.maps.Map(document.getElementById('map'), mapOpts)

    # Initializes marker
    marker = new google.maps.Marker
      position: itemLocation
      map: map

    return

# # # # #

class DashboardView extends Mn.LayoutView
  template: require './templates/layout'
  className: 'container-fluid'

  regions:
    formRegion:   '[data-region=form]'
    listRegion:   '[data-region=list]'
    detailRegion: '[data-region=detail]'

  onRender: ->

    # Renders FormView
    @formRegion.show new FormView()

    # Renders ListView
    listView = new ItemList({ collection: @collection })
    listView.on 'childview:selected', (view) => @showDetailView(view.model)
    @listRegion.show(listView)
    @collection.at(0)?.trigger('selected')

  showDetailView: (dataset) ->
    @detailRegion.show new ItemDetail({ model: dataset })

# # # # #

module.exports = DashboardView


