window.translate_location = "en-US";
window.translate_location_fetch3 =
    fetch("res/tr/translate_location.json").then(function (v) { return v.json(); })
    .then(function (v) {
        window.translate_location = v[site_data.language] ? v[site_data.language] : v['en-US'];
        return translate_location;
    });
