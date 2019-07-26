function rplg_badge_init(el, name, root_class) {
    if (el.className.indexOf('rplg-badge') < 0) {
        while ((el = el.parentElement) && el.className.indexOf('rplg-badge') < 0);
    }

    var btn = el.querySelector('.wp-' + name + '-badge'),
        form = el.querySelector('.wp-' + name + '-form');

    if (!btn || !form) return;

    var wpac = document.createElement('div');
    wpac.className = root_class + ' wpac';

    if (btn.className.indexOf('-fixed') > -1) {
        wpac.appendChild(btn);
    }
    wpac.appendChild(form);
    document.body.appendChild(wpac);

    btn.onclick = function() {
        rplg_load_imgs(wpac);
        form.style.display='block';
    };
}

function rplg_load_imgs(el) {
    var imgs = el.querySelectorAll('img.rplg-blazy[data-src]');
    for (var i = 0; i < imgs.length; i++) {
        imgs[i].setAttribute('src', imgs[i].getAttribute('data-src'));
        imgs[i].removeAttribute('data-src');
    }
}

function rplg_next_reviews(name, pagin) {
    var parent = this.parentNode,
        selector = '.wp-' + name + '-review.wp-' + name + '-hide';
        reviews = parent.querySelectorAll(selector);
    for (var i = 0; i < pagin && i < reviews.length; i++) {
        if (reviews[i]) {
            reviews[i].className = reviews[i].className.replace('wp-' + name + '-hide', ' ');
            rplg_load_imgs(reviews[i]);
        }
    }
    reviews = parent.querySelectorAll(selector);
    if (reviews.length < 1) {
        parent.removeChild(this);
    }
    return false;
}

function rplg_leave_review_window() {
    _rplg_popup(this.getAttribute('href'), 620, 500);
    return false;
}

function _rplg_lang() {
    var n = navigator;
    return (n.language || n.systemLanguage || n.userLanguage ||  'en').substr(0, 2).toLowerCase();
}

function _rplg_popup(url, width, height, prms, top, left) {
    top = top || (screen.height/2)-(height/2);
    left = left || (screen.width/2)-(width/2);
    return window.open(url, '', 'location=1,status=1,resizable=yes,width='+width+',height='+height+',top='+top+',left='+left);
}

function _rplg_timeago(els) {
    for (var i = 0; i < els.length; i++) {
        var clss = els[i].className, time;
        if (clss.indexOf('google') > -1) {
            time = parseInt(els[i].getAttribute('data-time'));
            time *= 1000;
        } else if (clss.indexOf('facebook') > -1) {
            time = new Date(els[i].getAttribute('data-time').replace(/\+\d+$/, '') + '.000Z').getTime();
        } else {
            time = new Date(els[i].getAttribute('data-time').replace(/ /, 'T')).getTime();
        }
        els[i].innerHTML = WPacTime.getTime(time, _rplg_lang(), 'ago');
    }
}

function _rplg_init_blazy(attempts) {
    if (!window.Blazy) {
        if (attempts > 0) {
            setTimeout(function() { _rplg_init_blazy(attempts - 1); }, 200);
        }
        return;
    }
    window.rplg_blazy = new Blazy({selector: 'img.rplg-blazy'});
}

function _rplg_init_slider(el, data) {
    if (!window.Rplgsw) {
        return setTimeout(function() { _rplg_init_slider(el, data); }, 100);
    }
    if (el.className.indexOf('rplg-slider') < 0) {
        while ((el = el.parentElement) && el.className.indexOf('rplg-slider') < 0);
    }
    var swiperEl = el.querySelector('.rplgsw-container'),
        swiperData = {
            loop                : true,
            autoplay            : data.speed,
            slidesPerView       : data.count,
            spaceBetween        : 40,
            autoHeight          : true,
            nextButton          : el.querySelector('.rplg-slider-next'),
            prevButton          : el.querySelector('.rplg-slider-prev'),
            breakpoints         : {
              500: {
                slidesPerView: 1,
                spaceBetween: 10
              },
              800: {
                slidesPerView: data.count > 1 ? 2 : 1,
                spaceBetween: 20
              },
              1024: {
                slidesPerView: data.count,
                spaceBetween: 30
              }
            },
            onTransitionEnd     : function(swiper) {
                window.rplg_blazy && window.rplg_blazy.revalidate();
            }
        };

    if (data.pagin) {
        swiperData.paginationClickable = true;
        swiperData.pagination = '.rplgsw-pagination';
    }
    return new Rplgsw(swiperEl, swiperData);
}

function rplg_init_slider_theme(el, data) {
    _rplg_timeago(document.querySelectorAll('.rplg-slider [data-time]'));
    _rplg_init_blazy(5);
    _rplg_init_slider(el, data);
}

document.addEventListener('DOMContentLoaded', function() {
    _rplg_timeago(document.querySelectorAll('.wpac [data-time]'));
    _rplg_init_blazy(5);
});