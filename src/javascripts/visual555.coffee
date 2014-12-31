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

  constructor: (@container) ->
    @components = []
    @calculator = new root.Calculator555()
    @context = @container.get(0).getContext("2d")
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
    output_high = true
    f = ()->
      if (th = instance.calculator.timeHigh() ) > 0
        t = if output_high
          instance.ledOn()
          th
        else
          instance.ledOff()
          instance.calculator.timeLow()
        output_high = !output_high
      else
        t = 500
        output_high = false
      setTimeout(f,t)
    f()

  recalc: (values)->
    @calculator.recalc(values)

  addComponent: (component)->
    @components.push(component)
    component

  drawCircuit: ->
    y_vcc = 30
    y_gnd = 340
    width = 400

    vcc = @addComponent( new root.PowerRail({ y: y_vcc, width: width }) )
    gnd = @addComponent( new root.GroundRail({ y: y_gnd, width: width }) )

    r1 = @addComponent( new root.Resistor({ x: 100, y: y_vcc + 20, label: 'R1'}) )
    r2 = @addComponent( new root.Resistor({ x: 100, y: y_vcc + 100, label: 'R2'}) )
    c1 = @addComponent( new root.CeramicCapacitor({ x: 100, y: y_vcc + 170, label: 'C1'}) )

    timer = @addComponent( new root.LM555({ x: 160, y: y_vcc + 70}) )

    c2 = @addComponent( new root.CeramicCapacitor({ x: 215, y: 220, label: 'C2'}) )

    r3 = @addComponent( new root.Resistor({ x: 300, y: y_vcc + 130, label: 'R3'}) )
    @output_led = @addComponent( new root.Led({ x: 295, y: 230, color: 'red'}) )

    @addComponent( new root.ConnectingWire(vcc,105,r1,'1') )
    @addComponent( new root.ConnectingWire(r1,'2',r2,'1') )
    @addComponent( new root.ConnectingWire(r2,'2',c1,'1') )
    @addComponent( new root.ConnectingWire(c1,'2',gnd,105) )

    @addComponent( new root.ConnectingWire(vcc,200,timer,'8') )
    @addComponent( new root.ConnectingWire(vcc,220,timer,'4') )
    @addComponent( new root.ConnectingWire(r2,'1',timer,'7') )
    @addComponent( new root.ConnectingWire(r2,'2',timer,'2') )
    @addComponent( new root.ConnectingWire(timer,'6',timer,'2') )
    @addComponent( new root.ConnectingWire(timer,'1',gnd,200) )
    @addComponent( new root.ConnectingWire(timer,'3',r3,'1') )
    @addComponent( new root.ConnectingWire(r3,'2',@output_led,'1') )
    @addComponent( new root.ConnectingWire(@output_led,'2',gnd,305) )
    @addComponent( new root.ConnectingWire(timer,'5',c2,'1') )
    @addComponent( new root.ConnectingWire(c2,'2',gnd,220) )

    @redraw()

  redraw: ->
    component.draw(@context) for component in @components

  ledOff: ->
    @output_led.draw(@context, false) if @output_led

  ledOn: ->
    @output_led.draw(@context, true) if @output_led


