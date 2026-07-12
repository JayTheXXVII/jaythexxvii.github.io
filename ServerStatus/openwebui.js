// Individual function for Open WebUI using HEAD request approach with navigator.onLine check
function checkcopypartyStatus(url, dotElement) {
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