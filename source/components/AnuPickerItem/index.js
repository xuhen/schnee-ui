import React from '@react';
import './index.scss';
/* eslint-disable */
function calculate(value) {
  const ANU_ENV = process.env.ANU_ENV; //wx ali bu quick
  if (ANU_ENV === 'quick') {
    return value * 2;
  } else {
    return value;
  }
}

class AnuPickerItem extends React.Component {
  constructor(props) {
    super(props);
    console.log('props======', props);
    this.state = {
      touching: false,
      touchId: undefined,
      ogY: 0,
      ogTranslate: 0, // 移动之前的起始位置
      translate: 0,
      totalHeight: 0,
      selected: 0,
      totalHeight: props.items.length * calculate(props.indicatorHeight)
    };
  }

  componentDidMount() {
    this.adjustPosition(this.props);
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps')
    // 这里不知道需要不
    this.adjustPosition(nextProps);
  }

  adjustPosition(props) {
    console.log('adjustPosition')
    let { items, itemHeight, indicatorTop, defaultIndex } = props;
    itemHeight = calculate(itemHeight);
    indicatorTop = calculate(indicatorTop);
    const totalHeight = items.length * itemHeight;
    let translate = totalHeight <= indicatorTop ? indicatorTop : 0;
    if (defaultIndex > -1) {
      if (translate === 0) {
        let upperCount = Math.floor(indicatorTop / itemHeight);
        if (defaultIndex > upperCount) {
          // over
          let overCount = defaultIndex - upperCount;
          translate -= overCount * itemHeight;
        } else if (defaultIndex === upperCount) {
          translate = 0;
        } else {
          //less
          translate += Math.abs(upperCount - defaultIndex) * itemHeight;
        }
      } else {
        // 如果总的 item 高度小于 indicator height
        translate -= itemHeight * defaultIndex;
      }
    }

    console.log('translate', translate);
    this.setState({
      selected: defaultIndex,
      ogTranslate: translate,
      translate
    });
    
    if(defaultIndex > -1) {
      this.updateSelected(false, translate)
    } else {
      this.updateSelected(true, translate)
    }

  }

  handleTouchStart(e) {
    if (this.state.touching || this.props.items.length <= 1) return;
    console.log('start');
    this.setState({
      touching: true,
      ogTranslate: this.state.translate,
      touchId: e.touches[0].identifier,
      ogY:
        this.state.translate === 0 ? e.touches[0].pageY : e.touches[0].pageY - this.state.translate,
      animating: false
    });
  }

  handleTouchMove(e) {
    console.log('move');
    if (!this.state.touching || this.props.items.length <= 1) return;
    if (e.touches[0].identifier !== this.state.touchId) return;

    const pageY = e.touches[0].pageY;
    const diffY = pageY - this.state.ogY;
    console.log('diffY', diffY);

    this.setState({
      translate: diffY
    });
  }

  handleTouchEnd() {
    console.log('end');
    if (!this.state.touching || this.props.items.length <= 1) return;

    let { indicatorTop, indicatorHeight, itemHeight } = this.props;
    indicatorTop = calculate(indicatorTop);
    indicatorHeight = calculate(indicatorHeight);
    itemHeight = calculate(itemHeight);
    let translate = this.state.translate;

    if (Math.abs(translate - this.state.ogTranslate) < itemHeight * 0.51) {
      // 相当于没有移动
      translate = this.state.ogTranslate;
    } else if (translate > indicatorTop) {
      // 第一个参数超出 indicatorTop
      translate = indicatorTop;
    } else if (translate + this.state.totalHeight < indicatorTop + indicatorHeight) {
      // 最后一个参数 超出
      translate = indicatorTop + indicatorHeight - this.state.totalHeight;
    } else {
      let step = 0,
        adjust = 0;
      let diff = (translate - this.state.ogTranslate) / itemHeight;

      if (Math.abs(diff) < 1) {
        step = diff > 0 ? 1 : -1;
      } else {
        adjust = Math.abs((diff % 1) * 100) > 50 ? 1 : 0;
        step = diff > 0 ? Math.floor(diff) + adjust : Math.ceil(diff) - adjust;
      }

      translate = this.state.ogTranslate + step * itemHeight;
    }

    this.setState(
      {
        touching: false,
        ogY: 0,
        touchId: undefined,
        ogTranslate: 0,
        animating: true,
        translate
      }
      
    );

    this.updateSelected(true, translate)
  }

  updateSelected(propagate = true, translate) {
    let { items, itemHeight, indicatorTop, indicatorHeight, onChange, groupIndex } = this.props;
    indicatorTop = calculate(indicatorTop);
    indicatorHeight = calculate(indicatorHeight);
    itemHeight = calculate(itemHeight);
    let selected = 0;

    items.forEach((item, i) => {
      if ( !item.disabled && (translate + (itemHeight * i)) >= indicatorTop &&
            ( translate + (itemHeight * i) + itemHeight ) <= indicatorTop + indicatorHeight ){
                selected = i;
            }
    })
    console.log('selected', selected)
    if (onChange && propagate) onChange(selected, groupIndex);

  }

  render() {
    return (
      <stack
        catchTouchStart={this.handleTouchStart.bind(this)}
        catchTouchMove={this.handleTouchMove.bind(this)}
        onTouchEnd={this.handleTouchEnd.bind(this)}
        style={{ width: '100%' }}
        class="anu-stack"
      >
        <div
          class="anu-picker_content"
          style={
            'transform: translateY(' +
            this.state.translate +
            'px); height: ' +
            this.state.totalHeight +
            'px'
          }
        >
          {this.props.items.map(function(item, index) {
            return (
              <div
                class={'anu-picker__item ' + (item.disabled ? 'anu-picker__item_disabled' : '')}
              >
                {item[this.props.mapKeys.label] || item}
              </div>
            );
          })}
        </div>

        <div class="anu-picker__mask">
          <div class="anu-picker__mask_top" />
          <div class="anu-picker__mask_center" />
          <div class="anu-picker__mask_bottom " />
        </div>
      </stack>
    );
  }
}

AnuPickerItem.defaultProps = {
  itemHeight: 25 + 9, //content + padding
  indicatorTop: 102, // 中心点距离pick顶部的高度
  indicatorHeight: 34,
  aniamtion: true,
  groupIndex: -1,
  defaultIndex: -1,
  mapKeys: {
    label: 'label'
  }
};

export default AnuPickerItem;
