var webglDebugger = {
  frames: [[]],
  webglObjects: {},
  webglObjectIdCounter: 1,
  currentFrame: 0,
  maxFramesToRecord: 1000,
  recordFunction: function(functionOverloadId, functionName, args) {
    if (this.currentFrame > this.maxFramesToRecord) return;
    this.frames[this.currentFrame].push({
      functionOverloadId: functionOverloadId,
      functionName: functionName,
      args: args
    });
  },

  recordFunctionReturn: function(returnValue) {
    if (this.currentFrame > this.maxFramesToRecord) return;
    var currentFrame = this.frames[this.currentFrame];
    currentFrame[currentFrame.length-1].returnValue = returnValue;
  },

  recordCreateFunctionReturn: function(returnValue) {
    if (this.currentFrame > this.maxFramesToRecord) return;
    this.recordFunctionReturn(returnValue);
    if (returnValue) {
      this.webglObjects[this.webglObjectIdCounter] = returnValue;
      returnValue['wgld_objectId'] = this.webglObjectIdCounter++;
    }
  },

  populateFrameNumber: function(frameNum) {
    if (frameNum > this.maxFramesToRecord) return;
    if (this.debuggerWindow) {
      var doc = this.debuggerWindow.document;
      var frameNumber = doc.getElementById('frameNumber');
      var el = doc.createElement('option');
      el.text = frameNum;
      el.value = frameNum;
      frameNumber.add(el);
    }
  },

  frameStart: function() {
    if (this.currentFrame > this.maxFramesToRecord) return;
    this.frames[++this.currentFrame] = [];
    this.populateFrameNumber(this.currentFrame);
  },

  frameEnd: function() {
  },

webGLEnums: {
  768: 'SRC_COLOR <span class=hex>(0x300)</span>', 769: 'ONE_MINUS_SRC_COLOR <span class=hex>(0x301)</span>', 770: 'SRC_ALPHA <span class=hex>(0x302)</span>', 771: 'ONE_MINUS_SRC_ALPHA <span class=hex>(0x303)</span>', 772: 'DST_ALPHA <span class=hex>(0x304)</span>', 773: 'ONE_MINUS_DST_ALPHA <span class=hex>(0x305)</span>', 774: 'DST_COLOR <span class=hex>(0x306)</span>', 775: 'ONE_MINUS_DST_COLOR <span class=hex>(0x307)</span>', 776: 'SRC_ALPHA_SATURATE <span class=hex>(0x308)</span>', 32774: 'FUNC_ADD <span class=hex>(0x8006)</span>', 32777: 'BLEND_EQUATION_RGB <span class=hex>(0x8009)</span>', 34877: 'BLEND_EQUATION_ALPHA <span class=hex>(0x883d)</span>', 32778: 'FUNC_SUBTRACT <span class=hex>(0x800a)</span>', 32779: 'FUNC_REVERSE_SUBTRACT <span class=hex>(0x800b)</span>', 32968: 'BLEND_DST_RGB <span class=hex>(0x80c8)</span>', 32969: 'BLEND_SRC_RGB <span class=hex>(0x80c9)</span>', 32970: 'BLEND_DST_ALPHA <span class=hex>(0x80ca)</span>', 32971: 'BLEND_SRC_ALPHA <span class=hex>(0x80cb)</span>', 32769: 'CONSTANT_COLOR <span class=hex>(0x8001)</span>', 32770: 'ONE_MINUS_CONSTANT_COLOR <span class=hex>(0x8002)</span>', 32771: 'CONSTANT_ALPHA <span class=hex>(0x8003)</span>', 32772: 'ONE_MINUS_CONSTANT_ALPHA <span class=hex>(0x8004)</span>', 32773: 'BLEND_COLOR <span class=hex>(0x8005)</span>', 34962: 'ARRAY_BUFFER <span class=hex>(0x8892)</span>', 34963: 'ELEMENT_ARRAY_BUFFER <span class=hex>(0x8893)</span>', 34964: 'ARRAY_BUFFER_BINDING <span class=hex>(0x8894)</span>', 34965: 'ELEMENT_ARRAY_BUFFER_BINDING <span class=hex>(0x8895)</span>', 35040: 'STREAM_DRAW <span class=hex>(0x88e0)</span>', 35044: 'STATIC_DRAW <span class=hex>(0x88e4)</span>', 35048: 'DYNAMIC_DRAW <span class=hex>(0x88e8)</span>', 34660: 'BUFFER_SIZE <span class=hex>(0x8764)</span>', 34661: 'BUFFER_USAGE <span class=hex>(0x8765)</span>', 34342: 'CURRENT_VERTEX_ATTRIB <span class=hex>(0x8626)</span>', 1028: 'FRONT <span class=hex>(0x404)</span>', 1029: 'BACK <span class=hex>(0x405)</span>', 1032: 'FRONT_AND_BACK <span class=hex>(0x408)</span>', 2884: 'CULL_FACE <span class=hex>(0xb44)</span>', 3042: 'BLEND <span class=hex>(0xbe2)</span>', 3024: 'DITHER <span class=hex>(0xbd0)</span>', 2960: 'STENCIL_TEST <span class=hex>(0xb90)</span>', 2929: 'DEPTH_TEST <span class=hex>(0xb71)</span>', 3089: 'SCISSOR_TEST <span class=hex>(0xc11)</span>', 32823: 'POLYGON_OFFSET_FILL <span class=hex>(0x8037)</span>', 32926: 'SAMPLE_ALPHA_TO_COVERAGE <span class=hex>(0x809e)</span>', 32928: 'SAMPLE_COVERAGE <span class=hex>(0x80a0)</span>', 1280: 'INVALID_ENUM <span class=hex>(0x500)</span>', 1281: 'INVALID_VALUE <span class=hex>(0x501)</span>', 1282: 'INVALID_OPERATION <span class=hex>(0x502)</span>', 1285: 'OUT_OF_MEMORY <span class=hex>(0x505)</span>', 2304: 'CW <span class=hex>(0x900)</span>', 2305: 'CCW <span class=hex>(0x901)</span>', 2849: 'LINE_WIDTH <span class=hex>(0xb21)</span>', 33901: 'ALIASED_POINT_SIZE_RANGE <span class=hex>(0x846d)</span>', 33902: 'ALIASED_LINE_WIDTH_RANGE <span class=hex>(0x846e)</span>', 2885: 'CULL_FACE_MODE <span class=hex>(0xb45)</span>', 2886: 'FRONT_FACE <span class=hex>(0xb46)</span>', 2928: 'DEPTH_RANGE <span class=hex>(0xb70)</span>', 2930: 'DEPTH_WRITEMASK <span class=hex>(0xb72)</span>', 2931: 'DEPTH_CLEAR_VALUE <span class=hex>(0xb73)</span>', 2932: 'DEPTH_FUNC <span class=hex>(0xb74)</span>', 2961: 'STENCIL_CLEAR_VALUE <span class=hex>(0xb91)</span>', 2962: 'STENCIL_FUNC <span class=hex>(0xb92)</span>', 2964: 'STENCIL_FAIL <span class=hex>(0xb94)</span>', 2965: 'STENCIL_PASS_DEPTH_FAIL <span class=hex>(0xb95)</span>', 2966: 'STENCIL_PASS_DEPTH_PASS <span class=hex>(0xb96)</span>', 2967: 'STENCIL_REF <span class=hex>(0xb97)</span>', 2963: 'STENCIL_VALUE_MASK <span class=hex>(0xb93)</span>', 2968: 'STENCIL_WRITEMASK <span class=hex>(0xb98)</span>', 34816: 'STENCIL_BACK_FUNC <span class=hex>(0x8800)</span>', 34817: 'STENCIL_BACK_FAIL <span class=hex>(0x8801)</span>', 34818: 'STENCIL_BACK_PASS_DEPTH_FAIL <span class=hex>(0x8802)</span>', 34819: 'STENCIL_BACK_PASS_DEPTH_PASS <span class=hex>(0x8803)</span>', 36003: 'STENCIL_BACK_REF <span class=hex>(0x8ca3)</span>', 36004: 'STENCIL_BACK_VALUE_MASK <span class=hex>(0x8ca4)</span>', 36005: 'STENCIL_BACK_WRITEMASK <span class=hex>(0x8ca5)</span>', 2978: 'VIEWPORT <span class=hex>(0xba2)</span>', 3088: 'SCISSOR_BOX <span class=hex>(0xc10)</span>', 3106: 'COLOR_CLEAR_VALUE <span class=hex>(0xc22)</span>', 3107: 'COLOR_WRITEMASK <span class=hex>(0xc23)</span>', 3317: 'UNPACK_ALIGNMENT <span class=hex>(0xcf5)</span>', 3333: 'PACK_ALIGNMENT <span class=hex>(0xd05)</span>', 3379: 'MAX_TEXTURE_SIZE <span class=hex>(0xd33)</span>', 3386: 'MAX_VIEWPORT_DIMS <span class=hex>(0xd3a)</span>', 3408: 'SUBPIXEL_BITS <span class=hex>(0xd50)</span>', 3410: 'RED_BITS <span class=hex>(0xd52)</span>', 3411: 'GREEN_BITS <span class=hex>(0xd53)</span>', 3412: 'BLUE_BITS <span class=hex>(0xd54)</span>', 3413: 'ALPHA_BITS <span class=hex>(0xd55)</span>', 3414: 'DEPTH_BITS <span class=hex>(0xd56)</span>', 3415: 'STENCIL_BITS <span class=hex>(0xd57)</span>', 10752: 'POLYGON_OFFSET_UNITS <span class=hex>(0x2a00)</span>', 32824: 'POLYGON_OFFSET_FACTOR <span class=hex>(0x8038)</span>', 32873: 'TEXTURE_BINDING_2D <span class=hex>(0x8069)</span>', 32936: 'SAMPLE_BUFFERS <span class=hex>(0x80a8)</span>', 32937: 'SAMPLES <span class=hex>(0x80a9)</span>', 32938: 'SAMPLE_COVERAGE_VALUE <span class=hex>(0x80aa)</span>', 32939: 'SAMPLE_COVERAGE_INVERT <span class=hex>(0x80ab)</span>', 34467: 'COMPRESSED_TEXTURE_FORMATS <span class=hex>(0x86a3)</span>', 4352: 'DONT_CARE <span class=hex>(0x1100)</span>', 4353: 'FASTEST <span class=hex>(0x1101)</span>', 4354: 'NICEST <span class=hex>(0x1102)</span>', 33170: 'GENERATE_MIPMAP_HINT <span class=hex>(0x8192)</span>', 5120: 'BYTE <span class=hex>(0x1400)</span>', 5121: 'UNSIGNED_BYTE <span class=hex>(0x1401)</span>', 5122: 'SHORT <span class=hex>(0x1402)</span>', 5123: 'UNSIGNED_SHORT <span class=hex>(0x1403)</span>', 5124: 'INT <span class=hex>(0x1404)</span>', 5125: 'UNSIGNED_INT <span class=hex>(0x1405)</span>', 5126: 'FLOAT <span class=hex>(0x1406)</span>', 6402: 'DEPTH_COMPONENT <span class=hex>(0x1902)</span>', 6406: 'ALPHA <span class=hex>(0x1906)</span>', 6407: 'RGB <span class=hex>(0x1907)</span>', 6408: 'RGBA <span class=hex>(0x1908)</span>', 6409: 'LUMINANCE <span class=hex>(0x1909)</span>', 6410: 'LUMINANCE_ALPHA <span class=hex>(0x190a)</span>', 32819: 'UNSIGNED_SHORT_4_4_4_4 <span class=hex>(0x8033)</span>', 32820: 'UNSIGNED_SHORT_5_5_5_1 <span class=hex>(0x8034)</span>', 33635: 'UNSIGNED_SHORT_5_6_5 <span class=hex>(0x8363)</span>', 35632: 'FRAGMENT_SHADER <span class=hex>(0x8b30)</span>', 35633: 'VERTEX_SHADER <span class=hex>(0x8b31)</span>', 34921: 'MAX_VERTEX_ATTRIBS <span class=hex>(0x8869)</span>', 36347: 'MAX_VERTEX_UNIFORM_VECTORS <span class=hex>(0x8dfb)</span>', 36348: 'MAX_VARYING_VECTORS <span class=hex>(0x8dfc)</span>', 35661: 'MAX_COMBINED_TEXTURE_IMAGE_UNITS <span class=hex>(0x8b4d)</span>', 35660: 'MAX_VERTEX_TEXTURE_IMAGE_UNITS <span class=hex>(0x8b4c)</span>', 34930: 'MAX_TEXTURE_IMAGE_UNITS <span class=hex>(0x8872)</span>', 36349: 'MAX_FRAGMENT_UNIFORM_VECTORS <span class=hex>(0x8dfd)</span>', 35663: 'SHADER_TYPE <span class=hex>(0x8b4f)</span>', 35712: 'DELETE_STATUS <span class=hex>(0x8b80)</span>', 35714: 'LINK_STATUS <span class=hex>(0x8b82)</span>', 35715: 'VALIDATE_STATUS <span class=hex>(0x8b83)</span>', 35717: 'ATTACHED_SHADERS <span class=hex>(0x8b85)</span>', 35718: 'ACTIVE_UNIFORMS <span class=hex>(0x8b86)</span>', 35721: 'ACTIVE_ATTRIBUTES <span class=hex>(0x8b89)</span>', 35724: 'SHADING_LANGUAGE_VERSION <span class=hex>(0x8b8c)</span>', 35725: 'CURRENT_PROGRAM <span class=hex>(0x8b8d)</span>', 512: 'NEVER <span class=hex>(0x200)</span>', 513: 'LESS <span class=hex>(0x201)</span>', 514: 'EQUAL <span class=hex>(0x202)</span>', 515: 'LEQUAL <span class=hex>(0x203)</span>', 516: 'GREATER <span class=hex>(0x204)</span>', 517: 'NOTEQUAL <span class=hex>(0x205)</span>', 518: 'GEQUAL <span class=hex>(0x206)</span>', 519: 'ALWAYS <span class=hex>(0x207)</span>', 7680: 'KEEP <span class=hex>(0x1e00)</span>', 7681: 'REPLACE <span class=hex>(0x1e01)</span>', 7682: 'INCR <span class=hex>(0x1e02)</span>', 7683: 'DECR <span class=hex>(0x1e03)</span>', 5386: 'INVERT <span class=hex>(0x150a)</span>', 34055: 'INCR_WRAP <span class=hex>(0x8507)</span>', 34056: 'DECR_WRAP <span class=hex>(0x8508)</span>', 7936: 'VENDOR <span class=hex>(0x1f00)</span>', 7937: 'RENDERER <span class=hex>(0x1f01)</span>', 7938: 'VERSION <span class=hex>(0x1f02)</span>', 9728: 'NEAREST <span class=hex>(0x2600)</span>', 9729: 'LINEAR <span class=hex>(0x2601)</span>', 9984: 'NEAREST_MIPMAP_NEAREST <span class=hex>(0x2700)</span>', 9985: 'LINEAR_MIPMAP_NEAREST <span class=hex>(0x2701)</span>', 9986: 'NEAREST_MIPMAP_LINEAR <span class=hex>(0x2702)</span>', 9987: 'LINEAR_MIPMAP_LINEAR <span class=hex>(0x2703)</span>', 10240: 'TEXTURE_MAG_FILTER <span class=hex>(0x2800)</span>', 10241: 'TEXTURE_MIN_FILTER <span class=hex>(0x2801)</span>', 10242: 'TEXTURE_WRAP_S <span class=hex>(0x2802)</span>', 10243: 'TEXTURE_WRAP_T <span class=hex>(0x2803)</span>', 3553: 'TEXTURE_2D <span class=hex>(0xde1)</span>', 5890: 'TEXTURE <span class=hex>(0x1702)</span>', 34067: 'TEXTURE_CUBE_MAP <span class=hex>(0x8513)</span>', 34068: 'TEXTURE_BINDING_CUBE_MAP <span class=hex>(0x8514)</span>', 34069: 'TEXTURE_CUBE_MAP_POSITIVE_X <span class=hex>(0x8515)</span>', 34070: 'TEXTURE_CUBE_MAP_NEGATIVE_X <span class=hex>(0x8516)</span>', 34071: 'TEXTURE_CUBE_MAP_POSITIVE_Y <span class=hex>(0x8517)</span>', 34072: 'TEXTURE_CUBE_MAP_NEGATIVE_Y <span class=hex>(0x8518)</span>', 34073: 'TEXTURE_CUBE_MAP_POSITIVE_Z <span class=hex>(0x8519)</span>', 34074: 'TEXTURE_CUBE_MAP_NEGATIVE_Z <span class=hex>(0x851a)</span>', 34076: 'MAX_CUBE_MAP_TEXTURE_SIZE <span class=hex>(0x851c)</span>', 33984: 'TEXTURE0 <span class=hex>(0x84c0)</span>', 33985: 'TEXTURE1 <span class=hex>(0x84c1)</span>', 33986: 'TEXTURE2 <span class=hex>(0x84c2)</span>', 33987: 'TEXTURE3 <span class=hex>(0x84c3)</span>', 33988: 'TEXTURE4 <span class=hex>(0x84c4)</span>', 33989: 'TEXTURE5 <span class=hex>(0x84c5)</span>', 33990: 'TEXTURE6 <span class=hex>(0x84c6)</span>', 33991: 'TEXTURE7 <span class=hex>(0x84c7)</span>', 33992: 'TEXTURE8 <span class=hex>(0x84c8)</span>', 33993: 'TEXTURE9 <span class=hex>(0x84c9)</span>', 33994: 'TEXTURE10 <span class=hex>(0x84ca)</span>', 33995: 'TEXTURE11 <span class=hex>(0x84cb)</span>', 33996: 'TEXTURE12 <span class=hex>(0x84cc)</span>', 33997: 'TEXTURE13 <span class=hex>(0x84cd)</span>', 33998: 'TEXTURE14 <span class=hex>(0x84ce)</span>', 33999: 'TEXTURE15 <span class=hex>(0x84cf)</span>', 34000: 'TEXTURE16 <span class=hex>(0x84d0)</span>', 34001: 'TEXTURE17 <span class=hex>(0x84d1)</span>', 34002: 'TEXTURE18 <span class=hex>(0x84d2)</span>', 34003: 'TEXTURE19 <span class=hex>(0x84d3)</span>', 34004: 'TEXTURE20 <span class=hex>(0x84d4)</span>', 34005: 'TEXTURE21 <span class=hex>(0x84d5)</span>', 34006: 'TEXTURE22 <span class=hex>(0x84d6)</span>', 34007: 'TEXTURE23 <span class=hex>(0x84d7)</span>', 34008: 'TEXTURE24 <span class=hex>(0x84d8)</span>', 34009: 'TEXTURE25 <span class=hex>(0x84d9)</span>', 34010: 'TEXTURE26 <span class=hex>(0x84da)</span>', 34011: 'TEXTURE27 <span class=hex>(0x84db)</span>', 34012: 'TEXTURE28 <span class=hex>(0x84dc)</span>', 34013: 'TEXTURE29 <span class=hex>(0x84dd)</span>', 34014: 'TEXTURE30 <span class=hex>(0x84de)</span>', 34015: 'TEXTURE31 <span class=hex>(0x84df)</span>', 34016: 'ACTIVE_TEXTURE <span class=hex>(0x84e0)</span>', 10497: 'REPEAT <span class=hex>(0x2901)</span>', 33071: 'CLAMP_TO_EDGE <span class=hex>(0x812f)</span>', 33648: 'MIRRORED_REPEAT <span class=hex>(0x8370)</span>', 35664: 'FLOAT_VEC2 <span class=hex>(0x8b50)</span>', 35665: 'FLOAT_VEC3 <span class=hex>(0x8b51)</span>', 35666: 'FLOAT_VEC4 <span class=hex>(0x8b52)</span>', 35667: 'INT_VEC2 <span class=hex>(0x8b53)</span>', 35668: 'INT_VEC3 <span class=hex>(0x8b54)</span>', 35669: 'INT_VEC4 <span class=hex>(0x8b55)</span>', 35670: 'BOOL <span class=hex>(0x8b56)</span>', 35671: 'BOOL_VEC2 <span class=hex>(0x8b57)</span>', 35672: 'BOOL_VEC3 <span class=hex>(0x8b58)</span>', 35673: 'BOOL_VEC4 <span class=hex>(0x8b59)</span>', 35674: 'FLOAT_MAT2 <span class=hex>(0x8b5a)</span>', 35675: 'FLOAT_MAT3 <span class=hex>(0x8b5b)</span>', 35676: 'FLOAT_MAT4 <span class=hex>(0x8b5c)</span>', 35678: 'SAMPLER_2D <span class=hex>(0x8b5e)</span>', 35680: 'SAMPLER_CUBE <span class=hex>(0x8b60)</span>', 34338: 'VERTEX_ATTRIB_ARRAY_ENABLED <span class=hex>(0x8622)</span>', 34339: 'VERTEX_ATTRIB_ARRAY_SIZE <span class=hex>(0x8623)</span>', 34340: 'VERTEX_ATTRIB_ARRAY_STRIDE <span class=hex>(0x8624)</span>', 34341: 'VERTEX_ATTRIB_ARRAY_TYPE <span class=hex>(0x8625)</span>', 34922: 'VERTEX_ATTRIB_ARRAY_NORMALIZED <span class=hex>(0x886a)</span>', 34373: 'VERTEX_ATTRIB_ARRAY_POINTER <span class=hex>(0x8645)</span>', 34975: 'VERTEX_ATTRIB_ARRAY_BUFFER_BINDING <span class=hex>(0x889f)</span>', 35738: 'IMPLEMENTATION_COLOR_READ_TYPE <span class=hex>(0x8b9a)</span>', 35739: 'IMPLEMENTATION_COLOR_READ_FORMAT <span class=hex>(0x8b9b)</span>', 35713: 'COMPILE_STATUS <span class=hex>(0x8b81)</span>', 36336: 'LOW_FLOAT <span class=hex>(0x8df0)</span>', 36337: 'MEDIUM_FLOAT <span class=hex>(0x8df1)</span>', 36338: 'HIGH_FLOAT <span class=hex>(0x8df2)</span>', 36339: 'LOW_INT <span class=hex>(0x8df3)</span>', 36340: 'MEDIUM_INT <span class=hex>(0x8df4)</span>', 36341: 'HIGH_INT <span class=hex>(0x8df5)</span>', 36160: 'FRAMEBUFFER <span class=hex>(0x8d40)</span>', 36161: 'RENDERBUFFER <span class=hex>(0x8d41)</span>', 32854: 'RGBA4 <span class=hex>(0x8056)</span>', 32855: 'RGB5_A1 <span class=hex>(0x8057)</span>', 36194: 'RGB565 <span class=hex>(0x8d62)</span>', 33189: 'DEPTH_COMPONENT16 <span class=hex>(0x81a5)</span>', 36168: 'STENCIL_INDEX8 <span class=hex>(0x8d48)</span>', 34041: 'DEPTH_STENCIL <span class=hex>(0x84f9)</span>', 36162: 'RENDERBUFFER_WIDTH <span class=hex>(0x8d42)</span>', 36163: 'RENDERBUFFER_HEIGHT <span class=hex>(0x8d43)</span>', 36164: 'RENDERBUFFER_INTERNAL_FORMAT <span class=hex>(0x8d44)</span>', 36176: 'RENDERBUFFER_RED_SIZE <span class=hex>(0x8d50)</span>', 36177: 'RENDERBUFFER_GREEN_SIZE <span class=hex>(0x8d51)</span>', 36178: 'RENDERBUFFER_BLUE_SIZE <span class=hex>(0x8d52)</span>', 36179: 'RENDERBUFFER_ALPHA_SIZE <span class=hex>(0x8d53)</span>', 36180: 'RENDERBUFFER_DEPTH_SIZE <span class=hex>(0x8d54)</span>', 36181: 'RENDERBUFFER_STENCIL_SIZE <span class=hex>(0x8d55)</span>', 36048: 'FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE <span class=hex>(0x8cd0)</span>', 36049: 'FRAMEBUFFER_ATTACHMENT_OBJECT_NAME <span class=hex>(0x8cd1)</span>', 36050: 'FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL <span class=hex>(0x8cd2)</span>', 36051: 'FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE <span class=hex>(0x8cd3)</span>', 36064: 'COLOR_ATTACHMENT0 <span class=hex>(0x8ce0)</span>', 36096: 'DEPTH_ATTACHMENT <span class=hex>(0x8d00)</span>', 36128: 'STENCIL_ATTACHMENT <span class=hex>(0x8d20)</span>', 33306: 'DEPTH_STENCIL_ATTACHMENT <span class=hex>(0x821a)</span>', 36053: 'FRAMEBUFFER_COMPLETE <span class=hex>(0x8cd5)</span>', 36054: 'FRAMEBUFFER_INCOMPLETE_ATTACHMENT <span class=hex>(0x8cd6)</span>', 36055: 'FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT <span class=hex>(0x8cd7)</span>', 36057: 'FRAMEBUFFER_INCOMPLETE_DIMENSIONS <span class=hex>(0x8cd9)</span>', 36061: 'FRAMEBUFFER_UNSUPPORTED <span class=hex>(0x8cdd)</span>', 36006: 'FRAMEBUFFER_BINDING <span class=hex>(0x8ca6)</span>', 36007: 'RENDERBUFFER_BINDING <span class=hex>(0x8ca7)</span>', 34024: 'MAX_RENDERBUFFER_SIZE <span class=hex>(0x84e8)</span>', 1286: 'INVALID_FRAMEBUFFER_OPERATION <span class=hex>(0x506)</span>', 37440: 'UNPACK_FLIP_Y_WEBGL <span class=hex>(0x9240)</span>', 37441: 'UNPACK_PREMULTIPLY_ALPHA_WEBGL <span class=hex>(0x9241)</span>', 37442: 'CONTEXT_LOST_WEBGL <span class=hex>(0x9242)</span>', 37443: 'UNPACK_COLORSPACE_CONVERSION_WEBGL <span class=hex>(0x9243)</span>', 37444: 'BROWSER_DEFAULT_WEBGL <span class=hex>(0x9244)</span>', 3074: 'READ_BUFFER <span class=hex>(0xc02)</span>', 3314: 'UNPACK_ROW_LENGTH <span class=hex>(0xcf2)</span>', 3315: 'UNPACK_SKIP_ROWS <span class=hex>(0xcf3)</span>', 3316: 'UNPACK_SKIP_PIXELS <span class=hex>(0xcf4)</span>', 3330: 'PACK_ROW_LENGTH <span class=hex>(0xd02)</span>', 3331: 'PACK_SKIP_ROWS <span class=hex>(0xd03)</span>', 3332: 'PACK_SKIP_PIXELS <span class=hex>(0xd04)</span>', 6144: 'COLOR <span class=hex>(0x1800)</span>', 6145: 'DEPTH <span class=hex>(0x1801)</span>', 6146: 'STENCIL <span class=hex>(0x1802)</span>', 6403: 'RED <span class=hex>(0x1903)</span>', 32849: 'RGB8 <span class=hex>(0x8051)</span>', 32856: 'RGBA8 <span class=hex>(0x8058)</span>', 32857: 'RGB10_A2 <span class=hex>(0x8059)</span>', 32874: 'TEXTURE_BINDING_3D <span class=hex>(0x806a)</span>', 32877: 'UNPACK_SKIP_IMAGES <span class=hex>(0x806d)</span>', 32878: 'UNPACK_IMAGE_HEIGHT <span class=hex>(0x806e)</span>', 32879: 'TEXTURE_3D <span class=hex>(0x806f)</span>', 32882: 'TEXTURE_WRAP_R <span class=hex>(0x8072)</span>', 32883: 'MAX_3D_TEXTURE_SIZE <span class=hex>(0x8073)</span>', 33640: 'UNSIGNED_INT_2_10_10_10_REV <span class=hex>(0x8368)</span>', 33000: 'MAX_ELEMENTS_VERTICES <span class=hex>(0x80e8)</span>', 33001: 'MAX_ELEMENTS_INDICES <span class=hex>(0x80e9)</span>', 33082: 'TEXTURE_MIN_LOD <span class=hex>(0x813a)</span>', 33083: 'TEXTURE_MAX_LOD <span class=hex>(0x813b)</span>', 33084: 'TEXTURE_BASE_LEVEL <span class=hex>(0x813c)</span>', 33085: 'TEXTURE_MAX_LEVEL <span class=hex>(0x813d)</span>', 32775: 'MIN <span class=hex>(0x8007)</span>', 32776: 'MAX <span class=hex>(0x8008)</span>', 33190: 'DEPTH_COMPONENT24 <span class=hex>(0x81a6)</span>', 34045: 'MAX_TEXTURE_LOD_BIAS <span class=hex>(0x84fd)</span>', 34892: 'TEXTURE_COMPARE_MODE <span class=hex>(0x884c)</span>', 34893: 'TEXTURE_COMPARE_FUNC <span class=hex>(0x884d)</span>', 34917: 'CURRENT_QUERY <span class=hex>(0x8865)</span>', 34918: 'QUERY_RESULT <span class=hex>(0x8866)</span>', 34919: 'QUERY_RESULT_AVAILABLE <span class=hex>(0x8867)</span>', 35041: 'STREAM_READ <span class=hex>(0x88e1)</span>', 35042: 'STREAM_COPY <span class=hex>(0x88e2)</span>', 35045: 'STATIC_READ <span class=hex>(0x88e5)</span>', 35046: 'STATIC_COPY <span class=hex>(0x88e6)</span>', 35049: 'DYNAMIC_READ <span class=hex>(0x88e9)</span>', 35050: 'DYNAMIC_COPY <span class=hex>(0x88ea)</span>', 34852: 'MAX_DRAW_BUFFERS <span class=hex>(0x8824)</span>', 34853: 'DRAW_BUFFER0 <span class=hex>(0x8825)</span>', 34854: 'DRAW_BUFFER1 <span class=hex>(0x8826)</span>', 34855: 'DRAW_BUFFER2 <span class=hex>(0x8827)</span>', 34856: 'DRAW_BUFFER3 <span class=hex>(0x8828)</span>', 34857: 'DRAW_BUFFER4 <span class=hex>(0x8829)</span>', 34858: 'DRAW_BUFFER5 <span class=hex>(0x882a)</span>', 34859: 'DRAW_BUFFER6 <span class=hex>(0x882b)</span>', 34860: 'DRAW_BUFFER7 <span class=hex>(0x882c)</span>', 34861: 'DRAW_BUFFER8 <span class=hex>(0x882d)</span>', 34862: 'DRAW_BUFFER9 <span class=hex>(0x882e)</span>', 34863: 'DRAW_BUFFER10 <span class=hex>(0x882f)</span>', 34864: 'DRAW_BUFFER11 <span class=hex>(0x8830)</span>', 34865: 'DRAW_BUFFER12 <span class=hex>(0x8831)</span>', 34866: 'DRAW_BUFFER13 <span class=hex>(0x8832)</span>', 34867: 'DRAW_BUFFER14 <span class=hex>(0x8833)</span>', 34868: 'DRAW_BUFFER15 <span class=hex>(0x8834)</span>', 35657: 'MAX_FRAGMENT_UNIFORM_COMPONENTS <span class=hex>(0x8b49)</span>', 35658: 'MAX_VERTEX_UNIFORM_COMPONENTS <span class=hex>(0x8b4a)</span>', 35679: 'SAMPLER_3D <span class=hex>(0x8b5f)</span>', 35682: 'SAMPLER_2D_SHADOW <span class=hex>(0x8b62)</span>', 35723: 'FRAGMENT_SHADER_DERIVATIVE_HINT <span class=hex>(0x8b8b)</span>', 35051: 'PIXEL_PACK_BUFFER <span class=hex>(0x88eb)</span>', 35052: 'PIXEL_UNPACK_BUFFER <span class=hex>(0x88ec)</span>', 35053: 'PIXEL_PACK_BUFFER_BINDING <span class=hex>(0x88ed)</span>', 35055: 'PIXEL_UNPACK_BUFFER_BINDING <span class=hex>(0x88ef)</span>', 35685: 'FLOAT_MAT2x3 <span class=hex>(0x8b65)</span>', 35686: 'FLOAT_MAT2x4 <span class=hex>(0x8b66)</span>', 35687: 'FLOAT_MAT3x2 <span class=hex>(0x8b67)</span>', 35688: 'FLOAT_MAT3x4 <span class=hex>(0x8b68)</span>', 35689: 'FLOAT_MAT4x2 <span class=hex>(0x8b69)</span>', 35690: 'FLOAT_MAT4x3 <span class=hex>(0x8b6a)</span>', 35904: 'SRGB <span class=hex>(0x8c40)</span>', 35905: 'SRGB8 <span class=hex>(0x8c41)</span>', 35907: 'SRGB8_ALPHA8 <span class=hex>(0x8c43)</span>', 34894: 'COMPARE_REF_TO_TEXTURE <span class=hex>(0x884e)</span>', 34836: 'RGBA32F <span class=hex>(0x8814)</span>', 34837: 'RGB32F <span class=hex>(0x8815)</span>', 34842: 'RGBA16F <span class=hex>(0x881a)</span>', 34843: 'RGB16F <span class=hex>(0x881b)</span>', 35069: 'VERTEX_ATTRIB_ARRAY_INTEGER <span class=hex>(0x88fd)</span>', 35071: 'MAX_ARRAY_TEXTURE_LAYERS <span class=hex>(0x88ff)</span>', 35076: 'MIN_PROGRAM_TEXEL_OFFSET <span class=hex>(0x8904)</span>', 35077: 'MAX_PROGRAM_TEXEL_OFFSET <span class=hex>(0x8905)</span>', 35659: 'MAX_VARYING_COMPONENTS <span class=hex>(0x8b4b)</span>', 35866: 'TEXTURE_2D_ARRAY <span class=hex>(0x8c1a)</span>', 35869: 'TEXTURE_BINDING_2D_ARRAY <span class=hex>(0x8c1d)</span>', 35898: 'R11F_G11F_B10F <span class=hex>(0x8c3a)</span>', 35899: 'UNSIGNED_INT_10F_11F_11F_REV <span class=hex>(0x8c3b)</span>', 35901: 'RGB9_E5 <span class=hex>(0x8c3d)</span>', 35902: 'UNSIGNED_INT_5_9_9_9_REV <span class=hex>(0x8c3e)</span>', 35967: 'TRANSFORM_FEEDBACK_BUFFER_MODE <span class=hex>(0x8c7f)</span>', 35968: 'MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS <span class=hex>(0x8c80)</span>', 35971: 'TRANSFORM_FEEDBACK_VARYINGS <span class=hex>(0x8c83)</span>', 35972: 'TRANSFORM_FEEDBACK_BUFFER_START <span class=hex>(0x8c84)</span>', 35973: 'TRANSFORM_FEEDBACK_BUFFER_SIZE <span class=hex>(0x8c85)</span>', 35976: 'TRANSFORM_FEEDBACK_PRIMITIVES_WRITTEN <span class=hex>(0x8c88)</span>', 35977: 'RASTERIZER_DISCARD <span class=hex>(0x8c89)</span>', 35978: 'MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS <span class=hex>(0x8c8a)</span>', 35979: 'MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS <span class=hex>(0x8c8b)</span>', 35980: 'INTERLEAVED_ATTRIBS <span class=hex>(0x8c8c)</span>', 35981: 'SEPARATE_ATTRIBS <span class=hex>(0x8c8d)</span>', 35982: 'TRANSFORM_FEEDBACK_BUFFER <span class=hex>(0x8c8e)</span>', 35983: 'TRANSFORM_FEEDBACK_BUFFER_BINDING <span class=hex>(0x8c8f)</span>', 36208: 'RGBA32UI <span class=hex>(0x8d70)</span>', 36209: 'RGB32UI <span class=hex>(0x8d71)</span>', 36214: 'RGBA16UI <span class=hex>(0x8d76)</span>', 36215: 'RGB16UI <span class=hex>(0x8d77)</span>', 36220: 'RGBA8UI <span class=hex>(0x8d7c)</span>', 36221: 'RGB8UI <span class=hex>(0x8d7d)</span>', 36226: 'RGBA32I <span class=hex>(0x8d82)</span>', 36227: 'RGB32I <span class=hex>(0x8d83)</span>', 36232: 'RGBA16I <span class=hex>(0x8d88)</span>', 36233: 'RGB16I <span class=hex>(0x8d89)</span>', 36238: 'RGBA8I <span class=hex>(0x8d8e)</span>', 36239: 'RGB8I <span class=hex>(0x8d8f)</span>', 36244: 'RED_INTEGER <span class=hex>(0x8d94)</span>', 36248: 'RGB_INTEGER <span class=hex>(0x8d98)</span>', 36249: 'RGBA_INTEGER <span class=hex>(0x8d99)</span>', 36289: 'SAMPLER_2D_ARRAY <span class=hex>(0x8dc1)</span>', 36292: 'SAMPLER_2D_ARRAY_SHADOW <span class=hex>(0x8dc4)</span>', 36293: 'SAMPLER_CUBE_SHADOW <span class=hex>(0x8dc5)</span>', 36294: 'UNSIGNED_INT_VEC2 <span class=hex>(0x8dc6)</span>', 36295: 'UNSIGNED_INT_VEC3 <span class=hex>(0x8dc7)</span>', 36296: 'UNSIGNED_INT_VEC4 <span class=hex>(0x8dc8)</span>', 36298: 'INT_SAMPLER_2D <span class=hex>(0x8dca)</span>', 36299: 'INT_SAMPLER_3D <span class=hex>(0x8dcb)</span>', 36300: 'INT_SAMPLER_CUBE <span class=hex>(0x8dcc)</span>', 36303: 'INT_SAMPLER_2D_ARRAY <span class=hex>(0x8dcf)</span>', 36306: 'UNSIGNED_INT_SAMPLER_2D <span class=hex>(0x8dd2)</span>', 36307: 'UNSIGNED_INT_SAMPLER_3D <span class=hex>(0x8dd3)</span>', 36308: 'UNSIGNED_INT_SAMPLER_CUBE <span class=hex>(0x8dd4)</span>', 36311: 'UNSIGNED_INT_SAMPLER_2D_ARRAY <span class=hex>(0x8dd7)</span>', 36012: 'DEPTH_COMPONENT32F <span class=hex>(0x8cac)</span>', 36013: 'DEPTH32F_STENCIL8 <span class=hex>(0x8cad)</span>', 36269: 'FLOAT_32_UNSIGNED_INT_24_8_REV <span class=hex>(0x8dad)</span>', 33296: 'FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING <span class=hex>(0x8210)</span>', 33297: 'FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE <span class=hex>(0x8211)</span>', 33298: 'FRAMEBUFFER_ATTACHMENT_RED_SIZE <span class=hex>(0x8212)</span>', 33299: 'FRAMEBUFFER_ATTACHMENT_GREEN_SIZE <span class=hex>(0x8213)</span>', 33300: 'FRAMEBUFFER_ATTACHMENT_BLUE_SIZE <span class=hex>(0x8214)</span>', 33301: 'FRAMEBUFFER_ATTACHMENT_ALPHA_SIZE <span class=hex>(0x8215)</span>', 33302: 'FRAMEBUFFER_ATTACHMENT_DEPTH_SIZE <span class=hex>(0x8216)</span>', 33303: 'FRAMEBUFFER_ATTACHMENT_STENCIL_SIZE <span class=hex>(0x8217)</span>', 33304: 'FRAMEBUFFER_DEFAULT <span class=hex>(0x8218)</span>', 34042: 'UNSIGNED_INT_24_8 <span class=hex>(0x84fa)</span>', 35056: 'DEPTH24_STENCIL8 <span class=hex>(0x88f0)</span>', 35863: 'UNSIGNED_NORMALIZED <span class=hex>(0x8c17)</span>', 36008: 'READ_FRAMEBUFFER <span class=hex>(0x8ca8)</span>', 36009: 'DRAW_FRAMEBUFFER <span class=hex>(0x8ca9)</span>', 36010: 'READ_FRAMEBUFFER_BINDING <span class=hex>(0x8caa)</span>', 36011: 'RENDERBUFFER_SAMPLES <span class=hex>(0x8cab)</span>', 36052: 'FRAMEBUFFER_ATTACHMENT_TEXTURE_LAYER <span class=hex>(0x8cd4)</span>', 36063: 'MAX_COLOR_ATTACHMENTS <span class=hex>(0x8cdf)</span>', 36065: 'COLOR_ATTACHMENT1 <span class=hex>(0x8ce1)</span>', 36066: 'COLOR_ATTACHMENT2 <span class=hex>(0x8ce2)</span>', 36067: 'COLOR_ATTACHMENT3 <span class=hex>(0x8ce3)</span>', 36068: 'COLOR_ATTACHMENT4 <span class=hex>(0x8ce4)</span>', 36069: 'COLOR_ATTACHMENT5 <span class=hex>(0x8ce5)</span>', 36070: 'COLOR_ATTACHMENT6 <span class=hex>(0x8ce6)</span>', 36071: 'COLOR_ATTACHMENT7 <span class=hex>(0x8ce7)</span>', 36072: 'COLOR_ATTACHMENT8 <span class=hex>(0x8ce8)</span>', 36073: 'COLOR_ATTACHMENT9 <span class=hex>(0x8ce9)</span>', 36074: 'COLOR_ATTACHMENT10 <span class=hex>(0x8cea)</span>', 36075: 'COLOR_ATTACHMENT11 <span class=hex>(0x8ceb)</span>', 36076: 'COLOR_ATTACHMENT12 <span class=hex>(0x8cec)</span>', 36077: 'COLOR_ATTACHMENT13 <span class=hex>(0x8ced)</span>', 36078: 'COLOR_ATTACHMENT14 <span class=hex>(0x8cee)</span>', 36079: 'COLOR_ATTACHMENT15 <span class=hex>(0x8cef)</span>', 36182: 'FRAMEBUFFER_INCOMPLETE_MULTISAMPLE <span class=hex>(0x8d56)</span>', 36183: 'MAX_SAMPLES <span class=hex>(0x8d57)</span>', 5131: 'HALF_FLOAT <span class=hex>(0x140b)</span>', 33319: 'RG <span class=hex>(0x8227)</span>', 33320: 'RG_INTEGER <span class=hex>(0x8228)</span>', 33321: 'R8 <span class=hex>(0x8229)</span>', 33323: 'RG8 <span class=hex>(0x822b)</span>', 33325: 'R16F <span class=hex>(0x822d)</span>', 33326: 'R32F <span class=hex>(0x822e)</span>', 33327: 'RG16F <span class=hex>(0x822f)</span>', 33328: 'RG32F <span class=hex>(0x8230)</span>', 33329: 'R8I <span class=hex>(0x8231)</span>', 33330: 'R8UI <span class=hex>(0x8232)</span>', 33331: 'R16I <span class=hex>(0x8233)</span>', 33332: 'R16UI <span class=hex>(0x8234)</span>', 33333: 'R32I <span class=hex>(0x8235)</span>', 33334: 'R32UI <span class=hex>(0x8236)</span>', 33335: 'RG8I <span class=hex>(0x8237)</span>', 33336: 'RG8UI <span class=hex>(0x8238)</span>', 33337: 'RG16I <span class=hex>(0x8239)</span>', 33338: 'RG16UI <span class=hex>(0x823a)</span>', 33339: 'RG32I <span class=hex>(0x823b)</span>', 33340: 'RG32UI <span class=hex>(0x823c)</span>', 34229: 'VERTEX_ARRAY_BINDING <span class=hex>(0x85b5)</span>', 36756: 'R8_SNORM <span class=hex>(0x8f94)</span>', 36757: 'RG8_SNORM <span class=hex>(0x8f95)</span>', 36758: 'RGB8_SNORM <span class=hex>(0x8f96)</span>', 36759: 'RGBA8_SNORM <span class=hex>(0x8f97)</span>', 36764: 'SIGNED_NORMALIZED <span class=hex>(0x8f9c)</span>', 36662: 'COPY_READ_BUFFER_BINDING <span class=hex>(0x8f36)</span>', 36663: 'COPY_WRITE_BUFFER_BINDING <span class=hex>(0x8f37)</span>', 35345: 'UNIFORM_BUFFER <span class=hex>(0x8a11)</span>', 35368: 'UNIFORM_BUFFER_BINDING <span class=hex>(0x8a28)</span>', 35369: 'UNIFORM_BUFFER_START <span class=hex>(0x8a29)</span>', 35370: 'UNIFORM_BUFFER_SIZE <span class=hex>(0x8a2a)</span>', 35371: 'MAX_VERTEX_UNIFORM_BLOCKS <span class=hex>(0x8a2b)</span>', 35373: 'MAX_FRAGMENT_UNIFORM_BLOCKS <span class=hex>(0x8a2d)</span>', 35374: 'MAX_COMBINED_UNIFORM_BLOCKS <span class=hex>(0x8a2e)</span>', 35375: 'MAX_UNIFORM_BUFFER_BINDINGS <span class=hex>(0x8a2f)</span>', 35376: 'MAX_UNIFORM_BLOCK_SIZE <span class=hex>(0x8a30)</span>', 35377: 'MAX_COMBINED_VERTEX_UNIFORM_COMPONENTS <span class=hex>(0x8a31)</span>', 35379: 'MAX_COMBINED_FRAGMENT_UNIFORM_COMPONENTS <span class=hex>(0x8a33)</span>', 35380: 'UNIFORM_BUFFER_OFFSET_ALIGNMENT <span class=hex>(0x8a34)</span>', 35382: 'ACTIVE_UNIFORM_BLOCKS <span class=hex>(0x8a36)</span>', 35383: 'UNIFORM_TYPE <span class=hex>(0x8a37)</span>', 35384: 'UNIFORM_SIZE <span class=hex>(0x8a38)</span>', 35386: 'UNIFORM_BLOCK_INDEX <span class=hex>(0x8a3a)</span>', 35387: 'UNIFORM_OFFSET <span class=hex>(0x8a3b)</span>', 35388: 'UNIFORM_ARRAY_STRIDE <span class=hex>(0x8a3c)</span>', 35389: 'UNIFORM_MATRIX_STRIDE <span class=hex>(0x8a3d)</span>', 35390: 'UNIFORM_IS_ROW_MAJOR <span class=hex>(0x8a3e)</span>', 35391: 'UNIFORM_BLOCK_BINDING <span class=hex>(0x8a3f)</span>', 35392: 'UNIFORM_BLOCK_DATA_SIZE <span class=hex>(0x8a40)</span>', 35394: 'UNIFORM_BLOCK_ACTIVE_UNIFORMS <span class=hex>(0x8a42)</span>', 35395: 'UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES <span class=hex>(0x8a43)</span>', 35396: 'UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER <span class=hex>(0x8a44)</span>', 35398: 'UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER <span class=hex>(0x8a46)</span>', 37154: 'MAX_VERTEX_OUTPUT_COMPONENTS <span class=hex>(0x9122)</span>', 37157: 'MAX_FRAGMENT_INPUT_COMPONENTS <span class=hex>(0x9125)</span>', 37137: 'MAX_SERVER_WAIT_TIMEOUT <span class=hex>(0x9111)</span>', 37138: 'OBJECT_TYPE <span class=hex>(0x9112)</span>', 37139: 'SYNC_CONDITION <span class=hex>(0x9113)</span>', 37140: 'SYNC_STATUS <span class=hex>(0x9114)</span>', 37141: 'SYNC_FLAGS <span class=hex>(0x9115)</span>', 37142: 'SYNC_FENCE <span class=hex>(0x9116)</span>', 37143: 'SYNC_GPU_COMMANDS_COMPLETE <span class=hex>(0x9117)</span>', 37144: 'UNSIGNALED <span class=hex>(0x9118)</span>', 37145: 'SIGNALED <span class=hex>(0x9119)</span>', 37146: 'ALREADY_SIGNALED <span class=hex>(0x911a)</span>', 37147: 'TIMEOUT_EXPIRED <span class=hex>(0x911b)</span>', 37148: 'CONDITION_SATISFIED <span class=hex>(0x911c)</span>', 37149: 'WAIT_FAILED <span class=hex>(0x911d)</span>', 35070: 'VERTEX_ATTRIB_ARRAY_DIVISOR <span class=hex>(0x88fe)</span>', 35887: 'ANY_SAMPLES_PASSED <span class=hex>(0x8c2f)</span>', 36202: 'ANY_SAMPLES_PASSED_CONSERVATIVE <span class=hex>(0x8d6a)</span>', 35097: 'SAMPLER_BINDING <span class=hex>(0x8919)</span>', 36975: 'RGB10_A2UI <span class=hex>(0x906f)</span>', 36255: 'INT_2_10_10_10_REV <span class=hex>(0x8d9f)</span>', 36386: 'TRANSFORM_FEEDBACK <span class=hex>(0x8e22)</span>', 36387: 'TRANSFORM_FEEDBACK_PAUSED <span class=hex>(0x8e23)</span>', 36388: 'TRANSFORM_FEEDBACK_ACTIVE <span class=hex>(0x8e24)</span>', 36389: 'TRANSFORM_FEEDBACK_BINDING <span class=hex>(0x8e25)</span>', 37167: 'TEXTURE_IMMUTABLE_FORMAT <span class=hex>(0x912f)</span>', 36203: 'MAX_ELEMENT_INDEX <span class=hex>(0x8d6b)</span>', 33503: 'TEXTURE_IMMUTABLE_LEVELS <span class=hex>(0x82df)</span>', 37447: 'MAX_CLIENT_WAIT_TIMEOUT_WEBGL <span class=hex>(0x9247)</span>',

  36662: 'COPY_READ_BUFFER <span class=hex>(0x8f36)</span>',
  36663: 'COPY_WRITE_BUFFER <span class=hex>(0x8f37)</span>',

  0x8d61: 'HALF_FLOAT_OES <span class=hex>(0x8d61)</span>',
  0x9245: 'UNMASKED_VENDOR_WEBGL <span class=hex>(0x9245)</span>',
  0x9246: 'UNMASKED_RENDERER_WEBGL <span class=hex>(0x9246)</span>',
  0x83F0: 'COMPRESSED_RGB_S3TC_DXT1_EXT <span class=hex>(0x83f0)</span>',
  0x83F1: 'COMPRESSED_RGBA_S3TC_DXT1_EXT <span class=hex>(0x83f1)</span>',
  0x83F2: 'COMPRESSED_RGBA_S3TC_DXT3_EXT <span class=hex>(0x83f2)</span>',
  0x83F3: 'COMPRESSED_RGBA_S3TC_DXT5_EXT <span class=hex>(0x83f3)</span>',
  0x84FE: 'TEXTURE_MAX_ANISOTROPY_EXT <span class=hex>(0x84fe)</span>',
  0x84FF: 'MAX_TEXTURE_MAX_ANISOTROPY_EXT <span class=hex>(0x84ff)</span>',
  0x8c00: 'COMPRESSED_RGB_PVRTC_4BPPV1_IMG <span class=hex>(0x8c00)</span>',
  0x8C01: 'COMPRESSED_RGB_PVRTC_2BPPV1_IMG <span class=hex>(0x8c01)</span>',
  0x8C02: 'COMPRESSED_RGBA_PVRTC_4BPPV1_IMG <span class=hex>(0x8c02)</span>',
  0x8C03: 'COMPRESSED_RGBA_PVRTC_2BPPV1_IMG <span class=hex>(0x8c03)</span>',
  0x8D64: 'COMPRESSED_RGB_ETC1_WEBGL <span class=hex>(0x8d64)</span>',
  0x8864: 'QUERY_COUNTER_BITS_EXT <span class=hex>(0x8864)</span>',
  0x8865: 'CURRENT_QUERY_EXT <span class=hex>(0x8865)</span>',
  0x8866: 'QUERY_RESULT_EXT <span class=hex>(0x8866)</span>',
  0x8867: 'QUERY_RESULT_AVAILABLE_EXT <span class=hex>(0x8867)</span>',
  0x88bf: 'TIME_ELAPSED_EXT <span class=hex>(0x88bf)</span>',
  0x8e28: 'TIMESTAMP_EXT <span class=hex>(0x8e28)</span>',
  0x8FBB: 'GPU_DISJOINT_EXT <span class=hex>(0x8fbb)</span>',
  0x9270: 'COMPRESSED_R11_EAC <span class=hex>(0x9270)</span>',
  0x9271: 'COMPRESSED_SIGNED_R11_EAC <span class=hex>(0x9271)</span>',
  0x9272: 'COMPRESSED_RG11_EAC <span class=hex>(0x9272)</span>',
  0x9273: 'COMPRESSED_SIGNED_RG11_EAC <span class=hex>(0x9273)</span>',
  0x9274: 'COMPRESSED_RGB8_ETC2 <span class=hex>(0x9274)</span>',
  0x9275: 'COMPRESSED_SRGB8_ETC2 <span class=hex>(0x9275)</span>',
  0x9276: 'COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2 <span class=hex>(0x9276)</span>',
  0x9277: 'COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2 <span class=hex>(0x9277)</span>',
  0x9278: 'COMPRESSED_RGBA8_ETC2_EAC <span class=hex>(0x9278)</span>',
  0x9279: 'COMPRESSED_SRGB8_ALPHA8_ETC2_EAC <span class=hex>(0x9279)</span>',
  0x93B0: 'COMPRESSED_RGBA_ASTC_4x4_KHR <span class=hex>(0x93b0)</span>',
  0x93B1: 'COMPRESSED_RGBA_ASTC_5x4_KHR <span class=hex>(0x93b1)</span>',
  0x93B2: 'COMPRESSED_RGBA_ASTC_5x5_KHR <span class=hex>(0x93b2)</span>',
  0x93B3: 'COMPRESSED_RGBA_ASTC_6x5_KHR <span class=hex>(0x93b3)</span>',
  0x93B4: 'COMPRESSED_RGBA_ASTC_6x6_KHR <span class=hex>(0x93b4)</span>',
  0x93B5: 'COMPRESSED_RGBA_ASTC_8x5_KHR <span class=hex>(0x93b5)</span>',
  0x93B6: 'COMPRESSED_RGBA_ASTC_8x6_KHR <span class=hex>(0x93b6)</span>',
  0x93B7: 'COMPRESSED_RGBA_ASTC_8x8_KHR <span class=hex>(0x93b7)</span>',
  0x93B8: 'COMPRESSED_RGBA_ASTC_10x5_KHR <span class=hex>(0x93b8)</span>',
  0x93B9: 'COMPRESSED_RGBA_ASTC_10x6_KHR <span class=hex>(0x93b9)</span>',
  0x93BA: 'COMPRESSED_RGBA_ASTC_10x8_KHR <span class=hex>(0x93ba)</span>',
  0x93BB: 'COMPRESSED_RGBA_ASTC_10x10_KHR <span class=hex>(0x93bb)</span>',
  0x93BC: 'COMPRESSED_RGBA_ASTC_12x10_KHR <span class=hex>(0x93bc)</span>',
  0x93BD: 'COMPRESSED_RGBA_ASTC_12x12_KHR <span class=hex>(0x93bd)</span>',
  0x93D0: 'COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR <span class=hex>(0x93d0)</span>',
  0x93D1: 'COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR <span class=hex>(0x93d1)</span>',
  0x93D2: 'COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR <span class=hex>(0x93d2)</span>',
  0x93D3: 'COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR <span class=hex>(0x93d3)</span>',
  0x93D4: 'COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR <span class=hex>(0x93d4)</span>',
  0x93D5: 'COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR <span class=hex>(0x93d5)</span>',
  0x93D6: 'COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR <span class=hex>(0x93d6)</span>',
  0x93D7: 'COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR <span class=hex>(0x93d7)</span>',
  0x93D8: 'COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR <span class=hex>(0x93d8)</span>',
  0x93D9: 'COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR <span class=hex>(0x93d9)</span>',
  0x93DA: 'COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR <span class=hex>(0x93da)</span>',
  0x93DB: 'COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR <span class=hex>(0x93db)</span>',
  0x93DC: 'COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR <span class=hex>(0x93dc)</span>',
  0x93DD: 'COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR <span class=hex>(0x93dd)</span>',
  0x8C4C: 'COMPRESSED_SRGB_S3TC_DXT1_EXT <span class=hex>(0x8c4c)</span>',
  0x8C4D: 'COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT <span class=hex>(0x8c4d)</span>',
  0x8C4E: 'COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT <span class=hex>(0x8c4e)</span>',
  0x8C4F: 'COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT <span class=hex>(0x8c4f)</span>',
  0x9630: 'FRAMEBUFFER_ATTACHMENT_TEXTURE_NUM_VIEWS_OVR <span class=hex>(0x9630)</span>',
  0x9632: 'FRAMEBUFFER_ATTACHMENT_TEXTURE_BASE_VIEW_INDEX_OVR <span class=hex>(0x9632)</span>',
  0x9631: 'MAX_VIEWS_OVR <span class=hex>(0x9631)</span>',
  0x9633: 'FRAMEBUFFER_INCOMPLETE_VIEW_TARGETS_OVR <span class=hex>(0x9633)</span>',
  0x91B1: 'COMPLETION_STATUS_KHR <span class=hex>(0x91b1)</span>',
  0x8E8C: 'COMPRESSED_RGBA_BPTC_UNORM_EXT <span class=hex>(0x8e8c)</span>',
  0x8E8D: 'COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT <span class=hex>(0x8e8d)</span>',
  0x8E8E: 'COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT <span class=hex>(0x8e8e)</span>',
  0x8E8F: 'COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT <span class=hex>(0x8e8f)</span>',
  0x8DBB: 'COMPRESSED_RED_RGTC1_EXT <span class=hex>(0x8dbb)</span>',
  0x8DBC: 'COMPRESSED_SIGNED_RED_RGTC1_EXT <span class=hex>(0x8dbc)</span>',
  0x8DBD: 'COMPRESSED_RED_GREEN_RGTC2_EXT <span class=hex>(0x8dbd)</span>',
  0x8DBE: 'COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT <span class=hex>(0x8dbe)</span>',
  0x822A: 'R16_EXT <span class=hex>(0x822a)</span>',
  0x822C: 'RG16_EXT <span class=hex>(0x822c)</span>',
  0x8054: 'RGB16_EXT <span class=hex>(0x8054)</span>',
  0x805B: 'RGBA16_EXT <span class=hex>(0x805b)</span>',
  0x8F98: 'R16_SNORM_EXT <span class=hex>(0x8f98)</span>',
  0x8F99: 'RG16_SNORM_EXT <span class=hex>(0x8f99)</span>',
  0x8F9A: 'RGB16_SNORM_EXT <span class=hex>(0x8f9a)</span>',
  0x8F9B: 'RGBA16_SNORM_EXT <span class=hex>(0x8f9b)</span>',
},
webGLFunctions: {
  'getContextAttributes': { 'ret': 'WebGLContextAttributes', 'args': [], 'argNames': [] },
  'isContextLost': { 'ret': 'b', 'args': [], 'argNames': [] },
  'getSupportedExtensions': { 'ret': 's*', 'args': [], 'argNames': [] },
  'getExtension': { 'ret': 'o', 'args': ['s'], 'argNames': ['name'] },
  'activeTexture': { 'args': ['ul'], 'argNames': ['texture'] },
  'attachShader': { 'args': ['WebGLProgram', 'WebGLShader'], 'argNames': ['program', 'shader'] },
  'bindAttribLocation': { 'args': ['WebGLProgram', 'ul', 's'], 'argNames': ['program', 'index', 'name'] },
  'bindBuffer': { 'args': ['ul', 'WebGLBuffer'], 'argNames': ['target', 'buffer'] },
  'bindFramebuffer': { 'args': ['ul', 'WebGLFramebuffer'], 'argNames': ['target', 'framebuffer'] },
  'bindRenderbuffer': { 'args': ['ul', 'WebGLRenderbuffer'], 'argNames': ['target', 'renderbuffer'] },
  'bindTexture': { 'args': ['ul', 'WebGLTexture'], 'argNames': ['target', 'texture'] },
  'blendColor': { 'args': ['f', 'f', 'f', 'f'], 'argNames': ['red', 'green', 'blue', 'alpha'] },
  'blendEquation': { 'args': ['ul'], 'argNames': ['mode'] },
  'blendEquationSeparate': { 'args': ['ul', 'ul'], 'argNames': ['modeRGB', 'modeAlpha'] },
  'blendFunc': { 'args': ['ul', 'ul'], 'argNames': ['sfactor', 'dfactor'] },
  'blendFuncSeparate': { 'args': ['ul', 'ul', 'ul', 'ul'], 'argNames': ['srcRGB', 'dstRGB', 'srcAlpha', 'dstAlpha'] },
  'checkFramebufferStatus': { 'ret': 'ul', 'args': ['ul'], 'argNames': ['target'] },
  'clear': { 'args': ['ul'], 'argNames': ['mask'] },
  'clearColor': { 'args': ['f', 'f', 'f', 'f'], 'argNames': ['red', 'green', 'blue', 'alpha'] },
  'clearDepth': { 'args': ['f'], 'argNames': ['depth'] },
  'clearStencil': { 'args': ['l'], 'argNames': ['s'] },
  'colorMask': { 'args': ['b', 'b', 'b', 'b'], 'argNames': ['red', 'green', 'blue', 'alpha'] },
  'compileShader': { 'args': ['WebGLShader'], 'argNames': ['shader'] },
  'copyTexImage2D': { 'args': ['ul', 'l', 'ul', 'l', 'l', 'l', 'l', 'l'], 'argNames': ['target', 'level', 'internalformat', 'x', 'y', 'width', 'height', 'border'] },
  'copyTexSubImage2D': { 'args': ['ul', 'l', 'l', 'l', 'l', 'l', 'l', 'l'], 'argNames': ['target', 'level', 'xoffset', 'yoffset', 'x', 'y', 'width', 'height'] },
  'createBuffer': { 'ret': 'WebGLBuffer', 'args': [], 'argNames': [] },
  'createFramebuffer': { 'ret': 'WebGLFramebuffer', 'args': [], 'argNames': [] },
  'createProgram': { 'ret': 'WebGLProgram', 'args': [], 'argNames': [] },
  'createRenderbuffer': { 'ret': 'WebGLRenderbuffer', 'args': [], 'argNames': [] },
  'createShader': { 'ret': 'WebGLShader', 'args': ['ul'], 'argNames': ['type'] },
  'createTexture': { 'ret': 'WebGLTexture', 'args': [], 'argNames': [] },
  'cullFace': { 'args': ['ul'], 'argNames': ['mode'] },
  'deleteBuffer': { 'args': ['WebGLBuffer'], 'argNames': ['buffer'] },
  'deleteFramebuffer': { 'args': ['WebGLFramebuffer'], 'argNames': ['framebuffer'] },
  'deleteProgram': { 'args': ['WebGLProgram'], 'argNames': ['program'] },
  'deleteRenderbuffer': { 'args': ['WebGLRenderbuffer'], 'argNames': ['renderbuffer'] },
  'deleteShader': { 'args': ['WebGLShader'], 'argNames': ['shader'] },
  'deleteTexture': { 'args': ['WebGLTexture'], 'argNames': ['texture'] },
  'depthFunc': { 'args': ['ul'], 'argNames': ['func'] },
  'depthMask': { 'args': ['b'], 'argNames': ['flag'] },
  'depthRange': { 'args': ['f', 'f'], 'argNames': ['zNear', 'zFar'] },
  'detachShader': { 'args': ['WebGLProgram', 'WebGLShader'], 'argNames': ['program', 'shader'] },
  'disable': { 'args': ['ul'], 'argNames': ['cap'] },
  'disableVertexAttribArray': { 'args': ['ul'], 'argNames': ['index'] },
  'drawArrays': { 'args': ['ul', 'l', 'l'], 'argNames': ['mode', 'first', 'count'] },
  'drawElements': { 'args': ['ul', 'l', 'ul', 'll'], 'argNames': ['mode', 'count', 'type', 'offset'] },
  'enable': { 'args': ['ul'], 'argNames': ['cap'] },
  'enableVertexAttribArray': { 'args': ['ul'], 'argNames': ['index'] },
  'finish': { 'args': [], 'argNames': [] },
  'flush': { 'args': [], 'argNames': [] },
  'framebufferRenderbuffer': { 'args': ['ul', 'ul', 'ul', 'WebGLRenderbuffer'], 'argNames': ['target', 'attachment', 'renderbuffertarget', 'renderbuffer'] },
  'framebufferTexture2D': { 'args': ['ul', 'ul', 'ul', 'WebGLTexture', 'l'], 'argNames': ['target', 'attachment', 'textarget', 'texture', 'level'] },
  'frontFace': { 'args': ['ul'], 'argNames': ['mode'] },
  'generateMipmap': { 'args': ['ul'], 'argNames': ['target'] },
  'getActiveAttrib': { 'ret': 'WebGLActiveInfo', 'args': ['WebGLProgram', 'ul'], 'argNames': ['program', 'index'] },
  'getActiveUniform': { 'ret': 'WebGLActiveInfo', 'args': ['WebGLProgram', 'ul'], 'argNames': ['program', 'index'] },
  'getAttachedShaders': { 'ret': 'WebGLShaderSequence', 'args': ['WebGLProgram'], 'argNames': ['program'] },
  'getAttribLocation': { 'ret': 'l', 'args': ['WebGLProgram', 's'], 'argNames': ['program', 'name'] },
  'getBufferParameter': { 'ret': '?', 'args': ['ul', 'ul'], 'argNames': ['target', 'pname'] },
  'getParameter': { 'ret': '?', 'args': ['ul'], 'argNames': ['pname'] },
  'getError': { 'ret': 'ul', 'args': [], 'argNames': [] },
  'getFramebufferAttachmentParameter': { 'ret': '?', 'args': ['ul', 'ul', 'ul'], 'argNames': ['target', 'attachment', 'pname'] },
  'getProgramParameter': { 'ret': '?', 'args': ['WebGLProgram', 'ul'], 'argNames': ['program', 'pname'] },
  'getProgramInfoLog': { 'ret': 's', 'args': ['WebGLProgram'], 'argNames': ['program'] },
  'getRenderbufferParameter': { 'ret': '?', 'args': ['ul', 'ul'], 'argNames': ['target', 'pname'] },
  'getShaderParameter': { 'ret': '?', 'args': ['WebGLShader', 'ul'], 'argNames': ['shader', 'pname'] },
  'getShaderPrecisionFormat': { 'ret': 'WebGLShaderPrecisionFormat', 'args': ['ul', 'ul'], 'argNames': ['shadertype', 'precisiontype'] },
  'getShaderInfoLog': { 'ret': 's', 'args': ['WebGLShader'], 'argNames': ['shader'] },
  'getShaderSource': { 'ret': 's', 'args': ['WebGLShader'], 'argNames': ['shader'] },
  'getTexParameter': { 'ret': '?', 'args': ['ul', 'ul'], 'argNames': ['target', 'pname'] },
  'getUniform': { 'ret': '?', 'args': ['WebGLProgram', 'WebGLUniformLocation'], 'argNames': ['program', 'location'] },
  'getUniformLocation': { 'ret': 'WebGLUniformLocation', 'args': ['WebGLProgram', 's'], 'argNames': ['program', 'name'] },
  'getVertexAttrib': { 'ret': '?', 'args': ['ul', 'ul'], 'argNames': ['index', 'pname'] },
  'getVertexAttribOffset': { 'ret': 'll', 'args': ['ul', 'ul'], 'argNames': ['index', 'pname'] },
  'hint': { 'args': ['ul', 'ul'], 'argNames': ['target', 'mode'] },
  'isBuffer': { 'ret': 'b', 'args': ['WebGLBuffer'], 'argNames': ['buffer'] },
  'isEnabled': { 'ret': 'b', 'args': ['ul'], 'argNames': ['cap'] },
  'isFramebuffer': { 'ret': 'b', 'args': ['WebGLFramebuffer'], 'argNames': ['framebuffer'] },
  'isProgram': { 'ret': 'b', 'args': ['WebGLProgram'], 'argNames': ['program'] },
  'isRenderbuffer': { 'ret': 'b', 'args': ['WebGLRenderbuffer'], 'argNames': ['renderbuffer'] },
  'isShader': { 'ret': 'b', 'args': ['WebGLShader'], 'argNames': ['shader'] },
  'isTexture': { 'ret': 'b', 'args': ['WebGLTexture'], 'argNames': ['texture'] },
  'lineWidth': { 'args': ['f'], 'argNames': ['width'] },
  'linkProgram': { 'args': ['WebGLProgram'], 'argNames': ['program'] },
  'pixelStorei': { 'args': ['ul', 'l'], 'argNames': ['pname', 'param'] },
  'polygonOffset': { 'args': ['f', 'f'], 'argNames': ['factor', 'units'] },
  'renderbufferStorage': { 'args': ['ul', 'ul', 'l', 'l'], 'argNames': ['target', 'internalformat', 'width', 'height'] },
  'sampleCoverage': { 'args': ['f', 'b'], 'argNames': ['value', 'invert'] },
  'scissor': { 'args': ['l', 'l', 'l', 'l'], 'argNames': ['x', 'y', 'width', 'height'] },
  'shaderSource': { 'args': ['WebGLShader', 's'], 'argNames': ['shader', 'source'] },
  'stencilFunc': { 'args': ['ul', 'l', 'ul'], 'argNames': ['func', 'ref', 'mask'] },
  'stencilFuncSeparate': { 'args': ['ul', 'ul', 'l', 'ul'], 'argNames': ['face', 'func', 'ref', 'mask'] },
  'stencilMask': { 'args': ['ul'], 'argNames': ['mask'] },
  'stencilMaskSeparate': { 'args': ['ul', 'ul'], 'argNames': ['face', 'mask'] },
  'stencilOp': { 'args': ['ul', 'ul', 'ul'], 'argNames': ['fail', 'zfail', 'zpass'] },
  'stencilOpSeparate': { 'args': ['ul', 'ul', 'ul', 'ul'], 'argNames': ['face', 'fail', 'zfail', 'zpass'] },
  'texParameterf': { 'args': ['ul', 'ul', 'f'], 'argNames': ['target', 'pname', 'param'] },
  'texParameteri': { 'args': ['ul', 'ul', 'l'], 'argNames': ['target', 'pname', 'param'] },
  'uniform1f': { 'args': ['WebGLUniformLocation', 'f'], 'argNames': ['location', 'x'] },
  'uniform2f': { 'args': ['WebGLUniformLocation', 'f', 'f'], 'argNames': ['location', 'x', 'y'] },
  'uniform3f': { 'args': ['WebGLUniformLocation', 'f', 'f', 'f'], 'argNames': ['location', 'x', 'y', 'z'] },
  'uniform4f': { 'args': ['WebGLUniformLocation', 'f', 'f', 'f', 'f'], 'argNames': ['location', 'x', 'y', 'z', 'w'] },
  'uniform1i': { 'args': ['WebGLUniformLocation', 'l'], 'argNames': ['location', 'x'] },
  'uniform2i': { 'args': ['WebGLUniformLocation', 'l', 'l'], 'argNames': ['location', 'x', 'y'] },
  'uniform3i': { 'args': ['WebGLUniformLocation', 'l', 'l', 'l'], 'argNames': ['location', 'x', 'y', 'z'] },
  'uniform4i': { 'args': ['WebGLUniformLocation', 'l', 'l', 'l', 'l'], 'argNames': ['location', 'x', 'y', 'z', 'w'] },
  'useProgram': { 'args': ['WebGLProgram'], 'argNames': ['program'] },
  'validateProgram': { 'args': ['WebGLProgram'], 'argNames': ['program'] },
  'vertexAttrib1f': { 'args': ['ul', 'f'], 'argNames': ['index', 'x'] },
  'vertexAttrib2f': { 'args': ['ul', 'f', 'f'], 'argNames': ['index', 'x', 'y'] },
  'vertexAttrib3f': { 'args': ['ul', 'f', 'f', 'f'], 'argNames': ['index', 'x', 'y', 'z'] },
  'vertexAttrib4f': { 'args': ['ul', 'f', 'f', 'f', 'f'], 'argNames': ['index', 'x', 'y', 'z', 'w'] },
  'vertexAttrib1fv': { 'args': ['ul', 'f*'], 'argNames': ['index', 'values'] },
  'vertexAttrib2fv': { 'args': ['ul', 'f*'], 'argNames': ['index', 'values'] },
  'vertexAttrib3fv': { 'args': ['ul', 'f*'], 'argNames': ['index', 'values'] },
  'vertexAttrib4fv': { 'args': ['ul', 'f*'], 'argNames': ['index', 'values'] },
  'vertexAttribPointer': { 'args': ['ul', 'l', 'ul', 'b', 'l', 'll'], 'argNames': ['index', 'size', 'type', 'normalized', 'stride', 'offset'] },
  'viewport': { 'args': ['l', 'l', 'l', 'l'], 'argNames': ['x', 'y', 'width', 'height'] },
  '3bufferData': { 'args': ['ul', 'u8*', 'ul'], 'argNames': ['target', 'srcData', 'usage'] },
  '5bufferData': { 'args': ['ul', 'u8*', 'ul', 'ul', 'ul'], 'argNames': ['target', 'srcData', 'usage', 'srcOffset', 'length'] },
  '3bufferSubData': { 'args': ['ul', 'll', 'u8*'], 'argNames': ['target', 'dstByteOffset', 'srcData'] },
  '5bufferSubData': { 'args': ['ul', 'll', 'u8*', 'ul', 'ul'], 'argNames': ['target', 'dstByteOffset', 'srcData', 'srcOffset', 'length'] },
  '7compressedTexImage2D': { 'args': ['ul', 'l', 'ul', 'l', 'l', 'l', 'u8*'], 'argNames': ['target', 'level', 'internalformat', 'width', 'height', 'border', 'data'] },
  '8compressedTexImage2D': { 'args': ['ul', 'l', 'ul', 'l', 'l', 'l', 'l', 'll'], 'argNames': ['target', 'level', 'internalformat', 'width', 'height', 'border', 'imageSize', 'offset'] },
  '9compressedTexImage2D': { 'args': ['ul', 'l', 'ul', 'l', 'l', 'l', 'u8*', 'ul', 'ul'], 'argNames': ['target', 'level', 'internalformat', 'width', 'height', 'border', 'srcData', 'srcOffset', 'srcLengthOverride'] },
  '8compressedTexSubImage2D': { 'args': ['ul', 'l', 'l', 'l', 'l', 'l', 'ul', 'u8*'], 'argNames': ['target', 'level', 'xoffset', 'yoffset', 'width', 'height', 'format', 'data'] },
  '9compressedTexSubImage2D': { 'args': ['ul', 'l', 'l', 'l', 'l', 'l', 'ul', 'l', 'll'], 'argNames': ['target', 'level', 'xoffset', 'yoffset', 'width', 'height', 'format', 'imageSize', 'offset'] },
  '10compressedTexSubImage2D': { 'args': ['ul', 'l', 'l', 'l', 'l', 'l', 'ul', 'u8*', 'ul', 'ul'], 'argNames': ['target', 'level', 'xoffset', 'yoffset', 'width', 'height', 'format', 'srcData', 'srcOffset', 'srcLengthOverride'] },
  '7readPixels': { 'args': ['l', 'l', 'l', 'l', 'ul', 'ul', 'll'], 'argNames': ['x', 'y', 'width', 'height', 'format', 'type', 'offset'] },
  '8readPixels': { 'args': ['l', 'l', 'l', 'l', 'ul', 'ul', 'u8*', 'ul'], 'argNames': ['x', 'y', 'width', 'height', 'format', 'type', 'dstData', 'dstOffset'] },
  '9texImage2D': { 'args': ['ul', 'l', 'l', 'l', 'l', 'l', 'ul', 'ul', 'img'], 'argNames': ['target', 'level', 'internalformat', 'width', 'height', 'border', 'format', 'type', 'source'] },
  '6texImage2D': { 'args': ['ul', 'l', 'l', 'ul', 'ul', 'img'], 'argNames': ['target', 'level', 'internalformat', 'format', 'type', 'source'] },
  '10texImage2D': { 'args': ['ul', 'l', 'l', 'l', 'l', 'l', 'ul', 'ul', 'u8*', 'ul'], 'argNames': ['target', 'level', 'internalformat', 'width', 'height', 'border', 'format', 'type', 'srcData', 'srcOffset'] },
  '9texSubImage2D': { 'args': ['ul', 'l', 'l', 'l', 'l', 'l', 'ul', 'ul', 'img'], 'argNames': ['target', 'level', 'xoffset', 'yoffset', 'width', 'height', 'format', 'type', 'source'] },
  '7texSubImage2D': { 'args': ['ul', 'l', 'l', 'l', 'ul', 'ul', 'img'], 'argNames': ['target', 'level', 'xoffset', 'yoffset', 'format', 'type', 'source'] },
  '10texSubImage2D': { 'args': ['ul', 'l', 'l', 'l', 'l', 'l', 'ul', 'ul', 'u8*', 'ul'], 'argNames': ['target', 'level', 'xoffset', 'yoffset', 'width', 'height', 'format', 'type', 'srcData', 'srcOffset'] },
  '2uniform1fv': { 'args': ['WebGLUniformLocation', 'f*'], 'argNames': ['location', 'v'] },
  '4uniform1fv': { 'args': ['WebGLUniformLocation', 'f*', 'ul', 'ul'], 'argNames': ['location', 'data', 'srcOffset', 'srcLength'] },
  '2uniform2fv': { 'args': ['WebGLUniformLocation', 'f*'], 'argNames': ['location', 'v'] },
  '4uniform2fv': { 'args': ['WebGLUniformLocation', 'f*', 'ul', 'ul'], 'argNames': ['location', 'data', 'srcOffset', 'srcLength'] },
  '2uniform3fv': { 'args': ['WebGLUniformLocation', 'f*'], 'argNames': ['location', 'v'] },
  '4uniform3fv': { 'args': ['WebGLUniformLocation', 'f*', 'ul', 'ul'], 'argNames': ['location', 'data', 'srcOffset', 'srcLength'] },
  '2uniform4fv': { 'args': ['WebGLUniformLocation', 'f*'], 'argNames': ['location', 'v'] },
  '4uniform4fv': { 'args': ['WebGLUniformLocation', 'f*', 'ul', 'ul'], 'argNames': ['location', 'data', 'srcOffset', 'srcLength'] },
  '2uniform1iv': { 'args': ['WebGLUniformLocation', 'i*'], 'argNames': ['location', 'v'] },
  '4uniform1iv': { 'args': ['WebGLUniformLocation', 'i*', 'ul', 'ul'], 'argNames': ['location', 'data', 'srcOffset', 'srcLength'] },
  '2uniform2iv': { 'args': ['WebGLUniformLocation', 'i*'], 'argNames': ['location', 'v'] },
  '4uniform2iv': { 'args': ['WebGLUniformLocation', 'i*', 'ul', 'ul'], 'argNames': ['location', 'data', 'srcOffset', 'srcLength'] },
  '2uniform3iv': { 'args': ['WebGLUniformLocation', 'i*'], 'argNames': ['location', 'v'] },
  '4uniform3iv': { 'args': ['WebGLUniformLocation', 'i*', 'ul', 'ul'], 'argNames': ['location', 'data', 'srcOffset', 'srcLength'] },
  '2uniform4iv': { 'args': ['WebGLUniformLocation', 'i*'], 'argNames': ['location', 'v'] },
  '4uniform4iv': { 'args': ['WebGLUniformLocation', 'i*', 'ul', 'ul'], 'argNames': ['location', 'data', 'srcOffset', 'srcLength'] },
  '3uniformMatrix2fv': { 'args': ['WebGLUniformLocation', 'b', 'f*'], 'argNames': ['location', 'transpose', 'value'] },
  '5uniformMatrix2fv': { 'args': ['WebGLUniformLocation', 'b', 'f*', 'ul', 'ul'], 'argNames': ['location', 'transpose', 'data', 'srcOffset', 'srcLength'] },
  '3uniformMatrix3fv': { 'args': ['WebGLUniformLocation', 'b', 'f*'], 'argNames': ['location', 'transpose', 'value'] },
  '5uniformMatrix3fv': { 'args': ['WebGLUniformLocation', 'b', 'f*', 'ul', 'ul'], 'argNames': ['location', 'transpose', 'data', 'srcOffset', 'srcLength'] },
  '3uniformMatrix4fv': { 'args': ['WebGLUniformLocation', 'b', 'f*'], 'argNames': ['location', 'transpose', 'value'] },
  '5uniformMatrix4fv': { 'args': ['WebGLUniformLocation', 'b', 'f*', 'ul', 'ul'], 'argNames': ['location', 'transpose', 'data', 'srcOffset', 'srcLength'] },
  'copyBufferSubData': { 'args': ['ul', 'ul', 'll', 'll', 'll'], 'argNames': ['readTarget', 'writeTarget', 'readOffset', 'writeOffset', 'size'] },
  'getBufferSubData': { 'args': ['ul', 'll', 'u8*', 'ul', 'ul'], 'argNames': ['target', 'srcByteOffset', 'dstBuffer', 'dstOffset', 'length'] },
  'blitFramebuffer': { 'args': ['l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'ul', 'ul'], 'argNames': ['srcX0', 'srcY0', 'srcX1', 'srcY1', 'dstX0', 'dstY0', 'dstX1', 'dstY1', 'mask', 'filter'] },
  'framebufferTextureLayer': { 'args': ['ul', 'ul', 'WebGLTexture', 'l', 'l'], 'argNames': ['target', 'attachment', 'texture', 'level', 'layer'] },
  'invalidateFramebuffer': { 'args': ['ul', 'ul*'], 'argNames': ['target', 'attachments'] },
  'invalidateSubFramebuffer': { 'args': ['ul', 'ul*', 'l', 'l', 'l', 'l'], 'argNames': ['target', 'attachments', 'x', 'y', 'width', 'height'] },
  'readBuffer': { 'args': ['ul'], 'argNames': ['src'] },
  'getInternalformatParameter': { 'ret': '?', 'args': ['ul', 'ul', 'ul'], 'argNames': ['target', 'internalformat', 'pname'] },
  'renderbufferStorageMultisample': { 'args': ['ul', 'l', 'ul', 'l', 'l'], 'argNames': ['target', 'samples', 'internalformat', 'width', 'height'] },
  'texStorage2D': { 'args': ['ul', 'l', 'ul', 'l', 'l'], 'argNames': ['target', 'levels', 'internalformat', 'width', 'height'] },
  'texStorage3D': { 'args': ['ul', 'l', 'ul', 'l', 'l', 'l'], 'argNames': ['target', 'levels', 'internalformat', 'width', 'height', 'depth'] },
  '10texImage3D': { 'args': ['ul', 'l', 'l', 'l', 'l', 'l', 'l', 'ul', 'ul', 'u8*'], 'argNames': ['target', 'level', 'internalformat', 'width', 'height', 'depth', 'border', 'format', 'type', 'srcData'] },
  '11texImage3D': { 'args': ['ul', 'l', 'l', 'l', 'l', 'l', 'l', 'ul', 'ul', 'u8*', 'ul'], 'argNames': ['target', 'level', 'internalformat', 'width', 'height', 'depth', 'border', 'format', 'type', 'srcData', 'srcOffset'] },
  '11texSubImage3D': { 'args': ['ul', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'ul', 'ul', 'img'], 'argNames': ['target', 'level', 'xoffset', 'yoffset', 'zoffset', 'width', 'height', 'depth', 'format', 'type', 'source'] },
  '12texSubImage3D': { 'args': ['ul', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'ul', 'ul', 'u8*', 'ul'], 'argNames': ['target', 'level', 'xoffset', 'yoffset', 'zoffset', 'width', 'height', 'depth', 'format', 'type', 'srcData', 'srcOffset'] },
  'copyTexSubImage3D': { 'args': ['ul', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l'], 'argNames': ['target', 'level', 'xoffset', 'yoffset', 'zoffset', 'x', 'y', 'width', 'height'] },
  '9compressedTexImage3D': { 'args': ['ul', 'l', 'ul', 'l', 'l', 'l', 'l', 'l', 'll'], 'argNames': ['target', 'level', 'internalformat', 'width', 'height', 'depth', 'border', 'imageSize', 'offset'] },
  '10compressedTexImage3D': { 'args': ['ul', 'l', 'ul', 'l', 'l', 'l', 'l', 'u8*', 'ul', 'ul'], 'argNames': ['target', 'level', 'internalformat', 'width', 'height', 'depth', 'border', 'srcData', 'srcOffset', 'srcLengthOverride'] },
  '11compressedTexSubImage3D': { 'args': ['ul', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'ul', 'l', 'll'], 'argNames': ['target', 'level', 'xoffset', 'yoffset', 'zoffset', 'width', 'height', 'depth', 'format', 'imageSize', 'offset'] },
  '12compressedTexSubImage3D': { 'args': ['ul', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'ul', 'u8*', 'ul', 'ul'], 'argNames': ['target', 'level', 'xoffset', 'yoffset', 'zoffset', 'width', 'height', 'depth', 'format', 'srcData', 'srcOffset', 'srcLengthOverride'] },
  'getFragDataLocation': { 'ret': 'l', 'args': ['WebGLProgram', 's'], 'argNames': ['program', 'name'] },
  'uniform1ui': { 'args': ['WebGLUniformLocation', 'ul'], 'argNames': ['location', 'v0'] },
  'uniform2ui': { 'args': ['WebGLUniformLocation', 'ul', 'ul'], 'argNames': ['location', 'v0', 'v1'] },
  'uniform3ui': { 'args': ['WebGLUniformLocation', 'ul', 'ul', 'ul'], 'argNames': ['location', 'v0', 'v1', 'v2'] },
  'uniform4ui': { 'args': ['WebGLUniformLocation', 'ul', 'ul', 'ul', 'ul'], 'argNames': ['location', 'v0', 'v1', 'v2', 'v3'] },
  'uniform1uiv': { 'args': ['WebGLUniformLocation', 'u*', 'ul', 'ul'], 'argNames': ['location', 'data', 'srcOffset', 'srcLength'] },
  'uniform2uiv': { 'args': ['WebGLUniformLocation', 'u*', 'ul', 'ul'], 'argNames': ['location', 'data', 'srcOffset', 'srcLength'] },
  'uniform3uiv': { 'args': ['WebGLUniformLocation', 'u*', 'ul', 'ul'], 'argNames': ['location', 'data', 'srcOffset', 'srcLength'] },
  'uniform4uiv': { 'args': ['WebGLUniformLocation', 'u*', 'ul', 'ul'], 'argNames': ['location', 'data', 'srcOffset', 'srcLength'] },
  'uniformMatrix3x2fv': { 'args': ['WebGLUniformLocation', 'b', 'f*', 'ul', 'ul'], 'argNames': ['location', 'transpose', 'data', 'srcOffset', 'srcLength'] },
  'uniformMatrix4x2fv': { 'args': ['WebGLUniformLocation', 'b', 'f*', 'ul', 'ul'], 'argNames': ['location', 'transpose', 'data', 'srcOffset', 'srcLength'] },
  'uniformMatrix2x3fv': { 'args': ['WebGLUniformLocation', 'b', 'f*', 'ul', 'ul'], 'argNames': ['location', 'transpose', 'data', 'srcOffset', 'srcLength'] },
  'uniformMatrix4x3fv': { 'args': ['WebGLUniformLocation', 'b', 'f*', 'ul', 'ul'], 'argNames': ['location', 'transpose', 'data', 'srcOffset', 'srcLength'] },
  'uniformMatrix2x4fv': { 'args': ['WebGLUniformLocation', 'b', 'f*', 'ul', 'ul'], 'argNames': ['location', 'transpose', 'data', 'srcOffset', 'srcLength'] },
  'uniformMatrix3x4fv': { 'args': ['WebGLUniformLocation', 'b', 'f*', 'ul', 'ul'], 'argNames': ['location', 'transpose', 'data', 'srcOffset', 'srcLength'] },
  'vertexAttribI4i': { 'args': ['ul', 'l', 'l', 'l', 'l'], 'argNames': ['index', 'x', 'y', 'z', 'w'] },
  'vertexAttribI4iv': { 'args': ['ul', 'i*'], 'argNames': ['index', 'values'] },
  'vertexAttribI4ui': { 'args': ['ul', 'ul', 'ul', 'ul', 'ul'], 'argNames': ['index', 'x', 'y', 'z', 'w'] },
  'vertexAttribI4uiv': { 'args': ['ul', 'u*'], 'argNames': ['index', 'values'] },
  'vertexAttribIPointer': { 'args': ['ul', 'l', 'ul', 'l', 'll'], 'argNames': ['index', 'size', 'type', 'stride', 'offset'] },
  'vertexAttribDivisor': { 'args': ['ul', 'ul'], 'argNames': ['index', 'divisor'] },
  'drawArraysInstanced': { 'args': ['ul', 'l', 'l', 'l'], 'argNames': ['mode', 'first', 'count', 'instanceCount'] },
  'drawElementsInstanced': { 'args': ['ul', 'l', 'ul', 'll', 'l'], 'argNames': ['mode', 'count', 'type', 'offset', 'instanceCount'] },
  'drawRangeElements': { 'args': ['ul', 'ul', 'ul', 'l', 'ul', 'll'], 'argNames': ['mode', 'start', 'end', 'count', 'type', 'offset'] },
  'drawBuffers': { 'args': ['ul*'], 'argNames': ['buffers'] },
  'clearBufferfv': { 'args': ['ul', 'l', 'f*', 'ul'], 'argNames': ['buffer', 'drawbuffer', 'values', 'srcOffset'] },
  'clearBufferiv': { 'args': ['ul', 'l', 'i*', 'ul'], 'argNames': ['buffer', 'drawbuffer', 'values', 'srcOffset'] },
  'clearBufferuiv': { 'args': ['ul', 'l', 'u*', 'ul'], 'argNames': ['buffer', 'drawbuffer', 'values', 'srcOffset'] },
  'clearBufferfi': { 'args': ['ul', 'l', 'f', 'l'], 'argNames': ['buffer', 'drawbuffer', 'depth', 'stencil'] },
  'createQuery': { 'ret': 'WebGLQuery', 'args': [], 'argNames': [] },
  'deleteQuery': { 'args': ['WebGLQuery'], 'argNames': ['query'] },
  'isQuery': { 'ret': 'b', 'args': ['WebGLQuery'], 'argNames': ['query'] },
  'beginQuery': { 'args': ['ul', 'WebGLQuery'], 'argNames': ['target', 'query'] },
  'endQuery': { 'args': ['ul'], 'argNames': ['target'] },
  'getQuery': { 'ret': 'WebGLQuery', 'args': ['ul', 'ul'], 'argNames': ['target', 'pname'] },
  'getQueryParameter': { 'ret': '?', 'args': ['WebGLQuery', 'ul'], 'argNames': ['query', 'pname'] },
  'createSampler': { 'ret': 'WebGLSampler', 'args': [], 'argNames': [] },
  'deleteSampler': { 'args': ['WebGLSampler'], 'argNames': ['sampler'] },
  'isSampler': { 'ret': 'b', 'args': ['WebGLSampler'], 'argNames': ['sampler'] },
  'bindSampler': { 'args': ['ul', 'WebGLSampler'], 'argNames': ['unit', 'sampler'] },
  'samplerParameteri': { 'args': ['WebGLSampler', 'ul', 'l'], 'argNames': ['sampler', 'pname', 'param'] },
  'samplerParameterf': { 'args': ['WebGLSampler', 'ul', 'f'], 'argNames': ['sampler', 'pname', 'param'] },
  'getSamplerParameter': { 'ret': '?', 'args': ['WebGLSampler', 'ul'], 'argNames': ['sampler', 'pname'] },
  'fenceSync': { 'ret': 'WebGLSync', 'args': ['ul', 'ul'], 'argNames': ['condition', 'flags'] },
  'isSync': { 'ret': 'b', 'args': ['WebGLSync'], 'argNames': ['sync'] },
  'deleteSync': { 'args': ['WebGLSync'], 'argNames': ['sync'] },
  'clientWaitSync': { 'ret': 'ul', 'args': ['WebGLSync', 'ul', 'ull'], 'argNames': ['sync', 'flags', 'timeout'] },
  'waitSync': { 'args': ['WebGLSync', 'ul', 'll'], 'argNames': ['sync', 'flags', 'timeout'] },
  'getSyncParameter': { 'ret': '?', 'args': ['WebGLSync', 'ul'], 'argNames': ['sync', 'pname'] },
  'createTransformFeedback': { 'ret': 'WebGLTransformFeedback', 'args': [], 'argNames': [] },
  'deleteTransformFeedback': { 'args': ['WebGLTransformFeedback'], 'argNames': ['tf'] },
  'isTransformFeedback': { 'ret': 'b', 'args': ['WebGLTransformFeedback'], 'argNames': ['tf'] },
  'bindTransformFeedback': { 'args': ['ul', 'WebGLTransformFeedback'], 'argNames': ['target', 'tf'] },
  'beginTransformFeedback': { 'args': ['ul'], 'argNames': ['primitiveMode'] },
  'endTransformFeedback': { 'args': [], 'argNames': [] },
  'transformFeedbackVaryings': { 'args': ['WebGLProgram', 's*', 'ul'], 'argNames': ['program', 'varyings', 'bufferMode'] },
  'getTransformFeedbackVarying': { 'ret': 'WebGLActiveInfo', 'args': ['WebGLProgram', 'ul'], 'argNames': ['program', 'index'] },
  'pauseTransformFeedback': { 'args': [], 'argNames': [] },
  'resumeTransformFeedback': { 'args': [], 'argNames': [] },
  'bindBufferBase': { 'args': ['ul', 'ul', 'WebGLBuffer'], 'argNames': ['target', 'index', 'buffer'] },
  'bindBufferRange': { 'args': ['ul', 'ul', 'WebGLBuffer', 'll', 'll'], 'argNames': ['target', 'index', 'buffer', 'offset', 'size'] },
  'getIndexedParameter': { 'ret': '?', 'args': ['ul', 'ul'], 'argNames': ['target', 'index'] },
  'getUniformIndices': { 'ret': 'ul*', 'args': ['WebGLProgram', 's*'], 'argNames': ['program', 'uniformNames'] },
  'getActiveUniforms': { 'ret': '?', 'args': ['WebGLProgram', 'ul*', 'ul'], 'argNames': ['program', 'uniformIndices', 'pname'] },
  'getUniformBlockIndex': { 'ret': 'ul', 'args': ['WebGLProgram', 's'], 'argNames': ['program', 'uniformBlockName'] },
  'getActiveUniformBlockParameter': { 'ret': '?', 'args': ['WebGLProgram', 'ul', 'ul'], 'argNames': ['program', 'uniformBlockIndex', 'pname'] },
  'getActiveUniformBlockName': { 'ret': 's', 'args': ['WebGLProgram', 'ul'], 'argNames': ['program', 'uniformBlockIndex'] },
  'uniformBlockBinding': { 'args': ['WebGLProgram', 'ul', 'ul'], 'argNames': ['program', 'uniformBlockIndex', 'uniformBlockBinding'] },
  'createVertexArray': { 'ret': 'WebGLVertexArrayObject', 'args': [], 'argNames': [] },
  'deleteVertexArray': { 'args': ['WebGLVertexArrayObject'], 'argNames': ['vertexArray'] },
  'isVertexArray': { 'ret': 'b', 'args': ['WebGLVertexArrayObject'], 'argNames': ['vertexArray'] },
  'bindVertexArray': { 'args': ['WebGLVertexArrayObject'], 'argNames': ['array'] },
},

  // Debugging and loading functions that codebases should not be calling during rendering.
  debugAndLoadFunctions: ['getContextAttributes','isContextLost','getSupportedExtensions','getExtension','checkFramebufferStatus','finish','flush','getActiveAttrib','getActiveUniform','getAttachedShaders','getAttribLocation','getBufferParameter','getParameter','getError','getFramebufferAttachmentParameter','getProgramParameter','getProgramInfoLog','getRenderbufferParameter','getShaderParameter','getShaderPrecisionFormat','getShaderInfoLog','getShaderSource','getTexParameter','getUniform','getUniformLocation','getVertexAttrib','getVertexAttribOffset','hint','isBuffer','isEnabled','isFramebuffer','isProgram','isRenderbuffer','isShader','isTexture','getBufferSubData','readBuffer','getInternalformatParameter','getFragDataLocation','isQuery','getQuery','isSampler','getSamplerParameter','isSync','getSyncParameter','isTransformFeedback','getTransformFeedbackVarying','getIndexedParameter','getUniformIndices','getActiveUniforms','getUniformBlockIndex','getActiveUniformBlockParameter','getActiveUniformBlockName','isVertexArray','readBuffer','readPixels'],

  // data/resources creation functions
  resourceAllocFunctions: ['compileShader','createBuffer','createFramebuffer','createProgram','createRenderbuffer','createShader','createTexture','deleteBuffer','deleteFramebuffer','deleteProgram','deleteRenderbuffer','deleteShader','deleteTexture','detachShader','framebufferRenderbuffer','framebufferTexture2D','generateMipmap','linkProgram','pixelStorei','renderbufferStorage','shaderSource','texParameterf','texParameteri','validateProgram','framebufferTextureLayer','renderbufferStorageMultisample','texStorage2D','texStorage3D','createQuery','deleteQuery','createSampler','deleteSampler','samplerParameteri','samplerParameterf','deleteSync','createTransformFeedback','deleteTransformFeedback','createVertexArray','deleteVertexArray','bindAttribLocation','attachShader','enableVertexAttribArray','disableVertexAttribArray','vertexAttribPointer','vertexAttribDivisor'],

  // Traditional drawing commands.
  drawCommands: ['drawArrays','drawElements','drawArraysInstanced','drawElementsInstanced','drawRangeElements'],

  // Operations that deal with filling, copying and uploading memory.
  memoryOpCommands: ['clear','copyTexImage2D','copyTexSubImage2D','generateMipmap','bufferData','bufferSubData','compressedTexImage2D','compressedTexSubImage2D','readPixels','copyBufferSubData','blitFramebuffer','invalidateFramebuffer','invalidateSubFramebuffer','copyTexSubImage3D','clearBufferfv','clearBufferiv','clearBufferuiv','clearBufferfi'],

  webGLFunctionClassNames: {},

  calculateWebGLFunctionClassNames: function() {
    this.debugAndLoadFunctions.forEach((f) => { this.webGLFunctionClassNames[f] = 'debugFunction'; });
    this.resourceAllocFunctions.forEach((f) => { this.webGLFunctionClassNames[f] = 'resourceAllocFunction'; });
    this.drawCommands.forEach((f) => { this.webGLFunctionClassNames[f] = 'drawCommand'; });
    this.memoryOpCommands.forEach((f) => { this.webGLFunctionClassNames[f] = 'memoryOpCommand'; });
  },

  // Applies a set of specific fixes/type annotations to certain WebGL functions. This is processed outside the above data so that
  // the IDL generator can stay fully data-driven.
  fixupWebGLIDL: function() {
    var f = this.webGLFunctions;
    f['getError'].ret = 'getError_ret';
    f['getSupportedExtensions'].ret = 'getSupportedExtensions_ret';
    ['drawArrays', 'drawElements', 'drawArraysInstanced', 'drawElementsInstanced', 'drawRangeElements'].forEach((n) => {
      f[n].args[0] = 'drawMode_enum';
    });

    ['texParameteri', 'texParameterf'].forEach((n) => {
      f[n].args[2] = 'texParameter_enumOrNumber';
    });

    f['invalidateFramebuffer'].args[1] = 'e*';
    f['drawBuffers'].args[0] = 'e*';
    f['getParameter'].ret = 'getParameter_ret';
    f['stencilMask'].args[0] = 'hex_u32';
    f['clear'].args[0] = 'clear_arg0';

    ['enableVertexAttribArray', 'disableVertexAttribArray', 'vertexAttribPointer', 'vertexAttribIPointer'].forEach((n) => {
      f[n].args[0] = 'i';
    });
    ['bindBufferBase', 'getActiveUniform', 'getActiveAttrib', 'bindAttribLocation'].forEach((n) => {
      f[n].args[1] = 'i';
    });
    ['4uniform1fv','4uniform2fv','4uniform3fv','4uniform4fv'].forEach((n) => {
      f[n].args[3] = 'i';
    });
    ['5uniformMatrix2fv', '5uniformMatrix3fv', '5uniformMatrix4fv', 'uniformMatrix3x2fv', 'uniformMatrix4x2fv', 'uniformMatrix2x3fv', 'uniformMatrix4x3fv', 'uniformMatrix2x4fv', 'uniformMatrix3x4fv', '5bufferSubData'].forEach((n) => {
      f[n].args[4] = 'i';
    });
  },

  hookWebGLFunction: function(f, ctx) {
    var realf = 'wgld_' + f;
    var this_ = this;
    var sig = this.webGLFunctions[f]; 
    if (!sig) return;
    ctx[realf] = ctx[f];

    // Accessing 'arguments' is super slow, so to avoid overhead, statically reason the number of arguments.

    if (sig.ret) {
      if (f.indexOf('create') == 0 || f == 'getUniformLocation') {
        switch (sig.args.length) {
          case 0: ctx[f] = function webgl_0() { this_.recordFunction(f, f, []); var ret = ctx[realf](); this_.recordCreateFunctionReturn(ret); return ret; }; break;
          case 1: ctx[f] = function webgl_1(a1) { this_.recordFunction(f, f, [a1]); var ret = ctx[realf](a1); this_.recordCreateFunctionReturn(ret); return ret; }; break;
          case 2: ctx[f] = function webgl_2(a1, a2) { this_.recordFunction(f, f, [a1, a2]); var ret = ctx[realf](a1, a2); this_.recordCreateFunctionReturn(ret); return ret; }; break;
          case 3: ctx[f] = function webgl_3(a1, a2, a3) { this_.recordFunction(f, f, [a1, a2, a3]); var ret = ctx[realf](a1, a2, a3); this_.recordCreateFunctionReturn(ret); return ret; }; break;
          case 4: ctx[f] = function webgl_4(a1, a2, a3, a4) { this_.recordFunction(f, f, [a1, a2, a3, a4]); var ret = ctx[realf](a1, a2, a3, a4); this_.recordCreateFunctionReturn(ret); return ret; }; break;
          case 5: ctx[f] = function webgl_5(a1, a2, a3, a4, a5) { this_.recordFunction(f, f, [a1, a2, a3, a4, a5]); var ret = ctx[realf](a1, a2, a3, a4, a5); this_.recordCreateFunctionReturn(ret); return ret; }; break;
          case 6: ctx[f] = function webgl_6(a1, a2, a3, a4, a5, a6) { this_.recordFunction(f, f, [a1, a2, a3, a4, a5, a6]); var ret = ctx[realf](a1, a2, a3, a4, a5, a6); this_.recordCreateFunctionReturn(ret); return ret; }; break;
          case 7: ctx[f] = function webgl_7(a1, a2, a3, a4, a5, a6, a7) { this_.recordFunction(f, f, [a1, a2, a3, a4, a5, a6, a7]); var ret = ctx[realf](a1, a2, a3, a4, a5, a6, a7); this_.recordCreateFunctionReturn(ret); return ret; }; break;
          case 8: ctx[f] = function webgl_8(a1, a2, a3, a4, a5, a6, a7, a8) { this_.recordFunction(f, f, [a1, a2, a3, a4, a5, a6, a7, a8]); var ret = ctx[realf](a1, a2, a3, a4, a5, a6, a7, a8); this_.recordCreateFunctionReturn(ret); return ret; }; break;
          case 9: ctx[f] = function webgl_9(a1, a2, a3, a4, a5, a6, a7, a8, a9) { this_.recordFunction(f, f, [a1, a2, a3, a4, a5, a6, a7, a8, a9]); var ret = ctx[realf](a1, a2, a3, a4, a5, a6, a7, a8, a9); this_.recordCreateFunctionReturn(ret); return ret; }; break;
          case 10: ctx[f] = function webgl_10(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) { this_.recordFunction(f, f, [a1, a2, a3, a4, a5, a6, a7, a8, a9, a10]); var ret = ctx[realf](a1, a2, a3, a4, a5, a6, a7, a8, a9, a10); this_.recordCreateFunctionReturn(ret); return ret; }; break;
          case 11: ctx[f] = function webgl_11(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11) { this_.recordFunction(f, f, [a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11]); var ret = ctx[realf](a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11); this_.recordCreateFunctionReturn(ret); return ret; }; break;
          default: throw 'hookWebGL failed! Unexpected length ' + ctx[realf].length;
        }
      } else {
        switch (sig.args.length) {
          case 0: ctx[f] = function webgl_0() { this_.recordFunction(f, f, []); var ret = ctx[realf](); this_.recordFunctionReturn(ret); return ret; }; break;
          case 1: ctx[f] = function webgl_1(a1) { this_.recordFunction(f, f, [a1]); var ret = ctx[realf](a1); this_.recordFunctionReturn(ret); return ret; }; break;
          case 2: ctx[f] = function webgl_2(a1, a2) { this_.recordFunction(f, f, [a1, a2]); var ret = ctx[realf](a1, a2); this_.recordFunctionReturn(ret); return ret; }; break;
          case 3: ctx[f] = function webgl_3(a1, a2, a3) { this_.recordFunction(f, f, [a1, a2, a3]); var ret = ctx[realf](a1, a2, a3); this_.recordFunctionReturn(ret); return ret; }; break;
          case 4: ctx[f] = function webgl_4(a1, a2, a3, a4) { this_.recordFunction(f, f, [a1, a2, a3, a4]); var ret = ctx[realf](a1, a2, a3, a4); this_.recordFunctionReturn(ret); return ret; }; break;
          case 5: ctx[f] = function webgl_5(a1, a2, a3, a4, a5) { this_.recordFunction(f, f, [a1, a2, a3, a4, a5]); var ret = ctx[realf](a1, a2, a3, a4, a5); this_.recordFunctionReturn(ret); return ret; }; break;
          case 6: ctx[f] = function webgl_6(a1, a2, a3, a4, a5, a6) { this_.recordFunction(f, f, [a1, a2, a3, a4, a5, a6]); var ret = ctx[realf](a1, a2, a3, a4, a5, a6); this_.recordFunctionReturn(ret); return ret; }; break;
          case 7: ctx[f] = function webgl_7(a1, a2, a3, a4, a5, a6, a7) { this_.recordFunction(f, f, [a1, a2, a3, a4, a5, a6, a7]); var ret = ctx[realf](a1, a2, a3, a4, a5, a6, a7); this_.recordFunctionReturn(ret); return ret; }; break;
          case 8: ctx[f] = function webgl_8(a1, a2, a3, a4, a5, a6, a7, a8) { this_.recordFunction(f, f, [a1, a2, a3, a4, a5, a6, a7, a8]); var ret = ctx[realf](a1, a2, a3, a4, a5, a6, a7, a8); this_.recordFunctionReturn(ret); return ret; }; break;
          case 9: ctx[f] = function webgl_9(a1, a2, a3, a4, a5, a6, a7, a8, a9) { this_.recordFunction(f, f, [a1, a2, a3, a4, a5, a6, a7, a8, a9]); var ret = ctx[realf](a1, a2, a3, a4, a5, a6, a7, a8, a9); this_.recordFunctionReturn(ret); return ret; }; break;
          case 10: ctx[f] = function webgl_10(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) { this_.recordFunction(f, f, [a1, a2, a3, a4, a5, a6, a7, a8, a9, a10]); var ret = ctx[realf](a1, a2, a3, a4, a5, a6, a7, a8, a9, a10); this_.recordFunctionReturn(ret); return ret; }; break;
          case 11: ctx[f] = function webgl_11(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11) { this_.recordFunction(f, f, [a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11]); var ret = ctx[realf](a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11); this_.recordFunctionReturn(ret); return ret; }; break;
          default: throw 'hookWebGL failed! Unexpected length ' + ctx[realf].length;
        }
      }
    } else {
      switch (sig.args.length) {
        case 0: ctx[f] = function webgl_0() { this_.recordFunction(f, f, []); ctx[realf](); }; break;
        case 1: ctx[f] = function webgl_1(a1) { this_.recordFunction(f, f, [a1]); ctx[realf](a1); }; break;
        case 2: ctx[f] = function webgl_2(a1, a2) { this_.recordFunction(f, f, [a1, a2]); ctx[realf](a1, a2); }; break;
        case 3: ctx[f] = function webgl_3(a1, a2, a3) { this_.recordFunction(f, f, [a1, a2, a3]); ctx[realf](a1, a2, a3); }; break;
        case 4: ctx[f] = function webgl_4(a1, a2, a3, a4) { this_.recordFunction(f, f, [a1, a2, a3, a4]); ctx[realf](a1, a2, a3, a4); }; break;
        case 5: ctx[f] = function webgl_5(a1, a2, a3, a4, a5) { this_.recordFunction(f, f, [a1, a2, a3, a4, a5]); ctx[realf](a1, a2, a3, a4, a5); }; break;
        case 6: ctx[f] = function webgl_6(a1, a2, a3, a4, a5, a6) { this_.recordFunction(f, f, [a1, a2, a3, a4, a5, a6]); ctx[realf](a1, a2, a3, a4, a5, a6); }; break;
        case 7: ctx[f] = function webgl_7(a1, a2, a3, a4, a5, a6, a7) { this_.recordFunction(f, f, [a1, a2, a3, a4, a5, a6, a7]); ctx[realf](a1, a2, a3, a4, a5, a6, a7); }; break;
        case 8: ctx[f] = function webgl_8(a1, a2, a3, a4, a5, a6, a7, a8) { this_.recordFunction(f, f, [a1, a2, a3, a4, a5, a6, a7, a8]); ctx[realf](a1, a2, a3, a4, a5, a6, a7, a8); }; break;
        case 9: ctx[f] = function webgl_9(a1, a2, a3, a4, a5, a6, a7, a8, a9) { this_.recordFunction(f, f, [a1, a2, a3, a4, a5, a6, a7, a8, a9]); ctx[realf](a1, a2, a3, a4, a5, a6, a7, a8, a9); }; break;
        case 10: ctx[f] = function webgl_10(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) { this_.recordFunction(f, f, [a1, a2, a3, a4, a5, a6, a7, a8, a9, a10]); ctx[realf](a1, a2, a3, a4, a5, a6, a7, a8, a9, a10); }; break;
        case 11: ctx[f] = function webgl_11(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11) { this_.recordFunction(f, f, [a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11]); ctx[realf](a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11); }; break;
        default: throw 'hookWebGL failed! Unexpected length ' + ctx[realf].length;
      }
    }
  },

  hookWebGL: function(ctx) {
    var this_ = this;
    if (ctx.wgld_webglAlreadyHooked) return;
    ctx.wgld_webglAlreadyHooked = true;
    this.fixupWebGLIDL();
    this.calculateWebGLFunctionClassNames();

    if (!window.wgld_requestAnimationFrame) {
      window.wgld_requestAnimationFrame = window.requestAnimationFrame;
      window.requestAnimationFrame = function(cb) {
        function webglDebuggerHookedCallback(p) {
          this_.frameStart();
          cb(performance.now());
          this_.frameEnd();
        }
        return window.wgld_requestAnimationFrame(webglDebuggerHookedCallback);
      }
    }

    for (var f in ctx) {
      if (typeof ctx[f] === 'function' && f.indexOf('wgld_') != 0) {
        this.hookWebGLFunction(f, ctx);
      }
    }

    var overloadedFns = ['bufferData', 'bufferSubData', 'compressedTexImage2D', 'compressedTexSubImage2D', 'readPixels', 'texImage2D', 'texSubImage2D', 'uniform1fv', 'uniform2fv', 'uniform3fv', 'uniform4fv', 'uniform1iv', 'uniform2iv', 'uniform3iv', 'uniform4iv', 'uniformMatrix2fv', 'uniformMatrix3fv', 'uniformMatrix4fv', 'texImage3D', 'texSubImage3D', 'compressedTexImage3D', 'compressedTexSubImage3D'];
    overloadedFns.forEach((f) => {
      ctx['wgld_' + f] = ctx[f];
    });

    ctx['bufferData'] = function(a1, a2, a3, a4, a5) {   if (a5 !== undefined) {     this_.recordFunction('5bufferData', 'bufferData', [a1, a2, a3, a4, a5]);     ctx['wgld_bufferData'](a1, a2, a3, a4, a5);   } else {     this_.recordFunction('3bufferData', 'bufferData', [a1, a2, a3]);     ctx['wgld_bufferData'](a1, a2, a3);   } };
    ctx['bufferSubData'] = function(a1, a2, a3, a4, a5) {   if (a5 !== undefined) {     this_.recordFunction('5bufferSubData', 'bufferSubData', [a1, a2, a3, a4, a5]);     ctx['wgld_bufferSubData'](a1, a2, a3, a4, a5);   } else {     this_.recordFunction('3bufferSubData', 'bufferSubData', [a1, a2, a3]);     ctx['wgld_bufferSubData'](a1, a2, a3);   } };
    ctx['compressedTexImage2D'] = function(a1, a2, a3, a4, a5, a6, a7, a8, a9) {   if (a9 !== undefined) {     this_.recordFunction('9compressedTexImage2D', 'compressedTexImage2D', [a1, a2, a3, a4, a5, a6, a7, a8, a9]);     ctx['wgld_compressedTexImage2D'](a1, a2, a3, a4, a5, a6, a7, a8, a9);   } else if (a8 !== undefined) {     this_.recordFunction('8compressedTexImage2D', 'compressedTexImage2D', [a1, a2, a3, a4, a5, a6, a7, a8]);     ctx['wgld_compressedTexImage2D'](a1, a2, a3, a4, a5, a6, a7, a8);   } else {     this_.recordFunction('7compressedTexImage2D', 'compressedTexImage2D', [a1, a2, a3, a4, a5, a6, a7]);     ctx['wgld_compressedTexImage2D'](a1, a2, a3, a4, a5, a6, a7);   } };
    ctx['compressedTexSubImage2D'] = function(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) {   if (a10 !== undefined) {     this_.recordFunction('10compressedTexSubImage2D', 'compressedTexSubImage2D', [a1, a2, a3, a4, a5, a6, a7, a8, a9, a10]);     ctx['wgld_compressedTexSubImage2D'](a1, a2, a3, a4, a5, a6, a7, a8, a9, a10);   } else if (a9 !== undefined) {     this_.recordFunction('9compressedTexSubImage2D', 'compressedTexSubImage2D', [a1, a2, a3, a4, a5, a6, a7, a8, a9]);     ctx['wgld_compressedTexSubImage2D'](a1, a2, a3, a4, a5, a6, a7, a8, a9);   } else {     this_.recordFunction('8compressedTexSubImage2D', 'compressedTexSubImage2D', [a1, a2, a3, a4, a5, a6, a7, a8]);     ctx['wgld_compressedTexSubImage2D'](a1, a2, a3, a4, a5, a6, a7, a8);   } };
    ctx['readPixels'] = function(a1, a2, a3, a4, a5, a6, a7, a8) {   if (a8 !== undefined) {     this_.recordFunction('8readPixels', 'readPixels', [a1, a2, a3, a4, a5, a6, a7, a8]);     ctx['wgld_readPixels'](a1, a2, a3, a4, a5, a6, a7, a8);   } else {     this_.recordFunction('7readPixels', 'readPixels', [a1, a2, a3, a4, a5, a6, a7]);     ctx['wgld_readPixels'](a1, a2, a3, a4, a5, a6, a7);   } };
    ctx['texImage2D'] = function(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) {   if (a10 !== undefined) {     this_.recordFunction('10texImage2D', 'texImage2D', [a1, a2, a3, a4, a5, a6, a7, a8, a9, a10]);     ctx['wgld_texImage2D'](a1, a2, a3, a4, a5, a6, a7, a8, a9, a10);   } else if (a9 !== undefined) {     this_.recordFunction('9texImage2D', 'texImage2D', [a1, a2, a3, a4, a5, a6, a7, a8, a9]);     ctx['wgld_texImage2D'](a1, a2, a3, a4, a5, a6, a7, a8, a9);   } else {     this_.recordFunction('6texImage2D', 'texImage2D', [a1, a2, a3, a4, a5, a6]);     ctx['wgld_texImage2D'](a1, a2, a3, a4, a5, a6);   } };
    ctx['texSubImage2D'] = function(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) {   if (a10 !== undefined) {     this_.recordFunction('10texSubImage2D', 'texSubImage2D', [a1, a2, a3, a4, a5, a6, a7, a8, a9, a10]);     ctx['wgld_texSubImage2D'](a1, a2, a3, a4, a5, a6, a7, a8, a9, a10);   } else if (a9 !== undefined) {     this_.recordFunction('9texSubImage2D', 'texSubImage2D', [a1, a2, a3, a4, a5, a6, a7, a8, a9]);     ctx['wgld_texSubImage2D'](a1, a2, a3, a4, a5, a6, a7, a8, a9);   } else {     this_.recordFunction('7texSubImage2D', 'texSubImage2D', [a1, a2, a3, a4, a5, a6, a7]);     ctx['wgld_texSubImage2D'](a1, a2, a3, a4, a5, a6, a7);   } };
    ctx['uniform1fv'] = function(a1, a2, a3, a4) {   if (a4 !== undefined) {     this_.recordFunction('4uniform1fv', 'uniform1fv', [a1, a2, a3, a4]);     ctx['wgld_uniform1fv'](a1, a2, a3, a4);   } else {     this_.recordFunction('2uniform1fv', 'uniform1fv', [a1, a2]);     ctx['wgld_uniform1fv'](a1, a2);   } };
    ctx['uniform2fv'] = function(a1, a2, a3, a4) {   if (a4 !== undefined) {     this_.recordFunction('4uniform2fv', 'uniform2fv', [a1, a2, a3, a4]);     ctx['wgld_uniform2fv'](a1, a2, a3, a4);   } else {     this_.recordFunction('2uniform2fv', 'uniform2fv', [a1, a2]);     ctx['wgld_uniform2fv'](a1, a2);   } };
    ctx['uniform3fv'] = function(a1, a2, a3, a4) {   if (a4 !== undefined) {     this_.recordFunction('4uniform3fv', 'uniform3fv', [a1, a2, a3, a4]);     ctx['wgld_uniform3fv'](a1, a2, a3, a4);   } else {     this_.recordFunction('2uniform3fv', 'uniform3fv', [a1, a2]);     ctx['wgld_uniform3fv'](a1, a2);   } };
    ctx['uniform4fv'] = function(a1, a2, a3, a4) {   if (a4 !== undefined) {     this_.recordFunction('4uniform4fv', 'uniform4fv', [a1, a2, a3, a4]);     ctx['wgld_uniform4fv'](a1, a2, a3, a4);   } else {     this_.recordFunction('2uniform4fv', 'uniform4fv', [a1, a2]);     ctx['wgld_uniform4fv'](a1, a2);   } };
    ctx['uniform1iv'] = function(a1, a2, a3, a4) {   if (a4 !== undefined) {     this_.recordFunction('4uniform1iv', 'uniform1iv', [a1, a2, a3, a4]);     ctx['wgld_uniform1iv'](a1, a2, a3, a4);   } else {     this_.recordFunction('2uniform1iv', 'uniform1iv', [a1, a2]);     ctx['wgld_uniform1iv'](a1, a2);   } };
    ctx['uniform2iv'] = function(a1, a2, a3, a4) {   if (a4 !== undefined) {     this_.recordFunction('4uniform2iv', 'uniform2iv', [a1, a2, a3, a4]);     ctx['wgld_uniform2iv'](a1, a2, a3, a4);   } else {     this_.recordFunction('2uniform2iv', 'uniform2iv', [a1, a2]);     ctx['wgld_uniform2iv'](a1, a2);   } };
    ctx['uniform3iv'] = function(a1, a2, a3, a4) {   if (a4 !== undefined) {     this_.recordFunction('4uniform3iv', 'uniform3iv', [a1, a2, a3, a4]);     ctx['wgld_uniform3iv'](a1, a2, a3, a4);   } else {     this_.recordFunction('2uniform3iv', 'uniform3iv', [a1, a2]);     ctx['wgld_uniform3iv'](a1, a2);   } };
    ctx['uniform4iv'] = function(a1, a2, a3, a4) {   if (a4 !== undefined) {     this_.recordFunction('4uniform4iv', 'uniform4iv', [a1, a2, a3, a4]);     ctx['wgld_uniform4iv'](a1, a2, a3, a4);   } else {     this_.recordFunction('2uniform4iv', 'uniform4iv', [a1, a2]);     ctx['wgld_uniform4iv'](a1, a2);   } };
    ctx['uniformMatrix2fv'] = function(a1, a2, a3, a4, a5) {   if (a5 !== undefined) {     this_.recordFunction('5uniformMatrix2fv', 'uniformMatrix2fv', [a1, a2, a3, a4, a5]);     ctx['wgld_uniformMatrix2fv'](a1, a2, a3, a4, a5);   } else {     this_.recordFunction('3uniformMatrix2fv', 'uniformMatrix2fv', [a1, a2, a3]);     ctx['wgld_uniformMatrix2fv'](a1, a2, a3);   } };
    ctx['uniformMatrix3fv'] = function(a1, a2, a3, a4, a5) {   if (a5 !== undefined) {     this_.recordFunction('5uniformMatrix3fv', 'uniformMatrix3fv', [a1, a2, a3, a4, a5]);     ctx['wgld_uniformMatrix3fv'](a1, a2, a3, a4, a5);   } else {     this_.recordFunction('3uniformMatrix3fv', 'uniformMatrix3fv', [a1, a2, a3]);     ctx['wgld_uniformMatrix3fv'](a1, a2, a3);   } };
    ctx['uniformMatrix4fv'] = function(a1, a2, a3, a4, a5) {   if (a5 !== undefined) {     this_.recordFunction('5uniformMatrix4fv', 'uniformMatrix4fv', [a1, a2, a3, a4, a5]);     ctx['wgld_uniformMatrix4fv'](a1, a2, a3, a4, a5);   } else {     this_.recordFunction('3uniformMatrix4fv', 'uniformMatrix4fv', [a1, a2, a3]);     ctx['wgld_uniformMatrix4fv'](a1, a2, a3);   } };
    ctx['texImage3D'] = function(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11) {   if (a11 !== undefined) {     this_.recordFunction('11texImage3D', 'texImage3D', [a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11]);     ctx['wgld_texImage3D'](a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11);   } else {     this_.recordFunction('10texImage3D', 'texImage3D', [a1, a2, a3, a4, a5, a6, a7, a8, a9, a10]);     ctx['wgld_texImage3D'](a1, a2, a3, a4, a5, a6, a7, a8, a9, a10);   } };
    ctx['texSubImage3D'] = function(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12) {   if (a12 !== undefined) {     this_.recordFunction('12texSubImage3D', 'texSubImage3D', [a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12]);     ctx['wgld_texSubImage3D'](a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12);   } else {     this_.recordFunction('11texSubImage3D', 'texSubImage3D', [a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11]);     ctx['wgld_texSubImage3D'](a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11);   } };
    ctx['compressedTexImage3D'] = function(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) {   if (a10 !== undefined) {     this_.recordFunction('10compressedTexImage3D', 'compressedTexImage3D', [a1, a2, a3, a4, a5, a6, a7, a8, a9, a10]);     ctx['wgld_compressedTexImage3D'](a1, a2, a3, a4, a5, a6, a7, a8, a9, a10);   } else {     this_.recordFunction('9compressedTexImage3D', 'compressedTexImage3D', [a1, a2, a3, a4, a5, a6, a7, a8, a9]);     ctx['wgld_compressedTexImage3D'](a1, a2, a3, a4, a5, a6, a7, a8, a9);   } };
    ctx['compressedTexSubImage3D'] = function(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12) {   if (a12 !== undefined) {     this_.recordFunction('12compressedTexSubImage3D', 'compressedTexSubImage3D', [a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12]);     ctx['wgld_compressedTexSubImage3D'](a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12);   } else {     this_.recordFunction('11compressedTexSubImage3D', 'compressedTexSubImage3D', [a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11]);     ctx['wgld_compressedTexSubImage3D'](a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11);   } };

    var div = document.createElement('div');
    div.innerHTML = `<a id='webgl_debugger' href='javascript:void(0);' NAME='WebGL Debugger'  title='WebGL Debugger' onClick='webglDebugger.openDebuggerWindow();'>Click here to open the child window</a>`;
    document.body.prepend(div);
    setTimeout(function() { div.style.display = 'block'; }, 100);
  },

  openDebuggerWindow: function() {
    var this_ = this;
    var debuggerWindow = window.open("webgl-debugger.html","WebGL Debugger",`width=${screen.width-60},height=${screen.height-200},left=30,top=30,menubar=0,toolbar=0,status=0,location=0`);
    window.addEventListener("beforeunload", () => {
      debuggerWindow.close();
      delete this_.debuggerWindow;
    });
    debuggerWindow.onload = () => {
      this_.debuggerWindow = debuggerWindow;
      this_.debuggerWindow.webglDebugger = this_;

      this_.debuggerWindow.document.getElementById('frameNumber').innerHTML = '';
      for(var i = 0; i < this_.frames.length; ++i) {
        this_.populateFrameNumber(i);
      }
      this_.printFrameTrace(this_.currentFrame);
    };
  },

  mapWebGLEnum: function(e) {
    if (this.webGLEnums[e]) {
      return 'GL_' + this.webGLEnums[e];
    }
    return '0x'+e.toString(16);
  },

  mapWebGLEnumArray: function(arr) {
    if (arr.length == 0) return "[]";
    return '<br>' + Array.from(arr).map((x) => { return this.mapWebGLEnum(x) }).join('<br>');
  },

  decorateType: function(type, arg, fullSig, fullCall) {
    switch(type) {
      case 'e':
      case 'ul': return this.mapWebGLEnum(arg);
      case 'e*':
        return this.mapWebGLEnumArray(arg);
      case 's': if (arg.includes('\n')) return `"<br><span class=string>${arg.replace(/\n/g, '<br>')}</span><br>"`; else return `"<span class=string>${arg}</span>"`;
      case 'getError_ret': return !arg ? 'GL_NO_ERROR <span class=hex>(0)</span>' : this.mapWebGLEnum(arg);
      case 'getSupportedExtensions_ret': return Array.isArray(arg) ? `<div class=getSupportedExtensions_ret>${arg.join('<br>')}</div>` : arg;
      case 'drawMode_enum':
        var drawModes = ['GL_POINTS <span class=hex>(0x0)</span>', 'GL_LINES <span class=hex>(0x1)</span>', 'GL_LINE_LOOP <span class=hex>(0x2)</span>', 'GL_LINE_STRIP <span class=hex>(0x3)</span>', 'GL_TRIANGLES <span class=hex>(0x4)</span>', 'GL_TRIANGLE_STRIP <span class=hex>(0x5)</span>', 'GL_TRIANGLE_FAN <span class=hex>(0x6)</span>', 'GL_QUADS <span class=hex>(0x7)</span> UNSUPPORTED IN WEBGL!', 'GL_QUAD_STRIP <span class=hex>(0x8)</span> UNSUPPORTED IN WEBGL!', 'GL_POLYGON <span class=hex>(0x9)</span> UNSUPPORTED IN WEBGL!'];
        return (arg >= 0 && arg < drawModes.length) ? drawModes[arg] : arg;
      case 'f*':
      case 'u8*':
      case 'u*': return `${arg.constructor.name}(length: ${arg.length})`;
      case 'texParameter_enumOrNumber': return fullCall.args[1] in [0x84FF/*GL_TEXTURE_MAX_ANISOTROPY_EXT*/, 0x813C/*GL_TEXTURE_BASE_LEVEL*/, 0x813D/*GL_TEXTURE_MAX_LEVEL*/, 0x813A/*GL_TEXTURE_MIN_LOD*/, 0x813B/*GL_TEXTURE_MAX_LOD*/] ? arg : this.mapWebGLEnum(arg);
      case 'getParameter_ret':
        if (fullCall.args[0] in [0x84E0/*GL_ACTIVE_TEXTURE*/, 0x80CA/*GL_BLEND_DST_ALPHA*/, 0x80C8/*GL_BLEND_DST_RGB*/, 0x8009/*GL_BLEND_EQUATION*/, 0x883D/*GL_BLEND_EQUATION_ALPHA*/, 0x8009/*GL_BLEND_EQUATION_RGB*/, 0x80CB/*GL_BLEND_SRC_ALPHA*/, 0x80C9/*GL_BLEND_SRC_RGB*/, 0x0B45/*GL_CULL_FACE_MODE*/, 0x0B74/*GL_DEPTH_FUNC*/, 0x0B46/*GL_FRONT_FACE*/, 0x8192/*GL_GENERATE_MIPMAP_HINT*/, 0x8B9B/*GL_IMPLEMENTATION_COLOR_READ_FORMAT*/, 0x8B9A/*GL_IMPLEMENTATION_COLOR_READ_TYPE*/, 0x8801/*GL_STENCIL_BACK_FAIL*/, 0x8800/*GL_STENCIL_BACK_FUNC*/, 0x8802/*GL_STENCIL_BACK_PASS_DEPTH_FAIL*/, 0x8803/*GL_STENCIL_BACK_PASS_DEPTH_PASS*/, 0x0B94/*GL_STENCIL_FAIL*/, 0x0B92/*GL_STENCIL_FUNC*/, 0x0B95/*GL_STENCIL_PASS_DEPTH_FAIL*/, 0x0B96/*GL_STENCIL_PASS_DEPTH_PASS*/, 0x9243/*GL_UNPACK_COLORSPACE_CONVERSION_WEBGL*/]) {
          return this.mapWebGLEnum(arg);
        } else if (fullCall.args[0] == 0x86a3 /*GL_COMPRESSED_TEXTURE_FORMATS*/) {
          return this.mapWebGLEnumArray(arg);
        } else if (typeof arg === 'string') {
          return `"${arg}"`;
        } else {
          return arg;
        }
      case 'hex_u32': return `0x${(arg>>>0).toString(16)}`;
      case 'img': // todo improve this for ImageBitmapOrImageDataOrHTMLImageElementOrHTMLCanvasElementOrHTMLVideoElementOrOffscreenCanvas
        if (arg.width || arg.height) return `${arg.constructor.name}({width: ${arg.width}, height: ${arg.height})`;
        else if (arg.length) return `${arg.constructor.name}({length: ${arg.length})`;
        else return arg;
      case 'clear_arg0':
        var bits = [];
        if (arg & 0x4000/*GL_COLOR_BUFFER_BIT*/) bits.push('GL_COLOR_BUFFER_BIT <span class=hex>(0x4000)</span>');
        if (arg & 0x100/*GL_DEPTH_BUFFER_BIT*/) bits.push('GL_DEPTH_BUFFER_BIT <span class=hex>(0x100)</span>');
        if (arg & 0x400/*GL_STENCIL_BUFFER_BIT*/) bits.push('GL_STENCIL_BUFFER_BIT <span class=hex>(0x400)</span>');
        if (bits.length == 0) return '0x0';
        return bits.join('|');
      case 'i':
        return arg;
      case 'WebGLProgram':
      case 'WebGLShader':
      case 'WebGLBuffer':
      case 'WebGLFramebuffer':
      case 'WebGLRenderbuffer':
      case 'WebGLTexture':
      case 'WebGLActiveInfo':
      case 'WebGLShaderSequence':
      case 'WebGLShaderPrecisionFormat':
      case 'WebGLUniformLocation':
      case 'WebGLQuery':
      case 'WebGLSampler':
      case 'WebGLSync':
      case 'WebGLTransformFeedback':
      case 'WebGLVertexArrayObject':
        if (arg) {
          return `[${type} ${arg['wgld_objectName'] || arg['wgld_objectId'] || '<untracked>'}]`;
        } else {
          return `[${type} (null)]`;
        }
      default: return arg;
    }
  },

  printFrameTrace: function(frameNumber) {
    frameNumber = Math.min(frameNumber, this.frames.length-2);
    console.log(frameNumber);
    var doc = this.debuggerWindow.document;
    var frameTrace = doc.getElementById('frameTrace');
    var currentFrame = this.frames[frameNumber];
    frameTrace.innerHTML = '';
    console.log(`${currentFrame.length} API calls on frame ${frameNumber}`);
    var callNumber = 1;
    currentFrame.forEach((call) => {
      var div = doc.createElement("div");
      var ret = ''
      var sig = this.webGLFunctions[call.functionOverloadId];
      if (sig.ret || call.hasOwnProperty('returnValue')) {
        ret = `<span class='rightArrow'> → </span> <span class='returnValue'>${this.decorateType(sig.ret, call.returnValue, sig, call)}</span>`;
      }
      var args = '';
      for(var i = 0; i < call.args.length; ++i) {
        if (i != 0) args += ', ';
        if (sig.argNames) args += `<span class='functionArgName'>${sig.argNames[i]}: </span>`;
        args += this.decorateType(sig.args[i], call.args[i], sig, call);
      }
      div.innerHTML = `<span class='functionName'>${callNumber++}. ${call.functionName}</span>(<span class='functionArgs'>${args}</span>)${ret}`;
      div.classList.add(call.functionName);
      if (this.webGLFunctionClassNames[call.functionName]) {
        div.classList.add(this.webGLFunctionClassNames[call.functionName]);
      }
      frameTrace.appendChild(div);
      doc.getElementById('frameNumber').value = frameNumber;
    });
  }
};

function hookIntoWebGLCanvases() {
  var canvases = document.getElementsByTagName('canvas');
  for(var i = 0; i < canvases.length; ++i) {
    var c = canvases[i];
    if (!c['wgld_getContext']) {
      c['wgld_getContext'] = c['getContext'];
      c['getContext'] = function(a1, a2) {
        var ret = c['wgld_getContext'](a1, a2);
        if (ret) webglDebugger.hookWebGL(ret);
        return ret;
      }
    }
  }
}
hookIntoWebGLCanvases();
window.addEventListener('load', hookIntoWebGLCanvases);
setTimeout(hookIntoWebGLCanvases, 100);
