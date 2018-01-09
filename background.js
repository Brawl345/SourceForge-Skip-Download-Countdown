function rewriteHeader(requestDetails) {
    for (var header of requestDetails.requestHeaders) {
        if (header.name.toLowerCase() === "user-agent") {
            header.value = 'Wget';
        }
        if (header.name.toLowerCase() === "referer") {
            var index = requestDetails.requestHeaders.indexOf(header);
            if (index > -1) {
                requestDetails.requestHeaders.splice(index, 1);
            }
        }
    }
    return {
        requestHeaders: requestDetails.requestHeaders
    };
}

// replace "chrome" with "browser" to make it work in Edge
chrome.webRequest.onBeforeSendHeaders.addListener(
    rewriteHeader, {
        urls: ["*://sourceforge.net/projects/*/files/*/download*"],
        types: ["main_frame"]
    }, ["blocking", "requestHeaders"]
);