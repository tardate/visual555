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
    @apply_defaults()
    @draw_circuit()
    @init_animation_loop()
    true

  apply_defaults: ->
    @context.translate(0.5, 0.5)
    @context.font = '14px monospace'
    @context.textBaseline = 'top'

  init_animation_loop: ->
    # setup animation loop
    instance = @
    output_high = true
    f = ()->
      if (th = instance.calculator.time_high() ) > 0
        t = if output_high
          instance.led_on()
          th
        else
          instance.led_off()
          instance.calculator.time_low()
        output_high = !output_high
      else
        t = 500
        output_high = false
      setTimeout(f,t)
    f()

  recalc: (values)->
    @calculator.recalc(values)

  add_component: (component)->
    @components.push(component)
    component

  draw_circuit: ->
    y_vcc = 30
    y_gnd = 340
    width = 400

    vcc = @add_component( new root.PowerRail({ y: y_vcc, width: width }) )
    gnd = @add_component( new root.GroundRail({ y: y_gnd, width: width }) )

    r1 = @add_component( new root.Resistor({ x: 100, y: y_vcc + 20, label: 'R1'}) )
    r2 = @add_component( new root.Resistor({ x: 100, y: y_vcc + 100, label: 'R2'}) )
    c1 = @add_component( new root.CeramicCapacitor({ x: 100, y: y_vcc + 170, label: 'C1'}) )

    timer = @add_component( new root.LM555({ x: 160, y: y_vcc + 70}) )

    c2 = @add_component( new root.CeramicCapacitor({ x: 215, y: 220, label: 'C2'}) )

    r3 = @add_component( new root.Resistor({ x: 300, y: y_vcc + 130, label: 'R3'}) )
    @output_led = @add_component( new root.Led({ x: 295, y: 230, color: 'red'}) )

    @add_component( new root.ConnectingWire(vcc,105,r1,'1') )
    @add_component( new root.ConnectingWire(r1,'2',r2,'1') )
    @add_component( new root.ConnectingWire(r2,'2',c1,'1') )
    @add_component( new root.ConnectingWire(c1,'2',gnd,105) )

    @add_component( new root.ConnectingWire(vcc,200,timer,'8') )
    @add_component( new root.ConnectingWire(vcc,220,timer,'4') )
    @add_component( new root.ConnectingWire(r2,'1',timer,'7') )
    @add_component( new root.ConnectingWire(r2,'2',timer,'2') )
    @add_component( new root.ConnectingWire(timer,'6',timer,'2') )
    @add_component( new root.ConnectingWire(timer,'1',gnd,200) )
    @add_component( new root.ConnectingWire(timer,'3',r3,'1') )
    @add_component( new root.ConnectingWire(r3,'2',@output_led,'1') )
    @add_component( new root.ConnectingWire(@output_led,'2',gnd,305) )
    @add_component( new root.ConnectingWire(timer,'5',c2,'1') )
    @add_component( new root.ConnectingWire(c2,'2',gnd,220) )

    @redraw()

  redraw: ->
    component.draw(@context) for component in @components

  led_off: ->
    @output_led.draw(@context, false) if @output_led

  led_on: ->
    @output_led.draw(@context, true) if @output_led


