import sys

sys.path.append('ply')

import WebIDL

p = WebIDL.Parser()
#p.parse(open('webidl.idl', 'r').read(), filename='webidl.idl')
def load_and_fixup_idl(filename):
  src = open(filename, 'r').read()
  src = src.replace('[AllowShared] BufferSource', 'BufferSource')
  src = src.replace('[Exposed=(Window,Worker)]', '')
  src = src.replace('WebGLRenderingContext includes WebGLRenderingContextBase;', '')
  src = src.replace('WebGLRenderingContext includes WebGLRenderingContextOverloads;', '')
  src = src.replace('[Exposed=Window] readonly attribute (HTMLCanvasElement or OffscreenCanvas) canvas;', '')
  src = src.replace('[Exposed=Worker] readonly attribute OffscreenCanvas canvas;', '')
  return src

p.parse(load_and_fixup_idl('common.idl'), filename='common.idl')
p.parse(load_and_fixup_idl('webgl.idl'), filename='webgl.idl')
p.parse(load_and_fixup_idl('webgl2.idl'), filename='webgl2.idl')
data = p.finish();

enums = {}
functions = {}

from pprint import pprint
for d in data:
#  try:
  if isinstance(d, WebIDL.IDLIncludesStatement):
    continue

  if d.identifier.name in ['WebGLRenderingContextBase', 'WebGLRenderingContextOverloads', 'WebGLRenderingContext', 'WebGL2RenderingContextBase', 'WebGL2RenderingContextOverloads', 'WebGL2RenderingContext']:
#    print(d.identifier.name)
    for m in d.members:
      try:
        if isinstance(m, WebIDL.IDLConst):
          enums[m.value.value] = m
#          print(str(m.type))
#        pprint(dir(m.type))
#        print(m.isInteger())
#        print('asdf')
#        if str(m.type) == 'UnsignedLong':
#           print('\nenum ' + str(m.identifier.name) + ' ' + str(m.value.value))
        elif isinstance(m, WebIDL.IDLMethod):
          if m.identifier.name not in functions:
            functions[m.identifier.name] = []
          functions[m.identifier.name] += [m]
#          print('\n' + str(m.identifier.name))
#          for ret, args in m.signatures():
#            print(str(ret))
#            for a in args:
#              print(str(a.type) + ' NAME ' + a.identifier.name)
#          pprint(dir(m))


      except Exception as e:
        print(str(e))
        pass
#      if m.isAttr():
#        continue
#      if isinstance(m.type, WebIDL.IDLBuiltinType):
#        pass
#        print(str(m))
#      print(str(m))
#      if m.isEnum():
#        print(m.identifier.name)
#          print('enum ' + m.identifier.name + ' ' + m.value)
#      print(m.type)
#      pprint(dir(m.type))
#  except Exception as e:
#    print(str(e))
#    pass
  #print(str(d))
#  try:
#    pprint(dir(d.globalNames))
#  except Exception:
#    pass
  #pprint(dir(d))
  #pprint(d.__dict__)

enums_js = []
for e in enums.values():
  if str(e.identifier.name) not in ['DEPTH_BUFFER_BIT', 'STENCIL_BUFFER_BIT', 'COLOR_BUFFER_BIT', 'POINTS', 'LINES', 'LINE_LOOP', 'LINE_STRIP', 'TRIANGLES', 'TRIANGLE_STRIP', 'TRIANGLE_FAN', 'ZERO', 'ONE', 'NONE', 'SYNC_FLUSH_COMMANDS_BIT', 'INVALID_INDEX', 'TIMEOUT_IGNORED']:
    enums_js += ["%d: '%s <span class=hex>(0x%x)</span>'," % (e.value.value, str(e.identifier.name), e.value.value)]

print('''webGLEnums: {
  %s
},''' % ' '.join(enums_js))

