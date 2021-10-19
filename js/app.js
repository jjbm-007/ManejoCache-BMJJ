let swDirect = '/20213-PWA-U2-P5-JJBM/sw.js';

if (navigator.serviceWorker) {
    console.log('SW DISPONIBLE');
    if (url.includes('localhost')) {
        swDirect = '/sw.js'
    }
    navigator.serviceWorker.register(swDirect);
}

/*
if (window.caches) {
    console.log('Tenemos cache');
    caches.open('Test');
    caches.open('Test-v2');

    caches.has('Test')
        .then((result) => {
            console.log(result);
        });

    caches.open('cache-v1')
        .then((cache) => {
            //cache.add('/index.html')
            cache.addAll([
                '/index.html',
                '/css/page.css',
                '/img/inicio.jpg',
                'https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css'

            ]).then(() => {
                // cache.delete('/css/page.css')
                cache.put('index.html', new Response('Actualizado desde cache'))
            });

            cache.match('index.html')
                .then(res => {
                    res.text().then(text => console.log(text))
                    console.log(res);
                });

            caches.keys().then(keys => console.log(keys));

        });
}
*/