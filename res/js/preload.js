(function (window) {
    const site_data_key = 'shc0743_data';
    var site_data = {};
    function UpdateSiteData(value = undefined) {
        if (value) {
            localStorage.setItem(site_data_key, JSON.stringify(site_data));
            return;
        }
        if (!localStorage.getItem(site_data_key))
            localStorage.setItem(site_data_key, '{}');
        try {
            site_data = JSON.parse(localStorage.getItem(site_data_key));
        }
        catch (err) {
            console.warn("Warning: An error occurred while parsing site config.\n" +
                "If this is the first time to see the warning, ignore the warning.\n" +
                "If the warning is repeated, a script on the website may have an error" +
                " or the website may be hijacked. Please check the JavaScript script and" +
                " vulnerabilities of the website, and then fix them.\n" +
                "Raw error info: ", err);
            localStorage.setItem(site_data_key, '{}');
        }
        site_data.update = UpdateSiteData;
    }
    UpdateSiteData();
    Object.defineProperty(window, 'site_data', {
        // get() {
        //     UpdateSiteData();
        //     return site_data;
        // },
        // set(value) {
        //     site_data = value;
        //     localStorage.setItem(site_data_key, JSON.stringify(site_data));
        // },
        value: site_data,
        writable: true,
        enumerable: true,
        configurable: true
    });
    if (!site_data.language) site_data.language =
        navigator.language || navigator.browserLanguage;
    window.getRandom = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
})(window.self);
