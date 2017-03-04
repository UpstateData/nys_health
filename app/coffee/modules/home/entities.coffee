
class ViolationModel extends Backbone.Model
  defaults: {}

class ViolationCollection extends Backbone.Collection
  model: ViolationModel
  url: 'https://health.data.ny.gov/resource/5ib6-49en.json'

  comparator: (mod1, mod2) ->
    d1 = new Date(mod1.get('date_of_inspection'))
    d2 = new Date(mod2.get('date_of_inspection'))

    if d1 < d2
      return 1

    else if d2 < d1
      return -1

    else
      return 0

# # # # #

class DataModel extends Backbone.Model
  idAttribute: 'nys_health_operation_id'

  ensureViolations: ->
    return new Promise (resolve, reject) =>

      # Returns if defined
      return resolve(@violations) if @violations

      @violations = new ViolationCollection()
      @violations.fetch
        data: { nys_health_operation_id: @id }
        success: => return resolve(@violations)

# # # # #

# TODO - PAGINATED COLLECTION
class DataCollection extends Backbone.PageableCollection
  model: DataModel
  url: 'https://health.data.ny.gov/resource/5ib6-49en.json'
  # https://health.data.ny.gov

  mode: 'client'

  state:
    pageSize: 10

  query: (data={}) ->
    console.log 'QUERY!'
    console.log data
    @fetch({ data: data })

    # https://health.data.ny.gov/resource/5ib6-49en.json?nys_health_operation_id=695815

# # # # #

module.exports =
  Model:      DataModel
  Collection: DataCollection
