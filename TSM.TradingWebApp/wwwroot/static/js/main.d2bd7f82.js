/*! For license information please see main.d2bd7f82.js.LICENSE.txt */
!(function () {
    "use strict";
    var e = {
        340: function (e, t, n) {
            n.r(t),
                n.d(t, {
                    CountUp: function () {
                        return a;
                    },
                });
            var r = function () {
                return (
                    (r =
                        Object.assign ||
                        function (e) {
                            for (var t, n = 1, r = arguments.length; n < r; n++) for (var a in (t = arguments[n])) Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
                            return e;
                        }),
                    r.apply(this, arguments)
                );
            },
                a = (function () {
                    function e(e, t, n) {
                        var a = this;
                        (this.endVal = t),
                            (this.options = n),
                            (this.version = "2.6.2"),
                            (this.defaults = {
                                startVal: 0,
                                decimalPlaces: 0,
                                duration: 2,
                                useEasing: !0,
                                useGrouping: !0,
                                useIndianSeparators: !1,
                                smartEasingThreshold: 999,
                                smartEasingAmount: 333,
                                separator: ",",
                                decimal: ".",
                                prefix: "",
                                suffix: "",
                                enableScrollSpy: !1,
                                scrollSpyDelay: 200,
                                scrollSpyOnce: !1,
                            }),
                            (this.finalEndVal = null),
                            (this.useEasing = !0),
                            (this.countDown = !1),
                            (this.error = ""),
                            (this.startVal = 0),
                            (this.paused = !0),
                            (this.once = !1),
                            (this.count = function (e) {
                                a.startTime || (a.startTime = e);
                                var t = e - a.startTime;
                                (a.remaining = a.duration - t),
                                    a.useEasing
                                        ? a.countDown
                                            ? (a.frameVal = a.startVal - a.easingFn(t, 0, a.startVal - a.endVal, a.duration))
                                            : (a.frameVal = a.easingFn(t, a.startVal, a.endVal - a.startVal, a.duration))
                                        : (a.frameVal = a.startVal + (a.endVal - a.startVal) * (t / a.duration));
                                var n = a.countDown ? a.frameVal < a.endVal : a.frameVal > a.endVal;
                                (a.frameVal = n ? a.endVal : a.frameVal),
                                    (a.frameVal = Number(a.frameVal.toFixed(a.options.decimalPlaces))),
                                    a.printValue(a.frameVal),
                                    t < a.duration ? (a.rAF = requestAnimationFrame(a.count)) : null !== a.finalEndVal ? a.update(a.finalEndVal) : a.options.onCompleteCallback && a.options.onCompleteCallback();
                            }),
                            (this.formatNumber = function (e) {
                                var t,
                                    n,
                                    r,
                                    o,
                                    i = e < 0 ? "-" : "";
                                t = Math.abs(e).toFixed(a.options.decimalPlaces);
                                var l = (t += "").split(".");
                                if (((n = l[0]), (r = l.length > 1 ? a.options.decimal + l[1] : ""), a.options.useGrouping)) {
                                    o = "";
                                    for (var s = 3, u = 0, c = 0, d = n.length; c < d; ++c)
                                        a.options.useIndianSeparators && 4 === c && ((s = 2), (u = 1)), 0 !== c && u % s == 0 && (o = a.options.separator + o), u++, (o = n[d - c - 1] + o);
                                    n = o;
                                }
                                return (
                                    a.options.numerals &&
                                    a.options.numerals.length &&
                                    ((n = n.replace(/[0-9]/g, function (e) {
                                        return a.options.numerals[+e];
                                    })),
                                        (r = r.replace(/[0-9]/g, function (e) {
                                            return a.options.numerals[+e];
                                        }))),
                                    i + a.options.prefix + n + r + a.options.suffix
                                );
                            }),
                            (this.easeOutExpo = function (e, t, n, r) {
                                return (n * (1 - Math.pow(2, (-10 * e) / r)) * 1024) / 1023 + t;
                            }),
                            (this.options = r(r({}, this.defaults), n)),
                            (this.formattingFn = this.options.formattingFn ? this.options.formattingFn : this.formatNumber),
                            (this.easingFn = this.options.easingFn ? this.options.easingFn : this.easeOutExpo),
                            (this.startVal = this.validateValue(this.options.startVal)),
                            (this.frameVal = this.startVal),
                            (this.endVal = this.validateValue(t)),
                            (this.options.decimalPlaces = Math.max(this.options.decimalPlaces)),
                            this.resetDuration(),
                            (this.options.separator = String(this.options.separator)),
                            (this.useEasing = this.options.useEasing),
                            "" === this.options.separator && (this.options.useGrouping = !1),
                            (this.el = "string" == typeof e ? document.getElementById(e) : e),
                            this.el ? this.printValue(this.startVal) : (this.error = "[CountUp] target is null or undefined"),
                            "undefined" != typeof window &&
                            this.options.enableScrollSpy &&
                            (this.error
                                ? console.error(this.error, e)
                                : ((window.onScrollFns = window.onScrollFns || []),
                                    window.onScrollFns.push(function () {
                                        return a.handleScroll(a);
                                    }),
                                    (window.onscroll = function () {
                                        window.onScrollFns.forEach(function (e) {
                                            return e();
                                        });
                                    }),
                                    this.handleScroll(this)));
                    }
                    return (
                        (e.prototype.handleScroll = function (e) {
                            if (e && window && !e.once) {
                                var t = window.innerHeight + window.scrollY,
                                    n = e.el.getBoundingClientRect(),
                                    r = n.top + window.pageYOffset,
                                    a = n.top + n.height + window.pageYOffset;
                                a < t && a > window.scrollY && e.paused
                                    ? ((e.paused = !1),
                                        setTimeout(function () {
                                            return e.start();
                                        }, e.options.scrollSpyDelay),
                                        e.options.scrollSpyOnce && (e.once = !0))
                                    : (window.scrollY > a || r > t) && !e.paused && e.reset();
                            }
                        }),
                        (e.prototype.determineDirectionAndSmartEasing = function () {
                            var e = this.finalEndVal ? this.finalEndVal : this.endVal;
                            this.countDown = this.startVal > e;
                            var t = e - this.startVal;
                            if (Math.abs(t) > this.options.smartEasingThreshold && this.options.useEasing) {
                                this.finalEndVal = e;
                                var n = this.countDown ? 1 : -1;
                                (this.endVal = e + n * this.options.smartEasingAmount), (this.duration = this.duration / 2);
                            } else (this.endVal = e), (this.finalEndVal = null);
                            null !== this.finalEndVal ? (this.useEasing = !1) : (this.useEasing = this.options.useEasing);
                        }),
                        (e.prototype.start = function (e) {
                            this.error ||
                                (e && (this.options.onCompleteCallback = e),
                                    this.duration > 0 ? (this.determineDirectionAndSmartEasing(), (this.paused = !1), (this.rAF = requestAnimationFrame(this.count))) : this.printValue(this.endVal));
                        }),
                        (e.prototype.pauseResume = function () {
                            this.paused
                                ? ((this.startTime = null), (this.duration = this.remaining), (this.startVal = this.frameVal), this.determineDirectionAndSmartEasing(), (this.rAF = requestAnimationFrame(this.count)))
                                : cancelAnimationFrame(this.rAF),
                                (this.paused = !this.paused);
                        }),
                        (e.prototype.reset = function () {
                            cancelAnimationFrame(this.rAF), (this.paused = !0), this.resetDuration(), (this.startVal = this.validateValue(this.options.startVal)), (this.frameVal = this.startVal), this.printValue(this.startVal);
                        }),
                        (e.prototype.update = function (e) {
                            cancelAnimationFrame(this.rAF),
                                (this.startTime = null),
                                (this.endVal = this.validateValue(e)),
                                this.endVal !== this.frameVal &&
                                ((this.startVal = this.frameVal), null == this.finalEndVal && this.resetDuration(), (this.finalEndVal = null), this.determineDirectionAndSmartEasing(), (this.rAF = requestAnimationFrame(this.count)));
                        }),
                        (e.prototype.printValue = function (e) {
                            var t;
                            if (this.el) {
                                var n = this.formattingFn(e);
                                (null === (t = this.options.plugin) || void 0 === t ? void 0 : t.render)
                                    ? this.options.plugin.render(this.el, n)
                                    : "INPUT" === this.el.tagName
                                        ? (this.el.value = n)
                                        : "text" === this.el.tagName || "tspan" === this.el.tagName
                                            ? (this.el.textContent = n)
                                            : (this.el.innerHTML = n);
                            }
                        }),
                        (e.prototype.ensureNumber = function (e) {
                            return "number" == typeof e && !isNaN(e);
                        }),
                        (e.prototype.validateValue = function (e) {
                            var t = Number(e);
                            return this.ensureNumber(t) ? t : ((this.error = "[CountUp] invalid start or end value: ".concat(e)), null);
                        }),
                        (e.prototype.resetDuration = function () {
                            (this.startTime = null), (this.duration = 1e3 * Number(this.options.duration)), (this.remaining = this.duration);
                        }),
                        e
                    );
                })();
        },
        835: function (e, t, n) {
            var r = n(791),
                a = n(340);
            function o(e, t) {
                var n = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var r = Object.getOwnPropertySymbols(e);
                    t &&
                        (r = r.filter(function (t) {
                            return Object.getOwnPropertyDescriptor(e, t).enumerable;
                        })),
                        n.push.apply(n, r);
                }
                return n;
            }
            function i(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = null != arguments[t] ? arguments[t] : {};
                    t % 2
                        ? o(Object(n), !0).forEach(function (t) {
                            l(e, t, n[t]);
                        })
                        : Object.getOwnPropertyDescriptors
                            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
                            : o(Object(n)).forEach(function (t) {
                                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
                            });
                }
                return e;
            }
            function l(e, t, n) {
                return (
                    (t = (function (e) {
                        var t = (function (e, t) {
                            if ("object" !== typeof e || null === e) return e;
                            var n = e[Symbol.toPrimitive];
                            if (void 0 !== n) {
                                var r = n.call(e, t || "default");
                                if ("object" !== typeof r) return r;
                                throw new TypeError("@@toPrimitive must return a primitive value.");
                            }
                            return ("string" === t ? String : Number)(e);
                        })(e, "string");
                        return "symbol" === typeof t ? t : String(t);
                    })(t)) in e
                        ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
                        : (e[t] = n),
                    e
                );
            }
            function s() {
                return (
                    (s = Object.assign
                        ? Object.assign.bind()
                        : function (e) {
                            for (var t = 1; t < arguments.length; t++) {
                                var n = arguments[t];
                                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
                            }
                            return e;
                        }),
                    s.apply(this, arguments)
                );
            }
            function u(e, t) {
                if (null == e) return {};
                var n,
                    r,
                    a = (function (e, t) {
                        if (null == e) return {};
                        var n,
                            r,
                            a = {},
                            o = Object.keys(e);
                        for (r = 0; r < o.length; r++) (n = o[r]), t.indexOf(n) >= 0 || (a[n] = e[n]);
                        return a;
                    })(e, t);
                if (Object.getOwnPropertySymbols) {
                    var o = Object.getOwnPropertySymbols(e);
                    for (r = 0; r < o.length; r++) (n = o[r]), t.indexOf(n) >= 0 || (Object.prototype.propertyIsEnumerable.call(e, n) && (a[n] = e[n]));
                }
                return a;
            }
            function c(e, t) {
                return (
                    (function (e) {
                        if (Array.isArray(e)) return e;
                    })(e) ||
                    (function (e, t) {
                        var n = null == e ? null : ("undefined" != typeof Symbol && e[Symbol.iterator]) || e["@@iterator"];
                        if (null != n) {
                            var r,
                                a,
                                o,
                                i,
                                l = [],
                                s = !0,
                                u = !1;
                            try {
                                if (((o = (n = n.call(e)).next), 0 === t)) {
                                    if (Object(n) !== n) return;
                                    s = !1;
                                } else for (; !(s = (r = o.call(n)).done) && (l.push(r.value), l.length !== t); s = !0);
                            } catch (c) {
                                (u = !0), (a = c);
                            } finally {
                                try {
                                    if (!s && null != n.return && ((i = n.return()), Object(i) !== i)) return;
                                } finally {
                                    if (u) throw a;
                                }
                            }
                            return l;
                        }
                    })(e, t) ||
                    (function (e, t) {
                        if (!e) return;
                        if ("string" === typeof e) return d(e, t);
                        var n = Object.prototype.toString.call(e).slice(8, -1);
                        "Object" === n && e.constructor && (n = e.constructor.name);
                        if ("Map" === n || "Set" === n) return Array.from(e);
                        if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return d(e, t);
                    })(e, t) ||
                    (function () {
                        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
                    })()
                );
            }
            function d(e, t) {
                (null == t || t > e.length) && (t = e.length);
                for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
                return r;
            }
            var f = "undefined" !== typeof window && "undefined" !== typeof window.document && "undefined" !== typeof window.document.createElement ? r.useLayoutEffect : r.useEffect;
            function h(e) {
                var t = r.useRef(e);
                return (
                    f(function () {
                        t.current = e;
                    }),
                    r.useCallback(function () {
                        for (var e = arguments.length, n = new Array(e), r = 0; r < e; r++) n[r] = arguments[r];
                        return t.current.apply(void 0, n);
                    }, [])
                );
            }
            var p = ["ref", "startOnMount", "enableReinitialize", "delay", "onEnd", "onStart", "onPauseResume", "onReset", "onUpdate"],
                m = { decimal: ".", separator: ",", delay: null, prefix: "", suffix: "", duration: 2, start: 0, decimals: 0, startOnMount: !0, enableReinitialize: !0, useEasing: !0, useGrouping: !0, useIndianSeparators: !1 },
                v = function (e) {
                    var t = Object.fromEntries(
                        Object.entries(e).filter(function (e) {
                            return void 0 !== c(e, 2)[1];
                        })
                    ),
                        n = r.useMemo(
                            function () {
                                return i(i({}, m), t);
                            },
                            [e]
                        ),
                        o = n.ref,
                        l = n.startOnMount,
                        s = n.enableReinitialize,
                        d = n.delay,
                        f = n.onEnd,
                        v = n.onStart,
                        g = n.onPauseResume,
                        y = n.onReset,
                        b = n.onUpdate,
                        x = u(n, p),
                        w = r.useRef(),
                        k = r.useRef(),
                        C = r.useRef(!1),
                        j = h(function () {
                            return (function (e, t) {
                                var n = t.decimal,
                                    r = t.decimals,
                                    o = t.duration,
                                    i = t.easingFn,
                                    l = t.end,
                                    s = t.formattingFn,
                                    u = t.numerals,
                                    c = t.prefix,
                                    d = t.separator,
                                    f = t.start,
                                    h = t.suffix,
                                    p = t.useEasing,
                                    m = t.useGrouping,
                                    v = t.useIndianSeparators,
                                    g = t.enableScrollSpy,
                                    y = t.scrollSpyDelay,
                                    b = t.scrollSpyOnce;
                                return new a.CountUp(e, l, {
                                    startVal: f,
                                    duration: o,
                                    decimal: n,
                                    decimalPlaces: r,
                                    easingFn: i,
                                    formattingFn: s,
                                    numerals: u,
                                    separator: d,
                                    prefix: c,
                                    suffix: h,
                                    useEasing: p,
                                    useIndianSeparators: v,
                                    useGrouping: m,
                                    enableScrollSpy: g,
                                    scrollSpyDelay: y,
                                    scrollSpyOnce: b,
                                });
                            })("string" === typeof o ? o : o.current, x);
                        }),
                        S = h(function (e) {
                            var t = w.current;
                            if (t && !e) return t;
                            var n = j();
                            return (w.current = n), n;
                        }),
                        E = h(function () {
                            var e = function () {
                                return S(!0).start(function () {
                                    null === f || void 0 === f || f({ pauseResume: N, reset: P, start: O, update: T });
                                });
                            };
                            d && d > 0 ? (k.current = setTimeout(e, 1e3 * d)) : e(), null === v || void 0 === v || v({ pauseResume: N, reset: P, update: T });
                        }),
                        N = h(function () {
                            S().pauseResume(), null === g || void 0 === g || g({ reset: P, start: O, update: T });
                        }),
                        P = h(function () {
                            S().el && (k.current && clearTimeout(k.current), S().reset(), null === y || void 0 === y || y({ pauseResume: N, start: O, update: T }));
                        }),
                        T = h(function (e) {
                            S().update(e), null === b || void 0 === b || b({ pauseResume: N, reset: P, start: O });
                        }),
                        O = h(function () {
                            P(), E();
                        }),
                        R = h(function (e) {
                            l && (e && P(), E());
                        });
                    return (
                        r.useEffect(
                            function () {
                                C.current ? s && R(!0) : ((C.current = !0), R());
                            },
                            [s, C, R, d, e.start, e.suffix, e.prefix, e.duration, e.separator, e.decimals, e.decimal, e.formattingFn]
                        ),
                        r.useEffect(
                            function () {
                                return function () {
                                    P();
                                };
                            },
                            [P]
                        ),
                        { start: O, pauseResume: N, reset: P, update: T, getCountUp: S }
                    );
                },
                g = ["className", "redraw", "containerProps", "children", "style"];
            t.ZP = function (e) {
                var t = e.className,
                    n = e.redraw,
                    a = e.containerProps,
                    o = e.children,
                    l = e.style,
                    c = u(e, g),
                    d = r.useRef(null),
                    f = r.useRef(!1),
                    p = v(i(i({}, c), {}, { ref: d, startOnMount: "function" !== typeof o || 0 === e.delay, enableReinitialize: !1 })),
                    m = p.start,
                    y = p.reset,
                    b = p.update,
                    x = p.pauseResume,
                    w = p.getCountUp,
                    k = h(function () {
                        m();
                    }),
                    C = h(function (t) {
                        e.preserveValue || y(), b(t);
                    }),
                    j = h(function () {
                        "function" !== typeof e.children || d.current instanceof Element
                            ? w()
                            : console.error('Couldn\'t find attached element to hook the CountUp instance into! Try to attach "containerRef" from the render prop to a an Element, eg. <span ref={containerRef} />.');
                    });
                r.useEffect(
                    function () {
                        j();
                    },
                    [j]
                ),
                    r.useEffect(
                        function () {
                            f.current && C(e.end);
                        },
                        [e.end, C]
                    );
                var S = n && e;
                return (
                    r.useEffect(
                        function () {
                            n && f.current && k();
                        },
                        [k, n, S]
                    ),
                    r.useEffect(
                        function () {
                            !n && f.current && k();
                        },
                        [k, n, e.start, e.suffix, e.prefix, e.duration, e.separator, e.decimals, e.decimal, e.className, e.formattingFn]
                    ),
                    r.useEffect(function () {
                        f.current = !0;
                    }, []),
                    "function" === typeof o
                        ? o({ countUpRef: d, start: m, reset: y, update: b, pauseResume: x, getCountUp: w })
                        : r.createElement("span", s({ className: t, ref: d, style: l }, a), "undefined" !== typeof e.start ? w().formattingFn(e.start) : "")
                );
            };
        },
        463: function (e, t, n) {
            var r = n(791),
                a = n(296);
            function o(e) {
                for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
                return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
            }
            var i = new Set(),
                l = {};
            function s(e, t) {
                u(e, t), u(e + "Capture", t);
            }
            function u(e, t) {
                for (l[e] = t, e = 0; e < t.length; e++) i.add(t[e]);
            }
            var c = !("undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement),
                d = Object.prototype.hasOwnProperty,
                f = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
                h = {},
                p = {};
            function m(e, t, n, r, a, o, i) {
                (this.acceptsBooleans = 2 === t || 3 === t || 4 === t),
                    (this.attributeName = r),
                    (this.attributeNamespace = a),
                    (this.mustUseProperty = n),
                    (this.propertyName = e),
                    (this.type = t),
                    (this.sanitizeURL = o),
                    (this.removeEmptyString = i);
            }
            var v = {};
            "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function (e) {
                v[e] = new m(e, 0, !1, e, null, !1, !1);
            }),
                [
                    ["acceptCharset", "accept-charset"],
                    ["className", "class"],
                    ["htmlFor", "for"],
                    ["httpEquiv", "http-equiv"],
                ].forEach(function (e) {
                    var t = e[0];
                    v[t] = new m(t, 1, !1, e[1], null, !1, !1);
                }),
                ["contentEditable", "draggable", "spellCheck", "value"].forEach(function (e) {
                    v[e] = new m(e, 2, !1, e.toLowerCase(), null, !1, !1);
                }),
                ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function (e) {
                    v[e] = new m(e, 2, !1, e, null, !1, !1);
                }),
                "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
                    .split(" ")
                    .forEach(function (e) {
                        v[e] = new m(e, 3, !1, e.toLowerCase(), null, !1, !1);
                    }),
                ["checked", "multiple", "muted", "selected"].forEach(function (e) {
                    v[e] = new m(e, 3, !0, e, null, !1, !1);
                }),
                ["capture", "download"].forEach(function (e) {
                    v[e] = new m(e, 4, !1, e, null, !1, !1);
                }),
                ["cols", "rows", "size", "span"].forEach(function (e) {
                    v[e] = new m(e, 6, !1, e, null, !1, !1);
                }),
                ["rowSpan", "start"].forEach(function (e) {
                    v[e] = new m(e, 5, !1, e.toLowerCase(), null, !1, !1);
                });
            var g = /[\-:]([a-z])/g;
            function y(e) {
                return e[1].toUpperCase();
            }
            function b(e, t, n, r) {
                var a = v.hasOwnProperty(t) ? v[t] : null;
                (null !== a ? 0 !== a.type : r || !(2 < t.length) || ("o" !== t[0] && "O" !== t[0]) || ("n" !== t[1] && "N" !== t[1])) &&
                    ((function (e, t, n, r) {
                        if (
                            null === t ||
                            "undefined" === typeof t ||
                            (function (e, t, n, r) {
                                if (null !== n && 0 === n.type) return !1;
                                switch (typeof t) {
                                    case "function":
                                    case "symbol":
                                        return !0;
                                    case "boolean":
                                        return !r && (null !== n ? !n.acceptsBooleans : "data-" !== (e = e.toLowerCase().slice(0, 5)) && "aria-" !== e);
                                    default:
                                        return !1;
                                }
                            })(e, t, n, r)
                        )
                            return !0;
                        if (r) return !1;
                        if (null !== n)
                            switch (n.type) {
                                case 3:
                                    return !t;
                                case 4:
                                    return !1 === t;
                                case 5:
                                    return isNaN(t);
                                case 6:
                                    return isNaN(t) || 1 > t;
                            }
                        return !1;
                    })(t, n, a, r) && (n = null),
                        r || null === a
                            ? (function (e) {
                                return !!d.call(p, e) || (!d.call(h, e) && (f.test(e) ? (p[e] = !0) : ((h[e] = !0), !1)));
                            })(t) && (null === n ? e.removeAttribute(t) : e.setAttribute(t, "" + n))
                            : a.mustUseProperty
                                ? (e[a.propertyName] = null === n ? 3 !== a.type && "" : n)
                                : ((t = a.attributeName), (r = a.attributeNamespace), null === n ? e.removeAttribute(t) : ((n = 3 === (a = a.type) || (4 === a && !0 === n) ? "" : "" + n), r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
            }
            "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
                .split(" ")
                .forEach(function (e) {
                    var t = e.replace(g, y);
                    v[t] = new m(t, 1, !1, e, null, !1, !1);
                }),
                "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function (e) {
                    var t = e.replace(g, y);
                    v[t] = new m(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
                }),
                ["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
                    var t = e.replace(g, y);
                    v[t] = new m(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
                }),
                ["tabIndex", "crossOrigin"].forEach(function (e) {
                    v[e] = new m(e, 1, !1, e.toLowerCase(), null, !1, !1);
                }),
                (v.xlinkHref = new m("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1)),
                ["src", "href", "action", "formAction"].forEach(function (e) {
                    v[e] = new m(e, 1, !1, e.toLowerCase(), null, !0, !0);
                });
            var x = r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
                w = Symbol.for("react.element"),
                k = Symbol.for("react.portal"),
                C = Symbol.for("react.fragment"),
                j = Symbol.for("react.strict_mode"),
                S = Symbol.for("react.profiler"),
                E = Symbol.for("react.provider"),
                N = Symbol.for("react.context"),
                P = Symbol.for("react.forward_ref"),
                T = Symbol.for("react.suspense"),
                O = Symbol.for("react.suspense_list"),
                R = Symbol.for("react.memo"),
                A = Symbol.for("react.lazy");
            Symbol.for("react.scope"), Symbol.for("react.debug_trace_mode");
            var L = Symbol.for("react.offscreen");
            Symbol.for("react.legacy_hidden"), Symbol.for("react.cache"), Symbol.for("react.tracing_marker");
            var I = Symbol.iterator;
            function _(e) {
                return null === e || "object" !== typeof e ? null : "function" === typeof (e = (I && e[I]) || e["@@iterator"]) ? e : null;
            }
            var D,
                M = Object.assign;
            function F(e) {
                if (void 0 === D)
                    try {
                        throw Error();
                    } catch (n) {
                        var t = n.stack.trim().match(/\n( *(at )?)/);
                        D = (t && t[1]) || "";
                    }
                return "\n" + D + e;
            }
            var z = !1;
            function U(e, t) {
                if (!e || z) return "";
                z = !0;
                var n = Error.prepareStackTrace;
                Error.prepareStackTrace = void 0;
                try {
                    if (t)
                        if (
                            ((t = function () {
                                throw Error();
                            }),
                                Object.defineProperty(t.prototype, "props", {
                                    set: function () {
                                        throw Error();
                                    },
                                }),
                                "object" === typeof Reflect && Reflect.construct)
                        ) {
                            try {
                                Reflect.construct(t, []);
                            } catch (u) {
                                var r = u;
                            }
                            Reflect.construct(e, [], t);
                        } else {
                            try {
                                t.call();
                            } catch (u) {
                                r = u;
                            }
                            e.call(t.prototype);
                        }
                    else {
                        try {
                            throw Error();
                        } catch (u) {
                            r = u;
                        }
                        e();
                    }
                } catch (u) {
                    if (u && r && "string" === typeof u.stack) {
                        for (var a = u.stack.split("\n"), o = r.stack.split("\n"), i = a.length - 1, l = o.length - 1; 1 <= i && 0 <= l && a[i] !== o[l];) l--;
                        for (; 1 <= i && 0 <= l; i--, l--)
                            if (a[i] !== o[l]) {
                                if (1 !== i || 1 !== l)
                                    do {
                                        if ((i--, 0 > --l || a[i] !== o[l])) {
                                            var s = "\n" + a[i].replace(" at new ", " at ");
                                            return e.displayName && s.includes("<anonymous>") && (s = s.replace("<anonymous>", e.displayName)), s;
                                        }
                                    } while (1 <= i && 0 <= l);
                                break;
                            }
                    }
                } finally {
                    (z = !1), (Error.prepareStackTrace = n);
                }
                return (e = e ? e.displayName || e.name : "") ? F(e) : "";
            }
            function B(e) {
                switch (e.tag) {
                    case 5:
                        return F(e.type);
                    case 16:
                        return F("Lazy");
                    case 13:
                        return F("Suspense");
                    case 19:
                        return F("SuspenseList");
                    case 0:
                    case 2:
                    case 15:
                        return (e = U(e.type, !1));
                    case 11:
                        return (e = U(e.type.render, !1));
                    case 1:
                        return (e = U(e.type, !0));
                    default:
                        return "";
                }
            }
            function W(e) {
                if (null == e) return null;
                if ("function" === typeof e) return e.displayName || e.name || null;
                if ("string" === typeof e) return e;
                switch (e) {
                    case C:
                        return "Fragment";
                    case k:
                        return "Portal";
                    case S:
                        return "Profiler";
                    case j:
                        return "StrictMode";
                    case T:
                        return "Suspense";
                    case O:
                        return "SuspenseList";
                }
                if ("object" === typeof e)
                    switch (e.$$typeof) {
                        case N:
                            return (e.displayName || "Context") + ".Consumer";
                        case E:
                            return (e._context.displayName || "Context") + ".Provider";
                        case P:
                            var t = e.render;
                            return (e = e.displayName) || (e = "" !== (e = t.displayName || t.name || "") ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
                        case R:
                            return null !== (t = e.displayName || null) ? t : W(e.type) || "Memo";
                        case A:
                            (t = e._payload), (e = e._init);
                            try {
                                return W(e(t));
                            } catch (n) { }
                    }
                return null;
            }
            function V(e) {
                var t = e.type;
                switch (e.tag) {
                    case 24:
                        return "Cache";
                    case 9:
                        return (t.displayName || "Context") + ".Consumer";
                    case 10:
                        return (t._context.displayName || "Context") + ".Provider";
                    case 18:
                        return "DehydratedFragment";
                    case 11:
                        return (e = (e = t.render).displayName || e.name || ""), t.displayName || ("" !== e ? "ForwardRef(" + e + ")" : "ForwardRef");
                    case 7:
                        return "Fragment";
                    case 5:
                        return t;
                    case 4:
                        return "Portal";
                    case 3:
                        return "Root";
                    case 6:
                        return "Text";
                    case 16:
                        return W(t);
                    case 8:
                        return t === j ? "StrictMode" : "Mode";
                    case 22:
                        return "Offscreen";
                    case 12:
                        return "Profiler";
                    case 21:
                        return "Scope";
                    case 13:
                        return "Suspense";
                    case 19:
                        return "SuspenseList";
                    case 25:
                        return "TracingMarker";
                    case 1:
                    case 0:
                    case 17:
                    case 2:
                    case 14:
                    case 15:
                        if ("function" === typeof t) return t.displayName || t.name || null;
                        if ("string" === typeof t) return t;
                }
                return null;
            }
            function H(e) {
                switch (typeof e) {
                    case "boolean":
                    case "number":
                    case "string":
                    case "undefined":
                    case "object":
                        return e;
                    default:
                        return "";
                }
            }
            function q(e) {
                var t = e.type;
                return (e = e.nodeName) && "input" === e.toLowerCase() && ("checkbox" === t || "radio" === t);
            }
            function $(e) {
                e._valueTracker ||
                    (e._valueTracker = (function (e) {
                        var t = q(e) ? "checked" : "value",
                            n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
                            r = "" + e[t];
                        if (!e.hasOwnProperty(t) && "undefined" !== typeof n && "function" === typeof n.get && "function" === typeof n.set) {
                            var a = n.get,
                                o = n.set;
                            return (
                                Object.defineProperty(e, t, {
                                    configurable: !0,
                                    get: function () {
                                        return a.call(this);
                                    },
                                    set: function (e) {
                                        (r = "" + e), o.call(this, e);
                                    },
                                }),
                                Object.defineProperty(e, t, { enumerable: n.enumerable }),
                                {
                                    getValue: function () {
                                        return r;
                                    },
                                    setValue: function (e) {
                                        r = "" + e;
                                    },
                                    stopTracking: function () {
                                        (e._valueTracker = null), delete e[t];
                                    },
                                }
                            );
                        }
                    })(e));
            }
            function G(e) {
                if (!e) return !1;
                var t = e._valueTracker;
                if (!t) return !0;
                var n = t.getValue(),
                    r = "";
                return e && (r = q(e) ? (e.checked ? "true" : "false") : e.value), (e = r) !== n && (t.setValue(e), !0);
            }
            function Q(e) {
                if ("undefined" === typeof (e = e || ("undefined" !== typeof document ? document : void 0))) return null;
                try {
                    return e.activeElement || e.body;
                } catch (t) {
                    return e.body;
                }
            }
            function Y(e, t) {
                var n = t.checked;
                return M({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: null != n ? n : e._wrapperState.initialChecked });
            }
            function K(e, t) {
                var n = null == t.defaultValue ? "" : t.defaultValue,
                    r = null != t.checked ? t.checked : t.defaultChecked;
                (n = H(null != t.value ? t.value : n)), (e._wrapperState = { initialChecked: r, initialValue: n, controlled: "checkbox" === t.type || "radio" === t.type ? null != t.checked : null != t.value });
            }
            function Z(e, t) {
                null != (t = t.checked) && b(e, "checked", t, !1);
            }
            function X(e, t) {
                Z(e, t);
                var n = H(t.value),
                    r = t.type;
                if (null != n) "number" === r ? ((0 === n && "" === e.value) || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
                else if ("submit" === r || "reset" === r) return void e.removeAttribute("value");
                t.hasOwnProperty("value") ? ee(e, t.type, n) : t.hasOwnProperty("defaultValue") && ee(e, t.type, H(t.defaultValue)), null == t.checked && null != t.defaultChecked && (e.defaultChecked = !!t.defaultChecked);
            }
            function J(e, t, n) {
                if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
                    var r = t.type;
                    if (!(("submit" !== r && "reset" !== r) || (void 0 !== t.value && null !== t.value))) return;
                    (t = "" + e._wrapperState.initialValue), n || t === e.value || (e.value = t), (e.defaultValue = t);
                }
                "" !== (n = e.name) && (e.name = ""), (e.defaultChecked = !!e._wrapperState.initialChecked), "" !== n && (e.name = n);
            }
            function ee(e, t, n) {
                ("number" === t && Q(e.ownerDocument) === e) || (null == n ? (e.defaultValue = "" + e._wrapperState.initialValue) : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
            }
            var te = Array.isArray;
            function ne(e, t, n, r) {
                if (((e = e.options), t)) {
                    t = {};
                    for (var a = 0; a < n.length; a++) t["$" + n[a]] = !0;
                    for (n = 0; n < e.length; n++) (a = t.hasOwnProperty("$" + e[n].value)), e[n].selected !== a && (e[n].selected = a), a && r && (e[n].defaultSelected = !0);
                } else {
                    for (n = "" + H(n), t = null, a = 0; a < e.length; a++) {
                        if (e[a].value === n) return (e[a].selected = !0), void (r && (e[a].defaultSelected = !0));
                        null !== t || e[a].disabled || (t = e[a]);
                    }
                    null !== t && (t.selected = !0);
                }
            }
            function re(e, t) {
                if (null != t.dangerouslySetInnerHTML) throw Error(o(91));
                return M({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
            }
            function ae(e, t) {
                var n = t.value;
                if (null == n) {
                    if (((n = t.children), (t = t.defaultValue), null != n)) {
                        if (null != t) throw Error(o(92));
                        if (te(n)) {
                            if (1 < n.length) throw Error(o(93));
                            n = n[0];
                        }
                        t = n;
                    }
                    null == t && (t = ""), (n = t);
                }
                e._wrapperState = { initialValue: H(n) };
            }
            function oe(e, t) {
                var n = H(t.value),
                    r = H(t.defaultValue);
                null != n && ((n = "" + n) !== e.value && (e.value = n), null == t.defaultValue && e.defaultValue !== n && (e.defaultValue = n)), null != r && (e.defaultValue = "" + r);
            }
            function ie(e) {
                var t = e.textContent;
                t === e._wrapperState.initialValue && "" !== t && null !== t && (e.value = t);
            }
            function le(e) {
                switch (e) {
                    case "svg":
                        return "http://www.w3.org/2000/svg";
                    case "math":
                        return "http://www.w3.org/1998/Math/MathML";
                    default:
                        return "http://www.w3.org/1999/xhtml";
                }
            }
            function se(e, t) {
                return null == e || "http://www.w3.org/1999/xhtml" === e ? le(t) : "http://www.w3.org/2000/svg" === e && "foreignObject" === t ? "http://www.w3.org/1999/xhtml" : e;
            }
            var ue,
                ce,
                de =
                    ((ce = function (e, t) {
                        if ("http://www.w3.org/2000/svg" !== e.namespaceURI || "innerHTML" in e) e.innerHTML = t;
                        else {
                            for ((ue = ue || document.createElement("div")).innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = ue.firstChild; e.firstChild;) e.removeChild(e.firstChild);
                            for (; t.firstChild;) e.appendChild(t.firstChild);
                        }
                    }),
                        "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction
                            ? function (e, t, n, r) {
                                MSApp.execUnsafeLocalFunction(function () {
                                    return ce(e, t);
                                });
                            }
                            : ce);
            function fe(e, t) {
                if (t) {
                    var n = e.firstChild;
                    if (n && n === e.lastChild && 3 === n.nodeType) return void (n.nodeValue = t);
                }
                e.textContent = t;
            }
            var he = {
                animationIterationCount: !0,
                aspectRatio: !0,
                borderImageOutset: !0,
                borderImageSlice: !0,
                borderImageWidth: !0,
                boxFlex: !0,
                boxFlexGroup: !0,
                boxOrdinalGroup: !0,
                columnCount: !0,
                columns: !0,
                flex: !0,
                flexGrow: !0,
                flexPositive: !0,
                flexShrink: !0,
                flexNegative: !0,
                flexOrder: !0,
                gridArea: !0,
                gridRow: !0,
                gridRowEnd: !0,
                gridRowSpan: !0,
                gridRowStart: !0,
                gridColumn: !0,
                gridColumnEnd: !0,
                gridColumnSpan: !0,
                gridColumnStart: !0,
                fontWeight: !0,
                lineClamp: !0,
                lineHeight: !0,
                opacity: !0,
                order: !0,
                orphans: !0,
                tabSize: !0,
                widows: !0,
                zIndex: !0,
                zoom: !0,
                fillOpacity: !0,
                floodOpacity: !0,
                stopOpacity: !0,
                strokeDasharray: !0,
                strokeDashoffset: !0,
                strokeMiterlimit: !0,
                strokeOpacity: !0,
                strokeWidth: !0,
            },
                pe = ["Webkit", "ms", "Moz", "O"];
            function me(e, t, n) {
                return null == t || "boolean" === typeof t || "" === t ? "" : n || "number" !== typeof t || 0 === t || (he.hasOwnProperty(e) && he[e]) ? ("" + t).trim() : t + "px";
            }
            function ve(e, t) {
                for (var n in ((e = e.style), t))
                    if (t.hasOwnProperty(n)) {
                        var r = 0 === n.indexOf("--"),
                            a = me(n, t[n], r);
                        "float" === n && (n = "cssFloat"), r ? e.setProperty(n, a) : (e[n] = a);
                    }
            }
            Object.keys(he).forEach(function (e) {
                pe.forEach(function (t) {
                    (t = t + e.charAt(0).toUpperCase() + e.substring(1)), (he[t] = he[e]);
                });
            });
            var ge = M({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
            function ye(e, t) {
                if (t) {
                    if (ge[e] && (null != t.children || null != t.dangerouslySetInnerHTML)) throw Error(o(137, e));
                    if (null != t.dangerouslySetInnerHTML) {
                        if (null != t.children) throw Error(o(60));
                        if ("object" !== typeof t.dangerouslySetInnerHTML || !("__html" in t.dangerouslySetInnerHTML)) throw Error(o(61));
                    }
                    if (null != t.style && "object" !== typeof t.style) throw Error(o(62));
                }
            }
            function be(e, t) {
                if (-1 === e.indexOf("-")) return "string" === typeof t.is;
                switch (e) {
                    case "annotation-xml":
                    case "color-profile":
                    case "font-face":
                    case "font-face-src":
                    case "font-face-uri":
                    case "font-face-format":
                    case "font-face-name":
                    case "missing-glyph":
                        return !1;
                    default:
                        return !0;
                }
            }
            var xe = null;
            function we(e) {
                return (e = e.target || e.srcElement || window).correspondingUseElement && (e = e.correspondingUseElement), 3 === e.nodeType ? e.parentNode : e;
            }
            var ke = null,
                Ce = null,
                je = null;
            function Se(e) {
                if ((e = ba(e))) {
                    if ("function" !== typeof ke) throw Error(o(280));
                    var t = e.stateNode;
                    t && ((t = wa(t)), ke(e.stateNode, e.type, t));
                }
            }
            function Ee(e) {
                Ce ? (je ? je.push(e) : (je = [e])) : (Ce = e);
            }
            function Ne() {
                if (Ce) {
                    var e = Ce,
                        t = je;
                    if (((je = Ce = null), Se(e), t)) for (e = 0; e < t.length; e++) Se(t[e]);
                }
            }
            function Pe(e, t) {
                return e(t);
            }
            function Te() { }
            var Oe = !1;
            function Re(e, t, n) {
                if (Oe) return e(t, n);
                Oe = !0;
                try {
                    return Pe(e, t, n);
                } finally {
                    (Oe = !1), (null !== Ce || null !== je) && (Te(), Ne());
                }
            }
            function Ae(e, t) {
                var n = e.stateNode;
                if (null === n) return null;
                var r = wa(n);
                if (null === r) return null;
                n = r[t];
                e: switch (t) {
                    case "onClick":
                    case "onClickCapture":
                    case "onDoubleClick":
                    case "onDoubleClickCapture":
                    case "onMouseDown":
                    case "onMouseDownCapture":
                    case "onMouseMove":
                    case "onMouseMoveCapture":
                    case "onMouseUp":
                    case "onMouseUpCapture":
                    case "onMouseEnter":
                        (r = !r.disabled) || (r = !("button" === (e = e.type) || "input" === e || "select" === e || "textarea" === e)), (e = !r);
                        break e;
                    default:
                        e = !1;
                }
                if (e) return null;
                if (n && "function" !== typeof n) throw Error(o(231, t, typeof n));
                return n;
            }
            var Le = !1;
            if (c)
                try {
                    var Ie = {};
                    Object.defineProperty(Ie, "passive", {
                        get: function () {
                            Le = !0;
                        },
                    }),
                        window.addEventListener("test", Ie, Ie),
                        window.removeEventListener("test", Ie, Ie);
                } catch (ce) {
                    Le = !1;
                }
            function _e(e, t, n, r, a, o, i, l, s) {
                var u = Array.prototype.slice.call(arguments, 3);
                try {
                    t.apply(n, u);
                } catch (c) {
                    this.onError(c);
                }
            }
            var De = !1,
                Me = null,
                Fe = !1,
                ze = null,
                Ue = {
                    onError: function (e) {
                        (De = !0), (Me = e);
                    },
                };
            function Be(e, t, n, r, a, o, i, l, s) {
                (De = !1), (Me = null), _e.apply(Ue, arguments);
            }
            function We(e) {
                var t = e,
                    n = e;
                if (e.alternate) for (; t.return;) t = t.return;
                else {
                    e = t;
                    do {
                        0 !== (4098 & (t = e).flags) && (n = t.return), (e = t.return);
                    } while (e);
                }
                return 3 === t.tag ? n : null;
            }
            function Ve(e) {
                if (13 === e.tag) {
                    var t = e.memoizedState;
                    if ((null === t && null !== (e = e.alternate) && (t = e.memoizedState), null !== t)) return t.dehydrated;
                }
                return null;
            }
            function He(e) {
                if (We(e) !== e) throw Error(o(188));
            }
            function qe(e) {
                return null !==
                    (e = (function (e) {
                        var t = e.alternate;
                        if (!t) {
                            if (null === (t = We(e))) throw Error(o(188));
                            return t !== e ? null : e;
                        }
                        for (var n = e, r = t; ;) {
                            var a = n.return;
                            if (null === a) break;
                            var i = a.alternate;
                            if (null === i) {
                                if (null !== (r = a.return)) {
                                    n = r;
                                    continue;
                                }
                                break;
                            }
                            if (a.child === i.child) {
                                for (i = a.child; i;) {
                                    if (i === n) return He(a), e;
                                    if (i === r) return He(a), t;
                                    i = i.sibling;
                                }
                                throw Error(o(188));
                            }
                            if (n.return !== r.return) (n = a), (r = i);
                            else {
                                for (var l = !1, s = a.child; s;) {
                                    if (s === n) {
                                        (l = !0), (n = a), (r = i);
                                        break;
                                    }
                                    if (s === r) {
                                        (l = !0), (r = a), (n = i);
                                        break;
                                    }
                                    s = s.sibling;
                                }
                                if (!l) {
                                    for (s = i.child; s;) {
                                        if (s === n) {
                                            (l = !0), (n = i), (r = a);
                                            break;
                                        }
                                        if (s === r) {
                                            (l = !0), (r = i), (n = a);
                                            break;
                                        }
                                        s = s.sibling;
                                    }
                                    if (!l) throw Error(o(189));
                                }
                            }
                            if (n.alternate !== r) throw Error(o(190));
                        }
                        if (3 !== n.tag) throw Error(o(188));
                        return n.stateNode.current === n ? e : t;
                    })(e))
                    ? $e(e)
                    : null;
            }
            function $e(e) {
                if (5 === e.tag || 6 === e.tag) return e;
                for (e = e.child; null !== e;) {
                    var t = $e(e);
                    if (null !== t) return t;
                    e = e.sibling;
                }
                return null;
            }
            var Ge = a.unstable_scheduleCallback,
                Qe = a.unstable_cancelCallback,
                Ye = a.unstable_shouldYield,
                Ke = a.unstable_requestPaint,
                Ze = a.unstable_now,
                Xe = a.unstable_getCurrentPriorityLevel,
                Je = a.unstable_ImmediatePriority,
                et = a.unstable_UserBlockingPriority,
                tt = a.unstable_NormalPriority,
                nt = a.unstable_LowPriority,
                rt = a.unstable_IdlePriority,
                at = null,
                ot = null;
            var it = Math.clz32
                ? Math.clz32
                : function (e) {
                    return (e >>>= 0), 0 === e ? 32 : (31 - ((lt(e) / st) | 0)) | 0;
                },
                lt = Math.log,
                st = Math.LN2;
            var ut = 64,
                ct = 4194304;
            function dt(e) {
                switch (e & -e) {
                    case 1:
                        return 1;
                    case 2:
                        return 2;
                    case 4:
                        return 4;
                    case 8:
                        return 8;
                    case 16:
                        return 16;
                    case 32:
                        return 32;
                    case 64:
                    case 128:
                    case 256:
                    case 512:
                    case 1024:
                    case 2048:
                    case 4096:
                    case 8192:
                    case 16384:
                    case 32768:
                    case 65536:
                    case 131072:
                    case 262144:
                    case 524288:
                    case 1048576:
                    case 2097152:
                        return 4194240 & e;
                    case 4194304:
                    case 8388608:
                    case 16777216:
                    case 33554432:
                    case 67108864:
                        return 130023424 & e;
                    case 134217728:
                        return 134217728;
                    case 268435456:
                        return 268435456;
                    case 536870912:
                        return 536870912;
                    case 1073741824:
                        return 1073741824;
                    default:
                        return e;
                }
            }
            function ft(e, t) {
                var n = e.pendingLanes;
                if (0 === n) return 0;
                var r = 0,
                    a = e.suspendedLanes,
                    o = e.pingedLanes,
                    i = 268435455 & n;
                if (0 !== i) {
                    var l = i & ~a;
                    0 !== l ? (r = dt(l)) : 0 !== (o &= i) && (r = dt(o));
                } else 0 !== (i = n & ~a) ? (r = dt(i)) : 0 !== o && (r = dt(o));
                if (0 === r) return 0;
                if (0 !== t && t !== r && 0 === (t & a) && ((a = r & -r) >= (o = t & -t) || (16 === a && 0 !== (4194240 & o)))) return t;
                if ((0 !== (4 & r) && (r |= 16 & n), 0 !== (t = e.entangledLanes))) for (e = e.entanglements, t &= r; 0 < t;) (a = 1 << (n = 31 - it(t))), (r |= e[n]), (t &= ~a);
                return r;
            }
            function ht(e, t) {
                switch (e) {
                    case 1:
                    case 2:
                    case 4:
                        return t + 250;
                    case 8:
                    case 16:
                    case 32:
                    case 64:
                    case 128:
                    case 256:
                    case 512:
                    case 1024:
                    case 2048:
                    case 4096:
                    case 8192:
                    case 16384:
                    case 32768:
                    case 65536:
                    case 131072:
                    case 262144:
                    case 524288:
                    case 1048576:
                    case 2097152:
                        return t + 5e3;
                    default:
                        return -1;
                }
            }
            function pt(e) {
                return 0 !== (e = -1073741825 & e.pendingLanes) ? e : 1073741824 & e ? 1073741824 : 0;
            }
            function mt() {
                var e = ut;
                return 0 === (4194240 & (ut <<= 1)) && (ut = 64), e;
            }
            function vt(e) {
                for (var t = [], n = 0; 31 > n; n++) t.push(e);
                return t;
            }
            function gt(e, t, n) {
                (e.pendingLanes |= t), 536870912 !== t && ((e.suspendedLanes = 0), (e.pingedLanes = 0)), ((e = e.eventTimes)[(t = 31 - it(t))] = n);
            }
            function yt(e, t) {
                var n = (e.entangledLanes |= t);
                for (e = e.entanglements; n;) {
                    var r = 31 - it(n),
                        a = 1 << r;
                    (a & t) | (e[r] & t) && (e[r] |= t), (n &= ~a);
                }
            }
            var bt = 0;
            function xt(e) {
                return 1 < (e &= -e) ? (4 < e ? (0 !== (268435455 & e) ? 16 : 536870912) : 4) : 1;
            }
            var wt,
                kt,
                Ct,
                jt,
                St,
                Et = !1,
                Nt = [],
                Pt = null,
                Tt = null,
                Ot = null,
                Rt = new Map(),
                At = new Map(),
                Lt = [],
                It = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
                    " "
                );
            function _t(e, t) {
                switch (e) {
                    case "focusin":
                    case "focusout":
                        Pt = null;
                        break;
                    case "dragenter":
                    case "dragleave":
                        Tt = null;
                        break;
                    case "mouseover":
                    case "mouseout":
                        Ot = null;
                        break;
                    case "pointerover":
                    case "pointerout":
                        Rt.delete(t.pointerId);
                        break;
                    case "gotpointercapture":
                    case "lostpointercapture":
                        At.delete(t.pointerId);
                }
            }
            function Dt(e, t, n, r, a, o) {
                return null === e || e.nativeEvent !== o
                    ? ((e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: o, targetContainers: [a] }), null !== t && null !== (t = ba(t)) && kt(t), e)
                    : ((e.eventSystemFlags |= r), (t = e.targetContainers), null !== a && -1 === t.indexOf(a) && t.push(a), e);
            }
            function Mt(e) {
                var t = ya(e.target);
                if (null !== t) {
                    var n = We(t);
                    if (null !== n)
                        if (13 === (t = n.tag)) {
                            if (null !== (t = Ve(n)))
                                return (
                                    (e.blockedOn = t),
                                    void St(e.priority, function () {
                                        Ct(n);
                                    })
                                );
                        } else if (3 === t && n.stateNode.current.memoizedState.isDehydrated) return void (e.blockedOn = 3 === n.tag ? n.stateNode.containerInfo : null);
                }
                e.blockedOn = null;
            }
            function Ft(e) {
                if (null !== e.blockedOn) return !1;
                for (var t = e.targetContainers; 0 < t.length;) {
                    var n = Yt(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
                    if (null !== n) return null !== (t = ba(n)) && kt(t), (e.blockedOn = n), !1;
                    var r = new (n = e.nativeEvent).constructor(n.type, n);
                    (xe = r), n.target.dispatchEvent(r), (xe = null), t.shift();
                }
                return !0;
            }
            function zt(e, t, n) {
                Ft(e) && n.delete(t);
            }
            function Ut() {
                (Et = !1), null !== Pt && Ft(Pt) && (Pt = null), null !== Tt && Ft(Tt) && (Tt = null), null !== Ot && Ft(Ot) && (Ot = null), Rt.forEach(zt), At.forEach(zt);
            }
            function Bt(e, t) {
                e.blockedOn === t && ((e.blockedOn = null), Et || ((Et = !0), a.unstable_scheduleCallback(a.unstable_NormalPriority, Ut)));
            }
            function Wt(e) {
                function t(t) {
                    return Bt(t, e);
                }
                if (0 < Nt.length) {
                    Bt(Nt[0], e);
                    for (var n = 1; n < Nt.length; n++) {
                        var r = Nt[n];
                        r.blockedOn === e && (r.blockedOn = null);
                    }
                }
                for (null !== Pt && Bt(Pt, e), null !== Tt && Bt(Tt, e), null !== Ot && Bt(Ot, e), Rt.forEach(t), At.forEach(t), n = 0; n < Lt.length; n++) (r = Lt[n]).blockedOn === e && (r.blockedOn = null);
                for (; 0 < Lt.length && null === (n = Lt[0]).blockedOn;) Mt(n), null === n.blockedOn && Lt.shift();
            }
            var Vt = x.ReactCurrentBatchConfig,
                Ht = !0;
            function qt(e, t, n, r) {
                var a = bt,
                    o = Vt.transition;
                Vt.transition = null;
                try {
                    (bt = 1), Gt(e, t, n, r);
                } finally {
                    (bt = a), (Vt.transition = o);
                }
            }
            function $t(e, t, n, r) {
                var a = bt,
                    o = Vt.transition;
                Vt.transition = null;
                try {
                    (bt = 4), Gt(e, t, n, r);
                } finally {
                    (bt = a), (Vt.transition = o);
                }
            }
            function Gt(e, t, n, r) {
                if (Ht) {
                    var a = Yt(e, t, n, r);
                    if (null === a) Hr(e, t, r, Qt, n), _t(e, r);
                    else if (
                        (function (e, t, n, r, a) {
                            switch (t) {
                                case "focusin":
                                    return (Pt = Dt(Pt, e, t, n, r, a)), !0;
                                case "dragenter":
                                    return (Tt = Dt(Tt, e, t, n, r, a)), !0;
                                case "mouseover":
                                    return (Ot = Dt(Ot, e, t, n, r, a)), !0;
                                case "pointerover":
                                    var o = a.pointerId;
                                    return Rt.set(o, Dt(Rt.get(o) || null, e, t, n, r, a)), !0;
                                case "gotpointercapture":
                                    return (o = a.pointerId), At.set(o, Dt(At.get(o) || null, e, t, n, r, a)), !0;
                            }
                            return !1;
                        })(a, e, t, n, r)
                    )
                        r.stopPropagation();
                    else if ((_t(e, r), 4 & t && -1 < It.indexOf(e))) {
                        for (; null !== a;) {
                            var o = ba(a);
                            if ((null !== o && wt(o), null === (o = Yt(e, t, n, r)) && Hr(e, t, r, Qt, n), o === a)) break;
                            a = o;
                        }
                        null !== a && r.stopPropagation();
                    } else Hr(e, t, r, null, n);
                }
            }
            var Qt = null;
            function Yt(e, t, n, r) {
                if (((Qt = null), null !== (e = ya((e = we(r))))))
                    if (null === (t = We(e))) e = null;
                    else if (13 === (n = t.tag)) {
                        if (null !== (e = Ve(t))) return e;
                        e = null;
                    } else if (3 === n) {
                        if (t.stateNode.current.memoizedState.isDehydrated) return 3 === t.tag ? t.stateNode.containerInfo : null;
                        e = null;
                    } else t !== e && (e = null);
                return (Qt = e), null;
            }
            function Kt(e) {
                switch (e) {
                    case "cancel":
                    case "click":
                    case "close":
                    case "contextmenu":
                    case "copy":
                    case "cut":
                    case "auxclick":
                    case "dblclick":
                    case "dragend":
                    case "dragstart":
                    case "drop":
                    case "focusin":
                    case "focusout":
                    case "input":
                    case "invalid":
                    case "keydown":
                    case "keypress":
                    case "keyup":
                    case "mousedown":
                    case "mouseup":
                    case "paste":
                    case "pause":
                    case "play":
                    case "pointercancel":
                    case "pointerdown":
                    case "pointerup":
                    case "ratechange":
                    case "reset":
                    case "resize":
                    case "seeked":
                    case "submit":
                    case "touchcancel":
                    case "touchend":
                    case "touchstart":
                    case "volumechange":
                    case "change":
                    case "selectionchange":
                    case "textInput":
                    case "compositionstart":
                    case "compositionend":
                    case "compositionupdate":
                    case "beforeblur":
                    case "afterblur":
                    case "beforeinput":
                    case "blur":
                    case "fullscreenchange":
                    case "focus":
                    case "hashchange":
                    case "popstate":
                    case "select":
                    case "selectstart":
                        return 1;
                    case "drag":
                    case "dragenter":
                    case "dragexit":
                    case "dragleave":
                    case "dragover":
                    case "mousemove":
                    case "mouseout":
                    case "mouseover":
                    case "pointermove":
                    case "pointerout":
                    case "pointerover":
                    case "scroll":
                    case "toggle":
                    case "touchmove":
                    case "wheel":
                    case "mouseenter":
                    case "mouseleave":
                    case "pointerenter":
                    case "pointerleave":
                        return 4;
                    case "message":
                        switch (Xe()) {
                            case Je:
                                return 1;
                            case et:
                                return 4;
                            case tt:
                            case nt:
                                return 16;
                            case rt:
                                return 536870912;
                            default:
                                return 16;
                        }
                    default:
                        return 16;
                }
            }
            var Zt = null,
                Xt = null,
                Jt = null;
            function en() {
                if (Jt) return Jt;
                var e,
                    t,
                    n = Xt,
                    r = n.length,
                    a = "value" in Zt ? Zt.value : Zt.textContent,
                    o = a.length;
                for (e = 0; e < r && n[e] === a[e]; e++);
                var i = r - e;
                for (t = 1; t <= i && n[r - t] === a[o - t]; t++);
                return (Jt = a.slice(e, 1 < t ? 1 - t : void 0));
            }
            function tn(e) {
                var t = e.keyCode;
                return "charCode" in e ? 0 === (e = e.charCode) && 13 === t && (e = 13) : (e = t), 10 === e && (e = 13), 32 <= e || 13 === e ? e : 0;
            }
            function nn() {
                return !0;
            }
            function rn() {
                return !1;
            }
            function an(e) {
                function t(t, n, r, a, o) {
                    for (var i in ((this._reactName = t), (this._targetInst = r), (this.type = n), (this.nativeEvent = a), (this.target = o), (this.currentTarget = null), e))
                        e.hasOwnProperty(i) && ((t = e[i]), (this[i] = t ? t(a) : a[i]));
                    return (this.isDefaultPrevented = (null != a.defaultPrevented ? a.defaultPrevented : !1 === a.returnValue) ? nn : rn), (this.isPropagationStopped = rn), this;
                }
                return (
                    M(t.prototype, {
                        preventDefault: function () {
                            this.defaultPrevented = !0;
                            var e = this.nativeEvent;
                            e && (e.preventDefault ? e.preventDefault() : "unknown" !== typeof e.returnValue && (e.returnValue = !1), (this.isDefaultPrevented = nn));
                        },
                        stopPropagation: function () {
                            var e = this.nativeEvent;
                            e && (e.stopPropagation ? e.stopPropagation() : "unknown" !== typeof e.cancelBubble && (e.cancelBubble = !0), (this.isPropagationStopped = nn));
                        },
                        persist: function () { },
                        isPersistent: nn,
                    }),
                    t
                );
            }
            var on,
                ln,
                sn,
                un = {
                    eventPhase: 0,
                    bubbles: 0,
                    cancelable: 0,
                    timeStamp: function (e) {
                        return e.timeStamp || Date.now();
                    },
                    defaultPrevented: 0,
                    isTrusted: 0,
                },
                cn = an(un),
                dn = M({}, un, { view: 0, detail: 0 }),
                fn = an(dn),
                hn = M({}, dn, {
                    screenX: 0,
                    screenY: 0,
                    clientX: 0,
                    clientY: 0,
                    pageX: 0,
                    pageY: 0,
                    ctrlKey: 0,
                    shiftKey: 0,
                    altKey: 0,
                    metaKey: 0,
                    getModifierState: Sn,
                    button: 0,
                    buttons: 0,
                    relatedTarget: function (e) {
                        return void 0 === e.relatedTarget ? (e.fromElement === e.srcElement ? e.toElement : e.fromElement) : e.relatedTarget;
                    },
                    movementX: function (e) {
                        return "movementX" in e ? e.movementX : (e !== sn && (sn && "mousemove" === e.type ? ((on = e.screenX - sn.screenX), (ln = e.screenY - sn.screenY)) : (ln = on = 0), (sn = e)), on);
                    },
                    movementY: function (e) {
                        return "movementY" in e ? e.movementY : ln;
                    },
                }),
                pn = an(hn),
                mn = an(M({}, hn, { dataTransfer: 0 })),
                vn = an(M({}, dn, { relatedTarget: 0 })),
                gn = an(M({}, un, { animationName: 0, elapsedTime: 0, pseudoElement: 0 })),
                yn = M({}, un, {
                    clipboardData: function (e) {
                        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
                    },
                }),
                bn = an(yn),
                xn = an(M({}, un, { data: 0 })),
                wn = {
                    Esc: "Escape",
                    Spacebar: " ",
                    Left: "ArrowLeft",
                    Up: "ArrowUp",
                    Right: "ArrowRight",
                    Down: "ArrowDown",
                    Del: "Delete",
                    Win: "OS",
                    Menu: "ContextMenu",
                    Apps: "ContextMenu",
                    Scroll: "ScrollLock",
                    MozPrintableKey: "Unidentified",
                },
                kn = {
                    8: "Backspace",
                    9: "Tab",
                    12: "Clear",
                    13: "Enter",
                    16: "Shift",
                    17: "Control",
                    18: "Alt",
                    19: "Pause",
                    20: "CapsLock",
                    27: "Escape",
                    32: " ",
                    33: "PageUp",
                    34: "PageDown",
                    35: "End",
                    36: "Home",
                    37: "ArrowLeft",
                    38: "ArrowUp",
                    39: "ArrowRight",
                    40: "ArrowDown",
                    45: "Insert",
                    46: "Delete",
                    112: "F1",
                    113: "F2",
                    114: "F3",
                    115: "F4",
                    116: "F5",
                    117: "F6",
                    118: "F7",
                    119: "F8",
                    120: "F9",
                    121: "F10",
                    122: "F11",
                    123: "F12",
                    144: "NumLock",
                    145: "ScrollLock",
                    224: "Meta",
                },
                Cn = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
            function jn(e) {
                var t = this.nativeEvent;
                return t.getModifierState ? t.getModifierState(e) : !!(e = Cn[e]) && !!t[e];
            }
            function Sn() {
                return jn;
            }
            var En = M({}, dn, {
                key: function (e) {
                    if (e.key) {
                        var t = wn[e.key] || e.key;
                        if ("Unidentified" !== t) return t;
                    }
                    return "keypress" === e.type ? (13 === (e = tn(e)) ? "Enter" : String.fromCharCode(e)) : "keydown" === e.type || "keyup" === e.type ? kn[e.keyCode] || "Unidentified" : "";
                },
                code: 0,
                location: 0,
                ctrlKey: 0,
                shiftKey: 0,
                altKey: 0,
                metaKey: 0,
                repeat: 0,
                locale: 0,
                getModifierState: Sn,
                charCode: function (e) {
                    return "keypress" === e.type ? tn(e) : 0;
                },
                keyCode: function (e) {
                    return "keydown" === e.type || "keyup" === e.type ? e.keyCode : 0;
                },
                which: function (e) {
                    return "keypress" === e.type ? tn(e) : "keydown" === e.type || "keyup" === e.type ? e.keyCode : 0;
                },
            }),
                Nn = an(En),
                Pn = an(M({}, hn, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 })),
                Tn = an(M({}, dn, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: Sn })),
                On = an(M({}, un, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 })),
                Rn = M({}, hn, {
                    deltaX: function (e) {
                        return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
                    },
                    deltaY: function (e) {
                        return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
                    },
                    deltaZ: 0,
                    deltaMode: 0,
                }),
                An = an(Rn),
                Ln = [9, 13, 27, 32],
                In = c && "CompositionEvent" in window,
                _n = null;
            c && "documentMode" in document && (_n = document.documentMode);
            var Dn = c && "TextEvent" in window && !_n,
                Mn = c && (!In || (_n && 8 < _n && 11 >= _n)),
                Fn = String.fromCharCode(32),
                zn = !1;
            function Un(e, t) {
                switch (e) {
                    case "keyup":
                        return -1 !== Ln.indexOf(t.keyCode);
                    case "keydown":
                        return 229 !== t.keyCode;
                    case "keypress":
                    case "mousedown":
                    case "focusout":
                        return !0;
                    default:
                        return !1;
                }
            }
            function Bn(e) {
                return "object" === typeof (e = e.detail) && "data" in e ? e.data : null;
            }
            var Wn = !1;
            var Vn = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
            function Hn(e) {
                var t = e && e.nodeName && e.nodeName.toLowerCase();
                return "input" === t ? !!Vn[e.type] : "textarea" === t;
            }
            function qn(e, t, n, r) {
                Ee(r), 0 < (t = $r(t, "onChange")).length && ((n = new cn("onChange", "change", null, n, r)), e.push({ event: n, listeners: t }));
            }
            var $n = null,
                Gn = null;
            function Qn(e) {
                Fr(e, 0);
            }
            function Yn(e) {
                if (G(xa(e))) return e;
            }
            function Kn(e, t) {
                if ("change" === e) return t;
            }
            var Zn = !1;
            if (c) {
                var Xn;
                if (c) {
                    var Jn = "oninput" in document;
                    if (!Jn) {
                        var er = document.createElement("div");
                        er.setAttribute("oninput", "return;"), (Jn = "function" === typeof er.oninput);
                    }
                    Xn = Jn;
                } else Xn = !1;
                Zn = Xn && (!document.documentMode || 9 < document.documentMode);
            }
            function tr() {
                $n && ($n.detachEvent("onpropertychange", nr), (Gn = $n = null));
            }
            function nr(e) {
                if ("value" === e.propertyName && Yn(Gn)) {
                    var t = [];
                    qn(t, Gn, e, we(e)), Re(Qn, t);
                }
            }
            function rr(e, t, n) {
                "focusin" === e ? (tr(), (Gn = n), ($n = t).attachEvent("onpropertychange", nr)) : "focusout" === e && tr();
            }
            function ar(e) {
                if ("selectionchange" === e || "keyup" === e || "keydown" === e) return Yn(Gn);
            }
            function or(e, t) {
                if ("click" === e) return Yn(t);
            }
            function ir(e, t) {
                if ("input" === e || "change" === e) return Yn(t);
            }
            var lr =
                "function" === typeof Object.is
                    ? Object.is
                    : function (e, t) {
                        return (e === t && (0 !== e || 1 / e === 1 / t)) || (e !== e && t !== t);
                    };
            function sr(e, t) {
                if (lr(e, t)) return !0;
                if ("object" !== typeof e || null === e || "object" !== typeof t || null === t) return !1;
                var n = Object.keys(e),
                    r = Object.keys(t);
                if (n.length !== r.length) return !1;
                for (r = 0; r < n.length; r++) {
                    var a = n[r];
                    if (!d.call(t, a) || !lr(e[a], t[a])) return !1;
                }
                return !0;
            }
            function ur(e) {
                for (; e && e.firstChild;) e = e.firstChild;
                return e;
            }
            function cr(e, t) {
                var n,
                    r = ur(e);
                for (e = 0; r;) {
                    if (3 === r.nodeType) {
                        if (((n = e + r.textContent.length), e <= t && n >= t)) return { node: r, offset: t - e };
                        e = n;
                    }
                    e: {
                        for (; r;) {
                            if (r.nextSibling) {
                                r = r.nextSibling;
                                break e;
                            }
                            r = r.parentNode;
                        }
                        r = void 0;
                    }
                    r = ur(r);
                }
            }
            function dr(e, t) {
                return !(!e || !t) && (e === t || ((!e || 3 !== e.nodeType) && (t && 3 === t.nodeType ? dr(e, t.parentNode) : "contains" in e ? e.contains(t) : !!e.compareDocumentPosition && !!(16 & e.compareDocumentPosition(t)))));
            }
            function fr() {
                for (var e = window, t = Q(); t instanceof e.HTMLIFrameElement;) {
                    try {
                        var n = "string" === typeof t.contentWindow.location.href;
                    } catch (r) {
                        n = !1;
                    }
                    if (!n) break;
                    t = Q((e = t.contentWindow).document);
                }
                return t;
            }
            function hr(e) {
                var t = e && e.nodeName && e.nodeName.toLowerCase();
                return t && (("input" === t && ("text" === e.type || "search" === e.type || "tel" === e.type || "url" === e.type || "password" === e.type)) || "textarea" === t || "true" === e.contentEditable);
            }
            function pr(e) {
                var t = fr(),
                    n = e.focusedElem,
                    r = e.selectionRange;
                if (t !== n && n && n.ownerDocument && dr(n.ownerDocument.documentElement, n)) {
                    if (null !== r && hr(n))
                        if (((t = r.start), void 0 === (e = r.end) && (e = t), "selectionStart" in n)) (n.selectionStart = t), (n.selectionEnd = Math.min(e, n.value.length));
                        else if ((e = ((t = n.ownerDocument || document) && t.defaultView) || window).getSelection) {
                            e = e.getSelection();
                            var a = n.textContent.length,
                                o = Math.min(r.start, a);
                            (r = void 0 === r.end ? o : Math.min(r.end, a)), !e.extend && o > r && ((a = r), (r = o), (o = a)), (a = cr(n, o));
                            var i = cr(n, r);
                            a &&
                                i &&
                                (1 !== e.rangeCount || e.anchorNode !== a.node || e.anchorOffset !== a.offset || e.focusNode !== i.node || e.focusOffset !== i.offset) &&
                                ((t = t.createRange()).setStart(a.node, a.offset), e.removeAllRanges(), o > r ? (e.addRange(t), e.extend(i.node, i.offset)) : (t.setEnd(i.node, i.offset), e.addRange(t)));
                        }
                    for (t = [], e = n; (e = e.parentNode);) 1 === e.nodeType && t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
                    for ("function" === typeof n.focus && n.focus(), n = 0; n < t.length; n++) ((e = t[n]).element.scrollLeft = e.left), (e.element.scrollTop = e.top);
                }
            }
            var mr = c && "documentMode" in document && 11 >= document.documentMode,
                vr = null,
                gr = null,
                yr = null,
                br = !1;
            function xr(e, t, n) {
                var r = n.window === n ? n.document : 9 === n.nodeType ? n : n.ownerDocument;
                br ||
                    null == vr ||
                    vr !== Q(r) ||
                    ("selectionStart" in (r = vr) && hr(r)
                        ? (r = { start: r.selectionStart, end: r.selectionEnd })
                        : (r = { anchorNode: (r = ((r.ownerDocument && r.ownerDocument.defaultView) || window).getSelection()).anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }),
                        (yr && sr(yr, r)) || ((yr = r), 0 < (r = $r(gr, "onSelect")).length && ((t = new cn("onSelect", "select", null, t, n)), e.push({ event: t, listeners: r }), (t.target = vr))));
            }
            function wr(e, t) {
                var n = {};
                return (n[e.toLowerCase()] = t.toLowerCase()), (n["Webkit" + e] = "webkit" + t), (n["Moz" + e] = "moz" + t), n;
            }
            var kr = { animationend: wr("Animation", "AnimationEnd"), animationiteration: wr("Animation", "AnimationIteration"), animationstart: wr("Animation", "AnimationStart"), transitionend: wr("Transition", "TransitionEnd") },
                Cr = {},
                jr = {};
            function Sr(e) {
                if (Cr[e]) return Cr[e];
                if (!kr[e]) return e;
                var t,
                    n = kr[e];
                for (t in n) if (n.hasOwnProperty(t) && t in jr) return (Cr[e] = n[t]);
                return e;
            }
            c &&
                ((jr = document.createElement("div").style),
                    "AnimationEvent" in window || (delete kr.animationend.animation, delete kr.animationiteration.animation, delete kr.animationstart.animation),
                    "TransitionEvent" in window || delete kr.transitionend.transition);
            var Er = Sr("animationend"),
                Nr = Sr("animationiteration"),
                Pr = Sr("animationstart"),
                Tr = Sr("transitionend"),
                Or = new Map(),
                Rr = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
                    " "
                );
            function Ar(e, t) {
                Or.set(e, t), s(t, [e]);
            }
            for (var Lr = 0; Lr < Rr.length; Lr++) {
                var Ir = Rr[Lr];
                Ar(Ir.toLowerCase(), "on" + (Ir[0].toUpperCase() + Ir.slice(1)));
            }
            Ar(Er, "onAnimationEnd"),
                Ar(Nr, "onAnimationIteration"),
                Ar(Pr, "onAnimationStart"),
                Ar("dblclick", "onDoubleClick"),
                Ar("focusin", "onFocus"),
                Ar("focusout", "onBlur"),
                Ar(Tr, "onTransitionEnd"),
                u("onMouseEnter", ["mouseout", "mouseover"]),
                u("onMouseLeave", ["mouseout", "mouseover"]),
                u("onPointerEnter", ["pointerout", "pointerover"]),
                u("onPointerLeave", ["pointerout", "pointerover"]),
                s("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")),
                s("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),
                s("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
                s("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")),
                s("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")),
                s("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
            var _r = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
                " "
            ),
                Dr = new Set("cancel close invalid load scroll toggle".split(" ").concat(_r));
            function Mr(e, t, n) {
                var r = e.type || "unknown-event";
                (e.currentTarget = n),
                    (function (e, t, n, r, a, i, l, s, u) {
                        if ((Be.apply(this, arguments), De)) {
                            if (!De) throw Error(o(198));
                            var c = Me;
                            (De = !1), (Me = null), Fe || ((Fe = !0), (ze = c));
                        }
                    })(r, t, void 0, e),
                    (e.currentTarget = null);
            }
            function Fr(e, t) {
                t = 0 !== (4 & t);
                for (var n = 0; n < e.length; n++) {
                    var r = e[n],
                        a = r.event;
                    r = r.listeners;
                    e: {
                        var o = void 0;
                        if (t)
                            for (var i = r.length - 1; 0 <= i; i--) {
                                var l = r[i],
                                    s = l.instance,
                                    u = l.currentTarget;
                                if (((l = l.listener), s !== o && a.isPropagationStopped())) break e;
                                Mr(a, l, u), (o = s);
                            }
                        else
                            for (i = 0; i < r.length; i++) {
                                if (((s = (l = r[i]).instance), (u = l.currentTarget), (l = l.listener), s !== o && a.isPropagationStopped())) break e;
                                Mr(a, l, u), (o = s);
                            }
                    }
                }
                if (Fe) throw ((e = ze), (Fe = !1), (ze = null), e);
            }
            function zr(e, t) {
                var n = t[ma];
                void 0 === n && (n = t[ma] = new Set());
                var r = e + "__bubble";
                n.has(r) || (Vr(t, e, 2, !1), n.add(r));
            }
            function Ur(e, t, n) {
                var r = 0;
                t && (r |= 4), Vr(n, e, r, t);
            }
            var Br = "_reactListening" + Math.random().toString(36).slice(2);
            function Wr(e) {
                if (!e[Br]) {
                    (e[Br] = !0),
                        i.forEach(function (t) {
                            "selectionchange" !== t && (Dr.has(t) || Ur(t, !1, e), Ur(t, !0, e));
                        });
                    var t = 9 === e.nodeType ? e : e.ownerDocument;
                    null === t || t[Br] || ((t[Br] = !0), Ur("selectionchange", !1, t));
                }
            }
            function Vr(e, t, n, r) {
                switch (Kt(t)) {
                    case 1:
                        var a = qt;
                        break;
                    case 4:
                        a = $t;
                        break;
                    default:
                        a = Gt;
                }
                (n = a.bind(null, t, n, e)),
                    (a = void 0),
                    !Le || ("touchstart" !== t && "touchmove" !== t && "wheel" !== t) || (a = !0),
                    r ? (void 0 !== a ? e.addEventListener(t, n, { capture: !0, passive: a }) : e.addEventListener(t, n, !0)) : void 0 !== a ? e.addEventListener(t, n, { passive: a }) : e.addEventListener(t, n, !1);
            }
            function Hr(e, t, n, r, a) {
                var o = r;
                if (0 === (1 & t) && 0 === (2 & t) && null !== r)
                    e: for (; ;) {
                        if (null === r) return;
                        var i = r.tag;
                        if (3 === i || 4 === i) {
                            var l = r.stateNode.containerInfo;
                            if (l === a || (8 === l.nodeType && l.parentNode === a)) break;
                            if (4 === i)
                                for (i = r.return; null !== i;) {
                                    var s = i.tag;
                                    if ((3 === s || 4 === s) && ((s = i.stateNode.containerInfo) === a || (8 === s.nodeType && s.parentNode === a))) return;
                                    i = i.return;
                                }
                            for (; null !== l;) {
                                if (null === (i = ya(l))) return;
                                if (5 === (s = i.tag) || 6 === s) {
                                    r = o = i;
                                    continue e;
                                }
                                l = l.parentNode;
                            }
                        }
                        r = r.return;
                    }
                Re(function () {
                    var r = o,
                        a = we(n),
                        i = [];
                    e: {
                        var l = Or.get(e);
                        if (void 0 !== l) {
                            var s = cn,
                                u = e;
                            switch (e) {
                                case "keypress":
                                    if (0 === tn(n)) break e;
                                case "keydown":
                                case "keyup":
                                    s = Nn;
                                    break;
                                case "focusin":
                                    (u = "focus"), (s = vn);
                                    break;
                                case "focusout":
                                    (u = "blur"), (s = vn);
                                    break;
                                case "beforeblur":
                                case "afterblur":
                                    s = vn;
                                    break;
                                case "click":
                                    if (2 === n.button) break e;
                                case "auxclick":
                                case "dblclick":
                                case "mousedown":
                                case "mousemove":
                                case "mouseup":
                                case "mouseout":
                                case "mouseover":
                                case "contextmenu":
                                    s = pn;
                                    break;
                                case "drag":
                                case "dragend":
                                case "dragenter":
                                case "dragexit":
                                case "dragleave":
                                case "dragover":
                                case "dragstart":
                                case "drop":
                                    s = mn;
                                    break;
                                case "touchcancel":
                                case "touchend":
                                case "touchmove":
                                case "touchstart":
                                    s = Tn;
                                    break;
                                case Er:
                                case Nr:
                                case Pr:
                                    s = gn;
                                    break;
                                case Tr:
                                    s = On;
                                    break;
                                case "scroll":
                                    s = fn;
                                    break;
                                case "wheel":
                                    s = An;
                                    break;
                                case "copy":
                                case "cut":
                                case "paste":
                                    s = bn;
                                    break;
                                case "gotpointercapture":
                                case "lostpointercapture":
                                case "pointercancel":
                                case "pointerdown":
                                case "pointermove":
                                case "pointerout":
                                case "pointerover":
                                case "pointerup":
                                    s = Pn;
                            }
                            var c = 0 !== (4 & t),
                                d = !c && "scroll" === e,
                                f = c ? (null !== l ? l + "Capture" : null) : l;
                            c = [];
                            for (var h, p = r; null !== p;) {
                                var m = (h = p).stateNode;
                                if ((5 === h.tag && null !== m && ((h = m), null !== f && null != (m = Ae(p, f)) && c.push(qr(p, m, h))), d)) break;
                                p = p.return;
                            }
                            0 < c.length && ((l = new s(l, u, null, n, a)), i.push({ event: l, listeners: c }));
                        }
                    }
                    if (0 === (7 & t)) {
                        if (
                            ((s = "mouseout" === e || "pointerout" === e),
                                (!(l = "mouseover" === e || "pointerover" === e) || n === xe || !(u = n.relatedTarget || n.fromElement) || (!ya(u) && !u[pa])) &&
                                (s || l) &&
                                ((l = a.window === a ? a : (l = a.ownerDocument) ? l.defaultView || l.parentWindow : window),
                                    s ? ((s = r), null !== (u = (u = n.relatedTarget || n.toElement) ? ya(u) : null) && (u !== (d = We(u)) || (5 !== u.tag && 6 !== u.tag)) && (u = null)) : ((s = null), (u = r)),
                                    s !== u))
                        ) {
                            if (
                                ((c = pn),
                                    (m = "onMouseLeave"),
                                    (f = "onMouseEnter"),
                                    (p = "mouse"),
                                    ("pointerout" !== e && "pointerover" !== e) || ((c = Pn), (m = "onPointerLeave"), (f = "onPointerEnter"), (p = "pointer")),
                                    (d = null == s ? l : xa(s)),
                                    (h = null == u ? l : xa(u)),
                                    ((l = new c(m, p + "leave", s, n, a)).target = d),
                                    (l.relatedTarget = h),
                                    (m = null),
                                    ya(a) === r && (((c = new c(f, p + "enter", u, n, a)).target = h), (c.relatedTarget = d), (m = c)),
                                    (d = m),
                                    s && u)
                            )
                                e: {
                                    for (f = u, p = 0, h = c = s; h; h = Gr(h)) p++;
                                    for (h = 0, m = f; m; m = Gr(m)) h++;
                                    for (; 0 < p - h;) (c = Gr(c)), p--;
                                    for (; 0 < h - p;) (f = Gr(f)), h--;
                                    for (; p--;) {
                                        if (c === f || (null !== f && c === f.alternate)) break e;
                                        (c = Gr(c)), (f = Gr(f));
                                    }
                                    c = null;
                                }
                            else c = null;
                            null !== s && Qr(i, l, s, c, !1), null !== u && null !== d && Qr(i, d, u, c, !0);
                        }
                        if ("select" === (s = (l = r ? xa(r) : window).nodeName && l.nodeName.toLowerCase()) || ("input" === s && "file" === l.type)) var v = Kn;
                        else if (Hn(l))
                            if (Zn) v = ir;
                            else {
                                v = ar;
                                var g = rr;
                            }
                        else (s = l.nodeName) && "input" === s.toLowerCase() && ("checkbox" === l.type || "radio" === l.type) && (v = or);
                        switch ((v && (v = v(e, r)) ? qn(i, v, n, a) : (g && g(e, l, r), "focusout" === e && (g = l._wrapperState) && g.controlled && "number" === l.type && ee(l, "number", l.value)), (g = r ? xa(r) : window), e)) {
                            case "focusin":
                                (Hn(g) || "true" === g.contentEditable) && ((vr = g), (gr = r), (yr = null));
                                break;
                            case "focusout":
                                yr = gr = vr = null;
                                break;
                            case "mousedown":
                                br = !0;
                                break;
                            case "contextmenu":
                            case "mouseup":
                            case "dragend":
                                (br = !1), xr(i, n, a);
                                break;
                            case "selectionchange":
                                if (mr) break;
                            case "keydown":
                            case "keyup":
                                xr(i, n, a);
                        }
                        var y;
                        if (In)
                            e: {
                                switch (e) {
                                    case "compositionstart":
                                        var b = "onCompositionStart";
                                        break e;
                                    case "compositionend":
                                        b = "onCompositionEnd";
                                        break e;
                                    case "compositionupdate":
                                        b = "onCompositionUpdate";
                                        break e;
                                }
                                b = void 0;
                            }
                        else Wn ? Un(e, n) && (b = "onCompositionEnd") : "keydown" === e && 229 === n.keyCode && (b = "onCompositionStart");
                        b &&
                            (Mn && "ko" !== n.locale && (Wn || "onCompositionStart" !== b ? "onCompositionEnd" === b && Wn && (y = en()) : ((Xt = "value" in (Zt = a) ? Zt.value : Zt.textContent), (Wn = !0))),
                                0 < (g = $r(r, b)).length && ((b = new xn(b, e, null, n, a)), i.push({ event: b, listeners: g }), y ? (b.data = y) : null !== (y = Bn(n)) && (b.data = y))),
                            (y = Dn
                                ? (function (e, t) {
                                    switch (e) {
                                        case "compositionend":
                                            return Bn(t);
                                        case "keypress":
                                            return 32 !== t.which ? null : ((zn = !0), Fn);
                                        case "textInput":
                                            return (e = t.data) === Fn && zn ? null : e;
                                        default:
                                            return null;
                                    }
                                })(e, n)
                                : (function (e, t) {
                                    if (Wn) return "compositionend" === e || (!In && Un(e, t)) ? ((e = en()), (Jt = Xt = Zt = null), (Wn = !1), e) : null;
                                    switch (e) {
                                        case "paste":
                                        default:
                                            return null;
                                        case "keypress":
                                            if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
                                                if (t.char && 1 < t.char.length) return t.char;
                                                if (t.which) return String.fromCharCode(t.which);
                                            }
                                            return null;
                                        case "compositionend":
                                            return Mn && "ko" !== t.locale ? null : t.data;
                                    }
                                })(e, n)) &&
                            0 < (r = $r(r, "onBeforeInput")).length &&
                            ((a = new xn("onBeforeInput", "beforeinput", null, n, a)), i.push({ event: a, listeners: r }), (a.data = y));
                    }
                    Fr(i, t);
                });
            }
            function qr(e, t, n) {
                return { instance: e, listener: t, currentTarget: n };
            }
            function $r(e, t) {
                for (var n = t + "Capture", r = []; null !== e;) {
                    var a = e,
                        o = a.stateNode;
                    5 === a.tag && null !== o && ((a = o), null != (o = Ae(e, n)) && r.unshift(qr(e, o, a)), null != (o = Ae(e, t)) && r.push(qr(e, o, a))), (e = e.return);
                }
                return r;
            }
            function Gr(e) {
                if (null === e) return null;
                do {
                    e = e.return;
                } while (e && 5 !== e.tag);
                return e || null;
            }
            function Qr(e, t, n, r, a) {
                for (var o = t._reactName, i = []; null !== n && n !== r;) {
                    var l = n,
                        s = l.alternate,
                        u = l.stateNode;
                    if (null !== s && s === r) break;
                    5 === l.tag && null !== u && ((l = u), a ? null != (s = Ae(n, o)) && i.unshift(qr(n, s, l)) : a || (null != (s = Ae(n, o)) && i.push(qr(n, s, l)))), (n = n.return);
                }
                0 !== i.length && e.push({ event: t, listeners: i });
            }
            var Yr = /\r\n?/g,
                Kr = /\u0000|\uFFFD/g;
            function Zr(e) {
                return ("string" === typeof e ? e : "" + e).replace(Yr, "\n").replace(Kr, "");
            }
            function Xr(e, t, n) {
                if (((t = Zr(t)), Zr(e) !== t && n)) throw Error(o(425));
            }
            function Jr() { }
            var ea = null,
                ta = null;
            function na(e, t) {
                return (
                    "textarea" === e ||
                    "noscript" === e ||
                    "string" === typeof t.children ||
                    "number" === typeof t.children ||
                    ("object" === typeof t.dangerouslySetInnerHTML && null !== t.dangerouslySetInnerHTML && null != t.dangerouslySetInnerHTML.__html)
                );
            }
            var ra = "function" === typeof setTimeout ? setTimeout : void 0,
                aa = "function" === typeof clearTimeout ? clearTimeout : void 0,
                oa = "function" === typeof Promise ? Promise : void 0,
                ia =
                    "function" === typeof queueMicrotask
                        ? queueMicrotask
                        : "undefined" !== typeof oa
                            ? function (e) {
                                return oa.resolve(null).then(e).catch(la);
                            }
                            : ra;
            function la(e) {
                setTimeout(function () {
                    throw e;
                });
            }
            function sa(e, t) {
                var n = t,
                    r = 0;
                do {
                    var a = n.nextSibling;
                    if ((e.removeChild(n), a && 8 === a.nodeType))
                        if ("/$" === (n = a.data)) {
                            if (0 === r) return e.removeChild(a), void Wt(t);
                            r--;
                        } else ("$" !== n && "$?" !== n && "$!" !== n) || r++;
                    n = a;
                } while (n);
                Wt(t);
            }
            function ua(e) {
                for (; null != e; e = e.nextSibling) {
                    var t = e.nodeType;
                    if (1 === t || 3 === t) break;
                    if (8 === t) {
                        if ("$" === (t = e.data) || "$!" === t || "$?" === t) break;
                        if ("/$" === t) return null;
                    }
                }
                return e;
            }
            function ca(e) {
                e = e.previousSibling;
                for (var t = 0; e;) {
                    if (8 === e.nodeType) {
                        var n = e.data;
                        if ("$" === n || "$!" === n || "$?" === n) {
                            if (0 === t) return e;
                            t--;
                        } else "/$" === n && t++;
                    }
                    e = e.previousSibling;
                }
                return null;
            }
            var da = Math.random().toString(36).slice(2),
                fa = "__reactFiber$" + da,
                ha = "__reactProps$" + da,
                pa = "__reactContainer$" + da,
                ma = "__reactEvents$" + da,
                va = "__reactListeners$" + da,
                ga = "__reactHandles$" + da;
            function ya(e) {
                var t = e[fa];
                if (t) return t;
                for (var n = e.parentNode; n;) {
                    if ((t = n[pa] || n[fa])) {
                        if (((n = t.alternate), null !== t.child || (null !== n && null !== n.child)))
                            for (e = ca(e); null !== e;) {
                                if ((n = e[fa])) return n;
                                e = ca(e);
                            }
                        return t;
                    }
                    n = (e = n).parentNode;
                }
                return null;
            }
            function ba(e) {
                return !(e = e[fa] || e[pa]) || (5 !== e.tag && 6 !== e.tag && 13 !== e.tag && 3 !== e.tag) ? null : e;
            }
            function xa(e) {
                if (5 === e.tag || 6 === e.tag) return e.stateNode;
                throw Error(o(33));
            }
            function wa(e) {
                return e[ha] || null;
            }
            var ka = [],
                Ca = -1;
            function ja(e) {
                return { current: e };
            }
            function Sa(e) {
                0 > Ca || ((e.current = ka[Ca]), (ka[Ca] = null), Ca--);
            }
            function Ea(e, t) {
                Ca++, (ka[Ca] = e.current), (e.current = t);
            }
            var Na = {},
                Pa = ja(Na),
                Ta = ja(!1),
                Oa = Na;
            function Ra(e, t) {
                var n = e.type.contextTypes;
                if (!n) return Na;
                var r = e.stateNode;
                if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
                var a,
                    o = {};
                for (a in n) o[a] = t[a];
                return r && (((e = e.stateNode).__reactInternalMemoizedUnmaskedChildContext = t), (e.__reactInternalMemoizedMaskedChildContext = o)), o;
            }
            function Aa(e) {
                return null !== (e = e.childContextTypes) && void 0 !== e;
            }
            function La() {
                Sa(Ta), Sa(Pa);
            }
            function Ia(e, t, n) {
                if (Pa.current !== Na) throw Error(o(168));
                Ea(Pa, t), Ea(Ta, n);
            }
            function _a(e, t, n) {
                var r = e.stateNode;
                if (((t = t.childContextTypes), "function" !== typeof r.getChildContext)) return n;
                for (var a in (r = r.getChildContext())) if (!(a in t)) throw Error(o(108, V(e) || "Unknown", a));
                return M({}, n, r);
            }
            function Da(e) {
                return (e = ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || Na), (Oa = Pa.current), Ea(Pa, e), Ea(Ta, Ta.current), !0;
            }
            function Ma(e, t, n) {
                var r = e.stateNode;
                if (!r) throw Error(o(169));
                n ? ((e = _a(e, t, Oa)), (r.__reactInternalMemoizedMergedChildContext = e), Sa(Ta), Sa(Pa), Ea(Pa, e)) : Sa(Ta), Ea(Ta, n);
            }
            var Fa = null,
                za = !1,
                Ua = !1;
            function Ba(e) {
                null === Fa ? (Fa = [e]) : Fa.push(e);
            }
            function Wa() {
                if (!Ua && null !== Fa) {
                    Ua = !0;
                    var e = 0,
                        t = bt;
                    try {
                        var n = Fa;
                        for (bt = 1; e < n.length; e++) {
                            var r = n[e];
                            do {
                                r = r(!0);
                            } while (null !== r);
                        }
                        (Fa = null), (za = !1);
                    } catch (a) {
                        throw (null !== Fa && (Fa = Fa.slice(e + 1)), Ge(Je, Wa), a);
                    } finally {
                        (bt = t), (Ua = !1);
                    }
                }
                return null;
            }
            var Va = [],
                Ha = 0,
                qa = null,
                $a = 0,
                Ga = [],
                Qa = 0,
                Ya = null,
                Ka = 1,
                Za = "";
            function Xa(e, t) {
                (Va[Ha++] = $a), (Va[Ha++] = qa), (qa = e), ($a = t);
            }
            function Ja(e, t, n) {
                (Ga[Qa++] = Ka), (Ga[Qa++] = Za), (Ga[Qa++] = Ya), (Ya = e);
                var r = Ka;
                e = Za;
                var a = 32 - it(r) - 1;
                (r &= ~(1 << a)), (n += 1);
                var o = 32 - it(t) + a;
                if (30 < o) {
                    var i = a - (a % 5);
                    (o = (r & ((1 << i) - 1)).toString(32)), (r >>= i), (a -= i), (Ka = (1 << (32 - it(t) + a)) | (n << a) | r), (Za = o + e);
                } else (Ka = (1 << o) | (n << a) | r), (Za = e);
            }
            function eo(e) {
                null !== e.return && (Xa(e, 1), Ja(e, 1, 0));
            }
            function to(e) {
                for (; e === qa;) (qa = Va[--Ha]), (Va[Ha] = null), ($a = Va[--Ha]), (Va[Ha] = null);
                for (; e === Ya;) (Ya = Ga[--Qa]), (Ga[Qa] = null), (Za = Ga[--Qa]), (Ga[Qa] = null), (Ka = Ga[--Qa]), (Ga[Qa] = null);
            }
            var no = null,
                ro = null,
                ao = !1,
                oo = null;
            function io(e, t) {
                var n = Au(5, null, null, 0);
                (n.elementType = "DELETED"), (n.stateNode = t), (n.return = e), null === (t = e.deletions) ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n);
            }
            function lo(e, t) {
                switch (e.tag) {
                    case 5:
                        var n = e.type;
                        return null !== (t = 1 !== t.nodeType || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t) && ((e.stateNode = t), (no = e), (ro = ua(t.firstChild)), !0);
                    case 6:
                        return null !== (t = "" === e.pendingProps || 3 !== t.nodeType ? null : t) && ((e.stateNode = t), (no = e), (ro = null), !0);
                    case 13:
                        return (
                            null !== (t = 8 !== t.nodeType ? null : t) &&
                            ((n = null !== Ya ? { id: Ka, overflow: Za } : null),
                                (e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }),
                                ((n = Au(18, null, null, 0)).stateNode = t),
                                (n.return = e),
                                (e.child = n),
                                (no = e),
                                (ro = null),
                                !0)
                        );
                    default:
                        return !1;
                }
            }
            function so(e) {
                return 0 !== (1 & e.mode) && 0 === (128 & e.flags);
            }
            function uo(e) {
                if (ao) {
                    var t = ro;
                    if (t) {
                        var n = t;
                        if (!lo(e, t)) {
                            if (so(e)) throw Error(o(418));
                            t = ua(n.nextSibling);
                            var r = no;
                            t && lo(e, t) ? io(r, n) : ((e.flags = (-4097 & e.flags) | 2), (ao = !1), (no = e));
                        }
                    } else {
                        if (so(e)) throw Error(o(418));
                        (e.flags = (-4097 & e.flags) | 2), (ao = !1), (no = e);
                    }
                }
            }
            function co(e) {
                for (e = e.return; null !== e && 5 !== e.tag && 3 !== e.tag && 13 !== e.tag;) e = e.return;
                no = e;
            }
            function fo(e) {
                if (e !== no) return !1;
                if (!ao) return co(e), (ao = !0), !1;
                var t;
                if (((t = 3 !== e.tag) && !(t = 5 !== e.tag) && (t = "head" !== (t = e.type) && "body" !== t && !na(e.type, e.memoizedProps)), t && (t = ro))) {
                    if (so(e)) throw (ho(), Error(o(418)));
                    for (; t;) io(e, t), (t = ua(t.nextSibling));
                }
                if ((co(e), 13 === e.tag)) {
                    if (!(e = null !== (e = e.memoizedState) ? e.dehydrated : null)) throw Error(o(317));
                    e: {
                        for (e = e.nextSibling, t = 0; e;) {
                            if (8 === e.nodeType) {
                                var n = e.data;
                                if ("/$" === n) {
                                    if (0 === t) {
                                        ro = ua(e.nextSibling);
                                        break e;
                                    }
                                    t--;
                                } else ("$" !== n && "$!" !== n && "$?" !== n) || t++;
                            }
                            e = e.nextSibling;
                        }
                        ro = null;
                    }
                } else ro = no ? ua(e.stateNode.nextSibling) : null;
                return !0;
            }
            function ho() {
                for (var e = ro; e;) e = ua(e.nextSibling);
            }
            function po() {
                (ro = no = null), (ao = !1);
            }
            function mo(e) {
                null === oo ? (oo = [e]) : oo.push(e);
            }
            var vo = x.ReactCurrentBatchConfig;
            function go(e, t) {
                if (e && e.defaultProps) {
                    for (var n in ((t = M({}, t)), (e = e.defaultProps))) void 0 === t[n] && (t[n] = e[n]);
                    return t;
                }
                return t;
            }
            var yo = ja(null),
                bo = null,
                xo = null,
                wo = null;
            function ko() {
                wo = xo = bo = null;
            }
            function Co(e) {
                var t = yo.current;
                Sa(yo), (e._currentValue = t);
            }
            function jo(e, t, n) {
                for (; null !== e;) {
                    var r = e.alternate;
                    if (((e.childLanes & t) !== t ? ((e.childLanes |= t), null !== r && (r.childLanes |= t)) : null !== r && (r.childLanes & t) !== t && (r.childLanes |= t), e === n)) break;
                    e = e.return;
                }
            }
            function So(e, t) {
                (bo = e), (wo = xo = null), null !== (e = e.dependencies) && null !== e.firstContext && (0 !== (e.lanes & t) && (xl = !0), (e.firstContext = null));
            }
            function Eo(e) {
                var t = e._currentValue;
                if (wo !== e)
                    if (((e = { context: e, memoizedValue: t, next: null }), null === xo)) {
                        if (null === bo) throw Error(o(308));
                        (xo = e), (bo.dependencies = { lanes: 0, firstContext: e });
                    } else xo = xo.next = e;
                return t;
            }
            var No = null;
            function Po(e) {
                null === No ? (No = [e]) : No.push(e);
            }
            function To(e, t, n, r) {
                var a = t.interleaved;
                return null === a ? ((n.next = n), Po(t)) : ((n.next = a.next), (a.next = n)), (t.interleaved = n), Oo(e, r);
            }
            function Oo(e, t) {
                e.lanes |= t;
                var n = e.alternate;
                for (null !== n && (n.lanes |= t), n = e, e = e.return; null !== e;) (e.childLanes |= t), null !== (n = e.alternate) && (n.childLanes |= t), (n = e), (e = e.return);
                return 3 === n.tag ? n.stateNode : null;
            }
            var Ro = !1;
            function Ao(e) {
                e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
            }
            function Lo(e, t) {
                (e = e.updateQueue), t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
            }
            function Io(e, t) {
                return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
            }
            function _o(e, t, n) {
                var r = e.updateQueue;
                if (null === r) return null;
                if (((r = r.shared), 0 !== (2 & Ts))) {
                    var a = r.pending;
                    return null === a ? (t.next = t) : ((t.next = a.next), (a.next = t)), (r.pending = t), Oo(e, n);
                }
                return null === (a = r.interleaved) ? ((t.next = t), Po(r)) : ((t.next = a.next), (a.next = t)), (r.interleaved = t), Oo(e, n);
            }
            function Do(e, t, n) {
                if (null !== (t = t.updateQueue) && ((t = t.shared), 0 !== (4194240 & n))) {
                    var r = t.lanes;
                    (n |= r &= e.pendingLanes), (t.lanes = n), yt(e, n);
                }
            }
            function Mo(e, t) {
                var n = e.updateQueue,
                    r = e.alternate;
                if (null !== r && n === (r = r.updateQueue)) {
                    var a = null,
                        o = null;
                    if (null !== (n = n.firstBaseUpdate)) {
                        do {
                            var i = { eventTime: n.eventTime, lane: n.lane, tag: n.tag, payload: n.payload, callback: n.callback, next: null };
                            null === o ? (a = o = i) : (o = o.next = i), (n = n.next);
                        } while (null !== n);
                        null === o ? (a = o = t) : (o = o.next = t);
                    } else a = o = t;
                    return (n = { baseState: r.baseState, firstBaseUpdate: a, lastBaseUpdate: o, shared: r.shared, effects: r.effects }), void (e.updateQueue = n);
                }
                null === (e = n.lastBaseUpdate) ? (n.firstBaseUpdate = t) : (e.next = t), (n.lastBaseUpdate = t);
            }
            function Fo(e, t, n, r) {
                var a = e.updateQueue;
                Ro = !1;
                var o = a.firstBaseUpdate,
                    i = a.lastBaseUpdate,
                    l = a.shared.pending;
                if (null !== l) {
                    a.shared.pending = null;
                    var s = l,
                        u = s.next;
                    (s.next = null), null === i ? (o = u) : (i.next = u), (i = s);
                    var c = e.alternate;
                    null !== c && (l = (c = c.updateQueue).lastBaseUpdate) !== i && (null === l ? (c.firstBaseUpdate = u) : (l.next = u), (c.lastBaseUpdate = s));
                }
                if (null !== o) {
                    var d = a.baseState;
                    for (i = 0, c = u = s = null, l = o; ;) {
                        var f = l.lane,
                            h = l.eventTime;
                        if ((r & f) === f) {
                            null !== c && (c = c.next = { eventTime: h, lane: 0, tag: l.tag, payload: l.payload, callback: l.callback, next: null });
                            e: {
                                var p = e,
                                    m = l;
                                switch (((f = t), (h = n), m.tag)) {
                                    case 1:
                                        if ("function" === typeof (p = m.payload)) {
                                            d = p.call(h, d, f);
                                            break e;
                                        }
                                        d = p;
                                        break e;
                                    case 3:
                                        p.flags = (-65537 & p.flags) | 128;
                                    case 0:
                                        if (null === (f = "function" === typeof (p = m.payload) ? p.call(h, d, f) : p) || void 0 === f) break e;
                                        d = M({}, d, f);
                                        break e;
                                    case 2:
                                        Ro = !0;
                                }
                            }
                            null !== l.callback && 0 !== l.lane && ((e.flags |= 64), null === (f = a.effects) ? (a.effects = [l]) : f.push(l));
                        } else (h = { eventTime: h, lane: f, tag: l.tag, payload: l.payload, callback: l.callback, next: null }), null === c ? ((u = c = h), (s = d)) : (c = c.next = h), (i |= f);
                        if (null === (l = l.next)) {
                            if (null === (l = a.shared.pending)) break;
                            (l = (f = l).next), (f.next = null), (a.lastBaseUpdate = f), (a.shared.pending = null);
                        }
                    }
                    if ((null === c && (s = d), (a.baseState = s), (a.firstBaseUpdate = u), (a.lastBaseUpdate = c), null !== (t = a.shared.interleaved))) {
                        a = t;
                        do {
                            (i |= a.lane), (a = a.next);
                        } while (a !== t);
                    } else null === o && (a.shared.lanes = 0);
                    (Ms |= i), (e.lanes = i), (e.memoizedState = d);
                }
            }
            function zo(e, t, n) {
                if (((e = t.effects), (t.effects = null), null !== e))
                    for (t = 0; t < e.length; t++) {
                        var r = e[t],
                            a = r.callback;
                        if (null !== a) {
                            if (((r.callback = null), (r = n), "function" !== typeof a)) throw Error(o(191, a));
                            a.call(r);
                        }
                    }
            }
            var Uo = new r.Component().refs;
            function Bo(e, t, n, r) {
                (n = null === (n = n(r, (t = e.memoizedState))) || void 0 === n ? t : M({}, t, n)), (e.memoizedState = n), 0 === e.lanes && (e.updateQueue.baseState = n);
            }
            var Wo = {
                isMounted: function (e) {
                    return !!(e = e._reactInternals) && We(e) === e;
                },
                enqueueSetState: function (e, t, n) {
                    e = e._reactInternals;
                    var r = tu(),
                        a = nu(e),
                        o = Io(r, a);
                    (o.payload = t), void 0 !== n && null !== n && (o.callback = n), null !== (t = _o(e, o, a)) && (ru(t, e, a, r), Do(t, e, a));
                },
                enqueueReplaceState: function (e, t, n) {
                    e = e._reactInternals;
                    var r = tu(),
                        a = nu(e),
                        o = Io(r, a);
                    (o.tag = 1), (o.payload = t), void 0 !== n && null !== n && (o.callback = n), null !== (t = _o(e, o, a)) && (ru(t, e, a, r), Do(t, e, a));
                },
                enqueueForceUpdate: function (e, t) {
                    e = e._reactInternals;
                    var n = tu(),
                        r = nu(e),
                        a = Io(n, r);
                    (a.tag = 2), void 0 !== t && null !== t && (a.callback = t), null !== (t = _o(e, a, r)) && (ru(t, e, r, n), Do(t, e, r));
                },
            };
            function Vo(e, t, n, r, a, o, i) {
                return "function" === typeof (e = e.stateNode).shouldComponentUpdate ? e.shouldComponentUpdate(r, o, i) : !t.prototype || !t.prototype.isPureReactComponent || !sr(n, r) || !sr(a, o);
            }
            function Ho(e, t, n) {
                var r = !1,
                    a = Na,
                    o = t.contextType;
                return (
                    "object" === typeof o && null !== o ? (o = Eo(o)) : ((a = Aa(t) ? Oa : Pa.current), (o = (r = null !== (r = t.contextTypes) && void 0 !== r) ? Ra(e, a) : Na)),
                    (t = new t(n, o)),
                    (e.memoizedState = null !== t.state && void 0 !== t.state ? t.state : null),
                    (t.updater = Wo),
                    (e.stateNode = t),
                    (t._reactInternals = e),
                    r && (((e = e.stateNode).__reactInternalMemoizedUnmaskedChildContext = a), (e.__reactInternalMemoizedMaskedChildContext = o)),
                    t
                );
            }
            function qo(e, t, n, r) {
                (e = t.state),
                    "function" === typeof t.componentWillReceiveProps && t.componentWillReceiveProps(n, r),
                    "function" === typeof t.UNSAFE_componentWillReceiveProps && t.UNSAFE_componentWillReceiveProps(n, r),
                    t.state !== e && Wo.enqueueReplaceState(t, t.state, null);
            }
            function $o(e, t, n, r) {
                var a = e.stateNode;
                (a.props = n), (a.state = e.memoizedState), (a.refs = Uo), Ao(e);
                var o = t.contextType;
                "object" === typeof o && null !== o ? (a.context = Eo(o)) : ((o = Aa(t) ? Oa : Pa.current), (a.context = Ra(e, o))),
                    (a.state = e.memoizedState),
                    "function" === typeof (o = t.getDerivedStateFromProps) && (Bo(e, t, o, n), (a.state = e.memoizedState)),
                    "function" === typeof t.getDerivedStateFromProps ||
                    "function" === typeof a.getSnapshotBeforeUpdate ||
                    ("function" !== typeof a.UNSAFE_componentWillMount && "function" !== typeof a.componentWillMount) ||
                    ((t = a.state),
                        "function" === typeof a.componentWillMount && a.componentWillMount(),
                        "function" === typeof a.UNSAFE_componentWillMount && a.UNSAFE_componentWillMount(),
                        t !== a.state && Wo.enqueueReplaceState(a, a.state, null),
                        Fo(e, n, a, r),
                        (a.state = e.memoizedState)),
                    "function" === typeof a.componentDidMount && (e.flags |= 4194308);
            }
            function Go(e, t, n) {
                if (null !== (e = n.ref) && "function" !== typeof e && "object" !== typeof e) {
                    if (n._owner) {
                        if ((n = n._owner)) {
                            if (1 !== n.tag) throw Error(o(309));
                            var r = n.stateNode;
                        }
                        if (!r) throw Error(o(147, e));
                        var a = r,
                            i = "" + e;
                        return null !== t && null !== t.ref && "function" === typeof t.ref && t.ref._stringRef === i
                            ? t.ref
                            : ((t = function (e) {
                                var t = a.refs;
                                t === Uo && (t = a.refs = {}), null === e ? delete t[i] : (t[i] = e);
                            }),
                                (t._stringRef = i),
                                t);
                    }
                    if ("string" !== typeof e) throw Error(o(284));
                    if (!n._owner) throw Error(o(290, e));
                }
                return e;
            }
            function Qo(e, t) {
                throw ((e = Object.prototype.toString.call(t)), Error(o(31, "[object Object]" === e ? "object with keys {" + Object.keys(t).join(", ") + "}" : e)));
            }
            function Yo(e) {
                return (0, e._init)(e._payload);
            }
            function Ko(e) {
                function t(t, n) {
                    if (e) {
                        var r = t.deletions;
                        null === r ? ((t.deletions = [n]), (t.flags |= 16)) : r.push(n);
                    }
                }
                function n(n, r) {
                    if (!e) return null;
                    for (; null !== r;) t(n, r), (r = r.sibling);
                    return null;
                }
                function r(e, t) {
                    for (e = new Map(); null !== t;) null !== t.key ? e.set(t.key, t) : e.set(t.index, t), (t = t.sibling);
                    return e;
                }
                function a(e, t) {
                    return ((e = Iu(e, t)).index = 0), (e.sibling = null), e;
                }
                function i(t, n, r) {
                    return (t.index = r), e ? (null !== (r = t.alternate) ? ((r = r.index) < n ? ((t.flags |= 2), n) : r) : ((t.flags |= 2), n)) : ((t.flags |= 1048576), n);
                }
                function l(t) {
                    return e && null === t.alternate && (t.flags |= 2), t;
                }
                function s(e, t, n, r) {
                    return null === t || 6 !== t.tag ? (((t = Fu(n, e.mode, r)).return = e), t) : (((t = a(t, n)).return = e), t);
                }
                function u(e, t, n, r) {
                    var o = n.type;
                    return o === C
                        ? d(e, t, n.props.children, r, n.key)
                        : null !== t && (t.elementType === o || ("object" === typeof o && null !== o && o.$$typeof === A && Yo(o) === t.type))
                            ? (((r = a(t, n.props)).ref = Go(e, t, n)), (r.return = e), r)
                            : (((r = _u(n.type, n.key, n.props, null, e.mode, r)).ref = Go(e, t, n)), (r.return = e), r);
                }
                function c(e, t, n, r) {
                    return null === t || 4 !== t.tag || t.stateNode.containerInfo !== n.containerInfo || t.stateNode.implementation !== n.implementation
                        ? (((t = zu(n, e.mode, r)).return = e), t)
                        : (((t = a(t, n.children || [])).return = e), t);
                }
                function d(e, t, n, r, o) {
                    return null === t || 7 !== t.tag ? (((t = Du(n, e.mode, r, o)).return = e), t) : (((t = a(t, n)).return = e), t);
                }
                function f(e, t, n) {
                    if (("string" === typeof t && "" !== t) || "number" === typeof t) return ((t = Fu("" + t, e.mode, n)).return = e), t;
                    if ("object" === typeof t && null !== t) {
                        switch (t.$$typeof) {
                            case w:
                                return ((n = _u(t.type, t.key, t.props, null, e.mode, n)).ref = Go(e, null, t)), (n.return = e), n;
                            case k:
                                return ((t = zu(t, e.mode, n)).return = e), t;
                            case A:
                                return f(e, (0, t._init)(t._payload), n);
                        }
                        if (te(t) || _(t)) return ((t = Du(t, e.mode, n, null)).return = e), t;
                        Qo(e, t);
                    }
                    return null;
                }
                function h(e, t, n, r) {
                    var a = null !== t ? t.key : null;
                    if (("string" === typeof n && "" !== n) || "number" === typeof n) return null !== a ? null : s(e, t, "" + n, r);
                    if ("object" === typeof n && null !== n) {
                        switch (n.$$typeof) {
                            case w:
                                return n.key === a ? u(e, t, n, r) : null;
                            case k:
                                return n.key === a ? c(e, t, n, r) : null;
                            case A:
                                return h(e, t, (a = n._init)(n._payload), r);
                        }
                        if (te(n) || _(n)) return null !== a ? null : d(e, t, n, r, null);
                        Qo(e, n);
                    }
                    return null;
                }
                function p(e, t, n, r, a) {
                    if (("string" === typeof r && "" !== r) || "number" === typeof r) return s(t, (e = e.get(n) || null), "" + r, a);
                    if ("object" === typeof r && null !== r) {
                        switch (r.$$typeof) {
                            case w:
                                return u(t, (e = e.get(null === r.key ? n : r.key) || null), r, a);
                            case k:
                                return c(t, (e = e.get(null === r.key ? n : r.key) || null), r, a);
                            case A:
                                return p(e, t, n, (0, r._init)(r._payload), a);
                        }
                        if (te(r) || _(r)) return d(t, (e = e.get(n) || null), r, a, null);
                        Qo(t, r);
                    }
                    return null;
                }
                function m(a, o, l, s) {
                    for (var u = null, c = null, d = o, m = (o = 0), v = null; null !== d && m < l.length; m++) {
                        d.index > m ? ((v = d), (d = null)) : (v = d.sibling);
                        var g = h(a, d, l[m], s);
                        if (null === g) {
                            null === d && (d = v);
                            break;
                        }
                        e && d && null === g.alternate && t(a, d), (o = i(g, o, m)), null === c ? (u = g) : (c.sibling = g), (c = g), (d = v);
                    }
                    if (m === l.length) return n(a, d), ao && Xa(a, m), u;
                    if (null === d) {
                        for (; m < l.length; m++) null !== (d = f(a, l[m], s)) && ((o = i(d, o, m)), null === c ? (u = d) : (c.sibling = d), (c = d));
                        return ao && Xa(a, m), u;
                    }
                    for (d = r(a, d); m < l.length; m++) null !== (v = p(d, a, m, l[m], s)) && (e && null !== v.alternate && d.delete(null === v.key ? m : v.key), (o = i(v, o, m)), null === c ? (u = v) : (c.sibling = v), (c = v));
                    return (
                        e &&
                        d.forEach(function (e) {
                            return t(a, e);
                        }),
                        ao && Xa(a, m),
                        u
                    );
                }
                function v(a, l, s, u) {
                    var c = _(s);
                    if ("function" !== typeof c) throw Error(o(150));
                    if (null == (s = c.call(s))) throw Error(o(151));
                    for (var d = (c = null), m = l, v = (l = 0), g = null, y = s.next(); null !== m && !y.done; v++, y = s.next()) {
                        m.index > v ? ((g = m), (m = null)) : (g = m.sibling);
                        var b = h(a, m, y.value, u);
                        if (null === b) {
                            null === m && (m = g);
                            break;
                        }
                        e && m && null === b.alternate && t(a, m), (l = i(b, l, v)), null === d ? (c = b) : (d.sibling = b), (d = b), (m = g);
                    }
                    if (y.done) return n(a, m), ao && Xa(a, v), c;
                    if (null === m) {
                        for (; !y.done; v++, y = s.next()) null !== (y = f(a, y.value, u)) && ((l = i(y, l, v)), null === d ? (c = y) : (d.sibling = y), (d = y));
                        return ao && Xa(a, v), c;
                    }
                    for (m = r(a, m); !y.done; v++, y = s.next())
                        null !== (y = p(m, a, v, y.value, u)) && (e && null !== y.alternate && m.delete(null === y.key ? v : y.key), (l = i(y, l, v)), null === d ? (c = y) : (d.sibling = y), (d = y));
                    return (
                        e &&
                        m.forEach(function (e) {
                            return t(a, e);
                        }),
                        ao && Xa(a, v),
                        c
                    );
                }
                return function e(r, o, i, s) {
                    if (("object" === typeof i && null !== i && i.type === C && null === i.key && (i = i.props.children), "object" === typeof i && null !== i)) {
                        switch (i.$$typeof) {
                            case w:
                                e: {
                                    for (var u = i.key, c = o; null !== c;) {
                                        if (c.key === u) {
                                            if ((u = i.type) === C) {
                                                if (7 === c.tag) {
                                                    n(r, c.sibling), ((o = a(c, i.props.children)).return = r), (r = o);
                                                    break e;
                                                }
                                            } else if (c.elementType === u || ("object" === typeof u && null !== u && u.$$typeof === A && Yo(u) === c.type)) {
                                                n(r, c.sibling), ((o = a(c, i.props)).ref = Go(r, c, i)), (o.return = r), (r = o);
                                                break e;
                                            }
                                            n(r, c);
                                            break;
                                        }
                                        t(r, c), (c = c.sibling);
                                    }
                                    i.type === C ? (((o = Du(i.props.children, r.mode, s, i.key)).return = r), (r = o)) : (((s = _u(i.type, i.key, i.props, null, r.mode, s)).ref = Go(r, o, i)), (s.return = r), (r = s));
                                }
                                return l(r);
                            case k:
                                e: {
                                    for (c = i.key; null !== o;) {
                                        if (o.key === c) {
                                            if (4 === o.tag && o.stateNode.containerInfo === i.containerInfo && o.stateNode.implementation === i.implementation) {
                                                n(r, o.sibling), ((o = a(o, i.children || [])).return = r), (r = o);
                                                break e;
                                            }
                                            n(r, o);
                                            break;
                                        }
                                        t(r, o), (o = o.sibling);
                                    }
                                    ((o = zu(i, r.mode, s)).return = r), (r = o);
                                }
                                return l(r);
                            case A:
                                return e(r, o, (c = i._init)(i._payload), s);
                        }
                        if (te(i)) return m(r, o, i, s);
                        if (_(i)) return v(r, o, i, s);
                        Qo(r, i);
                    }
                    return ("string" === typeof i && "" !== i) || "number" === typeof i
                        ? ((i = "" + i), null !== o && 6 === o.tag ? (n(r, o.sibling), ((o = a(o, i)).return = r), (r = o)) : (n(r, o), ((o = Fu(i, r.mode, s)).return = r), (r = o)), l(r))
                        : n(r, o);
                };
            }
            var Zo = Ko(!0),
                Xo = Ko(!1),
                Jo = {},
                ei = ja(Jo),
                ti = ja(Jo),
                ni = ja(Jo);
            function ri(e) {
                if (e === Jo) throw Error(o(174));
                return e;
            }
            function ai(e, t) {
                switch ((Ea(ni, t), Ea(ti, e), Ea(ei, Jo), (e = t.nodeType))) {
                    case 9:
                    case 11:
                        t = (t = t.documentElement) ? t.namespaceURI : se(null, "");
                        break;
                    default:
                        t = se((t = (e = 8 === e ? t.parentNode : t).namespaceURI || null), (e = e.tagName));
                }
                Sa(ei), Ea(ei, t);
            }
            function oi() {
                Sa(ei), Sa(ti), Sa(ni);
            }
            function ii(e) {
                ri(ni.current);
                var t = ri(ei.current),
                    n = se(t, e.type);
                t !== n && (Ea(ti, e), Ea(ei, n));
            }
            function li(e) {
                ti.current === e && (Sa(ei), Sa(ti));
            }
            var si = ja(0);
            function ui(e) {
                for (var t = e; null !== t;) {
                    if (13 === t.tag) {
                        var n = t.memoizedState;
                        if (null !== n && (null === (n = n.dehydrated) || "$?" === n.data || "$!" === n.data)) return t;
                    } else if (19 === t.tag && void 0 !== t.memoizedProps.revealOrder) {
                        if (0 !== (128 & t.flags)) return t;
                    } else if (null !== t.child) {
                        (t.child.return = t), (t = t.child);
                        continue;
                    }
                    if (t === e) break;
                    for (; null === t.sibling;) {
                        if (null === t.return || t.return === e) return null;
                        t = t.return;
                    }
                    (t.sibling.return = t.return), (t = t.sibling);
                }
                return null;
            }
            var ci = [];
            function di() {
                for (var e = 0; e < ci.length; e++) ci[e]._workInProgressVersionPrimary = null;
                ci.length = 0;
            }
            var fi = x.ReactCurrentDispatcher,
                hi = x.ReactCurrentBatchConfig,
                pi = 0,
                mi = null,
                vi = null,
                gi = null,
                yi = !1,
                bi = !1,
                xi = 0,
                wi = 0;
            function ki() {
                throw Error(o(321));
            }
            function Ci(e, t) {
                if (null === t) return !1;
                for (var n = 0; n < t.length && n < e.length; n++) if (!lr(e[n], t[n])) return !1;
                return !0;
            }
            function ji(e, t, n, r, a, i) {
                if (((pi = i), (mi = t), (t.memoizedState = null), (t.updateQueue = null), (t.lanes = 0), (fi.current = null === e || null === e.memoizedState ? ll : sl), (e = n(r, a)), bi)) {
                    i = 0;
                    do {
                        if (((bi = !1), (xi = 0), 25 <= i)) throw Error(o(301));
                        (i += 1), (gi = vi = null), (t.updateQueue = null), (fi.current = ul), (e = n(r, a));
                    } while (bi);
                }
                if (((fi.current = il), (t = null !== vi && null !== vi.next), (pi = 0), (gi = vi = mi = null), (yi = !1), t)) throw Error(o(300));
                return e;
            }
            function Si() {
                var e = 0 !== xi;
                return (xi = 0), e;
            }
            function Ei() {
                var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
                return null === gi ? (mi.memoizedState = gi = e) : (gi = gi.next = e), gi;
            }
            function Ni() {
                if (null === vi) {
                    var e = mi.alternate;
                    e = null !== e ? e.memoizedState : null;
                } else e = vi.next;
                var t = null === gi ? mi.memoizedState : gi.next;
                if (null !== t) (gi = t), (vi = e);
                else {
                    if (null === e) throw Error(o(310));
                    (e = { memoizedState: (vi = e).memoizedState, baseState: vi.baseState, baseQueue: vi.baseQueue, queue: vi.queue, next: null }), null === gi ? (mi.memoizedState = gi = e) : (gi = gi.next = e);
                }
                return gi;
            }
            function Pi(e, t) {
                return "function" === typeof t ? t(e) : t;
            }
            function Ti(e) {
                var t = Ni(),
                    n = t.queue;
                if (null === n) throw Error(o(311));
                n.lastRenderedReducer = e;
                var r = vi,
                    a = r.baseQueue,
                    i = n.pending;
                if (null !== i) {
                    if (null !== a) {
                        var l = a.next;
                        (a.next = i.next), (i.next = l);
                    }
                    (r.baseQueue = a = i), (n.pending = null);
                }
                if (null !== a) {
                    (i = a.next), (r = r.baseState);
                    var s = (l = null),
                        u = null,
                        c = i;
                    do {
                        var d = c.lane;
                        if ((pi & d) === d) null !== u && (u = u.next = { lane: 0, action: c.action, hasEagerState: c.hasEagerState, eagerState: c.eagerState, next: null }), (r = c.hasEagerState ? c.eagerState : e(r, c.action));
                        else {
                            var f = { lane: d, action: c.action, hasEagerState: c.hasEagerState, eagerState: c.eagerState, next: null };
                            null === u ? ((s = u = f), (l = r)) : (u = u.next = f), (mi.lanes |= d), (Ms |= d);
                        }
                        c = c.next;
                    } while (null !== c && c !== i);
                    null === u ? (l = r) : (u.next = s), lr(r, t.memoizedState) || (xl = !0), (t.memoizedState = r), (t.baseState = l), (t.baseQueue = u), (n.lastRenderedState = r);
                }
                if (null !== (e = n.interleaved)) {
                    a = e;
                    do {
                        (i = a.lane), (mi.lanes |= i), (Ms |= i), (a = a.next);
                    } while (a !== e);
                } else null === a && (n.lanes = 0);
                return [t.memoizedState, n.dispatch];
            }
            function Oi(e) {
                var t = Ni(),
                    n = t.queue;
                if (null === n) throw Error(o(311));
                n.lastRenderedReducer = e;
                var r = n.dispatch,
                    a = n.pending,
                    i = t.memoizedState;
                if (null !== a) {
                    n.pending = null;
                    var l = (a = a.next);
                    do {
                        (i = e(i, l.action)), (l = l.next);
                    } while (l !== a);
                    lr(i, t.memoizedState) || (xl = !0), (t.memoizedState = i), null === t.baseQueue && (t.baseState = i), (n.lastRenderedState = i);
                }
                return [i, r];
            }
            function Ri() { }
            function Ai(e, t) {
                var n = mi,
                    r = Ni(),
                    a = t(),
                    i = !lr(r.memoizedState, a);
                if ((i && ((r.memoizedState = a), (xl = !0)), (r = r.queue), Hi(_i.bind(null, n, r, e), [e]), r.getSnapshot !== t || i || (null !== gi && 1 & gi.memoizedState.tag))) {
                    if (((n.flags |= 2048), zi(9, Ii.bind(null, n, r, a, t), void 0, null), null === Os)) throw Error(o(349));
                    0 !== (30 & pi) || Li(n, t, a);
                }
                return a;
            }
            function Li(e, t, n) {
                (e.flags |= 16384),
                    (e = { getSnapshot: t, value: n }),
                    null === (t = mi.updateQueue) ? ((t = { lastEffect: null, stores: null }), (mi.updateQueue = t), (t.stores = [e])) : null === (n = t.stores) ? (t.stores = [e]) : n.push(e);
            }
            function Ii(e, t, n, r) {
                (t.value = n), (t.getSnapshot = r), Di(t) && Mi(e);
            }
            function _i(e, t, n) {
                return n(function () {
                    Di(t) && Mi(e);
                });
            }
            function Di(e) {
                var t = e.getSnapshot;
                e = e.value;
                try {
                    var n = t();
                    return !lr(e, n);
                } catch (r) {
                    return !0;
                }
            }
            function Mi(e) {
                var t = Oo(e, 1);
                null !== t && ru(t, e, 1, -1);
            }
            function Fi(e) {
                var t = Ei();
                return (
                    "function" === typeof e && (e = e()),
                    (t.memoizedState = t.baseState = e),
                    (e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Pi, lastRenderedState: e }),
                    (t.queue = e),
                    (e = e.dispatch = nl.bind(null, mi, e)),
                    [t.memoizedState, e]
                );
            }
            function zi(e, t, n, r) {
                return (
                    (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
                    null === (t = mi.updateQueue)
                        ? ((t = { lastEffect: null, stores: null }), (mi.updateQueue = t), (t.lastEffect = e.next = e))
                        : null === (n = t.lastEffect)
                            ? (t.lastEffect = e.next = e)
                            : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e)),
                    e
                );
            }
            function Ui() {
                return Ni().memoizedState;
            }
            function Bi(e, t, n, r) {
                var a = Ei();
                (mi.flags |= e), (a.memoizedState = zi(1 | t, n, void 0, void 0 === r ? null : r));
            }
            function Wi(e, t, n, r) {
                var a = Ni();
                r = void 0 === r ? null : r;
                var o = void 0;
                if (null !== vi) {
                    var i = vi.memoizedState;
                    if (((o = i.destroy), null !== r && Ci(r, i.deps))) return void (a.memoizedState = zi(t, n, o, r));
                }
                (mi.flags |= e), (a.memoizedState = zi(1 | t, n, o, r));
            }
            function Vi(e, t) {
                return Bi(8390656, 8, e, t);
            }
            function Hi(e, t) {
                return Wi(2048, 8, e, t);
            }
            function qi(e, t) {
                return Wi(4, 2, e, t);
            }
            function $i(e, t) {
                return Wi(4, 4, e, t);
            }
            function Gi(e, t) {
                return "function" === typeof t
                    ? ((e = e()),
                        t(e),
                        function () {
                            t(null);
                        })
                    : null !== t && void 0 !== t
                        ? ((e = e()),
                            (t.current = e),
                            function () {
                                t.current = null;
                            })
                        : void 0;
            }
            function Qi(e, t, n) {
                return (n = null !== n && void 0 !== n ? n.concat([e]) : null), Wi(4, 4, Gi.bind(null, t, e), n);
            }
            function Yi() { }
            function Ki(e, t) {
                var n = Ni();
                t = void 0 === t ? null : t;
                var r = n.memoizedState;
                return null !== r && null !== t && Ci(t, r[1]) ? r[0] : ((n.memoizedState = [e, t]), e);
            }
            function Zi(e, t) {
                var n = Ni();
                t = void 0 === t ? null : t;
                var r = n.memoizedState;
                return null !== r && null !== t && Ci(t, r[1]) ? r[0] : ((e = e()), (n.memoizedState = [e, t]), e);
            }
            function Xi(e, t, n) {
                return 0 === (21 & pi) ? (e.baseState && ((e.baseState = !1), (xl = !0)), (e.memoizedState = n)) : (lr(n, t) || ((n = mt()), (mi.lanes |= n), (Ms |= n), (e.baseState = !0)), t);
            }
            function Ji(e, t) {
                var n = bt;
                (bt = 0 !== n && 4 > n ? n : 4), e(!0);
                var r = hi.transition;
                hi.transition = {};
                try {
                    e(!1), t();
                } finally {
                    (bt = n), (hi.transition = r);
                }
            }
            function el() {
                return Ni().memoizedState;
            }
            function tl(e, t, n) {
                var r = nu(e);
                if (((n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }), rl(e))) al(t, n);
                else if (null !== (n = To(e, t, n, r))) {
                    ru(n, e, r, tu()), ol(n, t, r);
                }
            }
            function nl(e, t, n) {
                var r = nu(e),
                    a = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
                if (rl(e)) al(t, a);
                else {
                    var o = e.alternate;
                    if (0 === e.lanes && (null === o || 0 === o.lanes) && null !== (o = t.lastRenderedReducer))
                        try {
                            var i = t.lastRenderedState,
                                l = o(i, n);
                            if (((a.hasEagerState = !0), (a.eagerState = l), lr(l, i))) {
                                var s = t.interleaved;
                                return null === s ? ((a.next = a), Po(t)) : ((a.next = s.next), (s.next = a)), void (t.interleaved = a);
                            }
                        } catch (u) { }
                    null !== (n = To(e, t, a, r)) && (ru(n, e, r, (a = tu())), ol(n, t, r));
                }
            }
            function rl(e) {
                var t = e.alternate;
                return e === mi || (null !== t && t === mi);
            }
            function al(e, t) {
                bi = yi = !0;
                var n = e.pending;
                null === n ? (t.next = t) : ((t.next = n.next), (n.next = t)), (e.pending = t);
            }
            function ol(e, t, n) {
                if (0 !== (4194240 & n)) {
                    var r = t.lanes;
                    (n |= r &= e.pendingLanes), (t.lanes = n), yt(e, n);
                }
            }
            var il = {
                readContext: Eo,
                useCallback: ki,
                useContext: ki,
                useEffect: ki,
                useImperativeHandle: ki,
                useInsertionEffect: ki,
                useLayoutEffect: ki,
                useMemo: ki,
                useReducer: ki,
                useRef: ki,
                useState: ki,
                useDebugValue: ki,
                useDeferredValue: ki,
                useTransition: ki,
                useMutableSource: ki,
                useSyncExternalStore: ki,
                useId: ki,
                unstable_isNewReconciler: !1,
            },
                ll = {
                    readContext: Eo,
                    useCallback: function (e, t) {
                        return (Ei().memoizedState = [e, void 0 === t ? null : t]), e;
                    },
                    useContext: Eo,
                    useEffect: Vi,
                    useImperativeHandle: function (e, t, n) {
                        return (n = null !== n && void 0 !== n ? n.concat([e]) : null), Bi(4194308, 4, Gi.bind(null, t, e), n);
                    },
                    useLayoutEffect: function (e, t) {
                        return Bi(4194308, 4, e, t);
                    },
                    useInsertionEffect: function (e, t) {
                        return Bi(4, 2, e, t);
                    },
                    useMemo: function (e, t) {
                        var n = Ei();
                        return (t = void 0 === t ? null : t), (e = e()), (n.memoizedState = [e, t]), e;
                    },
                    useReducer: function (e, t, n) {
                        var r = Ei();
                        return (
                            (t = void 0 !== n ? n(t) : t),
                            (r.memoizedState = r.baseState = t),
                            (e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }),
                            (r.queue = e),
                            (e = e.dispatch = tl.bind(null, mi, e)),
                            [r.memoizedState, e]
                        );
                    },
                    useRef: function (e) {
                        return (e = { current: e }), (Ei().memoizedState = e);
                    },
                    useState: Fi,
                    useDebugValue: Yi,
                    useDeferredValue: function (e) {
                        return (Ei().memoizedState = e);
                    },
                    useTransition: function () {
                        var e = Fi(!1),
                            t = e[0];
                        return (e = Ji.bind(null, e[1])), (Ei().memoizedState = e), [t, e];
                    },
                    useMutableSource: function () { },
                    useSyncExternalStore: function (e, t, n) {
                        var r = mi,
                            a = Ei();
                        if (ao) {
                            if (void 0 === n) throw Error(o(407));
                            n = n();
                        } else {
                            if (((n = t()), null === Os)) throw Error(o(349));
                            0 !== (30 & pi) || Li(r, t, n);
                        }
                        a.memoizedState = n;
                        var i = { value: n, getSnapshot: t };
                        return (a.queue = i), Vi(_i.bind(null, r, i, e), [e]), (r.flags |= 2048), zi(9, Ii.bind(null, r, i, n, t), void 0, null), n;
                    },
                    useId: function () {
                        var e = Ei(),
                            t = Os.identifierPrefix;
                        if (ao) {
                            var n = Za;
                            (t = ":" + t + "R" + (n = (Ka & ~(1 << (32 - it(Ka) - 1))).toString(32) + n)), 0 < (n = xi++) && (t += "H" + n.toString(32)), (t += ":");
                        } else t = ":" + t + "r" + (n = wi++).toString(32) + ":";
                        return (e.memoizedState = t);
                    },
                    unstable_isNewReconciler: !1,
                },
                sl = {
                    readContext: Eo,
                    useCallback: Ki,
                    useContext: Eo,
                    useEffect: Hi,
                    useImperativeHandle: Qi,
                    useInsertionEffect: qi,
                    useLayoutEffect: $i,
                    useMemo: Zi,
                    useReducer: Ti,
                    useRef: Ui,
                    useState: function () {
                        return Ti(Pi);
                    },
                    useDebugValue: Yi,
                    useDeferredValue: function (e) {
                        return Xi(Ni(), vi.memoizedState, e);
                    },
                    useTransition: function () {
                        return [Ti(Pi)[0], Ni().memoizedState];
                    },
                    useMutableSource: Ri,
                    useSyncExternalStore: Ai,
                    useId: el,
                    unstable_isNewReconciler: !1,
                },
                ul = {
                    readContext: Eo,
                    useCallback: Ki,
                    useContext: Eo,
                    useEffect: Hi,
                    useImperativeHandle: Qi,
                    useInsertionEffect: qi,
                    useLayoutEffect: $i,
                    useMemo: Zi,
                    useReducer: Oi,
                    useRef: Ui,
                    useState: function () {
                        return Oi(Pi);
                    },
                    useDebugValue: Yi,
                    useDeferredValue: function (e) {
                        var t = Ni();
                        return null === vi ? (t.memoizedState = e) : Xi(t, vi.memoizedState, e);
                    },
                    useTransition: function () {
                        return [Oi(Pi)[0], Ni().memoizedState];
                    },
                    useMutableSource: Ri,
                    useSyncExternalStore: Ai,
                    useId: el,
                    unstable_isNewReconciler: !1,
                };
            function cl(e, t) {
                try {
                    var n = "",
                        r = t;
                    do {
                        (n += B(r)), (r = r.return);
                    } while (r);
                    var a = n;
                } catch (o) {
                    a = "\nError generating stack: " + o.message + "\n" + o.stack;
                }
                return { value: e, source: t, stack: a, digest: null };
            }
            function dl(e, t, n) {
                return { value: e, source: null, stack: null != n ? n : null, digest: null != t ? t : null };
            }
            function fl(e, t) {
                try {
                    console.error(t.value);
                } catch (n) {
                    setTimeout(function () {
                        throw n;
                    });
                }
            }
            var hl = "function" === typeof WeakMap ? WeakMap : Map;
            function pl(e, t, n) {
                ((n = Io(-1, n)).tag = 3), (n.payload = { element: null });
                var r = t.value;
                return (
                    (n.callback = function () {
                        qs || ((qs = !0), ($s = r)), fl(0, t);
                    }),
                    n
                );
            }
            function ml(e, t, n) {
                (n = Io(-1, n)).tag = 3;
                var r = e.type.getDerivedStateFromError;
                if ("function" === typeof r) {
                    var a = t.value;
                    (n.payload = function () {
                        return r(a);
                    }),
                        (n.callback = function () {
                            fl(0, t);
                        });
                }
                var o = e.stateNode;
                return (
                    null !== o &&
                    "function" === typeof o.componentDidCatch &&
                    (n.callback = function () {
                        fl(0, t), "function" !== typeof r && (null === Gs ? (Gs = new Set([this])) : Gs.add(this));
                        var e = t.stack;
                        this.componentDidCatch(t.value, { componentStack: null !== e ? e : "" });
                    }),
                    n
                );
            }
            function vl(e, t, n) {
                var r = e.pingCache;
                if (null === r) {
                    r = e.pingCache = new hl();
                    var a = new Set();
                    r.set(t, a);
                } else void 0 === (a = r.get(t)) && ((a = new Set()), r.set(t, a));
                a.has(n) || (a.add(n), (e = Eu.bind(null, e, t, n)), t.then(e, e));
            }
            function gl(e) {
                do {
                    var t;
                    if (((t = 13 === e.tag) && (t = null === (t = e.memoizedState) || null !== t.dehydrated), t)) return e;
                    e = e.return;
                } while (null !== e);
                return null;
            }
            function yl(e, t, n, r, a) {
                return 0 === (1 & e.mode)
                    ? (e === t ? (e.flags |= 65536) : ((e.flags |= 128), (n.flags |= 131072), (n.flags &= -52805), 1 === n.tag && (null === n.alternate ? (n.tag = 17) : (((t = Io(-1, 1)).tag = 2), _o(n, t, 1))), (n.lanes |= 1)), e)
                    : ((e.flags |= 65536), (e.lanes = a), e);
            }
            var bl = x.ReactCurrentOwner,
                xl = !1;
            function wl(e, t, n, r) {
                t.child = null === e ? Xo(t, null, n, r) : Zo(t, e.child, n, r);
            }
            function kl(e, t, n, r, a) {
                n = n.render;
                var o = t.ref;
                return (
                    So(t, a), (r = ji(e, t, n, r, o, a)), (n = Si()), null === e || xl ? (ao && n && eo(t), (t.flags |= 1), wl(e, t, r, a), t.child) : ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~a), ql(e, t, a))
                );
            }
            function Cl(e, t, n, r, a) {
                if (null === e) {
                    var o = n.type;
                    return "function" !== typeof o || Lu(o) || void 0 !== o.defaultProps || null !== n.compare || void 0 !== n.defaultProps
                        ? (((e = _u(n.type, null, r, t, t.mode, a)).ref = t.ref), (e.return = t), (t.child = e))
                        : ((t.tag = 15), (t.type = o), jl(e, t, o, r, a));
                }
                if (((o = e.child), 0 === (e.lanes & a))) {
                    var i = o.memoizedProps;
                    if ((n = null !== (n = n.compare) ? n : sr)(i, r) && e.ref === t.ref) return ql(e, t, a);
                }
                return (t.flags |= 1), ((e = Iu(o, r)).ref = t.ref), (e.return = t), (t.child = e);
            }
            function jl(e, t, n, r, a) {
                if (null !== e) {
                    var o = e.memoizedProps;
                    if (sr(o, r) && e.ref === t.ref) {
                        if (((xl = !1), (t.pendingProps = r = o), 0 === (e.lanes & a))) return (t.lanes = e.lanes), ql(e, t, a);
                        0 !== (131072 & e.flags) && (xl = !0);
                    }
                }
                return Nl(e, t, n, r, a);
            }
            function Sl(e, t, n) {
                var r = t.pendingProps,
                    a = r.children,
                    o = null !== e ? e.memoizedState : null;
                if ("hidden" === r.mode)
                    if (0 === (1 & t.mode)) (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }), Ea(Is, Ls), (Ls |= n);
                    else {
                        if (0 === (1073741824 & n))
                            return (
                                (e = null !== o ? o.baseLanes | n : n), (t.lanes = t.childLanes = 1073741824), (t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }), (t.updateQueue = null), Ea(Is, Ls), (Ls |= e), null
                            );
                        (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }), (r = null !== o ? o.baseLanes : n), Ea(Is, Ls), (Ls |= r);
                    }
                else null !== o ? ((r = o.baseLanes | n), (t.memoizedState = null)) : (r = n), Ea(Is, Ls), (Ls |= r);
                return wl(e, t, a, n), t.child;
            }
            function El(e, t) {
                var n = t.ref;
                ((null === e && null !== n) || (null !== e && e.ref !== n)) && ((t.flags |= 512), (t.flags |= 2097152));
            }
            function Nl(e, t, n, r, a) {
                var o = Aa(n) ? Oa : Pa.current;
                return (
                    (o = Ra(t, o)),
                    So(t, a),
                    (n = ji(e, t, n, r, o, a)),
                    (r = Si()),
                    null === e || xl ? (ao && r && eo(t), (t.flags |= 1), wl(e, t, n, a), t.child) : ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~a), ql(e, t, a))
                );
            }
            function Pl(e, t, n, r, a) {
                if (Aa(n)) {
                    var o = !0;
                    Da(t);
                } else o = !1;
                if ((So(t, a), null === t.stateNode)) Hl(e, t), Ho(t, n, r), $o(t, n, r, a), (r = !0);
                else if (null === e) {
                    var i = t.stateNode,
                        l = t.memoizedProps;
                    i.props = l;
                    var s = i.context,
                        u = n.contextType;
                    "object" === typeof u && null !== u ? (u = Eo(u)) : (u = Ra(t, (u = Aa(n) ? Oa : Pa.current)));
                    var c = n.getDerivedStateFromProps,
                        d = "function" === typeof c || "function" === typeof i.getSnapshotBeforeUpdate;
                    d || ("function" !== typeof i.UNSAFE_componentWillReceiveProps && "function" !== typeof i.componentWillReceiveProps) || ((l !== r || s !== u) && qo(t, i, r, u)), (Ro = !1);
                    var f = t.memoizedState;
                    (i.state = f),
                        Fo(t, r, i, a),
                        (s = t.memoizedState),
                        l !== r || f !== s || Ta.current || Ro
                            ? ("function" === typeof c && (Bo(t, n, c, r), (s = t.memoizedState)),
                                (l = Ro || Vo(t, n, l, r, f, s, u))
                                    ? (d ||
                                        ("function" !== typeof i.UNSAFE_componentWillMount && "function" !== typeof i.componentWillMount) ||
                                        ("function" === typeof i.componentWillMount && i.componentWillMount(), "function" === typeof i.UNSAFE_componentWillMount && i.UNSAFE_componentWillMount()),
                                        "function" === typeof i.componentDidMount && (t.flags |= 4194308))
                                    : ("function" === typeof i.componentDidMount && (t.flags |= 4194308), (t.memoizedProps = r), (t.memoizedState = s)),
                                (i.props = r),
                                (i.state = s),
                                (i.context = u),
                                (r = l))
                            : ("function" === typeof i.componentDidMount && (t.flags |= 4194308), (r = !1));
                } else {
                    (i = t.stateNode),
                        Lo(e, t),
                        (l = t.memoizedProps),
                        (u = t.type === t.elementType ? l : go(t.type, l)),
                        (i.props = u),
                        (d = t.pendingProps),
                        (f = i.context),
                        "object" === typeof (s = n.contextType) && null !== s ? (s = Eo(s)) : (s = Ra(t, (s = Aa(n) ? Oa : Pa.current)));
                    var h = n.getDerivedStateFromProps;
                    (c = "function" === typeof h || "function" === typeof i.getSnapshotBeforeUpdate) ||
                        ("function" !== typeof i.UNSAFE_componentWillReceiveProps && "function" !== typeof i.componentWillReceiveProps) ||
                        ((l !== d || f !== s) && qo(t, i, r, s)),
                        (Ro = !1),
                        (f = t.memoizedState),
                        (i.state = f),
                        Fo(t, r, i, a);
                    var p = t.memoizedState;
                    l !== d || f !== p || Ta.current || Ro
                        ? ("function" === typeof h && (Bo(t, n, h, r), (p = t.memoizedState)),
                            (u = Ro || Vo(t, n, u, r, f, p, s) || !1)
                                ? (c ||
                                    ("function" !== typeof i.UNSAFE_componentWillUpdate && "function" !== typeof i.componentWillUpdate) ||
                                    ("function" === typeof i.componentWillUpdate && i.componentWillUpdate(r, p, s), "function" === typeof i.UNSAFE_componentWillUpdate && i.UNSAFE_componentWillUpdate(r, p, s)),
                                    "function" === typeof i.componentDidUpdate && (t.flags |= 4),
                                    "function" === typeof i.getSnapshotBeforeUpdate && (t.flags |= 1024))
                                : ("function" !== typeof i.componentDidUpdate || (l === e.memoizedProps && f === e.memoizedState) || (t.flags |= 4),
                                    "function" !== typeof i.getSnapshotBeforeUpdate || (l === e.memoizedProps && f === e.memoizedState) || (t.flags |= 1024),
                                    (t.memoizedProps = r),
                                    (t.memoizedState = p)),
                            (i.props = r),
                            (i.state = p),
                            (i.context = s),
                            (r = u))
                        : ("function" !== typeof i.componentDidUpdate || (l === e.memoizedProps && f === e.memoizedState) || (t.flags |= 4),
                            "function" !== typeof i.getSnapshotBeforeUpdate || (l === e.memoizedProps && f === e.memoizedState) || (t.flags |= 1024),
                            (r = !1));
                }
                return Tl(e, t, n, r, o, a);
            }
            function Tl(e, t, n, r, a, o) {
                El(e, t);
                var i = 0 !== (128 & t.flags);
                if (!r && !i) return a && Ma(t, n, !1), ql(e, t, o);
                (r = t.stateNode), (bl.current = t);
                var l = i && "function" !== typeof n.getDerivedStateFromError ? null : r.render();
                return (t.flags |= 1), null !== e && i ? ((t.child = Zo(t, e.child, null, o)), (t.child = Zo(t, null, l, o))) : wl(e, t, l, o), (t.memoizedState = r.state), a && Ma(t, n, !0), t.child;
            }
            function Ol(e) {
                var t = e.stateNode;
                t.pendingContext ? Ia(0, t.pendingContext, t.pendingContext !== t.context) : t.context && Ia(0, t.context, !1), ai(e, t.containerInfo);
            }
            function Rl(e, t, n, r, a) {
                return po(), mo(a), (t.flags |= 256), wl(e, t, n, r), t.child;
            }
            var Al,
                Ll,
                Il,
                _l,
                Dl = { dehydrated: null, treeContext: null, retryLane: 0 };
            function Ml(e) {
                return { baseLanes: e, cachePool: null, transitions: null };
            }
            function Fl(e, t, n) {
                var r,
                    a = t.pendingProps,
                    i = si.current,
                    l = !1,
                    s = 0 !== (128 & t.flags);
                if (((r = s) || (r = (null === e || null !== e.memoizedState) && 0 !== (2 & i)), r ? ((l = !0), (t.flags &= -129)) : (null !== e && null === e.memoizedState) || (i |= 1), Ea(si, 1 & i), null === e))
                    return (
                        uo(t),
                        null !== (e = t.memoizedState) && null !== (e = e.dehydrated)
                            ? (0 === (1 & t.mode) ? (t.lanes = 1) : "$!" === e.data ? (t.lanes = 8) : (t.lanes = 1073741824), null)
                            : ((s = a.children),
                                (e = a.fallback),
                                l
                                    ? ((a = t.mode),
                                        (l = t.child),
                                        (s = { mode: "hidden", children: s }),
                                        0 === (1 & a) && null !== l ? ((l.childLanes = 0), (l.pendingProps = s)) : (l = Mu(s, a, 0, null)),
                                        (e = Du(e, a, n, null)),
                                        (l.return = t),
                                        (e.return = t),
                                        (l.sibling = e),
                                        (t.child = l),
                                        (t.child.memoizedState = Ml(n)),
                                        (t.memoizedState = Dl),
                                        e)
                                    : zl(t, s))
                    );
                if (null !== (i = e.memoizedState) && null !== (r = i.dehydrated))
                    return (function (e, t, n, r, a, i, l) {
                        if (n)
                            return 256 & t.flags
                                ? ((t.flags &= -257), Ul(e, t, l, (r = dl(Error(o(422))))))
                                : null !== t.memoizedState
                                    ? ((t.child = e.child), (t.flags |= 128), null)
                                    : ((i = r.fallback),
                                        (a = t.mode),
                                        (r = Mu({ mode: "visible", children: r.children }, a, 0, null)),
                                        ((i = Du(i, a, l, null)).flags |= 2),
                                        (r.return = t),
                                        (i.return = t),
                                        (r.sibling = i),
                                        (t.child = r),
                                        0 !== (1 & t.mode) && Zo(t, e.child, null, l),
                                        (t.child.memoizedState = Ml(l)),
                                        (t.memoizedState = Dl),
                                        i);
                        if (0 === (1 & t.mode)) return Ul(e, t, l, null);
                        if ("$!" === a.data) {
                            if ((r = a.nextSibling && a.nextSibling.dataset)) var s = r.dgst;
                            return (r = s), Ul(e, t, l, (r = dl((i = Error(o(419))), r, void 0)));
                        }
                        if (((s = 0 !== (l & e.childLanes)), xl || s)) {
                            if (null !== (r = Os)) {
                                switch (l & -l) {
                                    case 4:
                                        a = 2;
                                        break;
                                    case 16:
                                        a = 8;
                                        break;
                                    case 64:
                                    case 128:
                                    case 256:
                                    case 512:
                                    case 1024:
                                    case 2048:
                                    case 4096:
                                    case 8192:
                                    case 16384:
                                    case 32768:
                                    case 65536:
                                    case 131072:
                                    case 262144:
                                    case 524288:
                                    case 1048576:
                                    case 2097152:
                                    case 4194304:
                                    case 8388608:
                                    case 16777216:
                                    case 33554432:
                                    case 67108864:
                                        a = 32;
                                        break;
                                    case 536870912:
                                        a = 268435456;
                                        break;
                                    default:
                                        a = 0;
                                }
                                0 !== (a = 0 !== (a & (r.suspendedLanes | l)) ? 0 : a) && a !== i.retryLane && ((i.retryLane = a), Oo(e, a), ru(r, e, a, -1));
                            }
                            return vu(), Ul(e, t, l, (r = dl(Error(o(421)))));
                        }
                        return "$?" === a.data
                            ? ((t.flags |= 128), (t.child = e.child), (t = Pu.bind(null, e)), (a._reactRetry = t), null)
                            : ((e = i.treeContext),
                                (ro = ua(a.nextSibling)),
                                (no = t),
                                (ao = !0),
                                (oo = null),
                                null !== e && ((Ga[Qa++] = Ka), (Ga[Qa++] = Za), (Ga[Qa++] = Ya), (Ka = e.id), (Za = e.overflow), (Ya = t)),
                                (t = zl(t, r.children)),
                                (t.flags |= 4096),
                                t);
                    })(e, t, s, a, r, i, n);
                if (l) {
                    (l = a.fallback), (s = t.mode), (r = (i = e.child).sibling);
                    var u = { mode: "hidden", children: a.children };
                    return (
                        0 === (1 & s) && t.child !== i ? (((a = t.child).childLanes = 0), (a.pendingProps = u), (t.deletions = null)) : ((a = Iu(i, u)).subtreeFlags = 14680064 & i.subtreeFlags),
                        null !== r ? (l = Iu(r, l)) : ((l = Du(l, s, n, null)).flags |= 2),
                        (l.return = t),
                        (a.return = t),
                        (a.sibling = l),
                        (t.child = a),
                        (a = l),
                        (l = t.child),
                        (s = null === (s = e.child.memoizedState) ? Ml(n) : { baseLanes: s.baseLanes | n, cachePool: null, transitions: s.transitions }),
                        (l.memoizedState = s),
                        (l.childLanes = e.childLanes & ~n),
                        (t.memoizedState = Dl),
                        a
                    );
                }
                return (
                    (e = (l = e.child).sibling),
                    (a = Iu(l, { mode: "visible", children: a.children })),
                    0 === (1 & t.mode) && (a.lanes = n),
                    (a.return = t),
                    (a.sibling = null),
                    null !== e && (null === (n = t.deletions) ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
                    (t.child = a),
                    (t.memoizedState = null),
                    a
                );
            }
            function zl(e, t) {
                return ((t = Mu({ mode: "visible", children: t }, e.mode, 0, null)).return = e), (e.child = t);
            }
            function Ul(e, t, n, r) {
                return null !== r && mo(r), Zo(t, e.child, null, n), ((e = zl(t, t.pendingProps.children)).flags |= 2), (t.memoizedState = null), e;
            }
            function Bl(e, t, n) {
                e.lanes |= t;
                var r = e.alternate;
                null !== r && (r.lanes |= t), jo(e.return, t, n);
            }
            function Wl(e, t, n, r, a) {
                var o = e.memoizedState;
                null === o
                    ? (e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: a })
                    : ((o.isBackwards = t), (o.rendering = null), (o.renderingStartTime = 0), (o.last = r), (o.tail = n), (o.tailMode = a));
            }
            function Vl(e, t, n) {
                var r = t.pendingProps,
                    a = r.revealOrder,
                    o = r.tail;
                if ((wl(e, t, r.children, n), 0 !== (2 & (r = si.current)))) (r = (1 & r) | 2), (t.flags |= 128);
                else {
                    if (null !== e && 0 !== (128 & e.flags))
                        e: for (e = t.child; null !== e;) {
                            if (13 === e.tag) null !== e.memoizedState && Bl(e, n, t);
                            else if (19 === e.tag) Bl(e, n, t);
                            else if (null !== e.child) {
                                (e.child.return = e), (e = e.child);
                                continue;
                            }
                            if (e === t) break e;
                            for (; null === e.sibling;) {
                                if (null === e.return || e.return === t) break e;
                                e = e.return;
                            }
                            (e.sibling.return = e.return), (e = e.sibling);
                        }
                    r &= 1;
                }
                if ((Ea(si, r), 0 === (1 & t.mode))) t.memoizedState = null;
                else
                    switch (a) {
                        case "forwards":
                            for (n = t.child, a = null; null !== n;) null !== (e = n.alternate) && null === ui(e) && (a = n), (n = n.sibling);
                            null === (n = a) ? ((a = t.child), (t.child = null)) : ((a = n.sibling), (n.sibling = null)), Wl(t, !1, a, n, o);
                            break;
                        case "backwards":
                            for (n = null, a = t.child, t.child = null; null !== a;) {
                                if (null !== (e = a.alternate) && null === ui(e)) {
                                    t.child = a;
                                    break;
                                }
                                (e = a.sibling), (a.sibling = n), (n = a), (a = e);
                            }
                            Wl(t, !0, n, null, o);
                            break;
                        case "together":
                            Wl(t, !1, null, null, void 0);
                            break;
                        default:
                            t.memoizedState = null;
                    }
                return t.child;
            }
            function Hl(e, t) {
                0 === (1 & t.mode) && null !== e && ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
            }
            function ql(e, t, n) {
                if ((null !== e && (t.dependencies = e.dependencies), (Ms |= t.lanes), 0 === (n & t.childLanes))) return null;
                if (null !== e && t.child !== e.child) throw Error(o(153));
                if (null !== t.child) {
                    for (n = Iu((e = t.child), e.pendingProps), t.child = n, n.return = t; null !== e.sibling;) (e = e.sibling), ((n = n.sibling = Iu(e, e.pendingProps)).return = t);
                    n.sibling = null;
                }
                return t.child;
            }
            function $l(e, t) {
                if (!ao)
                    switch (e.tailMode) {
                        case "hidden":
                            t = e.tail;
                            for (var n = null; null !== t;) null !== t.alternate && (n = t), (t = t.sibling);
                            null === n ? (e.tail = null) : (n.sibling = null);
                            break;
                        case "collapsed":
                            n = e.tail;
                            for (var r = null; null !== n;) null !== n.alternate && (r = n), (n = n.sibling);
                            null === r ? (t || null === e.tail ? (e.tail = null) : (e.tail.sibling = null)) : (r.sibling = null);
                    }
            }
            function Gl(e) {
                var t = null !== e.alternate && e.alternate.child === e.child,
                    n = 0,
                    r = 0;
                if (t) for (var a = e.child; null !== a;) (n |= a.lanes | a.childLanes), (r |= 14680064 & a.subtreeFlags), (r |= 14680064 & a.flags), (a.return = e), (a = a.sibling);
                else for (a = e.child; null !== a;) (n |= a.lanes | a.childLanes), (r |= a.subtreeFlags), (r |= a.flags), (a.return = e), (a = a.sibling);
                return (e.subtreeFlags |= r), (e.childLanes = n), t;
            }
            function Ql(e, t, n) {
                var r = t.pendingProps;
                switch ((to(t), t.tag)) {
                    case 2:
                    case 16:
                    case 15:
                    case 0:
                    case 11:
                    case 7:
                    case 8:
                    case 12:
                    case 9:
                    case 14:
                        return Gl(t), null;
                    case 1:
                    case 17:
                        return Aa(t.type) && La(), Gl(t), null;
                    case 3:
                        return (
                            (r = t.stateNode),
                            oi(),
                            Sa(Ta),
                            Sa(Pa),
                            di(),
                            r.pendingContext && ((r.context = r.pendingContext), (r.pendingContext = null)),
                            (null !== e && null !== e.child) || (fo(t) ? (t.flags |= 4) : null === e || (e.memoizedState.isDehydrated && 0 === (256 & t.flags)) || ((t.flags |= 1024), null !== oo && (lu(oo), (oo = null)))),
                            Ll(e, t),
                            Gl(t),
                            null
                        );
                    case 5:
                        li(t);
                        var a = ri(ni.current);
                        if (((n = t.type), null !== e && null != t.stateNode)) Il(e, t, n, r, a), e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152));
                        else {
                            if (!r) {
                                if (null === t.stateNode) throw Error(o(166));
                                return Gl(t), null;
                            }
                            if (((e = ri(ei.current)), fo(t))) {
                                (r = t.stateNode), (n = t.type);
                                var i = t.memoizedProps;
                                switch (((r[fa] = t), (r[ha] = i), (e = 0 !== (1 & t.mode)), n)) {
                                    case "dialog":
                                        zr("cancel", r), zr("close", r);
                                        break;
                                    case "iframe":
                                    case "object":
                                    case "embed":
                                        zr("load", r);
                                        break;
                                    case "video":
                                    case "audio":
                                        for (a = 0; a < _r.length; a++) zr(_r[a], r);
                                        break;
                                    case "source":
                                        zr("error", r);
                                        break;
                                    case "img":
                                    case "image":
                                    case "link":
                                        zr("error", r), zr("load", r);
                                        break;
                                    case "details":
                                        zr("toggle", r);
                                        break;
                                    case "input":
                                        K(r, i), zr("invalid", r);
                                        break;
                                    case "select":
                                        (r._wrapperState = { wasMultiple: !!i.multiple }), zr("invalid", r);
                                        break;
                                    case "textarea":
                                        ae(r, i), zr("invalid", r);
                                }
                                for (var s in (ye(n, i), (a = null), i))
                                    if (i.hasOwnProperty(s)) {
                                        var u = i[s];
                                        "children" === s
                                            ? "string" === typeof u
                                                ? r.textContent !== u && (!0 !== i.suppressHydrationWarning && Xr(r.textContent, u, e), (a = ["children", u]))
                                                : "number" === typeof u && r.textContent !== "" + u && (!0 !== i.suppressHydrationWarning && Xr(r.textContent, u, e), (a = ["children", "" + u]))
                                            : l.hasOwnProperty(s) && null != u && "onScroll" === s && zr("scroll", r);
                                    }
                                switch (n) {
                                    case "input":
                                        $(r), J(r, i, !0);
                                        break;
                                    case "textarea":
                                        $(r), ie(r);
                                        break;
                                    case "select":
                                    case "option":
                                        break;
                                    default:
                                        "function" === typeof i.onClick && (r.onclick = Jr);
                                }
                                (r = a), (t.updateQueue = r), null !== r && (t.flags |= 4);
                            } else {
                                (s = 9 === a.nodeType ? a : a.ownerDocument),
                                    "http://www.w3.org/1999/xhtml" === e && (e = le(n)),
                                    "http://www.w3.org/1999/xhtml" === e
                                        ? "script" === n
                                            ? (((e = s.createElement("div")).innerHTML = "<script></script>"), (e = e.removeChild(e.firstChild)))
                                            : "string" === typeof r.is
                                                ? (e = s.createElement(n, { is: r.is }))
                                                : ((e = s.createElement(n)), "select" === n && ((s = e), r.multiple ? (s.multiple = !0) : r.size && (s.size = r.size)))
                                        : (e = s.createElementNS(e, n)),
                                    (e[fa] = t),
                                    (e[ha] = r),
                                    Al(e, t, !1, !1),
                                    (t.stateNode = e);
                                e: {
                                    switch (((s = be(n, r)), n)) {
                                        case "dialog":
                                            zr("cancel", e), zr("close", e), (a = r);
                                            break;
                                        case "iframe":
                                        case "object":
                                        case "embed":
                                            zr("load", e), (a = r);
                                            break;
                                        case "video":
                                        case "audio":
                                            for (a = 0; a < _r.length; a++) zr(_r[a], e);
                                            a = r;
                                            break;
                                        case "source":
                                            zr("error", e), (a = r);
                                            break;
                                        case "img":
                                        case "image":
                                        case "link":
                                            zr("error", e), zr("load", e), (a = r);
                                            break;
                                        case "details":
                                            zr("toggle", e), (a = r);
                                            break;
                                        case "input":
                                            K(e, r), (a = Y(e, r)), zr("invalid", e);
                                            break;
                                        case "option":
                                        default:
                                            a = r;
                                            break;
                                        case "select":
                                            (e._wrapperState = { wasMultiple: !!r.multiple }), (a = M({}, r, { value: void 0 })), zr("invalid", e);
                                            break;
                                        case "textarea":
                                            ae(e, r), (a = re(e, r)), zr("invalid", e);
                                    }
                                    for (i in (ye(n, a), (u = a)))
                                        if (u.hasOwnProperty(i)) {
                                            var c = u[i];
                                            "style" === i
                                                ? ve(e, c)
                                                : "dangerouslySetInnerHTML" === i
                                                    ? null != (c = c ? c.__html : void 0) && de(e, c)
                                                    : "children" === i
                                                        ? "string" === typeof c
                                                            ? ("textarea" !== n || "" !== c) && fe(e, c)
                                                            : "number" === typeof c && fe(e, "" + c)
                                                        : "suppressContentEditableWarning" !== i &&
                                                        "suppressHydrationWarning" !== i &&
                                                        "autoFocus" !== i &&
                                                        (l.hasOwnProperty(i) ? null != c && "onScroll" === i && zr("scroll", e) : null != c && b(e, i, c, s));
                                        }
                                    switch (n) {
                                        case "input":
                                            $(e), J(e, r, !1);
                                            break;
                                        case "textarea":
                                            $(e), ie(e);
                                            break;
                                        case "option":
                                            null != r.value && e.setAttribute("value", "" + H(r.value));
                                            break;
                                        case "select":
                                            (e.multiple = !!r.multiple), null != (i = r.value) ? ne(e, !!r.multiple, i, !1) : null != r.defaultValue && ne(e, !!r.multiple, r.defaultValue, !0);
                                            break;
                                        default:
                                            "function" === typeof a.onClick && (e.onclick = Jr);
                                    }
                                    switch (n) {
                                        case "button":
                                        case "input":
                                        case "select":
                                        case "textarea":
                                            r = !!r.autoFocus;
                                            break e;
                                        case "img":
                                            r = !0;
                                            break e;
                                        default:
                                            r = !1;
                                    }
                                }
                                r && (t.flags |= 4);
                            }
                            null !== t.ref && ((t.flags |= 512), (t.flags |= 2097152));
                        }
                        return Gl(t), null;
                    case 6:
                        if (e && null != t.stateNode) _l(e, t, e.memoizedProps, r);
                        else {
                            if ("string" !== typeof r && null === t.stateNode) throw Error(o(166));
                            if (((n = ri(ni.current)), ri(ei.current), fo(t))) {
                                if (((r = t.stateNode), (n = t.memoizedProps), (r[fa] = t), (i = r.nodeValue !== n) && null !== (e = no)))
                                    switch (e.tag) {
                                        case 3:
                                            Xr(r.nodeValue, n, 0 !== (1 & e.mode));
                                            break;
                                        case 5:
                                            !0 !== e.memoizedProps.suppressHydrationWarning && Xr(r.nodeValue, n, 0 !== (1 & e.mode));
                                    }
                                i && (t.flags |= 4);
                            } else ((r = (9 === n.nodeType ? n : n.ownerDocument).createTextNode(r))[fa] = t), (t.stateNode = r);
                        }
                        return Gl(t), null;
                    case 13:
                        if ((Sa(si), (r = t.memoizedState), null === e || (null !== e.memoizedState && null !== e.memoizedState.dehydrated))) {
                            if (ao && null !== ro && 0 !== (1 & t.mode) && 0 === (128 & t.flags)) ho(), po(), (t.flags |= 98560), (i = !1);
                            else if (((i = fo(t)), null !== r && null !== r.dehydrated)) {
                                if (null === e) {
                                    if (!i) throw Error(o(318));
                                    if (!(i = null !== (i = t.memoizedState) ? i.dehydrated : null)) throw Error(o(317));
                                    i[fa] = t;
                                } else po(), 0 === (128 & t.flags) && (t.memoizedState = null), (t.flags |= 4);
                                Gl(t), (i = !1);
                            } else null !== oo && (lu(oo), (oo = null)), (i = !0);
                            if (!i) return 65536 & t.flags ? t : null;
                        }
                        return 0 !== (128 & t.flags)
                            ? ((t.lanes = n), t)
                            : ((r = null !== r) !== (null !== e && null !== e.memoizedState) && r && ((t.child.flags |= 8192), 0 !== (1 & t.mode) && (null === e || 0 !== (1 & si.current) ? 0 === _s && (_s = 3) : vu())),
                                null !== t.updateQueue && (t.flags |= 4),
                                Gl(t),
                                null);
                    case 4:
                        return oi(), Ll(e, t), null === e && Wr(t.stateNode.containerInfo), Gl(t), null;
                    case 10:
                        return Co(t.type._context), Gl(t), null;
                    case 19:
                        if ((Sa(si), null === (i = t.memoizedState))) return Gl(t), null;
                        if (((r = 0 !== (128 & t.flags)), null === (s = i.rendering)))
                            if (r) $l(i, !1);
                            else {
                                if (0 !== _s || (null !== e && 0 !== (128 & e.flags)))
                                    for (e = t.child; null !== e;) {
                                        if (null !== (s = ui(e))) {
                                            for (t.flags |= 128, $l(i, !1), null !== (r = s.updateQueue) && ((t.updateQueue = r), (t.flags |= 4)), t.subtreeFlags = 0, r = n, n = t.child; null !== n;)
                                                (e = r),
                                                    ((i = n).flags &= 14680066),
                                                    null === (s = i.alternate)
                                                        ? ((i.childLanes = 0),
                                                            (i.lanes = e),
                                                            (i.child = null),
                                                            (i.subtreeFlags = 0),
                                                            (i.memoizedProps = null),
                                                            (i.memoizedState = null),
                                                            (i.updateQueue = null),
                                                            (i.dependencies = null),
                                                            (i.stateNode = null))
                                                        : ((i.childLanes = s.childLanes),
                                                            (i.lanes = s.lanes),
                                                            (i.child = s.child),
                                                            (i.subtreeFlags = 0),
                                                            (i.deletions = null),
                                                            (i.memoizedProps = s.memoizedProps),
                                                            (i.memoizedState = s.memoizedState),
                                                            (i.updateQueue = s.updateQueue),
                                                            (i.type = s.type),
                                                            (e = s.dependencies),
                                                            (i.dependencies = null === e ? null : { lanes: e.lanes, firstContext: e.firstContext })),
                                                    (n = n.sibling);
                                            return Ea(si, (1 & si.current) | 2), t.child;
                                        }
                                        e = e.sibling;
                                    }
                                null !== i.tail && Ze() > Vs && ((t.flags |= 128), (r = !0), $l(i, !1), (t.lanes = 4194304));
                            }
                        else {
                            if (!r)
                                if (null !== (e = ui(s))) {
                                    if (((t.flags |= 128), (r = !0), null !== (n = e.updateQueue) && ((t.updateQueue = n), (t.flags |= 4)), $l(i, !0), null === i.tail && "hidden" === i.tailMode && !s.alternate && !ao))
                                        return Gl(t), null;
                                } else 2 * Ze() - i.renderingStartTime > Vs && 1073741824 !== n && ((t.flags |= 128), (r = !0), $l(i, !1), (t.lanes = 4194304));
                            i.isBackwards ? ((s.sibling = t.child), (t.child = s)) : (null !== (n = i.last) ? (n.sibling = s) : (t.child = s), (i.last = s));
                        }
                        return null !== i.tail ? ((t = i.tail), (i.rendering = t), (i.tail = t.sibling), (i.renderingStartTime = Ze()), (t.sibling = null), (n = si.current), Ea(si, r ? (1 & n) | 2 : 1 & n), t) : (Gl(t), null);
                    case 22:
                    case 23:
                        return (
                            fu(),
                            (r = null !== t.memoizedState),
                            null !== e && (null !== e.memoizedState) !== r && (t.flags |= 8192),
                            r && 0 !== (1 & t.mode) ? 0 !== (1073741824 & Ls) && (Gl(t), 6 & t.subtreeFlags && (t.flags |= 8192)) : Gl(t),
                            null
                        );
                    case 24:
                    case 25:
                        return null;
                }
                throw Error(o(156, t.tag));
            }
            function Yl(e, t) {
                switch ((to(t), t.tag)) {
                    case 1:
                        return Aa(t.type) && La(), 65536 & (e = t.flags) ? ((t.flags = (-65537 & e) | 128), t) : null;
                    case 3:
                        return oi(), Sa(Ta), Sa(Pa), di(), 0 !== (65536 & (e = t.flags)) && 0 === (128 & e) ? ((t.flags = (-65537 & e) | 128), t) : null;
                    case 5:
                        return li(t), null;
                    case 13:
                        if ((Sa(si), null !== (e = t.memoizedState) && null !== e.dehydrated)) {
                            if (null === t.alternate) throw Error(o(340));
                            po();
                        }
                        return 65536 & (e = t.flags) ? ((t.flags = (-65537 & e) | 128), t) : null;
                    case 19:
                        return Sa(si), null;
                    case 4:
                        return oi(), null;
                    case 10:
                        return Co(t.type._context), null;
                    case 22:
                    case 23:
                        return fu(), null;
                    default:
                        return null;
                }
            }
            (Al = function (e, t) {
                for (var n = t.child; null !== n;) {
                    if (5 === n.tag || 6 === n.tag) e.appendChild(n.stateNode);
                    else if (4 !== n.tag && null !== n.child) {
                        (n.child.return = n), (n = n.child);
                        continue;
                    }
                    if (n === t) break;
                    for (; null === n.sibling;) {
                        if (null === n.return || n.return === t) return;
                        n = n.return;
                    }
                    (n.sibling.return = n.return), (n = n.sibling);
                }
            }),
                (Ll = function () { }),
                (Il = function (e, t, n, r) {
                    var a = e.memoizedProps;
                    if (a !== r) {
                        (e = t.stateNode), ri(ei.current);
                        var o,
                            i = null;
                        switch (n) {
                            case "input":
                                (a = Y(e, a)), (r = Y(e, r)), (i = []);
                                break;
                            case "select":
                                (a = M({}, a, { value: void 0 })), (r = M({}, r, { value: void 0 })), (i = []);
                                break;
                            case "textarea":
                                (a = re(e, a)), (r = re(e, r)), (i = []);
                                break;
                            default:
                                "function" !== typeof a.onClick && "function" === typeof r.onClick && (e.onclick = Jr);
                        }
                        for (c in (ye(n, r), (n = null), a))
                            if (!r.hasOwnProperty(c) && a.hasOwnProperty(c) && null != a[c])
                                if ("style" === c) {
                                    var s = a[c];
                                    for (o in s) s.hasOwnProperty(o) && (n || (n = {}), (n[o] = ""));
                                } else
                                    "dangerouslySetInnerHTML" !== c &&
                                        "children" !== c &&
                                        "suppressContentEditableWarning" !== c &&
                                        "suppressHydrationWarning" !== c &&
                                        "autoFocus" !== c &&
                                        (l.hasOwnProperty(c) ? i || (i = []) : (i = i || []).push(c, null));
                        for (c in r) {
                            var u = r[c];
                            if (((s = null != a ? a[c] : void 0), r.hasOwnProperty(c) && u !== s && (null != u || null != s)))
                                if ("style" === c)
                                    if (s) {
                                        for (o in s) !s.hasOwnProperty(o) || (u && u.hasOwnProperty(o)) || (n || (n = {}), (n[o] = ""));
                                        for (o in u) u.hasOwnProperty(o) && s[o] !== u[o] && (n || (n = {}), (n[o] = u[o]));
                                    } else n || (i || (i = []), i.push(c, n)), (n = u);
                                else
                                    "dangerouslySetInnerHTML" === c
                                        ? ((u = u ? u.__html : void 0), (s = s ? s.__html : void 0), null != u && s !== u && (i = i || []).push(c, u))
                                        : "children" === c
                                            ? ("string" !== typeof u && "number" !== typeof u) || (i = i || []).push(c, "" + u)
                                            : "suppressContentEditableWarning" !== c &&
                                            "suppressHydrationWarning" !== c &&
                                            (l.hasOwnProperty(c) ? (null != u && "onScroll" === c && zr("scroll", e), i || s === u || (i = [])) : (i = i || []).push(c, u));
                        }
                        n && (i = i || []).push("style", n);
                        var c = i;
                        (t.updateQueue = c) && (t.flags |= 4);
                    }
                }),
                (_l = function (e, t, n, r) {
                    n !== r && (t.flags |= 4);
                });
            var Kl = !1,
                Zl = !1,
                Xl = "function" === typeof WeakSet ? WeakSet : Set,
                Jl = null;
            function es(e, t) {
                var n = e.ref;
                if (null !== n)
                    if ("function" === typeof n)
                        try {
                            n(null);
                        } catch (r) {
                            Su(e, t, r);
                        }
                    else n.current = null;
            }
            function ts(e, t, n) {
                try {
                    n();
                } catch (r) {
                    Su(e, t, r);
                }
            }
            var ns = !1;
            function rs(e, t, n) {
                var r = t.updateQueue;
                if (null !== (r = null !== r ? r.lastEffect : null)) {
                    var a = (r = r.next);
                    do {
                        if ((a.tag & e) === e) {
                            var o = a.destroy;
                            (a.destroy = void 0), void 0 !== o && ts(t, n, o);
                        }
                        a = a.next;
                    } while (a !== r);
                }
            }
            function as(e, t) {
                if (null !== (t = null !== (t = t.updateQueue) ? t.lastEffect : null)) {
                    var n = (t = t.next);
                    do {
                        if ((n.tag & e) === e) {
                            var r = n.create;
                            n.destroy = r();
                        }
                        n = n.next;
                    } while (n !== t);
                }
            }
            function os(e) {
                var t = e.ref;
                if (null !== t) {
                    var n = e.stateNode;
                    e.tag, (e = n), "function" === typeof t ? t(e) : (t.current = e);
                }
            }
            function is(e) {
                var t = e.alternate;
                null !== t && ((e.alternate = null), is(t)),
                    (e.child = null),
                    (e.deletions = null),
                    (e.sibling = null),
                    5 === e.tag && null !== (t = e.stateNode) && (delete t[fa], delete t[ha], delete t[ma], delete t[va], delete t[ga]),
                    (e.stateNode = null),
                    (e.return = null),
                    (e.dependencies = null),
                    (e.memoizedProps = null),
                    (e.memoizedState = null),
                    (e.pendingProps = null),
                    (e.stateNode = null),
                    (e.updateQueue = null);
            }
            function ls(e) {
                return 5 === e.tag || 3 === e.tag || 4 === e.tag;
            }
            function ss(e) {
                e: for (; ;) {
                    for (; null === e.sibling;) {
                        if (null === e.return || ls(e.return)) return null;
                        e = e.return;
                    }
                    for (e.sibling.return = e.return, e = e.sibling; 5 !== e.tag && 6 !== e.tag && 18 !== e.tag;) {
                        if (2 & e.flags) continue e;
                        if (null === e.child || 4 === e.tag) continue e;
                        (e.child.return = e), (e = e.child);
                    }
                    if (!(2 & e.flags)) return e.stateNode;
                }
            }
            function us(e, t, n) {
                var r = e.tag;
                if (5 === r || 6 === r)
                    (e = e.stateNode),
                        t
                            ? 8 === n.nodeType
                                ? n.parentNode.insertBefore(e, t)
                                : n.insertBefore(e, t)
                            : (8 === n.nodeType ? (t = n.parentNode).insertBefore(e, n) : (t = n).appendChild(e), (null !== (n = n._reactRootContainer) && void 0 !== n) || null !== t.onclick || (t.onclick = Jr));
                else if (4 !== r && null !== (e = e.child)) for (us(e, t, n), e = e.sibling; null !== e;) us(e, t, n), (e = e.sibling);
            }
            function cs(e, t, n) {
                var r = e.tag;
                if (5 === r || 6 === r) (e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e);
                else if (4 !== r && null !== (e = e.child)) for (cs(e, t, n), e = e.sibling; null !== e;) cs(e, t, n), (e = e.sibling);
            }
            var ds = null,
                fs = !1;
            function hs(e, t, n) {
                for (n = n.child; null !== n;) ps(e, t, n), (n = n.sibling);
            }
            function ps(e, t, n) {
                if (ot && "function" === typeof ot.onCommitFiberUnmount)
                    try {
                        ot.onCommitFiberUnmount(at, n);
                    } catch (l) { }
                switch (n.tag) {
                    case 5:
                        Zl || es(n, t);
                    case 6:
                        var r = ds,
                            a = fs;
                        (ds = null), hs(e, t, n), (fs = a), null !== (ds = r) && (fs ? ((e = ds), (n = n.stateNode), 8 === e.nodeType ? e.parentNode.removeChild(n) : e.removeChild(n)) : ds.removeChild(n.stateNode));
                        break;
                    case 18:
                        null !== ds && (fs ? ((e = ds), (n = n.stateNode), 8 === e.nodeType ? sa(e.parentNode, n) : 1 === e.nodeType && sa(e, n), Wt(e)) : sa(ds, n.stateNode));
                        break;
                    case 4:
                        (r = ds), (a = fs), (ds = n.stateNode.containerInfo), (fs = !0), hs(e, t, n), (ds = r), (fs = a);
                        break;
                    case 0:
                    case 11:
                    case 14:
                    case 15:
                        if (!Zl && null !== (r = n.updateQueue) && null !== (r = r.lastEffect)) {
                            a = r = r.next;
                            do {
                                var o = a,
                                    i = o.destroy;
                                (o = o.tag), void 0 !== i && (0 !== (2 & o) || 0 !== (4 & o)) && ts(n, t, i), (a = a.next);
                            } while (a !== r);
                        }
                        hs(e, t, n);
                        break;
                    case 1:
                        if (!Zl && (es(n, t), "function" === typeof (r = n.stateNode).componentWillUnmount))
                            try {
                                (r.props = n.memoizedProps), (r.state = n.memoizedState), r.componentWillUnmount();
                            } catch (l) {
                                Su(n, t, l);
                            }
                        hs(e, t, n);
                        break;
                    case 21:
                        hs(e, t, n);
                        break;
                    case 22:
                        1 & n.mode ? ((Zl = (r = Zl) || null !== n.memoizedState), hs(e, t, n), (Zl = r)) : hs(e, t, n);
                        break;
                    default:
                        hs(e, t, n);
                }
            }
            function ms(e) {
                var t = e.updateQueue;
                if (null !== t) {
                    e.updateQueue = null;
                    var n = e.stateNode;
                    null === n && (n = e.stateNode = new Xl()),
                        t.forEach(function (t) {
                            var r = Tu.bind(null, e, t);
                            n.has(t) || (n.add(t), t.then(r, r));
                        });
                }
            }
            function vs(e, t) {
                var n = t.deletions;
                if (null !== n)
                    for (var r = 0; r < n.length; r++) {
                        var a = n[r];
                        try {
                            var i = e,
                                l = t,
                                s = l;
                            e: for (; null !== s;) {
                                switch (s.tag) {
                                    case 5:
                                        (ds = s.stateNode), (fs = !1);
                                        break e;
                                    case 3:
                                    case 4:
                                        (ds = s.stateNode.containerInfo), (fs = !0);
                                        break e;
                                }
                                s = s.return;
                            }
                            if (null === ds) throw Error(o(160));
                            ps(i, l, a), (ds = null), (fs = !1);
                            var u = a.alternate;
                            null !== u && (u.return = null), (a.return = null);
                        } catch (c) {
                            Su(a, t, c);
                        }
                    }
                if (12854 & t.subtreeFlags) for (t = t.child; null !== t;) gs(t, e), (t = t.sibling);
            }
            function gs(e, t) {
                var n = e.alternate,
                    r = e.flags;
                switch (e.tag) {
                    case 0:
                    case 11:
                    case 14:
                    case 15:
                        if ((vs(t, e), ys(e), 4 & r)) {
                            try {
                                rs(3, e, e.return), as(3, e);
                            } catch (v) {
                                Su(e, e.return, v);
                            }
                            try {
                                rs(5, e, e.return);
                            } catch (v) {
                                Su(e, e.return, v);
                            }
                        }
                        break;
                    case 1:
                        vs(t, e), ys(e), 512 & r && null !== n && es(n, n.return);
                        break;
                    case 5:
                        if ((vs(t, e), ys(e), 512 & r && null !== n && es(n, n.return), 32 & e.flags)) {
                            var a = e.stateNode;
                            try {
                                fe(a, "");
                            } catch (v) {
                                Su(e, e.return, v);
                            }
                        }
                        if (4 & r && null != (a = e.stateNode)) {
                            var i = e.memoizedProps,
                                l = null !== n ? n.memoizedProps : i,
                                s = e.type,
                                u = e.updateQueue;
                            if (((e.updateQueue = null), null !== u))
                                try {
                                    "input" === s && "radio" === i.type && null != i.name && Z(a, i), be(s, l);
                                    var c = be(s, i);
                                    for (l = 0; l < u.length; l += 2) {
                                        var d = u[l],
                                            f = u[l + 1];
                                        "style" === d ? ve(a, f) : "dangerouslySetInnerHTML" === d ? de(a, f) : "children" === d ? fe(a, f) : b(a, d, f, c);
                                    }
                                    switch (s) {
                                        case "input":
                                            X(a, i);
                                            break;
                                        case "textarea":
                                            oe(a, i);
                                            break;
                                        case "select":
                                            var h = a._wrapperState.wasMultiple;
                                            a._wrapperState.wasMultiple = !!i.multiple;
                                            var p = i.value;
                                            null != p ? ne(a, !!i.multiple, p, !1) : h !== !!i.multiple && (null != i.defaultValue ? ne(a, !!i.multiple, i.defaultValue, !0) : ne(a, !!i.multiple, i.multiple ? [] : "", !1));
                                    }
                                    a[ha] = i;
                                } catch (v) {
                                    Su(e, e.return, v);
                                }
                        }
                        break;
                    case 6:
                        if ((vs(t, e), ys(e), 4 & r)) {
                            if (null === e.stateNode) throw Error(o(162));
                            (a = e.stateNode), (i = e.memoizedProps);
                            try {
                                a.nodeValue = i;
                            } catch (v) {
                                Su(e, e.return, v);
                            }
                        }
                        break;
                    case 3:
                        if ((vs(t, e), ys(e), 4 & r && null !== n && n.memoizedState.isDehydrated))
                            try {
                                Wt(t.containerInfo);
                            } catch (v) {
                                Su(e, e.return, v);
                            }
                        break;
                    case 4:
                    default:
                        vs(t, e), ys(e);
                        break;
                    case 13:
                        vs(t, e), ys(e), 8192 & (a = e.child).flags && ((i = null !== a.memoizedState), (a.stateNode.isHidden = i), !i || (null !== a.alternate && null !== a.alternate.memoizedState) || (Ws = Ze())), 4 & r && ms(e);
                        break;
                    case 22:
                        if (((d = null !== n && null !== n.memoizedState), 1 & e.mode ? ((Zl = (c = Zl) || d), vs(t, e), (Zl = c)) : vs(t, e), ys(e), 8192 & r)) {
                            if (((c = null !== e.memoizedState), (e.stateNode.isHidden = c) && !d && 0 !== (1 & e.mode)))
                                for (Jl = e, d = e.child; null !== d;) {
                                    for (f = Jl = d; null !== Jl;) {
                                        switch (((p = (h = Jl).child), h.tag)) {
                                            case 0:
                                            case 11:
                                            case 14:
                                            case 15:
                                                rs(4, h, h.return);
                                                break;
                                            case 1:
                                                es(h, h.return);
                                                var m = h.stateNode;
                                                if ("function" === typeof m.componentWillUnmount) {
                                                    (r = h), (n = h.return);
                                                    try {
                                                        (t = r), (m.props = t.memoizedProps), (m.state = t.memoizedState), m.componentWillUnmount();
                                                    } catch (v) {
                                                        Su(r, n, v);
                                                    }
                                                }
                                                break;
                                            case 5:
                                                es(h, h.return);
                                                break;
                                            case 22:
                                                if (null !== h.memoizedState) {
                                                    ks(f);
                                                    continue;
                                                }
                                        }
                                        null !== p ? ((p.return = h), (Jl = p)) : ks(f);
                                    }
                                    d = d.sibling;
                                }
                            e: for (d = null, f = e; ;) {
                                if (5 === f.tag) {
                                    if (null === d) {
                                        d = f;
                                        try {
                                            (a = f.stateNode),
                                                c
                                                    ? "function" === typeof (i = a.style).setProperty
                                                        ? i.setProperty("display", "none", "important")
                                                        : (i.display = "none")
                                                    : ((s = f.stateNode), (l = void 0 !== (u = f.memoizedProps.style) && null !== u && u.hasOwnProperty("display") ? u.display : null), (s.style.display = me("display", l)));
                                        } catch (v) {
                                            Su(e, e.return, v);
                                        }
                                    }
                                } else if (6 === f.tag) {
                                    if (null === d)
                                        try {
                                            f.stateNode.nodeValue = c ? "" : f.memoizedProps;
                                        } catch (v) {
                                            Su(e, e.return, v);
                                        }
                                } else if (((22 !== f.tag && 23 !== f.tag) || null === f.memoizedState || f === e) && null !== f.child) {
                                    (f.child.return = f), (f = f.child);
                                    continue;
                                }
                                if (f === e) break e;
                                for (; null === f.sibling;) {
                                    if (null === f.return || f.return === e) break e;
                                    d === f && (d = null), (f = f.return);
                                }
                                d === f && (d = null), (f.sibling.return = f.return), (f = f.sibling);
                            }
                        }
                        break;
                    case 19:
                        vs(t, e), ys(e), 4 & r && ms(e);
                    case 21:
                }
            }
            function ys(e) {
                var t = e.flags;
                if (2 & t) {
                    try {
                        e: {
                            for (var n = e.return; null !== n;) {
                                if (ls(n)) {
                                    var r = n;
                                    break e;
                                }
                                n = n.return;
                            }
                            throw Error(o(160));
                        }
                        switch (r.tag) {
                            case 5:
                                var a = r.stateNode;
                                32 & r.flags && (fe(a, ""), (r.flags &= -33)), cs(e, ss(e), a);
                                break;
                            case 3:
                            case 4:
                                var i = r.stateNode.containerInfo;
                                us(e, ss(e), i);
                                break;
                            default:
                                throw Error(o(161));
                        }
                    } catch (l) {
                        Su(e, e.return, l);
                    }
                    e.flags &= -3;
                }
                4096 & t && (e.flags &= -4097);
            }
            function bs(e, t, n) {
                (Jl = e), xs(e, t, n);
            }
            function xs(e, t, n) {
                for (var r = 0 !== (1 & e.mode); null !== Jl;) {
                    var a = Jl,
                        o = a.child;
                    if (22 === a.tag && r) {
                        var i = null !== a.memoizedState || Kl;
                        if (!i) {
                            var l = a.alternate,
                                s = (null !== l && null !== l.memoizedState) || Zl;
                            l = Kl;
                            var u = Zl;
                            if (((Kl = i), (Zl = s) && !u)) for (Jl = a; null !== Jl;) (s = (i = Jl).child), 22 === i.tag && null !== i.memoizedState ? Cs(a) : null !== s ? ((s.return = i), (Jl = s)) : Cs(a);
                            for (; null !== o;) (Jl = o), xs(o, t, n), (o = o.sibling);
                            (Jl = a), (Kl = l), (Zl = u);
                        }
                        ws(e);
                    } else 0 !== (8772 & a.subtreeFlags) && null !== o ? ((o.return = a), (Jl = o)) : ws(e);
                }
            }
            function ws(e) {
                for (; null !== Jl;) {
                    var t = Jl;
                    if (0 !== (8772 & t.flags)) {
                        var n = t.alternate;
                        try {
                            if (0 !== (8772 & t.flags))
                                switch (t.tag) {
                                    case 0:
                                    case 11:
                                    case 15:
                                        Zl || as(5, t);
                                        break;
                                    case 1:
                                        var r = t.stateNode;
                                        if (4 & t.flags && !Zl)
                                            if (null === n) r.componentDidMount();
                                            else {
                                                var a = t.elementType === t.type ? n.memoizedProps : go(t.type, n.memoizedProps);
                                                r.componentDidUpdate(a, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
                                            }
                                        var i = t.updateQueue;
                                        null !== i && zo(t, i, r);
                                        break;
                                    case 3:
                                        var l = t.updateQueue;
                                        if (null !== l) {
                                            if (((n = null), null !== t.child))
                                                switch (t.child.tag) {
                                                    case 5:
                                                    case 1:
                                                        n = t.child.stateNode;
                                                }
                                            zo(t, l, n);
                                        }
                                        break;
                                    case 5:
                                        var s = t.stateNode;
                                        if (null === n && 4 & t.flags) {
                                            n = s;
                                            var u = t.memoizedProps;
                                            switch (t.type) {
                                                case "button":
                                                case "input":
                                                case "select":
                                                case "textarea":
                                                    u.autoFocus && n.focus();
                                                    break;
                                                case "img":
                                                    u.src && (n.src = u.src);
                                            }
                                        }
                                        break;
                                    case 6:
                                    case 4:
                                    case 12:
                                    case 19:
                                    case 17:
                                    case 21:
                                    case 22:
                                    case 23:
                                    case 25:
                                        break;
                                    case 13:
                                        if (null === t.memoizedState) {
                                            var c = t.alternate;
                                            if (null !== c) {
                                                var d = c.memoizedState;
                                                if (null !== d) {
                                                    var f = d.dehydrated;
                                                    null !== f && Wt(f);
                                                }
                                            }
                                        }
                                        break;
                                    default:
                                        throw Error(o(163));
                                }
                            Zl || (512 & t.flags && os(t));
                        } catch (h) {
                            Su(t, t.return, h);
                        }
                    }
                    if (t === e) {
                        Jl = null;
                        break;
                    }
                    if (null !== (n = t.sibling)) {
                        (n.return = t.return), (Jl = n);
                        break;
                    }
                    Jl = t.return;
                }
            }
            function ks(e) {
                for (; null !== Jl;) {
                    var t = Jl;
                    if (t === e) {
                        Jl = null;
                        break;
                    }
                    var n = t.sibling;
                    if (null !== n) {
                        (n.return = t.return), (Jl = n);
                        break;
                    }
                    Jl = t.return;
                }
            }
            function Cs(e) {
                for (; null !== Jl;) {
                    var t = Jl;
                    try {
                        switch (t.tag) {
                            case 0:
                            case 11:
                            case 15:
                                var n = t.return;
                                try {
                                    as(4, t);
                                } catch (s) {
                                    Su(t, n, s);
                                }
                                break;
                            case 1:
                                var r = t.stateNode;
                                if ("function" === typeof r.componentDidMount) {
                                    var a = t.return;
                                    try {
                                        r.componentDidMount();
                                    } catch (s) {
                                        Su(t, a, s);
                                    }
                                }
                                var o = t.return;
                                try {
                                    os(t);
                                } catch (s) {
                                    Su(t, o, s);
                                }
                                break;
                            case 5:
                                var i = t.return;
                                try {
                                    os(t);
                                } catch (s) {
                                    Su(t, i, s);
                                }
                        }
                    } catch (s) {
                        Su(t, t.return, s);
                    }
                    if (t === e) {
                        Jl = null;
                        break;
                    }
                    var l = t.sibling;
                    if (null !== l) {
                        (l.return = t.return), (Jl = l);
                        break;
                    }
                    Jl = t.return;
                }
            }
            var js,
                Ss = Math.ceil,
                Es = x.ReactCurrentDispatcher,
                Ns = x.ReactCurrentOwner,
                Ps = x.ReactCurrentBatchConfig,
                Ts = 0,
                Os = null,
                Rs = null,
                As = 0,
                Ls = 0,
                Is = ja(0),
                _s = 0,
                Ds = null,
                Ms = 0,
                Fs = 0,
                zs = 0,
                Us = null,
                Bs = null,
                Ws = 0,
                Vs = 1 / 0,
                Hs = null,
                qs = !1,
                $s = null,
                Gs = null,
                Qs = !1,
                Ys = null,
                Ks = 0,
                Zs = 0,
                Xs = null,
                Js = -1,
                eu = 0;
            function tu() {
                return 0 !== (6 & Ts) ? Ze() : -1 !== Js ? Js : (Js = Ze());
            }
            function nu(e) {
                return 0 === (1 & e.mode) ? 1 : 0 !== (2 & Ts) && 0 !== As ? As & -As : null !== vo.transition ? (0 === eu && (eu = mt()), eu) : 0 !== (e = bt) ? e : (e = void 0 === (e = window.event) ? 16 : Kt(e.type));
            }
            function ru(e, t, n, r) {
                if (50 < Zs) throw ((Zs = 0), (Xs = null), Error(o(185)));
                gt(e, n, r), (0 !== (2 & Ts) && e === Os) || (e === Os && (0 === (2 & Ts) && (Fs |= n), 4 === _s && su(e, As)), au(e, r), 1 === n && 0 === Ts && 0 === (1 & t.mode) && ((Vs = Ze() + 500), za && Wa()));
            }
            function au(e, t) {
                var n = e.callbackNode;
                !(function (e, t) {
                    for (var n = e.suspendedLanes, r = e.pingedLanes, a = e.expirationTimes, o = e.pendingLanes; 0 < o;) {
                        var i = 31 - it(o),
                            l = 1 << i,
                            s = a[i];
                        -1 === s ? (0 !== (l & n) && 0 === (l & r)) || (a[i] = ht(l, t)) : s <= t && (e.expiredLanes |= l), (o &= ~l);
                    }
                })(e, t);
                var r = ft(e, e === Os ? As : 0);
                if (0 === r) null !== n && Qe(n), (e.callbackNode = null), (e.callbackPriority = 0);
                else if (((t = r & -r), e.callbackPriority !== t)) {
                    if ((null != n && Qe(n), 1 === t))
                        0 === e.tag
                            ? (function (e) {
                                (za = !0), Ba(e);
                            })(uu.bind(null, e))
                            : Ba(uu.bind(null, e)),
                            ia(function () {
                                0 === (6 & Ts) && Wa();
                            }),
                            (n = null);
                    else {
                        switch (xt(r)) {
                            case 1:
                                n = Je;
                                break;
                            case 4:
                                n = et;
                                break;
                            case 16:
                            default:
                                n = tt;
                                break;
                            case 536870912:
                                n = rt;
                        }
                        n = Ou(n, ou.bind(null, e));
                    }
                    (e.callbackPriority = t), (e.callbackNode = n);
                }
            }
            function ou(e, t) {
                if (((Js = -1), (eu = 0), 0 !== (6 & Ts))) throw Error(o(327));
                var n = e.callbackNode;
                if (Cu() && e.callbackNode !== n) return null;
                var r = ft(e, e === Os ? As : 0);
                if (0 === r) return null;
                if (0 !== (30 & r) || 0 !== (r & e.expiredLanes) || t) t = gu(e, r);
                else {
                    t = r;
                    var a = Ts;
                    Ts |= 2;
                    var i = mu();
                    for ((Os === e && As === t) || ((Hs = null), (Vs = Ze() + 500), hu(e, t)); ;)
                        try {
                            bu();
                            break;
                        } catch (s) {
                            pu(e, s);
                        }
                    ko(), (Es.current = i), (Ts = a), null !== Rs ? (t = 0) : ((Os = null), (As = 0), (t = _s));
                }
                if (0 !== t) {
                    if ((2 === t && 0 !== (a = pt(e)) && ((r = a), (t = iu(e, a))), 1 === t)) throw ((n = Ds), hu(e, 0), su(e, r), au(e, Ze()), n);
                    if (6 === t) su(e, r);
                    else {
                        if (
                            ((a = e.current.alternate),
                                0 === (30 & r) &&
                                !(function (e) {
                                    for (var t = e; ;) {
                                        if (16384 & t.flags) {
                                            var n = t.updateQueue;
                                            if (null !== n && null !== (n = n.stores))
                                                for (var r = 0; r < n.length; r++) {
                                                    var a = n[r],
                                                        o = a.getSnapshot;
                                                    a = a.value;
                                                    try {
                                                        if (!lr(o(), a)) return !1;
                                                    } catch (l) {
                                                        return !1;
                                                    }
                                                }
                                        }
                                        if (((n = t.child), 16384 & t.subtreeFlags && null !== n)) (n.return = t), (t = n);
                                        else {
                                            if (t === e) break;
                                            for (; null === t.sibling;) {
                                                if (null === t.return || t.return === e) return !0;
                                                t = t.return;
                                            }
                                            (t.sibling.return = t.return), (t = t.sibling);
                                        }
                                    }
                                    return !0;
                                })(a) &&
                                (2 === (t = gu(e, r)) && 0 !== (i = pt(e)) && ((r = i), (t = iu(e, i))), 1 === t))
                        )
                            throw ((n = Ds), hu(e, 0), su(e, r), au(e, Ze()), n);
                        switch (((e.finishedWork = a), (e.finishedLanes = r), t)) {
                            case 0:
                            case 1:
                                throw Error(o(345));
                            case 2:
                            case 5:
                                ku(e, Bs, Hs);
                                break;
                            case 3:
                                if ((su(e, r), (130023424 & r) === r && 10 < (t = Ws + 500 - Ze()))) {
                                    if (0 !== ft(e, 0)) break;
                                    if (((a = e.suspendedLanes) & r) !== r) {
                                        tu(), (e.pingedLanes |= e.suspendedLanes & a);
                                        break;
                                    }
                                    e.timeoutHandle = ra(ku.bind(null, e, Bs, Hs), t);
                                    break;
                                }
                                ku(e, Bs, Hs);
                                break;
                            case 4:
                                if ((su(e, r), (4194240 & r) === r)) break;
                                for (t = e.eventTimes, a = -1; 0 < r;) {
                                    var l = 31 - it(r);
                                    (i = 1 << l), (l = t[l]) > a && (a = l), (r &= ~i);
                                }
                                if (((r = a), 10 < (r = (120 > (r = Ze() - r) ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * Ss(r / 1960)) - r))) {
                                    e.timeoutHandle = ra(ku.bind(null, e, Bs, Hs), r);
                                    break;
                                }
                                ku(e, Bs, Hs);
                                break;
                            default:
                                throw Error(o(329));
                        }
                    }
                }
                return au(e, Ze()), e.callbackNode === n ? ou.bind(null, e) : null;
            }
            function iu(e, t) {
                var n = Us;
                return e.current.memoizedState.isDehydrated && (hu(e, t).flags |= 256), 2 !== (e = gu(e, t)) && ((t = Bs), (Bs = n), null !== t && lu(t)), e;
            }
            function lu(e) {
                null === Bs ? (Bs = e) : Bs.push.apply(Bs, e);
            }
            function su(e, t) {
                for (t &= ~zs, t &= ~Fs, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t;) {
                    var n = 31 - it(t),
                        r = 1 << n;
                    (e[n] = -1), (t &= ~r);
                }
            }
            function uu(e) {
                if (0 !== (6 & Ts)) throw Error(o(327));
                Cu();
                var t = ft(e, 0);
                if (0 === (1 & t)) return au(e, Ze()), null;
                var n = gu(e, t);
                if (0 !== e.tag && 2 === n) {
                    var r = pt(e);
                    0 !== r && ((t = r), (n = iu(e, r)));
                }
                if (1 === n) throw ((n = Ds), hu(e, 0), su(e, t), au(e, Ze()), n);
                if (6 === n) throw Error(o(345));
                return (e.finishedWork = e.current.alternate), (e.finishedLanes = t), ku(e, Bs, Hs), au(e, Ze()), null;
            }
            function cu(e, t) {
                var n = Ts;
                Ts |= 1;
                try {
                    return e(t);
                } finally {
                    0 === (Ts = n) && ((Vs = Ze() + 500), za && Wa());
                }
            }
            function du(e) {
                null !== Ys && 0 === Ys.tag && 0 === (6 & Ts) && Cu();
                var t = Ts;
                Ts |= 1;
                var n = Ps.transition,
                    r = bt;
                try {
                    if (((Ps.transition = null), (bt = 1), e)) return e();
                } finally {
                    (bt = r), (Ps.transition = n), 0 === (6 & (Ts = t)) && Wa();
                }
            }
            function fu() {
                (Ls = Is.current), Sa(Is);
            }
            function hu(e, t) {
                (e.finishedWork = null), (e.finishedLanes = 0);
                var n = e.timeoutHandle;
                if ((-1 !== n && ((e.timeoutHandle = -1), aa(n)), null !== Rs))
                    for (n = Rs.return; null !== n;) {
                        var r = n;
                        switch ((to(r), r.tag)) {
                            case 1:
                                null !== (r = r.type.childContextTypes) && void 0 !== r && La();
                                break;
                            case 3:
                                oi(), Sa(Ta), Sa(Pa), di();
                                break;
                            case 5:
                                li(r);
                                break;
                            case 4:
                                oi();
                                break;
                            case 13:
                            case 19:
                                Sa(si);
                                break;
                            case 10:
                                Co(r.type._context);
                                break;
                            case 22:
                            case 23:
                                fu();
                        }
                        n = n.return;
                    }
                if (((Os = e), (Rs = e = Iu(e.current, null)), (As = Ls = t), (_s = 0), (Ds = null), (zs = Fs = Ms = 0), (Bs = Us = null), null !== No)) {
                    for (t = 0; t < No.length; t++)
                        if (null !== (r = (n = No[t]).interleaved)) {
                            n.interleaved = null;
                            var a = r.next,
                                o = n.pending;
                            if (null !== o) {
                                var i = o.next;
                                (o.next = a), (r.next = i);
                            }
                            n.pending = r;
                        }
                    No = null;
                }
                return e;
            }
            function pu(e, t) {
                for (; ;) {
                    var n = Rs;
                    try {
                        if ((ko(), (fi.current = il), yi)) {
                            for (var r = mi.memoizedState; null !== r;) {
                                var a = r.queue;
                                null !== a && (a.pending = null), (r = r.next);
                            }
                            yi = !1;
                        }
                        if (((pi = 0), (gi = vi = mi = null), (bi = !1), (xi = 0), (Ns.current = null), null === n || null === n.return)) {
                            (_s = 1), (Ds = t), (Rs = null);
                            break;
                        }
                        e: {
                            var i = e,
                                l = n.return,
                                s = n,
                                u = t;
                            if (((t = As), (s.flags |= 32768), null !== u && "object" === typeof u && "function" === typeof u.then)) {
                                var c = u,
                                    d = s,
                                    f = d.tag;
                                if (0 === (1 & d.mode) && (0 === f || 11 === f || 15 === f)) {
                                    var h = d.alternate;
                                    h ? ((d.updateQueue = h.updateQueue), (d.memoizedState = h.memoizedState), (d.lanes = h.lanes)) : ((d.updateQueue = null), (d.memoizedState = null));
                                }
                                var p = gl(l);
                                if (null !== p) {
                                    (p.flags &= -257), yl(p, l, s, 0, t), 1 & p.mode && vl(i, c, t), (u = c);
                                    var m = (t = p).updateQueue;
                                    if (null === m) {
                                        var v = new Set();
                                        v.add(u), (t.updateQueue = v);
                                    } else m.add(u);
                                    break e;
                                }
                                if (0 === (1 & t)) {
                                    vl(i, c, t), vu();
                                    break e;
                                }
                                u = Error(o(426));
                            } else if (ao && 1 & s.mode) {
                                var g = gl(l);
                                if (null !== g) {
                                    0 === (65536 & g.flags) && (g.flags |= 256), yl(g, l, s, 0, t), mo(cl(u, s));
                                    break e;
                                }
                            }
                            (i = u = cl(u, s)), 4 !== _s && (_s = 2), null === Us ? (Us = [i]) : Us.push(i), (i = l);
                            do {
                                switch (i.tag) {
                                    case 3:
                                        (i.flags |= 65536), (t &= -t), (i.lanes |= t), Mo(i, pl(0, u, t));
                                        break e;
                                    case 1:
                                        s = u;
                                        var y = i.type,
                                            b = i.stateNode;
                                        if (0 === (128 & i.flags) && ("function" === typeof y.getDerivedStateFromError || (null !== b && "function" === typeof b.componentDidCatch && (null === Gs || !Gs.has(b))))) {
                                            (i.flags |= 65536), (t &= -t), (i.lanes |= t), Mo(i, ml(i, s, t));
                                            break e;
                                        }
                                }
                                i = i.return;
                            } while (null !== i);
                        }
                        wu(n);
                    } catch (x) {
                        (t = x), Rs === n && null !== n && (Rs = n = n.return);
                        continue;
                    }
                    break;
                }
            }
            function mu() {
                var e = Es.current;
                return (Es.current = il), null === e ? il : e;
            }
            function vu() {
                (0 !== _s && 3 !== _s && 2 !== _s) || (_s = 4), null === Os || (0 === (268435455 & Ms) && 0 === (268435455 & Fs)) || su(Os, As);
            }
            function gu(e, t) {
                var n = Ts;
                Ts |= 2;
                var r = mu();
                for ((Os === e && As === t) || ((Hs = null), hu(e, t)); ;)
                    try {
                        yu();
                        break;
                    } catch (a) {
                        pu(e, a);
                    }
                if ((ko(), (Ts = n), (Es.current = r), null !== Rs)) throw Error(o(261));
                return (Os = null), (As = 0), _s;
            }
            function yu() {
                for (; null !== Rs;) xu(Rs);
            }
            function bu() {
                for (; null !== Rs && !Ye();) xu(Rs);
            }
            function xu(e) {
                var t = js(e.alternate, e, Ls);
                (e.memoizedProps = e.pendingProps), null === t ? wu(e) : (Rs = t), (Ns.current = null);
            }
            function wu(e) {
                var t = e;
                do {
                    var n = t.alternate;
                    if (((e = t.return), 0 === (32768 & t.flags))) {
                        if (null !== (n = Ql(n, t, Ls))) return void (Rs = n);
                    } else {
                        if (null !== (n = Yl(n, t))) return (n.flags &= 32767), void (Rs = n);
                        if (null === e) return (_s = 6), void (Rs = null);
                        (e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null);
                    }
                    if (null !== (t = t.sibling)) return void (Rs = t);
                    Rs = t = e;
                } while (null !== t);
                0 === _s && (_s = 5);
            }
            function ku(e, t, n) {
                var r = bt,
                    a = Ps.transition;
                try {
                    (Ps.transition = null),
                        (bt = 1),
                        (function (e, t, n, r) {
                            do {
                                Cu();
                            } while (null !== Ys);
                            if (0 !== (6 & Ts)) throw Error(o(327));
                            n = e.finishedWork;
                            var a = e.finishedLanes;
                            if (null === n) return null;
                            if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current)) throw Error(o(177));
                            (e.callbackNode = null), (e.callbackPriority = 0);
                            var i = n.lanes | n.childLanes;
                            if (
                                ((function (e, t) {
                                    var n = e.pendingLanes & ~t;
                                    (e.pendingLanes = t), (e.suspendedLanes = 0), (e.pingedLanes = 0), (e.expiredLanes &= t), (e.mutableReadLanes &= t), (e.entangledLanes &= t), (t = e.entanglements);
                                    var r = e.eventTimes;
                                    for (e = e.expirationTimes; 0 < n;) {
                                        var a = 31 - it(n),
                                            o = 1 << a;
                                        (t[a] = 0), (r[a] = -1), (e[a] = -1), (n &= ~o);
                                    }
                                })(e, i),
                                    e === Os && ((Rs = Os = null), (As = 0)),
                                    (0 === (2064 & n.subtreeFlags) && 0 === (2064 & n.flags)) ||
                                    Qs ||
                                    ((Qs = !0),
                                        Ou(tt, function () {
                                            return Cu(), null;
                                        })),
                                    (i = 0 !== (15990 & n.flags)),
                                    0 !== (15990 & n.subtreeFlags) || i)
                            ) {
                                (i = Ps.transition), (Ps.transition = null);
                                var l = bt;
                                bt = 1;
                                var s = Ts;
                                (Ts |= 4),
                                    (Ns.current = null),
                                    (function (e, t) {
                                        if (((ea = Ht), hr((e = fr())))) {
                                            if ("selectionStart" in e) var n = { start: e.selectionStart, end: e.selectionEnd };
                                            else
                                                e: {
                                                    var r = (n = ((n = e.ownerDocument) && n.defaultView) || window).getSelection && n.getSelection();
                                                    if (r && 0 !== r.rangeCount) {
                                                        n = r.anchorNode;
                                                        var a = r.anchorOffset,
                                                            i = r.focusNode;
                                                        r = r.focusOffset;
                                                        try {
                                                            n.nodeType, i.nodeType;
                                                        } catch (w) {
                                                            n = null;
                                                            break e;
                                                        }
                                                        var l = 0,
                                                            s = -1,
                                                            u = -1,
                                                            c = 0,
                                                            d = 0,
                                                            f = e,
                                                            h = null;
                                                        t: for (; ;) {
                                                            for (
                                                                var p;
                                                                f !== n || (0 !== a && 3 !== f.nodeType) || (s = l + a),
                                                                f !== i || (0 !== r && 3 !== f.nodeType) || (u = l + r),
                                                                3 === f.nodeType && (l += f.nodeValue.length),
                                                                null !== (p = f.firstChild);

                                                            )
                                                                (h = f), (f = p);
                                                            for (; ;) {
                                                                if (f === e) break t;
                                                                if ((h === n && ++c === a && (s = l), h === i && ++d === r && (u = l), null !== (p = f.nextSibling))) break;
                                                                h = (f = h).parentNode;
                                                            }
                                                            f = p;
                                                        }
                                                        n = -1 === s || -1 === u ? null : { start: s, end: u };
                                                    } else n = null;
                                                }
                                            n = n || { start: 0, end: 0 };
                                        } else n = null;
                                        for (ta = { focusedElem: e, selectionRange: n }, Ht = !1, Jl = t; null !== Jl;)
                                            if (((e = (t = Jl).child), 0 !== (1028 & t.subtreeFlags) && null !== e)) (e.return = t), (Jl = e);
                                            else
                                                for (; null !== Jl;) {
                                                    t = Jl;
                                                    try {
                                                        var m = t.alternate;
                                                        if (0 !== (1024 & t.flags))
                                                            switch (t.tag) {
                                                                case 0:
                                                                case 11:
                                                                case 15:
                                                                case 5:
                                                                case 6:
                                                                case 4:
                                                                case 17:
                                                                    break;
                                                                case 1:
                                                                    if (null !== m) {
                                                                        var v = m.memoizedProps,
                                                                            g = m.memoizedState,
                                                                            y = t.stateNode,
                                                                            b = y.getSnapshotBeforeUpdate(t.elementType === t.type ? v : go(t.type, v), g);
                                                                        y.__reactInternalSnapshotBeforeUpdate = b;
                                                                    }
                                                                    break;
                                                                case 3:
                                                                    var x = t.stateNode.containerInfo;
                                                                    1 === x.nodeType ? (x.textContent = "") : 9 === x.nodeType && x.documentElement && x.removeChild(x.documentElement);
                                                                    break;
                                                                default:
                                                                    throw Error(o(163));
                                                            }
                                                    } catch (w) {
                                                        Su(t, t.return, w);
                                                    }
                                                    if (null !== (e = t.sibling)) {
                                                        (e.return = t.return), (Jl = e);
                                                        break;
                                                    }
                                                    Jl = t.return;
                                                }
                                        (m = ns), (ns = !1);
                                    })(e, n),
                                    gs(n, e),
                                    pr(ta),
                                    (Ht = !!ea),
                                    (ta = ea = null),
                                    (e.current = n),
                                    bs(n, e, a),
                                    Ke(),
                                    (Ts = s),
                                    (bt = l),
                                    (Ps.transition = i);
                            } else e.current = n;
                            if (
                                (Qs && ((Qs = !1), (Ys = e), (Ks = a)),
                                    (i = e.pendingLanes),
                                    0 === i && (Gs = null),
                                    (function (e) {
                                        if (ot && "function" === typeof ot.onCommitFiberRoot)
                                            try {
                                                ot.onCommitFiberRoot(at, e, void 0, 128 === (128 & e.current.flags));
                                            } catch (t) { }
                                    })(n.stateNode),
                                    au(e, Ze()),
                                    null !== t)
                            )
                                for (r = e.onRecoverableError, n = 0; n < t.length; n++) (a = t[n]), r(a.value, { componentStack: a.stack, digest: a.digest });
                            if (qs) throw ((qs = !1), (e = $s), ($s = null), e);
                            0 !== (1 & Ks) && 0 !== e.tag && Cu(), (i = e.pendingLanes), 0 !== (1 & i) ? (e === Xs ? Zs++ : ((Zs = 0), (Xs = e))) : (Zs = 0), Wa();
                        })(e, t, n, r);
                } finally {
                    (Ps.transition = a), (bt = r);
                }
                return null;
            }
            function Cu() {
                if (null !== Ys) {
                    var e = xt(Ks),
                        t = Ps.transition,
                        n = bt;
                    try {
                        if (((Ps.transition = null), (bt = 16 > e ? 16 : e), null === Ys)) var r = !1;
                        else {
                            if (((e = Ys), (Ys = null), (Ks = 0), 0 !== (6 & Ts))) throw Error(o(331));
                            var a = Ts;
                            for (Ts |= 4, Jl = e.current; null !== Jl;) {
                                var i = Jl,
                                    l = i.child;
                                if (0 !== (16 & Jl.flags)) {
                                    var s = i.deletions;
                                    if (null !== s) {
                                        for (var u = 0; u < s.length; u++) {
                                            var c = s[u];
                                            for (Jl = c; null !== Jl;) {
                                                var d = Jl;
                                                switch (d.tag) {
                                                    case 0:
                                                    case 11:
                                                    case 15:
                                                        rs(8, d, i);
                                                }
                                                var f = d.child;
                                                if (null !== f) (f.return = d), (Jl = f);
                                                else
                                                    for (; null !== Jl;) {
                                                        var h = (d = Jl).sibling,
                                                            p = d.return;
                                                        if ((is(d), d === c)) {
                                                            Jl = null;
                                                            break;
                                                        }
                                                        if (null !== h) {
                                                            (h.return = p), (Jl = h);
                                                            break;
                                                        }
                                                        Jl = p;
                                                    }
                                            }
                                        }
                                        var m = i.alternate;
                                        if (null !== m) {
                                            var v = m.child;
                                            if (null !== v) {
                                                m.child = null;
                                                do {
                                                    var g = v.sibling;
                                                    (v.sibling = null), (v = g);
                                                } while (null !== v);
                                            }
                                        }
                                        Jl = i;
                                    }
                                }
                                if (0 !== (2064 & i.subtreeFlags) && null !== l) (l.return = i), (Jl = l);
                                else
                                    e: for (; null !== Jl;) {
                                        if (0 !== (2048 & (i = Jl).flags))
                                            switch (i.tag) {
                                                case 0:
                                                case 11:
                                                case 15:
                                                    rs(9, i, i.return);
                                            }
                                        var y = i.sibling;
                                        if (null !== y) {
                                            (y.return = i.return), (Jl = y);
                                            break e;
                                        }
                                        Jl = i.return;
                                    }
                            }
                            var b = e.current;
                            for (Jl = b; null !== Jl;) {
                                var x = (l = Jl).child;
                                if (0 !== (2064 & l.subtreeFlags) && null !== x) (x.return = l), (Jl = x);
                                else
                                    e: for (l = b; null !== Jl;) {
                                        if (0 !== (2048 & (s = Jl).flags))
                                            try {
                                                switch (s.tag) {
                                                    case 0:
                                                    case 11:
                                                    case 15:
                                                        as(9, s);
                                                }
                                            } catch (k) {
                                                Su(s, s.return, k);
                                            }
                                        if (s === l) {
                                            Jl = null;
                                            break e;
                                        }
                                        var w = s.sibling;
                                        if (null !== w) {
                                            (w.return = s.return), (Jl = w);
                                            break e;
                                        }
                                        Jl = s.return;
                                    }
                            }
                            if (((Ts = a), Wa(), ot && "function" === typeof ot.onPostCommitFiberRoot))
                                try {
                                    ot.onPostCommitFiberRoot(at, e);
                                } catch (k) { }
                            r = !0;
                        }
                        return r;
                    } finally {
                        (bt = n), (Ps.transition = t);
                    }
                }
                return !1;
            }
            function ju(e, t, n) {
                (e = _o(e, (t = pl(0, (t = cl(n, t)), 1)), 1)), (t = tu()), null !== e && (gt(e, 1, t), au(e, t));
            }
            function Su(e, t, n) {
                if (3 === e.tag) ju(e, e, n);
                else
                    for (; null !== t;) {
                        if (3 === t.tag) {
                            ju(t, e, n);
                            break;
                        }
                        if (1 === t.tag) {
                            var r = t.stateNode;
                            if ("function" === typeof t.type.getDerivedStateFromError || ("function" === typeof r.componentDidCatch && (null === Gs || !Gs.has(r)))) {
                                (t = _o(t, (e = ml(t, (e = cl(n, e)), 1)), 1)), (e = tu()), null !== t && (gt(t, 1, e), au(t, e));
                                break;
                            }
                        }
                        t = t.return;
                    }
            }
            function Eu(e, t, n) {
                var r = e.pingCache;
                null !== r && r.delete(t), (t = tu()), (e.pingedLanes |= e.suspendedLanes & n), Os === e && (As & n) === n && (4 === _s || (3 === _s && (130023424 & As) === As && 500 > Ze() - Ws) ? hu(e, 0) : (zs |= n)), au(e, t);
            }
            function Nu(e, t) {
                0 === t && (0 === (1 & e.mode) ? (t = 1) : ((t = ct), 0 === (130023424 & (ct <<= 1)) && (ct = 4194304)));
                var n = tu();
                null !== (e = Oo(e, t)) && (gt(e, t, n), au(e, n));
            }
            function Pu(e) {
                var t = e.memoizedState,
                    n = 0;
                null !== t && (n = t.retryLane), Nu(e, n);
            }
            function Tu(e, t) {
                var n = 0;
                switch (e.tag) {
                    case 13:
                        var r = e.stateNode,
                            a = e.memoizedState;
                        null !== a && (n = a.retryLane);
                        break;
                    case 19:
                        r = e.stateNode;
                        break;
                    default:
                        throw Error(o(314));
                }
                null !== r && r.delete(t), Nu(e, n);
            }
            function Ou(e, t) {
                return Ge(e, t);
            }
            function Ru(e, t, n, r) {
                (this.tag = e),
                    (this.key = n),
                    (this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null),
                    (this.index = 0),
                    (this.ref = null),
                    (this.pendingProps = t),
                    (this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null),
                    (this.mode = r),
                    (this.subtreeFlags = this.flags = 0),
                    (this.deletions = null),
                    (this.childLanes = this.lanes = 0),
                    (this.alternate = null);
            }
            function Au(e, t, n, r) {
                return new Ru(e, t, n, r);
            }
            function Lu(e) {
                return !(!(e = e.prototype) || !e.isReactComponent);
            }
            function Iu(e, t) {
                var n = e.alternate;
                return (
                    null === n
                        ? (((n = Au(e.tag, t, e.key, e.mode)).elementType = e.elementType), (n.type = e.type), (n.stateNode = e.stateNode), (n.alternate = e), (e.alternate = n))
                        : ((n.pendingProps = t), (n.type = e.type), (n.flags = 0), (n.subtreeFlags = 0), (n.deletions = null)),
                    (n.flags = 14680064 & e.flags),
                    (n.childLanes = e.childLanes),
                    (n.lanes = e.lanes),
                    (n.child = e.child),
                    (n.memoizedProps = e.memoizedProps),
                    (n.memoizedState = e.memoizedState),
                    (n.updateQueue = e.updateQueue),
                    (t = e.dependencies),
                    (n.dependencies = null === t ? null : { lanes: t.lanes, firstContext: t.firstContext }),
                    (n.sibling = e.sibling),
                    (n.index = e.index),
                    (n.ref = e.ref),
                    n
                );
            }
            function _u(e, t, n, r, a, i) {
                var l = 2;
                if (((r = e), "function" === typeof e)) Lu(e) && (l = 1);
                else if ("string" === typeof e) l = 5;
                else
                    e: switch (e) {
                        case C:
                            return Du(n.children, a, i, t);
                        case j:
                            (l = 8), (a |= 8);
                            break;
                        case S:
                            return ((e = Au(12, n, t, 2 | a)).elementType = S), (e.lanes = i), e;
                        case T:
                            return ((e = Au(13, n, t, a)).elementType = T), (e.lanes = i), e;
                        case O:
                            return ((e = Au(19, n, t, a)).elementType = O), (e.lanes = i), e;
                        case L:
                            return Mu(n, a, i, t);
                        default:
                            if ("object" === typeof e && null !== e)
                                switch (e.$$typeof) {
                                    case E:
                                        l = 10;
                                        break e;
                                    case N:
                                        l = 9;
                                        break e;
                                    case P:
                                        l = 11;
                                        break e;
                                    case R:
                                        l = 14;
                                        break e;
                                    case A:
                                        (l = 16), (r = null);
                                        break e;
                                }
                            throw Error(o(130, null == e ? e : typeof e, ""));
                    }
                return ((t = Au(l, n, t, a)).elementType = e), (t.type = r), (t.lanes = i), t;
            }
            function Du(e, t, n, r) {
                return ((e = Au(7, e, r, t)).lanes = n), e;
            }
            function Mu(e, t, n, r) {
                return ((e = Au(22, e, r, t)).elementType = L), (e.lanes = n), (e.stateNode = { isHidden: !1 }), e;
            }
            function Fu(e, t, n) {
                return ((e = Au(6, e, null, t)).lanes = n), e;
            }
            function zu(e, t, n) {
                return ((t = Au(4, null !== e.children ? e.children : [], e.key, t)).lanes = n), (t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }), t;
            }
            function Uu(e, t, n, r, a) {
                (this.tag = t),
                    (this.containerInfo = e),
                    (this.finishedWork = this.pingCache = this.current = this.pendingChildren = null),
                    (this.timeoutHandle = -1),
                    (this.callbackNode = this.pendingContext = this.context = null),
                    (this.callbackPriority = 0),
                    (this.eventTimes = vt(0)),
                    (this.expirationTimes = vt(-1)),
                    (this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0),
                    (this.entanglements = vt(0)),
                    (this.identifierPrefix = r),
                    (this.onRecoverableError = a),
                    (this.mutableSourceEagerHydrationData = null);
            }
            function Bu(e, t, n, r, a, o, i, l, s) {
                return (
                    (e = new Uu(e, t, n, l, s)),
                    1 === t ? ((t = 1), !0 === o && (t |= 8)) : (t = 0),
                    (o = Au(3, null, null, t)),
                    (e.current = o),
                    (o.stateNode = e),
                    (o.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }),
                    Ao(o),
                    e
                );
            }
            function Wu(e) {
                if (!e) return Na;
                e: {
                    if (We((e = e._reactInternals)) !== e || 1 !== e.tag) throw Error(o(170));
                    var t = e;
                    do {
                        switch (t.tag) {
                            case 3:
                                t = t.stateNode.context;
                                break e;
                            case 1:
                                if (Aa(t.type)) {
                                    t = t.stateNode.__reactInternalMemoizedMergedChildContext;
                                    break e;
                                }
                        }
                        t = t.return;
                    } while (null !== t);
                    throw Error(o(171));
                }
                if (1 === e.tag) {
                    var n = e.type;
                    if (Aa(n)) return _a(e, n, t);
                }
                return t;
            }
            function Vu(e, t, n, r, a, o, i, l, s) {
                return (
                    ((e = Bu(n, r, !0, e, 0, o, 0, l, s)).context = Wu(null)),
                    (n = e.current),
                    ((o = Io((r = tu()), (a = nu(n)))).callback = void 0 !== t && null !== t ? t : null),
                    _o(n, o, a),
                    (e.current.lanes = a),
                    gt(e, a, r),
                    au(e, r),
                    e
                );
            }
            function Hu(e, t, n, r) {
                var a = t.current,
                    o = tu(),
                    i = nu(a);
                return (
                    (n = Wu(n)),
                    null === t.context ? (t.context = n) : (t.pendingContext = n),
                    ((t = Io(o, i)).payload = { element: e }),
                    null !== (r = void 0 === r ? null : r) && (t.callback = r),
                    null !== (e = _o(a, t, i)) && (ru(e, a, i, o), Do(e, a, i)),
                    i
                );
            }
            function qu(e) {
                return (e = e.current).child ? (e.child.tag, e.child.stateNode) : null;
            }
            function $u(e, t) {
                if (null !== (e = e.memoizedState) && null !== e.dehydrated) {
                    var n = e.retryLane;
                    e.retryLane = 0 !== n && n < t ? n : t;
                }
            }
            function Gu(e, t) {
                $u(e, t), (e = e.alternate) && $u(e, t);
            }
            js = function (e, t, n) {
                if (null !== e)
                    if (e.memoizedProps !== t.pendingProps || Ta.current) xl = !0;
                    else {
                        if (0 === (e.lanes & n) && 0 === (128 & t.flags))
                            return (
                                (xl = !1),
                                (function (e, t, n) {
                                    switch (t.tag) {
                                        case 3:
                                            Ol(t), po();
                                            break;
                                        case 5:
                                            ii(t);
                                            break;
                                        case 1:
                                            Aa(t.type) && Da(t);
                                            break;
                                        case 4:
                                            ai(t, t.stateNode.containerInfo);
                                            break;
                                        case 10:
                                            var r = t.type._context,
                                                a = t.memoizedProps.value;
                                            Ea(yo, r._currentValue), (r._currentValue = a);
                                            break;
                                        case 13:
                                            if (null !== (r = t.memoizedState))
                                                return null !== r.dehydrated
                                                    ? (Ea(si, 1 & si.current), (t.flags |= 128), null)
                                                    : 0 !== (n & t.child.childLanes)
                                                        ? Fl(e, t, n)
                                                        : (Ea(si, 1 & si.current), null !== (e = ql(e, t, n)) ? e.sibling : null);
                                            Ea(si, 1 & si.current);
                                            break;
                                        case 19:
                                            if (((r = 0 !== (n & t.childLanes)), 0 !== (128 & e.flags))) {
                                                if (r) return Vl(e, t, n);
                                                t.flags |= 128;
                                            }
                                            if ((null !== (a = t.memoizedState) && ((a.rendering = null), (a.tail = null), (a.lastEffect = null)), Ea(si, si.current), r)) break;
                                            return null;
                                        case 22:
                                        case 23:
                                            return (t.lanes = 0), Sl(e, t, n);
                                    }
                                    return ql(e, t, n);
                                })(e, t, n)
                            );
                        xl = 0 !== (131072 & e.flags);
                    }
                else (xl = !1), ao && 0 !== (1048576 & t.flags) && Ja(t, $a, t.index);
                switch (((t.lanes = 0), t.tag)) {
                    case 2:
                        var r = t.type;
                        Hl(e, t), (e = t.pendingProps);
                        var a = Ra(t, Pa.current);
                        So(t, n), (a = ji(null, t, r, e, a, n));
                        var i = Si();
                        return (
                            (t.flags |= 1),
                            "object" === typeof a && null !== a && "function" === typeof a.render && void 0 === a.$$typeof
                                ? ((t.tag = 1),
                                    (t.memoizedState = null),
                                    (t.updateQueue = null),
                                    Aa(r) ? ((i = !0), Da(t)) : (i = !1),
                                    (t.memoizedState = null !== a.state && void 0 !== a.state ? a.state : null),
                                    Ao(t),
                                    (a.updater = Wo),
                                    (t.stateNode = a),
                                    (a._reactInternals = t),
                                    $o(t, r, e, n),
                                    (t = Tl(null, t, r, !0, i, n)))
                                : ((t.tag = 0), ao && i && eo(t), wl(null, t, a, n), (t = t.child)),
                            t
                        );
                    case 16:
                        r = t.elementType;
                        e: {
                            switch (
                            (Hl(e, t),
                                (e = t.pendingProps),
                                (r = (a = r._init)(r._payload)),
                                (t.type = r),
                                (a = t.tag = (function (e) {
                                    if ("function" === typeof e) return Lu(e) ? 1 : 0;
                                    if (void 0 !== e && null !== e) {
                                        if ((e = e.$$typeof) === P) return 11;
                                        if (e === R) return 14;
                                    }
                                    return 2;
                                })(r)),
                                (e = go(r, e)),
                                a)
                            ) {
                                case 0:
                                    t = Nl(null, t, r, e, n);
                                    break e;
                                case 1:
                                    t = Pl(null, t, r, e, n);
                                    break e;
                                case 11:
                                    t = kl(null, t, r, e, n);
                                    break e;
                                case 14:
                                    t = Cl(null, t, r, go(r.type, e), n);
                                    break e;
                            }
                            throw Error(o(306, r, ""));
                        }
                        return t;
                    case 0:
                        return (r = t.type), (a = t.pendingProps), Nl(e, t, r, (a = t.elementType === r ? a : go(r, a)), n);
                    case 1:
                        return (r = t.type), (a = t.pendingProps), Pl(e, t, r, (a = t.elementType === r ? a : go(r, a)), n);
                    case 3:
                        e: {
                            if ((Ol(t), null === e)) throw Error(o(387));
                            (r = t.pendingProps), (a = (i = t.memoizedState).element), Lo(e, t), Fo(t, r, null, n);
                            var l = t.memoizedState;
                            if (((r = l.element), i.isDehydrated)) {
                                if (
                                    ((i = { element: r, isDehydrated: !1, cache: l.cache, pendingSuspenseBoundaries: l.pendingSuspenseBoundaries, transitions: l.transitions }),
                                        (t.updateQueue.baseState = i),
                                        (t.memoizedState = i),
                                        256 & t.flags)
                                ) {
                                    t = Rl(e, t, r, n, (a = cl(Error(o(423)), t)));
                                    break e;
                                }
                                if (r !== a) {
                                    t = Rl(e, t, r, n, (a = cl(Error(o(424)), t)));
                                    break e;
                                }
                                for (ro = ua(t.stateNode.containerInfo.firstChild), no = t, ao = !0, oo = null, n = Xo(t, null, r, n), t.child = n; n;) (n.flags = (-3 & n.flags) | 4096), (n = n.sibling);
                            } else {
                                if ((po(), r === a)) {
                                    t = ql(e, t, n);
                                    break e;
                                }
                                wl(e, t, r, n);
                            }
                            t = t.child;
                        }
                        return t;
                    case 5:
                        return (
                            ii(t),
                            null === e && uo(t),
                            (r = t.type),
                            (a = t.pendingProps),
                            (i = null !== e ? e.memoizedProps : null),
                            (l = a.children),
                            na(r, a) ? (l = null) : null !== i && na(r, i) && (t.flags |= 32),
                            El(e, t),
                            wl(e, t, l, n),
                            t.child
                        );
                    case 6:
                        return null === e && uo(t), null;
                    case 13:
                        return Fl(e, t, n);
                    case 4:
                        return ai(t, t.stateNode.containerInfo), (r = t.pendingProps), null === e ? (t.child = Zo(t, null, r, n)) : wl(e, t, r, n), t.child;
                    case 11:
                        return (r = t.type), (a = t.pendingProps), kl(e, t, r, (a = t.elementType === r ? a : go(r, a)), n);
                    case 7:
                        return wl(e, t, t.pendingProps, n), t.child;
                    case 8:
                    case 12:
                        return wl(e, t, t.pendingProps.children, n), t.child;
                    case 10:
                        e: {
                            if (((r = t.type._context), (a = t.pendingProps), (i = t.memoizedProps), (l = a.value), Ea(yo, r._currentValue), (r._currentValue = l), null !== i))
                                if (lr(i.value, l)) {
                                    if (i.children === a.children && !Ta.current) {
                                        t = ql(e, t, n);
                                        break e;
                                    }
                                } else
                                    for (null !== (i = t.child) && (i.return = t); null !== i;) {
                                        var s = i.dependencies;
                                        if (null !== s) {
                                            l = i.child;
                                            for (var u = s.firstContext; null !== u;) {
                                                if (u.context === r) {
                                                    if (1 === i.tag) {
                                                        (u = Io(-1, n & -n)).tag = 2;
                                                        var c = i.updateQueue;
                                                        if (null !== c) {
                                                            var d = (c = c.shared).pending;
                                                            null === d ? (u.next = u) : ((u.next = d.next), (d.next = u)), (c.pending = u);
                                                        }
                                                    }
                                                    (i.lanes |= n), null !== (u = i.alternate) && (u.lanes |= n), jo(i.return, n, t), (s.lanes |= n);
                                                    break;
                                                }
                                                u = u.next;
                                            }
                                        } else if (10 === i.tag) l = i.type === t.type ? null : i.child;
                                        else if (18 === i.tag) {
                                            if (null === (l = i.return)) throw Error(o(341));
                                            (l.lanes |= n), null !== (s = l.alternate) && (s.lanes |= n), jo(l, n, t), (l = i.sibling);
                                        } else l = i.child;
                                        if (null !== l) l.return = i;
                                        else
                                            for (l = i; null !== l;) {
                                                if (l === t) {
                                                    l = null;
                                                    break;
                                                }
                                                if (null !== (i = l.sibling)) {
                                                    (i.return = l.return), (l = i);
                                                    break;
                                                }
                                                l = l.return;
                                            }
                                        i = l;
                                    }
                            wl(e, t, a.children, n), (t = t.child);
                        }
                        return t;
                    case 9:
                        return (a = t.type), (r = t.pendingProps.children), So(t, n), (r = r((a = Eo(a)))), (t.flags |= 1), wl(e, t, r, n), t.child;
                    case 14:
                        return (a = go((r = t.type), t.pendingProps)), Cl(e, t, r, (a = go(r.type, a)), n);
                    case 15:
                        return jl(e, t, t.type, t.pendingProps, n);
                    case 17:
                        return (r = t.type), (a = t.pendingProps), (a = t.elementType === r ? a : go(r, a)), Hl(e, t), (t.tag = 1), Aa(r) ? ((e = !0), Da(t)) : (e = !1), So(t, n), Ho(t, r, a), $o(t, r, a, n), Tl(null, t, r, !0, e, n);
                    case 19:
                        return Vl(e, t, n);
                    case 22:
                        return Sl(e, t, n);
                }
                throw Error(o(156, t.tag));
            };
            var Qu =
                "function" === typeof reportError
                    ? reportError
                    : function (e) {
                        console.error(e);
                    };
            function Yu(e) {
                this._internalRoot = e;
            }
            function Ku(e) {
                this._internalRoot = e;
            }
            function Zu(e) {
                return !(!e || (1 !== e.nodeType && 9 !== e.nodeType && 11 !== e.nodeType));
            }
            function Xu(e) {
                return !(!e || (1 !== e.nodeType && 9 !== e.nodeType && 11 !== e.nodeType && (8 !== e.nodeType || " react-mount-point-unstable " !== e.nodeValue)));
            }
            function Ju() { }
            function ec(e, t, n, r, a) {
                var o = n._reactRootContainer;
                if (o) {
                    var i = o;
                    if ("function" === typeof a) {
                        var l = a;
                        a = function () {
                            var e = qu(i);
                            l.call(e);
                        };
                    }
                    Hu(t, i, e, a);
                } else
                    i = (function (e, t, n, r, a) {
                        if (a) {
                            if ("function" === typeof r) {
                                var o = r;
                                r = function () {
                                    var e = qu(i);
                                    o.call(e);
                                };
                            }
                            var i = Vu(t, r, e, 0, null, !1, 0, "", Ju);
                            return (e._reactRootContainer = i), (e[pa] = i.current), Wr(8 === e.nodeType ? e.parentNode : e), du(), i;
                        }
                        for (; (a = e.lastChild);) e.removeChild(a);
                        if ("function" === typeof r) {
                            var l = r;
                            r = function () {
                                var e = qu(s);
                                l.call(e);
                            };
                        }
                        var s = Bu(e, 0, !1, null, 0, !1, 0, "", Ju);
                        return (
                            (e._reactRootContainer = s),
                            (e[pa] = s.current),
                            Wr(8 === e.nodeType ? e.parentNode : e),
                            du(function () {
                                Hu(t, s, n, r);
                            }),
                            s
                        );
                    })(n, t, e, a, r);
                return qu(i);
            }
            (Ku.prototype.render = Yu.prototype.render = function (e) {
                var t = this._internalRoot;
                if (null === t) throw Error(o(409));
                Hu(e, t, null, null);
            }),
                (Ku.prototype.unmount = Yu.prototype.unmount = function () {
                    var e = this._internalRoot;
                    if (null !== e) {
                        this._internalRoot = null;
                        var t = e.containerInfo;
                        du(function () {
                            Hu(null, e, null, null);
                        }),
                            (t[pa] = null);
                    }
                }),
                (Ku.prototype.unstable_scheduleHydration = function (e) {
                    if (e) {
                        var t = jt();
                        e = { blockedOn: null, target: e, priority: t };
                        for (var n = 0; n < Lt.length && 0 !== t && t < Lt[n].priority; n++);
                        Lt.splice(n, 0, e), 0 === n && Mt(e);
                    }
                }),
                (wt = function (e) {
                    switch (e.tag) {
                        case 3:
                            var t = e.stateNode;
                            if (t.current.memoizedState.isDehydrated) {
                                var n = dt(t.pendingLanes);
                                0 !== n && (yt(t, 1 | n), au(t, Ze()), 0 === (6 & Ts) && ((Vs = Ze() + 500), Wa()));
                            }
                            break;
                        case 13:
                            du(function () {
                                var t = Oo(e, 1);
                                if (null !== t) {
                                    var n = tu();
                                    ru(t, e, 1, n);
                                }
                            }),
                                Gu(e, 1);
                    }
                }),
                (kt = function (e) {
                    if (13 === e.tag) {
                        var t = Oo(e, 134217728);
                        if (null !== t) ru(t, e, 134217728, tu());
                        Gu(e, 134217728);
                    }
                }),
                (Ct = function (e) {
                    if (13 === e.tag) {
                        var t = nu(e),
                            n = Oo(e, t);
                        if (null !== n) ru(n, e, t, tu());
                        Gu(e, t);
                    }
                }),
                (jt = function () {
                    return bt;
                }),
                (St = function (e, t) {
                    var n = bt;
                    try {
                        return (bt = e), t();
                    } finally {
                        bt = n;
                    }
                }),
                (ke = function (e, t, n) {
                    switch (t) {
                        case "input":
                            if ((X(e, n), (t = n.name), "radio" === n.type && null != t)) {
                                for (n = e; n.parentNode;) n = n.parentNode;
                                for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
                                    var r = n[t];
                                    if (r !== e && r.form === e.form) {
                                        var a = wa(r);
                                        if (!a) throw Error(o(90));
                                        G(r), X(r, a);
                                    }
                                }
                            }
                            break;
                        case "textarea":
                            oe(e, n);
                            break;
                        case "select":
                            null != (t = n.value) && ne(e, !!n.multiple, t, !1);
                    }
                }),
                (Pe = cu),
                (Te = du);
            var tc = { usingClientEntryPoint: !1, Events: [ba, xa, wa, Ee, Ne, cu] },
                nc = { findFiberByHostInstance: ya, bundleType: 0, version: "18.2.0", rendererPackageName: "react-dom" },
                rc = {
                    bundleType: nc.bundleType,
                    version: nc.version,
                    rendererPackageName: nc.rendererPackageName,
                    rendererConfig: nc.rendererConfig,
                    overrideHookState: null,
                    overrideHookStateDeletePath: null,
                    overrideHookStateRenamePath: null,
                    overrideProps: null,
                    overridePropsDeletePath: null,
                    overridePropsRenamePath: null,
                    setErrorHandler: null,
                    setSuspenseHandler: null,
                    scheduleUpdate: null,
                    currentDispatcherRef: x.ReactCurrentDispatcher,
                    findHostInstanceByFiber: function (e) {
                        return null === (e = qe(e)) ? null : e.stateNode;
                    },
                    findFiberByHostInstance:
                        nc.findFiberByHostInstance ||
                        function () {
                            return null;
                        },
                    findHostInstancesForRefresh: null,
                    scheduleRefresh: null,
                    scheduleRoot: null,
                    setRefreshHandler: null,
                    getCurrentFiber: null,
                    reconcilerVersion: "18.2.0-next-9e3b772b8-20220608",
                };
            if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
                var ac = __REACT_DEVTOOLS_GLOBAL_HOOK__;
                if (!ac.isDisabled && ac.supportsFiber)
                    try {
                        (at = ac.inject(rc)), (ot = ac);
                    } catch (ce) { }
            }
            (t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = tc),
                (t.createPortal = function (e, t) {
                    var n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
                    if (!Zu(t)) throw Error(o(200));
                    return (function (e, t, n) {
                        var r = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
                        return { $$typeof: k, key: null == r ? null : "" + r, children: e, containerInfo: t, implementation: n };
                    })(e, t, null, n);
                }),
                (t.createRoot = function (e, t) {
                    if (!Zu(e)) throw Error(o(299));
                    var n = !1,
                        r = "",
                        a = Qu;
                    return (
                        null !== t && void 0 !== t && (!0 === t.unstable_strictMode && (n = !0), void 0 !== t.identifierPrefix && (r = t.identifierPrefix), void 0 !== t.onRecoverableError && (a = t.onRecoverableError)),
                        (t = Bu(e, 1, !1, null, 0, n, 0, r, a)),
                        (e[pa] = t.current),
                        Wr(8 === e.nodeType ? e.parentNode : e),
                        new Yu(t)
                    );
                }),
                (t.findDOMNode = function (e) {
                    if (null == e) return null;
                    if (1 === e.nodeType) return e;
                    var t = e._reactInternals;
                    if (void 0 === t) {
                        if ("function" === typeof e.render) throw Error(o(188));
                        throw ((e = Object.keys(e).join(",")), Error(o(268, e)));
                    }
                    return (e = null === (e = qe(t)) ? null : e.stateNode);
                }),
                (t.flushSync = function (e) {
                    return du(e);
                }),
                (t.hydrate = function (e, t, n) {
                    if (!Xu(t)) throw Error(o(200));
                    return ec(null, e, t, !0, n);
                }),
                (t.hydrateRoot = function (e, t, n) {
                    if (!Zu(e)) throw Error(o(405));
                    var r = (null != n && n.hydratedSources) || null,
                        a = !1,
                        i = "",
                        l = Qu;
                    if (
                        (null !== n && void 0 !== n && (!0 === n.unstable_strictMode && (a = !0), void 0 !== n.identifierPrefix && (i = n.identifierPrefix), void 0 !== n.onRecoverableError && (l = n.onRecoverableError)),
                            (t = Vu(t, null, e, 1, null != n ? n : null, a, 0, i, l)),
                            (e[pa] = t.current),
                            Wr(e),
                            r)
                    )
                        for (e = 0; e < r.length; e++)
                            (a = (a = (n = r[e])._getVersion)(n._source)), null == t.mutableSourceEagerHydrationData ? (t.mutableSourceEagerHydrationData = [n, a]) : t.mutableSourceEagerHydrationData.push(n, a);
                    return new Ku(t);
                }),
                (t.render = function (e, t, n) {
                    if (!Xu(t)) throw Error(o(200));
                    return ec(null, e, t, !1, n);
                }),
                (t.unmountComponentAtNode = function (e) {
                    if (!Xu(e)) throw Error(o(40));
                    return (
                        !!e._reactRootContainer &&
                        (du(function () {
                            ec(null, null, e, !1, function () {
                                (e._reactRootContainer = null), (e[pa] = null);
                            });
                        }),
                            !0)
                    );
                }),
                (t.unstable_batchedUpdates = cu),
                (t.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
                    if (!Xu(n)) throw Error(o(200));
                    if (null == e || void 0 === e._reactInternals) throw Error(o(38));
                    return ec(e, t, n, !1, r);
                }),
                (t.version = "18.2.0-next-9e3b772b8-20220608");
        },
        250: function (e, t, n) {
            var r = n(164);
            (t.createRoot = r.createRoot), (t.hydrateRoot = r.hydrateRoot);
        },
        164: function (e, t, n) {
            !(function e() {
                if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE)
                    try {
                        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
                    } catch (t) {
                        console.error(t);
                    }
            })(),
                (e.exports = n(463));
        },
        374: function (e, t, n) {
            var r = n(791),
                a = Symbol.for("react.element"),
                o = Symbol.for("react.fragment"),
                i = Object.prototype.hasOwnProperty,
                l = r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
                s = { key: !0, ref: !0, __self: !0, __source: !0 };
            function u(e, t, n) {
                var r,
                    o = {},
                    u = null,
                    c = null;
                for (r in (void 0 !== n && (u = "" + n), void 0 !== t.key && (u = "" + t.key), void 0 !== t.ref && (c = t.ref), t)) i.call(t, r) && !s.hasOwnProperty(r) && (o[r] = t[r]);
                if (e && e.defaultProps) for (r in (t = e.defaultProps)) void 0 === o[r] && (o[r] = t[r]);
                return { $$typeof: a, type: e, key: u, ref: c, props: o, _owner: l.current };
            }
            (t.Fragment = o), (t.jsx = u), (t.jsxs = u);
        },
        117: function (e, t) {
            var n = Symbol.for("react.element"),
                r = Symbol.for("react.portal"),
                a = Symbol.for("react.fragment"),
                o = Symbol.for("react.strict_mode"),
                i = Symbol.for("react.profiler"),
                l = Symbol.for("react.provider"),
                s = Symbol.for("react.context"),
                u = Symbol.for("react.forward_ref"),
                c = Symbol.for("react.suspense"),
                d = Symbol.for("react.memo"),
                f = Symbol.for("react.lazy"),
                h = Symbol.iterator;
            var p = {
                isMounted: function () {
                    return !1;
                },
                enqueueForceUpdate: function () { },
                enqueueReplaceState: function () { },
                enqueueSetState: function () { },
            },
                m = Object.assign,
                v = {};
            function g(e, t, n) {
                (this.props = e), (this.context = t), (this.refs = v), (this.updater = n || p);
            }
            function y() { }
            function b(e, t, n) {
                (this.props = e), (this.context = t), (this.refs = v), (this.updater = n || p);
            }
            (g.prototype.isReactComponent = {}),
                (g.prototype.setState = function (e, t) {
                    if ("object" !== typeof e && "function" !== typeof e && null != e) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
                    this.updater.enqueueSetState(this, e, t, "setState");
                }),
                (g.prototype.forceUpdate = function (e) {
                    this.updater.enqueueForceUpdate(this, e, "forceUpdate");
                }),
                (y.prototype = g.prototype);
            var x = (b.prototype = new y());
            (x.constructor = b), m(x, g.prototype), (x.isPureReactComponent = !0);
            var w = Array.isArray,
                k = Object.prototype.hasOwnProperty,
                C = { current: null },
                j = { key: !0, ref: !0, __self: !0, __source: !0 };
            function S(e, t, r) {
                var a,
                    o = {},
                    i = null,
                    l = null;
                if (null != t) for (a in (void 0 !== t.ref && (l = t.ref), void 0 !== t.key && (i = "" + t.key), t)) k.call(t, a) && !j.hasOwnProperty(a) && (o[a] = t[a]);
                var s = arguments.length - 2;
                if (1 === s) o.children = r;
                else if (1 < s) {
                    for (var u = Array(s), c = 0; c < s; c++) u[c] = arguments[c + 2];
                    o.children = u;
                }
                if (e && e.defaultProps) for (a in (s = e.defaultProps)) void 0 === o[a] && (o[a] = s[a]);
                return { $$typeof: n, type: e, key: i, ref: l, props: o, _owner: C.current };
            }
            function E(e) {
                return "object" === typeof e && null !== e && e.$$typeof === n;
            }
            var N = /\/+/g;
            function P(e, t) {
                return "object" === typeof e && null !== e && null != e.key
                    ? (function (e) {
                        var t = { "=": "=0", ":": "=2" };
                        return (
                            "$" +
                            e.replace(/[=:]/g, function (e) {
                                return t[e];
                            })
                        );
                    })("" + e.key)
                    : t.toString(36);
            }
            function T(e, t, a, o, i) {
                var l = typeof e;
                ("undefined" !== l && "boolean" !== l) || (e = null);
                var s = !1;
                if (null === e) s = !0;
                else
                    switch (l) {
                        case "string":
                        case "number":
                            s = !0;
                            break;
                        case "object":
                            switch (e.$$typeof) {
                                case n:
                                case r:
                                    s = !0;
                            }
                    }
                if (s)
                    return (
                        (i = i((s = e))),
                        (e = "" === o ? "." + P(s, 0) : o),
                        w(i)
                            ? ((a = ""),
                                null != e && (a = e.replace(N, "$&/") + "/"),
                                T(i, t, a, "", function (e) {
                                    return e;
                                }))
                            : null != i &&
                            (E(i) &&
                                (i = (function (e, t) {
                                    return { $$typeof: n, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
                                })(i, a + (!i.key || (s && s.key === i.key) ? "" : ("" + i.key).replace(N, "$&/") + "/") + e)),
                                t.push(i)),
                        1
                    );
                if (((s = 0), (o = "" === o ? "." : o + ":"), w(e)))
                    for (var u = 0; u < e.length; u++) {
                        var c = o + P((l = e[u]), u);
                        s += T(l, t, a, c, i);
                    }
                else if (
                    ((c = (function (e) {
                        return null === e || "object" !== typeof e ? null : "function" === typeof (e = (h && e[h]) || e["@@iterator"]) ? e : null;
                    })(e)),
                        "function" === typeof c)
                )
                    for (e = c.call(e), u = 0; !(l = e.next()).done;) s += T((l = l.value), t, a, (c = o + P(l, u++)), i);
                else if ("object" === l)
                    throw (
                        ((t = String(e)),
                            Error(
                                "Objects are not valid as a React child (found: " +
                                ("[object Object]" === t ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) +
                                "). If you meant to render a collection of children, use an array instead."
                            ))
                    );
                return s;
            }
            function O(e, t, n) {
                if (null == e) return e;
                var r = [],
                    a = 0;
                return (
                    T(e, r, "", "", function (e) {
                        return t.call(n, e, a++);
                    }),
                    r
                );
            }
            function R(e) {
                if (-1 === e._status) {
                    var t = e._result;
                    (t = t()).then(
                        function (t) {
                            (0 !== e._status && -1 !== e._status) || ((e._status = 1), (e._result = t));
                        },
                        function (t) {
                            (0 !== e._status && -1 !== e._status) || ((e._status = 2), (e._result = t));
                        }
                    ),
                        -1 === e._status && ((e._status = 0), (e._result = t));
                }
                if (1 === e._status) return e._result.default;
                throw e._result;
            }
            var A = { current: null },
                L = { transition: null },
                I = { ReactCurrentDispatcher: A, ReactCurrentBatchConfig: L, ReactCurrentOwner: C };
            (t.Children = {
                map: O,
                forEach: function (e, t, n) {
                    O(
                        e,
                        function () {
                            t.apply(this, arguments);
                        },
                        n
                    );
                },
                count: function (e) {
                    var t = 0;
                    return (
                        O(e, function () {
                            t++;
                        }),
                        t
                    );
                },
                toArray: function (e) {
                    return (
                        O(e, function (e) {
                            return e;
                        }) || []
                    );
                },
                only: function (e) {
                    if (!E(e)) throw Error("React.Children.only expected to receive a single React element child.");
                    return e;
                },
            }),
                (t.Component = g),
                (t.Fragment = a),
                (t.Profiler = i),
                (t.PureComponent = b),
                (t.StrictMode = o),
                (t.Suspense = c),
                (t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = I),
                (t.cloneElement = function (e, t, r) {
                    if (null === e || void 0 === e) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
                    var a = m({}, e.props),
                        o = e.key,
                        i = e.ref,
                        l = e._owner;
                    if (null != t) {
                        if ((void 0 !== t.ref && ((i = t.ref), (l = C.current)), void 0 !== t.key && (o = "" + t.key), e.type && e.type.defaultProps)) var s = e.type.defaultProps;
                        for (u in t) k.call(t, u) && !j.hasOwnProperty(u) && (a[u] = void 0 === t[u] && void 0 !== s ? s[u] : t[u]);
                    }
                    var u = arguments.length - 2;
                    if (1 === u) a.children = r;
                    else if (1 < u) {
                        s = Array(u);
                        for (var c = 0; c < u; c++) s[c] = arguments[c + 2];
                        a.children = s;
                    }
                    return { $$typeof: n, type: e.type, key: o, ref: i, props: a, _owner: l };
                }),
                (t.createContext = function (e) {
                    return ((e = { $$typeof: s, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }).Provider = { $$typeof: l, _context: e }), (e.Consumer = e);
                }),
                (t.createElement = S),
                (t.createFactory = function (e) {
                    var t = S.bind(null, e);
                    return (t.type = e), t;
                }),
                (t.createRef = function () {
                    return { current: null };
                }),
                (t.forwardRef = function (e) {
                    return { $$typeof: u, render: e };
                }),
                (t.isValidElement = E),
                (t.lazy = function (e) {
                    return { $$typeof: f, _payload: { _status: -1, _result: e }, _init: R };
                }),
                (t.memo = function (e, t) {
                    return { $$typeof: d, type: e, compare: void 0 === t ? null : t };
                }),
                (t.startTransition = function (e) {
                    var t = L.transition;
                    L.transition = {};
                    try {
                        e();
                    } finally {
                        L.transition = t;
                    }
                }),
                (t.unstable_act = function () {
                    throw Error("act(...) is not supported in production builds of React.");
                }),
                (t.useCallback = function (e, t) {
                    return A.current.useCallback(e, t);
                }),
                (t.useContext = function (e) {
                    return A.current.useContext(e);
                }),
                (t.useDebugValue = function () { }),
                (t.useDeferredValue = function (e) {
                    return A.current.useDeferredValue(e);
                }),
                (t.useEffect = function (e, t) {
                    return A.current.useEffect(e, t);
                }),
                (t.useId = function () {
                    return A.current.useId();
                }),
                (t.useImperativeHandle = function (e, t, n) {
                    return A.current.useImperativeHandle(e, t, n);
                }),
                (t.useInsertionEffect = function (e, t) {
                    return A.current.useInsertionEffect(e, t);
                }),
                (t.useLayoutEffect = function (e, t) {
                    return A.current.useLayoutEffect(e, t);
                }),
                (t.useMemo = function (e, t) {
                    return A.current.useMemo(e, t);
                }),
                (t.useReducer = function (e, t, n) {
                    return A.current.useReducer(e, t, n);
                }),
                (t.useRef = function (e) {
                    return A.current.useRef(e);
                }),
                (t.useState = function (e) {
                    return A.current.useState(e);
                }),
                (t.useSyncExternalStore = function (e, t, n) {
                    return A.current.useSyncExternalStore(e, t, n);
                }),
                (t.useTransition = function () {
                    return A.current.useTransition();
                }),
                (t.version = "18.2.0");
        },
        791: function (e, t, n) {
            e.exports = n(117);
        },
        184: function (e, t, n) {
            e.exports = n(374);
        },
        813: function (e, t) {
            function n(e, t) {
                var n = e.length;
                e.push(t);
                e: for (; 0 < n;) {
                    var r = (n - 1) >>> 1,
                        a = e[r];
                    if (!(0 < o(a, t))) break e;
                    (e[r] = t), (e[n] = a), (n = r);
                }
            }
            function r(e) {
                return 0 === e.length ? null : e[0];
            }
            function a(e) {
                if (0 === e.length) return null;
                var t = e[0],
                    n = e.pop();
                if (n !== t) {
                    e[0] = n;
                    e: for (var r = 0, a = e.length, i = a >>> 1; r < i;) {
                        var l = 2 * (r + 1) - 1,
                            s = e[l],
                            u = l + 1,
                            c = e[u];
                        if (0 > o(s, n)) u < a && 0 > o(c, s) ? ((e[r] = c), (e[u] = n), (r = u)) : ((e[r] = s), (e[l] = n), (r = l));
                        else {
                            if (!(u < a && 0 > o(c, n))) break e;
                            (e[r] = c), (e[u] = n), (r = u);
                        }
                    }
                }
                return t;
            }
            function o(e, t) {
                var n = e.sortIndex - t.sortIndex;
                return 0 !== n ? n : e.id - t.id;
            }
            if ("object" === typeof performance && "function" === typeof performance.now) {
                var i = performance;
                t.unstable_now = function () {
                    return i.now();
                };
            } else {
                var l = Date,
                    s = l.now();
                t.unstable_now = function () {
                    return l.now() - s;
                };
            }
            var u = [],
                c = [],
                d = 1,
                f = null,
                h = 3,
                p = !1,
                m = !1,
                v = !1,
                g = "function" === typeof setTimeout ? setTimeout : null,
                y = "function" === typeof clearTimeout ? clearTimeout : null,
                b = "undefined" !== typeof setImmediate ? setImmediate : null;
            function x(e) {
                for (var t = r(c); null !== t;) {
                    if (null === t.callback) a(c);
                    else {
                        if (!(t.startTime <= e)) break;
                        a(c), (t.sortIndex = t.expirationTime), n(u, t);
                    }
                    t = r(c);
                }
            }
            function w(e) {
                if (((v = !1), x(e), !m))
                    if (null !== r(u)) (m = !0), L(k);
                    else {
                        var t = r(c);
                        null !== t && I(w, t.startTime - e);
                    }
            }
            function k(e, n) {
                (m = !1), v && ((v = !1), y(E), (E = -1)), (p = !0);
                var o = h;
                try {
                    for (x(n), f = r(u); null !== f && (!(f.expirationTime > n) || (e && !T()));) {
                        var i = f.callback;
                        if ("function" === typeof i) {
                            (f.callback = null), (h = f.priorityLevel);
                            var l = i(f.expirationTime <= n);
                            (n = t.unstable_now()), "function" === typeof l ? (f.callback = l) : f === r(u) && a(u), x(n);
                        } else a(u);
                        f = r(u);
                    }
                    if (null !== f) var s = !0;
                    else {
                        var d = r(c);
                        null !== d && I(w, d.startTime - n), (s = !1);
                    }
                    return s;
                } finally {
                    (f = null), (h = o), (p = !1);
                }
            }
            "undefined" !== typeof navigator && void 0 !== navigator.scheduling && void 0 !== navigator.scheduling.isInputPending && navigator.scheduling.isInputPending.bind(navigator.scheduling);
            var C,
                j = !1,
                S = null,
                E = -1,
                N = 5,
                P = -1;
            function T() {
                return !(t.unstable_now() - P < N);
            }
            function O() {
                if (null !== S) {
                    var e = t.unstable_now();
                    P = e;
                    var n = !0;
                    try {
                        n = S(!0, e);
                    } finally {
                        n ? C() : ((j = !1), (S = null));
                    }
                } else j = !1;
            }
            if ("function" === typeof b)
                C = function () {
                    b(O);
                };
            else if ("undefined" !== typeof MessageChannel) {
                var R = new MessageChannel(),
                    A = R.port2;
                (R.port1.onmessage = O),
                    (C = function () {
                        A.postMessage(null);
                    });
            } else
                C = function () {
                    g(O, 0);
                };
            function L(e) {
                (S = e), j || ((j = !0), C());
            }
            function I(e, n) {
                E = g(function () {
                    e(t.unstable_now());
                }, n);
            }
            (t.unstable_IdlePriority = 5),
                (t.unstable_ImmediatePriority = 1),
                (t.unstable_LowPriority = 4),
                (t.unstable_NormalPriority = 3),
                (t.unstable_Profiling = null),
                (t.unstable_UserBlockingPriority = 2),
                (t.unstable_cancelCallback = function (e) {
                    e.callback = null;
                }),
                (t.unstable_continueExecution = function () {
                    m || p || ((m = !0), L(k));
                }),
                (t.unstable_forceFrameRate = function (e) {
                    0 > e || 125 < e ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : (N = 0 < e ? Math.floor(1e3 / e) : 5);
                }),
                (t.unstable_getCurrentPriorityLevel = function () {
                    return h;
                }),
                (t.unstable_getFirstCallbackNode = function () {
                    return r(u);
                }),
                (t.unstable_next = function (e) {
                    switch (h) {
                        case 1:
                        case 2:
                        case 3:
                            var t = 3;
                            break;
                        default:
                            t = h;
                    }
                    var n = h;
                    h = t;
                    try {
                        return e();
                    } finally {
                        h = n;
                    }
                }),
                (t.unstable_pauseExecution = function () { }),
                (t.unstable_requestPaint = function () { }),
                (t.unstable_runWithPriority = function (e, t) {
                    switch (e) {
                        case 1:
                        case 2:
                        case 3:
                        case 4:
                        case 5:
                            break;
                        default:
                            e = 3;
                    }
                    var n = h;
                    h = e;
                    try {
                        return t();
                    } finally {
                        h = n;
                    }
                }),
                (t.unstable_scheduleCallback = function (e, a, o) {
                    var i = t.unstable_now();
                    switch (("object" === typeof o && null !== o ? (o = "number" === typeof (o = o.delay) && 0 < o ? i + o : i) : (o = i), e)) {
                        case 1:
                            var l = -1;
                            break;
                        case 2:
                            l = 250;
                            break;
                        case 5:
                            l = 1073741823;
                            break;
                        case 4:
                            l = 1e4;
                            break;
                        default:
                            l = 5e3;
                    }
                    return (
                        (e = { id: d++, callback: a, priorityLevel: e, startTime: o, expirationTime: (l = o + l), sortIndex: -1 }),
                        o > i ? ((e.sortIndex = o), n(c, e), null === r(u) && e === r(c) && (v ? (y(E), (E = -1)) : (v = !0), I(w, o - i))) : ((e.sortIndex = l), n(u, e), m || p || ((m = !0), L(k))),
                        e
                    );
                }),
                (t.unstable_shouldYield = T),
                (t.unstable_wrapCallback = function (e) {
                    var t = h;
                    return function () {
                        var n = h;
                        h = t;
                        try {
                            return e.apply(this, arguments);
                        } finally {
                            h = n;
                        }
                    };
                });
        },
        296: function (e, t, n) {
            e.exports = n(813);
        },
    },
        t = {};
    function n(r) {
        var a = t[r];
        if (void 0 !== a) return a.exports;
        var o = (t[r] = { exports: {} });
        return e[r](o, o.exports, n), o.exports;
    }
    (n.m = e),
        (function () {
            var e,
                t = Object.getPrototypeOf
                    ? function (e) {
                        return Object.getPrototypeOf(e);
                    }
                    : function (e) {
                        return e.__proto__;
                    };
            n.t = function (r, a) {
                if ((1 & a && (r = this(r)), 8 & a)) return r;
                if ("object" === typeof r && r) {
                    if (4 & a && r.__esModule) return r;
                    if (16 & a && "function" === typeof r.then) return r;
                }
                var o = Object.create(null);
                n.r(o);
                var i = {};
                e = e || [null, t({}), t([]), t(t)];
                for (var l = 2 & a && r; "object" == typeof l && !~e.indexOf(l); l = t(l))
                    Object.getOwnPropertyNames(l).forEach(function (e) {
                        i[e] = function () {
                            return r[e];
                        };
                    });
                return (
                    (i.default = function () {
                        return r;
                    }),
                    n.d(o, i),
                    o
                );
            };
        })(),
        (n.d = function (e, t) {
            for (var r in t) n.o(t, r) && !n.o(e, r) && Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
        }),
        (n.f = {}),
        (n.e = function (e) {
            return Promise.all(
                Object.keys(n.f).reduce(function (t, r) {
                    return n.f[r](e, t), t;
                }, [])
            );
        }),
        (n.u = function (e) {
            return "static/js/" + e + ".8fc89c8f.chunk.js";
        }),
        (n.miniCssF = function (e) { }),
        (n.o = function (e, t) {
            return Object.prototype.hasOwnProperty.call(e, t);
        }),
        (function () {
            var e = {},
                t = "finance-v2-ui:";
            n.l = function (r, a, o, i) {
                if (e[r]) e[r].push(a);
                else {
                    var l, s;
                    if (void 0 !== o)
                        for (var u = document.getElementsByTagName("script"), c = 0; c < u.length; c++) {
                            var d = u[c];
                            if (d.getAttribute("src") == r || d.getAttribute("data-webpack") == t + o) {
                                l = d;
                                break;
                            }
                        }
                    l || ((s = !0), ((l = document.createElement("script")).charset = "utf-8"), (l.timeout = 120), n.nc && l.setAttribute("nonce", n.nc), l.setAttribute("data-webpack", t + o), (l.src = r)), (e[r] = [a]);
                    var f = function (t, n) {
                        (l.onerror = l.onload = null), clearTimeout(h);
                        var a = e[r];
                        if (
                            (delete e[r],
                                l.parentNode && l.parentNode.removeChild(l),
                                a &&
                                a.forEach(function (e) {
                                    return e(n);
                                }),
                                t)
                        )
                            return t(n);
                    },
                        h = setTimeout(f.bind(null, void 0, { type: "timeout", target: l }), 12e4);
                    (l.onerror = f.bind(null, l.onerror)), (l.onload = f.bind(null, l.onload)), s && document.head.appendChild(l);
                }
            };
        })(),
        (n.r = function (e) {
            "undefined" !== typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 });
        }),
        (n.p = "/"),
        (function () {
            var e = { 179: 0 };
            n.f.j = function (t, r) {
                var a = n.o(e, t) ? e[t] : void 0;
                if (0 !== a)
                    if (a) r.push(a[2]);
                    else {
                        var o = new Promise(function (n, r) {
                            a = e[t] = [n, r];
                        });
                        r.push((a[2] = o));
                        var i = n.p + n.u(t),
                            l = new Error();
                        n.l(
                            i,
                            function (r) {
                                if (n.o(e, t) && (0 !== (a = e[t]) && (e[t] = void 0), a)) {
                                    var o = r && ("load" === r.type ? "missing" : r.type),
                                        i = r && r.target && r.target.src;
                                    (l.message = "Loading chunk " + t + " failed.\n(" + o + ": " + i + ")"), (l.name = "ChunkLoadError"), (l.type = o), (l.request = i), a[1](l);
                                }
                            },
                            "chunk-" + t,
                            t
                        );
                    }
            };
            var t = function (t, r) {
                var a,
                    o,
                    i = r[0],
                    l = r[1],
                    s = r[2],
                    u = 0;
                if (
                    i.some(function (t) {
                        return 0 !== e[t];
                    })
                ) {
                    for (a in l) n.o(l, a) && (n.m[a] = l[a]);
                    if (s) s(n);
                }
                for (t && t(r); u < i.length; u++) (o = i[u]), n.o(e, o) && e[o] && e[o][0](), (e[o] = 0);
            },
                r = (self.webpackChunkfinance_v2_ui = self.webpackChunkfinance_v2_ui || []);
            r.forEach(t.bind(null, 0)), (r.push = t.bind(null, r.push.bind(r)));
        })(),
        (function () {
            var e = n(791),
                t = n.t(e, 2),
                r = n(250);
            function a(e) {
                return (
                    (a =
                        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                            ? function (e) {
                                return typeof e;
                            }
                            : function (e) {
                                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
                            }),
                    a(e)
                );
            }
            function o(e) {
                var t = (function (e, t) {
                    if ("object" !== a(e) || null === e) return e;
                    var n = e[Symbol.toPrimitive];
                    if (void 0 !== n) {
                        var r = n.call(e, t || "default");
                        if ("object" !== a(r)) return r;
                        throw new TypeError("@@toPrimitive must return a primitive value.");
                    }
                    return ("string" === t ? String : Number)(e);
                })(e, "string");
                return "symbol" === a(t) ? t : String(t);
            }
            function i(e, t, n) {
                return (t = o(t)) in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = n), e;
            }
            function l(e, t) {
                var n = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var r = Object.getOwnPropertySymbols(e);
                    t &&
                        (r = r.filter(function (t) {
                            return Object.getOwnPropertyDescriptor(e, t).enumerable;
                        })),
                        n.push.apply(n, r);
                }
                return n;
            }
            function s(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = null != arguments[t] ? arguments[t] : {};
                    t % 2
                        ? l(Object(n), !0).forEach(function (t) {
                            i(e, t, n[t]);
                        })
                        : Object.getOwnPropertyDescriptors
                            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
                            : l(Object(n)).forEach(function (t) {
                                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
                            });
                }
                return e;
            }
            function u(e, t) {
                if (null == e) return {};
                var n,
                    r,
                    a = (function (e, t) {
                        if (null == e) return {};
                        var n,
                            r,
                            a = {},
                            o = Object.keys(e);
                        for (r = 0; r < o.length; r++) (n = o[r]), t.indexOf(n) >= 0 || (a[n] = e[n]);
                        return a;
                    })(e, t);
                if (Object.getOwnPropertySymbols) {
                    var o = Object.getOwnPropertySymbols(e);
                    for (r = 0; r < o.length; r++) (n = o[r]), t.indexOf(n) >= 0 || (Object.prototype.propertyIsEnumerable.call(e, n) && (a[n] = e[n]));
                }
                return a;
            }
            function c(e) {
                var t,
                    n,
                    r = "";
                if ("string" == typeof e || "number" == typeof e) r += e;
                else if ("object" == typeof e)
                    if (Array.isArray(e)) for (t = 0; t < e.length; t++) e[t] && (n = c(e[t])) && (r && (r += " "), (r += n));
                    else for (t in e) e[t] && (r && (r += " "), (r += t));
                return r;
            }
            var d = function () {
                for (var e, t, n = 0, r = ""; n < arguments.length;) (e = arguments[n++]) && (t = c(e)) && (r && (r += " "), (r += t));
                return r;
            },
                f = n(184),
                h = ["variant", "color", "className", "href"],
                p = {
                    solid: "group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2",
                    outline: "group inline-flex ring-1 items-center justify-center rounded-full py-2 px-4 text-sm focus:outline-none",
                },
                m = {
                    solid: {
                        slate: "bg-slate-900 text-white hover:bg-slate-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900",
                        blue: "bg-[#0C6CF2] text-white hover:text-slate-100 hover:bg-blue-600 active:bg-blue-800 active:text-blue-100 focus-visible:outline-blue-600",
                        white: "bg-[#0C6CF2] text-[white] hover:bg-blue-600 active:bg-blue-700 active:text-white focus-visible:outline-white",
                    },
                    outline: {
                        slate: "ring-slate-200 text-slate-700 hover:text-slate-900 hover:ring-slate-300 active:bg-slate-100 active:text-slate-600 focus-visible:outline-blue-600 focus-visible:ring-slate-300",
                        white: "ring-slate-700 text-white hover:ring-slate-500 active:ring-slate-700 active:text-slate-400 focus-visible:outline-white",
                    },
                };
            function v(e) {
                var t = e.variant,
                    n = void 0 === t ? "solid" : t,
                    r = e.color,
                    a = void 0 === r ? "white" : r,
                    o = e.className,
                    i = e.href,
                    l = u(e, h);
                return (o = d(p[n], m[n][a], o)), i ? (0, f.jsx)("a", { href: i, children: (0, f.jsx)("button", s({ className: o }, l)) }) : (0, f.jsx)("button", s({ className: o }, l));
            }
            var g = ["className"];
            function y(e) {
                var t = e.className,
                    n = u(e, g);
                return (0, f.jsx)("div", s({ className: d("mx-auto max-w-[1545px] px-4 sm:px-6 lg:px-8", t) }, n));
            }
            n.p;
            n.p;
            function b(e, t) {
                (null == t || t > e.length) && (t = e.length);
                for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
                return r;
            }
            function x(e, t) {
                if (e) {
                    if ("string" === typeof e) return b(e, t);
                    var n = Object.prototype.toString.call(e).slice(8, -1);
                    return "Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? b(e, t) : void 0;
                }
            }
            function w(e, t) {
                var n = ("undefined" !== typeof Symbol && e[Symbol.iterator]) || e["@@iterator"];
                if (!n) {
                    if (Array.isArray(e) || (n = x(e)) || (t && e && "number" === typeof e.length)) {
                        n && (e = n);
                        var r = 0,
                            a = function () { };
                        return {
                            s: a,
                            n: function () {
                                return r >= e.length ? { done: !0 } : { done: !1, value: e[r++] };
                            },
                            e: function (e) {
                                throw e;
                            },
                            f: a,
                        };
                    }
                    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
                }
                var o,
                    i = !0,
                    l = !1;
                return {
                    s: function () {
                        n = n.call(e);
                    },
                    n: function () {
                        var e = n.next();
                        return (i = e.done), e;
                    },
                    e: function (e) {
                        (l = !0), (o = e);
                    },
                    f: function () {
                        try {
                            i || null == n.return || n.return();
                        } finally {
                            if (l) throw o;
                        }
                    },
                };
            }
            function k(e) {
                if (Array.isArray(e)) return e;
            }
            function C() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
            }
            function j(e, t) {
                return (
                    k(e) ||
                    (function (e, t) {
                        var n = null == e ? null : ("undefined" != typeof Symbol && e[Symbol.iterator]) || e["@@iterator"];
                        if (null != n) {
                            var r,
                                a,
                                o,
                                i,
                                l = [],
                                s = !0,
                                u = !1;
                            try {
                                if (((o = (n = n.call(e)).next), 0 === t)) {
                                    if (Object(n) !== n) return;
                                    s = !1;
                                } else for (; !(s = (r = o.call(n)).done) && (l.push(r.value), l.length !== t); s = !0);
                            } catch (c) {
                                (u = !0), (a = c);
                            } finally {
                                try {
                                    if (!s && null != n.return && ((i = n.return()), Object(i) !== i)) return;
                                } finally {
                                    if (u) throw a;
                                }
                            }
                            return l;
                        }
                    })(e, t) ||
                    x(e, t) ||
                    C()
                );
            }
            function S(e) {
                if (("undefined" !== typeof Symbol && null != e[Symbol.iterator]) || null != e["@@iterator"]) return Array.from(e);
            }
            function E(e) {
                return (
                    (function (e) {
                        if (Array.isArray(e)) return b(e);
                    })(e) ||
                    S(e) ||
                    x(e) ||
                    (function () {
                        throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
                    })()
                );
            }
            function N() {
                for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                return t.filter(Boolean).join(" ");
            }
            function P(e, t) {
                if (e in t) {
                    for (var n = t[e], r = arguments.length, a = new Array(r > 2 ? r - 2 : 0), o = 2; o < r; o++) a[o - 2] = arguments[o];
                    return "function" == typeof n ? n.apply(void 0, a) : n;
                }
                var i = new Error(
                    'Tried to handle "'.concat(e, '" but there is no handler defined. Only defined handlers are: ').concat(
                        Object.keys(t)
                            .map(function (e) {
                                return '"'.concat(e, '"');
                            })
                            .join(", "),
                        "."
                    )
                );
                throw (Error.captureStackTrace && Error.captureStackTrace(i, P), i);
            }
            var T = ["static"],
                O = ["unmount"],
                R = ["as", "children", "refName"],
                A = (function (e) {
                    return (e[(e.None = 0)] = "None"), (e[(e.RenderStrategy = 1)] = "RenderStrategy"), (e[(e.Static = 2)] = "Static"), e;
                })(A || {}),
                L = (function (e) {
                    return (e[(e.Unmount = 0)] = "Unmount"), (e[(e.Hidden = 1)] = "Hidden"), e;
                })(L || {});
            function I(e) {
                var t = e.ourProps,
                    n = e.theirProps,
                    r = e.slot,
                    a = e.defaultTag,
                    o = e.features,
                    l = e.visible,
                    c = void 0 === l || l,
                    d = e.name,
                    f = D(n, t);
                if (c) return _(f, r, a, d);
                var h = null != o ? o : 0;
                if (2 & h) {
                    var p = f.static,
                        m = void 0 !== p && p,
                        v = u(f, T);
                    if (m) return _(v, r, a, d);
                }
                if (1 & h) {
                    var g,
                        y = f.unmount,
                        b = void 0 === y || y,
                        x = u(f, O);
                    return P(
                        b ? 0 : 1,
                        (i((g = {}), 0, function () {
                            return null;
                        }),
                            i(g, 1, function () {
                                return _(s(s({}, x), {}, { hidden: !0, style: { display: "none" } }), r, a, d);
                            }),
                            g)
                    );
                }
                return _(f, r, a, d);
            }
            function _(t) {
                var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                    r = arguments.length > 2 ? arguments[2] : void 0,
                    a = arguments.length > 3 ? arguments[3] : void 0,
                    o = z(t, ["unmount", "static"]),
                    l = o.as,
                    s = void 0 === l ? r : l,
                    c = o.children,
                    d = o.refName,
                    f = void 0 === d ? "ref" : d,
                    h = u(o, R),
                    p = void 0 !== t.ref ? i({}, f, t.ref) : {},
                    m = "function" == typeof c ? c(n) : c;
                "className" in h && h.className && "function" == typeof h.className && (h.className = h.className(n));
                var v = {};
                if (n) {
                    for (var g = !1, y = [], b = 0, x = Object.entries(n); b < x.length; b++) {
                        var k = j(x[b], 2),
                            C = k[0],
                            S = k[1];
                        "boolean" == typeof S && (g = !0), !0 === S && y.push(C);
                    }
                    g && (v["data-headlessui-state"] = y.join(" "));
                }
                if (s === e.Fragment && Object.keys(F(h)).length > 0) {
                    if (!(0, e.isValidElement)(m) || (Array.isArray(m) && m.length > 1))
                        throw new Error(
                            [
                                'Passing props on "Fragment"!',
                                "",
                                "The current component <".concat(a, ' /> is rendering a "Fragment".'),
                                "However we need to passthrough the following props:",
                                Object.keys(h)
                                    .map(function (e) {
                                        return "  - ".concat(e);
                                    })
                                    .join("\n"),
                                "",
                                "You can apply a few solutions:",
                                ['Add an `as="..."` prop, to ensure that we render an actual element instead of a "Fragment".', "Render a single element as the child so that we can forward the props onto that element."]
                                    .map(function (e) {
                                        return "  - ".concat(e);
                                    })
                                    .join("\n"),
                            ].join("\n")
                        );
                    var E = m.props,
                        P =
                            "function" == typeof (null == E ? void 0 : E.className)
                                ? function () {
                                    return N(null == E ? void 0 : E.className.apply(E, arguments), h.className);
                                }
                                : N(null == E ? void 0 : E.className, h.className),
                        T = P ? { className: P } : {};
                    return (0, e.cloneElement)(
                        m,
                        Object.assign(
                            {},
                            D(m.props, F(z(h, ["ref"]))),
                            v,
                            p,
                            (function () {
                                for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                                return {
                                    ref: t.every(function (e) {
                                        return null == e;
                                    })
                                        ? void 0
                                        : function (e) {
                                            var n,
                                                r = w(t);
                                            try {
                                                for (r.s(); !(n = r.n()).done;) {
                                                    var a = n.value;
                                                    null != a && ("function" == typeof a ? a(e) : (a.current = e));
                                                }
                                            } catch (o) {
                                                r.e(o);
                                            } finally {
                                                r.f();
                                            }
                                        },
                                };
                            })(m.ref, p.ref),
                            T
                        )
                    );
                }
                return (0, e.createElement)(s, Object.assign({}, z(h, ["ref"]), s !== e.Fragment && p, s !== e.Fragment && v), m);
            }
            function D() {
                for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                if (0 === t.length) return {};
                if (1 === t.length) return t[0];
                for (var r = {}, a = {}, o = 0, l = t; o < l.length; o++) {
                    var s = l[o];
                    for (var u in s) u.startsWith("on") && "function" == typeof s[u] ? (null != a[u] || (a[u] = []), a[u].push(s[u])) : (r[u] = s[u]);
                }
                if (r.disabled || r["aria-disabled"])
                    return Object.assign(
                        r,
                        Object.fromEntries(
                            Object.keys(a).map(function (e) {
                                return [e, void 0];
                            })
                        )
                    );
                var c = function (e) {
                    Object.assign(
                        r,
                        i({}, e, function (t) {
                            for (var n = a[e], r = arguments.length, o = new Array(r > 1 ? r - 1 : 0), i = 1; i < r; i++) o[i - 1] = arguments[i];
                            var l,
                                s = w(n);
                            try {
                                for (s.s(); !(l = s.n()).done;) {
                                    var u = l.value;
                                    if ((t instanceof Event || (null == t ? void 0 : t.nativeEvent) instanceof Event) && t.defaultPrevented) return;
                                    u.apply(void 0, [t].concat(o));
                                }
                            } catch (c) {
                                s.e(c);
                            } finally {
                                s.f();
                            }
                        })
                    );
                };
                for (var d in a) c(d);
                return r;
            }
            function M(t) {
                var n;
                return Object.assign((0, e.forwardRef)(t), { displayName: null != (n = t.displayName) ? n : t.name });
            }
            function F(e) {
                var t = Object.assign({}, e);
                for (var n in t) void 0 === t[n] && delete t[n];
                return t;
            }
            function z(e) {
                var t,
                    n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [],
                    r = Object.assign({}, e),
                    a = w(n);
                try {
                    for (a.s(); !(t = a.n()).done;) {
                        var o = t.value;
                        o in r && delete r[o];
                    }
                } catch (i) {
                    a.e(i);
                } finally {
                    a.f();
                }
                return r;
            }
            function U(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
            }
            function B(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    (r.enumerable = r.enumerable || !1), (r.configurable = !0), "value" in r && (r.writable = !0), Object.defineProperty(e, o(r.key), r);
                }
            }
            function W(e, t, n) {
                return t && B(e.prototype, t), n && B(e, n), Object.defineProperty(e, "prototype", { writable: !1 }), e;
            }
            var V,
                H = Object.defineProperty,
                q = function (e, t, n) {
                    return (
                        (function (e, t, n) {
                            t in e ? H(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : (e[t] = n);
                        })(e, "symbol" != typeof t ? t + "" : t, n),
                        n
                    );
                },
                $ = (function () {
                    function e() {
                        U(this, e), q(this, "current", this.detect()), q(this, "handoffState", "pending"), q(this, "currentId", 0);
                    }
                    return (
                        W(e, [
                            {
                                key: "set",
                                value: function (e) {
                                    this.current !== e && ((this.handoffState = "pending"), (this.currentId = 0), (this.current = e));
                                },
                            },
                            {
                                key: "reset",
                                value: function () {
                                    this.set(this.detect());
                                },
                            },
                            {
                                key: "nextId",
                                value: function () {
                                    return ++this.currentId;
                                },
                            },
                            {
                                key: "isServer",
                                get: function () {
                                    return "server" === this.current;
                                },
                            },
                            {
                                key: "isClient",
                                get: function () {
                                    return "client" === this.current;
                                },
                            },
                            {
                                key: "detect",
                                value: function () {
                                    return "undefined" == typeof window || "undefined" == typeof document ? "server" : "client";
                                },
                            },
                            {
                                key: "handoff",
                                value: function () {
                                    "pending" === this.handoffState && (this.handoffState = "complete");
                                },
                            },
                            {
                                key: "isHandoffComplete",
                                get: function () {
                                    return "complete" === this.handoffState;
                                },
                            },
                        ]),
                        e
                    );
                })(),
                G = new $(),
                Q = function (t, n) {
                    G.isServer ? (0, e.useEffect)(t, n) : (0, e.useLayoutEffect)(t, n);
                };
            function Y() {
                var t = j((0, e.useState)(G.isHandoffComplete), 2),
                    n = t[0],
                    r = t[1];
                return (
                    n && !1 === G.isHandoffComplete && r(!1),
                    (0, e.useEffect)(
                        function () {
                            !0 !== n && r(!0);
                        },
                        [n]
                    ),
                    (0, e.useEffect)(function () {
                        return G.handoff();
                    }, []),
                    n
                );
            }
            var K =
                null != (V = e.useId)
                    ? V
                    : function () {
                        var t = Y(),
                            n = j(
                                e.useState(
                                    t
                                        ? function () {
                                            return G.nextId();
                                        }
                                        : null
                                ),
                                2
                            ),
                            r = n[0],
                            a = n[1];
                        return (
                            Q(
                                function () {
                                    null === r && a(G.nextId());
                                },
                                [r]
                            ),
                            null != r ? "" + r : void 0
                        );
                    },
                Z = (function (e) {
                    return (
                        (e.Space = " "),
                        (e.Enter = "Enter"),
                        (e.Escape = "Escape"),
                        (e.Backspace = "Backspace"),
                        (e.Delete = "Delete"),
                        (e.ArrowLeft = "ArrowLeft"),
                        (e.ArrowUp = "ArrowUp"),
                        (e.ArrowRight = "ArrowRight"),
                        (e.ArrowDown = "ArrowDown"),
                        (e.Home = "Home"),
                        (e.End = "End"),
                        (e.PageUp = "PageUp"),
                        (e.PageDown = "PageDown"),
                        (e.Tab = "Tab"),
                        e
                    );
                })(Z || {});
            function X(e) {
                return G.isServer ? null : e instanceof Node ? e.ownerDocument : null != e && e.hasOwnProperty("current") && e.current instanceof Node ? e.current.ownerDocument : document;
            }
            var J = ["[contentEditable=true]", "[tabindex]", "a[href]", "area[href]", "button:not([disabled])", "iframe", "input:not([disabled])", "select:not([disabled])", "textarea:not([disabled])"]
                .map(function (e) {
                    return "".concat(e, ":not([tabindex='-1'])");
                })
                .join(","),
                ee = (function (e) {
                    return (e[(e.First = 1)] = "First"), (e[(e.Previous = 2)] = "Previous"), (e[(e.Next = 4)] = "Next"), (e[(e.Last = 8)] = "Last"), (e[(e.WrapAround = 16)] = "WrapAround"), (e[(e.NoScroll = 32)] = "NoScroll"), e;
                })(ee || {}),
                te = (function (e) {
                    return (e[(e.Error = 0)] = "Error"), (e[(e.Overflow = 1)] = "Overflow"), (e[(e.Success = 2)] = "Success"), (e[(e.Underflow = 3)] = "Underflow"), e;
                })(te || {}),
                ne = (function (e) {
                    return (e[(e.Previous = -1)] = "Previous"), (e[(e.Next = 1)] = "Next"), e;
                })(ne || {});
            function re() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : document.body;
                return null == e
                    ? []
                    : Array.from(e.querySelectorAll(J)).sort(function (e, t) {
                        return Math.sign((e.tabIndex || Number.MAX_SAFE_INTEGER) - (t.tabIndex || Number.MAX_SAFE_INTEGER));
                    });
            }
            var ae = (function (e) {
                return (e[(e.Strict = 0)] = "Strict"), (e[(e.Loose = 1)] = "Loose"), e;
            })(ae || {});
            function oe(e) {
                var t,
                    n,
                    r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
                return (
                    e !== (null == (n = X(e)) ? void 0 : n.body) &&
                    P(
                        r,
                        (i((t = {}), 0, function () {
                            return e.matches(J);
                        }),
                            i(t, 1, function () {
                                for (var t = e; null !== t;) {
                                    if (t.matches(J)) return !0;
                                    t = t.parentElement;
                                }
                                return !1;
                            }),
                            t)
                    )
                );
            }
            var ie = (function (e) {
                return (e[(e.Keyboard = 0)] = "Keyboard"), (e[(e.Mouse = 1)] = "Mouse"), e;
            })(ie || {});
            "undefined" != typeof window &&
                "undefined" != typeof document &&
                (document.addEventListener(
                    "keydown",
                    function (e) {
                        e.metaKey || e.altKey || e.ctrlKey || (document.documentElement.dataset.headlessuiFocusVisible = "");
                    },
                    !0
                ),
                    document.addEventListener(
                        "click",
                        function (e) {
                            1 === e.detail ? delete document.documentElement.dataset.headlessuiFocusVisible : 0 === e.detail && (document.documentElement.dataset.headlessuiFocusVisible = "");
                        },
                        !0
                    ));
            var le = ["textarea", "input"].join(",");
            function se(e) {
                var t =
                    arguments.length > 1 && void 0 !== arguments[1]
                        ? arguments[1]
                        : function (e) {
                            return e;
                        };
                return e.slice().sort(function (e, n) {
                    var r = t(e),
                        a = t(n);
                    if (null === r || null === a) return 0;
                    var o = r.compareDocumentPosition(a);
                    return o & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : o & Node.DOCUMENT_POSITION_PRECEDING ? 1 : 0;
                });
            }
            function ue(e, t) {
                var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                    r = n.sorted,
                    a = void 0 === r || r,
                    o = n.relativeTo,
                    i = void 0 === o ? null : o,
                    l = n.skipElements,
                    s = void 0 === l ? [] : l,
                    u = Array.isArray(e) ? (e.length > 0 ? e[0].ownerDocument : document) : e.ownerDocument,
                    c = Array.isArray(e) ? (a ? se(e) : e) : re(e);
                s.length > 0 &&
                    c.length > 1 &&
                    (c = c.filter(function (e) {
                        return !s.includes(e);
                    })),
                    (i = null != i ? i : u.activeElement);
                var d,
                    f = (function () {
                        if (5 & t) return 1;
                        if (10 & t) return -1;
                        throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
                    })(),
                    h = (function () {
                        if (1 & t) return 0;
                        if (2 & t) return Math.max(0, c.indexOf(i)) - 1;
                        if (4 & t) return Math.max(0, c.indexOf(i)) + 1;
                        if (8 & t) return c.length - 1;
                        throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
                    })(),
                    p = 32 & t ? { preventScroll: !0 } : {},
                    m = 0,
                    v = c.length;
                do {
                    if (m >= v || m + v <= 0) return 0;
                    var g = h + m;
                    if (16 & t) g = (g + v) % v;
                    else {
                        if (g < 0) return 3;
                        if (g >= v) return 1;
                    }
                    null == (d = c[g]) || d.focus(p), (m += f);
                } while (d !== u.activeElement);
                return (
                    6 & t &&
                    (function (e) {
                        var t, n;
                        return null != (n = null == (t = null == e ? void 0 : e.matches) ? void 0 : t.call(e, le)) && n;
                    })(d) &&
                    d.select(),
                    2
                );
            }
            function ce(t) {
                var n = (0, e.useRef)(t);
                return (
                    Q(
                        function () {
                            n.current = t;
                        },
                        [t]
                    ),
                    n
                );
            }
            var de = function (t) {
                var n = ce(t);
                return e.useCallback(
                    function () {
                        return n.current.apply(n, arguments);
                    },
                    [n]
                );
            },
                fe = Symbol();
            function he(e) {
                var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                return Object.assign(e, i({}, fe, t));
            }
            function pe() {
                for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++) n[r] = arguments[r];
                var a = (0, e.useRef)(n);
                (0, e.useEffect)(
                    function () {
                        a.current = n;
                    },
                    [n]
                );
                var o = de(function (e) {
                    var t,
                        n = w(a.current);
                    try {
                        for (n.s(); !(t = n.n()).done;) {
                            var r = t.value;
                            null != r && ("function" == typeof r ? r(e) : (r.current = e));
                        }
                    } catch (o) {
                        n.e(o);
                    } finally {
                        n.f();
                    }
                });
                return n.every(function (e) {
                    return null == e || (null == e ? void 0 : e[fe]);
                })
                    ? void 0
                    : o;
            }
            function me(e) {
                var t;
                if (e.type) return e.type;
                var n = null != (t = e.as) ? t : "button";
                return "string" == typeof n && "button" === n.toLowerCase() ? "button" : void 0;
            }
            function ve(t, n) {
                var r = j(
                    (0, e.useState)(function () {
                        return me(t);
                    }),
                    2
                ),
                    a = r[0],
                    o = r[1];
                return (
                    Q(
                        function () {
                            o(me(t));
                        },
                        [t.type, t.as]
                    ),
                    Q(
                        function () {
                            a || (n.current && n.current instanceof HTMLButtonElement && !n.current.hasAttribute("type") && o("button"));
                        },
                        [a, n]
                    ),
                    a
                );
            }
            var ge = ["features"],
                ye = (function (e) {
                    return (e[(e.None = 1)] = "None"), (e[(e.Focusable = 2)] = "Focusable"), (e[(e.Hidden = 4)] = "Hidden"), e;
                })(ye || {});
            var be = M(function (e, t) {
                var n = e.features,
                    r = void 0 === n ? 1 : n,
                    a = u(e, ge);
                return I({
                    ourProps: {
                        ref: t,
                        "aria-hidden": 2 === (2 & r) || void 0,
                        style: s(
                            { position: "fixed", top: 1, left: 1, width: 1, height: 0, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: "0" },
                            4 === (4 & r) && 2 !== (2 & r) && { display: "none" }
                        ),
                    },
                    theirProps: a,
                    slot: {},
                    defaultTag: "div",
                    name: "Hidden",
                });
            });
            function xe(t) {
                var n = t.onFocus,
                    r = j((0, e.useState)(!0), 2),
                    a = r[0],
                    o = r[1];
                return a
                    ? e.createElement(be, {
                        as: "button",
                        type: "button",
                        features: ye.Focusable,
                        onFocus: function (e) {
                            e.preventDefault();
                            var t,
                                r = 50;
                            t = requestAnimationFrame(function e() {
                                if (!(r-- <= 0)) return n() ? (o(!1), void cancelAnimationFrame(t)) : void (t = requestAnimationFrame(e));
                                t && cancelAnimationFrame(t);
                            });
                        },
                    })
                    : null;
            }
            function we(e) {
                "function" == typeof queueMicrotask
                    ? queueMicrotask(e)
                    : Promise.resolve()
                        .then(e)
                        .catch(function (e) {
                            return setTimeout(function () {
                                throw e;
                            });
                        });
            }
            var ke = e.createContext(null);
            function Ce(t) {
                var n = t.children,
                    r = e.useRef({
                        groups: new Map(),
                        get: function (e, t) {
                            var n,
                                r = this.groups.get(e);
                            r || ((r = new Map()), this.groups.set(e, r));
                            var a = null != (n = r.get(t)) ? n : 0;
                            return (
                                r.set(t, a + 1),
                                [
                                    Array.from(r.keys()).indexOf(t),
                                    function () {
                                        var e = r.get(t);
                                        e > 1 ? r.set(t, e - 1) : r.delete(t);
                                    },
                                ]
                            );
                        },
                    });
                return e.createElement(ke.Provider, { value: r }, n);
            }
            function je(t) {
                var n = e.useContext(ke);
                if (!n) throw new Error("You must wrap your component in a <StableCollection>");
                var r = (function () {
                    var t,
                        n,
                        r,
                        a = null != (r = null == (n = null == (t = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED) ? void 0 : t.ReactCurrentOwner) ? void 0 : n.current) ? r : null;
                    if (!a) return Symbol();
                    for (var o = [], i = a; i;) o.push(i.index), (i = i.return);
                    return "$." + o.join(".");
                })(),
                    a = j(n.current.get(t, r), 2),
                    o = a[0],
                    i = a[1];
                return (
                    e.useEffect(function () {
                        return i;
                    }, []),
                    o
                );
            }
            var Se,
                Ee = ["defaultIndex", "vertical", "manual", "onChange", "selectedIndex"],
                Ne = ["id"],
                Pe = ["id", "tabIndex"],
                Te = (function (e) {
                    return (e[(e.Forwards = 0)] = "Forwards"), (e[(e.Backwards = 1)] = "Backwards"), e;
                })(Te || {}),
                Oe = (function (e) {
                    return (e[(e.Less = -1)] = "Less"), (e[(e.Equal = 0)] = "Equal"), (e[(e.Greater = 1)] = "Greater"), e;
                })(Oe || {}),
                Re = (function (e) {
                    return (
                        (e[(e.SetSelectedIndex = 0)] = "SetSelectedIndex"),
                        (e[(e.RegisterTab = 1)] = "RegisterTab"),
                        (e[(e.UnregisterTab = 2)] = "UnregisterTab"),
                        (e[(e.RegisterPanel = 3)] = "RegisterPanel"),
                        (e[(e.UnregisterPanel = 4)] = "UnregisterPanel"),
                        e
                    );
                })(Re || {}),
                Ae =
                    (i((Se = {}), 0, function (e, t) {
                        var n,
                            r = se(e.tabs, function (e) {
                                return e.current;
                            }),
                            a = se(e.panels, function (e) {
                                return e.current;
                            }),
                            o = r.filter(function (e) {
                                var t;
                                return !(null != (t = e.current) && t.hasAttribute("disabled"));
                            }),
                            l = s(s({}, e), {}, { tabs: r, panels: a });
                        if (t.index < 0 || t.index > r.length - 1) {
                            var u,
                                c,
                                d = P(
                                    Math.sign(t.index - e.selectedIndex),
                                    (i((u = {}), -1, function () {
                                        return 1;
                                    }),
                                        i(u, 0, function () {
                                            var e;
                                            return P(
                                                Math.sign(t.index),
                                                (i((e = {}), -1, function () {
                                                    return 0;
                                                }),
                                                    i(e, 0, function () {
                                                        return 0;
                                                    }),
                                                    i(e, 1, function () {
                                                        return 1;
                                                    }),
                                                    e)
                                            );
                                        }),
                                        i(u, 1, function () {
                                            return 0;
                                        }),
                                        u)
                                );
                            return 0 === o.length
                                ? l
                                : s(
                                    s({}, l),
                                    {},
                                    {
                                        selectedIndex: P(
                                            d,
                                            ((c = {}),
                                                i(c, 0, function () {
                                                    return r.indexOf(o[0]);
                                                }),
                                                i(c, 1, function () {
                                                    return r.indexOf(o[o.length - 1]);
                                                }),
                                                c)
                                        ),
                                    }
                                );
                        }
                        var f = r.slice(0, t.index),
                            h = [].concat(E(r.slice(t.index)), E(f)).find(function (e) {
                                return o.includes(e);
                            });
                        if (!h) return l;
                        var p = null != (n = r.indexOf(h)) ? n : e.selectedIndex;
                        return -1 === p && (p = e.selectedIndex), s(s({}, l), {}, { selectedIndex: p });
                    }),
                        i(Se, 1, function (e, t) {
                            var n;
                            if (e.tabs.includes(t.tab)) return e;
                            var r = e.tabs[e.selectedIndex],
                                a = se([].concat(E(e.tabs), [t.tab]), function (e) {
                                    return e.current;
                                }),
                                o = null != (n = a.indexOf(r)) ? n : e.selectedIndex;
                            return -1 === o && (o = e.selectedIndex), s(s({}, e), {}, { tabs: a, selectedIndex: o });
                        }),
                        i(Se, 2, function (e, t) {
                            return s(
                                s({}, e),
                                {},
                                {
                                    tabs: e.tabs.filter(function (e) {
                                        return e !== t.tab;
                                    }),
                                }
                            );
                        }),
                        i(Se, 3, function (e, t) {
                            return e.panels.includes(t.panel)
                                ? e
                                : s(
                                    s({}, e),
                                    {},
                                    {
                                        panels: se([].concat(E(e.panels), [t.panel]), function (e) {
                                            return e.current;
                                        }),
                                    }
                                );
                        }),
                        i(Se, 4, function (e, t) {
                            return s(
                                s({}, e),
                                {},
                                {
                                    panels: e.panels.filter(function (e) {
                                        return e !== t.panel;
                                    }),
                                }
                            );
                        }),
                        Se),
                Le = (0, e.createContext)(null);
            function Ie(t) {
                var n = (0, e.useContext)(Le);
                if (null === n) {
                    var r = new Error("<".concat(t, " /> is missing a parent <Tab.Group /> component."));
                    throw (Error.captureStackTrace && Error.captureStackTrace(r, Ie), r);
                }
                return n;
            }
            Le.displayName = "TabsDataContext";
            var _e = (0, e.createContext)(null);
            function De(t) {
                var n = (0, e.useContext)(_e);
                if (null === n) {
                    var r = new Error("<".concat(t, " /> is missing a parent <Tab.Group /> component."));
                    throw (Error.captureStackTrace && Error.captureStackTrace(r, De), r);
                }
                return n;
            }
            function Me(e, t) {
                return P(t.type, Ae, e, t);
            }
            _e.displayName = "TabsActionsContext";
            var Fe = e.Fragment;
            var ze = A.RenderStrategy | A.Static;
            var Ue = M(function (t, n) {
                var r,
                    a,
                    o = K(),
                    i = t.id,
                    l = void 0 === i ? "headlessui-tabs-tab-".concat(o) : i,
                    s = u(t, Ne),
                    c = Ie("Tab"),
                    d = c.orientation,
                    f = c.activation,
                    h = c.selectedIndex,
                    p = c.tabs,
                    m = c.panels,
                    v = De("Tab"),
                    g = Ie("Tab"),
                    y = (0, e.useRef)(null),
                    b = pe(y, n);
                Q(
                    function () {
                        return v.registerTab(y);
                    },
                    [v, y]
                );
                var x = je("tabs"),
                    w = p.indexOf(y);
                -1 === w && (w = x);
                var k = w === h,
                    C = de(function (e) {
                        var t,
                            n = e();
                        if (n === te.Success && "auto" === f) {
                            var r = null == (t = X(y)) ? void 0 : t.activeElement,
                                a = g.tabs.findIndex(function (e) {
                                    return e.current === r;
                                });
                            -1 !== a && v.change(a);
                        }
                        return n;
                    }),
                    j = de(function (e) {
                        var t = p
                            .map(function (e) {
                                return e.current;
                            })
                            .filter(Boolean);
                        if (e.key === Z.Space || e.key === Z.Enter) return e.preventDefault(), e.stopPropagation(), void v.change(w);
                        switch (e.key) {
                            case Z.Home:
                            case Z.PageUp:
                                return (
                                    e.preventDefault(),
                                    e.stopPropagation(),
                                    C(function () {
                                        return ue(t, ee.First);
                                    })
                                );
                            case Z.End:
                            case Z.PageDown:
                                return (
                                    e.preventDefault(),
                                    e.stopPropagation(),
                                    C(function () {
                                        return ue(t, ee.Last);
                                    })
                                );
                        }
                        return C(function () {
                            return P(d, {
                                vertical: function () {
                                    return e.key === Z.ArrowUp ? ue(t, ee.Previous | ee.WrapAround) : e.key === Z.ArrowDown ? ue(t, ee.Next | ee.WrapAround) : te.Error;
                                },
                                horizontal: function () {
                                    return e.key === Z.ArrowLeft ? ue(t, ee.Previous | ee.WrapAround) : e.key === Z.ArrowRight ? ue(t, ee.Next | ee.WrapAround) : te.Error;
                                },
                            });
                        }) === te.Success
                            ? e.preventDefault()
                            : void 0;
                    }),
                    S = (0, e.useRef)(!1),
                    E = de(function () {
                        var e;
                        S.current ||
                            ((S.current = !0),
                                null == (e = y.current) || e.focus(),
                                v.change(w),
                                we(function () {
                                    S.current = !1;
                                }));
                    }),
                    N = de(function (e) {
                        e.preventDefault();
                    }),
                    T = (0, e.useMemo)(
                        function () {
                            return { selected: k };
                        },
                        [k]
                    );
                return I({
                    ourProps: {
                        ref: b,
                        onKeyDown: j,
                        onMouseDown: N,
                        onClick: E,
                        id: l,
                        role: "tab",
                        type: ve(t, y),
                        "aria-controls": null == (a = null == (r = m[w]) ? void 0 : r.current) ? void 0 : a.id,
                        "aria-selected": k,
                        tabIndex: k ? 0 : -1,
                    },
                    theirProps: s,
                    slot: T,
                    defaultTag: "button",
                    name: "Tabs.Tab",
                });
            }),
                Be = M(function (t, n) {
                    var r = t.defaultIndex,
                        a = void 0 === r ? 0 : r,
                        o = t.vertical,
                        i = void 0 !== o && o,
                        l = t.manual,
                        c = void 0 !== l && l,
                        d = t.onChange,
                        f = t.selectedIndex,
                        h = void 0 === f ? null : f,
                        p = u(t, Ee),
                        m = i ? "vertical" : "horizontal",
                        v = c ? "manual" : "auto",
                        g = null !== h,
                        y = pe(n),
                        b = j((0, e.useReducer)(Me, { selectedIndex: null != h ? h : a, tabs: [], panels: [] }), 2),
                        x = b[0],
                        k = b[1],
                        C = (0, e.useMemo)(
                            function () {
                                return { selectedIndex: x.selectedIndex };
                            },
                            [x.selectedIndex]
                        ),
                        S = ce(d || function () { }),
                        E = ce(x.tabs),
                        N = (0, e.useMemo)(
                            function () {
                                return s({ orientation: m, activation: v }, x);
                            },
                            [m, v, x]
                        ),
                        P = de(function (e) {
                            return (
                                k({ type: 1, tab: e }),
                                function () {
                                    return k({ type: 2, tab: e });
                                }
                            );
                        }),
                        T = de(function (e) {
                            return (
                                k({ type: 3, panel: e }),
                                function () {
                                    return k({ type: 4, panel: e });
                                }
                            );
                        }),
                        O = de(function (e) {
                            R.current !== e && S.current(e), g || k({ type: 0, index: e });
                        }),
                        R = ce(g ? t.selectedIndex : x.selectedIndex),
                        A = (0, e.useMemo)(function () {
                            return { registerTab: P, registerPanel: T, change: O };
                        }, []);
                    Q(
                        function () {
                            k({ type: 0, index: null != h ? h : a });
                        },
                        [h]
                    ),
                        Q(function () {
                            if (!(void 0 === R.current || x.tabs.length <= 0)) {
                                var e = se(x.tabs, function (e) {
                                    return e.current;
                                });
                                e.some(function (e, t) {
                                    return x.tabs[t] !== e;
                                }) && O(e.indexOf(x.tabs[R.current]));
                            }
                        });
                    var L = { ref: y };
                    return e.createElement(
                        Ce,
                        null,
                        e.createElement(
                            _e.Provider,
                            { value: A },
                            e.createElement(
                                Le.Provider,
                                { value: N },
                                N.tabs.length <= 0 &&
                                e.createElement(xe, {
                                    onFocus: function () {
                                        var e,
                                            t,
                                            n,
                                            r = w(E.current);
                                        try {
                                            for (r.s(); !(n = r.n()).done;) {
                                                var a = n.value;
                                                if (0 === (null == (e = a.current) ? void 0 : e.tabIndex)) return null == (t = a.current) || t.focus(), !0;
                                            }
                                        } catch (o) {
                                            r.e(o);
                                        } finally {
                                            r.f();
                                        }
                                        return !1;
                                    },
                                }),
                                I({ ourProps: L, theirProps: p, slot: C, defaultTag: Fe, name: "Tabs" })
                            )
                        )
                    );
                }),
                We = M(function (e, t) {
                    var n = Ie("Tab.List"),
                        r = n.orientation,
                        a = n.selectedIndex;
                    return I({ ourProps: { ref: pe(t), role: "tablist", "aria-orientation": r }, theirProps: e, slot: { selectedIndex: a }, defaultTag: "div", name: "Tabs.List" });
                }),
                Ve = M(function (t, n) {
                    var r = Ie("Tab.Panels").selectedIndex;
                    return I({
                        ourProps: { ref: pe(n) },
                        theirProps: t,
                        slot: (0, e.useMemo)(
                            function () {
                                return { selectedIndex: r };
                            },
                            [r]
                        ),
                        defaultTag: "div",
                        name: "Tabs.Panels",
                    });
                }),
                He = M(function (t, n) {
                    var r,
                        a,
                        o,
                        i,
                        l = K(),
                        c = t.id,
                        d = void 0 === c ? "headlessui-tabs-panel-".concat(l) : c,
                        f = t.tabIndex,
                        h = void 0 === f ? 0 : f,
                        p = u(t, Pe),
                        m = Ie("Tab.Panel"),
                        v = m.selectedIndex,
                        g = m.tabs,
                        y = m.panels,
                        b = De("Tab.Panel"),
                        x = (0, e.useRef)(null),
                        w = pe(x, n);
                    Q(
                        function () {
                            return b.registerPanel(x);
                        },
                        [b, x]
                    );
                    var k = je("panels"),
                        C = y.indexOf(x);
                    -1 === C && (C = k);
                    var j = C === v,
                        S = (0, e.useMemo)(
                            function () {
                                return { selected: j };
                            },
                            [j]
                        ),
                        E = { ref: w, id: d, role: "tabpanel", "aria-labelledby": null == (a = null == (r = g[C]) ? void 0 : r.current) ? void 0 : a.id, tabIndex: j ? h : -1 };
                    return j || (null != (o = p.unmount) && !o) || (null != (i = p.static) && i)
                        ? I({ ourProps: E, theirProps: p, slot: S, defaultTag: "div", features: ze, visible: j, name: "Tabs.Panel" })
                        : e.createElement(be, s({ as: "span" }, E));
                }),
                qe = Object.assign(Ue, { Group: Be, List: We, Panels: Ve, Panel: He }),
                $e = ["feature", "isActive", "className"],
                Ge = [
                    {
                        name: "Analytics",
                        summary: "Stay on top of things with always up-to-date reporting features.",
                        description: "Our platform delivers insightful analytics and strategic guidance, enabling you to optimize your financial decisions and achieve your financial objectives",
                        icon: function () {
                            var t = (0, e.useId)();
                            return (0, f.jsxs)(f.Fragment, {
                                children: [
                                    (0, f.jsx)("defs", {
                                        children: (0, f.jsxs)("linearGradient", {
                                            id: t,
                                            x1: "11.5",
                                            y1: 18,
                                            x2: 36,
                                            y2: "15.5",
                                            gradientUnits: "userSpaceOnUse",
                                            children: [(0, f.jsx)("stop", { offset: ".194", stopColor: "#fff" }), (0, f.jsx)("stop", { offset: 1, stopColor: "#6692F1" })],
                                        }),
                                    }),
                                    (0, f.jsx)("path", { d: "m30 15-4 5-4-11-4 18-4-11-4 7-4-5", stroke: "url(#".concat(t, ")"), strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }),
                                ],
                            });
                        },
                    },
                    {
                        name: "Diverse portfolio",
                        summary: "Never lose track of what\u2019s in stock with accurate inventory tracking.",
                        description: "Utilize our platform to safeguard a substantial portfolio of assets, ensuring secure management and protection tailored to your individual needs.",
                        icon: function () {
                            return (0, f.jsxs)(f.Fragment, {
                                children: [
                                    (0, f.jsx)("path", { opacity: ".5", d: "M8 17a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2Z", fill: "#fff" }),
                                    (0, f.jsx)("path", { opacity: ".3", d: "M8 24a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2Z", fill: "#fff" }),
                                    (0, f.jsx)("path", { d: "M8 10a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2Z", fill: "#fff" }),
                                ],
                            });
                        },
                    },
                    {
                        name: "Live support",
                        summary: "Organize all of your contacts, service providers, and invoices in one place.",
                        description: "Our dedicated team of knowledgeable representatives is always ready to assist you with any concerns, or support you may need at any time of day. ",
                        icon: function () {
                            return (0, f.jsxs)(f.Fragment, {
                                children: [
                                    (0, f.jsx)("path", {
                                        opacity: ".5",
                                        d:
                                            "M25.778 25.778c.39.39 1.027.393 1.384-.028A11.952 11.952 0 0 0 30 18c0-6.627-5.373-12-12-12S6 11.373 6 18c0 2.954 1.067 5.659 2.838 7.75.357.421.993.419 1.384.028.39-.39.386-1.02.036-1.448A9.959 9.959 0 0 1 8 18c0-5.523 4.477-10 10-10s10 4.477 10 10a9.959 9.959 0 0 1-2.258 6.33c-.35.427-.354 1.058.036 1.448Z",
                                        fill: "#fff",
                                    }),
                                    (0, f.jsx)("path", {
                                        d: "M12 28.395V28a6 6 0 0 1 12 0v.395A11.945 11.945 0 0 1 18 30c-2.186 0-4.235-.584-6-1.605ZM21 16.5c0-1.933-.5-3.5-3-3.5s-3 1.567-3 3.5 1.343 3.5 3 3.5 3-1.567 3-3.5Z",
                                        fill: "#fff",
                                    }),
                                ],
                            });
                        },
                    },
                ];
            function Qe(e) {
                var t = e.feature,
                    n = e.isActive,
                    r = e.className,
                    a = u(e, $e);
                return (0, f.jsxs)(
                    "div",
                    s(
                        s({ className: d(r, !n && "opacity-75 hover:opacity-100") }, a),
                        {},
                        {
                            style: { textAlign: "center", justifyItems: "center", display: "grid" },
                            children: [
                                (0, f.jsx)("div", {
                                    className: d("w-9 rounded-lg", n ? "bg-blue-600" : "bg-slate-500"),
                                    children: (0, f.jsx)("svg", { "aria-hidden": "true", className: "h-9 w-9 grid items-center", fill: "none", children: (0, f.jsx)(t.icon, {}) }),
                                }),
                                (0, f.jsx)("h3", { className: d("mt-6 text-[18px] font-medium", n ? "text-blue-600" : "text-slate-600"), children: t.name }),
                                (0, f.jsx)("p", { className: "mt-2 text-[16px] text-slate-600", children: t.description }),
                            ],
                        }
                    )
                );
            }
            function Ye() {
                return (0, f.jsx)("div", {
                    className: "-mx-4 mt-20 flex flex-col gap-y-10 overflow-hidden px-4 sm:-mx-6 sm:px-6 lg:hidden",
                    children: Ge.map(function (e) {
                        return (0, f.jsxs)("div", { children: [(0, f.jsx)(Qe, { feature: e, className: "mx-auto max-w-2xl", isActive: !0 }), (0, f.jsx)("div", { className: "relative mt-10 pb-10" })] }, e.name);
                    }),
                });
            }
            function Ke() {
                return (0, f.jsx)(qe.Group, {
                    as: "div",
                    className: "hidden lg:mt-20 lg:block",
                    children: function (e) {
                        e.selectedIndex;
                        return (0, f.jsx)(f.Fragment, {
                            children: (0, f.jsx)(qe.List, {
                                className: "grid grid-cols-3 gap-x-8",
                                children: Ge.map(function (e, t) {
                                    return (0,
                                        f.jsx)(Qe, { feature: s(s({}, e), {}, { name: (0, f.jsxs)(qe, { className: "[&:not(:focus-visible)]:focus:outline-none", children: [(0, f.jsx)("span", { className: "absolute inset-0" }), e.name] }) }), isActive: !0, className: "relative" }, e.name);
                                }),
                            }),
                        });
                    },
                });
            }
            function Ze() {
                return (0, f.jsx)("section", {
                    id: "secondary-features",
                    "aria-label": "Features for simplifying everyday business tasks",
                    className: "pb-14 pt-14 sm:pb-20 sm:pt-24 lg:pb-32",
                    children: (0, f.jsxs)(y, { children: [(0, f.jsx)(Ye, {}), (0, f.jsx)(Ke, {})] }),
                });
            }
            n.p, n.p, n.p;
            n.p;
            var Xe = n.p + "static/media/expenses.ec22dfc3499a3b313728.png",
                Je = n.p + "static/media/payroll.4a31cb5160ad799713e8.png",
                et = n.p + "static/media/reporting.8e21c7236fdce41656ff.png";
            n.p;
            function tt(e) {
                for (var t = e.parentElement, n = null; t && !(t instanceof HTMLFieldSetElement);) t instanceof HTMLLegendElement && (n = t), (t = t.parentElement);
                var r = "" === (null == t ? void 0 : t.getAttribute("disabled"));
                return (
                    (!r ||
                        !(function (e) {
                            if (!e) return !1;
                            for (var t = e.previousElementSibling; null !== t;) {
                                if (t instanceof HTMLLegendElement) return !1;
                                t = t.previousElementSibling;
                            }
                            return !0;
                        })(n)) &&
                    r
                );
            }
            var nt = (0, e.createContext)(null);
            nt.displayName = "OpenClosedContext";
            var rt = (function (e) {
                return (e[(e.Open = 1)] = "Open"), (e[(e.Closed = 2)] = "Closed"), (e[(e.Closing = 4)] = "Closing"), (e[(e.Opening = 8)] = "Opening"), e;
            })(rt || {});
            function at() {
                return (0, e.useContext)(nt);
            }
            function ot(t) {
                var n = t.value,
                    r = t.children;
                return e.createElement(nt.Provider, { value: n }, r);
            }
            function it(t, n, r) {
                var a = ce(n);
                (0, e.useEffect)(
                    function () {
                        function e(e) {
                            a.current(e);
                        }
                        return (
                            document.addEventListener(t, e, r),
                            function () {
                                return document.removeEventListener(t, e, r);
                            }
                        );
                    },
                    [t, r]
                );
            }
            function lt(t, n, r) {
                var a = ce(n);
                (0, e.useEffect)(
                    function () {
                        function e(e) {
                            a.current(e);
                        }
                        return (
                            window.addEventListener(t, e, r),
                            function () {
                                return window.removeEventListener(t, e, r);
                            }
                        );
                    },
                    [t, r]
                );
            }
            function st() {
                for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++) n[r] = arguments[r];
                return (0, e.useMemo)(function () {
                    return X.apply(void 0, n);
                }, [].concat(n));
            }
            var ut = (function (e) {
                return (e[(e.Forwards = 0)] = "Forwards"), (e[(e.Backwards = 1)] = "Backwards"), e;
            })(ut || {});
            function ct() {
                var t = (0, e.useRef)(0);
                return (
                    lt(
                        "keydown",
                        function (e) {
                            "Tab" === e.key && (t.current = e.shiftKey ? 1 : 0);
                        },
                        !0
                    ),
                    t
                );
            }
            var dt = n(164),
                ft = (0, e.createContext)(!1);
            function ht() {
                return (0, e.useContext)(ft);
            }
            var pt = ["target"];
            var mt = e.Fragment;
            var vt = e.Fragment,
                gt = (0, e.createContext)(null);
            var yt = (0, e.createContext)(null);
            var bt,
                xt = M(function (t, n) {
                    var r = t,
                        a = (0, e.useRef)(null),
                        o = pe(
                            he(function (e) {
                                a.current = e;
                            }),
                            n
                        ),
                        i = st(a),
                        l = (function (t) {
                            var n = ht(),
                                r = (0, e.useContext)(gt),
                                a = st(t),
                                o = (0, e.useState)(function () {
                                    if ((!n && null !== r) || G.isServer) return null;
                                    var e = null == a ? void 0 : a.getElementById("headlessui-portal-root");
                                    if (e) return e;
                                    if (null === a) return null;
                                    var t = a.createElement("div");
                                    return t.setAttribute("id", "headlessui-portal-root"), a.body.appendChild(t);
                                }),
                                i = j(o, 2),
                                l = i[0],
                                s = i[1];
                            return (
                                (0, e.useEffect)(
                                    function () {
                                        null !== l && ((null != a && a.body.contains(l)) || null == a || a.body.appendChild(l));
                                    },
                                    [l, a]
                                ),
                                (0, e.useEffect)(
                                    function () {
                                        n || (null !== r && s(r.current));
                                    },
                                    [r, s, n]
                                ),
                                l
                            );
                        })(a),
                        s = (0, e.useState)(function () {
                            var e;
                            return G.isServer ? null : null != (e = null == i ? void 0 : i.createElement("div")) ? e : null;
                        }),
                        u = j(s, 1)[0],
                        c = (0, e.useContext)(yt),
                        d = Y();
                    return (
                        Q(
                            function () {
                                !l || !u || l.contains(u) || (u.setAttribute("data-headlessui-portal", ""), l.appendChild(u));
                            },
                            [l, u]
                        ),
                        Q(
                            function () {
                                if (u && c) return c.register(u);
                            },
                            [c, u]
                        ),
                        (function (t) {
                            var n = de(t),
                                r = (0, e.useRef)(!1);
                            (0, e.useEffect)(
                                function () {
                                    return (
                                        (r.current = !1),
                                        function () {
                                            (r.current = !0),
                                                we(function () {
                                                    r.current && n();
                                                });
                                        }
                                    );
                                },
                                [n]
                            );
                        })(function () {
                            var e;
                            !l || !u || (u instanceof Node && l.contains(u) && l.removeChild(u), l.childNodes.length <= 0 && (null == (e = l.parentElement) || e.removeChild(l)));
                        }),
                        d && l && u ? (0, dt.createPortal)(I({ ourProps: { ref: o }, theirProps: r, defaultTag: mt, name: "Portal" }), u) : null
                    );
                }),
                wt = M(function (t, n) {
                    var r = t.target,
                        a = u(t, pt),
                        o = { ref: pe(n) };
                    return e.createElement(gt.Provider, { value: r }, I({ ourProps: o, theirProps: a, defaultTag: vt, name: "Popover.Group" }));
                }),
                kt = (Object.assign(xt, { Group: wt }), ["__demoMode"]),
                Ct = ["id"],
                jt = ["id"],
                St = ["id", "focus"],
                Et = (function (e) {
                    return (e[(e.Open = 0)] = "Open"), (e[(e.Closed = 1)] = "Closed"), e;
                })(Et || {}),
                Nt = (function (e) {
                    return (
                        (e[(e.TogglePopover = 0)] = "TogglePopover"),
                        (e[(e.ClosePopover = 1)] = "ClosePopover"),
                        (e[(e.SetButton = 2)] = "SetButton"),
                        (e[(e.SetButtonId = 3)] = "SetButtonId"),
                        (e[(e.SetPanel = 4)] = "SetPanel"),
                        (e[(e.SetPanelId = 5)] = "SetPanelId"),
                        e
                    );
                })(Nt || {}),
                Pt =
                    (i((bt = {}), 0, function (e) {
                        var t,
                            n = s(s({}, e), {}, { popoverState: P(e.popoverState, ((t = {}), i(t, 0, 1), i(t, 1, 0), t)) });
                        return 0 === n.popoverState && (n.__demoMode = !1), n;
                    }),
                        i(bt, 1, function (e) {
                            return 1 === e.popoverState ? e : s(s({}, e), {}, { popoverState: 1 });
                        }),
                        i(bt, 2, function (e, t) {
                            return e.button === t.button ? e : s(s({}, e), {}, { button: t.button });
                        }),
                        i(bt, 3, function (e, t) {
                            return e.buttonId === t.buttonId ? e : s(s({}, e), {}, { buttonId: t.buttonId });
                        }),
                        i(bt, 4, function (e, t) {
                            return e.panel === t.panel ? e : s(s({}, e), {}, { panel: t.panel });
                        }),
                        i(bt, 5, function (e, t) {
                            return e.panelId === t.panelId ? e : s(s({}, e), {}, { panelId: t.panelId });
                        }),
                        bt),
                Tt = (0, e.createContext)(null);
            function Ot(t) {
                var n = (0, e.useContext)(Tt);
                if (null === n) {
                    var r = new Error("<".concat(t, " /> is missing a parent <Popover /> component."));
                    throw (Error.captureStackTrace && Error.captureStackTrace(r, Ot), r);
                }
                return n;
            }
            Tt.displayName = "PopoverContext";
            var Rt = (0, e.createContext)(null);
            function At(t) {
                var n = (0, e.useContext)(Rt);
                if (null === n) {
                    var r = new Error("<".concat(t, " /> is missing a parent <Popover /> component."));
                    throw (Error.captureStackTrace && Error.captureStackTrace(r, At), r);
                }
                return n;
            }
            Rt.displayName = "PopoverAPIContext";
            var Lt = (0, e.createContext)(null);
            function It() {
                return (0, e.useContext)(Lt);
            }
            Lt.displayName = "PopoverGroupContext";
            var _t = (0, e.createContext)(null);
            function Dt(e, t) {
                return P(t.type, Pt, e, t);
            }
            _t.displayName = "PopoverPanelContext";
            var Mt = A.RenderStrategy | A.Static;
            var Ft = A.RenderStrategy | A.Static;
            var zt = M(function (t, n) {
                var r,
                    a,
                    o = t.__demoMode,
                    l = void 0 !== o && o,
                    s = u(t, kt),
                    c = (0, e.useRef)(null),
                    d = pe(
                        n,
                        he(function (e) {
                            c.current = e;
                        })
                    ),
                    f = (0, e.useRef)([]),
                    h = (0, e.useReducer)(Dt, {
                        __demoMode: l,
                        popoverState: l ? 0 : 1,
                        buttons: f,
                        button: null,
                        buttonId: null,
                        panel: null,
                        panelId: null,
                        beforePanelSentinel: (0, e.createRef)(),
                        afterPanelSentinel: (0, e.createRef)(),
                    }),
                    p = j(h, 2),
                    m = p[0],
                    v = m.popoverState,
                    g = m.button,
                    y = m.buttonId,
                    b = m.panel,
                    x = m.panelId,
                    k = m.beforePanelSentinel,
                    C = m.afterPanelSentinel,
                    S = p[1],
                    E = st(null != (a = c.current) ? a : g),
                    N = (0, e.useMemo)(
                        function () {
                            if (!g || !b) return !1;
                            var e,
                                t = w(document.querySelectorAll("body > *"));
                            try {
                                for (t.s(); !(e = t.n()).done;) {
                                    var n = e.value;
                                    if (Number(null == n ? void 0 : n.contains(g)) ^ Number(null == n ? void 0 : n.contains(b))) return !0;
                                }
                            } catch (u) {
                                t.e(u);
                            } finally {
                                t.f();
                            }
                            var r = re(),
                                a = r.indexOf(g),
                                o = (a + r.length - 1) % r.length,
                                i = (a + 1) % r.length,
                                l = r[o],
                                s = r[i];
                            return !b.contains(l) && !b.contains(s);
                        },
                        [g, b]
                    ),
                    T = ce(y),
                    O = ce(x),
                    R = (0, e.useMemo)(
                        function () {
                            return {
                                buttonId: T,
                                panelId: O,
                                close: function () {
                                    return S({ type: 1 });
                                },
                            };
                        },
                        [T, O, S]
                    ),
                    A = It(),
                    L = null == A ? void 0 : A.registerPopover,
                    _ = de(function () {
                        var e;
                        return null != (e = null == A ? void 0 : A.isFocusWithinPopoverGroup())
                            ? e
                            : (null == E ? void 0 : E.activeElement) && ((null == g ? void 0 : g.contains(E.activeElement)) || (null == b ? void 0 : b.contains(E.activeElement)));
                    });
                (0, e.useEffect)(
                    function () {
                        return null == L ? void 0 : L(R);
                    },
                    [L, R]
                );
                var D = (function () {
                    var t = (0, e.useContext)(yt),
                        n = (0, e.useRef)([]),
                        r = de(function (e) {
                            return (
                                n.current.push(e),
                                t && t.register(e),
                                function () {
                                    return a(e);
                                }
                            );
                        }),
                        a = de(function (e) {
                            var r = n.current.indexOf(e);
                            -1 !== r && n.current.splice(r, 1), t && t.unregister(e);
                        }),
                        o = (0, e.useMemo)(
                            function () {
                                return { register: r, unregister: a, portals: n };
                            },
                            [r, a, n]
                        );
                    return [
                        n,
                        (0, e.useMemo)(
                            function () {
                                return function (t) {
                                    var n = t.children;
                                    return e.createElement(yt.Provider, { value: o }, n);
                                };
                            },
                            [o]
                        ),
                    ];
                })(),
                    M = j(D, 2),
                    F = M[0],
                    z = M[1],
                    U = (function () {
                        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                            n = t.defaultContainers,
                            r = void 0 === n ? [] : n,
                            a = t.portals,
                            o = (0, e.useRef)(null),
                            i = st(o),
                            l = de(function () {
                                var e,
                                    t,
                                    n = [],
                                    l = w(r);
                                try {
                                    for (l.s(); !(t = l.n()).done;) {
                                        var s = t.value;
                                        null !== s && (s instanceof HTMLElement ? n.push(s) : "current" in s && s.current instanceof HTMLElement && n.push(s.current));
                                    }
                                } catch (m) {
                                    l.e(m);
                                } finally {
                                    l.f();
                                }
                                if (null != a && a.current) {
                                    var u,
                                        c = w(a.current);
                                    try {
                                        for (c.s(); !(u = c.n()).done;) {
                                            var d = u.value;
                                            n.push(d);
                                        }
                                    } catch (m) {
                                        c.e(m);
                                    } finally {
                                        c.f();
                                    }
                                }
                                var f,
                                    h = w(null != (e = null == i ? void 0 : i.querySelectorAll("html > *, body > *")) ? e : []);
                                try {
                                    var p = function () {
                                        var e = f.value;
                                        e !== document.body &&
                                            e !== document.head &&
                                            e instanceof HTMLElement &&
                                            "headlessui-portal-root" !== e.id &&
                                            (e.contains(o.current) ||
                                                n.some(function (t) {
                                                    return e.contains(t);
                                                }) ||
                                                n.push(e));
                                    };
                                    for (h.s(); !(f = h.n()).done;) p();
                                } catch (m) {
                                    h.e(m);
                                } finally {
                                    h.f();
                                }
                                return n;
                            });
                        return {
                            resolveContainers: l,
                            contains: de(function (e) {
                                return l().some(function (t) {
                                    return t.contains(e);
                                });
                            }),
                            mainTreeNodeRef: o,
                            MainTreeNode: (0, e.useMemo)(
                                function () {
                                    return function () {
                                        return e.createElement(be, { features: ye.Hidden, ref: o });
                                    };
                                },
                                [o]
                            ),
                        };
                    })({ portals: F, defaultContainers: [g, b] });
                (function (t, n, r, a) {
                    var o = ce(r);
                    (0, e.useEffect)(
                        function () {
                            function e(e) {
                                o.current(e);
                            }
                            return (
                                (t = null != t ? t : window).addEventListener(n, e, a),
                                function () {
                                    return t.removeEventListener(n, e, a);
                                }
                            );
                        },
                        [t, n, a]
                    );
                })(
                    null == E ? void 0 : E.defaultView,
                    "focus",
                    function (e) {
                        var t, n, r, a;
                        e.target !== window &&
                            e.target instanceof HTMLElement &&
                            0 === v &&
                            (_() ||
                                (g &&
                                    b &&
                                    (U.contains(e.target) ||
                                        (null != (n = null == (t = k.current) ? void 0 : t.contains) && n.call(t, e.target)) ||
                                        (null != (a = null == (r = C.current) ? void 0 : r.contains) && a.call(r, e.target)) ||
                                        S({ type: 1 }))));
                    },
                    !0
                ),
                    (function (t, n) {
                        var r = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2],
                            a = (0, e.useRef)(!1);
                        function o(e, r) {
                            if (a.current && !e.defaultPrevented) {
                                var o = r(e);
                                if (null !== o && o.getRootNode().contains(o)) {
                                    var i,
                                        l = (function e(t) {
                                            return "function" == typeof t ? e(t()) : Array.isArray(t) || t instanceof Set ? t : [t];
                                        })(t),
                                        s = w(l);
                                    try {
                                        for (s.s(); !(i = s.n()).done;) {
                                            var u = i.value;
                                            if (null !== u) {
                                                var c = u instanceof HTMLElement ? u : u.current;
                                                if ((null != c && c.contains(o)) || (e.composed && e.composedPath().includes(c))) return;
                                            }
                                        }
                                    } catch (d) {
                                        s.e(d);
                                    } finally {
                                        s.f();
                                    }
                                    return !oe(o, ae.Loose) && -1 !== o.tabIndex && e.preventDefault(), n(e, o);
                                }
                            }
                        }
                        (0, e.useEffect)(
                            function () {
                                requestAnimationFrame(function () {
                                    a.current = r;
                                });
                            },
                            [r]
                        );
                        var i = (0, e.useRef)(null);
                        it(
                            "mousedown",
                            function (e) {
                                var t, n;
                                a.current && (i.current = (null == (n = null == (t = e.composedPath) ? void 0 : t.call(e)) ? void 0 : n[0]) || e.target);
                            },
                            !0
                        ),
                            it(
                                "click",
                                function (e) {
                                    i.current &&
                                        (o(e, function () {
                                            return i.current;
                                        }),
                                            (i.current = null));
                                },
                                !0
                            ),
                            lt(
                                "blur",
                                function (e) {
                                    return o(e, function () {
                                        return window.document.activeElement instanceof HTMLIFrameElement ? window.document.activeElement : null;
                                    });
                                },
                                !0
                            );
                    })(
                        U.resolveContainers,
                        function (e, t) {
                            S({ type: 1 }), oe(t, ae.Loose) || (e.preventDefault(), null == g || g.focus());
                        },
                        0 === v
                    );
                var B = de(function (e) {
                    S({ type: 1 });
                    var t = e ? (e instanceof HTMLElement ? e : "current" in e && e.current instanceof HTMLElement ? e.current : g) : g;
                    null == t || t.focus();
                }),
                    W = (0, e.useMemo)(
                        function () {
                            return { close: B, isPortalled: N };
                        },
                        [B, N]
                    ),
                    V = (0, e.useMemo)(
                        function () {
                            return { open: 0 === v, close: B };
                        },
                        [v, B]
                    ),
                    H = { ref: d };
                return e.createElement(
                    _t.Provider,
                    { value: null },
                    e.createElement(
                        Tt.Provider,
                        { value: h },
                        e.createElement(
                            Rt.Provider,
                            { value: W },
                            e.createElement(
                                ot,
                                { value: P(v, ((r = {}), i(r, 0, rt.Open), i(r, 1, rt.Closed), r)) },
                                e.createElement(z, null, I({ ourProps: H, theirProps: s, slot: V, defaultTag: "div", name: "Popover" }), e.createElement(U.MainTreeNode, null))
                            )
                        )
                    )
                );
            }),
                Ut = M(function (t, n) {
                    var r = K(),
                        a = t.id,
                        o = void 0 === a ? "headlessui-popover-button-".concat(r) : a,
                        l = u(t, Ct),
                        s = j(Ot("Popover.Button"), 2),
                        c = s[0],
                        d = s[1],
                        f = At("Popover.Button").isPortalled,
                        h = (0, e.useRef)(null),
                        p = "headlessui-focus-sentinel-".concat(K()),
                        m = It(),
                        v = null == m ? void 0 : m.closeOthers,
                        g = null !== (0, e.useContext)(_t);
                    (0, e.useEffect)(
                        function () {
                            if (!g)
                                return (
                                    d({ type: 3, buttonId: o }),
                                    function () {
                                        d({ type: 3, buttonId: null });
                                    }
                                );
                        },
                        [g, o, d]
                    );
                    var y = j(
                        (0, e.useState)(function () {
                            return Symbol();
                        }),
                        1
                    )[0],
                        b = pe(
                            h,
                            n,
                            g
                                ? null
                                : function (e) {
                                    if (e) c.buttons.current.push(y);
                                    else {
                                        var t = c.buttons.current.indexOf(y);
                                        -1 !== t && c.buttons.current.splice(t, 1);
                                    }
                                    c.buttons.current.length > 1 && console.warn("You are already using a <Popover.Button /> but only 1 <Popover.Button /> is supported."), e && d({ type: 2, button: e });
                                }
                        ),
                        x = pe(h, n),
                        w = st(h),
                        k = de(function (e) {
                            var t, n, r;
                            if (g) {
                                if (1 === c.popoverState) return;
                                switch (e.key) {
                                    case Z.Space:
                                    case Z.Enter:
                                        e.preventDefault(), null == (n = (t = e.target).click) || n.call(t), d({ type: 1 }), null == (r = c.button) || r.focus();
                                }
                            } else
                                switch (e.key) {
                                    case Z.Space:
                                    case Z.Enter:
                                        e.preventDefault(), e.stopPropagation(), 1 === c.popoverState && (null == v || v(c.buttonId)), d({ type: 0 });
                                        break;
                                    case Z.Escape:
                                        if (0 !== c.popoverState) return null == v ? void 0 : v(c.buttonId);
                                        if (!h.current || (null != w && w.activeElement && !h.current.contains(w.activeElement))) return;
                                        e.preventDefault(), e.stopPropagation(), d({ type: 1 });
                                }
                        }),
                        C = de(function (e) {
                            g || (e.key === Z.Space && e.preventDefault());
                        }),
                        S = de(function (e) {
                            var n, r;
                            tt(e.currentTarget) ||
                                t.disabled ||
                                (g
                                    ? (d({ type: 1 }), null == (n = c.button) || n.focus())
                                    : (e.preventDefault(), e.stopPropagation(), 1 === c.popoverState && (null == v || v(c.buttonId)), d({ type: 0 }), null == (r = c.button) || r.focus()));
                        }),
                        E = de(function (e) {
                            e.preventDefault(), e.stopPropagation();
                        }),
                        N = 0 === c.popoverState,
                        T = (0, e.useMemo)(
                            function () {
                                return { open: N };
                            },
                            [N]
                        ),
                        O = ve(t, h),
                        R = g
                            ? { ref: x, type: O, onKeyDown: k, onClick: S }
                            : { ref: b, id: c.buttonId, type: O, "aria-expanded": t.disabled ? void 0 : 0 === c.popoverState, "aria-controls": c.panel ? c.panelId : void 0, onKeyDown: k, onKeyUp: C, onClick: S, onMouseDown: E },
                        A = ct(),
                        L = de(function () {
                            var e = c.panel;
                            e &&
                                (function () {
                                    var t, n;
                                    P(
                                        A.current,
                                        (i((t = {}), ut.Forwards, function () {
                                            return ue(e, ee.First);
                                        }),
                                            i(t, ut.Backwards, function () {
                                                return ue(e, ee.Last);
                                            }),
                                            t)
                                    ) === te.Error &&
                                        ue(
                                            re().filter(function (e) {
                                                return "true" !== e.dataset.headlessuiFocusGuard;
                                            }),
                                            P(A.current, (i((n = {}), ut.Forwards, ee.Next), i(n, ut.Backwards, ee.Previous), n)),
                                            { relativeTo: c.button }
                                        );
                                })();
                        });
                    return e.createElement(
                        e.Fragment,
                        null,
                        I({ ourProps: R, theirProps: l, slot: T, defaultTag: "button", name: "Popover.Button" }),
                        N && !g && f && e.createElement(be, { id: p, features: ye.Focusable, "data-headlessui-focus-guard": !0, as: "button", type: "button", onFocus: L })
                    );
                }),
                Bt = M(function (t, n) {
                    var r = K(),
                        a = t.id,
                        o = void 0 === a ? "headlessui-popover-overlay-".concat(r) : a,
                        i = u(t, jt),
                        l = j(Ot("Popover.Overlay"), 2),
                        s = l[0].popoverState,
                        c = l[1],
                        d = pe(n),
                        f = at(),
                        h = null !== f ? (f & rt.Open) === rt.Open : 0 === s,
                        p = de(function (e) {
                            if (tt(e.currentTarget)) return e.preventDefault();
                            c({ type: 1 });
                        });
                    return I({
                        ourProps: { ref: d, id: o, "aria-hidden": !0, onClick: p },
                        theirProps: i,
                        slot: (0, e.useMemo)(
                            function () {
                                return { open: 0 === s };
                            },
                            [s]
                        ),
                        defaultTag: "div",
                        features: Mt,
                        visible: h,
                        name: "Popover.Overlay",
                    });
                }),
                Wt = M(function (t, n) {
                    var r = K(),
                        a = t.id,
                        o = void 0 === a ? "headlessui-popover-panel-".concat(r) : a,
                        l = t.focus,
                        s = void 0 !== l && l,
                        c = u(t, St),
                        d = j(Ot("Popover.Panel"), 2),
                        f = d[0],
                        h = d[1],
                        p = At("Popover.Panel"),
                        m = p.close,
                        v = p.isPortalled,
                        g = "headlessui-focus-sentinel-before-".concat(K()),
                        y = "headlessui-focus-sentinel-after-".concat(K()),
                        b = (0, e.useRef)(null),
                        x = pe(b, n, function (e) {
                            h({ type: 4, panel: e });
                        }),
                        k = st(b);
                    Q(
                        function () {
                            return (
                                h({ type: 5, panelId: o }),
                                function () {
                                    h({ type: 5, panelId: null });
                                }
                            );
                        },
                        [o, h]
                    );
                    var C = at(),
                        S = null !== C ? (C & rt.Open) === rt.Open : 0 === f.popoverState,
                        N = de(function (e) {
                            var t;
                            if (e.key === Z.Escape) {
                                if (0 !== f.popoverState || !b.current || (null != k && k.activeElement && !b.current.contains(k.activeElement))) return;
                                e.preventDefault(), e.stopPropagation(), h({ type: 1 }), null == (t = f.button) || t.focus();
                            }
                        });
                    (0, e.useEffect)(
                        function () {
                            var e;
                            t.static || (1 === f.popoverState && (null == (e = t.unmount) || e) && h({ type: 4, panel: null }));
                        },
                        [f.popoverState, t.unmount, t.static, h]
                    ),
                        (0, e.useEffect)(
                            function () {
                                if (!f.__demoMode && s && 0 === f.popoverState && b.current) {
                                    var e = null == k ? void 0 : k.activeElement;
                                    b.current.contains(e) || ue(b.current, ee.First);
                                }
                            },
                            [f.__demoMode, s, b, f.popoverState]
                        );
                    var T = (0, e.useMemo)(
                        function () {
                            return { open: 0 === f.popoverState, close: m };
                        },
                        [f, m]
                    ),
                        O = {
                            ref: x,
                            id: o,
                            onKeyDown: N,
                            onBlur:
                                s && 0 === f.popoverState
                                    ? function (e) {
                                        var t,
                                            n,
                                            r,
                                            a,
                                            o,
                                            i = e.relatedTarget;
                                        i &&
                                            b.current &&
                                            ((null != (t = b.current) && t.contains(i)) ||
                                                (h({ type: 1 }),
                                                    ((null != (r = null == (n = f.beforePanelSentinel.current) ? void 0 : n.contains) && r.call(n, i)) ||
                                                        (null != (o = null == (a = f.afterPanelSentinel.current) ? void 0 : a.contains) && o.call(a, i))) &&
                                                    i.focus({ preventScroll: !0 })));
                                    }
                                    : void 0,
                            tabIndex: -1,
                        },
                        R = ct(),
                        A = de(function () {
                            var e = b.current;
                            e &&
                                (function () {
                                    var t;
                                    P(
                                        R.current,
                                        (i((t = {}), ut.Forwards, function () {
                                            var t;
                                            ue(e, ee.First) === te.Error && (null == (t = f.afterPanelSentinel.current) || t.focus());
                                        }),
                                            i(t, ut.Backwards, function () {
                                                var e;
                                                null == (e = f.button) || e.focus({ preventScroll: !0 });
                                            }),
                                            t)
                                    );
                                })();
                        }),
                        L = de(function () {
                            var e = b.current;
                            e &&
                                (function () {
                                    var t;
                                    P(
                                        R.current,
                                        (i((t = {}), ut.Forwards, function () {
                                            var e;
                                            if (f.button) {
                                                var t,
                                                    n = re(),
                                                    r = n.indexOf(f.button),
                                                    a = n.slice(0, r + 1),
                                                    o = [].concat(E(n.slice(r + 1)), E(a)),
                                                    i = w(o.slice());
                                                try {
                                                    for (i.s(); !(t = i.n()).done;) {
                                                        var l = t.value;
                                                        if ("true" === l.dataset.headlessuiFocusGuard || (null != (e = f.panel) && e.contains(l))) {
                                                            var s = o.indexOf(l);
                                                            -1 !== s && o.splice(s, 1);
                                                        }
                                                    }
                                                } catch (u) {
                                                    i.e(u);
                                                } finally {
                                                    i.f();
                                                }
                                                ue(o, ee.First, { sorted: !1 });
                                            }
                                        }),
                                            i(t, ut.Backwards, function () {
                                                var t;
                                                ue(e, ee.Previous) === te.Error && (null == (t = f.button) || t.focus());
                                            }),
                                            t)
                                    );
                                })();
                        });
                    return e.createElement(
                        _t.Provider,
                        { value: o },
                        S && v && e.createElement(be, { id: g, ref: f.beforePanelSentinel, features: ye.Focusable, "data-headlessui-focus-guard": !0, as: "button", type: "button", onFocus: A }),
                        I({ ourProps: O, theirProps: c, slot: T, defaultTag: "div", features: Ft, visible: S, name: "Popover.Panel" }),
                        S && v && e.createElement(be, { id: y, ref: f.afterPanelSentinel, features: ye.Focusable, "data-headlessui-focus-guard": !0, as: "button", type: "button", onFocus: L })
                    );
                }),
                Vt = M(function (t, n) {
                    var r = (0, e.useRef)(null),
                        a = pe(r, n),
                        o = j((0, e.useState)([]), 2),
                        i = o[0],
                        l = o[1],
                        s = de(function (e) {
                            l(function (t) {
                                var n = t.indexOf(e);
                                if (-1 !== n) {
                                    var r = t.slice();
                                    return r.splice(n, 1), r;
                                }
                                return t;
                            });
                        }),
                        u = de(function (e) {
                            return (
                                l(function (t) {
                                    return [].concat(E(t), [e]);
                                }),
                                function () {
                                    return s(e);
                                }
                            );
                        }),
                        c = de(function () {
                            var e,
                                t = X(r);
                            if (!t) return !1;
                            var n = t.activeElement;
                            return (
                                !(null == (e = r.current) || !e.contains(n)) ||
                                i.some(function (e) {
                                    var r, a;
                                    return (null == (r = t.getElementById(e.buttonId.current)) ? void 0 : r.contains(n)) || (null == (a = t.getElementById(e.panelId.current)) ? void 0 : a.contains(n));
                                })
                            );
                        }),
                        d = de(function (e) {
                            var t,
                                n = w(i);
                            try {
                                for (n.s(); !(t = n.n()).done;) {
                                    var r = t.value;
                                    r.buttonId.current !== e && r.close();
                                }
                            } catch (a) {
                                n.e(a);
                            } finally {
                                n.f();
                            }
                        }),
                        f = (0, e.useMemo)(
                            function () {
                                return { registerPopover: u, unregisterPopover: s, isFocusWithinPopoverGroup: c, closeOthers: d };
                            },
                            [u, s, c, d]
                        ),
                        h = (0, e.useMemo)(function () {
                            return {};
                        }, []),
                        p = t,
                        m = { ref: a };
                    return e.createElement(Lt.Provider, { value: f }, I({ ourProps: m, theirProps: p, slot: h, defaultTag: "div", name: "Popover.Group" }));
                }),
                Ht = Object.assign(zt, { Button: Ut, Overlay: Bt, Panel: Wt, Group: Vt });
            function qt() {
                var t = (0, e.useRef)(!1);
                return (
                    Q(function () {
                        return (
                            (t.current = !0),
                            function () {
                                t.current = !1;
                            }
                        );
                    }, []),
                    t
                );
            }
            function $t() {
                var e = [],
                    t = {
                        addEventListener: function (e, n, r, a) {
                            return (
                                e.addEventListener(n, r, a),
                                t.add(function () {
                                    return e.removeEventListener(n, r, a);
                                })
                            );
                        },
                        requestAnimationFrame: (function (e) {
                            function t() {
                                return e.apply(this, arguments);
                            }
                            return (
                                (t.toString = function () {
                                    return e.toString();
                                }),
                                t
                            );
                        })(function () {
                            var e = requestAnimationFrame.apply(void 0, arguments);
                            return t.add(function () {
                                return cancelAnimationFrame(e);
                            });
                        }),
                        nextFrame: function () {
                            for (var e = arguments.length, n = new Array(e), r = 0; r < e; r++) n[r] = arguments[r];
                            return t.requestAnimationFrame(function () {
                                return t.requestAnimationFrame.apply(t, n);
                            });
                        },
                        setTimeout: (function (e) {
                            function t() {
                                return e.apply(this, arguments);
                            }
                            return (
                                (t.toString = function () {
                                    return e.toString();
                                }),
                                t
                            );
                        })(function () {
                            var e = setTimeout.apply(void 0, arguments);
                            return t.add(function () {
                                return clearTimeout(e);
                            });
                        }),
                        microTask: function () {
                            for (var e = arguments.length, n = new Array(e), r = 0; r < e; r++) n[r] = arguments[r];
                            var a = { current: !0 };
                            return (
                                we(function () {
                                    a.current && n[0]();
                                }),
                                t.add(function () {
                                    a.current = !1;
                                })
                            );
                        },
                        style: function (e, t, n) {
                            var r = e.style.getPropertyValue(t);
                            return (
                                Object.assign(e.style, i({}, t, n)),
                                this.add(function () {
                                    Object.assign(e.style, i({}, t, r));
                                })
                            );
                        },
                        group: function (e) {
                            var t = $t();
                            return (
                                e(t),
                                this.add(function () {
                                    return t.dispose();
                                })
                            );
                        },
                        add: function (t) {
                            return (
                                e.push(t),
                                function () {
                                    var n = e.indexOf(t);
                                    if (n >= 0) {
                                        var r,
                                            a = w(e.splice(n, 1));
                                        try {
                                            for (a.s(); !(r = a.n()).done;) {
                                                (0, r.value)();
                                            }
                                        } catch (o) {
                                            a.e(o);
                                        } finally {
                                            a.f();
                                        }
                                    }
                                }
                            );
                        },
                        dispose: function () {
                            var t,
                                n = w(e.splice(0));
                            try {
                                for (n.s(); !(t = n.n()).done;) {
                                    (0, t.value)();
                                }
                            } catch (r) {
                                n.e(r);
                            } finally {
                                n.f();
                            }
                        },
                    };
                return t;
            }
            function Gt(e) {
                for (var t, n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), a = 1; a < n; a++) r[a - 1] = arguments[a];
                e && r.length > 0 && (t = e.classList).add.apply(t, r);
            }
            function Qt(e) {
                for (var t, n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), a = 1; a < n; a++) r[a - 1] = arguments[a];
                e && r.length > 0 && (t = e.classList).remove.apply(t, r);
            }
            function Yt(e, t, n, r) {
                var a = n ? "enter" : "leave",
                    o = $t(),
                    i =
                        void 0 !== r
                            ? (function (e) {
                                var t = { called: !1 };
                                return function () {
                                    if (!t.called) return (t.called = !0), e.apply(void 0, arguments);
                                };
                            })(r)
                            : function () { };
                "enter" === a && (e.removeAttribute("hidden"), (e.style.display = ""));
                var l = P(a, {
                    enter: function () {
                        return t.enter;
                    },
                    leave: function () {
                        return t.leave;
                    },
                }),
                    s = P(a, {
                        enter: function () {
                            return t.enterTo;
                        },
                        leave: function () {
                            return t.leaveTo;
                        },
                    }),
                    u = P(a, {
                        enter: function () {
                            return t.enterFrom;
                        },
                        leave: function () {
                            return t.leaveFrom;
                        },
                    });
                return (
                    Qt.apply(void 0, [e].concat(E(t.enter), E(t.enterTo), E(t.enterFrom), E(t.leave), E(t.leaveFrom), E(t.leaveTo), E(t.entered))),
                    Gt.apply(void 0, [e].concat(E(l), E(u))),
                    o.nextFrame(function () {
                        Qt.apply(void 0, [e].concat(E(u))),
                            Gt.apply(void 0, [e].concat(E(s))),
                            (function (e, t) {
                                var n = $t();
                                if (!e) return n.dispose;
                                var r = getComputedStyle(e),
                                    a = [r.transitionDuration, r.transitionDelay].map(function (e) {
                                        var t = e
                                            .split(",")
                                            .filter(Boolean)
                                            .map(function (e) {
                                                return e.includes("ms") ? parseFloat(e) : 1e3 * parseFloat(e);
                                            })
                                            .sort(function (e, t) {
                                                return t - e;
                                            }),
                                            n = j(t, 1)[0];
                                        return void 0 === n ? 0 : n;
                                    }),
                                    o = j(a, 2),
                                    i = o[0] + o[1];
                                if (0 !== i) {
                                    n.group(function (n) {
                                        n.setTimeout(function () {
                                            t(), n.dispose();
                                        }, i),
                                            n.addEventListener(e, "transitionrun", function (e) {
                                                e.target === e.currentTarget && n.dispose();
                                            });
                                    });
                                    var l = n.addEventListener(e, "transitionend", function (e) {
                                        e.target === e.currentTarget && (t(), l());
                                    });
                                } else t();
                                n.add(function () {
                                    return t();
                                }),
                                    n.dispose;
                            })(e, function () {
                                return Qt.apply(void 0, [e].concat(E(l))), Gt.apply(void 0, [e].concat(E(t.entered))), i();
                            });
                    }),
                    o.dispose
                );
            }
            function Kt() {
                var t = j((0, e.useState)($t), 1)[0];
                return (
                    (0, e.useEffect)(
                        function () {
                            return function () {
                                return t.dispose();
                            };
                        },
                        [t]
                    ),
                    t
                );
            }
            var Zt = ["beforeEnter", "afterEnter", "beforeLeave", "afterLeave", "enter", "enterFrom", "enterTo", "entered", "leave", "leaveFrom", "leaveTo"],
                Xt = ["show", "appear", "unmount"];
            function Jt() {
                return (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "").split(" ").filter(function (e) {
                    return e.trim().length > 1;
                });
            }
            var en = (0, e.createContext)(null);
            en.displayName = "TransitionContext";
            var tn = (function (e) {
                return (e.Visible = "visible"), (e.Hidden = "hidden"), e;
            })(tn || {});
            var nn = (0, e.createContext)(null);
            function rn(e) {
                return "children" in e
                    ? rn(e.children)
                    : e.current
                        .filter(function (e) {
                            return null !== e.el.current;
                        })
                        .filter(function (e) {
                            return "visible" === e.state;
                        }).length > 0;
            }
            function an(t, n) {
                var r = ce(t),
                    a = (0, e.useRef)([]),
                    o = qt(),
                    l = Kt(),
                    s = de(function (e) {
                        var t,
                            n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : L.Hidden,
                            s = a.current.findIndex(function (t) {
                                return t.el === e;
                            });
                        -1 !== s &&
                            (P(
                                n,
                                (i((t = {}), L.Unmount, function () {
                                    a.current.splice(s, 1);
                                }),
                                    i(t, L.Hidden, function () {
                                        a.current[s].state = "hidden";
                                    }),
                                    t)
                            ),
                                l.microTask(function () {
                                    var e;
                                    !rn(a) && o.current && (null == (e = r.current) || e.call(r));
                                }));
                    }),
                    u = de(function (e) {
                        var t = a.current.find(function (t) {
                            return t.el === e;
                        });
                        return (
                            t ? "visible" !== t.state && (t.state = "visible") : a.current.push({ el: e, state: "visible" }),
                            function () {
                                return s(e, L.Unmount);
                            }
                        );
                    }),
                    c = (0, e.useRef)([]),
                    d = (0, e.useRef)(Promise.resolve()),
                    f = (0, e.useRef)({ enter: [], leave: [], idle: [] }),
                    h = de(function (e, t, r) {
                        c.current.splice(0),
                            n &&
                            (n.chains.current[t] = n.chains.current[t].filter(function (t) {
                                return j(t, 1)[0] !== e;
                            })),
                            null == n ||
                            n.chains.current[t].push([
                                e,
                                new Promise(function (e) {
                                    c.current.push(e);
                                }),
                            ]),
                            null == n ||
                            n.chains.current[t].push([
                                e,
                                new Promise(function (e) {
                                    Promise.all(
                                        f.current[t].map(function (e) {
                                            var t = j(e, 2);
                                            t[0];
                                            return t[1];
                                        })
                                    ).then(function () {
                                        return e();
                                    });
                                }),
                            ]),
                            "enter" === t
                                ? (d.current = d.current
                                    .then(function () {
                                        return null == n ? void 0 : n.wait.current;
                                    })
                                    .then(function () {
                                        return r(t);
                                    }))
                                : r(t);
                    }),
                    p = de(function (e, t, n) {
                        Promise.all(
                            f.current[t].splice(0).map(function (e) {
                                var t = j(e, 2);
                                t[0];
                                return t[1];
                            })
                        )
                            .then(function () {
                                var e;
                                null == (e = c.current.shift()) || e();
                            })
                            .then(function () {
                                return n(t);
                            });
                    });
                return (0, e.useMemo)(
                    function () {
                        return { children: a, register: u, unregister: s, onStart: h, onStop: p, wait: d, chains: f };
                    },
                    [u, s, a, h, p, f, d]
                );
            }
            function on() { }
            nn.displayName = "NestingContext";
            var ln = ["beforeEnter", "afterEnter", "beforeLeave", "afterLeave"];
            function sn(e) {
                var t,
                    n,
                    r = {},
                    a = w(ln);
                try {
                    for (a.s(); !(n = a.n()).done;) {
                        var o = n.value;
                        r[o] = null != (t = e[o]) ? t : on;
                    }
                } catch (i) {
                    a.e(i);
                } finally {
                    a.f();
                }
                return r;
            }
            var un = A.RenderStrategy;
            var cn = M(function (t, n) {
                var r = t.show,
                    a = t.appear,
                    o = void 0 !== a && a,
                    i = t.unmount,
                    l = u(t, Xt),
                    c = (0, e.useRef)(null),
                    d = pe(c, n);
                Y();
                var f = at();
                if ((void 0 === r && null !== f && (r = (f & rt.Open) === rt.Open), ![!0, !1].includes(r))) throw new Error("A <Transition /> is used but it is missing a `show={true | false}` prop.");
                var h = j((0, e.useState)(r ? "visible" : "hidden"), 2),
                    p = h[0],
                    m = h[1],
                    v = an(function () {
                        m("hidden");
                    }),
                    g = j((0, e.useState)(!0), 2),
                    y = g[0],
                    b = g[1],
                    x = (0, e.useRef)([r]);
                Q(
                    function () {
                        !1 !== y && x.current[x.current.length - 1] !== r && (x.current.push(r), b(!1));
                    },
                    [x, r]
                );
                var w = (0, e.useMemo)(
                    function () {
                        return { show: r, appear: o, initial: y };
                    },
                    [r, o, y]
                );
                (0, e.useEffect)(
                    function () {
                        if (r) m("visible");
                        else if (rn(v)) {
                            var e = c.current;
                            if (!e) return;
                            var t = e.getBoundingClientRect();
                            0 === t.x && 0 === t.y && 0 === t.width && 0 === t.height && m("hidden");
                        } else m("hidden");
                    },
                    [r, v]
                );
                var k = { unmount: i },
                    C = de(function () {
                        var e;
                        y && b(!1), null == (e = t.beforeEnter) || e.call(t);
                    }),
                    S = de(function () {
                        var e;
                        y && b(!1), null == (e = t.beforeLeave) || e.call(t);
                    });
                return e.createElement(
                    nn.Provider,
                    { value: v },
                    e.createElement(
                        en.Provider,
                        { value: w },
                        I({
                            ourProps: s(s({}, k), {}, { as: e.Fragment, children: e.createElement(dn, s(s(s({ ref: d }, k), l), {}, { beforeEnter: C, beforeLeave: S })) }),
                            theirProps: {},
                            defaultTag: e.Fragment,
                            features: un,
                            visible: "visible" === p,
                            name: "Transition",
                        })
                    )
                );
            }),
                dn = M(function (t, n) {
                    var r,
                        a = t.beforeEnter,
                        o = t.afterEnter,
                        l = t.beforeLeave,
                        c = t.afterLeave,
                        d = t.enter,
                        f = t.enterFrom,
                        h = t.enterTo,
                        p = t.entered,
                        m = t.leave,
                        v = t.leaveFrom,
                        g = t.leaveTo,
                        y = u(t, Zt),
                        b = (0, e.useRef)(null),
                        x = pe(b, n),
                        w = y.unmount ? L.Unmount : L.Hidden,
                        k = (function () {
                            var t = (0, e.useContext)(en);
                            if (null === t) throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");
                            return t;
                        })(),
                        C = k.show,
                        S = k.appear,
                        T = k.initial,
                        O = j((0, e.useState)(C ? "visible" : "hidden"), 2),
                        R = O[0],
                        A = O[1],
                        _ = (function () {
                            var t = (0, e.useContext)(nn);
                            if (null === t) throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");
                            return t;
                        })(),
                        D = _.register,
                        M = _.unregister,
                        F = (0, e.useRef)(null);
                    (0, e.useEffect)(
                        function () {
                            return D(b);
                        },
                        [D, b]
                    ),
                        (0, e.useEffect)(
                            function () {
                                var e;
                                if (w === L.Hidden && b.current)
                                    return C && "visible" !== R
                                        ? void A("visible")
                                        : P(
                                            R,
                                            (i((e = {}), "hidden", function () {
                                                return M(b);
                                            }),
                                                i(e, "visible", function () {
                                                    return D(b);
                                                }),
                                                e)
                                        );
                            },
                            [R, b, D, M, C, w]
                        );
                    var z = ce({ enter: Jt(d), enterFrom: Jt(f), enterTo: Jt(h), entered: Jt(p), leave: Jt(m), leaveFrom: Jt(v), leaveTo: Jt(g) }),
                        U = (function (t) {
                            var n = (0, e.useRef)(sn(t));
                            return (
                                (0, e.useEffect)(
                                    function () {
                                        n.current = sn(t);
                                    },
                                    [t]
                                ),
                                n
                            );
                        })({ beforeEnter: a, afterEnter: o, beforeLeave: l, afterLeave: c }),
                        B = Y();
                    (0, e.useEffect)(
                        function () {
                            if (B && "visible" === R && null === b.current) throw new Error("Did you forget to passthrough the `ref` to the actual DOM node?");
                        },
                        [b, R, B]
                    );
                    var W = T && !S,
                        V = !B || W || F.current === C ? "idle" : C ? "enter" : "leave",
                        H = (function () {
                            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
                                n = j((0, e.useState)(t), 2),
                                r = n[0],
                                a = n[1],
                                o = qt(),
                                i = (0, e.useCallback)(
                                    function (e) {
                                        o.current &&
                                            a(function (t) {
                                                return t | e;
                                            });
                                    },
                                    [r, o]
                                ),
                                l = (0, e.useCallback)(
                                    function (e) {
                                        return Boolean(r & e);
                                    },
                                    [r]
                                ),
                                s = (0, e.useCallback)(
                                    function (e) {
                                        o.current &&
                                            a(function (t) {
                                                return t & ~e;
                                            });
                                    },
                                    [a, o]
                                ),
                                u = (0, e.useCallback)(
                                    function (e) {
                                        o.current &&
                                            a(function (t) {
                                                return t ^ e;
                                            });
                                    },
                                    [a]
                                );
                            return { flags: r, addFlag: i, hasFlag: l, removeFlag: s, toggleFlag: u };
                        })(0),
                        q = de(function (e) {
                            return P(e, {
                                enter: function () {
                                    H.addFlag(rt.Opening), U.current.beforeEnter();
                                },
                                leave: function () {
                                    H.addFlag(rt.Closing), U.current.beforeLeave();
                                },
                                idle: function () { },
                            });
                        }),
                        $ = de(function (e) {
                            return P(e, {
                                enter: function () {
                                    H.removeFlag(rt.Opening), U.current.afterEnter();
                                },
                                leave: function () {
                                    H.removeFlag(rt.Closing), U.current.afterLeave();
                                },
                                idle: function () { },
                            });
                        }),
                        G = an(function () {
                            A("hidden"), M(b);
                        }, _);
                    (function (e) {
                        var t = e.container,
                            n = e.direction,
                            r = e.classes,
                            a = e.onStart,
                            o = e.onStop,
                            i = qt(),
                            l = Kt(),
                            s = ce(n);
                        Q(
                            function () {
                                var e = $t();
                                l.add(e.dispose);
                                var n = t.current;
                                if (n && "idle" !== s.current && i.current)
                                    return (
                                        e.dispose(),
                                        a.current(s.current),
                                        e.add(
                                            Yt(n, r.current, "enter" === s.current, function () {
                                                e.dispose(), o.current(s.current);
                                            })
                                        ),
                                        e.dispose
                                    );
                            },
                            [n]
                        );
                    })({
                        container: b,
                        classes: z,
                        direction: V,
                        onStart: ce(function (e) {
                            G.onStart(b, e, q);
                        }),
                        onStop: ce(function (e) {
                            G.onStop(b, e, $), "leave" === e && !rn(G) && (A("hidden"), M(b));
                        }),
                    }),
                        (0, e.useEffect)(
                            function () {
                                W && (w === L.Hidden ? (F.current = null) : (F.current = C));
                            },
                            [C, W, R]
                        );
                    var K = y,
                        Z = { ref: x };
                    return (
                        S && C && T && (K = s(s({}, K), {}, { className: N.apply(void 0, [y.className].concat(E(z.current.enter), E(z.current.enterFrom))) })),
                        e.createElement(
                            nn.Provider,
                            { value: G },
                            e.createElement(
                                ot,
                                { value: P(R, ((r = {}), i(r, "visible", rt.Open), i(r, "hidden", rt.Closed), r)) | H.flags },
                                I({ ourProps: Z, theirProps: K, defaultTag: "div", features: un, visible: "visible" === R, name: "Transition.Child" })
                            )
                        )
                    );
                }),
                fn = M(function (t, n) {
                    var r = null !== (0, e.useContext)(en),
                        a = null !== at();
                    return e.createElement(e.Fragment, null, !r && a ? e.createElement(cn, s({ ref: n }, t)) : e.createElement(dn, s({ ref: n }, t)));
                }),
                hn = Object.assign(cn, { Child: fn, Root: cn });
            function pn(e) {
                return (0, f.jsx)("img", s({ src: "./logo.svg", alt: "" }, e));
            }
            function mn(e) {
                var t = e.href,
                    n = e.children;
                return (0, f.jsx)("a", { href: t, className: "inline-block rounded-lg px-2 py-1 text-sm text-white hover:bg-slate-100 hover:text-slate-900", children: n });
            }
            var vn = { name: "The Iron Markets", link: "https://theironmarkets.com", email: "support@theironmarkets.com", appLink: "https://app.theironmarkets.com" };
            function gn(e) {
                var t = e.href,
                    n = e.children;
                return (0, f.jsx)(Ht.Button, { as: "a", href: t, className: "block w-full p-2", children: n });
            }
            function yn(e) {
                var t = e.open;
                return (0, f.jsxs)("svg", {
                    "aria-hidden": "true",
                    className: "h-3.5 w-3.5 overflow-visible stroke-slate-700",
                    fill: "none",
                    strokeWidth: 2,
                    strokeLinecap: "round",
                    children: [
                        (0, f.jsx)("path", { d: "M0 1H14M0 7H14M0 13H14", className: d("origin-center transition", t && "scale-90 opacity-0") }),
                        (0, f.jsx)("path", { d: "M2 2L12 12M12 2L2 12", className: d("origin-center transition", !t && "scale-90 opacity-0") }),
                    ],
                });
            }
            function bn() {
                return (0, f.jsxs)(Ht, {
                    children: [
                        (0, f.jsx)(Ht.Button, {
                            className: "relative z-10 flex h-8 w-8 items-center justify-center [&:not(:focus-visible)]:focus:outline-none",
                            "aria-label": "Toggle Navigation",
                            children: function (e) {
                                var t = e.open;
                                return (0, f.jsx)(yn, { open: t });
                            },
                        }),
                        (0, f.jsxs)(hn.Root, {
                            children: [
                                (0, f.jsx)(hn.Child, {
                                    as: e.Fragment,
                                    enter: "duration-150 ease-out",
                                    enterFrom: "opacity-0",
                                    enterTo: "opacity-100",
                                    leave: "duration-150 ease-in",
                                    leaveFrom: "opacity-100",
                                    leaveTo: "opacity-0",
                                    children: (0, f.jsx)(Ht.Overlay, { className: "fixed inset-0 bg-slate-300/50" }),
                                }),
                                (0, f.jsx)(hn.Child, {
                                    as: e.Fragment,
                                    enter: "duration-150 ease-out",
                                    enterFrom: "opacity-0 scale-95",
                                    enterTo: "opacity-100 scale-100",
                                    leave: "duration-100 ease-in",
                                    leaveFrom: "opacity-100 scale-100",
                                    leaveTo: "opacity-0 scale-95",
                                    children: (0, f.jsxs)(Ht.Panel, {
                                        as: "div",
                                        className: "absolute inset-x-0 top-full mt-4 flex origin-top flex-col rounded-2xl bg-white p-4 text-lg tracking-tight text-slate-900 shadow-xl ring-1 ring-slate-900/5",
                                        children: [
                                            (0, f.jsx)(gn, { href: "/about", children: "About us" }),
                                            (0, f.jsx)(gn, { href: "/terms", children: "Terms and conditions" }),
                                            (0, f.jsx)(gn, { href: "/why-us", children: "Why us" }),
                                            (0, f.jsx)("hr", { className: "m-2 border-slate-300/40" }),
                                            (0, f.jsx)(gn, { href: "".concat(vn.appLink, "/login"), children: "Log in" }),
                                            (0, f.jsx)(gn, { href: "".concat(vn.appLink, "/register"), children: "Register" }),
                                        ],
                                    }),
                                }),
                            ],
                        }),
                    ],
                });
            }
            function xn() {
                return (0, f.jsx)("header", {
                    className: "py-10",
                    children: (0, f.jsx)(y, {
                        children: (0, f.jsxs)("nav", {
                            className: "relative z-50 flex justify-between",
                            children: [
                                (0, f.jsxs)("div", {
                                    className: "flex items-center md:gap-x-12",
                                    children: [
                                        (0, f.jsx)("a", { href: "/", "aria-label": "Home", children: (0, f.jsx)(pn, { className: "h-10 w-auto" }) }),
                                        (0, f.jsxs)("div", {
                                            className: "hidden md:flex md:gap-x-6",
                                            children: [(0, f.jsx)(mn, { href: "/about", children: "About us" }), (0, f.jsx)(mn, { href: "/faq", children: "FAQ" }), (0, f.jsx)(mn, { href: "/why-us", children: "Why us" })],
                                        }),
                                    ],
                                }),
                                (0, f.jsxs)("div", {
                                    className: "flex items-center gap-x-5 md:gap-x-8",
                                    children: [
                                        (0, f.jsx)("div", { className: "hidden md:block", children: (0, f.jsx)(mn, { href: "".concat(vn.appLink, "/login"), children: "Log in" }) }),
                                        (0, f.jsx)(v, {
                                            href: "".concat(vn.appLink, "/register"),
                                            color: "blue",
                                            children: (0, f.jsxs)("span", { children: ["Get started ", (0, f.jsx)("span", { className: "hidden lg:inline", children: "today" })] }),
                                        }),
                                        (0, f.jsx)("div", { className: "-mr-1 md:hidden", children: (0, f.jsx)(bn, {}) }),
                                    ],
                                }),
                            ],
                        }),
                    }),
                });
            }
            n.p, n.p;
            function wn() {
                return (0, f.jsxs)(y, {
                    className: "relative  z-20 p-20 text-center lg:p-32",
                    children: [
                        (0, f.jsxs)("h1", {
                            className: "mx-auto max-w-4xl font-sans text-4xl font-semibold tracking-tight text-white sm:text-7xl hero_text ",
                            children: [
                                (0, f.jsxs)("span", { children: [" ", "", " Revolutionizing"] }),
                                (0, f.jsxs)("span", { children: [" ", "", " your"] }),
                                (0, f.jsxs)("span", { children: [" ", "", " digital"] }),
                                (0, f.jsxs)("span", { children: [" ", "", " trading"] }),
                                (0, f.jsxs)("span", { children: [" ", "", " experience "] }),
                            ],
                        }),
                        (0, f.jsx)("p", {
                            className: "mx-auto mt-6 max-w-2xl text-[18px] tracking-tight text-[#CECFD1] hero_support",
                            children: "Seamlessly merging complexity with ease, The Iron Markets offers top-notch security, 24/7 support, and an intuitive platform for your tenacious trading and investment needs.",
                        }),
                        (0, f.jsxs)("div", {
                            className: "mt-10 flex justify-center gap-x-6 hero_buttons",
                            children: [
                                (0, f.jsx)(v, { href: "".concat(vn.appLink, "/register"), children: "Get started" }),
                                (0, f.jsx)(v, { href: "".concat(vn.appLink, "/login"), variant: "outline", children: (0, f.jsx)("span", { children: "Log in" }) }),
                            ],
                        }),
                    ],
                });
            }
            var kn = function (e) {
                return e;
            };
            var Cn = { any: 0, all: 1 };
            function jn(e, t) {
                var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                    r = n.root,
                    a = n.margin,
                    o = n.amount,
                    i = void 0 === o ? "any" : o,
                    l = (function (e, t, n) {
                        var r;
                        if ("string" === typeof e) {
                            var a = document;
                            t && (kn(Boolean(t.current), "Scope provided, but no element detected."), (a = t.current)), n ? ((null !== (r = n[e]) && void 0 !== r) || (n[e] = a.querySelectorAll(e)), (e = n[e])) : (e = a.querySelectorAll(e));
                        } else e instanceof Element && (e = [e]);
                        return Array.from(e || []);
                    })(e),
                    s = new WeakMap(),
                    u = new IntersectionObserver(
                        function (e) {
                            e.forEach(function (e) {
                                var n = s.get(e.target);
                                if (e.isIntersecting !== Boolean(n))
                                    if (e.isIntersecting) {
                                        var r = t(e);
                                        "function" === typeof r ? s.set(e.target, r) : u.unobserve(e.target);
                                    } else n && (n(e), s.delete(e.target));
                            });
                        },
                        { root: r, rootMargin: a, threshold: "number" === typeof i ? i : Cn[i] }
                    );
                return (
                    l.forEach(function (e) {
                        return u.observe(e);
                    }),
                    function () {
                        return u.disconnect();
                    }
                );
            }
            var Sn = ["title", "body", "author", "rating", "role", "image", "className"],
                En = [
                    {
                        title: "Incredible company",
                        body: "Incredible company, I've been trading for a while with them, had two quick withdrawals and fee refund in less than 48 hours. I absolutely recommend the firm",
                        author: "Louis can Nuekerk",
                        rating: 5,
                        role: "Professional trader",
                        image: "https://user-images.trustpilot.com/58c446dd0000ff000a808de2/73x73.png",
                    },
                    {
                        title: "Amazing platform",
                        body: "This is an amazing platform which gives you opportunity to achieve their goals and become successful traders with the support of finances.",
                        author: "Adam",
                        rating: 5,
                        role: "User",
                        image: " https://user-images.trustpilot.com/5cac659ab628b746a119fd61/73x73.png",
                    },
                    {
                        title: "Highly recommended",
                        body: "Great company, no issues with payouts, great customer support. Highly recommended for experienced traders.",
                        author: "Jakub Szulc",
                        rating: 5,
                        role: "Trader",
                        image: "https://user-images.trustpilot.com/5fd721e2c4a9b800196081bd/73x73.png",
                    },
                    {
                        title: "great",
                        body: "legitimate! thank you for the opportunity, nothing out there can compare",
                        author: "Dee",
                        rating: 4,
                        role: "Review expert",
                        image: "https://user-images.trustpilot.com/6321c934f2a8b90013faaf15/73x73.png",
                    },
                    {
                        title: "Excellent platform",
                        body: "".concat(vn.name, " has everything you can ask for, I'm super happy it has been recommended to me as my first broker"),
                        author: "Agata Vincent",
                        rating: 5,
                        role: "Trader",
                        image: "https://user-images.trustpilot.com/64a712e728582c0011a9260e/73x73.png",
                    },
                    {
                        title: "Really good experience",
                        body: "Amazing experience. I have a very nice experience using this platform. Execution speed is ont of the best all over the market.",
                        author: "Pro Kittisak",
                        rating: 4,
                        role: "User",
                        image: "https://user-images.trustpilot.com/64c13a9a79f4110012303256/73x73.png",
                    },
                ];
            function Nn(e) {
                return (0, f.jsx)(
                    "svg",
                    s(
                        s({ viewBox: "0 0 20 20", "aria-hidden": "true" }, e),
                        {},
                        {
                            children: (0, f.jsx)("path", {
                                d:
                                    "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z",
                            }),
                        }
                    )
                );
            }
            function Pn(e) {
                var t = e.rating;
                return (0, f.jsx)("div", {
                    className: "flex",
                    children: E(Array(5).keys()).map(function (e) {
                        return (0, f.jsx)(Nn, { className: d("h-5 w-5", t > e ? "fill-cyan-500" : "fill-gray-300") }, e);
                    }),
                });
            }
            function Tn(t) {
                var n = t.title,
                    r = t.body,
                    a = t.author,
                    o = t.rating,
                    i = t.role,
                    l = t.image,
                    c = t.className,
                    h = u(t, Sn),
                    p = (0, e.useMemo)(function () {
                        var e = ["0s", "0.1s", "0.2s", "0.3s", "0.4s", "0.5s"];
                        return e[Math.floor(Math.random() * e.length)];
                    }, []);
                return (0, f.jsxs)(
                    "figure",
                    s(
                        s({ className: d("animate-fade-in rounded-3xl bg-white p-6 opacity-0 shadow-md shadow-gray-900/5", c), style: { animationDelay: p } }, h),
                        {},
                        {
                            children: [
                                (0, f.jsxs)("blockquote", {
                                    className: "text-gray-900",
                                    children: [
                                        (0, f.jsx)(Pn, { rating: o }),
                                        (0, f.jsx)("p", { className: "mt-4 text-lg font-semibold leading-6 before:content-['\u201c'] after:content-['\u201d']", children: n }),
                                        (0, f.jsx)("p", { className: "mt-3 text-base leading-7", children: r }),
                                    ],
                                }),
                                (0, f.jsxs)("figcaption", {
                                    className: "relative mt-6 flex items-center justify-between border-t border-slate-100 pt-6",
                                    children: [
                                        (0, f.jsxs)("div", {
                                            children: [(0, f.jsx)("div", { className: "font-display text-base text-slate-900", children: a }), (0, f.jsx)("div", { className: "mt-1 text-sm text-slate-500", children: i })],
                                        }),
                                        (0, f.jsx)("div", { className: "overflow-hidden rounded-full bg-slate-50", children: (0, f.jsx)("img", { className: "h-14 w-14 object-cover", src: l, alt: "", width: 56, height: 56 }) }),
                                    ],
                                }),
                            ],
                        }
                    )
                );
            }
            function On(e, t) {
                for (var n = [], r = 0; r < e.length; r++) {
                    var a = r % t;
                    n[a] || (n[a] = []), n[a].push(e[r]);
                }
                return n;
            }
            function Rn(t) {
                var n = t.className,
                    r = t.reviews,
                    a = t.reviewClassName,
                    o = void 0 === a ? function () { } : a,
                    i = t.msPerPixel,
                    l = void 0 === i ? 0 : i,
                    u = (0, e.useRef)(),
                    c = j((0, e.useState)(0), 2),
                    h = c[0],
                    p = c[1],
                    m = "".concat(h * l, "ms");
                return (
                    (0, e.useEffect)(function () {
                        var e = new window.ResizeObserver(function () {
                            p(u.current.offsetHeight);
                        });
                        return (
                            e.observe(u.current),
                            function () {
                                e.disconnect();
                            }
                        );
                    }, []),
                    (0, f.jsx)("div", {
                        ref: u,
                        className: d("animate-marquee space-y-8 py-4", n),
                        style: { "--marquee-duration": m },
                        children: r.concat(r).map(function (e, t) {
                            return (0, f.jsx)(Tn, s({ "aria-hidden": t >= r.length, className: o(t % r.length) }, e), t);
                        }),
                    })
                );
            }
            function An() {
                var t = (0, e.useRef)(),
                    n = (function (t) {
                        var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                            r = n.root,
                            a = n.margin,
                            o = n.amount,
                            i = n.once,
                            l = void 0 !== i && i,
                            s = j((0, e.useState)(!1), 2),
                            u = s[0],
                            c = s[1];
                        return (
                            (0, e.useEffect)(
                                function () {
                                    if (!(!t.current || (l && u))) {
                                        var e = { root: (r && r.current) || void 0, margin: a, amount: "some" === o ? "any" : o };
                                        return jn(
                                            t.current,
                                            function () {
                                                return (
                                                    c(!0),
                                                    l
                                                        ? void 0
                                                        : function () {
                                                            return c(!1);
                                                        }
                                                );
                                            },
                                            e
                                        );
                                    }
                                },
                                [r, t, a, l]
                            ),
                            u
                        );
                    })(t, { once: !0, amount: 0.4 }),
                    r = On(En, 3);
                return (
                    (r = [r[0], r[1], On(r[2], 2)]),
                    (0, f.jsxs)("div", {
                        ref: t,
                        className: "relative -mx-4 mt-16 grid h-[49rem] max-h-[150vh] grid-cols-1 items-start gap-8 overflow-hidden px-4 sm:mt-20 md:grid-cols-2 lg:grid-cols-3",
                        children: [
                            n &&
                            (0, f.jsxs)(f.Fragment, {
                                children: [
                                    (0, f.jsx)(Rn, {
                                        reviews: [].concat(E(r[0]), E(r[2].flat()), E(r[1])),
                                        reviewClassName: function (e) {
                                            return d(e >= r[0].length + r[2][0].length && "md:hidden", e >= r[0].length && "lg:hidden");
                                        },
                                        msPerPixel: 10,
                                    }),
                                    (0, f.jsx)(Rn, {
                                        reviews: [].concat(E(r[1]), E(r[2][1])),
                                        className: "hidden md:block",
                                        reviewClassName: function (e) {
                                            return e >= r[1].length && "lg:hidden";
                                        },
                                        msPerPixel: 15,
                                    }),
                                    (0, f.jsx)(Rn, { reviews: r[2].flat(), className: "hidden lg:block", msPerPixel: 10 }),
                                ],
                            }),
                            (0, f.jsx)("div", { className: "pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white" }),
                            (0, f.jsx)("div", { className: "pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white" }),
                        ],
                    })
                );
            }
            function Ln() {
                return (0, f.jsx)("section", {
                    id: "reviews",
                    "aria-labelledby": "reviews-title",
                    className: "pb-16 pt-20 sm:pb-24 sm:pt-32 grid",
                    children: (0, f.jsxs)(y, {
                        className: "grid items-center self-center",
                        children: [
                            (0, f.jsx)("h2", {
                                id: "reviews-title",
                                style: { placeSelf: "center", lineHeight: "58px", letterSpacing: "-1.21px" },
                                className: "text-[45px] font-semibold tracking-tight text-gray-900 sm:text-center max-w-[475px]",
                                children: "Built for today\u2019s ambitious earners",
                            }),
                            (0, f.jsxs)("p", {
                                style: { placeSelf: "center" },
                                className: "mt-2 text-[18px] text-gray-600 sm:text-center max-w-[595px]",
                                children: ["Thousands of forward-thinking users rely on ", vn.name, " ", "everyday to turbo-charge their financial operations"],
                            }),
                            (0, f.jsx)(An, {}),
                        ],
                    }),
                });
            }
            var In,
                _n = n.p + "static/media/avatar-1.71f1a1b8c24baac1ff63.png",
                Dn = n.p + "static/media/avatar-2.7ebc2e2516d48be954e4.png",
                Mn = n.p + "static/media/avatar-3.c99a6e14cda402fe933e.png",
                Fn = n.p + "static/media/avatar-4.16f6199d7dcf82b25442.png";
            n.p;
            function zn(e, t) {
                return (
                    (zn = Object.setPrototypeOf
                        ? Object.setPrototypeOf.bind()
                        : function (e, t) {
                            return (e.__proto__ = t), e;
                        }),
                    zn(e, t)
                );
            }
            function Un(e, t) {
                if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                (e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } })), Object.defineProperty(e, "prototype", { writable: !1 }), t && zn(e, t);
            }
            function Bn(e) {
                return (
                    (Bn = Object.setPrototypeOf
                        ? Object.getPrototypeOf.bind()
                        : function (e) {
                            return e.__proto__ || Object.getPrototypeOf(e);
                        }),
                    Bn(e)
                );
            }
            function Wn() {
                if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" === typeof Proxy) return !0;
                try {
                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () { })), !0;
                } catch (ft) {
                    return !1;
                }
            }
            function Vn(e, t) {
                if (t && ("object" === a(t) || "function" === typeof t)) return t;
                if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
                return (function (e) {
                    if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return e;
                })(e);
            }
            function Hn(e) {
                var t = Wn();
                return function () {
                    var n,
                        r = Bn(e);
                    if (t) {
                        var a = Bn(this).constructor;
                        n = Reflect.construct(r, arguments, a);
                    } else n = r.apply(this, arguments);
                    return Vn(this, n);
                };
            }
            function qn() {
                qn = function () {
                    return e;
                };
                var e = {},
                    t = Object.prototype,
                    n = t.hasOwnProperty,
                    r =
                        Object.defineProperty ||
                        function (e, t, n) {
                            e[t] = n.value;
                        },
                    o = "function" == typeof Symbol ? Symbol : {},
                    i = o.iterator || "@@iterator",
                    l = o.asyncIterator || "@@asyncIterator",
                    s = o.toStringTag || "@@toStringTag";
                function u(e, t, n) {
                    return Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }), e[t];
                }
                try {
                    u({}, "");
                } catch (T) {
                    u = function (e, t, n) {
                        return (e[t] = n);
                    };
                }
                function c(e, t, n, a) {
                    var o = t && t.prototype instanceof h ? t : h,
                        i = Object.create(o.prototype),
                        l = new E(a || []);
                    return r(i, "_invoke", { value: k(e, n, l) }), i;
                }
                function d(e, t, n) {
                    try {
                        return { type: "normal", arg: e.call(t, n) };
                    } catch (T) {
                        return { type: "throw", arg: T };
                    }
                }
                e.wrap = c;
                var f = {};
                function h() { }
                function p() { }
                function m() { }
                var v = {};
                u(v, i, function () {
                    return this;
                });
                var g = Object.getPrototypeOf,
                    y = g && g(g(N([])));
                y && y !== t && n.call(y, i) && (v = y);
                var b = (m.prototype = h.prototype = Object.create(v));
                function x(e) {
                    ["next", "throw", "return"].forEach(function (t) {
                        u(e, t, function (e) {
                            return this._invoke(t, e);
                        });
                    });
                }
                function w(e, t) {
                    function o(r, i, l, s) {
                        var u = d(e[r], e, i);
                        if ("throw" !== u.type) {
                            var c = u.arg,
                                f = c.value;
                            return f && "object" == a(f) && n.call(f, "__await")
                                ? t.resolve(f.__await).then(
                                    function (e) {
                                        o("next", e, l, s);
                                    },
                                    function (e) {
                                        o("throw", e, l, s);
                                    }
                                )
                                : t.resolve(f).then(
                                    function (e) {
                                        (c.value = e), l(c);
                                    },
                                    function (e) {
                                        return o("throw", e, l, s);
                                    }
                                );
                        }
                        s(u.arg);
                    }
                    var i;
                    r(this, "_invoke", {
                        value: function (e, n) {
                            function r() {
                                return new t(function (t, r) {
                                    o(e, n, t, r);
                                });
                            }
                            return (i = i ? i.then(r, r) : r());
                        },
                    });
                }
                function k(e, t, n) {
                    var r = "suspendedStart";
                    return function (a, o) {
                        if ("executing" === r) throw new Error("Generator is already running");
                        if ("completed" === r) {
                            if ("throw" === a) throw o;
                            return P();
                        }
                        for (n.method = a, n.arg = o; ;) {
                            var i = n.delegate;
                            if (i) {
                                var l = C(i, n);
                                if (l) {
                                    if (l === f) continue;
                                    return l;
                                }
                            }
                            if ("next" === n.method) n.sent = n._sent = n.arg;
                            else if ("throw" === n.method) {
                                if ("suspendedStart" === r) throw ((r = "completed"), n.arg);
                                n.dispatchException(n.arg);
                            } else "return" === n.method && n.abrupt("return", n.arg);
                            r = "executing";
                            var s = d(e, t, n);
                            if ("normal" === s.type) {
                                if (((r = n.done ? "completed" : "suspendedYield"), s.arg === f)) continue;
                                return { value: s.arg, done: n.done };
                            }
                            "throw" === s.type && ((r = "completed"), (n.method = "throw"), (n.arg = s.arg));
                        }
                    };
                }
                function C(e, t) {
                    var n = t.method,
                        r = e.iterator[n];
                    if (void 0 === r)
                        return (
                            (t.delegate = null),
                            ("throw" === n && e.iterator.return && ((t.method = "return"), (t.arg = void 0), C(e, t), "throw" === t.method)) ||
                            ("return" !== n && ((t.method = "throw"), (t.arg = new TypeError("The iterator does not provide a '" + n + "' method")))),
                            f
                        );
                    var a = d(r, e.iterator, t.arg);
                    if ("throw" === a.type) return (t.method = "throw"), (t.arg = a.arg), (t.delegate = null), f;
                    var o = a.arg;
                    return o
                        ? o.done
                            ? ((t[e.resultName] = o.value), (t.next = e.nextLoc), "return" !== t.method && ((t.method = "next"), (t.arg = void 0)), (t.delegate = null), f)
                            : o
                        : ((t.method = "throw"), (t.arg = new TypeError("iterator result is not an object")), (t.delegate = null), f);
                }
                function j(e) {
                    var t = { tryLoc: e[0] };
                    1 in e && (t.catchLoc = e[1]), 2 in e && ((t.finallyLoc = e[2]), (t.afterLoc = e[3])), this.tryEntries.push(t);
                }
                function S(e) {
                    var t = e.completion || {};
                    (t.type = "normal"), delete t.arg, (e.completion = t);
                }
                function E(e) {
                    (this.tryEntries = [{ tryLoc: "root" }]), e.forEach(j, this), this.reset(!0);
                }
                function N(e) {
                    if (e) {
                        var t = e[i];
                        if (t) return t.call(e);
                        if ("function" == typeof e.next) return e;
                        if (!isNaN(e.length)) {
                            var r = -1,
                                a = function t() {
                                    for (; ++r < e.length;) if (n.call(e, r)) return (t.value = e[r]), (t.done = !1), t;
                                    return (t.value = void 0), (t.done = !0), t;
                                };
                            return (a.next = a);
                        }
                    }
                    return { next: P };
                }
                function P() {
                    return { value: void 0, done: !0 };
                }
                return (
                    (p.prototype = m),
                    r(b, "constructor", { value: m, configurable: !0 }),
                    r(m, "constructor", { value: p, configurable: !0 }),
                    (p.displayName = u(m, s, "GeneratorFunction")),
                    (e.isGeneratorFunction = function (e) {
                        var t = "function" == typeof e && e.constructor;
                        return !!t && (t === p || "GeneratorFunction" === (t.displayName || t.name));
                    }),
                    (e.mark = function (e) {
                        return Object.setPrototypeOf ? Object.setPrototypeOf(e, m) : ((e.__proto__ = m), u(e, s, "GeneratorFunction")), (e.prototype = Object.create(b)), e;
                    }),
                    (e.awrap = function (e) {
                        return { __await: e };
                    }),
                    x(w.prototype),
                    u(w.prototype, l, function () {
                        return this;
                    }),
                    (e.AsyncIterator = w),
                    (e.async = function (t, n, r, a, o) {
                        void 0 === o && (o = Promise);
                        var i = new w(c(t, n, r, a), o);
                        return e.isGeneratorFunction(n)
                            ? i
                            : i.next().then(function (e) {
                                return e.done ? e.value : i.next();
                            });
                    }),
                    x(b),
                    u(b, s, "Generator"),
                    u(b, i, function () {
                        return this;
                    }),
                    u(b, "toString", function () {
                        return "[object Generator]";
                    }),
                    (e.keys = function (e) {
                        var t = Object(e),
                            n = [];
                        for (var r in t) n.push(r);
                        return (
                            n.reverse(),
                            function e() {
                                for (; n.length;) {
                                    var r = n.pop();
                                    if (r in t) return (e.value = r), (e.done = !1), e;
                                }
                                return (e.done = !0), e;
                            }
                        );
                    }),
                    (e.values = N),
                    (E.prototype = {
                        constructor: E,
                        reset: function (e) {
                            if (((this.prev = 0), (this.next = 0), (this.sent = this._sent = void 0), (this.done = !1), (this.delegate = null), (this.method = "next"), (this.arg = void 0), this.tryEntries.forEach(S), !e))
                                for (var t in this) "t" === t.charAt(0) && n.call(this, t) && !isNaN(+t.slice(1)) && (this[t] = void 0);
                        },
                        stop: function () {
                            this.done = !0;
                            var e = this.tryEntries[0].completion;
                            if ("throw" === e.type) throw e.arg;
                            return this.rval;
                        },
                        dispatchException: function (e) {
                            if (this.done) throw e;
                            var t = this;
                            function r(n, r) {
                                return (i.type = "throw"), (i.arg = e), (t.next = n), r && ((t.method = "next"), (t.arg = void 0)), !!r;
                            }
                            for (var a = this.tryEntries.length - 1; a >= 0; --a) {
                                var o = this.tryEntries[a],
                                    i = o.completion;
                                if ("root" === o.tryLoc) return r("end");
                                if (o.tryLoc <= this.prev) {
                                    var l = n.call(o, "catchLoc"),
                                        s = n.call(o, "finallyLoc");
                                    if (l && s) {
                                        if (this.prev < o.catchLoc) return r(o.catchLoc, !0);
                                        if (this.prev < o.finallyLoc) return r(o.finallyLoc);
                                    } else if (l) {
                                        if (this.prev < o.catchLoc) return r(o.catchLoc, !0);
                                    } else {
                                        if (!s) throw new Error("try statement without catch or finally");
                                        if (this.prev < o.finallyLoc) return r(o.finallyLoc);
                                    }
                                }
                            }
                        },
                        abrupt: function (e, t) {
                            for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                                var a = this.tryEntries[r];
                                if (a.tryLoc <= this.prev && n.call(a, "finallyLoc") && this.prev < a.finallyLoc) {
                                    var o = a;
                                    break;
                                }
                            }
                            o && ("break" === e || "continue" === e) && o.tryLoc <= t && t <= o.finallyLoc && (o = null);
                            var i = o ? o.completion : {};
                            return (i.type = e), (i.arg = t), o ? ((this.method = "next"), (this.next = o.finallyLoc), f) : this.complete(i);
                        },
                        complete: function (e, t) {
                            if ("throw" === e.type) throw e.arg;
                            return (
                                "break" === e.type || "continue" === e.type
                                    ? (this.next = e.arg)
                                    : "return" === e.type
                                        ? ((this.rval = this.arg = e.arg), (this.method = "return"), (this.next = "end"))
                                        : "normal" === e.type && t && (this.next = t),
                                f
                            );
                        },
                        finish: function (e) {
                            for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                                var n = this.tryEntries[t];
                                if (n.finallyLoc === e) return this.complete(n.completion, n.afterLoc), S(n), f;
                            }
                        },
                        catch: function (e) {
                            for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                                var n = this.tryEntries[t];
                                if (n.tryLoc === e) {
                                    var r = n.completion;
                                    if ("throw" === r.type) {
                                        var a = r.arg;
                                        S(n);
                                    }
                                    return a;
                                }
                            }
                            throw new Error("illegal catch attempt");
                        },
                        delegateYield: function (e, t, n) {
                            return (this.delegate = { iterator: N(e), resultName: t, nextLoc: n }), "next" === this.method && (this.arg = void 0), f;
                        },
                    }),
                    e
                );
            }
            function $n(e, t, n, r, a, o, i) {
                try {
                    var l = e[o](i),
                        s = l.value;
                } catch (u) {
                    return void n(u);
                }
                l.done ? t(s) : Promise.resolve(s).then(r, a);
            }
            function Gn(e) {
                return function () {
                    var t = this,
                        n = arguments;
                    return new Promise(function (r, a) {
                        var o = e.apply(t, n);
                        function i(e) {
                            $n(o, r, a, i, l, "next", e);
                        }
                        function l(e) {
                            $n(o, r, a, i, l, "throw", e);
                        }
                        i(void 0);
                    });
                };
            }
            function Qn(e, t, n) {
                return (
                    (Qn = Wn()
                        ? Reflect.construct.bind()
                        : function (e, t, n) {
                            var r = [null];
                            r.push.apply(r, t);
                            var a = new (Function.bind.apply(e, r))();
                            return n && zn(a, n.prototype), a;
                        }),
                    Qn.apply(null, arguments)
                );
            }
            function Yn(e) {
                var t = "function" === typeof Map ? new Map() : void 0;
                return (
                    (Yn = function (e) {
                        if (null === e || ((n = e), -1 === Function.toString.call(n).indexOf("[native code]"))) return e;
                        var n;
                        if ("function" !== typeof e) throw new TypeError("Super expression must either be null or a function");
                        if ("undefined" !== typeof t) {
                            if (t.has(e)) return t.get(e);
                            t.set(e, r);
                        }
                        function r() {
                            return Qn(e, arguments, Bn(this).constructor);
                        }
                        return (r.prototype = Object.create(e.prototype, { constructor: { value: r, enumerable: !1, writable: !0, configurable: !0 } })), zn(r, e);
                    }),
                    Yn(e)
                );
            }
            function Kn() {
                return (
                    (Kn = Object.assign
                        ? Object.assign.bind()
                        : function (e) {
                            for (var t = 1; t < arguments.length; t++) {
                                var n = arguments[t];
                                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
                            }
                            return e;
                        }),
                    Kn.apply(this, arguments)
                );
            }
            !(function (e) {
                (e.Pop = "POP"), (e.Push = "PUSH"), (e.Replace = "REPLACE");
            })(In || (In = {}));
            var Zn,
                Xn = "popstate";
            function Jn(e, t) {
                if (!1 === e || null === e || "undefined" === typeof e) throw new Error(t);
            }
            function er(e, t) {
                if (!e) {
                    "undefined" !== typeof console && console.warn(t);
                    try {
                        throw new Error(t);
                    } catch (ft) { }
                }
            }
            function tr(e, t) {
                return { usr: e.state, key: e.key, idx: t };
            }
            function nr(e, t, n, r) {
                return (
                    void 0 === n && (n = null),
                    Kn({ pathname: "string" === typeof e ? e : e.pathname, search: "", hash: "" }, "string" === typeof t ? ar(t) : t, { state: n, key: (t && t.key) || r || Math.random().toString(36).substr(2, 8) })
                );
            }
            function rr(e) {
                var t = e.pathname,
                    n = void 0 === t ? "/" : t,
                    r = e.search,
                    a = void 0 === r ? "" : r,
                    o = e.hash,
                    i = void 0 === o ? "" : o;
                return a && "?" !== a && (n += "?" === a.charAt(0) ? a : "?" + a), i && "#" !== i && (n += "#" === i.charAt(0) ? i : "#" + i), n;
            }
            function ar(e) {
                var t = {};
                if (e) {
                    var n = e.indexOf("#");
                    n >= 0 && ((t.hash = e.substr(n)), (e = e.substr(0, n)));
                    var r = e.indexOf("?");
                    r >= 0 && ((t.search = e.substr(r)), (e = e.substr(0, r))), e && (t.pathname = e);
                }
                return t;
            }
            function or(e, t, n, r) {
                void 0 === r && (r = {});
                var a = r,
                    o = a.window,
                    i = void 0 === o ? document.defaultView : o,
                    l = a.v5Compat,
                    s = void 0 !== l && l,
                    u = i.history,
                    c = In.Pop,
                    d = null,
                    f = h();
                function h() {
                    return (u.state || { idx: null }).idx;
                }
                function p() {
                    c = In.Pop;
                    var e = h(),
                        t = null == e ? null : e - f;
                    (f = e), d && d({ action: c, location: v.location, delta: t });
                }
                function m(e) {
                    var t = "null" !== i.location.origin ? i.location.origin : i.location.href,
                        n = "string" === typeof e ? e : rr(e);
                    return Jn(t, "No window.location.(origin|href) available to create URL for href: " + n), new URL(n, t);
                }
                null == f && ((f = 0), u.replaceState(Kn({}, u.state, { idx: f }), ""));
                var v = {
                    get action() {
                        return c;
                    },
                    get location() {
                        return e(i, u);
                    },
                    listen: function (e) {
                        if (d) throw new Error("A history only accepts one active listener");
                        return (
                            i.addEventListener(Xn, p),
                            (d = e),
                            function () {
                                i.removeEventListener(Xn, p), (d = null);
                            }
                        );
                    },
                    createHref: function (e) {
                        return t(i, e);
                    },
                    createURL: m,
                    encodeLocation: function (e) {
                        var t = m(e);
                        return { pathname: t.pathname, search: t.search, hash: t.hash };
                    },
                    push: function (e, t) {
                        c = In.Push;
                        var r = nr(v.location, e, t);
                        n && n(r, e);
                        var a = tr(r, (f = h() + 1)),
                            o = v.createHref(r);
                        try {
                            u.pushState(a, "", o);
                        } catch (l) {
                            if (l instanceof DOMException && "DataCloneError" === l.name) throw l;
                            i.location.assign(o);
                        }
                        s && d && d({ action: c, location: v.location, delta: 1 });
                    },
                    replace: function (e, t) {
                        c = In.Replace;
                        var r = nr(v.location, e, t);
                        n && n(r, e);
                        var a = tr(r, (f = h())),
                            o = v.createHref(r);
                        u.replaceState(a, "", o), s && d && d({ action: c, location: v.location, delta: 0 });
                    },
                    go: function (e) {
                        return u.go(e);
                    },
                };
                return v;
            }
            !(function (e) {
                (e.data = "data"), (e.deferred = "deferred"), (e.redirect = "redirect"), (e.error = "error");
            })(Zn || (Zn = {}));
            var ir = new Set(["lazy", "caseSensitive", "path", "id", "index", "children"]);
            function lr(e, t, n, r) {
                return (
                    void 0 === n && (n = []),
                    void 0 === r && (r = {}),
                    e.map(function (e, a) {
                        var o = [].concat(E(n), [a]),
                            i = "string" === typeof e.id ? e.id : o.join("-");
                        if (
                            (Jn(!0 !== e.index || !e.children, "Cannot specify children on an index route"),
                                Jn(!r[i], 'Found a route id collision on id "' + i + "\".  Route id's must be globally unique within Data Router usages"),
                                (function (e) {
                                    return !0 === e.index;
                                })(e))
                        ) {
                            var l = Kn({}, e, t(e), { id: i });
                            return (r[i] = l), l;
                        }
                        var s = Kn({}, e, t(e), { id: i, children: void 0 });
                        return (r[i] = s), e.children && (s.children = lr(e.children, t, o, r)), s;
                    })
                );
            }
            function sr(e, t, n) {
                void 0 === n && (n = "/");
                var r = kr(("string" === typeof t ? ar(t) : t).pathname || "/", n);
                if (null == r) return null;
                var a = ur(e);
                !(function (e) {
                    e.sort(function (e, t) {
                        return e.score !== t.score
                            ? t.score - e.score
                            : (function (e, t) {
                                var n =
                                    e.length === t.length &&
                                    e.slice(0, -1).every(function (e, n) {
                                        return e === t[n];
                                    });
                                return n ? e[e.length - 1] - t[t.length - 1] : 0;
                            })(
                                e.routesMeta.map(function (e) {
                                    return e.childrenIndex;
                                }),
                                t.routesMeta.map(function (e) {
                                    return e.childrenIndex;
                                })
                            );
                    });
                })(a);
                for (var o = null, i = 0; null == o && i < a.length; ++i) o = br(a[i], wr(r));
                return o;
            }
            function ur(e, t, n, r) {
                void 0 === t && (t = []), void 0 === n && (n = []), void 0 === r && (r = "");
                var a = function (e, a, o) {
                    var i = { relativePath: void 0 === o ? e.path || "" : o, caseSensitive: !0 === e.caseSensitive, childrenIndex: a, route: e };
                    i.relativePath.startsWith("/") &&
                        (Jn(i.relativePath.startsWith(r), 'Absolute route path "' + i.relativePath + '" nested under path "' + r + '" is not valid. An absolute child route path must start with the combined path of all its parent routes.'),
                            (i.relativePath = i.relativePath.slice(r.length)));
                    var l = Er([r, i.relativePath]),
                        s = n.concat(i);
                    e.children && e.children.length > 0 && (Jn(!0 !== e.index, 'Index routes must not have child routes. Please remove all child routes from route path "' + l + '".'), ur(e.children, t, s, l)),
                        (null != e.path || e.index) && t.push({ path: l, score: yr(l, e.index), routesMeta: s });
                };
                return (
                    e.forEach(function (e, t) {
                        var n;
                        if ("" !== e.path && null != (n = e.path) && n.includes("?")) {
                            var r,
                                o = w(cr(e.path));
                            try {
                                for (o.s(); !(r = o.n()).done;) {
                                    var i = r.value;
                                    a(e, t, i);
                                }
                            } catch (l) {
                                o.e(l);
                            } finally {
                                o.f();
                            }
                        } else a(e, t);
                    }),
                    t
                );
            }
            function cr(e) {
                var t = e.split("/");
                if (0 === t.length) return [];
                var n,
                    r = k((n = t)) || S(n) || x(n) || C(),
                    a = r[0],
                    o = r.slice(1),
                    i = a.endsWith("?"),
                    l = a.replace(/\?$/, "");
                if (0 === o.length) return i ? [l, ""] : [l];
                var s = cr(o.join("/")),
                    u = [];
                return (
                    u.push.apply(
                        u,
                        E(
                            s.map(function (e) {
                                return "" === e ? l : [l, e].join("/");
                            })
                        )
                    ),
                    i && u.push.apply(u, E(s)),
                    u.map(function (t) {
                        return e.startsWith("/") && "" === t ? "/" : t;
                    })
                );
            }
            var dr = /^:\w+$/,
                fr = 3,
                hr = 2,
                pr = 1,
                mr = 10,
                vr = -2,
                gr = function (e) {
                    return "*" === e;
                };
            function yr(e, t) {
                var n = e.split("/"),
                    r = n.length;
                return (
                    n.some(gr) && (r += vr),
                    t && (r += hr),
                    n
                        .filter(function (e) {
                            return !gr(e);
                        })
                        .reduce(function (e, t) {
                            return e + (dr.test(t) ? fr : "" === t ? pr : mr);
                        }, r)
                );
            }
            function br(e, t) {
                for (var n = e.routesMeta, r = {}, a = "/", o = [], i = 0; i < n.length; ++i) {
                    var l = n[i],
                        s = i === n.length - 1,
                        u = "/" === a ? t : t.slice(a.length) || "/",
                        c = xr({ path: l.relativePath, caseSensitive: l.caseSensitive, end: s }, u);
                    if (!c) return null;
                    Object.assign(r, c.params);
                    var d = l.route;
                    o.push({ params: r, pathname: Er([a, c.pathname]), pathnameBase: Nr(Er([a, c.pathnameBase])), route: d }), "/" !== c.pathnameBase && (a = Er([a, c.pathnameBase]));
                }
                return o;
            }
            function xr(e, t) {
                "string" === typeof e && (e = { path: e, caseSensitive: !1, end: !0 });
                var n = (function (e, t, n) {
                    void 0 === t && (t = !1);
                    void 0 === n && (n = !0);
                    er(
                        "*" === e || !e.endsWith("*") || e.endsWith("/*"),
                        'Route path "' +
                        e +
                        '" will be treated as if it were "' +
                        e.replace(/\*$/, "/*") +
                        '" because the `*` character must always follow a `/` in the pattern. To get rid of this warning, please change the route path to "' +
                        e.replace(/\*$/, "/*") +
                        '".'
                    );
                    var r = [],
                        a =
                            "^" +
                            e
                                .replace(/\/*\*?$/, "")
                                .replace(/^\/*/, "/")
                                .replace(/[\\.*+^$?{}|()[\]]/g, "\\$&")
                                .replace(/\/:(\w+)/g, function (e, t) {
                                    return r.push(t), "/([^\\/]+)";
                                });
                    e.endsWith("*") ? (r.push("*"), (a += "*" === e || "/*" === e ? "(.*)$" : "(?:\\/(.+)|\\/*)$")) : n ? (a += "\\/*$") : "" !== e && "/" !== e && (a += "(?:(?=\\/|$))");
                    var o = new RegExp(a, t ? void 0 : "i");
                    return [o, r];
                })(e.path, e.caseSensitive, e.end),
                    r = j(n, 2),
                    a = r[0],
                    o = r[1],
                    i = t.match(a);
                if (!i) return null;
                var l = i[0],
                    s = l.replace(/(.)\/+$/, "$1"),
                    u = i.slice(1);
                return {
                    params: o.reduce(function (e, t, n) {
                        if ("*" === t) {
                            var r = u[n] || "";
                            s = l.slice(0, l.length - r.length).replace(/(.)\/+$/, "$1");
                        }
                        return (
                            (e[t] = (function (e, t) {
                                try {
                                    return decodeURIComponent(e);
                                } catch (n) {
                                    return er(!1, 'The value for the URL param "' + t + '" will not be decoded because the string "' + e + '" is a malformed URL segment. This is probably due to a bad percent encoding (' + n + ")."), e;
                                }
                            })(u[n] || "", t)),
                            e
                        );
                    }, {}),
                    pathname: l,
                    pathnameBase: s,
                    pattern: e,
                };
            }
            function wr(e) {
                try {
                    return decodeURI(e);
                } catch (t) {
                    return er(!1, 'The URL path "' + e + '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent encoding (' + t + ")."), e;
                }
            }
            function kr(e, t) {
                if ("/" === t) return e;
                if (!e.toLowerCase().startsWith(t.toLowerCase())) return null;
                var n = t.endsWith("/") ? t.length - 1 : t.length,
                    r = e.charAt(n);
                return r && "/" !== r ? null : e.slice(n) || "/";
            }
            function Cr(e, t, n, r) {
                return (
                    "Cannot include a '" +
                    e +
                    "' character in a manually specified `to." +
                    t +
                    "` field [" +
                    JSON.stringify(r) +
                    "].  Please separate it out to the `to." +
                    n +
                    '` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.'
                );
            }
            function jr(e) {
                return e.filter(function (e, t) {
                    return 0 === t || (e.route.path && e.route.path.length > 0);
                });
            }
            function Sr(e, t, n, r) {
                var a;
                void 0 === r && (r = !1),
                    "string" === typeof e
                        ? (a = ar(e))
                        : (Jn(!(a = Kn({}, e)).pathname || !a.pathname.includes("?"), Cr("?", "pathname", "search", a)),
                            Jn(!a.pathname || !a.pathname.includes("#"), Cr("#", "pathname", "hash", a)),
                            Jn(!a.search || !a.search.includes("#"), Cr("#", "search", "hash", a)));
                var o,
                    i = "" === e || "" === a.pathname,
                    l = i ? "/" : a.pathname;
                if (r || null == l) o = n;
                else {
                    var s = t.length - 1;
                    if (l.startsWith("..")) {
                        for (var u = l.split("/"); ".." === u[0];) u.shift(), (s -= 1);
                        a.pathname = u.join("/");
                    }
                    o = s >= 0 ? t[s] : "/";
                }
                var c = (function (e, t) {
                    void 0 === t && (t = "/");
                    var n = "string" === typeof e ? ar(e) : e,
                        r = n.pathname,
                        a = n.search,
                        o = void 0 === a ? "" : a,
                        i = n.hash,
                        l = void 0 === i ? "" : i,
                        s = r
                            ? r.startsWith("/")
                                ? r
                                : (function (e, t) {
                                    var n = t.replace(/\/+$/, "").split("/");
                                    return (
                                        e.split("/").forEach(function (e) {
                                            ".." === e ? n.length > 1 && n.pop() : "." !== e && n.push(e);
                                        }),
                                        n.length > 1 ? n.join("/") : "/"
                                    );
                                })(r, t)
                            : t;
                    return { pathname: s, search: Pr(o), hash: Tr(l) };
                })(a, o),
                    d = l && "/" !== l && l.endsWith("/"),
                    f = (i || "." === l) && n.endsWith("/");
                return c.pathname.endsWith("/") || (!d && !f) || (c.pathname += "/"), c;
            }
            var Er = function (e) {
                return e.join("/").replace(/\/\/+/g, "/");
            },
                Nr = function (e) {
                    return e.replace(/\/+$/, "").replace(/^\/*/, "/");
                },
                Pr = function (e) {
                    return e && "?" !== e ? (e.startsWith("?") ? e : "?" + e) : "";
                },
                Tr = function (e) {
                    return e && "#" !== e ? (e.startsWith("#") ? e : "#" + e) : "";
                },
                Or = (function (e) {
                    Un(n, e);
                    var t = Hn(n);
                    function n() {
                        return U(this, n), t.apply(this, arguments);
                    }
                    return W(n);
                })(Yn(Error));
            var Rr = W(function e(t, n, r, a) {
                U(this, e), void 0 === a && (a = !1), (this.status = t), (this.statusText = n || ""), (this.internal = a), r instanceof Error ? ((this.data = r.toString()), (this.error = r)) : (this.data = r);
            });
            function Ar(e) {
                return null != e && "number" === typeof e.status && "string" === typeof e.statusText && "boolean" === typeof e.internal && "data" in e;
            }
            var Lr = ["post", "put", "patch", "delete"],
                Ir = new Set(Lr),
                _r = ["get"].concat(Lr),
                Dr = new Set(_r),
                Mr = new Set([301, 302, 303, 307, 308]),
                Fr = new Set([307, 308]),
                zr = { state: "idle", location: void 0, formMethod: void 0, formAction: void 0, formEncType: void 0, formData: void 0, json: void 0, text: void 0 },
                Ur = { state: "idle", data: void 0, formMethod: void 0, formAction: void 0, formEncType: void 0, formData: void 0, json: void 0, text: void 0 },
                Br = { state: "unblocked", proceed: void 0, reset: void 0, location: void 0 },
                Wr = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
                Vr = function (e) {
                    return { hasErrorBoundary: Boolean(e.hasErrorBoundary) };
                };
            function Hr(e) {
                var t,
                    n = e.window ? e.window : "undefined" !== typeof window ? window : void 0,
                    r = "undefined" !== typeof n && "undefined" !== typeof n.document && "undefined" !== typeof n.document.createElement,
                    a = !r;
                if ((Jn(e.routes.length > 0, "You must provide a non-empty routes array to createRouter"), e.mapRouteProperties)) t = e.mapRouteProperties;
                else if (e.detectErrorBoundary) {
                    var o = e.detectErrorBoundary;
                    t = function (e) {
                        return { hasErrorBoundary: o(e) };
                    };
                } else t = Vr;
                var l,
                    s = {},
                    u = lr(e.routes, t, void 0, s),
                    c = e.basename || "/",
                    d = Kn({ v7_normalizeFormMethod: !1, v7_prependBasename: !1 }, e.future),
                    f = null,
                    h = new Set(),
                    p = null,
                    m = null,
                    v = null,
                    g = null != e.hydrationData,
                    y = sr(u, e.history.location, c),
                    b = null;
                if (null == y) {
                    var x = ua(404, { pathname: e.history.location.pathname }),
                        k = sa(u);
                    (y = k.matches), (b = i({}, k.route.id, x));
                }
                var C,
                    S,
                    N =
                        !y.some(function (e) {
                            return e.route.lazy;
                        }) &&
                        (!y.some(function (e) {
                            return e.route.loader;
                        }) ||
                            null != e.hydrationData),
                    P = {
                        historyAction: e.history.action,
                        location: e.history.location,
                        matches: y,
                        initialized: N,
                        navigation: zr,
                        restoreScrollPosition: null == e.hydrationData && null,
                        preventScrollReset: !1,
                        revalidation: "idle",
                        loaderData: (e.hydrationData && e.hydrationData.loaderData) || {},
                        actionData: (e.hydrationData && e.hydrationData.actionData) || null,
                        errors: (e.hydrationData && e.hydrationData.errors) || b,
                        fetchers: new Map(),
                        blockers: new Map(),
                    },
                    T = In.Pop,
                    O = !1,
                    R = !1,
                    A = !1,
                    L = [],
                    I = [],
                    _ = new Map(),
                    D = 0,
                    M = -1,
                    F = new Map(),
                    z = new Set(),
                    U = new Map(),
                    B = new Map(),
                    W = new Map(),
                    V = !1;
                function H(e) {
                    (P = Kn({}, P, e)),
                        h.forEach(function (e) {
                            return e(P);
                        });
                }
                function q(t, n) {
                    var r,
                        a,
                        o,
                        i = null != P.actionData && null != P.navigation.formMethod && ba(P.navigation.formMethod) && "loading" === P.navigation.state && !0 !== (null == (r = t.state) ? void 0 : r._isRedirect);
                    o = n.actionData ? (Object.keys(n.actionData).length > 0 ? n.actionData : null) : i ? P.actionData : null;
                    var s = n.loaderData ? ia(P.loaderData, n.loaderData, n.matches || [], n.errors) : P.loaderData,
                        c = P.blockers;
                    c.size > 0 &&
                        (c = new Map(c)).forEach(function (e, t) {
                            return c.set(t, Br);
                        });
                    var d = !0 === O || (null != P.navigation.formMethod && ba(P.navigation.formMethod) && !0 !== (null == (a = t.state) ? void 0 : a._isRedirect));
                    l && ((u = l), (l = void 0)),
                        R || T === In.Pop || (T === In.Push ? e.history.push(t, t.state) : T === In.Replace && e.history.replace(t, t.state)),
                        H(
                            Kn({}, n, {
                                actionData: o,
                                loaderData: s,
                                historyAction: T,
                                location: t,
                                initialized: !0,
                                navigation: zr,
                                revalidation: "idle",
                                restoreScrollPosition: xe(t, n.matches || P.matches),
                                preventScrollReset: d,
                                blockers: c,
                            })
                        ),
                        (T = In.Pop),
                        (O = !1),
                        (R = !1),
                        (A = !1),
                        (L = []),
                        (I = []);
                }
                function $(e, t) {
                    return G.apply(this, arguments);
                }
                function G() {
                    return (
                        (G = Gn(
                            qn().mark(function t(n, r) {
                                var a, o, i, l, s, u, f, h, p, m, v;
                                return qn().wrap(function (t) {
                                    for (; ;)
                                        switch ((t.prev = t.next)) {
                                            case 0:
                                                if ("number" !== typeof n) {
                                                    t.next = 3;
                                                    break;
                                                }
                                                return e.history.go(n), t.abrupt("return");
                                            case 3:
                                                if (
                                                    ((a = qr(P.location, P.matches, c, d.v7_prependBasename, n, null == r ? void 0 : r.fromRouteId, null == r ? void 0 : r.relative)),
                                                        (o = $r(d.v7_normalizeFormMethod, !1, a, r)),
                                                        (i = o.path),
                                                        (l = o.submission),
                                                        (s = o.error),
                                                        (u = P.location),
                                                        (f = Kn({}, (f = nr(P.location, i, r && r.state)), e.history.encodeLocation(f))),
                                                        (h = r && null != r.replace ? r.replace : void 0),
                                                        (p = In.Push),
                                                        !0 === h ? (p = In.Replace) : !1 === h || (null != l && ba(l.formMethod) && l.formAction === P.location.pathname + P.location.search && (p = In.Replace)),
                                                        (m = r && "preventScrollReset" in r ? !0 === r.preventScrollReset : void 0),
                                                        !(v = ve({ currentLocation: u, nextLocation: f, historyAction: p })))
                                                ) {
                                                    t.next = 16;
                                                    break;
                                                }
                                                return (
                                                    me(v, {
                                                        state: "blocked",
                                                        location: f,
                                                        proceed: function () {
                                                            me(v, { state: "proceeding", proceed: void 0, reset: void 0, location: f }), $(n, r);
                                                        },
                                                        reset: function () {
                                                            var e = new Map(P.blockers);
                                                            e.set(v, Br), H({ blockers: e });
                                                        },
                                                    }),
                                                    t.abrupt("return")
                                                );
                                            case 16:
                                                return (t.next = 18), Q(p, f, { submission: l, pendingError: s, preventScrollReset: m, replace: r && r.replace });
                                            case 18:
                                                return t.abrupt("return", t.sent);
                                            case 19:
                                            case "end":
                                                return t.stop();
                                        }
                                }, t);
                            })
                        )),
                        G.apply(this, arguments)
                    );
                }
                function Q(e, t, n) {
                    return Y.apply(this, arguments);
                }
                function Y() {
                    return (
                        (Y = Gn(
                            qn().mark(function t(n, r, a) {
                                var o, s, d, f, h, p, m, v, g, y, b, x, w, k, C;
                                return qn().wrap(function (t) {
                                    for (; ;)
                                        switch ((t.prev = t.next)) {
                                            case 0:
                                                if (
                                                    (S && S.abort(),
                                                        (S = null),
                                                        (T = n),
                                                        (R = !0 === (a && a.startUninterruptedRevalidation)),
                                                        be(P.location, P.matches),
                                                        (O = !0 === (a && a.preventScrollReset)),
                                                        (o = l || u),
                                                        (s = a && a.overrideNavigation),
                                                        (d = sr(o, r, c)))
                                                ) {
                                                    t.next = 15;
                                                    break;
                                                }
                                                return (f = ua(404, { pathname: r.pathname })), (h = sa(o)), (p = h.matches), (m = h.route), ge(), q(r, { matches: p, loaderData: {}, errors: i({}, m.id, f) }), t.abrupt("return");
                                            case 15:
                                                if (!P.initialized || A || !fa(P.location, r) || (a && a.submission && ba(a.submission.formMethod))) {
                                                    t.next = 18;
                                                    break;
                                                }
                                                return q(r, { matches: d }), t.abrupt("return");
                                            case 18:
                                                if (((S = new AbortController()), (v = ta(e.history, r, S.signal, a && a.submission)), !a || !a.pendingError)) {
                                                    t.next = 24;
                                                    break;
                                                }
                                                (y = i({}, la(d).route.id, a.pendingError)), (t.next = 34);
                                                break;
                                            case 24:
                                                if (!(a && a.submission && ba(a.submission.formMethod))) {
                                                    t.next = 34;
                                                    break;
                                                }
                                                return (t.next = 27), K(v, r, a.submission, d, { replace: a.replace });
                                            case 27:
                                                if (!(b = t.sent).shortCircuited) {
                                                    t.next = 30;
                                                    break;
                                                }
                                                return t.abrupt("return");
                                            case 30:
                                                (g = b.pendingActionData), (y = b.pendingActionError), (s = Na(r, a.submission)), (v = new Request(v.url, { signal: v.signal }));
                                            case 34:
                                                return (t.next = 36), X(v, r, d, s, a && a.submission, a && a.fetcherSubmission, a && a.replace, g, y);
                                            case 36:
                                                if (((x = t.sent), (w = x.shortCircuited), (k = x.loaderData), (C = x.errors), !w)) {
                                                    t.next = 42;
                                                    break;
                                                }
                                                return t.abrupt("return");
                                            case 42:
                                                (S = null), q(r, Kn({ matches: d }, g ? { actionData: g } : {}, { loaderData: k, errors: C }));
                                            case 44:
                                            case "end":
                                                return t.stop();
                                        }
                                }, t);
                            })
                        )),
                        Y.apply(this, arguments)
                    );
                }
                function K(e, t, n, r, a) {
                    return Z.apply(this, arguments);
                }
                function Z() {
                    return (
                        (Z = Gn(
                            qn().mark(function e(n, r, a, o, l) {
                                var u, d, f, h;
                                return qn().wrap(function (e) {
                                    for (; ;)
                                        switch ((e.prev = e.next)) {
                                            case 0:
                                                if ((void 0 === l && (l = {}), le(), H({ navigation: Pa(r, a) }), (d = Sa(o, r)).route.action || d.route.lazy)) {
                                                    e.next = 9;
                                                    break;
                                                }
                                                (u = { type: Zn.error, error: ua(405, { method: n.method, pathname: r.pathname, routeId: d.route.id }) }), (e.next = 14);
                                                break;
                                            case 9:
                                                return (e.next = 11), Jr("action", n, d, o, s, t, c);
                                            case 11:
                                                if (((u = e.sent), !n.signal.aborted)) {
                                                    e.next = 14;
                                                    break;
                                                }
                                                return e.abrupt("return", { shortCircuited: !0 });
                                            case 14:
                                                if (!ma(u)) {
                                                    e.next = 19;
                                                    break;
                                                }
                                                return (f = l && null != l.replace ? l.replace : u.location === P.location.pathname + P.location.search), (e.next = 18), re(P, u, { submission: a, replace: f });
                                            case 18:
                                                return e.abrupt("return", { shortCircuited: !0 });
                                            case 19:
                                                if (!pa(u)) {
                                                    e.next = 23;
                                                    break;
                                                }
                                                return (h = la(o, d.route.id)), !0 !== (l && l.replace) && (T = In.Push), e.abrupt("return", { pendingActionData: {}, pendingActionError: i({}, h.route.id, u.error) });
                                            case 23:
                                                if (!ha(u)) {
                                                    e.next = 25;
                                                    break;
                                                }
                                                throw ua(400, { type: "defer-action" });
                                            case 25:
                                                return e.abrupt("return", { pendingActionData: i({}, d.route.id, u.data) });
                                            case 26:
                                            case "end":
                                                return e.stop();
                                        }
                                }, e);
                            })
                        )),
                        Z.apply(this, arguments)
                    );
                }
                function X(e, t, n, r, a, o, i, l, s) {
                    return J.apply(this, arguments);
                }
                function J() {
                    return (
                        (J = Gn(
                            qn().mark(function t(n, r, a, o, i, s, d, f, h) {
                                var p, m, v, g, y, b, x, w, k, C, E, N, T, O, F, W, V, $, G, Q, Y, K;
                                return qn().wrap(function (t) {
                                    for (; ;)
                                        switch ((t.prev = t.next)) {
                                            case 0:
                                                if (
                                                    ((p = o || Na(r, i)),
                                                        (m = i || s || Ea(p)),
                                                        (v = l || u),
                                                        (g = Qr(e.history, P, a, m, r, A, L, I, U, z, v, c, f, h)),
                                                        (y = j(g, 2)),
                                                        (b = y[0]),
                                                        (x = y[1]),
                                                        ge(function (e) {
                                                            return (
                                                                !(
                                                                    a &&
                                                                    a.some(function (t) {
                                                                        return t.route.id === e;
                                                                    })
                                                                ) ||
                                                                (b &&
                                                                    b.some(function (t) {
                                                                        return t.route.id === e;
                                                                    }))
                                                            );
                                                        }),
                                                        (M = ++D),
                                                        0 !== b.length || 0 !== x.length)
                                                ) {
                                                    t.next = 10;
                                                    break;
                                                }
                                                return (
                                                    (w = fe()), q(r, Kn({ matches: a, loaderData: {}, errors: h || null }, f ? { actionData: f } : {}, w ? { fetchers: new Map(P.fetchers) } : {})), t.abrupt("return", { shortCircuited: !0 })
                                                );
                                            case 10:
                                                return (
                                                    R ||
                                                    (x.forEach(function (e) {
                                                        var t = P.fetchers.get(e.key),
                                                            n = Ta(void 0, t ? t.data : void 0);
                                                        P.fetchers.set(e.key, n);
                                                    }),
                                                        (k = f || P.actionData),
                                                        H(Kn({ navigation: p }, k ? (0 === Object.keys(k).length ? { actionData: null } : { actionData: k }) : {}, x.length > 0 ? { fetchers: new Map(P.fetchers) } : {}))),
                                                    x.forEach(function (e) {
                                                        _.has(e.key) && ce(e.key), e.controller && _.set(e.key, e.controller);
                                                    }),
                                                    (C = function () {
                                                        return x.forEach(function (e) {
                                                            return ce(e.key);
                                                        });
                                                    }),
                                                    S && S.signal.addEventListener("abort", C),
                                                    (t.next = 16),
                                                    oe(P.matches, a, b, x, n)
                                                );
                                            case 16:
                                                if (((E = t.sent), (N = E.results), (T = E.loaderResults), (O = E.fetcherResults), !n.signal.aborted)) {
                                                    t.next = 22;
                                                    break;
                                                }
                                                return t.abrupt("return", { shortCircuited: !0 });
                                            case 22:
                                                if (
                                                    (S && S.signal.removeEventListener("abort", C),
                                                        x.forEach(function (e) {
                                                            return _.delete(e.key);
                                                        }),
                                                        !(F = ca(N)))
                                                ) {
                                                    t.next = 30;
                                                    break;
                                                }
                                                return F.idx >= b.length && ((W = x[F.idx - b.length].key), z.add(W)), (t.next = 29), re(P, F.result, { replace: d });
                                            case 29:
                                                return t.abrupt("return", { shortCircuited: !0 });
                                            case 30:
                                                return (
                                                    (V = oa(P, a, b, T, h, x, O, B)),
                                                    ($ = V.loaderData),
                                                    (G = V.errors),
                                                    B.forEach(function (e, t) {
                                                        e.subscribe(function (n) {
                                                            (n || e.done) && B.delete(t);
                                                        });
                                                    }),
                                                    (Q = fe()),
                                                    (Y = he(M)),
                                                    (K = Q || Y || x.length > 0),
                                                    t.abrupt("return", Kn({ loaderData: $, errors: G }, K ? { fetchers: new Map(P.fetchers) } : {}))
                                                );
                                            case 36:
                                            case "end":
                                                return t.stop();
                                        }
                                }, t);
                            })
                        )),
                        J.apply(this, arguments)
                    );
                }
                function ee(e) {
                    return P.fetchers.get(e) || Ur;
                }
                function te() {
                    return (
                        (te = Gn(
                            qn().mark(function n(r, a, o, d, f, h) {
                                var p, m, v, g, y, b, x, w, k, C, E, N, O, R, W, V, $, G, Q, Y, K, Z, X, J, ee, te, ne, ae, ie, ue, de;
                                return qn().wrap(function (n) {
                                    for (; ;)
                                        switch ((n.prev = n.next)) {
                                            case 0:
                                                if ((le(), U.delete(r), d.route.action || d.route.lazy)) {
                                                    n.next = 6;
                                                    break;
                                                }
                                                return (p = ua(405, { method: h.formMethod, pathname: o, routeId: a })), se(r, a, p), n.abrupt("return");
                                            case 6:
                                                return (
                                                    (m = P.fetchers.get(r)),
                                                    (v = Oa(h, m)),
                                                    P.fetchers.set(r, v),
                                                    H({ fetchers: new Map(P.fetchers) }),
                                                    (g = new AbortController()),
                                                    (y = ta(e.history, o, g.signal, h)),
                                                    _.set(r, g),
                                                    (b = D),
                                                    (n.next = 16),
                                                    Jr("action", y, d, f, s, t, c)
                                                );
                                            case 16:
                                                if (((x = n.sent), !y.signal.aborted)) {
                                                    n.next = 20;
                                                    break;
                                                }
                                                return _.get(r) === g && _.delete(r), n.abrupt("return");
                                            case 20:
                                                if (!ma(x)) {
                                                    n.next = 34;
                                                    break;
                                                }
                                                if ((_.delete(r), !(M > b))) {
                                                    n.next = 29;
                                                    break;
                                                }
                                                return (w = Ra(void 0)), P.fetchers.set(r, w), H({ fetchers: new Map(P.fetchers) }), n.abrupt("return");
                                            case 29:
                                                return z.add(r), (k = Ta(h)), P.fetchers.set(r, k), H({ fetchers: new Map(P.fetchers) }), n.abrupt("return", re(P, x, { submission: h, isFetchActionRedirect: !0 }));
                                            case 34:
                                                if (!pa(x)) {
                                                    n.next = 37;
                                                    break;
                                                }
                                                return se(r, a, x.error), n.abrupt("return");
                                            case 37:
                                                if (!ha(x)) {
                                                    n.next = 39;
                                                    break;
                                                }
                                                throw ua(400, { type: "defer-action" });
                                            case 39:
                                                return (
                                                    (C = P.navigation.location || P.location),
                                                    (E = ta(e.history, C, g.signal)),
                                                    (N = l || u),
                                                    Jn((O = "idle" !== P.navigation.state ? sr(N, P.navigation.location, c) : P.matches), "Didn't find any matches after fetcher action"),
                                                    (R = ++D),
                                                    F.set(r, R),
                                                    (W = Ta(h, x.data)),
                                                    P.fetchers.set(r, W),
                                                    (V = Qr(e.history, P, O, h, C, A, L, I, U, z, N, c, i({}, d.route.id, x.data), void 0)),
                                                    ($ = j(V, 2)),
                                                    (G = $[0]),
                                                    (Q = $[1])
                                                        .filter(function (e) {
                                                            return e.key !== r;
                                                        })
                                                        .forEach(function (e) {
                                                            var t = e.key,
                                                                n = P.fetchers.get(t),
                                                                r = Ta(void 0, n ? n.data : void 0);
                                                            P.fetchers.set(t, r), _.has(t) && ce(t), e.controller && _.set(t, e.controller);
                                                        }),
                                                    H({ fetchers: new Map(P.fetchers) }),
                                                    (Y = function () {
                                                        return Q.forEach(function (e) {
                                                            return ce(e.key);
                                                        });
                                                    }),
                                                    g.signal.addEventListener("abort", Y),
                                                    (n.next = 55),
                                                    oe(P.matches, O, G, Q, E)
                                                );
                                            case 55:
                                                if (((K = n.sent), (Z = K.results), (X = K.loaderResults), (J = K.fetcherResults), !g.signal.aborted)) {
                                                    n.next = 61;
                                                    break;
                                                }
                                                return n.abrupt("return");
                                            case 61:
                                                if (
                                                    (g.signal.removeEventListener("abort", Y),
                                                        F.delete(r),
                                                        _.delete(r),
                                                        Q.forEach(function (e) {
                                                            return _.delete(e.key);
                                                        }),
                                                        !(ee = ca(Z)))
                                                ) {
                                                    n.next = 69;
                                                    break;
                                                }
                                                return ee.idx >= G.length && ((te = Q[ee.idx - G.length].key), z.add(te)), n.abrupt("return", re(P, ee.result));
                                            case 69:
                                                (ne = oa(P, P.matches, G, X, void 0, Q, J, B)),
                                                    (ae = ne.loaderData),
                                                    (ie = ne.errors),
                                                    P.fetchers.has(r) && ((ue = Ra(x.data)), P.fetchers.set(r, ue)),
                                                    (de = he(R)),
                                                    "loading" === P.navigation.state && R > M
                                                        ? (Jn(T, "Expected pending action"), S && S.abort(), q(P.navigation.location, { matches: O, loaderData: ae, errors: ie, fetchers: new Map(P.fetchers) }))
                                                        : (H(Kn({ errors: ie, loaderData: ia(P.loaderData, ae, O, ie) }, de || Q.length > 0 ? { fetchers: new Map(P.fetchers) } : {})), (A = !1));
                                            case 73:
                                            case "end":
                                                return n.stop();
                                        }
                                }, n);
                            })
                        )),
                        te.apply(this, arguments)
                    );
                }
                function ne() {
                    return (
                        (ne = Gn(
                            qn().mark(function n(r, a, o, l, u, d) {
                                var f, h, p, m, v, g, y, b, x;
                                return qn().wrap(function (n) {
                                    for (; ;)
                                        switch ((n.prev = n.next)) {
                                            case 0:
                                                return (
                                                    (f = P.fetchers.get(r)),
                                                    (h = Ta(d, f ? f.data : void 0)),
                                                    P.fetchers.set(r, h),
                                                    H({ fetchers: new Map(P.fetchers) }),
                                                    (p = new AbortController()),
                                                    (m = ta(e.history, o, p.signal)),
                                                    _.set(r, p),
                                                    (v = D),
                                                    (n.next = 10),
                                                    Jr("loader", m, l, u, s, t, c)
                                                );
                                            case 10:
                                                if (!ha((g = n.sent))) {
                                                    n.next = 18;
                                                    break;
                                                }
                                                return (n.next = 14), ka(g, m.signal, !0);
                                            case 14:
                                                if (((n.t0 = n.sent), n.t0)) {
                                                    n.next = 17;
                                                    break;
                                                }
                                                n.t0 = g;
                                            case 17:
                                                g = n.t0;
                                            case 18:
                                                if ((_.get(r) === p && _.delete(r), !m.signal.aborted)) {
                                                    n.next = 21;
                                                    break;
                                                }
                                                return n.abrupt("return");
                                            case 21:
                                                if (!ma(g)) {
                                                    n.next = 33;
                                                    break;
                                                }
                                                if (!(M > v)) {
                                                    n.next = 29;
                                                    break;
                                                }
                                                return (y = Ra(void 0)), P.fetchers.set(r, y), H({ fetchers: new Map(P.fetchers) }), n.abrupt("return");
                                            case 29:
                                                return z.add(r), (n.next = 32), re(P, g);
                                            case 32:
                                                return n.abrupt("return");
                                            case 33:
                                                if (!pa(g)) {
                                                    n.next = 38;
                                                    break;
                                                }
                                                return (b = la(P.matches, a)), P.fetchers.delete(r), H({ fetchers: new Map(P.fetchers), errors: i({}, b.route.id, g.error) }), n.abrupt("return");
                                            case 38:
                                                Jn(!ha(g), "Unhandled fetcher deferred data"), (x = Ra(g.data)), P.fetchers.set(r, x), H({ fetchers: new Map(P.fetchers) });
                                            case 42:
                                            case "end":
                                                return n.stop();
                                        }
                                }, n);
                            })
                        )),
                        ne.apply(this, arguments)
                    );
                }
                function re(e, t, n) {
                    return ae.apply(this, arguments);
                }
                function ae() {
                    return (
                        (ae = Gn(
                            qn().mark(function t(a, o, i) {
                                var l, s, u, d, f, h, p, m, v, g;
                                return qn().wrap(function (t) {
                                    for (; ;)
                                        switch ((t.prev = t.next)) {
                                            case 0:
                                                if (
                                                    ((s = (l = void 0 === i ? {} : i).submission),
                                                        (u = l.replace),
                                                        (d = l.isFetchActionRedirect),
                                                        o.revalidate && (A = !0),
                                                        Jn((f = nr(a.location, o.location, Kn({ _isRedirect: !0 }, d ? { _isFetchActionRedirect: !0 } : {}))), "Expected a location on the redirect navigation"),
                                                        !Wr.test(o.location) || !r)
                                                ) {
                                                    t.next = 10;
                                                    break;
                                                }
                                                if (((h = e.history.createURL(o.location)), (p = null == kr(h.pathname, c)), n.location.origin === h.origin && !p)) {
                                                    t.next = 10;
                                                    break;
                                                }
                                                return u ? n.location.replace(o.location) : n.location.assign(o.location), t.abrupt("return");
                                            case 10:
                                                if (((S = null), (m = !0 === u ? In.Replace : In.Push), (v = s || Ea(a.navigation)), !(Fr.has(o.status) && v && ba(v.formMethod)))) {
                                                    t.next = 18;
                                                    break;
                                                }
                                                return (t.next = 16), Q(m, f, { submission: Kn({}, v, { formAction: o.location }), preventScrollReset: O });
                                            case 16:
                                            case 21:
                                                t.next = 26;
                                                break;
                                            case 18:
                                                if (!d) {
                                                    t.next = 23;
                                                    break;
                                                }
                                                return (t.next = 21), Q(m, f, { overrideNavigation: Na(f), fetcherSubmission: v, preventScrollReset: O });
                                            case 23:
                                                return (g = Na(f, v)), (t.next = 26), Q(m, f, { overrideNavigation: g, preventScrollReset: O });
                                            case 26:
                                            case "end":
                                                return t.stop();
                                        }
                                }, t);
                            })
                        )),
                        ae.apply(this, arguments)
                    );
                }
                function oe(e, t, n, r, a) {
                    return ie.apply(this, arguments);
                }
                function ie() {
                    return (
                        (ie = Gn(
                            qn().mark(function n(r, a, o, i, l) {
                                var u, d, f;
                                return qn().wrap(function (n) {
                                    for (; ;)
                                        switch ((n.prev = n.next)) {
                                            case 0:
                                                return (
                                                    (n.next = 2),
                                                    Promise.all(
                                                        [].concat(
                                                            E(
                                                                o.map(function (e) {
                                                                    return Jr("loader", l, e, a, s, t, c);
                                                                })
                                                            ),
                                                            E(
                                                                i.map(function (n) {
                                                                    return n.matches && n.match && n.controller
                                                                        ? Jr("loader", ta(e.history, n.path, n.controller.signal), n.match, n.matches, s, t, c)
                                                                        : { type: Zn.error, error: ua(404, { pathname: n.path }) };
                                                                })
                                                            )
                                                        )
                                                    )
                                                );
                                            case 2:
                                                return (
                                                    (u = n.sent),
                                                    (d = u.slice(0, o.length)),
                                                    (f = u.slice(o.length)),
                                                    (n.next = 7),
                                                    Promise.all([
                                                        xa(
                                                            r,
                                                            o,
                                                            d,
                                                            d.map(function () {
                                                                return l.signal;
                                                            }),
                                                            !1,
                                                            P.loaderData
                                                        ),
                                                        xa(
                                                            r,
                                                            i.map(function (e) {
                                                                return e.match;
                                                            }),
                                                            f,
                                                            i.map(function (e) {
                                                                return e.controller ? e.controller.signal : null;
                                                            }),
                                                            !0
                                                        ),
                                                    ])
                                                );
                                            case 7:
                                                return n.abrupt("return", { results: u, loaderResults: d, fetcherResults: f });
                                            case 8:
                                            case "end":
                                                return n.stop();
                                        }
                                }, n);
                            })
                        )),
                        ie.apply(this, arguments)
                    );
                }
                function le() {
                    var e;
                    (A = !0),
                        (e = L).push.apply(e, E(ge())),
                        U.forEach(function (e, t) {
                            _.has(t) && (I.push(t), ce(t));
                        });
                }
                function se(e, t, n) {
                    var r = la(P.matches, t);
                    ue(e), H({ errors: i({}, r.route.id, n), fetchers: new Map(P.fetchers) });
                }
                function ue(e) {
                    var t = P.fetchers.get(e);
                    !_.has(e) || (t && "loading" === t.state && F.has(e)) || ce(e), U.delete(e), F.delete(e), z.delete(e), P.fetchers.delete(e);
                }
                function ce(e) {
                    var t = _.get(e);
                    Jn(t, "Expected fetch controller: " + e), t.abort(), _.delete(e);
                }
                function de(e) {
                    var t,
                        n = w(e);
                    try {
                        for (n.s(); !(t = n.n()).done;) {
                            var r = t.value,
                                a = Ra(ee(r).data);
                            P.fetchers.set(r, a);
                        }
                    } catch (o) {
                        n.e(o);
                    } finally {
                        n.f();
                    }
                }
                function fe() {
                    var e,
                        t = [],
                        n = !1,
                        r = w(z);
                    try {
                        for (r.s(); !(e = r.n()).done;) {
                            var a = e.value,
                                o = P.fetchers.get(a);
                            Jn(o, "Expected fetcher: " + a), "loading" === o.state && (z.delete(a), t.push(a), (n = !0));
                        }
                    } catch (i) {
                        r.e(i);
                    } finally {
                        r.f();
                    }
                    return de(t), n;
                }
                function he(e) {
                    var t,
                        n = [],
                        r = w(F);
                    try {
                        for (r.s(); !(t = r.n()).done;) {
                            var a = j(t.value, 2),
                                o = a[0];
                            if (a[1] < e) {
                                var i = P.fetchers.get(o);
                                Jn(i, "Expected fetcher: " + o), "loading" === i.state && (ce(o), F.delete(o), n.push(o));
                            }
                        }
                    } catch (l) {
                        r.e(l);
                    } finally {
                        r.f();
                    }
                    return de(n), n.length > 0;
                }
                function pe(e) {
                    P.blockers.delete(e), W.delete(e);
                }
                function me(e, t) {
                    var n = P.blockers.get(e) || Br;
                    Jn(
                        ("unblocked" === n.state && "blocked" === t.state) ||
                        ("blocked" === n.state && "blocked" === t.state) ||
                        ("blocked" === n.state && "proceeding" === t.state) ||
                        ("blocked" === n.state && "unblocked" === t.state) ||
                        ("proceeding" === n.state && "unblocked" === t.state),
                        "Invalid blocker state transition: " + n.state + " -> " + t.state
                    );
                    var r = new Map(P.blockers);
                    r.set(e, t), H({ blockers: r });
                }
                function ve(e) {
                    var t = e.currentLocation,
                        n = e.nextLocation,
                        r = e.historyAction;
                    if (0 !== W.size) {
                        W.size > 1 && er(!1, "A router only supports one blocker at a time");
                        var a = Array.from(W.entries()),
                            o = j(a[a.length - 1], 2),
                            i = o[0],
                            l = o[1],
                            s = P.blockers.get(i);
                        if (!s || "proceeding" !== s.state) return l({ currentLocation: t, nextLocation: n, historyAction: r }) ? i : void 0;
                    }
                }
                function ge(e) {
                    var t = [];
                    return (
                        B.forEach(function (n, r) {
                            (e && !e(r)) || (n.cancel(), t.push(r), B.delete(r));
                        }),
                        t
                    );
                }
                function ye(e, t) {
                    if (m) {
                        var n = m(
                            e,
                            t.map(function (e) {
                                return (function (e, t) {
                                    var n = e.route,
                                        r = e.pathname,
                                        a = e.params;
                                    return { id: n.id, pathname: r, params: a, data: t[n.id], handle: n.handle };
                                })(e, P.loaderData);
                            })
                        );
                        return n || e.key;
                    }
                    return e.key;
                }
                function be(e, t) {
                    if (p && v) {
                        var n = ye(e, t);
                        p[n] = v();
                    }
                }
                function xe(e, t) {
                    if (p) {
                        var n = ye(e, t),
                            r = p[n];
                        if ("number" === typeof r) return r;
                    }
                    return null;
                }
                return (
                    (C = {
                        get basename() {
                            return c;
                        },
                        get state() {
                            return P;
                        },
                        get routes() {
                            return u;
                        },
                        initialize: function () {
                            return (
                                (f = e.history.listen(function (t) {
                                    var n = t.action,
                                        r = t.location,
                                        a = t.delta;
                                    if (!V) {
                                        er(
                                            0 === W.size || null != a,
                                            "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL."
                                        );
                                        var o = ve({ currentLocation: P.location, nextLocation: r, historyAction: n });
                                        return o && null != a
                                            ? ((V = !0),
                                                e.history.go(-1 * a),
                                                void me(o, {
                                                    state: "blocked",
                                                    location: r,
                                                    proceed: function () {
                                                        me(o, { state: "proceeding", proceed: void 0, reset: void 0, location: r }), e.history.go(a);
                                                    },
                                                    reset: function () {
                                                        var e = new Map(P.blockers);
                                                        e.set(o, Br), H({ blockers: e });
                                                    },
                                                }))
                                            : Q(n, r);
                                    }
                                    V = !1;
                                })),
                                P.initialized || Q(In.Pop, P.location),
                                C
                            );
                        },
                        subscribe: function (e) {
                            return (
                                h.add(e),
                                function () {
                                    return h.delete(e);
                                }
                            );
                        },
                        enableScrollRestoration: function (e, t, n) {
                            if (((p = e), (v = t), (m = n || null), !g && P.navigation === zr)) {
                                g = !0;
                                var r = xe(P.location, P.matches);
                                null != r && H({ restoreScrollPosition: r });
                            }
                            return function () {
                                (p = null), (v = null), (m = null);
                            };
                        },
                        navigate: $,
                        fetch: function (e, t, n, r) {
                            if (a)
                                throw new Error(
                                    "router.fetch() was called during the server render, but it shouldn't be. You are likely calling a useFetcher() method in the body of your component. Try moving it to a useEffect or a callback."
                                );
                            _.has(e) && ce(e);
                            var o = l || u,
                                i = qr(P.location, P.matches, c, d.v7_prependBasename, n, t, null == r ? void 0 : r.relative),
                                s = sr(o, i, c);
                            if (s) {
                                var f = $r(d.v7_normalizeFormMethod, !0, i, r),
                                    h = f.path,
                                    p = f.submission,
                                    m = f.error;
                                if (m) se(e, t, m);
                                else {
                                    var v = Sa(s, h);
                                    (O = !0 === (r && r.preventScrollReset)),
                                        p && ba(p.formMethod)
                                            ? (function (e, t, n, r, a, o) {
                                                te.apply(this, arguments);
                                            })(e, t, h, v, s, p)
                                            : (U.set(e, { routeId: t, path: h }),
                                                (function (e, t, n, r, a, o) {
                                                    ne.apply(this, arguments);
                                                })(e, t, h, v, s, p));
                                }
                            } else se(e, t, ua(404, { pathname: i }));
                        },
                        revalidate: function () {
                            le(),
                                H({ revalidation: "loading" }),
                                "submitting" !== P.navigation.state &&
                                ("idle" !== P.navigation.state ? Q(T || P.historyAction, P.navigation.location, { overrideNavigation: P.navigation }) : Q(P.historyAction, P.location, { startUninterruptedRevalidation: !0 }));
                        },
                        createHref: function (t) {
                            return e.history.createHref(t);
                        },
                        encodeLocation: function (t) {
                            return e.history.encodeLocation(t);
                        },
                        getFetcher: ee,
                        deleteFetcher: ue,
                        dispose: function () {
                            f && f(),
                                h.clear(),
                                S && S.abort(),
                                P.fetchers.forEach(function (e, t) {
                                    return ue(t);
                                }),
                                P.blockers.forEach(function (e, t) {
                                    return pe(t);
                                });
                        },
                        getBlocker: function (e, t) {
                            var n = P.blockers.get(e) || Br;
                            return W.get(e) !== t && W.set(e, t), n;
                        },
                        deleteBlocker: pe,
                        _internalFetchControllers: _,
                        _internalActiveDeferreds: B,
                        _internalSetRoutes: function (e) {
                            l = lr(e, t, void 0, (s = {}));
                        },
                    }),
                    C
                );
            }
            Symbol("deferred");
            function qr(e, t, n, r, a, o, i) {
                var l, s;
                if (null != o && "path" !== i) {
                    l = [];
                    var u,
                        c = w(t);
                    try {
                        for (c.s(); !(u = c.n()).done;) {
                            var d = u.value;
                            if ((l.push(d), d.route.id === o)) {
                                s = d;
                                break;
                            }
                        }
                    } catch (h) {
                        c.e(h);
                    } finally {
                        c.f();
                    }
                } else (l = t), (s = t[t.length - 1]);
                var f = Sr(
                    a || ".",
                    jr(l).map(function (e) {
                        return e.pathnameBase;
                    }),
                    kr(e.pathname, n) || e.pathname,
                    "path" === i
                );
                return (
                    null == a && ((f.search = e.search), (f.hash = e.hash)),
                    (null != a && "" !== a && "." !== a) || !s || !s.route.index || ja(f.search) || (f.search = f.search ? f.search.replace(/^\?/, "?index&") : "?index"),
                    r && "/" !== n && (f.pathname = "/" === f.pathname ? n : Er([n, f.pathname])),
                    rr(f)
                );
            }
            function $r(e, t, n, r) {
                if (
                    !r ||
                    !(function (e) {
                        return null != e && (("formData" in e && null != e.formData) || ("body" in e && void 0 !== e.body));
                    })(r)
                )
                    return { path: n };
                if (r.formMethod && !ya(r.formMethod)) return { path: n, error: ua(405, { method: r.formMethod }) };
                var a,
                    o,
                    i = function () {
                        return { path: n, error: ua(400, { type: "invalid-body" }) };
                    },
                    l = r.formMethod || "get",
                    s = e ? l.toUpperCase() : l.toLowerCase(),
                    u = da(n);
                if (void 0 !== r.body) {
                    if ("text/plain" === r.formEncType) {
                        if (!ba(s)) return i();
                        var c =
                            "string" === typeof r.body
                                ? r.body
                                : r.body instanceof FormData || r.body instanceof URLSearchParams
                                    ? Array.from(r.body.entries()).reduce(function (e, t) {
                                        var n = j(t, 2);
                                        return "" + e + n[0] + "=" + n[1] + "\n";
                                    }, "")
                                    : String(r.body);
                        return { path: n, submission: { formMethod: s, formAction: u, formEncType: r.formEncType, formData: void 0, json: void 0, text: c } };
                    }
                    if ("application/json" === r.formEncType) {
                        if (!ba(s)) return i();
                        try {
                            var d = "string" === typeof r.body ? JSON.parse(r.body) : r.body;
                            return { path: n, submission: { formMethod: s, formAction: u, formEncType: r.formEncType, formData: void 0, json: d, text: void 0 } };
                        } catch (ft) {
                            return i();
                        }
                    }
                }
                if ((Jn("function" === typeof FormData, "FormData is not available in this environment"), r.formData)) (a = na(r.formData)), (o = r.formData);
                else if (r.body instanceof FormData) (a = na(r.body)), (o = r.body);
                else if (r.body instanceof URLSearchParams) o = ra((a = r.body));
                else if (null == r.body) (a = new URLSearchParams()), (o = new FormData());
                else
                    try {
                        o = ra((a = new URLSearchParams(r.body)));
                    } catch (ft) {
                        return i();
                    }
                var f = { formMethod: s, formAction: u, formEncType: (r && r.formEncType) || "application/x-www-form-urlencoded", formData: o, json: void 0, text: void 0 };
                if (ba(f.formMethod)) return { path: n, submission: f };
                var h = ar(n);
                return t && h.search && ja(h.search) && a.append("index", ""), (h.search = "?" + a), { path: rr(h), submission: f };
            }
            function Gr(e, t) {
                var n = e;
                if (t) {
                    var r = e.findIndex(function (e) {
                        return e.route.id === t;
                    });
                    r >= 0 && (n = e.slice(0, r));
                }
                return n;
            }
            function Qr(e, t, n, r, a, o, i, l, s, u, c, d, f, h) {
                var p = h ? Object.values(h)[0] : f ? Object.values(f)[0] : void 0,
                    m = e.createURL(t.location),
                    v = e.createURL(a),
                    g = h ? Object.keys(h)[0] : void 0,
                    y = Gr(n, g).filter(function (e, n) {
                        if (e.route.lazy) return !0;
                        if (null == e.route.loader) return !1;
                        if (
                            (function (e, t, n) {
                                var r = !t || n.route.id !== t.route.id,
                                    a = void 0 === e[n.route.id];
                                return r || a;
                            })(t.loaderData, t.matches[n], e) ||
                            i.some(function (t) {
                                return t === e.route.id;
                            })
                        )
                            return !0;
                        var a = t.matches[n],
                            l = e;
                        return Kr(
                            e,
                            Kn({ currentUrl: m, currentParams: a.params, nextUrl: v, nextParams: l.params }, r, {
                                actionResult: p,
                                defaultShouldRevalidate: o || m.pathname + m.search === v.pathname + v.search || m.search !== v.search || Yr(a, l),
                            })
                        );
                    }),
                    b = [];
                return (
                    s.forEach(function (e, a) {
                        if (
                            n.some(function (t) {
                                return t.route.id === e.routeId;
                            })
                        ) {
                            var i = sr(c, e.path, d);
                            if (i) {
                                var s = t.fetchers.get(a),
                                    f = Sa(i, e.path);
                                !u.has(a) &&
                                    (!!l.includes(a) ||
                                        (s && "idle" !== s.state && void 0 === s.data
                                            ? o
                                            : Kr(f, Kn({ currentUrl: m, currentParams: t.matches[t.matches.length - 1].params, nextUrl: v, nextParams: n[n.length - 1].params }, r, { actionResult: p, defaultShouldRevalidate: o })))) &&
                                    b.push({ key: a, routeId: e.routeId, path: e.path, matches: i, match: f, controller: new AbortController() });
                            } else b.push({ key: a, routeId: e.routeId, path: e.path, matches: null, match: null, controller: null });
                        }
                    }),
                    [y, b]
                );
            }
            function Yr(e, t) {
                var n = e.route.path;
                return e.pathname !== t.pathname || (null != n && n.endsWith("*") && e.params["*"] !== t.params["*"]);
            }
            function Kr(e, t) {
                if (e.route.shouldRevalidate) {
                    var n = e.route.shouldRevalidate(t);
                    if ("boolean" === typeof n) return n;
                }
                return t.defaultShouldRevalidate;
            }
            function Zr(e, t, n) {
                return Xr.apply(this, arguments);
            }
            function Xr() {
                return (
                    (Xr = Gn(
                        qn().mark(function e(t, n, r) {
                            var a, o, i, l, s, u;
                            return qn().wrap(function (e) {
                                for (; ;)
                                    switch ((e.prev = e.next)) {
                                        case 0:
                                            if (t.lazy) {
                                                e.next = 2;
                                                break;
                                            }
                                            return e.abrupt("return");
                                        case 2:
                                            return (e.next = 4), t.lazy();
                                        case 4:
                                            if (((a = e.sent), t.lazy)) {
                                                e.next = 7;
                                                break;
                                            }
                                            return e.abrupt("return");
                                        case 7:
                                            for (l in (Jn((o = r[t.id]), "No route found in manifest"), (i = {}), a))
                                                (s = o[l]),
                                                    er(
                                                        !(u = void 0 !== s && "hasErrorBoundary" !== l),
                                                        'Route "' + o.id + '" has a static property "' + l + '" defined but its lazy function is also returning a value for this property. The lazy route property "' + l + '" will be ignored.'
                                                    ),
                                                    u || ir.has(l) || (i[l] = a[l]);
                                            Object.assign(o, i), Object.assign(o, Kn({}, n(o), { lazy: void 0 }));
                                        case 13:
                                        case "end":
                                            return e.stop();
                                    }
                            }, e);
                        })
                    )),
                    Xr.apply(this, arguments)
                );
            }
            function Jr(e, t, n, r, a, o, i, l) {
                return ea.apply(this, arguments);
            }
            function ea() {
                return (
                    (ea = Gn(
                        qn().mark(function e(t, n, r, a, o, i, l, s) {
                            var u, c, d, f, h, p, m, v, g, y, b, x, w, k, C, j, S, E;
                            return qn().wrap(
                                function (e) {
                                    for (; ;)
                                        switch ((e.prev = e.next)) {
                                            case 0:
                                                if (
                                                    (void 0 === s && (s = {}),
                                                        (f = function (e) {
                                                            var t,
                                                                a = new Promise(function (e, n) {
                                                                    return (t = n);
                                                                });
                                                            return (
                                                                (d = function () {
                                                                    return t();
                                                                }),
                                                                n.signal.addEventListener("abort", d),
                                                                Promise.race([e({ request: n, params: r.params, context: s.requestContext }), a])
                                                            );
                                                        }),
                                                        (e.prev = 2),
                                                        (h = r.route[t]),
                                                        !r.route.lazy)
                                                ) {
                                                    e.next = 30;
                                                    break;
                                                }
                                                if (!h) {
                                                    e.next = 12;
                                                    break;
                                                }
                                                return (e.next = 8), Promise.all([f(h), Zr(r.route, i, o)]);
                                            case 8:
                                                (p = e.sent), (c = p[0]), (e.next = 28);
                                                break;
                                            case 12:
                                                return (e.next = 14), Zr(r.route, i, o);
                                            case 14:
                                                if (!(h = r.route[t])) {
                                                    e.next = 21;
                                                    break;
                                                }
                                                return (e.next = 18), f(h);
                                            case 18:
                                                (c = e.sent), (e.next = 28);
                                                break;
                                            case 21:
                                                if ("action" !== t) {
                                                    e.next = 27;
                                                    break;
                                                }
                                                throw ((m = new URL(n.url)), (v = m.pathname + m.search), ua(405, { method: n.method, pathname: v, routeId: r.route.id }));
                                            case 27:
                                                return e.abrupt("return", { type: Zn.data, data: void 0 });
                                            case 28:
                                                e.next = 39;
                                                break;
                                            case 30:
                                                if (h) {
                                                    e.next = 36;
                                                    break;
                                                }
                                                throw ((g = new URL(n.url)), ua(404, { pathname: g.pathname + g.search }));
                                            case 36:
                                                return (e.next = 38), f(h);
                                            case 38:
                                                c = e.sent;
                                            case 39:
                                                Jn(
                                                    void 0 !== c,
                                                    "You defined " +
                                                    ("action" === t ? "an action" : "a loader") +
                                                    ' for route "' +
                                                    r.route.id +
                                                    "\" but didn't return anything from your `" +
                                                    t +
                                                    "` function. Please return a value or `null`."
                                                ),
                                                    (e.next = 46);
                                                break;
                                            case 42:
                                                (e.prev = 42), (e.t0 = e.catch(2)), (u = Zn.error), (c = e.t0);
                                            case 46:
                                                return (e.prev = 46), d && n.signal.removeEventListener("abort", d), e.finish(46);
                                            case 49:
                                                if (!ga(c)) {
                                                    e.next = 74;
                                                    break;
                                                }
                                                if (((y = c.status), !Mr.has(y))) {
                                                    e.next = 59;
                                                    break;
                                                }
                                                if (
                                                    (Jn((b = c.headers.get("Location")), "Redirects returned/thrown from loaders/actions must have a Location header"),
                                                        Wr.test(b)
                                                            ? s.isStaticRequest ||
                                                            ((x = new URL(n.url)),
                                                                (w = b.startsWith("//") ? new URL(x.protocol + b) : new URL(b)),
                                                                (k = null != kr(w.pathname, l)),
                                                                w.origin === x.origin && k && (b = w.pathname + w.search + w.hash))
                                                            : (b = qr(new URL(n.url), a.slice(0, a.indexOf(r) + 1), l, !0, b)),
                                                        !s.isStaticRequest)
                                                ) {
                                                    e.next = 58;
                                                    break;
                                                }
                                                throw (c.headers.set("Location", b), c);
                                            case 58:
                                                return e.abrupt("return", { type: Zn.redirect, status: y, location: b, revalidate: null !== c.headers.get("X-Remix-Revalidate") });
                                            case 59:
                                                if (!s.isRouteRequest) {
                                                    e.next = 61;
                                                    break;
                                                }
                                                throw { type: u || Zn.data, response: c };
                                            case 61:
                                                if (!(j = c.headers.get("Content-Type")) || !/\bapplication\/json\b/.test(j)) {
                                                    e.next = 68;
                                                    break;
                                                }
                                                return (e.next = 65), c.json();
                                            case 65:
                                                (C = e.sent), (e.next = 71);
                                                break;
                                            case 68:
                                                return (e.next = 70), c.text();
                                            case 70:
                                                C = e.sent;
                                            case 71:
                                                if (u !== Zn.error) {
                                                    e.next = 73;
                                                    break;
                                                }
                                                return e.abrupt("return", { type: u, error: new Rr(y, c.statusText, C), headers: c.headers });
                                            case 73:
                                                return e.abrupt("return", { type: Zn.data, data: C, statusCode: c.status, headers: c.headers });
                                            case 74:
                                                if (u !== Zn.error) {
                                                    e.next = 76;
                                                    break;
                                                }
                                                return e.abrupt("return", { type: u, error: c });
                                            case 76:
                                                if (!va(c)) {
                                                    e.next = 78;
                                                    break;
                                                }
                                                return e.abrupt("return", {
                                                    type: Zn.deferred,
                                                    deferredData: c,
                                                    statusCode: null == (S = c.init) ? void 0 : S.status,
                                                    headers: (null == (E = c.init) ? void 0 : E.headers) && new Headers(c.init.headers),
                                                });
                                            case 78:
                                                return e.abrupt("return", { type: Zn.data, data: c });
                                            case 79:
                                            case "end":
                                                return e.stop();
                                        }
                                },
                                e,
                                null,
                                [[2, 42, 46, 49]]
                            );
                        })
                    )),
                    ea.apply(this, arguments)
                );
            }
            function ta(e, t, n, r) {
                var a = e.createURL(da(t)).toString(),
                    o = { signal: n };
                if (r && ba(r.formMethod)) {
                    var i = r.formMethod,
                        l = r.formEncType;
                    (o.method = i.toUpperCase()),
                        "application/json" === l
                            ? ((o.headers = new Headers({ "Content-Type": l })), (o.body = JSON.stringify(r.json)))
                            : "text/plain" === l
                                ? (o.body = r.text)
                                : "application/x-www-form-urlencoded" === l && r.formData
                                    ? (o.body = na(r.formData))
                                    : (o.body = r.formData);
                }
                return new Request(a, o);
            }
            function na(e) {
                var t,
                    n = new URLSearchParams(),
                    r = w(e.entries());
                try {
                    for (r.s(); !(t = r.n()).done;) {
                        var a = j(t.value, 2),
                            o = a[0],
                            i = a[1];
                        n.append(o, "string" === typeof i ? i : i.name);
                    }
                } catch (l) {
                    r.e(l);
                } finally {
                    r.f();
                }
                return n;
            }
            function ra(e) {
                var t,
                    n = new FormData(),
                    r = w(e.entries());
                try {
                    for (r.s(); !(t = r.n()).done;) {
                        var a = j(t.value, 2),
                            o = a[0],
                            i = a[1];
                        n.append(o, i);
                    }
                } catch (l) {
                    r.e(l);
                } finally {
                    r.f();
                }
                return n;
            }
            function aa(e, t, n, r, a) {
                var o,
                    i = {},
                    l = null,
                    s = !1,
                    u = {};
                return (
                    n.forEach(function (n, c) {
                        var d = t[c].route.id;
                        if ((Jn(!ma(n), "Cannot handle redirect results in processLoaderData"), pa(n))) {
                            var f = la(e, d),
                                h = n.error;
                            r && ((h = Object.values(r)[0]), (r = void 0)),
                                null == (l = l || {})[f.route.id] && (l[f.route.id] = h),
                                (i[d] = void 0),
                                s || ((s = !0), (o = Ar(n.error) ? n.error.status : 500)),
                                n.headers && (u[d] = n.headers);
                        } else ha(n) ? (a.set(d, n.deferredData), (i[d] = n.deferredData.data)) : (i[d] = n.data), null == n.statusCode || 200 === n.statusCode || s || (o = n.statusCode), n.headers && (u[d] = n.headers);
                    }),
                    r && ((l = r), (i[Object.keys(r)[0]] = void 0)),
                    { loaderData: i, errors: l, statusCode: o || 200, loaderHeaders: u }
                );
            }
            function oa(e, t, n, r, a, o, l, s) {
                for (var u = aa(t, n, r, a, s), c = u.loaderData, d = u.errors, f = 0; f < o.length; f++) {
                    var h = o[f],
                        p = h.key,
                        m = h.match,
                        v = h.controller;
                    Jn(void 0 !== l && void 0 !== l[f], "Did not find corresponding fetcher result");
                    var g = l[f];
                    if (!v || !v.signal.aborted)
                        if (pa(g)) {
                            var y = la(e.matches, null == m ? void 0 : m.route.id);
                            (d && d[y.route.id]) || (d = Kn({}, d, i({}, y.route.id, g.error))), e.fetchers.delete(p);
                        } else if (ma(g)) Jn(!1, "Unhandled fetcher revalidation redirect");
                        else if (ha(g)) Jn(!1, "Unhandled fetcher deferred data");
                        else {
                            var b = Ra(g.data);
                            e.fetchers.set(p, b);
                        }
                }
                return { loaderData: c, errors: d };
            }
            function ia(e, t, n, r) {
                var a,
                    o = Kn({}, t),
                    i = w(n);
                try {
                    for (i.s(); !(a = i.n()).done;) {
                        var l = a.value,
                            s = l.route.id;
                        if ((t.hasOwnProperty(s) ? void 0 !== t[s] && (o[s] = t[s]) : void 0 !== e[s] && l.route.loader && (o[s] = e[s]), r && r.hasOwnProperty(s))) break;
                    }
                } catch (u) {
                    i.e(u);
                } finally {
                    i.f();
                }
                return o;
            }
            function la(e, t) {
                return (
                    (t
                        ? e.slice(
                            0,
                            e.findIndex(function (e) {
                                return e.route.id === t;
                            }) + 1
                        )
                        : E(e)
                    )
                        .reverse()
                        .find(function (e) {
                            return !0 === e.route.hasErrorBoundary;
                        }) || e[0]
                );
            }
            function sa(e) {
                var t = e.find(function (e) {
                    return e.index || !e.path || "/" === e.path;
                }) || { id: "__shim-error-route__" };
                return { matches: [{ params: {}, pathname: "", pathnameBase: "", route: t }], route: t };
            }
            function ua(e, t) {
                var n = void 0 === t ? {} : t,
                    r = n.pathname,
                    a = n.routeId,
                    o = n.method,
                    i = n.type,
                    l = "Unknown Server Error",
                    s = "Unknown @remix-run/router error";
                return (
                    400 === e
                        ? ((l = "Bad Request"),
                            o && r && a
                                ? (s = "You made a " + o + ' request to "' + r + '" but did not provide a `loader` for route "' + a + '", so there is no way to handle the request.')
                                : "defer-action" === i
                                    ? (s = "defer() is not supported in actions")
                                    : "invalid-body" === i && (s = "Unable to encode submission body"))
                        : 403 === e
                            ? ((l = "Forbidden"), (s = 'Route "' + a + '" does not match URL "' + r + '"'))
                            : 404 === e
                                ? ((l = "Not Found"), (s = 'No route matches URL "' + r + '"'))
                                : 405 === e &&
                                ((l = "Method Not Allowed"),
                                    o && r && a
                                        ? (s = "You made a " + o.toUpperCase() + ' request to "' + r + '" but did not provide an `action` for route "' + a + '", so there is no way to handle the request.')
                                        : o && (s = 'Invalid request method "' + o.toUpperCase() + '"')),
                    new Rr(e || 500, l, new Error(s), !0)
                );
            }
            function ca(e) {
                for (var t = e.length - 1; t >= 0; t--) {
                    var n = e[t];
                    if (ma(n)) return { result: n, idx: t };
                }
            }
            function da(e) {
                return rr(Kn({}, "string" === typeof e ? ar(e) : e, { hash: "" }));
            }
            function fa(e, t) {
                return e.pathname === t.pathname && e.search === t.search && ("" === e.hash ? "" !== t.hash : e.hash === t.hash || "" !== t.hash);
            }
            function ha(e) {
                return e.type === Zn.deferred;
            }
            function pa(e) {
                return e.type === Zn.error;
            }
            function ma(e) {
                return (e && e.type) === Zn.redirect;
            }
            function va(e) {
                var t = e;
                return t && "object" === typeof t && "object" === typeof t.data && "function" === typeof t.subscribe && "function" === typeof t.cancel && "function" === typeof t.resolveData;
            }
            function ga(e) {
                return null != e && "number" === typeof e.status && "string" === typeof e.statusText && "object" === typeof e.headers && "undefined" !== typeof e.body;
            }
            function ya(e) {
                return Dr.has(e.toLowerCase());
            }
            function ba(e) {
                return Ir.has(e.toLowerCase());
            }
            function xa(e, t, n, r, a, o) {
                return wa.apply(this, arguments);
            }
            function wa() {
                return (wa = Gn(
                    qn().mark(function e(t, n, r, a, o, i) {
                        var l, s;
                        return qn().wrap(function (e) {
                            for (; ;)
                                switch ((e.prev = e.next)) {
                                    case 0:
                                        (l = qn().mark(function e(l) {
                                            var s, u, c, d, f;
                                            return qn().wrap(function (e) {
                                                for (; ;)
                                                    switch ((e.prev = e.next)) {
                                                        case 0:
                                                            if (((s = r[l]), (u = n[l]))) {
                                                                e.next = 4;
                                                                break;
                                                            }
                                                            return e.abrupt("return", "continue");
                                                        case 4:
                                                            if (
                                                                ((c = t.find(function (e) {
                                                                    return e.route.id === u.route.id;
                                                                })),
                                                                    (d = null != c && !Yr(c, u) && void 0 !== (i && i[u.route.id])),
                                                                    !ha(s) || (!o && !d))
                                                            ) {
                                                                e.next = 11;
                                                                break;
                                                            }
                                                            return (
                                                                Jn((f = a[l]), "Expected an AbortSignal for revalidating fetcher deferred result"),
                                                                (e.next = 11),
                                                                ka(s, f, o).then(function (e) {
                                                                    e && (r[l] = e || r[l]);
                                                                })
                                                            );
                                                        case 11:
                                                        case "end":
                                                            return e.stop();
                                                    }
                                            }, e);
                                        })),
                                            (s = 0);
                                    case 2:
                                        if (!(s < r.length)) {
                                            e.next = 10;
                                            break;
                                        }
                                        return e.delegateYield(l(s), "t0", 4);
                                    case 4:
                                        if ("continue" !== e.t0) {
                                            e.next = 7;
                                            break;
                                        }
                                        return e.abrupt("continue", 7);
                                    case 7:
                                        s++, (e.next = 2);
                                        break;
                                    case 10:
                                    case "end":
                                        return e.stop();
                                }
                        }, e);
                    })
                )).apply(this, arguments);
            }
            function ka(e, t, n) {
                return Ca.apply(this, arguments);
            }
            function Ca() {
                return (Ca = Gn(
                    qn().mark(function e(t, n, r) {
                        return qn().wrap(
                            function (e) {
                                for (; ;)
                                    switch ((e.prev = e.next)) {
                                        case 0:
                                            return void 0 === r && (r = !1), (e.next = 3), t.deferredData.resolveData(n);
                                        case 3:
                                            if (!e.sent) {
                                                e.next = 6;
                                                break;
                                            }
                                            return e.abrupt("return");
                                        case 6:
                                            if (!r) {
                                                e.next = 14;
                                                break;
                                            }
                                            return (e.prev = 7), e.abrupt("return", { type: Zn.data, data: t.deferredData.unwrappedData });
                                        case 11:
                                            return (e.prev = 11), (e.t0 = e.catch(7)), e.abrupt("return", { type: Zn.error, error: e.t0 });
                                        case 14:
                                            return e.abrupt("return", { type: Zn.data, data: t.deferredData.data });
                                        case 15:
                                        case "end":
                                            return e.stop();
                                    }
                            },
                            e,
                            null,
                            [[7, 11]]
                        );
                    })
                )).apply(this, arguments);
            }
            function ja(e) {
                return new URLSearchParams(e).getAll("index").some(function (e) {
                    return "" === e;
                });
            }
            function Sa(e, t) {
                var n = "string" === typeof t ? ar(t).search : t.search;
                if (e[e.length - 1].route.index && ja(n || "")) return e[e.length - 1];
                var r = jr(e);
                return r[r.length - 1];
            }
            function Ea(e) {
                var t = e.formMethod,
                    n = e.formAction,
                    r = e.formEncType,
                    a = e.text,
                    o = e.formData,
                    i = e.json;
                if (t && n && r)
                    return null != a
                        ? { formMethod: t, formAction: n, formEncType: r, formData: void 0, json: void 0, text: a }
                        : null != o
                            ? { formMethod: t, formAction: n, formEncType: r, formData: o, json: void 0, text: void 0 }
                            : void 0 !== i
                                ? { formMethod: t, formAction: n, formEncType: r, formData: void 0, json: i, text: void 0 }
                                : void 0;
            }
            function Na(e, t) {
                return t
                    ? { state: "loading", location: e, formMethod: t.formMethod, formAction: t.formAction, formEncType: t.formEncType, formData: t.formData, json: t.json, text: t.text }
                    : { state: "loading", location: e, formMethod: void 0, formAction: void 0, formEncType: void 0, formData: void 0, json: void 0, text: void 0 };
            }
            function Pa(e, t) {
                return { state: "submitting", location: e, formMethod: t.formMethod, formAction: t.formAction, formEncType: t.formEncType, formData: t.formData, json: t.json, text: t.text };
            }
            function Ta(e, t) {
                return e
                    ? { state: "loading", formMethod: e.formMethod, formAction: e.formAction, formEncType: e.formEncType, formData: e.formData, json: e.json, text: e.text, data: t, " _hasFetcherDoneAnything ": !0 }
                    : { state: "loading", formMethod: void 0, formAction: void 0, formEncType: void 0, formData: void 0, json: void 0, text: void 0, data: t, " _hasFetcherDoneAnything ": !0 };
            }
            function Oa(e, t) {
                return { state: "submitting", formMethod: e.formMethod, formAction: e.formAction, formEncType: e.formEncType, formData: e.formData, json: e.json, text: e.text, data: t ? t.data : void 0, " _hasFetcherDoneAnything ": !0 };
            }
            function Ra(e) {
                return { state: "idle", formMethod: void 0, formAction: void 0, formEncType: void 0, formData: void 0, json: void 0, text: void 0, data: e, " _hasFetcherDoneAnything ": !0 };
            }
            function Aa() {
                return (
                    (Aa = Object.assign
                        ? Object.assign.bind()
                        : function (e) {
                            for (var t = 1; t < arguments.length; t++) {
                                var n = arguments[t];
                                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
                            }
                            return e;
                        }),
                    Aa.apply(this, arguments)
                );
            }
            var La = e.createContext(null);
            var Ia = e.createContext(null);
            var _a = e.createContext(null);
            var Da = e.createContext(null);
            var Ma = e.createContext(null);
            var Fa = e.createContext({ outlet: null, matches: [], isDataRoute: !1 });
            var za = e.createContext(null);
            function Ua() {
                return null != e.useContext(Ma);
            }
            function Ba() {
                return Ua() || Jn(!1), e.useContext(Ma).location;
            }
            function Wa(t) {
                e.useContext(Da).static || e.useLayoutEffect(t);
            }
            function Va() {
                return e.useContext(Fa).isDataRoute
                    ? (function () {
                        var t = Ja(Ga.UseNavigateStable).router,
                            n = to(Qa.UseNavigateStable),
                            r = e.useRef(!1);
                        return (
                            Wa(function () {
                                r.current = !0;
                            }),
                            e.useCallback(
                                function (e, a) {
                                    void 0 === a && (a = {}), r.current && ("number" === typeof e ? t.navigate(e) : t.navigate(e, Aa({ fromRouteId: n }, a)));
                                },
                                [t, n]
                            )
                        );
                    })()
                    : (function () {
                        Ua() || Jn(!1);
                        var t = e.useContext(La),
                            n = e.useContext(Da),
                            r = n.basename,
                            a = n.navigator,
                            o = e.useContext(Fa).matches,
                            i = Ba().pathname,
                            l = JSON.stringify(
                                jr(o).map(function (e) {
                                    return e.pathnameBase;
                                })
                            ),
                            s = e.useRef(!1);
                        return (
                            Wa(function () {
                                s.current = !0;
                            }),
                            e.useCallback(
                                function (e, n) {
                                    if ((void 0 === n && (n = {}), s.current))
                                        if ("number" !== typeof e) {
                                            var o = Sr(e, JSON.parse(l), i, "path" === n.relative);
                                            null == t && "/" !== r && (o.pathname = "/" === o.pathname ? r : Er([r, o.pathname])), (n.replace ? a.replace : a.push)(o, n.state, n);
                                        } else a.go(e);
                                },
                                [r, a, l, i, t]
                            )
                        );
                    })();
            }
            function Ha(t, n) {
                var r = (void 0 === n ? {} : n).relative,
                    a = e.useContext(Fa).matches,
                    o = Ba().pathname,
                    i = JSON.stringify(
                        jr(a).map(function (e) {
                            return e.pathnameBase;
                        })
                    );
                return e.useMemo(
                    function () {
                        return Sr(t, JSON.parse(i), o, "path" === r);
                    },
                    [t, i, o, r]
                );
            }
            function qa(t, n, r) {
                Ua() || Jn(!1);
                var a,
                    o = e.useContext(Da).navigator,
                    i = e.useContext(Fa).matches,
                    l = i[i.length - 1],
                    s = l ? l.params : {},
                    u = (l && l.pathname, l ? l.pathnameBase : "/"),
                    c = (l && l.route, Ba());
                if (n) {
                    var d,
                        f = "string" === typeof n ? ar(n) : n;
                    "/" === u || (null == (d = f.pathname) ? void 0 : d.startsWith(u)) || Jn(!1), (a = f);
                } else a = c;
                var h = a.pathname || "/",
                    p = sr(t, { pathname: "/" === u ? h : h.slice(u.length) || "/" });
                var m = Xa(
                    p &&
                    p.map(function (e) {
                        return Object.assign({}, e, {
                            params: Object.assign({}, s, e.params),
                            pathname: Er([u, o.encodeLocation ? o.encodeLocation(e.pathname).pathname : e.pathname]),
                            pathnameBase: "/" === e.pathnameBase ? u : Er([u, o.encodeLocation ? o.encodeLocation(e.pathnameBase).pathname : e.pathnameBase]),
                        });
                    }),
                    i,
                    r
                );
                return n && m ? e.createElement(Ma.Provider, { value: { location: Aa({ pathname: "/", search: "", hash: "", state: null, key: "default" }, a), navigationType: In.Pop } }, m) : m;
            }
            function $a() {
                var t = (function () {
                    var t,
                        n = e.useContext(za),
                        r = eo(Qa.UseRouteError),
                        a = to(Qa.UseRouteError);
                    if (n) return n;
                    return null == (t = r.errors) ? void 0 : t[a];
                })(),
                    n = Ar(t) ? t.status + " " + t.statusText : t instanceof Error ? t.message : JSON.stringify(t),
                    r = t instanceof Error ? t.stack : null,
                    a = "rgba(200,200,200, 0.5)",
                    o = { padding: "0.5rem", backgroundColor: a };
                return e.createElement(e.Fragment, null, e.createElement("h2", null, "Unexpected Application Error!"), e.createElement("h3", { style: { fontStyle: "italic" } }, n), r ? e.createElement("pre", { style: o }, r) : null, null);
            }
            var Ga,
                Qa,
                Ya = e.createElement($a, null),
                Ka = (function (t) {
                    Un(r, t);
                    var n = Hn(r);
                    function r(e) {
                        var t;
                        return U(this, r), ((t = n.call(this, e)).state = { location: e.location, revalidation: e.revalidation, error: e.error }), t;
                    }
                    return (
                        W(
                            r,
                            [
                                {
                                    key: "componentDidCatch",
                                    value: function (e, t) {
                                        console.error("React Router caught the following error during render", e, t);
                                    },
                                },
                                {
                                    key: "render",
                                    value: function () {
                                        return this.state.error
                                            ? e.createElement(Fa.Provider, { value: this.props.routeContext }, e.createElement(za.Provider, { value: this.state.error, children: this.props.component }))
                                            : this.props.children;
                                    },
                                },
                            ],
                            [
                                {
                                    key: "getDerivedStateFromError",
                                    value: function (e) {
                                        return { error: e };
                                    },
                                },
                                {
                                    key: "getDerivedStateFromProps",
                                    value: function (e, t) {
                                        return t.location !== e.location || ("idle" !== t.revalidation && "idle" === e.revalidation)
                                            ? { error: e.error, location: e.location, revalidation: e.revalidation }
                                            : { error: e.error || t.error, location: t.location, revalidation: e.revalidation || t.revalidation };
                                    },
                                },
                            ]
                        ),
                        r
                    );
                })(e.Component);
            function Za(t) {
                var n = t.routeContext,
                    r = t.match,
                    a = t.children,
                    o = e.useContext(La);
                return o && o.static && o.staticContext && (r.route.errorElement || r.route.ErrorBoundary) && (o.staticContext._deepestRenderedBoundaryId = r.route.id), e.createElement(Fa.Provider, { value: n }, a);
            }
            function Xa(t, n, r) {
                var a;
                if ((void 0 === n && (n = []), void 0 === r && (r = null), null == t)) {
                    var o;
                    if (null == (o = r) || !o.errors) return null;
                    t = r.matches;
                }
                var i = t,
                    l = null == (a = r) ? void 0 : a.errors;
                if (null != l) {
                    var s = i.findIndex(function (e) {
                        return e.route.id && (null == l ? void 0 : l[e.route.id]);
                    });
                    s >= 0 || Jn(!1), (i = i.slice(0, Math.min(i.length, s + 1)));
                }
                return i.reduceRight(function (t, a, o) {
                    var s = a.route.id ? (null == l ? void 0 : l[a.route.id]) : null,
                        u = null;
                    r && (u = a.route.errorElement || Ya);
                    var c = n.concat(i.slice(0, o + 1)),
                        d = function () {
                            var n;
                            return (
                                (n = s ? u : a.route.Component ? e.createElement(a.route.Component, null) : a.route.element ? a.route.element : t),
                                e.createElement(Za, { match: a, routeContext: { outlet: t, matches: c, isDataRoute: null != r }, children: n })
                            );
                        };
                    return r && (a.route.ErrorBoundary || a.route.errorElement || 0 === o)
                        ? e.createElement(Ka, { location: r.location, revalidation: r.revalidation, component: u, error: s, children: d(), routeContext: { outlet: null, matches: c, isDataRoute: !0 } })
                        : d();
                }, null);
            }
            function Ja(t) {
                var n = e.useContext(La);
                return n || Jn(!1), n;
            }
            function eo(t) {
                var n = e.useContext(Ia);
                return n || Jn(!1), n;
            }
            function to(t) {
                var n = (function (t) {
                    var n = e.useContext(Fa);
                    return n || Jn(!1), n;
                })(),
                    r = n.matches[n.matches.length - 1];
                return r.route.id || Jn(!1), r.route.id;
            }
            !(function (e) {
                (e.UseBlocker = "useBlocker"), (e.UseRevalidator = "useRevalidator"), (e.UseNavigateStable = "useNavigate");
            })(Ga || (Ga = {})),
                (function (e) {
                    (e.UseBlocker = "useBlocker"),
                        (e.UseLoaderData = "useLoaderData"),
                        (e.UseActionData = "useActionData"),
                        (e.UseRouteError = "useRouteError"),
                        (e.UseNavigation = "useNavigation"),
                        (e.UseRouteLoaderData = "useRouteLoaderData"),
                        (e.UseMatches = "useMatches"),
                        (e.UseRevalidator = "useRevalidator"),
                        (e.UseNavigateStable = "useNavigate"),
                        (e.UseRouteId = "useRouteId");
                })(Qa || (Qa = {}));
            var no,
                ro = t.startTransition;
            function ao(t) {
                var n = t.fallbackElement,
                    r = t.router,
                    a = t.future,
                    o = j(e.useState(r.state), 2),
                    i = o[0],
                    l = o[1],
                    s = (a || {}).v7_startTransition,
                    u = e.useCallback(
                        function (e) {
                            s && ro
                                ? ro(function () {
                                    return l(e);
                                })
                                : l(e);
                        },
                        [l, s]
                    );
                e.useLayoutEffect(
                    function () {
                        return r.subscribe(u);
                    },
                    [r, u]
                );
                var c = e.useMemo(
                    function () {
                        return {
                            createHref: r.createHref,
                            encodeLocation: r.encodeLocation,
                            go: function (e) {
                                return r.navigate(e);
                            },
                            push: function (e, t, n) {
                                return r.navigate(e, { state: t, preventScrollReset: null == n ? void 0 : n.preventScrollReset });
                            },
                            replace: function (e, t, n) {
                                return r.navigate(e, { replace: !0, state: t, preventScrollReset: null == n ? void 0 : n.preventScrollReset });
                            },
                        };
                    },
                    [r]
                ),
                    d = r.basename || "/",
                    f = e.useMemo(
                        function () {
                            return { router: r, navigator: c, static: !1, basename: d };
                        },
                        [r, c, d]
                    );
                return e.createElement(
                    e.Fragment,
                    null,
                    e.createElement(
                        La.Provider,
                        { value: f },
                        e.createElement(
                            Ia.Provider,
                            { value: i },
                            e.createElement(io, { basename: d, location: i.location, navigationType: i.historyAction, navigator: c }, i.initialized ? e.createElement(oo, { routes: r.routes, state: i }) : n)
                        )
                    ),
                    null
                );
            }
            function oo(e) {
                return qa(e.routes, void 0, e.state);
            }
            function io(t) {
                var n = t.basename,
                    r = void 0 === n ? "/" : n,
                    a = t.children,
                    o = void 0 === a ? null : a,
                    i = t.location,
                    l = t.navigationType,
                    s = void 0 === l ? In.Pop : l,
                    u = t.navigator,
                    c = t.static,
                    d = void 0 !== c && c;
                Ua() && Jn(!1);
                var f = r.replace(/^\/*/, "/"),
                    h = e.useMemo(
                        function () {
                            return { basename: f, navigator: u, static: d };
                        },
                        [f, u, d]
                    );
                "string" === typeof i && (i = ar(i));
                var p = i,
                    m = p.pathname,
                    v = void 0 === m ? "/" : m,
                    g = p.search,
                    y = void 0 === g ? "" : g,
                    b = p.hash,
                    x = void 0 === b ? "" : b,
                    w = p.state,
                    k = void 0 === w ? null : w,
                    C = p.key,
                    j = void 0 === C ? "default" : C,
                    S = e.useMemo(
                        function () {
                            var e = kr(v, f);
                            return null == e ? null : { location: { pathname: e, search: y, hash: x, state: k, key: j }, navigationType: s };
                        },
                        [f, v, y, x, k, j, s]
                    );
                return null == S ? null : e.createElement(Da.Provider, { value: h }, e.createElement(Ma.Provider, { children: o, value: S }));
            }
            !(function (e) {
                (e[(e.pending = 0)] = "pending"), (e[(e.success = 1)] = "success"), (e[(e.error = 2)] = "error");
            })(no || (no = {}));
            var lo = new Promise(function () { });
            e.Component;
            function so(t) {
                var n = { hasErrorBoundary: null != t.ErrorBoundary || null != t.errorElement };
                return t.Component && Object.assign(n, { element: e.createElement(t.Component), Component: void 0 }), t.ErrorBoundary && Object.assign(n, { errorElement: e.createElement(t.ErrorBoundary), ErrorBoundary: void 0 }), n;
            }
            function uo() {
                return (
                    (uo = Object.assign
                        ? Object.assign.bind()
                        : function (e) {
                            for (var t = 1; t < arguments.length; t++) {
                                var n = arguments[t];
                                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
                            }
                            return e;
                        }),
                    uo.apply(this, arguments)
                );
            }
            function co(e, t) {
                if (null == e) return {};
                var n,
                    r,
                    a = {},
                    o = Object.keys(e);
                for (r = 0; r < o.length; r++) (n = o[r]), t.indexOf(n) >= 0 || (a[n] = e[n]);
                return a;
            }
            new Set(["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"]);
            var fo = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset"];
            function ho() {
                var e,
                    t = null == (e = window) ? void 0 : e.__staticRouterHydrationData;
                return t && t.errors && (t = uo({}, t, { errors: po(t.errors) })), t;
            }
            function po(e) {
                if (!e) return null;
                for (var t = {}, n = 0, r = Object.entries(e); n < r.length; n++) {
                    var a = j(r[n], 2),
                        o = a[0],
                        i = a[1];
                    if (i && "RouteErrorResponse" === i.__type) t[o] = new Rr(i.status, i.statusText, i.data, !0 === i.internal);
                    else if (i && "Error" === i.__type) {
                        if (i.__subType) {
                            var l = window[i.__subType];
                            if ("function" === typeof l)
                                try {
                                    var s = new l(i.message);
                                    (s.stack = ""), (t[o] = s);
                                } catch (ft) { }
                        }
                        if (null == t[o]) {
                            var u = new Error(i.message);
                            (u.stack = ""), (t[o] = u);
                        }
                    } else t[o] = i;
                }
                return t;
            }
            t.startTransition;
            var mo = "undefined" !== typeof window && "undefined" !== typeof window.document && "undefined" !== typeof window.document.createElement,
                vo = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
                go = e.forwardRef(function (t, n) {
                    var r,
                        a = t.onClick,
                        o = t.relative,
                        i = t.reloadDocument,
                        l = t.replace,
                        s = t.state,
                        u = t.target,
                        c = t.to,
                        d = t.preventScrollReset,
                        f = co(t, fo),
                        h = e.useContext(Da).basename,
                        p = !1;
                    if ("string" === typeof c && vo.test(c) && ((r = c), mo))
                        try {
                            var m = new URL(window.location.href),
                                v = c.startsWith("//") ? new URL(m.protocol + c) : new URL(c),
                                g = kr(v.pathname, h);
                            v.origin === m.origin && null != g ? (c = g + v.search + v.hash) : (p = !0);
                        } catch (ft) { }
                    var y = (function (t, n) {
                        var r = (void 0 === n ? {} : n).relative;
                        Ua() || Jn(!1);
                        var a = e.useContext(Da),
                            o = a.basename,
                            i = a.navigator,
                            l = Ha(t, { relative: r }),
                            s = l.hash,
                            u = l.pathname,
                            c = l.search,
                            d = u;
                        return "/" !== o && (d = "/" === u ? o : Er([o, u])), i.createHref({ pathname: d, search: c, hash: s });
                    })(c, { relative: o }),
                        b = (function (t, n) {
                            var r = void 0 === n ? {} : n,
                                a = r.target,
                                o = r.replace,
                                i = r.state,
                                l = r.preventScrollReset,
                                s = r.relative,
                                u = Va(),
                                c = Ba(),
                                d = Ha(t, { relative: s });
                            return e.useCallback(
                                function (e) {
                                    if (
                                        (function (e, t) {
                                            return (
                                                0 === e.button &&
                                                (!t || "_self" === t) &&
                                                !(function (e) {
                                                    return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
                                                })(e)
                                            );
                                        })(e, a)
                                    ) {
                                        e.preventDefault();
                                        var n = void 0 !== o ? o : rr(c) === rr(d);
                                        u(t, { replace: n, state: i, preventScrollReset: l, relative: s });
                                    }
                                },
                                [c, u, d, o, i, a, t, l, s]
                            );
                        })(c, { replace: l, state: s, target: u, preventScrollReset: d, relative: o });
                    return e.createElement(
                        "a",
                        uo({}, f, {
                            href: r || y,
                            onClick:
                                p || i
                                    ? a
                                    : function (e) {
                                        a && a(e), e.defaultPrevented || b(e);
                                    },
                            ref: n,
                            target: u,
                        })
                    );
                });
            var yo, bo;
            (function (e) {
                (e.UseScrollRestoration = "useScrollRestoration"), (e.UseSubmit = "useSubmit"), (e.UseSubmitFetcher = "useSubmitFetcher"), (e.UseFetcher = "useFetcher");
            })(yo || (yo = {})),
                (function (e) {
                    (e.UseFetchers = "useFetchers"), (e.UseScrollRestoration = "useScrollRestoration");
                })(bo || (bo = {}));
            function xo() {
                return (0, f.jsx)("div", {
                    className: "relative isolate overflow-hidden bg-[#05080b]",
                    children: (0, f.jsx)("div", {
                        className: "px-6 py-[100px] sm:px-6 lg:px-8",
                        children: (0, f.jsxs)("div", {
                            className: "mx-auto max-w-2xl text-center",
                            children: [
                                (0, f.jsx)("h2", { className: "text-3xl font-bold tracking-tight text-white sm:text-4xl", children: "Get started with trading today" }),
                                (0, f.jsx)("p", { className: "mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300", children: "It\u2019s easy to get started. Register an account with us and get started with trading today." }),
                                (0, f.jsx)("div", { className: "mt-10 flex items-center justify-center gap-x-6", children: (0, f.jsx)(v, { href: "".concat(vn.appLink, "/register"), children: "Get started" }) }),
                            ],
                        }),
                    }),
                });
            }
            var wo = ["title", "titleId"];
            e.forwardRef(function (t, n) {
                var r = t.title,
                    a = t.titleId,
                    o = u(t, wo);
                return e.createElement(
                    "svg",
                    Object.assign({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true", ref: n, "aria-labelledby": a }, o),
                    r ? e.createElement("title", { id: a }, r) : null,
                    e.createElement("path", {
                        fillRule: "evenodd",
                        d:
                            "M5.5 17a4.5 4.5 0 01-1.44-8.765 4.5 4.5 0 018.302-3.046 3.5 3.5 0 014.504 4.272A4 4 0 0115 17H5.5zm3.75-2.75a.75.75 0 001.5 0V9.66l1.95 2.1a.75.75 0 101.1-1.02l-3.25-3.5a.75.75 0 00-1.1 0l-3.25 3.5a.75.75 0 101.1 1.02l1.95-2.1v4.59z",
                        clipRule: "evenodd",
                    })
                );
            });
            var ko = ["title", "titleId"];
            var Co = e.forwardRef(function (t, n) {
                var r = t.title,
                    a = t.titleId,
                    o = u(t, ko);
                return e.createElement(
                    "svg",
                    Object.assign({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true", ref: n, "aria-labelledby": a }, o),
                    r ? e.createElement("title", { id: a }, r) : null,
                    e.createElement("path", { fillRule: "evenodd", d: "M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z", clipRule: "evenodd" })
                );
            }),
                jo = ["title", "titleId"];
            e.forwardRef(function (t, n) {
                var r = t.title,
                    a = t.titleId,
                    o = u(t, jo);
                return e.createElement(
                    "svg",
                    Object.assign({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true", ref: n, "aria-labelledby": a }, o),
                    r ? e.createElement("title", { id: a }, r) : null,
                    e.createElement("path", {
                        fillRule: "evenodd",
                        d:
                            "M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z",
                        clipRule: "evenodd",
                    })
                );
            });
            var So = n.p + "static/media/markets.570e8cb2e10e06736455.png",
                Eo = n.p + "static/media/markets-mobile.ba2ee5ea1f5677e01491.png",
                No = [
                    {
                        name: "Reporting",
                        summary: "Stay on top of things with always up-to-date reporting features.",
                        description: "We talked about reporting in the section above but we needed three items here, so mentioning it one more time for posterity.",
                        image: So,
                        imageTwo: Eo,
                        icon: function () {
                            var t = (0, e.useId)();
                            return (0, f.jsxs)(f.Fragment, {
                                children: [
                                    (0, f.jsx)("defs", {
                                        children: (0, f.jsxs)("linearGradient", {
                                            id: t,
                                            x1: "11.5",
                                            y1: 18,
                                            x2: 36,
                                            y2: "15.5",
                                            gradientUnits: "userSpaceOnUse",
                                            children: [(0, f.jsx)("stop", { offset: ".194", stopColor: "#fff" }), (0, f.jsx)("stop", { offset: 1, stopColor: "#6692F1" })],
                                        }),
                                    }),
                                    (0, f.jsx)("path", { d: "m30 15-4 5-4-11-4 18-4-11-4 7-4-5", stroke: "url(#".concat(t, ")"), strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }),
                                ],
                            });
                        },
                    },
                    {
                        name: "Inventory",
                        summary: "Never lose track of what\u2019s in stock with accurate inventory tracking.",
                        description: "We don\u2019t offer this as part of our software but that statement is inarguably true. Accurate inventory tracking would help you for sure.",
                        image: So,
                        imageTwo: Eo,
                        icon: function () {
                            return (0, f.jsxs)(f.Fragment, {
                                children: [
                                    (0, f.jsx)("path", { opacity: ".5", d: "M8 17a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2Z", fill: "#fff" }),
                                    (0, f.jsx)("path", { opacity: ".3", d: "M8 24a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2Z", fill: "#fff" }),
                                    (0, f.jsx)("path", { d: "M8 10a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2Z", fill: "#fff" }),
                                ],
                            });
                        },
                    },
                    {
                        name: "Contacts",
                        summary: "Organize all of your contacts, service providers, and invoices in one place.",
                        description: "This also isn\u2019t actually a feature, it\u2019s just some friendly advice. We definitely recommend that you do this, you\u2019ll feel really organized and professional.",
                        image: So,
                        imageTwo: Eo,
                        icon: function () {
                            return (0, f.jsxs)(f.Fragment, {
                                children: [
                                    (0, f.jsx)("path", {
                                        opacity: ".5",
                                        d:
                                            "M25.778 25.778c.39.39 1.027.393 1.384-.028A11.952 11.952 0 0 0 30 18c0-6.627-5.373-12-12-12S6 11.373 6 18c0 2.954 1.067 5.659 2.838 7.75.357.421.993.419 1.384.028.39-.39.386-1.02.036-1.448A9.959 9.959 0 0 1 8 18c0-5.523 4.477-10 10-10s10 4.477 10 10a9.959 9.959 0 0 1-2.258 6.33c-.35.427-.354 1.058.036 1.448Z",
                                        fill: "#fff",
                                    }),
                                    (0, f.jsx)("path", {
                                        d: "M12 28.395V28a6 6 0 0 1 12 0v.395A11.945 11.945 0 0 1 18 30c-2.186 0-4.235-.584-6-1.605ZM21 16.5c0-1.933-.5-3.5-3-3.5s-3 1.567-3 3.5 1.343 3.5 3 3.5 3-1.567 3-3.5Z",
                                        fill: "#fff",
                                    }),
                                ],
                            });
                        },
                    },
                ];
            function Po() {
                return (0, f.jsx)(qe.Group, {
                    as: "div",
                    className: "  lg:block",
                    children: function (e) {
                        e.selectedIndex;
                        return (0, f.jsxs)(f.Fragment, {
                            children: [
                                (0, f.jsx)("div", {
                                    className: " overflow-hidden w-full md:hidden",
                                    children: No.map(function (e, t) {
                                        return (
                                            1 === t &&
                                            (0, f.jsx)("div", { className: "max-w-[73.75rem] max-h-[600px] pt-10 ", style: { margin: "0 auto" }, children: (0, f.jsx)("img", { className: "w-full ml-8  ", src: e.imageTwo, alt: "" }) })
                                        );
                                    }),
                                }),
                                (0, f.jsx)("div", {
                                    className: " overflow-hidden w-full hidden md:block",
                                    children: No.map(function (e, t) {
                                        return 1 === t && (0, f.jsx)("div", { className: "max-w-[73.75rem]  pt-10 ", style: { margin: "0 auto" }, children: (0, f.jsx)("img", { className: "w-full", src: e.image, alt: "" }) });
                                    }),
                                }),
                            ],
                        });
                    },
                });
            }
            function To() {
                return (0, f.jsx)("section", {
                    id: "secondary-features",
                    "aria-label": "Features for simplifying everyday business tasks",
                    className: "pb-14 pt-20 sm:pb-20 sm:pt-32 lg:pb-32",
                    children: (0, f.jsxs)(y, {
                        children: [
                            (0, f.jsxs)("div", {
                                className: "mx-auto max-w-4xl md:text-center",
                                children: [
                                    (0, f.jsx)("h2", { className: "font-sans font-semibold text-3xl tracking-tight text-slate-900 sm:text-4xl", children: "All your financial assets in one place" }),
                                    (0, f.jsx)("p", { className: "mt-4 text-lg tracking-tight text-slate-700", children: "Get a stock account, foreign exchange broker and cryptocurrency exchange -in one refreshingly easy solution." }),
                                ],
                            }),
                            (0, f.jsx)(Po, {}),
                        ],
                    }),
                });
            }
            var Oo = {
                solutions: [
                    { name: "About us", href: "/about" },
                    { name: "Why ".concat(vn.name), href: "/why-us" },
                ],
                support: [
                    { name: "FAQ", href: "/faq" },
                    { name: "Send us an email", href: "mailto:".concat(vn.email) },
                ],
                company: [
                    { name: "Crypto", href: "/crypto" },
                    { name: "Forex", href: "/forex" },
                    { name: "Stocks", href: "/stocks" },
                ],
                legal: [
                    { name: "Legal", href: "/legal" },
                    { name: "Privacy policy", href: "/privacy" },
                    { name: "Terms of service", href: "/terms" },
                ],
                social: [
                    {
                        name: "Facebook",
                        href: "#",
                        icon: function (e) {
                            return (0, f.jsx)(
                                "svg",
                                s(
                                    s({ fill: "currentColor", viewBox: "0 0 24 24" }, e),
                                    {},
                                    {
                                        children: (0, f.jsx)("path", {
                                            fillRule: "evenodd",
                                            d:
                                                "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z",
                                            clipRule: "evenodd",
                                        }),
                                    }
                                )
                            );
                        },
                    },
                    {
                        name: "Instagram",
                        href: "#",
                        icon: function (e) {
                            return (0, f.jsx)(
                                "svg",
                                s(
                                    s({ fill: "currentColor", viewBox: "0 0 24 24" }, e),
                                    {},
                                    {
                                        children: (0, f.jsx)("path", {
                                            fillRule: "evenodd",
                                            d:
                                                "M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z",
                                            clipRule: "evenodd",
                                        }),
                                    }
                                )
                            );
                        },
                    },
                    {
                        name: "Twitter",
                        href: "#",
                        icon: function (e) {
                            return (0, f.jsx)(
                                "svg",
                                s(
                                    s({ fill: "currentColor", viewBox: "0 0 24 24" }, e),
                                    {},
                                    {
                                        children: (0, f.jsx)("path", {
                                            d:
                                                "M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84",
                                        }),
                                    }
                                )
                            );
                        },
                    },
                    {
                        name: "GitHub",
                        href: "#",
                        icon: function (e) {
                            return (0, f.jsx)(
                                "svg",
                                s(
                                    s({ fill: "currentColor", viewBox: "0 0 24 24" }, e),
                                    {},
                                    {
                                        children: (0, f.jsx)("path", {
                                            fillRule: "evenodd",
                                            d:
                                                "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z",
                                            clipRule: "evenodd",
                                        }),
                                    }
                                )
                            );
                        },
                    },
                    {
                        name: "YouTube",
                        href: "#",
                        icon: function (e) {
                            return (0, f.jsx)(
                                "svg",
                                s(
                                    s({ fill: "currentColor", viewBox: "0 0 24 24" }, e),
                                    {},
                                    {
                                        children: (0, f.jsx)("path", {
                                            fillRule: "evenodd",
                                            d:
                                                "M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z",
                                            clipRule: "evenodd",
                                        }),
                                    }
                                )
                            );
                        },
                    },
                ],
            };
            function Ro() {
                return (0, f.jsxs)("footer", {
                    className: "bg-[#05080b] ",
                    "aria-labelledby": "footer-heading",
                    children: [
                        (0, f.jsx)("h2", { id: "footer-heading", className: "sr-only", children: "Footer" }),
                        (0, f.jsxs)("div", {
                            className: "mx-auto max-w-[1545px] px-6 lg:px-8 pt-[16px] pb-[120px]",
                            children: [
                                (0, f.jsx)("div", {
                                    children: (0, f.jsxs)("div", {
                                        className: " w-[100%] justify-between mt-[72px] grid gap-[32px] md:flex",
                                        style: { whiteSpace: "nowrap" },
                                        children: [
                                            (0, f.jsx)("div", {
                                                children: (0, f.jsxs)("div", {
                                                    children: [
                                                        (0, f.jsx)("h3", { className: "text-md font-medium leading-6 text-[#5D5F66]", children: "About" }),
                                                        (0, f.jsx)("ul", {
                                                            role: "list",
                                                            className: "mt-6 space-y-4",
                                                            children: Oo.solutions.map(function (e) {
                                                                return (0, f.jsx)("li", { children: (0, f.jsx)("a", { href: e.href, className: "text-md leading-6 text-gray-300 hover:text-white", children: e.name }) }, e.name);
                                                            }),
                                                        }),
                                                    ],
                                                }),
                                            }),
                                            (0, f.jsx)("div", {
                                                children: (0, f.jsxs)("div", {
                                                    children: [
                                                        (0, f.jsx)("h3", { className: "text-md font-medium leading-6 text-[#5D5F66]", children: "Earn" }),
                                                        (0, f.jsx)("ul", {
                                                            role: "list",
                                                            className: "mt-6 space-y-4",
                                                            children: Oo.company.map(function (e) {
                                                                return (0, f.jsx)("li", { children: (0, f.jsx)("a", { href: e.href, className: "text-md leading-6 text-gray-300 hover:text-white", children: e.name }) }, e.name);
                                                            }),
                                                        }),
                                                    ],
                                                }),
                                            }),
                                            (0, f.jsx)("div", {
                                                children: (0, f.jsxs)("div", {
                                                    children: [
                                                        (0, f.jsx)("h3", { className: "text-md font-medium leading-6 text-[#5D5F66]", children: "Legal" }),
                                                        (0, f.jsx)("ul", {
                                                            role: "list",
                                                            className: "mt-6 space-y-4",
                                                            children: Oo.legal.map(function (e) {
                                                                return (0, f.jsx)("li", { children: (0, f.jsx)("a", { href: e.href, className: "text-md leading-6 text-gray-300 hover:text-white", children: e.name }) }, e.name);
                                                            }),
                                                        }),
                                                    ],
                                                }),
                                            }),
                                            (0, f.jsx)("div", {
                                                children: (0, f.jsxs)("div", {
                                                    children: [
                                                        (0, f.jsx)("h3", { className: "text-md font-medium leading-6 text-[#5D5F66]", children: "Support" }),
                                                        (0, f.jsx)("ul", {
                                                            role: "list",
                                                            className: "mt-6 space-y-4",
                                                            children: Oo.support.map(function (e) {
                                                                return (0, f.jsx)("li", { children: (0, f.jsx)("a", { href: e.href, className: "text-md leading-6 text-gray-300 hover:text-white", children: e.name }) }, e.name);
                                                            }),
                                                        }),
                                                    ],
                                                }),
                                            }),
                                        ],
                                    }),
                                }),
                                (0, f.jsx)("div", { className: "mt-[120px]", children: (0, f.jsx)("img", { className: "h-6 ", src: "./logo-full.svg", alt: "Company name" }) }),
                                (0, f.jsx)("div", {
                                    className: "border-white/10 lg:flex lg:items-center lg:justify-between mt-[60px] ",
                                    children: (0, f.jsx)("div", {
                                        children: (0, f.jsxs)("p", {
                                            className: "text-[15px] leading-6 text-[#AEAFB2]",
                                            children: [
                                                "The risk of loss in online trading of stocks, options, futures, currencies, foreign equities, and fixed Income can be substantial.",
                                                (0, f.jsx)("br", {}),
                                                (0, f.jsx)("br", {}),
                                                "Before trading, clients must read the relevant risk disclosure statements on our Warnings and Disclosures page. Trading on margin is only for experienced investors with high risk tolerance. You may lose more than your initial investment. For additional information about rates on margin loans, please see Margin Loan Rates. Security futures involve a high degree of risk and are not suitable for all investors. The amount you may lose may be greater than your initial investment.",
                                                (0, f.jsx)("br", {}),
                                                (0, f.jsx)("br", {}),
                                                "For trading security futures, read the Security Futures Risk Disclosure Statement. Structured products and fixed income products such as bonds are complex products that are more risky and are not suitable for all investors. Before trading, please read the Risk Warning and Disclosure Statement.",
                                            ],
                                        }),
                                    }),
                                }),
                                (0, f.jsx)("div", {
                                    className: "border-white/10 md:flex md:items-center md:justify-between mt-[64px]",
                                    children: (0, f.jsxs)("p", { className: "text-md leading-5 text-[#AEAFB2] md:order-1 md:mt-0", children: ["\xa9 2016 - ", new Date().getFullYear(), " ", vn.name, ", Inc. All rights reserved."] }),
                                }),
                            ],
                        }),
                    ],
                });
            }
            var Ao = ["title", "titleId"];
            e.forwardRef(function (t, n) {
                var r = t.title,
                    a = t.titleId,
                    o = u(t, Ao);
                return e.createElement(
                    "svg",
                    Object.assign({ xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", "aria-hidden": "true", ref: n, "aria-labelledby": a }, o),
                    r ? e.createElement("title", { id: a }, r) : null,
                    e.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" }),
                    e.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" })
                );
            });
            var Lo = ["title", "titleId"];
            e.forwardRef(function (t, n) {
                var r = t.title,
                    a = t.titleId,
                    o = u(t, Lo);
                return e.createElement(
                    "svg",
                    Object.assign({ xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", "aria-hidden": "true", ref: n, "aria-labelledby": a }, o),
                    r ? e.createElement("title", { id: a }, r) : null,
                    e.createElement("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        d: "M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59",
                    })
                );
            });
            var Io = ["title", "titleId"];
            var _o = e.forwardRef(function (t, n) {
                var r = t.title,
                    a = t.titleId,
                    o = u(t, Io);
                return e.createElement(
                    "svg",
                    Object.assign({ xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", "aria-hidden": "true", ref: n, "aria-labelledby": a }, o),
                    r ? e.createElement("title", { id: a }, r) : null,
                    e.createElement("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        d:
                            "M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a7.464 7.464 0 01-1.15 3.993m1.989 3.559A11.209 11.209 0 008.25 10.5a3.75 3.75 0 117.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 01-3.6 9.75m6.633-4.596a18.666 18.666 0 01-2.485 5.33",
                    })
                );
            }),
                Do = ["title", "titleId"];
            e.forwardRef(function (t, n) {
                var r = t.title,
                    a = t.titleId,
                    o = u(t, Do);
                return e.createElement(
                    "svg",
                    Object.assign({ xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", "aria-hidden": "true", ref: n, "aria-labelledby": a }, o),
                    r ? e.createElement("title", { id: a }, r) : null,
                    e.createElement("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        d:
                            "M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z",
                    })
                );
            });
            var Mo = ["title", "titleId"];
            var Fo = e.forwardRef(function (t, n) {
                var r = t.title,
                    a = t.titleId,
                    o = u(t, Mo);
                return e.createElement(
                    "svg",
                    Object.assign({ xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", "aria-hidden": "true", ref: n, "aria-labelledby": a }, o),
                    r ? e.createElement("title", { id: a }, r) : null,
                    e.createElement("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        d: "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99",
                    })
                );
            }),
                zo = ["title", "titleId"];
            e.forwardRef(function (t, n) {
                var r = t.title,
                    a = t.titleId,
                    o = u(t, zo);
                return e.createElement(
                    "svg",
                    Object.assign({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true", ref: n, "aria-labelledby": a }, o),
                    r ? e.createElement("title", { id: a }, r) : null,
                    e.createElement("path", {
                        fillRule: "evenodd",
                        d: "M2 10a8 8 0 1116 0 8 8 0 01-16 0zm6.39-2.908a.75.75 0 01.766.027l3.5 2.25a.75.75 0 010 1.262l-3.5 2.25A.75.75 0 018 12.25v-4.5a.75.75 0 01.39-.658z",
                        clipRule: "evenodd",
                    })
                );
            });
            var Uo = ["title", "titleId"];
            e.forwardRef(function (t, n) {
                var r = t.title,
                    a = t.titleId,
                    o = u(t, Uo);
                return e.createElement(
                    "svg",
                    Object.assign({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true", ref: n, "aria-labelledby": a }, o),
                    r ? e.createElement("title", { id: a }, r) : null,
                    e.createElement("path", {
                        fillRule: "evenodd",
                        d:
                            "M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z",
                        clipRule: "evenodd",
                    })
                );
            });
            var Bo = n(835),
                Wo = function () {
                    var e = [
                        { id: 1, name: "Paid out to traders", value: 100, suffix: "M+", prefix: "$" },
                        { id: 2, name: "Countries registered with us", value: 180, suffix: "+", prefix: void 0 },
                        { id: 3, name: "Volume of trades monthly", value: 13, suffix: "M+", prefix: void 0 },
                        { id: 4, name: "Avg. payout processing time", value: 3, suffix: "h", prefix: void 0 },
                    ];
                    return (0, f.jsx)("div", {
                        children: (0, f.jsxs)("div", {
                            className: "mx-auto  max-w-[1545px] px-6 lg:px-8 py-24 ",
                            children: [
                                (0, f.jsx)("div", {
                                    className: "mx-auto max-w-2xl lg:mx-0 lg:max-w-xl",
                                    children: (0, f.jsx)("p", { className: "mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl", children: "Trusted by thousands of users\xa0worldwide" }),
                                }),
                                (0, f.jsx)("dl", {
                                    className: "mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 text-white sm:mt-20 sm:grid-cols-2 sm:gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-4",
                                    children: e.map(function (e) {
                                        return (0, f.jsx)(Bo.ZP, {
                                            start: 0,
                                            end: e.value,
                                            duration: 2.75,
                                            separator: " ",
                                            decimals: 0,
                                            decimal: ",",
                                            prefix: e.prefix,
                                            suffix: e.suffix,
                                            enableScrollSpy: !0,
                                            children: function (t) {
                                                var n = t.countUpRef;
                                                t.start;
                                                return (0, f.jsxs)(
                                                    "div",
                                                    {
                                                        className: "flex flex-col gap-y-3 border-l border-white/10 pl-6",
                                                        children: [(0, f.jsx)("dt", { className: "text-md leading-6", children: e.name }), (0, f.jsx)("dd", { className: "order-first text-[36px] font-semibold tracking-tight", ref: n })],
                                                    },
                                                    e.id
                                                );
                                            },
                                        });
                                    }),
                                }),
                            ],
                        }),
                    });
                },
                Vo = function () {
                    var t = (0, e.useRef)(null),
                        n = j((0, e.useState)(!1), 2),
                        r = n[0],
                        a = n[1];
                    return (
                        (0, e.useEffect)(
                            function () {
                                var e = function () {
                                    t.current &&
                                        t.current.play().catch(function (e) {
                                            console.error("Autoplay was prevented:", e);
                                        });
                                };
                                e();
                                var n = function () {
                                    r || (e(), a(!0));
                                };
                                return (
                                    document.addEventListener("touchstart", n),
                                    document.addEventListener("click", n),
                                    function () {
                                        document.removeEventListener("touchstart", n), document.removeEventListener("click", n);
                                    }
                                );
                            },
                            [r]
                        ),
                        (0, f.jsxs)(f.Fragment, {
                            children: [
                                (0, f.jsxs)("div", {
                                    style: { backgroundColor: "#05080b", position: "relative" },
                                    children: [
                                        (0, f.jsxs)("video", {
                                            ref: t,
                                            loop: !0,
                                            muted: !0,
                                            playsInline: !0,
                                            className: "absolute top-0 left-0 w-full h-full object-cover z-0",
                                            children: [(0, f.jsx)("source", { src: "/bg-video.mp4", type: "video/mp4" }), "Your browser does not support the video tag."],
                                        }),
                                        (0, f.jsx)("div", { className: "absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10" }),
                                        (0, f.jsx)(xn, {}),
                                        (0, f.jsx)(wn, {}),
                                    ],
                                }),
                                (0, f.jsx)(Ze, {}),
                                (0, f.jsx)("div", { style: { backgroundColor: "#05080b", padding: "12px 0px" }, children: (0, f.jsx)(Wo, {}) }),
                                (0, f.jsx)(To, {}),
                                (0, f.jsx)(Ln, {}),
                                (0, f.jsx)(xo, {}),
                                (0, f.jsx)(Ro, {}),
                            ],
                        })
                    );
                };
            function Ho() {
                return (0, f.jsxs)("div", {
                    className: "relative isolate overflow-hidden bg-[#05080b] py-24 sm:py-32",
                    children: [
                        (0, f.jsx)("div", { className: "absolute -top-80 left-[max(6rem,33%)] -z-10 transform-gpu blur-3xl sm:left-1/2 md:top-20 lg:ml-20 xl:top-3 xl:ml-56", "aria-hidden": "true" }),
                        (0, f.jsxs)("div", {
                            className: "mx-auto max-w-[1545px] px-6 lg:px-8",
                            children: [
                                (0, f.jsxs)("div", {
                                    className: "mx-auto max-w-4xl lg:mx-0",
                                    children: [
                                        (0, f.jsx)("p", { className: "text-[14px] font-semibold leading-8 tracking-tight text-[#0C6CF2]", children: "About us" }),
                                        (0, f.jsx)("h1", { className: "mt-2 sm:text-4xl text-3xl font-[600] tracking-tight text-[white] ", children: "We bring honesty and transparency to financial services technology" }),
                                    ],
                                }),
                                (0, f.jsxs)("div", {
                                    className: "mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:mt-10 lg:max-w-none lg:grid-cols-12",
                                    children: [
                                        (0, f.jsx)("div", {
                                            className: "relative lg:order-last lg:col-span-5",
                                            children: (0, f.jsxs)("svg", {
                                                className: "absolute -top-[40rem] left-1 -z-10 h-[64rem] w-[175.5rem] -translate-x-1/2 stroke-[white]/10 [mask-image:radial-gradient(64rem_64rem_at_111.5rem_0%,white,transparent)]",
                                                "aria-hidden": "true",
                                                children: [
                                                    (0, f.jsx)("defs", {
                                                        children: (0, f.jsx)("pattern", {
                                                            id: "e87443c8-56e4-4c20-9111-55b82fa704e3",
                                                            width: 200,
                                                            height: 200,
                                                            patternUnits: "userSpaceOnUse",
                                                            children: (0, f.jsx)("path", { d: "M0.5 0V200M200 0.5L0 0.499983" }),
                                                        }),
                                                    }),
                                                    (0, f.jsx)("rect", { width: "100%", height: "100%", strokeWidth: 0, fill: "url(#e87443c8-56e4-4c20-9111-55b82fa704e3)" }),
                                                ],
                                            }),
                                        }),
                                        (0, f.jsxs)("div", {
                                            className: "max-w-4xl text-[18px] leading-7 text-white lg:col-span-7",
                                            children: [
                                                (0, f.jsxs)("p", {
                                                    children: [
                                                        "Welcome to ",
                                                        vn.name,
                                                        ", an international online trading firm offering 24 hours access to a diverse range of trading products including crypto, forex currency pairs, commodities, futures, indices and stocks.",
                                                        (0, f.jsx)("br", {}),
                                                        (0, f.jsx)("br", {}),
                                                        "Through our ",
                                                        vn.name,
                                                        " platform, you can take advantage of high liquidity, low spreads, mobile trading, technical analysis and even more.",
                                                    ],
                                                }),
                                                (0, f.jsx)("p", {
                                                    className: "mt-8",
                                                    children:
                                                        "We maintain high standards to keep trading environments secure, and offer the best tailor made trading conditions for every client. We help Forex traders to develop the knowledge and skills they need to trade efficiently and responsibly.",
                                                }),
                                                (0, f.jsx)("p", {
                                                    className: "mt-8",
                                                    children: "We aspire to do this by building fine products that can help boost business activity, remove inefficiencies and provide better performance and growth.",
                                                }),
                                            ],
                                        }),
                                    ],
                                }),
                            ],
                        }),
                    ],
                });
            }
            var qo = [
                { name: "".concat(vn.name, " Account "), description: "At our platform, we offer a single, unified trading account type, designed to simplify and streamline your trading experience with us." },
                {
                    name: "Licensed and Regulated",
                    description: "We hold ourselves to the highest levels of integrity and professionalism, diligently respecting and abiding by the industry standards and regulations that govern our field. ",
                },
                {
                    name: "Instant account opening and funding",
                    description: "Our registration process is designed with your convenience in mind, featuring a simple and straightforward registration form coupled with a fast an easy verification process.",
                },
            ];
            function $o() {
                return (0, f.jsx)("div", {
                    className: "bg-white py-24 sm:py-32",
                    children: (0, f.jsxs)("div", {
                        className: "mx-auto max-w-[1545px] px-6 lg:px-8",
                        children: [
                            (0, f.jsxs)("div", {
                                className: "mx-auto max-w-2xl lg:mx-0",
                                children: [
                                    (0, f.jsx)("h2", { className: "text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl", children: "Why we\u2019re better" }),
                                    (0, f.jsx)("p", { className: "mt-6 text-lg leading-8 text-gray-600", children: "Our team comprises of industry experts who are driven to consistently improve your trading experience." }),
                                ],
                            }),
                            (0, f.jsx)("dl", {
                                className: "mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 text-base leading-7 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3",
                                children: qo.map(function (e) {
                                    return (0,
                                        f.jsxs)("div", { children: [(0, f.jsx)("dt", { className: "font-semibold text-gray-900", children: e.name }), (0, f.jsx)("dd", { className: "mt-1 text-gray-600", children: e.description })] }, e.name);
                                }),
                            }),
                        ],
                    }),
                });
            }
            var Go = function () {
                return (0, f.jsxs)(f.Fragment, { children: [(0, f.jsx)("div", { style: { backgroundColor: "#05080b" }, children: (0, f.jsx)(xn, {}) }), (0, f.jsx)(Ho, {}), (0, f.jsx)($o, {}), (0, f.jsx)(Ro, {})] });
            };
            function Qo() {
                return (0, f.jsx)("div", {
                    className: "bg-white",
                    children: (0, f.jsx)("div", {
                        className: "px-6 py-24 sm:px-6 sm:py-32 lg:px-8",
                        children: (0, f.jsxs)("div", {
                            className: "mx-auto max-w-2xl text-center",
                            children: [
                                (0, f.jsxs)("p", {
                                    className: "text-left",
                                    children: [
                                        "We care very deeply about our work and the kind of impacts we can make with it. We have a very few sets of beliefs and strongly-held ideas we're betting on, about the future of enterprise and commerce in emerging economies.",
                                        (0, f.jsx)("br", {}),
                                        (0, f.jsx)("br", {}),
                                        "We are, therefore, building commerce-enabling financial products, from the ground up, stacks of new services, honest and very critical, to help local businesses become more successful.",
                                        (0, f.jsx)("br", {}),
                                        (0, f.jsx)("br", {}),
                                        "We serve thousands of businesses today but we are just getting started. They share their stories on how much ",
                                        vn.name,
                                        " ",
                                        "has done. We will continue to work to make entrepreneurship more permissionless and successful on the continent and everywhere else it is most needed.",
                                    ],
                                }),
                                (0, f.jsx)("br", {}),
                                (0, f.jsx)("br", {}),
                                (0, f.jsx)("br", {}),
                                (0, f.jsx)("h2", { className: "text-3xl font-[600] tracking-tight text-gray-900 sm:text-4xl", children: "Get started with trading today" }),
                                (0, f.jsx)("p", { className: "mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600", children: "It\u2019s easy to get started. Register an account with us and get started with trading today." }),
                                (0, f.jsx)("div", { className: "mt-10 flex items-center justify-center gap-x-6", children: (0, f.jsx)(v, { href: "".concat(vn.appLink, "/register"), children: "Get started" }) }),
                            ],
                        }),
                    }),
                });
            }
            var Yo = [
                [
                    {
                        question: "How do I open an account?",
                        answer:
                            "Our account registration process is as easy as clicking a 'Get Started' button anywhere on our website. They will all take you to the account registration page, or your dashboard if you have already logged in.",
                    },
                    { question: "How do I make a deposit?", answer: "Once logged into your account, you will find a 'deposit' panel as an option in the sidebar of your dashboard. This will enable you deposit really quickly." },
                ],
                [
                    {
                        question: "What is copy trading?",
                        answer:
                            "Copy trading is most useful for those that do not wish to trade on their own or with an account manager. With copy trading, you can select from a list of specially selected traders and directly copy every trade they place.",
                    },
                    {
                        question: "How does staking work?",
                        answer: "Staking your crypto allows you to tap into the power of the blockchain decentralization and make profits. Your crypto is placed in a pool of traders and you earn on daily basis in the pool.",
                    },
                ],
                [
                    {
                        question: "What trading options are available?",
                        answer: "We offer a wide vareity of options spanning accross forex, including stocks and cryptocurrencies. We also offer practice accounts to demo your trades before taking on serious trades with a live one.",
                    },
                    {
                        question: "How do I invest in real estate?",
                        answer: "We provide an out-of-the-box solution to earning from real estate. You can earn without even having to buy and keep property with the available options when you create an account.",
                    },
                ],
            ];
            function Ko() {
                return (0, f.jsx)("section", {
                    id: "faqs",
                    "aria-labelledby": "faqs-title",
                    className: "border-gray-200 py-20 sm:py-32",
                    children: (0, f.jsxs)(y, {
                        children: [
                            (0, f.jsxs)("div", {
                                className: "mx-auto max-w-2xl lg:mx-0",
                                children: [
                                    (0, f.jsx)("h2", { id: "faqs-title", className: "text-3xl font-medium tracking-tight text-white", children: "Frequently asked questions" }),
                                    (0, f.jsxs)("p", {
                                        className: "mt-2 text-lg text-gray-300",
                                        children: ["If you have anything else you want to ask,", " ", (0, f.jsx)(go, { to: "mailto:".concat(vn.email), className: "text-gray-400 underline", children: "reach out to us" }), "."],
                                    }),
                                ],
                            }),
                            (0, f.jsx)("ul", {
                                role: "list",
                                className: "mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:max-w-none lg:grid-cols-3",
                                children: Yo.map(function (e, t) {
                                    return (0, f.jsx)(
                                        "li",
                                        {
                                            children: (0, f.jsx)("ul", {
                                                role: "list",
                                                className: "space-y-10",
                                                children: e.map(function (e, t) {
                                                    return (0,
                                                        f.jsxs)("li", { children: [(0, f.jsx)("h3", { className: "text-lg font-semibold leading-6 text-white", children: e.question }), (0, f.jsx)("p", { className: "mt-4 text-sm text-gray-300", children: e.answer })] }, t);
                                                }),
                                            }),
                                        },
                                        t
                                    );
                                }),
                            }),
                        ],
                    }),
                });
            }
            var Zo,
                Xo = function () {
                    return (0, f.jsxs)(f.Fragment, { children: [(0, f.jsxs)("div", { style: { backgroundColor: "#05080b" }, children: [(0, f.jsx)(xn, {}), (0, f.jsx)(Ko, {})] }), (0, f.jsx)(Qo, {}), (0, f.jsx)(Ro, {})] });
                };
            function Jo() {
                return (0, f.jsx)("div", {
                    className: "px-6 py-32 lg:px-8",
                    children: (0, f.jsxs)("div", {
                        className: "mx-auto max-w-3xl text-base leading-7 text-white",
                        children: [
                            (0, f.jsx)("h1", { className: "mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl", children: "The only platform you need to trade cryptocurrencies" }),
                            (0, f.jsx)("div", {
                                className: "mt-10 max-w-2xl",
                                children: (0, f.jsx)("p", {
                                    children:
                                        "Enjoy trading and earning from a wide range of cryptocurrencies on our state-of-the-art platform. With access to real-time market data, comprehensive analysis tools, and dedicated customer support, we provide everything you need to navigate the dynamic world of digital currencies. Whether you're a seasoned trader or just starting out, our user-friendly interface and educational resources make it easy for you to engage with the crypto market. Join us and discover the potential for growth and innovation in this exciting financial frontier.",
                                }),
                            }),
                            (0, f.jsxs)("div", {
                                className: "mt-16 max-w-2xl",
                                children: [
                                    (0, f.jsx)("h2", { className: "text-2xl font-bold tracking-tight text-white", children: "What is a crypto currency?" }),
                                    (0, f.jsx)("p", {
                                        className: "mt-6",
                                        children:
                                            "A cryptocurrency like bitcoin is a virtual currency traded peer-to-peer on a blockchain, independent of centralized authorities like banks and governments. Cryptocurrencies are entirely virtual, so they are not backed by physical commodities and have no intrinsic value.",
                                    }),
                                ],
                            }),
                            (0, f.jsxs)("div", {
                                className: "mt-16 max-w-2xl",
                                children: [
                                    (0, f.jsx)("h2", { className: "text-2xl font-bold tracking-tight text-white", children: "Are There Investment Opportunities With Cryptocurrencies?" }),
                                    (0, f.jsx)("p", {
                                        className: "mt-6",
                                        children:
                                            "Absolutely. Cryptocurrencies have become established investment commodities among major financial institutions and have even been adopted by countries such as Australia and Japan. As with any investment though, there are risks linked to market movements, high volatility and economics.",
                                    }),
                                ],
                            }),
                        ],
                    }),
                });
            }
            function ei() {
                return (0, f.jsx)("div", {
                    className: "bg-white",
                    children: (0, f.jsx)("div", {
                        className: "px-6 py-24 sm:px-6 sm:py-32 lg:px-8",
                        children: (0, f.jsxs)("div", {
                            className: "mx-auto max-w-2xl text-center",
                            children: [
                                (0, f.jsx)("h2", { className: "text-3xl font-[600] tracking-tight text-gray-900 sm:text-4xl", children: "Get started with trading today" }),
                                (0, f.jsx)("p", { className: "mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600", children: "It\u2019s easy to get started. Register an account with us and get started with trading today." }),
                                (0, f.jsx)("div", { className: "mt-10 flex items-center justify-center gap-x-6", children: (0, f.jsx)(v, { href: "".concat(vn.appLink, "/register"), children: "Get started" }) }),
                            ],
                        }),
                    }),
                });
            }
            var ti,
                ni =
                    null != (Zo = e.startTransition)
                        ? Zo
                        : function (e) {
                            e();
                        },
                ri = ["defaultOpen"],
                ai = ["id"],
                oi = ["id"],
                ii = (function (e) {
                    return (e[(e.Open = 0)] = "Open"), (e[(e.Closed = 1)] = "Closed"), e;
                })(ii || {}),
                li = (function (e) {
                    return (
                        (e[(e.ToggleDisclosure = 0)] = "ToggleDisclosure"),
                        (e[(e.CloseDisclosure = 1)] = "CloseDisclosure"),
                        (e[(e.SetButtonId = 2)] = "SetButtonId"),
                        (e[(e.SetPanelId = 3)] = "SetPanelId"),
                        (e[(e.LinkPanel = 4)] = "LinkPanel"),
                        (e[(e.UnlinkPanel = 5)] = "UnlinkPanel"),
                        e
                    );
                })(li || {}),
                si =
                    (i((ti = {}), 0, function (e) {
                        var t;
                        return s(s({}, e), {}, { disclosureState: P(e.disclosureState, ((t = {}), i(t, 0, 1), i(t, 1, 0), t)) });
                    }),
                        i(ti, 1, function (e) {
                            return 1 === e.disclosureState ? e : s(s({}, e), {}, { disclosureState: 1 });
                        }),
                        i(ti, 4, function (e) {
                            return !0 === e.linkedPanel ? e : s(s({}, e), {}, { linkedPanel: !0 });
                        }),
                        i(ti, 5, function (e) {
                            return !1 === e.linkedPanel ? e : s(s({}, e), {}, { linkedPanel: !1 });
                        }),
                        i(ti, 2, function (e, t) {
                            return e.buttonId === t.buttonId ? e : s(s({}, e), {}, { buttonId: t.buttonId });
                        }),
                        i(ti, 3, function (e, t) {
                            return e.panelId === t.panelId ? e : s(s({}, e), {}, { panelId: t.panelId });
                        }),
                        ti),
                ui = (0, e.createContext)(null);
            function ci(t) {
                var n = (0, e.useContext)(ui);
                if (null === n) {
                    var r = new Error("<".concat(t, " /> is missing a parent <Disclosure /> component."));
                    throw (Error.captureStackTrace && Error.captureStackTrace(r, ci), r);
                }
                return n;
            }
            ui.displayName = "DisclosureContext";
            var di = (0, e.createContext)(null);
            function fi(t) {
                var n = (0, e.useContext)(di);
                if (null === n) {
                    var r = new Error("<".concat(t, " /> is missing a parent <Disclosure /> component."));
                    throw (Error.captureStackTrace && Error.captureStackTrace(r, fi), r);
                }
                return n;
            }
            di.displayName = "DisclosureAPIContext";
            var hi = (0, e.createContext)(null);
            function pi(e, t) {
                return P(t.type, si, e, t);
            }
            hi.displayName = "DisclosurePanelContext";
            var mi = e.Fragment;
            var vi = A.RenderStrategy | A.Static;
            var gi = M(function (t, n) {
                var r,
                    a = t.defaultOpen,
                    o = void 0 !== a && a,
                    l = u(t, ri),
                    s = (0, e.useRef)(null),
                    c = pe(
                        n,
                        he(function (e) {
                            s.current = e;
                        }, void 0 === t.as || t.as === e.Fragment)
                    ),
                    d = (0, e.useRef)(null),
                    f = (0, e.useRef)(null),
                    h = (0, e.useReducer)(pi, { disclosureState: o ? 0 : 1, linkedPanel: !1, buttonRef: f, panelRef: d, buttonId: null, panelId: null }),
                    p = j(h, 2),
                    m = p[0],
                    v = m.disclosureState,
                    g = m.buttonId,
                    y = p[1],
                    b = de(function (e) {
                        y({ type: 1 });
                        var t = X(s);
                        if (t && g) {
                            var n = e ? (e instanceof HTMLElement ? e : e.current instanceof HTMLElement ? e.current : t.getElementById(g)) : t.getElementById(g);
                            null == n || n.focus();
                        }
                    }),
                    x = (0, e.useMemo)(
                        function () {
                            return { close: b };
                        },
                        [b]
                    ),
                    w = (0, e.useMemo)(
                        function () {
                            return { open: 0 === v, close: b };
                        },
                        [v, b]
                    ),
                    k = { ref: c };
                return e.createElement(
                    ui.Provider,
                    { value: h },
                    e.createElement(di.Provider, { value: x }, e.createElement(ot, { value: P(v, ((r = {}), i(r, 0, rt.Open), i(r, 1, rt.Closed), r)) }, I({ ourProps: k, theirProps: l, slot: w, defaultTag: mi, name: "Disclosure" })))
                );
            }),
                yi = M(function (t, n) {
                    var r = K(),
                        a = t.id,
                        o = void 0 === a ? "headlessui-disclosure-button-".concat(r) : a,
                        i = u(t, ai),
                        l = j(ci("Disclosure.Button"), 2),
                        s = l[0],
                        c = l[1],
                        d = (0, e.useContext)(hi),
                        f = null !== d && d === s.panelId,
                        h = (0, e.useRef)(null),
                        p = pe(h, n, f ? null : s.buttonRef);
                    (0, e.useEffect)(
                        function () {
                            if (!f)
                                return (
                                    c({ type: 2, buttonId: o }),
                                    function () {
                                        c({ type: 2, buttonId: null });
                                    }
                                );
                        },
                        [o, c, f]
                    );
                    var m = de(function (e) {
                        var t;
                        if (f) {
                            if (1 === s.disclosureState) return;
                            switch (e.key) {
                                case Z.Space:
                                case Z.Enter:
                                    e.preventDefault(), e.stopPropagation(), c({ type: 0 }), null == (t = s.buttonRef.current) || t.focus();
                            }
                        } else
                            switch (e.key) {
                                case Z.Space:
                                case Z.Enter:
                                    e.preventDefault(), e.stopPropagation(), c({ type: 0 });
                            }
                    }),
                        v = de(function (e) {
                            if (e.key === Z.Space) e.preventDefault();
                        }),
                        g = de(function (e) {
                            var n;
                            tt(e.currentTarget) || t.disabled || (f ? (c({ type: 0 }), null == (n = s.buttonRef.current) || n.focus()) : c({ type: 0 }));
                        }),
                        y = (0, e.useMemo)(
                            function () {
                                return { open: 0 === s.disclosureState };
                            },
                            [s]
                        ),
                        b = ve(t, h);
                    return I({
                        ourProps: f
                            ? { ref: p, type: b, onKeyDown: m, onClick: g }
                            : { ref: p, id: o, type: b, "aria-expanded": t.disabled ? void 0 : 0 === s.disclosureState, "aria-controls": s.linkedPanel ? s.panelId : void 0, onKeyDown: m, onKeyUp: v, onClick: g },
                        theirProps: i,
                        slot: y,
                        defaultTag: "button",
                        name: "Disclosure.Button",
                    });
                }),
                bi = M(function (t, n) {
                    var r = K(),
                        a = t.id,
                        o = void 0 === a ? "headlessui-disclosure-panel-".concat(r) : a,
                        i = u(t, oi),
                        l = j(ci("Disclosure.Panel"), 2),
                        s = l[0],
                        c = l[1],
                        d = fi("Disclosure.Panel").close,
                        f = pe(n, s.panelRef, function (e) {
                            ni(function () {
                                return c({ type: e ? 4 : 5 });
                            });
                        });
                    (0, e.useEffect)(
                        function () {
                            return (
                                c({ type: 3, panelId: o }),
                                function () {
                                    c({ type: 3, panelId: null });
                                }
                            );
                        },
                        [o, c]
                    );
                    var h = at(),
                        p = null !== h ? (h & rt.Open) === rt.Open : 0 === s.disclosureState,
                        m = (0, e.useMemo)(
                            function () {
                                return { open: 0 === s.disclosureState, close: d };
                            },
                            [s, d]
                        ),
                        v = { ref: f, id: o };
                    return e.createElement(hi.Provider, { value: s.panelId }, I({ ourProps: v, theirProps: i, slot: m, defaultTag: "div", features: vi, visible: p, name: "Disclosure.Panel" }));
                }),
                xi = Object.assign(gi, { Button: yi, Panel: bi }),
                wi = ["title", "titleId"];
            var ki = e.forwardRef(function (t, n) {
                var r = t.title,
                    a = t.titleId,
                    o = u(t, wi);
                return e.createElement(
                    "svg",
                    Object.assign({ xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", "aria-hidden": "true", ref: n, "aria-labelledby": a }, o),
                    r ? e.createElement("title", { id: a }, r) : null,
                    e.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M18 12H6" })
                );
            }),
                Ci = ["title", "titleId"];
            var ji = e.forwardRef(function (t, n) {
                var r = t.title,
                    a = t.titleId,
                    o = u(t, Ci);
                return e.createElement(
                    "svg",
                    Object.assign({ xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", "aria-hidden": "true", ref: n, "aria-labelledby": a }, o),
                    r ? e.createElement("title", { id: a }, r) : null,
                    e.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 6v12m6-6H6" })
                );
            });
            function Si(e) {
                var t = e.faqs;
                return (0, f.jsx)("div", {
                    className: "bg-[#05080b]",
                    children: (0, f.jsx)("div", {
                        className: "mx-auto max-w-[1545px] py-24 sm:py-32 lg:py-40",
                        children: (0, f.jsxs)("div", {
                            className: "mx-auto max-w-7xl divide-y divide-white/10",
                            children: [
                                (0, f.jsx)("h2", { className: "text-2xl font-bold leading-10 tracking-tight text-white", children: "Some of the things you may want to know" }),
                                (0, f.jsx)("dl", {
                                    className: "mt-10 space-y-6 divide-y divide-white/10",
                                    children: t.map(function (e) {
                                        return (0, f.jsx)(
                                            xi,
                                            {
                                                as: "div",
                                                className: "pt-6",
                                                children: function (t) {
                                                    var n = t.open;
                                                    return (0, f.jsxs)(f.Fragment, {
                                                        children: [
                                                            (0, f.jsx)("dt", {
                                                                children: (0, f.jsxs)(xi.Button, {
                                                                    className: "flex w-full items-start justify-between text-left text-white",
                                                                    children: [
                                                                        (0, f.jsx)("span", { className: "text-base font-semibold leading-7", children: e.question }),
                                                                        (0, f.jsx)("span", {
                                                                            className: "ml-6 flex h-7 items-center",
                                                                            children: n ? (0, f.jsx)(ki, { className: "h-6 w-6", "aria-hidden": "true" }) : (0, f.jsx)(ji, { className: "h-6 w-6", "aria-hidden": "true" }),
                                                                        }),
                                                                    ],
                                                                }),
                                                            }),
                                                            (0, f.jsx)(xi.Panel, { as: "dd", className: "mt-2 pr-12", children: (0, f.jsx)("p", { className: "text-base leading-7 text-gray-300", children: e.answer }) }),
                                                        ],
                                                    });
                                                },
                                            },
                                            e.question
                                        );
                                    }),
                                }),
                            ],
                        }),
                    }),
                });
            }
            function Ei() {
                return (0, f.jsx)("div", {
                    className: "bg-[#05080b] py-24 sm:py-32",
                    children: (0, f.jsx)("div", {
                        className: "mx-auto max-w-[1545px] px-6 lg:px-8",
                        children: (0, f.jsxs)("div", {
                            className: "mx-auto max-w-5xl lg:mx-0",
                            children: [
                                (0, f.jsx)("h2", { className: "text-[45px] font-[600] max-w-[800px] tracking-tight text-white sm:text-6xl", children: "Trade shares on our platform" }),
                                (0, f.jsxs)("p", {
                                    className: "mt-6 text-lg leading-8 text-gray-300",
                                    children: [
                                        "A CFD, or Contract for Difference, is a type of financial instrument that allows you to trade on the price movements of stocks, regardless of whether prices are rising or falling. The key advantage of a CFD is the opportunity to speculate on the price movements of an asset (upwards or downwards) without actually owning the underlying asset.",
                                        (0, f.jsx)("br", {}),
                                        (0, f.jsx)("br", {}),
                                        "Stock trading has been a popular financial pursuit since stocks were first introduced by the Dutch East India Company in the 17th century. This is both an efficient and effective type of investment for both families and individuals.",
                                    ],
                                }),
                                (0, f.jsxs)("p", {
                                    className: "mt-6 text-lg leading-8 text-gray-300",
                                    children: [
                                        "Our platform is a comprehensive gateway to the stock markets, meticulously designed to equip you with all the tools needed for your trading success.",
                                        (0, f.jsx)("br", {}),
                                        (0, f.jsx)("br", {}),
                                        "We provide access to real-time market data, advanced analytics, customizable charts, and a suite of intuitive trading instruments, all seamlessly integrated to enhance your decision-making process. Whether you're a novice embarking on your trading journey or a seasoned professional seeking to refine your strategies, our platform offers tailored solutions to meet your unique needs. Benefit from expert guidance, ongoing education, and responsive customer support that puts you at the center of our mission.",
                                        (0, f.jsx)("br", {}),
                                        (0, f.jsx)("br", {}),
                                        "Join us and discover a trading environment that prioritizes your growth, security, and success, connecting you to global opportunities with confidence and ease.",
                                    ],
                                }),
                            ],
                        }),
                    }),
                });
            }
            function Ni() {
                return (0, f.jsx)("div", {
                    className: "bg-white px-6 py-24 sm:py-32 lg:px-8",
                    children: (0, f.jsxs)("div", {
                        className: "mx-auto max-w-3xl text-center",
                        children: [
                            (0, f.jsx)("h2", { className: "mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl", children: "Trade cryptocurrencies on our platform" }),
                            (0, f.jsxs)("p", {
                                className: "mt-6 text-lg leading-8 text-gray-600",
                                children: [
                                    vn.name,
                                    " is excited to announce the launch of our new cryptocurrency trading platform. Now you can start trading Bitcoin, Ethereum and many more cryptocurrencies quickly, easily and safely from wherever you are \u2014 in just seconds. You get great margin trading leverage and short sell options with fast deposits and withdrawals. Our support team is available 24/7/365 to help get you trading on our CySEC-regulated platform with a trading volume of US $11 billion monthly.",
                                ],
                            }),
                            (0, f.jsx)(v, { href: "".concat(vn.appLink, "/register"), color: "white", className: "mt-10", children: "Get started" }),
                        ],
                    }),
                });
            }
            var Pi = function () {
                return (0, f.jsxs)("div", {
                    className: "mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8",
                    children: [
                        (0, f.jsxs)("div", {
                            className: "mx-auto max-w-2xl lg:mx-0",
                            children: [
                                (0, f.jsx)("h2", { className: "text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl", children: "We're changing the way people earn and invest, one trade at a time" }),
                                (0, f.jsx)("p", {
                                    className: "mt-6 text-base leading-7 text-gray-600",
                                    children:
                                        "We empower individuals from all walks of life to take control of their financial futures, making trading accessible, transparent, and rewarding. But don't just take our word for it. The numbers tell a compelling story, reflecting the tangible impact we've made on the lives of countless investors.",
                                }),
                            ],
                        }),
                        (0, f.jsxs)("div", {
                            className: "mx-auto mt-16 flex max-w-2xl flex-col gap-8 lg:mx-0 lg:mt-20 lg:max-w-none lg:flex-row lg:items-end",
                            children: [
                                (0, f.jsxs)("div", {
                                    className:
                                        "flex flex-col-reverse justify-between gap-x-16 gap-y-8 rounded-2xl bg-gray-50 p-8 sm:w-3/4 sm:max-w-md sm:flex-row-reverse sm:items-end lg:w-72 lg:max-w-none lg:flex-none lg:flex-col lg:items-start",
                                    children: [
                                        (0, f.jsx)("p", { className: "flex-none text-3xl font-bold tracking-tight text-gray-900", children: "$100M+" }),
                                        (0, f.jsxs)("div", {
                                            className: "sm:w-80 sm:shrink lg:w-auto lg:flex-none",
                                            children: [
                                                (0, f.jsx)("p", { className: "text-lg font-semibold tracking-tight text-gray-900", children: "Paid out to traders" }),
                                                (0, f.jsx)("p", {
                                                    className: "mt-2 text-base leading-7 text-gray-600",
                                                    children: "We have successfully paid out to an impressive 100 million traders, underscoring our commitment to prompt and reliable transactions.",
                                                }),
                                            ],
                                        }),
                                    ],
                                }),
                                (0, f.jsxs)("div", {
                                    className:
                                        "flex flex-col-reverse justify-between gap-x-16 gap-y-8 rounded-2xl bg-gray-900 p-8 sm:flex-row-reverse sm:items-end lg:w-full lg:max-w-sm lg:flex-auto lg:flex-col lg:items-start lg:gap-y-44",
                                    children: [
                                        (0, f.jsx)("p", { className: "flex-none text-3xl font-bold tracking-tight text-white", children: "180+" }),
                                        (0, f.jsxs)("div", {
                                            className: "sm:w-80 sm:shrink lg:w-auto lg:flex-none",
                                            children: [
                                                (0, f.jsx)("p", { className: "text-lg font-semibold tracking-tight text-white", children: "Countries registered with us" }),
                                                (0, f.jsx)("p", {
                                                    className: "mt-2 text-base leading-7 text-gray-400",
                                                    children: "With registrations spanning across 180+ countries, our platform stands as a testament to global reach and diversity.",
                                                }),
                                            ],
                                        }),
                                    ],
                                }),
                                (0, f.jsxs)("div", {
                                    className:
                                        "flex flex-col-reverse justify-between gap-x-16 gap-y-8 rounded-2xl bg-[#0C6CF2] p-8 sm:w-11/12 sm:max-w-xl sm:flex-row-reverse sm:items-end lg:w-full lg:max-w-none lg:flex-auto lg:flex-col lg:items-start lg:gap-y-28",
                                    children: [
                                        (0, f.jsx)("p", { className: "flex-none text-3xl font-bold tracking-tight text-white", children: "13M+" }),
                                        (0, f.jsxs)("div", {
                                            className: "sm:w-80 sm:shrink lg:w-auto lg:flex-none",
                                            children: [
                                                (0, f.jsx)("p", { className: "text-lg font-semibold tracking-tight text-white", children: "Volume of trades monthly" }),
                                                (0, f.jsx)("p", {
                                                    className: "mt-2 text-base leading-7 text-indigo-200",
                                                    children:
                                                        "Our platform is proud to host over 13 million volumes of trades monthly, a figure that showcases both the vibrant activity and the trust that our clients place in our services.",
                                                }),
                                            ],
                                        }),
                                    ],
                                }),
                            ],
                        }),
                    ],
                });
            },
                Ti = [
                    {
                        question: "What Are Stocks?",
                        answer:
                            "Stocks, also commonly referred to as equities or shares, are issued by a public corporation and put up for sale. Companies originally used stocks as a way of raising additional capital, and as a way to boost their business growth. When the company first puts these stocks up for sale, this is called the Initial Public Offering. Once this stage is complete, the shares themselves are then sold on the stock market, which is where any stock trading will occur.",
                    },
                    {
                        question: "How Do I Trade Stocks?",
                        answer:
                            "A stock market is where stocks are traded: where sellers and buyers come to agree on a price. Historically, stock exchanges existed in a physical location, and all transactions took place on the trading floor. One of the world\u2019s most famous stock markets is the London Stock Exchange (LSE). Our platform provides an alternative to trading by bringing all of the tools required to trade, into one",
                    },
                    {
                        question: "Stock Trading Risk Assessment",
                        answer:
                            "All forms of financial investment carry a level of risk, and stock trading is no different. Even traders with decades of experience cannot predict the correct price movements every single time. People use various strategies, but it is important to note that there is no such thing as a failsafe strategy. It is also advisable to limit the amount of money you invest in a single trade, as part of your own risk management.",
                    },
                ],
                Oi = function () {
                    return (0, f.jsxs)(f.Fragment, {
                        children: [
                            (0, f.jsx)("div", { style: { backgroundColor: "#05080b" }, children: (0, f.jsx)(xn, {}) }),
                            (0, f.jsx)(Ei, {}),
                            (0, f.jsx)(Pi, {}),
                            (0, f.jsx)("br", {}),
                            (0, f.jsx)("br", {}),
                            (0, f.jsx)("br", {}),
                            (0, f.jsx)(Si, { faqs: Ti }),
                            (0, f.jsx)(ei, {}),
                            (0, f.jsx)(Ro, {}),
                        ],
                    });
                },
                Ri = ["title", "titleId"];
            var Ai = e.forwardRef(function (t, n) {
                var r = t.title,
                    a = t.titleId,
                    o = u(t, Ri);
                return e.createElement(
                    "svg",
                    Object.assign({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true", ref: n, "aria-labelledby": a }, o),
                    r ? e.createElement("title", { id: a }, r) : null,
                    e.createElement("path", { d: "M11.983 1.907a.75.75 0 00-1.292-.657l-8.5 9.5A.75.75 0 002.75 12h6.572l-1.305 6.093a.75.75 0 001.292.657l8.5-9.5A.75.75 0 0017.25 8h-6.572l1.305-6.093z" })
                );
            }),
                Li = ["title", "titleId"];
            var Ii = e.forwardRef(function (t, n) {
                var r = t.title,
                    a = t.titleId,
                    o = u(t, Li);
                return e.createElement(
                    "svg",
                    Object.assign({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true", ref: n, "aria-labelledby": a }, o),
                    r ? e.createElement("title", { id: a }, r) : null,
                    e.createElement("path", {
                        fillRule: "evenodd",
                        d: "M2 10c0-3.967 3.69-7 8-7 4.31 0 8 3.033 8 7s-3.69 7-8 7a9.165 9.165 0 01-1.504-.123 5.976 5.976 0 01-3.935 1.107.75.75 0 01-.584-1.143 3.478 3.478 0 00.522-1.756C2.979 13.825 2 12.025 2 10z",
                        clipRule: "evenodd",
                    })
                );
            }),
                _i = [
                    { name: "Instant Results.", description: "Start seeing instant results with fully automated trading strategies, personal managers and trading guides.", icon: Ai },
                    { name: "Secured.", description: "Utilising top-tier security practices, our platform is able to handle cyberattacks and protect your assets.", icon: Co },
                    { name: "Support.", description: "Our representatives are available to assist you at anytime. Or reach us 24/7/365 on Live Chat or by email.", icon: Ii },
                ];
            function Di() {
                return (0, f.jsx)("div", {
                    className: "bg-white",
                    style: { display: "grid", placeItems: "center" },
                    children: (0, f.jsxs)("div", {
                        className: "px-6 py-24 sm:px-6 sm:py-32 lg:px-8",
                        children: [
                            (0, f.jsxs)("div", {
                                className: "mx-auto max-w-2xl text-center",
                                children: [
                                    (0, f.jsx)("h2", { className: "text-3xl font-[600] tracking-tight text-gray-900 sm:text-4xl", children: "Get started with trading today" }),
                                    (0, f.jsx)("p", { className: "mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600", children: "It\u2019s easy to get started. Register an account with us and get started with trading today." }),
                                ],
                            }),
                            (0, f.jsx)("br", {}),
                            (0, f.jsx)("br", {}),
                            (0, f.jsx)("br", {}),
                            (0, f.jsx)("div", {
                                className: "max-w-[1545px] px-6 lg:px-8",
                                children: (0, f.jsx)("dl", {
                                    className: "grid grid-cols-1 gap-x-6 gap-y-10 text-base leading-7 text-gray-600 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16",
                                    children: _i.map(function (e) {
                                        return (0,
                                            f.jsxs)("div", { className: "relative pl-9", children: [(0, f.jsxs)("dt", { className: "inline font-semibold text-gray-900", children: [(0, f.jsx)(e.icon, { className: "absolute left-1 top-1 h-5 w-5 text-[#0C6CF2]", "aria-hidden": "true" }), e.name] }), " ", (0, f.jsx)("dd", { className: "inline", children: e.description })] }, e.name);
                                    }),
                                }),
                            }),
                            (0, f.jsx)("br", {}),
                            (0, f.jsx)("div", { className: "mt-10 flex items-center justify-center gap-x-6", children: (0, f.jsx)(v, { href: "".concat(vn.appLink, "/register"), children: "Get started" }) }),
                        ],
                    }),
                });
            }
            var Mi = function () {
                return (0, f.jsxs)(f.Fragment, {
                    children: [
                        (0, f.jsx)("div", { style: { backgroundColor: "#05080b" }, children: (0, f.jsx)(xn, {}) }),
                        (0, f.jsx)(Ni, {}),
                        (0, f.jsx)("div", { style: { backgroundColor: "#05080b" }, children: (0, f.jsx)(Jo, {}) }),
                        (0, f.jsx)(Di, {}),
                        (0, f.jsx)(Ro, {}),
                    ],
                });
            },
                Fi = ["title", "titleId"];
            var zi = e.forwardRef(function (t, n) {
                var r = t.title,
                    a = t.titleId,
                    o = u(t, Fi);
                return e.createElement(
                    "svg",
                    Object.assign({ xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", "aria-hidden": "true", ref: n, "aria-labelledby": a }, o),
                    r ? e.createElement("title", { id: a }, r) : null,
                    e.createElement("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        d: "M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z",
                    })
                );
            }),
                Ui = ["title", "titleId"];
            e.forwardRef(function (t, n) {
                var r = t.title,
                    a = t.titleId,
                    o = u(t, Ui);
                return e.createElement(
                    "svg",
                    Object.assign({ xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", "aria-hidden": "true", ref: n, "aria-labelledby": a }, o),
                    r ? e.createElement("title", { id: a }, r) : null,
                    e.createElement("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        d: "M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z",
                    })
                );
            });
            var Bi = [
                { name: "Instant Results.", description: "Start seeing instant results with fully automated trading strategies, personal managers and trading guides.", icon: Ai },
                { name: "Secured.", description: "Your assets are safe and secure with us, protected by the latest in cybersecurity measures and industry-standard protocols.", icon: Co },
                { name: "Support.", description: "Our representatives are available to assist you at anytime. Or reach us 24/7/365 on Live Chat or by email.", icon: Ii },
            ];
            function Wi() {
                return (0, f.jsxs)("div", {
                    className: "bg-white py-24 sm:py-32",
                    children: [
                        (0, f.jsx)("div", {
                            className: "mx-auto max-w-7xl px-6 lg:px-8",
                            children: (0, f.jsxs)("div", {
                                className: "mx-auto max-w-2xl sm:text-center",
                                children: [
                                    (0, f.jsx)("p", { className: "mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl", children: "No experience? No problem." }),
                                    (0, f.jsx)("p", {
                                        className: "mt-6 text-lg leading-8 text-gray-600",
                                        children: "Our platform provides you with all the tools you need to earn, even as a complete beginner. From intuitive interfaces to real-time market insights and responsive customer support.",
                                    }),
                                ],
                            }),
                        }),
                        (0, f.jsx)("div", {
                            className: "mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8",
                            children: (0, f.jsx)("dl", {
                                className: "mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base leading-7 text-gray-600 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16",
                                children: Bi.map(function (e) {
                                    return (0,
                                        f.jsxs)("div", { className: "relative pl-9", children: [(0, f.jsxs)("dt", { className: "inline font-semibold text-gray-900", children: [(0, f.jsx)(e.icon, { className: "absolute left-1 top-1 h-5 w-5 text-[#0C6CF2]", "aria-hidden": "true" }), e.name] }), " ", (0, f.jsx)("dd", { className: "inline", children: e.description })] }, e.name);
                                }),
                            }),
                        }),
                    ],
                });
            }
            function Vi() {
                return (0, f.jsx)("div", {
                    className: "bg-[#05080b] overflow-hidden relative",
                    children: (0, f.jsxs)("div", {
                        className: " isolate pt-14 ",
                        children: [
                            (0, f.jsx)("div", {
                                className: "absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-sm sm:-top-80",
                                "aria-hidden": "true",
                                children: (0, f.jsx)("div", {
                                    class: "Hero-module--Hero_backgroundImage--ObUJ0",
                                    children: (0, f.jsx)("img", {
                                        src: "https://i.gifer.com/Tfwd.gif",
                                        alt: "hero",
                                        style: { filter: "brightness(.1)", width: "100%", opacity: "0.05", userSelect: "none", pointerEvents: "none", position: "'absolute" },
                                    }),
                                }),
                            }),
                            (0, f.jsx)("div", {
                                className: "py-24 sm:py-32 lg:pb-40   ",
                                children: (0, f.jsx)("div", {
                                    className: "mx-auto max-w-7xl px-6 lg:px-8 ",
                                    children: (0, f.jsxs)("div", {
                                        className: "mx-auto text-center ",
                                        style: { display: "grid", placeItems: "center" },
                                        children: [
                                            (0, f.jsx)("h1", { className: "text-4xl font-bold tracking-tight max-w-4xl text-white sm:text-6xl", children: "Trade foreign exchange on our platform" }),
                                            (0, f.jsx)("p", {
                                                className: "mt-6 text-lg leading-8 text-gray-300 max-w-4xl",
                                                children:
                                                    "Forex is short for foreign exchange. The forex market is a place where currencies are traded. It is the largest and most liquid financial market in the world with an average daily turnover of 6.6 trillion U.S. dollars as of 2019. The basis of the forex market is the fluctuations of exchange rates. Forex traders speculate on the price fluctuations of currency pairs, making money on the difference between buying and selling prices.",
                                            }),
                                        ],
                                    }),
                                }),
                            }),
                            (0, f.jsx)("div", { className: "absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]", "aria-hidden": "true" }),
                        ],
                    }),
                });
            }
            var Hi = [
                {
                    question: "What Is Margin?",
                    answer:
                        "Margin is the amount of a trader\u2019s funds required to open a new position. Margin is estimated based on the size of your trade, which is measured in lots. A standard lot is 100,000 units. We also provide mini lots (10,000 units), micro lots (1,000 units) and nano lots (100 units). The greater the lot, the bigger the margin amount. Margin allows you to trade with leverage, which, in turn, allows you to place trades larger than the amount of your trading capital. Leverage influences the margin amount too.",
                },
                {
                    question: "What Is Leverage?",
                    answer:
                        "Leverage is the ability to trade positions larger than the amount of capital you possess. This mechanism allows traders to use extra funds from a broker in order to increase the size of their trades. For example, 1:100 leverage means that a trader who has deposited $1,000 into his or her account can trade with $100,000. Although leverage lets traders increase their trade size and, consequently, potential gains, it magnifies their potential losses putting their capital at risk.",
                },
                {
                    question: "When Is The Forex Market Open?",
                    answer:
                        "Due to different time zones, the international forex market is open 24 hours a day \u2014 from 5 p.m. Eastern Standard Time (EST) on Sunday to 4 p.m. EST on Friday, except holidays. Markets first open in Australasia, then in Europe and afterwards in North America. So, when the market closes in Australia, traders can have access to markets in other regions. The 24-hour availability of the forex market is what makes it so attractive to millions of traders.",
                },
            ],
                qi = function () {
                    return (0, f.jsxs)(f.Fragment, {
                        children: [(0, f.jsx)("div", { style: { backgroundColor: "#05080b" }, children: (0, f.jsx)(xn, {}) }), (0, f.jsx)(Vi, {}), (0, f.jsx)(Wi, {}), (0, f.jsx)(Si, { faqs: Hi }), (0, f.jsx)(xo, {}), (0, f.jsx)(Ro, {})],
                    });
                },
                $i = function () {
                    var e = [
                        { id: 1, name: "Paid out to traders", value: 100, suffix: "M+", prefix: "$" },
                        { id: 2, name: "Countries registered with us", value: 180, suffix: "+", prefix: void 0 },
                        { id: 3, name: "Volume of trades monthly", value: 13, suffix: "M+", prefix: void 0 },
                        { id: 4, name: "Avg. payout processing time", value: 3, suffix: "h", prefix: void 0 },
                    ];
                    return (0, f.jsx)("div", {
                        className: "bg-[#05080b]",
                        children: (0, f.jsxs)("main", {
                            className: "relative isolate",
                            children: [
                                (0, f.jsx)("div", {
                                    className: "px-6 lg:px-8",
                                    children: (0, f.jsxs)("div", {
                                        className: "mx-auto max-w-4xl pt-24 sm:pt-40 mx-auto max-w-[1545px] lg:px-8",
                                        children: [
                                            (0, f.jsx)("h2", { className: "text-4xl font-bold tracking-tight text-white sm:text-6xl", children: "This is not about us" }),
                                            (0, f.jsxs)("p", {
                                                className: "mt-6 text-lg leading-8 text-gray-300 max-w-4xl",
                                                children: [
                                                    "Recognizing the challenges faced by millions of individuals struggling to manage their finances, we founded",
                                                    " ",
                                                    vn.name,
                                                    " with a visionary goal in mind. Our mission is to democratize access to the trading markets, enabling people from all walks of life to participate in the economic opportunities that trading offers. By providing user-friendly tools, comprehensive educational resources, and personalized support, we aim to empower our clients to take control of their financial future.",
                                                ],
                                            }),
                                        ],
                                    }),
                                }),
                                (0, f.jsx)("div", {
                                    className: "px-6 lg:px-8",
                                    children: (0, f.jsxs)("div", {
                                        className: " max-w-4xl pt-20 mx-auto max-w-[1545px] lg:px-8",
                                        children: [
                                            (0, f.jsx)("div", {
                                                className: "grid grid-cols-1 gap-8 text-base leading-7 text-gray-300 lg:grid-cols-1 max-w-4xl",
                                                children: (0, f.jsxs)("div", {
                                                    children: [
                                                        (0, f.jsxs)("p", {
                                                            children: [
                                                                "With ",
                                                                vn.name,
                                                                ", we are committed to breaking down barriers, making trading not just accessible, but a viable pathway for growth and earning. It's not merely about opening doors; it's about nurturing financial literacy, fostering confidence, and building a community where everyone has the opportunity to thrive.",
                                                            ],
                                                        }),
                                                        (0, f.jsx)("p", {
                                                            className: "mt-8",
                                                            children:
                                                                "Since our inception, we have managed to maintain an outstanding record in helping people achieve their financial goals. Through a combination of expert guidance, innovative tools, and a relentless commitment to customer success, we've empowered countless individuals to take control of their financial destiny. Our track record speaks to our dedication and the trust we've earned in assisting clients on their unique paths to financial well-being and prosperity.",
                                                        }),
                                                    ],
                                                }),
                                            }),
                                            (0, f.jsx)("dl", {
                                                className: "mt-16 grid grid-cols-1 gap-x-8 gap-y-12 sm:mt-20 sm:grid-cols-2 sm:gap-y-16 lg:mt-28  lg:grid-cols-2 max-w-4xl",
                                                children: e.map(function (e) {
                                                    return (0, f.jsx)(
                                                        Bo.ZP,
                                                        {
                                                            start: 0,
                                                            end: e.value,
                                                            duration: 2.75,
                                                            separator: " ",
                                                            decimals: 0,
                                                            decimal: ",",
                                                            prefix: e.prefix,
                                                            suffix: e.suffix,
                                                            enableScrollSpy: !0,
                                                            children: function (t) {
                                                                var n = t.countUpRef;
                                                                t.start;
                                                                return (0, f.jsxs)("div", {
                                                                    className: "flex flex-col-reverse gap-y-3 border-l border-white/20 pl-6",
                                                                    children: [
                                                                        (0, f.jsx)("dt", { className: "text-base leading-7 text-gray-300", children: e.name }),
                                                                        (0, f.jsx)("dd", { className: "text-3xl font-semibold tracking-tight text-white", ref: n }),
                                                                    ],
                                                                });
                                                            },
                                                        },
                                                        e.id
                                                    );
                                                }),
                                            }),
                                        ],
                                    }),
                                }),
                                (0, f.jsx)("div", {
                                    className: "mt-32 sm:mt-40 xl:mx-auto xl:max-w-[1545px] xl:px-8",
                                    children: (0, f.jsx)("img", {
                                        src: "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2894&q=80",
                                        alt: "",
                                        className: "aspect-[9/4] w-full object-cover xl:rounded-3xl",
                                    }),
                                }),
                            ],
                        }),
                    });
                },
                Gi = function () {
                    return (0, f.jsxs)(f.Fragment, { children: [(0, f.jsx)("div", { style: { backgroundColor: "#05080b" }, children: (0, f.jsx)(xn, {}) }), (0, f.jsx)($i, {}), (0, f.jsx)(Qo, {}), (0, f.jsx)(Ro, {})] });
                };
            function Qi() {
                return (0, f.jsx)("div", {
                    className: "bg-white px-6 py-32 lg:px-8",
                    children: (0, f.jsxs)("div", {
                        className: "mx-auto max-w-4xl text-base leading-7 text-gray-700",
                        children: [
                            (0, f.jsx)("h1", { className: "mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl", children: "Your data is secure, we promise. Here's how we make sure" }),
                            (0, f.jsxs)("p", {
                                className: "mt-6 text-xl leading-8",
                                children: [
                                    "We maintain high standards to keep trading environments secure, and offer the best tailor made trading conditions for every client.",
                                    (0, f.jsx)("br", {}),
                                    (0, f.jsx)("br", {}),
                                    "We help traders to develop the knowledge and skills they need to trade efficiently and responsibly.",
                                ],
                            }),
                            (0, f.jsxs)("div", {
                                children: [
                                    (0, f.jsx)("h2", { className: "mt-16 text-2xl font-[600] tracking-tight text-gray-900", children: "1. Introduction" }),
                                    (0, f.jsxs)("p", {
                                        className: "mt-6",
                                        children: [
                                            "Your privacy is of utmost importance to us and it is our policy to safeguard and respect the confidentiality of information and the privacy of individuals. The following Privacy Policy sets out how",
                                            vn.name,
                                            " collects, uses and manages your personal information we receive by you or a third party in connection with our provision of services to you or which we collect from your use of our services and/or our website (i.e., ",
                                            vn.link,
                                            ") and/or any other related websites and applications including, among others, the Client Portal (www.app.",
                                            vn.link,
                                            "). This Privacy Policy also informs you of your rights with respect to the processing of your personal information. By using",
                                            " ",
                                            vn.name,
                                            "websites, you give your consent to the collection and use of personal information by ",
                                            vn.name,
                                            " as explained in this Privacy Policy.",
                                        ],
                                    }),
                                ],
                            }),
                            (0, f.jsxs)("div", {
                                children: [
                                    (0, f.jsx)("h2", { className: "mt-16 text-2xl font-[600] tracking-tight text-gray-900", children: "2. Data Collection" }),
                                    (0, f.jsxs)("p", {
                                        className: "mt-6",
                                        children: [
                                            "As part of our daily business operations, we need to collect personal information from our clients and prospective clients in order to provide them with our products and services. When you register for either a demo or a live account with",
                                            " ",
                                            vn.name,
                                            ", we collect your personal information directly from you and indirectly as a result of your relationship with us. By understanding your financial needs, we can treat you fairly as a client; we can provide you with the most suitable products and services, give you the appropriate information on investment strategies, process your requests and transactions and offer you both sales and post-sales services. We request the following Personal Data from you: Personal and financial information needed during the online registration applications/forms; Documents needed for KYC and AML procedures as proof of your identity and residency such as Passport, National ID, utility bills, bank or credit card statements; Set of corporate documents in case of corporate clients. Please note that if you decide to end the business relationship with",
                                            " ",
                                            vn.name,
                                            ", we must keep your Personal Data on record for the next five years.",
                                        ],
                                    }),
                                ],
                            }),
                            (0, f.jsxs)("div", {
                                children: [
                                    (0, f.jsx)("h2", { className: "mt-16 text-2xl font-[600] tracking-tight text-gray-900", children: "3. Use Of Your Personal Data" }),
                                    (0, f.jsxs)("p", {
                                        className: "mt-6",
                                        children: [
                                            vn.name,
                                            " shall use your Personal Data for next purposes: To verify your identity. To ensure that you meet the suitability requirements needed to use our products and services. To manage the account you have with us. To process your transactions from and to payment service providers (PSPs) and/or banking institutions. To process your trading orders. To send you information about transaction/post-transaction services. To keep you updated with news on our products, services and any other information relevant to your business relations with ",
                                            vn.name,
                                            ". For website improvement purposes. For the analysis of statistical data which will help us provide you with better products and services in the future.",
                                        ],
                                    }),
                                ],
                            }),
                            (0, f.jsxs)("div", {
                                children: [
                                    (0, f.jsx)("h2", { className: "mt-16 text-2xl font-[600] tracking-tight text-gray-900", children: "4. Cookies" }),
                                    (0, f.jsxs)("p", {
                                        className: "mt-6",
                                        children: [
                                            'Cookies are small text files sent from Web servers that may be stored on your computer. They used to track website visitors. We use cookies and web beacons (also known as action tags or single-pixel gifs), and other technologies (collectively, "cookies") to provide us with data we can use to improve your experience with us and to know you better. Cookies enable us to capture how you arrived at our site, when you return, which pages on our site you visit, and to recognize that you are already logged on when we receive a page request from your browser. We will never share this information with any 3rd party. Cookies are readable only by us and do not contain any personal information nor do they contain account or password information. ',
                                            vn.name,
                                            " may set and access",
                                            " ",
                                            vn.name,
                                            " cookies on your computer, enabling us to learn which advertisements and promotions bring our visitors or prospective clients to our website. ",
                                            vn.name,
                                            "or any of its departments may use cookies in connection with",
                                            vn.name,
                                            " products and services to track your activities on our websites. Such information that we collect and share would be anonymous and not personally identifiable. ",
                                            vn.name,
                                            " may share usage information about visitors to our websites with reputable advertising companies for the purpose of targeting our Internet banner or video advertisements. All web browsers have settings that allow you to block cookies. By visiting our website with your browser set to allow cookies, you consent to our use of cookies as described above. If you choose to block cookies you may use our services but some functions may not work as designed",
                                        ],
                                    }),
                                ],
                            }),
                            (0, f.jsxs)("div", {
                                children: [
                                    (0, f.jsx)("h2", { className: "mt-16 text-2xl font-[600] tracking-tight text-gray-900", children: "5. The Security Of Your Personal Information" }),
                                    (0, f.jsxs)("p", {
                                        className: "mt-6",
                                        children: [
                                            vn.name,
                                            " is committed to safeguarding your Personal Data by adhering to strict security standards and using the most up to date security technologies. When you open an account with us, you are issued a unique account number, User ID and a password. Only a limited number of ",
                                            vn.name,
                                            " employees who have a need to know this information will have access to your account number, User ID, and password. However, please remember that you are ultimately responsible for maintaining the secrecy of your account number, User ID and password. We strongly recommend that you do not disclose this information to anyone. We use proper SSL certificates to authenticate our websites and secure trading and customer-facing applications, allowing you to verify that you are connected to our websites.",
                                        ],
                                    }),
                                ],
                            }),
                            (0, f.jsxs)("div", {
                                children: [
                                    (0, f.jsx)("h2", { className: "mt-16 text-2xl font-[600] tracking-tight text-gray-900", children: "6. Disclosure Of Your Personal Information" }),
                                    (0, f.jsxs)("p", {
                                        className: "mt-6",
                                        children: [
                                            vn.name,
                                            " shall not disclose any of its clients\u2019 confidential information to a third party, except: to extent that it is required to do so pursuant to any applicable laws, rules and/or regulations; if there is a duty to the public to disclose; if our legitimate business interests require disclosure; or at your request or with your consent or to Persons described in this policy.",
                                            " ",
                                            vn.name,
                                            " will endeavor to make such disclosures on a \u2018need-to-know\u2019 basis, unless otherwise instructed by a regulatory authority. Under such circumstances, ",
                                            vn.name,
                                            " will notify the third party regarding the confidential nature of any such information.",
                                        ],
                                    }),
                                ],
                            }),
                            (0, f.jsxs)("div", {
                                children: [
                                    (0, f.jsx)("h2", { className: "mt-16 text-2xl font-[600] tracking-tight text-gray-900", children: "7. Your Privacy Rights" }),
                                    (0, f.jsxs)("p", {
                                        className: "mt-6",
                                        children: [
                                            "You have certain rights in relation to your Personal You have certain rights in relation to your Personal Information. You can access your Personal Information and confirm that it remains correct and up-to-date, request its deletion or choose whether or not you wish to receive material from us or some of our partners by logging into your Client Portal and submitting a ticket accordingly. You are entitled to receive personal information free of charge except in the following circumstances where we may charge a reasonable fee to cover our administrative costs of providing the personal information for: manifestly unfounded or excessive/repeated requests, or further copies of the same information. Alternatively, we may be entitled to refuse to act on the request. Please consider your request responsibly before submitting it. We\u2019ll respond as soon as we can. Generally, within 1 week of time. Please keep in mind that there will be residual information that will remain within our databases, access logs and other records, which may or may not contain your Personal Information. Please also note that certain Personal Information may be exempt from such requests in certain circumstances, which may include if we need to keep processing your Personal Information to comply with a legal obligation.The various rights are not absolute and are subject to certain exceptions or qualifications. In order to exercise any of the rights described below please contact us at ",
                                            vn.email,
                                        ],
                                    }),
                                ],
                            }),
                            (0, f.jsxs)("div", {
                                children: [
                                    (0, f.jsx)("h2", { className: "mt-16 text-2xl font-[600] tracking-tight text-gray-900", children: "8. Legal Disclaimer" }),
                                    (0, f.jsx)("p", {
                                        className: "mt-6",
                                        children:
                                            "We reserve the right to disclose your personal information as required by law and when we believe that disclosure is necessary to protect our rights and/or to comply with a judicial proceeding, court order, or legal process served on our Website. We will not be liable for misuse or loss of personal information resulting from cookies on our website that we don\u2019t have access to or control over. We will not be liable for unlawful or unauthorized use of your personal information due to misuse or misplacement of your passwords, negligent or malicious, however contacted.",
                                    }),
                                ],
                            }),
                            (0, f.jsxs)("div", {
                                children: [
                                    (0, f.jsx)("h2", { className: "mt-16 text-2xl font-[600] tracking-tight text-gray-900", children: "9. Modifications" }),
                                    (0, f.jsxs)("p", {
                                        className: "mt-6",
                                        children: [
                                            vn.name,
                                            " reserves the right to update or modify this Privacy Policy at any time, without notice, by posting such modifications on this web page. Such modifications will be effective upon posting. You are deemed to consent to such modifications by further using the services after such modification.",
                                        ],
                                    }),
                                ],
                            }),
                        ],
                    }),
                });
            }
            var Yi = function () {
                return (0, f.jsxs)("div", { children: [(0, f.jsx)("div", { style: { backgroundColor: "#05080b" }, children: (0, f.jsx)(xn, {}) }), (0, f.jsx)(Qi, {}), (0, f.jsx)(Ro, {})] });
            };
            function Ki() {
                return (0, f.jsx)("div", {
                    className: "bg-white px-6 py-32 lg:px-8",
                    children: (0, f.jsxs)("div", {
                        className: "mx-auto max-w-4xl text-base leading-7 text-gray-700",
                        children: [
                            (0, f.jsx)("h1", { className: "mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl", children: "Our terms of fair usage and service" }),
                            (0, f.jsxs)("p", {
                                className: "mt-6 text-xl leading-8",
                                children: [
                                    "This Agreement is entered into by and these Terms & Conditions (hereinafter referred to as the \u201cAgreement\u201d) shall regulate the relationship between ",
                                    vn.name,
                                    " LTD, (hereinafter referred to as the \u201cCompany\u201d), and the user (a natural or legal entity) (hereinafter referred to as the \u201cClient\u201d) of ",
                                    vn.name,
                                    " ",
                                    "(hereinafter referred as the \u201cWebsite\u201d). The Client confirms that he/she has read, understood and accepted all information, conditions and terms set out on the Website which are open to be reviewed and can be examined by the public and which include important legal Information. By accepting this Agreement, the Client agrees and irrevocably accepts the terms and conditions contained in this Agreement, its annexes and/or appendices as well as other documentation/information published on the Website, including without limitation to the Privacy Policy, Payment Policy, Withdrawal Policy, Code of Conduct, Order Execution Policy and Anti-Money Laundering Policy. The Client accepts this Agreement by registering an Account on the Website and depositing funds. By accepting the Agreement, and subject to the Company\u2019s final approval, the Client enters into a legal and binding agreement with the Company. The terms of this Agreement shall be considered accepted unconditionally by the Client upon the Company\u2019s receipt of an advance payment made by the Client. As soon as the Company receives the Client's advance payment, every operation made by the Client on the Trading Platform shall be subject to the terms of this Agreement and other documentation/information on the Website. The Client hereby acknowledges that each and any Operation, activity, transaction, order and/or communication performed by him/her on the Trading Platform, including without limitation through the Account, and the Website, shall be governed by and/or must be executed in accordance with the terms and conditions of this Agreement and other documentation/information on the Website. By accepting this current agreement, the Client confirms that he/she is able to receive information, including amendments to the present Agreement either via email or through the Website. A client that is a legal entity can register with the Company not through the Website but by sending an email with its request to . All terms and and conditions contained herein, including without limitation to 1 to 5 above, shall at all times be applicable to the Legal Entity and the latter shall conform with such terms and conditions, obligations and rights at all times.",
                                ],
                            }),
                            (0, f.jsxs)("div", {
                                children: [
                                    (0, f.jsx)("h2", { className: "mt-16 text-2xl font-[600] tracking-tight text-gray-900", children: "Terms" }),
                                    (0, f.jsx)("p", {
                                        className: "mt-6",
                                        children:
                                            "Account \u2013 means a unique personified account registered in the name of the Client and which contains all of the Client\u2019s transactions/ operations on the Trading Platform (as defined below) of the Company. Ask - means the higher price in a quote. The price the Client may buy at. Bid - means the lower price in a quote. The price the Client may sell at. CFD (contract for difference) - means a tradeable contract entered into between the Client and the Company, who exchange the difference in the value of an Instrument, as specified on the Trading Platform at the time of opening a Transaction, and the value of that Instrument at the contract\u2019s end. Digital Option Contract - means a type of derivative instrument where the Client earns a payout if they correctly predict the price movement of the underlying asset at the time of the option\u2019s expiry. The prediction can be made as to whether the value of the underlying asset will fall above or below the strike price at time of expiration. Should the option expire at the selected strike price, it will be considered to expire out-of-the money and will result in the loss of the invested amount. Execution - means the execution of Client order(s) by the Company acting as the Client's counterparty as per the terms of the present agreement. Financial Instruments - means the Financial Instruments as per paragraph 2.4 below that are available on the Company\u2019s Trading Platform. KYC documents - means the documents to be provided by the Client, including without limitation to the a copy of the passport or ID and utility bill of the Client, in case it is a natural person and/or certificates showing the management and ownership going all the way up to the ultimate beneficial owner, in case it is a legal entity, and any other documents the Company may request upon its sole discretion Market - means the market on which the Financial Instruments are subject to and/or traded on, whether this market is organized / regulated or not and whether it is in St. Vincent and the Grenadines or abroad. Market Maker - means a company which provides BID and ASK prices for financial instruments. Operations \u2013 means actions performed at the Client\u2019s Account, following an order placed by the Client,, connected with but not limited to crediting of funds, return of funds, opening and closing of trade transactions/positions and/or that relate to financial instruments. Prices - means the prices offered to the Client for each transaction which may be changed without prior notice. Where this is relevant, the \u201cPrices\u201d given through the Trading Platform include the Spread (see definition below). Services \u2013 means the services described in section 3 of this Agreement. Spread - means the difference between the purchase price Ask (rate) and the sale price Bid (rate) at the same moment. For avoidance of doubt, a predefined spread is for the purposes of this Agreement assimilated commission. Trading Platform - means an electronic system on the internet that consists of all programs and technology that present quotes in real-time, allow the placement/modification/deletion of orders and calculate all mutual obligations of the Client and the Company.",
                                    }),
                                ],
                            }),
                            (0, f.jsxs)("div", {
                                children: [
                                    (0, f.jsx)("h2", { className: "mt-16 text-2xl font-[600] tracking-tight text-gray-900", children: "Subject Of The Agreement" }),
                                    (0, f.jsx)("p", {
                                        className: "mt-6",
                                        children:
                                            "The subject of the Agreement shall be the provision of Services to the Client by the Company under the Agreement and through the Trading Platform. The Company shall carry out all transactions as provided in this Agreement on an execution-only basis, neither managing the account nor advising the Client. The Company is entitled to execute transactions requested by the Client as provided in this Agreement even if the transaction is not beneficial for the Client. The Company is under no obligation, unless otherwise agreed in this Agreement and/or other documentation/information on the Website, to monitor or advise the Client on the status of any transaction, to make margin calls, or to close out any of the Client\u2019s open positions. Unless otherwise specifically agreed, the Company is not obligated to make an attempt to execute the Client\u2019s order using quotes more favorable than those offered through the Trading Platform.",
                                    }),
                                ],
                            }),
                            (0, f.jsxs)("div", {
                                children: [
                                    (0, f.jsx)("h2", { className: "mt-16 text-2xl font-[600] tracking-tight text-gray-900", children: "General Provisions" }),
                                    (0, f.jsx)("p", {
                                        className: "mt-6",
                                        children:
                                            "The Company will offer Services to the Client at the absolute discretion of the Company subject to the provisions of this Agreement. The Client is prohibited and shall not, under no circumstances, be allowed to execute any transactions/Operations on the Trading Platform, Website and/or through his/her Account, that would as a result exceed the total balance and/or amount of money deposited/maintained with his/her Account. Such deposited amounts shall be considered to have been provided as collateral, either in the form of a lien or otherwise, to the Company by the Client by which the obligation of the Client to pay any money to the Company is secured.",
                                    }),
                                ],
                            }),
                            (0, f.jsxs)("div", {
                                children: [
                                    (0, f.jsx)("h2", { className: "mt-16 text-2xl font-[600] tracking-tight text-gray-900", children: "Services Of The Company" }),
                                    (0, f.jsx)("p", {
                                        className: "mt-6",
                                        children:
                                            "Services \u2013 services provided by the Company to the Client through the Trading Platform of the Company, including without limitation to customer, analytics, news and marketing information services. The Company shall facilitate the execution of trade activities/orders and/or transactions of the Client but the Client hereby acknowledges and accepts that the Company shall not at any time provide any trust services and/or trading consultation or advisory services to the Client. The Company shall process all transactions/Operations of the Client in accordance with the terms and conditions of this Agreement and on an execution-only basis. The Company shall not manage the Client\u2019s Account nor advise the Client in any way. The Company shall process the orders/transactions requested by the Client under this Agreement irrespective of whether such orders/transactions may result to not being beneficial for the Client. The Company is under no obligation, unless otherwise agreed in this Agreement and/or other documentation/information on the Website, to monitor or advise the Client on the status of any transaction/order, to make margin calls to the Client, or to close out any of the Client\u2019s open positions. Unless otherwise specifically agreed, the Company is not obligated to process or attempt to process the Client\u2019s order/transaction using quotes more favorable than those offered through the Trading Platform. The Company shall not be financially liable for any operations conducted by the Client through the Account and/or on the Trading Platform. Each Client shall be the only authorized user of the Company\u2019s services and of the corresponding Account. The Client is granted an exclusive and non-assignable right to the use of and to access the Account and it is his/her responsibility to ensure that no other third party, including, without limitation, to any next of kin and/or to members of his/her immediate family, shall gain access to and/or trade through the Account assigned to her/him. The Client shall be liable for all orders given through his security information and any orders received in this manner by the Company shall be considered to have been given by the Client. So long as any order is submitted through the Account of a Client, the Company shall reasonably assume that such orders are submitted by Client and the Company shall not be under any obligation to investigate further into the matter. The Company shall not be liable to and/or does not maintain any legal relations with, any third party other than the Client. If the Client acts on behalf of any third party and/or on behalf of any third party\u2019s name, the Company shall not accept this person as a Client and shall not be liable before this person regardless if such person was identified or not. The Client has the right to cancel his order given to the Company within 3 seconds after the moment of giving such order to the Company (hereinafter referred to as the \u201cCancellation\u201d). The client agrees and understands that the three seconds cancellation option offered by the Company is applicable and available for the client as long as the price remains unchanged. Three seconds from the moment of giving the order to the Company by the Client via the platform, the Company may (but is not obliged to) offer to buyout the option from the Client and the Client have the right to agree to such offer (hereinafter referred to as the \u201cBuyout\u201d). The Client is entitled to use such Cancellation or Buyout option subject to the conditions specified on the platform. Such conditions can also include the fee charged by the Company. Such fee is specified on the platform. The Company is obliged to provide all necessary information as to the conditions of Cancellation and Buyout, their cost, etc. The Client acknowledges and agrees that provision of such information on the platform is sufficient. The Client acknowledges and agrees that the use of Cancellation or Buyout is very risky to the Client as long as the cost of Cancellation and/or Buyout depends on the market situation. The Client acknowledges and agrees that he bears all the risks associated with the use of Cancellation and/or Buyout. The Client is entitled to use such Cancellation or Buyout option subject to the conditions specified on the Trading Platform/Website, including without limitation to any fee to be charged by the Company. The Company shall be obliged to provide all necessary information as to the conditions of Cancellation and Buyout, including any applicable costs, etc. The Client acknowledges, accepts and agrees that provision of such information on the Trading Platform is sufficient. The Client acknowledges, accepts and agrees that the use of Cancellation or Buyout option entail large risks for the Client, especially in the case where the costs associated with Cancellation and/or Buyout, depend on the market situation. The Client acknowledges, accepts and agrees that he/she shall bear all risks associated with the use of Cancellation and/or Buyout option. It is understood and agreed by the Client that the Company may from time to time, at its sole discretion, utilize a third party to hold the Client\u2019s funds and/or for the purpose of receiving payment execution services. These funds will be held in segregated accounts from such third party\u2019s own funds and will not affect the rights of the Client to such funds. The Company offers internal live chats where clients can share inter alia their trading ideas and/or express their general thoughts. The client acknowledges and agrees that the Company\u2019s live chat feature is not and will not constitute a valid and/or accurate information and/or information addressed to the clients/potential clients and/or in any way information that is controlled by the Company and/or investment advice, as it is merely a feature allowing clients to inter alia express their thoughts and ideas between themselves. Provision of investment advice shall only be carried out by the Company subject to a separate written agreement with the Client and after assessing the Client\u2019s personal circumstances. Unless such written agreement has been entered into between the Client and the Company, the provision of reports, news, opinions and any other information by the Company to the Client does not constitute investment advice or investment research.",
                                    }),
                                ],
                            }),
                            (0, f.jsxs)("div", {
                                children: [
                                    (0, f.jsx)("h2", { className: "mt-16 text-2xl font-[600] tracking-tight text-gray-900", children: "Execution Of Orders / Electronic Trading" }),
                                    (0, f.jsx)("p", {
                                        className: "mt-6",
                                        children:
                                            "By accepting this Agreement, the Client accepts that he has read and understood all provisions of this Agreement and related information on the Website. The Client accepts and understands that all orders received shall be executed by the Company as the counterparty of the transaction in its capacity of Market Maker. The Company shall act as a principal and not as an agent on the Client\u2019s behalf for the purpose of the Execution of orders. The Client is informed that Conflicts of Interest may arise because of this model. Reception of the order by the Company shall not constitute acceptance and acceptance shall only be constituted by the execution of the order by the Company. The Company shall be obliged to execute the Client's orders sequentially and promptly. The Client acknowledges and accepts a) the risk of mistakes or misinterpretations in the orders sent through the Trading Platform due to technical or mechanical failures of such electronic means, b) the risk of any delays or other problems as well as c) the risk that the orders may be placed by persons unauthorised to use and/or access the Account, and the Client agrees to indemnify the Company in full for any loss incurred as a result of acting in accordance with such orders. The Client accepts that during the reception and transmission of his/her order, the Company shall have no responsibility as to its content and/or to the identity of the person placing the order, except where there is gross negligence, willful default or fraud by the Company. The Client acknowledges that the Company will not take action based on the orders transmitted to the Company for execution by electronic means other than those orders transmitted using the predetermined electronic means such as the Trading Platform, and the Company shall have no liability towards the Client for failing to take action based on such orders. The client acknowledges and agrees that any products or services that may be offered by the Company may not always be available for purchasing or use for trading purposes, and it is in the Company's absolute discretion whether it will make these products available or not to the clients at any time. The Company shall bear no liability, monetary or otherwise, in relation to this section, including without limitation to not making available any product at any given time.",
                                    }),
                                ],
                            }),
                            (0, f.jsxs)("div", {
                                children: [
                                    (0, f.jsx)("h2", { className: "mt-16 text-2xl font-[600] tracking-tight text-gray-900", children: "Limitation Of Liability" }),
                                    (0, f.jsx)("p", {
                                        className: "mt-6",
                                        children:
                                            "The Company does not guarantee uninterrupted service, safe and errors-free, and immunity from unauthorized access to the trading sites' servers nor disruptions caused from damages, malfunctions or failures in hardware, software, communications and systems in the Client's computers and in the Company's suppliers. Supplying services by the Company depends, inter alia, on third parties and the Company bears no responsibility for any actions or omissions of third parties and bears no responsibility for any damage and/or loss and/or expense caused to the Client and/or third party as a result of and/or in relation to any aforesaid action or omission. The Company will bear no responsibility for any damage of any kind allegedly caused to the Client, which involves force majeure or any such event that the Company has no control of and which has influenced the accessibility of its trading site. Under no circumstances will the Company or its Agent(s) hold responsibility for direct or indirect damage of any kind, even if the Company or its Agent(s) had been notified of the possibility of aforesaid damages.",
                                    }),
                                ],
                            }),
                            (0, f.jsxs)("div", {
                                children: [
                                    (0, f.jsx)("h2", { className: "mt-16 text-2xl font-[600] tracking-tight text-gray-900", children: "Settlement Of Transactions" }),
                                    (0, f.jsx)("p", {
                                        className: "mt-6",
                                        children:
                                            "The Company shall proceed to a settlement of all transactions upon execution of such transactions. An online statement of Account will be available for printing to the Client on the Trading Platform of the Company, at all times.",
                                    }),
                                ],
                            }),
                            (0, f.jsxs)("div", {
                                children: [
                                    (0, f.jsx)("h2", { className: "mt-16 text-2xl font-[600] tracking-tight text-gray-900", children: "Indemnity And Liability" }),
                                    (0, f.jsx)("p", {
                                        className: "mt-6",
                                        children:
                                            "The Client shall indemnify and keep indemnified the Company and its directors, officers, employees or representatives against all direct or indirect liabilities (including without limitation all losses, damages, claims, costs or expenses), incurred by the Company or any other third party in respect to any act or omission by the Client in the performance of his/her obligations under this Agreement and/or the liquidation of any financial instruments of the Client in settlement of any claims with the Company, unless such liabilities result from gross negligence, willful default or fraud by the Company. This indemnity shall survive termination of this Agreement. The Company shall not be liable for any direct and/or indirect loss, expense, cost or liability incurred by the Client in relation to this Agreement, unless such loss, expense, cost or liability is a result of gross negligence, willful default or fraud by the Company. Notwithstanding the provisions of section 8.1 above, the Company shall have no liability to the Client whether in tort (including negligence), breach of statutory duty, or otherwise, for any loss of profit, or for any indirect or consequential loss arising under and/or in connection with the Agreement. The Company shall not be liable for any loss of opportunity as a result of which the value of the financial instruments of the Client could have been increased or for any decrease in the value of the financial instruments of the Client, regardless of the cause, unless such loss is directly due to gross negligence, willful default or fraud on the part of the Company. The Company shall not be liable for any loss which is the result of misrepresentation of facts, error in judgment or any act done or which the Company has omitted to do, whenever caused, unless such act or omission resulted from gross negligence, willful default or fraud by the Company. The Company shall not be liable for any act or omission or for the insolvency of any counterparty, bank, custodian or other third party which acts on behalf of the Client or with or through whom transactions on behalf of the Client are carried out.",
                                    }),
                                ],
                            }),
                            (0, f.jsxs)("div", {
                                children: [
                                    (0, f.jsx)("h2", { className: "mt-16 text-2xl font-[600] tracking-tight text-gray-900", children: "Personal Data" }),
                                    (0, f.jsx)("p", {
                                        className: "mt-6",
                                        children:
                                            "By accepting the terms and conditions of this Agreement, the Client irrevocably consents to the collection and processing of his/her personal data/information by the Company without the use of automatic controls, as the same are provided by him/her to the Company. The term personal data for the purposes of this Agreement shall mean: the Name, Surname, Patronymic, gender, address, phone number, e-mail, IP address of the Client, Cookies and information that relate to the provision of Services to the Client (for example, the Client\u2019s trading story). The Client shall be obliged to provide correct, accurate and complete personal data/information as requested by the Company. The purpose of collecting and processing the personal data is to comply with applicable regulating legislation requirements, including without limitation to anti-money laundering regulations, as well as for any and all purposes in relation to this Agreement, including without limitation to enable the Company to discharge its obligations towards the Client. The Client acknowledges and consents to that, for the purposes described at the section directly above, the Company shall be entitled to collect, record, systematize, accumulate, store, adjust (update, change), extract, use, transfer (disseminate, provide, access), anonymize, block, delete, destroy such personal data and/or perform any other actions according to the current regulating legislation. The Client acknowledges and consents to the Company storing, maintaining and processing his/her personal data in the manner as described in this Agreement during the term of the Agreement and for 5 years following any termination of the Agreement. The Client hereby acknowledges, accepts, agrees and consents to the disclosure of personal data by the Company to third parties and their representatives, solely for the purposes of the Agreement, including without limitation in order to facilitate processing/execution of the Client\u2019s orders/Operations, provided that at all times (i) the amount of personal data to be disclosed to any such third party is proportionate and/or limited solely to facilitate to the actions as described above, and (ii) the Company shall ensure that such third party shall treat the personal data in accordance with applicable laws and regulations. The Company shall not be entitled to make available the personal data in public and/or disclose such personal data for any other purposes, subject to disclosure required under applicable laws and regulations. During processing of the personal data, the Company shall take necessary legal, organizational and technical measures to protect such personal data from unauthorized or accidental access, destruction, change, blocking, copying, provision, and dissemination as well as from any other illegal actions.",
                                    }),
                                ],
                            }),
                            (0, f.jsxs)("div", {
                                children: [
                                    (0, f.jsx)("h2", { className: "mt-16 text-2xl font-[600] tracking-tight text-gray-900", children: "Assignment" }),
                                    (0, f.jsx)("p", {
                                        className: "mt-6",
                                        children:
                                            "The Agreement shall be personal to the Client and the Client shall not be entitled to assign or transfer any of his/her rights or obligations under this Agreement. The Company may at any time assign or transfer any of its rights or obligations under this Agreement to a third party. The Company shall notify the Client of any such assignment.",
                                    }),
                                ],
                            }),
                            (0, f.jsxs)("div", {
                                children: [
                                    (0, f.jsx)("h2", { className: "mt-16 text-2xl font-[600] tracking-tight text-gray-900", children: "Assignment" }),
                                    (0, f.jsxs)("p", {
                                        className: "mt-6",
                                        children: [
                                            "The Client hereby confirms to have read, understood and hereby accepts the risk statement relating to the use of Services on the Website, as the same is available electronically via the Website.",
                                            (0, f.jsx)("br", {}),
                                            (0, f.jsx)("br", {}),
                                            "The Client hereby confirms to have read, understood and hereby accepts the risk statement relating to the use of Services on the Website, as the same is available electronically via the Website.",
                                        ],
                                    }),
                                ],
                            }),
                            (0, f.jsxs)("div", {
                                children: [
                                    (0, f.jsx)("h2", { className: "mt-16 text-2xl font-[600] tracking-tight text-gray-900", children: "Charges And Fees" }),
                                    (0, f.jsx)("p", {
                                        className: "mt-6",
                                        children:
                                            "The Company shall be entitled to receive a fee from the Client regarding the Service(s), provided by the Company. The Company may pay fee/commission to business introducers, referring agents, or other third parties based on written agreement. This fee/commission is related to the frequency/volume of transactions and/or other parameters. The Company may pay fee/commission to business introducers, referring agents, or other third parties based on written agreement. This fee/commission is related to the frequency/volume of transactions and/or other parameters. All applicable fees or charges can be found on the Company\u2019s Website (General Fees). The Company has the right to amend its fees and charges from time to time. Ongoing trading fees, including inter alia swaps, shall be charged and deducted from the Client\u2019s account balance. In case the Client does not maintain enough funds in his/her balance, the relevant position subject to swap will be closed by the Company. The Client agrees that any amounts sent by the Client will be deposited to the Account at the value on the date of the payment received and net of any charges / fees charged by the bank or any other intermediary involved in such transaction process and/or in any other case, the Client shall authorize the Company to withdraw the fee by way of transfer from the Client\u2019s Account.",
                                    }),
                                ],
                            }),
                            (0, f.jsxs)("div", {
                                children: [
                                    (0, f.jsx)("h2", { className: "mt-16 text-2xl font-[600] tracking-tight text-gray-900", children: "Duration And Termination Of The Agreement" }),
                                    (0, f.jsx)("p", {
                                        className: "mt-6",
                                        children:
                                            "The Agreement herein shall be concluded for an indefinite term. The Agreement herein shall come into force when the Client accepts the Agreement and makes an advance payment to the Company. In case of any discrepancies between the text of the Agreement in English and its translation in any other language, the text of the Agreement in English as a whole shall prevail, as well as the English version/text of any other documentation/information published on the Website. The Company shall be entitled to terminate this Agreement immediately without giving prior notice if the Client fails to provide to the Company his/her KYC documents within 14 days from the moment of acceptance of this Agreement, constituting, thus, his/her Account as an unverified Account. In case of termination of this Agreement for a reason indicated in section 15.b, subclauses i, ii and x of this Agreement the Company shall have no liability towards the Client and no obligation to pay the profit of the Client (if any). In case of termination of this Agreement for a reason indicated in sections 15.a of this Agreement, the Company shall have either to wire to the Client the remaining balance or to give to the Client the opportunity to withdraw his/her remaining balance. In case of termination of this Agreement for a reason indicated in section 16.b of this Agreement, the Company shall have to wire to the Client the remaining balance excluding any profit.",
                                    }),
                                ],
                            }),
                            (0, f.jsxs)("div", {
                                children: [
                                    (0, f.jsx)("h2", { className: "mt-16 text-2xl font-[600] tracking-tight text-gray-900", children: "Terms And Conditions" }),
                                    (0, f.jsx)("p", {
                                        className: "mt-6",
                                        children:
                                            "The Client shall agree to make a deposit to his/her Account to use the Company Services or any other additional services ordered by the Client on the Website as well as all additional expenses (if necessary), including but not limited to any taxes, duties, etc. The Client shall be completely responsible for timely depositing the funds into his/her Account. Provider of payment services shall ensure only fulfillment of payment in the amount defined by the Site and shall not be liable for payment of the above-mentioned additional amounts by the Website\u2019s Client. The payment is considered to be processed and cannot be returned after clicking the \u201cPayment\u201d button. By clicking the \u201cPayment\u201d button, the Client shall agree that he/she cannot return the payment or require its recall. Additionally, by accepting the terms and conditions herein contained , the Client as the owner of the payment card confirms that he/she shall be entitled to use the Services offered on the Website. By accepting the terms and conditions of this Agreement and depositing funds to the Account, the Client agrees to the use the Website\u2019s Services and accepts that the processing of any of the Client\u2019s payment shall be executed by a provider of payment services, being a third party to this Agreement (the \u201cProvider\u201d), and the Client further acknowledges and accepts that no legal right exists for return of already purchased Services or other options of payment cancellation. In case if the Client is willing to refuse from using the 1-Click service for the next purchase of the Service, the Client can refuse from 1-Click service using the Account on the Website. Note that 1-click deposits (recurring payments) are not processed as 3-D secure transactions, the client needs to enable 3-D secure function if he would like the payments to be processed as 3-D secure, as it's vital information in regards to BTC withdrawal policy. The Provider shall not be in any case liable for the refusal/impossibility to process the data connected with payment card of the Client, or for the refusal connected with failure to obtain permission from the issue bank to process payment using the payment card of the Client. The Provider shall not be in any case liable for quality, amount, and price of any service, offered to the Client or purchased by the Client of the Website using the payment card of the Client. Paying for any Services of the Website the Client first of all shall be obliged to fulfill the rules of using the Website. We are asking to consider that only the Client as the owner of the payment card shall be liable for timely payment of any service ordered via the Website and for all additional expenses/fees connected with this payment. The Provider shall only be the performer of payment in the amount specified by the Website and shall not be in any case liable for any pricing, general prices and/or total sums. In case of the situation connected with the Client\u2019s dissent with the terms mentioned above and/or any other reasons, we are asking the Client to promptly refuse from making a payment and to directly address the administrator/support of the Website if necessary.",
                                    }),
                                ],
                            }),
                            (0, f.jsxs)("div", {
                                children: [
                                    (0, f.jsx)("h2", { className: "mt-16 text-2xl font-[600] tracking-tight text-gray-900", children: "The Client\u2019s Responsibility" }),
                                    (0, f.jsx)("p", {
                                        className: "mt-6",
                                        children:
                                            "The Client acknowledges that these General Terms are an integral part of this Agreement. It is the Client's responsibility to verify that all transactions and Service(s) received are not contradictory to any applicable law and to undertake any other legal duty emanating from the use of Website at the Client\u2019s sole option, discretion and risk, and the Client is solely responsible for ascertaining whether it is legal in the Client's jurisdiction and/or place of residence. The Client holds sole liability for all transactions in his Trading Account, including all cards transactions or other means of deposit and withdrawal transactions (as stated below). The Client acknowledges that the Company reserves the right to accept or decline any deposit and/or funding and/or withdrawal request by the Client depending on the payment method that the Client chooses (which includes but is not limited to the third party financial institution from which the Client wishes to deposit/withdraw funds with the Company (Third Party Institutions)), and the Company may suggest to the Client an alternative for its request. It is important to note that the Company does not have and cannot in any way have any, control over such Third Party Institutions and any transactions made by the Client through the Platform using such institutions and it is hereby acknowledged and agreed that the Company shall bear no liability, monetary or otherwise, in relation to any loss of funds incurred by the Client pursuant to any actions or omissions of Third Party Institutions. The Client is responsible for securing his/her Username and Password for his Trading Account. The Client holds sole responsibility for any damage caused due to any act or omission of the Client causing inappropriate or irregular use of the Client Trading Account. It is clearly stated and agreed by the Client that the Client bears sole responsibility for any decision made and/or to be made by the Client relying on the content of the Website and no claim and/or suit of any kind will arise to that effect against the Company and/or its directors and/or employees and/or functionaries and/or Agents (the Company and/or its Agents). The Company and/or its Agents will hold no responsibility for loss of profits due to and/or related to the Website, Transactions carried out by the Client, Services and the General Terms of use or any other damages, including special damages and/or indirect damages or circumstantial damages caused, except in the event of malicious acts made by the Company. Without limitation of the aforesaid and only in the event of definitive judgment by court or other authorized legal institution resolving that the Company and/or its Agent(s) hold liability towards the Client or third party, the Company's liability, in any event, will be limited to the amount of money deposited and/or transferred by the Client to the Trading Account in respect of the transaction which caused the liability of the Company and/or its Agent(s) (if such was caused). No Trading Account will be approved without the completion of the Company\u2019s compliance procedures, including the identification and verification of the Account.",
                                    }),
                                ],
                            }),
                        ],
                    }),
                });
            }
            var Zi = function () {
                return (0, f.jsxs)("div", { children: [(0, f.jsx)("div", { style: { backgroundColor: "#05080b" }, children: (0, f.jsx)(xn, {}) }), (0, f.jsx)(Ki, {}), (0, f.jsx)(Ro, {})] });
            };
            function Xi() {
                return (0, f.jsx)(f.Fragment, {
                    children: (0, f.jsx)("main", {
                        className: "grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8",
                        children: (0, f.jsxs)("div", {
                            className: "text-center",
                            children: [
                                (0, f.jsx)("p", { className: "text-base font-semibold text-[#0C6CF2]", children: "404" }),
                                (0, f.jsx)("h1", { className: "mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl", children: "Page not found" }),
                                (0, f.jsx)("p", { className: "mt-6 text-base leading-7 text-gray-600", children: "Sorry, we couldn\u2019t find the page you\u2019re looking for." }),
                                (0, f.jsx)("div", {
                                    className: "mt-10 flex items-center justify-center gap-x-6",
                                    children: (0, f.jsx)("a", {
                                        href: "/",
                                        className:
                                            "rounded-full bg-[#0C6CF2] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
                                        children: "Go back home",
                                    }),
                                }),
                            ],
                        }),
                    }),
                });
            }
            var Ji = function () {
                return (0, f.jsxs)("div", { children: [(0, f.jsx)("div", { style: { backgroundColor: "#05080b" }, children: (0, f.jsx)(xn, {}) }), (0, f.jsx)(Xi, {}), (0, f.jsx)(Ro, {})] });
            };
            function el() {
                return (0, f.jsx)("div", {
                    className: "bg-white px-6 py-32 lg:px-8",
                    children: (0, f.jsxs)("div", {
                        className: "mx-auto max-w-4xl text-base leading-7 text-gray-700",
                        children: [
                            (0, f.jsx)("h1", { className: "mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl", children: "Legal" }),
                            (0, f.jsx)("span", {
                                children: (0, f.jsxs)("ul", {
                                    children: [
                                        (0, f.jsx)("li", { style: { color: "#0c6cf2", textDecoration: "underline" }, children: (0, f.jsx)("a", { href: "/terms", children: "Terms and Conditions" }) }),
                                        (0, f.jsx)("li", { style: { color: "#0c6cf2", textDecoration: "underline" }, children: (0, f.jsx)("a", { href: "/privacy", children: "Privacy Policy" }) }),
                                    ],
                                }),
                            }),
                            (0, f.jsxs)("p", {
                                className: "mt-6 text-xl leading-8",
                                children: [
                                    "Brand and Relationship Management Announcement",
                                    (0, f.jsx)("br", {}),
                                    (0, f.jsx)("br", {}),
                                    "Defamation and Disinformation",
                                    (0, f.jsx)("br", {}),
                                    (0, f.jsx)("br", {}),
                                    "The spread of Defamation or Disinformation of the platforms, brands, products and services, as well as those of all Affiliated platforms and providers, is a legal offense.",
                                    (0, f.jsx)("br", {}),
                                    (0, f.jsx)("br", {}),
                                    "Due to current ongoing legal action against a group of criminals, and the platforms they use for their criminality, our legal team, along with the Brand and Relationship Management team, have issued instructions to suspends the accounts of the small number of offending members who are working with the criminals to further their cause.",
                                    (0, f.jsx)("br", {}),
                                    (0, f.jsx)("br", {}),
                                    "Whoever is found to be spreading this illegal content, will also be considered accessories, and their details handed over to the legal team handling these cases.",
                                    (0, f.jsx)("br", {}),
                                    (0, f.jsx)("br", {}),
                                    "The criminals are using the BehindMLM platform, as well as smaller platforms to hide their identities.",
                                    (0, f.jsx)("br", {}),
                                    (0, f.jsx)("br", {}),
                                    "Our legal team is communicating directly with Google to uncover these criminals.",
                                    (0, f.jsx)("br", {}),
                                    (0, f.jsx)("br", {}),
                                    "If you are the recipient of any articles or videos causing Defamation or Disinformation, please screenshot the offending material and send it directly to the legal team.",
                                    (0, f.jsx)("br", {}),
                                    (0, f.jsx)("br", {}),
                                    "We will NOT tolerate criminals or acts of abuse against our brand, associated brands, products or services.",
                                ],
                            }),
                        ],
                    }),
                });
            }
            var tl = function () {
                return (0, f.jsxs)("div", { children: [(0, f.jsx)("div", { style: { backgroundColor: "#05080b" }, children: (0, f.jsx)(xn, {}) }), (0, f.jsx)(el, {}), (0, f.jsx)(Ro, {})] });
            };
            var nl = function () {
                var e = (function (e, t) {
                    return Hr({
                        basename: null == t ? void 0 : t.basename,
                        future: uo({}, null == t ? void 0 : t.future, { v7_prependBasename: !0 }),
                        history:
                            ((n = { window: null == t ? void 0 : t.window }),
                                void 0 === n && (n = {}),
                                or(
                                    function (e, t) {
                                        var n = e.location;
                                        return nr("", { pathname: n.pathname, search: n.search, hash: n.hash }, (t.state && t.state.usr) || null, (t.state && t.state.key) || "default");
                                    },
                                    function (e, t) {
                                        return "string" === typeof t ? t : rr(t);
                                    },
                                    null,
                                    n
                                )),
                        hydrationData: (null == t ? void 0 : t.hydrationData) || ho(),
                        routes: e,
                        mapRouteProperties: so,
                    }).initialize();
                    var n;
                })([
                    { path: "/", element: (0, f.jsx)(Vo, {}) },
                    { path: "/about", element: (0, f.jsx)(Go, {}) },
                    { path: "/faq", element: (0, f.jsx)(Xo, {}) },
                    { path: "/stocks", element: (0, f.jsx)(Oi, {}) },
                    { path: "/crypto", element: (0, f.jsx)(Mi, {}) },
                    { path: "/forex", element: (0, f.jsx)(qi, {}) },
                    { path: "/why-us", element: (0, f.jsx)(Gi, {}) },
                    { path: "/privacy", element: (0, f.jsx)(Yi, {}) },
                    { path: "/legal", element: (0, f.jsx)(tl, {}) },
                    { path: "/terms", element: (0, f.jsx)(Zi, {}) },
                    { path: "*", element: (0, f.jsx)(Ji, {}) },
                ]);
                return (0, f.jsx)(f.Fragment, { children: (0, f.jsx)(ao, { router: e }) });
            },
                rl = function (e) {
                    e &&
                        e instanceof Function &&
                        n
                            .e(787)
                            .then(n.bind(n, 787))
                            .then(function (t) {
                                var n = t.getCLS,
                                    r = t.getFID,
                                    a = t.getFCP,
                                    o = t.getLCP,
                                    i = t.getTTFB;
                                n(e), r(e), a(e), o(e), i(e);
                            });
                };
            r.createRoot(document.getElementById("root")).render((0, f.jsx)(e.StrictMode, { children: (0, f.jsx)(nl, {}) })), rl();
        })();
})();
//# sourceMappingURL=main.d2bd7f82.js.map
