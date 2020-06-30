#!/bin/bash

cp scripts/files/FingerprintDialog.java   node_modules/react-native-touch-id/android/src/main/java/com/rnfingerprint/
cp scripts/files/FingerprintHandler.java  node_modules/react-native-touch-id/android/src/main/java/com/rnfingerprint/
cp scripts/files/PasswordModal.js         node_modules/react-native-pay-password/lib/components
cp scripts/files/QRScanner.podspec        node_modules/react-native-qr-scanner
cp scripts/files/react.gradle             node_modules/react-native
cp scripts/files/build.gradle             node_modules/react-native-qr-scanner/android
rm -rf node_modules/react-native-skeleton-content-nonexpo/node_modules/react-native-reanimated