
class ItemEmpty extends Mn.LayoutView
  template: require './templates/item_empty'
  className: 'list-group-item list-group-item-warning'

# # # # #

class ItemChild extends Mn.LayoutView
  template: require './templates/item_child'
  className: 'list-group-item'

  behaviors:
    SelectableChild: {}

# # # # #

class ItemList extends Mn.CollectionView
  className: 'list-group'
  childView: ItemChild
  emptyView: ItemEmpty

# # # # #

module.exports = ItemList
