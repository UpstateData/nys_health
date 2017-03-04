
class FormView extends Mn.LayoutView
  template: require './templates/form'
  className: 'card card-block'

  events:
    'change select': 'onSelectChange'

  templateHelpers: ->
    return {
      cities:   @options.params.get('cities')
      counties: @options.params.get('counties')
      zips:     @options.params.get('zips')
    }

  onSelectChange: (e) ->
    # TODO - city, county, zip - else?
    data = Backbone.Syphon.serialize(@)
    data = {county: data.county}

    @collection.query(data)

# # # # #

module.exports = FormView


