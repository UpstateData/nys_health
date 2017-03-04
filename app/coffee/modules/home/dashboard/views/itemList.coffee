
class ItemChild extends Mn.LayoutView
  template: require './templates/item_child'
  className: 'list-group-item'

  behaviors:
    SelectableChild: {}

class ItemList extends Mn.CollectionView
  className: 'list-group'
  childView: ItemChild

# # # # #

module.exports = ItemList
