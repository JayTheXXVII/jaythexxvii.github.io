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