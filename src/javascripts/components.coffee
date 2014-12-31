root = exports ? this

# Base model for drawing components
class root.Component

  constructor: (settings) ->
    @values = @baseDefaults()
    $.extend(@values, @componentDefaults())
    $.extend(@values, settings) if settings
    @pins = @pinPositions()

  # Returns the base set of common defaults
  baseDefaults: ->
    {
      x: 0,           # top-left x
      y: 0,           # top-left y
      width: 100,     # fullwidth
      height: 100,    # height
      orientation: 0, # orientation
      lineWidth: 1,   # line width
      connectorStandoff: 10,
      label: '',      # label text
      font: '14px monospace',
      textBaseline: 'top',
    }

  # Returns component-specific defaults (override in specific components)
  componentDefaults: ->
    {}

  # Command: draw the component on the canvas 2D +context+
  draw: (context)->
    return

  # Returns {x: ,y:} hash with the outlet position for +pin+
  pinPosition: (pin)->
    @pins[pin]

  # Calculates and returns the pin positions for the component (override in specific components)
  pinPositions: ->
    {}


# Resistor component
class root.Resistor  extends root.Component

  componentDefaults: ->
    {
      width: 10,
      height: 60,
    }

  pinPositions: ->
    pp = {}
    pp['1'] = { x: @values.x + @values.width / 2, y: @values.y }
    pp['2'] = { x: @values.x + @values.width / 2, y: @values.y + @values.height }
    pp

  draw: (context)->
    context.beginPath()
    context.strokeStyle  = 'black'
    context.fillStyle = 'white'
    context.rect(@values.x, @values.y + @values.connectorStandoff, @values.width, @values.height - 2 * @values.connectorStandoff)
    context.fill()
    context.stroke()
    context.closePath()

    context.beginPath()
    context.strokeStyle  = 'black'
    context.fillStyle = 'black'
    context.fillText(@values.label, @values.x + @values.width + 3, @values.y + @values.height / 2 - 7)
    context.moveTo(@values.x + @values.width / 2, @values.y)
    context.lineTo(@values.x + @values.width / 2, @values.y + @values.connectorStandoff)
    context.moveTo(@values.x + @values.width / 2, @values.y + @values.height - @values.connectorStandoff)
    context.lineTo(@values.x + @values.width / 2, @values.y + @values.height)
    context.stroke()
    context.closePath()
    return



# Ceramic Capacitor component
class root.CeramicCapacitor extends root.Component

  componentDefaults: ->
    {
      width: 10,
      height: 25,
      lineWidth: 2,
    }

  pinPositions: ->
    pp = {}
    pp['1'] = { x: @values.x + @values.width / 2, y: @values.y }
    pp['2'] = { x: @values.x + @values.width / 2, y: @values.y + @values.height }
    pp

  draw: (context)->
    context.beginPath()
    context.fillStyle = 'black'
    context.fillText(@values.label, @values.x + @values.width + 3, @values.y + @values.height / 2 - 7)
    context.rect(@values.x, @values.y + @values.connectorStandoff, @values.width, @values.lineWidth)
    context.rect(@values.x, @values.y + @values.height - @values.connectorStandoff, @values.width, @values.lineWidth)
    context.moveTo(@values.x +  + @values.width / 2, @values.y)
    context.lineTo(@values.x +  + @values.width / 2, @values.y + @values.connectorStandoff)
    context.moveTo(@values.x +  + @values.width / 2, @values.y + @values.height - @values.connectorStandoff)
    context.lineTo(@values.x +  + @values.width / 2, @values.y + @values.height)
    context.fill()
    context.stroke()
    context.closePath()
    return


# LED component
class root.Led extends root.Component

  componentDefaults: ->
    {
      width: 20,
      height: 30,
      color: 'red',
    }

  pinPositions: ->
    pp = {}
    pp['1'] = { x: @values.x + @values.width / 2, y: @values.y }
    pp['2'] = { x: @values.x + @values.width / 2, y: @values.y + @values.height }
    pp

  draw: (context,in_on_state)->
    component_color = if in_on_state
      @values.color
    else
      'black'

    context.beginPath()
    context.strokeStyle = 'black'
    context.moveTo(@values.x + @values.width / 2, @values.y)
    context.lineTo(@values.x + @values.width / 2, @values.y + @values.connectorStandoff)
    context.moveTo(@values.x + @values.width / 2, @values.y + @values.height - @values.connectorStandoff)
    context.lineTo(@values.x + @values.width / 2, @values.y + @values.height)
    context.stroke()
    context.closePath()

    context.beginPath()
    context.strokeStyle = component_color
    context.fillStyle = component_color

    context.moveTo(@values.x + @values.width,      @values.y + @values.connectorStandoff)
    context.lineTo(@values.x,                      @values.y + @values.connectorStandoff)
    context.lineTo(@values.x + @values.width / 2,  @values.y + @values.height - @values.connectorStandoff)
    context.lineTo(@values.x + @values.width,      @values.y + @values.connectorStandoff)

    context.moveTo(@values.x - 14, @values.y + 12)
    context.lineTo(@values.x - 20, @values.y + 18)

    context.moveTo(@values.x - 13, @values.y + 16)
    context.lineTo(@values.x - 19, @values.y + 22)

    context.rect(@values.x, @values.y + @values.height - @values.connectorStandoff + 1, @values.width, 2)
    context.fill()
    context.stroke()
    context.closePath()
    return



