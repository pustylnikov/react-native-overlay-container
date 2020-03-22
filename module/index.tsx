import React, {Component} from 'react';
import {Animated, StyleSheet} from 'react-native';

type Props = {
    visible: boolean
    fadeInDuration: number
    fadeOutDuration: number
};

type State = {
    visible: boolean
};

let splashRef: Splash | null;

class Splash extends Component<Props, State> {
    /**
     * default props
     */
    static readonly defaultProps: Props = {
        visible: false,
        fadeInDuration: 200,
        fadeOutDuration: 200,
    };

    /**
     * component state
     */
    readonly state: State = {
        visible: this.props.visible,
    };

    /**
     * Animated value
     */
    protected animation = new Animated.Value(+(this.props.visible));

    /**
     * Mount
     */
    componentDidMount() {
        splashRef = this;
    }

    /**
     *
     * @param prevProps
     * @param prevState
     */
    componentDidUpdate(prevProps: Props, prevState: State): void {
        if (prevProps.visible !== this.props.visible) {
            this.props.visible ? this.show() : this.hide();
        }
    }

    /**
     * Unmount
     */
    componentWillUnmount() {
        splashRef = null;
    }

    /**
     * Render component
     *
     * @returns {*}
     */
    render() {
        const {children} = this.props;
        const {visible} = this.state;

        if (visible) {
            return (
                <Animated.View style={[styles.containerView, {opacity: this.animation}]}>
                    {children}
                </Animated.View>
            );
        }
        return null;
    }

    /**
     * Show splash
     */
    show = (): Promise<void> => {
        return new Promise(async (resolve) => {
            this.animation.stopAnimation(() => {
                this.setState(
                    {
                        visible: true,
                    },
                    () => {
                        Animated.timing(this.animation, {
                            toValue: 1,
                            duration: this.props.fadeInDuration,
                            useNativeDriver: true,
                        }).start(() => {
                            resolve();
                        });
                    },
                );
            });
        });
    };

    /**
     * Hide splash
     */
    hide = (): Promise<void> => {
        return new Promise(async (resolve) => {
            this.animation.stopAnimation(() => {
                Animated.timing(this.animation, {
                    toValue: 0,
                    duration: this.props.fadeOutDuration,
                    useNativeDriver: true,
                }).start(({finished}) => {
                    if (finished) {
                        this.setState({
                            visible: false,
                        }, () => {
                            this.animation.setValue(0);
                        });
                    }
                    resolve();
                });
            });
        });
    };
}

const styles = StyleSheet.create({
    containerView: {
        zIndex: 99999,
        elevation: 99999,
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
});

/**
 * Show splash
 */
export async function showSplash(): Promise<void> {
    if (splashRef) {
        await splashRef.show();
    }
}

/**
 * Hide splash
 */
export async function hideSplash(): Promise<void> {
    if (splashRef) {
        await splashRef.hide();
    }
}

export default Splash;
