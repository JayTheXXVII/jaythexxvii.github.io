// Function for status check with dependent status logic
function checkAiStatus(url, dotElement) {
    // Quick preliminary check using navigator.onLine
    if (!navigator.onLine) {
        dotElement.classList.add("offline");
        dotElement.classList.remove("online");
        return;
    }

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

                // If copyparty is online, force AI status to go online too
                if (url.includes("copyparty.xxvii.org")) {
                    const aiDot = document.querySelector('[data-status-url*="ai.xxvii.org"]');
                    if (aiDot) {
                        aiDot.classList.add("online");
                        aiDot.classList.remove("offline");
                    }
                }
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