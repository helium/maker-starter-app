# Android Local Build

## OS
Ubuntu 20.04 x64

## Install Node.js 14
```shell
curl -sL https://deb.nodesource.com/setup_14.x | sudo bash -
sudo apt -y install nodejs
node  -v
```

## Install yarn
```shell
sudo apt -y install gcc g++ make
curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt update && sudo apt install yarn
yarn -v
```

## Install Watchman
https://facebook.github.io/watchman/docs/install.html
```shell
wget https://github.com/facebook/watchman/releases/download/v2022.02.21.00/watchman-v2022.02.21.00-linux.zip
unzip watchman-v2022.02.21.00-linux.zip
cd watchman-v2022.02.21.00-linux/
sudo mkdir -p /usr/local/{bin,lib} /usr/local/var/run/watchman
sudo cp bin/* /usr/local/bin
sudo cp lib/* /usr/local/lib
sudo chmod 755 /usr/local/bin/watchman
sudo chmod 2777 /usr/local/var/run/watchman
```

## Install React Native CLI
```shell
npm install -g react-native-cli
```

## Install Oracle JDK 8
Download Oracle JDK 8 Linux x64 Compressed Archive [jdk-8u321-linux-x64.tar.gz](https://www.oracle.com/java/technologies/downloads/#java8).
```shell
sudo mkdir -p /usr/lib/jvm
sudo tar zxvf jdk-8u321-linux-x64.tar.gz -C /usr/lib/jvm
sudo update-alternatives --install "/usr/bin/java" "java" "/usr/lib/jvm/jdk1.8.0_321/bin/java" 1
sudo update-alternatives --set java /usr/lib/jvm/jdk1.8.0_version/bin/java
java -version
```

## Install Android Studio
https://developer.android.com/studio/index.html

## Install Android SDK
Android SDKs can be installed through the SDK Manager in Android Studio.

Select the "SDK Platforms" tab from within the SDK Manager, then check the box next to "Show Package Details" in the bottom right corner. Look for and expand the Android 28 entry, then make sure the following items are all checked:

- Google APIs
- Android SDK Platform 28
- Intel x86 Atom_64 System Image
- Google APIs Intel x86 Atom_64 System Image

Next, select the "SDK Tools" tab and check the box next to "Show Package Details" here as well. Look for and expand the "Android SDK Build-Tools" entry, then make sure that 30.0.1, 29.0.3, and 28.0.3 are selected.

Finally, click "Apply" to download and install the Android SDK and related build tools.

## Configure environment variables
Add the following lines to your $HOME/.bashrc config file.
```shell
export JAVA_HOME=/usr/lib/jvm/jdk1.8.0_321

export ANDROID_HOME=$HOME/Android/Sdk
export ANDROID_SDK_ROOT=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```
Load the config into your current shell.
```shell
source ~/.bashrc
```

## Setting the project
```shell
git clone https://github.com/NebraLtd/maker-starter-app.git
cd maker-starter-app/
cp .env.sample .env
yarn install
```

## Running the project on Android
Connect your Android Phone to the computer or run the Android Virtual Device.
- Start Metro
```shell
react-native start
```
- Start Application
```shell
react-native run-android
```

## Troubleshooting
- While starting the React Native Application, we may face Java Compile error. 
This is because the local cache of the gradle dependencies are broken. 
We can fix broken gradle dependencies by clearing it.
    ```shell
    rm -r $HOME/.gradle/caches/
    ```
- Watchman may complain that there are too many files to watch in the project directory.
  We can increase the amount of inotify watchers.
    ```shell
    echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
    ```

