function feedback(e) {
  console.log(e)
}(function() {
  "use strict";

  function n() {
    $(".throbber_page").show()
  }
  function r() {
    $(".throbber_page").hide()
  }
  function i() {
    $("body,html").animate({
      scrollTop: 0
    }, App.AnimationSpeed.Normal)
  }
  function s(e) {
    $(document).attr("title", e + " / Design & Code / Do a backflip")
  }
  window.App = {
    AnimationSpeed: {
      Normal: 500,
      Fast: 500,
      Slow: 2e3
    },
    Models: {
      Pages: Backbone.Collection.extend(),
      Projects: Backbone.Collection.extend()
    },
    Collections: {
      Pages: Backbone.Collection.extend(),
      Projects: Backbone.Collection.extend()
    },
    Views: {},
    Router: {},
    Templates: {}
  };
  $.ajaxPrefilter(function(e, t, n) {
    e.url = "data" + e.url
  });
  App.Collections.Portfolio = Backbone.Collection.extend({
    url: "/portfolio.json",
    parse: function(e) {
      App.Collections.Projects = new App.Collections.Projects(e.projects);
      App.Collections.Pages = new App.Collections.Pages(e.pages);
      return e
    }
  });
  App.Views.Portfolio = Backbone.View.extend({
    initialize: function() {
      _.bindAll(this, "fetchSuccess");
      this.collection = new App.Collections.Portfolio
    },
    render: function() {
      this.collection.fetch({
        success: function(e) {
          var t = new App.Views.PageList({
            pages: App.Collections.Pages
          }),
              n = new App.Views.ProjectList({
              projects: App.Collections.Projects
            })
        },
        error: function(e) {
          feedback("Problem. Problem.")
        }
      })
    },
    routeProject: function(e) {
      this.callback = _.bind(this.renderProject, {
        slug: e
      }, this);
      this.collection.length == 0 ? this.collection.fetch({
        success: this.fetchSuccess,
        error: this.fetchError
      }) : this.callback()
    },
    routePage: function(e) {
      this.callback = _.bind(this.renderPage, {
        slug: e
      }, this);
      this.collection.length == 0 ? this.collection.fetch({
        success: this.fetchSuccess,
        error: this.fetchError
      }) : this.callback()
    },
    renderProject: function(e) {
      var t = App.Collections.Projects.findWhere({
        slug: this.slug
      });
      if (_.isUndefined(t)) var n = App.Collections.Pages.findWhere({
        slug: "404"
      }),
          r = new App.Views.PageBuilder({
          model: n
        });
      else var i = new App.Views.PageProject({
        model: t
      })
    },
    renderPage: function(e) {
      var t = App.Collections.Pages.findWhere({
        slug: this.slug
      });
      if (_.isUndefined(t)) var t = App.Collections.Pages.findWhere({
        slug: "404"
      }),
          n = new App.Views.PageBuilder({
          model: t
        });
      else var n = new App.Views.PageBuilder({
        model: t
      })
    },
    fetchSuccess: function(e) {
      this.callback()
    },
    fetchError: function(e) {
      feedback(e)
    }
  });
  App.Views.PageDetailed = Backbone.View.extend({
    el: ".afeature",
    initialize: function(e) {
      this.options = e;
      this.render()
    },
    render: function() {
      var e = this,
          t = {
          page: this.options.page.toJSON()
          },
          n = Mustache.to_html(App.Templates.PageDetailed, t);
      e.$el.html(n);
      e.$el.find("img").wrap('<div class="placeholder" />').on("load", function() {
        $(this).fadeTo(App.AnimationSpeed.Normal, 1).unwrap()
      })
    }
  });
  App.Views.PageBuilder = Backbone.View.extend({
    el: ".wrapper",
    initialize: function() {
      n();
      this.render()
    },
    render: function() {
      var e = this;
      e.$el.fadeTo(App.AnimationSpeed.Normal, 0, function() {
        $("body,html").scrollTop(0);
        var t = e.model.get("slug");
        if (t == "projects") {
          var n = Mustache.to_html(App.Templates.PageProjects);
          e.$el.html(n);
          var i = new App.Views.ProjectList({
            projects: App.Collections.Projects,
            count: 0
          })
        } else if (t == "profile") {
          var o = Mustache.to_html(App.Templates.PageProfile);
          e.$el.html(o);
          var u = new App.Views.PageDetailed({
            page: e.model
          })
        } else {
          var a = Mustache.to_html(App.Templates.PageWelcome);
          e.$el.html(a);
          var f = new App.Views.PageDetailed({
            page: e.model
          }),
              i = new App.Views.ProjectList({
              projects: App.Collections.Projects,
              count: 6
            })
        }
        var l = App.Collections.Pages.findWhere({
          slug: "header"
        }),
            c = new App.Views.PageDetailed({
            el: $(".header"),
            page: l
          }),
            l = App.Collections.Pages.findWhere({
            slug: "contact"
          }),
            h = new App.Views.PageDetailed({
            el: $(".contact"),
            page: l
          }),
            l = App.Collections.Pages.findWhere({
            slug: "footer"
          }),
            p = new App.Views.PageDetailed({
            el: $(".footer"),
            page: l
          });
        s(e.model.get("title"));
        r();
        e.$el.fadeTo(App.AnimationSpeed.Normal, 1)
      })
    }
  });
  App.Views.PageProject = Backbone.View.extend({
    el: ".wrapper",
    initialize: function() {
      n();
      this.render()
    },
    render: function() {
      var e = this;
      if ($(".project").length) var t = new App.Views.ProjectDetailed({
        model: e.model
      });
      else e.$el.fadeTo(App.AnimationSpeed.Normal, 0, function() {
        $("body,html").scrollTop(0);
        var t = Mustache.to_html(App.Templates.PageProjects);
        e.$el.html(t);
        var n = new App.Views.ProjectDetailed({
          model: e.model
        }),
            r = App.Collections.Pages.findWhere({
            slug: "header"
          }),
            i = new App.Views.PageDetailed({
            el: $(".header"),
            page: r
          }),
            r = App.Collections.Pages.findWhere({
            slug: "contact"
          }),
            s = new App.Views.PageDetailed({
            el: $(".contact"),
            page: r
          }),
            r = App.Collections.Pages.findWhere({
            slug: "footer"
          }),
            o = new App.Views.PageDetailed({
            el: $(".footer"),
            page: r
          }),
            u = new App.Views.ProjectList({
            projects: App.Collections.Projects,
            count: 0
          });
        e.$el.fadeTo(App.AnimationSpeed.Normal, 1)
      })
    }
  });
  App.Views.ProjectList = Backbone.View.extend({
    el: ".projects",
    initialize: function(e) {
      this.options = e;
      this.render()
    },
    render: function() {
      var e = this;
      if (this.options.count == 0) var t = this.options.projects;
      else var t = new Backbone.Collection(this.options.projects.first(this.options.count));
      t.each(function(t) {
        var n = new App.Views.ProjectThumbnail({
          model: t
        });
        e.$el.append(n.el)
      });
      this.options.count != 0 && e.$el.append('<div class="row"><a href="#/projects" class="moreprojects">More projects</a></div>')
    }
  });
  App.Views.ProjectThumbnail = Backbone.View.extend({
    tagName: "div",
    className: "grid-unit",
    events: {
      "click a.thumbnail": "view"
    },
    view: function() {},
    initialize: function() {
      this.render()
    },
    render: function() {
      var e = this,
          t = {
          project: this.model.toJSON()
          },
          n = Mustache.to_html(App.Templates.ProjectThumbnail, t);
      e.$el.addClass("placeholder");
      e.$el.html(n);
      e.$el.find("img").on("load", function() {
        e.$el.children().fadeTo(App.AnimationSpeed.Normal, 1);
        e.$el.removeClass("placeholder")
      })
    }
  });
  App.Views.ProjectDetailed = Backbone.View.extend({
    el: ".project",
    initialize: function() {
      n();
      var e = this;
      $("body,html").animate({
        scrollTop: 0
      }, App.AnimationSpeed.Normal, function() {
        e.render()
      })
    },
    render: function() {
      var e = this,
          t = {
          project: this.model.toJSON(),
          current: this.model.collection.indexOf(this.model) + 1,
          total: this.model.collection.length
          },
          n = Mustache.to_html(App.Templates.ProjectDetailed, t);
      e.$el.slideUp(App.AnimationSpeed.Normal, function() {
        e.$el.html(n);
        var t = new App.Views.ProjectNavigation({
          model: e.model
        });
        e.$el.find("img").on("load", function() {
          s(e.model.get("title") + " / Project ");
          r();
          e.$el.slideDown(App.AnimationSpeed.Normal)
        })
      })
    }
  });
  App.Views.ProjectNavigation = Backbone.View.extend({
    el: ".navigation",
    events: {
      "click a.previous": "previousNav",
      "click a.next": "nextNav",
      "click a.close": "closeNav"
    },
    initialize: function(e) {
      this.options.index = this.model.collection.indexOf(e.model);
      _.isUndefined(this.model.collection.at(this.options.index - 1)) ? this.options.previous = this.model.collection.at(this.model.collection.length - 1) : this.options.previous = this.model.collection.at(this.options.index - 1);
      _.isUndefined(this.model.collection.at(this.options.index + 1)) ? this.options.next = this.model.collection.at(0) : this.options.next = this.model.collection.at(this.options.index + 1);
      this.render()
    },
    render: function() {
      var e = {
        previous: this.options.previous.toJSON(),
        next: this.options.next.toJSON()
      },
          t = Mustache.to_html(App.Templates.ProjectNavigation, e);
      this.$el.append(t)
    },
    previousNav: function() {},
    nextNav: function() {},
    closeNav: function(e) {
      e.preventDefault();
      $("body,html").animate({
        scrollTop: 0
      }, App.AnimationSpeed.Normal, function() {
        $(".project").slideUp("slow")
      });
      s("Projects");
      t.navigate("/projects")
    }
  });
  var e = new App.Views.Portfolio;
  App.Router.Router = Backbone.Router.extend({
    routes: {
      "": "index",
      "project/:slug": "project",
      ":slug": "page"
    },
    initialize: function() {
      return this.bind("route", this._trackPageView)
    },
    index: function() {
      e.routePage("welcome")
    },
    project: function(t) {
      e.routeProject(t)
    },
    page: function(t) {
      e.routePage(t)
    },
    _trackPageView: function() {
      var e = Backbone.history.getFragment();
      _gaq.push(["_trackPageview", "/#" + e])
    }
  });
  var t = new App.Router.Router;
  Backbone.history.start()
})(jQuery);
