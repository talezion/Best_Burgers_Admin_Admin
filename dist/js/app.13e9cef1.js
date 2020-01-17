(function(e) {
  function s(s) {
    for (
      var i, r, o = s[0], l = s[1], c = s[2], p = 0, h = [];
      p < o.length;
      p++
    )
      (r = o[p]),
        Object.prototype.hasOwnProperty.call(a, r) && a[r] && h.push(a[r][0]),
        (a[r] = 0);
    for (i in l) Object.prototype.hasOwnProperty.call(l, i) && (e[i] = l[i]);
    u && u(s);
    while (h.length) h.shift()();
    return n.push.apply(n, c || []), t();
  }
  function t() {
    for (var e, s = 0; s < n.length; s++) {
      for (var t = n[s], i = !0, o = 1; o < t.length; o++) {
        var l = t[o];
        0 !== a[l] && (i = !1);
      }
      i && (n.splice(s--, 1), (e = r((r.s = t[0]))));
    }
    return e;
  }
  var i = {},
    a = { app: 0 },
    n = [];
  function r(s) {
    if (i[s]) return i[s].exports;
    var t = (i[s] = { i: s, l: !1, exports: {} });
    return e[s].call(t.exports, t, t.exports, r), (t.l = !0), t.exports;
  }
  (r.m = e),
    (r.c = i),
    (r.d = function(e, s, t) {
      r.o(e, s) || Object.defineProperty(e, s, { enumerable: !0, get: t });
    }),
    (r.r = function(e) {
      "undefined" !== typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (r.t = function(e, s) {
      if ((1 & s && (e = r(e)), 8 & s)) return e;
      if (4 & s && "object" === typeof e && e && e.__esModule) return e;
      var t = Object.create(null);
      if (
        (r.r(t),
        Object.defineProperty(t, "default", { enumerable: !0, value: e }),
        2 & s && "string" != typeof e)
      )
        for (var i in e)
          r.d(
            t,
            i,
            function(s) {
              return e[s];
            }.bind(null, i)
          );
      return t;
    }),
    (r.n = function(e) {
      var s =
        e && e.__esModule
          ? function() {
              return e["default"];
            }
          : function() {
              return e;
            };
      return r.d(s, "a", s), s;
    }),
    (r.o = function(e, s) {
      return Object.prototype.hasOwnProperty.call(e, s);
    }),
    (r.p = "/");
  var o = (window["webpackJsonp"] = window["webpackJsonp"] || []),
    l = o.push.bind(o);
  (o.push = s), (o = o.slice());
  for (var c = 0; c < o.length; c++) s(o[c]);
  var u = l;
  n.push([0, "chunk-vendors"]), t();
})({
  0: function(e, s, t) {
    e.exports = t("56d7");
  },
  "105a": function(e, s, t) {
    "use strict";
    var i = t("4f9a"),
      a = t.n(i);
    a.a;
  },
  "14ab": function(e, s, t) {},
  "4f9a": function(e, s, t) {},
  5167: function(e, s, t) {
    "use strict";
    var i = t("e14f"),
      a = t.n(i);
    a.a;
  },
  "56d7": function(e, s, t) {
    "use strict";
    t.r(s);
    t("cadf"), t("551c"), t("f751"), t("097d");
    var i = t("2b0e"),
      a = t("5f5b"),
      n = t("8aa5"),
      r = t.n(n),
      o = {
        apiKey: "AIzaSyD7O7AFOSV-Oubp2AckMif9YsYDI7KVzzk",
        authDomain: "best-burgers-app-debug.firebaseapp.com",
        databaseURL: "https://best-burgers-app-debug.firebaseio.com",
        projectId: "best-burgers-app-debug",
        storageBucket: "best-burgers-app-debug.appspot.com",
        messagingSenderId: "242388502735",
        appId: "1:242388502735:web:14bb770b000a8609c04fba",
        measurementId: "G-WL7DK49K7X"
      },
      l = r.a.initializeApp(o),
      c = l.database(),
      u = c.ref("burgers"),
      p = c.ref("images_container"),
      h = c.ref("images_approved"),
      d = c.ref("images_rejected"),
      g = c.ref("images"),
      m = c.ref("users"),
      v = t("0ff2"),
      f = function() {
        var e = this,
          s = e.$createElement,
          t = e._self._c || s;
        return t("router-view");
      },
      _ = [],
      b = function() {
        var e = this,
          s = e.$createElement,
          t = e._self._c || s;
        return t("div", { staticClass: "container-fluid" }, [
          t(
            "div",
            {
              staticClass: "row text-center",
              staticStyle: { "margin-top": "10%" }
            },
            [
              t("div", { staticClass: "col-md-4" }),
              t(
                "div",
                { staticClass: "col-md-4 col-sm-12 align-self-center" },
                [
                  t("h3", { staticClass: "mb-5" }, [
                    e._v("Best Burgers Admin Login")
                  ]),
                  t("form", { on: { submit: e.loginClicked } }, [
                    t("div", { staticClass: "form-group" }, [
                      t("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: e.email,
                            expression: "email"
                          }
                        ],
                        staticClass: "form-control",
                        attrs: {
                          type: "email",
                          placeholder: "Email",
                          required: ""
                        },
                        domProps: { value: e.email },
                        on: {
                          input: function(s) {
                            s.target.composing || (e.email = s.target.value);
                          }
                        }
                      })
                    ]),
                    t("div", { staticClass: "form-group" }, [
                      t("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: e.password,
                            expression: "password"
                          }
                        ],
                        staticClass: "form-control",
                        attrs: {
                          type: "password",
                          placeholder: "Password",
                          required: ""
                        },
                        domProps: { value: e.password },
                        on: {
                          input: function(s) {
                            s.target.composing || (e.password = s.target.value);
                          }
                        }
                      })
                    ]),
                    t("input", {
                      staticClass: "btn btn-primary btn-block",
                      attrs: { type: "submit", value: "Login" }
                    })
                  ])
                ]
              ),
              e.showAnimation
                ? t(
                    "div",
                    { staticClass: "col-md-12" },
                    [t("br"), t("LoadingAnimation")],
                    1
                  )
                : e._e()
            ]
          )
        ]);
      },
      y = [],
      k =
        (t("ac6a"),
        function() {
          var e = this,
            s = e.$createElement;
          e._self._c;
          return e._m(0);
        }),
      w = [
        function() {
          var e = this,
            s = e.$createElement,
            t = e._self._c || s;
          return t("div", { staticClass: "lds-roller" }, [
            t("div"),
            t("div"),
            t("div"),
            t("div"),
            t("div"),
            t("div"),
            t("div"),
            t("div")
          ]);
        }
      ],
      C = { name: "LoadingAnimation" },
      A = C,
      x = (t("105a"), t("2877")),
      P = Object(x["a"])(A, k, w, !1, null, "bb8f76da", null),
      T = P.exports,
      D = {
        name: "Login",
        components: { LoadingAnimation: T },
        data: function() {
          return { email: "", password: "", showAnimation: !1 };
        },
        methods: {
          loginClicked: function(e) {
            var s = this;
            e.preventDefault();
            (this.showAnimation = !0),
              r.a
                .auth()
                .signInWithEmailAndPassword(this.email, this.password)
                .then(
                  function(e) {
                    m.orderByChild("email")
                      .equalTo(e.user.email)
                      .on("value", function(e) {
                        e.forEach(function(e) {
                          e.val().role && "admin" == e.val().role.toLowerCase()
                            ? s.$router.push("home")
                            : (r.a
                                .auth()
                                .signOut()
                                .then(function() {}),
                              alert("You are not an Admin!"));
                        });
                      });
                    s.showAnimation = !1;
                  },
                  function(e) {
                    alert(e.message), (s.showAnimation = !1);
                  }
                );
          }
        }
      },
      j = D,
      E = Object(x["a"])(j, b, y, !1, null, null, null),
      O = E.exports,
      B = { components: { Login: O } },
      K = B,
      I = Object(x["a"])(K, f, _, !1, null, null, null),
      N = I.exports,
      M = t("8c4f"),
      S = function() {
        var e = this,
          s = e.$createElement,
          t = e._self._c || s;
        return t(
          "div",
          [t("Navbar"), t("div", { staticClass: "container" }, [t("Tabs")], 1)],
          1
        );
      },
      $ = [],
      F =
        (t("a481"),
        function() {
          var e = this,
            s = e.$createElement,
            t = e._self._c || s;
          return t(
            "b-navbar",
            { attrs: { toggleable: "lg", type: "dark", variant: "primary" } },
            [
              t("b-navbar-brand", { attrs: { href: "#" } }, [
                e._v("Best Burgers")
              ]),
              t("b-navbar-toggle", { attrs: { target: "nav-collapse" } }),
              t(
                "b-collapse",
                { attrs: { id: "nav-collapse", "is-nav": "" } },
                [
                  t("b-navbar-nav", { staticClass: "ml-auto" }, [
                    t(
                      "button",
                      {
                        staticClass: "btn text-light",
                        attrs: { type: "button" },
                        on: { click: e.signoutClicked }
                      },
                      [e._v("Logout")]
                    )
                  ])
                ],
                1
              )
            ],
            1
          );
        }),
      L = [],
      q = t("d0b9"),
      V = {
        components: { "b-nav": q["a"] },
        methods: {
          signoutClicked: function() {
            var e = this;
            r.a
              .auth()
              .signOut()
              .then(function() {
                e.$router.replace("login");
              });
          }
        }
      },
      U = V,
      R = Object(x["a"])(U, F, L, !1, null, null, null),
      z = R.exports,
      Y = function() {
        var e = this,
          s = e.$createElement,
          t = e._self._c || s;
        return t(
          "div",
          [
            t(
              "b-tabs",
              { attrs: { "content-class": "mt-3" } },
              [
                t(
                  "b-tab",
                  { attrs: { title: "Burger Thumbnail Setting", active: "" } },
                  [t("ThumbnailComp", { attrs: { images: e.images } })],
                  1
                ),
                t(
                  "b-tab",
                  { attrs: { title: "Burger Images Validation" } },
                  [t("ImageValidationComp", { attrs: { images: e.images } })],
                  1
                ),
                t(
                  "b-tab",
                  { attrs: { title: "Burger Place Validation" } },
                  [t("BurgerPlaceValidation")],
                  1
                )
              ],
              1
            )
          ],
          1
        );
      },
      J = [],
      W = function() {
        var e = this,
          s = e.$createElement,
          t = e._self._c || s;
        return t(
          "div",
          { staticClass: "mt-3 row" },
          [
            t("div", { staticClass: "col-md-12 text-right mb-2" }, [
              t(
                "button",
                {
                  staticClass: "btn btn-danger mr-2",
                  attrs: { disabled: e.isPreviousDisabled },
                  on: { click: e.previousClicked }
                },
                [e._v("\n      Previous\n    ")]
              ),
              t(
                "button",
                {
                  staticClass: "btn btn-success",
                  attrs: { disabled: e.isNextDisabled },
                  on: { click: e.nextClicked }
                },
                [e._v("\n      Next\n    ")]
              )
            ]),
            t(
              "div",
              { staticClass: "col-md-12 text-center mb-2" },
              [
                e.showAlert
                  ? t(
                      "Alert",
                      {
                        attrs: { type: e.alertType },
                        on: { countDownEnded: e.hideAlert }
                      },
                      [e._v(e._s(e.alertMessage))]
                    )
                  : e._e(),
                e.showProcessing ? t("LoadingAnimation") : e._e()
              ],
              1
            ),
            e._l(e.images_approved, function(s, i) {
              return t(
                "div",
                { key: i, staticClass: "col-md-3" },
                [
                  t(
                    "b-carousel",
                    {
                      staticStyle: { "text-shadow": "1px 1px 2px #333" },
                      attrs: {
                        id: "carousel-1",
                        interval: 0,
                        controls: "",
                        indicators: "",
                        background: "#ababab"
                      },
                      model: {
                        value: e.slides[i],
                        callback: function(s) {
                          e.$set(e.slides, i, s);
                        },
                        expression: "slides[index]"
                      }
                    },
                    e._l(s, function(s, a) {
                      return t(
                        "b-carousel-slide",
                        { key: a, staticClass: "image" },
                        [
                          e.getImageUrl(a)
                            ? t("img", {
                                staticClass: "img img-responsive full-width",
                                attrs: {
                                  slot: "img",
                                  src: e.getImageUrl(a),
                                  alt: "image slot"
                                },
                                slot: "img"
                              })
                            : e._e(),
                          e.places[i].highlight_image &&
                          e.places[i].highlight_image.url == e.getImageUrl(a)
                            ? t("p", [e._v("\n          Thumbnail\n        ")])
                            : e.places[i].highlight_image
                            ? e._e()
                            : t("p", [
                                e._v("\n          No Thumbnail\n        ")
                              ])
                        ]
                      );
                    }),
                    1
                  ),
                  t("p", { staticClass: "text-center" }, [
                    e._v(e._s(e.places[i].burger_name))
                  ]),
                  t(
                    "button",
                    {
                      staticClass: "btn btn-primary btn-block",
                      on: {
                        click: function(s) {
                          return e.setClicked(e.images_approved_keys[i], i);
                        }
                      }
                    },
                    [e._v("\n      Set")]
                  ),
                  t("br")
                ],
                1
              );
            })
          ],
          2
        );
      },
      G = [],
      X =
        (t("456d"),
        function() {
          var e = this,
            s = e.$createElement,
            t = e._self._c || s;
          return t(
            "b-alert",
            {
              attrs: {
                show: e.dismissCountDown,
                dismissible: "",
                fade: "",
                variant: e.type
              },
              on: { "dismiss-count-down": e.countDownChanged }
            },
            [e._t("default")],
            2
          );
        }),
      H = [],
      Q = {
        props: ["type"],
        data: function() {
          return {
            dismissCountDown: 3,
            showDismissibleAlert: !1,
            dismissSecs: 3
          };
        },
        methods: {
          countDownChanged: function(e) {
            (this.dismissCountDown = e),
              0 == this.dismissCountDown && this.$emit("countDownEnded");
          }
        }
      },
      Z = Q,
      ee = Object(x["a"])(Z, X, H, !1, null, null, null),
      se = ee.exports,
      te = {
        name: "ThumbnailComp",
        components: { LoadingAnimation: T, Alert: se },
        props: ["images"],
        data: function() {
          return {
            places: [],
            images_approved: [],
            images_approved_keys: [],
            previous_places: [],
            previous_images_approved: [],
            previous_approved_keys: [],
            alertMessage: "",
            showAlert: !1,
            showProcessing: !1,
            slides: [],
            alertType: "",
            lastKey: null,
            isNextDisabled: !0,
            isPreviousDisabled: !0
          };
        },
        methods: {
          hideAlert: function() {
            (this.showAlert = !1), (this.alertMessage = "");
          },
          getImageUrl: function(e) {
            for (var s = null, t = 0; t < this.images.length; t++)
              if (this.images[t]["key"] == e) return this.images[t].url;
            return s;
          },
          setClicked: function(e, s) {
            var t = this;
            this.showProcessing = !0;
            var i = this.slides[s];
            this.images_approved_keys[s];
            for (
              var a = Object.keys(this.images_approved[s]),
                n = a[i],
                r = function(i) {
                  if (n == t.images[i].key)
                    return (
                      u
                        .child(e)
                        .update({ highlight_image: t.images[i] }, function(e) {
                          e
                            ? t.showAlertForThumbnail(e)
                            : ((t.places[s].highlight_image = t.images[i]),
                              t.showAlertForThumbnail());
                        }),
                      "break"
                    );
                },
                o = 0;
              o < this.images.length;
              o++
            ) {
              var l = r(o);
              if ("break" === l) break;
            }
          },
          showAlertForThumbnail: function(e) {
            e
              ? ((this.showProcessing = !1),
                (this.alertMessage = e.message),
                (this.alertType = "danger"),
                (this.showAlert = !0))
              : ((this.showProcessing = !1),
                (this.alertMessage = "Thumbnail Set successfully"),
                (this.alertType = "primary"),
                (this.showAlert = !0));
          },
          nextClicked: function() {
            var e = this;
            h.orderByKey()
              .startAt(this.lastKey + "a")
              .limitToFirst(20)
              .once("value", function(s) {
                s.numChildren() > 0
                  ? (e.resetAll(),
                    (e.isPreviousDisabled = !1),
                    (e.isNextDisabled = !1),
                    s.forEach(function(s) {
                      var t = s.key,
                        i = s.val();
                      u.orderByKey()
                        .equalTo(t)
                        .once("value", function(s) {
                          s.forEach(function(s) {
                            var t = s.key,
                              i = s.val();
                            (i["key"] = t),
                              e.places.push(i),
                              e.previous_places.push(i);
                          }),
                            e.images_approved.push(i),
                            e.images_approved_keys.push(t),
                            e.slides.push(0),
                            (e.lastKey = t),
                            e.previous_images_approved.push(i),
                            e.previous_approved_keys.push(t);
                        });
                    }))
                  : (e.isNextDisabled = !0);
              });
          },
          previousClicked: function() {
            this.previous_images_approved.length > 20
              ? ((this.isPreviousDisabled = !1),
                this.previous_places.splice(
                  this.previous_places.length - 20,
                  20
                ),
                (this.places = this.previous_places.slice(
                  this.previous_places.length - 20
                )),
                this.previous_images_approved.splice(
                  this.previous_images_approved.length - 20,
                  20
                ),
                (this.images_approved = this.previous_images_approved.slice(
                  this.previous_images_approved.length - 20
                )),
                this.previous_approved_keys.splice(
                  this.previous_approved_keys.length - 20,
                  20
                ),
                (this.images_approved_keys = this.previous_approved_keys.slice(
                  this.previous_approved_keys.length - 20
                )),
                (this.lastKey = this.images_approved_keys[
                  this.images_approved_keys.length - 1
                ]))
              : (this.isPreviousDisabled = !0);
          },
          resetAll: function() {
            (this.places = []),
              (this.images_approved = []),
              (this.images_approved_keys = []),
              (this.slides = []);
          }
        },
        mounted: function() {
          var e = this;
          h.orderByKey()
            .limitToFirst(20)
            .once("value", function(s) {
              s.numChildren() > 0
                ? ((e.isNextDisabled = !1),
                  s.forEach(function(s) {
                    var t = s.key,
                      i = s.val();
                    u.orderByKey()
                      .equalTo(t)
                      .once("value", function(s) {
                        s.forEach(function(s) {
                          var t = s.key,
                            i = s.val();
                          (i["key"] = t),
                            e.places.push(i),
                            e.previous_places.push(i);
                        }),
                          e.images_approved.push(i),
                          e.images_approved_keys.push(t),
                          e.slides.push(0),
                          (e.lastKey = t),
                          e.previous_images_approved.push(i),
                          e.previous_approved_keys.push(t);
                      });
                  }))
                : (e.isNextDisabled = !0);
            });
        }
      },
      ie = te,
      ae = (t("5167"), Object(x["a"])(ie, W, G, !1, null, "733db432", null)),
      ne = ae.exports,
      re = function() {
        var e = this,
          s = e.$createElement,
          t = e._self._c || s;
        return t(
          "div",
          { staticClass: "mt-3 row" },
          [
            t("div", { staticClass: "col-md-12 text-right mb-2" }, [
              t(
                "button",
                {
                  staticClass: "btn btn-danger mr-2",
                  attrs: { disabled: e.isPreviousDisabled },
                  on: { click: e.previousClicked }
                },
                [e._v("\n      Previous\n    ")]
              ),
              t(
                "button",
                {
                  staticClass: "btn btn-success",
                  attrs: { disabled: e.isNextDisabled },
                  on: { click: e.nextClicked }
                },
                [e._v("\n      Next\n    ")]
              )
            ]),
            t(
              "div",
              { staticClass: "col-md-12 text-center mb-2" },
              [
                e.showAlert
                  ? t(
                      "Alert",
                      {
                        attrs: { type: e.alertType },
                        on: { countDownEnded: e.hideAlert }
                      },
                      [e._v(e._s(e.alertMessage))]
                    )
                  : e._e(),
                e.showProcessing ? t("LoadingAnimation") : e._e()
              ],
              1
            ),
            e._l(e.images_container, function(s, i) {
              return t(
                "div",
                { key: i, staticClass: "col-md-3" },
                [
                  t(
                    "b-carousel",
                    {
                      staticStyle: { "text-shadow": "1px 1px 2px #333" },
                      attrs: {
                        id: "carousel-1",
                        interval: 0,
                        controls: "",
                        indicators: "",
                        background: "#ababab"
                      },
                      model: {
                        value: e.slides[i],
                        callback: function(s) {
                          e.$set(e.slides, i, s);
                        },
                        expression: "slides[index]"
                      }
                    },
                    e._l(s, function(s, i) {
                      return t(
                        "b-carousel-slide",
                        { key: i, staticClass: "image" },
                        [
                          e.getImageUrl(i)
                            ? t("img", {
                                staticClass: "img img-responsive full-width",
                                attrs: {
                                  slot: "img",
                                  src: e.getImageUrl(i),
                                  alt: "image slot"
                                },
                                slot: "img"
                              })
                            : e._e()
                        ]
                      );
                    }),
                    1
                  ),
                  t("p", { staticClass: "text-center" }, [
                    e._v(e._s(e.places[i].burger_name))
                  ]),
                  t("div", { staticClass: "d-flex" }, [
                    t(
                      "button",
                      {
                        staticClass: "btn btn-primary flex-fill",
                        on: {
                          click: function(s) {
                            return e.approveClicked(
                              e.images_container_keys[i],
                              i
                            );
                          }
                        }
                      },
                      [e._v("\n        Approve\n      ")]
                    ),
                    t(
                      "button",
                      {
                        staticClass: "btn btn-danger flex-fill",
                        on: {
                          click: function(s) {
                            return e.rejectClicked(
                              e.images_container_keys[i],
                              i
                            );
                          }
                        }
                      },
                      [e._v("\n        Reject\n      ")]
                    )
                  ]),
                  t("br")
                ],
                1
              );
            })
          ],
          2
        );
      },
      oe = [],
      le = {
        name: "ImageValidationComp",
        props: ["images"],
        components: { LoadingAnimation: T, Alert: se },
        data: function() {
          return {
            isPreviousDisabled: !0,
            isNextDisabled: !0,
            alertMessage: null,
            alertType: null,
            lastKey: null,
            showProcessing: !1,
            showAlert: !1,
            places: [],
            previous_places: [],
            images_container: [],
            previous_images_container: [],
            images_container_keys: [],
            previous_images_container_keys: [],
            approved_images: [],
            rejected_images: [],
            slides: []
          };
        },
        methods: {
          getImageUrl: function(e) {
            for (var s = null, t = 0; t < this.images.length; t++)
              if (this.images[t]["key"] == e) return this.images[t].url;
            return s;
          },
          hideAlert: function() {
            (this.showAlert = !1), (this.alertMessage = "");
          },
          approveClicked: function(e, s) {
            var t = this;
            this.showProcessing = !0;
            var i = this.slides[s];
            this.images_container_keys[s];
            for (
              var a = Object.keys(this.images_container[s]), n = a[i], r = 0;
              r < this.images.length;
              r++
            )
              n == this.images[r].key &&
                (h
                  .orderByKey()
                  .equalTo(e)
                  .once("value", function(s) {
                    if (s.numChildren() > 0) {
                      var i = [];
                      h.orderByKey()
                        .equalTo(e)
                        .once("value", function(s) {
                          s.forEach(function(e) {
                            var s = e.key,
                              t = e.val();
                            (t["key"] = s), i.push(t);
                          }),
                            (i[n] = 1),
                            h.child(e).set(i, function(e) {
                              t.showAlertForImages(e, "Approved");
                            });
                        });
                    } else {
                      var a = {};
                      (a[n] = 1),
                        h.child(e).set(a, function(e) {
                          t.showAlertForImages(e, "Approved");
                        });
                    }
                  }),
                p
                  .child(e)
                  .child(n)
                  .remove()
                  .then(function() {
                    var e = 0;
                    for (var i in t.images_container[s]) e++;
                    1 == e
                      ? (t.images_container.splice(s, 1),
                        t.images_container_keys.splice(s, 1),
                        t.places.splice(s, 1),
                        t.previous_images_container.splice(s + 20, 1),
                        t.previous_images_container_keys.splice(s + 20, 1),
                        t.previous_places.splice(s + 20, 1))
                      : delete t.images_container[s][n];
                  })
                  .catch(function(e) {
                    t.showAlertForImages(e, e.message);
                  }));
          },
          rejectClicked: function(e, s) {
            var t = this;
            this.showProcessing = !0;
            var i = this.slides[s];
            this.images_container_keys[s];
            for (
              var a = Object.keys(this.images_container[s]), n = a[i], r = 0;
              r < this.images.length;
              r++
            )
              n == this.images[r].key &&
                (d
                  .orderByKey()
                  .equalTo(e)
                  .once("value", function(s) {
                    if (s.numChildren() > 0) {
                      var i = [];
                      d.orderByKey()
                        .equalTo(e)
                        .once("value", function(s) {
                          s.forEach(function(e) {
                            var s = e.key,
                              t = e.val();
                            (t["key"] = s), i.push(t);
                          }),
                            (i[n] = 1),
                            d.child(e).set(i, function(e) {
                              t.showAlertForImages(e, "Rejected");
                            });
                        });
                    } else {
                      var a = {};
                      (a[n] = 1),
                        d.child(e).set(a, function(e) {
                          t.showAlertForImages(e, "Rejected");
                        });
                    }
                  }),
                p
                  .child(e)
                  .child(n)
                  .remove()
                  .then(function() {
                    var e = 0;
                    for (var i in t.images_container[s]) e++;
                    1 == e
                      ? (t.images_container.splice(s, 1),
                        t.images_container_keys.splice(s, 1),
                        t.places.splice(s, 1))
                      : delete t.images_container[s][n];
                  })
                  .catch(function(e) {
                    t.showAlertForImages(e, e.message);
                  }));
          },
          checkIfRejectedExist: function() {
            for (var e = -1, s = 0; s < this.rejected_images.length; s++)
              if (this.rejected_images[s][".key"] == this.image_key) {
                e = s;
                break;
              }
            return e;
          },
          showAlertForImages: function(e, s) {
            e
              ? ((this.showProcessing = !1),
                (this.alertMessage = e.message),
                (this.alertType = "danger"),
                (this.showAlert = !0))
              : ((this.showProcessing = !1),
                s && (this.alertMessage = s),
                (this.alertType = "primary"),
                (this.showAlert = !0));
          },
          getData: function() {
            var e = this;
            (this.images_container = []),
              (this.images_container_keys = []),
              (this.places = []),
              (this.previous_places = []),
              (this.previous_images_container = []),
              (this.previous_images_container_keys = []),
              p
                .orderByKey()
                .limitToFirst(20)
                .once("value", function(s) {
                  s.numChildren() > 0
                    ? ((e.isNextDisabled = !1),
                      s.forEach(function(s) {
                        var t = s.key,
                          i = s.val();
                        u.orderByKey()
                          .equalTo(t)
                          .once("value", function(s) {
                            s.forEach(function(s) {
                              var t = s.key,
                                i = s.val();
                              (i["key"] = t),
                                e.places.push(i),
                                e.previous_places.push(i);
                            }),
                              e.images_container.push(i),
                              e.images_container_keys.push(t),
                              e.slides.push(0),
                              (e.lastKey = t),
                              e.previous_images_container.push(i),
                              e.previous_images_container_keys.push(t);
                          });
                      }))
                    : (e.isNextDisabled = !0);
                });
          },
          nextClicked: function() {
            var e = this;
            p.orderByKey()
              .startAt(this.lastKey + "a")
              .limitToFirst(20)
              .once("value", function(s) {
                s.numChildren() > 0
                  ? (e.resetAll(),
                    (e.isPreviousDisabled = !1),
                    (e.isNextDisabled = !1),
                    s.forEach(function(s) {
                      var t = s.key,
                        i = s.val();
                      u.orderByKey()
                        .equalTo(t)
                        .once("value", function(s) {
                          s.forEach(function(s) {
                            var t = s.key,
                              i = s.val();
                            (i["key"] = t),
                              e.places.push(i),
                              e.previous_places.push(i);
                          }),
                            e.images_container.push(i),
                            e.images_container_keys.push(t),
                            e.slides.push(0),
                            (e.lastKey = t),
                            e.previous_images_container.push(i),
                            e.previous_images_container_keys.push(t);
                        });
                    }))
                  : (e.isNextDisabled = !0);
              });
          },
          previousClicked: function() {
            if (this.previous_images_container.length > 0) {
              (this.isPreviousDisabled = !1),
                this.previous_places.splice(
                  this.previous_places.length - 20,
                  20
                );
              var e = 20;
              this.previous_places.length < 20 &&
                (e = this.previous_places.length),
                (this.places = this.previous_places.slice(
                  this.previous_places.length - e
                )),
                this.previous_images_container.splice(
                  this.previous_images_container.length - 20,
                  20
                ),
                (this.images_container = this.previous_images_container.slice(
                  this.previous_images_container.length - e
                )),
                this.previous_images_container_keys.splice(
                  this.previous_images_container_keys.length - 20,
                  20
                ),
                (this.images_container_keys = this.previous_images_container_keys.slice(
                  this.previous_images_container_keys.length - e
                )),
                (this.lastKey = this.images_container_keys[
                  this.images_container_keys.length - 1
                ]);
            } else this.isPreviousDisabled = !0;
          },
          resetAll: function() {
            (this.places = []),
              (this.images_container = []),
              (this.images_container_keys = []),
              (this.slides = []);
          }
        },
        mounted: function() {
          this.getData();
        }
      },
      ce = le,
      ue = (t("b6ab"), Object(x["a"])(ce, re, oe, !1, null, "457e5caf", null)),
      pe = ue.exports,
      he = function() {
        var e = this,
          s = e.$createElement,
          t = e._self._c || s;
        return t(
          "div",
          { staticClass: "mt-3" },
          [
            e.showProcessing ? t("LoadingAnimation") : e._e(),
            e.showAlert
              ? t(
                  "Alert",
                  {
                    attrs: { type: e.alertType },
                    on: { countDownEnded: e.hideAlert }
                  },
                  [e._v(e._s(e.alertMessage))]
                )
              : e._e(),
            t(
              "div",
              { staticClass: "row" },
              e._l(e.places, function(s, i) {
                return t(
                  "div",
                  { key: i, staticClass: "col-md-3 text-center mb-4" },
                  [
                    t("div", { staticClass: "image" }, [
                      s.highlight_image
                        ? t("img", {
                            staticClass: "img img-responsive full-width",
                            attrs: { src: s.highlight_image.url }
                          })
                        : t("img", {
                            staticClass: "img img-responsive full-width",
                            attrs: { src: "favicon.png" }
                          })
                    ]),
                    t("p", [e._v(e._s(s.burger_name))]),
                    t("div", { staticClass: "d-flex" }, [
                      t(
                        "button",
                        {
                          staticClass: "btn btn-primary flex-fill",
                          on: {
                            click: function(t) {
                              return e.approveClicked(s, i);
                            }
                          }
                        },
                        [e._v("\n          Approve\n        ")]
                      ),
                      t(
                        "button",
                        {
                          staticClass: "btn btn-danger flex-fill",
                          on: {
                            click: function(t) {
                              return e.rejectClicked(s, i);
                            }
                          }
                        },
                        [e._v("\n          Reject\n        ")]
                      )
                    ]),
                    s.google_url
                      ? t(
                          "a",
                          {
                            staticClass: "btn btn-success mt-2 btn-block",
                            attrs: { href: s.google_url, target: "_blank" }
                          },
                          [e._v("See on Maps")]
                        )
                      : e._e()
                  ]
                );
              }),
              0
            )
          ],
          1
        );
      },
      de = [],
      ge = {
        name: "BurgerPlaceValidation",
        components: { LoadingAnimation: T, Alert: se },
        data: function() {
          return { places: [], showProcessing: !1, showAlert: !1 };
        },
        methods: {
          hideAlert: function() {
            (this.showAlert = !1), (this.alertMessage = "");
          },
          approveClicked: function(e, s) {
            var t = this;
            this.showProcessing = !0;
            var i = { was_reviewed: !0, is_validated: !0 };
            u.child(e["key"]).update(i, function(e) {
              t.showPlaceAlert(e, "Approved successfully"),
                t.places.splice(s, 1);
            });
          },
          rejectClicked: function(e, s) {
            var t = this;
            (this.showProcessing = !0),
              u
                .child(e["key"])
                .update({ was_reviewed: !0, is_validated: !1 }, function(e) {
                  t.showPlaceAlert(e, "Rejected successfully"),
                    t.places.splice(s, 1);
                });
          },
          showPlaceAlert: function(e, s) {
            e
              ? ((this.showProcessing = !1),
                (this.alertMessage = e.message),
                (this.alertType = "danger"),
                (this.showAlert = !0))
              : ((this.showProcessing = !1),
                (this.alertMessage = s),
                (this.alertType = "success"),
                (this.showAlert = !0));
          }
        },
        mounted: function() {
          var e = this;
          u.orderByChild("was_reviewed")
            .equalTo(!1)
            .once("value", function(s) {
              s.forEach(function(s) {
                var t = s.key,
                  i = s.val();
                (i["key"] = t), e.places.push(i);
              });
            });
        }
      },
      me = ge,
      ve = (t("7cd7"), Object(x["a"])(me, he, de, !1, null, "e0403d76", null)),
      fe = ve.exports,
      _e = {
        name: "Tabs",
        components: {
          ThumbnailComp: ne,
          ImageValidationComp: pe,
          BurgerPlaceValidation: fe
        },
        data: function() {
          return { images: [] };
        },
        mounted: function() {
          var e = this;
          g.orderByKey().once("value", function(s) {
            s.forEach(function(s) {
              var t = s.key,
                i = s.val();
              (i["key"] = t), e.images.push(i);
            });
          });
        }
      },
      be = _e,
      ye = Object(x["a"])(be, Y, J, !1, null, null, null),
      ke = ye.exports,
      we = {
        name: "home",
        components: { Navbar: z, Tabs: ke },
        data: function() {
          return {};
        },
        methods: {
          signoutClicked: function() {
            var e = this;
            r.a
              .auth()
              .signOut()
              .then(function() {
                e.$router.replace("login");
              });
          }
        }
      },
      Ce = we,
      Ae = Object(x["a"])(Ce, S, $, !1, null, null, null),
      xe = Ae.exports;
    i["default"].use(M["a"]);
    var Pe = new M["a"]({
      mode: "history",
      base: "/",
      routes: [
        { path: "*", component: O },
        { path: "/", component: O },
        { path: "/login", name: "login", component: O },
        {
          path: "/home",
          name: "home",
          component: xe,
          meta: { requeriesAuth: !0 }
        }
      ]
    });
    Pe.beforeEach(function(e, s, t) {
      var i = r.a.auth().currentUser,
        a = e.matched.some(function(e) {
          return e.meta.requeriesAuth;
        });
      a && !i ? t("login") : !a && i ? t("home") : t();
    });
    var Te = Pe,
      De = t("2f62");
    i["default"].use(De["a"]);
    var je = new De["a"].Store({ state: {}, mutations: {}, actions: {} }),
      Ee = t("9483");
    Object(Ee["a"])("".concat("/", "service-worker.js"), {
      ready: function() {
        console.log(
          "App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB"
        );
      },
      registered: function() {
        console.log("Service worker has been registered.");
      },
      cached: function() {
        console.log("Content has been cached for offline use.");
      },
      updatefound: function() {
        console.log("New content is downloading.");
      },
      updated: function() {
        console.log("New content is available; please refresh.");
      },
      offline: function() {
        console.log(
          "No internet connection found. App is running in offline mode."
        );
      },
      error: function(e) {
        console.error("Error during service worker registration:", e);
      }
    });
    t("f9e3"), t("2dd8");
    i["default"].config.productionTip = !1;
    var Oe = "";
    i["default"].use(a["a"]),
      i["default"].use(v["a"]),
      r.a.auth().onAuthStateChanged(function() {
        Oe ||
          (Oe = new i["default"]({
            router: Te,
            store: je,
            render: function(e) {
              return e(N);
            }
          }).$mount("#app"));
      });
  },
  "7cd7": function(e, s, t) {
    "use strict";
    var i = t("14ab"),
      a = t.n(i);
    a.a;
  },
  b6ab: function(e, s, t) {
    "use strict";
    var i = t("da6c"),
      a = t.n(i);
    a.a;
  },
  da6c: function(e, s, t) {},
  e14f: function(e, s, t) {}
});
//# sourceMappingURL=app.13e9cef1.js.map
