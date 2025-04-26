import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { SH } from '../../Utiles';

function Spacing({ space, horizontal, backgroundColor }) {
  const styles = useMemo(
    () =>
      StyleSheet.create({
        spacerStyle: {
          [horizontal ? 'width' : 'height']: space,
          backgroundColor: backgroundColor || 'transparent',
        },
      }),
    [horizontal, space, backgroundColor],
  );
  return <View style={[styles.spacerStyle]} />;
};

export default Spacing;
