const hadChanged = list => hand => Object.keys(list)
  .filter(k => hand[k] !== list[k])
  .reduce((a, b) => {
    list[b] = hand[b]
    return a || !!b
  }, false)

export default hadChanged
/*
 * [].some(f) = [].recude(
 *  (a, b) => a || f(b)
 *, false)
*/
