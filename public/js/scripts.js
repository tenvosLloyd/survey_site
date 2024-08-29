// VPNAPI.io token
const vpnApiToken = "3c641b5c07f4444dbaeba4a107d99ada"; // Replace with your actual VPNAPI.io token

// Function to check user's VPN status and location
function checkVPNAndLocation() {
  fetch(`https://vpnapi.io/api/?key=${vpnApiToken}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => {
      const userCountry = data.location.country_code;
      const vpnDetected =
        data.security.vpn || data.security.proxy || data.security.tor;

      // Define allowed countries
      const allowedCountries = ["US", "CA"]; // US and Canada only

      // Check for VPN, proxy, or Tor usage
      if (vpnDetected) {
        document.body.innerHTML =
          "<h1>Access Denied</h1><p>VPN or proxy usage detected. Please disable it to access this content.</p>";
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
