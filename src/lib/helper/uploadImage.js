const { cloudinaryUpload } = require("./cloudinary.config");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__basedir, "../../../public/temp"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});
const upload = multer({ storage: storage });
//change here then go to routes
export async function imageUpload(req) {
  upload.single("image")();
  upload.single("image")(req, res, async (err) => {
    console.log("first");
    console.log(req, res);
    try {
      if (err) {
        fs.unlinkSync(req.path);
        // return res.status(500).json({ error: err.message });
        console.log(err);
        return null;
      }

      if (req) {
        console.log("first");
        const cloudinaryLink = await cloudinaryUpload(req.filename);
        fs.unlinkSync(req.path);
        return cloudinaryLink;
      }
    } catch (error) {
      console.log(error);

      return null;
    }
  });
}
