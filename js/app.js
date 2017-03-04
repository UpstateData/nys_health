(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Application,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Application = (function(superClass) {
  extend(Application, superClass);

  function Application() {
    return Application.__super__.constructor.apply(this, arguments);
  }

  Application.prototype.radioEvents = {
    'app redirect': 'redirectTo'
  };

  Application.prototype.initialize = function() {
    Backbone.Radio.channel('header').trigger('reset');
    Backbone.Radio.channel('breadcrumb').trigger('ready');
    Backbone.Radio.channel('overlay').trigger('ready');
    this.onReady();
    return true;
  };

  Application.prototype.onReady = function() {
    Backbone.history.start();
    return Backbone.Radio.channel('sidebar').trigger('reset');
  };

  Application.prototype.redirectTo = function(route) {
    window.location = route;
    return true;
  };

  return Application;

})(Marionette.Service);

module.exports = Application;



},{}],2:[function(require,module,exports){
var ApplicationLayout,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ApplicationLayout = (function(superClass) {
  extend(ApplicationLayout, superClass);

  function ApplicationLayout() {
    return ApplicationLayout.__super__.constructor.apply(this, arguments);
  }

  ApplicationLayout.prototype.el = 'body';

  ApplicationLayout.prototype.template = false;

  ApplicationLayout.prototype.regions = {
    header: '[app-region=header]',
    sidebar: '[app-region=sidebar]',
    breadcrumb: '[app-region=breadcrumb]',
    overlay: '[app-region=overlay]',
    flash: '[app-region=flash]',
    main: '[app-region=main]'
  };

  return ApplicationLayout;

})(Marionette.LayoutView);

module.exports = new ApplicationLayout().render();



},{}],3:[function(require,module,exports){
module.exports = {
  SubmitButton: require('hn_behaviors/lib/submitButton'),
  Flashes: require('hn_behaviors/lib/flashes'),
  ModelEvents: require('hn_behaviors/lib/modelEvents'),
  BindInputs: require('hn_behaviors/lib/bindInputs'),
  Tooltips: require('hn_behaviors/lib/tooltips'),
  SelectableChild: require('./selectableChild')
};



},{"./selectableChild":4,"hn_behaviors/lib/bindInputs":44,"hn_behaviors/lib/flashes":45,"hn_behaviors/lib/modelEvents":46,"hn_behaviors/lib/submitButton":47,"hn_behaviors/lib/tooltips":48}],4:[function(require,module,exports){
var SelectableChild,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

SelectableChild = (function(superClass) {
  extend(SelectableChild, superClass);

  function SelectableChild() {
    return SelectableChild.__super__.constructor.apply(this, arguments);
  }

  SelectableChild.prototype.css = {
    active: 'active'
  };

  SelectableChild.prototype.events = {
    'click': 'onClick'
  };

  SelectableChild.prototype.modelEvents = {
    'selected': 'onClick'
  };

  SelectableChild.prototype.onRender = function() {
    if (!this.options.setActive) {
      return;
    }
    if (this.view.model.collection._activeModel === this.view.model.id) {
      return this.$el.trigger('click');
    }
  };

  SelectableChild.prototype.onSelected = function() {
    if (!this.options.setActive) {
      return;
    }
    this.view.model.collection._setActiveModel(this.view.model.id);
    return this.view.model.collection.trigger('selected:model', this.view.model);
  };

  SelectableChild.prototype.onClick = function(e) {
    if (this.view.onClick) {
      return this.view.onClick(e);
    }
    if (!this.options.doubleClick) {
      if (e != null) {
        e.preventDefault();
      }
    }
    if (this.$el.hasClass(this.css.active)) {
      return;
    }
    if (e != null) {
      e.preventDefault();
    }
    this.view.triggerMethod('selected');
    return this.$el.addClass(this.css.active).siblings().removeClass(this.css.active);
  };

  return SelectableChild;

})(Marionette.Behavior);

module.exports = SelectableChild;



},{}],5:[function(require,module,exports){
var HeaderService, LayoutView,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

LayoutView = require('./views/layout');

HeaderService = (function(superClass) {
  extend(HeaderService, superClass);

  function HeaderService() {
    return HeaderService.__super__.constructor.apply(this, arguments);
  }

  HeaderService.prototype.initialize = function() {
    return this.container = this.options.container;
  };

  HeaderService.prototype.radioEvents = {
    'header reset': 'reset'
  };

  HeaderService.prototype.reset = function() {
    return this.container.show(new LayoutView());
  };

  return HeaderService;

})(Marionette.Service);

module.exports = HeaderService;



},{"./views/layout":6}],6:[function(require,module,exports){
var HeaderView,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

HeaderView = (function(superClass) {
  extend(HeaderView, superClass);

  function HeaderView() {
    return HeaderView.__super__.constructor.apply(this, arguments);
  }

  HeaderView.prototype.template = require('./templates/header');

  HeaderView.prototype.className = 'nav navbar navbar-static-top navbar-light';

  HeaderView.prototype.events = {
    'click .navbar-brand': 'toggleSidebar'
  };

  HeaderView.prototype.toggleSidebar = function() {
    return Backbone.Radio.channel('sidebar').trigger('toggle');
  };

  return HeaderView;

})(Marionette.LayoutView);

module.exports = HeaderView;



},{"./templates/header":7}],7:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<a class=\"navbar-brand btn btn-secondary btn-circle\"><i class=\"fa fa-fw fa-cutlery\"></i></a><div class=\"navbar-brand title\">NYS HEALTH INSPECTIONS</div>");;return buf.join("");
};
},{"jade/runtime":69}],8:[function(require,module,exports){
var SidebarComponent, SidebarView,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

SidebarView = require('./view');

SidebarComponent = (function(superClass) {
  extend(SidebarComponent, superClass);

  function SidebarComponent() {
    return SidebarComponent.__super__.constructor.apply(this, arguments);
  }

  SidebarComponent.prototype.radioEvents = {
    'sidebar reset': 'showView',
    'sidebar toggle': 'toggleSidebar',
    'sidebar hide': 'hideSidebar'
  };

  SidebarComponent.prototype.showView = function() {
    this.view = new SidebarView({
      modules: this.modules
    });
    return this.options.container.show(this.view);
  };

  SidebarComponent.prototype.hideSidebar = function() {
    if (!this.view) {
      return;
    }
    return $('body').removeClass('sidebar-active');
  };

  SidebarComponent.prototype.toggleSidebar = function() {
    if (!this.view) {
      return;
    }
    return $('body').toggleClass('sidebar-active');
  };

  return SidebarComponent;

})(Marionette.Service);

module.exports = SidebarComponent;



},{"./view":10}],9:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (items, undefined) {
jade_mixins["sidebarLink"] = jade_interp = function(opts){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<a" + (jade.attr("href", opts.href, true, false)) + " class=\"nav-link\"><i" + (jade.cls(['fa','fa-fw','fa-lg','m-r-1',opts.icon], [null,null,null,null,true])) + "></i>" + (jade.escape(null == (jade_interp = opts.title) ? "" : jade_interp)) + "</a>");
if ( opts.divider)
{
buf.push("<a class=\"nav-link divider\"></a>");
}
};
buf.push("");
// iterate items
;(function(){
  var $$obj = items;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var item = $$obj[$index];

jade_mixins["sidebarLink"](item);
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var item = $$obj[$index];

jade_mixins["sidebarLink"](item);
    }

  }
}).call(this);
}.call(this,"items" in locals_for_with?locals_for_with.items:typeof items!=="undefined"?items:undefined,"undefined" in locals_for_with?locals_for_with.undefined:typeof undefined!=="undefined"?undefined:undefined));;return buf.join("");
};
},{"jade/runtime":69}],10:[function(require,module,exports){
var SidebarView,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

SidebarView = (function(superClass) {
  extend(SidebarView, superClass);

  function SidebarView() {
    return SidebarView.__super__.constructor.apply(this, arguments);
  }

  SidebarView.prototype.template = require('./template');

  SidebarView.prototype.className = 'nav nav-pills nav-stacked';

  SidebarView.prototype.tagName = 'nav';

  SidebarView.prototype.menuItems = [
    {
      href: '#',
      icon: 'fa-home',
      title: 'Dashboard'
    }, {
      href: '#about',
      icon: 'fa-question-circle',
      title: 'About',
      divider: true
    }
  ];

  SidebarView.prototype.events = {
    'click a': 'onClicked'
  };

  SidebarView.prototype.onClicked = function() {
    return Backbone.Radio.channel('sidebar').trigger('hide');
  };

  SidebarView.prototype.serializeData = function() {
    return {
      items: this.menuItems
    };
  };

  return SidebarView;

})(Marionette.LayoutView);

module.exports = SidebarView;



},{"./template":9}],11:[function(require,module,exports){
require('./jwt');

require('./marionette');



},{"./jwt":12,"./marionette":13}],12:[function(require,module,exports){
$.ajaxSetup({
  beforeSend: function(xhr) {
    var token;
    token = localStorage.getItem('token');
    if (token) {
      xhr.setRequestHeader('Authorization', 'JWT ' + token);
    }
  }
});



},{}],13:[function(require,module,exports){
Marionette.Behaviors.behaviorsLookup = function() {
  return require('../behaviors');
};



},{"../behaviors":3}],14:[function(require,module,exports){
var App, AppLayout, BreadcrumbComponent, FlashComponent, HeaderComponent, HomeModule, OverlayComponent, SidebarComponent;

require('./config');

App = require('./app');

AppLayout = require('./application/views/layout');

require('hn_entities/lib/config');

HeaderComponent = require('./components/header/component');

SidebarComponent = require('./components/sidebar/component');

BreadcrumbComponent = require('hn_breadcrumb/lib/component');

OverlayComponent = require('hn_overlay/lib/component');

FlashComponent = require('hn_flash/lib/component');

new HeaderComponent({
  container: AppLayout.header
});

new SidebarComponent({
  container: AppLayout.sidebar
});

new BreadcrumbComponent({
  container: AppLayout.breadcrumb
});

new OverlayComponent({
  container: AppLayout.overlay
});

new FlashComponent({
  container: AppLayout.flash
});

require('./modules/params/factory');

HomeModule = require('./modules/home/router');

new HomeModule({
  container: AppLayout.main
});

$(document).on('ready', (function(_this) {
  return function() {
    return new App();
  };
})(this));



},{"./app":1,"./application/views/layout":2,"./components/header/component":5,"./components/sidebar/component":8,"./config":11,"./modules/home/router":37,"./modules/params/factory":38,"hn_breadcrumb/lib/component":49,"hn_entities/lib/config":52,"hn_flash/lib/component":55,"hn_overlay/lib/component":60}],15:[function(require,module,exports){
var AboutRoute, LayoutView,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

LayoutView = require('./views/layout');

AboutRoute = (function(superClass) {
  extend(AboutRoute, superClass);

  function AboutRoute() {
    return AboutRoute.__super__.constructor.apply(this, arguments);
  }

  AboutRoute.prototype.title = 'NYS Health Inspections - About';

  AboutRoute.prototype.breadcrumbs = [
    {
      text: 'About'
    }
  ];

  AboutRoute.prototype.render = function() {
    return this.container.show(new LayoutView());
  };

  return AboutRoute;

})(require('hn_routing/lib/route'));

module.exports = AboutRoute;



},{"./views/layout":16,"hn_routing/lib/route":61}],16:[function(require,module,exports){
var AboutView,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

AboutView = (function(superClass) {
  extend(AboutView, superClass);

  function AboutView() {
    return AboutView.__super__.constructor.apply(this, arguments);
  }

  AboutView.prototype.template = require('./templates/layout');

  AboutView.prototype.className = 'container';

  return AboutView;

})(Mn.LayoutView);

module.exports = AboutView;



},{"./templates/layout":17}],17:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div class=\"row\"><div class=\"col-xs-12\"><div class=\"card card-block\"><div class=\"row\"><div class=\"col-xs-12 text-center\"><p class=\"lead\">Built by&nbsp;<a href=\"http://aeks.co\" target=\"_blank\">Alexander Schwartzberg</a>&nbsp;for&nbsp;<a href=\"http://opendataday.org/\" target=\"_blank\">Open Data Day 2017.</a></p><p class=\"lead\">Data pulled from&nbsp;<a href=\"https://health.data.ny.gov/Health/Food-Service-Establishment-Inspections-Beginning-2/2hcc-shji\" target=\"_blank\">Health Data NY</a>.</p></div></div><div class=\"row m-t-2\"><div class=\"col-xs-12 text-center\"><a href=\"https://github.com/aeksco/nys_health\" target=\"_blank\" class=\"btn btn-lg btn-secondary\"><i class=\"fa fa-fw fa-github\"></i>&nbsp;\nGithub Repository</a></div></div><div class=\"row m-t-2\"><div class=\"col-xs-12 text-center\"><p class=\"lead\">Powered by</p><a href=\"http://www.onehudson.io/\" target=\"_blank\"><img src=\"./img/one_hudson.png\"/></a></div></div></div></div></div>");;return buf.join("");
};
},{"jade/runtime":69}],18:[function(require,module,exports){
var DashboardRoute, LayoutView,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

LayoutView = require('./views/layout');

DashboardRoute = (function(superClass) {
  extend(DashboardRoute, superClass);

  function DashboardRoute() {
    return DashboardRoute.__super__.constructor.apply(this, arguments);
  }

  DashboardRoute.prototype.title = 'NYS Health Inspections - Dashboard';

  DashboardRoute.prototype.breadcrumbs = [
    {
      text: 'Dashboard'
    }
  ];

  DashboardRoute.prototype.fetch = function() {
    this.params = Backbone.Radio.channel('params').request('model');
    return Backbone.Radio.channel('data').request('collection').then((function(_this) {
      return function(collection) {
        return _this.collection = collection;
      };
    })(this));
  };

  DashboardRoute.prototype.render = function() {
    return this.container.show(new LayoutView({
      collection: this.collection,
      params: this.params
    }));
  };

  return DashboardRoute;

})(require('hn_routing/lib/route'));

module.exports = DashboardRoute;



},{"./views/layout":23,"hn_routing/lib/route":61}],19:[function(require,module,exports){
var AbstractFiltersView, FilterView,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

AbstractFiltersView = (function(superClass) {
  extend(AbstractFiltersView, superClass);

  function AbstractFiltersView() {
    return AbstractFiltersView.__super__.constructor.apply(this, arguments);
  }

  AbstractFiltersView.prototype.globalAttr = '$global';

  AbstractFiltersView.prototype.globalAttrs = null;

  AbstractFiltersView.prototype.behaviors = {
    Tooltips: {}
  };

  AbstractFiltersView.prototype.ui = {
    input: 'input',
    select: 'select',
    clear: '[data-click=clear]'
  };

  AbstractFiltersView.prototype.events = {
    'input  @ui.input': 'throttleInput',
    'change @ui.select': 'filterCollection',
    'click  @ui.clear': 'clear'
  };

  AbstractFiltersView.prototype.throttledFilter = null;

  AbstractFiltersView.prototype.throttleInput = function() {
    this.throttledFilter || (this.throttledFilter = _.throttle(this.filterCollection, 750));
    return this.throttledFilter();
  };

  AbstractFiltersView.prototype.clear = function() {
    this.ui.input.val('');
    this.ui.select.val('');
    return this.filterCollection();
  };

  AbstractFiltersView.prototype.filterCollection = function() {
    var attr, data, i, len, obj, query, queryData, ref;
    data = Backbone.Syphon.serialize(this);
    if (this.globalAttrs && (data[this.globalAttr] != null)) {
      if (!data[this.globalAttr]) {
        return this.collection.applyFilter({});
      }
      query = {
        $or: []
      };
      ref = this.globalAttrs;
      for (i = 0, len = ref.length; i < len; i++) {
        attr = ref[i];
        obj = {};
        obj[attr] = {
          $likeI: data[this.globalAttr]
        };
        query['$or'].push(obj);
      }
    } else {
      queryData = [];
      _.mapObject(data, (function(_this) {
        return function(val, key) {
          if (!val) {
            return delete data[key];
          }
          obj = {};
          obj[key] = {
            $likeI: val
          };
          return queryData.push(obj);
        };
      })(this));
      query = {
        $and: queryData
      };
    }
    return this.collection.applyFilter(query);
  };

  AbstractFiltersView.prototype.onBeforeDestroy = function() {
    return this.clear();
  };

  return AbstractFiltersView;

})(Mn.LayoutView);

FilterView = (function(superClass) {
  extend(FilterView, superClass);

  function FilterView() {
    return FilterView.__super__.constructor.apply(this, arguments);
  }

  FilterView.prototype.className = 'row';

  FilterView.prototype.template = require('./templates/filter');

  FilterView.prototype.globalAttrs = ['operation_name'];

  FilterView.prototype.templateHelpers = function() {
    return {
      placeholder: 'Business Name'
    };
  };

  return FilterView;

})(AbstractFiltersView);

module.exports = FilterView;



},{"./templates/filter":25}],20:[function(require,module,exports){
var FormView,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

FormView = (function(superClass) {
  extend(FormView, superClass);

  function FormView() {
    return FormView.__super__.constructor.apply(this, arguments);
  }

  FormView.prototype.template = require('./templates/form');

  FormView.prototype.className = 'card card-block m-b-0';

  FormView.prototype.events = {
    'change select': 'onSelectChange'
  };

  FormView.prototype.templateHelpers = function() {
    return {
      cities: this.options.params.get('cities'),
      counties: this.options.params.get('counties'),
      zips: this.options.params.get('zips')
    };
  };

  FormView.prototype.onRender = function() {
    return setTimeout(this.initSelect2, 200);
  };

  FormView.prototype.initSelect2 = function() {
    return $('select').select2({
      placehoder: 'City'
    });
  };

  FormView.prototype.onSelectChange = function(e) {
    var data;
    data = Backbone.Syphon.serialize(this);
    data = {
      facility_city: data.city
    };
    return this.collection.search(data);
  };

  return FormView;

})(Mn.LayoutView);

module.exports = FormView;



},{"./templates/form":26}],21:[function(require,module,exports){
var ItemDetail, MapView, ViewSelector, ViolationItem, ViolationList, ViolationLoader,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

MapView = require('./map');

ViolationItem = (function(superClass) {
  extend(ViolationItem, superClass);

  function ViolationItem() {
    return ViolationItem.__super__.constructor.apply(this, arguments);
  }

  ViolationItem.prototype.tagName = 'tr';

  ViolationItem.prototype.template = require('./templates/violation_item');

  ViolationItem.prototype.behaviors = {
    Tooltips: {}
  };

  ViolationItem.prototype.className = function() {
    if (this.model.isCritical()) {
      return 'table-danger';
    } else if (this.model.get('violation_item').toLowerCase() === 'none') {
      return 'table-success';
    } else {
      return 'table-warning';
    }
  };

  ViolationItem.prototype.templateHelpers = function() {
    return {
      date: moment(this.model.get('date_of_inspection')).format('MM/DD/YY')
    };
  };

  ViolationItem.prototype.serializeData = function() {
    var d;
    d = ViolationItem.__super__.serializeData.apply(this, arguments);
    console.log(d);
    return d;
  };

  return ViolationItem;

})(Mn.LayoutView);

ViolationList = (function(superClass) {
  extend(ViolationList, superClass);

  function ViolationList() {
    return ViolationList.__super__.constructor.apply(this, arguments);
  }

  ViolationList.prototype.className = 'row';

  ViolationList.prototype.template = require('./templates/violation_list');

  ViolationList.prototype.childView = ViolationItem;

  ViolationList.prototype.childViewContainer = 'tbody';

  return ViolationList;

})(Mn.CompositeView);

ViolationLoader = (function(superClass) {
  extend(ViolationLoader, superClass);

  function ViolationLoader() {
    return ViolationLoader.__super__.constructor.apply(this, arguments);
  }

  ViolationLoader.prototype.className = 'card card-block text-center';

  ViolationLoader.prototype.template = require('./templates/loading');

  return ViolationLoader;

})(Mn.LayoutView);

ViewSelector = (function(superClass) {
  extend(ViewSelector, superClass);

  function ViewSelector() {
    return ViewSelector.__super__.constructor.apply(this, arguments);
  }

  ViewSelector.prototype.navItems = [
    {
      icon: 'fa-list-alt',
      text: 'Violations',
      trigger: 'violations',
      "default": true
    }, {
      icon: 'fa-map-o',
      text: 'Map',
      trigger: 'map'
    }
  ];

  ViewSelector.prototype.navEvents = {
    'violations': 'showViolations',
    'map': 'showMap'
  };

  ViewSelector.prototype.showViolations = function() {
    this.contentRegion.show(new ViolationLoader());
    return this.model.ensureViolations().then((function(_this) {
      return function(violations) {
        return _this.contentRegion.show(new ViolationList({
          collection: violations
        }));
      };
    })(this));
  };

  ViewSelector.prototype.showMap = function() {
    return this.contentRegion.show(new MapView({
      model: this.model
    }));
  };

  return ViewSelector;

})(require('hn_views/lib/nav'));

ItemDetail = (function(superClass) {
  extend(ItemDetail, superClass);

  function ItemDetail() {
    return ItemDetail.__super__.constructor.apply(this, arguments);
  }

  ItemDetail.prototype.className = 'card card-block';

  ItemDetail.prototype.template = require('./templates/item_detail');

  ItemDetail.prototype.regions = {
    selectorRegion: '[data-region=selector]',
    mapRegion: '[data-region=map]',
    violationsRegion: '[data-region=violations]'
  };

  ItemDetail.prototype.onRender = function() {
    return this.selectorRegion.show(new ViewSelector({
      model: this.model
    }));
  };

  return ItemDetail;

})(Mn.LayoutView);

module.exports = ItemDetail;



},{"./map":24,"./templates/item_detail":28,"./templates/loading":31,"./templates/violation_item":33,"./templates/violation_list":34,"hn_views/lib/nav":63}],22:[function(require,module,exports){
var ItemChild, ItemEmpty, ItemList,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ItemEmpty = (function(superClass) {
  extend(ItemEmpty, superClass);

  function ItemEmpty() {
    return ItemEmpty.__super__.constructor.apply(this, arguments);
  }

  ItemEmpty.prototype.template = require('./templates/item_empty');

  ItemEmpty.prototype.className = 'list-group-item list-group-item-warning';

  return ItemEmpty;

})(Mn.LayoutView);

ItemChild = (function(superClass) {
  extend(ItemChild, superClass);

  function ItemChild() {
    return ItemChild.__super__.constructor.apply(this, arguments);
  }

  ItemChild.prototype.template = require('./templates/item_child');

  ItemChild.prototype.className = 'list-group-item';

  ItemChild.prototype.behaviors = {
    SelectableChild: {}
  };

  return ItemChild;

})(Mn.LayoutView);

ItemList = (function(superClass) {
  extend(ItemList, superClass);

  function ItemList() {
    return ItemList.__super__.constructor.apply(this, arguments);
  }

  ItemList.prototype.className = 'list-group';

  ItemList.prototype.childView = ItemChild;

  ItemList.prototype.emptyView = ItemEmpty;

  return ItemList;

})(Mn.CollectionView);

module.exports = ItemList;



},{"./templates/item_child":27,"./templates/item_empty":29}],23:[function(require,module,exports){
var DashboardView, FilterView, FormView, ItemDetail, ItemList, MapView, PaginationView,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

FormView = require('./form');

FilterView = require('./filter');

MapView = require('./map');

ItemList = require('./itemList');

ItemDetail = require('./itemDetail');

PaginationView = require('hn_views/lib/pagination');

DashboardView = (function(superClass) {
  extend(DashboardView, superClass);

  function DashboardView() {
    this.onCollectionReset = bind(this.onCollectionReset, this);
    this.onCollectionSync = bind(this.onCollectionSync, this);
    return DashboardView.__super__.constructor.apply(this, arguments);
  }

  DashboardView.prototype.template = require('./templates/layout');

  DashboardView.prototype.className = 'container-fluid';

  DashboardView.prototype.regions = {
    formRegion: '[data-region=form]',
    filterRegion: '[data-region=filter]',
    listRegion: '[data-region=list]',
    paginationRegion: '[data-region=pagination]',
    detailRegion: '[data-region=detail]'
  };

  DashboardView.prototype.collectionEvents = {
    'sync': 'onCollectionSync',
    'reset': 'onCollectionReset'
  };

  DashboardView.prototype.onCollectionSync = function() {
    this.showFilterView();
    return this.onCollectionReset();
  };

  DashboardView.prototype.onCollectionReset = function() {
    console.log('RESET');
    console.log(this.collection.at(0));
    return setTimeout((function(_this) {
      return function() {
        var ref;
        return (ref = _this.collection.at(0)) != null ? ref.trigger('selected') : void 0;
      };
    })(this), 200);
  };

  DashboardView.prototype.onRender = function() {
    var listView;
    this.formRegion.show(new FormView({
      collection: this.collection,
      params: this.options.params
    }));
    this.showFilterView();
    listView = new ItemList({
      collection: this.collection
    });
    listView.on('childview:selected', (function(_this) {
      return function(view) {
        return _this.showDetailView(view.model);
      };
    })(this));
    this.listRegion.show(listView);
    this.onCollectionSync();
    return this.paginationRegion.show(new PaginationView({
      collection: this.collection,
      pager: true
    }));
  };

  DashboardView.prototype.showDetailView = function(dataset) {
    return this.detailRegion.show(new ItemDetail({
      model: dataset
    }));
  };

  DashboardView.prototype.showFilterView = function() {
    return this.filterRegion.show(new FilterView({
      collection: this.collection
    }));
  };

  return DashboardView;

})(Mn.LayoutView);

module.exports = DashboardView;



},{"./filter":19,"./form":20,"./itemDetail":21,"./itemList":22,"./map":24,"./templates/layout":30,"hn_views/lib/pagination":66}],24:[function(require,module,exports){
var MapView,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

MapView = (function(superClass) {
  extend(MapView, superClass);

  function MapView() {
    this.addMarker = bind(this.addMarker, this);
    this.addMarkers = bind(this.addMarkers, this);
    this.initMap = bind(this.initMap, this);
    return MapView.__super__.constructor.apply(this, arguments);
  }

  MapView.prototype.className = 'card card-block';

  MapView.prototype.template = require('./templates/map');

  MapView.prototype.onRender = function() {
    return setTimeout(this.initMap, 100);
  };

  MapView.prototype.initMap = function() {
    var itemLocation, mapOpts;
    itemLocation = {
      lat: Number(this.model.get('latitude')),
      lng: Number(this.model.get('longitude'))
    };
    mapOpts = {
      zoom: 12,
      center: itemLocation
    };
    this.map = new google.maps.Map(document.getElementById('map'), mapOpts);
    this.addMarker(this.model);
  };

  MapView.prototype.addMarkers = function() {
    var i, len, model, ref, results;
    if (!this.collection) {
      return;
    }
    ref = this.collection.models;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      model = ref[i];
      results.push(this.addMarker(model));
    }
    return results;
  };

  MapView.prototype.addMarker = function(model) {
    var itemLocation, marker;
    itemLocation = {
      lat: Number(model.get('latitude')),
      lng: Number(model.get('longitude'))
    };
    return marker = new google.maps.Marker({
      position: itemLocation,
      map: this.map
    });
  };

  return MapView;

})(Mn.LayoutView);

module.exports = MapView;



},{"./templates/map":32}],25:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (placeholder) {
buf.push("<div class=\"col-xs-12\"><div class=\"form-inline\"><div class=\"form-group w-100\"><label>Filter Results</label><div class=\"input-group w-100\"><input type=\"text\" name=\"$global\" autocomplete=\"off\"" + (jade.attr("placeholder", placeholder || 'Search', true, false)) + " class=\"form-control\"/><div data-toggle=\"tooltip\" data-placement=\"right\" title=\"Clear Filter\" data-click=\"clear\" class=\"btn btn-secondary input-group-addon\"><i class=\"fa fa-fw fa-times\"></i></div></div></div></div></div>");}.call(this,"placeholder" in locals_for_with?locals_for_with.placeholder:typeof placeholder!=="undefined"?placeholder:undefined));;return buf.join("");
};
},{"jade/runtime":69}],26:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (cities, undefined) {
buf.push("<div class=\"row\"><div class=\"col-xs-12\"><div class=\"form-group\"><label>Search By City</label><select name=\"city\" placeholder=\"City\" class=\"form-control\">");
// iterate cities
;(function(){
  var $$obj = cities;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var c = $$obj[$index];

if ( c == 'TROY')
{
buf.push("<option selected=\"selected\">" + (jade.escape(null == (jade_interp = c) ? "" : jade_interp)) + "</option>");
}
else
{
buf.push("<option>" + (jade.escape(null == (jade_interp = c) ? "" : jade_interp)) + "</option>");
}
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var c = $$obj[$index];

if ( c == 'TROY')
{
buf.push("<option selected=\"selected\">" + (jade.escape(null == (jade_interp = c) ? "" : jade_interp)) + "</option>");
}
else
{
buf.push("<option>" + (jade.escape(null == (jade_interp = c) ? "" : jade_interp)) + "</option>");
}
    }

  }
}).call(this);

buf.push("</select></div></div></div>");}.call(this,"cities" in locals_for_with?locals_for_with.cities:typeof cities!=="undefined"?cities:undefined,"undefined" in locals_for_with?locals_for_with.undefined:typeof undefined!=="undefined"?undefined:undefined));;return buf.join("");
};
},{"jade/runtime":69}],27:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (operation_name) {
buf.push("<div class=\"row\"><div class=\"col-xs-12\"><p class=\"m-a-0\">" + (jade.escape(null == (jade_interp = operation_name) ? "" : jade_interp)) + "</p></div></div>");}.call(this,"operation_name" in locals_for_with?locals_for_with.operation_name:typeof operation_name!=="undefined"?operation_name:undefined));;return buf.join("");
};
},{"jade/runtime":69}],28:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (facility_address, facility_city, facility_municipality, facility_postal_zipcode, food_service_description, food_service_type, operation_name, perm_operator_first_name, perm_operator_last_name, permitted_corp_name) {
jade_mixins["smallItem"] = jade_interp = function(label, text){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<small><strong>" + (jade.escape((jade_interp = label) == null ? '' : jade_interp)) + ":</strong>&nbsp;\n" + (jade.escape((jade_interp = text) == null ? '' : jade_interp)) + "</small><br/>");
};
buf.push("<div class=\"row\"><div class=\"col-xs-12\"><div class=\"row\"><div class=\"col-xs-6\"><p class=\"lead m-b-0\">" + (jade.escape(null == (jade_interp = operation_name) ? "" : jade_interp)) + "</p><small>" + (jade.escape(null == (jade_interp = facility_address) ? "" : jade_interp)) + "</small><br/><small>" + (jade.escape((jade_interp = facility_city) == null ? '' : jade_interp)) + ", " + (jade.escape((jade_interp = facility_municipality) == null ? '' : jade_interp)) + " " + (jade.escape((jade_interp = facility_postal_zipcode) == null ? '' : jade_interp)) + "</small></div><div class=\"col-xs-6\">");
if ( permitted_corp_name)
{
jade_mixins["smallItem"]('Corporation', permitted_corp_name);
}
if ( perm_operator_first_name)
{
jade_mixins["smallItem"]('Operator', perm_operator_last_name + ', ' + perm_operator_first_name);
}
if ( food_service_type)
{
jade_mixins["smallItem"]('Service', food_service_type);
}
if ( food_service_description)
{
jade_mixins["smallItem"]('Type', food_service_description);
}
buf.push("</div></div></div><div class=\"col-xs-12\"><hr/></div><div data-region=\"selector\" class=\"col-xs-12\"></div></div>");}.call(this,"facility_address" in locals_for_with?locals_for_with.facility_address:typeof facility_address!=="undefined"?facility_address:undefined,"facility_city" in locals_for_with?locals_for_with.facility_city:typeof facility_city!=="undefined"?facility_city:undefined,"facility_municipality" in locals_for_with?locals_for_with.facility_municipality:typeof facility_municipality!=="undefined"?facility_municipality:undefined,"facility_postal_zipcode" in locals_for_with?locals_for_with.facility_postal_zipcode:typeof facility_postal_zipcode!=="undefined"?facility_postal_zipcode:undefined,"food_service_description" in locals_for_with?locals_for_with.food_service_description:typeof food_service_description!=="undefined"?food_service_description:undefined,"food_service_type" in locals_for_with?locals_for_with.food_service_type:typeof food_service_type!=="undefined"?food_service_type:undefined,"operation_name" in locals_for_with?locals_for_with.operation_name:typeof operation_name!=="undefined"?operation_name:undefined,"perm_operator_first_name" in locals_for_with?locals_for_with.perm_operator_first_name:typeof perm_operator_first_name!=="undefined"?perm_operator_first_name:undefined,"perm_operator_last_name" in locals_for_with?locals_for_with.perm_operator_last_name:typeof perm_operator_last_name!=="undefined"?perm_operator_last_name:undefined,"permitted_corp_name" in locals_for_with?locals_for_with.permitted_corp_name:typeof permitted_corp_name!=="undefined"?permitted_corp_name:undefined));;return buf.join("");
};
},{"jade/runtime":69}],29:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("No Matches Found.");;return buf.join("");
};
},{"jade/runtime":69}],30:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div class=\"row\"><div class=\"col-xs-4\"><div class=\"row\"><div data-region=\"form\" class=\"col-xs-12\"></div><div class=\"col-xs-12\"><div data-region=\"filter\" class=\"card card-block m-t-1\"></div></div><div data-region=\"pagination\" class=\"col-xs-12\"></div><div data-region=\"list\" class=\"col-xs-12\"></div></div></div><div data-region=\"detail\" class=\"col-xs-8\"></div></div>");;return buf.join("");
};
},{"jade/runtime":69}],31:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<i class=\"fa fa-fw fa-2x fa-spin fa-spinner m-y-2\"></i>");;return buf.join("");
};
},{"jade/runtime":69}],32:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div class=\"row\"><div class=\"col-xs-12\"><div id=\"map\" style=\"height:20rem;\"></div></div></div>");;return buf.join("");
};
},{"jade/runtime":69}],33:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (date, inspection_comments, violation_description) {
buf.push("<td>" + (jade.escape(null == (jade_interp = date) ? "" : jade_interp)) + "</td><td>");
if ( inspection_comments && violation_description)
{
buf.push("<i class=\"fa fa-fw fa-warning\"></i>&nbsp;" + (jade.escape(null == (jade_interp = violation_description) ? "" : jade_interp)) + "&nbsp;<a" + (jade.attr("title", inspection_comments, true, false)) + " data-toggle=\"tooltip\"><i class=\"fa fa-fw fa-comment\"></i>Inspector Comments</a>");
}
else
{
if ( violation_description)
{
buf.push("<i class=\"fa fa-fw fa-warning\"></i>&nbsp;" + (jade.escape(null == (jade_interp = violation_description) ? "" : jade_interp)));
}
else
{
buf.push("<i class=\"fa fa-fw fa-check\"></i>&nbsp;\nPassed!");
}
}
buf.push("</td>");}.call(this,"date" in locals_for_with?locals_for_with.date:typeof date!=="undefined"?date:undefined,"inspection_comments" in locals_for_with?locals_for_with.inspection_comments:typeof inspection_comments!=="undefined"?inspection_comments:undefined,"violation_description" in locals_for_with?locals_for_with.violation_description:typeof violation_description!=="undefined"?violation_description:undefined));;return buf.join("");
};
},{"jade/runtime":69}],34:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div class=\"col-xs-12\"><p class=\"lead\">Violation History</p><table class=\"table table-bordered\"><thead><th>Date</th><th>Description</th></thead><tbody></tbody></table></div>");;return buf.join("");
};
},{"jade/runtime":69}],35:[function(require,module,exports){
var DataCollection, DataModel, ViolationCollection, ViolationModel,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ViolationModel = (function(superClass) {
  extend(ViolationModel, superClass);

  function ViolationModel() {
    return ViolationModel.__super__.constructor.apply(this, arguments);
  }

  ViolationModel.prototype.defaults = {};

  ViolationModel.prototype.isCritical = function() {
    return this.get('critical_violation') === "Critical Violation";
  };

  return ViolationModel;

})(Backbone.Model);

ViolationCollection = (function(superClass) {
  extend(ViolationCollection, superClass);

  function ViolationCollection() {
    return ViolationCollection.__super__.constructor.apply(this, arguments);
  }

  ViolationCollection.prototype.model = ViolationModel;

  ViolationCollection.prototype.url = 'https://health.data.ny.gov/resource/5ib6-49en.json';

  ViolationCollection.prototype.comparator = function(mod1, mod2) {
    var d1, d2;
    d1 = new Date(mod1.get('date_of_inspection'));
    d2 = new Date(mod2.get('date_of_inspection'));
    if (d1 < d2) {
      return 1;
    } else if (d2 < d1) {
      return -1;
    } else {
      return 0;
    }
  };

  return ViolationCollection;

})(Backbone.Collection);

DataModel = (function(superClass) {
  extend(DataModel, superClass);

  function DataModel() {
    return DataModel.__super__.constructor.apply(this, arguments);
  }

  DataModel.prototype.idAttribute = 'nys_health_operation_id';

  DataModel.prototype.ensureViolations = function() {
    return new Promise((function(_this) {
      return function(resolve, reject) {
        if (_this.violations) {
          return resolve(_this.violations);
        }
        _this.violations = new ViolationCollection();
        return _this.violations.fetch({
          data: {
            nys_health_operation_id: _this.id
          },
          success: function() {
            return resolve(_this.violations);
          }
        });
      };
    })(this));
  };

  return DataModel;

})(Backbone.Model);

DataCollection = (function(superClass) {
  extend(DataCollection, superClass);

  function DataCollection() {
    return DataCollection.__super__.constructor.apply(this, arguments);
  }

  DataCollection.prototype.model = DataModel;

  DataCollection.prototype.url = 'https://health.data.ny.gov/resource/5ib6-49en.json';

  DataCollection.prototype.mode = 'client';

  DataCollection.prototype.state = {
    pageSize: 10
  };

  DataCollection.prototype.firstPage = function() {
    return this.getPage(this.state.firstPage);
  };

  DataCollection.prototype.prevPage = function() {
    if (this.hasPreviousPage()) {
      return this.getPreviousPage();
    }
  };

  DataCollection.prototype.nextPage = function() {
    if (this.hasNextPage()) {
      return this.getNextPage();
    }
  };

  DataCollection.prototype.lastPage = function() {
    return this.getPage(this.state.lastPage);
  };

  DataCollection.prototype.search = function(data) {
    if (data == null) {
      data = {};
    }
    delete this.unfilteredCollection;
    return this.fetch({
      data: data,
      reset: true
    });
  };

  DataCollection.prototype.applyFilter = function(query, options) {
    var models;
    if (options == null) {
      options = {};
    }
    if (_.isEqual(this.query, query)) {
      return;
    }
    this.unfilteredCollection || (this.unfilteredCollection = new Backbone.Collection(this.fullCollection.models));
    if (this.fullCollection.length === this.unfilteredCollection.length && _.isEmpty(query)) {
      return this.fullCollection.models;
    }
    this.query = query;
    models = _.query(_.clone(this.unfilteredCollection.toJSON()), query);
    this.fullCollection.reset(models);
    return models;
  };

  return DataCollection;

})(Backbone.PageableCollection);

module.exports = {
  Model: DataModel,
  Collection: DataCollection
};



},{}],36:[function(require,module,exports){
var DataFactory, Entities,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Entities = require('./entities');

DataFactory = (function(superClass) {
  extend(DataFactory, superClass);

  function DataFactory() {
    return DataFactory.__super__.constructor.apply(this, arguments);
  }

  DataFactory.prototype.radioRequests = {
    'data collection': 'getCollection'
  };

  DataFactory.prototype.initialize = function() {
    return this.cached = new Entities.Collection();
  };

  DataFactory.prototype.getCollection = function() {
    return new Promise((function(_this) {
      return function(resolve, reject) {
        return _this.cached.fetch({
          parse: true,
          data: {
            "$$app_token": "Avs1fDCIaC9lLqwDz5IQaftgU",
            "facility_city": 'TROY'
          },
          success: function() {
            return resolve(_this.cached);
          },
          error: function() {
            return reject(_this.cached);
          }
        });
      };
    })(this));
  };

  return DataFactory;

})(Marionette.Service);

module.exports = new DataFactory();



},{"./entities":35}],37:[function(require,module,exports){
var AboutRoute, DashboardRoute, HomeRouter,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

require('./factory');

DashboardRoute = require('./dashboard/route');

AboutRoute = require('./about/route');

HomeRouter = (function(superClass) {
  extend(HomeRouter, superClass);

  function HomeRouter() {
    return HomeRouter.__super__.constructor.apply(this, arguments);
  }

  HomeRouter.prototype.routes = {
    '(/)': 'dashboard',
    'about(/)': 'about'
  };

  HomeRouter.prototype.dashboard = function() {
    return new DashboardRoute({
      container: this.container
    });
  };

  HomeRouter.prototype.about = function() {
    return new AboutRoute({
      container: this.container
    });
  };

  return HomeRouter;

})(require('hn_routing/lib/router'));

module.exports = HomeRouter;



},{"./about/route":15,"./dashboard/route":18,"./factory":36,"hn_routing/lib/router":62}],38:[function(require,module,exports){
var ParamsFactory, QueryParams,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

QueryParams = (function(superClass) {
  extend(QueryParams, superClass);

  function QueryParams() {
    return QueryParams.__super__.constructor.apply(this, arguments);
  }

  QueryParams.prototype.defaults = {
    cities: require('./plucked/cities'),
    counties: require('./plucked/counties'),
    zips: require('./plucked/zips')
  };

  return QueryParams;

})(Backbone.Model);

ParamsFactory = (function(superClass) {
  extend(ParamsFactory, superClass);

  function ParamsFactory() {
    return ParamsFactory.__super__.constructor.apply(this, arguments);
  }

  ParamsFactory.prototype.radioRequests = {
    'params model': 'getModel'
  };

  ParamsFactory.prototype.initialize = function() {
    return this.params = new QueryParams();
  };

  ParamsFactory.prototype.getModel = function() {
    return this.params;
  };

  return ParamsFactory;

})(Marionette.Service);

module.exports = new ParamsFactory();



},{"./plucked/cities":39,"./plucked/counties":40,"./plucked/zips":41}],39:[function(require,module,exports){
module.exports = [" FARMINGDALE", " MAMARONECK", "0NEIDA", "ACCORD", "ACRA", "ADAMS", "ADAMS CENTER", "ADDISON", "AFTON", "AIRMONT", "AKRON", "Akron", "ALABAMA", "ALBANY", "Albany", "ALBANY COUNTY", "ALBANY, NY", "ALBERTSON", "ALBION", "ALBION, NEW YORK", "ALBION, NEW YORK ", "ALDER CREEK", "ALEXANDER", "Alexander", "ALEXANDRIA BAY", "Alfred", "ALFRED", "Alfred Station", "ALLEGANY", "Almond", "ALTAMONT", "ALTMAR", "ALTON", "Altona", "AMENIA", "AMHERST", "AMSTEDAM", "AMSTERDAM", "ANCRAM", "ANCRAMDALE", "Andes", "ANDES", "Andover", "Andover ", "Angelica", "ANNADALE ON HUDSON", "ANNANDALE-ON-HUDSON", "Antwerp", "ANTWERP", "APALACHIN", "APPLETON", "Apulia Station", "ARCADE", "Arcade", "ARDSLEY", "ARDSLEY-ON-HUDSON", "ARGYLE", "ARKPORT", "ARKVILLE", "Arkville", "ARMONK", "ASHLAND", "ASHVILLE", "ATHENS", "Athens", "ATLANTIC BEACH", "ATTICA", "Au Sable Forks", "AUBURN", "AURORA", "AUSABLE CHASM", "AuSable Chasm", "AUSABLE FORKS", "AuSable Forks", "AVA", "AVERILL PARK", "AVERILL PK.", "AVOCA", "AVON", "Avon", "BAINBRIDGE", "BALDWIN", "BALDWIN ", "BALDWIN HARBOR", "BALDWIN PLACE", "Baldwinsville", "BALDWINSVILLE", "BALLSTON LAKE", "BALLSTON LAKE ", "BALLSTON SPA", "BANGALL", "BANGOR", "BANKSVILLE", "BARDONIA", "BARKER", "BARNEVELD", "BARRYTOWN", "Barryville", "Batavia", "BATAVIA", "BATH", "BAYVILLE", "BEACON", "Beacon", "Bear Mountain", "Bear Mtn", "BEARSVILLE", "BEAVER DAMS", "BEAVER FALLS", "BEDFORD", "BEDFORD CORNERS", "BEDFORD HILLS", "BEDFORD VILLAGE", "Belfast", "BELLEROSE", "BELLEVILLE", "BELLMORE", "BELLVALE", "Belmont", "BEMUS POINT", "BEMUS POINT NY", "BEMUS PT.", "Bergen", "BERGEN", "BERKSHIRE", "Berlin", "BERLIN", "BERNE", "BERNHARDS BAY", "BETHANY", "Bethel", "BETHPAGE", "BIG FLATS", "BIG INDIAN", "BINGHAMTON", "Binghamton", "BLACK RIVER", "BLAUVELT", "BLISS", "BLOOMFIELD", "BLOOMFIELD ", "BLOOMING GROVE", "BLOOMINGBURG", "Bloomingburg", "BLOOMINGDALE", "BLOOMVILLE", "BLOSSVALE", "BLUE MT LAKE", "BLUE MT. LAKE", "BLUE MTN LAKE", "BLUFF POINT", "BOICEVILLE", "Bolivar", "BOLTON LANDING", "BOONVILLE", "BOUCKVILLE", "BOVINA CENTER", "BRADFORD", "BRANCHPORT", "BRANT LAKE", "BRANTINGHAM", "Brasher Falls", "Brewerton", "BREWERTON", "BREWSTER", "Brewster", "BREWSTER,  NY", "BRIARCLIFF", "BRIARCLIFF MANOR", "BRIDGEPORT", "Bridgeport", "BRIDGEWATER", "Brier Hill", "BROADALBIN", "BROCKPORT", "BROCTON", "BRONX", "BRONXVILLE", "BROOKFIELD", "BROOKTONDALE", "BROOKVILLE", "BROWNVILLE", "BRUNSWICK", "BRUSHTON", "BUCHANAN", "BULLVILLE", "BURDETT", "BURKE", "Burlingham", "BURNT HILLS", "BURT", "BYRON", "Cadyville", "CAIRO", "CALCIUM", "Caledonia", "CALEDONIA", "Callicoon", "CAMBRIDGE", "Cambridge", "CAMDEN", "CAMERON MILLS", "Camillus", "CAMILLUS", "CAMPBELL", "CAMPBELL HALL", "CANAAN", "CANAJOHARIE", "CANANDAIGIUA", "CANANDAIGUA", "CANANDAIGUA ", "CANANDAIUGA", "Canaseraga", "CANASTOTA", "CANDOR", "CANISTEO", "Canton", "CANTON", "Canton ", "CAPE VINCENT", "CARLE PLACE", "CARLISLE", "CARMEL", "Carmel", "CARMEL  NY", "CAROGA  LAKE", "CAROGA LAKE", "CARTHAGE", "CASSADAGA", "CASTILE", "CASTLETON", "Castleton", "CASTLETON-ON-HUDSON", "CASTORLAND", "CATO", "CATSKILL", "Catskill", "CATTARAUGUS", "CATTARAUGUS COUNTY", "CAYUGA", "CAYUGA COUNTY", "Cazenovia", "CAZENOVIA", "CEDARHURST", "CELORON", "CENTER LISLE", "CENTRAL BRIDGE", "CENTRAL NYACK", "CENTRAL SQUARE", "CENTRAL VALLEY", "CERES", "CHADWICKS", "Champlain", "CHAPPAQUA", "CHARLTON", "CHATEAUGAY", "CHATHAM", "CHAUMONT", "CHAUTAUQUA", "Chazy", "CHELSEA", "CHEMUNG COUNTY", "CHENANGO BRIDGE", "CHENANGO COUNTY", "CHENANGO FORKS", "Chenango Forks", "CHERRY CREEK", "CHERRY VALLEY", "CHESTER", "CHESTERTOWN", "CHESTNUT RIDGE", "Childwold", "CHILI", "CHITTENANGO", "CHURCHVILE", "CHURCHVILLE", "Churubusco", "Cicero", "CINCINNATUS", "Cinncinatus", "CIRCLEVILLE", "CLARENDON", "CLARK MILLS", "CLARKSVILLE", "CLARYVILLE", "CLAVERACK", "Clay", "CLAY", "CLAYTON", "Clayton", "CLAYVILLE", "CLEVELAND", "CLEVERDALE", "CLIFTON  PARK", "CLIFTON PARK", "CLIFTON SPRINGS", "CLIMAX", "CLINTON", "CLYDE", "CLYDE ", "CLYMER", "COBLESKILL", "Cobleskill", "Cochecton", "COEYMANS", "COHOCTON", "COHOES", "COHOES ", "COLD BROOK", "COLD SPRING", "COLD SPRING HARBOR", "COLLIERSVILLE", "COLONIE", "Colton", "COMSTOCK", "CONESUS", "CONEWANGO VALLEY", "CONGERS", "CONKILN", "CONKLIN", "Conklin", "CONSTABLE", "CONSTABLEVILLE", "CONSTANTIA", "Cooperstown", "COOPERSTOWN", "COPAKE", "COPAKE FALLS", "COPENHAGEN", "CORFU", "Corfu", "CORINTH", "CORNING", "CORNWALL", "CORNWALL ON HUDSON", "CORNWALL-ON-HUDSON", "CORNWALLVILLE", "CORNWALLVILLE,", "CORTLAND", "Cortland", "CORTLAND ", "Cortland ", "CORTLAND MANOR", "CORTLANDT", "CORTLANDT MANOR", "CORTLANT MANOR", "COWLESVILLE", "COXSACKIE", "Coxsackie", "Cranberry Lake", "CRARYVILLE", "CROGHAN", "CROPSEYVILLE", "CROSS RIVER", "CROTON", "CROTON FALLS", "CROTON ON HUDSON", "CROTON-ON-HUDSON", "CROWN POINT", "Cuba", "Cuddebackville", "CUDDEBACKVILLE", "CUYLER", "Dannemora", "DANSVIILLE", "DANSVILLE", "Dansville", "DANSVILLE ", "DARIEN", "Darien Center", "DARIEN CENTER", "Davenport", "DAVENPORT", "DAVENPORT CENTER", "DEANSBORO", "DeKalb Junction", "DELANCEY", "DELANSON", "DELEVAN", "DELHI", "Delhi", "DELMAR", "Delphi Falls", "DENMARK", "DEPAUVILLE", "DEPOSIT", "Deposit", "DERUYTER", "DeRuyter", "Dewitt", "DEWITT", "DeWitt", "DEWITTVILLE", "DEXTER", "Dexter", "DIAMOND POINT", "DICKINSON CENTER", "DOBBS FERRY", "DOLGEVILLE", "DOVER PLAINS", "Downsville", "DOWNSVILLE", "DRESDEN", "DRYDEN", "DUANESBURG", "DUNDEE", "DUNDEE ", "DUNKIRK", "Dunkirk", "DURHAM", "DURHAMVILLE", "E. BERNE", "E. RANDOLPH", "E. ROCHESTER", "E. SPRINGFIELD", "E.GREENBUSH", "EAGLE BAY", "EAGLE BRIDGE", "EARLTON", "EARLVILLE", "EAST BERNE", "EAST BLOOMFIELD ", "EAST BRANCH", "EAST CHATHAM", "EAST DURHAM", "EAST GREENBUSH", "East Greenbush", "EAST HILLS", "EAST JEWETT", "EAST MEADOW", "EAST MEREDITH", "EAST NORWICH", "EAST OTTO", "EAST PHARSALIA", "EAST RANDOLPH", "EAST ROCHESTER", "EAST ROCKAWAY", "East Syracuse", "EAST SYRACUSE", "EAST WILLISTON", "EAST WINDHAM", "EASTCHESTER", "EATON", "EDDYVILLE", "EDINBURG", "EDMESTON", "Edmeston", "Edwards", "ELBA", "Elba", "Elbridge", "ELBRIDGE", "Eldred", "ELICOTTVILLE", "ELIZABETHTOWN", "ELIZAVILLE", "ELKA PARK", "Ellenburg Center", "Ellenburg Depot", "Ellenburg Depot, NY", "ELLENVILLE", "ELLICOTTVILLE", "ELLICOTTVILLE ", "Ellington", "ELLINGTON", "ELMIRA", "ELMIRA HEIGHTS", "ELMONT", "ELMSFORD", "ELSMERE", "ENDICOTT", "Endicott", "ENDWELL", "ERIEVILLE", "ERIN", "ESOPUS", "ESPERANCE", "ESSEX", "EVANS MILLS", "FABIUS", "Fabius", "FAIR HAVEN", "FAIRPORT", "Fairport", "FALCONER", "Falconer,", "Fallsburg", "FARMINGDALE", "FARMINGTON", "FARMINGTON ", "Fayetteville", "FELTS MILLS", "Ferndale", "FEURA BUSH", "Fillmore", "FINDLEY LAKE", "FINDLEY LAKE ", "FINEVIEW", "FISHERS LANDING", "FISHKILL", "FLEISCHMANNS", "FLORAL PARK", "FLORIDA", "FLOWER HILL", "FONDA", "Forestburgh", "FORESTPORT", "FORESTVILLE", "FORT ANN", "FORT COVINGTON", "FORT EDWARD", "FORT MONTGOMERY", "FORT PLAIN", "FRANKFORT", "FRANKLIN", "FRANKLIN SQUARE", "FRANKLINVILLE", "FREDONIA", "Fredonia", "FREEDOM", "FREEHOLD", "FREEPORT", "FREEVILLE", "FREWSBURG", "Friendship", "FT EDWARD", "FT. MONTGOMERY", "FULTON", "FULTONHAM", "FULTONVILLE", "GABRIELS", "GAINESVILLE", "GALAWAY", "GALWAY", "GANG MILLS", "GANSEVOORT", "GARDEN CITY", "GARDEN CITY ", "GARDEN CITY PARK", "GARDEN CITY SOUTH", "GARDINER", "GARNERVILLE", "GARRISON", "GASPORT", "Gasport", "GENESEO", "Geneseo", "GENEVA", "Geneva", "GENEVA ", "GENOA", "GEORGETOWN", "GERMANTOWN", "GERRY", "GHENT", "GILBERTSVILLE", "Gilboa", "GILBOA", "GLASCO", "GLEN COVE", "GLEN COVE ", "GLEN HEAD", "Glen Spey", "GLENFIELD", "GLENHAM", "GLENMONT", "GLENS FALLS", "GLENVILLE", "GLENWOOD LANDING", "GLOVERSVILLE", "GOLDENS BRIDGE", "GORHAM", "GOSHEN", "Goshen", "Gouverneur", "GOWANDA", "GRAFTON", "Grahamsville", "GRAND GORGE", "Grand Gorge", "GRANITE SPRINGS", "GRANVILLE", "GREAT BEND", "GREAT NECK", "GREAT VALLEY", "GREECE", "GREEN ISLAND", "GREENE", "GREENE, NY", "GREENFIELD", "GREENFIELD CENTER", "GREENFIELD PARK", "GREENVALE", "Greenville", "GREENVILLE", "GREENWICH", "GREENWOOD", "GREENWOOD LAKE", "GREIG", "GROTON", "GUILDERLAND", "GUILDERLAND CENTER", "GUILFORD", "HADLEY", "HAGAMAN", "HAGUE", "HAINES FALLS", "HALFMOON", "HAMDEN", "HAMILTON", "Hamilton", "HAMLIN", "Hammond", "HAMMONDSPORT", "HANCOCK", "Hannacroix", "HANNACROIX", "Hannawa Falls", "HANNIBAL", "HARFORD", "HARPURSVILLE", "HARRIMAN", "HARRISON", "HARRISVILLE", "Harrisville", "HARTFORD", "HARTSDALE", "HARTWICK", "HASTINGS", "HASTINGS-ON-HUDSON", "HAVERSTRAW", "HAWTHORNE", "HECTOR", "HEMLOCK", "HEMPSTEAD", "HENDERSON", "HENDERSON HARBOR", "HENRIETTA", "HENSONVILLE", "Hensonville", "HERKIMER", "Hermon", "Heuvelton", "HEWLETT", "HEWLETT HARBOR", "HICKSVILLE", "HIGH FALLS", "HIGHLAND", "HIGHLAND FALLS", "Highland Lake", "HIGHLAND MILLS", "HIGHMOUNT", "HILLBURN", "HILLSDALE", "HILTON", "HIMROD", "HINSDALE", "HOBART", "HOGANSBURG", "HOLLAND PATENT", "HOLLEY", "HOLMES", "Homer", "HOMER", "HONEOYE", "HONEOYE ", "HONEOYE FALLS", "HOOSICK", "HOOSICK FALLS", "HOPEWELL JUNCTION", "HORNELL", "HORSEHEADS", "HORSHEADS", "Houghton", "HOWES CAVE", "HUBBARDSVILLE", "HUDSON", "HUDSON FALLS", "HUGUENOT", "HULETTS LANDING", "HUNT", "HUNTER", "HURLEY", "Hurleyville", "HYDE PARK", "HYDE PARK ", "ILION", "INDIAN LAKE", "INLET", "INTERLAKEN", "INWOOD", "IRVING", "IRVINGTON", "ISCHUA", "ISLAND PARK", "ITHACA", "Ithaca", "JACKSON HEIGHTS", "JAMESTOWN", "Jamestown", "Jamesville", "JAMESVILLE", "Jamstown", "JAVA CENTER", "JEFFERSON", "JEFFERSON VALLEY", "Jeffersonville", "JERICHO", "Jewett", "JOHNSBURG", "JOHNSON CITY", "JOHNSON CITY ", "JOHNSTOWN", "Jordan", "JORDAN", "KANONA", "KATONAH", "KATTSKILL BAY", "Kauneonga Lake", "KEENE", "KEENE VALLEY", "Keeseville", "KEESEVILLE", "KENDALL", "KENNEDY", "Kennedy", "Kenoza Lake", "KENT", "KENT LAKES", "KERHONKSON", "KEUKA PARK", "Kiamesha Lake", "KINDERHOOK", "KING FERRY", "KINGSTON", "Kirkville", "KIRKWOOD", "KIRYAS JOEL", "KRUMVILLE", "LA GRANGE", "LACONA", "LAFARGEVILLE", "Lafayette", "LAFAYETTE", "LaFayette", "LAGRANGE", "LAGRANGEVILLE", "LAKE CLEAR", "LAKE GEORGE", "Lake Huntington", "LAKE KATRINE", "LAKE LUZERNE", "LAKE PLACID", "Lake Placid", "LAKE PLACID, NY ", "LAKE PLEASANT", "LAKE SUCCESS", "LAKEMONT", "LAKEVILLE", "LAKEWOOD", "Lakewood", "LANSING", "Lansing", "LARCHMONT", "LATHAM", "Latham", "LATHAM, NY", "LATTINGTOWN", "Laurens", "LAWRENCE", "LEE CENTER", "LEEDS", "Leeds", "LEICESTER", "LEONARDSVILLE", "LEROY", "LeRoy", "Leroy", "LEROY ", "LEVITTOWN", "Lew Beach", "LEW BEACH", "LEWIS", "LEWISTON", "LEWiSTON", "Liberty", "LIDO BEACH", "LILY DALE", "LIMA", "LIMERICK", "LIMESTONE", "LINCOLNDALE", "Lisbon", "LISLE", "LITTLE FALLS", "LITTLE VALLEY", "LITTLE YORK", "Liverpool", "LIVERPOOL", "Livingston Manor", "LIVONIA", "Livonia", "Loch Sheldrake", "LOCKE", "LOCKPORT", "LOCKPORT, NY", "LOCUST VALLEY", "LODI", "LONG BEACH", "Long Eddy", "LONG LAKE", "Long Lake", "LOUDONVILLE", "LOWVILLE", "Lowville", "LYCOMING", "LYNBROOK", "LYNDONVILLE", "Lyon Mountain", "LYONS", "LYONS ", "LYONS FALLS", "MACEDON", "MACEDON ", "MACHIAS", "MADISON", "Madrid", "MAHOPAC", "Mahopac", "MAINE", "MALDEN", "MALONE", "Malone", "MALONE ", "MALTA", "MALVERNE", "MAMARONECK", "MANCHESTER", "MANHASSET", "Manlius", "MANLIUS", "MANNSVILLE", "MANORHAVEN", "MARATHON", "Marathon", "Marcellus", "MARCELLUS", "MARCY", "MARGARETVILLE", "Margaretville", "Marietta", "MARIETTA", "MARION", "MARLBORO", "MARTVILLE", "MARYLAND", "MASSAPEQUA", "MASSAPEQUA  PARK", "MASSAPEQUA PARK", "Massena", "Mattydale", "MATTYDALE", "MAYBROOK", "MAYFIELD", "MAYVILLE", "Mayville", "MCCONNELLSVILLE", "McDONOUGH", "MCDONOUGH", "MCGRAW", "McGraw", "MECHANICVILLE", "MEDINA", "MEDINA,", "MEDINA, NEW YORK", "Memphis", "MENANDS", "MENDON", "MERIDIAN", "MERRICK", "Merrill", "MEXICO", "MIDDLE GROVE", "MIDDLEBURGH", "Middleburgh", "MIDDLEPORT", "MIDDLESEX", "MIDDLETOWN", "Middletown", "Mileses", "MILFORD", "Milford", "MILL NECK", "MILLBROOK", "MILLERTON", "Millerton", "MILLERTON ", "MILLPORT", "MILLWOOD", "MILTON", "Milton", "MINEOLA", "MINERVA", "MINETTO", "MINEVILLE", "Minoa", "MODENA", "MOHAWK", "MOHEGAN LAKE", "MOIRA", "Mongaup Valley", "MONROE", "Monroe", "MONSEY", "MONTEBELLO", "MONTEZUMA", "MONTGOMERY", "Monticello", "MONTICELLO", "MONTOUR FALLS", "MONTROSE", "Mooers", "Mooers Forks", "MORAVIA", "Moravia", "MORIAH", "MORIAH CENTER", "MORRIS", "Morrisonville", "MORRISONVILLE", "Morristown", "MORRISVILLE", "Mottville", "MOUNT IVY", "MOUNT KISCO", "Mount Morris", "MOUNT TREMPER", "MOUNT VERNON", "MOUNT VISION", "MOUNTAIN VIEW", "MOUNTAIN VIEW ", "Mountaindale", "MOUNTAINVILLE", "MT TREMPER", "MT. MARION", "MT. MORRIS", "Mt. Morris", "MT. MORRIS ", "MT. TREMPER", "MT. UPTON", "Mt.Morris", "MUMFORD", "MUNNSVILLE", "MUNSEY PARK", "N MASSAPEQUA", "N. BROOKFIELD", "N. CHILI", "N. TONAWANDA", "NANUET", "NAPANOCH", "NAPLES", "NAPLES ", "Narrowsburg", "NASSAU", "NATURAL BRIDGE", "Nedrow", "NEDROW", "Neversink", "NEW  HYDE PARK", "NEW BALTIMORE", "NEW BERLIN", "New Berlin", "NEW CASTLE", "NEW CITY", "NEW HAMPTON", "NEW HARTFORD", "New Hartford", "NEW HARTFORD,  NY", "NEW HAVEN", "NEW HEMPSTEAD", "NEW HYDE PARK", "NEW LEBANON", "NEW PALTZ", "NEW ROCHELLE", "NEW SQUARE", "NEW WINDSOR", "NEW WINDSOR ", "NEW YORK MILLS", "NEWARK", "NEWARK ", "NEWARK VALLEY", "NEWBURGH", "Newburgh", "NEWCOMB", "NEWFANE", "NEWFIELD", "NEWPORT", "NIAGARA FALLLS", "NIAGARA FALLS", "Niagara Falls", "NIAGARA UNIVERSITY", "NICHOLS", "NISKAYUNA", "NIVERVILLE", "Norfolk", "NORTH BAY", "NORTH BELLMORE", "NORTH BLENHEIM", "NORTH CHILI", "NORTH CREEK", "NORTH HILLS", "NORTH HOOSICK", "NORTH HORNELL", "NORTH HUDSON", "North Lawrence", "NORTH MASSAPEQUA", "NORTH MERRICK", "NORTH NORWICH", "NORTH POLE", "NORTH RIVER", "NORTH ROSE", "NORTH SALEM", "North Syracuse", "NORTH SYRACUSE", "NORTH TONAWANDA", "NORTH VALLEY STREAM", "NORTH WHITE PLAINS", "NORTH WOODMERE", "NORTHVILLE", "NORWAY", "NORWICH", "Norwich", "NORWICH, N.Y.", "Norwood", "Nunda", "NUNDA", "NYACK", "OAK HILL", "Oakfield", "OAKFIELD", "OCEANSIDE", "ODESSA", "Ogdensburg", "OLCOTT", "OLD BETHPAGE", "OLD BROOKVILLE", "OLD CHATHAM", "OLD FORGE", "OLD WESTBURY", "OLEAN", "OLEAN ", "OLIVEBRIDGE", "OLIVEREA", "OLMSTEDVILLE", "ONEIDA", "Oneida", "ONEIDA,", "ONEONTA", "Oneonta", "ONIEDA", "ONTARIO", "ONTARIO ", "ONTARIO CENTER", "Oramel", "ORANGEBURG", "ORISKANY", "ORISKANY FALLS", "ORWELL", "OSCEOLA", "OSSINING", "Oswegatchie", "OSWEGO", "OSWEGO ", "OTEGO", "OTISVILLE", "OVID", "OVID ", "OWEGO", "Owego", "OWLS HEAD", "OXFORD", "OYSTER BAY", "OYSTER BAY COVE", "PAINTED POST", "PALATINE BRIDGE", "PALENVILLE", "PALISADES", "PALMYRA", "PANAMA", "PANAMA ", "PARISH", "Parishville", "Parksville", "PATTERSON", "PATTERSON,  NY", "PATTERSONVILLE", "PAUL SMITHS", "PAVILION", "PAWLING", "PAWLING ", "PEARL RIVER", "Pearl River", "PEARL RIVER ", "PEEKSILL", "PEEKSKILL", "PELHAM", "PELHAM MANOR", "PENFIELD", "PENIELD", "PENN YAN", "PENN YAN ", "PENNELLVILLE", "PERRY", "Perry", "PERRYSBURG", "PERTH", "Peru", "Peru, NY", "PHELPS", "PHELPS       NY", "PHILADELPHIA", "PHILMONT", "PHOENICIA", "PHOENIX", "Phoenix", "PIERMONT", "PIERREPONT MANOR", "PIFFARD", "PIKE", "PINE BUSH", "Pine Bush", "PINE CITY", "PINE HILL", "PINE ISLAND", "PINE PLAINS", "PISECO", "PITCHER", "PITTSFORD", "PLAINEDGE", "PLAINVIEW", "PLANDOME", "PLATTEKILL", "Plattsburgbh", "Plattsburgh", "PLATTSBURGH", "PLEASANT VALLEY", "PLEASANTVILLE", "PLYMOUTH", "POESTENKILL", "POINT LOOKOUT", "POLAND", "POMOMA", "POMONA", "Pompey", "PORT BYRON", "PORT CHESTER", "PORT CRANE", "PORT EWEN", "PORT HENRY", "PORT JERVIS", "PORT KENT", "PORT LEYDEN", "PORT WASHINGTON", "PORTAGEVILLE", "PORTER CORNERS", "PORTVILLE", "Potsdam", "Potsdam ", "POTTERSVILLE", "POUGHKEEPSIE", "Poughkeepsie", "POUGHKEPSIE", "POUGHQUAG", "POUND RIDGE", "POUOGHKEEPSIE", "PRATTSBURGH", "PRATTSVILLE", "Prattsville", "Preble", "PREBLE", "PRINCETOWN", "PROSPECT", "PULASKI", "PULASKI ", "PULTENEY", "PURCHASE", "PURDYS", "PURLING", "PUTNAM STATION", "PUTNAM VALLEY", "QUEENSBURY", "Queensbury", "RANDOLPH", "RANSOMVILLE", "RAQUETTE LAKE", "RAVENA", "Ravena", "RAY BROOK", "Raymondville", "RED CREEK", "RED HOOK", "RED HOUSE", "REDFIELD", "REDHOOK", "REDWOOD", "REMSEN", "RENSSEALAER", "RENSSELAER", "Rensselaer", "RENSSELAERVILLE", "RENSSELEAR", "RETSOF", "REXFORD", "RHINEBECK", "RHINEBECK, NY", "RHINEBECK, NY ", "RHINECLIFF", "RICHBURG", "RICHFIELD SPRINGS", "Richfield Springs", "RICHFORD", "RICHLAND", "RICHMONDVILLE", "Richmondville", "RIPLEY", "ROCHESER", "ROCHESTER", "Rochester", "ROCHESTER NY", "Rock Hill", "Rock HIll", "ROCK STREAM", "ROCK TAVERN", "ROCKVILLE CENTRE", "ROME", "Rome", "ROME,  NY", "ROME, NY", "ROMULUS", "ROOSEVELT", "ROOSEVELT ", "Roscoe", "ROSCOE", "ROSEBOOM", "ROSEDALE (WDMR)", "ROSENDALE", "ROSLYN", "ROSLYN ESTATES", "ROSLYN HARBOR", "ROSLYN HEIGHTS", "ROTTERDAM", "ROTTERDAM JCT", "ROTTERDAM JCT.", "ROUND LAKE", "ROUND TOP", "Rouses Point", "ROXBURY", "Roxbury", "RUBY", "RUSH", "RUSHVILLE", "Russell", "RYE", "RYE BROOK", "S FARMINGDALE", "S. DAYTON", "SACKETS HARBOR", "SALAMANCA", "SALEM", "Salisbury Center", "SALISBURY MILLS", "SALT POINT", "SANBORN", "SANDS POINT", "SANDUSKY", "SANDY CREEK", "SANGERFIELD", "Saranac", "SARANAC LAKE", "SARANAC LAKE ", "SARANC LAKE", "SARATOGA", "SARATOGA SPIRNGS", "SARATOGA SPRINGS", "Saratoga Springs", "SARATOGA SRPINGS", "SARTOGA SPRINGS", "SAUGERTIES", "SAUQUOIT", "SAVONA", "SCARBOROUGH", "SCARSDALE", "SCHAGHTICOKE", "SCHENECTADY", "SCHENEVUS", "Schenevus", "Schoharie", "SCHOHARIE", "SCHROON LAKE", "Schroon Lake", "SCHUYLER LAKE", "SCHUYLERVILLE", "Scio", "SCOTIA", "SCOTTSBURG", "SCOTTSVILLE", "SEA CLIFF", "SEAFORD", "SELKIRK", "SENECA FALLS", "Seneca Falls", "SENECA FALLS ", "SHANDAKEN", "SHARON SPRINGS", "Sharon Springs", "Sherburne", "SHERBURNE", "SHERMAN", "SHERRILL", "SHOKAN", "SHORTSVILLE", "SHRUB OAK", "SIDNEY", "Sidney", "SIDNEY CENTER", "SILVER BAY", "SILVER CREEK", "Silver Creek", "SILVER CREEK ", "SILVER LAKE", "SILVER SPRINGS", "SINCLAIRVILLE", "Skaneateles", "SKANEATELES", "Skaneateles Falls", "SLATE HILL", "SLATERVILLE SPRINGS", "SLEEPY HOLLOW", "SLINGERLANDS", "SlLVER CREEK", "SLOATSBURG", "Sloatsburg", "SMITHBORO", "SMITHVILLE FLATS", "SO GLENS FALLS", "So. Fallsburg", "SODUS", "SODUS POINT", "SODUS POINT ", "Solvay", "SOMERS", "Sonyea", "SONYEA", "SOUTH CAIRO", "South Colton", "SOUTH DAYTON", "South Fallsburg", "SOUTH FALLSBURG", "South Fallsburg ", "SOUTH FARMINGDALE", "SOUTH GLENS FALLS", "SOUTH HEMPSTEAD", "South Kortright", "SOUTH OTSELIC", "SOUTH SALEM", "SPARKILL", "SPECULATOR", "SPENCER", "Spencer", "SPENCERPORT", "SPRAKERS", "SPRING VALLEY", "SPRINGWATER", "sssss", "ST HUBERTS", "ST REGIS FALLS", "ST. BONAVENTURE", "ST. JOHNSVILLE", "ST. REGIS FALLS", "STAATSBURG", "Stafford", "STAFFORD", "STAMFORD", "Stamford", "STANFORDVILLE", "STANLEY", "Star Lake", "STEAMBURG", "STELLA NIAGARA", "STEPHENTOWN", "STERLING", "STERLING FOREST", "STEWART MANOR", "STILLWATER", "STITTVILLE", "STONE RIDGE", "STONY CREEK", "STONY POINT", "STORMVILLE", "STOW", "STRYKERSVILLE", "SUFFERN", "SUGAR LOAF", "SUMMIT", "Summitville", "Swain", "Swan Lake", "SYLVAN BEACH", "SYOSSET", "Syracuse", "SYRACUSE", "syracuse", "TABERG", "TALLMAN", "TANNERSVILLE", "TAPPAN", "TARRYTOWN", "TARRYTOWN ", "THENDARA", "THERESA", "THIELLS", "Thompsonville", "THORNWOOD", "THROUGHOUT", "THROUGHOUT TOMPKINS", "TICONDEROGA", "TILLSON", "TIOGA CENTER", "TIVOLI", "TOMKINS COVE", "TOMPKINS", "TOMPKINS COUNTY", "TROUPSBURG", "TROUT CREEK", "TROY", "Troy", "TRUMANSBURG", "TRUXTON", "TUCKAHOE", "Tully", "TULLY", "TUPPER LAKE", "Tupper Lake", "TURIN", "TUXEDO", "TUXEDO PARK", "TYRONE", "ULSTER PARK", "UNADILLA", "Unadilla", "UNION SPRINGS", "UNIONDALE", "UNIONVILLE", "UPPER JAY", "UPPER NYACK", "UTICA", "Utica", "UTICA ", "VAILS GATE", "VALATIE", "VALHALLA", "VALLEY COTTAGE", "Valley Cottage", "Valley Cottage ", "VALLEY STREAM", "VAN ETTEN", "VAN HORNESVILLE", "VARYSBURG", "VERBANK", "Verbank", "VERMONTVILLE", "VERNON", "VERONA", "VERONA BEACH", "VERPLANCK", "VESTAL", "Vestal", "VICTOR", "VICTOR ", "VICTORY", "VISTA", "VOORHEESVILLE", "W. HENRIETTA", "WACCABUC", "Waddington", "Waddington ", "WADHAMS", "WADSWORTH ", "WALDEN", "WALLKILL", "Wallkill", "WALTON", "Walton", "WALWORTH", "WAMPSVILLE", "Wanakena", "WANTAGH", "WANTAGH ", "WAPPINGER", "WAPPINGER FALLS", "WAPPINGERS", "WAPPINGERS FALLS", "WAPPINGERS FALLSA ", "WAPPINIGERS FALLS", "WAPPPINGERS FALLS", "Warners", "Warnerville", "WARRENSBURG", "WARSAW", "WARWICK", "WASHINGTON MILL", "WASHINGTON MILLS", "WASHINGTON MILLS, NY", "WASHINGTONVILLE", "WASHINGTONVILLE ", "WASSAIC", "WATERFORD", "WATERLOO", "WATERLOO     ", "WATERLOO,", "WATERPORT", "WATERTOWN", "Watertown", "WATERVILLE", "WATERVLIET", "WATKINS GLEN", "WATRLOO", "WAVERLY", "WAWARSING", "WAYLAND", "WEBSTER", "WEEDSPORT", "WELLESLEY ISL.", "WELLESLEY ISLAND", "WELLS", "WELLSBURG", "Wellsville", "WELLSVILLE", "WESLEY HILLS", "WEST  HEMPSTEAD", "WEST  HENRIETTA", "WEST CARTHAGE", "West Chazy", "West Clarksville", "WEST COXSACKIE", "West Coxsackie", "WEST EATON", "WEST EDMESTON", "WEST HARRISON", "WEST HAVERSTRAW", "WEST HEMPSTEAD", "WEST HENRIETTA", "WEST HURLEY", "WEST LEBANON", "WEST LEYDEN", "WEST MONROE", "WEST NYACK", "WEST ONEONTA", "WEST PARK", "WEST SAND LAKE", "WEST SHOKAN", "WEST VALLEY", "WEST WINFIELD", "WESTBROOKVILLE", "WESTBURY", "WESTERNVILLE", "WESTFIELD", "WESTFIELD ", "WESTKILL", "WESTMORELAND", "WESTONS MILLS", "WESTPORT", "WESTTOWN", "White Lake", "White Lake ", "WHITE PLAINS", "White Sulphur Springs", "WHITEHALL", "WHITESBORO", "Whitesville", "WHITNEY POINT", "WILLARD", "WILLIAMSON", "WILLIAMSON ", "WILLIAMSTOWN", "WILLISTON PARK", "WILLISTON PK", "WILLSBORO", "WILLSEYVILLE", "WILMINGTON", "WILMINGTON ", "WILSON", "WILTON", "WINDHAM", "Windham", "WINDSOR", "Windsor", "WINGDALE", "WINGDALE, NY", "Winthrop", "WOLCOTT", "Woodbourne", "Woodbourne ", "WOODBURY", "WOODGATE", "WOODHULL", "WOODMERE", "Woodridge", "WOODRIDGE", "WOODSTOCK", "WOODVILLE", "WORCESTER", "Wurtsboro", "Wynantskill", "WYNANTSKILL", "WYOMING", "XXXXX", "YONKERS", "YORKSHIRE", "YORKTOWN", "YORKTOWN HEIGHTS", "YORKVILLE", "YOUNGSTOWN", "Youngsville", "YOUNSTOWN", "Yulan"];



},{}],40:[function(require,module,exports){
module.exports = ['ALBANY', 'ALLEGANY', 'BROOME', 'CATTARAUGUS', 'CAYUGA', 'CHAUTAUQUA', 'CHEMUNG', 'CHENANGO', 'CLINTON', 'COLUMBIA', 'CORTLAND', 'DELAWARE', 'DUTCHESS', 'ESSEX', 'FRANKLIN', 'FULTON', 'GENESEE', 'GREENE', 'HAMILTON', 'HERKIMER', 'JEFFERSON', 'LEWIS', 'LIVINGSTON', 'MADISON', 'MONROE', 'MONTGOMERY', 'NASSAU', 'NIAGARA', 'ONEIDA', 'ONONDAGA', 'ONTARIO', 'ORANGE', 'ORLEANS', 'OSWEGO', 'OTSEGO', 'PUTNAM', 'RENSSELAER', 'ROCKLAND', 'SARATOGA', 'SCHENECTADY', 'SCHOHARIE', 'SCHUYLER', 'SENECA', 'ST LAWRENCE', 'STEUBEN', 'SULLIVAN', 'TIOGA', 'TOMPKINS', 'ULSTER', 'WARREN', 'WASHINGTON', 'WAYNE', 'WESTCHESTER', 'WYOMING', 'YATES'];



},{}],41:[function(require,module,exports){
module.exports = ['0', '10455', '104552106', '10473', '10474', '10501', '10502', '10503', '10504', '10505', '10506', '10507', '10509', '10510', '105109245', '10511', '10512', '10514', '10516', '10517', '10518', '10519', '10520', '105203055', '10522', '10523', '10524', '10527', '10528', '10530', '10532', '105321217', '10533', '10535', '10536', '10538', '10540', '10541', '10543', '10546', '10547', '10548', '10549', '10550', '10551', '10552', '10553', '10560', '10562', '10566', '10567', '10570', '10573', '105733414', '10576', '10577', '10578', '10579', '10580', '10583', '10588', '10589', '10590', '10591', '10594', '10595', '10596', '10597', '10598', '10601', '10603', '10604', '10605', '10606', '10607', '10701', '107015569', '10702', '10703', '10704', '10705', '10706', '10707', '10708', '10709', '10710', '10801', '108013416', '10802', '10803', '108032710', '10804', '10805', '10901', '10910', '10911', '10912', '10913', '10914', '10915', '10916', '10917', '10918', '10919', '10920', '10921', '109210757', '10922', '10923', '10924', '10925', '10926', '10927', '10928', '10930', '10931', '10940', '10941', '10949', '10950', '10952', '10953', '10954', '10956', '10958', '10960', '10962', '10963', '10964', '10965', '10968', '10969', '10970', '10973', '10974', '10976', '10977', '10979', '10980', '10981', '10982', '10983', '10984', '10986', '10987', '10988', '10989', '10990', '10992', '10993', '10994', '10998', '11001', '110012705', '11002', '11003', '110032629', '11010', '110101230', '110102530', '110102849', '110103627', '110103628', '11020', '11021', '110211243', '110211246', '110213254', '110214303', '11022', '11023', '11024', '11030', '110301946', '110303017', '11040', '110401664', '110402603', '110402604', '110404726', '110405236', '11042', '110421012', '110421034', '11050', '110502222', '110502703', '110502910', '110504211', '11081', '11096', '110961217', '110961348', '110961809', '11111', '11150', '11158', '11201', '11350', '11355', '11365', '11372', '11422', '11501', '115011702', '115014021', '11507', '115071599', '115071917', '11509', '11510', '115102429', '115102453', '115103111', '115103230', '115104241', '115104427', '11514', '115141907', '11516', '11517', '11518', '115181414', '11520', '115203710', '115203825', '115204242', '115204702', '115205103', '115206129', '115206131', '11530', '115300701', '115302909', '115303467', '115303827', '115304708', '115304760', '115304801', '115305315', '115305729', '115306553', '11542', '115422540', '115422703', '115422704', '115423700', '115423735', '11545', '115451602', '115451906', '11547', '11548', '115481033', '115481098', '11550', '115501417', '115501438', '115501751', '115503811', '115503904', '115503908', '115504019', '115504364', '115504544', '115505613', '11552', '115521330', '115521541', '115522127', '115522146', '115523425', '11553', '115531010', '115531637', '115531919', '115532507', '115532509', '115532634', '11554', '115542027', '115542029', '115542350', '115542937', '115544115', '115544121', '11556', '11557', '115571555', '115572016', '11558', '115581439', '115581627', '115582215', '11559', '115598', '11560', '115602124', '11561', '115611223', '115611224', '115611302', '115611428', '115612018', '115613501', '115613510', '11563', '115631755', '115633024', '115633234', '115633242', '115633570', '11565', '115652043', '11566', '115661034', '115661342', '115661835', '115662728', '115663111', '115663407', '115663415', '115663431', '115663744', '115664530', '115664538', '11568', '115680249', '11569', '115692021', '11570', '115704801', '11572', '115721409', '115722130', '11575', '115751757', '115752106', '11576', '11576384', '11577', '115772329', '11579', '11580', '115801155', '115801938', '115805125', '115805810', '115805925', '115805952', '115806115', '11581', '115811228', '115811907', '115812523', '115813350', '11582', '11590', '115903331', '115903924', '115904408', '115904506', '115905256', '11596', '115962204', '11598', '115981645', '11599', '11701', '11709', '117091616', '11710', '117101602', '117101816', '117101833', '117103531', '11714', '117142702', '117143008', '117145798', '117240100', '11731', '11732', '117321003', '11735', '117352618', '117352619', '117354450', '11747', '11753', '117531338', '11756', '117565325', '11757', '11758', '117581212', '117585346', '117586019', '117586215', '117586624', '11761', '11762', '117622711', '117622712', '117622907', '117623804', '11765', '11771', '117711555', '11783', '117832801', '117833427', '11787', '11791', '117913116', '117913608', '117914507', '117914519', '117914540', '11793', '117932213', '117933717', '117933949', '11797', '117971210', '11801', '118013006', '118013037', '118013051', '118013103', '118013528', '118014011', '118014236', '118014267', '11803', '118031006', '118031507', '118033322', '118034953', '11804', '118041240', '12008', '12009', '12010', '12015', '12018', '12019', '12020', '12022', '12023', '12025', '12027', '12029', '12031', '12032', '12033', '12035', '12037', '12041', '12042', '12043', '12045', '12047', '12051', '12052', '12053', '12054', '12056', '12057', '12058', '12059', '12060', '12061', '12065', '12066', '12067', '12068', '12071', '12072', '12074', '12075', '12076', '12077', '12078', '12080', '12082', '12083', '12084', '12085', '12086', '12087', '12089', '12090', '12092', '12093', '12095', '12106', '12108', '12110', '12116', '12117', '12118', '12122', '12123', '12124', '12125', '12130', '12131', '12133', '12134', '12136', '12137', '12139', '12140', '12143', '12144', '12147', '12148', '12149', '12150', '12151', '12154', '12155', '12157', '12158', '12159', '12164', '12166', '12167', '12168', '12170', '12175', '12180', '12181', '12182', '12183', '12184', '12186', '12187', '12188', '12189', '12190', '12192', '12195', '12196', '12197', '12198', '12202', '122021398', '122021742', '12203', '12204', '12205', '122051101', '122051124', '122052751', '12206', '12207', '12208', '12209', '12210', '12211', '122110500', '12212', '12220', '12222', '12223', '12226', '12242', '1226', '1230 7', '12302', '12303', '12304', '12305', '12306', '12307', '12308', '12309', '12345', '124001', '12401', '12404', '12405', '12406', '12407', '12409', '12410', '12412', '12413', '12414', '12418', '12422', '12423', '12424', '12427', '12428', '12429', '12430', '12431', '12432', '12434', '12435', '12436', '12439', '12440', '12441', '12442', '12443', '12444', '12446', '12449', '12451', '12453', '12455', '12456', '12457', '12458', '12460', '12461', '12463', '12464', '12465', '12466', '12468', '12470', '12472', '12473', '12474', '12475', '12477', '12480', '12481', '12482', '12484', '12485', '124850592', '12486', '12487', '12489', '12491', '12492', '12493', '12494', '12496', '12498', '12501', '12502', '12503', '12504', '12506', '12507', '12508', '125082735', '12512', '12513', '12516', '12517', '12518', '12520', '12521', '12522', '12523', '12524', '12525', '12526', '12527', '12528', '12529', '12531', '12533', '125336267', '12534', '12538', '12540', '12542', '12543', '12545', '125450127', '12546', '12547', '12548', '12549', '12550', '12552', '12553', '12561', '12563', '12564', '12565', '12566', '12567', '12568', '12569', '12570', '12571', '12572', '12574', '12575', '12577', '12578', '12580', '12581', '12582', '12583', '12584', '12585', '12586', '12589', '12590', '125901918', '12592', '12594', '12601', '12602', '12603', '12604', '12701', '12701-331', '12702', '12719', '12720', '12721', '12722', '12723', '12725', '12726', '12729', '12732', '12733', '12734', '12737', '12740', '12741', '12743', '12746', '12747', '12748', '12749', '12750', '12751', '12752', '12754', '12758', '12759', '12760', '12762', '12763', '12764', '12765', '12768', '12771', '12775', '12776', '12776-030', '12777', '12779', '12781', '12783', '12784', '12785', '12786', '12787', '12788', '12789', '12790', '12791', '12792', '12801', '12803', '12804', '128041705', '12809', '12812', '12814', '12815', '12816', '12817', '12817-048', '12819', '12820', '12821', '12822', '12824', '12827', '12828', '12831', '12832', '12833', '12834', '12835', '12836', '12838', '12839', '12841', '12842', '12843', '12844', '12845', '12845-350', '12845-500', '12845-642', '12846', '128460200', '12847', '12848', '12849', '12850', '12851', '12852', '12853', '12853-960', '12855', '12856', '12857', '12859', '12860', '12861', '12865', '12866', '12870', '12871', '12874', '12878', '12883', '128831119', '12885', '12887', '12889', '12901', '12903', '12910', '12911', '12912', '12913', '12916', '12917', '12918', '12919', '129194638', '12920', '12921', '12922', '12923', '12924', '12926', '12927', '12928', '12929', '12930', '12932', '12934', '12935', '12936', '12937', '12939', '12941', '12942', '12943', '12944', '12945', '12946', '12950', '12952', '12953', '12955', '12956', '12957', '12958', '12959', '12960', '12961', '12962', '12966', '12967', '12969', '12970', '12972', '12974', '12975', '12977', '12979', '12980', '12981', '12983', '12986', '12987', '12989', '12992', '129922577', '12993', '12996', '12997', '13020', '13021', '13026', '13027', '13028', '13029', '13030', '13031', '13032', '13033', '13034', '13035', '13036', '13037', '13039', '13040', '13041', '13042', '13044', '13045', '13051', '13052', '13053', '13054', '13057', '13060', '13061', '13063', '13064', '13066', '13068', '13069', '13071', '13072', '13073', '13074', '13076', '13077', '13078', '13080', '13081', '13082', '13083', '13084', '13087', '13088', '13090', '13092', '13093', '13101', '13104', '13108', '13110', '13111', '13112', '13113', '13114', '13115', '13116', '13117', '13118', '13119', '13120', '13121', '13123', '13126', '13131', '13132', '13135', '131352170', '13136', '13138', '13140', '13141', '13142', '13143', '13144', '13145', '13147', '13148', '13152', '13153', '13155', '13156', '13157', '13158', '13159', '13160', '13162', '13163', '13164', '13165', '13166', '13167', '13202', '13203', '13204', '13205', '13206', '13207', '13208', '13209', '13210', '13211', '13212', '13214', '13215', '13219', '13224', '13244', '13290', '13301', '13302', '13303', '13304', '13305', '13308', '13309', '13310', '13312', '13313', '13314', '13316', '13317', '13319', '13320', '13321', '13322', '13323', '13324', '13325', '13326', '13327', '13328', '13329', '13331', '13332', '13333', '13334', '13335', '13338', '133383514', '13339', '13340', '13343', '13345', '13346', '13348', '13350', '13354', '13355', '13356', '13357', '13360', '13363', '13364', '13365', '13367', '13368', '13401', '13402', '13403', '13407', '13408', '13409', '13411', '13413', '13416', '13417', '13418', '13420', '13421', '13424', '134243905', '13425', '13426', '13428', '13431', '134310030', '13433', '13435', '13436', '13437', '13438', '13439', '13440', '13441', '13450', '13452', '13454', '13455', '13456', '13457', '13459', '13460', '13461', '13469', '13471', '13472', '13473', '13475', '13476', '13478', '13479', '13480', '13484', '13485', '13486', '13489', '13490', '13491', '13492', '13493', '13494', '13495', '13501', '13502', '13601', '13605', '13606', '13607', '13608', '13609', '13611', '13612', '13613', '13614', '13615', '13616', '13617', '13618', '13619', '136190166', '13620', '13622', '13624', '13625', '13626', '13628', '13630', '13631', '13632', '13634', '13635', '13637', '13640', '13641', '13642', '13643', '13646', '13647', '13648', '13650', '13651', '13652', '13654', '13655', '13656', '13657', '13658', '13660', '13661', '13662', '136622606', '136623290', '13664', '13665', '13667', '13668', '13669', '13670', '13672', '13673', '13674', '13676', '13678', '13679', '13684', '13685', '13687', '13690', '13691', '13694', '13695', '13697', '13699', '13730', '13731', '13732', '13733', '13736', '13739', '13740', '13743', '137430145', '13745', '13746', '13747', '13748', '13750', '13751', '13752', '13753', '13754', '13755', '13756', '13757', '13758', '13760', '13775', '13776', '13778', '13780', '13782', '13783', '13784', '13787', '13788', '13790', '13795', '13796', '13797', '13801', '13802', '13803', '13807', '13808', '13809', '13810', '13811', '13812', '13814', '13815', '13820', '13825', '13827', '13830', '13832', '13833', '13835', '13838', '13839', '13840', '13841', '13842', '13845', '13847', '13849', '13850', '13856', '13861', '13862', '13864', '13865', '13901', '13902', '13903', '13904', '13905', '14001', '14003', '14005', '14008', '14009', '14011', '14012', '14020', '140200000', '14024', '14028', '14036', '14037', '14040', '14042', '14048', '140481437', '14054', '14058', '14062', '14063', '14065', '14066', '14067', '14070', '14081', '14082', '14092', '14094', '14098', '14101', '14103', '14105', '14108', '14109', '14120', '141203340', '141207228', '14125', '14126', '14129', '14130', '14131', '14132', '14133', '14135', '14136', '14138', '14143', '14144', '14145', '14167', '14171', '14172', '14173', '14174', '14228', '14301', '143022657', '14303', '14304', '143040360', '14305', '14411', '14413', '14414', '14414-', '14416', '14418', '14420', '14422', '14423', '14424', '14425', '14427', '14428', '14429', '14432', '14433', '14435', '14437', '14437-', '14441', '14443', '14445', '14450', '14454', '14454-', '14456', '14461', '14464', '14465', '14466', '14467', '14468', '14469', '14470', '14471', '14472', '14476', '14477', '14478', '14480', '14481', '14482', '14485', '14487', '14487-', '14489', '14502', '14504', '14505', '14506', '14507', '14510', '14511', '14512', '14513', '14514', '14516', '14517', '14519', '14520', '14521', '14522', '14525', '14526', '14527', '14530', '14532', '14533', '14534', '14536', '14539', '14541', '14543', '14544', '14545', '14546', '14548', '14549', '14550', '14551', '14555', '14556', '14556-', '14559', '14560', '14561', '14564', '14568', '14569', '14571', '14572', '14580', '14585', '14586', '14588', '14589', '14590', '14591', '145910036', '14603', '14604', '14605', '14606', '14607', '14608', '14609', '14610', '14611', '14612', '14613', '14614', '14615', '14616', '14617', '14618', '14619', '14620', '14621', '14622', '14623', '14624', '14625', '14626', '14627', '14650', '14701', '147022002', '14706', '14709', '14710', '14711', '14712', '14715', '14716', '14718', '14719', '14720', '14721', '14722', '14723', '14724', '14726', '14727', '14728', '14729', '14730', '14731', '14732', '14733', '14733-160', '14735', '14736', '14737', '14738', '14739', '14740', '14741', '14743', '14744', '14747', '14750', '14752', '14753', '14755', '14757', '14760', '14767', '14770', '14772', '14774', '14775', '14778', '14779', '14781', '14782', '14783', '14785', '14786', '14787', '14788', '14801', '148011110', '14802', '14803', '14804', '14806', '14807', '14809', '14810', '148100607', '14812', '14813', '14814', '14815', '14817', '14818', '14820', '14821', '14822', '14823', '14826', '14830', '148302786', '14831', '14837', '14838', '14839', '14840', '148400458', '14841', '14842', '148429605', '14843', '14844', '14845', '14846', '14847', '14850', '14852', '14853', '14856', '14857', '14859', '14860', '14864', '14865', '14867', '14869', '14870', '14871', '14873', '14874', '14878', '14879', '14880', '14881', '14882', '14883', '14884', '14885', '14886', '14887', '14889', '14891', '14892', '14894', '14895', '14897', '14898', '14901', '14902', '14903', '14904', '14905'];



},{}],42:[function(require,module,exports){

},{}],43:[function(require,module,exports){
var BindBase,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

BindBase = (function(superClass) {
  extend(BindBase, superClass);

  function BindBase() {
    return BindBase.__super__.constructor.apply(this, arguments);
  }

  BindBase.prototype.updateAttrs = function(e) {
    e.stopPropagation();
    return this.view.model.set(Backbone.Syphon.serialize(this));
  };

  return BindBase;

})(Marionette.Behavior);

module.exports = BindBase;



},{}],44:[function(require,module,exports){
var BindInputs,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

BindInputs = (function(superClass) {
  extend(BindInputs, superClass);

  function BindInputs() {
    return BindInputs.__super__.constructor.apply(this, arguments);
  }

  BindInputs.prototype.events = {
    'input input': 'updateAttrs'
  };

  return BindInputs;

})(require('./bindBase'));

module.exports = BindInputs;



},{"./bindBase":43}],45:[function(require,module,exports){
var FlashesBehavior, _sendFlash,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

_sendFlash = function(type, obj) {
  return Backbone.Radio.channel('flash').trigger(type, obj);
};

FlashesBehavior = (function(superClass) {
  extend(FlashesBehavior, superClass);

  function FlashesBehavior() {
    return FlashesBehavior.__super__.constructor.apply(this, arguments);
  }

  FlashesBehavior.prototype.initialize = function(options) {
    if (options == null) {
      options = {};
    }
    this.view._flashes = this.options;
    this.view.flashError = this.flashError;
    return this.view.flashSuccess = this.flashSuccess;
  };

  FlashesBehavior.prototype.flashError = function(obj) {
    if (obj == null) {
      obj = {};
    }
    return _sendFlash('error', this._flashes['error'] || obj);
  };

  FlashesBehavior.prototype.flashSuccess = function(obj) {
    if (obj == null) {
      obj = {};
    }
    return _sendFlash('success', this._flashes['success'] || obj);
  };

  return FlashesBehavior;

})(Marionette.Behavior);

module.exports = FlashesBehavior;



},{}],46:[function(require,module,exports){
var ModelEventsBehavior,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ModelEventsBehavior = (function(superClass) {
  extend(ModelEventsBehavior, superClass);

  function ModelEventsBehavior() {
    return ModelEventsBehavior.__super__.constructor.apply(this, arguments);
  }

  ModelEventsBehavior.prototype.modelEvents = {
    'request': 'onModelRequest',
    'sync': 'onModelSync',
    'error': 'onModelError'
  };

  ModelEventsBehavior.prototype.onModelRequest = function(model, status, options) {
    var base;
    return typeof (base = this.view).onRequest === "function" ? base.onRequest(model, status, options) : void 0;
  };

  ModelEventsBehavior.prototype.onModelSync = function(model, response, options) {
    var base;
    return typeof (base = this.view).onSync === "function" ? base.onSync(model, response, options) : void 0;
  };

  ModelEventsBehavior.prototype.onModelError = function(model, response, options) {
    var base;
    return typeof (base = this.view).onError === "function" ? base.onError(model, response, options) : void 0;
  };

  return ModelEventsBehavior;

})(Marionette.Behavior);

module.exports = ModelEventsBehavior;



},{}],47:[function(require,module,exports){
var SubmitButtonBehavior,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

SubmitButtonBehavior = (function(superClass) {
  extend(SubmitButtonBehavior, superClass);

  function SubmitButtonBehavior() {
    return SubmitButtonBehavior.__super__.constructor.apply(this, arguments);
  }

  SubmitButtonBehavior.prototype.ui = {
    submit: '[data-click=submit]'
  };

  SubmitButtonBehavior.prototype.events = {
    'click @ui.submit:not(.disabled)': 'onSubmitClick'
  };

  SubmitButtonBehavior.prototype.initialize = function(options) {
    if (options == null) {
      options = {};
    }
    this.view.disableSubmit = (function(_this) {
      return function() {
        return _this.disableSubmit();
      };
    })(this);
    return this.view.enableSubmit = (function(_this) {
      return function() {
        return _this.enableSubmit();
      };
    })(this);
  };

  SubmitButtonBehavior.prototype.onSubmitClick = function(e) {
    var base;
    return typeof (base = this.view).onSubmit === "function" ? base.onSubmit(e) : void 0;
  };

  SubmitButtonBehavior.prototype.disableSubmit = function() {
    return this.ui.submit.addClass('disabled');
  };

  SubmitButtonBehavior.prototype.enableSubmit = function() {
    return this.ui.submit.removeClass('disabled');
  };

  return SubmitButtonBehavior;

})(Marionette.Behavior);

module.exports = SubmitButtonBehavior;



},{}],48:[function(require,module,exports){
var TooltipBehavior,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

TooltipBehavior = (function(superClass) {
  extend(TooltipBehavior, superClass);

  function TooltipBehavior() {
    return TooltipBehavior.__super__.constructor.apply(this, arguments);
  }

  TooltipBehavior.prototype.ui = {
    tooltips: '[data-toggle=tooltip]'
  };

  TooltipBehavior.prototype.initialize = function() {
    return this.view.clearTooltips = (function(_this) {
      return function() {
        return _this.clear();
      };
    })(this);
  };

  TooltipBehavior.prototype.clear = function() {
    this.ui.tooltips.tooltip('hide');
    return this.ui.tooltips.tooltip('dispose');
  };

  TooltipBehavior.prototype.onRender = function() {
    var ref;
    return (ref = this.ui.tooltips) != null ? ref.tooltip() : void 0;
  };

  TooltipBehavior.prototype.onBeforeDestroy = function() {
    return this.clear();
  };

  return TooltipBehavior;

})(Marionette.Behavior);

module.exports = TooltipBehavior;



},{}],49:[function(require,module,exports){
var BreadcrumbComponent, BreadcrumbList,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

BreadcrumbList = require('./views/breadcrumbList');

BreadcrumbComponent = (function(superClass) {
  extend(BreadcrumbComponent, superClass);

  function BreadcrumbComponent() {
    return BreadcrumbComponent.__super__.constructor.apply(this, arguments);
  }

  BreadcrumbComponent.prototype.initialize = function(options) {
    if (options == null) {
      options = {};
    }
    this.container = options.container;
    return this.collection = new Backbone.Collection();
  };

  BreadcrumbComponent.prototype.radioEvents = {
    'breadcrumb ready': 'onReady',
    'breadcrumb set': 'set'
  };

  BreadcrumbComponent.prototype.onReady = function() {
    this.set([
      {
        text: 'Loading...'
      }
    ]);
    return this.showView();
  };

  BreadcrumbComponent.prototype.set = function(models) {
    return this.collection.set(models);
  };

  BreadcrumbComponent.prototype.showView = function() {
    if (!this.shown) {
      this.container.show(new BreadcrumbList({
        collection: this.collection
      }));
      return this.shown = true;
    }
  };

  return BreadcrumbComponent;

})(Mn.Service);

module.exports = BreadcrumbComponent;



},{"./views/breadcrumbList":50}],50:[function(require,module,exports){
var BreadcrumbChild, BreadcrumbList,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

BreadcrumbChild = (function(superClass) {
  extend(BreadcrumbChild, superClass);

  function BreadcrumbChild() {
    return BreadcrumbChild.__super__.constructor.apply(this, arguments);
  }

  BreadcrumbChild.prototype.tagName = 'li';

  BreadcrumbChild.prototype.template = require('./templates/breadcrumb_child');

  BreadcrumbChild.prototype.className = function() {
    if (!this.model.get('href')) {
      return 'active';
    }
  };

  return BreadcrumbChild;

})(Mn.LayoutView);

BreadcrumbList = (function(superClass) {
  extend(BreadcrumbList, superClass);

  function BreadcrumbList() {
    return BreadcrumbList.__super__.constructor.apply(this, arguments);
  }

  BreadcrumbList.prototype.className = 'breadcrumb';

  BreadcrumbList.prototype.tagName = 'ol';

  BreadcrumbList.prototype.childView = BreadcrumbChild;

  BreadcrumbList.prototype.attributes = {
    role: 'navigation'
  };

  return BreadcrumbList;

})(Mn.CollectionView);

module.exports = BreadcrumbList;



},{"./templates/breadcrumb_child":51}],51:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (href, text) {
if ( href)
{
buf.push("<a" + (jade.attr("href", href, true, false)) + ">" + (jade.escape(null == (jade_interp = text) ? "" : jade_interp)) + "</a>");
}
else
{
buf.push(jade.escape(null == (jade_interp = text) ? "" : jade_interp));
}}.call(this,"href" in locals_for_with?locals_for_with.href:typeof href!=="undefined"?href:undefined,"text" in locals_for_with?locals_for_with.text:typeof text!=="undefined"?text:undefined));;return buf.join("");
};
},{"jade/runtime":69}],52:[function(require,module,exports){
Marionette.Decorator = require('./decorator');

Marionette.View.prototype.serializeModel = function() {
  if (!this.model) {
    return {};
  } else if (this.model.decorator) {
    return this.model.decorator.decorate(this.model);
  }
  return _.clone(this.model.attributes);
};



},{"./decorator":53}],53:[function(require,module,exports){
var BaseDecorator;

BaseDecorator = (function() {
  function BaseDecorator() {}

  BaseDecorator.decorate = function(model) {
    var data, func, i, len, ref;
    data = _.clone(model.attributes);
    ref = _.functions(this.prototype);
    for (i = 0, len = ref.length; i < len; i++) {
      func = ref[i];
      if (func === 'constructor') {
        continue;
      }
      data[func] = this.prototype[func].apply(model);
    }
    return data;
  };

  return BaseDecorator;

})();

module.exports = BaseDecorator;



},{}],54:[function(require,module,exports){
var FlashCollection,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

FlashCollection = (function(superClass) {
  extend(FlashCollection, superClass);

  function FlashCollection() {
    return FlashCollection.__super__.constructor.apply(this, arguments);
  }

  FlashCollection.prototype.model = require('./model');

  return FlashCollection;

})(Backbone.Collection);

module.exports = FlashCollection;



},{"./model":56}],55:[function(require,module,exports){
var FlashComponent, FlashList,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

require('./service');

FlashList = require('./views/flashList');

FlashComponent = (function(superClass) {
  extend(FlashComponent, superClass);

  function FlashComponent() {
    this.showListView = bind(this.showListView, this);
    return FlashComponent.__super__.constructor.apply(this, arguments);
  }

  FlashComponent.prototype.initialize = function(options) {
    if (options == null) {
      options = {};
    }
    this.container = options.container;
    return Backbone.Radio.channel('flash').request('collection').then((function(_this) {
      return function(collection) {
        _this.collection = collection;
        return _this.collection.on('update', _this.showListView, _this);
      };
    })(this));
  };

  FlashComponent.prototype.radioEvents = {
    'flash add': 'add',
    'flash reset': 'reset',
    'flash error': 'error',
    'flash warning': 'warning',
    'flash success': 'success'
  };

  FlashComponent.prototype.add = function(options) {
    if (options == null) {
      options = {};
    }
    return this.collection.add(options);
  };

  FlashComponent.prototype.reset = function() {
    return this.collection.reset();
  };

  FlashComponent.prototype.error = function(options) {
    if (options == null) {
      options = {};
    }
    return this.collection.add(_.extend(options, {
      context: 'danger'
    }));
  };

  FlashComponent.prototype.warning = function(options) {
    if (options == null) {
      options = {};
    }
    return this.collection.add(_.extend(options, {
      context: 'warning'
    }));
  };

  FlashComponent.prototype.success = function(options) {
    if (options == null) {
      options = {};
    }
    return this.collection.add(_.extend(options, {
      context: 'success'
    }));
  };

  FlashComponent.prototype.showListView = function() {
    if (!this.rendered) {
      this.container.show(new FlashList({
        collection: this.collection
      }));
      return this.rendered = true;
    }
  };

  return FlashComponent;

})(Backbone.Marionette.Service);

module.exports = FlashComponent;



},{"./service":57,"./views/flashList":58}],56:[function(require,module,exports){
var FlashModel,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

FlashModel = (function(superClass) {
  extend(FlashModel, superClass);

  function FlashModel() {
    return FlashModel.__super__.constructor.apply(this, arguments);
  }

  FlashModel.prototype.defaults = {
    timeout: 5000,
    dismissible: true,
    context: 'info'
  };

  FlashModel.prototype.dismiss = function() {
    return this.collection.remove(this);
  };

  return FlashModel;

})(Backbone.Model);

module.exports = FlashModel;



},{}],57:[function(require,module,exports){
var FlashCollection, FlashService,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

FlashCollection = require('./collection');

FlashService = (function(superClass) {
  extend(FlashService, superClass);

  function FlashService() {
    return FlashService.__super__.constructor.apply(this, arguments);
  }

  FlashService.prototype.radioRequests = {
    'flash collection': 'getCollection'
  };

  FlashService.prototype.alerts = null;

  FlashService.prototype.getCollection = function() {
    return new Promise((function(_this) {
      return function(resolve, reject) {
        _this.alerts || (_this.alerts = new FlashCollection());
        resolve(_this.alerts);
      };
    })(this));
  };

  return FlashService;

})(Backbone.Marionette.Service);

module.exports = new FlashService();



},{"./collection":54}],58:[function(require,module,exports){
var FlashChild, FlashList,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

FlashChild = (function(superClass) {
  extend(FlashChild, superClass);

  function FlashChild() {
    this.dismiss = bind(this.dismiss, this);
    return FlashChild.__super__.constructor.apply(this, arguments);
  }

  FlashChild.prototype.className = 'row';

  FlashChild.prototype.template = require('./templates/flash_child');

  FlashChild.prototype.attributes = {
    style: 'display:none;'
  };

  FlashChild.prototype.ui = {
    close: '[data-click=dismiss]'
  };

  FlashChild.prototype.events = {
    'click @ui.close': 'dismiss'
  };

  FlashChild.prototype.onShow = function() {
    var timeout;
    timeout = this.model.get('timeout');
    return setTimeout(this.dismiss, timeout);
  };

  FlashChild.prototype.onAttach = function() {
    return this.$el.fadeIn();
  };

  FlashChild.prototype.remove = function() {
    return this.$el.slideToggle((function(_this) {
      return function() {
        return Marionette.LayoutView.prototype.remove.call(_this);
      };
    })(this));
  };

  FlashChild.prototype.dismiss = function() {
    var ref;
    return (ref = this.model.collection) != null ? ref.remove(this.model) : void 0;
  };

  return FlashChild;

})(Marionette.LayoutView);

FlashList = (function(superClass) {
  extend(FlashList, superClass);

  function FlashList() {
    return FlashList.__super__.constructor.apply(this, arguments);
  }

  FlashList.prototype.className = 'container-fluid';

  FlashList.prototype.childView = FlashChild;

  return FlashList;

})(Marionette.CollectionView);

module.exports = FlashList;



},{"./templates/flash_child":59}],59:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (context, dismissible, message, strong) {
buf.push("<div class=\"col-xs-12 text-center\"><div role=\"alert\"" + (jade.cls(['alert','alert-dismissible','fade','in',"alert-" + context], [null,null,null,null,true])) + ">");
if ( dismissible)
{
buf.push("<button type=\"button\" data-click=\"dismiss\" aria-label=\"Close\" class=\"close\"><span aria-hidden=\"true\">×</span><span class=\"sr-only\">Close</span></button>");
}
if ( strong)
{
buf.push("<strong>" + (jade.escape(null == (jade_interp = strong + " ") ? "" : jade_interp)) + "</strong>");
}
if ( message)
{
buf.push(jade.escape(null == (jade_interp = message) ? "" : jade_interp));
}
buf.push("</div></div>");}.call(this,"context" in locals_for_with?locals_for_with.context:typeof context!=="undefined"?context:undefined,"dismissible" in locals_for_with?locals_for_with.dismissible:typeof dismissible!=="undefined"?dismissible:undefined,"message" in locals_for_with?locals_for_with.message:typeof message!=="undefined"?message:undefined,"strong" in locals_for_with?locals_for_with.strong:typeof strong!=="undefined"?strong:undefined));;return buf.join("");
};
},{"jade/runtime":69}],60:[function(require,module,exports){
var OverlayComponent, OverlayView,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

OverlayView = (function(superClass) {
  extend(OverlayView, superClass);

  function OverlayView() {
    return OverlayView.__super__.constructor.apply(this, arguments);
  }

  OverlayView.prototype.template = false;

  OverlayView.prototype.className = 'overlay';

  OverlayView.prototype.events = {
    'click': 'onClick'
  };

  OverlayView.prototype.onClick = function() {
    return Backbone.Radio.channel('sidebar').trigger('hide');
  };

  return OverlayView;

})(Mn.LayoutView);

OverlayComponent = (function(superClass) {
  extend(OverlayComponent, superClass);

  function OverlayComponent() {
    return OverlayComponent.__super__.constructor.apply(this, arguments);
  }

  OverlayComponent.prototype.initialize = function(options) {
    if (options == null) {
      options = {};
    }
    return this.container = options.container;
  };

  OverlayComponent.prototype.radioEvents = {
    'overlay ready': 'onReady',
    'overlay show': 'showOverlay',
    'overlay hide': 'hideOverlay'
  };

  OverlayComponent.prototype.showOverlay = function() {
    return $('.overlay-region').addClass('active');
  };

  OverlayComponent.prototype.hideOverlay = function() {
    return $('.overlay-region').removeClass('active');
  };

  OverlayComponent.prototype.onReady = function() {
    if (!this.view) {
      this.view = new OverlayView();
      return this.container.show(this.view);
    }
  };

  return OverlayComponent;

})(Mn.Service);

module.exports = OverlayComponent;



},{}],61:[function(require,module,exports){
var BaseRoute,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

BaseRoute = (function(superClass) {
  extend(BaseRoute, superClass);

  function BaseRoute() {
    return BaseRoute.__super__.constructor.apply(this, arguments);
  }

  BaseRoute.prototype.breadcrumbs = [];

  BaseRoute.prototype.initialize = function(options) {
    this.options = options;
    this.container = options.container;
    this.on('before:enter', (function(_this) {
      return function() {
        return typeof _this.onBeforeEnter === "function" ? _this.onBeforeEnter(arguments) : void 0;
      };
    })(this));
    this.on('before:fetch', (function(_this) {
      return function() {
        return typeof _this.onBeforeFetch === "function" ? _this.onBeforeFetch(arguments) : void 0;
      };
    })(this));
    this.on('before:render', (function(_this) {
      return function() {
        return typeof _this.onBeforeRender === "function" ? _this.onBeforeRender(arguments) : void 0;
      };
    })(this));
    this.on('fetch', (function(_this) {
      return function() {
        return typeof _this.onFetch === "function" ? _this.onFetch(arguments) : void 0;
      };
    })(this));
    this.on('render', (function(_this) {
      return function() {
        return typeof _this.onRender === "function" ? _this.onRender(arguments) : void 0;
      };
    })(this));
    this.on('enter', (function(_this) {
      return function() {
        return typeof _this.onEnter === "function" ? _this.onEnter(arguments) : void 0;
      };
    })(this));
    return Backbone.Radio.channel('sidebar').trigger('hide');
  };

  BaseRoute.prototype._setPageTitle = function() {
    return document.title = _.result(this, 'title');
  };

  BaseRoute.prototype._updateBreadcrumbs = function() {
    var breadcrumbs;
    breadcrumbs = _.result(this, 'breadcrumbs');
    if (breadcrumbs) {
      return Backbone.Radio.channel('breadcrumb').trigger('set', breadcrumbs);
    }
  };

  BaseRoute.prototype.onFetch = function() {
    this._setPageTitle();
    return this._updateBreadcrumbs();
  };

  return BaseRoute;

})(Backbone.Routing.Route);

module.exports = BaseRoute;



},{}],62:[function(require,module,exports){
var BaseRouter,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

BaseRouter = (function(superClass) {
  extend(BaseRouter, superClass);

  function BaseRouter() {
    return BaseRouter.__super__.constructor.apply(this, arguments);
  }

  BaseRouter.prototype.initialize = function(options) {
    return this.container = options.container;
  };

  return BaseRouter;

})(Backbone.Routing.Router);

module.exports = BaseRouter;



},{}],63:[function(require,module,exports){
var NavChild, NavList, NavView,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

NavChild = (function(superClass) {
  extend(NavChild, superClass);

  function NavChild() {
    return NavChild.__super__.constructor.apply(this, arguments);
  }

  NavChild.prototype.tagName = 'li';

  NavChild.prototype.className = 'nav-item';

  NavChild.prototype.template = require('./templates/nav_child');

  NavChild.prototype.behaviors = {
    SelectableChild: {}
  };

  NavChild.prototype.className = function() {
    var css;
    css = 'nav-item';
    if (this.model.get('active')) {
      css += ' active';
    }
    if (this.model.get('dropdown')) {
      css += ' dropdown';
    }
    return css;
  };

  NavChild.prototype.onRender = function() {
    if (this.model.get('active')) {
      return this.triggerMethod('selected');
    }
  };

  NavChild.prototype.onClick = function(e) {
    if (this.model.get('href')) {
      return;
    }
    if (this.model.get('dropdown')) {
      return;
    }
    if (this.$el.hasClass('active')) {
      return;
    }
    if (e != null) {
      e.preventDefault();
    }
    this.triggerMethod('selected');
    return this.$el.addClass('active').siblings().removeClass('active');
  };

  return NavChild;

})(Mn.LayoutView);

NavList = (function(superClass) {
  extend(NavList, superClass);

  function NavList() {
    return NavList.__super__.constructor.apply(this, arguments);
  }

  NavList.prototype.tagName = 'ul';

  NavList.prototype.childView = NavChild;

  NavList.prototype.className = function() {
    var css;
    css = 'nav';
    if (this.options.stacked) {
      return css += ' nav-pills nav-stacked';
    }
    if (this.options.pills) {
      return css += ' nav-pills';
    }
    return css += ' nav-tabs';
  };

  NavList.prototype.childEvents = {
    'selected': 'onChildSelected'
  };

  NavList.prototype.onChildSelected = function(view) {
    this.trigger('nav:change', view);
    return this.trigger(view.model.get('trigger'));
  };

  return NavList;

})(Mn.CollectionView);

NavView = (function(superClass) {
  extend(NavView, superClass);

  function NavView() {
    this._getActiveNav = bind(this._getActiveNav, this);
    return NavView.__super__.constructor.apply(this, arguments);
  }

  NavView.prototype.template = require('./templates/nav');

  NavView.prototype.regions = {
    navRegion: '[data-region=nav]',
    contentRegion: '[data-region=content]'
  };

  NavView.prototype.behaviors = function() {
    if (this.navOptions.stateful) {
      return {
        ViewState: {
          key: this.navOptions.stateful
        }
      };
    }
    return {};
  };

  NavView.prototype.navItems = [
    {
      icon: 'fa-times',
      text: 'Default Nav',
      trigger: 'default'
    }
  ];

  NavView.prototype.navOptions = {};

  NavView.prototype.navEvents = {};

  NavView.prototype.initialize = function() {
    var trigger;
    this.navOptions = _.result(this, 'navOptions') || {};
    this.navItems = _.result(this, 'navItems');
    trigger = this._getActiveNav();
    if (!trigger) {
      return;
    }
    return _.map(this.navItems, function(item) {
      if (item.trigger === trigger) {
        return item.active = true;
      }
      return item.active = false;
    });
  };

  NavView.prototype.templateHelpers = function() {
    return {
      stacked: this.navOptions.stacked || null
    };
  };

  NavView.prototype._getActiveNav = function() {
    var ref, state;
    if (this.navOptions.stateful) {
      state = this.getState();
      if (state) {
        return state;
      }
    }
    return ((ref = _.findWhere(this.navItems, {
      "default": true
    })) != null ? ref.trigger : void 0) || null;
  };

  NavView.prototype._setActiveNav = function(navChildView) {
    this.activeNav = navChildView;
    if (!this.navOptions.stateful) {
      return;
    }
    return this.setState(navChildView.model.get('trigger'));
  };

  NavView.prototype.triggerActiveNav = function() {
    var ref;
    return (ref = this.activeNav) != null ? ref.trigger('selected') : void 0;
  };

  NavView.prototype.showNavView = function() {
    this.navCollection = new Backbone.Collection(this.navItems);
    this.navList = new NavList(_.extend(this.navOptions, {
      collection: this.navCollection
    }));
    this.navList.on('nav:change', (function(_this) {
      return function(navChildView) {
        return _this._setActiveNav(navChildView);
      };
    })(this));
    Mn.bindEntityEvents(this, this.navList, _.result(this, 'navEvents'));
    return this.navRegion.show(this.navList);
  };

  NavView.prototype.onRender = function() {
    return this.showNavView();
  };

  return NavView;

})(Mn.LayoutView);

module.exports = NavView;



},{"./templates/nav":64,"./templates/nav_child":65}],64:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (span, stacked) {
buf.push("<div class=\"row\">");
if ( stacked)
{
buf.push("<div data-region=\"nav\"" + (jade.cls(["col-xs-" + (span) + ""], [true])) + "></div><div data-region=\"content\"" + (jade.cls(["col-xs-" + (12-span) + ""], [true])) + "></div>");
}
else
{
buf.push("<div class=\"col-xs-12\"><div class=\"row\"><div data-region=\"nav\" class=\"col-xs-12\"></div></div><div class=\"row m-t-1\"><div data-region=\"content\" class=\"col-xs-12\"></div></div></div>");
}
buf.push("</div>");}.call(this,"span" in locals_for_with?locals_for_with.span:typeof span!=="undefined"?span:undefined,"stacked" in locals_for_with?locals_for_with.stacked:typeof stacked!=="undefined"?stacked:undefined));;return buf.join("");
};
},{"jade/runtime":69}],65:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (dropdown, href, icon, linkCss, text, trigger, undefined) {
if ( !dropdown)
{
buf.push("<a" + (jade.attr("href", href, true, false)) + (jade.attr("data-trigger", trigger, true, false)) + (jade.cls(['nav-link','cursor-pointer',linkCss], [null,null,true])) + ">");
if ( icon)
{
buf.push("<i" + (jade.cls(['fa','fa-fw',icon], [null,null,true])) + "></i>&nbsp;");
}
buf.push((jade.escape(null == (jade_interp = text) ? "" : jade_interp)) + "</a>");
}
else
{
buf.push("<a data-toggle=\"dropdown\" class=\"nav-link cursor-pointer dropdown-toggle\">");
if ( icon)
{
buf.push("<i" + (jade.cls(['fa','fa-fw',icon], [null,null,true])) + "></i>&nbsp;");
}
buf.push((jade.escape(null == (jade_interp = text) ? "" : jade_interp)) + "</a><div class=\"dropdown-menu w-100\">");
// iterate dropdown
;(function(){
  var $$obj = dropdown;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var item = $$obj[$index];

buf.push("<a class=\"dropdown-item\">" + (jade.escape(null == (jade_interp = item.text) ? "" : jade_interp)) + "</a>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var item = $$obj[$index];

buf.push("<a class=\"dropdown-item\">" + (jade.escape(null == (jade_interp = item.text) ? "" : jade_interp)) + "</a>");
    }

  }
}).call(this);

buf.push("</div>");
}}.call(this,"dropdown" in locals_for_with?locals_for_with.dropdown:typeof dropdown!=="undefined"?dropdown:undefined,"href" in locals_for_with?locals_for_with.href:typeof href!=="undefined"?href:undefined,"icon" in locals_for_with?locals_for_with.icon:typeof icon!=="undefined"?icon:undefined,"linkCss" in locals_for_with?locals_for_with.linkCss:typeof linkCss!=="undefined"?linkCss:undefined,"text" in locals_for_with?locals_for_with.text:typeof text!=="undefined"?text:undefined,"trigger" in locals_for_with?locals_for_with.trigger:typeof trigger!=="undefined"?trigger:undefined,"undefined" in locals_for_with?locals_for_with.undefined:typeof undefined!=="undefined"?undefined:undefined));;return buf.join("");
};
},{"jade/runtime":69}],66:[function(require,module,exports){
var PaginationView,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

PaginationView = (function(superClass) {
  extend(PaginationView, superClass);

  function PaginationView() {
    return PaginationView.__super__.constructor.apply(this, arguments);
  }

  PaginationView.prototype.tagName = 'ul';

  PaginationView.prototype.template = require('./templates/pagination');

  PaginationView.prototype.className = function() {
    if (this.options.pager) {
      return 'pager';
    }
    return 'pagination';
  };

  PaginationView.prototype.getTemplate = function() {
    if (this.options.pager) {
      return require('./templates/pager');
    }
    return require('./templates/pagination');
  };

  PaginationView.prototype.ui = {
    first: '[data-click=first]',
    prev: '[data-click=prev]',
    page: '[data-click=page]',
    next: '[data-click=next]',
    last: '[data-click=last]'
  };

  PaginationView.prototype.events = {
    'click @ui.first': 'firstPage',
    'click @ui.prev': 'prevPage',
    'click @ui.page': 'goToPage',
    'click @ui.next': 'nextPage',
    'click @ui.last': 'lastPage'
  };

  PaginationView.prototype.collectionEvents = {
    'reset': 'render'
  };

  PaginationView.prototype.firstPage = function() {
    return this.collection.firstPage();
  };

  PaginationView.prototype.prevPage = function() {
    return this.collection.prevPage();
  };

  PaginationView.prototype.nextPage = function() {
    return this.collection.nextPage();
  };

  PaginationView.prototype.lastPage = function() {
    return this.collection.lastPage();
  };

  PaginationView.prototype.goToPage = function(e) {
    return this.collection.getPage(this.$(e.currentTarget).data('page'));
  };

  PaginationView.prototype.onRender = function() {
    return this.state.totalPages <= 1 && this.$el.hide() || this.$el.show();
  };

  PaginationView.prototype.templateHelpers = function() {
    return this.windowedPageNumber();
  };

  PaginationView.prototype.windowedPageNumber = function() {
    var end, i, inner_window, j, k, l, left, m, middle, outer_window, ref, ref1, ref2, ref3, ref4, results, results1, results2, results3, results4, right, right_start, start, window_from, window_to;
    this.state = _.clone(this.collection.state);
    inner_window = 4;
    outer_window = 1;
    window_from = this.state.currentPage - inner_window;
    window_to = this.state.currentPage + inner_window;
    if (window_to > this.state.totalPages) {
      window_from -= window_to - this.state.totalPages;
      window_to = this.state.totalPages;
    }
    if (window_from < 1) {
      window_to += 1 - window_from;
      window_from = 1;
      if (window_to > this.state.totalPages) {
        window_to = this.state.totalPages;
      }
    }
    middle = (function() {
      results = [];
      for (var i = window_from; window_from <= window_to ? i <= window_to : i >= window_to; window_from <= window_to ? i++ : i--){ results.push(i); }
      return results;
    }).apply(this);
    if (outer_window + 3 < middle[0]) {
      left = (function() {
        results1 = [];
        for (var j = 1, ref = outer_window + 1; 1 <= ref ? j <= ref : j >= ref; 1 <= ref ? j++ : j--){ results1.push(j); }
        return results1;
      }).apply(this);
      left.push("...");
    } else {
      left = (function() {
        results2 = [];
        for (var k = 1, ref1 = middle[0]; 1 <= ref1 ? k < ref1 : k > ref1; 1 <= ref1 ? k++ : k--){ results2.push(k); }
        return results2;
      }).apply(this);
    }
    if ((this.state.totalPages - outer_window - 2) > middle[middle.length - 1]) {
      right = (function() {
        results3 = [];
        for (var l = ref2 = this.state.totalPages - outer_window, ref3 = this.state.totalPages; ref2 <= ref3 ? l <= ref3 : l >= ref3; ref2 <= ref3 ? l++ : l--){ results3.push(l); }
        return results3;
      }).apply(this);
      right.unshift("...");
    } else {
      right_start = Math.min(middle[middle.length - 1] + 1, this.state.totalPages);
      right = (function() {
        results4 = [];
        for (var m = right_start, ref4 = this.state.totalPages; right_start <= ref4 ? m <= ref4 : m >= ref4; right_start <= ref4 ? m++ : m--){ results4.push(m); }
        return results4;
      }).apply(this);
      if (right_start === this.state.totalPages) {
        right = [];
      }
    }
    this.state.shown = left.concat(middle.concat(right));
    this.state.empty = _.isEmpty(this.state.shown);
    start = this.state.currentPage > 1 ? (this.state.currentPage - 1) * this.state.pageSize : 1;
    end = ((this.state.currentPage - 1) * this.state.pageSize) + this.state.pageSize;
    end = end > this.state.totalRecords ? this.state.totalRecords : end;
    this.state.displayText = start + " - " + end + " of " + this.state.totalRecords + " " + (this.options.plural || 'items');
    return this.state;
  };

  return PaginationView;

})(Mn.LayoutView);

module.exports = PaginationView;



},{"./templates/pager":67,"./templates/pagination":68}],67:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (attrs, currentPage, displayText, totalPages) {
attrs = { style: 'border-radius: 0;' }
if ( currentPage - 1 > 0)
{
buf.push("<li class=\"pager-prev\"><a" + (jade.attrs(jade.merge([{"data-click": "prev","class": "cursor-pointer z-depth-1"},attrs]), false)) + "><i class=\"fa fa-angle-left\"></i></a></li>");
}
else
{
buf.push("<li class=\"disabled pager-prev\"><a" + (jade.attrs(jade.merge([attrs]), false)) + "><i class=\"fa fa-angle-left\"></i></a></li>");
}
buf.push("<li><a style=\"border:none;background:none;\"><div class=\"text-muted text-center\">" + (jade.escape(null == (jade_interp = displayText) ? "" : jade_interp)) + "</div></a></li>");
if ( currentPage < totalPages)
{
buf.push("<li class=\"pager-next\"><a" + (jade.attrs(jade.merge([{"data-click": "next","class": "cursor-pointer z-depth-1"},attrs]), false)) + "><i class=\"fa fa-angle-right\"></i></a></li>");
}
else
{
buf.push("<li class=\"disabled pager-next\"><a" + (jade.attrs(jade.merge([attrs]), false)) + "><i class=\"fa fa-angle-right\"></i></a></li>");
}}.call(this,"attrs" in locals_for_with?locals_for_with.attrs:typeof attrs!=="undefined"?attrs:undefined,"currentPage" in locals_for_with?locals_for_with.currentPage:typeof currentPage!=="undefined"?currentPage:undefined,"displayText" in locals_for_with?locals_for_with.displayText:typeof displayText!=="undefined"?displayText:undefined,"totalPages" in locals_for_with?locals_for_with.totalPages:typeof totalPages!=="undefined"?totalPages:undefined));;return buf.join("");
};
},{"jade/runtime":69}],68:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (currentPage, empty, shown, totalPages, undefined) {
if ( currentPage != 1)
{
buf.push("<li class=\"page-item\"><a data-click=\"first\" class=\"page-link cursor-pointer\"><i class=\"fa fa-angle-double-left\"></i></a></li>");
}
else
{
buf.push("<li class=\"page-item disabled\"><a class=\"page-link\"><i class=\"fa fa-angle-double-left\"></i></a></li>");
}
if ( currentPage - 1 > 0)
{
buf.push("<li class=\"page-item\"><a data-click=\"prev\" class=\"page-link cursor-pointer\"><i class=\"fa fa-angle-left\"></i></a></li>");
}
else
{
buf.push("<li class=\"page-item disabled\"><a class=\"page-link\"><i class=\"fa fa-angle-left\"></i></a></li>");
}
if ( !empty)
{
// iterate shown
;(function(){
  var $$obj = shown;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var page = $$obj[$index];

if ( page == '...')
{
buf.push("<li class=\"page-item\"><a class=\"page-link disabled\">...</a></li>");
}
else
{
if ( page == currentPage)
{
buf.push("<li class=\"page-item active\"><a class=\"page-link\">" + (jade.escape(null == (jade_interp = page) ? "" : jade_interp)) + "</a></li>");
}
else
{
buf.push("<li class=\"page-item\"><a data-click=\"page\"" + (jade.attr("data-page", page, true, false)) + " class=\"page-link cursor-pointer\">" + (jade.escape(null == (jade_interp = page) ? "" : jade_interp)) + "</a></li>");
}
}
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var page = $$obj[$index];

if ( page == '...')
{
buf.push("<li class=\"page-item\"><a class=\"page-link disabled\">...</a></li>");
}
else
{
if ( page == currentPage)
{
buf.push("<li class=\"page-item active\"><a class=\"page-link\">" + (jade.escape(null == (jade_interp = page) ? "" : jade_interp)) + "</a></li>");
}
else
{
buf.push("<li class=\"page-item\"><a data-click=\"page\"" + (jade.attr("data-page", page, true, false)) + " class=\"page-link cursor-pointer\">" + (jade.escape(null == (jade_interp = page) ? "" : jade_interp)) + "</a></li>");
}
}
    }

  }
}).call(this);

}
if ( currentPage < totalPages)
{
buf.push("<li class=\"page-item\"><a data-click=\"next\" class=\"page-link cursor-pointer\"><i class=\"fa fa-angle-right\"></i></a></li>");
}
else
{
buf.push("<li class=\"page-item disabled\"><a class=\"page-link\"><i class=\"fa fa-angle-right\"></i></a></li>");
}
if ( currentPage != totalPages)
{
buf.push("<li class=\"page-item\"><a data-click=\"last\" class=\"page-link cursor-pointer\"><i class=\"fa fa-angle-double-right\"></i></a></li>");
}
else
{
buf.push("<li class=\"page-item disabled\"><a class=\"page-link\"><i class=\"fa fa-angle-double-right\"></i></a></li>");
}}.call(this,"currentPage" in locals_for_with?locals_for_with.currentPage:typeof currentPage!=="undefined"?currentPage:undefined,"empty" in locals_for_with?locals_for_with.empty:typeof empty!=="undefined"?empty:undefined,"shown" in locals_for_with?locals_for_with.shown:typeof shown!=="undefined"?shown:undefined,"totalPages" in locals_for_with?locals_for_with.totalPages:typeof totalPages!=="undefined"?totalPages:undefined,"undefined" in locals_for_with?locals_for_with.undefined:typeof undefined!=="undefined"?undefined:undefined));;return buf.join("");
};
},{"jade/runtime":69}],69:[function(require,module,exports){
(function (global){
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.jade = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/**
 * Merge two attribute objects giving precedence
 * to values in object `b`. Classes are special-cased
 * allowing for arrays and merging/joining appropriately
 * resulting in a string.
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object} a
 * @api private
 */

exports.merge = function merge(a, b) {
  if (arguments.length === 1) {
    var attrs = a[0];
    for (var i = 1; i < a.length; i++) {
      attrs = merge(attrs, a[i]);
    }
    return attrs;
  }
  var ac = a['class'];
  var bc = b['class'];

  if (ac || bc) {
    ac = ac || [];
    bc = bc || [];
    if (!Array.isArray(ac)) ac = [ac];
    if (!Array.isArray(bc)) bc = [bc];
    a['class'] = ac.concat(bc).filter(nulls);
  }

  for (var key in b) {
    if (key != 'class') {
      a[key] = b[key];
    }
  }

  return a;
};

/**
 * Filter null `val`s.
 *
 * @param {*} val
 * @return {Boolean}
 * @api private
 */

function nulls(val) {
  return val != null && val !== '';
}

/**
 * join array as classes.
 *
 * @param {*} val
 * @return {String}
 */
exports.joinClasses = joinClasses;
function joinClasses(val) {
  return (Array.isArray(val) ? val.map(joinClasses) :
    (val && typeof val === 'object') ? Object.keys(val).filter(function (key) { return val[key]; }) :
    [val]).filter(nulls).join(' ');
}

/**
 * Render the given classes.
 *
 * @param {Array} classes
 * @param {Array.<Boolean>} escaped
 * @return {String}
 */
exports.cls = function cls(classes, escaped) {
  var buf = [];
  for (var i = 0; i < classes.length; i++) {
    if (escaped && escaped[i]) {
      buf.push(exports.escape(joinClasses([classes[i]])));
    } else {
      buf.push(joinClasses(classes[i]));
    }
  }
  var text = joinClasses(buf);
  if (text.length) {
    return ' class="' + text + '"';
  } else {
    return '';
  }
};


exports.style = function (val) {
  if (val && typeof val === 'object') {
    return Object.keys(val).map(function (style) {
      return style + ':' + val[style];
    }).join(';');
  } else {
    return val;
  }
};
/**
 * Render the given attribute.
 *
 * @param {String} key
 * @param {String} val
 * @param {Boolean} escaped
 * @param {Boolean} terse
 * @return {String}
 */
exports.attr = function attr(key, val, escaped, terse) {
  if (key === 'style') {
    val = exports.style(val);
  }
  if ('boolean' == typeof val || null == val) {
    if (val) {
      return ' ' + (terse ? key : key + '="' + key + '"');
    } else {
      return '';
    }
  } else if (0 == key.indexOf('data') && 'string' != typeof val) {
    if (JSON.stringify(val).indexOf('&') !== -1) {
      console.warn('Since Jade 2.0.0, ampersands (`&`) in data attributes ' +
                   'will be escaped to `&amp;`');
    };
    if (val && typeof val.toISOString === 'function') {
      console.warn('Jade will eliminate the double quotes around dates in ' +
                   'ISO form after 2.0.0');
    }
    return ' ' + key + "='" + JSON.stringify(val).replace(/'/g, '&apos;') + "'";
  } else if (escaped) {
    if (val && typeof val.toISOString === 'function') {
      console.warn('Jade will stringify dates in ISO form after 2.0.0');
    }
    return ' ' + key + '="' + exports.escape(val) + '"';
  } else {
    if (val && typeof val.toISOString === 'function') {
      console.warn('Jade will stringify dates in ISO form after 2.0.0');
    }
    return ' ' + key + '="' + val + '"';
  }
};

/**
 * Render the given attributes object.
 *
 * @param {Object} obj
 * @param {Object} escaped
 * @return {String}
 */
exports.attrs = function attrs(obj, terse){
  var buf = [];

  var keys = Object.keys(obj);

  if (keys.length) {
    for (var i = 0; i < keys.length; ++i) {
      var key = keys[i]
        , val = obj[key];

      if ('class' == key) {
        if (val = joinClasses(val)) {
          buf.push(' ' + key + '="' + val + '"');
        }
      } else {
        buf.push(exports.attr(key, val, false, terse));
      }
    }
  }

  return buf.join('');
};

/**
 * Escape the given string of `html`.
 *
 * @param {String} html
 * @return {String}
 * @api private
 */

var jade_encode_html_rules = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;'
};
var jade_match_html = /[&<>"]/g;

function jade_encode_char(c) {
  return jade_encode_html_rules[c] || c;
}

exports.escape = jade_escape;
function jade_escape(html){
  var result = String(html).replace(jade_match_html, jade_encode_char);
  if (result === '' + html) return html;
  else return result;
};

/**
 * Re-throw the given `err` in context to the
 * the jade in `filename` at the given `lineno`.
 *
 * @param {Error} err
 * @param {String} filename
 * @param {String} lineno
 * @api private
 */

exports.rethrow = function rethrow(err, filename, lineno, str){
  if (!(err instanceof Error)) throw err;
  if ((typeof window != 'undefined' || !filename) && !str) {
    err.message += ' on line ' + lineno;
    throw err;
  }
  try {
    str = str || require('fs').readFileSync(filename, 'utf8')
  } catch (ex) {
    rethrow(err, null, lineno)
  }
  var context = 3
    , lines = str.split('\n')
    , start = Math.max(lineno - context, 0)
    , end = Math.min(lines.length, lineno + context);

  // Error context
  var context = lines.slice(start, end).map(function(line, i){
    var curr = i + start + 1;
    return (curr == lineno ? '  > ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'Jade') + ':' + lineno
    + '\n' + context + '\n\n' + err.message;
  throw err;
};

exports.DebugItem = function DebugItem(lineno, filename) {
  this.lineno = lineno;
  this.filename = filename;
}

},{"fs":2}],2:[function(require,module,exports){

},{}]},{},[1])(1)
});
}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"fs":42}]},{},[14])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9hZWtzY28vZ2l0aHViL255c19oZWFsdGgvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL2Fla3Njby9naXRodWIvbnlzX2hlYWx0aC9hcHAvY29mZmVlL2FwcC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2dpdGh1Yi9ueXNfaGVhbHRoL2FwcC9jb2ZmZWUvYXBwbGljYXRpb24vdmlld3MvbGF5b3V0LmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vZ2l0aHViL255c19oZWFsdGgvYXBwL2NvZmZlZS9iZWhhdmlvcnMvaW5kZXguY29mZmVlIiwiL1VzZXJzL2Fla3Njby9naXRodWIvbnlzX2hlYWx0aC9hcHAvY29mZmVlL2JlaGF2aW9ycy9zZWxlY3RhYmxlQ2hpbGQuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9naXRodWIvbnlzX2hlYWx0aC9hcHAvY29mZmVlL2NvbXBvbmVudHMvaGVhZGVyL2NvbXBvbmVudC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2dpdGh1Yi9ueXNfaGVhbHRoL2FwcC9jb2ZmZWUvY29tcG9uZW50cy9oZWFkZXIvdmlld3MvbGF5b3V0LmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vZ2l0aHViL255c19oZWFsdGgvYXBwL2NvZmZlZS9jb21wb25lbnRzL2hlYWRlci92aWV3cy90ZW1wbGF0ZXMvaGVhZGVyLmphZGUiLCIvVXNlcnMvYWVrc2NvL2dpdGh1Yi9ueXNfaGVhbHRoL2FwcC9jb2ZmZWUvY29tcG9uZW50cy9zaWRlYmFyL2NvbXBvbmVudC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2dpdGh1Yi9ueXNfaGVhbHRoL2FwcC9jb2ZmZWUvY29tcG9uZW50cy9zaWRlYmFyL3RlbXBsYXRlLmphZGUiLCIvVXNlcnMvYWVrc2NvL2dpdGh1Yi9ueXNfaGVhbHRoL2FwcC9jb2ZmZWUvY29tcG9uZW50cy9zaWRlYmFyL3ZpZXcuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9naXRodWIvbnlzX2hlYWx0aC9hcHAvY29mZmVlL2NvbmZpZy9pbmRleC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2dpdGh1Yi9ueXNfaGVhbHRoL2FwcC9jb2ZmZWUvY29uZmlnL2p3dC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2dpdGh1Yi9ueXNfaGVhbHRoL2FwcC9jb2ZmZWUvY29uZmlnL21hcmlvbmV0dGUuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9naXRodWIvbnlzX2hlYWx0aC9hcHAvY29mZmVlL21hbmlmZXN0LmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vZ2l0aHViL255c19oZWFsdGgvYXBwL2NvZmZlZS9tb2R1bGVzL2hvbWUvYWJvdXQvcm91dGUuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9naXRodWIvbnlzX2hlYWx0aC9hcHAvY29mZmVlL21vZHVsZXMvaG9tZS9hYm91dC92aWV3cy9sYXlvdXQuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9naXRodWIvbnlzX2hlYWx0aC9hcHAvY29mZmVlL21vZHVsZXMvaG9tZS9hYm91dC92aWV3cy90ZW1wbGF0ZXMvbGF5b3V0LmphZGUiLCIvVXNlcnMvYWVrc2NvL2dpdGh1Yi9ueXNfaGVhbHRoL2FwcC9jb2ZmZWUvbW9kdWxlcy9ob21lL2Rhc2hib2FyZC9yb3V0ZS5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2dpdGh1Yi9ueXNfaGVhbHRoL2FwcC9jb2ZmZWUvbW9kdWxlcy9ob21lL2Rhc2hib2FyZC92aWV3cy9maWx0ZXIuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9naXRodWIvbnlzX2hlYWx0aC9hcHAvY29mZmVlL21vZHVsZXMvaG9tZS9kYXNoYm9hcmQvdmlld3MvZm9ybS5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2dpdGh1Yi9ueXNfaGVhbHRoL2FwcC9jb2ZmZWUvbW9kdWxlcy9ob21lL2Rhc2hib2FyZC92aWV3cy9pdGVtRGV0YWlsLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vZ2l0aHViL255c19oZWFsdGgvYXBwL2NvZmZlZS9tb2R1bGVzL2hvbWUvZGFzaGJvYXJkL3ZpZXdzL2l0ZW1MaXN0LmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vZ2l0aHViL255c19oZWFsdGgvYXBwL2NvZmZlZS9tb2R1bGVzL2hvbWUvZGFzaGJvYXJkL3ZpZXdzL2xheW91dC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2dpdGh1Yi9ueXNfaGVhbHRoL2FwcC9jb2ZmZWUvbW9kdWxlcy9ob21lL2Rhc2hib2FyZC92aWV3cy9tYXAuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9naXRodWIvbnlzX2hlYWx0aC9hcHAvY29mZmVlL21vZHVsZXMvaG9tZS9kYXNoYm9hcmQvdmlld3MvdGVtcGxhdGVzL2ZpbHRlci5qYWRlIiwiL1VzZXJzL2Fla3Njby9naXRodWIvbnlzX2hlYWx0aC9hcHAvY29mZmVlL21vZHVsZXMvaG9tZS9kYXNoYm9hcmQvdmlld3MvdGVtcGxhdGVzL2Zvcm0uamFkZSIsIi9Vc2Vycy9hZWtzY28vZ2l0aHViL255c19oZWFsdGgvYXBwL2NvZmZlZS9tb2R1bGVzL2hvbWUvZGFzaGJvYXJkL3ZpZXdzL3RlbXBsYXRlcy9pdGVtX2NoaWxkLmphZGUiLCIvVXNlcnMvYWVrc2NvL2dpdGh1Yi9ueXNfaGVhbHRoL2FwcC9jb2ZmZWUvbW9kdWxlcy9ob21lL2Rhc2hib2FyZC92aWV3cy90ZW1wbGF0ZXMvaXRlbV9kZXRhaWwuamFkZSIsIi9Vc2Vycy9hZWtzY28vZ2l0aHViL255c19oZWFsdGgvYXBwL2NvZmZlZS9tb2R1bGVzL2hvbWUvZGFzaGJvYXJkL3ZpZXdzL3RlbXBsYXRlcy9pdGVtX2VtcHR5LmphZGUiLCIvVXNlcnMvYWVrc2NvL2dpdGh1Yi9ueXNfaGVhbHRoL2FwcC9jb2ZmZWUvbW9kdWxlcy9ob21lL2Rhc2hib2FyZC92aWV3cy90ZW1wbGF0ZXMvbGF5b3V0LmphZGUiLCIvVXNlcnMvYWVrc2NvL2dpdGh1Yi9ueXNfaGVhbHRoL2FwcC9jb2ZmZWUvbW9kdWxlcy9ob21lL2Rhc2hib2FyZC92aWV3cy90ZW1wbGF0ZXMvbG9hZGluZy5qYWRlIiwiL1VzZXJzL2Fla3Njby9naXRodWIvbnlzX2hlYWx0aC9hcHAvY29mZmVlL21vZHVsZXMvaG9tZS9kYXNoYm9hcmQvdmlld3MvdGVtcGxhdGVzL21hcC5qYWRlIiwiL1VzZXJzL2Fla3Njby9naXRodWIvbnlzX2hlYWx0aC9hcHAvY29mZmVlL21vZHVsZXMvaG9tZS9kYXNoYm9hcmQvdmlld3MvdGVtcGxhdGVzL3Zpb2xhdGlvbl9pdGVtLmphZGUiLCIvVXNlcnMvYWVrc2NvL2dpdGh1Yi9ueXNfaGVhbHRoL2FwcC9jb2ZmZWUvbW9kdWxlcy9ob21lL2Rhc2hib2FyZC92aWV3cy90ZW1wbGF0ZXMvdmlvbGF0aW9uX2xpc3QuamFkZSIsIi9Vc2Vycy9hZWtzY28vZ2l0aHViL255c19oZWFsdGgvYXBwL2NvZmZlZS9tb2R1bGVzL2hvbWUvZW50aXRpZXMuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9naXRodWIvbnlzX2hlYWx0aC9hcHAvY29mZmVlL21vZHVsZXMvaG9tZS9mYWN0b3J5LmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vZ2l0aHViL255c19oZWFsdGgvYXBwL2NvZmZlZS9tb2R1bGVzL2hvbWUvcm91dGVyLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vZ2l0aHViL255c19oZWFsdGgvYXBwL2NvZmZlZS9tb2R1bGVzL3BhcmFtcy9mYWN0b3J5LmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vZ2l0aHViL255c19oZWFsdGgvYXBwL2NvZmZlZS9tb2R1bGVzL3BhcmFtcy9wbHVja2VkL2NpdGllcy5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2dpdGh1Yi9ueXNfaGVhbHRoL2FwcC9jb2ZmZWUvbW9kdWxlcy9wYXJhbXMvcGx1Y2tlZC9jb3VudGllcy5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2dpdGh1Yi9ueXNfaGVhbHRoL2FwcC9jb2ZmZWUvbW9kdWxlcy9wYXJhbXMvcGx1Y2tlZC96aXBzLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vZ2l0aHViL255c19oZWFsdGgvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1yZXNvbHZlL2VtcHR5LmpzIiwiL1VzZXJzL2Fla3Njby9naXRodWIvbnlzX2hlYWx0aC9ub2RlX21vZHVsZXMvaG5fYmVoYXZpb3JzL2xpYi9iaW5kQmFzZS5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2dpdGh1Yi9ueXNfaGVhbHRoL25vZGVfbW9kdWxlcy9obl9iZWhhdmlvcnMvbGliL2JpbmRJbnB1dHMuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9naXRodWIvbnlzX2hlYWx0aC9ub2RlX21vZHVsZXMvaG5fYmVoYXZpb3JzL2xpYi9mbGFzaGVzLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vZ2l0aHViL255c19oZWFsdGgvbm9kZV9tb2R1bGVzL2huX2JlaGF2aW9ycy9saWIvbW9kZWxFdmVudHMuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9naXRodWIvbnlzX2hlYWx0aC9ub2RlX21vZHVsZXMvaG5fYmVoYXZpb3JzL2xpYi9zdWJtaXRCdXR0b24uY29mZmVlIiwiL1VzZXJzL2Fla3Njby9naXRodWIvbnlzX2hlYWx0aC9ub2RlX21vZHVsZXMvaG5fYmVoYXZpb3JzL2xpYi90b29sdGlwcy5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2dpdGh1Yi9ueXNfaGVhbHRoL25vZGVfbW9kdWxlcy9obl9icmVhZGNydW1iL2xpYi9jb21wb25lbnQuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9naXRodWIvbnlzX2hlYWx0aC9ub2RlX21vZHVsZXMvaG5fYnJlYWRjcnVtYi9saWIvdmlld3MvYnJlYWRjcnVtYkxpc3QuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9naXRodWIvbnlzX2hlYWx0aC9ub2RlX21vZHVsZXMvaG5fYnJlYWRjcnVtYi9saWIvdmlld3MvdGVtcGxhdGVzL2JyZWFkY3J1bWJfY2hpbGQuamFkZSIsIi9Vc2Vycy9hZWtzY28vZ2l0aHViL255c19oZWFsdGgvbm9kZV9tb2R1bGVzL2huX2VudGl0aWVzL2xpYi9jb25maWcuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9naXRodWIvbnlzX2hlYWx0aC9ub2RlX21vZHVsZXMvaG5fZW50aXRpZXMvbGliL2RlY29yYXRvci5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2dpdGh1Yi9ueXNfaGVhbHRoL25vZGVfbW9kdWxlcy9obl9mbGFzaC9saWIvY29sbGVjdGlvbi5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2dpdGh1Yi9ueXNfaGVhbHRoL25vZGVfbW9kdWxlcy9obl9mbGFzaC9saWIvY29tcG9uZW50LmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vZ2l0aHViL255c19oZWFsdGgvbm9kZV9tb2R1bGVzL2huX2ZsYXNoL2xpYi9tb2RlbC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2dpdGh1Yi9ueXNfaGVhbHRoL25vZGVfbW9kdWxlcy9obl9mbGFzaC9saWIvc2VydmljZS5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2dpdGh1Yi9ueXNfaGVhbHRoL25vZGVfbW9kdWxlcy9obl9mbGFzaC9saWIvdmlld3MvZmxhc2hMaXN0LmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vZ2l0aHViL255c19oZWFsdGgvbm9kZV9tb2R1bGVzL2huX2ZsYXNoL2xpYi92aWV3cy90ZW1wbGF0ZXMvZmxhc2hfY2hpbGQuamFkZSIsIi9Vc2Vycy9hZWtzY28vZ2l0aHViL255c19oZWFsdGgvbm9kZV9tb2R1bGVzL2huX292ZXJsYXkvbGliL2NvbXBvbmVudC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2dpdGh1Yi9ueXNfaGVhbHRoL25vZGVfbW9kdWxlcy9obl9yb3V0aW5nL2xpYi9yb3V0ZS5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2dpdGh1Yi9ueXNfaGVhbHRoL25vZGVfbW9kdWxlcy9obl9yb3V0aW5nL2xpYi9yb3V0ZXIuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9naXRodWIvbnlzX2hlYWx0aC9ub2RlX21vZHVsZXMvaG5fdmlld3MvbGliL25hdi9pbmRleC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2dpdGh1Yi9ueXNfaGVhbHRoL25vZGVfbW9kdWxlcy9obl92aWV3cy9saWIvbmF2L3RlbXBsYXRlcy9uYXYuamFkZSIsIi9Vc2Vycy9hZWtzY28vZ2l0aHViL255c19oZWFsdGgvbm9kZV9tb2R1bGVzL2huX3ZpZXdzL2xpYi9uYXYvdGVtcGxhdGVzL25hdl9jaGlsZC5qYWRlIiwiL1VzZXJzL2Fla3Njby9naXRodWIvbnlzX2hlYWx0aC9ub2RlX21vZHVsZXMvaG5fdmlld3MvbGliL3BhZ2luYXRpb24vaW5kZXguY29mZmVlIiwiL1VzZXJzL2Fla3Njby9naXRodWIvbnlzX2hlYWx0aC9ub2RlX21vZHVsZXMvaG5fdmlld3MvbGliL3BhZ2luYXRpb24vdGVtcGxhdGVzL3BhZ2VyLmphZGUiLCIvVXNlcnMvYWVrc2NvL2dpdGh1Yi9ueXNfaGVhbHRoL25vZGVfbW9kdWxlcy9obl92aWV3cy9saWIvcGFnaW5hdGlvbi90ZW1wbGF0ZXMvcGFnaW5hdGlvbi5qYWRlIiwiL1VzZXJzL2Fla3Njby9naXRodWIvbnlzX2hlYWx0aC9ub2RlX21vZHVsZXMvamFkZS9ydW50aW1lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDR0EsSUFBQSxXQUFBO0VBQUE7OztBQUFNOzs7Ozs7O3dCQUVKLFdBQUEsR0FDRTtJQUFBLGNBQUEsRUFBZ0IsWUFBaEI7Ozt3QkFHRixVQUFBLEdBQVksU0FBQTtJQUdWLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixRQUF2QixDQUFnQyxDQUFDLE9BQWpDLENBQXlDLE9BQXpDO0lBR0EsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFlBQXZCLENBQW9DLENBQUMsT0FBckMsQ0FBNkMsT0FBN0M7SUFDQSxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsU0FBdkIsQ0FBaUMsQ0FBQyxPQUFsQyxDQUEwQyxPQUExQztJQUNBLElBQUMsQ0FBQSxPQUFELENBQUE7QUFDQSxXQUFPO0VBVEc7O3dCQWNaLE9BQUEsR0FBUyxTQUFBO0lBQ1AsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFqQixDQUFBO1dBQ0EsUUFB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QUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQSxJQUFBLDhEQUFBO0VBQUE7OztBQUFNOzs7Ozs7OzJCQUNKLFFBQUEsR0FBVTs7MkJBRVYsVUFBQSxHQUFZLFNBQUE7QUFDVixXQUFPLElBQUMsQ0FBQSxH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MkpmLFdBM0plLEVBNEpmLFlBNUplLEVBNkpmLGVBN0plLEVBOEpmLFVBOUplLEVBK0pmLFlBL0plLEVBZ0tmLFlBaEtlLEVBaUtmLGFBaktlLEVBa0tmLGVBbEtlLEVBbUtmLFdBbktlLEVBb0tmLFdBcEtlLEVBcUtmLFVBcktlLEVBc0tmLFVBdEtlLEVBdUtmLGVBdktlLEVBd0tmLFlBeEtlLEVBeUtmLGtCQXpLZSxFQTBLZixZQTFLZSxFQTJLZixZQTNLZSxFQTRLZixhQTVLZSxFQTZLZixZQTdLZSxFQThLZixZQTlLZSxFQStLZixXQS9LZSxFQWdMZixTQWhMZSxFQWlMZixPQWpMZSxFQWtMZixZQWxMZSxFQW1MZixZQW5MZSxFQW9MZixjQXBMZSxFQXFMZixZQXJMZSxFQXNMZixZQXRMZSxFQXVMZixXQXZMZSxFQXdMZixVQXhMZSxFQXlMZixVQXpMZSxFQTBMZixXQTFMZSxFQTJMZixTQTNMZSxFQTRMZixPQTVMZSxFQTZMZixZQTdMZSxFQThMZixhQTlMZSxFQStMZixNQS9MZSxFQWdNZixPQWhNZSxFQWlNZixXQWpNZSxFQWtNZixPQWxNZSxFQW1NZixTQW5NZSxFQW9NZixXQXBNZSxFQXFNZixXQXJNZSxFQXNNZixXQXRNZSxFQXVNZixXQXZNZSxFQXdNZixXQXhNZSxFQXlNZixRQXpNZSxFQTBNZixlQTFNZSxFQTJNZixVQTNNZSxFQTRNZixVQTVNZSxFQTZNZixVQTdNZSxFQThNZixlQTlNZSxFQStNZixRQS9NZSxFQWdOZixhQWhOZSxFQWlOZixjQWpOZSxFQWtOZixhQWxOZSxFQW1OZixjQW5OZSxFQW9OZixhQXBOZSxFQXFOZixZQXJOZSxFQXNOZixXQXROZSxFQXVOZixRQXZOZSxFQXdOZixVQXhOZSxFQXlOZixRQXpOZSxFQTBOZixRQTFOZSxFQTJOZixTQTNOZSxFQTROZixjQTVOZSxFQTZOZixhQTdOZSxFQThOZixVQTlOZSxFQStOZixRQS9OZSxFQWdPZixRQWhPZSxFQWlPZixZQWpPZSxFQWtPZixjQWxPZSxFQW1PZixhQW5PZSxFQW9PZixVQXBPZSxFQXFPZixXQXJPZSxF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QXpFZSxFQTBFZixPQTFFZSxFQTJFZixPQTNFZSxFQTRFZixPQTVFZSxFQTZFZixXQTdFZSxFQThFZixPQTlFZSxFQStFZixPQS9FZSxFQWdGZixPQWhGZSxFQWlGZixPQWpGZSxFQWtGZixPQWxGZSxFQW1GZixPQW5GZSxFQW9GZixPQXBGZSxFQXFGZixPQXJGZSxFQXNGZixPQXRGZSxFQXVGZixPQXZGZSxFQXdGZixXQXhGZSxFQXlGZixPQXpGZSxFQTBGZixPQTFGZSxFQTJGZixXQTNGZSxFQTRGZixPQTVGZSxFQTZGZixPQTdGZSxFQThGZixPQTlGZSxFQStGZixPQS9GZSxFQWdHZixPQWhHZSxFQWlHZixPQWpHZSxFQWtHZixPQWxHZSxFQW1HZixPQW5HZSxFQW9HZixPQXBHZSxFQXFHZixPQXJHZSxFQXNHZixPQXRHZSxFQXVHZixPQXZHZSxFQXdHZixPQXhHZSxFQXlHZixPQXpHZSxFQTBHZixPQTFHZSxFQTJHZixXQTNHZSxFQTRHZixPQTVHZSxFQTZHZixPQTdHZSxFQThHZixPQTlHZSxFQStHZixPQS9HZSxFQWdIZixPQWhIZSxFQWlIZixPQWpIZSxFQWtIZixPQWxIZSxFQW1IZixPQW5IZSxFQW9IZixPQXBIZSxFQXFIZixPQXJIZSxFQXNIZixPQXRIZSxFQXVIZixPQXZIZSxFQXdIZixPQXhIZSxFQXlIZixPQXpIZSxFQTBIZixPQTFIZSxFQTJIZixPQTNIZSxFQTRIZixPQTVIZSxFQTZIZixPQTdIZSxFQThIZixPQTlIZSxFQStIZixPQS9IZSxFQWdJZixPQWhJZSxFQWlJZixPQWpJZSxFQWtJZixPQWxJZSxFQW1JZixPQW5JZSxFQW9JZixPQXBJZSxFQXFJZixPQXJJZSxFQXNJZixPQXRJZSxFQXVJZixPQXZJZSxFQXdJZixPQXhJZSxFQXlJZixPQXpJZSxFQTBJZixPQTFJZSxFQTJJZixPQTNJZSxFQTRJZixPQTVJZSxFQTZJZixPQTdJZSxFQThJZixPQTlJZSxFQStJZixPQS9JZSxFQWdKZixPQWhKZSxFQWlKZixPQWpKZSxFQWtKZixPQWxKZSxFQW1KZixPQW5KZSxFQW9KZixPQXBKZSxFQXFKZixPQXJKZSxFQXNKZixPQXRKZSxFQXVKZixPQXZKZSxFQXdKZixPQXhKZSxFQXlKZixPQXpKZSxFQTBKZixXQTFKZSxFQTJKZixPQTNKZSxFQTRKZixPQTVKZSxFQTZKZixXQTdKZSxFQThKZixPQTlKZSxFQStKZixXQS9KZSxFQWdLZixXQWhLZSxFQWlLZixXQWpLZSxFQWtLZixXQWxLZSxFQW1LZixXQW5LZSxFQW9LZixPQXBLZSxFQXFLZixPQXJLZSxFQXNLZixXQXRLZSxFQXVLZixXQXZLZSxFQXdLZixXQXhLZSxFQXlLZixXQXpLZSxFQTBLZixPQTFLZSxFQTJLZixPQTNLZSxFQTRLZixPQTVLZSxFQTZLZixPQTdLZSxFQThLZixXQTlLZSxFQStLZixXQS9LZSxFQWdMZixPQWhMZSxFQWlMZixXQWpMZSxFQWtMZixXQWxMZSxFQW1MZixXQW5MZSxFQW9MZixXQXBMZSxFQXFMZixXQXJMZSxFQXNMZixPQXRMZSxFQXVMZixXQXZMZSxFQXdMZixXQXhMZSxFQXlMZixPQXpMZSxFQTBMZixXQTFMZSxFQTJMZixXQTNMZSxFQTRMZixXQTVMZSxFQTZMZixXQTdMZSxFQThMZixPQTlMZSxFQStMZixPQS9MZSxFQWdNZixXQWhNZSxFQWlNZixXQWpNZSxFQWtNZixXQWxNZSxFQW1NZixPQW5NZSxFQW9NZixPQXBNZSxFQXFNZixPQXJNZSxFQXNNZixPQXRNZSxFQXVNZixPQXZNZSxFQXdNZixPQXhNZSxFQXlNZixPQXpNZSxFQTBNZixPQTFNZSxFQTJNZixPQTNNZSxFQTRNZixPQTVNZSxFQTZNZixXQTdNZSxFQThNZixXQTlNZSxFQStNZixPQS9NZSxFQWdOZixXQWhOZSxFQWlOZixXQWpOZSxFQWtOZixPQWxOZSxFQW1OZixPQW5OZSxFQW9OZixXQXBOZSxFQXFOZixXQXJOZSxFQXNOZixXQXROZSxFQXVOZixXQXZOZSxFQXdOZixXQXhOZSxFQXlOZixXQXpOZSxFQTBOZixPQTFOZSxFQTJOZixXQTNOZSxFQTROZixPQTVOZSxFQTZOZixPQTdOZSxFQThOZixPQTlOZSxFQStOZixXQS9OZSxFQWdPZixPQWhPZSxFQWlPZixXQWpPZSxFQWtPZixXQWxPZSxFQW1PZixXQW5PZSxFQW9PZixXQXBPZSxFQXFPZixXQXJPZSxFQXNPZixXQXRPZSxFQXVPZixXQXZPZSxFQXdPZixPQXhPZSxFQXlPZixXQXpPZSxFQTBPZixXQTFPZSxFQTJPZixXQTNPZSxFQTRPZixXQTVPZSxFQTZPZixXQTdPZSxFQThPZixXQTlPZSxFQStPZixXQS9PZSxFQWdQZixXQWhQZSxFQWlQZixXQWpQZSxFQWtQZixXQWxQZSxFQW1QZixPQW5QZSxFQW9QZixXQXBQZSxFQXFQZixXQXJQZSxFQXNQZixXQXRQZSxFQXVQZixXQXZQZSxFQXdQZixXQXhQZSxFQXlQZixPQXpQZSxFQTBQZixXQTFQZSxFQTJQZixXQTNQZSxFQTRQZixPQTVQZSxFQTZQZixPQTdQZSxFQThQZixXQTlQZSxFQStQZixXQS9QZSxFQWdRZixPQWhRZSxFQWlRZixXQWpRZSxFQWtRZixXQWxRZSxFQW1RZixXQW5RZSxFQW9RZixXQXBRZSxFQXFRZixXQXJRZSxFQXNRZixXQXRRZSxFQXVRZixXQXZRZSxFQXdRZixXQXhRZSxFQXlRZixXQXpRZSxFQTBRZixXQTFRZSxFQTJRZixPQTNRZSxFQTRRZixXQTVRZSxFQTZRZixXQTdRZSxFQThRZixXQTlRZSxFQStRZixXQS9RZSxFQWdSZixXQWhSZSxFQWlSZixPQWpSZSxFQWtSZixXQWxSZSxFQW1SZixXQW5SZSxFQW9SZixXQXBSZSxFQXFSZixXQXJSZSxFQXNSZixXQXRSZSxFQXVSZixXQXZSZSxFQXdSZixPQXhSZSxFQXlSZixXQXpSZSxFQTBSZixXQTFSZSxFQTJSZixXQTNSZSxFQTRSZixXQTVSZSxFQTZSZixXQTdSZSxFQThSZixXQTlSZSxFQStSZixPQS9SZSxFQWdTZixPQWhTZSxFQWlTZixXQWpTZSxFQWtTZixXQWxTZSxFQW1TZixPQW5TZSxFQW9TZixXQXBTZSxFQXFTZixXQXJTZSxFQXNTZixXQXRTZSxFQXVTZixPQXZTZSxFQXdTZixRQXhTZSxFQXlTZixPQXpTZSxFQTBTZixXQTFTZSxFQTJTZixPQTNTZSxFQTRTZixXQTVTZSxFQTZTZixXQTdTZSxFQThTZixXQTlTZSxFQStTZixXQS9TZSxFQWdUZixXQWhUZSxFQWlUZixXQWpUZSxFQWtUZixXQWxUZSxFQW1UZixPQW5UZSxFQW9UZixXQXBUZSxFQXFUZixXQXJUZSxFQXNUZixXQXRUZSxFQXVUZixXQXZUZSxFQXdUZixXQXhUZSxFQXlUZixPQXpUZSxFQTBUZixXQTFUZSxFQTJUZixPQTNUZSxFQTRUZixXQTVUZSxFQTZUZixXQTdUZSxFQThUZixXQTlUZSxFQStUZixXQS9UZSxFQWdVZixXQWhVZSxFQWlVZixXQWpVZSxFQWtVZixXQWxVZSxFQW1VZixXQW5VZSxFQW9VZixXQXBVZSxFQXFVZixXQXJVZSxFQXNVZixXQXRVZSxFQXVVZixPQXZVZSxFQXdVZixXQXhVZSxFQXlVZixPQXpVZSxFQTBVZixXQTFVZSxFQTJVZixPQTNVZSxFQTRVZixXQTVVZSxFQTZVZixPQTdVZSxFQThVZixXQTlVZSxFQStVZixXQS9VZSxFQWdWZixPQWhWZSxFQWlWZixXQWpWZSxFQWtWZixXQWxWZSxFQW1WZixPQW5WZSxFQW9WZixVQXBWZSxFQXFWZixPQXJWZSxFQXNWZixXQXRWZSxFQXVWZixPQXZWZSxFQXdWZixPQXhWZSxFQXlWZixXQXpWZSxFQTBWZixXQTFWZSxFQTJWZixXQTNWZSxFQTRWZixXQTVWZSxFQTZWZixXQTdWZSxFQThWZixXQTlWZSxFQStWZixXQS9WZSxFQWdXZixPQWhXZSxFQWlXZixXQWpXZSxFQWtXZixXQWxXZSxFQW1XZixXQW5XZSxFQW9XZixXQXBXZSxFQXFXZixPQXJXZSxFQXNXZixPQXRXZSxFQXVXZixXQXZXZSxFQXdXZixXQXhXZSxFQXlXZixXQXpXZSxFQTBXZixXQTFXZSxFQTJXZixXQTNXZSxFQTRXZixPQTVXZSxFQTZXZixXQTdXZSxFQThXZixPQTlXZSxFQStXZixXQS9XZSxFQWdYZixPQWhYZSxFQWlYZixPQWpYZSxFQWtYZixPQWxYZSxFQW1YZixXQW5YZSxFQW9YZixPQXBYZSxFQXFYZixXQXJYZSxFQXNYZixXQXRYZSxFQXVYZixXQXZYZSxFQXdYZixXQXhYZSxFQXlYZixPQXpYZSxFQTBYZixXQTFYZSxFQTJYZixXQTNYZSxFQTRYZixXQTVYZSxFQTZYZixXQTdYZSxFQThYZixPQTlYZSxFQStYZixPQS9YZSxFQWdZZixXQWhZZSxFQWlZZixPQWpZZSxFQWtZZixXQWxZZSxFQW1ZZixXQW5ZZSxFQW9ZZixXQXBZZSxFQXFZZixPQXJZZSxFQXNZZixPQXRZZSxFQXVZZixXQXZZZSxFQXdZZixPQXhZZSxFQXlZZixXQXpZZSxFQTBZZixPQTFZZSxFQTJZZixPQTNZZSxFQTRZZixXQTVZZSxFQTZZZixXQTdZZSxFQThZZixXQTlZZSxFQStZZixXQS9ZZSxFQWdaZixXQWhaZSxFQWlaZixPQWpaZSxFQWtaZixPQWxaZSxFQW1aZixXQW5aZSxFQW9aZixXQXBaZSxFQXFaZixXQXJaZSxFQXNaZixXQXRaZSxFQXVaZixPQXZaZSxFQXdaZixPQXhaZSxFQXlaZixXQXpaZSxFQTBaZixPQTFaZSxFQTJaZixXQTNaZSxFQTRaZixXQTVaZSxFQTZaZixPQTdaZSxFQThaZixPQTlaZSxFQStaZixXQS9aZSxFQWdhZixXQWhhZSxFQWlhZixXQWphZSxFQWthZixXQWxhZSxFQW1hZixXQW5hZSxFQW9hZixPQXBhZSxFQXFhZixXQXJhZSxFQXNhZixXQXRhZSxFQXVhZixXQXZhZSxFQXdhZixPQXhhZSxFQXlhZixXQXphZSxFQTBhZixPQTFhZSxFQTJhZixXQTNhZSxFQTRhZixXQTVhZSxFQTZhZixXQTdhZSxFQThhZixXQTlhZSxFQSthZixXQS9hZSxFQWdiZixXQWhiZSxFQWliZixXQWpiZSxFQWtiZixXQWxiZSxFQW1iZixPQW5iZSxFQW9iZixXQXBiZSxFQXFiZixXQXJiZSxFQXNiZixXQXRiZSxFQXViZixXQXZiZSxFQXdiZixPQXhiZSxFQXliZixXQXpiZSxFQTBiZixPQTFiZSxFQTJiZixPQTNiZSxFQTRiZixPQTViZSxFQTZiZixPQTdiZSxFQThiZixPQTliZSxFQStiZixPQS9iZSxFQWdjZixP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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlxuIyBBcHBsaWNhdGlvbiBjbGFzcyBkZWZpbml0aW9uXG4jIE1hbmFnZXMgbGlmZWN5Y2xlIGFuZCBib290c3RyYXBzIGFwcGxpY2F0aW9uXG5jbGFzcyBBcHBsaWNhdGlvbiBleHRlbmRzIE1hcmlvbmV0dGUuU2VydmljZVxuXG4gIHJhZGlvRXZlbnRzOlxuICAgICdhcHAgcmVkaXJlY3QnOiAncmVkaXJlY3RUbydcblxuICAjIEludm9rZWQgYWZ0ZXIgY29uc3RydWN0b3JcbiAgaW5pdGlhbGl6ZTogLT5cblxuICAgICMgU3RhcnRzIEhlYWRlciBDb21wb25lbnRcbiAgICBCYWNrYm9uZS5SYWRpby5jaGFubmVsKCdoZWFkZXInKS50cmlnZ2VyKCdyZXNldCcpXG5cbiAgICAjIFN0YXJ0cyBIZW5zb24uanMgQ29tcG9uZW50c1xuICAgIEJhY2tib25lLlJhZGlvLmNoYW5uZWwoJ2JyZWFkY3J1bWInKS50cmlnZ2VyKCdyZWFkeScpXG4gICAgQmFja2JvbmUuUmFkaW8uY2hhbm5lbCgnb3ZlcmxheScpLnRyaWdnZXIoJ3JlYWR5JylcbiAgICBAb25SZWFkeSgpXG4gICAgcmV0dXJuIHRydWVcblxuICAjIFN0YXJ0cyB0aGUgYXBwbGljYXRpb25cbiAgIyBTdGFydHMgQmFja2JvbmUuaGlzdG9yeSAoZW5hYmxlcyByb3V0aW5nKVxuICAjIEFuZCBpbml0aWFsaXplcyBzaWRlYmFyIG1vZHVsZVxuICBvblJlYWR5OiAtPlxuICAgIEJhY2tib25lLmhpc3Rvcnkuc3RhcnQoKVxuICAgIEJhY2tib25lLlJhZGlvLmNoYW5uZWwoJ3NpZGViYXInKS50cmlnZ2VyKCdyZXNldCcpXG5cbiAgIyBSZWRpcmVjdGlvbiBpbnRlcmZhY2VcbiAgIyBVc2VkIGFjY3Jvc3MgdGhlIGFwcGxpY2F0aW9uIHRvIHJlZGlyZWN0XG4gICMgdG8gc3BlY2lmaWMgdmlld3MgYWZ0ZXIgc3BlY2lmaWMgYWN0aW9uc1xuICByZWRpcmVjdFRvOiAocm91dGUpIC0+XG4gICAgd2luZG93LmxvY2F0aW9uID0gcm91dGVcbiAgICByZXR1cm4gdHJ1ZVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBBcHBsaWNhdGlvblxuIiwiXG4jIEFwcGxpY2F0aW9uTGF5b3V0IGNsYXNzIGRlZmluaXRpb25cbiMgRGVmaW5lcyBhIE1hcmlvbmV0dGUuTGF5b3V0VmlldyB0byBtYW5hZ2VcbiMgdG9wLWxldmVsIGFwcGxpY2F0aW9uIHJlZ2lvbnNcbmNsYXNzIEFwcGxpY2F0aW9uTGF5b3V0IGV4dGVuZHMgTWFyaW9uZXR0ZS5MYXlvdXRWaWV3XG4gIGVsOiAnYm9keSdcblxuICB0ZW1wbGF0ZTogZmFsc2VcblxuICByZWdpb25zOlxuICAgIGhlYWRlcjogICAgICdbYXBwLXJlZ2lvbj1oZWFkZXJdJ1xuICAgIHNpZGViYXI6ICAgICdbYXBwLXJlZ2lvbj1zaWRlYmFyXSdcbiAgICBicmVhZGNydW1iOiAnW2FwcC1yZWdpb249YnJlYWRjcnVtYl0nXG4gICAgb3ZlcmxheTogICAgJ1thcHAtcmVnaW9uPW92ZXJsYXldJ1xuICAgIGZsYXNoOiAgICAgICdbYXBwLXJlZ2lvbj1mbGFzaF0nXG4gICAgbWFpbjogICAgICAgJ1thcHAtcmVnaW9uPW1haW5dJ1xuXG4jICMgIyAjICNcblxuIyBFeHBvcnRzIGluc3RhbmNlXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBBcHBsaWNhdGlvbkxheW91dCgpLnJlbmRlcigpXG4iLCJcbiMgTWFyaW9uZXR0ZSBCZWhhdmlvciBNYW5pZmVzdFxubW9kdWxlLmV4cG9ydHMgPVxuICBTdWJtaXRCdXR0b246ICAgICByZXF1aXJlICdobl9iZWhhdmlvcnMvbGliL3N1Ym1pdEJ1dHRvbidcbiAgRmxhc2hlczogICAgICAgICAgcmVxdWlyZSAnaG5fYmVoYXZpb3JzL2xpYi9mbGFzaGVzJ1xuICBNb2RlbEV2ZW50czogICAgICByZXF1aXJlICdobl9iZWhhdmlvcnMvbGliL21vZGVsRXZlbnRzJ1xuICBCaW5kSW5wdXRzOiAgICAgICByZXF1aXJlICdobl9iZWhhdmlvcnMvbGliL2JpbmRJbnB1dHMnXG4gIFRvb2x0aXBzOiAgICAgICAgIHJlcXVpcmUgJ2huX2JlaGF2aW9ycy9saWIvdG9vbHRpcHMnXG4gIFNlbGVjdGFibGVDaGlsZDogIHJlcXVpcmUgJy4vc2VsZWN0YWJsZUNoaWxkJ1xuIiwiXG5jbGFzcyBTZWxlY3RhYmxlQ2hpbGQgZXh0ZW5kcyBNYXJpb25ldHRlLkJlaGF2aW9yXG5cbiAgY3NzOlxuICAgIGFjdGl2ZTogJ2FjdGl2ZSdcblxuICBldmVudHM6XG4gICAgJ2NsaWNrJzogICdvbkNsaWNrJ1xuXG4gIG1vZGVsRXZlbnRzOlxuICAgICdzZWxlY3RlZCc6ICdvbkNsaWNrJ1xuXG4gICMgU2VsZWN0cyBhY3RpdmVNb2RlbCBvbiByZW5kZXJcbiAgb25SZW5kZXI6IC0+XG4gICAgcmV0dXJuIHVubGVzcyBAb3B0aW9ucy5zZXRBY3RpdmVcbiAgICBAJGVsLnRyaWdnZXIoJ2NsaWNrJykgaWYgQHZpZXcubW9kZWwuY29sbGVjdGlvbi5fYWN0aXZlTW9kZWwgPT0gQHZpZXcubW9kZWwuaWRcblxuICAjIFNldHMgYWN0aXZlTW9kZWwgb24gY2xpY2tcbiAgb25TZWxlY3RlZDogLT5cbiAgICByZXR1cm4gdW5sZXNzIEBvcHRpb25zLnNldEFjdGl2ZVxuICAgIEB2aWV3Lm1vZGVsLmNvbGxlY3Rpb24uX3NldEFjdGl2ZU1vZGVsKEB2aWV3Lm1vZGVsLmlkKVxuICAgIEB2aWV3Lm1vZGVsLmNvbGxlY3Rpb24udHJpZ2dlcignc2VsZWN0ZWQ6bW9kZWwnLCBAdmlldy5tb2RlbClcblxuICAjIEludm9rZWQgd2hlbiBjbGlja2VkXG4gIG9uQ2xpY2s6IChlKSAtPlxuICAgICMgQnlwYXNzIGJlaGF2aW9yIHdpdGggY3VzdG9tIG9uQ2xpY2sgY2FsbGJhY2tcbiAgICByZXR1cm4gQHZpZXcub25DbGljayhlKSBpZiBAdmlldy5vbkNsaWNrXG5cbiAgICAjIFByZXZlbnQgZG91YmxlLWNsaWNrIHVubGVzcyBzcGVjaWZpY2VkXG4gICAgZT8ucHJldmVudERlZmF1bHQoKSB1bmxlc3MgQG9wdGlvbnMuZG91YmxlQ2xpY2tcblxuICAgICMgUmV0dXJuIGlmIGVsZW1lbnQgaXMgY3VycmVudGx5IHNlbGVjdGVkXG4gICAgcmV0dXJuIGlmIEAkZWwuaGFzQ2xhc3MoQGNzcy5hY3RpdmUpXG5cbiAgICAjIFByZXZlbnQgZGVhZnVsdCBhbmQgdHJpZ2dlciBzZWxlY3RlZFxuICAgIGU/LnByZXZlbnREZWZhdWx0KClcbiAgICBAdmlldy50cmlnZ2VyTWV0aG9kICdzZWxlY3RlZCdcbiAgICBAJGVsLmFkZENsYXNzKEBjc3MuYWN0aXZlKS5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKEBjc3MuYWN0aXZlKVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBTZWxlY3RhYmxlQ2hpbGRcbiIsIkxheW91dFZpZXcgPSByZXF1aXJlICcuL3ZpZXdzL2xheW91dCdcblxuIyBIZWFkZXJTZXJ2aWNlIGNsYXNzIGRlZmluaXRpb25cbiMgRGVmaW5lcyBhIGJhc2ljIHNlcnZpY2UgZm9yIG1hbmFnaW5nIGFwcGxpY2F0aW9uXG4jIGhlYWRlciBzdGF0ZS4gRGlzcGxheXMgdGhlIGF1dGhlbnRpY2F0ZWQgdXNlcixcbiMgb3IgdGhlICd1bmF1dGhlbnRpY2F0ZWQnIG1lc3NhZ2UgaWYgbm9uZSBpcyBkZWZpbmVkXG5jbGFzcyBIZWFkZXJTZXJ2aWNlIGV4dGVuZHMgTWFyaW9uZXR0ZS5TZXJ2aWNlXG5cbiAgaW5pdGlhbGl6ZTogLT5cbiAgICBAY29udGFpbmVyID0gQG9wdGlvbnMuY29udGFpbmVyXG5cbiAgcmFkaW9FdmVudHM6XG4gICAgJ2hlYWRlciByZXNldCc6ICdyZXNldCdcblxuICByZXNldDogLT5cbiAgICBAY29udGFpbmVyLnNob3cgbmV3IExheW91dFZpZXcoKVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBIZWFkZXJTZXJ2aWNlXG4iLCJcbiMgSGVhZGVyVmlldyBjbGFzcyBkZWZpbml0aW9uXG4jIERlZmluZXMgYSBzaW1icGxlIHZpZXcgZm9yIGRpc3BsYXlpbmcgdGhlXG4jIGhlYWRlciBvZiB0aGUgYXBwbGljYXRpb24uIFRoZSBoZWFkZXIgZGlzcGxheXNcbiMgdGhlIGF1dGhlbnRpY2F0ZWQgdXNlciBhbmRcbiMgbWFuYWdlcyB0b2dnbGluZyB0aGUgU2lkZWJhckNvbXBvbmVudCdzIHZpZXdcbmNsYXNzIEhlYWRlclZpZXcgZXh0ZW5kcyBNYXJpb25ldHRlLkxheW91dFZpZXdcbiAgdGVtcGxhdGU6IHJlcXVpcmUgJy4vdGVtcGxhdGVzL2hlYWRlcidcbiAgY2xhc3NOYW1lOiAnbmF2IG5hdmJhciBuYXZiYXItc3RhdGljLXRvcCBuYXZiYXItbGlnaHQnXG5cbiAgZXZlbnRzOlxuICAgICdjbGljayAubmF2YmFyLWJyYW5kJzogJ3RvZ2dsZVNpZGViYXInXG5cbiAgdG9nZ2xlU2lkZWJhcjogLT5cbiAgICBCYWNrYm9uZS5SYWRpby5jaGFubmVsKCdzaWRlYmFyJykudHJpZ2dlcigndG9nZ2xlJylcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gSGVhZGVyVmlld1xuIiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG5cbmJ1Zi5wdXNoKFwiPGEgY2xhc3M9XFxcIm5hdmJhci1icmFuZCBidG4gYnRuLXNlY29uZGFyeSBidG4tY2lyY2xlXFxcIj48aSBjbGFzcz1cXFwiZmEgZmEtZncgZmEtY3V0bGVyeVxcXCI+PC9pPjwvYT48ZGl2IGNsYXNzPVxcXCJuYXZiYXItYnJhbmQgdGl0bGVcXFwiPk5ZUyBIRUFMVEggSU5TUEVDVElPTlM8L2Rpdj5cIik7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwiU2lkZWJhclZpZXcgPSByZXF1aXJlICcuL3ZpZXcnXG5cbiMgIyAjICMgI1xuXG4jIFNpZGViYXJDb21wb25lbnQgY2xhc3MgZGVmaW5pdGlvblxuIyBUaGUgU2lkZWJhckNvbXBvbmVudCBtYW5hZ2VzIHRoZSBzdGF0ZSBhbmQgYWNjZXNzaWJpbGl0eVxuIyBvZiB0aGUgYXBwJ3Mgc2lkZWJhci4gVGhlIHNpZGViYXIgaXMgdXNlZCBhcyB0aGUgcHJpbWFyeVxuIyBtZXRob2Qgb2YgbmF2aWdhdGlvbiBpbnNpZGUgdGhlIGFwcFxuY2xhc3MgU2lkZWJhckNvbXBvbmVudCBleHRlbmRzIE1hcmlvbmV0dGUuU2VydmljZVxuXG4gIHJhZGlvRXZlbnRzOlxuICAgICdzaWRlYmFyIHJlc2V0JzogICdzaG93VmlldydcbiAgICAnc2lkZWJhciB0b2dnbGUnOiAndG9nZ2xlU2lkZWJhcidcbiAgICAnc2lkZWJhciBoaWRlJzogICAnaGlkZVNpZGViYXInXG5cbiAgc2hvd1ZpZXc6IC0+XG4gICAgQHZpZXcgPSBuZXcgU2lkZWJhclZpZXcoeyBtb2R1bGVzOiBAbW9kdWxlcyB9KVxuICAgIEBvcHRpb25zLmNvbnRhaW5lci5zaG93KEB2aWV3KVxuXG4gIGhpZGVTaWRlYmFyOiAtPlxuICAgIHJldHVybiB1bmxlc3MgQHZpZXdcbiAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ3NpZGViYXItYWN0aXZlJylcblxuICB0b2dnbGVTaWRlYmFyOiAtPlxuICAgIHJldHVybiB1bmxlc3MgQHZpZXdcbiAgICAkKCdib2R5JykudG9nZ2xlQ2xhc3MoJ3NpZGViYXItYWN0aXZlJylcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gU2lkZWJhckNvbXBvbmVudFxuIiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG47dmFyIGxvY2Fsc19mb3Jfd2l0aCA9IChsb2NhbHMgfHwge30pOyhmdW5jdGlvbiAoaXRlbXMsIHVuZGVmaW5lZCkge1xuamFkZV9taXhpbnNbXCJzaWRlYmFyTGlua1wiXSA9IGphZGVfaW50ZXJwID0gZnVuY3Rpb24ob3B0cyl7XG52YXIgYmxvY2sgPSAodGhpcyAmJiB0aGlzLmJsb2NrKSwgYXR0cmlidXRlcyA9ICh0aGlzICYmIHRoaXMuYXR0cmlidXRlcykgfHwge307XG5idWYucHVzaChcIjxhXCIgKyAoamFkZS5hdHRyKFwiaHJlZlwiLCBvcHRzLmhyZWYsIHRydWUsIGZhbHNlKSkgKyBcIiBjbGFzcz1cXFwibmF2LWxpbmtcXFwiPjxpXCIgKyAoamFkZS5jbHMoWydmYScsJ2ZhLWZ3JywnZmEtbGcnLCdtLXItMScsb3B0cy5pY29uXSwgW251bGwsbnVsbCxudWxsLG51bGwsdHJ1ZV0pKSArIFwiPjwvaT5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IG9wdHMudGl0bGUpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvYT5cIik7XG5pZiAoIG9wdHMuZGl2aWRlcilcbntcbmJ1Zi5wdXNoKFwiPGEgY2xhc3M9XFxcIm5hdi1saW5rIGRpdmlkZXJcXFwiPjwvYT5cIik7XG59XG59O1xuYnVmLnB1c2goXCJcIik7XG4vLyBpdGVyYXRlIGl0ZW1zXG47KGZ1bmN0aW9uKCl7XG4gIHZhciAkJG9iaiA9IGl0ZW1zO1xuICBpZiAoJ251bWJlcicgPT0gdHlwZW9mICQkb2JqLmxlbmd0aCkge1xuXG4gICAgZm9yICh2YXIgJGluZGV4ID0gMCwgJCRsID0gJCRvYmoubGVuZ3RoOyAkaW5kZXggPCAkJGw7ICRpbmRleCsrKSB7XG4gICAgICB2YXIgaXRlbSA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wic2lkZWJhckxpbmtcIl0oaXRlbSk7XG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgdmFyICQkbCA9IDA7XG4gICAgZm9yICh2YXIgJGluZGV4IGluICQkb2JqKSB7XG4gICAgICAkJGwrKzsgICAgICB2YXIgaXRlbSA9ICQkb2JqWyRpbmRleF07XG5cbmphZGVfbWl4aW5zW1wic2lkZWJhckxpbmtcIl0oaXRlbSk7XG4gICAgfVxuXG4gIH1cbn0pLmNhbGwodGhpcyk7XG59LmNhbGwodGhpcyxcIml0ZW1zXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5pdGVtczp0eXBlb2YgaXRlbXMhPT1cInVuZGVmaW5lZFwiP2l0ZW1zOnVuZGVmaW5lZCxcInVuZGVmaW5lZFwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgudW5kZWZpbmVkOnR5cGVvZiB1bmRlZmluZWQhPT1cInVuZGVmaW5lZFwiP3VuZGVmaW5lZDp1bmRlZmluZWQpKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJcbiMgU2lkZWJhclZpZXcgY2xhc3MgZGVmaW5pdGlvblxuIyBUaGUgU2lkZWJhclZpZXcgcmVuZGVycyB0aGUgYXBwJ3Mgc2lkZWJhciB3aXRoXG4jIHRoZSBtZW51SXRlbXMgc3BlY2lmaWVkIGJlbG93XG5jbGFzcyBTaWRlYmFyVmlldyBleHRlbmRzIE1hcmlvbmV0dGUuTGF5b3V0Vmlld1xuICB0ZW1wbGF0ZTogcmVxdWlyZSAnLi90ZW1wbGF0ZSdcbiAgY2xhc3NOYW1lOiAnbmF2IG5hdi1waWxscyBuYXYtc3RhY2tlZCdcbiAgdGFnTmFtZTogJ25hdidcblxuICBtZW51SXRlbXM6IFtcbiAgICB7IGhyZWY6ICcjJywgaWNvbjogJ2ZhLWhvbWUnLCB0aXRsZTogJ0Rhc2hib2FyZCcgfVxuICAgIHsgaHJlZjogJyNhYm91dCcsIGljb246ICdmYS1xdWVzdGlvbi1jaXJjbGUnLCB0aXRsZTogJ0Fib3V0JywgZGl2aWRlcjogdHJ1ZSB9XG4gIF1cblxuICBldmVudHM6XG4gICAgJ2NsaWNrIGEnOiAnb25DbGlja2VkJ1xuXG4gIG9uQ2xpY2tlZDogLT5cbiAgICBCYWNrYm9uZS5SYWRpby5jaGFubmVsKCdzaWRlYmFyJykudHJpZ2dlcignaGlkZScpXG5cbiAgc2VyaWFsaXplRGF0YTogLT5cbiAgICByZXR1cm4geyBpdGVtczogQG1lbnVJdGVtcyB9XG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNpZGViYXJWaWV3XG4iLCIjIEFwcCBjb25maWd1cmF0aW9uIG1hbmlmZXN0XG5yZXF1aXJlICcuL2p3dCdcbiMgcmVxdWlyZSAnLi9jb3JzJ1xucmVxdWlyZSAnLi9tYXJpb25ldHRlJ1xuIiwiIyBBamF4IEpXVCBTaGltXG4kLmFqYXhTZXR1cFxuICBiZWZvcmVTZW5kOiAoeGhyKSAtPlxuICAgIHRva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJylcbiAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignQXV0aG9yaXphdGlvbicsICdKV1QgJyArIHRva2VuKSBpZiB0b2tlblxuICAgIHJldHVyblxuIiwiIyBNYXJpb25ldHRlLkJlaGF2aW9ycyBjb25maWd1cmF0aW9uXG5NYXJpb25ldHRlLkJlaGF2aW9ycy5iZWhhdmlvcnNMb29rdXAgPSAtPiByZXF1aXJlICcuLi9iZWhhdmlvcnMnXG4iLCIjIFRoaXMgZmlsZSBkZWZpbmVzIGEgbWFuaWZlc3QgZm9yIHRoZSBjbGllbnQgYXBwbGljYXRpb24uXG4jIFRoaXMgaW5jbHVkZXMgY29uZmlndXJhdGlvbiwgU2VydmljZXMsIENvbXBvbmVudHMsIE1vZHVsZXNcbiMgYW5kIHRoZSBBcHBsaWNhdGlvbiBzaW5nbGV0b24gaW5zdGFuY2UuXG5cbiMgIyAjICMgI1xuXG4jIEFwcGxpY2F0aW9uIGNvbmZpZ3VyYXRpb24gbWFuaWZlc3RcbnJlcXVpcmUgJy4vY29uZmlnJ1xuXG4jIEFwcGxpY2F0aW9uIGNsYXNzIGRlZmluaXRpb24gJiBBcHAgTGF5b3V0XG5BcHAgICAgICAgPSByZXF1aXJlICcuL2FwcCdcbkFwcExheW91dCA9IHJlcXVpcmUgJy4vYXBwbGljYXRpb24vdmlld3MvbGF5b3V0J1xuXG4jIEhlbnNvbiBFbnRpdGllc1xucmVxdWlyZSAnaG5fZW50aXRpZXMvbGliL2NvbmZpZydcblxuIyAjICMgIyAjXG5cbiMgQ29tcG9uZW50cyBhcmUgcm91dGVsZXNzIHNlcnZpY2VzIHdpdGggdmlld3MgdGhhdCBhcmVcbiMgYWNjZXNzaWJsZSBhbnl3aGVyZSBpbiB0aGUgYXBwbGljYXRpb25cbiMgVXNlZCB0byBtYW5hZ2UgdGhlIGhlYWRlciwgc2lkZWJhciwgZmxhc2gsIGFuZCBjb25maXJtIFVJIGVsZW1lbnRzXG5cbiMgSGVuc29uLmpzIENvbXBvbmVudHNcbkhlYWRlckNvbXBvbmVudCAgICAgPSByZXF1aXJlICcuL2NvbXBvbmVudHMvaGVhZGVyL2NvbXBvbmVudCdcblNpZGViYXJDb21wb25lbnQgICAgPSByZXF1aXJlICcuL2NvbXBvbmVudHMvc2lkZWJhci9jb21wb25lbnQnXG5CcmVhZGNydW1iQ29tcG9uZW50ID0gcmVxdWlyZSAnaG5fYnJlYWRjcnVtYi9saWIvY29tcG9uZW50J1xuT3ZlcmxheUNvbXBvbmVudCAgICA9IHJlcXVpcmUgJ2huX292ZXJsYXkvbGliL2NvbXBvbmVudCdcbkZsYXNoQ29tcG9uZW50ICAgICAgPSByZXF1aXJlICdobl9mbGFzaC9saWIvY29tcG9uZW50J1xubmV3IEhlYWRlckNvbXBvbmVudCh7IGNvbnRhaW5lcjogQXBwTGF5b3V0LmhlYWRlciB9KVxubmV3IFNpZGViYXJDb21wb25lbnQoeyBjb250YWluZXI6IEFwcExheW91dC5zaWRlYmFyIH0pXG5uZXcgQnJlYWRjcnVtYkNvbXBvbmVudCh7IGNvbnRhaW5lcjogQXBwTGF5b3V0LmJyZWFkY3J1bWIgfSlcbm5ldyBPdmVybGF5Q29tcG9uZW50KHsgY29udGFpbmVyOiBBcHBMYXlvdXQub3ZlcmxheSB9KVxubmV3IEZsYXNoQ29tcG9uZW50KHsgY29udGFpbmVyOiBBcHBMYXlvdXQuZmxhc2ggfSlcblxuIyAjICMgIyAjXG5cbiMgTW9kdWxlc1xuIyBNb2R1bGVzIHJlcHJlc2VudCBjb2xsZWN0aW9ucyBvZiBlbmRwb2ludHMgaW4gdGhlIGFwcGxpY2F0aW9uLlxuIyBUaGV5IGhhdmUgcm91dGVzIGFuZCBlbnRpdGllcyAobW9kZWxzIGFuZCBjb2xsZWN0aW9ucylcbiMgRWFjaCByb3V0ZSByZXByZXNlbnRzIGFuIGVuZHBvaW50LCBvciAncGFnZScgaW4gdGhlIGFwcC5cbnJlcXVpcmUgJy4vbW9kdWxlcy9wYXJhbXMvZmFjdG9yeSdcbkhvbWVNb2R1bGUgPSByZXF1aXJlICcuL21vZHVsZXMvaG9tZS9yb3V0ZXInXG5uZXcgSG9tZU1vZHVsZSh7IGNvbnRhaW5lcjogQXBwTGF5b3V0Lm1haW4gfSlcblxuIyAjICMgIyAjICNcblxuIyBQYWdlIGhhcyBsb2FkZWQsIGRvY3VtZW50IGlzIHJlYWR5XG4kKGRvY3VtZW50KS5vbiAncmVhZHknLCA9PiBuZXcgQXBwKCkgIyBJbnN0YW50aWF0ZXMgbmV3IEFwcFxuIiwiTGF5b3V0VmlldyAgPSByZXF1aXJlICcuL3ZpZXdzL2xheW91dCdcblxuIyAjICMgIyAjXG5cbmNsYXNzIEFib3V0Um91dGUgZXh0ZW5kcyByZXF1aXJlICdobl9yb3V0aW5nL2xpYi9yb3V0ZSdcblxuICB0aXRsZTogJ05ZUyBIZWFsdGggSW5zcGVjdGlvbnMgLSBBYm91dCdcblxuICBicmVhZGNydW1iczogW3sgdGV4dDogJ0Fib3V0JyB9XVxuXG4gIHJlbmRlcjogLT5cbiAgICBAY29udGFpbmVyLnNob3cgbmV3IExheW91dFZpZXcoKVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBBYm91dFJvdXRlXG4iLCIjICMgIyAjICNcblxuY2xhc3MgQWJvdXRWaWV3IGV4dGVuZHMgTW4uTGF5b3V0Vmlld1xuICB0ZW1wbGF0ZTogcmVxdWlyZSAnLi90ZW1wbGF0ZXMvbGF5b3V0J1xuICBjbGFzc05hbWU6ICdjb250YWluZXInXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFib3V0Vmlld1xuXG5cbiIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuXG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcInJvd1xcXCI+PGRpdiBjbGFzcz1cXFwiY29sLXhzLTEyXFxcIj48ZGl2IGNsYXNzPVxcXCJjYXJkIGNhcmQtYmxvY2tcXFwiPjxkaXYgY2xhc3M9XFxcInJvd1xcXCI+PGRpdiBjbGFzcz1cXFwiY29sLXhzLTEyIHRleHQtY2VudGVyXFxcIj48cCBjbGFzcz1cXFwibGVhZFxcXCI+QnVpbHQgYnkmbmJzcDs8YSBocmVmPVxcXCJodHRwOi8vYWVrcy5jb1xcXCIgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiPkFsZXhhbmRlciBTY2h3YXJ0emJlcmc8L2E+Jm5ic3A7Zm9yJm5ic3A7PGEgaHJlZj1cXFwiaHR0cDovL29wZW5kYXRhZGF5Lm9yZy9cXFwiIHRhcmdldD1cXFwiX2JsYW5rXFxcIj5PcGVuIERhdGEgRGF5IDIwMTcuPC9hPjwvcD48cCBjbGFzcz1cXFwibGVhZFxcXCI+RGF0YSBwdWxsZWQgZnJvbSZuYnNwOzxhIGhyZWY9XFxcImh0dHBzOi8vaGVhbHRoLmRhdGEubnkuZ292L0hlYWx0aC9Gb29kLVNlcnZpY2UtRXN0YWJsaXNobWVudC1JbnNwZWN0aW9ucy1CZWdpbm5pbmctMi8yaGNjLXNoamlcXFwiIHRhcmdldD1cXFwiX2JsYW5rXFxcIj5IZWFsdGggRGF0YSBOWTwvYT4uPC9wPjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9XFxcInJvdyBtLXQtMlxcXCI+PGRpdiBjbGFzcz1cXFwiY29sLXhzLTEyIHRleHQtY2VudGVyXFxcIj48YSBocmVmPVxcXCJodHRwczovL2dpdGh1Yi5jb20vYWVrc2NvL255c19oZWFsdGhcXFwiIHRhcmdldD1cXFwiX2JsYW5rXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1sZyBidG4tc2Vjb25kYXJ5XFxcIj48aSBjbGFzcz1cXFwiZmEgZmEtZncgZmEtZ2l0aHViXFxcIj48L2k+Jm5ic3A7XFxuR2l0aHViIFJlcG9zaXRvcnk8L2E+PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz1cXFwicm93IG0tdC0yXFxcIj48ZGl2IGNsYXNzPVxcXCJjb2wteHMtMTIgdGV4dC1jZW50ZXJcXFwiPjxwIGNsYXNzPVxcXCJsZWFkXFxcIj5Qb3dlcmVkIGJ5PC9wPjxhIGhyZWY9XFxcImh0dHA6Ly93d3cub25laHVkc29uLmlvL1xcXCIgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiPjxpbWcgc3JjPVxcXCIuL2ltZy9vbmVfaHVkc29uLnBuZ1xcXCIvPjwvYT48L2Rpdj48L2Rpdj48L2Rpdj48L2Rpdj48L2Rpdj5cIik7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwiTGF5b3V0VmlldyAgPSByZXF1aXJlICcuL3ZpZXdzL2xheW91dCdcblxuIyAjICMgIyAjXG5cbmNsYXNzIERhc2hib2FyZFJvdXRlIGV4dGVuZHMgcmVxdWlyZSAnaG5fcm91dGluZy9saWIvcm91dGUnXG5cbiAgdGl0bGU6ICdOWVMgSGVhbHRoIEluc3BlY3Rpb25zIC0gRGFzaGJvYXJkJ1xuXG4gIGJyZWFkY3J1bWJzOiBbeyB0ZXh0OiAnRGFzaGJvYXJkJyB9XVxuXG4gIGZldGNoOiAtPlxuICAgIEBwYXJhbXMgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsKCdwYXJhbXMnKS5yZXF1ZXN0KCdtb2RlbCcpXG5cbiAgICBCYWNrYm9uZS5SYWRpby5jaGFubmVsKCdkYXRhJykucmVxdWVzdCgnY29sbGVjdGlvbicpXG4gICAgLnRoZW4gKGNvbGxlY3Rpb24pID0+IEBjb2xsZWN0aW9uID0gY29sbGVjdGlvblxuXG4gIHJlbmRlcjogLT5cbiAgICBAY29udGFpbmVyLnNob3cgbmV3IExheW91dFZpZXcoeyBjb2xsZWN0aW9uOiBAY29sbGVjdGlvbiwgcGFyYW1zOiBAcGFyYW1zIH0pXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IERhc2hib2FyZFJvdXRlXG4iLCJjbGFzcyBBYnN0cmFjdEZpbHRlcnNWaWV3IGV4dGVuZHMgTW4uTGF5b3V0Vmlld1xuXG4gIGdsb2JhbEF0dHI6ICckZ2xvYmFsJyAjIE5vdGU6IHJlcXVpcmVzIFtuYW1lPSRnbG9iYWxdIGF0dHJpYnV0ZSBvbiBpbnB1dC5cbiAgZ2xvYmFsQXR0cnM6IG51bGwgIyBBcnJheSBvZiBhdHRyaWJ1dGVzIHRvIGZpbHRlciBhZ2FpbnN0LlxuXG4gIGJlaGF2aW9yczpcbiAgICBUb29sdGlwczoge31cblxuICB1aTpcbiAgICBpbnB1dDogICdpbnB1dCdcbiAgICBzZWxlY3Q6ICdzZWxlY3QnXG4gICAgY2xlYXI6ICAnW2RhdGEtY2xpY2s9Y2xlYXJdJ1xuXG4gIGV2ZW50czpcbiAgICAnaW5wdXQgIEB1aS5pbnB1dCcgIDogJ3Rocm90dGxlSW5wdXQnXG4gICAgJ2NoYW5nZSBAdWkuc2VsZWN0JyA6ICdmaWx0ZXJDb2xsZWN0aW9uJ1xuICAgICdjbGljayAgQHVpLmNsZWFyJyAgOiAnY2xlYXInXG5cbiAgIyBUaHJvdHRsZXMgaW5wdXQgZXZlbnQgY2FsbGJhY2tzIG9uIDxpbnB1dD5cbiAgIyBNaXRpZ2F0ZXMgdW5uZWNlc3NhcnkgZXhwZW5zaXZlIGNvbGxlY3Rpb24gZmlsdGVyaW5nXG4gIHRocm90dGxlZEZpbHRlcjogbnVsbFxuICB0aHJvdHRsZUlucHV0OiAtPlxuICAgIEB0aHJvdHRsZWRGaWx0ZXIgfHw9IF8udGhyb3R0bGUoQGZpbHRlckNvbGxlY3Rpb24sIDc1MClcbiAgICBAdGhyb3R0bGVkRmlsdGVyKClcblxuICBjbGVhcjogLT5cbiAgICBAdWkuaW5wdXQudmFsKCcnKVxuICAgIEB1aS5zZWxlY3QudmFsKCcnKVxuICAgIEBmaWx0ZXJDb2xsZWN0aW9uKClcblxuICBmaWx0ZXJDb2xsZWN0aW9uOiAtPlxuICAgIGRhdGEgPSBCYWNrYm9uZS5TeXBob24uc2VyaWFsaXplKHRoaXMpXG5cbiAgICAjIEdsb2JhbCBmaWx0ZXJcbiAgICBpZiBAZ2xvYmFsQXR0cnMgJiYgZGF0YVsgQGdsb2JhbEF0dHIgXT9cblxuICAgICAgIyBSZXNldHMgcXVlcnkgZm9yIGJsYW5rIGdsb2JhbCBzZWFyY2hcbiAgICAgIHJldHVybiBAY29sbGVjdGlvbi5hcHBseUZpbHRlcih7fSkgaWYgIWRhdGFbIEBnbG9iYWxBdHRyIF1cblxuICAgICAgIyBBc3NlbWJsZXMgcXVlcnkgb2JqZWN0XG4gICAgICBxdWVyeSA9IHsgJG9yOiBbXSB9XG5cbiAgICAgICMgSXRlcmF0ZXMgb3ZlciBhdHRyaWJ1dGVzIGFuZCBhc3NpZ25zIHZhbHVlIHRvIHF1ZXJ5XG4gICAgICBmb3IgYXR0ciBpbiBAZ2xvYmFsQXR0cnNcbiAgICAgICAgb2JqID0ge31cbiAgICAgICAgb2JqW2F0dHJdID0geyAkbGlrZUk6IGRhdGFbIEBnbG9iYWxBdHRyIF0gfVxuICAgICAgICBxdWVyeVsnJG9yJ10ucHVzaChvYmopXG5cbiAgICAjIE5vbi1nbG9iYWwgZmlsdGVyXG4gICAgZWxzZVxuICAgICAgcXVlcnlEYXRhID0gW11cbiAgICAgIF8ubWFwT2JqZWN0IGRhdGEsICh2YWwsIGtleSkgPT5cbiAgICAgICAgcmV0dXJuIGRlbGV0ZSBkYXRhW2tleV0gdW5sZXNzIHZhbCAjIFN0cmlwcyBudWxsIHZhbHVlc1xuICAgICAgICBvYmogPSB7fVxuICAgICAgICBvYmpba2V5XSA9IHsgJGxpa2VJOiB2YWwgfVxuICAgICAgICBxdWVyeURhdGEucHVzaChvYmopXG5cbiAgICAgIHF1ZXJ5ID0geyAkYW5kOiBxdWVyeURhdGEgfVxuXG4gICAgIyBRdWVyaWVzIGNvbGxlY3Rpb25cbiAgICBAY29sbGVjdGlvbi5hcHBseUZpbHRlcihxdWVyeSlcblxuICBvbkJlZm9yZURlc3Ryb3k6IC0+XG4gICAgQGNsZWFyKClcblxuIyAjICMgIyAjXG5cbmNsYXNzIEZpbHRlclZpZXcgZXh0ZW5kcyBBYnN0cmFjdEZpbHRlcnNWaWV3XG4gIGNsYXNzTmFtZTogJ3JvdydcbiAgdGVtcGxhdGU6IHJlcXVpcmUgJy4vdGVtcGxhdGVzL2ZpbHRlcidcbiAgZ2xvYmFsQXR0cnM6IFsnb3BlcmF0aW9uX25hbWUnXVxuXG4gIHRlbXBsYXRlSGVscGVyczogLT5cbiAgICB7IHBsYWNlaG9sZGVyOiAnQnVzaW5lc3MgTmFtZScgfVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBGaWx0ZXJWaWV3XG4iLCJcbmNsYXNzIEZvcm1WaWV3IGV4dGVuZHMgTW4uTGF5b3V0Vmlld1xuICB0ZW1wbGF0ZTogcmVxdWlyZSAnLi90ZW1wbGF0ZXMvZm9ybSdcbiAgY2xhc3NOYW1lOiAnY2FyZCBjYXJkLWJsb2NrIG0tYi0wJ1xuXG4gIGV2ZW50czpcbiAgICAnY2hhbmdlIHNlbGVjdCc6ICdvblNlbGVjdENoYW5nZSdcblxuICB0ZW1wbGF0ZUhlbHBlcnM6IC0+XG4gICAgcmV0dXJuIHtcbiAgICAgIGNpdGllczogICBAb3B0aW9ucy5wYXJhbXMuZ2V0KCdjaXRpZXMnKVxuICAgICAgY291bnRpZXM6IEBvcHRpb25zLnBhcmFtcy5nZXQoJ2NvdW50aWVzJylcbiAgICAgIHppcHM6ICAgICBAb3B0aW9ucy5wYXJhbXMuZ2V0KCd6aXBzJylcbiAgICB9XG5cbiAgb25SZW5kZXI6IC0+XG4gICAgc2V0VGltZW91dChAaW5pdFNlbGVjdDIsIDIwMClcblxuICBpbml0U2VsZWN0MjogLT5cbiAgICAjIGNvbnNvbGUubG9nICdJTklUIFNFTEVDVDInXG4gICAgJCgnc2VsZWN0Jykuc2VsZWN0Mih7IHBsYWNlaG9kZXI6ICdDaXR5JyB9KVxuXG4gIG9uU2VsZWN0Q2hhbmdlOiAoZSkgLT5cbiAgICAjIFRPRE8gLSBjaXR5LCBjb3VudHksIHppcCAtIGVsc2U/XG4gICAgZGF0YSA9IEJhY2tib25lLlN5cGhvbi5zZXJpYWxpemUoQClcbiAgICBkYXRhID0ge2ZhY2lsaXR5X2NpdHk6IGRhdGEuY2l0eX1cblxuICAgIEBjb2xsZWN0aW9uLnNlYXJjaChkYXRhKVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBGb3JtVmlld1xuXG5cbiIsIk1hcFZpZXcgPSByZXF1aXJlICcuL21hcCdcblxuIyAjICMgIyAjXG5cbmNsYXNzIFZpb2xhdGlvbkl0ZW0gZXh0ZW5kcyBNbi5MYXlvdXRWaWV3XG4gIHRhZ05hbWU6ICd0cidcbiAgdGVtcGxhdGU6IHJlcXVpcmUgJy4vdGVtcGxhdGVzL3Zpb2xhdGlvbl9pdGVtJ1xuXG4gIGJlaGF2aW9yczpcbiAgICBUb29sdGlwczoge31cblxuICBjbGFzc05hbWU6IC0+XG4gICAgaWYgQG1vZGVsLmlzQ3JpdGljYWwoKVxuICAgICAgcmV0dXJuICd0YWJsZS1kYW5nZXInXG5cbiAgICBlbHNlIGlmIEBtb2RlbC5nZXQoJ3Zpb2xhdGlvbl9pdGVtJykudG9Mb3dlckNhc2UoKSA9PSAnbm9uZSdcbiAgICAgIHJldHVybiAndGFibGUtc3VjY2VzcydcblxuICAgIGVsc2VcbiAgICAgIHJldHVybiAndGFibGUtd2FybmluZydcblxuICB0ZW1wbGF0ZUhlbHBlcnM6IC0+XG4gICAgcmV0dXJuIHsgZGF0ZTogbW9tZW50KEBtb2RlbC5nZXQoJ2RhdGVfb2ZfaW5zcGVjdGlvbicpKS5mb3JtYXQoJ01NL0REL1lZJykgfVxuXG4gIHNlcmlhbGl6ZURhdGE6IC0+XG4gICAgZCA9IHN1cGVyXG4gICAgY29uc29sZS5sb2cgZFxuICAgIHJldHVybiBkXG5cbiMgIyAjICMgI1xuXG5jbGFzcyBWaW9sYXRpb25MaXN0IGV4dGVuZHMgTW4uQ29tcG9zaXRlVmlld1xuICBjbGFzc05hbWU6ICdyb3cnXG4gIHRlbXBsYXRlOiByZXF1aXJlICcuL3RlbXBsYXRlcy92aW9sYXRpb25fbGlzdCdcbiAgY2hpbGRWaWV3OiBWaW9sYXRpb25JdGVtXG4gIGNoaWxkVmlld0NvbnRhaW5lcjogJ3Rib2R5J1xuXG4jICMgIyAjICNcblxuY2xhc3MgVmlvbGF0aW9uTG9hZGVyIGV4dGVuZHMgTW4uTGF5b3V0Vmlld1xuICBjbGFzc05hbWU6ICdjYXJkIGNhcmQtYmxvY2sgdGV4dC1jZW50ZXInXG4gIHRlbXBsYXRlOiByZXF1aXJlICcuL3RlbXBsYXRlcy9sb2FkaW5nJ1xuXG4jICMgIyAjICNcblxuY2xhc3MgVmlld1NlbGVjdG9yIGV4dGVuZHMgcmVxdWlyZSAnaG5fdmlld3MvbGliL25hdidcblxuICBuYXZJdGVtczogW1xuICAgIHsgaWNvbjogJ2ZhLWxpc3QtYWx0JywgICB0ZXh0OiAnVmlvbGF0aW9ucycsIHRyaWdnZXI6ICd2aW9sYXRpb25zJywgZGVmYXVsdDogdHJ1ZSB9XG4gICAgeyBpY29uOiAnZmEtbWFwLW8nLCAgdGV4dDogJ01hcCcsIHRyaWdnZXI6ICdtYXAnIH1cbiAgXVxuXG4gIG5hdkV2ZW50czpcbiAgICAndmlvbGF0aW9ucyc6ICdzaG93VmlvbGF0aW9ucydcbiAgICAnbWFwJzogICAgICAgICdzaG93TWFwJ1xuXG4gIHNob3dWaW9sYXRpb25zOiAtPlxuICAgIEBjb250ZW50UmVnaW9uLnNob3cgbmV3IFZpb2xhdGlvbkxvYWRlcigpXG5cbiAgICBAbW9kZWwuZW5zdXJlVmlvbGF0aW9ucygpLnRoZW4gKHZpb2xhdGlvbnMpID0+XG4gICAgICBAY29udGVudFJlZ2lvbi5zaG93IG5ldyBWaW9sYXRpb25MaXN0KHsgY29sbGVjdGlvbjogdmlvbGF0aW9ucyB9KVxuXG4gIHNob3dNYXA6IC0+XG4gICAgQGNvbnRlbnRSZWdpb24uc2hvdyBuZXcgTWFwVmlldyh7IG1vZGVsOiBAbW9kZWwgfSlcblxuIyAjICMgIyAjXG5cbmNsYXNzIEl0ZW1EZXRhaWwgZXh0ZW5kcyBNbi5MYXlvdXRWaWV3XG4gIGNsYXNzTmFtZTogJ2NhcmQgY2FyZC1ibG9jaydcbiAgdGVtcGxhdGU6IHJlcXVpcmUgJy4vdGVtcGxhdGVzL2l0ZW1fZGV0YWlsJ1xuXG4gIHJlZ2lvbnM6XG4gICAgc2VsZWN0b3JSZWdpb246ICAgJ1tkYXRhLXJlZ2lvbj1zZWxlY3Rvcl0nXG4gICAgbWFwUmVnaW9uOiAgICAgICAgJ1tkYXRhLXJlZ2lvbj1tYXBdJ1xuICAgIHZpb2xhdGlvbnNSZWdpb246ICdbZGF0YS1yZWdpb249dmlvbGF0aW9uc10nXG5cbiAgb25SZW5kZXI6IC0+XG4gICAgQHNlbGVjdG9yUmVnaW9uLnNob3cgbmV3IFZpZXdTZWxlY3Rvcih7IG1vZGVsOiBAbW9kZWwgfSlcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gSXRlbURldGFpbFxuIiwiXG5jbGFzcyBJdGVtRW1wdHkgZXh0ZW5kcyBNbi5MYXlvdXRWaWV3XG4gIHRlbXBsYXRlOiByZXF1aXJlICcuL3RlbXBsYXRlcy9pdGVtX2VtcHR5J1xuICBjbGFzc05hbWU6ICdsaXN0LWdyb3VwLWl0ZW0gbGlzdC1ncm91cC1pdGVtLXdhcm5pbmcnXG5cbiMgIyAjICMgI1xuXG5jbGFzcyBJdGVtQ2hpbGQgZXh0ZW5kcyBNbi5MYXlvdXRWaWV3XG4gIHRlbXBsYXRlOiByZXF1aXJlICcuL3RlbXBsYXRlcy9pdGVtX2NoaWxkJ1xuICBjbGFzc05hbWU6ICdsaXN0LWdyb3VwLWl0ZW0nXG5cbiAgYmVoYXZpb3JzOlxuICAgIFNlbGVjdGFibGVDaGlsZDoge31cblxuIyAjICMgIyAjXG5cbmNsYXNzIEl0ZW1MaXN0IGV4dGVuZHMgTW4uQ29sbGVjdGlvblZpZXdcbiAgY2xhc3NOYW1lOiAnbGlzdC1ncm91cCdcbiAgY2hpbGRWaWV3OiBJdGVtQ2hpbGRcbiAgZW1wdHlWaWV3OiBJdGVtRW1wdHlcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gSXRlbUxpc3RcbiIsIkZvcm1WaWV3ID0gcmVxdWlyZSAnLi9mb3JtJ1xuRmlsdGVyVmlldyA9IHJlcXVpcmUgJy4vZmlsdGVyJ1xuTWFwVmlldyA9IHJlcXVpcmUgJy4vbWFwJ1xuSXRlbUxpc3QgPSByZXF1aXJlICcuL2l0ZW1MaXN0J1xuSXRlbURldGFpbCA9IHJlcXVpcmUgJy4vaXRlbURldGFpbCdcblBhZ2luYXRpb25WaWV3ID0gcmVxdWlyZSAnaG5fdmlld3MvbGliL3BhZ2luYXRpb24nXG5cbiMgIyAjICMgI1xuXG5jbGFzcyBEYXNoYm9hcmRWaWV3IGV4dGVuZHMgTW4uTGF5b3V0Vmlld1xuICB0ZW1wbGF0ZTogcmVxdWlyZSAnLi90ZW1wbGF0ZXMvbGF5b3V0J1xuICBjbGFzc05hbWU6ICdjb250YWluZXItZmx1aWQnXG5cbiAgcmVnaW9uczpcbiAgICBmb3JtUmVnaW9uOiAgICAgICAnW2RhdGEtcmVnaW9uPWZvcm1dJ1xuICAgIGZpbHRlclJlZ2lvbjogICAgICdbZGF0YS1yZWdpb249ZmlsdGVyXSdcbiAgICBsaXN0UmVnaW9uOiAgICAgICAnW2RhdGEtcmVnaW9uPWxpc3RdJ1xuICAgIHBhZ2luYXRpb25SZWdpb246ICdbZGF0YS1yZWdpb249cGFnaW5hdGlvbl0nXG4gICAgZGV0YWlsUmVnaW9uOiAgICAgJ1tkYXRhLXJlZ2lvbj1kZXRhaWxdJ1xuXG4gIGNvbGxlY3Rpb25FdmVudHM6XG4gICAgJ3N5bmMnOiAnb25Db2xsZWN0aW9uU3luYydcbiAgICAncmVzZXQnOiAnb25Db2xsZWN0aW9uUmVzZXQnXG5cbiAgb25Db2xsZWN0aW9uU3luYzogPT5cbiAgICBAc2hvd0ZpbHRlclZpZXcoKVxuICAgIEBvbkNvbGxlY3Rpb25SZXNldCgpXG5cbiAgb25Db2xsZWN0aW9uUmVzZXQ6ID0+XG4gICAgY29uc29sZS5sb2cgJ1JFU0VUJ1xuICAgIGNvbnNvbGUubG9nIEBjb2xsZWN0aW9uLmF0KDApXG4gICAgc2V0VGltZW91dCggPT5cbiAgICAgIEBjb2xsZWN0aW9uLmF0KDApPy50cmlnZ2VyKCdzZWxlY3RlZCcpXG4gICAgLCAyMDApXG5cbiAgb25SZW5kZXI6IC0+XG5cbiAgICAjIFJlbmRlcnMgRm9ybVZpZXdcbiAgICBAZm9ybVJlZ2lvbi5zaG93IG5ldyBGb3JtVmlldyh7IGNvbGxlY3Rpb246IEBjb2xsZWN0aW9uLCBwYXJhbXM6IEBvcHRpb25zLnBhcmFtcyB9KVxuXG4gICAgIyBSZW5kZXJzIEZpbHRlcnNcbiAgICBAc2hvd0ZpbHRlclZpZXcoKVxuXG4gICAgIyBSZW5kZXJzIExpc3RWaWV3XG4gICAgbGlzdFZpZXcgPSBuZXcgSXRlbUxpc3QoeyBjb2xsZWN0aW9uOiBAY29sbGVjdGlvbiB9KVxuICAgIGxpc3RWaWV3Lm9uICdjaGlsZHZpZXc6c2VsZWN0ZWQnLCAodmlldykgPT4gQHNob3dEZXRhaWxWaWV3KHZpZXcubW9kZWwpXG4gICAgQGxpc3RSZWdpb24uc2hvdyhsaXN0VmlldylcbiAgICBAb25Db2xsZWN0aW9uU3luYygpXG5cbiAgICAjIFJlbmRlcnMgUGFnaW5hdGlvblZpZXdcbiAgICBAcGFnaW5hdGlvblJlZ2lvbi5zaG93IG5ldyBQYWdpbmF0aW9uVmlldyh7IGNvbGxlY3Rpb246IEBjb2xsZWN0aW9uLCBwYWdlcjogdHJ1ZSB9KVxuXG4gIHNob3dEZXRhaWxWaWV3OiAoZGF0YXNldCkgLT5cbiAgICBAZGV0YWlsUmVnaW9uLnNob3cgbmV3IEl0ZW1EZXRhaWwoeyBtb2RlbDogZGF0YXNldCB9KVxuXG4gIHNob3dGaWx0ZXJWaWV3OiAtPlxuICAgICMgUmVuZGVycyBGaWx0ZXJzXG4gICAgQGZpbHRlclJlZ2lvbi5zaG93IG5ldyBGaWx0ZXJWaWV3KHsgY29sbGVjdGlvbjogQGNvbGxlY3Rpb24gfSlcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gRGFzaGJvYXJkVmlld1xuXG5cbiIsIlxuIyBHb29nbGUgTWFwcyBBUEkgVG9rZW46XG4jIEFJemFTeUFzZjJSemZRaEk2TGptbG94Uk05OTNnZExCRm5Cb3hUOFxuXG4jICMgIyAjICNcblxuY2xhc3MgTWFwVmlldyBleHRlbmRzIE1uLkxheW91dFZpZXdcbiAgY2xhc3NOYW1lOiAnY2FyZCBjYXJkLWJsb2NrJ1xuICB0ZW1wbGF0ZTogcmVxdWlyZSAnLi90ZW1wbGF0ZXMvbWFwJ1xuXG4gIG9uUmVuZGVyOiAtPlxuICAgIHNldFRpbWVvdXQoQGluaXRNYXAsIDEwMClcblxuICBpbml0TWFwOiA9PlxuXG4gICAgIyBTZXRzIGluaXRpYWwgbG9jYXRpb25cbiAgICBpdGVtTG9jYXRpb24gPVxuICAgICAgbGF0OiBOdW1iZXIoQG1vZGVsLmdldCgnbGF0aXR1ZGUnKSlcbiAgICAgIGxuZzogTnVtYmVyKEBtb2RlbC5nZXQoJ2xvbmdpdHVkZScpKVxuXG4gICAgIyBNYXAgb3B0aW9uc1xuICAgIG1hcE9wdHMgPVxuICAgICAgem9vbTogMTJcbiAgICAgIGNlbnRlcjogaXRlbUxvY2F0aW9uXG5cbiAgICAjIEluaXRpYWxpemVzIG1hcFxuICAgIEBtYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAnKSwgbWFwT3B0cylcblxuICAgICMgQWRkcyBjb2xsZWN0aW9uIHRvIG1hcFxuICAgICMgQGFkZE1hcmtlcnMoKVxuICAgIEBhZGRNYXJrZXIoQG1vZGVsKVxuXG4gICAgcmV0dXJuXG5cbiAgYWRkTWFya2VyczogPT5cbiAgICByZXR1cm4gdW5sZXNzIEBjb2xsZWN0aW9uXG4gICAgQGFkZE1hcmtlcihtb2RlbCkgZm9yIG1vZGVsIGluIEBjb2xsZWN0aW9uLm1vZGVsc1xuXG4gIGFkZE1hcmtlcjogKG1vZGVsKSA9PlxuXG4gICAgaXRlbUxvY2F0aW9uID1cbiAgICAgIGxhdDogTnVtYmVyKG1vZGVsLmdldCgnbGF0aXR1ZGUnKSlcbiAgICAgIGxuZzogTnVtYmVyKG1vZGVsLmdldCgnbG9uZ2l0dWRlJykpXG5cbiAgICAjIEluaXRpYWxpemVzIG1hcmtlclxuICAgIG1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXJcbiAgICAgIHBvc2l0aW9uOiBpdGVtTG9jYXRpb25cbiAgICAgIG1hcDogQG1hcFxuXG4gICAgIyBNYXJrZXIgbGlzdGVuZXJcbiAgICAjIG1hcmtlci5hZGRMaXN0ZW5lciAnY2xpY2snLCAoZSkgPT5cbiAgICAjICAgIyBtb2RlbCA9IEBjb2xsZWN0aW9uLmZpbmRXaGVyZSh7IGxhdGl0dWRlOiBTdHJpbmcoZS5sYXRMbmcubGF0KCkpLCBsb25naXR1ZGU6IFN0cmluZyhlLmxhdExuZy5sbmcoKSkgfSlcbiAgICAjICAgbW9kZWwgPSBAY29sbGVjdGlvbi5maW5kV2hlcmUoeyBsYXRpdHVkZTogU3RyaW5nKGUubGF0TG5nLmxhdCgpKSB9KVxuICAgICMgICBjb25zb2xlLmxvZyBtb2RlbFxuICAgICMgICByZXR1cm4gdW5sZXNzIG1vZGVsXG4gICAgIyAgIEB0cmlnZ2VyICdjaGlsZHZpZXc6c2VsZWN0ZWQnLCBtb2RlbFxuICAgICMgICAjIEBtYXAuc2V0Wm9vbSg4KVxuICAgICMgICAjIEBtYXAuc2V0Q2VudGVyKG1hcmtlci5nZXRQb3NpdGlvbigpKVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBNYXBWaWV3XG4iLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcbjt2YXIgbG9jYWxzX2Zvcl93aXRoID0gKGxvY2FscyB8fCB7fSk7KGZ1bmN0aW9uIChwbGFjZWhvbGRlcikge1xuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJjb2wteHMtMTJcXFwiPjxkaXYgY2xhc3M9XFxcImZvcm0taW5saW5lXFxcIj48ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwIHctMTAwXFxcIj48bGFiZWw+RmlsdGVyIFJlc3VsdHM8L2xhYmVsPjxkaXYgY2xhc3M9XFxcImlucHV0LWdyb3VwIHctMTAwXFxcIj48aW5wdXQgdHlwZT1cXFwidGV4dFxcXCIgbmFtZT1cXFwiJGdsb2JhbFxcXCIgYXV0b2NvbXBsZXRlPVxcXCJvZmZcXFwiXCIgKyAoamFkZS5hdHRyKFwicGxhY2Vob2xkZXJcIiwgcGxhY2Vob2xkZXIgfHwgJ1NlYXJjaCcsIHRydWUsIGZhbHNlKSkgKyBcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIi8+PGRpdiBkYXRhLXRvZ2dsZT1cXFwidG9vbHRpcFxcXCIgZGF0YS1wbGFjZW1lbnQ9XFxcInJpZ2h0XFxcIiB0aXRsZT1cXFwiQ2xlYXIgRmlsdGVyXFxcIiBkYXRhLWNsaWNrPVxcXCJjbGVhclxcXCIgY2xhc3M9XFxcImJ0biBidG4tc2Vjb25kYXJ5IGlucHV0LWdyb3VwLWFkZG9uXFxcIj48aSBjbGFzcz1cXFwiZmEgZmEtZncgZmEtdGltZXNcXFwiPjwvaT48L2Rpdj48L2Rpdj48L2Rpdj48L2Rpdj48L2Rpdj5cIik7fS5jYWxsKHRoaXMsXCJwbGFjZWhvbGRlclwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgucGxhY2Vob2xkZXI6dHlwZW9mIHBsYWNlaG9sZGVyIT09XCJ1bmRlZmluZWRcIj9wbGFjZWhvbGRlcjp1bmRlZmluZWQpKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcbjt2YXIgbG9jYWxzX2Zvcl93aXRoID0gKGxvY2FscyB8fCB7fSk7KGZ1bmN0aW9uIChjaXRpZXMsIHVuZGVmaW5lZCkge1xuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPjxkaXYgY2xhc3M9XFxcImNvbC14cy0xMlxcXCI+PGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+PGxhYmVsPlNlYXJjaCBCeSBDaXR5PC9sYWJlbD48c2VsZWN0IG5hbWU9XFxcImNpdHlcXFwiIHBsYWNlaG9sZGVyPVxcXCJDaXR5XFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIj5cIik7XG4vLyBpdGVyYXRlIGNpdGllc1xuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSBjaXRpZXM7XG4gIGlmICgnbnVtYmVyJyA9PSB0eXBlb2YgJCRvYmoubGVuZ3RoKSB7XG5cbiAgICBmb3IgKHZhciAkaW5kZXggPSAwLCAkJGwgPSAkJG9iai5sZW5ndGg7ICRpbmRleCA8ICQkbDsgJGluZGV4KyspIHtcbiAgICAgIHZhciBjID0gJCRvYmpbJGluZGV4XTtcblxuaWYgKCBjID09ICdUUk9ZJylcbntcbmJ1Zi5wdXNoKFwiPG9wdGlvbiBzZWxlY3RlZD1cXFwic2VsZWN0ZWRcXFwiPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gYykgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9vcHRpb24+XCIpO1xufVxuZWxzZVxue1xuYnVmLnB1c2goXCI8b3B0aW9uPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gYykgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9vcHRpb24+XCIpO1xufVxuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIHZhciAkJGwgPSAwO1xuICAgIGZvciAodmFyICRpbmRleCBpbiAkJG9iaikge1xuICAgICAgJCRsKys7ICAgICAgdmFyIGMgPSAkJG9ialskaW5kZXhdO1xuXG5pZiAoIGMgPT0gJ1RST1knKVxue1xuYnVmLnB1c2goXCI8b3B0aW9uIHNlbGVjdGVkPVxcXCJzZWxlY3RlZFxcXCI+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBjKSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L29wdGlvbj5cIik7XG59XG5lbHNlXG57XG5idWYucHVzaChcIjxvcHRpb24+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBjKSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L29wdGlvbj5cIik7XG59XG4gICAgfVxuXG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbmJ1Zi5wdXNoKFwiPC9zZWxlY3Q+PC9kaXY+PC9kaXY+PC9kaXY+XCIpO30uY2FsbCh0aGlzLFwiY2l0aWVzXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5jaXRpZXM6dHlwZW9mIGNpdGllcyE9PVwidW5kZWZpbmVkXCI/Y2l0aWVzOnVuZGVmaW5lZCxcInVuZGVmaW5lZFwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgudW5kZWZpbmVkOnR5cGVvZiB1bmRlZmluZWQhPT1cInVuZGVmaW5lZFwiP3VuZGVmaW5lZDp1bmRlZmluZWQpKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcbjt2YXIgbG9jYWxzX2Zvcl93aXRoID0gKGxvY2FscyB8fCB7fSk7KGZ1bmN0aW9uIChvcGVyYXRpb25fbmFtZSkge1xuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPjxkaXYgY2xhc3M9XFxcImNvbC14cy0xMlxcXCI+PHAgY2xhc3M9XFxcIm0tYS0wXFxcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IG9wZXJhdGlvbl9uYW1lKSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L3A+PC9kaXY+PC9kaXY+XCIpO30uY2FsbCh0aGlzLFwib3BlcmF0aW9uX25hbWVcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLm9wZXJhdGlvbl9uYW1lOnR5cGVvZiBvcGVyYXRpb25fbmFtZSE9PVwidW5kZWZpbmVkXCI/b3BlcmF0aW9uX25hbWU6dW5kZWZpbmVkKSk7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG47dmFyIGxvY2Fsc19mb3Jfd2l0aCA9IChsb2NhbHMgfHwge30pOyhmdW5jdGlvbiAoZmFjaWxpdHlfYWRkcmVzcywgZmFjaWxpdHlfY2l0eSwgZmFjaWxpdHlfbXVuaWNpcGFsaXR5LCBmYWNpbGl0eV9wb3N0YWxfemlwY29kZSwgZm9vZF9zZXJ2aWNlX2Rlc2NyaXB0aW9uLCBmb29kX3NlcnZpY2VfdHlwZSwgb3BlcmF0aW9uX25hbWUsIHBlcm1fb3BlcmF0b3JfZmlyc3RfbmFtZSwgcGVybV9vcGVyYXRvcl9sYXN0X25hbWUsIHBlcm1pdHRlZF9jb3JwX25hbWUpIHtcbmphZGVfbWl4aW5zW1wic21hbGxJdGVtXCJdID0gamFkZV9pbnRlcnAgPSBmdW5jdGlvbihsYWJlbCwgdGV4dCl7XG52YXIgYmxvY2sgPSAodGhpcyAmJiB0aGlzLmJsb2NrKSwgYXR0cmlidXRlcyA9ICh0aGlzICYmIHRoaXMuYXR0cmlidXRlcykgfHwge307XG5idWYucHVzaChcIjxzbWFsbD48c3Ryb25nPlwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IGxhYmVsKSA9PSBudWxsID8gJycgOiBqYWRlX2ludGVycCkpICsgXCI6PC9zdHJvbmc+Jm5ic3A7XFxuXCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gdGV4dCkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiPC9zbWFsbD48YnIvPlwiKTtcbn07XG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcInJvd1xcXCI+PGRpdiBjbGFzcz1cXFwiY29sLXhzLTEyXFxcIj48ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPjxkaXYgY2xhc3M9XFxcImNvbC14cy02XFxcIj48cCBjbGFzcz1cXFwibGVhZCBtLWItMFxcXCI+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBvcGVyYXRpb25fbmFtZSkgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9wPjxzbWFsbD5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IGZhY2lsaXR5X2FkZHJlc3MpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvc21hbGw+PGJyLz48c21hbGw+XCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gZmFjaWxpdHlfY2l0eSkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiLCBcIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSBmYWNpbGl0eV9tdW5pY2lwYWxpdHkpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIiBcIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSBmYWNpbGl0eV9wb3N0YWxfemlwY29kZSkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiPC9zbWFsbD48L2Rpdj48ZGl2IGNsYXNzPVxcXCJjb2wteHMtNlxcXCI+XCIpO1xuaWYgKCBwZXJtaXR0ZWRfY29ycF9uYW1lKVxue1xuamFkZV9taXhpbnNbXCJzbWFsbEl0ZW1cIl0oJ0NvcnBvcmF0aW9uJywgcGVybWl0dGVkX2NvcnBfbmFtZSk7XG59XG5pZiAoIHBlcm1fb3BlcmF0b3JfZmlyc3RfbmFtZSlcbntcbmphZGVfbWl4aW5zW1wic21hbGxJdGVtXCJdKCdPcGVyYXRvcicsIHBlcm1fb3BlcmF0b3JfbGFzdF9uYW1lICsgJywgJyArIHBlcm1fb3BlcmF0b3JfZmlyc3RfbmFtZSk7XG59XG5pZiAoIGZvb2Rfc2VydmljZV90eXBlKVxue1xuamFkZV9taXhpbnNbXCJzbWFsbEl0ZW1cIl0oJ1NlcnZpY2UnLCBmb29kX3NlcnZpY2VfdHlwZSk7XG59XG5pZiAoIGZvb2Rfc2VydmljZV9kZXNjcmlwdGlvbilcbntcbmphZGVfbWl4aW5zW1wic21hbGxJdGVtXCJdKCdUeXBlJywgZm9vZF9zZXJ2aWNlX2Rlc2NyaXB0aW9uKTtcbn1cbmJ1Zi5wdXNoKFwiPC9kaXY+PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz1cXFwiY29sLXhzLTEyXFxcIj48aHIvPjwvZGl2PjxkaXYgZGF0YS1yZWdpb249XFxcInNlbGVjdG9yXFxcIiBjbGFzcz1cXFwiY29sLXhzLTEyXFxcIj48L2Rpdj48L2Rpdj5cIik7fS5jYWxsKHRoaXMsXCJmYWNpbGl0eV9hZGRyZXNzXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5mYWNpbGl0eV9hZGRyZXNzOnR5cGVvZiBmYWNpbGl0eV9hZGRyZXNzIT09XCJ1bmRlZmluZWRcIj9mYWNpbGl0eV9hZGRyZXNzOnVuZGVmaW5lZCxcImZhY2lsaXR5X2NpdHlcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLmZhY2lsaXR5X2NpdHk6dHlwZW9mIGZhY2lsaXR5X2NpdHkhPT1cInVuZGVmaW5lZFwiP2ZhY2lsaXR5X2NpdHk6dW5kZWZpbmVkLFwiZmFjaWxpdHlfbXVuaWNpcGFsaXR5XCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5mYWNpbGl0eV9tdW5pY2lwYWxpdHk6dHlwZW9mIGZhY2lsaXR5X211bmljaXBhbGl0eSE9PVwidW5kZWZpbmVkXCI/ZmFjaWxpdHlfbXVuaWNpcGFsaXR5OnVuZGVmaW5lZCxcImZhY2lsaXR5X3Bvc3RhbF96aXBjb2RlXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5mYWNpbGl0eV9wb3N0YWxfemlwY29kZTp0eXBlb2YgZmFjaWxpdHlfcG9zdGFsX3ppcGNvZGUhPT1cInVuZGVmaW5lZFwiP2ZhY2lsaXR5X3Bvc3RhbF96aXBjb2RlOnVuZGVmaW5lZCxcImZvb2Rfc2VydmljZV9kZXNjcmlwdGlvblwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGguZm9vZF9zZXJ2aWNlX2Rlc2NyaXB0aW9uOnR5cGVvZiBmb29kX3NlcnZpY2VfZGVzY3JpcHRpb24hPT1cInVuZGVmaW5lZFwiP2Zvb2Rfc2VydmljZV9kZXNjcmlwdGlvbjp1bmRlZmluZWQsXCJmb29kX3NlcnZpY2VfdHlwZVwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGguZm9vZF9zZXJ2aWNlX3R5cGU6dHlwZW9mIGZvb2Rfc2VydmljZV90eXBlIT09XCJ1bmRlZmluZWRcIj9mb29kX3NlcnZpY2VfdHlwZTp1bmRlZmluZWQsXCJvcGVyYXRpb25fbmFtZVwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgub3BlcmF0aW9uX25hbWU6dHlwZW9mIG9wZXJhdGlvbl9uYW1lIT09XCJ1bmRlZmluZWRcIj9vcGVyYXRpb25fbmFtZTp1bmRlZmluZWQsXCJwZXJtX29wZXJhdG9yX2ZpcnN0X25hbWVcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnBlcm1fb3BlcmF0b3JfZmlyc3RfbmFtZTp0eXBlb2YgcGVybV9vcGVyYXRvcl9maXJzdF9uYW1lIT09XCJ1bmRlZmluZWRcIj9wZXJtX29wZXJhdG9yX2ZpcnN0X25hbWU6dW5kZWZpbmVkLFwicGVybV9vcGVyYXRvcl9sYXN0X25hbWVcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnBlcm1fb3BlcmF0b3JfbGFzdF9uYW1lOnR5cGVvZiBwZXJtX29wZXJhdG9yX2xhc3RfbmFtZSE9PVwidW5kZWZpbmVkXCI/cGVybV9vcGVyYXRvcl9sYXN0X25hbWU6dW5kZWZpbmVkLFwicGVybWl0dGVkX2NvcnBfbmFtZVwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgucGVybWl0dGVkX2NvcnBfbmFtZTp0eXBlb2YgcGVybWl0dGVkX2NvcnBfbmFtZSE9PVwidW5kZWZpbmVkXCI/cGVybWl0dGVkX2NvcnBfbmFtZTp1bmRlZmluZWQpKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcblxuYnVmLnB1c2goXCJObyBNYXRjaGVzIEZvdW5kLlwiKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcblxuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPjxkaXYgY2xhc3M9XFxcImNvbC14cy00XFxcIj48ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPjxkaXYgZGF0YS1yZWdpb249XFxcImZvcm1cXFwiIGNsYXNzPVxcXCJjb2wteHMtMTJcXFwiPjwvZGl2PjxkaXYgY2xhc3M9XFxcImNvbC14cy0xMlxcXCI+PGRpdiBkYXRhLXJlZ2lvbj1cXFwiZmlsdGVyXFxcIiBjbGFzcz1cXFwiY2FyZCBjYXJkLWJsb2NrIG0tdC0xXFxcIj48L2Rpdj48L2Rpdj48ZGl2IGRhdGEtcmVnaW9uPVxcXCJwYWdpbmF0aW9uXFxcIiBjbGFzcz1cXFwiY29sLXhzLTEyXFxcIj48L2Rpdj48ZGl2IGRhdGEtcmVnaW9uPVxcXCJsaXN0XFxcIiBjbGFzcz1cXFwiY29sLXhzLTEyXFxcIj48L2Rpdj48L2Rpdj48L2Rpdj48ZGl2IGRhdGEtcmVnaW9uPVxcXCJkZXRhaWxcXFwiIGNsYXNzPVxcXCJjb2wteHMtOFxcXCI+PC9kaXY+PC9kaXY+XCIpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuXG5idWYucHVzaChcIjxpIGNsYXNzPVxcXCJmYSBmYS1mdyBmYS0yeCBmYS1zcGluIGZhLXNwaW5uZXIgbS15LTJcXFwiPjwvaT5cIik7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG5cbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwicm93XFxcIj48ZGl2IGNsYXNzPVxcXCJjb2wteHMtMTJcXFwiPjxkaXYgaWQ9XFxcIm1hcFxcXCIgc3R5bGU9XFxcImhlaWdodDoyMHJlbTtcXFwiPjwvZGl2PjwvZGl2PjwvZGl2PlwiKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcbjt2YXIgbG9jYWxzX2Zvcl93aXRoID0gKGxvY2FscyB8fCB7fSk7KGZ1bmN0aW9uIChkYXRlLCBpbnNwZWN0aW9uX2NvbW1lbnRzLCB2aW9sYXRpb25fZGVzY3JpcHRpb24pIHtcbmJ1Zi5wdXNoKFwiPHRkPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gZGF0ZSkgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC90ZD48dGQ+XCIpO1xuaWYgKCBpbnNwZWN0aW9uX2NvbW1lbnRzICYmIHZpb2xhdGlvbl9kZXNjcmlwdGlvbilcbntcbmJ1Zi5wdXNoKFwiPGkgY2xhc3M9XFxcImZhIGZhLWZ3IGZhLXdhcm5pbmdcXFwiPjwvaT4mbmJzcDtcIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IHZpb2xhdGlvbl9kZXNjcmlwdGlvbikgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiJm5ic3A7PGFcIiArIChqYWRlLmF0dHIoXCJ0aXRsZVwiLCBpbnNwZWN0aW9uX2NvbW1lbnRzLCB0cnVlLCBmYWxzZSkpICsgXCIgZGF0YS10b2dnbGU9XFxcInRvb2x0aXBcXFwiPjxpIGNsYXNzPVxcXCJmYSBmYS1mdyBmYS1jb21tZW50XFxcIj48L2k+SW5zcGVjdG9yIENvbW1lbnRzPC9hPlwiKTtcbn1cbmVsc2VcbntcbmlmICggdmlvbGF0aW9uX2Rlc2NyaXB0aW9uKVxue1xuYnVmLnB1c2goXCI8aSBjbGFzcz1cXFwiZmEgZmEtZncgZmEtd2FybmluZ1xcXCI+PC9pPiZuYnNwO1wiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gdmlvbGF0aW9uX2Rlc2NyaXB0aW9uKSA/IFwiXCIgOiBqYWRlX2ludGVycCkpKTtcbn1cbmVsc2VcbntcbmJ1Zi5wdXNoKFwiPGkgY2xhc3M9XFxcImZhIGZhLWZ3IGZhLWNoZWNrXFxcIj48L2k+Jm5ic3A7XFxuUGFzc2VkIVwiKTtcbn1cbn1cbmJ1Zi5wdXNoKFwiPC90ZD5cIik7fS5jYWxsKHRoaXMsXCJkYXRlXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5kYXRlOnR5cGVvZiBkYXRlIT09XCJ1bmRlZmluZWRcIj9kYXRlOnVuZGVmaW5lZCxcImluc3BlY3Rpb25fY29tbWVudHNcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLmluc3BlY3Rpb25fY29tbWVudHM6dHlwZW9mIGluc3BlY3Rpb25fY29tbWVudHMhPT1cInVuZGVmaW5lZFwiP2luc3BlY3Rpb25fY29tbWVudHM6dW5kZWZpbmVkLFwidmlvbGF0aW9uX2Rlc2NyaXB0aW9uXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC52aW9sYXRpb25fZGVzY3JpcHRpb246dHlwZW9mIHZpb2xhdGlvbl9kZXNjcmlwdGlvbiE9PVwidW5kZWZpbmVkXCI/dmlvbGF0aW9uX2Rlc2NyaXB0aW9uOnVuZGVmaW5lZCkpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuXG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcImNvbC14cy0xMlxcXCI+PHAgY2xhc3M9XFxcImxlYWRcXFwiPlZpb2xhdGlvbiBIaXN0b3J5PC9wPjx0YWJsZSBjbGFzcz1cXFwidGFibGUgdGFibGUtYm9yZGVyZWRcXFwiPjx0aGVhZD48dGg+RGF0ZTwvdGg+PHRoPkRlc2NyaXB0aW9uPC90aD48L3RoZWFkPjx0Ym9keT48L3Rib2R5PjwvdGFibGU+PC9kaXY+XCIpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsIlxuY2xhc3MgVmlvbGF0aW9uTW9kZWwgZXh0ZW5kcyBCYWNrYm9uZS5Nb2RlbFxuICBkZWZhdWx0czoge31cblxuICBpc0NyaXRpY2FsOiAtPlxuICAgIHJldHVybiBAZ2V0KCdjcml0aWNhbF92aW9sYXRpb24nKSA9PSBcIkNyaXRpY2FsIFZpb2xhdGlvblwiXG5cbiMgIyAjICMgI1xuXG5jbGFzcyBWaW9sYXRpb25Db2xsZWN0aW9uIGV4dGVuZHMgQmFja2JvbmUuQ29sbGVjdGlvblxuICBtb2RlbDogVmlvbGF0aW9uTW9kZWxcbiAgdXJsOiAnaHR0cHM6Ly9oZWFsdGguZGF0YS5ueS5nb3YvcmVzb3VyY2UvNWliNi00OWVuLmpzb24nXG5cbiAgY29tcGFyYXRvcjogKG1vZDEsIG1vZDIpIC0+XG4gICAgZDEgPSBuZXcgRGF0ZShtb2QxLmdldCgnZGF0ZV9vZl9pbnNwZWN0aW9uJykpXG4gICAgZDIgPSBuZXcgRGF0ZShtb2QyLmdldCgnZGF0ZV9vZl9pbnNwZWN0aW9uJykpXG5cbiAgICBpZiBkMSA8IGQyXG4gICAgICByZXR1cm4gMVxuXG4gICAgZWxzZSBpZiBkMiA8IGQxXG4gICAgICByZXR1cm4gLTFcblxuICAgIGVsc2VcbiAgICAgIHJldHVybiAwXG5cbiMgIyAjICMgI1xuXG5jbGFzcyBEYXRhTW9kZWwgZXh0ZW5kcyBCYWNrYm9uZS5Nb2RlbFxuICBpZEF0dHJpYnV0ZTogJ255c19oZWFsdGhfb3BlcmF0aW9uX2lkJ1xuXG4gIGVuc3VyZVZpb2xhdGlvbnM6IC0+XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlIChyZXNvbHZlLCByZWplY3QpID0+XG5cbiAgICAgICMgUmV0dXJucyBpZiBkZWZpbmVkXG4gICAgICByZXR1cm4gcmVzb2x2ZShAdmlvbGF0aW9ucykgaWYgQHZpb2xhdGlvbnNcblxuICAgICAgQHZpb2xhdGlvbnMgPSBuZXcgVmlvbGF0aW9uQ29sbGVjdGlvbigpXG4gICAgICBAdmlvbGF0aW9ucy5mZXRjaFxuICAgICAgICBkYXRhOiB7IG55c19oZWFsdGhfb3BlcmF0aW9uX2lkOiBAaWQgfVxuICAgICAgICBzdWNjZXNzOiA9PiByZXR1cm4gcmVzb2x2ZShAdmlvbGF0aW9ucylcblxuIyAjICMgIyAjXG5cbiMgVE9ETyAtIFBBR0lOQVRFRCBDT0xMRUNUSU9OXG5jbGFzcyBEYXRhQ29sbGVjdGlvbiBleHRlbmRzIEJhY2tib25lLlBhZ2VhYmxlQ29sbGVjdGlvblxuICBtb2RlbDogRGF0YU1vZGVsXG4gIHVybDogJ2h0dHBzOi8vaGVhbHRoLmRhdGEubnkuZ292L3Jlc291cmNlLzVpYjYtNDllbi5qc29uJ1xuXG4gIG1vZGU6ICdjbGllbnQnXG5cbiAgc3RhdGU6XG4gICAgcGFnZVNpemU6IDEwXG5cbiAgIyBQYWdpbmcgSGVscGVyc1xuICBmaXJzdFBhZ2U6IC0+XG4gICAgQGdldFBhZ2UoIEBzdGF0ZS5maXJzdFBhZ2UgKVxuXG4gIHByZXZQYWdlOiAtPlxuICAgIEBnZXRQcmV2aW91c1BhZ2UoKSBpZiBAaGFzUHJldmlvdXNQYWdlKClcblxuICBuZXh0UGFnZTogLT5cbiAgICBAZ2V0TmV4dFBhZ2UoKSBpZiBAaGFzTmV4dFBhZ2UoKVxuXG4gIGxhc3RQYWdlOiAtPlxuICAgIEBnZXRQYWdlKCBAc3RhdGUubGFzdFBhZ2UgKVxuXG4gIHNlYXJjaDogKGRhdGE9e30pIC0+XG4gICAgZGVsZXRlIEB1bmZpbHRlcmVkQ29sbGVjdGlvblxuICAgIEBmZXRjaCh7IGRhdGE6IGRhdGEsIHJlc2V0OiB0cnVlIH0pXG5cbiAgYXBwbHlGaWx0ZXI6IChxdWVyeSwgb3B0aW9ucyA9IHt9KSAtPlxuXG4gICAgIyBSZXR1cm5zIGlmIGN1cnJlbnQgcXVlcnkgaXMgdGhlIHNhbWUgYXMgdGhlIG9uZSB0aGF0IHdlJ3ZlIGNhY2hlZFxuICAgIHJldHVybiBpZiBfLmlzRXF1YWwoQHF1ZXJ5LCBxdWVyeSlcblxuICAgICMgQ2FjaGVzIGNvbXBsZXRlIHVuZmlsdGVyZWQgY29sbGVjdGlvblxuICAgIEB1bmZpbHRlcmVkQ29sbGVjdGlvbiB8fD0gbmV3IEJhY2tib25lLkNvbGxlY3Rpb24oQGZ1bGxDb2xsZWN0aW9uLm1vZGVscylcblxuICAgICMgUmV0dXJucyBmb3IgZW1wdHkgcXVlcnkgb24gY29tcGxldGUgY29sbGVjdGlvblxuICAgIHJldHVybiBAZnVsbENvbGxlY3Rpb24ubW9kZWxzIGlmIEBmdWxsQ29sbGVjdGlvbi5sZW5ndGggPT0gQHVuZmlsdGVyZWRDb2xsZWN0aW9uLmxlbmd0aCAmJiBfLmlzRW1wdHkocXVlcnkpXG5cbiAgICAjIENhY2hlcyBhbmQgcGVyZm9ybXMgcXVlcnlcbiAgICBAcXVlcnkgPSBxdWVyeVxuICAgIG1vZGVscyA9IF8ucXVlcnkoIF8uY2xvbmUoQHVuZmlsdGVyZWRDb2xsZWN0aW9uLnRvSlNPTigpKSwgcXVlcnkgKVxuXG4gICAgIyBTZXQgZnVsbENvbGxlY3Rpb24gd2l0aCBxdWVyeSByZXN1bHQgZm9yIGFjY3VyYXRlIHBhZ2luYXRpb24gYW5kIHJldHVybnMgbW9kZWxzXG4gICAgQGZ1bGxDb2xsZWN0aW9uLnJlc2V0KG1vZGVscylcbiAgICByZXR1cm4gbW9kZWxzXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9XG4gIE1vZGVsOiAgICAgIERhdGFNb2RlbFxuICBDb2xsZWN0aW9uOiBEYXRhQ29sbGVjdGlvblxuIiwiXG5FbnRpdGllcyA9IHJlcXVpcmUgJy4vZW50aXRpZXMnXG5cbiMgIyAjICMgI1xuXG5jbGFzcyBEYXRhRmFjdG9yeSBleHRlbmRzIE1hcmlvbmV0dGUuU2VydmljZVxuXG4gICMgRGVmaW5lcyByYWRpb1JlcXVlc3RzXG4gIHJhZGlvUmVxdWVzdHM6XG4gICAgJ2RhdGEgY29sbGVjdGlvbic6ICAnZ2V0Q29sbGVjdGlvbidcblxuICBpbml0aWFsaXplOiAtPlxuICAgIEBjYWNoZWQgPSBuZXcgRW50aXRpZXMuQ29sbGVjdGlvbigpXG5cbiAgIyBUT0RPIC0gYWNjZXB0IHBhcmFtZXRlcnM/XG4gIGdldENvbGxlY3Rpb246IC0+XG4gICAgbmV3IFByb21pc2UgKHJlc29sdmUsIHJlamVjdCkgPT5cblxuICAgICAgQGNhY2hlZC5mZXRjaFxuICAgICAgICBwYXJzZTogdHJ1ZVxuICAgICAgICBkYXRhOlxuICAgICAgICAgICMgXCIkbGltaXRcIjogMTAgIyBUT0RPIC0gYWJzdHJhY3QgaW50byBjb2xsZWN0aW9uXG4gICAgICAgICAgXCIkJGFwcF90b2tlblwiIDogXCJBdnMxZkRDSWFDOWxMcXdEejVJUWFmdGdVXCIgIyBUT0RPIC0gYWJzdHJhY3QgaW50byBjb2xsZWN0aW9uXG4gICAgICAgICAgXCJmYWNpbGl0eV9jaXR5XCI6ICdUUk9ZJ1xuXG4gICAgICAgIHN1Y2Nlc3M6ICgpID0+IHJldHVybiByZXNvbHZlKEBjYWNoZWQpXG4gICAgICAgIGVycm9yOiAoKSA9PiByZXR1cm4gcmVqZWN0KEBjYWNoZWQpXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBEYXRhRmFjdG9yeSgpXG4iLCJyZXF1aXJlICcuL2ZhY3RvcnknXG5EYXNoYm9hcmRSb3V0ZSA9IHJlcXVpcmUgJy4vZGFzaGJvYXJkL3JvdXRlJ1xuQWJvdXRSb3V0ZSA9IHJlcXVpcmUgJy4vYWJvdXQvcm91dGUnXG4jICMgIyAjICNcblxuIyBIb21lUm91dGVyIGNsYXNzIGRlZmluaXRpb25cbmNsYXNzIEhvbWVSb3V0ZXIgZXh0ZW5kcyByZXF1aXJlICdobl9yb3V0aW5nL2xpYi9yb3V0ZXInXG5cbiAgcm91dGVzOlxuICAgICcoLyknOiAnZGFzaGJvYXJkJ1xuICAgICdhYm91dCgvKSc6ICdhYm91dCdcblxuICBkYXNoYm9hcmQ6IC0+XG4gICAgbmV3IERhc2hib2FyZFJvdXRlKHsgY29udGFpbmVyOiBAY29udGFpbmVyIH0pXG5cbiAgYWJvdXQ6IC0+XG4gICAgbmV3IEFib3V0Um91dGUoeyBjb250YWluZXI6IEBjb250YWluZXIgfSlcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gSG9tZVJvdXRlclxuIiwiXG5jbGFzcyBRdWVyeVBhcmFtcyBleHRlbmRzIEJhY2tib25lLk1vZGVsXG5cbiAgZGVmYXVsdHM6XG4gICAgY2l0aWVzOiAgIHJlcXVpcmUgJy4vcGx1Y2tlZC9jaXRpZXMnXG4gICAgY291bnRpZXM6IHJlcXVpcmUgJy4vcGx1Y2tlZC9jb3VudGllcydcbiAgICB6aXBzOiAgICAgcmVxdWlyZSAnLi9wbHVja2VkL3ppcHMnXG5cbiMgIyAjICMgI1xuXG5jbGFzcyBQYXJhbXNGYWN0b3J5IGV4dGVuZHMgTWFyaW9uZXR0ZS5TZXJ2aWNlXG5cbiAgIyBEZWZpbmVzIHJhZGlvUmVxdWVzdHNcbiAgcmFkaW9SZXF1ZXN0czpcbiAgICAncGFyYW1zIG1vZGVsJzogICdnZXRNb2RlbCdcblxuICBpbml0aWFsaXplOiAtPlxuICAgIEBwYXJhbXMgPSBuZXcgUXVlcnlQYXJhbXMoKVxuXG4gIGdldE1vZGVsOiAtPlxuICAgIHJldHVybiBAcGFyYW1zXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBQYXJhbXNGYWN0b3J5KClcbiIsIm1vZHVsZS5leHBvcnRzID0gW1xuICBcIiBGQVJNSU5HREFMRVwiXG4gIFwiIE1BTUFST05FQ0tcIlxuICBcIjBORUlEQVwiXG4gIFwiQUNDT1JEXCJcbiAgXCJBQ1JBXCJcbiAgXCJBREFNU1wiXG4gIFwiQURBTVMgQ0VOVEVSXCJcbiAgXCJBRERJU09OXCJcbiAgXCJBRlRPTlwiXG4gIFwiQUlSTU9OVFwiXG4gIFwiQUtST05cIlxuICBcIkFrcm9uXCJcbiAgXCJBTEFCQU1BXCJcbiAgXCJBTEJBTllcIlxuICBcIkFsYmFueVwiXG4gIFwiQUxCQU5ZIENPVU5UWVwiXG4gIFwiQUxCQU5ZLCBOWVwiXG4gIFwiQUxCRVJUU09OXCJcbiAgXCJBTEJJT05cIlxuICBcIkFMQklPTiwgTkVXIFlPUktcIlxuICBcIkFMQklPTiwgTkVXIFlPUksgXCJcbiAgXCJBTERFUiBDUkVFS1wiXG4gIFwiQUxFWEFOREVSXCJcbiAgXCJBbGV4YW5kZXJcIlxuICBcIkFMRVhBTkRSSUEgQkFZXCJcbiAgXCJBbGZyZWRcIlxuICBcIkFMRlJFRFwiXG4gIFwiQWxmcmVkIFN0YXRpb25cIlxuICBcIkFMTEVHQU5ZXCJcbiAgXCJBbG1vbmRcIlxuICBcIkFMVEFNT05UXCJcbiAgXCJBTFRNQVJcIlxuICBcIkFMVE9OXCJcbiAgXCJBbHRvbmFcIlxuICBcIkFNRU5JQVwiXG4gIFwiQU1IRVJTVFwiXG4gIFwiQU1TVEVEQU1cIlxuICBcIkFNU1RFUkRBTVwiXG4gIFwiQU5DUkFNXCJcbiAgXCJBTkNSQU1EQUxFXCJcbiAgXCJBbmRlc1wiXG4gIFwiQU5ERVNcIlxuICBcIkFuZG92ZXJcIlxuICBcIkFuZG92ZXIgXCJcbiAgXCJBbmdlbGljYVwiXG4gIFwiQU5OQURBTEUgT04gSFVEU09OXCJcbiAgXCJBTk5BTkRBTEUtT04tSFVEU09OXCJcbiAgXCJBbnR3ZXJwXCJcbiAgXCJBTlRXRVJQXCJcbiAgXCJBUEFMQUNISU5cIlxuICBcIkFQUExFVE9OXCJcbiAgXCJBcHVsaWEgU3RhdGlvblwiXG4gIFwiQVJDQURFXCJcbiAgXCJBcmNhZGVcIlxuICBcIkFSRFNMRVlcIlxuICBcIkFSRFNMRVktT04tSFVEU09OXCJcbiAgXCJBUkdZTEVcIlxuICBcIkFSS1BPUlRcIlxuICBcIkFSS1ZJTExFXCJcbiAgXCJBcmt2aWxsZVwiXG4gIFwiQVJNT05LXCJcbiAgXCJBU0hMQU5EXCJcbiAgXCJBU0hWSUxMRVwiXG4gIFwiQVRIRU5TXCJcbiAgXCJBdGhlbnNcIlxuICBcIkFUTEFOVElDIEJFQUNIXCJcbiAgXCJBVFRJQ0FcIlxuICBcIkF1IFNhYmxlIEZvcmtzXCJcbiAgXCJBVUJVUk5cIlxuICBcIkFVUk9SQVwiXG4gIFwiQVVTQUJMRSBDSEFTTVwiXG4gIFwiQXVTYWJsZSBDaGFzbVwiXG4gIFwiQVVTQUJMRSBGT1JLU1wiXG4gIFwiQXVTYWJsZSBGb3Jrc1wiXG4gIFwiQVZBXCJcbiAgXCJBVkVSSUxMIFBBUktcIlxuICBcIkFWRVJJTEwgUEsuXCJcbiAgXCJBVk9DQVwiXG4gIFwiQVZPTlwiXG4gIFwiQXZvblwiXG4gIFwiQkFJTkJSSURHRVwiXG4gIFwiQkFMRFdJTlwiXG4gIFwiQkFMRFdJTiBcIlxuICBcIkJBTERXSU4gSEFSQk9SXCJcbiAgXCJCQUxEV0lOIFBMQUNFXCJcbiAgXCJCYWxkd2luc3ZpbGxlXCJcbiAgXCJCQUxEV0lOU1ZJTExFXCJcbiAgXCJCQUxMU1RPTiBMQUtFXCJcbiAgXCJCQUxMU1RPTiBMQUtFIFwiXG4gIFwiQkFMTFNUT04gU1BBXCJcbiAgXCJCQU5HQUxMXCJcbiAgXCJCQU5HT1JcIlxuICBcIkJBTktTVklMTEVcIlxuICBcIkJBUkRPTklBXCJcbiAgXCJCQVJLRVJcIlxuICBcIkJBUk5FVkVMRFwiXG4gIFwiQkFSUllUT1dOXCJcbiAgXCJCYXJyeXZpbGxlXCJcbiAgXCJCYXRhdmlhXCJcbiAgXCJCQVRBVklBXCJcbiAgXCJCQVRIXCJcbiAgXCJCQVlWSUxMRVwiXG4gIFwiQkVBQ09OXCJcbiAgXCJCZWFjb25cIlxuICBcIkJlYXIgTW91bnRhaW5cIlxuICBcIkJlYXIgTXRuXCJcbiAgXCJCRUFSU1ZJTExFXCJcbiAgXCJCRUFWRVIgREFNU1wiXG4gIFwiQkVBVkVSIEZBTExTXCJcbiAgXCJCRURGT1JEXCJcbiAgXCJCRURGT1JEIENPUk5FUlNcIlxuICBcIkJFREZPUkQgSElMTFNcIlxuICBcIkJFREZPUkQgVklMTEFHRVwiXG4gIFwiQmVsZmFzdFwiXG4gIFwiQkVMTEVST1NFXCJcbiAgXCJCRUxMRVZJTExFXCJcbiAgXCJCRUxMTU9SRVwiXG4gIFwiQkVMTFZBTEVcIlxuICBcIkJlbG1vbnRcIlxuICBcIkJFTVVTIFBPSU5UXCJcbiAgXCJCRU1VUyBQT0lOVCBOWVwiXG4gIFwiQkVNVVMgUFQuXCJcbiAgXCJCZXJnZW5cIlxuICBcIkJFUkdFTlwiXG4gIFwiQkVSS1NISVJFXCJcbiAgXCJCZXJsaW5cIlxuICBcIkJFUkxJTlwiXG4gIFwiQkVSTkVcIlxuICBcIkJFUk5IQVJEUyBCQVlcIlxuICBcIkJFVEhBTllcIlxuICBcIkJldGhlbFwiXG4gIFwiQkVUSFBBR0VcIlxuICBcIkJJRyBGTEFUU1wiXG4gIFwiQklHIElORElBTlwiXG4gIFwiQklOR0hBTVRPTlwiXG4gIFwiQmluZ2hhbXRvblwiXG4gIFwiQkxBQ0sgUklWRVJcIlxuICBcIkJMQVVWRUxUXCJcbiAgXCJCTElTU1wiXG4gIFwiQkxPT01GSUVMRFwiXG4gIFwiQkxPT01GSUVMRCBcIlxuICBcIkJMT09NSU5HIEdST1ZFXCJcbiAgXCJCTE9PTUlOR0JVUkdcIlxuICBcIkJsb29taW5nYnVyZ1wiXG4gIFwiQkxPT01JTkdEQUxFXCJcbiAgXCJCTE9PTVZJTExFXCJcbiAgXCJCTE9TU1ZBTEVcIlxuICBcIkJMVUUgTVQgTEFLRVwiXG4gIFwiQkxVRSBNVC4gTEFLRVwiXG4gIFwiQkxVRSBNVE4gTEFLRVwiXG4gIFwiQkxVRkYgUE9JTlRcIlxuICBcIkJPSUNFVklMTEVcIlxuICBcIkJvbGl2YXJcIlxuICBcIkJPTFRPTiBMQU5ESU5HXCJcbiAgXCJCT09OVklMTEVcIlxuICBcIkJPVUNLVklMTEVcIlxuICBcIkJPVklOQSBDRU5URVJcIlxuICBcIkJSQURGT1JEXCJcbiAgXCJCUkFOQ0hQT1JUXCJcbiAgXCJCUkFOVCBMQUtFXCJcbiAgXCJCUkFOVElOR0hBTVwiXG4gIFwiQnJhc2hlciBGYWxsc1wiXG4gIFwiQnJld2VydG9uXCJcbiAgXCJCUkVXRVJUT05cIlxuICBcIkJSRVdTVEVSXCJcbiAgXCJCcmV3c3RlclwiXG4gIFwiQlJFV1NURVIsICBOWVwiXG4gIFwiQlJJQVJDTElGRlwiXG4gIFwiQlJJQVJDTElGRiBNQU5PUlwiXG4gIFwiQlJJREdFUE9SVFwiXG4gIFwiQnJpZGdlcG9ydFwiXG4gIFwiQlJJREdFV0FURVJcIlxuICBcIkJyaWVyIEhpbGxcIlxuICBcIkJST0FEQUxCSU5cIlxuICBcIkJST0NLUE9SVFwiXG4gIFwiQlJPQ1RPTlwiXG4gIFwiQlJPTlhcIlxuICBcIkJST05YVklMTEVcIlxuICBcIkJST09LRklFTERcIlxuICBcIkJST09LVE9OREFMRVwiXG4gIFwiQlJPT0tWSUxMRVwiXG4gIFwiQlJPV05WSUxMRVwiXG4gIFwiQlJVTlNXSUNLXCJcbiAgXCJCUlVTSFRPTlwiXG4gIFwiQlVDSEFOQU5cIlxuICBcIkJVTExWSUxMRVwiXG4gIFwiQlVSREVUVFwiXG4gIFwiQlVSS0VcIlxuICBcIkJ1cmxpbmdoYW1cIlxuICBcIkJVUk5UIEhJTExTXCJcbiAgXCJCVVJUXCJcbiAgXCJCWVJPTlwiXG4gIFwiQ2FkeXZpbGxlXCJcbiAgXCJDQUlST1wiXG4gIFwiQ0FMQ0lVTVwiXG4gIFwiQ2FsZWRvbmlhXCJcbiAgXCJDQUxFRE9OSUFcIlxuICBcIkNhbGxpY29vblwiXG4gIFwiQ0FNQlJJREdFXCJcbiAgXCJDYW1icmlkZ2VcIlxuICBcIkNBTURFTlwiXG4gIFwiQ0FNRVJPTiBNSUxMU1wiXG4gIFwiQ2FtaWxsdXNcIlxuICBcIkNBTUlMTFVTXCJcbiAgXCJDQU1QQkVMTFwiXG4gIFwiQ0FNUEJFTEwgSEFMTFwiXG4gIFwiQ0FOQUFOXCJcbiAgXCJDQU5BSk9IQVJJRVwiXG4gIFwiQ0FOQU5EQUlHSVVBXCJcbiAgXCJDQU5BTkRBSUdVQVwiXG4gIFwiQ0FOQU5EQUlHVUEgXCJcbiAgXCJDQU5BTkRBSVVHQVwiXG4gIFwiQ2FuYXNlcmFnYVwiXG4gIFwiQ0FOQVNUT1RBXCJcbiAgXCJDQU5ET1JcIlxuICBcIkNBTklTVEVPXCJcbiAgXCJDYW50b25cIlxuICBcIkNBTlRPTlwiXG4gIFwiQ2FudG9uIFwiXG4gIFwiQ0FQRSBWSU5DRU5UXCJcbiAgXCJDQVJMRSBQTEFDRVwiXG4gIFwiQ0FSTElTTEVcIlxuICBcIkNBUk1FTFwiXG4gIFwiQ2FybWVsXCJcbiAgXCJDQVJNRUwgIE5ZXCJcbiAgXCJDQVJPR0EgIExBS0VcIlxuICBcIkNBUk9HQSBMQUtFXCJcbiAgXCJDQVJUSEFHRVwiXG4gIFwiQ0FTU0FEQUdBXCJcbiAgXCJDQVNUSUxFXCJcbiAgXCJDQVNUTEVUT05cIlxuICBcIkNhc3RsZXRvblwiXG4gIFwiQ0FTVExFVE9OLU9OLUhVRFNPTlwiXG4gIFwiQ0FTVE9STEFORFwiXG4gIFwiQ0FUT1wiXG4gIFwiQ0FUU0tJTExcIlxuICBcIkNhdHNraWxsXCJcbiAgXCJDQVRUQVJBVUdVU1wiXG4gIFwiQ0FUVEFSQVVHVVMgQ09VTlRZXCJcbiAgXCJDQVlVR0FcIlxuICBcIkNBWVVHQSBDT1VOVFlcIlxuICBcIkNhemVub3ZpYVwiXG4gIFwiQ0FaRU5PVklBXCJcbiAgXCJDRURBUkhVUlNUXCJcbiAgXCJDRUxPUk9OXCJcbiAgXCJDRU5URVIgTElTTEVcIlxuICBcIkNFTlRSQUwgQlJJREdFXCJcbiAgXCJDRU5UUkFMIE5ZQUNLXCJcbiAgXCJDRU5UUkFMIFNRVUFSRVwiXG4gIFwiQ0VOVFJBTCBWQUxMRVlcIlxuICBcIkNFUkVTXCJcbiAgXCJDSEFEV0lDS1NcIlxuICBcIkNoYW1wbGFpblwiXG4gIFwiQ0hBUFBBUVVBXCJcbiAgXCJDSEFSTFRPTlwiXG4gIFwiQ0hBVEVBVUdBWVwiXG4gIFwiQ0hBVEhBTVwiXG4gIFwiQ0hBVU1PTlRcIlxuICBcIkNIQVVUQVVRVUFcIlxuICBcIkNoYXp5XCJcbiAgXCJDSEVMU0VBXCJcbiAgXCJDSEVNVU5HIENPVU5UWVwiXG4gIFwiQ0hFTkFOR08gQlJJREdFXCJcbiAgXCJDSEVOQU5HTyBDT1VOVFlcIlxuICBcIkNIRU5BTkdPIEZPUktTXCJcbiAgXCJDaGVuYW5nbyBGb3Jrc1wiXG4gIFwiQ0hFUlJZIENSRUVLXCJcbiAgXCJDSEVSUlkgVkFMTEVZXCJcbiAgXCJDSEVTVEVSXCJcbiAgXCJDSEVTVEVSVE9XTlwiXG4gIFwiQ0hFU1ROVVQgUklER0VcIlxuICBcIkNoaWxkd29sZFwiXG4gIFwiQ0hJTElcIlxuICBcIkNISVRURU5BTkdPXCJcbiAgXCJDSFVSQ0hWSUxFXCJcbiAgXCJDSFVSQ0hWSUxMRVwiXG4gIFwiQ2h1cnVidXNjb1wiXG4gIFwiQ2ljZXJvXCJcbiAgXCJDSU5DSU5OQVRVU1wiXG4gIFwiQ2lubmNpbmF0dXNcIlxuICBcIkNJUkNMRVZJTExFXCJcbiAgXCJDTEFSRU5ET05cIlxuICBcIkNMQVJLIE1JTExTXCJcbiAgXCJDTEFSS1NWSUxMRVwiXG4gIFwiQ0xBUllWSUxMRVwiXG4gIFwiQ0xBVkVSQUNLXCJcbiAgXCJDbGF5XCJcbiAgXCJDTEFZXCJcbiAgXCJDTEFZVE9OXCJcbiAgXCJDbGF5dG9uXCJcbiAgXCJDTEFZVklMTEVcIlxuICBcIkNMRVZFTEFORFwiXG4gIFwiQ0xFVkVSREFMRVwiXG4gIFwiQ0xJRlRPTiAgUEFSS1wiXG4gIFwiQ0xJRlRPTiBQQVJLXCJcbiAgXCJDTElGVE9OIFNQUklOR1NcIlxuICBcIkNMSU1BWFwiXG4gIFwiQ0xJTlRPTlwiXG4gIFwiQ0xZREVcIlxuICBcIkNMWURFIFwiXG4gIFwiQ0xZTUVSXCJcbiAgXCJDT0JMRVNLSUxMXCJcbiAgXCJDb2JsZXNraWxsXCJcbiAgXCJDb2NoZWN0b25cIlxuICBcIkNPRVlNQU5TXCJcbiAgXCJDT0hPQ1RPTlwiXG4gIFwiQ09IT0VTXCJcbiAgXCJDT0hPRVMgXCJcbiAgXCJDT0xEIEJST09LXCJcbiAgXCJDT0xEIFNQUklOR1wiXG4gIFwiQ09MRCBTUFJJTkcgSEFSQk9SXCJcbiAgXCJDT0xMSUVSU1ZJTExFXCJcbiAgXCJDT0xPTklFXCJcbiAgXCJDb2x0b25cIlxuICBcIkNPTVNUT0NLXCJcbiAgXCJDT05FU1VTXCJcbiAgXCJDT05FV0FOR08gVkFMTEVZXCJcbiAgXCJDT05HRVJTXCJcbiAgXCJDT05LSUxOXCJcbiAgXCJDT05LTElOXCJcbiAgXCJDb25rbGluXCJcbiAgXCJDT05TVEFCTEVcIlxuICBcIkNPTlNUQUJMRVZJTExFXCJcbiAgXCJDT05TVEFOVElBXCJcbiAgXCJDb29wZXJzdG93blwiXG4gIFwiQ09PUEVSU1RPV05cIlxuICBcIkNPUEFLRVwiXG4gIFwiQ09QQUtFIEZBTExTXCJcbiAgXCJDT1BFTkhBR0VOXCJcbiAgXCJDT1JGVVwiXG4gIFwiQ29yZnVcIlxuICBcIkNPUklOVEhcIlxuICBcIkNPUk5JTkdcIlxuICBcIkNPUk5XQUxMXCJcbiAgXCJDT1JOV0FMTCBPTiBIVURTT05cIlxuICBcIkNPUk5XQUxMLU9OLUhVRFNPTlwiXG4gIFwiQ09STldBTExWSUxMRVwiXG4gIFwiQ09STldBTExWSUxMRSxcIlxuICBcIkNPUlRMQU5EXCJcbiAgXCJDb3J0bGFuZFwiXG4gIFwiQ09SVExBTkQgXCJcbiAgXCJDb3J0bGFuZCBcIlxuICBcIkNPUlRMQU5EIE1BTk9SXCJcbiAgXCJDT1JUTEFORFRcIlxuICBcIkNPUlRMQU5EVCBNQU5PUlwiXG4gIFwiQ09SVExBTlQgTUFOT1JcIlxuICBcIkNPV0xFU1ZJTExFXCJcbiAgXCJDT1hTQUNLSUVcIlxuICBcIkNveHNhY2tpZVwiXG4gIFwiQ3JhbmJlcnJ5IExha2VcIlxuICBcIkNSQVJZVklMTEVcIlxuICBcIkNST0dIQU5cIlxuICBcIkNST1BTRVlWSUxMRVwiXG4gIFwiQ1JPU1MgUklWRVJcIlxuICBcIkNST1RPTlwiXG4gIFwiQ1JPVE9OIEZBTExTXCJcbiAgXCJDUk9UT04gT04gSFVEU09OXCJcbiAgXCJDUk9UT04tT04tSFVEU09OXCJcbiAgXCJDUk9XTiBQT0lOVFwiXG4gIFwiQ3ViYVwiXG4gIFwiQ3VkZGViYWNrdmlsbGVcIlxuICBcIkNVRERFQkFDS1ZJTExFXCJcbiAgXCJDVVlMRVJcIlxuICBcIkRhbm5lbW9yYVwiXG4gIFwiREFOU1ZJSUxMRVwiXG4gIFwiREFOU1ZJTExFXCJcbiAgXCJEYW5zdmlsbGVcIlxuICBcIkRBTlNWSUxMRSBcIlxuICBcIkRBUklFTlwiXG4gIFwiRGFyaWVuIENlbnRlclwiXG4gIFwiREFSSUVOIENFTlRFUlwiXG4gIFwiRGF2ZW5wb3J0XCJcbiAgXCJEQVZFTlBPUlRcIlxuICBcIkRBVkVOUE9SVCBDRU5URVJcIlxuICBcIkRFQU5TQk9ST1wiXG4gIFwiRGVLYWxiIEp1bmN0aW9uXCJcbiAgXCJERUxBTkNFWVwiXG4gIFwiREVMQU5TT05cIlxuICBcIkRFTEVWQU5cIlxuICBcIkRFTEhJXCJcbiAgXCJEZWxoaVwiXG4gIFwiREVMTUFSXCJcbiAgXCJEZWxwaGkgRmFsbHNcIlxuICBcIkRFTk1BUktcIlxuICBcIkRFUEFVVklMTEVcIlxuICBcIkRFUE9TSVRcIlxuICBcIkRlcG9zaXRcIlxuICBcIkRFUlVZVEVSXCJcbiAgXCJEZVJ1eXRlclwiXG4gIFwiRGV3aXR0XCJcbiAgXCJERVdJVFRcIlxuICBcIkRlV2l0dFwiXG4gIFwiREVXSVRUVklMTEVcIlxuICBcIkRFWFRFUlwiXG4gIFwiRGV4dGVyXCJcbiAgXCJESUFNT05EIFBPSU5UXCJcbiAgXCJESUNLSU5TT04gQ0VOVEVSXCJcbiAgXCJET0JCUyBGRVJSWVwiXG4gIFwiRE9MR0VWSUxMRVwiXG4gIFwiRE9WRVIgUExBSU5TXCJcbiAgXCJEb3duc3ZpbGxlXCJcbiAgXCJET1dOU1ZJTExFXCJcbiAgXCJEUkVTREVOXCJcbiAgXCJEUllERU5cIlxuICBcIkRVQU5FU0JVUkdcIlxuICBcIkRVTkRFRVwiXG4gIFwiRFVOREVFIFwiXG4gIFwiRFVOS0lSS1wiXG4gIFwiRHVua2lya1wiXG4gIFwiRFVSSEFNXCJcbiAgXCJEVVJIQU1WSUxMRVwiXG4gIFwiRS4gQkVSTkVcIlxuICBcIkUuIFJBTkRPTFBIXCJcbiAgXCJFLiBST0NIRVNURVJcIlxuICBcIkUuIFNQUklOR0ZJRUxEXCJcbiAgXCJFLkdSRUVOQlVTSFwiXG4gIFwiRUFHTEUgQkFZXCJcbiAgXCJFQUdMRSBCUklER0VcIlxuICBcIkVBUkxUT05cIlxuICBcIkVBUkxWSUxMRVwiXG4gIFwiRUFTVCBCRVJORVwiXG4gIFwiRUFTVCBCTE9PTUZJRUxEIFwiXG4gIFwiRUFTVCBCUkFOQ0hcIlxuICBcIkVBU1QgQ0hBVEhBTVwiXG4gIFwiRUFTVCBEVVJIQU1cIlxuICBcIkVBU1QgR1JFRU5CVVNIXCJcbiAgXCJFYXN0IEdyZWVuYnVzaFwiXG4gIFwiRUFTVCBISUxMU1wiXG4gIFwiRUFTVCBKRVdFVFRcIlxuICBcIkVBU1QgTUVBRE9XXCJcbiAgXCJFQVNUIE1FUkVESVRIXCJcbiAgXCJFQVNUIE5PUldJQ0hcIlxuICBcIkVBU1QgT1RUT1wiXG4gIFwiRUFTVCBQSEFSU0FMSUFcIlxuICBcIkVBU1QgUkFORE9MUEhcIlxuICBcIkVBU1QgUk9DSEVTVEVSXCJcbiAgXCJFQVNUIFJPQ0tBV0FZXCJcbiAgXCJFYXN0IFN5cmFjdXNlXCJcbiAgXCJFQVNUIFNZUkFDVVNFXCJcbiAgXCJFQVNUIFdJTExJU1RPTlwiXG4gIFwiRUFTVCBXSU5ESEFNXCJcbiAgXCJFQVNUQ0hFU1RFUlwiXG4gIFwiRUFUT05cIlxuICBcIkVERFlWSUxMRVwiXG4gIFwiRURJTkJVUkdcIlxuICBcIkVETUVTVE9OXCJcbiAgXCJFZG1lc3RvblwiXG4gIFwiRWR3YXJkc1wiXG4gIFwiRUxCQVwiXG4gIFwiRWxiYVwiXG4gIFwiRWxicmlkZ2VcIlxuICBcIkVMQlJJREdFXCJcbiAgXCJFbGRyZWRcIlxuICBcIkVMSUNPVFRWSUxMRVwiXG4gIFwiRUxJWkFCRVRIVE9XTlwiXG4gIFwiRUxJWkFWSUxMRVwiXG4gIFwiRUxLQSBQQVJLXCJcbiAgXCJFbGxlbmJ1cmcgQ2VudGVyXCJcbiAgXCJFbGxlbmJ1cmcgRGVwb3RcIlxuICBcIkVsbGVuYnVyZyBEZXBvdCwgTllcIlxuICBcIkVMTEVOVklMTEVcIlxuICBcIkVMTElDT1RUVklMTEVcIlxuICBcIkVMTElDT1RUVklMTEUgXCJcbiAgXCJFbGxpbmd0b25cIlxuICBcIkVMTElOR1RPTlwiXG4gIFwiRUxNSVJBXCJcbiAgXCJFTE1JUkEgSEVJR0hUU1wiXG4gIFwiRUxNT05UXCJcbiAgXCJFTE1TRk9SRFwiXG4gIFwiRUxTTUVSRVwiXG4gIFwiRU5ESUNPVFRcIlxuICBcIkVuZGljb3R0XCJcbiAgXCJFTkRXRUxMXCJcbiAgXCJFUklFVklMTEVcIlxuICBcIkVSSU5cIlxuICBcIkVTT1BVU1wiXG4gIFwiRVNQRVJBTkNFXCJcbiAgXCJFU1NFWFwiXG4gIFwiRVZBTlMgTUlMTFNcIlxuICBcIkZBQklVU1wiXG4gIFwiRmFiaXVzXCJcbiAgXCJGQUlSIEhBVkVOXCJcbiAgXCJGQUlSUE9SVFwiXG4gIFwiRmFpcnBvcnRcIlxuICBcIkZBTENPTkVSXCJcbiAgXCJGYWxjb25lcixcIlxuICBcIkZhbGxzYnVyZ1wiXG4gIFwiRkFSTUlOR0RBTEVcIlxuICBcIkZBUk1JTkdUT05cIlxuICBcIkZBUk1JTkdUT04gXCJcbiAgXCJGYXlldHRldmlsbGVcIlxuICBcIkZFTFRTIE1JTExTXCJcbiAgXCJGZXJuZGFsZVwiXG4gIFwiRkVVUkEgQlVTSFwiXG4gIFwiRmlsbG1vcmVcIlxuICBcIkZJTkRMRVkgTEFLRVwiXG4gIFwiRklORExFWSBMQUtFIFwiXG4gIFwiRklORVZJRVdcIlxuICBcIkZJU0hFUlMgTEFORElOR1wiXG4gIFwiRklTSEtJTExcIlxuICBcIkZMRUlTQ0hNQU5OU1wiXG4gIFwiRkxPUkFMIFBBUktcIlxuICBcIkZMT1JJREFcIlxuICBcIkZMT1dFUiBISUxMXCJcbiAgXCJGT05EQVwiXG4gIFwiRm9yZXN0YnVyZ2hcIlxuICBcIkZPUkVTVFBPUlRcIlxuICBcIkZPUkVTVFZJTExFXCJcbiAgXCJGT1JUIEFOTlwiXG4gIFwiRk9SVCBDT1ZJTkdUT05cIlxuICBcIkZPUlQgRURXQVJEXCJcbiAgXCJGT1JUIE1PTlRHT01FUllcIlxuICBcIkZPUlQgUExBSU5cIlxuICBcIkZSQU5LRk9SVFwiXG4gIFwiRlJBTktMSU5cIlxuICBcIkZSQU5LTElOIFNRVUFSRVwiXG4gIFwiRlJBTktMSU5WSUxMRVwiXG4gIFwiRlJFRE9OSUFcIlxuICBcIkZyZWRvbmlhXCJcbiAgXCJGUkVFRE9NXCJcbiAgXCJGUkVFSE9MRFwiXG4gIFwiRlJFRVBPUlRcIlxuICBcIkZSRUVWSUxMRVwiXG4gIFwiRlJFV1NCVVJHXCJcbiAgXCJGcmllbmRzaGlwXCJcbiAgXCJGVCBFRFdBUkRcIlxuICBcIkZULiBNT05UR09NRVJZXCJcbiAgXCJGVUxUT05cIlxuICBcIkZVTFRPTkhBTVwiXG4gIFwiRlVMVE9OVklMTEVcIlxuICBcIkdBQlJJRUxTXCJcbiAgXCJHQUlORVNWSUxMRVwiXG4gIFwiR0FMQVdBWVwiXG4gIFwiR0FMV0FZXCJcbiAgXCJHQU5HIE1JTExTXCJcbiAgXCJHQU5TRVZPT1JUXCJcbiAgXCJHQVJERU4gQ0lUWVwiXG4gIFwiR0FSREVOIENJVFkgXCJcbiAgXCJHQVJERU4gQ0lUWSBQQVJLXCJcbiAgXCJHQVJERU4gQ0lUWSBTT1VUSFwiXG4gIFwiR0FSRElORVJcIlxuICBcIkdBUk5FUlZJTExFXCJcbiAgXCJHQVJSSVNPTlwiXG4gIFwiR0FTUE9SVFwiXG4gIFwiR2FzcG9ydFwiXG4gIFwiR0VORVNFT1wiXG4gIFwiR2VuZXNlb1wiXG4gIFwiR0VORVZBXCJcbiAgXCJHZW5ldmFcIlxuICBcIkdFTkVWQSBcIlxuICBcIkdFTk9BXCJcbiAgXCJHRU9SR0VUT1dOXCJcbiAgXCJHRVJNQU5UT1dOXCJcbiAgXCJHRVJSWVwiXG4gIFwiR0hFTlRcIlxuICBcIkdJTEJFUlRTVklMTEVcIlxuICBcIkdpbGJvYVwiXG4gIFwiR0lMQk9BXCJcbiAgXCJHTEFTQ09cIlxuICBcIkdMRU4gQ09WRVwiXG4gIFwiR0xFTiBDT1ZFIFwiXG4gIFwiR0xFTiBIRUFEXCJcbiAgXCJHbGVuIFNwZXlcIlxuICBcIkdMRU5GSUVMRFwiXG4gIFwiR0xFTkhBTVwiXG4gIFwiR0xFTk1PTlRcIlxuICBcIkdMRU5TIEZBTExTXCJcbiAgXCJHTEVOVklMTEVcIlxuICBcIkdMRU5XT09EIExBTkRJTkdcIlxuICBcIkdMT1ZFUlNWSUxMRVwiXG4gIFwiR09MREVOUyBCUklER0VcIlxuICBcIkdPUkhBTVwiXG4gIFwiR09TSEVOXCJcbiAgXCJHb3NoZW5cIlxuICBcIkdvdXZlcm5ldXJcIlxuICBcIkdPV0FOREFcIlxuICBcIkdSQUZUT05cIlxuICBcIkdyYWhhbXN2aWxsZVwiXG4gIFwiR1JBTkQgR09SR0VcIlxuICBcIkdyYW5kIEdvcmdlXCJcbiAgXCJHUkFOSVRFIFNQUklOR1NcIlxuICBcIkdSQU5WSUxMRVwiXG4gIFwiR1JFQVQgQkVORFwiXG4gIFwiR1JFQVQgTkVDS1wiXG4gIFwiR1JFQVQgVkFMTEVZXCJcbiAgXCJHUkVFQ0VcIlxuICBcIkdSRUVOIElTTEFORFwiXG4gIFwiR1JFRU5FXCJcbiAgXCJHUkVFTkUsIE5ZXCJcbiAgXCJHUkVFTkZJRUxEXCJcbiAgXCJHUkVFTkZJRUxEIENFTlRFUlwiXG4gIFwiR1JFRU5GSUVMRCBQQVJLXCJcbiAgXCJHUkVFTlZBTEVcIlxuICBcIkdyZWVudmlsbGVcIlxuICBcIkdSRUVOVklMTEVcIlxuICBcIkdSRUVOV0lDSFwiXG4gIFwiR1JFRU5XT09EXCJcbiAgXCJHUkVFTldPT0QgTEFLRVwiXG4gIFwiR1JFSUdcIlxuICBcIkdST1RPTlwiXG4gIFwiR1VJTERFUkxBTkRcIlxuICBcIkdVSUxERVJMQU5EIENFTlRFUlwiXG4gIFwiR1VJTEZPUkRcIlxuICBcIkhBRExFWVwiXG4gIFwiSEFHQU1BTlwiXG4gIFwiSEFHVUVcIlxuICBcIkhBSU5FUyBGQUxMU1wiXG4gIFwiSEFMRk1PT05cIlxuICBcIkhBTURFTlwiXG4gIFwiSEFNSUxUT05cIlxuICBcIkhhbWlsdG9uXCJcbiAgXCJIQU1MSU5cIlxuICBcIkhhbW1vbmRcIlxuICBcIkhBTU1PTkRTUE9SVFwiXG4gIFwiSEFOQ09DS1wiXG4gIFwiSGFubmFjcm9peFwiXG4gIFwiSEFOTkFDUk9JWFwiXG4gIFwiSGFubmF3YSBGYWxsc1wiXG4gIFwiSEFOTklCQUxcIlxuICBcIkhBUkZPUkRcIlxuICBcIkhBUlBVUlNWSUxMRVwiXG4gIFwiSEFSUklNQU5cIlxuICBcIkhBUlJJU09OXCJcbiAgXCJIQVJSSVNWSUxMRVwiXG4gIFwiSGFycmlzdmlsbGVcIlxuICBcIkhBUlRGT1JEXCJcbiAgXCJIQVJUU0RBTEVcIlxuICBcIkhBUlRXSUNLXCJcbiAgXCJIQVNUSU5HU1wiXG4gIFwiSEFTVElOR1MtT04tSFVEU09OXCJcbiAgXCJIQVZFUlNUUkFXXCJcbiAgXCJIQVdUSE9STkVcIlxuICBcIkhFQ1RPUlwiXG4gIFwiSEVNTE9DS1wiXG4gIFwiSEVNUFNURUFEXCJcbiAgXCJIRU5ERVJTT05cIlxuICBcIkhFTkRFUlNPTiBIQVJCT1JcIlxuICBcIkhFTlJJRVRUQVwiXG4gIFwiSEVOU09OVklMTEVcIlxuICBcIkhlbnNvbnZpbGxlXCJcbiAgXCJIRVJLSU1FUlwiXG4gIFwiSGVybW9uXCJcbiAgXCJIZXV2ZWx0b25cIlxuICBcIkhFV0xFVFRcIlxuICBcIkhFV0xFVFQgSEFSQk9SXCJcbiAgXCJISUNLU1ZJTExFXCJcbiAgXCJISUdIIEZBTExTXCJcbiAgXCJISUdITEFORFwiXG4gIFwiSElHSExBTkQgRkFMTFNcIlxuICBcIkhpZ2hsYW5kIExha2VcIlxuICBcIkhJR0hMQU5EIE1JTExTXCJcbiAgXCJISUdITU9VTlRcIlxuICBcIkhJTExCVVJOXCJcbiAgXCJISUxMU0RBTEVcIlxuICBcIkhJTFRPTlwiXG4gIFwiSElNUk9EXCJcbiAgXCJISU5TREFMRVwiXG4gIFwiSE9CQVJUXCJcbiAgXCJIT0dBTlNCVVJHXCJcbiAgXCJIT0xMQU5EIFBBVEVOVFwiXG4gIFwiSE9MTEVZXCJcbiAgXCJIT0xNRVNcIlxuICBcIkhvbWVyXCJcbiAgXCJIT01FUlwiXG4gIFwiSE9ORU9ZRVwiXG4gIFwiSE9ORU9ZRSBcIlxuICBcIkhPTkVPWUUgRkFMTFNcIlxuICBcIkhPT1NJQ0tcIlxuICBcIkhPT1NJQ0sgRkFMTFNcIlxuICBcIkhPUEVXRUxMIEpVTkNUSU9OXCJcbiAgXCJIT1JORUxMXCJcbiAgXCJIT1JTRUhFQURTXCJcbiAgXCJIT1JTSEVBRFNcIlxuICBcIkhvdWdodG9uXCJcbiAgXCJIT1dFUyBDQVZFXCJcbiAgXCJIVUJCQVJEU1ZJTExFXCJcbiAgXCJIVURTT05cIlxuICBcIkhVRFNPTiBGQUxMU1wiXG4gIFwiSFVHVUVOT1RcIlxuICBcIkhVTEVUVFMgTEFORElOR1wiXG4gIFwiSFVOVFwiXG4gIFwiSFVOVEVSXCJcbiAgXCJIVVJMRVlcIlxuICBcIkh1cmxleXZpbGxlXCJcbiAgXCJIWURFIFBBUktcIlxuICBcIkhZREUgUEFSSyBcIlxuICBcIklMSU9OXCJcbiAgXCJJTkRJQU4gTEFLRVwiXG4gIFwiSU5MRVRcIlxuICBcIklOVEVSTEFLRU5cIlxuICBcIklOV09PRFwiXG4gIFwiSVJWSU5HXCJcbiAgXCJJUlZJTkdUT05cIlxuICBcIklTQ0hVQVwiXG4gIFwiSVNMQU5EIFBBUktcIlxuICBcIklUSEFDQVwiXG4gIFwiSXRoYWNhXCJcbiAgXCJKQUNLU09OIEhFSUdIVFNcIlxuICBcIkpBTUVTVE9XTlwiXG4gIFwiSmFtZXN0b3duXCJcbiAgXCJKYW1lc3ZpbGxlXCJcbiAgXCJKQU1FU1ZJTExFXCJcbiAgXCJKYW1zdG93blwiXG4gIFwiSkFWQSBDRU5URVJcIlxuICBcIkpFRkZFUlNPTlwiXG4gIFwiSkVGRkVSU09OIFZBTExFWVwiXG4gIFwiSmVmZmVyc29udmlsbGVcIlxuICBcIkpFUklDSE9cIlxuICBcIkpld2V0dFwiXG4gIFwiSk9ITlNCVVJHXCJcbiAgXCJKT0hOU09OIENJVFlcIlxuICBcIkpPSE5TT04gQ0lUWSBcIlxuICBcIkpPSE5TVE9XTlwiXG4gIFwiSm9yZGFuXCJcbiAgXCJKT1JEQU5cIlxuICBcIktBTk9OQVwiXG4gIFwiS0FUT05BSFwiXG4gIFwiS0FUVFNLSUxMIEJBWVwiXG4gIFwiS2F1bmVvbmdhIExha2VcIlxuICBcIktFRU5FXCJcbiAgXCJLRUVORSBWQUxMRVlcIlxuICBcIktlZXNldmlsbGVcIlxuICBcIktFRVNFVklMTEVcIlxuICBcIktFTkRBTExcIlxuICBcIktFTk5FRFlcIlxuICBcIktlbm5lZHlcIlxuICBcIktlbm96YSBMYWtlXCJcbiAgXCJLRU5UXCJcbiAgXCJLRU5UIExBS0VTXCJcbiAgXCJLRVJIT05LU09OXCJcbiAgXCJLRVVLQSBQQVJLXCJcbiAgXCJLaWFtZXNoYSBMYWtlXCJcbiAgXCJLSU5ERVJIT09LXCJcbiAgXCJLSU5HIEZFUlJZXCJcbiAgXCJLSU5HU1RPTlwiXG4gIFwiS2lya3ZpbGxlXCJcbiAgXCJLSVJLV09PRFwiXG4gIFwiS0lSWUFTIEpPRUxcIlxuICBcIktSVU1WSUxMRVwiXG4gIFwiTEEgR1JBTkdFXCJcbiAgXCJMQUNPTkFcIlxuICBcIkxBRkFSR0VWSUxMRVwiXG4gIFwiTGFmYXlldHRlXCJcbiAgXCJMQUZBWUVUVEVcIlxuICBcIkxhRmF5ZXR0ZVwiXG4gIFwiTEFHUkFOR0VcIlxuICBcIkxBR1JBTkdFVklMTEVcIlxuICBcIkxBS0UgQ0xFQVJcIlxuICBcIkxBS0UgR0VPUkdFXCJcbiAgXCJMYWtlIEh1bnRpbmd0b25cIlxuICBcIkxBS0UgS0FUUklORVwiXG4gIFwiTEFLRSBMVVpFUk5FXCJcbiAgXCJMQUtFIFBMQUNJRFwiXG4gIFwiTGFrZSBQbGFjaWRcIlxuICBcIkxBS0UgUExBQ0lELCBOWSBcIlxuICBcIkxBS0UgUExFQVNBTlRcIlxuICBcIkxBS0UgU1VDQ0VTU1wiXG4gIFwiTEFLRU1PTlRcIlxuICBcIkxBS0VWSUxMRVwiXG4gIFwiTEFLRVdPT0RcIlxuICBcIkxha2V3b29kXCJcbiAgXCJMQU5TSU5HXCJcbiAgXCJMYW5zaW5nXCJcbiAgXCJMQVJDSE1PTlRcIlxuICBcIkxBVEhBTVwiXG4gIFwiTGF0aGFtXCJcbiAgXCJMQVRIQU0sIE5ZXCJcbiAgXCJMQVRUSU5HVE9XTlwiXG4gIFwiTGF1cmVuc1wiXG4gIFwiTEFXUkVOQ0VcIlxuICBcIkxFRSBDRU5URVJcIlxuICBcIkxFRURTXCJcbiAgXCJMZWVkc1wiXG4gIFwiTEVJQ0VTVEVSXCJcbiAgXCJMRU9OQVJEU1ZJTExFXCJcbiAgXCJMRVJPWVwiXG4gIFwiTGVSb3lcIlxuICBcIkxlcm95XCJcbiAgXCJMRVJPWSBcIlxuICBcIkxFVklUVE9XTlwiXG4gIFwiTGV3IEJlYWNoXCJcbiAgXCJMRVcgQkVBQ0hcIlxuICBcIkxFV0lTXCJcbiAgXCJMRVdJU1RPTlwiXG4gIFwiTEVXaVNUT05cIlxuICBcIkxpYmVydHlcIlxuICBcIkxJRE8gQkVBQ0hcIlxuICBcIkxJTFkgREFMRVwiXG4gIFwiTElNQVwiXG4gIFwiTElNRVJJQ0tcIlxuICBcIkxJTUVTVE9ORVwiXG4gIFwiTElOQ09MTkRBTEVcIlxuICBcIkxpc2JvblwiXG4gIFwiTElTTEVcIlxuICBcIkxJVFRMRSBGQUxMU1wiXG4gIFwiTElUVExFIFZBTExFWVwiXG4gIFwiTElUVExFIFlPUktcIlxuICBcIkxpdmVycG9vbFwiXG4gIFwiTElWRVJQT09MXCJcbiAgXCJMaXZpbmdzdG9uIE1hbm9yXCJcbiAgXCJMSVZPTklBXCJcbiAgXCJMaXZvbmlhXCJcbiAgXCJMb2NoIFNoZWxkcmFrZVwiXG4gIFwiTE9DS0VcIlxuICBcIkxPQ0tQT1JUXCJcbiAgXCJMT0NLUE9SVCwgTllcIlxuICBcIkxPQ1VTVCBWQUxMRVlcIlxuICBcIkxPRElcIlxuICBcIkxPTkcgQkVBQ0hcIlxuICBcIkxvbmcgRWRkeVwiXG4gIFwiTE9ORyBMQUtFXCJcbiAgXCJMb25nIExha2VcIlxuICBcIkxPVURPTlZJTExFXCJcbiAgXCJMT1dWSUxMRVwiXG4gIFwiTG93dmlsbGVcIlxuICBcIkxZQ09NSU5HXCJcbiAgXCJMWU5CUk9PS1wiXG4gIFwiTFlORE9OVklMTEVcIlxuICBcIkx5b24gTW91bnRhaW5cIlxuICBcIkxZT05TXCJcbiAgXCJMWU9OUyBcIlxuICBcIkxZT05TIEZBTExTXCJcbiAgXCJNQUNFRE9OXCJcbiAgXCJNQUNFRE9OIFwiXG4gIFwiTUFDSElBU1wiXG4gIFwiTUFESVNPTlwiXG4gIFwiTWFkcmlkXCJcbiAgXCJNQUhPUEFDXCJcbiAgXCJNYWhvcGFjXCJcbiAgXCJNQUlORVwiXG4gIFwiTUFMREVOXCJcbiAgXCJNQUxPTkVcIlxuICBcIk1hbG9uZVwiXG4gIFwiTUFMT05FIFwiXG4gIFwiTUFMVEFcIlxuICBcIk1BTFZFUk5FXCJcbiAgXCJNQU1BUk9ORUNLXCJcbiAgXCJNQU5DSEVTVEVSXCJcbiAgXCJNQU5IQVNTRVRcIlxuICBcIk1hbmxpdXNcIlxuICBcIk1BTkxJVVNcIlxuICBcIk1BTk5TVklMTEVcIlxuICBcIk1BTk9SSEFWRU5cIlxuICBcIk1BUkFUSE9OXCJcbiAgXCJNYXJhdGhvblwiXG4gIFwiTWFyY2VsbHVzXCJcbiAgXCJNQVJDRUxMVVNcIlxuICBcIk1BUkNZXCJcbiAgXCJNQVJHQVJFVFZJTExFXCJcbiAgXCJNYXJnYXJldHZpbGxlXCJcbiAgXCJNYXJpZXR0YVwiXG4gIFwiTUFSSUVUVEFcIlxuICBcIk1BUklPTlwiXG4gIFwiTUFSTEJPUk9cIlxuICBcIk1BUlRWSUxMRVwiXG4gIFwiTUFSWUxBTkRcIlxuICBcIk1BU1NBUEVRVUFcIlxuICBcIk1BU1NBUEVRVUEgIFBBUktcIlxuICBcIk1BU1NBUEVRVUEgUEFSS1wiXG4gIFwiTWFzc2VuYVwiXG4gIFwiTWF0dHlkYWxlXCJcbiAgXCJNQVRUWURBTEVcIlxuICBcIk1BWUJST09LXCJcbiAgXCJNQVlGSUVMRFwiXG4gIFwiTUFZVklMTEVcIlxuICBcIk1heXZpbGxlXCJcbiAgXCJNQ0NPTk5FTExTVklMTEVcIlxuICBcIk1jRE9OT1VHSFwiXG4gIFwiTUNET05PVUdIXCJcbiAgXCJNQ0dSQVdcIlxuICBcIk1jR3Jhd1wiXG4gIFwiTUVDSEFOSUNWSUxMRVwiXG4gIFwiTUVESU5BXCJcbiAgXCJNRURJTkEsXCJcbiAgXCJNRURJTkEsIE5FVyBZT1JLXCJcbiAgXCJNZW1waGlzXCJcbiAgXCJNRU5BTkRTXCJcbiAgXCJNRU5ET05cIlxuICBcIk1FUklESUFOXCJcbiAgXCJNRVJSSUNLXCJcbiAgXCJNZXJyaWxsXCJcbiAgXCJNRVhJQ09cIlxuICBcIk1JRERMRSBHUk9WRVwiXG4gIFwiTUlERExFQlVSR0hcIlxuICBcIk1pZGRsZWJ1cmdoXCJcbiAgXCJNSURETEVQT1JUXCJcbiAgXCJNSURETEVTRVhcIlxuICBcIk1JRERMRVRPV05cIlxuICBcIk1pZGRsZXRvd25cIlxuICBcIk1pbGVzZXNcIlxuICBcIk1JTEZPUkRcIlxuICBcIk1pbGZvcmRcIlxuICBcIk1JTEwgTkVDS1wiXG4gIFwiTUlMTEJST09LXCJcbiAgXCJNSUxMRVJUT05cIlxuICBcIk1pbGxlcnRvblwiXG4gIFwiTUlMTEVSVE9OIFwiXG4gIFwiTUlMTFBPUlRcIlxuICBcIk1JTExXT09EXCJcbiAgXCJNSUxUT05cIlxuICBcIk1pbHRvblwiXG4gIFwiTUlORU9MQVwiXG4gIFwiTUlORVJWQVwiXG4gIFwiTUlORVRUT1wiXG4gIFwiTUlORVZJTExFXCJcbiAgXCJNaW5vYVwiXG4gIFwiTU9ERU5BXCJcbiAgXCJNT0hBV0tcIlxuICBcIk1PSEVHQU4gTEFLRVwiXG4gIFwiTU9JUkFcIlxuICBcIk1vbmdhdXAgVmFsbGV5XCJcbiAgXCJNT05ST0VcIlxuICBcIk1vbnJvZVwiXG4gIFwiTU9OU0VZXCJcbiAgXCJNT05URUJFTExPXCJcbiAgXCJNT05URVpVTUFcIlxuICBcIk1PTlRHT01FUllcIlxuICBcIk1vbnRpY2VsbG9cIlxuICBcIk1PTlRJQ0VMTE9cIlxuICBcIk1PTlRPVVIgRkFMTFNcIlxuICBcIk1PTlRST1NFXCJcbiAgXCJNb29lcnNcIlxuICBcIk1vb2VycyBGb3Jrc1wiXG4gIFwiTU9SQVZJQVwiXG4gIFwiTW9yYXZpYVwiXG4gIFwiTU9SSUFIXCJcbiAgXCJNT1JJQUggQ0VOVEVSXCJcbiAgXCJNT1JSSVNcIlxuICBcIk1vcnJpc29udmlsbGVcIlxuICBcIk1PUlJJU09OVklMTEVcIlxuICBcIk1vcnJpc3Rvd25cIlxuICBcIk1PUlJJU1ZJTExFXCJcbiAgXCJNb3R0dmlsbGVcIlxuICBcIk1PVU5UIElWWVwiXG4gIFwiTU9VTlQgS0lTQ09cIlxuICBcIk1vdW50IE1vcnJpc1wiXG4gIFwiTU9VTlQgVFJFTVBFUlwiXG4gIFwiTU9VTlQgVkVSTk9OXCJcbiAgXCJNT1VOVCBWSVNJT05cIlxuICBcIk1PVU5UQUlOIFZJRVdcIlxuICBcIk1PVU5UQUlOIFZJRVcgXCJcbiAgXCJNb3VudGFpbmRhbGVcIlxuICBcIk1PVU5UQUlOVklMTEVcIlxuICBcIk1UIFRSRU1QRVJcIlxuICBcIk1ULiBNQVJJT05cIlxuICBcIk1ULiBNT1JSSVNcIlxuICBcIk10LiBNb3JyaXNcIlxuICBcIk1ULiBNT1JSSVMgXCJcbiAgXCJNVC4gVFJFTVBFUlwiXG4gIFwiTVQuIFVQVE9OXCJcbiAgXCJNdC5Nb3JyaXNcIlxuICBcIk1VTUZPUkRcIlxuICBcIk1VTk5TVklMTEVcIlxuICBcIk1VTlNFWSBQQVJLXCJcbiAgXCJOIE1BU1NBUEVRVUFcIlxuICBcIk4uIEJST09LRklFTERcIlxuICBcIk4uIENISUxJXCJcbiAgXCJOLiBUT05BV0FOREFcIlxuICBcIk5BTlVFVFwiXG4gIFwiTkFQQU5PQ0hcIlxuICBcIk5BUExFU1wiXG4gIFwiTkFQTEVTIFwiXG4gIFwiTmFycm93c2J1cmdcIlxuICBcIk5BU1NBVVwiXG4gIFwiTkFUVVJBTCBCUklER0VcIlxuICBcIk5lZHJvd1wiXG4gIFwiTkVEUk9XXCJcbiAgXCJOZXZlcnNpbmtcIlxuICBcIk5FVyAgSFlERSBQQVJLXCJcbiAgXCJORVcgQkFMVElNT1JFXCJcbiAgXCJORVcgQkVSTElOXCJcbiAgXCJOZXcgQmVybGluXCJcbiAgXCJORVcgQ0FTVExFXCJcbiAgXCJORVcgQ0lUWVwiXG4gIFwiTkVXIEhBTVBUT05cIlxuICBcIk5FVyBIQVJURk9SRFwiXG4gIFwiTmV3IEhhcnRmb3JkXCJcbiAgXCJORVcgSEFSVEZPUkQsICBOWVwiXG4gIFwiTkVXIEhBVkVOXCJcbiAgXCJORVcgSEVNUFNURUFEXCJcbiAgXCJORVcgSFlERSBQQVJLXCJcbiAgXCJORVcgTEVCQU5PTlwiXG4gIFwiTkVXIFBBTFRaXCJcbiAgXCJORVcgUk9DSEVMTEVcIlxuICBcIk5FVyBTUVVBUkVcIlxuICBcIk5FVyBXSU5EU09SXCJcbiAgXCJORVcgV0lORFNPUiBcIlxuICBcIk5FVyBZT1JLIE1JTExTXCJcbiAgXCJORVdBUktcIlxuICBcIk5FV0FSSyBcIlxuICBcIk5FV0FSSyBWQUxMRVlcIlxuICBcIk5FV0JVUkdIXCJcbiAgXCJOZXdidXJnaFwiXG4gIFwiTkVXQ09NQlwiXG4gIFwiTkVXRkFORVwiXG4gIFwiTkVXRklFTERcIlxuICBcIk5FV1BPUlRcIlxuICBcIk5JQUdBUkEgRkFMTExTXCJcbiAgXCJOSUFHQVJBIEZBTExTXCJcbiAgXCJOaWFnYXJhIEZhbGxzXCJcbiAgXCJOSUFHQVJBIFVOSVZFUlNJVFlcIlxuICBcIk5JQ0hPTFNcIlxuICBcIk5JU0tBWVVOQVwiXG4gIFwiTklWRVJWSUxMRVwiXG4gIFwiTm9yZm9sa1wiXG4gIFwiTk9SVEggQkFZXCJcbiAgXCJOT1JUSCBCRUxMTU9SRVwiXG4gIFwiTk9SVEggQkxFTkhFSU1cIlxuICBcIk5PUlRIIENISUxJXCJcbiAgXCJOT1JUSCBDUkVFS1wiXG4gIFwiTk9SVEggSElMTFNcIlxuICBcIk5PUlRIIEhPT1NJQ0tcIlxuICBcIk5PUlRIIEhPUk5FTExcIlxuICBcIk5PUlRIIEhVRFNPTlwiXG4gIFwiTm9ydGggTGF3cmVuY2VcIlxuICBcIk5PUlRIIE1BU1NBUEVRVUFcIlxuICBcIk5PUlRIIE1FUlJJQ0tcIlxuICBcIk5PUlRIIE5PUldJQ0hcIlxuICBcIk5PUlRIIFBPTEVcIlxuICBcIk5PUlRIIFJJVkVSXCJcbiAgXCJOT1JUSCBST1NFXCJcbiAgXCJOT1JUSCBTQUxFTVwiXG4gIFwiTm9ydGggU3lyYWN1c2VcIlxuICBcIk5PUlRIIFNZUkFDVVNFXCJcbiAgXCJOT1JUSCBUT05BV0FOREFcIlxuICBcIk5PUlRIIFZBTExFWSBTVFJFQU1cIlxuICBcIk5PUlRIIFdISVRFIFBMQUlOU1wiXG4gIFwiTk9SVEggV09PRE1FUkVcIlxuICBcIk5PUlRIVklMTEVcIlxuICBcIk5PUldBWVwiXG4gIFwiTk9SV0lDSFwiXG4gIFwiTm9yd2ljaFwiXG4gIFwiTk9SV0lDSCwgTi5ZLlwiXG4gIFwiTm9yd29vZFwiXG4gIFwiTnVuZGFcIlxuICBcIk5VTkRBXCJcbiAgXCJOWUFDS1wiXG4gIFwiT0FLIEhJTExcIlxuICBcIk9ha2ZpZWxkXCJcbiAgXCJPQUtGSUVMRFwiXG4gIFwiT0NFQU5TSURFXCJcbiAgXCJPREVTU0FcIlxuICBcIk9nZGVuc2J1cmdcIlxuICBcIk9MQ09UVFwiXG4gIFwiT0xEIEJFVEhQQUdFXCJcbiAgXCJPTEQgQlJPT0tWSUxMRVwiXG4gIFwiT0xEIENIQVRIQU1cIlxuICBcIk9MRCBGT1JHRVwiXG4gIFwiT0xEIFdFU1RCVVJZXCJcbiAgXCJPTEVBTlwiXG4gIFwiT0xFQU4gXCJcbiAgXCJPTElWRUJSSURHRVwiXG4gIFwiT0xJVkVSRUFcIlxuICBcIk9MTVNURURWSUxMRVwiXG4gIFwiT05FSURBXCJcbiAgXCJPbmVpZGFcIlxuICBcIk9ORUlEQSxcIlxuICBcIk9ORU9OVEFcIlxuICBcIk9uZW9udGFcIlxuICBcIk9OSUVEQVwiXG4gIFwiT05UQVJJT1wiXG4gIFwiT05UQVJJTyBcIlxuICBcIk9OVEFSSU8gQ0VOVEVSXCJcbiAgXCJPcmFtZWxcIlxuICBcIk9SQU5HRUJVUkdcIlxuICBcIk9SSVNLQU5ZXCJcbiAgXCJPUklTS0FOWSBGQUxMU1wiXG4gIFwiT1JXRUxMXCJcbiAgXCJPU0NFT0xBXCJcbiAgXCJPU1NJTklOR1wiXG4gIFwiT3N3ZWdhdGNoaWVcIlxuICBcIk9TV0VHT1wiXG4gIFwiT1NXRUdPIFwiXG4gIFwiT1RFR09cIlxuICBcIk9USVNWSUxMRVwiXG4gIFwiT1ZJRFwiXG4gIFwiT1ZJRCBcIlxuICBcIk9XRUdPXCJcbiAgXCJPd2Vnb1wiXG4gIFwiT1dMUyBIRUFEXCJcbiAgXCJPWEZPUkRcIlxuICBcIk9ZU1RFUiBCQVlcIlxuICBcIk9ZU1RFUiBCQVkgQ09WRVwiXG4gIFwiUEFJTlRFRCBQT1NUXCJcbiAgXCJQQUxBVElORSBCUklER0VcIlxuICBcIlBBTEVOVklMTEVcIlxuICBcIlBBTElTQURFU1wiXG4gIFwiUEFMTVlSQVwiXG4gIFwiUEFOQU1BXCJcbiAgXCJQQU5BTUEgXCJcbiAgXCJQQVJJU0hcIlxuICBcIlBhcmlzaHZpbGxlXCJcbiAgXCJQYXJrc3ZpbGxlXCJcbiAgXCJQQVRURVJTT05cIlxuICBcIlBBVFRFUlNPTiwgIE5ZXCJcbiAgXCJQQVRURVJTT05WSUxMRVwiXG4gIFwiUEFVTCBTTUlUSFNcIlxuICBcIlBBVklMSU9OXCJcbiAgXCJQQVdMSU5HXCJcbiAgXCJQQVdMSU5HIFwiXG4gIFwiUEVBUkwgUklWRVJcIlxuICBcIlBlYXJsIFJpdmVyXCJcbiAgXCJQRUFSTCBSSVZFUiBcIlxuICBcIlBFRUtTSUxMXCJcbiAgXCJQRUVLU0tJTExcIlxuICBcIlBFTEhBTVwiXG4gIFwiUEVMSEFNIE1BTk9SXCJcbiAgXCJQRU5GSUVMRFwiXG4gIFwiUEVOSUVMRFwiXG4gIFwiUEVOTiBZQU5cIlxuICBcIlBFTk4gWUFOIFwiXG4gIFwiUEVOTkVMTFZJTExFXCJcbiAgXCJQRVJSWVwiXG4gIFwiUGVycnlcIlxuICBcIlBFUlJZU0JVUkdcIlxuICBcIlBFUlRIXCJcbiAgXCJQZXJ1XCJcbiAgXCJQZXJ1LCBOWVwiXG4gIFwiUEhFTFBTXCJcbiAgXCJQSEVMUFMgICAgICAgTllcIlxuICBcIlBISUxBREVMUEhJQVwiXG4gIFwiUEhJTE1PTlRcIlxuICBcIlBIT0VOSUNJQVwiXG4gIFwiUEhPRU5JWFwiXG4gIFwiUGhvZW5peFwiXG4gIFwiUElFUk1PTlRcIlxuICBcIlBJRVJSRVBPTlQgTUFOT1JcIlxuICBcIlBJRkZBUkRcIlxuICBcIlBJS0VcIlxuICBcIlBJTkUgQlVTSFwiXG4gIFwiUGluZSBCdXNoXCJcbiAgXCJQSU5FIENJVFlcIlxuICBcIlBJTkUgSElMTFwiXG4gIFwiUElORSBJU0xBTkRcIlxuICBcIlBJTkUgUExBSU5TXCJcbiAgXCJQSVNFQ09cIlxuICBcIlBJVENIRVJcIlxuICBcIlBJVFRTRk9SRFwiXG4gIFwiUExBSU5FREdFXCJcbiAgXCJQTEFJTlZJRVdcIlxuICBcIlBMQU5ET01FXCJcbiAgXCJQTEFUVEVLSUxMXCJcbiAgXCJQbGF0dHNidXJnYmhcIlxuICBcIlBsYXR0c2J1cmdoXCJcbiAgXCJQTEFUVFNCVVJHSFwiXG4gIFwiUExFQVNBTlQgVkFMTEVZXCJcbiAgXCJQTEVBU0FOVFZJTExFXCJcbiAgXCJQTFlNT1VUSFwiXG4gIFwiUE9FU1RFTktJTExcIlxuICBcIlBPSU5UIExPT0tPVVRcIlxuICBcIlBPTEFORFwiXG4gIFwiUE9NT01BXCJcbiAgXCJQT01PTkFcIlxuICBcIlBvbXBleVwiXG4gIFwiUE9SVCBCWVJPTlwiXG4gIFwiUE9SVCBDSEVTVEVSXCJcbiAgXCJQT1JUIENSQU5FXCJcbiAgXCJQT1JUIEVXRU5cIlxuICBcIlBPUlQgSEVOUllcIlxuICBcIlBPUlQgSkVSVklTXCJcbiAgXCJQT1JUIEtFTlRcIlxuICBcIlBPUlQgTEVZREVOXCJcbiAgXCJQT1JUIFdBU0hJTkdUT05cIlxuICBcIlBPUlRBR0VWSUxMRVwiXG4gIFwiUE9SVEVSIENPUk5FUlNcIlxuICBcIlBPUlRWSUxMRVwiXG4gIFwiUG90c2RhbVwiXG4gIFwiUG90c2RhbSBcIlxuICBcIlBPVFRFUlNWSUxMRVwiXG4gIFwiUE9VR0hLRUVQU0lFXCJcbiAgXCJQb3VnaGtlZXBzaWVcIlxuICBcIlBPVUdIS0VQU0lFXCJcbiAgXCJQT1VHSFFVQUdcIlxuICBcIlBPVU5EIFJJREdFXCJcbiAgXCJQT1VPR0hLRUVQU0lFXCJcbiAgXCJQUkFUVFNCVVJHSFwiXG4gIFwiUFJBVFRTVklMTEVcIlxuICBcIlByYXR0c3ZpbGxlXCJcbiAgXCJQcmVibGVcIlxuICBcIlBSRUJMRVwiXG4gIFwiUFJJTkNFVE9XTlwiXG4gIFwiUFJPU1BFQ1RcIlxuICBcIlBVTEFTS0lcIlxuICBcIlBVTEFTS0kgXCJcbiAgXCJQVUxURU5FWVwiXG4gIFwiUFVSQ0hBU0VcIlxuICBcIlBVUkRZU1wiXG4gIFwiUFVSTElOR1wiXG4gIFwiUFVUTkFNIFNUQVRJT05cIlxuICBcIlBVVE5BTSBWQUxMRVlcIlxuICBcIlFVRUVOU0JVUllcIlxuICBcIlF1ZWVuc2J1cnlcIlxuICBcIlJBTkRPTFBIXCJcbiAgXCJSQU5TT01WSUxMRVwiXG4gIFwiUkFRVUVUVEUgTEFLRVwiXG4gIFwiUkFWRU5BXCJcbiAgXCJSYXZlbmFcIlxuICBcIlJBWSBCUk9PS1wiXG4gIFwiUmF5bW9uZHZpbGxlXCJcbiAgXCJSRUQgQ1JFRUtcIlxuICBcIlJFRCBIT09LXCJcbiAgXCJSRUQgSE9VU0VcIlxuICBcIlJFREZJRUxEXCJcbiAgXCJSRURIT09LXCJcbiAgXCJSRURXT09EXCJcbiAgXCJSRU1TRU5cIlxuICBcIlJFTlNTRUFMQUVSXCJcbiAgXCJSRU5TU0VMQUVSXCJcbiAgXCJSZW5zc2VsYWVyXCJcbiAgXCJSRU5TU0VMQUVSVklMTEVcIlxuICBcIlJFTlNTRUxFQVJcIlxuICBcIlJFVFNPRlwiXG4gIFwiUkVYRk9SRFwiXG4gIFwiUkhJTkVCRUNLXCJcbiAgXCJSSElORUJFQ0ssIE5ZXCJcbiAgXCJSSElORUJFQ0ssIE5ZIFwiXG4gIFwiUkhJTkVDTElGRlwiXG4gIFwiUklDSEJVUkdcIlxuICBcIlJJQ0hGSUVMRCBTUFJJTkdTXCJcbiAgXCJSaWNoZmllbGQgU3ByaW5nc1wiXG4gIFwiUklDSEZPUkRcIlxuICBcIlJJQ0hMQU5EXCJcbiAgXCJSSUNITU9ORFZJTExFXCJcbiAgXCJSaWNobW9uZHZpbGxlXCJcbiAgXCJSSVBMRVlcIlxuICBcIlJPQ0hFU0VSXCJcbiAgXCJST0NIRVNURVJcIlxuICBcIlJvY2hlc3RlclwiXG4gIFwiUk9DSEVTVEVSIE5ZXCJcbiAgXCJSb2NrIEhpbGxcIlxuICBcIlJvY2sgSElsbFwiXG4gIFwiUk9DSyBTVFJFQU1cIlxuICBcIlJPQ0sgVEFWRVJOXCJcbiAgXCJST0NLVklMTEUgQ0VOVFJFXCJcbiAgXCJST01FXCJcbiAgXCJSb21lXCJcbiAgXCJST01FLCAgTllcIlxuICBcIlJPTUUsIE5ZXCJcbiAgXCJST01VTFVTXCJcbiAgXCJST09TRVZFTFRcIlxuICBcIlJPT1NFVkVMVCBcIlxuICBcIlJvc2NvZVwiXG4gIFwiUk9TQ09FXCJcbiAgXCJST1NFQk9PTVwiXG4gIFwiUk9TRURBTEUgKFdETVIpXCJcbiAgXCJST1NFTkRBTEVcIlxuICBcIlJPU0xZTlwiXG4gIFwiUk9TTFlOIEVTVEFURVNcIlxuICBcIlJPU0xZTiBIQVJCT1JcIlxuICBcIlJPU0xZTiBIRUlHSFRTXCJcbiAgXCJST1RURVJEQU1cIlxuICBcIlJPVFRFUkRBTSBKQ1RcIlxuICBcIlJPVFRFUkRBTSBKQ1QuXCJcbiAgXCJST1VORCBMQUtFXCJcbiAgXCJST1VORCBUT1BcIlxuICBcIlJvdXNlcyBQb2ludFwiXG4gIFwiUk9YQlVSWVwiXG4gIFwiUm94YnVyeVwiXG4gIFwiUlVCWVwiXG4gIFwiUlVTSFwiXG4gIFwiUlVTSFZJTExFXCJcbiAgXCJSdXNzZWxsXCJcbiAgXCJSWUVcIlxuICBcIlJZRSBCUk9PS1wiXG4gIFwiUyBGQVJNSU5HREFMRVwiXG4gIFwiUy4gREFZVE9OXCJcbiAgXCJTQUNLRVRTIEhBUkJPUlwiXG4gIFwiU0FMQU1BTkNBXCJcbiAgXCJTQUxFTVwiXG4gIFwiU2FsaXNidXJ5IENlbnRlclwiXG4gIFwiU0FMSVNCVVJZIE1JTExTXCJcbiAgXCJTQUxUIFBPSU5UXCJcbiAgXCJTQU5CT1JOXCJcbiAgXCJTQU5EUyBQT0lOVFwiXG4gIFwiU0FORFVTS1lcIlxuICBcIlNBTkRZIENSRUVLXCJcbiAgXCJTQU5HRVJGSUVMRFwiXG4gIFwiU2FyYW5hY1wiXG4gIFwiU0FSQU5BQyBMQUtFXCJcbiAgXCJTQVJBTkFDIExBS0UgXCJcbiAgXCJTQVJBTkMgTEFLRVwiXG4gIFwiU0FSQVRPR0FcIlxuICBcIlNBUkFUT0dBIFNQSVJOR1NcIlxuICBcIlNBUkFUT0dBIFNQUklOR1NcIlxuICBcIlNhcmF0b2dhIFNwcmluZ3NcIlxuICBcIlNBUkFUT0dBIFNSUElOR1NcIlxuICBcIlNBUlRPR0EgU1BSSU5HU1wiXG4gIFwiU0FVR0VSVElFU1wiXG4gIFwiU0FVUVVPSVRcIlxuICBcIlNBVk9OQVwiXG4gIFwiU0NBUkJPUk9VR0hcIlxuICBcIlNDQVJTREFMRVwiXG4gIFwiU0NIQUdIVElDT0tFXCJcbiAgXCJTQ0hFTkVDVEFEWVwiXG4gIFwiU0NIRU5FVlVTXCJcbiAgXCJTY2hlbmV2dXNcIlxuICBcIlNjaG9oYXJpZVwiXG4gIFwiU0NIT0hBUklFXCJcbiAgXCJTQ0hST09OIExBS0VcIlxuICBcIlNjaHJvb24gTGFrZVwiXG4gIFwiU0NIVVlMRVIgTEFLRVwiXG4gIFwiU0NIVVlMRVJWSUxMRVwiXG4gIFwiU2Npb1wiXG4gIFwiU0NPVElBXCJcbiAgXCJTQ09UVFNCVVJHXCJcbiAgXCJTQ09UVFNWSUxMRVwiXG4gIFwiU0VBIENMSUZGXCJcbiAgXCJTRUFGT1JEXCJcbiAgXCJTRUxLSVJLXCJcbiAgXCJTRU5FQ0EgRkFMTFNcIlxuICBcIlNlbmVjYSBGYWxsc1wiXG4gIFwiU0VORUNBIEZBTExTIFwiXG4gIFwiU0hBTkRBS0VOXCJcbiAgXCJTSEFST04gU1BSSU5HU1wiXG4gIFwiU2hhcm9uIFNwcmluZ3NcIlxuICBcIlNoZXJidXJuZVwiXG4gIFwiU0hFUkJVUk5FXCJcbiAgXCJTSEVSTUFOXCJcbiAgXCJTSEVSUklMTFwiXG4gIFwiU0hPS0FOXCJcbiAgXCJTSE9SVFNWSUxMRVwiXG4gIFwiU0hSVUIgT0FLXCJcbiAgXCJTSURORVlcIlxuICBcIlNpZG5leVwiXG4gIFwiU0lETkVZIENFTlRFUlwiXG4gIFwiU0lMVkVSIEJBWVwiXG4gIFwiU0lMVkVSIENSRUVLXCJcbiAgXCJTaWx2ZXIgQ3JlZWtcIlxuICBcIlNJTFZFUiBDUkVFSyBcIlxuICBcIlNJTFZFUiBMQUtFXCJcbiAgXCJTSUxWRVIgU1BSSU5HU1wiXG4gIFwiU0lOQ0xBSVJWSUxMRVwiXG4gIFwiU2thbmVhdGVsZXNcIlxuICBcIlNLQU5FQVRFTEVTXCJcbiAgXCJTa2FuZWF0ZWxlcyBGYWxsc1wiXG4gIFwiU0xBVEUgSElMTFwiXG4gIFwiU0xBVEVSVklMTEUgU1BSSU5HU1wiXG4gIFwiU0xFRVBZIEhPTExPV1wiXG4gIFwiU0xJTkdFUkxBTkRTXCJcbiAgXCJTbExWRVIgQ1JFRUtcIlxuICBcIlNMT0FUU0JVUkdcIlxuICBcIlNsb2F0c2J1cmdcIlxuICBcIlNNSVRIQk9ST1wiXG4gIFwiU01JVEhWSUxMRSBGTEFUU1wiXG4gIFwiU08gR0xFTlMgRkFMTFNcIlxuICBcIlNvLiBGYWxsc2J1cmdcIlxuICBcIlNPRFVTXCJcbiAgXCJTT0RVUyBQT0lOVFwiXG4gIFwiU09EVVMgUE9JTlQgXCJcbiAgXCJTb2x2YXlcIlxuICBcIlNPTUVSU1wiXG4gIFwiU29ueWVhXCJcbiAgXCJTT05ZRUFcIlxuICBcIlNPVVRIIENBSVJPXCJcbiAgXCJTb3V0aCBDb2x0b25cIlxuICBcIlNPVVRIIERBWVRPTlwiXG4gIFwiU291dGggRmFsbHNidXJnXCJcbiAgXCJTT1VUSCBGQUxMU0JVUkdcIlxuICBcIlNvdXRoIEZhbGxzYnVyZyBcIlxuICBcIlNPVVRIIEZBUk1JTkdEQUxFXCJcbiAgXCJTT1VUSCBHTEVOUyBGQUxMU1wiXG4gIFwiU09VVEggSEVNUFNURUFEXCJcbiAgXCJTb3V0aCBLb3J0cmlnaHRcIlxuICBcIlNPVVRIIE9UU0VMSUNcIlxuICBcIlNPVVRIIFNBTEVNXCJcbiAgXCJTUEFSS0lMTFwiXG4gIFwiU1BFQ1VMQVRPUlwiXG4gIFwiU1BFTkNFUlwiXG4gIFwiU3BlbmNlclwiXG4gIFwiU1BFTkNFUlBPUlRcIlxuICBcIlNQUkFLRVJTXCJcbiAgXCJTUFJJTkcgVkFMTEVZXCJcbiAgXCJTUFJJTkdXQVRFUlwiXG4gIFwic3Nzc3NcIlxuICBcIlNUIEhVQkVSVFNcIlxuICBcIlNUIFJFR0lTIEZBTExTXCJcbiAgXCJTVC4gQk9OQVZFTlRVUkVcIlxuICBcIlNULiBKT0hOU1ZJTExFXCJcbiAgXCJTVC4gUkVHSVMgRkFMTFNcIlxuICBcIlNUQUFUU0JVUkdcIlxuICBcIlN0YWZmb3JkXCJcbiAgXCJTVEFGRk9SRFwiXG4gIFwiU1RBTUZPUkRcIlxuICBcIlN0YW1mb3JkXCJcbiAgXCJTVEFORk9SRFZJTExFXCJcbiAgXCJTVEFOTEVZXCJcbiAgXCJTdGFyIExha2VcIlxuICBcIlNURUFNQlVSR1wiXG4gIFwiU1RFTExBIE5JQUdBUkFcIlxuICBcIlNURVBIRU5UT1dOXCJcbiAgXCJTVEVSTElOR1wiXG4gIFwiU1RFUkxJTkcgRk9SRVNUXCJcbiAgXCJTVEVXQVJUIE1BTk9SXCJcbiAgXCJTVElMTFdBVEVSXCJcbiAgXCJTVElUVFZJTExFXCJcbiAgXCJTVE9ORSBSSURHRVwiXG4gIFwiU1RPTlkgQ1JFRUtcIlxuICBcIlNUT05ZIFBPSU5UXCJcbiAgXCJTVE9STVZJTExFXCJcbiAgXCJTVE9XXCJcbiAgXCJTVFJZS0VSU1ZJTExFXCJcbiAgXCJTVUZGRVJOXCJcbiAgXCJTVUdBUiBMT0FGXCJcbiAgXCJTVU1NSVRcIlxuICBcIlN1bW1pdHZpbGxlXCJcbiAgXCJTd2FpblwiXG4gIFwiU3dhbiBMYWtlXCJcbiAgXCJTWUxWQU4gQkVBQ0hcIlxuICBcIlNZT1NTRVRcIlxuICBcIlN5cmFjdXNlXCJcbiAgXCJTWVJBQ1VTRVwiXG4gIFwic3lyYWN1c2VcIlxuICBcIlRBQkVSR1wiXG4gIFwiVEFMTE1BTlwiXG4gIFwiVEFOTkVSU1ZJTExFXCJcbiAgXCJUQVBQQU5cIlxuICBcIlRBUlJZVE9XTlwiXG4gIFwiVEFSUllUT1dOIFwiXG4gIFwiVEhFTkRBUkFcIlxuICBcIlRIRVJFU0FcIlxuICBcIlRISUVMTFNcIlxuICBcIlRob21wc29udmlsbGVcIlxuICBcIlRIT1JOV09PRFwiXG4gIFwiVEhST1VHSE9VVFwiXG4gIFwiVEhST1VHSE9VVCBUT01QS0lOU1wiXG4gIFwiVElDT05ERVJPR0FcIlxuICBcIlRJTExTT05cIlxuICBcIlRJT0dBIENFTlRFUlwiXG4gIFwiVElWT0xJXCJcbiAgXCJUT01LSU5TIENPVkVcIlxuICBcIlRPTVBLSU5TXCJcbiAgXCJUT01QS0lOUyBDT1VOVFlcIlxuICBcIlRST1VQU0JVUkdcIlxuICBcIlRST1VUIENSRUVLXCJcbiAgXCJUUk9ZXCJcbiAgXCJUcm95XCJcbiAgXCJUUlVNQU5TQlVSR1wiXG4gIFwiVFJVWFRPTlwiXG4gIFwiVFVDS0FIT0VcIlxuICBcIlR1bGx5XCJcbiAgXCJUVUxMWVwiXG4gIFwiVFVQUEVSIExBS0VcIlxuICBcIlR1cHBlciBMYWtlXCJcbiAgXCJUVVJJTlwiXG4gIFwiVFVYRURPXCJcbiAgXCJUVVhFRE8gUEFSS1wiXG4gIFwiVFlST05FXCJcbiAgXCJVTFNURVIgUEFSS1wiXG4gIFwiVU5BRElMTEFcIlxuICBcIlVuYWRpbGxhXCJcbiAgXCJVTklPTiBTUFJJTkdTXCJcbiAgXCJVTklPTkRBTEVcIlxuICBcIlVOSU9OVklMTEVcIlxuICBcIlVQUEVSIEpBWVwiXG4gIFwiVVBQRVIgTllBQ0tcIlxuICBcIlVUSUNBXCJcbiAgXCJVdGljYVwiXG4gIFwiVVRJQ0EgXCJcbiAgXCJWQUlMUyBHQVRFXCJcbiAgXCJWQUxBVElFXCJcbiAgXCJWQUxIQUxMQVwiXG4gIFwiVkFMTEVZIENPVFRBR0VcIlxuICBcIlZhbGxleSBDb3R0YWdlXCJcbiAgXCJWYWxsZXkgQ290dGFnZSBcIlxuICBcIlZBTExFWSBTVFJFQU1cIlxuICBcIlZBTiBFVFRFTlwiXG4gIFwiVkFOIEhPUk5FU1ZJTExFXCJcbiAgXCJWQVJZU0JVUkdcIlxuICBcIlZFUkJBTktcIlxuICBcIlZlcmJhbmtcIlxuICBcIlZFUk1PTlRWSUxMRVwiXG4gIFwiVkVSTk9OXCJcbiAgXCJWRVJPTkFcIlxuICBcIlZFUk9OQSBCRUFDSFwiXG4gIFwiVkVSUExBTkNLXCJcbiAgXCJWRVNUQUxcIlxuICBcIlZlc3RhbFwiXG4gIFwiVklDVE9SXCJcbiAgXCJWSUNUT1IgXCJcbiAgXCJWSUNUT1JZXCJcbiAgXCJWSVNUQVwiXG4gIFwiVk9PUkhFRVNWSUxMRVwiXG4gIFwiVy4gSEVOUklFVFRBXCJcbiAgXCJXQUNDQUJVQ1wiXG4gIFwiV2FkZGluZ3RvblwiXG4gIFwiV2FkZGluZ3RvbiBcIlxuICBcIldBREhBTVNcIlxuICBcIldBRFNXT1JUSCBcIlxuICBcIldBTERFTlwiXG4gIFwiV0FMTEtJTExcIlxuICBcIldhbGxraWxsXCJcbiAgXCJXQUxUT05cIlxuICBcIldhbHRvblwiXG4gIFwiV0FMV09SVEhcIlxuICBcIldBTVBTVklMTEVcIlxuICBcIldhbmFrZW5hXCJcbiAgXCJXQU5UQUdIXCJcbiAgXCJXQU5UQUdIIFwiXG4gIFwiV0FQUElOR0VSXCJcbiAgXCJXQVBQSU5HRVIgRkFMTFNcIlxuICBcIldBUFBJTkdFUlNcIlxuICBcIldBUFBJTkdFUlMgRkFMTFNcIlxuICBcIldBUFBJTkdFUlMgRkFMTFNBIFwiXG4gIFwiV0FQUElOSUdFUlMgRkFMTFNcIlxuICBcIldBUFBQSU5HRVJTIEZBTExTXCJcbiAgXCJXYXJuZXJzXCJcbiAgXCJXYXJuZXJ2aWxsZVwiXG4gIFwiV0FSUkVOU0JVUkdcIlxuICBcIldBUlNBV1wiXG4gIFwiV0FSV0lDS1wiXG4gIFwiV0FTSElOR1RPTiBNSUxMXCJcbiAgXCJXQVNISU5HVE9OIE1JTExTXCJcbiAgXCJXQVNISU5HVE9OIE1JTExTLCBOWVwiXG4gIFwiV0FTSElOR1RPTlZJTExFXCJcbiAgXCJXQVNISU5HVE9OVklMTEUgXCJcbiAgXCJXQVNTQUlDXCJcbiAgXCJXQVRFUkZPUkRcIlxuICBcIldBVEVSTE9PXCJcbiAgXCJXQVRFUkxPTyAgICAgXCJcbiAgXCJXQVRFUkxPTyxcIlxuICBcIldBVEVSUE9SVFwiXG4gIFwiV0FURVJUT1dOXCJcbiAgXCJXYXRlcnRvd25cIlxuICBcIldBVEVSVklMTEVcIlxuICBcIldBVEVSVkxJRVRcIlxuICBcIldBVEtJTlMgR0xFTlwiXG4gIFwiV0FUUkxPT1wiXG4gIFwiV0FWRVJMWVwiXG4gIFwiV0FXQVJTSU5HXCJcbiAgXCJXQVlMQU5EXCJcbiAgXCJXRUJTVEVSXCJcbiAgXCJXRUVEU1BPUlRcIlxuICBcIldFTExFU0xFWSBJU0wuXCJcbiAgXCJXRUxMRVNMRVkgSVNMQU5EXCJcbiAgXCJXRUxMU1wiXG4gIFwiV0VMTFNCVVJHXCJcbiAgXCJXZWxsc3ZpbGxlXCJcbiAgXCJXRUxMU1ZJTExFXCJcbiAgXCJXRVNMRVkgSElMTFNcIlxuICBcIldFU1QgIEhFTVBTVEVBRFwiXG4gIFwiV0VTVCAgSEVOUklFVFRBXCJcbiAgXCJXRVNUIENBUlRIQUdFXCJcbiAgXCJXZXN0IENoYXp5XCJcbiAgXCJXZXN0IENsYXJrc3ZpbGxlXCJcbiAgXCJXRVNUIENPWFNBQ0tJRVwiXG4gIFwiV2VzdCBDb3hzYWNraWVcIlxuICBcIldFU1QgRUFUT05cIlxuICBcIldFU1QgRURNRVNUT05cIlxuICBcIldFU1QgSEFSUklTT05cIlxuICBcIldFU1QgSEFWRVJTVFJBV1wiXG4gIFwiV0VTVCBIRU1QU1RFQURcIlxuICBcIldFU1QgSEVOUklFVFRBXCJcbiAgXCJXRVNUIEhVUkxFWVwiXG4gIFwiV0VTVCBMRUJBTk9OXCJcbiAgXCJXRVNUIExFWURFTlwiXG4gIFwiV0VTVCBNT05ST0VcIlxuICBcIldFU1QgTllBQ0tcIlxuICBcIldFU1QgT05FT05UQVwiXG4gIFwiV0VTVCBQQVJLXCJcbiAgXCJXRVNUIFNBTkQgTEFLRVwiXG4gIFwiV0VTVCBTSE9LQU5cIlxuICBcIldFU1QgVkFMTEVZXCJcbiAgXCJXRVNUIFdJTkZJRUxEXCJcbiAgXCJXRVNUQlJPT0tWSUxMRVwiXG4gIFwiV0VTVEJVUllcIlxuICBcIldFU1RFUk5WSUxMRVwiXG4gIFwiV0VTVEZJRUxEXCJcbiAgXCJXRVNURklFTEQgXCJcbiAgXCJXRVNUS0lMTFwiXG4gIFwiV0VTVE1PUkVMQU5EXCJcbiAgXCJXRVNUT05TIE1JTExTXCJcbiAgXCJXRVNUUE9SVFwiXG4gIFwiV0VTVFRPV05cIlxuICBcIldoaXRlIExha2VcIlxuICBcIldoaXRlIExha2UgXCJcbiAgXCJXSElURSBQTEFJTlNcIlxuICBcIldoaXRlIFN1bHBodXIgU3ByaW5nc1wiXG4gIFwiV0hJVEVIQUxMXCJcbiAgXCJXSElURVNCT1JPXCJcbiAgXCJXaGl0ZXN2aWxsZVwiXG4gIFwiV0hJVE5FWSBQT0lOVFwiXG4gIFwiV0lMTEFSRFwiXG4gIFwiV0lMTElBTVNPTlwiXG4gIFwiV0lMTElBTVNPTiBcIlxuICBcIldJTExJQU1TVE9XTlwiXG4gIFwiV0lMTElTVE9OIFBBUktcIlxuICBcIldJTExJU1RPTiBQS1wiXG4gIFwiV0lMTFNCT1JPXCJcbiAgXCJXSUxMU0VZVklMTEVcIlxuICBcIldJTE1JTkdUT05cIlxuICBcIldJTE1JTkdUT04gXCJcbiAgXCJXSUxTT05cIlxuICBcIldJTFRPTlwiXG4gIFwiV0lOREhBTVwiXG4gIFwiV2luZGhhbVwiXG4gIFwiV0lORFNPUlwiXG4gIFwiV2luZHNvclwiXG4gIFwiV0lOR0RBTEVcIlxuICBcIldJTkdEQUxFLCBOWVwiXG4gIFwiV2ludGhyb3BcIlxuICBcIldPTENPVFRcIlxuICBcIldvb2Rib3VybmVcIlxuICBcIldvb2Rib3VybmUgXCJcbiAgXCJXT09EQlVSWVwiXG4gIFwiV09PREdBVEVcIlxuICBcIldPT0RIVUxMXCJcbiAgXCJXT09ETUVSRVwiXG4gIFwiV29vZHJpZGdlXCJcbiAgXCJXT09EUklER0VcIlxuICBcIldPT0RTVE9DS1wiXG4gIFwiV09PRFZJTExFXCJcbiAgXCJXT1JDRVNURVJcIlxuICBcIld1cnRzYm9yb1wiXG4gIFwiV3luYW50c2tpbGxcIlxuICBcIldZTkFOVFNLSUxMXCJcbiAgXCJXWU9NSU5HXCJcbiAgXCJYWFhYWFwiXG4gIFwiWU9OS0VSU1wiXG4gIFwiWU9SS1NISVJFXCJcbiAgXCJZT1JLVE9XTlwiXG4gIFwiWU9SS1RPV04gSEVJR0hUU1wiXG4gIFwiWU9SS1ZJTExFXCJcbiAgXCJZT1VOR1NUT1dOXCJcbiAgXCJZb3VuZ3N2aWxsZVwiXG4gIFwiWU9VTlNUT1dOXCJcbiAgXCJZdWxhblwiXG5dXG4iLCJtb2R1bGUuZXhwb3J0cyA9IFtcbiAgJ0FMQkFOWSdcbiAgJ0FMTEVHQU5ZJ1xuICAnQlJPT01FJ1xuICAnQ0FUVEFSQVVHVVMnXG4gICdDQVlVR0EnXG4gICdDSEFVVEFVUVVBJ1xuICAnQ0hFTVVORydcbiAgJ0NIRU5BTkdPJ1xuICAnQ0xJTlRPTidcbiAgJ0NPTFVNQklBJ1xuICAnQ09SVExBTkQnXG4gICdERUxBV0FSRSdcbiAgJ0RVVENIRVNTJ1xuICAnRVNTRVgnXG4gICdGUkFOS0xJTidcbiAgJ0ZVTFRPTidcbiAgJ0dFTkVTRUUnXG4gICdHUkVFTkUnXG4gICdIQU1JTFRPTidcbiAgJ0hFUktJTUVSJ1xuICAnSkVGRkVSU09OJ1xuICAnTEVXSVMnXG4gICdMSVZJTkdTVE9OJ1xuICAnTUFESVNPTidcbiAgJ01PTlJPRSdcbiAgJ01PTlRHT01FUlknXG4gICdOQVNTQVUnXG4gICdOSUFHQVJBJ1xuICAnT05FSURBJ1xuICAnT05PTkRBR0EnXG4gICdPTlRBUklPJ1xuICAnT1JBTkdFJ1xuICAnT1JMRUFOUydcbiAgJ09TV0VHTydcbiAgJ09UU0VHTydcbiAgJ1BVVE5BTSdcbiAgJ1JFTlNTRUxBRVInXG4gICdST0NLTEFORCdcbiAgJ1NBUkFUT0dBJ1xuICAnU0NIRU5FQ1RBRFknXG4gICdTQ0hPSEFSSUUnXG4gICdTQ0hVWUxFUidcbiAgJ1NFTkVDQSdcbiAgJ1NUIExBV1JFTkNFJ1xuICAnU1RFVUJFTidcbiAgJ1NVTExJVkFOJ1xuICAnVElPR0EnXG4gICdUT01QS0lOUydcbiAgJ1VMU1RFUidcbiAgJ1dBUlJFTidcbiAgJ1dBU0hJTkdUT04nXG4gICdXQVlORSdcbiAgJ1dFU1RDSEVTVEVSJ1xuICAnV1lPTUlORydcbiAgJ1lBVEVTJ1xuXVxuIiwibW9kdWxlLmV4cG9ydHMgPSBbXG4gICcwJ1xuICAnMTA0NTUnXG4gICcxMDQ1NTIxMDYnXG4gICcxMDQ3MydcbiAgJzEwNDc0J1xuICAnMTA1MDEnXG4gICcxMDUwMidcbiAgJzEwNTAzJ1xuICAnMTA1MDQnXG4gICcxMDUwNSdcbiAgJzEwNTA2J1xuICAnMTA1MDcnXG4gICcxMDUwOSdcbiAgJzEwNTEwJ1xuICAnMTA1MTA5MjQ1J1xuICAnMTA1MTEnXG4gICcxMDUxMidcbiAgJzEwNTE0J1xuICAnMTA1MTYnXG4gICcxMDUxNydcbiAgJzEwNTE4J1xuICAnMTA1MTknXG4gICcxMDUyMCdcbiAgJzEwNTIwMzA1NSdcbiAgJzEwNTIyJ1xuICAnMTA1MjMnXG4gICcxMDUyNCdcbiAgJzEwNTI3J1xuICAnMTA1MjgnXG4gICcxMDUzMCdcbiAgJzEwNTMyJ1xuICAnMTA1MzIxMjE3J1xuICAnMTA1MzMnXG4gICcxMDUzNSdcbiAgJzEwNTM2J1xuICAnMTA1MzgnXG4gICcxMDU0MCdcbiAgJzEwNTQxJ1xuICAnMTA1NDMnXG4gICcxMDU0NidcbiAgJzEwNTQ3J1xuICAnMTA1NDgnXG4gICcxMDU0OSdcbiAgJzEwNTUwJ1xuICAnMTA1NTEnXG4gICcxMDU1MidcbiAgJzEwNTUzJ1xuICAnMTA1NjAnXG4gICcxMDU2MidcbiAgJzEwNTY2J1xuICAnMTA1NjcnXG4gICcxMDU3MCdcbiAgJzEwNTczJ1xuICAnMTA1NzMzNDE0J1xuICAnMTA1NzYnXG4gICcxMDU3NydcbiAgJzEwNTc4J1xuICAnMTA1NzknXG4gICcxMDU4MCdcbiAgJzEwNTgzJ1xuICAnMTA1ODgnXG4gICcxMDU4OSdcbiAgJzEwNTkwJ1xuICAnMTA1OTEnXG4gICcxMDU5NCdcbiAgJzEwNTk1J1xuICAnMTA1OTYnXG4gICcxMDU5NydcbiAgJzEwNTk4J1xuICAnMTA2MDEnXG4gICcxMDYwMydcbiAgJzEwNjA0J1xuICAnMTA2MDUnXG4gICcxMDYwNidcbiAgJzEwNjA3J1xuICAnMTA3MDEnXG4gICcxMDcwMTU1NjknXG4gICcxMDcwMidcbiAgJzEwNzAzJ1xuICAnMTA3MDQnXG4gICcxMDcwNSdcbiAgJzEwNzA2J1xuICAnMTA3MDcnXG4gICcxMDcwOCdcbiAgJzEwNzA5J1xuICAnMTA3MTAnXG4gICcxMDgwMSdcbiAgJzEwODAxMzQxNidcbiAgJzEwODAyJ1xuICAnMTA4MDMnXG4gICcxMDgwMzI3MTAnXG4gICcxMDgwNCdcbiAgJzEwODA1J1xuICAnMTA5MDEnXG4gICcxMDkxMCdcbiAgJzEwOTExJ1xuICAnMTA5MTInXG4gICcxMDkxMydcbiAgJzEwOTE0J1xuICAnMTA5MTUnXG4gICcxMDkxNidcbiAgJzEwOTE3J1xuICAnMTA5MTgnXG4gICcxMDkxOSdcbiAgJzEwOTIwJ1xuICAnMTA5MjEnXG4gICcxMDkyMTA3NTcnXG4gICcxMDkyMidcbiAgJzEwOTIzJ1xuICAnMTA5MjQnXG4gICcxMDkyNSdcbiAgJzEwOTI2J1xuICAnMTA5MjcnXG4gICcxMDkyOCdcbiAgJzEwOTMwJ1xuICAnMTA5MzEnXG4gICcxMDk0MCdcbiAgJzEwOTQxJ1xuICAnMTA5NDknXG4gICcxMDk1MCdcbiAgJzEwOTUyJ1xuICAnMTA5NTMnXG4gICcxMDk1NCdcbiAgJzEwOTU2J1xuICAnMTA5NTgnXG4gICcxMDk2MCdcbiAgJzEwOTYyJ1xuICAnMTA5NjMnXG4gICcxMDk2NCdcbiAgJzEwOTY1J1xuICAnMTA5NjgnXG4gICcxMDk2OSdcbiAgJzEwOTcwJ1xuICAnMTA5NzMnXG4gICcxMDk3NCdcbiAgJzEwOTc2J1xuICAnMTA5NzcnXG4gICcxMDk3OSdcbiAgJzEwOTgwJ1xuICAnMTA5ODEnXG4gICcxMDk4MidcbiAgJzEwOTgzJ1xuICAnMTA5ODQnXG4gICcxMDk4NidcbiAgJzEwOTg3J1xuICAnMTA5ODgnXG4gICcxMDk4OSdcbiAgJzEwOTkwJ1xuICAnMTA5OTInXG4gICcxMDk5MydcbiAgJzEwOTk0J1xuICAnMTA5OTgnXG4gICcxMTAwMSdcbiAgJzExMDAxMjcwNSdcbiAgJzExMDAyJ1xuICAnMTEwMDMnXG4gICcxMTAwMzI2MjknXG4gICcxMTAxMCdcbiAgJzExMDEwMTIzMCdcbiAgJzExMDEwMjUzMCdcbiAgJzExMDEwMjg0OSdcbiAgJzExMDEwMzYyNydcbiAgJzExMDEwMzYyOCdcbiAgJzExMDIwJ1xuICAnMTEwMjEnXG4gICcxMTAyMTEyNDMnXG4gICcxMTAyMTEyNDYnXG4gICcxMTAyMTMyNTQnXG4gICcxMTAyMTQzMDMnXG4gICcxMTAyMidcbiAgJzExMDIzJ1xuICAnMTEwMjQnXG4gICcxMTAzMCdcbiAgJzExMDMwMTk0NidcbiAgJzExMDMwMzAxNydcbiAgJzExMDQwJ1xuICAnMTEwNDAxNjY0J1xuICAnMTEwNDAyNjAzJ1xuICAnMTEwNDAyNjA0J1xuICAnMTEwNDA0NzI2J1xuICAnMTEwNDA1MjM2J1xuICAnMTEwNDInXG4gICcxMTA0MjEwMTInXG4gICcxMTA0MjEwMzQnXG4gICcxMTA1MCdcbiAgJzExMDUwMjIyMidcbiAgJzExMDUwMjcwMydcbiAgJzExMDUwMjkxMCdcbiAgJzExMDUwNDIxMSdcbiAgJzExMDgxJ1xuICAnMTEwOTYnXG4gICcxMTA5NjEyMTcnXG4gICcxMTA5NjEzNDgnXG4gICcxMTA5NjE4MDknXG4gICcxMTExMSdcbiAgJzExMTUwJ1xuICAnMTExNTgnXG4gICcxMTIwMSdcbiAgJzExMzUwJ1xuICAnMTEzNTUnXG4gICcxMTM2NSdcbiAgJzExMzcyJ1xuICAnMTE0MjInXG4gICcxMTUwMSdcbiAgJzExNTAxMTcwMidcbiAgJzExNTAxNDAyMSdcbiAgJzExNTA3J1xuICAnMTE1MDcxNTk5J1xuICAnMTE1MDcxOTE3J1xuICAnMTE1MDknXG4gICcxMTUxMCdcbiAgJzExNTEwMjQyOSdcbiAgJzExNTEwMjQ1MydcbiAgJzExNTEwMzExMSdcbiAgJzExNTEwMzIzMCdcbiAgJzExNTEwNDI0MSdcbiAgJzExNTEwNDQyNydcbiAgJzExNTE0J1xuICAnMTE1MTQxOTA3J1xuICAnMTE1MTYnXG4gICcxMTUxNydcbiAgJzExNTE4J1xuICAnMTE1MTgxNDE0J1xuICAnMTE1MjAnXG4gICcxMTUyMDM3MTAnXG4gICcxMTUyMDM4MjUnXG4gICcxMTUyMDQyNDInXG4gICcxMTUyMDQ3MDInXG4gICcxMTUyMDUxMDMnXG4gICcxMTUyMDYxMjknXG4gICcxMTUyMDYxMzEnXG4gICcxMTUzMCdcbiAgJzExNTMwMDcwMSdcbiAgJzExNTMwMjkwOSdcbiAgJzExNTMwMzQ2NydcbiAgJzExNTMwMzgyNydcbiAgJzExNTMwNDcwOCdcbiAgJzExNTMwNDc2MCdcbiAgJzExNTMwNDgwMSdcbiAgJzExNTMwNTMxNSdcbiAgJzExNTMwNTcyOSdcbiAgJzExNTMwNjU1MydcbiAgJzExNTQyJ1xuICAnMTE1NDIyNTQwJ1xuICAnMTE1NDIyNzAzJ1xuICAnMTE1NDIyNzA0J1xuICAnMTE1NDIzNzAwJ1xuICAnMTE1NDIzNzM1J1xuICAnMTE1NDUnXG4gICcxMTU0NTE2MDInXG4gICcxMTU0NTE5MDYnXG4gICcxMTU0NydcbiAgJzExNTQ4J1xuICAnMTE1NDgxMDMzJ1xuICAnMTE1NDgxMDk4J1xuICAnMTE1NTAnXG4gICcxMTU1MDE0MTcnXG4gICcxMTU1MDE0MzgnXG4gICcxMTU1MDE3NTEnXG4gICcxMTU1MDM4MTEnXG4gICcxMTU1MDM5MDQnXG4gICcxMTU1MDM5MDgnXG4gICcxMTU1MDQwMTknXG4gICcxMTU1MDQzNjQnXG4gICcxMTU1MDQ1NDQnXG4gICcxMTU1MDU2MTMnXG4gICcxMTU1MidcbiAgJzExNTUyMTMzMCdcbiAgJzExNTUyMTU0MSdcbiAgJzExNTUyMjEyNydcbiAgJzExNTUyMjE0NidcbiAgJzExNTUyMzQyNSdcbiAgJzExNTUzJ1xuICAnMTE1NTMxMDEwJ1xuICAnMTE1NTMxNjM3J1xuICAnMTE1NTMxOTE5J1xuICAnMTE1NTMyNTA3J1xuICAnMTE1NTMyNTA5J1xuICAnMTE1NTMyNjM0J1xuICAnMTE1NTQnXG4gICcxMTU1NDIwMjcnXG4gICcxMTU1NDIwMjknXG4gICcxMTU1NDIzNTAnXG4gICcxMTU1NDI5MzcnXG4gICcxMTU1NDQxMTUnXG4gICcxMTU1NDQxMjEnXG4gICcxMTU1NidcbiAgJzExNTU3J1xuICAnMTE1NTcxNTU1J1xuICAnMTE1NTcyMDE2J1xuICAnMTE1NTgnXG4gICcxMTU1ODE0MzknXG4gICcxMTU1ODE2MjcnXG4gICcxMTU1ODIyMTUnXG4gICcxMTU1OSdcbiAgJzExNTU5OCdcbiAgJzExNTYwJ1xuICAnMTE1NjAyMTI0J1xuICAnMTE1NjEnXG4gICcxMTU2MTEyMjMnXG4gICcxMTU2MTEyMjQnXG4gICcxMTU2MTEzMDInXG4gICcxMTU2MTE0MjgnXG4gICcxMTU2MTIwMTgnXG4gICcxMTU2MTM1MDEnXG4gICcxMTU2MTM1MTAnXG4gICcxMTU2MydcbiAgJzExNTYzMTc1NSdcbiAgJzExNTYzMzAyNCdcbiAgJzExNTYzMzIzNCdcbiAgJzExNTYzMzI0MidcbiAgJzExNTYzMzU3MCdcbiAgJzExNTY1J1xuICAnMTE1NjUyMDQzJ1xuICAnMTE1NjYnXG4gICcxMTU2NjEwMzQnXG4gICcxMTU2NjEzNDInXG4gICcxMTU2NjE4MzUnXG4gICcxMTU2NjI3MjgnXG4gICcxMTU2NjMxMTEnXG4gICcxMTU2NjM0MDcnXG4gICcxMTU2NjM0MTUnXG4gICcxMTU2NjM0MzEnXG4gICcxMTU2NjM3NDQnXG4gICcxMTU2NjQ1MzAnXG4gICcxMTU2NjQ1MzgnXG4gICcxMTU2OCdcbiAgJzExNTY4MDI0OSdcbiAgJzExNTY5J1xuICAnMTE1NjkyMDIxJ1xuICAnMTE1NzAnXG4gICcxMTU3MDQ4MDEnXG4gICcxMTU3MidcbiAgJzExNTcyMTQwOSdcbiAgJzExNTcyMjEzMCdcbiAgJzExNTc1J1xuICAnMTE1NzUxNzU3J1xuICAnMTE1NzUyMTA2J1xuICAnMTE1NzYnXG4gICcxMTU3NjM4NCdcbiAgJzExNTc3J1xuICAnMTE1NzcyMzI5J1xuICAnMTE1NzknXG4gICcxMTU4MCdcbiAgJzExNTgwMTE1NSdcbiAgJzExNTgwMTkzOCdcbiAgJzExNTgwNTEyNSdcbiAgJzExNTgwNTgxMCdcbiAgJzExNTgwNTkyNSdcbiAgJzExNTgwNTk1MidcbiAgJzExNTgwNjExNSdcbiAgJzExNTgxJ1xuICAnMTE1ODExMjI4J1xuICAnMTE1ODExOTA3J1xuICAnMTE1ODEyNTIzJ1xuICAnMTE1ODEzMzUwJ1xuICAnMTE1ODInXG4gICcxMTU5MCdcbiAgJzExNTkwMzMzMSdcbiAgJzExNTkwMzkyNCdcbiAgJzExNTkwNDQwOCdcbiAgJzExNTkwNDUwNidcbiAgJzExNTkwNTI1NidcbiAgJzExNTk2J1xuICAnMTE1OTYyMjA0J1xuICAnMTE1OTgnXG4gICcxMTU5ODE2NDUnXG4gICcxMTU5OSdcbiAgJzExNzAxJ1xuICAnMTE3MDknXG4gICcxMTcwOTE2MTYnXG4gICcxMTcxMCdcbiAgJzExNzEwMTYwMidcbiAgJzExNzEwMTgxNidcbiAgJzExNzEwMTgzMydcbiAgJzExNzEwMzUzMSdcbiAgJzExNzE0J1xuICAnMTE3MTQyNzAyJ1xuICAnMTE3MTQzMDA4J1xuICAnMTE3MTQ1Nzk4J1xuICAnMTE3MjQwMTAwJ1xuICAnMTE3MzEnXG4gICcxMTczMidcbiAgJzExNzMyMTAwMydcbiAgJzExNzM1J1xuICAnMTE3MzUyNjE4J1xuICAnMTE3MzUyNjE5J1xuICAnMTE3MzU0NDUwJ1xuICAnMTE3NDcnXG4gICcxMTc1MydcbiAgJzExNzUzMTMzOCdcbiAgJzExNzU2J1xuICAnMTE3NTY1MzI1J1xuICAnMTE3NTcnXG4gICcxMTc1OCdcbiAgJzExNzU4MTIxMidcbiAgJzExNzU4NTM0NidcbiAgJzExNzU4NjAxOSdcbiAgJzExNzU4NjIxNSdcbiAgJzExNzU4NjYyNCdcbiAgJzExNzYxJ1xuICAnMTE3NjInXG4gICcxMTc2MjI3MTEnXG4gICcxMTc2MjI3MTInXG4gICcxMTc2MjI5MDcnXG4gICcxMTc2MjM4MDQnXG4gICcxMTc2NSdcbiAgJzExNzcxJ1xuICAnMTE3NzExNTU1J1xuICAnMTE3ODMnXG4gICcxMTc4MzI4MDEnXG4gICcxMTc4MzM0MjcnXG4gICcxMTc4NydcbiAgJzExNzkxJ1xuICAnMTE3OTEzMTE2J1xuICAnMTE3OTEzNjA4J1xuICAnMTE3OTE0NTA3J1xuICAnMTE3OTE0NTE5J1xuICAnMTE3OTE0NTQwJ1xuICAnMTE3OTMnXG4gICcxMTc5MzIyMTMnXG4gICcxMTc5MzM3MTcnXG4gICcxMTc5MzM5NDknXG4gICcxMTc5NydcbiAgJzExNzk3MTIxMCdcbiAgJzExODAxJ1xuICAnMTE4MDEzMDA2J1xuICAnMTE4MDEzMDM3J1xuICAnMTE4MDEzMDUxJ1xuICAnMTE4MDEzMTAzJ1xuICAnMTE4MDEzNTI4J1xuICAnMTE4MDE0MDExJ1xuICAnMTE4MDE0MjM2J1xuICAnMTE4MDE0MjY3J1xuICAnMTE4MDMnXG4gICcxMTgwMzEwMDYnXG4gICcxMTgwMzE1MDcnXG4gICcxMTgwMzMzMjInXG4gICcxMTgwMzQ5NTMnXG4gICcxMTgwNCdcbiAgJzExODA0MTI0MCdcbiAgJzEyMDA4J1xuICAnMTIwMDknXG4gICcxMjAxMCdcbiAgJzEyMDE1J1xuICAnMTIwMTgnXG4gICcxMjAxOSdcbiAgJzEyMDIwJ1xuICAnMTIwMjInXG4gICcxMjAyMydcbiAgJzEyMDI1J1xuICAnMTIwMjcnXG4gICcxMjAyOSdcbiAgJzEyMDMxJ1xuICAnMTIwMzInXG4gICcxMjAzMydcbiAgJzEyMDM1J1xuICAnMTIwMzcnXG4gICcxMjA0MSdcbiAgJzEyMDQyJ1xuICAnMTIwNDMnXG4gICcxMjA0NSdcbiAgJzEyMDQ3J1xuICAnMTIwNTEnXG4gICcxMjA1MidcbiAgJzEyMDUzJ1xuICAnMTIwNTQnXG4gICcxMjA1NidcbiAgJzEyMDU3J1xuICAnMTIwNTgnXG4gICcxMjA1OSdcbiAgJzEyMDYwJ1xuICAnMTIwNjEnXG4gICcxMjA2NSdcbiAgJzEyMDY2J1xuICAnMTIwNjcnXG4gICcxMjA2OCdcbiAgJzEyMDcxJ1xuICAnMTIwNzInXG4gICcxMjA3NCdcbiAgJzEyMDc1J1xuICAnMTIwNzYnXG4gICcxMjA3NydcbiAgJzEyMDc4J1xuICAnMTIwODAnXG4gICcxMjA4MidcbiAgJzEyMDgzJ1xuICAnMTIwODQnXG4gICcxMjA4NSdcbiAgJzEyMDg2J1xuICAnMTIwODcnXG4gICcxMjA4OSdcbiAgJzEyMDkwJ1xuICAnMTIwOTInXG4gICcxMjA5MydcbiAgJzEyMDk1J1xuICAnMTIxMDYnXG4gICcxMjEwOCdcbiAgJzEyMTEwJ1xuICAnMTIxMTYnXG4gICcxMjExNydcbiAgJzEyMTE4J1xuICAnMTIxMjInXG4gICcxMjEyMydcbiAgJzEyMTI0J1xuICAnMTIxMjUnXG4gICcxMjEzMCdcbiAgJzEyMTMxJ1xuICAnMTIxMzMnXG4gICcxMjEzNCdcbiAgJzEyMTM2J1xuICAnMTIxMzcnXG4gICcxMjEzOSdcbiAgJzEyMTQwJ1xuICAnMTIxNDMnXG4gICcxMjE0NCdcbiAgJzEyMTQ3J1xuICAnMTIxNDgnXG4gICcxMjE0OSdcbiAgJzEyMTUwJ1xuICAnMTIxNTEnXG4gICcxMjE1NCdcbiAgJzEyMTU1J1xuICAnMTIxNTcnXG4gICcxMjE1OCdcbiAgJzEyMTU5J1xuICAnMTIxNjQnXG4gICcxMjE2NidcbiAgJzEyMTY3J1xuICAnMTIxNjgnXG4gICcxMjE3MCdcbiAgJzEyMTc1J1xuICAnMTIxODAnXG4gICcxMjE4MSdcbiAgJzEyMTgyJ1xuICAnMTIxODMnXG4gICcxMjE4NCdcbiAgJzEyMTg2J1xuICAnMTIxODcnXG4gICcxMjE4OCdcbiAgJzEyMTg5J1xuICAnMTIxOTAnXG4gICcxMjE5MidcbiAgJzEyMTk1J1xuICAnMTIxOTYnXG4gICcxMjE5NydcbiAgJzEyMTk4J1xuICAnMTIyMDInXG4gICcxMjIwMjEzOTgnXG4gICcxMjIwMjE3NDInXG4gICcxMjIwMydcbiAgJzEyMjA0J1xuICAnMTIyMDUnXG4gICcxMjIwNTExMDEnXG4gICcxMjIwNTExMjQnXG4gICcxMjIwNTI3NTEnXG4gICcxMjIwNidcbiAgJzEyMjA3J1xuICAnMTIyMDgnXG4gICcxMjIwOSdcbiAgJzEyMjEwJ1xuICAnMTIyMTEnXG4gICcxMjIxMTA1MDAnXG4gICcxMjIxMidcbiAgJzEyMjIwJ1xuICAnMTIyMjInXG4gICcxMjIyMydcbiAgJzEyMjI2J1xuICAnMTIyNDInXG4gICcxMjI2J1xuICAnMTIzMCA3J1xuICAnMTIzMDInXG4gICcxMjMwMydcbiAgJzEyMzA0J1xuICAnMTIzMDUnXG4gICcxMjMwNidcbiAgJzEyMzA3J1xuICAnMTIzMDgnXG4gICcxMjMwOSdcbiAgJzEyMzQ1J1xuICAnMTI0MDAxJ1xuICAnMTI0MDEnXG4gICcxMjQwNCdcbiAgJzEyNDA1J1xuICAnMTI0MDYnXG4gICcxMjQwNydcbiAgJzEyNDA5J1xuICAnMTI0MTAnXG4gICcxMjQxMidcbiAgJzEyNDEzJ1xuICAnMTI0MTQnXG4gICcxMjQxOCdcbiAgJzEyNDIyJ1xuICAnMTI0MjMnXG4gICcxMjQyNCdcbiAgJzEyNDI3J1xuICAnMTI0MjgnXG4gICcxMjQyOSdcbiAgJzEyNDMwJ1xuICAnMTI0MzEnXG4gICcxMjQzMidcbiAgJzEyNDM0J1xuICAnMTI0MzUnXG4gICcxMjQzNidcbiAgJzEyNDM5J1xuICAnMTI0NDAnXG4gICcxMjQ0MSdcbiAgJzEyNDQyJ1xuICAnMTI0NDMnXG4gICcxMjQ0NCdcbiAgJzEyNDQ2J1xuICAnMTI0NDknXG4gICcxMjQ1MSdcbiAgJzEyNDUzJ1xuICAnMTI0NTUnXG4gICcxMjQ1NidcbiAgJzEyNDU3J1xuICAnMTI0NTgnXG4gICcxMjQ2MCdcbiAgJzEyNDYxJ1xuICAnMTI0NjMnXG4gICcxMjQ2NCdcbiAgJzEyNDY1J1xuICAnMTI0NjYnXG4gICcxMjQ2OCdcbiAgJzEyNDcwJ1xuICAnMTI0NzInXG4gICcxMjQ3MydcbiAgJzEyNDc0J1xuICAnMTI0NzUnXG4gICcxMjQ3NydcbiAgJzEyNDgwJ1xuICAnMTI0ODEnXG4gICcxMjQ4MidcbiAgJzEyNDg0J1xuICAnMTI0ODUnXG4gICcxMjQ4NTA1OTInXG4gICcxMjQ4NidcbiAgJzEyNDg3J1xuICAnMTI0ODknXG4gICcxMjQ5MSdcbiAgJzEyNDkyJ1xuICAnMTI0OTMnXG4gICcxMjQ5NCdcbiAgJzEyNDk2J1xuICAnMTI0OTgnXG4gICcxMjUwMSdcbiAgJzEyNTAyJ1xuICAnMTI1MDMnXG4gICcxMjUwNCdcbiAgJzEyNTA2J1xuICAnMTI1MDcnXG4gICcxMjUwOCdcbiAgJzEyNTA4MjczNSdcbiAgJzEyNTEyJ1xuICAnMTI1MTMnXG4gICcxMjUxNidcbiAgJzEyNTE3J1xuICAnMTI1MTgnXG4gICcxMjUyMCdcbiAgJzEyNTIxJ1xuICAnMTI1MjInXG4gICcxMjUyMydcbiAgJzEyNTI0J1xuICAnMTI1MjUnXG4gICcxMjUyNidcbiAgJzEyNTI3J1xuICAnMTI1MjgnXG4gICcxMjUyOSdcbiAgJzEyNTMxJ1xuICAnMTI1MzMnXG4gICcxMjUzMzYyNjcnXG4gICcxMjUzNCdcbiAgJzEyNTM4J1xuICAnMTI1NDAnXG4gICcxMjU0MidcbiAgJzEyNTQzJ1xuICAnMTI1NDUnXG4gICcxMjU0NTAxMjcnXG4gICcxMjU0NidcbiAgJzEyNTQ3J1xuICAnMTI1NDgnXG4gICcxMjU0OSdcbiAgJzEyNTUwJ1xuICAnMTI1NTInXG4gICcxMjU1MydcbiAgJzEyNTYxJ1xuICAnMTI1NjMnXG4gICcxMjU2NCdcbiAgJzEyNTY1J1xuICAnMTI1NjYnXG4gICcxMjU2NydcbiAgJzEyNTY4J1xuICAnMTI1NjknXG4gICcxMjU3MCdcbiAgJzEyNTcxJ1xuICAnMTI1NzInXG4gICcxMjU3NCdcbiAgJzEyNTc1J1xuICAnMTI1NzcnXG4gICcxMjU3OCdcbiAgJzEyNTgwJ1xuICAnMTI1ODEnXG4gICcxMjU4MidcbiAgJzEyNTgzJ1xuICAnMTI1ODQnXG4gICcxMjU4NSdcbiAgJzEyNTg2J1xuICAnMTI1ODknXG4gICcxMjU5MCdcbiAgJzEyNTkwMTkxOCdcbiAgJzEyNTkyJ1xuICAnMTI1OTQnXG4gICcxMjYwMSdcbiAgJzEyNjAyJ1xuICAnMTI2MDMnXG4gICcxMjYwNCdcbiAgJzEyNzAxJ1xuICAnMTI3MDEtMzMxJ1xuICAnMTI3MDInXG4gICcxMjcxOSdcbiAgJzEyNzIwJ1xuICAnMTI3MjEnXG4gICcxMjcyMidcbiAgJzEyNzIzJ1xuICAnMTI3MjUnXG4gICcxMjcyNidcbiAgJzEyNzI5J1xuICAnMTI3MzInXG4gICcxMjczMydcbiAgJzEyNzM0J1xuICAnMTI3MzcnXG4gICcxMjc0MCdcbiAgJzEyNzQxJ1xuICAnMTI3NDMnXG4gICcxMjc0NidcbiAgJzEyNzQ3J1xuICAnMTI3NDgnXG4gICcxMjc0OSdcbiAgJzEyNzUwJ1xuICAnMTI3NTEnXG4gICcxMjc1MidcbiAgJzEyNzU0J1xuICAnMTI3NTgnXG4gICcxMjc1OSdcbiAgJzEyNzYwJ1xuICAnMTI3NjInXG4gICcxMjc2MydcbiAgJzEyNzY0J1xuICAnMTI3NjUnXG4gICcxMjc2OCdcbiAgJzEyNzcxJ1xuICAnMTI3NzUnXG4gICcxMjc3NidcbiAgJzEyNzc2LTAzMCdcbiAgJzEyNzc3J1xuICAnMTI3NzknXG4gICcxMjc4MSdcbiAgJzEyNzgzJ1xuICAnMTI3ODQnXG4gICcxMjc4NSdcbiAgJzEyNzg2J1xuICAnMTI3ODcnXG4gICcxMjc4OCdcbiAgJzEyNzg5J1xuICAnMTI3OTAnXG4gICcxMjc5MSdcbiAgJzEyNzkyJ1xuICAnMTI4MDEnXG4gICcxMjgwMydcbiAgJzEyODA0J1xuICAnMTI4MDQxNzA1J1xuICAnMTI4MDknXG4gICcxMjgxMidcbiAgJzEyODE0J1xuICAnMTI4MTUnXG4gICcxMjgxNidcbiAgJzEyODE3J1xuICAnMTI4MTctMDQ4J1xuICAnMTI4MTknXG4gICcxMjgyMCdcbiAgJzEyODIxJ1xuICAnMTI4MjInXG4gICcxMjgyNCdcbiAgJzEyODI3J1xuICAnMTI4MjgnXG4gICcxMjgzMSdcbiAgJzEyODMyJ1xuICAnMTI4MzMnXG4gICcxMjgzNCdcbiAgJzEyODM1J1xuICAnMTI4MzYnXG4gICcxMjgzOCdcbiAgJzEyODM5J1xuICAnMTI4NDEnXG4gICcxMjg0MidcbiAgJzEyODQzJ1xuICAnMTI4NDQnXG4gICcxMjg0NSdcbiAgJzEyODQ1LTM1MCdcbiAgJzEyODQ1LTUwMCdcbiAgJzEyODQ1LTY0MidcbiAgJzEyODQ2J1xuICAnMTI4NDYwMjAwJ1xuICAnMTI4NDcnXG4gICcxMjg0OCdcbiAgJzEyODQ5J1xuICAnMTI4NTAnXG4gICcxMjg1MSdcbiAgJzEyODUyJ1xuICAnMTI4NTMnXG4gICcxMjg1My05NjAnXG4gICcxMjg1NSdcbiAgJzEyODU2J1xuICAnMTI4NTcnXG4gICcxMjg1OSdcbiAgJzEyODYwJ1xuICAnMTI4NjEnXG4gICcxMjg2NSdcbiAgJzEyODY2J1xuICAnMTI4NzAnXG4gICcxMjg3MSdcbiAgJzEyODc0J1xuICAnMTI4NzgnXG4gICcxMjg4MydcbiAgJzEyODgzMTExOSdcbiAgJzEyODg1J1xuICAnMTI4ODcnXG4gICcxMjg4OSdcbiAgJzEyOTAxJ1xuICAnMTI5MDMnXG4gICcxMjkxMCdcbiAgJzEyOTExJ1xuICAnMTI5MTInXG4gICcxMjkxMydcbiAgJzEyOTE2J1xuICAnMTI5MTcnXG4gICcxMjkxOCdcbiAgJzEyOTE5J1xuICAnMTI5MTk0NjM4J1xuICAnMTI5MjAnXG4gICcxMjkyMSdcbiAgJzEyOTIyJ1xuICAnMTI5MjMnXG4gICcxMjkyNCdcbiAgJzEyOTI2J1xuICAnMTI5MjcnXG4gICcxMjkyOCdcbiAgJzEyOTI5J1xuICAnMTI5MzAnXG4gICcxMjkzMidcbiAgJzEyOTM0J1xuICAnMTI5MzUnXG4gICcxMjkzNidcbiAgJzEyOTM3J1xuICAnMTI5MzknXG4gICcxMjk0MSdcbiAgJzEyOTQyJ1xuICAnMTI5NDMnXG4gICcxMjk0NCdcbiAgJzEyOTQ1J1xuICAnMTI5NDYnXG4gICcxMjk1MCdcbiAgJzEyOTUyJ1xuICAnMTI5NTMnXG4gICcxMjk1NSdcbiAgJzEyOTU2J1xuICAnMTI5NTcnXG4gICcxMjk1OCdcbiAgJzEyOTU5J1xuICAnMTI5NjAnXG4gICcxMjk2MSdcbiAgJzEyOTYyJ1xuICAnMTI5NjYnXG4gICcxMjk2NydcbiAgJzEyOTY5J1xuICAnMTI5NzAnXG4gICcxMjk3MidcbiAgJzEyOTc0J1xuICAnMTI5NzUnXG4gICcxMjk3NydcbiAgJzEyOTc5J1xuICAnMTI5ODAnXG4gICcxMjk4MSdcbiAgJzEyOTgzJ1xuICAnMTI5ODYnXG4gICcxMjk4NydcbiAgJzEyOTg5J1xuICAnMTI5OTInXG4gICcxMjk5MjI1NzcnXG4gICcxMjk5MydcbiAgJzEyOTk2J1xuICAnMTI5OTcnXG4gICcxMzAyMCdcbiAgJzEzMDIxJ1xuICAnMTMwMjYnXG4gICcxMzAyNydcbiAgJzEzMDI4J1xuICAnMTMwMjknXG4gICcxMzAzMCdcbiAgJzEzMDMxJ1xuICAnMTMwMzInXG4gICcxMzAzMydcbiAgJzEzMDM0J1xuICAnMTMwMzUnXG4gICcxMzAzNidcbiAgJzEzMDM3J1xuICAnMTMwMzknXG4gICcxMzA0MCdcbiAgJzEzMDQxJ1xuICAnMTMwNDInXG4gICcxMzA0NCdcbiAgJzEzMDQ1J1xuICAnMTMwNTEnXG4gICcxMzA1MidcbiAgJzEzMDUzJ1xuICAnMTMwNTQnXG4gICcxMzA1NydcbiAgJzEzMDYwJ1xuICAnMTMwNjEnXG4gICcxMzA2MydcbiAgJzEzMDY0J1xuICAnMTMwNjYnXG4gICcxMzA2OCdcbiAgJzEzMDY5J1xuICAnMTMwNzEnXG4gICcxMzA3MidcbiAgJzEzMDczJ1xuICAnMTMwNzQnXG4gICcxMzA3NidcbiAgJzEzMDc3J1xuICAnMTMwNzgnXG4gICcxMzA4MCdcbiAgJzEzMDgxJ1xuICAnMTMwODInXG4gICcxMzA4MydcbiAgJzEzMDg0J1xuICAnMTMwODcnXG4gICcxMzA4OCdcbiAgJzEzMDkwJ1xuICAnMTMwOTInXG4gICcxMzA5MydcbiAgJzEzMTAxJ1xuICAnMTMxMDQnXG4gICcxMzEwOCdcbiAgJzEzMTEwJ1xuICAnMTMxMTEnXG4gICcxMzExMidcbiAgJzEzMTEzJ1xuICAnMTMxMTQnXG4gICcxMzExNSdcbiAgJzEzMTE2J1xuICAnMTMxMTcnXG4gICcxMzExOCdcbiAgJzEzMTE5J1xuICAnMTMxMjAnXG4gICcxMzEyMSdcbiAgJzEzMTIzJ1xuICAnMTMxMjYnXG4gICcxMzEzMSdcbiAgJzEzMTMyJ1xuICAnMTMxMzUnXG4gICcxMzEzNTIxNzAnXG4gICcxMzEzNidcbiAgJzEzMTM4J1xuICAnMTMxNDAnXG4gICcxMzE0MSdcbiAgJzEzMTQyJ1xuICAnMTMxNDMnXG4gICcxMzE0NCdcbiAgJzEzMTQ1J1xuICAnMTMxNDcnXG4gICcxMzE0OCdcbiAgJzEzMTUyJ1xuICAnMTMxNTMnXG4gICcxMzE1NSdcbiAgJzEzMTU2J1xuICAnMTMxNTcnXG4gICcxMzE1OCdcbiAgJzEzMTU5J1xuICAnMTMxNjAnXG4gICcxMzE2MidcbiAgJzEzMTYzJ1xuICAnMTMxNjQnXG4gICcxMzE2NSdcbiAgJzEzMTY2J1xuICAnMTMxNjcnXG4gICcxMzIwMidcbiAgJzEzMjAzJ1xuICAnMTMyMDQnXG4gICcxMzIwNSdcbiAgJzEzMjA2J1xuICAnMTMyMDcnXG4gICcxMzIwOCdcbiAgJzEzMjA5J1xuICAnMTMyMTAnXG4gICcxMzIxMSdcbiAgJzEzMjEyJ1xuICAnMTMyMTQnXG4gICcxMzIxNSdcbiAgJzEzMjE5J1xuICAnMTMyMjQnXG4gICcxMzI0NCdcbiAgJzEzMjkwJ1xuICAnMTMzMDEnXG4gICcxMzMwMidcbiAgJzEzMzAzJ1xuICAnMTMzMDQnXG4gICcxMzMwNSdcbiAgJzEzMzA4J1xuICAnMTMzMDknXG4gICcxMzMxMCdcbiAgJzEzMzEyJ1xuICAnMTMzMTMnXG4gICcxMzMxNCdcbiAgJzEzMzE2J1xuICAnMTMzMTcnXG4gICcxMzMxOSdcbiAgJzEzMzIwJ1xuICAnMTMzMjEnXG4gICcxMzMyMidcbiAgJzEzMzIzJ1xuICAnMTMzMjQnXG4gICcxMzMyNSdcbiAgJzEzMzI2J1xuICAnMTMzMjcnXG4gICcxMzMyOCdcbiAgJzEzMzI5J1xuICAnMTMzMzEnXG4gICcxMzMzMidcbiAgJzEzMzMzJ1xuICAnMTMzMzQnXG4gICcxMzMzNSdcbiAgJzEzMzM4J1xuICAnMTMzMzgzNTE0J1xuICAnMTMzMzknXG4gICcxMzM0MCdcbiAgJzEzMzQzJ1xuICAnMTMzNDUnXG4gICcxMzM0NidcbiAgJzEzMzQ4J1xuICAnMTMzNTAnXG4gICcxMzM1NCdcbiAgJzEzMzU1J1xuICAnMTMzNTYnXG4gICcxMzM1NydcbiAgJzEzMzYwJ1xuICAnMTMzNjMnXG4gICcxMzM2NCdcbiAgJzEzMzY1J1xuICAnMTMzNjcnXG4gICcxMzM2OCdcbiAgJzEzNDAxJ1xuICAnMTM0MDInXG4gICcxMzQwMydcbiAgJzEzNDA3J1xuICAnMTM0MDgnXG4gICcxMzQwOSdcbiAgJzEzNDExJ1xuICAnMTM0MTMnXG4gICcxMzQxNidcbiAgJzEzNDE3J1xuICAnMTM0MTgnXG4gICcxMzQyMCdcbiAgJzEzNDIxJ1xuICAnMTM0MjQnXG4gICcxMzQyNDM5MDUnXG4gICcxMzQyNSdcbiAgJzEzNDI2J1xuICAnMTM0MjgnXG4gICcxMzQzMSdcbiAgJzEzNDMxMDAzMCdcbiAgJzEzNDMzJ1xuICAnMTM0MzUnXG4gICcxMzQzNidcbiAgJzEzNDM3J1xuICAnMTM0MzgnXG4gICcxMzQzOSdcbiAgJzEzNDQwJ1xuICAnMTM0NDEnXG4gICcxMzQ1MCdcbiAgJzEzNDUyJ1xuICAnMTM0NTQnXG4gICcxMzQ1NSdcbiAgJzEzNDU2J1xuICAnMTM0NTcnXG4gICcxMzQ1OSdcbiAgJzEzNDYwJ1xuICAnMTM0NjEnXG4gICcxMzQ2OSdcbiAgJzEzNDcxJ1xuICAnMTM0NzInXG4gICcxMzQ3MydcbiAgJzEzNDc1J1xuICAnMTM0NzYnXG4gICcxMzQ3OCdcbiAgJzEzNDc5J1xuICAnMTM0ODAnXG4gICcxMzQ4NCdcbiAgJzEzNDg1J1xuICAnMTM0ODYnXG4gICcxMzQ4OSdcbiAgJzEzNDkwJ1xuICAnMTM0OTEnXG4gICcxMzQ5MidcbiAgJzEzNDkzJ1xuICAnMTM0OTQnXG4gICcxMzQ5NSdcbiAgJzEzNTAxJ1xuICAnMTM1MDInXG4gICcxMzYwMSdcbiAgJzEzNjA1J1xuICAnMTM2MDYnXG4gICcxMzYwNydcbiAgJzEzNjA4J1xuICAnMTM2MDknXG4gICcxMzYxMSdcbiAgJzEzNjEyJ1xuICAnMTM2MTMnXG4gICcxMzYxNCdcbiAgJzEzNjE1J1xuICAnMTM2MTYnXG4gICcxMzYxNydcbiAgJzEzNjE4J1xuICAnMTM2MTknXG4gICcxMzYxOTAxNjYnXG4gICcxMzYyMCdcbiAgJzEzNjIyJ1xuICAnMTM2MjQnXG4gICcxMzYyNSdcbiAgJzEzNjI2J1xuICAnMTM2MjgnXG4gICcxMzYzMCdcbiAgJzEzNjMxJ1xuICAnMTM2MzInXG4gICcxMzYzNCdcbiAgJzEzNjM1J1xuICAnMTM2MzcnXG4gICcxMzY0MCdcbiAgJzEzNjQxJ1xuICAnMTM2NDInXG4gICcxMzY0MydcbiAgJzEzNjQ2J1xuICAnMTM2NDcnXG4gICcxMzY0OCdcbiAgJzEzNjUwJ1xuICAnMTM2NTEnXG4gICcxMzY1MidcbiAgJzEzNjU0J1xuICAnMTM2NTUnXG4gICcxMzY1NidcbiAgJzEzNjU3J1xuICAnMTM2NTgnXG4gICcxMzY2MCdcbiAgJzEzNjYxJ1xuICAnMTM2NjInXG4gICcxMzY2MjI2MDYnXG4gICcxMzY2MjMyOTAnXG4gICcxMzY2NCdcbiAgJzEzNjY1J1xuICAnMTM2NjcnXG4gICcxMzY2OCdcbiAgJzEzNjY5J1xuICAnMTM2NzAnXG4gICcxMzY3MidcbiAgJzEzNjczJ1xuICAnMTM2NzQnXG4gICcxMzY3NidcbiAgJzEzNjc4J1xuICAnMTM2NzknXG4gICcxMzY4NCdcbiAgJzEzNjg1J1xuICAnMTM2ODcnXG4gICcxMzY5MCdcbiAgJzEzNjkxJ1xuICAnMTM2OTQnXG4gICcxMzY5NSdcbiAgJzEzNjk3J1xuICAnMTM2OTknXG4gICcxMzczMCdcbiAgJzEzNzMxJ1xuICAnMTM3MzInXG4gICcxMzczMydcbiAgJzEzNzM2J1xuICAnMTM3MzknXG4gICcxMzc0MCdcbiAgJzEzNzQzJ1xuICAnMTM3NDMwMTQ1J1xuICAnMTM3NDUnXG4gICcxMzc0NidcbiAgJzEzNzQ3J1xuICAnMTM3NDgnXG4gICcxMzc1MCdcbiAgJzEzNzUxJ1xuICAnMTM3NTInXG4gICcxMzc1MydcbiAgJzEzNzU0J1xuICAnMTM3NTUnXG4gICcxMzc1NidcbiAgJzEzNzU3J1xuICAnMTM3NTgnXG4gICcxMzc2MCdcbiAgJzEzNzc1J1xuICAnMTM3NzYnXG4gICcxMzc3OCdcbiAgJzEzNzgwJ1xuICAnMTM3ODInXG4gICcxMzc4MydcbiAgJzEzNzg0J1xuICAnMTM3ODcnXG4gICcxMzc4OCdcbiAgJzEzNzkwJ1xuICAnMTM3OTUnXG4gICcxMzc5NidcbiAgJzEzNzk3J1xuICAnMTM4MDEnXG4gICcxMzgwMidcbiAgJzEzODAzJ1xuICAnMTM4MDcnXG4gICcxMzgwOCdcbiAgJzEzODA5J1xuICAnMTM4MTAnXG4gICcxMzgxMSdcbiAgJzEzODEyJ1xuICAnMTM4MTQnXG4gICcxMzgxNSdcbiAgJzEzODIwJ1xuICAnMTM4MjUnXG4gICcxMzgyNydcbiAgJzEzODMwJ1xuICAnMTM4MzInXG4gICcxMzgzMydcbiAgJzEzODM1J1xuICAnMTM4MzgnXG4gICcxMzgzOSdcbiAgJzEzODQwJ1xuICAnMTM4NDEnXG4gICcxMzg0MidcbiAgJzEzODQ1J1xuICAnMTM4NDcnXG4gICcxMzg0OSdcbiAgJzEzODUwJ1xuICAnMTM4NTYnXG4gICcxMzg2MSdcbiAgJzEzODYyJ1xuICAnMTM4NjQnXG4gICcxMzg2NSdcbiAgJzEzOTAxJ1xuICAnMTM5MDInXG4gICcxMzkwMydcbiAgJzEzOTA0J1xuICAnMTM5MDUnXG4gICcxNDAwMSdcbiAgJzE0MDAzJ1xuICAnMTQwMDUnXG4gICcxNDAwOCdcbiAgJzE0MDA5J1xuICAnMTQwMTEnXG4gICcxNDAxMidcbiAgJzE0MDIwJ1xuICAnMTQwMjAwMDAwJ1xuICAnMTQwMjQnXG4gICcxNDAyOCdcbiAgJzE0MDM2J1xuICAnMTQwMzcnXG4gICcxNDA0MCdcbiAgJzE0MDQyJ1xuICAnMTQwNDgnXG4gICcxNDA0ODE0MzcnXG4gICcxNDA1NCdcbiAgJzE0MDU4J1xuICAnMTQwNjInXG4gICcxNDA2MydcbiAgJzE0MDY1J1xuICAnMTQwNjYnXG4gICcxNDA2NydcbiAgJzE0MDcwJ1xuICAnMTQwODEnXG4gICcxNDA4MidcbiAgJzE0MDkyJ1xuICAnMTQwOTQnXG4gICcxNDA5OCdcbiAgJzE0MTAxJ1xuICAnMTQxMDMnXG4gICcxNDEwNSdcbiAgJzE0MTA4J1xuICAnMTQxMDknXG4gICcxNDEyMCdcbiAgJzE0MTIwMzM0MCdcbiAgJzE0MTIwNzIyOCdcbiAgJzE0MTI1J1xuICAnMTQxMjYnXG4gICcxNDEyOSdcbiAgJzE0MTMwJ1xuICAnMTQxMzEnXG4gICcxNDEzMidcbiAgJzE0MTMzJ1xuICAnMTQxMzUnXG4gICcxNDEzNidcbiAgJzE0MTM4J1xuICAnMTQxNDMnXG4gICcxNDE0NCdcbiAgJzE0MTQ1J1xuICAnMTQxNjcnXG4gICcxNDE3MSdcbiAgJzE0MTcyJ1xuICAnMTQxNzMnXG4gICcxNDE3NCdcbiAgJzE0MjI4J1xuICAnMTQzMDEnXG4gICcxNDMwMjI2NTcnXG4gICcxNDMwMydcbiAgJzE0MzA0J1xuICAnMTQzMDQwMzYwJ1xuICAnMTQzMDUnXG4gICcxNDQxMSdcbiAgJzE0NDEzJ1xuICAnMTQ0MTQnXG4gICcxNDQxNC0nXG4gICcxNDQxNidcbiAgJzE0NDE4J1xuICAnMTQ0MjAnXG4gICcxNDQyMidcbiAgJzE0NDIzJ1xuICAnMTQ0MjQnXG4gICcxNDQyNSdcbiAgJzE0NDI3J1xuICAnMTQ0MjgnXG4gICcxNDQyOSdcbiAgJzE0NDMyJ1xuICAnMTQ0MzMnXG4gICcxNDQzNSdcbiAgJzE0NDM3J1xuICAnMTQ0MzctJ1xuICAnMTQ0NDEnXG4gICcxNDQ0MydcbiAgJzE0NDQ1J1xuICAnMTQ0NTAnXG4gICcxNDQ1NCdcbiAgJzE0NDU0LSdcbiAgJzE0NDU2J1xuICAnMTQ0NjEnXG4gICcxNDQ2NCdcbiAgJzE0NDY1J1xuICAnMTQ0NjYnXG4gICcxNDQ2NydcbiAgJzE0NDY4J1xuICAnMTQ0NjknXG4gICcxNDQ3MCdcbiAgJzE0NDcxJ1xuICAnMTQ0NzInXG4gICcxNDQ3NidcbiAgJzE0NDc3J1xuICAnMTQ0NzgnXG4gICcxNDQ4MCdcbiAgJzE0NDgxJ1xuICAnMTQ0ODInXG4gICcxNDQ4NSdcbiAgJzE0NDg3J1xuICAnMTQ0ODctJ1xuICAnMTQ0ODknXG4gICcxNDUwMidcbiAgJzE0NTA0J1xuICAnMTQ1MDUnXG4gICcxNDUwNidcbiAgJzE0NTA3J1xuICAnMTQ1MTAnXG4gICcxNDUxMSdcbiAgJzE0NTEyJ1xuICAnMTQ1MTMnXG4gICcxNDUxNCdcbiAgJzE0NTE2J1xuICAnMTQ1MTcnXG4gICcxNDUxOSdcbiAgJzE0NTIwJ1xuICAnMTQ1MjEnXG4gICcxNDUyMidcbiAgJzE0NTI1J1xuICAnMTQ1MjYnXG4gICcxNDUyNydcbiAgJzE0NTMwJ1xuICAnMTQ1MzInXG4gICcxNDUzMydcbiAgJzE0NTM0J1xuICAnMTQ1MzYnXG4gICcxNDUzOSdcbiAgJzE0NTQxJ1xuICAnMTQ1NDMnXG4gICcxNDU0NCdcbiAgJzE0NTQ1J1xuICAnMTQ1NDYnXG4gICcxNDU0OCdcbiAgJzE0NTQ5J1xuICAnMTQ1NTAnXG4gICcxNDU1MSdcbiAgJzE0NTU1J1xuICAnMTQ1NTYnXG4gICcxNDU1Ni0nXG4gICcxNDU1OSdcbiAgJzE0NTYwJ1xuICAnMTQ1NjEnXG4gICcxNDU2NCdcbiAgJzE0NTY4J1xuICAnMTQ1NjknXG4gICcxNDU3MSdcbiAgJzE0NTcyJ1xuICAnMTQ1ODAnXG4gICcxNDU4NSdcbiAgJzE0NTg2J1xuICAnMTQ1ODgnXG4gICcxNDU4OSdcbiAgJzE0NTkwJ1xuICAnMTQ1OTEnXG4gICcxNDU5MTAwMzYnXG4gICcxNDYwMydcbiAgJzE0NjA0J1xuICAnMTQ2MDUnXG4gICcxNDYwNidcbiAgJzE0NjA3J1xuICAnMTQ2MDgnXG4gICcxNDYwOSdcbiAgJzE0NjEwJ1xuICAnMTQ2MTEnXG4gICcxNDYxMidcbiAgJzE0NjEzJ1xuICAnMTQ2MTQnXG4gICcxNDYxNSdcbiAgJzE0NjE2J1xuICAnMTQ2MTcnXG4gICcxNDYxOCdcbiAgJzE0NjE5J1xuICAnMTQ2MjAnXG4gICcxNDYyMSdcbiAgJzE0NjIyJ1xuICAnMTQ2MjMnXG4gICcxNDYyNCdcbiAgJzE0NjI1J1xuICAnMTQ2MjYnXG4gICcxNDYyNydcbiAgJzE0NjUwJ1xuICAnMTQ3MDEnXG4gICcxNDcwMjIwMDInXG4gICcxNDcwNidcbiAgJzE0NzA5J1xuICAnMTQ3MTAnXG4gICcxNDcxMSdcbiAgJzE0NzEyJ1xuICAnMTQ3MTUnXG4gICcxNDcxNidcbiAgJzE0NzE4J1xuICAnMTQ3MTknXG4gICcxNDcyMCdcbiAgJzE0NzIxJ1xuICAnMTQ3MjInXG4gICcxNDcyMydcbiAgJzE0NzI0J1xuICAnMTQ3MjYnXG4gICcxNDcyNydcbiAgJzE0NzI4J1xuICAnMTQ3MjknXG4gICcxNDczMCdcbiAgJzE0NzMxJ1xuICAnMTQ3MzInXG4gICcxNDczMydcbiAgJzE0NzMzLTE2MCdcbiAgJzE0NzM1J1xuICAnMTQ3MzYnXG4gICcxNDczNydcbiAgJzE0NzM4J1xuICAnMTQ3MzknXG4gICcxNDc0MCdcbiAgJzE0NzQxJ1xuICAnMTQ3NDMnXG4gICcxNDc0NCdcbiAgJzE0NzQ3J1xuICAnMTQ3NTAnXG4gICcxNDc1MidcbiAgJzE0NzUzJ1xuICAnMTQ3NTUnXG4gICcxNDc1NydcbiAgJzE0NzYwJ1xuICAnMTQ3NjcnXG4gICcxNDc3MCdcbiAgJzE0NzcyJ1xuICAnMTQ3NzQnXG4gICcxNDc3NSdcbiAgJzE0Nzc4J1xuICAnMTQ3NzknXG4gICcxNDc4MSdcbiAgJzE0NzgyJ1xuICAnMTQ3ODMnXG4gICcxNDc4NSdcbiAgJzE0Nzg2J1xuICAnMTQ3ODcnXG4gICcxNDc4OCdcbiAgJzE0ODAxJ1xuICAnMTQ4MDExMTEwJ1xuICAnMTQ4MDInXG4gICcxNDgwMydcbiAgJzE0ODA0J1xuICAnMTQ4MDYnXG4gICcxNDgwNydcbiAgJzE0ODA5J1xuICAnMTQ4MTAnXG4gICcxNDgxMDA2MDcnXG4gICcxNDgxMidcbiAgJzE0ODEzJ1xuICAnMTQ4MTQnXG4gICcxNDgxNSdcbiAgJzE0ODE3J1xuICAnMTQ4MTgnXG4gICcxNDgyMCdcbiAgJzE0ODIxJ1xuICAnMTQ4MjInXG4gICcxNDgyMydcbiAgJzE0ODI2J1xuICAnMTQ4MzAnXG4gICcxNDgzMDI3ODYnXG4gICcxNDgzMSdcbiAgJzE0ODM3J1xuICAnMTQ4MzgnXG4gICcxNDgzOSdcbiAgJzE0ODQwJ1xuICAnMTQ4NDAwNDU4J1xuICAnMTQ4NDEnXG4gICcxNDg0MidcbiAgJzE0ODQyOTYwNSdcbiAgJzE0ODQzJ1xuICAnMTQ4NDQnXG4gICcxNDg0NSdcbiAgJzE0ODQ2J1xuICAnMTQ4NDcnXG4gICcxNDg1MCdcbiAgJzE0ODUyJ1xuICAnMTQ4NTMnXG4gICcxNDg1NidcbiAgJzE0ODU3J1xuICAnMTQ4NTknXG4gICcxNDg2MCdcbiAgJzE0ODY0J1xuICAnMTQ4NjUnXG4gICcxNDg2NydcbiAgJzE0ODY5J1xuICAnMTQ4NzAnXG4gICcxNDg3MSdcbiAgJzE0ODczJ1xuICAnMTQ4NzQnXG4gICcxNDg3OCdcbiAgJzE0ODc5J1xuICAnMTQ4ODAnXG4gICcxNDg4MSdcbiAgJzE0ODgyJ1xuICAnMTQ4ODMnXG4gICcxNDg4NCdcbiAgJzE0ODg1J1xuICAnMTQ4ODYnXG4gICcxNDg4NydcbiAgJzE0ODg5J1xuICAnMTQ4OTEnXG4gICcxNDg5MidcbiAgJzE0ODk0J1xuICAnMTQ4OTUnXG4gICcxNDg5NydcbiAgJzE0ODk4J1xuICAnMTQ5MDEnXG4gICcxNDkwMidcbiAgJzE0OTAzJ1xuICAnMTQ5MDQnXG4gICcxNDkwNSdcbl1cbiIsbnVsbCwiXG4jIFByb3ZpZGVzIHVwZGF0ZUF0dHJzIG1ldGhvZCB1c2VkIGJ5IGJpbmRDaGVja2JveGVzLCBiaW5kSW5wdXRzLCBiaW5kUmFkaW9zLCBiaW5kU2VsZWN0c1xuY2xhc3MgQmluZEJhc2UgZXh0ZW5kcyBNYXJpb25ldHRlLkJlaGF2aW9yXG5cbiAgdXBkYXRlQXR0cnM6IChlKSAtPlxuICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcbiAgICBAdmlldy5tb2RlbC5zZXQoQmFja2JvbmUuU3lwaG9uLnNlcmlhbGl6ZShAKSlcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gQmluZEJhc2VcbiIsIlxuIyBEYXRhYmluZGluZyBmb3IgZm9ybSBpbnB1dHNcbmNsYXNzIEJpbmRJbnB1dHMgZXh0ZW5kcyByZXF1aXJlICcuL2JpbmRCYXNlJ1xuXG4gIGV2ZW50czpcbiAgICAnaW5wdXQgaW5wdXQnOiAgJ3VwZGF0ZUF0dHJzJ1xuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBCaW5kSW5wdXRzXG4iLCJcbl9zZW5kRmxhc2ggPSAodHlwZSwgb2JqKSAtPlxuICBCYWNrYm9uZS5SYWRpby5jaGFubmVsKCdmbGFzaCcpLnRyaWdnZXIodHlwZSwgb2JqKVxuXG4jICMgIyAjICNcblxuY2xhc3MgRmxhc2hlc0JlaGF2aW9yIGV4dGVuZHMgTWFyaW9uZXR0ZS5CZWhhdmlvclxuXG4gIGluaXRpYWxpemU6IChvcHRpb25zPXt9KSAtPlxuICAgIEB2aWV3Ll9mbGFzaGVzICAgICAgPSBAb3B0aW9uc1xuICAgIEB2aWV3LmZsYXNoRXJyb3IgICAgPSBAZmxhc2hFcnJvclxuICAgIEB2aWV3LmZsYXNoU3VjY2VzcyAgPSBAZmxhc2hTdWNjZXNzXG5cbiAgZmxhc2hFcnJvcjogKG9iaj17fSkgLT5cbiAgICBfc2VuZEZsYXNoKCdlcnJvcicsIEBfZmxhc2hlc1snZXJyb3InXSB8fCBvYmopXG5cbiAgZmxhc2hTdWNjZXNzOiAob2JqPXt9KSAtPlxuICAgIF9zZW5kRmxhc2goJ3N1Y2Nlc3MnLCBAX2ZsYXNoZXNbJ3N1Y2Nlc3MnXSB8fCBvYmopXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEZsYXNoZXNCZWhhdmlvclxuIiwiXG5jbGFzcyBNb2RlbEV2ZW50c0JlaGF2aW9yIGV4dGVuZHMgTWFyaW9uZXR0ZS5CZWhhdmlvclxuXG4gIG1vZGVsRXZlbnRzOlxuICAgICdyZXF1ZXN0JzogICdvbk1vZGVsUmVxdWVzdCdcbiAgICAnc3luYyc6ICAgICAnb25Nb2RlbFN5bmMnXG4gICAgJ2Vycm9yJzogICAgJ29uTW9kZWxFcnJvcidcblxuICBvbk1vZGVsUmVxdWVzdDogKG1vZGVsLCBzdGF0dXMsIG9wdGlvbnMpIC0+XG4gICAgQHZpZXcub25SZXF1ZXN0Pyhtb2RlbCwgc3RhdHVzLCBvcHRpb25zKVxuXG4gIG9uTW9kZWxTeW5jOiAobW9kZWwsIHJlc3BvbnNlLCBvcHRpb25zKSAtPlxuICAgIEB2aWV3Lm9uU3luYz8obW9kZWwsIHJlc3BvbnNlLCBvcHRpb25zKVxuXG4gIG9uTW9kZWxFcnJvcjogKG1vZGVsLCByZXNwb25zZSwgb3B0aW9ucykgLT5cbiAgICBAdmlldy5vbkVycm9yPyhtb2RlbCwgcmVzcG9uc2UsIG9wdGlvbnMpXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IE1vZGVsRXZlbnRzQmVoYXZpb3JcbiIsIlxuIyBTdWJtaXRCdXR0b25CZWhhdmlvciBjbGFzcyBkZWZpbml0aW9uXG4jIFByb3ZpZGVzIGFuIGV2ZW50IGxpc3RlbmVyIGFuZCBoYW5kbGVyLCBhbmQgZGVmaW5lc1xuIyBhc3NvY2lhdGVkIGNhbGxiYWNrcyBvbiB0aGUgdmlldyB0byB3aGljaCB0aGUgYmVoYXZpb3JcbiMgaXMgYXR0YWNoZWQuIFRoaXMgaXMgdXNlZCBpbiB0aGUgUGFzc3dvcmQgYW5kIFNuaXBwZXQgZm9ybXMuXG5jbGFzcyBTdWJtaXRCdXR0b25CZWhhdmlvciBleHRlbmRzIE1hcmlvbmV0dGUuQmVoYXZpb3JcblxuICB1aTpcbiAgICBzdWJtaXQ6ICdbZGF0YS1jbGljaz1zdWJtaXRdJ1xuXG4gIGV2ZW50czpcbiAgICAnY2xpY2sgQHVpLnN1Ym1pdDpub3QoLmRpc2FibGVkKSc6ICdvblN1Ym1pdENsaWNrJ1xuXG4gIGluaXRpYWxpemU6IChvcHRpb25zPXt9KSAtPlxuICAgIEB2aWV3LmRpc2FibGVTdWJtaXQgPSA9PiBAZGlzYWJsZVN1Ym1pdCgpXG4gICAgQHZpZXcuZW5hYmxlU3VibWl0ICA9ID0+IEBlbmFibGVTdWJtaXQoKVxuXG4gIG9uU3VibWl0Q2xpY2s6IChlKSAtPiBAdmlldy5vblN1Ym1pdD8oZSlcbiAgZGlzYWJsZVN1Ym1pdDogLT4gQHVpLnN1Ym1pdC5hZGRDbGFzcygnZGlzYWJsZWQnKVxuICBlbmFibGVTdWJtaXQ6IC0+ICBAdWkuc3VibWl0LnJlbW92ZUNsYXNzKCdkaXNhYmxlZCcpXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN1Ym1pdEJ1dHRvbkJlaGF2aW9yXG4iLCJcbmNsYXNzIFRvb2x0aXBCZWhhdmlvciBleHRlbmRzIE1hcmlvbmV0dGUuQmVoYXZpb3JcblxuICB1aTpcbiAgICB0b29sdGlwczogJ1tkYXRhLXRvZ2dsZT10b29sdGlwXSdcblxuICBpbml0aWFsaXplOiAtPlxuICAgICMgUHJveGllcyBjbGVhciBtZXRob2QgdG8gYmUgYWNjZXNzaWJsZSBpbnNpZGUgdGhlIHZpZXdcbiAgICBAdmlldy5jbGVhclRvb2x0aXBzID0gPT4gQGNsZWFyKClcblxuICBjbGVhcjogLT5cbiAgICBAdWkudG9vbHRpcHMudG9vbHRpcCgnaGlkZScpXG4gICAgQHVpLnRvb2x0aXBzLnRvb2x0aXAoJ2Rpc3Bvc2UnKVxuXG4gIG9uUmVuZGVyOiAtPiBAdWkudG9vbHRpcHM/LnRvb2x0aXAoKVxuICBvbkJlZm9yZURlc3Ryb3k6IC0+IEBjbGVhcigpXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRvb2x0aXBCZWhhdmlvclxuIiwiQnJlYWRjcnVtYkxpc3QgPSByZXF1aXJlICcuL3ZpZXdzL2JyZWFkY3J1bWJMaXN0J1xuXG4jICMgIyAjICNcblxuY2xhc3MgQnJlYWRjcnVtYkNvbXBvbmVudCBleHRlbmRzIE1uLlNlcnZpY2VcblxuICBpbml0aWFsaXplOiAob3B0aW9ucyA9IHt9KSAtPlxuICAgIEBjb250YWluZXIgID0gb3B0aW9ucy5jb250YWluZXJcbiAgICBAY29sbGVjdGlvbiA9IG5ldyBCYWNrYm9uZS5Db2xsZWN0aW9uKClcblxuICByYWRpb0V2ZW50czpcbiAgICAnYnJlYWRjcnVtYiByZWFkeSc6ICdvblJlYWR5J1xuICAgICdicmVhZGNydW1iIHNldCc6ICAgJ3NldCdcblxuICBvblJlYWR5OiAtPlxuICAgIEBzZXQoW3t0ZXh0OiAnTG9hZGluZy4uLid9XSlcbiAgICBAc2hvd1ZpZXcoKVxuXG4gIHNldDogKG1vZGVscykgLT5cbiAgICBAY29sbGVjdGlvbi5zZXQobW9kZWxzKVxuXG4gIHNob3dWaWV3OiAtPlxuICAgIHVubGVzcyBAc2hvd25cbiAgICAgIEBjb250YWluZXIuc2hvdyBuZXcgQnJlYWRjcnVtYkxpc3QoeyBjb2xsZWN0aW9uOiBAY29sbGVjdGlvbiB9KVxuICAgICAgQHNob3duID0gdHJ1ZVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBCcmVhZGNydW1iQ29tcG9uZW50XG4iLCJcbmNsYXNzIEJyZWFkY3J1bWJDaGlsZCBleHRlbmRzIE1uLkxheW91dFZpZXdcbiAgdGFnTmFtZTogJ2xpJ1xuICB0ZW1wbGF0ZTogcmVxdWlyZSAnLi90ZW1wbGF0ZXMvYnJlYWRjcnVtYl9jaGlsZCdcblxuICBjbGFzc05hbWU6IC0+XG4gICAgcmV0dXJuICdhY3RpdmUnIHVubGVzcyBAbW9kZWwuZ2V0KCdocmVmJylcblxuIyAjICMgIyAjXG5cbmNsYXNzIEJyZWFkY3J1bWJMaXN0IGV4dGVuZHMgTW4uQ29sbGVjdGlvblZpZXdcbiAgY2xhc3NOYW1lOiAnYnJlYWRjcnVtYidcbiAgdGFnTmFtZTogJ29sJ1xuICBjaGlsZFZpZXc6IEJyZWFkY3J1bWJDaGlsZFxuXG4gIGF0dHJpYnV0ZXM6XG4gICAgcm9sZTogJ25hdmlnYXRpb24nXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJyZWFkY3J1bWJMaXN0XG4iLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcbjt2YXIgbG9jYWxzX2Zvcl93aXRoID0gKGxvY2FscyB8fCB7fSk7KGZ1bmN0aW9uIChocmVmLCB0ZXh0KSB7XG5pZiAoIGhyZWYpXG57XG5idWYucHVzaChcIjxhXCIgKyAoamFkZS5hdHRyKFwiaHJlZlwiLCBocmVmLCB0cnVlLCBmYWxzZSkpICsgXCI+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSB0ZXh0KSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L2E+XCIpO1xufVxuZWxzZVxue1xuYnVmLnB1c2goamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSB0ZXh0KSA/IFwiXCIgOiBqYWRlX2ludGVycCkpO1xufX0uY2FsbCh0aGlzLFwiaHJlZlwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGguaHJlZjp0eXBlb2YgaHJlZiE9PVwidW5kZWZpbmVkXCI/aHJlZjp1bmRlZmluZWQsXCJ0ZXh0XCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC50ZXh0OnR5cGVvZiB0ZXh0IT09XCJ1bmRlZmluZWRcIj90ZXh0OnVuZGVmaW5lZCkpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsIlxuIyBBc3NpZ25zIE1hcmlvbmV0dGUuRGVjb3JhdG9yXG5NYXJpb25ldHRlLkRlY29yYXRvciA9IHJlcXVpcmUgJy4vZGVjb3JhdG9yJ1xuXG4jIE92ZXJyaWRlcyBkZWZhdWx0IHNlcmlhbGl6ZU1vZGVsKCkgbWV0aG9kIGRlZmluaXRpb25cbiMgSW4gdGhlIGNvbnRleHQgdGhlIHNlcmlhbGl6ZU1vZGVsIG1ldGhvZCwgJ3RoaXMnXG4jIHJlZmVycyB0byB0aGUgdmlldyBpbnN0YW5jZSBpbnNpZGUgd2hpY2ggdGhlXG4jIHNlcmlhbGl6ZU1vZGVsIG1ldGhvZCB3YXMgaW52b2tlZFxuTWFyaW9uZXR0ZS5WaWV3LnByb3RvdHlwZS5zZXJpYWxpemVNb2RlbCA9IC0+XG5cbiAgIyBJZiB0aGlzLm1vZGVsIGlzIG5vdCBkZWZpbmVkLCByZXR1cm4gYW4gZW1wdHkgb2JqZWN0XG4gIGlmICF0aGlzLm1vZGVsXG4gICAgcmV0dXJuIHt9XG5cbiAgIyBJZiB0aGlzLm1vZGVsIGV4aXN0cywgYW5kIGhhcyBhIGRlY29yYXRvciBkZWZpbmVkLFxuICAjIHJldHVybiB0aGUgdGhpcy5tb2RlbCdzIGF0dHJpYnV0ZXMgYW5kIGRlY29yYXRpb25zXG4gIGVsc2UgaWYgdGhpcy5tb2RlbC5kZWNvcmF0b3JcbiAgICByZXR1cm4gdGhpcy5tb2RlbC5kZWNvcmF0b3IuZGVjb3JhdGUodGhpcy5tb2RlbClcblxuICAjIE90aGVyd2lzZSwgcmV0dXJuIHRoZSBjbG9uZWQgYXR0cmlidXRlcyBvZiB0aGlzLm1vZGVsXG4gIHJldHVybiBfLmNsb25lIHRoaXMubW9kZWwuYXR0cmlidXRlc1xuIiwiXG4jIEJhc2VEZWNvcmF0b3IgY2xhc3MgZGVmaW5pdGlvblxuIyBEZWZpbmVzIGEgc2ltcGxlIGNsYXNzIHRvIGRlY29yYXRlIG1vZGVscyB3aGVuXG4jIHRoZXkgYXJlIHNlcmlhbGl6ZWQgaW50byBhIHZpZXcncyB0ZW1wbGF0ZVxuY2xhc3MgQmFzZURlY29yYXRvclxuXG4gICMgRGVjb3JhdGlvbiBtZXRob2RcbiAgIyBJbnZva2VkIGluIE1hcmlvbmV0dGUuVmlldy5wcm90b3R5cGUuc2VyaWFsaXplTW9kZWxcbiAgQGRlY29yYXRlOiAobW9kZWwpIC0+XG5cbiAgICAjIENsb25lcyBtb2RlbCdzIGF0dHJpYnV0ZXNcbiAgICAjIENsb25pbmcgcHJldmVudHMgY29udGFtaW5hdGlvbiBvZlxuICAgIGRhdGEgPSBfLmNsb25lKG1vZGVsLmF0dHJpYnV0ZXMpXG5cbiAgICAjIEl0ZXJhdGVzIG92ZXIgZWFjaCBmdW5jdGlvbiBpbiBwcm90b3R5cGVcbiAgICAjIExldmVyYWdlcyBVbmRlcnNjb3JlLmpzIF8uZnVuY3Rpb25zKClcbiAgICBmb3IgZnVuYyBpbiBfLmZ1bmN0aW9ucyhAcHJvdG90eXBlKVxuXG4gICAgICAjIFNraXAgY29uc3RydWN0b3JcbiAgICAgIGNvbnRpbnVlIGlmIGZ1bmMgPT0gJ2NvbnN0cnVjdG9yJ1xuXG4gICAgICAjIEFzc2lnbnMgdmFsdWUgb2YgZnVuY3Rpb24gdG8gaGFzaFxuICAgICAgZGF0YVtmdW5jXSA9IEBwcm90b3R5cGVbZnVuY10uYXBwbHkobW9kZWwpXG5cbiAgICAjIFJldHVybnMgdGhlIG1vZGVsJ3MgYXR0cmlidXRlcyAmIGRlY29yYXRpb25zXG4gICAgcmV0dXJuIGRhdGFcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gQmFzZURlY29yYXRvclxuIiwiXG4jIEZsYXNoQ29sbGVjdGlvbiBjbGFzcyBkZWZpbml0aW9uXG4jIERlZmluZXMgYSBiYXNpYyBCYWNrYm9uZS5Db2xsZWN0aW9uIHRvIGJlIHVzZWQgYnkgdGhlXG4jIEZsYXNoQ29tcG9uZW50IGZvciBzdG9yaW5nIG11bHRpcGxlIGZsYXNoIG1vZGVsc1xuY2xhc3MgRmxhc2hDb2xsZWN0aW9uIGV4dGVuZHMgQmFja2JvbmUuQ29sbGVjdGlvblxuICBtb2RlbDogcmVxdWlyZSAnLi9tb2RlbCdcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gRmxhc2hDb2xsZWN0aW9uXG4iLCJyZXF1aXJlICcuL3NlcnZpY2UnXG5GbGFzaExpc3QgPSByZXF1aXJlICcuL3ZpZXdzL2ZsYXNoTGlzdCdcblxuIyAjICMgIyAjXG5cbiMgRmxhc2hTZXJ2aWNlIGNsYXNzIGRlZmluaXRpb25cbiMgRGVmaW5lcyBhIGNvbXBvbmVudCB0byBjcmVhdGUgYW5kIGRpc3BsYXkgZmxhc2hlc1xuIyBpbiB0aGUgYXBwLiBQcm92aWRlcyBtdWx0aXBsZSBpbnRlcmZhY2VzIGluIHJhZGlvRXZlbnRzXG4jIHRvIGhhbmRsZSBjb21tb24gdHlwZXMgb2YgZmxhc2hlcyAoZXJyb3IsIHdhcm5pbmcsIHN1Y2Nlc3MpXG5jbGFzcyBGbGFzaENvbXBvbmVudCBleHRlbmRzIEJhY2tib25lLk1hcmlvbmV0dGUuU2VydmljZVxuXG4gIGluaXRpYWxpemU6IChvcHRpb25zID0ge30pIC0+XG4gICAgQGNvbnRhaW5lciA9IG9wdGlvbnMuY29udGFpbmVyXG4gICAgQmFja2JvbmUuUmFkaW8uY2hhbm5lbCgnZmxhc2gnKS5yZXF1ZXN0KCdjb2xsZWN0aW9uJykudGhlbiAoY29sbGVjdGlvbikgPT5cbiAgICAgIEBjb2xsZWN0aW9uID0gY29sbGVjdGlvblxuICAgICAgQGNvbGxlY3Rpb24ub24gJ3VwZGF0ZScsIEBzaG93TGlzdFZpZXcsIEBcblxuICByYWRpb0V2ZW50czpcbiAgICAnZmxhc2ggYWRkJzogICAgICAnYWRkJ1xuICAgICdmbGFzaCByZXNldCc6ICAgICdyZXNldCdcbiAgICAnZmxhc2ggZXJyb3InOiAgICAnZXJyb3InXG4gICAgJ2ZsYXNoIHdhcm5pbmcnOiAgJ3dhcm5pbmcnXG4gICAgJ2ZsYXNoIHN1Y2Nlc3MnOiAgJ3N1Y2Nlc3MnXG5cbiAgYWRkOiAob3B0aW9ucyA9IHt9KSAtPlxuICAgIEBjb2xsZWN0aW9uLmFkZChvcHRpb25zKVxuXG4gIHJlc2V0OiAtPlxuICAgIEBjb2xsZWN0aW9uLnJlc2V0KClcblxuICBlcnJvcjogKG9wdGlvbnM9e30pIC0+XG4gICAgQGNvbGxlY3Rpb24uYWRkIF8uZXh0ZW5kKCBvcHRpb25zLCB7IGNvbnRleHQ6ICAnZGFuZ2VyJyB9KVxuXG4gIHdhcm5pbmc6IChvcHRpb25zPXt9KSAtPlxuICAgIEBjb2xsZWN0aW9uLmFkZCBfLmV4dGVuZCggb3B0aW9ucywgeyBjb250ZXh0OiAgJ3dhcm5pbmcnIH0pXG5cbiAgc3VjY2VzczogKG9wdGlvbnM9e30pIC0+XG4gICAgQGNvbGxlY3Rpb24uYWRkIF8uZXh0ZW5kKCBvcHRpb25zLCB7IGNvbnRleHQ6ICAnc3VjY2VzcycgfSlcblxuICBzaG93TGlzdFZpZXc6ID0+XG4gICAgdW5sZXNzIEByZW5kZXJlZFxuICAgICAgQGNvbnRhaW5lci5zaG93IG5ldyBGbGFzaExpc3QoeyBjb2xsZWN0aW9uOiBAY29sbGVjdGlvbiB9KVxuICAgICAgQHJlbmRlcmVkID0gdHJ1ZVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBGbGFzaENvbXBvbmVudFxuIiwiXG4jIEZsYXNoTW9kZWwgY2xhc3MgZGVmaW5pdGlvblxuIyBEZWZpbmVzIGEgYmFzaWMgQmFja2JvbmUuTW9kZWwgdG8gbWFuYWdlIHZpZXdzXG4jIGRpc3BsYXllZCBpbiB0aGUgRmxhc2hDb21wb25lbnRcbmNsYXNzIEZsYXNoTW9kZWwgZXh0ZW5kcyBCYWNrYm9uZS5Nb2RlbFxuXG4gIGRlZmF1bHRzOlxuICAgIHRpbWVvdXQ6IDUwMDBcbiAgICBkaXNtaXNzaWJsZTogdHJ1ZVxuICAgIGNvbnRleHQ6ICdpbmZvJ1xuXG4gICMgQWxlcnQgTW9kZWwgQXR0cmlidXRlcyAvIE9wdGlvbnNcbiAgIyAtIG1lc3NhZ2VcbiAgIyAtIHN0cm9uZ1RleHQgKHBsZWFzZSByZW5hbWUgdG8gJ3N0cm9uZycgJiBhZGQgYXBwcm9wcmlhdGUgc3BhY2luZyB0byB0ZW1wbGF0ZSlcbiAgIyAtIGNvbnRleHRDbGFzcyAocGxlYXNlIHJlbmFtZSB0byAnY29udGV4dCcpXG4gICMgLSB0aW1lb3V0IChkZWZhdWx0IGlzIDUgc2Vjb25kcylcbiAgIyAtIGRpc21pc3NpYmxlIChkZWZhdWx0IGlzIHRydWUpXG5cbiAgZGlzbWlzczogLT5cbiAgICBAY29sbGVjdGlvbi5yZW1vdmUoQClcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gRmxhc2hNb2RlbFxuIiwiRmxhc2hDb2xsZWN0aW9uID0gcmVxdWlyZSAnLi9jb2xsZWN0aW9uJ1xuXG4jICMgIyAjICNcblxuIyBGbGFzaFNlcnZpY2UgY2xhc3MgZGVmaW5pdGlvblxuIyBEZWZpbmVkIGEgYmFzaWMgc2VydmljZSB0byByZXR1cm4gdGhlIEZsYXNoZXNDb2xsZWN0aW9uXG4jIHdoZW4gcmVxdWVzdGVkLiBUaGlzIGlzIHVzZWQgYnkgdGhlIEZsYXNoQ29tcG9uZW50IHRvIHJldHJpZXZlXG4jIHRoZSBGbGFzaENvbGxlY3Rpb24gaXQgaXMgcmVzcG9uc2libGUgZm9yIHJlbmRlcmluZ1xuY2xhc3MgRmxhc2hTZXJ2aWNlIGV4dGVuZHMgQmFja2JvbmUuTWFyaW9uZXR0ZS5TZXJ2aWNlXG5cbiAgcmFkaW9SZXF1ZXN0czpcbiAgICAnZmxhc2ggY29sbGVjdGlvbic6ICdnZXRDb2xsZWN0aW9uJ1xuXG4gIGFsZXJ0czogbnVsbFxuXG4gIGdldENvbGxlY3Rpb246IC0+XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlIChyZXNvbHZlLHJlamVjdCkgPT5cbiAgICAgIEBhbGVydHMgfHw9IG5ldyBGbGFzaENvbGxlY3Rpb24oKVxuICAgICAgcmVzb2x2ZShAYWxlcnRzKVxuICAgICAgcmV0dXJuXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBGbGFzaFNlcnZpY2UoKVxuIiwiIyBGbGFzaENoaWxkIGNsYXNzIGRlZmluaXRpb25cbiMgRGVmaW5lcyBhIE1hcmlvbmV0dGUuTGF5b3V0VmlldyB0byBkaXNwbGF5IGEgRmxhc2hNb2RlbCBpbnN0YW5jZVxuIyBUaGlzIHZpZXcgYXV0by1kaXNtaXNzZXMgYWZ0ZXIgdGhlIHRpbWVvdXQgZGVmaW5lZCBpbiB0aGUgRmxhc2hNb2RlbCBpbnN0YW5jZVxuY2xhc3MgRmxhc2hDaGlsZCBleHRlbmRzIE1hcmlvbmV0dGUuTGF5b3V0Vmlld1xuICBjbGFzc05hbWU6ICdyb3cnXG4gIHRlbXBsYXRlOiByZXF1aXJlICcuL3RlbXBsYXRlcy9mbGFzaF9jaGlsZCdcblxuICBhdHRyaWJ1dGVzOlxuICAgIHN0eWxlOiAnZGlzcGxheTpub25lOydcblxuICB1aTpcbiAgICBjbG9zZTogJ1tkYXRhLWNsaWNrPWRpc21pc3NdJ1xuXG4gIGV2ZW50czpcbiAgICAnY2xpY2sgQHVpLmNsb3NlJzogJ2Rpc21pc3MnXG5cbiAgb25TaG93OiAtPlxuICAgIHRpbWVvdXQgPSBAbW9kZWwuZ2V0KCd0aW1lb3V0JylcbiAgICBzZXRUaW1lb3V0KCBAZGlzbWlzcywgdGltZW91dCApXG5cbiAgb25BdHRhY2g6IC0+XG4gICAgQCRlbC5mYWRlSW4oKVxuXG4gIHJlbW92ZTogLT5cbiAgICBAJGVsLnNsaWRlVG9nZ2xlKCA9PlxuICAgICAgTWFyaW9uZXR0ZS5MYXlvdXRWaWV3LnByb3RvdHlwZS5yZW1vdmUuY2FsbChAKVxuICAgIClcblxuICBkaXNtaXNzOiA9PlxuICAgIEBtb2RlbC5jb2xsZWN0aW9uPy5yZW1vdmUoIEBtb2RlbCApXG5cbiMgRmxhc2hMaXN0IGNsYXNzIGRlZmluaXRpb25cbiMgRGVmaW5lcyBhIE1hcmlvbmV0dGUuQ29sbGVjdGlvblZpZXcgdG8gdGhlIGxpc3Qgb2YgRmxhc2hlc1xuY2xhc3MgRmxhc2hMaXN0IGV4dGVuZHMgTWFyaW9uZXR0ZS5Db2xsZWN0aW9uVmlld1xuICBjbGFzc05hbWU6ICdjb250YWluZXItZmx1aWQnXG4gIGNoaWxkVmlldzogRmxhc2hDaGlsZFxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBGbGFzaExpc3RcbiIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuO3ZhciBsb2NhbHNfZm9yX3dpdGggPSAobG9jYWxzIHx8IHt9KTsoZnVuY3Rpb24gKGNvbnRleHQsIGRpc21pc3NpYmxlLCBtZXNzYWdlLCBzdHJvbmcpIHtcbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwiY29sLXhzLTEyIHRleHQtY2VudGVyXFxcIj48ZGl2IHJvbGU9XFxcImFsZXJ0XFxcIlwiICsgKGphZGUuY2xzKFsnYWxlcnQnLCdhbGVydC1kaXNtaXNzaWJsZScsJ2ZhZGUnLCdpbicsXCJhbGVydC1cIiArIGNvbnRleHRdLCBbbnVsbCxudWxsLG51bGwsbnVsbCx0cnVlXSkpICsgXCI+XCIpO1xuaWYgKCBkaXNtaXNzaWJsZSlcbntcbmJ1Zi5wdXNoKFwiPGJ1dHRvbiB0eXBlPVxcXCJidXR0b25cXFwiIGRhdGEtY2xpY2s9XFxcImRpc21pc3NcXFwiIGFyaWEtbGFiZWw9XFxcIkNsb3NlXFxcIiBjbGFzcz1cXFwiY2xvc2VcXFwiPjxzcGFuIGFyaWEtaGlkZGVuPVxcXCJ0cnVlXFxcIj7Dlzwvc3Bhbj48c3BhbiBjbGFzcz1cXFwic3Itb25seVxcXCI+Q2xvc2U8L3NwYW4+PC9idXR0b24+XCIpO1xufVxuaWYgKCBzdHJvbmcpXG57XG5idWYucHVzaChcIjxzdHJvbmc+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBzdHJvbmcgKyBcIiBcIikgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9zdHJvbmc+XCIpO1xufVxuaWYgKCBtZXNzYWdlKVxue1xuYnVmLnB1c2goamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBtZXNzYWdlKSA/IFwiXCIgOiBqYWRlX2ludGVycCkpO1xufVxuYnVmLnB1c2goXCI8L2Rpdj48L2Rpdj5cIik7fS5jYWxsKHRoaXMsXCJjb250ZXh0XCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5jb250ZXh0OnR5cGVvZiBjb250ZXh0IT09XCJ1bmRlZmluZWRcIj9jb250ZXh0OnVuZGVmaW5lZCxcImRpc21pc3NpYmxlXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5kaXNtaXNzaWJsZTp0eXBlb2YgZGlzbWlzc2libGUhPT1cInVuZGVmaW5lZFwiP2Rpc21pc3NpYmxlOnVuZGVmaW5lZCxcIm1lc3NhZ2VcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLm1lc3NhZ2U6dHlwZW9mIG1lc3NhZ2UhPT1cInVuZGVmaW5lZFwiP21lc3NhZ2U6dW5kZWZpbmVkLFwic3Ryb25nXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5zdHJvbmc6dHlwZW9mIHN0cm9uZyE9PVwidW5kZWZpbmVkXCI/c3Ryb25nOnVuZGVmaW5lZCkpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsIlxuY2xhc3MgT3ZlcmxheVZpZXcgZXh0ZW5kcyBNbi5MYXlvdXRWaWV3XG4gIHRlbXBsYXRlOiBmYWxzZVxuICBjbGFzc05hbWU6ICdvdmVybGF5J1xuXG4gIGV2ZW50czpcbiAgICAnY2xpY2snOiAnb25DbGljaydcblxuICBvbkNsaWNrOiAtPlxuICAgIEJhY2tib25lLlJhZGlvLmNoYW5uZWwoJ3NpZGViYXInKS50cmlnZ2VyKCdoaWRlJylcblxuIyAjICMgIyAjXG5cbmNsYXNzIE92ZXJsYXlDb21wb25lbnQgZXh0ZW5kcyBNbi5TZXJ2aWNlXG5cbiAgaW5pdGlhbGl6ZTogKG9wdGlvbnMgPSB7fSkgLT5cbiAgICBAY29udGFpbmVyICA9IG9wdGlvbnMuY29udGFpbmVyXG5cbiAgcmFkaW9FdmVudHM6XG4gICAgJ292ZXJsYXkgcmVhZHknOiAgJ29uUmVhZHknXG4gICAgJ292ZXJsYXkgc2hvdyc6ICAgJ3Nob3dPdmVybGF5J1xuICAgICdvdmVybGF5IGhpZGUnOiAgICdoaWRlT3ZlcmxheSdcblxuICBzaG93T3ZlcmxheTogLT5cbiAgICAkKCcub3ZlcmxheS1yZWdpb24nKS5hZGRDbGFzcygnYWN0aXZlJylcblxuICBoaWRlT3ZlcmxheTogLT5cbiAgICAkKCcub3ZlcmxheS1yZWdpb24nKS5yZW1vdmVDbGFzcygnYWN0aXZlJylcblxuICBvblJlYWR5OiAtPlxuICAgIHVubGVzcyBAdmlld1xuICAgICAgQHZpZXcgPSBuZXcgT3ZlcmxheVZpZXcoKVxuICAgICAgQGNvbnRhaW5lci5zaG93KEB2aWV3KVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBPdmVybGF5Q29tcG9uZW50XG4iLCJcbiMgQmFzZVJvdXRlIGNsYXNzIGRlZmluaXRpb25cbiMgVGhlIGJhc2Ugcm91dGUgcmVkdWNlcyByZXBlYXRlZCBjb2RlIGJ5XG4jIGF0dGFjaGluZyB0aGUgQGNvbnRhaW5lciBwcm9wZXJ0eSBwYXNzZWQgaW4gZnJvbVxuIyB0aGUgcm91dGVyLiBUaGlzIHByb3BlcnR5IGlzIHVzZWQgdG8gZGlzcGxheSB2aWV3cyBpbiB0aGUgYXBwXG5jbGFzcyBCYXNlUm91dGUgZXh0ZW5kcyBCYWNrYm9uZS5Sb3V0aW5nLlJvdXRlXG5cbiAgYnJlYWRjcnVtYnM6IFtdXG5cbiAgaW5pdGlhbGl6ZTogKG9wdGlvbnMpIC0+XG5cbiAgICAjIEF0dGFjaGVzIG9wdGlvbnNcbiAgICBAb3B0aW9ucyA9IG9wdGlvbnNcblxuICAgICMgQXR0YWNoZXMgY29udGFpbmVyXG4gICAgQGNvbnRhaW5lciA9IG9wdGlvbnMuY29udGFpbmVyXG5cbiAgICAjIEV2ZW50IGhhbmRsZXJzXG4gICAgQG9uICdiZWZvcmU6ZW50ZXInLCA9PiBAb25CZWZvcmVFbnRlcj8oYXJndW1lbnRzKVxuICAgIEBvbiAnYmVmb3JlOmZldGNoJywgPT4gQG9uQmVmb3JlRmV0Y2g/KGFyZ3VtZW50cylcbiAgICBAb24gJ2JlZm9yZTpyZW5kZXInLCA9PiBAb25CZWZvcmVSZW5kZXI/KGFyZ3VtZW50cylcbiAgICBAb24gJ2ZldGNoJywgPT4gQG9uRmV0Y2g/KGFyZ3VtZW50cylcbiAgICBAb24gJ3JlbmRlcicsID0+IEBvblJlbmRlcj8oYXJndW1lbnRzKVxuICAgIEBvbiAnZW50ZXInLCA9PiBAb25FbnRlcj8oYXJndW1lbnRzKVxuXG4gICAgIyBIaWRlcyBzaWRlYmFyIGNvbXBvbmVudFxuICAgIEJhY2tib25lLlJhZGlvLmNoYW5uZWwoJ3NpZGViYXInKS50cmlnZ2VyKCdoaWRlJylcblxuICBfc2V0UGFnZVRpdGxlOiAtPlxuICAgIGRvY3VtZW50LnRpdGxlID0gXy5yZXN1bHQgQCwgJ3RpdGxlJ1xuXG4gIF91cGRhdGVCcmVhZGNydW1iczogLT5cbiAgICBicmVhZGNydW1icyA9IF8ucmVzdWx0IEAsICdicmVhZGNydW1icydcbiAgICBCYWNrYm9uZS5SYWRpby5jaGFubmVsKCdicmVhZGNydW1iJykudHJpZ2dlcignc2V0JywgYnJlYWRjcnVtYnMpIGlmIGJyZWFkY3J1bWJzXG5cbiAgb25GZXRjaDogLT5cbiAgICBAX3NldFBhZ2VUaXRsZSgpXG4gICAgQF91cGRhdGVCcmVhZGNydW1icygpXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJhc2VSb3V0ZVxuIiwiXG4jIEJhc2VSb3V0ZXIgY2xhc3MgZGVmaW5pdGlvblxuIyBUaGUgYmFzZSByb3V0ZXIgcmVkdWNlcyByZXBlYXRlZCBjb2RlIGJ5XG4jIGF0dGFjaGluZyB0aGUgQGNvbnRhaW5lciBwcm9wZXJ0eSBwYXNzZWQgaW4gZnJvbSB3aGVuIGluc3RhbnRpYXRlZC5cbiMgVGhpcyBwcm9wZXJ0eSBpcyBzdWJzZXF1ZW50bHkgcGFzc2VkIHRvIGFsbCByb3V0ZXMgY3JlYXRlZCBpbnNpZGVcbiMgcm91dGVycyBzdWJjbGFzc2VkIGZyb20gdGhpcyBkZWZpbml0aW9uXG5jbGFzcyBCYXNlUm91dGVyIGV4dGVuZHMgQmFja2JvbmUuUm91dGluZy5Sb3V0ZXJcblxuICBpbml0aWFsaXplOiAob3B0aW9ucykgLT4gQGNvbnRhaW5lciA9IG9wdGlvbnMuY29udGFpbmVyXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJhc2VSb3V0ZXJcbiIsIlxuY2xhc3MgTmF2Q2hpbGQgZXh0ZW5kcyBNbi5MYXlvdXRWaWV3XG4gIHRhZ05hbWU6ICdsaSdcbiAgY2xhc3NOYW1lOiAnbmF2LWl0ZW0nXG4gIHRlbXBsYXRlOiByZXF1aXJlICcuL3RlbXBsYXRlcy9uYXZfY2hpbGQnXG5cbiAgYmVoYXZpb3JzOlxuICAgIFNlbGVjdGFibGVDaGlsZDoge31cblxuICBjbGFzc05hbWU6IC0+XG4gICAgY3NzID0gJ25hdi1pdGVtJ1xuICAgIGNzcyArPSAnIGFjdGl2ZScgaWYgQG1vZGVsLmdldCgnYWN0aXZlJylcbiAgICBjc3MgKz0gJyBkcm9wZG93bicgaWYgQG1vZGVsLmdldCgnZHJvcGRvd24nKVxuICAgIHJldHVybiBjc3NcblxuICBvblJlbmRlcjogLT5cbiAgICBAdHJpZ2dlck1ldGhvZCgnc2VsZWN0ZWQnKSBpZiBAbW9kZWwuZ2V0KCdhY3RpdmUnKVxuXG4gIG9uQ2xpY2s6IChlKSAtPlxuICAgIHJldHVybiBpZiBAbW9kZWwuZ2V0KCdocmVmJylcbiAgICByZXR1cm4gaWYgQG1vZGVsLmdldCgnZHJvcGRvd24nKVxuICAgIHJldHVybiBpZiBAJGVsLmhhc0NsYXNzKCdhY3RpdmUnKVxuICAgIGU/LnByZXZlbnREZWZhdWx0KClcbiAgICBAdHJpZ2dlck1ldGhvZCgnc2VsZWN0ZWQnKVxuICAgIEAkZWwuYWRkQ2xhc3MoJ2FjdGl2ZScpLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpXG5cbiMgIyAjICMgI1xuXG5jbGFzcyBOYXZMaXN0IGV4dGVuZHMgTW4uQ29sbGVjdGlvblZpZXdcbiAgdGFnTmFtZTogJ3VsJ1xuICBjaGlsZFZpZXc6IE5hdkNoaWxkXG5cbiAgY2xhc3NOYW1lOiAtPlxuICAgIGNzcyA9ICduYXYnXG4gICAgcmV0dXJuIGNzcyArPSAnIG5hdi1waWxscyBuYXYtc3RhY2tlZCcgIGlmIEBvcHRpb25zLnN0YWNrZWRcbiAgICByZXR1cm4gY3NzICs9ICcgbmF2LXBpbGxzJyAgICAgICAgICAgICAgaWYgQG9wdGlvbnMucGlsbHNcbiAgICByZXR1cm4gY3NzICs9ICcgbmF2LXRhYnMnXG5cbiAgY2hpbGRFdmVudHM6XG4gICAgJ3NlbGVjdGVkJzogJ29uQ2hpbGRTZWxlY3RlZCdcblxuICBvbkNoaWxkU2VsZWN0ZWQ6ICh2aWV3KSAtPlxuICAgIEB0cmlnZ2VyICduYXY6Y2hhbmdlJywgdmlld1xuICAgIHJldHVybiBAdHJpZ2dlcih2aWV3Lm1vZGVsLmdldCgndHJpZ2dlcicpKVxuXG4jICMgIyAjICNcblxuY2xhc3MgTmF2VmlldyBleHRlbmRzIE1uLkxheW91dFZpZXdcbiAgdGVtcGxhdGU6IHJlcXVpcmUgJy4vdGVtcGxhdGVzL25hdidcblxuICByZWdpb25zOlxuICAgIG5hdlJlZ2lvbjogICAgICAnW2RhdGEtcmVnaW9uPW5hdl0nXG4gICAgY29udGVudFJlZ2lvbjogICdbZGF0YS1yZWdpb249Y29udGVudF0nXG5cbiAgIyBJbmNsdWRlcyBWaWV3U3RhdGUgYmVoYXZpb3IgaWYgdGhlIHN0YXRlZnVsIG9wdGlvbiBoYXMgYmVlbiBzZXRcbiAgYmVoYXZpb3JzOiAtPlxuICAgIHJldHVybiB7IFZpZXdTdGF0ZTogeyBrZXk6IEBuYXZPcHRpb25zLnN0YXRlZnVsIH0gfSBpZiBAbmF2T3B0aW9ucy5zdGF0ZWZ1bFxuICAgIHJldHVybiB7fVxuXG4gICMgSXRlbXMgZm9yIE5hdkxpc3RcbiAgbmF2SXRlbXM6IFt7IGljb246ICdmYS10aW1lcycsIHRleHQ6ICdEZWZhdWx0IE5hdicsIHRyaWdnZXI6ICdkZWZhdWx0JyB9XVxuXG4gICMgT3B0aW9ucyBmb3IgTmF2TGlzdCAtIHRhYnMgKGRlZmF1bHQpIC8gcGlsbHMgLyBzdGFja2VkIC8gZGVmYXVsdCAvIHN0YXRlZnVsXG4gICMgbmF2T3B0aW9uczogeyBwaWxsczogdHJ1ZSwgc3RhY2tlZDogdHJ1ZSwgc3RhdGVmdWw6ICdzb21lS2V5Rm9yTG9jYWxTdG9yYWdlJyB9XG4gIG5hdk9wdGlvbnM6IHt9XG5cbiAgIyBFdmVudHMgcmVnaXN0cnkgZm9yIG5hdkl0ZW1zXG4gIG5hdkV2ZW50czoge31cblxuICBpbml0aWFsaXplOiAtPlxuICAgIEBuYXZPcHRpb25zID0gXy5yZXN1bHQoQCwgJ25hdk9wdGlvbnMnKSB8fCB7fVxuICAgIEBuYXZJdGVtcyAgID0gXy5yZXN1bHQoQCwgJ25hdkl0ZW1zJylcblxuICAgICMgU2V0cyBhY3RpdmUgbmF2XG4gICAgdHJpZ2dlciA9IEBfZ2V0QWN0aXZlTmF2KClcbiAgICByZXR1cm4gdW5sZXNzIHRyaWdnZXJcbiAgICBfLm1hcChAbmF2SXRlbXMsIChpdGVtKSAtPlxuICAgICAgICByZXR1cm4gaXRlbS5hY3RpdmUgPSB0cnVlIGlmIGl0ZW0udHJpZ2dlciA9PSB0cmlnZ2VyXG4gICAgICAgIHJldHVybiBpdGVtLmFjdGl2ZSA9IGZhbHNlXG4gICAgKVxuXG4gIHRlbXBsYXRlSGVscGVyczogLT5cbiAgICByZXR1cm4geyBzdGFja2VkOiBAbmF2T3B0aW9ucy5zdGFja2VkIHx8IG51bGwgfVxuXG4gICMgR2V0cyBhY3RpdmVUYWIgZnJvbSBzdGF0ZSB8fCBkZWZhdWx0cyB8fCBmaXJzdFxuICBfZ2V0QWN0aXZlTmF2OiA9PlxuICAgIGlmIEBuYXZPcHRpb25zLnN0YXRlZnVsXG4gICAgICBzdGF0ZSA9IEBnZXRTdGF0ZSgpXG4gICAgICByZXR1cm4gc3RhdGUgaWYgc3RhdGVcblxuICAgIHJldHVybiBfLmZpbmRXaGVyZShAbmF2SXRlbXMsIHsgZGVmYXVsdDogdHJ1ZSB9KT8udHJpZ2dlciB8fCBudWxsXG5cbiAgIyBTZXRzIGFjdGl2ZVRhYiBvbiBjaGFuZ2VcbiAgX3NldEFjdGl2ZU5hdjogKG5hdkNoaWxkVmlldykgLT5cbiAgICBAYWN0aXZlTmF2ID0gbmF2Q2hpbGRWaWV3XG4gICAgcmV0dXJuIHVubGVzcyBAbmF2T3B0aW9ucy5zdGF0ZWZ1bFxuICAgIHJldHVybiBAc2V0U3RhdGUobmF2Q2hpbGRWaWV3Lm1vZGVsLmdldCgndHJpZ2dlcicpKVxuXG4gIHRyaWdnZXJBY3RpdmVOYXY6IC0+XG4gICAgQGFjdGl2ZU5hdj8udHJpZ2dlcignc2VsZWN0ZWQnKVxuXG4gIHNob3dOYXZWaWV3OiAtPlxuICAgICMgSW5zdGFudGlhdGVzIEBuYXZDb2xsZWN0aW9uXG4gICAgQG5hdkNvbGxlY3Rpb24gPSBuZXcgQmFja2JvbmUuQ29sbGVjdGlvbihAbmF2SXRlbXMpXG5cbiAgICAjIEluc3RhbnRpYXRlcyBOYXZMaXN0IHZpZXcgYW5kIGJpbmRzIGV2ZW50cyB0byB0aGlzIHZpZXdcbiAgICBAbmF2TGlzdCA9IG5ldyBOYXZMaXN0KCBfLmV4dGVuZChAbmF2T3B0aW9ucywgeyBjb2xsZWN0aW9uOiBAbmF2Q29sbGVjdGlvbiB9KSApXG4gICAgQG5hdkxpc3Qub24gJ25hdjpjaGFuZ2UnLCAobmF2Q2hpbGRWaWV3KSA9PiBAX3NldEFjdGl2ZU5hdihuYXZDaGlsZFZpZXcpXG4gICAgTW4uYmluZEVudGl0eUV2ZW50cyggQCwgQG5hdkxpc3QsIF8ucmVzdWx0KEAsICduYXZFdmVudHMnKSApXG4gICAgQG5hdlJlZ2lvbi5zaG93KEBuYXZMaXN0KVxuXG4gIG9uUmVuZGVyOiAtPlxuICAgIEBzaG93TmF2VmlldygpXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IE5hdlZpZXdcbiIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuO3ZhciBsb2NhbHNfZm9yX3dpdGggPSAobG9jYWxzIHx8IHt9KTsoZnVuY3Rpb24gKHNwYW4sIHN0YWNrZWQpIHtcbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwicm93XFxcIj5cIik7XG5pZiAoIHN0YWNrZWQpXG57XG5idWYucHVzaChcIjxkaXYgZGF0YS1yZWdpb249XFxcIm5hdlxcXCJcIiArIChqYWRlLmNscyhbXCJjb2wteHMtXCIgKyAoc3BhbikgKyBcIlwiXSwgW3RydWVdKSkgKyBcIj48L2Rpdj48ZGl2IGRhdGEtcmVnaW9uPVxcXCJjb250ZW50XFxcIlwiICsgKGphZGUuY2xzKFtcImNvbC14cy1cIiArICgxMi1zcGFuKSArIFwiXCJdLCBbdHJ1ZV0pKSArIFwiPjwvZGl2PlwiKTtcbn1cbmVsc2VcbntcbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwiY29sLXhzLTEyXFxcIj48ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPjxkaXYgZGF0YS1yZWdpb249XFxcIm5hdlxcXCIgY2xhc3M9XFxcImNvbC14cy0xMlxcXCI+PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz1cXFwicm93IG0tdC0xXFxcIj48ZGl2IGRhdGEtcmVnaW9uPVxcXCJjb250ZW50XFxcIiBjbGFzcz1cXFwiY29sLXhzLTEyXFxcIj48L2Rpdj48L2Rpdj48L2Rpdj5cIik7XG59XG5idWYucHVzaChcIjwvZGl2PlwiKTt9LmNhbGwodGhpcyxcInNwYW5cIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnNwYW46dHlwZW9mIHNwYW4hPT1cInVuZGVmaW5lZFwiP3NwYW46dW5kZWZpbmVkLFwic3RhY2tlZFwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGguc3RhY2tlZDp0eXBlb2Ygc3RhY2tlZCE9PVwidW5kZWZpbmVkXCI/c3RhY2tlZDp1bmRlZmluZWQpKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcbjt2YXIgbG9jYWxzX2Zvcl93aXRoID0gKGxvY2FscyB8fCB7fSk7KGZ1bmN0aW9uIChkcm9wZG93biwgaHJlZiwgaWNvbiwgbGlua0NzcywgdGV4dCwgdHJpZ2dlciwgdW5kZWZpbmVkKSB7XG5pZiAoICFkcm9wZG93bilcbntcbmJ1Zi5wdXNoKFwiPGFcIiArIChqYWRlLmF0dHIoXCJocmVmXCIsIGhyZWYsIHRydWUsIGZhbHNlKSkgKyAoamFkZS5hdHRyKFwiZGF0YS10cmlnZ2VyXCIsIHRyaWdnZXIsIHRydWUsIGZhbHNlKSkgKyAoamFkZS5jbHMoWyduYXYtbGluaycsJ2N1cnNvci1wb2ludGVyJyxsaW5rQ3NzXSwgW251bGwsbnVsbCx0cnVlXSkpICsgXCI+XCIpO1xuaWYgKCBpY29uKVxue1xuYnVmLnB1c2goXCI8aVwiICsgKGphZGUuY2xzKFsnZmEnLCdmYS1mdycsaWNvbl0sIFtudWxsLG51bGwsdHJ1ZV0pKSArIFwiPjwvaT4mbmJzcDtcIik7XG59XG5idWYucHVzaCgoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSB0ZXh0KSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L2E+XCIpO1xufVxuZWxzZVxue1xuYnVmLnB1c2goXCI8YSBkYXRhLXRvZ2dsZT1cXFwiZHJvcGRvd25cXFwiIGNsYXNzPVxcXCJuYXYtbGluayBjdXJzb3ItcG9pbnRlciBkcm9wZG93bi10b2dnbGVcXFwiPlwiKTtcbmlmICggaWNvbilcbntcbmJ1Zi5wdXNoKFwiPGlcIiArIChqYWRlLmNscyhbJ2ZhJywnZmEtZncnLGljb25dLCBbbnVsbCxudWxsLHRydWVdKSkgKyBcIj48L2k+Jm5ic3A7XCIpO1xufVxuYnVmLnB1c2goKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gdGV4dCkgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9hPjxkaXYgY2xhc3M9XFxcImRyb3Bkb3duLW1lbnUgdy0xMDBcXFwiPlwiKTtcbi8vIGl0ZXJhdGUgZHJvcGRvd25cbjsoZnVuY3Rpb24oKXtcbiAgdmFyICQkb2JqID0gZHJvcGRvd247XG4gIGlmICgnbnVtYmVyJyA9PSB0eXBlb2YgJCRvYmoubGVuZ3RoKSB7XG5cbiAgICBmb3IgKHZhciAkaW5kZXggPSAwLCAkJGwgPSAkJG9iai5sZW5ndGg7ICRpbmRleCA8ICQkbDsgJGluZGV4KyspIHtcbiAgICAgIHZhciBpdGVtID0gJCRvYmpbJGluZGV4XTtcblxuYnVmLnB1c2goXCI8YSBjbGFzcz1cXFwiZHJvcGRvd24taXRlbVxcXCI+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBpdGVtLnRleHQpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvYT5cIik7XG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgdmFyICQkbCA9IDA7XG4gICAgZm9yICh2YXIgJGluZGV4IGluICQkb2JqKSB7XG4gICAgICAkJGwrKzsgICAgICB2YXIgaXRlbSA9ICQkb2JqWyRpbmRleF07XG5cbmJ1Zi5wdXNoKFwiPGEgY2xhc3M9XFxcImRyb3Bkb3duLWl0ZW1cXFwiPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gaXRlbS50ZXh0KSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L2E+XCIpO1xuICAgIH1cblxuICB9XG59KS5jYWxsKHRoaXMpO1xuXG5idWYucHVzaChcIjwvZGl2PlwiKTtcbn19LmNhbGwodGhpcyxcImRyb3Bkb3duXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5kcm9wZG93bjp0eXBlb2YgZHJvcGRvd24hPT1cInVuZGVmaW5lZFwiP2Ryb3Bkb3duOnVuZGVmaW5lZCxcImhyZWZcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLmhyZWY6dHlwZW9mIGhyZWYhPT1cInVuZGVmaW5lZFwiP2hyZWY6dW5kZWZpbmVkLFwiaWNvblwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGguaWNvbjp0eXBlb2YgaWNvbiE9PVwidW5kZWZpbmVkXCI/aWNvbjp1bmRlZmluZWQsXCJsaW5rQ3NzXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5saW5rQ3NzOnR5cGVvZiBsaW5rQ3NzIT09XCJ1bmRlZmluZWRcIj9saW5rQ3NzOnVuZGVmaW5lZCxcInRleHRcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnRleHQ6dHlwZW9mIHRleHQhPT1cInVuZGVmaW5lZFwiP3RleHQ6dW5kZWZpbmVkLFwidHJpZ2dlclwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgudHJpZ2dlcjp0eXBlb2YgdHJpZ2dlciE9PVwidW5kZWZpbmVkXCI/dHJpZ2dlcjp1bmRlZmluZWQsXCJ1bmRlZmluZWRcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnVuZGVmaW5lZDp0eXBlb2YgdW5kZWZpbmVkIT09XCJ1bmRlZmluZWRcIj91bmRlZmluZWQ6dW5kZWZpbmVkKSk7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwiXG5jbGFzcyBQYWdpbmF0aW9uVmlldyBleHRlbmRzIE1uLkxheW91dFZpZXdcbiAgdGFnTmFtZTogJ3VsJ1xuICB0ZW1wbGF0ZTogcmVxdWlyZSAnLi90ZW1wbGF0ZXMvcGFnaW5hdGlvbidcblxuICBjbGFzc05hbWU6IC0+XG4gICAgcmV0dXJuICdwYWdlcicgaWYgQG9wdGlvbnMucGFnZXJcbiAgICByZXR1cm4gJ3BhZ2luYXRpb24nXG5cbiAgZ2V0VGVtcGxhdGU6IC0+XG4gICAgcmV0dXJuIHJlcXVpcmUoJy4vdGVtcGxhdGVzL3BhZ2VyJykgaWYgQG9wdGlvbnMucGFnZXJcbiAgICByZXR1cm4gcmVxdWlyZSAnLi90ZW1wbGF0ZXMvcGFnaW5hdGlvbidcblxuICB1aTpcbiAgICBmaXJzdDogJ1tkYXRhLWNsaWNrPWZpcnN0XSdcbiAgICBwcmV2OiAnW2RhdGEtY2xpY2s9cHJldl0nXG4gICAgcGFnZTogJ1tkYXRhLWNsaWNrPXBhZ2VdJ1xuICAgIG5leHQ6ICdbZGF0YS1jbGljaz1uZXh0XSdcbiAgICBsYXN0OiAnW2RhdGEtY2xpY2s9bGFzdF0nXG5cbiAgZXZlbnRzOlxuICAgICdjbGljayBAdWkuZmlyc3QnOiAnZmlyc3RQYWdlJ1xuICAgICdjbGljayBAdWkucHJldic6ICdwcmV2UGFnZSdcbiAgICAnY2xpY2sgQHVpLnBhZ2UnOiAnZ29Ub1BhZ2UnXG4gICAgJ2NsaWNrIEB1aS5uZXh0JzogJ25leHRQYWdlJ1xuICAgICdjbGljayBAdWkubGFzdCc6ICdsYXN0UGFnZSdcblxuICBjb2xsZWN0aW9uRXZlbnRzOlxuICAgICdyZXNldCc6ICAncmVuZGVyJ1xuXG4gICMgIyAjICMgI1xuICAjIFBhZ2luZyBDYWxsYmFja3NcbiAgZmlyc3RQYWdlOiAtPiBAY29sbGVjdGlvbi5maXJzdFBhZ2UoKVxuICBwcmV2UGFnZTogLT4gIEBjb2xsZWN0aW9uLnByZXZQYWdlKClcbiAgbmV4dFBhZ2U6IC0+ICBAY29sbGVjdGlvbi5uZXh0UGFnZSgpXG4gIGxhc3RQYWdlOiAtPiAgQGNvbGxlY3Rpb24ubGFzdFBhZ2UoKVxuXG4gIGdvVG9QYWdlOiAoZSkgLT5cbiAgICBAY29sbGVjdGlvbi5nZXRQYWdlKCBAJChlLmN1cnJlbnRUYXJnZXQpLmRhdGEoJ3BhZ2UnKSApXG4gICNcbiAgIyAjICMgIyAjXG5cbiAgb25SZW5kZXI6IC0+XG4gICAgQHN0YXRlLnRvdGFsUGFnZXMgPD0gMSAmJiBAJGVsLmhpZGUoKSB8fCBAJGVsLnNob3coKVxuXG4gIHRlbXBsYXRlSGVscGVyczogLT5cbiAgICByZXR1cm4gQHdpbmRvd2VkUGFnZU51bWJlcigpXG5cbiAgIyBSZXR1cm5zIGFycmF5IHRoYXQgbG9vayBsaWtlIFsxLDIsXCIuLi5cIiw1LDYsNyw4LFwiLi4uXCIsIDE5LDIwXVxuICAjICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBeICAgICAgICAgICAgXiAgICAgICAgICAgICBeXG4gICMgICAgICAgICAgICAgICAgICAgICAgICAgb3V0ZXJfd2luZG93ICBpbm5lcl93aW5kb3cgIG91dGVyX3dpbmRvd1xuICB3aW5kb3dlZFBhZ2VOdW1iZXI6IC0+XG4gICAgQHN0YXRlID0gXy5jbG9uZSBAY29sbGVjdGlvbi5zdGF0ZVxuXG4gICAgIyBGRUFUVVJFIC0gdGhpcyBjYW4gdXNlIGEgdGlnaHRlbi11cC4gV2Ugc2hvdWxkIGJlIGFibGUgdG8gc2V0IG1heC1wYWdlcy1kaXNwbGF5ZWQgKG5hbWU/KVxuICAgIGlubmVyX3dpbmRvdyA9IDRcbiAgICBvdXRlcl93aW5kb3cgPSAxXG5cbiAgICB3aW5kb3dfZnJvbSA9IEBzdGF0ZS5jdXJyZW50UGFnZSAtIGlubmVyX3dpbmRvd1xuICAgIHdpbmRvd190byAgID0gQHN0YXRlLmN1cnJlbnRQYWdlICsgaW5uZXJfd2luZG93XG5cbiAgICBpZiB3aW5kb3dfdG8gPiBAc3RhdGUudG90YWxQYWdlc1xuICAgICAgd2luZG93X2Zyb20gLT0gd2luZG93X3RvIC0gQHN0YXRlLnRvdGFsUGFnZXNcbiAgICAgIHdpbmRvd190byAgICA9IEBzdGF0ZS50b3RhbFBhZ2VzXG5cbiAgICBpZiB3aW5kb3dfZnJvbSA8IDFcbiAgICAgIHdpbmRvd190byAgKz0gMSAtIHdpbmRvd19mcm9tXG4gICAgICB3aW5kb3dfZnJvbSA9IDFcbiAgICAgIHdpbmRvd190byAgID0gQHN0YXRlLnRvdGFsUGFnZXMgaWYgd2luZG93X3RvID4gQHN0YXRlLnRvdGFsUGFnZXNcblxuICAgIG1pZGRsZSA9IFt3aW5kb3dfZnJvbS4ud2luZG93X3RvXVxuXG4gICAgIyBDYWxjdWxhdGUgTGVmdFxuICAgIGlmIG91dGVyX3dpbmRvdyArIDMgPCBtaWRkbGVbMF1cbiAgICAgIGxlZnQgPSBbMS4uKG91dGVyX3dpbmRvdyArIDEpXVxuICAgICAgbGVmdC5wdXNoIFwiLi4uXCJcbiAgICBlbHNlXG4gICAgICBsZWZ0ID0gWzEuLi5taWRkbGVbMF1dXG5cbiAgICAjIENhbGN1bGF0ZSBSaWdodFxuICAgIGlmIChAc3RhdGUudG90YWxQYWdlcyAtIG91dGVyX3dpbmRvdyAtIDIpID4gbWlkZGxlW21pZGRsZS5sZW5ndGggLSAxXVxuICAgICAgcmlnaHQgPSBbKEBzdGF0ZS50b3RhbFBhZ2VzIC0gb3V0ZXJfd2luZG93KS4uQHN0YXRlLnRvdGFsUGFnZXNdXG4gICAgICByaWdodC51bnNoaWZ0IFwiLi4uXCJcbiAgICBlbHNlXG4gICAgICByaWdodF9zdGFydCA9IE1hdGgubWluKG1pZGRsZVttaWRkbGUubGVuZ3RoIC0gMV0gKyAxLCBAc3RhdGUudG90YWxQYWdlcylcbiAgICAgIHJpZ2h0ID0gW3JpZ2h0X3N0YXJ0Li5Ac3RhdGUudG90YWxQYWdlc11cbiAgICAgIHJpZ2h0ID0gW10gaWYgcmlnaHRfc3RhcnQgaXMgQHN0YXRlLnRvdGFsUGFnZXNcblxuICAgICMgU2hvd24gcGFnZXM/XG4gICAgQHN0YXRlLnNob3duID0gbGVmdC5jb25jYXQobWlkZGxlLmNvbmNhdChyaWdodCkpXG4gICAgQHN0YXRlLmVtcHR5ID0gXy5pc0VtcHR5KCBAc3RhdGUuc2hvd24gKVxuXG4gICAgIyBDb3VudGVyXG4gICAgIyBGRUFUVVJFIC0gaW5jbHVkZSBjb3VudGVyIGNvbmRpdGlvbmFsbHlcbiAgICBzdGFydCA9IGlmIEBzdGF0ZS5jdXJyZW50UGFnZSA+IDEgdGhlbiAoKCBAc3RhdGUuY3VycmVudFBhZ2UgLSAxICkgKiBAc3RhdGUucGFnZVNpemUpIGVsc2UgMVxuXG4gICAgZW5kID0gKChAc3RhdGUuY3VycmVudFBhZ2UgLSAxKSAqIEBzdGF0ZS5wYWdlU2l6ZSkgKyBAc3RhdGUucGFnZVNpemVcbiAgICBlbmQgPSBpZiBlbmQgPiBAc3RhdGUudG90YWxSZWNvcmRzIHRoZW4gQHN0YXRlLnRvdGFsUmVjb3JkcyBlbHNlIGVuZFxuXG4gICAgQHN0YXRlLmRpc3BsYXlUZXh0ID0gXCIje3N0YXJ0fSAtICN7ZW5kfSBvZiAje0BzdGF0ZS50b3RhbFJlY29yZHN9ICN7QG9wdGlvbnMucGx1cmFsIHx8ICdpdGVtcyd9XCJcblxuXG4gICAgcmV0dXJuIEBzdGF0ZVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBQYWdpbmF0aW9uVmlld1xuIiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG47dmFyIGxvY2Fsc19mb3Jfd2l0aCA9IChsb2NhbHMgfHwge30pOyhmdW5jdGlvbiAoYXR0cnMsIGN1cnJlbnRQYWdlLCBkaXNwbGF5VGV4dCwgdG90YWxQYWdlcykge1xuYXR0cnMgPSB7IHN0eWxlOiAnYm9yZGVyLXJhZGl1czogMDsnIH1cbmlmICggY3VycmVudFBhZ2UgLSAxID4gMClcbntcbmJ1Zi5wdXNoKFwiPGxpIGNsYXNzPVxcXCJwYWdlci1wcmV2XFxcIj48YVwiICsgKGphZGUuYXR0cnMoamFkZS5tZXJnZShbe1wiZGF0YS1jbGlja1wiOiBcInByZXZcIixcImNsYXNzXCI6IFwiY3Vyc29yLXBvaW50ZXIgei1kZXB0aC0xXCJ9LGF0dHJzXSksIGZhbHNlKSkgKyBcIj48aSBjbGFzcz1cXFwiZmEgZmEtYW5nbGUtbGVmdFxcXCI+PC9pPjwvYT48L2xpPlwiKTtcbn1cbmVsc2VcbntcbmJ1Zi5wdXNoKFwiPGxpIGNsYXNzPVxcXCJkaXNhYmxlZCBwYWdlci1wcmV2XFxcIj48YVwiICsgKGphZGUuYXR0cnMoamFkZS5tZXJnZShbYXR0cnNdKSwgZmFsc2UpKSArIFwiPjxpIGNsYXNzPVxcXCJmYSBmYS1hbmdsZS1sZWZ0XFxcIj48L2k+PC9hPjwvbGk+XCIpO1xufVxuYnVmLnB1c2goXCI8bGk+PGEgc3R5bGU9XFxcImJvcmRlcjpub25lO2JhY2tncm91bmQ6bm9uZTtcXFwiPjxkaXYgY2xhc3M9XFxcInRleHQtbXV0ZWQgdGV4dC1jZW50ZXJcXFwiPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gZGlzcGxheVRleHQpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvZGl2PjwvYT48L2xpPlwiKTtcbmlmICggY3VycmVudFBhZ2UgPCB0b3RhbFBhZ2VzKVxue1xuYnVmLnB1c2goXCI8bGkgY2xhc3M9XFxcInBhZ2VyLW5leHRcXFwiPjxhXCIgKyAoamFkZS5hdHRycyhqYWRlLm1lcmdlKFt7XCJkYXRhLWNsaWNrXCI6IFwibmV4dFwiLFwiY2xhc3NcIjogXCJjdXJzb3ItcG9pbnRlciB6LWRlcHRoLTFcIn0sYXR0cnNdKSwgZmFsc2UpKSArIFwiPjxpIGNsYXNzPVxcXCJmYSBmYS1hbmdsZS1yaWdodFxcXCI+PC9pPjwvYT48L2xpPlwiKTtcbn1cbmVsc2VcbntcbmJ1Zi5wdXNoKFwiPGxpIGNsYXNzPVxcXCJkaXNhYmxlZCBwYWdlci1uZXh0XFxcIj48YVwiICsgKGphZGUuYXR0cnMoamFkZS5tZXJnZShbYXR0cnNdKSwgZmFsc2UpKSArIFwiPjxpIGNsYXNzPVxcXCJmYSBmYS1hbmdsZS1yaWdodFxcXCI+PC9pPjwvYT48L2xpPlwiKTtcbn19LmNhbGwodGhpcyxcImF0dHJzXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5hdHRyczp0eXBlb2YgYXR0cnMhPT1cInVuZGVmaW5lZFwiP2F0dHJzOnVuZGVmaW5lZCxcImN1cnJlbnRQYWdlXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5jdXJyZW50UGFnZTp0eXBlb2YgY3VycmVudFBhZ2UhPT1cInVuZGVmaW5lZFwiP2N1cnJlbnRQYWdlOnVuZGVmaW5lZCxcImRpc3BsYXlUZXh0XCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5kaXNwbGF5VGV4dDp0eXBlb2YgZGlzcGxheVRleHQhPT1cInVuZGVmaW5lZFwiP2Rpc3BsYXlUZXh0OnVuZGVmaW5lZCxcInRvdGFsUGFnZXNcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnRvdGFsUGFnZXM6dHlwZW9mIHRvdGFsUGFnZXMhPT1cInVuZGVmaW5lZFwiP3RvdGFsUGFnZXM6dW5kZWZpbmVkKSk7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG47dmFyIGxvY2Fsc19mb3Jfd2l0aCA9IChsb2NhbHMgfHwge30pOyhmdW5jdGlvbiAoY3VycmVudFBhZ2UsIGVtcHR5LCBzaG93biwgdG90YWxQYWdlcywgdW5kZWZpbmVkKSB7XG5pZiAoIGN1cnJlbnRQYWdlICE9IDEpXG57XG5idWYucHVzaChcIjxsaSBjbGFzcz1cXFwicGFnZS1pdGVtXFxcIj48YSBkYXRhLWNsaWNrPVxcXCJmaXJzdFxcXCIgY2xhc3M9XFxcInBhZ2UtbGluayBjdXJzb3ItcG9pbnRlclxcXCI+PGkgY2xhc3M9XFxcImZhIGZhLWFuZ2xlLWRvdWJsZS1sZWZ0XFxcIj48L2k+PC9hPjwvbGk+XCIpO1xufVxuZWxzZVxue1xuYnVmLnB1c2goXCI8bGkgY2xhc3M9XFxcInBhZ2UtaXRlbSBkaXNhYmxlZFxcXCI+PGEgY2xhc3M9XFxcInBhZ2UtbGlua1xcXCI+PGkgY2xhc3M9XFxcImZhIGZhLWFuZ2xlLWRvdWJsZS1sZWZ0XFxcIj48L2k+PC9hPjwvbGk+XCIpO1xufVxuaWYgKCBjdXJyZW50UGFnZSAtIDEgPiAwKVxue1xuYnVmLnB1c2goXCI8bGkgY2xhc3M9XFxcInBhZ2UtaXRlbVxcXCI+PGEgZGF0YS1jbGljaz1cXFwicHJldlxcXCIgY2xhc3M9XFxcInBhZ2UtbGluayBjdXJzb3ItcG9pbnRlclxcXCI+PGkgY2xhc3M9XFxcImZhIGZhLWFuZ2xlLWxlZnRcXFwiPjwvaT48L2E+PC9saT5cIik7XG59XG5lbHNlXG57XG5idWYucHVzaChcIjxsaSBjbGFzcz1cXFwicGFnZS1pdGVtIGRpc2FibGVkXFxcIj48YSBjbGFzcz1cXFwicGFnZS1saW5rXFxcIj48aSBjbGFzcz1cXFwiZmEgZmEtYW5nbGUtbGVmdFxcXCI+PC9pPjwvYT48L2xpPlwiKTtcbn1cbmlmICggIWVtcHR5KVxue1xuLy8gaXRlcmF0ZSBzaG93blxuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSBzaG93bjtcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIHBhZ2UgPSAkJG9ialskaW5kZXhdO1xuXG5pZiAoIHBhZ2UgPT0gJy4uLicpXG57XG5idWYucHVzaChcIjxsaSBjbGFzcz1cXFwicGFnZS1pdGVtXFxcIj48YSBjbGFzcz1cXFwicGFnZS1saW5rIGRpc2FibGVkXFxcIj4uLi48L2E+PC9saT5cIik7XG59XG5lbHNlXG57XG5pZiAoIHBhZ2UgPT0gY3VycmVudFBhZ2UpXG57XG5idWYucHVzaChcIjxsaSBjbGFzcz1cXFwicGFnZS1pdGVtIGFjdGl2ZVxcXCI+PGEgY2xhc3M9XFxcInBhZ2UtbGlua1xcXCI+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBwYWdlKSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L2E+PC9saT5cIik7XG59XG5lbHNlXG57XG5idWYucHVzaChcIjxsaSBjbGFzcz1cXFwicGFnZS1pdGVtXFxcIj48YSBkYXRhLWNsaWNrPVxcXCJwYWdlXFxcIlwiICsgKGphZGUuYXR0cihcImRhdGEtcGFnZVwiLCBwYWdlLCB0cnVlLCBmYWxzZSkpICsgXCIgY2xhc3M9XFxcInBhZ2UtbGluayBjdXJzb3ItcG9pbnRlclxcXCI+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBwYWdlKSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L2E+PC9saT5cIik7XG59XG59XG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgdmFyICQkbCA9IDA7XG4gICAgZm9yICh2YXIgJGluZGV4IGluICQkb2JqKSB7XG4gICAgICAkJGwrKzsgICAgICB2YXIgcGFnZSA9ICQkb2JqWyRpbmRleF07XG5cbmlmICggcGFnZSA9PSAnLi4uJylcbntcbmJ1Zi5wdXNoKFwiPGxpIGNsYXNzPVxcXCJwYWdlLWl0ZW1cXFwiPjxhIGNsYXNzPVxcXCJwYWdlLWxpbmsgZGlzYWJsZWRcXFwiPi4uLjwvYT48L2xpPlwiKTtcbn1cbmVsc2VcbntcbmlmICggcGFnZSA9PSBjdXJyZW50UGFnZSlcbntcbmJ1Zi5wdXNoKFwiPGxpIGNsYXNzPVxcXCJwYWdlLWl0ZW0gYWN0aXZlXFxcIj48YSBjbGFzcz1cXFwicGFnZS1saW5rXFxcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IHBhZ2UpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvYT48L2xpPlwiKTtcbn1cbmVsc2VcbntcbmJ1Zi5wdXNoKFwiPGxpIGNsYXNzPVxcXCJwYWdlLWl0ZW1cXFwiPjxhIGRhdGEtY2xpY2s9XFxcInBhZ2VcXFwiXCIgKyAoamFkZS5hdHRyKFwiZGF0YS1wYWdlXCIsIHBhZ2UsIHRydWUsIGZhbHNlKSkgKyBcIiBjbGFzcz1cXFwicGFnZS1saW5rIGN1cnNvci1wb2ludGVyXFxcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IHBhZ2UpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvYT48L2xpPlwiKTtcbn1cbn1cbiAgICB9XG5cbiAgfVxufSkuY2FsbCh0aGlzKTtcblxufVxuaWYgKCBjdXJyZW50UGFnZSA8IHRvdGFsUGFnZXMpXG57XG5idWYucHVzaChcIjxsaSBjbGFzcz1cXFwicGFnZS1pdGVtXFxcIj48YSBkYXRhLWNsaWNrPVxcXCJuZXh0XFxcIiBjbGFzcz1cXFwicGFnZS1saW5rIGN1cnNvci1wb2ludGVyXFxcIj48aSBjbGFzcz1cXFwiZmEgZmEtYW5nbGUtcmlnaHRcXFwiPjwvaT48L2E+PC9saT5cIik7XG59XG5lbHNlXG57XG5idWYucHVzaChcIjxsaSBjbGFzcz1cXFwicGFnZS1pdGVtIGRpc2FibGVkXFxcIj48YSBjbGFzcz1cXFwicGFnZS1saW5rXFxcIj48aSBjbGFzcz1cXFwiZmEgZmEtYW5nbGUtcmlnaHRcXFwiPjwvaT48L2E+PC9saT5cIik7XG59XG5pZiAoIGN1cnJlbnRQYWdlICE9IHRvdGFsUGFnZXMpXG57XG5idWYucHVzaChcIjxsaSBjbGFzcz1cXFwicGFnZS1pdGVtXFxcIj48YSBkYXRhLWNsaWNrPVxcXCJsYXN0XFxcIiBjbGFzcz1cXFwicGFnZS1saW5rIGN1cnNvci1wb2ludGVyXFxcIj48aSBjbGFzcz1cXFwiZmEgZmEtYW5nbGUtZG91YmxlLXJpZ2h0XFxcIj48L2k+PC9hPjwvbGk+XCIpO1xufVxuZWxzZVxue1xuYnVmLnB1c2goXCI8bGkgY2xhc3M9XFxcInBhZ2UtaXRlbSBkaXNhYmxlZFxcXCI+PGEgY2xhc3M9XFxcInBhZ2UtbGlua1xcXCI+PGkgY2xhc3M9XFxcImZhIGZhLWFuZ2xlLWRvdWJsZS1yaWdodFxcXCI+PC9pPjwvYT48L2xpPlwiKTtcbn19LmNhbGwodGhpcyxcImN1cnJlbnRQYWdlXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5jdXJyZW50UGFnZTp0eXBlb2YgY3VycmVudFBhZ2UhPT1cInVuZGVmaW5lZFwiP2N1cnJlbnRQYWdlOnVuZGVmaW5lZCxcImVtcHR5XCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5lbXB0eTp0eXBlb2YgZW1wdHkhPT1cInVuZGVmaW5lZFwiP2VtcHR5OnVuZGVmaW5lZCxcInNob3duXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5zaG93bjp0eXBlb2Ygc2hvd24hPT1cInVuZGVmaW5lZFwiP3Nob3duOnVuZGVmaW5lZCxcInRvdGFsUGFnZXNcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnRvdGFsUGFnZXM6dHlwZW9mIHRvdGFsUGFnZXMhPT1cInVuZGVmaW5lZFwiP3RvdGFsUGFnZXM6dW5kZWZpbmVkLFwidW5kZWZpbmVkXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC51bmRlZmluZWQ6dHlwZW9mIHVuZGVmaW5lZCE9PVwidW5kZWZpbmVkXCI/dW5kZWZpbmVkOnVuZGVmaW5lZCkpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcbihmdW5jdGlvbihmKXtpZih0eXBlb2YgZXhwb3J0cz09PVwib2JqZWN0XCImJnR5cGVvZiBtb2R1bGUhPT1cInVuZGVmaW5lZFwiKXttb2R1bGUuZXhwb3J0cz1mKCl9ZWxzZSBpZih0eXBlb2YgZGVmaW5lPT09XCJmdW5jdGlvblwiJiZkZWZpbmUuYW1kKXtkZWZpbmUoW10sZil9ZWxzZXt2YXIgZztpZih0eXBlb2Ygd2luZG93IT09XCJ1bmRlZmluZWRcIil7Zz13aW5kb3d9ZWxzZSBpZih0eXBlb2YgZ2xvYmFsIT09XCJ1bmRlZmluZWRcIil7Zz1nbG9iYWx9ZWxzZSBpZih0eXBlb2Ygc2VsZiE9PVwidW5kZWZpbmVkXCIpe2c9c2VsZn1lbHNle2c9dGhpc31nLmphZGUgPSBmKCl9fSkoZnVuY3Rpb24oKXt2YXIgZGVmaW5lLG1vZHVsZSxleHBvcnRzO3JldHVybiAoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSh7MTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogTWVyZ2UgdHdvIGF0dHJpYnV0ZSBvYmplY3RzIGdpdmluZyBwcmVjZWRlbmNlXG4gKiB0byB2YWx1ZXMgaW4gb2JqZWN0IGBiYC4gQ2xhc3NlcyBhcmUgc3BlY2lhbC1jYXNlZFxuICogYWxsb3dpbmcgZm9yIGFycmF5cyBhbmQgbWVyZ2luZy9qb2luaW5nIGFwcHJvcHJpYXRlbHlcbiAqIHJlc3VsdGluZyBpbiBhIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gYVxuICogQHBhcmFtIHtPYmplY3R9IGJcbiAqIEByZXR1cm4ge09iamVjdH0gYVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5tZXJnZSA9IGZ1bmN0aW9uIG1lcmdlKGEsIGIpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICB2YXIgYXR0cnMgPSBhWzBdO1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYS5sZW5ndGg7IGkrKykge1xuICAgICAgYXR0cnMgPSBtZXJnZShhdHRycywgYVtpXSk7XG4gICAgfVxuICAgIHJldHVybiBhdHRycztcbiAgfVxuICB2YXIgYWMgPSBhWydjbGFzcyddO1xuICB2YXIgYmMgPSBiWydjbGFzcyddO1xuXG4gIGlmIChhYyB8fCBiYykge1xuICAgIGFjID0gYWMgfHwgW107XG4gICAgYmMgPSBiYyB8fCBbXTtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoYWMpKSBhYyA9IFthY107XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGJjKSkgYmMgPSBbYmNdO1xuICAgIGFbJ2NsYXNzJ10gPSBhYy5jb25jYXQoYmMpLmZpbHRlcihudWxscyk7XG4gIH1cblxuICBmb3IgKHZhciBrZXkgaW4gYikge1xuICAgIGlmIChrZXkgIT0gJ2NsYXNzJykge1xuICAgICAgYVtrZXldID0gYltrZXldO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBhO1xufTtcblxuLyoqXG4gKiBGaWx0ZXIgbnVsbCBgdmFsYHMuXG4gKlxuICogQHBhcmFtIHsqfSB2YWxcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBudWxscyh2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPSBudWxsICYmIHZhbCAhPT0gJyc7XG59XG5cbi8qKlxuICogam9pbiBhcnJheSBhcyBjbGFzc2VzLlxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydHMuam9pbkNsYXNzZXMgPSBqb2luQ2xhc3NlcztcbmZ1bmN0aW9uIGpvaW5DbGFzc2VzKHZhbCkge1xuICByZXR1cm4gKEFycmF5LmlzQXJyYXkodmFsKSA/IHZhbC5tYXAoam9pbkNsYXNzZXMpIDpcbiAgICAodmFsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSA/IE9iamVjdC5rZXlzKHZhbCkuZmlsdGVyKGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIHZhbFtrZXldOyB9KSA6XG4gICAgW3ZhbF0pLmZpbHRlcihudWxscykuam9pbignICcpO1xufVxuXG4vKipcbiAqIFJlbmRlciB0aGUgZ2l2ZW4gY2xhc3Nlcy5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBjbGFzc2VzXG4gKiBAcGFyYW0ge0FycmF5LjxCb29sZWFuPn0gZXNjYXBlZFxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnRzLmNscyA9IGZ1bmN0aW9uIGNscyhjbGFzc2VzLCBlc2NhcGVkKSB7XG4gIHZhciBidWYgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjbGFzc2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGVzY2FwZWQgJiYgZXNjYXBlZFtpXSkge1xuICAgICAgYnVmLnB1c2goZXhwb3J0cy5lc2NhcGUoam9pbkNsYXNzZXMoW2NsYXNzZXNbaV1dKSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBidWYucHVzaChqb2luQ2xhc3NlcyhjbGFzc2VzW2ldKSk7XG4gICAgfVxuICB9XG4gIHZhciB0ZXh0ID0gam9pbkNsYXNzZXMoYnVmKTtcbiAgaWYgKHRleHQubGVuZ3RoKSB7XG4gICAgcmV0dXJuICcgY2xhc3M9XCInICsgdGV4dCArICdcIic7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG59O1xuXG5cbmV4cG9ydHMuc3R5bGUgPSBmdW5jdGlvbiAodmFsKSB7XG4gIGlmICh2YWwgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXModmFsKS5tYXAoZnVuY3Rpb24gKHN0eWxlKSB7XG4gICAgICByZXR1cm4gc3R5bGUgKyAnOicgKyB2YWxbc3R5bGVdO1xuICAgIH0pLmpvaW4oJzsnKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdmFsO1xuICB9XG59O1xuLyoqXG4gKiBSZW5kZXIgdGhlIGdpdmVuIGF0dHJpYnV0ZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30ga2V5XG4gKiBAcGFyYW0ge1N0cmluZ30gdmFsXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGVzY2FwZWRcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gdGVyc2VcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZXhwb3J0cy5hdHRyID0gZnVuY3Rpb24gYXR0cihrZXksIHZhbCwgZXNjYXBlZCwgdGVyc2UpIHtcbiAgaWYgKGtleSA9PT0gJ3N0eWxlJykge1xuICAgIHZhbCA9IGV4cG9ydHMuc3R5bGUodmFsKTtcbiAgfVxuICBpZiAoJ2Jvb2xlYW4nID09IHR5cGVvZiB2YWwgfHwgbnVsbCA9PSB2YWwpIHtcbiAgICBpZiAodmFsKSB7XG4gICAgICByZXR1cm4gJyAnICsgKHRlcnNlID8ga2V5IDoga2V5ICsgJz1cIicgKyBrZXkgKyAnXCInKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgfSBlbHNlIGlmICgwID09IGtleS5pbmRleE9mKCdkYXRhJykgJiYgJ3N0cmluZycgIT0gdHlwZW9mIHZhbCkge1xuICAgIGlmIChKU09OLnN0cmluZ2lmeSh2YWwpLmluZGV4T2YoJyYnKSAhPT0gLTEpIHtcbiAgICAgIGNvbnNvbGUud2FybignU2luY2UgSmFkZSAyLjAuMCwgYW1wZXJzYW5kcyAoYCZgKSBpbiBkYXRhIGF0dHJpYnV0ZXMgJyArXG4gICAgICAgICAgICAgICAgICAgJ3dpbGwgYmUgZXNjYXBlZCB0byBgJmFtcDtgJyk7XG4gICAgfTtcbiAgICBpZiAodmFsICYmIHR5cGVvZiB2YWwudG9JU09TdHJpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNvbnNvbGUud2FybignSmFkZSB3aWxsIGVsaW1pbmF0ZSB0aGUgZG91YmxlIHF1b3RlcyBhcm91bmQgZGF0ZXMgaW4gJyArXG4gICAgICAgICAgICAgICAgICAgJ0lTTyBmb3JtIGFmdGVyIDIuMC4wJyk7XG4gICAgfVxuICAgIHJldHVybiAnICcgKyBrZXkgKyBcIj0nXCIgKyBKU09OLnN0cmluZ2lmeSh2YWwpLnJlcGxhY2UoLycvZywgJyZhcG9zOycpICsgXCInXCI7XG4gIH0gZWxzZSBpZiAoZXNjYXBlZCkge1xuICAgIGlmICh2YWwgJiYgdHlwZW9mIHZhbC50b0lTT1N0cmluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc29sZS53YXJuKCdKYWRlIHdpbGwgc3RyaW5naWZ5IGRhdGVzIGluIElTTyBmb3JtIGFmdGVyIDIuMC4wJyk7XG4gICAgfVxuICAgIHJldHVybiAnICcgKyBrZXkgKyAnPVwiJyArIGV4cG9ydHMuZXNjYXBlKHZhbCkgKyAnXCInO1xuICB9IGVsc2Uge1xuICAgIGlmICh2YWwgJiYgdHlwZW9mIHZhbC50b0lTT1N0cmluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc29sZS53YXJuKCdKYWRlIHdpbGwgc3RyaW5naWZ5IGRhdGVzIGluIElTTyBmb3JtIGFmdGVyIDIuMC4wJyk7XG4gICAgfVxuICAgIHJldHVybiAnICcgKyBrZXkgKyAnPVwiJyArIHZhbCArICdcIic7XG4gIH1cbn07XG5cbi8qKlxuICogUmVuZGVyIHRoZSBnaXZlbiBhdHRyaWJ1dGVzIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcGFyYW0ge09iamVjdH0gZXNjYXBlZFxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnRzLmF0dHJzID0gZnVuY3Rpb24gYXR0cnMob2JqLCB0ZXJzZSl7XG4gIHZhciBidWYgPSBbXTtcblxuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG5cbiAgaWYgKGtleXMubGVuZ3RoKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICB2YXIga2V5ID0ga2V5c1tpXVxuICAgICAgICAsIHZhbCA9IG9ialtrZXldO1xuXG4gICAgICBpZiAoJ2NsYXNzJyA9PSBrZXkpIHtcbiAgICAgICAgaWYgKHZhbCA9IGpvaW5DbGFzc2VzKHZhbCkpIHtcbiAgICAgICAgICBidWYucHVzaCgnICcgKyBrZXkgKyAnPVwiJyArIHZhbCArICdcIicpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBidWYucHVzaChleHBvcnRzLmF0dHIoa2V5LCB2YWwsIGZhbHNlLCB0ZXJzZSkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBidWYuam9pbignJyk7XG59O1xuXG4vKipcbiAqIEVzY2FwZSB0aGUgZ2l2ZW4gc3RyaW5nIG9mIGBodG1sYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaHRtbFxuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxudmFyIGphZGVfZW5jb2RlX2h0bWxfcnVsZXMgPSB7XG4gICcmJzogJyZhbXA7JyxcbiAgJzwnOiAnJmx0OycsXG4gICc+JzogJyZndDsnLFxuICAnXCInOiAnJnF1b3Q7J1xufTtcbnZhciBqYWRlX21hdGNoX2h0bWwgPSAvWyY8PlwiXS9nO1xuXG5mdW5jdGlvbiBqYWRlX2VuY29kZV9jaGFyKGMpIHtcbiAgcmV0dXJuIGphZGVfZW5jb2RlX2h0bWxfcnVsZXNbY10gfHwgYztcbn1cblxuZXhwb3J0cy5lc2NhcGUgPSBqYWRlX2VzY2FwZTtcbmZ1bmN0aW9uIGphZGVfZXNjYXBlKGh0bWwpe1xuICB2YXIgcmVzdWx0ID0gU3RyaW5nKGh0bWwpLnJlcGxhY2UoamFkZV9tYXRjaF9odG1sLCBqYWRlX2VuY29kZV9jaGFyKTtcbiAgaWYgKHJlc3VsdCA9PT0gJycgKyBodG1sKSByZXR1cm4gaHRtbDtcbiAgZWxzZSByZXR1cm4gcmVzdWx0O1xufTtcblxuLyoqXG4gKiBSZS10aHJvdyB0aGUgZ2l2ZW4gYGVycmAgaW4gY29udGV4dCB0byB0aGVcbiAqIHRoZSBqYWRlIGluIGBmaWxlbmFtZWAgYXQgdGhlIGdpdmVuIGBsaW5lbm9gLlxuICpcbiAqIEBwYXJhbSB7RXJyb3J9IGVyclxuICogQHBhcmFtIHtTdHJpbmd9IGZpbGVuYW1lXG4gKiBAcGFyYW0ge1N0cmluZ30gbGluZW5vXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLnJldGhyb3cgPSBmdW5jdGlvbiByZXRocm93KGVyciwgZmlsZW5hbWUsIGxpbmVubywgc3RyKXtcbiAgaWYgKCEoZXJyIGluc3RhbmNlb2YgRXJyb3IpKSB0aHJvdyBlcnI7XG4gIGlmICgodHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyB8fCAhZmlsZW5hbWUpICYmICFzdHIpIHtcbiAgICBlcnIubWVzc2FnZSArPSAnIG9uIGxpbmUgJyArIGxpbmVubztcbiAgICB0aHJvdyBlcnI7XG4gIH1cbiAgdHJ5IHtcbiAgICBzdHIgPSBzdHIgfHwgcmVxdWlyZSgnZnMnKS5yZWFkRmlsZVN5bmMoZmlsZW5hbWUsICd1dGY4JylcbiAgfSBjYXRjaCAoZXgpIHtcbiAgICByZXRocm93KGVyciwgbnVsbCwgbGluZW5vKVxuICB9XG4gIHZhciBjb250ZXh0ID0gM1xuICAgICwgbGluZXMgPSBzdHIuc3BsaXQoJ1xcbicpXG4gICAgLCBzdGFydCA9IE1hdGgubWF4KGxpbmVubyAtIGNvbnRleHQsIDApXG4gICAgLCBlbmQgPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIGxpbmVubyArIGNvbnRleHQpO1xuXG4gIC8vIEVycm9yIGNvbnRleHRcbiAgdmFyIGNvbnRleHQgPSBsaW5lcy5zbGljZShzdGFydCwgZW5kKS5tYXAoZnVuY3Rpb24obGluZSwgaSl7XG4gICAgdmFyIGN1cnIgPSBpICsgc3RhcnQgKyAxO1xuICAgIHJldHVybiAoY3VyciA9PSBsaW5lbm8gPyAnICA+ICcgOiAnICAgICcpXG4gICAgICArIGN1cnJcbiAgICAgICsgJ3wgJ1xuICAgICAgKyBsaW5lO1xuICB9KS5qb2luKCdcXG4nKTtcblxuICAvLyBBbHRlciBleGNlcHRpb24gbWVzc2FnZVxuICBlcnIucGF0aCA9IGZpbGVuYW1lO1xuICBlcnIubWVzc2FnZSA9IChmaWxlbmFtZSB8fCAnSmFkZScpICsgJzonICsgbGluZW5vXG4gICAgKyAnXFxuJyArIGNvbnRleHQgKyAnXFxuXFxuJyArIGVyci5tZXNzYWdlO1xuICB0aHJvdyBlcnI7XG59O1xuXG5leHBvcnRzLkRlYnVnSXRlbSA9IGZ1bmN0aW9uIERlYnVnSXRlbShsaW5lbm8sIGZpbGVuYW1lKSB7XG4gIHRoaXMubGluZW5vID0gbGluZW5vO1xuICB0aGlzLmZpbGVuYW1lID0gZmlsZW5hbWU7XG59XG5cbn0se1wiZnNcIjoyfV0sMjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbn0se31dfSx7fSxbMV0pKDEpXG59KTtcbn0pLmNhbGwodGhpcyx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pIl19
