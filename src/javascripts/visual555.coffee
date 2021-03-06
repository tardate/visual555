root = exports ? this

# generates HTML5 Canvas representation of the 555 timer circuit
class root.Visual555

  @get_instance: (element)->
    new root.Visual555(element) if @supported()

  @supported: ->
    try
      Modernizr.canvas
    catch e
      false

  constructor: (@container,@mode) ->
    @components = []
    @calculator = new root.Calculator555()
    @canvas = @container.get(0)
    @context = @canvas.getContext("2d")
    @applyDefaults()
    @drawCircuit()
    @startAnimationLoop()
    true

  applyDefaults: ->
    @context.translate(0.5, 0.5)
    @context.font = '14px monospace'
    @context.textBaseline = 'top'

  startAnimationLoop: ->
    # setup animation loop
    instance = @
    output_high = false
    switch_open = true
    f = ()->
      th = instance.calculator.timeHigh()
      t = if th > 0
        if instance.mode == 'monostable'

          if switch_open && !output_high
            instance.ledOn()
            instance.switchClosed()
            output_high = true
            switch_open = false
            th
          else
            if !switch_open && output_high
              instance.ledOff()
              output_high = false
              th
            else
              switch_open = true
              output_high = false
              instance.switchOpen()
              th * 2
        else
          if output_high
            output_high = false
            instance.ledOff()
            instance.calculator.timeLow()
          else
            output_high = true
            instance.ledOn()
            th
      else
        500
      setTimeout(f,t)
    f()

  ledOff: ->
    @output_led.draw(@context, false) if @output_led

  ledOn: ->
    @output_led.draw(@context, true) if @output_led

  switchOpen: ->
    @switch.draw(@context, false) if @switch

  switchClosed: ->
    @switch.draw(@context, true) if @switch

  recalc: (values)->
    new_mode = values.mode
    if new_mode && new_mode != @mode
      @mode = new_mode
      @drawCircuit()
    @calculator.recalc(values)

  redraw: ->
    component.draw(@context) for component in @components

  addComponent: (component)->
    @components.push(component)
    component

  drawCircuit: ->
    @components = []
    @output_led = null
    @switch = null
    @context.clearRect(0, 0, @canvas.width, @canvas.height);
    if @mode == 'monostable'
      @drawMonostableCircuit()
    else
      @drawAstableCircuit()
    @redraw()

  drawAstableCircuit: ->
    y_vcc = 30
    y_gnd = 340
    width = 400
    x1 = 100
    x2 = 330

    vcc = @addComponent( new root.PowerRail({ y: y_vcc, width: width }) )
    gnd = @addComponent( new root.GroundRail({ y: y_gnd, width: width }) )

    r1 = @addComponent( new root.Resistor({ x: x1, y: y_vcc + 20, label: 'R1'}) )
    r2 = @addComponent( new root.Resistor({ x: x1, y: y_vcc + 100, label: 'R2'}) )
    c1 = @addComponent( new root.CeramicCapacitor({ x: x1, y: y_vcc + 180, label: 'C1'}) )

    timer = @addComponent( new root.LM555({ x: 160, y: y_vcc + 70}) )
    timer_5_x = timer.pinPosition('5').x

    c2 = @addComponent( new root.CeramicCapacitor({ x: timer_5_x, y: 220, label: 'C2'}) )
    rl = @addComponent( new root.Resistor({ x: x2, y: y_vcc + 130, label: 'RL'}) )
    @output_led = @addComponent( new root.Led({ x: x2, y: 230, color: 'red'}) )

    @addComponent( new root.ConnectingWire(vcc,x1,r1,'1') )
    @addComponent( new root.ConnectingWire(r1,'2',r2,'1') )
    @addComponent( new root.ConnectingWire(r2,'2',c1,'1') )
    @addComponent( new root.ConnectingWire(c1,'2',gnd,x1) )

    @addComponent( new root.ConnectingWire(vcc,timer.pinPosition('8').x,timer,'8') )
    @addComponent( new root.ConnectingWire(vcc,timer.pinPosition('4').x,timer,'4') )
    @addComponent( new root.ConnectingWire(r2,'1',timer,'7') )
    @addComponent( new root.ConnectingWire(r2,'2',timer,'2') )
    @addComponent( new root.ConnectingWire(timer,'6',timer,'2') )
    @addComponent( new root.ConnectingWire(timer,'1',gnd,timer.pinPosition('1').x) )
    @addComponent( new root.ConnectingWire(timer,'3',rl,'1') )
    @addComponent( new root.ConnectingWire(rl,'2',@output_led,'1') )
    @addComponent( new root.ConnectingWire(@output_led,'2',gnd,x2) )
    @addComponent( new root.ConnectingWire(timer,'5',c2,'1') )
    @addComponent( new root.ConnectingWire(c2,'2',gnd,timer_5_x) )

  drawMonostableCircuit: ->
    y_vcc = 30
    y_gnd = 340
    width = 400
    x1 = 70
    x11= 120
    x2 = 300

    vcc = @addComponent( new root.PowerRail({ y: y_vcc, width: width }) )
    gnd = @addComponent( new root.GroundRail({ y: y_gnd, width: width }) )

    rp = @addComponent( new root.Resistor({ x: x1, y: y_vcc + 100, label: 'RP'}) )
    @switch = @addComponent( new root.SpstSwitch({ x: x1, y: y_vcc + 200, label: 'S1'}) )

    r1 = @addComponent( new root.Resistor({ x: x11, y: y_vcc + 40, label: 'R1'}) )
    c1 = @addComponent( new root.CeramicCapacitor({ x: x11, y: y_vcc + 180, label: 'C1'}) )

    timer = @addComponent( new root.LM555({ x: 160, y: y_vcc + 70}) )
    timer_5_x = timer.pinPosition('5').x

    c2 = @addComponent( new root.CeramicCapacitor({ x: timer_5_x, y: 220, label: 'C2'}) )

    rl = @addComponent( new root.Resistor({ x: x2, y: y_vcc + 130, label: 'RL'}) )
    @output_led = @addComponent( new root.Led({ x: x2, y: 230, color: 'red'}) )


    @addComponent( new root.ConnectingWire(vcc,x11,r1,'1') )
    @addComponent( new root.ConnectingWire(r1,'2',c1,'1') )
    @addComponent( new root.ConnectingWire(r1,'2',timer,'7') )
    @addComponent( new root.ConnectingWire(c1,'2',gnd,x11) )

    @addComponent( new root.ConnectingWire(vcc,x1,rp,'1') )
    @addComponent( new root.ConnectingWire(timer,'2',rp,'2') )
    @addComponent( new root.ConnectingWire(rp,'2',@switch,'1') )
    @addComponent( new root.ConnectingWire(@switch,'2',gnd,x1) )

    @addComponent( new root.ConnectingWire(vcc,timer.pinPosition('8').x,timer,'8') )
    @addComponent( new root.ConnectingWire(vcc,timer.pinPosition('4').x,timer,'4') )
    @addComponent( new root.ConnectingWire(timer,'6',timer,'7') )
    @addComponent( new root.ConnectingWire(timer,'1',gnd,timer.pinPosition('1').x) )
    @addComponent( new root.ConnectingWire(timer,'3',rl,'1') )
    @addComponent( new root.ConnectingWire(rl,'2',@output_led,'1') )
    @addComponent( new root.ConnectingWire(@output_led,'2',gnd,x2) )
    @addComponent( new root.ConnectingWire(timer,'5',c2,'1') )
    @addComponent( new root.ConnectingWire(c2,'2',gnd,timer_5_x) )
