
const path = require("path");
const fs = require("fs");

class Filedata {

    filename;
    filebytes;
    filepath;

    /**
     * @param {string} filename
     * @param {string} filepath
     * @param {Buffer} filebytes
     */
    constructor(filename = undefined, filepath = undefined, filebytes = undefined) {
        this.filename = filename;
        this.filepath = filepath;
        this.filebytes = filebytes;
    }


    /**
     * @param {string} filepath
     * @returns {Filedata}
     */
    static loadFromPath(filepath) {
        const filename = path.basename(filepath);
        const filebytes = fs.readFileSync(filepath);
        console.log(filename,filepath, filebytes);
        return new Filedata(filename, filepath, filebytes);
    }
}

module.exports = {Filedata};