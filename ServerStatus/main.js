// Individual function for SearXNG using its standalone Favicon
function checkSearxStatus(url, dotElement) {
    const imgCheck = new Image();
    const separator = url.endsWith('/') ? '' : '/';
    imgCheck.src = url + separator + 'favicon.ico?t=' + Date.now();

    const timeoutId = setTimeout(() => {
        imgCheck.src = "";
        dotElement.classList.add("offline");
        dotElement.classList.remove("online");
    }, 5000);

    imgCheck.onload = () => {
        clearTimeout(timeoutId);
        dotElement.classList.add("online");
        dotElement.classList.remove("offline");
    };

    imgCheck.onerror = () => {
        clearTimeout(timeoutId);
        dotElement.classList.add("offline");
        dotElement.classList.remove("online");
    };
}

// Individual function for Open WebUI using HEAD request approach
function checkAiStatus(url, dotElement) {
    const controller = new AbortController();

    const timeoutId = setTimeout(() => {
        controller.abort();
        dotElement.classList.add("offline");
        dotElement.classList.remove("online");
    }, 5000);

    const separator = url.endsWith('/') ? '' : '/';
    const cacheBusterUrl = url + separator + '?t=' + Date.now();

    fetch(cacheBusterUrl, { method: 'HEAD', signal: controller.signal })
        .then((response) => {
            clearTimeout(timeoutId);
            if (response.ok) {
                dotElement.classList.add("online");
                dotElement.classList.remove("offline");
            } else {
                dotElement.classList.add("offline");
                dotElement.classList.remove("online");
            }
        })
        .catch((err) => {
            clearTimeout(timeoutId);
            console.log(`${url} is unreachable:`, err);
            dotElement.classList.add("offline");
            dotElement.classList.remove("online");
        });
}

// Individual function for Copyparty using HEAD request approach
function checkCopypartyStatus(url, dotElement) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
        controller.abort();
        dotElement.classList.add("offline");
        dotElement.classList.remove("online");
    }, 5000);

    const separator = url.endsWith('/') ? '' : '/';
    const cacheBusterUrl = url + separator + '?t=' + Date.now();

    fetch(cacheBusterUrl, { method: 'HEAD', signal: controller.signal })
        .then((response) => {
            clearTimeout(timeoutId);
            if (response.ok) {
                dotElement.classList.add("online");
                dotElement.classList.remove("offline");
            } else {
                dotElement.classList.add("offline");
                dotElement.classList.remove("online");
            }
        })
        .catch((err) => {
            clearTimeout(timeoutId);
            console.log(`${url} is unreachable:`, err);
            dotElement.classList.add("offline");
            dotElement.classList.remove("online");
        });
}

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