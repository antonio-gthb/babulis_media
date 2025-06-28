(function () {
  function runTrackingScripts() {
    // Google Tag Manager
    const gtmScript = document.createElement('script');
    gtmScript.innerHTML = `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id=${'GTM-XXXXXXX'}'+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-XXXXXXX');
    `;
    document.head.appendChild(gtmScript);

    // HubSpot
    const hubspotScript = document.createElement('script');
    hubspotScript.src = 'https://js.hs-scripts.com/YOUR_HUBSPOT_ID.js'; // Replace with your ID
    hubspotScript.async = true;
    document.head.appendChild(hubspotScript);
  }

  function showBanner() {
    const banner = document.createElement('div');
    banner.id = 'cookie-banner';
    banner.className = 'position-fixed bottom-0 start-0 end-0 bg-dark text-white p-3 d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center shadow';
    banner.style.zIndex = '1050';

    banner.innerHTML = `
      <div class="me-md-3 mb-2 mb-md-0 small">
        We use cookies to improve your experience. You can accept or decline tracking.
        See our <a href="/pages/privacy.html" class="text-white text-decoration-underline" target="_blank">Privacy Policy</a>.
      </div>
      <div class="d-flex gap-2">
        <button id="accept-cookies" class="btn btn-sm btn-success">Accept</button>
        <button id="decline-cookies" class="btn btn-sm btn-secondary">Decline</button>
      </div>
    `;

    document.body.appendChild(banner);

    document.getElementById('accept-cookies').addEventListener('click', function () {
      localStorage.setItem('cookieConsent', 'accepted');
      banner.remove();
      runTrackingScripts();
    });

    document.getElementById('decline-cookies').addEventListener('click', function () {
      localStorage.setItem('cookieConsent', 'declined');
      banner.remove();
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    const consent = localStorage.getItem('cookieConsent');
    if (consent === 'accepted') {
      runTrackingScripts();
    } else if (!consent) {
      showBanner();
    }
  });
})();