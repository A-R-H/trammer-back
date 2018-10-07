const axios = require("axios");
const key = process.env.ocp || require("../config");

exports.sendTramTimes = (req, res, next) => {
  const config = {
    headers: {
      "Ocp-Apim-Subscription-Key": key
    }
  };

  Promise.all([
    axios.get("https://api.tfgm.com/odata/Metrolinks(283)", config),
    axios.get("https://api.tfgm.com/odata/Metrolinks(351)", config),
    axios.get("https://api.tfgm.com/odata/Metrolinks(458)", config)
  ]).then(dests => {
    const dids = dests.map(dest => constructDids(dest.data));

    if (dids.every(did => did.length === 0)) {
      res.send({ msg: "oops" });
    } else {
      res.send({
        dids
      });
    }
  });
};

const constructDids = data => {
  const dests = [
    {
      dest: data.Dest0,
      carr: data.Carriages0,
      stat: data.Status0,
      wait: data.Wait0
    },
    {
      dest: data.Dest1,
      carr: data.Carriages1,
      stat: data.Status1,
      wait: data.Wait1
    },
    {
      dest: data.Dest2,
      carr: data.Carriages2,
      stat: data.Status2,
      wait: data.Wait2
    },
    {
      dest: data.Dest3,
      carr: data.Carriages3,
      stat: data.Status3,
      wait: data.Wait3
    }
  ];
  return dests.filter(dest => dest.dest === "East Didsbury");
};
