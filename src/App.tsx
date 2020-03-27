import React, { Component } from 'react';
import { Button, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import OverlayContainer from '../module';

type Props = {};

type State = {
    visible: boolean;
};

class App extends Component<Props, State> {
    state: State = {
        visible: true,
    };

    containerRef: null | OverlayContainer = null;

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="dark-content" />
                <SafeAreaView>
                    <Text>Example TypeScript</Text>
                    <Button
                        title="SHOW"
                        onPress={() => {
                            this.setState({ visible: true });
                        }}
                    />
                    <Button
                        title="SHOW with REF"
                        onPress={() => {
                            this.containerRef && this.containerRef.show();
                        }}
                    />
                </SafeAreaView>
                <OverlayContainer
                    ref={(ref) => {
                        this.containerRef = ref;
                    }}
                    fadeInDuration={500}
                    fadeOutDuration={500}
                    visible={this.state.visible}
                    style={styles.overlayView}
                >
                    <Text>OverlayContainer</Text>
                    <Button
                        title="HIDE"
                        onPress={() => {
                            this.setState({ visible: false });
                        }}
                    />
                    <Button
                        title="HIDE with REF"
                        onPress={() => {
                            this.containerRef && this.containerRef.hide();
                        }}
                    />
                </OverlayContainer>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    overlayView: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default App;
