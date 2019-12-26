/* -*- Mode: Javascript; indent-tabs-mode:nil; js-indent-level: 2 -*- */
/* vim: set ts=2 et sw=2 tw=80: */

/*
 * Depending on your local configuration, this file should be installed in either:
 *
 * <mathjax>/extensions/TeX
 * <mathjax>/unpacked/extensions/TeX
 *
 *
 * To reference this file from default.js, add to the extensions array, as in:
 *
 * extensions: ["tex2jax.js","TeX/AMSmath.js","TeX/AMSsymbols.js","TeX/ieeemacros.js"],
 *
 */

MathJax.Extension["TeX/euler_ieee"] = {
  version: "1.0"
};

MathJax.Ajax.loadComplete("[MathJax]/extensions/TeX/euler_ieee.js");