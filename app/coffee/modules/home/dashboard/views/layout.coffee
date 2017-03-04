FormView = require './form'
MapView = require './map'
ItemList = require './itemList'
ItemDetail = require './itemDetail'
PaginationView = require 'hn_views/lib/pagination'

# # # # #

class DashboardView extends Mn.LayoutView
  template: require './templates/layout'
  className: 'container-fluid'

  regions:
    formRegion:       '[data-region=form]'
    listRegion:       '[data-region=list]'
    paginationRegion: '[data-region=pagination]'
    detailRegion:     '[data-region=detail]'

  collectionEvents:
    'sync': 'onCollectionSync'

  onCollectionSync: =>
    @collection.at(0)?.trigger('selected')

  onRender: ->

    # Renders FormView
    @formRegion.show new FormView({ collection: @collection, model: @options.query, params: @options.params })

    # Renders ListView
    listView = new ItemList({ collection: @collection })
    listView.on 'childview:selected', (view) => @showDetailView(view.model)
    @listRegion.show(listView)
    @onCollectionSync()

    # Renders PaginationView
    @paginationRegion.show new PaginationView({ collection: @collection, pager: true })

  showDetailView: (dataset) ->
    @detailRegion.show new ItemDetail({ model: dataset })

# # # # #

module.exports = DashboardView


