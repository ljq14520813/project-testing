const {task,src,dest,watch,series,parallel} =require('gulp');
const load = require('gulp-load-plugins')();
const del=require('del');


//删除任务要另写，不能直接pipe里用del
task('del',async()=>{
    await del('./dist')
})

task('html',async()=>{
    src('./src/html/*.html')
    .pipe(dest('./dist/html'))
    .pipe(load.connect.reload())
})

task('img',async()=>{
    src('./src/imgs/*.*')
    .pipe(dest('./dist/imgs'))
    .pipe(load.connect.reload())
})

task('script',async()=>{
    src('./src/script/*.js')
    .pipe(load.babel({presets:['@babel/preset-env']}))
    .pipe(dest('./dist/script'))
    .pipe(load.connect.reload())
})

task('sass',async()=>{
    src('./src/sass/*.scss')
    .pipe(load.sassChina())
    .pipe(dest('./dist/css'))
    .pipe(load.connect.reload())
})

task('font',async()=>{
    src('./src/font/*.*')
    .pipe(dest('./dist/font'))
    .pipe(load.connect.reload())
})

task('base',async()=>{
    src('./src/*.*')
    .pipe(dest('./dist'))
    .pipe(load.connect.reload())
})

task('connect',async()=>{
    load.connect.server({
        root:'./dist',
        livereload:true,
        port:3000
    })
})

task('watch',async()=>{
    watch('./src/html/*.html',series('html'));
    watch('./src/sass/*.scss',series('sass'));
    watch('./src/script/*.js',series('script'));
    watch('./src/imgs/*.*',series('img'));
    watch('./src/font/iconfont.css',series('font'));
    watch('./src/*.*',series('base'));
})

//构建开发版本，启动项目
task('dev',series('del','html','img','script','sass','font','base','connect','watch'));