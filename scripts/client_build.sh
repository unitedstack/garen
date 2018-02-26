#!/bin/bash

cd $(dirname $0)

npm run dll

cd ../client

grunt clean:exceptDll

export language=zh-CN
node ../scripts/client_i18n_build.js && grunt js

export language=en
node ../scripts/client_i18n_build.js && grunt js

grunt rest
