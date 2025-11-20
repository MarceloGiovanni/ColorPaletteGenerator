export type ColorAPI = {
    hex:       Hex;
    rgb:       RGB;
    hsl:       Hsl;
    hsv:       Hsv;
    name:      Name;
    cmyk:      Cmyk;
    XYZ:       Xyz;
    image:     Image;
    contrast:  Contrast;
    _links:    Links;
    _embedded: Embedded;
}

export type Xyz = {
    fraction: XYZFraction;
    value:    string;
    X:        number;
    Y:        number;
    Z:        number;
}

export type XYZFraction = {
    X: number;
    Y: number;
    Z: number;
}

export type Embedded = {
}

export type Links = {
    self: Self;
}

export type Self = {
    href: string;
}

export type Cmyk = {
    fraction: CmykFraction;
    value:    string;
    c:        number;
    m:        number;
    y:        number;
    k:        number;
}

export type CmykFraction = {
    c: number;
    m: number;
    y: number;
    k: number;
}

export type Contrast = {
    value: string;
}

export type Hex = {
    value: string;
    clean: string;
}

export type Hsl = {
    fraction: HslFraction;
    h:        number;
    s:        number;
    l:        number;
    value:    string;
}

export type HslFraction = {
    h: number;
    s: number;
    l: number;
}

export type Hsv = {
    fraction: HsvFraction;
    value:    string;
    h:        number;
    s:        number;
    v:        number;
}

export type HsvFraction = {
    h: number;
    s: number;
    v: number;
}

export type Image = {
    bare:  string;
    named: string;
}

export type Name = {
    value:             string;
    closest_named_hex: string;
    exact_match_name:  boolean;
    distance:          number;
}

export type RGB = {
    fraction: RGBFraction;
    r:        number;
    g:        number;
    b:        number;
    value:    string;
}

export type RGBFraction = {
    r: number;
    g: number;
    b: number;
}
