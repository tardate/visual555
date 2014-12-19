root = exports ? this

# application controller - co-ordinates the marshalling of user input and rendering of the web page view
class root.AppController

  constructor: (@container,canvas) ->
    @calculator = new root.Calculator555()
    @visualizer = root.Visual555.get_instance($(canvas))
    @init()

  init: ->
    instance = @
    @snaffleUrlParams()
    @recalc()
    $('.form-control',@container).on('change keyup', ()->
      instance.recalc()
      true
    )
    # setup animation loop
    output_high = true
    f = ()->
      if instance.calculator.time_high > 0
        t = if output_high
          instance.visualizer.led_on()
          instance.calculator.time_high
        else
          instance.visualizer.led_off()
          instance.calculator.time_low
        output_high = !output_high
      else
        t = 500
        output_high = false
      setTimeout(f,t)
    f()

  recalc: ->
    @calculator.r1 = parseFloat( $('#R1',@container).val() )
    @calculator.r2 = parseFloat( $('#R2',@container).val() )
    @calculator.c = parseFloat( $('#C',@container).val() )
    @calculator.recalc()

    $('#frequency',@container).html( @calculator.frequency.toFixed(3) + ' Hz' )
    $('#time_high',@container).html( @calculator.time_high.toFixed(3) + ' ms' )
    $('#time_low',@container).html( @calculator.time_low.toFixed(3) + ' ms' )
    $('#cycle_time',@container).html( @calculator.cycle_time.toFixed(3) + ' ms' )
    $('#duty_cycle',@container).html( @calculator.duty_cycle.toFixed(3) + ' %' )
    $('#permalink',@container).attr('href', '?r1=' + @calculator.r1 + '&r2=' + @calculator.r2 + '&c=' + @calculator.c )

  snaffleUrlParams: ->
    # if present, initialise fields based on url params
    if value = @param('r1')
      $('#R1',@container).val(value)
    if value = @param('r2')
      $('#R2',@container).val(value)
    if value = @param('c')
      $('#C',@container).val(value)

  param: (name)->
    if values = (new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search)
      decodeURIComponent(values[1])

jQuery ->
  new root.AppController('#visual555','#visual555_canvas')