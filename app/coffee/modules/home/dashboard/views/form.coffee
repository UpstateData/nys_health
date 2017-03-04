
class FormView extends Mn.LayoutView
  template: require './templates/form'
  className: 'card card-block'

  onRender: ->
    console.log 'INIT FORM'

# # # # #

module.exports = FormView