type_mappings = {
  'Boolean': 'b',
  'StringSequence': 's*',
  'String': 's',
  'Object': 'o',
  'UnsignedLong': 'ul',
  'UnrestrictedFloat': 'f',
  'Long': 'l',
  'LongLong': 'll',
  'Any': '?',
  'MaybeSharedFloat32ArrayOrUnrestrictedFloatSequence': 'f*',
  'ArrayBufferViewOrArrayBuffer': 'u8*',
  'MaybeSharedArrayBufferView': 'u8*',
  'MaybeSharedInt32ArrayOrLongSequence': 'i*',
  'UnsignedLongSequence': 'ul*',
  'MaybeSharedUint32ArrayOrUnsignedLongSequence': 'u*',
  'UnsignedLongLong': 'ull',
  'ImageBitmapOrImageDataOrHTMLImageElementOrHTMLCanvasElementOrHTMLVideoElementOrOffscreenCanvas': 'img'
}

types = []

def sanitize_type(t):
  t = t.replace(' (Wrapper)', '')
  t = t.replace('OrNull', '')
  if t in type_mappings:
    t = type_mappings[t]
  global types
  types += [t]
  return t

sigs_js = []
overloaded_sigs = []
for fns in functions.values():
  sigs_by_arg_count = {}
  for m in fns:
    function_name = m.identifier.name
    for ret, args in m.signatures():
      sigs_by_arg_count[len(args)] = (ret, args)

  is_overloaded = (len(sigs_by_arg_count.keys()) > 1)
  if is_overloaded:
    overloaded_sigs += [(function_name, sigs_by_arg_count.keys())]

  for ret, args in sigs_by_arg_count.values():
    args_js = []
    arg_names_js = []
    ret_js = str(ret)
    for a in args:
      args_js += ["'%s'" % sanitize_type(str(a.type))]
      arg_names_js += ["'%s'" % a.identifier.name]

    ret_js = "'ret': '%s', " % sanitize_type(ret.name) if ret.name != 'undefined' else ''
    fn = (str(len(args)) if is_overloaded else '') + function_name
    sigs_js += ["'%s': { %s'args': [%s], 'argNames': [%s] }," % (fn, ret_js, ', '.join(args_js), ', '.join(arg_names_js))]

print('''webGLFunctions: {
  %s
},''' % '\n  '.join(sigs_js))

print('Types: ' + '\n'.join(list(dict.fromkeys(types))) + '\n')
#print('Overloaded signatures:')
overloaded_hooks = []
def gen_arg_list(c):
  return ', '.join(['a' + str(x) for x in list(range(1, c+1))])

js = '''
    var overloadedFns = ['%s'];
    overloadedFns.forEach((f) => {
      ctx['wgld_' + f] = ctx[f];
    });

    %s
''' % ("', '".join([x for x, y in overloaded_sigs]), '')
print(js, '\n'.join(overloaded_hooks))

for name, arg_counts in overloaded_sigs:
  arg_c = list(arg_counts)
  arg_c.sort(reverse=True)

#    ctx['texImage2D'] = function(a1, a2, a3, a4, a5, a6, a7, a8, a9) { 
#      if (a9 !== undefined) {
#        this_.recordFunction('9texImage2D', [a1, a2, a3, a4, a5, a6, a7, a8, a9]);
#        ctx['wgld_texImage2D'](a1, a2, a3, a4, a5, a6, a7, a8, a9);
#      } else {
#        this_.recordFunction('6texImage2D', [a1, a2, a3, a4, a5, a6, a7, a8, a9]);
#        ctx['wgld_texImage2D'](a1, a2, a3, a4, a5, a6);
#      }
#    };

  js = ''
  i = 0
  while i < len(arg_c):
    c = arg_c[i]
    js += '''%s%s{
    this_.recordFunction('%d%s', '%s', [%s]);
    ctx['wgld_%s'](%s);
  }''' % (' else ' if i != 0 else '', 'if (a'+str(c)+' !== undefined) ' if i != len(arg_c)-1 else '', c, name, name, gen_arg_list(c), name, gen_arg_list(c))
    i += 1

  js = '''ctx['%s'] = function(%s) {
  %s
};''' % (name, gen_arg_list(arg_c[0]), js)
  print(js.replace('\n', ' '))
