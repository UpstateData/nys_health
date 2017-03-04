
# Google Maps API Token:
# AIzaSyAsf2RzfQhI6LjmloxRM993gdLBFnBoxT8

# # # # #

class MapView extends Mn.LayoutView
  className: 'card card-block'
  template: require './templates/map'

  onRender: ->
    setTimeout(@initMap, 100)

  initMap: =>

    # Sets initial location
    itemLocation =
      lat: Number(@model.get('latitude'))
      lng: Number(@model.get('longitude'))

    # Map options
    mapOpts =
      zoom: 12
      center: itemLocation

    # Initializes map
    @map = new google.maps.Map(document.getElementById('map'), mapOpts)

    # Adds collection to map
    # @addMarkers()
    @addMarker(@model)

    return

  addMarkers: =>
    return unless @collection
    @addMarker(model) for model in @collection.models

  addMarker: (model) =>

    itemLocation =
      lat: Number(model.get('latitude'))
      lng: Number(model.get('longitude'))

    # Initializes marker
    marker = new google.maps.Marker
      position: itemLocation
      map: @map

    # Marker listener
    # marker.addListener 'click', (e) =>
    #   # model = @collection.findWhere({ latitude: String(e.latLng.lat()), longitude: String(e.latLng.lng()) })
    #   model = @collection.findWhere({ latitude: String(e.latLng.lat()) })
    #   console.log model
    #   return unless model
    #   @trigger 'childview:selected', model
    #   # @map.setZoom(8)
    #   # @map.setCenter(marker.getPosition())

# # # # #

module.exports = MapView
