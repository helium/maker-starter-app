# Maker Starter App

## Getting Started

### App Setup

1. First add your environment variables. See the [installing](#Installing) section below for more detail on how to do so.
   1. You will need a [Mapbox](https://docs.mapbox.com/help/getting-started/access-tokens/) API key to show the map for Hotspot onboarding.
   2. You will need a [Google](https://developers.google.com/maps/documentation/javascript/get-api-key) API key for address and location search.
2. Rename your application using [React Native Rename](https://github.com/junedomingo/react-native-rename). You will want to pass in the custom bundle identifier for [Android](https://developer.android.com/studio/build/configure-app-module#set_the_application_id) and also change it manually for [iOS](https://developer.apple.com/documentation/appstoreconnectapi/bundle_ids).
3. Update your theme colors in [theme.ts](src/theme/theme.ts). The theme controls the look of the application.
4. Add your Hotspot and Antenna data in the [makers](src/makers) folder. See the [Makers README](src/makers/README.md) for more detail.
5. You will need to update your App Scheme for any deep linking. There are guides for both [iOS](https://developer.apple.com/documentation/xcode/defining-a-custom-url-scheme-for-your-app) and [Android](https://developer.android.com/training/app-links/deep-linking).
6. The basics of the [Helium React Native SDK](https://github.com/helium/react-native-helium) and [Helium Blockchain API](https://docs.helium.com/api/blockchain/introduction/) have been integrated into this starter app. Review the docs to learn more.

### React Native Dev Setup

If you have already set up react native on your machine, skip to the [installing](#Installing) section.

#### React Native dependencies

You will need Node, Watchman, Yarn, the React Native command line interface, Android Studio, and Xcode.

While you can use any editor of your choice to develop your app, you will need to install Xcode and Android Studio in order to set up the necessary tooling to build your React Native app for iOS and Android.

A good free editor is [Visual Studio Code](https://code.visualstudio.com/).

#### Node, Watchman, Yarn

We recommend installing Node, Yarn, and Watchman using [Homebrew](http://brew.sh/). Run the following commands in a Terminal after installing Homebrew:

```
brew install node
brew install watchman
brew install yarn
```

If you have already installed Node on your system, make sure it is up to date with the LTS version.

Watchman is a tool by Facebook for watching changes in the filesystem. It is highly recommended you install it for better performance.

#### The React Native CLI

Node comes with npm, which lets you install the React Native command line interface.

Run the following command in a Terminal:

```
npm install -g react-native-cli
```

If you get an error like Cannot find module 'npmlog', try installing npm directly:

```
curl -0 -L https://npmjs.org/install.sh | sudo sh.
```

### Environment Variables

1. Copy the file `.env.sample` and rename it to `.env`.
2. Once renamed update the values within the file.
3. In order for maps to load you will need to create your own [Mapbox](https://account.mapbox.com) access token.

### Dependencies

Install 3rd party dependencies

```
yarn install
```

### Running Project on IOS

#### Xcode

The easiest way to install Xcode is via the [Mac App Store](https://itunes.apple.com/us/app/xcode/id497799835?mt=12). Installing Xcode will also install the iOS Simulator and all the necessary tools to build your iOS app.

If you have already installed Xcode on your system, make sure it is up to date.

#### Command Line Tools

You will also need to install the Xcode Command Line Tools. Open Xcode, then choose "Preferences..." from the Xcode menu. Go to the Locations panel and install the tools by selecting the most recent version in the Command Line Tools dropdown.

#### Dependencies

You need to install [cocoapods](https://cocoapods.org/) for iOS. CocoaPods manages library dependencies for your Xcode projects.

```
sudo gem install cocoapods
```

Then install the pods for iOS

```
yarn pod-install
```

If the app is not working you may want to clean your workspace and then follow the running the app section below

```
yarn clean-install
yarn clean-start
```

#### Running The App

The fastest way to run the app is on the iOS simulator. Just type:

```
yarn ios
```

You can also open the `MakerApp.xcworkspace` file in the `/ios` folder using xcode and run the app on your device or any other simulator.

To run the app on a specific device, type:

```
yarn ios --device "Device Name"
```

To build a release version of the app:

```
yarn ios --configuration=release
```

#### Building and distributing to App store with Xcode

To distribute your app on the App Store with Xcode, a few steps are required.
App signing is done automatically.

##### Uploading App to App Store for the first time

Before you can upload a build of your app to App Store Connect, you must first create an app record in your [App Store Connect account](https://appstoreconnect.apple.com/).

1. From My Apps, click the Add button (+) in the top-left corner.

2. The My Apps page is blank until you create your first app record.

3. From the pop-up menu, select New App.

4. In the New App dialog, select one or more platform(s) and enter the app information. The bundle ID should match that of the app you want to deploy.

5. Under User Access, choose Limited Access or Full Access. If you choose Limited Access, select the users that you would like to be able to access this app.

6. Click Create, and look for messages that indicate missing information.

##### Building

To build the app for distribution:

1. In Xcode first go to Product
2. Go to Scheme
3. Go to Edit scheme
4. Change the Build configuration to Release

##### Archiving

To release the app, you first need to create an archive.

1. In Xcode go to Product
2. Click on Archive
3. After the archive builds successfully, a new window will be opened with a list of all archives. The topmost one is what you just built.

##### Distribution

1. With the archive selected, click on the Distribute App button on the right.
2. This will launch a wizard for selecting distribution method.
3. Since you want to distribute the app to App Store, select "App Store Connect" and click on next.
4. Within the "Select a destination" wizard, "upload" and click on next.
5. In the next sheet, choose a signing option, then click Next. More on Distribution signing options can be found [here](https://help.apple.com/xcode/mac/current/#/devff5ececf8)
6. If you are missing a required distribution certificate, follow the instructions in the next sheet to create it.
7. Review the signing certificate, provisioning profile, and entitlements.
8. Click Upload.

##### TestFlight

The TestFlight app allows testers to install and beta test your app on iOS, tvOS, and watchOS devices. Testers must receive an invite directly from you before they can begin testing with TestFlight. Once testers accept your invitation, they can install, test, send feedback, and get updates of your beta app.

TestFlight can be used on App Store Connect after your build has been uploaded.

##### App Store

1. Choose your build.
2. Set pricing and availability
3. Submit your app for review. Before you submit an app, enter all the [required metadata](https://help.apple.com/itunes-connect/developer/#/devfc3066644) and choose if you want to release your app manually or automatically.

#### Possible Issues

##### 1. There are no accounts registered with Xcode.

Error message "There are no accounts registered with Xcode. Add your developer account to Xcode" gets returned when no developer account has been set up in Xcode.

#####[Solution]

1. Open Xcode.
2. Go to Preferences
3. Go to Accounts tab then add your account with the + sign.

##### 2. No profiles for 'com.maker.makerapp' were found.

Error message "No profiles for 'com.maker.makerapp' were found: Xcode couldn't find any iOS App Development provisioning profiles matching 'com.maker.makerapp'." could be returned when no provisioning profile have been set for the bundle in xcode.

#####[Solution]

1. Open Xcode.
2. Go to Signing and Capabilities
3. Under Team, select your developer account/ Apple ID.

#### 3. Could not get the simulator list from Xcode

This error message gets returned when no simulator or device is detected.

#####[Solution]
Ensure that you have an ios simulator running, or you have an ios device plugged in.
Use the command below to check for available devices or simulators.
`xcrun simctl list --json devices`

#### 4. Failed to install the app on the device because we couldn't execute the "ios-deploy" command

This may be as a result of attempting to run the app on an IOS physical device such as iPhone without having "ios-deploy" installed.

#####[Solution]
Install ios-deploy
`npm install -g ios-deploy`

#### 5. Unable to launch com.maker.makerapp because it has an invalid code signature, inadequate entitlements or its profile has not been explicitly trusted by the user.

You may need to trust the app on your IOS device.

#####[Soultion]

1. On your IOS device, go to Settings
2. Go to General
3. Go to Device Management
4. You will see a profile for the developer. Tap the name of the developer profile to establish trust.

### Running Project on Android

#### Java Development Kit

React Native requires the Java SE Development Kit (JDK).
Download and install [JDK 11](https://www.oracle.com/java/technologies/downloads/#java11) (versions 8-14 are supported).

##### Install JDK on MacOS

- Download OpenJDK from [Temurin](https://adoptium.net/?variant=openjdk11&jvmVariant=hotspot.
- If you have several JDKs, you can select Temurin by disabling all others with the instructions below.

```
Leave all JDKs at their default location, under /Library/Java/JavaVirtualMachines. The system will pick the highest version by default.
To exclude a JDK from being picked by default, rename its Contents/Info.plist to Info.plist.disabled.
That JDK can still be used when $JAVA_HOME points to it, or explicitly referenced in a script or configuration.
It will simply be ignored by system's java command.
```

#### Android development environment

Setting up your development environment can be somewhat tedious if you're new to Android development. If you're already familiar with Android development, there are a few things you may need to configure. In either case, please make sure to carefully follow the next few steps.

##### 1. Install Android Studio

[Download and install Android Studio](https://developer.android.com/studio/index.html). Choose a "Custom" setup when prompted to select an installation type. Make sure the boxes next to all of the following are checked:

- Android SDK
- Android SDK Platform
- Performance (Intel ® HAXM)
- Android Virtual Device

Then, click "Next" to install all of these components.

If the checkboxes are grayed out, you will have a chance to install these components later on.
Once setup has finalized and you're presented with the Welcome screen, proceed to the next step.

##### 2. Install the Android SDK

Android Studio installs the latest Android SDK by default. Building a React Native app with native code, however, requires the Android 28 SDK in particular. Additional Android SDKs can be installed through the SDK Manager in Android Studio.

The SDK Manager can be accessed from the "Welcome to Android Studio" screen. Click on "Configure", then select "SDK Manager".

Select the "SDK Platforms" tab from within the SDK Manager, then check the box next to "Show Package Details" in the bottom right corner. Look for and expand the Android 28 entry, then make sure the following items are all checked:

- Google APIs
- Android SDK Platform 28
- Intel x86 Atom_64 System Image
- Google APIs Intel x86 Atom_64 System Image

Next, select the "SDK Tools" tab and check the box next to "Show Package Details" here as well. Look for and expand the "Android SDK Build-Tools" entry, then make sure that 30-rc1, 29.0.3, and 28.0.3 are selected.

Finally, click "Apply" to download and install the Android SDK and related build tools.

##### 3. Configure the ANDROID_HOME environment variable

The React Native tools require some environment variables to be set up in order to build apps with native code.

Add the following lines to your \$HOME/.bash_profile config file:

```
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

#### Android

Similar to iOS, run

```
yarn android
yarn android --deviceId <deviceId>
```

You can also open the Android project in Android Studio by selecting `open an existing project` and selecting the `/android` folder.
