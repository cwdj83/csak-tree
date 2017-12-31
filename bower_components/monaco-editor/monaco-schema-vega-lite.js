(function(PolymerVis) {
  PolymerVis.schemas = PolymerVis.schemas || {};
  PolymerVis.schemas['vega-lite'] = {
    "$ref": "#/definitions/TopLevelExtendedSpec",
    "$schema": "http://json-schema.org/draft-04/schema#",
    "definitions": {
      "Aggregate": {
        "anyOf": [
          {
            "$ref": "#/definitions/AggregateOp"
          }
        ]
      },
      "AggregateOp": {
        "enum": [
          "argmax",
          "argmin",
          "average",
          "count",
          "distinct",
          "max",
          "mean",
          "median",
          "min",
          "missing",
          "q1",
          "q3",
          "ci0",
          "ci1",
          "stdev",
          "stdevp",
          "sum",
          "valid",
          "values",
          "variance",
          "variancep"
        ],
        "type": "string"
      },
      "AggregateTransform": {
        "additionalProperties": false,
        "properties": {
          "aggregate": {
            "description": "Array of objects that define fields to aggregate.",
            "items": {
              "$ref": "#/definitions/AggregatedFieldDef"
            },
            "type": "array"
          },
          "groupby": {
            "description": "The data fields to group by. If not specified, a single group containing all data objects will be used.",
            "items": {
              "type": "string"
            },
            "type": "array"
          }
        },
        "required": [
          "aggregate"
        ],
        "type": "object"
      },
      "AggregatedFieldDef": {
        "additionalProperties": false,
        "properties": {
          "as": {
            "description": "The output field names to use for each aggregated field.",
            "type": "string"
          },
          "field": {
            "description": "The data field for which to compute aggregate function.",
            "type": "string"
          },
          "op": {
            "$ref": "#/definitions/AggregateOp",
            "description": "The aggregation operations to apply to the fields, such as sum, average or count.\nSee the [full list of supported aggregation operations](https://vega.github.io/vega-lite/docs/aggregate.html#supported-aggregation-operations)\nfor more information."
          }
        },
        "required": [
          "op",
          "field",
          "as"
        ],
        "type": "object"
      },
      "Anchor": {
        "enum": [
          "start",
          "middle",
          "end"
        ],
        "type": "string"
      },
      "AnyMark": {
        "anyOf": [
          {
            "$ref": "#/definitions/Mark"
          },
          {
            "$ref": "#/definitions/MarkDef"
          }
        ]
      },
      "AutoSizeParams": {
        "additionalProperties": false,
        "properties": {
          "contains": {
            "description": "Determines how size calculation should be performed, one of `\"content\"` or `\"padding\"`. The default setting (`\"content\"`) inteprets the width and height settings as the data rectangle (plotting) dimensions, to which padding is then added. In contrast, the `\"padding\"` setting includes the padding within the view size calculations, such that the width and height settings indicate the **total** intended size of the view.\n\n__Default value__: `\"content\"`",
            "enum": [
              "content",
              "padding"
            ],
            "type": "string"
          },
          "resize": {
            "description": "A boolean flag indicating if autosize layout should be re-calculated on every view update.\n\n__Default value__: `false`",
            "type": "boolean"
          },
          "type": {
            "$ref": "#/definitions/AutosizeType",
            "description": "The sizing format type. One of `\"pad\"`, `\"fit\"` or `\"none\"`. See the [autosize type](https://vega.github.io/vega-lite/docs/size.html#autosize) documentation for descriptions of each.\n\n__Default value__: `\"pad\"`"
          }
        },
        "type": "object"
      },
      "AutosizeType": {
        "enum": [
          "pad",
          "fit",
          "none"
        ],
        "type": "string"
      },
      "Axis": {
        "additionalProperties": false,
        "properties": {
          "domain": {
            "description": "A boolean flag indicating if the domain (the axis baseline) should be included as part of the axis.\n\n__Default value:__ `true`",
            "type": "boolean"
          },
          "format": {
            "description": "The formatting pattern for labels. This is D3's [number format pattern](https://github.com/d3/d3-format#locale_format) for quantitative fields and D3's [time format pattern](https://github.com/d3/d3-time-format#locale_format) for time field.\n\nSee the [format documentation](format.html) for more information.\n\n__Default value:__  derived from [numberFormat](config.html#format) config for quantitative fields and from [timeFormat](config.html#format) config for temporal fields.",
            "type": "string"
          },
          "grid": {
            "description": "A boolean flag indicating if grid lines should be included as part of the axis\n\n__Default value:__ `true` for [continuous scales](scale.html#continuous) that are not binned; otherwise, `false`.",
            "type": "boolean"
          },
          "labelAngle": {
            "description": "The rotation angle of the axis labels.\n\n__Default value:__ `-90` for nominal and ordinal fields; `0` otherwise.",
            "maximum": 360,
            "minimum": -360,
            "type": "number"
          },
          "labelBound": {
            "description": "Indicates if labels should be hidden if they exceed the axis range. If `false `(the default) no bounds overlap analysis is performed. If `true`, labels will be hidden if they exceed the axis range by more than 1 pixel. If this property is a number, it specifies the pixel tolerance: the maximum amount by which a label bounding box may exceed the axis range.\n\n__Default value:__ `false`.",
            "type": [
              "boolean",
              "number"
            ]
          },
          "labelFlush": {
            "description": "Indicates if the first and last axis labels should be aligned flush with the scale range. Flush alignment for a horizontal axis will left-align the first label and right-align the last label. For vertical axes, bottom and top text baselines are applied instead. If this property is a number, it also indicates the number of pixels by which to offset the first and last labels; for example, a value of 2 will flush-align the first and last labels and also push them 2 pixels outward from the center of the axis. The additional adjustment can sometimes help the labels better visually group with corresponding axis ticks.\n\n__Default value:__ `true` for axis of a continuous x-scale. Otherwise, `false`.",
            "type": [
              "boolean",
              "number"
            ]
          },
          "labelOverlap": {
            "anyOf": [
              {
                "type": "boolean"
              },
              {
                "enum": [
                  "parity"
                ],
                "type": "string"
              },
              {
                "enum": [
                  "greedy"
                ],
                "type": "string"
              }
            ],
            "description": "The strategy to use for resolving overlap of axis labels. If `false` (the default), no overlap reduction is attempted. If set to `true` or `\"parity\"`, a strategy of removing every other label is used (this works well for standard linear axes). If set to `\"greedy\"`, a linear scan of the labels is performed, removing any labels that overlaps with the last visible label (this often works better for log-scaled axes).\n\n__Default value:__ `true` for non-nominal fields with non-log scales; `\"greedy\"` for log scales; otherwise `false`."
          },
          "labelPadding": {
            "description": "The padding, in pixels, between axis and text labels.",
            "type": "number"
          },
          "labels": {
            "description": "A boolean flag indicating if labels should be included as part of the axis.\n\n__Default value:__  `true`.",
            "type": "boolean"
          },
          "maxExtent": {
            "description": "The maximum extent in pixels that axis ticks and labels should use. This determines a maximum offset value for axis titles.\n\n__Default value:__ `undefined`.",
            "type": "number"
          },
          "minExtent": {
            "description": "The minimum extent in pixels that axis ticks and labels should use. This determines a minimum offset value for axis titles.\n\n__Default value:__ `30` for y-axis; `undefined` for x-axis.",
            "type": "number"
          },
          "offset": {
            "description": "The offset, in pixels, by which to displace the axis from the edge of the enclosing group or data rectangle.\n\n__Default value:__ derived from the [axis config](config.html#facet-scale-config)'s `offset` (`0` by default)",
            "type": "number"
          },
          "orient": {
            "$ref": "#/definitions/AxisOrient",
            "description": "The orientation of the axis. One of `\"top\"`, `\"bottom\"`, `\"left\"` or `\"right\"`. The orientation can be used to further specialize the axis type (e.g., a y axis oriented for the right edge of the chart).\n\n__Default value:__ `\"bottom\"` for x-axes and `\"left\"` for y-axes."
          },
          "position": {
            "description": "The anchor position of the axis in pixels. For x-axis with top or bottom orientation, this sets the axis group x coordinate. For y-axis with left or right orientation, this sets the axis group y coordinate.\n\n__Default value__: `0`",
            "type": "number"
          },
          "tickCount": {
            "description": "A desired number of ticks, for axes visualizing quantitative scales. The resulting number may be different so that values are \"nice\" (multiples of 2, 5, 10) and lie within the underlying scale's range.",
            "type": "number"
          },
          "tickSize": {
            "description": "The size in pixels of axis ticks.",
            "minimum": 0,
            "type": "number"
          },
          "ticks": {
            "description": "Boolean value that determines whether the axis should include ticks.",
            "type": "boolean"
          },
          "title": {
            "description": "A title for the field. If `null`, the title will be removed.\n\n__Default value:__  derived from the field's name and transformation function (`aggregate`, `bin` and `timeUnit`).  If the field has an aggregate function, the function is displayed as a part of the title (e.g., `\"Sum of Profit\"`). If the field is binned or has a time unit applied, the applied function will be denoted in parentheses (e.g., `\"Profit (binned)\"`, `\"Transaction Date (year-month)\"`).  Otherwise, the title is simply the field name.\n\n__Note__: You can customize the default field title format by providing the [`fieldTitle` property in the [config](config.html) or [`fieldTitle` function via the `compile` function's options](compile.html#field-title).",
            "type": [
              "string",
              "null"
            ]
          },
          "titleMaxLength": {
            "description": "Max length for axis title if the title is automatically generated from the field's description.",
            "type": "number"
          },
          "titlePadding": {
            "description": "The padding, in pixels, between title and axis.",
            "type": "number"
          },
          "values": {
            "anyOf": [
              {
                "items": {
                  "type": "number"
                },
                "type": "array"
              },
              {
                "items": {
                  "$ref": "#/definitions/DateTime"
                },
                "type": "array"
              }
            ],
            "description": "Explicitly set the visible axis tick values."
          },
          "zindex": {
            "description": "A non-positive integer indicating z-index of the axis.\nIf zindex is 0, axes should be drawn behind all chart elements.\nTo put them in front, use `\"zindex = 1\"`.\n\n__Default value:__ `1` (in front of the marks) for actual axis and `0` (behind the marks) for grids.",
            "minimum": 0,
            "type": "number"
          }
        },
        "type": "object"
      },
      "AxisConfig": {
        "additionalProperties": false,
        "properties": {
          "bandPosition": {
            "description": "An interpolation fraction indicating where, for `band` scales, axis ticks should be positioned. A value of `0` places ticks at the left edge of their bands. A value of `0.5` places ticks in the middle of their bands.",
            "type": "number"
          },
          "domain": {
            "description": "A boolean flag indicating if the domain (the axis baseline) should be included as part of the axis.\n\n__Default value:__ `true`",
            "type": "boolean"
          },
          "domainColor": {
            "description": "Color of axis domain line.\n\n__Default value:__  (none, using Vega default).",
            "type": "string"
          },
          "domainWidth": {
            "description": "Stroke width of axis domain line\n\n__Default value:__  (none, using Vega default).",
            "type": "number"
          },
          "grid": {
            "description": "A boolean flag indicating if grid lines should be included as part of the axis\n\n__Default value:__ `true` for [continuous scales](scale.html#continuous) that are not binned; otherwise, `false`.",
            "type": "boolean"
          },
          "gridColor": {
            "description": "Color of gridlines.",
            "type": "string"
          },
          "gridDash": {
            "description": "The offset (in pixels) into which to begin drawing with the grid dash array.",
            "items": {
              "type": "number"
            },
            "type": "array"
          },
          "gridOpacity": {
            "description": "The stroke opacity of grid (value between [0,1])\n\n__Default value:__ (`1` by default)",
            "maximum": 1,
            "minimum": 0,
            "type": "number"
          },
          "gridWidth": {
            "description": "The grid width, in pixels.",
            "minimum": 0,
            "type": "number"
          },
          "labelAngle": {
            "description": "The rotation angle of the axis labels.\n\n__Default value:__ `-90` for nominal and ordinal fields; `0` otherwise.",
            "maximum": 360,
            "minimum": -360,
            "type": "number"
          },
          "labelBound": {
            "description": "Indicates if labels should be hidden if they exceed the axis range. If `false `(the default) no bounds overlap analysis is performed. If `true`, labels will be hidden if they exceed the axis range by more than 1 pixel. If this property is a number, it specifies the pixel tolerance: the maximum amount by which a label bounding box may exceed the axis range.\n\n__Default value:__ `false`.",
            "type": [
              "boolean",
              "number"
            ]
          },
          "labelColor": {
            "description": "The color of the tick label, can be in hex color code or regular color name.",
            "type": "string"
          },
          "labelFlush": {
            "description": "Indicates if the first and last axis labels should be aligned flush with the scale range. Flush alignment for a horizontal axis will left-align the first label and right-align the last label. For vertical axes, bottom and top text baselines are applied instead. If this property is a number, it also indicates the number of pixels by which to offset the first and last labels; for example, a value of 2 will flush-align the first and last labels and also push them 2 pixels outward from the center of the axis. The additional adjustment can sometimes help the labels better visually group with corresponding axis ticks.\n\n__Default value:__ `true` for axis of a continuous x-scale. Otherwise, `false`.",
            "type": [
              "boolean",
              "number"
            ]
          },
          "labelFont": {
            "description": "The font of the tick label.",
            "type": "string"
          },
          "labelFontSize": {
            "description": "The font size of the label, in pixels.",
            "minimum": 0,
            "type": "number"
          },
          "labelLimit": {
            "description": "Maximum allowed pixel width of axis tick labels.",
            "type": "number"
          },
          "labelOverlap": {
            "anyOf": [
              {
                "type": "boolean"
              },
              {
                "enum": [
                  "parity"
                ],
                "type": "string"
              },
              {
                "enum": [
                  "greedy"
                ],
                "type": "string"
              }
            ],
            "description": "The strategy to use for resolving overlap of axis labels. If `false` (the default), no overlap reduction is attempted. If set to `true` or `\"parity\"`, a strategy of removing every other label is used (this works well for standard linear axes). If set to `\"greedy\"`, a linear scan of the labels is performed, removing any labels that overlaps with the last visible label (this often works better for log-scaled axes).\n\n__Default value:__ `true` for non-nominal fields with non-log scales; `\"greedy\"` for log scales; otherwise `false`."
          },
          "labelPadding": {
            "description": "The padding, in pixels, between axis and text labels.",
            "type": "number"
          },
          "labels": {
            "description": "A boolean flag indicating if labels should be included as part of the axis.\n\n__Default value:__  `true`.",
            "type": "boolean"
          },
          "maxExtent": {
            "description": "The maximum extent in pixels that axis ticks and labels should use. This determines a maximum offset value for axis titles.\n\n__Default value:__ `undefined`.",
            "type": "number"
          },
          "minExtent": {
            "description": "The minimum extent in pixels that axis ticks and labels should use. This determines a minimum offset value for axis titles.\n\n__Default value:__ `30` for y-axis; `undefined` for x-axis.",
            "type": "number"
          },
          "shortTimeLabels": {
            "description": "Whether month names and weekday names should be abbreviated.\n\n__Default value:__  `false`",
            "type": "boolean"
          },
          "tickColor": {
            "description": "The color of the axis's tick.",
            "type": "string"
          },
          "tickRound": {
            "description": "Boolean flag indicating if pixel position values should be rounded to the nearest integer.",
            "type": "boolean"
          },
          "tickSize": {
            "description": "The size in pixels of axis ticks.",
            "minimum": 0,
            "type": "number"
          },
          "tickWidth": {
            "description": "The width, in pixels, of ticks.",
            "minimum": 0,
            "type": "number"
          },
          "ticks": {
            "description": "Boolean value that determines whether the axis should include ticks.",
            "type": "boolean"
          },
          "titleAlign": {
            "description": "Horizontal text alignment of axis titles.",
            "type": "string"
          },
          "titleAngle": {
            "description": "Angle in degrees of axis titles.",
            "type": "number"
          },
          "titleBaseline": {
            "description": "Vertical text baseline for axis titles.",
            "type": "string"
          },
          "titleColor": {
            "description": "Color of the title, can be in hex color code or regular color name.",
            "type": "string"
          },
          "titleFont": {
            "description": "Font of the title. (e.g., `\"Helvetica Neue\"`).",
            "type": "string"
          },
          "titleFontSize": {
            "description": "Font size of the title.",
            "minimum": 0,
            "type": "number"
          },
          "titleFontWeight": {
            "description": "Font weight of the title. (e.g., `\"bold\"`).",
            "type": [
              "string",
              "number"
            ]
          },
          "titleLimit": {
            "description": "Maximum allowed pixel width of axis titles.",
            "type": "number"
          },
          "titleMaxLength": {
            "description": "Max length for axis title if the title is automatically generated from the field's description.",
            "type": "number"
          },
          "titlePadding": {
            "description": "The padding, in pixels, between title and axis.",
            "type": "number"
          },
          "titleX": {
            "description": "X-coordinate of the axis title relative to the axis group.",
            "type": "number"
          },
          "titleY": {
            "description": "Y-coordinate of the axis title relative to the axis group.",
            "type": "number"
          }
        },
        "type": "object"
      },
      "AxisConfigMixins": {
        "additionalProperties": false,
        "properties": {
          "axis": {
            "$ref": "#/definitions/AxisConfig",
            "description": "Axis configuration, which determines default properties for all `x` and `y` [axes](axis.html). For a full list of axis configuration options, please see the [corresponding section of the axis documentation](axis.html#config)."
          },
          "axisBand": {
            "$ref": "#/definitions/VgAxisConfig",
            "description": "Specific axis config for axes with \"band\" scales."
          },
          "axisBottom": {
            "$ref": "#/definitions/VgAxisConfig",
            "description": "Specific axis config for x-axis along the bottom edge of the chart."
          },
          "axisLeft": {
            "$ref": "#/definitions/VgAxisConfig",
            "description": "Specific axis config for y-axis along the left edge of the chart."
          },
          "axisRight": {
            "$ref": "#/definitions/VgAxisConfig",
            "description": "Specific axis config for y-axis along the right edge of the chart."
          },
          "axisTop": {
            "$ref": "#/definitions/VgAxisConfig",
            "description": "Specific axis config for x-axis along the top edge of the chart."
          },
          "axisX": {
            "$ref": "#/definitions/VgAxisConfig",
            "description": "X-axis specific config."
          },
          "axisY": {
            "$ref": "#/definitions/VgAxisConfig",
            "description": "Y-axis specific config."
          }
        },
        "type": "object"
      },
      "AxisOrient": {
        "enum": [
          "top",
          "right",
          "left",
          "bottom"
        ],
        "type": "string"
      },
      "AxisResolveMap": {
        "additionalProperties": false,
        "properties": {
          "x": {
            "$ref": "#/definitions/ResolveMode"
          },
          "y": {
            "$ref": "#/definitions/ResolveMode"
          }
        },
        "type": "object"
      },
      "BarConfig": {
        "additionalProperties": false,
        "properties": {
          "align": {
            "$ref": "#/definitions/HorizontalAlign",
            "description": "The horizontal alignment of the text. One of `\"left\"`, `\"right\"`, `\"center\"`."
          },
          "angle": {
            "description": "The rotation angle of the text, in degrees.",
            "maximum": 360,
            "minimum": 0,
            "type": "number"
          },
          "baseline": {
            "$ref": "#/definitions/VerticalAlign",
            "description": "The vertical alignment of the text. One of `\"top\"`, `\"middle\"`, `\"bottom\"`.\n\n__Default value:__ `\"middle\"`"
          },
          "binSpacing": {
            "description": "Offset between bar for binned field.  Ideal value for this is either 0 (Preferred by statisticians) or 1 (Vega-Lite Default, D3 example style).\n\n__Default value:__ `1`",
            "minimum": 0,
            "type": "number"
          },
          "color": {
            "description": "Default color.  Note that `fill` and `stroke` have higher precedence than `color` and will override `color`.\n\n__Default value:__ <span style=\"color: #4682b4;\">&#9632;</span> `\"#4682b4\"`\n\n__Note:__ This property cannot be used in a [style config](mark.html#style-config).",
            "type": "string"
          },
          "continuousBandSize": {
            "description": "The default size of the bars on continuous scales.\n\n__Default value:__ `5`",
            "minimum": 0,
            "type": "number"
          },
          "discreteBandSize": {
            "description": "The size of the bars.  If unspecified, the default size is  `bandSize-1`,\nwhich provides 1 pixel offset between bars.",
            "minimum": 0,
            "type": "number"
          },
          "dx": {
            "description": "The horizontal offset, in pixels, between the text label and its anchor point. The offset is applied after rotation by the _angle_ property.",
            "type": "number"
          },
          "dy": {
            "description": "The vertical offset, in pixels, between the text label and its anchor point. The offset is applied after rotation by the _angle_ property.",
            "type": "number"
          },
          "fill": {
            "description": "Default Fill Color.  This has higher precedence than config.color\n\n__Default value:__ (None)",
            "type": "string"
          },
          "fillOpacity": {
            "description": "The fill opacity (value between [0,1]).\n\n__Default value:__ `1`",
            "maximum": 1,
            "minimum": 0,
            "type": "number"
          },
          "filled": {
            "description": "Whether the mark's color should be used as fill color instead of stroke color.\n\n__Default value:__ `true` for all marks except `point` and `false` for `point`.\n\n__Applicable for:__ `bar`, `point`, `circle`, `square`, and `area` marks.\n\n__Note:__ This property cannot be used in a [style config](mark.html#style-config).",
            "type": "boolean"
          },
          "font": {
            "description": "The typeface to set the text in (e.g., `\"Helvetica Neue\"`).",
            "type": "string"
          },
          "fontSize": {
            "description": "The font size, in pixels.",
            "minimum": 0,
            "type": "number"
          },
          "fontStyle": {
            "$ref": "#/definitions/FontStyle",
            "description": "The font style (e.g., `\"italic\"`)."
          },
          "fontWeight": {
            "anyOf": [
              {
                "$ref": "#/definitions/FontWeight"
              },
              {
                "$ref": "#/definitions/FontWeightNumber"
              }
            ],
            "description": "The font weight (e.g., `\"bold\"`)."
          },
          "interpolate": {
            "$ref": "#/definitions/Interpolate",
            "description": "The line interpolation method to use for line and area marks. One of the following:\n- `\"linear\"`: piecewise linear segments, as in a polyline.\n- `\"linear-closed\"`: close the linear segments to form a polygon.\n- `\"step\"`: alternate between horizontal and vertical segments, as in a step function.\n- `\"step-before\"`: alternate between vertical and horizontal segments, as in a step function.\n- `\"step-after\"`: alternate between horizontal and vertical segments, as in a step function.\n- `\"basis\"`: a B-spline, with control point duplication on the ends.\n- `\"basis-open\"`: an open B-spline; may not intersect the start or end.\n- `\"basis-closed\"`: a closed B-spline, as in a loop.\n- `\"cardinal\"`: a Cardinal spline, with control point duplication on the ends.\n- `\"cardinal-open\"`: an open Cardinal spline; may not intersect the start or end, but will intersect other control points.\n- `\"cardinal-closed\"`: a closed Cardinal spline, as in a loop.\n- `\"bundle\"`: equivalent to basis, except the tension parameter is used to straighten the spline.\n- `\"monotone\"`: cubic interpolation that preserves monotonicity in y."
          },
          "limit": {
            "description": "The maximum length of the text mark in pixels (default 0, indicating no limit). The text value will be automatically truncated if the rendered size exceeds the limit.",
            "type": "number"
          },
          "opacity": {
            "description": "The overall opacity (value between [0,1]).\n\n__Default value:__ `0.7` for non-aggregate plots with `point`, `tick`, `circle`, or `square` marks or layered `bar` charts and `1` otherwise.",
            "maximum": 1,
            "minimum": 0,
            "type": "number"
          },
          "orient": {
            "$ref": "#/definitions/Orient",
            "description": "The orientation of a non-stacked bar, tick, area, and line charts.\nThe value is either horizontal (default) or vertical.\n- For bar, rule and tick, this determines whether the size of the bar and tick\nshould be applied to x or y dimension.\n- For area, this property determines the orient property of the Vega output.\n- For line, this property determines the sort order of the points in the line\nif `config.sortLineBy` is not specified.\nFor stacked charts, this is always determined by the orientation of the stack;\ntherefore explicitly specified value will be ignored."
          },
          "radius": {
            "description": "Polar coordinate radial offset, in pixels, of the text label from the origin determined by the `x` and `y` properties.",
            "minimum": 0,
            "type": "number"
          },
          "shape": {
            "description": "The default symbol shape to use. One of: `\"circle\"` (default), `\"square\"`, `\"cross\"`, `\"diamond\"`, `\"triangle-up\"`, or `\"triangle-down\"`, or a custom SVG path.\n\n__Default value:__ `\"circle\"`",
            "type": "string"
          },
          "size": {
            "description": "The pixel area each the point/circle/square.\nFor example: in the case of circles, the radius is determined in part by the square root of the size value.\n\n__Default value:__ `30`",
            "minimum": 0,
            "type": "number"
          },
          "stroke": {
            "description": "Default Stroke Color.  This has higher precedence than config.color\n\n__Default value:__ (None)",
            "type": "string"
          },
          "strokeDash": {
            "description": "An array of alternating stroke, space lengths for creating dashed or dotted lines.",
            "items": {
              "type": "number"
            },
            "type": "array"
          },
          "strokeDashOffset": {
            "description": "The offset (in pixels) into which to begin drawing with the stroke dash array.",
            "type": "number"
          },
          "strokeOpacity": {
            "description": "The stroke opacity (value between [0,1]).\n\n__Default value:__ `1`",
            "maximum": 1,
            "minimum": 0,
            "type": "number"
          },
          "strokeWidth": {
            "description": "The stroke width, in pixels.",
            "minimum": 0,
            "type": "number"
          },
          "tension": {
            "description": "Depending on the interpolation type, sets the tension parameter (for line and area marks).",
            "maximum": 1,
            "minimum": 0,
            "type": "number"
          },
          "text": {
            "description": "Placeholder text if the `text` channel is not specified",
            "type": "string"
          },
          "theta": {
            "description": "Polar coordinate angle, in radians, of the text label from the origin determined by the `x` and `y` properties. Values for `theta` follow the same convention of `arc` mark `startAngle` and `endAngle` properties: angles are measured in radians, with `0` indicating \"north\".",
            "type": "number"
          }
        },
        "type": "object"
      },
      "BaseBin": {
        "additionalProperties": false,
        "properties": {
          "base": {
            "description": "The number base to use for automatic bin determination (default is base 10).\n\n__Default value:__ `10`",
            "type": "number"
          },
          "divide": {
            "description": "Scale factors indicating allowable subdivisions. The default value is [5, 2], which indicates that for base 10 numbers (the default base), the method may consider dividing bin sizes by 5 and/or 2. For example, for an initial step size of 10, the method can check if bin sizes of 2 (= 10/5), 5 (= 10/2), or 1 (= 10/(5*2)) might also satisfy the given constraints.\n\n__Default value:__ `[5, 2]`",
            "items": {
              "type": "number"
            },
            "minItems": 1,
            "type": "array"
          },
          "maxbins": {
            "description": "Maximum number of bins.\n\n__Default value:__ `6` for `row`, `column` and `shape` channels; `10` for other channels",
            "minimum": 2,
            "type": "number"
          },
          "minstep": {
            "description": "A minimum allowable step size (particularly useful for integer values).",
            "type": "number"
          },
          "nice": {
            "description": "If true (the default), attempts to make the bin boundaries use human-friendly boundaries, such as multiples of ten.",
            "type": "boolean"
          },
          "step": {
            "description": "An exact step size to use between bins.\n\n__Note:__ If provided, options such as maxbins will be ignored.",
            "type": "number"
          },
          "steps": {
            "description": "An array of allowable step sizes to choose from.",
            "items": {
              "type": "number"
            },
            "minItems": 1,
            "type": "array"
          }
        },
        "type": "object"
      },
      "BaseSelectionDef": {
        "additionalProperties": false,
        "properties": {
          "empty": {
            "description": "By default, all data values are considered to lie within an empty selection.\nWhen set to `none`, empty selections contain no data values.",
            "enum": [
              "all",
              "none"
            ],
            "type": "string"
          },
          "encodings": {
            "description": "An array of encoding channels. The corresponding data field values\nmust match for a data tuple to fall within the selection.",
            "items": {
              "$ref": "#/definitions/SingleDefChannel"
            },
            "type": "array"
          },
          "fields": {
            "description": "An array of field names whose values must match for a data tuple to\nfall within the selection.",
            "items": {
              "type": "string"
            },
            "type": "array"
          },
          "on": {
            "$ref": "#/definitions/VgEventStream",
            "description": "A [Vega event stream](https://vega.github.io/vega/docs/event-streams/) (object or selector) that triggers the selection.\nFor interval selections, the event stream must specify a [start and end](https://vega.github.io/vega/docs/event-streams/#between-filters)."
          },
          "resolve": {
            "$ref": "#/definitions/SelectionResolution",
            "description": "With layered and multi-view displays, a strategy that determines how\nselections' data queries are resolved when applied in a filter transform,\nconditional encoding rule, or scale domain."
          }
        },
        "type": "object"
      },
      "BaseSpec": {
        "additionalProperties": false,
        "properties": {
          "data": {
            "$ref": "#/definitions/Data",
            "description": "An object describing the data source"
          },
          "description": {
            "description": "Description of this mark for commenting purpose.",
            "type": "string"
          },
          "name": {
            "description": "Name of the visualization for later reference.",
            "type": "string"
          },
          "title": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "$ref": "#/definitions/TitleParams"
              }
            ],
            "description": "Title for the plot."
          },
          "transform": {
            "description": "An array of data transformations such as filter and new field calculation.",
            "items": {
              "$ref": "#/definitions/Transform"
            },
            "type": "array"
          }
        },
        "type": "object"
      },
      "BinParams": {
        "additionalProperties": false,
        "description": "Binning properties or boolean flag for determining whether to bin data or not.",
        "properties": {
          "base": {
            "description": "The number base to use for automatic bin determination (default is base 10).\n\n__Default value:__ `10`",
            "type": "number"
          },
          "divide": {
            "description": "Scale factors indicating allowable subdivisions. The default value is [5, 2], which indicates that for base 10 numbers (the default base), the method may consider dividing bin sizes by 5 and/or 2. For example, for an initial step size of 10, the method can check if bin sizes of 2 (= 10/5), 5 (= 10/2), or 1 (= 10/(5*2)) might also satisfy the given constraints.\n\n__Default value:__ `[5, 2]`",
            "items": {
              "type": "number"
            },
            "minItems": 1,
            "type": "array"
          },
          "extent": {
            "description": "A two-element (`[min, max]`) array indicating the range of desired bin values.",
            "items": {
              "type": "number"
            },
            "maxItems": 2,
            "minItems": 2,
            "type": "array"
          },
          "maxbins": {
            "description": "Maximum number of bins.\n\n__Default value:__ `6` for `row`, `column` and `shape` channels; `10` for other channels",
            "minimum": 2,
            "type": "number"
          },
          "minstep": {
            "description": "A minimum allowable step size (particularly useful for integer values).",
            "type": "number"
          },
          "nice": {
            "description": "If true (the default), attempts to make the bin boundaries use human-friendly boundaries, such as multiples of ten.",
            "type": "boolean"
          },
          "step": {
            "description": "An exact step size to use between bins.\n\n__Note:__ If provided, options such as maxbins will be ignored.",
            "type": "number"
          },
          "steps": {
            "description": "An array of allowable step sizes to choose from.",
            "items": {
              "type": "number"
            },
            "minItems": 1,
            "type": "array"
          }
        },
        "type": "object"
      },
      "BinTransform": {
        "additionalProperties": false,
        "properties": {
          "as": {
            "description": "The output fields at which to write the start and end bin values.",
            "type": "string"
          },
          "bin": {
            "anyOf": [
              {
                "type": "boolean"
              },
              {
                "$ref": "#/definitions/BinParams"
              }
            ],
            "description": "An object indicating bin properties, or simply `true` for using default bin parameters."
          },
          "field": {
            "description": "The data field to bin.",
            "type": "string"
          }
        },
        "required": [
          "bin",
          "field",
          "as"
        ],
        "type": "object"
      },
      "BoxPlotConfig": {
        "additionalProperties": false,
        "properties": {
          "align": {
            "$ref": "#/definitions/HorizontalAlign",
            "description": "The horizontal alignment of the text. One of `\"left\"`, `\"right\"`, `\"center\"`."
          },
          "angle": {
            "description": "The rotation angle of the text, in degrees.",
            "maximum": 360,
            "minimum": 0,
            "type": "number"
          },
          "baseline": {
            "$ref": "#/definitions/VerticalAlign",
            "description": "The vertical alignment of the text. One of `\"top\"`, `\"middle\"`, `\"bottom\"`.\n\n__Default value:__ `\"middle\"`"
          },
          "color": {
            "description": "Default color.  Note that `fill` and `stroke` have higher precedence than `color` and will override `color`.\n\n__Default value:__ <span style=\"color: #4682b4;\">&#9632;</span> `\"#4682b4\"`\n\n__Note:__ This property cannot be used in a [style config](mark.html#style-config).",
            "type": "string"
          },
          "dx": {
            "description": "The horizontal offset, in pixels, between the text label and its anchor point. The offset is applied after rotation by the _angle_ property.",
            "type": "number"
          },
          "dy": {
            "description": "The vertical offset, in pixels, between the text label and its anchor point. The offset is applied after rotation by the _angle_ property.",
            "type": "number"
          },
          "fill": {
            "description": "Default Fill Color.  This has higher precedence than config.color\n\n__Default value:__ (None)",
            "type": "string"
          },
          "fillOpacity": {
            "description": "The fill opacity (value between [0,1]).\n\n__Default value:__ `1`",
            "maximum": 1,
            "minimum": 0,
            "type": "number"
          },
          "filled": {
            "description": "Whether the mark's color should be used as fill color instead of stroke color.\n\n__Default value:__ `true` for all marks except `point` and `false` for `point`.\n\n__Applicable for:__ `bar`, `point`, `circle`, `square`, and `area` marks.\n\n__Note:__ This property cannot be used in a [style config](mark.html#style-config).",
            "type": "boolean"
          },
          "font": {
            "description": "The typeface to set the text in (e.g., `\"Helvetica Neue\"`).",
            "type": "string"
          },
          "fontSize": {
            "description": "The font size, in pixels.",
            "minimum": 0,
            "type": "number"
          },
          "fontStyle": {
            "$ref": "#/definitions/FontStyle",
            "description": "The font style (e.g., `\"italic\"`)."
          },
          "fontWeight": {
            "anyOf": [
              {
                "$ref": "#/definitions/FontWeight"
              },
              {
                "$ref": "#/definitions/FontWeightNumber"
              }
            ],
            "description": "The font weight (e.g., `\"bold\"`)."
          },
          "interpolate": {
            "$ref": "#/definitions/Interpolate",
            "description": "The line interpolation method to use for line and area marks. One of the following:\n- `\"linear\"`: piecewise linear segments, as in a polyline.\n- `\"linear-closed\"`: close the linear segments to form a polygon.\n- `\"step\"`: alternate between horizontal and vertical segments, as in a step function.\n- `\"step-before\"`: alternate between vertical and horizontal segments, as in a step function.\n- `\"step-after\"`: alternate between horizontal and vertical segments, as in a step function.\n- `\"basis\"`: a B-spline, with control point duplication on the ends.\n- `\"basis-open\"`: an open B-spline; may not intersect the start or end.\n- `\"basis-closed\"`: a closed B-spline, as in a loop.\n- `\"cardinal\"`: a Cardinal spline, with control point duplication on the ends.\n- `\"cardinal-open\"`: an open Cardinal spline; may not intersect the start or end, but will intersect other control points.\n- `\"cardinal-closed\"`: a closed Cardinal spline, as in a loop.\n- `\"bundle\"`: equivalent to basis, except the tension parameter is used to straighten the spline.\n- `\"monotone\"`: cubic interpolation that preserves monotonicity in y."
          },
          "limit": {
            "description": "The maximum length of the text mark in pixels (default 0, indicating no limit). The text value will be automatically truncated if the rendered size exceeds the limit.",
            "type": "number"
          },
          "opacity": {
            "description": "The overall opacity (value between [0,1]).\n\n__Default value:__ `0.7` for non-aggregate plots with `point`, `tick`, `circle`, or `square` marks or layered `bar` charts and `1` otherwise.",
            "maximum": 1,
            "minimum": 0,
            "type": "number"
          },
          "orient": {
            "$ref": "#/definitions/Orient",
            "description": "The orientation of a non-stacked bar, tick, area, and line charts.\nThe value is either horizontal (default) or vertical.\n- For bar, rule and tick, this determines whether the size of the bar and tick\nshould be applied to x or y dimension.\n- For area, this property determines the orient property of the Vega output.\n- For line, this property determines the sort order of the points in the line\nif `config.sortLineBy` is not specified.\nFor stacked charts, this is always determined by the orientation of the stack;\ntherefore explicitly specified value will be ignored."
          },
          "radius": {
            "description": "Polar coordinate radial offset, in pixels, of the text label from the origin determined by the `x` and `y` properties.",
            "minimum": 0,
            "type": "number"
          },
          "shape": {
            "description": "The default symbol shape to use. One of: `\"circle\"` (default), `\"square\"`, `\"cross\"`, `\"diamond\"`, `\"triangle-up\"`, or `\"triangle-down\"`, or a custom SVG path.\n\n__Default value:__ `\"circle\"`",
            "type": "string"
          },
          "size": {
            "description": "Size of the box and mid tick of a box plot ",
            "type": "number"
          },
          "stroke": {
            "description": "Default Stroke Color.  This has higher precedence than config.color\n\n__Default value:__ (None)",
            "type": "string"
          },
          "strokeDash": {
            "description": "An array of alternating stroke, space lengths for creating dashed or dotted lines.",
            "items": {
              "type": "number"
            },
            "type": "array"
          },
          "strokeDashOffset": {
            "description": "The offset (in pixels) into which to begin drawing with the stroke dash array.",
            "type": "number"
          },
          "strokeOpacity": {
            "description": "The stroke opacity (value between [0,1]).\n\n__Default value:__ `1`",
            "maximum": 1,
            "minimum": 0,
            "type": "number"
          },
          "strokeWidth": {
            "description": "The stroke width, in pixels.",
            "minimum": 0,
            "type": "number"
          },
          "tension": {
            "description": "Depending on the interpolation type, sets the tension parameter (for line and area marks).",
            "maximum": 1,
            "minimum": 0,
            "type": "number"
          },
          "text": {
            "description": "Placeholder text if the `text` channel is not specified",
            "type": "string"
          },
          "theta": {
            "description": "Polar coordinate angle, in radians, of the text label from the origin determined by the `x` and `y` properties. Values for `theta` follow the same convention of `arc` mark `startAngle` and `endAngle` properties: angles are measured in radians, with `0` indicating \"north\".",
            "type": "number"
          }
        },
        "type": "object"
      },
      "BoxPlotConfigMixins": {
        "additionalProperties": false,
        "properties": {
          "box": {
            "$ref": "#/definitions/BoxPlotConfig",
            "description": "Box Config "
          },
          "boxMid": {
            "$ref": "#/definitions/MarkConfig"
          },
          "boxWhisker": {
            "$ref": "#/definitions/MarkConfig"
          }
        },
        "type": "object"
      },
      "BrushConfig": {
        "additionalProperties": false,
        "properties": {
          "fill": {
            "description": "The fill color of the interval mark.\n\n__Default value:__ `#333333`",
            "type": "string"
          },
          "fillOpacity": {
            "description": "The fill opacity of the interval mark (a value between 0 and 1).\n\n__Default value:__ `0.125`",
            "type": "number"
          },
          "stroke": {
            "description": "The stroke color of the interval mark.\n\n__Default value:__ `#ffffff`",
            "type": "string"
          },
          "strokeDash": {
            "description": "An array of alternating stroke and space lengths,\nfor creating dashed or dotted lines.",
            "items": {
              "type": "number"
            },
            "type": "array"
          },
          "strokeDashOffset": {
            "description": "The offset (in pixels) with which to begin drawing the stroke dash array.",
            "type": "number"
          },
          "strokeOpacity": {
            "description": "The stroke opacity of the interval mark (a value between 0 and 1).",
            "type": "number"
          },
          "strokeWidth": {
            "description": "The stroke width of the interval mark.",
            "type": "number"
          }
        },
        "type": "object"
      },
      "CalculateTransform": {
        "additionalProperties": false,
        "properties": {
          "as": {
            "description": "The field for storing the computed formula value.",
            "type": "string"
          },
          "calculate": {
            "description": "A string containing a Vega Expression. Use the variable `datum` to refer to the current data object.",
            "type": "string"
          }
        },
        "required": [
          "calculate",
          "as"
        ],
        "type": "object"
      },
      "CompositeMarkConfigMixins": {
        "$ref": "#/definitions/BoxPlotConfigMixins"
      },
      "CompositeUnitSpec": {
        "$ref": "#/definitions/CompositeUnitSpecAlias",
        "description": "Unit spec that can have a composite mark."
      },
      "Conditional<MarkPropFieldDef>": {
        "additionalProperties": false,
        "properties": {
          "aggregate": {
            "$ref": "#/definitions/Aggregate",
            "description": "Aggregation function for the field\n(e.g., `mean`, `sum`, `median`, `min`, `max`, `count`).\n\n__Default value:__ `undefined` (None)"
          },
          "bin": {
            "anyOf": [
              {
                "type": "boolean"
              },
              {
                "$ref": "#/definitions/BinParams"
              }
            ],
            "description": "A flag for binning a `quantitative` field, or [an object defining binning parameters](bin.html#params).\nIf `true`, default [binning parameters](bin.html) will be applied.\n\n__Default value:__ `false`"
          },
          "field": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "$ref": "#/definitions/RepeatRef"
              }
            ],
            "description": "__Required.__ A string defining the name of the field from which to pull a data value\nor an object defining iterated values from the [`repeat`](repeat.html) operator.\n\n__Note:__ `field` is not required if `aggregate` is `count`."
          },
          "legend": {
            "anyOf": [
              {
                "$ref": "#/definitions/Legend"
              },
              {
                "type": "null"
              }
            ],
            "description": "An object defining properties of the legend.\nIf `null`, the legend for the encoding channel will be removed.\n\n__Default value:__ If undefined, default [legend properties](legend.html) are applied."
          },
          "scale": {
            "$ref": "#/definitions/Scale",
            "description": "An object defining properties of the channel's scale, which is the function that transforms values in the data domain (numbers, dates, strings, etc) to visual values (pixels, colors, sizes) of the encoding channels.\n\n__Default value:__ If undefined, default [scale properties](scale.html) are applied."
          },
          "selection": {
            "$ref": "#/definitions/SelectionOperand",
            "description": "A [selection name](selection.html), or a series of [composed selections](selection.html#compose)."
          },
          "sort": {
            "anyOf": [
              {
                "$ref": "#/definitions/SortOrder"
              },
              {
                "$ref": "#/definitions/SortField"
              },
              {
                "type": "null"
              }
            ],
            "description": "Sort order for the encoded field.\nSupported `sort` values include `\"ascending\"`, `\"descending\"` and `null` (no sorting).\nFor fields with discrete domains, `sort` can also be a [sort field definition object](sort.html#sort-field).\n\n__Default value:__ `\"ascending\"`"
          },
          "timeUnit": {
            "$ref": "#/definitions/TimeUnit",
            "description": "Time unit (e.g., `year`, `yearmonth`, `month`, `hours`) for a temporal field.\nor [a temporal field that gets casted as ordinal](type.html#cast).\n\n__Default value:__ `undefined` (None)"
          },
          "type": {
            "$ref": "#/definitions/Type",
            "description": "The encoded field's type of measurement (`\"quantitative\"`, `\"temporal\"`, `\"ordinal\"`, or `\"nominal\"`)."
          }
        },
        "required": [
          "selection",
          "type"
        ],
        "type": "object"
      },
      "Conditional<TextFieldDef>": {
        "additionalProperties": false,
        "properties": {
          "aggregate": {
            "$ref": "#/definitions/Aggregate",
            "description": "Aggregation function for the field\n(e.g., `mean`, `sum`, `median`, `min`, `max`, `count`).\n\n__Default value:__ `undefined` (None)"
          },
          "bin": {
            "anyOf": [
              {
                "type": "boolean"
              },
              {
                "$ref": "#/definitions/BinParams"
              }
            ],
            "description": "A flag for binning a `quantitative` field, or [an object defining binning parameters](bin.html#params).\nIf `true`, default [binning parameters](bin.html) will be applied.\n\n__Default value:__ `false`"
          },
          "field": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "$ref": "#/definitions/RepeatRef"
              }
            ],
            "description": "__Required.__ A string defining the name of the field from which to pull a data value\nor an object defining iterated values from the [`repeat`](repeat.html) operator.\n\n__Note:__ `field` is not required if `aggregate` is `count`."
          },
          "format": {
            "description": "The [formatting pattern](format.html) for a text field. If not defined, this will be determined automatically.",
            "type": "string"
          },
          "selection": {
            "$ref": "#/definitions/SelectionOperand",
            "description": "A [selection name](selection.html), or a series of [composed selections](selection.html#compose)."
          },
          "timeUnit": {
            "$ref": "#/definitions/TimeUnit",
            "description": "Time unit (e.g., `year`, `yearmonth`, `month`, `hours`) for a temporal field.\nor [a temporal field that gets casted as ordinal](type.html#cast).\n\n__Default value:__ `undefined` (None)"
          },
          "type": {
            "$ref": "#/definitions/Type",
            "description": "The encoded field's type of measurement (`\"quantitative\"`, `\"temporal\"`, `\"ordinal\"`, or `\"nominal\"`)."
          }
        },
        "required": [
          "selection",
          "type"
        ],
        "type": "object"
      },
      "Conditional<ValueDef>": {
        "additionalProperties": false,
        "properties": {
          "selection": {
            "$ref": "#/definitions/SelectionOperand",
            "description": "A [selection name](selection.html), or a series of [composed selections](selection.html#compose)."
          },
          "value": {
            "description": "A constant value in visual domain (e.g., `\"red\"` / \"#0099ff\" for color, values between `0` to `1` for opacity).",
            "type": [
              "number",
              "string",
              "boolean"
            ]
          }
        },
        "required": [
          "selection",
          "value"
        ],
        "type": "object"
      },
      "Config": {
        "additionalProperties": false,
        "properties": {
          "area": {
            "$ref": "#/definitions/MarkConfig",
            "description": "Area-Specific Config "
          },
          "autosize": {
            "anyOf": [
              {
                "$ref": "#/definitions/AutosizeType"
              },
              {
                "$ref": "#/definitions/AutoSizeParams"
              }
            ],
            "description": "Sets how the visualization size should be determined. If a string, should be one of `\"pad\"`, `\"fit\"` or `\"none\"`.\nObject values can additionally specify parameters for content sizing and automatic resizing.\n`\"fit\"` is only supported for single and layered views that don't use `rangeStep`.\n\n__Default value__: `pad`"
          },
          "axis": {
            "$ref": "#/definitions/AxisConfig",
            "description": "Axis configuration, which determines default properties for all `x` and `y` [axes](axis.html). For a full list of axis configuration options, please see the [corresponding section of the axis documentation](axis.html#config)."
          },
          "axisBand": {
            "$ref": "#/definitions/VgAxisConfig",
            "description": "Specific axis config for axes with \"band\" scales."
          },
          "axisBottom": {
            "$ref": "#/definitions/VgAxisConfig",
            "description": "Specific axis config for x-axis along the bottom edge of the chart."
          },
          "axisLeft": {
            "$ref": "#/definitions/VgAxisConfig",
            "description": "Specific axis config for y-axis along the left edge of the chart."
          },
          "axisRight": {
            "$ref": "#/definitions/VgAxisConfig",
            "description": "Specific axis config for y-axis along the right edge of the chart."
          },
          "axisTop": {
            "$ref": "#/definitions/VgAxisConfig",
            "description": "Specific axis config for x-axis along the top edge of the chart."
          },
          "axisX": {
            "$ref": "#/definitions/VgAxisConfig",
            "description": "X-axis specific config."
          },
          "axisY": {
            "$ref": "#/definitions/VgAxisConfig",
            "description": "Y-axis specific config."
          },
          "background": {
            "description": "CSS color property to use as the background of visualization.\n\n__Default value:__ none (transparent)",
            "type": "string"
          },
          "bar": {
            "$ref": "#/definitions/BarConfig",
            "description": "Bar-Specific Config "
          },
          "circle": {
            "$ref": "#/definitions/MarkConfig",
            "description": "Circle-Specific Config "
          },
          "countTitle": {
            "description": "Default axis and legend title for count fields.\n\n__Default value:__ `'Number of Records'`.",
            "type": "string"
          },
          "fieldTitle": {
            "description": "Defines how Vega-Lite generates title for fields.  There are three possible styles:\n- `\"verbal\"` (Default) - displays function in a verbal style (e.g., \"Sum of field\", \"Year-month of date\", \"field (binned)\").\n- `\"function\"` - displays function using parentheses and capitalized texts (e.g., \"SUM(field)\", \"YEARMONTH(date)\", \"BIN(field)\").\n- `\"plain\"` - displays only the field name without functions (e.g., \"field\", \"date\", \"field\").",
            "enum": [
              "verbal",
              "functional",
              "plain"
            ],
            "type": "string"
          },
          "invalidValues": {
            "description": "Defines how Vega-Lite should handle invalid values (`null` and `NaN`).\n- If set to `\"filter\"` (default), all data items with null values are filtered.\n- If `null`, all data items are included. In this case, invalid values will be interpreted as zeroes.",
            "enum": [
              "filter"
            ],
            "type": "string"
          },
          "legend": {
            "$ref": "#/definitions/LegendConfig",
            "description": "Legend configuration, which determines default properties for all [legends](legend.html). For a full list of legend configuration options, please see the [corresponding section of in the legend documentation](legend.html#config)."
          },
          "line": {
            "$ref": "#/definitions/MarkConfig",
            "description": "Line-Specific Config "
          },
          "mark": {
            "$ref": "#/definitions/MarkConfig",
            "description": "Mark Config "
          },
          "numberFormat": {
            "description": "D3 Number format for axis labels and text tables. For example \"s\" for SI units. Use [D3's number format pattern](https://github.com/d3/d3-format#locale_format).",
            "type": "string"
          },
          "padding": {
            "$ref": "#/definitions/Padding",
            "description": "The default visualization padding, in pixels, from the edge of the visualization canvas to the data rectangle.  If a number, specifies padding for all sides.\nIf an object, the value should have the format `{\"left\": 5, \"top\": 5, \"right\": 5, \"bottom\": 5}` to specify padding for each side of the visualization.\n\n__Default value__: `5`"
          },
          "point": {
            "$ref": "#/definitions/MarkConfig",
            "description": "Point-Specific Config "
          },
          "range": {
            "$ref": "#/definitions/RangeConfig",
            "description": "An object hash that defines default range arrays or schemes for using with scales.\nFor a full list of scale range configuration options, please see the [corresponding section of the scale documentation](scale.html#config)."
          },
          "rect": {
            "$ref": "#/definitions/MarkConfig",
            "description": "Rect-Specific Config "
          },
          "rule": {
            "$ref": "#/definitions/MarkConfig",
            "description": "Rule-Specific Config "
          },
          "scale": {
            "$ref": "#/definitions/ScaleConfig",
            "description": "Scale configuration determines default properties for all [scales](scale.html). For a full list of scale configuration options, please see the [corresponding section of the scale documentation](scale.html#config)."
          },
          "selection": {
            "$ref": "#/definitions/SelectionConfig",
            "description": "An object hash for defining default properties for each type of selections. "
          },
          "square": {
            "$ref": "#/definitions/MarkConfig",
            "description": "Square-Specific Config "
          },
          "stack": {
            "$ref": "#/definitions/StackOffset",
            "description": "Default stack offset for stackable mark. "
          },
          "style": {
            "$ref": "#/definitions/StyleConfigIndex",
            "description": "An object hash that defines key-value mappings to determine default properties for marks with a given [style](mark.html#mark-def).  The keys represent styles names; the value are valid [mark configuration objects](mark.html#config).  "
          },
          "text": {
            "$ref": "#/definitions/TextConfig",
            "description": "Text-Specific Config "
          },
          "tick": {
            "$ref": "#/definitions/TickConfig",
            "description": "Tick-Specific Config "
          },
          "timeFormat": {
            "description": "Default datetime format for axis and legend labels. The format can be set directly on each axis and legend. Use [D3's time format pattern](https://github.com/d3/d3-time-format#locale_format).\n\n__Default value:__ `'%b %d, %Y'`.",
            "type": "string"
          },
          "title": {
            "$ref": "#/definitions/VgTitleConfig",
            "description": "Title configuration, which determines default properties for all [titles](title.html). For a full list of title configuration options, please see the [corresponding section of the title documentation](title.html#config)."
          },
          "view": {
            "$ref": "#/definitions/ViewConfig",
            "description": "Default properties for [single view plots](spec.html#single). "
          }
        },
        "type": "object"
      },
      "CsvDataFormat": {
        "additionalProperties": false,
        "properties": {
          "parse": {
            "anyOf": [
              {
                "enum": [
                  "auto"
                ],
                "type": "string"
              },
              {
                "type": "object"
              }
            ],
            "description": "If set to auto (the default), perform automatic type inference to determine the desired data types.\nAlternatively, a parsing directive object can be provided for explicit data types. Each property of the object corresponds to a field name, and the value to the desired data type (one of `\"number\"`, `\"boolean\"` or `\"date\"`).\nFor example, `\"parse\": {\"modified_on\": \"date\"}` parses the `modified_on` field in each input record a Date value.\n\nFor `\"date\"`, we parse data based using Javascript's [`Date.parse()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse).\nFor Specific date formats can be provided (e.g., `{foo: 'date:\"%m%d%Y\"'}`), using the [d3-time-format syntax](https://github.com/d3/d3-time-format#locale_format). UTC date format parsing is supported similarly (e.g., `{foo: 'utc:\"%m%d%Y\"'}`). See more about [UTC time](timeunit.html#utc)"
          },
          "type": {
            "description": "Type of input data: `\"json\"`, `\"csv\"`, `\"tsv\"`.\nThe default format type is determined by the extension of the file URL.\nIf no extension is detected, `\"json\"` will be used by default.",
            "enum": [
              "csv",
              "tsv"
            ],
            "type": "string"
          }
        },
        "type": "object"
      },
      "Data": {
        "anyOf": [
          {
            "$ref": "#/definitions/UrlData"
          },
          {
            "$ref": "#/definitions/InlineData"
          },
          {
            "$ref": "#/definitions/NamedData"
          }
        ]
      },
      "DataFormat": {
        "anyOf": [
          {
            "$ref": "#/definitions/CsvDataFormat"
          },
          {
            "$ref": "#/definitions/JsonDataFormat"
          },
          {
            "$ref": "#/definitions/TopoDataFormat"
          }
        ]
      },
      "DataFormatBase": {
        "additionalProperties": false,
        "properties": {
          "parse": {
            "anyOf": [
              {
                "enum": [
                  "auto"
                ],
                "type": "string"
              },
              {
                "type": "object"
              }
            ],
            "description": "If set to auto (the default), perform automatic type inference to determine the desired data types.\nAlternatively, a parsing directive object can be provided for explicit data types. Each property of the object corresponds to a field name, and the value to the desired data type (one of `\"number\"`, `\"boolean\"` or `\"date\"`).\nFor example, `\"parse\": {\"modified_on\": \"date\"}` parses the `modified_on` field in each input record a Date value.\n\nFor `\"date\"`, we parse data based using Javascript's [`Date.parse()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse).\nFor Specific date formats can be provided (e.g., `{foo: 'date:\"%m%d%Y\"'}`), using the [d3-time-format syntax](https://github.com/d3/d3-time-format#locale_format). UTC date format parsing is supported similarly (e.g., `{foo: 'utc:\"%m%d%Y\"'}`). See more about [UTC time](timeunit.html#utc)"
          },
          "type": {
            "$ref": "#/definitions/DataFormatType",
            "description": "Type of input data: `\"json\"`, `\"csv\"`, `\"tsv\"`.\nThe default format type is determined by the extension of the file URL.\nIf no extension is detected, `\"json\"` will be used by default."
          }
        },
        "type": "object"
      },
      "DataFormatType": {
        "enum": [
          "json",
          "csv",
          "tsv",
          "topojson"
        ],
        "type": "string"
      },
      "DateTime": {
        "additionalProperties": false,
        "description": "Object for defining datetime in Vega-Lite Filter.\nIf both month and quarter are provided, month has higher precedence.\n`day` cannot be combined with other date.\nWe accept string for month and day names.",
        "properties": {
          "date": {
            "description": "Integer value representing the date from 1-31.",
            "maximum": 31,
            "minimum": 1,
            "type": "number"
          },
          "day": {
            "anyOf": [
              {
                "$ref": "#/definitions/Day"
              },
              {
                "type": "string"
              }
            ],
            "description": "Value representing the day of a week.  This can be one of: (1) integer value -- `1` represents Monday; (2) case-insensitive day name (e.g., `\"Monday\"`);  (3) case-insensitive, 3-character short day name (e.g., `\"Mon\"`).   <br/> **Warning:** A DateTime definition object with `day`** should not be combined with `year`, `quarter`, `month`, or `date`."
          },
          "hours": {
            "description": "Integer value representing the hour of a day from 0-23.",
            "maximum": 23,
            "minimum": 0,
            "type": "number"
          },
          "milliseconds": {
            "description": "Integer value representing the millisecond segment of time.",
            "maximum": 999,
            "minimum": 0,
            "type": "number"
          },
          "minutes": {
            "description": "Integer value representing the minute segment of time from 0-59.",
            "maximum": 59,
            "minimum": 0,
            "type": "number"
          },
          "month": {
            "anyOf": [
              {
                "$ref": "#/definitions/Month"
              },
              {
                "type": "string"
              }
            ],
            "description": "One of: (1) integer value representing the month from `1`-`12`. `1` represents January;  (2) case-insensitive month name (e.g., `\"January\"`);  (3) case-insensitive, 3-character short month name (e.g., `\"Jan\"`). "
          },
          "quarter": {
            "description": "Integer value representing the quarter of the year (from 1-4).",
            "maximum": 4,
            "minimum": 1,
            "type": "number"
          },
          "seconds": {
            "description": "Integer value representing the second segment (0-59) of a time value",
            "maximum": 59,
            "minimum": 0,
            "type": "number"
          },
          "utc": {
            "description": "A boolean flag indicating if date time is in utc time. If false, the date time is in local time",
            "type": "boolean"
          },
          "year": {
            "description": "Integer value representing the year.",
            "type": "number"
          }
        },
        "type": "object"
      },
      "Day": {
        "maximum": 7,
        "minimum": 1,
        "type": "number"
      },
      "Encoding": {
        "additionalProperties": false,
        "properties": {
          "color": {
            "anyOf": [
              {
                "$ref": "#/definitions/MarkPropFieldDefWithCondition"
              },
              {
                "$ref": "#/definitions/MarkPropValueDefWithCondition"
              }
            ],
            "description": "Color of the marks – either fill or stroke color based on mark type.\nBy default, `color` represents fill color for `\"area\"`, `\"bar\"`, `\"tick\"`,\n`\"text\"`, `\"circle\"`, and `\"square\"` / stroke color for `\"line\"` and `\"point\"`.\n\n__Default value:__ If undefined, the default color depends on [mark config](config.html#mark)'s `color` property.\n\n_Note:_ See the scale documentation for more information about customizing [color scheme](scale.html#scheme)."
          },
          "detail": {
            "anyOf": [
              {
                "$ref": "#/definitions/FieldDef"
              },
              {
                "items": {
                  "$ref": "#/definitions/FieldDef"
                },
                "type": "array"
              }
            ],
            "description": "Additional levels of detail for grouping data in aggregate views and\nin line and area marks without mapping data to a specific visual channel."
          },
          "opacity": {
            "anyOf": [
              {
                "$ref": "#/definitions/MarkPropFieldDefWithCondition"
              },
              {
                "$ref": "#/definitions/MarkPropValueDefWithCondition"
              }
            ],
            "description": "Opacity of the marks – either can be a value or a range.\n\n__Default value:__ If undefined, the default opacity depends on [mark config](config.html#mark)'s `opacity` property."
          },
          "order": {
            "anyOf": [
              {
                "$ref": "#/definitions/OrderFieldDef"
              },
              {
                "items": {
                  "$ref": "#/definitions/OrderFieldDef"
                },
                "type": "array"
              }
            ],
            "description": "Stack order for stacked marks or order of data points in line marks for connected scatter plots.\n\n__Note__: In aggregate plots, `order` field should be `aggregate`d to avoid creating additional aggregation grouping."
          },
          "shape": {
            "anyOf": [
              {
                "$ref": "#/definitions/MarkPropFieldDefWithCondition"
              },
              {
                "$ref": "#/definitions/MarkPropValueDefWithCondition"
              }
            ],
            "description": "The symbol's shape (only for `point` marks). The supported values are\n`\"circle\"` (default), `\"square\"`, `\"cross\"`, `\"diamond\"`, `\"triangle-up\"`,\nor `\"triangle-down\"`, or else a custom SVG path string.\n__Default value:__ If undefined, the default shape depends on [mark config](config.html#point-config)'s `shape` property."
          },
          "size": {
            "anyOf": [
              {
                "$ref": "#/definitions/MarkPropFieldDefWithCondition"
              },
              {
                "$ref": "#/definitions/MarkPropValueDefWithCondition"
              }
            ],
            "description": "Size of the mark.\n- For `\"point\"`, `\"square\"` and `\"circle\"`, – the symbol size, or pixel area of the mark.\n- For `\"bar\"` and `\"tick\"` – the bar and tick's size.\n- For `\"text\"` – the text's font size.\n- Size is currently unsupported for `\"line\"`, `\"area\"`, and `\"rect\"`."
          },
          "text": {
            "anyOf": [
              {
                "$ref": "#/definitions/TextFieldDefWithCondition"
              },
              {
                "$ref": "#/definitions/TextValueDefWithCondition"
              }
            ],
            "description": "Text of the `text` mark."
          },
          "tooltip": {
            "anyOf": [
              {
                "$ref": "#/definitions/TextFieldDefWithCondition"
              },
              {
                "$ref": "#/definitions/TextValueDefWithCondition"
              }
            ],
            "description": "The tooltip text to show upon mouse hover."
          },
          "x": {
            "anyOf": [
              {
                "$ref": "#/definitions/PositionFieldDef"
              },
              {
                "$ref": "#/definitions/ValueDef"
              }
            ],
            "description": "X coordinates of the marks, or width of horizontal `\"bar\"` and `\"area\"`."
          },
          "x2": {
            "anyOf": [
              {
                "$ref": "#/definitions/FieldDef"
              },
              {
                "$ref": "#/definitions/ValueDef"
              }
            ],
            "description": "X2 coordinates for ranged  `\"area\"`, `\"bar\"`, `\"rect\"`, and  `\"rule\"`."
          },
          "y": {
            "anyOf": [
              {
                "$ref": "#/definitions/PositionFieldDef"
              },
              {
                "$ref": "#/definitions/ValueDef"
              }
            ],
            "description": "Y coordinates of the marks, or height of vertical `\"bar\"` and `\"area\"`."
          },
          "y2": {
            "anyOf": [
              {
                "$ref": "#/definitions/FieldDef"
              },
              {
                "$ref": "#/definitions/ValueDef"
              }
            ],
            "description": "Y2 coordinates for ranged  `\"area\"`, `\"bar\"`, `\"rect\"`, and  `\"rule\"`."
          }
        },
        "type": "object"
      },
      "EncodingWithFacet": {
        "additionalProperties": false,
        "properties": {
          "color": {
            "anyOf": [
              {
                "$ref": "#/definitions/MarkPropFieldDefWithCondition"
              },
              {
                "$ref": "#/definitions/MarkPropValueDefWithCondition"
              }
            ],
            "description": "Color of the marks – either fill or stroke color based on mark type.\nBy default, `color` represents fill color for `\"area\"`, `\"bar\"`, `\"tick\"`,\n`\"text\"`, `\"circle\"`, and `\"square\"` / stroke color for `\"line\"` and `\"point\"`.\n\n__Default value:__ If undefined, the default color depends on [mark config](config.html#mark)'s `color` property.\n\n_Note:_ See the scale documentation for more information about customizing [color scheme](scale.html#scheme)."
          },
          "column": {
            "$ref": "#/definitions/FacetFieldDef",
            "description": "Horizontal facets for trellis plots."
          },
          "detail": {
            "anyOf": [
              {
                "$ref": "#/definitions/FieldDef"
              },
              {
                "items": {
                  "$ref": "#/definitions/FieldDef"
                },
                "type": "array"
              }
            ],
            "description": "Additional levels of detail for grouping data in aggregate views and\nin line and area marks without mapping data to a specific visual channel."
          },
          "opacity": {
            "anyOf": [
              {
                "$ref": "#/definitions/MarkPropFieldDefWithCondition"
              },
              {
                "$ref": "#/definitions/MarkPropValueDefWithCondition"
              }
            ],
            "description": "Opacity of the marks – either can be a value or a range.\n\n__Default value:__ If undefined, the default opacity depends on [mark config](config.html#mark)'s `opacity` property."
          },
          "order": {
            "anyOf": [
              {
                "$ref": "#/definitions/OrderFieldDef"
              },
              {
                "items": {
                  "$ref": "#/definitions/OrderFieldDef"
                },
                "type": "array"
              }
            ],
            "description": "Stack order for stacked marks or order of data points in line marks for connected scatter plots.\n\n__Note__: In aggregate plots, `order` field should be `aggregate`d to avoid creating additional aggregation grouping."
          },
          "row": {
            "$ref": "#/definitions/FacetFieldDef",
            "description": "Vertical facets for trellis plots."
          },
          "shape": {
            "anyOf": [
              {
                "$ref": "#/definitions/MarkPropFieldDefWithCondition"
              },
              {
                "$ref": "#/definitions/MarkPropValueDefWithCondition"
              }
            ],
            "description": "The symbol's shape (only for `point` marks). The supported values are\n`\"circle\"` (default), `\"square\"`, `\"cross\"`, `\"diamond\"`, `\"triangle-up\"`,\nor `\"triangle-down\"`, or else a custom SVG path string.\n__Default value:__ If undefined, the default shape depends on [mark config](config.html#point-config)'s `shape` property."
          },
          "size": {
            "anyOf": [
              {
                "$ref": "#/definitions/MarkPropFieldDefWithCondition"
              },
              {
                "$ref": "#/definitions/MarkPropValueDefWithCondition"
              }
            ],
            "description": "Size of the mark.\n- For `\"point\"`, `\"square\"` and `\"circle\"`, – the symbol size, or pixel area of the mark.\n- For `\"bar\"` and `\"tick\"` – the bar and tick's size.\n- For `\"text\"` – the text's font size.\n- Size is currently unsupported for `\"line\"`, `\"area\"`, and `\"rect\"`."
          },
          "text": {
            "anyOf": [
              {
                "$ref": "#/definitions/TextFieldDefWithCondition"
              },
              {
                "$ref": "#/definitions/TextValueDefWithCondition"
              }
            ],
            "description": "Text of the `text` mark."
          },
          "tooltip": {
            "anyOf": [
              {
                "$ref": "#/definitions/TextFieldDefWithCondition"
              },
              {
                "$ref": "#/definitions/TextValueDefWithCondition"
              }
            ],
            "description": "The tooltip text to show upon mouse hover."
          },
          "x": {
            "anyOf": [
              {
                "$ref": "#/definitions/PositionFieldDef"
              },
              {
                "$ref": "#/definitions/ValueDef"
              }
            ],
            "description": "X coordinates of the marks, or width of horizontal `\"bar\"` and `\"area\"`."
          },
          "x2": {
            "anyOf": [
              {
                "$ref": "#/definitions/FieldDef"
              },
              {
                "$ref": "#/definitions/ValueDef"
              }
            ],
            "description": "X2 coordinates for ranged  `\"area\"`, `\"bar\"`, `\"rect\"`, and  `\"rule\"`."
          },
          "y": {
            "anyOf": [
              {
                "$ref": "#/definitions/PositionFieldDef"
              },
              {
                "$ref": "#/definitions/ValueDef"
              }
            ],
            "description": "Y coordinates of the marks, or height of vertical `\"bar\"` and `\"area\"`."
          },
          "y2": {
            "anyOf": [
              {
                "$ref": "#/definitions/FieldDef"
              },
              {
                "$ref": "#/definitions/ValueDef"
              }
            ],
            "description": "Y2 coordinates for ranged  `\"area\"`, `\"bar\"`, `\"rect\"`, and  `\"rule\"`."
          }
        },
        "type": "object"
      },
      "EqualFilter": {
        "additionalProperties": false,
        "properties": {
          "equal": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "number"
              },
              {
                "type": "boolean"
              },
              {
                "$ref": "#/definitions/DateTime"
              }
            ],
            "description": "The value that the field should be equal to."
          },
          "field": {
            "description": "Field to be filtered.",
            "type": "string"
          },
          "timeUnit": {
            "$ref": "#/definitions/TimeUnit",
            "description": "Time unit for the field to be filtered."
          }
        },
        "required": [
          "field",
          "equal"
        ],
        "type": "object"
      },
      "FacetFieldDef": {
        "additionalProperties": false,
        "properties": {
          "aggregate": {
            "$ref": "#/definitions/Aggregate",
            "description": "Aggregation function for the field\n(e.g., `mean`, `sum`, `median`, `min`, `max`, `count`).\n\n__Default value:__ `undefined` (None)"
          },
          "bin": {
            "anyOf": [
              {
                "type": "boolean"
              },
              {
                "$ref": "#/definitions/BinParams"
              }
            ],
            "description": "A flag for binning a `quantitative` field, or [an object defining binning parameters](bin.html#params).\nIf `true`, default [binning parameters](bin.html) will be applied.\n\n__Default value:__ `false`"
          },
          "field": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "$ref": "#/definitions/RepeatRef"
              }
            ],
            "description": "__Required.__ A string defining the name of the field from which to pull a data value\nor an object defining iterated values from the [`repeat`](repeat.html) operator.\n\n__Note:__ `field` is not required if `aggregate` is `count`."
          },
          "header": {
            "$ref": "#/definitions/Header",
            "description": "An object defining properties of a facet's header."
          },
          "sort": {
            "$ref": "#/definitions/SortOrder",
            "description": "Sort order for a facet field.\nThis can be `\"ascending\"`, `\"descending\"`."
          },
          "timeUnit": {
            "$ref": "#/definitions/TimeUnit",
            "description": "Time unit (e.g., `year`, `yearmonth`, `month`, `hours`) for a temporal field.\nor [a temporal field that gets casted as ordinal](type.html#cast).\n\n__Default value:__ `undefined` (None)"
          },
          "type": {
            "$ref": "#/definitions/Type",
            "description": "The encoded field's type of measurement (`\"quantitative\"`, `\"temporal\"`, `\"ordinal\"`, or `\"nominal\"`)."
          }
        },
        "required": [
          "type"
        ],
        "type": "object"
      },
      "FacetMapping": {
        "additionalProperties": false,
        "properties": {
          "column": {
            "$ref": "#/definitions/FacetFieldDef",
            "description": "Horizontal facets for trellis plots."
          },
          "row": {
            "$ref": "#/definitions/FacetFieldDef",
            "description": "Vertical facets for trellis plots."
          }
        },
        "type": "object"
      },
      "FacetedUnitSpec": {
        "$ref": "#/definitions/FacetedCompositeUnitSpecAlias",
        "description": "Unit spec that can have a composite mark and row or column channels."
      },
      "FieldDef": {
        "additionalProperties": false,
        "description": "Definition object for a data field, its type and transformation of an encoding channel.",
        "properties": {
          "aggregate": {
            "$ref": "#/definitions/Aggregate",
            "description": "Aggregation function for the field\n(e.g., `mean`, `sum`, `median`, `min`, `max`, `count`).\n\n__Default value:__ `undefined` (None)"
          },
          "bin": {
            "anyOf": [
              {
                "type": "boolean"
              },
              {
                "$ref": "#/definitions/BinParams"
              }
            ],
            "description": "A flag for binning a `quantitative` field, or [an object defining binning parameters](bin.html#params).\nIf `true`, default [binning parameters](bin.html) will be applied.\n\n__Default value:__ `false`"
          },
          "field": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "$ref": "#/definitions/RepeatRef"
              }
            ],
            "description": "__Required.__ A string defining the name of the field from which to pull a data value\nor an object defining iterated values from the [`repeat`](repeat.html) operator.\n\n__Note:__ `field` is not required if `aggregate` is `count`."
          },
          "timeUnit": {
            "$ref": "#/definitions/TimeUnit",
            "description": "Time unit (e.g., `year`, `yearmonth`, `month`, `hours`) for a temporal field.\nor [a temporal field that gets casted as ordinal](type.html#cast).\n\n__Default value:__ `undefined` (None)"
          },
          "type": {
            "$ref": "#/definitions/Type",
            "description": "The encoded field's type of measurement (`\"quantitative\"`, `\"temporal\"`, `\"ordinal\"`, or `\"nominal\"`)."
          }
        },
        "required": [
          "type"
        ],
        "type": "object"
      },
      "FieldDefBase": {
        "additionalProperties": false,
        "properties": {
          "aggregate": {
            "$ref": "#/definitions/Aggregate",
            "description": "Aggregation function for the field\n(e.g., `mean`, `sum`, `median`, `min`, `max`, `count`).\n\n__Default value:__ `undefined` (None)"
          },
          "bin": {
            "anyOf": [
              {
                "type": "boolean"
              },
              {
                "$ref": "#/definitions/BinParams"
              }
            ],
            "description": "A flag for binning a `quantitative` field, or [an object defining binning parameters](bin.html#params).\nIf `true`, default [binning parameters](bin.html) will be applied.\n\n__Default value:__ `false`"
          },
          "field": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "$ref": "#/definitions/RepeatRef"
              }
            ],
            "description": "__Required.__ A string defining the name of the field from which to pull a data value\nor an object defining iterated values from the [`repeat`](repeat.html) operator.\n\n__Note:__ `field` is not required if `aggregate` is `count`."
          },
          "timeUnit": {
            "$ref": "#/definitions/TimeUnit",
            "description": "Time unit (e.g., `year`, `yearmonth`, `month`, `hours`) for a temporal field.\nor [a temporal field that gets casted as ordinal](type.html#cast).\n\n__Default value:__ `undefined` (None)"
          }
        },
        "type": "object"
      },
      "MarkPropFieldDefWithCondition": {
        "additionalProperties": false,
        "description": "A FieldDef with Condition<ValueDef>\n{\n   condition: {value: ...},\n   field: ...,\n   ...\n}",
        "properties": {
          "aggregate": {
            "$ref": "#/definitions/Aggregate",
            "description": "Aggregation function for the field\n(e.g., `mean`, `sum`, `median`, `min`, `max`, `count`).\n\n__Default value:__ `undefined` (None)"
          },
          "bin": {
            "anyOf": [
              {
                "type": "boolean"
              },
              {
                "$ref": "#/definitions/BinParams"
              }
            ],
            "description": "A flag for binning a `quantitative` field, or [an object defining binning parameters](bin.html#params).\nIf `true`, default [binning parameters](bin.html) will be applied.\n\n__Default value:__ `false`"
          },
          "condition": {
            "anyOf": [
              {
                "$ref": "#/definitions/Conditional<ValueDef>"
              },
              {
                "items": {
                  "$ref": "#/definitions/Conditional<ValueDef>"
                },
                "type": "array"
              }
            ],
            "description": "One or more value definition(s) with a selection predicate.\n\n__Note:__ A field definition's `condition` property can only contain [value definitions](encoding.html#value)\nsince Vega-Lite only allows at mosty  one encoded field per encoding channel."
          },
          "field": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "$ref": "#/definitions/RepeatRef"
              }
            ],
            "description": "__Required.__ A string defining the name of the field from which to pull a data value\nor an object defining iterated values from the [`repeat`](repeat.html) operator.\n\n__Note:__ `field` is not required if `aggregate` is `count`."
          },
          "legend": {
            "anyOf": [
              {
                "$ref": "#/definitions/Legend"
              },
              {
                "type": "null"
              }
            ],
            "description": "An object defining properties of the legend.\nIf `null`, the legend for the encoding channel will be removed.\n\n__Default value:__ If undefined, default [legend properties](legend.html) are applied."
          },
          "scale": {
            "$ref": "#/definitions/Scale",
            "description": "An object defining properties of the channel's scale, which is the function that transforms values in the data domain (numbers, dates, strings, etc) to visual values (pixels, colors, sizes) of the encoding channels.\n\n__Default value:__ If undefined, default [scale properties](scale.html) are applied."
          },
          "sort": {
            "anyOf": [
              {
                "$ref": "#/definitions/SortOrder"
              },
              {
                "$ref": "#/definitions/SortField"
              },
              {
                "type": "null"
              }
            ],
            "description": "Sort order for the encoded field.\nSupported `sort` values include `\"ascending\"`, `\"descending\"` and `null` (no sorting).\nFor fields with discrete domains, `sort` can also be a [sort field definition object](sort.html#sort-field).\n\n__Default value:__ `\"ascending\"`"
          },
          "timeUnit": {
            "$ref": "#/definitions/TimeUnit",
            "description": "Time unit (e.g., `year`, `yearmonth`, `month`, `hours`) for a temporal field.\nor [a temporal field that gets casted as ordinal](type.html#cast).\n\n__Default value:__ `undefined` (None)"
          },
          "type": {
            "$ref": "#/definitions/Type",
            "description": "The encoded field's type of measurement (`\"quantitative\"`, `\"temporal\"`, `\"ordinal\"`, or `\"nominal\"`)."
          }
        },
        "required": [
          "type"
        ],
        "type": "object"
      },
      "TextFieldDefWithCondition": {
        "additionalProperties": false,
        "description": "A FieldDef with Condition<ValueDef>\n{\n   condition: {value: ...},\n   field: ...,\n   ...\n}",
        "properties": {
          "aggregate": {
            "$ref": "#/definitions/Aggregate",
            "description": "Aggregation function for the field\n(e.g., `mean`, `sum`, `median`, `min`, `max`, `count`).\n\n__Default value:__ `undefined` (None)"
          },
          "bin": {
            "anyOf": [
              {
                "type": "boolean"
              },
              {
                "$ref": "#/definitions/BinParams"
              }
            ],
            "description": "A flag for binning a `quantitative` field, or [an object defining binning parameters](bin.html#params).\nIf `true`, default [binning parameters](bin.html) will be applied.\n\n__Default value:__ `false`"
          },
          "condition": {
            "anyOf": [
              {
                "$ref": "#/definitions/Conditional<ValueDef>"
              },
              {
                "items": {
                  "$ref": "#/definitions/Conditional<ValueDef>"
                },
                "type": "array"
              }
            ],
            "description": "One or more value definition(s) with a selection predicate.\n\n__Note:__ A field definition's `condition` property can only contain [value definitions](encoding.html#value)\nsince Vega-Lite only allows at mosty  one encoded field per encoding channel."
          },
          "field": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "$ref": "#/definitions/RepeatRef"
              }
            ],
            "description": "__Required.__ A string defining the name of the field from which to pull a data value\nor an object defining iterated values from the [`repeat`](repeat.html) operator.\n\n__Note:__ `field` is not required if `aggregate` is `count`."
          },
          "format": {
            "description": "The [formatting pattern](format.html) for a text field. If not defined, this will be determined automatically.",
            "type": "string"
          },
          "timeUnit": {
            "$ref": "#/definitions/TimeUnit",
            "description": "Time unit (e.g., `year`, `yearmonth`, `month`, `hours`) for a temporal field.\nor [a temporal field that gets casted as ordinal](type.html#cast).\n\n__Default value:__ `undefined` (None)"
          },
          "type": {
            "$ref": "#/definitions/Type",
            "description": "The encoded field's type of measurement (`\"quantitative\"`, `\"temporal\"`, `\"ordinal\"`, or `\"nominal\"`)."
          }
        },
        "required": [
          "type"
        ],
        "type": "object"
      },
      "Filter": {
        "anyOf": [
          {
            "$ref": "#/definitions/EqualFilter"
          },
          {
            "$ref": "#/definitions/RangeFilter"
          },
          {
            "$ref": "#/definitions/OneOfFilter"
          },
          {
            "$ref": "#/definitions/SelectionFilter"
          },
          {
            "type": "string"
          }
        ]
      },
      "FilterTransform": {
        "additionalProperties": false,
        "properties": {
          "filter": {
            "$ref": "#/definitions/FilterOperand",
            "description": "The `filter` property must be either (1) a filter object for [equal-filters](filter.html#equalfilter),\n[range-filters](filter.html#rangefilter), [one-of filters](filter.html#oneoffilter), or [selection filters](filter.html#selectionfilter);\n(2) a [Vega Expression](filter.html#expression) string,\nwhere `datum` can be used to refer to the current data object; or (3) an array of filters (either objects or expression strings) that must all be true for a datum to pass the filter and be included."
          }
        },
        "required": [
          "filter"
        ],
        "type": "object"
      },
      "FontStyle": {
        "enum": [
          "normal",
          "italic"
        ],
        "type": "string"
      },
      "FontWeight": {
        "enum": [
          "normal",
          "bold"
        ],
        "type": "string"
      },
      "FontWeightNumber": {
        "maximum": 900,
        "minimum": 100,
        "type": "number"
      },
      "FacetSpec": {
        "additionalProperties": false,
        "properties": {
          "data": {
            "$ref": "#/definitions/Data",
            "description": "An object describing the data source"
          },
          "description": {
            "description": "Description of this mark for commenting purpose.",
            "type": "string"
          },
          "facet": {
            "$ref": "#/definitions/FacetMapping",
            "description": "An object that describes mappings between `row` and `column` channels and their field definitions."
          },
          "name": {
            "description": "Name of the visualization for later reference.",
            "type": "string"
          },
          "resolve": {
            "$ref": "#/definitions/Resolve",
            "description": "Scale, axis, and legend resolutions for facets."
          },
          "spec": {
            "anyOf": [
              {
                "$ref": "#/definitions/LayerSpec"
              },
              {
                "$ref": "#/definitions/CompositeUnitSpec"
              }
            ],
            "description": "A specification of the view that gets faceted."
          },
          "title": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "$ref": "#/definitions/TitleParams"
              }
            ],
            "description": "Title for the plot."
          },
          "transform": {
            "description": "An array of data transformations such as filter and new field calculation.",
            "items": {
              "$ref": "#/definitions/Transform"
            },
            "type": "array"
          }
        },
        "required": [
          "facet",
          "spec"
        ],
        "type": "object"
      },
      "HConcatSpec": {
        "additionalProperties": false,
        "properties": {
          "data": {
            "$ref": "#/definitions/Data",
            "description": "An object describing the data source"
          },
          "description": {
            "description": "Description of this mark for commenting purpose.",
            "type": "string"
          },
          "hconcat": {
            "description": "A list of views that should be concatenated and put into a row.",
            "items": {
              "$ref": "#/definitions/Spec"
            },
            "type": "array"
          },
          "name": {
            "description": "Name of the visualization for later reference.",
            "type": "string"
          },
          "resolve": {
            "$ref": "#/definitions/Resolve",
            "description": "Scale, axis, and legend resolutions for horizontally concatenated charts."
          },
          "title": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "$ref": "#/definitions/TitleParams"
              }
            ],
            "description": "Title for the plot."
          },
          "transform": {
            "description": "An array of data transformations such as filter and new field calculation.",
            "items": {
              "$ref": "#/definitions/Transform"
            },
            "type": "array"
          }
        },
        "required": [
          "hconcat"
        ],
        "type": "object"
      },
      "LayerSpec": {
        "additionalProperties": false,
        "properties": {
          "data": {
            "$ref": "#/definitions/Data",
            "description": "An object describing the data source"
          },
          "description": {
            "description": "Description of this mark for commenting purpose.",
            "type": "string"
          },
          "height": {
            "description": "The height of a visualization.\n\n__Default value:__\n- If a view's [`autosize`](size.html#autosize) type is `\"fit\"` or its y-channel has a [continuous scale](scale.html#continuous), the height will be the value of [`config.view.height`](spec.html#config).\n- For y-axis with a band or point scale: if [`rangeStep`](scale.html#band) is a numeric value or unspecified, the height is [determined by the range step, paddings, and the cardinality of the field mapped to y-channel](scale.html#band). Otherwise, if the `rangeStep` is `null`, the height will be the value of [`config.view.height`](spec.html#config).\n- If no field is mapped to `y` channel, the `height` will be the value of `rangeStep`.\n\n__Note__: For plots with [`row` and `column` channels](encoding.html#facet), this represents the height of a single view.\n\n__See also:__ The documentation for [width and height](size.html) contains more examples.",
            "type": "number"
          },
          "layer": {
            "description": "Layer or single view specifications to be layered.\n\n__Note__: Specifications inside `layer` cannot use `row` and `column` channels as layering facet specifications is not allowed.",
            "items": {
              "anyOf": [
                {
                  "$ref": "#/definitions/LayerSpec"
                },
                {
                  "$ref": "#/definitions/CompositeUnitSpec"
                }
              ]
            },
            "type": "array"
          },
          "name": {
            "description": "Name of the visualization for later reference.",
            "type": "string"
          },
          "resolve": {
            "$ref": "#/definitions/Resolve",
            "description": "Scale, axis, and legend resolutions for layers."
          },
          "title": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "$ref": "#/definitions/TitleParams"
              }
            ],
            "description": "Title for the plot."
          },
          "transform": {
            "description": "An array of data transformations such as filter and new field calculation.",
            "items": {
              "$ref": "#/definitions/Transform"
            },
            "type": "array"
          },
          "width": {
            "description": "The width of a visualization.\n\n__Default value:__ This will be determined by the following rules:\n\n- If a view's [`autosize`](size.html#autosize) type is `\"fit\"` or its x-channel has a [continuous scale](scale.html#continuous), the width will be the value of [`config.view.width`](spec.html#config).\n- For x-axis with a band or point scale: if [`rangeStep`](scale.html#band) is a numeric value or unspecified, the width is [determined by the range step, paddings, and the cardinality of the field mapped to x-channel](scale.html#band).   Otherwise, if the `rangeStep` is `null`, the width will be the value of [`config.view.width`](spec.html#config).\n- If no field is mapped to `x` channel, the `width` will be the value of [`config.scale.textXRangeStep`](size.html#default-width-and-height) for `text` mark and the value of `rangeStep` for other marks.\n\n__Note:__ For plots with [`row` and `column` channels](encoding.html#facet), this represents the width of a single view.\n\n__See also:__ The documentation for [width and height](size.html) contains more examples.",
            "type": "number"
          }
        },
        "required": [
          "layer"
        ],
        "type": "object"
      },
      "RepeatSpec": {
        "additionalProperties": false,
        "properties": {
          "data": {
            "$ref": "#/definitions/Data",
            "description": "An object describing the data source"
          },
          "description": {
            "description": "Description of this mark for commenting purpose.",
            "type": "string"
          },
          "name": {
            "description": "Name of the visualization for later reference.",
            "type": "string"
          },
          "repeat": {
            "$ref": "#/definitions/Repeat",
            "description": "An object that describes what fields should be repeated into views that are laid out as a `row` or `column`."
          },
          "resolve": {
            "$ref": "#/definitions/Resolve",
            "description": "Scale and legend resolutions for repeated charts."
          },
          "spec": {
            "$ref": "#/definitions/Spec"
          },
          "title": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "$ref": "#/definitions/TitleParams"
              }
            ],
            "description": "Title for the plot."
          },
          "transform": {
            "description": "An array of data transformations such as filter and new field calculation.",
            "items": {
              "$ref": "#/definitions/Transform"
            },
            "type": "array"
          }
        },
        "required": [
          "repeat",
          "spec"
        ],
        "type": "object"
      },
      "Spec": {
        "anyOf": [
          {
            "$ref": "#/definitions/CompositeUnitSpec"
          },
          {
            "$ref": "#/definitions/LayerSpec"
          },
          {
            "$ref": "#/definitions/FacetSpec"
          },
          {
            "$ref": "#/definitions/RepeatSpec"
          },
          {
            "$ref": "#/definitions/VConcatSpec"
          },
          {
            "$ref": "#/definitions/HConcatSpec"
          }
        ]
      },
      "CompositeUnitSpecAlias": {
        "additionalProperties": false,
        "properties": {
          "data": {
            "$ref": "#/definitions/Data",
            "description": "An object describing the data source"
          },
          "description": {
            "description": "Description of this mark for commenting purpose.",
            "type": "string"
          },
          "encoding": {
            "$ref": "#/definitions/Encoding",
            "description": "A key-value mapping between encoding channels and definition of fields."
          },
          "height": {
            "description": "The height of a visualization.\n\n__Default value:__\n- If a view's [`autosize`](size.html#autosize) type is `\"fit\"` or its y-channel has a [continuous scale](scale.html#continuous), the height will be the value of [`config.view.height`](spec.html#config).\n- For y-axis with a band or point scale: if [`rangeStep`](scale.html#band) is a numeric value or unspecified, the height is [determined by the range step, paddings, and the cardinality of the field mapped to y-channel](scale.html#band). Otherwise, if the `rangeStep` is `null`, the height will be the value of [`config.view.height`](spec.html#config).\n- If no field is mapped to `y` channel, the `height` will be the value of `rangeStep`.\n\n__Note__: For plots with [`row` and `column` channels](encoding.html#facet), this represents the height of a single view.\n\n__See also:__ The documentation for [width and height](size.html) contains more examples.",
            "type": "number"
          },
          "mark": {
            "$ref": "#/definitions/AnyMark",
            "description": "A string describing the mark type (one of `\"bar\"`, `\"circle\"`, `\"square\"`, `\"tick\"`, `\"line\"`,\n`\"area\"`, `\"point\"`, `\"rule\"`, and `\"text\"`) or a [mark definition object](mark.html#mark-def)."
          },
          "name": {
            "description": "Name of the visualization for later reference.",
            "type": "string"
          },
          "selection": {
            "additionalProperties": {
              "$ref": "#/definitions/SelectionDef"
            },
            "description": "A key-value mapping between selection names and definitions.",
            "type": "object"
          },
          "title": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "$ref": "#/definitions/TitleParams"
              }
            ],
            "description": "Title for the plot."
          },
          "transform": {
            "description": "An array of data transformations such as filter and new field calculation.",
            "items": {
              "$ref": "#/definitions/Transform"
            },
            "type": "array"
          },
          "width": {
            "description": "The width of a visualization.\n\n__Default value:__ This will be determined by the following rules:\n\n- If a view's [`autosize`](size.html#autosize) type is `\"fit\"` or its x-channel has a [continuous scale](scale.html#continuous), the width will be the value of [`config.view.width`](spec.html#config).\n- For x-axis with a band or point scale: if [`rangeStep`](scale.html#band) is a numeric value or unspecified, the width is [determined by the range step, paddings, and the cardinality of the field mapped to x-channel](scale.html#band).   Otherwise, if the `rangeStep` is `null`, the width will be the value of [`config.view.width`](spec.html#config).\n- If no field is mapped to `x` channel, the `width` will be the value of [`config.scale.textXRangeStep`](size.html#default-width-and-height) for `text` mark and the value of `rangeStep` for other marks.\n\n__Note:__ For plots with [`row` and `column` channels](encoding.html#facet), this represents the width of a single view.\n\n__See also:__ The documentation for [width and height](size.html) contains more examples.",
            "type": "number"
          }
        },
        "required": [
          "mark",
          "encoding"
        ],
        "type": "object"
      },
      "FacetedCompositeUnitSpecAlias": {
        "additionalProperties": false,
        "properties": {
          "data": {
            "$ref": "#/definitions/Data",
            "description": "An object describing the data source"
          },
          "description": {
            "description": "Description of this mark for commenting purpose.",
            "type": "string"
          },
          "encoding": {
            "$ref": "#/definitions/EncodingWithFacet",
            "description": "A key-value mapping between encoding channels and definition of fields."
          },
          "height": {
            "description": "The height of a visualization.\n\n__Default value:__\n- If a view's [`autosize`](size.html#autosize) type is `\"fit\"` or its y-channel has a [continuous scale](scale.html#continuous), the height will be the value of [`config.view.height`](spec.html#config).\n- For y-axis with a band or point scale: if [`rangeStep`](scale.html#band) is a numeric value or unspecified, the height is [determined by the range step, paddings, and the cardinality of the field mapped to y-channel](scale.html#band). Otherwise, if the `rangeStep` is `null`, the height will be the value of [`config.view.height`](spec.html#config).\n- If no field is mapped to `y` channel, the `height` will be the value of `rangeStep`.\n\n__Note__: For plots with [`row` and `column` channels](encoding.html#facet), this represents the height of a single view.\n\n__See also:__ The documentation for [width and height](size.html) contains more examples.",
            "type": "number"
          },
          "mark": {
            "$ref": "#/definitions/AnyMark",
            "description": "A string describing the mark type (one of `\"bar\"`, `\"circle\"`, `\"square\"`, `\"tick\"`, `\"line\"`,\n`\"area\"`, `\"point\"`, `\"rule\"`, and `\"text\"`) or a [mark definition object](mark.html#mark-def)."
          },
          "name": {
            "description": "Name of the visualization for later reference.",
            "type": "string"
          },
          "selection": {
            "additionalProperties": {
              "$ref": "#/definitions/SelectionDef"
            },
            "description": "A key-value mapping between selection names and definitions.",
            "type": "object"
          },
          "title": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "$ref": "#/definitions/TitleParams"
              }
            ],
            "description": "Title for the plot."
          },
          "transform": {
            "description": "An array of data transformations such as filter and new field calculation.",
            "items": {
              "$ref": "#/definitions/Transform"
            },
            "type": "array"
          },
          "width": {
            "description": "The width of a visualization.\n\n__Default value:__ This will be determined by the following rules:\n\n- If a view's [`autosize`](size.html#autosize) type is `\"fit\"` or its x-channel has a [continuous scale](scale.html#continuous), the width will be the value of [`config.view.width`](spec.html#config).\n- For x-axis with a band or point scale: if [`rangeStep`](scale.html#band) is a numeric value or unspecified, the width is [determined by the range step, paddings, and the cardinality of the field mapped to x-channel](scale.html#band).   Otherwise, if the `rangeStep` is `null`, the width will be the value of [`config.view.width`](spec.html#config).\n- If no field is mapped to `x` channel, the `width` will be the value of [`config.scale.textXRangeStep`](size.html#default-width-and-height) for `text` mark and the value of `rangeStep` for other marks.\n\n__Note:__ For plots with [`row` and `column` channels](encoding.html#facet), this represents the width of a single view.\n\n__See also:__ The documentation for [width and height](size.html) contains more examples.",
            "type": "number"
          }
        },
        "required": [
          "mark",
          "encoding"
        ],
        "type": "object"
      },
      "VConcatSpec": {
        "additionalProperties": false,
        "properties": {
          "data": {
            "$ref": "#/definitions/Data",
            "description": "An object describing the data source"
          },
          "description": {
            "description": "Description of this mark for commenting purpose.",
            "type": "string"
          },
          "name": {
            "description": "Name of the visualization for later reference.",
            "type": "string"
          },
          "resolve": {
            "$ref": "#/definitions/Resolve",
            "description": "Scale, axis, and legend resolutions for vertically concatenated charts."
          },
          "title": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "$ref": "#/definitions/TitleParams"
              }
            ],
            "description": "Title for the plot."
          },
          "transform": {
            "description": "An array of data transformations such as filter and new field calculation.",
            "items": {
              "$ref": "#/definitions/Transform"
            },
            "type": "array"
          },
          "vconcat": {
            "description": "A list of views that should be concatenated and put into a column.",
            "items": {
              "$ref": "#/definitions/Spec"
            },
            "type": "array"
          }
        },
        "required": [
          "vconcat"
        ],
        "type": "object"
      },
      "Guide": {
        "additionalProperties": false,
        "properties": {
          "format": {
            "description": "The formatting pattern for labels. This is D3's [number format pattern](https://github.com/d3/d3-format#locale_format) for quantitative fields and D3's [time format pattern](https://github.com/d3/d3-time-format#locale_format) for time field.\n\nSee the [format documentation](format.html) for more information.\n\n__Default value:__  derived from [numberFormat](config.html#format) config for quantitative fields and from [timeFormat](config.html#format) config for temporal fields.",
            "type": "string"
          },
          "title": {
            "description": "A title for the field. If `null`, the title will be removed.\n\n__Default value:__  derived from the field's name and transformation function (`aggregate`, `bin` and `timeUnit`).  If the field has an aggregate function, the function is displayed as a part of the title (e.g., `\"Sum of Profit\"`). If the field is binned or has a time unit applied, the applied function will be denoted in parentheses (e.g., `\"Profit (binned)\"`, `\"Transaction Date (year-month)\"`).  Otherwise, the title is simply the field name.\n\n__Note__: You can customize the default field title format by providing the [`fieldTitle` property in the [config](config.html) or [`fieldTitle` function via the `compile` function's options](compile.html#field-title).",
            "type": [
              "string",
              "null"
            ]
          }
        },
        "type": "object"
      },
      "Header": {
        "additionalProperties": false,
        "description": "Headers of row / column channels for faceted plots.",
        "properties": {
          "format": {
            "description": "The formatting pattern for labels. This is D3's [number format pattern](https://github.com/d3/d3-format#locale_format) for quantitative fields and D3's [time format pattern](https://github.com/d3/d3-time-format#locale_format) for time field.\n\n__Default value:__  derived from [numberFormat](config.html#format) config for quantitative fields and from [timeFormat](config.html#format) config for temporal fields.",
            "type": "string"
          },
          "title": {
            "description": "A title for the axis. Shows field name and its function by default.\n\n__Default value:__  derived from the field's name and transformation function applied e.g, \"field_name\", \"SUM(field_name)\", \"BIN(field_name)\", \"YEAR(field_name)\".",
            "type": "string"
          }
        },
        "type": "object"
      },
      "HorizontalAlign": {
        "enum": [
          "left",
          "right",
          "center"
        ],
        "type": "string"
      },
      "InlineData": {
        "additionalProperties": false,
        "properties": {
          "format": {
            "$ref": "#/definitions/DataFormat",
            "description": "An object that specifies the format for parsing the data values."
          },
          "values": {
            "anyOf": [
              {
                "items": {
                  "type": "number"
                },
                "type": "array"
              },
              {
                "items": {
                  "type": "string"
                },
                "type": "array"
              },
              {
                "items": {
                  "type": "boolean"
                },
                "type": "array"
              },
              {
                "items": {
                  "type": "object"
                },
                "type": "array"
              },
              {
                "type": "string"
              },
              {
                "type": "object"
              }
            ],
            "description": "The full data set, included inline. This can be an array of objects or primitive values or a string.\nArrays of primitive values are ingested as objects with a `data` property. Strings are parsed according to the specified format type."
          }
        },
        "required": [
          "values"
        ],
        "type": "object"
      },
      "Interpolate": {
        "enum": [
          "linear",
          "linear-closed",
          "step",
          "step-before",
          "step-after",
          "basis",
          "basis-open",
          "basis-closed",
          "cardinal",
          "cardinal-open",
          "cardinal-closed",
          "bundle",
          "monotone"
        ],
        "type": "string"
      },
      "InterpolateParams": {
        "additionalProperties": false,
        "properties": {
          "gamma": {
            "type": "number"
          },
          "type": {
            "enum": [
              "rgb",
              "cubehelix",
              "cubehelix-long"
            ],
            "type": "string"
          }
        },
        "required": [
          "type"
        ],
        "type": "object"
      },
      "IntervalSelection": {
        "additionalProperties": false,
        "properties": {
          "bind": {
            "description": "Establishes a two-way binding between the interval selection and the scales\nused within the same view. This allows a user to interactively pan and\nzoom the view.",
            "enum": [
              "scales"
            ],
            "type": "string"
          },
          "empty": {
            "description": "By default, all data values are considered to lie within an empty selection.\nWhen set to `none`, empty selections contain no data values.",
            "enum": [
              "all",
              "none"
            ],
            "type": "string"
          },
          "encodings": {
            "description": "An array of encoding channels. The corresponding data field values\nmust match for a data tuple to fall within the selection.",
            "items": {
              "$ref": "#/definitions/SingleDefChannel"
            },
            "type": "array"
          },
          "fields": {
            "description": "An array of field names whose values must match for a data tuple to\nfall within the selection.",
            "items": {
              "type": "string"
            },
            "type": "array"
          },
          "mark": {
            "$ref": "#/definitions/BrushConfig",
            "description": "An interval selection also adds a rectangle mark to depict the\nextents of the interval. The `mark` property can be used to customize the\nappearance of the mark."
          },
          "on": {
            "$ref": "#/definitions/VgEventStream",
            "description": "A [Vega event stream](https://vega.github.io/vega/docs/event-streams/) (object or selector) that triggers the selection.\nFor interval selections, the event stream must specify a [start and end](https://vega.github.io/vega/docs/event-streams/#between-filters)."
          },
          "resolve": {
            "$ref": "#/definitions/SelectionResolution",
            "description": "With layered and multi-view displays, a strategy that determines how\nselections' data queries are resolved when applied in a filter transform,\nconditional encoding rule, or scale domain."
          },
          "translate": {
            "description": "When truthy, allows a user to interactively move an interval selection\nback-and-forth. Can be `true`, `false` (to disable panning), or a\n[Vega event stream definition](https://vega.github.io/vega/docs/event-streams/)\nwhich must include a start and end event to trigger continuous panning.\n\n__Default value:__ `true`, which corresponds to\n`[mousedown, window:mouseup] > window:mousemove!` which corresponds to\nclicks and dragging within an interval selection to reposition it.",
            "type": [
              "string",
              "boolean"
            ]
          },
          "type": {
            "enum": [
              "interval"
            ],
            "type": "string"
          },
          "zoom": {
            "description": "When truthy, allows a user to interactively resize an interval selection.\nCan be `true`, `false` (to disable zooming), or a [Vega event stream\ndefinition](https://vega.github.io/vega/docs/event-streams/). Currently,\nonly `wheel` events are supported.\n\n\n__Default value:__ `true`, which corresponds to `wheel!`.",
            "type": [
              "string",
              "boolean"
            ]
          }
        },
        "required": [
          "type"
        ],
        "type": "object"
      },
      "IntervalSelectionConfig": {
        "additionalProperties": false,
        "properties": {
          "bind": {
            "description": "Establishes a two-way binding between the interval selection and the scales\nused within the same view. This allows a user to interactively pan and\nzoom the view.",
            "enum": [
              "scales"
            ],
            "type": "string"
          },
          "empty": {
            "description": "By default, all data values are considered to lie within an empty selection.\nWhen set to `none`, empty selections contain no data values.",
            "enum": [
              "all",
              "none"
            ],
            "type": "string"
          },
          "encodings": {
            "description": "An array of encoding channels. The corresponding data field values\nmust match for a data tuple to fall within the selection.",
            "items": {
              "$ref": "#/definitions/SingleDefChannel"
            },
            "type": "array"
          },
          "fields": {
            "description": "An array of field names whose values must match for a data tuple to\nfall within the selection.",
            "items": {
              "type": "string"
            },
            "type": "array"
          },
          "mark": {
            "$ref": "#/definitions/BrushConfig",
            "description": "An interval selection also adds a rectangle mark to depict the\nextents of the interval. The `mark` property can be used to customize the\nappearance of the mark."
          },
          "on": {
            "$ref": "#/definitions/VgEventStream",
            "description": "A [Vega event stream](https://vega.github.io/vega/docs/event-streams/) (object or selector) that triggers the selection.\nFor interval selections, the event stream must specify a [start and end](https://vega.github.io/vega/docs/event-streams/#between-filters)."
          },
          "resolve": {
            "$ref": "#/definitions/SelectionResolution",
            "description": "With layered and multi-view displays, a strategy that determines how\nselections' data queries are resolved when applied in a filter transform,\nconditional encoding rule, or scale domain."
          },
          "translate": {
            "description": "When truthy, allows a user to interactively move an interval selection\nback-and-forth. Can be `true`, `false` (to disable panning), or a\n[Vega event stream definition](https://vega.github.io/vega/docs/event-streams/)\nwhich must include a start and end event to trigger continuous panning.\n\n__Default value:__ `true`, which corresponds to\n`[mousedown, window:mouseup] > window:mousemove!` which corresponds to\nclicks and dragging within an interval selection to reposition it.",
            "type": [
              "string",
              "boolean"
            ]
          },
          "zoom": {
            "description": "When truthy, allows a user to interactively resize an interval selection.\nCan be `true`, `false` (to disable zooming), or a [Vega event stream\ndefinition](https://vega.github.io/vega/docs/event-streams/). Currently,\nonly `wheel` events are supported.\n\n\n__Default value:__ `true`, which corresponds to `wheel!`.",
            "type": [
              "string",
              "boolean"
            ]
          }
        },
        "type": "object"
      },
      "JsonDataFormat": {
        "additionalProperties": false,
        "properties": {
          "parse": {
            "anyOf": [
              {
                "enum": [
                  "auto"
                ],
                "type": "string"
              },
              {
                "type": "object"
              }
            ],
            "description": "If set to auto (the default), perform automatic type inference to determine the desired data types.\nAlternatively, a parsing directive object can be provided for explicit data types. Each property of the object corresponds to a field name, and the value to the desired data type (one of `\"number\"`, `\"boolean\"` or `\"date\"`).\nFor example, `\"parse\": {\"modified_on\": \"date\"}` parses the `modified_on` field in each input record a Date value.\n\nFor `\"date\"`, we parse data based using Javascript's [`Date.parse()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse).\nFor Specific date formats can be provided (e.g., `{foo: 'date:\"%m%d%Y\"'}`), using the [d3-time-format syntax](https://github.com/d3/d3-time-format#locale_format). UTC date format parsing is supported similarly (e.g., `{foo: 'utc:\"%m%d%Y\"'}`). See more about [UTC time](timeunit.html#utc)"
          },
          "property": {
            "description": "The JSON property containing the desired data.\nThis parameter can be used when the loaded JSON file may have surrounding structure or meta-data.\nFor example `\"property\": \"values.features\"` is equivalent to retrieving `json.values.features`\nfrom the loaded JSON object.",
            "type": "string"
          },
          "type": {
            "description": "Type of input data: `\"json\"`, `\"csv\"`, `\"tsv\"`.\nThe default format type is determined by the extension of the file URL.\nIf no extension is detected, `\"json\"` will be used by default.",
            "enum": [
              "json"
            ],
            "type": "string"
          }
        },
        "type": "object"
      },
      "LayoutSizeMixins": {
        "additionalProperties": false,
        "properties": {
          "height": {
            "description": "The height of a visualization.\n\n__Default value:__\n- If a view's [`autosize`](size.html#autosize) type is `\"fit\"` or its y-channel has a [continuous scale](scale.html#continuous), the height will be the value of [`config.view.height`](spec.html#config).\n- For y-axis with a band or point scale: if [`rangeStep`](scale.html#band) is a numeric value or unspecified, the height is [determined by the range step, paddings, and the cardinality of the field mapped to y-channel](scale.html#band). Otherwise, if the `rangeStep` is `null`, the height will be the value of [`config.view.height`](spec.html#config).\n- If no field is mapped to `y` channel, the `height` will be the value of `rangeStep`.\n\n__Note__: For plots with [`row` and `column` channels](encoding.html#facet), this represents the height of a single view.\n\n__See also:__ The documentation for [width and height](size.html) contains more examples.",
            "type": "number"
          },
          "width": {
            "description": "The width of a visualization.\n\n__Default value:__ This will be determined by the following rules:\n\n- If a view's [`autosize`](size.html#autosize) type is `\"fit\"` or its x-channel has a [continuous scale](scale.html#continuous), the width will be the value of [`config.view.width`](spec.html#config).\n- For x-axis with a band or point scale: if [`rangeStep`](scale.html#band) is a numeric value or unspecified, the width is [determined by the range step, paddings, and the cardinality of the field mapped to x-channel](scale.html#band).   Otherwise, if the `rangeStep` is `null`, the width will be the value of [`config.view.width`](spec.html#config).\n- If no field is mapped to `x` channel, the `width` will be the value of [`config.scale.textXRangeStep`](size.html#default-width-and-height) for `text` mark and the value of `rangeStep` for other marks.\n\n__Note:__ For plots with [`row` and `column` channels](encoding.html#facet), this represents the width of a single view.\n\n__See also:__ The documentation for [width and height](size.html) contains more examples.",
            "type": "number"
          }
        },
        "type": "object"
      },
      "Legend": {
        "additionalProperties": false,
        "description": "Properties of a legend or boolean flag for determining whether to show it.",
        "properties": {
          "entryPadding": {
            "description": "Padding (in pixels) between legend entries in a symbol legend.",
            "type": "number"
          },
          "format": {
            "description": "The formatting pattern for labels. This is D3's [number format pattern](https://github.com/d3/d3-format#locale_format) for quantitative fields and D3's [time format pattern](https://github.com/d3/d3-time-format#locale_format) for time field.\n\nSee the [format documentation](format.html) for more information.\n\n__Default value:__  derived from [numberFormat](config.html#format) config for quantitative fields and from [timeFormat](config.html#format) config for temporal fields.",
            "type": "string"
          },
          "offset": {
            "description": "The offset, in pixels, by which to displace the legend from the edge of the enclosing group or data rectangle.\n\n__Default value:__  `0`",
            "type": "number"
          },
          "orient": {
            "$ref": "#/definitions/LegendOrient",
            "description": "The orientation of the legend, which determines how the legend is positioned within the scene. One of \"left\", \"right\", \"top-left\", \"top-right\", \"bottom-left\", \"bottom-right\", \"none\".\n\n__Default value:__ `\"right\"`"
          },
          "padding": {
            "description": "The padding, in pixels, between the legend and axis.",
            "type": "number"
          },
          "tickCount": {
            "description": "The desired number of tick values for quantitative legends.",
            "type": "number"
          },
          "title": {
            "description": "A title for the field. If `null`, the title will be removed.\n\n__Default value:__  derived from the field's name and transformation function (`aggregate`, `bin` and `timeUnit`).  If the field has an aggregate function, the function is displayed as a part of the title (e.g., `\"Sum of Profit\"`). If the field is binned or has a time unit applied, the applied function will be denoted in parentheses (e.g., `\"Profit (binned)\"`, `\"Transaction Date (year-month)\"`).  Otherwise, the title is simply the field name.\n\n__Note__: You can customize the default field title format by providing the [`fieldTitle` property in the [config](config.html) or [`fieldTitle` function via the `compile` function's options](compile.html#field-title).",
            "type": [
              "string",
              "null"
            ]
          },
          "type": {
            "description": "The type of the legend. Use `\"symbol\"` to create a discrete legend and `\"gradient\"` for a continuous color gradient.\n\n__Default value:__ `\"gradient\"` for non-binned quantitative fields and temporal fields; `\"symbol\"` otherwise.",
            "enum": [
              "symbol",
              "gradient"
            ],
            "type": "string"
          },
          "values": {
            "anyOf": [
              {
                "items": {
                  "type": "number"
                },
                "type": "array"
              },
              {
                "items": {
                  "type": "string"
                },
                "type": "array"
              },
              {
                "items": {
                  "$ref": "#/definitions/DateTime"
                },
                "type": "array"
              }
            ],
            "description": "Explicitly set the visible legend values."
          },
          "zindex": {
            "description": "A non-positive integer indicating z-index of the legend.\nIf zindex is 0, legend should be drawn behind all chart elements.\nTo put them in front, use zindex = 1.",
            "minimum": 0,
            "type": "number"
          }
        },
        "type": "object"
      },
      "LegendConfig": {
        "additionalProperties": false,
        "properties": {
          "cornerRadius": {
            "description": "Corner radius for the full legend.",
            "type": "number"
          },
          "entryPadding": {
            "description": "Padding (in pixels) between legend entries in a symbol legend.",
            "type": "number"
          },
          "fillColor": {
            "description": "Background fill color for the full legend.",
            "type": "string"
          },
          "gradientHeight": {
            "description": "The height of the gradient, in pixels.",
            "minimum": 0,
            "type": "number"
          },
          "gradientLabelBaseline": {
            "description": "Text baseline for color ramp gradient labels.",
            "type": "string"
          },
          "gradientLabelLimit": {
            "description": "The maximum allowed length in pixels of color ramp gradient labels.",
            "type": "number"
          },
          "gradientLabelOffset": {
            "description": "Vertical offset in pixels for color ramp gradient labels.",
            "type": "number"
          },
          "gradientStrokeColor": {
            "description": "The color of the gradient stroke, can be in hex color code or regular color name.",
            "type": "string"
          },
          "gradientStrokeWidth": {
            "description": "The width of the gradient stroke, in pixels.",
            "minimum": 0,
            "type": "number"
          },
          "gradientWidth": {
            "description": "The width of the gradient, in pixels.",
            "minimum": 0,
            "type": "number"
          },
          "labelAlign": {
            "description": "The alignment of the legend label, can be left, middle or right.",
            "type": "string"
          },
          "labelBaseline": {
            "description": "The position of the baseline of legend label, can be top, middle or bottom.",
            "type": "string"
          },
          "labelColor": {
            "description": "The color of the legend label, can be in hex color code or regular color name.",
            "type": "string"
          },
          "labelFont": {
            "description": "The font of the legend label.",
            "type": "string"
          },
          "labelFontSize": {
            "description": "The font size of legend label.\n\n__Default value:__ `10`.",
            "minimum": 0,
            "type": "number"
          },
          "labelLimit": {
            "description": "Maximum allowed pixel width of axis tick labels.",
            "type": "number"
          },
          "labelOffset": {
            "description": "The offset of the legend label.",
            "minimum": 0,
            "type": "number"
          },
          "offset": {
            "description": "The offset, in pixels, by which to displace the legend from the edge of the enclosing group or data rectangle.\n\n__Default value:__  `0`",
            "type": "number"
          },
          "orient": {
            "$ref": "#/definitions/LegendOrient",
            "description": "The orientation of the legend, which determines how the legend is positioned within the scene. One of \"left\", \"right\", \"top-left\", \"top-right\", \"bottom-left\", \"bottom-right\", \"none\".\n\n__Default value:__ `\"right\"`"
          },
          "padding": {
            "description": "The padding, in pixels, between the legend and axis.",
            "type": "number"
          },
          "shortTimeLabels": {
            "description": "Whether month names and weekday names should be abbreviated.\n\n__Default value:__  `false`",
            "type": "boolean"
          },
          "strokeColor": {
            "description": "Border stroke color for the full legend.",
            "type": "string"
          },
          "strokeDash": {
            "description": "Border stroke dash pattern for the full legend.",
            "items": {
              "type": "number"
            },
            "type": "array"
          },
          "strokeWidth": {
            "description": "Border stroke width for the full legend.",
            "type": "number"
          },
          "symbolColor": {
            "description": "The color of the legend symbol,",
            "type": "string"
          },
          "symbolSize": {
            "description": "The size of the legend symbol, in pixels.",
            "minimum": 0,
            "type": "number"
          },
          "symbolStrokeWidth": {
            "description": "The width of the symbol's stroke.",
            "minimum": 0,
            "type": "number"
          },
          "symbolType": {
            "description": "Default shape type (such as \"circle\") for legend symbols.",
            "type": "string"
          },
          "titleAlign": {
            "description": "Horizontal text alignment for legend titles.",
            "type": "string"
          },
          "titleBaseline": {
            "description": "Vertical text baseline for legend titles.",
            "type": "string"
          },
          "titleColor": {
            "description": "The color of the legend title, can be in hex color code or regular color name.",
            "type": "string"
          },
          "titleFont": {
            "description": "The font of the legend title.",
            "type": "string"
          },
          "titleFontSize": {
            "description": "The font size of the legend title.",
            "type": "number"
          },
          "titleFontWeight": {
            "description": "The font weight of the legend title.",
            "type": [
              "string",
              "number"
            ]
          },
          "titleLimit": {
            "description": "Maximum allowed pixel width of axis titles.",
            "type": "number"
          },
          "titlePadding": {
            "description": "The padding, in pixels, between title and legend.",
            "type": "number"
          }
        },
        "type": "object"
      },
      "LegendOrient": {
        "enum": [
          "left",
          "right",
          "top-left",
          "top-right",
          "bottom-left",
          "bottom-right",
          "none"
        ],
        "type": "string"
      },
      "LegendResolveMap": {
        "additionalProperties": false,
        "properties": {
          "color": {
            "$ref": "#/definitions/ResolveMode"
          },
          "opacity": {
            "$ref": "#/definitions/ResolveMode"
          },
          "shape": {
            "$ref": "#/definitions/ResolveMode"
          },
          "size": {
            "$ref": "#/definitions/ResolveMode"
          }
        },
        "type": "object"
      },
      "LocalMultiTimeUnit": {
        "enum": [
          "yearquarter",
          "yearquartermonth",
          "yearmonth",
          "yearmonthdate",
          "yearmonthdatehours",
          "yearmonthdatehoursminutes",
          "yearmonthdatehoursminutesseconds",
          "quartermonth",
          "monthdate",
          "hoursminutes",
          "hoursminutesseconds",
          "minutesseconds",
          "secondsmilliseconds"
        ],
        "type": "string"
      },
      "LocalSingleTimeUnit": {
        "enum": [
          "year",
          "quarter",
          "month",
          "day",
          "date",
          "hours",
          "minutes",
          "seconds",
          "milliseconds"
        ],
        "type": "string"
      },
      "AndFilter": {
        "additionalProperties": false,
        "properties": {
          "and": {
            "items": {
              "$ref": "#/definitions/FilterOperand"
            },
            "type": "array"
          }
        },
        "required": [
          "and"
        ],
        "type": "object"
      },
      "SelectionAnd": {
        "additionalProperties": false,
        "properties": {
          "and": {
            "items": {
              "$ref": "#/definitions/SelectionOperand"
            },
            "type": "array"
          }
        },
        "required": [
          "and"
        ],
        "type": "object"
      },
      "NotFilter": {
        "additionalProperties": false,
        "properties": {
          "not": {
            "$ref": "#/definitions/FilterOperand"
          }
        },
        "required": [
          "not"
        ],
        "type": "object"
      },
      "SelectionNot": {
        "additionalProperties": false,
        "properties": {
          "not": {
            "$ref": "#/definitions/SelectionOperand"
          }
        },
        "required": [
          "not"
        ],
        "type": "object"
      },
      "FilterOperand": {
        "anyOf": [
          {
            "$ref": "#/definitions/NotFilter"
          },
          {
            "$ref": "#/definitions/AndFilter"
          },
          {
            "$ref": "#/definitions/OrFilter"
          },
          {
            "$ref": "#/definitions/Filter"
          }
        ]
      },
      "SelectionOperand": {
        "anyOf": [
          {
            "$ref": "#/definitions/SelectionNot"
          },
          {
            "$ref": "#/definitions/SelectionAnd"
          },
          {
            "$ref": "#/definitions/SelectionOr"
          },
          {
            "type": "string"
          }
        ]
      },
      "OrFilter": {
        "additionalProperties": false,
        "properties": {
          "or": {
            "items": {
              "$ref": "#/definitions/FilterOperand"
            },
            "type": "array"
          }
        },
        "required": [
          "or"
        ],
        "type": "object"
      },
      "SelectionOr": {
        "additionalProperties": false,
        "properties": {
          "or": {
            "items": {
              "$ref": "#/definitions/SelectionOperand"
            },
            "type": "array"
          }
        },
        "required": [
          "or"
        ],
        "type": "object"
      },
      "LookupData": {
        "additionalProperties": false,
        "properties": {
          "data": {
            "$ref": "#/definitions/Data",
            "description": "Secondary data source to lookup in."
          },
          "fields": {
            "description": "Fields in foreign data to lookup.\nIf not specificied, the entire object is queried.",
            "items": {
              "type": "string"
            },
            "type": "array"
          },
          "key": {
            "description": "Key in data to lookup.",
            "type": "string"
          }
        },
        "required": [
          "data",
          "key"
        ],
        "type": "object"
      },
      "LookupTransform": {
        "additionalProperties": false,
        "properties": {
          "as": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "items": {
                  "type": "string"
                },
                "type": "array"
              }
            ],
            "description": "The field or fields for storing the computed formula value.\nIf `from.fields` is specified, the transform will use the same names for `as`.\nIf `from.fields` is not specified, `as` has to be a string and we put the whole object into the data under the specified name."
          },
          "default": {
            "description": "The default value to use if lookup fails.\n\n__Default value:__ `null`",
            "type": "string"
          },
          "from": {
            "$ref": "#/definitions/LookupData",
            "description": "Secondary data reference."
          },
          "lookup": {
            "description": "Key in primary data source.",
            "type": "string"
          }
        },
        "required": [
          "lookup",
          "from"
        ],
        "type": "object"
      },
      "Mark": {
        "description": "All types of primitive marks.",
        "enum": [
          "area",
          "bar",
          "line",
          "point",
          "text",
          "tick",
          "rect",
          "rule",
          "circle",
          "square"
        ],
        "type": "string"
      },
      "MarkConfig": {
        "additionalProperties": false,
        "properties": {
          "align": {
            "$ref": "#/definitions/HorizontalAlign",
            "description": "The horizontal alignment of the text. One of `\"left\"`, `\"right\"`, `\"center\"`."
          },
          "angle": {
            "description": "The rotation angle of the text, in degrees.",
            "maximum": 360,
            "minimum": 0,
            "type": "number"
          },
          "baseline": {
            "$ref": "#/definitions/VerticalAlign",
            "description": "The vertical alignment of the text. One of `\"top\"`, `\"middle\"`, `\"bottom\"`.\n\n__Default value:__ `\"middle\"`"
          },
          "color": {
            "description": "Default color.  Note that `fill` and `stroke` have higher precedence than `color` and will override `color`.\n\n__Default value:__ <span style=\"color: #4682b4;\">&#9632;</span> `\"#4682b4\"`\n\n__Note:__ This property cannot be used in a [style config](mark.html#style-config).",
            "type": "string"
          },
          "dx": {
            "description": "The horizontal offset, in pixels, between the text label and its anchor point. The offset is applied after rotation by the _angle_ property.",
            "type": "number"
          },
          "dy": {
            "description": "The vertical offset, in pixels, between the text label and its anchor point. The offset is applied after rotation by the _angle_ property.",
            "type": "number"
          },
          "fill": {
            "description": "Default Fill Color.  This has higher precedence than config.color\n\n__Default value:__ (None)",
            "type": "string"
          },
          "fillOpacity": {
            "description": "The fill opacity (value between [0,1]).\n\n__Default value:__ `1`",
            "maximum": 1,
            "minimum": 0,
            "type": "number"
          },
          "filled": {
            "description": "Whether the mark's color should be used as fill color instead of stroke color.\n\n__Default value:__ `true` for all marks except `point` and `false` for `point`.\n\n__Applicable for:__ `bar`, `point`, `circle`, `square`, and `area` marks.\n\n__Note:__ This property cannot be used in a [style config](mark.html#style-config).",
            "type": "boolean"
          },
          "font": {
            "description": "The typeface to set the text in (e.g., `\"Helvetica Neue\"`).",
            "type": "string"
          },
          "fontSize": {
            "description": "The font size, in pixels.",
            "minimum": 0,
            "type": "number"
          },
          "fontStyle": {
            "$ref": "#/definitions/FontStyle",
            "description": "The font style (e.g., `\"italic\"`)."
          },
          "fontWeight": {
            "anyOf": [
              {
                "$ref": "#/definitions/FontWeight"
              },
              {
                "$ref": "#/definitions/FontWeightNumber"
              }
            ],
            "description": "The font weight (e.g., `\"bold\"`)."
          },
          "interpolate": {
            "$ref": "#/definitions/Interpolate",
            "description": "The line interpolation method to use for line and area marks. One of the following:\n- `\"linear\"`: piecewise linear segments, as in a polyline.\n- `\"linear-closed\"`: close the linear segments to form a polygon.\n- `\"step\"`: alternate between horizontal and vertical segments, as in a step function.\n- `\"step-before\"`: alternate between vertical and horizontal segments, as in a step function.\n- `\"step-after\"`: alternate between horizontal and vertical segments, as in a step function.\n- `\"basis\"`: a B-spline, with control point duplication on the ends.\n- `\"basis-open\"`: an open B-spline; may not intersect the start or end.\n- `\"basis-closed\"`: a closed B-spline, as in a loop.\n- `\"cardinal\"`: a Cardinal spline, with control point duplication on the ends.\n- `\"cardinal-open\"`: an open Cardinal spline; may not intersect the start or end, but will intersect other control points.\n- `\"cardinal-closed\"`: a closed Cardinal spline, as in a loop.\n- `\"bundle\"`: equivalent to basis, except the tension parameter is used to straighten the spline.\n- `\"monotone\"`: cubic interpolation that preserves monotonicity in y."
          },
          "limit": {
            "description": "The maximum length of the text mark in pixels (default 0, indicating no limit). The text value will be automatically truncated if the rendered size exceeds the limit.",
            "type": "number"
          },
          "opacity": {
            "description": "The overall opacity (value between [0,1]).\n\n__Default value:__ `0.7` for non-aggregate plots with `point`, `tick`, `circle`, or `square` marks or layered `bar` charts and `1` otherwise.",
            "maximum": 1,
            "minimum": 0,
            "type": "number"
          },
          "orient": {
            "$ref": "#/definitions/Orient",
            "description": "The orientation of a non-stacked bar, tick, area, and line charts.\nThe value is either horizontal (default) or vertical.\n- For bar, rule and tick, this determines whether the size of the bar and tick\nshould be applied to x or y dimension.\n- For area, this property determines the orient property of the Vega output.\n- For line, this property determines the sort order of the points in the line\nif `config.sortLineBy` is not specified.\nFor stacked charts, this is always determined by the orientation of the stack;\ntherefore explicitly specified value will be ignored."
          },
          "radius": {
            "description": "Polar coordinate radial offset, in pixels, of the text label from the origin determined by the `x` and `y` properties.",
            "minimum": 0,
            "type": "number"
          },
          "shape": {
            "description": "The default symbol shape to use. One of: `\"circle\"` (default), `\"square\"`, `\"cross\"`, `\"diamond\"`, `\"triangle-up\"`, or `\"triangle-down\"`, or a custom SVG path.\n\n__Default value:__ `\"circle\"`",
            "type": "string"
          },
          "size": {
            "description": "The pixel area each the point/circle/square.\nFor example: in the case of circles, the radius is determined in part by the square root of the size value.\n\n__Default value:__ `30`",
            "minimum": 0,
            "type": "number"
          },
          "stroke": {
            "description": "Default Stroke Color.  This has higher precedence than config.color\n\n__Default value:__ (None)",
            "type": "string"
          },
          "strokeDash": {
            "description": "An array of alternating stroke, space lengths for creating dashed or dotted lines.",
            "items": {
              "type": "number"
            },
            "type": "array"
          },
          "strokeDashOffset": {
            "description": "The offset (in pixels) into which to begin drawing with the stroke dash array.",
            "type": "number"
          },
          "strokeOpacity": {
            "description": "The stroke opacity (value between [0,1]).\n\n__Default value:__ `1`",
            "maximum": 1,
            "minimum": 0,
            "type": "number"
          },
          "strokeWidth": {
            "description": "The stroke width, in pixels.",
            "minimum": 0,
            "type": "number"
          },
          "tension": {
            "description": "Depending on the interpolation type, sets the tension parameter (for line and area marks).",
            "maximum": 1,
            "minimum": 0,
            "type": "number"
          },
          "text": {
            "description": "Placeholder text if the `text` channel is not specified",
            "type": "string"
          },
          "theta": {
            "description": "Polar coordinate angle, in radians, of the text label from the origin determined by the `x` and `y` properties. Values for `theta` follow the same convention of `arc` mark `startAngle` and `endAngle` properties: angles are measured in radians, with `0` indicating \"north\".",
            "type": "number"
          }
        },
        "type": "object"
      },
      "MarkConfigMixins": {
        "additionalProperties": false,
        "properties": {
          "area": {
            "$ref": "#/definitions/MarkConfig",
            "description": "Area-Specific Config "
          },
          "bar": {
            "$ref": "#/definitions/BarConfig",
            "description": "Bar-Specific Config "
          },
          "circle": {
            "$ref": "#/definitions/MarkConfig",
            "description": "Circle-Specific Config "
          },
          "line": {
            "$ref": "#/definitions/MarkConfig",
            "description": "Line-Specific Config "
          },
          "mark": {
            "$ref": "#/definitions/MarkConfig",
            "description": "Mark Config "
          },
          "point": {
            "$ref": "#/definitions/MarkConfig",
            "description": "Point-Specific Config "
          },
          "rect": {
            "$ref": "#/definitions/MarkConfig",
            "description": "Rect-Specific Config "
          },
          "rule": {
            "$ref": "#/definitions/MarkConfig",
            "description": "Rule-Specific Config "
          },
          "square": {
            "$ref": "#/definitions/MarkConfig",
            "description": "Square-Specific Config "
          },
          "text": {
            "$ref": "#/definitions/TextConfig",
            "description": "Text-Specific Config "
          },
          "tick": {
            "$ref": "#/definitions/TickConfig",
            "description": "Tick-Specific Config "
          }
        },
        "type": "object"
      },
      "MarkDef": {
        "additionalProperties": false,
        "properties": {
          "align": {
            "$ref": "#/definitions/HorizontalAlign",
            "description": "The horizontal alignment of the text. One of `\"left\"`, `\"right\"`, `\"center\"`."
          },
          "angle": {
            "description": "The rotation angle of the text, in degrees.",
            "maximum": 360,
            "minimum": 0,
            "type": "number"
          },
          "baseline": {
            "$ref": "#/definitions/VerticalAlign",
            "description": "The vertical alignment of the text. One of `\"top\"`, `\"middle\"`, `\"bottom\"`.\n\n__Default value:__ `\"middle\"`"
          },
          "clip": {
            "description": "Whether a mark be clipped to the enclosing group’s width and height.",
            "type": "boolean"
          },
          "color": {
            "description": "Default color.  Note that `fill` and `stroke` have higher precedence than `color` and will override `color`.\n\n__Default value:__ <span style=\"color: #4682b4;\">&#9632;</span> `\"#4682b4\"`\n\n__Note:__ This property cannot be used in a [style config](mark.html#style-config).",
            "type": "string"
          },
          "dx": {
            "description": "The horizontal offset, in pixels, between the text label and its anchor point. The offset is applied after rotation by the _angle_ property.",
            "type": "number"
          },
          "dy": {
            "description": "The vertical offset, in pixels, between the text label and its anchor point. The offset is applied after rotation by the _angle_ property.",
            "type": "number"
          },
          "fill": {
            "description": "Default Fill Color.  This has higher precedence than config.color\n\n__Default value:__ (None)",
            "type": "string"
          },
          "fillOpacity": {
            "description": "The fill opacity (value between [0,1]).\n\n__Default value:__ `1`",
            "maximum": 1,
            "minimum": 0,
            "type": "number"
          },
          "filled": {
            "description": "Whether the mark's color should be used as fill color instead of stroke color.\n\n__Default value:__ `true` for all marks except `point` and `false` for `point`.\n\n__Applicable for:__ `bar`, `point`, `circle`, `square`, and `area` marks.\n\n__Note:__ This property cannot be used in a [style config](mark.html#style-config).",
            "type": "boolean"
          },
          "font": {
            "description": "The typeface to set the text in (e.g., `\"Helvetica Neue\"`).",
            "type": "string"
          },
          "fontSize": {
            "description": "The font size, in pixels.",
            "minimum": 0,
            "type": "number"
          },
          "fontStyle": {
            "$ref": "#/definitions/FontStyle",
            "description": "The font style (e.g., `\"italic\"`)."
          },
          "fontWeight": {
            "anyOf": [
              {
                "$ref": "#/definitions/FontWeight"
              },
              {
                "$ref": "#/definitions/FontWeightNumber"
              }
            ],
            "description": "The font weight (e.g., `\"bold\"`)."
          },
          "interpolate": {
            "$ref": "#/definitions/Interpolate",
            "description": "The line interpolation method to use for line and area marks. One of the following:\n- `\"linear\"`: piecewise linear segments, as in a polyline.\n- `\"linear-closed\"`: close the linear segments to form a polygon.\n- `\"step\"`: alternate between horizontal and vertical segments, as in a step function.\n- `\"step-before\"`: alternate between vertical and horizontal segments, as in a step function.\n- `\"step-after\"`: alternate between horizontal and vertical segments, as in a step function.\n- `\"basis\"`: a B-spline, with control point duplication on the ends.\n- `\"basis-open\"`: an open B-spline; may not intersect the start or end.\n- `\"basis-closed\"`: a closed B-spline, as in a loop.\n- `\"cardinal\"`: a Cardinal spline, with control point duplication on the ends.\n- `\"cardinal-open\"`: an open Cardinal spline; may not intersect the start or end, but will intersect other control points.\n- `\"cardinal-closed\"`: a closed Cardinal spline, as in a loop.\n- `\"bundle\"`: equivalent to basis, except the tension parameter is used to straighten the spline.\n- `\"monotone\"`: cubic interpolation that preserves monotonicity in y."
          },
          "limit": {
            "description": "The maximum length of the text mark in pixels (default 0, indicating no limit). The text value will be automatically truncated if the rendered size exceeds the limit.",
            "type": "number"
          },
          "opacity": {
            "description": "The overall opacity (value between [0,1]).\n\n__Default value:__ `0.7` for non-aggregate plots with `point`, `tick`, `circle`, or `square` marks or layered `bar` charts and `1` otherwise.",
            "maximum": 1,
            "minimum": 0,
            "type": "number"
          },
          "orient": {
            "$ref": "#/definitions/Orient",
            "description": "The orientation of a non-stacked bar, tick, area, and line charts.\nThe value is either horizontal (default) or vertical.\n- For bar, rule and tick, this determines whether the size of the bar and tick\nshould be applied to x or y dimension.\n- For area, this property determines the orient property of the Vega output.\n- For line, this property determines the sort order of the points in the line\nif `config.sortLineBy` is not specified.\nFor stacked charts, this is always determined by the orientation of the stack;\ntherefore explicitly specified value will be ignored."
          },
          "radius": {
            "description": "Polar coordinate radial offset, in pixels, of the text label from the origin determined by the `x` and `y` properties.",
            "minimum": 0,
            "type": "number"
          },
          "shape": {
            "description": "The default symbol shape to use. One of: `\"circle\"` (default), `\"square\"`, `\"cross\"`, `\"diamond\"`, `\"triangle-up\"`, or `\"triangle-down\"`, or a custom SVG path.\n\n__Default value:__ `\"circle\"`",
            "type": "string"
          },
          "size": {
            "description": "The pixel area each the point/circle/square.\nFor example: in the case of circles, the radius is determined in part by the square root of the size value.\n\n__Default value:__ `30`",
            "minimum": 0,
            "type": "number"
          },
          "stroke": {
            "description": "Default Stroke Color.  This has higher precedence than config.color\n\n__Default value:__ (None)",
            "type": "string"
          },
          "strokeDash": {
            "description": "An array of alternating stroke, space lengths for creating dashed or dotted lines.",
            "items": {
              "type": "number"
            },
            "type": "array"
          },
          "strokeDashOffset": {
            "description": "The offset (in pixels) into which to begin drawing with the stroke dash array.",
            "type": "number"
          },
          "strokeOpacity": {
            "description": "The stroke opacity (value between [0,1]).\n\n__Default value:__ `1`",
            "maximum": 1,
            "minimum": 0,
            "type": "number"
          },
          "strokeWidth": {
            "description": "The stroke width, in pixels.",
            "minimum": 0,
            "type": "number"
          },
          "style": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "items": {
                  "type": "string"
                },
                "type": "array"
              }
            ],
            "description": "A string or array of strings indicating the name of custom styles to apply to the mark. A style is a named collection of mark property defaults defined within the [style configuration](mark.html#style-config). If style is an array, later styles will override earlier styles. Any [mark properties](encoding.html#mark-prop) explicitly defined within the `encoding` will override a style default.\n\n__Default value:__ The mark's name.  For example, a bar mark will have style `\"bar\"` by default.\n__Note:__ Any specified style will augment the default style. For example, a bar mark with `\"style\": \"foo\"` will receive from `config.style.bar` and `config.style.foo` (the specified style `\"foo\"` has higher precedence)."
          },
          "tension": {
            "description": "Depending on the interpolation type, sets the tension parameter (for line and area marks).",
            "maximum": 1,
            "minimum": 0,
            "type": "number"
          },
          "text": {
            "description": "Placeholder text if the `text` channel is not specified",
            "type": "string"
          },
          "theta": {
            "description": "Polar coordinate angle, in radians, of the text label from the origin determined by the `x` and `y` properties. Values for `theta` follow the same convention of `arc` mark `startAngle` and `endAngle` properties: angles are measured in radians, with `0` indicating \"north\".",
            "type": "number"
          },
          "type": {
            "$ref": "#/definitions/Mark",
            "description": "The mark type.\nOne of `\"bar\"`, `\"circle\"`, `\"square\"`, `\"tick\"`, `\"line\"`,\n`\"area\"`, `\"point\"`, `\"rule\"`, and `\"text\"`."
          }
        },
        "required": [
          "type"
        ],
        "type": "object"
      },
      "MarkPropFieldDef": {
        "additionalProperties": false,
        "description": "Field definition of a mark property, which can contain a legend.",
        "properties": {
          "aggregate": {
            "$ref": "#/definitions/Aggregate",
            "description": "Aggregation function for the field\n(e.g., `mean`, `sum`, `median`, `min`, `max`, `count`).\n\n__Default value:__ `undefined` (None)"
          },
          "bin": {
            "anyOf": [
              {
                "type": "boolean"
              },
              {
                "$ref": "#/definitions/BinParams"
              }
            ],
            "description": "A flag for binning a `quantitative` field, or [an object defining binning parameters](bin.html#params).\nIf `true`, default [binning parameters](bin.html) will be applied.\n\n__Default value:__ `false`"
          },
          "field": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "$ref": "#/definitions/RepeatRef"
              }
            ],
            "description": "__Required.__ A string defining the name of the field from which to pull a data value\nor an object defining iterated values from the [`repeat`](repeat.html) operator.\n\n__Note:__ `field` is not required if `aggregate` is `count`."
          },
          "legend": {
            "anyOf": [
              {
                "$ref": "#/definitions/Legend"
              },
              {
                "type": "null"
              }
            ],
            "description": "An object defining properties of the legend.\nIf `null`, the legend for the encoding channel will be removed.\n\n__Default value:__ If undefined, default [legend properties](legend.html) are applied."
          },
          "scale": {
            "$ref": "#/definitions/Scale",
            "description": "An object defining properties of the channel's scale, which is the function that transforms values in the data domain (numbers, dates, strings, etc) to visual values (pixels, colors, sizes) of the encoding channels.\n\n__Default value:__ If undefined, default [scale properties](scale.html) are applied."
          },
          "sort": {
            "anyOf": [
              {
                "$ref": "#/definitions/SortOrder"
              },
              {
                "$ref": "#/definitions/SortField"
              },
              {
                "type": "null"
              }
            ],
            "description": "Sort order for the encoded field.\nSupported `sort` values include `\"ascending\"`, `\"descending\"` and `null` (no sorting).\nFor fields with discrete domains, `sort` can also be a [sort field definition object](sort.html#sort-field).\n\n__Default value:__ `\"ascending\"`"
          },
          "timeUnit": {
            "$ref": "#/definitions/TimeUnit",
            "description": "Time unit (e.g., `year`, `yearmonth`, `month`, `hours`) for a temporal field.\nor [a temporal field that gets casted as ordinal](type.html#cast).\n\n__Default value:__ `undefined` (None)"
          },
          "type": {
            "$ref": "#/definitions/Type",
            "description": "The encoded field's type of measurement (`\"quantitative\"`, `\"temporal\"`, `\"ordinal\"`, or `\"nominal\"`)."
          }
        },
        "required": [
          "type"
        ],
        "type": "object"
      },
      "Month": {
        "maximum": 12,
        "minimum": 1,
        "type": "number"
      },
      "MultiSelection": {
        "additionalProperties": false,
        "properties": {
          "empty": {
            "description": "By default, all data values are considered to lie within an empty selection.\nWhen set to `none`, empty selections contain no data values.",
            "enum": [
              "all",
              "none"
            ],
            "type": "string"
          },
          "encodings": {
            "description": "An array of encoding channels. The corresponding data field values\nmust match for a data tuple to fall within the selection.",
            "items": {
              "$ref": "#/definitions/SingleDefChannel"
            },
            "type": "array"
          },
          "fields": {
            "description": "An array of field names whose values must match for a data tuple to\nfall within the selection.",
            "items": {
              "type": "string"
            },
            "type": "array"
          },
          "nearest": {
            "description": "When true, an invisible voronoi diagram is computed to accelerate discrete\nselection. The data value _nearest_ the mouse cursor is added to the selection.\n\nSee the [nearest transform](nearest.html) documentation for more information.",
            "type": "boolean"
          },
          "on": {
            "$ref": "#/definitions/VgEventStream",
            "description": "A [Vega event stream](https://vega.github.io/vega/docs/event-streams/) (object or selector) that triggers the selection.\nFor interval selections, the event stream must specify a [start and end](https://vega.github.io/vega/docs/event-streams/#between-filters)."
          },
          "resolve": {
            "$ref": "#/definitions/SelectionResolution",
            "description": "With layered and multi-view displays, a strategy that determines how\nselections' data queries are resolved when applied in a filter transform,\nconditional encoding rule, or scale domain."
          },
          "toggle": {
            "description": "Controls whether data values should be toggled or only ever inserted into\nmulti selections. Can be `true`, `false` (for insertion only), or a\n[Vega expression](https://vega.github.io/vega/docs/expressions/).\n\n__Default value:__ `true`, which corresponds to `event.shiftKey` (i.e.,\ndata values are toggled when a user interacts with the shift-key pressed).\n\nSee the [toggle transform](toggle.html) documentation for more information.",
            "type": [
              "string",
              "boolean"
            ]
          },
          "type": {
            "enum": [
              "multi"
            ],
            "type": "string"
          }
        },
        "required": [
          "type"
        ],
        "type": "object"
      },
      "MultiSelectionConfig": {
        "additionalProperties": false,
        "properties": {
          "empty": {
            "description": "By default, all data values are considered to lie within an empty selection.\nWhen set to `none`, empty selections contain no data values.",
            "enum": [
              "all",
              "none"
            ],
            "type": "string"
          },
          "encodings": {
            "description": "An array of encoding channels. The corresponding data field values\nmust match for a data tuple to fall within the selection.",
            "items": {
              "$ref": "#/definitions/SingleDefChannel"
            },
            "type": "array"
          },
          "fields": {
            "description": "An array of field names whose values must match for a data tuple to\nfall within the selection.",
            "items": {
              "type": "string"
            },
            "type": "array"
          },
          "nearest": {
            "description": "When true, an invisible voronoi diagram is computed to accelerate discrete\nselection. The data value _nearest_ the mouse cursor is added to the selection.\n\nSee the [nearest transform](nearest.html) documentation for more information.",
            "type": "boolean"
          },
          "on": {
            "$ref": "#/definitions/VgEventStream",
            "description": "A [Vega event stream](https://vega.github.io/vega/docs/event-streams/) (object or selector) that triggers the selection.\nFor interval selections, the event stream must specify a [start and end](https://vega.github.io/vega/docs/event-streams/#between-filters)."
          },
          "resolve": {
            "$ref": "#/definitions/SelectionResolution",
            "description": "With layered and multi-view displays, a strategy that determines how\nselections' data queries are resolved when applied in a filter transform,\nconditional encoding rule, or scale domain."
          },
          "toggle": {
            "description": "Controls whether data values should be toggled or only ever inserted into\nmulti selections. Can be `true`, `false` (for insertion only), or a\n[Vega expression](https://vega.github.io/vega/docs/expressions/).\n\n__Default value:__ `true`, which corresponds to `event.shiftKey` (i.e.,\ndata values are toggled when a user interacts with the shift-key pressed).\n\nSee the [toggle transform](toggle.html) documentation for more information.",
            "type": [
              "string",
              "boolean"
            ]
          }
        },
        "type": "object"
      },
      "MultiTimeUnit": {
        "anyOf": [
          {
            "$ref": "#/definitions/LocalMultiTimeUnit"
          },
          {
            "$ref": "#/definitions/UtcMultiTimeUnit"
          }
        ]
      },
      "NamedData": {
        "additionalProperties": false,
        "properties": {
          "format": {
            "$ref": "#/definitions/DataFormat",
            "description": "An object that specifies the format for parsing the data."
          },
          "name": {
            "description": "Provide a placeholder name and bind data at runtime.",
            "type": "string"
          }
        },
        "required": [
          "name"
        ],
        "type": "object"
      },
      "NiceTime": {
        "enum": [
          "second",
          "minute",
          "hour",
          "day",
          "week",
          "month",
          "year"
        ],
        "type": "string"
      },
      "OneOfFilter": {
        "additionalProperties": false,
        "properties": {
          "field": {
            "description": "Field to be filtered",
            "type": "string"
          },
          "oneOf": {
            "anyOf": [
              {
                "items": {
                  "type": "string"
                },
                "type": "array"
              },
              {
                "items": {
                  "type": "number"
                },
                "type": "array"
              },
              {
                "items": {
                  "type": "boolean"
                },
                "type": "array"
              },
              {
                "items": {
                  "$ref": "#/definitions/DateTime"
                },
                "type": "array"
              }
            ],
            "description": "A set of values that the `field`'s value should be a member of,\nfor a data item included in the filtered data."
          },
          "timeUnit": {
            "$ref": "#/definitions/TimeUnit",
            "description": "time unit for the field to be filtered."
          }
        },
        "required": [
          "field",
          "oneOf"
        ],
        "type": "object"
      },
      "OrderFieldDef": {
        "additionalProperties": false,
        "properties": {
          "aggregate": {
            "$ref": "#/definitions/Aggregate",
            "description": "Aggregation function for the field\n(e.g., `mean`, `sum`, `median`, `min`, `max`, `count`).\n\n__Default value:__ `undefined` (None)"
          },
          "bin": {
            "anyOf": [
              {
                "type": "boolean"
              },
              {
                "$ref": "#/definitions/BinParams"
              }
            ],
            "description": "A flag for binning a `quantitative` field, or [an object defining binning parameters](bin.html#params).\nIf `true`, default [binning parameters](bin.html) will be applied.\n\n__Default value:__ `false`"
          },
          "field": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "$ref": "#/definitions/RepeatRef"
              }
            ],
            "description": "__Required.__ A string defining the name of the field from which to pull a data value\nor an object defining iterated values from the [`repeat`](repeat.html) operator.\n\n__Note:__ `field` is not required if `aggregate` is `count`."
          },
          "sort": {
            "$ref": "#/definitions/SortOrder",
            "description": "The sort order. One of `\"ascending\"` (default) or `\"descending\"`."
          },
          "timeUnit": {
            "$ref": "#/definitions/TimeUnit",
            "description": "Time unit (e.g., `year`, `yearmonth`, `month`, `hours`) for a temporal field.\nor [a temporal field that gets casted as ordinal](type.html#cast).\n\n__Default value:__ `undefined` (None)"
          },
          "type": {
            "$ref": "#/definitions/Type",
            "description": "The encoded field's type of measurement (`\"quantitative\"`, `\"temporal\"`, `\"ordinal\"`, or `\"nominal\"`)."
          }
        },
        "required": [
          "type"
        ],
        "type": "object"
      },
      "Orient": {
        "enum": [
          "horizontal",
          "vertical"
        ],
        "type": "string"
      },
      "Padding": {
        "anyOf": [
          {
            "type": "number"
          },
          {
            "additionalProperties": false,
            "properties": {
              "bottom": {
                "type": "number"
              },
              "left": {
                "type": "number"
              },
              "right": {
                "type": "number"
              },
              "top": {
                "type": "number"
              }
            },
            "type": "object"
          }
        ],
        "minimum": 0
      },
      "PositionFieldDef": {
        "additionalProperties": false,
        "properties": {
          "aggregate": {
            "$ref": "#/definitions/Aggregate",
            "description": "Aggregation function for the field\n(e.g., `mean`, `sum`, `median`, `min`, `max`, `count`).\n\n__Default value:__ `undefined` (None)"
          },
          "axis": {
            "anyOf": [
              {
                "$ref": "#/definitions/Axis"
              },
              {
                "type": "null"
              }
            ],
            "description": "An object defining properties of axis's gridlines, ticks and labels.\nIf `null`, the axis for the encoding channel will be removed.\n\n__Default value:__ If undefined, default [axis properties](axis.html) are applied."
          },
          "bin": {
            "anyOf": [
              {
                "type": "boolean"
              },
              {
                "$ref": "#/definitions/BinParams"
              }
            ],
            "description": "A flag for binning a `quantitative` field, or [an object defining binning parameters](bin.html#params).\nIf `true`, default [binning parameters](bin.html) will be applied.\n\n__Default value:__ `false`"
          },
          "field": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "$ref": "#/definitions/RepeatRef"
              }
            ],
            "description": "__Required.__ A string defining the name of the field from which to pull a data value\nor an object defining iterated values from the [`repeat`](repeat.html) operator.\n\n__Note:__ `field` is not required if `aggregate` is `count`."
          },
          "scale": {
            "$ref": "#/definitions/Scale",
            "description": "An object defining properties of the channel's scale, which is the function that transforms values in the data domain (numbers, dates, strings, etc) to visual values (pixels, colors, sizes) of the encoding channels.\n\n__Default value:__ If undefined, default [scale properties](scale.html) are applied."
          },
          "sort": {
            "anyOf": [
              {
                "$ref": "#/definitions/SortOrder"
              },
              {
                "$ref": "#/definitions/SortField"
              },
              {
                "type": "null"
              }
            ],
            "description": "Sort order for the encoded field.\nSupported `sort` values include `\"ascending\"`, `\"descending\"` and `null` (no sorting).\nFor fields with discrete domains, `sort` can also be a [sort field definition object](sort.html#sort-field).\n\n__Default value:__ `\"ascending\"`"
          },
          "stack": {
            "anyOf": [
              {
                "$ref": "#/definitions/StackOffset"
              },
              {
                "type": "null"
              }
            ],
            "description": "Type of stacking offset if the field should be stacked.\n`stack` is only applicable for `x` and `y` channels with continuous domains.\nFor example, `stack` of `y` can be used to customize stacking for a vertical bar chart.\n\n`stack` can be one of the following values:\n- `\"zero\"`: stacking with baseline offset at zero value of the scale (for creating typical stacked [bar](stack.html#bar) and [area](stack.html#area) chart).\n- `\"normalize\"` - stacking with normalized domain (for creating [normalized stacked bar and area charts](stack.html#normalized). <br/>\n-`\"center\"` - stacking with center baseline (for [streamgraph](stack.html#streamgraph)).\n- `null` - No-stacking. This will produce layered [bar](stack.html#layered-bar-chart) and area chart.\n\n__Default value:__ `zero` for plots with all of the following conditions are true:\n(1) the mark is `bar` or `area`;\n(2) the stacked measure channel (x or y) has a linear scale;\n(3) At least one of non-position channels mapped to an unaggregated field that is different from x and y.  Otherwise, `null` by default."
          },
          "timeUnit": {
            "$ref": "#/definitions/TimeUnit",
            "description": "Time unit (e.g., `year`, `yearmonth`, `month`, `hours`) for a temporal field.\nor [a temporal field that gets casted as ordinal](type.html#cast).\n\n__Default value:__ `undefined` (None)"
          },
          "type": {
            "$ref": "#/definitions/Type",
            "description": "The encoded field's type of measurement (`\"quantitative\"`, `\"temporal\"`, `\"ordinal\"`, or `\"nominal\"`)."
          }
        },
        "required": [
          "type"
        ],
        "type": "object"
      },
      "RangeConfig": {
        "additionalProperties": {
          "$ref": "#/definitions/RangeConfigValue"
        },
        "properties": {
          "category": {
            "anyOf": [
              {
                "items": {
                  "type": "string"
                },
                "type": "array"
              },
              {
                "$ref": "#/definitions/VgScheme"
              }
            ],
            "description": "Default range for _nominal_ (categorical) fields."
          },
          "diverging": {
            "anyOf": [
              {
                "items": {
                  "type": "string"
                },
                "type": "array"
              },
              {
                "$ref": "#/definitions/VgScheme"
              }
            ],
            "description": "Default range for diverging _quantitative_ fields."
          },
          "heatmap": {
            "anyOf": [
              {
                "items": {
                  "type": "string"
                },
                "type": "array"
              },
              {
                "$ref": "#/definitions/VgScheme"
              }
            ],
            "description": "Default range for _quantitative_ heatmaps."
          },
          "ordinal": {
            "anyOf": [
              {
                "items": {
                  "type": "string"
                },
                "type": "array"
              },
              {
                "$ref": "#/definitions/VgScheme"
              }
            ],
            "description": "Default range for _ordinal_ fields."
          },
          "ramp": {
            "anyOf": [
              {
                "items": {
                  "type": "string"
                },
                "type": "array"
              },
              {
                "$ref": "#/definitions/VgScheme"
              }
            ],
            "description": "Default range for _quantitative_ and _temporal_ fields."
          },
          "symbol": {
            "description": "Default range palette for the `shape` channel.",
            "items": {
              "type": "string"
            },
            "type": "array"
          }
        },
        "type": "object"
      },
      "RangeConfigValue": {
        "anyOf": [
          {
            "items": {
              "type": [
                "number",
                "string"
              ]
            },
            "type": "array"
          },
          {
            "$ref": "#/definitions/VgScheme"
          },
          {
            "additionalProperties": false,
            "properties": {
              "step": {
                "type": "number"
              }
            },
            "required": [
              "step"
            ],
            "type": "object"
          }
        ]
      },
      "RangeFilter": {
        "additionalProperties": false,
        "properties": {
          "field": {
            "description": "Field to be filtered",
            "type": "string"
          },
          "range": {
            "description": "An array of inclusive minimum and maximum values\nfor a field value of a data item to be included in the filtered data.",
            "items": {
              "anyOf": [
                {
                  "type": "number"
                },
                {
                  "$ref": "#/definitions/DateTime"
                }
              ]
            },
            "maxItems": 2,
            "minItems": 2,
            "type": "array"
          },
          "timeUnit": {
            "$ref": "#/definitions/TimeUnit",
            "description": "time unit for the field to be filtered."
          }
        },
        "required": [
          "field",
          "range"
        ],
        "type": "object"
      },
      "Repeat": {
        "additionalProperties": false,
        "properties": {
          "column": {
            "description": "Horizontal repeated views.",
            "items": {
              "type": "string"
            },
            "type": "array"
          },
          "row": {
            "description": "Vertical repeated views.",
            "items": {
              "type": "string"
            },
            "type": "array"
          }
        },
        "type": "object"
      },
      "RepeatRef": {
        "additionalProperties": false,
        "description": "Reference to a repeated value.",
        "properties": {
          "repeat": {
            "enum": [
              "row",
              "column"
            ],
            "type": "string"
          }
        },
        "required": [
          "repeat"
        ],
        "type": "object"
      },
      "Resolve": {
        "additionalProperties": false,
        "description": "Defines how scales, axes, and legends from different specs should be combined. Resolve is a mapping from `scale`, `axis`, and `legend` to a mapping from channels to resolutions.",
        "properties": {
          "axis": {
            "$ref": "#/definitions/AxisResolveMap"
          },
          "legend": {
            "$ref": "#/definitions/LegendResolveMap"
          },
          "scale": {
            "$ref": "#/definitions/ScaleResolveMap"
          }
        },
        "type": "object"
      },
      "ResolveMode": {
        "enum": [
          "independent",
          "shared"
        ],
        "type": "string"
      },
      "Scale": {
        "additionalProperties": false,
        "properties": {
          "base": {
            "description": "The logarithm base of the `log` scale (default `10`).",
            "type": "number"
          },
          "clamp": {
            "description": "If `true`, values that exceed the data domain are clamped to either the minimum or maximum range value\n\n__Default value:__ derived from the [scale config](config.html#scale-config)'s `clamp` (`true` by default).",
            "type": "boolean"
          },
          "domain": {
            "anyOf": [
              {
                "items": {
                  "type": "number"
                },
                "type": "array"
              },
              {
                "items": {
                  "type": "string"
                },
                "type": "array"
              },
              {
                "items": {
                  "type": "boolean"
                },
                "type": "array"
              },
              {
                "items": {
                  "$ref": "#/definitions/DateTime"
                },
                "type": "array"
              },
              {
                "enum": [
                  "unaggregated"
                ],
                "type": "string"
              },
              {
                "$ref": "#/definitions/SelectionDomain"
              }
            ],
            "description": "Customized domain values.\n\nFor _quantitative_ fields, `domain` can take the form of a two-element array with minimum and maximum values.  [Piecewise scales](scale.html#piecewise) can be created by providing a `domain` with more than two entries.\nIf the input field is aggregated, `domain` can also be a string value `\"unaggregated\"`, indicating that the domain should include the raw data values prior to the aggregation.\n\nFor _temporal_ fields, `domain` can be a two-element array minimum and maximum values, in the form of either timestamps or the [DateTime definition objects](types.html#datetime).\n\nFor _ordinal_ and _nominal_ fields, `domain` can be an array that lists valid input values.\n\nThe `selection` property can be used to [interactively determine](selection.html#scale-domains) the scale domain."
          },
          "exponent": {
            "description": "The exponent of the `pow` scale.",
            "type": "number"
          },
          "interpolate": {
            "anyOf": [
              {
                "$ref": "#/definitions/Interpolate"
              },
              {
                "$ref": "#/definitions/InterpolateParams"
              }
            ],
            "description": "The interpolation method for range values. By default, a general interpolator for numbers, dates, strings and colors (in RGB space) is used. For color ranges, this property allows interpolation in alternative color spaces. Legal values include `rgb`, `hsl`, `hsl-long`, `lab`, `hcl`, `hcl-long`, `cubehelix` and `cubehelix-long` ('-long' variants use longer paths in polar coordinate spaces). If object-valued, this property accepts an object with a string-valued _type_ property and an optional numeric _gamma_ property applicable to rgb and cubehelix interpolators. For more, see the [d3-interpolate documentation](https://github.com/d3/d3-interpolate)."
          },
          "nice": {
            "anyOf": [
              {
                "type": "boolean"
              },
              {
                "type": "number"
              },
              {
                "$ref": "#/definitions/NiceTime"
              },
              {
                "additionalProperties": false,
                "properties": {
                  "interval": {
                    "type": "string"
                  },
                  "step": {
                    "type": "number"
                  }
                },
                "required": [
                  "interval",
                  "step"
                ],
                "type": "object"
              }
            ],
            "description": "Extending the domain so that it starts and ends on nice round values. This method typically modifies the scale’s domain, and may only extend the bounds to the nearest round value. Nicing is useful if the domain is computed from data and may be irregular. For example, for a domain of _[0.201479…, 0.996679…]_, a nice domain might be _[0.2, 1.0]_.\n\nFor quantitative scales such as linear, `nice` can be either a boolean flag or a number. If `nice` is a number, it will represent a desired tick count. This allows greater control over the step size used to extend the bounds, guaranteeing that the returned ticks will exactly cover the domain.\n\nFor temporal fields with time and utc scales, the `nice` value can be a string indicating the desired time interval. Legal values are `\"millisecond\"`, `\"second\"`, `\"minute\"`, `\"hour\"`, `\"day\"`, `\"week\"`, `\"month\"`, and `\"year\"`. Alternatively, `time` and `utc` scales can accept an object-valued interval specifier of the form `{\"interval\": \"month\", \"step\": 3}`, which includes a desired number of interval steps. Here, the domain would snap to quarter (Jan, Apr, Jul, Oct) boundaries.\n\n__Default value:__ `true` for unbinned _quantitative_ fields; `false` otherwise."
          },
          "padding": {
            "description": "For _[continuous](scale.html#continuous)_ scales, expands the scale domain to accommodate the specified number of pixels on each of the scale range. The scale range must represent pixels for this parameter to function as intended. Padding adjustment is performed prior to all other adjustments, including the effects of the zero, nice, domainMin, and domainMax properties.\n\nFor _[band](scale.html#band)_ scales, shortcut for setting `paddingInner` and `paddingOuter` to the same value.\n\nFor _[point](scale.html#point)_ scales, alias for `paddingOuter`.\n\n__Default value:__ For _continuous_ scales, derived from the [scale config](scale.html#config)'s `continuousPadding`.\nFor _band and point_ scales, see `paddingInner` and `paddingOuter`.",
            "minimum": 0,
            "type": "number"
          },
          "paddingInner": {
            "description": "The inner padding (spacing) within each band step of band scales, as a fraction of the step size. This value must lie in the range [0,1].\n\nFor point scale, this property is invalid as point scales do not have internal band widths (only step sizes between bands).\n\n__Default value:__ derived from the [scale config](scale.html#config)'s `bandPaddingInner`.",
            "maximum": 1,
            "minimum": 0,
            "type": "number"
          },
          "paddingOuter": {
            "description": "The outer padding (spacing) at the ends of the range of band and point scales,\nas a fraction of the step size. This value must lie in the range [0,1].\n\n__Default value:__ derived from the [scale config](scale.html#config)'s `bandPaddingOuter` for band scales and `pointPadding` for point scales.",
            "maximum": 1,
            "minimum": 0,
            "type": "number"
          },
          "range": {
            "anyOf": [
              {
                "items": {
                  "type": "number"
                },
                "type": "array"
              },
              {
                "items": {
                  "type": "string"
                },
                "type": "array"
              },
              {
                "type": "string"
              }
            ],
            "description": "The range of the scale. One of:\n\n- A string indicating a [pre-defined named scale range](scale.html#range-config) (e.g., example, `\"symbol\"`, or `\"diverging\"`).\n\n- For [continuous scales](scale.html#continuous), two-element array indicating  minimum and maximum values, or an array with more than two entries for specifying a [piecewise scale](scale.html#piecewise).\n\n- For [discrete](scale.html#discrete) and [discretizing](scale.html#discretizing) scales, an array of desired output values.\n\n__Notes:__\n\n1) For [sequential](scale.html#sequential), [ordinal](scale.html#ordinal), and discretizing color scales, you can also specify a color [`scheme`](scale.html#scheme) instead of `range`.\n\n2) Any directly specified `range` for `x` and `y` channels will be ignored. Range can be customized via the view's corresponding [size](size.html) (`width` and `height`) or via [range steps and paddings properties](#range-step) for [band](#band) and [point](#point) scales."
          },
          "rangeStep": {
            "description": "The distance between the starts of adjacent bands or points in [band](scale.html#band) and [point](scale.html#point) scales.\n\nIf `rangeStep` is `null` or if the view contains the scale's corresponding [size](size.html) (`width` for `x` scales and `height` for `y` scales), `rangeStep` will be automatically determined to fit the size of the view.\n\n__Default value:__  derived the [scale config](config.html#scale-config)'s `textXRangeStep` (`90` by default) for x-scales of `text` marks and `rangeStep` (`21` by default) for x-scales of other marks and y-scales.\n\n__Warning__: If `rangeStep` is `null` and the cardinality of the scale's domain is higher than `width` or `height`, the rangeStep might become less than one pixel and the mark might not appear correctly.",
            "minimum": 0,
            "type": [
              "number",
              "null"
            ]
          },
          "round": {
            "description": "If `true`, rounds numeric output values to integers. This can be helpful for snapping to the pixel grid.\n\n__Default value:__ `false`.",
            "type": "boolean"
          },
          "scheme": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "$ref": "#/definitions/SchemeParams"
              }
            ],
            "description": "A string indicating a color [scheme](scale.html#scheme) name (e.g., `\"category10\"` or `\"viridis\"`) or a [scheme parameter object](scale.html#scheme-params).\n\nDiscrete color schemes may be used with [discrete](scale.html#discrete) or [discretizing](scale.html#discretizing) scales. Continuous color schemes are intended for use with [sequential](scales.html#sequential) scales.\n\nFor the full list of supported scheme, please refer to the [Vega Scheme](https://vega.github.io/vega/docs/schemes/#reference) reference."
          },
          "type": {
            "$ref": "#/definitions/ScaleType",
            "description": "The type of scale.  Vega-Lite supports the following categories of scale types:\n\n1) [**Continuous Scales**](scale.html#continuous) -- mapping continuous domains to continuous output ranges ([`\"linear\"`](scale.html#linear), [`\"pow\"`](scale.html#pow), [`\"sqrt\"`](scale.html#sqrt), [`\"log\"`](scale.html#log), [`\"time\"`](scale.html#time), [`\"utc\"`](scale.html#utc), [`\"sequential\"`](scale.html#sequential)).\n\n2) [**Discrete Scales**](scale.html#discrete) -- mapping discrete domains to discrete ([`\"ordinal\"`](scale.html#ordinal)) or continuous ([`\"band\"`](scale.html#band) and [`\"point\"`](scale.html#point)) output ranges.\n\n3) [**Discretizing Scales**](scale.html#discretizing) -- mapping continuous domains to discrete output ranges ([`\"bin-linear\"`](scale.html#bin-linear) and [`\"bin-ordinal\"`](scale.html#bin-ordinal)).\n\n__Default value:__ please see the [scale type table](scale.html#type)."
          },
          "zero": {
            "description": "If `true`, ensures that a zero baseline value is included in the scale domain.\n\n__Default value:__ `true` for x and y channels if the quantitative field is not binned and no custom `domain` is provided; `false` otherwise.\n\n__Note:__ Log, time, and utc scales do not support `zero`.",
            "type": "boolean"
          }
        },
        "type": "object"
      },
      "ScaleConfig": {
        "additionalProperties": false,
        "properties": {
          "bandPaddingInner": {
            "description": "Default inner padding for `x` and `y` band-ordinal scales.\n\n__Default value:__ `0.1`",
            "maximum": 1,
            "minimum": 0,
            "type": "number"
          },
          "bandPaddingOuter": {
            "description": "Default outer padding for `x` and `y` band-ordinal scales.\nIf not specified, by default, band scale's paddingOuter is paddingInner/2.",
            "maximum": 1,
            "minimum": 0,
            "type": "number"
          },
          "clamp": {
            "description": "If true, values that exceed the data domain are clamped to either the minimum or maximum range value",
            "type": "boolean"
          },
          "continuousPadding": {
            "description": "Default padding for continuous scales.\n\n__Default:__ `5` for continuous x-scale of a vertical bar and continuous y-scale of a horizontal bar.; `0` otherwise.",
            "minimum": 0,
            "type": "number"
          },
          "maxBandSize": {
            "description": "The default max value for mapping quantitative fields to bar's size/bandSize.\n\nIf undefined (default), we will use the scale's `rangeStep` - 1.",
            "minimum": 0,
            "type": "number"
          },
          "maxFontSize": {
            "description": "The default max value for mapping quantitative fields to text's size/fontSize.\n\n__Default value:__ `40`",
            "minimum": 0,
            "type": "number"
          },
          "maxOpacity": {
            "description": "Default max opacity for mapping a field to opacity.\n\n__Default value:__ `0.8`",
            "maximum": 1,
            "minimum": 0,
            "type": "number"
          },
          "maxSize": {
            "description": "Default max value for point size scale.",
            "minimum": 0,
            "type": "number"
          },
          "maxStrokeWidth": {
            "description": "Default max strokeWidth for strokeWidth  (or rule/line's size) scale.\n\n__Default value:__ `4`",
            "minimum": 0,
            "type": "number"
          },
          "minBandSize": {
            "description": "The default min value for mapping quantitative fields to bar and tick's size/bandSize scale with zero=false.\n\n__Default value:__ `2`",
            "minimum": 0,
            "type": "number"
          },
          "minFontSize": {
            "description": "The default min value for mapping quantitative fields to tick's size/fontSize scale with zero=false\n\n__Default value:__ `8`",
            "minimum": 0,
            "type": "number"
          },
          "minOpacity": {
            "description": "Default minimum opacity for mapping a field to opacity.\n\n__Default value:__ `0.3`",
            "maximum": 1,
            "minimum": 0,
            "type": "number"
          },
          "minSize": {
            "description": "Default minimum value for point size scale with zero=false.\n\n__Default value:__ `9`",
            "minimum": 0,
            "type": "number"
          },
          "minStrokeWidth": {
            "description": "Default minimum strokeWidth for strokeWidth (or rule/line's size) scale with zero=false.\n\n__Default value:__ `1`",
            "minimum": 0,
            "type": "number"
          },
          "pointPadding": {
            "description": "Default outer padding for `x` and `y` point-ordinal scales.\n\n__Default value:__ `0.5`",
            "maximum": 1,
            "minimum": 0,
            "type": "number"
          },
          "rangeStep": {
            "description": "Default range step for band and point scales of (1) the `y` channel\nand (2) the `x` channel when the mark is not `text`.\n\n__Default value:__ `21`",
            "minimum": 0,
            "type": [
              "number",
              "null"
            ]
          },
          "round": {
            "description": "If true, rounds numeric output values to integers.\nThis can be helpful for snapping to the pixel grid.\n(Only available for `x`, `y`, and `size` scales.)",
            "type": "boolean"
          },
          "textXRangeStep": {
            "description": "Default range step for `x` band and point scales of text marks.\n\n__Default value:__ `90`",
            "minimum": 0,
            "type": "number"
          },
          "useUnaggregatedDomain": {
            "description": "Use the source data range before aggregation as scale domain instead of aggregated data for aggregate axis.\n\nThis is equivalent to setting `domain` to `\"unaggregate\"` for aggregated _quantitative_ fields by default.\n\nThis property only works with aggregate functions that produce values within the raw data domain (`\"mean\"`, `\"average\"`, `\"median\"`, `\"q1\"`, `\"q3\"`, `\"min\"`, `\"max\"`). For other aggregations that produce values outside of the raw data domain (e.g. `\"count\"`, `\"sum\"`), this property is ignored.\n\n__Default value:__ `false`",
            "type": "boolean"
          }
        },
        "type": "object"
      },
      "ScaleFieldDef": {
        "additionalProperties": false,
        "properties": {
          "aggregate": {
            "$ref": "#/definitions/Aggregate",
            "description": "Aggregation function for the field\n(e.g., `mean`, `sum`, `median`, `min`, `max`, `count`).\n\n__Default value:__ `undefined` (None)"
          },
          "bin": {
            "anyOf": [
              {
                "type": "boolean"
              },
              {
                "$ref": "#/definitions/BinParams"
              }
            ],
            "description": "A flag for binning a `quantitative` field, or [an object defining binning parameters](bin.html#params).\nIf `true`, default [binning parameters](bin.html) will be applied.\n\n__Default value:__ `false`"
          },
          "field": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "$ref": "#/definitions/RepeatRef"
              }
            ],
            "description": "__Required.__ A string defining the name of the field from which to pull a data value\nor an object defining iterated values from the [`repeat`](repeat.html) operator.\n\n__Note:__ `field` is not required if `aggregate` is `count`."
          },
          "scale": {
            "$ref": "#/definitions/Scale",
            "description": "An object defining properties of the channel's scale, which is the function that transforms values in the data domain (numbers, dates, strings, etc) to visual values (pixels, colors, sizes) of the encoding channels.\n\n__Default value:__ If undefined, default [scale properties](scale.html) are applied."
          },
          "sort": {
            "anyOf": [
              {
                "$ref": "#/definitions/SortOrder"
              },
              {
                "$ref": "#/definitions/SortField"
              },
              {
                "type": "null"
              }
            ],
            "description": "Sort order for the encoded field.\nSupported `sort` values include `\"ascending\"`, `\"descending\"` and `null` (no sorting).\nFor fields with discrete domains, `sort` can also be a [sort field definition object](sort.html#sort-field).\n\n__Default value:__ `\"ascending\"`"
          },
          "timeUnit": {
            "$ref": "#/definitions/TimeUnit",
            "description": "Time unit (e.g., `year`, `yearmonth`, `month`, `hours`) for a temporal field.\nor [a temporal field that gets casted as ordinal](type.html#cast).\n\n__Default value:__ `undefined` (None)"
          },
          "type": {
            "$ref": "#/definitions/Type",
            "description": "The encoded field's type of measurement (`\"quantitative\"`, `\"temporal\"`, `\"ordinal\"`, or `\"nominal\"`)."
          }
        },
        "required": [
          "type"
        ],
        "type": "object"
      },
      "ScaleResolveMap": {
        "additionalProperties": false,
        "properties": {
          "color": {
            "$ref": "#/definitions/ResolveMode"
          },
          "opacity": {
            "$ref": "#/definitions/ResolveMode"
          },
          "shape": {
            "$ref": "#/definitions/ResolveMode"
          },
          "size": {
            "$ref": "#/definitions/ResolveMode"
          },
          "x": {
            "$ref": "#/definitions/ResolveMode"
          },
          "y": {
            "$ref": "#/definitions/ResolveMode"
          }
        },
        "type": "object"
      },
      "ScaleType": {
        "enum": [
          "linear",
          "bin-linear",
          "log",
          "pow",
          "sqrt",
          "time",
          "utc",
          "sequential",
          "ordinal",
          "bin-ordinal",
          "point",
          "band"
        ],
        "type": "string"
      },
      "SchemeParams": {
        "additionalProperties": false,
        "properties": {
          "extent": {
            "description": "For sequential and diverging schemes only, determines the extent of the color range to use. For example `[0.2, 1]` will rescale the color scheme such that color values in the range _[0, 0.2)_ are excluded from the scheme.",
            "items": {
              "type": "number"
            },
            "type": "array"
          },
          "name": {
            "description": "A color scheme name for sequential/ordinal scales (e.g., `\"category10\"` or `\"viridis\"`).\n\nFor the full list of supported scheme, please refer to the [Vega Scheme](https://vega.github.io/vega/docs/schemes/#reference) reference.",
            "type": "string"
          }
        },
        "required": [
          "name"
        ],
        "type": "object"
      },
      "SelectionConfig": {
        "additionalProperties": false,
        "properties": {
          "interval": {
            "$ref": "#/definitions/IntervalSelectionConfig",
            "description": "The default definition for an [`interval`](selection.html#type) selection. All properties and transformations\nfor an interval selection definition (except `type`) may be specified here.\n\nFor instance, setting `interval` to `{\"translate\": false}` disables the ability to move\ninterval selections by default."
          },
          "multi": {
            "$ref": "#/definitions/MultiSelectionConfig",
            "description": "The default definition for a [`multi`](selection.html#type) selection. All properties and transformations\nfor a multi selection definition (except `type`) may be specified here.\n\nFor instance, setting `multi` to `{\"toggle\": \"event.altKey\"}` adds additional values to\nmulti selections when clicking with the alt-key pressed by default."
          },
          "single": {
            "$ref": "#/definitions/SingleSelectionConfig",
            "description": "The default definition for a [`single`](selection.html#type) selection. All properties and transformations\n  for a single selection definition (except `type`) may be specified here.\n\nFor instance, setting `single` to `{\"on\": \"dblclick\"}` populates single selections on double-click by default."
          }
        },
        "type": "object"
      },
      "SelectionDef": {
        "anyOf": [
          {
            "$ref": "#/definitions/SingleSelection"
          },
          {
            "$ref": "#/definitions/MultiSelection"
          },
          {
            "$ref": "#/definitions/IntervalSelection"
          }
        ]
      },
      "SelectionDomain": {
        "anyOf": [
          {
            "additionalProperties": false,
            "properties": {
              "field": {
                "description": "The field name to extract selected values for, when a selection is [projected](project.html)\nover multiple fields or encodings.",
                "type": "string"
              },
              "selection": {
                "description": "The name of a selection.",
                "type": "string"
              }
            },
            "required": [
              "selection"
            ],
            "type": "object"
          },
          {
            "additionalProperties": false,
            "properties": {
              "encoding": {
                "description": "The encoding channel to extract selected values for, when a selection is [projected](project.html)\nover multiple fields or encodings.",
                "type": "string"
              },
              "selection": {
                "description": "The name of a selection.",
                "type": "string"
              }
            },
            "required": [
              "selection"
            ],
            "type": "object"
          }
        ]
      },
      "SelectionFilter": {
        "additionalProperties": false,
        "properties": {
          "selection": {
            "$ref": "#/definitions/SelectionOperand",
            "description": "Filter using a selection name."
          }
        },
        "required": [
          "selection"
        ],
        "type": "object"
      },
      "SelectionResolution": {
        "enum": [
          "global",
          "union",
          "intersect"
        ],
        "type": "string"
      },
      "SingleDefChannel": {
        "enum": [
          "x",
          "y",
          "x2",
          "y2",
          "row",
          "column",
          "size",
          "shape",
          "color",
          "opacity",
          "text",
          "tooltip"
        ],
        "type": "string"
      },
      "SingleSelection": {
        "additionalProperties": false,
        "properties": {
          "bind": {
            "anyOf": [
              {
                "$ref": "#/definitions/VgBinding"
              },
              {
                "additionalProperties": {
                  "$ref": "#/definitions/VgBinding"
                },
                "type": "object"
              }
            ],
            "description": "Establish a two-way binding between a single selection and input elements\n(also known as dynamic query widgets). A binding takes the form of\nVega's [input element binding definition](https://vega.github.io/vega/docs/signals/#bind)\nor can be a mapping between projected field/encodings and binding definitions.\n\nSee the [bind transform](bind.html) documentation for more information."
          },
          "empty": {
            "description": "By default, all data values are considered to lie within an empty selection.\nWhen set to `none`, empty selections contain no data values.",
            "enum": [
              "all",
              "none"
            ],
            "type": "string"
          },
          "encodings": {
            "description": "An array of encoding channels. The corresponding data field values\nmust match for a data tuple to fall within the selection.",
            "items": {
              "$ref": "#/definitions/SingleDefChannel"
            },
            "type": "array"
          },
          "fields": {
            "description": "An array of field names whose values must match for a data tuple to\nfall within the selection.",
            "items": {
              "type": "string"
            },
            "type": "array"
          },
          "nearest": {
            "description": "When true, an invisible voronoi diagram is computed to accelerate discrete\nselection. The data value _nearest_ the mouse cursor is added to the selection.\n\nSee the [nearest transform](nearest.html) documentation for more information.",
            "type": "boolean"
          },
          "on": {
            "$ref": "#/definitions/VgEventStream",
            "description": "A [Vega event stream](https://vega.github.io/vega/docs/event-streams/) (object or selector) that triggers the selection.\nFor interval selections, the event stream must specify a [start and end](https://vega.github.io/vega/docs/event-streams/#between-filters)."
          },
          "resolve": {
            "$ref": "#/definitions/SelectionResolution",
            "description": "With layered and multi-view displays, a strategy that determines how\nselections' data queries are resolved when applied in a filter transform,\nconditional encoding rule, or scale domain."
          },
          "type": {
            "enum": [
              "single"
            ],
            "type": "string"
          }
        },
        "required": [
          "type"
        ],
        "type": "object"
      },
      "SingleSelectionConfig": {
        "additionalProperties": false,
        "properties": {
          "bind": {
            "anyOf": [
              {
                "$ref": "#/definitions/VgBinding"
              },
              {
                "additionalProperties": {
                  "$ref": "#/definitions/VgBinding"
                },
                "type": "object"
              }
            ],
            "description": "Establish a two-way binding between a single selection and input elements\n(also known as dynamic query widgets). A binding takes the form of\nVega's [input element binding definition](https://vega.github.io/vega/docs/signals/#bind)\nor can be a mapping between projected field/encodings and binding definitions.\n\nSee the [bind transform](bind.html) documentation for more information."
          },
          "empty": {
            "description": "By default, all data values are considered to lie within an empty selection.\nWhen set to `none`, empty selections contain no data values.",
            "enum": [
              "all",
              "none"
            ],
            "type": "string"
          },
          "encodings": {
            "description": "An array of encoding channels. The corresponding data field values\nmust match for a data tuple to fall within the selection.",
            "items": {
              "$ref": "#/definitions/SingleDefChannel"
            },
            "type": "array"
          },
          "fields": {
            "description": "An array of field names whose values must match for a data tuple to\nfall within the selection.",
            "items": {
              "type": "string"
            },
            "type": "array"
          },
          "nearest": {
            "description": "When true, an invisible voronoi diagram is computed to accelerate discrete\nselection. The data value _nearest_ the mouse cursor is added to the selection.\n\nSee the [nearest transform](nearest.html) documentation for more information.",
            "type": "boolean"
          },
          "on": {
            "$ref": "#/definitions/VgEventStream",
            "description": "A [Vega event stream](https://vega.github.io/vega/docs/event-streams/) (object or selector) that triggers the selection.\nFor interval selections, the event stream must specify a [start and end](https://vega.github.io/vega/docs/event-streams/#between-filters)."
          },
          "resolve": {
            "$ref": "#/definitions/SelectionResolution",
            "description": "With layered and multi-view displays, a strategy that determines how\nselections' data queries are resolved when applied in a filter transform,\nconditional encoding rule, or scale domain."
          }
        },
        "type": "object"
      },
      "SingleTimeUnit": {
        "anyOf": [
          {
            "$ref": "#/definitions/LocalSingleTimeUnit"
          },
          {
            "$ref": "#/definitions/UtcSingleTimeUnit"
          }
        ]
      },
      "SortField": {
        "additionalProperties": false,
        "properties": {
          "field": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "$ref": "#/definitions/RepeatRef"
              }
            ],
            "description": "The data [field](field.html) to sort by.\n\n__Default value:__ If unspecified, defaults to the field specified in the outer data reference."
          },
          "op": {
            "$ref": "#/definitions/AggregateOp",
            "description": "An [aggregate operation](aggregate.html#ops) to perform on the field prior to sorting (e.g., `\"count\"`, `\"mean\"` and `\"median\"`).\nThis property is required in cases where the sort field and the data reference field do not match.\nThe input data objects will be aggregated, grouped by the encoded data field.\n\nFor a full list of operations, please see the documentation for [aggregate](aggregate.html#ops)."
          },
          "order": {
            "$ref": "#/definitions/SortOrder",
            "description": "The sort order. One of `\"ascending\"` (default) or `\"descending\"`."
          }
        },
        "required": [
          "op"
        ],
        "type": "object"
      },
      "SortOrder": {
        "anyOf": [
          {
            "enum": [
              "ascending"
            ],
            "type": "string"
          },
          {
            "enum": [
              "descending"
            ],
            "type": "string"
          },
          {
            "type": "null"
          }
        ]
      },
      "StackOffset": {
        "enum": [
          "zero",
          "center",
          "normalize"
        ],
        "type": "string"
      },
      "StyleConfigIndex": {
        "additionalProperties": {
          "$ref": "#/definitions/VgMarkConfig"
        },
        "type": "object"
      },
      "TextConfig": {
        "additionalProperties": false,
        "properties": {
          "align": {
            "$ref": "#/definitions/HorizontalAlign",
            "description": "The horizontal alignment of the text. One of `\"left\"`, `\"right\"`, `\"center\"`."
          },
          "angle": {
            "description": "The rotation angle of the text, in degrees.",
            "maximum": 360,
            "minimum": 0,
            "type": "number"
          },
          "baseline": {
            "$ref": "#/definitions/VerticalAlign",
            "description": "The vertical alignment of the text. One of `\"top\"`, `\"middle\"`, `\"bottom\"`.\n\n__Default value:__ `\"middle\"`"
          },
          "color": {
            "description": "Default color.  Note that `fill` and `stroke` have higher precedence than `color` and will override `color`.\n\n__Default value:__ <span style=\"color: #4682b4;\">&#9632;</span> `\"#4682b4\"`\n\n__Note:__ This property cannot be used in a [style config](mark.html#style-config).",
            "type": "string"
          },
          "dx": {
            "description": "The horizontal offset, in pixels, between the text label and its anchor point. The offset is applied after rotation by the _angle_ property.",
            "type": "number"
          },
          "dy": {
            "description": "The vertical offset, in pixels, between the text label and its anchor point. The offset is applied after rotation by the _angle_ property.",
            "type": "number"
          },
          "fill": {
            "description": "Default Fill Color.  This has higher precedence than config.color\n\n__Default value:__ (None)",
            "type": "string"
          },
          "fillOpacity": {
            "description": "The fill opacity (value between [0,1]).\n\n__Default value:__ `1`",
            "maximum": 1,
            "minimum": 0,
            "type": "number"
          },
          "filled": {
            "description": "Whether the mark's color should be used as fill color instead of stroke color.\n\n__Default value:__ `true` for all marks except `point` and `false` for `point`.\n\n__Applicable for:__ `bar`, `point`, `circle`, `square`, and `area` marks.\n\n__Note:__ This property cannot be used in a [style config](mark.html#style-config).",
            "type": "boolean"
          },
          "font": {
            "description": "The typeface to set the text in (e.g., `\"Helvetica Neue\"`).",
            "type": "string"
          },
          "fontSize": {
            "description": "The font size, in pixels.",
            "minimum": 0,
            "type": "number"
          },
          "fontStyle": {
            "$ref": "#/definitions/FontStyle",
            "description": "The font style (e.g., `\"italic\"`)."
          },
          "fontWeight": {
            "anyOf": [
              {
                "$ref": "#/definitions/FontWeight"
              },
              {
                "$ref": "#/definitions/FontWeightNumber"
              }
            ],
            "description": "The font weight (e.g., `\"bold\"`)."
          },
          "interpolate": {
            "$ref": "#/definitions/Interpolate",
            "description": "The line interpolation method to use for line and area marks. One of the following:\n- `\"linear\"`: piecewise linear segments, as in a polyline.\n- `\"linear-closed\"`: close the linear segments to form a polygon.\n- `\"step\"`: alternate between horizontal and vertical segments, as in a step function.\n- `\"step-before\"`: alternate between vertical and horizontal segments, as in a step function.\n- `\"step-after\"`: alternate between horizontal and vertical segments, as in a step function.\n- `\"basis\"`: a B-spline, with control point duplication on the ends.\n- `\"basis-open\"`: an open B-spline; may not intersect the start or end.\n- `\"basis-closed\"`: a closed B-spline, as in a loop.\n- `\"cardinal\"`: a Cardinal spline, with control point duplication on the ends.\n- `\"cardinal-open\"`: an open Cardinal spline; may not intersect the start or end, but will intersect other control points.\n- `\"cardinal-closed\"`: a closed Cardinal spline, as in a loop.\n- `\"bundle\"`: equivalent to basis, except the tension parameter is used to straighten the spline.\n- `\"monotone\"`: cubic interpolation that preserves monotonicity in y."
          },
          "limit": {
            "description": "The maximum length of the text mark in pixels (default 0, indicating no limit). The text value will be automatically truncated if the rendered size exceeds the limit.",
            "type": "number"
          },
          "opacity": {
            "description": "The overall opacity (value between [0,1]).\n\n__Default value:__ `0.7` for non-aggregate plots with `point`, `tick`, `circle`, or `square` marks or layered `bar` charts and `1` otherwise.",
            "maximum": 1,
            "minimum": 0,
            "type": "number"
          },
          "orient": {
            "$ref": "#/definitions/Orient",
            "description": "The orientation of a non-stacked bar, tick, area, and line charts.\nThe value is either horizontal (default) or vertical.\n- For bar, rule and tick, this determines whether the size of the bar and tick\nshould be applied to x or y dimension.\n- For area, this property determines the orient property of the Vega output.\n- For line, this property determines the sort order of the points in the line\nif `config.sortLineBy` is not specified.\nFor stacked charts, this is always determined by the orientation of the stack;\ntherefore explicitly specified value will be ignored."
          },
          "radius": {
            "description": "Polar coordinate radial offset, in pixels, of the text label from the origin determined by the `x` and `y` properties.",
            "minimum": 0,
            "type": "number"
          },
          "shape": {
            "description": "The default symbol shape to use. One of: `\"circle\"` (default), `\"square\"`, `\"cross\"`, `\"diamond\"`, `\"triangle-up\"`, or `\"triangle-down\"`, or a custom SVG path.\n\n__Default value:__ `\"circle\"`",
            "type": "string"
          },
          "shortTimeLabels": {
            "description": "Whether month names and weekday names should be abbreviated.",
            "type": "boolean"
          },
          "size": {
            "description": "The pixel area each the point/circle/square.\nFor example: in the case of circles, the radius is determined in part by the square root of the size value.\n\n__Default value:__ `30`",
            "minimum": 0,
            "type": "number"
          },
          "stroke": {
            "description": "Default Stroke Color.  This has higher precedence than config.color\n\n__Default value:__ (None)",
            "type": "string"
          },
          "strokeDash": {
            "description": "An array of alternating stroke, space lengths for creating dashed or dotted lines.",
            "items": {
              "type": "number"
            },
            "type": "array"
          },
          "strokeDashOffset": {
            "description": "The offset (in pixels) into which to begin drawing with the stroke dash array.",
            "type": "number"
          },
          "strokeOpacity": {
            "description": "The stroke opacity (value between [0,1]).\n\n__Default value:__ `1`",
            "maximum": 1,
            "minimum": 0,
            "type": "number"
          },
          "strokeWidth": {
            "description": "The stroke width, in pixels.",
            "minimum": 0,
            "type": "number"
          },
          "tension": {
            "description": "Depending on the interpolation type, sets the tension parameter (for line and area marks).",
            "maximum": 1,
            "minimum": 0,
            "type": "number"
          },
          "text": {
            "description": "Placeholder text if the `text` channel is not specified",
            "type": "string"
          },
          "theta": {
            "description": "Polar coordinate angle, in radians, of the text label from the origin determined by the `x` and `y` properties. Values for `theta` follow the same convention of `arc` mark `startAngle` and `endAngle` properties: angles are measured in radians, with `0` indicating \"north\".",
            "type": "number"
          }
        },
        "type": "object"
      },
      "TextFieldDef": {
        "additionalProperties": false,
        "properties": {
          "aggregate": {
            "$ref": "#/definitions/Aggregate",
            "description": "Aggregation function for the field\n(e.g., `mean`, `sum`, `median`, `min`, `max`, `count`).\n\n__Default value:__ `undefined` (None)"
          },
          "bin": {
            "anyOf": [
              {
                "type": "boolean"
              },
              {
                "$ref": "#/definitions/BinParams"
              }
            ],
            "description": "A flag for binning a `quantitative` field, or [an object defining binning parameters](bin.html#params).\nIf `true`, default [binning parameters](bin.html) will be applied.\n\n__Default value:__ `false`"
          },
          "field": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "$ref": "#/definitions/RepeatRef"
              }
            ],
            "description": "__Required.__ A string defining the name of the field from which to pull a data value\nor an object defining iterated values from the [`repeat`](repeat.html) operator.\n\n__Note:__ `field` is not required if `aggregate` is `count`."
          },
          "format": {
            "description": "The [formatting pattern](format.html) for a text field. If not defined, this will be determined automatically.",
            "type": "string"
          },
          "timeUnit": {
            "$ref": "#/definitions/TimeUnit",
            "description": "Time unit (e.g., `year`, `yearmonth`, `month`, `hours`) for a temporal field.\nor [a temporal field that gets casted as ordinal](type.html#cast).\n\n__Default value:__ `undefined` (None)"
          },
          "type": {
            "$ref": "#/definitions/Type",
            "description": "The encoded field's type of measurement (`\"quantitative\"`, `\"temporal\"`, `\"ordinal\"`, or `\"nominal\"`)."
          }
        },
        "required": [
          "type"
        ],
        "type": "object"
      },
      "TickConfig": {
        "additionalProperties": false,
        "properties": {
          "align": {
            "$ref": "#/definitions/HorizontalAlign",
            "description": "The horizontal alignment of the text. One of `\"left\"`, `\"right\"`, `\"center\"`."
          },
          "angle": {
            "description": "The rotation angle of the text, in degrees.",
            "maximum": 360,
            "minimum": 0,
            "type": "number"
          },
          "bandSize": {
            "description": "The width of the ticks.\n\n__Default value:__  2/3 of rangeStep.",
            "minimum": 0,
            "type": "number"
          },
          "baseline": {
            "$ref": "#/definitions/VerticalAlign",
            "description": "The vertical alignment of the text. One of `\"top\"`, `\"middle\"`, `\"bottom\"`.\n\n__Default value:__ `\"middle\"`"
          },
          "color": {
            "description": "Default color.  Note that `fill` and `stroke` have higher precedence than `color` and will override `color`.\n\n__Default value:__ <span style=\"color: #4682b4;\">&#9632;</span> `\"#4682b4\"`\n\n__Note:__ This property cannot be used in a [style config](mark.html#style-config).",
            "type": "string"
          },
          "dx": {
            "description": "The horizontal offset, in pixels, between the text label and its anchor point. The offset is applied after rotation by the _angle_ property.",
            "type": "number"
          },
          "dy": {
            "description": "The vertical offset, in pixels, between the text label and its anchor point. The offset is applied after rotation by the _angle_ property.",
            "type": "number"
          },
          "fill": {
            "description": "Default Fill Color.  This has higher precedence than config.color\n\n__Default value:__ (None)",
            "type": "string"
          },
          "fillOpacity": {
            "description": "The fill opacity (value between [0,1]).\n\n__Default value:__ `1`",
            "maximum": 1,
            "minimum": 0,
            "type": "number"
          },
          "filled": {
            "description": "Whether the mark's color should be used as fill color instead of stroke color.\n\n__Default value:__ `true` for all marks except `point` and `false` for `point`.\n\n__Applicable for:__ `bar`, `point`, `circle`, `square`, and `area` marks.\n\n__Note:__ This property cannot be used in a [style config](mark.html#style-config).",
            "type": "boolean"
          },
          "font": {
            "description": "The typeface to set the text in (e.g., `\"Helvetica Neue\"`).",
            "type": "string"
          },
          "fontSize": {
            "description": "The font size, in pixels.",
            "minimum": 0,
            "type": "number"
          },
          "fontStyle": {
            "$ref": "#/definitions/FontStyle",
            "description": "The font style (e.g., `\"italic\"`)."
          },
          "fontWeight": {
            "anyOf": [
              {
                "$ref": "#/definitions/FontWeight"
              },
              {
                "$ref": "#/definitions/FontWeightNumber"
              }
            ],
            "description": "The font weight (e.g., `\"bold\"`)."
          },
          "interpolate": {
            "$ref": "#/definitions/Interpolate",
            "description": "The line interpolation method to use for line and area marks. One of the following:\n- `\"linear\"`: piecewise linear segments, as in a polyline.\n- `\"linear-closed\"`: close the linear segments to form a polygon.\n- `\"step\"`: alternate between horizontal and vertical segments, as in a step function.\n- `\"step-before\"`: alternate between vertical and horizontal segments, as in a step function.\n- `\"step-after\"`: alternate between horizontal and vertical segments, as in a step function.\n- `\"basis\"`: a B-spline, with control point duplication on the ends.\n- `\"basis-open\"`: an open B-spline; may not intersect the start or end.\n- `\"basis-closed\"`: a closed B-spline, as in a loop.\n- `\"cardinal\"`: a Cardinal spline, with control point duplication on the ends.\n- `\"cardinal-open\"`: an open Cardinal spline; may not intersect the start or end, but will intersect other control points.\n- `\"cardinal-closed\"`: a closed Cardinal spline, as in a loop.\n- `\"bundle\"`: equivalent to basis, except the tension parameter is used to straighten the spline.\n- `\"monotone\"`: cubic interpolation that preserves monotonicity in y."
          },
          "limit": {
            "description": "The maximum length of the text mark in pixels (default 0, indicating no limit). The text value will be automatically truncated if the rendered size exceeds the limit.",
            "type": "number"
          },
          "opacity": {
            "description": "The overall opacity (value between [0,1]).\n\n__Default value:__ `0.7` for non-aggregate plots with `point`, `tick`, `circle`, or `square` marks or layered `bar` charts and `1` otherwise.",
            "maximum": 1,
            "minimum": 0,
            "type": "number"
          },
          "orient": {
            "$ref": "#/definitions/Orient",
            "description": "The orientation of a non-stacked bar, tick, area, and line charts.\nThe value is either horizontal (default) or vertical.\n- For bar, rule and tick, this determines whether the size of the bar and tick\nshould be applied to x or y dimension.\n- For area, this property determines the orient property of the Vega output.\n- For line, this property determines the sort order of the points in the line\nif `config.sortLineBy` is not specified.\nFor stacked charts, this is always determined by the orientation of the stack;\ntherefore explicitly specified value will be ignored."
          },
          "radius": {
            "description": "Polar coordinate radial offset, in pixels, of the text label from the origin determined by the `x` and `y` properties.",
            "minimum": 0,
            "type": "number"
          },
          "shape": {
            "description": "The default symbol shape to use. One of: `\"circle\"` (default), `\"square\"`, `\"cross\"`, `\"diamond\"`, `\"triangle-up\"`, or `\"triangle-down\"`, or a custom SVG path.\n\n__Default value:__ `\"circle\"`",
            "type": "string"
          },
          "size": {
            "description": "The pixel area each the point/circle/square.\nFor example: in the case of circles, the radius is determined in part by the square root of the size value.\n\n__Default value:__ `30`",
            "minimum": 0,
            "type": "number"
          },
          "stroke": {
            "description": "Default Stroke Color.  This has higher precedence than config.color\n\n__Default value:__ (None)",
            "type": "string"
          },
          "strokeDash": {
            "description": "An array of alternating stroke, space lengths for creating dashed or dotted lines.",
            "items": {
              "type": "number"
            },
            "type": "array"
          },
          "strokeDashOffset": {
            "description": "The offset (in pixels) into which to begin drawing with the stroke dash array.",
            "type": "number"
          },
          "strokeOpacity": {
            "description": "The stroke opacity (value between [0,1]).\n\n__Default value:__ `1`",
            "maximum": 1,
            "minimum": 0,
            "type": "number"
          },
          "strokeWidth": {
            "description": "The stroke width, in pixels.",
            "minimum": 0,
            "type": "number"
          },
          "tension": {
            "description": "Depending on the interpolation type, sets the tension parameter (for line and area marks).",
            "maximum": 1,
            "minimum": 0,
            "type": "number"
          },
          "text": {
            "description": "Placeholder text if the `text` channel is not specified",
            "type": "string"
          },
          "theta": {
            "description": "Polar coordinate angle, in radians, of the text label from the origin determined by the `x` and `y` properties. Values for `theta` follow the same convention of `arc` mark `startAngle` and `endAngle` properties: angles are measured in radians, with `0` indicating \"north\".",
            "type": "number"
          },
          "thickness": {
            "description": "Thickness of the tick mark.\n\n__Default value:__  `1`",
            "minimum": 0,
            "type": "number"
          }
        },
        "type": "object"
      },
      "TimeUnit": {
        "anyOf": [
          {
            "$ref": "#/definitions/SingleTimeUnit"
          },
          {
            "$ref": "#/definitions/MultiTimeUnit"
          }
        ]
      },
      "TimeUnitTransform": {
        "additionalProperties": false,
        "properties": {
          "as": {
            "description": "The output field to write the timeUnit value.",
            "type": "string"
          },
          "field": {
            "description": "The data field to apply time unit.",
            "type": "string"
          },
          "timeUnit": {
            "$ref": "#/definitions/TimeUnit",
            "description": "The timeUnit."
          }
        },
        "required": [
          "timeUnit",
          "field",
          "as"
        ],
        "type": "object"
      },
      "TitleBase": {
        "additionalProperties": false,
        "properties": {
          "anchor": {
            "$ref": "#/definitions/Anchor",
            "description": "The anchor position for placing the title. One of `\"start\"`, `\"middle\"`, or `\"end\"`. For example, with an orientation of top these anchor positions map to a left-, center-, or right-aligned title.\n\n__Default value:__ `\"middle\"` for [single](spec.html) and [layered](layer.html) views.\n`\"start\"` for other composite views.\n\n__Note:__ [For now](https://github.com/vega/vega-lite/issues/2875), `anchor` is only customizable only for [single](spec.html) and [layered](layer.html) views.  For other composite views, `anchor` is always `\"start\"`."
          },
          "offset": {
            "description": "The orthogonal offset in pixels by which to displace the title from its position along the edge of the chart.",
            "type": "number"
          },
          "orient": {
            "$ref": "#/definitions/TitleOrient",
            "description": "The orientation of the title relative to the chart. One of `\"top\"` (the default), `\"bottom\"`, `\"left\"`, or `\"right\"`."
          },
          "style": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "items": {
                  "type": "string"
                },
                "type": "array"
              }
            ],
            "description": "A [mark style property](config.html#style) to apply to the title text mark.\n\n__Default value:__ `\"group-title\"`."
          }
        },
        "type": "object"
      },
      "TitleOrient": {
        "enum": [
          "top",
          "bottom",
          "left",
          "right"
        ],
        "type": "string"
      },
      "TitleParams": {
        "additionalProperties": false,
        "properties": {
          "anchor": {
            "$ref": "#/definitions/Anchor",
            "description": "The anchor position for placing the title. One of `\"start\"`, `\"middle\"`, or `\"end\"`. For example, with an orientation of top these anchor positions map to a left-, center-, or right-aligned title.\n\n__Default value:__ `\"middle\"` for [single](spec.html) and [layered](layer.html) views.\n`\"start\"` for other composite views.\n\n__Note:__ [For now](https://github.com/vega/vega-lite/issues/2875), `anchor` is only customizable only for [single](spec.html) and [layered](layer.html) views.  For other composite views, `anchor` is always `\"start\"`."
          },
          "offset": {
            "description": "The orthogonal offset in pixels by which to displace the title from its position along the edge of the chart.",
            "type": "number"
          },
          "orient": {
            "$ref": "#/definitions/TitleOrient",
            "description": "The orientation of the title relative to the chart. One of `\"top\"` (the default), `\"bottom\"`, `\"left\"`, or `\"right\"`."
          },
          "style": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "items": {
                  "type": "string"
                },
                "type": "array"
              }
            ],
            "description": "A [mark style property](config.html#style) to apply to the title text mark.\n\n__Default value:__ `\"group-title\"`."
          },
          "text": {
            "description": "The title text.",
            "type": "string"
          }
        },
        "required": [
          "text"
        ],
        "type": "object"
      },
      "TopLevel<FacetedUnitSpec>": {
        "additionalProperties": false,
        "properties": {
          "$schema": {
            "description": "URL to [JSON schema](http://json-schema.org/) for a Vega-Lite specification. Unless you have a reason to change this, use `https://vega.github.io/schema/vega-lite/v2.json`. Setting the `$schema` property allows automatic validation and autocomplete in editors that support JSON schema.",
            "format": "uri",
            "type": "string"
          },
          "autosize": {
            "anyOf": [
              {
                "$ref": "#/definitions/AutosizeType"
              },
              {
                "$ref": "#/definitions/AutoSizeParams"
              }
            ],
            "description": "Sets how the visualization size should be determined. If a string, should be one of `\"pad\"`, `\"fit\"` or `\"none\"`.\nObject values can additionally specify parameters for content sizing and automatic resizing.\n`\"fit\"` is only supported for single and layered views that don't use `rangeStep`.\n\n__Default value__: `pad`"
          },
          "background": {
            "description": "CSS color property to use as the background of visualization.\n\n__Default value:__ none (transparent)",
            "type": "string"
          },
          "config": {
            "$ref": "#/definitions/Config",
            "description": "Vega-Lite configuration object.  This property can only be defined at the top-level of a specification."
          },
          "data": {
            "$ref": "#/definitions/Data",
            "description": "An object describing the data source"
          },
          "description": {
            "description": "Description of this mark for commenting purpose.",
            "type": "string"
          },
          "encoding": {
            "$ref": "#/definitions/EncodingWithFacet",
            "description": "A key-value mapping between encoding channels and definition of fields."
          },
          "height": {
            "description": "The height of a visualization.\n\n__Default value:__\n- If a view's [`autosize`](size.html#autosize) type is `\"fit\"` or its y-channel has a [continuous scale](scale.html#continuous), the height will be the value of [`config.view.height`](spec.html#config).\n- For y-axis with a band or point scale: if [`rangeStep`](scale.html#band) is a numeric value or unspecified, the height is [determined by the range step, paddings, and the cardinality of the field mapped to y-channel](scale.html#band). Otherwise, if the `rangeStep` is `null`, the height will be the value of [`config.view.height`](spec.html#config).\n- If no field is mapped to `y` channel, the `height` will be the value of `rangeStep`.\n\n__Note__: For plots with [`row` and `column` channels](encoding.html#facet), this represents the height of a single view.\n\n__See also:__ The documentation for [width and height](size.html) contains more examples.",
            "type": "number"
          },
          "mark": {
            "$ref": "#/definitions/AnyMark",
            "description": "A string describing the mark type (one of `\"bar\"`, `\"circle\"`, `\"square\"`, `\"tick\"`, `\"line\"`,\n`\"area\"`, `\"point\"`, `\"rule\"`, and `\"text\"`) or a [mark definition object](mark.html#mark-def)."
          },
          "name": {
            "description": "Name of the visualization for later reference.",
            "type": "string"
          },
          "padding": {
            "$ref": "#/definitions/Padding",
            "description": "The default visualization padding, in pixels, from the edge of the visualization canvas to the data rectangle.  If a number, specifies padding for all sides.\nIf an object, the value should have the format `{\"left\": 5, \"top\": 5, \"right\": 5, \"bottom\": 5}` to specify padding for each side of the visualization.\n\n__Default value__: `5`"
          },
          "selection": {
            "additionalProperties": {
              "$ref": "#/definitions/SelectionDef"
            },
            "description": "A key-value mapping between selection names and definitions.",
            "type": "object"
          },
          "title": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "$ref": "#/definitions/TitleParams"
              }
            ],
            "description": "Title for the plot."
          },
          "transform": {
            "description": "An array of data transformations such as filter and new field calculation.",
            "items": {
              "$ref": "#/definitions/Transform"
            },
            "type": "array"
          },
          "width": {
            "description": "The width of a visualization.\n\n__Default value:__ This will be determined by the following rules:\n\n- If a view's [`autosize`](size.html#autosize) type is `\"fit\"` or its x-channel has a [continuous scale](scale.html#continuous), the width will be the value of [`config.view.width`](spec.html#config).\n- For x-axis with a band or point scale: if [`rangeStep`](scale.html#band) is a numeric value or unspecified, the width is [determined by the range step, paddings, and the cardinality of the field mapped to x-channel](scale.html#band).   Otherwise, if the `rangeStep` is `null`, the width will be the value of [`config.view.width`](spec.html#config).\n- If no field is mapped to `x` channel, the `width` will be the value of [`config.scale.textXRangeStep`](size.html#default-width-and-height) for `text` mark and the value of `rangeStep` for other marks.\n\n__Note:__ For plots with [`row` and `column` channels](encoding.html#facet), this represents the width of a single view.\n\n__See also:__ The documentation for [width and height](size.html) contains more examples.",
            "type": "number"
          }
        },
        "required": [
          "encoding",
          "mark"
        ],
        "type": "object"
      },
      "TopLevel<FacetSpec>": {
        "additionalProperties": false,
        "properties": {
          "$schema": {
            "description": "URL to [JSON schema](http://json-schema.org/) for a Vega-Lite specification. Unless you have a reason to change this, use `https://vega.github.io/schema/vega-lite/v2.json`. Setting the `$schema` property allows automatic validation and autocomplete in editors that support JSON schema.",
            "format": "uri",
            "type": "string"
          },
          "autosize": {
            "anyOf": [
              {
                "$ref": "#/definitions/AutosizeType"
              },
              {
                "$ref": "#/definitions/AutoSizeParams"
              }
            ],
            "description": "Sets how the visualization size should be determined. If a string, should be one of `\"pad\"`, `\"fit\"` or `\"none\"`.\nObject values can additionally specify parameters for content sizing and automatic resizing.\n`\"fit\"` is only supported for single and layered views that don't use `rangeStep`.\n\n__Default value__: `pad`"
          },
          "background": {
            "description": "CSS color property to use as the background of visualization.\n\n__Default value:__ none (transparent)",
            "type": "string"
          },
          "config": {
            "$ref": "#/definitions/Config",
            "description": "Vega-Lite configuration object.  This property can only be defined at the top-level of a specification."
          },
          "data": {
            "$ref": "#/definitions/Data",
            "description": "An object describing the data source"
          },
          "description": {
            "description": "Description of this mark for commenting purpose.",
            "type": "string"
          },
          "facet": {
            "$ref": "#/definitions/FacetMapping",
            "description": "An object that describes mappings between `row` and `column` channels and their field definitions."
          },
          "name": {
            "description": "Name of the visualization for later reference.",
            "type": "string"
          },
          "padding": {
            "$ref": "#/definitions/Padding",
            "description": "The default visualization padding, in pixels, from the edge of the visualization canvas to the data rectangle.  If a number, specifies padding for all sides.\nIf an object, the value should have the format `{\"left\": 5, \"top\": 5, \"right\": 5, \"bottom\": 5}` to specify padding for each side of the visualization.\n\n__Default value__: `5`"
          },
          "resolve": {
            "$ref": "#/definitions/Resolve",
            "description": "Scale, axis, and legend resolutions for facets."
          },
          "spec": {
            "anyOf": [
              {
                "$ref": "#/definitions/LayerSpec"
              },
              {
                "$ref": "#/definitions/CompositeUnitSpec"
              }
            ],
            "description": "A specification of the view that gets faceted."
          },
          "title": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "$ref": "#/definitions/TitleParams"
              }
            ],
            "description": "Title for the plot."
          },
          "transform": {
            "description": "An array of data transformations such as filter and new field calculation.",
            "items": {
              "$ref": "#/definitions/Transform"
            },
            "type": "array"
          }
        },
        "required": [
          "facet",
          "spec"
        ],
        "type": "object"
      },
      "TopLevel<HConcatSpec>": {
        "additionalProperties": false,
        "properties": {
          "$schema": {
            "description": "URL to [JSON schema](http://json-schema.org/) for a Vega-Lite specification. Unless you have a reason to change this, use `https://vega.github.io/schema/vega-lite/v2.json`. Setting the `$schema` property allows automatic validation and autocomplete in editors that support JSON schema.",
            "format": "uri",
            "type": "string"
          },
          "autosize": {
            "anyOf": [
              {
                "$ref": "#/definitions/AutosizeType"
              },
              {
                "$ref": "#/definitions/AutoSizeParams"
              }
            ],
            "description": "Sets how the visualization size should be determined. If a string, should be one of `\"pad\"`, `\"fit\"` or `\"none\"`.\nObject values can additionally specify parameters for content sizing and automatic resizing.\n`\"fit\"` is only supported for single and layered views that don't use `rangeStep`.\n\n__Default value__: `pad`"
          },
          "background": {
            "description": "CSS color property to use as the background of visualization.\n\n__Default value:__ none (transparent)",
            "type": "string"
          },
          "config": {
            "$ref": "#/definitions/Config",
            "description": "Vega-Lite configuration object.  This property can only be defined at the top-level of a specification."
          },
          "data": {
            "$ref": "#/definitions/Data",
            "description": "An object describing the data source"
          },
          "description": {
            "description": "Description of this mark for commenting purpose.",
            "type": "string"
          },
          "hconcat": {
            "description": "A list of views that should be concatenated and put into a row.",
            "items": {
              "$ref": "#/definitions/Spec"
            },
            "type": "array"
          },
          "name": {
            "description": "Name of the visualization for later reference.",
            "type": "string"
          },
          "padding": {
            "$ref": "#/definitions/Padding",
            "description": "The default visualization padding, in pixels, from the edge of the visualization canvas to the data rectangle.  If a number, specifies padding for all sides.\nIf an object, the value should have the format `{\"left\": 5, \"top\": 5, \"right\": 5, \"bottom\": 5}` to specify padding for each side of the visualization.\n\n__Default value__: `5`"
          },
          "resolve": {
            "$ref": "#/definitions/Resolve",
            "description": "Scale, axis, and legend resolutions for horizontally concatenated charts."
          },
          "title": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "$ref": "#/definitions/TitleParams"
              }
            ],
            "description": "Title for the plot."
          },
          "transform": {
            "description": "An array of data transformations such as filter and new field calculation.",
            "items": {
              "$ref": "#/definitions/Transform"
            },
            "type": "array"
          }
        },
        "required": [
          "hconcat"
        ],
        "type": "object"
      },
      "TopLevel<LayerSpec>": {
        "additionalProperties": false,
        "properties": {
          "$schema": {
            "description": "URL to [JSON schema](http://json-schema.org/) for a Vega-Lite specification. Unless you have a reason to change this, use `https://vega.github.io/schema/vega-lite/v2.json`. Setting the `$schema` property allows automatic validation and autocomplete in editors that support JSON schema.",
            "format": "uri",
            "type": "string"
          },
          "autosize": {
            "anyOf": [
              {
                "$ref": "#/definitions/AutosizeType"
              },
              {
                "$ref": "#/definitions/AutoSizeParams"
              }
            ],
            "description": "Sets how the visualization size should be determined. If a string, should be one of `\"pad\"`, `\"fit\"` or `\"none\"`.\nObject values can additionally specify parameters for content sizing and automatic resizing.\n`\"fit\"` is only supported for single and layered views that don't use `rangeStep`.\n\n__Default value__: `pad`"
          },
          "background": {
            "description": "CSS color property to use as the background of visualization.\n\n__Default value:__ none (transparent)",
            "type": "string"
          },
          "config": {
            "$ref": "#/definitions/Config",
            "description": "Vega-Lite configuration object.  This property can only be defined at the top-level of a specification."
          },
          "data": {
            "$ref": "#/definitions/Data",
            "description": "An object describing the data source"
          },
          "description": {
            "description": "Description of this mark for commenting purpose.",
            "type": "string"
          },
          "height": {
            "description": "The height of a visualization.\n\n__Default value:__\n- If a view's [`autosize`](size.html#autosize) type is `\"fit\"` or its y-channel has a [continuous scale](scale.html#continuous), the height will be the value of [`config.view.height`](spec.html#config).\n- For y-axis with a band or point scale: if [`rangeStep`](scale.html#band) is a numeric value or unspecified, the height is [determined by the range step, paddings, and the cardinality of the field mapped to y-channel](scale.html#band). Otherwise, if the `rangeStep` is `null`, the height will be the value of [`config.view.height`](spec.html#config).\n- If no field is mapped to `y` channel, the `height` will be the value of `rangeStep`.\n\n__Note__: For plots with [`row` and `column` channels](encoding.html#facet), this represents the height of a single view.\n\n__See also:__ The documentation for [width and height](size.html) contains more examples.",
            "type": "number"
          },
          "layer": {
            "description": "Layer or single view specifications to be layered.\n\n__Note__: Specifications inside `layer` cannot use `row` and `column` channels as layering facet specifications is not allowed.",
            "items": {
              "anyOf": [
                {
                  "$ref": "#/definitions/LayerSpec"
                },
                {
                  "$ref": "#/definitions/CompositeUnitSpec"
                }
              ]
            },
            "type": "array"
          },
          "name": {
            "description": "Name of the visualization for later reference.",
            "type": "string"
          },
          "padding": {
            "$ref": "#/definitions/Padding",
            "description": "The default visualization padding, in pixels, from the edge of the visualization canvas to the data rectangle.  If a number, specifies padding for all sides.\nIf an object, the value should have the format `{\"left\": 5, \"top\": 5, \"right\": 5, \"bottom\": 5}` to specify padding for each side of the visualization.\n\n__Default value__: `5`"
          },
          "resolve": {
            "$ref": "#/definitions/Resolve",
            "description": "Scale, axis, and legend resolutions for layers."
          },
          "title": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "$ref": "#/definitions/TitleParams"
              }
            ],
            "description": "Title for the plot."
          },
          "transform": {
            "description": "An array of data transformations such as filter and new field calculation.",
            "items": {
              "$ref": "#/definitions/Transform"
            },
            "type": "array"
          },
          "width": {
            "description": "The width of a visualization.\n\n__Default value:__ This will be determined by the following rules:\n\n- If a view's [`autosize`](size.html#autosize) type is `\"fit\"` or its x-channel has a [continuous scale](scale.html#continuous), the width will be the value of [`config.view.width`](spec.html#config).\n- For x-axis with a band or point scale: if [`rangeStep`](scale.html#band) is a numeric value or unspecified, the width is [determined by the range step, paddings, and the cardinality of the field mapped to x-channel](scale.html#band).   Otherwise, if the `rangeStep` is `null`, the width will be the value of [`config.view.width`](spec.html#config).\n- If no field is mapped to `x` channel, the `width` will be the value of [`config.scale.textXRangeStep`](size.html#default-width-and-height) for `text` mark and the value of `rangeStep` for other marks.\n\n__Note:__ For plots with [`row` and `column` channels](encoding.html#facet), this represents the width of a single view.\n\n__See also:__ The documentation for [width and height](size.html) contains more examples.",
            "type": "number"
          }
        },
        "required": [
          "layer"
        ],
        "type": "object"
      },
      "TopLevel<RepeatSpec>": {
        "additionalProperties": false,
        "properties": {
          "$schema": {
            "description": "URL to [JSON schema](http://json-schema.org/) for a Vega-Lite specification. Unless you have a reason to change this, use `https://vega.github.io/schema/vega-lite/v2.json`. Setting the `$schema` property allows automatic validation and autocomplete in editors that support JSON schema.",
            "format": "uri",
            "type": "string"
          },
          "autosize": {
            "anyOf": [
              {
                "$ref": "#/definitions/AutosizeType"
              },
              {
                "$ref": "#/definitions/AutoSizeParams"
              }
            ],
            "description": "Sets how the visualization size should be determined. If a string, should be one of `\"pad\"`, `\"fit\"` or `\"none\"`.\nObject values can additionally specify parameters for content sizing and automatic resizing.\n`\"fit\"` is only supported for single and layered views that don't use `rangeStep`.\n\n__Default value__: `pad`"
          },
          "background": {
            "description": "CSS color property to use as the background of visualization.\n\n__Default value:__ none (transparent)",
            "type": "string"
          },
          "config": {
            "$ref": "#/definitions/Config",
            "description": "Vega-Lite configuration object.  This property can only be defined at the top-level of a specification."
          },
          "data": {
            "$ref": "#/definitions/Data",
            "description": "An object describing the data source"
          },
          "description": {
            "description": "Description of this mark for commenting purpose.",
            "type": "string"
          },
          "name": {
            "description": "Name of the visualization for later reference.",
            "type": "string"
          },
          "padding": {
            "$ref": "#/definitions/Padding",
            "description": "The default visualization padding, in pixels, from the edge of the visualization canvas to the data rectangle.  If a number, specifies padding for all sides.\nIf an object, the value should have the format `{\"left\": 5, \"top\": 5, \"right\": 5, \"bottom\": 5}` to specify padding for each side of the visualization.\n\n__Default value__: `5`"
          },
          "repeat": {
            "$ref": "#/definitions/Repeat",
            "description": "An object that describes what fields should be repeated into views that are laid out as a `row` or `column`."
          },
          "resolve": {
            "$ref": "#/definitions/Resolve",
            "description": "Scale and legend resolutions for repeated charts."
          },
          "spec": {
            "$ref": "#/definitions/Spec"
          },
          "title": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "$ref": "#/definitions/TitleParams"
              }
            ],
            "description": "Title for the plot."
          },
          "transform": {
            "description": "An array of data transformations such as filter and new field calculation.",
            "items": {
              "$ref": "#/definitions/Transform"
            },
            "type": "array"
          }
        },
        "required": [
          "repeat",
          "spec"
        ],
        "type": "object"
      },
      "TopLevel<VConcatSpec>": {
        "additionalProperties": false,
        "properties": {
          "$schema": {
            "description": "URL to [JSON schema](http://json-schema.org/) for a Vega-Lite specification. Unless you have a reason to change this, use `https://vega.github.io/schema/vega-lite/v2.json`. Setting the `$schema` property allows automatic validation and autocomplete in editors that support JSON schema.",
            "format": "uri",
            "type": "string"
          },
          "autosize": {
            "anyOf": [
              {
                "$ref": "#/definitions/AutosizeType"
              },
              {
                "$ref": "#/definitions/AutoSizeParams"
              }
            ],
            "description": "Sets how the visualization size should be determined. If a string, should be one of `\"pad\"`, `\"fit\"` or `\"none\"`.\nObject values can additionally specify parameters for content sizing and automatic resizing.\n`\"fit\"` is only supported for single and layered views that don't use `rangeStep`.\n\n__Default value__: `pad`"
          },
          "background": {
            "description": "CSS color property to use as the background of visualization.\n\n__Default value:__ none (transparent)",
            "type": "string"
          },
          "config": {
            "$ref": "#/definitions/Config",
            "description": "Vega-Lite configuration object.  This property can only be defined at the top-level of a specification."
          },
          "data": {
            "$ref": "#/definitions/Data",
            "description": "An object describing the data source"
          },
          "description": {
            "description": "Description of this mark for commenting purpose.",
            "type": "string"
          },
          "name": {
            "description": "Name of the visualization for later reference.",
            "type": "string"
          },
          "padding": {
            "$ref": "#/definitions/Padding",
            "description": "The default visualization padding, in pixels, from the edge of the visualization canvas to the data rectangle.  If a number, specifies padding for all sides.\nIf an object, the value should have the format `{\"left\": 5, \"top\": 5, \"right\": 5, \"bottom\": 5}` to specify padding for each side of the visualization.\n\n__Default value__: `5`"
          },
          "resolve": {
            "$ref": "#/definitions/Resolve",
            "description": "Scale, axis, and legend resolutions for vertically concatenated charts."
          },
          "title": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "$ref": "#/definitions/TitleParams"
              }
            ],
            "description": "Title for the plot."
          },
          "transform": {
            "description": "An array of data transformations such as filter and new field calculation.",
            "items": {
              "$ref": "#/definitions/Transform"
            },
            "type": "array"
          },
          "vconcat": {
            "description": "A list of views that should be concatenated and put into a column.",
            "items": {
              "$ref": "#/definitions/Spec"
            },
            "type": "array"
          }
        },
        "required": [
          "vconcat"
        ],
        "type": "object"
      },
      "TopLevelExtendedSpec": {
        "anyOf": [
          {
            "$ref": "#/definitions/TopLevel<FacetedUnitSpec>"
          },
          {
            "$ref": "#/definitions/TopLevel<LayerSpec>"
          },
          {
            "$ref": "#/definitions/TopLevel<FacetSpec>"
          },
          {
            "$ref": "#/definitions/TopLevel<RepeatSpec>"
          },
          {
            "$ref": "#/definitions/TopLevel<VConcatSpec>"
          },
          {
            "$ref": "#/definitions/TopLevel<HConcatSpec>"
          }
        ]
      },
      "TopLevelProperties": {
        "additionalProperties": false,
        "properties": {
          "autosize": {
            "anyOf": [
              {
                "$ref": "#/definitions/AutosizeType"
              },
              {
                "$ref": "#/definitions/AutoSizeParams"
              }
            ],
            "description": "Sets how the visualization size should be determined. If a string, should be one of `\"pad\"`, `\"fit\"` or `\"none\"`.\nObject values can additionally specify parameters for content sizing and automatic resizing.\n`\"fit\"` is only supported for single and layered views that don't use `rangeStep`.\n\n__Default value__: `pad`"
          },
          "background": {
            "description": "CSS color property to use as the background of visualization.\n\n__Default value:__ none (transparent)",
            "type": "string"
          },
          "padding": {
            "$ref": "#/definitions/Padding",
            "description": "The default visualization padding, in pixels, from the edge of the visualization canvas to the data rectangle.  If a number, specifies padding for all sides.\nIf an object, the value should have the format `{\"left\": 5, \"top\": 5, \"right\": 5, \"bottom\": 5}` to specify padding for each side of the visualization.\n\n__Default value__: `5`"
          }
        },
        "type": "object"
      },
      "TopoDataFormat": {
        "additionalProperties": false,
        "properties": {
          "feature": {
            "description": "The name of the TopoJSON object set to convert to a GeoJSON feature collection.\nFor example, in a map of the world, there may be an object set named `\"countries\"`.\nUsing the feature property, we can extract this set and generate a GeoJSON feature object for each country.",
            "type": "string"
          },
          "mesh": {
            "description": "The name of the TopoJSON object set to convert to mesh.\nSimilar to the `feature` option, `mesh` extracts a named TopoJSON object set.\n  Unlike the `feature` option, the corresponding geo data is returned as a single, unified mesh instance, not as individual GeoJSON features.\nExtracting a mesh is useful for more efficiently drawing borders or other geographic elements that you do not need to associate with specific regions such as individual countries, states or counties.",
            "type": "string"
          },
          "parse": {
            "anyOf": [
              {
                "enum": [
                  "auto"
                ],
                "type": "string"
              },
              {
                "type": "object"
              }
            ],
            "description": "If set to auto (the default), perform automatic type inference to determine the desired data types.\nAlternatively, a parsing directive object can be provided for explicit data types. Each property of the object corresponds to a field name, and the value to the desired data type (one of `\"number\"`, `\"boolean\"` or `\"date\"`).\nFor example, `\"parse\": {\"modified_on\": \"date\"}` parses the `modified_on` field in each input record a Date value.\n\nFor `\"date\"`, we parse data based using Javascript's [`Date.parse()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse).\nFor Specific date formats can be provided (e.g., `{foo: 'date:\"%m%d%Y\"'}`), using the [d3-time-format syntax](https://github.com/d3/d3-time-format#locale_format). UTC date format parsing is supported similarly (e.g., `{foo: 'utc:\"%m%d%Y\"'}`). See more about [UTC time](timeunit.html#utc)"
          },
          "type": {
            "description": "Type of input data: `\"json\"`, `\"csv\"`, `\"tsv\"`.\nThe default format type is determined by the extension of the file URL.\nIf no extension is detected, `\"json\"` will be used by default.",
            "enum": [
              "topojson"
            ],
            "type": "string"
          }
        },
        "type": "object"
      },
      "Transform": {
        "anyOf": [
          {
            "$ref": "#/definitions/FilterTransform"
          },
          {
            "$ref": "#/definitions/CalculateTransform"
          },
          {
            "$ref": "#/definitions/LookupTransform"
          },
          {
            "$ref": "#/definitions/BinTransform"
          },
          {
            "$ref": "#/definitions/TimeUnitTransform"
          },
          {
            "$ref": "#/definitions/AggregateTransform"
          }
        ]
      },
      "Type": {
        "description": "Constants and utilities for data type  \n Data type based on level of measurement ",
        "enum": [
          "quantitative",
          "ordinal",
          "temporal",
          "nominal"
        ],
        "type": "string"
      },
      "UrlData": {
        "additionalProperties": false,
        "properties": {
          "format": {
            "$ref": "#/definitions/DataFormat",
            "description": "An object that specifies the format for parsing the data file."
          },
          "url": {
            "description": "An URL from which to load the data set. Use the `format.type` property\nto ensure the loaded data is correctly parsed.",
            "type": "string"
          }
        },
        "required": [
          "url"
        ],
        "type": "object"
      },
      "UtcMultiTimeUnit": {
        "enum": [
          "utcyearquarter",
          "utcyearquartermonth",
          "utcyearmonth",
          "utcyearmonthdate",
          "utcyearmonthdatehours",
          "utcyearmonthdatehoursminutes",
          "utcyearmonthdatehoursminutesseconds",
          "utcquartermonth",
          "utcmonthdate",
          "utchoursminutes",
          "utchoursminutesseconds",
          "utcminutesseconds",
          "utcsecondsmilliseconds"
        ],
        "type": "string"
      },
      "UtcSingleTimeUnit": {
        "enum": [
          "utcyear",
          "utcquarter",
          "utcmonth",
          "utcday",
          "utcdate",
          "utchours",
          "utcminutes",
          "utcseconds",
          "utcmilliseconds"
        ],
        "type": "string"
      },
      "VLOnlyConfig": {
        "additionalProperties": false,
        "properties": {
          "countTitle": {
            "description": "Default axis and legend title for count fields.\n\n__Default value:__ `'Number of Records'`.",
            "type": "string"
          },
          "fieldTitle": {
            "description": "Defines how Vega-Lite generates title for fields.  There are three possible styles:\n- `\"verbal\"` (Default) - displays function in a verbal style (e.g., \"Sum of field\", \"Year-month of date\", \"field (binned)\").\n- `\"function\"` - displays function using parentheses and capitalized texts (e.g., \"SUM(field)\", \"YEARMONTH(date)\", \"BIN(field)\").\n- `\"plain\"` - displays only the field name without functions (e.g., \"field\", \"date\", \"field\").",
            "enum": [
              "verbal",
              "functional",
              "plain"
            ],
            "type": "string"
          },
          "invalidValues": {
            "description": "Defines how Vega-Lite should handle invalid values (`null` and `NaN`).\n- If set to `\"filter\"` (default), all data items with null values are filtered.\n- If `null`, all data items are included. In this case, invalid values will be interpreted as zeroes.",
            "enum": [
              "filter"
            ],
            "type": "string"
          },
          "numberFormat": {
            "description": "D3 Number format for axis labels and text tables. For example \"s\" for SI units. Use [D3's number format pattern](https://github.com/d3/d3-format#locale_format).",
            "type": "string"
          },
          "scale": {
            "$ref": "#/definitions/ScaleConfig",
            "description": "Scale configuration determines default properties for all [scales](scale.html). For a full list of scale configuration options, please see the [corresponding section of the scale documentation](scale.html#config)."
          },
          "selection": {
            "$ref": "#/definitions/SelectionConfig",
            "description": "An object hash for defining default properties for each type of selections. "
          },
          "stack": {
            "$ref": "#/definitions/StackOffset",
            "description": "Default stack offset for stackable mark. "
          },
          "timeFormat": {
            "description": "Default datetime format for axis and legend labels. The format can be set directly on each axis and legend. Use [D3's time format pattern](https://github.com/d3/d3-time-format#locale_format).\n\n__Default value:__ `'%b %d, %Y'`.",
            "type": "string"
          },
          "view": {
            "$ref": "#/definitions/ViewConfig",
            "description": "Default properties for [single view plots](spec.html#single). "
          }
        },
        "type": "object"
      },
      "ValueDef": {
        "additionalProperties": false,
        "description": "Definition object for a constant value of an encoding channel.",
        "properties": {
          "value": {
            "description": "A constant value in visual domain (e.g., `\"red\"` / \"#0099ff\" for color, values between `0` to `1` for opacity).",
            "type": [
              "number",
              "string",
              "boolean"
            ]
          }
        },
        "required": [
          "value"
        ],
        "type": "object"
      },
      "MarkPropValueDefWithCondition": {
        "additionalProperties": false,
        "description": "A ValueDef with Condition<ValueDef | FieldDef>\n{\n   condition: {field: ...} | {value: ...},\n   value: ...,\n}",
        "properties": {
          "condition": {
            "anyOf": [
              {
                "$ref": "#/definitions/Conditional<MarkPropFieldDef>"
              },
              {
                "$ref": "#/definitions/Conditional<ValueDef>"
              },
              {
                "items": {
                  "$ref": "#/definitions/Conditional<ValueDef>"
                },
                "type": "array"
              }
            ],
            "description": "A field definition or one or more value definition(s) with a selection predicate."
          },
          "value": {
            "description": "A constant value in visual domain.",
            "type": [
              "number",
              "string",
              "boolean"
            ]
          }
        },
        "type": "object"
      },
      "TextValueDefWithCondition": {
        "additionalProperties": false,
        "description": "A ValueDef with Condition<ValueDef | FieldDef>\n{\n   condition: {field: ...} | {value: ...},\n   value: ...,\n}",
        "properties": {
          "condition": {
            "anyOf": [
              {
                "$ref": "#/definitions/Conditional<TextFieldDef>"
              },
              {
                "$ref": "#/definitions/Conditional<ValueDef>"
              },
              {
                "items": {
                  "$ref": "#/definitions/Conditional<ValueDef>"
                },
                "type": "array"
              }
            ],
            "description": "A field definition or one or more value definition(s) with a selection predicate."
          },
          "value": {
            "description": "A constant value in visual domain.",
            "type": [
              "number",
              "string",
              "boolean"
            ]
          }
        },
        "type": "object"
      },
      "VerticalAlign": {
        "enum": [
          "top",
          "middle",
          "bottom"
        ],
        "type": "string"
      },
      "VgAxisBase": {
        "additionalProperties": false,
        "description": "Base object for Vega's Axis and Axis Config.\nAll of these properties are both properties of Vega's Axis and Axis Config.",
        "properties": {
          "domain": {
            "description": "A boolean flag indicating if the domain (the axis baseline) should be included as part of the axis.\n\n__Default value:__ `true`",
            "type": "boolean"
          },
          "grid": {
            "description": "A boolean flag indicating if grid lines should be included as part of the axis\n\n__Default value:__ `true` for [continuous scales](scale.html#continuous) that are not binned; otherwise, `false`.",
            "type": "boolean"
          },
          "labelAngle": {
            "description": "The rotation angle of the axis labels.\n\n__Default value:__ `-90` for nominal and ordinal fields; `0` otherwise.",
            "maximum": 360,
            "minimum": -360,
            "type": "number"
          },
          "labelBound": {
            "description": "Indicates if labels should be hidden if they exceed the axis range. If `false `(the default) no bounds overlap analysis is performed. If `true`, labels will be hidden if they exceed the axis range by more than 1 pixel. If this property is a number, it specifies the pixel tolerance: the maximum amount by which a label bounding box may exceed the axis range.\n\n__Default value:__ `false`.",
            "type": [
              "boolean",
              "number"
            ]
          },
          "labelFlush": {
            "description": "Indicates if the first and last axis labels should be aligned flush with the scale range. Flush alignment for a horizontal axis will left-align the first label and right-align the last label. For vertical axes, bottom and top text baselines are applied instead. If this property is a number, it also indicates the number of pixels by which to offset the first and last labels; for example, a value of 2 will flush-align the first and last labels and also push them 2 pixels outward from the center of the axis. The additional adjustment can sometimes help the labels better visually group with corresponding axis ticks.\n\n__Default value:__ `true` for axis of a continuous x-scale. Otherwise, `false`.",
            "type": [
              "boolean",
              "number"
            ]
          },
          "labelOverlap": {
            "anyOf": [
              {
                "type": "boolean"
              },
              {
                "enum": [
                  "parity"
                ],
                "type": "string"
              },
              {
                "enum": [
                  "greedy"
                ],
                "type": "string"
              }
            ],
            "description": "The strategy to use for resolving overlap of axis labels. If `false` (the default), no overlap reduction is attempted. If set to `true` or `\"parity\"`, a strategy of removing every other label is used (this works well for standard linear axes). If set to `\"greedy\"`, a linear scan of the labels is performed, removing any labels that overlaps with the last visible label (this often works better for log-scaled axes).\n\n__Default value:__ `true` for non-nominal fields with non-log scales; `\"greedy\"` for log scales; otherwise `false`."
          },
          "labelPadding": {
            "description": "The padding, in pixels, between axis and text labels.",
            "type": "number"
          },
          "labels": {
            "description": "A boolean flag indicating if labels should be included as part of the axis.\n\n__Default value:__  `true`.",
            "type": "boolean"
          },
          "maxExtent": {
            "description": "The maximum extent in pixels that axis ticks and labels should use. This determines a maximum offset value for axis titles.\n\n__Default value:__ `undefined`.",
            "type": "number"
          },
          "minExtent": {
            "description": "The minimum extent in pixels that axis ticks and labels should use. This determines a minimum offset value for axis titles.\n\n__Default value:__ `30` for y-axis; `undefined` for x-axis.",
            "type": "number"
          },
          "tickSize": {
            "description": "The size in pixels of axis ticks.",
            "minimum": 0,
            "type": "number"
          },
          "ticks": {
            "description": "Boolean value that determines whether the axis should include ticks.",
            "type": "boolean"
          },
          "titleMaxLength": {
            "description": "Max length for axis title if the title is automatically generated from the field's description.",
            "type": "number"
          },
          "titlePadding": {
            "description": "The padding, in pixels, between title and axis.",
            "type": "number"
          }
        },
        "type": "object"
      },
      "VgAxisConfig": {
        "additionalProperties": false,
        "properties": {
          "bandPosition": {
            "description": "An interpolation fraction indicating where, for `band` scales, axis ticks should be positioned. A value of `0` places ticks at the left edge of their bands. A value of `0.5` places ticks in the middle of their bands.",
            "type": "number"
          },
          "domain": {
            "description": "A boolean flag indicating if the domain (the axis baseline) should be included as part of the axis.\n\n__Default value:__ `true`",
            "type": "boolean"
          },
          "domainColor": {
            "description": "Color of axis domain line.\n\n__Default value:__  (none, using Vega default).",
            "type": "string"
          },
          "domainWidth": {
            "description": "Stroke width of axis domain line\n\n__Default value:__  (none, using Vega default).",
            "type": "number"
          },
          "grid": {
            "description": "A boolean flag indicating if grid lines should be included as part of the axis\n\n__Default value:__ `true` for [continuous scales](scale.html#continuous) that are not binned; otherwise, `false`.",
            "type": "boolean"
          },
          "gridColor": {
            "description": "Color of gridlines.",
            "type": "string"
          },
          "gridDash": {
            "description": "The offset (in pixels) into which to begin drawing with the grid dash array.",
            "items": {
              "type": "number"
            },
            "type": "array"
          },
          "gridOpacity": {
            "description": "The stroke opacity of grid (value between [0,1])\n\n__Default value:__ (`1` by default)",
            "maximum": 1,
            "minimum": 0,
            "type": "number"
          },
          "gridWidth": {
            "description": "The grid width, in pixels.",
            "minimum": 0,
            "type": "number"
          },
          "labelAngle": {
            "description": "The rotation angle of the axis labels.\n\n__Default value:__ `-90` for nominal and ordinal fields; `0` otherwise.",
            "maximum": 360,
            "minimum": -360,
            "type": "number"
          },
          "labelBound": {
            "description": "Indicates if labels should be hidden if they exceed the axis range. If `false `(the default) no bounds overlap analysis is performed. If `true`, labels will be hidden if they exceed the axis range by more than 1 pixel. If this property is a number, it specifies the pixel tolerance: the maximum amount by which a label bounding box may exceed the axis range.\n\n__Default value:__ `false`.",
            "type": [
              "boolean",
              "number"
            ]
          },
          "labelColor": {
            "description": "The color of the tick label, can be in hex color code or regular color name.",
            "type": "string"
          },
          "labelFlush": {
            "description": "Indicates if the first and last axis labels should be aligned flush with the scale range. Flush alignment for a horizontal axis will left-align the first label and right-align the last label. For vertical axes, bottom and top text baselines are applied instead. If this property is a number, it also indicates the number of pixels by which to offset the first and last labels; for example, a value of 2 will flush-align the first and last labels and also push them 2 pixels outward from the center of the axis. The additional adjustment can sometimes help the labels better visually group with corresponding axis ticks.\n\n__Default value:__ `true` for axis of a continuous x-scale. Otherwise, `false`.",
            "type": [
              "boolean",
              "number"
            ]
          },
          "labelFont": {
            "description": "The font of the tick label.",
            "type": "string"
          },
          "labelFontSize": {
            "description": "The font size of the label, in pixels.",
            "minimum": 0,
            "type": "number"
          },
          "labelLimit": {
            "description": "Maximum allowed pixel width of axis tick labels.",
            "type": "number"
          },
          "labelOverlap": {
            "anyOf": [
              {
                "type": "boolean"
              },
              {
                "enum": [
                  "parity"
                ],
                "type": "string"
              },
              {
                "enum": [
                  "greedy"
                ],
                "type": "string"
              }
            ],
            "description": "The strategy to use for resolving overlap of axis labels. If `false` (the default), no overlap reduction is attempted. If set to `true` or `\"parity\"`, a strategy of removing every other label is used (this works well for standard linear axes). If set to `\"greedy\"`, a linear scan of the labels is performed, removing any labels that overlaps with the last visible label (this often works better for log-scaled axes).\n\n__Default value:__ `true` for non-nominal fields with non-log scales; `\"greedy\"` for log scales; otherwise `false`."
          },
          "labelPadding": {
            "description": "The padding, in pixels, between axis and text labels.",
            "type": "number"
          },
          "labels": {
            "description": "A boolean flag indicating if labels should be included as part of the axis.\n\n__Default value:__  `true`.",
            "type": "boolean"
          },
          "maxExtent": {
            "description": "The maximum extent in pixels that axis ticks and labels should use. This determines a maximum offset value for axis titles.\n\n__Default value:__ `undefined`.",
            "type": "number"
          },
          "minExtent": {
            "description": "The minimum extent in pixels that axis ticks and labels should use. This determines a minimum offset value for axis titles.\n\n__Default value:__ `30` for y-axis; `undefined` for x-axis.",
            "type": "number"
          },
          "tickColor": {
            "description": "The color of the axis's tick.",
            "type": "string"
          },
          "tickRound": {
            "description": "Boolean flag indicating if pixel position values should be rounded to the nearest integer.",
            "type": "boolean"
          },
          "tickSize": {
            "description": "The size in pixels of axis ticks.",
            "minimum": 0,
            "type": "number"
          },
          "tickWidth": {
            "description": "The width, in pixels, of ticks.",
            "minimum": 0,
            "type": "number"
          },
          "ticks": {
            "description": "Boolean value that determines whether the axis should include ticks.",
            "type": "boolean"
          },
          "titleAlign": {
            "description": "Horizontal text alignment of axis titles.",
            "type": "string"
          },
          "titleAngle": {
            "description": "Angle in degrees of axis titles.",
            "type": "number"
          },
          "titleBaseline": {
            "description": "Vertical text baseline for axis titles.",
            "type": "string"
          },
          "titleColor": {
            "description": "Color of the title, can be in hex color code or regular color name.",
            "type": "string"
          },
          "titleFont": {
            "description": "Font of the title. (e.g., `\"Helvetica Neue\"`).",
            "type": "string"
          },
          "titleFontSize": {
            "description": "Font size of the title.",
            "minimum": 0,
            "type": "number"
          },
          "titleFontWeight": {
            "description": "Font weight of the title. (e.g., `\"bold\"`).",
            "type": [
              "string",
              "number"
            ]
          },
          "titleLimit": {
            "description": "Maximum allowed pixel width of axis titles.",
            "type": "number"
          },
          "titleMaxLength": {
            "description": "Max length for axis title if the title is automatically generated from the field's description.",
            "type": "number"
          },
          "titlePadding": {
            "description": "The padding, in pixels, between title and axis.",
            "type": "number"
          },
          "titleX": {
            "description": "X-coordinate of the axis title relative to the axis group.",
            "type": "number"
          },
          "titleY": {
            "description": "Y-coordinate of the axis title relative to the axis group.",
            "type": "number"
          }
        },
        "type": "object"
      },
      "VgBinding": {
        "anyOf": [
          {
            "$ref": "#/definitions/VgCheckboxBinding"
          },
          {
            "$ref": "#/definitions/VgRadioBinding"
          },
          {
            "$ref": "#/definitions/VgSelectBinding"
          },
          {
            "$ref": "#/definitions/VgRangeBinding"
          },
          {
            "$ref": "#/definitions/VgGenericBinding"
          }
        ]
      },
      "VgCheckboxBinding": {
        "additionalProperties": false,
        "properties": {
          "element": {
            "type": "string"
          },
          "input": {
            "enum": [
              "checkbox"
            ],
            "type": "string"
          }
        },
        "required": [
          "input"
        ],
        "type": "object"
      },
      "VgEventStream": {
      },
      "VgGenericBinding": {
        "additionalProperties": false,
        "properties": {
          "element": {
            "type": "string"
          },
          "input": {
            "type": "string"
          }
        },
        "required": [
          "input"
        ],
        "type": "object"
      },
      "VgLegendBase": {
        "additionalProperties": false,
        "properties": {
          "entryPadding": {
            "description": "Padding (in pixels) between legend entries in a symbol legend.",
            "type": "number"
          },
          "offset": {
            "description": "The offset, in pixels, by which to displace the legend from the edge of the enclosing group or data rectangle.\n\n__Default value:__  `0`",
            "type": "number"
          },
          "orient": {
            "$ref": "#/definitions/LegendOrient",
            "description": "The orientation of the legend, which determines how the legend is positioned within the scene. One of \"left\", \"right\", \"top-left\", \"top-right\", \"bottom-left\", \"bottom-right\", \"none\".\n\n__Default value:__ `\"right\"`"
          },
          "padding": {
            "description": "The padding, in pixels, between the legend and axis.",
            "type": "number"
          }
        },
        "type": "object"
      },
      "VgLegendConfig": {
        "additionalProperties": false,
        "properties": {
          "cornerRadius": {
            "description": "Corner radius for the full legend.",
            "type": "number"
          },
          "entryPadding": {
            "description": "Padding (in pixels) between legend entries in a symbol legend.",
            "type": "number"
          },
          "fillColor": {
            "description": "Background fill color for the full legend.",
            "type": "string"
          },
          "gradientHeight": {
            "description": "The height of the gradient, in pixels.",
            "minimum": 0,
            "type": "number"
          },
          "gradientLabelBaseline": {
            "description": "Text baseline for color ramp gradient labels.",
            "type": "string"
          },
          "gradientLabelLimit": {
            "description": "The maximum allowed length in pixels of color ramp gradient labels.",
            "type": "number"
          },
          "gradientLabelOffset": {
            "description": "Vertical offset in pixels for color ramp gradient labels.",
            "type": "number"
          },
          "gradientStrokeColor": {
            "description": "The color of the gradient stroke, can be in hex color code or regular color name.",
            "type": "string"
          },
          "gradientStrokeWidth": {
            "description": "The width of the gradient stroke, in pixels.",
            "minimum": 0,
            "type": "number"
          },
          "gradientWidth": {
            "description": "The width of the gradient, in pixels.",
            "minimum": 0,
            "type": "number"
          },
          "labelAlign": {
            "description": "The alignment of the legend label, can be left, middle or right.",
            "type": "string"
          },
          "labelBaseline": {
            "description": "The position of the baseline of legend label, can be top, middle or bottom.",
            "type": "string"
          },
          "labelColor": {
            "description": "The color of the legend label, can be in hex color code or regular color name.",
            "type": "string"
          },
          "labelFont": {
            "description": "The font of the legend label.",
            "type": "string"
          },
          "labelFontSize": {
            "description": "The font size of legend label.\n\n__Default value:__ `10`.",
            "minimum": 0,
            "type": "number"
          },
          "labelLimit": {
            "description": "Maximum allowed pixel width of axis tick labels.",
            "type": "number"
          },
          "labelOffset": {
            "description": "The offset of the legend label.",
            "minimum": 0,
            "type": "number"
          },
          "offset": {
            "description": "The offset, in pixels, by which to displace the legend from the edge of the enclosing group or data rectangle.\n\n__Default value:__  `0`",
            "type": "number"
          },
          "orient": {
            "$ref": "#/definitions/LegendOrient",
            "description": "The orientation of the legend, which determines how the legend is positioned within the scene. One of \"left\", \"right\", \"top-left\", \"top-right\", \"bottom-left\", \"bottom-right\", \"none\".\n\n__Default value:__ `\"right\"`"
          },
          "padding": {
            "description": "The padding, in pixels, between the legend and axis.",
            "type": "number"
          },
          "strokeColor": {
            "description": "Border stroke color for the full legend.",
            "type": "string"
          },
          "strokeDash": {
            "description": "Border stroke dash pattern for the full legend.",
            "items": {
              "type": "number"
            },
            "type": "array"
          },
          "strokeWidth": {
            "description": "Border stroke width for the full legend.",
            "type": "number"
          },
          "symbolColor": {
            "description": "The color of the legend symbol,",
            "type": "string"
          },
          "symbolSize": {
            "description": "The size of the legend symbol, in pixels.",
            "minimum": 0,
            "type": "number"
          },
          "symbolStrokeWidth": {
            "description": "The width of the symbol's stroke.",
            "minimum": 0,
            "type": "number"
          },
          "symbolType": {
            "description": "Default shape type (such as \"circle\") for legend symbols.",
            "type": "string"
          },
          "titleAlign": {
            "description": "Horizontal text alignment for legend titles.",
            "type": "string"
          },
          "titleBaseline": {
            "description": "Vertical text baseline for legend titles.",
            "type": "string"
          },
          "titleColor": {
            "description": "The color of the legend title, can be in hex color code or regular color name.",
            "type": "string"
          },
          "titleFont": {
            "description": "The font of the legend title.",
            "type": "string"
          },
          "titleFontSize": {
            "description": "The font size of the legend title.",
            "type": "number"
          },
          "titleFontWeight": {
            "description": "The font weight of the legend title.",
            "type": [
              "string",
              "number"
            ]
          },
          "titleLimit": {
            "description": "Maximum allowed pixel width of axis titles.",
            "type": "number"
          },
          "titlePadding": {
            "description": "The padding, in pixels, between title and legend.",
            "type": "number"
          }
        },
        "type": "object"
      },
      "VgMarkConfig": {
        "additionalProperties": false,
        "properties": {
          "align": {
            "$ref": "#/definitions/HorizontalAlign",
            "description": "The horizontal alignment of the text. One of `\"left\"`, `\"right\"`, `\"center\"`."
          },
          "angle": {
            "description": "The rotation angle of the text, in degrees.",
            "maximum": 360,
            "minimum": 0,
            "type": "number"
          },
          "baseline": {
            "$ref": "#/definitions/VerticalAlign",
            "description": "The vertical alignment of the text. One of `\"top\"`, `\"middle\"`, `\"bottom\"`.\n\n__Default value:__ `\"middle\"`"
          },
          "dx": {
            "description": "The horizontal offset, in pixels, between the text label and its anchor point. The offset is applied after rotation by the _angle_ property.",
            "type": "number"
          },
          "dy": {
            "description": "The vertical offset, in pixels, between the text label and its anchor point. The offset is applied after rotation by the _angle_ property.",
            "type": "number"
          },
          "fill": {
            "description": "Default Fill Color.  This has higher precedence than config.color\n\n__Default value:__ (None)",
            "type": "string"
          },
          "fillOpacity": {
            "description": "The fill opacity (value between [0,1]).\n\n__Default value:__ `1`",
            "maximum": 1,
            "minimum": 0,
            "type": "number"
          },
          "font": {
            "description": "The typeface to set the text in (e.g., `\"Helvetica Neue\"`).",
            "type": "string"
          },
          "fontSize": {
            "description": "The font size, in pixels.",
            "minimum": 0,
            "type": "number"
          },
          "fontStyle": {
            "$ref": "#/definitions/FontStyle",
            "description": "The font style (e.g., `\"italic\"`)."
          },
          "fontWeight": {
            "anyOf": [
              {
                "$ref": "#/definitions/FontWeight"
              },
              {
                "$ref": "#/definitions/FontWeightNumber"
              }
            ],
            "description": "The font weight (e.g., `\"bold\"`)."
          },
          "interpolate": {
            "$ref": "#/definitions/Interpolate",
            "description": "The line interpolation method to use for line and area marks. One of the following:\n- `\"linear\"`: piecewise linear segments, as in a polyline.\n- `\"linear-closed\"`: close the linear segments to form a polygon.\n- `\"step\"`: alternate between horizontal and vertical segments, as in a step function.\n- `\"step-before\"`: alternate between vertical and horizontal segments, as in a step function.\n- `\"step-after\"`: alternate between horizontal and vertical segments, as in a step function.\n- `\"basis\"`: a B-spline, with control point duplication on the ends.\n- `\"basis-open\"`: an open B-spline; may not intersect the start or end.\n- `\"basis-closed\"`: a closed B-spline, as in a loop.\n- `\"cardinal\"`: a Cardinal spline, with control point duplication on the ends.\n- `\"cardinal-open\"`: an open Cardinal spline; may not intersect the start or end, but will intersect other control points.\n- `\"cardinal-closed\"`: a closed Cardinal spline, as in a loop.\n- `\"bundle\"`: equivalent to basis, except the tension parameter is used to straighten the spline.\n- `\"monotone\"`: cubic interpolation that preserves monotonicity in y."
          },
          "limit": {
            "description": "The maximum length of the text mark in pixels (default 0, indicating no limit). The text value will be automatically truncated if the rendered size exceeds the limit.",
            "type": "number"
          },
          "opacity": {
            "description": "The overall opacity (value between [0,1]).\n\n__Default value:__ `0.7` for non-aggregate plots with `point`, `tick`, `circle`, or `square` marks or layered `bar` charts and `1` otherwise.",
            "maximum": 1,
            "minimum": 0,
            "type": "number"
          },
          "orient": {
            "$ref": "#/definitions/Orient",
            "description": "The orientation of a non-stacked bar, tick, area, and line charts.\nThe value is either horizontal (default) or vertical.\n- For bar, rule and tick, this determines whether the size of the bar and tick\nshould be applied to x or y dimension.\n- For area, this property determines the orient property of the Vega output.\n- For line, this property determines the sort order of the points in the line\nif `config.sortLineBy` is not specified.\nFor stacked charts, this is always determined by the orientation of the stack;\ntherefore explicitly specified value will be ignored."
          },
          "radius": {
            "description": "Polar coordinate radial offset, in pixels, of the text label from the origin determined by the `x` and `y` properties.",
            "minimum": 0,
            "type": "number"
          },
          "shape": {
            "description": "The default symbol shape to use. One of: `\"circle\"` (default), `\"square\"`, `\"cross\"`, `\"diamond\"`, `\"triangle-up\"`, or `\"triangle-down\"`, or a custom SVG path.\n\n__Default value:__ `\"circle\"`",
            "type": "string"
          },
          "size": {
            "description": "The pixel area each the point/circle/square.\nFor example: in the case of circles, the radius is determined in part by the square root of the size value.\n\n__Default value:__ `30`",
            "minimum": 0,
            "type": "number"
          },
          "stroke": {
            "description": "Default Stroke Color.  This has higher precedence than config.color\n\n__Default value:__ (None)",
            "type": "string"
          },
          "strokeDash": {
            "description": "An array of alternating stroke, space lengths for creating dashed or dotted lines.",
            "items": {
              "type": "number"
            },
            "type": "array"
          },
          "strokeDashOffset": {
            "description": "The offset (in pixels) into which to begin drawing with the stroke dash array.",
            "type": "number"
          },
          "strokeOpacity": {
            "description": "The stroke opacity (value between [0,1]).\n\n__Default value:__ `1`",
            "maximum": 1,
            "minimum": 0,
            "type": "number"
          },
          "strokeWidth": {
            "description": "The stroke width, in pixels.",
            "minimum": 0,
            "type": "number"
          },
          "tension": {
            "description": "Depending on the interpolation type, sets the tension parameter (for line and area marks).",
            "maximum": 1,
            "minimum": 0,
            "type": "number"
          },
          "text": {
            "description": "Placeholder text if the `text` channel is not specified",
            "type": "string"
          },
          "theta": {
            "description": "Polar coordinate angle, in radians, of the text label from the origin determined by the `x` and `y` properties. Values for `theta` follow the same convention of `arc` mark `startAngle` and `endAngle` properties: angles are measured in radians, with `0` indicating \"north\".",
            "type": "number"
          }
        },
        "type": "object"
      },
      "VgRadioBinding": {
        "additionalProperties": false,
        "properties": {
          "element": {
            "type": "string"
          },
          "input": {
            "enum": [
              "radio"
            ],
            "type": "string"
          },
          "options": {
            "items": {
              "type": "string"
            },
            "type": "array"
          }
        },
        "required": [
          "input",
          "options"
        ],
        "type": "object"
      },
      "VgRangeBinding": {
        "additionalProperties": false,
        "properties": {
          "element": {
            "type": "string"
          },
          "input": {
            "enum": [
              "range"
            ],
            "type": "string"
          },
          "max": {
            "type": "number"
          },
          "min": {
            "type": "number"
          },
          "step": {
            "type": "number"
          }
        },
        "required": [
          "input"
        ],
        "type": "object"
      },
      "VgScheme": {
        "additionalProperties": false,
        "properties": {
          "count": {
            "type": "number"
          },
          "extent": {
            "items": {
              "type": "number"
            },
            "type": "array"
          },
          "scheme": {
            "type": "string"
          }
        },
        "required": [
          "scheme"
        ],
        "type": "object"
      },
      "VgSelectBinding": {
        "additionalProperties": false,
        "properties": {
          "element": {
            "type": "string"
          },
          "input": {
            "enum": [
              "select"
            ],
            "type": "string"
          },
          "options": {
            "items": {
              "type": "string"
            },
            "type": "array"
          }
        },
        "required": [
          "input",
          "options"
        ],
        "type": "object"
      },
      "VgTitleConfig": {
        "additionalProperties": false,
        "properties": {
          "anchor": {
            "$ref": "#/definitions/Anchor",
            "description": "The anchor position for placing the title. One of `\"start\"`, `\"middle\"`, or `\"end\"`. For example, with an orientation of top these anchor positions map to a left-, center-, or right-aligned title.\n\n__Default value:__ `\"middle\"` for [single](spec.html) and [layered](layer.html) views.\n`\"start\"` for other composite views.\n\n__Note:__ [For now](https://github.com/vega/vega-lite/issues/2875), `anchor` is only customizable only for [single](spec.html) and [layered](layer.html) views.  For other composite views, `anchor` is always `\"start\"`."
          },
          "angle": {
            "description": "Angle in degrees of title text.",
            "type": "number"
          },
          "baseline": {
            "$ref": "#/definitions/VerticalAlign",
            "description": "Vertical text baseline for title text."
          },
          "color": {
            "description": "Text color for title text.",
            "type": "string"
          },
          "font": {
            "description": "Font name for title text.",
            "type": "string"
          },
          "fontSize": {
            "description": "Font size in pixels for title text.\n\n__Default value:__ `10`.",
            "minimum": 0,
            "type": "number"
          },
          "fontWeight": {
            "anyOf": [
              {
                "$ref": "#/definitions/FontWeight"
              },
              {
                "$ref": "#/definitions/FontWeightNumber"
              }
            ],
            "description": "Font weight for title text."
          },
          "limit": {
            "description": "The maximum allowed length in pixels of legend labels.",
            "minimum": 0,
            "type": "number"
          },
          "offset": {
            "description": "Offset in pixels of the title from the chart body and axes.",
            "type": "number"
          },
          "orient": {
            "$ref": "#/definitions/TitleOrient",
            "description": "Default title orientation (\"top\", \"bottom\", \"left\", or \"right\")"
          }
        },
        "type": "object"
      },
      "ViewConfig": {
        "additionalProperties": false,
        "properties": {
          "clip": {
            "description": "Whether the view should be clipped.",
            "type": "boolean"
          },
          "fill": {
            "description": "The fill color.\n\n__Default value:__ (none)",
            "type": "string"
          },
          "fillOpacity": {
            "description": "The fill opacity (value between [0,1]).\n\n__Default value:__ (none)",
            "type": "number"
          },
          "height": {
            "description": "The default height of the single plot or each plot in a trellis plot when the visualization has a continuous (non-ordinal) y-scale with `rangeStep` = `null`.\n\n__Default value:__ `200`",
            "type": "number"
          },
          "stroke": {
            "description": "The stroke color.\n\n__Default value:__ (none)",
            "type": "string"
          },
          "strokeDash": {
            "description": "An array of alternating stroke, space lengths for creating dashed or dotted lines.\n\n__Default value:__ (none)",
            "items": {
              "type": "number"
            },
            "type": "array"
          },
          "strokeDashOffset": {
            "description": "The offset (in pixels) into which to begin drawing with the stroke dash array.\n\n__Default value:__ (none)",
            "type": "number"
          },
          "strokeOpacity": {
            "description": "The stroke opacity (value between [0,1]).\n\n__Default value:__ (none)",
            "type": "number"
          },
          "strokeWidth": {
            "description": "The stroke width, in pixels.\n\n__Default value:__ (none)",
            "type": "number"
          },
          "width": {
            "description": "The default width of the single plot or each plot in a trellis plot when the visualization has a continuous (non-ordinal) x-scale or ordinal x-scale with `rangeStep` = `null`.\n\n__Default value:__ `200`",
            "type": "number"
          }
        },
        "type": "object"
      },
      "VlOnlyGuideConfig": {
        "additionalProperties": false,
        "properties": {
          "shortTimeLabels": {
            "description": "Whether month names and weekday names should be abbreviated.\n\n__Default value:__  `false`",
            "type": "boolean"
          }
        },
        "type": "object"
      }
    }
  };
})(window.PolymerVis = window.PolymerVis || {});
