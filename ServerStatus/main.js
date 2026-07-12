document.addEventListener("DOMContentLoaded", () => {
    const targetDomain = "xxvii.org"; 
    const allLinks = document.querySelectorAll("a");
    const outputList = document.getElementById("domain-links-output");

    allLinks.forEach(link => {
        const hrefValue = link.href;
        
        // Filter links that belong to your domain group
        if (hrefValue.includes(targetDomain)) {
            
            try {
                const urlObj = new URL(hrefValue);
                const hostname = urlObj.hostname;

                // Hide the main root domain homepage from the output list completely
                if (hostname === targetDomain && (urlObj.pathname === "/" || urlObj.pathname === "")) {
                    return; // Skip appending
                }

                const listItem = document.createElement("li");
                listItem.className = "link-item";
                
                // Create the initial gray dot element
                const dot = document.createElement("span");
                dot.className = "status-dot";

                const anchor = document.createElement("a");
                anchor.href = hrefValue;
                anchor.textContent = hrefValue;
                anchor.target = "_blank";

                // Append dot first so it appears to the left of the URL
                listItem.appendChild(dot);
                listItem.appendChild(anchor);
                outputList.appendChild(listItem);

                // Run specific isolated status checkers matching individual subdomains
                if (hostname === 'searx.xxvii.org') {
                    checkSearxStatus(hrefValue, dot);
                } else if (hostname === 'ai.xxvii.org') {
                    checkAiStatus(hrefValue, dot);
                } else if (hostname === 'copyparty.xxvii.org') {
                    checkCopypartyStatus(hrefValue, dot);
                } else {
                    // Fallback configuration for any other subdomains
                    checkCopypartyStatus(hrefValue, dot); 
                }
                
            } catch (e) {
                // Skips any non-http anchors (like tel:, mailto:, or anchor hashes)
            }
        }
    });
});