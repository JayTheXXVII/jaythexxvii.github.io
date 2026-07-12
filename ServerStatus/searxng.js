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
