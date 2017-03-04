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

buf.push("<div class=\"row\"><div class=\"col-xs-4\"><div class=\"row\"><div data-region=\"form\" class=\"col-xs-12\"></div><div class=\"col-xs-12\"><div data-region=\"filter\" class=\"card card-block m-t-1\"></div></div><div data-region=\"pagination\" class=\"col-xs-12\"></div><div data-region=\"list\" class=\"col-xs-12\"></div></div></div><div data-region=\"detail\" class=\"col-xs-8 p-l-0\"></div></div>");;return buf.join("");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9hZWtzY28vZ2l0aHViL255c19oZWFsdGgvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL2Fla3Njby9naXRodWIvbnlzX2hlYWx0aC9hcHAvY29mZmVlL2FwcC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2dpdGh1Yi9ueXNfaGVhbHRoL2FwcC9jb2ZmZWUvYXBwbGljYXRpb24vdmlld3MvbGF5b3V0LmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vZ2l0aHViL255c19oZWFsdGgvYXBwL2NvZmZlZS9iZWhhdmlvcnMvaW5kZXguY29mZmVlIiwiL1VzZXJzL2Fla3Njby9naXRodWIvbnlzX2hlYWx0aC9hcHAvY29mZmVlL2JlaGF2aW9ycy9zZWxlY3RhYmxlQ2hpbGQuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9naXRodWIvbnlzX2hlYWx0aC9hcHAvY29mZmVlL2NvbXBvbmVudHMvaGVhZGVyL2NvbXBvbmVudC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2dpdGh1Yi9ueXNfaGVhbHRoL2FwcC9jb2ZmZWUvY29tcG9uZW50cy9oZWFkZXIvdmlld3MvbGF5b3V0LmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vZ2l0aHViL255c19oZWFsdGgvYXBwL2NvZmZlZS9jb21wb25lbnRzL2hlYWRlci92aWV3cy90ZW1wbGF0ZXMvaGVhZGVyLmphZGUiLCIvVXNlcnMvYWVrc2NvL2dpdGh1Yi9ueXNfaGVhbHRoL2FwcC9jb2ZmZWUvY29tcG9uZW50cy9zaWRlYmFyL2NvbXBvbmVudC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2dpdGh1Yi9ueXNfaGVhbHRoL2FwcC9jb2ZmZWUvY29tcG9uZW50cy9zaWRlYmFyL3RlbXBsYXRlLmphZGUiLCIvVXNlcnMvYWVrc2NvL2dpdGh1Yi9ueXNfaGVhbHRoL2FwcC9jb2ZmZWUvY29tcG9uZW50cy9zaWRlYmFyL3ZpZXcuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9naXRodWIvbnlzX2hlYWx0aC9hcHAvY29mZmVlL2NvbmZpZy9pbmRleC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2dpdGh1Yi9ueXNfaGVhbHRoL2FwcC9jb2ZmZWUvY29uZmlnL2p3dC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2dpdGh1Yi9ueXNfaGVhbHRoL2FwcC9jb2ZmZWUvY29uZmlnL21hcmlvbmV0dGUuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9naXRodWIvbnlzX2hlYWx0aC9hcHAvY29mZmVlL21hbmlmZXN0LmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vZ2l0aHViL255c19oZWFsdGgvYXBwL2NvZmZlZS9tb2R1bGVzL2hvbWUvYWJvdXQvcm91dGUuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9naXRodWIvbnlzX2hlYWx0aC9hcHAvY29mZmVlL21vZHVsZXMvaG9tZS9hYm91dC92aWV3cy9sYXlvdXQuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9naXRodWIvbnlzX2hlYWx0aC9hcHAvY29mZmVlL21vZHVsZXMvaG9tZS9hYm91dC92aWV3cy90ZW1wbGF0ZXMvbGF5b3V0LmphZGUiLCIvVXNlcnMvYWVrc2NvL2dpdGh1Yi9ueXNfaGVhbHRoL2FwcC9jb2ZmZWUvbW9kdWxlcy9ob21lL2Rhc2hib2FyZC9yb3V0ZS5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2dpdGh1Yi9ueXNfaGVhbHRoL2FwcC9jb2ZmZWUvbW9kdWxlcy9ob21lL2Rhc2hib2FyZC92aWV3cy9maWx0ZXIuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9naXRodWIvbnlzX2hlYWx0aC9hcHAvY29mZmVlL21vZHVsZXMvaG9tZS9kYXNoYm9hcmQvdmlld3MvZm9ybS5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2dpdGh1Yi9ueXNfaGVhbHRoL2FwcC9jb2ZmZWUvbW9kdWxlcy9ob21lL2Rhc2hib2FyZC92aWV3cy9pdGVtRGV0YWlsLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vZ2l0aHViL255c19oZWFsdGgvYXBwL2NvZmZlZS9tb2R1bGVzL2hvbWUvZGFzaGJvYXJkL3ZpZXdzL2l0ZW1MaXN0LmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vZ2l0aHViL255c19oZWFsdGgvYXBwL2NvZmZlZS9tb2R1bGVzL2hvbWUvZGFzaGJvYXJkL3ZpZXdzL2xheW91dC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2dpdGh1Yi9ueXNfaGVhbHRoL2FwcC9jb2ZmZWUvbW9kdWxlcy9ob21lL2Rhc2hib2FyZC92aWV3cy9tYXAuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9naXRodWIvbnlzX2hlYWx0aC9hcHAvY29mZmVlL21vZHVsZXMvaG9tZS9kYXNoYm9hcmQvdmlld3MvdGVtcGxhdGVzL2ZpbHRlci5qYWRlIiwiL1VzZXJzL2Fla3Njby9naXRodWIvbnlzX2hlYWx0aC9hcHAvY29mZmVlL21vZHVsZXMvaG9tZS9kYXNoYm9hcmQvdmlld3MvdGVtcGxhdGVzL2Zvcm0uamFkZSIsIi9Vc2Vycy9hZWtzY28vZ2l0aHViL255c19oZWFsdGgvYXBwL2NvZmZlZS9tb2R1bGVzL2hvbWUvZGFzaGJvYXJkL3ZpZXdzL3RlbXBsYXRlcy9pdGVtX2NoaWxkLmphZGUiLCIvVXNlcnMvYWVrc2NvL2dpdGh1Yi9ueXNfaGVhbHRoL2FwcC9jb2ZmZWUvbW9kdWxlcy9ob21lL2Rhc2hib2FyZC92aWV3cy90ZW1wbGF0ZXMvaXRlbV9kZXRhaWwuamFkZSIsIi9Vc2Vycy9hZWtzY28vZ2l0aHViL255c19oZWFsdGgvYXBwL2NvZmZlZS9tb2R1bGVzL2hvbWUvZGFzaGJvYXJkL3ZpZXdzL3RlbXBsYXRlcy9pdGVtX2VtcHR5LmphZGUiLCIvVXNlcnMvYWVrc2NvL2dpdGh1Yi9ueXNfaGVhbHRoL2FwcC9jb2ZmZWUvbW9kdWxlcy9ob21lL2Rhc2hib2FyZC92aWV3cy90ZW1wbGF0ZXMvbGF5b3V0LmphZGUiLCIvVXNlcnMvYWVrc2NvL2dpdGh1Yi9ueXNfaGVhbHRoL2FwcC9jb2ZmZWUvbW9kdWxlcy9ob21lL2Rhc2hib2FyZC92aWV3cy90ZW1wbGF0ZXMvbG9hZGluZy5qYWRlIiwiL1VzZXJzL2Fla3Njby9naXRodWIvbnlzX2hlYWx0aC9hcHAvY29mZmVlL21vZHVsZXMvaG9tZS9kYXNoYm9hcmQvdmlld3MvdGVtcGxhdGVzL21hcC5qYWRlIiwiL1VzZXJzL2Fla3Njby9naXRodWIvbnlzX2hlYWx0aC9hcHAvY29mZmVlL21vZHVsZXMvaG9tZS9kYXNoYm9hcmQvdmlld3MvdGVtcGxhdGVzL3Zpb2xhdGlvbl9pdGVtLmphZGUiLCIvVXNlcnMvYWVrc2NvL2dpdGh1Yi9ueXNfaGVhbHRoL2FwcC9jb2ZmZWUvbW9kdWxlcy9ob21lL2Rhc2hib2FyZC92aWV3cy90ZW1wbGF0ZXMvdmlvbGF0aW9uX2xpc3QuamFkZSIsIi9Vc2Vycy9hZWtzY28vZ2l0aHViL255c19oZWFsdGgvYXBwL2NvZmZlZS9tb2R1bGVzL2hvbWUvZW50aXRpZXMuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9naXRodWIvbnlzX2hlYWx0aC9hcHAvY29mZmVlL21vZHVsZXMvaG9tZS9mYWN0b3J5LmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vZ2l0aHViL255c19oZWFsdGgvYXBwL2NvZmZlZS9tb2R1bGVzL2hvbWUvcm91dGVyLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vZ2l0aHViL255c19oZWFsdGgvYXBwL2NvZmZlZS9tb2R1bGVzL3BhcmFtcy9mYWN0b3J5LmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vZ2l0aHViL255c19oZWFsdGgvYXBwL2NvZmZlZS9tb2R1bGVzL3BhcmFtcy9wbHVja2VkL2NpdGllcy5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2dpdGh1Yi9ueXNfaGVhbHRoL2FwcC9jb2ZmZWUvbW9kdWxlcy9wYXJhbXMvcGx1Y2tlZC9jb3VudGllcy5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2dpdGh1Yi9ueXNfaGVhbHRoL2FwcC9jb2ZmZWUvbW9kdWxlcy9wYXJhbXMvcGx1Y2tlZC96aXBzLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vZ2l0aHViL255c19oZWFsdGgvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1yZXNvbHZlL2VtcHR5LmpzIiwiL1VzZXJzL2Fla3Njby9naXRodWIvbnlzX2hlYWx0aC9ub2RlX21vZHVsZXMvaG5fYmVoYXZpb3JzL2xpYi9iaW5kQmFzZS5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2dpdGh1Yi9ueXNfaGVhbHRoL25vZGVfbW9kdWxlcy9obl9iZWhhdmlvcnMvbGliL2JpbmRJbnB1dHMuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9naXRodWIvbnlzX2hlYWx0aC9ub2RlX21vZHVsZXMvaG5fYmVoYXZpb3JzL2xpYi9mbGFzaGVzLmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vZ2l0aHViL255c19oZWFsdGgvbm9kZV9tb2R1bGVzL2huX2JlaGF2aW9ycy9saWIvbW9kZWxFdmVudHMuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9naXRodWIvbnlzX2hlYWx0aC9ub2RlX21vZHVsZXMvaG5fYmVoYXZpb3JzL2xpYi9zdWJtaXRCdXR0b24uY29mZmVlIiwiL1VzZXJzL2Fla3Njby9naXRodWIvbnlzX2hlYWx0aC9ub2RlX21vZHVsZXMvaG5fYmVoYXZpb3JzL2xpYi90b29sdGlwcy5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2dpdGh1Yi9ueXNfaGVhbHRoL25vZGVfbW9kdWxlcy9obl9icmVhZGNydW1iL2xpYi9jb21wb25lbnQuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9naXRodWIvbnlzX2hlYWx0aC9ub2RlX21vZHVsZXMvaG5fYnJlYWRjcnVtYi9saWIvdmlld3MvYnJlYWRjcnVtYkxpc3QuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9naXRodWIvbnlzX2hlYWx0aC9ub2RlX21vZHVsZXMvaG5fYnJlYWRjcnVtYi9saWIvdmlld3MvdGVtcGxhdGVzL2JyZWFkY3J1bWJfY2hpbGQuamFkZSIsIi9Vc2Vycy9hZWtzY28vZ2l0aHViL255c19oZWFsdGgvbm9kZV9tb2R1bGVzL2huX2VudGl0aWVzL2xpYi9jb25maWcuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9naXRodWIvbnlzX2hlYWx0aC9ub2RlX21vZHVsZXMvaG5fZW50aXRpZXMvbGliL2RlY29yYXRvci5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2dpdGh1Yi9ueXNfaGVhbHRoL25vZGVfbW9kdWxlcy9obl9mbGFzaC9saWIvY29sbGVjdGlvbi5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2dpdGh1Yi9ueXNfaGVhbHRoL25vZGVfbW9kdWxlcy9obl9mbGFzaC9saWIvY29tcG9uZW50LmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vZ2l0aHViL255c19oZWFsdGgvbm9kZV9tb2R1bGVzL2huX2ZsYXNoL2xpYi9tb2RlbC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2dpdGh1Yi9ueXNfaGVhbHRoL25vZGVfbW9kdWxlcy9obl9mbGFzaC9saWIvc2VydmljZS5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2dpdGh1Yi9ueXNfaGVhbHRoL25vZGVfbW9kdWxlcy9obl9mbGFzaC9saWIvdmlld3MvZmxhc2hMaXN0LmNvZmZlZSIsIi9Vc2Vycy9hZWtzY28vZ2l0aHViL255c19oZWFsdGgvbm9kZV9tb2R1bGVzL2huX2ZsYXNoL2xpYi92aWV3cy90ZW1wbGF0ZXMvZmxhc2hfY2hpbGQuamFkZSIsIi9Vc2Vycy9hZWtzY28vZ2l0aHViL255c19oZWFsdGgvbm9kZV9tb2R1bGVzL2huX292ZXJsYXkvbGliL2NvbXBvbmVudC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2dpdGh1Yi9ueXNfaGVhbHRoL25vZGVfbW9kdWxlcy9obl9yb3V0aW5nL2xpYi9yb3V0ZS5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2dpdGh1Yi9ueXNfaGVhbHRoL25vZGVfbW9kdWxlcy9obl9yb3V0aW5nL2xpYi9yb3V0ZXIuY29mZmVlIiwiL1VzZXJzL2Fla3Njby9naXRodWIvbnlzX2hlYWx0aC9ub2RlX21vZHVsZXMvaG5fdmlld3MvbGliL25hdi9pbmRleC5jb2ZmZWUiLCIvVXNlcnMvYWVrc2NvL2dpdGh1Yi9ueXNfaGVhbHRoL25vZGVfbW9kdWxlcy9obl92aWV3cy9saWIvbmF2L3RlbXBsYXRlcy9uYXYuamFkZSIsIi9Vc2Vycy9hZWtzY28vZ2l0aHViL255c19oZWFsdGgvbm9kZV9tb2R1bGVzL2huX3ZpZXdzL2xpYi9uYXYvdGVtcGxhdGVzL25hdl9jaGlsZC5qYWRlIiwiL1VzZXJzL2Fla3Njby9naXRodWIvbnlzX2hlYWx0aC9ub2RlX21vZHVsZXMvaG5fdmlld3MvbGliL3BhZ2luYXRpb24vaW5kZXguY29mZmVlIiwiL1VzZXJzL2Fla3Njby9naXRodWIvbnlzX2hlYWx0aC9ub2RlX21vZHVsZXMvaG5fdmlld3MvbGliL3BhZ2luYXRpb24vdGVtcGxhdGVzL3BhZ2VyLmphZGUiLCIvVXNlcnMvYWVrc2NvL2dpdGh1Yi9ueXNfaGVhbHRoL25vZGVfbW9kdWxlcy9obl92aWV3cy9saWIvcGFnaW5hdGlvbi90ZW1wbGF0ZXMvcGFnaW5hdGlvbi5qYWRlIiwiL1VzZXJzL2Fla3Njby9naXRodWIvbnlzX2hlYWx0aC9ub2RlX21vZHVsZXMvamFkZS9ydW50aW1lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDR0EsSUFBQSxXQUFBO0VBQUE7OztBQUFNOzs7Ozs7O3dCQUVKLFdBQUEsR0FDRTtJQUFBLGNBQUEsRUFBZ0IsWUFBaEI7Ozt3QkFHRixVQUFBLEdBQVksU0FBQTtJQUdWLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixRQUF2QixDQUFnQyxDQUFDLE9BQWpDLENBQXlDLE9BQXpDO0lBR0EsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFlBQXZCLENBQW9DLENBQUMsT0FBckMsQ0FBNkMsT0FBN0M7SUFDQSxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsU0FBdkIsQ0FBaUMsQ0FBQyxPQUFsQyxDQUEwQyxPQUExQztJQUNBLElBQUMsQ0FBQSxPQUFELENBQUE7QUFDQSxXQUFPO0VBVEc7O3dCQWNaLE9BQUEsR0FBUyxTQUFBO0lBQ1AsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFqQixDQUFBO1dBQ0EsUUFB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RUFlZixXQWZlLEVBZ0JmLE9BaEJlLEVBaUJmLE9BakJlLEVBa0JmLE9BbEJlLEVBbUJmLE9BbkJlLEVBb0JmLE9BcEJlLEVBcUJmLE9BckJlLEVBc0JmLE9BdEJlLEVBdUJmLE9BdkJlLEVBd0JmLFdBeEJlLEVBeUJmLE9BekJlLEVBMEJmLE9BMUJlLEVBMkJmLE9BM0JlLEVBNEJmLE9BNUJlLEVBNkJmLE9BN0JlLEVBOEJmLE9BOUJlLEVBK0JmLE9BL0JlLEVBZ0NmLFdBaENlLEVBaUNmLE9BakNlLEVBa0NmLE9BbENlLEVBbUNmLE9BbkNlLEVBb0NmLE9BcENlLEVBcUNmLE9BckNlLEVBc0NmLE9BdENlLEVBdUNmLE9BdkNlLEVBd0NmLE9BeENlLEVBeUNmLE9BekNlLEVBMENmLE9BMUNlLEVBMkNmLE9BM0NlLEVBNENmLE9BNUNlLEVBNkNmLE9BN0NlLEVBOENmLE9BOUNlLEVBK0NmLE9BL0NlLEVBZ0RmLE9BaERlLEVBaURmLE9BakRlLEVBa0RmLE9BbERlLEVBbURmLE9BbkRlLEVBb0RmLE9BcERlLEVBcURmLE9BckRlLEVBc0RmLFdBdERlLEVBdURmLE9BdkRlLEVBd0RmLE9BeERlLEVBeURmLE9BekRlLEVBMERmLE9BMURlLEVBMkRmLE9BM0RlLEVBNERmLE9BNURlLEVBNkRmLE9BN0RlLEVBOERmLE9BOURlLEVBK0RmLE9BL0RlLEVBZ0VmLE9BaEVlLEVBaUVmLE9BakVlLEVBa0VmLE9BbEVlLEVBbUVmLE9BbkVlLEVBb0VmLE9BcEVlLEVBcUVmLE9BckVlLEVBc0VmLE9BdEVlLEVBdUVmLE9BdkVlLEVBd0VmLE9BeEVlLEVBeUVmLE9BekVlLEVBMEVmLE9BMUVlLEVBMkVmLE9BM0VlLEVBNEVmLE9BNUVlLEVBNkVmLFdBN0VlLEVBOEVmLE9BOUVlLEVBK0VmLE9BL0VlLEVBZ0ZmLE9BaEZlLEVBaUZmLE9BakZlLEVBa0ZmLE9BbEZlLEVBbUZmLE9BbkZlLEVBb0ZmLE9BcEZlLEVBcUZmLE9BckZlLEVBc0ZmLE9BdEZlLEVBdUZmLE9BdkZlLEVBd0ZmLFdBeEZlLEVBeUZmLE9BekZlLEVBMEZmLE9BMUZlLEVBMkZmLFdBM0ZlLEVBNEZmLE9BNUZlLEVBNkZmLE9BN0ZlLEVBOEZmLE9BOUZlLEVBK0ZmLE9BL0ZlLEVBZ0dmLE9BaEdlLEVBaUdmLE9BakdlLEVBa0dmLE9BbEdlLEVBbUdmLE9BbkdlLEVBb0dmLE9BcEdlLEVBcUdmLE9BckdlLEVBc0dmLE9BdEdlLEVBdUdmLE9BdkdlLEVBd0dmLE9BeEdlLEVBeUdmLE9BekdlLEVBMEdmLE9BMUdlLEVBMkdmLFdBM0dlLEVBNEdmLE9BNUdlLEVBNkdmLE9BN0dlLEVBOEdmLE9BOUdlLEVBK0dmLE9BL0dlLEVBZ0hmLE9BaEhlLEVBaUhmLE9BakhlLEVBa0hmLE9BbEhlLEVBbUhmLE9BbkhlLEVBb0hmLE9BcEhlLEVBcUhmLE9BckhlLEVBc0hmLE9BdEhlLEVBdUhmLE9BdkhlLEVBd0hmLE9BeEhlLEVBeUhmLE9BekhlLEVBMEhmLE9BMUhlLEVBMkhmLE9BM0hlLEVBNEhmLE9BNUhlLEVBNkhmLE9BN0hlLEVBOEhmLE9BOUhlLEVBK0hmLE9BL0hlLEVBZ0lmLE9BaEllLEVBaUlmLE9BakllLEVBa0lmLE9BbEllLEVBbUlmLE9BbkllLEVBb0lmLE9BcEllLEVBcUlmLE9BckllLEVBc0lmLE9BdEllLEVBdUlmLE9BdkllLEVBd0lmLE9BeEllLEVBeUlmLE9BekllLEVBMElmLE9BMUllLEVBMklmLE9BM0llLEVBNElmLE9BNUllLEVBNklmLE9BN0llLEVBOElmLE9BOUllLEVBK0lmLE9BL0llLEVBZ0pmLE9BaEplLEVBaUpmLE9BakplLEVBa0pmLE9BbEplLEVBbUpmLE9BbkplLEVBb0pmLE9BcEplLEVBcUpmLE9BckplLEVBc0pmLE9BdEplLEVBdUpmLE9BdkplLEVBd0pmLE9BeEplLEVBeUpmLE9BekplLEVBMEpmLFdBMUplLEVBMkpmLE9BM0plLEVBNEpmLE9BNUplLEVBNkpmLFdBN0plLEVBOEpmLE9BOUplLEVBK0pmLFdBL0plLEVBZ0tmLFdBaEtlLEVBaUtmLFdBaktlLEVBa0tmLFdBbEtlLEVBbUtmLFdBbktlLEVBb0tmLE9BcEtlLEVBcUtmLE9BcktlLEVBc0tmLFdBdEtlLEVBdUtmLFdBdktlLEVBd0tmLFdBeEtlLEVBeUtmLFdBektlLEVBMEtmLE9BMUtlLEVBMktmLE9BM0tlLEVBNEtmLE9BNUtlLEVBNktmLE9BN0tlLEVBOEtmLFdBOUtlLEVBK0tmLFdBL0tlLEVBZ0xmLE9BaExlLEVBaUxmLFdBakxlLEVBa0xmLFdBbExlLEVBbUxmLFdBbkxlLEVBb0xmLFdBcExlLEVBcUxmLFdBckxlLEVBc0xmLE9BdExlLEVBdUxmLFdBdkxlLEVBd0xmLFdBeExlLEVBeUxmLE9BekxlLEVBMExmLFdBMUxlLEVBMkxmLFdBM0xlLEVBNExmLFdBNUxlLEVBNkxmLFdBN0xlLEVBOExmLE9BOUxlLEVBK0xmLE9BL0xlLEVBZ01mLFdBaE1lLEVBaU1mLFdBak1lLEVBa01mLFdBbE1lLEVBbU1mLE9Bbk1lLEVBb01mLE9BcE1lLEVBcU1mLE9Bck1lLEVBc01mLE9BdE1lLEVBdU1mLE9Bdk1lLEVBd01mLE9BeE1lLEVBeU1mLE9Bek1lLEVBME1mLE9BMU1lLEVBMk1mLE9BM01lLEVBNE1mLE9BNU1lLEVBNk1mLFdBN01lLEVBOE1mLFdBOU1lLEVBK01mLE9BL01lLEVBZ05mLFdBaE5lLEVBaU5mLFdBak5lLEVBa05mLE9BbE5lLEVBbU5mLE9Bbk5lLEVBb05mLFdBcE5lLEVBcU5mLFdBck5lLEVBc05mLFdBdE5lLEVBdU5mLFdBdk5lLEVBd05mLFdBeE5lLEVBeU5mLFdBek5lLEVBME5mLE9BMU5lLEVBMk5mLFdBM05lLEVBNE5mLE9BNU5lLEVBNk5mLE9BN05lLEVBOE5mLE9BOU5lLEVBK05mLFdBL05lLEVBZ09mLE9BaE9lLEVBaU9mLFdBak9lLEVBa09mLFdBbE9lLEVBbU9mLFdBbk9lLEVBb09mLFdBcE9lLEVBcU9mLFdBck9lLEVBc09mLFdBdE9lLEVBdU9mLFdBdk9lLEVBd09mLE9BeE9lLEVBeU9mLFdBek9lLEVBME9mLFdBMU9lLEVBMk9mLFdBM09lLEVBNE9mLFdBNU9lLEVBNk9mLFdBN09lLEVBOE9mLFdBOU9lLEVBK09mLFdBL09lLEVBZ1BmLFdBaFBlLEVBaVBmLFdBalBlLEVBa1BmLFdBbFBlLEVBbVBmLE9BblBlLEVBb1BmLFdBcFBlLEVBcVBmLFdBclBlLEVBc1BmLFdBdFBlLEVBdVBmLFdBdlBlLEVBd1BmLFdBeFBlLEVBeVBmLE9BelBlLEVBMFBmLFdBMVBlLEVBMlBmLFdBM1BlLEVBNFBmLE9BNVBlLEVBNlBmLE9BN1BlLEVBOFBmLFdBOVBlLEVBK1BmLFdBL1BlLEVBZ1FmLE9BaFFlLEVBaVFmLFdBalFlLEVBa1FmLFdBbFFlLEVBbVFmLFdBblFlLEVBb1FmLFdBcFFlLEVBcVFmLFdBclFlLEVBc1FmLFdBdFFlLEVBdVFmLFdBdlFlLEVBd1FmLFdBeFFlLEVBeVFmLFdBelFlLEVBMFFmLFdBMVFlLEVBMlFmLE9BM1FlLEVBNFFmLFdBNVFlLEVBNlFmLFdBN1FlLEVBOFFmLFdBOVFlLEVBK1FmLFdBL1FlLEVBZ1JmLFdBaFJlLEVBaVJmLE9BalJlLEVBa1JmLFdBbFJlLEVBbVJmLFdBblJlLEVBb1JmLFdBcFJlLEVBcVJmLFdBclJlLEVBc1JmLFdBdFJlLEVBdVJmLFdBdlJlLEVBd1JmLE9BeFJlLEVBeVJmLFdBelJlLEVBMFJmLFdBMVJlLEVBMlJmLFdBM1JlLEVBNFJmLFdBNVJlLEVBNlJmLFdBN1JlLEVBOFJmLFdBOVJlLEVBK1JmLE9BL1JlLEVBZ1NmLE9BaFNlLEVBaVNmLFdBalNlLEVBa1NmLFdBbFNlLEVBbVNmLE9BblNlLEVBb1NmLFdBcFNlLEVBcVNmLFdBclNlLEVBc1NmLFdBdFNlLEVBdVNmLE9BdlNlLEVBd1NmLFFBeFNlLEVBeVNmLE9BelNlLEVBMFNmLFdBMVNlLEVBMlNmLE9BM1NlLEVBNFNmLFdBNVNlLEVBNlNmLFdBN1NlLEVBOFNmLFdBOVNlLEVBK1NmLFdBL1NlLEVBZ1RmLFdBaFRlLEVBaVRmLFdBalRlLEVBa1RmLFdBbFRlLEVBbVRmLE9BblRlLEVBb1RmLFdBcFRlLEVBcVRmLFdBclRlLEVBc1RmLFdBdFRlLEVBdVRmLFdBdlRlLEVBd1RmLFdBeFRlLEVBeVRmLE9BelRlLEVBMFRmLFdBMVRlLEVBMlRmLE9BM1RlLEVBNFRmLFdBNVRlLEVBNlRmLFdBN1RlLEVBOFRmLFdBOVRlLEVBK1RmLFdBL1RlLEVBZ1VmLFdBaFVlLEVBaVVmLFdBalVlLEVBa1VmLFdBbFVlLEVBbVVmLFdBblVlLEVBb1VmLFdBcFVlLEVBcVVmLFdBclVlLEVBc1VmLFdBdFVlLEVBdVVmLE9BdlVlLEVBd1VmLFdBeFVlLEVBeVVmLE9BelVlLEVBMFVmLFdBMVVlLEVBMlVmLE9BM1VlLEVBNFVmLFdBNVVlLEVBNlVmLE9BN1VlLEVBOFVmLFdBOVVlLEVBK1VmLFdBL1VlLEVBZ1ZmLE9BaFZlLEVBaVZmLFdBalZlLEVBa1ZmLFdBbFZlLEVBbVZmLE9BblZlLEVBb1ZmLFVBcFZlLEVBcVZmLE9BclZlLEVBc1ZmLFdBdFZlLEVBdVZmLE9BdlZlLEVBd1ZmLE9BeFZlLEVBeVZmLFdBelZlLEVBMFZmLFdBMVZlLEVBMlZmLFdBM1ZlLEVBNFZmLFdBNVZlLEVBNlZmLFdBN1ZlLEVBOFZmLFdBOVZlLEVBK1ZmLFdBL1ZlLEVBZ1dmLE9BaFdlLEVBaVdmLFdBaldlLEVBa1dmLFdBbFdlLEVBbVdmLFdBbldlLEVBb1dmLFdBcFdlLEVBcVdmLE9BcldlLEVBc1dmLE9BdFdlLEVBdVdmLFdBdldlLEVBd1dmLFdBeFdlLEVBeVdmLFdBeldlLEVBMFdmLFdBMVdlLEVBMldmLFdBM1dlLEVBNFdmLE9BNVdlLEVBNldmLFdBN1dlLEVBOFdmLE9BOVdlLEVBK1dmLFdBL1dlLEVBZ1hmLE9BaFhlLEVBaVhmLE9BalhlLEVBa1hmLE9BbFhlLEVBbVhmLFdBblhlLEVBb1hmLE9BcFhlLEVBcVhmLFdBclhlLEVBc1hmLFdBdFhlLEVBdVhmLFdBdlhlLEVBd1hmLFdBeFhlLEVBeVhmLE9BelhlLEVBMFhmLFdBMVhlLEVBMlhmLFdBM1hlLEVBNFhmLFdBNVhlLEVBNlhmLFdBN1hlLEVBOFhmLE9BOVhlLEVBK1hmLE9BL1hlLEVBZ1lmLFdBaFllLEVBaVlmLE9BalllLEVBa1lmLFdBbFllLEVBbVlmLFdBblllLEVBb1lmLFdBcFllLEVBcVlmLE9BclllLEVBc1lmLE9BdFllLEVBdVlmLFdBdlllLEVBd1lmLE9BeFllLEVBeVlmLFdBelllLEVBMFlmLE9BMVllLEVBMllmLE9BM1llLEVBNFlmLFdBNVllLEVBNllmLFdBN1llLEVBOFlmLFdBOVllLEVBK1lmLFdBL1llLEVBZ1pmLFdBaFplLEVBaVpmLE9BalplLEVBa1pmLE9BbFplLEVBbVpmLFdBblplLEVBb1pmLFdBcFplLEVBcVpmLFdBclplLEVBc1pmLFdBdFplLEVBdVpmLE9BdlplLEVBd1pmLE9BeFplLEVBeVpmLFdBelplLEVBMFpmLE9BMVplLEVBMlpmLFdBM1plLEVBNFpmLFdBNVplLEVBNlpmLE9BN1plLEVBOFpmLE9BOVplLEVBK1pmLFdBL1plLEVBZ2FmLFdBaGFlLEVBaWFmLFdBamFlLEVBa2FmLFdBbGFlLEVBbWFmLFdBbmFlLEVBb2FmLE9BcGFlLEVBcWFmLFdBcmFlLEVBc2FmLFdBdGFlLEVBdWFmLFdBdmFlLEVBd2FmLE9BeGFlLEVBeWFmLFdBemFlLEVBMGFmLE9BMWFlLEVBMmFmLFdBM2FlLEVBNGFmLFdBNWFlLEVBNmFmLFdBN2FlLEVBOGFmLFdBOWFlLEVBK2FmLFdBL2FlLEVBZ2JmLFdBaGJlLEVBaWJmLFdBamJlLEVBa2JmLFdBbGJlLEVBbWJmLE9BbmJlLEVBb2JmLFdBcGJlLEVBcWJmLFdBcmJlLEVBc2JmLFdBdGJlLEVBdWJmLFdBdmJlLEVBd2JmLE9BeGJlLEVBeWJmLFdBemJlLEVBMGJmLE9BMWJlLEVBMmJmLE9BM2JlLEVBNGJmLE9BNWJlLEVBNmJmLE9BN2JlLEVBOGJmLE9BOWJlLEVBK2JmLE9BL2JlLEVBZ2NmLE9BaGNlLEVBaWNmLE9BamNlLEVBa2NmLE9BbGNlLEVBbWNmLE9BbmNlLEVBb2NmLE9BcGNlLEVBcWNmLE9BcmNlLEVBc2NmLE9BdGNlLEVBdWNmLE9BdmNlLEVBd2NmLE9BeGNlLEVBeWNmLE9BemNlLEVBMGNmLE9BMWNlLEVBMmNmLE9BM2NlLEVBNGNmLE9BNWNlLEVBNmNmLE9BN2NlLEVBOGNmLE9BOWNlLEVBK2NmLE9BL2NlLEVBZ2RmLE9BaGRlLEVB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXG4jIEFwcGxpY2F0aW9uIGNsYXNzIGRlZmluaXRpb25cbiMgTWFuYWdlcyBsaWZlY3ljbGUgYW5kIGJvb3RzdHJhcHMgYXBwbGljYXRpb25cbmNsYXNzIEFwcGxpY2F0aW9uIGV4dGVuZHMgTWFyaW9uZXR0ZS5TZXJ2aWNlXG5cbiAgcmFkaW9FdmVudHM6XG4gICAgJ2FwcCByZWRpcmVjdCc6ICdyZWRpcmVjdFRvJ1xuXG4gICMgSW52b2tlZCBhZnRlciBjb25zdHJ1Y3RvclxuICBpbml0aWFsaXplOiAtPlxuXG4gICAgIyBTdGFydHMgSGVhZGVyIENvbXBvbmVudFxuICAgIEJhY2tib25lLlJhZGlvLmNoYW5uZWwoJ2hlYWRlcicpLnRyaWdnZXIoJ3Jlc2V0JylcblxuICAgICMgU3RhcnRzIEhlbnNvbi5qcyBDb21wb25lbnRzXG4gICAgQmFja2JvbmUuUmFkaW8uY2hhbm5lbCgnYnJlYWRjcnVtYicpLnRyaWdnZXIoJ3JlYWR5JylcbiAgICBCYWNrYm9uZS5SYWRpby5jaGFubmVsKCdvdmVybGF5JykudHJpZ2dlcigncmVhZHknKVxuICAgIEBvblJlYWR5KClcbiAgICByZXR1cm4gdHJ1ZVxuXG4gICMgU3RhcnRzIHRoZSBhcHBsaWNhdGlvblxuICAjIFN0YXJ0cyBCYWNrYm9uZS5oaXN0b3J5IChlbmFibGVzIHJvdXRpbmcpXG4gICMgQW5kIGluaXRpYWxpemVzIHNpZGViYXIgbW9kdWxlXG4gIG9uUmVhZHk6IC0+XG4gICAgQmFja2JvbmUuaGlzdG9yeS5zdGFydCgpXG4gICAgQmFja2JvbmUuUmFkaW8uY2hhbm5lbCgnc2lkZWJhcicpLnRyaWdnZXIoJ3Jlc2V0JylcblxuICAjIFJlZGlyZWN0aW9uIGludGVyZmFjZVxuICAjIFVzZWQgYWNjcm9zcyB0aGUgYXBwbGljYXRpb24gdG8gcmVkaXJlY3RcbiAgIyB0byBzcGVjaWZpYyB2aWV3cyBhZnRlciBzcGVjaWZpYyBhY3Rpb25zXG4gIHJlZGlyZWN0VG86IChyb3V0ZSkgLT5cbiAgICB3aW5kb3cubG9jYXRpb24gPSByb3V0ZVxuICAgIHJldHVybiB0cnVlXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFwcGxpY2F0aW9uXG4iLCJcbiMgQXBwbGljYXRpb25MYXlvdXQgY2xhc3MgZGVmaW5pdGlvblxuIyBEZWZpbmVzIGEgTWFyaW9uZXR0ZS5MYXlvdXRWaWV3IHRvIG1hbmFnZVxuIyB0b3AtbGV2ZWwgYXBwbGljYXRpb24gcmVnaW9uc1xuY2xhc3MgQXBwbGljYXRpb25MYXlvdXQgZXh0ZW5kcyBNYXJpb25ldHRlLkxheW91dFZpZXdcbiAgZWw6ICdib2R5J1xuXG4gIHRlbXBsYXRlOiBmYWxzZVxuXG4gIHJlZ2lvbnM6XG4gICAgaGVhZGVyOiAgICAgJ1thcHAtcmVnaW9uPWhlYWRlcl0nXG4gICAgc2lkZWJhcjogICAgJ1thcHAtcmVnaW9uPXNpZGViYXJdJ1xuICAgIGJyZWFkY3J1bWI6ICdbYXBwLXJlZ2lvbj1icmVhZGNydW1iXSdcbiAgICBvdmVybGF5OiAgICAnW2FwcC1yZWdpb249b3ZlcmxheV0nXG4gICAgZmxhc2g6ICAgICAgJ1thcHAtcmVnaW9uPWZsYXNoXSdcbiAgICBtYWluOiAgICAgICAnW2FwcC1yZWdpb249bWFpbl0nXG5cbiMgIyAjICMgI1xuXG4jIEV4cG9ydHMgaW5zdGFuY2Vcbm1vZHVsZS5leHBvcnRzID0gbmV3IEFwcGxpY2F0aW9uTGF5b3V0KCkucmVuZGVyKClcbiIsIlxuIyBNYXJpb25ldHRlIEJlaGF2aW9yIE1hbmlmZXN0XG5tb2R1bGUuZXhwb3J0cyA9XG4gIFN1Ym1pdEJ1dHRvbjogICAgIHJlcXVpcmUgJ2huX2JlaGF2aW9ycy9saWIvc3VibWl0QnV0dG9uJ1xuICBGbGFzaGVzOiAgICAgICAgICByZXF1aXJlICdobl9iZWhhdmlvcnMvbGliL2ZsYXNoZXMnXG4gIE1vZGVsRXZlbnRzOiAgICAgIHJlcXVpcmUgJ2huX2JlaGF2aW9ycy9saWIvbW9kZWxFdmVudHMnXG4gIEJpbmRJbnB1dHM6ICAgICAgIHJlcXVpcmUgJ2huX2JlaGF2aW9ycy9saWIvYmluZElucHV0cydcbiAgVG9vbHRpcHM6ICAgICAgICAgcmVxdWlyZSAnaG5fYmVoYXZpb3JzL2xpYi90b29sdGlwcydcbiAgU2VsZWN0YWJsZUNoaWxkOiAgcmVxdWlyZSAnLi9zZWxlY3RhYmxlQ2hpbGQnXG4iLCJcbmNsYXNzIFNlbGVjdGFibGVDaGlsZCBleHRlbmRzIE1hcmlvbmV0dGUuQmVoYXZpb3JcblxuICBjc3M6XG4gICAgYWN0aXZlOiAnYWN0aXZlJ1xuXG4gIGV2ZW50czpcbiAgICAnY2xpY2snOiAgJ29uQ2xpY2snXG5cbiAgbW9kZWxFdmVudHM6XG4gICAgJ3NlbGVjdGVkJzogJ29uQ2xpY2snXG5cbiAgIyBTZWxlY3RzIGFjdGl2ZU1vZGVsIG9uIHJlbmRlclxuICBvblJlbmRlcjogLT5cbiAgICByZXR1cm4gdW5sZXNzIEBvcHRpb25zLnNldEFjdGl2ZVxuICAgIEAkZWwudHJpZ2dlcignY2xpY2snKSBpZiBAdmlldy5tb2RlbC5jb2xsZWN0aW9uLl9hY3RpdmVNb2RlbCA9PSBAdmlldy5tb2RlbC5pZFxuXG4gICMgU2V0cyBhY3RpdmVNb2RlbCBvbiBjbGlja1xuICBvblNlbGVjdGVkOiAtPlxuICAgIHJldHVybiB1bmxlc3MgQG9wdGlvbnMuc2V0QWN0aXZlXG4gICAgQHZpZXcubW9kZWwuY29sbGVjdGlvbi5fc2V0QWN0aXZlTW9kZWwoQHZpZXcubW9kZWwuaWQpXG4gICAgQHZpZXcubW9kZWwuY29sbGVjdGlvbi50cmlnZ2VyKCdzZWxlY3RlZDptb2RlbCcsIEB2aWV3Lm1vZGVsKVxuXG4gICMgSW52b2tlZCB3aGVuIGNsaWNrZWRcbiAgb25DbGljazogKGUpIC0+XG4gICAgIyBCeXBhc3MgYmVoYXZpb3Igd2l0aCBjdXN0b20gb25DbGljayBjYWxsYmFja1xuICAgIHJldHVybiBAdmlldy5vbkNsaWNrKGUpIGlmIEB2aWV3Lm9uQ2xpY2tcblxuICAgICMgUHJldmVudCBkb3VibGUtY2xpY2sgdW5sZXNzIHNwZWNpZmljZWRcbiAgICBlPy5wcmV2ZW50RGVmYXVsdCgpIHVubGVzcyBAb3B0aW9ucy5kb3VibGVDbGlja1xuXG4gICAgIyBSZXR1cm4gaWYgZWxlbWVudCBpcyBjdXJyZW50bHkgc2VsZWN0ZWRcbiAgICByZXR1cm4gaWYgQCRlbC5oYXNDbGFzcyhAY3NzLmFjdGl2ZSlcblxuICAgICMgUHJldmVudCBkZWFmdWx0IGFuZCB0cmlnZ2VyIHNlbGVjdGVkXG4gICAgZT8ucHJldmVudERlZmF1bHQoKVxuICAgIEB2aWV3LnRyaWdnZXJNZXRob2QgJ3NlbGVjdGVkJ1xuICAgIEAkZWwuYWRkQ2xhc3MoQGNzcy5hY3RpdmUpLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoQGNzcy5hY3RpdmUpXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNlbGVjdGFibGVDaGlsZFxuIiwiTGF5b3V0VmlldyA9IHJlcXVpcmUgJy4vdmlld3MvbGF5b3V0J1xuXG4jIEhlYWRlclNlcnZpY2UgY2xhc3MgZGVmaW5pdGlvblxuIyBEZWZpbmVzIGEgYmFzaWMgc2VydmljZSBmb3IgbWFuYWdpbmcgYXBwbGljYXRpb25cbiMgaGVhZGVyIHN0YXRlLiBEaXNwbGF5cyB0aGUgYXV0aGVudGljYXRlZCB1c2VyLFxuIyBvciB0aGUgJ3VuYXV0aGVudGljYXRlZCcgbWVzc2FnZSBpZiBub25lIGlzIGRlZmluZWRcbmNsYXNzIEhlYWRlclNlcnZpY2UgZXh0ZW5kcyBNYXJpb25ldHRlLlNlcnZpY2VcblxuICBpbml0aWFsaXplOiAtPlxuICAgIEBjb250YWluZXIgPSBAb3B0aW9ucy5jb250YWluZXJcblxuICByYWRpb0V2ZW50czpcbiAgICAnaGVhZGVyIHJlc2V0JzogJ3Jlc2V0J1xuXG4gIHJlc2V0OiAtPlxuICAgIEBjb250YWluZXIuc2hvdyBuZXcgTGF5b3V0VmlldygpXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEhlYWRlclNlcnZpY2VcbiIsIlxuIyBIZWFkZXJWaWV3IGNsYXNzIGRlZmluaXRpb25cbiMgRGVmaW5lcyBhIHNpbWJwbGUgdmlldyBmb3IgZGlzcGxheWluZyB0aGVcbiMgaGVhZGVyIG9mIHRoZSBhcHBsaWNhdGlvbi4gVGhlIGhlYWRlciBkaXNwbGF5c1xuIyB0aGUgYXV0aGVudGljYXRlZCB1c2VyIGFuZFxuIyBtYW5hZ2VzIHRvZ2dsaW5nIHRoZSBTaWRlYmFyQ29tcG9uZW50J3Mgdmlld1xuY2xhc3MgSGVhZGVyVmlldyBleHRlbmRzIE1hcmlvbmV0dGUuTGF5b3V0Vmlld1xuICB0ZW1wbGF0ZTogcmVxdWlyZSAnLi90ZW1wbGF0ZXMvaGVhZGVyJ1xuICBjbGFzc05hbWU6ICduYXYgbmF2YmFyIG5hdmJhci1zdGF0aWMtdG9wIG5hdmJhci1saWdodCdcblxuICBldmVudHM6XG4gICAgJ2NsaWNrIC5uYXZiYXItYnJhbmQnOiAndG9nZ2xlU2lkZWJhcidcblxuICB0b2dnbGVTaWRlYmFyOiAtPlxuICAgIEJhY2tib25lLlJhZGlvLmNoYW5uZWwoJ3NpZGViYXInKS50cmlnZ2VyKCd0b2dnbGUnKVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBIZWFkZXJWaWV3XG4iLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcblxuYnVmLnB1c2goXCI8YSBjbGFzcz1cXFwibmF2YmFyLWJyYW5kIGJ0biBidG4tc2Vjb25kYXJ5IGJ0bi1jaXJjbGVcXFwiPjxpIGNsYXNzPVxcXCJmYSBmYS1mdyBmYS1jdXRsZXJ5XFxcIj48L2k+PC9hPjxkaXYgY2xhc3M9XFxcIm5hdmJhci1icmFuZCB0aXRsZVxcXCI+TllTIEhFQUxUSCBJTlNQRUNUSU9OUzwvZGl2PlwiKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJTaWRlYmFyVmlldyA9IHJlcXVpcmUgJy4vdmlldydcblxuIyAjICMgIyAjXG5cbiMgU2lkZWJhckNvbXBvbmVudCBjbGFzcyBkZWZpbml0aW9uXG4jIFRoZSBTaWRlYmFyQ29tcG9uZW50IG1hbmFnZXMgdGhlIHN0YXRlIGFuZCBhY2Nlc3NpYmlsaXR5XG4jIG9mIHRoZSBhcHAncyBzaWRlYmFyLiBUaGUgc2lkZWJhciBpcyB1c2VkIGFzIHRoZSBwcmltYXJ5XG4jIG1ldGhvZCBvZiBuYXZpZ2F0aW9uIGluc2lkZSB0aGUgYXBwXG5jbGFzcyBTaWRlYmFyQ29tcG9uZW50IGV4dGVuZHMgTWFyaW9uZXR0ZS5TZXJ2aWNlXG5cbiAgcmFkaW9FdmVudHM6XG4gICAgJ3NpZGViYXIgcmVzZXQnOiAgJ3Nob3dWaWV3J1xuICAgICdzaWRlYmFyIHRvZ2dsZSc6ICd0b2dnbGVTaWRlYmFyJ1xuICAgICdzaWRlYmFyIGhpZGUnOiAgICdoaWRlU2lkZWJhcidcblxuICBzaG93VmlldzogLT5cbiAgICBAdmlldyA9IG5ldyBTaWRlYmFyVmlldyh7IG1vZHVsZXM6IEBtb2R1bGVzIH0pXG4gICAgQG9wdGlvbnMuY29udGFpbmVyLnNob3coQHZpZXcpXG5cbiAgaGlkZVNpZGViYXI6IC0+XG4gICAgcmV0dXJuIHVubGVzcyBAdmlld1xuICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnc2lkZWJhci1hY3RpdmUnKVxuXG4gIHRvZ2dsZVNpZGViYXI6IC0+XG4gICAgcmV0dXJuIHVubGVzcyBAdmlld1xuICAgICQoJ2JvZHknKS50b2dnbGVDbGFzcygnc2lkZWJhci1hY3RpdmUnKVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBTaWRlYmFyQ29tcG9uZW50XG4iLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcbjt2YXIgbG9jYWxzX2Zvcl93aXRoID0gKGxvY2FscyB8fCB7fSk7KGZ1bmN0aW9uIChpdGVtcywgdW5kZWZpbmVkKSB7XG5qYWRlX21peGluc1tcInNpZGViYXJMaW5rXCJdID0gamFkZV9pbnRlcnAgPSBmdW5jdGlvbihvcHRzKXtcbnZhciBibG9jayA9ICh0aGlzICYmIHRoaXMuYmxvY2spLCBhdHRyaWJ1dGVzID0gKHRoaXMgJiYgdGhpcy5hdHRyaWJ1dGVzKSB8fCB7fTtcbmJ1Zi5wdXNoKFwiPGFcIiArIChqYWRlLmF0dHIoXCJocmVmXCIsIG9wdHMuaHJlZiwgdHJ1ZSwgZmFsc2UpKSArIFwiIGNsYXNzPVxcXCJuYXYtbGlua1xcXCI+PGlcIiArIChqYWRlLmNscyhbJ2ZhJywnZmEtZncnLCdmYS1sZycsJ20tci0xJyxvcHRzLmljb25dLCBbbnVsbCxudWxsLG51bGwsbnVsbCx0cnVlXSkpICsgXCI+PC9pPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gb3B0cy50aXRsZSkgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9hPlwiKTtcbmlmICggb3B0cy5kaXZpZGVyKVxue1xuYnVmLnB1c2goXCI8YSBjbGFzcz1cXFwibmF2LWxpbmsgZGl2aWRlclxcXCI+PC9hPlwiKTtcbn1cbn07XG5idWYucHVzaChcIlwiKTtcbi8vIGl0ZXJhdGUgaXRlbXNcbjsoZnVuY3Rpb24oKXtcbiAgdmFyICQkb2JqID0gaXRlbXM7XG4gIGlmICgnbnVtYmVyJyA9PSB0eXBlb2YgJCRvYmoubGVuZ3RoKSB7XG5cbiAgICBmb3IgKHZhciAkaW5kZXggPSAwLCAkJGwgPSAkJG9iai5sZW5ndGg7ICRpbmRleCA8ICQkbDsgJGluZGV4KyspIHtcbiAgICAgIHZhciBpdGVtID0gJCRvYmpbJGluZGV4XTtcblxuamFkZV9taXhpbnNbXCJzaWRlYmFyTGlua1wiXShpdGVtKTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciBpdGVtID0gJCRvYmpbJGluZGV4XTtcblxuamFkZV9taXhpbnNbXCJzaWRlYmFyTGlua1wiXShpdGVtKTtcbiAgICB9XG5cbiAgfVxufSkuY2FsbCh0aGlzKTtcbn0uY2FsbCh0aGlzLFwiaXRlbXNcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLml0ZW1zOnR5cGVvZiBpdGVtcyE9PVwidW5kZWZpbmVkXCI/aXRlbXM6dW5kZWZpbmVkLFwidW5kZWZpbmVkXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC51bmRlZmluZWQ6dHlwZW9mIHVuZGVmaW5lZCE9PVwidW5kZWZpbmVkXCI/dW5kZWZpbmVkOnVuZGVmaW5lZCkpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsIlxuIyBTaWRlYmFyVmlldyBjbGFzcyBkZWZpbml0aW9uXG4jIFRoZSBTaWRlYmFyVmlldyByZW5kZXJzIHRoZSBhcHAncyBzaWRlYmFyIHdpdGhcbiMgdGhlIG1lbnVJdGVtcyBzcGVjaWZpZWQgYmVsb3dcbmNsYXNzIFNpZGViYXJWaWV3IGV4dGVuZHMgTWFyaW9uZXR0ZS5MYXlvdXRWaWV3XG4gIHRlbXBsYXRlOiByZXF1aXJlICcuL3RlbXBsYXRlJ1xuICBjbGFzc05hbWU6ICduYXYgbmF2LXBpbGxzIG5hdi1zdGFja2VkJ1xuICB0YWdOYW1lOiAnbmF2J1xuXG4gIG1lbnVJdGVtczogW1xuICAgIHsgaHJlZjogJyMnLCBpY29uOiAnZmEtaG9tZScsIHRpdGxlOiAnRGFzaGJvYXJkJyB9XG4gICAgeyBocmVmOiAnI2Fib3V0JywgaWNvbjogJ2ZhLXF1ZXN0aW9uLWNpcmNsZScsIHRpdGxlOiAnQWJvdXQnLCBkaXZpZGVyOiB0cnVlIH1cbiAgXVxuXG4gIGV2ZW50czpcbiAgICAnY2xpY2sgYSc6ICdvbkNsaWNrZWQnXG5cbiAgb25DbGlja2VkOiAtPlxuICAgIEJhY2tib25lLlJhZGlvLmNoYW5uZWwoJ3NpZGViYXInKS50cmlnZ2VyKCdoaWRlJylcblxuICBzZXJpYWxpemVEYXRhOiAtPlxuICAgIHJldHVybiB7IGl0ZW1zOiBAbWVudUl0ZW1zIH1cblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gU2lkZWJhclZpZXdcbiIsIiMgQXBwIGNvbmZpZ3VyYXRpb24gbWFuaWZlc3RcbnJlcXVpcmUgJy4vand0J1xuIyByZXF1aXJlICcuL2NvcnMnXG5yZXF1aXJlICcuL21hcmlvbmV0dGUnXG4iLCIjIEFqYXggSldUIFNoaW1cbiQuYWpheFNldHVwXG4gIGJlZm9yZVNlbmQ6ICh4aHIpIC0+XG4gICAgdG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKVxuICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdBdXRob3JpemF0aW9uJywgJ0pXVCAnICsgdG9rZW4pIGlmIHRva2VuXG4gICAgcmV0dXJuXG4iLCIjIE1hcmlvbmV0dGUuQmVoYXZpb3JzIGNvbmZpZ3VyYXRpb25cbk1hcmlvbmV0dGUuQmVoYXZpb3JzLmJlaGF2aW9yc0xvb2t1cCA9IC0+IHJlcXVpcmUgJy4uL2JlaGF2aW9ycydcbiIsIiMgVGhpcyBmaWxlIGRlZmluZXMgYSBtYW5pZmVzdCBmb3IgdGhlIGNsaWVudCBhcHBsaWNhdGlvbi5cbiMgVGhpcyBpbmNsdWRlcyBjb25maWd1cmF0aW9uLCBTZXJ2aWNlcywgQ29tcG9uZW50cywgTW9kdWxlc1xuIyBhbmQgdGhlIEFwcGxpY2F0aW9uIHNpbmdsZXRvbiBpbnN0YW5jZS5cblxuIyAjICMgIyAjXG5cbiMgQXBwbGljYXRpb24gY29uZmlndXJhdGlvbiBtYW5pZmVzdFxucmVxdWlyZSAnLi9jb25maWcnXG5cbiMgQXBwbGljYXRpb24gY2xhc3MgZGVmaW5pdGlvbiAmIEFwcCBMYXlvdXRcbkFwcCAgICAgICA9IHJlcXVpcmUgJy4vYXBwJ1xuQXBwTGF5b3V0ID0gcmVxdWlyZSAnLi9hcHBsaWNhdGlvbi92aWV3cy9sYXlvdXQnXG5cbiMgSGVuc29uIEVudGl0aWVzXG5yZXF1aXJlICdobl9lbnRpdGllcy9saWIvY29uZmlnJ1xuXG4jICMgIyAjICNcblxuIyBDb21wb25lbnRzIGFyZSByb3V0ZWxlc3Mgc2VydmljZXMgd2l0aCB2aWV3cyB0aGF0IGFyZVxuIyBhY2Nlc3NpYmxlIGFueXdoZXJlIGluIHRoZSBhcHBsaWNhdGlvblxuIyBVc2VkIHRvIG1hbmFnZSB0aGUgaGVhZGVyLCBzaWRlYmFyLCBmbGFzaCwgYW5kIGNvbmZpcm0gVUkgZWxlbWVudHNcblxuIyBIZW5zb24uanMgQ29tcG9uZW50c1xuSGVhZGVyQ29tcG9uZW50ICAgICA9IHJlcXVpcmUgJy4vY29tcG9uZW50cy9oZWFkZXIvY29tcG9uZW50J1xuU2lkZWJhckNvbXBvbmVudCAgICA9IHJlcXVpcmUgJy4vY29tcG9uZW50cy9zaWRlYmFyL2NvbXBvbmVudCdcbkJyZWFkY3J1bWJDb21wb25lbnQgPSByZXF1aXJlICdobl9icmVhZGNydW1iL2xpYi9jb21wb25lbnQnXG5PdmVybGF5Q29tcG9uZW50ICAgID0gcmVxdWlyZSAnaG5fb3ZlcmxheS9saWIvY29tcG9uZW50J1xuRmxhc2hDb21wb25lbnQgICAgICA9IHJlcXVpcmUgJ2huX2ZsYXNoL2xpYi9jb21wb25lbnQnXG5uZXcgSGVhZGVyQ29tcG9uZW50KHsgY29udGFpbmVyOiBBcHBMYXlvdXQuaGVhZGVyIH0pXG5uZXcgU2lkZWJhckNvbXBvbmVudCh7IGNvbnRhaW5lcjogQXBwTGF5b3V0LnNpZGViYXIgfSlcbm5ldyBCcmVhZGNydW1iQ29tcG9uZW50KHsgY29udGFpbmVyOiBBcHBMYXlvdXQuYnJlYWRjcnVtYiB9KVxubmV3IE92ZXJsYXlDb21wb25lbnQoeyBjb250YWluZXI6IEFwcExheW91dC5vdmVybGF5IH0pXG5uZXcgRmxhc2hDb21wb25lbnQoeyBjb250YWluZXI6IEFwcExheW91dC5mbGFzaCB9KVxuXG4jICMgIyAjICNcblxuIyBNb2R1bGVzXG4jIE1vZHVsZXMgcmVwcmVzZW50IGNvbGxlY3Rpb25zIG9mIGVuZHBvaW50cyBpbiB0aGUgYXBwbGljYXRpb24uXG4jIFRoZXkgaGF2ZSByb3V0ZXMgYW5kIGVudGl0aWVzIChtb2RlbHMgYW5kIGNvbGxlY3Rpb25zKVxuIyBFYWNoIHJvdXRlIHJlcHJlc2VudHMgYW4gZW5kcG9pbnQsIG9yICdwYWdlJyBpbiB0aGUgYXBwLlxucmVxdWlyZSAnLi9tb2R1bGVzL3BhcmFtcy9mYWN0b3J5J1xuSG9tZU1vZHVsZSA9IHJlcXVpcmUgJy4vbW9kdWxlcy9ob21lL3JvdXRlcidcbm5ldyBIb21lTW9kdWxlKHsgY29udGFpbmVyOiBBcHBMYXlvdXQubWFpbiB9KVxuXG4jICMgIyAjICMgI1xuXG4jIFBhZ2UgaGFzIGxvYWRlZCwgZG9jdW1lbnQgaXMgcmVhZHlcbiQoZG9jdW1lbnQpLm9uICdyZWFkeScsID0+IG5ldyBBcHAoKSAjIEluc3RhbnRpYXRlcyBuZXcgQXBwXG4iLCJMYXlvdXRWaWV3ICA9IHJlcXVpcmUgJy4vdmlld3MvbGF5b3V0J1xuXG4jICMgIyAjICNcblxuY2xhc3MgQWJvdXRSb3V0ZSBleHRlbmRzIHJlcXVpcmUgJ2huX3JvdXRpbmcvbGliL3JvdXRlJ1xuXG4gIHRpdGxlOiAnTllTIEhlYWx0aCBJbnNwZWN0aW9ucyAtIEFib3V0J1xuXG4gIGJyZWFkY3J1bWJzOiBbeyB0ZXh0OiAnQWJvdXQnIH1dXG5cbiAgcmVuZGVyOiAtPlxuICAgIEBjb250YWluZXIuc2hvdyBuZXcgTGF5b3V0VmlldygpXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFib3V0Um91dGVcbiIsIiMgIyAjICMgI1xuXG5jbGFzcyBBYm91dFZpZXcgZXh0ZW5kcyBNbi5MYXlvdXRWaWV3XG4gIHRlbXBsYXRlOiByZXF1aXJlICcuL3RlbXBsYXRlcy9sYXlvdXQnXG4gIGNsYXNzTmFtZTogJ2NvbnRhaW5lcidcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gQWJvdXRWaWV3XG5cblxuIiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG5cbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwicm93XFxcIj48ZGl2IGNsYXNzPVxcXCJjb2wteHMtMTJcXFwiPjxkaXYgY2xhc3M9XFxcImNhcmQgY2FyZC1ibG9ja1xcXCI+PGRpdiBjbGFzcz1cXFwicm93XFxcIj48ZGl2IGNsYXNzPVxcXCJjb2wteHMtMTIgdGV4dC1jZW50ZXJcXFwiPjxwIGNsYXNzPVxcXCJsZWFkXFxcIj5CdWlsdCBieSZuYnNwOzxhIGhyZWY9XFxcImh0dHA6Ly9hZWtzLmNvXFxcIiB0YXJnZXQ9XFxcIl9ibGFua1xcXCI+QWxleGFuZGVyIFNjaHdhcnR6YmVyZzwvYT4mbmJzcDtmb3ImbmJzcDs8YSBocmVmPVxcXCJodHRwOi8vb3BlbmRhdGFkYXkub3JnL1xcXCIgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiPk9wZW4gRGF0YSBEYXkgMjAxNy48L2E+PC9wPjxwIGNsYXNzPVxcXCJsZWFkXFxcIj5EYXRhIHB1bGxlZCBmcm9tJm5ic3A7PGEgaHJlZj1cXFwiaHR0cHM6Ly9oZWFsdGguZGF0YS5ueS5nb3YvSGVhbHRoL0Zvb2QtU2VydmljZS1Fc3RhYmxpc2htZW50LUluc3BlY3Rpb25zLUJlZ2lubmluZy0yLzJoY2Mtc2hqaVxcXCIgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiPkhlYWx0aCBEYXRhIE5ZPC9hPi48L3A+PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz1cXFwicm93IG0tdC0yXFxcIj48ZGl2IGNsYXNzPVxcXCJjb2wteHMtMTIgdGV4dC1jZW50ZXJcXFwiPjxhIGhyZWY9XFxcImh0dHBzOi8vZ2l0aHViLmNvbS9hZWtzY28vbnlzX2hlYWx0aFxcXCIgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiIGNsYXNzPVxcXCJidG4gYnRuLWxnIGJ0bi1zZWNvbmRhcnlcXFwiPjxpIGNsYXNzPVxcXCJmYSBmYS1mdyBmYS1naXRodWJcXFwiPjwvaT4mbmJzcDtcXG5HaXRodWIgUmVwb3NpdG9yeTwvYT48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJyb3cgbS10LTJcXFwiPjxkaXYgY2xhc3M9XFxcImNvbC14cy0xMiB0ZXh0LWNlbnRlclxcXCI+PHAgY2xhc3M9XFxcImxlYWRcXFwiPlBvd2VyZWQgYnk8L3A+PGEgaHJlZj1cXFwiaHR0cDovL3d3dy5vbmVodWRzb24uaW8vXFxcIiB0YXJnZXQ9XFxcIl9ibGFua1xcXCI+PGltZyBzcmM9XFxcIi4vaW1nL29uZV9odWRzb24ucG5nXFxcIi8+PC9hPjwvZGl2PjwvZGl2PjwvZGl2PjwvZGl2PjwvZGl2PlwiKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJMYXlvdXRWaWV3ICA9IHJlcXVpcmUgJy4vdmlld3MvbGF5b3V0J1xuXG4jICMgIyAjICNcblxuY2xhc3MgRGFzaGJvYXJkUm91dGUgZXh0ZW5kcyByZXF1aXJlICdobl9yb3V0aW5nL2xpYi9yb3V0ZSdcblxuICB0aXRsZTogJ05ZUyBIZWFsdGggSW5zcGVjdGlvbnMgLSBEYXNoYm9hcmQnXG5cbiAgYnJlYWRjcnVtYnM6IFt7IHRleHQ6ICdEYXNoYm9hcmQnIH1dXG5cbiAgZmV0Y2g6IC0+XG4gICAgQHBhcmFtcyA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwoJ3BhcmFtcycpLnJlcXVlc3QoJ21vZGVsJylcblxuICAgIEJhY2tib25lLlJhZGlvLmNoYW5uZWwoJ2RhdGEnKS5yZXF1ZXN0KCdjb2xsZWN0aW9uJylcbiAgICAudGhlbiAoY29sbGVjdGlvbikgPT4gQGNvbGxlY3Rpb24gPSBjb2xsZWN0aW9uXG5cbiAgcmVuZGVyOiAtPlxuICAgIEBjb250YWluZXIuc2hvdyBuZXcgTGF5b3V0Vmlldyh7IGNvbGxlY3Rpb246IEBjb2xsZWN0aW9uLCBwYXJhbXM6IEBwYXJhbXMgfSlcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gRGFzaGJvYXJkUm91dGVcbiIsImNsYXNzIEFic3RyYWN0RmlsdGVyc1ZpZXcgZXh0ZW5kcyBNbi5MYXlvdXRWaWV3XG5cbiAgZ2xvYmFsQXR0cjogJyRnbG9iYWwnICMgTm90ZTogcmVxdWlyZXMgW25hbWU9JGdsb2JhbF0gYXR0cmlidXRlIG9uIGlucHV0LlxuICBnbG9iYWxBdHRyczogbnVsbCAjIEFycmF5IG9mIGF0dHJpYnV0ZXMgdG8gZmlsdGVyIGFnYWluc3QuXG5cbiAgYmVoYXZpb3JzOlxuICAgIFRvb2x0aXBzOiB7fVxuXG4gIHVpOlxuICAgIGlucHV0OiAgJ2lucHV0J1xuICAgIHNlbGVjdDogJ3NlbGVjdCdcbiAgICBjbGVhcjogICdbZGF0YS1jbGljaz1jbGVhcl0nXG5cbiAgZXZlbnRzOlxuICAgICdpbnB1dCAgQHVpLmlucHV0JyAgOiAndGhyb3R0bGVJbnB1dCdcbiAgICAnY2hhbmdlIEB1aS5zZWxlY3QnIDogJ2ZpbHRlckNvbGxlY3Rpb24nXG4gICAgJ2NsaWNrICBAdWkuY2xlYXInICA6ICdjbGVhcidcblxuICAjIFRocm90dGxlcyBpbnB1dCBldmVudCBjYWxsYmFja3Mgb24gPGlucHV0PlxuICAjIE1pdGlnYXRlcyB1bm5lY2Vzc2FyeSBleHBlbnNpdmUgY29sbGVjdGlvbiBmaWx0ZXJpbmdcbiAgdGhyb3R0bGVkRmlsdGVyOiBudWxsXG4gIHRocm90dGxlSW5wdXQ6IC0+XG4gICAgQHRocm90dGxlZEZpbHRlciB8fD0gXy50aHJvdHRsZShAZmlsdGVyQ29sbGVjdGlvbiwgNzUwKVxuICAgIEB0aHJvdHRsZWRGaWx0ZXIoKVxuXG4gIGNsZWFyOiAtPlxuICAgIEB1aS5pbnB1dC52YWwoJycpXG4gICAgQHVpLnNlbGVjdC52YWwoJycpXG4gICAgQGZpbHRlckNvbGxlY3Rpb24oKVxuXG4gIGZpbHRlckNvbGxlY3Rpb246IC0+XG4gICAgZGF0YSA9IEJhY2tib25lLlN5cGhvbi5zZXJpYWxpemUodGhpcylcblxuICAgICMgR2xvYmFsIGZpbHRlclxuICAgIGlmIEBnbG9iYWxBdHRycyAmJiBkYXRhWyBAZ2xvYmFsQXR0ciBdP1xuXG4gICAgICAjIFJlc2V0cyBxdWVyeSBmb3IgYmxhbmsgZ2xvYmFsIHNlYXJjaFxuICAgICAgcmV0dXJuIEBjb2xsZWN0aW9uLmFwcGx5RmlsdGVyKHt9KSBpZiAhZGF0YVsgQGdsb2JhbEF0dHIgXVxuXG4gICAgICAjIEFzc2VtYmxlcyBxdWVyeSBvYmplY3RcbiAgICAgIHF1ZXJ5ID0geyAkb3I6IFtdIH1cblxuICAgICAgIyBJdGVyYXRlcyBvdmVyIGF0dHJpYnV0ZXMgYW5kIGFzc2lnbnMgdmFsdWUgdG8gcXVlcnlcbiAgICAgIGZvciBhdHRyIGluIEBnbG9iYWxBdHRyc1xuICAgICAgICBvYmogPSB7fVxuICAgICAgICBvYmpbYXR0cl0gPSB7ICRsaWtlSTogZGF0YVsgQGdsb2JhbEF0dHIgXSB9XG4gICAgICAgIHF1ZXJ5Wyckb3InXS5wdXNoKG9iailcblxuICAgICMgTm9uLWdsb2JhbCBmaWx0ZXJcbiAgICBlbHNlXG4gICAgICBxdWVyeURhdGEgPSBbXVxuICAgICAgXy5tYXBPYmplY3QgZGF0YSwgKHZhbCwga2V5KSA9PlxuICAgICAgICByZXR1cm4gZGVsZXRlIGRhdGFba2V5XSB1bmxlc3MgdmFsICMgU3RyaXBzIG51bGwgdmFsdWVzXG4gICAgICAgIG9iaiA9IHt9XG4gICAgICAgIG9ialtrZXldID0geyAkbGlrZUk6IHZhbCB9XG4gICAgICAgIHF1ZXJ5RGF0YS5wdXNoKG9iailcblxuICAgICAgcXVlcnkgPSB7ICRhbmQ6IHF1ZXJ5RGF0YSB9XG5cbiAgICAjIFF1ZXJpZXMgY29sbGVjdGlvblxuICAgIEBjb2xsZWN0aW9uLmFwcGx5RmlsdGVyKHF1ZXJ5KVxuXG4gIG9uQmVmb3JlRGVzdHJveTogLT5cbiAgICBAY2xlYXIoKVxuXG4jICMgIyAjICNcblxuY2xhc3MgRmlsdGVyVmlldyBleHRlbmRzIEFic3RyYWN0RmlsdGVyc1ZpZXdcbiAgY2xhc3NOYW1lOiAncm93J1xuICB0ZW1wbGF0ZTogcmVxdWlyZSAnLi90ZW1wbGF0ZXMvZmlsdGVyJ1xuICBnbG9iYWxBdHRyczogWydvcGVyYXRpb25fbmFtZSddXG5cbiAgdGVtcGxhdGVIZWxwZXJzOiAtPlxuICAgIHsgcGxhY2Vob2xkZXI6ICdCdXNpbmVzcyBOYW1lJyB9XG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEZpbHRlclZpZXdcbiIsIlxuY2xhc3MgRm9ybVZpZXcgZXh0ZW5kcyBNbi5MYXlvdXRWaWV3XG4gIHRlbXBsYXRlOiByZXF1aXJlICcuL3RlbXBsYXRlcy9mb3JtJ1xuICBjbGFzc05hbWU6ICdjYXJkIGNhcmQtYmxvY2sgbS1iLTAnXG5cbiAgZXZlbnRzOlxuICAgICdjaGFuZ2Ugc2VsZWN0JzogJ29uU2VsZWN0Q2hhbmdlJ1xuXG4gIHRlbXBsYXRlSGVscGVyczogLT5cbiAgICByZXR1cm4ge1xuICAgICAgY2l0aWVzOiAgIEBvcHRpb25zLnBhcmFtcy5nZXQoJ2NpdGllcycpXG4gICAgICBjb3VudGllczogQG9wdGlvbnMucGFyYW1zLmdldCgnY291bnRpZXMnKVxuICAgICAgemlwczogICAgIEBvcHRpb25zLnBhcmFtcy5nZXQoJ3ppcHMnKVxuICAgIH1cblxuICBvblJlbmRlcjogLT5cbiAgICBzZXRUaW1lb3V0KEBpbml0U2VsZWN0MiwgMjAwKVxuXG4gIGluaXRTZWxlY3QyOiAtPlxuICAgICQoJ3NlbGVjdCcpLnNlbGVjdDIoeyBwbGFjZWhvZGVyOiAnQ2l0eScgfSlcblxuICBvblNlbGVjdENoYW5nZTogKGUpIC0+XG4gICAgIyBUT0RPIC0gY2l0eSwgY291bnR5LCB6aXAgLSBlbHNlP1xuICAgIGRhdGEgPSBCYWNrYm9uZS5TeXBob24uc2VyaWFsaXplKEApXG4gICAgZGF0YSA9IHtmYWNpbGl0eV9jaXR5OiBkYXRhLmNpdHl9XG5cbiAgICBAY29sbGVjdGlvbi5zZWFyY2goZGF0YSlcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gRm9ybVZpZXdcblxuXG4iLCJNYXBWaWV3ID0gcmVxdWlyZSAnLi9tYXAnXG5cbiMgIyAjICMgI1xuXG5jbGFzcyBWaW9sYXRpb25JdGVtIGV4dGVuZHMgTW4uTGF5b3V0Vmlld1xuICB0YWdOYW1lOiAndHInXG4gIHRlbXBsYXRlOiByZXF1aXJlICcuL3RlbXBsYXRlcy92aW9sYXRpb25faXRlbSdcblxuICBiZWhhdmlvcnM6XG4gICAgVG9vbHRpcHM6IHt9XG5cbiAgY2xhc3NOYW1lOiAtPlxuICAgIGlmIEBtb2RlbC5pc0NyaXRpY2FsKClcbiAgICAgIHJldHVybiAndGFibGUtZGFuZ2VyJ1xuXG4gICAgZWxzZSBpZiBAbW9kZWwuZ2V0KCd2aW9sYXRpb25faXRlbScpLnRvTG93ZXJDYXNlKCkgPT0gJ25vbmUnXG4gICAgICByZXR1cm4gJ3RhYmxlLXN1Y2Nlc3MnXG5cbiAgICBlbHNlXG4gICAgICByZXR1cm4gJ3RhYmxlLXdhcm5pbmcnXG5cbiAgdGVtcGxhdGVIZWxwZXJzOiAtPlxuICAgIHJldHVybiB7IGRhdGU6IG1vbWVudChAbW9kZWwuZ2V0KCdkYXRlX29mX2luc3BlY3Rpb24nKSkuZm9ybWF0KCdNTS9ERC9ZWScpIH1cblxuIyAjICMgIyAjXG5cbmNsYXNzIFZpb2xhdGlvbkxpc3QgZXh0ZW5kcyBNbi5Db21wb3NpdGVWaWV3XG4gIGNsYXNzTmFtZTogJ3JvdydcbiAgdGVtcGxhdGU6IHJlcXVpcmUgJy4vdGVtcGxhdGVzL3Zpb2xhdGlvbl9saXN0J1xuICBjaGlsZFZpZXc6IFZpb2xhdGlvbkl0ZW1cbiAgY2hpbGRWaWV3Q29udGFpbmVyOiAndGJvZHknXG5cbiMgIyAjICMgI1xuXG5jbGFzcyBWaW9sYXRpb25Mb2FkZXIgZXh0ZW5kcyBNbi5MYXlvdXRWaWV3XG4gIGNsYXNzTmFtZTogJ2NhcmQgY2FyZC1ibG9jayB0ZXh0LWNlbnRlcidcbiAgdGVtcGxhdGU6IHJlcXVpcmUgJy4vdGVtcGxhdGVzL2xvYWRpbmcnXG5cbiMgIyAjICMgI1xuXG5jbGFzcyBWaWV3U2VsZWN0b3IgZXh0ZW5kcyByZXF1aXJlICdobl92aWV3cy9saWIvbmF2J1xuXG4gIG5hdkl0ZW1zOiBbXG4gICAgeyBpY29uOiAnZmEtbGlzdC1hbHQnLCAgIHRleHQ6ICdWaW9sYXRpb25zJywgdHJpZ2dlcjogJ3Zpb2xhdGlvbnMnLCBkZWZhdWx0OiB0cnVlIH1cbiAgICB7IGljb246ICdmYS1tYXAtbycsICB0ZXh0OiAnTWFwJywgdHJpZ2dlcjogJ21hcCcgfVxuICBdXG5cbiAgbmF2RXZlbnRzOlxuICAgICd2aW9sYXRpb25zJzogJ3Nob3dWaW9sYXRpb25zJ1xuICAgICdtYXAnOiAgICAgICAgJ3Nob3dNYXAnXG5cbiAgc2hvd1Zpb2xhdGlvbnM6IC0+XG4gICAgQGNvbnRlbnRSZWdpb24uc2hvdyBuZXcgVmlvbGF0aW9uTG9hZGVyKClcblxuICAgIEBtb2RlbC5lbnN1cmVWaW9sYXRpb25zKCkudGhlbiAodmlvbGF0aW9ucykgPT5cbiAgICAgIEBjb250ZW50UmVnaW9uLnNob3cgbmV3IFZpb2xhdGlvbkxpc3QoeyBjb2xsZWN0aW9uOiB2aW9sYXRpb25zIH0pXG5cbiAgc2hvd01hcDogLT5cbiAgICBAY29udGVudFJlZ2lvbi5zaG93IG5ldyBNYXBWaWV3KHsgbW9kZWw6IEBtb2RlbCB9KVxuXG4jICMgIyAjICNcblxuY2xhc3MgSXRlbURldGFpbCBleHRlbmRzIE1uLkxheW91dFZpZXdcbiAgY2xhc3NOYW1lOiAnY2FyZCBjYXJkLWJsb2NrJ1xuICB0ZW1wbGF0ZTogcmVxdWlyZSAnLi90ZW1wbGF0ZXMvaXRlbV9kZXRhaWwnXG5cbiAgcmVnaW9uczpcbiAgICBzZWxlY3RvclJlZ2lvbjogICAnW2RhdGEtcmVnaW9uPXNlbGVjdG9yXSdcbiAgICBtYXBSZWdpb246ICAgICAgICAnW2RhdGEtcmVnaW9uPW1hcF0nXG4gICAgdmlvbGF0aW9uc1JlZ2lvbjogJ1tkYXRhLXJlZ2lvbj12aW9sYXRpb25zXSdcblxuICBvblJlbmRlcjogLT5cbiAgICBAc2VsZWN0b3JSZWdpb24uc2hvdyBuZXcgVmlld1NlbGVjdG9yKHsgbW9kZWw6IEBtb2RlbCB9KVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBJdGVtRGV0YWlsXG4iLCJcbmNsYXNzIEl0ZW1FbXB0eSBleHRlbmRzIE1uLkxheW91dFZpZXdcbiAgdGVtcGxhdGU6IHJlcXVpcmUgJy4vdGVtcGxhdGVzL2l0ZW1fZW1wdHknXG4gIGNsYXNzTmFtZTogJ2xpc3QtZ3JvdXAtaXRlbSBsaXN0LWdyb3VwLWl0ZW0td2FybmluZydcblxuIyAjICMgIyAjXG5cbmNsYXNzIEl0ZW1DaGlsZCBleHRlbmRzIE1uLkxheW91dFZpZXdcbiAgdGVtcGxhdGU6IHJlcXVpcmUgJy4vdGVtcGxhdGVzL2l0ZW1fY2hpbGQnXG4gIGNsYXNzTmFtZTogJ2xpc3QtZ3JvdXAtaXRlbSdcblxuICBiZWhhdmlvcnM6XG4gICAgU2VsZWN0YWJsZUNoaWxkOiB7fVxuXG4jICMgIyAjICNcblxuY2xhc3MgSXRlbUxpc3QgZXh0ZW5kcyBNbi5Db2xsZWN0aW9uVmlld1xuICBjbGFzc05hbWU6ICdsaXN0LWdyb3VwJ1xuICBjaGlsZFZpZXc6IEl0ZW1DaGlsZFxuICBlbXB0eVZpZXc6IEl0ZW1FbXB0eVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBJdGVtTGlzdFxuIiwiRm9ybVZpZXcgPSByZXF1aXJlICcuL2Zvcm0nXG5GaWx0ZXJWaWV3ID0gcmVxdWlyZSAnLi9maWx0ZXInXG5NYXBWaWV3ID0gcmVxdWlyZSAnLi9tYXAnXG5JdGVtTGlzdCA9IHJlcXVpcmUgJy4vaXRlbUxpc3QnXG5JdGVtRGV0YWlsID0gcmVxdWlyZSAnLi9pdGVtRGV0YWlsJ1xuUGFnaW5hdGlvblZpZXcgPSByZXF1aXJlICdobl92aWV3cy9saWIvcGFnaW5hdGlvbidcblxuIyAjICMgIyAjXG5cbmNsYXNzIERhc2hib2FyZFZpZXcgZXh0ZW5kcyBNbi5MYXlvdXRWaWV3XG4gIHRlbXBsYXRlOiByZXF1aXJlICcuL3RlbXBsYXRlcy9sYXlvdXQnXG4gIGNsYXNzTmFtZTogJ2NvbnRhaW5lci1mbHVpZCdcblxuICByZWdpb25zOlxuICAgIGZvcm1SZWdpb246ICAgICAgICdbZGF0YS1yZWdpb249Zm9ybV0nXG4gICAgZmlsdGVyUmVnaW9uOiAgICAgJ1tkYXRhLXJlZ2lvbj1maWx0ZXJdJ1xuICAgIGxpc3RSZWdpb246ICAgICAgICdbZGF0YS1yZWdpb249bGlzdF0nXG4gICAgcGFnaW5hdGlvblJlZ2lvbjogJ1tkYXRhLXJlZ2lvbj1wYWdpbmF0aW9uXSdcbiAgICBkZXRhaWxSZWdpb246ICAgICAnW2RhdGEtcmVnaW9uPWRldGFpbF0nXG5cbiAgY29sbGVjdGlvbkV2ZW50czpcbiAgICAnc3luYyc6ICdvbkNvbGxlY3Rpb25TeW5jJ1xuICAgICdyZXNldCc6ICdvbkNvbGxlY3Rpb25SZXNldCdcblxuICBvbkNvbGxlY3Rpb25TeW5jOiA9PlxuICAgIEBzaG93RmlsdGVyVmlldygpXG4gICAgQG9uQ29sbGVjdGlvblJlc2V0KClcblxuICBvbkNvbGxlY3Rpb25SZXNldDogPT5cbiAgICBzZXRUaW1lb3V0KCA9PlxuICAgICAgQGNvbGxlY3Rpb24uYXQoMCk/LnRyaWdnZXIoJ3NlbGVjdGVkJylcbiAgICAsIDIwMClcblxuICBvblJlbmRlcjogLT5cblxuICAgICMgUmVuZGVycyBGb3JtVmlld1xuICAgIEBmb3JtUmVnaW9uLnNob3cgbmV3IEZvcm1WaWV3KHsgY29sbGVjdGlvbjogQGNvbGxlY3Rpb24sIHBhcmFtczogQG9wdGlvbnMucGFyYW1zIH0pXG5cbiAgICAjIFJlbmRlcnMgRmlsdGVyc1xuICAgIEBzaG93RmlsdGVyVmlldygpXG5cbiAgICAjIFJlbmRlcnMgTGlzdFZpZXdcbiAgICBsaXN0VmlldyA9IG5ldyBJdGVtTGlzdCh7IGNvbGxlY3Rpb246IEBjb2xsZWN0aW9uIH0pXG4gICAgbGlzdFZpZXcub24gJ2NoaWxkdmlldzpzZWxlY3RlZCcsICh2aWV3KSA9PiBAc2hvd0RldGFpbFZpZXcodmlldy5tb2RlbClcbiAgICBAbGlzdFJlZ2lvbi5zaG93KGxpc3RWaWV3KVxuICAgIEBvbkNvbGxlY3Rpb25TeW5jKClcblxuICAgICMgUmVuZGVycyBQYWdpbmF0aW9uVmlld1xuICAgIEBwYWdpbmF0aW9uUmVnaW9uLnNob3cgbmV3IFBhZ2luYXRpb25WaWV3KHsgY29sbGVjdGlvbjogQGNvbGxlY3Rpb24sIHBhZ2VyOiB0cnVlIH0pXG5cbiAgc2hvd0RldGFpbFZpZXc6IChkYXRhc2V0KSAtPlxuICAgIEBkZXRhaWxSZWdpb24uc2hvdyBuZXcgSXRlbURldGFpbCh7IG1vZGVsOiBkYXRhc2V0IH0pXG5cbiAgc2hvd0ZpbHRlclZpZXc6IC0+XG4gICAgIyBSZW5kZXJzIEZpbHRlcnNcbiAgICBAZmlsdGVyUmVnaW9uLnNob3cgbmV3IEZpbHRlclZpZXcoeyBjb2xsZWN0aW9uOiBAY29sbGVjdGlvbiB9KVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBEYXNoYm9hcmRWaWV3XG5cblxuIiwiXG4jIEdvb2dsZSBNYXBzIEFQSSBUb2tlbjpcbiMgQUl6YVN5QXNmMlJ6ZlFoSTZMam1sb3hSTTk5M2dkTEJGbkJveFQ4XG5cbiMgIyAjICMgI1xuXG5jbGFzcyBNYXBWaWV3IGV4dGVuZHMgTW4uTGF5b3V0Vmlld1xuICBjbGFzc05hbWU6ICdjYXJkIGNhcmQtYmxvY2snXG4gIHRlbXBsYXRlOiByZXF1aXJlICcuL3RlbXBsYXRlcy9tYXAnXG5cbiAgb25SZW5kZXI6IC0+XG4gICAgc2V0VGltZW91dChAaW5pdE1hcCwgMTAwKVxuXG4gIGluaXRNYXA6ID0+XG5cbiAgICAjIFNldHMgaW5pdGlhbCBsb2NhdGlvblxuICAgIGl0ZW1Mb2NhdGlvbiA9XG4gICAgICBsYXQ6IE51bWJlcihAbW9kZWwuZ2V0KCdsYXRpdHVkZScpKVxuICAgICAgbG5nOiBOdW1iZXIoQG1vZGVsLmdldCgnbG9uZ2l0dWRlJykpXG5cbiAgICAjIE1hcCBvcHRpb25zXG4gICAgbWFwT3B0cyA9XG4gICAgICB6b29tOiAxMlxuICAgICAgY2VudGVyOiBpdGVtTG9jYXRpb25cblxuICAgICMgSW5pdGlhbGl6ZXMgbWFwXG4gICAgQG1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcCcpLCBtYXBPcHRzKVxuXG4gICAgIyBBZGRzIGNvbGxlY3Rpb24gdG8gbWFwXG4gICAgIyBAYWRkTWFya2VycygpXG4gICAgQGFkZE1hcmtlcihAbW9kZWwpXG5cbiAgICByZXR1cm5cblxuICBhZGRNYXJrZXJzOiA9PlxuICAgIHJldHVybiB1bmxlc3MgQGNvbGxlY3Rpb25cbiAgICBAYWRkTWFya2VyKG1vZGVsKSBmb3IgbW9kZWwgaW4gQGNvbGxlY3Rpb24ubW9kZWxzXG5cbiAgYWRkTWFya2VyOiAobW9kZWwpID0+XG5cbiAgICBpdGVtTG9jYXRpb24gPVxuICAgICAgbGF0OiBOdW1iZXIobW9kZWwuZ2V0KCdsYXRpdHVkZScpKVxuICAgICAgbG5nOiBOdW1iZXIobW9kZWwuZ2V0KCdsb25naXR1ZGUnKSlcblxuICAgICMgSW5pdGlhbGl6ZXMgbWFya2VyXG4gICAgbWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlclxuICAgICAgcG9zaXRpb246IGl0ZW1Mb2NhdGlvblxuICAgICAgbWFwOiBAbWFwXG5cbiAgICAjIE1hcmtlciBsaXN0ZW5lclxuICAgICMgbWFya2VyLmFkZExpc3RlbmVyICdjbGljaycsIChlKSA9PlxuICAgICMgICAjIG1vZGVsID0gQGNvbGxlY3Rpb24uZmluZFdoZXJlKHsgbGF0aXR1ZGU6IFN0cmluZyhlLmxhdExuZy5sYXQoKSksIGxvbmdpdHVkZTogU3RyaW5nKGUubGF0TG5nLmxuZygpKSB9KVxuICAgICMgICBtb2RlbCA9IEBjb2xsZWN0aW9uLmZpbmRXaGVyZSh7IGxhdGl0dWRlOiBTdHJpbmcoZS5sYXRMbmcubGF0KCkpIH0pXG4gICAgIyAgIGNvbnNvbGUubG9nIG1vZGVsXG4gICAgIyAgIHJldHVybiB1bmxlc3MgbW9kZWxcbiAgICAjICAgQHRyaWdnZXIgJ2NoaWxkdmlldzpzZWxlY3RlZCcsIG1vZGVsXG4gICAgIyAgICMgQG1hcC5zZXRab29tKDgpXG4gICAgIyAgICMgQG1hcC5zZXRDZW50ZXIobWFya2VyLmdldFBvc2l0aW9uKCkpXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IE1hcFZpZXdcbiIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuO3ZhciBsb2NhbHNfZm9yX3dpdGggPSAobG9jYWxzIHx8IHt9KTsoZnVuY3Rpb24gKHBsYWNlaG9sZGVyKSB7XG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcImNvbC14cy0xMlxcXCI+PGRpdiBjbGFzcz1cXFwiZm9ybS1pbmxpbmVcXFwiPjxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXAgdy0xMDBcXFwiPjxsYWJlbD5GaWx0ZXIgUmVzdWx0czwvbGFiZWw+PGRpdiBjbGFzcz1cXFwiaW5wdXQtZ3JvdXAgdy0xMDBcXFwiPjxpbnB1dCB0eXBlPVxcXCJ0ZXh0XFxcIiBuYW1lPVxcXCIkZ2xvYmFsXFxcIiBhdXRvY29tcGxldGU9XFxcIm9mZlxcXCJcIiArIChqYWRlLmF0dHIoXCJwbGFjZWhvbGRlclwiLCBwbGFjZWhvbGRlciB8fCAnU2VhcmNoJywgdHJ1ZSwgZmFsc2UpKSArIFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiLz48ZGl2IGRhdGEtdG9nZ2xlPVxcXCJ0b29sdGlwXFxcIiBkYXRhLXBsYWNlbWVudD1cXFwicmlnaHRcXFwiIHRpdGxlPVxcXCJDbGVhciBGaWx0ZXJcXFwiIGRhdGEtY2xpY2s9XFxcImNsZWFyXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1zZWNvbmRhcnkgaW5wdXQtZ3JvdXAtYWRkb25cXFwiPjxpIGNsYXNzPVxcXCJmYSBmYS1mdyBmYS10aW1lc1xcXCI+PC9pPjwvZGl2PjwvZGl2PjwvZGl2PjwvZGl2PjwvZGl2PlwiKTt9LmNhbGwodGhpcyxcInBsYWNlaG9sZGVyXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5wbGFjZWhvbGRlcjp0eXBlb2YgcGxhY2Vob2xkZXIhPT1cInVuZGVmaW5lZFwiP3BsYWNlaG9sZGVyOnVuZGVmaW5lZCkpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuO3ZhciBsb2NhbHNfZm9yX3dpdGggPSAobG9jYWxzIHx8IHt9KTsoZnVuY3Rpb24gKGNpdGllcywgdW5kZWZpbmVkKSB7XG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcInJvd1xcXCI+PGRpdiBjbGFzcz1cXFwiY29sLXhzLTEyXFxcIj48ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj48bGFiZWw+U2VhcmNoIEJ5IENpdHk8L2xhYmVsPjxzZWxlY3QgbmFtZT1cXFwiY2l0eVxcXCIgcGxhY2Vob2xkZXI9XFxcIkNpdHlcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiPlwiKTtcbi8vIGl0ZXJhdGUgY2l0aWVzXG47KGZ1bmN0aW9uKCl7XG4gIHZhciAkJG9iaiA9IGNpdGllcztcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIGMgPSAkJG9ialskaW5kZXhdO1xuXG5pZiAoIGMgPT0gJ1RST1knKVxue1xuYnVmLnB1c2goXCI8b3B0aW9uIHNlbGVjdGVkPVxcXCJzZWxlY3RlZFxcXCI+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBjKSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L29wdGlvbj5cIik7XG59XG5lbHNlXG57XG5idWYucHVzaChcIjxvcHRpb24+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBjKSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L29wdGlvbj5cIik7XG59XG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgdmFyICQkbCA9IDA7XG4gICAgZm9yICh2YXIgJGluZGV4IGluICQkb2JqKSB7XG4gICAgICAkJGwrKzsgICAgICB2YXIgYyA9ICQkb2JqWyRpbmRleF07XG5cbmlmICggYyA9PSAnVFJPWScpXG57XG5idWYucHVzaChcIjxvcHRpb24gc2VsZWN0ZWQ9XFxcInNlbGVjdGVkXFxcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IGMpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvb3B0aW9uPlwiKTtcbn1cbmVsc2VcbntcbmJ1Zi5wdXNoKFwiPG9wdGlvbj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IGMpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvb3B0aW9uPlwiKTtcbn1cbiAgICB9XG5cbiAgfVxufSkuY2FsbCh0aGlzKTtcblxuYnVmLnB1c2goXCI8L3NlbGVjdD48L2Rpdj48L2Rpdj48L2Rpdj5cIik7fS5jYWxsKHRoaXMsXCJjaXRpZXNcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLmNpdGllczp0eXBlb2YgY2l0aWVzIT09XCJ1bmRlZmluZWRcIj9jaXRpZXM6dW5kZWZpbmVkLFwidW5kZWZpbmVkXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC51bmRlZmluZWQ6dHlwZW9mIHVuZGVmaW5lZCE9PVwidW5kZWZpbmVkXCI/dW5kZWZpbmVkOnVuZGVmaW5lZCkpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuO3ZhciBsb2NhbHNfZm9yX3dpdGggPSAobG9jYWxzIHx8IHt9KTsoZnVuY3Rpb24gKG9wZXJhdGlvbl9uYW1lKSB7XG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcInJvd1xcXCI+PGRpdiBjbGFzcz1cXFwiY29sLXhzLTEyXFxcIj48cCBjbGFzcz1cXFwibS1hLTBcXFwiPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gb3BlcmF0aW9uX25hbWUpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvcD48L2Rpdj48L2Rpdj5cIik7fS5jYWxsKHRoaXMsXCJvcGVyYXRpb25fbmFtZVwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgub3BlcmF0aW9uX25hbWU6dHlwZW9mIG9wZXJhdGlvbl9uYW1lIT09XCJ1bmRlZmluZWRcIj9vcGVyYXRpb25fbmFtZTp1bmRlZmluZWQpKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcbjt2YXIgbG9jYWxzX2Zvcl93aXRoID0gKGxvY2FscyB8fCB7fSk7KGZ1bmN0aW9uIChmYWNpbGl0eV9hZGRyZXNzLCBmYWNpbGl0eV9jaXR5LCBmYWNpbGl0eV9tdW5pY2lwYWxpdHksIGZhY2lsaXR5X3Bvc3RhbF96aXBjb2RlLCBmb29kX3NlcnZpY2VfZGVzY3JpcHRpb24sIGZvb2Rfc2VydmljZV90eXBlLCBvcGVyYXRpb25fbmFtZSwgcGVybV9vcGVyYXRvcl9maXJzdF9uYW1lLCBwZXJtX29wZXJhdG9yX2xhc3RfbmFtZSwgcGVybWl0dGVkX2NvcnBfbmFtZSkge1xuamFkZV9taXhpbnNbXCJzbWFsbEl0ZW1cIl0gPSBqYWRlX2ludGVycCA9IGZ1bmN0aW9uKGxhYmVsLCB0ZXh0KXtcbnZhciBibG9jayA9ICh0aGlzICYmIHRoaXMuYmxvY2spLCBhdHRyaWJ1dGVzID0gKHRoaXMgJiYgdGhpcy5hdHRyaWJ1dGVzKSB8fCB7fTtcbmJ1Zi5wdXNoKFwiPHNtYWxsPjxzdHJvbmc+XCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gbGFiZWwpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIjo8L3N0cm9uZz4mbmJzcDtcXG5cIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSB0ZXh0KSA9PSBudWxsID8gJycgOiBqYWRlX2ludGVycCkpICsgXCI8L3NtYWxsPjxici8+XCIpO1xufTtcbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwicm93XFxcIj48ZGl2IGNsYXNzPVxcXCJjb2wteHMtMTJcXFwiPjxkaXYgY2xhc3M9XFxcInJvd1xcXCI+PGRpdiBjbGFzcz1cXFwiY29sLXhzLTZcXFwiPjxwIGNsYXNzPVxcXCJsZWFkIG0tYi0wXFxcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IG9wZXJhdGlvbl9uYW1lKSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L3A+PHNtYWxsPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gZmFjaWxpdHlfYWRkcmVzcykgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9zbWFsbD48YnIvPjxzbWFsbD5cIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSBmYWNpbGl0eV9jaXR5KSA9PSBudWxsID8gJycgOiBqYWRlX2ludGVycCkpICsgXCIsIFwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IGZhY2lsaXR5X211bmljaXBhbGl0eSkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiIFwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IGZhY2lsaXR5X3Bvc3RhbF96aXBjb2RlKSA9PSBudWxsID8gJycgOiBqYWRlX2ludGVycCkpICsgXCI8L3NtYWxsPjwvZGl2PjxkaXYgY2xhc3M9XFxcImNvbC14cy02XFxcIj5cIik7XG5pZiAoIHBlcm1pdHRlZF9jb3JwX25hbWUpXG57XG5qYWRlX21peGluc1tcInNtYWxsSXRlbVwiXSgnQ29ycG9yYXRpb24nLCBwZXJtaXR0ZWRfY29ycF9uYW1lKTtcbn1cbmlmICggcGVybV9vcGVyYXRvcl9maXJzdF9uYW1lKVxue1xuamFkZV9taXhpbnNbXCJzbWFsbEl0ZW1cIl0oJ09wZXJhdG9yJywgcGVybV9vcGVyYXRvcl9sYXN0X25hbWUgKyAnLCAnICsgcGVybV9vcGVyYXRvcl9maXJzdF9uYW1lKTtcbn1cbmlmICggZm9vZF9zZXJ2aWNlX3R5cGUpXG57XG5qYWRlX21peGluc1tcInNtYWxsSXRlbVwiXSgnU2VydmljZScsIGZvb2Rfc2VydmljZV90eXBlKTtcbn1cbmlmICggZm9vZF9zZXJ2aWNlX2Rlc2NyaXB0aW9uKVxue1xuamFkZV9taXhpbnNbXCJzbWFsbEl0ZW1cIl0oJ1R5cGUnLCBmb29kX3NlcnZpY2VfZGVzY3JpcHRpb24pO1xufVxuYnVmLnB1c2goXCI8L2Rpdj48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJjb2wteHMtMTJcXFwiPjxoci8+PC9kaXY+PGRpdiBkYXRhLXJlZ2lvbj1cXFwic2VsZWN0b3JcXFwiIGNsYXNzPVxcXCJjb2wteHMtMTJcXFwiPjwvZGl2PjwvZGl2PlwiKTt9LmNhbGwodGhpcyxcImZhY2lsaXR5X2FkZHJlc3NcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLmZhY2lsaXR5X2FkZHJlc3M6dHlwZW9mIGZhY2lsaXR5X2FkZHJlc3MhPT1cInVuZGVmaW5lZFwiP2ZhY2lsaXR5X2FkZHJlc3M6dW5kZWZpbmVkLFwiZmFjaWxpdHlfY2l0eVwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGguZmFjaWxpdHlfY2l0eTp0eXBlb2YgZmFjaWxpdHlfY2l0eSE9PVwidW5kZWZpbmVkXCI/ZmFjaWxpdHlfY2l0eTp1bmRlZmluZWQsXCJmYWNpbGl0eV9tdW5pY2lwYWxpdHlcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLmZhY2lsaXR5X211bmljaXBhbGl0eTp0eXBlb2YgZmFjaWxpdHlfbXVuaWNpcGFsaXR5IT09XCJ1bmRlZmluZWRcIj9mYWNpbGl0eV9tdW5pY2lwYWxpdHk6dW5kZWZpbmVkLFwiZmFjaWxpdHlfcG9zdGFsX3ppcGNvZGVcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLmZhY2lsaXR5X3Bvc3RhbF96aXBjb2RlOnR5cGVvZiBmYWNpbGl0eV9wb3N0YWxfemlwY29kZSE9PVwidW5kZWZpbmVkXCI/ZmFjaWxpdHlfcG9zdGFsX3ppcGNvZGU6dW5kZWZpbmVkLFwiZm9vZF9zZXJ2aWNlX2Rlc2NyaXB0aW9uXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5mb29kX3NlcnZpY2VfZGVzY3JpcHRpb246dHlwZW9mIGZvb2Rfc2VydmljZV9kZXNjcmlwdGlvbiE9PVwidW5kZWZpbmVkXCI/Zm9vZF9zZXJ2aWNlX2Rlc2NyaXB0aW9uOnVuZGVmaW5lZCxcImZvb2Rfc2VydmljZV90eXBlXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5mb29kX3NlcnZpY2VfdHlwZTp0eXBlb2YgZm9vZF9zZXJ2aWNlX3R5cGUhPT1cInVuZGVmaW5lZFwiP2Zvb2Rfc2VydmljZV90eXBlOnVuZGVmaW5lZCxcIm9wZXJhdGlvbl9uYW1lXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5vcGVyYXRpb25fbmFtZTp0eXBlb2Ygb3BlcmF0aW9uX25hbWUhPT1cInVuZGVmaW5lZFwiP29wZXJhdGlvbl9uYW1lOnVuZGVmaW5lZCxcInBlcm1fb3BlcmF0b3JfZmlyc3RfbmFtZVwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgucGVybV9vcGVyYXRvcl9maXJzdF9uYW1lOnR5cGVvZiBwZXJtX29wZXJhdG9yX2ZpcnN0X25hbWUhPT1cInVuZGVmaW5lZFwiP3Blcm1fb3BlcmF0b3JfZmlyc3RfbmFtZTp1bmRlZmluZWQsXCJwZXJtX29wZXJhdG9yX2xhc3RfbmFtZVwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgucGVybV9vcGVyYXRvcl9sYXN0X25hbWU6dHlwZW9mIHBlcm1fb3BlcmF0b3JfbGFzdF9uYW1lIT09XCJ1bmRlZmluZWRcIj9wZXJtX29wZXJhdG9yX2xhc3RfbmFtZTp1bmRlZmluZWQsXCJwZXJtaXR0ZWRfY29ycF9uYW1lXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5wZXJtaXR0ZWRfY29ycF9uYW1lOnR5cGVvZiBwZXJtaXR0ZWRfY29ycF9uYW1lIT09XCJ1bmRlZmluZWRcIj9wZXJtaXR0ZWRfY29ycF9uYW1lOnVuZGVmaW5lZCkpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuXG5idWYucHVzaChcIk5vIE1hdGNoZXMgRm91bmQuXCIpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuXG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcInJvd1xcXCI+PGRpdiBjbGFzcz1cXFwiY29sLXhzLTRcXFwiPjxkaXYgY2xhc3M9XFxcInJvd1xcXCI+PGRpdiBkYXRhLXJlZ2lvbj1cXFwiZm9ybVxcXCIgY2xhc3M9XFxcImNvbC14cy0xMlxcXCI+PC9kaXY+PGRpdiBjbGFzcz1cXFwiY29sLXhzLTEyXFxcIj48ZGl2IGRhdGEtcmVnaW9uPVxcXCJmaWx0ZXJcXFwiIGNsYXNzPVxcXCJjYXJkIGNhcmQtYmxvY2sgbS10LTFcXFwiPjwvZGl2PjwvZGl2PjxkaXYgZGF0YS1yZWdpb249XFxcInBhZ2luYXRpb25cXFwiIGNsYXNzPVxcXCJjb2wteHMtMTJcXFwiPjwvZGl2PjxkaXYgZGF0YS1yZWdpb249XFxcImxpc3RcXFwiIGNsYXNzPVxcXCJjb2wteHMtMTJcXFwiPjwvZGl2PjwvZGl2PjwvZGl2PjxkaXYgZGF0YS1yZWdpb249XFxcImRldGFpbFxcXCIgY2xhc3M9XFxcImNvbC14cy04IHAtbC0wXFxcIj48L2Rpdj48L2Rpdj5cIik7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG5cbmJ1Zi5wdXNoKFwiPGkgY2xhc3M9XFxcImZhIGZhLWZ3IGZhLTJ4IGZhLXNwaW4gZmEtc3Bpbm5lciBtLXktMlxcXCI+PC9pPlwiKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcblxuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPjxkaXYgY2xhc3M9XFxcImNvbC14cy0xMlxcXCI+PGRpdiBpZD1cXFwibWFwXFxcIiBzdHlsZT1cXFwiaGVpZ2h0OjIwcmVtO1xcXCI+PC9kaXY+PC9kaXY+PC9kaXY+XCIpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuO3ZhciBsb2NhbHNfZm9yX3dpdGggPSAobG9jYWxzIHx8IHt9KTsoZnVuY3Rpb24gKGRhdGUsIGluc3BlY3Rpb25fY29tbWVudHMsIHZpb2xhdGlvbl9kZXNjcmlwdGlvbikge1xuYnVmLnB1c2goXCI8dGQ+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBkYXRlKSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L3RkPjx0ZD5cIik7XG5pZiAoIGluc3BlY3Rpb25fY29tbWVudHMgJiYgdmlvbGF0aW9uX2Rlc2NyaXB0aW9uKVxue1xuYnVmLnB1c2goXCI8aSBjbGFzcz1cXFwiZmEgZmEtZncgZmEtd2FybmluZ1xcXCI+PC9pPiZuYnNwO1wiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gdmlvbGF0aW9uX2Rlc2NyaXB0aW9uKSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCImbmJzcDs8YVwiICsgKGphZGUuYXR0cihcInRpdGxlXCIsIGluc3BlY3Rpb25fY29tbWVudHMsIHRydWUsIGZhbHNlKSkgKyBcIiBkYXRhLXRvZ2dsZT1cXFwidG9vbHRpcFxcXCI+PGkgY2xhc3M9XFxcImZhIGZhLWZ3IGZhLWNvbW1lbnRcXFwiPjwvaT5JbnNwZWN0b3IgQ29tbWVudHM8L2E+XCIpO1xufVxuZWxzZVxue1xuaWYgKCB2aW9sYXRpb25fZGVzY3JpcHRpb24pXG57XG5idWYucHVzaChcIjxpIGNsYXNzPVxcXCJmYSBmYS1mdyBmYS13YXJuaW5nXFxcIj48L2k+Jm5ic3A7XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSB2aW9sYXRpb25fZGVzY3JpcHRpb24pID8gXCJcIiA6IGphZGVfaW50ZXJwKSkpO1xufVxuZWxzZVxue1xuYnVmLnB1c2goXCI8aSBjbGFzcz1cXFwiZmEgZmEtZncgZmEtY2hlY2tcXFwiPjwvaT4mbmJzcDtcXG5QYXNzZWQhXCIpO1xufVxufVxuYnVmLnB1c2goXCI8L3RkPlwiKTt9LmNhbGwodGhpcyxcImRhdGVcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLmRhdGU6dHlwZW9mIGRhdGUhPT1cInVuZGVmaW5lZFwiP2RhdGU6dW5kZWZpbmVkLFwiaW5zcGVjdGlvbl9jb21tZW50c1wiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGguaW5zcGVjdGlvbl9jb21tZW50czp0eXBlb2YgaW5zcGVjdGlvbl9jb21tZW50cyE9PVwidW5kZWZpbmVkXCI/aW5zcGVjdGlvbl9jb21tZW50czp1bmRlZmluZWQsXCJ2aW9sYXRpb25fZGVzY3JpcHRpb25cIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnZpb2xhdGlvbl9kZXNjcmlwdGlvbjp0eXBlb2YgdmlvbGF0aW9uX2Rlc2NyaXB0aW9uIT09XCJ1bmRlZmluZWRcIj92aW9sYXRpb25fZGVzY3JpcHRpb246dW5kZWZpbmVkKSk7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG5cbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwiY29sLXhzLTEyXFxcIj48cCBjbGFzcz1cXFwibGVhZFxcXCI+VmlvbGF0aW9uIEhpc3Rvcnk8L3A+PHRhYmxlIGNsYXNzPVxcXCJ0YWJsZSB0YWJsZS1ib3JkZXJlZFxcXCI+PHRoZWFkPjx0aD5EYXRlPC90aD48dGg+RGVzY3JpcHRpb248L3RoPjwvdGhlYWQ+PHRib2R5PjwvdGJvZHk+PC90YWJsZT48L2Rpdj5cIik7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwiXG5jbGFzcyBWaW9sYXRpb25Nb2RlbCBleHRlbmRzIEJhY2tib25lLk1vZGVsXG4gIGRlZmF1bHRzOiB7fVxuXG4gIGlzQ3JpdGljYWw6IC0+XG4gICAgcmV0dXJuIEBnZXQoJ2NyaXRpY2FsX3Zpb2xhdGlvbicpID09IFwiQ3JpdGljYWwgVmlvbGF0aW9uXCJcblxuIyAjICMgIyAjXG5cbmNsYXNzIFZpb2xhdGlvbkNvbGxlY3Rpb24gZXh0ZW5kcyBCYWNrYm9uZS5Db2xsZWN0aW9uXG4gIG1vZGVsOiBWaW9sYXRpb25Nb2RlbFxuICB1cmw6ICdodHRwczovL2hlYWx0aC5kYXRhLm55Lmdvdi9yZXNvdXJjZS81aWI2LTQ5ZW4uanNvbidcblxuICBjb21wYXJhdG9yOiAobW9kMSwgbW9kMikgLT5cbiAgICBkMSA9IG5ldyBEYXRlKG1vZDEuZ2V0KCdkYXRlX29mX2luc3BlY3Rpb24nKSlcbiAgICBkMiA9IG5ldyBEYXRlKG1vZDIuZ2V0KCdkYXRlX29mX2luc3BlY3Rpb24nKSlcblxuICAgIGlmIGQxIDwgZDJcbiAgICAgIHJldHVybiAxXG5cbiAgICBlbHNlIGlmIGQyIDwgZDFcbiAgICAgIHJldHVybiAtMVxuXG4gICAgZWxzZVxuICAgICAgcmV0dXJuIDBcblxuIyAjICMgIyAjXG5cbmNsYXNzIERhdGFNb2RlbCBleHRlbmRzIEJhY2tib25lLk1vZGVsXG4gIGlkQXR0cmlidXRlOiAnbnlzX2hlYWx0aF9vcGVyYXRpb25faWQnXG5cbiAgZW5zdXJlVmlvbGF0aW9uczogLT5cbiAgICByZXR1cm4gbmV3IFByb21pc2UgKHJlc29sdmUsIHJlamVjdCkgPT5cblxuICAgICAgIyBSZXR1cm5zIGlmIGRlZmluZWRcbiAgICAgIHJldHVybiByZXNvbHZlKEB2aW9sYXRpb25zKSBpZiBAdmlvbGF0aW9uc1xuXG4gICAgICBAdmlvbGF0aW9ucyA9IG5ldyBWaW9sYXRpb25Db2xsZWN0aW9uKClcbiAgICAgIEB2aW9sYXRpb25zLmZldGNoXG4gICAgICAgIGRhdGE6IHsgbnlzX2hlYWx0aF9vcGVyYXRpb25faWQ6IEBpZCB9XG4gICAgICAgIHN1Y2Nlc3M6ID0+IHJldHVybiByZXNvbHZlKEB2aW9sYXRpb25zKVxuXG4jICMgIyAjICNcblxuIyBUT0RPIC0gUEFHSU5BVEVEIENPTExFQ1RJT05cbmNsYXNzIERhdGFDb2xsZWN0aW9uIGV4dGVuZHMgQmFja2JvbmUuUGFnZWFibGVDb2xsZWN0aW9uXG4gIG1vZGVsOiBEYXRhTW9kZWxcbiAgdXJsOiAnaHR0cHM6Ly9oZWFsdGguZGF0YS5ueS5nb3YvcmVzb3VyY2UvNWliNi00OWVuLmpzb24nXG5cbiAgbW9kZTogJ2NsaWVudCdcblxuICBzdGF0ZTpcbiAgICBwYWdlU2l6ZTogMTBcblxuICAjIFBhZ2luZyBIZWxwZXJzXG4gIGZpcnN0UGFnZTogLT5cbiAgICBAZ2V0UGFnZSggQHN0YXRlLmZpcnN0UGFnZSApXG5cbiAgcHJldlBhZ2U6IC0+XG4gICAgQGdldFByZXZpb3VzUGFnZSgpIGlmIEBoYXNQcmV2aW91c1BhZ2UoKVxuXG4gIG5leHRQYWdlOiAtPlxuICAgIEBnZXROZXh0UGFnZSgpIGlmIEBoYXNOZXh0UGFnZSgpXG5cbiAgbGFzdFBhZ2U6IC0+XG4gICAgQGdldFBhZ2UoIEBzdGF0ZS5sYXN0UGFnZSApXG5cbiAgc2VhcmNoOiAoZGF0YT17fSkgLT5cbiAgICBkZWxldGUgQHVuZmlsdGVyZWRDb2xsZWN0aW9uXG4gICAgQGZldGNoKHsgZGF0YTogZGF0YSwgcmVzZXQ6IHRydWUgfSlcblxuICBhcHBseUZpbHRlcjogKHF1ZXJ5LCBvcHRpb25zID0ge30pIC0+XG5cbiAgICAjIFJldHVybnMgaWYgY3VycmVudCBxdWVyeSBpcyB0aGUgc2FtZSBhcyB0aGUgb25lIHRoYXQgd2UndmUgY2FjaGVkXG4gICAgcmV0dXJuIGlmIF8uaXNFcXVhbChAcXVlcnksIHF1ZXJ5KVxuXG4gICAgIyBDYWNoZXMgY29tcGxldGUgdW5maWx0ZXJlZCBjb2xsZWN0aW9uXG4gICAgQHVuZmlsdGVyZWRDb2xsZWN0aW9uIHx8PSBuZXcgQmFja2JvbmUuQ29sbGVjdGlvbihAZnVsbENvbGxlY3Rpb24ubW9kZWxzKVxuXG4gICAgIyBSZXR1cm5zIGZvciBlbXB0eSBxdWVyeSBvbiBjb21wbGV0ZSBjb2xsZWN0aW9uXG4gICAgcmV0dXJuIEBmdWxsQ29sbGVjdGlvbi5tb2RlbHMgaWYgQGZ1bGxDb2xsZWN0aW9uLmxlbmd0aCA9PSBAdW5maWx0ZXJlZENvbGxlY3Rpb24ubGVuZ3RoICYmIF8uaXNFbXB0eShxdWVyeSlcblxuICAgICMgQ2FjaGVzIGFuZCBwZXJmb3JtcyBxdWVyeVxuICAgIEBxdWVyeSA9IHF1ZXJ5XG4gICAgbW9kZWxzID0gXy5xdWVyeSggXy5jbG9uZShAdW5maWx0ZXJlZENvbGxlY3Rpb24udG9KU09OKCkpLCBxdWVyeSApXG5cbiAgICAjIFNldCBmdWxsQ29sbGVjdGlvbiB3aXRoIHF1ZXJ5IHJlc3VsdCBmb3IgYWNjdXJhdGUgcGFnaW5hdGlvbiBhbmQgcmV0dXJucyBtb2RlbHNcbiAgICBAZnVsbENvbGxlY3Rpb24ucmVzZXQobW9kZWxzKVxuICAgIHJldHVybiBtb2RlbHNcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID1cbiAgTW9kZWw6ICAgICAgRGF0YU1vZGVsXG4gIENvbGxlY3Rpb246IERhdGFDb2xsZWN0aW9uXG4iLCJcbkVudGl0aWVzID0gcmVxdWlyZSAnLi9lbnRpdGllcydcblxuIyAjICMgIyAjXG5cbmNsYXNzIERhdGFGYWN0b3J5IGV4dGVuZHMgTWFyaW9uZXR0ZS5TZXJ2aWNlXG5cbiAgIyBEZWZpbmVzIHJhZGlvUmVxdWVzdHNcbiAgcmFkaW9SZXF1ZXN0czpcbiAgICAnZGF0YSBjb2xsZWN0aW9uJzogICdnZXRDb2xsZWN0aW9uJ1xuXG4gIGluaXRpYWxpemU6IC0+XG4gICAgQGNhY2hlZCA9IG5ldyBFbnRpdGllcy5Db2xsZWN0aW9uKClcblxuICAjIFRPRE8gLSBhY2NlcHQgcGFyYW1ldGVycz9cbiAgZ2V0Q29sbGVjdGlvbjogLT5cbiAgICBuZXcgUHJvbWlzZSAocmVzb2x2ZSwgcmVqZWN0KSA9PlxuXG4gICAgICBAY2FjaGVkLmZldGNoXG4gICAgICAgIHBhcnNlOiB0cnVlXG4gICAgICAgIGRhdGE6XG4gICAgICAgICAgIyBcIiRsaW1pdFwiOiAxMCAjIFRPRE8gLSBhYnN0cmFjdCBpbnRvIGNvbGxlY3Rpb25cbiAgICAgICAgICBcIiQkYXBwX3Rva2VuXCIgOiBcIkF2czFmRENJYUM5bExxd0R6NUlRYWZ0Z1VcIiAjIFRPRE8gLSBhYnN0cmFjdCBpbnRvIGNvbGxlY3Rpb25cbiAgICAgICAgICBcImZhY2lsaXR5X2NpdHlcIjogJ1RST1knXG5cbiAgICAgICAgc3VjY2VzczogKCkgPT4gcmV0dXJuIHJlc29sdmUoQGNhY2hlZClcbiAgICAgICAgZXJyb3I6ICgpID0+IHJldHVybiByZWplY3QoQGNhY2hlZClcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IERhdGFGYWN0b3J5KClcbiIsInJlcXVpcmUgJy4vZmFjdG9yeSdcbkRhc2hib2FyZFJvdXRlID0gcmVxdWlyZSAnLi9kYXNoYm9hcmQvcm91dGUnXG5BYm91dFJvdXRlID0gcmVxdWlyZSAnLi9hYm91dC9yb3V0ZSdcbiMgIyAjICMgI1xuXG4jIEhvbWVSb3V0ZXIgY2xhc3MgZGVmaW5pdGlvblxuY2xhc3MgSG9tZVJvdXRlciBleHRlbmRzIHJlcXVpcmUgJ2huX3JvdXRpbmcvbGliL3JvdXRlcidcblxuICByb3V0ZXM6XG4gICAgJygvKSc6ICdkYXNoYm9hcmQnXG4gICAgJ2Fib3V0KC8pJzogJ2Fib3V0J1xuXG4gIGRhc2hib2FyZDogLT5cbiAgICBuZXcgRGFzaGJvYXJkUm91dGUoeyBjb250YWluZXI6IEBjb250YWluZXIgfSlcblxuICBhYm91dDogLT5cbiAgICBuZXcgQWJvdXRSb3V0ZSh7IGNvbnRhaW5lcjogQGNvbnRhaW5lciB9KVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBIb21lUm91dGVyXG4iLCJcbmNsYXNzIFF1ZXJ5UGFyYW1zIGV4dGVuZHMgQmFja2JvbmUuTW9kZWxcblxuICBkZWZhdWx0czpcbiAgICBjaXRpZXM6ICAgcmVxdWlyZSAnLi9wbHVja2VkL2NpdGllcydcbiAgICBjb3VudGllczogcmVxdWlyZSAnLi9wbHVja2VkL2NvdW50aWVzJ1xuICAgIHppcHM6ICAgICByZXF1aXJlICcuL3BsdWNrZWQvemlwcydcblxuIyAjICMgIyAjXG5cbmNsYXNzIFBhcmFtc0ZhY3RvcnkgZXh0ZW5kcyBNYXJpb25ldHRlLlNlcnZpY2VcblxuICAjIERlZmluZXMgcmFkaW9SZXF1ZXN0c1xuICByYWRpb1JlcXVlc3RzOlxuICAgICdwYXJhbXMgbW9kZWwnOiAgJ2dldE1vZGVsJ1xuXG4gIGluaXRpYWxpemU6IC0+XG4gICAgQHBhcmFtcyA9IG5ldyBRdWVyeVBhcmFtcygpXG5cbiAgZ2V0TW9kZWw6IC0+XG4gICAgcmV0dXJuIEBwYXJhbXNcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFBhcmFtc0ZhY3RvcnkoKVxuIiwibW9kdWxlLmV4cG9ydHMgPSBbXG4gIFwiIEZBUk1JTkdEQUxFXCJcbiAgXCIgTUFNQVJPTkVDS1wiXG4gIFwiME5FSURBXCJcbiAgXCJBQ0NPUkRcIlxuICBcIkFDUkFcIlxuICBcIkFEQU1TXCJcbiAgXCJBREFNUyBDRU5URVJcIlxuICBcIkFERElTT05cIlxuICBcIkFGVE9OXCJcbiAgXCJBSVJNT05UXCJcbiAgXCJBS1JPTlwiXG4gIFwiQWtyb25cIlxuICBcIkFMQUJBTUFcIlxuICBcIkFMQkFOWVwiXG4gIFwiQWxiYW55XCJcbiAgXCJBTEJBTlkgQ09VTlRZXCJcbiAgXCJBTEJBTlksIE5ZXCJcbiAgXCJBTEJFUlRTT05cIlxuICBcIkFMQklPTlwiXG4gIFwiQUxCSU9OLCBORVcgWU9SS1wiXG4gIFwiQUxCSU9OLCBORVcgWU9SSyBcIlxuICBcIkFMREVSIENSRUVLXCJcbiAgXCJBTEVYQU5ERVJcIlxuICBcIkFsZXhhbmRlclwiXG4gIFwiQUxFWEFORFJJQSBCQVlcIlxuICBcIkFsZnJlZFwiXG4gIFwiQUxGUkVEXCJcbiAgXCJBbGZyZWQgU3RhdGlvblwiXG4gIFwiQUxMRUdBTllcIlxuICBcIkFsbW9uZFwiXG4gIFwiQUxUQU1PTlRcIlxuICBcIkFMVE1BUlwiXG4gIFwiQUxUT05cIlxuICBcIkFsdG9uYVwiXG4gIFwiQU1FTklBXCJcbiAgXCJBTUhFUlNUXCJcbiAgXCJBTVNURURBTVwiXG4gIFwiQU1TVEVSREFNXCJcbiAgXCJBTkNSQU1cIlxuICBcIkFOQ1JBTURBTEVcIlxuICBcIkFuZGVzXCJcbiAgXCJBTkRFU1wiXG4gIFwiQW5kb3ZlclwiXG4gIFwiQW5kb3ZlciBcIlxuICBcIkFuZ2VsaWNhXCJcbiAgXCJBTk5BREFMRSBPTiBIVURTT05cIlxuICBcIkFOTkFOREFMRS1PTi1IVURTT05cIlxuICBcIkFudHdlcnBcIlxuICBcIkFOVFdFUlBcIlxuICBcIkFQQUxBQ0hJTlwiXG4gIFwiQVBQTEVUT05cIlxuICBcIkFwdWxpYSBTdGF0aW9uXCJcbiAgXCJBUkNBREVcIlxuICBcIkFyY2FkZVwiXG4gIFwiQVJEU0xFWVwiXG4gIFwiQVJEU0xFWS1PTi1IVURTT05cIlxuICBcIkFSR1lMRVwiXG4gIFwiQVJLUE9SVFwiXG4gIFwiQVJLVklMTEVcIlxuICBcIkFya3ZpbGxlXCJcbiAgXCJBUk1PTktcIlxuICBcIkFTSExBTkRcIlxuICBcIkFTSFZJTExFXCJcbiAgXCJBVEhFTlNcIlxuICBcIkF0aGVuc1wiXG4gIFwiQVRMQU5USUMgQkVBQ0hcIlxuICBcIkFUVElDQVwiXG4gIFwiQXUgU2FibGUgRm9ya3NcIlxuICBcIkFVQlVSTlwiXG4gIFwiQVVST1JBXCJcbiAgXCJBVVNBQkxFIENIQVNNXCJcbiAgXCJBdVNhYmxlIENoYXNtXCJcbiAgXCJBVVNBQkxFIEZPUktTXCJcbiAgXCJBdVNhYmxlIEZvcmtzXCJcbiAgXCJBVkFcIlxuICBcIkFWRVJJTEwgUEFSS1wiXG4gIFwiQVZFUklMTCBQSy5cIlxuICBcIkFWT0NBXCJcbiAgXCJBVk9OXCJcbiAgXCJBdm9uXCJcbiAgXCJCQUlOQlJJREdFXCJcbiAgXCJCQUxEV0lOXCJcbiAgXCJCQUxEV0lOIFwiXG4gIFwiQkFMRFdJTiBIQVJCT1JcIlxuICBcIkJBTERXSU4gUExBQ0VcIlxuICBcIkJhbGR3aW5zdmlsbGVcIlxuICBcIkJBTERXSU5TVklMTEVcIlxuICBcIkJBTExTVE9OIExBS0VcIlxuICBcIkJBTExTVE9OIExBS0UgXCJcbiAgXCJCQUxMU1RPTiBTUEFcIlxuICBcIkJBTkdBTExcIlxuICBcIkJBTkdPUlwiXG4gIFwiQkFOS1NWSUxMRVwiXG4gIFwiQkFSRE9OSUFcIlxuICBcIkJBUktFUlwiXG4gIFwiQkFSTkVWRUxEXCJcbiAgXCJCQVJSWVRPV05cIlxuICBcIkJhcnJ5dmlsbGVcIlxuICBcIkJhdGF2aWFcIlxuICBcIkJBVEFWSUFcIlxuICBcIkJBVEhcIlxuICBcIkJBWVZJTExFXCJcbiAgXCJCRUFDT05cIlxuICBcIkJlYWNvblwiXG4gIFwiQmVhciBNb3VudGFpblwiXG4gIFwiQmVhciBNdG5cIlxuICBcIkJFQVJTVklMTEVcIlxuICBcIkJFQVZFUiBEQU1TXCJcbiAgXCJCRUFWRVIgRkFMTFNcIlxuICBcIkJFREZPUkRcIlxuICBcIkJFREZPUkQgQ09STkVSU1wiXG4gIFwiQkVERk9SRCBISUxMU1wiXG4gIFwiQkVERk9SRCBWSUxMQUdFXCJcbiAgXCJCZWxmYXN0XCJcbiAgXCJCRUxMRVJPU0VcIlxuICBcIkJFTExFVklMTEVcIlxuICBcIkJFTExNT1JFXCJcbiAgXCJCRUxMVkFMRVwiXG4gIFwiQmVsbW9udFwiXG4gIFwiQkVNVVMgUE9JTlRcIlxuICBcIkJFTVVTIFBPSU5UIE5ZXCJcbiAgXCJCRU1VUyBQVC5cIlxuICBcIkJlcmdlblwiXG4gIFwiQkVSR0VOXCJcbiAgXCJCRVJLU0hJUkVcIlxuICBcIkJlcmxpblwiXG4gIFwiQkVSTElOXCJcbiAgXCJCRVJORVwiXG4gIFwiQkVSTkhBUkRTIEJBWVwiXG4gIFwiQkVUSEFOWVwiXG4gIFwiQmV0aGVsXCJcbiAgXCJCRVRIUEFHRVwiXG4gIFwiQklHIEZMQVRTXCJcbiAgXCJCSUcgSU5ESUFOXCJcbiAgXCJCSU5HSEFNVE9OXCJcbiAgXCJCaW5naGFtdG9uXCJcbiAgXCJCTEFDSyBSSVZFUlwiXG4gIFwiQkxBVVZFTFRcIlxuICBcIkJMSVNTXCJcbiAgXCJCTE9PTUZJRUxEXCJcbiAgXCJCTE9PTUZJRUxEIFwiXG4gIFwiQkxPT01JTkcgR1JPVkVcIlxuICBcIkJMT09NSU5HQlVSR1wiXG4gIFwiQmxvb21pbmdidXJnXCJcbiAgXCJCTE9PTUlOR0RBTEVcIlxuICBcIkJMT09NVklMTEVcIlxuICBcIkJMT1NTVkFMRVwiXG4gIFwiQkxVRSBNVCBMQUtFXCJcbiAgXCJCTFVFIE1ULiBMQUtFXCJcbiAgXCJCTFVFIE1UTiBMQUtFXCJcbiAgXCJCTFVGRiBQT0lOVFwiXG4gIFwiQk9JQ0VWSUxMRVwiXG4gIFwiQm9saXZhclwiXG4gIFwiQk9MVE9OIExBTkRJTkdcIlxuICBcIkJPT05WSUxMRVwiXG4gIFwiQk9VQ0tWSUxMRVwiXG4gIFwiQk9WSU5BIENFTlRFUlwiXG4gIFwiQlJBREZPUkRcIlxuICBcIkJSQU5DSFBPUlRcIlxuICBcIkJSQU5UIExBS0VcIlxuICBcIkJSQU5USU5HSEFNXCJcbiAgXCJCcmFzaGVyIEZhbGxzXCJcbiAgXCJCcmV3ZXJ0b25cIlxuICBcIkJSRVdFUlRPTlwiXG4gIFwiQlJFV1NURVJcIlxuICBcIkJyZXdzdGVyXCJcbiAgXCJCUkVXU1RFUiwgIE5ZXCJcbiAgXCJCUklBUkNMSUZGXCJcbiAgXCJCUklBUkNMSUZGIE1BTk9SXCJcbiAgXCJCUklER0VQT1JUXCJcbiAgXCJCcmlkZ2Vwb3J0XCJcbiAgXCJCUklER0VXQVRFUlwiXG4gIFwiQnJpZXIgSGlsbFwiXG4gIFwiQlJPQURBTEJJTlwiXG4gIFwiQlJPQ0tQT1JUXCJcbiAgXCJCUk9DVE9OXCJcbiAgXCJCUk9OWFwiXG4gIFwiQlJPTlhWSUxMRVwiXG4gIFwiQlJPT0tGSUVMRFwiXG4gIFwiQlJPT0tUT05EQUxFXCJcbiAgXCJCUk9PS1ZJTExFXCJcbiAgXCJCUk9XTlZJTExFXCJcbiAgXCJCUlVOU1dJQ0tcIlxuICBcIkJSVVNIVE9OXCJcbiAgXCJCVUNIQU5BTlwiXG4gIFwiQlVMTFZJTExFXCJcbiAgXCJCVVJERVRUXCJcbiAgXCJCVVJLRVwiXG4gIFwiQnVybGluZ2hhbVwiXG4gIFwiQlVSTlQgSElMTFNcIlxuICBcIkJVUlRcIlxuICBcIkJZUk9OXCJcbiAgXCJDYWR5dmlsbGVcIlxuICBcIkNBSVJPXCJcbiAgXCJDQUxDSVVNXCJcbiAgXCJDYWxlZG9uaWFcIlxuICBcIkNBTEVET05JQVwiXG4gIFwiQ2FsbGljb29uXCJcbiAgXCJDQU1CUklER0VcIlxuICBcIkNhbWJyaWRnZVwiXG4gIFwiQ0FNREVOXCJcbiAgXCJDQU1FUk9OIE1JTExTXCJcbiAgXCJDYW1pbGx1c1wiXG4gIFwiQ0FNSUxMVVNcIlxuICBcIkNBTVBCRUxMXCJcbiAgXCJDQU1QQkVMTCBIQUxMXCJcbiAgXCJDQU5BQU5cIlxuICBcIkNBTkFKT0hBUklFXCJcbiAgXCJDQU5BTkRBSUdJVUFcIlxuICBcIkNBTkFOREFJR1VBXCJcbiAgXCJDQU5BTkRBSUdVQSBcIlxuICBcIkNBTkFOREFJVUdBXCJcbiAgXCJDYW5hc2VyYWdhXCJcbiAgXCJDQU5BU1RPVEFcIlxuICBcIkNBTkRPUlwiXG4gIFwiQ0FOSVNURU9cIlxuICBcIkNhbnRvblwiXG4gIFwiQ0FOVE9OXCJcbiAgXCJDYW50b24gXCJcbiAgXCJDQVBFIFZJTkNFTlRcIlxuICBcIkNBUkxFIFBMQUNFXCJcbiAgXCJDQVJMSVNMRVwiXG4gIFwiQ0FSTUVMXCJcbiAgXCJDYXJtZWxcIlxuICBcIkNBUk1FTCAgTllcIlxuICBcIkNBUk9HQSAgTEFLRVwiXG4gIFwiQ0FST0dBIExBS0VcIlxuICBcIkNBUlRIQUdFXCJcbiAgXCJDQVNTQURBR0FcIlxuICBcIkNBU1RJTEVcIlxuICBcIkNBU1RMRVRPTlwiXG4gIFwiQ2FzdGxldG9uXCJcbiAgXCJDQVNUTEVUT04tT04tSFVEU09OXCJcbiAgXCJDQVNUT1JMQU5EXCJcbiAgXCJDQVRPXCJcbiAgXCJDQVRTS0lMTFwiXG4gIFwiQ2F0c2tpbGxcIlxuICBcIkNBVFRBUkFVR1VTXCJcbiAgXCJDQVRUQVJBVUdVUyBDT1VOVFlcIlxuICBcIkNBWVVHQVwiXG4gIFwiQ0FZVUdBIENPVU5UWVwiXG4gIFwiQ2F6ZW5vdmlhXCJcbiAgXCJDQVpFTk9WSUFcIlxuICBcIkNFREFSSFVSU1RcIlxuICBcIkNFTE9ST05cIlxuICBcIkNFTlRFUiBMSVNMRVwiXG4gIFwiQ0VOVFJBTCBCUklER0VcIlxuICBcIkNFTlRSQUwgTllBQ0tcIlxuICBcIkNFTlRSQUwgU1FVQVJFXCJcbiAgXCJDRU5UUkFMIFZBTExFWVwiXG4gIFwiQ0VSRVNcIlxuICBcIkNIQURXSUNLU1wiXG4gIFwiQ2hhbXBsYWluXCJcbiAgXCJDSEFQUEFRVUFcIlxuICBcIkNIQVJMVE9OXCJcbiAgXCJDSEFURUFVR0FZXCJcbiAgXCJDSEFUSEFNXCJcbiAgXCJDSEFVTU9OVFwiXG4gIFwiQ0hBVVRBVVFVQVwiXG4gIFwiQ2hhenlcIlxuICBcIkNIRUxTRUFcIlxuICBcIkNIRU1VTkcgQ09VTlRZXCJcbiAgXCJDSEVOQU5HTyBCUklER0VcIlxuICBcIkNIRU5BTkdPIENPVU5UWVwiXG4gIFwiQ0hFTkFOR08gRk9SS1NcIlxuICBcIkNoZW5hbmdvIEZvcmtzXCJcbiAgXCJDSEVSUlkgQ1JFRUtcIlxuICBcIkNIRVJSWSBWQUxMRVlcIlxuICBcIkNIRVNURVJcIlxuICBcIkNIRVNURVJUT1dOXCJcbiAgXCJDSEVTVE5VVCBSSURHRVwiXG4gIFwiQ2hpbGR3b2xkXCJcbiAgXCJDSElMSVwiXG4gIFwiQ0hJVFRFTkFOR09cIlxuICBcIkNIVVJDSFZJTEVcIlxuICBcIkNIVVJDSFZJTExFXCJcbiAgXCJDaHVydWJ1c2NvXCJcbiAgXCJDaWNlcm9cIlxuICBcIkNJTkNJTk5BVFVTXCJcbiAgXCJDaW5uY2luYXR1c1wiXG4gIFwiQ0lSQ0xFVklMTEVcIlxuICBcIkNMQVJFTkRPTlwiXG4gIFwiQ0xBUksgTUlMTFNcIlxuICBcIkNMQVJLU1ZJTExFXCJcbiAgXCJDTEFSWVZJTExFXCJcbiAgXCJDTEFWRVJBQ0tcIlxuICBcIkNsYXlcIlxuICBcIkNMQVlcIlxuICBcIkNMQVlUT05cIlxuICBcIkNsYXl0b25cIlxuICBcIkNMQVlWSUxMRVwiXG4gIFwiQ0xFVkVMQU5EXCJcbiAgXCJDTEVWRVJEQUxFXCJcbiAgXCJDTElGVE9OICBQQVJLXCJcbiAgXCJDTElGVE9OIFBBUktcIlxuICBcIkNMSUZUT04gU1BSSU5HU1wiXG4gIFwiQ0xJTUFYXCJcbiAgXCJDTElOVE9OXCJcbiAgXCJDTFlERVwiXG4gIFwiQ0xZREUgXCJcbiAgXCJDTFlNRVJcIlxuICBcIkNPQkxFU0tJTExcIlxuICBcIkNvYmxlc2tpbGxcIlxuICBcIkNvY2hlY3RvblwiXG4gIFwiQ09FWU1BTlNcIlxuICBcIkNPSE9DVE9OXCJcbiAgXCJDT0hPRVNcIlxuICBcIkNPSE9FUyBcIlxuICBcIkNPTEQgQlJPT0tcIlxuICBcIkNPTEQgU1BSSU5HXCJcbiAgXCJDT0xEIFNQUklORyBIQVJCT1JcIlxuICBcIkNPTExJRVJTVklMTEVcIlxuICBcIkNPTE9OSUVcIlxuICBcIkNvbHRvblwiXG4gIFwiQ09NU1RPQ0tcIlxuICBcIkNPTkVTVVNcIlxuICBcIkNPTkVXQU5HTyBWQUxMRVlcIlxuICBcIkNPTkdFUlNcIlxuICBcIkNPTktJTE5cIlxuICBcIkNPTktMSU5cIlxuICBcIkNvbmtsaW5cIlxuICBcIkNPTlNUQUJMRVwiXG4gIFwiQ09OU1RBQkxFVklMTEVcIlxuICBcIkNPTlNUQU5USUFcIlxuICBcIkNvb3BlcnN0b3duXCJcbiAgXCJDT09QRVJTVE9XTlwiXG4gIFwiQ09QQUtFXCJcbiAgXCJDT1BBS0UgRkFMTFNcIlxuICBcIkNPUEVOSEFHRU5cIlxuICBcIkNPUkZVXCJcbiAgXCJDb3JmdVwiXG4gIFwiQ09SSU5USFwiXG4gIFwiQ09STklOR1wiXG4gIFwiQ09STldBTExcIlxuICBcIkNPUk5XQUxMIE9OIEhVRFNPTlwiXG4gIFwiQ09STldBTEwtT04tSFVEU09OXCJcbiAgXCJDT1JOV0FMTFZJTExFXCJcbiAgXCJDT1JOV0FMTFZJTExFLFwiXG4gIFwiQ09SVExBTkRcIlxuICBcIkNvcnRsYW5kXCJcbiAgXCJDT1JUTEFORCBcIlxuICBcIkNvcnRsYW5kIFwiXG4gIFwiQ09SVExBTkQgTUFOT1JcIlxuICBcIkNPUlRMQU5EVFwiXG4gIFwiQ09SVExBTkRUIE1BTk9SXCJcbiAgXCJDT1JUTEFOVCBNQU5PUlwiXG4gIFwiQ09XTEVTVklMTEVcIlxuICBcIkNPWFNBQ0tJRVwiXG4gIFwiQ294c2Fja2llXCJcbiAgXCJDcmFuYmVycnkgTGFrZVwiXG4gIFwiQ1JBUllWSUxMRVwiXG4gIFwiQ1JPR0hBTlwiXG4gIFwiQ1JPUFNFWVZJTExFXCJcbiAgXCJDUk9TUyBSSVZFUlwiXG4gIFwiQ1JPVE9OXCJcbiAgXCJDUk9UT04gRkFMTFNcIlxuICBcIkNST1RPTiBPTiBIVURTT05cIlxuICBcIkNST1RPTi1PTi1IVURTT05cIlxuICBcIkNST1dOIFBPSU5UXCJcbiAgXCJDdWJhXCJcbiAgXCJDdWRkZWJhY2t2aWxsZVwiXG4gIFwiQ1VEREVCQUNLVklMTEVcIlxuICBcIkNVWUxFUlwiXG4gIFwiRGFubmVtb3JhXCJcbiAgXCJEQU5TVklJTExFXCJcbiAgXCJEQU5TVklMTEVcIlxuICBcIkRhbnN2aWxsZVwiXG4gIFwiREFOU1ZJTExFIFwiXG4gIFwiREFSSUVOXCJcbiAgXCJEYXJpZW4gQ2VudGVyXCJcbiAgXCJEQVJJRU4gQ0VOVEVSXCJcbiAgXCJEYXZlbnBvcnRcIlxuICBcIkRBVkVOUE9SVFwiXG4gIFwiREFWRU5QT1JUIENFTlRFUlwiXG4gIFwiREVBTlNCT1JPXCJcbiAgXCJEZUthbGIgSnVuY3Rpb25cIlxuICBcIkRFTEFOQ0VZXCJcbiAgXCJERUxBTlNPTlwiXG4gIFwiREVMRVZBTlwiXG4gIFwiREVMSElcIlxuICBcIkRlbGhpXCJcbiAgXCJERUxNQVJcIlxuICBcIkRlbHBoaSBGYWxsc1wiXG4gIFwiREVOTUFSS1wiXG4gIFwiREVQQVVWSUxMRVwiXG4gIFwiREVQT1NJVFwiXG4gIFwiRGVwb3NpdFwiXG4gIFwiREVSVVlURVJcIlxuICBcIkRlUnV5dGVyXCJcbiAgXCJEZXdpdHRcIlxuICBcIkRFV0lUVFwiXG4gIFwiRGVXaXR0XCJcbiAgXCJERVdJVFRWSUxMRVwiXG4gIFwiREVYVEVSXCJcbiAgXCJEZXh0ZXJcIlxuICBcIkRJQU1PTkQgUE9JTlRcIlxuICBcIkRJQ0tJTlNPTiBDRU5URVJcIlxuICBcIkRPQkJTIEZFUlJZXCJcbiAgXCJET0xHRVZJTExFXCJcbiAgXCJET1ZFUiBQTEFJTlNcIlxuICBcIkRvd25zdmlsbGVcIlxuICBcIkRPV05TVklMTEVcIlxuICBcIkRSRVNERU5cIlxuICBcIkRSWURFTlwiXG4gIFwiRFVBTkVTQlVSR1wiXG4gIFwiRFVOREVFXCJcbiAgXCJEVU5ERUUgXCJcbiAgXCJEVU5LSVJLXCJcbiAgXCJEdW5raXJrXCJcbiAgXCJEVVJIQU1cIlxuICBcIkRVUkhBTVZJTExFXCJcbiAgXCJFLiBCRVJORVwiXG4gIFwiRS4gUkFORE9MUEhcIlxuICBcIkUuIFJPQ0hFU1RFUlwiXG4gIFwiRS4gU1BSSU5HRklFTERcIlxuICBcIkUuR1JFRU5CVVNIXCJcbiAgXCJFQUdMRSBCQVlcIlxuICBcIkVBR0xFIEJSSURHRVwiXG4gIFwiRUFSTFRPTlwiXG4gIFwiRUFSTFZJTExFXCJcbiAgXCJFQVNUIEJFUk5FXCJcbiAgXCJFQVNUIEJMT09NRklFTEQgXCJcbiAgXCJFQVNUIEJSQU5DSFwiXG4gIFwiRUFTVCBDSEFUSEFNXCJcbiAgXCJFQVNUIERVUkhBTVwiXG4gIFwiRUFTVCBHUkVFTkJVU0hcIlxuICBcIkVhc3QgR3JlZW5idXNoXCJcbiAgXCJFQVNUIEhJTExTXCJcbiAgXCJFQVNUIEpFV0VUVFwiXG4gIFwiRUFTVCBNRUFET1dcIlxuICBcIkVBU1QgTUVSRURJVEhcIlxuICBcIkVBU1QgTk9SV0lDSFwiXG4gIFwiRUFTVCBPVFRPXCJcbiAgXCJFQVNUIFBIQVJTQUxJQVwiXG4gIFwiRUFTVCBSQU5ET0xQSFwiXG4gIFwiRUFTVCBST0NIRVNURVJcIlxuICBcIkVBU1QgUk9DS0FXQVlcIlxuICBcIkVhc3QgU3lyYWN1c2VcIlxuICBcIkVBU1QgU1lSQUNVU0VcIlxuICBcIkVBU1QgV0lMTElTVE9OXCJcbiAgXCJFQVNUIFdJTkRIQU1cIlxuICBcIkVBU1RDSEVTVEVSXCJcbiAgXCJFQVRPTlwiXG4gIFwiRUREWVZJTExFXCJcbiAgXCJFRElOQlVSR1wiXG4gIFwiRURNRVNUT05cIlxuICBcIkVkbWVzdG9uXCJcbiAgXCJFZHdhcmRzXCJcbiAgXCJFTEJBXCJcbiAgXCJFbGJhXCJcbiAgXCJFbGJyaWRnZVwiXG4gIFwiRUxCUklER0VcIlxuICBcIkVsZHJlZFwiXG4gIFwiRUxJQ09UVFZJTExFXCJcbiAgXCJFTElaQUJFVEhUT1dOXCJcbiAgXCJFTElaQVZJTExFXCJcbiAgXCJFTEtBIFBBUktcIlxuICBcIkVsbGVuYnVyZyBDZW50ZXJcIlxuICBcIkVsbGVuYnVyZyBEZXBvdFwiXG4gIFwiRWxsZW5idXJnIERlcG90LCBOWVwiXG4gIFwiRUxMRU5WSUxMRVwiXG4gIFwiRUxMSUNPVFRWSUxMRVwiXG4gIFwiRUxMSUNPVFRWSUxMRSBcIlxuICBcIkVsbGluZ3RvblwiXG4gIFwiRUxMSU5HVE9OXCJcbiAgXCJFTE1JUkFcIlxuICBcIkVMTUlSQSBIRUlHSFRTXCJcbiAgXCJFTE1PTlRcIlxuICBcIkVMTVNGT1JEXCJcbiAgXCJFTFNNRVJFXCJcbiAgXCJFTkRJQ09UVFwiXG4gIFwiRW5kaWNvdHRcIlxuICBcIkVORFdFTExcIlxuICBcIkVSSUVWSUxMRVwiXG4gIFwiRVJJTlwiXG4gIFwiRVNPUFVTXCJcbiAgXCJFU1BFUkFOQ0VcIlxuICBcIkVTU0VYXCJcbiAgXCJFVkFOUyBNSUxMU1wiXG4gIFwiRkFCSVVTXCJcbiAgXCJGYWJpdXNcIlxuICBcIkZBSVIgSEFWRU5cIlxuICBcIkZBSVJQT1JUXCJcbiAgXCJGYWlycG9ydFwiXG4gIFwiRkFMQ09ORVJcIlxuICBcIkZhbGNvbmVyLFwiXG4gIFwiRmFsbHNidXJnXCJcbiAgXCJGQVJNSU5HREFMRVwiXG4gIFwiRkFSTUlOR1RPTlwiXG4gIFwiRkFSTUlOR1RPTiBcIlxuICBcIkZheWV0dGV2aWxsZVwiXG4gIFwiRkVMVFMgTUlMTFNcIlxuICBcIkZlcm5kYWxlXCJcbiAgXCJGRVVSQSBCVVNIXCJcbiAgXCJGaWxsbW9yZVwiXG4gIFwiRklORExFWSBMQUtFXCJcbiAgXCJGSU5ETEVZIExBS0UgXCJcbiAgXCJGSU5FVklFV1wiXG4gIFwiRklTSEVSUyBMQU5ESU5HXCJcbiAgXCJGSVNIS0lMTFwiXG4gIFwiRkxFSVNDSE1BTk5TXCJcbiAgXCJGTE9SQUwgUEFSS1wiXG4gIFwiRkxPUklEQVwiXG4gIFwiRkxPV0VSIEhJTExcIlxuICBcIkZPTkRBXCJcbiAgXCJGb3Jlc3RidXJnaFwiXG4gIFwiRk9SRVNUUE9SVFwiXG4gIFwiRk9SRVNUVklMTEVcIlxuICBcIkZPUlQgQU5OXCJcbiAgXCJGT1JUIENPVklOR1RPTlwiXG4gIFwiRk9SVCBFRFdBUkRcIlxuICBcIkZPUlQgTU9OVEdPTUVSWVwiXG4gIFwiRk9SVCBQTEFJTlwiXG4gIFwiRlJBTktGT1JUXCJcbiAgXCJGUkFOS0xJTlwiXG4gIFwiRlJBTktMSU4gU1FVQVJFXCJcbiAgXCJGUkFOS0xJTlZJTExFXCJcbiAgXCJGUkVET05JQVwiXG4gIFwiRnJlZG9uaWFcIlxuICBcIkZSRUVET01cIlxuICBcIkZSRUVIT0xEXCJcbiAgXCJGUkVFUE9SVFwiXG4gIFwiRlJFRVZJTExFXCJcbiAgXCJGUkVXU0JVUkdcIlxuICBcIkZyaWVuZHNoaXBcIlxuICBcIkZUIEVEV0FSRFwiXG4gIFwiRlQuIE1PTlRHT01FUllcIlxuICBcIkZVTFRPTlwiXG4gIFwiRlVMVE9OSEFNXCJcbiAgXCJGVUxUT05WSUxMRVwiXG4gIFwiR0FCUklFTFNcIlxuICBcIkdBSU5FU1ZJTExFXCJcbiAgXCJHQUxBV0FZXCJcbiAgXCJHQUxXQVlcIlxuICBcIkdBTkcgTUlMTFNcIlxuICBcIkdBTlNFVk9PUlRcIlxuICBcIkdBUkRFTiBDSVRZXCJcbiAgXCJHQVJERU4gQ0lUWSBcIlxuICBcIkdBUkRFTiBDSVRZIFBBUktcIlxuICBcIkdBUkRFTiBDSVRZIFNPVVRIXCJcbiAgXCJHQVJESU5FUlwiXG4gIFwiR0FSTkVSVklMTEVcIlxuICBcIkdBUlJJU09OXCJcbiAgXCJHQVNQT1JUXCJcbiAgXCJHYXNwb3J0XCJcbiAgXCJHRU5FU0VPXCJcbiAgXCJHZW5lc2VvXCJcbiAgXCJHRU5FVkFcIlxuICBcIkdlbmV2YVwiXG4gIFwiR0VORVZBIFwiXG4gIFwiR0VOT0FcIlxuICBcIkdFT1JHRVRPV05cIlxuICBcIkdFUk1BTlRPV05cIlxuICBcIkdFUlJZXCJcbiAgXCJHSEVOVFwiXG4gIFwiR0lMQkVSVFNWSUxMRVwiXG4gIFwiR2lsYm9hXCJcbiAgXCJHSUxCT0FcIlxuICBcIkdMQVNDT1wiXG4gIFwiR0xFTiBDT1ZFXCJcbiAgXCJHTEVOIENPVkUgXCJcbiAgXCJHTEVOIEhFQURcIlxuICBcIkdsZW4gU3BleVwiXG4gIFwiR0xFTkZJRUxEXCJcbiAgXCJHTEVOSEFNXCJcbiAgXCJHTEVOTU9OVFwiXG4gIFwiR0xFTlMgRkFMTFNcIlxuICBcIkdMRU5WSUxMRVwiXG4gIFwiR0xFTldPT0QgTEFORElOR1wiXG4gIFwiR0xPVkVSU1ZJTExFXCJcbiAgXCJHT0xERU5TIEJSSURHRVwiXG4gIFwiR09SSEFNXCJcbiAgXCJHT1NIRU5cIlxuICBcIkdvc2hlblwiXG4gIFwiR291dmVybmV1clwiXG4gIFwiR09XQU5EQVwiXG4gIFwiR1JBRlRPTlwiXG4gIFwiR3JhaGFtc3ZpbGxlXCJcbiAgXCJHUkFORCBHT1JHRVwiXG4gIFwiR3JhbmQgR29yZ2VcIlxuICBcIkdSQU5JVEUgU1BSSU5HU1wiXG4gIFwiR1JBTlZJTExFXCJcbiAgXCJHUkVBVCBCRU5EXCJcbiAgXCJHUkVBVCBORUNLXCJcbiAgXCJHUkVBVCBWQUxMRVlcIlxuICBcIkdSRUVDRVwiXG4gIFwiR1JFRU4gSVNMQU5EXCJcbiAgXCJHUkVFTkVcIlxuICBcIkdSRUVORSwgTllcIlxuICBcIkdSRUVORklFTERcIlxuICBcIkdSRUVORklFTEQgQ0VOVEVSXCJcbiAgXCJHUkVFTkZJRUxEIFBBUktcIlxuICBcIkdSRUVOVkFMRVwiXG4gIFwiR3JlZW52aWxsZVwiXG4gIFwiR1JFRU5WSUxMRVwiXG4gIFwiR1JFRU5XSUNIXCJcbiAgXCJHUkVFTldPT0RcIlxuICBcIkdSRUVOV09PRCBMQUtFXCJcbiAgXCJHUkVJR1wiXG4gIFwiR1JPVE9OXCJcbiAgXCJHVUlMREVSTEFORFwiXG4gIFwiR1VJTERFUkxBTkQgQ0VOVEVSXCJcbiAgXCJHVUlMRk9SRFwiXG4gIFwiSEFETEVZXCJcbiAgXCJIQUdBTUFOXCJcbiAgXCJIQUdVRVwiXG4gIFwiSEFJTkVTIEZBTExTXCJcbiAgXCJIQUxGTU9PTlwiXG4gIFwiSEFNREVOXCJcbiAgXCJIQU1JTFRPTlwiXG4gIFwiSGFtaWx0b25cIlxuICBcIkhBTUxJTlwiXG4gIFwiSGFtbW9uZFwiXG4gIFwiSEFNTU9ORFNQT1JUXCJcbiAgXCJIQU5DT0NLXCJcbiAgXCJIYW5uYWNyb2l4XCJcbiAgXCJIQU5OQUNST0lYXCJcbiAgXCJIYW5uYXdhIEZhbGxzXCJcbiAgXCJIQU5OSUJBTFwiXG4gIFwiSEFSRk9SRFwiXG4gIFwiSEFSUFVSU1ZJTExFXCJcbiAgXCJIQVJSSU1BTlwiXG4gIFwiSEFSUklTT05cIlxuICBcIkhBUlJJU1ZJTExFXCJcbiAgXCJIYXJyaXN2aWxsZVwiXG4gIFwiSEFSVEZPUkRcIlxuICBcIkhBUlRTREFMRVwiXG4gIFwiSEFSVFdJQ0tcIlxuICBcIkhBU1RJTkdTXCJcbiAgXCJIQVNUSU5HUy1PTi1IVURTT05cIlxuICBcIkhBVkVSU1RSQVdcIlxuICBcIkhBV1RIT1JORVwiXG4gIFwiSEVDVE9SXCJcbiAgXCJIRU1MT0NLXCJcbiAgXCJIRU1QU1RFQURcIlxuICBcIkhFTkRFUlNPTlwiXG4gIFwiSEVOREVSU09OIEhBUkJPUlwiXG4gIFwiSEVOUklFVFRBXCJcbiAgXCJIRU5TT05WSUxMRVwiXG4gIFwiSGVuc29udmlsbGVcIlxuICBcIkhFUktJTUVSXCJcbiAgXCJIZXJtb25cIlxuICBcIkhldXZlbHRvblwiXG4gIFwiSEVXTEVUVFwiXG4gIFwiSEVXTEVUVCBIQVJCT1JcIlxuICBcIkhJQ0tTVklMTEVcIlxuICBcIkhJR0ggRkFMTFNcIlxuICBcIkhJR0hMQU5EXCJcbiAgXCJISUdITEFORCBGQUxMU1wiXG4gIFwiSGlnaGxhbmQgTGFrZVwiXG4gIFwiSElHSExBTkQgTUlMTFNcIlxuICBcIkhJR0hNT1VOVFwiXG4gIFwiSElMTEJVUk5cIlxuICBcIkhJTExTREFMRVwiXG4gIFwiSElMVE9OXCJcbiAgXCJISU1ST0RcIlxuICBcIkhJTlNEQUxFXCJcbiAgXCJIT0JBUlRcIlxuICBcIkhPR0FOU0JVUkdcIlxuICBcIkhPTExBTkQgUEFURU5UXCJcbiAgXCJIT0xMRVlcIlxuICBcIkhPTE1FU1wiXG4gIFwiSG9tZXJcIlxuICBcIkhPTUVSXCJcbiAgXCJIT05FT1lFXCJcbiAgXCJIT05FT1lFIFwiXG4gIFwiSE9ORU9ZRSBGQUxMU1wiXG4gIFwiSE9PU0lDS1wiXG4gIFwiSE9PU0lDSyBGQUxMU1wiXG4gIFwiSE9QRVdFTEwgSlVOQ1RJT05cIlxuICBcIkhPUk5FTExcIlxuICBcIkhPUlNFSEVBRFNcIlxuICBcIkhPUlNIRUFEU1wiXG4gIFwiSG91Z2h0b25cIlxuICBcIkhPV0VTIENBVkVcIlxuICBcIkhVQkJBUkRTVklMTEVcIlxuICBcIkhVRFNPTlwiXG4gIFwiSFVEU09OIEZBTExTXCJcbiAgXCJIVUdVRU5PVFwiXG4gIFwiSFVMRVRUUyBMQU5ESU5HXCJcbiAgXCJIVU5UXCJcbiAgXCJIVU5URVJcIlxuICBcIkhVUkxFWVwiXG4gIFwiSHVybGV5dmlsbGVcIlxuICBcIkhZREUgUEFSS1wiXG4gIFwiSFlERSBQQVJLIFwiXG4gIFwiSUxJT05cIlxuICBcIklORElBTiBMQUtFXCJcbiAgXCJJTkxFVFwiXG4gIFwiSU5URVJMQUtFTlwiXG4gIFwiSU5XT09EXCJcbiAgXCJJUlZJTkdcIlxuICBcIklSVklOR1RPTlwiXG4gIFwiSVNDSFVBXCJcbiAgXCJJU0xBTkQgUEFSS1wiXG4gIFwiSVRIQUNBXCJcbiAgXCJJdGhhY2FcIlxuICBcIkpBQ0tTT04gSEVJR0hUU1wiXG4gIFwiSkFNRVNUT1dOXCJcbiAgXCJKYW1lc3Rvd25cIlxuICBcIkphbWVzdmlsbGVcIlxuICBcIkpBTUVTVklMTEVcIlxuICBcIkphbXN0b3duXCJcbiAgXCJKQVZBIENFTlRFUlwiXG4gIFwiSkVGRkVSU09OXCJcbiAgXCJKRUZGRVJTT04gVkFMTEVZXCJcbiAgXCJKZWZmZXJzb252aWxsZVwiXG4gIFwiSkVSSUNIT1wiXG4gIFwiSmV3ZXR0XCJcbiAgXCJKT0hOU0JVUkdcIlxuICBcIkpPSE5TT04gQ0lUWVwiXG4gIFwiSk9ITlNPTiBDSVRZIFwiXG4gIFwiSk9ITlNUT1dOXCJcbiAgXCJKb3JkYW5cIlxuICBcIkpPUkRBTlwiXG4gIFwiS0FOT05BXCJcbiAgXCJLQVRPTkFIXCJcbiAgXCJLQVRUU0tJTEwgQkFZXCJcbiAgXCJLYXVuZW9uZ2EgTGFrZVwiXG4gIFwiS0VFTkVcIlxuICBcIktFRU5FIFZBTExFWVwiXG4gIFwiS2Vlc2V2aWxsZVwiXG4gIFwiS0VFU0VWSUxMRVwiXG4gIFwiS0VOREFMTFwiXG4gIFwiS0VOTkVEWVwiXG4gIFwiS2VubmVkeVwiXG4gIFwiS2Vub3phIExha2VcIlxuICBcIktFTlRcIlxuICBcIktFTlQgTEFLRVNcIlxuICBcIktFUkhPTktTT05cIlxuICBcIktFVUtBIFBBUktcIlxuICBcIktpYW1lc2hhIExha2VcIlxuICBcIktJTkRFUkhPT0tcIlxuICBcIktJTkcgRkVSUllcIlxuICBcIktJTkdTVE9OXCJcbiAgXCJLaXJrdmlsbGVcIlxuICBcIktJUktXT09EXCJcbiAgXCJLSVJZQVMgSk9FTFwiXG4gIFwiS1JVTVZJTExFXCJcbiAgXCJMQSBHUkFOR0VcIlxuICBcIkxBQ09OQVwiXG4gIFwiTEFGQVJHRVZJTExFXCJcbiAgXCJMYWZheWV0dGVcIlxuICBcIkxBRkFZRVRURVwiXG4gIFwiTGFGYXlldHRlXCJcbiAgXCJMQUdSQU5HRVwiXG4gIFwiTEFHUkFOR0VWSUxMRVwiXG4gIFwiTEFLRSBDTEVBUlwiXG4gIFwiTEFLRSBHRU9SR0VcIlxuICBcIkxha2UgSHVudGluZ3RvblwiXG4gIFwiTEFLRSBLQVRSSU5FXCJcbiAgXCJMQUtFIExVWkVSTkVcIlxuICBcIkxBS0UgUExBQ0lEXCJcbiAgXCJMYWtlIFBsYWNpZFwiXG4gIFwiTEFLRSBQTEFDSUQsIE5ZIFwiXG4gIFwiTEFLRSBQTEVBU0FOVFwiXG4gIFwiTEFLRSBTVUNDRVNTXCJcbiAgXCJMQUtFTU9OVFwiXG4gIFwiTEFLRVZJTExFXCJcbiAgXCJMQUtFV09PRFwiXG4gIFwiTGFrZXdvb2RcIlxuICBcIkxBTlNJTkdcIlxuICBcIkxhbnNpbmdcIlxuICBcIkxBUkNITU9OVFwiXG4gIFwiTEFUSEFNXCJcbiAgXCJMYXRoYW1cIlxuICBcIkxBVEhBTSwgTllcIlxuICBcIkxBVFRJTkdUT1dOXCJcbiAgXCJMYXVyZW5zXCJcbiAgXCJMQVdSRU5DRVwiXG4gIFwiTEVFIENFTlRFUlwiXG4gIFwiTEVFRFNcIlxuICBcIkxlZWRzXCJcbiAgXCJMRUlDRVNURVJcIlxuICBcIkxFT05BUkRTVklMTEVcIlxuICBcIkxFUk9ZXCJcbiAgXCJMZVJveVwiXG4gIFwiTGVyb3lcIlxuICBcIkxFUk9ZIFwiXG4gIFwiTEVWSVRUT1dOXCJcbiAgXCJMZXcgQmVhY2hcIlxuICBcIkxFVyBCRUFDSFwiXG4gIFwiTEVXSVNcIlxuICBcIkxFV0lTVE9OXCJcbiAgXCJMRVdpU1RPTlwiXG4gIFwiTGliZXJ0eVwiXG4gIFwiTElETyBCRUFDSFwiXG4gIFwiTElMWSBEQUxFXCJcbiAgXCJMSU1BXCJcbiAgXCJMSU1FUklDS1wiXG4gIFwiTElNRVNUT05FXCJcbiAgXCJMSU5DT0xOREFMRVwiXG4gIFwiTGlzYm9uXCJcbiAgXCJMSVNMRVwiXG4gIFwiTElUVExFIEZBTExTXCJcbiAgXCJMSVRUTEUgVkFMTEVZXCJcbiAgXCJMSVRUTEUgWU9SS1wiXG4gIFwiTGl2ZXJwb29sXCJcbiAgXCJMSVZFUlBPT0xcIlxuICBcIkxpdmluZ3N0b24gTWFub3JcIlxuICBcIkxJVk9OSUFcIlxuICBcIkxpdm9uaWFcIlxuICBcIkxvY2ggU2hlbGRyYWtlXCJcbiAgXCJMT0NLRVwiXG4gIFwiTE9DS1BPUlRcIlxuICBcIkxPQ0tQT1JULCBOWVwiXG4gIFwiTE9DVVNUIFZBTExFWVwiXG4gIFwiTE9ESVwiXG4gIFwiTE9ORyBCRUFDSFwiXG4gIFwiTG9uZyBFZGR5XCJcbiAgXCJMT05HIExBS0VcIlxuICBcIkxvbmcgTGFrZVwiXG4gIFwiTE9VRE9OVklMTEVcIlxuICBcIkxPV1ZJTExFXCJcbiAgXCJMb3d2aWxsZVwiXG4gIFwiTFlDT01JTkdcIlxuICBcIkxZTkJST09LXCJcbiAgXCJMWU5ET05WSUxMRVwiXG4gIFwiTHlvbiBNb3VudGFpblwiXG4gIFwiTFlPTlNcIlxuICBcIkxZT05TIFwiXG4gIFwiTFlPTlMgRkFMTFNcIlxuICBcIk1BQ0VET05cIlxuICBcIk1BQ0VET04gXCJcbiAgXCJNQUNISUFTXCJcbiAgXCJNQURJU09OXCJcbiAgXCJNYWRyaWRcIlxuICBcIk1BSE9QQUNcIlxuICBcIk1haG9wYWNcIlxuICBcIk1BSU5FXCJcbiAgXCJNQUxERU5cIlxuICBcIk1BTE9ORVwiXG4gIFwiTWFsb25lXCJcbiAgXCJNQUxPTkUgXCJcbiAgXCJNQUxUQVwiXG4gIFwiTUFMVkVSTkVcIlxuICBcIk1BTUFST05FQ0tcIlxuICBcIk1BTkNIRVNURVJcIlxuICBcIk1BTkhBU1NFVFwiXG4gIFwiTWFubGl1c1wiXG4gIFwiTUFOTElVU1wiXG4gIFwiTUFOTlNWSUxMRVwiXG4gIFwiTUFOT1JIQVZFTlwiXG4gIFwiTUFSQVRIT05cIlxuICBcIk1hcmF0aG9uXCJcbiAgXCJNYXJjZWxsdXNcIlxuICBcIk1BUkNFTExVU1wiXG4gIFwiTUFSQ1lcIlxuICBcIk1BUkdBUkVUVklMTEVcIlxuICBcIk1hcmdhcmV0dmlsbGVcIlxuICBcIk1hcmlldHRhXCJcbiAgXCJNQVJJRVRUQVwiXG4gIFwiTUFSSU9OXCJcbiAgXCJNQVJMQk9ST1wiXG4gIFwiTUFSVFZJTExFXCJcbiAgXCJNQVJZTEFORFwiXG4gIFwiTUFTU0FQRVFVQVwiXG4gIFwiTUFTU0FQRVFVQSAgUEFSS1wiXG4gIFwiTUFTU0FQRVFVQSBQQVJLXCJcbiAgXCJNYXNzZW5hXCJcbiAgXCJNYXR0eWRhbGVcIlxuICBcIk1BVFRZREFMRVwiXG4gIFwiTUFZQlJPT0tcIlxuICBcIk1BWUZJRUxEXCJcbiAgXCJNQVlWSUxMRVwiXG4gIFwiTWF5dmlsbGVcIlxuICBcIk1DQ09OTkVMTFNWSUxMRVwiXG4gIFwiTWNET05PVUdIXCJcbiAgXCJNQ0RPTk9VR0hcIlxuICBcIk1DR1JBV1wiXG4gIFwiTWNHcmF3XCJcbiAgXCJNRUNIQU5JQ1ZJTExFXCJcbiAgXCJNRURJTkFcIlxuICBcIk1FRElOQSxcIlxuICBcIk1FRElOQSwgTkVXIFlPUktcIlxuICBcIk1lbXBoaXNcIlxuICBcIk1FTkFORFNcIlxuICBcIk1FTkRPTlwiXG4gIFwiTUVSSURJQU5cIlxuICBcIk1FUlJJQ0tcIlxuICBcIk1lcnJpbGxcIlxuICBcIk1FWElDT1wiXG4gIFwiTUlERExFIEdST1ZFXCJcbiAgXCJNSURETEVCVVJHSFwiXG4gIFwiTWlkZGxlYnVyZ2hcIlxuICBcIk1JRERMRVBPUlRcIlxuICBcIk1JRERMRVNFWFwiXG4gIFwiTUlERExFVE9XTlwiXG4gIFwiTWlkZGxldG93blwiXG4gIFwiTWlsZXNlc1wiXG4gIFwiTUlMRk9SRFwiXG4gIFwiTWlsZm9yZFwiXG4gIFwiTUlMTCBORUNLXCJcbiAgXCJNSUxMQlJPT0tcIlxuICBcIk1JTExFUlRPTlwiXG4gIFwiTWlsbGVydG9uXCJcbiAgXCJNSUxMRVJUT04gXCJcbiAgXCJNSUxMUE9SVFwiXG4gIFwiTUlMTFdPT0RcIlxuICBcIk1JTFRPTlwiXG4gIFwiTWlsdG9uXCJcbiAgXCJNSU5FT0xBXCJcbiAgXCJNSU5FUlZBXCJcbiAgXCJNSU5FVFRPXCJcbiAgXCJNSU5FVklMTEVcIlxuICBcIk1pbm9hXCJcbiAgXCJNT0RFTkFcIlxuICBcIk1PSEFXS1wiXG4gIFwiTU9IRUdBTiBMQUtFXCJcbiAgXCJNT0lSQVwiXG4gIFwiTW9uZ2F1cCBWYWxsZXlcIlxuICBcIk1PTlJPRVwiXG4gIFwiTW9ucm9lXCJcbiAgXCJNT05TRVlcIlxuICBcIk1PTlRFQkVMTE9cIlxuICBcIk1PTlRFWlVNQVwiXG4gIFwiTU9OVEdPTUVSWVwiXG4gIFwiTW9udGljZWxsb1wiXG4gIFwiTU9OVElDRUxMT1wiXG4gIFwiTU9OVE9VUiBGQUxMU1wiXG4gIFwiTU9OVFJPU0VcIlxuICBcIk1vb2Vyc1wiXG4gIFwiTW9vZXJzIEZvcmtzXCJcbiAgXCJNT1JBVklBXCJcbiAgXCJNb3JhdmlhXCJcbiAgXCJNT1JJQUhcIlxuICBcIk1PUklBSCBDRU5URVJcIlxuICBcIk1PUlJJU1wiXG4gIFwiTW9ycmlzb252aWxsZVwiXG4gIFwiTU9SUklTT05WSUxMRVwiXG4gIFwiTW9ycmlzdG93blwiXG4gIFwiTU9SUklTVklMTEVcIlxuICBcIk1vdHR2aWxsZVwiXG4gIFwiTU9VTlQgSVZZXCJcbiAgXCJNT1VOVCBLSVNDT1wiXG4gIFwiTW91bnQgTW9ycmlzXCJcbiAgXCJNT1VOVCBUUkVNUEVSXCJcbiAgXCJNT1VOVCBWRVJOT05cIlxuICBcIk1PVU5UIFZJU0lPTlwiXG4gIFwiTU9VTlRBSU4gVklFV1wiXG4gIFwiTU9VTlRBSU4gVklFVyBcIlxuICBcIk1vdW50YWluZGFsZVwiXG4gIFwiTU9VTlRBSU5WSUxMRVwiXG4gIFwiTVQgVFJFTVBFUlwiXG4gIFwiTVQuIE1BUklPTlwiXG4gIFwiTVQuIE1PUlJJU1wiXG4gIFwiTXQuIE1vcnJpc1wiXG4gIFwiTVQuIE1PUlJJUyBcIlxuICBcIk1ULiBUUkVNUEVSXCJcbiAgXCJNVC4gVVBUT05cIlxuICBcIk10Lk1vcnJpc1wiXG4gIFwiTVVNRk9SRFwiXG4gIFwiTVVOTlNWSUxMRVwiXG4gIFwiTVVOU0VZIFBBUktcIlxuICBcIk4gTUFTU0FQRVFVQVwiXG4gIFwiTi4gQlJPT0tGSUVMRFwiXG4gIFwiTi4gQ0hJTElcIlxuICBcIk4uIFRPTkFXQU5EQVwiXG4gIFwiTkFOVUVUXCJcbiAgXCJOQVBBTk9DSFwiXG4gIFwiTkFQTEVTXCJcbiAgXCJOQVBMRVMgXCJcbiAgXCJOYXJyb3dzYnVyZ1wiXG4gIFwiTkFTU0FVXCJcbiAgXCJOQVRVUkFMIEJSSURHRVwiXG4gIFwiTmVkcm93XCJcbiAgXCJORURST1dcIlxuICBcIk5ldmVyc2lua1wiXG4gIFwiTkVXICBIWURFIFBBUktcIlxuICBcIk5FVyBCQUxUSU1PUkVcIlxuICBcIk5FVyBCRVJMSU5cIlxuICBcIk5ldyBCZXJsaW5cIlxuICBcIk5FVyBDQVNUTEVcIlxuICBcIk5FVyBDSVRZXCJcbiAgXCJORVcgSEFNUFRPTlwiXG4gIFwiTkVXIEhBUlRGT1JEXCJcbiAgXCJOZXcgSGFydGZvcmRcIlxuICBcIk5FVyBIQVJURk9SRCwgIE5ZXCJcbiAgXCJORVcgSEFWRU5cIlxuICBcIk5FVyBIRU1QU1RFQURcIlxuICBcIk5FVyBIWURFIFBBUktcIlxuICBcIk5FVyBMRUJBTk9OXCJcbiAgXCJORVcgUEFMVFpcIlxuICBcIk5FVyBST0NIRUxMRVwiXG4gIFwiTkVXIFNRVUFSRVwiXG4gIFwiTkVXIFdJTkRTT1JcIlxuICBcIk5FVyBXSU5EU09SIFwiXG4gIFwiTkVXIFlPUksgTUlMTFNcIlxuICBcIk5FV0FSS1wiXG4gIFwiTkVXQVJLIFwiXG4gIFwiTkVXQVJLIFZBTExFWVwiXG4gIFwiTkVXQlVSR0hcIlxuICBcIk5ld2J1cmdoXCJcbiAgXCJORVdDT01CXCJcbiAgXCJORVdGQU5FXCJcbiAgXCJORVdGSUVMRFwiXG4gIFwiTkVXUE9SVFwiXG4gIFwiTklBR0FSQSBGQUxMTFNcIlxuICBcIk5JQUdBUkEgRkFMTFNcIlxuICBcIk5pYWdhcmEgRmFsbHNcIlxuICBcIk5JQUdBUkEgVU5JVkVSU0lUWVwiXG4gIFwiTklDSE9MU1wiXG4gIFwiTklTS0FZVU5BXCJcbiAgXCJOSVZFUlZJTExFXCJcbiAgXCJOb3Jmb2xrXCJcbiAgXCJOT1JUSCBCQVlcIlxuICBcIk5PUlRIIEJFTExNT1JFXCJcbiAgXCJOT1JUSCBCTEVOSEVJTVwiXG4gIFwiTk9SVEggQ0hJTElcIlxuICBcIk5PUlRIIENSRUVLXCJcbiAgXCJOT1JUSCBISUxMU1wiXG4gIFwiTk9SVEggSE9PU0lDS1wiXG4gIFwiTk9SVEggSE9STkVMTFwiXG4gIFwiTk9SVEggSFVEU09OXCJcbiAgXCJOb3J0aCBMYXdyZW5jZVwiXG4gIFwiTk9SVEggTUFTU0FQRVFVQVwiXG4gIFwiTk9SVEggTUVSUklDS1wiXG4gIFwiTk9SVEggTk9SV0lDSFwiXG4gIFwiTk9SVEggUE9MRVwiXG4gIFwiTk9SVEggUklWRVJcIlxuICBcIk5PUlRIIFJPU0VcIlxuICBcIk5PUlRIIFNBTEVNXCJcbiAgXCJOb3J0aCBTeXJhY3VzZVwiXG4gIFwiTk9SVEggU1lSQUNVU0VcIlxuICBcIk5PUlRIIFRPTkFXQU5EQVwiXG4gIFwiTk9SVEggVkFMTEVZIFNUUkVBTVwiXG4gIFwiTk9SVEggV0hJVEUgUExBSU5TXCJcbiAgXCJOT1JUSCBXT09ETUVSRVwiXG4gIFwiTk9SVEhWSUxMRVwiXG4gIFwiTk9SV0FZXCJcbiAgXCJOT1JXSUNIXCJcbiAgXCJOb3J3aWNoXCJcbiAgXCJOT1JXSUNILCBOLlkuXCJcbiAgXCJOb3J3b29kXCJcbiAgXCJOdW5kYVwiXG4gIFwiTlVOREFcIlxuICBcIk5ZQUNLXCJcbiAgXCJPQUsgSElMTFwiXG4gIFwiT2FrZmllbGRcIlxuICBcIk9BS0ZJRUxEXCJcbiAgXCJPQ0VBTlNJREVcIlxuICBcIk9ERVNTQVwiXG4gIFwiT2dkZW5zYnVyZ1wiXG4gIFwiT0xDT1RUXCJcbiAgXCJPTEQgQkVUSFBBR0VcIlxuICBcIk9MRCBCUk9PS1ZJTExFXCJcbiAgXCJPTEQgQ0hBVEhBTVwiXG4gIFwiT0xEIEZPUkdFXCJcbiAgXCJPTEQgV0VTVEJVUllcIlxuICBcIk9MRUFOXCJcbiAgXCJPTEVBTiBcIlxuICBcIk9MSVZFQlJJREdFXCJcbiAgXCJPTElWRVJFQVwiXG4gIFwiT0xNU1RFRFZJTExFXCJcbiAgXCJPTkVJREFcIlxuICBcIk9uZWlkYVwiXG4gIFwiT05FSURBLFwiXG4gIFwiT05FT05UQVwiXG4gIFwiT25lb250YVwiXG4gIFwiT05JRURBXCJcbiAgXCJPTlRBUklPXCJcbiAgXCJPTlRBUklPIFwiXG4gIFwiT05UQVJJTyBDRU5URVJcIlxuICBcIk9yYW1lbFwiXG4gIFwiT1JBTkdFQlVSR1wiXG4gIFwiT1JJU0tBTllcIlxuICBcIk9SSVNLQU5ZIEZBTExTXCJcbiAgXCJPUldFTExcIlxuICBcIk9TQ0VPTEFcIlxuICBcIk9TU0lOSU5HXCJcbiAgXCJPc3dlZ2F0Y2hpZVwiXG4gIFwiT1NXRUdPXCJcbiAgXCJPU1dFR08gXCJcbiAgXCJPVEVHT1wiXG4gIFwiT1RJU1ZJTExFXCJcbiAgXCJPVklEXCJcbiAgXCJPVklEIFwiXG4gIFwiT1dFR09cIlxuICBcIk93ZWdvXCJcbiAgXCJPV0xTIEhFQURcIlxuICBcIk9YRk9SRFwiXG4gIFwiT1lTVEVSIEJBWVwiXG4gIFwiT1lTVEVSIEJBWSBDT1ZFXCJcbiAgXCJQQUlOVEVEIFBPU1RcIlxuICBcIlBBTEFUSU5FIEJSSURHRVwiXG4gIFwiUEFMRU5WSUxMRVwiXG4gIFwiUEFMSVNBREVTXCJcbiAgXCJQQUxNWVJBXCJcbiAgXCJQQU5BTUFcIlxuICBcIlBBTkFNQSBcIlxuICBcIlBBUklTSFwiXG4gIFwiUGFyaXNodmlsbGVcIlxuICBcIlBhcmtzdmlsbGVcIlxuICBcIlBBVFRFUlNPTlwiXG4gIFwiUEFUVEVSU09OLCAgTllcIlxuICBcIlBBVFRFUlNPTlZJTExFXCJcbiAgXCJQQVVMIFNNSVRIU1wiXG4gIFwiUEFWSUxJT05cIlxuICBcIlBBV0xJTkdcIlxuICBcIlBBV0xJTkcgXCJcbiAgXCJQRUFSTCBSSVZFUlwiXG4gIFwiUGVhcmwgUml2ZXJcIlxuICBcIlBFQVJMIFJJVkVSIFwiXG4gIFwiUEVFS1NJTExcIlxuICBcIlBFRUtTS0lMTFwiXG4gIFwiUEVMSEFNXCJcbiAgXCJQRUxIQU0gTUFOT1JcIlxuICBcIlBFTkZJRUxEXCJcbiAgXCJQRU5JRUxEXCJcbiAgXCJQRU5OIFlBTlwiXG4gIFwiUEVOTiBZQU4gXCJcbiAgXCJQRU5ORUxMVklMTEVcIlxuICBcIlBFUlJZXCJcbiAgXCJQZXJyeVwiXG4gIFwiUEVSUllTQlVSR1wiXG4gIFwiUEVSVEhcIlxuICBcIlBlcnVcIlxuICBcIlBlcnUsIE5ZXCJcbiAgXCJQSEVMUFNcIlxuICBcIlBIRUxQUyAgICAgICBOWVwiXG4gIFwiUEhJTEFERUxQSElBXCJcbiAgXCJQSElMTU9OVFwiXG4gIFwiUEhPRU5JQ0lBXCJcbiAgXCJQSE9FTklYXCJcbiAgXCJQaG9lbml4XCJcbiAgXCJQSUVSTU9OVFwiXG4gIFwiUElFUlJFUE9OVCBNQU5PUlwiXG4gIFwiUElGRkFSRFwiXG4gIFwiUElLRVwiXG4gIFwiUElORSBCVVNIXCJcbiAgXCJQaW5lIEJ1c2hcIlxuICBcIlBJTkUgQ0lUWVwiXG4gIFwiUElORSBISUxMXCJcbiAgXCJQSU5FIElTTEFORFwiXG4gIFwiUElORSBQTEFJTlNcIlxuICBcIlBJU0VDT1wiXG4gIFwiUElUQ0hFUlwiXG4gIFwiUElUVFNGT1JEXCJcbiAgXCJQTEFJTkVER0VcIlxuICBcIlBMQUlOVklFV1wiXG4gIFwiUExBTkRPTUVcIlxuICBcIlBMQVRURUtJTExcIlxuICBcIlBsYXR0c2J1cmdiaFwiXG4gIFwiUGxhdHRzYnVyZ2hcIlxuICBcIlBMQVRUU0JVUkdIXCJcbiAgXCJQTEVBU0FOVCBWQUxMRVlcIlxuICBcIlBMRUFTQU5UVklMTEVcIlxuICBcIlBMWU1PVVRIXCJcbiAgXCJQT0VTVEVOS0lMTFwiXG4gIFwiUE9JTlQgTE9PS09VVFwiXG4gIFwiUE9MQU5EXCJcbiAgXCJQT01PTUFcIlxuICBcIlBPTU9OQVwiXG4gIFwiUG9tcGV5XCJcbiAgXCJQT1JUIEJZUk9OXCJcbiAgXCJQT1JUIENIRVNURVJcIlxuICBcIlBPUlQgQ1JBTkVcIlxuICBcIlBPUlQgRVdFTlwiXG4gIFwiUE9SVCBIRU5SWVwiXG4gIFwiUE9SVCBKRVJWSVNcIlxuICBcIlBPUlQgS0VOVFwiXG4gIFwiUE9SVCBMRVlERU5cIlxuICBcIlBPUlQgV0FTSElOR1RPTlwiXG4gIFwiUE9SVEFHRVZJTExFXCJcbiAgXCJQT1JURVIgQ09STkVSU1wiXG4gIFwiUE9SVFZJTExFXCJcbiAgXCJQb3RzZGFtXCJcbiAgXCJQb3RzZGFtIFwiXG4gIFwiUE9UVEVSU1ZJTExFXCJcbiAgXCJQT1VHSEtFRVBTSUVcIlxuICBcIlBvdWdoa2VlcHNpZVwiXG4gIFwiUE9VR0hLRVBTSUVcIlxuICBcIlBPVUdIUVVBR1wiXG4gIFwiUE9VTkQgUklER0VcIlxuICBcIlBPVU9HSEtFRVBTSUVcIlxuICBcIlBSQVRUU0JVUkdIXCJcbiAgXCJQUkFUVFNWSUxMRVwiXG4gIFwiUHJhdHRzdmlsbGVcIlxuICBcIlByZWJsZVwiXG4gIFwiUFJFQkxFXCJcbiAgXCJQUklOQ0VUT1dOXCJcbiAgXCJQUk9TUEVDVFwiXG4gIFwiUFVMQVNLSVwiXG4gIFwiUFVMQVNLSSBcIlxuICBcIlBVTFRFTkVZXCJcbiAgXCJQVVJDSEFTRVwiXG4gIFwiUFVSRFlTXCJcbiAgXCJQVVJMSU5HXCJcbiAgXCJQVVROQU0gU1RBVElPTlwiXG4gIFwiUFVUTkFNIFZBTExFWVwiXG4gIFwiUVVFRU5TQlVSWVwiXG4gIFwiUXVlZW5zYnVyeVwiXG4gIFwiUkFORE9MUEhcIlxuICBcIlJBTlNPTVZJTExFXCJcbiAgXCJSQVFVRVRURSBMQUtFXCJcbiAgXCJSQVZFTkFcIlxuICBcIlJhdmVuYVwiXG4gIFwiUkFZIEJST09LXCJcbiAgXCJSYXltb25kdmlsbGVcIlxuICBcIlJFRCBDUkVFS1wiXG4gIFwiUkVEIEhPT0tcIlxuICBcIlJFRCBIT1VTRVwiXG4gIFwiUkVERklFTERcIlxuICBcIlJFREhPT0tcIlxuICBcIlJFRFdPT0RcIlxuICBcIlJFTVNFTlwiXG4gIFwiUkVOU1NFQUxBRVJcIlxuICBcIlJFTlNTRUxBRVJcIlxuICBcIlJlbnNzZWxhZXJcIlxuICBcIlJFTlNTRUxBRVJWSUxMRVwiXG4gIFwiUkVOU1NFTEVBUlwiXG4gIFwiUkVUU09GXCJcbiAgXCJSRVhGT1JEXCJcbiAgXCJSSElORUJFQ0tcIlxuICBcIlJISU5FQkVDSywgTllcIlxuICBcIlJISU5FQkVDSywgTlkgXCJcbiAgXCJSSElORUNMSUZGXCJcbiAgXCJSSUNIQlVSR1wiXG4gIFwiUklDSEZJRUxEIFNQUklOR1NcIlxuICBcIlJpY2hmaWVsZCBTcHJpbmdzXCJcbiAgXCJSSUNIRk9SRFwiXG4gIFwiUklDSExBTkRcIlxuICBcIlJJQ0hNT05EVklMTEVcIlxuICBcIlJpY2htb25kdmlsbGVcIlxuICBcIlJJUExFWVwiXG4gIFwiUk9DSEVTRVJcIlxuICBcIlJPQ0hFU1RFUlwiXG4gIFwiUm9jaGVzdGVyXCJcbiAgXCJST0NIRVNURVIgTllcIlxuICBcIlJvY2sgSGlsbFwiXG4gIFwiUm9jayBISWxsXCJcbiAgXCJST0NLIFNUUkVBTVwiXG4gIFwiUk9DSyBUQVZFUk5cIlxuICBcIlJPQ0tWSUxMRSBDRU5UUkVcIlxuICBcIlJPTUVcIlxuICBcIlJvbWVcIlxuICBcIlJPTUUsICBOWVwiXG4gIFwiUk9NRSwgTllcIlxuICBcIlJPTVVMVVNcIlxuICBcIlJPT1NFVkVMVFwiXG4gIFwiUk9PU0VWRUxUIFwiXG4gIFwiUm9zY29lXCJcbiAgXCJST1NDT0VcIlxuICBcIlJPU0VCT09NXCJcbiAgXCJST1NFREFMRSAoV0RNUilcIlxuICBcIlJPU0VOREFMRVwiXG4gIFwiUk9TTFlOXCJcbiAgXCJST1NMWU4gRVNUQVRFU1wiXG4gIFwiUk9TTFlOIEhBUkJPUlwiXG4gIFwiUk9TTFlOIEhFSUdIVFNcIlxuICBcIlJPVFRFUkRBTVwiXG4gIFwiUk9UVEVSREFNIEpDVFwiXG4gIFwiUk9UVEVSREFNIEpDVC5cIlxuICBcIlJPVU5EIExBS0VcIlxuICBcIlJPVU5EIFRPUFwiXG4gIFwiUm91c2VzIFBvaW50XCJcbiAgXCJST1hCVVJZXCJcbiAgXCJSb3hidXJ5XCJcbiAgXCJSVUJZXCJcbiAgXCJSVVNIXCJcbiAgXCJSVVNIVklMTEVcIlxuICBcIlJ1c3NlbGxcIlxuICBcIlJZRVwiXG4gIFwiUllFIEJST09LXCJcbiAgXCJTIEZBUk1JTkdEQUxFXCJcbiAgXCJTLiBEQVlUT05cIlxuICBcIlNBQ0tFVFMgSEFSQk9SXCJcbiAgXCJTQUxBTUFOQ0FcIlxuICBcIlNBTEVNXCJcbiAgXCJTYWxpc2J1cnkgQ2VudGVyXCJcbiAgXCJTQUxJU0JVUlkgTUlMTFNcIlxuICBcIlNBTFQgUE9JTlRcIlxuICBcIlNBTkJPUk5cIlxuICBcIlNBTkRTIFBPSU5UXCJcbiAgXCJTQU5EVVNLWVwiXG4gIFwiU0FORFkgQ1JFRUtcIlxuICBcIlNBTkdFUkZJRUxEXCJcbiAgXCJTYXJhbmFjXCJcbiAgXCJTQVJBTkFDIExBS0VcIlxuICBcIlNBUkFOQUMgTEFLRSBcIlxuICBcIlNBUkFOQyBMQUtFXCJcbiAgXCJTQVJBVE9HQVwiXG4gIFwiU0FSQVRPR0EgU1BJUk5HU1wiXG4gIFwiU0FSQVRPR0EgU1BSSU5HU1wiXG4gIFwiU2FyYXRvZ2EgU3ByaW5nc1wiXG4gIFwiU0FSQVRPR0EgU1JQSU5HU1wiXG4gIFwiU0FSVE9HQSBTUFJJTkdTXCJcbiAgXCJTQVVHRVJUSUVTXCJcbiAgXCJTQVVRVU9JVFwiXG4gIFwiU0FWT05BXCJcbiAgXCJTQ0FSQk9ST1VHSFwiXG4gIFwiU0NBUlNEQUxFXCJcbiAgXCJTQ0hBR0hUSUNPS0VcIlxuICBcIlNDSEVORUNUQURZXCJcbiAgXCJTQ0hFTkVWVVNcIlxuICBcIlNjaGVuZXZ1c1wiXG4gIFwiU2Nob2hhcmllXCJcbiAgXCJTQ0hPSEFSSUVcIlxuICBcIlNDSFJPT04gTEFLRVwiXG4gIFwiU2Nocm9vbiBMYWtlXCJcbiAgXCJTQ0hVWUxFUiBMQUtFXCJcbiAgXCJTQ0hVWUxFUlZJTExFXCJcbiAgXCJTY2lvXCJcbiAgXCJTQ09USUFcIlxuICBcIlNDT1RUU0JVUkdcIlxuICBcIlNDT1RUU1ZJTExFXCJcbiAgXCJTRUEgQ0xJRkZcIlxuICBcIlNFQUZPUkRcIlxuICBcIlNFTEtJUktcIlxuICBcIlNFTkVDQSBGQUxMU1wiXG4gIFwiU2VuZWNhIEZhbGxzXCJcbiAgXCJTRU5FQ0EgRkFMTFMgXCJcbiAgXCJTSEFOREFLRU5cIlxuICBcIlNIQVJPTiBTUFJJTkdTXCJcbiAgXCJTaGFyb24gU3ByaW5nc1wiXG4gIFwiU2hlcmJ1cm5lXCJcbiAgXCJTSEVSQlVSTkVcIlxuICBcIlNIRVJNQU5cIlxuICBcIlNIRVJSSUxMXCJcbiAgXCJTSE9LQU5cIlxuICBcIlNIT1JUU1ZJTExFXCJcbiAgXCJTSFJVQiBPQUtcIlxuICBcIlNJRE5FWVwiXG4gIFwiU2lkbmV5XCJcbiAgXCJTSURORVkgQ0VOVEVSXCJcbiAgXCJTSUxWRVIgQkFZXCJcbiAgXCJTSUxWRVIgQ1JFRUtcIlxuICBcIlNpbHZlciBDcmVla1wiXG4gIFwiU0lMVkVSIENSRUVLIFwiXG4gIFwiU0lMVkVSIExBS0VcIlxuICBcIlNJTFZFUiBTUFJJTkdTXCJcbiAgXCJTSU5DTEFJUlZJTExFXCJcbiAgXCJTa2FuZWF0ZWxlc1wiXG4gIFwiU0tBTkVBVEVMRVNcIlxuICBcIlNrYW5lYXRlbGVzIEZhbGxzXCJcbiAgXCJTTEFURSBISUxMXCJcbiAgXCJTTEFURVJWSUxMRSBTUFJJTkdTXCJcbiAgXCJTTEVFUFkgSE9MTE9XXCJcbiAgXCJTTElOR0VSTEFORFNcIlxuICBcIlNsTFZFUiBDUkVFS1wiXG4gIFwiU0xPQVRTQlVSR1wiXG4gIFwiU2xvYXRzYnVyZ1wiXG4gIFwiU01JVEhCT1JPXCJcbiAgXCJTTUlUSFZJTExFIEZMQVRTXCJcbiAgXCJTTyBHTEVOUyBGQUxMU1wiXG4gIFwiU28uIEZhbGxzYnVyZ1wiXG4gIFwiU09EVVNcIlxuICBcIlNPRFVTIFBPSU5UXCJcbiAgXCJTT0RVUyBQT0lOVCBcIlxuICBcIlNvbHZheVwiXG4gIFwiU09NRVJTXCJcbiAgXCJTb255ZWFcIlxuICBcIlNPTllFQVwiXG4gIFwiU09VVEggQ0FJUk9cIlxuICBcIlNvdXRoIENvbHRvblwiXG4gIFwiU09VVEggREFZVE9OXCJcbiAgXCJTb3V0aCBGYWxsc2J1cmdcIlxuICBcIlNPVVRIIEZBTExTQlVSR1wiXG4gIFwiU291dGggRmFsbHNidXJnIFwiXG4gIFwiU09VVEggRkFSTUlOR0RBTEVcIlxuICBcIlNPVVRIIEdMRU5TIEZBTExTXCJcbiAgXCJTT1VUSCBIRU1QU1RFQURcIlxuICBcIlNvdXRoIEtvcnRyaWdodFwiXG4gIFwiU09VVEggT1RTRUxJQ1wiXG4gIFwiU09VVEggU0FMRU1cIlxuICBcIlNQQVJLSUxMXCJcbiAgXCJTUEVDVUxBVE9SXCJcbiAgXCJTUEVOQ0VSXCJcbiAgXCJTcGVuY2VyXCJcbiAgXCJTUEVOQ0VSUE9SVFwiXG4gIFwiU1BSQUtFUlNcIlxuICBcIlNQUklORyBWQUxMRVlcIlxuICBcIlNQUklOR1dBVEVSXCJcbiAgXCJzc3Nzc1wiXG4gIFwiU1QgSFVCRVJUU1wiXG4gIFwiU1QgUkVHSVMgRkFMTFNcIlxuICBcIlNULiBCT05BVkVOVFVSRVwiXG4gIFwiU1QuIEpPSE5TVklMTEVcIlxuICBcIlNULiBSRUdJUyBGQUxMU1wiXG4gIFwiU1RBQVRTQlVSR1wiXG4gIFwiU3RhZmZvcmRcIlxuICBcIlNUQUZGT1JEXCJcbiAgXCJTVEFNRk9SRFwiXG4gIFwiU3RhbWZvcmRcIlxuICBcIlNUQU5GT1JEVklMTEVcIlxuICBcIlNUQU5MRVlcIlxuICBcIlN0YXIgTGFrZVwiXG4gIFwiU1RFQU1CVVJHXCJcbiAgXCJTVEVMTEEgTklBR0FSQVwiXG4gIFwiU1RFUEhFTlRPV05cIlxuICBcIlNURVJMSU5HXCJcbiAgXCJTVEVSTElORyBGT1JFU1RcIlxuICBcIlNURVdBUlQgTUFOT1JcIlxuICBcIlNUSUxMV0FURVJcIlxuICBcIlNUSVRUVklMTEVcIlxuICBcIlNUT05FIFJJREdFXCJcbiAgXCJTVE9OWSBDUkVFS1wiXG4gIFwiU1RPTlkgUE9JTlRcIlxuICBcIlNUT1JNVklMTEVcIlxuICBcIlNUT1dcIlxuICBcIlNUUllLRVJTVklMTEVcIlxuICBcIlNVRkZFUk5cIlxuICBcIlNVR0FSIExPQUZcIlxuICBcIlNVTU1JVFwiXG4gIFwiU3VtbWl0dmlsbGVcIlxuICBcIlN3YWluXCJcbiAgXCJTd2FuIExha2VcIlxuICBcIlNZTFZBTiBCRUFDSFwiXG4gIFwiU1lPU1NFVFwiXG4gIFwiU3lyYWN1c2VcIlxuICBcIlNZUkFDVVNFXCJcbiAgXCJzeXJhY3VzZVwiXG4gIFwiVEFCRVJHXCJcbiAgXCJUQUxMTUFOXCJcbiAgXCJUQU5ORVJTVklMTEVcIlxuICBcIlRBUFBBTlwiXG4gIFwiVEFSUllUT1dOXCJcbiAgXCJUQVJSWVRPV04gXCJcbiAgXCJUSEVOREFSQVwiXG4gIFwiVEhFUkVTQVwiXG4gIFwiVEhJRUxMU1wiXG4gIFwiVGhvbXBzb252aWxsZVwiXG4gIFwiVEhPUk5XT09EXCJcbiAgXCJUSFJPVUdIT1VUXCJcbiAgXCJUSFJPVUdIT1VUIFRPTVBLSU5TXCJcbiAgXCJUSUNPTkRFUk9HQVwiXG4gIFwiVElMTFNPTlwiXG4gIFwiVElPR0EgQ0VOVEVSXCJcbiAgXCJUSVZPTElcIlxuICBcIlRPTUtJTlMgQ09WRVwiXG4gIFwiVE9NUEtJTlNcIlxuICBcIlRPTVBLSU5TIENPVU5UWVwiXG4gIFwiVFJPVVBTQlVSR1wiXG4gIFwiVFJPVVQgQ1JFRUtcIlxuICBcIlRST1lcIlxuICBcIlRyb3lcIlxuICBcIlRSVU1BTlNCVVJHXCJcbiAgXCJUUlVYVE9OXCJcbiAgXCJUVUNLQUhPRVwiXG4gIFwiVHVsbHlcIlxuICBcIlRVTExZXCJcbiAgXCJUVVBQRVIgTEFLRVwiXG4gIFwiVHVwcGVyIExha2VcIlxuICBcIlRVUklOXCJcbiAgXCJUVVhFRE9cIlxuICBcIlRVWEVETyBQQVJLXCJcbiAgXCJUWVJPTkVcIlxuICBcIlVMU1RFUiBQQVJLXCJcbiAgXCJVTkFESUxMQVwiXG4gIFwiVW5hZGlsbGFcIlxuICBcIlVOSU9OIFNQUklOR1NcIlxuICBcIlVOSU9OREFMRVwiXG4gIFwiVU5JT05WSUxMRVwiXG4gIFwiVVBQRVIgSkFZXCJcbiAgXCJVUFBFUiBOWUFDS1wiXG4gIFwiVVRJQ0FcIlxuICBcIlV0aWNhXCJcbiAgXCJVVElDQSBcIlxuICBcIlZBSUxTIEdBVEVcIlxuICBcIlZBTEFUSUVcIlxuICBcIlZBTEhBTExBXCJcbiAgXCJWQUxMRVkgQ09UVEFHRVwiXG4gIFwiVmFsbGV5IENvdHRhZ2VcIlxuICBcIlZhbGxleSBDb3R0YWdlIFwiXG4gIFwiVkFMTEVZIFNUUkVBTVwiXG4gIFwiVkFOIEVUVEVOXCJcbiAgXCJWQU4gSE9STkVTVklMTEVcIlxuICBcIlZBUllTQlVSR1wiXG4gIFwiVkVSQkFOS1wiXG4gIFwiVmVyYmFua1wiXG4gIFwiVkVSTU9OVFZJTExFXCJcbiAgXCJWRVJOT05cIlxuICBcIlZFUk9OQVwiXG4gIFwiVkVST05BIEJFQUNIXCJcbiAgXCJWRVJQTEFOQ0tcIlxuICBcIlZFU1RBTFwiXG4gIFwiVmVzdGFsXCJcbiAgXCJWSUNUT1JcIlxuICBcIlZJQ1RPUiBcIlxuICBcIlZJQ1RPUllcIlxuICBcIlZJU1RBXCJcbiAgXCJWT09SSEVFU1ZJTExFXCJcbiAgXCJXLiBIRU5SSUVUVEFcIlxuICBcIldBQ0NBQlVDXCJcbiAgXCJXYWRkaW5ndG9uXCJcbiAgXCJXYWRkaW5ndG9uIFwiXG4gIFwiV0FESEFNU1wiXG4gIFwiV0FEU1dPUlRIIFwiXG4gIFwiV0FMREVOXCJcbiAgXCJXQUxMS0lMTFwiXG4gIFwiV2FsbGtpbGxcIlxuICBcIldBTFRPTlwiXG4gIFwiV2FsdG9uXCJcbiAgXCJXQUxXT1JUSFwiXG4gIFwiV0FNUFNWSUxMRVwiXG4gIFwiV2FuYWtlbmFcIlxuICBcIldBTlRBR0hcIlxuICBcIldBTlRBR0ggXCJcbiAgXCJXQVBQSU5HRVJcIlxuICBcIldBUFBJTkdFUiBGQUxMU1wiXG4gIFwiV0FQUElOR0VSU1wiXG4gIFwiV0FQUElOR0VSUyBGQUxMU1wiXG4gIFwiV0FQUElOR0VSUyBGQUxMU0EgXCJcbiAgXCJXQVBQSU5JR0VSUyBGQUxMU1wiXG4gIFwiV0FQUFBJTkdFUlMgRkFMTFNcIlxuICBcIldhcm5lcnNcIlxuICBcIldhcm5lcnZpbGxlXCJcbiAgXCJXQVJSRU5TQlVSR1wiXG4gIFwiV0FSU0FXXCJcbiAgXCJXQVJXSUNLXCJcbiAgXCJXQVNISU5HVE9OIE1JTExcIlxuICBcIldBU0hJTkdUT04gTUlMTFNcIlxuICBcIldBU0hJTkdUT04gTUlMTFMsIE5ZXCJcbiAgXCJXQVNISU5HVE9OVklMTEVcIlxuICBcIldBU0hJTkdUT05WSUxMRSBcIlxuICBcIldBU1NBSUNcIlxuICBcIldBVEVSRk9SRFwiXG4gIFwiV0FURVJMT09cIlxuICBcIldBVEVSTE9PICAgICBcIlxuICBcIldBVEVSTE9PLFwiXG4gIFwiV0FURVJQT1JUXCJcbiAgXCJXQVRFUlRPV05cIlxuICBcIldhdGVydG93blwiXG4gIFwiV0FURVJWSUxMRVwiXG4gIFwiV0FURVJWTElFVFwiXG4gIFwiV0FUS0lOUyBHTEVOXCJcbiAgXCJXQVRSTE9PXCJcbiAgXCJXQVZFUkxZXCJcbiAgXCJXQVdBUlNJTkdcIlxuICBcIldBWUxBTkRcIlxuICBcIldFQlNURVJcIlxuICBcIldFRURTUE9SVFwiXG4gIFwiV0VMTEVTTEVZIElTTC5cIlxuICBcIldFTExFU0xFWSBJU0xBTkRcIlxuICBcIldFTExTXCJcbiAgXCJXRUxMU0JVUkdcIlxuICBcIldlbGxzdmlsbGVcIlxuICBcIldFTExTVklMTEVcIlxuICBcIldFU0xFWSBISUxMU1wiXG4gIFwiV0VTVCAgSEVNUFNURUFEXCJcbiAgXCJXRVNUICBIRU5SSUVUVEFcIlxuICBcIldFU1QgQ0FSVEhBR0VcIlxuICBcIldlc3QgQ2hhenlcIlxuICBcIldlc3QgQ2xhcmtzdmlsbGVcIlxuICBcIldFU1QgQ09YU0FDS0lFXCJcbiAgXCJXZXN0IENveHNhY2tpZVwiXG4gIFwiV0VTVCBFQVRPTlwiXG4gIFwiV0VTVCBFRE1FU1RPTlwiXG4gIFwiV0VTVCBIQVJSSVNPTlwiXG4gIFwiV0VTVCBIQVZFUlNUUkFXXCJcbiAgXCJXRVNUIEhFTVBTVEVBRFwiXG4gIFwiV0VTVCBIRU5SSUVUVEFcIlxuICBcIldFU1QgSFVSTEVZXCJcbiAgXCJXRVNUIExFQkFOT05cIlxuICBcIldFU1QgTEVZREVOXCJcbiAgXCJXRVNUIE1PTlJPRVwiXG4gIFwiV0VTVCBOWUFDS1wiXG4gIFwiV0VTVCBPTkVPTlRBXCJcbiAgXCJXRVNUIFBBUktcIlxuICBcIldFU1QgU0FORCBMQUtFXCJcbiAgXCJXRVNUIFNIT0tBTlwiXG4gIFwiV0VTVCBWQUxMRVlcIlxuICBcIldFU1QgV0lORklFTERcIlxuICBcIldFU1RCUk9PS1ZJTExFXCJcbiAgXCJXRVNUQlVSWVwiXG4gIFwiV0VTVEVSTlZJTExFXCJcbiAgXCJXRVNURklFTERcIlxuICBcIldFU1RGSUVMRCBcIlxuICBcIldFU1RLSUxMXCJcbiAgXCJXRVNUTU9SRUxBTkRcIlxuICBcIldFU1RPTlMgTUlMTFNcIlxuICBcIldFU1RQT1JUXCJcbiAgXCJXRVNUVE9XTlwiXG4gIFwiV2hpdGUgTGFrZVwiXG4gIFwiV2hpdGUgTGFrZSBcIlxuICBcIldISVRFIFBMQUlOU1wiXG4gIFwiV2hpdGUgU3VscGh1ciBTcHJpbmdzXCJcbiAgXCJXSElURUhBTExcIlxuICBcIldISVRFU0JPUk9cIlxuICBcIldoaXRlc3ZpbGxlXCJcbiAgXCJXSElUTkVZIFBPSU5UXCJcbiAgXCJXSUxMQVJEXCJcbiAgXCJXSUxMSUFNU09OXCJcbiAgXCJXSUxMSUFNU09OIFwiXG4gIFwiV0lMTElBTVNUT1dOXCJcbiAgXCJXSUxMSVNUT04gUEFSS1wiXG4gIFwiV0lMTElTVE9OIFBLXCJcbiAgXCJXSUxMU0JPUk9cIlxuICBcIldJTExTRVlWSUxMRVwiXG4gIFwiV0lMTUlOR1RPTlwiXG4gIFwiV0lMTUlOR1RPTiBcIlxuICBcIldJTFNPTlwiXG4gIFwiV0lMVE9OXCJcbiAgXCJXSU5ESEFNXCJcbiAgXCJXaW5kaGFtXCJcbiAgXCJXSU5EU09SXCJcbiAgXCJXaW5kc29yXCJcbiAgXCJXSU5HREFMRVwiXG4gIFwiV0lOR0RBTEUsIE5ZXCJcbiAgXCJXaW50aHJvcFwiXG4gIFwiV09MQ09UVFwiXG4gIFwiV29vZGJvdXJuZVwiXG4gIFwiV29vZGJvdXJuZSBcIlxuICBcIldPT0RCVVJZXCJcbiAgXCJXT09ER0FURVwiXG4gIFwiV09PREhVTExcIlxuICBcIldPT0RNRVJFXCJcbiAgXCJXb29kcmlkZ2VcIlxuICBcIldPT0RSSURHRVwiXG4gIFwiV09PRFNUT0NLXCJcbiAgXCJXT09EVklMTEVcIlxuICBcIldPUkNFU1RFUlwiXG4gIFwiV3VydHNib3JvXCJcbiAgXCJXeW5hbnRza2lsbFwiXG4gIFwiV1lOQU5UU0tJTExcIlxuICBcIldZT01JTkdcIlxuICBcIlhYWFhYXCJcbiAgXCJZT05LRVJTXCJcbiAgXCJZT1JLU0hJUkVcIlxuICBcIllPUktUT1dOXCJcbiAgXCJZT1JLVE9XTiBIRUlHSFRTXCJcbiAgXCJZT1JLVklMTEVcIlxuICBcIllPVU5HU1RPV05cIlxuICBcIllvdW5nc3ZpbGxlXCJcbiAgXCJZT1VOU1RPV05cIlxuICBcIll1bGFuXCJcbl1cbiIsIm1vZHVsZS5leHBvcnRzID0gW1xuICAnQUxCQU5ZJ1xuICAnQUxMRUdBTlknXG4gICdCUk9PTUUnXG4gICdDQVRUQVJBVUdVUydcbiAgJ0NBWVVHQSdcbiAgJ0NIQVVUQVVRVUEnXG4gICdDSEVNVU5HJ1xuICAnQ0hFTkFOR08nXG4gICdDTElOVE9OJ1xuICAnQ09MVU1CSUEnXG4gICdDT1JUTEFORCdcbiAgJ0RFTEFXQVJFJ1xuICAnRFVUQ0hFU1MnXG4gICdFU1NFWCdcbiAgJ0ZSQU5LTElOJ1xuICAnRlVMVE9OJ1xuICAnR0VORVNFRSdcbiAgJ0dSRUVORSdcbiAgJ0hBTUlMVE9OJ1xuICAnSEVSS0lNRVInXG4gICdKRUZGRVJTT04nXG4gICdMRVdJUydcbiAgJ0xJVklOR1NUT04nXG4gICdNQURJU09OJ1xuICAnTU9OUk9FJ1xuICAnTU9OVEdPTUVSWSdcbiAgJ05BU1NBVSdcbiAgJ05JQUdBUkEnXG4gICdPTkVJREEnXG4gICdPTk9OREFHQSdcbiAgJ09OVEFSSU8nXG4gICdPUkFOR0UnXG4gICdPUkxFQU5TJ1xuICAnT1NXRUdPJ1xuICAnT1RTRUdPJ1xuICAnUFVUTkFNJ1xuICAnUkVOU1NFTEFFUidcbiAgJ1JPQ0tMQU5EJ1xuICAnU0FSQVRPR0EnXG4gICdTQ0hFTkVDVEFEWSdcbiAgJ1NDSE9IQVJJRSdcbiAgJ1NDSFVZTEVSJ1xuICAnU0VORUNBJ1xuICAnU1QgTEFXUkVOQ0UnXG4gICdTVEVVQkVOJ1xuICAnU1VMTElWQU4nXG4gICdUSU9HQSdcbiAgJ1RPTVBLSU5TJ1xuICAnVUxTVEVSJ1xuICAnV0FSUkVOJ1xuICAnV0FTSElOR1RPTidcbiAgJ1dBWU5FJ1xuICAnV0VTVENIRVNURVInXG4gICdXWU9NSU5HJ1xuICAnWUFURVMnXG5dXG4iLCJtb2R1bGUuZXhwb3J0cyA9IFtcbiAgJzAnXG4gICcxMDQ1NSdcbiAgJzEwNDU1MjEwNidcbiAgJzEwNDczJ1xuICAnMTA0NzQnXG4gICcxMDUwMSdcbiAgJzEwNTAyJ1xuICAnMTA1MDMnXG4gICcxMDUwNCdcbiAgJzEwNTA1J1xuICAnMTA1MDYnXG4gICcxMDUwNydcbiAgJzEwNTA5J1xuICAnMTA1MTAnXG4gICcxMDUxMDkyNDUnXG4gICcxMDUxMSdcbiAgJzEwNTEyJ1xuICAnMTA1MTQnXG4gICcxMDUxNidcbiAgJzEwNTE3J1xuICAnMTA1MTgnXG4gICcxMDUxOSdcbiAgJzEwNTIwJ1xuICAnMTA1MjAzMDU1J1xuICAnMTA1MjInXG4gICcxMDUyMydcbiAgJzEwNTI0J1xuICAnMTA1MjcnXG4gICcxMDUyOCdcbiAgJzEwNTMwJ1xuICAnMTA1MzInXG4gICcxMDUzMjEyMTcnXG4gICcxMDUzMydcbiAgJzEwNTM1J1xuICAnMTA1MzYnXG4gICcxMDUzOCdcbiAgJzEwNTQwJ1xuICAnMTA1NDEnXG4gICcxMDU0MydcbiAgJzEwNTQ2J1xuICAnMTA1NDcnXG4gICcxMDU0OCdcbiAgJzEwNTQ5J1xuICAnMTA1NTAnXG4gICcxMDU1MSdcbiAgJzEwNTUyJ1xuICAnMTA1NTMnXG4gICcxMDU2MCdcbiAgJzEwNTYyJ1xuICAnMTA1NjYnXG4gICcxMDU2NydcbiAgJzEwNTcwJ1xuICAnMTA1NzMnXG4gICcxMDU3MzM0MTQnXG4gICcxMDU3NidcbiAgJzEwNTc3J1xuICAnMTA1NzgnXG4gICcxMDU3OSdcbiAgJzEwNTgwJ1xuICAnMTA1ODMnXG4gICcxMDU4OCdcbiAgJzEwNTg5J1xuICAnMTA1OTAnXG4gICcxMDU5MSdcbiAgJzEwNTk0J1xuICAnMTA1OTUnXG4gICcxMDU5NidcbiAgJzEwNTk3J1xuICAnMTA1OTgnXG4gICcxMDYwMSdcbiAgJzEwNjAzJ1xuICAnMTA2MDQnXG4gICcxMDYwNSdcbiAgJzEwNjA2J1xuICAnMTA2MDcnXG4gICcxMDcwMSdcbiAgJzEwNzAxNTU2OSdcbiAgJzEwNzAyJ1xuICAnMTA3MDMnXG4gICcxMDcwNCdcbiAgJzEwNzA1J1xuICAnMTA3MDYnXG4gICcxMDcwNydcbiAgJzEwNzA4J1xuICAnMTA3MDknXG4gICcxMDcxMCdcbiAgJzEwODAxJ1xuICAnMTA4MDEzNDE2J1xuICAnMTA4MDInXG4gICcxMDgwMydcbiAgJzEwODAzMjcxMCdcbiAgJzEwODA0J1xuICAnMTA4MDUnXG4gICcxMDkwMSdcbiAgJzEwOTEwJ1xuICAnMTA5MTEnXG4gICcxMDkxMidcbiAgJzEwOTEzJ1xuICAnMTA5MTQnXG4gICcxMDkxNSdcbiAgJzEwOTE2J1xuICAnMTA5MTcnXG4gICcxMDkxOCdcbiAgJzEwOTE5J1xuICAnMTA5MjAnXG4gICcxMDkyMSdcbiAgJzEwOTIxMDc1NydcbiAgJzEwOTIyJ1xuICAnMTA5MjMnXG4gICcxMDkyNCdcbiAgJzEwOTI1J1xuICAnMTA5MjYnXG4gICcxMDkyNydcbiAgJzEwOTI4J1xuICAnMTA5MzAnXG4gICcxMDkzMSdcbiAgJzEwOTQwJ1xuICAnMTA5NDEnXG4gICcxMDk0OSdcbiAgJzEwOTUwJ1xuICAnMTA5NTInXG4gICcxMDk1MydcbiAgJzEwOTU0J1xuICAnMTA5NTYnXG4gICcxMDk1OCdcbiAgJzEwOTYwJ1xuICAnMTA5NjInXG4gICcxMDk2MydcbiAgJzEwOTY0J1xuICAnMTA5NjUnXG4gICcxMDk2OCdcbiAgJzEwOTY5J1xuICAnMTA5NzAnXG4gICcxMDk3MydcbiAgJzEwOTc0J1xuICAnMTA5NzYnXG4gICcxMDk3NydcbiAgJzEwOTc5J1xuICAnMTA5ODAnXG4gICcxMDk4MSdcbiAgJzEwOTgyJ1xuICAnMTA5ODMnXG4gICcxMDk4NCdcbiAgJzEwOTg2J1xuICAnMTA5ODcnXG4gICcxMDk4OCdcbiAgJzEwOTg5J1xuICAnMTA5OTAnXG4gICcxMDk5MidcbiAgJzEwOTkzJ1xuICAnMTA5OTQnXG4gICcxMDk5OCdcbiAgJzExMDAxJ1xuICAnMTEwMDEyNzA1J1xuICAnMTEwMDInXG4gICcxMTAwMydcbiAgJzExMDAzMjYyOSdcbiAgJzExMDEwJ1xuICAnMTEwMTAxMjMwJ1xuICAnMTEwMTAyNTMwJ1xuICAnMTEwMTAyODQ5J1xuICAnMTEwMTAzNjI3J1xuICAnMTEwMTAzNjI4J1xuICAnMTEwMjAnXG4gICcxMTAyMSdcbiAgJzExMDIxMTI0MydcbiAgJzExMDIxMTI0NidcbiAgJzExMDIxMzI1NCdcbiAgJzExMDIxNDMwMydcbiAgJzExMDIyJ1xuICAnMTEwMjMnXG4gICcxMTAyNCdcbiAgJzExMDMwJ1xuICAnMTEwMzAxOTQ2J1xuICAnMTEwMzAzMDE3J1xuICAnMTEwNDAnXG4gICcxMTA0MDE2NjQnXG4gICcxMTA0MDI2MDMnXG4gICcxMTA0MDI2MDQnXG4gICcxMTA0MDQ3MjYnXG4gICcxMTA0MDUyMzYnXG4gICcxMTA0MidcbiAgJzExMDQyMTAxMidcbiAgJzExMDQyMTAzNCdcbiAgJzExMDUwJ1xuICAnMTEwNTAyMjIyJ1xuICAnMTEwNTAyNzAzJ1xuICAnMTEwNTAyOTEwJ1xuICAnMTEwNTA0MjExJ1xuICAnMTEwODEnXG4gICcxMTA5NidcbiAgJzExMDk2MTIxNydcbiAgJzExMDk2MTM0OCdcbiAgJzExMDk2MTgwOSdcbiAgJzExMTExJ1xuICAnMTExNTAnXG4gICcxMTE1OCdcbiAgJzExMjAxJ1xuICAnMTEzNTAnXG4gICcxMTM1NSdcbiAgJzExMzY1J1xuICAnMTEzNzInXG4gICcxMTQyMidcbiAgJzExNTAxJ1xuICAnMTE1MDExNzAyJ1xuICAnMTE1MDE0MDIxJ1xuICAnMTE1MDcnXG4gICcxMTUwNzE1OTknXG4gICcxMTUwNzE5MTcnXG4gICcxMTUwOSdcbiAgJzExNTEwJ1xuICAnMTE1MTAyNDI5J1xuICAnMTE1MTAyNDUzJ1xuICAnMTE1MTAzMTExJ1xuICAnMTE1MTAzMjMwJ1xuICAnMTE1MTA0MjQxJ1xuICAnMTE1MTA0NDI3J1xuICAnMTE1MTQnXG4gICcxMTUxNDE5MDcnXG4gICcxMTUxNidcbiAgJzExNTE3J1xuICAnMTE1MTgnXG4gICcxMTUxODE0MTQnXG4gICcxMTUyMCdcbiAgJzExNTIwMzcxMCdcbiAgJzExNTIwMzgyNSdcbiAgJzExNTIwNDI0MidcbiAgJzExNTIwNDcwMidcbiAgJzExNTIwNTEwMydcbiAgJzExNTIwNjEyOSdcbiAgJzExNTIwNjEzMSdcbiAgJzExNTMwJ1xuICAnMTE1MzAwNzAxJ1xuICAnMTE1MzAyOTA5J1xuICAnMTE1MzAzNDY3J1xuICAnMTE1MzAzODI3J1xuICAnMTE1MzA0NzA4J1xuICAnMTE1MzA0NzYwJ1xuICAnMTE1MzA0ODAxJ1xuICAnMTE1MzA1MzE1J1xuICAnMTE1MzA1NzI5J1xuICAnMTE1MzA2NTUzJ1xuICAnMTE1NDInXG4gICcxMTU0MjI1NDAnXG4gICcxMTU0MjI3MDMnXG4gICcxMTU0MjI3MDQnXG4gICcxMTU0MjM3MDAnXG4gICcxMTU0MjM3MzUnXG4gICcxMTU0NSdcbiAgJzExNTQ1MTYwMidcbiAgJzExNTQ1MTkwNidcbiAgJzExNTQ3J1xuICAnMTE1NDgnXG4gICcxMTU0ODEwMzMnXG4gICcxMTU0ODEwOTgnXG4gICcxMTU1MCdcbiAgJzExNTUwMTQxNydcbiAgJzExNTUwMTQzOCdcbiAgJzExNTUwMTc1MSdcbiAgJzExNTUwMzgxMSdcbiAgJzExNTUwMzkwNCdcbiAgJzExNTUwMzkwOCdcbiAgJzExNTUwNDAxOSdcbiAgJzExNTUwNDM2NCdcbiAgJzExNTUwNDU0NCdcbiAgJzExNTUwNTYxMydcbiAgJzExNTUyJ1xuICAnMTE1NTIxMzMwJ1xuICAnMTE1NTIxNTQxJ1xuICAnMTE1NTIyMTI3J1xuICAnMTE1NTIyMTQ2J1xuICAnMTE1NTIzNDI1J1xuICAnMTE1NTMnXG4gICcxMTU1MzEwMTAnXG4gICcxMTU1MzE2MzcnXG4gICcxMTU1MzE5MTknXG4gICcxMTU1MzI1MDcnXG4gICcxMTU1MzI1MDknXG4gICcxMTU1MzI2MzQnXG4gICcxMTU1NCdcbiAgJzExNTU0MjAyNydcbiAgJzExNTU0MjAyOSdcbiAgJzExNTU0MjM1MCdcbiAgJzExNTU0MjkzNydcbiAgJzExNTU0NDExNSdcbiAgJzExNTU0NDEyMSdcbiAgJzExNTU2J1xuICAnMTE1NTcnXG4gICcxMTU1NzE1NTUnXG4gICcxMTU1NzIwMTYnXG4gICcxMTU1OCdcbiAgJzExNTU4MTQzOSdcbiAgJzExNTU4MTYyNydcbiAgJzExNTU4MjIxNSdcbiAgJzExNTU5J1xuICAnMTE1NTk4J1xuICAnMTE1NjAnXG4gICcxMTU2MDIxMjQnXG4gICcxMTU2MSdcbiAgJzExNTYxMTIyMydcbiAgJzExNTYxMTIyNCdcbiAgJzExNTYxMTMwMidcbiAgJzExNTYxMTQyOCdcbiAgJzExNTYxMjAxOCdcbiAgJzExNTYxMzUwMSdcbiAgJzExNTYxMzUxMCdcbiAgJzExNTYzJ1xuICAnMTE1NjMxNzU1J1xuICAnMTE1NjMzMDI0J1xuICAnMTE1NjMzMjM0J1xuICAnMTE1NjMzMjQyJ1xuICAnMTE1NjMzNTcwJ1xuICAnMTE1NjUnXG4gICcxMTU2NTIwNDMnXG4gICcxMTU2NidcbiAgJzExNTY2MTAzNCdcbiAgJzExNTY2MTM0MidcbiAgJzExNTY2MTgzNSdcbiAgJzExNTY2MjcyOCdcbiAgJzExNTY2MzExMSdcbiAgJzExNTY2MzQwNydcbiAgJzExNTY2MzQxNSdcbiAgJzExNTY2MzQzMSdcbiAgJzExNTY2Mzc0NCdcbiAgJzExNTY2NDUzMCdcbiAgJzExNTY2NDUzOCdcbiAgJzExNTY4J1xuICAnMTE1NjgwMjQ5J1xuICAnMTE1NjknXG4gICcxMTU2OTIwMjEnXG4gICcxMTU3MCdcbiAgJzExNTcwNDgwMSdcbiAgJzExNTcyJ1xuICAnMTE1NzIxNDA5J1xuICAnMTE1NzIyMTMwJ1xuICAnMTE1NzUnXG4gICcxMTU3NTE3NTcnXG4gICcxMTU3NTIxMDYnXG4gICcxMTU3NidcbiAgJzExNTc2Mzg0J1xuICAnMTE1NzcnXG4gICcxMTU3NzIzMjknXG4gICcxMTU3OSdcbiAgJzExNTgwJ1xuICAnMTE1ODAxMTU1J1xuICAnMTE1ODAxOTM4J1xuICAnMTE1ODA1MTI1J1xuICAnMTE1ODA1ODEwJ1xuICAnMTE1ODA1OTI1J1xuICAnMTE1ODA1OTUyJ1xuICAnMTE1ODA2MTE1J1xuICAnMTE1ODEnXG4gICcxMTU4MTEyMjgnXG4gICcxMTU4MTE5MDcnXG4gICcxMTU4MTI1MjMnXG4gICcxMTU4MTMzNTAnXG4gICcxMTU4MidcbiAgJzExNTkwJ1xuICAnMTE1OTAzMzMxJ1xuICAnMTE1OTAzOTI0J1xuICAnMTE1OTA0NDA4J1xuICAnMTE1OTA0NTA2J1xuICAnMTE1OTA1MjU2J1xuICAnMTE1OTYnXG4gICcxMTU5NjIyMDQnXG4gICcxMTU5OCdcbiAgJzExNTk4MTY0NSdcbiAgJzExNTk5J1xuICAnMTE3MDEnXG4gICcxMTcwOSdcbiAgJzExNzA5MTYxNidcbiAgJzExNzEwJ1xuICAnMTE3MTAxNjAyJ1xuICAnMTE3MTAxODE2J1xuICAnMTE3MTAxODMzJ1xuICAnMTE3MTAzNTMxJ1xuICAnMTE3MTQnXG4gICcxMTcxNDI3MDInXG4gICcxMTcxNDMwMDgnXG4gICcxMTcxNDU3OTgnXG4gICcxMTcyNDAxMDAnXG4gICcxMTczMSdcbiAgJzExNzMyJ1xuICAnMTE3MzIxMDAzJ1xuICAnMTE3MzUnXG4gICcxMTczNTI2MTgnXG4gICcxMTczNTI2MTknXG4gICcxMTczNTQ0NTAnXG4gICcxMTc0NydcbiAgJzExNzUzJ1xuICAnMTE3NTMxMzM4J1xuICAnMTE3NTYnXG4gICcxMTc1NjUzMjUnXG4gICcxMTc1NydcbiAgJzExNzU4J1xuICAnMTE3NTgxMjEyJ1xuICAnMTE3NTg1MzQ2J1xuICAnMTE3NTg2MDE5J1xuICAnMTE3NTg2MjE1J1xuICAnMTE3NTg2NjI0J1xuICAnMTE3NjEnXG4gICcxMTc2MidcbiAgJzExNzYyMjcxMSdcbiAgJzExNzYyMjcxMidcbiAgJzExNzYyMjkwNydcbiAgJzExNzYyMzgwNCdcbiAgJzExNzY1J1xuICAnMTE3NzEnXG4gICcxMTc3MTE1NTUnXG4gICcxMTc4MydcbiAgJzExNzgzMjgwMSdcbiAgJzExNzgzMzQyNydcbiAgJzExNzg3J1xuICAnMTE3OTEnXG4gICcxMTc5MTMxMTYnXG4gICcxMTc5MTM2MDgnXG4gICcxMTc5MTQ1MDcnXG4gICcxMTc5MTQ1MTknXG4gICcxMTc5MTQ1NDAnXG4gICcxMTc5MydcbiAgJzExNzkzMjIxMydcbiAgJzExNzkzMzcxNydcbiAgJzExNzkzMzk0OSdcbiAgJzExNzk3J1xuICAnMTE3OTcxMjEwJ1xuICAnMTE4MDEnXG4gICcxMTgwMTMwMDYnXG4gICcxMTgwMTMwMzcnXG4gICcxMTgwMTMwNTEnXG4gICcxMTgwMTMxMDMnXG4gICcxMTgwMTM1MjgnXG4gICcxMTgwMTQwMTEnXG4gICcxMTgwMTQyMzYnXG4gICcxMTgwMTQyNjcnXG4gICcxMTgwMydcbiAgJzExODAzMTAwNidcbiAgJzExODAzMTUwNydcbiAgJzExODAzMzMyMidcbiAgJzExODAzNDk1MydcbiAgJzExODA0J1xuICAnMTE4MDQxMjQwJ1xuICAnMTIwMDgnXG4gICcxMjAwOSdcbiAgJzEyMDEwJ1xuICAnMTIwMTUnXG4gICcxMjAxOCdcbiAgJzEyMDE5J1xuICAnMTIwMjAnXG4gICcxMjAyMidcbiAgJzEyMDIzJ1xuICAnMTIwMjUnXG4gICcxMjAyNydcbiAgJzEyMDI5J1xuICAnMTIwMzEnXG4gICcxMjAzMidcbiAgJzEyMDMzJ1xuICAnMTIwMzUnXG4gICcxMjAzNydcbiAgJzEyMDQxJ1xuICAnMTIwNDInXG4gICcxMjA0MydcbiAgJzEyMDQ1J1xuICAnMTIwNDcnXG4gICcxMjA1MSdcbiAgJzEyMDUyJ1xuICAnMTIwNTMnXG4gICcxMjA1NCdcbiAgJzEyMDU2J1xuICAnMTIwNTcnXG4gICcxMjA1OCdcbiAgJzEyMDU5J1xuICAnMTIwNjAnXG4gICcxMjA2MSdcbiAgJzEyMDY1J1xuICAnMTIwNjYnXG4gICcxMjA2NydcbiAgJzEyMDY4J1xuICAnMTIwNzEnXG4gICcxMjA3MidcbiAgJzEyMDc0J1xuICAnMTIwNzUnXG4gICcxMjA3NidcbiAgJzEyMDc3J1xuICAnMTIwNzgnXG4gICcxMjA4MCdcbiAgJzEyMDgyJ1xuICAnMTIwODMnXG4gICcxMjA4NCdcbiAgJzEyMDg1J1xuICAnMTIwODYnXG4gICcxMjA4NydcbiAgJzEyMDg5J1xuICAnMTIwOTAnXG4gICcxMjA5MidcbiAgJzEyMDkzJ1xuICAnMTIwOTUnXG4gICcxMjEwNidcbiAgJzEyMTA4J1xuICAnMTIxMTAnXG4gICcxMjExNidcbiAgJzEyMTE3J1xuICAnMTIxMTgnXG4gICcxMjEyMidcbiAgJzEyMTIzJ1xuICAnMTIxMjQnXG4gICcxMjEyNSdcbiAgJzEyMTMwJ1xuICAnMTIxMzEnXG4gICcxMjEzMydcbiAgJzEyMTM0J1xuICAnMTIxMzYnXG4gICcxMjEzNydcbiAgJzEyMTM5J1xuICAnMTIxNDAnXG4gICcxMjE0MydcbiAgJzEyMTQ0J1xuICAnMTIxNDcnXG4gICcxMjE0OCdcbiAgJzEyMTQ5J1xuICAnMTIxNTAnXG4gICcxMjE1MSdcbiAgJzEyMTU0J1xuICAnMTIxNTUnXG4gICcxMjE1NydcbiAgJzEyMTU4J1xuICAnMTIxNTknXG4gICcxMjE2NCdcbiAgJzEyMTY2J1xuICAnMTIxNjcnXG4gICcxMjE2OCdcbiAgJzEyMTcwJ1xuICAnMTIxNzUnXG4gICcxMjE4MCdcbiAgJzEyMTgxJ1xuICAnMTIxODInXG4gICcxMjE4MydcbiAgJzEyMTg0J1xuICAnMTIxODYnXG4gICcxMjE4NydcbiAgJzEyMTg4J1xuICAnMTIxODknXG4gICcxMjE5MCdcbiAgJzEyMTkyJ1xuICAnMTIxOTUnXG4gICcxMjE5NidcbiAgJzEyMTk3J1xuICAnMTIxOTgnXG4gICcxMjIwMidcbiAgJzEyMjAyMTM5OCdcbiAgJzEyMjAyMTc0MidcbiAgJzEyMjAzJ1xuICAnMTIyMDQnXG4gICcxMjIwNSdcbiAgJzEyMjA1MTEwMSdcbiAgJzEyMjA1MTEyNCdcbiAgJzEyMjA1Mjc1MSdcbiAgJzEyMjA2J1xuICAnMTIyMDcnXG4gICcxMjIwOCdcbiAgJzEyMjA5J1xuICAnMTIyMTAnXG4gICcxMjIxMSdcbiAgJzEyMjExMDUwMCdcbiAgJzEyMjEyJ1xuICAnMTIyMjAnXG4gICcxMjIyMidcbiAgJzEyMjIzJ1xuICAnMTIyMjYnXG4gICcxMjI0MidcbiAgJzEyMjYnXG4gICcxMjMwIDcnXG4gICcxMjMwMidcbiAgJzEyMzAzJ1xuICAnMTIzMDQnXG4gICcxMjMwNSdcbiAgJzEyMzA2J1xuICAnMTIzMDcnXG4gICcxMjMwOCdcbiAgJzEyMzA5J1xuICAnMTIzNDUnXG4gICcxMjQwMDEnXG4gICcxMjQwMSdcbiAgJzEyNDA0J1xuICAnMTI0MDUnXG4gICcxMjQwNidcbiAgJzEyNDA3J1xuICAnMTI0MDknXG4gICcxMjQxMCdcbiAgJzEyNDEyJ1xuICAnMTI0MTMnXG4gICcxMjQxNCdcbiAgJzEyNDE4J1xuICAnMTI0MjInXG4gICcxMjQyMydcbiAgJzEyNDI0J1xuICAnMTI0MjcnXG4gICcxMjQyOCdcbiAgJzEyNDI5J1xuICAnMTI0MzAnXG4gICcxMjQzMSdcbiAgJzEyNDMyJ1xuICAnMTI0MzQnXG4gICcxMjQzNSdcbiAgJzEyNDM2J1xuICAnMTI0MzknXG4gICcxMjQ0MCdcbiAgJzEyNDQxJ1xuICAnMTI0NDInXG4gICcxMjQ0MydcbiAgJzEyNDQ0J1xuICAnMTI0NDYnXG4gICcxMjQ0OSdcbiAgJzEyNDUxJ1xuICAnMTI0NTMnXG4gICcxMjQ1NSdcbiAgJzEyNDU2J1xuICAnMTI0NTcnXG4gICcxMjQ1OCdcbiAgJzEyNDYwJ1xuICAnMTI0NjEnXG4gICcxMjQ2MydcbiAgJzEyNDY0J1xuICAnMTI0NjUnXG4gICcxMjQ2NidcbiAgJzEyNDY4J1xuICAnMTI0NzAnXG4gICcxMjQ3MidcbiAgJzEyNDczJ1xuICAnMTI0NzQnXG4gICcxMjQ3NSdcbiAgJzEyNDc3J1xuICAnMTI0ODAnXG4gICcxMjQ4MSdcbiAgJzEyNDgyJ1xuICAnMTI0ODQnXG4gICcxMjQ4NSdcbiAgJzEyNDg1MDU5MidcbiAgJzEyNDg2J1xuICAnMTI0ODcnXG4gICcxMjQ4OSdcbiAgJzEyNDkxJ1xuICAnMTI0OTInXG4gICcxMjQ5MydcbiAgJzEyNDk0J1xuICAnMTI0OTYnXG4gICcxMjQ5OCdcbiAgJzEyNTAxJ1xuICAnMTI1MDInXG4gICcxMjUwMydcbiAgJzEyNTA0J1xuICAnMTI1MDYnXG4gICcxMjUwNydcbiAgJzEyNTA4J1xuICAnMTI1MDgyNzM1J1xuICAnMTI1MTInXG4gICcxMjUxMydcbiAgJzEyNTE2J1xuICAnMTI1MTcnXG4gICcxMjUxOCdcbiAgJzEyNTIwJ1xuICAnMTI1MjEnXG4gICcxMjUyMidcbiAgJzEyNTIzJ1xuICAnMTI1MjQnXG4gICcxMjUyNSdcbiAgJzEyNTI2J1xuICAnMTI1MjcnXG4gICcxMjUyOCdcbiAgJzEyNTI5J1xuICAnMTI1MzEnXG4gICcxMjUzMydcbiAgJzEyNTMzNjI2NydcbiAgJzEyNTM0J1xuICAnMTI1MzgnXG4gICcxMjU0MCdcbiAgJzEyNTQyJ1xuICAnMTI1NDMnXG4gICcxMjU0NSdcbiAgJzEyNTQ1MDEyNydcbiAgJzEyNTQ2J1xuICAnMTI1NDcnXG4gICcxMjU0OCdcbiAgJzEyNTQ5J1xuICAnMTI1NTAnXG4gICcxMjU1MidcbiAgJzEyNTUzJ1xuICAnMTI1NjEnXG4gICcxMjU2MydcbiAgJzEyNTY0J1xuICAnMTI1NjUnXG4gICcxMjU2NidcbiAgJzEyNTY3J1xuICAnMTI1NjgnXG4gICcxMjU2OSdcbiAgJzEyNTcwJ1xuICAnMTI1NzEnXG4gICcxMjU3MidcbiAgJzEyNTc0J1xuICAnMTI1NzUnXG4gICcxMjU3NydcbiAgJzEyNTc4J1xuICAnMTI1ODAnXG4gICcxMjU4MSdcbiAgJzEyNTgyJ1xuICAnMTI1ODMnXG4gICcxMjU4NCdcbiAgJzEyNTg1J1xuICAnMTI1ODYnXG4gICcxMjU4OSdcbiAgJzEyNTkwJ1xuICAnMTI1OTAxOTE4J1xuICAnMTI1OTInXG4gICcxMjU5NCdcbiAgJzEyNjAxJ1xuICAnMTI2MDInXG4gICcxMjYwMydcbiAgJzEyNjA0J1xuICAnMTI3MDEnXG4gICcxMjcwMS0zMzEnXG4gICcxMjcwMidcbiAgJzEyNzE5J1xuICAnMTI3MjAnXG4gICcxMjcyMSdcbiAgJzEyNzIyJ1xuICAnMTI3MjMnXG4gICcxMjcyNSdcbiAgJzEyNzI2J1xuICAnMTI3MjknXG4gICcxMjczMidcbiAgJzEyNzMzJ1xuICAnMTI3MzQnXG4gICcxMjczNydcbiAgJzEyNzQwJ1xuICAnMTI3NDEnXG4gICcxMjc0MydcbiAgJzEyNzQ2J1xuICAnMTI3NDcnXG4gICcxMjc0OCdcbiAgJzEyNzQ5J1xuICAnMTI3NTAnXG4gICcxMjc1MSdcbiAgJzEyNzUyJ1xuICAnMTI3NTQnXG4gICcxMjc1OCdcbiAgJzEyNzU5J1xuICAnMTI3NjAnXG4gICcxMjc2MidcbiAgJzEyNzYzJ1xuICAnMTI3NjQnXG4gICcxMjc2NSdcbiAgJzEyNzY4J1xuICAnMTI3NzEnXG4gICcxMjc3NSdcbiAgJzEyNzc2J1xuICAnMTI3NzYtMDMwJ1xuICAnMTI3NzcnXG4gICcxMjc3OSdcbiAgJzEyNzgxJ1xuICAnMTI3ODMnXG4gICcxMjc4NCdcbiAgJzEyNzg1J1xuICAnMTI3ODYnXG4gICcxMjc4NydcbiAgJzEyNzg4J1xuICAnMTI3ODknXG4gICcxMjc5MCdcbiAgJzEyNzkxJ1xuICAnMTI3OTInXG4gICcxMjgwMSdcbiAgJzEyODAzJ1xuICAnMTI4MDQnXG4gICcxMjgwNDE3MDUnXG4gICcxMjgwOSdcbiAgJzEyODEyJ1xuICAnMTI4MTQnXG4gICcxMjgxNSdcbiAgJzEyODE2J1xuICAnMTI4MTcnXG4gICcxMjgxNy0wNDgnXG4gICcxMjgxOSdcbiAgJzEyODIwJ1xuICAnMTI4MjEnXG4gICcxMjgyMidcbiAgJzEyODI0J1xuICAnMTI4MjcnXG4gICcxMjgyOCdcbiAgJzEyODMxJ1xuICAnMTI4MzInXG4gICcxMjgzMydcbiAgJzEyODM0J1xuICAnMTI4MzUnXG4gICcxMjgzNidcbiAgJzEyODM4J1xuICAnMTI4MzknXG4gICcxMjg0MSdcbiAgJzEyODQyJ1xuICAnMTI4NDMnXG4gICcxMjg0NCdcbiAgJzEyODQ1J1xuICAnMTI4NDUtMzUwJ1xuICAnMTI4NDUtNTAwJ1xuICAnMTI4NDUtNjQyJ1xuICAnMTI4NDYnXG4gICcxMjg0NjAyMDAnXG4gICcxMjg0NydcbiAgJzEyODQ4J1xuICAnMTI4NDknXG4gICcxMjg1MCdcbiAgJzEyODUxJ1xuICAnMTI4NTInXG4gICcxMjg1MydcbiAgJzEyODUzLTk2MCdcbiAgJzEyODU1J1xuICAnMTI4NTYnXG4gICcxMjg1NydcbiAgJzEyODU5J1xuICAnMTI4NjAnXG4gICcxMjg2MSdcbiAgJzEyODY1J1xuICAnMTI4NjYnXG4gICcxMjg3MCdcbiAgJzEyODcxJ1xuICAnMTI4NzQnXG4gICcxMjg3OCdcbiAgJzEyODgzJ1xuICAnMTI4ODMxMTE5J1xuICAnMTI4ODUnXG4gICcxMjg4NydcbiAgJzEyODg5J1xuICAnMTI5MDEnXG4gICcxMjkwMydcbiAgJzEyOTEwJ1xuICAnMTI5MTEnXG4gICcxMjkxMidcbiAgJzEyOTEzJ1xuICAnMTI5MTYnXG4gICcxMjkxNydcbiAgJzEyOTE4J1xuICAnMTI5MTknXG4gICcxMjkxOTQ2MzgnXG4gICcxMjkyMCdcbiAgJzEyOTIxJ1xuICAnMTI5MjInXG4gICcxMjkyMydcbiAgJzEyOTI0J1xuICAnMTI5MjYnXG4gICcxMjkyNydcbiAgJzEyOTI4J1xuICAnMTI5MjknXG4gICcxMjkzMCdcbiAgJzEyOTMyJ1xuICAnMTI5MzQnXG4gICcxMjkzNSdcbiAgJzEyOTM2J1xuICAnMTI5MzcnXG4gICcxMjkzOSdcbiAgJzEyOTQxJ1xuICAnMTI5NDInXG4gICcxMjk0MydcbiAgJzEyOTQ0J1xuICAnMTI5NDUnXG4gICcxMjk0NidcbiAgJzEyOTUwJ1xuICAnMTI5NTInXG4gICcxMjk1MydcbiAgJzEyOTU1J1xuICAnMTI5NTYnXG4gICcxMjk1NydcbiAgJzEyOTU4J1xuICAnMTI5NTknXG4gICcxMjk2MCdcbiAgJzEyOTYxJ1xuICAnMTI5NjInXG4gICcxMjk2NidcbiAgJzEyOTY3J1xuICAnMTI5NjknXG4gICcxMjk3MCdcbiAgJzEyOTcyJ1xuICAnMTI5NzQnXG4gICcxMjk3NSdcbiAgJzEyOTc3J1xuICAnMTI5NzknXG4gICcxMjk4MCdcbiAgJzEyOTgxJ1xuICAnMTI5ODMnXG4gICcxMjk4NidcbiAgJzEyOTg3J1xuICAnMTI5ODknXG4gICcxMjk5MidcbiAgJzEyOTkyMjU3NydcbiAgJzEyOTkzJ1xuICAnMTI5OTYnXG4gICcxMjk5NydcbiAgJzEzMDIwJ1xuICAnMTMwMjEnXG4gICcxMzAyNidcbiAgJzEzMDI3J1xuICAnMTMwMjgnXG4gICcxMzAyOSdcbiAgJzEzMDMwJ1xuICAnMTMwMzEnXG4gICcxMzAzMidcbiAgJzEzMDMzJ1xuICAnMTMwMzQnXG4gICcxMzAzNSdcbiAgJzEzMDM2J1xuICAnMTMwMzcnXG4gICcxMzAzOSdcbiAgJzEzMDQwJ1xuICAnMTMwNDEnXG4gICcxMzA0MidcbiAgJzEzMDQ0J1xuICAnMTMwNDUnXG4gICcxMzA1MSdcbiAgJzEzMDUyJ1xuICAnMTMwNTMnXG4gICcxMzA1NCdcbiAgJzEzMDU3J1xuICAnMTMwNjAnXG4gICcxMzA2MSdcbiAgJzEzMDYzJ1xuICAnMTMwNjQnXG4gICcxMzA2NidcbiAgJzEzMDY4J1xuICAnMTMwNjknXG4gICcxMzA3MSdcbiAgJzEzMDcyJ1xuICAnMTMwNzMnXG4gICcxMzA3NCdcbiAgJzEzMDc2J1xuICAnMTMwNzcnXG4gICcxMzA3OCdcbiAgJzEzMDgwJ1xuICAnMTMwODEnXG4gICcxMzA4MidcbiAgJzEzMDgzJ1xuICAnMTMwODQnXG4gICcxMzA4NydcbiAgJzEzMDg4J1xuICAnMTMwOTAnXG4gICcxMzA5MidcbiAgJzEzMDkzJ1xuICAnMTMxMDEnXG4gICcxMzEwNCdcbiAgJzEzMTA4J1xuICAnMTMxMTAnXG4gICcxMzExMSdcbiAgJzEzMTEyJ1xuICAnMTMxMTMnXG4gICcxMzExNCdcbiAgJzEzMTE1J1xuICAnMTMxMTYnXG4gICcxMzExNydcbiAgJzEzMTE4J1xuICAnMTMxMTknXG4gICcxMzEyMCdcbiAgJzEzMTIxJ1xuICAnMTMxMjMnXG4gICcxMzEyNidcbiAgJzEzMTMxJ1xuICAnMTMxMzInXG4gICcxMzEzNSdcbiAgJzEzMTM1MjE3MCdcbiAgJzEzMTM2J1xuICAnMTMxMzgnXG4gICcxMzE0MCdcbiAgJzEzMTQxJ1xuICAnMTMxNDInXG4gICcxMzE0MydcbiAgJzEzMTQ0J1xuICAnMTMxNDUnXG4gICcxMzE0NydcbiAgJzEzMTQ4J1xuICAnMTMxNTInXG4gICcxMzE1MydcbiAgJzEzMTU1J1xuICAnMTMxNTYnXG4gICcxMzE1NydcbiAgJzEzMTU4J1xuICAnMTMxNTknXG4gICcxMzE2MCdcbiAgJzEzMTYyJ1xuICAnMTMxNjMnXG4gICcxMzE2NCdcbiAgJzEzMTY1J1xuICAnMTMxNjYnXG4gICcxMzE2NydcbiAgJzEzMjAyJ1xuICAnMTMyMDMnXG4gICcxMzIwNCdcbiAgJzEzMjA1J1xuICAnMTMyMDYnXG4gICcxMzIwNydcbiAgJzEzMjA4J1xuICAnMTMyMDknXG4gICcxMzIxMCdcbiAgJzEzMjExJ1xuICAnMTMyMTInXG4gICcxMzIxNCdcbiAgJzEzMjE1J1xuICAnMTMyMTknXG4gICcxMzIyNCdcbiAgJzEzMjQ0J1xuICAnMTMyOTAnXG4gICcxMzMwMSdcbiAgJzEzMzAyJ1xuICAnMTMzMDMnXG4gICcxMzMwNCdcbiAgJzEzMzA1J1xuICAnMTMzMDgnXG4gICcxMzMwOSdcbiAgJzEzMzEwJ1xuICAnMTMzMTInXG4gICcxMzMxMydcbiAgJzEzMzE0J1xuICAnMTMzMTYnXG4gICcxMzMxNydcbiAgJzEzMzE5J1xuICAnMTMzMjAnXG4gICcxMzMyMSdcbiAgJzEzMzIyJ1xuICAnMTMzMjMnXG4gICcxMzMyNCdcbiAgJzEzMzI1J1xuICAnMTMzMjYnXG4gICcxMzMyNydcbiAgJzEzMzI4J1xuICAnMTMzMjknXG4gICcxMzMzMSdcbiAgJzEzMzMyJ1xuICAnMTMzMzMnXG4gICcxMzMzNCdcbiAgJzEzMzM1J1xuICAnMTMzMzgnXG4gICcxMzMzODM1MTQnXG4gICcxMzMzOSdcbiAgJzEzMzQwJ1xuICAnMTMzNDMnXG4gICcxMzM0NSdcbiAgJzEzMzQ2J1xuICAnMTMzNDgnXG4gICcxMzM1MCdcbiAgJzEzMzU0J1xuICAnMTMzNTUnXG4gICcxMzM1NidcbiAgJzEzMzU3J1xuICAnMTMzNjAnXG4gICcxMzM2MydcbiAgJzEzMzY0J1xuICAnMTMzNjUnXG4gICcxMzM2NydcbiAgJzEzMzY4J1xuICAnMTM0MDEnXG4gICcxMzQwMidcbiAgJzEzNDAzJ1xuICAnMTM0MDcnXG4gICcxMzQwOCdcbiAgJzEzNDA5J1xuICAnMTM0MTEnXG4gICcxMzQxMydcbiAgJzEzNDE2J1xuICAnMTM0MTcnXG4gICcxMzQxOCdcbiAgJzEzNDIwJ1xuICAnMTM0MjEnXG4gICcxMzQyNCdcbiAgJzEzNDI0MzkwNSdcbiAgJzEzNDI1J1xuICAnMTM0MjYnXG4gICcxMzQyOCdcbiAgJzEzNDMxJ1xuICAnMTM0MzEwMDMwJ1xuICAnMTM0MzMnXG4gICcxMzQzNSdcbiAgJzEzNDM2J1xuICAnMTM0MzcnXG4gICcxMzQzOCdcbiAgJzEzNDM5J1xuICAnMTM0NDAnXG4gICcxMzQ0MSdcbiAgJzEzNDUwJ1xuICAnMTM0NTInXG4gICcxMzQ1NCdcbiAgJzEzNDU1J1xuICAnMTM0NTYnXG4gICcxMzQ1NydcbiAgJzEzNDU5J1xuICAnMTM0NjAnXG4gICcxMzQ2MSdcbiAgJzEzNDY5J1xuICAnMTM0NzEnXG4gICcxMzQ3MidcbiAgJzEzNDczJ1xuICAnMTM0NzUnXG4gICcxMzQ3NidcbiAgJzEzNDc4J1xuICAnMTM0NzknXG4gICcxMzQ4MCdcbiAgJzEzNDg0J1xuICAnMTM0ODUnXG4gICcxMzQ4NidcbiAgJzEzNDg5J1xuICAnMTM0OTAnXG4gICcxMzQ5MSdcbiAgJzEzNDkyJ1xuICAnMTM0OTMnXG4gICcxMzQ5NCdcbiAgJzEzNDk1J1xuICAnMTM1MDEnXG4gICcxMzUwMidcbiAgJzEzNjAxJ1xuICAnMTM2MDUnXG4gICcxMzYwNidcbiAgJzEzNjA3J1xuICAnMTM2MDgnXG4gICcxMzYwOSdcbiAgJzEzNjExJ1xuICAnMTM2MTInXG4gICcxMzYxMydcbiAgJzEzNjE0J1xuICAnMTM2MTUnXG4gICcxMzYxNidcbiAgJzEzNjE3J1xuICAnMTM2MTgnXG4gICcxMzYxOSdcbiAgJzEzNjE5MDE2NidcbiAgJzEzNjIwJ1xuICAnMTM2MjInXG4gICcxMzYyNCdcbiAgJzEzNjI1J1xuICAnMTM2MjYnXG4gICcxMzYyOCdcbiAgJzEzNjMwJ1xuICAnMTM2MzEnXG4gICcxMzYzMidcbiAgJzEzNjM0J1xuICAnMTM2MzUnXG4gICcxMzYzNydcbiAgJzEzNjQwJ1xuICAnMTM2NDEnXG4gICcxMzY0MidcbiAgJzEzNjQzJ1xuICAnMTM2NDYnXG4gICcxMzY0NydcbiAgJzEzNjQ4J1xuICAnMTM2NTAnXG4gICcxMzY1MSdcbiAgJzEzNjUyJ1xuICAnMTM2NTQnXG4gICcxMzY1NSdcbiAgJzEzNjU2J1xuICAnMTM2NTcnXG4gICcxMzY1OCdcbiAgJzEzNjYwJ1xuICAnMTM2NjEnXG4gICcxMzY2MidcbiAgJzEzNjYyMjYwNidcbiAgJzEzNjYyMzI5MCdcbiAgJzEzNjY0J1xuICAnMTM2NjUnXG4gICcxMzY2NydcbiAgJzEzNjY4J1xuICAnMTM2NjknXG4gICcxMzY3MCdcbiAgJzEzNjcyJ1xuICAnMTM2NzMnXG4gICcxMzY3NCdcbiAgJzEzNjc2J1xuICAnMTM2NzgnXG4gICcxMzY3OSdcbiAgJzEzNjg0J1xuICAnMTM2ODUnXG4gICcxMzY4NydcbiAgJzEzNjkwJ1xuICAnMTM2OTEnXG4gICcxMzY5NCdcbiAgJzEzNjk1J1xuICAnMTM2OTcnXG4gICcxMzY5OSdcbiAgJzEzNzMwJ1xuICAnMTM3MzEnXG4gICcxMzczMidcbiAgJzEzNzMzJ1xuICAnMTM3MzYnXG4gICcxMzczOSdcbiAgJzEzNzQwJ1xuICAnMTM3NDMnXG4gICcxMzc0MzAxNDUnXG4gICcxMzc0NSdcbiAgJzEzNzQ2J1xuICAnMTM3NDcnXG4gICcxMzc0OCdcbiAgJzEzNzUwJ1xuICAnMTM3NTEnXG4gICcxMzc1MidcbiAgJzEzNzUzJ1xuICAnMTM3NTQnXG4gICcxMzc1NSdcbiAgJzEzNzU2J1xuICAnMTM3NTcnXG4gICcxMzc1OCdcbiAgJzEzNzYwJ1xuICAnMTM3NzUnXG4gICcxMzc3NidcbiAgJzEzNzc4J1xuICAnMTM3ODAnXG4gICcxMzc4MidcbiAgJzEzNzgzJ1xuICAnMTM3ODQnXG4gICcxMzc4NydcbiAgJzEzNzg4J1xuICAnMTM3OTAnXG4gICcxMzc5NSdcbiAgJzEzNzk2J1xuICAnMTM3OTcnXG4gICcxMzgwMSdcbiAgJzEzODAyJ1xuICAnMTM4MDMnXG4gICcxMzgwNydcbiAgJzEzODA4J1xuICAnMTM4MDknXG4gICcxMzgxMCdcbiAgJzEzODExJ1xuICAnMTM4MTInXG4gICcxMzgxNCdcbiAgJzEzODE1J1xuICAnMTM4MjAnXG4gICcxMzgyNSdcbiAgJzEzODI3J1xuICAnMTM4MzAnXG4gICcxMzgzMidcbiAgJzEzODMzJ1xuICAnMTM4MzUnXG4gICcxMzgzOCdcbiAgJzEzODM5J1xuICAnMTM4NDAnXG4gICcxMzg0MSdcbiAgJzEzODQyJ1xuICAnMTM4NDUnXG4gICcxMzg0NydcbiAgJzEzODQ5J1xuICAnMTM4NTAnXG4gICcxMzg1NidcbiAgJzEzODYxJ1xuICAnMTM4NjInXG4gICcxMzg2NCdcbiAgJzEzODY1J1xuICAnMTM5MDEnXG4gICcxMzkwMidcbiAgJzEzOTAzJ1xuICAnMTM5MDQnXG4gICcxMzkwNSdcbiAgJzE0MDAxJ1xuICAnMTQwMDMnXG4gICcxNDAwNSdcbiAgJzE0MDA4J1xuICAnMTQwMDknXG4gICcxNDAxMSdcbiAgJzE0MDEyJ1xuICAnMTQwMjAnXG4gICcxNDAyMDAwMDAnXG4gICcxNDAyNCdcbiAgJzE0MDI4J1xuICAnMTQwMzYnXG4gICcxNDAzNydcbiAgJzE0MDQwJ1xuICAnMTQwNDInXG4gICcxNDA0OCdcbiAgJzE0MDQ4MTQzNydcbiAgJzE0MDU0J1xuICAnMTQwNTgnXG4gICcxNDA2MidcbiAgJzE0MDYzJ1xuICAnMTQwNjUnXG4gICcxNDA2NidcbiAgJzE0MDY3J1xuICAnMTQwNzAnXG4gICcxNDA4MSdcbiAgJzE0MDgyJ1xuICAnMTQwOTInXG4gICcxNDA5NCdcbiAgJzE0MDk4J1xuICAnMTQxMDEnXG4gICcxNDEwMydcbiAgJzE0MTA1J1xuICAnMTQxMDgnXG4gICcxNDEwOSdcbiAgJzE0MTIwJ1xuICAnMTQxMjAzMzQwJ1xuICAnMTQxMjA3MjI4J1xuICAnMTQxMjUnXG4gICcxNDEyNidcbiAgJzE0MTI5J1xuICAnMTQxMzAnXG4gICcxNDEzMSdcbiAgJzE0MTMyJ1xuICAnMTQxMzMnXG4gICcxNDEzNSdcbiAgJzE0MTM2J1xuICAnMTQxMzgnXG4gICcxNDE0MydcbiAgJzE0MTQ0J1xuICAnMTQxNDUnXG4gICcxNDE2NydcbiAgJzE0MTcxJ1xuICAnMTQxNzInXG4gICcxNDE3MydcbiAgJzE0MTc0J1xuICAnMTQyMjgnXG4gICcxNDMwMSdcbiAgJzE0MzAyMjY1NydcbiAgJzE0MzAzJ1xuICAnMTQzMDQnXG4gICcxNDMwNDAzNjAnXG4gICcxNDMwNSdcbiAgJzE0NDExJ1xuICAnMTQ0MTMnXG4gICcxNDQxNCdcbiAgJzE0NDE0LSdcbiAgJzE0NDE2J1xuICAnMTQ0MTgnXG4gICcxNDQyMCdcbiAgJzE0NDIyJ1xuICAnMTQ0MjMnXG4gICcxNDQyNCdcbiAgJzE0NDI1J1xuICAnMTQ0MjcnXG4gICcxNDQyOCdcbiAgJzE0NDI5J1xuICAnMTQ0MzInXG4gICcxNDQzMydcbiAgJzE0NDM1J1xuICAnMTQ0MzcnXG4gICcxNDQzNy0nXG4gICcxNDQ0MSdcbiAgJzE0NDQzJ1xuICAnMTQ0NDUnXG4gICcxNDQ1MCdcbiAgJzE0NDU0J1xuICAnMTQ0NTQtJ1xuICAnMTQ0NTYnXG4gICcxNDQ2MSdcbiAgJzE0NDY0J1xuICAnMTQ0NjUnXG4gICcxNDQ2NidcbiAgJzE0NDY3J1xuICAnMTQ0NjgnXG4gICcxNDQ2OSdcbiAgJzE0NDcwJ1xuICAnMTQ0NzEnXG4gICcxNDQ3MidcbiAgJzE0NDc2J1xuICAnMTQ0NzcnXG4gICcxNDQ3OCdcbiAgJzE0NDgwJ1xuICAnMTQ0ODEnXG4gICcxNDQ4MidcbiAgJzE0NDg1J1xuICAnMTQ0ODcnXG4gICcxNDQ4Ny0nXG4gICcxNDQ4OSdcbiAgJzE0NTAyJ1xuICAnMTQ1MDQnXG4gICcxNDUwNSdcbiAgJzE0NTA2J1xuICAnMTQ1MDcnXG4gICcxNDUxMCdcbiAgJzE0NTExJ1xuICAnMTQ1MTInXG4gICcxNDUxMydcbiAgJzE0NTE0J1xuICAnMTQ1MTYnXG4gICcxNDUxNydcbiAgJzE0NTE5J1xuICAnMTQ1MjAnXG4gICcxNDUyMSdcbiAgJzE0NTIyJ1xuICAnMTQ1MjUnXG4gICcxNDUyNidcbiAgJzE0NTI3J1xuICAnMTQ1MzAnXG4gICcxNDUzMidcbiAgJzE0NTMzJ1xuICAnMTQ1MzQnXG4gICcxNDUzNidcbiAgJzE0NTM5J1xuICAnMTQ1NDEnXG4gICcxNDU0MydcbiAgJzE0NTQ0J1xuICAnMTQ1NDUnXG4gICcxNDU0NidcbiAgJzE0NTQ4J1xuICAnMTQ1NDknXG4gICcxNDU1MCdcbiAgJzE0NTUxJ1xuICAnMTQ1NTUnXG4gICcxNDU1NidcbiAgJzE0NTU2LSdcbiAgJzE0NTU5J1xuICAnMTQ1NjAnXG4gICcxNDU2MSdcbiAgJzE0NTY0J1xuICAnMTQ1NjgnXG4gICcxNDU2OSdcbiAgJzE0NTcxJ1xuICAnMTQ1NzInXG4gICcxNDU4MCdcbiAgJzE0NTg1J1xuICAnMTQ1ODYnXG4gICcxNDU4OCdcbiAgJzE0NTg5J1xuICAnMTQ1OTAnXG4gICcxNDU5MSdcbiAgJzE0NTkxMDAzNidcbiAgJzE0NjAzJ1xuICAnMTQ2MDQnXG4gICcxNDYwNSdcbiAgJzE0NjA2J1xuICAnMTQ2MDcnXG4gICcxNDYwOCdcbiAgJzE0NjA5J1xuICAnMTQ2MTAnXG4gICcxNDYxMSdcbiAgJzE0NjEyJ1xuICAnMTQ2MTMnXG4gICcxNDYxNCdcbiAgJzE0NjE1J1xuICAnMTQ2MTYnXG4gICcxNDYxNydcbiAgJzE0NjE4J1xuICAnMTQ2MTknXG4gICcxNDYyMCdcbiAgJzE0NjIxJ1xuICAnMTQ2MjInXG4gICcxNDYyMydcbiAgJzE0NjI0J1xuICAnMTQ2MjUnXG4gICcxNDYyNidcbiAgJzE0NjI3J1xuICAnMTQ2NTAnXG4gICcxNDcwMSdcbiAgJzE0NzAyMjAwMidcbiAgJzE0NzA2J1xuICAnMTQ3MDknXG4gICcxNDcxMCdcbiAgJzE0NzExJ1xuICAnMTQ3MTInXG4gICcxNDcxNSdcbiAgJzE0NzE2J1xuICAnMTQ3MTgnXG4gICcxNDcxOSdcbiAgJzE0NzIwJ1xuICAnMTQ3MjEnXG4gICcxNDcyMidcbiAgJzE0NzIzJ1xuICAnMTQ3MjQnXG4gICcxNDcyNidcbiAgJzE0NzI3J1xuICAnMTQ3MjgnXG4gICcxNDcyOSdcbiAgJzE0NzMwJ1xuICAnMTQ3MzEnXG4gICcxNDczMidcbiAgJzE0NzMzJ1xuICAnMTQ3MzMtMTYwJ1xuICAnMTQ3MzUnXG4gICcxNDczNidcbiAgJzE0NzM3J1xuICAnMTQ3MzgnXG4gICcxNDczOSdcbiAgJzE0NzQwJ1xuICAnMTQ3NDEnXG4gICcxNDc0MydcbiAgJzE0NzQ0J1xuICAnMTQ3NDcnXG4gICcxNDc1MCdcbiAgJzE0NzUyJ1xuICAnMTQ3NTMnXG4gICcxNDc1NSdcbiAgJzE0NzU3J1xuICAnMTQ3NjAnXG4gICcxNDc2NydcbiAgJzE0NzcwJ1xuICAnMTQ3NzInXG4gICcxNDc3NCdcbiAgJzE0Nzc1J1xuICAnMTQ3NzgnXG4gICcxNDc3OSdcbiAgJzE0NzgxJ1xuICAnMTQ3ODInXG4gICcxNDc4MydcbiAgJzE0Nzg1J1xuICAnMTQ3ODYnXG4gICcxNDc4NydcbiAgJzE0Nzg4J1xuICAnMTQ4MDEnXG4gICcxNDgwMTExMTAnXG4gICcxNDgwMidcbiAgJzE0ODAzJ1xuICAnMTQ4MDQnXG4gICcxNDgwNidcbiAgJzE0ODA3J1xuICAnMTQ4MDknXG4gICcxNDgxMCdcbiAgJzE0ODEwMDYwNydcbiAgJzE0ODEyJ1xuICAnMTQ4MTMnXG4gICcxNDgxNCdcbiAgJzE0ODE1J1xuICAnMTQ4MTcnXG4gICcxNDgxOCdcbiAgJzE0ODIwJ1xuICAnMTQ4MjEnXG4gICcxNDgyMidcbiAgJzE0ODIzJ1xuICAnMTQ4MjYnXG4gICcxNDgzMCdcbiAgJzE0ODMwMjc4NidcbiAgJzE0ODMxJ1xuICAnMTQ4MzcnXG4gICcxNDgzOCdcbiAgJzE0ODM5J1xuICAnMTQ4NDAnXG4gICcxNDg0MDA0NTgnXG4gICcxNDg0MSdcbiAgJzE0ODQyJ1xuICAnMTQ4NDI5NjA1J1xuICAnMTQ4NDMnXG4gICcxNDg0NCdcbiAgJzE0ODQ1J1xuICAnMTQ4NDYnXG4gICcxNDg0NydcbiAgJzE0ODUwJ1xuICAnMTQ4NTInXG4gICcxNDg1MydcbiAgJzE0ODU2J1xuICAnMTQ4NTcnXG4gICcxNDg1OSdcbiAgJzE0ODYwJ1xuICAnMTQ4NjQnXG4gICcxNDg2NSdcbiAgJzE0ODY3J1xuICAnMTQ4NjknXG4gICcxNDg3MCdcbiAgJzE0ODcxJ1xuICAnMTQ4NzMnXG4gICcxNDg3NCdcbiAgJzE0ODc4J1xuICAnMTQ4NzknXG4gICcxNDg4MCdcbiAgJzE0ODgxJ1xuICAnMTQ4ODInXG4gICcxNDg4MydcbiAgJzE0ODg0J1xuICAnMTQ4ODUnXG4gICcxNDg4NidcbiAgJzE0ODg3J1xuICAnMTQ4ODknXG4gICcxNDg5MSdcbiAgJzE0ODkyJ1xuICAnMTQ4OTQnXG4gICcxNDg5NSdcbiAgJzE0ODk3J1xuICAnMTQ4OTgnXG4gICcxNDkwMSdcbiAgJzE0OTAyJ1xuICAnMTQ5MDMnXG4gICcxNDkwNCdcbiAgJzE0OTA1J1xuXVxuIixudWxsLCJcbiMgUHJvdmlkZXMgdXBkYXRlQXR0cnMgbWV0aG9kIHVzZWQgYnkgYmluZENoZWNrYm94ZXMsIGJpbmRJbnB1dHMsIGJpbmRSYWRpb3MsIGJpbmRTZWxlY3RzXG5jbGFzcyBCaW5kQmFzZSBleHRlbmRzIE1hcmlvbmV0dGUuQmVoYXZpb3JcblxuICB1cGRhdGVBdHRyczogKGUpIC0+XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKVxuICAgIEB2aWV3Lm1vZGVsLnNldChCYWNrYm9uZS5TeXBob24uc2VyaWFsaXplKEApKVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBCaW5kQmFzZVxuIiwiXG4jIERhdGFiaW5kaW5nIGZvciBmb3JtIGlucHV0c1xuY2xhc3MgQmluZElucHV0cyBleHRlbmRzIHJlcXVpcmUgJy4vYmluZEJhc2UnXG5cbiAgZXZlbnRzOlxuICAgICdpbnB1dCBpbnB1dCc6ICAndXBkYXRlQXR0cnMnXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJpbmRJbnB1dHNcbiIsIlxuX3NlbmRGbGFzaCA9ICh0eXBlLCBvYmopIC0+XG4gIEJhY2tib25lLlJhZGlvLmNoYW5uZWwoJ2ZsYXNoJykudHJpZ2dlcih0eXBlLCBvYmopXG5cbiMgIyAjICMgI1xuXG5jbGFzcyBGbGFzaGVzQmVoYXZpb3IgZXh0ZW5kcyBNYXJpb25ldHRlLkJlaGF2aW9yXG5cbiAgaW5pdGlhbGl6ZTogKG9wdGlvbnM9e30pIC0+XG4gICAgQHZpZXcuX2ZsYXNoZXMgICAgICA9IEBvcHRpb25zXG4gICAgQHZpZXcuZmxhc2hFcnJvciAgICA9IEBmbGFzaEVycm9yXG4gICAgQHZpZXcuZmxhc2hTdWNjZXNzICA9IEBmbGFzaFN1Y2Nlc3NcblxuICBmbGFzaEVycm9yOiAob2JqPXt9KSAtPlxuICAgIF9zZW5kRmxhc2goJ2Vycm9yJywgQF9mbGFzaGVzWydlcnJvciddIHx8IG9iailcblxuICBmbGFzaFN1Y2Nlc3M6IChvYmo9e30pIC0+XG4gICAgX3NlbmRGbGFzaCgnc3VjY2VzcycsIEBfZmxhc2hlc1snc3VjY2VzcyddIHx8IG9iailcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gRmxhc2hlc0JlaGF2aW9yXG4iLCJcbmNsYXNzIE1vZGVsRXZlbnRzQmVoYXZpb3IgZXh0ZW5kcyBNYXJpb25ldHRlLkJlaGF2aW9yXG5cbiAgbW9kZWxFdmVudHM6XG4gICAgJ3JlcXVlc3QnOiAgJ29uTW9kZWxSZXF1ZXN0J1xuICAgICdzeW5jJzogICAgICdvbk1vZGVsU3luYydcbiAgICAnZXJyb3InOiAgICAnb25Nb2RlbEVycm9yJ1xuXG4gIG9uTW9kZWxSZXF1ZXN0OiAobW9kZWwsIHN0YXR1cywgb3B0aW9ucykgLT5cbiAgICBAdmlldy5vblJlcXVlc3Q/KG1vZGVsLCBzdGF0dXMsIG9wdGlvbnMpXG5cbiAgb25Nb2RlbFN5bmM6IChtb2RlbCwgcmVzcG9uc2UsIG9wdGlvbnMpIC0+XG4gICAgQHZpZXcub25TeW5jPyhtb2RlbCwgcmVzcG9uc2UsIG9wdGlvbnMpXG5cbiAgb25Nb2RlbEVycm9yOiAobW9kZWwsIHJlc3BvbnNlLCBvcHRpb25zKSAtPlxuICAgIEB2aWV3Lm9uRXJyb3I/KG1vZGVsLCByZXNwb25zZSwgb3B0aW9ucylcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gTW9kZWxFdmVudHNCZWhhdmlvclxuIiwiXG4jIFN1Ym1pdEJ1dHRvbkJlaGF2aW9yIGNsYXNzIGRlZmluaXRpb25cbiMgUHJvdmlkZXMgYW4gZXZlbnQgbGlzdGVuZXIgYW5kIGhhbmRsZXIsIGFuZCBkZWZpbmVzXG4jIGFzc29jaWF0ZWQgY2FsbGJhY2tzIG9uIHRoZSB2aWV3IHRvIHdoaWNoIHRoZSBiZWhhdmlvclxuIyBpcyBhdHRhY2hlZC4gVGhpcyBpcyB1c2VkIGluIHRoZSBQYXNzd29yZCBhbmQgU25pcHBldCBmb3Jtcy5cbmNsYXNzIFN1Ym1pdEJ1dHRvbkJlaGF2aW9yIGV4dGVuZHMgTWFyaW9uZXR0ZS5CZWhhdmlvclxuXG4gIHVpOlxuICAgIHN1Ym1pdDogJ1tkYXRhLWNsaWNrPXN1Ym1pdF0nXG5cbiAgZXZlbnRzOlxuICAgICdjbGljayBAdWkuc3VibWl0Om5vdCguZGlzYWJsZWQpJzogJ29uU3VibWl0Q2xpY2snXG5cbiAgaW5pdGlhbGl6ZTogKG9wdGlvbnM9e30pIC0+XG4gICAgQHZpZXcuZGlzYWJsZVN1Ym1pdCA9ID0+IEBkaXNhYmxlU3VibWl0KClcbiAgICBAdmlldy5lbmFibGVTdWJtaXQgID0gPT4gQGVuYWJsZVN1Ym1pdCgpXG5cbiAgb25TdWJtaXRDbGljazogKGUpIC0+IEB2aWV3Lm9uU3VibWl0PyhlKVxuICBkaXNhYmxlU3VibWl0OiAtPiBAdWkuc3VibWl0LmFkZENsYXNzKCdkaXNhYmxlZCcpXG4gIGVuYWJsZVN1Ym1pdDogLT4gIEB1aS5zdWJtaXQucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkJylcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gU3VibWl0QnV0dG9uQmVoYXZpb3JcbiIsIlxuY2xhc3MgVG9vbHRpcEJlaGF2aW9yIGV4dGVuZHMgTWFyaW9uZXR0ZS5CZWhhdmlvclxuXG4gIHVpOlxuICAgIHRvb2x0aXBzOiAnW2RhdGEtdG9nZ2xlPXRvb2x0aXBdJ1xuXG4gIGluaXRpYWxpemU6IC0+XG4gICAgIyBQcm94aWVzIGNsZWFyIG1ldGhvZCB0byBiZSBhY2Nlc3NpYmxlIGluc2lkZSB0aGUgdmlld1xuICAgIEB2aWV3LmNsZWFyVG9vbHRpcHMgPSA9PiBAY2xlYXIoKVxuXG4gIGNsZWFyOiAtPlxuICAgIEB1aS50b29sdGlwcy50b29sdGlwKCdoaWRlJylcbiAgICBAdWkudG9vbHRpcHMudG9vbHRpcCgnZGlzcG9zZScpXG5cbiAgb25SZW5kZXI6IC0+IEB1aS50b29sdGlwcz8udG9vbHRpcCgpXG4gIG9uQmVmb3JlRGVzdHJveTogLT4gQGNsZWFyKClcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gVG9vbHRpcEJlaGF2aW9yXG4iLCJCcmVhZGNydW1iTGlzdCA9IHJlcXVpcmUgJy4vdmlld3MvYnJlYWRjcnVtYkxpc3QnXG5cbiMgIyAjICMgI1xuXG5jbGFzcyBCcmVhZGNydW1iQ29tcG9uZW50IGV4dGVuZHMgTW4uU2VydmljZVxuXG4gIGluaXRpYWxpemU6IChvcHRpb25zID0ge30pIC0+XG4gICAgQGNvbnRhaW5lciAgPSBvcHRpb25zLmNvbnRhaW5lclxuICAgIEBjb2xsZWN0aW9uID0gbmV3IEJhY2tib25lLkNvbGxlY3Rpb24oKVxuXG4gIHJhZGlvRXZlbnRzOlxuICAgICdicmVhZGNydW1iIHJlYWR5JzogJ29uUmVhZHknXG4gICAgJ2JyZWFkY3J1bWIgc2V0JzogICAnc2V0J1xuXG4gIG9uUmVhZHk6IC0+XG4gICAgQHNldChbe3RleHQ6ICdMb2FkaW5nLi4uJ31dKVxuICAgIEBzaG93VmlldygpXG5cbiAgc2V0OiAobW9kZWxzKSAtPlxuICAgIEBjb2xsZWN0aW9uLnNldChtb2RlbHMpXG5cbiAgc2hvd1ZpZXc6IC0+XG4gICAgdW5sZXNzIEBzaG93blxuICAgICAgQGNvbnRhaW5lci5zaG93IG5ldyBCcmVhZGNydW1iTGlzdCh7IGNvbGxlY3Rpb246IEBjb2xsZWN0aW9uIH0pXG4gICAgICBAc2hvd24gPSB0cnVlXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJyZWFkY3J1bWJDb21wb25lbnRcbiIsIlxuY2xhc3MgQnJlYWRjcnVtYkNoaWxkIGV4dGVuZHMgTW4uTGF5b3V0Vmlld1xuICB0YWdOYW1lOiAnbGknXG4gIHRlbXBsYXRlOiByZXF1aXJlICcuL3RlbXBsYXRlcy9icmVhZGNydW1iX2NoaWxkJ1xuXG4gIGNsYXNzTmFtZTogLT5cbiAgICByZXR1cm4gJ2FjdGl2ZScgdW5sZXNzIEBtb2RlbC5nZXQoJ2hyZWYnKVxuXG4jICMgIyAjICNcblxuY2xhc3MgQnJlYWRjcnVtYkxpc3QgZXh0ZW5kcyBNbi5Db2xsZWN0aW9uVmlld1xuICBjbGFzc05hbWU6ICdicmVhZGNydW1iJ1xuICB0YWdOYW1lOiAnb2wnXG4gIGNoaWxkVmlldzogQnJlYWRjcnVtYkNoaWxkXG5cbiAgYXR0cmlidXRlczpcbiAgICByb2xlOiAnbmF2aWdhdGlvbidcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gQnJlYWRjcnVtYkxpc3RcbiIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuO3ZhciBsb2NhbHNfZm9yX3dpdGggPSAobG9jYWxzIHx8IHt9KTsoZnVuY3Rpb24gKGhyZWYsIHRleHQpIHtcbmlmICggaHJlZilcbntcbmJ1Zi5wdXNoKFwiPGFcIiArIChqYWRlLmF0dHIoXCJocmVmXCIsIGhyZWYsIHRydWUsIGZhbHNlKSkgKyBcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IHRleHQpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvYT5cIik7XG59XG5lbHNlXG57XG5idWYucHVzaChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IHRleHQpID8gXCJcIiA6IGphZGVfaW50ZXJwKSk7XG59fS5jYWxsKHRoaXMsXCJocmVmXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5ocmVmOnR5cGVvZiBocmVmIT09XCJ1bmRlZmluZWRcIj9ocmVmOnVuZGVmaW5lZCxcInRleHRcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnRleHQ6dHlwZW9mIHRleHQhPT1cInVuZGVmaW5lZFwiP3RleHQ6dW5kZWZpbmVkKSk7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwiXG4jIEFzc2lnbnMgTWFyaW9uZXR0ZS5EZWNvcmF0b3Jcbk1hcmlvbmV0dGUuRGVjb3JhdG9yID0gcmVxdWlyZSAnLi9kZWNvcmF0b3InXG5cbiMgT3ZlcnJpZGVzIGRlZmF1bHQgc2VyaWFsaXplTW9kZWwoKSBtZXRob2QgZGVmaW5pdGlvblxuIyBJbiB0aGUgY29udGV4dCB0aGUgc2VyaWFsaXplTW9kZWwgbWV0aG9kLCAndGhpcydcbiMgcmVmZXJzIHRvIHRoZSB2aWV3IGluc3RhbmNlIGluc2lkZSB3aGljaCB0aGVcbiMgc2VyaWFsaXplTW9kZWwgbWV0aG9kIHdhcyBpbnZva2VkXG5NYXJpb25ldHRlLlZpZXcucHJvdG90eXBlLnNlcmlhbGl6ZU1vZGVsID0gLT5cblxuICAjIElmIHRoaXMubW9kZWwgaXMgbm90IGRlZmluZWQsIHJldHVybiBhbiBlbXB0eSBvYmplY3RcbiAgaWYgIXRoaXMubW9kZWxcbiAgICByZXR1cm4ge31cblxuICAjIElmIHRoaXMubW9kZWwgZXhpc3RzLCBhbmQgaGFzIGEgZGVjb3JhdG9yIGRlZmluZWQsXG4gICMgcmV0dXJuIHRoZSB0aGlzLm1vZGVsJ3MgYXR0cmlidXRlcyBhbmQgZGVjb3JhdGlvbnNcbiAgZWxzZSBpZiB0aGlzLm1vZGVsLmRlY29yYXRvclxuICAgIHJldHVybiB0aGlzLm1vZGVsLmRlY29yYXRvci5kZWNvcmF0ZSh0aGlzLm1vZGVsKVxuXG4gICMgT3RoZXJ3aXNlLCByZXR1cm4gdGhlIGNsb25lZCBhdHRyaWJ1dGVzIG9mIHRoaXMubW9kZWxcbiAgcmV0dXJuIF8uY2xvbmUgdGhpcy5tb2RlbC5hdHRyaWJ1dGVzXG4iLCJcbiMgQmFzZURlY29yYXRvciBjbGFzcyBkZWZpbml0aW9uXG4jIERlZmluZXMgYSBzaW1wbGUgY2xhc3MgdG8gZGVjb3JhdGUgbW9kZWxzIHdoZW5cbiMgdGhleSBhcmUgc2VyaWFsaXplZCBpbnRvIGEgdmlldydzIHRlbXBsYXRlXG5jbGFzcyBCYXNlRGVjb3JhdG9yXG5cbiAgIyBEZWNvcmF0aW9uIG1ldGhvZFxuICAjIEludm9rZWQgaW4gTWFyaW9uZXR0ZS5WaWV3LnByb3RvdHlwZS5zZXJpYWxpemVNb2RlbFxuICBAZGVjb3JhdGU6IChtb2RlbCkgLT5cblxuICAgICMgQ2xvbmVzIG1vZGVsJ3MgYXR0cmlidXRlc1xuICAgICMgQ2xvbmluZyBwcmV2ZW50cyBjb250YW1pbmF0aW9uIG9mXG4gICAgZGF0YSA9IF8uY2xvbmUobW9kZWwuYXR0cmlidXRlcylcblxuICAgICMgSXRlcmF0ZXMgb3ZlciBlYWNoIGZ1bmN0aW9uIGluIHByb3RvdHlwZVxuICAgICMgTGV2ZXJhZ2VzIFVuZGVyc2NvcmUuanMgXy5mdW5jdGlvbnMoKVxuICAgIGZvciBmdW5jIGluIF8uZnVuY3Rpb25zKEBwcm90b3R5cGUpXG5cbiAgICAgICMgU2tpcCBjb25zdHJ1Y3RvclxuICAgICAgY29udGludWUgaWYgZnVuYyA9PSAnY29uc3RydWN0b3InXG5cbiAgICAgICMgQXNzaWducyB2YWx1ZSBvZiBmdW5jdGlvbiB0byBoYXNoXG4gICAgICBkYXRhW2Z1bmNdID0gQHByb3RvdHlwZVtmdW5jXS5hcHBseShtb2RlbClcblxuICAgICMgUmV0dXJucyB0aGUgbW9kZWwncyBhdHRyaWJ1dGVzICYgZGVjb3JhdGlvbnNcbiAgICByZXR1cm4gZGF0YVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBCYXNlRGVjb3JhdG9yXG4iLCJcbiMgRmxhc2hDb2xsZWN0aW9uIGNsYXNzIGRlZmluaXRpb25cbiMgRGVmaW5lcyBhIGJhc2ljIEJhY2tib25lLkNvbGxlY3Rpb24gdG8gYmUgdXNlZCBieSB0aGVcbiMgRmxhc2hDb21wb25lbnQgZm9yIHN0b3JpbmcgbXVsdGlwbGUgZmxhc2ggbW9kZWxzXG5jbGFzcyBGbGFzaENvbGxlY3Rpb24gZXh0ZW5kcyBCYWNrYm9uZS5Db2xsZWN0aW9uXG4gIG1vZGVsOiByZXF1aXJlICcuL21vZGVsJ1xuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBGbGFzaENvbGxlY3Rpb25cbiIsInJlcXVpcmUgJy4vc2VydmljZSdcbkZsYXNoTGlzdCA9IHJlcXVpcmUgJy4vdmlld3MvZmxhc2hMaXN0J1xuXG4jICMgIyAjICNcblxuIyBGbGFzaFNlcnZpY2UgY2xhc3MgZGVmaW5pdGlvblxuIyBEZWZpbmVzIGEgY29tcG9uZW50IHRvIGNyZWF0ZSBhbmQgZGlzcGxheSBmbGFzaGVzXG4jIGluIHRoZSBhcHAuIFByb3ZpZGVzIG11bHRpcGxlIGludGVyZmFjZXMgaW4gcmFkaW9FdmVudHNcbiMgdG8gaGFuZGxlIGNvbW1vbiB0eXBlcyBvZiBmbGFzaGVzIChlcnJvciwgd2FybmluZywgc3VjY2VzcylcbmNsYXNzIEZsYXNoQ29tcG9uZW50IGV4dGVuZHMgQmFja2JvbmUuTWFyaW9uZXR0ZS5TZXJ2aWNlXG5cbiAgaW5pdGlhbGl6ZTogKG9wdGlvbnMgPSB7fSkgLT5cbiAgICBAY29udGFpbmVyID0gb3B0aW9ucy5jb250YWluZXJcbiAgICBCYWNrYm9uZS5SYWRpby5jaGFubmVsKCdmbGFzaCcpLnJlcXVlc3QoJ2NvbGxlY3Rpb24nKS50aGVuIChjb2xsZWN0aW9uKSA9PlxuICAgICAgQGNvbGxlY3Rpb24gPSBjb2xsZWN0aW9uXG4gICAgICBAY29sbGVjdGlvbi5vbiAndXBkYXRlJywgQHNob3dMaXN0VmlldywgQFxuXG4gIHJhZGlvRXZlbnRzOlxuICAgICdmbGFzaCBhZGQnOiAgICAgICdhZGQnXG4gICAgJ2ZsYXNoIHJlc2V0JzogICAgJ3Jlc2V0J1xuICAgICdmbGFzaCBlcnJvcic6ICAgICdlcnJvcidcbiAgICAnZmxhc2ggd2FybmluZyc6ICAnd2FybmluZydcbiAgICAnZmxhc2ggc3VjY2Vzcyc6ICAnc3VjY2VzcydcblxuICBhZGQ6IChvcHRpb25zID0ge30pIC0+XG4gICAgQGNvbGxlY3Rpb24uYWRkKG9wdGlvbnMpXG5cbiAgcmVzZXQ6IC0+XG4gICAgQGNvbGxlY3Rpb24ucmVzZXQoKVxuXG4gIGVycm9yOiAob3B0aW9ucz17fSkgLT5cbiAgICBAY29sbGVjdGlvbi5hZGQgXy5leHRlbmQoIG9wdGlvbnMsIHsgY29udGV4dDogICdkYW5nZXInIH0pXG5cbiAgd2FybmluZzogKG9wdGlvbnM9e30pIC0+XG4gICAgQGNvbGxlY3Rpb24uYWRkIF8uZXh0ZW5kKCBvcHRpb25zLCB7IGNvbnRleHQ6ICAnd2FybmluZycgfSlcblxuICBzdWNjZXNzOiAob3B0aW9ucz17fSkgLT5cbiAgICBAY29sbGVjdGlvbi5hZGQgXy5leHRlbmQoIG9wdGlvbnMsIHsgY29udGV4dDogICdzdWNjZXNzJyB9KVxuXG4gIHNob3dMaXN0VmlldzogPT5cbiAgICB1bmxlc3MgQHJlbmRlcmVkXG4gICAgICBAY29udGFpbmVyLnNob3cgbmV3IEZsYXNoTGlzdCh7IGNvbGxlY3Rpb246IEBjb2xsZWN0aW9uIH0pXG4gICAgICBAcmVuZGVyZWQgPSB0cnVlXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEZsYXNoQ29tcG9uZW50XG4iLCJcbiMgRmxhc2hNb2RlbCBjbGFzcyBkZWZpbml0aW9uXG4jIERlZmluZXMgYSBiYXNpYyBCYWNrYm9uZS5Nb2RlbCB0byBtYW5hZ2Ugdmlld3NcbiMgZGlzcGxheWVkIGluIHRoZSBGbGFzaENvbXBvbmVudFxuY2xhc3MgRmxhc2hNb2RlbCBleHRlbmRzIEJhY2tib25lLk1vZGVsXG5cbiAgZGVmYXVsdHM6XG4gICAgdGltZW91dDogNTAwMFxuICAgIGRpc21pc3NpYmxlOiB0cnVlXG4gICAgY29udGV4dDogJ2luZm8nXG5cbiAgIyBBbGVydCBNb2RlbCBBdHRyaWJ1dGVzIC8gT3B0aW9uc1xuICAjIC0gbWVzc2FnZVxuICAjIC0gc3Ryb25nVGV4dCAocGxlYXNlIHJlbmFtZSB0byAnc3Ryb25nJyAmIGFkZCBhcHByb3ByaWF0ZSBzcGFjaW5nIHRvIHRlbXBsYXRlKVxuICAjIC0gY29udGV4dENsYXNzIChwbGVhc2UgcmVuYW1lIHRvICdjb250ZXh0JylcbiAgIyAtIHRpbWVvdXQgKGRlZmF1bHQgaXMgNSBzZWNvbmRzKVxuICAjIC0gZGlzbWlzc2libGUgKGRlZmF1bHQgaXMgdHJ1ZSlcblxuICBkaXNtaXNzOiAtPlxuICAgIEBjb2xsZWN0aW9uLnJlbW92ZShAKVxuXG4jICMgIyAjICNcblxubW9kdWxlLmV4cG9ydHMgPSBGbGFzaE1vZGVsXG4iLCJGbGFzaENvbGxlY3Rpb24gPSByZXF1aXJlICcuL2NvbGxlY3Rpb24nXG5cbiMgIyAjICMgI1xuXG4jIEZsYXNoU2VydmljZSBjbGFzcyBkZWZpbml0aW9uXG4jIERlZmluZWQgYSBiYXNpYyBzZXJ2aWNlIHRvIHJldHVybiB0aGUgRmxhc2hlc0NvbGxlY3Rpb25cbiMgd2hlbiByZXF1ZXN0ZWQuIFRoaXMgaXMgdXNlZCBieSB0aGUgRmxhc2hDb21wb25lbnQgdG8gcmV0cmlldmVcbiMgdGhlIEZsYXNoQ29sbGVjdGlvbiBpdCBpcyByZXNwb25zaWJsZSBmb3IgcmVuZGVyaW5nXG5jbGFzcyBGbGFzaFNlcnZpY2UgZXh0ZW5kcyBCYWNrYm9uZS5NYXJpb25ldHRlLlNlcnZpY2VcblxuICByYWRpb1JlcXVlc3RzOlxuICAgICdmbGFzaCBjb2xsZWN0aW9uJzogJ2dldENvbGxlY3Rpb24nXG5cbiAgYWxlcnRzOiBudWxsXG5cbiAgZ2V0Q29sbGVjdGlvbjogLT5cbiAgICByZXR1cm4gbmV3IFByb21pc2UgKHJlc29sdmUscmVqZWN0KSA9PlxuICAgICAgQGFsZXJ0cyB8fD0gbmV3IEZsYXNoQ29sbGVjdGlvbigpXG4gICAgICByZXNvbHZlKEBhbGVydHMpXG4gICAgICByZXR1cm5cblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IEZsYXNoU2VydmljZSgpXG4iLCIjIEZsYXNoQ2hpbGQgY2xhc3MgZGVmaW5pdGlvblxuIyBEZWZpbmVzIGEgTWFyaW9uZXR0ZS5MYXlvdXRWaWV3IHRvIGRpc3BsYXkgYSBGbGFzaE1vZGVsIGluc3RhbmNlXG4jIFRoaXMgdmlldyBhdXRvLWRpc21pc3NlcyBhZnRlciB0aGUgdGltZW91dCBkZWZpbmVkIGluIHRoZSBGbGFzaE1vZGVsIGluc3RhbmNlXG5jbGFzcyBGbGFzaENoaWxkIGV4dGVuZHMgTWFyaW9uZXR0ZS5MYXlvdXRWaWV3XG4gIGNsYXNzTmFtZTogJ3JvdydcbiAgdGVtcGxhdGU6IHJlcXVpcmUgJy4vdGVtcGxhdGVzL2ZsYXNoX2NoaWxkJ1xuXG4gIGF0dHJpYnV0ZXM6XG4gICAgc3R5bGU6ICdkaXNwbGF5Om5vbmU7J1xuXG4gIHVpOlxuICAgIGNsb3NlOiAnW2RhdGEtY2xpY2s9ZGlzbWlzc10nXG5cbiAgZXZlbnRzOlxuICAgICdjbGljayBAdWkuY2xvc2UnOiAnZGlzbWlzcydcblxuICBvblNob3c6IC0+XG4gICAgdGltZW91dCA9IEBtb2RlbC5nZXQoJ3RpbWVvdXQnKVxuICAgIHNldFRpbWVvdXQoIEBkaXNtaXNzLCB0aW1lb3V0IClcblxuICBvbkF0dGFjaDogLT5cbiAgICBAJGVsLmZhZGVJbigpXG5cbiAgcmVtb3ZlOiAtPlxuICAgIEAkZWwuc2xpZGVUb2dnbGUoID0+XG4gICAgICBNYXJpb25ldHRlLkxheW91dFZpZXcucHJvdG90eXBlLnJlbW92ZS5jYWxsKEApXG4gICAgKVxuXG4gIGRpc21pc3M6ID0+XG4gICAgQG1vZGVsLmNvbGxlY3Rpb24/LnJlbW92ZSggQG1vZGVsIClcblxuIyBGbGFzaExpc3QgY2xhc3MgZGVmaW5pdGlvblxuIyBEZWZpbmVzIGEgTWFyaW9uZXR0ZS5Db2xsZWN0aW9uVmlldyB0byB0aGUgbGlzdCBvZiBGbGFzaGVzXG5jbGFzcyBGbGFzaExpc3QgZXh0ZW5kcyBNYXJpb25ldHRlLkNvbGxlY3Rpb25WaWV3XG4gIGNsYXNzTmFtZTogJ2NvbnRhaW5lci1mbHVpZCdcbiAgY2hpbGRWaWV3OiBGbGFzaENoaWxkXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IEZsYXNoTGlzdFxuIiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG47dmFyIGxvY2Fsc19mb3Jfd2l0aCA9IChsb2NhbHMgfHwge30pOyhmdW5jdGlvbiAoY29udGV4dCwgZGlzbWlzc2libGUsIG1lc3NhZ2UsIHN0cm9uZykge1xuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJjb2wteHMtMTIgdGV4dC1jZW50ZXJcXFwiPjxkaXYgcm9sZT1cXFwiYWxlcnRcXFwiXCIgKyAoamFkZS5jbHMoWydhbGVydCcsJ2FsZXJ0LWRpc21pc3NpYmxlJywnZmFkZScsJ2luJyxcImFsZXJ0LVwiICsgY29udGV4dF0sIFtudWxsLG51bGwsbnVsbCxudWxsLHRydWVdKSkgKyBcIj5cIik7XG5pZiAoIGRpc21pc3NpYmxlKVxue1xuYnVmLnB1c2goXCI8YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCIgZGF0YS1jbGljaz1cXFwiZGlzbWlzc1xcXCIgYXJpYS1sYWJlbD1cXFwiQ2xvc2VcXFwiIGNsYXNzPVxcXCJjbG9zZVxcXCI+PHNwYW4gYXJpYS1oaWRkZW49XFxcInRydWVcXFwiPsOXPC9zcGFuPjxzcGFuIGNsYXNzPVxcXCJzci1vbmx5XFxcIj5DbG9zZTwvc3Bhbj48L2J1dHRvbj5cIik7XG59XG5pZiAoIHN0cm9uZylcbntcbmJ1Zi5wdXNoKFwiPHN0cm9uZz5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IHN0cm9uZyArIFwiIFwiKSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L3N0cm9uZz5cIik7XG59XG5pZiAoIG1lc3NhZ2UpXG57XG5idWYucHVzaChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IG1lc3NhZ2UpID8gXCJcIiA6IGphZGVfaW50ZXJwKSk7XG59XG5idWYucHVzaChcIjwvZGl2PjwvZGl2PlwiKTt9LmNhbGwodGhpcyxcImNvbnRleHRcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLmNvbnRleHQ6dHlwZW9mIGNvbnRleHQhPT1cInVuZGVmaW5lZFwiP2NvbnRleHQ6dW5kZWZpbmVkLFwiZGlzbWlzc2libGVcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLmRpc21pc3NpYmxlOnR5cGVvZiBkaXNtaXNzaWJsZSE9PVwidW5kZWZpbmVkXCI/ZGlzbWlzc2libGU6dW5kZWZpbmVkLFwibWVzc2FnZVwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgubWVzc2FnZTp0eXBlb2YgbWVzc2FnZSE9PVwidW5kZWZpbmVkXCI/bWVzc2FnZTp1bmRlZmluZWQsXCJzdHJvbmdcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnN0cm9uZzp0eXBlb2Ygc3Ryb25nIT09XCJ1bmRlZmluZWRcIj9zdHJvbmc6dW5kZWZpbmVkKSk7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwiXG5jbGFzcyBPdmVybGF5VmlldyBleHRlbmRzIE1uLkxheW91dFZpZXdcbiAgdGVtcGxhdGU6IGZhbHNlXG4gIGNsYXNzTmFtZTogJ292ZXJsYXknXG5cbiAgZXZlbnRzOlxuICAgICdjbGljayc6ICdvbkNsaWNrJ1xuXG4gIG9uQ2xpY2s6IC0+XG4gICAgQmFja2JvbmUuUmFkaW8uY2hhbm5lbCgnc2lkZWJhcicpLnRyaWdnZXIoJ2hpZGUnKVxuXG4jICMgIyAjICNcblxuY2xhc3MgT3ZlcmxheUNvbXBvbmVudCBleHRlbmRzIE1uLlNlcnZpY2VcblxuICBpbml0aWFsaXplOiAob3B0aW9ucyA9IHt9KSAtPlxuICAgIEBjb250YWluZXIgID0gb3B0aW9ucy5jb250YWluZXJcblxuICByYWRpb0V2ZW50czpcbiAgICAnb3ZlcmxheSByZWFkeSc6ICAnb25SZWFkeSdcbiAgICAnb3ZlcmxheSBzaG93JzogICAnc2hvd092ZXJsYXknXG4gICAgJ292ZXJsYXkgaGlkZSc6ICAgJ2hpZGVPdmVybGF5J1xuXG4gIHNob3dPdmVybGF5OiAtPlxuICAgICQoJy5vdmVybGF5LXJlZ2lvbicpLmFkZENsYXNzKCdhY3RpdmUnKVxuXG4gIGhpZGVPdmVybGF5OiAtPlxuICAgICQoJy5vdmVybGF5LXJlZ2lvbicpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKVxuXG4gIG9uUmVhZHk6IC0+XG4gICAgdW5sZXNzIEB2aWV3XG4gICAgICBAdmlldyA9IG5ldyBPdmVybGF5VmlldygpXG4gICAgICBAY29udGFpbmVyLnNob3coQHZpZXcpXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IE92ZXJsYXlDb21wb25lbnRcbiIsIlxuIyBCYXNlUm91dGUgY2xhc3MgZGVmaW5pdGlvblxuIyBUaGUgYmFzZSByb3V0ZSByZWR1Y2VzIHJlcGVhdGVkIGNvZGUgYnlcbiMgYXR0YWNoaW5nIHRoZSBAY29udGFpbmVyIHByb3BlcnR5IHBhc3NlZCBpbiBmcm9tXG4jIHRoZSByb3V0ZXIuIFRoaXMgcHJvcGVydHkgaXMgdXNlZCB0byBkaXNwbGF5IHZpZXdzIGluIHRoZSBhcHBcbmNsYXNzIEJhc2VSb3V0ZSBleHRlbmRzIEJhY2tib25lLlJvdXRpbmcuUm91dGVcblxuICBicmVhZGNydW1iczogW11cblxuICBpbml0aWFsaXplOiAob3B0aW9ucykgLT5cblxuICAgICMgQXR0YWNoZXMgb3B0aW9uc1xuICAgIEBvcHRpb25zID0gb3B0aW9uc1xuXG4gICAgIyBBdHRhY2hlcyBjb250YWluZXJcbiAgICBAY29udGFpbmVyID0gb3B0aW9ucy5jb250YWluZXJcblxuICAgICMgRXZlbnQgaGFuZGxlcnNcbiAgICBAb24gJ2JlZm9yZTplbnRlcicsID0+IEBvbkJlZm9yZUVudGVyPyhhcmd1bWVudHMpXG4gICAgQG9uICdiZWZvcmU6ZmV0Y2gnLCA9PiBAb25CZWZvcmVGZXRjaD8oYXJndW1lbnRzKVxuICAgIEBvbiAnYmVmb3JlOnJlbmRlcicsID0+IEBvbkJlZm9yZVJlbmRlcj8oYXJndW1lbnRzKVxuICAgIEBvbiAnZmV0Y2gnLCA9PiBAb25GZXRjaD8oYXJndW1lbnRzKVxuICAgIEBvbiAncmVuZGVyJywgPT4gQG9uUmVuZGVyPyhhcmd1bWVudHMpXG4gICAgQG9uICdlbnRlcicsID0+IEBvbkVudGVyPyhhcmd1bWVudHMpXG5cbiAgICAjIEhpZGVzIHNpZGViYXIgY29tcG9uZW50XG4gICAgQmFja2JvbmUuUmFkaW8uY2hhbm5lbCgnc2lkZWJhcicpLnRyaWdnZXIoJ2hpZGUnKVxuXG4gIF9zZXRQYWdlVGl0bGU6IC0+XG4gICAgZG9jdW1lbnQudGl0bGUgPSBfLnJlc3VsdCBALCAndGl0bGUnXG5cbiAgX3VwZGF0ZUJyZWFkY3J1bWJzOiAtPlxuICAgIGJyZWFkY3J1bWJzID0gXy5yZXN1bHQgQCwgJ2JyZWFkY3J1bWJzJ1xuICAgIEJhY2tib25lLlJhZGlvLmNoYW5uZWwoJ2JyZWFkY3J1bWInKS50cmlnZ2VyKCdzZXQnLCBicmVhZGNydW1icykgaWYgYnJlYWRjcnVtYnNcblxuICBvbkZldGNoOiAtPlxuICAgIEBfc2V0UGFnZVRpdGxlKClcbiAgICBAX3VwZGF0ZUJyZWFkY3J1bWJzKClcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gQmFzZVJvdXRlXG4iLCJcbiMgQmFzZVJvdXRlciBjbGFzcyBkZWZpbml0aW9uXG4jIFRoZSBiYXNlIHJvdXRlciByZWR1Y2VzIHJlcGVhdGVkIGNvZGUgYnlcbiMgYXR0YWNoaW5nIHRoZSBAY29udGFpbmVyIHByb3BlcnR5IHBhc3NlZCBpbiBmcm9tIHdoZW4gaW5zdGFudGlhdGVkLlxuIyBUaGlzIHByb3BlcnR5IGlzIHN1YnNlcXVlbnRseSBwYXNzZWQgdG8gYWxsIHJvdXRlcyBjcmVhdGVkIGluc2lkZVxuIyByb3V0ZXJzIHN1YmNsYXNzZWQgZnJvbSB0aGlzIGRlZmluaXRpb25cbmNsYXNzIEJhc2VSb3V0ZXIgZXh0ZW5kcyBCYWNrYm9uZS5Sb3V0aW5nLlJvdXRlclxuXG4gIGluaXRpYWxpemU6IChvcHRpb25zKSAtPiBAY29udGFpbmVyID0gb3B0aW9ucy5jb250YWluZXJcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gQmFzZVJvdXRlclxuIiwiXG5jbGFzcyBOYXZDaGlsZCBleHRlbmRzIE1uLkxheW91dFZpZXdcbiAgdGFnTmFtZTogJ2xpJ1xuICBjbGFzc05hbWU6ICduYXYtaXRlbSdcbiAgdGVtcGxhdGU6IHJlcXVpcmUgJy4vdGVtcGxhdGVzL25hdl9jaGlsZCdcblxuICBiZWhhdmlvcnM6XG4gICAgU2VsZWN0YWJsZUNoaWxkOiB7fVxuXG4gIGNsYXNzTmFtZTogLT5cbiAgICBjc3MgPSAnbmF2LWl0ZW0nXG4gICAgY3NzICs9ICcgYWN0aXZlJyBpZiBAbW9kZWwuZ2V0KCdhY3RpdmUnKVxuICAgIGNzcyArPSAnIGRyb3Bkb3duJyBpZiBAbW9kZWwuZ2V0KCdkcm9wZG93bicpXG4gICAgcmV0dXJuIGNzc1xuXG4gIG9uUmVuZGVyOiAtPlxuICAgIEB0cmlnZ2VyTWV0aG9kKCdzZWxlY3RlZCcpIGlmIEBtb2RlbC5nZXQoJ2FjdGl2ZScpXG5cbiAgb25DbGljazogKGUpIC0+XG4gICAgcmV0dXJuIGlmIEBtb2RlbC5nZXQoJ2hyZWYnKVxuICAgIHJldHVybiBpZiBAbW9kZWwuZ2V0KCdkcm9wZG93bicpXG4gICAgcmV0dXJuIGlmIEAkZWwuaGFzQ2xhc3MoJ2FjdGl2ZScpXG4gICAgZT8ucHJldmVudERlZmF1bHQoKVxuICAgIEB0cmlnZ2VyTWV0aG9kKCdzZWxlY3RlZCcpXG4gICAgQCRlbC5hZGRDbGFzcygnYWN0aXZlJykuc2libGluZ3MoKS5yZW1vdmVDbGFzcygnYWN0aXZlJylcblxuIyAjICMgIyAjXG5cbmNsYXNzIE5hdkxpc3QgZXh0ZW5kcyBNbi5Db2xsZWN0aW9uVmlld1xuICB0YWdOYW1lOiAndWwnXG4gIGNoaWxkVmlldzogTmF2Q2hpbGRcblxuICBjbGFzc05hbWU6IC0+XG4gICAgY3NzID0gJ25hdidcbiAgICByZXR1cm4gY3NzICs9ICcgbmF2LXBpbGxzIG5hdi1zdGFja2VkJyAgaWYgQG9wdGlvbnMuc3RhY2tlZFxuICAgIHJldHVybiBjc3MgKz0gJyBuYXYtcGlsbHMnICAgICAgICAgICAgICBpZiBAb3B0aW9ucy5waWxsc1xuICAgIHJldHVybiBjc3MgKz0gJyBuYXYtdGFicydcblxuICBjaGlsZEV2ZW50czpcbiAgICAnc2VsZWN0ZWQnOiAnb25DaGlsZFNlbGVjdGVkJ1xuXG4gIG9uQ2hpbGRTZWxlY3RlZDogKHZpZXcpIC0+XG4gICAgQHRyaWdnZXIgJ25hdjpjaGFuZ2UnLCB2aWV3XG4gICAgcmV0dXJuIEB0cmlnZ2VyKHZpZXcubW9kZWwuZ2V0KCd0cmlnZ2VyJykpXG5cbiMgIyAjICMgI1xuXG5jbGFzcyBOYXZWaWV3IGV4dGVuZHMgTW4uTGF5b3V0Vmlld1xuICB0ZW1wbGF0ZTogcmVxdWlyZSAnLi90ZW1wbGF0ZXMvbmF2J1xuXG4gIHJlZ2lvbnM6XG4gICAgbmF2UmVnaW9uOiAgICAgICdbZGF0YS1yZWdpb249bmF2XSdcbiAgICBjb250ZW50UmVnaW9uOiAgJ1tkYXRhLXJlZ2lvbj1jb250ZW50XSdcblxuICAjIEluY2x1ZGVzIFZpZXdTdGF0ZSBiZWhhdmlvciBpZiB0aGUgc3RhdGVmdWwgb3B0aW9uIGhhcyBiZWVuIHNldFxuICBiZWhhdmlvcnM6IC0+XG4gICAgcmV0dXJuIHsgVmlld1N0YXRlOiB7IGtleTogQG5hdk9wdGlvbnMuc3RhdGVmdWwgfSB9IGlmIEBuYXZPcHRpb25zLnN0YXRlZnVsXG4gICAgcmV0dXJuIHt9XG5cbiAgIyBJdGVtcyBmb3IgTmF2TGlzdFxuICBuYXZJdGVtczogW3sgaWNvbjogJ2ZhLXRpbWVzJywgdGV4dDogJ0RlZmF1bHQgTmF2JywgdHJpZ2dlcjogJ2RlZmF1bHQnIH1dXG5cbiAgIyBPcHRpb25zIGZvciBOYXZMaXN0IC0gdGFicyAoZGVmYXVsdCkgLyBwaWxscyAvIHN0YWNrZWQgLyBkZWZhdWx0IC8gc3RhdGVmdWxcbiAgIyBuYXZPcHRpb25zOiB7IHBpbGxzOiB0cnVlLCBzdGFja2VkOiB0cnVlLCBzdGF0ZWZ1bDogJ3NvbWVLZXlGb3JMb2NhbFN0b3JhZ2UnIH1cbiAgbmF2T3B0aW9uczoge31cblxuICAjIEV2ZW50cyByZWdpc3RyeSBmb3IgbmF2SXRlbXNcbiAgbmF2RXZlbnRzOiB7fVxuXG4gIGluaXRpYWxpemU6IC0+XG4gICAgQG5hdk9wdGlvbnMgPSBfLnJlc3VsdChALCAnbmF2T3B0aW9ucycpIHx8IHt9XG4gICAgQG5hdkl0ZW1zICAgPSBfLnJlc3VsdChALCAnbmF2SXRlbXMnKVxuXG4gICAgIyBTZXRzIGFjdGl2ZSBuYXZcbiAgICB0cmlnZ2VyID0gQF9nZXRBY3RpdmVOYXYoKVxuICAgIHJldHVybiB1bmxlc3MgdHJpZ2dlclxuICAgIF8ubWFwKEBuYXZJdGVtcywgKGl0ZW0pIC0+XG4gICAgICAgIHJldHVybiBpdGVtLmFjdGl2ZSA9IHRydWUgaWYgaXRlbS50cmlnZ2VyID09IHRyaWdnZXJcbiAgICAgICAgcmV0dXJuIGl0ZW0uYWN0aXZlID0gZmFsc2VcbiAgICApXG5cbiAgdGVtcGxhdGVIZWxwZXJzOiAtPlxuICAgIHJldHVybiB7IHN0YWNrZWQ6IEBuYXZPcHRpb25zLnN0YWNrZWQgfHwgbnVsbCB9XG5cbiAgIyBHZXRzIGFjdGl2ZVRhYiBmcm9tIHN0YXRlIHx8IGRlZmF1bHRzIHx8IGZpcnN0XG4gIF9nZXRBY3RpdmVOYXY6ID0+XG4gICAgaWYgQG5hdk9wdGlvbnMuc3RhdGVmdWxcbiAgICAgIHN0YXRlID0gQGdldFN0YXRlKClcbiAgICAgIHJldHVybiBzdGF0ZSBpZiBzdGF0ZVxuXG4gICAgcmV0dXJuIF8uZmluZFdoZXJlKEBuYXZJdGVtcywgeyBkZWZhdWx0OiB0cnVlIH0pPy50cmlnZ2VyIHx8IG51bGxcblxuICAjIFNldHMgYWN0aXZlVGFiIG9uIGNoYW5nZVxuICBfc2V0QWN0aXZlTmF2OiAobmF2Q2hpbGRWaWV3KSAtPlxuICAgIEBhY3RpdmVOYXYgPSBuYXZDaGlsZFZpZXdcbiAgICByZXR1cm4gdW5sZXNzIEBuYXZPcHRpb25zLnN0YXRlZnVsXG4gICAgcmV0dXJuIEBzZXRTdGF0ZShuYXZDaGlsZFZpZXcubW9kZWwuZ2V0KCd0cmlnZ2VyJykpXG5cbiAgdHJpZ2dlckFjdGl2ZU5hdjogLT5cbiAgICBAYWN0aXZlTmF2Py50cmlnZ2VyKCdzZWxlY3RlZCcpXG5cbiAgc2hvd05hdlZpZXc6IC0+XG4gICAgIyBJbnN0YW50aWF0ZXMgQG5hdkNvbGxlY3Rpb25cbiAgICBAbmF2Q29sbGVjdGlvbiA9IG5ldyBCYWNrYm9uZS5Db2xsZWN0aW9uKEBuYXZJdGVtcylcblxuICAgICMgSW5zdGFudGlhdGVzIE5hdkxpc3QgdmlldyBhbmQgYmluZHMgZXZlbnRzIHRvIHRoaXMgdmlld1xuICAgIEBuYXZMaXN0ID0gbmV3IE5hdkxpc3QoIF8uZXh0ZW5kKEBuYXZPcHRpb25zLCB7IGNvbGxlY3Rpb246IEBuYXZDb2xsZWN0aW9uIH0pIClcbiAgICBAbmF2TGlzdC5vbiAnbmF2OmNoYW5nZScsIChuYXZDaGlsZFZpZXcpID0+IEBfc2V0QWN0aXZlTmF2KG5hdkNoaWxkVmlldylcbiAgICBNbi5iaW5kRW50aXR5RXZlbnRzKCBALCBAbmF2TGlzdCwgXy5yZXN1bHQoQCwgJ25hdkV2ZW50cycpIClcbiAgICBAbmF2UmVnaW9uLnNob3coQG5hdkxpc3QpXG5cbiAgb25SZW5kZXI6IC0+XG4gICAgQHNob3dOYXZWaWV3KClcblxuIyAjICMgIyAjXG5cbm1vZHVsZS5leHBvcnRzID0gTmF2Vmlld1xuIiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG47dmFyIGxvY2Fsc19mb3Jfd2l0aCA9IChsb2NhbHMgfHwge30pOyhmdW5jdGlvbiAoc3Bhbiwgc3RhY2tlZCkge1xuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPlwiKTtcbmlmICggc3RhY2tlZClcbntcbmJ1Zi5wdXNoKFwiPGRpdiBkYXRhLXJlZ2lvbj1cXFwibmF2XFxcIlwiICsgKGphZGUuY2xzKFtcImNvbC14cy1cIiArIChzcGFuKSArIFwiXCJdLCBbdHJ1ZV0pKSArIFwiPjwvZGl2PjxkaXYgZGF0YS1yZWdpb249XFxcImNvbnRlbnRcXFwiXCIgKyAoamFkZS5jbHMoW1wiY29sLXhzLVwiICsgKDEyLXNwYW4pICsgXCJcIl0sIFt0cnVlXSkpICsgXCI+PC9kaXY+XCIpO1xufVxuZWxzZVxue1xuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJjb2wteHMtMTJcXFwiPjxkaXYgY2xhc3M9XFxcInJvd1xcXCI+PGRpdiBkYXRhLXJlZ2lvbj1cXFwibmF2XFxcIiBjbGFzcz1cXFwiY29sLXhzLTEyXFxcIj48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJyb3cgbS10LTFcXFwiPjxkaXYgZGF0YS1yZWdpb249XFxcImNvbnRlbnRcXFwiIGNsYXNzPVxcXCJjb2wteHMtMTJcXFwiPjwvZGl2PjwvZGl2PjwvZGl2PlwiKTtcbn1cbmJ1Zi5wdXNoKFwiPC9kaXY+XCIpO30uY2FsbCh0aGlzLFwic3BhblwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGguc3Bhbjp0eXBlb2Ygc3BhbiE9PVwidW5kZWZpbmVkXCI/c3Bhbjp1bmRlZmluZWQsXCJzdGFja2VkXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5zdGFja2VkOnR5cGVvZiBzdGFja2VkIT09XCJ1bmRlZmluZWRcIj9zdGFja2VkOnVuZGVmaW5lZCkpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuO3ZhciBsb2NhbHNfZm9yX3dpdGggPSAobG9jYWxzIHx8IHt9KTsoZnVuY3Rpb24gKGRyb3Bkb3duLCBocmVmLCBpY29uLCBsaW5rQ3NzLCB0ZXh0LCB0cmlnZ2VyLCB1bmRlZmluZWQpIHtcbmlmICggIWRyb3Bkb3duKVxue1xuYnVmLnB1c2goXCI8YVwiICsgKGphZGUuYXR0cihcImhyZWZcIiwgaHJlZiwgdHJ1ZSwgZmFsc2UpKSArIChqYWRlLmF0dHIoXCJkYXRhLXRyaWdnZXJcIiwgdHJpZ2dlciwgdHJ1ZSwgZmFsc2UpKSArIChqYWRlLmNscyhbJ25hdi1saW5rJywnY3Vyc29yLXBvaW50ZXInLGxpbmtDc3NdLCBbbnVsbCxudWxsLHRydWVdKSkgKyBcIj5cIik7XG5pZiAoIGljb24pXG57XG5idWYucHVzaChcIjxpXCIgKyAoamFkZS5jbHMoWydmYScsJ2ZhLWZ3JyxpY29uXSwgW251bGwsbnVsbCx0cnVlXSkpICsgXCI+PC9pPiZuYnNwO1wiKTtcbn1cbmJ1Zi5wdXNoKChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IHRleHQpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvYT5cIik7XG59XG5lbHNlXG57XG5idWYucHVzaChcIjxhIGRhdGEtdG9nZ2xlPVxcXCJkcm9wZG93blxcXCIgY2xhc3M9XFxcIm5hdi1saW5rIGN1cnNvci1wb2ludGVyIGRyb3Bkb3duLXRvZ2dsZVxcXCI+XCIpO1xuaWYgKCBpY29uKVxue1xuYnVmLnB1c2goXCI8aVwiICsgKGphZGUuY2xzKFsnZmEnLCdmYS1mdycsaWNvbl0sIFtudWxsLG51bGwsdHJ1ZV0pKSArIFwiPjwvaT4mbmJzcDtcIik7XG59XG5idWYucHVzaCgoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSB0ZXh0KSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L2E+PGRpdiBjbGFzcz1cXFwiZHJvcGRvd24tbWVudSB3LTEwMFxcXCI+XCIpO1xuLy8gaXRlcmF0ZSBkcm9wZG93blxuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSBkcm9wZG93bjtcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIGl0ZW0gPSAkJG9ialskaW5kZXhdO1xuXG5idWYucHVzaChcIjxhIGNsYXNzPVxcXCJkcm9wZG93bi1pdGVtXFxcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IGl0ZW0udGV4dCkgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9hPlwiKTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciBpdGVtID0gJCRvYmpbJGluZGV4XTtcblxuYnVmLnB1c2goXCI8YSBjbGFzcz1cXFwiZHJvcGRvd24taXRlbVxcXCI+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBpdGVtLnRleHQpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvYT5cIik7XG4gICAgfVxuXG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbmJ1Zi5wdXNoKFwiPC9kaXY+XCIpO1xufX0uY2FsbCh0aGlzLFwiZHJvcGRvd25cIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLmRyb3Bkb3duOnR5cGVvZiBkcm9wZG93biE9PVwidW5kZWZpbmVkXCI/ZHJvcGRvd246dW5kZWZpbmVkLFwiaHJlZlwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGguaHJlZjp0eXBlb2YgaHJlZiE9PVwidW5kZWZpbmVkXCI/aHJlZjp1bmRlZmluZWQsXCJpY29uXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5pY29uOnR5cGVvZiBpY29uIT09XCJ1bmRlZmluZWRcIj9pY29uOnVuZGVmaW5lZCxcImxpbmtDc3NcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLmxpbmtDc3M6dHlwZW9mIGxpbmtDc3MhPT1cInVuZGVmaW5lZFwiP2xpbmtDc3M6dW5kZWZpbmVkLFwidGV4dFwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgudGV4dDp0eXBlb2YgdGV4dCE9PVwidW5kZWZpbmVkXCI/dGV4dDp1bmRlZmluZWQsXCJ0cmlnZ2VyXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC50cmlnZ2VyOnR5cGVvZiB0cmlnZ2VyIT09XCJ1bmRlZmluZWRcIj90cmlnZ2VyOnVuZGVmaW5lZCxcInVuZGVmaW5lZFwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgudW5kZWZpbmVkOnR5cGVvZiB1bmRlZmluZWQhPT1cInVuZGVmaW5lZFwiP3VuZGVmaW5lZDp1bmRlZmluZWQpKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJcbmNsYXNzIFBhZ2luYXRpb25WaWV3IGV4dGVuZHMgTW4uTGF5b3V0Vmlld1xuICB0YWdOYW1lOiAndWwnXG4gIHRlbXBsYXRlOiByZXF1aXJlICcuL3RlbXBsYXRlcy9wYWdpbmF0aW9uJ1xuXG4gIGNsYXNzTmFtZTogLT5cbiAgICByZXR1cm4gJ3BhZ2VyJyBpZiBAb3B0aW9ucy5wYWdlclxuICAgIHJldHVybiAncGFnaW5hdGlvbidcblxuICBnZXRUZW1wbGF0ZTogLT5cbiAgICByZXR1cm4gcmVxdWlyZSgnLi90ZW1wbGF0ZXMvcGFnZXInKSBpZiBAb3B0aW9ucy5wYWdlclxuICAgIHJldHVybiByZXF1aXJlICcuL3RlbXBsYXRlcy9wYWdpbmF0aW9uJ1xuXG4gIHVpOlxuICAgIGZpcnN0OiAnW2RhdGEtY2xpY2s9Zmlyc3RdJ1xuICAgIHByZXY6ICdbZGF0YS1jbGljaz1wcmV2XSdcbiAgICBwYWdlOiAnW2RhdGEtY2xpY2s9cGFnZV0nXG4gICAgbmV4dDogJ1tkYXRhLWNsaWNrPW5leHRdJ1xuICAgIGxhc3Q6ICdbZGF0YS1jbGljaz1sYXN0XSdcblxuICBldmVudHM6XG4gICAgJ2NsaWNrIEB1aS5maXJzdCc6ICdmaXJzdFBhZ2UnXG4gICAgJ2NsaWNrIEB1aS5wcmV2JzogJ3ByZXZQYWdlJ1xuICAgICdjbGljayBAdWkucGFnZSc6ICdnb1RvUGFnZSdcbiAgICAnY2xpY2sgQHVpLm5leHQnOiAnbmV4dFBhZ2UnXG4gICAgJ2NsaWNrIEB1aS5sYXN0JzogJ2xhc3RQYWdlJ1xuXG4gIGNvbGxlY3Rpb25FdmVudHM6XG4gICAgJ3Jlc2V0JzogICdyZW5kZXInXG5cbiAgIyAjICMgIyAjXG4gICMgUGFnaW5nIENhbGxiYWNrc1xuICBmaXJzdFBhZ2U6IC0+IEBjb2xsZWN0aW9uLmZpcnN0UGFnZSgpXG4gIHByZXZQYWdlOiAtPiAgQGNvbGxlY3Rpb24ucHJldlBhZ2UoKVxuICBuZXh0UGFnZTogLT4gIEBjb2xsZWN0aW9uLm5leHRQYWdlKClcbiAgbGFzdFBhZ2U6IC0+ICBAY29sbGVjdGlvbi5sYXN0UGFnZSgpXG5cbiAgZ29Ub1BhZ2U6IChlKSAtPlxuICAgIEBjb2xsZWN0aW9uLmdldFBhZ2UoIEAkKGUuY3VycmVudFRhcmdldCkuZGF0YSgncGFnZScpIClcbiAgI1xuICAjICMgIyAjICNcblxuICBvblJlbmRlcjogLT5cbiAgICBAc3RhdGUudG90YWxQYWdlcyA8PSAxICYmIEAkZWwuaGlkZSgpIHx8IEAkZWwuc2hvdygpXG5cbiAgdGVtcGxhdGVIZWxwZXJzOiAtPlxuICAgIHJldHVybiBAd2luZG93ZWRQYWdlTnVtYmVyKClcblxuICAjIFJldHVybnMgYXJyYXkgdGhhdCBsb29rIGxpa2UgWzEsMixcIi4uLlwiLDUsNiw3LDgsXCIuLi5cIiwgMTksMjBdXG4gICMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF4gICAgICAgICAgICBeICAgICAgICAgICAgIF5cbiAgIyAgICAgICAgICAgICAgICAgICAgICAgICBvdXRlcl93aW5kb3cgIGlubmVyX3dpbmRvdyAgb3V0ZXJfd2luZG93XG4gIHdpbmRvd2VkUGFnZU51bWJlcjogLT5cbiAgICBAc3RhdGUgPSBfLmNsb25lIEBjb2xsZWN0aW9uLnN0YXRlXG5cbiAgICAjIEZFQVRVUkUgLSB0aGlzIGNhbiB1c2UgYSB0aWdodGVuLXVwLiBXZSBzaG91bGQgYmUgYWJsZSB0byBzZXQgbWF4LXBhZ2VzLWRpc3BsYXllZCAobmFtZT8pXG4gICAgaW5uZXJfd2luZG93ID0gNFxuICAgIG91dGVyX3dpbmRvdyA9IDFcblxuICAgIHdpbmRvd19mcm9tID0gQHN0YXRlLmN1cnJlbnRQYWdlIC0gaW5uZXJfd2luZG93XG4gICAgd2luZG93X3RvICAgPSBAc3RhdGUuY3VycmVudFBhZ2UgKyBpbm5lcl93aW5kb3dcblxuICAgIGlmIHdpbmRvd190byA+IEBzdGF0ZS50b3RhbFBhZ2VzXG4gICAgICB3aW5kb3dfZnJvbSAtPSB3aW5kb3dfdG8gLSBAc3RhdGUudG90YWxQYWdlc1xuICAgICAgd2luZG93X3RvICAgID0gQHN0YXRlLnRvdGFsUGFnZXNcblxuICAgIGlmIHdpbmRvd19mcm9tIDwgMVxuICAgICAgd2luZG93X3RvICArPSAxIC0gd2luZG93X2Zyb21cbiAgICAgIHdpbmRvd19mcm9tID0gMVxuICAgICAgd2luZG93X3RvICAgPSBAc3RhdGUudG90YWxQYWdlcyBpZiB3aW5kb3dfdG8gPiBAc3RhdGUudG90YWxQYWdlc1xuXG4gICAgbWlkZGxlID0gW3dpbmRvd19mcm9tLi53aW5kb3dfdG9dXG5cbiAgICAjIENhbGN1bGF0ZSBMZWZ0XG4gICAgaWYgb3V0ZXJfd2luZG93ICsgMyA8IG1pZGRsZVswXVxuICAgICAgbGVmdCA9IFsxLi4ob3V0ZXJfd2luZG93ICsgMSldXG4gICAgICBsZWZ0LnB1c2ggXCIuLi5cIlxuICAgIGVsc2VcbiAgICAgIGxlZnQgPSBbMS4uLm1pZGRsZVswXV1cblxuICAgICMgQ2FsY3VsYXRlIFJpZ2h0XG4gICAgaWYgKEBzdGF0ZS50b3RhbFBhZ2VzIC0gb3V0ZXJfd2luZG93IC0gMikgPiBtaWRkbGVbbWlkZGxlLmxlbmd0aCAtIDFdXG4gICAgICByaWdodCA9IFsoQHN0YXRlLnRvdGFsUGFnZXMgLSBvdXRlcl93aW5kb3cpLi5Ac3RhdGUudG90YWxQYWdlc11cbiAgICAgIHJpZ2h0LnVuc2hpZnQgXCIuLi5cIlxuICAgIGVsc2VcbiAgICAgIHJpZ2h0X3N0YXJ0ID0gTWF0aC5taW4obWlkZGxlW21pZGRsZS5sZW5ndGggLSAxXSArIDEsIEBzdGF0ZS50b3RhbFBhZ2VzKVxuICAgICAgcmlnaHQgPSBbcmlnaHRfc3RhcnQuLkBzdGF0ZS50b3RhbFBhZ2VzXVxuICAgICAgcmlnaHQgPSBbXSBpZiByaWdodF9zdGFydCBpcyBAc3RhdGUudG90YWxQYWdlc1xuXG4gICAgIyBTaG93biBwYWdlcz9cbiAgICBAc3RhdGUuc2hvd24gPSBsZWZ0LmNvbmNhdChtaWRkbGUuY29uY2F0KHJpZ2h0KSlcbiAgICBAc3RhdGUuZW1wdHkgPSBfLmlzRW1wdHkoIEBzdGF0ZS5zaG93biApXG5cbiAgICAjIENvdW50ZXJcbiAgICAjIEZFQVRVUkUgLSBpbmNsdWRlIGNvdW50ZXIgY29uZGl0aW9uYWxseVxuICAgIHN0YXJ0ID0gaWYgQHN0YXRlLmN1cnJlbnRQYWdlID4gMSB0aGVuICgoIEBzdGF0ZS5jdXJyZW50UGFnZSAtIDEgKSAqIEBzdGF0ZS5wYWdlU2l6ZSkgZWxzZSAxXG5cbiAgICBlbmQgPSAoKEBzdGF0ZS5jdXJyZW50UGFnZSAtIDEpICogQHN0YXRlLnBhZ2VTaXplKSArIEBzdGF0ZS5wYWdlU2l6ZVxuICAgIGVuZCA9IGlmIGVuZCA+IEBzdGF0ZS50b3RhbFJlY29yZHMgdGhlbiBAc3RhdGUudG90YWxSZWNvcmRzIGVsc2UgZW5kXG5cbiAgICBAc3RhdGUuZGlzcGxheVRleHQgPSBcIiN7c3RhcnR9IC0gI3tlbmR9IG9mICN7QHN0YXRlLnRvdGFsUmVjb3Jkc30gI3tAb3B0aW9ucy5wbHVyYWwgfHwgJ2l0ZW1zJ31cIlxuXG5cbiAgICByZXR1cm4gQHN0YXRlXG5cbiMgIyAjICMgI1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBhZ2luYXRpb25WaWV3XG4iLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcbjt2YXIgbG9jYWxzX2Zvcl93aXRoID0gKGxvY2FscyB8fCB7fSk7KGZ1bmN0aW9uIChhdHRycywgY3VycmVudFBhZ2UsIGRpc3BsYXlUZXh0LCB0b3RhbFBhZ2VzKSB7XG5hdHRycyA9IHsgc3R5bGU6ICdib3JkZXItcmFkaXVzOiAwOycgfVxuaWYgKCBjdXJyZW50UGFnZSAtIDEgPiAwKVxue1xuYnVmLnB1c2goXCI8bGkgY2xhc3M9XFxcInBhZ2VyLXByZXZcXFwiPjxhXCIgKyAoamFkZS5hdHRycyhqYWRlLm1lcmdlKFt7XCJkYXRhLWNsaWNrXCI6IFwicHJldlwiLFwiY2xhc3NcIjogXCJjdXJzb3ItcG9pbnRlciB6LWRlcHRoLTFcIn0sYXR0cnNdKSwgZmFsc2UpKSArIFwiPjxpIGNsYXNzPVxcXCJmYSBmYS1hbmdsZS1sZWZ0XFxcIj48L2k+PC9hPjwvbGk+XCIpO1xufVxuZWxzZVxue1xuYnVmLnB1c2goXCI8bGkgY2xhc3M9XFxcImRpc2FibGVkIHBhZ2VyLXByZXZcXFwiPjxhXCIgKyAoamFkZS5hdHRycyhqYWRlLm1lcmdlKFthdHRyc10pLCBmYWxzZSkpICsgXCI+PGkgY2xhc3M9XFxcImZhIGZhLWFuZ2xlLWxlZnRcXFwiPjwvaT48L2E+PC9saT5cIik7XG59XG5idWYucHVzaChcIjxsaT48YSBzdHlsZT1cXFwiYm9yZGVyOm5vbmU7YmFja2dyb3VuZDpub25lO1xcXCI+PGRpdiBjbGFzcz1cXFwidGV4dC1tdXRlZCB0ZXh0LWNlbnRlclxcXCI+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBkaXNwbGF5VGV4dCkgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9kaXY+PC9hPjwvbGk+XCIpO1xuaWYgKCBjdXJyZW50UGFnZSA8IHRvdGFsUGFnZXMpXG57XG5idWYucHVzaChcIjxsaSBjbGFzcz1cXFwicGFnZXItbmV4dFxcXCI+PGFcIiArIChqYWRlLmF0dHJzKGphZGUubWVyZ2UoW3tcImRhdGEtY2xpY2tcIjogXCJuZXh0XCIsXCJjbGFzc1wiOiBcImN1cnNvci1wb2ludGVyIHotZGVwdGgtMVwifSxhdHRyc10pLCBmYWxzZSkpICsgXCI+PGkgY2xhc3M9XFxcImZhIGZhLWFuZ2xlLXJpZ2h0XFxcIj48L2k+PC9hPjwvbGk+XCIpO1xufVxuZWxzZVxue1xuYnVmLnB1c2goXCI8bGkgY2xhc3M9XFxcImRpc2FibGVkIHBhZ2VyLW5leHRcXFwiPjxhXCIgKyAoamFkZS5hdHRycyhqYWRlLm1lcmdlKFthdHRyc10pLCBmYWxzZSkpICsgXCI+PGkgY2xhc3M9XFxcImZhIGZhLWFuZ2xlLXJpZ2h0XFxcIj48L2k+PC9hPjwvbGk+XCIpO1xufX0uY2FsbCh0aGlzLFwiYXR0cnNcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLmF0dHJzOnR5cGVvZiBhdHRycyE9PVwidW5kZWZpbmVkXCI/YXR0cnM6dW5kZWZpbmVkLFwiY3VycmVudFBhZ2VcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLmN1cnJlbnRQYWdlOnR5cGVvZiBjdXJyZW50UGFnZSE9PVwidW5kZWZpbmVkXCI/Y3VycmVudFBhZ2U6dW5kZWZpbmVkLFwiZGlzcGxheVRleHRcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLmRpc3BsYXlUZXh0OnR5cGVvZiBkaXNwbGF5VGV4dCE9PVwidW5kZWZpbmVkXCI/ZGlzcGxheVRleHQ6dW5kZWZpbmVkLFwidG90YWxQYWdlc1wiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgudG90YWxQYWdlczp0eXBlb2YgdG90YWxQYWdlcyE9PVwidW5kZWZpbmVkXCI/dG90YWxQYWdlczp1bmRlZmluZWQpKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcbjt2YXIgbG9jYWxzX2Zvcl93aXRoID0gKGxvY2FscyB8fCB7fSk7KGZ1bmN0aW9uIChjdXJyZW50UGFnZSwgZW1wdHksIHNob3duLCB0b3RhbFBhZ2VzLCB1bmRlZmluZWQpIHtcbmlmICggY3VycmVudFBhZ2UgIT0gMSlcbntcbmJ1Zi5wdXNoKFwiPGxpIGNsYXNzPVxcXCJwYWdlLWl0ZW1cXFwiPjxhIGRhdGEtY2xpY2s9XFxcImZpcnN0XFxcIiBjbGFzcz1cXFwicGFnZS1saW5rIGN1cnNvci1wb2ludGVyXFxcIj48aSBjbGFzcz1cXFwiZmEgZmEtYW5nbGUtZG91YmxlLWxlZnRcXFwiPjwvaT48L2E+PC9saT5cIik7XG59XG5lbHNlXG57XG5idWYucHVzaChcIjxsaSBjbGFzcz1cXFwicGFnZS1pdGVtIGRpc2FibGVkXFxcIj48YSBjbGFzcz1cXFwicGFnZS1saW5rXFxcIj48aSBjbGFzcz1cXFwiZmEgZmEtYW5nbGUtZG91YmxlLWxlZnRcXFwiPjwvaT48L2E+PC9saT5cIik7XG59XG5pZiAoIGN1cnJlbnRQYWdlIC0gMSA+IDApXG57XG5idWYucHVzaChcIjxsaSBjbGFzcz1cXFwicGFnZS1pdGVtXFxcIj48YSBkYXRhLWNsaWNrPVxcXCJwcmV2XFxcIiBjbGFzcz1cXFwicGFnZS1saW5rIGN1cnNvci1wb2ludGVyXFxcIj48aSBjbGFzcz1cXFwiZmEgZmEtYW5nbGUtbGVmdFxcXCI+PC9pPjwvYT48L2xpPlwiKTtcbn1cbmVsc2VcbntcbmJ1Zi5wdXNoKFwiPGxpIGNsYXNzPVxcXCJwYWdlLWl0ZW0gZGlzYWJsZWRcXFwiPjxhIGNsYXNzPVxcXCJwYWdlLWxpbmtcXFwiPjxpIGNsYXNzPVxcXCJmYSBmYS1hbmdsZS1sZWZ0XFxcIj48L2k+PC9hPjwvbGk+XCIpO1xufVxuaWYgKCAhZW1wdHkpXG57XG4vLyBpdGVyYXRlIHNob3duXG47KGZ1bmN0aW9uKCl7XG4gIHZhciAkJG9iaiA9IHNob3duO1xuICBpZiAoJ251bWJlcicgPT0gdHlwZW9mICQkb2JqLmxlbmd0aCkge1xuXG4gICAgZm9yICh2YXIgJGluZGV4ID0gMCwgJCRsID0gJCRvYmoubGVuZ3RoOyAkaW5kZXggPCAkJGw7ICRpbmRleCsrKSB7XG4gICAgICB2YXIgcGFnZSA9ICQkb2JqWyRpbmRleF07XG5cbmlmICggcGFnZSA9PSAnLi4uJylcbntcbmJ1Zi5wdXNoKFwiPGxpIGNsYXNzPVxcXCJwYWdlLWl0ZW1cXFwiPjxhIGNsYXNzPVxcXCJwYWdlLWxpbmsgZGlzYWJsZWRcXFwiPi4uLjwvYT48L2xpPlwiKTtcbn1cbmVsc2VcbntcbmlmICggcGFnZSA9PSBjdXJyZW50UGFnZSlcbntcbmJ1Zi5wdXNoKFwiPGxpIGNsYXNzPVxcXCJwYWdlLWl0ZW0gYWN0aXZlXFxcIj48YSBjbGFzcz1cXFwicGFnZS1saW5rXFxcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IHBhZ2UpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvYT48L2xpPlwiKTtcbn1cbmVsc2VcbntcbmJ1Zi5wdXNoKFwiPGxpIGNsYXNzPVxcXCJwYWdlLWl0ZW1cXFwiPjxhIGRhdGEtY2xpY2s9XFxcInBhZ2VcXFwiXCIgKyAoamFkZS5hdHRyKFwiZGF0YS1wYWdlXCIsIHBhZ2UsIHRydWUsIGZhbHNlKSkgKyBcIiBjbGFzcz1cXFwicGFnZS1saW5rIGN1cnNvci1wb2ludGVyXFxcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IHBhZ2UpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvYT48L2xpPlwiKTtcbn1cbn1cbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciBwYWdlID0gJCRvYmpbJGluZGV4XTtcblxuaWYgKCBwYWdlID09ICcuLi4nKVxue1xuYnVmLnB1c2goXCI8bGkgY2xhc3M9XFxcInBhZ2UtaXRlbVxcXCI+PGEgY2xhc3M9XFxcInBhZ2UtbGluayBkaXNhYmxlZFxcXCI+Li4uPC9hPjwvbGk+XCIpO1xufVxuZWxzZVxue1xuaWYgKCBwYWdlID09IGN1cnJlbnRQYWdlKVxue1xuYnVmLnB1c2goXCI8bGkgY2xhc3M9XFxcInBhZ2UtaXRlbSBhY3RpdmVcXFwiPjxhIGNsYXNzPVxcXCJwYWdlLWxpbmtcXFwiPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gcGFnZSkgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9hPjwvbGk+XCIpO1xufVxuZWxzZVxue1xuYnVmLnB1c2goXCI8bGkgY2xhc3M9XFxcInBhZ2UtaXRlbVxcXCI+PGEgZGF0YS1jbGljaz1cXFwicGFnZVxcXCJcIiArIChqYWRlLmF0dHIoXCJkYXRhLXBhZ2VcIiwgcGFnZSwgdHJ1ZSwgZmFsc2UpKSArIFwiIGNsYXNzPVxcXCJwYWdlLWxpbmsgY3Vyc29yLXBvaW50ZXJcXFwiPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gcGFnZSkgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9hPjwvbGk+XCIpO1xufVxufVxuICAgIH1cblxuICB9XG59KS5jYWxsKHRoaXMpO1xuXG59XG5pZiAoIGN1cnJlbnRQYWdlIDwgdG90YWxQYWdlcylcbntcbmJ1Zi5wdXNoKFwiPGxpIGNsYXNzPVxcXCJwYWdlLWl0ZW1cXFwiPjxhIGRhdGEtY2xpY2s9XFxcIm5leHRcXFwiIGNsYXNzPVxcXCJwYWdlLWxpbmsgY3Vyc29yLXBvaW50ZXJcXFwiPjxpIGNsYXNzPVxcXCJmYSBmYS1hbmdsZS1yaWdodFxcXCI+PC9pPjwvYT48L2xpPlwiKTtcbn1cbmVsc2VcbntcbmJ1Zi5wdXNoKFwiPGxpIGNsYXNzPVxcXCJwYWdlLWl0ZW0gZGlzYWJsZWRcXFwiPjxhIGNsYXNzPVxcXCJwYWdlLWxpbmtcXFwiPjxpIGNsYXNzPVxcXCJmYSBmYS1hbmdsZS1yaWdodFxcXCI+PC9pPjwvYT48L2xpPlwiKTtcbn1cbmlmICggY3VycmVudFBhZ2UgIT0gdG90YWxQYWdlcylcbntcbmJ1Zi5wdXNoKFwiPGxpIGNsYXNzPVxcXCJwYWdlLWl0ZW1cXFwiPjxhIGRhdGEtY2xpY2s9XFxcImxhc3RcXFwiIGNsYXNzPVxcXCJwYWdlLWxpbmsgY3Vyc29yLXBvaW50ZXJcXFwiPjxpIGNsYXNzPVxcXCJmYSBmYS1hbmdsZS1kb3VibGUtcmlnaHRcXFwiPjwvaT48L2E+PC9saT5cIik7XG59XG5lbHNlXG57XG5idWYucHVzaChcIjxsaSBjbGFzcz1cXFwicGFnZS1pdGVtIGRpc2FibGVkXFxcIj48YSBjbGFzcz1cXFwicGFnZS1saW5rXFxcIj48aSBjbGFzcz1cXFwiZmEgZmEtYW5nbGUtZG91YmxlLXJpZ2h0XFxcIj48L2k+PC9hPjwvbGk+XCIpO1xufX0uY2FsbCh0aGlzLFwiY3VycmVudFBhZ2VcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLmN1cnJlbnRQYWdlOnR5cGVvZiBjdXJyZW50UGFnZSE9PVwidW5kZWZpbmVkXCI/Y3VycmVudFBhZ2U6dW5kZWZpbmVkLFwiZW1wdHlcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLmVtcHR5OnR5cGVvZiBlbXB0eSE9PVwidW5kZWZpbmVkXCI/ZW1wdHk6dW5kZWZpbmVkLFwic2hvd25cIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnNob3duOnR5cGVvZiBzaG93biE9PVwidW5kZWZpbmVkXCI/c2hvd246dW5kZWZpbmVkLFwidG90YWxQYWdlc1wiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgudG90YWxQYWdlczp0eXBlb2YgdG90YWxQYWdlcyE9PVwidW5kZWZpbmVkXCI/dG90YWxQYWdlczp1bmRlZmluZWQsXCJ1bmRlZmluZWRcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnVuZGVmaW5lZDp0eXBlb2YgdW5kZWZpbmVkIT09XCJ1bmRlZmluZWRcIj91bmRlZmluZWQ6dW5kZWZpbmVkKSk7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwiKGZ1bmN0aW9uIChnbG9iYWwpe1xuKGZ1bmN0aW9uKGYpe2lmKHR5cGVvZiBleHBvcnRzPT09XCJvYmplY3RcIiYmdHlwZW9mIG1vZHVsZSE9PVwidW5kZWZpbmVkXCIpe21vZHVsZS5leHBvcnRzPWYoKX1lbHNlIGlmKHR5cGVvZiBkZWZpbmU9PT1cImZ1bmN0aW9uXCImJmRlZmluZS5hbWQpe2RlZmluZShbXSxmKX1lbHNle3ZhciBnO2lmKHR5cGVvZiB3aW5kb3chPT1cInVuZGVmaW5lZFwiKXtnPXdpbmRvd31lbHNlIGlmKHR5cGVvZiBnbG9iYWwhPT1cInVuZGVmaW5lZFwiKXtnPWdsb2JhbH1lbHNlIGlmKHR5cGVvZiBzZWxmIT09XCJ1bmRlZmluZWRcIil7Zz1zZWxmfWVsc2V7Zz10aGlzfWcuamFkZSA9IGYoKX19KShmdW5jdGlvbigpe3ZhciBkZWZpbmUsbW9kdWxlLGV4cG9ydHM7cmV0dXJuIChmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pKHsxOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBNZXJnZSB0d28gYXR0cmlidXRlIG9iamVjdHMgZ2l2aW5nIHByZWNlZGVuY2VcbiAqIHRvIHZhbHVlcyBpbiBvYmplY3QgYGJgLiBDbGFzc2VzIGFyZSBzcGVjaWFsLWNhc2VkXG4gKiBhbGxvd2luZyBmb3IgYXJyYXlzIGFuZCBtZXJnaW5nL2pvaW5pbmcgYXBwcm9wcmlhdGVseVxuICogcmVzdWx0aW5nIGluIGEgc3RyaW5nLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBhXG4gKiBAcGFyYW0ge09iamVjdH0gYlxuICogQHJldHVybiB7T2JqZWN0fSBhXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLm1lcmdlID0gZnVuY3Rpb24gbWVyZ2UoYSwgYikge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgIHZhciBhdHRycyA9IGFbMF07XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhdHRycyA9IG1lcmdlKGF0dHJzLCBhW2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIGF0dHJzO1xuICB9XG4gIHZhciBhYyA9IGFbJ2NsYXNzJ107XG4gIHZhciBiYyA9IGJbJ2NsYXNzJ107XG5cbiAgaWYgKGFjIHx8IGJjKSB7XG4gICAgYWMgPSBhYyB8fCBbXTtcbiAgICBiYyA9IGJjIHx8IFtdO1xuICAgIGlmICghQXJyYXkuaXNBcnJheShhYykpIGFjID0gW2FjXTtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoYmMpKSBiYyA9IFtiY107XG4gICAgYVsnY2xhc3MnXSA9IGFjLmNvbmNhdChiYykuZmlsdGVyKG51bGxzKTtcbiAgfVxuXG4gIGZvciAodmFyIGtleSBpbiBiKSB7XG4gICAgaWYgKGtleSAhPSAnY2xhc3MnKSB7XG4gICAgICBhW2tleV0gPSBiW2tleV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGE7XG59O1xuXG4vKipcbiAqIEZpbHRlciBudWxsIGB2YWxgcy5cbiAqXG4gKiBAcGFyYW0geyp9IHZhbFxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIG51bGxzKHZhbCkge1xuICByZXR1cm4gdmFsICE9IG51bGwgJiYgdmFsICE9PSAnJztcbn1cblxuLyoqXG4gKiBqb2luIGFycmF5IGFzIGNsYXNzZXMuXG4gKlxuICogQHBhcmFtIHsqfSB2YWxcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZXhwb3J0cy5qb2luQ2xhc3NlcyA9IGpvaW5DbGFzc2VzO1xuZnVuY3Rpb24gam9pbkNsYXNzZXModmFsKSB7XG4gIHJldHVybiAoQXJyYXkuaXNBcnJheSh2YWwpID8gdmFsLm1hcChqb2luQ2xhc3NlcykgOlxuICAgICh2YWwgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpID8gT2JqZWN0LmtleXModmFsKS5maWx0ZXIoZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gdmFsW2tleV07IH0pIDpcbiAgICBbdmFsXSkuZmlsdGVyKG51bGxzKS5qb2luKCcgJyk7XG59XG5cbi8qKlxuICogUmVuZGVyIHRoZSBnaXZlbiBjbGFzc2VzLlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IGNsYXNzZXNcbiAqIEBwYXJhbSB7QXJyYXkuPEJvb2xlYW4+fSBlc2NhcGVkXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydHMuY2xzID0gZnVuY3Rpb24gY2xzKGNsYXNzZXMsIGVzY2FwZWQpIHtcbiAgdmFyIGJ1ZiA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGNsYXNzZXMubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoZXNjYXBlZCAmJiBlc2NhcGVkW2ldKSB7XG4gICAgICBidWYucHVzaChleHBvcnRzLmVzY2FwZShqb2luQ2xhc3NlcyhbY2xhc3Nlc1tpXV0pKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJ1Zi5wdXNoKGpvaW5DbGFzc2VzKGNsYXNzZXNbaV0pKTtcbiAgICB9XG4gIH1cbiAgdmFyIHRleHQgPSBqb2luQ2xhc3NlcyhidWYpO1xuICBpZiAodGV4dC5sZW5ndGgpIHtcbiAgICByZXR1cm4gJyBjbGFzcz1cIicgKyB0ZXh0ICsgJ1wiJztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cbn07XG5cblxuZXhwb3J0cy5zdHlsZSA9IGZ1bmN0aW9uICh2YWwpIHtcbiAgaWYgKHZhbCAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyh2YWwpLm1hcChmdW5jdGlvbiAoc3R5bGUpIHtcbiAgICAgIHJldHVybiBzdHlsZSArICc6JyArIHZhbFtzdHlsZV07XG4gICAgfSkuam9pbignOycpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB2YWw7XG4gIH1cbn07XG4vKipcbiAqIFJlbmRlciB0aGUgZ2l2ZW4gYXR0cmlidXRlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcbiAqIEBwYXJhbSB7U3RyaW5nfSB2YWxcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gZXNjYXBlZFxuICogQHBhcmFtIHtCb29sZWFufSB0ZXJzZVxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnRzLmF0dHIgPSBmdW5jdGlvbiBhdHRyKGtleSwgdmFsLCBlc2NhcGVkLCB0ZXJzZSkge1xuICBpZiAoa2V5ID09PSAnc3R5bGUnKSB7XG4gICAgdmFsID0gZXhwb3J0cy5zdHlsZSh2YWwpO1xuICB9XG4gIGlmICgnYm9vbGVhbicgPT0gdHlwZW9mIHZhbCB8fCBudWxsID09IHZhbCkge1xuICAgIGlmICh2YWwpIHtcbiAgICAgIHJldHVybiAnICcgKyAodGVyc2UgPyBrZXkgOiBrZXkgKyAnPVwiJyArIGtleSArICdcIicpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICB9IGVsc2UgaWYgKDAgPT0ga2V5LmluZGV4T2YoJ2RhdGEnKSAmJiAnc3RyaW5nJyAhPSB0eXBlb2YgdmFsKSB7XG4gICAgaWYgKEpTT04uc3RyaW5naWZ5KHZhbCkuaW5kZXhPZignJicpICE9PSAtMSkge1xuICAgICAgY29uc29sZS53YXJuKCdTaW5jZSBKYWRlIDIuMC4wLCBhbXBlcnNhbmRzIChgJmApIGluIGRhdGEgYXR0cmlidXRlcyAnICtcbiAgICAgICAgICAgICAgICAgICAnd2lsbCBiZSBlc2NhcGVkIHRvIGAmYW1wO2AnKTtcbiAgICB9O1xuICAgIGlmICh2YWwgJiYgdHlwZW9mIHZhbC50b0lTT1N0cmluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc29sZS53YXJuKCdKYWRlIHdpbGwgZWxpbWluYXRlIHRoZSBkb3VibGUgcXVvdGVzIGFyb3VuZCBkYXRlcyBpbiAnICtcbiAgICAgICAgICAgICAgICAgICAnSVNPIGZvcm0gYWZ0ZXIgMi4wLjAnKTtcbiAgICB9XG4gICAgcmV0dXJuICcgJyArIGtleSArIFwiPSdcIiArIEpTT04uc3RyaW5naWZ5KHZhbCkucmVwbGFjZSgvJy9nLCAnJmFwb3M7JykgKyBcIidcIjtcbiAgfSBlbHNlIGlmIChlc2NhcGVkKSB7XG4gICAgaWYgKHZhbCAmJiB0eXBlb2YgdmFsLnRvSVNPU3RyaW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ0phZGUgd2lsbCBzdHJpbmdpZnkgZGF0ZXMgaW4gSVNPIGZvcm0gYWZ0ZXIgMi4wLjAnKTtcbiAgICB9XG4gICAgcmV0dXJuICcgJyArIGtleSArICc9XCInICsgZXhwb3J0cy5lc2NhcGUodmFsKSArICdcIic7XG4gIH0gZWxzZSB7XG4gICAgaWYgKHZhbCAmJiB0eXBlb2YgdmFsLnRvSVNPU3RyaW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ0phZGUgd2lsbCBzdHJpbmdpZnkgZGF0ZXMgaW4gSVNPIGZvcm0gYWZ0ZXIgMi4wLjAnKTtcbiAgICB9XG4gICAgcmV0dXJuICcgJyArIGtleSArICc9XCInICsgdmFsICsgJ1wiJztcbiAgfVxufTtcblxuLyoqXG4gKiBSZW5kZXIgdGhlIGdpdmVuIGF0dHJpYnV0ZXMgb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEBwYXJhbSB7T2JqZWN0fSBlc2NhcGVkXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydHMuYXR0cnMgPSBmdW5jdGlvbiBhdHRycyhvYmosIHRlcnNlKXtcbiAgdmFyIGJ1ZiA9IFtdO1xuXG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqKTtcblxuICBpZiAoa2V5cy5sZW5ndGgpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgIHZhciBrZXkgPSBrZXlzW2ldXG4gICAgICAgICwgdmFsID0gb2JqW2tleV07XG5cbiAgICAgIGlmICgnY2xhc3MnID09IGtleSkge1xuICAgICAgICBpZiAodmFsID0gam9pbkNsYXNzZXModmFsKSkge1xuICAgICAgICAgIGJ1Zi5wdXNoKCcgJyArIGtleSArICc9XCInICsgdmFsICsgJ1wiJyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJ1Zi5wdXNoKGV4cG9ydHMuYXR0cihrZXksIHZhbCwgZmFsc2UsIHRlcnNlKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGJ1Zi5qb2luKCcnKTtcbn07XG5cbi8qKlxuICogRXNjYXBlIHRoZSBnaXZlbiBzdHJpbmcgb2YgYGh0bWxgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBodG1sXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG52YXIgamFkZV9lbmNvZGVfaHRtbF9ydWxlcyA9IHtcbiAgJyYnOiAnJmFtcDsnLFxuICAnPCc6ICcmbHQ7JyxcbiAgJz4nOiAnJmd0OycsXG4gICdcIic6ICcmcXVvdDsnXG59O1xudmFyIGphZGVfbWF0Y2hfaHRtbCA9IC9bJjw+XCJdL2c7XG5cbmZ1bmN0aW9uIGphZGVfZW5jb2RlX2NoYXIoYykge1xuICByZXR1cm4gamFkZV9lbmNvZGVfaHRtbF9ydWxlc1tjXSB8fCBjO1xufVxuXG5leHBvcnRzLmVzY2FwZSA9IGphZGVfZXNjYXBlO1xuZnVuY3Rpb24gamFkZV9lc2NhcGUoaHRtbCl7XG4gIHZhciByZXN1bHQgPSBTdHJpbmcoaHRtbCkucmVwbGFjZShqYWRlX21hdGNoX2h0bWwsIGphZGVfZW5jb2RlX2NoYXIpO1xuICBpZiAocmVzdWx0ID09PSAnJyArIGh0bWwpIHJldHVybiBodG1sO1xuICBlbHNlIHJldHVybiByZXN1bHQ7XG59O1xuXG4vKipcbiAqIFJlLXRocm93IHRoZSBnaXZlbiBgZXJyYCBpbiBjb250ZXh0IHRvIHRoZVxuICogdGhlIGphZGUgaW4gYGZpbGVuYW1lYCBhdCB0aGUgZ2l2ZW4gYGxpbmVub2AuXG4gKlxuICogQHBhcmFtIHtFcnJvcn0gZXJyXG4gKiBAcGFyYW0ge1N0cmluZ30gZmlsZW5hbWVcbiAqIEBwYXJhbSB7U3RyaW5nfSBsaW5lbm9cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmV4cG9ydHMucmV0aHJvdyA9IGZ1bmN0aW9uIHJldGhyb3coZXJyLCBmaWxlbmFtZSwgbGluZW5vLCBzdHIpe1xuICBpZiAoIShlcnIgaW5zdGFuY2VvZiBFcnJvcikpIHRocm93IGVycjtcbiAgaWYgKCh0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnIHx8ICFmaWxlbmFtZSkgJiYgIXN0cikge1xuICAgIGVyci5tZXNzYWdlICs9ICcgb24gbGluZSAnICsgbGluZW5vO1xuICAgIHRocm93IGVycjtcbiAgfVxuICB0cnkge1xuICAgIHN0ciA9IHN0ciB8fCByZXF1aXJlKCdmcycpLnJlYWRGaWxlU3luYyhmaWxlbmFtZSwgJ3V0ZjgnKVxuICB9IGNhdGNoIChleCkge1xuICAgIHJldGhyb3coZXJyLCBudWxsLCBsaW5lbm8pXG4gIH1cbiAgdmFyIGNvbnRleHQgPSAzXG4gICAgLCBsaW5lcyA9IHN0ci5zcGxpdCgnXFxuJylcbiAgICAsIHN0YXJ0ID0gTWF0aC5tYXgobGluZW5vIC0gY29udGV4dCwgMClcbiAgICAsIGVuZCA9IE1hdGgubWluKGxpbmVzLmxlbmd0aCwgbGluZW5vICsgY29udGV4dCk7XG5cbiAgLy8gRXJyb3IgY29udGV4dFxuICB2YXIgY29udGV4dCA9IGxpbmVzLnNsaWNlKHN0YXJ0LCBlbmQpLm1hcChmdW5jdGlvbihsaW5lLCBpKXtcbiAgICB2YXIgY3VyciA9IGkgKyBzdGFydCArIDE7XG4gICAgcmV0dXJuIChjdXJyID09IGxpbmVubyA/ICcgID4gJyA6ICcgICAgJylcbiAgICAgICsgY3VyclxuICAgICAgKyAnfCAnXG4gICAgICArIGxpbmU7XG4gIH0pLmpvaW4oJ1xcbicpO1xuXG4gIC8vIEFsdGVyIGV4Y2VwdGlvbiBtZXNzYWdlXG4gIGVyci5wYXRoID0gZmlsZW5hbWU7XG4gIGVyci5tZXNzYWdlID0gKGZpbGVuYW1lIHx8ICdKYWRlJykgKyAnOicgKyBsaW5lbm9cbiAgICArICdcXG4nICsgY29udGV4dCArICdcXG5cXG4nICsgZXJyLm1lc3NhZ2U7XG4gIHRocm93IGVycjtcbn07XG5cbmV4cG9ydHMuRGVidWdJdGVtID0gZnVuY3Rpb24gRGVidWdJdGVtKGxpbmVubywgZmlsZW5hbWUpIHtcbiAgdGhpcy5saW5lbm8gPSBsaW5lbm87XG4gIHRoaXMuZmlsZW5hbWUgPSBmaWxlbmFtZTtcbn1cblxufSx7XCJmc1wiOjJ9XSwyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxufSx7fV19LHt9LFsxXSkoMSlcbn0pO1xufSkuY2FsbCh0aGlzLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSkiXX0=
