// VPNAPI.io token
const vpnApiToken = "3c641b5c07f4444dbaeba4a107d99ada"; // Replace with your actual VPNAPI.io token

// Function to check user's VPN status and location
function checkVPNAndLocation() {
  // Get the user's IP details
  fetch(`https://vpnapi.io/api/?key=${vpnApiToken}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => {
      // Extract necessary data
      const userCountry = data.location.country_code;
      const vpnDetected =
        data.security.vpn || data.security.proxy || data.security.tor;
      const isHostingProvider = data.security.hosting; // Hosting provider often used by VPNs

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

      // Check for VPN, proxy, Tor, or hosting provider (aggressive filtering)
      if (vpnDetected || isHostingProvider) {
        document.body.innerHTML =
          "<h1>Access Denied</h1><p>VPN, proxy, or hosting provider usage detected. Please disable it to access this content.</p>";
        return;
      }

      // Check if the user's country is blocked
      if (blockedCountries.includes(userCountry)) {
        document.body.innerHTML =
          "<h1>Access Denied</h1><p>This content is not available in your region.</p>";
        return;
      }

      // Check if the user's country is in the allowed list
      if (!allowedCountries.includes(userCountry)) {
        document.body.innerHTML =
          "<h1>Access Denied</h1><p>This content is not available in your region.</p>";
      } else {
        // If the country is allowed, show the content and remove the loading indicator
        document.getElementById("loading").style.display = "none";
        document.querySelector(".container").style.display = "block";
      }
    })
    .catch((error) => {
      console.error("Error fetching location or VPN data:", error);
      document.body.innerHTML = `<h1>Error</h1><p>Unable to determine your location or VPN status. Error: ${error.message}</p>`;
    });
}

// Call the function on page load
window.onload = checkVPNAndLocation;
