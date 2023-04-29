import { plugins } from './../config/plugins.js';
import { filePaths } from './../config/paths.js';

const server = (done) => {
  plugins.browserSync.init({
    server: {
      baseDir: filePaths.buildFolder,
    },
    notify: false,
    port: 3000,
  });
};

export { server };