const {task,src,dest,watch,series,parallel} = require('gulp');
const load=require('gulp-load-plugins')();
const del=require('del');

// task('build',async()=>{
//     src('./src/script/index.js')
//     .pipe(load.rev())//生成带哈希值的文件名
//     .pipe(dest('./dist/script'))
//     .pipe(load.rev.manifest())//   生成记录版本号的json文件
//     .pipe(dest('./rev/js'))
// })

//build是为了打包一份出来，不用写自动刷新


async function delDist(){
    await del('./dist');
}

async function img(){
    src('./src/imgs/*.*')
    .pipe(dest('./dist/imgs'))
}

async function script(){
    src('./src/script/*.js')
    .pipe(load.babel({presets:['@babel/preset-env']}))
    .pipe(load.uglify())
    .pipe(load.rev())// 给文件后面添加哈希值
    .pipe(dest('./dist/script'))
    .pipe(load.rev.manifest())//生成记录版本号的json文件
    .pipe(dest('./rev/js'))
}

async function sass(){
    src('./src/sass/*.scss')
    .pipe(load.sassChina())
    .pipe(load.minifyCss())
    .pipe(load.rev())
    .pipe(dest('./dist/css'))
    .pipe(load.rev.manifest())
    .pipe(dest('./rev/css'))
}

async function font(){
    src('./src/font/*.*')
    .pipe(dest('./dist/font'))
    .pipe(load.connect.reload())
}

async function base(){
    src('./src/*.*')
    .pipe(dest('./dist'))
    .pipe(load.connect.reload())
}


//  因为实际过程中该方法通常比较慢，因此要用promise一起辅助完成.
// async function html(){
//     src('./rev/**/*.json','./src/html/*.html')
//     .pipe(load.revCollector({
//         replaceReved:true,//根据之前生成的json文件替换原来的路径为哈希路径

//     }))
//     .pipe(load.minifyHtml())
//     .pipe(dest('./dist/html'))
// }


//  gulp-rev 生成带哈希值的版本号文件，解决缓存问题
//  gulp-rev-collector 用哈希路径替换原路径

async function html(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve();
            src(['./rev/**/*.json','./src/html/*.html'])
            .pipe(load.revCollector({
                replaceReved: true//根据之前生成的json文件，替换原来的哈希路径
            }))
            .pipe(dest('./dist/html'))
            .pipe(load.minifyHtml())
            .pipe(dest('./dist/html'))
        },2000)
    })
}

//构建生产环境代码
task('build',async()=>{
    await delDist();
    await img();
    await script();
    await sass();
    await html();
    await font();
    await base();
})
