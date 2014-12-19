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


  recalc: ->
    @frequency = 1.44 * 1000 / ( @r1 + 2 * @r2 ) / @c
    @time_high = 0.693 * ( @r1 + @r2 ) * @c
    @time_low  = 0.693 * @r2 * @c
    @cycle_time = @time_high + @time_low
    @duty_cycle = @time_high / @cycle_time * 100.0