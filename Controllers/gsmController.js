const GSM = require("./../Model/gsm");

exports.createBin = async (req, res) => {
  try {
    const newBin = await GSM.create(req.body);
    res.status(201).json({ message: "Sucess", newBin });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getBin = async (req, res, next) => {
  try {
    const newBin = await GSM.findOne({ Bin: req.params.name });
    console.log(newBin);
    if (!newBin) {
      res.status(400).json({ message: "BIN IS NOT PRESENT" });
      return;
    }

    const x = newBin.coordinates[0];
    const y = newBin.coordinates[1];

    // console.log(res.locals.binn, "asdfdasfsffffff");
    // req.binn = newBin;
    res.status(201).json({
      message: "Sucess",
      x: x,
      y: y,
      percentage: newBin.persentagefill,
    });

    req.bin = newBin;
    res.locals.bin = newBin;
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getBIN = async (req, res, next) => {
  try {
    const newBin = await GSM.findOne({ Bin: req.params.name });
    // console.log(newBin);
    if (!newBin) {
      next();
    }

    const x = newBin.coordinates[0];
    const y = newBin.coordinates[1];

    // console.log(res.locals.binn, "asdfdasfsffffff");
    // req.binn = newBin;
    req.bin = newBin;
    res.locals.bin = newBin;
    next();
  } catch (err) {
    next();
  }
};

exports.getAllBins = async (req, res) => {
  try {
    const newBin = await GSM.find();
    // console.log(newBin);
    // req.bins = newBin;
    // res.locals.bins = newBin;
    if (!newBin) {
      res.status(400).json({ message: "BIN IS NOT PRESENT" });
      return;
    }

    res.status(201).json({ message: "Sucess", newBin });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getAllBinsContent = async (req, res, next) => {
  try {
    const newBin = await GSM.find();
    // console.log(newBin);
    req.bins = newBin;
    res.locals.bins = newBin;
    // if (!newBin) {
    //   res.status(400).json({ message: "BIN IS NOT PRESENT" });
    //   return;
    // }
    next();
    // res.status(201).json({ message: "Sucess", newBin });
  } catch (err) {
    next();
    // res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getlocation = async (req, res) => {
  try {
    const location = await GSM.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [18.604871513470922, 73.87537281349398],
          },
          $minDistance: 1000,
          $maxDistance: 5000,
        },
      },
    });
    console.log(location);
    res.json({
      location,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
