import React from '@react';
import './index.scss';
import XSlider from '@components/XSlider/index';
class P extends React.Component {
  constructor() {
    super();
    // this.bind();
    this.state = {
      step: 5,
      currentValue: 100
    };
  }

  // bind() {
  //     for (let i = 1; i < 6; i++) {
  //         let index = i + 1;
  //         this['slider' + index + 'change'] = function(e) {
  //             // eslint-disable-next-line
  //             console.log(
  //                 'slider' + 'index' + '发生 change 事件，携带值为',
  //                 e.value
  //             );
  //         };
  //     }
  // }

  sliderChange(e) {
    console.log('slider 发生 change 事件，携带值为', e);
    this.setState({
      currentValue: e
    });
  }

  switch1Change(e) {
    // eslint-disable-next-line
    console.log('switch1 发生 change 事件，携带值为', e.value);
  }

  switch2Change(e) {
    // eslint-disable-next-line
    console.log('switch2 发生 change 事件，携带值为', e.value);
  }

  render() {
    return (
      <div className="anu-col demo-page">
        {/* <div class="section section_gap anu-block">
          <text class="section__title">设置step</text>
          <div class="body-div">
            <Slider class="slider" />
          </div>
        </div> */}
        {/* <div class="section section_gap anu-block">
          <text class="section__title">初始化：value = 50</text>
          <div class="body-div">
            <Slider class="slider" onChange={this.sliderChange} value={this.state.currentValue} />
          </div>
        </div> */}
        {/* <div class="section section_gap anu-block">
          <text class="section__title">显示当前value</text>
          <div class="body-div">
            <Slider class="slider" onChange={this.sliderChange} show-value={true}/>
          </div>
        </div> */}
          <span className="demo-header">设置最小/最大值</span>
          <div class="demo-content">
            <div class="anu-col">
              <XSlider
                onChange={this.sliderChange.bind(this)}
                min={50}
                max={200}
                value={this.state.currentValue}
              />
              <div>{this.state.currentValue}</div>
              <div>
                <switch checked={true} onChange={this.switch1Change} />
                <switch onChange={this.switch2Change} />
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default P;