# LM 555 timer component
class root.LM555 extends root.Component

  componentDefaults: ->
    {
      width: 100,
      height: 120,
    }

  pinPositions: ->
    pp = {}
    pp['8'] = { x: @values.x + 40, y: @values.y }
    pp['4'] = { x: @values.x + 60, y: @values.y }
    pp['7'] = { x: @values.x, y: @values.y + 30 }
    pp['6'] = { x: @values.x, y: @values.y + 70 }
    pp['2'] = { x: @values.x, y: @values.y + 90 }
    pp['1'] = { x: @values.x + 40, y: @values.y + 120 }
    pp['5'] = { x: @values.x + 60, y: @values.y + 120 }
    pp['3'] = { x: @values.x + @values.width, y: @values.y + 60 }
    pp

  draw: (context)->
    x = @values.x
    y = @values.y
    connectorStandoff = @values.connectorStandoff
    context.strokeStyle  = "black"
    context.lineWidth = @values.lineWidth

    context.beginPath()
    context.fillStyle = 'white'
    context.rect(x + connectorStandoff, y + connectorStandoff, @values.width - 2 * connectorStandoff, @values.height - 2 * connectorStandoff)
    context.fill()
    context.stroke()
    context.closePath()

    context.beginPath()
    context.fillStyle = 'black'

    # pin 8
    context.moveTo(x + 40, y)
    context.lineTo(x + 40, y + connectorStandoff)
    context.fillText("8", x + 36, y + 15)
    # pin 4
    context.moveTo(x + 60, y)
    context.lineTo(x + 60, y + connectorStandoff)
    context.fillText("4", x + 56, y + 15)

    # pin 7
    context.moveTo(x     , y + 30)
    context.lineTo(x + connectorStandoff, y + 30)
    context.fillText("7", x + 13, y + 24)
    # pin 6
    context.moveTo(x     , y + 70)
    context.lineTo(x + connectorStandoff, y + 70)
    context.fillText("6", x + 13, y + 64)
    # pin 2
    context.moveTo(x     , y + 90)
    context.lineTo(x + connectorStandoff, y + 90)
    context.fillText("2", x + 13, y + 84)

    # pin 1
    context.moveTo(x + 40, y + 110)
    context.lineTo(x + 40, y + 120)
    context.fillText("1", x + 36, y + 95)
    # pin 5
    context.moveTo(x + 60, y + 110)
    context.lineTo(x + 60, y + 120)
    context.fillText("5", x + 56, y + 95)

    # pin 3
    context.moveTo(x + 90,  y + 60)
    context.lineTo(x + 100, y + 60)
    context.fillText("3", x + 78, y + 54)

    context.fill()
    context.stroke()
    context.closePath()


# base component for power/ground rails
class root.CommonRail extends root.Component

  # Returns {x: ,y:} hash with the outlet position for +pin+ where pin can be expressed as x position
  pinPosition: (pin)->
    { x: pin,y: @values.y }

  draw: (context)->
    context.beginPath()
    context.strokeStyle  = "black"
    context.lineWidth = @values.lineWidth
    context.moveTo( @values.x, @values.y )
    context.lineTo( @values.x + @values.width, @values.y + @values.height)
    context.stroke()
    @draw_label(context)
    context.closePath()

# positive power rail
class root.PowerRail extends root.CommonRail

  componentDefaults: ->
    {
      x: 0,
      y: 30,
      width: 400,
      height: 0,
      lineWidth: 2,
      label: 'Vcc'
    }

  draw_label: (context)->
    context.fillText(@values.label, @values.x + 20, @values.y - 15)
    context.stroke()

# ground rail
class root.GroundRail extends root.CommonRail

  componentDefaults: ->
    {
      x: 0,
      y: 340,
      width: 400,
      height: 0,
      lineWidth: 2,
      label: 'Gnd'
    }

  draw_label: (context)->
    context.fillText(@values.label, @values.x + 20, @values.y + 3)
    # draw ground symbol
    gnd_mid = @values.x + @values.width - 50
    gnd_offset = @values.y + @values.height
    context.lineWidth = 1
    context.moveTo( gnd_mid, gnd_offset)
    context.lineTo( gnd_mid, gnd_offset + 8)
    context.moveTo( gnd_mid - 10, gnd_offset + 8)
    context.lineTo( gnd_mid + 10, gnd_offset + 8)
    context.moveTo( gnd_mid - 6, gnd_offset + 11)
    context.lineTo( gnd_mid + 6, gnd_offset + 11)
    context.moveTo( gnd_mid - 3, gnd_offset + 14)
    context.lineTo( gnd_mid + 3, gnd_offset + 14)
    context.stroke()



# a wire that joins two components
class root.ConnectingWire extends root.Component

  constructor: (@part1,@part1_pin,@part2,@part2_pin) ->
    super()

  draw: (context)->
    part1_position = @part1.pinPosition(@part1_pin)
    part2_position = @part2.pinPosition(@part2_pin)
    return unless part1_position && part2_position

    context.beginPath()
    context.strokeStyle  = "black"
    context.lineWidth = @values.lineWidth
    context.moveTo(part1_position.x,part1_position.y)
    context.lineTo(part2_position.x,part2_position.y)
    context.stroke()
    context.closePath()









