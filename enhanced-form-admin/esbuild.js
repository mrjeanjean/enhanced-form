require('esbuild').build({
    entryPoints: ['assets/admin.js'],
    bundle: true,
    outfile: 'public/js/admin.js',
    watch: true,
    define: {
        "process.env.NODE_ENV": JSON.stringify("development"),
    },
});
