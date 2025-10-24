// Global links map for CTA/buttons.
// Using UMD-style global so it works without a bundler.
(function () {
  var links = {
    contact: 'index.html#contact',
    home: 'index.html#home',
    services: 'index.html#services',
    about: 'index.html#about',
    work: 'index.html#work',
    pricing: 'pricing.html',
    // Replace with your actual checkout/lead URLs as needed:
    checkoutBasic: 'https://buy.stripe.com/eVqcMY0aL26M2Cq5GJcbC06',
    checkoutPro: 'https://buy.stripe.com/dRm9AMg9JcLq2Cq0mpcbC05',
    checkoutPremium: 'https://buy.stripe.com/28E9AMaPpcLq0uiedfcbC04',
    // Used by pricing.html React card ("The Vanta Scale Package")
    // Update this to the correct Stripe link for the $1,900-$1,999 plan
    checkoutScale: 'https://buy.stripe.com/dRm9AMg9JcLq2Cq0mpcbC05'
  };

  // Expose as global for easy usage in inline scripts
  // and other vanilla JS files.
  if (typeof window !== 'undefined') {
    window.VANTA_LINKS = links;
  }
})();


