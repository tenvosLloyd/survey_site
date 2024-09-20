// Function to check VPN and location via Netlify proxy
function checkVPNAndLocation(userIP) {
  // Make a request to the Netlify function instead of the VPN API
  fetch(
    `https://vpncheck.netlify.app/.netlify/functions/check-vpn?ip=${userIP}`
  )
    .then((response) => response.json())
    .then((data) => {
      const vpnDetected =
        data.security.vpn || data.security.proxy || data.security.tor;
      const userCountry = data.location.country_code;

      // Define allowed countries (e.g., US and Canada)
      const allowedCountries = ["US", "CA"];

      // Define blocked countries
      const blockedCountries = [
        "DZ",
        "AO",
        "BJ",
        "BW",
        "BF",
        "BI",
        "CV",
        "CM",
        "CF",
        "TD",
        "KM",
        "CD",
        "DJ",
        "EG",
        "GQ",
        "ER",
        "SZ",
        "ET",
        "GA",
        "GM",
        "GH",
        "GN",
        "GW",
        "CI",
        "KE",
        "LS",
        "LR",
        "LY",
        "MG",
        "MW",
        "ML",
        "MR",
        "MU",
        "MA",
        "MZ",
        "NA",
        "NE",
        "NG",
        "CG",
        "RW",
        "ST",
        "SN",
        "SC",
        "SL",
        "SO",
        "ZA",
        "SS",
        "SD",
        "TZ",
        "TG",
        "TN",
        "UG",
        "ZM",
        "ZW",
      ];

      if (vpnDetected) {
        document.body.innerHTML =
          "<h1>Access Denied</h1><p>VPN, proxy, or hosting provider usage detected. Please disable it to access this content.</p>";
        return;
      }

      if (blockedCountries.includes(userCountry)) {
        document.body.innerHTML =
          "<h1>Access Denied</h1><p>This content is not available in your region.</p>";
        return;
      }

      if (!allowedCountries.includes(userCountry)) {
        document.body.innerHTML =
          "<h1>Access Denied</h1><p>This content is not available in your region.</p>";
      } else {
        document.getElementById("loading").style.display = "none";
        document.querySelector(".container").style.display = "block";
      }
    })
    .catch((error) => {
      console.error("Error fetching VPN data:", error);
      document.body.innerHTML = `<h1>Error</h1><p>Unable to determine your location or VPN status. Error: ${error.message}</p>`;
    });
}

// Call the function on page load
window.onload = () => {
  // Fetch the user's IP address and then call checkVPNAndLocation
  fetch("https://api.ipify.org?format=json")
    .then((response) => response.json())
    .then((data) => checkVPNAndLocation(data.ip));
};
