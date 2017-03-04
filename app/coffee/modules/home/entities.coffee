
class DataModel extends Backbone.Model
  url: 'foobar'

# # # # #

# TODO - PAGINATED COLLECTION
class DataCollection extends Backbone.Collection
  url: 'https://health.data.ny.gov/resource/5ib6-49en.json'
  # https://health.data.ny.gov

# # # # #

module.exports =
  Model:      DataModel
  Collection: DataCollection
