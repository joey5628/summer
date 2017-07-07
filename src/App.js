import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Image,
  TouchableOpacity
} from 'react-native';
import packages from '../package.json'
import CodePush from "react-native-code-push";
import { codePushKey } from 'config'

@CodePush({ checkFrequency: CodePush.CheckFrequency.MANUAL })
export default class App extends Component {
    constructor (props) {
        super(props)
    }

    componentWillMount () {
        this.onButtonPress()
    }

    codePushStatusDidChange(syncStatus) {
        console.log('syncStatus:', syncStatus)
        console.log('CodePush.SyncStatus:', CodePush.SyncStatus)
        switch (syncStatus) {
            case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
                console.log("Checking for update.");
                break;
            case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
                console.log("Downloading package.");
                break;
            case CodePush.SyncStatus.AWAITING_USER_ACTION:
                console.log("Awaiting user action.");
                break;
            case CodePush.SyncStatus.INSTALLING_UPDATE:
                console.log("Installing update.");
                break;
            case CodePush.SyncStatus.UP_TO_DATE:
                console.log("App up to date.");
                break;
            case CodePush.SyncStatus.UPDATE_IGNORED:
                console.log("Update cancelled by user.");
                break;
            case CodePush.SyncStatus.UPDATE_INSTALLED:
                console.log("Update installed and will be applied on restart.");
                break;
            case CodePush.SyncStatus.UNKNOWN_ERROR:
                console.log("An unknown error occurred.");
                break;
        }
    }

    codePushDownloadDidProgress (progress) {
        console.log('progress:', progress)
    }

    onButtonPress() {
        CodePush.sync(
            {
                //根据不同的环境加载不同的key
                deploymentKey: codePushKey,
                updateDialog: {
                    appendReleaseDescription: true,
                    title: '热更新',
                    optionalUpdateMessage: '发现新版本，是否要更新！',
                    descriptionPrefix: "\n\n更新:\n",
                    optionalInstallButtonLabel: '安装更新',
                    optionalIgnoreButtonLabel: '忽略',
                },
                installMode: CodePush.InstallMode.IMMEDIATE
            },
            this.codePushStatusDidChange.bind(this),
            this.codePushDownloadDidProgress.bind(this)
        )
    }

    render () {
        return (
            <View style={styles.container}>
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <Text style={styles.title}>
                        code-push demo
                    </Text>
                    <Text style={styles.title}>
                        android我的版本是:{packages.version}
                    </Text>
                    <Image style={{width: 56, height: 56}} source={require('./imgs/22stockout.png')}></Image>
                </View>
                <View style={{flex: 1, justifyContent: 'flex-start'}}>
                    <TouchableOpacity onPress={this.onButtonPress.bind(this)}>
                        <View style={styles.btn}>
                            <Text style={{fontSize: 16, color: '#fff'}}>检查更新</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        margin: 20,
    },
    btn: {
        backgroundColor: '#24A8E8',
        width: 200,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4
    }
});
