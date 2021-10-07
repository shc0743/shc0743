function getScrollbarWidth(el = null) {
    if (el) {
        return el.offsetWidth - el.clientWidth;//相减
    }
    var odiv = document.createElement('div'),//创建一个div
        styles = {
            width: '100px',
            height: '100px',
            overflowY: 'scroll'//让她有滚动条
        }, i, scrollbarWidth;
    for (i in styles) odiv.style[i] = styles[i];
    document.body.appendChild(odiv);//把div添加到body中
    var scrollbarWidth = odiv.offsetWidth - odiv.clientWidth;//相减
    odiv.remove();//移除创建的div
    return scrollbarWidth;//返回滚动条宽度
}
(function(){
    document.querySelector('main').style.top = nav_bar.clientHeight + 'px';
    top_lang_change_bar.style.width = document.documentElement.clientWidth - 20 -
        getScrollbarWidth() + 'px';
    top_lang_change_bar.oncontextmenu = function (e) {
        e.preventDefault();
        let el = top_lang_change_bar.querySelector('div.no-show-again');
        if (el) el.hidden = false;
    }
    let top_lang_change_bar_nsa = top_lang_change_bar.querySelector('div.no-show-again');
    if (top_lang_change_bar_nsa)
        top_lang_change_bar_nsa.onclick = function () {
            site_data.top_lang_change_bar_hide = true;
            site_data.update(true);
            this.parentElement.remove();
            return false;
        }
    if (site_data.top_lang_change_bar_hide) top_lang_change_bar.remove();
})()

window.addEventListener('DOMContentLoaded', function () {
    let img_icon = document.documentElement.querySelector
        ('body nav#nav_bar a:nth-child(1) img');
    let img_icon_ = document.documentElement.querySelector
        ('body nav#nav_bar a:nth-child(2)');
    if(img_icon && img_icon_){
        img_icon.setAttribute('width',img_icon_.clientHeight);
        img_icon.setAttribute('height',img_icon_.clientHeight);
    }
})

translate_location_fetch3.then(function (loc) {
    // var loc = translate_location;
    function errhandle(e) {
        console.error("Error while fetch translate: ", e);
        errdlg_at_fetch_translate.querySelector('div textarea').value = e;
        errdlg_at_fetch_translate.querySelector('div button.a').onclick = function () {
            window.close();
        }
        errdlg_at_fetch_translate.querySelector('div button.r').onclick = function () {
            location.reload();
        }
        errdlg_at_fetch_translate.querySelector('div button.i').onclick = function () {
            CreateDialogEx.remove(errdlg_at_fetch_translate);
        }
        CreateDialog(errdlg_at_fetch_translate, true);
    }

    document.documentElement.setAttribute('lang', site_data.language);

    fetch(loc + "index.html.json").then(function (d) {
        return d.json();
    }, errhandle).then(function (data) {
        const vue_obj = {
            data() {
                return data;
            }
        };
        Vue.createApp(vue_obj).mount("main");
    }, errhandle);

    fetch(loc + "index.html.main%23div_show_README.html").then(function (d) {
        return d.text();
    }, errhandle).then(function (v) {
        document.querySelector('#div_show_README').innerHTML = v;
        if (top_lang_change_bar)
            top_lang_change_bar.style.width = document.documentElement.clientWidth - 20 -
                getScrollbarWidth(document.querySelector('main')) + 'px';
    }, errhandle);

    fetch(loc + "index.html.nav%23nav_bar.json").then(function (d) {
        return d.json();
    }, errhandle).then(function (data) {
        const vue_obj = {
            data() {
                return data;
            }
        };
        Vue.createApp(vue_obj).mount("nav#nav_bar");
    }, errhandle);

});

window.addEventListener('hashchange', window._m_hash_change_handler = function () {
    var hash = location.hash.substr(1);
    if (!hash || hash.length < 1 || hash[0] != '/') {
        location.hash = '/'; return;
    }
    if (hash.substr(0, 9) == '/settings') {
        if (!settings_dialog.fetched) {
            fetch(translate_location + "index.html.div%23settings_dialog.json")
            .then(function (d) { return d.json(); })
            .then(function (data) {
                const vue_obj = {
                    data() {
                        return data;
                    }
                };
                Vue.createApp(vue_obj).mount("div#settings_dialog_sub1");
                settings_dialog.fetched = true;
            });
        }
        if (hash == '/settings' || hash == '/settings/') {
            location.hash = '/settings/common/'; return;
        }
        if (hash == '/settings/common' || hash == '/settings/common/'
            || hash.substr(0, 17) == '/settings/common/') {
            CreateDialog(settings_dialog);
            return;
        }
        location.href = './'; return;
    }
})
translate_location_fetch3.then(new Function(
    `window.addEventListener('load',_m_hash_change_handler)`));
