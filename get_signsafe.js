function A(p){
    var CryptoJS = require("crypto-js");
    var md5 = require("md5")
    var ERROR = "input is invalid type", WINDOW = "object" == typeof window
    , root = WINDOW ? window : {};
    ARRAY_BUFFER = !root.JS_MD5_NO_ARRAY_BUFFER
    var COMMON_JS = !root.JS_MD5_NO_COMMON_JS && "object" == typeof module && module.exports, ARRAY_BUFFER = !root.JS_MD5_NO_ARRAY_BUFFER && "undefined" != typeof ArrayBuffer, HEX_CHARS = "0123456789abcdef".split(""), EXTRA = [128, 32768, 8388608, -2147483648], SHIFT = [0, 8, 16, 24], OUTPUT_TYPES = ["hex", "array", "digest", "buffer", "arrayBuffer", "base64"], BASE64_ENCODE_CHAR = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(""), blocks = [], buffer8;
    if(ArrayBuffer) {
        var buffer = new ArrayBuffer(68);
        buffer8 = new Uint8Array(buffer),
        blocks = new Uint32Array(buffer)
    }
    var createOutputMethod = function(e) {
                        return function(t) {
                            return new Md5(!0).update(t)[e]()
                        }
                    }
                      , createMethod = function() {
                        var e = createOutputMethod("hex");
                        NODE_JS && (e = nodeWrap(e)),
                        e.create = function() {
                            return new Md5
                        }
                        ,
                        e.update = function(t) {
                            return e.create().update(t)
                        }
                        ;
                        for (var t = 0; t < OUTPUT_TYPES.length; ++t) {
                            var n = OUTPUT_TYPES[t];
                            e[n] = createOutputMethod(n)
                        }
                        return e
                    }
                      , nodeWrap = function(method) {
                        var crypto = eval("require('crypto')")
                          , Buffer = eval("require('buffer').Buffer")
                          , nodeMethod = function(e) {
                            if ("string" == typeof e)
                                return crypto.createHash("md5").update(e, "utf8").digest("hex");
                            if (null == e)
                                throw ERROR;
                            return e.constructor === ArrayBuffer && (e = new Uint8Array(e)),
                            Array.isArray(e) || ArrayBuffer.isView(e) || e.constructor === Buffer ? crypto.createHash("md5").update(new Buffer(e)).digest("hex") : method(e)
                        };
                        return nodeMethod
                    };
                    function Md5(e) {
                        if (e)
                            blocks[0] = blocks[16] = blocks[1] = blocks[2] = blocks[3] = blocks[4] = blocks[5] = blocks[6] = blocks[7] = blocks[8] = blocks[9] = blocks[10] = blocks[11] = blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0,
                            this.blocks = blocks,
                            this.buffer8 = buffer8;
                        else if (ARRAY_BUFFER) {
                            var t = new ArrayBuffer(68);
                            this.buffer8 = new Uint8Array(t),
                            this.blocks = new Uint32Array(t)
                        } else
                            this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                        this.h0 = this.h1 = this.h2 = this.h3 = this.start = this.bytes = this.hBytes = 0,
                        this.finalized = this.hashed = !1,
                        this.first = !0
                    }
                    Md5.prototype.update = function(e) {
                        if (!this.finalized) {
                            var t, n = typeof e;
                            if ("string" !== n) {
                                if ("object" !== n)
                                    throw ERROR;
                                if (null === e)
                                    throw ERROR;
                                if (ARRAY_BUFFER && e.constructor === ArrayBuffer)
                                    e = new Uint8Array(e);
                                else if (!(Array.isArray(e) || ARRAY_BUFFER && ArrayBuffer.isView(e)))
                                    throw ERROR;
                                t = !0
                            }
                            for (var o, r, s = 0, i = e.length, c = this.blocks, a = this.buffer8; s < i; ) {
                                if (this.hashed && (this.hashed = !1,
                                c[0] = c[16],
                                c[16] = c[1] = c[2] = c[3] = c[4] = c[5] = c[6] = c[7] = c[8] = c[9] = c[10] = c[11] = c[12] = c[13] = c[14] = c[15] = 0),
                                t)
                                    if (ARRAY_BUFFER)
                                        for (r = this.start; s < i && r < 64; ++s)
                                            a[r++] = e[s];
                                    else
                                        for (r = this.start; s < i && r < 64; ++s)
                                            c[r >> 2] |= e[s] << SHIFT[3 & r++];
                                else if (ARRAY_BUFFER)
                                    for (r = this.start; s < i && r < 64; ++s)
                                        (o = e.charCodeAt(s)) < 128 ? a[r++] = o : o < 2048 ? (a[r++] = 192 | o >> 6,
                                        a[r++] = 128 | 63 & o) : o < 55296 || o >= 57344 ? (a[r++] = 224 | o >> 12,
                                        a[r++] = 128 | o >> 6 & 63,
                                        a[r++] = 128 | 63 & o) : (o = 65536 + ((1023 & o) << 10 | 1023 & e.charCodeAt(++s)),
                                        a[r++] = 240 | o >> 18,
                                        a[r++] = 128 | o >> 12 & 63,
                                        a[r++] = 128 | o >> 6 & 63,
                                        a[r++] = 128 | 63 & o);
                                else
                                    for (r = this.start; s < i && r < 64; ++s)
                                        (o = e.charCodeAt(s)) < 128 ? c[r >> 2] |= o << SHIFT[3 & r++] : o < 2048 ? (c[r >> 2] |= (192 | o >> 6) << SHIFT[3 & r++],
                                        c[r >> 2] |= (128 | 63 & o) << SHIFT[3 & r++]) : o < 55296 || o >= 57344 ? (c[r >> 2] |= (224 | o >> 12) << SHIFT[3 & r++],
                                        c[r >> 2] |= (128 | o >> 6 & 63) << SHIFT[3 & r++],
                                        c[r >> 2] |= (128 | 63 & o) << SHIFT[3 & r++]) : (o = 65536 + ((1023 & o) << 10 | 1023 & e.charCodeAt(++s)),
                                        c[r >> 2] |= (240 | o >> 18) << SHIFT[3 & r++],
                                        c[r >> 2] |= (128 | o >> 12 & 63) << SHIFT[3 & r++],
                                        c[r >> 2] |= (128 | o >> 6 & 63) << SHIFT[3 & r++],
                                        c[r >> 2] |= (128 | 63 & o) << SHIFT[3 & r++]);
                                this.lastByteIndex = r,
                                this.bytes += r - this.start,
                                r >= 64 ? (this.start = r - 64,
                                this.hash(),
                                this.hashed = !0) : this.start = r
                            }
                            return this.bytes > 4294967295 && (this.hBytes += this.bytes / 4294967296 << 0,
                            this.bytes = this.bytes % 4294967296),
                            this
                        }
                    }
                    ,
                    Md5.prototype.finalize = function() {
                        if (!this.finalized) {
                            this.finalized = !0;
                            var e = this.blocks
                              , t = this.lastByteIndex;
                            e[t >> 2] |= EXTRA[3 & t],
                            t >= 56 && (this.hashed || this.hash(),
                            e[0] = e[16],
                            e[16] = e[1] = e[2] = e[3] = e[4] = e[5] = e[6] = e[7] = e[8] = e[9] = e[10] = e[11] = e[12] = e[13] = e[14] = e[15] = 0),
                            e[14] = this.bytes << 3,
                            e[15] = this.hBytes << 3 | this.bytes >>> 29,
                            this.hash()
                        }
                    }
                    ,
                    Md5.prototype.hash = function() {
                        var e, t, n, o, r, s, i = this.blocks;
                        this.first ? t = ((t = ((e = ((e = i[0] - 680876937) << 7 | e >>> 25) - 271733879 << 0) ^ (n = ((n = (-271733879 ^ (o = ((o = (-1732584194 ^ 2004318071 & e) + i[1] - 117830708) << 12 | o >>> 20) + e << 0) & (-271733879 ^ e)) + i[2] - 1126478375) << 17 | n >>> 15) + o << 0) & (o ^ e)) + i[3] - 1316259209) << 22 | t >>> 10) + n << 0 : (e = this.h0,
                        t = this.h1,
                        n = this.h2,
                        t = ((t += ((e = ((e += ((o = this.h3) ^ t & (n ^ o)) + i[0] - 680876936) << 7 | e >>> 25) + t << 0) ^ (n = ((n += (t ^ (o = ((o += (n ^ e & (t ^ n)) + i[1] - 389564586) << 12 | o >>> 20) + e << 0) & (e ^ t)) + i[2] + 606105819) << 17 | n >>> 15) + o << 0) & (o ^ e)) + i[3] - 1044525330) << 22 | t >>> 10) + n << 0),
                        t = ((t += ((e = ((e += (o ^ t & (n ^ o)) + i[4] - 176418897) << 7 | e >>> 25) + t << 0) ^ (n = ((n += (t ^ (o = ((o += (n ^ e & (t ^ n)) + i[5] + 1200080426) << 12 | o >>> 20) + e << 0) & (e ^ t)) + i[6] - 1473231341) << 17 | n >>> 15) + o << 0) & (o ^ e)) + i[7] - 45705983) << 22 | t >>> 10) + n << 0,
                        t = ((t += ((e = ((e += (o ^ t & (n ^ o)) + i[8] + 1770035416) << 7 | e >>> 25) + t << 0) ^ (n = ((n += (t ^ (o = ((o += (n ^ e & (t ^ n)) + i[9] - 1958414417) << 12 | o >>> 20) + e << 0) & (e ^ t)) + i[10] - 42063) << 17 | n >>> 15) + o << 0) & (o ^ e)) + i[11] - 1990404162) << 22 | t >>> 10) + n << 0,
                        t = ((t += ((e = ((e += (o ^ t & (n ^ o)) + i[12] + 1804603682) << 7 | e >>> 25) + t << 0) ^ (n = ((n += (t ^ (o = ((o += (n ^ e & (t ^ n)) + i[13] - 40341101) << 12 | o >>> 20) + e << 0) & (e ^ t)) + i[14] - 1502002290) << 17 | n >>> 15) + o << 0) & (o ^ e)) + i[15] + 1236535329) << 22 | t >>> 10) + n << 0,
                        t = ((t += ((o = ((o += (t ^ n & ((e = ((e += (n ^ o & (t ^ n)) + i[1] - 165796510) << 5 | e >>> 27) + t << 0) ^ t)) + i[6] - 1069501632) << 9 | o >>> 23) + e << 0) ^ e & ((n = ((n += (e ^ t & (o ^ e)) + i[11] + 643717713) << 14 | n >>> 18) + o << 0) ^ o)) + i[0] - 373897302) << 20 | t >>> 12) + n << 0,
                        t = ((t += ((o = ((o += (t ^ n & ((e = ((e += (n ^ o & (t ^ n)) + i[5] - 701558691) << 5 | e >>> 27) + t << 0) ^ t)) + i[10] + 38016083) << 9 | o >>> 23) + e << 0) ^ e & ((n = ((n += (e ^ t & (o ^ e)) + i[15] - 660478335) << 14 | n >>> 18) + o << 0) ^ o)) + i[4] - 405537848) << 20 | t >>> 12) + n << 0,
                        t = ((t += ((o = ((o += (t ^ n & ((e = ((e += (n ^ o & (t ^ n)) + i[9] + 568446438) << 5 | e >>> 27) + t << 0) ^ t)) + i[14] - 1019803690) << 9 | o >>> 23) + e << 0) ^ e & ((n = ((n += (e ^ t & (o ^ e)) + i[3] - 187363961) << 14 | n >>> 18) + o << 0) ^ o)) + i[8] + 1163531501) << 20 | t >>> 12) + n << 0,
                        t = ((t += ((o = ((o += (t ^ n & ((e = ((e += (n ^ o & (t ^ n)) + i[13] - 1444681467) << 5 | e >>> 27) + t << 0) ^ t)) + i[2] - 51403784) << 9 | o >>> 23) + e << 0) ^ e & ((n = ((n += (e ^ t & (o ^ e)) + i[7] + 1735328473) << 14 | n >>> 18) + o << 0) ^ o)) + i[12] - 1926607734) << 20 | t >>> 12) + n << 0,
                        t = ((t += ((s = (o = ((o += ((r = t ^ n) ^ (e = ((e += (r ^ o) + i[5] - 378558) << 4 | e >>> 28) + t << 0)) + i[8] - 2022574463) << 11 | o >>> 21) + e << 0) ^ e) ^ (n = ((n += (s ^ t) + i[11] + 1839030562) << 16 | n >>> 16) + o << 0)) + i[14] - 35309556) << 23 | t >>> 9) + n << 0,
                        t = ((t += ((s = (o = ((o += ((r = t ^ n) ^ (e = ((e += (r ^ o) + i[1] - 1530992060) << 4 | e >>> 28) + t << 0)) + i[4] + 1272893353) << 11 | o >>> 21) + e << 0) ^ e) ^ (n = ((n += (s ^ t) + i[7] - 155497632) << 16 | n >>> 16) + o << 0)) + i[10] - 1094730640) << 23 | t >>> 9) + n << 0,
                        t = ((t += ((s = (o = ((o += ((r = t ^ n) ^ (e = ((e += (r ^ o) + i[13] + 681279174) << 4 | e >>> 28) + t << 0)) + i[0] - 358537222) << 11 | o >>> 21) + e << 0) ^ e) ^ (n = ((n += (s ^ t) + i[3] - 722521979) << 16 | n >>> 16) + o << 0)) + i[6] + 76029189) << 23 | t >>> 9) + n << 0,
                        t = ((t += ((s = (o = ((o += ((r = t ^ n) ^ (e = ((e += (r ^ o) + i[9] - 640364487) << 4 | e >>> 28) + t << 0)) + i[12] - 421815835) << 11 | o >>> 21) + e << 0) ^ e) ^ (n = ((n += (s ^ t) + i[15] + 530742520) << 16 | n >>> 16) + o << 0)) + i[2] - 995338651) << 23 | t >>> 9) + n << 0,
                        t = ((t += ((o = ((o += (t ^ ((e = ((e += (n ^ (t | ~o)) + i[0] - 198630844) << 6 | e >>> 26) + t << 0) | ~n)) + i[7] + 1126891415) << 10 | o >>> 22) + e << 0) ^ ((n = ((n += (e ^ (o | ~t)) + i[14] - 1416354905) << 15 | n >>> 17) + o << 0) | ~e)) + i[5] - 57434055) << 21 | t >>> 11) + n << 0,
                        t = ((t += ((o = ((o += (t ^ ((e = ((e += (n ^ (t | ~o)) + i[12] + 1700485571) << 6 | e >>> 26) + t << 0) | ~n)) + i[3] - 1894986606) << 10 | o >>> 22) + e << 0) ^ ((n = ((n += (e ^ (o | ~t)) + i[10] - 1051523) << 15 | n >>> 17) + o << 0) | ~e)) + i[1] - 2054922799) << 21 | t >>> 11) + n << 0,
                        t = ((t += ((o = ((o += (t ^ ((e = ((e += (n ^ (t | ~o)) + i[8] + 1873313359) << 6 | e >>> 26) + t << 0) | ~n)) + i[15] - 30611744) << 10 | o >>> 22) + e << 0) ^ ((n = ((n += (e ^ (o | ~t)) + i[6] - 1560198380) << 15 | n >>> 17) + o << 0) | ~e)) + i[13] + 1309151649) << 21 | t >>> 11) + n << 0,
                        t = ((t += ((o = ((o += (t ^ ((e = ((e += (n ^ (t | ~o)) + i[4] - 145523070) << 6 | e >>> 26) + t << 0) | ~n)) + i[11] - 1120210379) << 10 | o >>> 22) + e << 0) ^ ((n = ((n += (e ^ (o | ~t)) + i[2] + 718787259) << 15 | n >>> 17) + o << 0) | ~e)) + i[9] - 343485551) << 21 | t >>> 11) + n << 0,
                        this.first ? (this.h0 = e + 1732584193 << 0,
                        this.h1 = t - 271733879 << 0,
                        this.h2 = n - 1732584194 << 0,
                        this.h3 = o + 271733878 << 0,
                        this.first = !1) : (this.h0 = this.h0 + e << 0,
                        this.h1 = this.h1 + t << 0,
                        this.h2 = this.h2 + n << 0,
                        this.h3 = this.h3 + o << 0)
                    }
                    ,
                    Md5.prototype.hex = function() {
                        this.finalize();
                        var e = this.h0
                          , t = this.h1
                          , n = this.h2
                          , o = this.h3;
                        return HEX_CHARS[e >> 4 & 15] + HEX_CHARS[15 & e] + HEX_CHARS[e >> 12 & 15] + HEX_CHARS[e >> 8 & 15] + HEX_CHARS[e >> 20 & 15] + HEX_CHARS[e >> 16 & 15] + HEX_CHARS[e >> 28 & 15] + HEX_CHARS[e >> 24 & 15] + HEX_CHARS[t >> 4 & 15] + HEX_CHARS[15 & t] + HEX_CHARS[t >> 12 & 15] + HEX_CHARS[t >> 8 & 15] + HEX_CHARS[t >> 20 & 15] + HEX_CHARS[t >> 16 & 15] + HEX_CHARS[t >> 28 & 15] + HEX_CHARS[t >> 24 & 15] + HEX_CHARS[n >> 4 & 15] + HEX_CHARS[15 & n] + HEX_CHARS[n >> 12 & 15] + HEX_CHARS[n >> 8 & 15] + HEX_CHARS[n >> 20 & 15] + HEX_CHARS[n >> 16 & 15] + HEX_CHARS[n >> 28 & 15] + HEX_CHARS[n >> 24 & 15] + HEX_CHARS[o >> 4 & 15] + HEX_CHARS[15 & o] + HEX_CHARS[o >> 12 & 15] + HEX_CHARS[o >> 8 & 15] + HEX_CHARS[o >> 20 & 15] + HEX_CHARS[o >> 16 & 15] + HEX_CHARS[o >> 28 & 15] + HEX_CHARS[o >> 24 & 15]
                    }
                    ,
                    Md5.prototype.toString = Md5.prototype.hex,
                    Md5.prototype.digest = function() {
                        this.finalize();
                        var e = this.h0
                          , t = this.h1
                          , n = this.h2
                          , o = this.h3;
                        return [255 & e, e >> 8 & 255, e >> 16 & 255, e >> 24 & 255, 255 & t, t >> 8 & 255, t >> 16 & 255, t >> 24 & 255, 255 & n, n >> 8 & 255, n >> 16 & 255, n >> 24 & 255, 255 & o, o >> 8 & 255, o >> 16 & 255, o >> 24 & 255]
                    }
                    ,
                    Md5.prototype.array = Md5.prototype.digest,
                    Md5.prototype.arrayBuffer = function() {
                        this.finalize();
                        var e = new ArrayBuffer(16)
                          , t = new Uint32Array(e);
                        return t[0] = this.h0,
                        t[1] = this.h1,
                        t[2] = this.h2,
                        t[3] = this.h3,
                        e
                    }
                    ,
                    Md5.prototype.buffer = Md5.prototype.arrayBuffer,
                    Md5.prototype.base64 = function() {
                        for (var e, t, n, o = "", r = this.array(), s = 0; s < 15; )
                            e = r[s++],
                            t = r[s++],
                            n = r[s++],
                            o += BASE64_ENCODE_CHAR[e >>> 2] + BASE64_ENCODE_CHAR[63 & (e << 4 | t >>> 4)] + BASE64_ENCODE_CHAR[63 & (t << 2 | n >>> 6)] + BASE64_ENCODE_CHAR[63 & n];
                        return e = r[s],
                        o += BASE64_ENCODE_CHAR[e >>> 2] + BASE64_ENCODE_CHAR[e << 4 & 63] + "=="
                    }
    // var p = 'api.eol.cn/gkcx/api/?e_sort=zslx_rank,min&e_sorttype=desc,desc&local_province_id=44&local_type_id=2074&page=1&school_id=286&size=10&uri=apidata/api/gk/score/province&year=2021&'

    var f = p.replace(/undefined/g, "").replace(/&$/gi, "");
    // console.log(f)
    // f = v.default.HmacSHA1(v.default.enc.Utf8.parse(f), "D23ABC@#56"),
    // f = v.default.enc.Base64.stringify(f).toString(),


    var key = CryptoJS.enc.Utf8.parse(f);
    var f = CryptoJS.HmacSHA1(key, "D23ABC@#56");
    var f = CryptoJS.enc.Base64.stringify(f).toString()
    // var f = JSON.stringify(new Buffer.from(f).toString('base64')).toString()
    // console.log(f)
    // console.log(new Md5(!0).update(f)["hex"]())
    return new Md5(!0).update(f)["hex"]()
}
