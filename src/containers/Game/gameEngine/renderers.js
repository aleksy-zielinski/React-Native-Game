import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { widthPercentageToDP as wp }
  from 'react-native-responsive-screen';
import { Image } from 'react-native-animatable';
import FlareSpin from '../components/FlareSpin';

import AppMocData from '@share/data/MocData';

const Box = ({ size, body, spinInfoData }) => {
  const width = size[0];
  const height = size[1];
  const x = body.position.x - (width / 2);
  const y = body.position.y - (height / 2);
  const { angle } = body;
  return (
    <View style={{
      left: x,
      top: y,
      position: 'absolute',
      zIndex: 4,
      width,
      marinTop: width / 4,
      height,
    }}
    >
      <FlareSpin spinInfoData={spinInfoData} angle={angle} />
    </View>
  );
};

const Bullet = ({ size, body }) => {
  const width = size[0];
  const height = size[1];
  const x = body.position.x - (width / 2);
  const y = body.position.y - (height / 2);
  return (
    <View style={{
      left: x,
      top: y,
      position: 'absolute',
      zIndex: 4,
      width: width * 1.5,
      height: height * 1.5,
      borderRadius: wp('2'),
      backgroundColor: '#2EC760',
      alignItems: 'center',
      transform: [{ rotate: `${-3.14 / 4}rad` }],
    }}
    >
      {/* <LinearGradient */}
      {/* colors={['#2EC760', '#181818']} */}
      {/* style={{ */}
      {/* width: wp('1.5'), */}
      {/* opacity: 0.2, */}
      {/* height: wp('35') */}
      {/* }}/> */}
      <Image
        source={AppMocData.game.gameplay.target.shadow.green}
        style={{
          width: wp('1.5'),
          opacity: 0.4,
          height: wp('35'),
        }}
      />
      {/* <CreateBullet angle = {angle}/> */}
    </View>
  );
};

Box.propTypes = {
  size: PropTypes.array.isRequired,
  body: PropTypes.object.isRequired,
  spinInfoData: PropTypes.object.isRequired
};

Bullet.propTypes = {
  size: PropTypes.array.isRequired,
  body: PropTypes.object.isRequired
};

export { Box, Bullet };
