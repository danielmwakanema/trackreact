export const MVCArrayToWkt = MVCArray => {
  let result = "POLYGON(";
  for (let ring = 0; ring < MVCArray.length; ring++) {
    var strRing = "(";
    for (let i = 0; i < MVCArray.getAt(ring).length; i++) {
      strRing +=
        (i > 0 ? ", " : "") +
        MVCArray.getAt(ring)
          .getAt(i)
          .lng() +
        " " +
        MVCArray.getAt(ring)
          .getAt(i)
          .lat();
    }
    //Add the first point to the end to close polygon
    strRing +=
      ", " +
      MVCArray.getAt(ring)
        .getAt(0)
        .lng() +
      " " +
      MVCArray.getAt(ring)
        .getAt(0)
        .lat();
    strRing += ")";
    result += (ring > 0 ? ", " : "") + strRing;
  }
  result += ")";
  return result;
};
