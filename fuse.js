const path = require('path');
const fs = require('fs-extra');
const del = require('del');
const {
  CSSModulesPlugin,
  CSSPlugin,
  CopyPlugin,
  FuseBox,
  PostCSS,
  Sparky,
  WebIndexPlugin,
  JSONPlugin,
  QuantumPlugin,
  SassPlugin,
  EnvPlugin,
  ReplacePlugin,
  BabelPlugin
} = require('fuse-box');

const env = require('./env.json');
const pkg = require('./package.json');
const DEV_PORT = 4445;
const isProduction = process.env.NODE_ENV === 'production';
const IMAGE_ASSETS = ['*.jpg', '*.png', '*.jpeg', '*.gif', '*.svg'];

Sparky.task('clean-cache', () => {
  if (fs.existsSync(path.resolve(__dirname, '.fusebox'))) {
    del.sync('.fusebox', { force: true });
    console.log('cache cleared');
  }
});
Sparky.task('copy-assets', () => {
  return fs.copy(
    path.resolve(__dirname, 'src/assets'),
    path.resolve('dist/assets')
  );
});

Sparky.task('copy-sw', () => {
  return Sparky.src('src/sw-register.js')
    .file('sw-register.js', file => {
      file.setContent(fs.readFileSync(file.filepath, { encoding: 'utf8' }));
    })
    .dest(`dist/$name`)
    .exec();
});
Sparky.task('copy-fontawesome', async () => {
  return fs
    .copy(
      path.resolve(__dirname, 'node_modules/font-awesome/fonts'),
      path.resolve(__dirname, 'dist/assets/fonts')
    )
    .then(() => {
      return fs.copy(
        path.resolve(__dirname, 'node_modules/font-awesome/css'),
        path.resolve(__dirname, 'dist/assets/css')
      );
    });
});

Sparky.task(
  'build:browser',
  ['copy-sw', 'clean-cache', 'copy-assets', 'copy-fontawesome'],
  async () => {
    // setup the producer with common settings
    const fuse = FuseBox.init({
      homeDir: path.resolve(__dirname),
      output: `dist/$name.js`,
      target: 'browser@es2015',
      log: true,
      cache: !isProduction,
      sourceMaps: true,
      useTypescriptCompiler: true,
      plugins: [
        WebIndexPlugin({
          title: pkg.productName,
          author: pkg.author.name,
          description: pkg.description,
          appendBundles: true,
          templateString: fs
            .readFileSync(
              path.resolve(__dirname, 'public', 'index.html'),
              'utf-8'
            )
            .replace(
              '<!-- GOOGLE_MAP_SCRIPT -->',
              `<script src="https://maps.googleapis.com/maps/api/js?sensor=false&v=3&libraries=geometry&key=${
                env.gmapApiKey
              }"></script>`
            )
            .replace(
              '<!-- CSS_BUNDLE -->',
              isProduction ? `<link rel="stylesheet" href="/style.css" />` : ''
            )
        }),
        JSONPlugin(),
        EnvPlugin({
          NODE_ENV: process.env.NODE_ENV,
          GMAP_API_KEY: process.env.GMAP_API_KEY,
          GMAIL_USER: env.gmailUser,
          GMAIL_PASSWORD: env.gmailPassword,
          FIREBASE_API_KEY: env.apiKey,
          FIREBASE_PROJECT_ID: env.projectId,
          FIREBASE_DATABASE_URL: env.databaseURL,
          FIREBASE_AUTH_DOMAIN: env.authDomain,
          FIREBASE_STORAGE_BUCKET: env.storageBucket
        }),
        // BabelPlugin({
        //   config: {
        //     presets: ['react-app'],
        //     plugins: ['named-asset-import']
        //   }
        // }),
        isProduction &&
          QuantumPlugin({
            target: 'browser',
            treeshake: true,
            replaceTypeOf: false,
            css: true,
            // removeExportsInterop: true,
            uglify: isProduction
          })
      ]
    });
    // start the hot reload server
    if (!isProduction) {
      fuse.dev({ port: DEV_PORT, open: true });
    }

    const Copy = CopyPlugin({
      useDefault: false,
      files: IMAGE_ASSETS,
      dest: 'assets/',
      resolve: 'assets/'
    });
    if (!isProduction) {
      fuse
        .bundle('vendor')
        .plugin(Copy)
        .instructions('~ src/index.js')
        .watch('src**');
      fuse
        .bundle('app')
        .plugin(Copy)
        .plugin(
          SassPlugin({ importer: true }),
          PostCSS(),
          CSSModulesPlugin({ scopedName: '[local]' }),
          CSSPlugin()
        )
        .instructions('> [src/index.js] +fuse-box-css')
        .watch('src**')
        .hmr();
    } else {
      fuse.bundle('vendor').instructions('~ src/index.js');
      fuse
        .bundle('app')
        .plugin(Copy)
        .plugin(
          SassPlugin({ importer: true }),
          PostCSS(),
          CSSModulesPlugin({ scopedName: '[local]' }),
          CSSPlugin({
            group: 'style.css',
            outFile: 'dist/style.css',
            inject: true
          })
        )
        .plugin(
          ReplacePlugin({
            'process.env.FIREBASE_API_KEY': `"${env.apiKey}"`,
            'process.env.FIREBASE_AUTH_DOMAIN': `"${env.authDomain}"`,
            'process.env.FIREBASE_DATABASE_URL': `"${env.databaseURL}"`,
            'process.env.FIREBASE_PROJECT_ID': `"${env.projectId}"`,
            'process.env.FIREBASE_STORAGE_BUCKET': `"${env.storageBucket}"`,
            'process.env.GMAIL_USER': `"${env.gmailUser}"`,
            'process.env.GMAIL_PASSWORD': `"${env.gmailPassword}"`
          })
        )
        .instructions('> [src/index.js] +fuse-box-css');
    }
    await fuse.run();
  }
);

Sparky.task('default', ['build:browser']);
