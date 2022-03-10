const customHeader = (req, res, next) => {
  try {
    const apiKey = req.headers.api_key;
    if (apiKey === "leifer-01") {
        
      next();
    } else {
      res.status(403);
      res.send({ error: "API_KEY_NO_ES_CORRECTA" });
    }
  } catch (e) {
    res.status(403);
    res.send({ error: "ALGO_OCURRIO_EN_EL_CUSTOM_HEADER" });
  }
};

module.exports = customHeader;
