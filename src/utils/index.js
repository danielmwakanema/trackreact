export default class {
  /**
   * Function to extract form field values given field ids
   * @param {Array} fieldIds
   * @return {Array}
   */
  static formFieldValues (fieldIds) {
    return fieldIds.map(id => document.getElementById(id).value) 
  }

  /**
   * Function to extract form field values given field ids
   * @param {Array} fieldIds
   * @return {Array}
   */
  static formFieldMap (fieldIds) {
    return fieldIds.reduce((acc, val) => {
      const data = document.getElementById(val).value
      acc[val] = data
      return acc
    }, {}) 
  }
}