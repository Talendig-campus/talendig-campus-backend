const fs = require('node:fs/promises');
const {join} = require('node:path');
// const crypto = require('node:crypto');
// const regex = /^[a-zA-z]+\.+([a-zA-z]?)+(\.?)+[j]+[s]$/gm;

const MigrateFiles = async ({ rootDir, outputDir, fileExt = { enable : false, ext: "",} }) => {
    try {
        const filesCount = await fs.readdir(rootDir);
        if (filesCount === null || filesCount.length < 1) {
            throw new Error('Directorio inexistente o Archivos no encotrados en este directorio');
        }

        for (let i = 0; i < filesCount.length; i++) {
            const file = await fs.readFile(join(rootDir, filesCount[i]));
            const newFile = file.toString();
            await fs.writeFile(join(outputDir, filesCount[i]), newFile, 'utf-8');
        }

        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

const MigrateFile = async ({ filedir, outputDir }) => {
    try {
        const file = await fs.readFile(filedir);
        const newFile = file.toString();
        await fs.writeFile(outputDir, newFile, 'utf-8');
        return true;
    } catch (error) {
        console.log(error);
        return false
    }
}



module.exports = {MigrateFiles, MigrateFile};

