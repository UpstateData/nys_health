
# Marionette Behavior Manifest
module.exports =
  SubmitButton:     require 'hn_behaviors/lib/submitButton'
  Flashes:          require 'hn_behaviors/lib/flashes'
  ModelEvents:      require 'hn_behaviors/lib/modelEvents'
  BindInputs:       require 'hn_behaviors/lib/bindInputs'
  Tooltips:         require 'hn_behaviors/lib/tooltips'
  SelectableChild:  require './selectableChild'
