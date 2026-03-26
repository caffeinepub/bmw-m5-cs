import { R as React, j as jsxRuntimeExports, m as motion } from "./index-CypPaStP.js";
var DefaultContext = {
  color: void 0,
  size: void 0,
  className: void 0,
  style: void 0,
  attr: void 0
};
var IconContext = React.createContext && /* @__PURE__ */ React.createContext(DefaultContext);
var _excluded = ["attr", "size", "title"];
function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  for (var key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function Tree2Element(tree) {
  return tree && tree.map((node, i) => /* @__PURE__ */ React.createElement(node.tag, _objectSpread({
    key: i
  }, node.attr), Tree2Element(node.child)));
}
function GenIcon(data) {
  return (props) => /* @__PURE__ */ React.createElement(IconBase, _extends({
    attr: _objectSpread({}, data.attr)
  }, props), Tree2Element(data.child));
}
function IconBase(props) {
  var elem = (conf) => {
    var {
      attr,
      size,
      title
    } = props, svgProps = _objectWithoutProperties(props, _excluded);
    var computedSize = size || conf.size || "1em";
    var className;
    if (conf.className) className = conf.className;
    if (props.className) className = (className ? className + " " : "") + props.className;
    return /* @__PURE__ */ React.createElement("svg", _extends({
      stroke: "currentColor",
      fill: "currentColor",
      strokeWidth: "0"
    }, conf.attr, attr, svgProps, {
      className,
      style: _objectSpread(_objectSpread({
        color: props.color || conf.color
      }, conf.style), props.style),
      height: computedSize,
      width: computedSize,
      xmlns: "http://www.w3.org/2000/svg"
    }), title && /* @__PURE__ */ React.createElement("title", null, title), props.children);
  };
  return IconContext !== void 0 ? /* @__PURE__ */ React.createElement(IconContext.Consumer, null, (conf) => elem(conf)) : elem(DefaultContext);
}
function SiInstagram(props) {
  return GenIcon({ "attr": { "role": "img", "viewBox": "0 0 24 24" }, "child": [{ "tag": "path", "attr": { "d": "M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077" }, "child": [] }] })(props);
}
function Footer() {
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "footer",
    {
      className: "relative overflow-hidden",
      style: {
        backgroundColor: "#080b10",
        borderTop: "1px solid rgba(32,224,230,0.2)"
      },
      itemScope: true,
      itemType: "https://schema.org/WPFooter",
      "aria-label": "BMW M5 CS footer – specifications, developer info, and site links",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute top-0 left-0 right-0 h-px",
            style: {
              background: "linear-gradient(90deg, transparent, #20E0E6, transparent)",
              boxShadow: "0 0 20px rgba(32,224,230,0.4)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6 py-16", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-3 gap-12 mb-12", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { itemScope: true, itemType: "https://schema.org/Organization", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-10 h-10 rounded-full flex items-center justify-center font-bold font-rajdhani text-base",
                    style: { border: "1.5px solid #20E0E6", color: "#20E0E6" },
                    "aria-hidden": "true",
                    children: "M"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "font-rajdhani font-bold text-xl tracking-[0.15em]",
                    style: { color: "#F2F5F7" },
                    itemProp: "name",
                    children: "BMW M5 CS"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-sm leading-relaxed",
                  style: { color: "#7C8796" },
                  itemProp: "description",
                  children: "The pinnacle of M engineering. Where motorsport meets luxury. Built for those who demand the absolute best. Book your BMW test drive and experience 627 HP of pure BMW M performance."
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sr-only", "aria-hidden": "true", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "BMW M5 CS" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "BMW booking" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "BMW test drive" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "BMW M5 CS price" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "BMW performance car" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "BMW luxury sedan" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "BMW M5 CS 627HP" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "BMW M5 CS specs" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "BMW M5 CS 0-60" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "BMW M5 CS top speed" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "book BMW test drive" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "BMW M5 CS customization" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "BMW M5 CS modifications" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "BMW M5 CS review" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "BMW M5 CS horsepower" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "BMW M5 CS engine" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "BMW M5 CS competition" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "BMW ultimate driving machine" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "BMW M series" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "BMW M GmbH" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "BMW M5 CS 2024" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "S63 V8 BMW" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "BMW M5 CS carbon fiber" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "BMW M5 CS exhaust upgrade" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "BMW M5 CS turbo" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "BMW M5 CS wheels" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "BMW M5 CS interior" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "BMW M5 CS exterior" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "BMW M5 CS for sale" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "buy BMW M5 CS" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "BMW car booking online" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "BMW M5 CS launch control" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "BMW M5 CS drag race" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "BMW M5 CS burnout" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "BMW M5 CS track day" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "BMW M5 CS gold edition" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "BMW M5 CS diamond edition" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "BMW M5 CS racing edition" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "BMW M5 CS stealth edition" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "BMW M5 CS performance unleashed" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                itemScope: true,
                itemType: "https://schema.org/Car",
                "aria-label": "BMW M5 CS key specifications",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "h2",
                    {
                      className: "font-rajdhani font-bold text-sm tracking-[0.3em] mb-6",
                      style: { color: "#20E0E6" },
                      children: "BMW M5 CS KEY SPECIFICATIONS"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: [
                    { label: "Power", value: "627 HP", prop: "enginePower" },
                    { label: "Torque", value: "750 Nm", prop: "torque" },
                    { label: "0–100", value: "3.0 sec", prop: "speed" },
                    { label: "Top Speed", value: "305 km/h", prop: "speed" },
                    { label: "Engine", value: "S63 V8", prop: "vehicleEngine" },
                    { label: "Weight", value: "1,510 kg", prop: "weight" }
                  ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "text-xs tracking-wider",
                        style: { color: "#7C8796" },
                        children: s.label
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "font-rajdhani font-semibold text-sm",
                        style: { color: "#F2F5F7" },
                        itemProp: s.prop,
                        children: s.value
                      }
                    )
                  ] }, s.label)) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 text-xs", style: { color: "#4a5060" }, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "BMW M5 CS – S63 Twin-Turbo V8 – M xDrive AWD – 8-speed M Steptronic" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Book BMW test drive – BMW M5 CS booking available online" })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "aria-label": "Site developer information", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h3",
                {
                  className: "font-rajdhani font-bold text-sm tracking-[0.3em] mb-6",
                  style: { color: "#20E0E6" },
                  children: "DEVELOPED BY"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "font-rajdhani font-bold text-xl mb-4",
                  style: { color: "#F2F5F7" },
                  children: "ISHANT VISHNU PADOLE"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.a,
                {
                  href: "https://www.instagram.com/ishant_padole/?utm_source=ig_web_button_share_sheet",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-300",
                  style: {
                    background: "linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)",
                    color: "#fff",
                    boxShadow: "0 4px 15px rgba(253,29,29,0.3)"
                  },
                  whileHover: { scale: 1.05 },
                  whileTap: { scale: 0.97 },
                  "aria-label": "Visit Ishant Vishnu Padole on Instagram",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SiInstagram, { size: 16, "aria-hidden": "true" }),
                    "@ishant_padole"
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-px mb-8",
              style: {
                background: "linear-gradient(90deg, transparent, rgba(32,224,230,0.15), transparent)"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row items-center justify-between gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs tracking-wider", style: { color: "#7C8796" }, children: [
              "© ",
              year,
              " BMW M5 CS. All performance specs from official BMW M GmbH documentation. BMW, M5, M5 CS are registered trademarks of BMW AG."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "text-xs tracking-wider transition-colors duration-200 hover:opacity-80",
                style: { color: "#7C8796" },
                children: [
                  "Built with ❤️ using",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#20E0E6" }, children: "caffeine.ai" })
                ]
              }
            )
          ] })
        ] })
      ]
    }
  );
}
export {
  Footer as default
};
