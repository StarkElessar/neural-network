import gulp from 'gulp';
import del from 'del';
import zipPlugin from 'gulp-zip';

import { plugins } from './../config/plugins.js';
import { filePaths } from '../config/paths.js';

const zip = () => {
  del(`./${filePaths.projectDirName}.zip`);

  return gulp
    .src(`${filePaths.buildFolder}/**/*.*`, {})
    .pipe(plugins.handleError('ZIP'))
    .pipe(zipPlugin(`${filePaths.projectDirName}.zip`))
    .pipe(gulp.dest('./'));
};

export { zip };