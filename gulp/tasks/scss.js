import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';
import cleanCss from 'gulp-clean-css'; // Сжатие CSS файла
import webpCss from 'gulp-webpcss'; // Вывод WEBP изображений
import autoPrefixes from 'gulp-autoprefixer'; // Добавление вендорных префиксов
import groupCssMediaQueries from 'gulp-group-css-media-queries'; // Группировка медиа запросов

import { plugins } from './../config/plugins.js';
import { filePaths } from './../config/paths.js';
import { isBuild, isDev } from '../../gulpfile.js';

const sass = gulpSass(dartSass);

const scss = () => {
  const webpCssParams = {
    webpClass: '.webp',
    noWebpClass: '.no-webp',
  };

  const autoPrefixesOptions = {
    grid: true,
    overrideBrowserslist: ['last 3 versions'],
    cascade: true,
  };

  return (
    gulp
      .src(filePaths.src.scss, { sourcemaps: isDev })
      .pipe(plugins.handleError('SCSS'))
      .pipe(sass({ outputStyle: 'expanded' }))
      .pipe(plugins.replace(/@img\//g, '../images/'))
      .pipe(plugins.if(isBuild, groupCssMediaQueries()))
      .pipe(plugins.if(isBuild, webpCss(webpCssParams)))
      .pipe(plugins.if(isBuild, autoPrefixes(autoPrefixesOptions)))
      // Раскомментировать если нужен не сжатый дубль файла стилей
      // .pipe(gulp.dest(filePaths.build.css))
      .pipe(plugins.if(isBuild, cleanCss({ compatibility: 'ie8' })))
      .pipe(rename({ extname: '.min.css' }))
      .pipe(gulp.dest(filePaths.build.css))
      .pipe(plugins.browserSync.stream())
  );
};

export { scss };