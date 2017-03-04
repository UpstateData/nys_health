
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

class ItemDetail extends Mn.LayoutView
  className: 'card card-block'
  template: require './templates/item_detail'

# # # # #

class DashboardView extends Mn.LayoutView
  template: require './templates/layout'
  className: 'container-fluid'

  regions:
    listRegion:   '[data-region=list]'
    detailRegion: '[data-region=detail]'

  onRender: ->
    listView = new ItemList({ collection: @collection })
    listView.on 'childview:selected', (view) => @showDetailView(view.model)
    @listRegion.show(listView)
    @collection.at(0)?.trigger('selected')

  showDetailView: (dataset) ->
    @detailRegion.show new ItemDetail({ model: dataset })

# # # # #

module.exports = DashboardView


