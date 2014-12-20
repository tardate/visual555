root = exports ? this

# Models the operation of the 555 timer
class root.Calculator555

  constructor: (settings) ->
    @reset()
    if settings
      @r1 = settings.r1
      @r2 = settings.r2
      @c = settings.c
      @recalc()

  reset: ->
    @r1 = 0
    @r2 = 0
    @c = 0
    @frequency = 0
    @cycle_time = 0
    @time_high = 0
    @time_low = 0
    @duty_cycle = 0


  recalc: (values)->
    if v = values.r1
      @r1 = v
    if v = values.r2
      @r2 = v
    if v = values.c
      @c = v
    @frequency = 1.44 * 1000 / ( @r1 + 2 * @r2 ) / @c
    @time_high = 0.693 * ( @r1 + @r2 ) * @c
    @time_low  = 0.693 * @r2 * @c
    @cycle_time = @time_high + @time_low
    @duty_cycle = @time_high / @cycle_time * 100.0
    {
      r1: @r1,
      r2: @r2,
      c: @c,
      frequency: @frequency,
      time_high: @time_high,
      time_low: @time_low,
      cycle_time: @cycle_time,
      duty_cycle: @duty_cycle
    }