
class FormView extends Mn.LayoutView
  template: require './templates/form'
  className: 'card card-block m-b-0'

  events:
    'change select': 'onSelectChange'

  templateHelpers: ->
    return {
      cities:   @options.params.get('cities')
      counties: @options.params.get('counties')
      zips:     @options.params.get('zips')
    }

  onRender: ->
    setTimeout(@initSelect2, 200)

  initSelect2: ->
    # console.log 'INIT SELECT2'
    $('select').select2({ placehoder: 'City' })

  onSelectChange: (e) ->
    # TODO - city, county, zip - else?
    data = Backbone.Syphon.serialize(@)
    data = {facility_city: data.city}

    @collection.search(data)

# # # # #

module.exports = FormView


