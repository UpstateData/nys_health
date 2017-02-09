# This file defines a manifest for the client application.
# This includes configuration, Services, Components, Modules
# and the Application singleton instance.

# # # # #

# Application configuration manifest
require './config'

# Application class definition & App Layout
App       = require './app'
AppLayout = require './application/views/layout'

# Henson Entities
require 'hn_entities/lib/config'

# # # # #

# Components are routeless services with views that are
# accessible anywhere in the application
# Used to manage the header, sidebar, flash, and confirm UI elements

# Henson.js Components
HeaderComponent     = require './components/header/component'
SidebarComponent    = require './components/sidebar/component'
BreadcrumbComponent = require 'hn_breadcrumb/lib/component'
OverlayComponent    = require 'hn_overlay/lib/component'
FlashComponent      = require 'hn_flash/lib/component'
new HeaderComponent({ container: AppLayout.header })
new SidebarComponent({ container: AppLayout.sidebar })
new BreadcrumbComponent({ container: AppLayout.breadcrumb })
new OverlayComponent({ container: AppLayout.overlay })
new FlashComponent({ container: AppLayout.flash })

# # # # #

# Modules
# Modules represent collections of endpoints in the application.
# They have routes and entities (models and collections)
# Each route represents an endpoint, or 'page' in the app.
HomeModule = require './modules/home/router'
new HomeModule({ container: AppLayout.main })

# # # # # #

# Page has loaded, document is ready
$(document).on 'ready', => new App() # Instantiates new App
