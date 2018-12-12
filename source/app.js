import React from '@react';

import './pages/index/index';

import './pages/demo/button/index';
import './pages/demo/checkbox/index';
import './pages/demo/label/index';
import './pages/demo/picker/index';
import './pages/demo/progress/index';
import './pages/demo/radio/index';
import './pages/demo/slider/index';
import './pages/demo/swiper/index';
import './pages/demo/switch/index';
import './pages/demo/icon/index';
import './pages/demo/picker1/index';
import './app.scss';

class Global extends React.Component {
    config = {
        window: {
            backgroundTextStyle: 'light',
            // navigationBarBackgroundColor: '#0088a4',
            navigationBarTitleText: 'Schnee UI',
            navigationBarTextStyle: '#fff'
        }
    };
    onLaunch() {
        // eslint-disable-next-line
        console.log('App launched');
    }
}
//这样写相当于为每一个页面组件的外面都加上一个<Provider />，如果你想在页面上用到store里的数据，
//需要用react-redux的connect方法包一下，详见pages/demo/syntax/redux
//React.applyAppStore(store);
// eslint-disable-next-line
export default App(new Global());