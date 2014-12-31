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
      cycleTime: 0,
      timeHigh: 0,
      timeLow: 0,
      dutyCycle: 0,
      mode: 'astable'
    }

  mode: ->
    @values.mode

  timeHigh: ->
    @values.timeHigh

  timeLow: ->
    @values.timeLow

  recalc: (settings)->
    $.extend(@values, settings) if settings
    if @values.mode == 'monostable'
      @values.frequency = NaN
      @values.timeHigh = 1.1 * @values.r1 * @values.c
      @values.timeLow = NaN
      @values.cycleTime = NaN
      @values.dutyCycle = NaN
    else
      @values.frequency = 1.44 * 1000 / ( @values.r1 + 2 * @values.r2 ) / @values.c
      @values.timeHigh = 0.693 * ( @values.r1 + @values.r2 ) * @values.c
      @values.timeLow  = 0.693 * @values.r2 * @values.c
      @values.cycleTime = @values.timeHigh + @values.timeLow
      @values.dutyCycle = @values.timeHigh / @values.cycleTime * 100.0
    @values