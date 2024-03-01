'use strict'; (function (X, K) { "object" === typeof module && module.exports ? (K["default"] = K, module.exports = X.document ? K(X) : K) : "function" === typeof define && define.amd ? define("highcharts/highmaps", function () { return K(X) }) : (X.Highcharts && X.Highcharts.error(16, !0), X.Highcharts = K(X)) })("undefined" !== typeof window ? window : this, function (X) {
    function K(a, x, G, I) { a.hasOwnProperty(x) || (a[x] = I.apply(null, G), "function" === typeof CustomEvent && X.dispatchEvent(new CustomEvent("HighchartsModuleLoaded", { detail: { path: x, module: a[x] } }))) }
    var a = {}; K(a, "Core/Globals.js", [], function () {
        var a; (function (a) {
            a.SVG_NS = "http://www.w3.org/2000/svg"; a.product = "Highcharts"; a.version = "11.1.0"; a.win = "undefined" !== typeof X ? X : {}; a.doc = a.win.document; a.svg = a.doc && a.doc.createElementNS && !!a.doc.createElementNS(a.SVG_NS, "svg").createSVGRect; a.userAgent = a.win.navigator && a.win.navigator.userAgent || ""; a.isChrome = -1 !== a.userAgent.indexOf("Chrome"); a.isFirefox = -1 !== a.userAgent.indexOf("Firefox"); a.isMS = /(edge|msie|trident)/i.test(a.userAgent) && !a.win.opera;
            a.isSafari = !a.isChrome && -1 !== a.userAgent.indexOf("Safari"); a.isTouchDevice = /(Mobile|Android|Windows Phone)/.test(a.userAgent); a.isWebKit = -1 !== a.userAgent.indexOf("AppleWebKit"); a.deg2rad = 2 * Math.PI / 360; a.hasBidiBug = a.isFirefox && 4 > parseInt(a.userAgent.split("Firefox/")[1], 10); a.hasTouch = !!a.win.TouchEvent; a.marginNames = ["plotTop", "marginRight", "marginBottom", "plotLeft"]; a.noop = function () { }; a.supportsPassiveEvents = function () {
                let r = !1; if (!a.isMS) {
                    const x = Object.defineProperty({}, "passive", {
                        get: function () {
                            r =
                            !0
                        }
                    }); a.win.addEventListener && a.win.removeEventListener && (a.win.addEventListener("testPassive", a.noop, x), a.win.removeEventListener("testPassive", a.noop, x))
                } return r
            }(); a.charts = []; a.dateFormats = {}; a.seriesTypes = {}; a.symbolSizes = {}; a.chartCount = 0
        })(a || (a = {})); ""; return a
    }); K(a, "Core/Utilities.js", [a["Core/Globals.js"]], function (a) {
        function r(m, b, d, c) {
            const w = b ? "Highcharts error" : "Highcharts warning"; 32 === m && (m = `${w}: Deprecated member`); const g = t(m); let l = g ? `${w} #${m}: www.highcharts.com/errors/${m}/` :
                m.toString(); if ("undefined" !== typeof c) { let m = ""; g && (l += "?"); C(c, function (b, d) { m += `\n - ${d}: ${b}`; g && (l += encodeURI(d) + "=" + encodeURI(b)) }); l += m } e(a, "displayError", { chart: d, code: m, message: l, params: c }, function () { if (b) throw Error(l); z.console && -1 === r.messages.indexOf(l) && console.warn(l) }); r.messages.push(l)
        } function G(m, b) { return parseInt(m, b || 10) } function I(m) { return "string" === typeof m } function y(m) { m = Object.prototype.toString.call(m); return "[object Array]" === m || "[object Array Iterator]" === m } function A(m,
            b) { return !!m && "object" === typeof m && (!b || !y(m)) } function F(m) { return A(m) && "number" === typeof m.nodeType } function D(m) { const b = m && m.constructor; return !(!A(m, !0) || F(m) || !b || !b.name || "Object" === b.name) } function t(m) { return "number" === typeof m && !isNaN(m) && Infinity > m && -Infinity < m } function q(m) { return "undefined" !== typeof m && null !== m } function k(m, b, d) {
                const e = I(b) && !q(d); let w; const c = (b, d) => { q(b) ? m.setAttribute(d, b) : e ? (w = m.getAttribute(d)) || "class" !== d || (w = m.getAttribute(d + "Name")) : m.removeAttribute(d) };
                I(b) ? c(d, b) : C(b, c); return w
            } function p(m) { return y(m) ? m : [m] } function n(m, b) { let d; m || (m = {}); for (d in b) m[d] = b[d]; return m } function h() { const m = arguments, b = m.length; for (let d = 0; d < b; d++) { const b = m[d]; if ("undefined" !== typeof b && null !== b) return b } } function f(m, b) { a.isMS && !a.svg && b && q(b.opacity) && (b.filter = `alpha(opacity=${100 * b.opacity})`); n(m.style, b) } function c(m) { return Math.pow(10, Math.floor(Math.log(m) / Math.LN10)) } function g(m, b) { return 1E14 < m ? m : parseFloat(m.toPrecision(b || 14)) } function B(m, b, d) {
                let e;
                if ("width" === b) return b = Math.min(m.offsetWidth, m.scrollWidth), d = m.getBoundingClientRect && m.getBoundingClientRect().width, d < b && d >= b - 1 && (b = Math.floor(d)), Math.max(0, b - (B(m, "padding-left", !0) || 0) - (B(m, "padding-right", !0) || 0)); if ("height" === b) return Math.max(0, Math.min(m.offsetHeight, m.scrollHeight) - (B(m, "padding-top", !0) || 0) - (B(m, "padding-bottom", !0) || 0)); if (m = z.getComputedStyle(m, void 0)) e = m.getPropertyValue(b), h(d, "opacity" !== b) && (e = G(e)); return e
            } function C(b, d, e) {
                for (const m in b) Object.hasOwnProperty.call(b,
                    m) && d.call(e || b[m], b[m], m, b)
            } function E(b, d, e) { function m(m, d) { const e = b.removeEventListener; e && e.call(b, m, d, !1) } function c(e) { let w, c; b.nodeName && (d ? (w = {}, w[d] = !0) : w = e, C(w, function (b, d) { if (e[d]) for (c = e[d].length; c--;)m(d, e[d][c].fn) })) } var w = "function" === typeof b && b.prototype || b; if (Object.hasOwnProperty.call(w, "hcEvents")) { const b = w.hcEvents; d ? (w = b[d] || [], e ? (b[d] = w.filter(function (b) { return e !== b.fn }), m(d, e)) : (c(b), b[d] = [])) : (c(b), delete w.hcEvents) } } function e(b, d, e, c) {
                e = e || {}; if (v.createEvent &&
                    (b.dispatchEvent || b.fireEvent && b !== a)) { var m = v.createEvent("Events"); m.initEvent(d, !0, !0); e = n(m, e); b.dispatchEvent ? b.dispatchEvent(e) : b.fireEvent(d, e) } else if (b.hcEvents) { e.target || n(e, { preventDefault: function () { e.defaultPrevented = !0 }, target: b, type: d }); m = []; let c = b, w = !1; for (; c.hcEvents;)Object.hasOwnProperty.call(c, "hcEvents") && c.hcEvents[d] && (m.length && (w = !0), m.unshift.apply(m, c.hcEvents[d])), c = Object.getPrototypeOf(c); w && m.sort((b, m) => b.order - m.order); m.forEach(m => { !1 === m.fn.call(b, e) && e.preventDefault() }) } c &&
                        !e.defaultPrevented && c.call(b, e)
            } const { charts: l, doc: v, win: z } = a; (r || (r = {})).messages = []; Math.easeInOutSine = function (b) { return -.5 * (Math.cos(Math.PI * b) - 1) }; var u = Array.prototype.find ? function (b, d) { return b.find(d) } : function (b, d) { let m; const e = b.length; for (m = 0; m < e; m++)if (d(b[m], m)) return b[m] }; C({ map: "map", each: "forEach", grep: "filter", reduce: "reduce", some: "some" }, function (b, d) {
                a[d] = function (m) {
                    r(32, !1, void 0, { [`Highcharts.${d}`]: `use Array.${b}` }); return Array.prototype[b].apply(m, [].slice.call(arguments,
                        1))
                }
            }); let b; const d = function () { const m = Math.random().toString(36).substring(2, 9) + "-"; let d = 0; return function () { return "highcharts-" + (b ? "" : m) + d++ } }(); z.jQuery && (z.jQuery.fn.highcharts = function () { const b = [].slice.call(arguments); if (this[0]) return b[0] ? (new (a[I(b[0]) ? b.shift() : "Chart"])(this[0], b[0], b[1]), this) : l[k(this[0], "data-highcharts-chart")] }); u = {
                addEvent: function (b, d, e, c = {}) {
                    var m = "function" === typeof b && b.prototype || b; Object.hasOwnProperty.call(m, "hcEvents") || (m.hcEvents = {}); m = m.hcEvents; a.Point &&
                        b instanceof a.Point && b.series && b.series.chart && (b.series.chart.runTrackerClick = !0); const l = b.addEventListener; l && l.call(b, d, e, a.supportsPassiveEvents ? { passive: void 0 === c.passive ? -1 !== d.indexOf("touch") : c.passive, capture: !1 } : !1); m[d] || (m[d] = []); m[d].push({ fn: e, order: "number" === typeof c.order ? c.order : Infinity }); m[d].sort((b, m) => b.order - m.order); return function () { E(b, d, e) }
                }, arrayMax: function (b) { let m = b.length, d = b[0]; for (; m--;)b[m] > d && (d = b[m]); return d }, arrayMin: function (b) {
                    let m = b.length, d = b[0]; for (; m--;)b[m] <
                        d && (d = b[m]); return d
                }, attr: k, clamp: function (b, d, e) { return b > d ? b < e ? b : e : d }, clearTimeout: function (b) { q(b) && clearTimeout(b) }, correctFloat: g, createElement: function (b, d, e, c, l) { b = v.createElement(b); d && n(b, d); l && f(b, { padding: "0", border: "none", margin: "0" }); e && f(b, e); c && c.appendChild(b); return b }, css: f, defined: q, destroyObjectProperties: function (b, d) { C(b, function (m, e) { m && m !== d && m.destroy && m.destroy(); delete b[e] }) }, diffObjects: function (b, d, e, c) {
                    function m(b, d, l, g) {
                        const J = e ? d : b; C(b, function (e, w) {
                            if (!g && c && -1 <
                                c.indexOf(w) && d[w]) { e = p(e); l[w] = []; for (let b = 0; b < Math.max(e.length, d[w].length); b++)d[w][b] && (void 0 === e[b] ? l[w][b] = d[w][b] : (l[w][b] = {}, m(e[b], d[w][b], l[w][b], g + 1))) } else if (A(e, !0) && !e.nodeType) l[w] = y(e) ? [] : {}, m(e, d[w] || {}, l[w], g + 1), 0 !== Object.keys(l[w]).length || "colorAxis" === w && 0 === g || delete l[w]; else if (b[w] !== d[w] || w in b && !(w in d)) l[w] = J[w]
                        })
                    } const l = {}; m(b, d, l, 0); return l
                }, discardElement: function (b) { b && b.parentElement && b.parentElement.removeChild(b) }, erase: function (b, d) {
                    let m = b.length; for (; m--;)if (b[m] ===
                        d) { b.splice(m, 1); break }
                }, error: r, extend: n, extendClass: function (b, d) { const m = function () { }; m.prototype = new b; n(m.prototype, d); return m }, find: u, fireEvent: e, getClosestDistance: function (b, d) { const m = !d; let e, c, l, g; b.forEach(b => { if (1 < b.length) for (g = c = b.length - 1; 0 < g; g--)l = b[g] - b[g - 1], 0 > l && !m ? (null === d || void 0 === d ? void 0 : d(), d = void 0) : l && ("undefined" === typeof e || l < e) && (e = l) }); return e }, getMagnitude: c, getNestedProperty: function (b, d) {
                    for (b = b.split("."); b.length && q(d);) {
                        const m = b.shift(); if ("undefined" === typeof m ||
                            "__proto__" === m) return; if ("this" === m) { let b; A(d) && (b = d["@this"]); return null !== b && void 0 !== b ? b : d } d = d[m]; if (!q(d) || "function" === typeof d || "number" === typeof d.nodeType || d === z) return
                    } return d
                }, getStyle: B, inArray: function (b, d, e) { r(32, !1, void 0, { "Highcharts.inArray": "use Array.indexOf" }); return d.indexOf(b, e) }, insertItem: function (b, d) {
                    const m = b.options.index, e = d.length; let c; for (c = b.options.isInternal ? e : 0; c < e + 1; c++)if (!d[c] || t(m) && m < h(d[c].options.index, d[c]._i) || d[c].options.isInternal) {
                        d.splice(c, 0,
                            b); break
                    } return c
                }, isArray: y, isClass: D, isDOMElement: F, isFunction: function (b) { return "function" === typeof b }, isNumber: t, isObject: A, isString: I, keys: function (b) { r(32, !1, void 0, { "Highcharts.keys": "use Object.keys" }); return Object.keys(b) }, merge: function () {
                    let b, d = arguments, e = {}; const c = function (b, d) { "object" !== typeof b && (b = {}); C(d, function (m, e) { "__proto__" !== e && "constructor" !== e && (!A(m, !0) || D(m) || F(m) ? b[e] = d[e] : b[e] = c(b[e] || {}, m)) }); return b }; !0 === d[0] && (e = d[1], d = Array.prototype.slice.call(d, 2)); const l =
                        d.length; for (b = 0; b < l; b++)e = c(e, d[b]); return e
                }, normalizeTickInterval: function (b, d, e, l, v) { let m = b; e = h(e, c(b)); const w = b / e; d || (d = v ? [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10] : [1, 2, 2.5, 5, 10], !1 === l && (1 === e ? d = d.filter(function (b) { return 0 === b % 1 }) : .1 >= e && (d = [1 / e]))); for (l = 0; l < d.length && !(m = d[l], v && m * e >= b || !v && w <= (d[l] + (d[l + 1] || d[l])) / 2); l++); return m = g(m * e, -Math.round(Math.log(.001) / Math.LN10)) }, objectEach: C, offset: function (b) {
                    const d = v.documentElement; b = b.parentElement || b.parentNode ? b.getBoundingClientRect() : {
                        top: 0,
                        left: 0, width: 0, height: 0
                    }; return { top: b.top + (z.pageYOffset || d.scrollTop) - (d.clientTop || 0), left: b.left + (z.pageXOffset || d.scrollLeft) - (d.clientLeft || 0), width: b.width, height: b.height }
                }, pad: function (b, d, e) { return Array((d || 2) + 1 - String(b).replace("-", "").length).join(e || "0") + b }, pick: h, pInt: G, pushUnique: function (b, d) { return 0 > b.indexOf(d) && !!b.push(d) }, relativeLength: function (b, d, e) { return /%$/.test(b) ? d * parseFloat(b) / 100 + (e || 0) : parseFloat(b) }, removeEvent: E, splat: p, stableSort: function (b, d) {
                    const e = b.length;
                    let m, c; for (c = 0; c < e; c++)b[c].safeI = c; b.sort(function (b, e) { m = d(b, e); return 0 === m ? b.safeI - e.safeI : m }); for (c = 0; c < e; c++)delete b[c].safeI
                }, syncTimeout: function (b, d, e) { if (0 < d) return setTimeout(b, d, e); b.call(0, e); return -1 }, timeUnits: { millisecond: 1, second: 1E3, minute: 6E4, hour: 36E5, day: 864E5, week: 6048E5, month: 24192E5, year: 314496E5 }, uniqueKey: d, useSerialIds: function (d) { return b = h(d, b) }, wrap: function (b, d, e) {
                    const m = b[d]; b[d] = function () {
                        const b = arguments, d = this; return e.apply(this, [function () {
                            return m.apply(d,
                                arguments.length ? arguments : b)
                        }].concat([].slice.call(arguments)))
                    }
                }
            }; ""; return u
    }); K(a, "Core/Chart/ChartDefaults.js", [], function () {
        return {
            alignThresholds: !1, panning: { enabled: !1, type: "x" }, styledMode: !1, borderRadius: 0, colorCount: 10, allowMutatingData: !0, ignoreHiddenSeries: !0, spacing: [10, 10, 15, 10], resetZoomButton: { theme: { zIndex: 6 }, position: { align: "right", x: -10, y: 10 } }, reflow: !0, type: "line", zooming: { singleTouch: !1, resetButton: { theme: { zIndex: 6 }, position: { align: "right", x: -10, y: 10 } } }, width: null, height: null,
            borderColor: "#334eff", backgroundColor: "#ffffff", plotBorderColor: "#cccccc"
        }
    }); K(a, "Core/Color/Color.js", [a["Core/Globals.js"], a["Core/Utilities.js"]], function (a, x) {
        const { isNumber: r, merge: I, pInt: y } = x; class A {
            static parse(a) { return a ? new A(a) : A.None } constructor(r) { this.rgba = [NaN, NaN, NaN, NaN]; this.input = r; const D = a.Color; if (D && D !== A) return new D(r); this.init(r) } init(a) {
                let D; let t; if ("object" === typeof a && "undefined" !== typeof a.stops) this.stops = a.stops.map(k => new A(k[1])); else if ("string" === typeof a) {
                    this.input =
                    a = A.names[a.toLowerCase()] || a; if ("#" === a.charAt(0)) { var q = a.length; var k = parseInt(a.substr(1), 16); 7 === q ? D = [(k & 16711680) >> 16, (k & 65280) >> 8, k & 255, 1] : 4 === q && (D = [(k & 3840) >> 4 | (k & 3840) >> 8, (k & 240) >> 4 | k & 240, (k & 15) << 4 | k & 15, 1]) } if (!D) for (k = A.parsers.length; k-- && !D;)t = A.parsers[k], (q = t.regex.exec(a)) && (D = t.parse(q))
                } D && (this.rgba = D)
            } get(a) {
                const D = this.input, t = this.rgba; if ("object" === typeof D && "undefined" !== typeof this.stops) {
                    const q = I(D); q.stops = [].slice.call(q.stops); this.stops.forEach((k, p) => {
                        q.stops[p] = [q.stops[p][0],
                        k.get(a)]
                    }); return q
                } return t && r(t[0]) ? "rgb" === a || !a && 1 === t[3] ? "rgb(" + t[0] + "," + t[1] + "," + t[2] + ")" : "a" === a ? `${t[3]}` : "rgba(" + t.join(",") + ")" : D
            } brighten(a) { const D = this.rgba; if (this.stops) this.stops.forEach(function (t) { t.brighten(a) }); else if (r(a) && 0 !== a) for (let t = 0; 3 > t; t++)D[t] += y(255 * a), 0 > D[t] && (D[t] = 0), 255 < D[t] && (D[t] = 255); return this } setOpacity(a) { this.rgba[3] = a; return this } tweenTo(a, D) {
                const t = this.rgba, q = a.rgba; if (!r(t[0]) || !r(q[0])) return a.input || "none"; a = 1 !== q[3] || 1 !== t[3]; return (a ? "rgba(" :
                    "rgb(") + Math.round(q[0] + (t[0] - q[0]) * (1 - D)) + "," + Math.round(q[1] + (t[1] - q[1]) * (1 - D)) + "," + Math.round(q[2] + (t[2] - q[2]) * (1 - D)) + (a ? "," + (q[3] + (t[3] - q[3]) * (1 - D)) : "") + ")"
            }
        } A.names = { white: "#ffffff", black: "#000000" }; A.parsers = [{ regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/, parse: function (a) { return [y(a[1]), y(a[2]), y(a[3]), parseFloat(a[4], 10)] } }, {
            regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/, parse: function (a) {
                return [y(a[1]), y(a[2]),
                y(a[3]), 1]
            }
        }]; A.None = new A(""); ""; return A
    }); K(a, "Core/Color/Palettes.js", [], function () { return { colors: "#2caffe #544fc5 #00e272 #fe6a35 #6b8abc #d568fb #2ee0ca #fa4b42 #feb56a #91e8e1".split(" ") } }); K(a, "Core/Time.js", [a["Core/Globals.js"], a["Core/Utilities.js"]], function (a, x) {
        const { win: r } = a, { defined: I, error: y, extend: A, isObject: F, merge: D, objectEach: t, pad: q, pick: k, splat: p, timeUnits: n } = x, h = a.isSafari && r.Intl && r.Intl.DateTimeFormat.prototype.formatRange, f = a.isSafari && r.Intl && !r.Intl.DateTimeFormat.prototype.formatRange;
        class c {
            constructor(c) { this.options = {}; this.variableTimezone = this.useUTC = !1; this.Date = r.Date; this.getTimezoneOffset = this.timezoneOffsetFunction(); this.update(c) } get(c, f) { if (this.variableTimezone || this.timezoneOffset) { const g = f.getTime(), h = g - this.getTimezoneOffset(f); f.setTime(h); c = f["getUTC" + c](); f.setTime(g); return c } return this.useUTC ? f["getUTC" + c]() : f["get" + c]() } set(c, f, C) {
                if (this.variableTimezone || this.timezoneOffset) {
                    if ("Milliseconds" === c || "Seconds" === c || "Minutes" === c && 0 === this.getTimezoneOffset(f) %
                        36E5) return f["setUTC" + c](C); var g = this.getTimezoneOffset(f); g = f.getTime() - g; f.setTime(g); f["setUTC" + c](C); c = this.getTimezoneOffset(f); g = f.getTime() + c; return f.setTime(g)
                } return this.useUTC || h && "FullYear" === c ? f["setUTC" + c](C) : f["set" + c](C)
            } update(c = {}) {
                const g = k(c.useUTC, !0); this.options = c = D(!0, this.options, c); this.Date = c.Date || r.Date || Date; this.timezoneOffset = (this.useUTC = g) && c.timezoneOffset || void 0; this.getTimezoneOffset = this.timezoneOffsetFunction(); this.variableTimezone = g && !(!c.getTimezoneOffset &&
                    !c.timezone)
            } makeTime(c, h, C, n, e, l) { let g, z, u; this.useUTC ? (g = this.Date.UTC.apply(0, arguments), z = this.getTimezoneOffset(g), g += z, u = this.getTimezoneOffset(g), z !== u ? g += u - z : z - 36E5 !== this.getTimezoneOffset(g - 36E5) || f || (g -= 36E5)) : g = (new this.Date(c, h, k(C, 1), k(n, 0), k(e, 0), k(l, 0))).getTime(); return g } timezoneOffsetFunction() {
                const c = this, f = this.options, h = f.getTimezoneOffset, k = f.moment || r.moment; if (!this.useUTC) return function (e) { return 6E4 * (new Date(e.toString())).getTimezoneOffset() }; if (f.timezone) {
                    if (k) return function (e) {
                        return 6E4 *
                            -k.tz(e, f.timezone).utcOffset()
                    }; y(25)
                } return this.useUTC && h ? function (e) { return 6E4 * h(e.valueOf()) } : function () { return 6E4 * (c.timezoneOffset || 0) }
            } dateFormat(c, f, h) {
                if (!I(f) || isNaN(f)) return a.defaultOptions.lang && a.defaultOptions.lang.invalidDate || ""; c = k(c, "%Y-%m-%d %H:%M:%S"); const g = this; var e = new this.Date(f); const l = this.get("Hours", e), v = this.get("Day", e), z = this.get("Date", e), u = this.get("Month", e), b = this.get("FullYear", e), d = a.defaultOptions.lang, m = d && d.weekdays, w = d && d.shortWeekdays; e = A({
                    a: w ? w[v] :
                        m[v].substr(0, 3), A: m[v], d: q(z), e: q(z, 2, " "), w: v, b: d.shortMonths[u], B: d.months[u], m: q(u + 1), o: u + 1, y: b.toString().substr(2, 2), Y: b, H: q(l), k: l, I: q(l % 12 || 12), l: l % 12 || 12, M: q(this.get("Minutes", e)), p: 12 > l ? "AM" : "PM", P: 12 > l ? "am" : "pm", S: q(e.getSeconds()), L: q(Math.floor(f % 1E3), 3)
                }, a.dateFormats); t(e, function (b, d) { for (; -1 !== c.indexOf("%" + d);)c = c.replace("%" + d, "function" === typeof b ? b.call(g, f) : b) }); return h ? c.substr(0, 1).toUpperCase() + c.substr(1) : c
            } resolveDTLFormat(c) {
                return F(c, !0) ? c : (c = p(c), {
                    main: c[0], from: c[1],
                    to: c[2]
                })
            } getTimeTicks(c, f, h, E) {
                const e = this, l = [], g = {}; var z = new e.Date(f); const u = c.unitRange, b = c.count || 1; let d; E = k(E, 1); if (I(f)) {
                    e.set("Milliseconds", z, u >= n.second ? 0 : b * Math.floor(e.get("Milliseconds", z) / b)); u >= n.second && e.set("Seconds", z, u >= n.minute ? 0 : b * Math.floor(e.get("Seconds", z) / b)); u >= n.minute && e.set("Minutes", z, u >= n.hour ? 0 : b * Math.floor(e.get("Minutes", z) / b)); u >= n.hour && e.set("Hours", z, u >= n.day ? 0 : b * Math.floor(e.get("Hours", z) / b)); u >= n.day && e.set("Date", z, u >= n.month ? 1 : Math.max(1, b * Math.floor(e.get("Date",
                        z) / b))); if (u >= n.month) { e.set("Month", z, u >= n.year ? 0 : b * Math.floor(e.get("Month", z) / b)); var m = e.get("FullYear", z) } u >= n.year && e.set("FullYear", z, m - m % b); u === n.week && (m = e.get("Day", z), e.set("Date", z, e.get("Date", z) - m + E + (m < E ? -7 : 0))); m = e.get("FullYear", z); E = e.get("Month", z); const c = e.get("Date", z), v = e.get("Hours", z); f = z.getTime(); !e.variableTimezone && e.useUTC || !I(h) || (d = h - f > 4 * n.month || e.getTimezoneOffset(f) !== e.getTimezoneOffset(h)); f = z.getTime(); for (z = 1; f < h;)l.push(f), f = u === n.year ? e.makeTime(m + z * b, 0) : u ===
                            n.month ? e.makeTime(m, E + z * b) : !d || u !== n.day && u !== n.week ? d && u === n.hour && 1 < b ? e.makeTime(m, E, c, v + z * b) : f + u * b : e.makeTime(m, E, c + z * b * (u === n.day ? 1 : 7)), z++; l.push(f); u <= n.hour && 1E4 > l.length && l.forEach(function (b) { 0 === b % 18E5 && "000000000" === e.dateFormat("%H%M%S%L", b) && (g[b] = "day") })
                } l.info = A(c, { higherRanks: g, totalRange: u * b }); return l
            } getDateFormat(c, f, h, k) {
                const e = this.dateFormat("%m-%d %H:%M:%S.%L", f), l = { millisecond: 15, second: 12, minute: 9, hour: 6, day: 3 }; let g, z = "millisecond"; for (g in n) {
                    if (c === n.week && +this.dateFormat("%w",
                        f) === h && "00:00:00.000" === e.substr(6)) { g = "week"; break } if (n[g] > c) { g = z; break } if (l[g] && e.substr(l[g]) !== "01-01 00:00:00.000".substr(l[g])) break; "week" !== g && (z = g)
                } return this.resolveDTLFormat(k[g]).main
            }
        } ""; return c
    }); K(a, "Core/Defaults.js", [a["Core/Chart/ChartDefaults.js"], a["Core/Color/Color.js"], a["Core/Globals.js"], a["Core/Color/Palettes.js"], a["Core/Time.js"], a["Core/Utilities.js"]], function (a, x, G, I, y, A) {
        const { isTouchDevice: r, svg: D } = G, { merge: t } = A, q = {
            colors: I.colors, symbols: ["circle", "diamond", "square",
                "triangle", "triangle-down"], lang: { loading: "Loading...", months: "January February March April May June July August September October November December".split(" "), shortMonths: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "), weekdays: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "), decimalPoint: ".", numericSymbols: "kMGTPE".split(""), resetZoom: "Reset zoom", resetZoomTitle: "Reset zoom level 1:1", thousandsSep: " " }, global: {}, time: {
                    Date: void 0, getTimezoneOffset: void 0, timezone: void 0,
                    timezoneOffset: 0, useUTC: !0
                }, chart: a, title: { style: { color: "#333333", fontWeight: "bold" }, text: "Chart title", align: "center", margin: 15, widthAdjust: -44 }, subtitle: { style: { color: "#666666", fontSize: "0.8em" }, text: "", align: "center", widthAdjust: -44 }, caption: { margin: 15, style: { color: "#666666", fontSize: "0.8em" }, text: "", align: "left", verticalAlign: "bottom" }, plotOptions: {}, legend: {
                    enabled: !0, align: "center", alignColumns: !0, className: "highcharts-no-tooltip", layout: "horizontal", itemMarginBottom: 2, itemMarginTop: 2, labelFormatter: function () { return this.name },
                    borderColor: "#999999", borderRadius: 0, navigation: { style: { fontSize: "0.8em" }, activeColor: "#0022ff", inactiveColor: "#cccccc" }, itemStyle: { color: "#333333", cursor: "pointer", fontSize: "0.8em", textDecoration: "none", textOverflow: "ellipsis" }, itemHoverStyle: { color: "#000000" }, itemHiddenStyle: { color: "#666666", textDecoration: "line-through" }, shadow: !1, itemCheckboxStyle: { position: "absolute", width: "13px", height: "13px" }, squareSymbol: !0, symbolPadding: 5, verticalAlign: "bottom", x: 0, y: 0, title: { style: { fontSize: "0.8em", fontWeight: "bold" } }
                },
            loading: { labelStyle: { fontWeight: "bold", position: "relative", top: "45%" }, style: { position: "absolute", backgroundColor: "#ffffff", opacity: .5, textAlign: "center" } }, tooltip: {
                enabled: !0, animation: D, borderRadius: 3, dateTimeLabelFormats: { millisecond: "%A, %e %b, %H:%M:%S.%L", second: "%A, %e %b, %H:%M:%S", minute: "%A, %e %b, %H:%M", hour: "%A, %e %b, %H:%M", day: "%A, %e %b %Y", week: "Week from %A, %e %b %Y", month: "%B %Y", year: "%Y" }, footerFormat: "", headerShape: "callout", hideDelay: 500, padding: 8, shape: "callout", shared: !1,
                snap: r ? 25 : 10, headerFormat: '<span style="font-size: 0.8em">{point.key}</span><br/>', pointFormat: '<span style="color:{point.color}">\u25cf</span> {series.name}: <b>{point.y}</b><br/>', backgroundColor: "#ffffff", borderWidth: void 0, shadow: !0, stickOnContact: !1, style: { color: "#333333", cursor: "default", fontSize: "0.8em" }, useHTML: !1
            }, credits: {
                enabled: !0, href: "", position: { align: "right", x: -10, verticalAlign: "bottom", y: -5 }, style: { cursor: "pointer", color: "#999999", fontSize: "0.6em" },
                text: ""
            }
        }; q.chart.styledMode = !1; ""; const k = new y(q.time); a = { defaultOptions: q, defaultTime: k, getOptions: function () { return q }, setOptions: function (a) { t(!0, q, a); if (a.time || a.global) G.time ? G.time.update(t(q.global, q.time, a.global, a.time)) : G.time = k; return q } }; ""; return a
    }); K(a, "Core/Animation/Fx.js", [a["Core/Color/Color.js"], a["Core/Globals.js"], a["Core/Utilities.js"]], function (a, x, G) {
        const { parse: r } = a, { win: y } = x, { isNumber: A, objectEach: F } = G; class D {
            constructor(a, q, k) {
                this.pos = NaN; this.options =
                    q; this.elem = a; this.prop = k
            } dSetter() { var a = this.paths; const q = a && a[0]; a = a && a[1]; const k = this.now || 0; let p = []; if (1 !== k && q && a) if (q.length === a.length && 1 > k) for (let n = 0; n < a.length; n++) { const h = q[n], f = a[n], c = []; for (let g = 0; g < f.length; g++) { const B = h[g], C = f[g]; A(B) && A(C) && ("A" !== f[0] || 4 !== g && 5 !== g) ? c[g] = B + k * (C - B) : c[g] = C } p.push(c) } else p = a; else p = this.toD || []; this.elem.attr("d", p, void 0, !0) } update() {
                const a = this.elem, q = this.prop, k = this.now, p = this.options.step; if (this[q + "Setter"]) this[q + "Setter"](); else a.attr ?
                    a.element && a.attr(q, k, null, !0) : a.style[q] = k + this.unit; p && p.call(a, k, this)
            } run(a, q, k) {
                const p = this, n = p.options, h = function (c) { return h.stopped ? !1 : p.step(c) }, f = y.requestAnimationFrame || function (c) { setTimeout(c, 13) }, c = function () { for (let c = 0; c < D.timers.length; c++)D.timers[c]() || D.timers.splice(c--, 1); D.timers.length && f(c) }; a !== q || this.elem["forceAnimate:" + this.prop] ? (this.startTime = +new Date, this.start = a, this.end = q, this.unit = k, this.now = this.start, this.pos = 0, h.elem = this.elem, h.prop = this.prop, h() && 1 === D.timers.push(h) &&
                    f(c)) : (delete n.curAnim[this.prop], n.complete && 0 === Object.keys(n.curAnim).length && n.complete.call(this.elem))
            } step(a) { const q = +new Date, k = this.options, p = this.elem, n = k.complete, h = k.duration, f = k.curAnim; let c; p.attr && !p.element ? a = !1 : a || q >= h + this.startTime ? (this.now = this.end, this.pos = 1, this.update(), c = f[this.prop] = !0, F(f, function (g) { !0 !== g && (c = !1) }), c && n && n.call(p), a = !1) : (this.pos = k.easing((q - this.startTime) / h), this.now = this.start + (this.end - this.start) * this.pos, this.update(), a = !0); return a } initPath(a,
                q, k) {
                    function p(e, l) { for (; e.length < C;) { var g = e[0]; const f = l[C - e.length]; f && "M" === g[0] && (e[0] = "C" === f[0] ? ["C", g[1], g[2], g[1], g[2], g[1], g[2]] : ["L", g[1], g[2]]); e.unshift(g); c && (g = e.pop(), e.push(e[e.length - 1], g)) } } function n(e, l) { for (; e.length < C;)if (l = e[Math.floor(e.length / g) - 1].slice(), "C" === l[0] && (l[1] = l[5], l[2] = l[6]), c) { const c = e[Math.floor(e.length / g)].slice(); e.splice(e.length / 2, 0, l, c) } else e.push(l) } const h = a.startX, f = a.endX; k = k.slice(); const c = a.isArea, g = c ? 2 : 1; let B, C, E; q = q && q.slice(); if (!q) return [k,
                        k]; if (h && f && f.length) { for (a = 0; a < h.length; a++)if (h[a] === f[0]) { B = a; break } else if (h[0] === f[f.length - h.length + a]) { B = a; E = !0; break } else if (h[h.length - 1] === f[f.length - h.length + a]) { B = h.length - a; break } "undefined" === typeof B && (q = []) } q.length && A(B) && (C = k.length + B * g, E ? (p(q, k), n(k, q)) : (p(k, q), n(q, k))); return [q, k]
            } fillSetter() { D.prototype.strokeSetter.apply(this, arguments) } strokeSetter() { this.elem.attr(this.prop, r(this.start).tweenTo(r(this.end), this.pos), void 0, !0) }
        } D.timers = []; return D
    }); K(a, "Core/Animation/AnimationUtilities.js",
        [a["Core/Animation/Fx.js"], a["Core/Utilities.js"]], function (a, x) {
            function r(k) { return t(k) ? q({ duration: 500, defer: 0 }, k) : { duration: k ? 500 : 0, defer: 0 } } function I(k, h) { let f = a.timers.length; for (; f--;)a.timers[f].elem !== k || h && h !== a.timers[f].prop || (a.timers[f].stopped = !0) } const { defined: y, getStyle: A, isArray: F, isNumber: D, isObject: t, merge: q, objectEach: k, pick: p } = x; return {
                animate: function (n, h, f) {
                    let c, g = "", B, C, E; t(f) || (E = arguments, f = { duration: E[2], easing: E[3], complete: E[4] }); D(f.duration) || (f.duration = 400);
                    f.easing = "function" === typeof f.easing ? f.easing : Math[f.easing] || Math.easeInOutSine; f.curAnim = q(h); k(h, function (e, l) { I(n, l); C = new a(n, f, l); B = void 0; "d" === l && F(h.d) ? (C.paths = C.initPath(n, n.pathArray, h.d), C.toD = h.d, c = 0, B = 1) : n.attr ? c = n.attr(l) : (c = parseFloat(A(n, l)) || 0, "opacity" !== l && (g = "px")); B || (B = e); "string" === typeof B && B.match("px") && (B = B.replace(/px/g, "")); C.run(c, B, g) })
                }, animObject: r, getDeferredAnimation: function (k, h, f) {
                    const c = r(h); let g = 0, B = 0; (f ? [f] : k.series).forEach(f => {
                        f = r(f.options.animation);
                        g = h && y(h.defer) ? c.defer : Math.max(g, f.duration + f.defer); B = Math.min(c.duration, f.duration)
                    }); k.renderer.forExport && (g = 0); return { defer: Math.max(0, g - B), duration: Math.min(g, B) }
                }, setAnimation: function (k, h) { h.renderer.globalAnimation = p(k, h.options.chart.animation, !0) }, stop: I
            }
        }); K(a, "Core/Renderer/HTML/AST.js", [a["Core/Globals.js"], a["Core/Utilities.js"]], function (a, x) {
            const { SVG_NS: r, win: I } = a, { attr: y, createElement: A, css: F, error: D, isFunction: t, isString: q, objectEach: k, splat: p } = x; ({ trustedTypes: x } = I); const n =
                x && t(x.createPolicy) && x.createPolicy("highcharts", { createHTML: c => c }); x = n ? n.createHTML("") : ""; try { var h = !!(new DOMParser).parseFromString(x, "text/html") } catch (g) { h = !1 } const f = h; class c {
                    static filterUserAttributes(g) {
                        k(g, (f, h) => {
                            let k = !0; -1 === c.allowedAttributes.indexOf(h) && (k = !1); -1 !== ["background", "dynsrc", "href", "lowsrc", "src"].indexOf(h) && (k = q(f) && c.allowedReferences.some(e => 0 === f.indexOf(e))); k || (D(33, !1, void 0, { "Invalid attribute in config": `${h}` }), delete g[h]); q(f) && g[h] && (g[h] = f.replace(/</g,
                                "&lt;"))
                        }); return g
                    } static parseStyle(c) { return c.split(";").reduce((c, g) => { g = g.split(":").map(e => e.trim()); const f = g.shift(); f && g.length && (c[f.replace(/-([a-z])/g, e => e[1].toUpperCase())] = g.join(":")); return c }, {}) } static setElementHTML(g, f) { g.innerHTML = c.emptyHTML; f && (new c(f)).addToDOM(g) } constructor(c) { this.nodes = "string" === typeof c ? this.parseMarkup(c) : c } addToDOM(g) {
                        function f(g, h) {
                            let e; p(g).forEach(function (l) {
                                var g = l.tagName; const z = l.textContent ? a.doc.createTextNode(l.textContent) : void 0, u =
                                    c.bypassHTMLFiltering; let b; if (g) if ("#text" === g) b = z; else if (-1 !== c.allowedTags.indexOf(g) || u) { g = a.doc.createElementNS("svg" === g ? r : h.namespaceURI || r, g); const d = l.attributes || {}; k(l, function (b, e) { "tagName" !== e && "attributes" !== e && "children" !== e && "style" !== e && "textContent" !== e && (d[e] = b) }); y(g, u ? d : c.filterUserAttributes(d)); l.style && F(g, l.style); z && g.appendChild(z); f(l.children || [], g); b = g } else D(33, !1, void 0, { "Invalid tagName in config": g }); b && h.appendChild(b); e = b
                            }); return e
                        } return f(this.nodes, g)
                    } parseMarkup(g) {
                        const h =
                            []; g = g.trim().replace(/ style=(["'])/g, " data-style=$1"); if (f) g = (new DOMParser).parseFromString(n ? n.createHTML(g) : g, "text/html"); else { const c = A("div"); c.innerHTML = g; g = { body: c } } const k = (g, e) => {
                                var l = g.nodeName.toLowerCase(); const f = { tagName: l }; "#text" === l && (f.textContent = g.textContent || ""); if (l = g.attributes) { const e = {};[].forEach.call(l, l => { "data-style" === l.name ? f.style = c.parseStyle(l.value) : e[l.name] = l.value }); f.attributes = e } if (g.childNodes.length) {
                                    const e = [];[].forEach.call(g.childNodes, c => {
                                        k(c,
                                            e)
                                    }); e.length && (f.children = e)
                                } e.push(f)
                            };[].forEach.call(g.body.childNodes, c => k(c, h)); return h
                    }
            } c.allowedAttributes = "alt aria-controls aria-describedby aria-expanded aria-haspopup aria-hidden aria-label aria-labelledby aria-live aria-pressed aria-readonly aria-roledescription aria-selected class clip-path color colspan cx cy d dx dy disabled fill flood-color flood-opacity height href id in markerHeight markerWidth offset opacity orient padding paddingLeft paddingRight patternUnits r refX refY role scope slope src startOffset stdDeviation stroke stroke-linecap stroke-width style tableValues result rowspan summary target tabindex text-align text-anchor textAnchor textLength title type valign width x x1 x2 xlink:href y y1 y2 zIndex".split(" ");
            c.allowedReferences = "https:// http:// mailto: / ../ ./ #".split(" "); c.allowedTags = "a abbr b br button caption circle clipPath code dd defs div dl dt em feComponentTransfer feDropShadow feFuncA feFuncB feFuncG feFuncR feGaussianBlur feOffset feMerge feMergeNode filter h1 h2 h3 h4 h5 h6 hr i img li linearGradient marker ol p path pattern pre rect small span stop strong style sub sup svg table text textPath thead title tbody tspan td th tr u ul #text".split(" "); c.emptyHTML = x; c.bypassHTMLFiltering =
                !1; ""; return c
        }); K(a, "Core/Templating.js", [a["Core/Defaults.js"], a["Core/Utilities.js"]], function (a, x) {
            function r(f = "", c, g) {
                const k = /\{([a-zA-Z0-9:\.,;\-\/<>%_@"'= #\(\)]+)\}/g, a = /\(([a-zA-Z0-9:\.,;\-\/<>%_@"'= ]+)\)/g, n = [], e = /f$/, l = /\.([0-9])/, v = y.lang, z = g && g.time || A, u = g && g.numberFormatter || I, b = (b = "") => { let d; return "true" === b ? !0 : "false" === b ? !1 : (d = Number(b)).toString() === b ? d : D(b, c) }; let d, m, w = 0, q; for (; null !== (d = k.exec(f));) {
                    const b = a.exec(d[1]); b && (d = b, q = !0); m && m.isBlock || (m = {
                        ctx: c, expression: d[1],
                        find: d[0], isBlock: "#" === d[1].charAt(0), start: d.index, startInner: d.index + d[0].length, length: d[0].length
                    }); var H = d[1].split(" ")[0].replace("#", ""); h[H] && (m.isBlock && H === m.fn && w++, m.fn || (m.fn = H)); H = "else" === d[1]; if (m.isBlock && m.fn && (d[1] === `/${m.fn}` || H)) if (w) H || w--; else { var N = m.startInner; N = f.substr(N, d.index - N); void 0 === m.body ? (m.body = N, m.startInner = d.index + d[0].length) : m.elseBody = N; m.find += N + d[0]; H || (n.push(m), m = void 0) } else m.isBlock || n.push(m); if (b && (null === m || void 0 === m || !m.isBlock)) break
                } n.forEach(d => { const { body: m, elseBody: g, expression: w, fn: N } = d; var J; if (N) { var k = [d], a = w.split(" "); for (J = h[N].length; J--;)k.unshift(b(a[J + 1])); J = h[N].apply(c, k); d.isBlock && "boolean" === typeof J && (J = r(J ? m : g, c)) } else k = w.split(":"), J = b(k.shift() || ""), k.length && "number" === typeof J && (k = k.join(":"), e.test(k) ? (a = parseInt((k.match(l) || ["", "-1"])[1], 10), null !== J && (J = u(J, a, v.decimalPoint, -1 < k.indexOf(",") ? v.thousandsSep : ""))) : J = z.dateFormat(k, J)); f = f.replace(d.find, p(J, "")) }); return q ? r(f, c, g) : f
            } function I(f, c, g, h) {
                f = +f ||
                0; c = +c; const k = y.lang; var a = (f.toString().split(".")[1] || "").split("e")[0].length; const e = f.toString().split("e"), l = c; if (-1 === c) c = Math.min(a, 20); else if (!q(c)) c = 2; else if (c && e[1] && 0 > e[1]) { var v = c + +e[1]; 0 <= v ? (e[0] = (+e[0]).toExponential(v).split("e")[0], c = v) : (e[0] = e[0].split(".")[0] || 0, f = 20 > c ? (e[0] * Math.pow(10, e[1])).toFixed(c) : 0, e[1] = 0) } v = (Math.abs(e[1] ? e[0] : f) + Math.pow(10, -Math.max(c, a) - 1)).toFixed(c); a = String(n(v)); const z = 3 < a.length ? a.length % 3 : 0; g = p(g, k.decimalPoint); h = p(h, k.thousandsSep); f = (0 >
                    f ? "-" : "") + (z ? a.substr(0, z) + h : ""); f = 0 > +e[1] && !l ? "0" : f + a.substr(z).replace(/(\d{3})(?=\d)/g, "$1" + h); c && (f += g + v.slice(-c)); e[1] && 0 !== +f && (f += "e" + e[1]); return f
            } const { defaultOptions: y, defaultTime: A } = a, { extend: F, getNestedProperty: D, isArray: t, isNumber: q, isObject: k, pick: p, pInt: n } = x, h = {
                add: (f, c) => f + c, divide: (f, c) => 0 !== c ? f / c : "", eq: (f, c) => f == c, each: function (f) {
                    const c = arguments[arguments.length - 1]; return t(f) ? f.map((g, h) => r(c.body, F(k(g) ? g : { "@this": g }, { "@index": h, "@first": 0 === h, "@last": h === f.length - 1 }))).join("") :
                        !1
                }, ge: (f, c) => f >= c, gt: (f, c) => f > c, "if": f => !!f, le: (f, c) => f <= c, lt: (f, c) => f < c, multiply: (f, c) => f * c, ne: (f, c) => f != c, subtract: (f, c) => f - c, unless: f => !f
            }; return { dateFormat: function (f, c, g) { return A.dateFormat(f, c, g) }, format: r, helpers: h, numberFormat: I }
        }); K(a, "Core/Renderer/RendererUtilities.js", [a["Core/Utilities.js"]], function (a) {
            const { clamp: r, pick: G, stableSort: I } = a; var y; (function (a) {
                function y(a, t, q) {
                    const k = a; var p = k.reducedLen || t, n = (c, g) => (g.rank || 0) - (c.rank || 0); const h = (c, g) => c.target - g.target; let f, c =
                        !0, g = [], B = 0; for (f = a.length; f--;)B += a[f].size; if (B > p) { I(a, n); for (B = f = 0; B <= p;)B += a[f].size, f++; g = a.splice(f - 1, a.length) } I(a, h); for (a = a.map(c => ({ size: c.size, targets: [c.target], align: G(c.align, .5) })); c;) {
                            for (f = a.length; f--;)p = a[f], n = (Math.min.apply(0, p.targets) + Math.max.apply(0, p.targets)) / 2, p.pos = r(n - p.size * p.align, 0, t - p.size); f = a.length; for (c = !1; f--;)0 < f && a[f - 1].pos + a[f - 1].size > a[f].pos && (a[f - 1].size += a[f].size, a[f - 1].targets = a[f - 1].targets.concat(a[f].targets), a[f - 1].align = .5, a[f - 1].pos + a[f - 1].size >
                                t && (a[f - 1].pos = t - a[f - 1].size), a.splice(f, 1), c = !0)
                        } k.push.apply(k, g); f = 0; a.some(c => { let g = 0; return (c.targets || []).some(() => { k[f].pos = c.pos + g; if ("undefined" !== typeof q && Math.abs(k[f].pos - k[f].target) > q) return k.slice(0, f + 1).forEach(e => delete e.pos), k.reducedLen = (k.reducedLen || t) - .1 * t, k.reducedLen > .1 * t && y(k, t, q), !0; g += k[f].size; f++; return !1 }) }); I(k, h); return k
                } a.distribute = y
            })(y || (y = {})); return y
        }); K(a, "Core/Renderer/SVG/SVGElement.js", [a["Core/Animation/AnimationUtilities.js"], a["Core/Color/Color.js"],
        a["Core/Globals.js"], a["Core/Utilities.js"]], function (a, x, G, I) {
            const { animate: r, animObject: A, stop: F } = a, { deg2rad: D, doc: t, svg: q, SVG_NS: k, win: p } = G, { addEvent: n, attr: h, createElement: f, css: c, defined: g, erase: B, extend: C, fireEvent: E, isArray: e, isFunction: l, isObject: v, isString: z, merge: u, objectEach: b, pick: d, pInt: m, syncTimeout: w, uniqueKey: M } = I; class H {
                constructor() { this.element = void 0; this.onEvents = {}; this.opacity = 1; this.renderer = void 0; this.SVG_NS = k } _defaultGetter(b) {
                    b = d(this[b + "Value"], this[b], this.element ?
                        this.element.getAttribute(b) : null, 0); /^[\-0-9\.]+$/.test(b) && (b = parseFloat(b)); return b
                } _defaultSetter(b, d, e) { e.setAttribute(d, b) } add(b) { const d = this.renderer, e = this.element; let c; b && (this.parentGroup = b); "undefined" !== typeof this.textStr && "text" === this.element.nodeName && d.buildText(this); this.added = !0; if (!b || b.handleZ || this.zIndex) c = this.zIndexSetter(); c || (b ? b.element : d.box).appendChild(e); if (this.onAdd) this.onAdd(); return this } addClass(b, d) {
                    const e = d ? "" : this.attr("class") || ""; b = (b || "").split(/ /g).reduce(function (b,
                        d) { -1 === e.indexOf(d) && b.push(d); return b }, e ? [e] : []).join(" "); b !== e && this.attr("class", b); return this
                } afterSetters() { this.doTransform && (this.updateTransform(), this.doTransform = !1) } align(b, e, c) {
                    const m = {}; var l = this.renderer, g = l.alignedObjects, J; let f, w; if (b) { if (this.alignOptions = b, this.alignByTranslate = e, !c || z(c)) this.alignTo = J = c || "renderer", B(g, this), g.push(this), c = void 0 } else b = this.alignOptions, e = this.alignByTranslate, J = this.alignTo; c = d(c, l[J], "scrollablePlotBox" === J ? l.plotBox : void 0, l); J = b.align;
                    const h = b.verticalAlign; l = (c.x || 0) + (b.x || 0); g = (c.y || 0) + (b.y || 0); "right" === J ? f = 1 : "center" === J && (f = 2); f && (l += (c.width - (b.width || 0)) / f); m[e ? "translateX" : "x"] = Math.round(l); "bottom" === h ? w = 1 : "middle" === h && (w = 2); w && (g += (c.height - (b.height || 0)) / w); m[e ? "translateY" : "y"] = Math.round(g); this[this.placed ? "animate" : "attr"](m); this.placed = !0; this.alignAttr = m; return this
                } alignSetter(b) { const d = { left: "start", center: "middle", right: "end" }; d[b] && (this.alignValue = b, this.element.setAttribute("text-anchor", d[b])) } animate(e,
                    c, m) { const l = A(d(c, this.renderer.globalAnimation, !0)); c = l.defer; t.hidden && (l.duration = 0); 0 !== l.duration ? (m && (l.complete = m), w(() => { this.element && r(this, e, l) }, c)) : (this.attr(e, void 0, m || l.complete), b(e, function (b, d) { l.step && l.step.call(this, b, { prop: d, pos: 1, elem: this }) }, this)); return this } applyTextOutline(b) {
                        const d = this.element; -1 !== b.indexOf("contrast") && (b = b.replace(/contrast/g, this.renderer.getContrast(d.style.fill))); var e = b.split(" "); b = e[e.length - 1]; if ((e = e[0]) && "none" !== e && G.svg) {
                            this.fakeTS =
                            !0; e = e.replace(/(^[\d\.]+)(.*?)$/g, function (b, d, e) { return 2 * Number(d) + e }); this.removeTextOutline(); const c = t.createElementNS(k, "tspan"); h(c, { "class": "highcharts-text-outline", fill: b, stroke: b, "stroke-width": e, "stroke-linejoin": "round" }); b = d.querySelector("textPath") || d;[].forEach.call(b.childNodes, b => { const d = b.cloneNode(!0); d.removeAttribute && ["fill", "stroke", "stroke-width", "stroke"].forEach(b => d.removeAttribute(b)); c.appendChild(d) }); let m = 0;[].forEach.call(b.querySelectorAll("text tspan"), b => {
                                m +=
                                Number(b.getAttribute("dy"))
                            }); e = t.createElementNS(k, "tspan"); e.textContent = "\u200b"; h(e, { x: Number(d.getAttribute("x")), dy: -m }); c.appendChild(e); b.insertBefore(c, b.firstChild)
                        }
                    } attr(d, e, c, m) {
                        const l = this.element, g = H.symbolCustomAttribs; let J, f, w = this, h, u; "string" === typeof d && "undefined" !== typeof e && (J = d, d = {}, d[J] = e); "string" === typeof d ? w = (this[d + "Getter"] || this._defaultGetter).call(this, d, l) : (b(d, function (b, e) {
                            h = !1; m || F(this, e); this.symbolName && -1 !== g.indexOf(e) && (f || (this.symbolAttr(d), f = !0), h = !0);
                            !this.rotation || "x" !== e && "y" !== e || (this.doTransform = !0); h || (u = this[e + "Setter"] || this._defaultSetter, u.call(this, b, e, l))
                        }, this), this.afterSetters()); c && c.call(this); return w
                    } clip(b) { return this.attr("clip-path", b ? "url(" + this.renderer.url + "#" + b.id + ")" : "none") } crisp(b, d) {
                        d = d || b.strokeWidth || 0; const e = Math.round(d) % 2 / 2; b.x = Math.floor(b.x || this.x || 0) + e; b.y = Math.floor(b.y || this.y || 0) + e; b.width = Math.floor((b.width || this.width || 0) - 2 * e); b.height = Math.floor((b.height || this.height || 0) - 2 * e); g(b.strokeWidth) &&
                            (b.strokeWidth = d); return b
                    } complexColor(d, c, m) {
                        const l = this.renderer; let f, w, J, h, z, v, k, L, a, n, B = [], N; E(this.renderer, "complexColor", { args: arguments }, function () {
                            d.radialGradient ? w = "radialGradient" : d.linearGradient && (w = "linearGradient"); if (w) {
                                J = d[w]; z = l.gradients; v = d.stops; a = m.radialReference; e(J) && (d[w] = J = { x1: J[0], y1: J[1], x2: J[2], y2: J[3], gradientUnits: "userSpaceOnUse" }); "radialGradient" === w && a && !g(J.gradientUnits) && (h = J, J = u(J, l.getRadialAttr(a, h), { gradientUnits: "userSpaceOnUse" })); b(J, function (b, d) {
                                    "id" !==
                                    d && B.push(d, b)
                                }); b(v, function (b) { B.push(b) }); B = B.join(","); if (z[B]) n = z[B].attr("id"); else { J.id = n = M(); const b = z[B] = l.createElement(w).attr(J).add(l.defs); b.radAttr = h; b.stops = []; v.forEach(function (d) { 0 === d[1].indexOf("rgba") ? (f = x.parse(d[1]), k = f.get("rgb"), L = f.get("a")) : (k = d[1], L = 1); d = l.createElement("stop").attr({ offset: d[0], "stop-color": k, "stop-opacity": L }).add(b); b.stops.push(d) }) } N = "url(" + l.url + "#" + n + ")"; m.setAttribute(c, N); m.gradient = B; d.toString = function () { return N }
                            }
                        })
                    } css(d) {
                        const e = this.styles,
                        l = {}, g = this.element; let f, w = !e; e && b(d, function (b, d) { e && e[d] !== b && (l[d] = b, w = !0) }); if (w) { e && (d = C(e, l)); null === d.width || "auto" === d.width ? delete this.textWidth : "text" === g.nodeName.toLowerCase() && d.width && (f = this.textWidth = m(d.width)); this.styles = d; f && !q && this.renderer.forExport && delete d.width; const b = u(d); g.namespaceURI === this.SVG_NS && (["textOutline", "textOverflow", "width"].forEach(d => b && delete b[d]), b.color && (b.fill = b.color)); c(g, b) } this.added && ("text" === this.element.nodeName && this.renderer.buildText(this),
                            d.textOutline && this.applyTextOutline(d.textOutline)); return this
                    } dashstyleSetter(b) {
                        let e = this["stroke-width"]; "inherit" === e && (e = 1); if (b = b && b.toLowerCase()) {
                            const c = b.replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(","); for (b = c.length; b--;)c[b] = "" + m(c[b]) * d(e, NaN); b = c.join(",").replace(/NaN/g, "none"); this.element.setAttribute("stroke-dasharray",
                                b)
                        }
                    } destroy() {
                        const d = this; var e = d.element || {}; const c = d.renderer; var m = e.ownerSVGElement; let l = "SPAN" === e.nodeName && d.parentGroup || void 0; e.onclick = e.onmouseout = e.onmouseover = e.onmousemove = e.point = null; F(d); if (d.clipPath && m) { const b = d.clipPath;[].forEach.call(m.querySelectorAll("[clip-path],[CLIP-PATH]"), function (d) { -1 < d.getAttribute("clip-path").indexOf(b.element.id) && d.removeAttribute("clip-path") }); d.clipPath = b.destroy() } if (d.stops) {
                            for (m = 0; m < d.stops.length; m++)d.stops[m].destroy(); d.stops.length =
                                0; d.stops = void 0
                        } for (d.safeRemoveChild(e); l && l.div && 0 === l.div.childNodes.length;)e = l.parentGroup, d.safeRemoveChild(l.div), delete l.div, l = e; d.alignTo && B(c.alignedObjects, d); b(d, function (b, e) { d[e] && d[e].parentGroup === d && d[e].destroy && d[e].destroy(); delete d[e] })
                    } dSetter(b, d, c) {
                        e(b) && ("string" === typeof b[0] && (b = this.renderer.pathToSegments(b)), this.pathArray = b, b = b.reduce((b, d, e) => d && d.join ? (e ? b + " " : "") + d.join(" ") : (d || "").toString(), "")); /(NaN| {2}|^$)/.test(b) && (b = "M 0 0"); this[d] !== b && (c.setAttribute(d,
                            b), this[d] = b)
                    } fadeOut(b) { const e = this; e.animate({ opacity: 0 }, { duration: d(b, 150), complete: function () { e.hide() } }) } fillSetter(b, d, e) { "string" === typeof b ? e.setAttribute(d, b) : b && this.complexColor(b, d, e) } getBBox(b, e) {
                        const { alignValue: m, element: f, renderer: w, styles: h, textStr: J } = this, { cache: z, cacheKeys: u } = w; var v = f.namespaceURI === this.SVG_NS; e = d(e, this.rotation, 0); var k = w.styledMode ? f && H.prototype.getStyle.call(f, "font-size") : h && h.fontSize; let L; let a; g(J) && (a = J.toString(), -1 === a.indexOf("<") && (a = a.replace(/[0-9]/g,
                            "0")), a += ["", w.rootFontSize, k, e, this.textWidth, m, h && h.textOverflow, h && h.fontWeight].join()); a && !b && (L = z[a]); if (!L) {
                                if (v || w.forExport) { try { var B = this.fakeTS && function (b) { const d = f.querySelector(".highcharts-text-outline"); d && c(d, { display: b }) }; l(B) && B("none"); L = f.getBBox ? C({}, f.getBBox()) : { width: f.offsetWidth, height: f.offsetHeight, x: 0, y: 0 }; l(B) && B("") } catch (aa) { "" } if (!L || 0 > L.width) L = { x: 0, y: 0, width: 0, height: 0 } } else L = this.htmlGetBBox(); B = L.width; b = L.height; v && (L.height = b = { "11px,17": 14, "13px,20": 16 }[`${k ||
                                    ""},${Math.round(b)}`] || b); if (e) { v = Number(f.getAttribute("y") || 0) - L.y; k = { right: 1, center: .5 }[m || 0] || 0; var n = e * D, q = (e - 90) * D, E = B * Math.cos(n); e = B * Math.sin(n); var M = Math.cos(q); n = Math.sin(q); B = L.x + k * (B - E) + v * M; q = B + E; M = q - b * M; E = M - E; v = L.y + v - k * e + v * n; k = v + e; b = k - b * n; e = b - e; L.x = Math.min(B, q, M, E); L.y = Math.min(v, k, b, e); L.width = Math.max(B, q, M, E) - L.x; L.height = Math.max(v, k, b, e) - L.y }
                            } if (a && ("" === J || 0 < L.height)) { for (; 250 < u.length;)delete z[u.shift()]; z[a] || u.push(a); z[a] = L } return L
                    } getStyle(b) {
                        return p.getComputedStyle(this.element ||
                            this, "").getPropertyValue(b)
                    } hasClass(b) { return -1 !== ("" + this.attr("class")).split(" ").indexOf(b) } hide() { return this.attr({ visibility: "hidden" }) } htmlGetBBox() { return { height: 0, width: 0, x: 0, y: 0 } } init(b, d) { this.element = "span" === d ? f(d) : t.createElementNS(this.SVG_NS, d); this.renderer = b; E(this, "afterInit") } on(b, d) { const { onEvents: e } = this; if (e[b]) e[b](); e[b] = n(this.element, b, d); return this } opacitySetter(b, d, e) { this.opacity = b = Number(Number(b).toFixed(3)); e.setAttribute(d, b) } removeClass(b) {
                        return this.attr("class",
                            ("" + this.attr("class")).replace(z(b) ? new RegExp(`(^| )${b}( |$)`) : b, " ").replace(/ +/g, " ").trim())
                    } removeTextOutline() { const b = this.element.querySelector("tspan.highcharts-text-outline"); b && this.safeRemoveChild(b) } safeRemoveChild(b) { const d = b.parentNode; d && d.removeChild(b) } setRadialReference(b) { const d = this.element.gradient && this.renderer.gradients[this.element.gradient]; this.element.radialReference = b; d && d.radAttr && d.animate(this.renderer.getRadialAttr(b, d.radAttr)); return this } setTextPath(b, d) {
                        d =
                        u(!0, { enabled: !0, attributes: { dy: -5, startOffset: "50%", textAnchor: "middle" } }, d); const e = this.renderer.url, c = this.text || this, m = c.textPath, { attributes: l, enabled: f } = d; b = b || m && m.path; m && m.undo(); b && f ? (d = n(c, "afterModifyTree", d => {
                            if (b && f) {
                                let f = b.attr("id"); f || b.attr("id", f = M()); var m = { x: 0, y: 0 }; g(l.dx) && (m.dx = l.dx, delete l.dx); g(l.dy) && (m.dy = l.dy, delete l.dy); c.attr(m); this.attr({ transform: "" }); this.box && (this.box = this.box.destroy()); m = d.nodes.slice(0); d.nodes.length = 0; d.nodes[0] = {
                                    tagName: "textPath", attributes: C(l,
                                        { "text-anchor": l.textAnchor, href: `${e}#${f}` }), children: m
                                }
                            }
                        }), c.textPath = { path: b, undo: d }) : (c.attr({ dx: 0, dy: 0 }), delete c.textPath); this.added && (c.textCache = "", this.renderer.buildText(c)); return this
                    } shadow(b) { var d; const { renderer: e } = this, c = u(90 === (null === (d = this.parentGroup) || void 0 === d ? void 0 : d.rotation) ? { offsetX: -1, offsetY: -1 } : {}, v(b) ? b : {}); d = e.shadowDefinition(c); return this.attr({ filter: b ? `url(${e.url}#${d})` : "none" }) } show(b = !0) { return this.attr({ visibility: b ? "inherit" : "visible" }) } ["stroke-widthSetter"](b,
                        d, e) { this[d] = b; e.setAttribute(d, b) } strokeWidth() { if (!this.renderer.styledMode) return this["stroke-width"] || 0; const b = this.getStyle("stroke-width"); let d = 0, e; b.indexOf("px") === b.length - 2 ? d = m(b) : "" !== b && (e = t.createElementNS(k, "rect"), h(e, { width: b, "stroke-width": 0 }), this.element.parentNode.appendChild(e), d = e.getBBox().width, e.parentNode.removeChild(e)); return d } symbolAttr(b) {
                            const e = this; H.symbolCustomAttribs.forEach(function (c) { e[c] = d(b[c], e[c]) }); e.attr({
                                d: e.renderer.symbols[e.symbolName](e.x, e.y,
                                    e.width, e.height, e)
                            })
                        } textSetter(b) { b !== this.textStr && (delete this.textPxLength, this.textStr = b, this.added && this.renderer.buildText(this)) } titleSetter(b) { const e = this.element, c = e.getElementsByTagName("title")[0] || t.createElementNS(this.SVG_NS, "title"); e.insertBefore ? e.insertBefore(c, e.firstChild) : e.appendChild(c); c.textContent = String(d(b, "")).replace(/<[^>]*>/g, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">") } toFront() { const b = this.element; b.parentNode.appendChild(b); return this } translate(b, d) {
                            return this.attr({
                                translateX: b,
                                translateY: d
                            })
                        } updateTransform() { const { element: b, matrix: e, rotation: c = 0, scaleX: m, scaleY: l, translateX: f = 0, translateY: J = 0 } = this, w = ["translate(" + f + "," + J + ")"]; g(e) && w.push("matrix(" + e.join(",") + ")"); c && w.push("rotate(" + c + " " + d(this.rotationOriginX, b.getAttribute("x"), 0) + " " + d(this.rotationOriginY, b.getAttribute("y") || 0) + ")"); (g(m) || g(l)) && w.push("scale(" + d(m, 1) + " " + d(l, 1) + ")"); w.length && !(this.text || this).textPath && b.setAttribute("transform", w.join(" ")) } visibilitySetter(b, d, e) {
                            "inherit" === b ? e.removeAttribute(d) :
                            this[d] !== b && e.setAttribute(d, b); this[d] = b
                        } xGetter(b) { "circle" === this.element.nodeName && ("x" === b ? b = "cx" : "y" === b && (b = "cy")); return this._defaultGetter(b) } zIndexSetter(b, d) {
                            var e = this.renderer, c = this.parentGroup; const l = (c || e).element || e.box, f = this.element; e = l === e.box; let w = !1, h; var z = this.added; let u; g(b) ? (f.setAttribute("data-z-index", b), b = +b, this[d] === b && (z = !1)) : g(this[d]) && f.removeAttribute("data-z-index"); this[d] = b; if (z) {
                                (b = this.zIndex) && c && (c.handleZ = !0); d = l.childNodes; for (u = d.length - 1; 0 <= u &&
                                    !w; u--)if (c = d[u], z = c.getAttribute("data-z-index"), h = !g(z), c !== f) if (0 > b && h && !e && !u) l.insertBefore(f, d[u]), w = !0; else if (m(z) <= b || h && (!g(b) || 0 <= b)) l.insertBefore(f, d[u + 1]), w = !0; w || (l.insertBefore(f, d[e ? 3 : 0]), w = !0)
                            } return w
                        }
            } H.symbolCustomAttribs = "anchorX anchorY clockwise end height innerR r start width x y".split(" "); H.prototype.strokeSetter = H.prototype.fillSetter; H.prototype.yGetter = H.prototype.xGetter; H.prototype.matrixSetter = H.prototype.rotationOriginXSetter = H.prototype.rotationOriginYSetter = H.prototype.rotationSetter =
                H.prototype.scaleXSetter = H.prototype.scaleYSetter = H.prototype.translateXSetter = H.prototype.translateYSetter = H.prototype.verticalAlignSetter = function (b, d) { this[d] = b; this.doTransform = !0 }; ""; return H
        }); K(a, "Core/Renderer/RendererRegistry.js", [a["Core/Globals.js"]], function (a) { var r; (function (r) { r.rendererTypes = {}; let x; r.getRendererType = function (a = x) { return r.rendererTypes[a] || r.rendererTypes[x] }; r.registerRendererType = function (y, A, F) { r.rendererTypes[y] = A; if (!x || F) x = y, a.Renderer = A } })(r || (r = {})); return r });
    K(a, "Core/Renderer/SVG/SVGLabel.js", [a["Core/Renderer/SVG/SVGElement.js"], a["Core/Utilities.js"]], function (a, x) {
        const { defined: r, extend: I, isNumber: y, merge: A, pick: F, removeEvent: D } = x; class t extends a {
            constructor(a, k, p, n, h, f, c, g, B, C) {
                super(); this.paddingRightSetter = this.paddingLeftSetter = this.paddingSetter; this.init(a, "g"); this.textStr = k; this.x = p; this.y = n; this.anchorX = f; this.anchorY = c; this.baseline = B; this.className = C; this.addClass("button" === C ? "highcharts-no-tooltip" : "highcharts-label"); C && this.addClass("highcharts-" +
                    C); this.text = a.text(void 0, 0, 0, g).attr({ zIndex: 1 }); let q; "string" === typeof h && ((q = /^url\((.*?)\)$/.test(h)) || this.renderer.symbols[h]) && (this.symbolKey = h); this.bBox = t.emptyBBox; this.padding = 3; this.baselineOffset = 0; this.needsBox = a.styledMode || q; this.deferredAttr = {}; this.alignFactor = 0
            } alignSetter(a) { a = { left: 0, center: .5, right: 1 }[a]; a !== this.alignFactor && (this.alignFactor = a, this.bBox && y(this.xSetting) && this.attr({ x: this.xSetting })) } anchorXSetter(a, k) {
                this.anchorX = a; this.boxAttr(k, Math.round(a) - this.getCrispAdjust() -
                    this.xSetting)
            } anchorYSetter(a, k) { this.anchorY = a; this.boxAttr(k, a - this.ySetting) } boxAttr(a, k) { this.box ? this.box.attr(a, k) : this.deferredAttr[a] = k } css(q) { if (q) { const a = {}; q = A(q); t.textProps.forEach(k => { "undefined" !== typeof q[k] && (a[k] = q[k], delete q[k]) }); this.text.css(a); "fontSize" in a || "fontWeight" in a ? this.updateTextPadding() : ("width" in a || "textOverflow" in a) && this.updateBoxSize() } return a.prototype.css.call(this, q) } destroy() {
                D(this.element, "mouseenter"); D(this.element, "mouseleave"); this.text && this.text.destroy();
                this.box && (this.box = this.box.destroy()); a.prototype.destroy.call(this)
            } fillSetter(a, k) { a && (this.needsBox = !0); this.fill = a; this.boxAttr(k, a) } getBBox() { this.textStr && 0 === this.bBox.width && 0 === this.bBox.height && this.updateBoxSize(); const a = this.padding, k = F(this.paddingLeft, a); return { width: this.width, height: this.height, x: this.bBox.x - k, y: this.bBox.y - a } } getCrispAdjust() { return this.renderer.styledMode && this.box ? this.box.strokeWidth() % 2 / 2 : (this["stroke-width"] ? parseInt(this["stroke-width"], 10) : 0) % 2 / 2 } heightSetter(a) {
                this.heightSetting =
                a
            } onAdd() { this.text.add(this); this.attr({ text: F(this.textStr, ""), x: this.x || 0, y: this.y || 0 }); this.box && r(this.anchorX) && this.attr({ anchorX: this.anchorX, anchorY: this.anchorY }) } paddingSetter(a, k) { y(a) ? a !== this[k] && (this[k] = a, this.updateTextPadding()) : this[k] = void 0 } rSetter(a, k) { this.boxAttr(k, a) } strokeSetter(a, k) { this.stroke = a; this.boxAttr(k, a) } ["stroke-widthSetter"](a, k) { a && (this.needsBox = !0); this["stroke-width"] = a; this.boxAttr(k, a) } ["text-alignSetter"](a) { this.textAlign = a } textSetter(a) {
                "undefined" !==
                typeof a && this.text.attr({ text: a }); this.updateTextPadding()
            } updateBoxSize() {
                var a = this.text; const k = {}, p = this.padding, n = this.bBox = y(this.widthSetting) && y(this.heightSetting) && !this.textAlign || !r(a.textStr) ? t.emptyBBox : a.getBBox(); this.width = this.getPaddedWidth(); this.height = (this.heightSetting || n.height || 0) + 2 * p; const h = this.renderer.fontMetrics(a); this.baselineOffset = p + Math.min((this.text.firstLineMetrics || h).b, n.height || Infinity); this.heightSetting && (this.baselineOffset += (this.heightSetting - h.h) /
                    2); this.needsBox && !a.textPath && (this.box || (a = this.box = this.symbolKey ? this.renderer.symbol(this.symbolKey) : this.renderer.rect(), a.addClass(("button" === this.className ? "" : "highcharts-label-box") + (this.className ? " highcharts-" + this.className + "-box" : "")), a.add(this)), a = this.getCrispAdjust(), k.x = a, k.y = (this.baseline ? -this.baselineOffset : 0) + a, k.width = Math.round(this.width), k.height = Math.round(this.height), this.box.attr(I(k, this.deferredAttr)), this.deferredAttr = {})
            } updateTextPadding() {
                const a = this.text; if (!a.textPath) {
                    this.updateBoxSize();
                    const k = this.baseline ? 0 : this.baselineOffset; let p = F(this.paddingLeft, this.padding); r(this.widthSetting) && this.bBox && ("center" === this.textAlign || "right" === this.textAlign) && (p += { center: .5, right: 1 }[this.textAlign] * (this.widthSetting - this.bBox.width)); if (p !== a.x || k !== a.y) a.attr("x", p), a.hasBoxWidthChanged && (this.bBox = a.getBBox(!0)), "undefined" !== typeof k && a.attr("y", k); a.x = p; a.y = k
                }
            } widthSetter(a) { this.widthSetting = y(a) ? a : void 0 } getPaddedWidth() {
                var a = this.padding; const k = F(this.paddingLeft, a); a = F(this.paddingRight,
                    a); return (this.widthSetting || this.bBox.width || 0) + k + a
            } xSetter(a) { this.x = a; this.alignFactor && (a -= this.alignFactor * this.getPaddedWidth(), this["forceAnimate:x"] = !0); this.xSetting = Math.round(a); this.attr("translateX", this.xSetting) } ySetter(a) { this.ySetting = this.y = Math.round(a); this.attr("translateY", this.ySetting) }
        } t.emptyBBox = { width: 0, height: 0, x: 0, y: 0 }; t.textProps = "color direction fontFamily fontSize fontStyle fontWeight lineHeight textAlign textDecoration textOutline textOverflow whiteSpace width".split(" ");
        return t
    }); K(a, "Core/Renderer/SVG/Symbols.js", [a["Core/Utilities.js"]], function (a) {
        function r(a, t, q, k, p) {
            const n = []; if (p) {
                const h = p.start || 0, f = F(p.r, q); q = F(p.r, k || q); k = (p.end || 0) - .001; const c = p.innerR, g = F(p.open, .001 > Math.abs((p.end || 0) - h - 2 * Math.PI)), B = Math.cos(h), C = Math.sin(h), E = Math.cos(k), e = Math.sin(k), l = F(p.longArc, .001 > k - h - Math.PI ? 0 : 1); let v = ["A", f, q, 0, l, F(p.clockwise, 1), a + f * E, t + q * e]; v.params = { start: h, end: k, cx: a, cy: t }; n.push(["M", a + f * B, t + q * C], v); y(c) && (v = ["A", c, c, 0, l, y(p.clockwise) ? 1 - p.clockwise :
                    0, a + c * B, t + c * C], v.params = { start: k, end: h, cx: a, cy: t }, n.push(g ? ["M", a + c * E, t + c * e] : ["L", a + c * E, t + c * e], v)); g || n.push(["Z"])
            } return n
        } function G(a, t, q, k, p) { return p && p.r ? I(a, t, q, k, p) : [["M", a, t], ["L", a + q, t], ["L", a + q, t + k], ["L", a, t + k], ["Z"]] } function I(a, t, q, k, p) { p = (null === p || void 0 === p ? void 0 : p.r) || 0; return [["M", a + p, t], ["L", a + q - p, t], ["A", p, p, 0, 0, 1, a + q, t + p], ["L", a + q, t + k - p], ["A", p, p, 0, 0, 1, a + q - p, t + k], ["L", a + p, t + k], ["A", p, p, 0, 0, 1, a, t + k - p], ["L", a, t + p], ["A", p, p, 0, 0, 1, a + p, t], ["Z"]] } const { defined: y, isNumber: A, pick: F } =
            a; return {
                arc: r, callout: function (a, t, q, k, p) {
                    const n = Math.min(p && p.r || 0, q, k), h = n + 6, f = p && p.anchorX; p = p && p.anchorY || 0; const c = I(a, t, q, k, { r: n }); if (!A(f)) return c; a + f >= q ? p > t + h && p < t + k - h ? c.splice(3, 1, ["L", a + q, p - 6], ["L", a + q + 6, p], ["L", a + q, p + 6], ["L", a + q, t + k - n]) : c.splice(3, 1, ["L", a + q, k / 2], ["L", f, p], ["L", a + q, k / 2], ["L", a + q, t + k - n]) : 0 >= a + f ? p > t + h && p < t + k - h ? c.splice(7, 1, ["L", a, p + 6], ["L", a - 6, p], ["L", a, p - 6], ["L", a, t + n]) : c.splice(7, 1, ["L", a, k / 2], ["L", f, p], ["L", a, k / 2], ["L", a, t + n]) : p && p > k && f > a + h && f < a + q - h ? c.splice(5, 1, ["L",
                        f + 6, t + k], ["L", f, t + k + 6], ["L", f - 6, t + k], ["L", a + n, t + k]) : p && 0 > p && f > a + h && f < a + q - h && c.splice(1, 1, ["L", f - 6, t], ["L", f, t - 6], ["L", f + 6, t], ["L", q - n, t]); return c
                }, circle: function (a, t, q, k) { return r(a + q / 2, t + k / 2, q / 2, k / 2, { start: .5 * Math.PI, end: 2.5 * Math.PI, open: !1 }) }, diamond: function (a, t, q, k) { return [["M", a + q / 2, t], ["L", a + q, t + k / 2], ["L", a + q / 2, t + k], ["L", a, t + k / 2], ["Z"]] }, rect: G, roundedRect: I, square: G, triangle: function (a, t, q, k) { return [["M", a + q / 2, t], ["L", a + q, t + k], ["L", a, t + k], ["Z"]] }, "triangle-down": function (a, t, q, k) {
                    return [["M",
                        a, t], ["L", a + q, t], ["L", a + q / 2, t + k], ["Z"]]
                }
            }
    }); K(a, "Core/Renderer/SVG/TextBuilder.js", [a["Core/Renderer/HTML/AST.js"], a["Core/Globals.js"], a["Core/Utilities.js"]], function (a, x, G) {
        const { doc: r, SVG_NS: y, win: A } = x, { attr: F, extend: D, fireEvent: t, isString: q, objectEach: k, pick: p } = G; class n {
            constructor(a) {
                const f = a.styles; this.renderer = a.renderer; this.svgElement = a; this.width = a.textWidth; this.textLineHeight = f && f.lineHeight; this.textOutline = f && f.textOutline; this.ellipsis = !(!f || "ellipsis" !== f.textOverflow); this.noWrap =
                    !(!f || "nowrap" !== f.whiteSpace)
            } buildSVG() {
                const h = this.svgElement, f = h.element; var c = h.renderer, g = p(h.textStr, "").toString(); const k = -1 !== g.indexOf("<"), n = f.childNodes; c = !h.added && c.box; const E = /<br.*?>/g; var e = [g, this.ellipsis, this.noWrap, this.textLineHeight, this.textOutline, h.getStyle("font-size"), this.width].join(); if (e !== h.textCache) {
                    h.textCache = e; delete h.actualWidth; for (e = n.length; e--;)f.removeChild(n[e]); k || this.ellipsis || this.width || h.textPath || -1 !== g.indexOf(" ") && (!this.noWrap || E.test(g)) ?
                        "" !== g && (c && c.appendChild(f), g = new a(g), this.modifyTree(g.nodes), g.addToDOM(f), this.modifyDOM(), this.ellipsis && -1 !== (f.textContent || "").indexOf("\u2026") && h.attr("title", this.unescapeEntities(h.textStr || "", ["&lt;", "&gt;"])), c && c.removeChild(f)) : f.appendChild(r.createTextNode(this.unescapeEntities(g))); q(this.textOutline) && h.applyTextOutline && h.applyTextOutline(this.textOutline)
                }
            } modifyDOM() {
                const a = this.svgElement, f = F(a.element, "x"); a.firstLineMetrics = void 0; let c; for (; c = a.element.firstChild;)if (/^[\s\u200B]*$/.test(c.textContent ||
                    " ")) a.element.removeChild(c); else break;[].forEach.call(a.element.querySelectorAll("tspan.highcharts-br"), (c, e) => { c.nextSibling && c.previousSibling && (0 === e && 1 === c.previousSibling.nodeType && (a.firstLineMetrics = a.renderer.fontMetrics(c.previousSibling)), F(c, { dy: this.getLineHeight(c.nextSibling), x: f })) }); const g = this.width || 0; if (g) {
                        var k = (c, e) => {
                            var l = c.textContent || ""; const h = l.replace(/([^\^])-/g, "$1- ").split(" "); var z = !this.noWrap && (1 < h.length || 1 < a.element.childNodes.length); const u = this.getLineHeight(e);
                            let b = 0, d = a.actualWidth; if (this.ellipsis) l && this.truncate(c, l, void 0, 0, Math.max(0, g - .8 * u), (b, d) => b.substring(0, d) + "\u2026"); else if (z) {
                                l = []; for (z = []; e.firstChild && e.firstChild !== c;)z.push(e.firstChild), e.removeChild(e.firstChild); for (; h.length;)h.length && !this.noWrap && 0 < b && (l.push(c.textContent || ""), c.textContent = h.join(" ").replace(/- /g, "-")), this.truncate(c, void 0, h, 0 === b ? d || 0 : 0, g, (b, d) => h.slice(0, d).join(" ").replace(/- /g, "-")), d = a.actualWidth, b++; z.forEach(b => { e.insertBefore(b, c) }); l.forEach(b => { e.insertBefore(r.createTextNode(b), c); b = r.createElementNS(y, "tspan"); b.textContent = "\u200b"; F(b, { dy: u, x: f }); e.insertBefore(b, c) })
                            }
                        }, n = c => { [].slice.call(c.childNodes).forEach(e => { e.nodeType === A.Node.TEXT_NODE ? k(e, c) : (-1 !== e.className.baseVal.indexOf("highcharts-br") && (a.actualWidth = 0), n(e)) }) }; n(a.element)
                    }
            } getLineHeight(a) { a = a.nodeType === A.Node.TEXT_NODE ? a.parentElement : a; return this.textLineHeight ? parseInt(this.textLineHeight.toString(), 10) : this.renderer.fontMetrics(a || this.svgElement.element).h } modifyTree(a) {
                const f =
                    (c, g) => {
                        const { attributes: h = {}, children: k, style: n = {}, tagName: e } = c, l = this.renderer.styledMode; if ("b" === e || "strong" === e) l ? h["class"] = "highcharts-strong" : n.fontWeight = "bold"; else if ("i" === e || "em" === e) l ? h["class"] = "highcharts-emphasized" : n.fontStyle = "italic"; n && n.color && (n.fill = n.color); "br" === e ? (h["class"] = "highcharts-br", c.textContent = "\u200b", (g = a[g + 1]) && g.textContent && (g.textContent = g.textContent.replace(/^ +/gm, ""))) : "a" === e && k && k.some(e => "#text" === e.tagName) && (c.children = [{ children: k, tagName: "tspan" }]);
                        "#text" !== e && "a" !== e && (c.tagName = "tspan"); D(c, { attributes: h, style: n }); k && k.filter(e => "#text" !== e.tagName).forEach(f)
                    }; a.forEach(f); t(this.svgElement, "afterModifyTree", { nodes: a })
            } truncate(a, f, c, g, k, n) {
                const h = this.svgElement, { rotation: e } = h, l = []; let v = c ? 1 : 0, z = (f || c || "").length, u = z, b, d; const m = function (b, d) { b = d || b; if ((d = a.parentNode) && "undefined" === typeof l[b] && d.getSubStringLength) try { l[b] = g + d.getSubStringLength(0, c ? b + 1 : b) } catch (H) { "" } return l[b] }; h.rotation = 0; d = m(a.textContent.length); if (g + d > k) {
                    for (; v <=
                        z;)u = Math.ceil((v + z) / 2), c && (b = n(c, u)), d = m(u, b && b.length - 1), v === z ? v = z + 1 : d > k ? z = u - 1 : v = u; 0 === z ? a.textContent = "" : f && z === f.length - 1 || (a.textContent = b || n(f || c, u))
                } c && c.splice(0, u); h.actualWidth = d; h.rotation = e
            } unescapeEntities(a, f) { k(this.renderer.escapes, function (c, g) { f && -1 !== f.indexOf(c) || (a = a.toString().replace(new RegExp(c, "g"), g)) }); return a }
        } return n
    }); K(a, "Core/Renderer/SVG/SVGRenderer.js", [a["Core/Renderer/HTML/AST.js"], a["Core/Color/Color.js"], a["Core/Globals.js"], a["Core/Renderer/RendererRegistry.js"],
    a["Core/Renderer/SVG/SVGElement.js"], a["Core/Renderer/SVG/SVGLabel.js"], a["Core/Renderer/SVG/Symbols.js"], a["Core/Renderer/SVG/TextBuilder.js"], a["Core/Utilities.js"]], function (a, x, G, I, y, A, F, D, t) {
        const { charts: q, deg2rad: k, doc: p, isFirefox: n, isMS: h, isWebKit: f, noop: c, SVG_NS: g, symbolSizes: B, win: C } = G, { addEvent: E, attr: e, createElement: l, css: v, defined: z, destroyObjectProperties: u, extend: b, isArray: d, isNumber: m, isObject: w, isString: M, merge: H, pick: N, pInt: r, uniqueKey: P } = t; let Y; class R {
            constructor(b, d, e, c, m, l,
                a) { this.width = this.url = this.style = this.imgCount = this.height = this.gradients = this.globalAnimation = this.defs = this.chartIndex = this.cacheKeys = this.cache = this.boxWrapper = this.box = this.alignedObjects = void 0; this.init(b, d, e, c, m, l, a) } init(b, d, c, m, l, a, g) {
                    const f = this.createElement("svg").attr({ version: "1.1", "class": "highcharts-root" }), w = f.element; g || f.css(this.getStyle(m)); b.appendChild(w); e(b, "dir", "ltr"); -1 === b.innerHTML.indexOf("xmlns") && e(w, "xmlns", this.SVG_NS); this.box = w; this.boxWrapper = f; this.alignedObjects =
                        []; this.url = this.getReferenceURL(); this.createElement("desc").add().element.appendChild(p.createTextNode("Created with Highcharts 11.1.0")); this.defs = this.createElement("defs").add(); this.allowHTML = a; this.forExport = l; this.styledMode = g; this.gradients = {}; this.cache = {}; this.cacheKeys = []; this.imgCount = 0; this.rootFontSize = f.getStyle("font-size"); this.setSize(d, c, !1); let J; n && b.getBoundingClientRect && (d = function () {
                            v(b, { left: 0, top: 0 }); J = b.getBoundingClientRect(); v(b, {
                                left: Math.ceil(J.left) - J.left + "px", top: Math.ceil(J.top) -
                                    J.top + "px"
                            })
                        }, d(), this.unSubPixelFix = E(C, "resize", d))
                } definition(b) { return (new a([b])).addToDOM(this.defs.element) } getReferenceURL() {
                    if ((n || f) && p.getElementsByTagName("base").length) {
                        if (!z(Y)) {
                            var b = P(); b = (new a([{ tagName: "svg", attributes: { width: 8, height: 8 }, children: [{ tagName: "defs", children: [{ tagName: "clipPath", attributes: { id: b }, children: [{ tagName: "rect", attributes: { width: 4, height: 4 } }] }] }, { tagName: "rect", attributes: { id: "hitme", width: 8, height: 8, "clip-path": `url(#${b})`, fill: "rgba(0,0,0,0.001)" } }] }])).addToDOM(p.body);
                            v(b, { position: "fixed", top: 0, left: 0, zIndex: 9E5 }); const d = p.elementFromPoint(6, 6); Y = "hitme" === (d && d.id); p.body.removeChild(b)
                        } if (Y) return C.location.href.split("#")[0].replace(/<[^>]*>/g, "").replace(/([\('\)])/g, "\\$1").replace(/ /g, "%20")
                    } return ""
                } getStyle(d) { return this.style = b({ fontFamily: "Helvetica, Arial, sans-serif", fontSize: "1rem" }, d) } setStyle(b) { this.boxWrapper.css(this.getStyle(b)) } isHidden() { return !this.boxWrapper.getBBox().width } destroy() {
                    const b = this.defs; this.box = null; this.boxWrapper = this.boxWrapper.destroy();
                    u(this.gradients || {}); this.gradients = null; this.defs = b.destroy(); this.unSubPixelFix && this.unSubPixelFix(); return this.alignedObjects = null
                } createElement(b) { const d = new this.Element; d.init(this, b); return d } getRadialAttr(b, d) { return { cx: b[0] - b[2] / 2 + (d.cx || 0) * b[2], cy: b[1] - b[2] / 2 + (d.cy || 0) * b[2], r: (d.r || 0) * b[2] } } shadowDefinition(b) {
                    const d = [`highcharts-drop-shadow-${this.chartIndex}`, ...Object.keys(b).map(d => b[d])].join("-").replace(/[^a-z0-9\-]/g, ""), e = H({
                        color: "#000000", offsetX: 1, offsetY: 1, opacity: .15,
                        width: 5
                    }, b); this.defs.element.querySelector(`#${d}`) || this.definition({ tagName: "filter", attributes: { id: d }, children: [{ tagName: "feDropShadow", attributes: { dx: e.offsetX, dy: e.offsetY, "flood-color": e.color, "flood-opacity": Math.min(5 * e.opacity, 1), stdDeviation: e.width / 2 } }] }); return d
                } buildText(b) { (new D(b)).buildSVG() } getContrast(b) { b = x.parse(b).rgba.map(b => { b /= 255; return .03928 >= b ? b / 12.92 : Math.pow((b + .055) / 1.055, 2.4) }); b = .2126 * b[0] + .7152 * b[1] + .0722 * b[2]; return 1.05 / (b + .05) > (b + .05) / .05 ? "#FFFFFF" : "#000000" } button(d,
                    e, c, m, l = {}, g, f, z, u, v) {
                        const J = this.label(d, e, c, u, void 0, void 0, v, void 0, "button"), k = this.styledMode; d = l.states || {}; let L = 0; l = H(l); delete l.states; const n = H({ color: "#333333", cursor: "pointer", fontSize: "0.8em", fontWeight: "normal" }, l.style); delete l.style; let B = a.filterUserAttributes(l); J.attr(H({ padding: 8, r: 2 }, B)); let C, M, p; k || (B = H({ fill: "#f7f7f7", stroke: "#cccccc", "stroke-width": 1 }, B), g = H(B, { fill: "#e6e6e6" }, a.filterUserAttributes(g || d.hover || {})), C = g.style, delete g.style, f = H(B, {
                            fill: "#e6e9ff", style: {
                                color: "#000000",
                                fontWeight: "bold"
                            }
                        }, a.filterUserAttributes(f || d.select || {})), M = f.style, delete f.style, z = H(B, { style: { color: "#cccccc" } }, a.filterUserAttributes(z || d.disabled || {})), p = z.style, delete z.style); E(J.element, h ? "mouseover" : "mouseenter", function () { 3 !== L && J.setState(1) }); E(J.element, h ? "mouseout" : "mouseleave", function () { 3 !== L && J.setState(L) }); J.setState = function (b) {
                            1 !== b && (J.state = L = b); J.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-" + ["normal", "hover", "pressed",
                                "disabled"][b || 0]); k || (J.attr([B, g, f, z][b || 0]), b = [n, C, M, p][b || 0], w(b) && J.css(b))
                        }; k || (J.attr(B).css(b({ cursor: "default" }, n)), v && J.text.css({ pointerEvents: "none" })); return J.on("touchstart", b => b.stopPropagation()).on("click", function (b) { 3 !== L && m.call(J, b) })
            } crispLine(b, d, e = "round") { const c = b[0], m = b[1]; z(c[1]) && c[1] === m[1] && (c[1] = m[1] = Math[e](c[1]) - d % 2 / 2); z(c[2]) && c[2] === m[2] && (c[2] = m[2] = Math[e](c[2]) + d % 2 / 2); return b } path(e) { const c = this.styledMode ? {} : { fill: "none" }; d(e) ? c.d = e : w(e) && b(c, e); return this.createElement("path").attr(c) } circle(b,
                d, e) { b = w(b) ? b : "undefined" === typeof b ? {} : { x: b, y: d, r: e }; d = this.createElement("circle"); d.xSetter = d.ySetter = function (b, d, e) { e.setAttribute("c" + d, b) }; return d.attr(b) } arc(b, d, e, c, m, l) { w(b) ? (c = b, d = c.y, e = c.r, b = c.x) : c = { innerR: c, start: m, end: l }; b = this.symbol("arc", b, d, e, e, c); b.r = e; return b } rect(d, c, m, l, a, g) {
                    d = w(d) ? d : "undefined" === typeof d ? {} : { x: d, y: c, r: a, width: Math.max(m || 0, 0), height: Math.max(l || 0, 0) }; const f = this.createElement("rect"); this.styledMode || ("undefined" !== typeof g && (d["stroke-width"] = g, b(d, f.crisp(d))),
                        d.fill = "none"); f.rSetter = function (b, d, c) { f.r = b; e(c, { rx: b, ry: b }) }; f.rGetter = function () { return f.r || 0 }; return f.attr(d)
                } roundedRect(b) { return this.symbol("roundedRect").attr(b) } setSize(b, d, e) { this.width = b; this.height = d; this.boxWrapper.animate({ width: b, height: d }, { step: function () { this.attr({ viewBox: "0 0 " + this.attr("width") + " " + this.attr("height") }) }, duration: N(e, !0) ? void 0 : 0 }); this.alignElements() } g(b) { const d = this.createElement("g"); return b ? d.attr({ "class": "highcharts-" + b }) : d } image(b, d, e, c, l, a) {
                    const g =
                        { preserveAspectRatio: "none" }; m(d) && (g.x = d); m(e) && (g.y = e); m(c) && (g.width = c); m(l) && (g.height = l); const f = this.createElement("image").attr(g); d = function (d) { f.attr({ href: b }); a.call(f, d) }; a ? (f.attr({ href: "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" }), e = new C.Image, E(e, "load", d), e.src = b, e.complete && d({})) : f.attr({ href: b }); return f
                } symbol(d, c, m, a, g, f) {
                    const w = this, u = /^url\((.*?)\)$/, h = u.test(d), J = !h && (this.symbols[d] ? d : "circle"), k = J && this.symbols[J]; let n, H, C, M; if (k) "number" ===
                        typeof c && (H = k.call(this.symbols, Math.round(c || 0), Math.round(m || 0), a || 0, g || 0, f)), n = this.path(H), w.styledMode || n.attr("fill", "none"), b(n, { symbolName: J || void 0, x: c, y: m, width: a, height: g }), f && b(n, f); else if (h) {
                            C = d.match(u)[1]; const b = n = this.image(C); b.imgwidth = N(f && f.width, B[C] && B[C].width); b.imgheight = N(f && f.height, B[C] && B[C].height); M = b => b.attr({ width: b.width, height: b.height });["width", "height"].forEach(function (d) {
                                b[d + "Setter"] = function (b, d) {
                                    this[d] = b; const { alignByTranslate: c, element: m, width: l, height: a,
                                        imgwidth: g, imgheight: w } = this; b = this["img" + d]; if (z(b)) { let z = 1; f && "within" === f.backgroundSize && l && a ? (z = Math.min(l / g, a / w), e(m, { width: Math.round(g * z), height: Math.round(w * z) })) : m && m.setAttribute(d, b); c || this.translate(((l || 0) - g * z) / 2, ((a || 0) - w * z) / 2) }
                                }
                            }); z(c) && b.attr({ x: c, y: m }); b.isImg = !0; z(b.imgwidth) && z(b.imgheight) ? M(b) : (b.attr({ width: 0, height: 0 }), l("img", {
                                onload: function () {
                                    const d = q[w.chartIndex]; 0 === this.width && (v(this, { position: "absolute", top: "-999em" }), p.body.appendChild(this)); B[C] = {
                                        width: this.width,
                                        height: this.height
                                    }; b.imgwidth = this.width; b.imgheight = this.height; b.element && M(b); this.parentNode && this.parentNode.removeChild(this); w.imgCount--; if (!w.imgCount && d && !d.hasLoaded) d.onload()
                                }, src: C
                            }), this.imgCount++)
                        } return n
                } clipRect(b, d, e, c) { const m = P() + "-", l = this.createElement("clipPath").attr({ id: m }).add(this.defs); b = this.rect(b, d, e, c, 0).add(l); b.id = m; b.clipPath = l; b.count = 0; return b } text(b, d, e, c) {
                    const m = {}; if (c && (this.allowHTML || !this.forExport)) return this.html(b, d, e); m.x = Math.round(d || 0); e &&
                        (m.y = Math.round(e)); z(b) && (m.text = b); b = this.createElement("text").attr(m); if (!c || this.forExport && !this.allowHTML) b.xSetter = function (b, d, e) { const c = e.getElementsByTagName("tspan"), m = e.getAttribute(d); for (let e = 0, l; e < c.length; e++)l = c[e], l.getAttribute(d) === m && l.setAttribute(d, b); e.setAttribute(d, b) }; return b
                } fontMetrics(b) { b = r(y.prototype.getStyle.call(b, "font-size") || 0); const d = 24 > b ? b + 3 : Math.round(1.2 * b); return { h: d, b: Math.round(.8 * d), f: b } } rotCorr(b, d, e) {
                    let c = b; d && e && (c = Math.max(c * Math.cos(d * k), 4));
                    return { x: -b / 3 * Math.sin(d * k), y: c }
                } pathToSegments(b) { const d = [], e = [], c = { A: 8, C: 7, H: 2, L: 3, M: 3, Q: 5, S: 5, T: 3, V: 2 }; for (let l = 0; l < b.length; l++)M(e[0]) && m(b[l]) && e.length === c[e[0].toUpperCase()] && b.splice(l, 0, e[0].replace("M", "L").replace("m", "l")), "string" === typeof b[l] && (e.length && d.push(e.slice(0)), e.length = 0), e.push(b[l]); d.push(e.slice(0)); return d } label(b, d, e, c, m, l, a, g, f) { return new A(this, b, d, e, c, m, l, a, g, f) } alignElements() { this.alignedObjects.forEach(b => b.align()) }
        } b(R.prototype, {
            Element: y, SVG_NS: g,
            escapes: { "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }, symbols: F, draw: c
        }); I.registerRendererType("svg", R, !0); ""; return R
    }); K(a, "Core/Renderer/HTML/HTMLElement.js", [a["Core/Globals.js"], a["Core/Renderer/SVG/SVGElement.js"], a["Core/Utilities.js"]], function (a, x, G) {
        const { isFirefox: r, isMS: y, isWebKit: A, win: F } = a, { css: D, defined: t, extend: q, pick: k, pInt: p } = G, n = []; class h extends x {
            static compose(a) {
                if (G.pushUnique(n, a)) {
                    const c = h.prototype, g = a.prototype; g.getSpanCorrection = c.getSpanCorrection;
                    g.htmlCss = c.htmlCss; g.htmlGetBBox = c.htmlGetBBox; g.htmlUpdateTransform = c.htmlUpdateTransform; g.setSpanRotation = c.setSpanRotation
                } return a
            } getSpanCorrection(a, c, g) { this.xCorr = -a * g; this.yCorr = -c } htmlCss(a) { const c = "SPAN" === this.element.tagName && a && "width" in a, g = k(c && a.width, void 0); let f; c && (delete a.width, this.textWidth = g, f = !0); a && "ellipsis" === a.textOverflow && (a.whiteSpace = "nowrap", a.overflow = "hidden"); this.styles = q(this.styles, a); D(this.element, a); f && this.htmlUpdateTransform(); return this } htmlGetBBox() {
                const a =
                    this.element; return { x: a.offsetLeft, y: a.offsetTop, width: a.offsetWidth, height: a.offsetHeight }
            } htmlUpdateTransform() {
                if (this.added) {
                    var a = this.renderer, c = this.element, g = this.x || 0, h = this.y || 0, k = this.textAlign || "left", n = { left: 0, center: .5, right: 1 }[k], e = this.styles, l = e && e.whiteSpace; D(c, { marginLeft: this.translateX || 0, marginTop: this.translateY || 0 }); if ("SPAN" === c.tagName) {
                        e = this.rotation; const f = this.textWidth && p(this.textWidth), u = [e, k, c.innerHTML, this.textWidth, this.textAlign].join(); let b = !1; if (f !== this.oldTextWidth) {
                            if (this.textPxLength) var v =
                                this.textPxLength; else D(c, { width: "", whiteSpace: l || "nowrap" }), v = c.offsetWidth; (f > this.oldTextWidth || v > f) && (/[ \-]/.test(c.textContent || c.innerText) || "ellipsis" === c.style.textOverflow) && (D(c, { width: v > f || e ? f + "px" : "auto", display: "block", whiteSpace: l || "normal" }), this.oldTextWidth = f, b = !0)
                        } this.hasBoxWidthChanged = b; u !== this.cTT && (a = a.fontMetrics(c).b, !t(e) || e === (this.oldRotation || 0) && k === this.oldAlign || this.setSpanRotation(e, n, a), this.getSpanCorrection(!t(e) && this.textPxLength || c.offsetWidth, a, n, e, k));
                        D(c, { left: g + (this.xCorr || 0) + "px", top: h + (this.yCorr || 0) + "px" }); this.cTT = u; this.oldRotation = e; this.oldAlign = k
                    }
                } else this.alignOnAdd = !0
            } setSpanRotation(a, c, g) { const f = {}, h = y && !/Edge/.test(F.navigator.userAgent) ? "-ms-transform" : A ? "-webkit-transform" : r ? "MozTransform" : F.opera ? "-o-transform" : void 0; h && (f[h] = f.transform = "rotate(" + a + "deg)", f[h + (r ? "Origin" : "-origin")] = f.transformOrigin = 100 * c + "% " + g + "px", D(this.element, f)) }
        } return h
    }); K(a, "Core/Renderer/HTML/HTMLRenderer.js", [a["Core/Renderer/HTML/AST.js"],
    a["Core/Renderer/SVG/SVGElement.js"], a["Core/Renderer/SVG/SVGRenderer.js"], a["Core/Utilities.js"]], function (a, x, G, I) {
        const { attr: r, createElement: A, extend: F, pick: D } = I, t = []; class q extends G {
            static compose(a) { I.pushUnique(t, a) && (a.prototype.html = q.prototype.html); return a } html(k, p, n) {
                const h = this.createElement("span"), f = h.element, c = h.renderer, g = function (c, a) {
                    ["opacity", "visibility"].forEach(function (g) {
                        c[g + "Setter"] = function (e, l, f) {
                            const z = c.div ? c.div.style : a; x.prototype[g + "Setter"].call(this, e, l, f);
                            z && (z[l] = e)
                        }
                    }); c.addedSetters = !0
                }; h.textSetter = function (c) { c !== this.textStr && (delete this.bBox, delete this.oldTextWidth, a.setElementHTML(this.element, D(c, "")), this.textStr = c, h.doTransform = !0) }; g(h, h.element.style); h.xSetter = h.ySetter = h.alignSetter = h.rotationSetter = function (c, a) { "align" === a ? h.alignValue = h.textAlign = c : h[a] = c; h.doTransform = !0 }; h.afterSetters = function () { this.doTransform && (this.htmlUpdateTransform(), this.doTransform = !1) }; h.attr({ text: k, x: Math.round(p), y: Math.round(n) }).css({ position: "absolute" });
                c.styledMode || h.css({ fontFamily: this.style.fontFamily, fontSize: this.style.fontSize }); f.style.whiteSpace = "nowrap"; h.css = h.htmlCss; h.add = function (a) {
                    const k = c.box.parentNode, n = []; let e; if (this.parentGroup = a) {
                        if (e = a.div, !e) {
                            for (; a;)n.push(a), a = a.parentGroup; n.reverse().forEach(function (c) {
                                function a(d, e) { c[e] = d; "translateX" === e ? b.left = d + "px" : b.top = d + "px"; c.doTransform = !0 } const l = r(c.element, "class"), f = c.styles || {}; e = c.div = c.div || A("div", l ? { className: l } : void 0, {
                                    position: "absolute", left: (c.translateX ||
                                        0) + "px", top: (c.translateY || 0) + "px", display: c.display, opacity: c.opacity, visibility: c.visibility
                                }, e || k); const b = e.style; F(c, { classSetter: function (b) { return function (d) { this.element.setAttribute("class", d); b.className = d } }(e), css: function (d) { h.css.call(c, d);["cursor", "pointerEvents"].forEach(e => { d[e] && (b[e] = d[e]) }); return c }, on: function () { n[0].div && h.on.apply({ element: n[0].div, onEvents: c.onEvents }, arguments); return c }, translateXSetter: a, translateYSetter: a }); c.addedSetters || g(c); c.css(f)
                            })
                        }
                    } else e = k; e.appendChild(f);
                    h.added = !0; h.alignOnAdd && h.htmlUpdateTransform(); return h
                }; return h
            }
        } return q
    }); K(a, "Core/Axis/AxisDefaults.js", [], function () {
        var a; (function (a) {
            a.defaultXAxisOptions = {
                alignTicks: !0, allowDecimals: void 0, panningEnabled: !0, zIndex: 2, zoomEnabled: !0, dateTimeLabelFormats: { millisecond: { main: "%H:%M:%S.%L", range: !1 }, second: { main: "%H:%M:%S", range: !1 }, minute: { main: "%H:%M", range: !1 }, hour: { main: "%H:%M", range: !1 }, day: { main: "%e %b" }, week: { main: "%e %b" }, month: { main: "%b '%y" }, year: { main: "%Y" } }, endOnTick: !1, gridLineDashStyle: "Solid",
                gridZIndex: 1, labels: { autoRotation: void 0, autoRotationLimit: 80, distance: 15, enabled: !0, indentation: 10, overflow: "justify", padding: 5, reserveSpace: void 0, rotation: void 0, staggerLines: 0, step: 0, useHTML: !1, zIndex: 7, style: { color: "#333333", cursor: "default", fontSize: "0.8em" } }, maxPadding: .01, minorGridLineDashStyle: "Solid", minorTickLength: 2, minorTickPosition: "outside", minorTicksPerMajor: 5, minPadding: .01, offset: void 0, opposite: !1, reversed: void 0, reversedStacks: !1, showEmpty: !0, showFirstLabel: !0, showLastLabel: !0,
                startOfWeek: 1, startOnTick: !1, tickLength: 10, tickPixelInterval: 100, tickmarkPlacement: "between", tickPosition: "outside", title: { align: "middle", rotation: 0, useHTML: !1, x: 0, y: 0, style: { color: "#666666", fontSize: "0.8em" } }, type: "linear", uniqueNames: !0, visible: !0, minorGridLineColor: "#f2f2f2", minorGridLineWidth: 1, minorTickColor: "#999999", lineColor: "#333333", lineWidth: 1, gridLineColor: "#e6e6e6", gridLineWidth: void 0, tickColor: "#333333"
            }; a.defaultYAxisOptions = {
                reversedStacks: !0, endOnTick: !0, maxPadding: .05, minPadding: .05,
                tickPixelInterval: 72, showLastLabel: !0, labels: { x: void 0 }, startOnTick: !0, title: { rotation: 270, text: "Values" }, stackLabels: { animation: {}, allowOverlap: !1, enabled: !1, crop: !0, overflow: "justify", formatter: function () { const { numberFormatter: a } = this.axis.chart; return a(this.total || 0, -1) }, style: { color: "#000000", fontSize: "0.7em", fontWeight: "bold", textOutline: "1px contrast" } }, gridLineWidth: 1, lineWidth: 0
            }; a.defaultLeftAxisOptions = { title: { rotation: 270 } }; a.defaultRightAxisOptions = { title: { rotation: 90 } }; a.defaultBottomAxisOptions =
                { labels: { autoRotation: [-45] }, margin: 15, title: { rotation: 0 } }; a.defaultTopAxisOptions = { labels: { autoRotation: [-45] }, margin: 15, title: { rotation: 0 } }
        })(a || (a = {})); return a
    }); K(a, "Core/Foundation.js", [a["Core/Utilities.js"]], function (a) {
        const { addEvent: r, isFunction: G, objectEach: I, removeEvent: y } = a; var A; (function (a) {
            a.registerEventOptions = function (a, t) {
                a.eventOptions = a.eventOptions || {}; I(t.events, function (q, k) {
                    a.eventOptions[k] !== q && (a.eventOptions[k] && (y(a, k, a.eventOptions[k]), delete a.eventOptions[k]), G(q) &&
                        (a.eventOptions[k] = q, r(a, k, q, { order: 0 })))
                })
            }
        })(A || (A = {})); return A
    }); K(a, "Core/Axis/Tick.js", [a["Core/Templating.js"], a["Core/Globals.js"], a["Core/Utilities.js"]], function (a, x, G) {
        const { deg2rad: r } = x, { clamp: y, correctFloat: A, defined: F, destroyObjectProperties: D, extend: t, fireEvent: q, isNumber: k, merge: p, objectEach: n, pick: h } = G; class f {
            constructor(c, a, f, h, k) {
                this.isNewLabel = this.isNew = !0; this.axis = c; this.pos = a; this.type = f || ""; this.parameters = k || {}; this.tickmarkOffset = this.parameters.tickmarkOffset; this.options =
                    this.parameters.options; q(this, "init"); f || h || this.addLabel()
            } addLabel() {
                const c = this, g = c.axis; var f = g.options; const n = g.chart; var p = g.categories; const e = g.logarithmic, l = g.names, v = c.pos, z = h(c.options && c.options.labels, f.labels); var u = g.tickPositions; const b = v === u[0], d = v === u[u.length - 1], m = (!z.step || 1 === z.step) && 1 === g.tickInterval; u = u.info; let w = c.label, M, H, N; p = this.parameters.category || (p ? h(p[v], l[v], v) : v); e && k(p) && (p = A(e.lin2log(p))); g.dateTime && (u ? (H = n.time.resolveDTLFormat(f.dateTimeLabelFormats[!f.grid &&
                    u.higherRanks[v] || u.unitName]), M = H.main) : k(p) && (M = g.dateTime.getXDateFormat(p, f.dateTimeLabelFormats || {}))); c.isFirst = b; c.isLast = d; const r = { axis: g, chart: n, dateTimeLabelFormat: M, isFirst: b, isLast: d, pos: v, tick: c, tickPositionInfo: u, value: p }; q(this, "labelFormat", r); const D = b => z.formatter ? z.formatter.call(b, b) : z.format ? (b.text = g.defaultLabelFormatter.call(b, b), a.format(z.format, b, n)) : g.defaultLabelFormatter.call(b, b); f = D.call(r, r); const y = H && H.list; c.shortenLabel = y ? function () {
                        for (N = 0; N < y.length; N++)if (t(r,
                            { dateTimeLabelFormat: y[N] }), w.attr({ text: D.call(r, r) }), w.getBBox().width < g.getSlotWidth(c) - 2 * z.padding) return; w.attr({ text: "" })
                    } : void 0; m && g._addedPlotLB && c.moveLabel(f, z); F(w) || c.movedLabel ? w && w.textStr !== f && !m && (!w.textWidth || z.style.width || w.styles.width || w.css({ width: null }), w.attr({ text: f }), w.textPxLength = w.getBBox().width) : (c.label = w = c.createLabel({ x: 0, y: 0 }, f, z), c.rotation = 0)
            } createLabel(c, a, f) {
                const g = this.axis, h = g.chart; if (c = F(a) && f.enabled ? h.renderer.text(a, c.x, c.y, f.useHTML).add(g.labelGroup) :
                    null) h.styledMode || c.css(p(f.style)), c.textPxLength = c.getBBox().width; return c
            } destroy() { D(this, this.axis) } getPosition(c, a, f, h) { const g = this.axis, e = g.chart, l = h && e.oldChartHeight || e.chartHeight; c = { x: c ? A(g.translate(a + f, void 0, void 0, h) + g.transB) : g.left + g.offset + (g.opposite ? (h && e.oldChartWidth || e.chartWidth) - g.right - g.left : 0), y: c ? l - g.bottom + g.offset - (g.opposite ? g.height : 0) : A(l - g.translate(a + f, void 0, void 0, h) - g.transB) }; c.y = y(c.y, -1E5, 1E5); q(this, "afterGetPosition", { pos: c }); return c } getLabelPosition(c,
                a, f, k, n, e, l, v) {
                    const g = this.axis, u = g.transA, b = g.isLinked && g.linkedParent ? g.linkedParent.reversed : g.reversed, d = g.staggerLines, m = g.tickRotCorr || { x: 0, y: 0 }, w = k || g.reserveSpaceDefault ? 0 : -g.labelOffset * ("center" === g.labelAlign ? .5 : 1), B = n.distance, H = {}; f = 0 === g.side ? f.rotation ? -B : -f.getBBox().height : 2 === g.side ? m.y + B : Math.cos(f.rotation * r) * (m.y - f.getBBox(!1, 0).height / 2); F(n.y) && (f = 0 === g.side && g.horiz ? n.y + f : n.y); c = c + h(n.x, [0, 1, 0, -1][g.side] * B) + w + m.x - (e && k ? e * u * (b ? -1 : 1) : 0); a = a + f - (e && !k ? e * u * (b ? 1 : -1) : 0); d && (k = l /
                        (v || 1) % d, g.opposite && (k = d - k - 1), a += g.labelOffset / d * k); H.x = c; H.y = Math.round(a); q(this, "afterGetLabelPosition", { pos: H, tickmarkOffset: e, index: l }); return H
            } getLabelSize() { return this.label ? this.label.getBBox()[this.axis.horiz ? "height" : "width"] : 0 } getMarkPath(c, a, f, h, k, e) { return e.crispLine([["M", c, a], ["L", c + (k ? 0 : -f), a + (k ? f : 0)]], h) } handleOverflow(c) {
                const a = this.axis, f = a.options.labels, k = c.x; var n = a.chart.chartWidth, e = a.chart.spacing; const l = h(a.labelLeft, Math.min(a.pos, e[3])); e = h(a.labelRight, Math.max(a.isRadial ?
                    0 : a.pos + a.len, n - e[1])); const v = this.label, z = this.rotation, u = { left: 0, center: .5, right: 1 }[a.labelAlign || v.attr("align")], b = v.getBBox().width, d = a.getSlotWidth(this), m = {}; let w = d, p = 1, H; if (z || "justify" !== f.overflow) 0 > z && k - u * b < l ? H = Math.round(k / Math.cos(z * r) - l) : 0 < z && k + u * b > e && (H = Math.round((n - k) / Math.cos(z * r))); else if (n = k + (1 - u) * b, k - u * b < l ? w = c.x + w * (1 - u) - l : n > e && (w = e - c.x + w * u, p = -1), w = Math.min(d, w), w < d && "center" === a.labelAlign && (c.x += p * (d - w - u * (d - Math.min(b, w)))), b > w || a.autoRotation && (v.styles || {}).width) H = w; H &&
                        (this.shortenLabel ? this.shortenLabel() : (m.width = Math.floor(H) + "px", (f.style || {}).textOverflow || (m.textOverflow = "ellipsis"), v.css(m)))
            } moveLabel(c, a) { const f = this; var g = f.label; const h = f.axis; let e = !1; g && g.textStr === c ? (f.movedLabel = g, e = !0, delete f.label) : n(h.ticks, function (a) { e || a.isNew || a === f || !a.label || a.label.textStr !== c || (f.movedLabel = a.label, e = !0, a.labelPos = f.movedLabel.xy, delete a.label) }); e || !f.labelPos && !g || (g = f.labelPos || g.xy, f.movedLabel = f.createLabel(g, c, a), f.movedLabel && f.movedLabel.attr({ opacity: 0 })) } render(c,
                a, f) { var g = this.axis, k = g.horiz, e = this.pos, l = h(this.tickmarkOffset, g.tickmarkOffset); e = this.getPosition(k, e, l, a); l = e.x; const v = e.y; g = k && l === g.pos + g.len || !k && v === g.pos ? -1 : 1; k = h(f, this.label && this.label.newOpacity, 1); f = h(f, 1); this.isActive = !0; this.renderGridLine(a, f, g); this.renderMark(e, f, g); this.renderLabel(e, a, k, c); this.isNew = !1; q(this, "afterRender") } renderGridLine(c, a, f) {
                    const g = this.axis, k = g.options, e = {}, l = this.pos, v = this.type, z = h(this.tickmarkOffset, g.tickmarkOffset), u = g.chart.renderer; let b = this.gridLine,
                        d = k.gridLineWidth, m = k.gridLineColor, w = k.gridLineDashStyle; "minor" === this.type && (d = k.minorGridLineWidth, m = k.minorGridLineColor, w = k.minorGridLineDashStyle); b || (g.chart.styledMode || (e.stroke = m, e["stroke-width"] = d || 0, e.dashstyle = w), v || (e.zIndex = 1), c && (a = 0), this.gridLine = b = u.path().attr(e).addClass("highcharts-" + (v ? v + "-" : "") + "grid-line").add(g.gridGroup)); if (b && (f = g.getPlotLinePath({ value: l + z, lineWidth: b.strokeWidth() * f, force: "pass", old: c, acrossPanes: !1 }))) b[c || this.isNew ? "attr" : "animate"]({ d: f, opacity: a })
                } renderMark(c,
                    a, f) {
                        const g = this.axis; var k = g.options; const e = g.chart.renderer, l = this.type, v = g.tickSize(l ? l + "Tick" : "tick"), z = c.x; c = c.y; const u = h(k["minor" !== l ? "tickWidth" : "minorTickWidth"], !l && g.isXAxis ? 1 : 0); k = k["minor" !== l ? "tickColor" : "minorTickColor"]; let b = this.mark; const d = !b; v && (g.opposite && (v[0] = -v[0]), b || (this.mark = b = e.path().addClass("highcharts-" + (l ? l + "-" : "") + "tick").add(g.axisGroup), g.chart.styledMode || b.attr({ stroke: k, "stroke-width": u })), b[d ? "attr" : "animate"]({
                            d: this.getMarkPath(z, c, v[0], b.strokeWidth() *
                                f, g.horiz, e), opacity: a
                        }))
            } renderLabel(c, a, f, n) {
                var g = this.axis; const e = g.horiz, l = g.options, v = this.label, z = l.labels, u = z.step; g = h(this.tickmarkOffset, g.tickmarkOffset); const b = c.x; c = c.y; let d = !0; v && k(b) && (v.xy = c = this.getLabelPosition(b, c, v, e, z, g, n, u), this.isFirst && !this.isLast && !l.showFirstLabel || this.isLast && !this.isFirst && !l.showLastLabel ? d = !1 : !e || z.step || z.rotation || a || 0 === f || this.handleOverflow(c), u && n % u && (d = !1), d && k(c.y) ? (c.opacity = f, v[this.isNewLabel ? "attr" : "animate"](c).show(!0), this.isNewLabel =
                    !1) : (v.hide(), this.isNewLabel = !0))
            } replaceMovedLabel() { const c = this.label, a = this.axis; c && !this.isNew && (c.animate({ opacity: 0 }, void 0, c.destroy), delete this.label); a.isDirty = !0; this.label = this.movedLabel; delete this.movedLabel }
        } ""; return f
    }); K(a, "Core/Axis/Axis.js", [a["Core/Animation/AnimationUtilities.js"], a["Core/Axis/AxisDefaults.js"], a["Core/Color/Color.js"], a["Core/Defaults.js"], a["Core/Foundation.js"], a["Core/Globals.js"], a["Core/Axis/Tick.js"], a["Core/Utilities.js"]], function (a, x, G, I, y, A, F, D) {
        const { animObject: t } =
            a, { defaultOptions: q } = I, { registerEventOptions: k } = y, { deg2rad: p } = A, { arrayMax: n, arrayMin: h, clamp: f, correctFloat: c, defined: g, destroyObjectProperties: B, erase: C, error: E, extend: e, fireEvent: l, getClosestDistance: v, insertItem: z, isArray: u, isNumber: b, isString: d, merge: m, normalizeTickInterval: w, objectEach: M, pick: H, relativeLength: N, removeEvent: r, splat: P, syncTimeout: Y } = D, R = (b, d) => w(d, void 0, void 0, H(b.options.allowDecimals, .5 > d || void 0 !== b.tickAmount), !!b.tickAmount); class W {
                constructor(b, d, e) {
                    this.zoomEnabled = this.width =
                        this.visible = this.userOptions = this.translationSlope = this.transB = this.transA = this.top = this.ticks = this.tickRotCorr = this.tickPositions = this.tickmarkOffset = this.tickInterval = this.tickAmount = this.side = this.series = this.right = this.positiveValuesOnly = this.pos = this.pointRangePadding = this.pointRange = this.plotLinesAndBandsGroups = this.plotLinesAndBands = this.paddedTicks = this.overlap = this.options = this.offset = this.names = this.minPixelPadding = this.minorTicks = this.minorTickInterval = this.min = this.maxLabelLength = this.max =
                        this.len = this.left = this.labelFormatter = this.labelEdge = this.isLinked = this.index = this.height = this.hasVisibleSeries = this.hasNames = this.eventOptions = this.coll = this.closestPointRange = this.chart = this.bottom = this.alternateBands = void 0; this.init(b, d, e)
                } init(d, e, c = this.coll) {
                    const a = "xAxis" === c; this.chart = d; this.horiz = this.isZAxis || (d.inverted ? !a : a); this.isXAxis = a; this.coll = c; l(this, "init", { userOptions: e }); this.opposite = H(e.opposite, this.opposite); this.side = H(e.side, this.side, this.horiz ? this.opposite ? 0 : 2 :
                        this.opposite ? 1 : 3); this.setOptions(e); c = this.options; const m = c.labels, f = c.type; this.userOptions = e; this.minPixelPadding = 0; this.reversed = H(c.reversed, this.reversed); this.visible = c.visible; this.zoomEnabled = c.zoomEnabled; this.hasNames = "category" === f || !0 === c.categories; this.categories = c.categories || (this.hasNames ? [] : void 0); this.names || (this.names = [], this.names.keys = {}); this.plotLinesAndBandsGroups = {}; this.positiveValuesOnly = !!this.logarithmic; this.isLinked = g(c.linkedTo); this.ticks = {}; this.labelEdge = [];
                    this.minorTicks = {}; this.plotLinesAndBands = []; this.alternateBands = {}; this.len = 0; this.minRange = this.userMinRange = c.minRange || c.maxZoom; this.range = c.range; this.offset = c.offset || 0; this.min = this.max = null; e = H(c.crosshair, P(d.options.tooltip.crosshairs)[a ? 0 : 1]); this.crosshair = !0 === e ? {} : e; -1 === d.axes.indexOf(this) && (a ? d.axes.splice(d.xAxis.length, 0, this) : d.axes.push(this), z(this, d[this.coll])); d.orderItems(this.coll); this.series = this.series || []; d.inverted && !this.isZAxis && a && "undefined" === typeof this.reversed &&
                        (this.reversed = !0); this.labelRotation = b(m.rotation) ? m.rotation : void 0; k(this, c); l(this, "afterInit")
                } setOptions(b) { this.options = m(x.defaultXAxisOptions, "yAxis" === this.coll && x.defaultYAxisOptions, [x.defaultTopAxisOptions, x.defaultRightAxisOptions, x.defaultBottomAxisOptions, x.defaultLeftAxisOptions][this.side], m(q[this.coll], b)); l(this, "afterSetOptions", { userOptions: b }) } defaultLabelFormatter(d) {
                    var e = this.axis; ({ numberFormatter: d } = this.chart); const c = b(this.value) ? this.value : NaN, a = e.chart.time, m = this.dateTimeLabelFormat;
                    var l = q.lang; const f = l.numericSymbols; l = l.numericSymbolMagnitude || 1E3; const g = e.logarithmic ? Math.abs(c) : e.tickInterval; let w = f && f.length, h; if (e.categories) h = `${this.value}`; else if (m) h = a.dateFormat(m, c); else if (w && 1E3 <= g) for (; w-- && "undefined" === typeof h;)e = Math.pow(l, w + 1), g >= e && 0 === 10 * c % e && null !== f[w] && 0 !== c && (h = d(c / e, -1) + f[w]); "undefined" === typeof h && (h = 1E4 <= Math.abs(c) ? d(c, -1) : d(c, -1, void 0, "")); return h
                } getSeriesExtremes() {
                    const d = this, e = d.chart; let c; l(this, "getSeriesExtremes", null, function () {
                        d.hasVisibleSeries =
                        !1; d.dataMin = d.dataMax = d.threshold = null; d.softThreshold = !d.isXAxis; d.series.forEach(function (a) {
                            if (a.visible || !e.options.chart.ignoreHiddenSeries) {
                                var m = a.options; let e = m.threshold, l, f; d.hasVisibleSeries = !0; d.positiveValuesOnly && 0 >= e && (e = null); if (d.isXAxis) (m = a.xData) && m.length && (m = d.logarithmic ? m.filter(b => 0 < b) : m, c = a.getXExtremes(m), l = c.min, f = c.max, b(l) || l instanceof Date || (m = m.filter(b), c = a.getXExtremes(m), l = c.min, f = c.max), m.length && (d.dataMin = Math.min(H(d.dataMin, l), l), d.dataMax = Math.max(H(d.dataMax,
                                    f), f))); else if (a = a.applyExtremes(), b(a.dataMin) && (l = a.dataMin, d.dataMin = Math.min(H(d.dataMin, l), l)), b(a.dataMax) && (f = a.dataMax, d.dataMax = Math.max(H(d.dataMax, f), f)), g(e) && (d.threshold = e), !m.softThreshold || d.positiveValuesOnly) d.softThreshold = !1
                            }
                        })
                    }); l(this, "afterGetSeriesExtremes")
                } translate(d, e, a, m, l, f) {
                    const g = this.linkedParent || this, w = m && g.old ? g.old.min : g.min; if (!b(w)) return NaN; const h = g.minPixelPadding; l = (g.isOrdinal || g.brokenAxis && g.brokenAxis.hasBreaks || g.logarithmic && l) && g.lin2val; let k =
                        1, u = 0; m = m && g.old ? g.old.transA : g.transA; m || (m = g.transA); a && (k *= -1, u = g.len); g.reversed && (k *= -1, u -= k * (g.sector || g.len)); e ? (f = (d * k + u - h) / m + w, l && (f = g.lin2val(f))) : (l && (d = g.val2lin(d)), d = k * (d - w) * m, f = (g.isRadial ? d : c(d)) + u + k * h + (b(f) ? m * f : 0)); return f
                } toPixels(b, d) { return this.translate(b, !1, !this.horiz, void 0, !0) + (d ? 0 : this.pos) } toValue(b, d) { return this.translate(b - (d ? 0 : this.pos), !0, !this.horiz, void 0, !0) } getPlotLinePath(d) {
                    function e(b, d, e) { "pass" !== J && (b < d || b > e) && (J ? b = f(b, d, e) : q = !0); return b } const c = this,
                        a = c.chart, m = c.left, g = c.top, w = d.old, h = d.value, k = d.lineWidth, u = w && a.oldChartHeight || a.chartHeight, z = w && a.oldChartWidth || a.chartWidth, v = c.transB; let n = d.translatedValue, J = d.force, p, M, B, C, q; d = { value: h, lineWidth: k, old: w, force: J, acrossPanes: d.acrossPanes, translatedValue: n }; l(this, "getPlotLinePath", d, function (d) {
                            n = H(n, c.translate(h, void 0, void 0, w)); n = f(n, -1E5, 1E5); p = B = Math.round(n + v); M = C = Math.round(u - n - v); b(n) ? c.horiz ? (M = g, C = u - c.bottom, p = B = e(p, m, m + c.width)) : (p = m, B = z - c.right, M = C = e(M, g, g + c.height)) : (q = !0,
                                J = !1); d.path = q && !J ? null : a.renderer.crispLine([["M", p, M], ["L", B, C]], k || 1)
                        }); return d.path
                } getLinearTickPositions(b, d, e) { const a = c(Math.floor(d / b) * b); e = c(Math.ceil(e / b) * b); const m = []; let l, g; c(a + b) === a && (g = 20); if (this.single) return [d]; for (d = a; d <= e;) { m.push(d); d = c(d + b, g); if (d === l) break; l = d } return m } getMinorTickInterval() { const b = this.options; return !0 === b.minorTicks ? H(b.minorTickInterval, "auto") : !1 === b.minorTicks ? null : b.minorTickInterval } getMinorTickPositions() {
                    var b = this.options; const d = this.tickPositions,
                        e = this.minorTickInterval; var c = this.pointRangePadding || 0; const a = this.min - c; c = this.max + c; const m = c - a; let l = []; if (m && m / e < this.len / 3) { const m = this.logarithmic; if (m) this.paddedTicks.forEach(function (b, d, c) { d && l.push.apply(l, m.getLogTickPositions(e, c[d - 1], c[d], !0)) }); else if (this.dateTime && "auto" === this.getMinorTickInterval()) l = l.concat(this.getTimeTicks(this.dateTime.normalizeTimeTickInterval(e), a, c, b.startOfWeek)); else for (b = a + (d[0] - a) % e; b <= c && b !== l[0]; b += e)l.push(b) } 0 !== l.length && this.trimTicks(l);
                    return l
                } adjustForMinRange() {
                    const b = this.options, d = this.logarithmic; let e = this.min; var c = this.max; let a, m; if (this.isXAxis && "undefined" === typeof this.minRange && !d) if (g(b.min) || g(b.max) || g(b.floor) || g(b.ceiling)) this.minRange = null; else { var l = v(this.series.map(b => { var d; return (b.xIncrement ? null === (d = b.xData) || void 0 === d ? void 0 : d.slice(0, 2) : b.xData) || [] })) || 0; this.minRange = Math.min(5 * l, this.dataMax - this.dataMin) } c - e < this.minRange && (l = this.dataMax - this.dataMin >= this.minRange, m = this.minRange, c = (m - c + e) /
                        2, a = [e - c, H(b.min, e - c)], l && (a[2] = d ? d.log2lin(this.dataMin) : this.dataMin), e = n(a), c = [e + m, H(b.max, e + m)], l && (c[2] = d ? d.log2lin(this.dataMax) : this.dataMax), c = h(c), c - e < m && (a[0] = c - m, a[1] = H(b.min, c - m), e = n(a))); this.min = e; this.max = c
                } getClosest() {
                    let b, d; if (this.categories) d = 1; else {
                        const e = []; this.series.forEach(function (b) {
                            var c; const a = b.closestPointRange, m = b.visible || !b.chart.options.chart.ignoreHiddenSeries; 1 === (null === (c = b.xData) || void 0 === c ? void 0 : c.length) ? e.push(b.xData[0]) : !b.noSharedTooltip && g(a) &&
                                m && (d = g(d) ? Math.min(d, a) : a)
                        }); e.length && (e.sort((b, d) => b - d), b = v([e]))
                    } return b && d ? Math.min(b, d) : b || d
                } nameToX(b) { const d = u(this.options.categories), e = d ? this.categories : this.names; let c = b.options.x, a; b.series.requireSorting = !1; g(c) || (c = this.options.uniqueNames && e ? d ? e.indexOf(b.name) : H(e.keys[b.name], -1) : b.series.autoIncrement()); -1 === c ? !d && e && (a = e.length) : a = c; "undefined" !== typeof a ? (this.names[a] = b.name, this.names.keys[b.name] = a) : b.x && (a = b.x); return a } updateNames() {
                    const b = this, d = this.names; 0 < d.length &&
                        (Object.keys(d.keys).forEach(function (b) { delete d.keys[b] }), d.length = 0, this.minRange = this.userMinRange, (this.series || []).forEach(function (d) { d.xIncrement = null; if (!d.points || d.isDirtyData) b.max = Math.max(b.max, d.xData.length - 1), d.processData(), d.generatePoints(); d.data.forEach(function (e, c) { let a; e && e.options && "undefined" !== typeof e.name && (a = b.nameToX(e), "undefined" !== typeof a && a !== e.x && (e.x = a, d.xData[c] = a)) }) }))
                } setAxisTranslation() {
                    const b = this, e = b.max - b.min; var c = b.linkedParent; const a = !!b.categories,
                        m = b.isXAxis; let g = b.axisPointRange || 0, f, w = 0, h = 0, k = b.transA; if (m || a || g) f = b.getClosest(), c ? (w = c.minPointOffset, h = c.pointRangePadding) : b.series.forEach(function (e) { const c = a ? 1 : m ? H(e.options.pointRange, f, 0) : b.axisPointRange || 0, l = e.options.pointPlacement; g = Math.max(g, c); if (!b.single || a) e = e.is("xrange") ? !m : m, w = Math.max(w, e && d(l) ? 0 : c / 2), h = Math.max(h, e && "on" === l ? 0 : c) }), c = b.ordinal && b.ordinal.slope && f ? b.ordinal.slope / f : 1, b.minPointOffset = w *= c, b.pointRangePadding = h *= c, b.pointRange = Math.min(g, b.single && a ? 1 :
                            e), m && f && (b.closestPointRange = f); b.translationSlope = b.transA = k = b.staticScale || b.len / (e + h || 1); b.transB = b.horiz ? b.left : b.bottom; b.minPixelPadding = k * w; l(this, "afterSetAxisTranslation")
                } minFromRange() { return this.max - this.range } setTickInterval(d) {
                    var e = this.chart; const a = this.logarithmic, m = this.options, f = this.isXAxis, w = this.isLinked, h = m.tickPixelInterval, k = this.categories, u = this.softThreshold; let z = m.maxPadding, v = m.minPadding; let n = b(m.tickInterval) && 0 <= m.tickInterval ? m.tickInterval : void 0, J = b(this.threshold) ?
                        this.threshold : null, p, M, B; this.dateTime || k || w || this.getTickAmount(); M = H(this.userMin, m.min); B = H(this.userMax, m.max); if (w) { this.linkedParent = e[this.coll][m.linkedTo]; var C = this.linkedParent.getExtremes(); this.min = H(C.min, C.dataMin); this.max = H(C.max, C.dataMax); m.type !== this.linkedParent.options.type && E(11, 1, e) } else u && g(J) && (this.dataMin >= J ? (C = J, v = 0) : this.dataMax <= J && (p = J, z = 0)), this.min = H(M, C, this.dataMin), this.max = H(B, p, this.dataMax); a && (this.positiveValuesOnly && !d && 0 >= Math.min(this.min, H(this.dataMin,
                            this.min)) && E(10, 1, e), this.min = c(a.log2lin(this.min), 16), this.max = c(a.log2lin(this.max), 16)); this.range && g(this.max) && (this.userMin = this.min = M = Math.max(this.dataMin, this.minFromRange()), this.userMax = B = this.max, this.range = null); l(this, "foundExtremes"); this.beforePadding && this.beforePadding(); this.adjustForMinRange(); !b(this.userMin) && b(m.softMin) && m.softMin < this.min && (this.min = M = m.softMin); !b(this.userMax) && b(m.softMax) && m.softMax > this.max && (this.max = B = m.softMax); !(k || this.axisPointRange || this.stacking &&
                                this.stacking.usePercentage || w) && g(this.min) && g(this.max) && (e = this.max - this.min) && (!g(M) && v && (this.min -= e * v), !g(B) && z && (this.max += e * z)); !b(this.userMin) && b(m.floor) && (this.min = Math.max(this.min, m.floor)); !b(this.userMax) && b(m.ceiling) && (this.max = Math.min(this.max, m.ceiling)); u && g(this.dataMin) && (J = J || 0, !g(M) && this.min < J && this.dataMin >= J ? this.min = this.options.minRange ? Math.min(J, this.max - this.minRange) : J : !g(B) && this.max > J && this.dataMax <= J && (this.max = this.options.minRange ? Math.max(J, this.min + this.minRange) :
                                    J)); b(this.min) && b(this.max) && !this.chart.polar && this.min > this.max && (g(this.options.min) ? this.max = this.min : g(this.options.max) && (this.min = this.max)); this.tickInterval = this.min === this.max || "undefined" === typeof this.min || "undefined" === typeof this.max ? 1 : w && this.linkedParent && !n && h === this.linkedParent.options.tickPixelInterval ? n = this.linkedParent.tickInterval : H(n, this.tickAmount ? (this.max - this.min) / Math.max(this.tickAmount - 1, 1) : void 0, k ? 1 : (this.max - this.min) * h / Math.max(this.len, h)); if (f && !d) {
                                        const b =
                                            this.min !== (this.old && this.old.min) || this.max !== (this.old && this.old.max); this.series.forEach(function (d) { d.forceCrop = d.forceCropping && d.forceCropping(); d.processData(b) }); l(this, "postProcessData", { hasExtremesChanged: b })
                                    } this.setAxisTranslation(); l(this, "initialAxisTranslation"); this.pointRange && !n && (this.tickInterval = Math.max(this.pointRange, this.tickInterval)); d = H(m.minTickInterval, this.dateTime && !this.series.some(b => b.noSharedTooltip) ? this.closestPointRange : 0); !n && this.tickInterval < d && (this.tickInterval =
                                        d); this.dateTime || this.logarithmic || n || (this.tickInterval = R(this, this.tickInterval)); this.tickAmount || (this.tickInterval = this.unsquish()); this.setTickPositions()
                } setTickPositions() {
                    var d = this.options; const e = d.tickPositions, c = d.tickPositioner; var a = this.getMinorTickInterval(), m = this.hasVerticalPanning(), f = "colorAxis" === this.coll; const w = (f || !m) && d.startOnTick; m = (f || !m) && d.endOnTick; f = []; let h; this.tickmarkOffset = this.categories && "between" === d.tickmarkPlacement && 1 === this.tickInterval ? .5 : 0; this.minorTickInterval =
                        "auto" === a && this.tickInterval ? this.tickInterval / d.minorTicksPerMajor : a; this.single = this.min === this.max && g(this.min) && !this.tickAmount && (parseInt(this.min, 10) === this.min || !1 !== d.allowDecimals); if (e) f = e.slice(); else if (b(this.min) && b(this.max)) {
                            if (this.ordinal && this.ordinal.positions || !((this.max - this.min) / this.tickInterval > Math.max(2 * this.len, 200))) if (this.dateTime) f = this.getTimeTicks(this.dateTime.normalizeTimeTickInterval(this.tickInterval, d.units), this.min, this.max, d.startOfWeek, this.ordinal && this.ordinal.positions,
                                this.closestPointRange, !0); else if (this.logarithmic) f = this.logarithmic.getLogTickPositions(this.tickInterval, this.min, this.max); else for (a = d = this.tickInterval; a <= 2 * d;)if (f = this.getLinearTickPositions(this.tickInterval, this.min, this.max), this.tickAmount && f.length > this.tickAmount) this.tickInterval = R(this, a *= 1.1); else break; else f = [this.min, this.max], E(19, !1, this.chart); f.length > this.len && (f = [f[0], f[f.length - 1]], f[0] === f[1] && (f.length = 1)); c && (this.tickPositions = f, (h = c.apply(this, [this.min, this.max])) &&
                                    (f = h))
                        } this.tickPositions = f; this.paddedTicks = f.slice(0); this.trimTicks(f, w, m); !this.isLinked && b(this.min) && b(this.max) && (this.single && 2 > f.length && !this.categories && !this.series.some(b => b.is("heatmap") && "between" === b.options.pointPlacement) && (this.min -= .5, this.max += .5), e || h || this.adjustTickAmount()); l(this, "afterSetTickPositions")
                } trimTicks(b, d, e) {
                    const c = b[0], a = b[b.length - 1], m = !this.isOrdinal && this.minPointOffset || 0; l(this, "trimTicks"); if (!this.isLinked) {
                        if (d && -Infinity !== c) this.min = c; else for (; this.min -
                            m > b[0];)b.shift(); if (e) this.max = a; else for (; this.max + m < b[b.length - 1];)b.pop(); 0 === b.length && g(c) && !this.options.tickPositions && b.push((a + c) / 2)
                    }
                } alignToOthers() {
                    const d = this, e = [this], c = d.options, a = "yAxis" === this.coll && this.chart.options.chart.alignThresholds, m = []; let f; d.thresholdAlignment = void 0; if ((!1 !== this.chart.options.chart.alignTicks && c.alignTicks || a) && !1 !== c.startOnTick && !1 !== c.endOnTick && !d.logarithmic) {
                        const b = b => { const { horiz: d, options: e } = b; return [d ? e.left : e.top, e.width, e.height, e.pane].join() },
                        c = b(this); this.chart[this.coll].forEach(function (a) { const { series: m } = a; m.length && m.some(b => b.visible) && a !== d && b(a) === c && (f = !0, e.push(a)) })
                    } if (f && a) { e.forEach(e => { e = e.getThresholdAlignment(d); b(e) && m.push(e) }); const c = 1 < m.length ? m.reduce((b, d) => b + d, 0) / m.length : void 0; e.forEach(b => { b.thresholdAlignment = c }) } return f
                } getThresholdAlignment(d) {
                    (!b(this.dataMin) || this !== d && this.series.some(b => b.isDirty || b.isDirtyData)) && this.getSeriesExtremes(); if (b(this.threshold)) return d = f((this.threshold - (this.dataMin ||
                        0)) / ((this.dataMax || 0) - (this.dataMin || 0)), 0, 1), this.options.reversed && (d = 1 - d), d
                } getTickAmount() { const b = this.options, d = b.tickPixelInterval; let e = b.tickAmount; !g(b.tickInterval) && !e && this.len < d && !this.isRadial && !this.logarithmic && b.startOnTick && b.endOnTick && (e = 2); !e && this.alignToOthers() && (e = Math.ceil(this.len / d) + 1); 4 > e && (this.finalTickAmt = e, e = 5); this.tickAmount = e } adjustTickAmount() {
                    const d = this, { finalTickAmt: e, max: a, min: m, options: f, tickPositions: l, tickAmount: w, thresholdAlignment: h } = d, k = l && l.length;
                    var u = H(d.threshold, d.softThreshold ? 0 : null); var z = d.tickInterval; let v; b(h) && (v = .5 > h ? Math.ceil(h * (w - 1)) : Math.floor(h * (w - 1)), f.reversed && (v = w - 1 - v)); if (d.hasData() && b(m) && b(a)) {
                        const h = () => { d.transA *= (k - 1) / (w - 1); d.min = f.startOnTick ? l[0] : Math.min(m, l[0]); d.max = f.endOnTick ? l[l.length - 1] : Math.max(a, l[l.length - 1]) }; if (b(v) && b(d.threshold)) {
                            for (; l[v] !== u || l.length !== w || l[0] > m || l[l.length - 1] < a;) {
                                l.length = 0; for (l.push(d.threshold); l.length < w;)void 0 === l[v] || l[v] > d.threshold ? l.unshift(c(l[0] - z)) : l.push(c(l[l.length -
                                    1] + z)); if (z > 8 * d.tickInterval) break; z *= 2
                            } h()
                        } else if (k < w) { for (; l.length < w;)l.length % 2 || m === u ? l.push(c(l[l.length - 1] + z)) : l.unshift(c(l[0] - z)); h() } if (g(e)) { for (z = u = l.length; z--;)(3 === e && 1 === z % 2 || 2 >= e && 0 < z && z < u - 1) && l.splice(z, 1); d.finalTickAmt = void 0 }
                    }
                } setScale() {
                    let b = !1, d = !1; this.series.forEach(function (e) { b = b || e.isDirtyData || e.isDirty; d = d || e.xAxis && e.xAxis.isDirty || !1 }); this.setAxisSize(); const e = this.len !== (this.old && this.old.len); e || b || d || this.isLinked || this.forceRedraw || this.userMin !== (this.old &&
                        this.old.userMin) || this.userMax !== (this.old && this.old.userMax) || this.alignToOthers() ? (this.stacking && (this.stacking.resetStacks(), this.stacking.buildStacks()), this.forceRedraw = !1, this.userMinRange || (this.minRange = void 0), this.getSeriesExtremes(), this.setTickInterval(), this.isDirty || (this.isDirty = e || this.min !== (this.old && this.old.min) || this.max !== (this.old && this.old.max))) : this.stacking && this.stacking.cleanStacks(); b && this.panningState && (this.panningState.isDirty = !0); l(this, "afterSetScale")
                } setExtremes(b,
                    d, c, a, m) { const f = this, g = f.chart; c = H(c, !0); f.series.forEach(function (b) { delete b.kdTree }); m = e(m, { min: b, max: d }); l(f, "setExtremes", m, function () { f.userMin = b; f.userMax = d; f.eventArgs = m; c && g.redraw(a) }) } zoom(b, d) {
                        const e = this, c = this.dataMin, a = this.dataMax, m = this.options, f = Math.min(c, H(m.min, c)), w = Math.max(a, H(m.max, a)); b = { newMin: b, newMax: d }; l(this, "zoom", b, function (b) {
                            let d = b.newMin, m = b.newMax; if (d !== e.min || m !== e.max) e.allowZoomOutside || (g(c) && (d < f && (d = f), d > w && (d = w)), g(a) && (m < f && (m = f), m > w && (m = w))), e.displayBtn =
                                "undefined" !== typeof d || "undefined" !== typeof m, e.setExtremes(d, m, !1, void 0, { trigger: "zoom" }); b.zoomed = !0
                        }); return b.zoomed
                    } setAxisSize() {
                        const b = this.chart; var d = this.options; const e = d.offsets || [0, 0, 0, 0], c = this.horiz, a = this.width = Math.round(N(H(d.width, b.plotWidth - e[3] + e[1]), b.plotWidth)), m = this.height = Math.round(N(H(d.height, b.plotHeight - e[0] + e[2]), b.plotHeight)), l = this.top = Math.round(N(H(d.top, b.plotTop + e[0]), b.plotHeight, b.plotTop)); d = this.left = Math.round(N(H(d.left, b.plotLeft + e[3]), b.plotWidth,
                            b.plotLeft)); this.bottom = b.chartHeight - m - l; this.right = b.chartWidth - a - d; this.len = Math.max(c ? a : m, 0); this.pos = c ? d : l
                    } getExtremes() { const b = this.logarithmic; return { min: b ? c(b.lin2log(this.min)) : this.min, max: b ? c(b.lin2log(this.max)) : this.max, dataMin: this.dataMin, dataMax: this.dataMax, userMin: this.userMin, userMax: this.userMax } } getThreshold(b) {
                        var d = this.logarithmic; const e = d ? d.lin2log(this.min) : this.min; d = d ? d.lin2log(this.max) : this.max; null === b || -Infinity === b ? b = e : Infinity === b ? b = d : e > b ? b = e : d < b && (b = d); return this.translate(b,
                            0, 1, 0, 1)
                    } autoLabelAlign(b) { const d = (H(b, 0) - 90 * this.side + 720) % 360; b = { align: "center" }; l(this, "autoLabelAlign", b, function (b) { 15 < d && 165 > d ? b.align = "right" : 195 < d && 345 > d && (b.align = "left") }); return b.align } tickSize(b) { const d = this.options, e = H(d["tick" === b ? "tickWidth" : "minorTickWidth"], "tick" === b && this.isXAxis && !this.categories ? 1 : 0); let c = d["tick" === b ? "tickLength" : "minorTickLength"], a; e && c && ("inside" === d[b + "Position"] && (c = -c), a = [c, e]); b = { tickSize: a }; l(this, "afterTickSize", b); return b.tickSize } labelMetrics() {
                        const b =
                            this.chart.renderer; var d = this.ticks; d = d[Object.keys(d)[0]] || {}; return this.chart.renderer.fontMetrics(d.label || d.movedLabel || b.box)
                    } unsquish() {
                        const d = this.options.labels; var e = this.horiz; const a = this.tickInterval, m = this.len / (((this.categories ? 1 : 0) + this.max - this.min) / a), l = d.rotation, f = .75 * this.labelMetrics().h, g = Math.max(this.max - this.min, 0), w = function (b) { let d = b / (m || 1); d = 1 < d ? Math.ceil(d) : 1; d * a > g && Infinity !== b && Infinity !== m && g && (d = Math.ceil(g / a)); return c(d * a) }; let h = a, k, u = Number.MAX_VALUE, z; if (e) {
                            if (d.staggerLines ||
                                (b(l) ? z = [l] : m < d.autoRotationLimit && (z = d.autoRotation)), z) { let b; for (const d of z) if (d === l || d && -90 <= d && 90 >= d) e = w(Math.abs(f / Math.sin(p * d))), b = e + Math.abs(d / 360), b < u && (u = b, k = d, h = e) }
                        } else h = w(f); this.autoRotation = z; this.labelRotation = H(k, b(l) ? l : 0); return d.step ? a : h
                    } getSlotWidth(d) {
                        const e = this.chart, c = this.horiz, a = this.options.labels, m = Math.max(this.tickPositions.length - (this.categories ? 0 : 1), 1), l = e.margin[3]; if (d && b(d.slotWidth)) return d.slotWidth; if (c && 2 > a.step) return a.rotation ? 0 : (this.staggerLines ||
                            1) * this.len / m; if (!c) { d = a.style.width; if (void 0 !== d) return parseInt(String(d), 10); if (l) return l - e.spacing[3] } return .33 * e.chartWidth
                    } renderUnsquish() {
                        const b = this.chart, e = b.renderer, c = this.tickPositions, a = this.ticks, m = this.options.labels, l = m.style, f = this.horiz, g = this.getSlotWidth(); var w = Math.max(1, Math.round(g - 2 * m.padding)); const h = {}, k = this.labelMetrics(), u = l.textOverflow; let z, v, n = 0; d(m.rotation) || (h.rotation = m.rotation || 0); c.forEach(function (b) {
                            b = a[b]; b.movedLabel && b.replaceMovedLabel(); b && b.label &&
                                b.label.textPxLength > n && (n = b.label.textPxLength)
                        }); this.maxLabelLength = n; if (this.autoRotation) n > w && n > k.h ? h.rotation = this.labelRotation : this.labelRotation = 0; else if (g && (z = w, !u)) for (v = "clip", w = c.length; !f && w--;) { var H = c[w]; if (H = a[H].label) H.styles && "ellipsis" === H.styles.textOverflow ? H.css({ textOverflow: "clip" }) : H.textPxLength > g && H.css({ width: g + "px" }), H.getBBox().height > this.len / c.length - (k.h - k.f) && (H.specificTextOverflow = "ellipsis") } h.rotation && (z = n > .5 * b.chartHeight ? .33 * b.chartHeight : n, u || (v = "ellipsis"));
                        if (this.labelAlign = m.align || this.autoLabelAlign(this.labelRotation)) h.align = this.labelAlign; c.forEach(function (b) { const d = (b = a[b]) && b.label, e = l.width, c = {}; d && (d.attr(h), b.shortenLabel ? b.shortenLabel() : z && !e && "nowrap" !== l.whiteSpace && (z < d.textPxLength || "SPAN" === d.element.tagName) ? (c.width = z + "px", u || (c.textOverflow = d.specificTextOverflow || v), d.css(c)) : d.styles && d.styles.width && !c.width && !e && d.css({ width: null }), delete d.specificTextOverflow, b.rotation = h.rotation) }, this); this.tickRotCorr = e.rotCorr(k.b,
                            this.labelRotation || 0, 0 !== this.side)
                    } hasData() { return this.series.some(function (b) { return b.hasData() }) || this.options.showEmpty && g(this.min) && g(this.max) } addTitle(b) {
                        const d = this.chart.renderer, e = this.horiz, c = this.opposite, a = this.options.title, l = this.chart.styledMode; let f; this.axisTitle || ((f = a.textAlign) || (f = (e ? { low: "left", middle: "center", high: "right" } : { low: c ? "right" : "left", middle: "center", high: c ? "left" : "right" })[a.align]), this.axisTitle = d.text(a.text || "", 0, 0, a.useHTML).attr({
                            zIndex: 7, rotation: a.rotation,
                            align: f
                        }).addClass("highcharts-axis-title"), l || this.axisTitle.css(m(a.style)), this.axisTitle.add(this.axisGroup), this.axisTitle.isNew = !0); l || a.style.width || this.isRadial || this.axisTitle.css({ width: this.len + "px" }); this.axisTitle[b ? "show" : "hide"](b)
                    } generateTick(b) { const d = this.ticks; d[b] ? d[b].addLabel() : d[b] = new F(this, b) } getOffset() {
                        const d = this, { chart: e, horiz: c, options: a, side: m, ticks: f, tickPositions: w, coll: h, axisParent: k } = d, u = e.renderer, z = e.inverted && !d.isZAxis ? [1, 0, 3, 2][m] : m; var v = d.hasData(); const n =
                            a.title; var p = a.labels; const B = b(a.crossing); var C = e.axisOffset; const q = e.clipOffset, E = [-1, 1, 1, -1][m], N = a.className; let t, r = 0, D; var y = 0; let A = 0; d.showAxis = t = v || a.showEmpty; d.staggerLines = d.horiz && p.staggerLines || void 0; if (!d.axisGroup) {
                                const b = (b, d, e) => u.g(b).attr({ zIndex: e }).addClass(`highcharts-${h.toLowerCase()}${d} ` + (this.isRadial ? `highcharts-radial-axis${d} ` : "") + (N || "")).add(k); d.gridGroup = b("grid", "-grid", a.gridZIndex); d.axisGroup = b("axis", "", a.zIndex); d.labelGroup = b("axis-labels", "-labels",
                                    p.zIndex)
                            } v || d.isLinked ? (w.forEach(function (b) { d.generateTick(b) }), d.renderUnsquish(), d.reserveSpaceDefault = 0 === m || 2 === m || { 1: "left", 3: "right" }[m] === d.labelAlign, H(p.reserveSpace, B ? !1 : null, "center" === d.labelAlign ? !0 : null, d.reserveSpaceDefault) && w.forEach(function (b) { A = Math.max(f[b].getLabelSize(), A) }), d.staggerLines && (A *= d.staggerLines), d.labelOffset = A * (d.opposite ? -1 : 1)) : M(f, function (b, d) { b.destroy(); delete f[d] }); n && n.text && !1 !== n.enabled && (d.addTitle(t), t && !B && !1 !== n.reserveSpace && (d.titleOffset =
                                r = d.axisTitle.getBBox()[c ? "height" : "width"], D = n.offset, y = g(D) ? 0 : H(n.margin, c ? 5 : 10))); d.renderLine(); d.offset = E * H(a.offset, C[m] ? C[m] + (a.margin || 0) : 0); d.tickRotCorr = d.tickRotCorr || { x: 0, y: 0 }; v = 0 === m ? -d.labelMetrics().h : 2 === m ? d.tickRotCorr.y : 0; y = Math.abs(A) + y; A && (y = y - v + E * (c ? H(p.y, d.tickRotCorr.y + E * p.distance) : H(p.x, E * p.distance))); d.axisTitleMargin = H(D, y); d.getMaxLabelDimensions && (d.maxLabelDimensions = d.getMaxLabelDimensions(f, w)); "colorAxis" !== h && (p = this.tickSize("tick"), C[m] = Math.max(C[m], (d.axisTitleMargin ||
                                    0) + r + E * d.offset, y, w && w.length && p ? p[0] + E * d.offset : 0), C = !d.axisLine || a.offset ? 0 : 2 * Math.floor(d.axisLine.strokeWidth() / 2), q[z] = Math.max(q[z], C)); l(this, "afterGetOffset")
                    } getLinePath(b) { const d = this.chart, e = this.opposite; var c = this.offset; const a = this.horiz, m = this.left + (e ? this.width : 0) + c; c = d.chartHeight - this.bottom - (e ? this.height : 0) + c; e && (b *= -1); return d.renderer.crispLine([["M", a ? this.left : m, a ? c : this.top], ["L", a ? d.chartWidth - this.right : m, a ? c : d.chartHeight - this.bottom]], b) } renderLine() {
                        this.axisLine ||
                        (this.axisLine = this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup), this.chart.styledMode || this.axisLine.attr({ stroke: this.options.lineColor, "stroke-width": this.options.lineWidth, zIndex: 7 }))
                    } getTitlePosition(b) {
                        var d = this.horiz, e = this.left; const c = this.top; var a = this.len; const m = this.options.title, f = d ? e : c, g = this.opposite, w = this.offset, h = m.x, k = m.y, u = this.chart.renderer.fontMetrics(b); b = b ? Math.max(b.getBBox(!1, 0).height - u.h - 1, 0) : 0; a = {
                            low: f + (d ? 0 : a), middle: f + a / 2, high: f + (d ? a :
                                0)
                        }[m.align]; e = (d ? c + this.height : e) + (d ? 1 : -1) * (g ? -1 : 1) * (this.axisTitleMargin || 0) + [-b, b, u.f, -b][this.side]; d = { x: d ? a + h : e + (g ? this.width : 0) + w + h, y: d ? e + k - (g ? this.height : 0) + w : a + k }; l(this, "afterGetTitlePosition", { titlePosition: d }); return d
                    } renderMinorTick(b, d) { const e = this.minorTicks; e[b] || (e[b] = new F(this, b, "minor")); d && e[b].isNew && e[b].render(null, !0); e[b].render(null, !1, 1) } renderTick(b, d, e) {
                        const c = this.ticks; if (!this.isLinked || b >= this.min && b <= this.max || this.grid && this.grid.isColumn) c[b] || (c[b] = new F(this,
                            b)), e && c[b].isNew && c[b].render(d, !0, -1), c[b].render(d)
                    } render() {
                        const d = this, e = d.chart, c = d.logarithmic, a = d.options, m = d.isLinked, f = d.tickPositions, g = d.axisTitle, w = d.ticks, h = d.minorTicks, k = d.alternateBands, u = a.stackLabels, z = a.alternateGridColor; var v = a.crossing; const n = d.tickmarkOffset, H = d.axisLine, p = d.showAxis, B = t(e.renderer.globalAnimation); let C, q; d.labelEdge.length = 0; d.overlap = !1;[w, h, k].forEach(function (b) { M(b, function (b) { b.isActive = !1 }) }); if (b(v)) {
                            const b = this.isXAxis ? e.yAxis[0] : e.xAxis[0], c =
                                [1, -1, -1, 1][this.side]; b && (v = b.toPixels(v, !0), d.horiz && (v = b.len - v), d.offset = c * v)
                        } if (d.hasData() || m) {
                            const m = d.chart.hasRendered && d.old && b(d.old.min); d.minorTickInterval && !d.categories && d.getMinorTickPositions().forEach(function (b) { d.renderMinorTick(b, m) }); f.length && (f.forEach(function (b, e) { d.renderTick(b, e, m) }), n && (0 === d.min || d.single) && (w[-1] || (w[-1] = new F(d, -1, null, !0)), w[-1].render(-1))); z && f.forEach(function (b, a) {
                                q = "undefined" !== typeof f[a + 1] ? f[a + 1] + n : d.max - n; 0 === a % 2 && b < d.max && q <= d.max + (e.polar ?
                                    -n : n) && (k[b] || (k[b] = new A.PlotLineOrBand(d)), C = b + n, k[b].options = { from: c ? c.lin2log(C) : C, to: c ? c.lin2log(q) : q, color: z, className: "highcharts-alternate-grid" }, k[b].render(), k[b].isActive = !0)
                            }); d._addedPlotLB || (d._addedPlotLB = !0, (a.plotLines || []).concat(a.plotBands || []).forEach(function (b) { d.addPlotBandOrLine(b) }))
                        } [w, h, k].forEach(function (b) {
                            const d = [], c = B.duration; M(b, function (b, e) { b.isActive || (b.render(e, !1, 0), b.isActive = !1, d.push(e)) }); Y(function () {
                                let e = d.length; for (; e--;)b[d[e]] && !b[d[e]].isActive &&
                                    (b[d[e]].destroy(), delete b[d[e]])
                            }, b !== k && e.hasRendered && c ? c : 0)
                        }); H && (H[H.isPlaced ? "animate" : "attr"]({ d: this.getLinePath(H.strokeWidth()) }), H.isPlaced = !0, H[p ? "show" : "hide"](p)); g && p && (g[g.isNew ? "attr" : "animate"](d.getTitlePosition(g)), g.isNew = !1); u && u.enabled && d.stacking && d.stacking.renderStackTotals(); d.old = { len: d.len, max: d.max, min: d.min, transA: d.transA, userMax: d.userMax, userMin: d.userMin }; d.isDirty = !1; l(this, "afterRender")
                    } redraw() {
                        this.visible && (this.render(), this.plotLinesAndBands.forEach(function (b) { b.render() }));
                        this.series.forEach(function (b) { b.isDirty = !0 })
                    } getKeepProps() { return this.keepProps || W.keepProps } destroy(b) {
                        const d = this, e = d.plotLinesAndBands, c = this.eventOptions; l(this, "destroy", { keepEvents: b }); b || r(d);[d.ticks, d.minorTicks, d.alternateBands].forEach(function (b) { B(b) }); if (e) for (b = e.length; b--;)e[b].destroy(); "axisLine axisTitle axisGroup gridGroup labelGroup cross scrollbar".split(" ").forEach(function (b) { d[b] && (d[b] = d[b].destroy()) }); for (const b in d.plotLinesAndBandsGroups) d.plotLinesAndBandsGroups[b] =
                            d.plotLinesAndBandsGroups[b].destroy(); M(d, function (b, e) { -1 === d.getKeepProps().indexOf(e) && delete d[e] }); this.eventOptions = c
                    } drawCrosshair(b, d) {
                        const c = this.crosshair; var a = H(c && c.snap, !0); const m = this.chart; let f, w = this.cross; l(this, "drawCrosshair", { e: b, point: d }); b || (b = this.cross && this.cross.e); if (c && !1 !== (g(d) || !a)) {
                            a ? g(d) && (f = H("colorAxis" !== this.coll ? d.crosshairPos : null, this.isXAxis ? d.plotX : this.len - d.plotY)) : f = b && (this.horiz ? b.chartX - this.pos : this.len - b.chartY + this.pos); if (g(f)) {
                                var h = {
                                    value: d &&
                                        (this.isXAxis ? d.x : H(d.stackY, d.y)), translatedValue: f
                                }; m.polar && e(h, { isCrosshair: !0, chartX: b && b.chartX, chartY: b && b.chartY, point: d }); h = this.getPlotLinePath(h) || null
                            } if (!g(h)) { this.hideCrosshair(); return } a = this.categories && !this.isRadial; w || (this.cross = w = m.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-" + (a ? "category " : "thin ") + (c.className || "")).attr({ zIndex: H(c.zIndex, 2) }).add(), m.styledMode || (w.attr({
                                stroke: c.color || (a ? G.parse("#ccd3ff").setOpacity(.25).get() : "#cccccc"), "stroke-width": H(c.width,
                                    1)
                            }).css({ "pointer-events": "none" }), c.dashStyle && w.attr({ dashstyle: c.dashStyle }))); w.show().attr({ d: h }); a && !c.width && w.attr({ "stroke-width": this.transA }); this.cross.e = b
                        } else this.hideCrosshair(); l(this, "afterDrawCrosshair", { e: b, point: d })
                    } hideCrosshair() { this.cross && this.cross.hide(); l(this, "afterHideCrosshair") } hasVerticalPanning() { const b = this.chart.options.chart.panning; return !!(b && b.enabled && /y/.test(b.type)) } update(b, d) {
                        const e = this.chart; b = m(this.userOptions, b); this.destroy(!0); this.init(e, b);
                        e.isDirtyBox = !0; H(d, !0) && e.redraw()
                    } remove(b) { const d = this.chart, e = this.coll, c = this.series; let a = c.length; for (; a--;)c[a] && c[a].remove(!1); C(d.axes, this); C(d[e] || [], this); d.orderItems(e); this.destroy(); d.isDirtyBox = !0; H(b, !0) && d.redraw() } setTitle(b, d) { this.update({ title: b }, d) } setCategories(b, d) { this.update({ categories: b }, d) }
        } W.defaultOptions = x.defaultXAxisOptions; W.keepProps = "coll extKey hcEvents names series userMax userMin".split(" "); ""; return W
    }); K(a, "Core/Axis/DateTimeAxis.js", [a["Core/Utilities.js"]],
        function (a) {
            const { addEvent: r, getMagnitude: G, normalizeTickInterval: I, timeUnits: y } = a; var A; (function (A) {
                function D() { return this.chart.time.getTimeTicks.apply(this.chart.time, arguments) } function t(a) { "datetime" !== a.userOptions.type ? this.dateTime = void 0 : this.dateTime || (this.dateTime = new k(this)) } const q = []; A.compose = function (k) { a.pushUnique(q, k) && (k.keepProps.push("dateTime"), k.prototype.getTimeTicks = D, r(k, "init", t)); return k }; class k {
                    constructor(a) { this.axis = a } normalizeTimeTickInterval(a, k) {
                        const h =
                            k || [["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]], ["second", [1, 2, 5, 10, 15, 30]], ["minute", [1, 2, 5, 10, 15, 30]], ["hour", [1, 2, 3, 4, 6, 8, 12]], ["day", [1, 2]], ["week", [1, 2]], ["month", [1, 2, 3, 4, 6]], ["year", null]]; k = h[h.length - 1]; let f = y[k[0]], c = k[1], g; for (g = 0; g < h.length && !(k = h[g], f = y[k[0]], c = k[1], h[g + 1] && a <= (f * c[c.length - 1] + y[h[g + 1][0]]) / 2); g++); f === y.year && a < 5 * f && (c = [1, 2, 5]); a = I(a / f, c, "year" === k[0] ? Math.max(G(a / f), 1) : 1); return { unitRange: f, count: a, unitName: k[0] }
                    } getXDateFormat(a, k) {
                        const { axis: h } = this, f = h.chart.time;
                        return h.closestPointRange ? f.getDateFormat(h.closestPointRange, a, h.options.startOfWeek, k) || f.resolveDTLFormat(k.year).main : f.resolveDTLFormat(k.day).main
                    }
                } A.Additions = k
            })(A || (A = {})); return A
        }); K(a, "Core/Axis/LogarithmicAxis.js", [a["Core/Utilities.js"]], function (a) {
            const { addEvent: r, normalizeTickInterval: G, pick: I } = a; var y; (function (y) {
                function A(a) { let k = this.logarithmic; "logarithmic" !== a.userOptions.type ? this.logarithmic = void 0 : k || (this.logarithmic = new q(this)) } function D() {
                    const a = this.logarithmic;
                    a && (this.lin2val = function (k) { return a.lin2log(k) }, this.val2lin = function (k) { return a.log2lin(k) })
                } const t = []; y.compose = function (k) { a.pushUnique(t, k) && (k.keepProps.push("logarithmic"), r(k, "init", A), r(k, "afterInit", D)); return k }; class q {
                    constructor(a) { this.axis = a } getLogTickPositions(a, p, n, h) {
                        const f = this.axis; var c = f.len, g = f.options; let k = []; h || (this.minorAutoInterval = void 0); if (.5 <= a) a = Math.round(a), k = f.getLinearTickPositions(a, p, n); else if (.08 <= a) {
                            g = Math.floor(p); let f, B, e, l, v; for (c = .3 < a ? [1, 2, 4] : .15 <
                                a ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9]; g < n + 1 && !v; g++)for (B = c.length, f = 0; f < B && !v; f++)e = this.log2lin(this.lin2log(g) * c[f]), e > p && (!h || l <= n) && "undefined" !== typeof l && k.push(l), l > n && (v = !0), l = e
                        } else p = this.lin2log(p), n = this.lin2log(n), a = h ? f.getMinorTickInterval() : g.tickInterval, a = I("auto" === a ? null : a, this.minorAutoInterval, g.tickPixelInterval / (h ? 5 : 1) * (n - p) / ((h ? c / f.tickPositions.length : c) || 1)), a = G(a), k = f.getLinearTickPositions(a, p, n).map(this.log2lin), h || (this.minorAutoInterval = a / 5); h || (f.tickInterval = a); return k
                    } lin2log(a) {
                        return Math.pow(10,
                            a)
                    } log2lin(a) { return Math.log(a) / Math.LN10 }
                } y.Additions = q
            })(y || (y = {})); return y
        }); K(a, "Core/Axis/PlotLineOrBand/PlotLineOrBandAxis.js", [a["Core/Utilities.js"]], function (a) {
            const { erase: r, extend: G, isNumber: I } = a; var y; (function (y) {
                function A(c) { return this.addPlotBandOrLine(c, "plotBands") } function D(c, a) {
                    const g = this.userOptions; let h = new f(this, c); this.visible && (h = h.render()); if (h) {
                        this._addedPlotLB || (this._addedPlotLB = !0, (g.plotLines || []).concat(g.plotBands || []).forEach(c => { this.addPlotBandOrLine(c) }));
                        if (a) { const f = g[a] || []; f.push(c); g[a] = f } this.plotLinesAndBands.push(h)
                    } return h
                } function t(c) { return this.addPlotBandOrLine(c, "plotLines") } function q(c, a, f = this.options) {
                    const g = this.getPlotLinePath({ value: a, force: !0, acrossPanes: f.acrossPanes }), h = [], e = this.horiz; a = !I(this.min) || !I(this.max) || c < this.min && a < this.min || c > this.max && a > this.max; c = this.getPlotLinePath({ value: c, force: !0, acrossPanes: f.acrossPanes }); f = 1; let l; if (c && g) for (a && (l = c.toString() === g.toString(), f = 0), a = 0; a < c.length; a += 2) {
                        const k = c[a],
                        z = c[a + 1], u = g[a], b = g[a + 1]; "M" !== k[0] && "L" !== k[0] || "M" !== z[0] && "L" !== z[0] || "M" !== u[0] && "L" !== u[0] || "M" !== b[0] && "L" !== b[0] || (e && u[1] === k[1] ? (u[1] += f, b[1] += f) : e || u[2] !== k[2] || (u[2] += f, b[2] += f), h.push(["M", k[1], k[2]], ["L", z[1], z[2]], ["L", b[1], b[2]], ["L", u[1], u[2]], ["Z"])); h.isFlat = l
                    } return h
                } function k(c) { this.removePlotBandOrLine(c) } function p(c) {
                    const a = this.plotLinesAndBands, f = this.options, h = this.userOptions; if (a) {
                        let g = a.length; for (; g--;)a[g].id === c && a[g].destroy();[f.plotLines || [], h.plotLines || [],
                        f.plotBands || [], h.plotBands || []].forEach(function (e) { for (g = e.length; g--;)(e[g] || {}).id === c && r(e, e[g]) })
                    }
                } function n(c) { this.removePlotBandOrLine(c) } const h = []; let f; y.compose = function (c, g) { f || (f = c); a.pushUnique(h, g) && G(g.prototype, { addPlotBand: A, addPlotLine: t, addPlotBandOrLine: D, getPlotBandPath: q, removePlotBand: k, removePlotLine: n, removePlotBandOrLine: p }); return g }
            })(y || (y = {})); return y
        }); K(a, "Core/Axis/PlotLineOrBand/PlotLineOrBand.js", [a["Core/Axis/PlotLineOrBand/PlotLineOrBandAxis.js"], a["Core/Utilities.js"]],
            function (a, x) {
                const { arrayMax: r, arrayMin: I, defined: y, destroyObjectProperties: A, erase: F, fireEvent: D, merge: t, objectEach: q, pick: k } = x; class p {
                    static compose(k) { return a.compose(p, k) } constructor(a, h) { this.axis = a; h && (this.options = h, this.id = h.id) } render() {
                        D(this, "render"); const a = this, h = a.axis, f = h.horiz; var c = h.logarithmic; const g = a.options, p = g.color, C = k(g.zIndex, 0), E = g.events, e = {}, l = h.chart.renderer; let v = g.label, z = a.label, u = g.to, b = g.from, d = g.value, m = a.svgElem; var w = []; const M = y(b) && y(u); w = y(d); const H =
                            !m, N = { "class": "highcharts-plot-" + (M ? "band " : "line ") + (g.className || "") }; let r = M ? "bands" : "lines"; c && (b = c.log2lin(b), u = c.log2lin(u), d = c.log2lin(d)); h.chart.styledMode || (w ? (N.stroke = p || "#999999", N["stroke-width"] = k(g.width, 1), g.dashStyle && (N.dashstyle = g.dashStyle)) : M && (N.fill = p || "#e6e9ff", g.borderWidth && (N.stroke = g.borderColor, N["stroke-width"] = g.borderWidth))); e.zIndex = C; r += "-" + C; (c = h.plotLinesAndBandsGroups[r]) || (h.plotLinesAndBandsGroups[r] = c = l.g("plot-" + r).attr(e).add()); H && (a.svgElem = m = l.path().attr(N).add(c));
                        if (w) w = h.getPlotLinePath({ value: d, lineWidth: m.strokeWidth(), acrossPanes: g.acrossPanes }); else if (M) w = h.getPlotBandPath(b, u, g); else return; !a.eventsAdded && E && (q(E, function (b, d) { m.on(d, function (b) { E[d].apply(a, [b]) }) }), a.eventsAdded = !0); (H || !m.d) && w && w.length ? m.attr({ d: w }) : m && (w ? (m.show(), m.animate({ d: w })) : m.d && (m.hide(), z && (a.label = z = z.destroy()))); v && (y(v.text) || y(v.formatter)) && w && w.length && 0 < h.width && 0 < h.height && !w.isFlat ? (v = t({
                            align: f && M && "center", x: f ? !M && 4 : 10, verticalAlign: !f && M && "middle", y: f ?
                                M ? 16 : 10 : M ? 6 : -4, rotation: f && !M && 90
                        }, v), this.renderLabel(v, w, M, C)) : z && z.hide(); return a
                    } renderLabel(a, h, f, c) {
                        const g = this.axis; var k = g.chart.renderer; let n = this.label; n || (this.label = n = k.text(this.getLabelText(a), 0, 0, a.useHTML).attr({ align: a.textAlign || a.align, rotation: a.rotation, "class": "highcharts-plot-" + (f ? "band" : "line") + "-label " + (a.className || ""), zIndex: c }).add(), g.chart.styledMode || n.css(t({ fontSize: "0.8em", textOverflow: "ellipsis" }, a.style))); c = h.xBounds || [h[0][1], h[1][1], f ? h[2][1] : h[0][1]]; h =
                            h.yBounds || [h[0][2], h[1][2], f ? h[2][2] : h[0][2]]; f = I(c); k = I(h); n.align(a, !1, { x: f, y: k, width: r(c) - f, height: r(h) - k }); n.alignValue && "left" !== n.alignValue || (a = a.clip ? g.width : g.chart.chartWidth, n.css({ width: (90 === n.rotation ? g.height - (n.alignAttr.y - g.top) : a - (n.alignAttr.x - g.left)) + "px" })); n.show(!0)
                    } getLabelText(a) { return y(a.formatter) ? a.formatter.call(this) : a.text } destroy() { F(this.axis.plotLinesAndBands, this); delete this.axis; A(this) }
                } ""; ""; return p
            }); K(a, "Core/Tooltip.js", [a["Core/Templating.js"], a["Core/Globals.js"],
            a["Core/Renderer/RendererUtilities.js"], a["Core/Renderer/RendererRegistry.js"], a["Core/Utilities.js"]], function (a, x, G, I, y) {
                const { format: r } = a, { doc: F, isSafari: D } = x, { distribute: t } = G, { addEvent: q, clamp: k, css: p, discardElement: n, extend: h, fireEvent: f, isArray: c, isNumber: g, isString: B, merge: C, pick: E, splat: e, syncTimeout: l } = y; class v {
                    constructor(e, c) {
                        this.allowShared = !0; this.container = void 0; this.crosshairs = []; this.distance = 0; this.isHidden = !0; this.isSticky = !1; this.now = {}; this.options = {}; this.outside = !1; this.chart =
                            e; this.init(e, c)
                    } bodyFormatter(e) { return e.map(function (e) { const b = e.series.tooltipOptions; return (b[(e.point.formatPrefix || "point") + "Formatter"] || e.point.tooltipFormatter).call(e.point, b[(e.point.formatPrefix || "point") + "Format"] || "") }) } cleanSplit(e) { this.chart.series.forEach(function (c) { const b = c && c.tt; b && (!b.isActive || e ? c.tt = b.destroy() : b.isActive = !1) }) } defaultFormatter(c) {
                        const a = this.points || e(this); let b; b = [c.tooltipFooterHeaderFormatter(a[0])]; b = b.concat(c.bodyFormatter(a)); b.push(c.tooltipFooterHeaderFormatter(a[0],
                            !0)); return b
                    } destroy() { this.label && (this.label = this.label.destroy()); this.split && (this.cleanSplit(!0), this.tt && (this.tt = this.tt.destroy())); this.renderer && (this.renderer = this.renderer.destroy(), n(this.container)); y.clearTimeout(this.hideTimer); y.clearTimeout(this.tooltipTimeout) } getAnchor(c, a) {
                        var b = this.chart; const d = b.pointer, m = b.inverted, f = b.plotTop; b = b.plotLeft; c = e(c); c[0].series && c[0].series.yAxis && !c[0].series.yAxis.options.reversedStacks && (c = c.slice().reverse()); if (this.followPointer && a) "undefined" ===
                            typeof a.chartX && (a = d.normalize(a)), c = [a.chartX - b, a.chartY - f]; else if (c[0].tooltipPos) c = c[0].tooltipPos; else { let d = 0, e = 0; c.forEach(function (b) { if (b = b.pos(!0)) d += b[0], e += b[1] }); d /= c.length; e /= c.length; this.shared && 1 < c.length && a && (m ? d = a.chartX : e = a.chartY); c = [d - b, e - f] } return c.map(Math.round)
                    } getClassName(e, c, b) {
                        const d = e.series, a = d.options; return [this.options.className, "highcharts-label", b && "highcharts-tooltip-header", c ? "highcharts-tooltip-box" : "highcharts-tooltip", !b && "highcharts-color-" + E(e.colorIndex,
                            d.colorIndex), a && a.className].filter(B).join(" ")
                    } getLabel() {
                        const e = this, c = this.chart.styledMode, b = this.options, d = this.split && this.allowShared, a = b.style.pointerEvents || (this.shouldStickOnContact() ? "auto" : "none"); let f, l = this.chart.renderer; if (this.label) { var g = !this.label.hasClass("highcharts-label"); (!d && g || d && !g) && this.destroy() } if (!this.label) {
                            if (this.outside) {
                                g = this.chart.options.chart.style; const b = I.getRendererType(); this.container = f = x.doc.createElement("div"); f.className = "highcharts-tooltip-container";
                                p(f, { position: "absolute", top: "1px", pointerEvents: a, zIndex: Math.max(this.options.style.zIndex || 0, (g && g.zIndex || 0) + 3) }); x.doc.body.appendChild(f); this.renderer = l = new b(f, 0, 0, g, void 0, void 0, l.styledMode)
                            } d ? this.label = l.g("tooltip") : (this.label = l.label("", 0, 0, b.shape, void 0, void 0, b.useHTML, void 0, "tooltip").attr({ padding: b.padding, r: b.borderRadius }), c || this.label.attr({ fill: b.backgroundColor, "stroke-width": b.borderWidth || 0 }).css(b.style).css({ pointerEvents: a })); if (e.outside) {
                                const b = this.label, { xSetter: d,
                                    ySetter: c } = b; b.xSetter = function (c) { d.call(b, e.distance); f.style.left = c + "px" }; b.ySetter = function (d) { c.call(b, e.distance); f.style.top = d + "px" }
                            } this.label.attr({ zIndex: 8 }).shadow(b.shadow).add()
                        } return this.label
                    } getPlayingField() {
                        const { body: e, documentElement: c } = F, { chart: b, distance: d, outside: a } = this; return {
                            width: a ? Math.max(e.scrollWidth, c.scrollWidth, e.offsetWidth, c.offsetWidth, c.clientWidth) - 2 * d : b.chartWidth, height: a ? Math.max(e.scrollHeight, c.scrollHeight, e.offsetHeight, c.offsetHeight, c.clientHeight) :
                                b.chartHeight
                        }
                    } getPosition(e, c, b) {
                        const d = this.chart, a = this.distance, f = {}, l = d.inverted && b.h || 0, g = this.outside; var h = this.getPlayingField(); const k = h.width, u = h.height, v = d.pointer.getChartPosition(); h = m => { const f = "x" === m; return [m, f ? k : u, f ? e : c].concat(g ? [f ? e * v.scaleX : c * v.scaleY, f ? v.left - a + (b.plotX + d.plotLeft) * v.scaleX : v.top - a + (b.plotY + d.plotTop) * v.scaleY, 0, f ? k : u] : [f ? e : c, f ? b.plotX + d.plotLeft : b.plotY + d.plotTop, f ? d.plotLeft : d.plotTop, f ? d.plotLeft + d.plotWidth : d.plotTop + d.plotHeight]) }; let z = h("y"), n = h("x"),
                            p; h = !!b.negative; !d.polar && d.hoverSeries && d.hoverSeries.yAxis && d.hoverSeries.yAxis.reversed && (h = !h); const B = !this.followPointer && E(b.ttBelow, !d.inverted === h), q = function (b, d, e, c, m, h, w) { const k = g ? "y" === b ? a * v.scaleY : a * v.scaleX : a, u = (e - c) / 2, z = c < m - a, n = m + a + c < d, H = m - k - e + u; m = m + k - u; if (B && n) f[b] = m; else if (!B && z) f[b] = H; else if (z) f[b] = Math.min(w - c, 0 > H - l ? H : H - l); else if (n) f[b] = Math.max(h, m + l + e > d ? m : m + l); else return !1 }, C = function (b, d, e, c, m) { let l; m < a || m > d - a ? l = !1 : f[b] = m < e / 2 ? 1 : m > d - c / 2 ? d - c - 2 : m - e / 2; return l }, t = function (b) {
                                const d =
                                    z; z = n; n = d; p = b
                            }, L = function () { !1 !== q.apply(0, z) ? !1 !== C.apply(0, n) || p || (t(!0), L()) : p ? f.x = f.y = 0 : (t(!0), L()) }; (d.inverted || 1 < this.len) && t(); L(); return f
                    } hide(e) { const c = this; y.clearTimeout(this.hideTimer); e = E(e, this.options.hideDelay); this.isHidden || (this.hideTimer = l(function () { c.getLabel().fadeOut(e ? void 0 : e); c.isHidden = !0 }, e)) } init(e, c) {
                        this.chart = e; this.options = c; this.crosshairs = []; this.now = { x: 0, y: 0 }; this.isHidden = !0; this.split = c.split && !e.inverted && !e.polar; this.shared = c.shared || this.split; this.outside =
                            E(c.outside, !(!e.scrollablePixelsX && !e.scrollablePixelsY))
                    } shouldStickOnContact(e) { return !(this.followPointer || !this.options.stickOnContact || e && !this.chart.pointer.inClass(e.target, "highcharts-tooltip")) } move(e, c, b, d) {
                        const a = this, f = a.now, l = !1 !== a.options.animation && !a.isHidden && (1 < Math.abs(e - f.x) || 1 < Math.abs(c - f.y)), g = a.followPointer || 1 < a.len; h(f, { x: l ? (2 * f.x + e) / 3 : e, y: l ? (f.y + c) / 2 : c, anchorX: g ? void 0 : l ? (2 * f.anchorX + b) / 3 : b, anchorY: g ? void 0 : l ? (f.anchorY + d) / 2 : d }); a.getLabel().attr(f); a.drawTracker(); l &&
                            (y.clearTimeout(this.tooltipTimeout), this.tooltipTimeout = setTimeout(function () { a && a.move(e, c, b, d) }, 32))
                    } refresh(a, l) {
                        const b = this.chart, d = this.options, m = b.pointer, g = e(a), h = g[0], k = []; var v = d.format, u = d.formatter || this.defaultFormatter; const z = this.shared, n = b.styledMode; let p = {}; if (d.enabled && h.series) {
                            y.clearTimeout(this.hideTimer); this.allowShared = !(!c(a) && a.series && a.series.noSharedTooltip); this.followPointer = !this.split && h.series.tooltipOptions.followPointer; a = this.getAnchor(a, l); var q = a[0], C = a[1];
                            z && this.allowShared ? (m.applyInactiveState(g), g.forEach(function (b) { b.setState("hover"); k.push(b.getLabelConfig()) }), p = h.getLabelConfig(), p.points = k) : p = h.getLabelConfig(); this.len = k.length; v = B(v) ? r(v, p, b) : u.call(p, this); u = h.series; this.distance = E(u.tooltipOptions.distance, 16); if (!1 === v) this.hide(); else {
                                if (this.split && this.allowShared) this.renderSplit(v, g); else {
                                    let e = q, c = C; l && m.isDirectTouch && (e = l.chartX - b.plotLeft, c = l.chartY - b.plotTop); if (b.polar || !1 === u.options.clip || g.some(b => m.isDirectTouch || b.series.shouldShowTooltip(e,
                                        c))) l = this.getLabel(), d.style.width && !n || l.css({ width: (this.outside ? this.getPlayingField() : b.spacingBox).width + "px" }), l.attr({ text: v && v.join ? v.join("") : v }), l.addClass(this.getClassName(h), !0), n || l.attr({ stroke: d.borderColor || h.color || u.color || "#666666" }), this.updatePosition({ plotX: q, plotY: C, negative: h.negative, ttBelow: h.ttBelow, h: a[2] || 0 }); else { this.hide(); return }
                                } this.isHidden && this.label && this.label.attr({ opacity: 1 }).show(); this.isHidden = !1
                            } f(this, "refresh")
                        }
                    } renderSplit(e, c) {
                        function b(b, e, c, a,
                            m = !0) { c ? (e = O ? 0 : ca, b = k(b - a / 2, L.left, L.right - a - (d.outside ? U : 0))) : (e -= I, b = m ? b - a - y : b + y, b = k(b, m ? b : L.left, L.right)); return { x: b, y: e } } const d = this, { chart: a, chart: { chartWidth: f, chartHeight: l, plotHeight: g, plotLeft: v, plotTop: u, pointer: z, scrollablePixelsY: n = 0, scrollablePixelsX: p, scrollingContainer: { scrollLeft: q, scrollTop: C } = { scrollLeft: 0, scrollTop: 0 }, styledMode: r }, distance: y, options: A, options: { positioner: x } } = d, L = d.outside && "number" !== typeof p ? F.documentElement.getBoundingClientRect() : {
                                left: q, right: q + f, top: C,
                                bottom: C + l
                            }, Q = d.getLabel(), S = this.renderer || a.renderer, O = !(!a.xAxis[0] || !a.xAxis[0].opposite), { left: U, top: G } = z.getChartPosition(); let I = u + C, aa = 0, ca = g - n; B(e) && (e = [!1, e]); e = e.slice(0, c.length + 1).reduce(function (e, a, m) {
                                if (!1 !== a && "" !== a) {
                                    m = c[m - 1] || { isHeader: !0, plotX: c[0].plotX, plotY: g, series: {} }; const n = m.isHeader; var f = n ? d : m.series, l; {
                                        var h = m; a = a.toString(); var w = f.tt; const { isHeader: b, series: e } = h; w || (w = { padding: A.padding, r: A.borderRadius }, r || (w.fill = A.backgroundColor, w["stroke-width"] = null !== (l = A.borderWidth) &&
                                            void 0 !== l ? l : 1), w = S.label("", 0, 0, A[b ? "headerShape" : "shape"], void 0, void 0, A.useHTML).addClass(d.getClassName(h, !0, b)).attr(w).add(Q)); w.isActive = !0; w.attr({ text: a }); r || w.css(A.style).attr({ stroke: A.borderColor || h.color || e.color || "#333333" }); l = w
                                    } l = f.tt = l; h = l.getBBox(); f = h.width + l.strokeWidth(); n && (aa = h.height, ca += aa, O && (I -= aa)); {
                                        const { isHeader: b, plotX: d = 0, plotY: e = 0, series: c } = m; if (b) { a = v + d; var z = u + g / 2 } else {
                                            const { xAxis: b, yAxis: m } = c; a = b.pos + k(d, -y, b.len + y); c.shouldShowTooltip(0, m.pos - u + e, { ignoreX: !0 }) &&
                                                (z = m.pos + e)
                                        } a = k(a, L.left - y, L.right + y); z = { anchorX: a, anchorY: z }
                                    } const { anchorX: H, anchorY: p } = z; "number" === typeof p ? (z = h.height + 1, h = x ? x.call(d, f, z, m) : b(H, p, n, f), e.push({ align: x ? 0 : void 0, anchorX: H, anchorY: p, boxWidth: f, point: m, rank: E(h.rank, n ? 1 : 0), size: z, target: h.y, tt: l, x: h.x })) : l.isActive = !1
                                } return e
                            }, []); !x && e.some(b => { var { outside: e } = d; e = (e ? U : 0) + b.anchorX; return e < L.left && e + b.boxWidth < L.right ? !0 : e < U - L.left + b.boxWidth && L.right - e > e }) && (e = e.map(d => {
                                const { x: e, y: c } = b(d.anchorX, d.anchorY, d.point.isHeader,
                                    d.boxWidth, !1); return h(d, { target: c, x: e })
                            })); d.cleanSplit(); t(e, ca); var ba = U, K = U; e.forEach(function (b) { const { x: e, boxWidth: c, isHeader: a } = b; a || (d.outside && U + e < ba && (ba = U + e), !a && d.outside && ba + c > K && (K = U + e)) }); e.forEach(function (b) { const { x: e, anchorX: c, anchorY: a, pos: m, point: { isHeader: f } } = b, l = { visibility: "undefined" === typeof m ? "hidden" : "inherit", x: e, y: (m || 0) + I, anchorX: c, anchorY: a }; if (d.outside && e < c) { const b = U - ba; 0 < b && (f || (l.x = e + b, l.anchorX = c + b), f && (l.x = (K - ba) / 2, l.anchorX = c + b)) } b.tt.attr(l) }); const { container: ha,
                                outside: ka, renderer: ja } = d; if (ka && ha && ja) { const { width: b, height: d, x: e, y: c } = Q.getBBox(); ja.setSize(b + e, d + c, !1); ha.style.left = ba + "px"; ha.style.top = G + "px" } D && Q.attr({ opacity: 1 === Q.opacity ? .999 : 1 })
                    } drawTracker() {
                        if (this.shouldStickOnContact()) {
                            var e = this.chart, c = this.label, b = this.shared ? e.hoverPoints : e.hoverPoint; if (c && b) {
                                var d = { x: 0, y: 0, width: 0, height: 0 }; b = this.getAnchor(b); var a = c.getBBox(); b[0] += e.plotLeft - c.translateX; b[1] += e.plotTop - c.translateY; d.x = Math.min(0, b[0]); d.y = Math.min(0, b[1]); d.width = 0 >
                                    b[0] ? Math.max(Math.abs(b[0]), a.width - b[0]) : Math.max(Math.abs(b[0]), a.width); d.height = 0 > b[1] ? Math.max(Math.abs(b[1]), a.height - Math.abs(b[1])) : Math.max(Math.abs(b[1]), a.height); this.tracker ? this.tracker.attr(d) : (this.tracker = c.renderer.rect(d).addClass("highcharts-tracker").add(c), e.styledMode || this.tracker.attr({ fill: "rgba(0,0,0,0)" }))
                            }
                        } else this.tracker && (this.tracker = this.tracker.destroy())
                    } styledModeFormat(e) {
                        return e.replace('style="font-size: 0.8em"', 'class="highcharts-header"').replace(/style="color:{(point|series)\.color}"/g,
                            'class="highcharts-color-{$1.colorIndex} {series.options.className} {point.options.className}"')
                    } tooltipFooterHeaderFormatter(e, c) {
                        const b = e.series, d = b.tooltipOptions; var a = b.xAxis; const l = a && a.dateTime; a = { isFooter: c, labelConfig: e }; let h = d.xDateFormat, k = d[c ? "footerFormat" : "headerFormat"]; f(this, "headerFormatter", a, function (c) {
                            l && !h && g(e.key) && (h = l.getXDateFormat(e.key, d.dateTimeLabelFormats)); l && h && (e.point && e.point.tooltipDateKeys || ["key"]).forEach(function (b) {
                                k = k.replace("{point." + b + "}", "{point." +
                                    b + ":" + h + "}")
                            }); b.chart.styledMode && (k = this.styledModeFormat(k)); c.text = r(k, { point: e, series: b }, this.chart)
                        }); return a.text
                    } update(e) { this.destroy(); this.init(this.chart, C(!0, this.options, e)) } updatePosition(e) {
                        const { chart: c, distance: b, options: d } = this; var a = c.pointer; const f = this.getLabel(), { left: l, top: g, scaleX: h, scaleY: k } = a.getChartPosition(); a = (d.positioner || this.getPosition).call(this, f.width, f.height, e); let v = (e.plotX || 0) + c.plotLeft; e = (e.plotY || 0) + c.plotTop; let n; if (this.outside) {
                            d.positioner &&
                            (a.x += l - b, a.y += g - b); n = (d.borderWidth || 0) + 2 * b; this.renderer.setSize(f.width + n, f.height + n, !1); if (1 !== h || 1 !== k) p(this.container, { transform: `scale(${h}, ${k})` }), v *= h, e *= k; v += l - a.x; e += g - a.y
                        } this.move(Math.round(a.x), Math.round(a.y || 0), v, e)
                    }
                } (function (e) { const c = []; e.compose = function (b) { y.pushUnique(c, b) && q(b, "afterInit", function () { const b = this.chart; b.options.tooltip && (b.tooltip = new e(b, b.options.tooltip)) }) } })(v || (v = {})); ""; return v
            }); K(a, "Core/Series/Point.js", [a["Core/Renderer/HTML/AST.js"], a["Core/Animation/AnimationUtilities.js"],
            a["Core/Defaults.js"], a["Core/Templating.js"], a["Core/Utilities.js"]], function (a, x, G, I, y) {
                const { animObject: r } = x, { defaultOptions: F } = G, { format: D } = I, { addEvent: t, defined: q, erase: k, extend: p, fireEvent: n, getNestedProperty: h, isArray: f, isFunction: c, isNumber: g, isObject: B, merge: C, objectEach: E, pick: e, syncTimeout: l, removeEvent: v, uniqueKey: z } = y; class u {
                    constructor() {
                        this.category = void 0; this.destroyed = !1; this.formatPrefix = "point"; this.id = void 0; this.isNull = !1; this.percentage = this.options = this.name = void 0; this.selected =
                            !1; this.total = this.shapeArgs = this.series = void 0; this.visible = !0; this.x = void 0
                    } animateBeforeDestroy() { const b = this, d = { x: b.startXPos, opacity: 0 }, e = b.getGraphicalProps(); e.singular.forEach(function (e) { b[e] = b[e].animate("dataLabel" === e ? { x: b[e].startXPos, y: b[e].startYPos, opacity: 0 } : d) }); e.plural.forEach(function (d) { b[d].forEach(function (d) { d.element && d.animate(p({ x: b.startXPos }, d.startYPos ? { x: d.startXPos, y: d.startYPos } : {})) }) }) } applyOptions(b, d) {
                        const e = this.series, c = e.options.pointValKey || e.pointValKey;
                        b = u.prototype.optionsToObject.call(this, b); p(this, b); this.options = this.options ? p(this.options, b) : b; b.group && delete this.group; b.dataLabels && delete this.dataLabels; c && (this.y = u.prototype.getNestedProperty.call(this, c)); this.formatPrefix = (this.isNull = this.isValid && !this.isValid()) ? "null" : "point"; this.selected && (this.state = "select"); "name" in this && "undefined" === typeof d && e.xAxis && e.xAxis.hasNames && (this.x = e.xAxis.nameToX(this)); "undefined" === typeof this.x && e ? this.x = "undefined" === typeof d ? e.autoIncrement() :
                            d : g(b.x) && e.options.relativeXValue && (this.x = e.autoIncrement(b.x)); return this
                    } destroy() {
                        if (!this.destroyed) {
                            const d = this; var b = d.series; const e = b.chart; b = b.options.dataSorting; const c = e.hoverPoints, a = r(d.series.chart.renderer.globalAnimation), f = () => { if (d.graphic || d.graphics || d.dataLabel || d.dataLabels) v(d), d.destroyElements(); for (const b in d) delete d[b] }; d.legendItem && e.legend.destroyItem(d); c && (d.setState(), k(c, d), c.length || (e.hoverPoints = null)); if (d === e.hoverPoint) d.onMouseOut(); b && b.enabled ? (this.animateBeforeDestroy(),
                                l(f, a.duration)) : f(); e.pointCount--
                        } this.destroyed = !0
                    } destroyElements(b) { const d = this; b = d.getGraphicalProps(b); b.singular.forEach(function (b) { d[b] = d[b].destroy() }); b.plural.forEach(function (b) { d[b].forEach(function (b) { b && b.element && b.destroy() }); delete d[b] }) } firePointEvent(b, d, e) {
                        const c = this, a = this.series.options; (a.point.events[b] || c.options && c.options.events && c.options.events[b]) && c.importEvents(); "click" === b && a.allowPointSelect && (e = function (b) { c.select && c.select(null, b.ctrlKey || b.metaKey || b.shiftKey) });
                        n(c, b, d, e)
                    } getClassName() { return "highcharts-point" + (this.selected ? " highcharts-point-select" : "") + (this.negative ? " highcharts-negative" : "") + (this.isNull ? " highcharts-null-point" : "") + ("undefined" !== typeof this.colorIndex ? " highcharts-color-" + this.colorIndex : "") + (this.options.className ? " " + this.options.className : "") + (this.zone && this.zone.className ? " " + this.zone.className.replace("highcharts-negative", "") : "") } getGraphicalProps(b) {
                        const d = this, e = [], c = { singular: [], plural: [] }; let a, f; b = b || { graphic: 1, dataLabel: 1 };
                        b.graphic && e.push("graphic"); b.dataLabel && e.push("dataLabel", "dataLabelPath", "dataLabelUpper", "connector"); for (f = e.length; f--;)a = e[f], d[a] && c.singular.push(a);["graphic", "dataLabel", "connector"].forEach(function (e) { const a = e + "s"; b[e] && d[a] && c.plural.push(a) }); return c
                    } getLabelConfig() { return { x: this.category, y: this.y, color: this.color, colorIndex: this.colorIndex, key: this.name || this.category, series: this.series, point: this, percentage: this.percentage, total: this.total || this.stackTotal } } getNestedProperty(b) {
                        if (b) return 0 ===
                            b.indexOf("custom.") ? h(b, this.options) : this[b]
                    } getZone() { var b = this.series; const d = b.zones; b = b.zoneAxis || "y"; let e, c = 0; for (e = d[c]; this[b] >= e.value;)e = d[++c]; this.nonZonedColor || (this.nonZonedColor = this.color); this.color = e && e.color && !this.options.color ? e.color : this.nonZonedColor; return e } hasNewShapeType() { return (this.graphic && (this.graphic.symbolName || this.graphic.element.nodeName)) !== this.shapeType } init(b, d, e) {
                        this.series = b; this.applyOptions(d, e); this.id = q(this.id) ? this.id : z(); this.resolveColor();
                        b.chart.pointCount++; n(this, "afterInit"); return this
                    } isValid() { return null !== this.x && g(this.y) } optionsToObject(b) {
                        var d = this.series; const e = d.options.keys, c = e || d.pointArrayMap || ["y"], a = c.length; let l = {}, h = 0, k = 0; if (g(b) || null === b) l[c[0]] = b; else if (f(b)) for (!e && b.length > a && (d = typeof b[0], "string" === d ? l.name = b[0] : "number" === d && (l.x = b[0]), h++); k < a;)e && "undefined" === typeof b[h] || (0 < c[k].indexOf(".") ? u.prototype.setNestedProperty(l, b[h], c[k]) : l[c[k]] = b[h]), h++, k++; else "object" === typeof b && (l = b, b.dataLabels &&
                            (d._hasPointLabels = !0), b.marker && (d._hasPointMarkers = !0)); return l
                    } pos(b, d = this.plotY) { if (!this.destroyed) { const { plotX: e, series: c } = this, { chart: a, xAxis: f, yAxis: l } = c; let h = 0, k = 0; if (g(e) && g(d)) return b && (h = f ? f.pos : a.plotLeft, k = l ? l.pos : a.plotTop), a.inverted && f && l ? [l.len - d + k, f.len - e + h] : [e + h, d + k] } } resolveColor() {
                        const b = this.series; var d = b.chart.styledMode; let c; var a = b.chart.options.chart.colorCount; delete this.nonZonedColor; b.options.colorByPoint ? (d || (a = b.options.colors || b.chart.options.colors, c = a[b.colorCounter],
                            a = a.length), d = b.colorCounter, b.colorCounter++, b.colorCounter === a && (b.colorCounter = 0)) : (d || (c = b.color), d = b.colorIndex); this.colorIndex = e(this.options.colorIndex, d); this.color = e(this.options.color, c)
                    } setNestedProperty(b, d, e) { e.split(".").reduce(function (b, e, c, a) { b[e] = a.length - 1 === c ? d : B(b[e], !0) ? b[e] : {}; return b[e] }, b); return b } shouldDraw() { return !this.isNull } tooltipFormatter(b) {
                        const d = this.series, c = d.tooltipOptions, a = e(c.valueDecimals, ""), f = c.valuePrefix || "", l = c.valueSuffix || ""; d.chart.styledMode &&
                            (b = d.chart.tooltip.styledModeFormat(b)); (d.pointArrayMap || ["y"]).forEach(function (d) { d = "{point." + d; if (f || l) b = b.replace(RegExp(d + "}", "g"), f + d + "}" + l); b = b.replace(RegExp(d + "}", "g"), d + ":,." + a + "f}") }); return D(b, { point: this, series: this.series }, d.chart)
                    } update(b, d, c, a) {
                        function f() {
                            m.applyOptions(b); var a = g && m.hasMockGraphic; a = null === m.y ? !a : a; g && a && (m.graphic = g.destroy(), delete m.hasMockGraphic); B(b, !0) && (g && g.element && b && b.marker && "undefined" !== typeof b.marker.symbol && (m.graphic = g.destroy()), b && b.dataLabels &&
                                m.dataLabel && (m.dataLabel = m.dataLabel.destroy()), m.connector && (m.connector = m.connector.destroy())); w = m.index; l.updateParallelArrays(m, w); k.data[w] = B(k.data[w], !0) || B(b, !0) ? m.options : e(b, k.data[w]); l.isDirty = l.isDirtyData = !0; !l.fixedBox && l.hasCartesianSeries && (h.isDirtyBox = !0); "point" === k.legendType && (h.isDirtyLegend = !0); d && h.redraw(c)
                        } const m = this, l = m.series, g = m.graphic, h = l.chart, k = l.options; let w; d = e(d, !0); !1 === a ? f() : m.firePointEvent("update", { options: b }, f)
                    } remove(b, d) {
                        this.series.removePoint(this.series.data.indexOf(this),
                            b, d)
                    } select(b, d) {
                        const c = this, a = c.series, f = a.chart; this.selectedStaging = b = e(b, !c.selected); c.firePointEvent(b ? "select" : "unselect", { accumulate: d }, function () { c.selected = c.options.selected = b; a.options.data[a.data.indexOf(c)] = c.options; c.setState(b && "select"); d || f.getSelectedPoints().forEach(function (b) { const d = b.series; b.selected && b !== c && (b.selected = b.options.selected = !1, d.options.data[d.data.indexOf(b)] = b.options, b.setState(f.hoverPoints && d.options.inactiveOtherPoints ? "inactive" : ""), b.firePointEvent("unselect")) }) });
                        delete this.selectedStaging
                    } onMouseOver(b) { const d = this.series.chart, e = d.pointer; b = b ? e.normalize(b) : e.getChartCoordinatesFromPoint(this, d.inverted); e.runPointActions(b, this) } onMouseOut() { const b = this.series.chart; this.firePointEvent("mouseOut"); this.series.options.inactiveOtherPoints || (b.hoverPoints || []).forEach(function (b) { b.setState() }); b.hoverPoints = b.hoverPoint = null } importEvents() {
                        if (!this.hasImportedEvents) {
                            const b = this, d = C(b.series.options.point, b.options).events; b.events = d; E(d, function (d, e) {
                                c(d) &&
                                t(b, e, d)
                            }); this.hasImportedEvents = !0
                        }
                    } setState(b, d) {
                        const c = this.series; var f = this.state, l = c.options.states[b || "normal"] || {}, h = F.plotOptions[c.type].marker && c.options.marker; const k = h && !1 === h.enabled, v = h && h.states && h.states[b || "normal"] || {}, u = !1 === v.enabled, z = this.marker || {}, B = c.chart, q = h && c.markerAttribs; let C = c.halo; var E; let t; var r = c.stateMarkerGraphic; b = b || ""; if (!(b === this.state && !d || this.selected && "select" !== b || !1 === l.enabled || b && (u || k && !1 === v.enabled) || b && z.states && z.states[b] && !1 === z.states[b].enabled)) {
                            this.state =
                            b; q && (E = c.markerAttribs(this, b)); if (this.graphic && !this.hasMockGraphic) {
                                f && this.graphic.removeClass("highcharts-point-" + f); b && this.graphic.addClass("highcharts-point-" + b); if (!B.styledMode) {
                                    f = c.pointAttribs(this, b); t = e(B.options.chart.animation, l.animation); const d = f.opacity; c.options.inactiveOtherPoints && g(d) && ((this.dataLabels || []).forEach(function (b) { b && !b.hasClass("highcharts-data-label-hidden") && b.animate({ opacity: d }, t) }), this.connector && this.connector.animate({ opacity: d }, t)); this.graphic.animate(f,
                                        t)
                                } E && this.graphic.animate(E, e(B.options.chart.animation, v.animation, h.animation)); r && r.hide()
                            } else { if (b && v) { h = z.symbol || c.symbol; r && r.currentSymbol !== h && (r = r.destroy()); if (E) if (r) r[d ? "animate" : "attr"]({ x: E.x, y: E.y }); else h && (c.stateMarkerGraphic = r = B.renderer.symbol(h, E.x, E.y, E.width, E.height).add(c.markerGroup), r.currentSymbol = h); !B.styledMode && r && "inactive" !== this.state && r.attr(c.pointAttribs(this, b)) } r && (r[b && this.isInside ? "show" : "hide"](), r.element.point = this, r.addClass(this.getClassName(), !0)) } l =
                                l.halo; E = (r = this.graphic || r) && r.visibility || "inherit"; l && l.size && r && "hidden" !== E && !this.isCluster ? (C || (c.halo = C = B.renderer.path().add(r.parentGroup)), C.show()[d ? "animate" : "attr"]({ d: this.haloPath(l.size) }), C.attr({ "class": "highcharts-halo highcharts-color-" + e(this.colorIndex, c.colorIndex) + (this.className ? " " + this.className : ""), visibility: E, zIndex: -1 }), C.point = this, B.styledMode || C.attr(p({ fill: this.color || c.color, "fill-opacity": l.opacity }, a.filterUserAttributes(l.attributes || {})))) : C && C.point && C.point.haloPath &&
                                    C.animate({ d: C.point.haloPath(0) }, null, C.hide); n(this, "afterSetState", { state: b })
                        }
                    } haloPath(b) { const d = this.pos(); return d ? this.series.chart.renderer.symbols.circle(Math.floor(d[0]) - b, d[1] - b, 2 * b, 2 * b) : [] }
                } ""; return u
            }); K(a, "Core/Pointer.js", [a["Core/Color/Color.js"], a["Core/Globals.js"], a["Core/Utilities.js"]], function (a, x, G) {
                const { parse: r } = a, { charts: y, noop: A } = x, { addEvent: F, attr: D, css: t, defined: q, extend: k, find: p, fireEvent: n, isNumber: h, isObject: f, objectEach: c, offset: g, pick: B, splat: C } = G; class E {
                    constructor(e,
                        c) { this.lastValidTouch = {}; this.pinchDown = []; this.runChartClick = !1; this.eventsToUnbind = []; this.chart = e; this.hasDragged = !1; this.options = c; this.init(e, c) } applyInactiveState(e) { let c = [], a; (e || []).forEach(function (e) { a = e.series; c.push(a); a.linkedParent && c.push(a.linkedParent); a.linkedSeries && (c = c.concat(a.linkedSeries)); a.navigatorSeries && c.push(a.navigatorSeries) }); this.chart.series.forEach(function (e) { -1 === c.indexOf(e) ? e.setState("inactive", !0) : e.options.inactiveOtherPoints && e.setAllPointsToState("inactive") }) } destroy() {
                            const e =
                                this; this.eventsToUnbind.forEach(e => e()); this.eventsToUnbind = []; x.chartCount || (E.unbindDocumentMouseUp && (E.unbindDocumentMouseUp = E.unbindDocumentMouseUp()), E.unbindDocumentTouchEnd && (E.unbindDocumentTouchEnd = E.unbindDocumentTouchEnd())); clearInterval(e.tooltipTimeout); c(e, function (c, a) { e[a] = void 0 })
                        } getSelectionMarkerAttrs(e, c) {
                            const a = { args: { chartX: e, chartY: c }, attrs: {}, shapeType: "rect" }; n(this, "getSelectionMarkerAttrs", a, a => {
                                const { chart: f, mouseDownX: b = 0, mouseDownY: d = 0, zoomHor: l, zoomVert: g } = this;
                                a = a.attrs; let h; a.x = f.plotLeft; a.y = f.plotTop; a.width = l ? 1 : f.plotWidth; a.height = g ? 1 : f.plotHeight; l && (h = e - b, a.width = Math.abs(h), a.x = (0 < h ? 0 : h) + b); g && (h = c - d, a.height = Math.abs(h), a.y = (0 < h ? 0 : h) + d)
                            }); return a
                        } drag(e) {
                            const c = this.chart, a = c.options.chart; var g = c.plotLeft; const h = c.plotTop, b = c.plotWidth, d = c.plotHeight, m = this.mouseDownX || 0, k = this.mouseDownY || 0, n = f(a.panning) ? a.panning && a.panning.enabled : a.panning, p = a.panKey && e[a.panKey + "Key"]; let B = e.chartX, q = e.chartY, C = this.selectionMarker; if (!C || !C.touch) if (B <
                                g ? B = g : B > g + b && (B = g + b), q < h ? q = h : q > h + d && (q = h + d), this.hasDragged = Math.sqrt(Math.pow(m - B, 2) + Math.pow(k - q, 2)), 10 < this.hasDragged) {
                                    g = c.isInsidePlot(m - g, k - h, { visiblePlotOnly: !0 }); const { shapeType: b, attrs: d } = this.getSelectionMarkerAttrs(B, q); !c.hasCartesianSeries && !c.mapView || !this.zoomX && !this.zoomY || !g || p || C || (this.selectionMarker = C = c.renderer[b](), C.attr({ "class": "highcharts-selection-marker", zIndex: 7 }).add(), c.styledMode || C.attr({ fill: a.selectionMarkerFill || r("#334eff").setOpacity(.25).get() })); C && C.attr(d);
                                g && !C && n && c.pan(e, a.panning)
                            }
                        } dragStart(e) { const c = this.chart; c.mouseIsDown = e.type; c.cancelClick = !1; c.mouseDownX = this.mouseDownX = e.chartX; c.mouseDownY = this.mouseDownY = e.chartY } getSelectionBox(e) { const c = { args: { marker: e }, result: {} }; n(this, "getSelectionBox", c, c => { c.result = { x: e.attr ? +e.attr("x") : e.x, y: e.attr ? +e.attr("y") : e.y, width: e.attr ? e.attr("width") : e.width, height: e.attr ? e.attr("height") : e.height } }); return c.result } drop(e) {
                            const c = this, a = this.chart, f = this.hasPinched; if (this.selectionMarker) {
                                const { x: l,
                                    y: b, width: d, height: m } = this.getSelectionBox(this.selectionMarker), g = { originalEvent: e, xAxis: [], yAxis: [], x: l, y: b, width: d, height: m }; let v = !!a.mapView; if (this.hasDragged || f) a.axes.forEach(function (a) { if (a.zoomEnabled && q(a.min) && (f || c[{ xAxis: "zoomX", yAxis: "zoomY" }[a.coll]]) && h(l) && h(b) && h(d) && h(m)) { var k = a.horiz; const c = "touchend" === e.type ? a.minPixelPadding : 0, f = a.toValue((k ? l : b) + c); k = a.toValue((k ? l + d : b + m) - c); g[a.coll].push({ axis: a, min: Math.min(f, k), max: Math.max(f, k) }); v = !0 } }), v && n(a, "selection", g, function (b) {
                                        a.zoom(k(b,
                                            f ? { animation: !1 } : null))
                                    }); h(a.index) && (this.selectionMarker = this.selectionMarker.destroy()); f && this.scaleGroups()
                            } a && h(a.index) && (t(a.container, { cursor: a._cursor }), a.cancelClick = 10 < this.hasDragged, a.mouseIsDown = this.hasDragged = this.hasPinched = !1, this.pinchDown = [])
                        } findNearestKDPoint(e, c, a) {
                            let l; e.forEach(function (e) {
                                var b = !(e.noSharedTooltip && c) && 0 > e.options.findNearestPointBy.indexOf("y"); e = e.searchPoint(a, b); if ((b = f(e, !0) && e.series) && !(b = !f(l, !0))) {
                                    {
                                        b = l.distX - e.distX; const d = l.dist - e.dist, a = (e.series.group &&
                                            e.series.group.zIndex) - (l.series.group && l.series.group.zIndex); b = 0 !== b && c ? b : 0 !== d ? d : 0 !== a ? a : l.series.index > e.series.index ? -1 : 1
                                    } b = 0 < b
                                } b && (l = e)
                            }); return l
                        } getChartCoordinatesFromPoint(e, c) { var a = e.series; const f = a.xAxis; a = a.yAxis; const l = e.shapeArgs; if (f && a) { let b = B(e.clientX, e.plotX), d = e.plotY || 0; e.isNode && l && h(l.x) && h(l.y) && (b = l.x, d = l.y); return c ? { chartX: a.len + a.pos - d, chartY: f.len + f.pos - b } : { chartX: b + f.pos, chartY: d + a.pos } } if (l && l.x && l.y) return { chartX: l.x, chartY: l.y } } getChartPosition() {
                            if (this.chartPosition) return this.chartPosition;
                            var { container: e } = this.chart; const c = g(e); this.chartPosition = { left: c.left, top: c.top, scaleX: 1, scaleY: 1 }; const a = e.offsetWidth; e = e.offsetHeight; 2 < a && 2 < e && (this.chartPosition.scaleX = c.width / a, this.chartPosition.scaleY = c.height / e); return this.chartPosition
                        } getCoordinates(e) { const c = { xAxis: [], yAxis: [] }; this.chart.axes.forEach(function (a) { c[a.isXAxis ? "xAxis" : "yAxis"].push({ axis: a, value: a.toValue(e[a.horiz ? "chartX" : "chartY"]) }) }); return c } getHoverData(e, c, a, g, h, b) {
                            const d = []; g = !(!g || !e); const l = function (b) {
                                return b.visible &&
                                    !(!h && b.directTouch) && B(b.options.enableMouseTracking, !0)
                            }; let k, v = { chartX: b ? b.chartX : void 0, chartY: b ? b.chartY : void 0, shared: h }; n(this, "beforeGetHoverData", v); k = c && !c.stickyTracking ? [c] : a.filter(b => b.stickyTracking && (v.filter || l)(b)); const u = g || !b ? e : this.findNearestKDPoint(k, h, b); c = u && u.series; u && (h && !c.noSharedTooltip ? (k = a.filter(function (b) { return v.filter ? v.filter(b) : l(b) && !b.noSharedTooltip }), k.forEach(function (b) {
                                let e = p(b.points, function (b) { return b.x === u.x && !b.isNull }); f(e) && (b.boosted && b.boost &&
                                    (e = b.boost.getPoint(e)), d.push(e))
                            })) : d.push(u)); v = { hoverPoint: u }; n(this, "afterGetHoverData", v); return { hoverPoint: v.hoverPoint, hoverSeries: c, hoverPoints: d }
                        } getPointFromEvent(e) { e = e.target; let c; for (; e && !c;)c = e.point, e = e.parentNode; return c } onTrackerMouseOut(e) { e = e.relatedTarget; const c = this.chart.hoverSeries; this.isDirectTouch = !1; if (!(!c || !e || c.stickyTracking || this.inClass(e, "highcharts-tooltip") || this.inClass(e, "highcharts-series-" + c.index) && this.inClass(e, "highcharts-tracker"))) c.onMouseOut() } inClass(e,
                            c) { let a; for (; e;) { if (a = D(e, "class")) { if (-1 !== a.indexOf(c)) return !0; if (-1 !== a.indexOf("highcharts-container")) return !1 } e = e.parentElement } } init(e, c) { this.options = c; this.chart = e; this.runChartClick = !(!c.chart.events || !c.chart.events.click); this.pinchDown = []; this.lastValidTouch = {}; this.setDOMEvents(); n(this, "afterInit") } normalize(e, c) {
                                var a = e.touches, f = a ? a.length ? a.item(0) : B(a.changedTouches, e.changedTouches)[0] : e; c || (c = this.getChartPosition()); a = f.pageX - c.left; f = f.pageY - c.top; a /= c.scaleX; f /= c.scaleY;
                                return k(e, { chartX: Math.round(a), chartY: Math.round(f) })
                            } onContainerClick(e) { const c = this.chart, a = c.hoverPoint; e = this.normalize(e); const f = c.plotLeft, g = c.plotTop; c.cancelClick || (a && this.inClass(e.target, "highcharts-tracker") ? (n(a.series, "click", k(e, { point: a })), c.hoverPoint && a.firePointEvent("click", e)) : (k(e, this.getCoordinates(e)), c.isInsidePlot(e.chartX - f, e.chartY - g, { visiblePlotOnly: !0 }) && n(c, "click", e))) } onContainerMouseDown(e) {
                                const c = 1 === ((e.buttons || e.button) & 1); e = this.normalize(e); if (x.isFirefox &&
                                    0 !== e.button) this.onContainerMouseMove(e); if ("undefined" === typeof e.button || c) this.zoomOption(e), c && e.preventDefault && e.preventDefault(), this.dragStart(e)
                            } onContainerMouseLeave(e) { const c = y[B(E.hoverChartIndex, -1)]; e = this.normalize(e); c && e.relatedTarget && !this.inClass(e.relatedTarget, "highcharts-tooltip") && (c.pointer.reset(), c.pointer.chartPosition = void 0) } onContainerMouseEnter(e) { delete this.chartPosition } onContainerMouseMove(e) {
                                const c = this.chart, a = c.tooltip; e = this.normalize(e); this.setHoverChartIndex();
                                ("mousedown" === c.mouseIsDown || this.touchSelect(e)) && this.drag(e); c.openMenu || !this.inClass(e.target, "highcharts-tracker") && !c.isInsidePlot(e.chartX - c.plotLeft, e.chartY - c.plotTop, { visiblePlotOnly: !0 }) || a && a.shouldStickOnContact(e) || (this.inClass(e.target, "highcharts-no-tooltip") ? this.reset(!1, 0) : this.runPointActions(e))
                            } onDocumentTouchEnd(e) { const c = y[B(E.hoverChartIndex, -1)]; c && c.pointer.drop(e) } onContainerTouchMove(e) { if (this.touchSelect(e)) this.onContainerMouseMove(e); else this.touch(e) } onContainerTouchStart(e) {
                                if (this.touchSelect(e)) this.onContainerMouseDown(e);
                                else this.zoomOption(e), this.touch(e, !0)
                            } onDocumentMouseMove(e) { const c = this.chart, a = c.tooltip, f = this.chartPosition; e = this.normalize(e, f); !f || c.isInsidePlot(e.chartX - c.plotLeft, e.chartY - c.plotTop, { visiblePlotOnly: !0 }) || a && a.shouldStickOnContact(e) || this.inClass(e.target, "highcharts-tracker") || this.reset() } onDocumentMouseUp(e) { const c = y[B(E.hoverChartIndex, -1)]; c && c.pointer.drop(e) } pinch(e) {
                                const c = this, a = c.chart, f = c.pinchDown, g = e.touches || [], b = g.length, d = c.lastValidTouch, m = c.hasZoom, h = {}, p = 1 === b &&
                                    (c.inClass(e.target, "highcharts-tracker") && a.runTrackerClick || c.runChartClick), C = {}; var q = c.chart.tooltip; q = 1 === b && B(q && q.options.followTouchMove, !0); let E = c.selectionMarker; 1 < b ? c.initiated = !0 : q && (c.initiated = !1); m && c.initiated && !p && !1 !== e.cancelable && e.preventDefault();[].map.call(g, function (b) { return c.normalize(b) }); "touchstart" === e.type ? ([].forEach.call(g, function (b, d) { f[d] = { chartX: b.chartX, chartY: b.chartY } }), d.x = [f[0].chartX, f[1] && f[1].chartX], d.y = [f[0].chartY, f[1] && f[1].chartY], a.axes.forEach(function (b) {
                                        if (b.zoomEnabled) {
                                            const d =
                                                a.bounds[b.horiz ? "h" : "v"], e = b.minPixelPadding, c = b.toPixels(Math.min(B(b.options.min, b.dataMin), b.dataMin)), f = b.toPixels(Math.max(B(b.options.max, b.dataMax), b.dataMax)), m = Math.max(c, f); d.min = Math.min(b.pos, Math.min(c, f) - e); d.max = Math.max(b.pos + b.len, m + e)
                                        }
                                    }), c.res = !0) : q ? this.runPointActions(c.normalize(e)) : f.length && (n(a, "touchpan", { originalEvent: e }, () => { E || (c.selectionMarker = E = k({ destroy: A, touch: !0 }, a.plotBox)); c.pinchTranslate(f, g, h, E, C, d); c.hasPinched = m; c.scaleGroups(h, C) }), c.res && (c.res = !1, this.reset(!1,
                                        0)))
                            } pinchTranslate(e, c, a, f, g, b) { this.zoomHor && this.pinchTranslateDirection(!0, e, c, a, f, g, b); this.zoomVert && this.pinchTranslateDirection(!1, e, c, a, f, g, b) } pinchTranslateDirection(e, c, a, f, g, b, d, m) {
                                const l = this.chart, h = e ? "x" : "y", k = e ? "X" : "Y", n = "chart" + k, v = e ? "width" : "height", u = l["plot" + (e ? "Left" : "Top")], z = l.inverted, p = l.bounds[e ? "h" : "v"], B = 1 === c.length, q = c[0][n], C = !B && c[1][n]; c = function () {
                                    "number" === typeof y && 20 < Math.abs(q - C) && (t = m || Math.abs(L - y) / Math.abs(q - C)); r = (u - L) / t + q; E = l["plot" + (e ? "Width" : "Height")] /
                                        t
                                }; let E, r, t = m || 1, L = a[0][n], y = !B && a[1][n], S; c(); a = r; a < p.min ? (a = p.min, S = !0) : a + E > p.max && (a = p.max - E, S = !0); S ? (L -= .8 * (L - d[h][0]), "number" === typeof y && (y -= .8 * (y - d[h][1])), c()) : d[h] = [L, y]; z || (b[h] = r - u, b[v] = E); b = z ? 1 / t : t; g[v] = E; g[h] = a; f[z ? e ? "scaleY" : "scaleX" : "scale" + k] = t; f["translate" + k] = b * u + (L - b * q)
                            } reset(e, c) {
                                const a = this.chart, f = a.hoverSeries, g = a.hoverPoint, b = a.hoverPoints, d = a.tooltip, m = d && d.shared ? b : g; e && m && C(m).forEach(function (b) { b.series.isCartesian && "undefined" === typeof b.plotX && (e = !1) }); if (e) d && m &&
                                    C(m).length && (d.refresh(m), d.shared && b ? b.forEach(function (b) { b.setState(b.state, !0); b.series.isCartesian && (b.series.xAxis.crosshair && b.series.xAxis.drawCrosshair(null, b), b.series.yAxis.crosshair && b.series.yAxis.drawCrosshair(null, b)) }) : g && (g.setState(g.state, !0), a.axes.forEach(function (b) { b.crosshair && g.series[b.coll] === b && b.drawCrosshair(null, g) }))); else {
                                        if (g) g.onMouseOut(); b && b.forEach(function (b) { b.setState() }); if (f) f.onMouseOut(); d && d.hide(c); this.unDocMouseMove && (this.unDocMouseMove = this.unDocMouseMove());
                                    a.axes.forEach(function (b) { b.hideCrosshair() }); this.hoverX = a.hoverPoints = a.hoverPoint = null
                                }
                            } runPointActions(e, c, a) {
                                const f = this.chart, g = f.tooltip && f.tooltip.options.enabled ? f.tooltip : void 0, b = g ? g.shared : !1; let d = c || f.hoverPoint, m = d && d.series || f.hoverSeries; c = this.getHoverData(d, m, f.series, (!e || "touchmove" !== e.type) && (!!c || m && m.directTouch && this.isDirectTouch), b, e); d = c.hoverPoint; m = c.hoverSeries; const l = c.hoverPoints; c = m && m.tooltipOptions.followPointer && !m.tooltipOptions.split; const h = b && m && !m.noSharedTooltip;
                                if (d && (a || d !== f.hoverPoint || g && g.isHidden)) { (f.hoverPoints || []).forEach(function (b) { -1 === l.indexOf(b) && b.setState() }); if (f.hoverSeries !== m) m.onMouseOver(); this.applyInactiveState(l); (l || []).forEach(function (b) { b.setState("hover") }); f.hoverPoint && f.hoverPoint.firePointEvent("mouseOut"); if (!d.series) return; f.hoverPoints = l; f.hoverPoint = d; d.firePointEvent("mouseOver", void 0, () => { g && d && g.refresh(h ? l : d, e) }) } else c && g && !g.isHidden && (a = g.getAnchor([{}], e), f.isInsidePlot(a[0], a[1], { visiblePlotOnly: !0 }) && g.updatePosition({
                                    plotX: a[0],
                                    plotY: a[1]
                                })); this.unDocMouseMove || (this.unDocMouseMove = F(f.container.ownerDocument, "mousemove", function (b) { const d = y[E.hoverChartIndex]; if (d) d.pointer.onDocumentMouseMove(b) }), this.eventsToUnbind.push(this.unDocMouseMove)); f.axes.forEach(function (b) { const d = B((b.crosshair || {}).snap, !0); let c; d && ((c = f.hoverPoint) && c.series[b.coll] === b || (c = p(l, d => d.series && d.series[b.coll] === b))); c || !d ? b.drawCrosshair(e, c) : b.hideCrosshair() })
                            } scaleGroups(c, a) {
                                const e = this.chart; e.series.forEach(function (f) {
                                    const g =
                                        c || f.getPlotBox(); f.group && (f.xAxis && f.xAxis.zoomEnabled || e.mapView) && (f.group.attr(g), f.markerGroup && (f.markerGroup.attr(g), f.markerGroup.clip(a ? e.clipRect : null)), f.dataLabelsGroup && f.dataLabelsGroup.attr(g))
                                }); e.clipRect.attr(a || e.clipBox)
                            } setDOMEvents() {
                                const c = this.chart.container, a = c.ownerDocument; c.onmousedown = this.onContainerMouseDown.bind(this); c.onmousemove = this.onContainerMouseMove.bind(this); c.onclick = this.onContainerClick.bind(this); this.eventsToUnbind.push(F(c, "mouseenter", this.onContainerMouseEnter.bind(this)));
                                this.eventsToUnbind.push(F(c, "mouseleave", this.onContainerMouseLeave.bind(this))); E.unbindDocumentMouseUp || (E.unbindDocumentMouseUp = F(a, "mouseup", this.onDocumentMouseUp.bind(this))); let f = this.chart.renderTo.parentElement; for (; f && "BODY" !== f.tagName;)this.eventsToUnbind.push(F(f, "scroll", () => { delete this.chartPosition })), f = f.parentElement; x.hasTouch && (this.eventsToUnbind.push(F(c, "touchstart", this.onContainerTouchStart.bind(this), { passive: !1 })), this.eventsToUnbind.push(F(c, "touchmove", this.onContainerTouchMove.bind(this),
                                    { passive: !1 })), E.unbindDocumentTouchEnd || (E.unbindDocumentTouchEnd = F(a, "touchend", this.onDocumentTouchEnd.bind(this), { passive: !1 })))
                            } setHoverChartIndex() { const c = this.chart, a = x.charts[B(E.hoverChartIndex, -1)]; if (a && a !== c) a.pointer.onContainerMouseLeave({ relatedTarget: c.container }); a && a.mouseIsDown || (E.hoverChartIndex = c.index) } touch(c, a) {
                                const e = this.chart; let f, g; this.setHoverChartIndex(); 1 === c.touches.length ? (c = this.normalize(c), (g = e.isInsidePlot(c.chartX - e.plotLeft, c.chartY - e.plotTop, { visiblePlotOnly: !0 })) &&
                                    !e.openMenu ? (a && this.runPointActions(c), "touchmove" === c.type && (a = this.pinchDown, f = a[0] ? 4 <= Math.sqrt(Math.pow(a[0].chartX - c.chartX, 2) + Math.pow(a[0].chartY - c.chartY, 2)) : !1), B(f, !0) && this.pinch(c)) : a && this.reset()) : 2 === c.touches.length && this.pinch(c)
                            } touchSelect(c) { return !(!this.chart.zooming.singleTouch || !c.touches || 1 !== c.touches.length) } zoomOption(c) {
                                const e = this.chart, a = e.inverted; var f = e.zooming.type || ""; /touch/.test(c.type) && (f = B(e.zooming.pinchType, f)); this.zoomX = c = /x/.test(f); this.zoomY = f = /y/.test(f);
                                this.zoomHor = c && !a || f && a; this.zoomVert = f && !a || c && a; this.hasZoom = c || f
                            }
                } (function (c) { const e = [], a = []; c.compose = function (e) { G.pushUnique(a, e) && F(e, "beforeRender", function () { this.pointer = new c(this, this.options) }) }; c.dissolve = function () { for (let c = 0, a = e.length; c < a; ++c)e[c](); e.length = 0 } })(E || (E = {})); ""; return E
            }); K(a, "Core/Legend/Legend.js", [a["Core/Animation/AnimationUtilities.js"], a["Core/Templating.js"], a["Core/Globals.js"], a["Core/Series/Point.js"], a["Core/Renderer/RendererUtilities.js"], a["Core/Utilities.js"]],
                function (a, x, G, I, y, A) {
                    const { animObject: r, setAnimation: D } = a, { format: t } = x, { marginNames: q } = G, { distribute: k } = y, { addEvent: p, createElement: n, css: h, defined: f, discardElement: c, find: g, fireEvent: B, isNumber: C, merge: E, pick: e, relativeLength: l, stableSort: v, syncTimeout: z } = A; class u {
                        constructor(b, d) {
                            this.allItems = []; this.contentGroup = this.box = void 0; this.display = !1; this.group = void 0; this.offsetWidth = this.maxLegendWidth = this.maxItemWidth = this.legendWidth = this.legendHeight = this.lastLineHeight = this.lastItemY = this.itemY =
                                this.itemX = this.itemMarginTop = this.itemMarginBottom = this.itemHeight = this.initialItemY = 0; this.options = void 0; this.padding = 0; this.pages = []; this.proximate = !1; this.scrollGroup = void 0; this.widthOption = this.totalItemWidth = this.titleHeight = this.symbolWidth = this.symbolHeight = 0; this.chart = b; this.init(b, d)
                        } init(b, d) {
                            this.chart = b; this.setOptions(d); d.enabled && (this.render(), p(this.chart, "endResize", function () { this.legend.positionCheckboxes() }), p(this.chart, "render", () => {
                                this.proximate && (this.proximatePositions(),
                                    this.positionItems())
                            }))
                        } setOptions(b) { const d = e(b.padding, 8); this.options = b; this.chart.styledMode || (this.itemStyle = b.itemStyle, this.itemHiddenStyle = E(this.itemStyle, b.itemHiddenStyle)); this.itemMarginTop = b.itemMarginTop; this.itemMarginBottom = b.itemMarginBottom; this.padding = d; this.initialItemY = d - 5; this.symbolWidth = e(b.symbolWidth, 16); this.pages = []; this.proximate = "proximate" === b.layout && !this.chart.inverted; this.baseline = void 0 } update(b, d) {
                            const c = this.chart; this.setOptions(E(!0, this.options, b)); this.destroy();
                            c.isDirtyLegend = c.isDirtyBox = !0; e(d, !0) && c.redraw(); B(this, "afterUpdate")
                        } colorizeItem(b, d) {
                            const { group: c, label: e, line: a, symbol: f } = b.legendItem || {}; if (c) c[d ? "removeClass" : "addClass"]("highcharts-legend-item-hidden"); if (!this.chart.styledMode) {
                                const { itemHiddenStyle: c } = this, m = c.color, g = d ? b.color || m : m, l = b.options && b.options.marker; let h = { fill: g }; null === e || void 0 === e ? void 0 : e.css(E(d ? this.itemStyle : c)); null === a || void 0 === a ? void 0 : a.attr({ stroke: g }); f && (l && f.isMarker && (h = b.pointAttribs(), d || (h.stroke =
                                    h.fill = m)), f.attr(h))
                            } B(this, "afterColorizeItem", { item: b, visible: d })
                        } positionItems() { this.allItems.forEach(this.positionItem, this); this.chart.isResizing || this.positionCheckboxes() } positionItem(b) { const { group: d, x: c = 0, y: e = 0 } = b.legendItem || {}; var a = this.options, g = a.symbolPadding; const l = !a.rtl; a = b.checkbox; d && d.element && (g = { translateX: l ? c : this.legendWidth - c - 2 * g - 4, translateY: e }, d[f(d.translateY) ? "animate" : "attr"](g, void 0, () => { B(this, "afterPositionItem", { item: b }) })); a && (a.x = c, a.y = e) } destroyItem(b) {
                            const d =
                                b.checkbox, e = b.legendItem || {}; for (const b of ["group", "label", "line", "symbol"]) e[b] && (e[b] = e[b].destroy()); d && c(d); b.legendItem = void 0
                        } destroy() { for (const b of this.getAllItems()) this.destroyItem(b); for (const b of "clipRect up down pager nav box title group".split(" ")) this[b] && (this[b] = this[b].destroy()); this.display = null } positionCheckboxes() {
                            const b = this.group && this.group.alignAttr, d = this.clipHeight || this.legendHeight, c = this.titleHeight; let e; b && (e = b.translateY, this.allItems.forEach(function (a) {
                                const f =
                                    a.checkbox; let g; f && (g = e + c + f.y + (this.scrollOffset || 0) + 3, h(f, { left: b.translateX + a.checkboxOffset + f.x - 20 + "px", top: g + "px", display: this.proximate || g > e - 6 && g < e + d - 6 ? "" : "none" }))
                            }, this))
                        } renderTitle() {
                            var b = this.options; const d = this.padding, c = b.title; let e = 0; c.text && (this.title || (this.title = this.chart.renderer.label(c.text, d - 3, d - 4, void 0, void 0, void 0, b.useHTML, void 0, "legend-title").attr({ zIndex: 1 }), this.chart.styledMode || this.title.css(c.style), this.title.add(this.group)), c.width || this.title.css({
                                width: this.maxLegendWidth +
                                    "px"
                            }), b = this.title.getBBox(), e = b.height, this.offsetWidth = b.width, this.contentGroup.attr({ translateY: e })); this.titleHeight = e
                        } setText(b) { const d = this.options; b.legendItem.label.attr({ text: d.labelFormat ? t(d.labelFormat, b, this.chart) : d.labelFormatter.call(b) }) } renderItem(b) {
                            const d = b.legendItem = b.legendItem || {}; var c = this.chart, a = c.renderer; const f = this.options, g = this.symbolWidth, l = f.symbolPadding || 0, h = this.itemStyle, k = this.itemHiddenStyle, n = "horizontal" === f.layout ? e(f.itemDistance, 20) : 0, v = !f.rtl, u =
                                !b.series, p = !u && b.series.drawLegendSymbol ? b.series : b; var z = p.options; const B = this.createCheckboxForItem && z && z.showCheckbox, q = f.useHTML, C = b.options.className; let L = d.label; z = g + l + n + (B ? 20 : 0); L || (d.group = a.g("legend-item").addClass("highcharts-" + p.type + "-series highcharts-color-" + b.colorIndex + (C ? " " + C : "") + (u ? " highcharts-series-" + b.index : "")).attr({ zIndex: 1 }).add(this.scrollGroup), d.label = L = a.text("", v ? g + l : -l, this.baseline || 0, q), c.styledMode || L.css(E(b.visible ? h : k)), L.attr({ align: v ? "left" : "right", zIndex: 2 }).add(d.group),
                                    this.baseline || (this.fontMetrics = a.fontMetrics(L), this.baseline = this.fontMetrics.f + 3 + this.itemMarginTop, L.attr("y", this.baseline), this.symbolHeight = e(f.symbolHeight, this.fontMetrics.f), f.squareSymbol && (this.symbolWidth = e(f.symbolWidth, Math.max(this.symbolHeight, 16)), z = this.symbolWidth + l + n + (B ? 20 : 0), v && L.attr("x", this.symbolWidth + l))), p.drawLegendSymbol(this, b), this.setItemEvents && this.setItemEvents(b, L, q)); B && !b.checkbox && this.createCheckboxForItem && this.createCheckboxForItem(b); this.colorizeItem(b,
                                        b.visible); !c.styledMode && h.width || L.css({ width: (f.itemWidth || this.widthOption || c.spacingBox.width) - z + "px" }); this.setText(b); c = L.getBBox(); a = this.fontMetrics && this.fontMetrics.h || 0; b.itemWidth = b.checkboxOffset = f.itemWidth || d.labelWidth || c.width + z; this.maxItemWidth = Math.max(this.maxItemWidth, b.itemWidth); this.totalItemWidth += b.itemWidth; this.itemHeight = b.itemHeight = Math.round(d.labelHeight || (c.height > 1.5 * a ? c.height : a))
                        } layoutItem(b) {
                            var d = this.options; const c = this.padding, a = "horizontal" === d.layout,
                                f = b.itemHeight, g = this.itemMarginBottom, l = this.itemMarginTop, h = a ? e(d.itemDistance, 20) : 0, k = this.maxLegendWidth; d = d.alignColumns && this.totalItemWidth > k ? this.maxItemWidth : b.itemWidth; const n = b.legendItem || {}; a && this.itemX - c + d > k && (this.itemX = c, this.lastLineHeight && (this.itemY += l + this.lastLineHeight + g), this.lastLineHeight = 0); this.lastItemY = l + this.itemY + g; this.lastLineHeight = Math.max(f, this.lastLineHeight); n.x = this.itemX; n.y = this.itemY; a ? this.itemX += d : (this.itemY += l + f + g, this.lastLineHeight = f); this.offsetWidth =
                                    this.widthOption || Math.max((a ? this.itemX - c - (b.checkbox ? 0 : h) : d) + c, this.offsetWidth)
                        } getAllItems() { let b = []; this.chart.series.forEach(function (d) { const c = d && d.options; d && e(c.showInLegend, f(c.linkedTo) ? !1 : void 0, !0) && (b = b.concat((d.legendItem || {}).labels || ("point" === c.legendType ? d.data : d))) }); B(this, "afterGetAllItems", { allItems: b }); return b } getAlignment() { const b = this.options; return this.proximate ? b.align.charAt(0) + "tv" : b.floating ? "" : b.align.charAt(0) + b.verticalAlign.charAt(0) + b.layout.charAt(0) } adjustMargins(b,
                            d) { const c = this.chart, a = this.options, g = this.getAlignment(); g && [/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/].forEach(function (m, l) { m.test(g) && !f(b[l]) && (c[q[l]] = Math.max(c[q[l]], c.legend[(l + 1) % 2 ? "legendHeight" : "legendWidth"] + [1, -1, -1, 1][l] * a[l % 2 ? "x" : "y"] + e(a.margin, 12) + d[l] + (c.titleOffset[l] || 0))) }) } proximatePositions() {
                                const b = this.chart, d = [], c = "left" === this.options.align; this.allItems.forEach(function (e) {
                                    var a; var f = c; let m; e.yAxis && (e.xAxis.options.reversed && (f = !f), e.points && (a =
                                        g(f ? e.points : e.points.slice(0).reverse(), function (b) { return C(b.plotY) })), f = this.itemMarginTop + e.legendItem.label.getBBox().height + this.itemMarginBottom, m = e.yAxis.top - b.plotTop, e.visible ? (a = a ? a.plotY : e.yAxis.height, a += m - .3 * f) : a = m + e.yAxis.height, d.push({ target: a, size: f, item: e }))
                                }, this); let e; for (const c of k(d, b.plotHeight)) e = c.item.legendItem || {}, C(c.pos) && (e.y = b.plotTop - b.spacing[0] + c.pos)
                            } render() {
                                const b = this.chart, d = b.renderer, c = this.options, e = this.padding; var a = this.getAllItems(); let f, g = this.group,
                                    h = this.box; this.itemX = e; this.itemY = this.initialItemY; this.lastItemY = this.offsetWidth = 0; this.widthOption = l(c.width, b.spacingBox.width - e); var k = b.spacingBox.width - 2 * e - c.x; -1 < ["rm", "lm"].indexOf(this.getAlignment().substring(0, 2)) && (k /= 2); this.maxLegendWidth = this.widthOption || k; g || (this.group = g = d.g("legend").addClass(c.className || "").attr({ zIndex: 7 }).add(), this.contentGroup = d.g().attr({ zIndex: 1 }).add(g), this.scrollGroup = d.g().add(this.contentGroup)); this.renderTitle(); v(a, (b, d) => (b.options && b.options.legendIndex ||
                                        0) - (d.options && d.options.legendIndex || 0)); c.reversed && a.reverse(); this.allItems = a; this.display = k = !!a.length; this.itemHeight = this.totalItemWidth = this.maxItemWidth = this.lastLineHeight = 0; a.forEach(this.renderItem, this); a.forEach(this.layoutItem, this); a = (this.widthOption || this.offsetWidth) + e; f = this.lastItemY + this.lastLineHeight + this.titleHeight; f = this.handleOverflow(f); f += e; h || (this.box = h = d.rect().addClass("highcharts-legend-box").attr({ r: c.borderRadius }).add(g)); b.styledMode || h.attr({
                                            stroke: c.borderColor,
                                            "stroke-width": c.borderWidth || 0, fill: c.backgroundColor || "none"
                                        }).shadow(c.shadow); if (0 < a && 0 < f) h[h.placed ? "animate" : "attr"](h.crisp.call({}, { x: 0, y: 0, width: a, height: f }, h.strokeWidth())); g[k ? "show" : "hide"](); b.styledMode && "none" === g.getStyle("display") && (a = f = 0); this.legendWidth = a; this.legendHeight = f; k && this.align(); this.proximate || this.positionItems(); B(this, "afterRender")
                            } align(b = this.chart.spacingBox) {
                                const d = this.chart, c = this.options; let e = b.y; /(lth|ct|rth)/.test(this.getAlignment()) && 0 < d.titleOffset[0] ?
                                    e += d.titleOffset[0] : /(lbh|cb|rbh)/.test(this.getAlignment()) && 0 < d.titleOffset[2] && (e -= d.titleOffset[2]); e !== b.y && (b = E(b, { y: e })); d.hasRendered || (this.group.placed = !1); this.group.align(E(c, { width: this.legendWidth, height: this.legendHeight, verticalAlign: this.proximate ? "top" : c.verticalAlign }), !0, b)
                            } handleOverflow(b) {
                                const d = this, c = this.chart, a = c.renderer, f = this.options; var g = f.y; const l = "top" === f.verticalAlign, h = this.padding, k = f.maxHeight, n = f.navigation, v = e(n.animation, !0), u = n.arrowSize || 12, p = this.pages,
                                    z = this.allItems, B = function (b) { "number" === typeof b ? t.attr({ height: b }) : t && (d.clipRect = t.destroy(), d.contentGroup.clip()); d.contentGroup.div && (d.contentGroup.div.style.clip = b ? "rect(" + h + "px,9999px," + (h + b) + "px,0)" : "auto") }, q = function (b) { d[b] = a.circle(0, 0, 1.3 * u).translate(u / 2, u / 2).add(r); c.styledMode || d[b].attr("fill", "rgba(0,0,0,0.0001)"); return d[b] }; let C, L, E; g = c.spacingBox.height + (l ? -g : g) - h; let r = this.nav, t = this.clipRect; "horizontal" !== f.layout || "middle" === f.verticalAlign || f.floating || (g /= 2); k && (g =
                                        Math.min(g, k)); p.length = 0; b && 0 < g && b > g && !1 !== n.enabled ? (this.clipHeight = C = Math.max(g - 20 - this.titleHeight - h, 0), this.currentPage = e(this.currentPage, 1), this.fullHeight = b, z.forEach((b, d) => { E = b.legendItem || {}; b = E.y || 0; const c = Math.round(E.label.getBBox().height); let e = p.length; if (!e || b - p[e - 1] > C && (L || b) !== p[e - 1]) p.push(L || b), e++; E.pageIx = e - 1; L && ((z[d - 1].legendItem || {}).pageIx = e - 1); d === z.length - 1 && b + c - p[e - 1] > C && b > p[e - 1] && (p.push(b), E.pageIx = e); b !== L && (L = b) }), t || (t = d.clipRect = a.clipRect(0, h - 2, 9999, 0), d.contentGroup.clip(t)),
                                            B(C), r || (this.nav = r = a.g().attr({ zIndex: 1 }).add(this.group), this.up = a.symbol("triangle", 0, 0, u, u).add(r), q("upTracker").on("click", function () { d.scroll(-1, v) }), this.pager = a.text("", 15, 10).addClass("highcharts-legend-navigation"), !c.styledMode && n.style && this.pager.css(n.style), this.pager.add(r), this.down = a.symbol("triangle-down", 0, 0, u, u).add(r), q("downTracker").on("click", function () { d.scroll(1, v) })), d.scroll(0), b = g) : r && (B(), this.nav = r.destroy(), this.scrollGroup.attr({ translateY: 1 }), this.clipHeight = 0);
                                return b
                            } scroll(b, d) {
                                const c = this.chart, a = this.pages, f = a.length, g = this.clipHeight, l = this.options.navigation, h = this.pager, k = this.padding; let n = this.currentPage + b; n > f && (n = f); 0 < n && ("undefined" !== typeof d && D(d, c), this.nav.attr({ translateX: k, translateY: g + this.padding + 7 + this.titleHeight, visibility: "inherit" }), [this.up, this.upTracker].forEach(function (b) { b.attr({ "class": 1 === n ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active" }) }), h.attr({ text: n + "/" + f }), [this.down, this.downTracker].forEach(function (b) {
                                    b.attr({
                                        x: 18 +
                                            this.pager.getBBox().width, "class": n === f ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
                                    })
                                }, this), c.styledMode || (this.up.attr({ fill: 1 === n ? l.inactiveColor : l.activeColor }), this.upTracker.css({ cursor: 1 === n ? "default" : "pointer" }), this.down.attr({ fill: n === f ? l.inactiveColor : l.activeColor }), this.downTracker.css({ cursor: n === f ? "default" : "pointer" })), this.scrollOffset = -a[n - 1] + this.initialItemY, this.scrollGroup.animate({ translateY: this.scrollOffset }), this.currentPage = n, this.positionCheckboxes(),
                                    b = r(e(d, c.renderer.globalAnimation, !0)), z(() => { B(this, "afterScroll", { currentPage: n }) }, b.duration))
                            } setItemEvents(b, d, c) {
                                const e = this, a = b.legendItem || {}, f = e.chart.renderer.boxWrapper, g = b instanceof I, m = "highcharts-legend-" + (g ? "point" : "series") + "-active", l = e.chart.styledMode; c = c ? [d, a.symbol] : [a.group]; const h = d => { e.allItems.forEach(c => { b !== c && [c].concat(c.linkedSeries || []).forEach(b => { b.setState(d, !g) }) }) }; for (const a of c) if (a) a.on("mouseover", function () {
                                    b.visible && h("inactive"); b.setState("hover");
                                    b.visible && f.addClass(m); l || d.css(e.options.itemHoverStyle)
                                }).on("mouseout", function () { e.chart.styledMode || d.css(E(b.visible ? e.itemStyle : e.itemHiddenStyle)); h(""); f.removeClass(m); b.setState() }).on("click", function (d) { const c = function () { b.setVisible && b.setVisible(); h(b.visible ? "inactive" : "") }; f.removeClass(m); d = { browserEvent: d }; b.firePointEvent ? b.firePointEvent("legendItemClick", d, c) : B(b, "legendItemClick", d, c) })
                            } createCheckboxForItem(b) {
                                b.checkbox = n("input", {
                                    type: "checkbox", className: "highcharts-legend-checkbox",
                                    checked: b.selected, defaultChecked: b.selected
                                }, this.options.itemCheckboxStyle, this.chart.container); p(b.checkbox, "click", function (d) { B(b.series || b, "checkboxClick", { checked: d.target.checked, item: b }, function () { b.select() }) })
                            }
                    } (function (b) { const d = []; b.compose = function (c) { A.pushUnique(d, c) && p(c, "beforeMargins", function () { this.legend = new b(this, this.options.legend) }) } })(u || (u = {})); ""; return u
                }); K(a, "Core/Legend/LegendSymbol.js", [a["Core/Utilities.js"]], function (a) {
                    const { extend: r, merge: G, pick: I } = a; var y;
                    (function (a) {
                        a.lineMarker = function (a, y) {
                            y = this.legendItem = this.legendItem || {}; var t = this.options; const q = a.symbolWidth, k = a.symbolHeight, p = k / 2, n = this.chart.renderer, h = y.group; a = a.baseline - Math.round(.3 * a.fontMetrics.b); let f = {}, c = t.marker, g = 0; this.chart.styledMode || (f = { "stroke-width": Math.min(t.lineWidth || 0, 24) }, t.dashStyle ? f.dashstyle = t.dashStyle : "square" !== t.linecap && (f["stroke-linecap"] = "round")); y.line = n.path().addClass("highcharts-graph").attr(f).add(h); f["stroke-linecap"] && (g = Math.min(y.line.strokeWidth(),
                                q) / 2); q && y.line.attr({ d: [["M", g, a], ["L", q - g, a]] }); c && !1 !== c.enabled && q && (t = Math.min(I(c.radius, p), p), 0 === this.symbol.indexOf("url") && (c = G(c, { width: k, height: k }), t = 0), y.symbol = y = n.symbol(this.symbol, q / 2 - t, a - t, 2 * t, 2 * t, r({ context: "legend" }, c)).addClass("highcharts-point").add(h), y.isMarker = !0)
                        }; a.rectangle = function (a, r) {
                            r = r.legendItem || {}; const t = a.symbolHeight, q = a.options.squareSymbol; r.symbol = this.chart.renderer.rect(q ? (a.symbolWidth - t) / 2 : 0, a.baseline - t + 1, q ? t : a.symbolWidth, t, I(a.options.symbolRadius,
                                t / 2)).addClass("highcharts-point").attr({ zIndex: 3 }).add(r.group)
                        }
                    })(y || (y = {})); return y
                }); K(a, "Core/Series/SeriesDefaults.js", [], function () {
                    return {
                        lineWidth: 1, allowPointSelect: !1, crisp: !0, showCheckbox: !1, animation: { duration: 1E3 }, enableMouseTracking: !0, events: {}, marker: { enabledThreshold: 2, lineColor: "#ffffff", lineWidth: 0, radius: 4, states: { normal: { animation: !0 }, hover: { animation: { duration: 150 }, enabled: !0, radiusPlus: 2, lineWidthPlus: 1 }, select: { fillColor: "#cccccc", lineColor: "#000000", lineWidth: 2 } } }, point: { events: {} },
                        dataLabels: { animation: {}, align: "center", borderWidth: 0, defer: !0, formatter: function () { const { numberFormatter: a } = this.series.chart; return "number" !== typeof this.y ? "" : a(this.y, -1) }, padding: 5, style: { fontSize: "0.7em", fontWeight: "bold", color: "contrast", textOutline: "1px contrast" }, verticalAlign: "bottom", x: 0, y: 0 }, cropThreshold: 300, opacity: 1, pointRange: 0, softThreshold: !0, states: {
                            normal: { animation: !0 }, hover: { animation: { duration: 150 }, lineWidthPlus: 1, marker: {}, halo: { size: 10, opacity: .25 } }, select: { animation: { duration: 0 } },
                            inactive: { animation: { duration: 150 }, opacity: .2 }
                        }, stickyTracking: !0, turboThreshold: 1E3, findNearestPointBy: "x"
                    }
                }); K(a, "Core/Series/SeriesRegistry.js", [a["Core/Globals.js"], a["Core/Defaults.js"], a["Core/Series/Point.js"], a["Core/Utilities.js"]], function (a, x, G, I) {
                    const { defaultOptions: r } = x, { extendClass: A, merge: F } = I; var D; (function (t) {
                        function q(a, p) { const k = r.plotOptions || {}, h = p.defaultOptions, f = p.prototype; f.type = a; f.pointClass || (f.pointClass = G); h && (k[a] = h); t.seriesTypes[a] = p } t.seriesTypes = a.seriesTypes;
                        t.registerSeriesType = q; t.seriesType = function (a, p, n, h, f) { const c = r.plotOptions || {}; p = p || ""; c[a] = F(c[p], n); q(a, A(t.seriesTypes[p] || function () { }, h)); t.seriesTypes[a].prototype.type = a; f && (t.seriesTypes[a].prototype.pointClass = A(G, f)); return t.seriesTypes[a] }
                    })(D || (D = {})); return D
                }); K(a, "Core/Series/Series.js", [a["Core/Animation/AnimationUtilities.js"], a["Core/Defaults.js"], a["Core/Foundation.js"], a["Core/Globals.js"], a["Core/Legend/LegendSymbol.js"], a["Core/Series/Point.js"], a["Core/Series/SeriesDefaults.js"],
                a["Core/Series/SeriesRegistry.js"], a["Core/Renderer/SVG/SVGElement.js"], a["Core/Utilities.js"]], function (a, x, G, I, y, A, F, D, t, q) {
                    const { animObject: k, setAnimation: p } = a, { defaultOptions: n } = x, { registerEventOptions: h } = G, { hasTouch: f, svg: c, win: g } = I, { seriesTypes: B } = D, { arrayMax: C, arrayMin: E, clamp: e, correctFloat: l, defined: v, diffObjects: z, erase: u, error: b, extend: d, find: m, fireEvent: w, getClosestDistance: r, getNestedProperty: H, insertItem: N, isArray: ea, isNumber: P, isString: Y, merge: R, objectEach: W, pick: J, removeEvent: K, splat: fa,
                        syncTimeout: V } = q; class T {
                            constructor() { this.zones = this.yAxis = this.xAxis = this.userOptions = this.tooltipOptions = this.processedYData = this.processedXData = this.points = this.options = this.linkedSeries = this.index = this.eventsToUnbind = this.eventOptions = this.data = this.chart = this._i = void 0 } init(b, c) {
                                w(this, "init", { options: c }); const a = this, e = b.series; this.eventsToUnbind = []; a.chart = b; a.options = a.setOptions(c); c = a.options; a.linkedSeries = []; a.bindAxes(); d(a, {
                                    name: c.name, state: "", visible: !1 !== c.visible, selected: !0 ===
                                        c.selected
                                }); h(this, c); const f = c.events; if (f && f.click || c.point && c.point.events && c.point.events.click || c.allowPointSelect) b.runTrackerClick = !0; a.getColor(); a.getSymbol(); a.parallelArrays.forEach(function (b) { a[b + "Data"] || (a[b + "Data"] = []) }); a.isCartesian && (b.hasCartesianSeries = !0); let g; e.length && (g = e[e.length - 1]); a._i = J(g && g._i, -1) + 1; a.opacity = a.options.opacity; b.orderItems("series", N(this, e)); c.dataSorting && c.dataSorting.enabled ? a.setDataSortingOptions() : a.points || a.data || a.setData(c.data, !1); w(this,
                                    "afterInit")
                            } is(b) { return B[b] && this instanceof B[b] } bindAxes() { const d = this, c = d.options, a = d.chart; let e; w(this, "bindAxes", null, function () { (d.axisTypes || []).forEach(function (f) { a[f].forEach(function (b) { e = b.options; if (J(c[f], 0) === b.index || "undefined" !== typeof c[f] && c[f] === e.id) N(d, b.series), d[f] = b, b.isDirty = !0 }); d[f] || d.optionalAxis === f || b(18, !0, a) }) }); w(this, "afterBindAxes") } updateParallelArrays(b, d, c) {
                                const a = b.series, e = P(d) ? function (c) {
                                    const e = "y" === c && a.toYData ? a.toYData(b) : b[c]; a[c + "Data"][d] =
                                        e
                                } : function (b) { Array.prototype[d].apply(a[b + "Data"], c) }; a.parallelArrays.forEach(e)
                            } hasData() { return this.visible && "undefined" !== typeof this.dataMax && "undefined" !== typeof this.dataMin || this.visible && this.yData && 0 < this.yData.length } autoIncrement(b) {
                                var d = this.options; const c = d.pointIntervalUnit, a = d.relativeXValue, e = this.chart.time; let f = this.xIncrement, g; f = J(f, d.pointStart, 0); this.pointInterval = g = J(this.pointInterval, d.pointInterval, 1); a && P(b) && (g *= b); c && (d = new e.Date(f), "day" === c ? e.set("Date", d, e.get("Date",
                                    d) + g) : "month" === c ? e.set("Month", d, e.get("Month", d) + g) : "year" === c && e.set("FullYear", d, e.get("FullYear", d) + g), g = d.getTime() - f); if (a && P(b)) return f + g; this.xIncrement = f + g; return f
                            } setDataSortingOptions() { const b = this.options; d(this, { requireSorting: !1, sorted: !1, enabledDataSorting: !0, allowDG: !1 }); v(b.pointRange) || (b.pointRange = 1) } setOptions(b) {
                                var d, c; const a = this.chart; var e = a.options.plotOptions, f = a.userOptions || {}; const g = R(b); b = a.styledMode; const m = { plotOptions: e, userOptions: g }; w(this, "setOptions",
                                    m); const l = m.plotOptions[this.type]; f = f.plotOptions || {}; const h = f.series || {}, k = n.plotOptions[this.type] || {}, u = f[this.type] || {}; this.userOptions = m.userOptions; e = R(l, e.series, u, g); this.tooltipOptions = R(n.tooltip, null === (d = n.plotOptions.series) || void 0 === d ? void 0 : d.tooltip, null === k || void 0 === k ? void 0 : k.tooltip, a.userOptions.tooltip, null === (c = f.series) || void 0 === c ? void 0 : c.tooltip, u.tooltip, g.tooltip); this.stickyTracking = J(g.stickyTracking, u.stickyTracking, h.stickyTracking, this.tooltipOptions.shared &&
                                        !this.noSharedTooltip ? !0 : e.stickyTracking); null === l.marker && delete e.marker; this.zoneAxis = e.zoneAxis; c = this.zones = (e.zones || []).slice(); !e.negativeColor && !e.negativeFillColor || e.zones || (d = { value: e[this.zoneAxis + "Threshold"] || e.threshold || 0, className: "highcharts-negative" }, b || (d.color = e.negativeColor, d.fillColor = e.negativeFillColor), c.push(d)); c.length && v(c[c.length - 1].value) && c.push(b ? {} : { color: this.color, fillColor: this.fillColor }); w(this, "afterSetOptions", { options: e }); return e
                            } getName() {
                                return J(this.options.name,
                                    "Series " + (this.index + 1))
                            } getCyclic(b, d, c) { const a = this.chart, e = `${b}Index`, f = `${b}Counter`, g = (null === c || void 0 === c ? void 0 : c.length) || a.options.chart.colorCount; if (!d) { var m = J("color" === b ? this.options.colorIndex : void 0, this[e]); v(m) || (a.series.length || (a[f] = 0), m = a[f] % g, a[f] += 1); c && (d = c[m]) } "undefined" !== typeof m && (this[e] = m); this[b] = d } getColor() {
                                this.chart.styledMode ? this.getCyclic("color") : this.options.colorByPoint ? this.color = "#cccccc" : this.getCyclic("color", this.options.color || n.plotOptions[this.type].color,
                                    this.chart.options.colors)
                            } getPointsCollection() { return (this.hasGroupedData ? this.points : this.data) || [] } getSymbol() { this.getCyclic("symbol", this.options.marker.symbol, this.chart.options.symbols) } findPointIndex(b, d) {
                                const c = b.id, a = b.x, e = this.points; var f = this.options.dataSorting, g; let l, h; if (c) f = this.chart.get(c), f instanceof A && (g = f); else if (this.linkedParent || this.enabledDataSorting || this.options.relativeXValue) if (g = d => !d.touched && d.index === b.index, f && f.matchByName ? g = d => !d.touched && d.name === b.name :
                                    this.options.relativeXValue && (g = d => !d.touched && d.options.x === b.x), g = m(e, g), !g) return; g && (h = g && g.index, "undefined" !== typeof h && (l = !0)); "undefined" === typeof h && P(a) && (h = this.xData.indexOf(a, d)); -1 !== h && "undefined" !== typeof h && this.cropped && (h = h >= this.cropStart ? h - this.cropStart : h); !l && P(h) && e[h] && e[h].touched && (h = void 0); return h
                            } updateData(b, d) {
                                const c = this.options, a = c.dataSorting, e = this.points, f = [], g = this.requireSorting, m = b.length === e.length; let l, h, k, n = !0; this.xIncrement = null; b.forEach(function (b,
                                    d) { var h = v(b) && this.pointClass.prototype.optionsToObject.call({ series: this }, b) || {}; const n = h.x; if (h.id || P(n)) { if (h = this.findPointIndex(h, k), -1 === h || "undefined" === typeof h ? f.push(b) : e[h] && b !== c.data[h] ? (e[h].update(b, !1, null, !1), e[h].touched = !0, g && (k = h + 1)) : e[h] && (e[h].touched = !0), !m || d !== h || a && a.enabled || this.hasDerivedData) l = !0 } else f.push(b) }, this); if (l) for (b = e.length; b--;)(h = e[b]) && !h.touched && h.remove && h.remove(!1, d); else !m || a && a.enabled ? n = !1 : (b.forEach(function (b, d) {
                                        b === e[d].y || e[d].destroyed ||
                                        e[d].update(b, !1, null, !1)
                                    }), f.length = 0); e.forEach(function (b) { b && (b.touched = !1) }); if (!n) return !1; f.forEach(function (b) { this.addPoint(b, !1, null, null, !1) }, this); null === this.xIncrement && this.xData && this.xData.length && (this.xIncrement = C(this.xData), this.autoIncrement()); return !0
                            } setData(d, c = !0, a, e) {
                                var f; const g = this, m = g.points, l = m && m.length || 0, h = g.options, k = g.chart, n = h.dataSorting, u = g.xAxis, v = h.turboThreshold, w = this.xData, p = this.yData; var z = g.pointArrayMap; z = z && z.length; const B = h.keys; let q, C = 0, E = 1,
                                    r = null; if (!k.options.chart.allowMutatingData) { h.data && delete g.options.data; g.userOptions.data && delete g.userOptions.data; var t = R(!0, d) } d = t || d || []; t = d.length; n && n.enabled && (d = this.sortData(d)); k.options.chart.allowMutatingData && !1 !== e && t && l && !g.cropped && !g.hasGroupedData && g.visible && !g.boosted && (q = this.updateData(d, a)); if (!q) {
                                        g.xIncrement = null; g.colorCounter = 0; this.parallelArrays.forEach(function (b) { g[b + "Data"].length = 0 }); if (v && t > v) if (r = g.getFirstValidPoint(d), P(r)) for (a = 0; a < t; a++)w[a] = this.autoIncrement(),
                                            p[a] = d[a]; else if (ea(r)) if (z) if (r.length === z) for (a = 0; a < t; a++)w[a] = this.autoIncrement(), p[a] = d[a]; else for (a = 0; a < t; a++)e = d[a], w[a] = e[0], p[a] = e.slice(1, z + 1); else if (B && (C = B.indexOf("x"), E = B.indexOf("y"), C = 0 <= C ? C : 0, E = 0 <= E ? E : 1), 1 === r.length && (E = 0), C === E) for (a = 0; a < t; a++)w[a] = this.autoIncrement(), p[a] = d[a][E]; else for (a = 0; a < t; a++)e = d[a], w[a] = e[C], p[a] = e[E]; else b(12, !1, k); else for (a = 0; a < t; a++)e = { series: g }, g.pointClass.prototype.applyOptions.apply(e, [d[a]]), g.updateParallelArrays(e, a); p && Y(p[0]) && b(14, !0,
                                                k); g.data = []; g.options.data = g.userOptions.data = d; for (a = l; a--;)null === (f = m[a]) || void 0 === f ? void 0 : f.destroy(); u && (u.minRange = u.userMinRange); g.isDirty = k.isDirtyBox = !0; g.isDirtyData = !!m; a = !1
                                    } "point" === h.legendType && (this.processData(), this.generatePoints()); c && k.redraw(a)
                            } sortData(b) {
                                const d = this, c = d.options.dataSorting.sortKey || "y", a = function (b, d) { return v(d) && b.pointClass.prototype.optionsToObject.call({ series: b }, d) || {} }; b.forEach(function (c, e) { b[e] = a(d, c); b[e].index = e }, this); b.concat().sort((b, d) => { b = H(c, b); d = H(c, d); return d < b ? -1 : d > b ? 1 : 0 }).forEach(function (b, d) { b.x = d }, this); d.linkedSeries && d.linkedSeries.forEach(function (d) { const c = d.options, e = c.data; c.dataSorting && c.dataSorting.enabled || !e || (e.forEach(function (c, f) { e[f] = a(d, c); b[f] && (e[f].x = b[f].x, e[f].index = f) }), d.setData(e, !1)) }); return b
                            } getProcessedData(d) {
                                const c = this; var a = c.xAxis, e = c.options; const f = e.cropThreshold, g = d || c.getExtremesFromAll || e.getExtremesFromAll, m = null === a || void 0 === a ? void 0 : a.logarithmic, l = c.isCartesian; let h = 0; let k;
                                d = c.xData; e = c.yData; let n = !1; const u = d.length; if (a) { var v = a.getExtremes(); k = v.min; v = v.max; n = !(!a.categories || a.names.length) } if (l && c.sorted && !g && (!f || u > f || c.forceCrop)) if (d[u - 1] < k || d[0] > v) d = [], e = []; else if (c.yData && (d[0] < k || d[u - 1] > v)) { var w = this.cropData(c.xData, c.yData, k, v); d = w.xData; e = w.yData; h = w.start; w = !0 } a = r([m ? d.map(m.log2lin) : d], () => c.requireSorting && !n && b(15, !1, c.chart)); return { xData: d, yData: e, cropped: w, cropStart: h, closestPointRange: a }
                            } processData(b) {
                                const d = this.xAxis; if (this.isCartesian &&
                                    !this.isDirty && !d.isDirty && !this.yAxis.isDirty && !b) return !1; b = this.getProcessedData(); this.cropped = b.cropped; this.cropStart = b.cropStart; this.processedXData = b.xData; this.processedYData = b.yData; this.closestPointRange = this.basePointRange = b.closestPointRange; w(this, "afterProcessData")
                            } cropData(b, d, c, a, e) {
                                const f = b.length; let g, m = 0, l = f; e = J(e, this.cropShoulder); for (g = 0; g < f; g++)if (b[g] >= c) { m = Math.max(0, g - e); break } for (c = g; c < f; c++)if (b[c] > a) { l = c + e; break } return {
                                    xData: b.slice(m, l), yData: d.slice(m, l), start: m,
                                    end: l
                                }
                            } generatePoints() {
                                var b = this.options; const c = this.processedData || b.data, a = this.processedXData, e = this.processedYData, f = this.pointClass, g = a.length, m = this.cropStart || 0, l = this.hasGroupedData, h = b.keys, k = []; b = b.dataGrouping && b.dataGrouping.groupAll ? m : 0; let n; let u, v, p = this.data; if (!p && !l) { var z = []; z.length = c.length; p = this.data = z } h && l && (this.options.keys = !1); for (v = 0; v < g; v++)z = m + v, l ? (u = (new f).init(this, [a[v]].concat(fa(e[v]))), u.dataGroup = this.groupMap[b + v], u.dataGroup.options && (u.options = u.dataGroup.options,
                                    d(u, u.dataGroup.options), delete u.dataLabels)) : (u = p[z]) || "undefined" === typeof c[z] || (p[z] = u = (new f).init(this, c[z], a[v])), u && (u.index = l ? b + v : z, k[v] = u); this.options.keys = h; if (p && (g !== (n = p.length) || l)) for (v = 0; v < n; v++)v !== m || l || (v += g), p[v] && (p[v].destroyElements(), p[v].plotX = void 0); this.data = p; this.points = k; w(this, "afterGeneratePoints")
                            } getXExtremes(b) { return { min: E(b), max: C(b) } } getExtremes(b, d) {
                                const c = this.xAxis; var a = this.yAxis; const e = this.processedXData || this.xData, f = [], g = this.requireSorting ? this.cropShoulder :
                                    0; a = a ? a.positiveValuesOnly : !1; let m, l = 0, h = 0, k = 0; b = b || this.stackedYData || this.processedYData || []; const n = b.length; if (c) { var v = c.getExtremes(); l = v.min; h = v.max } for (m = 0; m < n; m++) { var u = e[m]; v = b[m]; var p = (P(v) || ea(v)) && (v.length || 0 < v || !a); u = d || this.getExtremesFromAll || this.options.getExtremesFromAll || this.cropped || !c || (e[m + g] || u) >= l && (e[m - g] || u) <= h; if (p && u) if (p = v.length) for (; p--;)P(v[p]) && (f[k++] = v[p]); else f[k++] = v } b = { activeYData: f, dataMin: E(f), dataMax: C(f) }; w(this, "afterGetExtremes", { dataExtremes: b });
                                return b
                            } applyExtremes() { const b = this.getExtremes(); this.dataMin = b.dataMin; this.dataMax = b.dataMax; return b } getFirstValidPoint(b) { const d = b.length; let c = 0, a = null; for (; null === a && c < d;)a = b[c], c++; return a } translate() {
                                var b; this.processedXData || this.processData(); this.generatePoints(); var d = this.options; const c = d.stacking, a = this.xAxis, f = a.categories, g = this.enabledDataSorting, m = this.yAxis, h = this.points, k = h.length, n = this.pointPlacementToXValue(), u = !!n, p = d.threshold; d = d.startFromThreshold ? p : 0; let z, B, C, q,
                                    E = Number.MAX_VALUE; for (z = 0; z < k; z++) {
                                        const k = h[z], w = k.x; let r, t, H = k.y, M = k.low; const y = c && (null === (b = m.stacking) || void 0 === b ? void 0 : b.stacks[(this.negStacks && H < (d ? 0 : p) ? "-" : "") + this.stackKey]); B = a.translate(w, !1, !1, !1, !0, n); k.plotX = P(B) ? l(e(B, -1E5, 1E5)) : void 0; c && this.visible && y && y[w] && (q = this.getStackIndicator(q, w, this.index), !k.isNull && q.key && (r = y[w], t = r.points[q.key]), r && ea(t) && (M = t[0], H = t[1], M === d && q.key === y[w].base && (M = J(P(p) ? p : m.min)), m.positiveValuesOnly && v(M) && 0 >= M && (M = void 0), k.total = k.stackTotal =
                                            J(r.total), k.percentage = v(k.y) && r.total ? k.y / r.total * 100 : void 0, k.stackY = H, this.irregularWidths || r.setOffset(this.pointXOffset || 0, this.barW || 0, void 0, void 0, void 0, this.xAxis))); k.yBottom = v(M) ? e(m.translate(M, !1, !0, !1, !0), -1E5, 1E5) : void 0; this.dataModify && (H = this.dataModify.modifyValue(H, z)); let L; P(H) && void 0 !== k.plotX && (L = m.translate(H, !1, !0, !1, !0), L = P(L) ? e(L, -1E5, 1E5) : void 0); k.plotY = L; k.isInside = this.isPointInside(k); k.clientX = u ? l(a.translate(w, !1, !1, !1, !0, n)) : B; k.negative = (k.y || 0) < (p || 0); k.category =
                                                J(f && f[k.x], k.x); k.isNull || !1 === k.visible || ("undefined" !== typeof C && (E = Math.min(E, Math.abs(B - C))), C = B); k.zone = this.zones.length ? k.getZone() : void 0; !k.graphic && this.group && g && (k.isNew = !0)
                                    } this.closestPointRangePx = E; w(this, "afterTranslate")
                            } getValidPoints(b, d, c) { const a = this.chart; return (b || this.points || []).filter(function (b) { const { plotX: e, plotY: f } = b; return !c && (b.isNull || !P(f)) || d && !a.isInsidePlot(e, f, { inverted: a.inverted }) ? !1 : !1 !== b.visible }) } getClipBox() {
                                const { chart: b, xAxis: d, yAxis: c } = this, a = R(b.clipBox);
                                d && d.len !== b.plotSizeX && (a.width = d.len); c && c.len !== b.plotSizeY && (a.height = c.len); return a
                            } getSharedClipKey() { return this.sharedClipKey = (this.options.xAxis || 0) + "," + (this.options.yAxis || 0) } setClip() { const { chart: b, group: d, markerGroup: c } = this, a = b.sharedClips, e = b.renderer, f = this.getClipBox(), g = this.getSharedClipKey(); let m = a[g]; m ? m.animate(f) : a[g] = m = e.clipRect(f); d && d.clip(!1 === this.options.clip ? void 0 : m); c && c.clip() } animate(b) {
                                const { chart: d, group: c, markerGroup: a } = this, e = d.inverted; var f = k(this.options.animation),
                                    g = [this.getSharedClipKey(), f.duration, f.easing, f.defer].join(); let m = d.sharedClips[g], l = d.sharedClips[g + "m"]; if (b && c) f = this.getClipBox(), m ? m.attr("height", f.height) : (f.width = 0, e && (f.x = d.plotHeight), m = d.renderer.clipRect(f), d.sharedClips[g] = m, l = d.renderer.clipRect({ x: -99, y: -99, width: e ? d.plotWidth + 199 : 99, height: e ? 99 : d.plotHeight + 199 }), d.sharedClips[g + "m"] = l), c.clip(m), a && a.clip(l); else if (m && !m.hasClass("highcharts-animating")) {
                                        g = this.getClipBox(); const b = f.step; a && a.element.childNodes.length && (f.step =
                                            function (d, c) { b && b.apply(c, arguments); "width" === c.prop && l && l.element && l.attr(e ? "height" : "width", d + 99) }); m.addClass("highcharts-animating").animate(g, f)
                                    }
                            } afterAnimate() { this.setClip(); W(this.chart.sharedClips, (b, d, c) => { b && !this.chart.container.querySelector(`[clip-path="url(#${b.id})"]`) && (b.destroy(), delete c[d]) }); this.finishedAnimating = !0; w(this, "afterAnimate") } drawPoints(b = this.points) {
                                const d = this.chart, c = d.styledMode, { colorAxis: a, options: e } = this, f = e.marker, g = this[this.specialGroup || "markerGroup"],
                                m = this.xAxis, l = J(f.enabled, !m || m.isRadial ? !0 : null, this.closestPointRangePx >= f.enabledThreshold * f.radius); let h, k, n, v; let u, w; if (!1 !== f.enabled || this._hasPointMarkers) for (h = 0; h < b.length; h++) {
                                    k = b[h]; v = (n = k.graphic) ? "animate" : "attr"; var p = k.marker || {}; u = !!k.marker; if ((l && "undefined" === typeof p.enabled || p.enabled) && !k.isNull && !1 !== k.visible) {
                                        const b = J(p.symbol, this.symbol, "rect"); w = this.markerAttribs(k, k.selected && "select"); this.enabledDataSorting && (k.startXPos = m.reversed ? -(w.width || 0) : m.width); const e =
                                            !1 !== k.isInside; !n && e && (0 < (w.width || 0) || k.hasImage) && (k.graphic = n = d.renderer.symbol(b, w.x, w.y, w.width, w.height, u ? p : f).add(g), this.enabledDataSorting && d.hasRendered && (n.attr({ x: k.startXPos }), v = "animate")); n && "animate" === v && n[e ? "show" : "hide"](e).animate(w); if (n) if (p = this.pointAttribs(k, c || !k.selected ? void 0 : "select"), c) a && n.css({ fill: p.fill }); else n[v](p); n && n.addClass(k.getClassName(), !0)
                                    } else n && (k.graphic = n.destroy())
                                }
                            } markerAttribs(b, d) {
                                const c = this.options; var a = c.marker; const e = b.marker || {}, f =
                                    e.symbol || a.symbol, g = {}; let m = J(e.radius, a && a.radius); d && (a = a.states[d], d = e.states && e.states[d], m = J(d && d.radius, a && a.radius, m && m + (a && a.radiusPlus || 0))); b.hasImage = f && 0 === f.indexOf("url"); b.hasImage && (m = 0); b = b.pos(); P(m) && b && (g.x = b[0] - m, g.y = b[1] - m, c.crisp && (g.x = Math.floor(g.x))); m && (g.width = g.height = 2 * m); return g
                            } pointAttribs(b, d) {
                                var c = this.options.marker, a = b && b.options; const e = a && a.marker || {}; var f = a && a.color, g = b && b.color; const m = b && b.zone && b.zone.color; let l = this.color; b = J(e.lineWidth, c.lineWidth);
                                a = 1; l = f || m || g || l; f = e.fillColor || c.fillColor || l; g = e.lineColor || c.lineColor || l; d = d || "normal"; c = c.states[d] || {}; d = e.states && e.states[d] || {}; b = J(d.lineWidth, c.lineWidth, b + J(d.lineWidthPlus, c.lineWidthPlus, 0)); f = d.fillColor || c.fillColor || f; g = d.lineColor || c.lineColor || g; a = J(d.opacity, c.opacity, a); return { stroke: g, "stroke-width": b, fill: f, opacity: a }
                            } destroy(b) {
                                const d = this, c = d.chart, a = /AppleWebKit\/533/.test(g.navigator.userAgent), e = d.data || []; let f, m, l, h; w(d, "destroy", { keepEventsForUpdate: b }); this.removeEvents(b);
                                (d.axisTypes || []).forEach(function (b) { (h = d[b]) && h.series && (u(h.series, d), h.isDirty = h.forceRedraw = !0) }); d.legendItem && d.chart.legend.destroyItem(d); for (m = e.length; m--;)(l = e[m]) && l.destroy && l.destroy(); d.clips && d.clips.forEach(b => b.destroy()); q.clearTimeout(d.animationTimeout); W(d, function (b, d) { b instanceof t && !b.survive && (f = a && "group" === d ? "hide" : "destroy", b[f]()) }); c.hoverSeries === d && (c.hoverSeries = void 0); u(c.series, d); c.orderItems("series"); W(d, function (c, a) { b && "hcEvents" === a || delete d[a] })
                            } applyZones() {
                                const b =
                                    this, d = this.chart, c = d.renderer, a = this.zones, f = this.clips || [], g = this.graph, m = this.area, l = Math.max(d.plotWidth, d.plotHeight), h = this[(this.zoneAxis || "y") + "Axis"], k = d.inverted; let n, v, u, w, p, z, B, q, C, E, r, t = !1; a.length && (g || m) && h && "undefined" !== typeof h.min ? (p = h.reversed, z = h.horiz, g && !this.showLine && g.hide(), m && m.hide(), w = h.getExtremes(), a.forEach(function (a, H) {
                                        n = p ? z ? d.plotWidth : 0 : z ? 0 : h.toPixels(w.min) || 0; n = e(J(v, n), 0, l); v = e(Math.round(h.toPixels(J(a.value, w.max), !0) || 0), 0, l); t && (n = v = h.toPixels(w.max));
                                        B = Math.abs(n - v); q = Math.min(n, v); C = Math.max(n, v); h.isXAxis ? (u = { x: k ? C : q, y: 0, width: B, height: l }, z || (u.x = d.plotHeight - u.x)) : (u = { x: 0, y: k ? C : q, width: l, height: B }, z && (u.y = d.plotWidth - u.y)); f[H] ? f[H].animate(u) : f[H] = c.clipRect(u); E = b["zone-area-" + H]; r = b["zone-graph-" + H]; g && r && r.clip(f[H]); m && E && E.clip(f[H]); t = a.value > w.max; b.resetZones && 0 === v && (v = void 0)
                                    }), this.clips = f) : b.visible && (g && g.show(), m && m.show())
                            } plotGroup(b, d, c, a, e) {
                                let f = this[b]; const g = !f; c = { visibility: c, zIndex: a || .1 }; "undefined" === typeof this.opacity ||
                                    this.chart.styledMode || "inactive" === this.state || (c.opacity = this.opacity); g && (this[b] = f = this.chart.renderer.g().add(e)); f.addClass("highcharts-" + d + " highcharts-series-" + this.index + " highcharts-" + this.type + "-series " + (v(this.colorIndex) ? "highcharts-color-" + this.colorIndex + " " : "") + (this.options.className || "") + (f.hasClass("highcharts-tracker") ? " highcharts-tracker" : ""), !0); f.attr(c)[g ? "attr" : "animate"](this.getPlotBox(d)); return f
                            } getPlotBox(b) {
                                let d = this.xAxis, c = this.yAxis; const a = this.chart; b = a.inverted &&
                                    !a.polar && d && !1 !== this.invertible && "series" === b; a.inverted && (d = c, c = this.xAxis); return { translateX: d ? d.left : a.plotLeft, translateY: c ? c.top : a.plotTop, rotation: b ? 90 : 0, rotationOriginX: b ? (d.len - c.len) / 2 : 0, rotationOriginY: b ? (d.len + c.len) / 2 : 0, scaleX: b ? -1 : 1, scaleY: 1 }
                            } removeEvents(b) { b || K(this); this.eventsToUnbind.length && (this.eventsToUnbind.forEach(function (b) { b() }), this.eventsToUnbind.length = 0) } render() {
                                const b = this; var d = b.chart; const c = b.options, a = k(c.animation), e = b.visible ? "inherit" : "hidden", f = c.zIndex,
                                    g = b.hasRendered; d = d.seriesGroup; let m = b.finishedAnimating ? 0 : a.duration; w(this, "render"); b.plotGroup("group", "series", e, f, d); b.markerGroup = b.plotGroup("markerGroup", "markers", e, f, d); !1 !== c.clip && b.setClip(); b.animate && m && b.animate(!0); b.drawGraph && (b.drawGraph(), b.applyZones()); b.visible && b.drawPoints(); b.drawDataLabels && b.drawDataLabels(); b.redrawPoints && b.redrawPoints(); b.drawTracker && c.enableMouseTracking && b.drawTracker(); b.animate && m && b.animate(); g || (m && a.defer && (m += a.defer), b.animationTimeout =
                                        V(function () { b.afterAnimate() }, m || 0)); b.isDirty = !1; b.hasRendered = !0; w(b, "afterRender")
                            } redraw() { const b = this.isDirty || this.isDirtyData; this.translate(); this.render(); b && delete this.kdTree } searchPoint(b, d) { const c = this.xAxis, a = this.yAxis, e = this.chart.inverted; return this.searchKDTree({ clientX: e ? c.len - b.chartY + c.pos : b.chartX - c.pos, plotY: e ? a.len - b.chartX + a.pos : b.chartY - a.pos }, d, b) } buildKDTree(b) {
                                function d(b, a, e) {
                                    var f = b && b.length; let g; if (f) return g = c.kdAxisArray[a % e], b.sort(function (b, d) {
                                        return b[g] -
                                            d[g]
                                    }), f = Math.floor(f / 2), { point: b[f], left: d(b.slice(0, f), a + 1, e), right: d(b.slice(f + 1), a + 1, e) }
                                } this.buildingKdTree = !0; const c = this, a = -1 < c.options.findNearestPointBy.indexOf("y") ? 2 : 1; delete c.kdTree; V(function () { c.kdTree = d(c.getValidPoints(null, !c.directTouch), a, a); c.buildingKdTree = !1 }, c.options.kdNow || b && "touchstart" === b.type ? 0 : 1)
                            } searchKDTree(b, d, c) {
                                function a(b, d, c, l) {
                                    const h = d.point; var k = e.kdAxisArray[c % l]; let n = h; var u = v(b[f]) && v(h[f]) ? Math.pow(b[f] - h[f], 2) : null; var w = v(b[g]) && v(h[g]) ? Math.pow(b[g] -
                                        h[g], 2) : null; w = (u || 0) + (w || 0); h.dist = v(w) ? Math.sqrt(w) : Number.MAX_VALUE; h.distX = v(u) ? Math.sqrt(u) : Number.MAX_VALUE; k = b[k] - h[k]; w = 0 > k ? "left" : "right"; u = 0 > k ? "right" : "left"; d[w] && (w = a(b, d[w], c + 1, l), n = w[m] < n[m] ? w : h); d[u] && Math.sqrt(k * k) < n[m] && (b = a(b, d[u], c + 1, l), n = b[m] < n[m] ? b : n); return n
                                } const e = this, f = this.kdAxisArray[0], g = this.kdAxisArray[1], m = d ? "distX" : "dist"; d = -1 < e.options.findNearestPointBy.indexOf("y") ? 2 : 1; this.kdTree || this.buildingKdTree || this.buildKDTree(c); if (this.kdTree) return a(b, this.kdTree,
                                    d, d)
                            } pointPlacementToXValue() { const { options: { pointPlacement: b, pointRange: d }, xAxis: c } = this; let a = b; "between" === a && (a = c.reversed ? -.5 : .5); return P(a) ? a * (d || c.pointRange) : 0 } isPointInside(b) { const { chart: d, xAxis: c, yAxis: a } = this; return "undefined" !== typeof b.plotY && "undefined" !== typeof b.plotX && 0 <= b.plotY && b.plotY <= (a ? a.len : d.plotHeight) && 0 <= b.plotX && b.plotX <= (c ? c.len : d.plotWidth) } drawTracker() {
                                const b = this, d = b.options, a = d.trackByArea, e = [].concat(a ? b.areaPath : b.graphPath), g = b.chart, m = g.pointer, l = g.renderer,
                                h = g.options.tooltip.snap, k = b.tracker, n = function (c) { if (d.enableMouseTracking && g.hoverSeries !== b) b.onMouseOver() }, v = "rgba(192,192,192," + (c ? .0001 : .002) + ")"; k ? k.attr({ d: e }) : b.graph && (b.tracker = l.path(e).attr({ visibility: b.visible ? "inherit" : "hidden", zIndex: 2 }).addClass(a ? "highcharts-tracker-area" : "highcharts-tracker-line").add(b.group), g.styledMode || b.tracker.attr({ "stroke-linecap": "round", "stroke-linejoin": "round", stroke: v, fill: a ? v : "none", "stroke-width": b.graph.strokeWidth() + (a ? 0 : 2 * h) }), [b.tracker, b.markerGroup,
                                b.dataLabelsGroup].forEach(function (b) { if (b && (b.addClass("highcharts-tracker").on("mouseover", n).on("mouseout", function (b) { m.onTrackerMouseOut(b) }), d.cursor && !g.styledMode && b.css({ cursor: d.cursor }), f)) b.on("touchstart", n) })); w(this, "afterDrawTracker")
                            } addPoint(b, d, c, a, e) {
                                const f = this.options, g = this.data, m = this.chart; var l = this.xAxis; l = l && l.hasNames && l.names; const h = f.data, k = this.xData; let n, v; d = J(d, !0); const u = { series: this }; this.pointClass.prototype.applyOptions.apply(u, [b]); const p = u.x; v = k.length;
                                if (this.requireSorting && p < k[v - 1]) for (n = !0; v && k[v - 1] > p;)v--; this.updateParallelArrays(u, "splice", [v, 0, 0]); this.updateParallelArrays(u, v); l && u.name && (l[p] = u.name); h.splice(v, 0, b); if (n || this.processedData) this.data.splice(v, 0, null), this.processData(); "point" === f.legendType && this.generatePoints(); c && (g[0] && g[0].remove ? g[0].remove(!1) : (g.shift(), this.updateParallelArrays(u, "shift"), h.shift())); !1 !== e && w(this, "addPoint", { point: u }); this.isDirtyData = this.isDirty = !0; d && m.redraw(a)
                            } removePoint(b, d, c) {
                                const a =
                                    this, e = a.data, f = e[b], g = a.points, m = a.chart, l = function () { g && g.length === e.length && g.splice(b, 1); e.splice(b, 1); a.options.data.splice(b, 1); a.updateParallelArrays(f || { series: a }, "splice", [b, 1]); f && f.destroy(); a.isDirty = !0; a.isDirtyData = !0; d && m.redraw() }; p(c, m); d = J(d, !0); f ? f.firePointEvent("remove", null, l) : l()
                            } remove(b, d, c, a) { function e() { f.destroy(a); g.isDirtyLegend = g.isDirtyBox = !0; g.linkSeries(a); J(b, !0) && g.redraw(d) } const f = this, g = f.chart; !1 !== c ? w(f, "remove", null, e) : e() } update(c, a) {
                                c = z(c, this.userOptions);
                                w(this, "update", { options: c }); const e = this, f = e.chart; var g = e.userOptions; const m = e.initialType || e.type; var l = f.options.plotOptions; const h = B[m].prototype; var k = e.finishedAnimating && { animation: !1 }; const n = {}; let v, u = ["colorIndex", "eventOptions", "navigatorSeries", "symbolIndex", "baseSeries"], p = c.type || g.type || f.options.chart.type; const q = !(this.hasDerivedData || p && p !== this.type || "undefined" !== typeof c.pointStart || "undefined" !== typeof c.pointInterval || "undefined" !== typeof c.relativeXValue || c.joinBy || c.mapData ||
                                    e.hasOptionChanged("dataGrouping") || e.hasOptionChanged("pointStart") || e.hasOptionChanged("pointInterval") || e.hasOptionChanged("pointIntervalUnit") || e.hasOptionChanged("keys")); p = p || m; q && (u.push("data", "isDirtyData", "points", "processedData", "processedXData", "processedYData", "xIncrement", "cropped", "_hasPointMarkers", "_hasPointLabels", "clips", "nodes", "layout", "level", "mapMap", "mapData", "minY", "maxY", "minX", "maxX"), !1 !== c.visible && u.push("area", "graph"), e.parallelArrays.forEach(function (b) { u.push(b + "Data") }),
                                        c.data && (c.dataSorting && d(e.options.dataSorting, c.dataSorting), this.setData(c.data, !1))); c = R(g, k, { index: "undefined" === typeof g.index ? e.index : g.index, pointStart: J(l && l.series && l.series.pointStart, g.pointStart, e.xData[0]) }, !q && { data: e.options.data }, c); q && c.data && (c.data = e.options.data); u = ["group", "markerGroup", "dataLabelsGroup", "transformGroup"].concat(u); u.forEach(function (b) { u[b] = e[b]; delete e[b] }); l = !1; if (B[p]) {
                                            if (l = p !== e.type, e.remove(!1, !1, !1, !0), l) if (Object.setPrototypeOf) Object.setPrototypeOf(e,
                                                B[p].prototype); else { k = Object.hasOwnProperty.call(e, "hcEvents") && e.hcEvents; for (v in h) e[v] = void 0; d(e, B[p].prototype); k ? e.hcEvents = k : delete e.hcEvents }
                                        } else b(17, !0, f, { missingModuleFor: p }); u.forEach(function (b) { e[b] = u[b] }); e.init(f, c); if (q && this.points) {
                                            c = e.options; if (!1 === c.visible) n.graphic = 1, n.dataLabel = 1; else if (!e._hasPointLabels) {
                                                const { marker: b, dataLabels: d } = c; g = g.marker || {}; !b || !1 !== b.enabled && g.symbol === b.symbol && g.height === b.height && g.width === b.width || (n.graphic = 1); d && !1 === d.enabled && (n.dataLabel =
                                                    1)
                                            } for (const b of this.points) b && b.series && (b.resolveColor(), Object.keys(n).length && b.destroyElements(n), !1 === c.showInLegend && b.legendItem && f.legend.destroyItem(b))
                                        } e.initialType = m; f.linkSeries(); l && e.linkedSeries.length && (e.isDirtyData = !0); w(this, "afterUpdate"); J(a, !0) && f.redraw(q ? void 0 : !1)
                            } setName(b) { this.name = this.options.name = this.userOptions.name = b; this.chart.isDirtyLegend = !0 } hasOptionChanged(b) {
                                const d = this.options[b], c = this.chart.options.plotOptions, a = this.userOptions[b]; return a ? d !== a : d !==
                                    J(c && c[this.type] && c[this.type][b], c && c.series && c.series[b], d)
                            } onMouseOver() { const b = this.chart, d = b.hoverSeries; b.pointer.setHoverChartIndex(); if (d && d !== this) d.onMouseOut(); this.options.events.mouseOver && w(this, "mouseOver"); this.setState("hover"); b.hoverSeries = this } onMouseOut() {
                                const b = this.options, d = this.chart, c = d.tooltip, a = d.hoverPoint; d.hoverSeries = null; if (a) a.onMouseOut(); this && b.events.mouseOut && w(this, "mouseOut"); !c || this.stickyTracking || c.shared && !this.noSharedTooltip || c.hide(); d.series.forEach(function (b) {
                                    b.setState("",
                                        !0)
                                })
                            } setState(b, d) {
                                const c = this; var a = c.options; const e = c.graph, f = a.inactiveOtherPoints, g = a.states, m = J(g[b || "normal"] && g[b || "normal"].animation, c.chart.options.chart.animation); let l = a.lineWidth, h = 0, k = a.opacity; b = b || ""; if (c.state !== b && ([c.group, c.markerGroup, c.dataLabelsGroup].forEach(function (d) { d && (c.state && d.removeClass("highcharts-series-" + c.state), b && d.addClass("highcharts-series-" + b)) }), c.state = b, !c.chart.styledMode)) {
                                    if (g[b] && !1 === g[b].enabled) return; b && (l = g[b].lineWidth || l + (g[b].lineWidthPlus ||
                                        0), k = J(g[b].opacity, k)); if (e && !e.dashstyle && P(l)) for (a = { "stroke-width": l }, e.animate(a, m); c["zone-graph-" + h];)c["zone-graph-" + h].animate(a, m), h += 1; f || [c.group, c.markerGroup, c.dataLabelsGroup, c.labelBySeries].forEach(function (b) { b && b.animate({ opacity: k }, m) })
                                } d && f && c.points && c.setAllPointsToState(b || void 0)
                            } setAllPointsToState(b) { this.points.forEach(function (d) { d.setState && d.setState(b) }) } setVisible(b, d) {
                                const c = this, a = c.chart, e = a.options.chart.ignoreHiddenSeries, f = c.visible, g = (c.visible = b = c.options.visible =
                                    c.userOptions.visible = "undefined" === typeof b ? !f : b) ? "show" : "hide";["group", "dataLabelsGroup", "markerGroup", "tracker", "tt"].forEach(function (b) { if (c[b]) c[b][g]() }); if (a.hoverSeries === c || (a.hoverPoint && a.hoverPoint.series) === c) c.onMouseOut(); c.legendItem && a.legend.colorizeItem(c, b); c.isDirty = !0; c.options.stacking && a.series.forEach(function (b) { b.options.stacking && b.visible && (b.isDirty = !0) }); c.linkedSeries.forEach(function (d) { d.setVisible(b, !1) }); e && (a.isDirtyBox = !0); w(c, g); !1 !== d && a.redraw()
                            } show() { this.setVisible(!0) } hide() { this.setVisible(!1) } select(b) {
                                this.selected =
                                b = this.options.selected = "undefined" === typeof b ? !this.selected : b; this.checkbox && (this.checkbox.checked = b); w(this, b ? "select" : "unselect")
                            } shouldShowTooltip(b, d, c = {}) { c.series = this; c.visiblePlotOnly = !0; return this.chart.isInsidePlot(b, d, c) } drawLegendSymbol(b, d) { var c; null === (c = y[this.options.legendSymbol || "rectangle"]) || void 0 === c ? void 0 : c.call(this, b, d) }
                    } T.defaultOptions = F; T.types = D.seriesTypes; T.registerType = D.registerSeriesType; d(T.prototype, {
                        axisTypes: ["xAxis", "yAxis"], coll: "series", colorCounter: 0,
                        cropShoulder: 1, directTouch: !1, isCartesian: !0, kdAxisArray: ["clientX", "plotY"], parallelArrays: ["x", "y"], pointClass: A, requireSorting: !0, sorted: !0
                    }); D.series = T; ""; ""; return T
                }); K(a, "Core/Chart/Chart.js", [a["Core/Animation/AnimationUtilities.js"], a["Core/Axis/Axis.js"], a["Core/Defaults.js"], a["Core/Templating.js"], a["Core/Foundation.js"], a["Core/Globals.js"], a["Core/Renderer/RendererRegistry.js"], a["Core/Series/Series.js"], a["Core/Series/SeriesRegistry.js"], a["Core/Renderer/SVG/SVGRenderer.js"], a["Core/Time.js"],
                a["Core/Utilities.js"], a["Core/Renderer/HTML/AST.js"]], function (a, x, G, I, y, A, F, D, t, q, k, p, n) {
                    const { animate: h, animObject: f, setAnimation: c } = a, { defaultOptions: g, defaultTime: B } = G, { numberFormat: C } = I, { registerEventOptions: E } = y, { charts: e, doc: l, marginNames: v, svg: z, win: u } = A, { seriesTypes: b } = t, { addEvent: d, attr: m, createElement: w, css: r, defined: H, diffObjects: N, discardElement: ea, erase: P, error: Y, extend: R, find: W, fireEvent: J, getStyle: K, isArray: fa, isNumber: V, isObject: T, isString: L, merge: Q, objectEach: S, pick: O, pInt: U, relativeLength: Z,
                        removeEvent: ia, splat: aa, syncTimeout: ca, uniqueKey: ba } = p; class da {
                            static chart(b, d, c) { return new da(b, d, c) } constructor(b, d, c) {
                                this.series = this.renderTo = this.renderer = this.pointer = this.pointCount = this.plotWidth = this.plotTop = this.plotLeft = this.plotHeight = this.plotBox = this.options = this.numberFormatter = this.margin = this.labelCollectors = this.isResizing = this.index = this.eventOptions = this.container = this.colorCounter = this.clipBox = this.chartWidth = this.chartHeight = this.bounds = this.axisOffset = this.axes = void 0; this.sharedClips =
                                    {}; this.zooming = this.yAxis = this.xAxis = this.userOptions = this.titleOffset = this.time = this.symbolCounter = this.spacingBox = this.spacing = void 0; this.getArgs(b, d, c)
                            } getArgs(b, d, c) { L(b) || b.nodeName ? (this.renderTo = b, this.init(d, c)) : this.init(b, d) } setZoomOptions() {
                                const b = this.options.chart, d = b.zooming; this.zooming = Object.assign(Object.assign({}, d), {
                                    type: O(b.zoomType, d.type), key: O(b.zoomKey, d.key), pinchType: O(b.pinchType, d.pinchType), singleTouch: O(b.zoomBySingleTouch, d.singleTouch, !1), resetButton: Q(d.resetButton,
                                        b.resetZoomButton)
                                })
                            } init(b, d) {
                                J(this, "init", { args: arguments }, function () {
                                    const c = Q(g, b), a = c.chart; this.userOptions = R({}, b); this.margin = []; this.spacing = []; this.bounds = { h: {}, v: {} }; this.labelCollectors = []; this.callback = d; this.isResizing = 0; this.options = c; this.axes = []; this.series = []; this.time = b.time && Object.keys(b.time).length ? new k(b.time) : A.time; this.numberFormatter = a.numberFormatter || C; this.styledMode = a.styledMode; this.hasCartesianSeries = a.showAxes; this.index = e.length; e.push(this); A.chartCount++; E(this,
                                        a); this.xAxis = []; this.yAxis = []; this.pointCount = this.colorCounter = this.symbolCounter = 0; this.setZoomOptions(); J(this, "afterInit"); this.firstRender()
                                })
                            } initSeries(d) { var c = this.options.chart; c = d.type || c.type; const a = b[c]; a || Y(17, !0, this, { missingModuleFor: c }); c = new a; "function" === typeof c.init && c.init(this, d); return c } setSeriesData() { this.getSeriesOrderByLinks().forEach(function (b) { b.points || b.data || !b.enabledDataSorting || b.setData(b.options.data, !1) }) } getSeriesOrderByLinks() {
                                return this.series.concat().sort(function (b,
                                    d) { return b.linkedSeries.length || d.linkedSeries.length ? d.linkedSeries.length - b.linkedSeries.length : 0 })
                            } orderItems(b, d = 0) { const c = this[b], a = this.options[b] = aa(this.options[b]).slice(); b = this.userOptions[b] = this.userOptions[b] ? aa(this.userOptions[b]).slice() : []; this.hasRendered && (a.splice(d), b.splice(d)); if (c) for (let e = d, f = c.length; e < f; ++e)if (d = c[e]) d.index = e, d instanceof D && (d.name = d.getName()), d.options.isInternal || (a[e] = d.options, b[e] = d.userOptions) } isInsidePlot(b, d, c = {}) {
                                const { inverted: a, plotBox: e,
                                    plotLeft: f, plotTop: g, scrollablePlotBox: m } = this; var l = 0; let h = 0; c.visiblePlotOnly && this.scrollingContainer && ({ scrollLeft: l, scrollTop: h } = this.scrollingContainer); const k = c.series, n = c.visiblePlotOnly && m || e; var u = c.inverted ? d : b; d = c.inverted ? b : d; b = { x: u, y: d, isInsidePlot: !0, options: c }; if (!c.ignoreX) { const d = k && (a && !this.polar ? k.yAxis : k.xAxis) || { pos: f, len: Infinity }; u = c.paneCoordinates ? d.pos + u : f + u; u >= Math.max(l + f, d.pos) && u <= Math.min(l + f + n.width, d.pos + d.len) || (b.isInsidePlot = !1) } !c.ignoreY && b.isInsidePlot &&
                                        (l = !a && c.axis && !c.axis.isXAxis && c.axis || k && (a ? k.xAxis : k.yAxis) || { pos: g, len: Infinity }, c = c.paneCoordinates ? l.pos + d : g + d, c >= Math.max(h + g, l.pos) && c <= Math.min(h + g + n.height, l.pos + l.len) || (b.isInsidePlot = !1)); J(this, "afterIsInsidePlot", b); return b.isInsidePlot
                            } redraw(b) {
                                J(this, "beforeRedraw"); const d = this.hasCartesianSeries ? this.axes : this.colorAxis || [], a = this.series, e = this.pointer, f = this.legend, g = this.userOptions.legend, m = this.renderer, l = m.isHidden(), h = []; let k, n, u = this.isDirtyBox, v = this.isDirtyLegend, w;
                                m.rootFontSize = m.boxWrapper.getStyle("font-size"); this.setResponsive && this.setResponsive(!1); c(this.hasRendered ? b : !1, this); l && this.temporaryDisplay(); this.layOutTitles(!1); for (b = a.length; b--;)if (w = a[b], w.options.stacking || w.options.centerInCategory) if (n = !0, w.isDirty) { k = !0; break } if (k) for (b = a.length; b--;)w = a[b], w.options.stacking && (w.isDirty = !0); a.forEach(function (b) {
                                    b.isDirty && ("point" === b.options.legendType ? ("function" === typeof b.updateTotals && b.updateTotals(), v = !0) : g && (g.labelFormatter || g.labelFormat) &&
                                        (v = !0)); b.isDirtyData && J(b, "updatedData")
                                }); v && f && f.options.enabled && (f.render(), this.isDirtyLegend = !1); n && this.getStacks(); d.forEach(function (b) { b.updateNames(); b.setScale() }); this.getMargins(); d.forEach(function (b) { b.isDirty && (u = !0) }); d.forEach(function (b) { const d = b.min + "," + b.max; b.extKey !== d && (b.extKey = d, h.push(function () { J(b, "afterSetExtremes", R(b.eventArgs, b.getExtremes())); delete b.eventArgs })); (u || n) && b.redraw() }); u && this.drawChartBox(); J(this, "predraw"); a.forEach(function (b) {
                                    (u || b.isDirty) &&
                                    b.visible && b.redraw(); b.isDirtyData = !1
                                }); e && e.reset(!0); m.draw(); J(this, "redraw"); J(this, "render"); l && this.temporaryDisplay(!0); h.forEach(function (b) { b.call() })
                            } get(b) { function d(d) { return d.id === b || d.options && d.options.id === b } const c = this.series; let a = W(this.axes, d) || W(this.series, d); for (let b = 0; !a && b < c.length; b++)a = W(c[b].points || [], d); return a } getAxes() { const b = this.options; J(this, "getAxes"); for (const d of ["xAxis", "yAxis"]) { const c = b[d] = aa(b[d] || {}); for (const b of c) new x(this, b, d) } J(this, "afterGetAxes") } getSelectedPoints() {
                                return this.series.reduce((b,
                                    d) => { d.getPointsCollection().forEach(d => { O(d.selectedStaging, d.selected) && b.push(d) }); return b }, [])
                            } getSelectedSeries() { return this.series.filter(function (b) { return b.selected }) } setTitle(b, d, c) { this.applyDescription("title", b); this.applyDescription("subtitle", d); this.applyDescription("caption", void 0); this.layOutTitles(c) } applyDescription(b, d) {
                                const c = this, a = this.options[b] = Q(this.options[b], d); let e = this[b]; e && d && (this[b] = e = e.destroy()); a && !e && (e = this.renderer.text(a.text, 0, 0, a.useHTML).attr({
                                    align: a.align,
                                    "class": "highcharts-" + b, zIndex: a.zIndex || 4
                                }).add(), e.update = function (d, a) { c.applyDescription(b, d); c.layOutTitles(a) }, this.styledMode || e.css(R("title" === b ? { fontSize: this.options.isStock ? "1em" : "1.2em" } : {}, a.style)), this[b] = e)
                            } layOutTitles(b = !0) {
                                const d = [0, 0, 0], c = this.renderer, a = this.spacingBox;["title", "subtitle", "caption"].forEach(function (b) {
                                    const e = this[b], f = this.options[b], g = f.verticalAlign || "top"; b = "title" === b ? "top" === g ? -3 : 0 : "top" === g ? d[0] + 2 : 0; if (e) {
                                        e.css({
                                            width: (f.width || a.width + (f.widthAdjust ||
                                                0)) + "px"
                                        }); const m = c.fontMetrics(e).b, l = Math.round(e.getBBox(f.useHTML).height); e.align(R({ y: "bottom" === g ? m : b + m, height: l }, f), !1, "spacingBox"); f.floating || ("top" === g ? d[0] = Math.ceil(d[0] + l) : "bottom" === g && (d[2] = Math.ceil(d[2] + l)))
                                    }
                                }, this); d[0] && "top" === (this.options.title.verticalAlign || "top") && (d[0] += this.options.title.margin); d[2] && "bottom" === this.options.caption.verticalAlign && (d[2] += this.options.caption.margin); const e = !this.titleOffset || this.titleOffset.join(",") !== d.join(","); this.titleOffset =
                                    d; J(this, "afterLayOutTitles"); !this.isDirtyBox && e && (this.isDirtyBox = this.isDirtyLegend = e, this.hasRendered && b && this.isDirtyBox && this.redraw())
                            } getContainerBox() { return { width: K(this.renderTo, "width", !0) || 0, height: K(this.renderTo, "height", !0) || 0 } } getChartSize() { var b = this.options.chart; const d = b.width; b = b.height; const c = this.getContainerBox(); this.chartWidth = Math.max(0, d || c.width || 600); this.chartHeight = Math.max(0, Z(b, this.chartWidth) || (1 < c.height ? c.height : 400)); this.containerBox = c } temporaryDisplay(b) {
                                let d =
                                    this.renderTo; if (b) for (; d && d.style;)d.hcOrigStyle && (r(d, d.hcOrigStyle), delete d.hcOrigStyle), d.hcOrigDetached && (l.body.removeChild(d), d.hcOrigDetached = !1), d = d.parentNode; else for (; d && d.style;) {
                                        l.body.contains(d) || d.parentNode || (d.hcOrigDetached = !0, l.body.appendChild(d)); if ("none" === K(d, "display", !1) || d.hcOricDetached) d.hcOrigStyle = { display: d.style.display, height: d.style.height, overflow: d.style.overflow }, b = { display: "block", overflow: "hidden" }, d !== this.renderTo && (b.height = 0), r(d, b), d.offsetWidth || d.style.setProperty("display",
                                            "block", "important"); d = d.parentNode; if (d === l.body) break
                                    }
                            } setClassName(b) { this.container.className = "highcharts-container " + (b || "") } getContainer() {
                                const b = this.options, d = b.chart; var a = ba(); let f, g = this.renderTo; g || (this.renderTo = g = d.renderTo); L(g) && (this.renderTo = g = l.getElementById(g)); g || Y(13, !0, this); var h = U(m(g, "data-highcharts-chart")); V(h) && e[h] && e[h].hasRendered && e[h].destroy(); m(g, "data-highcharts-chart", this.index); g.innerHTML = n.emptyHTML; d.skipClone || g.offsetWidth || this.temporaryDisplay();
                                this.getChartSize(); h = this.chartWidth; const k = this.chartHeight; r(g, { overflow: "hidden" }); this.styledMode || (f = R({ position: "relative", overflow: "hidden", width: h + "px", height: k + "px", textAlign: "left", lineHeight: "normal", zIndex: 0, "-webkit-tap-highlight-color": "rgba(0,0,0,0)", userSelect: "none", "touch-action": "manipulation", outline: "none" }, d.style || {})); this.container = a = w("div", { id: a }, f, g); this._cursor = a.style.cursor; this.renderer = new (d.renderer || !z ? F.getRendererType(d.renderer) : q)(a, h, k, void 0, d.forExport,
                                    b.exporting && b.exporting.allowHTML, this.styledMode); this.containerBox = this.getContainerBox(); c(void 0, this); this.setClassName(d.className); if (this.styledMode) for (const d in b.defs) this.renderer.definition(b.defs[d]); else this.renderer.setStyle(d.style); this.renderer.chartIndex = this.index; J(this, "afterGetContainer")
                            } getMargins(b) {
                                const { spacing: d, margin: c, titleOffset: a } = this; this.resetMargins(); a[0] && !H(c[0]) && (this.plotTop = Math.max(this.plotTop, a[0] + d[0])); a[2] && !H(c[2]) && (this.marginBottom = Math.max(this.marginBottom,
                                    a[2] + d[2])); this.legend && this.legend.display && this.legend.adjustMargins(c, d); J(this, "getMargins"); b || this.getAxisMargins()
                            } getAxisMargins() { const b = this, d = b.axisOffset = [0, 0, 0, 0], c = b.colorAxis, a = b.margin, e = function (b) { b.forEach(function (b) { b.visible && b.getOffset() }) }; b.hasCartesianSeries ? e(b.axes) : c && c.length && e(c); v.forEach(function (c, e) { H(a[e]) || (b[c] += d[e]) }); b.setChartSize() } getOptions() { return N(this.userOptions, g) } reflow(b) {
                                const d = this; var c = d.options.chart; c = H(c.width) && H(c.height); const a =
                                    d.containerBox, e = d.getContainerBox(); delete d.pointer.chartPosition; if (!c && !d.isPrinting && a && e.width) { if (e.width !== a.width || e.height !== a.height) p.clearTimeout(d.reflowTimeout), d.reflowTimeout = ca(function () { d.container && d.setSize(void 0, void 0, !1) }, b ? 100 : 0); d.containerBox = e }
                            } setReflow() {
                                const b = this; var c = d => { var c; (null === (c = b.options) || void 0 === c ? 0 : c.chart.reflow) && b.hasLoaded && b.reflow(d) }; "function" === typeof ResizeObserver ? (new ResizeObserver(c)).observe(b.renderTo) : (c = d(u, "resize", c), d(this, "destroy",
                                    c))
                            } setSize(b, d, a) {
                                const e = this, g = e.renderer; e.isResizing += 1; c(a, e); a = g.globalAnimation; e.oldChartHeight = e.chartHeight; e.oldChartWidth = e.chartWidth; "undefined" !== typeof b && (e.options.chart.width = b); "undefined" !== typeof d && (e.options.chart.height = d); e.getChartSize(); e.styledMode || (a ? h : r)(e.container, { width: e.chartWidth + "px", height: e.chartHeight + "px" }, a); e.setChartSize(!0); g.setSize(e.chartWidth, e.chartHeight, a); e.axes.forEach(function (b) { b.isDirty = !0; b.setScale() }); e.isDirtyLegend = !0; e.isDirtyBox =
                                    !0; e.layOutTitles(); e.getMargins(); e.redraw(a); e.oldChartHeight = null; J(e, "resize"); ca(function () { e && J(e, "endResize", null, function () { --e.isResizing }) }, f(a).duration)
                            } setChartSize(b) {
                                var d = this.inverted; const c = this.renderer; var a = this.chartWidth, e = this.chartHeight; const f = this.options.chart, g = this.spacing, m = this.clipOffset; let l, h, k, n; this.plotLeft = l = Math.round(this.plotLeft); this.plotTop = h = Math.round(this.plotTop); this.plotWidth = k = Math.max(0, Math.round(a - l - this.marginRight)); this.plotHeight = n = Math.max(0,
                                    Math.round(e - h - this.marginBottom)); this.plotSizeX = d ? n : k; this.plotSizeY = d ? k : n; this.plotBorderWidth = f.plotBorderWidth || 0; this.spacingBox = c.spacingBox = { x: g[3], y: g[0], width: a - g[3] - g[1], height: e - g[0] - g[2] }; this.plotBox = c.plotBox = { x: l, y: h, width: k, height: n }; d = 2 * Math.floor(this.plotBorderWidth / 2); a = Math.ceil(Math.max(d, m[3]) / 2); e = Math.ceil(Math.max(d, m[0]) / 2); this.clipBox = { x: a, y: e, width: Math.floor(this.plotSizeX - Math.max(d, m[1]) / 2 - a), height: Math.max(0, Math.floor(this.plotSizeY - Math.max(d, m[2]) / 2 - e)) }; b ||
                                        (this.axes.forEach(function (b) { b.setAxisSize(); b.setAxisTranslation() }), c.alignElements()); J(this, "afterSetChartSize", { skipAxes: b })
                            } resetMargins() { J(this, "resetMargins"); const b = this, d = b.options.chart;["margin", "spacing"].forEach(function (c) { const a = d[c], e = T(a) ? a : [a, a, a, a];["Top", "Right", "Bottom", "Left"].forEach(function (a, f) { b[c][f] = O(d[c + a], e[f]) }) }); v.forEach(function (d, c) { b[d] = O(b.margin[c], b.spacing[c]) }); b.axisOffset = [0, 0, 0, 0]; b.clipOffset = [0, 0, 0, 0] } drawChartBox() {
                                const b = this.options.chart,
                                d = this.renderer, c = this.chartWidth, a = this.chartHeight, e = this.styledMode, f = this.plotBGImage; var g = b.backgroundColor; const m = b.plotBackgroundColor, l = b.plotBackgroundImage, h = this.plotLeft, k = this.plotTop, n = this.plotWidth, u = this.plotHeight, v = this.plotBox, w = this.clipRect, p = this.clipBox; let z = this.chartBackground, q = this.plotBackground, B = this.plotBorder, C, E, r = "animate"; z || (this.chartBackground = z = d.rect().addClass("highcharts-background").add(), r = "attr"); if (e) C = E = z.strokeWidth(); else {
                                    C = b.borderWidth || 0; E = C +
                                        (b.shadow ? 8 : 0); g = { fill: g || "none" }; if (C || z["stroke-width"]) g.stroke = b.borderColor, g["stroke-width"] = C; z.attr(g).shadow(b.shadow)
                                } z[r]({ x: E / 2, y: E / 2, width: c - E - C % 2, height: a - E - C % 2, r: b.borderRadius }); r = "animate"; q || (r = "attr", this.plotBackground = q = d.rect().addClass("highcharts-plot-background").add()); q[r](v); e || (q.attr({ fill: m || "none" }).shadow(b.plotShadow), l && (f ? (l !== f.attr("href") && f.attr("href", l), f.animate(v)) : this.plotBGImage = d.image(l, h, k, n, u).add())); w ? w.animate({ width: p.width, height: p.height }) :
                                    this.clipRect = d.clipRect(p); r = "animate"; B || (r = "attr", this.plotBorder = B = d.rect().addClass("highcharts-plot-border").attr({ zIndex: 1 }).add()); e || B.attr({ stroke: b.plotBorderColor, "stroke-width": b.plotBorderWidth || 0, fill: "none" }); B[r](B.crisp({ x: h, y: k, width: n, height: u }, -B.strokeWidth())); this.isDirtyBox = !1; J(this, "afterDrawChartBox")
                            } propFromSeries() {
                                const d = this, c = d.options.chart, a = d.options.series; let e, f, g;["inverted", "angular", "polar"].forEach(function (m) {
                                    f = b[c.type]; g = c[m] || f && f.prototype[m]; for (e =
                                        a && a.length; !g && e--;)(f = b[a[e].type]) && f.prototype[m] && (g = !0); d[m] = g
                                })
                            } linkSeries(b) { const d = this, c = d.series; c.forEach(function (b) { b.linkedSeries.length = 0 }); c.forEach(function (b) { let c = b.options.linkedTo; L(c) && (c = ":previous" === c ? d.series[b.index - 1] : d.get(c)) && c.linkedParent !== b && (c.linkedSeries.push(b), b.linkedParent = c, c.enabledDataSorting && b.setDataSortingOptions(), b.visible = O(b.options.visible, c.options.visible, b.visible)) }); J(this, "afterLinkSeries", { isUpdating: b }) } renderSeries() {
                                this.series.forEach(function (b) {
                                    b.translate();
                                    b.render()
                                })
                            } render() {
                                const b = this.axes, d = this.colorAxis, c = this.renderer, a = function (b) { b.forEach(function (b) { b.visible && b.render() }) }; let e = 0; this.setTitle(); J(this, "beforeMargins"); this.getStacks && this.getStacks(); this.getMargins(!0); this.setChartSize(); const f = this.plotWidth; b.some(function (b) { if (b.horiz && b.visible && b.options.labels.enabled && b.series.length) return e = 21, !0 }); const g = this.plotHeight = Math.max(this.plotHeight - e, 0); b.forEach(function (b) { b.setScale() }); this.getAxisMargins(); const m = 1.1 <
                                    f / this.plotWidth, l = 1.05 < g / this.plotHeight; if (m || l) b.forEach(function (b) { (b.horiz && m || !b.horiz && l) && b.setTickInterval(!0) }), this.getMargins(); this.drawChartBox(); this.hasCartesianSeries ? a(b) : d && d.length && a(d); this.seriesGroup || (this.seriesGroup = c.g("series-group").attr({ zIndex: 3 }).shadow(this.options.chart.seriesGroupShadow).add()); this.renderSeries(); this.addCredits(); this.setResponsive && this.setResponsive(); this.hasRendered = !0
                            } addCredits(b) {
                                const d = this, c = Q(!0, this.options.credits, b); c.enabled &&
                                    !this.credits && (this.credits = this.renderer.text(c.text + (this.mapCredits || ""), 0, 0).addClass("highcharts-credits").on("click", function () { c.href && (u.location.href = c.href) }).attr({ align: c.position.align, zIndex: 8 }), d.styledMode || this.credits.css(c.style), this.credits.add().align(c.position), this.credits.update = function (b) { d.credits = d.credits.destroy(); d.addCredits(b) })
                            } destroy() {
                                const b = this, d = b.axes, c = b.series, a = b.container, f = a && a.parentNode; let g; J(b, "destroy"); b.renderer.forExport ? P(e, b) : e[b.index] =
                                    void 0; A.chartCount--; b.renderTo.removeAttribute("data-highcharts-chart"); ia(b); for (g = d.length; g--;)d[g] = d[g].destroy(); this.scroller && this.scroller.destroy && this.scroller.destroy(); for (g = c.length; g--;)c[g] = c[g].destroy(); "title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" ").forEach(function (d) { const c = b[d]; c && c.destroy && (b[d] = c.destroy()) }); a && (a.innerHTML = n.emptyHTML, ia(a), f && ea(a));
                                S(b, function (d, c) { delete b[c] })
                            } firstRender() { const b = this, d = b.options; b.getContainer(); b.resetMargins(); b.setChartSize(); b.propFromSeries(); b.getAxes(); const c = fa(d.series) ? d.series : []; d.series = []; c.forEach(function (d) { b.initSeries(d) }); b.linkSeries(); b.setSeriesData(); J(b, "beforeRender"); b.render(); b.pointer.getChartPosition(); if (!b.renderer.imgCount && !b.hasLoaded) b.onload(); b.temporaryDisplay(!0) } onload() {
                                this.callbacks.concat([this.callback]).forEach(function (b) {
                                    b && "undefined" !== typeof this.index &&
                                    b.apply(this, [this])
                                }, this); J(this, "load"); J(this, "render"); H(this.index) && this.setReflow(); this.warnIfA11yModuleNotLoaded(); this.hasLoaded = !0
                            } warnIfA11yModuleNotLoaded() {
                                const { options: b, title: d } = this; b && !this.accessibility && (this.renderer.boxWrapper.attr({ role: "img", "aria-label": (d && d.element.textContent || "").replace(/</g, "&lt;") }), b.accessibility && !1 === b.accessibility.enabled || Y('',
                                    !1, this))
                            } addSeries(b, d, c) { const a = this; let e; b && (d = O(d, !0), J(a, "addSeries", { options: b }, function () { e = a.initSeries(b); a.isDirtyLegend = !0; a.linkSeries(); e.enabledDataSorting && e.setData(b.data, !1); J(a, "afterAddSeries", { series: e }); d && a.redraw(c) })); return e } addAxis(b, d, c, a) { return this.createAxis(d ? "xAxis" : "yAxis", { axis: b, redraw: c, animation: a }) } addColorAxis(b, d, c) { return this.createAxis("colorAxis", { axis: b, redraw: d, animation: c }) } createAxis(b, d) {
                                b = new x(this, d.axis, b); O(d.redraw, !0) && this.redraw(d.animation);
                                return b
                            } showLoading(b) {
                                const c = this, a = c.options, e = a.loading, f = function () { g && r(g, { left: c.plotLeft + "px", top: c.plotTop + "px", width: c.plotWidth + "px", height: c.plotHeight + "px" }) }; let g = c.loadingDiv, m = c.loadingSpan; g || (c.loadingDiv = g = w("div", { className: "highcharts-loading highcharts-loading-hidden" }, null, c.container)); m || (c.loadingSpan = m = w("span", { className: "highcharts-loading-inner" }, null, g), d(c, "redraw", f)); g.className = "highcharts-loading"; n.setElementHTML(m, O(b, a.lang.loading, "")); c.styledMode || (r(g,
                                    R(e.style, { zIndex: 10 })), r(m, e.labelStyle), c.loadingShown || (r(g, { opacity: 0, display: "" }), h(g, { opacity: e.style.opacity || .5 }, { duration: e.showDuration || 0 }))); c.loadingShown = !0; f()
                            } hideLoading() { const b = this.options, d = this.loadingDiv; d && (d.className = "highcharts-loading highcharts-loading-hidden", this.styledMode || h(d, { opacity: 0 }, { duration: b.loading.hideDuration || 100, complete: function () { r(d, { display: "none" }) } })); this.loadingShown = !1 } update(b, d, c, a) {
                                const e = this, f = {
                                    credits: "addCredits", title: "setTitle", subtitle: "setSubtitle",
                                    caption: "setCaption"
                                }, g = b.isResponsiveOptions, m = []; let l, h; J(e, "update", { options: b }); g || e.setResponsive(!1, !0); b = N(b, e.options); e.userOptions = Q(e.userOptions, b); var n = b.chart; if (n) {
                                    Q(!0, e.options.chart, n); this.setZoomOptions(); "className" in n && e.setClassName(n.className); if ("inverted" in n || "polar" in n || "type" in n) { e.propFromSeries(); var u = !0 } "alignTicks" in n && (u = !0); "events" in n && E(this, n); S(n, function (b, d) {
                                        -1 !== e.propsRequireUpdateSeries.indexOf("chart." + d) && (l = !0); -1 !== e.propsRequireDirtyBox.indexOf(d) &&
                                            (e.isDirtyBox = !0); -1 !== e.propsRequireReflow.indexOf(d) && (g ? e.isDirtyBox = !0 : h = !0)
                                    }); !e.styledMode && n.style && e.renderer.setStyle(e.options.chart.style || {})
                                } !e.styledMode && b.colors && (this.options.colors = b.colors); b.time && (this.time === B && (this.time = new k(b.time)), Q(!0, e.options.time, b.time)); S(b, function (d, c) {
                                    if (e[c] && "function" === typeof e[c].update) e[c].update(d, !1); else if ("function" === typeof e[f[c]]) e[f[c]](d); else "colors" !== c && -1 === e.collectionsWithUpdate.indexOf(c) && Q(!0, e.options[c], b[c]); "chart" !==
                                        c && -1 !== e.propsRequireUpdateSeries.indexOf(c) && (l = !0)
                                }); this.collectionsWithUpdate.forEach(function (d) {
                                    b[d] && (aa(b[d]).forEach(function (b, a) { const f = H(b.id); let g; f && (g = e.get(b.id)); !g && e[d] && (g = e[d][O(b.index, a)]) && (f && H(g.options.id) || g.options.isInternal) && (g = void 0); g && g.coll === d && (g.update(b, !1), c && (g.touched = !0)); !g && c && e.collectionsWithInit[d] && (e.collectionsWithInit[d][0].apply(e, [b].concat(e.collectionsWithInit[d][1] || []).concat([!1])).touched = !0) }), c && e[d].forEach(function (b) {
                                        b.touched ||
                                        b.options.isInternal ? delete b.touched : m.push(b)
                                    }))
                                }); m.forEach(function (b) { b.chart && b.remove && b.remove(!1) }); u && e.axes.forEach(function (b) { b.update({}, !1) }); l && e.getSeriesOrderByLinks().forEach(function (b) { b.chart && b.update({}, !1) }, this); u = n && n.width; n = n && (L(n.height) ? Z(n.height, u || e.chartWidth) : n.height); h || V(u) && u !== e.chartWidth || V(n) && n !== e.chartHeight ? e.setSize(u, n, a) : O(d, !0) && e.redraw(a); J(e, "afterUpdate", { options: b, redraw: d, animation: a })
                            } setSubtitle(b, d) {
                                this.applyDescription("subtitle", b);
                                this.layOutTitles(d)
                            } setCaption(b, d) { this.applyDescription("caption", b); this.layOutTitles(d) } showResetZoom() {
                                function b() { d.zoomOut() } const d = this, c = g.lang, a = d.zooming.resetButton, e = a.theme, f = "chart" === a.relativeTo || "spacingBox" === a.relativeTo ? null : "scrollablePlotBox"; J(this, "beforeShowResetZoom", null, function () { d.resetZoomButton = d.renderer.button(c.resetZoom, null, null, b, e).attr({ align: a.position.align, title: c.resetZoomTitle }).addClass("highcharts-reset-zoom").add().align(a.position, !1, f) }); J(this,
                                    "afterShowResetZoom")
                            } zoomOut() { J(this, "selection", { resetSelection: !0 }, this.zoom) } zoom(b) {
                                const d = this, c = d.pointer; let a = !1, e; !b || b.resetSelection ? (d.axes.forEach(function (b) { e = b.zoom() }), c.initiated = !1) : b.xAxis.concat(b.yAxis).forEach(function (b) { const f = b.axis; if (c[f.isXAxis ? "zoomX" : "zoomY"] && H(c.mouseDownX) && H(c.mouseDownY) && d.isInsidePlot(c.mouseDownX - d.plotLeft, c.mouseDownY - d.plotTop, { axis: f }) || !H(d.inverted ? c.mouseDownX : c.mouseDownY)) e = f.zoom(b.min, b.max), f.displayBtn && (a = !0) }); const f = d.resetZoomButton;
                                a && !f ? d.showResetZoom() : !a && T(f) && (d.resetZoomButton = f.destroy()); e && d.redraw(O(d.options.chart.animation, b && b.animation, 100 > d.pointCount))
                            } pan(b, d) {
                                const c = this, a = c.hoverPoints; d = "object" === typeof d ? d : { enabled: d, type: "x" }; const e = c.options.chart; e && e.panning && (e.panning = d); const f = d.type; let g; J(this, "pan", { originalEvent: b }, function () {
                                    a && a.forEach(function (b) { b.setState() }); let d = c.xAxis; "xy" === f ? d = d.concat(c.yAxis) : "y" === f && (d = c.yAxis); const e = {}; d.forEach(function (d) {
                                        if (d.options.panningEnabled &&
                                            !d.options.isInternal) {
                                                var a = d.horiz, m = b[a ? "chartX" : "chartY"]; a = a ? "mouseDownX" : "mouseDownY"; var l = c[a], h = d.minPointOffset || 0, k = d.reversed && !c.inverted || !d.reversed && c.inverted ? -1 : 1, n = d.getExtremes(), u = d.toValue(l - m, !0) + h * k, v = d.toValue(l + d.len - m, !0) - (h * k || d.isXAxis && d.pointRangePadding || 0), w = v < u; k = d.hasVerticalPanning(); l = w ? v : u; u = w ? u : v; var p = d.panningState; !k || d.isXAxis || p && !p.isDirty || d.series.forEach(function (b) {
                                                    var d = b.getProcessedData(!0); d = b.getExtremes(d.yData, !0); p || (p = {
                                                        startMin: Number.MAX_VALUE,
                                                        startMax: -Number.MAX_VALUE
                                                    }); V(d.dataMin) && V(d.dataMax) && (p.startMin = Math.min(O(b.options.threshold, Infinity), d.dataMin, p.startMin), p.startMax = Math.max(O(b.options.threshold, -Infinity), d.dataMax, p.startMax))
                                                }); k = Math.min(O(p && p.startMin, n.dataMin), h ? n.min : d.toValue(d.toPixels(n.min) - d.minPixelPadding)); v = Math.max(O(p && p.startMax, n.dataMax), h ? n.max : d.toValue(d.toPixels(n.max) + d.minPixelPadding)); d.panningState = p; d.isOrdinal || (h = k - l, 0 < h && (u += h, l = k), h = u - v, 0 < h && (u = v, l -= h), d.series.length && l !== n.min &&
                                                    u !== n.max && l >= k && u <= v && (d.setExtremes(l, u, !1, !1, { trigger: "pan" }), !c.resetZoomButton && l !== k && u !== v && f.match("y") && (c.showResetZoom(), d.displayBtn = !1), g = !0), e[a] = m)
                                        }
                                    }); S(e, (b, d) => { c[d] = b }); g && c.redraw(!1); r(c.container, { cursor: "move" })
                                })
                            }
                    } R(da.prototype, {
                        callbacks: [], collectionsWithInit: { xAxis: [da.prototype.addAxis, [!0]], yAxis: [da.prototype.addAxis, [!1]], series: [da.prototype.addSeries] }, collectionsWithUpdate: ["xAxis", "yAxis", "series"], propsRequireDirtyBox: "backgroundColor borderColor borderWidth borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),
                        propsRequireReflow: "margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft".split(" "), propsRequireUpdateSeries: "chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions time tooltip".split(" ")
                    }); ""; return da
                }); K(a, "Extensions/ScrollablePlotArea.js", [a["Core/Animation/AnimationUtilities.js"], a["Core/Axis/Axis.js"], a["Core/Chart/Chart.js"], a["Core/Series/Series.js"], a["Core/Renderer/RendererRegistry.js"], a["Core/Utilities.js"]],
                    function (a, x, G, I, y, A) {
                        const { stop: r } = a, { addEvent: D, createElement: t, defined: q, merge: k, pick: p } = A; D(G, "afterSetChartSize", function (a) {
                            var h = this.options.chart.scrollablePlotArea, f = h && h.minWidth; h = h && h.minHeight; let c; if (!this.renderer.forExport) {
                                if (f) { if (this.scrollablePixelsX = f = Math.max(0, f - this.chartWidth)) this.scrollablePlotBox = this.renderer.scrollablePlotBox = k(this.plotBox), this.plotBox.width = this.plotWidth += f, this.inverted ? this.clipBox.height += f : this.clipBox.width += f, c = { 1: { name: "right", value: f } } } else h &&
                                    (this.scrollablePixelsY = f = Math.max(0, h - this.chartHeight), q(f) && (this.scrollablePlotBox = this.renderer.scrollablePlotBox = k(this.plotBox), this.plotBox.height = this.plotHeight += f, this.inverted ? this.clipBox.width += f : this.clipBox.height += f, c = { 2: { name: "bottom", value: f } })); c && !a.skipAxes && this.axes.forEach(function (a) { c[a.side] ? a.getPlotLinePath = function () { let f = c[a.side].name, g = this[f], h; this[f] = g - c[a.side].value; h = x.prototype.getPlotLinePath.apply(this, arguments); this[f] = g; return h } : (a.setAxisSize(), a.setAxisTranslation()) })
                            }
                        });
                        D(G, "render", function () { this.scrollablePixelsX || this.scrollablePixelsY ? (this.setUpScrolling && this.setUpScrolling(), this.applyFixed()) : this.fixedDiv && this.applyFixed() }); G.prototype.setUpScrolling = function () {
                            const a = { WebkitOverflowScrolling: "touch", overflowX: "hidden", overflowY: "hidden" }; this.scrollablePixelsX && (a.overflowX = "auto"); this.scrollablePixelsY && (a.overflowY = "auto"); this.scrollingParent = t("div", { className: "highcharts-scrolling-parent" }, { position: "relative" }, this.renderTo); this.scrollingContainer =
                                t("div", { className: "highcharts-scrolling" }, a, this.scrollingParent); let h; D(this.scrollingContainer, "scroll", () => { this.pointer && (delete this.pointer.chartPosition, this.hoverPoint && (h = this.hoverPoint), this.pointer.runPointActions(void 0, h, !0)) }); this.innerContainer = t("div", { className: "highcharts-inner-container" }, null, this.scrollingContainer); this.innerContainer.appendChild(this.container); this.setUpScrolling = null
                        }; G.prototype.moveFixedElements = function () {
                            let a = this.container, h = this.fixedRenderer, f =
                                ".highcharts-breadcrumbs-group .highcharts-contextbutton .highcharts-credits .highcharts-legend .highcharts-legend-checkbox .highcharts-navigator-series .highcharts-navigator-xaxis .highcharts-navigator-yaxis .highcharts-navigator .highcharts-reset-zoom .highcharts-drillup-button .highcharts-scrollbar .highcharts-subtitle .highcharts-title".split(" "), c; this.scrollablePixelsX && !this.inverted ? c = ".highcharts-yaxis" : this.scrollablePixelsX && this.inverted ? c = ".highcharts-xaxis" : this.scrollablePixelsY &&
                                    !this.inverted ? c = ".highcharts-xaxis" : this.scrollablePixelsY && this.inverted && (c = ".highcharts-yaxis"); c && f.push(`${c}:not(.highcharts-radial-axis)`, `${c}-labels:not(.highcharts-radial-axis-labels)`); f.forEach(function (c) { [].forEach.call(a.querySelectorAll(c), function (c) { (c.namespaceURI === h.SVG_NS ? h.box : h.box.parentNode).appendChild(c); c.style.pointerEvents = "auto" }) })
                        }; G.prototype.applyFixed = function () {
                            var a = !this.fixedDiv, h = this.options.chart, f = h.scrollablePlotArea, c = y.getRendererType(); a ? (this.fixedDiv =
                                t("div", { className: "highcharts-fixed" }, { position: "absolute", overflow: "hidden", pointerEvents: "none", zIndex: (h.style && h.style.zIndex || 0) + 2, top: 0 }, null, !0), this.scrollingContainer && this.scrollingContainer.parentNode.insertBefore(this.fixedDiv, this.scrollingContainer), this.renderTo.style.overflow = "visible", this.fixedRenderer = h = new c(this.fixedDiv, this.chartWidth, this.chartHeight, this.options.chart.style), this.scrollableMask = h.path().attr({
                                    fill: this.options.chart.backgroundColor || "#fff", "fill-opacity": p(f.opacity,
                                        .85), zIndex: -1
                                }).addClass("highcharts-scrollable-mask").add(), D(this, "afterShowResetZoom", this.moveFixedElements), D(this, "afterApplyDrilldown", this.moveFixedElements), D(this, "afterLayOutTitles", this.moveFixedElements)) : this.fixedRenderer.setSize(this.chartWidth, this.chartHeight); if (this.scrollableDirty || a) this.scrollableDirty = !1, this.moveFixedElements(); h = this.chartWidth + (this.scrollablePixelsX || 0); c = this.chartHeight + (this.scrollablePixelsY || 0); r(this.container); this.container.style.width = h + "px";
                            this.container.style.height = c + "px"; this.renderer.boxWrapper.attr({ width: h, height: c, viewBox: [0, 0, h, c].join(" ") }); this.chartBackground.attr({ width: h, height: c }); this.scrollingContainer.style.height = this.chartHeight + "px"; a && (f.scrollPositionX && (this.scrollingContainer.scrollLeft = this.scrollablePixelsX * f.scrollPositionX), f.scrollPositionY && (this.scrollingContainer.scrollTop = this.scrollablePixelsY * f.scrollPositionY)); c = this.axisOffset; a = this.plotTop - c[0] - 1; f = this.plotLeft - c[3] - 1; h = this.plotTop + this.plotHeight +
                                c[2] + 1; c = this.plotLeft + this.plotWidth + c[1] + 1; let g = this.plotLeft + this.plotWidth - (this.scrollablePixelsX || 0), k = this.plotTop + this.plotHeight - (this.scrollablePixelsY || 0); a = this.scrollablePixelsX ? [["M", 0, a], ["L", this.plotLeft - 1, a], ["L", this.plotLeft - 1, h], ["L", 0, h], ["Z"], ["M", g, a], ["L", this.chartWidth, a], ["L", this.chartWidth, h], ["L", g, h], ["Z"]] : this.scrollablePixelsY ? [["M", f, 0], ["L", f, this.plotTop - 1], ["L", c, this.plotTop - 1], ["L", c, 0], ["Z"], ["M", f, k], ["L", f, this.chartHeight], ["L", c, this.chartHeight], ["L",
                                    c, k], ["Z"]] : [["M", 0, 0]]; "adjustHeight" !== this.redrawTrigger && this.scrollableMask.attr({ d: a })
                        }; D(x, "afterInit", function () { this.chart.scrollableDirty = !0 }); D(I, "show", function () { this.chart.scrollableDirty = !0 }); ""
                    }); K(a, "Core/Axis/Stacking/StackItem.js", [a["Core/Templating.js"], a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]], function (a, x, G) {
                        const { format: r } = a, { series: y } = x, { destroyObjectProperties: A, fireEvent: F, isNumber: D, pick: t } = G; class q {
                            constructor(a, p, n, h, f) {
                                const c = a.chart.inverted, g = a.reversed;
                                this.axis = a; a = this.isNegative = !!n !== !!g; this.options = p = p || {}; this.x = h; this.cumulative = this.total = null; this.points = {}; this.hasValidPoints = !1; this.stack = f; this.rightCliff = this.leftCliff = 0; this.alignOptions = { align: p.align || (c ? a ? "left" : "right" : "center"), verticalAlign: p.verticalAlign || (c ? "middle" : a ? "bottom" : "top"), y: p.y, x: p.x }; this.textAlign = p.textAlign || (c ? a ? "right" : "left" : "center")
                            } destroy() { A(this, this.axis) } render(a) {
                                const k = this.axis.chart, n = this.options; var h = n.format; h = h ? r(h, this, k) : n.formatter.call(this);
                                this.label ? this.label.attr({ text: h, visibility: "hidden" }) : (this.label = k.renderer.label(h, null, void 0, n.shape, void 0, void 0, n.useHTML, !1, "stack-labels"), h = { r: n.borderRadius || 0, text: h, padding: t(n.padding, 5), visibility: "hidden" }, k.styledMode || (h.fill = n.backgroundColor, h.stroke = n.borderColor, h["stroke-width"] = n.borderWidth, this.label.css(n.style || {})), this.label.attr(h), this.label.added || this.label.add(a)); this.label.labelrank = k.plotSizeY; F(this, "afterRender")
                            } setOffset(a, p, n, h, f, c) {
                                const { alignOptions: g,
                                    axis: k, label: q, options: r, textAlign: e } = this, l = k.chart; n = this.getStackBox({ xOffset: a, width: p, boxBottom: n, boxTop: h, defaultX: f, xAxis: c }); var { verticalAlign: v } = g; if (q && n) {
                                        h = q.getBBox(); f = q.padding; c = "justify" === t(r.overflow, "justify"); g.x = r.x || 0; g.y = r.y || 0; const { x: a, y: u } = this.adjustStackPosition({ labelBox: h, verticalAlign: v, textAlign: e }); n.x -= a; n.y -= u; q.align(g, !1, n); (v = l.isInsidePlot(q.alignAttr.x + g.x + a, q.alignAttr.y + g.y + u)) || (c = !1); c && y.prototype.justifyDataLabel.call(k, q, g, q.alignAttr, h, n); q.attr({
                                            x: q.alignAttr.x,
                                            y: q.alignAttr.y, rotation: r.rotation, rotationOriginX: h.width / 2, rotationOriginY: h.height / 2
                                        }); t(!c && r.crop, !0) && (v = D(q.x) && D(q.y) && l.isInsidePlot(q.x - f + q.width, q.y) && l.isInsidePlot(q.x + f, q.y)); q[v ? "show" : "hide"]()
                                    } F(this, "afterSetOffset", { xOffset: a, width: p })
                            } adjustStackPosition({ labelBox: a, verticalAlign: p, textAlign: n }) { const h = { bottom: 0, middle: 1, top: 2, right: 1, center: 0, left: -1 }; return { x: a.width / 2 + a.width / 2 * h[n], y: a.height / 2 * h[p] } } getStackBox(a) {
                                var k = this.axis; const n = k.chart, { boxTop: h, defaultX: f, xOffset: c,
                                    width: g, boxBottom: q } = a; var C = k.stacking.usePercentage ? 100 : t(h, this.total, 0); C = k.toPixels(C); a = a.xAxis || n.xAxis[0]; const r = t(f, a.translate(this.x)) + c; k = k.toPixels(q || D(k.min) && k.logarithmic && k.logarithmic.lin2log(k.min) || 0); k = Math.abs(C - k); const e = this.isNegative; return n.inverted ? { x: (e ? C : C - k) - n.plotLeft, y: a.height - r - g, width: k, height: g } : { x: r + a.transB - n.plotLeft, y: (e ? C - k : C) - n.plotTop, width: g, height: k }
                            }
                        } ""; return q
                    }); K(a, "Core/Axis/Stacking/StackingAxis.js", [a["Core/Animation/AnimationUtilities.js"],
                    a["Core/Axis/Axis.js"], a["Core/Series/SeriesRegistry.js"], a["Core/Axis/Stacking/StackItem.js"], a["Core/Utilities.js"]], function (a, x, G, I, y) {
                        function r() { const b = this, c = b.inverted; b.yAxis.forEach(b => { b.stacking && b.stacking.stacks && b.hasVisibleSeries && (b.stacking.oldStacks = b.stacking.stacks) }); b.series.forEach(d => { const a = d.xAxis && d.xAxis.options || {}; !d.options.stacking || !0 !== d.visible && !1 !== b.options.chart.ignoreHiddenSeries || (d.stackKey = [d.type, z(d.options.stack, ""), c ? a.top : a.left, c ? a.height : a.width].join()) }) }
                        function F() { const b = this.stacking; if (b) { var c = b.stacks; v(c, function (b, d) { C(b); c[d] = null }); b && b.stackTotalGroup && b.stackTotalGroup.destroy() } } function D() { "yAxis" !== this.coll || this.stacking || (this.stacking = new u(this)) } function t(b, c, a, e) { !B(b) || b.x !== c || e && b.stackKey !== e ? b = { x: c, index: 0, key: e, stackKey: e } : b.index++; b.key = [a, c, b.index].join(); return b } function q() {
                            const b = this, c = b.stackKey, a = b.yAxis.stacking.stacks, e = b.processedXData, f = b[b.options.stacking + "Stacker"]; let g; f && [c, "-" + c].forEach(d => {
                                let c =
                                    e.length; let m; for (; c--;) { var l = e[c]; g = b.getStackIndicator(g, l, b.index, d); (m = (l = a[d] && a[d][l]) && l.points[g.key]) && f.call(b, m, l, c) }
                            })
                        } function k(b, c, a) { c = c.total ? 100 / c.total : 0; b[0] = g(b[0] * c); b[1] = g(b[1] * c); this.stackedYData[a] = b[1] } function p() {
                            const b = this.yAxis.stacking; this.options.centerInCategory && (this.is("column") || this.is("columnrange")) && !this.options.stacking && 1 < this.chart.series.length ? f.setStackedPoints.call(this, "group") : b && v(b.stacks, (d, c) => {
                                "group" === c.slice(-5) && (v(d, b => b.destroy()),
                                    delete b.stacks[c])
                            })
                        } function n(b) {
                            var d = this.chart; const c = b || this.options.stacking; if (c && (!0 === this.visible || !1 === d.options.chart.ignoreHiddenSeries)) {
                                var a = this.processedXData, f = this.processedYData, l = [], h = f.length, k = this.options, n = k.threshold, u = z(k.startFromThreshold && n, 0); k = k.stack; b = b ? `${this.type},${c}` : this.stackKey; var v = "-" + b, p = this.negStacks; d = "group" === c ? d.yAxis[0] : this.yAxis; var q = d.stacking.stacks, C = d.stacking.oldStacks, r, E; d.stacking.stacksTouched += 1; for (E = 0; E < h; E++) {
                                    var t = a[E]; var y =
                                        f[E]; var D = this.getStackIndicator(D, t, this.index); var A = D.key; var x = (r = p && y < (u ? 0 : n)) ? v : b; q[x] || (q[x] = {}); q[x][t] || (C[x] && C[x][t] ? (q[x][t] = C[x][t], q[x][t].total = null) : q[x][t] = new I(d, d.options.stackLabels, !!r, t, k)); x = q[x][t]; null !== y ? (x.points[A] = x.points[this.index] = [z(x.cumulative, u)], B(x.cumulative) || (x.base = A), x.touched = d.stacking.stacksTouched, 0 < D.index && !1 === this.singleStacks && (x.points[A][0] = x.points[this.index + "," + t + ",0"][0])) : x.points[A] = x.points[this.index] = null; "percent" === c ? (r = r ? b : v, p &&
                                            q[r] && q[r][t] ? (r = q[r][t], x.total = r.total = Math.max(r.total, x.total) + Math.abs(y) || 0) : x.total = g(x.total + (Math.abs(y) || 0))) : "group" === c ? (e(y) && (y = y[0]), null !== y && (x.total = (x.total || 0) + 1)) : x.total = g(x.total + (y || 0)); x.cumulative = "group" === c ? (x.total || 1) - 1 : g(z(x.cumulative, u) + (y || 0)); null !== y && (x.points[A].push(x.cumulative), l[E] = x.cumulative, x.hasValidPoints = !0)
                                } "percent" === c && (d.stacking.usePercentage = !0); "group" !== c && (this.stackedYData = l); d.stacking.oldStacks = {}
                            }
                        } const { getDeferredAnimation: h } = a, { series: { prototype: f } } =
                            G, { addEvent: c, correctFloat: g, defined: B, destroyObjectProperties: C, fireEvent: E, isArray: e, isNumber: l, objectEach: v, pick: z } = y; class u {
                                constructor(b) { this.oldStacks = {}; this.stacks = {}; this.stacksTouched = 0; this.axis = b } buildStacks() { const b = this.axis, c = b.series, a = b.options.reversedStacks, e = c.length; let f, g; this.usePercentage = !1; for (g = e; g--;)f = c[a ? g : e - g - 1], f.setStackedPoints(), f.setGroupedPoints(); for (g = 0; g < e; g++)c[g].modifyStacks(); E(b, "afterBuildStacks") } cleanStacks() {
                                    let b; this.oldStacks && (b = this.stacks =
                                        this.oldStacks); v(b, function (b) { v(b, function (b) { b.cumulative = b.total }) })
                                } resetStacks() { v(this.stacks, b => { v(b, (d, c) => { l(d.touched) && d.touched < this.stacksTouched ? (d.destroy(), delete b[c]) : (d.total = null, d.cumulative = null) }) }) } renderStackTotals() {
                                    var b = this.axis; const c = b.chart, a = c.renderer, e = this.stacks; b = h(c, b.options.stackLabels && b.options.stackLabels.animation || !1); const f = this.stackTotalGroup = this.stackTotalGroup || a.g("stack-labels").attr({ zIndex: 6, opacity: 0 }).add(); f.translate(c.plotLeft, c.plotTop);
                                    v(e, function (b) { v(b, function (b) { b.render(f) }) }); f.animate({ opacity: 1 }, b)
                                }
                        } var b; (function (b) { const d = []; b.compose = function (b, a, e) { y.pushUnique(d, b) && (c(b, "init", D), c(b, "destroy", F)); y.pushUnique(d, a) && (a.prototype.getStacks = r); y.pushUnique(d, e) && (b = e.prototype, b.getStackIndicator = t, b.modifyStacks = q, b.percentStacker = k, b.setGroupedPoints = p, b.setStackedPoints = n) } })(b || (b = {})); return b
                    }); K(a, "Series/Line/LineSeries.js", [a["Core/Series/Series.js"], a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]],
                        function (a, x, G) {
                            const { defined: r, merge: y } = G; class A extends a {
                                constructor() { super(...arguments); this.points = this.options = this.data = void 0 } drawGraph() {
                                    const a = this, r = this.options, t = (this.gappedPath || this.getGraphPath).call(this), q = this.chart.styledMode; let k = [["graph", "highcharts-graph"]]; q || k[0].push(r.lineColor || this.color || "#cccccc", r.dashStyle); k = a.getZonesGraphs(k); k.forEach(function (k, n) {
                                        var h = k[0]; let f = a[h]; const c = f ? "animate" : "attr"; f ? (f.endX = a.preventGraphAnimation ? null : t.xMap, f.animate({ d: t })) :
                                            t.length && (a[h] = f = a.chart.renderer.path(t).addClass(k[1]).attr({ zIndex: 1 }).add(a.group)); f && !q && (h = { stroke: k[2], "stroke-width": r.lineWidth || 0, fill: a.fillGraph && a.color || "none" }, k[3] ? h.dashstyle = k[3] : "square" !== r.linecap && (h["stroke-linecap"] = h["stroke-linejoin"] = "round"), f[c](h).shadow(2 > n && r.shadow)); f && (f.startX = t.xMap, f.isArea = t.isArea)
                                    })
                                } getGraphPath(a, y, t) {
                                    const q = this, k = q.options, p = [], n = []; let h, f = k.step; a = a || q.points; const c = a.reversed; c && a.reverse(); (f = { right: 1, center: 2 }[f] || f && 3) && c && (f =
                                        4 - f); a = this.getValidPoints(a, !1, !(k.connectNulls && !y && !t)); a.forEach(function (c, B) {
                                            const g = c.plotX, E = c.plotY, e = a[B - 1], l = c.isNull || "number" !== typeof E; (c.leftCliff || e && e.rightCliff) && !t && (h = !0); l && !r(y) && 0 < B ? h = !k.connectNulls : l && !y ? h = !0 : (0 === B || h ? B = [["M", c.plotX, c.plotY]] : q.getPointSpline ? B = [q.getPointSpline(a, c, B)] : f ? (B = 1 === f ? [["L", e.plotX, E]] : 2 === f ? [["L", (e.plotX + g) / 2, e.plotY], ["L", (e.plotX + g) / 2, E]] : [["L", g, e.plotY]], B.push(["L", g, E])) : B = [["L", g, E]], n.push(c.x), f && (n.push(c.x), 2 === f && n.push(c.x)),
                                                p.push.apply(p, B), h = !1)
                                        }); p.xMap = n; return q.graphPath = p
                                } getZonesGraphs(a) { this.zones.forEach(function (r, t) { t = ["zone-graph-" + t, "highcharts-graph highcharts-zone-graph-" + t + " " + (r.className || "")]; this.chart.styledMode || t.push(r.color || this.color, r.dashStyle || this.options.dashStyle); a.push(t) }, this); return a }
                            } A.defaultOptions = y(a.defaultOptions, { legendSymbol: "lineMarker" }); x.registerSeriesType("line", A); ""; return A
                        }); K(a, "Series/Area/AreaSeries.js", [a["Core/Color/Color.js"], a["Core/Series/SeriesRegistry.js"],
                        a["Core/Utilities.js"]], function (a, x, G) {
                            const { seriesTypes: { line: r } } = x, { extend: y, merge: A, objectEach: F, pick: D } = G; class t extends r {
                                constructor() { super(...arguments); this.points = this.options = this.data = void 0 } drawGraph() {
                                    this.areaPath = []; super.drawGraph.apply(this); const a = this, k = this.areaPath, p = this.options, n = [["area", "highcharts-area", this.color, p.fillColor]]; this.zones.forEach(function (h, f) {
                                        n.push(["zone-area-" + f, "highcharts-area highcharts-zone-area-" + f + " " + h.className, h.color || a.color, h.fillColor ||
                                            p.fillColor])
                                    }); n.forEach(function (h) { const f = h[0], c = {}; let g = a[f]; const n = g ? "animate" : "attr"; g ? (g.endX = a.preventGraphAnimation ? null : k.xMap, g.animate({ d: k })) : (c.zIndex = 0, g = a[f] = a.chart.renderer.path(k).addClass(h[1]).add(a.group), g.isArea = !0); a.chart.styledMode || (h[3] ? c.fill = h[3] : (c.fill = h[2], c["fill-opacity"] = D(p.fillOpacity, .75))); g[n](c); g.startX = k.xMap; g.shiftUnit = p.step ? 2 : 1 })
                                } getGraphPath(a) {
                                    var k = r.prototype.getGraphPath, p = this.options; const n = p.stacking, h = this.yAxis, f = [], c = [], g = this.index,
                                        q = h.stacking.stacks[this.stackKey], C = p.threshold, E = Math.round(h.getThreshold(p.threshold)); p = D(p.connectNulls, "percent" === n); var e = function (e, b, d) { var m = a[e]; e = n && q[m.x].points[g]; const k = m[d + "Null"] || 0; d = m[d + "Cliff"] || 0; let u, v; m = !0; d || k ? (u = (k ? e[0] : e[1]) + d, v = e[0] + d, m = !!k) : !n && a[b] && a[b].isNull && (u = v = C); "undefined" !== typeof u && (c.push({ plotX: l, plotY: null === u ? E : h.getThreshold(u), isNull: m, isCliff: !0 }), f.push({ plotX: l, plotY: null === v ? E : h.getThreshold(v), doCurve: !1 })) }; let l; a = a || this.points; n && (a = this.getStackPoints(a));
                                    for (let g = 0, b = a.length; g < b; ++g) { n || (a[g].leftCliff = a[g].rightCliff = a[g].leftNull = a[g].rightNull = void 0); var v = a[g].isNull; l = D(a[g].rectPlotX, a[g].plotX); var z = n ? D(a[g].yBottom, E) : E; if (!v || p) p || e(g, g - 1, "left"), v && !n && p || (c.push(a[g]), f.push({ x: g, plotX: l, plotY: z })), p || e(g, g + 1, "right") } e = k.call(this, c, !0, !0); f.reversed = !0; v = k.call(this, f, !0, !0); (z = v[0]) && "M" === z[0] && (v[0] = ["L", z[1], z[2]]); v = e.concat(v); v.length && v.push(["Z"]); k = k.call(this, c, !1, p); v.xMap = e.xMap; this.areaPath = v; return k
                                } getStackPoints(a) {
                                    const k =
                                        this, p = [], n = [], h = this.xAxis, f = this.yAxis, c = f.stacking.stacks[this.stackKey], g = {}, q = f.series, C = q.length, r = f.options.reversedStacks ? 1 : -1, e = q.indexOf(k); a = a || this.points; if (this.options.stacking) {
                                            for (let c = 0; c < a.length; c++)a[c].leftNull = a[c].rightNull = void 0, g[a[c].x] = a[c]; F(c, function (c, a) { null !== c.total && n.push(a) }); n.sort(function (c, a) { return c - a }); const l = q.map(c => c.visible); n.forEach(function (a, z) {
                                                let u = 0, b, d; if (g[a] && !g[a].isNull) p.push(g[a]), [-1, 1].forEach(function (f) {
                                                    const m = 1 === f ? "rightNull" :
                                                        "leftNull", h = c[n[z + f]]; let u = 0; if (h) { let f = e; for (; 0 <= f && f < C;) { const e = q[f].index; b = h.points[e]; b || (e === k.index ? g[a][m] = !0 : l[f] && (d = c[a].points[e]) && (u -= d[1] - d[0])); f += r } } g[a][1 === f ? "rightCliff" : "leftCliff"] = u
                                                }); else { let d = e; for (; 0 <= d && d < C;) { if (b = c[a].points[q[d].index]) { u = b[1]; break } d += r } u = D(u, 0); u = f.translate(u, 0, 1, 0, 1); p.push({ isNull: !0, plotX: h.translate(a, 0, 0, 0, 1), x: a, plotY: u, yBottom: u }) }
                                            })
                                        } return p
                                }
                            } t.defaultOptions = A(r.defaultOptions, { threshold: 0, legendSymbol: "rectangle" }); y(t.prototype, { singleStacks: !1 });
                            x.registerSeriesType("area", t); ""; return t
                        }); K(a, "Series/Spline/SplineSeries.js", [a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]], function (a, x) {
                            const { line: r } = a.seriesTypes, { merge: I, pick: y } = x; class A extends r {
                                constructor() { super(...arguments); this.points = this.options = this.data = void 0 } getPointSpline(a, r, t) {
                                    const q = r.plotX || 0, k = r.plotY || 0, p = a[t - 1]; t = a[t + 1]; let n, h; let f; if (p && !p.isNull && !1 !== p.doCurve && !r.isCliff && t && !t.isNull && !1 !== t.doCurve && !r.isCliff) {
                                        a = p.plotY || 0; var c = t.plotX || 0; t =
                                            t.plotY || 0; let g = 0; n = (1.5 * q + (p.plotX || 0)) / 2.5; h = (1.5 * k + a) / 2.5; c = (1.5 * q + c) / 2.5; f = (1.5 * k + t) / 2.5; c !== n && (g = (f - h) * (c - q) / (c - n) + k - f); h += g; f += g; h > a && h > k ? (h = Math.max(a, k), f = 2 * k - h) : h < a && h < k && (h = Math.min(a, k), f = 2 * k - h); f > t && f > k ? (f = Math.max(t, k), h = 2 * k - f) : f < t && f < k && (f = Math.min(t, k), h = 2 * k - f); r.rightContX = c; r.rightContY = f
                                    } r = ["C", y(p.rightContX, p.plotX, 0), y(p.rightContY, p.plotY, 0), y(n, q, 0), y(h, k, 0), q, k]; p.rightContX = p.rightContY = void 0; return r
                                }
                            } A.defaultOptions = I(r.defaultOptions); a.registerSeriesType("spline",
                                A); ""; return A
                        }); K(a, "Series/AreaSpline/AreaSplineSeries.js", [a["Series/Spline/SplineSeries.js"], a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]], function (a, x, G) {
                            const { area: r, area: { prototype: y } } = x.seriesTypes, { extend: A, merge: F } = G; class D extends a { constructor() { super(...arguments); this.options = this.points = this.data = void 0 } } D.defaultOptions = F(a.defaultOptions, r.defaultOptions); A(D.prototype, { getGraphPath: y.getGraphPath, getStackPoints: y.getStackPoints, drawGraph: y.drawGraph }); x.registerSeriesType("areaspline",
                                D); ""; return D
                        }); K(a, "Series/Column/ColumnSeriesDefaults.js", [], function () { ""; return { borderRadius: 3, centerInCategory: !1, groupPadding: .2, marker: null, pointPadding: .1, minPointLength: 0, cropThreshold: 50, pointRange: null, states: { hover: { halo: !1, brightness: .1 }, select: { color: "#cccccc", borderColor: "#000000" } }, dataLabels: { align: void 0, verticalAlign: void 0, y: void 0 }, startFromThreshold: !0, stickyTracking: !1, tooltip: { distance: 6 }, threshold: 0, borderColor: "#ffffff" } }); K(a, "Series/Column/ColumnSeries.js", [a["Core/Animation/AnimationUtilities.js"],
                        a["Core/Color/Color.js"], a["Series/Column/ColumnSeriesDefaults.js"], a["Core/Globals.js"], a["Core/Series/Series.js"], a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]], function (a, x, G, I, y, A, F) {
                            const { animObject: r } = a, { parse: t } = x, { hasTouch: q, noop: k } = I, { clamp: p, defined: n, extend: h, fireEvent: f, isArray: c, isNumber: g, merge: B, pick: C, objectEach: E } = F; class e extends y {
                                constructor() { super(...arguments); this.points = this.options = this.group = this.data = this.borderWidth = void 0 } animate(c) {
                                    const a = this, e = this.yAxis,
                                    f = e.pos, b = a.options, d = this.chart.inverted, g = {}, l = d ? "translateX" : "translateY"; let k; c ? (g.scaleY = .001, c = p(e.toPixels(b.threshold), f, f + e.len), d ? g.translateX = c - e.len : g.translateY = c, a.clipBox && a.setClip(), a.group.attr(g)) : (k = Number(a.group.attr(l)), a.group.animate({ scaleY: 1 }, h(r(a.options.animation), { step: function (b, d) { a.group && (g[l] = k + d.pos * (f - k), a.group.attr(g)) } })))
                                } init(c, a) {
                                    super.init.apply(this, arguments); const e = this; c = e.chart; c.hasRendered && c.series.forEach(function (c) {
                                        c.type === e.type && (c.isDirty =
                                            !0)
                                    })
                                } getColumnMetrics() {
                                    const c = this; var a = c.options; const e = c.xAxis, f = c.yAxis; var b = e.options.reversedStacks; b = e.reversed && !b || !e.reversed && b; const d = {}; let g, h = 0; !1 === a.grouping ? h = 1 : c.chart.series.forEach(function (b) { const a = b.yAxis, e = b.options; let l; b.type !== c.type || !b.visible && c.chart.options.chart.ignoreHiddenSeries || f.len !== a.len || f.pos !== a.pos || (e.stacking && "group" !== e.stacking ? (g = b.stackKey, "undefined" === typeof d[g] && (d[g] = h++), l = d[g]) : !1 !== e.grouping && (l = h++), b.columnIndex = l) }); const k =
                                        Math.min(Math.abs(e.transA) * (e.ordinal && e.ordinal.slope || a.pointRange || e.closestPointRange || e.tickInterval || 1), e.len), n = k * a.groupPadding, p = (k - 2 * n) / (h || 1); a = Math.min(a.maxPointWidth || e.len, C(a.pointWidth, p * (1 - 2 * a.pointPadding))); c.columnMetrics = { width: a, offset: (p - a) / 2 + (n + ((c.columnIndex || 0) + (b ? 1 : 0)) * p - k / 2) * (b ? -1 : 1), paddedWidth: p, columnCount: h }; return c.columnMetrics
                                } crispCol(c, a, e, f) {
                                    var b = this.borderWidth, d = -(b % 2 ? .5 : 0); b = b % 2 ? .5 : 1; this.options.crisp && (e = Math.round(c + e) + d, c = Math.round(c) + d, e -= c); f =
                                        Math.round(a + f) + b; d = .5 >= Math.abs(a) && .5 < f; a = Math.round(a) + b; f -= a; d && f && (--a, f += 1); return { x: c, y: a, width: e, height: f }
                                } adjustForMissingColumns(a, e, f, g) {
                                    const b = this.options.stacking; if (!f.isNull && 1 < g.columnCount) {
                                        const d = this.yAxis.options.reversedStacks; let l = 0, h = d ? 0 : -g.columnCount; E(this.yAxis.stacking && this.yAxis.stacking.stacks, a => {
                                            if ("number" === typeof f.x) {
                                                const e = a[f.x.toString()]; e && (a = e.points[this.index], b ? (a && (l = h), e.hasValidPoints && (d ? h++ : h--)) : c(a) && (a = Object.keys(e.points).filter(b => !b.match(",") &&
                                                    e.points[b] && 1 < e.points[b].length).map(parseFloat).sort((b, d) => d - b), l = a.indexOf(this.index), h = a.length))
                                            }
                                        }); a = (f.plotX || 0) + ((h - 1) * g.paddedWidth + e) / 2 - e - l * g.paddedWidth
                                    } return a
                                } translate() {
                                    const c = this, a = c.chart, e = c.options; var h = c.dense = 2 > c.closestPointRange * c.xAxis.transA; h = c.borderWidth = C(e.borderWidth, h ? 0 : 1); const b = c.xAxis, d = c.yAxis, m = e.threshold, k = C(e.minPointLength, 5), q = c.getColumnMetrics(), B = q.width, r = c.pointXOffset = q.offset, E = c.dataMin, t = c.dataMax; let x = c.barW = Math.max(B, 1 + 2 * h), A = c.translatedThreshold =
                                        d.getThreshold(m); a.inverted && (A -= .5); e.pointPadding && (x = Math.ceil(x)); y.prototype.translate.apply(c); c.points.forEach(function (f) {
                                            const h = C(f.yBottom, A); var l = 999 + Math.abs(h), u = f.plotX || 0; l = p(f.plotY, -l, d.len + l); let v = Math.min(l, h), w = Math.max(l, h) - v, z = B, H = u + r, y = x; k && Math.abs(w) < k && (w = k, u = !d.reversed && !f.negative || d.reversed && f.negative, g(m) && g(t) && f.y === m && t <= m && (d.min || 0) < m && (E !== t || (d.max || 0) <= m) && (u = !u, f.negative = !f.negative), v = Math.abs(v - A) > k ? h - k : A - (u ? k : 0)); n(f.options.pointWidth) && (z = y = Math.ceil(f.options.pointWidth),
                                                H -= Math.round((z - B) / 2)); e.centerInCategory && (H = c.adjustForMissingColumns(H, z, f, q)); f.barX = H; f.pointWidth = z; f.tooltipPos = a.inverted ? [p(d.len + d.pos - a.plotLeft - l, d.pos - a.plotLeft, d.len + d.pos - a.plotLeft), b.len + b.pos - a.plotTop - H - y / 2, w] : [b.left - a.plotLeft + H + y / 2, p(l + d.pos - a.plotTop, d.pos - a.plotTop, d.len + d.pos - a.plotTop), w]; f.shapeType = c.pointClass.prototype.shapeType || "roundedRect"; f.shapeArgs = c.crispCol(H, f.isNull ? A : v, y, f.isNull ? 0 : w)
                                        }); f(this, "afterColumnTranslate")
                                } drawGraph() {
                                    this.group[this.dense ? "addClass" :
                                        "removeClass"]("highcharts-dense-data")
                                } pointAttribs(c, a) {
                                    const e = this.options; var f = this.pointAttrToOptions || {}, b = f.stroke || "borderColor"; const d = f["stroke-width"] || "borderWidth"; let g, h = c && c.color || this.color, l = c && c[b] || e[b] || h; f = c && c.options.dashStyle || e.dashStyle; let k = c && c[d] || e[d] || this[d] || 0, n = C(c && c.opacity, e.opacity, 1); c && this.zones.length && (g = c.getZone(), h = c.options.color || g && (g.color || c.nonZonedColor) || this.color, g && (l = g.borderColor || l, f = g.dashStyle || f, k = g.borderWidth || k)); a && c && (c = B(e.states[a],
                                        c.options.states && c.options.states[a] || {}), a = c.brightness, h = c.color || "undefined" !== typeof a && t(h).brighten(c.brightness).get() || h, l = c[b] || l, k = c[d] || k, f = c.dashStyle || f, n = C(c.opacity, n)); b = { fill: h, stroke: l, "stroke-width": k, opacity: n }; f && (b.dashstyle = f); return b
                                } drawPoints(c = this.points) {
                                    const a = this, e = this.chart, f = a.options, b = e.renderer, d = f.animationLimit || 250; let h; c.forEach(function (c) {
                                        let l = c.graphic, m = !!l, k = l && e.pointCount < d ? "animate" : "attr"; if (g(c.plotY) && null !== c.y) {
                                            h = c.shapeArgs; l && c.hasNewShapeType() &&
                                                (l = l.destroy()); a.enabledDataSorting && (c.startXPos = a.xAxis.reversed ? -(h ? h.width || 0 : 0) : a.xAxis.width); l || (c.graphic = l = b[c.shapeType](h).add(c.group || a.group)) && a.enabledDataSorting && e.hasRendered && e.pointCount < d && (l.attr({ x: c.startXPos }), m = !0, k = "animate"); if (l && m) l[k](B(h)); e.styledMode || l[k](a.pointAttribs(c, c.selected && "select")).shadow(!1 !== c.allowShadow && f.shadow); l && (l.addClass(c.getClassName(), !0), l.attr({ visibility: c.visible ? "inherit" : "hidden" }))
                                        } else l && (c.graphic = l.destroy())
                                    })
                                } drawTracker(a =
                                    this.points) {
                                        const e = this, g = e.chart, h = g.pointer, b = function (b) { const d = h.getPointFromEvent(b); "undefined" !== typeof d && e.options.enableMouseTracking && (h.isDirectTouch = !0, d.onMouseOver(b)) }; let d; a.forEach(function (b) { d = c(b.dataLabels) ? b.dataLabels : b.dataLabel ? [b.dataLabel] : []; b.graphic && (b.graphic.element.point = b); d.forEach(function (d) { d.div ? d.div.point = b : d.element.point = b }) }); e._hasTracking || (e.trackerGroups.forEach(function (d) {
                                            if (e[d]) {
                                                e[d].addClass("highcharts-tracker").on("mouseover", b).on("mouseout",
                                                    function (b) { h.onTrackerMouseOut(b) }); if (q) e[d].on("touchstart", b); !g.styledMode && e.options.cursor && e[d].css({ cursor: e.options.cursor })
                                            }
                                        }), e._hasTracking = !0); f(this, "afterDrawTracker")
                                } remove() { const c = this, a = c.chart; a.hasRendered && a.series.forEach(function (a) { a.type === c.type && (a.isDirty = !0) }); y.prototype.remove.apply(c, arguments) }
                            } e.defaultOptions = B(y.defaultOptions, G); h(e.prototype, { cropShoulder: 0, directTouch: !0, getSymbol: k, negStacks: !0, trackerGroups: ["group", "dataLabelsGroup"] }); A.registerSeriesType("column",
                                e); ""; return e
                        }); K(a, "Core/Series/DataLabel.js", [a["Core/Animation/AnimationUtilities.js"], a["Core/Templating.js"], a["Core/Utilities.js"]], function (a, x, G) {
                            const { getDeferredAnimation: r } = a, { format: y } = x, { defined: A, extend: F, fireEvent: D, isArray: t, isString: q, merge: k, objectEach: p, pick: n, splat: h } = G; var f; (function (c) {
                                function a(b, d, c, a, e) {
                                    const f = this.chart; var g = this.isCartesian && f.inverted; const h = this.enabledDataSorting; var l = b.plotX, m = b.plotY; const k = c.rotation; var u = c.align; m = A(l) && A(m) && f.isInsidePlot(l,
                                        Math.round(m), { inverted: g, paneCoordinates: !0, series: this }); let v = "justify" === n(c.overflow, h ? "none" : "justify"); g = this.visible && !1 !== b.visible && A(l) && (b.series.forceDL || h && !v || m || n(c.inside, !!this.options.stacking) && a && f.isInsidePlot(l, g ? a.x + 1 : a.y + a.height - 1, { inverted: g, paneCoordinates: !0, series: this })); l = b.pos(); if (g && l) {
                                            k && d.attr({ align: u }); u = d.getBBox(!0); var p = [0, 0]; var q = f.renderer.fontMetrics(d).b; a = F({ x: l[0], y: Math.round(l[1]), width: 0, height: 0 }, a); F(c, { width: u.width, height: u.height }); k ? (v = !1,
                                                p = f.renderer.rotCorr(q, k), q = { x: a.x + (c.x || 0) + a.width / 2 + p.x, y: a.y + (c.y || 0) + { top: 0, middle: .5, bottom: 1 }[c.verticalAlign] * a.height }, p = [u.x - Number(d.attr("x")), u.y - Number(d.attr("y"))], h && this.xAxis && !v && this.setDataLabelStartPos(b, d, e, m, q), d[e ? "attr" : "animate"](q)) : (h && this.xAxis && !v && this.setDataLabelStartPos(b, d, e, m, a), d.align(c, void 0, a), q = d.alignAttr); if (v && 0 <= a.height) this.justifyDataLabel(d, c, q, u, a, e); else if (n(c.crop, !0)) {
                                                    let { x: b, y: c } = q; b += p[0]; c += p[1]; g = f.isInsidePlot(b, c, {
                                                        paneCoordinates: !0,
                                                        series: this
                                                    }) && f.isInsidePlot(b + u.width, c + u.height, { paneCoordinates: !0, series: this })
                                                } if (c.shape && !k) d[e ? "attr" : "animate"]({ anchorX: l[0], anchorY: l[1] })
                                        } e && h && (d.placed = !1); g || h && !v ? d.show() : (d.hide(), d.placed = !1)
                                } function f(b, c) { var d = c.filter; return d ? (c = d.operator, b = b[d.property], d = d.value, ">" === c && b > d || "<" === c && b < d || ">=" === c && b >= d || "<=" === c && b <= d || "==" === c && b == d || "===" === c && b === d ? !0 : !1) : !0 } function C() {
                                    return this.plotGroup("dataLabelsGroup", "data-labels", this.hasRendered ? "inherit" : "hidden", this.options.dataLabels.zIndex ||
                                        6)
                                } function E(b) { const c = this.hasRendered || 0, a = this.initDataLabelsGroup().attr({ opacity: +c }); !c && a && (this.visible && a.show(), this.options.animation ? a.animate({ opacity: 1 }, b) : a.attr({ opacity: 1 })); return a } function e(b = this.points) {
                                    var c, a; const e = this, g = e.chart, l = e.options, k = g.renderer, { backgroundColor: u, plotBackgroundColor: B } = g.options.chart, C = g.options.plotOptions, z = k.getContrast(q(B) && B || q(u) && u || "#000000"); let E = l.dataLabels, x, G; var F = h(E)[0]; const I = F.animation; F = F.defer ? r(g, I, e) : { defer: 0, duration: 0 };
                                    E = v(v(null === (c = null === C || void 0 === C ? void 0 : C.series) || void 0 === c ? void 0 : c.dataLabels, null === (a = null === C || void 0 === C ? void 0 : C[e.type]) || void 0 === a ? void 0 : a.dataLabels), E); D(this, "drawDataLabels"); if (t(E) || E.enabled || e._hasPointLabels) G = this.initDataLabels(F), b.forEach(b => {
                                        var c; const d = b.dataLabels || []; x = h(v(E, b.dlOptions || (null === (c = b.options) || void 0 === c ? void 0 : c.dataLabels))); x.forEach((c, a) => {
                                            var h, m = c.enabled && (!b.isNull || b.dataLabelOnNull) && f(b, c); const u = b.connectors ? b.connectors[a] : b.connector,
                                                v = c.style || {}; let w = {}, B = d[a], C = !B; const r = n(c.distance, b.labelDistance); if (m) {
                                                    var E = n(c[b.formatPrefix + "Format"], c.format); var t = b.getLabelConfig(); t = A(E) ? y(E, t, g) : (c[b.formatPrefix + "Formatter"] || c.formatter).call(t, c); E = c.rotation; g.styledMode || (v.color = n(c.color, v.color, q(e.color) ? e.color : void 0, "#000000"), "contrast" === v.color ? (b.contrastColor = k.getContrast(b.color || e.color), v.color = !A(r) && c.inside || 0 > (r || 0) || l.stacking ? b.contrastColor : z) : delete b.contrastColor, l.cursor && (v.cursor = l.cursor)); w =
                                                        { r: c.borderRadius || 0, rotation: E, padding: c.padding, zIndex: 1 }; if (!g.styledMode) { const { backgroundColor: d, borderColor: a } = c; w.fill = "auto" === d ? b.color : d; w.stroke = "auto" === a ? b.color : a; w["stroke-width"] = c.borderWidth } p(w, (b, c) => { "undefined" === typeof b && delete w[c] })
                                                } !B || m && A(t) && !!B.div === !!c.useHTML && (B.rotation && c.rotation || B.rotation === c.rotation) || (B = void 0, C = !0, u && b.connector && (b.connector = b.connector.destroy(), b.connectors && (1 === b.connectors.length ? delete b.connectors : delete b.connectors[a]))); m &&
                                                    A(t) && (B ? w.text = t : (B = E ? k.text(t, 0, 0, c.useHTML).addClass("highcharts-data-label") : k.label(t, 0, 0, c.shape, void 0, void 0, c.useHTML, void 0, "data-label")) && B.addClass(" highcharts-data-label-color-" + b.colorIndex + " " + (c.className || "") + (c.useHTML ? " highcharts-tracker" : "")), B && (B.options = c, B.attr(w), g.styledMode || B.css(v).shadow(c.shadow), (m = c[b.formatPrefix + "TextPath"] || c.textPath) && !c.useHTML && (B.setTextPath((null === (h = b.getDataLabelPath) || void 0 === h ? void 0 : h.call(b, B)) || b.graphic, m), b.dataLabelPath && !m.enabled &&
                                                        (b.dataLabelPath = b.dataLabelPath.destroy())), B.added || B.add(G), e.alignDataLabel(b, B, c, void 0, C), B.isActive = !0, d[a] && d[a] !== B && d[a].destroy(), d[a] = B))
                                        }); for (c = d.length; c--;)d[c].isActive ? d[c].isActive = !1 : (d[c].destroy(), d.splice(c, 1)); b.dataLabel = d[0]; b.dataLabels = d
                                    }); D(this, "afterDrawDataLabels")
                                } function l(b, c, a, e, f, g) {
                                    const d = this.chart, h = c.align, l = c.verticalAlign, k = b.box ? 0 : b.padding || 0; let { x: m = 0, y: n = 0 } = c, u, v; u = (a.x || 0) + k; 0 > u && ("right" === h && 0 <= m ? (c.align = "left", c.inside = !0) : m -= u, v = !0); u = (a.x ||
                                        0) + e.width - k; u > d.plotWidth && ("left" === h && 0 >= m ? (c.align = "right", c.inside = !0) : m += d.plotWidth - u, v = !0); u = a.y + k; 0 > u && ("bottom" === l && 0 <= n ? (c.verticalAlign = "top", c.inside = !0) : n -= u, v = !0); u = (a.y || 0) + e.height - k; u > d.plotHeight && ("top" === l && 0 >= n ? (c.verticalAlign = "bottom", c.inside = !0) : n += d.plotHeight - u, v = !0); v && (c.x = m, c.y = n, b.placed = !g, b.align(c, void 0, f)); return v
                                } function v(b, c) {
                                    let d = [], a; if (t(b) && !t(c)) d = b.map(function (b) { return k(b, c) }); else if (t(c) && !t(b)) d = c.map(function (c) { return k(b, c) }); else if (!t(b) &&
                                        !t(c)) d = k(b, c); else if (t(b) && t(c)) for (a = Math.max(b.length, c.length); a--;)d[a] = k(b[a], c[a]); return d
                                } function z(b, c, a, e, f) {
                                    const d = this.chart, g = d.inverted, h = this.xAxis, l = h.reversed, k = g ? c.height / 2 : c.width / 2; b = (b = b.pointWidth) ? b / 2 : 0; c.startXPos = g ? f.x : l ? -k - b : h.width - k + b; c.startYPos = g ? l ? this.yAxis.height - k + b : -k - b : f.y; e ? "hidden" === c.visibility && (c.show(), c.attr({ opacity: 0 }).animate({ opacity: 1 })) : c.attr({ opacity: 1 }).animate({ opacity: 0 }, void 0, c.hide); d.hasRendered && (a && c.attr({ x: c.startXPos, y: c.startYPos }),
                                        c.placed = !0)
                                } const u = []; c.compose = function (b) { G.pushUnique(u, b) && (b = b.prototype, b.initDataLabelsGroup = C, b.initDataLabels = E, b.alignDataLabel = a, b.drawDataLabels = e, b.justifyDataLabel = l, b.setDataLabelStartPos = z) }
                            })(f || (f = {})); ""; return f
                        }); K(a, "Series/Column/ColumnDataLabel.js", [a["Core/Series/DataLabel.js"], a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]], function (a, x, G) {
                            const { series: r } = x, { merge: y, pick: A } = G; var F; (function (x) {
                                function t(a, p, n, h, f) {
                                    let c = this.chart.inverted; var g = a.series;
                                    let k = (g.xAxis ? g.xAxis.len : this.chart.plotSizeX) || 0; g = (g.yAxis ? g.yAxis.len : this.chart.plotSizeY) || 0; var q = a.dlBox || a.shapeArgs; let E = A(a.below, a.plotY > A(this.translatedThreshold, g)), e = A(n.inside, !!this.options.stacking); q && (h = y(q), 0 > h.y && (h.height += h.y, h.y = 0), q = h.y + h.height - g, 0 < q && q < h.height && (h.height -= q), c && (h = { x: g - h.y - h.height, y: k - h.x - h.width, width: h.height, height: h.width }), e || (c ? (h.x += E ? 0 : h.width, h.width = 0) : (h.y += E ? h.height : 0, h.height = 0))); n.align = A(n.align, !c || e ? "center" : E ? "right" : "left"); n.verticalAlign =
                                        A(n.verticalAlign, c || e ? "middle" : E ? "top" : "bottom"); r.prototype.alignDataLabel.call(this, a, p, n, h, f); n.inside && a.contrastColor && p.css({ color: a.contrastColor })
                                } const q = []; x.compose = function (k) { a.compose(r); G.pushUnique(q, k) && (k.prototype.alignDataLabel = t) }
                            })(F || (F = {})); return F
                        }); K(a, "Series/Bar/BarSeries.js", [a["Series/Column/ColumnSeries.js"], a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]], function (a, x, G) {
                            const { extend: r, merge: y } = G; class A extends a {
                                constructor() {
                                    super(...arguments); this.points =
                                        this.options = this.data = void 0
                                }
                            } A.defaultOptions = y(a.defaultOptions, {}); r(A.prototype, { inverted: !0 }); x.registerSeriesType("bar", A); ""; return A
                        }); K(a, "Series/Scatter/ScatterSeriesDefaults.js", [], function () { ""; return { lineWidth: 0, findNearestPointBy: "xy", jitter: { x: 0, y: 0 }, marker: { enabled: !0 }, tooltip: { headerFormat: '<span style="color:{point.color}">\u25cf</span> <span style="font-size: 0.8em"> {series.name}</span><br/>', pointFormat: "x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>" } } }); K(a, "Series/Scatter/ScatterSeries.js",
                            [a["Series/Scatter/ScatterSeriesDefaults.js"], a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]], function (a, x, G) {
                                const { column: r, line: y } = x.seriesTypes, { addEvent: A, extend: F, merge: D } = G; class t extends y {
                                    constructor() { super(...arguments); this.points = this.options = this.data = void 0 } applyJitter() {
                                        const a = this, k = this.options.jitter, p = this.points.length; k && this.points.forEach(function (n, h) {
                                            ["x", "y"].forEach(function (f, c) {
                                                let g = "plot" + f.toUpperCase(), q, C; if (k[f] && !n.isNull) {
                                                    var r = a[f + "Axis"]; C = k[f] *
                                                        r.transA; r && !r.isLog && (q = Math.max(0, n[g] - C), r = Math.min(r.len, n[g] + C), c = 1E4 * Math.sin(h + c * p), c -= Math.floor(c), n[g] = q + (r - q) * c, "x" === f && (n.clientX = n.plotX))
                                                }
                                            })
                                        })
                                    } drawGraph() { this.options.lineWidth ? super.drawGraph() : this.graph && (this.graph = this.graph.destroy()) }
                                } t.defaultOptions = D(y.defaultOptions, a); F(t.prototype, { drawTracker: r.prototype.drawTracker, sorted: !1, requireSorting: !1, noSharedTooltip: !0, trackerGroups: ["group", "markerGroup", "dataLabelsGroup"], takeOrdinalPosition: !1 }); A(t, "afterTranslate", function () { this.applyJitter() });
                                x.registerSeriesType("scatter", t); return t
                            }); K(a, "Series/CenteredUtilities.js", [a["Core/Globals.js"], a["Core/Series/Series.js"], a["Core/Utilities.js"]], function (a, x, G) {
                                const { deg2rad: r } = a, { fireEvent: y, isNumber: A, pick: F, relativeLength: D } = G; var t; (function (a) {
                                    a.getCenter = function () {
                                        var a = this.options, p = this.chart; const n = 2 * (a.slicedOffset || 0), h = p.plotWidth - 2 * n, f = p.plotHeight - 2 * n; var c = a.center; const g = Math.min(h, f), q = a.thickness; var C = a.size; let r = a.innerSize || 0; "string" === typeof C && (C = parseFloat(C));
                                        "string" === typeof r && (r = parseFloat(r)); a = [F(c[0], "50%"), F(c[1], "50%"), F(C && 0 > C ? void 0 : a.size, "100%"), F(r && 0 > r ? void 0 : a.innerSize || 0, "0%")]; !p.angular || this instanceof x || (a[3] = 0); for (c = 0; 4 > c; ++c)C = a[c], p = 2 > c || 2 === c && /%$/.test(C), a[c] = D(C, [h, f, g, a[2]][c]) + (p ? n : 0); a[3] > a[2] && (a[3] = a[2]); A(q) && 2 * q < a[2] && 0 < q && (a[3] = a[2] - 2 * q); y(this, "afterGetCenter", { positions: a }); return a
                                    }; a.getStartAndEndRadians = function (a, p) { a = A(a) ? a : 0; p = A(p) && p > a && 360 > p - a ? p : a + 360; return { start: r * (a + -90), end: r * (p + -90) } }
                                })(t || (t = {}));
                                ""; return t
                            }); K(a, "Series/Pie/PiePoint.js", [a["Core/Animation/AnimationUtilities.js"], a["Core/Series/Point.js"], a["Core/Utilities.js"]], function (a, x, G) {
                                const { setAnimation: r } = a, { addEvent: y, defined: A, extend: F, isNumber: D, pick: t, relativeLength: q } = G; class k extends x {
                                    constructor() { super(...arguments); this.series = this.options = this.labelDistance = void 0 } getConnectorPath() {
                                        const a = this.labelPosition, k = this.series.options.dataLabels, h = this.connectorShapes; let f = k.connectorShape; h[f] && (f = h[f]); return f.call(this,
                                            { x: a.computed.x, y: a.computed.y, alignment: a.alignment }, a.connectorPosition, k)
                                    } getTranslate() { return this.sliced ? this.slicedTranslation : { translateX: 0, translateY: 0 } } haloPath(a) { const k = this.shapeArgs; return this.sliced || !this.visible ? [] : this.series.chart.renderer.symbols.arc(k.x, k.y, k.r + a, k.r + a, { innerR: k.r - 1, start: k.start, end: k.end, borderRadius: k.borderRadius }) } init() {
                                        super.init.apply(this, arguments); this.name = t(this.name, "Slice"); const a = a => { this.slice("select" === a.type) }; y(this, "select", a); y(this,
                                            "unselect", a); return this
                                    } isValid() { return D(this.y) && 0 <= this.y } setVisible(a, k) { const h = this.series, f = h.chart, c = h.options.ignoreHiddenPoint; k = t(k, c); a !== this.visible && (this.visible = this.options.visible = a = "undefined" === typeof a ? !this.visible : a, h.options.data[h.data.indexOf(this)] = this.options, ["graphic", "dataLabel", "connector"].forEach(c => { if (this[c]) this[c][a ? "show" : "hide"](a) }), this.legendItem && f.legend.colorizeItem(this, a), a || "hover" !== this.state || this.setState(""), c && (h.isDirty = !0), k && f.redraw()) } slice(a,
                                        k, h) { const f = this.series; r(h, f.chart); t(k, !0); this.sliced = this.options.sliced = A(a) ? a : !this.sliced; f.options.data[f.data.indexOf(this)] = this.options; this.graphic && this.graphic.animate(this.getTranslate()) }
                                } F(k.prototype, {
                                    connectorShapes: {
                                        fixedOffset: function (a, k, h) { const f = k.breakAt; k = k.touchingSliceAt; return [["M", a.x, a.y], h.softConnector ? ["C", a.x + ("left" === a.alignment ? -5 : 5), a.y, 2 * f.x - k.x, 2 * f.y - k.y, f.x, f.y] : ["L", f.x, f.y], ["L", k.x, k.y]] }, straight: function (a, k) {
                                            k = k.touchingSliceAt; return [["M", a.x, a.y],
                                            ["L", k.x, k.y]]
                                        }, crookedLine: function (a, k, h) { const { breakAt: f, touchingSliceAt: c } = k; ({ series: k } = this); const [g, n, p] = k.center, r = p / 2, e = k.chart.plotWidth, l = k.chart.plotLeft; k = "left" === a.alignment; const { x: v, y: z } = a; h.crookDistance ? (a = q(h.crookDistance, 1), a = k ? g + r + (e + l - g - r) * (1 - a) : l + (g - r) * a) : a = g + (n - z) * Math.tan((this.angle || 0) - Math.PI / 2); h = [["M", v, z]]; (k ? a <= v && a >= f.x : a >= v && a <= f.x) && h.push(["L", a, z]); h.push(["L", f.x, f.y], ["L", c.x, c.y]); return h }
                                    }
                                }); return k
                            }); K(a, "Series/Pie/PieSeriesDefaults.js", [], function () {
                                "";
                                return {
                                    borderRadius: 3, center: [null, null], clip: !1, colorByPoint: !0, dataLabels: { allowOverlap: !0, connectorPadding: 5, connectorShape: "crookedLine", crookDistance: void 0, distance: 30, enabled: !0, formatter: function () { return this.point.isNull ? void 0 : this.point.name }, softConnector: !0, x: 0 }, fillColor: void 0, ignoreHiddenPoint: !0, inactiveOtherPoints: !0, legendType: "point", marker: null, size: null, showInLegend: !1, slicedOffset: 10, stickyTracking: !1, tooltip: { followPointer: !0 }, borderColor: "#ffffff", borderWidth: 1, lineWidth: void 0,
                                    states: { hover: { brightness: .1 } }
                                }
                            }); K(a, "Series/Pie/PieSeries.js", [a["Series/CenteredUtilities.js"], a["Series/Column/ColumnSeries.js"], a["Core/Globals.js"], a["Series/Pie/PiePoint.js"], a["Series/Pie/PieSeriesDefaults.js"], a["Core/Series/Series.js"], a["Core/Series/SeriesRegistry.js"], a["Core/Renderer/SVG/Symbols.js"], a["Core/Utilities.js"]], function (a, x, G, I, y, A, F, D, t) {
                                const { getStartAndEndRadians: q } = a; ({ noop: G } = G); const { clamp: k, extend: p, fireEvent: n, merge: h, pick: f, relativeLength: c } = t; class g extends A {
                                    constructor() {
                                        super(...arguments);
                                        this.points = this.options = this.maxLabelDistance = this.data = this.center = void 0
                                    } animate(c) { const a = this, g = a.points, e = a.startAngleRad; c || g.forEach(function (c) { const g = c.graphic, h = c.shapeArgs; g && h && (g.attr({ r: f(c.startR, a.center && a.center[3] / 2), start: e, end: e }), g.animate({ r: h.r, start: h.start, end: h.end }, a.options.animation)) }) } drawEmpty() {
                                        const c = this.startAngleRad, a = this.endAngleRad, f = this.options; let e, g; 0 === this.total && this.center ? (e = this.center[0], g = this.center[1], this.graph || (this.graph = this.chart.renderer.arc(e,
                                            g, this.center[1] / 2, 0, c, a).addClass("highcharts-empty-series").add(this.group)), this.graph.attr({ d: D.arc(e, g, this.center[2] / 2, 0, { start: c, end: a, innerR: this.center[3] / 2 }) }), this.chart.styledMode || this.graph.attr({ "stroke-width": f.borderWidth, fill: f.fillColor || "none", stroke: f.color || "#cccccc" })) : this.graph && (this.graph = this.graph.destroy())
                                    } drawPoints() {
                                        const c = this.chart.renderer; this.points.forEach(function (a) {
                                            a.graphic && a.hasNewShapeType() && (a.graphic = a.graphic.destroy()); a.graphic || (a.graphic = c[a.shapeType](a.shapeArgs).add(a.series.group),
                                                a.delayedRendering = !0)
                                        })
                                    } generatePoints() { super.generatePoints(); this.updateTotals() } getX(c, a, f) { const e = this.center, g = this.radii ? this.radii[f.index] || 0 : e[2] / 2; c = Math.asin(k((c - e[1]) / (g + f.labelDistance), -1, 1)); return e[0] + (a ? -1 : 1) * Math.cos(c) * (g + f.labelDistance) + (0 < f.labelDistance ? (a ? -1 : 1) * this.options.dataLabels.padding : 0) } hasData() { return !!this.processedXData.length } redrawPoints() {
                                        const c = this, a = c.chart; let f, e, g, k; this.drawEmpty(); c.group && !a.styledMode && c.group.shadow(c.options.shadow); c.points.forEach(function (l) {
                                            const n =
                                                {}; e = l.graphic; !l.isNull && e ? (k = l.shapeArgs, f = l.getTranslate(), a.styledMode || (g = c.pointAttribs(l, l.selected && "select")), l.delayedRendering ? (e.setRadialReference(c.center).attr(k).attr(f), a.styledMode || e.attr(g).attr({ "stroke-linejoin": "round" }), l.delayedRendering = !1) : (e.setRadialReference(c.center), a.styledMode || h(!0, n, g), h(!0, n, k, f), e.animate(n)), e.attr({ visibility: l.visible ? "inherit" : "hidden" }), e.addClass(l.getClassName(), !0)) : e && (l.graphic = e.destroy())
                                        })
                                    } sortByAngle(c, a) {
                                        c.sort(function (c, e) {
                                            return "undefined" !==
                                                typeof c.angle && (e.angle - c.angle) * a
                                        })
                                    } translate(a) {
                                        n(this, "translate"); this.generatePoints(); var g = this.options; const h = g.slicedOffset, e = h + (g.borderWidth || 0); var l = q(g.startAngle, g.endAngle); const k = this.startAngleRad = l.start; l = (this.endAngleRad = l.end) - k; const p = this.points, u = g.dataLabels.distance; g = g.ignoreHiddenPoint; const b = p.length; let d, m, w, r = 0; a || (this.center = a = this.getCenter()); for (m = 0; m < b; m++) {
                                            w = p[m]; var B = k + r * l; !w.isValid() || g && !w.visible || (r += w.percentage / 100); var t = k + r * l; var y = {
                                                x: a[0],
                                                y: a[1], r: a[2] / 2, innerR: a[3] / 2, start: Math.round(1E3 * B) / 1E3, end: Math.round(1E3 * t) / 1E3
                                            }; w.shapeType = "arc"; w.shapeArgs = y; w.labelDistance = f(w.options.dataLabels && w.options.dataLabels.distance, u); w.labelDistance = c(w.labelDistance, y.r); this.maxLabelDistance = Math.max(this.maxLabelDistance || 0, w.labelDistance); t = (t + B) / 2; t > 1.5 * Math.PI ? t -= 2 * Math.PI : t < -Math.PI / 2 && (t += 2 * Math.PI); w.slicedTranslation = { translateX: Math.round(Math.cos(t) * h), translateY: Math.round(Math.sin(t) * h) }; y = Math.cos(t) * a[2] / 2; d = Math.sin(t) * a[2] /
                                                2; w.tooltipPos = [a[0] + .7 * y, a[1] + .7 * d]; w.half = t < -Math.PI / 2 || t > Math.PI / 2 ? 1 : 0; w.angle = t; B = Math.min(e, w.labelDistance / 5); w.labelPosition = { natural: { x: a[0] + y + Math.cos(t) * w.labelDistance, y: a[1] + d + Math.sin(t) * w.labelDistance }, computed: {}, alignment: 0 > w.labelDistance ? "center" : w.half ? "right" : "left", connectorPosition: { breakAt: { x: a[0] + y + Math.cos(t) * B, y: a[1] + d + Math.sin(t) * B }, touchingSliceAt: { x: a[0] + y, y: a[1] + d } } }
                                        } n(this, "afterTranslate")
                                    } updateTotals() {
                                        const c = this.points, a = c.length, f = this.options.ignoreHiddenPoint;
                                        let e, g, h = 0; for (e = 0; e < a; e++)g = c[e], !g.isValid() || f && !g.visible || (h += g.y); this.total = h; for (e = 0; e < a; e++)g = c[e], g.percentage = 0 < h && (g.visible || !f) ? g.y / h * 100 : 0, g.total = h
                                    }
                                } g.defaultOptions = h(A.defaultOptions, y); p(g.prototype, { axisTypes: [], directTouch: !0, drawGraph: void 0, drawTracker: x.prototype.drawTracker, getCenter: a.getCenter, getSymbol: G, isCartesian: !1, noSharedTooltip: !0, pointAttribs: x.prototype.pointAttribs, pointClass: I, requireSorting: !1, searchPoint: G, trackerGroups: ["group", "dataLabelsGroup"] }); F.registerSeriesType("pie",
                                    g); return g
                            }); K(a, "Series/Pie/PieDataLabel.js", [a["Core/Series/DataLabel.js"], a["Core/Globals.js"], a["Core/Renderer/RendererUtilities.js"], a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]], function (a, x, G, I, y) {
                                const { noop: r } = x, { distribute: F } = G, { series: D } = I, { arrayMax: t, clamp: q, defined: k, merge: p, pick: n, relativeLength: h } = y; var f; (function (c) {
                                    function f() {
                                        const c = this, a = c.data, e = c.chart, f = c.options.dataLabels || {}, b = f.connectorPadding, d = e.plotWidth, g = e.plotHeight, h = e.plotLeft, q = Math.round(e.chartWidth /
                                            3), r = c.center, B = r[2] / 2, C = r[1], E = [[], []], y = [0, 0, 0, 0], x = c.dataLabelPositioners; let A, G, I, K, V, T, L, Q, S, O, U, Z; c.visible && (f.enabled || c._hasPointLabels) && (a.forEach(function (b) { b.dataLabel && b.visible && b.dataLabel.shortened && (b.dataLabel.attr({ width: "auto" }).css({ width: "auto", textOverflow: "clip" }), b.dataLabel.shortened = !1) }), D.prototype.drawDataLabels.apply(c), a.forEach(function (b) {
                                                b.dataLabel && (b.visible ? (E[b.half].push(b), b.dataLabel._pos = null, !k(f.style.width) && !k(b.options.dataLabels && b.options.dataLabels.style &&
                                                    b.options.dataLabels.style.width) && b.dataLabel.getBBox().width > q && (b.dataLabel.css({ width: Math.round(.7 * q) + "px" }), b.dataLabel.shortened = !0)) : (b.dataLabel = b.dataLabel.destroy(), b.dataLabels && 1 === b.dataLabels.length && delete b.dataLabels))
                                            }), E.forEach((a, l) => {
                                                const m = a.length, u = []; let v, p = 0; if (m) {
                                                    c.sortByAngle(a, l - .5); if (0 < c.maxLabelDistance) {
                                                        var q = Math.max(0, C - B - c.maxLabelDistance); v = Math.min(C + B + c.maxLabelDistance, e.plotHeight); a.forEach(function (b) {
                                                            0 < b.labelDistance && b.dataLabel && (b.top = Math.max(0,
                                                                C - B - b.labelDistance), b.bottom = Math.min(C + B + b.labelDistance, e.plotHeight), p = b.dataLabel.getBBox().height || 21, b.distributeBox = { target: b.labelPosition.natural.y - b.top + p / 2, size: p, rank: b.y }, u.push(b.distributeBox))
                                                        }); q = v + p - q; F(u, q, q / 5)
                                                    } for (U = 0; U < m; U++) {
                                                        A = a[U]; T = A.labelPosition; K = A.dataLabel; O = !1 === A.visible ? "hidden" : "inherit"; S = q = T.natural.y; u && k(A.distributeBox) && ("undefined" === typeof A.distributeBox.pos ? O = "hidden" : (L = A.distributeBox.size, S = x.radialDistributionY(A))); delete A.positionIndex; if (f.justify) Q =
                                                            x.justify(A, B, r); else switch (f.alignTo) { case "connectors": Q = x.alignToConnectors(a, l, d, h); break; case "plotEdges": Q = x.alignToPlotEdges(K, l, d, h); break; default: Q = x.radialDistributionX(c, A, S, q) }K._attr = { visibility: O, align: T.alignment }; Z = A.options.dataLabels || {}; K._pos = { x: Q + n(Z.x, f.x) + ({ left: b, right: -b }[T.alignment] || 0), y: S + n(Z.y, f.y) - K.getBBox().height / 2 }; T && (T.computed.x = Q, T.computed.y = S); n(f.crop, !0) && (V = K.getBBox().width, q = null, Q - V < b && 1 === l ? (q = Math.round(V - Q + b), y[3] = Math.max(q, y[3])) : Q + V > d - b && 0 === l &&
                                                                (q = Math.round(Q + V - d + b), y[1] = Math.max(q, y[1])), 0 > S - L / 2 ? y[0] = Math.max(Math.round(-S + L / 2), y[0]) : S + L / 2 > g && (y[2] = Math.max(Math.round(S + L / 2 - g), y[2])), K.sideOverflow = q)
                                                    }
                                                }
                                            }), 0 === t(y) || this.verifyDataLabelOverflow(y)) && (this.placeDataLabels(), this.points.forEach(function (b) {
                                                Z = p(f, b.options.dataLabels); if (G = n(Z.connectorWidth, 1)) {
                                                    let a; I = b.connector; if ((K = b.dataLabel) && K._pos && b.visible && 0 < b.labelDistance) {
                                                        O = K._attr.visibility; if (a = !I) b.connector = I = e.renderer.path().addClass("highcharts-data-label-connector  highcharts-color-" +
                                                            b.colorIndex + (b.className ? " " + b.className : "")).add(c.dataLabelsGroup), e.styledMode || I.attr({ "stroke-width": G, stroke: Z.connectorColor || b.color || "#666666" }); I[a ? "attr" : "animate"]({ d: b.getConnectorPath() }); I.attr("visibility", O)
                                                    } else I && (b.connector = I.destroy())
                                                }
                                            }))
                                    } function B() {
                                        this.points.forEach(function (c) {
                                            let a = c.dataLabel, e; a && c.visible && ((e = a._pos) ? (a.sideOverflow && (a._attr.width = Math.max(a.getBBox().width - a.sideOverflow, 0), a.css({
                                                width: a._attr.width + "px", textOverflow: (this.options.dataLabels.style ||
                                                    {}).textOverflow || "ellipsis"
                                            }), a.shortened = !0), a.attr(a._attr), a[a.moved ? "animate" : "attr"](e), a.moved = !0) : a && a.attr({ y: -9999 })); delete c.distributeBox
                                        }, this)
                                    } function C(c) {
                                        let a = this.center, e = this.options, f = e.center, b = e.minSize || 80, d, g = null !== e.size; g || (null !== f[0] ? d = Math.max(a[2] - Math.max(c[1], c[3]), b) : (d = Math.max(a[2] - c[1] - c[3], b), a[0] += (c[3] - c[1]) / 2), null !== f[1] ? d = q(d, b, a[2] - Math.max(c[0], c[2])) : (d = q(d, b, a[2] - c[0] - c[2]), a[1] += (c[0] - c[2]) / 2), d < a[2] ? (a[2] = d, a[3] = Math.min(e.thickness ? Math.max(0, d -
                                            2 * e.thickness) : Math.max(0, h(e.innerSize || 0, d)), d), this.translate(a), this.drawDataLabels && this.drawDataLabels()) : g = !0); return g
                                    } const E = [], e = {
                                        radialDistributionY: function (c) { return c.top + c.distributeBox.pos }, radialDistributionX: function (c, a, e, f) { return c.getX(e < a.top + 2 || e > a.bottom - 2 ? f : e, a.half, a) }, justify: function (c, a, e) { return e[0] + (c.half ? -1 : 1) * (a + c.labelDistance) }, alignToPlotEdges: function (c, a, e, f) { c = c.getBBox().width; return a ? c + f : e - c - f }, alignToConnectors: function (c, a, e, f) {
                                            let b = 0, d; c.forEach(function (c) {
                                                d =
                                                c.dataLabel.getBBox().width; d > b && (b = d)
                                            }); return a ? b + f : e - b - f
                                        }
                                    }; c.compose = function (c) { a.compose(D); y.pushUnique(E, c) && (c = c.prototype, c.dataLabelPositioners = e, c.alignDataLabel = r, c.drawDataLabels = f, c.placeDataLabels = B, c.verifyDataLabelOverflow = C) }
                                })(f || (f = {})); return f
                            }); K(a, "Extensions/OverlappingDataLabels.js", [a["Core/Chart/Chart.js"], a["Core/Utilities.js"]], function (a, x) {
                                function r(a, k) {
                                    let p, n = !1; a && (p = a.newOpacity, a.oldOpacity !== p && (a.alignAttr && a.placed ? (a[p ? "removeClass" : "addClass"]("highcharts-data-label-hidden"),
                                        n = !0, a.alignAttr.opacity = p, a[a.isOld ? "animate" : "attr"](a.alignAttr, null, function () { k.styledMode || a.css({ pointerEvents: p ? "auto" : "none" }) }), y(k, "afterHideOverlappingLabel")) : a.attr({ opacity: p })), a.isOld = !0); return n
                                } const { addEvent: I, fireEvent: y, isArray: A, isNumber: F, objectEach: D, pick: t } = x; I(a, "render", function () {
                                    let a = this, k = []; (this.labelCollectors || []).forEach(function (a) { k = k.concat(a()) }); (this.yAxis || []).forEach(function (a) {
                                        a.stacking && a.options.stackLabels && !a.options.stackLabels.allowOverlap &&
                                        D(a.stacking.stacks, function (a) { D(a, function (a) { a.label && k.push(a.label) }) })
                                    }); (this.series || []).forEach(function (p) { var n = p.options.dataLabels; p.visible && (!1 !== n.enabled || p._hasPointLabels) && (n = h => h.forEach(f => { f.visible && (A(f.dataLabels) ? f.dataLabels : f.dataLabel ? [f.dataLabel] : []).forEach(function (c) { const g = c.options; c.labelrank = t(g.labelrank, f.labelrank, f.shapeArgs && f.shapeArgs.height); g.allowOverlap ? (c.oldOpacity = c.opacity, c.newOpacity = 1, r(c, a)) : k.push(c) }) }), n(p.nodes || []), n(p.points)) }); this.hideOverlappingLabels(k)
                                });
                                a.prototype.hideOverlappingLabels = function (a) {
                                    let k = this, p = a.length, n = k.renderer; var h; let f; let c, g, q, C = !1; var t = function (c) {
                                        let a, e; var f; let g = c.box ? 0 : c.padding || 0, b = f = 0, d, h; if (c && (!c.alignAttr || c.placed)) return a = c.alignAttr || { x: c.attr("x"), y: c.attr("y") }, e = c.parentGroup, c.width || (f = c.getBBox(), c.width = f.width, c.height = f.height, f = n.fontMetrics(c.element).h), d = c.width - 2 * g, (h = { left: "0", center: "0.5", right: "1" }[c.alignValue]) ? b = +h * d : F(c.x) && Math.round(c.x) !== c.translateX && (b = c.x - c.translateX), {
                                            x: a.x +
                                                (e.translateX || 0) + g - (b || 0), y: a.y + (e.translateY || 0) + g - f, width: c.width - 2 * g, height: c.height - 2 * g
                                        }
                                    }; for (f = 0; f < p; f++)if (h = a[f]) h.oldOpacity = h.opacity, h.newOpacity = 1, h.absoluteBox = t(h); a.sort(function (c, a) { return (a.labelrank || 0) - (c.labelrank || 0) }); for (f = 0; f < p; f++)for (g = (t = a[f]) && t.absoluteBox, h = f + 1; h < p; ++h)q = (c = a[h]) && c.absoluteBox, !g || !q || t === c || 0 === t.newOpacity || 0 === c.newOpacity || "hidden" === t.visibility || "hidden" === c.visibility || q.x >= g.x + g.width || q.x + q.width <= g.x || q.y >= g.y + g.height || q.y + q.height <= g.y ||
                                        ((t.labelrank < c.labelrank ? t : c).newOpacity = 0); a.forEach(function (c) { r(c, k) && (C = !0) }); C && y(k, "afterHideAllOverlappingLabels")
                                }
                            }); K(a, "Extensions/BorderRadius.js", [a["Core/Defaults.js"], a["Core/Series/Series.js"], a["Core/Series/SeriesRegistry.js"], a["Core/Renderer/SVG/SVGElement.js"], a["Core/Renderer/SVG/SVGRenderer.js"], a["Core/Utilities.js"]], function (a, x, G, I, y, A) {
                                const { defaultOptions: r } = a; ({ seriesTypes: a } = G); const { addEvent: D, extend: t, isObject: q, merge: k, relativeLength: p } = A, n = {
                                    radius: 0, scope: "stack",
                                    where: void 0
                                }, h = (a, c) => { q(a) || (a = { radius: a || 0 }); return k(n, c, a) }; if (-1 === I.symbolCustomAttribs.indexOf("borderRadius")) {
                                    I.symbolCustomAttribs.push("borderRadius", "brBoxHeight", "brBoxY"); const f = y.prototype.symbols.arc; y.prototype.symbols.arc = function (c, a, h, k, e = {}) {
                                        c = f(c, a, h, k, e); const { innerR: g = 0, r: n = h, start: q = 0, end: u = 0 } = e; if (e.open || !e.borderRadius) return c; h = u - q; a = Math.sin(h / 2); e = Math.max(Math.min(p(e.borderRadius || 0, n - g), (n - g) / 2, n * a / (1 + a)), 0); h = Math.min(e, h / Math.PI * 2 * g); for (a = c.length - 1; a--;) {
                                            {
                                                let f =
                                                    void 0, g = void 0, l = void 0; k = c; var b = a, d = 1 < a ? h : e, m = k[b], w = k[b + 1]; "Z" === w[0] && (w = k[0]); "M" !== m[0] && "L" !== m[0] || "A" !== w[0] ? "A" !== m[0] || "M" !== w[0] && "L" !== w[0] || (l = w, g = m) : (l = m, g = w, f = !0); if (l && g && g.params) {
                                                        m = g[1]; var r = g[5]; w = g.params; const { start: c, end: a, cx: e, cy: h } = w; var B = r ? m - d : m + d; const n = B ? Math.asin(d / B) : 0; r = r ? n : -n; B *= Math.cos(n); f ? (w.start = c + r, l[1] = e + B * Math.cos(c), l[2] = h + B * Math.sin(c), k.splice(b + 1, 0, ["A", d, d, 0, 0, 1, e + m * Math.cos(w.start), h + m * Math.sin(w.start)])) : (w.end = a - r, g[6] = e + m * Math.cos(w.end), g[7] =
                                                            h + m * Math.sin(w.end), k.splice(b + 1, 0, ["A", d, d, 0, 0, 1, e + B * Math.cos(a), h + B * Math.sin(a)])); g[4] = Math.abs(w.end - w.start) < Math.PI ? 0 : 1
                                                    }
                                            }
                                        } return c
                                    }; const c = y.prototype.symbols.roundedRect; y.prototype.symbols.roundedRect = function (a, f, h, k, e = {}) {
                                        const g = c(a, f, h, k, e), { r: n = 0, brBoxHeight: p = k, brBoxY: u = f } = e; var b = f - u, d = u + p - (f + k); e = -.1 < b - n ? 0 : n; const m = -.1 < d - n ? 0 : n; var q = Math.max(e && b, 0); const r = Math.max(m && d, 0); d = [a + e, f]; b = [a + h - e, f]; const t = [a + h, f + e], B = [a + h, f + k - m], C = [a + h - m, f + k], E = [a + m, f + k], y = [a, f + k - m], x = [a, f + e]; if (q) {
                                            const c =
                                                Math.sqrt(Math.pow(e, 2) - Math.pow(e - q, 2)); d[0] -= c; b[0] += c; t[1] = x[1] = f + e - q
                                        } k < e - q && (q = Math.sqrt(Math.pow(e, 2) - Math.pow(e - q - k, 2)), t[0] = B[0] = a + h - e + q, C[0] = Math.min(t[0], C[0]), E[0] = Math.max(B[0], E[0]), y[0] = x[0] = a + e - q, t[1] = x[1] = f + k); r && (q = Math.sqrt(Math.pow(m, 2) - Math.pow(m - r, 2)), C[0] += q, E[0] -= q, B[1] = y[1] = f + k - m + r); k < m - r && (k = Math.sqrt(Math.pow(m, 2) - Math.pow(m - r - k, 2)), t[0] = B[0] = a + h - m + k, b[0] = Math.min(t[0], b[0]), d[0] = Math.max(B[0], d[0]), y[0] = x[0] = a + m - k, B[1] = y[1] = f); g.length = 0; g.push(["M", ...d], ["L", ...b], ["A",
                                            e, e, 0, 0, 1, ...t], ["L", ...B], ["A", m, m, 0, 0, 1, ...C], ["L", ...E], ["A", m, m, 0, 0, 1, ...y], ["L", ...x], ["A", e, e, 0, 0, 1, ...d], ["Z"]); return g
                                    }; D(a.pie, "afterTranslate", function () { const c = h(this.options.borderRadius); for (const a of this.points) { const f = a.shapeArgs; f && (f.borderRadius = p(c.radius, (f.r || 0) - (f.innerR || 0))) } }); D(x, "afterColumnTranslate", function () {
                                        var c, a; if (this.options.borderRadius && (!this.chart.is3d || !this.chart.is3d())) {
                                            const { options: g, yAxis: n } = this, B = "percent" === g.stacking; var f = null === (a = null ===
                                                (c = r.plotOptions) || void 0 === c ? void 0 : c[this.type]) || void 0 === a ? void 0 : a.borderRadius; c = h(g.borderRadius, q(f) ? f : {}); a = n.options.reversed; for (const h of this.points) if ({ shapeArgs: f } = h, "roundedRect" === h.shapeType && f) {
                                                    const { width: b = 0, height: d = 0, y: l = 0 } = f; var k = l, e = d; "stack" === c.scope && h.stackTotal && (k = n.translate(B ? 100 : h.stackTotal, !1, !0, !1, !0), e = n.translate(g.threshold || 0, !1, !0, !1, !0), e = this.crispCol(0, Math.min(k, e), 0, Math.abs(k - e)), k = e.y, e = e.height); const u = -1 === (h.negative ? -1 : 1) * (a ? -1 : 1); let q = c.where;
                                                    !q && this.is("waterfall") && Math.abs((h.yBottom || 0) - (this.translatedThreshold || 0)) > this.borderWidth && (q = "all"); q || (q = "end"); const v = Math.min(p(c.radius, b), b / 2, "all" === q ? d / 2 : Infinity) || 0; "end" === q && (u && (k -= v), e += v); t(f, { brBoxHeight: e, brBoxY: k, r: v })
                                                }
                                        }
                                    }, { order: 9 })
                                } x = { optionsToObject: h }; ""; return x
                            }); K(a, "Core/Responsive.js", [a["Core/Utilities.js"]], function (a) {
                                const { diffObjects: r, extend: G, find: I, merge: y, pick: A, uniqueKey: F } = a; var D; (function (t) {
                                    function q(a, h) {
                                        const f = a.condition; (f.callback || function () {
                                            return this.chartWidth <=
                                                A(f.maxWidth, Number.MAX_VALUE) && this.chartHeight <= A(f.maxHeight, Number.MAX_VALUE) && this.chartWidth >= A(f.minWidth, 0) && this.chartHeight >= A(f.minHeight, 0)
                                        }).call(this) && h.push(a._id)
                                    } function k(a, h) {
                                        const f = this.options.responsive; var c = this.currentResponsive; let g = []; !h && f && f.rules && f.rules.forEach(a => { "undefined" === typeof a._id && (a._id = F()); this.matchResponsiveRule(a, g) }, this); h = y(...g.map(a => I((f || {}).rules || [], c => c._id === a)).map(a => a && a.chartOptions)); h.isResponsiveOptions = !0; g = g.toString() || void 0;
                                        g !== (c && c.ruleIds) && (c && this.update(c.undoOptions, a, !0), g ? (c = r(h, this.options, !0, this.collectionsWithUpdate), c.isResponsiveOptions = !0, this.currentResponsive = { ruleIds: g, mergedOptions: h, undoOptions: c }, this.update(h, a, !0)) : this.currentResponsive = void 0)
                                    } const p = []; t.compose = function (n) { a.pushUnique(p, n) && G(n.prototype, { matchResponsiveRule: q, setResponsive: k }); return n }
                                })(D || (D = {})); ""; ""; return D
                            }); K(a, "masters/highcharts.src.js", [a["Core/Globals.js"], a["Core/Utilities.js"], a["Core/Defaults.js"], a["Core/Animation/Fx.js"],
                            a["Core/Animation/AnimationUtilities.js"], a["Core/Renderer/HTML/AST.js"], a["Core/Templating.js"], a["Core/Renderer/RendererUtilities.js"], a["Core/Renderer/SVG/SVGElement.js"], a["Core/Renderer/SVG/SVGRenderer.js"], a["Core/Renderer/HTML/HTMLElement.js"], a["Core/Renderer/HTML/HTMLRenderer.js"], a["Core/Axis/Axis.js"], a["Core/Axis/DateTimeAxis.js"], a["Core/Axis/LogarithmicAxis.js"], a["Core/Axis/PlotLineOrBand/PlotLineOrBand.js"], a["Core/Axis/Tick.js"], a["Core/Tooltip.js"], a["Core/Series/Point.js"], a["Core/Pointer.js"],
                            a["Core/Legend/Legend.js"], a["Core/Chart/Chart.js"], a["Core/Axis/Stacking/StackingAxis.js"], a["Core/Axis/Stacking/StackItem.js"], a["Core/Series/Series.js"], a["Core/Series/SeriesRegistry.js"], a["Series/Column/ColumnSeries.js"], a["Series/Column/ColumnDataLabel.js"], a["Series/Pie/PieSeries.js"], a["Series/Pie/PieDataLabel.js"], a["Core/Series/DataLabel.js"], a["Core/Responsive.js"], a["Core/Color/Color.js"], a["Core/Time.js"]], function (a, x, G, I, y, A, F, D, t, q, k, p, n, h, f, c, g, B, C, E, e, l, v, z, u, b, d, m, w, M, H, N, K, P) {
                                a.animate =
                                y.animate; a.animObject = y.animObject; a.getDeferredAnimation = y.getDeferredAnimation; a.setAnimation = y.setAnimation; a.stop = y.stop; a.timers = I.timers; a.AST = A; a.Axis = n; a.Chart = l; a.chart = l.chart; a.Fx = I; a.Legend = e; a.PlotLineOrBand = c; a.Point = C; a.Pointer = E; a.Series = u; a.StackItem = z; a.SVGElement = t; a.SVGRenderer = q; a.Templating = F; a.Tick = g; a.Time = P; a.Tooltip = B; a.Color = K; a.color = K.parse; p.compose(q); k.compose(t); E.compose(l); e.compose(l); a.defaultOptions = G.defaultOptions; a.getOptions = G.getOptions; a.time = G.defaultTime;
                                a.setOptions = G.setOptions; a.dateFormat = F.dateFormat; a.format = F.format; a.numberFormat = F.numberFormat; a.addEvent = x.addEvent; a.arrayMax = x.arrayMax; a.arrayMin = x.arrayMin; a.attr = x.attr; a.clearTimeout = x.clearTimeout; a.correctFloat = x.correctFloat; a.createElement = x.createElement; a.css = x.css; a.defined = x.defined; a.destroyObjectProperties = x.destroyObjectProperties; a.discardElement = x.discardElement; a.distribute = D.distribute; a.erase = x.erase; a.error = x.error; a.extend = x.extend; a.extendClass = x.extendClass; a.find =
                                    x.find; a.fireEvent = x.fireEvent; a.getMagnitude = x.getMagnitude; a.getStyle = x.getStyle; a.inArray = x.inArray; a.isArray = x.isArray; a.isClass = x.isClass; a.isDOMElement = x.isDOMElement; a.isFunction = x.isFunction; a.isNumber = x.isNumber; a.isObject = x.isObject; a.isString = x.isString; a.keys = x.keys; a.merge = x.merge; a.normalizeTickInterval = x.normalizeTickInterval; a.objectEach = x.objectEach; a.offset = x.offset; a.pad = x.pad; a.pick = x.pick; a.pInt = x.pInt; a.relativeLength = x.relativeLength; a.removeEvent = x.removeEvent; a.seriesType =
                                        b.seriesType; a.splat = x.splat; a.stableSort = x.stableSort; a.syncTimeout = x.syncTimeout; a.timeUnits = x.timeUnits; a.uniqueKey = x.uniqueKey; a.useSerialIds = x.useSerialIds; a.wrap = x.wrap; m.compose(d); H.compose(u); h.compose(n); f.compose(n); M.compose(w); c.compose(n); N.compose(l); v.compose(n, l, u); B.compose(E); return a
                            }); K(a, "Core/Axis/Color/ColorAxisComposition.js", [a["Core/Color/Color.js"], a["Core/Utilities.js"]], function (a, x) {
                                const { parse: r } = a, { addEvent: I, extend: y, merge: A, pick: F, splat: D } = x; var t; (function (a) {
                                    function k() {
                                        const a =
                                            this.options; this.colorAxis = []; a.colorAxis && (a.colorAxis = D(a.colorAxis), a.colorAxis.forEach(a => { new v(this, a) }))
                                    } function q(a) {
                                        const c = b => { b = a.allItems.indexOf(b); -1 !== b && (this.destroyItem(a.allItems[b]), a.allItems.splice(b, 1)) }; let b = [], d, e; (this.chart.colorAxis || []).forEach(function (a) {
                                            (d = a.options) && d.showInLegend && (d.dataClasses && d.visible ? b = b.concat(a.getDataClassLegendSymbols()) : d.visible && b.push(a), a.series.forEach(function (b) {
                                                if (!b.options.showInLegend || d.dataClasses) "point" === b.options.legendType ?
                                                    b.points.forEach(function (b) { c(b) }) : c(b)
                                            }))
                                        }); for (e = b.length; e--;)a.allItems.unshift(b[e])
                                    } function n(a) { a.visible && a.item.legendColor && a.item.legendItem.symbol.attr({ fill: a.item.legendColor }) } function h() { const a = this.chart.colorAxis; a && a.forEach(function (a, b, c) { a.update({}, c) }) } function f() { (this.chart.colorAxis && this.chart.colorAxis.length || this.colorAttribs) && this.translateColors() } function c() { const a = this.axisTypes; a ? -1 === a.indexOf("colorAxis") && a.push("colorAxis") : this.axisTypes = ["colorAxis"] }
                                    function g(a) { const c = this, b = a ? "show" : "hide"; c.visible = c.options.visible = !!a;["graphic", "dataLabel"].forEach(function (a) { if (c[a]) c[a][b]() }); this.series.buildKDTree() } function t() {
                                        const a = this, c = this.options.nullColor, b = this.colorAxis, d = this.colorKey; (this.data.length ? this.data : this.points).forEach(e => {
                                            var f = e.getNestedProperty(d); (f = e.options.color || (e.isNull || null === e.value ? c : b && "undefined" !== typeof f ? b.toColor(f, e) : e.color || a.color)) && e.color !== f && (e.color = f, "point" === a.options.legendType && e.legendItem &&
                                                e.legendItem.label && a.chart.legend.colorizeItem(e, e.visible))
                                        })
                                    } function C(a) { const c = a.prototype.createAxis; a.prototype.createAxis = function (b, a) { if ("colorAxis" !== b) return c.apply(this, arguments); const d = new v(this, A(a.axis, { index: this[b].length, isX: !1 })); this.isDirtyLegend = !0; this.axes.forEach(function (b) { b.series = [] }); this.series.forEach(function (b) { b.bindAxes(); b.isDirtyData = !0 }); F(a.redraw, !0) && this.redraw(a.animation); return d } } function E() {
                                        this.elem.attr("fill", r(this.start).tweenTo(r(this.end),
                                            this.pos), void 0, !0)
                                    } function e() { this.elem.attr("stroke", r(this.start).tweenTo(r(this.end), this.pos), void 0, !0) } const l = []; let v; a.compose = function (a, u, b, d, m) {
                                        v || (v = a); x.pushUnique(l, u) && (a = u.prototype, a.collectionsWithUpdate.push("colorAxis"), a.collectionsWithInit.colorAxis = [a.addColorAxis], I(u, "afterGetAxes", k), C(u)); x.pushUnique(l, b) && (u = b.prototype, u.fillSetter = E, u.strokeSetter = e); x.pushUnique(l, d) && (I(d, "afterGetAllItems", q), I(d, "afterColorizeItem", n), I(d, "afterUpdate", h)); x.pushUnique(l, m) &&
                                            (y(m.prototype, { optionalAxis: "colorAxis", translateColors: t }), y(m.prototype.pointClass.prototype, { setVisible: g }), I(m, "afterTranslate", f, { order: 1 }), I(m, "bindAxes", c))
                                    }; a.pointSetVisible = g
                                })(t || (t = {})); return t
                            }); K(a, "Core/Axis/Color/ColorAxisDefaults.js", [], function () {
                                return {
                                    lineWidth: 0, minPadding: 0, maxPadding: 0, gridLineColor: "#ffffff", gridLineWidth: 1, tickPixelInterval: 72, startOnTick: !0, endOnTick: !0, offset: 0, marker: { animation: { duration: 50 }, width: .01, color: "#999999" }, labels: {
                                        distance: 8, overflow: "justify",
                                        rotation: 0
                                    }, minColor: "#e6e9ff", maxColor: "#0022ff", tickLength: 5, showInLegend: !0
                                }
                            }); K(a, "Core/Axis/Color/ColorAxis.js", [a["Core/Axis/Axis.js"], a["Core/Color/Color.js"], a["Core/Axis/Color/ColorAxisComposition.js"], a["Core/Axis/Color/ColorAxisDefaults.js"], a["Core/Legend/LegendSymbol.js"], a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]], function (a, x, G, I, y, A, F) {
                                const { parse: r } = x, { series: t } = A, { extend: q, isArray: k, isNumber: p, merge: n, pick: h } = F; class f extends a {
                                    static compose(a, g, h, k) {
                                        G.compose(f,
                                            a, g, h, k)
                                    } constructor(a, f) { super(a, f); this.beforePadding = !1; this.chart = void 0; this.coll = "colorAxis"; this.stops = this.options = this.dataClasses = void 0; this.visible = !0; this.init(a, f) } init(a, g) {
                                        var c = a.options.legend || {}; const h = g.layout ? "vertical" !== g.layout : "vertical" !== c.layout, q = g.visible; c = n(f.defaultColorAxisOptions, g, { showEmpty: !1, title: null, visible: c.enabled && !1 !== q }); this.side = g.side || h ? 2 : 1; this.reversed = g.reversed || !h; this.opposite = !h; super.init(a, c, "colorAxis"); this.userOptions = g; k(a.userOptions.colorAxis) &&
                                            (a.userOptions.colorAxis[this.index] = g); g.dataClasses && this.initDataClasses(g); this.initStops(); this.horiz = h; this.zoomEnabled = !1
                                    } initDataClasses(a) {
                                        const c = this.chart, f = this.legendItem = this.legendItem || {}, h = a.dataClasses.length, k = this.options; let e, l = 0, q = c.options.chart.colorCount; this.dataClasses = e = []; f.labels = []; (a.dataClasses || []).forEach(function (a, f) {
                                            a = n(a); e.push(a); if (c.styledMode || !a.color) "category" === k.dataClassColor ? (c.styledMode || (f = c.options.colors, q = f.length, a.color = f[l]), a.colorIndex =
                                                l, l++, l === q && (l = 0)) : a.color = r(k.minColor).tweenTo(r(k.maxColor), 2 > h ? .5 : f / (h - 1))
                                        })
                                    } hasData() { return !!(this.tickPositions || []).length } setTickPositions() { if (!this.dataClasses) return super.setTickPositions() } initStops() { this.stops = this.options.stops || [[0, this.options.minColor], [1, this.options.maxColor]]; this.stops.forEach(function (a) { a.color = r(a[1]) }) } setOptions(a) { super.setOptions(a); this.options.crosshair = this.options.marker } setAxisSize() {
                                        var a = this.legendItem && this.legendItem.symbol; const g = this.chart;
                                        var h = g.options.legend || {}; let k, n; a ? (this.left = h = a.attr("x"), this.top = k = a.attr("y"), this.width = n = a.attr("width"), this.height = a = a.attr("height"), this.right = g.chartWidth - h - n, this.bottom = g.chartHeight - k - a, this.len = this.horiz ? n : a, this.pos = this.horiz ? h : k) : this.len = (this.horiz ? h.symbolWidth : h.symbolHeight) || f.defaultLegendLength
                                    } normalizedValue(a) { this.logarithmic && (a = this.logarithmic.log2lin(a)); return 1 - (this.max - a) / (this.max - this.min || 1) } toColor(a, f) {
                                        const c = this.dataClasses; var g = this.stops; let h,
                                            e, k, n; if (c) for (n = c.length; n--;) { if (k = c[n], h = k.from, g = k.to, ("undefined" === typeof h || a >= h) && ("undefined" === typeof g || a <= g)) { e = k.color; f && (f.dataClass = n, f.colorIndex = k.colorIndex); break } } else { a = this.normalizedValue(a); for (n = g.length; n-- && !(a > g[n][0]);); h = g[n] || g[n + 1]; g = g[n + 1] || h; a = 1 - (g[0] - a) / (g[0] - h[0] || 1); e = h.color.tweenTo(g.color, a) } return e
                                    } getOffset() {
                                        const a = this.legendItem && this.legendItem.group, g = this.chart.axisOffset[this.side]; if (a) {
                                            this.axisParent = a; super.getOffset(); const c = this.chart.legend;
                                            c.allItems.forEach(function (a) { a instanceof f && a.drawLegendSymbol(c, a) }); c.render(); this.chart.getMargins(!0); this.added || (this.added = !0, this.labelLeft = 0, this.labelRight = this.width); this.chart.axisOffset[this.side] = g
                                        }
                                    } setLegendColor() { var a = this.reversed, f = a ? 1 : 0; a = a ? 0 : 1; f = this.horiz ? [f, 0, a, 0] : [0, a, 0, f]; this.legendColor = { linearGradient: { x1: f[0], y1: f[1], x2: f[2], y2: f[3] }, stops: this.stops } } drawLegendSymbol(a, g) {
                                        var c; g = g.legendItem || {}; const k = a.padding, n = a.options, e = this.options.labels, l = h(n.itemDistance,
                                            10), q = this.horiz, p = h(n.symbolWidth, q ? f.defaultLegendLength : 12), u = h(n.symbolHeight, q ? 12 : f.defaultLegendLength), b = h(n.labelPadding, q ? 16 : 30); this.setLegendColor(); g.symbol || (g.symbol = this.chart.renderer.symbol("roundedRect", 0, a.baseline - 11, p, u, { r: null !== (c = n.symbolRadius) && void 0 !== c ? c : 3 }).attr({ zIndex: 1 }).add(g.group)); g.labelWidth = p + k + (q ? l : h(e.x, e.distance) + this.maxLabelLength); g.labelHeight = u + k + (q ? b : 0)
                                    } setState(a) { this.series.forEach(function (c) { c.setState(a) }) } setVisible() { } getSeriesExtremes() {
                                        const a =
                                            this.series; let f; let k, n, q = a.length, e, l; this.dataMin = Infinity; for (this.dataMax = -Infinity; q--;) {
                                                n = a[q]; f = n.colorKey = h(n.options.colorKey, n.colorKey, n.pointValKey, n.zoneAxis, "y"); var p = n.pointArrayMap; k = n[f + "Min"] && n[f + "Max"]; if (n[f + "Data"]) var r = n[f + "Data"]; else if (p) { if (r = [], p = p.indexOf(f), e = n.yData, 0 <= p && e) for (l = 0; l < e.length; l++)r.push(h(e[l][p], e[l])) } else r = n.yData; k ? (n.minColorValue = n[f + "Min"], n.maxColorValue = n[f + "Max"]) : (r = t.prototype.getExtremes.call(n, r), n.minColorValue = r.dataMin, n.maxColorValue =
                                                    r.dataMax); "undefined" !== typeof n.minColorValue && (this.dataMin = Math.min(this.dataMin, n.minColorValue), this.dataMax = Math.max(this.dataMax, n.maxColorValue)); k || t.prototype.applyExtremes.call(n)
                                            }
                                    } drawCrosshair(a, f) {
                                        const c = this.legendItem || {}, g = f && f.plotX, h = f && f.plotY, e = this.pos, k = this.len; let n; f && (n = this.toPixels(f.getNestedProperty(f.series.colorKey)), n < e ? n = e - 2 : n > e + k && (n = e + k + 2), f.plotX = n, f.plotY = this.len - n, super.drawCrosshair(a, f), f.plotX = g, f.plotY = h, this.cross && !this.cross.addedToColorAxis && c.group &&
                                            (this.cross.addClass("highcharts-coloraxis-marker").add(c.group), this.cross.addedToColorAxis = !0, this.chart.styledMode || "object" !== typeof this.crosshair || this.cross.attr({ fill: this.crosshair.color })))
                                    } getPlotLinePath(a) { const c = this.left, f = a.translatedValue, h = this.top; return p(f) ? this.horiz ? [["M", f - 4, h - 6], ["L", f + 4, h - 6], ["L", f, h], ["Z"]] : [["M", c, f], ["L", c - 6, f + 6], ["L", c - 6, f - 6], ["Z"]] : super.getPlotLinePath(a) } update(a, f) {
                                        const c = this.chart.legend; this.series.forEach(a => { a.isDirtyData = !0 }); (a.dataClasses &&
                                            c.allItems || this.dataClasses) && this.destroyItems(); super.update(a, f); this.legendItem && this.legendItem.label && (this.setLegendColor(), c.colorizeItem(this, !0))
                                    } destroyItems() { const a = this.chart, f = this.legendItem || {}; if (f.label) a.legend.destroyItem(this); else if (f.labels) for (const c of f.labels) a.legend.destroyItem(c); a.isDirtyLegend = !0 } destroy() { this.chart.isDirtyLegend = !0; this.destroyItems(); super.destroy(...[].slice.call(arguments)) } remove(a) { this.destroyItems(); super.remove(a) } getDataClassLegendSymbols() {
                                        const a =
                                            this, f = a.chart, k = a.legendItem && a.legendItem.labels || [], n = f.options.legend, p = h(n.valueDecimals, -1), e = h(n.valueSuffix, ""), l = c => a.series.reduce((a, b) => { a.push(...b.points.filter(b => b.dataClass === c)); return a }, []); let v; k.length || a.dataClasses.forEach((c, g) => {
                                                const b = c.from, d = c.to, { numberFormatter: h } = f; let n = !0; v = ""; "undefined" === typeof b ? v = "< " : "undefined" === typeof d && (v = "> "); "undefined" !== typeof b && (v += h(b, p) + e); "undefined" !== typeof b && "undefined" !== typeof d && (v += " - "); "undefined" !== typeof d && (v +=
                                                    h(d, p) + e); k.push(q({ chart: f, name: v, options: {}, drawLegendSymbol: y.rectangle, visible: !0, isDataClass: !0, setState: b => { for (const a of l(g)) a.setState(b) }, setVisible: function () { this.visible = n = a.visible = !n; for (const b of l(g)) b.setVisible(n); f.legend.colorizeItem(this, n) } }, c))
                                            }); return k
                                    }
                                } f.defaultColorAxisOptions = I; f.defaultLegendLength = 200; f.keepProps = ["legendItem"]; Array.prototype.push.apply(a.keepProps, f.keepProps); ""; return f
                            }); K(a, "Maps/MapNavigationDefaults.js", [a["Core/Defaults.js"], a["Core/Utilities.js"]],
                                function (a, x) {
                                    ({ extend: x } = x); const r = { buttonOptions: { alignTo: "plotBox", align: "left", verticalAlign: "top", x: 0, width: 18, height: 18, padding: 5, style: { color: "#666666", fontSize: "1em", fontWeight: "bold" }, theme: { fill: "#ffffff", stroke: "#e6e6e6", "stroke-width": 1, "text-align": "center" } }, buttons: { zoomIn: { onclick: function () { this.mapZoom(.5) }, text: "+", y: 0 }, zoomOut: { onclick: function () { this.mapZoom(2) }, text: "-", y: 28 } }, mouseWheelSensitivity: 1.1 }; x(a.defaultOptions.lang, { zoomIn: "Zoom in", zoomOut: "Zoom out" }); return a.defaultOptions.mapNavigation =
                                        r
                                }); K(a, "Maps/MapNavigation.js", [a["Core/Chart/Chart.js"], a["Core/Globals.js"], a["Core/Utilities.js"]], function (a, x, G) {
                                    function r(a) { a && (a.preventDefault && a.preventDefault(), a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0) } function y(a) { this.navButtons = []; this.init(a) } const { doc: A } = x, { addEvent: F, extend: D, isNumber: t, merge: q, objectEach: k, pick: p } = G; y.prototype.init = function (a) { this.chart = a }; y.prototype.update = function (a) {
                                        let h = this, f = this.chart, c = f.options.mapNavigation, g, n = function (a) {
                                            this.handler.call(f,
                                                a); r(a)
                                        }, t = h.navButtons; a && (c = f.options.mapNavigation = q(f.options.mapNavigation, a)); for (; t.length;)t.pop().destroy(); p(c.enableButtons, c.enabled) && !f.renderer.forExport && (h.navButtonsGroup || (h.navButtonsGroup = f.renderer.g().attr({ zIndex: 4 }).add()), k(c.buttons, function (a, e) {
                                            var k; a = q(c.buttonOptions, a); !f.styledMode && a.theme && (g = a.theme, g.style = q(a.theme.style, a.style)); const { text: p, width: B = 0, height: u = 0, padding: b = 0 } = a, d = f.renderer.button("+" !== p && "-" !== p && p || "", 0, 0, n, g, void 0, void 0, void 0, "zoomIn" ===
                                                e ? "topbutton" : "bottombutton").addClass("highcharts-map-navigation highcharts-" + { zoomIn: "zoom-in", zoomOut: "zoom-out" }[e]).attr({ width: B, height: u, title: f.options.lang[e], padding: a.padding, zIndex: 5 }).add(h.navButtonsGroup); if ("+" === p || "-" === p) { e = B + 1; const c = [["M", b + 3, b + u / 2], ["L", b + e - 3, b + u / 2]]; "+" === p && c.push(["M", b + e / 2, b + 3], ["L", b + e / 2, b + u - 3]); f.renderer.path(c).addClass("highcharts-button-symbol").attr(f.styledMode ? {} : { stroke: null === (k = a.style) || void 0 === k ? void 0 : k.color, "stroke-width": 3, "stroke-linecap": "round" }).add(d) } d.handler =
                                                    a.onclick; F(d.element, "dblclick", r); t.push(d); D(a, { width: d.width, height: 2 * d.height }); if (f.hasLoaded) d.align(a, !1, a.alignTo); else { const b = F(f, "load", () => { d.element && d.align(a, !1, a.alignTo); b() }) }
                                        }), a = function () {
                                            var a = f.exportingGroup && f.exportingGroup.getBBox(); if (a) {
                                                const e = h.navButtonsGroup.getBBox(); if (!(e.x >= a.x + a.width || e.x + e.width <= a.x || e.y >= a.y + a.height || e.y + e.height <= a.y)) {
                                                    const f = -e.y - e.height + a.y - 5; a = a.y + a.height - e.y + 5; h.navButtonsGroup.attr({
                                                        translateY: "bottom" === (c.buttonOptions && c.buttonOptions.verticalAlign) ?
                                                            f : a
                                                    })
                                                }
                                            }
                                        }, f.hasLoaded || F(f, "render", a)); this.updateEvents(c)
                                    }; y.prototype.updateEvents = function (a) {
                                        const h = this.chart; p(a.enableDoubleClickZoom, a.enabled) || a.enableDoubleClickZoomTo ? this.unbindDblClick = this.unbindDblClick || F(h.container, "dblclick", function (a) { h.pointer.onContainerDblClick(a) }) : this.unbindDblClick && (this.unbindDblClick = this.unbindDblClick()); p(a.enableMouseWheelZoom, a.enabled) ? this.unbindMouseWheel = this.unbindMouseWheel || F(h.container, void 0 !== A.onwheel ? "wheel" : void 0 !== A.onmousewheel ?
                                            "mousewheel" : "DOMMouseScroll", function (a) { h.pointer.inClass(a.target, "highcharts-no-mousewheel") || (h.pointer.onContainerMouseWheel(a), r(a)); return !1 }) : this.unbindMouseWheel && (this.unbindMouseWheel = this.unbindMouseWheel())
                                    }; D(a.prototype, {
                                        fitToBox: function (a, h) { [["x", "width"], ["y", "height"]].forEach(function (f) { const c = f[0]; f = f[1]; a[c] + a[f] > h[c] + h[f] && (a[f] > h[f] ? (a[f] = h[f], a[c] = h[c]) : a[c] = h[c] + h[f] - a[f]); a[f] > h[f] && (a[f] = h[f]); a[c] < h[c] && (a[c] = h[c]) }); return a }, mapZoom: function (a, h, f, c, g) {
                                            this.mapView &&
                                            (t(a) && (a = Math.log(a) / Math.log(.5)), this.mapView.zoomBy(a, t(h) && t(f) ? this.mapView.projection.inverse([h, f]) : void 0, t(c) && t(g) ? [c, g] : void 0))
                                        }
                                    }); F(a, "beforeRender", function () { this.mapNavigation = new y(this); this.mapNavigation.update() }); x.MapNavigation = y
                                }); K(a, "Maps/MapPointer.js", [a["Core/Pointer.js"], a["Core/Utilities.js"]], function (a, x) {
                                    const { defined: r, extend: I, pick: y, wrap: A } = x, F = a.prototype.normalize; let D = 0, t; I(a.prototype, {
                                        normalize: function (a, k) {
                                            const q = this.chart; a = F.call(this, a, k); q && q.mapView &&
                                                (k = q.mapView.pixelsToLonLat({ x: a.chartX - q.plotLeft, y: a.chartY - q.plotTop })) && I(a, k); return a
                                        }, onContainerDblClick: function (a) { const k = this.chart; a = this.normalize(a); k.options.mapNavigation.enableDoubleClickZoomTo ? k.pointer.inClass(a.target, "highcharts-tracker") && k.hoverPoint && k.hoverPoint.zoomTo() : k.isInsidePlot(a.chartX - k.plotLeft, a.chartY - k.plotTop) && k.mapZoom(.5, void 0, void 0, a.chartX, a.chartY) }, onContainerMouseWheel: function (a) {
                                            const k = this.chart; a = this.normalize(a); const p = r(a.wheelDelta) && -a.wheelDelta /
                                                120 || a.deltaY || a.detail; 1 <= Math.abs(p) && (D += Math.abs(p), t && clearTimeout(t), t = setTimeout(() => { D = 0 }, 50)); 10 > D && k.isInsidePlot(a.chartX - k.plotLeft, a.chartY - k.plotTop) && k.mapView && k.mapView.zoomBy((k.options.mapNavigation.mouseWheelSensitivity - 1) * -p, void 0, [a.chartX, a.chartY], 1 > Math.abs(p) ? !1 : void 0)
                                        }
                                    }); A(a.prototype, "zoomOption", function (a) { const k = this.chart.options.mapNavigation; y(k.enableTouchZoom, k.enabled) && (this.chart.zooming.pinchType = "xy"); a.apply(this, [].slice.call(arguments, 1)) }); A(a.prototype,
                                        "pinchTranslate", function (a, k, p, n, h, f, c) { a.call(this, k, p, n, h, f, c); "map" === this.chart.options.chart.type && this.hasZoom && (a = n.scaleX > n.scaleY, this.pinchTranslateDirection(!a, k, p, n, h, f, c, a ? n.scaleX : n.scaleY)) })
                                }); K(a, "Series/ColorMapComposition.js", [a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]], function (a, x) {
                                    const { column: { prototype: r } } = a.seriesTypes, { addEvent: I, defined: y } = x; var A; (function (a) {
                                        function A(a) {
                                            this.moveToTopOnHover && this.graphic && this.graphic.attr({
                                                zIndex: a && "hover" === a.state ?
                                                    1 : 0
                                            })
                                        } const t = []; a.pointMembers = { dataLabelOnNull: !0, moveToTopOnHover: !0, isValid: function () { return null !== this.value && Infinity !== this.value && -Infinity !== this.value && (void 0 === this.value || !isNaN(this.value)) } }; a.seriesMembers = {
                                            colorKey: "value", axisTypes: ["xAxis", "yAxis", "colorAxis"], parallelArrays: ["x", "y", "value"], pointArrayMap: ["value"], trackerGroups: ["group", "markerGroup", "dataLabelsGroup"], colorAttribs: function (a) {
                                                const k = {}; !y(a.color) || a.state && "normal" !== a.state || (k[this.colorProp || "fill"] = a.color);
                                                return k
                                            }, pointAttribs: r.pointAttribs
                                        }; a.compose = function (a) { const k = a.prototype.pointClass; x.pushUnique(t, k) && I(k, "afterSetState", A); return a }
                                    })(A || (A = {})); return A
                                }); K(a, "Maps/MapSymbols.js", [a["Core/Renderer/SVG/SVGRenderer.js"]], function (a) {
                                    const { prototype: { symbols: r } } = a; r.bottombutton = function (a, x, y, A, F) { if (F) { const a = (null === F || void 0 === F ? void 0 : F.r) || 0; F.brBoxY = x - a; F.brBoxHeight = A + a } return r.roundedRect(a, x, y, A, F) }; r.topbutton = function (a, x, y, A, F) {
                                        F && (F.brBoxHeight = A + ((null === F || void 0 === F ?
                                            void 0 : F.r) || 0)); return r.roundedRect(a, x, y, A, F)
                                    }; return r
                                }); K(a, "Core/Chart/MapChart.js", [a["Core/Chart/Chart.js"], a["Core/Defaults.js"], a["Core/Renderer/SVG/SVGRenderer.js"], a["Core/Utilities.js"]], function (a, x, G, I) {
                                    const { getOptions: r } = x, { merge: A, pick: F } = I; class D extends a {
                                        init(a, q) {
                                            const k = r().credits; a = A({
                                                chart: { panning: { enabled: !0, type: "xy" }, type: "map" }, credits: { mapText: F(k.mapText, ' \u00a9 <a href="{geojson.copyrightUrl}">{geojson.copyrightShort}</a>'), mapTextFull: F(k.mapTextFull, "{geojson.copyright}") },
                                                mapView: {}, tooltip: { followTouchMove: !1 }
                                            }, a); super.init(a, q)
                                        }
                                    } (function (a) { a.maps = {}; a.mapChart = function (q, k, p) { return new a(q, k, p) }; a.splitPath = function (a) { "string" === typeof a && (a = a.replace(/([A-Za-z])/g, " $1 ").replace(/^\s*/, "").replace(/\s*$/, ""), a = a.split(/[ ,;]+/).map(a => /[A-za-z]/.test(a) ? a : parseFloat(a))); return G.prototype.pathToSegments(a) } })(D || (D = {})); return D
                                }); K(a, "Maps/MapUtilities.js", [], function () {
                                    return {
                                        boundsFromPath: function (a) {
                                            let r = -Number.MAX_VALUE, G = Number.MAX_VALUE, I = -Number.MAX_VALUE,
                                            y = Number.MAX_VALUE, A; a.forEach(a => { const x = a[a.length - 2]; a = a[a.length - 1]; "number" === typeof x && "number" === typeof a && (G = Math.min(G, x), r = Math.max(r, x), y = Math.min(y, a), I = Math.max(I, a), A = !0) }); if (A) return { x1: G, y1: y, x2: r, y2: I }
                                        }, pointInPolygon: function (a, x) { let r, I, y, A = !1, F = a.x, D = a.y; a = 0; for (r = x.length - 1; a < x.length; r = a++)I = x[a][1] > D, y = x[r][1] > D, I !== y && F < (x[r][0] - x[a][0]) * (D - x[a][1]) / (x[r][1] - x[a][1]) + x[a][0] && (A = !A); return A }
                                    }
                                }); K(a, "Series/Map/MapPoint.js", [a["Series/ColorMapComposition.js"], a["Maps/MapUtilities.js"],
                                a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]], function (a, x, G, I) {
                                    const { boundsFromPath: r } = x; ({ seriesTypes: { scatter: x } } = G); const { extend: A, isNumber: F, pick: D } = I; class t extends x.prototype.pointClass {
                                        constructor() { super(...arguments); this.series = this.path = this.options = void 0 } static getProjectedPath(a, k) { a.projectedPath || (k && a.geometry ? (k.hasCoordinates = !0, a.projectedPath = k.path(a.geometry)) : a.projectedPath = a.path); return a.projectedPath || [] } applyOptions(a, k) {
                                            const p = this.series; a = super.applyOptions.call(this,
                                                a, k); k = p.joinBy; p.mapData && p.mapMap && (k = super.getNestedProperty.call(a, k[1]), (k = "undefined" !== typeof k && p.mapMap[k]) ? A(a, k) : -1 !== p.pointArrayMap.indexOf("value") && (a.value = a.value || null)); return a
                                        } getProjectedBounds(a) {
                                            var k = t.getProjectedPath(this, a); k = r(k); var p = this.properties; const n = this.series.chart.mapView; if (k) {
                                                const h = p && p["hc-middle-lon"], f = p && p["hc-middle-lat"]; n && F(h) && F(f) ? (a = a.forward([h, f]), k.midX = a[0], k.midY = a[1]) : (a = p && p["hc-middle-x"], p = p && p["hc-middle-y"], k.midX = k.x1 + (k.x2 - k.x1) *
                                                    D(this.middleX, F(a) ? a : .5), a = D(this.middleY, F(p) ? p : .5), this.geometry || (a = 1 - a), k.midY = k.y2 - (k.y2 - k.y1) * a); return k
                                            }
                                        } onMouseOver(a) { I.clearTimeout(this.colorInterval); if (!this.isNull && this.visible || this.series.options.nullInteraction) super.onMouseOver.call(this, a); else this.series.onMouseOut(a) } setVisible(a) { const k = a ? "show" : "hide"; this.visible = this.options.visible = !!a; if (this.dataLabel) this.dataLabel[k](); this.graphic && this.graphic.attr(this.series.pointAttribs(this)) } zoomTo(a) {
                                            const k = this.series.chart,
                                            p = k.mapView; var n = this.bounds; if (p && n) { const f = F(this.insetIndex) && p.insets[this.insetIndex]; if (f) { var h = f.projectedUnitsToPixels({ x: n.x1, y: n.y1 }); n = f.projectedUnitsToPixels({ x: n.x2, y: n.y2 }); h = p.pixelsToProjectedUnits({ x: h.x, y: h.y }); n = p.pixelsToProjectedUnits({ x: n.x, y: n.y }); n = { x1: h.x, y1: h.y, x2: n.x, y2: n.y } } p.fitToBounds(n, void 0, !1); this.series.isDirty = !0; k.redraw(a) }
                                        }
                                    } A(t.prototype, { dataLabelOnNull: a.pointMembers.dataLabelOnNull, moveToTopOnHover: a.pointMembers.moveToTopOnHover, isValid: a.pointMembers.isValid });
                                    return t
                                }); K(a, "Maps/MapViewOptionsDefault.js", [], function () { return { center: [0, 0], fitToGeometry: void 0, maxZoom: void 0, padding: 0, projection: { name: void 0, parallels: void 0, rotation: void 0 }, zoom: void 0 } }); K(a, "Maps/MapViewInsetsOptionsDefault.js", [], function () { return { borderColor: "#cccccc", borderWidth: 1, center: [0, 0], padding: "10%", relativeTo: "mapBoundingBox", units: "percent" } }); K(a, "Extensions/GeoJSON.js", [a["Core/Chart/Chart.js"], a["Core/Templating.js"], a["Core/Globals.js"], a["Core/Utilities.js"]], function (a,
                                    x, G, I) {
                                        function r(a, h) {
                                            h || (h = Object.keys(a.objects)[0]); h = a.objects[h]; if (h["hc-decoded-geojson"]) return h["hc-decoded-geojson"]; let f = a.arcs; if (a.transform) { const { scale: c, translate: g } = a.transform; f = a.arcs.map(a => { let e = 0, f = 0; return a.map(a => { a = a.slice(); a[0] = (e += a[0]) * c[0] + g[0]; a[1] = (f += a[1]) * c[1] + g[1]; return a }) }) } const c = a => "number" === typeof a[0] ? a.reduce((a, c, e) => { let g = 0 > c ? f[~c] : f[c]; 0 > c ? (g = g.slice(0, 0 === e ? g.length : g.length - 1), g.reverse()) : e && (g = g.slice(1)); return a.concat(g) }, []) : a.map(c),
                                                g = h.geometries.map(a => ({ type: "Feature", properties: a.properties, geometry: { type: a.type, coordinates: a.coordinates || c(a.arcs) } })); a = { type: "FeatureCollection", copyright: a.copyright, copyrightShort: a.copyrightShort, copyrightUrl: a.copyrightUrl, features: g, "hc-recommended-mapview": h["hc-recommended-mapview"], bbox: a.bbox, title: a.title }; return h["hc-decoded-geojson"] = a
                                        } function A(a, h = "map", f) {
                                            const c = []; a = "Topology" === a.type ? r(a) : a; a.features.forEach(function (a) {
                                                var f = a.geometry || {}, g = f.type; f = f.coordinates;
                                                a = a.properties; let k; "map" !== h && "mapbubble" !== h || "Polygon" !== g && "MultiPolygon" !== g ? "mapline" !== h || "LineString" !== g && "MultiLineString" !== g ? "mappoint" === h && "Point" === g && f.length && (k = { geometry: { coordinates: f, type: g } }) : f.length && (k = { geometry: { coordinates: f, type: g } }) : f.length && (k = { geometry: { coordinates: f, type: g } }); if (k) { g = a && (a.name || a.NAME); f = a && a.lon; const e = a && a.lat; c.push(q(k, { lat: "number" === typeof e ? e : void 0, lon: "number" === typeof f ? f : void 0, name: "string" === typeof g ? g : void 0, properties: a })) }
                                            }); f &&
                                                a.copyrightShort && (f.chart.mapCredits = F(f.chart.options.credits.mapText, { geojson: a }), f.chart.mapCreditsFull = F(f.chart.options.credits.mapTextFull, { geojson: a })); return c
                                        } const { format: F } = x, { win: D } = G, { error: t, extend: q, merge: k, wrap: p } = I; ""; a.prototype.transformFromLatLon = function (a, h) {
                                            var f = this.options.chart.proj4 || D.proj4; if (f) {
                                                var { jsonmarginX: c = 0, jsonmarginY: g = 0, jsonres: k = 1, scale: n = 1, xoffset: p = 0, xpan: e = 0, yoffset: l = 0, ypan: q = 0 } = h; a = f(h.crs, [a.lon, a.lat]); f = h.cosAngle || h.rotation && Math.cos(h.rotation);
                                                var r = h.sinAngle || h.rotation && Math.sin(h.rotation); h = h.rotation ? [a[0] * f + a[1] * r, -a[0] * r + a[1] * f] : a; return { x: ((h[0] - p) * n + e) * k + c, y: -(((l - h[1]) * n + q) * k - g) }
                                            } t(21, !1, this)
                                        }; a.prototype.transformToLatLon = function (a, h) {
                                            const f = this.options.chart.proj4 || D.proj4; if (!f) t(21, !1, this); else if (null !== a.y) {
                                                var { jsonmarginX: c = 0, jsonmarginY: g = 0, jsonres: k = 1, scale: n = 1, xoffset: p = 0, xpan: e = 0, yoffset: l = 0, ypan: q = 0 } = h; a = { x: ((a.x - c) / k - e) / n + p, y: ((a.y - g) / k + q) / n + l }; var r = h.cosAngle || h.rotation && Math.cos(h.rotation), u = h.sinAngle ||
                                                    h.rotation && Math.sin(h.rotation); h = f(h.crs, "WGS84", h.rotation ? { x: a.x * r + a.y * -u, y: a.x * u + a.y * r } : a); return { lat: h.y, lon: h.x }
                                            }
                                        }; a.prototype.fromPointToLatLon = function (a) { return this.mapView && this.mapView.projectedUnitsToLonLat(a) }; a.prototype.fromLatLonToPoint = function (a) { return this.mapView && this.mapView.lonLatToProjectedUnits(a) }; p(a.prototype, "addCredits", function (a, h) { h = k(!0, this.options.credits, h); this.mapCredits && (h.href = null); a.call(this, h); this.credits && this.mapCreditsFull && this.credits.attr({ title: this.mapCreditsFull }) });
                                    G.geojson = A; G.topo2geo = r; return { geojson: A, topo2geo: r }
                                }); K(a, "Core/Geometry/PolygonClip.js", [], function () {
                                    const a = (a, r, x) => (r[0] - a[0]) * (x[1] - a[1]) > (r[1] - a[1]) * (x[0] - a[0]), x = (a, r, x, F) => { var y = [a[0] - r[0], a[1] - r[1]]; const t = [x[0] - F[0], x[1] - F[1]]; a = a[0] * r[1] - a[1] * r[0]; x = x[0] * F[1] - x[1] * F[0]; F = 1 / (y[0] * t[1] - y[1] * t[0]); y = [(a * t[0] - x * y[0]) * F, (a * t[1] - x * y[1]) * F]; y.isIntersection = !0; return y }; var G; (function (r) {
                                        r.clipLineString = (a, x) => {
                                            const y = []; a = r.clipPolygon(a, x, !1); for (x = 1; x < a.length; x++)a[x].isIntersection &&
                                                a[x - 1].isIntersection && (y.push(a.splice(0, x)), x = 0), x === a.length - 1 && y.push(a); return y
                                        }; r.clipPolygon = (r, A, G = !0) => { let y = A[A.length - 1], t, q, k = r; for (let p = 0; p < A.length; p++) { const n = k; r = A[p]; k = []; t = G ? n[n.length - 1] : n[0]; for (let h = 0; h < n.length; h++)q = n[h], a(y, r, q) ? (a(y, r, t) || k.push(x(y, r, t, q)), k.push(q)) : a(y, r, t) && k.push(x(y, r, t, q)), t = q; y = r } return k }
                                    })(G || (G = {})); return G
                                }); K(a, "Maps/Projections/LambertConformalConic.js", [], function () {
                                    const a = Math.sign || (a => 0 === a ? 0 : 0 < a ? 1 : -1), x = Math.PI / 180, G = Math.PI / 2; class I {
                                        constructor(r) {
                                            var y,
                                            F = (r.parallels || []).map(a => a * x); const D = F[0] || 0; F = null !== (y = F[1]) && void 0 !== y ? y : D; y = Math.cos(D); "object" === typeof r.projectedBounds && (this.projectedBounds = r.projectedBounds); r = D === F ? Math.sin(D) : Math.log(y / Math.cos(F)) / Math.log(Math.tan((G + F) / 2) / Math.tan((G + D) / 2)); 1e-10 > Math.abs(r) && (r = 1e-10 * (a(r) || 1)); this.n = r; this.c = y * Math.pow(Math.tan((G + D) / 2), r) / r
                                        } forward(a) {
                                            var r = a[0] * x; const { c: y, n: D, projectedBounds: t } = this; a = a[1] * x; 0 < y ? a < -G + .000001 && (a = -G + .000001) : a > G - .000001 && (a = G - .000001); var q = y / Math.pow(Math.tan((G +
                                                a) / 2), D); a = q * Math.sin(D * r) * 63.78137; r = 63.78137 * (y - q * Math.cos(D * r)); q = [a, r]; t && (a < t.x1 || a > t.x2 || r < t.y1 || r > t.y2) && (q.outside = !0); return q
                                        } inverse(r) { const y = r[0] / 63.78137; r = r[1] / 63.78137; const { c: F, n: D } = this; r = F - r; const t = a(D) * Math.sqrt(y * y + r * r); let q = Math.atan2(y, Math.abs(r)) * a(r); 0 > r * D && (q -= Math.PI * a(y) * a(r)); return [q / D / x, (2 * Math.atan(Math.pow(F / t, 1 / D)) - G) / x] }
                                    } return I
                                }); K(a, "Maps/Projections/EqualEarth.js", [], function () {
                                    const a = Math.sqrt(3) / 2; class x {
                                        constructor() {
                                            this.bounds = {
                                                x1: -200.37508342789243,
                                                x2: 200.37508342789243, y1: -97.52595454902263, y2: 97.52595454902263
                                            }
                                        } forward(r) { const x = Math.PI / 180, y = Math.asin(a * Math.sin(r[1] * x)), A = y * y, G = A * A * A; return [r[0] * x * Math.cos(y) * 74.03120656864502 / (a * (1.340264 + 3 * -.081106 * A + G * (7 * .000893 + .034164 * A))), 74.03120656864502 * y * (1.340264 + -.081106 * A + G * (.000893 + .003796 * A))] } inverse(r) {
                                            const x = r[0] / 74.03120656864502; r = r[1] / 74.03120656864502; const y = 180 / Math.PI; let A = r; let G; let D; for (D = 0; 12 > D; ++D) {
                                                var t = A * A; G = t * t * t; var q = A * (1.340264 + -.081106 * t + G * (.000893 + .003796 * t)) - r;
                                                t = 1.340264 + 3 * -.081106 * t + G * (7 * .000893 + .034164 * t); A -= q /= t; if (1e-9 > Math.abs(q)) break
                                            } t = A * A; return [y * a * x * (1.340264 + 3 * -.081106 * t + t * t * t * (7 * .000893 + .034164 * t)) / Math.cos(A), y * Math.asin(Math.sin(A) / a)]
                                        }
                                    } return x
                                }); K(a, "Maps/Projections/Miller.js", [], function () {
                                    const a = Math.PI / 4, x = Math.PI / 180; class G {
                                        constructor() { this.bounds = { x1: -200.37508342789243, x2: 200.37508342789243, y1: -146.91480769173063, y2: 146.91480769173063 } } forward(r) { return [r[0] * x * 63.78137, 79.7267125 * Math.log(Math.tan(a + .4 * r[1] * x))] } inverse(r) {
                                            return [r[0] /
                                                63.78137 / x, 2.5 * (Math.atan(Math.exp(r[1] / 63.78137 * .8)) - a) / x]
                                        }
                                    } return G
                                }); K(a, "Maps/Projections/Orthographic.js", [], function () {
                                    const a = Math.PI / 180; class x {
                                        constructor() { this.antimeridianCutting = !1; this.bounds = { x1: -63.78460826781007, x2: 63.78460826781007, y1: -63.78460826781007, y2: 63.78460826781007 } } forward(r) { const x = r[0]; r = r[1] * a; r = [Math.cos(r) * Math.sin(x * a) * 63.78460826781007, 63.78460826781007 * Math.sin(r)]; if (-90 > x || 90 < x) r.outside = !0; return r } inverse(r) {
                                            const x = r[0] / 63.78460826781007; r = r[1] / 63.78460826781007;
                                            const y = Math.sqrt(x * x + r * r), A = Math.asin(y), G = Math.sin(A); return [Math.atan2(x * G, y * Math.cos(A)) / a, Math.asin(y && r * G / y) / a]
                                        }
                                    } return x
                                }); K(a, "Maps/Projections/WebMercator.js", [], function () {
                                    const a = Math.PI / 180; class x {
                                        constructor() { this.bounds = { x1: -200.37508342789243, x2: 200.37508342789243, y1: -200.3750834278071, y2: 200.3750834278071 }; this.maxLatitude = 85.0511287798 } forward(r) { var x = Math.sin(r[1] * a); x = [63.78137 * r[0] * a, 63.78137 * Math.log((1 + x) / (1 - x)) / 2]; 85.0511287798 < Math.abs(r[1]) && (x.outside = !0); return x } inverse(r) {
                                            return [r[0] /
                                                (63.78137 * a), (2 * Math.atan(Math.exp(r[1] / 63.78137)) - Math.PI / 2) / a]
                                        }
                                    } return x
                                }); K(a, "Maps/Projections/ProjectionRegistry.js", [a["Maps/Projections/LambertConformalConic.js"], a["Maps/Projections/EqualEarth.js"], a["Maps/Projections/Miller.js"], a["Maps/Projections/Orthographic.js"], a["Maps/Projections/WebMercator.js"]], function (a, x, G, I, y) { return { EqualEarth: x, LambertConformalConic: a, Miller: G, Orthographic: I, WebMercator: y } }); K(a, "Maps/Projection.js", [a["Core/Geometry/PolygonClip.js"], a["Maps/Projections/ProjectionRegistry.js"],
                                a["Core/Utilities.js"]], function (a, x, G) {
                                    const { clipLineString: r, clipPolygon: y } = a, { clamp: A, erase: F } = G, D = 2 * Math.PI / 360, t = a => { -180 > a && (a += 360); 180 < a && (a -= 360); return a }; class q {
                                        static add(a, p) { q.registry[a] = p } static greatCircle(a, p, n) {
                                            const { atan2: h, cos: f, sin: c, sqrt: g } = Math, k = a[1] * D, q = a[0] * D, r = p[1] * D, e = p[0] * D; var l = r - k, v = e - q; l = c(l / 2) * c(l / 2) + f(k) * f(r) * c(v / 2) * c(v / 2); l = 2 * h(g(l), g(1 - l)); var t = Math.round(6371E3 * l / 5E5); v = []; n && v.push(a); if (1 < t) for (a = 1 / t, t = a; .999 > t; t += a) {
                                                var u = c((1 - t) * l) / c(l); const a = c(t * l) /
                                                    c(l); var b = u * f(k) * f(q) + a * f(r) * f(e); const m = u * f(k) * c(q) + a * f(r) * c(e); u = u * c(k) + a * c(r); u = h(u, g(b * b + m * m)); b = h(m, b); v.push([b / D, u / D])
                                            } n && v.push(p); return v
                                        } static insertGreatCircles(a) { let k = a.length - 1; for (; k--;)if (10 < Math.max(Math.abs(a[k][0] - a[k + 1][0]), Math.abs(a[k][1] - a[k + 1][1]))) { const n = q.greatCircle(a[k], a[k + 1]); n.length && a.splice(k + 1, 0, ...n) } } static toString(a) { const { name: k, rotation: n } = a || {}; return [k, n && n.join(",")].join(";") } constructor(a = {}) {
                                            this.hasGeoProjection = this.hasCoordinates = !1; this.maxLatitude =
                                                90; this.options = a; const { name: k, projectedBounds: n, rotation: h } = a; this.rotator = h ? this.getRotator(h) : void 0; const f = k ? q.registry[k] : void 0; f && (this.def = new f(a)); const { def: c, rotator: g } = this; c && (this.maxLatitude = c.maxLatitude || 90, this.hasGeoProjection = !0); g && c ? (this.forward = a => c.forward(g.forward(a)), this.inverse = a => g.inverse(c.inverse(a))) : c ? (this.forward = a => c.forward(a), this.inverse = a => c.inverse(a)) : g && (this.forward = g.forward, this.inverse = g.inverse); this.bounds = "world" === n ? c && c.bounds : n
                                        } lineIntersectsBounds(a) {
                                            const { x1: k,
                                                x2: n, y1: h, y2: f } = this.bounds || {}, c = (a, c, e) => { const [f, g] = a; a = c ? 0 : 1; if ("number" === typeof e && f[c] >= e !== g[c] >= e) return a = f[a] + (e - f[c]) / (g[c] - f[c]) * (g[a] - f[a]), c ? [a, e] : [e, a] }; let g, q = a[0]; if (g = c(a, 0, k)) q = g, a[1] = g; else if (g = c(a, 0, n)) q = g, a[1] = g; if (g = c(a, 1, h)) q = g; else if (g = c(a, 1, f)) q = g; return q
                                        } getRotator(a) {
                                            const k = a[0] * D, n = (a[1] || 0) * D; a = (a[2] || 0) * D; const h = Math.cos(n), f = Math.sin(n), c = Math.cos(a), g = Math.sin(a); if (0 !== k || 0 !== n || 0 !== a) return {
                                                forward: a => {
                                                    var n = a[0] * D + k, p = a[1] * D, e = Math.cos(p); a = Math.cos(n) *
                                                        e; n = Math.sin(n) * e; p = Math.sin(p); e = p * h + a * f; return [Math.atan2(n * c - e * g, a * h - p * f) / D, Math.asin(e * c + n * g) / D]
                                                }, inverse: a => { var n = a[0] * D, p = a[1] * D, e = Math.cos(p); a = Math.cos(n) * e; n = Math.sin(n) * e; p = Math.sin(p); e = p * c - n * g; return [(Math.atan2(n * c + p * g, a * h + e * f) - k) / D, Math.asin(e * h - a * f) / D] }
                                            }
                                        } forward(a) { return a } inverse(a) { return a } cutOnAntimeridian(a, p) {
                                            const k = [], h = [a]; a.forEach((c, f) => {
                                                let e = a[f - 1]; if (!f) { if (!p) return; e = a[a.length - 1] } const g = e[0]; var h = c[0]; (-90 > g || 90 < g) && (-90 > h || 90 < h) && 0 < g !== 0 < h && (h = A((180 - (g + 360) %
                                                    360) / ((h + 360) % 360 - (g + 360) % 360), 0, 1), k.push({ i: f, lat: e[1] + h * (c[1] - e[1]), direction: 0 > g ? 1 : -1, previousLonLat: e, lonLat: c }))
                                            }); if (k.length) if (p) {
                                                if (1 === k.length % 2) { var f = k.slice().sort((a, c) => Math.abs(c.lat) - Math.abs(a.lat))[0]; F(k, f) } for (var c = k.length - 2; 0 <= c;) { var g = k[c].i, r = t(180 + .000001 * k[c].direction), x = t(180 - .000001 * k[c].direction); g = a.splice(g, k[c + 1].i - g, ...q.greatCircle([r, k[c].lat], [r, k[c + 1].lat], !0)); g.push(...q.greatCircle([x, k[c + 1].lat], [x, k[c].lat], !0)); h.push(g); c -= 2 } if (f) for (g = 0; g < h.length; g++) {
                                                    const { direction: a,
                                                        lat: k } = f; c = h[g]; x = c.indexOf(f.lonLat); if (-1 < x) { g = (0 > k ? -1 : 1) * this.maxLatitude; var y = t(180 + .000001 * a); r = t(180 - .000001 * a); const e = q.greatCircle([y, k], [y, g], !0); for (y += 120 * a; -180 < y && 180 > y; y += 120 * a)e.push([y, g]); e.push(...q.greatCircle([r, g], [r, f.lat], !0)); c.splice(x, 0, ...e); break }
                                                }
                                            } else for (f = k.length; f--;)c = a.splice(k[f].i, a.length, [t(180 + .000001 * k[f].direction), k[f].lat]), c.unshift([t(180 - .000001 * k[f].direction), k[f].lat]), h.push(c); return h
                                        } path(a) {
                                            const { bounds: k, def: n, rotator: h } = this, f = [], c = "Polygon" ===
                                                a.type || "MultiPolygon" === a.type, g = this.hasGeoProjection, t = !n || !1 !== n.antimeridianCutting, x = t ? h : void 0, A = t ? n || this : this; let e; k && (e = [[k.x1, k.y1], [k.x2, k.y1], [k.x2, k.y2], [k.x1, k.y2]]); const l = a => {
                                                    a = a.map(a => { if (t) { x && (a = x.forward(a)); let b = a[0]; .000001 > Math.abs(b - 180) && (b = 180 > b ? 179.999999 : 180.000001); a = [b, a[1]] } return a }); let h = [a]; g && (q.insertGreatCircles(a), t && (h = this.cutOnAntimeridian(a, c))); h.forEach(a => {
                                                        if (!(2 > a.length)) {
                                                            var b = !1, d = !1, h = a => {
                                                                b ? f.push(["L", a[0], a[1]]) : (f.push(["M", a[0], a[1]]), b =
                                                                    !0)
                                                            }, l = !1, n = !1, u = a.map(a => { a = A.forward(a); a.outside ? l = !0 : n = !0; Infinity === a[1] ? a[1] = 1E10 : -Infinity === a[1] && (a[1] = -1E10); return a }); if (t) { c && u.push(u[0]); if (l) { if (!n) return; if (e) if (c) u = y(u, e); else if (k) { r(u, e).forEach(a => { b = !1; a.forEach(h) }); return } } u.forEach(h) } else for (let e = 0; e < u.length; e++) { const f = a[e], k = u[e]; if (k.outside) d = !0; else { if (c && !p) { var p = f; a.push(f); u.push(k) } d && v && (c && g ? q.greatCircle(v, f).forEach(a => h(A.forward(a))) : b = !1); h(k); var v = f; d = !1 } }
                                                        }
                                                    })
                                                }; "LineString" === a.type ? l(a.coordinates) :
                                                    "MultiLineString" === a.type ? a.coordinates.forEach(a => l(a)) : "Polygon" === a.type ? (a.coordinates.forEach(a => l(a)), f.length && f.push(["Z"])) : "MultiPolygon" === a.type && (a.coordinates.forEach(a => { a.forEach(a => l(a)) }), f.length && f.push(["Z"])); return f
                                        }
                                    } q.registry = x; return q
                                }); K(a, "Maps/MapView.js", [a["Maps/MapViewOptionsDefault.js"], a["Maps/MapViewInsetsOptionsDefault.js"], a["Extensions/GeoJSON.js"], a["Core/Chart/MapChart.js"], a["Maps/MapUtilities.js"], a["Maps/Projection.js"], a["Core/Utilities.js"]], function (a,
                                    x, G, I, y, A, F) {
                                        const { topo2geo: r } = G, { maps: t } = I, { boundsFromPath: q, pointInPolygon: k } = y, { addEvent: p, clamp: n, fireEvent: h, isArray: f, isNumber: c, isObject: g, isString: B, merge: C, pick: E, relativeLength: e } = F, l = (a, b) => { const { width: c, height: e } = b; return Math.log(400.979322 / Math.max((a.x2 - a.x1) / (c / 256), (a.y2 - a.y1) / (e / 256))) / Math.log(2) }; class v {
                                            static mergeInsets(a, b) { const c = a => { const b = {}; a.forEach((a, c) => { b[a && a.id || `i${c}`] = a }); return b }, e = C(c(a), c(b)); return Object.keys(e).map(a => e[a]) } createInsets() {
                                                const a =
                                                    this.options, b = a.insets; b && b.forEach(b => { b = new z(this, C(a.insetOptions, b)); this.insets.push(b) })
                                            } constructor(e, b) {
                                                this.allowTransformAnimation = !0; this.insets = []; this.padding = [0, 0, 0, 0]; this.eventsToUnbind = []; let d, f; if (!(this instanceof z)) {
                                                    var g = [e.options.chart.map, ...(e.options.series || []).map(a => a.mapData)].map(a => this.getGeoMap(a)); const a = []; g.forEach(b => { if (b && (d || (d = b["hc-recommended-mapview"]), b.bbox)) { const [c, d, e, f] = b.bbox; a.push({ x1: c, y1: d, x2: e, y2: f }) } }); const b = a.length && v.compositeBounds(a);
                                                    h(e, "beforeMapViewInit", { geoBounds: b }, function () { if (b) { const { x1: a, y1: c, x2: d, y2: e } = b; f = 180 < d - a && 90 < e - c ? { name: "EqualEarth" } : { name: "LambertConformalConic", parallels: [c, e], rotation: [-(a + d) / 2] } } }); this.geoMap = g[0]
                                                } this.userOptions = b || {}; e.options.mapView && e.options.mapView.recommendedMapView && (d = e.options.mapView.recommendedMapView); g = C(a, { projection: f }, d, b); const k = d && d.insets; b = b && b.insets; k && b && (g.insets = v.mergeInsets(k, b)); this.chart = e; this.center = g.center; this.options = g; this.projection = new A(g.projection);
                                                this.playingField = e.plotBox; this.zoom = g.zoom || 0; this.minZoom = g.minZoom; this.createInsets(); this.eventsToUnbind.push(p(e, "afterSetChartSize", () => { this.playingField = this.getField(); if (void 0 === this.minZoom || this.minZoom === this.zoom) this.fitToBounds(void 0, void 0, !1), !this.chart.hasRendered && c(this.userOptions.zoom) && (this.zoom = this.userOptions.zoom), this.userOptions.center && C(!0, this.center, this.userOptions.center) })); this.setUpEvents()
                                            } fitToBounds(a, b, c = !0, g) {
                                                const d = a || this.getProjectedBounds(); if (d) {
                                                    var h =
                                                        E(b, a ? 0 : this.options.padding); b = this.getField(!1); h = f(h) ? h : [h, h, h, h]; this.padding = [e(h[0], b.height), e(h[1], b.width), e(h[2], b.height), e(h[3], b.width)]; this.playingField = this.getField(); b = l(d, this.playingField); a || (this.minZoom = b); a = this.projection.inverse([(d.x2 + d.x1) / 2, (d.y2 + d.y1) / 2]); this.setView(a, b, c, g)
                                                }
                                            } getField(a = !0) { a = a ? this.padding : [0, 0, 0, 0]; return { x: a[3], y: a[0], width: this.chart.plotWidth - a[1] - a[3], height: this.chart.plotHeight - a[0] - a[2] } } getGeoMap(a) {
                                                if (B(a)) return t[a] && "Topology" === t[a].type ?
                                                    r(t[a]) : t[a]; if (g(a, !0)) { if ("FeatureCollection" === a.type) return a; if ("Topology" === a.type) return r(a) }
                                            } getMapBBox() { const a = this.getProjectedBounds(), b = this.getScale(); if (a) { const c = this.padding, e = this.projectedUnitsToPixels({ x: a.x1, y: a.y2 }); return { width: (a.x2 - a.x1) * b + c[1] + c[3], height: (a.y2 - a.y1) * b + c[0] + c[2], x: e.x - c[3], y: e.y - c[0] } } } getProjectedBounds() {
                                                const a = this.projection; var b = this.chart.series.reduce((a, b) => {
                                                    const c = b.getProjectedBounds && b.getProjectedBounds(); c && !1 !== b.options.affectsMapView &&
                                                        a.push(c); return a
                                                }, []), c = this.options.fitToGeometry; return c ? (this.fitToGeometryCache || ("MultiPoint" === c.type ? (c = c.coordinates.map(b => a.forward(b)), b = c.map(a => a[0]), c = c.map(a => a[1]), this.fitToGeometryCache = { x1: Math.min.apply(0, b), x2: Math.max.apply(0, b), y1: Math.min.apply(0, c), y2: Math.max.apply(0, c) }) : this.fitToGeometryCache = q(a.path(c))), this.fitToGeometryCache) : this.projection.bounds || v.compositeBounds(b)
                                            } getScale() { return 256 / 400.979322 * Math.pow(2, this.zoom) } getSVGTransform() {
                                                const { x: a, y: b, width: c,
                                                    height: e } = this.playingField, f = this.projection.forward(this.center); var g = this.projection.hasCoordinates ? -1 : 1; const h = this.getScale(); g *= h; return { scaleX: h, scaleY: g, translateX: a + c / 2 - f[0] * h, translateY: b + e / 2 - f[1] * g }
                                            } lonLatToPixels(a) { if (a = this.lonLatToProjectedUnits(a)) return this.projectedUnitsToPixels(a) } lonLatToProjectedUnits(a) {
                                                const b = this.chart, c = b.mapTransforms; if (c) {
                                                    for (const d in c) if (Object.hasOwnProperty.call(c, d) && c[d].hitZone) { var e = b.transformFromLatLon(a, c[d]); if (e && k(e, c[d].hitZone.coordinates[0])) return e } return b.transformFromLatLon(a,
                                                        c["default"])
                                                } for (e of this.insets) if (e.options.geoBounds && k({ x: a.lon, y: a.lat }, e.options.geoBounds.coordinates[0])) return a = e.projection.forward([a.lon, a.lat]), a = e.projectedUnitsToPixels({ x: a[0], y: a[1] }), this.pixelsToProjectedUnits(a); a = this.projection.forward([a.lon, a.lat]); if (!a.outside) return { x: a[0], y: a[1] }
                                            } projectedUnitsToLonLat(a) {
                                                var b = this.chart; const c = b.mapTransforms; if (c) {
                                                    for (const d in c) if (Object.hasOwnProperty.call(c, d) && c[d].hitZone && k(a, c[d].hitZone.coordinates[0])) return b.transformToLatLon(a,
                                                        c[d]); return b.transformToLatLon(a, c["default"])
                                                } b = this.projectedUnitsToPixels(a); for (var e of this.insets) if (e.hitZone && k(b, e.hitZone.coordinates[0])) return a = e.pixelsToProjectedUnits(b), e = e.projection.inverse([a.x, a.y]), { lon: e[0], lat: e[1] }; e = this.projection.inverse([a.x, a.y]); return { lon: e[0], lat: e[1] }
                                            } redraw(a) { this.chart.series.forEach(a => { a.useMapGeometry && (a.isDirty = !0) }); this.chart.redraw(a) } setView(a, b, d = !0, e) {
                                                a && (this.center = a); "number" === typeof b && ("number" === typeof this.minZoom && (b = Math.max(b,
                                                    this.minZoom)), "number" === typeof this.options.maxZoom && (b = Math.min(b, this.options.maxZoom)), c(b) && (this.zoom = b)); var f = this.getProjectedBounds(); if (f) {
                                                        a = this.projection.forward(this.center); const { x: c, y: d, width: e, height: h } = this.playingField; b = this.getScale(); var g = this.projectedUnitsToPixels({ x: f.x1, y: f.y1 }), k = this.projectedUnitsToPixels({ x: f.x2, y: f.y2 }); f = [(f.x1 + f.x2) / 2, (f.y1 + f.y2) / 2]; if (!this.chart.series.some(a => a.isDrilling)) {
                                                            const l = g.x, m = k.y; k = k.x; g = g.y; k - l < e ? a[0] = f[0] : l < c && k < c + e ? a[0] += Math.max(l -
                                                                c, k - e - c) / b : k > c + e && l > c && (a[0] += Math.min(k - e - c, l - c) / b); g - m < h ? a[1] = f[1] : m < d && g < d + h ? a[1] -= Math.max(m - d, g - h - d) / b : g > d + h && m > d && (a[1] -= Math.min(g - h - d, m - d) / b); this.center = this.projection.inverse(a)
                                                        } this.insets.forEach(a => { a.options.field && (a.hitZone = a.getHitZone(), a.playingField = a.getField()) }); this.render()
                                                    } h(this, "afterSetView"); d && this.redraw(e)
                                            } projectedUnitsToPixels(a) {
                                                const b = this.getScale(), c = this.projection.forward(this.center), e = this.playingField; return {
                                                    x: e.x + e.width / 2 - b * (c[0] - a.x), y: e.y + e.height /
                                                        2 + b * (c[1] - a.y)
                                                }
                                            } pixelsToLonLat(a) { return this.projectedUnitsToLonLat(this.pixelsToProjectedUnits(a)) } pixelsToProjectedUnits(a) { const { x: b, y: c } = a; a = this.getScale(); const e = this.projection.forward(this.center), f = this.playingField; return { x: e[0] + (b - (f.x + f.width / 2)) / a, y: e[1] - (c - (f.y + f.height / 2)) / a } } setUpEvents() {
                                                const { chart: a } = this; let b, d, e; const f = f => {
                                                    var g = a.pointer.pinchDown, h = this.projection; let { mouseDownX: k, mouseDownY: m } = a; 1 === g.length && (k = g[0].chartX, m = g[0].chartY); if ("number" === typeof k && "number" ===
                                                        typeof m) {
                                                            g = `${k},${m}`; const { chartX: p, chartY: q } = f.originalEvent; g !== d && (d = g, b = this.projection.forward(this.center), e = (this.projection.options.rotation || [0, 0]).slice()); g = (g = h.def && h.def.bounds) && l(g, this.playingField) || -Infinity; if ("Orthographic" === h.options.name && (this.minZoom || Infinity) < 1.3 * g) {
                                                                if (g = 440 / (this.getScale() * Math.min(a.plotWidth, a.plotHeight)), e) {
                                                                    h = (k - p) * g - e[0]; g = n(-e[1] - (m - q) * g, -80, 80); const b = this.zoom; this.update({ projection: { rotation: [-h, -g] } }, !1); this.fitToBounds(void 0, void 0,
                                                                        !1); this.zoom = b; a.redraw(!1)
                                                                }
                                                            } else c(p) && c(q) && (h = this.getScale(), h = this.projection.inverse([b[0] + (k - p) / h, b[1] - (m - q) / h * (this.projection.hasCoordinates ? 1 : -1)]), this.setView(h, void 0, !0, !1)); f.preventDefault()
                                                    }
                                                }; p(a, "pan", f); p(a, "touchpan", f); p(a, "selection", b => {
                                                    if (b.resetSelection) this.zoomBy(); else {
                                                        const c = b.x - a.plotLeft, d = b.y - a.plotTop, { y: e, x: f } = this.pixelsToProjectedUnits({ x: c, y: d }), { y: g, x: h } = this.pixelsToProjectedUnits({ x: c + b.width, y: d + b.height }); this.fitToBounds({ x1: f, y1: e, x2: h, y2: g }, void 0, !0,
                                                            b.originalEvent.touches ? !1 : void 0); /^touch/.test(b.originalEvent.type) || a.showResetZoom(); b.preventDefault()
                                                    }
                                                })
                                            } render() { this.group || (this.group = this.chart.renderer.g("map-view").attr({ zIndex: 4 }).add()) } update(a, b = !0, d) {
                                                var e = a.projection; e = e && A.toString(e) !== A.toString(this.options.projection); let f = !1; C(!0, this.userOptions, a); C(!0, this.options, a); "insets" in a && (this.insets.forEach(a => a.destroy()), this.insets.length = 0, f = !0); (e || "fitToGeometry" in a) && delete this.fitToGeometryCache; if (e || f) this.chart.series.forEach(a => { const b = a.transformGroups; a.clearBounds && a.clearBounds(); a.isDirty = !0; a.isDirtyData = !0; if (f && b) for (; 1 < b.length;)(a = b.pop()) && a.destroy() }), e && (this.projection = new A(this.options.projection)), f && this.createInsets(), a.center || !Object.hasOwnProperty.call(a, "zoom") || c(a.zoom) || this.fitToBounds(void 0, void 0, !1); a.center || c(a.zoom) ? this.setView(this.options.center, a.zoom, !1) : "fitToGeometry" in a && this.fitToBounds(void 0, void 0, !1); b && this.chart.redraw(d)
                                            } zoomBy(a, b, c, e) {
                                                var d = this.chart; const f = this.projection.forward(this.center);
                                                let [g, h] = b ? this.projection.forward(b) : []; if ("number" === typeof a) { a = this.zoom + a; if (c) { const [a, e] = c; c = this.getScale(); b = e - d.plotTop - d.plotHeight / 2; g = f[0] + (a - d.plotLeft - d.plotWidth / 2) / c; h = f[1] + b / c } if ("number" === typeof g && "number" === typeof h) { d = 1 - Math.pow(2, this.zoom) / Math.pow(2, a); var k = f[1] - h; f[0] -= (f[0] - g) * d; f[1] += k * d; k = this.projection.inverse(f) } this.setView(k, a, void 0, e) } else this.fitToBounds(void 0, void 0, void 0, e)
                                            }
                                        } v.compositeBounds = a => {
                                            if (a.length) return a.slice(1).reduce((a, c) => {
                                                a.x1 = Math.min(a.x1,
                                                    c.x1); a.y1 = Math.min(a.y1, c.y1); a.x2 = Math.max(a.x2, c.x2); a.y2 = Math.max(a.y2, c.y2); return a
                                            }, C(a[0]))
                                        }; class z extends v {
                                            constructor(a, b) { super(a.chart, b); this.id = b.id; this.mapView = a; this.options = C(x, b); this.allBounds = []; this.options.geoBounds && (a = a.projection.path(this.options.geoBounds), this.geoBoundsProjectedBox = q(a), this.geoBoundsProjectedPolygon = a.map(a => [a[1] || 0, a[2] || 0])) } getField(a = !0) {
                                                var b = this.hitZone; if (b) {
                                                    var d = a ? this.padding : [0, 0, 0, 0]; b = b.coordinates[0]; var e = b.map(a => a[0]); const f = b.map(a =>
                                                        a[1]); b = Math.min.apply(0, e) + d[3]; e = Math.max.apply(0, e) - d[1]; const g = Math.min.apply(0, f) + d[0]; d = Math.max.apply(0, f) - d[2]; if (c(b) && c(g)) return { x: b, y: g, width: e - b, height: d - g }
                                                } return super.getField.call(this, a)
                                            } getHitZone() { const { chart: a, mapView: b, options: c } = this; var { coordinates: f } = c.field || {}; if (f) { f = f[0]; if ("percent" === c.units) { const d = "mapBoundingBox" === c.relativeTo && b.getMapBBox() || C(a.plotBox, { x: 0, y: 0 }); f = f.map(a => [e(`${a[0]}%`, d.width, d.x), e(`${a[1]}%`, d.height, d.y)]) } return { type: "Polygon", coordinates: [f] } } } getProjectedBounds() { return v.compositeBounds(this.allBounds) } isInside(a) {
                                                const { geoBoundsProjectedBox: b,
                                                    geoBoundsProjectedPolygon: c } = this; return !!(b && a.x >= b.x1 && a.x <= b.x2 && a.y >= b.y1 && a.y <= b.y2 && c && k(a, c))
                                            } render() {
                                                const { chart: a, mapView: b, options: c } = this; var f = c.borderPath || c.field; if (f && b.group) {
                                                    let d = !0; this.border || (this.border = a.renderer.path().addClass("highcharts-mapview-inset-border").add(b.group), d = !1); a.styledMode || this.border.attr({ stroke: c.borderColor, "stroke-width": c.borderWidth }); const g = Math.round(this.border.strokeWidth()) % 2 / 2, h = "mapBoundingBox" === c.relativeTo && b.getMapBBox() || b.playingField;
                                                    f = (f.coordinates || []).reduce((b, d) => d.reduce((b, d, f) => { let [k, l] = d; "percent" === c.units && (k = a.plotLeft + e(`${k}%`, h.width, h.x), l = a.plotTop + e(`${l}%`, h.height, h.y)); k = Math.floor(k) + g; l = Math.floor(l) + g; b.push(0 === f ? ["M", k, l] : ["L", k, l]); return b }, b), []); this.border[d ? "animate" : "attr"]({ d: f })
                                                }
                                            } destroy() { this.border && (this.border = this.border.destroy()); this.eventsToUnbind.forEach(a => a()) } setUpEvents() { }
                                    } p(I, "afterInit", function () { this.mapView = new v(this, this.options.mapView) }); return v
                                }); K(a, "Series/Map/MapSeries.js",
                                    [a["Core/Animation/AnimationUtilities.js"], a["Series/ColorMapComposition.js"], a["Series/CenteredUtilities.js"], a["Core/Globals.js"], a["Core/Chart/MapChart.js"], a["Series/Map/MapPoint.js"], a["Maps/MapView.js"], a["Core/Series/Series.js"], a["Core/Series/SeriesRegistry.js"], a["Core/Renderer/SVG/SVGRenderer.js"], a["Core/Utilities.js"]], function (a, x, G, I, y, A, F, D, t, q, k) {
                                        const { animObject: p, stop: n } = a; ({ noop: a } = I); const { splitPath: h } = y, { seriesTypes: { column: f, scatter: c } } = t, { extend: g, find: r, fireEvent: C, getNestedProperty: E,
                                            isArray: e, defined: l, isNumber: v, isObject: z, merge: u, objectEach: b, pick: d, splat: m } = k; class w extends c {
                                                constructor() { super(...arguments); this.points = this.options = this.joinBy = this.group = this.data = this.chart = void 0; this.processedData = [] } animate(a) { const { chart: b, group: c } = this, d = p(this.options.animation); a ? c.attr({ translateX: b.plotLeft + b.plotWidth / 2, translateY: b.plotTop + b.plotHeight / 2, scaleX: .001, scaleY: .001 }) : c.animate({ translateX: b.plotLeft, translateY: b.plotTop, scaleX: 1, scaleY: 1 }, d) } clearBounds() {
                                                    this.points.forEach(a => { delete a.bounds; delete a.insetIndex; delete a.projectedPath }); delete this.bounds
                                                } doFullTranslate() { return !(!this.isDirtyData && !this.chart.isResizing && this.hasRendered) } drawMapDataLabels() { D.prototype.drawDataLabels.call(this); this.dataLabelsGroup && this.dataLabelsGroup.clip(this.chart.clipRect) } drawPoints() {
                                                    const a = this, { chart: b, group: c, transformGroups: e = [] } = this, { mapView: g, renderer: h } = b; g && (this.transformGroups = e, e[0] || (e[0] = h.g().add(c)), g.insets.forEach((a, b) => { e[b + 1] || e.push(h.g().add(c)) }), this.doFullTranslate() &&
                                                        (this.points.forEach(a => { const { graphic: c, shapeArgs: d } = a; a.group = e["number" === typeof a.insetIndex ? a.insetIndex + 1 : 0]; c && c.parentGroup !== a.group && c.add(a.group); d && b.hasRendered && !b.styledMode && (d.fill = this.pointAttribs(a, a.state).fill) }), f.prototype.drawPoints.apply(this), this.points.forEach(c => {
                                                            const e = c.graphic; if (e) {
                                                                const f = e.animate; let g = ""; c.name && (g += "highcharts-name-" + c.name.replace(/ /g, "-").toLowerCase()); c.properties && c.properties["hc-key"] && (g += " highcharts-key-" + c.properties["hc-key"].toString().toLowerCase());
                                                                g && e.addClass(g); b.styledMode && e.css(this.pointAttribs(c, c.selected && "select" || void 0)); e.animate = function (c, g, h) { const k = v(c["stroke-width"]) && !v(e["stroke-width"]), l = v(e["stroke-width"]) && !v(c["stroke-width"]); if (k || l) { const f = d(a.getStrokeWidth(a.options), 1) / (b.mapView && b.mapView.getScale() || 1); k && (e["stroke-width"] = f); l && (c["stroke-width"] = f) } return f.call(e, c, g, l ? function () { e.element.removeAttribute("stroke-width"); delete e["stroke-width"]; h && h.apply(this, arguments) } : h) }
                                                            }
                                                        })), e.forEach((c, e) => {
                                                            const f = (0 === e ? g : g.insets[e - 1]).getSVGTransform(), k = d(this.getStrokeWidth(this.options), 1), l = f.scaleX, m = 0 < f.scaleY ? 1 : -1, q = b => { (a.points || []).forEach(a => { const c = a.graphic; let d; c && c["stroke-width"] && (d = this.getStrokeWidth(a.options)) && c.attr({ "stroke-width": d / b }) }) }; if (h.globalAnimation && b.hasRendered && g.allowTransformAnimation) {
                                                                const a = Number(c.attr("translateX")), b = Number(c.attr("translateY")), d = Number(c.attr("scaleX")), g = (e, g) => {
                                                                    e = d + (l - d) * g.pos; c.attr({
                                                                        translateX: a + (f.translateX - a) * g.pos, translateY: b +
                                                                            (f.translateY - b) * g.pos, scaleX: e, scaleY: e * m, "stroke-width": k / e
                                                                    }); q(e)
                                                                }; e = u(p(h.globalAnimation)); const n = e.step; e.step = function (a) { n && n.apply(this, arguments); g.apply(this, arguments) }; c.attr({ animator: 0 }).animate({ animator: 1 }, e, function () { "boolean" !== typeof h.globalAnimation && h.globalAnimation.complete && h.globalAnimation.complete({ applyDrilldown: !0 }) })
                                                            } else n(c), c.attr(u(f, { "stroke-width": k / l })), q(l)
                                                        }), this.isDrilling || this.drawMapDataLabels())
                                                } getProjectedBounds() {
                                                    if (!this.bounds && this.chart.mapView) {
                                                        const { insets: a,
                                                            projection: b } = this.chart.mapView, c = []; (this.points || []).forEach(function (f) {
                                                                if (f.path || f.geometry) {
                                                                    "string" === typeof f.path ? f.path = h(f.path) : e(f.path) && "M" === f.path[0] && (f.path = q.prototype.pathToSegments(f.path)); if (!f.bounds) {
                                                                        let c = f.getProjectedBounds(b); if (c) {
                                                                            f.labelrank = d(f.labelrank, (c.x2 - c.x1) * (c.y2 - c.y1)); const { midX: b, midY: e } = c; if (a && v(b) && v(e)) { const d = r(a, a => a.isInside({ x: b, y: e })); d && (delete f.projectedPath, (c = f.getProjectedBounds(d.projection)) && d.allBounds.push(c), f.insetIndex = a.indexOf(d)) } f.bounds =
                                                                                c
                                                                        }
                                                                    } f.bounds && void 0 === f.insetIndex && c.push(f.bounds)
                                                                }
                                                            }); this.bounds = F.compositeBounds(c)
                                                    } return this.bounds
                                                } getStrokeWidth(a) { const b = this.pointAttrToOptions; return a[b && b["stroke-width"] || "borderWidth"] } hasData() { return !!this.processedXData.length } pointAttribs(a, b) {
                                                    var c; const { mapView: d, styledMode: e } = a.series.chart, g = e ? this.colorAttribs(a) : f.prototype.pointAttribs.call(this, a, b); let h = this.getStrokeWidth(a.options); if (b) {
                                                        b = u(this.options.states[b], a.options.states && a.options.states[b] || {}); const d =
                                                            this.getStrokeWidth(b); l(d) && (h = d); g.stroke = null !== (c = b.borderColor) && void 0 !== c ? c : a.color
                                                    } h && d && (h /= d.getScale()); c = this.getStrokeWidth(this.options); g.dashstyle && d && v(c) && (h = c / d.getScale()); a.visible || (g.fill = this.options.nullColor); l(h) ? g["stroke-width"] = h : delete g["stroke-width"]; g["stroke-linecap"] = g["stroke-linejoin"] = this.options.linecap; return g
                                                } updateData() { return this.processedData ? !1 : super.updateData.apply(this, arguments) } setData(a, b = !0, c, d) {
                                                    delete this.bounds; super.setData.call(this, a,
                                                        !1, void 0, d); this.processData(); this.generatePoints(); b && this.chart.redraw(c)
                                                } processData() {
                                                    const a = this.options, c = a.data; var d = this.chart.options.chart; const f = this.joinBy, g = a.keys || this.pointArrayMap, h = [], k = {}; var l = this.chart.mapView; l = l && (z(a.mapData, !0) ? l.getGeoMap(a.mapData) : l.geoMap); var m = this.chart.mapTransforms; (this.chart.mapTransforms = m = d.mapTransforms || l && l["hc-transform"] || m) && b(m, function (a) { a.rotation && (a.cosAngle = Math.cos(a.rotation), a.sinAngle = Math.sin(a.rotation)) }); let n; e(a.mapData) ?
                                                        n = a.mapData : l && "FeatureCollection" === l.type && (this.mapTitle = l.title, n = I.geojson(l, this.type, this)); const p = this.processedData = []; c && c.forEach(function (b, d) { let h = 0; if (v(b)) p[d] = { value: b }; else if (e(b)) { p[d] = {}; !a.keys && b.length > g.length && "string" === typeof b[0] && (p[d]["hc-key"] = b[0], ++h); for (let a = 0; a < g.length; ++a, ++h)g[a] && "undefined" !== typeof b[h] && (0 < g[a].indexOf(".") ? A.prototype.setNestedProperty(p[d], b[h], g[a]) : p[d][g[a]] = b[h]) } else p[d] = c[d]; f && "_i" === f[0] && (p[d]._i = d) }); if (n) {
                                                            this.mapData = n;
                                                            this.mapMap = {}; for (m = 0; m < n.length; m++)d = n[m], l = d.properties, d._i = m, f[0] && l && l[f[0]] && (d[f[0]] = l[f[0]]), k[d[f[0]]] = d; this.mapMap = k; if (f[1]) { const a = f[1]; p.forEach(function (b) { b = E(a, b); k[b] && h.push(k[b]) }) } if (a.allAreas) { if (f[1]) { const a = f[1]; p.forEach(function (b) { h.push(E(a, b)) }) } const a = "|" + h.map(function (a) { return a && a[f[0]] }).join("|") + "|"; n.forEach(function (b) { f[0] && -1 !== a.indexOf("|" + b[f[0]] + "|") || p.push(u(b, { value: null })) }) }
                                                        } this.processedXData = Array(p.length)
                                                } setOptions(a) {
                                                    a = D.prototype.setOptions.call(this,
                                                        a); let b = a.joinBy; null === b && (b = "_i"); b = this.joinBy = m(b); b[1] || (b[1] = b[0]); return a
                                                } translate() {
                                                    const a = this.doFullTranslate(), b = this.chart.mapView, c = b && b.projection; !this.chart.hasRendered || !this.isDirtyData && this.hasRendered || (this.processData(), this.generatePoints(), delete this.bounds, !b || b.userOptions.center || v(b.userOptions.zoom) || b.zoom !== b.minZoom ? this.getProjectedBounds() : b.fitToBounds(void 0, void 0, !1)); if (b) {
                                                        const d = b.getSVGTransform(); this.points.forEach(function (e) {
                                                            const f = v(e.insetIndex) &&
                                                                b.insets[e.insetIndex].getSVGTransform() || d; f && e.bounds && v(e.bounds.midX) && v(e.bounds.midY) && (e.plotX = e.bounds.midX * f.scaleX + f.translateX, e.plotY = e.bounds.midY * f.scaleY + f.translateY); a && (e.shapeType = "path", e.shapeArgs = { d: A.getProjectedPath(e, c) }); e.projectedPath && !e.projectedPath.length ? e.setVisible(!1) : e.setVisible(!0)
                                                        })
                                                    } C(this, "afterTranslate")
                                                }
                                        } w.defaultOptions = u(c.defaultOptions, {
                                            affectsMapView: !0, animation: !1, dataLabels: {
                                                crop: !1, formatter: function () {
                                                    const { numberFormatter: a } = this.series.chart,
                                                    { value: b } = this.point; return v(b) ? a(b, -1) : ""
                                                }, inside: !0, overflow: !1, padding: 0, verticalAlign: "middle"
                                            }, linecap: "round", marker: null, nullColor: "#f7f7f7", stickyTracking: !1, tooltip: { followPointer: !0, pointFormat: "{point.name}: {point.value}<br/>" }, turboThreshold: 0, allAreas: !0, borderColor: "#e6e6e6", borderWidth: 1, joinBy: "hc-key", states: { hover: { halo: void 0, borderColor: "#666666", borderWidth: 2 }, normal: { animation: !0 }, select: { color: "#cccccc" } }, legendSymbol: "rectangle"
                                        }); g(w.prototype, {
                                            type: "map", axisTypes: x.seriesMembers.axisTypes,
                                            colorAttribs: x.seriesMembers.colorAttribs, colorKey: x.seriesMembers.colorKey, directTouch: !0, drawDataLabels: a, drawGraph: a, forceDL: !0, getCenter: G.getCenter, getExtremesFromAll: !0, getSymbol: a, isCartesian: !1, parallelArrays: x.seriesMembers.parallelArrays, pointArrayMap: x.seriesMembers.pointArrayMap, pointClass: A, preserveAspectRatio: !0, searchPoint: a, trackerGroups: x.seriesMembers.trackerGroups, useMapGeometry: !0
                                        }); x.compose(w); t.registerSeriesType("map", w); ""; return w
                                    }); K(a, "Series/MapLine/MapLineSeries.js",
                                        [a["Series/Map/MapSeries.js"], a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]], function (a, x, G) {
                                            const { extend: r, merge: y } = G; class A extends a { constructor() { super(...arguments); this.points = this.options = this.data = void 0 } pointAttribs(r, x) { r = a.prototype.pointAttribs.call(this, r, x); r.fill = this.options.fillColor; return r } } A.defaultOptions = y(a.defaultOptions, { lineWidth: 1, fillColor: "none", legendSymbol: "lineMarker" }); r(A.prototype, {
                                                type: "mapline", colorProp: "stroke", pointAttrToOptions: {
                                                    stroke: "color",
                                                    "stroke-width": "lineWidth"
                                                }
                                            }); x.registerSeriesType("mapline", A); ""; return A
                                        }); K(a, "Series/MapPoint/MapPointPoint.js", [a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]], function (a, x) { ({ seriesTypes: { scatter: a } } = a); const { isNumber: r } = x; class I extends a.prototype.pointClass { constructor() { super(...arguments); this.series = this.options = void 0 } isValid() { return !!(this.options.geometry || r(this.x) && r(this.y) || r(this.options.lon) && r(this.options.lat)) } } return I }); K(a, "Series/MapPoint/MapPointSeries.js",
                                            [a["Core/Globals.js"], a["Series/MapPoint/MapPointPoint.js"], a["Core/Series/SeriesRegistry.js"], a["Core/Renderer/SVG/SVGRenderer.js"], a["Core/Utilities.js"]], function (a, x, G, I, y) {
                                                ({ noop: a } = a); const { seriesTypes: { map: r, scatter: F } } = G, { extend: D, fireEvent: t, isNumber: q, merge: k } = y; class p extends F {
                                                    constructor() { super(...arguments); this.points = this.options = this.data = this.chart = void 0; this.clearBounds = r.prototype.clearBounds } drawDataLabels() { super.drawDataLabels(); this.dataLabelsGroup && this.dataLabelsGroup.clip(this.chart.clipRect) } projectPoint(a) {
                                                        const h =
                                                            this.chart.mapView; if (h) { const { geometry: f, lon: c, lat: g } = a; a = f && "Point" === f.type && f.coordinates; q(c) && q(g) && (a = [c, g]); if (a) return h.lonLatToProjectedUnits({ lon: a[0], lat: a[1] }) }
                                                    } translate() {
                                                        const a = this.chart.mapView; this.processedXData || this.processData(); this.generatePoints(); this.getProjectedBounds && this.isDirtyData && (delete this.bounds, this.getProjectedBounds()); if (a) {
                                                            const h = a.getSVGTransform(), { hasCoordinates: f } = a.projection; this.points.forEach(c => {
                                                                let { x: g, y: k } = c; var n = q(c.insetIndex) && a.insets[c.insetIndex].getSVGTransform() ||
                                                                    h; const p = this.projectPoint(c.options) || c.properties && this.projectPoint(c.properties); let e; p ? (g = p.x, k = p.y) : c.bounds && (g = c.bounds.midX, k = c.bounds.midY, n && q(g) && q(k) && (c.plotX = g * n.scaleX + n.translateX, c.plotY = k * n.scaleY + n.translateY, e = !0)); q(g) && q(k) ? e || (n = a.projectedUnitsToPixels({ x: g, y: k }), c.plotX = n.x, c.plotY = f ? n.y : this.chart.plotHeight - n.y) : c.y = c.plotX = c.plotY = void 0; c.isInside = this.isPointInside(c); c.zone = this.zones.length ? c.getZone() : void 0
                                                            })
                                                        } t(this, "afterTranslate")
                                                    }
                                                } p.defaultOptions = k(F.defaultOptions,
                                                    { dataLabels: { crop: !1, defer: !1, enabled: !0, formatter: function () { return this.point.name }, overflow: !1, style: { color: "#000000" } }, legendSymbol: "lineMarker" }); I.prototype.symbols.mapmarker = (a, h, f, c, g) => { const k = g && "legend" === g.context; k ? (a += f / 2, g = h + c) : g && "number" === typeof g.anchorX && "number" === typeof g.anchorY ? (a = g.anchorX, g = g.anchorY) : (a += f / 2, g = h + c / 2, h -= c); c = k ? c / 3 : c / 2; return [["M", a, g], ["C", a, g, a - c, h + 1.5 * c, a - c, h + c], ["A", c, c, 1, 1, 1, a + c, h + c], ["C", a + c, h + 1.5 * c, a, g, a, g], ["Z"]] }; D(p.prototype, {
                                                        type: "mappoint", axisTypes: ["colorAxis"],
                                                        forceDL: !0, isCartesian: !1, pointClass: x, searchPoint: a, useMapGeometry: !0
                                                    }); G.registerSeriesType("mappoint", p); ""; return p
                                            }); K(a, "Series/Bubble/BubbleLegendDefaults.js", [], function () {
                                                return {
                                                    borderColor: void 0, borderWidth: 2, className: void 0, color: void 0, connectorClassName: void 0, connectorColor: void 0, connectorDistance: 60, connectorWidth: 1, enabled: !1, labels: { className: void 0, allowOverlap: !1, format: "", formatter: void 0, align: "right", style: { fontSize: "0.9em", color: "#000000" }, x: 0, y: 0 }, maxSize: 60, minSize: 10,
                                                    legendIndex: 0, ranges: { value: void 0, borderColor: void 0, color: void 0, connectorColor: void 0 }, sizeBy: "area", sizeByAbsoluteValue: !1, zIndex: 1, zThreshold: 0
                                                }
                                            }); K(a, "Series/Bubble/BubbleLegendItem.js", [a["Core/Color/Color.js"], a["Core/Templating.js"], a["Core/Globals.js"], a["Core/Utilities.js"]], function (a, x, G, I) {
                                                const { parse: r } = a, { noop: A } = G, { arrayMax: F, arrayMin: D, isNumber: t, merge: q, pick: k, stableSort: p } = I; class n {
                                                    constructor(a, f) {
                                                        this.options = this.symbols = this.visible = this.selected = this.ranges = this.movementX =
                                                            this.maxLabel = this.legend = this.chart = void 0; this.setState = A; this.init(a, f)
                                                    } init(a, f) { this.options = a; this.visible = !0; this.chart = f.chart; this.legend = f } addToLegend(a) { a.splice(this.options.legendIndex, 0, this) } drawLegendSymbol(a) {
                                                        const f = k(a.options.itemDistance, 20), c = this.legendItem || {}, g = this.options; var h = g.ranges, n = g.connectorDistance; if (h && h.length && t(h[0].value)) {
                                                            p(h, function (a, c) { return c.value - a.value }); this.ranges = h; this.setOptions(); this.render(); a = this.getMaxLabelSize(); var q = this.ranges[0].radius;
                                                            h = 2 * q; n = n - q + a.width; n = 0 < n ? n : 0; this.maxLabel = a; this.movementX = "left" === g.labels.align ? n : 0; c.labelWidth = h + n + f; c.labelHeight = h + a.height / 2
                                                        } else a.options.bubbleLegend.autoRanges = !0
                                                    } setOptions() {
                                                        const a = this.ranges, f = this.options, c = this.chart.series[f.seriesIndex], g = this.legend.baseline, n = { zIndex: f.zIndex, "stroke-width": f.borderWidth }, p = { zIndex: f.zIndex, "stroke-width": f.connectorWidth }, t = { align: this.legend.options.rtl || "left" === f.labels.align ? "right" : "left", zIndex: f.zIndex }, e = c.options.marker.fillOpacity,
                                                        l = this.chart.styledMode; a.forEach(function (h, x) { l || (n.stroke = k(h.borderColor, f.borderColor, c.color), n.fill = k(h.color, f.color, 1 !== e ? r(c.color).setOpacity(e).get("rgba") : c.color), p.stroke = k(h.connectorColor, f.connectorColor, c.color)); a[x].radius = this.getRangeRadius(h.value); a[x] = q(a[x], { center: a[0].radius - a[x].radius + g }); l || q(!0, a[x], { bubbleAttribs: q(n), connectorAttribs: q(p), labelAttribs: t }) }, this)
                                                    } getRangeRadius(a) {
                                                        const f = this.options; return this.chart.series[this.options.seriesIndex].getRadius.call(this,
                                                            f.ranges[f.ranges.length - 1].value, f.ranges[0].value, f.minSize, f.maxSize, a)
                                                    } render() { const a = this.legendItem || {}, f = this.chart.renderer, c = this.options.zThreshold; this.symbols || (this.symbols = { connectors: [], bubbleItems: [], labels: [] }); a.symbol = f.g("bubble-legend"); a.label = f.g("bubble-legend-item").css(this.legend.itemStyle || {}); a.symbol.translateX = 0; a.symbol.translateY = 0; a.symbol.add(a.label); a.label.add(a.group); for (const a of this.ranges) a.value >= c && this.renderRange(a); this.hideOverlappingLabels() } renderRange(a) {
                                                        var f =
                                                            this.options; const c = f.labels; var g = this.chart; const h = g.series[f.seriesIndex], k = g.renderer, n = this.symbols; g = n.labels; const e = a.center, l = Math.abs(a.radius); var p = f.connectorDistance || 0; const q = c.align, r = f.connectorWidth, b = this.ranges[0].radius || 0, d = e - l - f.borderWidth / 2 + r / 2, m = k.styledMode; p = this.legend.options.rtl || "left" === q ? -p : p; "center" === q && (p = 0, f.connectorDistance = 0, a.labelAttribs.align = "center"); n.bubbleItems.push(k.circle(b, e + ((d % 1 ? 1 : .5) - (r % 2 ? 0 : .5)), l).attr(m ? {} : a.bubbleAttribs).addClass((m ?
                                                                "highcharts-color-" + h.colorIndex + " " : "") + "highcharts-bubble-legend-symbol " + (f.className || "")).add(this.legendItem.symbol)); n.connectors.push(k.path(k.crispLine([["M", b, d], ["L", b + p, d]], f.connectorWidth)).attr(m ? {} : a.connectorAttribs).addClass((m ? "highcharts-color-" + this.options.seriesIndex + " " : "") + "highcharts-bubble-legend-connectors " + (f.connectorClassName || "")).add(this.legendItem.symbol)); a = k.text(this.formatLabel(a)).attr(m ? {} : a.labelAttribs).css(m ? {} : c.style).addClass("highcharts-bubble-legend-labels " +
                                                                    (f.labels.className || "")).add(this.legendItem.symbol); f = { x: b + p + f.labels.x, y: d + f.labels.y + .4 * a.getBBox().height }; a.attr(f); g.push(a); a.placed = !0; a.alignAttr = f
                                                    } getMaxLabelSize() { let a, f; this.symbols.labels.forEach(function (c) { f = c.getBBox(!0); a = a ? f.width > a.width ? f : a : f }); return a || {} } formatLabel(a) { var f = this.options; const c = f.labels.formatter; f = f.labels.format; const { numberFormatter: g } = this.chart; return f ? x.format(f, a) : c ? c.call(a) : g(a.value, 1) } hideOverlappingLabels() {
                                                        const a = this.chart, f = this.symbols;
                                                        !this.options.labels.allowOverlap && f && (a.hideOverlappingLabels(f.labels), f.labels.forEach(function (a, g) { a.newOpacity ? a.newOpacity !== a.oldOpacity && f.connectors[g].show() : f.connectors[g].hide() }))
                                                    } getRanges() {
                                                        const a = this.legend.bubbleLegend, f = a.options.ranges; let c, g, n = Number.MAX_VALUE, p = -Number.MAX_VALUE; a.chart.series.forEach(function (a) {
                                                            a.isBubble && !a.ignoreSeries && (g = a.zData.filter(t), g.length && (n = k(a.options.zMin, Math.min(n, Math.max(D(g), !1 === a.options.displayNegative ? a.options.zThreshold : -Number.MAX_VALUE))),
                                                                p = k(a.options.zMax, Math.max(p, F(g)))))
                                                        }); c = n === p ? [{ value: p }] : [{ value: n }, { value: (n + p) / 2 }, { value: p, autoRanges: !0 }]; f.length && f[0].radius && c.reverse(); c.forEach(function (a, e) { f && f[e] && (c[e] = q(f[e], a)) }); return c
                                                    } predictBubbleSizes() {
                                                        var a = this.chart, f = a.legend.options, c = f.floating; const g = (f = "horizontal" === f.layout) ? a.legend.lastLineHeight : 0, k = a.plotSizeX, n = a.plotSizeY; var p = a.series[this.options.seriesIndex], e = p.getPxExtremes(); a = Math.ceil(e.minPxSize); e = Math.ceil(e.maxPxSize); const l = Math.min(n, k);
                                                        p = p.options.maxSize; if (c || !/%$/.test(p)) c = e; else if (p = parseFloat(p), c = (l + g) * p / 100 / (p / 100 + 1), f && n - c >= k || !f && k - c >= n) c = e; return [a, Math.ceil(c)]
                                                    } updateRanges(a, f) { const c = this.legend.options.bubbleLegend; c.minSize = a; c.maxSize = f; c.ranges = this.getRanges() } correctSizes() { const a = this.legend, f = this.chart.series[this.options.seriesIndex].getPxExtremes(); 1 < Math.abs(Math.ceil(f.maxPxSize) - this.options.maxSize) && (this.updateRanges(this.options.minSize, f.maxPxSize), a.render()) }
                                                } ""; return n
                                            }); K(a, "Series/Bubble/BubbleLegendComposition.js",
                                                [a["Series/Bubble/BubbleLegendDefaults.js"], a["Series/Bubble/BubbleLegendItem.js"], a["Core/Defaults.js"], a["Core/Utilities.js"]], function (a, x, G, I) {
                                                    function r(a, f, h) {
                                                        const c = this.legend; var g = 0 <= A(this); let e, k; c && c.options.enabled && c.bubbleLegend && c.options.bubbleLegend.autoRanges && g ? (e = c.bubbleLegend.options, g = c.bubbleLegend.predictBubbleSizes(), c.bubbleLegend.updateRanges(g[0], g[1]), e.placed || (c.group.placed = !1, c.allItems.forEach(a => { k = a.legendItem || {}; k.group && (k.group.translateY = null) })), c.render(),
                                                            this.getMargins(), this.axes.forEach(function (a) { a.visible && a.render(); e.placed || (a.setScale(), a.updateNames(), n(a.ticks, function (a) { a.isNew = !0; a.isNewLabel = !0 })) }), e.placed = !0, this.getMargins(), a.call(this, f, h), c.bubbleLegend.correctSizes(), q(c, F(c))) : (a.call(this, f, h), c && c.options.enabled && c.bubbleLegend && (c.render(), q(c, F(c))))
                                                    } function A(a) { a = a.series; let c = 0; for (; c < a.length;) { if (a[c] && a[c].isBubble && a[c].visible && a[c].zData.length) return c; c++ } return -1 } function F(a) {
                                                        a = a.allItems; const c = [], f =
                                                            a.length; let h, k, e = 0; for (k = 0; k < f; k++) { var l = a[k].legendItem || {}; h = (a[k + 1] || {}).legendItem || {}; l.labelHeight && (a[k].itemHeight = l.labelHeight); if (a[k] === a[f - 1] || l.y !== h.y) { c.push({ height: 0 }); l = c[c.length - 1]; for (e; e <= k; e++)a[e].itemHeight > l.height && (l.height = a[e].itemHeight); l.step = k } } return c
                                                    } function D(a) {
                                                        const c = this.bubbleLegend, f = this.options, h = f.bubbleLegend, k = A(this.chart); c && c.ranges && c.ranges.length && (h.ranges.length && (h.autoRanges = !!h.ranges[0].autoRanges), this.destroyItem(c)); 0 <= k && f.enabled &&
                                                            h.enabled && (h.seriesIndex = k, this.bubbleLegend = new x(h, this), this.bubbleLegend.addToLegend(a.allItems))
                                                    } function t(a) { if (a.defaultPrevented) return !1; var c = this.chart; a = this.visible; const f = this.chart.legend; f && f.bubbleLegend && (this.visible = !a, this.ignoreSeries = a, c = 0 <= A(c), f.bubbleLegend.visible !== c && (f.update({ bubbleLegend: { enabled: c } }), f.bubbleLegend.visible = c), this.visible = a) } function q(a, f) {
                                                        const c = a.options.rtl; let g, h, e, k, n = 0; a.allItems.forEach((a, l) => {
                                                            k = a.legendItem || {}; if (k.group) {
                                                                g = k.group.translateX ||
                                                                0; h = k.y || 0; if ((e = a.movementX) || c && a.ranges) e = c ? g - a.options.maxSize / 2 : g + e, k.group.attr({ translateX: e }); l > f[n].step && n++; k.group.attr({ translateY: Math.round(h + f[n].height / 2) }); k.y = h + f[n].height / 2
                                                            }
                                                        })
                                                    } const { setOptions: k } = G, { addEvent: p, objectEach: n, wrap: h } = I, f = []; return { compose: function (c, g, n) { I.pushUnique(f, c) && (k({ legend: { bubbleLegend: a } }), h(c.prototype, "drawChartBox", r)); I.pushUnique(f, g) && p(g, "afterGetAllItems", D); I.pushUnique(f, n) && p(n, "legendItemClick", t) } }
                                                }); K(a, "Series/Bubble/BubblePoint.js",
                                                    [a["Core/Series/Point.js"], a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]], function (a, x, G) { ({ seriesTypes: { scatter: { prototype: { pointClass: x } } } } = x); ({ extend: G } = G); class r extends x { constructor() { super(...arguments); this.series = this.options = void 0 } haloPath(r) { return a.prototype.haloPath.call(this, 0 === r ? 0 : (this.marker ? this.marker.radius || 0 : 0) + r) } } G(r.prototype, { ttBelow: !1 }); return r }); K(a, "Series/Bubble/BubbleSeries.js", [a["Series/Bubble/BubbleLegendComposition.js"], a["Series/Bubble/BubblePoint.js"],
                                                    a["Core/Color/Color.js"], a["Core/Globals.js"], a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]], function (a, x, G, I, y, A) {
                                                        function r() {
                                                            const a = this.len, c = this.chart, e = this.isXAxis, f = e ? "xData" : "yData", b = this.min, d = this.max - b; let h = 0, k = a, n = a / d, p; this.series.forEach(a => {
                                                                if (a.bubblePadding && (a.visible || !c.options.chart.ignoreHiddenSeries)) {
                                                                    p = this.allowZoomOutside = !0; const c = a[f]; e && ((a.onPoint || a).getRadii(0, 0, a), a.onPoint && (a.radii = a.onPoint.radii)); if (0 < d) {
                                                                        let d = c.length; for (; d--;)if (g(c[d]) &&
                                                                            this.dataMin <= c[d] && c[d] <= this.max) { const e = a.radii && a.radii[d] || 0; h = Math.min((c[d] - b) * n - e, h); k = Math.max((c[d] - b) * n + e, k) }
                                                                    }
                                                                }
                                                            }); p && 0 < d && !this.logarithmic && (k -= a, n *= (a + Math.max(0, h) - Math.min(k, a)) / a, [["min", "userMin", h], ["max", "userMax", k]].forEach(a => { "undefined" === typeof C(this.options[a[0]], this[a[1]]) && (this[a[0]] += a[2] / n) }))
                                                        } const { parse: D } = G; ({ noop: G } = I); const { series: t, seriesTypes: { column: { prototype: q }, scatter: k } } = y, { addEvent: p, arrayMax: n, arrayMin: h, clamp: f, extend: c, isNumber: g, merge: B, pick: C } =
                                                            A, E = []; class e extends k {
                                                                constructor() { super(...arguments); this.zData = this.yData = this.radii = this.points = this.options = this.minPxSize = this.maxPxSize = this.data = void 0 } static compose(c, e, f, g) { a.compose(e, f, g); A.pushUnique(E, c) && (c.prototype.beforePadding = r) } animate(a) {
                                                                    !a && this.points.length < this.options.animationLimit && this.points.forEach(function (a) { const { graphic: c } = a; c && c.width && (this.hasRendered || c.attr({ x: a.plotX, y: a.plotY, width: 1, height: 1 }), c.animate(this.markerAttribs(a), this.options.animation)) },
                                                                        this)
                                                                } getRadii() {
                                                                    const a = this.zData, c = this.yData, e = []; let f, b, d, g = this.chart.bubbleZExtremes; const { minPxSize: h, maxPxSize: k } = this.getPxExtremes(); if (!g) { let a = Number.MAX_VALUE, b = -Number.MAX_VALUE, c; this.chart.series.forEach(d => { d.bubblePadding && (d.visible || !this.chart.options.chart.ignoreHiddenSeries) && (d = (d.onPoint || d).getZExtremes()) && (a = Math.min(C(a, d.zMin), d.zMin), b = Math.max(C(b, d.zMax), d.zMax), c = !0) }); c ? (g = { zMin: a, zMax: b }, this.chart.bubbleZExtremes = g) : g = { zMin: 0, zMax: 0 } } b = 0; for (f = a.length; b < f; b++)d =
                                                                        a[b], e.push(this.getRadius(g.zMin, g.zMax, h, k, d, c && c[b])); this.radii = e
                                                                } getRadius(a, c, e, f, b, d) { const h = this.options, k = "width" !== h.sizeBy, l = h.zThreshold; let n = c - a, p = .5; if (null === d || null === b) return null; if (g(b)) { h.sizeByAbsoluteValue && (b = Math.abs(b - l), n = Math.max(c - l, Math.abs(a - l)), a = 0); if (b < a) return e / 2 - 1; 0 < n && (p = (b - a) / n) } k && 0 <= p && (p = Math.sqrt(p)); return Math.ceil(e + p * (f - e)) / 2 } hasData() { return !!this.processedXData.length } pointAttribs(a, c) {
                                                                    const e = this.options.marker.fillOpacity; a = t.prototype.pointAttribs.call(this,
                                                                        a, c); 1 !== e && (a.fill = D(a.fill).setOpacity(e).get("rgba")); return a
                                                                } translate() { super.translate.call(this); this.getRadii(); this.translateBubble() } translateBubble() {
                                                                    const { data: a, options: e, radii: f } = this, { minPxSize: h } = this.getPxExtremes(); let b = a.length; for (; b--;) {
                                                                        const d = a[b], k = f ? f[b] : 0; "z" === this.zoneAxis && (d.negative = (d.z || 0) < (e.zThreshold || 0)); g(k) && k >= h / 2 ? (d.marker = c(d.marker, { radius: k, width: 2 * k, height: 2 * k }), d.dlBox = { x: d.plotX - k, y: d.plotY - k, width: 2 * k, height: 2 * k }) : (d.shapeArgs = d.plotY = d.dlBox = void 0,
                                                                            d.isInside = !1)
                                                                    }
                                                                } getPxExtremes() { const a = Math.min(this.chart.plotWidth, this.chart.plotHeight); var c = c => { let b; "string" === typeof c && (b = /%$/.test(c), c = parseInt(c, 10)); return b ? a * c / 100 : c }; const e = c(C(this.options.minSize, 8)); c = Math.max(c(C(this.options.maxSize, "20%")), e); return { minPxSize: e, maxPxSize: c } } getZExtremes() {
                                                                    var a = this.options; const c = (this.zData || []).filter(g); if (c.length) {
                                                                        const e = C(a.zMin, f(h(c), !1 === a.displayNegative ? a.zThreshold || 0 : -Number.MAX_VALUE, Number.MAX_VALUE)); a = C(a.zMax, n(c)); if (g(e) &&
                                                                            g(a)) return { zMin: e, zMax: a }
                                                                    }
                                                                }
                                                        } e.defaultOptions = B(k.defaultOptions, {
                                                            dataLabels: { formatter: function () { const { numberFormatter: a } = this.series.chart, { z: c } = this.point; return g(c) ? a(c, -1) : "" }, inside: !0, verticalAlign: "middle" }, animationLimit: 250, marker: { lineColor: null, lineWidth: 1, fillOpacity: .5, radius: null, states: { hover: { radiusPlus: 0 } }, symbol: "circle" }, minSize: 8, maxSize: "20%", softThreshold: !1, states: { hover: { halo: { size: 5 } } }, tooltip: { pointFormat: "({point.x}, {point.y}), Size: {point.z}" }, turboThreshold: 0, zThreshold: 0,
                                                            zoneAxis: "z"
                                                        }); c(e.prototype, { alignDataLabel: q.alignDataLabel, applyZones: G, bubblePadding: !0, buildKDTree: G, directTouch: !0, isBubble: !0, pointArrayMap: ["y", "z"], pointClass: x, parallelArrays: ["x", "y", "z"], trackerGroups: ["group", "dataLabelsGroup"], specialGroup: "group", zoneAxis: "z" }); p(e, "updatedData", a => { delete a.target.chart.bubbleZExtremes }); p(e, "remove", a => { delete a.target.chart.bubbleZExtremes }); y.registerSeriesType("bubble", e); ""; ""; return e
                                                    }); K(a, "Series/MapBubble/MapBubblePoint.js", [a["Series/Bubble/BubblePoint.js"],
                                                    a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]], function (a, x, G) { ({ seriesTypes: { map: { prototype: { pointClass: { prototype: x } } } } } = x); ({ extend: G } = G); class r extends a { isValid() { return "number" === typeof this.z } } G(r.prototype, { applyOptions: x.applyOptions, getProjectedBounds: x.getProjectedBounds }); return r }); K(a, "Series/MapBubble/MapBubbleSeries.js", [a["Series/Bubble/BubbleSeries.js"], a["Series/MapBubble/MapBubblePoint.js"], a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]], function (a, x, G,
                                                        I) {
                                                            const { seriesTypes: { map: { prototype: r }, mappoint: { prototype: A } } } = G, { extend: F, merge: D } = I; class t extends a {
                                                                constructor() { super(...arguments); this.points = this.options = this.data = void 0; this.clearBounds = r.clearBounds } searchPoint(a, k) { return this.searchKDTree({ clientX: a.chartX - this.chart.plotLeft, plotY: a.chartY - this.chart.plotTop }, k, a) } translate() { A.translate.call(this); this.getRadii(); this.translateBubble() } updateParallelArrays(a, k, p) {
                                                                    super.updateParallelArrays.call(this, a, k, p); a = this.processedXData;
                                                                    k = this.xData; a && k && (a.length = k.length)
                                                                }
                                                            } t.defaultOptions = D(a.defaultOptions, { lineWidth: 0, animationLimit: 500, joinBy: "hc-key", tooltip: { pointFormat: "{point.name}: {point.z}" } }); F(t.prototype, { type: "mapbubble", axisTypes: ["colorAxis"], getProjectedBounds: r.getProjectedBounds, isCartesian: !1, pointArrayMap: ["z"], pointClass: x, processData: r.processData, projectPoint: A.projectPoint, setData: r.setData, setOptions: r.setOptions, updateData: r.updateData, useMapGeometry: !0, xyFromShape: !0 }); G.registerSeriesType("mapbubble",
                                                                t); ""; return t
                                                    }); K(a, "Series/Heatmap/HeatmapPoint.js", [a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]], function (a, x) {
                                                        ({ seriesTypes: { scatter: { prototype: { pointClass: a } } } } = a); const { clamp: r, defined: I, extend: y, pick: A } = x; class F extends a {
                                                            constructor() { super(...arguments); this.y = this.x = this.value = this.series = this.options = void 0 } applyOptions(a, r) { (this.isNull || null === this.value) && delete this.color; super.applyOptions(a, r); this.formatPrefix = this.isNull || null === this.value ? "null" : "point"; return this } getCellAttributes() {
                                                                var a =
                                                                    this.series; const t = a.options, q = (t.colsize || 1) / 2, k = (t.rowsize || 1) / 2, p = a.xAxis, n = a.yAxis, h = this.options.marker || a.options.marker; a = a.pointPlacementToXValue(); const f = A(this.pointPadding, t.pointPadding, 0), c = { x1: r(Math.round(p.len - p.translate(this.x - q, !1, !0, !1, !0, -a)), -p.len, 2 * p.len), x2: r(Math.round(p.len - p.translate(this.x + q, !1, !0, !1, !0, -a)), -p.len, 2 * p.len), y1: r(Math.round(n.translate(this.y - k, !1, !0, !1, !0)), -n.len, 2 * n.len), y2: r(Math.round(n.translate(this.y + k, !1, !0, !1, !0)), -n.len, 2 * n.len) };[["width",
                                                                        "x"], ["height", "y"]].forEach(function (a) { var g = a[0]; a = a[1]; let k = a + "1", q = a + "2"; const e = Math.abs(c[k] - c[q]), l = h && h.lineWidth || 0, r = Math.abs(c[k] + c[q]) / 2; g = h && h[g]; I(g) && g < e && (g = g / 2 + l / 2, c[k] = r - g, c[q] = r + g); if (f) { if ("x" === a && p.reversed || "y" === a && !n.reversed) k = q, q = a + "1"; c[k] += f; c[q] -= f } }); return c
                                                            } haloPath(a) { if (!a) return []; const { x: r = 0, y: q = 0, width: k = 0, height: p = 0 } = this.shapeArgs || {}; return [["M", r - a, q - a], ["L", r - a, q + p + a], ["L", r + k + a, q + p + a], ["L", r + k + a, q - a], ["Z"]] } isValid() {
                                                                return Infinity !== this.value && -Infinity !==
                                                                    this.value
                                                            }
                                                        } y(F.prototype, { dataLabelOnNull: !0, moveToTopOnHover: !0, ttBelow: !1 }); return F
                                                    }); K(a, "Series/Heatmap/HeatmapSeries.js", [a["Core/Color/Color.js"], a["Series/ColorMapComposition.js"], a["Core/Globals.js"], a["Series/Heatmap/HeatmapPoint.js"], a["Core/Series/SeriesRegistry.js"], a["Core/Renderer/SVG/SVGRenderer.js"], a["Core/Utilities.js"]], function (a, x, G, I, y, A, F) {
                                                        const { doc: r } = G, { series: t, seriesTypes: { column: q, scatter: k } } = y, { prototype: { symbols: p } } = A, { clamp: n, extend: h, fireEvent: f, isNumber: c, merge: g,
                                                            pick: B, defined: C } = F; class E extends k {
                                                                constructor() { super(...arguments); this.points = this.options = this.data = this.context = this.colorAxis = this.canvas = void 0; this.valueMin = this.valueMax = NaN } drawPoints() {
                                                                    const a = this; var c = a.options, f = c.marker || {}; if (c.interpolation) {
                                                                        const { image: d, chart: e, xAxis: k, yAxis: l, points: p } = a; f = p.length - 1; const { len: q, reversed: r } = k, { len: t, reversed: v } = l, { min: u, max: x } = k.getExtremes(), { min: y, max: z } = l.getExtremes(), [A, D] = [B(c.colsize, 1), B(c.rowsize, 1)]; var g = e.inverted, h = A / 2; c = k.userOptions.minPadding;
                                                                        var b = C(c) && !(0 < c); c = g || b; h = b && h || 0; const [E, F, G] = [u - h, x + 2 * h, u + A].map(b => n(Math.round(k.len - k.translate(b, !1, !0, !1, !0, -a.pointPlacementToXValue())), -k.len, 2 * k.len)), [I, K] = r ? [F, E] : [E, F]; h = q / G / 2 / 2 / 2; g = g ? { width: q, height: t, x: 0, y: 0 } : { x: I - h, width: K - h, height: t, y: 0 }; if (!d || a.isDirtyData) {
                                                                            const k = e.colorAxis && e.colorAxis[0]; h = a.getContext(); if ((b = a.canvas) && h && k) {
                                                                                const l = b.width = ~~((x - u) / A) + 1, m = b.height = ~~((z - y) / D) + 1, n = l * m, q = new Uint8ClampedArray(4 * n), t = l - (c && 1 || 0), w = m - 1; c = a => {
                                                                                    a = k.toColor(a.value || 0, B(a)).split(")")[0].split("(")[1].split(",").map(a =>
                                                                                        B(parseFloat(a), parseInt(a, 10))); a[3] = 255 * B(a[3], 1); return a
                                                                                }; const C = r ? a => t - a : a => a, E = v ? a => w - a : a => a, F = (a, b) => Math.ceil(l * E(~~((w - 0) / (z - y) * (z - b - y))) + C(~~((t - 0) / (x - u) * (a - u)))); a.buildKDTree(); a.directTouch = !1; for (let a = 0; a < n; a++) { const b = p[~~((f - 0) / (q.length - 4) * a * 4)], d = new Uint8ClampedArray(c(b)); q.set(d, 4 * F(b.x, b.y)) } h.putImageData(new ImageData(q, l, m), 0, 0); d ? d.attr(Object.assign(Object.assign({}, g), { href: b.toDataURL() })) : a.image = e.renderer.image(b.toDataURL()).attr(g).add(a.group)
                                                                            }
                                                                        } else d.width ===
                                                                            g.width && d.height === g.height || d.attr(g)
                                                                    } else if (f.enabled || a._hasPointMarkers) t.prototype.drawPoints.call(a), a.points.forEach(b => { b.graphic && (b.graphic[a.chart.styledMode ? "css" : "animate"](a.colorAttribs(b)), null === b.value && b.graphic.addClass("highcharts-null-point")) })
                                                                } getContext() { const { canvas: a, context: c } = this; if (a && c) c.clearRect(0, 0, a.width, a.height); else return this.canvas = r.createElement("canvas"), this.context = this.canvas.getContext("2d") || void 0; return c } getExtremes() {
                                                                    const { dataMin: a, dataMax: f } =
                                                                        t.prototype.getExtremes.call(this, this.valueData); c(a) && (this.valueMin = a); c(f) && (this.valueMax = f); return t.prototype.getExtremes.call(this)
                                                                } getValidPoints(a, c) { return t.prototype.getValidPoints.call(this, a, c, !0) } hasData() { return !!this.processedXData.length } init() { super.init.apply(this, arguments); const a = this.options; a.pointRange = B(a.pointRange, a.colsize || 1); this.yAxis.axisPointRange = a.rowsize || 1; p.ellipse = p.circle; a.marker && c(a.borderRadius) && (a.marker.r = a.borderRadius) } markerAttribs(a, c) {
                                                                    const e =
                                                                        a.shapeArgs || {}; if (a.hasImage) return { x: a.plotX, y: a.plotY }; if (c && "normal" !== c) { var f = a.options.marker || {}; a = this.options.marker || {}; a = a.states && a.states[c] || {}; f = f.states && f.states[c] || {}; c = (f.width || a.width || e.width || 0) + (f.widthPlus || a.widthPlus || 0); a = (f.height || a.height || e.height || 0) + (f.heightPlus || a.heightPlus || 0); return { x: (e.x || 0) + ((e.width || 0) - c) / 2, y: (e.y || 0) + ((e.height || 0) - a) / 2, width: c, height: a } } return e
                                                                } pointAttribs(c, f) {
                                                                    const e = t.prototype.pointAttribs.call(this, c, f), h = this.options || {}; var k =
                                                                        this.chart.options.plotOptions || {}, b = k.series || {}; const d = k.heatmap || {}; k = c && c.options.borderColor || h.borderColor || d.borderColor || b.borderColor; b = c && c.options.borderWidth || h.borderWidth || d.borderWidth || b.borderWidth || e["stroke-width"]; e.stroke = c && c.marker && c.marker.lineColor || h.marker && h.marker.lineColor || k || this.color; e["stroke-width"] = b; f && "normal" !== f && (c = g(h.states && h.states[f], h.marker && h.marker.states && h.marker.states[f], c && c.options.states && c.options.states[f] || {}), e.fill = c.color || a.parse(e.fill).brighten(c.brightness ||
                                                                            0).get(), e.stroke = c.lineColor || e.stroke); return e
                                                                } translate() {
                                                                    const { borderRadius: a, marker: h } = this.options, k = h && h.symbol || "rect", n = p[k] ? k : "rect", q = -1 !== ["circle", "square"].indexOf(n); this.generatePoints(); this.points.forEach(function (b) {
                                                                        const d = b.getCellAttributes(); let e = Math.min(d.x1, d.x2); var f = Math.min(d.y1, d.y2); let h = Math.max(Math.abs(d.x2 - d.x1), 0), l = Math.max(Math.abs(d.y2 - d.y1), 0); b.hasImage = 0 === (b.marker && b.marker.symbol || k || "").indexOf("url"); q && (f = Math.abs(h - l), e = Math.min(d.x1, d.x2) + (h <
                                                                            l ? 0 : f / 2), f = Math.min(d.y1, d.y2) + (h < l ? f / 2 : 0), h = l = Math.min(h, l)); b.hasImage && (b.marker = { width: h, height: l }); b.plotX = b.clientX = (d.x1 + d.x2) / 2; b.plotY = (d.y1 + d.y2) / 2; b.shapeType = "path"; b.shapeArgs = g(!0, { x: e, y: f, width: h, height: l }, { d: p[n](e, f, h, l, { r: c(a) ? a : 0 }) })
                                                                    }); f(this, "afterTranslate")
                                                                }
                                                        } E.defaultOptions = g(k.defaultOptions, {
                                                            animation: !1, borderRadius: 0, borderWidth: 0, interpolation: !1, nullColor: "#f7f7f7", dataLabels: {
                                                                formatter: function () {
                                                                    const { numberFormatter: a } = this.series.chart, { value: f } = this.point; return c(f) ?
                                                                        a(f, -1) : ""
                                                                }, inside: !0, verticalAlign: "middle", crop: !1, overflow: "allow", padding: 0
                                                            }, marker: { symbol: "rect", radius: 0, lineColor: void 0, states: { hover: { lineWidthPlus: 0 }, select: {} } }, clip: !0, pointRange: null, tooltip: { pointFormat: "{point.x}, {point.y}: {point.value}<br/>" }, states: { hover: { halo: !1, brightness: .2 } }, legendSymbol: "rectangle"
                                                        }); h(E.prototype, {
                                                            axisTypes: x.seriesMembers.axisTypes, colorKey: x.seriesMembers.colorKey, directTouch: !0, getExtremesFromAll: !0, parallelArrays: x.seriesMembers.parallelArrays, pointArrayMap: ["y",
                                                                "value"], pointClass: I, specialGroup: "group", trackerGroups: x.seriesMembers.trackerGroups, alignDataLabel: q.prototype.alignDataLabel, colorAttribs: x.seriesMembers.colorAttribs, getSymbol: t.prototype.getSymbol
                                                        }); x.compose(E); y.registerSeriesType("heatmap", E); ""; ""; return E
                                                    }); K(a, "masters/modules/map.src.js", [a["Core/Globals.js"], a["Core/Axis/Color/ColorAxis.js"], a["Series/MapBubble/MapBubbleSeries.js"], a["Core/Chart/MapChart.js"], a["Maps/MapView.js"], a["Maps/Projection.js"]], function (a, x, G, I, y, A) {
                                                        a.ColorAxis =
                                                        x; a.MapChart = I; a.mapChart = a.Map = I.mapChart; a.MapView = y; a.maps = I.maps; a.Projection = A; x.compose(a.Chart, a.Fx, a.Legend, a.Series); G.compose(a.Axis, a.Chart, a.Legend, a.Series)
                                                    }); K(a, "masters/highmaps.src.js", [a["masters/highcharts.src.js"]], function (a) { a.product = "Highmaps"; return a }); a["masters/highmaps.src.js"]._modules = a; return a["masters/highmaps.src.js"]
});
//# sourceMappingURL=highmaps.js.map