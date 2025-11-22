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
    banner.className = 'cookie-card';

    banner.innerHTML = `
      <h4>Cookie Preferences</h4>
      <p>
        We use cookies to enhance your browsing experience and analyze our traffic. 
        <a href="/pages/privacy.html" style="color: var(--primary-color); text-decoration: underline;">Privacy Policy</a>
      </p>
      <div class="cookie-btn-group">
        <button id="decline-cookies" class="btn-cookie-decline">Decline</button>
        <button id="accept-cookies" class="btn-cookie-accept">Accept</button>
      </div>
    `;

    document.body.appendChild(banner);

    // Trigger animation after a small delay
    setTimeout(() => {
      banner.classList.add('show');
    }, 100);

    document.getElementById('accept-cookies').addEventListener('click', function () {
      localStorage.setItem('cookieConsent', 'accepted');
      banner.classList.remove('show');
      setTimeout(() => banner.remove(), 500); // Wait for animation
      runTrackingScripts();
    });

    document.getElementById('decline-cookies').addEventListener('click', function () {
      localStorage.setItem('cookieConsent', 'declined');
      banner.classList.remove('show');
      setTimeout(() => banner.remove(), 500); // Wait for animation
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    const consent = localStorage.getItem('cookieConsent');
    if (consent === 'accepted') {
      runTrackingScripts();
    } else if (!consent) {
      // Show banner after a short delay for better UX
      setTimeout(showBanner, 1000);
    }
  });
})();