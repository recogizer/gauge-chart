import { easeCubic, interpolateNumber } from 'd3'
import * as gauge from './gauge'
import * as logger from './logger'

/**
 * Gauge interface.
 */

export class Gauge {
  _svg: any
  needle = null
  needleUpdateSpeed = 1000

  updateNeedle(needleValue) {
    if (!this.needle) {
      logger.warn('Gauge-chart Warning: no needle to update')
      return
    }
    needleValue = gauge.needleValueModifier(needleValue)
    this.needle
      .getSelection()
      .transition()
      // for dynamic speed change .duration(Math.abs(needleValue - this.needle.getValue()) * 20)
      .duration(this.needleUpdateSpeed)
      .ease(easeCubic)
      .tween('needle animation', () => {
        let prevValue = this.needle.getValue()
        let i = interpolateNumber(prevValue, needleValue)
        return (t) => {
          this.needle.setValue(i(t))
        }
      })
  }
}
