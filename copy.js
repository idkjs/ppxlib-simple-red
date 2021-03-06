#!/usr/bin/env node

// Modified from https://github.com/baransu/graphql_ppx_re/blob/eca4afaa0e979cd0d43c4d92fe5322aa0856092f/copyPlatformBinaryInPlace.js

const fs = require('fs');

let arch = process.arch;
let platform = process.platform;

if (arch === 'ia32') {
  arch = 'x86';
}

if (platform === 'win32') {
  platform = 'win';
}

const esyBuild = 'Bin';
if (fs.existsSync(esyBuild)) {
    console.log(fs.existsSync(esyBuild))

  copyBinary(esyBuild, '../Bin.exe');
} else {
  const esyBuild = '_build/default/bin/Bin.exe';
  console.log(fs.existsSync(esyBuild))
  copyBinary(esyBuild, './ppx.exe');
}

function copyBinary(src, dst) {
  const supported = fs.existsSync(src);

  if (!supported) {
    console.error(`\
SimplePpx does not support this platform :(
SimplePpx comes prepacked as built binaries to avoid large
dependencies at build-time.

If you want SimplePpx to support this platform natively,
please open an issue at our repository, linked above. Please
specify that you are on the ${platform} platform,');
on the ${arch} architecture.`);
    process.exit(1);
  }

  if (!fs.existsSync(dst)) {
    fs.copyFileSync(src, dst);
    fs.chmodSync(dst, 0755);
  }
}
