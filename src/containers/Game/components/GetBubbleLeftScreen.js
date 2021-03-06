import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp }
  from 'react-native-responsive-screen';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { removeSpinList } from '@redux/action/game';
import FlareSpin from './FlareSpin';

class GetBubbleLeftScreen extends React.Component {
  static propTypes = {
    running: PropTypes.bool.isRequired,
    removeSpinList: PropTypes.func.isRequired,
    leftSpinUpdate: PropTypes.number.isRequired,
    getSpinListItems: PropTypes.array.isRequired,
    backPage: PropTypes.func.isRequired
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.running !== this.props.running
      || nextProps.removeSpinList !== this.props.removeSpinList
      || nextProps.leftSpinUpdate !== this.props.leftSpinUpdate
      || nextProps.getSpinListItems !== this.props.getSpinListItems;
  }

  render() {
    const {
      // eslint-disable-next-line no-shadow
      removeSpinList, getSpinListItems, running, backPage, leftSpinUpdate,
    } = this.props;
    const zoomAnimation = {
      0: {
        scale: 1,
      },
      0.5: {
        scale: 2,
      },
      1: {
        scale: 1,
      },
    };

    const repeatAnimation = {
      0: {
        scale: 1,
      },
      0.5: {
        scale: 1,
      },
      1: {
        scale: 1,
      },
    };
    const onOpenGetMegaSpinResultPage = (index) => {
      if (running) {
        return;
      }
      switch (index) {
        case 'niki':
          backPage('GameNikiRound', { param: 'niki' });
          removeSpinList('niki');
          break;
        case 'apple':
          backPage('GameNikiRound', { param: 'apple' });
          removeSpinList('apple');
          break;
        case 'mega':
          backPage('GameNikiRound', { param: 'mega' });
          removeSpinList('mega');
          break;
        case 'lock':
          backPage('GameMegaRound', { param: 'lock' });
          removeSpinList('lock');
          break;
        case 'survey':
          backPage('NikiQuestion', { param: 'lock' });
          removeSpinList('survey');
          break;
        default:
          break;
      }
    };
    return (
      <View style={{
        flex: 1,
        zIndex: 10,
        position: 'absolute',
        top: hp('30'),
        left: wp('1'),
      }}
      >
        {getSpinListItems.map((item, index) => (
          <Animatable.View
            style={{
              opacity: running ? 0.6 : 1,
              transform: [
                { scaleX: 0 },
                { scaleY: 0 },
              ],
            }}
            animation={leftSpinUpdate === index ? zoomAnimation : repeatAnimation}
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            >
            <TouchableOpacity onPress={() => onOpenGetMegaSpinResultPage(item.megaType)}>
              <FlareSpin spinInfoData={item} angle={0} shadow={false} running={running} />
            </TouchableOpacity>
          </Animatable.View>
        ))}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  getSpinListItems: state.game.getSpinListItems,
  leftSpinUpdate: state.game.leftSpinUpdate,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  ...bindActionCreators({
    removeSpinList,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(GetBubbleLeftScreen);
