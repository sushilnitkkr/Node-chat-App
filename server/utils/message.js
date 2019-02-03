var generateMessage = (from,text)=>{
  return {
    from,
    text,
    createdAt: new Date().getTime()
  };
};
module.exports = {generateMessage};
//now install this time mocha for testing purpose
