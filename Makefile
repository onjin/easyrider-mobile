DEFAULT=help
PHONY=setup android android-install resources

help:
	@echo "setup             install required plugins"
	@echo "android           build android debug version"
	@echo "android-install   build and install android debug version"

setup:
	cordova plugin add org.apache.cordova.splashscreen
	cordova plugin add org.apache.cordova.dialogs
	cordova plugin add org.apache.cordova.geolocation

resources:
	ionic resources

android: resources
	ionic build android

android-install: android
	adb install -r ./platforms/android/build/outputs/apk/android-debug.apk
