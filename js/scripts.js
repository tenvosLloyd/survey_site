// Google Analytics
window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag("js", new Date());
gtag("config", "UA-XXXXXXX-X"); // Replace with your actual Google Analytics ID

// Meta Pixel Code
!(function (f, b, e, v, n, t, s) {
  if (f.fbq) return;
  n = f.fbq = function () {
    n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
  };
  if (!f._fbq) f._fbq = n;
  n.push = n;
  n.loaded = !0;
  n.version = "2.0";
  n.queue = [];
  t = b.createElement(e);
  t.async = !0;
  t.src = v;
  s = b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t, s);
})(
  window,
  document,
  "script",
  "https://connect.facebook.net/en_US/fbevents.js"
);
fbq("init", "XXXXXXXXXXXXX"); // Replace with your actual Meta Pixel ID
fbq("track", "PageView");

// Google Analytics Global Site Tag (gtag.js)
(function () {
  var gtagScript = document.createElement("script");
  gtagScript.src = "https://www.googletagmanager.com/gtag/js?id=AW-16684410138";
  gtagScript.async = true;
  document.head.appendChild(gtagScript);

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "AW-16684410138");
})();

// Region locking
// Your ipinfo.io token (optional)
const token = "f74b55eef2d637"; // Leave as '' if not using a token

// Function to check user's location
function checkLocation() {
  fetch(`https://ipinfo.io/json?token=${token}`)
    .then((response) => response.json())
    .then((data) => {
      const userCountry = data.country;

      // Define allowed countries
      const allowedCountries = ["US", "CA"]; //  US and Canada only

      // Check if the user's country is in the allowed list
      if (!allowedCountries.includes(userCountry)) {
        document.body.innerHTML =
          "<h1>Access Denied</h1><p>This content is not available in your region.</p>";
      }
      // If the country is allowed, the default content is displayed without changes
    })
    .catch((error) => {
      console.error("Error fetching location data:", error);
      document.body.innerHTML =
        "<h1>Error</h1><p>Unable to determine your location. Please try again later.</p>";
    });
}

// Call the function on page load
window.onload = checkLocation;
