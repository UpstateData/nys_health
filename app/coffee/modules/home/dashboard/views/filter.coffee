class AbstractFiltersView extends Mn.LayoutView

  globalAttr: '$global' # Note: requires [name=$global] attribute on input.
  globalAttrs: null # Array of attributes to filter against.

  behaviors:
    Tooltips: {}

  ui:
    input:  'input'
    select: 'select'
    clear:  '[data-click=clear]'

  events:
    'input  @ui.input'  : 'throttleInput'
    'change @ui.select' : 'filterCollection'
    'click  @ui.clear'  : 'clear'

  # Throttles input event callbacks on <input>
  # Mitigates unnecessary expensive collection filtering
  throttledFilter: null
  throttleInput: ->
    @throttledFilter ||= _.throttle(@filterCollection, 750)
    @throttledFilter()

  clear: ->
    @ui.input.val('')
    @ui.select.val('')
    @filterCollection()

  filterCollection: ->
    data = Backbone.Syphon.serialize(this)

    # Global filter
    if @globalAttrs && data[ @globalAttr ]?

      # Resets query for blank global search
      return @collection.applyFilter({}) if !data[ @globalAttr ]

      # Assembles query object
      query = { $or: [] }

      # Iterates over attributes and assigns value to query
      for attr in @globalAttrs
        obj = {}
        obj[attr] = { $likeI: data[ @globalAttr ] }
        query['$or'].push(obj)

    # Non-global filter
    else
      queryData = []
      _.mapObject data, (val, key) =>
        return delete data[key] unless val # Strips null values
        obj = {}
        obj[key] = { $likeI: val }
        queryData.push(obj)

      query = { $and: queryData }

    # Queries collection
    @collection.applyFilter(query)

  onBeforeDestroy: ->
    @clear()

# # # # #

class FilterView extends AbstractFiltersView
  className: 'row'
  template: require './templates/filter'
  globalAttrs: ['operation_name']

  templateHelpers: ->
    { placeholder: 'Business Name' }

# # # # #

module.exports = FilterView
