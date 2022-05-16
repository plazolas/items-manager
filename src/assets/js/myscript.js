function getPrimesSum(p1,p2,number){
  if(number < 0 || number == null) {
    return 0;
  }

  let multiples= new Set();
  let sum=0;
  for(let i=1; i<number; i++){
    if(i % p1 == 0 || i % p2 == 0){
      multiples.add(i);
    }
  }
  multiples.forEach(
      n => { sum += n; }
  );
  return sum;
}

function spinWords(str) {
  if(str == null || str.length == 0) {
    return '';
  }
  let words = str.split(' ');
  let wordArr = [];
  words.forEach(
      w => {
        w = (w.length > 5) ? w.split('').reverse().join('') : w;
        wordArr.push(w);
      }
  );
  return wordArr.join(' ');
}

function squareDigits(num){
  let negative = false;
  if(num == 0 ) return 0;
  if(num < 0 ) {
    negative = true;
    num = 0 - num;
  }
  let dArr = [];
  let expArr = [];
  let finalArr = [];
  num.toString().split('').forEach(
      c => { let d = parseInt(c); dArr.push(d) }
  );
  console.log(dArr);
  dArr.forEach( d => { expArr.push(Math.pow(d,2)) });
  expArr.forEach(n => { finalArr.push(n.toString()) });
  let r = expArr.join('');
  
  
  return (negative) ? 0 - parseInt(r) : parseInt(r);
}
