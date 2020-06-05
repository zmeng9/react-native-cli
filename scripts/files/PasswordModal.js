import React from 'react'
import { View, Text, Image, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import InputView from './InputView';
import Keyboard from './Keyboard';
import { constants } from '../util';
const PasswordModal = React.forwardRef((props, ref) => {
    const { onDone, clear = true, backdrop, header, title = '支付密码', tip = '', tipProps, inputViewProps = {}, keyboardProps = {}, } = props;
    const [password, setPassword] = React.useState('');
    const [visible, setVisible] = React.useState(false);
    const combineText = (text) => {
        const len = inputViewProps.length || 6;
        let nextPassword = password + text;
        if (nextPassword.length <= len) {
            setPassword(nextPassword);
            if (nextPassword.length === len) {
                onDone && onDone(nextPassword);
                hide();
            }
        }
    };
    const onDelete = () => {
        setPassword(password.substring(0, password.length - 1));
    };
    const show = () => {
        if (clear && password) {
            setPassword('');
        }
        setVisible(true);
    };
    const hide = () => {
        setVisible(!visible);
    };
    React.useImperativeHandle(ref, () => {
        return {
            show: show,
            hide: hide,
        };
    });
    return (<Modal animationType={`fade`} visible={visible} onRequestClose={hide} transparent={true}>
      <View style={[styles.container, { backgroundColor: backdrop ? 'rgba(0,0,0,0.3)' : 'transparent' }]}>
        <View style={{ backgroundColor: '#F5F5F5' }}>
          {header || <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity style={styles.close} onPress={hide}>
              <Image source={require('../images/close.png')} style={styles.image} resizeMode={'contain'}/>
            </TouchableOpacity>
          </View>}
          <View style={styles.inputContainer}>
            <InputView {...inputViewProps} value={password}/>
            {tip ? <Text style={styles.tip} {...tipProps}>{tip}</Text> : null}
          </View>
          <Keyboard {...keyboardProps} onPress={combineText} onDelete={onDelete}/>
        </View>
      </View>
    </Modal>);
});
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    header: {
        height: constants.titleHeight,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: constants.borderWidth,
        borderBottomColor: constants.borderColor,
        borderTopWidth: constants.borderWidth,
        borderTopColor: constants.borderColor,
    },
    image: {
        height: 25,
        width: 25
    },
    close: {
        position: 'absolute',
        right: 0,
        top: 0,
        width: 60,
        height: constants.titleHeight,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 16,
        color: '#333333'
    },
    inputContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 15,
    },
    tip: {
        color: '#108ee9',
        marginTop: 15,
    },
});
export default PasswordModal;
