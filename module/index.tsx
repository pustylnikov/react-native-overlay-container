import React, { Component } from 'react';
import { Animated, StyleSheet, ViewStyle } from 'react-native';

type Props = {
    visible: boolean;
    fadeInDuration: number;
    fadeOutDuration: number;
    style: null | ViewStyle;
};

type State = {
    visible: boolean;
};

class OverlayContainer extends Component<Props, State> {
    /**
     * default props
     */
    static readonly defaultProps: Partial<Props> = {
        fadeInDuration: 200,
        fadeOutDuration: 200,
        style: null,
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
    protected animation = new Animated.Value(+this.props.visible);

    /**
     *
     * @param nextProps
     * @param nextState
     */
    shouldComponentUpdate(nextProps: Readonly<Props>, nextState: Readonly<State>): boolean {
        if (
            this.props.visible !== nextProps.visible ||
            (this.state.visible !== nextProps.visible && this.state.visible === nextState.visible)
        ) {
            nextProps.visible ? this.show() : this.hide();
            return false;
        }
        return this.state.visible !== nextState.visible;
    }

    /**
     * Show container
     */
    show() {
        this.animation.stopAnimation(() => {
            this.setState({ visible: true }, () => {
                Animated.timing(this.animation, {
                    toValue: 1,
                    duration: this.props.fadeInDuration,
                    useNativeDriver: true,
                }).start();
            });
        });
    }

    /**
     * Hide container
     */
    hide() {
        this.animation.stopAnimation(() => {
            Animated.timing(this.animation, {
                toValue: 0,
                duration: this.props.fadeOutDuration,
                useNativeDriver: true,
            }).start(({ finished }) => {
                if (finished) {
                    this.setState({ visible: false }, () => {
                        this.animation.setValue(0);
                    });
                }
            });
        });
    }

    /**
     * Render component
     *
     * @returns {*}
     */
    render() {
        const { children, style } = this.props;
        const { visible } = this.state;

        if (visible) {
            return (
                <Animated.View style={[styles.containerView, { opacity: this.animation }, style]}>
                    {children}
                </Animated.View>
            );
        }
        return null;
    }
}

const styles = StyleSheet.create({
    containerView: {
        zIndex: 999,
        elevation: 999,
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
});

export default OverlayContainer;
