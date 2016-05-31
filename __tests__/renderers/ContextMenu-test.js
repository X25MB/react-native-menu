import React from 'react';
import { Animated } from 'react-native';
import { render } from '../helpers';

jest.dontMock('../../src/renderers/ContextMenu');
const { default: ContextMenu, computePosition } = require('../../src/renderers/ContextMenu');

describe('ContextMenu', () => {

  const defaultLayouts = {
    windowLayout: { width: 400, height: 600 },
    triggerLayout: { width: 50, height: 50, x: 10, y: 10 },
    optionsLayout: { width: 200, height: 100 },
  };

  describe('renderer', () => {
    it('should render component', () => {
      const { output } = render(
        <ContextMenu layouts={defaultLayouts}>
          <Text>Some text</Text>
          <Text>Other text</Text>
        </ContextMenu>
      );
      expect(output.type).toEqual(Animated.View);
      expect(output.props.children).toEqual([
        <Text>Some text</Text>,
        <Text>Other text</Text>
      ]);
    });
  });

  describe('computePosition', () => {
    it('should returns default-top-left position', () => {
      const windowLayout = { width: 400, height: 600 };
      const triggerLayout = { width: 50, height: 50, x: 100, y: 100 };
      const optionsLayout = { width: 50, height: 50 };
      const layouts = { windowLayout, triggerLayout, optionsLayout };
      expect(computePosition(layouts)).toEqual({
        top: 100, left: 100
      });
    });

    it('should returns top-left position', () => {
      const windowLayout = { width: 400, height: 600 };
      const triggerLayout = { width: 50, height: 50, x: 10, y: 10 };
      const optionsLayout = { width: 50, height: 50 };
      const layouts = { windowLayout, triggerLayout, optionsLayout };
      expect(computePosition(layouts)).toEqual({
        top: 10, left: 10
      });
    });

    it('should returns top-right position', () => {
      const windowLayout = { width: 400, height: 600 };
      const triggerLayout = { width: 100, height: 50, x: 300, y: 0 };
      const optionsLayout = { width: 150, height: 100 };
      const layouts = { windowLayout, triggerLayout, optionsLayout };
      expect(computePosition(layouts)).toEqual({
        top: 0, left: 250
      });
    });

    it('should returns bottom-left position', () => {
      const windowLayout = { width: 400, height: 600 };
      const triggerLayout = { width: 100, height: 100, x: 10, y: 500 };
      const optionsLayout = { width: 150, height: 150 };
      const layouts = { windowLayout, triggerLayout, optionsLayout };
      expect(computePosition(layouts)).toEqual({
        top: 450, left: 10
      });
    });

    it('should returns bottom-right position', () => {
      const windowLayout = { width: 400, height: 600 };
      const triggerLayout = { width: 100, height: 100, x: 300, y: 500 };
      const optionsLayout = { width: 150, height: 150 };
      const layouts = { windowLayout, triggerLayout, optionsLayout };
      expect(computePosition(layouts)).toEqual({
        top: 450, left: 250
      });
    });
  });

});
