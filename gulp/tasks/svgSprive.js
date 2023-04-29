import gulp from 'gulp';
import svgSprite from 'gulp-svg-sprite';

import { plugins } from './../config/plugins.js';
import { filePaths } from './../config/paths.js';

const svgSprive = () => {
  const spriteConfig = {
    mode: {
      stack: {
        sprite: `../icons/icons.svg`,
        // Создавать страницу с перечнем иконок
        example: true,
      },
    },
  };

  return gulp
    .src(filePaths.src.svgIcons, {})
    .pipe(plugins.handleError('SVG'))
    .pipe(svgSprite(spriteConfig))
    .pipe(gulp.dest(filePaths.build.images));
};

export { svgSprive };