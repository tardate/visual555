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
    @context = @container.get(0).getContext("2d")
    @apply_defaults()
    @draw_circuit()
    true

  apply_defaults: ->
    @context.translate(0.5, 0.5)
    @context.font = '14px monospace'
    @context.textBaseline = 'top'

  draw_circuit: ->
    y_vcc = 30
    y_gnd = 340

    @draw_wire(       10, y_vcc,      400, y_vcc)
    @draw_wire(       10, y_gnd,      400, y_gnd)

    @draw_resistor(  100, y_vcc + 20,  'R1')
    @draw_resistor(  100, y_vcc + 100, 'R2')
    @draw_capacitor( 100, y_vcc + 170, 'C1')

    @draw_wire(      105, y_vcc,       105,  y_vcc + 20)
    @draw_wire(      105, y_vcc + 80,  105,  y_vcc + 100)
    @draw_wire(      105, y_vcc + 160, 105,  y_vcc + 170)
    @draw_wire(      105, y_vcc + 200, 105,  y_gnd)

    @draw_wire(     105, y_vcc + 100, 160, y_vcc + 100 )
    @draw_wire(     105, y_vcc + 160, 160, y_vcc + 160 )
    @draw_wire(     160, y_vcc + 140, 160, y_vcc + 160 )
    @draw_wire(     200, y_vcc,      200, y_vcc + 70 )
    @draw_wire(     220, y_vcc,      220, y_vcc + 70 )
    @draw_timer(    160, y_vcc + 70)
    @draw_wire(     200, 220,      200, y_gnd)

    @draw_capacitor(215,220,'C2')
    @draw_wire(     220, 220 + 30,      220, y_gnd)

    @draw_wire(    260, y_vcc + 130, 305, y_vcc + 130 )
    @draw_resistor(300, y_vcc + 130,'R3')

    @draw_wire(    305, y_vcc + 190, 305, y_vcc + 200 )
    @draw_wire(    305, y_vcc + 230, 305, y_gnd )
    @led_off()

  led_off: ->
    @draw_led(305, 230, 'black')

  led_on: ->
    @draw_led(305, 230, 'red')


  draw_wire: (x1,y1,x2,y2)->
    @context.strokeStyle  = "black"
    @context.lineWidth = 1

    @context.beginPath()
    @context.moveTo(x1,y1)
    @context.lineTo(x2,y2)
    @context.stroke()
    @context.closePath()

  # vertical resistor, total h=60
  draw_resistor: (x,y,label)->
    @context.strokeStyle  = "black"
    @context.beginPath()
    @context.fillStyle = 'white'
    @context.rect(x, y + 10, 10, 40)
    @context.fill()
    @context.stroke()
    @context.closePath()

    @context.beginPath()
    @context.fillStyle = 'black'
    @context.fillText(label, x + 13, y + 23)
    @context.moveTo(x + 5, y)
    @context.lineTo(x + 5, y + 10)
    @context.moveTo(x + 5, y + 50)
    @context.lineTo(x + 5, y + 60)
    @context.stroke()
    @context.closePath()

  # vertical capacitor, total h=30
  draw_capacitor: (x,y,label)->
    @context.beginPath()
    @context.fillStyle = 'black'
    @context.fillText(label, x + 13, y + 13)
    @context.rect(x, y + 10, 10, 2)
    @context.rect(x, y + 15, 10, 2)
    @context.moveTo(x + 5, y)
    @context.lineTo(x + 5, y + 10)
    @context.moveTo(x + 5, y + 17)
    @context.lineTo(x + 5, y + 30)
    @context.fill()
    @context.stroke()
    @context.closePath()

  # vertical led, total h=30
  draw_led: (x,y,color)->
    @context.beginPath()
    @context.strokeStyle = 'black'
    @context.moveTo(x, y)
    @context.lineTo(x, y + 10)
    @context.moveTo(x, y + 24)
    @context.lineTo(x, y + 40)
    @context.stroke()
    @context.closePath()

    @context.beginPath()
    @context.strokeStyle = color
    @context.fillStyle = color

    @context.moveTo(x,      y + 10)
    @context.lineTo(x - 10, y + 10)
    @context.lineTo(x,      y + 20)
    @context.lineTo(x + 10, y + 10)
    @context.lineTo(x,      y + 10)

    @context.moveTo(x - 14, y + 12)
    @context.lineTo(x - 20, y + 18)

    @context.moveTo(x - 13, y + 16)
    @context.lineTo(x - 19, y + 22)

    @context.rect(x - 10, y + 21, 20, 2)
    @context.fill()
    @context.stroke()
    @context.closePath()

  draw_timer: (x,y)->
    @context.strokeStyle  = "black"
    @context.lineWidth = 1

    @context.beginPath()
    @context.fillStyle = 'white'
    @context.rect(x + 10, y + 10, 80, 100)
    @context.fill()
    @context.stroke()
    @context.closePath()

    @context.beginPath()
    @context.fillStyle = 'black'

    # pin 8
    @context.moveTo(x + 40, y)
    @context.lineTo(x + 40, y + 10)
    @context.fillText("8", x + 36, y + 15)
    # pin 4
    @context.moveTo(x + 60, y)
    @context.lineTo(x + 60, y + 10)
    @context.fillText("4", x + 56, y + 15)

    # pin 7
    @context.moveTo(x     , y + 30)
    @context.lineTo(x + 10, y + 30)
    @context.fillText("7", x + 13, y + 24)
    # pin 6
    @context.moveTo(x     , y + 70)
    @context.lineTo(x + 10, y + 70)
    @context.fillText("6", x + 13, y + 64)
    # pin 2
    @context.moveTo(x     , y + 90)
    @context.lineTo(x + 10, y + 90)
    @context.fillText("2", x + 13, y + 84)

    # pin 1
    @context.moveTo(x + 40, y + 110)
    @context.lineTo(x + 40, y + 120)
    @context.fillText("1", x + 36, y + 95)
    # pin 5
    @context.moveTo(x + 60, y + 110)
    @context.lineTo(x + 60, y + 120)
    @context.fillText("5", x + 56, y + 95)

    # pin 3
    @context.moveTo(x + 90,  y + 60)
    @context.lineTo(x + 100, y + 60)
    @context.fillText("3", x + 78, y + 54)

    @context.fill()
    @context.stroke()
    @context.closePath()

    # @context.fillStyle  = "white"
    # @context.strokeStyle  = "#000000"
    # @context.lineWidth  = 1
    # @context.strokeRect(x,y,40,60)
    # @context.lineCap  = 'square'

    # @context.beginPath()
    # @context.moveTo(x,y)
    # @context.lineTo(x + 20, y)
    # @context.lineTo(x + 20, y + 80)
    # @context.stroke()
    # @context.closePath()

