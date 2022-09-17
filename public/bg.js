chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.create) {
        chrome.tabs.create(request.create);
    } else if (request.focus) {
        chrome.windows.update(sender.tab.windowId, {"focused": true}, function(window){ });
        chrome.tabs.update(sender.tab.id, {"active": true}, function(tab){ });
    }
});