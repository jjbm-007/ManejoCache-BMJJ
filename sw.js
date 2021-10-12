const CACHE_NAME = 'cache-v1';

const CACHE_STATIC_NAME = 'static-v1';
const CACHE_DYNAMIC_NAME = 'dynamic-v1';
const CACHE_INMUTABLE_NAME = 'inmutable-v1'


var cleanCache = (cacheName, sizeItems) => {
    caches.open(cacheName)
        .then(cache => {
            cache.keys().then(keys => {
                //console.log(keys);
                if (keys.length >= sizeItems) {
                    cache.delete(keys[0]).then(()=>{
                        cleanCache(cacheName, sizeItems)}
                    );
                }
            });
        });
}

self.addEventListener('install', event => {
    
    // Crear el cache y almacenar nuestro APPSHELL
    const promesaCache = caches.open(CACHE_STATIC_NAME)
        .then(cache => {
            return cache.addAll([
                '/',
                'index.html',
                'css/page.css',
                'img/inicio.jpg',
                'js/app.js'
            ]);
        });
    
    // Archivos que no serán modificados 
    const promInmutable = caches.open(CACHE_INMUTABLE_NAME)
        .then(cacheInmutable => {
            return cacheInmutable.addAll([
                'https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css'
            ]);
        });

    event.waitUntil(Promise.all([promesaCache, promInmutable]));
});

self.addEventListener('fetch', event => {

    //2.- Cache with network fallback
    // Primero va a buscar en cache y si no lo encuentra va a la RED
   const respuestaCache = caches.match(event.request)
        .then(resp => {
            // Si mi request existe en cache
            if(resp){
                // Respondemos con cache
                return resp;
            }
            console.log("No está en cache: "+event.request.url);
            // Voy a la red
            return fetch(event.request)
                .then(respNet => {
                    // Abro mi cache
                    caches.open(CACHE_DYNAMIC_NAME)
                        .then(cache => {
                            // Guardo la respuesta de la re en cache
                            cache.put(event.request , respNet).then(() => {
                                cleanCache(CACHE_DYNAMIC_NAME,5)} 
                            );
                        });
                    // Respondo con el response de la red
                    return respNet.clone();
                });
        });

    event.respondWith(respuestaCache);

    // 1.- Only cache
    //event.respondWith(caches.match(event.request));
});