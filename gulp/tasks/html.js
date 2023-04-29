import gulp from 'gulp';
import webpHtml from 'gulp-webp-html-nosvg';
import versionNumber from 'gulp-version-number';
import htmlMin from 'gulp-htmlmin';
import pug from 'gulp-pug';

import { plugins } from './../config/plugins.js';
import { filePaths } from './../config/paths.js';

import data from '../../src/static/data.json' assert { type: 'json' };
import { isBuild } from '../../gulpfile.js';

const html = () => {
  const pugOptions = {
    pretty: true, // Сжатие HTML файла
    verbose: true, // Показывать в терминале какой файл обработан
    locals: { data },
  };

  const htmlMinOptions = {
    useShortDoctype: true,
    sortClassName: true,
    //collapseWhitespace: isBuild, // Раскомментировать если нужно сжимать html на выходе
    removeComments: isBuild,
  };

  const versionNumberOptions = {
    value: '%DT%',
    append: {
      key: '_v',
      cover: 0,
      to: ['css', 'js'],
    },
    output: {
      file: 'gulp/version.json',
    },
  };

  return gulp
    .src(filePaths.src.html)
    .pipe(plugins.handleError('HTML'))
    .pipe(pug(pugOptions))
    .pipe(plugins.replace(/@img\//g, 'images/'))
    .pipe(plugins.if(isBuild, webpHtml()))
    .pipe(htmlMin(htmlMinOptions))
    .pipe(plugins.if(isBuild, versionNumber(versionNumberOptions)))
    .pipe(gulp.dest(filePaths.buildFolder))
    .pipe(plugins.browserSync.stream());
};

export { html };