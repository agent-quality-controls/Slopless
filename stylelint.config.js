export default {
  extends: ["stylelint-config-standard", "stylelint-config-tailwindcss"],
  plugins: ["@double-great/stylelint-a11y"],
  rules: {
    "a11y/content-property-no-static-value": true,
    "a11y/font-size-is-readable": true,
    "a11y/line-height-is-vertical-rhythmed": true,
    "a11y/media-prefers-reduced-motion": true,
    "a11y/no-display-none": true,
    "a11y/no-obsolete-attribute": true,
    "a11y/no-obsolete-element": true,
    "a11y/no-outline-none": true,
    "a11y/no-spread-text": true,
    "a11y/no-text-align-justify": true,
    "a11y/selector-pseudo-class-focus": true
  }
};
