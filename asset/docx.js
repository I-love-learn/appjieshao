!(function (e, t) {
  'object' == typeof exports && 'undefined' != typeof module ? t(exports, require('jszip')) : 'function' == typeof define && define.amd ? define(['exports', 'jszip'], t) : t(((e = 'undefined' != typeof globalThis ? globalThis : e || self).docx = {}), e.JSZip)
})(this, function (e, t) {
  'use strict'
  var r
  !(function (e) {
    ;(e.OfficeDocument = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument'),
      (e.FontTable = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/fontTable'),
      (e.Image = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/image'),
      (e.Numbering = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/numbering'),
      (e.Styles = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles'),
      (e.StylesWithEffects = 'http://schemas.microsoft.com/office/2007/relationships/stylesWithEffects'),
      (e.Theme = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme'),
      (e.Settings = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/settings'),
      (e.WebSettings = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/webSettings'),
      (e.Hyperlink = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink'),
      (e.Footnotes = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/footnotes'),
      (e.Endnotes = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/endnotes'),
      (e.Footer = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/footer'),
      (e.Header = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/header'),
      (e.ExtendedProperties = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties'),
      (e.CoreProperties = 'http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties'),
      (e.CustomProperties = 'http://schemas.openxmlformats.org/package/2006/relationships/metadata/custom-properties'),
      (e.Comments = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/comments'),
      (e.CommentsExtended = 'http://schemas.microsoft.com/office/2011/relationships/commentsExtended')
  })(r || (r = {}))
  const a = {
      wordml: 'http://schemas.openxmlformats.org/wordprocessingml/2006/main',
      drawingml: 'http://schemas.openxmlformats.org/drawingml/2006/main',
      picture: 'http://schemas.openxmlformats.org/drawingml/2006/picture',
      compatibility: 'http://schemas.openxmlformats.org/markup-compatibility/2006',
      math: 'http://schemas.openxmlformats.org/officeDocument/2006/math'
    },
    s = { Dxa: { mul: 0.05, unit: 'pt' }, Emu: { mul: 1 / 12700, unit: 'pt' }, FontSize: { mul: 0.5, unit: 'pt' }, Border: { mul: 0.125, unit: 'pt' }, Point: { mul: 1, unit: 'pt' }, Percent: { mul: 0.02, unit: '%' }, LineHeight: { mul: 1 / 240, unit: '' }, VmlEmu: { mul: 1 / 12700, unit: '' } }
  function n(e, t = s.Dxa) {
    return null == e || /.+(p[xt]|[%])$/.test(e) ? e : `${(parseInt(e) * t.mul).toFixed(2)}${t.unit}`
  }
  function l(e, t, r) {
    if (e.namespaceURI != a.wordml) return !1
    switch (e.localName) {
      case 'color':
        t.color = r.attr(e, 'val')
        break
      case 'sz':
        t.fontSize = r.lengthAttr(e, 'val', s.FontSize)
        break
      default:
        return !1
    }
    return !0
  }
  class o {
    elements(e, t = null) {
      const r = []
      for (let a = 0, s = e.childNodes.length; a < s; a++) {
        let s = e.childNodes.item(a)
        1 != s.nodeType || (null != t && s.localName != t) || r.push(s)
      }
      return r
    }
    element(e, t) {
      for (let r = 0, a = e.childNodes.length; r < a; r++) {
        let a = e.childNodes.item(r)
        if (1 == a.nodeType && a.localName == t) return a
      }
      return null
    }
    elementAttr(e, t, r) {
      var a = this.element(e, t)
      return a ? this.attr(a, r) : void 0
    }
    attrs(e) {
      return Array.from(e.attributes)
    }
    attr(e, t) {
      for (let r = 0, a = e.attributes.length; r < a; r++) {
        let a = e.attributes.item(r)
        if (a.localName == t) return a.value
      }
      return null
    }
    intAttr(e, t, r = null) {
      var a = this.attr(e, t)
      return a ? parseInt(a) : r
    }
    hexAttr(e, t, r = null) {
      var a = this.attr(e, t)
      return a ? parseInt(a, 16) : r
    }
    floatAttr(e, t, r = null) {
      var a = this.attr(e, t)
      return a ? parseFloat(a) : r
    }
    boolAttr(e, t, r = null) {
      return (function (e, t = !1) {
        switch (e) {
          case '1':
          case 'on':
          case 'true':
            return !0
          case '0':
          case 'off':
          case 'false':
            return !1
          default:
            return t
        }
      })(this.attr(e, t), r)
    }
    lengthAttr(e, t, r = s.Dxa) {
      return n(this.attr(e, t), r)
    }
  }
  const i = new o()
  class c {
    constructor(e, t) {
      ;(this._package = e), (this.path = t)
    }
    async load() {
      this.rels = await this._package.loadRelationships(this.path)
      const e = await this._package.load(this.path),
        t = this._package.parseXmlDocument(e)
      this._package.options.keepOrigin && (this._xmlDocument = t), this.parseXml(t.firstElementChild)
    }
    save() {
      var e
      this._package.update(this.path, ((e = this._xmlDocument), new XMLSerializer().serializeToString(e)))
    }
    parseXml(e) {}
  }
  const h = { embedRegular: 'regular', embedBold: 'bold', embedItalic: 'italic', embedBoldItalic: 'boldItalic' }
  function m(e, t) {
    return t.elements(e).map(e =>
      (function (e, t) {
        let r = { name: t.attr(e, 'name'), embedFontRefs: [] }
        for (let a of t.elements(e))
          switch (a.localName) {
            case 'family':
              r.family = t.attr(a, 'val')
              break
            case 'altName':
              r.altName = t.attr(a, 'val')
              break
            case 'embedRegular':
            case 'embedBold':
            case 'embedItalic':
            case 'embedBoldItalic':
              r.embedFontRefs.push(u(a, t))
          }
        return r
      })(e, t)
    )
  }
  function u(e, t) {
    return { id: t.attr(e, 'id'), key: t.attr(e, 'fontKey'), type: h[e.localName] }
  }
  class p extends c {
    parseXml(e) {
      this.fonts = m(e, this._package.xmlParser)
    }
  }
  function d(e) {
    let t = e.lastIndexOf('/') + 1
    return [0 == t ? '' : e.substring(0, t), 0 == t ? e : e.substring(t)]
  }
  function f(e, t) {
    try {
      const r = 'http://docx/'
      return new URL(e, r + t).toString().substring(r.length)
    } catch {
      return `${t}${e}`
    }
  }
  function g(e, t) {
    return e.reduce((e, r) => ((e[t(r)] = r), e), {})
  }
  function b(e) {
    return e && 'object' == typeof e && !Array.isArray(e)
  }
  function y(e, ...t) {
    if (!t.length) return e
    const r = t.shift()
    if (b(e) && b(r))
      for (const t in r)
        if (b(r[t])) {
          y(e[t] ?? (e[t] = {}), r[t])
        } else e[t] = r[t]
    return y(e, ...t)
  }
  function k(e) {
    return Array.isArray(e) ? e : [e]
  }
  class v {
    constructor(e, t) {
      ;(this._zip = e), (this.options = t), (this.xmlParser = new o())
    }
    get(e) {
      const t = (function (e) {
        return e.startsWith('/') ? e.substr(1) : e
      })(e)
      return this._zip.files[t] ?? this._zip.files[t.replace(/\//g, '\\')]
    }
    update(e, t) {
      this._zip.file(e, t)
    }
    static async load(e, r) {
      const a = await t.loadAsync(e)
      return new v(a, r)
    }
    save(e = 'blob') {
      return this._zip.generateAsync({ type: e })
    }
    load(e, t = 'string') {
      return this.get(e)?.async(t) ?? Promise.resolve(null)
    }
    async loadRelationships(e = null) {
      let t = '_rels/.rels'
      if (null != e) {
        const [r, a] = d(e)
        t = `${r}_rels/${a}.rels`
      }
      const r = await this.load(t)
      return r ? ((a = this.parseXmlDocument(r).firstElementChild), (s = this.xmlParser).elements(a).map(e => ({ id: s.attr(e, 'Id'), type: s.attr(e, 'Type'), target: s.attr(e, 'Target'), targetMode: s.attr(e, 'TargetMode') }))) : null
      var a, s
    }
    parseXmlDocument(e) {
      return (function (e, t = !1) {
        var r
        t && (e = e.replace(/<[?].*[?]>/, '')), (e = 65279 === (r = e).charCodeAt(0) ? r.substring(1) : r)
        const a = new DOMParser().parseFromString(e, 'application/xml'),
          s = ((n = a), n.getElementsByTagName('parsererror')[0]?.textContent)
        var n
        if (s) throw new Error(s)
        return a
      })(e, this.options.trimXmlDeclaration)
    }
  }
  class S extends c {
    constructor(e, t, r) {
      super(e, t), (this._documentParser = r)
    }
    parseXml(e) {
      this.body = this._documentParser.parseDocumentFile(e)
    }
  }
  function P(e, t) {
    return { type: t.attr(e, 'val'), color: t.attr(e, 'color'), size: t.lengthAttr(e, 'sz', s.Border), offset: t.lengthAttr(e, 'space', s.Point), frame: t.boolAttr(e, 'frame'), shadow: t.boolAttr(e, 'shadow') }
  }
  function w(e, t) {
    var r = {}
    for (let a of t.elements(e))
      switch (a.localName) {
        case 'left':
          r.left = P(a, t)
          break
        case 'top':
          r.top = P(a, t)
          break
        case 'right':
          r.right = P(a, t)
          break
        case 'bottom':
          r.bottom = P(a, t)
      }
    return r
  }
  var x, C
  function N(e, t = i) {
    var r = {}
    for (let a of t.elements(e))
      switch (a.localName) {
        case 'pgSz':
          r.pageSize = { width: t.lengthAttr(a, 'w'), height: t.lengthAttr(a, 'h'), orientation: t.attr(a, 'orient') }
          break
        case 'type':
          r.type = t.attr(a, 'val')
          break
        case 'pgMar':
          r.pageMargins = { left: t.lengthAttr(a, 'left'), right: t.lengthAttr(a, 'right'), top: t.lengthAttr(a, 'top'), bottom: t.lengthAttr(a, 'bottom'), header: t.lengthAttr(a, 'header'), footer: t.lengthAttr(a, 'footer'), gutter: t.lengthAttr(a, 'gutter') }
          break
        case 'cols':
          r.columns = M(a, t)
          break
        case 'headerReference':
          ;(r.headerRefs ?? (r.headerRefs = [])).push(T(a, t))
          break
        case 'footerReference':
          ;(r.footerRefs ?? (r.footerRefs = [])).push(T(a, t))
          break
        case 'titlePg':
          r.titlePage = t.boolAttr(a, 'val', !0)
          break
        case 'pgBorders':
          r.pageBorders = w(a, t)
          break
        case 'pgNumType':
          r.pageNumber = A(a, t)
      }
    return r
  }
  function M(e, t) {
    return { numberOfColumns: t.intAttr(e, 'num'), space: t.lengthAttr(e, 'space'), separator: t.boolAttr(e, 'sep'), equalWidth: t.boolAttr(e, 'equalWidth', !0), columns: t.elements(e, 'col').map(e => ({ width: t.lengthAttr(e, 'w'), space: t.lengthAttr(e, 'space') })) }
  }
  function A(e, t) {
    return { chapSep: t.attr(e, 'chapSep'), chapStyle: t.attr(e, 'chapStyle'), format: t.attr(e, 'fmt'), start: t.intAttr(e, 'start') }
  }
  function T(e, t) {
    return { id: t.attr(e, 'id'), type: t.attr(e, 'type') }
  }
  function E(e, t) {
    let r = {}
    for (let a of t.elements(e)) R(a, r, t)
    return r
  }
  function R(e, t, r) {
    return !!l(e, t, r)
  }
  function D(e, t) {
    let r = {}
    for (let a of t.elements(e)) B(a, r, t)
    return r
  }
  function B(e, t, r) {
    if (e.namespaceURI != a.wordml) return !1
    if (l(e, t, r)) return !0
    switch (e.localName) {
      case 'tabs':
        t.tabs = (function (e, t) {
          return t.elements(e, 'tab').map(e => ({ position: t.lengthAttr(e, 'pos'), leader: t.attr(e, 'leader'), style: t.attr(e, 'val') }))
        })(e, r)
        break
      case 'sectPr':
        t.sectionProps = N(e, r)
        break
      case 'numPr':
        t.numbering = (function (e, t) {
          var r = {}
          for (let a of t.elements(e))
            switch (a.localName) {
              case 'numId':
                r.id = t.attr(a, 'val')
                break
              case 'ilvl':
                r.level = t.intAttr(a, 'val')
            }
          return r
        })(e, r)
        break
      case 'spacing':
        return (
          (t.lineSpacing = (function (e, t) {
            return { before: t.lengthAttr(e, 'before'), after: t.lengthAttr(e, 'after'), line: t.intAttr(e, 'line'), lineRule: t.attr(e, 'lineRule') }
          })(e, r)),
          !1
        )
      case 'textAlignment':
        return (t.textAlignment = r.attr(e, 'val')), !1
      case 'keepLines':
        t.keepLines = r.boolAttr(e, 'val', !0)
        break
      case 'keepNext':
        t.keepNext = r.boolAttr(e, 'val', !0)
        break
      case 'pageBreakBefore':
        t.pageBreakBefore = r.boolAttr(e, 'val', !0)
        break
      case 'outlineLvl':
        t.outlineLevel = r.intAttr(e, 'val')
        break
      case 'pStyle':
        t.styleName = r.attr(e, 'val')
        break
      case 'rPr':
        t.runProps = E(e, r)
        break
      default:
        return !1
    }
    return !0
  }
  function F(e, t) {
    let r = { id: t.attr(e, 'numId'), overrides: [] }
    for (let a of t.elements(e))
      switch (a.localName) {
        case 'abstractNumId':
          r.abstractId = t.attr(a, 'val')
          break
        case 'lvlOverride':
          r.overrides.push(L(a, t))
      }
    return r
  }
  function $(e, t) {
    let r = { id: t.attr(e, 'abstractNumId'), levels: [] }
    for (let a of t.elements(e))
      switch (a.localName) {
        case 'name':
          r.name = t.attr(a, 'val')
          break
        case 'multiLevelType':
          r.multiLevelType = t.attr(a, 'val')
          break
        case 'numStyleLink':
          r.numberingStyleLink = t.attr(a, 'val')
          break
        case 'styleLink':
          r.styleLink = t.attr(a, 'val')
          break
        case 'lvl':
          r.levels.push(I(a, t))
      }
    return r
  }
  function I(e, t) {
    let r = { level: t.intAttr(e, 'ilvl') }
    for (let a of t.elements(e))
      switch (a.localName) {
        case 'start':
          r.start = t.attr(a, 'val')
          break
        case 'lvlRestart':
          r.restart = t.intAttr(a, 'val')
          break
        case 'numFmt':
          r.format = t.attr(a, 'val')
          break
        case 'lvlText':
          r.text = t.attr(a, 'val')
          break
        case 'lvlJc':
          r.justification = t.attr(a, 'val')
          break
        case 'lvlPicBulletId':
          r.bulletPictureId = t.attr(a, 'val')
          break
        case 'pStyle':
          r.paragraphStyle = t.attr(a, 'val')
          break
        case 'pPr':
          r.paragraphProps = D(a, t)
          break
        case 'rPr':
          r.runProps = E(a, t)
      }
    return r
  }
  function L(e, t) {
    let r = { level: t.intAttr(e, 'ilvl') }
    for (let a of t.elements(e))
      switch (a.localName) {
        case 'startOverride':
          r.start = t.intAttr(a, 'val')
          break
        case 'lvl':
          r.numberingLevel = I(a, t)
      }
    return r
  }
  function O(e, t) {
    var r = t.element(e, 'pict'),
      a = r && t.element(r, 'shape'),
      s = a && t.element(a, 'imagedata')
    return s ? { id: t.attr(e, 'numPicBulletId'), referenceId: t.attr(s, 'id'), style: t.attr(a, 'style') } : null
  }
  !(function (e) {
    ;(e.Continuous = 'continuous'), (e.NextPage = 'nextPage'), (e.NextColumn = 'nextColumn'), (e.EvenPage = 'evenPage'), (e.OddPage = 'oddPage')
  })(x || (x = {}))
  class H extends c {
    constructor(e, t, r) {
      super(e, t), (this._documentParser = r)
    }
    parseXml(e) {
      Object.assign(
        this,
        (function (e, t) {
          let r = { numberings: [], abstractNumberings: [], bulletPictures: [] }
          for (let a of t.elements(e))
            switch (a.localName) {
              case 'num':
                r.numberings.push(F(a, t))
                break
              case 'abstractNum':
                r.abstractNumberings.push($(a, t))
                break
              case 'numPicBullet':
                r.bulletPictures.push(O(a, t))
            }
          return r
        })(e, this._package.xmlParser)
      ),
        (this.domNumberings = this._documentParser.parseNumberingFile(e))
    }
  }
  class _ extends c {
    constructor(e, t, r) {
      super(e, t), (this._documentParser = r)
    }
    parseXml(e) {
      this.styles = this._documentParser.parseStylesFile(e)
    }
  }
  !(function (e) {
    ;(e.Document = 'document'),
      (e.Paragraph = 'paragraph'),
      (e.Run = 'run'),
      (e.Break = 'break'),
      (e.NoBreakHyphen = 'noBreakHyphen'),
      (e.Table = 'table'),
      (e.Row = 'row'),
      (e.Cell = 'cell'),
      (e.Hyperlink = 'hyperlink'),
      (e.SmartTag = 'smartTag'),
      (e.Drawing = 'drawing'),
      (e.Image = 'image'),
      (e.Text = 'text'),
      (e.Tab = 'tab'),
      (e.Symbol = 'symbol'),
      (e.BookmarkStart = 'bookmarkStart'),
      (e.BookmarkEnd = 'bookmarkEnd'),
      (e.Footer = 'footer'),
      (e.Header = 'header'),
      (e.FootnoteReference = 'footnoteReference'),
      (e.EndnoteReference = 'endnoteReference'),
      (e.Footnote = 'footnote'),
      (e.Endnote = 'endnote'),
      (e.SimpleField = 'simpleField'),
      (e.ComplexField = 'complexField'),
      (e.Instruction = 'instruction'),
      (e.VmlPicture = 'vmlPicture'),
      (e.MmlMath = 'mmlMath'),
      (e.MmlMathParagraph = 'mmlMathParagraph'),
      (e.MmlFraction = 'mmlFraction'),
      (e.MmlFunction = 'mmlFunction'),
      (e.MmlFunctionName = 'mmlFunctionName'),
      (e.MmlNumerator = 'mmlNumerator'),
      (e.MmlDenominator = 'mmlDenominator'),
      (e.MmlRadical = 'mmlRadical'),
      (e.MmlBase = 'mmlBase'),
      (e.MmlDegree = 'mmlDegree'),
      (e.MmlSuperscript = 'mmlSuperscript'),
      (e.MmlSubscript = 'mmlSubscript'),
      (e.MmlPreSubSuper = 'mmlPreSubSuper'),
      (e.MmlSubArgument = 'mmlSubArgument'),
      (e.MmlSuperArgument = 'mmlSuperArgument'),
      (e.MmlNary = 'mmlNary'),
      (e.MmlDelimiter = 'mmlDelimiter'),
      (e.MmlRun = 'mmlRun'),
      (e.MmlEquationArray = 'mmlEquationArray'),
      (e.MmlLimit = 'mmlLimit'),
      (e.MmlLimitLower = 'mmlLimitLower'),
      (e.MmlMatrix = 'mmlMatrix'),
      (e.MmlMatrixRow = 'mmlMatrixRow'),
      (e.MmlBox = 'mmlBox'),
      (e.MmlBar = 'mmlBar'),
      (e.MmlGroupChar = 'mmlGroupChar'),
      (e.VmlElement = 'vmlElement'),
      (e.Inserted = 'inserted'),
      (e.Deleted = 'deleted'),
      (e.DeletedText = 'deletedText'),
      (e.Comment = 'comment'),
      (e.CommentReference = 'commentReference'),
      (e.CommentRangeStart = 'commentRangeStart'),
      (e.CommentRangeEnd = 'commentRangeEnd')
  })(C || (C = {}))
  class z {
    constructor() {
      ;(this.children = []), (this.cssStyle = {})
    }
  }
  class V extends z {
    constructor() {
      super(...arguments), (this.type = C.Header)
    }
  }
  class j extends z {
    constructor() {
      super(...arguments), (this.type = C.Footer)
    }
  }
  class W extends c {
    constructor(e, t, r) {
      super(e, t), (this._documentParser = r)
    }
    parseXml(e) {
      ;(this.rootElement = this.createRootElement()), (this.rootElement.children = this._documentParser.parseBodyElements(e))
    }
  }
  class X extends W {
    createRootElement() {
      return new V()
    }
  }
  class U extends W {
    createRootElement() {
      return new j()
    }
  }
  function q(e) {
    if (void 0 !== e) return parseInt(e)
  }
  class G extends c {
    parseXml(e) {
      this.props = (function (e, t) {
        const r = {}
        for (let a of t.elements(e))
          switch (a.localName) {
            case 'Template':
              r.template = a.textContent
              break
            case 'Pages':
              r.pages = q(a.textContent)
              break
            case 'Words':
              r.words = q(a.textContent)
              break
            case 'Characters':
              r.characters = q(a.textContent)
              break
            case 'Application':
              r.application = a.textContent
              break
            case 'Lines':
              r.lines = q(a.textContent)
              break
            case 'Paragraphs':
              r.paragraphs = q(a.textContent)
              break
            case 'Company':
              r.company = a.textContent
              break
            case 'AppVersion':
              r.appVersion = a.textContent
          }
        return r
      })(e, this._package.xmlParser)
    }
  }
  class J extends c {
    parseXml(e) {
      this.props = (function (e, t) {
        const r = {}
        for (let a of t.elements(e))
          switch (a.localName) {
            case 'title':
              r.title = a.textContent
              break
            case 'description':
              r.description = a.textContent
              break
            case 'subject':
              r.subject = a.textContent
              break
            case 'creator':
              r.creator = a.textContent
              break
            case 'keywords':
              r.keywords = a.textContent
              break
            case 'language':
              r.language = a.textContent
              break
            case 'lastModifiedBy':
              r.lastModifiedBy = a.textContent
              break
            case 'revision':
              a.textContent && (r.revision = parseInt(a.textContent))
          }
        return r
      })(e, this._package.xmlParser)
    }
  }
  class Z {}
  function K(e, t) {
    var r = { name: t.attr(e, 'name'), colors: {} }
    for (let n of t.elements(e)) {
      var a = t.element(n, 'srgbClr'),
        s = t.element(n, 'sysClr')
      a ? (r.colors[n.localName] = t.attr(a, 'val')) : s && (r.colors[n.localName] = t.attr(s, 'lastClr'))
    }
    return r
  }
  function Y(e, t) {
    var r = { name: t.attr(e, 'name') }
    for (let a of t.elements(e))
      switch (a.localName) {
        case 'majorFont':
          r.majorFont = Q(a, t)
          break
        case 'minorFont':
          r.minorFont = Q(a, t)
      }
    return r
  }
  function Q(e, t) {
    return { latinTypeface: t.elementAttr(e, 'latin', 'typeface'), eaTypeface: t.elementAttr(e, 'ea', 'typeface'), csTypeface: t.elementAttr(e, 'cs', 'typeface') }
  }
  class ee extends c {
    constructor(e, t) {
      super(e, t)
    }
    parseXml(e) {
      this.theme = (function (e, t) {
        var r = new Z(),
          a = t.element(e, 'themeElements')
        for (let e of t.elements(a))
          switch (e.localName) {
            case 'clrScheme':
              r.colorScheme = K(e, t)
              break
            case 'fontScheme':
              r.fontScheme = Y(e, t)
          }
        return r
      })(e, this._package.xmlParser)
    }
  }
  class te {}
  class re extends te {
    constructor() {
      super(...arguments), (this.type = C.Footnote)
    }
  }
  class ae extends te {
    constructor() {
      super(...arguments), (this.type = C.Endnote)
    }
  }
  class se extends c {
    constructor(e, t, r) {
      super(e, t), (this._documentParser = r)
    }
  }
  class ne extends se {
    constructor(e, t, r) {
      super(e, t, r)
    }
    parseXml(e) {
      this.notes = this._documentParser.parseNotes(e, 'footnote', re)
    }
  }
  class le extends se {
    constructor(e, t, r) {
      super(e, t, r)
    }
    parseXml(e) {
      this.notes = this._documentParser.parseNotes(e, 'endnote', ae)
    }
  }
  function oe(e, t) {
    var r = { defaultNoteIds: [] }
    for (let a of t.elements(e))
      switch (a.localName) {
        case 'numFmt':
          r.nummeringFormat = t.attr(a, 'val')
          break
        case 'footnote':
        case 'endnote':
          r.defaultNoteIds.push(t.attr(a, 'id'))
      }
    return r
  }
  class ie extends c {
    constructor(e, t) {
      super(e, t)
    }
    parseXml(e) {
      this.settings = (function (e, t) {
        var r = {}
        for (let a of t.elements(e))
          switch (a.localName) {
            case 'defaultTabStop':
              r.defaultTabStop = t.lengthAttr(a, 'val')
              break
            case 'footnotePr':
              r.footnoteProps = oe(a, t)
              break
            case 'endnotePr':
              r.endnoteProps = oe(a, t)
              break
            case 'autoHyphenation':
              r.autoHyphenation = t.boolAttr(a, 'val')
          }
        return r
      })(e, this._package.xmlParser)
    }
  }
  class ce extends c {
    parseXml(e) {
      this.props = (function (e, t) {
        return t.elements(e, 'property').map(e => {
          const r = e.firstChild
          return { formatId: t.attr(e, 'fmtid'), name: t.attr(e, 'name'), type: r.nodeName, value: r.textContent }
        })
      })(e, this._package.xmlParser)
    }
  }
  class he extends c {
    constructor(e, t, r) {
      super(e, t), (this._documentParser = r)
    }
    parseXml(e) {
      ;(this.comments = this._documentParser.parseComments(e)), (this.commentMap = g(this.comments, e => e.id))
    }
  }
  class me extends c {
    constructor(e, t) {
      super(e, t), (this.comments = [])
    }
    parseXml(e) {
      const t = this._package.xmlParser
      for (let r of t.elements(e, 'commentEx')) this.comments.push({ paraId: t.attr(r, 'paraId'), paraIdParent: t.attr(r, 'paraIdParent'), done: t.boolAttr(r, 'done') })
      this.commentMap = g(this.comments, e => e.paraId)
    }
  }
  const ue = [
    { type: r.OfficeDocument, target: 'word/document.xml' },
    { type: r.ExtendedProperties, target: 'docProps/app.xml' },
    { type: r.CoreProperties, target: 'docProps/core.xml' },
    { type: r.CustomProperties, target: 'docProps/custom.xml' }
  ]
  class pe {
    constructor() {
      ;(this.parts = []), (this.partsMap = {})
    }
    static async load(e, t, r) {
      var a = new pe()
      return (
        (a._options = r),
        (a._parser = t),
        (a._package = await v.load(e, r)),
        (a.rels = await a._package.loadRelationships()),
        await Promise.all(
          ue.map(e => {
            const t = a.rels.find(t => t.type === e.type) ?? e
            return a.loadRelationshipPart(t.target, t.type)
          })
        ),
        a
      )
    }
    save(e = 'blob') {
      return this._package.save(e)
    }
    async loadRelationshipPart(e, t) {
      if (this.partsMap[e]) return this.partsMap[e]
      if (!this._package.get(e)) return null
      let a = null
      switch (t) {
        case r.OfficeDocument:
          this.documentPart = a = new S(this._package, e, this._parser)
          break
        case r.FontTable:
          this.fontTablePart = a = new p(this._package, e)
          break
        case r.Numbering:
          this.numberingPart = a = new H(this._package, e, this._parser)
          break
        case r.Styles:
          this.stylesPart = a = new _(this._package, e, this._parser)
          break
        case r.Theme:
          this.themePart = a = new ee(this._package, e)
          break
        case r.Footnotes:
          this.footnotesPart = a = new ne(this._package, e, this._parser)
          break
        case r.Endnotes:
          this.endnotesPart = a = new le(this._package, e, this._parser)
          break
        case r.Footer:
          a = new U(this._package, e, this._parser)
          break
        case r.Header:
          a = new X(this._package, e, this._parser)
          break
        case r.CoreProperties:
          this.corePropsPart = a = new J(this._package, e)
          break
        case r.ExtendedProperties:
          this.extendedPropsPart = a = new G(this._package, e)
          break
        case r.CustomProperties:
          a = new ce(this._package, e)
          break
        case r.Settings:
          this.settingsPart = a = new ie(this._package, e)
          break
        case r.Comments:
          this.commentsPart = a = new he(this._package, e, this._parser)
          break
        case r.CommentsExtended:
          this.commentsExtendedPart = a = new me(this._package, e)
      }
      if (null == a) return Promise.resolve(null)
      if (((this.partsMap[e] = a), this.parts.push(a), await a.load(), a.rels?.length > 0)) {
        const [e] = d(a.path)
        await Promise.all(a.rels.map(t => this.loadRelationshipPart(f(t.target, e), t.type)))
      }
      return a
    }
    async loadDocumentImage(e, t) {
      const r = await this.loadResource(t ?? this.documentPart, e, 'blob')
      return this.blobToURL(r)
    }
    async loadNumberingImage(e) {
      const t = await this.loadResource(this.numberingPart, e, 'blob')
      return this.blobToURL(t)
    }
    async loadFont(e, t) {
      const r = await this.loadResource(this.fontTablePart, e, 'uint8array')
      return r ? this.blobToURL(new Blob([de(r, t)])) : r
    }
    blobToURL(e) {
      return e
        ? this._options.useBase64URL
          ? (function (e) {
              return new Promise((t, r) => {
                const a = new FileReader()
                ;(a.onloadend = () => t(a.result)), (a.onerror = () => r()), a.readAsDataURL(e)
              })
            })(e)
          : URL.createObjectURL(e)
        : null
    }
    findPartByRelId(e, t = null) {
      var r = (t.rels ?? this.rels).find(t => t.id == e)
      const a = t ? d(t.path)[0] : ''
      return r ? this.partsMap[f(r.target, a)] : null
    }
    getPathById(e, t) {
      const r = e.rels.find(e => e.id == t),
        [a] = d(e.path)
      return r ? f(r.target, a) : null
    }
    loadResource(e, t, r) {
      const a = this.getPathById(e, t)
      return a ? this._package.load(a, r) : Promise.resolve(null)
    }
  }
  function de(e, t) {
    const r = t.replace(/{|}|-/g, ''),
      a = new Array(16)
    for (let e = 0; e < 16; e++) a[16 - e - 1] = parseInt(r.substr(2 * e, 2), 16)
    for (let t = 0; t < 32; t++) e[t] = e[t] ^ a[t % 16]
    return e
  }
  function fe(e, t) {
    return { type: C.BookmarkEnd, id: t.attr(e, 'id') }
  }
  class ge extends z {
    constructor() {
      super(...arguments), (this.type = C.VmlElement), (this.attrs = {})
    }
  }
  function be(e, t) {
    var r = new ge()
    switch (e.localName) {
      case 'rect':
        ;(r.tagName = 'rect'), Object.assign(r.attrs, { width: '100%', height: '100%' })
        break
      case 'oval':
        ;(r.tagName = 'ellipse'), Object.assign(r.attrs, { cx: '50%', cy: '50%', rx: '50%', ry: '50%' })
        break
      case 'line':
        r.tagName = 'line'
        break
      case 'shape':
        r.tagName = 'g'
        break
      case 'textbox':
        ;(r.tagName = 'foreignObject'), Object.assign(r.attrs, { width: '100%', height: '100%' })
        break
      default:
        return null
    }
    for (const t of i.attrs(e))
      switch (t.localName) {
        case 'style':
          r.cssStyleText = t.value
          break
        case 'fillcolor':
          r.attrs.fill = t.value
          break
        case 'from':
          const [e, a] = ke(t.value)
          Object.assign(r.attrs, { x1: e, y1: a })
          break
        case 'to':
          const [s, n] = ke(t.value)
          Object.assign(r.attrs, { x2: s, y2: n })
      }
    for (const a of i.elements(e))
      switch (a.localName) {
        case 'stroke':
          Object.assign(r.attrs, ye(a))
          break
        case 'fill':
          Object.assign(r.attrs, {})
          break
        case 'imagedata':
          ;(r.tagName = 'image'), Object.assign(r.attrs, { width: '100%', height: '100%' }), (r.imageHref = { id: i.attr(a, 'id'), title: i.attr(a, 'title') })
          break
        case 'txbxContent':
          r.children.push(...t.parseBodyElements(a))
          break
        default:
          const e = be(a, t)
          e && r.children.push(e)
      }
    return r
  }
  function ye(e) {
    return { stroke: i.attr(e, 'color'), 'stroke-width': i.lengthAttr(e, 'weight', s.Emu) ?? '1px' }
  }
  function ke(e) {
    return e.split(',')
  }
  class ve extends z {
    constructor() {
      super(...arguments), (this.type = C.Comment)
    }
  }
  class Se extends z {
    constructor(e) {
      super(), (this.id = e), (this.type = C.CommentReference)
    }
  }
  class Pe extends z {
    constructor(e) {
      super(), (this.id = e), (this.type = C.CommentRangeStart)
    }
  }
  class we extends z {
    constructor(e) {
      super(), (this.id = e), (this.type = C.CommentRangeEnd)
    }
  }
  var xe = 'inherit',
    Ce = 'black',
    Ne = 'black',
    Me = 'transparent'
  const Ae = [],
    Te = {
      oMath: C.MmlMath,
      oMathPara: C.MmlMathParagraph,
      f: C.MmlFraction,
      func: C.MmlFunction,
      fName: C.MmlFunctionName,
      num: C.MmlNumerator,
      den: C.MmlDenominator,
      rad: C.MmlRadical,
      deg: C.MmlDegree,
      e: C.MmlBase,
      sSup: C.MmlSuperscript,
      sSub: C.MmlSubscript,
      sPre: C.MmlPreSubSuper,
      sup: C.MmlSuperArgument,
      sub: C.MmlSubArgument,
      d: C.MmlDelimiter,
      nary: C.MmlNary,
      eqArr: C.MmlEquationArray,
      lim: C.MmlLimit,
      limLow: C.MmlLimitLower,
      m: C.MmlMatrix,
      mr: C.MmlMatrixRow,
      box: C.MmlBox,
      bar: C.MmlBar,
      groupChr: C.MmlGroupChar
    }
  class Ee {
    constructor(e) {
      this.options = { ignoreWidth: !1, debug: !1, ...e }
    }
    parseNotes(e, t, r) {
      var a = []
      for (let s of i.elements(e, t)) {
        const e = new r()
        ;(e.id = i.attr(s, 'id')), (e.noteType = i.attr(s, 'type')), (e.children = this.parseBodyElements(s)), a.push(e)
      }
      return a
    }
    parseComments(e) {
      var t = []
      for (let r of i.elements(e, 'comment')) {
        const e = new ve()
        ;(e.id = i.attr(r, 'id')), (e.author = i.attr(r, 'author')), (e.initials = i.attr(r, 'initials')), (e.date = i.attr(r, 'date')), (e.children = this.parseBodyElements(r)), t.push(e)
      }
      return t
    }
    parseDocumentFile(e) {
      var t = i.element(e, 'body'),
        r = i.element(e, 'background'),
        a = i.element(t, 'sectPr')
      return { type: C.Document, children: this.parseBodyElements(t), props: a ? N(a, i) : {}, cssStyle: r ? this.parseBackground(r) : {} }
    }
    parseBackground(e) {
      var t = {},
        r = De.colorAttr(e, 'color')
      return r && (t['background-color'] = r), t
    }
    parseBodyElements(e) {
      var t = []
      for (let r of i.elements(e))
        switch (r.localName) {
          case 'p':
            t.push(this.parseParagraph(r))
            break
          case 'tbl':
            t.push(this.parseTable(r))
            break
          case 'sdt':
            t.push(...this.parseSdt(r, e => this.parseBodyElements(e)))
        }
      return t
    }
    parseStylesFile(e) {
      var t = []
      return (
        De.foreach(e, e => {
          switch (e.localName) {
            case 'style':
              t.push(this.parseStyle(e))
              break
            case 'docDefaults':
              t.push(this.parseDefaultStyles(e))
          }
        }),
        t
      )
    }
    parseDefaultStyles(e) {
      var t = { id: null, name: null, target: null, basedOn: null, styles: [] }
      return (
        De.foreach(e, e => {
          switch (e.localName) {
            case 'rPrDefault':
              var r = i.element(e, 'rPr')
              r && t.styles.push({ target: 'span', values: this.parseDefaultProperties(r, {}) })
              break
            case 'pPrDefault':
              var a = i.element(e, 'pPr')
              a && t.styles.push({ target: 'p', values: this.parseDefaultProperties(a, {}) })
          }
        }),
        t
      )
    }
    parseStyle(e) {
      var t = { id: i.attr(e, 'styleId'), isDefault: i.boolAttr(e, 'default'), name: null, target: null, basedOn: null, styles: [], linked: null }
      switch (i.attr(e, 'type')) {
        case 'paragraph':
          t.target = 'p'
          break
        case 'table':
          t.target = 'table'
          break
        case 'character':
          t.target = 'span'
      }
      return (
        De.foreach(e, e => {
          switch (e.localName) {
            case 'basedOn':
              t.basedOn = i.attr(e, 'val')
              break
            case 'name':
              t.name = i.attr(e, 'val')
              break
            case 'link':
              t.linked = i.attr(e, 'val')
              break
            case 'next':
              t.next = i.attr(e, 'val')
              break
            case 'aliases':
              t.aliases = i.attr(e, 'val').split(',')
              break
            case 'pPr':
              t.styles.push({ target: 'p', values: this.parseDefaultProperties(e, {}) }), (t.paragraphProps = D(e, i))
              break
            case 'rPr':
              t.styles.push({ target: 'span', values: this.parseDefaultProperties(e, {}) }), (t.runProps = E(e, i))
              break
            case 'tblPr':
            case 'tcPr':
              t.styles.push({ target: 'td', values: this.parseDefaultProperties(e, {}) })
              break
            case 'tblStylePr':
              for (let r of this.parseTableStyle(e)) t.styles.push(r)
              break
            case 'rsid':
            case 'qFormat':
            case 'hidden':
            case 'semiHidden':
            case 'unhideWhenUsed':
            case 'autoRedefine':
            case 'uiPriority':
              break
            default:
              this.options.debug && console.warn(`DOCX: Unknown style element: ${e.localName}`)
          }
        }),
        t
      )
    }
    parseTableStyle(e) {
      var t = [],
        r = i.attr(e, 'type'),
        a = '',
        s = ''
      switch (r) {
        case 'firstRow':
          ;(s = '.first-row'), (a = 'tr.first-row td')
          break
        case 'lastRow':
          ;(s = '.last-row'), (a = 'tr.last-row td')
          break
        case 'firstCol':
          ;(s = '.first-col'), (a = 'td.first-col')
          break
        case 'lastCol':
          ;(s = '.last-col'), (a = 'td.last-col')
          break
        case 'band1Vert':
          ;(s = ':not(.no-vband)'), (a = 'td.odd-col')
          break
        case 'band2Vert':
          ;(s = ':not(.no-vband)'), (a = 'td.even-col')
          break
        case 'band1Horz':
          ;(s = ':not(.no-hband)'), (a = 'tr.odd-row')
          break
        case 'band2Horz':
          ;(s = ':not(.no-hband)'), (a = 'tr.even-row')
          break
        default:
          return []
      }
      return (
        De.foreach(e, e => {
          switch (e.localName) {
            case 'pPr':
              t.push({ target: `${a} p`, mod: s, values: this.parseDefaultProperties(e, {}) })
              break
            case 'rPr':
              t.push({ target: `${a} span`, mod: s, values: this.parseDefaultProperties(e, {}) })
              break
            case 'tblPr':
            case 'tcPr':
              t.push({ target: a, mod: s, values: this.parseDefaultProperties(e, {}) })
          }
        }),
        t
      )
    }
    parseNumberingFile(e) {
      var t = [],
        r = {},
        a = []
      return (
        De.foreach(e, e => {
          switch (e.localName) {
            case 'abstractNum':
              this.parseAbstractNumbering(e, a).forEach(e => t.push(e))
              break
            case 'numPicBullet':
              a.push(this.parseNumberingPicBullet(e))
              break
            case 'num':
              var s = i.attr(e, 'numId'),
                n = i.elementAttr(e, 'abstractNumId', 'val')
              r[n] = s
          }
        }),
        t.forEach(e => (e.id = r[e.id])),
        t
      )
    }
    parseNumberingPicBullet(e) {
      var t = i.element(e, 'pict'),
        r = t && i.element(t, 'shape'),
        a = r && i.element(r, 'imagedata')
      return a ? { id: i.intAttr(e, 'numPicBulletId'), src: i.attr(a, 'id'), style: i.attr(r, 'style') } : null
    }
    parseAbstractNumbering(e, t) {
      var r = [],
        a = i.attr(e, 'abstractNumId')
      return (
        De.foreach(e, e => {
          if ('lvl' === e.localName) r.push(this.parseNumberingLevel(a, e, t))
        }),
        r
      )
    }
    parseNumberingLevel(e, t, r) {
      var a = { id: e, level: i.intAttr(t, 'ilvl'), start: 1, pStyleName: void 0, pStyle: {}, rStyle: {}, suff: 'tab' }
      return (
        De.foreach(t, e => {
          switch (e.localName) {
            case 'start':
              a.start = i.intAttr(e, 'val')
              break
            case 'pPr':
              this.parseDefaultProperties(e, a.pStyle)
              break
            case 'rPr':
              this.parseDefaultProperties(e, a.rStyle)
              break
            case 'lvlPicBulletId':
              var t = i.intAttr(e, 'val')
              a.bullet = r.find(e => e?.id == t)
              break
            case 'lvlText':
              a.levelText = i.attr(e, 'val')
              break
            case 'pStyle':
              a.pStyleName = i.attr(e, 'val')
              break
            case 'numFmt':
              a.format = i.attr(e, 'val')
              break
            case 'suff':
              a.suff = i.attr(e, 'val')
          }
        }),
        a
      )
    }
    parseSdt(e, t) {
      const r = i.element(e, 'sdtContent')
      return r ? t(r) : []
    }
    parseInserted(e, t) {
      return { type: C.Inserted, children: t(e)?.children ?? [] }
    }
    parseDeleted(e, t) {
      return { type: C.Deleted, children: t(e)?.children ?? [] }
    }
    parseParagraph(e) {
      var t,
        r,
        a = { type: C.Paragraph, children: [] }
      for (let s of i.elements(e))
        switch (s.localName) {
          case 'pPr':
            this.parseParagraphProperties(s, a)
            break
          case 'r':
            a.children.push(this.parseRun(s, a))
            break
          case 'hyperlink':
            a.children.push(this.parseHyperlink(s, a))
            break
          case 'smartTag':
            a.children.push(this.parseSmartTag(s, a))
            break
          case 'bookmarkStart':
            a.children.push(((t = s), (r = i), { type: C.BookmarkStart, id: r.attr(t, 'id'), name: r.attr(t, 'name'), colFirst: r.intAttr(t, 'colFirst'), colLast: r.intAttr(t, 'colLast') }))
            break
          case 'bookmarkEnd':
            a.children.push(fe(s, i))
            break
          case 'commentRangeStart':
            a.children.push(new Pe(i.attr(s, 'id')))
            break
          case 'commentRangeEnd':
            a.children.push(new we(i.attr(s, 'id')))
            break
          case 'oMath':
          case 'oMathPara':
            a.children.push(this.parseMathElement(s))
            break
          case 'sdt':
            a.children.push(...this.parseSdt(s, e => this.parseParagraph(e).children))
            break
          case 'ins':
            a.children.push(this.parseInserted(s, e => this.parseParagraph(e)))
            break
          case 'del':
            a.children.push(this.parseDeleted(s, e => this.parseParagraph(e)))
        }
      return a
    }
    parseParagraphProperties(e, t) {
      this.parseDefaultProperties(e, (t.cssStyle = {}), null, e => {
        if (B(e, t, i)) return !0
        switch (e.localName) {
          case 'pStyle':
            t.styleName = i.attr(e, 'val')
            break
          case 'cnfStyle':
            t.className = Be.classNameOfCnfStyle(e)
            break
          case 'framePr':
            this.parseFrame(e, t)
            break
          case 'rPr':
            break
          default:
            return !1
        }
        return !0
      })
    }
    parseFrame(e, t) {
      'drop' == i.attr(e, 'dropCap') && (t.cssStyle.float = 'left')
    }
    parseHyperlink(e, t) {
      var r = { type: C.Hyperlink, parent: t, children: [] },
        a = i.attr(e, 'anchor'),
        s = i.attr(e, 'id')
      return (
        a && (r.href = '#' + a),
        s && (r.id = s),
        De.foreach(e, e => {
          if ('r' === e.localName) r.children.push(this.parseRun(e, r))
        }),
        r
      )
    }
    parseSmartTag(e, t) {
      var r = { type: C.SmartTag, parent: t, children: [] },
        a = i.attr(e, 'uri'),
        s = i.attr(e, 'element')
      return (
        a && (r.uri = a),
        s && (r.element = s),
        De.foreach(e, e => {
          if ('r' === e.localName) r.children.push(this.parseRun(e, r))
        }),
        r
      )
    }
    parseRun(e, t) {
      var r = { type: C.Run, parent: t, children: [] }
      return (
        De.foreach(e, e => {
          switch ((e = this.checkAlternateContent(e)).localName) {
            case 't':
              r.children.push({ type: C.Text, text: e.textContent })
              break
            case 'delText':
              r.children.push({ type: C.DeletedText, text: e.textContent })
              break
            case 'commentReference':
              r.children.push(new Se(i.attr(e, 'id')))
              break
            case 'fldSimple':
              r.children.push({ type: C.SimpleField, instruction: i.attr(e, 'instr'), lock: i.boolAttr(e, 'lock', !1), dirty: i.boolAttr(e, 'dirty', !1) })
              break
            case 'instrText':
              ;(r.fieldRun = !0), r.children.push({ type: C.Instruction, text: e.textContent })
              break
            case 'fldChar':
              ;(r.fieldRun = !0), r.children.push({ type: C.ComplexField, charType: i.attr(e, 'fldCharType'), lock: i.boolAttr(e, 'lock', !1), dirty: i.boolAttr(e, 'dirty', !1) })
              break
            case 'noBreakHyphen':
              r.children.push({ type: C.NoBreakHyphen })
              break
            case 'br':
              r.children.push({ type: C.Break, break: i.attr(e, 'type') || 'textWrapping' })
              break
            case 'lastRenderedPageBreak':
              r.children.push({ type: C.Break, break: 'lastRenderedPageBreak' })
              break
            case 'sym':
              r.children.push({ type: C.Symbol, font: i.attr(e, 'font'), char: i.attr(e, 'char') })
              break
            case 'tab':
              r.children.push({ type: C.Tab })
              break
            case 'footnoteReference':
              r.children.push({ type: C.FootnoteReference, id: i.attr(e, 'id') })
              break
            case 'endnoteReference':
              r.children.push({ type: C.EndnoteReference, id: i.attr(e, 'id') })
              break
            case 'drawing':
              let t = this.parseDrawing(e)
              t && (r.children = [t])
              break
            case 'pict':
              r.children.push(this.parseVmlPicture(e))
              break
            case 'rPr':
              this.parseRunProperties(e, r)
          }
        }),
        r
      )
    }
    parseMathElement(e) {
      const t = `${e.localName}Pr`,
        r = { type: Te[e.localName], children: [] }
      for (const s of i.elements(e)) {
        if (Te[s.localName]) r.children.push(this.parseMathElement(s))
        else if ('r' == s.localName) {
          var a = this.parseRun(s)
          ;(a.type = C.MmlRun), r.children.push(a)
        } else s.localName == t && (r.props = this.parseMathProperies(s))
      }
      return r
    }
    parseMathProperies(e) {
      const t = {}
      for (const r of i.elements(e))
        switch (r.localName) {
          case 'chr':
            t.char = i.attr(r, 'val')
            break
          case 'vertJc':
            t.verticalJustification = i.attr(r, 'val')
            break
          case 'pos':
            t.position = i.attr(r, 'val')
            break
          case 'degHide':
            t.hideDegree = i.boolAttr(r, 'val')
            break
          case 'begChr':
            t.beginChar = i.attr(r, 'val')
            break
          case 'endChr':
            t.endChar = i.attr(r, 'val')
        }
      return t
    }
    parseRunProperties(e, t) {
      this.parseDefaultProperties(e, (t.cssStyle = {}), null, e => {
        switch (e.localName) {
          case 'rStyle':
            t.styleName = i.attr(e, 'val')
            break
          case 'vertAlign':
            t.verticalAlign = Be.valueOfVertAlign(e, !0)
            break
          default:
            return !1
        }
        return !0
      })
    }
    parseVmlPicture(e) {
      const t = { type: C.VmlPicture, children: [] }
      for (const r of i.elements(e)) {
        const e = be(r, this)
        e && t.children.push(e)
      }
      return t
    }
    checkAlternateContent(e) {
      if ('AlternateContent' != e.localName) return e
      var t = i.element(e, 'Choice')
      if (t) {
        var r = i.attr(t, 'Requires'),
          a = e.lookupNamespaceURI(r)
        if (Ae.includes(a)) return t.firstElementChild
      }
      return i.element(e, 'Fallback')?.firstElementChild
    }
    parseDrawing(e) {
      for (var t of i.elements(e))
        switch (t.localName) {
          case 'inline':
          case 'anchor':
            return this.parseDrawingWrapper(t)
        }
    }
    parseDrawingWrapper(e) {
      var t = { type: C.Drawing, children: [], cssStyle: {} },
        r = 'anchor' == e.localName
      let a = null,
        n = i.boolAttr(e, 'simplePos')
      i.boolAttr(e, 'behindDoc')
      let l = { relative: 'page', align: 'left', offset: '0' },
        o = { relative: 'page', align: 'top', offset: '0' }
      for (var c of i.elements(e))
        switch (c.localName) {
          case 'simplePos':
            n && ((l.offset = i.lengthAttr(c, 'x', s.Emu)), (o.offset = i.lengthAttr(c, 'y', s.Emu)))
            break
          case 'extent':
            ;(t.cssStyle.width = i.lengthAttr(c, 'cx', s.Emu)), (t.cssStyle.height = i.lengthAttr(c, 'cy', s.Emu))
            break
          case 'positionH':
          case 'positionV':
            if (!n) {
              let e = 'positionH' == c.localName ? l : o
              var h = i.element(c, 'align'),
                m = i.element(c, 'posOffset')
              ;(e.relative = i.attr(c, 'relativeFrom') ?? e.relative), h && (e.align = h.textContent), m && (e.offset = De.sizeValue(m, s.Emu))
            }
            break
          case 'wrapTopAndBottom':
            a = 'wrapTopAndBottom'
            break
          case 'wrapNone':
            a = 'wrapNone'
            break
          case 'graphic':
            var u = this.parseGraphic(c)
            u && t.children.push(u)
        }
      return (
        'wrapTopAndBottom' == a
          ? ((t.cssStyle.display = 'block'), l.align && ((t.cssStyle['text-align'] = l.align), (t.cssStyle.width = '100%')))
          : 'wrapNone' == a
          ? ((t.cssStyle.display = 'block'), (t.cssStyle.position = 'relative'), (t.cssStyle.width = '0px'), (t.cssStyle.height = '0px'), l.offset && (t.cssStyle.left = l.offset), o.offset && (t.cssStyle.top = o.offset))
          : !r || ('left' != l.align && 'right' != l.align) || (t.cssStyle.float = l.align),
        t
      )
    }
    parseGraphic(e) {
      var t = i.element(e, 'graphicData')
      for (let e of i.elements(t)) if ('pic' === e.localName) return this.parsePicture(e)
      return null
    }
    parsePicture(e) {
      var t = { type: C.Image, src: '', cssStyle: {} },
        r = i.element(e, 'blipFill'),
        a = i.element(r, 'blip')
      t.src = i.attr(a, 'embed')
      var n = i.element(e, 'spPr'),
        l = i.element(n, 'xfrm')
      for (var o of ((t.cssStyle.position = 'relative'), i.elements(l)))
        switch (o.localName) {
          case 'ext':
            ;(t.cssStyle.width = i.lengthAttr(o, 'cx', s.Emu)), (t.cssStyle.height = i.lengthAttr(o, 'cy', s.Emu))
            break
          case 'off':
            ;(t.cssStyle.left = i.lengthAttr(o, 'x', s.Emu)), (t.cssStyle.top = i.lengthAttr(o, 'y', s.Emu))
        }
      return t
    }
    parseTable(e) {
      var t = { type: C.Table, children: [] }
      return (
        De.foreach(e, e => {
          switch (e.localName) {
            case 'tr':
              t.children.push(this.parseTableRow(e))
              break
            case 'tblGrid':
              t.columns = this.parseTableColumns(e)
              break
            case 'tblPr':
              this.parseTableProperties(e, t)
          }
        }),
        t
      )
    }
    parseTableColumns(e) {
      var t = []
      return (
        De.foreach(e, e => {
          if ('gridCol' === e.localName) t.push({ width: i.lengthAttr(e, 'w') })
        }),
        t
      )
    }
    parseTableProperties(e, t) {
      switch (
        ((t.cssStyle = {}),
        (t.cellStyle = {}),
        this.parseDefaultProperties(e, t.cssStyle, t.cellStyle, e => {
          switch (e.localName) {
            case 'tblStyle':
              t.styleName = i.attr(e, 'val')
              break
            case 'tblLook':
              t.className = Be.classNameOftblLook(e)
              break
            case 'tblpPr':
              this.parseTablePosition(e, t)
              break
            case 'tblStyleColBandSize':
              t.colBandSize = i.intAttr(e, 'val')
              break
            case 'tblStyleRowBandSize':
              t.rowBandSize = i.intAttr(e, 'val')
              break
            default:
              return !1
          }
          return !0
        }),
        t.cssStyle['text-align'])
      ) {
        case 'center':
          delete t.cssStyle['text-align'], (t.cssStyle['margin-left'] = 'auto'), (t.cssStyle['margin-right'] = 'auto')
          break
        case 'right':
          delete t.cssStyle['text-align'], (t.cssStyle['margin-left'] = 'auto')
      }
    }
    parseTablePosition(e, t) {
      var r = i.lengthAttr(e, 'topFromText'),
        a = i.lengthAttr(e, 'bottomFromText'),
        s = i.lengthAttr(e, 'rightFromText'),
        n = i.lengthAttr(e, 'leftFromText')
      ;(t.cssStyle.float = 'left'),
        (t.cssStyle['margin-bottom'] = Be.addSize(t.cssStyle['margin-bottom'], a)),
        (t.cssStyle['margin-left'] = Be.addSize(t.cssStyle['margin-left'], n)),
        (t.cssStyle['margin-right'] = Be.addSize(t.cssStyle['margin-right'], s)),
        (t.cssStyle['margin-top'] = Be.addSize(t.cssStyle['margin-top'], r))
    }
    parseTableRow(e) {
      var t = { type: C.Row, children: [] }
      return (
        De.foreach(e, e => {
          switch (e.localName) {
            case 'tc':
              t.children.push(this.parseTableCell(e))
              break
            case 'trPr':
              this.parseTableRowProperties(e, t)
          }
        }),
        t
      )
    }
    parseTableRowProperties(e, t) {
      t.cssStyle = this.parseDefaultProperties(e, {}, null, e => {
        switch (e.localName) {
          case 'cnfStyle':
            t.className = Be.classNameOfCnfStyle(e)
            break
          case 'tblHeader':
            t.isHeader = i.boolAttr(e, 'val')
            break
          default:
            return !1
        }
        return !0
      })
    }
    parseTableCell(e) {
      var t = { type: C.Cell, children: [] }
      return (
        De.foreach(e, e => {
          switch (e.localName) {
            case 'tbl':
              t.children.push(this.parseTable(e))
              break
            case 'p':
              t.children.push(this.parseParagraph(e))
              break
            case 'tcPr':
              this.parseTableCellProperties(e, t)
          }
        }),
        t
      )
    }
    parseTableCellProperties(e, t) {
      t.cssStyle = this.parseDefaultProperties(e, {}, null, e => {
        switch (e.localName) {
          case 'gridSpan':
            t.span = i.intAttr(e, 'val', null)
            break
          case 'vMerge':
            t.verticalMerge = i.attr(e, 'val') ?? 'continue'
            break
          case 'cnfStyle':
            t.className = Be.classNameOfCnfStyle(e)
            break
          default:
            return !1
        }
        return !0
      })
    }
    parseDefaultProperties(e, t = null, r = null, a = null) {
      return (
        (t = t || {}),
        De.foreach(e, n => {
          if (!a?.(n))
            switch (n.localName) {
              case 'jc':
                t['text-align'] = Be.valueOfJc(n)
                break
              case 'textAlignment':
                t['vertical-align'] = Be.valueOfTextAlignment(n)
                break
              case 'color':
                t.color = De.colorAttr(n, 'val', null, Ce)
                break
              case 'sz':
                t['font-size'] = t['min-height'] = i.lengthAttr(n, 'val', s.FontSize)
                break
              case 'shd':
                t['background-color'] = De.colorAttr(n, 'fill', null, xe)
                break
              case 'highlight':
                t['background-color'] = De.colorAttr(n, 'val', null, Me)
                break
              case 'vertAlign':
                break
              case 'position':
                t.verticalAlign = i.lengthAttr(n, 'val', s.FontSize)
                break
              case 'tcW':
                if (this.options.ignoreWidth) break
              case 'tblW':
                t.width = Be.valueOfSize(n, 'w')
                break
              case 'trHeight':
                this.parseTrHeight(n, t)
                break
              case 'strike':
                t['text-decoration'] = i.boolAttr(n, 'val', !0) ? 'line-through' : 'none'
                break
              case 'b':
                t['font-weight'] = i.boolAttr(n, 'val', !0) ? 'bold' : 'normal'
                break
              case 'i':
                t['font-style'] = i.boolAttr(n, 'val', !0) ? 'italic' : 'normal'
                break
              case 'caps':
                t['text-transform'] = i.boolAttr(n, 'val', !0) ? 'uppercase' : 'none'
                break
              case 'smallCaps':
                t['font-variant'] = i.boolAttr(n, 'val', !0) ? 'small-caps' : 'none'
                break
              case 'u':
                this.parseUnderline(n, t)
                break
              case 'ind':
              case 'tblInd':
                this.parseIndentation(n, t)
                break
              case 'rFonts':
                this.parseFont(n, t)
                break
              case 'tblBorders':
                this.parseBorderProperties(n, r || t)
                break
              case 'tblCellSpacing':
                ;(t['border-spacing'] = Be.valueOfMargin(n)), (t['border-collapse'] = 'separate')
                break
              case 'pBdr':
                this.parseBorderProperties(n, t)
                break
              case 'bdr':
                t.border = Be.valueOfBorder(n)
                break
              case 'tcBorders':
                this.parseBorderProperties(n, t)
                break
              case 'vanish':
                i.boolAttr(n, 'val', !0) && (t.display = 'none')
                break
              case 'kern':
              case 'noWrap':
                break
              case 'tblCellMar':
              case 'tcMar':
                this.parseMarginProperties(n, r || t)
                break
              case 'tblLayout':
                t['table-layout'] = Be.valueOfTblLayout(n)
                break
              case 'vAlign':
                t['vertical-align'] = Be.valueOfTextAlignment(n)
                break
              case 'spacing':
                'pPr' == e.localName && this.parseSpacing(n, t)
                break
              case 'wordWrap':
                i.boolAttr(n, 'val') && (t['overflow-wrap'] = 'break-word')
                break
              case 'suppressAutoHyphens':
                t.hyphens = i.boolAttr(n, 'val', !0) ? 'none' : 'auto'
                break
              case 'lang':
                t.$lang = i.attr(n, 'val')
                break
              case 'bCs':
              case 'iCs':
              case 'szCs':
              case 'tabs':
              case 'outlineLvl':
              case 'contextualSpacing':
              case 'tblStyleColBandSize':
              case 'tblStyleRowBandSize':
              case 'webHidden':
              case 'pageBreakBefore':
              case 'suppressLineNumbers':
              case 'keepLines':
              case 'keepNext':
              case 'widowControl':
              case 'bidi':
              case 'rtl':
              case 'noProof':
                break
              default:
                this.options.debug && console.warn(`DOCX: Unknown document element: ${e.localName}.${n.localName}`)
            }
        }),
        t
      )
    }
    parseUnderline(e, t) {
      var r = i.attr(e, 'val')
      if (null != r) {
        switch (r) {
          case 'dash':
          case 'dashDotDotHeavy':
          case 'dashDotHeavy':
          case 'dashedHeavy':
          case 'dashLong':
          case 'dashLongHeavy':
          case 'dotDash':
          case 'dotDotDash':
            t['text-decoration'] = 'underline dashed'
            break
          case 'dotted':
          case 'dottedHeavy':
            t['text-decoration'] = 'underline dotted'
            break
          case 'double':
            t['text-decoration'] = 'underline double'
            break
          case 'single':
          case 'thick':
          case 'words':
            t['text-decoration'] = 'underline'
            break
          case 'wave':
          case 'wavyDouble':
          case 'wavyHeavy':
            t['text-decoration'] = 'underline wavy'
            break
          case 'none':
            t['text-decoration'] = 'none'
        }
        var a = De.colorAttr(e, 'color')
        a && (t['text-decoration-color'] = a)
      }
    }
    parseFont(e, t) {
      var r = [i.attr(e, 'ascii'), Be.themeValue(e, 'asciiTheme')].filter(e => e).join(', ')
      r.length > 0 && (t['font-family'] = r)
    }
    parseIndentation(e, t) {
      var r = i.lengthAttr(e, 'firstLine'),
        a = i.lengthAttr(e, 'hanging'),
        s = i.lengthAttr(e, 'left'),
        n = i.lengthAttr(e, 'start'),
        l = i.lengthAttr(e, 'right'),
        o = i.lengthAttr(e, 'end')
      r && (t['text-indent'] = r), a && (t['text-indent'] = `-${a}`), (s || n) && (t['margin-left'] = s || n), (l || o) && (t['margin-right'] = l || o)
    }
    parseSpacing(e, t) {
      var r = i.lengthAttr(e, 'before'),
        a = i.lengthAttr(e, 'after'),
        s = i.intAttr(e, 'line', null),
        n = i.attr(e, 'lineRule')
      if ((r && (t['margin-top'] = r), a && (t['margin-bottom'] = a), null !== s))
        switch (n) {
          case 'auto':
            t['line-height'] = `${(s / 240).toFixed(2)}`
            break
          case 'atLeast':
            t['line-height'] = `calc(100% + ${s / 20}pt)`
            break
          default:
            t['line-height'] = t['min-height'] = s / 20 + 'pt'
        }
    }
    parseMarginProperties(e, t) {
      De.foreach(e, e => {
        switch (e.localName) {
          case 'left':
            t['padding-left'] = Be.valueOfMargin(e)
            break
          case 'right':
            t['padding-right'] = Be.valueOfMargin(e)
            break
          case 'top':
            t['padding-top'] = Be.valueOfMargin(e)
            break
          case 'bottom':
            t['padding-bottom'] = Be.valueOfMargin(e)
        }
      })
    }
    parseTrHeight(e, t) {
      i.attr(e, 'hRule'), (t.height = i.lengthAttr(e, 'val'))
    }
    parseBorderProperties(e, t) {
      De.foreach(e, e => {
        switch (e.localName) {
          case 'start':
          case 'left':
            t['border-left'] = Be.valueOfBorder(e)
            break
          case 'end':
          case 'right':
            t['border-right'] = Be.valueOfBorder(e)
            break
          case 'top':
            t['border-top'] = Be.valueOfBorder(e)
            break
          case 'bottom':
            t['border-bottom'] = Be.valueOfBorder(e)
        }
      })
    }
  }
  const Re = ['black', 'blue', 'cyan', 'darkBlue', 'darkCyan', 'darkGray', 'darkGreen', 'darkMagenta', 'darkRed', 'darkYellow', 'green', 'lightGray', 'magenta', 'none', 'red', 'white', 'yellow']
  class De {
    static foreach(e, t) {
      for (var r = 0; r < e.childNodes.length; r++) {
        let a = e.childNodes[r]
        a.nodeType == Node.ELEMENT_NODE && t(a)
      }
    }
    static colorAttr(e, t, r = null, a = 'black') {
      var s = i.attr(e, t)
      if (s) return 'auto' == s ? a : Re.includes(s) ? s : `#${s}`
      var n = i.attr(e, 'themeColor')
      return n ? `var(--docx-${n}-color)` : r
    }
    static sizeValue(e, t = s.Dxa) {
      return n(e.textContent, t)
    }
  }
  class Be {
    static themeValue(e, t) {
      var r = i.attr(e, t)
      return r ? `var(--docx-${r}-font)` : null
    }
    static valueOfSize(e, t) {
      var r = s.Dxa
      switch (i.attr(e, 'type')) {
        case 'dxa':
          break
        case 'pct':
          r = s.Percent
          break
        case 'auto':
          return 'auto'
      }
      return i.lengthAttr(e, t, r)
    }
    static valueOfMargin(e) {
      return i.lengthAttr(e, 'w')
    }
    static valueOfBorder(e) {
      if ('nil' == i.attr(e, 'val')) return 'none'
      var t = De.colorAttr(e, 'color')
      return `${i.lengthAttr(e, 'sz', s.Border)} solid ${'auto' == t ? Ne : t}`
    }
    static valueOfTblLayout(e) {
      return 'fixed' == i.attr(e, 'val') ? 'fixed' : 'auto'
    }
    static classNameOfCnfStyle(e) {
      const t = i.attr(e, 'val')
      return ['first-row', 'last-row', 'first-col', 'last-col', 'odd-col', 'even-col', 'odd-row', 'even-row', 'ne-cell', 'nw-cell', 'se-cell', 'sw-cell'].filter((e, r) => '1' == t[r]).join(' ')
    }
    static valueOfJc(e) {
      var t = i.attr(e, 'val')
      switch (t) {
        case 'start':
        case 'left':
          return 'left'
        case 'center':
          return 'center'
        case 'end':
        case 'right':
          return 'right'
        case 'both':
          return 'justify'
      }
      return t
    }
    static valueOfVertAlign(e, t = !1) {
      var r = i.attr(e, 'val')
      switch (r) {
        case 'subscript':
          return 'sub'
        case 'superscript':
          return t ? 'sup' : 'super'
      }
      return t ? null : r
    }
    static valueOfTextAlignment(e) {
      var t = i.attr(e, 'val')
      switch (t) {
        case 'auto':
        case 'baseline':
          return 'baseline'
        case 'top':
          return 'top'
        case 'center':
          return 'middle'
        case 'bottom':
          return 'bottom'
      }
      return t
    }
    static addSize(e, t) {
      return null == e ? t : null == t ? e : `calc(${e} + ${t})`
    }
    static classNameOftblLook(e) {
      const t = i.hexAttr(e, 'val', 0)
      let r = ''
      return (
        (i.boolAttr(e, 'firstRow') || 32 & t) && (r += ' first-row'),
        (i.boolAttr(e, 'lastRow') || 64 & t) && (r += ' last-row'),
        (i.boolAttr(e, 'firstColumn') || 128 & t) && (r += ' first-col'),
        (i.boolAttr(e, 'lastColumn') || 256 & t) && (r += ' last-col'),
        (i.boolAttr(e, 'noHBand') || 512 & t) && (r += ' no-hband'),
        (i.boolAttr(e, 'noVBand') || 1024 & t) && (r += ' no-vband'),
        r.trim()
      )
    }
  }
  const Fe = { pos: 0, leader: 'none', style: 'left' }
  function $e(e, t, r, a = 0.75) {
    const s = e.closest('p'),
      n = e.getBoundingClientRect(),
      l = s.getBoundingClientRect(),
      o = getComputedStyle(s),
      i = t?.length > 0 ? t.map(e => ({ pos: Ie(e.position), leader: e.leader, style: e.style })).sort((e, t) => e.pos - t.pos) : [Fe],
      c = i[i.length - 1],
      h = l.width * a,
      m = Ie(r)
    let u = c.pos + m
    if (u < h) for (; u < h && i.length < 50; u += m) i.push({ ...Fe, pos: u })
    const p = parseFloat(o.marginLeft),
      d = l.left + p,
      f = (n.left - d) * a,
      g = i.find(e => 'clear' != e.style && e.pos > f)
    if (null == g) return
    let b = 1
    if ('right' == g.style || 'center' == g.style) {
      const t = Array.from(s.querySelectorAll(`.${e.className}`)),
        r = t.indexOf(e) + 1,
        n = document.createRange()
      n.setStart(e, 1), r < t.length ? n.setEndBefore(t[r]) : n.setEndAfter(s)
      const o = 'center' == g.style ? 0.5 : 1,
        i = n.getBoundingClientRect(),
        c = i.left + o * i.width - (l.left - p)
      b = g.pos - c * a
    } else b = g.pos - f
    switch (((e.innerHTML = '&nbsp;'), (e.style.textDecoration = 'inherit'), (e.style.wordSpacing = `${b.toFixed(0)}pt`), g.leader)) {
      case 'dot':
      case 'middleDot':
        ;(e.style.textDecoration = 'underline'), (e.style.textDecorationStyle = 'dotted')
        break
      case 'hyphen':
      case 'heavy':
      case 'underscore':
        e.style.textDecoration = 'underline'
    }
  }
  function Ie(e) {
    return parseFloat(e)
  }
  const Le = 'http://www.w3.org/2000/svg',
    Oe = 'http://www.w3.org/1998/Math/MathML'
  class He {
    constructor(e) {
      ;(this.htmlDocument = e),
        (this.className = 'docx'),
        (this.styleMap = {}),
        (this.currentPart = null),
        (this.tableVerticalMerges = []),
        (this.currentVerticalMerge = null),
        (this.tableCellPositions = []),
        (this.currentCellPosition = null),
        (this.footnoteMap = {}),
        (this.endnoteMap = {}),
        (this.currentEndnoteIds = []),
        (this.usedHederFooterParts = []),
        (this.currentTabs = []),
        (this.tabsTimeout = 0),
        (this.commentMap = {}),
        (this.tasks = []),
        (this.postRenderTasks = []),
        (this.createElement = _e)
    }
    render(e, t, r = null, a) {
      ;(this.document = e),
        (this.options = a),
        (this.className = a.className),
        (this.rootSelector = a.inWrapper ? `.${this.className}-wrapper` : ':root'),
        (this.styleMap = null),
        (this.tasks = []),
        this.options.renderComments && globalThis.Highlight && (this.commentHighlight = new Highlight()),
        je((r = r || t)),
        je(t),
        Ue(r, 'docxjs library predefined styles'),
        r.appendChild(this.renderDefaultStyle()),
        e.themePart && (Ue(r, 'docxjs document theme values'), this.renderTheme(e.themePart, r)),
        null != e.stylesPart && ((this.styleMap = this.processStyles(e.stylesPart.styles)), Ue(r, 'docxjs document styles'), r.appendChild(this.renderStyles(e.stylesPart.styles))),
        e.numberingPart && (this.prodessNumberings(e.numberingPart.domNumberings), Ue(r, 'docxjs document numbering styles'), r.appendChild(this.renderNumbering(e.numberingPart.domNumberings, r))),
        e.footnotesPart && (this.footnoteMap = g(e.footnotesPart.notes, e => e.id)),
        e.endnotesPart && (this.endnoteMap = g(e.endnotesPart.notes, e => e.id)),
        e.settingsPart && (this.defaultTabSize = e.settingsPart.settings?.defaultTabStop),
        !a.ignoreFonts && e.fontTablePart && this.renderFontTable(e.fontTablePart, r)
      var s = this.renderSections(e.documentPart.body)
      this.options.inWrapper ? t.appendChild(this.renderWrapper(s)) : We(t, s), this.commentHighlight && a.renderComments && CSS.highlights.set(`${this.className}-comments`, this.commentHighlight), this.refreshTabStops(), this.postRenderTasks.forEach(e => e())
    }
    renderTheme(e, t) {
      const r = {},
        a = e.theme?.fontScheme
      a && (a.majorFont && (r['--docx-majorHAnsi-font'] = a.majorFont.latinTypeface), a.minorFont && (r['--docx-minorHAnsi-font'] = a.minorFont.latinTypeface))
      const s = e.theme?.colorScheme
      if (s) for (let [e, t] of Object.entries(s.colors)) r[`--docx-${e}-color`] = `#${t}`
      const n = this.styleToString(`.${this.className}`, r)
      t.appendChild(Xe(n))
    }
    renderFontTable(e, t) {
      for (let r of e.fonts)
        for (let e of r.embedFontRefs)
          this.tasks.push(
            this.document.loadFont(e.id, e.key).then(a => {
              const s = { 'font-family': r.name, src: `url(${a})` }
              ;('bold' != e.type && 'boldItalic' != e.type) || (s['font-weight'] = 'bold'), ('italic' != e.type && 'boldItalic' != e.type) || (s['font-style'] = 'italic'), Ue(t, `docxjs ${r.name} font`)
              const n = this.styleToString('@font-face', s)
              t.appendChild(Xe(n)), this.refreshTabStops()
            })
          )
    }
    processStyleName(e) {
      return e
        ? `${this.className}_${(function (e) {
            return e?.replace(/[ .]+/g, '-').replace(/[&]+/g, 'and').toLowerCase()
          })(e)}`
        : this.className
    }
    processStyles(e) {
      const t = g(
        e.filter(e => null != e.id),
        e => e.id
      )
      for (const a of e.filter(e => e.basedOn)) {
        var r = t[a.basedOn]
        if (r) {
          ;(a.paragraphProps = y(a.paragraphProps, r.paragraphProps)), (a.runProps = y(a.runProps, r.runProps))
          for (const e of r.styles) {
            const t = a.styles.find(t => t.target == e.target)
            t ? this.copyStyleProperties(e.values, t.values) : a.styles.push({ ...e, values: { ...e.values } })
          }
        } else this.options.debug && console.warn(`Can't find base style ${a.basedOn}`)
      }
      for (let t of e) t.cssName = this.processStyleName(t.id)
      return t
    }
    prodessNumberings(e) {
      for (let t of e.filter(e => e.pStyleName)) {
        const e = this.findStyle(t.pStyleName)
        e?.paragraphProps?.numbering && (e.paragraphProps.numbering.level = t.level)
      }
    }
    processElement(e) {
      if (e.children) for (var t of e.children) (t.parent = e), t.type == C.Table ? this.processTable(t) : this.processElement(t)
    }
    processTable(e) {
      for (var t of e.children) for (var r of t.children) (r.cssStyle = this.copyStyleProperties(e.cellStyle, r.cssStyle, ['border-left', 'border-right', 'border-top', 'border-bottom', 'padding-left', 'padding-right', 'padding-top', 'padding-bottom'])), this.processElement(r)
    }
    copyStyleProperties(e, t, r = null) {
      if (!e) return t
      for (var a of (null == t && (t = {}), null == r && (r = Object.getOwnPropertyNames(e)), r)) e.hasOwnProperty(a) && !t.hasOwnProperty(a) && (t[a] = e[a])
      return t
    }
    createPageElement(e, t) {
      var r = this.createElement('section', { className: e })
      return (
        t &&
          (t.pageMargins && ((r.style.paddingLeft = t.pageMargins.left), (r.style.paddingRight = t.pageMargins.right), (r.style.paddingTop = t.pageMargins.top), (r.style.paddingBottom = t.pageMargins.bottom)),
          t.pageSize && (this.options.ignoreWidth || (r.style.width = t.pageSize.width), this.options.ignoreHeight || (r.style.minHeight = t.pageSize.height))),
        r
      )
    }
    createSectionContent(e) {
      var t = this.createElement('article')
      return e.columns && e.columns.numberOfColumns && ((t.style.columnCount = `${e.columns.numberOfColumns}`), (t.style.columnGap = e.columns.space), e.columns.separator && (t.style.columnRule = '1px solid black')), t
    }
    renderSections(e) {
      const t = []
      this.processElement(e)
      const r = this.splitBySection(e.children, e.props),
        a = this.groupByPageBreaks(r)
      let s = null
      for (let r = 0, l = a.length; r < l; r++) {
        this.currentFootnoteIds = []
        let o = a[r][0].sectProps
        const i = this.createPageElement(this.className, o)
        this.renderStyleValues(e.cssStyle, i), this.options.renderHeaders && this.renderHeaderFooter(o.headerRefs, o, t.length, s != o, i)
        for (const e of a[r]) {
          var n = this.createSectionContent(e.sectProps)
          this.renderElements(e.elements, n), i.appendChild(n), (o = e.sectProps)
        }
        this.options.renderFootnotes && this.renderNotes(this.currentFootnoteIds, this.footnoteMap, i),
          this.options.renderEndnotes && r == l - 1 && this.renderNotes(this.currentEndnoteIds, this.endnoteMap, i),
          this.options.renderFooters && this.renderHeaderFooter(o.footerRefs, o, t.length, s != o, i),
          t.push(i),
          (s = o)
      }
      return t
    }
    renderHeaderFooter(e, t, r, a, s) {
      if (e) {
        var n = (t.titlePage && a ? e.find(e => 'first' == e.type) : null) ?? (r % 2 == 1 ? e.find(e => 'even' == e.type) : null) ?? e.find(e => 'default' == e.type),
          l = n && this.document.findPartByRelId(n.id, this.document.documentPart)
        if (l) {
          ;(this.currentPart = l), this.usedHederFooterParts.includes(l.path) || (this.processElement(l.rootElement), this.usedHederFooterParts.push(l.path))
          const [e] = this.renderElements([l.rootElement], s)
          t?.pageMargins &&
            (l.rootElement.type === C.Header
              ? ((e.style.marginTop = `calc(${t.pageMargins.header} - ${t.pageMargins.top})`), (e.style.minHeight = `calc(${t.pageMargins.top} - ${t.pageMargins.header})`))
              : l.rootElement.type === C.Footer && ((e.style.marginBottom = `calc(${t.pageMargins.footer} - ${t.pageMargins.bottom})`), (e.style.minHeight = `calc(${t.pageMargins.bottom} - ${t.pageMargins.footer})`))),
            (this.currentPart = null)
        }
      }
    }
    isPageBreakElement(e) {
      return e.type == C.Break && ('lastRenderedPageBreak' == e.break ? !this.options.ignoreLastRenderedPageBreak : 'page' == e.break)
    }
    isPageBreakSection(e, t) {
      return !!e && !!t && (e.pageSize?.orientation != t.pageSize?.orientation || e.pageSize?.width != t.pageSize?.width || e.pageSize?.height != t.pageSize?.height)
    }
    splitBySection(e, t) {
      var r = { sectProps: null, elements: [], pageBreak: !1 },
        a = [r]
      for (let t of e) {
        if (t.type == C.Paragraph) {
          const e = this.findStyle(t.styleName)
          e?.paragraphProps?.pageBreakBefore && ((r.sectProps = s), (r.pageBreak = !0), (r = { sectProps: null, elements: [], pageBreak: !1 }), a.push(r))
        }
        if ((r.elements.push(t), t.type == C.Paragraph)) {
          const e = t
          var s = e.sectionProps,
            n = -1,
            l = -1
          if (
            (this.options.breakPages && e.children && (n = e.children.findIndex(e => -1 != (l = e.children?.findIndex(this.isPageBreakElement.bind(this)) ?? -1))),
            (s || -1 != n) && ((r.sectProps = s), (r.pageBreak = -1 != n), (r = { sectProps: null, elements: [], pageBreak: !1 }), a.push(r)),
            -1 != n)
          ) {
            let a = e.children[n],
              s = l < a.children.length - 1
            if (n < e.children.length - 1 || s) {
              var o = t.children,
                i = { ...t, children: o.slice(n) }
              if (((t.children = o.slice(0, n)), r.elements.push(i), s)) {
                let e = a.children,
                  r = { ...a, children: e.slice(0, l) }
                t.children.push(r), (a.children = e.slice(l))
              }
            }
          }
        }
      }
      let c = null
      for (let e = a.length - 1; e >= 0; e--) null == a[e].sectProps ? (a[e].sectProps = c ?? t) : (c = a[e].sectProps)
      return a
    }
    groupByPageBreaks(e) {
      let t,
        r = []
      const a = [r]
      for (let s of e) r.push(s), (this.options.ignoreLastRenderedPageBreak || s.pageBreak || this.isPageBreakSection(t, s.sectProps)) && a.push((r = [])), (t = s.sectProps)
      return a.filter(e => e.length > 0)
    }
    renderWrapper(e) {
      return this.createElement('div', { className: `${this.className}-wrapper` }, e)
    }
    renderDefaultStyle() {
      var e = this.className,
        t = `\n.${e}-wrapper { background: gray; padding: 30px; padding-bottom: 0px; display: flex; flex-flow: column; align-items: center; } \n.${e}-wrapper>section.${e} { background: white; box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); margin-bottom: 30px; }\n.${e} { color: black; hyphens: auto; text-underline-position: from-font; }\nsection.${e} { box-sizing: border-box; display: flex; flex-flow: column nowrap; position: relative; overflow: hidden; }\nsection.${e}>article { margin-bottom: auto; z-index: 1; }\nsection.${e}>footer { z-index: 1; }\n.${e} table { border-collapse: collapse; }\n.${e} table td, .${e} table th { vertical-align: top; }\n.${e} p { margin: 0pt; min-height: 1em; }\n.${e} span { white-space: pre-wrap; overflow-wrap: break-word; }\n.${e} a { color: inherit; text-decoration: inherit; }\n.${e} svg { fill: transparent; }\n`
      return (
        this.options.renderComments &&
          (t += `\n.${e}-comment-ref { cursor: default; }\n.${e}-comment-popover { display: none; z-index: 1000; padding: 0.5rem; background: white; position: absolute; box-shadow: 0 0 0.25rem rgba(0, 0, 0, 0.25); width: 30ch; }\n.${e}-comment-ref:hover~.${e}-comment-popover { display: block; }\n.${e}-comment-author,.${e}-comment-date { font-size: 0.875rem; color: #888; }\n`),
        Xe(t)
      )
    }
    renderNumbering(e, t) {
      var r = '',
        a = []
      for (var s of e) {
        var n = `p.${this.numberingClass(s.id, s.level)}`,
          l = 'none'
        if (s.bullet) {
          let e = `--${this.className}-${s.bullet.src}`.toLowerCase()
          ;(r += this.styleToString(`${n}:before`, { content: "' '", display: 'inline-block', background: `var(${e})` }, s.bullet.style)),
            this.tasks.push(
              this.document.loadNumberingImage(s.bullet.src).then(r => {
                var a = `${this.rootSelector} { ${e}: url(${r}) }`
                t.appendChild(Xe(a))
              })
            )
        } else if (s.levelText) {
          let e = this.numberingCounter(s.id, s.level)
          const t = e + ' ' + (s.start - 1)
          s.level > 0 && (r += this.styleToString(`p.${this.numberingClass(s.id, s.level - 1)}`, { 'counter-reset': t })),
            a.push(t),
            (r += this.styleToString(`${n}:before`, { content: this.levelTextToContent(s.levelText, s.suff, s.id, this.numFormatToCssValue(s.format)), 'counter-increment': e, ...s.rStyle }))
        } else l = this.numFormatToCssValue(s.format)
        r += this.styleToString(n, { display: 'list-item', 'list-style-position': 'inside', 'list-style-type': l, ...s.pStyle })
      }
      return a.length > 0 && (r += this.styleToString(this.rootSelector, { 'counter-reset': a.join(' ') })), Xe(r)
    }
    renderStyles(e) {
      var t = ''
      const r = this.styleMap,
        a = g(
          e.filter(e => e.isDefault),
          e => e.target
        )
      for (const o of e) {
        var s = o.styles
        if (o.linked) {
          var n = o.linked && r[o.linked]
          n ? (s = s.concat(n.styles)) : this.options.debug && console.warn(`Can't find linked style ${o.linked}`)
        }
        for (const e of s) {
          var l = `${o.target ?? ''}.${o.cssName}`
          o.target != e.target && (l += ` ${e.target}`), a[o.target] == o && (l = `.${this.className} ${o.target}, ` + l), (t += this.styleToString(l, e.values))
        }
      }
      return Xe(t)
    }
    renderNotes(e, t, r) {
      var a = e.map(e => t[e]).filter(e => e)
      if (a.length > 0) {
        var s = this.createElement('ol', null, this.renderElements(a))
        r.appendChild(s)
      }
    }
    renderElement(e) {
      switch (e.type) {
        case C.Paragraph:
          return this.renderParagraph(e)
        case C.BookmarkStart:
          return this.renderBookmarkStart(e)
        case C.BookmarkEnd:
          return null
        case C.Run:
          return this.renderRun(e)
        case C.Table:
          return this.renderTable(e)
        case C.Row:
          return this.renderTableRow(e)
        case C.Cell:
          return this.renderTableCell(e)
        case C.Hyperlink:
          return this.renderHyperlink(e)
        case C.SmartTag:
          return this.renderSmartTag(e)
        case C.Drawing:
          return this.renderDrawing(e)
        case C.Image:
          return this.renderImage(e)
        case C.Text:
        case C.Text:
          return this.renderText(e)
        case C.DeletedText:
          return this.renderDeletedText(e)
        case C.Tab:
          return this.renderTab(e)
        case C.Symbol:
          return this.renderSymbol(e)
        case C.Break:
          return this.renderBreak(e)
        case C.Footer:
          return this.renderContainer(e, 'footer')
        case C.Header:
          return this.renderContainer(e, 'header')
        case C.Footnote:
        case C.Endnote:
          return this.renderContainer(e, 'li')
        case C.FootnoteReference:
          return this.renderFootnoteReference(e)
        case C.EndnoteReference:
          return this.renderEndnoteReference(e)
        case C.NoBreakHyphen:
          return this.createElement('wbr')
        case C.VmlPicture:
          return this.renderVmlPicture(e)
        case C.VmlElement:
          return this.renderVmlElement(e)
        case C.MmlMath:
          return this.renderContainerNS(e, Oe, 'math', { xmlns: Oe })
        case C.MmlMathParagraph:
          return this.renderContainer(e, 'span')
        case C.MmlFraction:
          return this.renderContainerNS(e, Oe, 'mfrac')
        case C.MmlBase:
          return this.renderContainerNS(e, Oe, e.parent.type == C.MmlMatrixRow ? 'mtd' : 'mrow')
        case C.MmlNumerator:
        case C.MmlDenominator:
        case C.MmlFunction:
        case C.MmlLimit:
        case C.MmlBox:
          return this.renderContainerNS(e, Oe, 'mrow')
        case C.MmlGroupChar:
          return this.renderMmlGroupChar(e)
        case C.MmlLimitLower:
          return this.renderContainerNS(e, Oe, 'munder')
        case C.MmlMatrix:
          return this.renderContainerNS(e, Oe, 'mtable')
        case C.MmlMatrixRow:
          return this.renderContainerNS(e, Oe, 'mtr')
        case C.MmlRadical:
          return this.renderMmlRadical(e)
        case C.MmlSuperscript:
          return this.renderContainerNS(e, Oe, 'msup')
        case C.MmlSubscript:
          return this.renderContainerNS(e, Oe, 'msub')
        case C.MmlDegree:
        case C.MmlSuperArgument:
        case C.MmlSubArgument:
          return this.renderContainerNS(e, Oe, 'mn')
        case C.MmlFunctionName:
          return this.renderContainerNS(e, Oe, 'ms')
        case C.MmlDelimiter:
          return this.renderMmlDelimiter(e)
        case C.MmlRun:
          return this.renderMmlRun(e)
        case C.MmlNary:
          return this.renderMmlNary(e)
        case C.MmlPreSubSuper:
          return this.renderMmlPreSubSuper(e)
        case C.MmlBar:
          return this.renderMmlBar(e)
        case C.MmlEquationArray:
          return this.renderMllList(e)
        case C.Inserted:
          return this.renderInserted(e)
        case C.Deleted:
          return this.renderDeleted(e)
        case C.CommentRangeStart:
          return this.renderCommentRangeStart(e)
        case C.CommentRangeEnd:
          return this.renderCommentRangeEnd(e)
        case C.CommentReference:
          return this.renderCommentReference(e)
      }
      return null
    }
    renderChildren(e, t) {
      return this.renderElements(e.children, t)
    }
    renderElements(e, t) {
      if (null == e) return null
      var r = e.flatMap(e => this.renderElement(e)).filter(e => null != e)
      return t && We(t, r), r
    }
    renderContainer(e, t, r) {
      return this.createElement(t, r, this.renderChildren(e))
    }
    renderContainerNS(e, t, r, a) {
      return Ve(t, r, a, this.renderChildren(e))
    }
    renderParagraph(e) {
      var t = this.createElement('p')
      const r = this.findStyle(e.styleName)
      e.tabs ?? (e.tabs = r?.paragraphProps?.tabs), this.renderClass(e, t), this.renderChildren(e, t), this.renderStyleValues(e.cssStyle, t), this.renderCommonProperties(t.style, e)
      const a = e.numbering ?? r?.paragraphProps?.numbering
      return a && t.classList.add(this.numberingClass(a.id, a.level)), t
    }
    renderRunProperties(e, t) {
      this.renderCommonProperties(e, t)
    }
    renderCommonProperties(e, t) {
      null != t && (t.color && (e.color = t.color), t.fontSize && (e['font-size'] = t.fontSize))
    }
    renderHyperlink(e) {
      var t = this.createElement('a')
      if ((this.renderChildren(e, t), this.renderStyleValues(e.cssStyle, t), e.href)) t.href = e.href
      else if (e.id) {
        const r = this.document.documentPart.rels.find(t => t.id == e.id && 'External' === t.targetMode)
        t.href = r?.target
      }
      return t
    }
    renderSmartTag(e) {
      var t = this.createElement('span')
      return this.renderChildren(e, t), t
    }
    renderCommentRangeStart(e) {
      if (!this.options.renderComments) return null
      const t = new Range()
      this.commentHighlight?.add(t)
      const r = this.htmlDocument.createComment(`start of comment #${e.id}`)
      return this.later(() => t.setStart(r, 0)), (this.commentMap[e.id] = t), r
    }
    renderCommentRangeEnd(e) {
      if (!this.options.renderComments) return null
      const t = this.commentMap[e.id],
        r = this.htmlDocument.createComment(`end of comment #${e.id}`)
      return this.later(() => t?.setEnd(r, 0)), r
    }
    renderCommentReference(e) {
      if (!this.options.renderComments) return null
      var t = this.document.commentsPart?.commentMap[e.id]
      if (!t) return null
      const r = new DocumentFragment(),
        a = _e('span', { className: `${this.className}-comment-ref` }, ['💬']),
        s = _e('div', { className: `${this.className}-comment-popover` })
      return this.renderCommentContent(t, s), r.appendChild(this.htmlDocument.createComment(`comment #${t.id} by ${t.author} on ${t.date}`)), r.appendChild(a), r.appendChild(s), r
    }
    renderCommentContent(e, t) {
      t.appendChild(_e('div', { className: `${this.className}-comment-author` }, [e.author])), t.appendChild(_e('div', { className: `${this.className}-comment-date` }, [new Date(e.date).toLocaleString()])), this.renderChildren(e, t)
    }
    renderDrawing(e) {
      var t = this.createElement('div')
      return (t.style.display = 'inline-block'), (t.style.position = 'relative'), (t.style.textIndent = '0px'), this.renderChildren(e, t), this.renderStyleValues(e.cssStyle, t), t
    }
    renderImage(e) {
      let t = this.createElement('img')
      return (
        this.renderStyleValues(e.cssStyle, t),
        this.document &&
          this.tasks.push(
            this.document.loadDocumentImage(e.src, this.currentPart).then(e => {
              t.src = e
            })
          ),
        t
      )
    }
    renderText(e) {
      return this.htmlDocument.createTextNode(e.text)
    }
    renderDeletedText(e) {
      return this.options.renderEndnotes ? this.htmlDocument.createTextNode(e.text) : null
    }
    renderBreak(e) {
      return 'textWrapping' == e.break ? this.createElement('br') : null
    }
    renderInserted(e) {
      return this.options.renderChanges ? this.renderContainer(e, 'ins') : this.renderChildren(e)
    }
    renderDeleted(e) {
      return this.options.renderChanges ? this.renderContainer(e, 'del') : null
    }
    renderSymbol(e) {
      var t = this.createElement('span')
      return (t.style.fontFamily = e.font), (t.innerHTML = `&#x${e.char};`), t
    }
    renderFootnoteReference(e) {
      var t = this.createElement('sup')
      return this.currentFootnoteIds.push(e.id), (t.textContent = `${this.currentFootnoteIds.length}`), t
    }
    renderEndnoteReference(e) {
      var t = this.createElement('sup')
      return this.currentEndnoteIds.push(e.id), (t.textContent = `${this.currentEndnoteIds.length}`), t
    }
    renderTab(e) {
      var t = this.createElement('span')
      if (((t.innerHTML = '&emsp;'), this.options.experimental)) {
        t.className = this.tabStopClass()
        var r = (function (e, t) {
          var r = e.parent
          for (; null != r && r.type != t; ) r = r.parent
          return r
        })(e, C.Paragraph)?.tabs
        this.currentTabs.push({ stops: r, span: t })
      }
      return t
    }
    renderBookmarkStart(e) {
      var t = this.createElement('span')
      return (t.id = e.name), t
    }
    renderRun(e) {
      if (e.fieldRun) return null
      const t = this.createElement('span')
      if ((e.id && (t.id = e.id), this.renderClass(e, t), this.renderStyleValues(e.cssStyle, t), e.verticalAlign)) {
        const r = this.createElement(e.verticalAlign)
        this.renderChildren(e, r), t.appendChild(r)
      } else this.renderChildren(e, t)
      return t
    }
    renderTable(e) {
      let t = this.createElement('table')
      return (
        this.tableCellPositions.push(this.currentCellPosition),
        this.tableVerticalMerges.push(this.currentVerticalMerge),
        (this.currentVerticalMerge = {}),
        (this.currentCellPosition = { col: 0, row: 0 }),
        e.columns && t.appendChild(this.renderTableColumns(e.columns)),
        this.renderClass(e, t),
        this.renderChildren(e, t),
        this.renderStyleValues(e.cssStyle, t),
        (this.currentVerticalMerge = this.tableVerticalMerges.pop()),
        (this.currentCellPosition = this.tableCellPositions.pop()),
        t
      )
    }
    renderTableColumns(e) {
      let t = this.createElement('colgroup')
      for (let r of e) {
        let e = this.createElement('col')
        r.width && (e.style.width = r.width), t.appendChild(e)
      }
      return t
    }
    renderTableRow(e) {
      let t = this.createElement('tr')
      return (this.currentCellPosition.col = 0), this.renderClass(e, t), this.renderChildren(e, t), this.renderStyleValues(e.cssStyle, t), this.currentCellPosition.row++, t
    }
    renderTableCell(e) {
      let t = this.createElement('td')
      const r = this.currentCellPosition.col
      return (
        e.verticalMerge ? ('restart' == e.verticalMerge ? ((this.currentVerticalMerge[r] = t), (t.rowSpan = 1)) : this.currentVerticalMerge[r] && ((this.currentVerticalMerge[r].rowSpan += 1), (t.style.display = 'none'))) : (this.currentVerticalMerge[r] = null),
        this.renderClass(e, t),
        this.renderChildren(e, t),
        this.renderStyleValues(e.cssStyle, t),
        e.span && (t.colSpan = e.span),
        (this.currentCellPosition.col += t.colSpan),
        t
      )
    }
    renderVmlPicture(e) {
      var t = _e('div')
      return this.renderChildren(e, t), t
    }
    renderVmlElement(e) {
      var t = ze('svg')
      t.setAttribute('style', e.cssStyleText)
      const r = this.renderVmlChildElement(e)
      return (
        e.imageHref?.id && this.tasks.push(this.document?.loadDocumentImage(e.imageHref.id, this.currentPart).then(e => r.setAttribute('href', e))),
        t.appendChild(r),
        requestAnimationFrame(() => {
          const e = t.firstElementChild.getBBox()
          t.setAttribute('width', `${Math.ceil(e.x + e.width)}`), t.setAttribute('height', `${Math.ceil(e.y + e.height)}`)
        }),
        t
      )
    }
    renderVmlChildElement(e) {
      const t = ze(e.tagName)
      Object.entries(e.attrs).forEach(([e, r]) => t.setAttribute(e, r))
      for (let r of e.children) r.type == C.VmlElement ? t.appendChild(this.renderVmlChildElement(r)) : t.appendChild(...k(this.renderElement(r)))
      return t
    }
    renderMmlRadical(e) {
      const t = e.children.find(e => e.type == C.MmlBase)
      if (e.props?.hideDegree) return Ve(Oe, 'msqrt', null, this.renderElements([t]))
      const r = e.children.find(e => e.type == C.MmlDegree)
      return Ve(Oe, 'mroot', null, this.renderElements([t, r]))
    }
    renderMmlDelimiter(e) {
      const t = []
      return t.push(Ve(Oe, 'mo', null, [e.props.beginChar ?? '('])), t.push(...this.renderElements(e.children)), t.push(Ve(Oe, 'mo', null, [e.props.endChar ?? ')'])), Ve(Oe, 'mrow', null, t)
    }
    renderMmlNary(e) {
      const t = [],
        r = g(e.children, e => e.type),
        a = r[C.MmlSuperArgument],
        s = r[C.MmlSubArgument],
        n = a ? Ve(Oe, 'mo', null, k(this.renderElement(a))) : null,
        l = s ? Ve(Oe, 'mo', null, k(this.renderElement(s))) : null,
        o = Ve(Oe, 'mo', null, [e.props?.char ?? '∫'])
      return n || l ? t.push(Ve(Oe, 'munderover', null, [o, l, n])) : n ? t.push(Ve(Oe, 'mover', null, [o, n])) : l ? t.push(Ve(Oe, 'munder', null, [o, l])) : t.push(o), t.push(...this.renderElements(r[C.MmlBase].children)), Ve(Oe, 'mrow', null, t)
    }
    renderMmlPreSubSuper(e) {
      const t = [],
        r = g(e.children, e => e.type),
        a = r[C.MmlSuperArgument],
        s = r[C.MmlSubArgument],
        n = a ? Ve(Oe, 'mo', null, k(this.renderElement(a))) : null,
        l = s ? Ve(Oe, 'mo', null, k(this.renderElement(s))) : null,
        o = Ve(Oe, 'mo', null)
      return t.push(Ve(Oe, 'msubsup', null, [o, l, n])), t.push(...this.renderElements(r[C.MmlBase].children)), Ve(Oe, 'mrow', null, t)
    }
    renderMmlGroupChar(e) {
      const t = 'bot' === e.props.verticalJustification ? 'mover' : 'munder',
        r = this.renderContainerNS(e, Oe, t)
      return e.props.char && r.appendChild(Ve(Oe, 'mo', null, [e.props.char])), r
    }
    renderMmlBar(e) {
      const t = this.renderContainerNS(e, Oe, 'mrow')
      switch (e.props.position) {
        case 'top':
          t.style.textDecoration = 'overline'
          break
        case 'bottom':
          t.style.textDecoration = 'underline'
      }
      return t
    }
    renderMmlRun(e) {
      const t = Ve(Oe, 'ms')
      return this.renderClass(e, t), this.renderStyleValues(e.cssStyle, t), this.renderChildren(e, t), t
    }
    renderMllList(e) {
      const t = Ve(Oe, 'mtable')
      this.renderClass(e, t), this.renderStyleValues(e.cssStyle, t), this.renderChildren(e)
      for (let r of this.renderChildren(e)) t.appendChild(Ve(Oe, 'mtr', null, [Ve(Oe, 'mtd', null, [r])]))
      return t
    }
    renderStyleValues(e, t) {
      for (let r in e) r.startsWith('$') ? t.setAttribute(r.slice(1), e[r]) : (t.style[r] = e[r])
    }
    renderClass(e, t) {
      e.className && (t.className = e.className), e.styleName && t.classList.add(this.processStyleName(e.styleName))
    }
    findStyle(e) {
      return e && this.styleMap?.[e]
    }
    numberingClass(e, t) {
      return `${this.className}-num-${e}-${t}`
    }
    tabStopClass() {
      return `${this.className}-tab-stop`
    }
    styleToString(e, t, r = null) {
      let a = `${e} {\r\n`
      for (const e in t) e.startsWith('$') || (a += `  ${e}: ${t[e]};\r\n`)
      return r && (a += r), a + '}\r\n'
    }
    numberingCounter(e, t) {
      return `${this.className}-num-${e}-${t}`
    }
    levelTextToContent(e, t, r, a) {
      return `"${e.replace(/%\d*/g, e => {
        let t = parseInt(e.substring(1), 10) - 1
        return `"counter(${this.numberingCounter(r, t)}, ${a})"`
      })}${{ tab: '\\9', space: '\\a0' }[t] ?? ''}"`
    }
    numFormatToCssValue(e) {
      return (
        {
          none: 'none',
          bullet: 'disc',
          decimal: 'decimal',
          lowerLetter: 'lower-alpha',
          upperLetter: 'upper-alpha',
          lowerRoman: 'lower-roman',
          upperRoman: 'upper-roman',
          decimalZero: 'decimal-leading-zero',
          aiueo: 'katakana',
          aiueoFullWidth: 'katakana',
          chineseCounting: 'simp-chinese-informal',
          chineseCountingThousand: 'simp-chinese-informal',
          chineseLegalSimplified: 'simp-chinese-formal',
          chosung: 'hangul-consonant',
          ideographDigital: 'cjk-ideographic',
          ideographTraditional: 'cjk-heavenly-stem',
          ideographLegalTraditional: 'trad-chinese-formal',
          ideographZodiac: 'cjk-earthly-branch',
          iroha: 'katakana-iroha',
          irohaFullWidth: 'katakana-iroha',
          japaneseCounting: 'japanese-informal',
          japaneseDigitalTenThousand: 'cjk-decimal',
          japaneseLegal: 'japanese-formal',
          thaiNumbers: 'thai',
          koreanCounting: 'korean-hangul-formal',
          koreanDigital: 'korean-hangul-formal',
          koreanDigital2: 'korean-hanja-informal',
          hebrew1: 'hebrew',
          hebrew2: 'hebrew',
          hindiNumbers: 'devanagari',
          ganada: 'hangul',
          taiwaneseCounting: 'cjk-ideographic',
          taiwaneseCountingThousand: 'cjk-ideographic',
          taiwaneseDigital: 'cjk-decimal'
        }[e] ?? e
      )
    }
    refreshTabStops() {
      this.options.experimental &&
        (clearTimeout(this.tabsTimeout),
        (this.tabsTimeout = setTimeout(() => {
          const e = (function (e = document.body) {
            const t = document.createElement('div')
            ;(t.style.width = '100pt'), e.appendChild(t)
            const r = 100 / t.offsetWidth
            return e.removeChild(t), r
          })()
          for (let t of this.currentTabs) $e(t.span, t.stops, this.defaultTabSize, e)
        }, 500)))
    }
    later(e) {
      this.postRenderTasks.push(e)
    }
  }
  function _e(e, t, r) {
    return Ve(void 0, e, t, r)
  }
  function ze(e, t, r) {
    return Ve(Le, e, t, r)
  }
  function Ve(e, t, r, a) {
    var s = e ? document.createElementNS(e, t) : document.createElement(t)
    return Object.assign(s, r), a && We(s, a), s
  }
  function je(e) {
    e.innerHTML = ''
  }
  function We(e, t) {
    t.forEach(t => {
      return e.appendChild('string' == typeof (r = t) || r instanceof String ? document.createTextNode(t) : t)
      var r
    })
  }
  function Xe(e) {
    return _e('style', { innerHTML: e })
  }
  function Ue(e, t) {
    e.appendChild(document.createComment(t))
  }
  const qe = {
    ignoreHeight: !1,
    ignoreWidth: !1,
    ignoreFonts: !1,
    breakPages: !0,
    debug: !1,
    experimental: !1,
    className: 'docx',
    inWrapper: !0,
    trimXmlDeclaration: !0,
    ignoreLastRenderedPageBreak: !0,
    renderHeaders: !0,
    renderFooters: !0,
    renderFootnotes: !0,
    renderEndnotes: !0,
    useBase64URL: !1,
    renderChanges: !1,
    renderComments: !1
  }
  function Ge(e, t) {
    const r = { ...qe, ...t }
    return pe.load(e, new Ee(r), r)
  }
  async function Je(e, t, r, a) {
    const s = { ...qe, ...a },
      n = new He(window.document)
    return n.render(e, t, r, s), Promise.allSettled(n.tasks)
  }
  ;(e.defaultOptions = qe),
    (e.parseAsync = Ge),
    (e.renderAsync = async function (e, t, r, a) {
      const s = await Ge(e, a)
      return await Je(s, t, r, a), s
    }),
    (e.renderDocument = Je)
})
//# sourceMappingURL=docx-preview.min.js.map
