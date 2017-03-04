

class ViolationItem extends Mn.LayoutView
  # className: 'list-group-item' # TODO - based off severity of violation?
  tagName: 'tr'
  template: require './templates/violation_item'

  serializeData: ->
    d = super
    console.log d
    return d

# # # # #

class ViolationList extends Mn.CompositeView
  tagName: 'table'
  className: 'table table-striped'
  template: require './templates/violation_list'
  childView: ViolationItem
  childViewContainer: 'tbody'

# # # # #

class ItemDetail extends Mn.LayoutView
  className: 'card card-block'
  template: require './templates/item_detail'

  regions:
    violationsRegion: '[data-region=violations]'

  onRender: ->
    @violationsRegion.show new ViolationList({ collection: @collection })

# # # # #

module.exports = ItemDetail
