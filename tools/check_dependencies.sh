#!/bin/bash

echo '
   _______________  ___    ____
  / ___/_  __/ __ \/   |  / __ \
  \__ \ / / / /_/ / /| | / /_/ /
 ___/ // / / _, _/ ___ |/ ____/
/____//_/ /_/ |_/_/  |_/_/ '

echo -e '\nStrap Kit Dependency Checker'
MISSINGDEPS=0
ANDROIDGOOD=1

show_error() {
    MISSINGDEPS=1
    red='\033[0;31m'
    NC='\033[0m' # No Color

    echo -e ${red}$1${NC}
}

green_highlight() {

    green='\033[0;32m'
    NC='\033[0m' # No Color
    echo -e ${green}$1 ${NC}
}


green_highlight "+ Checking CORE requirements (for strapkit)"
echo "==============================="
echo 'Checking git...'
(which git && green_highlight "`git --version`\ngit is installed"|| (show_error 'git was not found.'))
echo "==============================="
echo 'Checking NodeJS...'
(which node && green_highlight "`node --version`\nNode is installed" || (which nodejs && alias node=nodejs;echo 'Node is installed' `node --version` || (show_error 'node or nodejs were not found')))
echo "==============================="
echo 'Checking npm...'
(which npm && green_highlight "`npm --version`\nnpm is installed" || (show_error 'npm was not found.'))
echo "==============================="
echo 'Checking python...'
(which python && green_highlight "`python --version`Python is installed" || (show_error 'python was not found'))
echo "==============================="
green_highlight '+ Checking PLATFORM requirements (not required for strapkit to run, but required for platform builds)'
echo "==============================="
echo "==============================="
echo "     Pebble dependencies       "
echo "==============================="
echo 'Checking Pebble SDK'
(which pebble && green_highlight "Pebble SDK is installed.`pebble --version`" || (show_error 'Pebble SDK was not found'))
echo "==============================="
echo "  ANDROID WEAR dependencies    "
echo "==============================="
echo 'Checking adb'
(which adb && green_highlight "`adb version`\nadb is installed." || (show_error 'adb was not found.'))
echo "==============================="
echo 'Checking android'
(which android && green_highlight "android is installed." || (show_error '!!! android was not found.'))
echo "==============================="
echo 'Checking ANDROID_HOME env variable'
if [ "$ANDROID_HOME" ]; then green_highlight 'ANDROID_HOME is set.'; else show_error '!!! ANDROID_HOME is not set.'; fi
    echo "==============================="
    echo 'Checking JAVA_HOME env variable'
    if [ "$JAVA_HOME" ]; then green_highlight 'JAVA_HOME is set.'; else show_error '!!! JAVA_HOME is not set.'; fi

        echo "+++++++++++++++++++++++++++++++"
        echo "++++++      RESULTS      ++++++"
        echo "+++++++++++++++++++++++++++++++"
        ([ $MISSINGDEPS -ne 0 ] && show_error '!!! One or more dependencies were not found. Visit https://docs.straphq.com for more info on setting up the dependencies.' || echo 'Congrats, your machine is ready for some live action.')
        echo -e "\n"
