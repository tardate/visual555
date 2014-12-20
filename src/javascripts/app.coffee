root = exports ? this

# application controller - co-ordinates the marshalling of user input and rendering of the web page view
class root.AppController

  constructor: (@container,canvas) ->
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

  recalc: ->
    values = @visualizer.recalc({
      r1: parseFloat( $('#R1',@container).val() ),
      r2: parseFloat( $('#R2',@container).val() ),
      c: parseFloat( $('#C',@container).val() )
    })

    $('#frequency',@container).html( values.frequency.toFixed(3) + ' Hz' )
    $('#time_high',@container).html( values.time_high.toFixed(3) + ' ms' )
    $('#time_low',@container).html( values.time_low.toFixed(3) + ' ms' )
    $('#cycle_time',@container).html( values.cycle_time.toFixed(3) + ' ms' )
    $('#duty_cycle',@container).html( values.duty_cycle.toFixed(3) + ' %' )
    $('#permalink',@container).attr('href', '?r1=' + values.r1 + '&r2=' + values.r2 + '&c=' +values.c )

  snaffleUrlParams: ->
    # if present, initialise fields based on url params
    $('#R1',@container).val(@param('r1') || 1)
    $('#R2',@container).val(@param('r2') || 330)
    $('#C',@container).val(@param('c') || 2.2)

  param: (name)->
    if values = (new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search)
      decodeURIComponent(values[1])

jQuery ->
  new root.AppController('#visual555','#visual555_canvas')