import React from 'react';
import { connectWithId, getHeight, getWidth, getOffset } from '../../../util/index';
import { setOption } from '../../../actions/actions';
import Bar from '../bar';
import PlaybackRateBar from './playbackRateBar';
import PlaybackRateBarValue from '../playbackRateBarValue/playbackRateBarValueContainer';

const mapStateToProps = ({ jPlayers }, { id, children, ...attributes }) => ({
  movePlaybackRate: (bar, dispatch, e) => {
    const { verticalPlaybackRate, minPlaybackRate,
      maxPlaybackRate } = jPlayers[id];
    const offset = getOffset(bar);
    const x = e.pageX - offset.left;
    const w = getWidth(bar);
    const y = (getHeight(bar) - e.pageY) + offset.top;
    const h = getHeight(bar);
    let ratio;

    if (verticalPlaybackRate) {
      ratio = y / h;
    } else {
      ratio = x / w;
    }

    const playbackRateValue = (ratio * (maxPlaybackRate - minPlaybackRate))
                              + minPlaybackRate;

    dispatch(setOption(id, 'playbackRate', playbackRateValue));
  },
  children,
  attributes,
});

const mergeProps = ({ movePlaybackRate, children, attributes }, { dispatch }) => ({
  onClick: (bar, e) => movePlaybackRate(bar, dispatch, e),
  onTouchMove: (bar, e) => {
    // Stop page scrolling
    e.preventDefault();

    movePlaybackRate(bar, dispatch, e.touches[0]);
  },
  children,
  attributes,
});

const PlaybackRateBarContainer = ({ onClick, onTouchMove, children,
attributes }) => (
  <Bar
    clickMoveBar={onClick}
    touchMoveBar={onTouchMove}
  >
    <PlaybackRateBar {...attributes}>
      {children}
    </PlaybackRateBar>
  </Bar>
);

PlaybackRateBarContainer.defaultProps = {
  children: (<PlaybackRateBarValue />),
};

PlaybackRateBarContainer.propTypes = {
  attributes: React.PropTypes.object.isRequired,
  children: React.PropTypes.node,
  onClick: React.PropTypes.func.isRequired,
  onTouchMove: React.PropTypes.func.isRequired,
};

export default connectWithId(mapStateToProps, null, mergeProps)(PlaybackRateBarContainer);