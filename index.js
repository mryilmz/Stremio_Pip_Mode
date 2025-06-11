const { addonBuilder } = require('stremio-addon-sdk');

const manifest = {
    id: 'org.stremio.pipmode',
    version: '1.0.0',
    name: 'PIP Mode',
    description: 'Stremio video player için Picture-in-Picture (PIP) modu ekler.',
    resources: ['stream'],
    types: ['movie', 'series'],
    idPrefixes: ['tt'],
    catalogs: [],
    logo: 'https://stremio.com/website/stremio-logo-small.png',
    background: '',
    contactEmail: '',
};

const builder = new addonBuilder(manifest);

// Stream resource örneği (PIP modunu tetiklemek için açıklama ekleniyor)
builder.defineStreamHandler(({ type, id }) => {
    // ... Mevcut stream logic ...
    return Promise.resolve({
        streams: [
            {
                title: 'PIP Modu ile İzle',
                url: 'https://pip-demo-url.com/stream', // Burada gerçek stream URL'si olmalı
                behaviorHints: {
                    notWebReady: false,
                    pipMode: true // Bu özel alan, istemci tarafında PIP desteği için kullanılabilir
                }
            }
        ]
    });
});

module.exports = builder.getInterface();

if (require.main === module) {
    require('stremio-addon-sdk').serveHTTP(builder.getInterface(), { port: process.env.PORT || 7000 });
    console.log('Stremio PIP Mode eklentisi çalışıyor: http://localhost:7000/manifest.json');
}
