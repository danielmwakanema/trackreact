export default class {
  /**
   * Function to extract form field values given field ids
   * @param {Array} fieldIds
   * @return {Array}
   */
  static formFieldValues (fieldIds) {
    return fieldIds.map(id => document.getElementById(id).value) 
  }
}