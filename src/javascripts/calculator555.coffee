root = exports ? this

# Models the operation of the 555 timer
class root.Calculator555

  constructor: (settings) ->
    @reset()
    @recalc(settings)

  reset: ->
    @values = {
      r1: 0,
      r2: 0,
      c: 0,
      frequency: 0,
      cycle_time: 0,
      time_high: 0,
      time_low: 0,
      duty_cycle: 0
    }

  time_high: ->
    @values.time_high

  time_low: ->
    @values.time_low

  recalc: (settings)->
    $.extend(@values, settings) if settings
    @values.frequency = 1.44 * 1000 / ( @values.r1 + 2 * @values.r2 ) / @values.c
    @values.time_high = 0.693 * ( @values.r1 + @values.r2 ) * @values.c
    @values.time_low  = 0.693 * @values.r2 * @values.c
    @values.cycle_time = @values.time_high + @values.time_low
    @values.duty_cycle = @values.time_high / @values.cycle_time * 100.0
    @values